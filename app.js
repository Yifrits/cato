const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0');
const keyOf=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const todayKey=()=>keyOf(new Date());
const dayNum=()=>{const d=new Date();return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())-Date.UTC(2026,0,1))/864e5)};
const MES=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const fdate=d=>d.getDate()+' '+MES[d.getMonth()];

const IC={
 cards:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="13" height="16" rx="3"/><path d="M8 3h9a3 3 0 0 1 3 3v11"/></svg>',
 spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c.6 3.8 2.2 6.4 4.6 7.4 2 .8 3.4 1.5 5.4 2.6-2 1.1-3.4 1.8-5.4 2.6-2.4 1-4 3.6-4.6 7.4-.6-3.8-2.2-6.4-4.6-7.4C5.4 13.8 4 13.1 2 12c2-1.1 3.4-1.8 5.4-2.6C9.8 8.4 11.4 5.8 12 2z"/></svg>',
 chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z"/></svg>',
 user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 heart:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
 dots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
 send:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 11.5 21 3l-5.5 18-3.8-6.7L3 11.5z"/></svg>',
 flame:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s5 4.2 5 9.5A5 5 0 0 1 7 12c0-1.6.7-2.8 1.5-3.6.2 1.5 1 2.3 2 2.6C10 8.2 11 4.8 12 2zm0 20a6 6 0 0 1-6-6c0-1.6.6-3 1.6-4.2.3 2.3 2 3.6 3.4 3.6 0 0 2-1 2-3.4 1.7 1.2 5 3.4 5 4A6 6 0 0 1 12 22z"/></svg>'
};

const INTERESTS=['Música','Cine','Series','Anime','Videojuegos','Fútbol','Gym','Baile','Lectura','Viajar','Fotografía','Cocinar','Café','Arte','Mascotas','Naturaleza','Fiestas','Tecnología','Idiomas','Memes','Teatro','Karaoke','Juegos de mesa','Moda','Podcasts','Estudiar en grupo'];
const GENDERS=['Mujer','Hombre','No binario','Prefiero no decir'];
const LOOKING=[['amistad','Amistad'],['conocer','Conocer personas']];
const ICE=['Mi lugar favorito de la U es…','Un plan perfecto después de clases es…','Lo que más busco en un amigo es…','Mi canción del momento es…','Algo que casi nadie sabe de mí…','Mi comida favorita cerca de la U es…'];
const QUESTIONS=['¿Cuál es tu lugar favorito de la U?','¿Qué canción te representa hoy?','¿Cuál es el mejor plan después de clases?','¿Qué materia te cambió la vida (o la salud mental)?','¿Qué comida de por la U recomiendas sí o sí?','¿Qué haces cuando tienes una hora libre entre clases?','¿Cuál fue tu mejor momento en la U este año?','¿Qué serie estás viendo ahora?','¿Dónde estudias mejor: biblioteca, casa o cafetería?','¿Qué superpoder tendrías en época de exámenes?','¿Cuál es tu snack imprescindible?','¿Qué lugar de la ciudad todo estudiante debería conocer?','¿Qué hobby te gustaría empezar?','¿Cuál es tu película para ver con amigos?','¿Qué te hace reír sin falta?','¿Qué consejo le darías a alguien de primer semestre?','¿Playa, montaña o ciudad?','¿Qué habilidad inútil tienes?','¿Cuál es tu mayor obsesión del momento?','¿Qué club o actividad de la U te gustaría probar?','¿Cuál es tu plan ideal de fin de semana?','¿Qué libro o juego recomiendas?','¿Cuál es la mejor hora del día para ti?','¿Qué cosa pequeña te alegra el día?','¿Qué idioma o instrumento te gustaría aprender?','¿Cuál es tu mejor consejo para sobrevivir a un trabajo grupal?','¿Qué lugar de la U te da más paz?','¿Cuál es tu bebida de siempre?','¿A qué famoso invitarías a almorzar?','¿Qué tradición o costumbre tuya es única?'];
const DEMO=[
 {id:'demo1',demo:true,name:'Valentina',birth:'2002-03-14',gender:'Mujer',lookingFor:['amistad','conocer'],interests:['Café','Cine','Fotografía','Mascotas','Música'],bio:'Estudio diseño. Busco gente para ir a conciertos y probar cafeterías nuevas.',career:'Diseño gráfico',semester:6,photos:[],ice:{q:ICE[0],a:'El patio de atrás, justo al atardecer.'},artists:'Cuco, Natalia Lafourcade',ig:'vale.ejemplo'},
 {id:'demo2',demo:true,name:'Mateo',birth:'2001-09-02',gender:'Hombre',lookingFor:['amistad'],interests:['Fútbol','Videojuegos','Música','Series'],bio:'Fútbol los sábados. Si sabes de algún torneo, avísame.',career:'Ingeniería comercial',semester:8,photos:[],ice:{q:ICE[2],a:'Que me avise cuando hay empanadas gratis.'},artists:'',ig:''},
 {id:'demo3',demo:true,name:'Camila',birth:'2003-11-20',gender:'Mujer',lookingFor:['conocer'],interests:['Anime','Lectura','Karaoke','Memes','Idiomas'],bio:'Recién llegada a la ciudad, quiero conocer gente de otras carreras.',career:'Psicología',semester:2,photos:[],ice:{q:ICE[1],a:'Karaoke y salteñas.'},artists:'Yoasobi',ig:'cami.ejemplo'}
];

let db=null,uid=null,unsubChat=null;
const S={me:null,profiles:{},swipes:{},answers:{},reacts:{},chats:{},blocks:[],lines:{},
  ready:false,offline:false,slow:false,demo:false,demoSeen:{}};
const ui={tab:'discover',filt:'all',pi:{},dayOff:0,chat:null};
let seen={};try{seen=JSON.parse(localStorage.getItem('cato_seen')||'{}')}catch(e){}
let draft=null,dirty=false;

