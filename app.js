(function(){
var $=function(i){return document.getElementById(i)};
var ip=(typeof SERVER_IP==='string'?SERVER_IP:'').trim(), dc=(typeof DISCORD_LINK==='string'?DISCORD_LINK:'').trim();
// Discord button
document.querySelectorAll('.dc-slot').forEach(function(s){
  s.innerHTML=dc?'<a class="dcbtn" href="'+dc+'" target="_blank" rel="noopener">💬 Discord beitreten</a>':'<span class="dcbtn off">💬 Discord beitreten – Link folgt bald</span>';
});
// IP texts
document.querySelectorAll('.ip-text').forEach(function(e){e.textContent=ip||'IP folgt zur Eröffnung am 1. November'});
var ipb=$('ipbox');
if(ipb){
  if(ip){ipb.innerHTML='<div class="iplbl">Server-IP</div><div class="iprow"><code>'+ip.replace(/</g,'')+'</code><button id="cp" class="btn">Kopieren</button></div>';
    $('cp').onclick=function(){var b=this;var done=function(){b.textContent='Kopiert!';setTimeout(function(){b.textContent='Kopieren'},1800)};
      if(navigator.clipboard)navigator.clipboard.writeText(ip).then(done,done);else done();};}
  else ipb.innerHTML='<div class="iplbl">Server-IP</div><div class="ipsoon">IP folgt zur Eröffnung am 1. November</div>';
}
// Status
function status(){var st=$('status');if(!st||!ip)return;st.hidden=false;st.innerHTML='<span class="dot"></span> Status wird geladen…';
  fetch('https://api.mcsrvstat.us/3/'+encodeURIComponent(ip)).then(function(r){return r.json()}).then(function(d){
    st.innerHTML=d.online?'<span class="dot on"></span> Online · '+(d.players?d.players.online+' / '+d.players.max:'?')+' Spieler':'<span class="dot"></span> Offline';
  }).catch(function(){st.innerHTML='<span class="dot"></span> Status nicht verfügbar'});}
// Countdown
var cd=$('countdown');
if(cd){var t=new Date(typeof OPENING==='string'&&OPENING?OPENING:'2026-11-01T00:00:00+01:00').getTime(),iv;
  function tick(){var d=t-Date.now();
    if(isNaN(t)||d<=0){clearInterval(iv);cd.innerHTML='<div class="cd-title">Der Server ist geöffnet! 🎉</div>';status();return;}
    var s=Math.floor(d/1000),v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];
    ['cd-d','cd-h','cd-m','cd-s'].forEach(function(k,i){var e=$(k);if(e)e.textContent=String(v[i]).padStart(2,'0')});}
  tick();iv=setInterval(tick,1000);}
else status();
// Supporters
var sw=$('supporters');
if(sw){var L=(typeof SUPPORTERS!=='undefined'&&Array.isArray(SUPPORTERS))?SUPPORTERS.filter(Boolean):[];
  if(!L.length)sw.innerHTML='<div class="empty">💜 Sei der Erste! Spende und erscheine hier (nur wenn du willst).</div>';
  else sw.innerHTML=L.map(function(n){var e=document.createElement('div');e.className='sup';e.textContent='💜 '+n;return e.outerHTML}).join('');}
// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function(b){b.onclick=function(){b.parentNode.classList.toggle('open')}});
})();
