import { useState, useEffect } from "react";

// ─── BRAND PALETTE ───────────────────────────────────────────────────────────
const B = {
  burgundy:   "#4B1D22",
  burgundyMd: "#7a3040",
  burgundyLt: "#f0e8e9",
  olive:      "#6B6F4D",
  oliveMd:    "#898f6a",
  oliveLt:    "#eaebdf",
  offwhite:   "#F6F3EE",
  offwhiteDk: "#ede9e2",
  charcoal:   "#2B2B2B",
  charcoalMd: "#4a4a4a",
  text:       "#2B2B2B",
  textDim:    "#6a6a6a",
  textLight:  "#9a9a9a",
  border:     "#ddd9d2",
  borderDk:   "#c5c0b8",
  surface:    "#ffffff",
};

// ─── TYPOGRAPHY ──────────────────────────────────────────────────────────────
const DIDOT = "'Didot', 'Bodoni MT', 'Playfair Display', 'Georgia', serif";
const MONT  = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const IconDoor = ({size=20,color=B.burgundy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/>
    <path d="M9 10h.01"/>
    <rect x="5" y="3" width="14" height="18" rx="1"/>
    <path d="M12 3v18"/>
  </svg>
);
const IconHanger = ({size=18,color=B.olive}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M12 3a2 2 0 012 2c0 .74-.4 1.38-1 1.73V8l8 5H3l8-5V6.73A2 2 0 0112 3z"/>
    <path d="M3 13h18"/>
  </svg>
);
const IconLeaf = ({size=18,color=B.olive}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M11 20A7 7 0 014 13c0-5 4-9 9-9 0 5-1 9-4 12"/>
    <path d="M4 13c3-3 7-4 11-3"/>
  </svg>
);
const IconHeart = ({size=18,color=B.burgundy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 000-7.8z"/>
  </svg>
);
const IconStar = ({size=16,color=B.burgundy,filled=false}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?color:"none"} stroke={color} strokeWidth="1.2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const IconCamera = ({size=18,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);
const IconTag = ({size=18,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M20.6 8.3L15.7 3.4A2 2 0 0014.3 3H7a2 2 0 00-2 2v7.3a2 2 0 00.6 1.4l8.7 8.7a2 2 0 002.8 0l4.5-4.5a2 2 0 000-2.8z"/>
    <circle cx="9" cy="9" r="1.5" fill={color}/>
  </svg>
);
const IconPhone = ({size=18,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconNoPhone = ({size=18,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="2" y1="2" x2="22" y2="22" stroke={B.burgundy} strokeWidth="1.5"/>
  </svg>
);
const IconMirror = ({size=18,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <ellipse cx="12" cy="9" rx="6" ry="8"/>
    <line x1="12" y1="17" x2="12" y2="22"/>
    <line x1="9" y1="22" x2="15" y2="22"/>
  </svg>
);
const IconRepeat = ({size=18,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 014-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 01-4 4H3"/>
  </svg>
);
const IconDiamond = ({size=16,color=B.burgundy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M6 3h12l4 6-10 13L2 9z"/>
    <path d="M2 9h20M12 3l4 6-4 13L8 9z"/>
  </svg>
);
const IconTrophy = ({size=20,color=B.burgundy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M6 9H4a2 2 0 01-2-2V5h4M18 9h2a2 2 0 002-2V5h-4"/>
    <path d="M6 5v4a6 6 0 0012 0V5H6z"/>
    <path d="M12 15v4M8 21h8"/>
  </svg>
);
const IconChart = ({size=20,color=B.olive}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const IconBag = ({size=20,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconFire = ({size=20,color=B.burgundy}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7c-1.93 0-3.68-.79-4.95-2.05"/>
  </svg>
);
const IconHome = ({size=20,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconHistory = ({size=20,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.5 15a9 9 0 102-5.5L1 10"/>
  </svg>
);
const IconWishlist = ({size=20,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconMoney = ({size=20,color=B.charcoal}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);

// ─── DATA ────────────────────────────────────────────────────────────────────
const FIXED_ACTIONS = [
  { id:"one_new",   label:"1 peça nova no look",        xp:150, Icon:IconTag,     desc:"Estreou uma peça com etiqueta" },
  { id:"two_new",   label:"2 peças novas no look",       xp:220, Icon:IconTag,     desc:"Dupla de estreias no mesmo dia" },
  { id:"full_new",  label:"Look inteiro de peças novas", xp:350, Icon:IconHanger,  desc:"Total premiê — tudo etiqueta" },
  { id:"full_old",  label:"Look 100% do armário",        xp:300, Icon:IconRepeat,  desc:"Zero peça nova — puro armário" },
  { id:"once_worn", label:"Peça usada só uma vez",       xp:150, Icon:IconDiamond, desc:"Resgatou do esquecimento" },
  { id:"provador",  label:"Provador em casa",            xp:100, Icon:IconMirror,  desc:"5+ looks montados em casa" },
  { id:"whering",   label:"3 looks no Whering",          xp:100, Icon:IconPhone,   desc:"Criou looks no app" },
  { id:"no_app",    label:"Dia sem app de compras",      xp:150, Icon:IconNoPhone, desc:"24h sem TikTok Shop, Shein..." },
  { id:"posted",    label:"Postei o look hoje",          xp:75,  Icon:IconCamera,  desc:"Instagram, TikTok ou Whering" },
  { id:"fav_look",  label:"Look favorito do dia",        xp:40,  Icon:IconHeart,   desc:"Marcou como favorito" },
];

const XP_TO_BRL = (xp) => Math.floor(xp / 500) * 100;

const PHASES = [
  { name:"Iniciante",  minXP:0,     color:B.textLight, bg:B.offwhiteDk, desc:"Você começou." },
  { name:"Detox",      minXP:1000,  color:B.olive,     bg:B.oliveLt,    desc:"Consciência chegando." },
  { name:"Consciente", minXP:3000,  color:B.burgundy,  bg:B.burgundyLt, desc:"O armário agradece." },
  { name:"Curadora",   minXP:8000,  color:B.olive,     bg:B.oliveLt,    desc:"Você edita, não acumula." },
  { name:"Mestre",     minXP:20000, color:B.burgundy,  bg:B.burgundyLt, desc:"Referência absoluta." },
];

const STYLING_CHALLENGES = [
  { week:"2026-W19", theme:"A Ressurreição",           desc:"Use 3 peças esquecidas no fundo do armário esta semana",              xp:400 },
  { week:"2026-W20", theme:"Preto & Branco Total",     desc:"Look monocromático clássico — sem exceção a semana toda",             xp:400 },
  { week:"2026-W21", theme:"A Calça Que Vai a Tudo",  desc:"Use a mesma calça 4x de formas completamente diferentes",             xp:400 },
  { week:"2026-W22", theme:"Sem Preto",                desc:"Passe a semana inteira sem usar nenhuma peça preta",                  xp:400 },
  { week:"2026-W23", theme:"Diabo Veste Prada",        desc:"Editorial, sharp, poderosa — inspire-se no universo do filme",        xp:400 },
  { week:"2026-W24", theme:"Universo Chanel",          desc:"Tweed, correntes, bege, preto, pérolas — interprete Chanel",          xp:400 },
  { week:"2026-W25", theme:"Texturas",                 desc:"Use pelo menos uma peça de tecido diferente do habitual por dia",     xp:400 },
  { week:"2026-W26", theme:"Minimalismo",              desc:"Máximo de 3 peças por look — a semana toda",                          xp:400 },
  { week:"2026-W27", theme:"Decades: Anos 90",         desc:"Denim, slip dress, sporty luxe — anos 90 como referência",            xp:400 },
  { week:"2026-W28", theme:"A Peça Que Você Odeia Amar", desc:"Use aquela peça que você ama mas nunca tem coragem",              xp:400 },
  { week:"2026-W29", theme:"Cores Vibrantes",          desc:"Looks só com cores vibrantes — zero neutros esta semana",             xp:400 },
  { week:"2026-W30", theme:"Styling Invertido",        desc:"Comece pelo sapato e monte o look de baixo pra cima",                 xp:400 },
  { week:"2026-W31", theme:"Quiet Luxury",             desc:"Sem logos, tudo qualidade e fit — sofisticação silenciosa",           xp:400 },
  { week:"2026-W32", theme:"Arquivo: Galliano Dior",   desc:"Recrie a energia das coleções icônicas Galliano para Dior",           xp:400 },
  { week:"2026-W33", theme:"Semana Parisiense",        desc:"Se vista como se estivesse em Paris a semana toda",                   xp:400 },
  { week:"2026-W34", theme:"Roube o Look",             desc:"Recrie um outfit de editorial ou campanha que você ama",              xp:400 },
  { week:"2026-W35", theme:"Transição de Estação",     desc:"Monte looks que funcionam tanto no calor quanto no frio",             xp:400 },
  { week:"2026-W36", theme:"Acessório Protagonista",   desc:"Construa todos os looks da semana em torno de um acessório icônico",  xp:400 },
  { week:"2026-W37", theme:"Mob Wife Aesthetic",       desc:"Maximalismo, furs, dourado, atitude — viva o personagem",             xp:400 },
  { week:"2026-W38", theme:"Coastal Grandmother",      desc:"Linho, neutros, relaxado mas chique — Diane Keaton energy",           xp:400 },
  { week:"2026-W39", theme:"Personagem de Série",      desc:"Se vista inspirada em um personagem icônico de série ou filme",       xp:400 },
  { week:"2026-W40", theme:"Layering Expert",          desc:"Camadas e mais camadas — cada look com pelo menos 4 peças",           xp:400 },
  { week:"2026-W41", theme:"Monocromático Colorido",   desc:"Escolha UMA cor e use só ela durante toda a semana",                  xp:400 },
  { week:"2026-W42", theme:"A Bolsa Protagonista",     desc:"Monte os looks da semana em torno de UMA bolsa específica",           xp:400 },
  { week:"2026-W43", theme:"Anti-Black Friday",        desc:"Semana sem comprar absolutamente nada — zero, nada, zilch",           xp:400 },
  { week:"2026-W44", theme:"Evening Wear Daily",       desc:"Use peças de festa no dia a dia — sem ocasião especial",              xp:400 },
  { week:"2026-W45", theme:"Old Money Aesthetic",      desc:"Clássico, atemporal, sofisticado — como se você nunca tentasse",      xp:400 },
  { week:"2026-W46", theme:"Power Dressing",           desc:"Vista-se para a versão mais poderosa de você mesma",                  xp:400 },
  { week:"2026-W47", theme:"Glam Total",               desc:"Purpurina, brilho, sequins — exagere propositalmente",                xp:400 },
  { week:"2026-W48", theme:"Winter Wonderland",        desc:"Looks inspirados no inverno europeu — layering e texturas ricas",     xp:400 },
  { week:"2026-W49", theme:"Party Season",             desc:"Uma semana de looks de festa — cada dia uma occasion diferente",      xp:400 },
  { week:"2026-W50", theme:"Best Of 2026",             desc:"Repita os seus 5 looks favoritos do ano — uma retrospectiva",         xp:400 },
  { week:"2026-W51", theme:"Presente pra Você",        desc:"Use a peça mais especial do seu armário — você merece",               xp:400 },
  { week:"2026-W52", theme:"Rainha do Armário",        desc:"Encerre 2026 com o look mais poderoso que você tem",                  xp:400 },
];

const ACHIEVEMENTS = [
  { id:"first_day",     Icon:IconDoor,   title:"Primeiro Dia",        desc:"Registrou o primeiro dia",               check:(l)=>Object.keys(l).length>=1 },
  { id:"week_one",      Icon:IconHanger, title:"Primeira Semana",     desc:"7 dias registrados",                     check:(l)=>Object.keys(l).length>=7 },
  { id:"first_desapego",Icon:IconLeaf,   title:"Primeiro Desapego",   desc:"Vendeu a primeira peça",                 check:(l)=>Object.values(l).flat().some(x=>x.id?.startsWith("desapego_")) },
  { id:"posts_10",      Icon:IconCamera, title:"Criadora de Conteúdo",desc:"10 looks postados",                      check:(l)=>Object.values(l).flat().filter(x=>x.id==="posted").length>=10 },
  { id:"no_app_7",      Icon:IconNoPhone,title:"Detox Queen",         desc:"7 dias sem app de compras",              check:(l)=>Object.values(l).flat().filter(x=>x.id==="no_app").length>=7 },
  { id:"full_old_5",    Icon:IconRepeat, title:"Curadora",            desc:"5 looks 100% do armário",                check:(l)=>Object.values(l).flat().filter(x=>x.id==="full_old").length>=5 },
  { id:"challenge_1",   Icon:IconStar,   title:"Primeira Missão",     desc:"Completou o primeiro styling challenge",  check:(_,c)=>c.length>=1 },
  { id:"challenge_5",   Icon:IconStar,   title:"Style Icon",          desc:"5 styling challenges completos",          check:(_,c)=>c.length>=5 },
  { id:"challenge_all", Icon:IconTrophy, title:"Mestre do Estilo",    desc:"Todos os challenges do ano completos",    check:(_,c)=>c.length>=STYLING_CHALLENGES.length },
  { id:"xp_5000",       Icon:IconDiamond,title:"XP Poderosa",         desc:"5.000 XP acumulados",                    check:(_,__,xp)=>xp>=5000 },
  { id:"xp_20000",      Icon:IconTrophy, title:"Lenda do Armário",    desc:"20.000 XP acumulados",                   check:(_,__,xp)=>xp>=20000 },
  { id:"brl_1000",      Icon:IconMoney,  title:"Milha Zero",          desc:"R$ 1.000 em vales conquistados",          check:(_,__,xp)=>XP_TO_BRL(xp)>=1000 },
];

const RITUAL_QUESTIONS = [
  { id:"q1", text:"Já tenho algo parecido no armário?",               warn:true  },
  { id:"q2", text:"Consigo montar 3 looks diferentes com essa peça?", warn:false },
  { id:"q3", text:"Sei exatamente onde vou usar isso?",               warn:false },
  { id:"q4", text:"Tem espaço físico no meu armário?",                warn:false },
  { id:"q5", text:"Posso esperar mais 7 dias antes de comprar?",      warn:false },
];
const WISHLIST_CHECKER = [
  { id:"w1", text:"Já tenho algo parecido no armário?",        warn:true  },
  { id:"w2", text:"Vou usar mais de uma vez?",                 warn:false },
  { id:"w3", text:"Cabe no meu budget do mês?",               warn:false },
  { id:"w4", text:"Consigo esperar 7 dias antes de comprar?", warn:false },
];
const NECESSITY_QUESTIONS = [
  { id:"n1", text:"Isso é uma necessidade real (não desejo)?" },
  { id:"n2", text:"Não tenho nada parecido que substitua?"   },
  { id:"n3", text:"Pesquisei o melhor preço disponível?"     },
  { id:"n4", text:"Compraria isso mesmo sem o challenge?"    },
];

const STREAK_MILESTONES = [30,60,90,120,150,180];
const DAYS_PT = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const START_DATE = "2026-05-12";

function getTodayKey(){return new Date().toISOString().split("T")[0];}
function formatDate(s){const d=new Date(s+"T12:00:00");return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"});}
function getDays(){
  const start=new Date(START_DATE+"T12:00:00"),ref=new Date()>=start?new Date():start;
  return Array.from({length:7},(_,i)=>{const d=new Date(ref);d.setDate(d.getDate()-(6-i));const k=d.toISOString().split("T")[0];return k>=START_DATE?k:null;}).filter(Boolean);
}
function getWeekKey(){
  const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()+3-(d.getDay()+6)%7);
  const w=Math.floor((d-new Date(d.getFullYear(),0,4))/604800000)+1;
  return `${d.getFullYear()}-W${String(w).padStart(2,"0")}`;
}
function getPhase(xp){return [...PHASES].reverse().find(p=>xp>=p.minXP)||PHASES[0];}
function daysSince(s){return Math.max(0,Math.floor((new Date()-new Date(s+"T12:00:00"))/86400000));}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function Label({children,color=B.textLight,mt=0}){
  return <div style={{fontFamily:MONT,fontSize:9,letterSpacing:3,color,textTransform:"uppercase",marginBottom:8,marginTop:mt}}>{children}</div>;
}
function Divider(){return <div style={{height:1,background:B.border,margin:"0"}}/>;}
function Btn({children,onClick,variant="primary",style={}}){
  const styles={
    primary:{background:B.burgundy,color:"#fff",border:"none"},
    secondary:{background:"none",color:B.burgundy,border:`1px solid ${B.burgundy}`},
    olive:{background:B.olive,color:"#fff",border:"none"},
    ghost:{background:"none",color:B.textDim,border:`1px solid ${B.border}`},
  };
  return <button onClick={onClick} style={{padding:"13px 20px",fontFamily:MONT,fontSize:10,letterSpacing:2,cursor:"pointer",textTransform:"uppercase",...styles[variant],...style}}>{children}</button>;
}

function Sheet({open,onClose,title,children}){
  if(!open)return null;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(43,43,43,0.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={onClose}>
      <div style={{background:B.offwhite,width:"100%",maxWidth:430,margin:"0 auto",padding:"28px 24px 48px",borderTop:`2px solid ${B.burgundy}`}} onClick={e=>e.stopPropagation()}>
        {title&&<Label mt={0}>{title}</Label>}
        {children}
      </div>
    </div>
  );
}

function QuestionFlow({questions,step,onAnswer,accentColor=B.burgundy}){
  return(
    <div>
      <div style={{display:"flex",gap:3,marginBottom:24}}>
        {questions.map((_,i)=><div key={i} style={{flex:1,height:1,background:i<=step?accentColor:B.border}}/>)}
      </div>
      <Label color={B.textLight}>Pergunta {step+1} de {questions.length}</Label>
      <div style={{fontFamily:DIDOT,fontSize:20,color:B.text,lineHeight:1.5,marginBottom:28,fontStyle:"italic"}}>{questions[step].text}</div>
      <div style={{display:"flex",gap:10}}>
        <Btn onClick={()=>onAnswer(questions[step].id,true)} variant="ghost" style={{flex:1}}>Sim</Btn>
        <Btn onClick={()=>onAnswer(questions[step].id,false)} style={{flex:1,background:accentColor}}>Não</Btn>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function ClosetChallenge(){
  const [splash,setSplash]=useState(true);
  const [tab,setTab]=useState("home");

  useEffect(()=>{const t=setTimeout(()=>setSplash(false),2400);return()=>clearTimeout(t);},[]);
  const [logs,setLogs]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_logs")||"{}");}catch{return{};}});
  const [finalized,setFinalized]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_fin")||"[]");}catch{return[];}});
  const [wishlist,setWishlist]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_wish")||"[]");}catch{return[];}});
  const [spends,setSpends]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_spends")||"[]");}catch{return[];}});
  const [desapegoCredits,setDesapegoCredits]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_desapego")||"[]");}catch{return[];}});
  const [budget,setBudget]=useState(()=>parseFloat(localStorage.getItem("cc1_budget")||"0"));
  const [budgetSpent,setBudgetSpent]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_bspent")||"[]");}catch{return[];}});
  const [streakStart,setStreakStart]=useState(()=>localStorage.getItem("cc1_streak")||START_DATE);
  const [claimedMilestones,setClaimedMilestones]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_miles")||"[]");}catch{return[];}});
  const [completedChallenges,setCompletedChallenges]=useState(()=>{try{return JSON.parse(localStorage.getItem("cc1_challenges")||"[]");}catch{return[];}});
  const [profilePhoto,setProfilePhoto]=useState(()=>localStorage.getItem("cc1_photo")||"");
  const [profileName,setProfileName]=useState(()=>localStorage.getItem("cc1_name")||"");
  const [editingProfile,setEditingProfile]=useState(false);
  const [nameInput,setNameInput]=useState("");
  const [lastLogDate,setLastLogDate]=useState(()=>localStorage.getItem("cc1_lastLog")||START_DATE);
  const [selectedDay,setSelectedDay]=useState(()=>{const t=getTodayKey();return t>=START_DATE?t:START_DATE;});
  const [editingDay,setEditingDay]=useState(null);
  const [toast,setToast]=useState(null);
  const [floatingXP,setFloatingXP]=useState(null);
  const [showCelebration,setShowCelebration]=useState(false);
  const [ritual,setRitual]=useState(null);
  const [ritualStep,setRitualStep]=useState(0);
  const [ritualAnswers,setRitualAnswers]=useState({});
  const [checkerOpen,setCheckerOpen]=useState(false);
  const [checkerStep,setCheckerStep]=useState(0);
  const [checkerAnswers,setCheckerAnswers]=useState({});
  const [checkerItem,setCheckerItem]=useState({name:"",price:"",link:""});
  const [necessityOpen,setNecessityOpen]=useState(false);
  const [necessityStep,setNecessityStep]=useState(0);
  const [necessityAnswers,setNecessityAnswers]=useState({});
  const [desapegoOpen,setDesapegoOpen]=useState(false);
  const [desapegoValue,setDesapegoValue]=useState("");
  const [spendOpen,setSpendOpen]=useState(false);
  const [spendValue,setSpendValue]=useState("");
  const [spendNote,setSpendNote]=useState("");
  const [budgetOpen,setBudgetOpen]=useState(false);
  const [budgetInput,setBudgetInput]=useState("");
  const [confirmFinalize,setConfirmFinalize]=useState(false);
  const [confirmBought,setConfirmBought]=useState(false);
  const [showPhase,setShowPhase]=useState(false);

  const days7=getDays(),currentLog=logs[selectedDay]||[],todayKey=getTodayKey();
  const todayFinalized=finalized.includes(todayKey);
  const currentWeek=getWeekKey();
  const todayChallenge=STYLING_CHALLENGES.find(c=>c.week===currentWeek);
  const todayChallengeCompleted=completedChallenges.includes(currentWeek);
  const baseXP=Object.values(logs).flat().reduce((s,a)=>s+(a.xp||0),0);
  const totalXP=baseXP+claimedMilestones.length*1000+completedChallenges.length*400;
  const xpBrl=XP_TO_BRL(totalXP);
  const desapegoTotal=desapegoCredits.reduce((s,d)=>s+(d.amount||0),0);
  const brlBalance=Math.max(0,xpBrl+desapegoTotal-spends.reduce((s,sp)=>s+(sp.amount||0),0));
  const thisMonth=new Date().toISOString().slice(0,7);
  const monthSpent=budgetSpent.filter(s=>s.date?.startsWith(thisMonth)).reduce((s,b)=>s+(b.amount||0),0);
  const budgetLeft=Math.max(0,budget-monthSpent);
  const phase=getPhase(totalXP),nextPhase=PHASES.find(p=>p.minXP>totalXP);
  const streakDays=daysSince(streakStart);
  const nextMilestone=STREAK_MILESTONES.find(m=>streakDays<m)||STREAK_MILESTONES[STREAK_MILESTONES.length-1];
  const lastMilestone=STREAK_MILESTONES.filter(m=>streakDays>=m).pop()||0;
  const streakPct=Math.min(((streakDays-lastMilestone)/(nextMilestone-lastMilestone))*100,100);
  const newMilestone=STREAK_MILESTONES.find(m=>streakDays>=m&&!claimedMilestones.includes(m));
  const hasPenalty=daysSince(lastLogDate)>=3;
  const dayXP=currentLog.reduce((s,a)=>s+a.xp,0);
  const unlockedAchievements=ACHIEVEMENTS.filter(a=>a.check(logs,completedChallenges,totalXP));
  const chartData=days7.map(day=>({day:formatDate(day),xp:(logs[day]||[]).reduce((s,a)=>s+a.xp,0)}));
  const maxXP=Math.max(...chartData.map(d=>d.xp),1);

  useEffect(()=>{localStorage.setItem("cc1_logs",JSON.stringify(logs));},[logs]);
  useEffect(()=>{localStorage.setItem("cc1_fin",JSON.stringify(finalized));},[finalized]);
  useEffect(()=>{localStorage.setItem("cc1_wish",JSON.stringify(wishlist));},[wishlist]);
  useEffect(()=>{localStorage.setItem("cc1_spends",JSON.stringify(spends));},[spends]);
  useEffect(()=>{localStorage.setItem("cc1_desapego",JSON.stringify(desapegoCredits));},[desapegoCredits]);
  useEffect(()=>{localStorage.setItem("cc1_budget",budget.toString());},[budget]);
  useEffect(()=>{localStorage.setItem("cc1_bspent",JSON.stringify(budgetSpent));},[budgetSpent]);
  useEffect(()=>{localStorage.setItem("cc1_streak",streakStart);},[streakStart]);
  useEffect(()=>{localStorage.setItem("cc1_miles",JSON.stringify(claimedMilestones));},[claimedMilestones]);
  useEffect(()=>{localStorage.setItem("cc1_challenges",JSON.stringify(completedChallenges));},[completedChallenges]);
  useEffect(()=>{localStorage.setItem("cc1_photo",profilePhoto);},[profilePhoto]);
  useEffect(()=>{localStorage.setItem("cc1_name",profileName);},[profileName]);
  useEffect(()=>{localStorage.setItem("cc1_lastLog",lastLogDate);},[lastLogDate]);

  function showToast(msg,type="ok"){setToast({msg,type});setTimeout(()=>setToast(null),2800);}
  function showFloat(xp){setFloatingXP(xp);setTimeout(()=>setFloatingXP(null),1200);}
  function handlePhotoChange(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setProfilePhoto(ev.target.result);r.readAsDataURL(f);}
  function saveProfileName(){if(nameInput.trim())setProfileName(nameInput.trim());setEditingProfile(false);}

  function logAction(action){
    if(todayFinalized&&selectedDay===todayKey){showToast("Dia finalizado","warn");return;}
    const done=currentLog.find(l=>l.id===action.id);
    if(done){setLogs(p=>({...p,[selectedDay]:(p[selectedDay]||[]).filter(l=>l.id!==action.id)}));return;}
    setLogs(p=>({...p,[selectedDay]:[...(p[selectedDay]||[]),{...action,Icon:undefined,time:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}]}));
    setLastLogDate(selectedDay);showFloat(action.xp);showToast(`+${action.xp} XP`);
  }
  function logDesapego(){
    const val=parseFloat(desapegoValue.replace(",","."));if(!val||val<=0)return;
    setDesapegoCredits(p=>[...p,{id:Date.now().toString(),amount:val,date:getTodayKey()}]);
    setLogs(p=>({...p,[selectedDay]:[...(p[selectedDay]||[]),{id:`desapego_${Date.now()}`,label:`Vendi por R$ ${val.toFixed(0)}`,xp:0,time:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}]}));
    showToast(`R$ ${val.toFixed(0)} adicionado ao saldo`);setDesapegoValue("");setDesapegoOpen(false);
  }
  function removeLog(k,id){setLogs(p=>({...p,[k]:(p[k]||[]).filter(l=>l.id!==id)}));}
  function finalizeDay(){if(!finalized.includes(todayKey)){setFinalized(p=>[...p,todayKey]);showToast("Dia finalizado ✓");setTab("history");}setConfirmFinalize(false);}
  function completeChallenge(week){if(!completedChallenges.includes(week)){setCompletedChallenges(p=>[...p,week]);setShowCelebration(true);setTimeout(()=>setShowCelebration(false),2800);showToast("Challenge completo! +400 XP");}}
  function claimMilestone(m){setClaimedMilestones(p=>[...p,m]);showToast(`+1.000 XP — ${m} dias!`);}
  function logSpend(){const val=parseFloat(spendValue.replace(",","."));if(!val||val<=0)return;setSpends(p=>[...p,{id:Date.now().toString(),amount:val,note:spendNote,date:getTodayKey()}]);showToast(`−R$ ${val.toFixed(0)} do saldo`);setSpendValue("");setSpendNote("");setSpendOpen(false);}
  function saveBudget(){const val=parseFloat(budgetInput.replace(",","."));if(!val||val<=0)return;setBudget(val);setBudgetOpen(false);showToast("Budget atualizado");}
  function openChecker(){setCheckerOpen(true);setCheckerStep(0);setCheckerAnswers({});setCheckerItem({name:"",price:"",link:""});}
  function answerChecker(qId,answer){
    const next={...checkerAnswers,[qId]:answer};setCheckerAnswers(next);
    if(checkerStep<WISHLIST_CHECKER.length-1){setCheckerStep(s=>s+1);return;}
    const hasSimilar=next["w1"]===true,approved=!hasSimilar&&next["w2"]===true&&next["w3"]===true;
    if(approved){setWishlist(p=>[{id:Date.now().toString(),...checkerItem,addedAt:new Date().toISOString(),ritualDone:false},...p]);showToast("Adicionado à wishlist");}
    else showToast(hasSimilar?"Já tem algo parecido":"Não passou no checker","warn");
    setCheckerOpen(false);
  }
  function startRitual(item){setRitual(item);setRitualAnswers({});setRitualStep(0);setTab("ritual");}
  function answerRitual(qId,answer){
    const next={...ritualAnswers,[qId]:answer};setRitualAnswers(next);
    if(ritualStep<RITUAL_QUESTIONS.length-1){setRitualStep(s=>s+1);return;}
    const failed=RITUAL_QUESTIONS.filter(q=>q.warn).some(q=>next[q.id]===true);
    const noJustify=RITUAL_QUESTIONS.filter(q=>!q.warn&&q.id!=="q5").some(q=>next[q.id]===false);
    const approved=!failed&&!noJustify;
    setWishlist(p=>p.map(w=>w.id===ritual.id?{...w,ritualDone:true,approved,ritualDate:new Date().toISOString()}:w));
    setTab("wishlist");setRitual(null);showToast(approved?"Compra aprovada":"Reflita mais",approved?"ok":"warn");
  }
  function openNecessity(){setNecessityOpen(true);setNecessityStep(0);setNecessityAnswers({});}
  function answerNecessity(qId,answer){
    const next={...necessityAnswers,[qId]:answer};setNecessityAnswers(next);
    if(necessityStep<NECESSITY_QUESTIONS.length-1){setNecessityStep(s=>s+1);return;}
    if(Object.values(next).every(v=>v===true))showToast("Compra necessária aprovada — streak mantido");
    else{setStreakStart(getTodayKey());showToast("Não aprovada — streak zerado","warn");}
    setNecessityOpen(false);setConfirmBought(false);
  }
  function daysOnWishlist(item){return Math.floor((Date.now()-new Date(item.addedAt).getTime())/86400000);}

  const iBase={width:"100%",background:"none",border:"none",borderBottom:`1px solid ${B.border}`,color:B.text,fontSize:14,padding:"10px 0",outline:"none",boxSizing:"border-box",fontFamily:DIDOT,fontStyle:"italic"};

  return(
    <div style={{minHeight:"100vh",background:B.offwhite,color:B.text,fontFamily:DIDOT,maxWidth:430,margin:"0 auto",position:"relative",paddingBottom:80}}>

      {/* Splash screen */}
      {splash&&(
        <div style={{position:"fixed",inset:0,background:B.offwhite,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",zIndex:500}}>
          <img src="/logo.png" alt="Closet Challenge" style={{width:"75%",maxWidth:300,opacity:0,animation:"fadeIn 0.8s ease 0.3s forwards"}}/>
          <div style={{fontFamily:MONT,fontSize:9,letterSpacing:4,color:B.textLight,textTransform:"uppercase",marginTop:16,opacity:0,animation:"fadeIn 0.8s ease 0.9s forwards"}}>Seu armário. Suas regras.</div>
        </div>
      )}

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
        @keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-100%);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
        @keyframes floatUp{0%{opacity:1;transform:translateX(-50%) translateY(0);}100%{opacity:0;transform:translateX(-50%) translateY(-60px);}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes fadeOut{from{opacity:1;}to{opacity:0;pointer-events:none;}}
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        input::placeholder{color:${B.textLight};font-style:italic;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        ::-webkit-scrollbar{display:none;}
        button:active{opacity:0.75;}
      `}</style>

      {/* Toast */}
      {toast&&<div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",background:toast.type==="warn"?B.burgundy:B.olive,color:"#fff",padding:"10px 28px",fontFamily:MONT,fontSize:10,letterSpacing:3,zIndex:300,whiteSpace:"nowrap",animation:"slideDown 0.3s ease",maxWidth:430,width:"100%",textAlign:"center",textTransform:"uppercase"}}>{toast.msg}</div>}

      {/* Floating XP */}
      {floatingXP&&<div style={{position:"fixed",top:"40%",left:"50%",transform:"translateX(-50%)",fontFamily:DIDOT,fontSize:36,fontStyle:"italic",color:B.burgundy,zIndex:400,animation:"floatUp 1.2s ease forwards",pointerEvents:"none"}}>+{floatingXP} XP</div>}

      {/* Celebration */}
      {showCelebration&&(
        <div style={{position:"fixed",inset:0,background:"rgba(75,29,34,0.93)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400,flexDirection:"column",gap:20,animation:"fadeIn 0.3s ease"}}>
          <IconTrophy size={48} color="#F6F3EE"/>
          <div style={{fontFamily:MONT,fontSize:9,letterSpacing:6,color:"#F6F3EEAA",textTransform:"uppercase"}}>Challenge Completo</div>
          <div style={{fontFamily:DIDOT,fontSize:64,fontStyle:"italic",color:B.offwhite,lineHeight:1}}>+400 XP</div>
          <div style={{fontFamily:MONT,fontSize:9,letterSpacing:4,color:B.oliveMd,textTransform:"uppercase"}}>Missão cumprida</div>
        </div>
      )}

      {/* ── SHEETS ── */}
      <Sheet open={checkerOpen} onClose={()=>setCheckerOpen(false)} title="Vai comprar algo?">
        {checkerStep===0&&(
          <div style={{marginBottom:20}}>
            <input value={checkerItem.name} onChange={e=>setCheckerItem(p=>({...p,name:e.target.value}))} placeholder="O que você quer comprar?" style={{...iBase,marginBottom:12}}/>
            <div style={{display:"flex",gap:12}}>
              <input value={checkerItem.price} onChange={e=>setCheckerItem(p=>({...p,price:e.target.value}))} placeholder="Preço R$" type="number" style={{...iBase,flex:1}}/>
              <input value={checkerItem.link} onChange={e=>setCheckerItem(p=>({...p,link:e.target.value}))} placeholder="Link" style={{...iBase,flex:2}}/>
            </div>
            <div style={{height:16}}/>
          </div>
        )}
        <QuestionFlow questions={WISHLIST_CHECKER} step={checkerStep} onAnswer={answerChecker}/>
      </Sheet>

      <Sheet open={desapegoOpen} onClose={()=>setDesapegoOpen(false)} title="Desapego por venda">
        <div style={{fontFamily:MONT,fontSize:9,color:B.olive,letterSpacing:2,marginBottom:16,textTransform:"uppercase"}}>100% do valor vira crédito no saldo</div>
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:8}}>
          <span style={{fontFamily:MONT,fontSize:13,color:B.textDim}}>R$</span>
          <input autoFocus value={desapegoValue} onChange={e=>setDesapegoValue(e.target.value)} placeholder="0" type="number" style={{...iBase,fontSize:44,letterSpacing:-1}}/>
        </div>
        {desapegoValue&&parseFloat(desapegoValue)>0&&<div style={{fontFamily:MONT,fontSize:9,color:B.olive,letterSpacing:2,marginBottom:20,textTransform:"uppercase"}}>R$ {parseFloat(desapegoValue.replace(",",".")).toFixed(0)} → crédito direto</div>}
        <Btn onClick={logDesapego} style={{width:"100%",marginTop:8}}>Registrar venda</Btn>
      </Sheet>

      <Sheet open={spendOpen} onClose={()=>setSpendOpen(false)} title="Usar saldo">
        <div style={{fontFamily:MONT,fontSize:9,color:B.olive,letterSpacing:2,marginBottom:16,textTransform:"uppercase"}}>Disponível: R$ {brlBalance.toFixed(0)}</div>
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:8}}>
          <span style={{fontFamily:MONT,fontSize:13,color:B.textDim}}>R$</span>
          <input autoFocus value={spendValue} onChange={e=>setSpendValue(e.target.value)} placeholder="0" type="number" style={{...iBase,fontSize:44,letterSpacing:-1,borderBottomColor:B.olive}}/>
        </div>
        <input value={spendNote} onChange={e=>setSpendNote(e.target.value)} placeholder="O que comprou?" style={{...iBase,marginBottom:20}}/>
        <Btn onClick={logSpend} variant="olive" style={{width:"100%"}}>Registrar gasto</Btn>
      </Sheet>

      <Sheet open={budgetOpen} onClose={()=>setBudgetOpen(false)} title="Budget mensal">
        <div style={{fontFamily:MONT,fontSize:9,color:B.textDim,letterSpacing:2,marginBottom:16,textTransform:"uppercase"}}>Quanto pode gastar em roupas por mês (fora os vales)?</div>
        <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:20}}>
          <span style={{fontFamily:MONT,fontSize:13,color:B.textDim}}>R$</span>
          <input autoFocus value={budgetInput} onChange={e=>setBudgetInput(e.target.value)} placeholder="0" type="number" style={{...iBase,fontSize:44,letterSpacing:-1,borderBottomColor:B.burgundy}}/>
        </div>
        <Btn onClick={saveBudget} style={{width:"100%"}}>Salvar</Btn>
      </Sheet>

      <Sheet open={necessityOpen} onClose={()=>{}}>
        <QuestionFlow questions={NECESSITY_QUESTIONS} step={necessityStep} onAnswer={answerNecessity} accentColor={B.olive}/>
      </Sheet>

      <Sheet open={!!confirmBought} onClose={()=>setConfirmBought(false)} title="Comprou algo hoje?">
        <div style={{fontFamily:MONT,fontSize:11,color:B.textDim,lineHeight:1.7,marginBottom:24}}>Isso vai zerar seu streak de {streakDays} dias.</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <Btn onClick={openNecessity} variant="olive" style={{width:"100%",textAlign:"left"}}>Foi necessidade → fazer ritual</Btn>
          <Btn onClick={()=>{setStreakStart(getTodayKey());setConfirmBought(false);showToast("Streak zerado","warn");}} variant="secondary" style={{width:"100%",textAlign:"left"}}>Comprei mesmo — zerar streak</Btn>
          <Btn onClick={()=>setConfirmBought(false)} variant="ghost" style={{width:"100%",textAlign:"left"}}>Cancelar</Btn>
        </div>
      </Sheet>

      <Sheet open={!!confirmFinalize} onClose={()=>setConfirmFinalize(false)} title={`+${dayXP} XP hoje`}>
        <div style={{fontFamily:MONT,fontSize:11,color:B.textDim,lineHeight:1.7,marginBottom:24}}>Finalizar o dia? Você ainda pode editar no histórico.</div>
        <div style={{display:"flex",gap:10}}>
          <Btn onClick={finalizeDay} style={{flex:1}}>Finalizar</Btn>
          <Btn onClick={()=>setConfirmFinalize(false)} variant="ghost" style={{flex:1}}>Voltar</Btn>
        </div>
      </Sheet>

      {showPhase&&(
        <div style={{position:"fixed",inset:0,background:"rgba(43,43,43,0.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={()=>setShowPhase(false)}>
          <div style={{background:B.offwhite,width:"100%",maxWidth:430,margin:"0 auto",padding:"28px 24px 48px",borderTop:`2px solid ${B.olive}`}} onClick={e=>e.stopPropagation()}>
            <Label>Suas fases</Label>
            {PHASES.map((ph,i)=>{const reached=totalXP>=ph.minXP,current=ph.name===phase.name;return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:`1px solid ${B.border}`,opacity:reached?1:0.3}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:reached?ph.color:B.border,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:MONT,fontSize:10,letterSpacing:2,color:reached?ph.color:B.textLight,textTransform:"uppercase"}}>{ph.name}{current?" ← atual":""}</div>
                  <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,marginTop:2}}>{ph.minXP.toLocaleString()} XP · {ph.desc}</div>
                </div>
              </div>
            );})}
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{background:B.offwhite,borderBottom:`1px solid ${B.border}`,padding:"16px 24px 16px"}}>
        {/* Logo */}
        <div style={{textAlign:"center",marginBottom:14}}>
          <img src="/logo.png" alt="Closet Challenge" style={{height:38}}/>
        </div>
        {/* Metrics bar */}
        <div style={{display:"flex",gap:0,marginBottom:18,border:`1px solid ${B.border}`}}>
          {[
            {label:"XP",value:totalXP.toLocaleString(),color:B.burgundy},
            {label:"Streak",value:`${streakDays}d`,color:streakDays>=7?B.olive:B.textDim},
            {label:"Saldo",value:brlBalance>0?`R$${brlBalance}`:"—",color:brlBalance>0?B.olive:B.textDim},
          ].map((m,i)=>(
            <div key={i} style={{flex:1,padding:"8px 10px",textAlign:"center",borderRight:i<2?`1px solid ${B.border}`:"none",background:i===0?B.burgundyLt:i===1?B.oliveLt:B.offwhiteDk}}>
              <div style={{fontFamily:MONT,fontSize:8,letterSpacing:2,color:m.color,textTransform:"uppercase",marginBottom:2}}>{m.label}</div>
              <div style={{fontFamily:DIDOT,fontSize:15,fontStyle:"italic",color:m.color}}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Profile row */}
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <label style={{cursor:"pointer",flexShrink:0}}>
            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{display:"none"}}/>
            <div style={{width:50,height:50,background:profilePhoto?"transparent":B.offwhiteDk,border:`1px solid ${B.border}`,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
              {profilePhoto?<img src={profilePhoto} alt="perfil" style={{width:"100%",height:"100%",objectFit:"cover"}}/>:<IconDoor size={20} color={B.textLight}/>}
              <div style={{position:"absolute",bottom:0,right:0,width:16,height:16,background:B.burgundy,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{color:"#fff",fontSize:9}}>+</span>
              </div>
            </div>
          </label>
          <div style={{flex:1}}>
            {editingProfile?(
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input autoFocus value={nameInput} onChange={e=>setNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveProfileName()} placeholder="Seu nome" style={{...iBase,flex:1,fontSize:15}}/>
                <Btn onClick={saveProfileName} variant="ghost" style={{padding:"6px 12px",fontSize:9}}>OK</Btn>
              </div>
            ):(
              <div onClick={()=>{setEditingProfile(true);setNameInput(profileName);}}>
                <div style={{fontFamily:DIDOT,fontSize:20,fontStyle:"italic",color:B.text,cursor:"pointer"}}>{profileName||"Toque para adicionar nome"}</div>
              </div>
            )}
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:3}}>
              <button onClick={()=>setShowPhase(true)} style={{background:"none",border:"none",padding:0,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:phase.color}}/>
                <span style={{fontFamily:MONT,fontSize:9,letterSpacing:2,color:phase.color,textTransform:"uppercase"}}>{phase.name}</span>
                {nextPhase&&<span style={{fontFamily:MONT,fontSize:8,color:B.textLight}}>→ {nextPhase.name}</span>}
              </button>
            </div>
          </div>
          {brlBalance>0&&<button onClick={()=>setSpendOpen(true)} style={{background:"none",border:`1px solid ${B.olive}`,color:B.olive,padding:"6px 10px",fontFamily:MONT,fontSize:8,letterSpacing:2,cursor:"pointer",textTransform:"uppercase"}}>Usar</button>}
        </div>

        {/* XP bar */}
        <div style={{marginTop:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
            <span style={{fontFamily:MONT,fontSize:8,letterSpacing:2,color:B.textLight,textTransform:"uppercase"}}>Próximos R$ 100</span>
            <span style={{fontFamily:MONT,fontSize:8,color:B.textLight}}>{totalXP%500}/500 XP</span>
          </div>
          <div style={{height:1,background:B.border}}>
            <div style={{height:1,width:`${(totalXP%500)/500*100}%`,background:B.burgundy,transition:"width 0.8s ease"}}/>
          </div>
        </div>

        {/* Tagline */}
        <div style={{marginTop:10,fontFamily:MONT,fontSize:8,letterSpacing:4,color:B.textLight,textTransform:"uppercase"}}>Seu armário. Suas regras.</div>
        {hasPenalty&&<div style={{fontFamily:MONT,fontSize:8,letterSpacing:2,color:B.burgundy,textTransform:"uppercase",marginTop:4}}>⚠ {daysSince(lastLogDate)} dias sem registrar</div>}
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",background:B.olive,overflowX:"auto"}}>
        {[
          {id:"home",      icon:<IconHome size={14} color="#fff"/>,       label:"Hoje"},
          {id:"challenges",icon:<IconStar size={14} color="#fff"/>,       label:"Challenges"},
          {id:"streak",    icon:<IconFire size={14} color="#fff"/>,       label:"Desafio"},
          {id:"history",   icon:<IconHistory size={14} color="#fff"/>,    label:"Histórico"},
          {id:"wishlist",  icon:<IconWishlist size={14} color="#fff"/>,   label:"Wishlist"},
          {id:"financeiro",icon:<IconMoney size={14} color="#fff"/>,      label:"Financeiro"},
          {id:"conquistas",icon:<IconTrophy size={14} color="#fff"/>,     label:"Conquistas"},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background:tab===t.id?B.burgundy:"none",border:"none",color:"#fff",fontFamily:MONT,fontSize:8,letterSpacing:1,padding:"10px 12px",cursor:"pointer",whiteSpace:"nowrap",display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0,opacity:tab===t.id?1:0.7,textTransform:"uppercase"}}>
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ HOME ══ */}
      {tab==="home"&&(
        <div style={{padding:"24px"}}>
          {todayChallenge&&(
            <div onClick={()=>setTab("challenges")} style={{borderLeft:`3px solid ${todayChallengeCompleted?B.olive:B.burgundy}`,paddingLeft:16,marginBottom:24,cursor:"pointer"}}>
              <Label color={todayChallengeCompleted?B.olive:B.burgundy}>Challenge da semana</Label>
              <div style={{fontFamily:DIDOT,fontSize:17,fontStyle:"italic",color:B.text}}>{todayChallenge.theme}</div>
              <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,letterSpacing:1,marginTop:4}}>{todayChallengeCompleted?"✓ Completo — +400 XP":"Ver detalhes →"}</div>
            </div>
          )}

          {/* Day selector */}
          <div style={{display:"flex",gap:4,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {days7.map(day=>{
              const d=new Date(day+"T12:00:00"),sel=day===selectedDay,fin=finalized.includes(day),hasLog=(logs[day]||[]).length>0;
              return(
                <button key={day} onClick={()=>setSelectedDay(day)} style={{minWidth:42,padding:"8px 4px",background:sel?B.burgundy:fin?B.burgundyLt:"none",border:`1px solid ${sel?B.burgundy:fin?B.burgundyMd:B.border}`,cursor:"pointer",textAlign:"center"}}>
                  <div style={{fontFamily:MONT,fontSize:7,color:sel?"#fff":B.textLight,letterSpacing:1,textTransform:"uppercase"}}>{DAYS_PT[d.getDay()]}</div>
                  <div style={{fontFamily:DIDOT,fontSize:14,fontStyle:"italic",color:sel?"#fff":B.text,marginTop:2}}>{d.getDate()}</div>
                  {fin&&!sel&&<div style={{fontFamily:MONT,fontSize:7,color:B.burgundy,marginTop:1}}>✓</div>}
                  {hasLog&&!fin&&!sel&&<div style={{width:3,height:3,background:B.olive,borderRadius:"50%",margin:"3px auto 0"}}/>}
                </button>
              );
            })}
          </div>

          {todayFinalized&&selectedDay===todayKey?(
            <div style={{borderLeft:`3px solid ${B.olive}`,paddingLeft:16,marginBottom:20}}>
              <div style={{fontFamily:MONT,fontSize:9,color:B.olive,letterSpacing:2,textTransform:"uppercase"}}>Dia finalizado</div>
              <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,marginTop:2}}>Edite no Histórico se precisar</div>
            </div>
          ):(
            <Label>{selectedDay===todayKey?"Registre o dia":`Editando · ${formatDate(selectedDay)}`}</Label>
          )}

          <Divider/>
          {FIXED_ACTIONS.map((action,i)=>{
            const done=currentLog.find(l=>l.id===action.id);
            const IconComp=action.Icon;
            return(
              <div key={action.id}>
                <button onClick={()=>logAction(action)} style={{width:"100%",background:done?B.burgundyLt:"none",border:"none",padding:"14px 0",display:"flex",alignItems:"center",gap:14,cursor:"pointer",textAlign:"left"}}>
                  <div style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:done?B.burgundy:B.offwhiteDk,flexShrink:0}}>
                    <IconComp size={16} color={done?"#fff":B.textDim}/>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:MONT,fontSize:11,color:done?B.burgundy:B.text,letterSpacing:0.5}}>{action.label}</div>
                    <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,marginTop:2}}>{done?`✓ às ${done.time}`:action.desc}</div>
                  </div>
                  <div style={{fontFamily:DIDOT,fontSize:14,fontStyle:"italic",color:done?B.burgundy:B.olive}}>+{action.xp}</div>
                </button>
                <Divider/>
              </div>
            );
          })}

          {/* Desapego */}
          <button onClick={()=>setDesapegoOpen(true)} style={{width:"100%",background:"none",border:"none",padding:"14px 0",display:"flex",alignItems:"center",gap:14,cursor:"pointer"}}>
            <div style={{width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",background:B.oliveLt,flexShrink:0}}>
              <IconLeaf size={16} color={B.olive}/>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:MONT,fontSize:11,color:B.text,letterSpacing:0.5}}>Desapeguei por venda</div>
              <div style={{fontFamily:MONT,fontSize:9,color:B.olive,marginTop:2}}>100% do valor → crédito direto</div>
            </div>
            <div style={{fontFamily:MONT,fontSize:10,color:B.olive}}>+ R$</div>
          </button>
          <Divider/>

          {currentLog.filter(l=>l.id?.startsWith("desapego_")).map(l=>(
            <div key={l.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${B.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <IconLeaf size={14} color={B.olive}/>
                <div>
                  <div style={{fontFamily:MONT,fontSize:10,color:B.olive}}>{l.label}</div>
                  <div style={{fontFamily:MONT,fontSize:8,color:B.textLight}}>{l.time}</div>
                </div>
              </div>
              <button onClick={()=>removeLog(selectedDay,l.id)} style={{background:"none",border:"none",color:B.textLight,cursor:"pointer",fontSize:18}}>×</button>
            </div>
          ))}

          {dayXP>0&&(
            <div style={{marginTop:24,paddingTop:16,borderTop:`1px solid ${B.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <Label>XP do dia</Label>
                <div style={{fontFamily:DIDOT,fontSize:32,fontStyle:"italic",color:B.burgundy}}>+{dayXP}</div>
              </div>
              {!todayFinalized&&selectedDay===todayKey&&(
                <Btn onClick={()=>setConfirmFinalize(true)}>Finalizar dia</Btn>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══ CHALLENGES ══ */}
      {tab==="challenges"&&(
        <div style={{padding:"24px"}}>
          <Label>Styling Challenges 2026</Label>
          <div style={{fontFamily:DIDOT,fontSize:26,fontStyle:"italic",color:B.text,marginBottom:4}}>Um desafio<br/>por semana.</div>
          <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,letterSpacing:2,marginBottom:24,textTransform:"uppercase"}}>+400 XP por challenge completo</div>

          {todayChallenge&&(
            <div style={{background:B.burgundy,padding:"28px 24px",marginBottom:28}}>
              <div style={{fontFamily:MONT,fontSize:8,color:"#ffffff88",letterSpacing:4,marginBottom:14,textTransform:"uppercase"}}>★ Esta semana</div>
              <div style={{fontFamily:DIDOT,fontSize:24,fontStyle:"italic",color:"#fff",marginBottom:8}}>{todayChallenge.theme}</div>
              <div style={{fontFamily:MONT,fontSize:10,color:"#ffffffaa",lineHeight:1.7,marginBottom:20}}>{todayChallenge.desc}</div>
              {!todayChallengeCompleted?(
                <Btn onClick={()=>completeChallenge(currentWeek)} variant="olive" style={{width:"100%"}}>Completei este challenge → +400 XP</Btn>
              ):(
                <div style={{fontFamily:MONT,fontSize:10,color:B.oliveMd,letterSpacing:2,textTransform:"uppercase"}}>✓ Completo — +400 XP ganhos</div>
              )}
            </div>
          )}

          {STYLING_CHALLENGES.filter(c=>c.week<currentWeek).length>0&&(
            <>
              <Label>Semanas anteriores</Label>
              {STYLING_CHALLENGES.filter(c=>c.week<currentWeek).slice().reverse().map((c,i)=>{
                const done=completedChallenges.includes(c.week);
                return(
                  <div key={i} style={{borderBottom:`1px solid ${B.border}`,padding:"12px 0",display:"flex",alignItems:"center",gap:12,opacity:done?1:0.5}}>
                    <div style={{width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",background:done?B.oliveLt:B.offwhiteDk}}>
                      {done?<IconLeaf size={12} color={B.olive}/>:<span style={{fontFamily:MONT,fontSize:9,color:B.textLight}}>○</span>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:MONT,fontSize:10,color:done?B.text:B.textDim,letterSpacing:0.5}}>{c.theme}</div>
                    </div>
                    {done&&<span style={{fontFamily:MONT,fontSize:9,color:B.olive}}>+400</span>}
                  </div>
                );
              })}
            </>
          )}

          <div style={{marginTop:28,padding:"20px",background:B.oliveLt,textAlign:"center"}}>
            <IconDoor size={28} color={B.olive}/>
            <div style={{fontFamily:MONT,fontSize:9,color:B.olive,letterSpacing:3,marginTop:10,textTransform:"uppercase"}}>Próximo challenge</div>
            <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,letterSpacing:2,marginTop:4,textTransform:"uppercase"}}>Aparece na segunda-feira que vem</div>
          </div>
        </div>
      )}

      {/* ══ STREAK ══ */}
      {tab==="streak"&&(
        <div style={{padding:"24px"}}>
          <Label>Desafio</Label>
          <div style={{fontFamily:DIDOT,fontSize:26,fontStyle:"italic",color:B.text,marginBottom:24}}>Dias sem compras.</div>
          <div style={{background:B.burgundyLt,border:`1px solid ${B.burgundy}`,padding:"32px 24px",textAlign:"center",marginBottom:20}}>
            <div style={{fontFamily:DIDOT,fontSize:80,fontStyle:"italic",color:B.burgundy,lineHeight:1}}>{streakDays}</div>
            <div style={{fontFamily:MONT,fontSize:8,color:B.burgundyMd,letterSpacing:4,marginTop:8,textTransform:"uppercase"}}>Dias consecutivos</div>
            <div style={{fontFamily:MONT,fontSize:8,color:B.textLight,letterSpacing:2,marginTop:4}}>desde {formatDate(streakStart)}</div>
            <div style={{marginTop:20,height:1,background:B.border}}>
              <div style={{height:1,width:`${streakPct}%`,background:B.burgundy,transition:"width 0.8s ease"}}/>
            </div>
            <div style={{fontFamily:MONT,fontSize:8,color:B.textDim,letterSpacing:2,marginTop:8,textTransform:"uppercase"}}>Próximo marco: {nextMilestone} dias · +1.000 XP</div>
          </div>

          {newMilestone&&(
            <div style={{background:B.oliveLt,border:`1px solid ${B.olive}`,padding:"16px 20px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:MONT,fontSize:9,color:B.olive,letterSpacing:2,textTransform:"uppercase"}}>★ {newMilestone} dias alcançados!</div>
                <div style={{fontFamily:MONT,fontSize:8,color:B.textLight,marginTop:2}}>+1.000 XP disponível</div>
              </div>
              <Btn onClick={()=>claimMilestone(newMilestone)} variant="olive" style={{padding:"8px 14px"}}>Resgatar</Btn>
            </div>
          )}

          <Label mt={8}>Marcos</Label>
          {STREAK_MILESTONES.map((m,i)=>{
            const reached=streakDays>=m,claimed=claimedMilestones.includes(m);
            return(
              <div key={m} style={{borderBottom:`1px solid ${B.border}`,padding:"12px 0",display:"flex",alignItems:"center",gap:12,opacity:reached?1:0.35}}>
                <div style={{width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",background:claimed?B.oliveLt:reached?B.burgundyLt:B.offwhiteDk}}>
                  {claimed?<IconLeaf size={12} color={B.olive}/>:reached?<IconFire size={12} color={B.burgundy}/>:<span style={{fontFamily:MONT,fontSize:9,color:B.textLight}}>○</span>}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:MONT,fontSize:10,letterSpacing:1,color:B.text}}>{m} dias</div>
                  <div style={{fontFamily:MONT,fontSize:8,color:B.textLight}}>+1.000 XP = R$ 200 em vales</div>
                </div>
                {claimed&&<span style={{fontFamily:MONT,fontSize:8,color:B.olive,letterSpacing:1,textTransform:"uppercase"}}>Resgatado</span>}
                {reached&&!claimed&&<Btn onClick={()=>claimMilestone(m)} variant="ghost" style={{padding:"4px 10px",fontSize:8}}>Resgatar</Btn>}
              </div>
            );
          })}

          <div style={{display:"flex",gap:10,marginTop:20}}>
            <Btn onClick={()=>setConfirmBought(true)} variant="secondary" style={{flex:1}}>Comprei hoje</Btn>
            <Btn onClick={openNecessity} variant="olive" style={{flex:1}}>Era necessário</Btn>
          </div>
        </div>
      )}

      {/* ══ HISTORY ══ */}
      {tab==="history"&&(
        <div style={{padding:"24px"}}>
          <Label>Histórico</Label>
          <div style={{marginBottom:24}}>
            <Label color={B.textLight}>XP dos últimos 7 dias</Label>
            <div style={{display:"flex",alignItems:"flex-end",gap:4,height:60,borderBottom:`1px solid ${B.border}`}}>
              {chartData.map((d,i)=>(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%",justifyContent:"flex-end"}}>
                  {d.xp>0&&<div style={{fontFamily:MONT,fontSize:7,color:B.burgundy}}>{d.xp}</div>}
                  <div style={{width:"100%",background:d.xp>0?B.burgundy:B.offwhiteDk,height:`${Math.max((d.xp/maxXP)*50,2)}px`,transition:"height 0.5s ease"}}/>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:4,marginTop:4}}>
              {chartData.map((d,i)=><div key={i} style={{flex:1,fontFamily:MONT,fontSize:6,color:B.textLight,textAlign:"center",letterSpacing:0.5}}>{d.day.split(" ")[0]}</div>)}
            </div>
          </div>

          {days7.slice().reverse().map(day=>{
            const dl=logs[day]||[],dxp=dl.reduce((s,a)=>s+a.xp,0),fin=finalized.includes(day),isEditing=editingDay===day;
            return(
              <div key={day} style={{borderTop:`1px solid ${B.border}`,paddingTop:14,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:dl.length?10:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {fin&&<IconLeaf size={10} color={B.olive}/>}
                    <span style={{fontFamily:MONT,fontSize:10,letterSpacing:1,color:B.text,textTransform:"uppercase"}}>{formatDate(day)}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    {dxp>0&&<span style={{fontFamily:DIDOT,fontSize:13,fontStyle:"italic",color:B.burgundy}}>+{dxp} XP</span>}
                    <Btn onClick={()=>setEditingDay(isEditing?null:day)} variant="ghost" style={{padding:"3px 8px",fontSize:8}}>{isEditing?"Fechar":"Editar"}</Btn>
                  </div>
                </div>
                {dl.length===0&&<div style={{fontFamily:MONT,fontSize:9,color:B.textLight,letterSpacing:1}}>Sem registros</div>}
                {dl.map(l=>{
                  const ActionIcon=FIXED_ACTIONS.find(a=>a.id===l.id)?.Icon;
                  return(
                    <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,paddingBottom:8,marginBottom:8,borderBottom:`1px solid ${B.offwhiteDk}`}}>
                      <div style={{width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",background:B.offwhiteDk,flexShrink:0}}>
                        {ActionIcon?<ActionIcon size={12} color={B.textDim}/>:<IconLeaf size={12} color={B.olive}/>}
                      </div>
                      <span style={{fontFamily:MONT,fontSize:9,color:B.textDim,flex:1,letterSpacing:0.5}}>{l.label}</span>
                      {l.xp>0&&<span style={{fontFamily:MONT,fontSize:9,color:B.burgundy}}>+{l.xp}</span>}
                      {isEditing&&<button onClick={()=>removeLog(day,l.id)} style={{background:"none",border:"none",color:B.textLight,cursor:"pointer",fontSize:16}}>×</button>}
                    </div>
                  );
                })}
                {isEditing&&(
                  <div style={{marginTop:10}}>
                    <Label>Adicionar</Label>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {FIXED_ACTIONS.filter(a=>!dl.find(l=>l.id===a.id)).map(a=>(
                        <button key={a.id} onClick={()=>setLogs(p=>({...p,[day]:[...(p[day]||[]),{...a,Icon:undefined,time:"—"}]}))} style={{background:B.offwhiteDk,border:`1px solid ${B.border}`,color:B.textDim,padding:"5px 8px",fontFamily:MONT,fontSize:8,letterSpacing:1,cursor:"pointer"}}>
                          {a.label.slice(0,18)} +{a.xp}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ══ WISHLIST ══ */}
      {tab==="wishlist"&&(
        <div style={{padding:"24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20}}>
            <div>
              <Label>Wishlist</Label>
              <div style={{fontFamily:DIDOT,fontSize:24,fontStyle:"italic",color:B.text}}>Antes de comprar.</div>
            </div>
            {budget>0&&<div style={{fontFamily:MONT,fontSize:9,color:budgetLeft>50?B.olive:B.burgundy,letterSpacing:1,textTransform:"uppercase"}}>Budget: R$ {budgetLeft.toFixed(0)}</div>}
          </div>

          <button onClick={openChecker} style={{width:"100%",background:B.burgundy,border:"none",color:"#fff",padding:"16px 20px",fontFamily:MONT,fontSize:10,letterSpacing:2,cursor:"pointer",marginBottom:24,textAlign:"left",textTransform:"uppercase",display:"flex",alignItems:"center",gap:10}}>
            <IconBag size={16} color="#fff"/>
            Vai comprar algo? → Passar pelo checker
          </button>

          {wishlist.length===0&&<div style={{fontFamily:MONT,fontSize:9,color:B.textLight,letterSpacing:2}}>Wishlist vazia</div>}
          {wishlist.map(item=>{
            const days=daysOnWishlist(item),canBuy=days>=7&&item.ritualDone&&item.approved,readyForRitual=days>=7&&!item.ritualDone;
            return(
              <div key={item.id} style={{borderBottom:`1px solid ${B.border}`,paddingBottom:16,marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontFamily:MONT,fontSize:11,letterSpacing:1,color:B.text}}>{item.name}</div>
                    {item.price&&<div style={{fontFamily:DIDOT,fontSize:13,fontStyle:"italic",color:B.burgundy,marginTop:2}}>{item.price}</div>}
                  </div>
                  <button onClick={()=>setWishlist(p=>p.filter(w=>w.id!==item.id))} style={{background:"none",border:"none",color:B.textLight,cursor:"pointer",fontSize:18}}>×</button>
                </div>
                <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
                  <span style={{fontFamily:MONT,fontSize:8,color:days>=7?B.olive:B.textLight,letterSpacing:1,textTransform:"uppercase"}}>{days}d na lista {days<7?`· faltam ${7-days}d`:"✓"}</span>
                  {item.ritualDone&&<span style={{fontFamily:MONT,fontSize:8,color:item.approved?B.olive:B.burgundy,letterSpacing:1,textTransform:"uppercase"}}>{item.approved?"✓ Ritual ok":"✗ Reflita"}</span>}
                </div>
                {canBuy&&<div style={{fontFamily:MONT,fontSize:9,color:B.olive,letterSpacing:2,marginTop:10,textTransform:"uppercase"}}>✓ Liberado para comprar</div>}
                {readyForRitual&&<Btn onClick={()=>startRitual(item)} variant="secondary" style={{marginTop:10,fontSize:9}}>Fazer ritual de compra →</Btn>}
              </div>
            );
          })}
        </div>
      )}

      {/* ══ FINANCEIRO ══ */}
      {tab==="financeiro"&&(
        <div style={{padding:"24px"}}>
          <Label>Financeiro</Label>
          <div style={{fontFamily:DIDOT,fontSize:26,fontStyle:"italic",color:B.text,marginBottom:24}}>Seu dinheiro consciente.</div>

          <div style={{background:B.burgundy,padding:"28px 24px",marginBottom:24}}>
            <div style={{fontFamily:MONT,fontSize:8,color:"#ffffff88",letterSpacing:4,marginBottom:8,textTransform:"uppercase"}}>Saldo disponível</div>
            <div style={{fontFamily:DIDOT,fontSize:56,fontStyle:"italic",color:"#fff",lineHeight:1}}>R$ {brlBalance.toFixed(0)}</div>
            {brlBalance>0&&<Btn onClick={()=>setSpendOpen(true)} variant="olive" style={{marginTop:16,fontSize:9}}>Usar vale →</Btn>}
          </div>

          {[
            {label:"XP Total",value:`${totalXP.toLocaleString()} XP`,sub:`= R$ ${xpBrl.toFixed(0)}`,color:B.burgundy},
            {label:"Desapego (vendas)",value:`R$ ${desapegoTotal.toFixed(0)}`,sub:"100% do valor",color:B.olive},
            {label:"Total ganho",value:`R$ ${(xpBrl+desapegoTotal).toFixed(0)}`,sub:"XP + desapego",color:B.text},
            {label:"Já utilizado",value:`R$ ${spends.reduce((s,sp)=>s+(sp.amount||0),0).toFixed(0)}`,sub:"Vales gastos",color:B.textDim},
          ].map((row,i)=>(
            <div key={i} style={{borderBottom:`1px solid ${B.border}`,padding:"12px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontFamily:MONT,fontSize:8,color:B.textLight,letterSpacing:2,textTransform:"uppercase"}}>{row.label}</div>
                <div style={{fontFamily:MONT,fontSize:8,color:B.textLight,marginTop:2}}>{row.sub}</div>
              </div>
              <div style={{fontFamily:DIDOT,fontSize:16,fontStyle:"italic",color:row.color}}>{row.value}</div>
            </div>
          ))}

          <div style={{marginTop:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <Label mt={0}>Budget mensal</Label>
              <Btn onClick={()=>{setBudgetInput(budget.toString());setBudgetOpen(true);}} variant="ghost" style={{padding:"4px 10px",fontSize:8}}>{budget>0?"Editar":"Definir"}</Btn>
            </div>
            {budget>0&&(
              <>
                <div style={{height:1,background:B.border,marginBottom:8}}>
                  <div style={{height:1,width:`${Math.min((monthSpent/budget)*100,100)}%`,background:monthSpent>budget?B.burgundy:B.olive}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontFamily:MONT,fontSize:9,color:B.textDim}}>Gasto: R$ {monthSpent.toFixed(0)}</span>
                  <span style={{fontFamily:MONT,fontSize:9,color:budgetLeft>0?B.olive:B.burgundy}}>Restante: R$ {budgetLeft.toFixed(0)}</span>
                </div>
              </>
            )}
          </div>

          <div style={{marginTop:20,borderTop:`1px solid ${B.border}`,paddingTop:16}}>
            <Label>Potencial mensal</Label>
            {[
              {label:"Semana perfeita",value:"~3.165 XP = R$ 600"},
              {label:"Mês perfeito",value:"~15.260 XP = R$ 3.000"},
              {label:"Streak 30 dias",value:"+1.000 XP = +R$ 200"},
              {label:"Desapego estimado",value:"R$ 2.000+ crédito"},
            ].map((row,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${B.offwhiteDk}`}}>
                <span style={{fontFamily:MONT,fontSize:9,color:B.textDim}}>{row.label}</span>
                <span style={{fontFamily:MONT,fontSize:9,color:B.burgundy}}>{row.value}</span>
              </div>
            ))}
            <div style={{marginTop:12,fontFamily:DIDOT,fontSize:22,fontStyle:"italic",color:B.text}}>Potencial: R$ 5.000+ / mês</div>
          </div>
        </div>
      )}

      {/* ══ CONQUISTAS ══ */}
      {tab==="conquistas"&&(
        <div style={{padding:"24px"}}>
          <Label>Conquistas</Label>
          <div style={{fontFamily:DIDOT,fontSize:26,fontStyle:"italic",color:B.text,marginBottom:4}}>Seus badges.</div>
          <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,letterSpacing:2,marginBottom:16,textTransform:"uppercase"}}>{unlockedAchievements.length} de {ACHIEVEMENTS.length} desbloqueados</div>
          <div style={{height:1,background:B.border,marginBottom:20}}>
            <div style={{height:1,width:`${(unlockedAchievements.length/ACHIEVEMENTS.length)*100}%`,background:B.burgundy}}/>
          </div>
          {ACHIEVEMENTS.map(a=>{
            const unlocked=a.check(logs,completedChallenges,totalXP);
            const IconComp=a.Icon;
            return(
              <div key={a.id} style={{borderBottom:`1px solid ${B.border}`,padding:"14px 0",display:"flex",alignItems:"center",gap:14,opacity:unlocked?1:0.3}}>
                <div style={{width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",background:unlocked?B.burgundyLt:B.offwhiteDk,flexShrink:0}}>
                  <IconComp size={16} color={unlocked?B.burgundy:B.textLight}/>
                </div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:MONT,fontSize:10,letterSpacing:1,color:unlocked?B.text:B.textDim}}>{a.title}</div>
                  <div style={{fontFamily:MONT,fontSize:9,color:B.textLight,marginTop:2}}>{a.desc}</div>
                </div>
                {unlocked&&<IconLeaf size={12} color={B.olive}/>}
              </div>
            );
          })}
        </div>
      )}

      {/* ══ RITUAL ══ */}
      {tab==="ritual"&&ritual&&(
        <div style={{padding:"24px"}}>
          <Label>Ritual de compra</Label>
          <div style={{fontFamily:DIDOT,fontSize:20,fontStyle:"italic",color:B.text,marginBottom:24}}>{ritual.name}</div>
          <QuestionFlow questions={RITUAL_QUESTIONS} step={ritualStep} onAnswer={answerRitual}/>
          <button onClick={()=>{setTab("wishlist");setRitual(null);}} style={{marginTop:20,background:"none",border:"none",color:B.textLight,fontFamily:MONT,fontSize:9,letterSpacing:2,cursor:"pointer",textTransform:"uppercase"}}>← Voltar</button>
        </div>
      )}

      {/* ── BOTTOM NAV ── */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:B.offwhite,borderTop:`1px solid ${B.border}`,display:"flex",justifyContent:"space-around",padding:"8px 0 16px"}}>
        {[
          {id:"home",      Icon:IconHome,    label:"Hoje"},
          {id:"challenges",Icon:IconStar,    label:"Challenges"},
          {id:"streak",    Icon:IconFire,    label:"Desafio"},
          {id:"history",   Icon:IconHistory, label:"Histórico"},
          {id:"wishlist",  Icon:IconWishlist,label:"Wishlist"},
          {id:"financeiro",Icon:IconMoney,   label:"Finanças"},
          {id:"conquistas",Icon:IconTrophy,  label:"Conquistas"},
        ].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"0 4px"}}>
            <t.Icon size={18} color={tab===t.id?B.burgundy:B.textLight}/>
            <span style={{fontFamily:MONT,fontSize:7,letterSpacing:0.5,color:tab===t.id?B.burgundy:B.textLight,textTransform:"uppercase"}}>{t.label}</span>
            {tab===t.id&&<div style={{width:3,height:3,borderRadius:"50%",background:B.burgundy}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