/* ---------- utilidades ---------- */
function age(b){if(!b)return null;const p=b.split('-').map(Number);if(p.length<3)return null;const t=new Date();let a=t.getFullYear()-p[0];if(t<new Date(t.getFullYear(),p[1]-1,p[2]))a--;return a}
function hue(s){let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))%360;return h}
function avatar(p,size){
  const st='width:'+size+'px;height:'+size+'px;font-size:'+Math.round(size*.45)+'px;background:linear-gradient(135deg,hsl('+hue(p.name||'?')+' 80% 52%),hsl('+((hue(p.name||'?')+50)%360)+' 85% 45%))';
  const ph=p.photos&&p.photos[0];
  return '<div class="av" style="'+st+'">'+(ph?'<img src="'+esc(ph)+'" alt="">':esc((p.name||'?').trim().charAt(0).toUpperCase()))+'</div>';
}
function toast(t){const el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('on'),2200)}
const Q={};function wq(k,f){const p=(Q[k]||Promise.resolve()).catch(()=>{}).then(f);Q[k]=p;return p}
const pid=(a,b)=>[a,b].sort().join('~');
const blocked=id=>S.blocks.includes(id);
const mySwipe=()=>{const s=S.swipes[uid]||{};return{liked:(s.liked||[]).slice(),passed:(s.passed||[]).slice()}};
function shared(a,b){const x=(a.interests||[]),y=new Set(b.interests||[]);return x.filter(i=>y.has(i))}
function affinity(a,b){const n=shared(a,b).length;if(!n)return 0;return Math.min(99,Math.round(100*n/Math.max(3,Math.min((a.interests||[]).length,(b.interests||[]).length))))}
function streakOf(days){
  const keys=new Set(Object.keys(days||{}));const d=new Date();d.setHours(0,0,0,0);
  if(!keys.has(keyOf(d))){d.setDate(d.getDate()-1);if(!keys.has(keyOf(d)))return 0}
  let n=0;while(keys.has(keyOf(d))){n++;d.setDate(d.getDate()-1)}return n;
}
const myDays=()=>((S.answers[uid]||{}).days)||{};
const qFor=off=>{const n=QUESTIONS.length;return QUESTIONS[(((dayNum()-off)%n)+n)%n]};
const dayKeyOff=off=>{const d=new Date();d.setDate(d.getDate()-off);return keyOf(d)};

/* ---------- datos ---------- */
function deck(){
  if(S.demo)return DEMO.filter(p=>!S.demoSeen[p.id]);
  const me=S.me;if(!me)return[];
  const sw=mySwipe(),done=new Set(sw.liked.concat(sw.passed));
  return Object.values(S.profiles).filter(p=>p.id!==uid&&!done.has(p.id)&&!blocked(p.id)&&(p.lookingFor||[]).some(x=>(me.lookingFor||[]).includes(x))&&(ui.filt==='all'||(p.lookingFor||[]).includes(ui.filt)))
    .sort((a,b)=>shared(b,me).length-shared(a,me).length||(b.updatedAt||0)-(a.updatedAt||0));
}
function matches(){
  if(!uid)return[];const my=(S.swipes[uid]||{}).liked||[];
  return Object.values(S.profiles).filter(p=>p.id!==uid&&!blocked(p.id)&&my.includes(p.id)&&((S.swipes[p.id]||{}).liked||[]).includes(uid));
}
function chatList(){
  return Object.values(S.chats).filter(c=>{const o=(c.members||[]).find(m=>m!==uid);return o&&!blocked(o)&&S.profiles[o]})
    .sort((a,b)=>(b.lastAt||0)-(a.lastAt||0));
}
const isUnread=c=>c.lastFrom&&c.lastFrom!==uid&&(c.lastAt||0)>(seen[c.id]||0);

/* ---------- Supabase: conexión, carga de datos y sesión ---------- */
const CFG=window.CATO_CONFIG||{};
const configured=!!(CFG.SUPABASE_URL&&CFG.SUPABASE_ANON_KEY&&!/TU-/.test(CFG.SUPABASE_URL+CFG.SUPABASE_ANON_KEY)&&window.supabase);
let sb=null,rt=null,pollT=null;
Object.assign(S,{session:null,authMode:'in',authMsg:''});
function werr(e){console.error(e);toast('No se pudo guardar. Revisa tu conexión e intenta otra vez.')}
const toP=r=>({id:r.id,name:r.name,birth:r.birth,gender:r.gender,lookingFor:r.looking_for||[],interests:r.interests||[],bio:r.bio||'',career:r.career||'',semester:r.semester||'',hideCareer:!!r.hide_career,ig:r.ig||'',artists:r.artists||'',photos:r.photos||[],ice:r.ice||null,updatedAt:Date.parse(r.updated_at)||0});

async function loadProfiles(){
  const {data,error}=await sb.from('profiles').select('*');if(error)return console.error(error);
  const o={};data.forEach(r=>{o[r.id]=toP(r)});S.profiles=o;S.me=o[uid]||null;
  if(ui.chat&&o[ui.chat.other.id])ui.chat.other=o[ui.chat.other.id];
}
async function loadSwipes(){
  const {data,error}=await sb.from('swipes').select('swiper,target,liked').or('swiper.eq.'+uid+',target.eq.'+uid);if(error)return console.error(error);
  const o={};o[uid]={liked:[],passed:[]};
  data.forEach(r=>{if(r.swiper===uid)(r.liked?o[uid].liked:o[uid].passed).push(r.target);else if(r.liked)(o[r.swiper]=o[r.swiper]||{liked:[]}).liked.push(uid)});
  S.swipes=o;
}
async function loadAnswers(){
  const [a,b]=await Promise.all([sb.from('daily_answers').select('user_id,day,body,created_at').gte('day',dayKeyOff(2)),sb.from('daily_answers').select('day').eq('user_id',uid)]);
  if(a.error)return console.error(a.error);
  const o={};
  (b.data||[]).forEach(r=>{(o[uid]=o[uid]||{days:{}}).days[r.day]={at:0}});
  a.data.forEach(r=>{(o[r.user_id]=o[r.user_id]||{days:{}}).days[r.day]={t:r.body,at:Date.parse(r.created_at)||0}});
  S.answers=o;
}
async function loadReacts(){
  const {data,error}=await sb.from('answer_reactions').select('user_id,author_id,day').gte('day',dayKeyOff(3));if(error)return console.error(error);
  const o={};data.forEach(r=>{(o[r.user_id]=o[r.user_id]||{m:{}}).m[r.day+'|'+r.author_id]=1});S.reacts=o;
}
async function loadBlocks(){
  const {data,error}=await sb.from('blocks').select('blocked').eq('blocker',uid);if(error)return console.error(error);
  S.blocks=data.map(r=>r.blocked);
}
async function loadMsgs(){
  const {data,error}=await sb.from('messages').select('sender,recipient,body,created_at').order('created_at',{ascending:false}).limit(1500);if(error)return console.error(error);
  const chats={},lines={};
  data.reverse().forEach(r=>{
    const other=r.sender===uid?r.recipient:r.sender,id=pid(uid,other),at=Date.parse(r.created_at)||0;
    const L=(lines[id]=lines[id]||{});(L[r.sender]=L[r.sender]||[]).push({t:r.body,at});
    chats[id]={id,members:[uid,other],last:r.body.slice(0,60),lastAt:at,lastFrom:r.sender};
  });
  S.chats=chats;S.lines=lines;if(ui.chat)paintMsgs();
}
async function loadAll(){await Promise.all([loadProfiles(),loadSwipes(),loadAnswers(),loadReacts(),loadBlocks(),loadMsgs()])}

