/* Pinnwand – gemeinsame Beiträge für alle Besucher.
   localStorage merkt sich nur, ob DIESER Browser schon abgestimmt hat.
   Die Beiträge selbst liegen nicht lokal.

   Ohne Konto geht das von GitHub Pages aus nicht: jsonblob, KVdb und
   ähnliche Dienste brauchen hier einen Login oder sind gesperrt.
   Kostenlos und mit öffentlichem Schlüssel: Supabase.

   1. Konto auf https://supabase.com (Free).
   2. Neues Projekt. Unter Settings → API die Project URL und den
      anon public key kopieren (NICHT den service_role key).
   3. Im SQL-Editor ausführen:

   create table public.posts (
     id uuid primary key default gen_random_uuid(),
     text text not null check (char_length(btrim(text)) between 1 and 140),
     up integer not null default 0 check (up >= 0),
     down integer not null default 0 check (down >= 0),
     created_at timestamptz not null default now()
   );
   alter table public.posts enable row level security;
   create policy "posts read" on public.posts for select to anon using (true);
   create policy "posts insert" on public.posts for insert to anon
     with check (char_length(btrim(text)) between 1 and 140);
   create or replace function public.pin_vote(post_id uuid, dir integer)
   returns void language plpgsql security definer set search_path = public as $$
   begin
     if dir = 1 then
       update public.posts set up = up + 1 where id = post_id;
     elsif dir = -1 then
       update public.posts set down = down + 1 where id = post_id;
     end if;
   end;
   $$;
   grant execute on function public.pin_vote(uuid, integer) to anon;

   4. Die beiden Werte unten eintragen und die Datei erneut veröffentlichen.
*/
var PIN_SUPABASE_URL = 'https://haqjnzeuodqozwobyzqk.supabase.co';
var PIN_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhcWpuemV1b2Rxb3p3b2J5enFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NjgzNDMsImV4cCI6MjEwOTA0NDM0M30.orYkX9ybkhk-a_ykvE6lCnJb4W-jZiSHFExUQj2W5nM';
var PIN_MAX = 140;
var PIN_VOTE_KEY = 'xhekagmx-pin-votes';
var PIN_COOL_KEY = 'xhekagmx-pin-last';

