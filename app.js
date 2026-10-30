(function(){
var $=function(i){return document.getElementById(i)};
var ip=(typeof SERVER_IP==='string'?SERVER_IP:'').trim(), dc=(typeof DISCORD_LINK==='string'?DISCORD_LINK:'').trim();
// 1. November 2026, 00:00 Europe/Zurich
var IP_REVEAL=Date.parse('2026-10-31T23:00:00Z');
var IP_PLACEHOLDER='xxxxxxxx.xxxxxxx.xx';
var IP_HINT='IP ab 1. November sichtbar';
function ipOpen(){return Date.now()>=IP_REVEAL;}
function esc(s){return String(s).replace(/</g,'');}
// Discord button
document.querySelectorAll('.dc-slot').forEach(function(s){
  s.innerHTML=dc?'<a class="dcbtn" href="'+dc+'" target="_blank" rel="noopener">💬 Discord beitreten</a>':'<span class="dcbtn off">💬 Discord beitreten – Link folgt bald</span>';
});
var ipPainted=false;
function bindCopy(){
  var b=$('cp');if(!b)return;
  b.onclick=function(){
    if(!ipOpen()||!ip)return;
    var done=function(){b.textContent='Kopiert!';setTimeout(function(){b.textContent='Kopieren'},1800)};
    if(navigator.clipboard)navigator.clipboard.writeText(ip).then(done,done);else done();
  };
}
function paintIpTexts(){
  var open=ipOpen()&&!!ip;
  document.querySelectorAll('.ip-text').forEach(function(e){
    if(open){e.textContent=ip;e.classList.remove('ip-lock');}
    else if(ipOpen()){e.textContent='IP folgt zur Eröffnung am 1. November';e.classList.remove('ip-lock');}
    else{e.textContent=IP_PLACEHOLDER;e.classList.add('ip-lock');}
  });
}
function paintIp(){
  paintIpTexts();
  var ipb=$('ipbox');if(!ipb)return;
  var open=ipOpen()&&!!ip;
  var portHint='<div class="iplbl">☕ Java: nur die Adresse oben (kein Port nötig)<br>🪨 Bedrock: Adresse oben + <b>Port 19132</b> (Port unbedingt angeben!)</div>';
  if(!ipPainted){
    ipPainted=true;
    if(!ip&&ipOpen()){ipb.innerHTML='<div class="iplbl">Server-IP</div><div class="ipsoon">IP folgt zur Eröffnung am 1. November</div>';return;}
    if(open){
      ipb.innerHTML='<div class="iplbl">Server-IP</div><div class="iprow"><code id="ipcode">'+esc(ip)+'</code><button id="cp" class="btn" type="button">Kopieren</button></div>'+portHint;
      bindCopy();
    }else{
      ipb.innerHTML='<div class="iplbl">Server-IP</div><div class="iprow"><code id="ipcode" class="ip-lock">'+IP_PLACEHOLDER+'</code><button id="cp" class="btn" type="button" disabled title="'+IP_HINT+'">Kopieren</button></div><div class="iphint" id="iphint">'+IP_HINT+'</div>'+portHint;
    }
    return;
  }
  if(!open)return;
  var code=$('ipcode');
  if(code){code.textContent=ip;code.classList.remove('ip-lock');}
  var hint=$('iphint');if(hint&&hint.parentNode)hint.parentNode.removeChild(hint);
  var btn=$('cp');
  if(btn){btn.disabled=false;btn.removeAttribute('title');btn.textContent='Kopieren';bindCopy();}
}
paintIp();
document.addEventListener('copy',function(e){
  if(ipOpen())return;
  var s=window.getSelection?String(window.getSelection()):'';
  if(s.indexOf(IP_PLACEHOLDER)!==-1)e.preventDefault();
});
if(!ipOpen()){
  var ipWait=setInterval(function(){if(!ipOpen())return;clearInterval(ipWait);paintIp();status();},1000);
}
// Status
var statusStarted=false;
function status(){var st=$('status');if(!st||!ip||!ipOpen()||statusStarted)return;statusStarted=true;st.hidden=false;st.innerHTML='<span class="dot"></span> Status wird geladen…';
  fetch('https://api.mcsrvstat.us/3/'+encodeURIComponent(ip)).then(function(r){return r.json()}).then(function(d){
    st.innerHTML=d.online?'<span class="dot on"></span> Online · '+(d.players?d.players.online+' / '+d.players.max:'?')+' Spieler':'<span class="dot"></span> Offline';
  }).catch(function(){st.innerHTML='<span class="dot"></span> Status nicht verfügbar'});}
// Countdown
var cd=$('countdown');
if(cd){var t=new Date(typeof OPENING==='string'&&OPENING?OPENING:'2026-11-01T00:00:00+01:00').getTime(),iv;
  function tick(){var d=t-Date.now();
    if(isNaN(t)||d<=0){clearInterval(iv);cd.innerHTML='<div class="cd-title">Der Server ist geöffnet! 🎉</div>';paintIp();status();return;}
    var s=Math.floor(d/1000),v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];
    ['cd-d','cd-h','cd-m','cd-s'].forEach(function(k,i){var e=$(k);if(e)e.textContent=String(v[i]).padStart(2,'0')});}
  tick();iv=setInterval(tick,1000);}
else if(ipOpen()) status();
// Supporters
var sw=$('supporters');
if(sw){var L=(typeof SUPPORTERS!=='undefined'&&Array.isArray(SUPPORTERS))?SUPPORTERS.filter(Boolean):[];
  if(!L.length)sw.innerHTML='<div class="empty">💜 Sei der Erste! Spende und erscheine hier (nur wenn du willst).</div>';
  else sw.innerHTML=L.map(function(n){var e=document.createElement('div');e.className='sup';e.textContent='💜 '+n;return e.outerHTML}).join('');}
// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function(b){b.onclick=function(){b.parentNode.classList.toggle('open')}});
})();