function startRealtime(){
  stopRealtime();
  let t;const reload=()=>{clearTimeout(t);t=setTimeout(()=>loadAll().then(paint),500)};
  rt=sb.channel('cato-changes');
  ['profiles','swipes','daily_answers','answer_reactions','messages','blocks'].forEach(n=>rt.on('postgres_changes',{event:'*',schema:'public',table:n},reload));
  rt.subscribe();
  pollT=setInterval(()=>{if(!document.hidden)reload()},60000);
}
function stopRealtime(){if(rt){sb.removeChannel(rt);rt=null}clearInterval(pollT)}
async function onSession(session){
  S.session=session;uid=session?session.user.id:null;
  if(!uid){S.me=null;S.profiles={};S.chats={};S.lines={};S.ready=true;stopRealtime();ui.chat=null;$('#chat').innerHTML='';paint();return}
  S.ready=false;paint();
  try{await loadAll()}catch(e){console.error(e)}
  S.ready=true;startRealtime();paint();
}
function boot(){
  if(!configured){S.ready=true;paint();return}
  paint();
  sb=window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY);
  sb.auth.onAuthStateChange((ev,s)=>{if(ev==='TOKEN_REFRESHED')return;setTimeout(()=>onSession(s),0)});
}

/* ---------- acceso: entrar y crear cuenta ---------- */
function authErr(m){
  if(/invalid login/i.test(m))return 'Correo o contraseña incorrectos.';
  if(/already registered/i.test(m))return 'Ese correo ya tiene cuenta. Entra con tu contraseña.';
  if(/password/i.test(m)&&/6/.test(m))return 'La contraseña debe tener al menos 6 caracteres.';
  if(/confirm/i.test(m))return 'Confirma tu correo antes de entrar.';
  return m;
}
document.addEventListener('submit',async e=>{
  if(e.target.id!=='authForm')return;e.preventDefault();
  const em=$('#aEmail').value.trim(),pw=$('#aPass').value;S.authMsg='';
  if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();
  try{
    if(S.authMode==='up'){
      const r=await sb.auth.signUp({email:em,password:pw});
      if(r.error)S.authMsg=authErr(r.error.message);
      else if(!r.data.session){S.authMsg='Te enviamos un correo para confirmar la cuenta. Después entra aquí.';S.authMode='in'}
    }else{
      const r=await sb.auth.signInWithPassword({email:em,password:pw});
      if(r.error)S.authMsg=authErr(r.error.message);
    }
  }catch(err){S.authMsg='Sin conexión. Intenta otra vez.'}
  paint();
});
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]');if(!el)return;
  if(el.dataset.act==='authmode'){S.authMode=S.authMode==='in'?'up':'in';S.authMsg='';paint()}
  if(el.dataset.act==='signout'){sb&&sb.auth.signOut()}
});

function vWelcome(){
  const logo='<img data-logo alt="">';
  if(!configured)return '<div class="empty">'+logo+'<h2>Falta conectar la base de datos</h2><p>Abre config.js y pega la URL y la clave de tu proyecto de Supabase. Los pasos están en el README.</p><button class="btn" data-act="demo">Ver ejemplos</button></div>';
  if(!S.ready)return '<div class="empty">'+logo+'<p>Cargando CATO!…</p></div>';
  if(!S.session)return '<div class="empty" style="padding-bottom:8px">'+logo+'<h2>Conoce gente de tu U</h2><p>Entra o crea una cuenta para armar tu perfil.</p></div>'
   +'<form id="authForm" autocomplete="on">'+(S.authMsg?'<div class="note">'+esc(S.authMsg)+'</div>':'')
   +'<label class="l" for="aEmail">Correo</label><input class="fld" id="aEmail" type="email" autocomplete="email" required>'
   +'<label class="l" for="aPass">Contraseña <small>(mínimo 6 caracteres)</small></label><input class="fld" id="aPass" type="password" minlength="6" autocomplete="'+(S.authMode==='up'?'new-password':'current-password')+'" required>'
   +'<button class="btn block" style="margin-top:16px">'+(S.authMode==='up'?'Crear cuenta':'Entrar')+'</button></form>'
   +'<p class="muted" style="text-align:center;margin-top:14px">'+(S.authMode==='up'?'¿Ya tienes cuenta? ':'¿Primera vez? ')+'<button class="link" data-act="authmode">'+(S.authMode==='up'?'Entrar':'Crear cuenta')+'</button></p>'
   +'<p style="text-align:center;margin-top:6px"><button class="link" data-act="demo">Ver ejemplos</button></p>';
  return '<div class="empty">'+logo+'<h2>Conoce gente de tu U</h2><p>Crea tu perfil con tus gustos, descubre personas con intereses parecidos y responde la pregunta del día para mantener tu racha.</p><button class="btn" data-act="edit">Crear mi perfil</button><button class="btn ghost" data-act="demo">Ver ejemplos</button><button class="link" data-act="signout">Cerrar sesión</button></div>';
}
function vProfile(){
  if(!S.me)return vWelcome();
  const st=streakOf(myDays());
  return '<div class="qcard" style="margin-bottom:16px"><span class="lbl">Tu racha</span><h2>'+st+(st===1?' día seguido':' días seguidos')+'</h2><p class="sm" style="opacity:.9">'+(myDays()[todayKey()]?'Ya respondiste hoy.':'Responde la pregunta de hoy para mantenerla.')+'</p></div>'
   +'<div style="display:flex;gap:10px;margin-bottom:16px"><button class="btn block" data-act="edit">Editar perfil</button><button class="btn ghost" data-act="signout">Salir</button></div>'
   +'<div class="sect" style="margin-top:0;margin-bottom:10px">Así te ven los demás</div>'+cardHtml(S.me,{noAff:true});
}
function commitSwipe(p,liked){
  if(p.demo){S.demoSeen[p.id]=1;paint();if(liked&&p.id==='demo2')showMatch(p);else if(liked)toast('Así se vería tu like. Es un ejemplo.');return}
  const sw=mySwipe();(liked?sw.liked:sw.passed).push(p.id);S.swipes[uid]=sw;paint();
  wq('sw',async()=>{const {error}=await sb.from('swipes').upsert({swiper:uid,target:p.id,liked});if(error)throw error}).catch(werr);
  if(liked&&((S.swipes[p.id]||{}).liked||[]).includes(uid))showMatch(p);
}

