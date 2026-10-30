(function(){
var NS='http://www.w3.org/2000/svg';
var seed=7;function R(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
function rr(a,b){return a+R()*(b-a)}
var SEL='.cat,.offer,.note,.owner,.rank,.cmp-wrap,.cd-box,.ipbox,.tm,.faq,.empty';
function deco(el){
  if(el.dataset.wx)return;el.dataset.wx=1;
  var host=el;
  if(el.classList.contains('cmp-wrap')){host=document.createElement('div');host.className='wx-wrap';el.parentNode.insertBefore(host,el);host.appendChild(el);}
  else el.classList.add('wx-box');
  var c=document.createElement('span');c.className='wx-cap';c.setAttribute('aria-hidden','true');
  var i=document.createElement('span');i.className='wx-ice';i.setAttribute('aria-hidden','true');
  host.appendChild(c);host.appendChild(i);
  var h=0,t=(el.textContent||'').slice(0,80)+'|'+(wxN++);for(var k=0;k<t.length;k++)h=(h*31+t.charCodeAt(k))|0;
  host._wx={cap:c,ice:i,seed:(Math.abs(h)%2147483646)+1,w:0};
  wxDraw(host);if(wxRO)wxRO.observe(host);
}
var wxN=0;
function wxMk(sd){return function(){sd=(sd*16807)%2147483647;return(sd-1)/2147483646}}
function f1(v){return v.toFixed(1)}
function wxDraw(host){
  var o=host._wx,W=Math.round(host.offsetWidth);if(!W||W===o.w)return;o.w=W;
  var r=parseFloat(getComputedStyle(host).borderTopLeftRadius)||14;r=Math.min(r,W/4);
  var Rn=wxMk(o.seed),q=function(a,b){return a+Rn()*(b-a)},id='x'+o.seed;
  // ---- snow cap ----
  var Y0=14,ph=[q(0,6.3),q(0,6.3),q(0,6.3)],fr=[q(1.5,3),q(4,7),q(9,15)],am=[q(1.2,2.4),q(.8,1.6),q(.3,.8)];
  var base=q(2.5,8.5),tone=Rn(),glint=function(x,y,s){return '<path d="M'+f1(x-s)+' '+f1(y)+'L'+f1(x+s)+' '+f1(y)+'M'+f1(x)+' '+f1(y-s)+'L'+f1(x)+' '+f1(y+s)+'" stroke="#fff" stroke-width=".6" stroke-linecap="round" opacity=".95"/><circle cx="'+f1(x)+'" cy="'+f1(y)+'" r="'+f1(s*.35)+'" fill="#fff"/>'},lumps=[],nl=2+(Rn()*4|0);for(var k=0;k<nl;k++)lumps.push([q(.08,.92)*W,q(8,50),q(1,6.5)]);
  var x0=Rn()<.45?q(0,r*.9):0,x1=Rn()<.45?W-q(0,r*.9):W;
  var drops=[];var nd=1+(Rn()*3|0);for(k=0;k<nd;k++)drops.push([q(r+10,W-r-10),q(8,22),q(2,4.5)]);
  function edge(x){if(x<r){var d=r-x;return Y0+r-Math.sqrt(Math.max(0,r*r-d*d))}if(x>W-r){d=x-(W-r);return Y0+r-Math.sqrt(Math.max(0,r*r-d*d))}return Y0}
  function th(x){var u=x/W*6.283,v=base;for(var j=0;j<3;j++)v+=am[j]*Math.sin(u*fr[j]+ph[j]);
    for(j=0;j<lumps.length;j++){var L=lumps[j],e=(x-L[0])/L[1];v+=L[2]*Math.exp(-e*e)}
    var ta=Math.min(1,(x-x0)/Math.max(8,r*.8),(x1-x)/Math.max(8,r*.8));ta=Math.max(0,ta);return Math.max(.6,v)*Math.sqrt(ta)}
  function dr(x){var v=0;for(var j=0;j<drops.length;j++){var D=drops[j],e=(x-D[0])/D[1];v+=D[2]*Math.exp(-e*e*e*e)}return v}
  var N=Math.max(40,W/4|0),top=[],bot=[];
  for(k=0;k<=N;k++){var x=x0+(x1-x0)*k/N,e=edge(x),t=th(x);top.push(f1(x)+' '+f1(e-t));bot.push(f1(x)+' '+f1(e+Math.min(dr(x),t*.9)+.8*Math.sqrt(Math.min(1,t))))}
  var capD='M'+top.join('L')+'L'+bot.reverse().join('L')+'Z';
  var shD='M'+top.map(function(p){var a=p.split(' ');return a[0]+' '+f1(+a[1]+1.6)}).join('L')+'L'+bot.join('L')+'Z';
  var sp='';var ns=2+(Rn()*5|0);for(k=0;k<ns;k++){var sx=q(x0+r,x1-r),sy=edge(sx)-th(sx)*q(.3,.7);if(Rn()<.4)sp+=glint(sx,sy,q(1.6,2.8));else sp+='<circle cx="'+f1(sx)+'" cy="'+f1(sy)+'" r="'+f1(q(.5,1))+'" fill="#fff"/>'}
  var clump='';if(Rn()<.35){var cl=Rn()<.5,cx=cl?q(1,4):W-q(1,4),cy=Y0+r*q(.4,.9);clump='<ellipse cx="'+f1(cx)+'" cy="'+f1(cy)+'" rx="'+f1(q(2,3.5))+'" ry="'+f1(q(2.5,4))+'" fill="url(#'+id+'c)"/>'}
  o.cap.innerHTML='<svg width="'+W+'" height="'+(Y0+r+8)+'" viewBox="0 0 '+W+' '+(Y0+r+8)+'"><defs><linearGradient id="'+id+'c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="'+(tone<.33?'#e6eefb':'#f3f7ff')+'"/><stop offset="1" stop-color="'+['#aebfdc','#c3d1ea','#dbe5f5'][tone*3|0]+'"/></linearGradient></defs>'+
   '<path d="'+shD+'" fill="'+(tone<.33?'#6f86b0':'#8fa3c6')+'" opacity="'+f1(q(.35,.65))+'" transform="translate(0 1.2)"/><path d="'+capD+'" fill="url(#'+id+'c)"/>'+clump+sp+'</svg>';
  // ---- icicles ----
  var H=30,ice='',it=Rn(),shine=q(.4,1),ilen=q(.7,1.25),a=r*q(.7,1),b=W-r*q(.7,1),dn=[q(0,6.3),q(1.5,4)],amt=q(.5,1.3);
  var rim='M'+f1(a)+' 0';for(x=a;x<=b;x+=6)rim+='L'+f1(x)+' '+f1(.9+.6*Math.sin(x*.21+dn[0]));rim+='L'+f1(b)+' 0Z';
  x=a+q(2,10);
  while(x<b-3){
    var dens=.5+.5*Math.sin(x/W*6.283*dn[1]+dn[0]);dens=dens*amt;
    if(Rn()<.18*(1.2-dens)){x+=q(10,30);continue}
    var w=q(2.2,5.5),L;var pr=Rn();
    if(pr<.07*amt+.02)L=q(18,26);else if(pr<.35)L=q(9,16);else L=q(3,9);
    L*=(.6+.6*dens)*ilen;L=Math.max(3,Math.min(26,L));w=Math.min(w,1.5+L*.45);
    var tx=x+q(-1,1)*w*.3,bl=q(.15,.45),xl=x-w/2,xr=x+w/2;
    ice+='<path d="M'+f1(xl)+' 0C'+f1(xl-w*bl*.3)+' '+f1(L*.35)+' '+f1(tx-w*.15)+' '+f1(L*.8)+' '+f1(tx)+' '+f1(L)+'C'+f1(tx+w*.18)+' '+f1(L*.75)+' '+f1(xr+w*bl*.25)+' '+f1(L*.3)+' '+f1(xr)+' 0Z" fill="url(#'+id+'i)"/>';
    if(L>6)ice+='<path d="M'+f1(xl+w*.28)+' 1L'+f1(tx-w*.05)+' '+f1(L*.7)+'" stroke="#fff" stroke-opacity="'+f1(shine*q(.5,1))+'" stroke-width="'+f1(Math.max(.5,w*.14))+'" stroke-linecap="round"/>';
    if(L>5&&Rn()<.18*shine)ice+=glint(xl+w*.3,q(1.5,L*.4),q(1.3,2.4));if(L>10&&Rn()<.35)ice+='<circle cx="'+f1(tx)+'" cy="'+f1(L+q(1.5,3))+'" r="'+f1(q(.7,1.2))+'" fill="#e6f4ff" fill-opacity=".85"/>';
    x+=w+(Rn()<dens?q(.5,4):q(5,16));
  }
  o.ice.innerHTML='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><defs><linearGradient id="'+id+'i" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f6ff" stop-opacity=".95"/><stop offset=".5" stop-color="'+['#7fb6e6','#9fd3f5','#c4e6fb'][it*3|0]+'" stop-opacity="'+f1(q(.55,.8))+'"/><stop offset="1" stop-color="#bfe6ff" stop-opacity=".35"/></linearGradient></defs><path d="'+rim+'" fill="#d8efff" opacity=".85"/>'+ice+'</svg>';
}
var wxRO=window.ResizeObserver?new ResizeObserver(function(es){es.forEach(function(e){if(e.target._wx)wxDraw(e.target)})}):null;
if(!wxRO)window.addEventListener('resize',function(){document.querySelectorAll('.wx-box,.wx-wrap').forEach(function(h){if(h._wx)wxDraw(h)})});
function all(){document.querySelectorAll(SEL).forEach(deco)}
all();new MutationObserver(all).observe(document.body,{childList:true,subtree:true});

function needles(pts,count,len,spread){
  var d='';for(var p=0;p<pts.length;p++){var q=pts[p];for(var n=0;n<count;n++){
    var a=q[2]+rr(-spread,spread),l=rr(len*.6,len),ox=q[0]+rr(-1.5,1.5),oy=q[1]+rr(-1.5,1.5);
    d+='M'+ox.toFixed(1)+' '+oy.toFixed(1)+'l'+(Math.cos(a)*l).toFixed(1)+' '+(Math.sin(a)*l).toFixed(1);}}
  return d}
var GREENS=['#0d3b22','#14522e','#1d6b3a','#2b8547','#4aa35e'];
var DEFS='<defs>'+
 '<radialGradient id="xlR" cx=".4" cy=".35"><stop offset="0" stop-color="#ffd2c8"/><stop offset=".35" stop-color="#ff3b3b"/><stop offset="1" stop-color="#8a0d16"/></radialGradient>'+
 '<radialGradient id="xlG" cx=".4" cy=".35"><stop offset="0" stop-color="#fff6c8"/><stop offset=".35" stop-color="#ffc83a"/><stop offset="1" stop-color="#9a6206"/></radialGradient>'+
 '<radialGradient id="xlW" cx=".4" cy=".35"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#eef4ff"/><stop offset="1" stop-color="#9fb2d6"/></radialGradient>'+
 '<radialGradient id="xlB" cx=".4" cy=".35"><stop offset="0" stop-color="#d6ecff"/><stop offset=".4" stop-color="#4b8dff"/><stop offset="1" stop-color="#173c8f"/></radialGradient>'+
 '<radialGradient id="xglow"><stop offset="0" stop-color="#fff3c4" stop-opacity=".9"/><stop offset=".4" stop-color="#ffcf5a" stop-opacity=".35"/><stop offset="1" stop-color="#ffb000" stop-opacity="0"/></radialGradient>'+
 '<radialGradient id="xglowR"><stop offset="0" stop-color="#ffd0d0" stop-opacity=".9"/><stop offset=".4" stop-color="#ff4545" stop-opacity=".3"/><stop offset="1" stop-color="#ff0000" stop-opacity="0"/></radialGradient>'+
 '<radialGradient id="xglowW"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".4" stop-color="#dfeaff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'+
 '<linearGradient id="xbowR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a5f"/><stop offset=".55" stop-color="#d4121f"/><stop offset="1" stop-color="#7d0711"/></linearGradient>'+
 '<linearGradient id="xbowW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e6ebf5"/><stop offset="1" stop-color="#aab3c8"/></linearGradient>'+
 '<linearGradient id="xsnow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d7e4fb"/></linearGradient>'+
 '<filter id="xsh" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#000" flood-opacity=".55"/></filter>'+
 '<filter id="xsoft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>'+
 '</defs>';
function light(x,y,r,k,i){var g=['xlR','xlG','xlW','xlB'][k],gl=['xglowR','xglow','xglowW','xglowW'][k];
  return '<g class="xtw" style="animation-delay:'+(-(i*0.73)%4).toFixed(2)+'s"><circle cx="'+x+'" cy="'+y+'" r="'+(r*3.2)+'" fill="url(#'+gl+')"/></g>'+
  '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="url(#'+g+')"/><circle cx="'+(x-r*.35)+'" cy="'+(y-r*.4)+'" r="'+(r*.3)+'" fill="#fff" opacity=".85"/>'}
function bow(x,y,s,white){var f=white?'url(#xbowW)':'url(#xbowR)',st=white?'#8d96ad':'#5a050c',edge=white?'#d4121f':'#ffd9dc';
  return '<g transform="translate('+x+' '+y+') scale('+s+')" filter="url(#xsh)">'+
  '<path d="M-1 2C-3 8-6 14-9 19L-5 18-3 21C-1 15 0 9 1 3Z" fill="'+f+'" stroke="'+st+'" stroke-width=".5"/>'+
  '<path d="M1 2C3 8 6 14 9 19L5 18 3 21C1 15 0 9-1 3Z" fill="'+f+'" stroke="'+st+'" stroke-width=".5"/>'+
  '<path d="M0 0C-4-7-13-9-14-3S-6 4 0 1Z" fill="'+f+'" stroke="'+st+'" stroke-width=".5"/>'+
  '<path d="M0 0C4-7 13-9 14-3S6 4 0 1Z" fill="'+f+'" stroke="'+st+'" stroke-width=".5"/>'+
  '<path d="M-2-1C-5-4-10-5-11-3" fill="none" stroke="'+edge+'" stroke-width="1" stroke-linecap="round" opacity=".8"/>'+
  '<path d="M2-1C5-4 10-5 11-3" fill="none" stroke="'+edge+'" stroke-width="1" stroke-linecap="round" opacity=".8"/>'+
  '<ellipse cx="0" cy=".5" rx="3.2" ry="3" fill="'+f+'" stroke="'+st+'" stroke-width=".5"/>'+
  '<ellipse cx="-.8" cy="-.5" rx="1.2" ry=".8" fill="#fff" opacity=".6"/></g>'}

var header=document.querySelector('header'),gar;
function buildGarland(){
  if(!header)return;seed=11;
  var W=Math.max(320,document.documentElement.clientWidth),H=52,n=Math.max(3,Math.round(W/230)),sw=W/n,top=9,sag=W<600?20:24;
  var layers=['','','','',''],lights='',bows='',cable='';
  for(var s=0;s<n;s++){var x0=s*sw,x1=x0+sw;
    var pts=[];for(var t=0;t<=1.0001;t+=4/sw){var x=x0+t*sw,y=top+4*sag*t*(1-t);pts.push([x,y,0])}
    for(var L=0;L<5;L++){var P=pts.map(function(p){return[p[0],p[1]+(L-2)*.6,0]});
      for(var p=0;p<P.length;p++)P[p][2]=L<3?R()*6.283:-Math.PI/2+rr(-1.4,1.4);
      layers[L]+=needles(P,L<2?4:3,L<2?15:11,L<3?3.2:1.1)}
    cable+='M'+x0+' '+(top+2)+'Q'+(x0+sw/2)+' '+(top+2+sag*2)+' '+x1+' '+(top+2);
    var nl=Math.max(4,Math.round(sw/38));
    for(var k=1;k<nl;k++){var t2=k/nl,lx=x0+t2*sw,ly=top+4*sag*t2*(1-t2)+5+rr(-1,2);lights+=light(lx.toFixed(1),ly.toFixed(1),W<600?2.6:3,(s*nl+k)%3,s*nl+k)}
  }
  for(var b=0;b<=n;b++)bows+=bow((b*sw).toFixed(1),top+1,W<600?.8:.95,b%2==1);
  var g='';for(var L2=0;L2<5;L2++)g+='<path d="'+layers[L2]+'" stroke="'+GREENS[L2]+'" stroke-width="'+(L2<2?1.9:1.3)+'" stroke-linecap="round" fill="none"/>';
  var svg='<svg xmlns="'+NS+'" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'">'+DEFS+
   '<g filter="url(#xsh)">'+g+'</g><path d="'+cable+'" stroke="#1b1208" stroke-width=".8" fill="none" opacity=".6"/>'+lights+bows+'</svg>';
  if(!gar){gar=document.createElement('div');gar.className='xg';gar.setAttribute('aria-hidden','true');header.appendChild(gar)}
  gar.innerHTML=svg}
buildGarland();var gw=document.documentElement.clientWidth;addEventListener('resize',function(){var w=document.documentElement.clientWidth;if(Math.abs(w-gw)>40){gw=w;buildGarland()}});

function buildTree(){
  var foot=document.querySelector('footer');if(!foot||document.querySelector('.xtree'))return;seed=42;
  var cx=150,snowOn='',orn='',lts='',gl='',body='';
  var tiers=[[38,74,30],[62,108,48],[92,146,68],[126,186,90]];
  tiers.forEach(function(t,i){var ty=t[0]-(i?12:0),by=t[1],hw=t[2],sc=5+i;
    var d='M'+cx+' '+ty+'Q'+(cx-hw*.35)+' '+(by-(by-ty)*.4)+' '+(cx-hw)+' '+by;
    for(var k=0;k<sc;k++){var xa=cx-hw+(2*hw)*(k/sc),xb=cx-hw+(2*hw)*((k+1)/sc);d+='Q'+((xa+xb)/2)+' '+(by+7)+' '+xb+' '+by}
    d+='Q'+(cx+hw*.35)+' '+(by-(by-ty)*.4)+' '+cx+' '+ty+'Z';
    body+='<path d="'+d+'" fill="url(#xtg)"/>';
    var P=[[],[],[],[]];
    for(var u=0;u<=1;u+=.025){var yy=ty+(by-ty)*u,half=hw*Math.pow(u,.9);
      P[0].push([cx-half,yy,Math.PI*0.75]);P[1].push([cx+half,yy,Math.PI*0.25]);}
    for(var v=0;v<=1;v+=.012){var xx=cx-hw+2*hw*v,ph=(v*sc)%1;P[2].push([xx,by+7*4*ph*(1-ph)/2-1,Math.PI/2])}
    for(var w=0;w<70+i*30;w++){var u2=R(),half2=hw*Math.pow(u2,.9)*.9;P[3].push([cx+rr(-half2,half2),ty+(by-ty)*u2,rr(0,6.28)])}
    body+='<path d="'+needles(P[0],3,9,.6)+needles(P[1],3,9,.6)+needles(P[2],2,8,.7)+'" stroke="#0e4325" stroke-width="1.4" stroke-linecap="round"/>';
    body+='<path d="'+needles(P[3],1,7,3)+'" stroke="'+(i%2?'#2b8547':'#1d6b3a')+'" stroke-width="1.1" stroke-linecap="round"/>';
    var hl=P[3].filter(function(p){return p[0]<cx});body+='<path d="'+needles(hl,1,6,1)+'" stroke="#5bb56c" stroke-width=".9" stroke-linecap="round" opacity=".8"/>';
    for(var k2=0;k2<sc;k2++){if(R()<.35)continue;var xa2=cx-hw+(2*hw)*((k2+.5)/sc),yy2=by-3-rr(0,4);snowOn+='<path d="M'+(xa2-9)+' '+(yy2+2)+'q4-6 9-5t9 5q-4 2-9 1.5t-9-1.5z" fill="url(#xsnow)"/>'}
    snowOn+='<path d="M'+(cx-6)+' '+(ty+10+i*2)+'q6-6 12 0q-6 2-12 0z" fill="url(#xsnow)" opacity=".9"/>';
  });
  [[66,95,30],[100,134,48],[136,172,70]].forEach(function(g){gl+='<path d="M'+(cx-g[2])+' '+g[0]+'Q'+cx+' '+(g[1]+8)+' '+(cx+g[2])+' '+(g[0]+12)+'" fill="none" stroke="#ffd36a" stroke-width="2.2" stroke-dasharray="0.1 5" stroke-linecap="round"/>'});
  var O=[[132,64,'xlR'],[165,90,'xlG'],[122,108,'xlB'],[176,124,'xlR'],[104,140,'xlG'],[150,150,'xlW'],[192,160,'xlB'],[86,172,'xlR'],[132,178,'xlG'],[214,180,'xlR']];
  O.forEach(function(o,i){var r=i%3?5:6.2;orn+='<g filter="url(#xsh)"><rect x="'+(o[0]-1.8)+'" y="'+(o[1]-r-2.2)+'" width="3.6" height="2.6" rx=".6" fill="#d8b25a"/><circle cx="'+o[0]+'" cy="'+o[1]+'" r="'+r+'" fill="url(#'+o[2]+')"/></g><circle cx="'+(o[0]-r*.35)+'" cy="'+(o[1]-r*.35)+'" r="'+(r*.28)+'" fill="#fff" opacity=".8"/>'});
  var Lp=[[146,52],[158,72],[140,84],[110,96],[190,104],[150,118],[96,126],[208,140],[170,142],[120,160],[74,182],[180,172],[226,190],[160,190],[104,190]];
  Lp.forEach(function(p,i){lts+=light(p[0],p[1],2.2,i%3==0?1:i%3==1?2:0,i)});
  var st='';for(var a=0;a<10;a++){var ang=-Math.PI/2+a*Math.PI/5,rad=a%2?6:15;st+=(a?'L':'M')+(cx+Math.cos(ang)*rad).toFixed(1)+' '+(24+Math.sin(ang)*rad).toFixed(1)}
  var star='<g class="xstar"><circle cx="'+cx+'" cy="24" r="32" fill="url(#xglow)"/></g><path d="'+st+'Z" fill="url(#xstarg)" stroke="#b9800d" stroke-width=".8" stroke-linejoin="round" filter="url(#xsh)"/><path d="M'+cx+' 9L'+(cx+3)+' 20 '+cx+' 24Z" fill="#fff" opacity=".55"/>';
  function gift(x,y,w,h,c1,c2,rib,ribD){return '<g filter="url(#xsh)"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="2.5" fill="url(#'+c1+')"/>'+
    '<rect x="'+(x-2)+'" y="'+(y-1)+'" width="'+(w+4)+'" height="'+(h*.22)+'" rx="2" fill="url(#'+c2+')"/>'+
    '<rect x="'+(x+w/2-3)+'" y="'+y+'" width="6" height="'+h+'" fill="'+rib+'"/>'+
    '<rect x="'+(x+w/2-3)+'" y="'+(y-1)+'" width="6" height="'+(h*.22)+'" fill="'+ribD+'"/>'+
    '<rect x="'+(x+3)+'" y="'+(y+h*.3)+'" width="3" height="'+(h*.6)+'" rx="1.5" fill="#fff" opacity=".18"/>'+
    '<path d="M'+(x-2)+' '+(y-1)+'q'+((w+4)/2)+' -5 '+(w+4)+' 0q-'+((w+4)/2)+' 3 -'+(w+4)+' 0z" fill="url(#xsnow)"/></g>'+
    bow(x+w/2,y-3,.62,rib=='#f4f6fb')}
  var gifts=gift(70,212,44,36,'xpR','xpRl','#ffd36a','#e0a93a')+gift(184,206,40,42,'xpG','xpGl','#f4f6fb','#cfd6e6')+gift(118,222,34,28,'xpB','xpBl','#ff4a55','#c21622')+gift(158,226,30,24,'xpW','xpWl','#d4121f','#9a0d18');
  var defs2='<defs><linearGradient id="xtg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1f7a41"/><stop offset=".55" stop-color="#145a31"/><stop offset="1" stop-color="#0b3a21"/></linearGradient>'+
   '<linearGradient id="xstarg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".5" stop-color="#ffd23f"/><stop offset="1" stop-color="#e09b0b"/></linearGradient>'+
   '<linearGradient id="xtrunk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4a26"/><stop offset="1" stop-color="#3d2312"/></linearGradient>'+
   '<radialGradient id="xmound" cx=".45" cy=".2" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e3ecfb"/><stop offset="1" stop-color="#9fb4dc"/></radialGradient>'+
   [['xpR','#ff5a63','#b3111d'],['xpRl','#ff7078','#c8202c'],['xpG','#2fa35a','#145c32'],['xpGl','#45b86d','#1b7040'],['xpB','#6a5cff','#3020a8'],['xpBl','#8174ff','#3d2cc0'],['xpW','#ffffff','#c9d2e6'],['xpWl','#ffffff','#dde3f0']].map(function(g){return '<linearGradient id="'+g[0]+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+g[1]+'"/><stop offset="1" stop-color="'+g[2]+'"/></linearGradient>'}).join('')+'</defs>';
  var mound='<ellipse cx="150" cy="262" rx="140" ry="10" fill="#000" opacity=".35" filter="url(#xsoft)"/><path d="M14 262C40 238 100 236 150 238S262 240 286 262Z" fill="url(#xmound)"/><path d="M40 250C80 242 120 241 150 242" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>';
  var sparkle='';for(var q=0;q<14;q++)sparkle+='<circle cx="'+rr(30,270).toFixed(1)+'" cy="'+rr(244,258).toFixed(1)+'" r="'+rr(.5,1.2).toFixed(1)+'" fill="#fff" opacity="'+rr(.5,1).toFixed(2)+'"/>';
  var svg='<svg xmlns="'+NS+'" viewBox="0 0 300 270" role="img" aria-label="Geschmückter Weihnachtsbaum mit Geschenken">'+DEFS+defs2+
    '<rect x="141" y="184" width="18" height="40" rx="3" fill="url(#xtrunk)"/><g filter="url(#xsh)">'+body+'</g>'+snowOn+gl+orn+lts+star+mound+gifts+sparkle+'</svg>';
  var d=document.createElement('div');d.className='xtree';d.innerHTML=svg;
  var slot=foot.querySelector('.dc-slot');if(slot)slot.after(d);else foot.prepend(d)}
buildTree();

var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var cv=document.createElement('canvas');cv.id='wx-snow';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
var ctx=cv.getContext('2d'),W,H,dpr,fl=[];
function size(){dpr=Math.min(window.devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
size();addEventListener('resize',size);
var SP=64,spr=document.createElement('canvas');spr.width=spr.height=SP;var sx=spr.getContext('2d'),rg=sx.createRadialGradient(SP/2,SP/2,0,SP/2,SP/2,SP/2);
rg.addColorStop(0,'rgba(255,255,255,1)');rg.addColorStop(.35,'rgba(250,252,255,.85)');rg.addColorStop(.65,'rgba(230,240,255,.3)');rg.addColorStop(1,'rgba(220,235,255,0)');sx.fillStyle=rg;sx.fillRect(0,0,SP,SP);
var LAY=[{r:[.8,1.6],v:[.25,.45],o:[.25,.45]},{r:[1.6,2.8],v:[.5,.8],o:[.45,.7]},{r:[3,5.2],v:[.9,1.4],o:[.5,.8]}];
var mob=W<700,N=reduce?50:(mob?120:260);
seed=(Date.now()%2147483646)+1;
function mk(top){var q=R(),L=q<.45?0:(q<.8?1:2),l=LAY[L];
  return{x:Math.random()*(W+H*.6),y:top?-12:Math.random()*H,r:rr(l.r[0],l.r[1]),o:rr(l.o[0],l.o[1]),v:rr(l.v[0],l.v[1]),p:Math.random()*6.28,ps:rr(.006,.018),a:rr(.2,.9)}}
for(var k=0;k<N;k++)fl.push(mk());
function draw(){ctx.clearRect(0,0,W,H);for(var j=0;j<fl.length;j++){var f=fl[j],s=f.r*2.6;ctx.globalAlpha=f.o;ctx.drawImage(spr,f.x-s/2,f.y-s/2,s,s)}ctx.globalAlpha=1}
if(reduce){draw();return}
var last=0,wind=.55;
function step(t){var dt=Math.min((t-last)/16.7||1,3);last=t;wind=.55+Math.sin(t/7000)*.2;
  for(var j=0;j<fl.length;j++){var f=fl[j];f.p+=f.ps*dt;f.y+=f.v*dt;f.x-=(f.v*wind+Math.sin(f.p)*f.a*.5)*dt;
    if(f.y>H+12||f.x<-12)fl[j]=mk(true)}
  draw();requestAnimationFrame(step)}
requestAnimationFrame(step);
})();