(function(){
  var form = document.getElementById('pin-form');
  var input = document.getElementById('pin-text');
  var count = document.getElementById('pin-count');
  var grid = document.getElementById('pin-grid');
  var err = document.getElementById('pin-err');
  var setup = document.getElementById('pin-setup');
  var send = document.getElementById('pin-send');
  if(!form || !input || !grid) return;

  var ready = /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(PIN_SUPABASE_URL) && PIN_SUPABASE_ANON_KEY.length > 20;
  var base = PIN_SUPABASE_URL.replace(/\/$/, '');

  function votes(){
    try{ return JSON.parse(localStorage.getItem(PIN_VOTE_KEY) || '{}') || {}; }
    catch(e){ return {}; }
  }
  function saveVote(id, dir){
    var v = votes();
    v[id] = dir;
    localStorage.setItem(PIN_VOTE_KEY, JSON.stringify(v));
  }
  function showErr(msg){
    if(!err) return;
    err.hidden = !msg;
    err.textContent = msg || '';
  }
  function tick(){
    var n = input.value.length;
    count.textContent = n + ' / ' + PIN_MAX;
    count.classList.toggle('over', n >= PIN_MAX);
  }
  input.addEventListener('input', tick);
  tick();

  function svg(path){
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', path);
    s.appendChild(p);
    return s;
  }
  var UP = 'M2 21h4V9H2v12zm20-11a2 2 0 0 0-2-2h-6.31l.95-4.57.03-.32a1.5 1.5 0 0 0-.44-1.06L13.17 1 6.59 7.59A2 2 0 0 0 6 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z';
  var DOWN = 'M22 3h-4v12h4V3zM2 14a2 2 0 0 0 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L10.83 23l6.59-6.59A2 2 0 0 0 18 15V5a2 2 0 0 0-2-2H7c-.83 0-1.54.5-1.84 1.22L2.14 11.27A2 2 0 0 0 2 12v2z';

  function card(post){
    var el = document.createElement('article');
    el.className = 'pin-card';
    var p = document.createElement('p');
    p.textContent = post.text;
    el.appendChild(p);
    var bar = document.createElement('div');
    bar.className = 'pin-votes';
    var chosen = votes()[post.id] || '';
    bar.appendChild(voteBtn(post, 'up', chosen));
    bar.appendChild(voteBtn(post, 'down', chosen));
    el.appendChild(bar);
    return el;
  }
  function voteBtn(post, dir, chosen){
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pin-vote' + (chosen === dir ? ' on' : '');
    b.disabled = !ready || !!chosen;
    b.setAttribute('aria-label', dir === 'up' ? 'Daumen hoch' : 'Daumen runter');
    b.appendChild(svg(dir === 'up' ? UP : DOWN));
    var n = document.createElement('span');
    n.textContent = String(dir === 'up' ? (post.up || 0) : (post.down || 0));
    b.appendChild(n);
    b.addEventListener('click', function(){ cast(post, dir, b); });
    return b;
  }
  function render(list){
    grid.textContent = '';
    if(!list.length){
      var empty = document.createElement('p');
      empty.className = 'pin-empty';
      empty.textContent = ready ? 'Noch keine Nachrichten. Schreib die erste.' : 'Noch keine gemeinsamen Nachrichten.';
      grid.appendChild(empty);
      return;
    }
    list.forEach(function(post){ grid.appendChild(card(post)); });
  }
  function headers(extra){
    var h = {
      apikey: PIN_SUPABASE_ANON_KEY,
      Authorization: 'Bearer ' + PIN_SUPABASE_ANON_KEY
    };
    if(extra) Object.keys(extra).forEach(function(k){ h[k] = extra[k]; });
    return h;
  }
  function load(){
    if(!ready){ render([]); return; }
    fetch(base + '/rest/v1/posts?select=id,text,up,down,created_at&order=created_at.desc&limit=48', { headers: headers() })
      .then(function(r){ if(!r.ok) throw new Error('load'); return r.json(); })
      .then(render)
      .catch(function(){ showErr('Die Pinnwand ist gerade nicht erreichbar. Gleich nochmal versuchen.'); });
  }
  function cast(post, dir, btn){
    if(!ready || votes()[post.id]) return;
    btn.disabled = true;
    fetch(base + '/rest/v1/rpc/pin_vote', {
      method: 'POST',
      headers: headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ post_id: post.id, dir: dir === 'up' ? 1 : -1 })
    }).then(function(r){
      if(!r.ok) throw new Error('vote');
      saveVote(post.id, dir);
      if(dir === 'up') post.up = (post.up || 0) + 1; else post.down = (post.down || 0) + 1;
      load();
    }).catch(function(){
      btn.disabled = false;
      showErr('Die Stimme wurde nicht gespeichert.');
    });
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    showErr('');
    var text = input.value.replace(/\s+/g, ' ').trim();
    if(!text){ showErr('Schreib zuerst eine Nachricht.'); return; }
    if(text.length > PIN_MAX){ showErr('Höchstens ' + PIN_MAX + ' Zeichen.'); return; }
    if(!ready){
      showErr('Ohne Supabase-URL und anon key wird nichts gespeichert. localStorage wird nicht als gemeinsame Pinnwand benutzt.');
      return;
    }
    var last = Number(localStorage.getItem(PIN_COOL_KEY) || 0);
    if(Date.now() - last < 20000){ showErr('Kurz warten, dann die nächste Nachricht.'); return; }
    send.disabled = true;
    fetch(base + '/rest/v1/posts', {
      method: 'POST',
      headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
      body: JSON.stringify({ text: text })
    }).then(function(r){
      if(!r.ok) throw new Error('insert');
      localStorage.setItem(PIN_COOL_KEY, String(Date.now()));
      input.value = '';
      tick();
      load();
    }).catch(function(){
      showErr('Die Nachricht wurde nicht gespeichert.');
    }).then(function(){ send.disabled = false; });
  });

  if(!ready && setup){
    setup.hidden = false;
    setup.textContent = 'Die Pinnwand ist gebaut, speichert aber noch nicht für alle Besucher. Dafür braucht es ein kostenloses Supabase-Projekt: Project URL und den öffentlichen anon key in pinnwand.js eintragen (nicht den service_role key). Ohne diesen Schlüssel wird hier nichts nur lokal vorgetäuscht.';
  }
  load();
  if(ready) setInterval(load, 20000);
})();