/* ---------- vistas ---------- */
function cardHtml(p,o){
  o=o||{};const photos=p.photos||[];const i=Math.min(ui.pi[p.id]||0,Math.max(0,photos.length-1));
  const a=age(p.birth),me=S.me||{},sh=o.noAff?[]:shared(p,me),aff=o.noAff?0:affinity(p,me);
  const look=(p.lookingFor||[]).map(x=>(LOOKING.find(l=>l[0]===x)||[0,x])[1]).join(' · ');
  const career=(!p.hideCareer&&p.career)?esc(p.career)+(p.semester?' · '+esc(p.semester)+'° sem':''):'';
  return '<article class="card" id="'+(o.top?'topcard':'')+'"><div class="ph" '+(o.top?'data-top="1" ':'')+'data-id="'+esc(p.id)+'">'
   +(photos.length?'<img src="'+esc(photos[i])+'" alt="">':'<div class="bigav" style="background:linear-gradient(135deg,hsl('+hue(p.name||'?')+' 80% 52%),hsl('+((hue(p.name||'?')+50)%360)+' 85% 45%))">'+esc((p.name||'?').charAt(0).toUpperCase())+'</div>')
   +(photos.length>1?'<div class="dots">'+photos.map((_,k)=>'<i class="'+(k===i?'on':'')+'"></i>').join('')+'</div>':'')
   +(p.demo?'<span class="tag">Ejemplo</span>':(o.menu?'<button class="more" data-act="menu" data-id="'+esc(p.id)+'" aria-label="Más opciones">'+IC.dots+'</button>':''))
   +'<span class="stamp yes">ME GUSTA</span><span class="stamp no">PASO</span>'
   +'<div class="fade"><h2>'+esc(p.name||'Sin nombre')+(a!=null?', '+a:'')+'</h2><span>'+(career||esc(look))+'</span></div></div>'
   +'<div class="info">'
   +(aff?'<div class="aff">'+IC.spark.replace('<svg','<svg width="16" height="16"')+' '+aff+'% de afinidad · '+sh.length+' en común</div>':'')
   +(career&&look?'<div class="muted sm" style="margin-top:-6px">Busca: '+esc(look)+'</div>':'')
   +(p.bio?'<p>'+esc(p.bio)+'</p>':'')
   +((p.interests||[]).length?'<div class="chips">'+p.interests.map(x=>'<span class="chip'+(sh.includes(x)?' sh':'')+'">'+esc(x)+'</span>').join('')+'</div>':'')
   +(p.ice&&p.ice.a?'<div class="ice"><small>'+esc(p.ice.q)+'</small>'+esc(p.ice.a)+'</div>':'')
   +(p.artists?'<div class="sm"><b>Escucha:</b> '+esc(p.artists)+'</div>':'')
   +(p.ig?'<div class="sm"><b>Instagram:</b> @'+esc(String(p.ig).replace(/^@/,''))+'</div>':'')
   +'</div></article>';
}
function vDiscover(){
  const list=deck(),p=list[0];
  const f='<div class="filters">'+[['all','Todos'],['amistad','Amistad'],['conocer','Conocer personas']].map(x=>'<button class="opt '+(ui.filt===x[0]?'on':'')+'" data-act="filt" data-v="'+x[0]+'">'+x[1]+'</button>').join('')+'</div>';
  if(!p){
    const others=Object.keys(S.profiles).filter(i=>i!==uid).length;
    return (S.demo?'':f)+'<div class="empty"><img data-logo alt=""><h2>'+(S.demo?'Eso fue todo':others?'Ya viste a todos':'Aún no hay nadie más')+'</h2><p>'+(S.demo?'Así funciona el swipe. Cuando haya perfiles reales, aparecerán aquí.':others?'Vuelve más tarde o cambia el filtro. Mientras tanto, responde la pregunta del día.':'Invita a tus amigos desde el botón Compartir de Claude para que aparezcan aquí.')+'</p>'
     +(S.demo?'<button class="btn" data-act="undemo">Volver</button>':'<button class="btn ghost" data-act="demo">Ver ejemplos</button>')+'</div>';
  }
  return (S.demo?'<div class="note">Estás viendo perfiles de ejemplo. Nada de esto se guarda.</div>':f)+cardHtml(p,{top:true,menu:!S.demo})
   +'<div class="actions"><button class="act no" data-act="pass" aria-label="Pasar">'+IC.x+'</button><button class="act yes" data-act="like" aria-label="Me gusta">'+IC.heart+'</button></div>';
}
function vToday(){
  const off=ui.dayOff,day=dayKeyOff(off),mine=myDays(),my=mine[day];
  const d=new Date();d.setDate(d.getDate()-off);
  const answered=my&&my.t;
  let h='<div class="qcard"><span class="lbl">'+(off?'Pregunta de ayer':'Pregunta del día')+' · '+fdate(d)+'</span><h2>'+esc(qFor(off))+'</h2>';
  if(answered)h+='<div class="mine"><b>Tu respuesta</b><p style="margin-top:2px">'+esc(my.t)+'</p></div>';
  else if(off===0&&S.me&&!S.demo)h+='<textarea id="ansIn" maxlength="150" placeholder="Escribe tu respuesta (máx. 150)" aria-label="Tu respuesta"></textarea><div class="foot"><span class="sm" id="ansCt">0 / 150</span><button class="btn" data-act="answer">Responder</button></div>';
  else if(off===0)h+='<p>Crea tu perfil para responder.</p>';
  else h+='<p class="sm" style="opacity:.85">No respondiste esta pregunta.</p>';
  h+='</div><div class="seg"><button class="opt '+(off===0?'on':'')+'" data-act="dayoff" data-v="0">Hoy</button><button class="opt '+(off===1?'on':'')+'" data-act="dayoff" data-v="1">Ayer</button></div>';
  const items=[];
  Object.keys(S.answers).forEach(a=>{const e=((S.answers[a]||{}).days||{})[day];if(e&&e.t&&!blocked(a)&&S.profiles[a])items.push({a,p:S.profiles[a],t:e.t,at:e.at||0})});
  items.sort((x,y)=>y.at-x.at);
  if(!items.length)h+='<div class="empty" style="padding:24px 0"><p>Todavía nadie respondió. Sé la primera persona.</p></div>';
  items.forEach(it=>{
    const k=day+'|'+it.a;let c=0,mineR=false;
    Object.keys(S.reacts).forEach(u=>{if(((S.reacts[u]||{}).m||{})[k]){c++;if(u===uid)mineR=true}});
    const me=it.a===uid;
    h+='<div class="ans">'+avatar(it.p,44)+'<div class="b"><div class="n"><span>'+esc(me?'Tú':it.p.name)+'</span></div><p class="t">'+esc(it.t)+'</p><div class="fo">'
     +(S.me&&!S.demo?'<button class="mini '+(mineR?'on':'')+'" data-act="react" data-d="'+day+'" data-id="'+esc(it.a)+'">'+IC.heart.replace('<svg','<svg width="14" height="14"')+' '+(c||'')+'</button>':'')
     +(!me&&S.me&&!S.demo?'<button class="mini" data-act="chat" data-id="'+esc(it.a)+'">Hablar</button>':'')+'</div></div></div>';
  });
  return h;
}
function vChats(){
  if(!S.me)return vWelcome();
  const ms=matches(),cl=chatList(),withChat=new Set(cl.map(c=>(c.members||[]).find(m=>m!==uid)));
  const fresh=ms.filter(p=>!withChat.has(p.id));
  let h='';
  if(fresh.length)h+='<div class="sect" style="margin-top:0">Nuevos matches</div><div class="matchrow">'+fresh.map(p=>'<button class="mt" data-act="chat" data-id="'+esc(p.id)+'">'+avatar(p,60)+'<span>'+esc(p.name)+'</span></button>').join('')+'</div>';
  if(cl.length)h+='<div class="sect" style="margin-top:0">Chats</div><div style="height:8px"></div>'+cl.map(c=>{const o=S.profiles[(c.members||[]).find(m=>m!==uid)];return '<button class="crow '+(isUnread(c)?'unread':'')+'" data-act="chat" data-id="'+esc(o.id)+'">'+avatar(o,48)+'<div class="b"><b>'+esc(o.name)+'</b><small>'+esc((c.lastFrom===uid?'Tú: ':'')+(c.last||''))+'</small></div>'+(isUnread(c)?'<span class="dot"></span>':'')+'</button>'}).join('');
  if(!fresh.length&&!cl.length)h='<div class="empty"><img data-logo alt=""><h2>Aún no hay chats</h2><p>Cuando haya un match, o cuando le escribas a alguien desde la pregunta del día, la conversación aparecerá aquí.</p></div>';
  return h;
}
function paintTabs(){
  const un=chatList().filter(isUnread).length;
  $('#tabs').innerHTML=[['discover','Descubrir',IC.cards],['today','Hoy',IC.spark],['chats','Chats',IC.chat],['me','Perfil',IC.user]].map(t=>
   '<button class="tab '+(ui.tab===t[0]?'on':'')+'" data-act="tab" data-v="'+t[0]+'">'+t[2]+t[1]+(t[0]==='chats'&&un?'<span class="badge">'+un+'</span>':'')+'</button>').join('');
  const st=S.me?streakOf(myDays()):0;
  $('#streakChip').innerHTML=st?'<span class="streak">'+IC.flame+st+'</span>':'';
}
function typing(){const a=document.activeElement;return a&&$('#view').contains(a)&&(a.tagName==='TEXTAREA'||a.tagName==='INPUT')}
function paint(){
  if(typing()){dirty=true;paintTabs();return}
  dirty=false;
  let h;
  if(!S.me&&!S.demo)h=vWelcome();
  else if(S.demo&&ui.tab!=='discover'){ui.tab='discover';h=vDiscover()}
  else h=ui.tab==='discover'?vDiscover():ui.tab==='today'?vToday():ui.tab==='chats'?vChats():vProfile();
  $('#view').innerHTML=h;
  document.querySelectorAll('[data-logo]').forEach(i=>{i.src=window.LOGO||''});
  paintTabs();
}

