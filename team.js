(function(){
var INFO={
  xhekagmx:'xhekagmx leitet den Server. Er entscheidet über Updates, Events und die Regeln. Ausserdem kümmert er sich um alles, was hier geplant wird und den Server am Laufen hält.',
  Skyorad:'Skyorad leitet den Server mit und teilt sich die Verantwortung. Er kümmert sich um die Technik und die Plugins. Vieles davon passiert im Hintergrund, damit der Server stabil läuft.',
  Schnupffi:'Schnupffi ist der Admin des Servers. Er hilft bei Problemen und Fragen und sorgt für Ordnung und Fairness. Wenn du etwas klären musst, kannst du dich an ihn wenden.',
  Yasminflowerque:'Yasminflowerque ist die Erbauerin des Servers. Sie baut unter anderem am Spawn und gestaltet Bauwerke auf dem ganzen Server. Durch ihre Bauten bekommen die Orte ihr Aussehen.'
};
var modal=document.getElementById('tm-modal');
var title=document.getElementById('tm-title');
var img=document.getElementById('tm-img');
var text=document.getElementById('tm-text');
var closeBtn=document.getElementById('tm-x');
if(!modal||!title||!img||!text)return;
var last=null;
var prevOverflow='';
function open(card){
  var nameEl=card.querySelector('h3');
  var skin=card.querySelector('img');
  if(!nameEl||!skin)return;
  var name=nameEl.textContent.trim();
  var desc=INFO[name];
  if(!desc)return;
  title.textContent=name;
  text.textContent=desc;
  img.src=skin.getAttribute('src');
  img.alt='Skin von '+name;
  last=card;
  prevOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  modal.hidden=false;
  modal.classList.add('open');
  closeBtn.focus();
}
function close(){
  if(modal.hidden)return;
  modal.classList.remove('open');
  modal.hidden=true;
  document.body.style.overflow=prevOverflow;
  if(last&&last.focus)last.focus();
}
document.querySelectorAll('.team .tm').forEach(function(card){
  card.addEventListener('click',function(){open(card)});
  card.addEventListener('keydown',function(e){
    if(e.key==='Enter'||e.key===' '){e.preventDefault();open(card)}
  });
});
closeBtn.addEventListener('click',function(e){e.stopPropagation();close()});
modal.addEventListener('click',function(e){if(e.target===modal)close()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
})();