/* ---------- tarjeta: arrastrar y tocar ---------- */
let drag=null;
document.addEventListener('pointerdown',e=>{
  const ph=e.target.closest('.ph[data-top]');if(!ph||e.target.closest('.more'))return;
  drag={ph,card:ph.parentElement,x:e.clientX,y:e.clientY,dx:0,id:e.pointerId};
  try{ph.setPointerCapture(e.pointerId)}catch(err){}
});
document.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  drag.dx=e.clientX-drag.x;const c=drag.card;
  c.style.transition='none';c.style.transform='translateX('+drag.dx+'px) rotate('+drag.dx/22+'deg)';
  const y=c.querySelector('.stamp.yes'),n=c.querySelector('.stamp.no');
  y.style.opacity=Math.max(0,Math.min(1,drag.dx/110));n.style.opacity=Math.max(0,Math.min(1,-drag.dx/110));
});
document.addEventListener('pointerup',e=>{
  if(!drag||e.pointerId!==drag.id)return;
  const d=drag;drag=null;
  if(Math.abs(d.dx)>110){fly(d.card,d.dx>0);return}
  d.card.style.transition='transform .2s';d.card.style.transform='';
  d.card.querySelectorAll('.stamp').forEach(s=>s.style.opacity=0);
  if(Math.abs(d.dx)<6){
    const id=d.ph.dataset.id,p=S.demo?DEMO.find(x=>x.id===id):S.profiles[id];
    if(p&&p.photos&&p.photos.length>1){const r=d.ph.getBoundingClientRect(),n=p.photos.length;let i=ui.pi[id]||0;i=(e.clientX-r.left)<r.width/3?(i-1+n)%n:(i+1)%n;ui.pi[id]=i;paint()}
  }
});
document.addEventListener('pointercancel',()=>{if(drag){drag.card.style.transform='';drag=null}});
function fly(card,liked){
  const p=deck()[0];if(!p)return;
  card.style.transition='transform .22s ease-out,opacity .22s';
  card.style.transform='translateX('+(liked?'':'-')+'120%) rotate('+(liked?18:-18)+'deg)';card.style.opacity='0';
  setTimeout(()=>commitSwipe(p,liked),200);
}

/* ---------- acciones ---------- */
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]');if(!el)return;
  const a=el.dataset.act,v=el.dataset.v,id=el.dataset.id;
  switch(a){
   case 'tab':ui.tab=v;window.scrollTo(0,0);paint();break;
   case 'filt':ui.filt=v;paint();break;
   case 'dayoff':ui.dayOff=+v;paint();break;
   case 'demo':S.demo=true;S.demoSeen={};ui.tab='discover';paint();break;
   case 'undemo':S.demo=false;paint();break;
   case 'pass':case 'like':{const c=$('#topcard');if(c)fly(c,a==='like');break}
   case 'edit':openEdit();break;
   case 'answer':submitAnswer();break;
   case 'react':react(el.dataset.d,id);break;
   case 'chat':openChat(id);break;
   case 'menu':openMenu(id);break;
  }
});
document.addEventListener('input',e=>{
  if(e.target.id==='ansIn'){$('#ansCt').textContent=e.target.value.length+' / 150'}
});
document.addEventListener('focusout',()=>{setTimeout(()=>{if(dirty&&!typing())paint()},150)});

/* ---------- match ---------- */
function showMatch(p){
  $('#match').innerHTML='<div class="match"><h1>¡Hay match!</h1><p>Tú y '+esc(p.name)+' se gustaron.</p><div class="pair">'+avatar(S.me||{name:'Tú'},110)+avatar(p,110)+'</div>'
   +'<div style="display:flex;flex-direction:column;gap:10px;width:min(300px,100%)"><button class="btn block" style="background:var(--star);color:#2b1d00" id="mChat">Escribirle</button><button class="btn block" style="background:rgba(255,255,255,.18)" id="mClose">Seguir viendo</button></div></div>';
  $('#mClose').onclick=()=>{$('#match').innerHTML=''};
  $('#mChat').onclick=()=>{$('#match').innerHTML='';if(p.demo){toast('El chat es un ejemplo');return}openChat(p.id)};
}

function paintMsgs(){
  const c=ui.chat,box=$('#msgs');if(!c||!box)return;
  const L=S.lines[c.id]||{};let all=[];
  Object.keys(L).forEach(from=>L[from].forEach(m=>all.push({from,t:m.t,at:m.at})));
  all.sort((a,b)=>a.at-b.at);
  box.innerHTML=all.length?all.map(m=>{const d=new Date(m.at);return '<div class="bub '+(m.from===uid?'me':'')+'">'+esc(m.t)+'<small>'+pad(d.getHours())+':'+pad(d.getMinutes())+'</small></div>'}).join(''):'<p class="muted" style="text-align:center;margin-top:30px">Di hola a '+esc(c.other.name)+'.</p>';
  const body=$('#cBody');body.scrollTop=body.scrollHeight;
  const meta=S.chats[c.id];if(meta&&meta.lastAt){seen[c.id]=meta.lastAt;try{localStorage.setItem('cato_seen',JSON.stringify(seen))}catch(e){}}
}
function openEdit(){
  const m=S.me||{};
  draft={name:m.name||'',birth:m.birth||'',gender:m.gender||'',lookingFor:(m.lookingFor||[]).slice(),interests:(m.interests||[]).slice(),bio:m.bio||'',career:m.career||'',semester:m.semester||'',hideCareer:!!m.hideCareer,ig:m.ig||'',artists:m.artists||'',photos:(m.photos||[]).slice(),ice:Object.assign({q:ICE[0],a:''},m.ice||{})};
  const d=draft;
  $('#sheet').innerHTML='<div class="over"><div class="ohead"><button class="ib" id="eX" aria-label="Cerrar">'+IC.x+'</button><div class="t">'+(S.me?'Editar perfil':'Crear perfil')+'</div><button class="btn" id="eSave" style="padding:9px 18px">Guardar</button></div><div class="obody"><div class="in">'
  +'<p class="muted sm" style="margin-top:4px">Los campos con <span class="req">*</span> son obligatorios. Lo demás es opcional.</p>'
  +'<div class="sect">Lo básico</div>'
  +'<label class="l" for="fName">Nombre o apodo <span class="req">*</span></label><input class="fld" id="fName" maxlength="30" value="'+esc(d.name)+'">'
  +'<div class="row2"><div><label class="l" for="fBirth">Fecha de nacimiento <span class="req">*</span></label><input class="fld" id="fBirth" type="date" value="'+esc(d.birth)+'"></div>'
  +'<div><label class="l" for="fGender">Género <span class="req">*</span></label><select class="fld" id="fGender"><option value="">Elige</option>'+GENDERS.map(g=>'<option'+(d.gender===g?' selected':'')+'>'+g+'</option>').join('')+'</select></div></div>'
  +'<label class="l">Qué buscas <span class="req">*</span> <small>(puedes elegir ambas)</small></label><div class="opts" id="fLook">'+LOOKING.map(l=>'<button type="button" class="opt '+(d.lookingFor.includes(l[0])?'on':'')+'" data-v="'+l[0]+'">'+l[1]+'</button>').join('')+'</div>'
  +'<div class="sect">Fotos <span class="req" style="text-transform:none">*</span></div><p class="muted sm" style="margin-bottom:8px">La primera es tu foto principal. Mínimo 1, máximo 3.</p><div class="photos" id="fPhotos"></div>'
  +'<div class="sect">Intereses <span class="req" style="text-transform:none">*</span></div><p class="muted sm" style="margin-bottom:8px">Elige al menos 3 (máx. 12).</p><div class="opts" id="fInt"></div>'
  +'<div style="display:flex;gap:8px;margin-top:10px"><input class="fld" id="fCustom" maxlength="20" placeholder="Agregar otro interés"><button type="button" class="btn ghost" id="fAdd">Agregar</button></div>'
  +'<div class="sect">Sobre ti <span class="muted" style="text-transform:none;letter-spacing:0">(opcional)</span></div>'
  +'<label class="l" for="fBio">Biografía <small>(máx. 300)</small></label><textarea class="fld" id="fBio" maxlength="300">'+esc(d.bio)+'</textarea>'
  +'<div class="row2"><div><label class="l" for="fCareer">Carrera</label><input class="fld" id="fCareer" maxlength="40" value="'+esc(d.career)+'"></div><div><label class="l" for="fSem">Semestre</label><input class="fld" id="fSem" type="number" min="1" max="14" inputmode="numeric" value="'+esc(d.semester)+'"></div></div>'
  +'<button type="button" class="opt '+(d.hideCareer?'on':'')+'" id="fHide" style="margin-top:10px">Ocultar mi carrera</button>'
  +'<label class="l" for="fIceQ">Rompehielo</label><select class="fld" id="fIceQ">'+ICE.map(q=>'<option'+(d.ice.q===q?' selected':'')+'>'+esc(q)+'</option>').join('')+'</select><input class="fld" id="fIceA" maxlength="100" style="margin-top:8px" placeholder="Tu respuesta" aria-label="Respuesta del rompehielo" value="'+esc(d.ice.a)+'">'
  +'<label class="l" for="fArt">Artistas o música que escuchas</label><input class="fld" id="fArt" maxlength="80" placeholder="Separa con comas" value="'+esc(d.artists)+'">'
  +'<label class="l" for="fIg">Instagram <small>(solo el usuario, sin @)</small></label><input class="fld" id="fIg" maxlength="30" value="'+esc(d.ig)+'">'
  +'</div></div></div>';
  paintPhotos();paintInts();
  const sy=(id,k)=>{$(id).addEventListener('input',e=>{d[k]=e.target.value})};
  sy('#fName','name');sy('#fBirth','birth');sy('#fGender','gender');sy('#fBio','bio');sy('#fCareer','career');sy('#fSem','semester');sy('#fArt','artists');sy('#fIg','ig');
  $('#fGender').addEventListener('change',e=>{d.gender=e.target.value});
  $('#fIceQ').addEventListener('change',e=>{d.ice.q=e.target.value});$('#fIceA').addEventListener('input',e=>{d.ice.a=e.target.value});
  $('#fLook').addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b)return;const v=b.dataset.v;d.lookingFor=d.lookingFor.includes(v)?d.lookingFor.filter(x=>x!==v):d.lookingFor.concat([v]);b.classList.toggle('on')});
  $('#fHide').onclick=e=>{d.hideCareer=!d.hideCareer;e.currentTarget.classList.toggle('on',d.hideCareer)};
  $('#fAdd').onclick=addCustom;$('#fCustom').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();addCustom()}});
  $('#eX').onclick=()=>{$('#sheet').innerHTML='';draft=null};
  $('#eSave').onclick=saveProfile;
}
function paintInts(){
  const d=draft,box=$('#fInt');if(!box)return;
  const all=INTERESTS.concat(d.interests.filter(x=>!INTERESTS.includes(x)));
  box.innerHTML=all.map(x=>'<button type="button" class="opt '+(d.interests.includes(x)?'on':'')+'" data-i="'+esc(x)+'">'+esc(x)+'</button>').join('');
  box.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const x=b.dataset.i;if(d.interests.includes(x))d.interests=d.interests.filter(y=>y!==x);else if(d.interests.length<12)d.interests.push(x);else toast('Máximo 12 intereses');paintInts()});
}
function addCustom(){
  const inp=$('#fCustom'),v=(inp.value||'').trim();if(!v)return;
  if(draft.interests.length>=12)return toast('Máximo 12 intereses');
  if(!draft.interests.some(x=>x.toLowerCase()===v.toLowerCase()))draft.interests.push(v);
  inp.value='';paintInts();
}

/* ---------- respuestas y reacciones ---------- */
async function submitAnswer(){
  const t=($('#ansIn').value||'').trim();if(!t)return toast('Escribe algo primero');
  const before=streakOf(myDays());
  const days=Object.assign({},myDays());days[todayKey()]={t:t.slice(0,150),at:Date.now()};
  S.answers[uid]={days};paint();
  toast('Racha: '+streakOf(days)+(streakOf(days)>before?' ¡Sigue así!':''));
  const {error}=await sb.from('daily_answers').insert({user_id:uid,day:todayKey(),body:t.slice(0,150)});
  if(error){if(error.code==='23505')toast('Ya respondiste hoy');else werr(error);loadAnswers().then(paint)}
}
function react(day,aid){
  const k=day+'|'+aid,m=Object.assign({},((S.reacts[uid]||{}).m)||{}),on=!!m[k];
  if(on)delete m[k];else m[k]=1;
  S.reacts[uid]={m};paint();
  wq('rx',async()=>{
    const {error}=on?await sb.from('answer_reactions').delete().match({user_id:uid,author_id:aid,day}):await sb.from('answer_reactions').insert({user_id:uid,author_id:aid,day});
    if(error)throw error;
  }).catch(werr);
}

/* ---------- menú de usuario: reportar y bloquear ---------- */
function openMenu(id){
  const p=S.profiles[id];if(!p)return;
  $('#sheet').innerHTML='<div class="sheetbg" id="sbg"><div class="sheet"><h3>'+esc(p.name)+'</h3><button class="btn ghost block" id="mRep">Reportar perfil</button><button class="btn danger block" id="mBlk">Bloquear</button><button class="btn ghost block" id="mCan">Cancelar</button></div></div>';
  const close=()=>{$('#sheet').innerHTML=''};
  $('#sbg').onclick=ev=>{if(ev.target.id==='sbg')close()};$('#mCan').onclick=close;
  $('#mRep').onclick=()=>{sb.from('reports').insert({reporter:uid,about:id}).then(r=>{if(r.error)werr(r.error);else toast('Reporte enviado. Gracias.')});close()};
  let armed=false;
  $('#mBlk').onclick=()=>{
    if(!armed){armed=true;$('#mBlk').textContent='Toca otra vez para bloquear a '+p.name;return}
    S.blocks=S.blocks.concat([id]);close();closeChat();paint();
    sb.from('blocks').upsert({blocker:uid,blocked:id}).then(r=>{if(r.error)werr(r.error)});toast('Bloqueado');
  };
}

/* ---------- chat ---------- */
function openChat(otherId){
  const o=S.profiles[otherId];if(!o||!uid)return;
  const id=pid(uid,otherId);ui.chat={id,other:o};
  $('#chat').innerHTML='<div class="over"><div class="ohead"><button class="ib" id="cBack" aria-label="Volver">'+IC.back+'</button>'+avatar(o,38)+'<div class="t">'+esc(o.name)+'</div><button class="ib" id="cMenu" aria-label="Más opciones">'+IC.dots+'</button></div>'
   +'<div class="obody" id="cBody"><div class="in"><div id="msgs"></div></div></div>'
   +'<div class="ofoot"><form id="cForm" autocomplete="off"><input class="fld" id="cIn" maxlength="500" placeholder="Escribe un mensaje" aria-label="Mensaje"><button class="btn" style="border-radius:99px;padding:12px 16px" aria-label="Enviar">'+IC.send.replace('<svg','<svg width="20" height="20"')+'</button></form></div></div>';
  $('#cBack').onclick=closeChat;$('#cMenu').onclick=()=>openMenu(otherId);
  $('#cForm').onsubmit=ev=>{ev.preventDefault();sendMsg()};
  paintMsgs();
}
function closeChat(){ui.chat=null;$('#chat').innerHTML='';paint()}
async function sendMsg(){
  const c=ui.chat,inp=$('#cIn'),t=(inp.value||'').trim();if(!c||!t)return;
  inp.value='';
  const id=c.id,now=Date.now(),L=(S.lines[id]=S.lines[id]||{});
  L[uid]=(L[uid]||[]).concat([{t,at:now}]);
  S.chats[id]={id,members:[uid,c.other.id],last:t.slice(0,60),lastAt:now,lastFrom:uid};seen[id]=now;paintMsgs();
  const {error}=await sb.from('messages').insert({sender:uid,recipient:c.other.id,body:t.slice(0,500)});
  if(error){werr(error);loadMsgs()}
}

/* ---------- fotos y guardado de perfil ---------- */
function resizeTo(file,size,q,cb){
  const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{
    const c=document.createElement('canvas');c.width=c.height=size;const x=c.getContext('2d');
    const m=Math.min(im.width,im.height);x.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,size,size);
    c.toBlob(b=>cb(b),'image/jpeg',q);
  };im.src=r.result};r.readAsDataURL(file);
}
function paintPhotos(){
  const d=draft,box=$('#fPhotos');if(!box)return;
  d.files=d.files||{};
  let h='';
  for(let i=0;i<3;i++){
    if(d.photos[i])h+='<div class="slot"><img src="'+esc(d.photos[i])+'" alt=""><button type="button" class="x" data-rm="'+i+'" aria-label="Quitar foto">×</button></div>';
    else h+='<div class="slot">+<input type="file" accept="image/*" data-add="1" aria-label="Agregar foto"></div>';
  }
  box.innerHTML=h;
  box.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{const u=d.photos.splice(+b.dataset.rm,1)[0];delete d.files[u];paintPhotos()});
  box.querySelectorAll('[data-add]').forEach(inp=>inp.onchange=()=>{const f=inp.files[0];if(!f)return;resizeTo(f,720,.82,b=>{const u=URL.createObjectURL(b);d.files[u]=b;d.photos.push(u);paintPhotos()})});
}
async function saveProfile(){
  const d=draft,miss=[];
  if(!d.name.trim())miss.push('nombre');if(!d.birth)miss.push('fecha de nacimiento');if(!d.gender)miss.push('género');
  if(!d.lookingFor.length)miss.push('qué buscas');if(!d.photos.length)miss.push('una foto');if(d.interests.length<3)miss.push('3 intereses');
  if(miss.length)return toast('Falta: '+miss.join(', '));
  if(!uid||!sb)return toast('Inicia sesión para guardar');
  const btn=$('#eSave');btn.disabled=true;btn.textContent='Guardando…';
  try{
    const urls=[];
    for(const u of d.photos){
      if(d.files&&d.files[u]){
        const path=uid+'/'+Date.now()+'_'+urls.length+'.jpg';
        const up=await sb.storage.from('photos').upload(path,d.files[u],{contentType:'image/jpeg'});
        if(up.error)throw up.error;
        urls.push(sb.storage.from('photos').getPublicUrl(path).data.publicUrl);
      }else urls.push(u);
    }
    const row={id:uid,name:d.name.trim(),birth:d.birth,gender:d.gender,looking_for:d.lookingFor,interests:d.interests,bio:d.bio.trim(),career:d.career.trim(),semester:d.semester?+d.semester:null,hide_career:d.hideCareer,ig:d.ig.trim().replace(/^@/,''),artists:d.artists.trim(),photos:urls,ice:d.ice.a.trim()?{q:d.ice.q,a:d.ice.a.trim()}:null,updated_at:new Date().toISOString()};
    const r=await sb.from('profiles').upsert(row);if(r.error)throw r.error;
    S.demo=false;$('#sheet').innerHTML='';draft=null;
    await loadProfiles();paint();toast('Perfil guardado');
  }catch(err){werr(err);btn.disabled=false;btn.textContent='Guardar'}
}
