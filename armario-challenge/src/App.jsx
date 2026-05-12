import { useState, useEffect } from "react";

const P = {
  bg:"#f7f4f0",surface:"#ffffff",surfaceAlt:"#f0edf8",border:"#e4dff0",borderHi:"#c5b8e8",
  accent:"#7c4dff",accentLo:"#5e35b1",accentHi:"#b39ddb",accentBg:"#ede7ff",
  muted:"#9e8fbf",text:"#1a1030",textDim:"#6b5e8a",
  green:"#2e7d5e",greenBg:"#e8f5ee",red:"#b5376a",redBg:"#fce8f0",
  gold:"#8b6914",goldBg:"#fdf3dc",orange:"#c2570a",orangeBg:"#fff0e6",
  pink:"#c2185b",pinkBg:"#fce4ec",teal:"#00796b",tealBg:"#e0f2f1",
};

const FIXED_ACTIONS = [
  { id:"one_new",   label:"1 peça nova no look",         xp:50,  icon:"◇", desc:"Estreou uma peça com etiqueta" },
  { id:"two_new",   label:"2 peças novas no look",        xp:80,  icon:"◈", desc:"Dupla de estreias no mesmo dia" },
  { id:"full_new",  label:"Look inteiro de peças novas",  xp:120, icon:"✦", desc:"Total premiê — tudo etiqueta" },
  { id:"full_old",  label:"Look 100% do armário",         xp:100, icon:"⟳", desc:"Zero peça nova — puro armário" },
  { id:"once_worn", label:"Peça usada só uma vez",        xp:50,  icon:"◑", desc:"Resgatou do esquecimento" },
  { id:"provador",  label:"Provador em casa",             xp:35,  icon:"⬡", desc:"5+ looks montados em casa" },
  { id:"whering",   label:"3 looks no Whering",           xp:35,  icon:"⬡", desc:"Criou looks no app" },
  { id:"no_app",    label:"Dia sem app de compras",       xp:50,  icon:"◯", desc:"24h sem TikTok Shop, Shein..." },
  { id:"posted",    label:"Postei o look hoje",           xp:25,  icon:"◉", desc:"Instagram, TikTok ou Whering" },
  { id:"fav_look",  label:"Look favorito do dia",         xp:10,  icon:"♡", desc:"Marcou como favorito" },
];

const REWARDS = [
  { xp:500,  brl:100, label:"R$ 100" },
  { xp:1000, brl:200, label:"R$ 200" },
  { xp:2000, brl:400, label:"R$ 400" },
];

const PHASES = [
  { name:"Iniciante",  minXP:0,    icon:"◇", color:P.muted,   bg:P.surfaceAlt, desc:"Você começou. Isso já é muito." },
  { name:"Detox",      minXP:300,  icon:"◑", color:P.teal,    bg:P.tealBg,     desc:"Consciência chegando." },
  { name:"Consciente", minXP:800,  icon:"◈", color:P.accent,  bg:P.accentBg,   desc:"O armário agradece." },
  { name:"Curadora",   minXP:1500, icon:"✦", color:P.gold,    bg:P.goldBg,     desc:"Você edita, não acumula." },
  { name:"Mestre",     minXP:3000, icon:"▲", color:P.pink,    bg:P.pinkBg,     desc:"Referência de consumo consciente." },
];

const RITUAL_QUESTIONS = [
  { id:"q1", text:"Já tenho algo parecido no armário?",               warn:true  },
  { id:"q2", text:"Consigo montar 3 looks diferentes com essa peça?", warn:false },
  { id:"q3", text:"Sei exatamente onde vou usar isso?",               warn:false },
  { id:"q4", text:"Tem espaço físico no meu armário?",                warn:false },
  { id:"q5", text:"Posso esperar mais 7 dias antes de comprar?",      warn:false },
];

const WISHLIST_CHECKER = [
  { id:"w1", text:"Já tenho algo parecido no armário?",                   warn:true  },
  { id:"w2", text:"Vou usar mais de uma vez (não é pra algo específico)?", warn:false },
  { id:"w3", text:"Cabe no meu budget do mês?",                           warn:false },
  { id:"w4", text:"Consigo esperar 7 dias antes de comprar?",             warn:false },
];

const NECESSITY_QUESTIONS = [
  { id:"n1", text:"Isso é uma necessidade real (não desejo)?",  mustYes:true },
  { id:"n2", text:"Não tenho nada parecido que substitua?",     mustYes:true },
  { id:"n3", text:"Pesquisei o melhor preço disponível?",       mustYes:true },
  { id:"n4", text:"Compraria isso mesmo sem o challenge?",      mustYes:true },
];

const RULES = [
  { icon:"◷", title:"Regra dos 7 dias",       body:"Todo item fica 7 dias na wishlist antes de ir ao ritual. Sem exceção." },
  { icon:"◈", title:"Ritual obrigatório",     body:"Antes de qualquer compra, passe pelo ritual de 5 perguntas. Reprovado? Mais 7 dias." },
  { icon:"✦", title:"Peças novas primeiro",   body:"Enquanto houver etiqueta no armário, essas peças têm prioridade." },
  { icon:"⇄", title:"1 entra, 1 sai",         body:"A cada peça nova comprada, desapegue de pelo menos 1. O armário não cresce." },
  { icon:"◯", title:"Detox de apps",          body:"Pelo menos 3 dias por semana sem abrir app de compras." },
  { icon:"⬡", title:"Provador em casa",       body:"Antes de ir à loja, faça um provador em casa ou crie 3 looks no Whering." },
  { icon:"◌", title:"Desapego recompensado",  body:"Vendeu uma peça? Ganha 20% do valor em XP." },
  { icon:"◎", title:"Compra necessária",      body:"Precisou comprar? Passe pelo ritual de necessidade. Aprovado = streak mantido." },
  { icon:"▲", title:"Recompensas ganhas",     body:"Os vales só são usados depois de desbloqueados com XP. Não tem atalho." },
];

const STREAK_MILESTONES = [30,60,90,120,150,180];
const DAYS_OF_WEEK = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const START_DATE = "2026-05-12";

function getTodayKey() { return new Date().toISOString().split("T")[0]; }
function formatDate(s) { const d = new Date(s+"T12:00:00"); return d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}); }
function getDays() {
  const start = new Date(START_DATE+"T12:00:00");
  const ref = new Date()>=start ? new Date() : start;
  return Array.from({length:7},(_,i)=>{ const d=new Date(ref); d.setDate(d.getDate()-(6-i)); const k=d.toISOString().split("T")[0]; return k>=START_DATE?k:null; }).filter(Boolean);
}
function xpToBrl(xp) { let b=0; for(const r of [...REWARDS].sort((a,b)=>b.xp-a.xp)){if(xp>=r.xp){b=r.brl;break;}} return b; }
function getPhase(xp) { return [...PHASES].reverse().find(p=>xp>=p.minXP)||PHASES[0]; }
function rewardProgress(xp) {
  const next=REWARDS.find(r=>xp<r.xp)||REWARDS[REWARDS.length-1];
  const prev=(REWARDS.filter(r=>xp>=r.xp).pop()||{xp:0}).xp;
  return {pct:Math.min(((xp-prev)/(next.xp-prev))*100,100),next};
}
function daysSince(dateStr) { return Math.max(0,Math.floor((new Date()-new Date(dateStr+"T12:00:00"))/86400000)); }

function Chip({color,bg,children}) {
  return <span style={{fontSize:11,padding:"3px 10px",borderRadius:20,background:bg,color,border:`1px solid ${color}33`,display:"inline-block",lineHeight:1.6}}>{children}</span>;
}
function IconBox({icon,active,color,size=36}) {
  return <div style={{width:size,height:size,borderRadius:10,background:active?(color||P.accent):P.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center",color:active?"#fff":P.muted,fontSize:14,flexShrink:0,transition:"all 0.18s"}}>{icon}</div>;
}
const iBase={width:"100%",background:"none",border:"none",borderBottom:`1px solid ${P.border}`,color:P.text,fontSize:14,padding:"8px 0",outline:"none",boxSizing:"border-box",fontFamily:"'Georgia',serif"};

function Modal({onClose,children,sheet=false}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:sheet?"flex-end":"center",justifyContent:"center",zIndex:200,padding:sheet?0:24}} onClick={onClose}>
      <div style={{background:P.surface,borderRadius:sheet?"20px 20px 0 0":20,padding:"28px 24px 44px",width:"100%",maxWidth:430,boxShadow:"0 -8px 40px rgba(100,60,200,0.12)",...(!sheet&&{padding:32,maxWidth:300})}} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default function ArmarioChallenge() {
  const [tab,setTab] = useState("home");

  // Core data
  const [logs,setLogs] = useState(()=>{try{return JSON.parse(localStorage.getItem("ac6_logs")||"{}");}catch{return{};}});
  const [finalized,setFinalized] = useState(()=>{try{return JSON.parse(localStorage.getItem("ac6_fin")||"[]");}catch{return[];}});
  const [wishlist,setWishlist] = useState(()=>{try{return JSON.parse(localStorage.getItem("ac6_wish")||"[]");}catch{return[];}});
  const [spends,setSpends] = useState(()=>{try{return JSON.parse(localStorage.getItem("ac6_spends")||"[]");}catch{return[];}});
  const [budget,setBudget] = useState(()=>parseFloat(localStorage.getItem("ac6_budget")||"0"));
  const [budgetSpent,setBudgetSpent] = useState(()=>{try{return JSON.parse(localStorage.getItem("ac6_bspent")||"[]");}catch{return[];}});

  // Streak
  const [streakStart,setStreakStart] = useState(()=>localStorage.getItem("ac6_streak")||START_DATE);
  const [claimedMilestones,setClaimedMilestones] = useState(()=>{try{return JSON.parse(localStorage.getItem("ac6_miles")||"[]");}catch{return[];}});

  // Look streak
  const [postStreak,setPostStreak] = useState(()=>parseInt(localStorage.getItem("ac6_postStreak")||"0"));
  const [lastPostDate,setLastPostDate] = useState(()=>localStorage.getItem("ac6_lastPost")||"");

  // Penalty
  const [lastLogDate,setLastLogDate] = useState(()=>localStorage.getItem("ac6_lastLog")||START_DATE);

  // UI states
  const [selectedDay,setSelectedDay] = useState(()=>{const t=getTodayKey();return t>=START_DATE?t:START_DATE;});
  const [editingDay,setEditingDay] = useState(null);
  const [toast,setToast] = useState(null);
  const [ritual,setRitual] = useState(null);
  const [ritualStep,setRitualStep] = useState(0);
  const [ritualAnswers,setRitualAnswers] = useState({});
  const [checkerOpen,setCheckerOpen] = useState(false);
  const [checkerStep,setCheckerStep] = useState(0);
  const [checkerAnswers,setCheckerAnswers] = useState({});
  const [checkerItem,setCheckerItem] = useState({name:"",price:"",link:""});
  const [necessityOpen,setNecessityOpen] = useState(false);
  const [necessityStep,setNecessityStep] = useState(0);
  const [necessityAnswers,setNecessityAnswers] = useState({});
  const [necessityItem,setNecessityItem] = useState("");
  const [desapegoOpen,setDesapegoOpen] = useState(false);
  const [desapegoValue,setDesapegoValue] = useState("");
  const [spendOpen,setSpendOpen] = useState(false);
  const [spendValue,setSpendValue] = useState("");
  const [spendNote,setSpendNote] = useState("");
  const [budgetOpen,setBudgetOpen] = useState(false);
  const [budgetInput,setBudgetInput] = useState("");
  const [confirmFinalize,setConfirmFinalize] = useState(false);
  const [confirmBought,setConfirmBought] = useState(false);
  const [claimingReward,setClaimingReward] = useState(null);
  const [showPhase,setShowPhase] = useState(false);

  const days7 = getDays();
  const currentLog = logs[selectedDay]||[];
  const todayKey = getTodayKey();
  const todayFinalized = finalized.includes(todayKey);

  // XP
  const baseXP = Object.values(logs).flat().reduce((s,a)=>s+(a.xp||0),0);
  const milestoneXP = claimedMilestones.length*1000;
  const totalXP = baseXP+milestoneXP;

  // Penalty: if 3+ days no log, -20 XP shown as warning (we just flag it)
  const penaltyDays = daysSince(lastLogDate);
  const hasPenalty = penaltyDays>=3;

  // BRL
  const totalBrlEarned = xpToBrl(totalXP);
  const totalSpent = spends.reduce((s,sp)=>s+(sp.amount||0),0);
  const brlBalance = Math.max(0,totalBrlEarned-totalSpent);

  // Budget
  const thisMonth = new Date().toISOString().slice(0,7);
  const monthSpent = budgetSpent.filter(s=>s.date?.startsWith(thisMonth)).reduce((s,b)=>s+(b.amount||0),0);
  const budgetLeft = Math.max(0,budget-monthSpent);

  // Phase
  const phase = getPhase(totalXP);
  const nextPhase = PHASES.find(p=>p.minXP>totalXP);

  // Streak
  const streakDays = daysSince(streakStart);
  const nextMilestone = STREAK_MILESTONES.find(m=>streakDays<m)||STREAK_MILESTONES[STREAK_MILESTONES.length-1];
  const lastMilestone = STREAK_MILESTONES.filter(m=>streakDays>=m).pop()||0;
  const streakPct = Math.min(((streakDays-lastMilestone)/(nextMilestone-lastMilestone))*100,100);
  const newMilestone = STREAK_MILESTONES.find(m=>streakDays>=m&&!claimedMilestones.includes(m));

  const {pct,next:nextReward} = rewardProgress(totalXP);
  const dayXP = currentLog.reduce((s,a)=>s+a.xp,0);

  useEffect(()=>{localStorage.setItem("ac6_logs",JSON.stringify(logs));},[logs]);
  useEffect(()=>{localStorage.setItem("ac6_fin",JSON.stringify(finalized));},[finalized]);
  useEffect(()=>{localStorage.setItem("ac6_wish",JSON.stringify(wishlist));},[wishlist]);
  useEffect(()=>{localStorage.setItem("ac6_spends",JSON.stringify(spends));},[spends]);
  useEffect(()=>{localStorage.setItem("ac6_budget",budget.toString());},[budget]);
  useEffect(()=>{localStorage.setItem("ac6_bspent",JSON.stringify(budgetSpent));},[budgetSpent]);
  useEffect(()=>{localStorage.setItem("ac6_streak",streakStart);},[streakStart]);
  useEffect(()=>{localStorage.setItem("ac6_miles",JSON.stringify(claimedMilestones));},[claimedMilestones]);
  useEffect(()=>{localStorage.setItem("ac6_postStreak",postStreak.toString());},[postStreak]);
  useEffect(()=>{localStorage.setItem("ac6_lastPost",lastPostDate);},[lastPostDate]);
  useEffect(()=>{localStorage.setItem("ac6_lastLog",lastLogDate);},[lastLogDate]);

  function showToast(msg,type="ok"){setToast({msg,type});setTimeout(()=>setToast(null),2800);}

  function logAction(action) {
    if(todayFinalized&&selectedDay===todayKey){showToast("Dia finalizado — edite no Histórico","warn");return;}
    const done=currentLog.find(l=>l.id===action.id);
    if(done){setLogs(p=>({...p,[selectedDay]:(p[selectedDay]||[]).filter(l=>l.id!==action.id)}));return;}

    // Post streak logic
    if(action.id==="posted") {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
      const yKey = yesterday.toISOString().split("T")[0];
      const newStreak = lastPostDate===yKey||lastPostDate===todayKey ? postStreak+1 : 1;
      setPostStreak(newStreak); setLastPostDate(todayKey);
      if(newStreak%7===0) showToast(`🔥 ${newStreak} dias de looks postados! +25 XP`);
    }

    setLogs(p=>({...p,[selectedDay]:[...(p[selectedDay]||[]),{...action,time:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}]}));
    setLastLogDate(selectedDay);
    showToast(`+${action.xp} XP`);
  }

  function logDesapego() {
    const val=parseFloat(desapegoValue.replace(",","."));
    if(!val||val<=0)return;
    const xp=Math.round(val*0.2);
    setLogs(p=>({...p,[selectedDay]:[...(p[selectedDay]||[]),{id:`desapego_${Date.now()}`,label:`Vendi por R$ ${val.toFixed(0)}`,xp,icon:"◌",time:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}]}));
    setLastLogDate(selectedDay);
    showToast(`+${xp} XP — R$ ${val.toFixed(0)} vendido`);
    setDesapegoValue("");setDesapegoOpen(false);
  }

  function removeLog(dayKey,id){setLogs(p=>({...p,[dayKey]:(p[dayKey]||[]).filter(l=>l.id!==id)}));}

  function finalizeDay() {
    if(!finalized.includes(todayKey)){setFinalized(p=>[...p,todayKey]);showToast("Dia finalizado ✦");setTab("history");}
    setConfirmFinalize(false);
  }

  // Wishlist checker
  function openChecker(){setCheckerOpen(true);setCheckerStep(0);setCheckerAnswers({});setCheckerItem({name:"",price:"",link:""});}
  function answerChecker(qId,answer) {
    const next={...checkerAnswers,[qId]:answer};
    setCheckerAnswers(next);
    // If they say YES to "tem algo parecido" — warn immediately but continue
    if(checkerStep<WISHLIST_CHECKER.length-1){setCheckerStep(s=>s+1);return;}
    // Evaluate
    const hasSimilar=next["w1"]===true;
    const approved=!hasSimilar&&next["w2"]===true&&next["w3"]===true;
    if(approved) {
      setWishlist(p=>[{id:Date.now().toString(),...checkerItem,addedAt:new Date().toISOString(),ritualDone:false},...p]);
      showToast("Adicionado à wishlist ✦");
    } else {
      showToast(hasSimilar?"Já tem algo parecido — pense bem":"Não passou no checker","warn");
    }
    setCheckerOpen(false);
  }

  // Wishlist ritual
  function startRitual(item){setRitual(item);setRitualAnswers({});setRitualStep(0);setTab("ritual");}
  function answerRitual(qId,answer) {
    const next={...ritualAnswers,[qId]:answer};
    setRitualAnswers(next);
    if(ritualStep<RITUAL_QUESTIONS.length-1){setRitualStep(s=>s+1);return;}
    const failed=RITUAL_QUESTIONS.filter(q=>q.warn).some(q=>next[q.id]===true);
    const noJustify=RITUAL_QUESTIONS.filter(q=>!q.warn&&q.id!=="q5").some(q=>next[q.id]===false);
    const approved=!failed&&!noJustify;
    setWishlist(p=>p.map(w=>w.id===ritual.id?{...w,ritualDone:true,approved,ritualDate:new Date().toISOString()}:w));
    setTab("wishlist");setRitual(null);
    showToast(approved?"Compra aprovada ✦":"Reflita mais um pouco",approved?"ok":"warn");
  }

  // Necessity
  function openNecessity(){setNecessityOpen(true);setNecessityStep(0);setNecessityAnswers({});setNecessityItem("");}
  function answerNecessity(qId,answer) {
    const next={...necessityAnswers,[qId]:answer};
    setNecessityAnswers(next);
    if(necessityStep<NECESSITY_QUESTIONS.length-1){setNecessityStep(s=>s+1);return;}
    const approved=NECESSITY_QUESTIONS.every(q=>next[q.id]===true);
    if(approved){showToast("✦ Compra necessária aprovada — streak mantido!");}
    else{setStreakStart(getTodayKey());showToast("Não aprovada — streak zerado","warn");}
    setNecessityOpen(false);setConfirmBought(false);
  }

  function confirmBoughtBreak(){setStreakStart(getTodayKey());setConfirmBought(false);showToast("Streak zerado — novo começo","warn");}

  function claimMilestone(m){setClaimedMilestones(p=>[...p,m]);showToast(`+1.000 XP — ${m} dias sem compras! ✦`);}

  function logSpend(){
    const val=parseFloat(spendValue.replace(",","."));
    if(!val||val<=0)return;
    setSpends(p=>[...p,{id:Date.now().toString(),amount:val,note:spendNote,date:getTodayKey()}]);
    showToast(`−R$ ${val.toFixed(0)} do saldo`);
    setSpendValue("");setSpendNote("");setSpendOpen(false);
  }

  function saveBudget(){
    const val=parseFloat(budgetInput.replace(",","."));
    if(!val||val<=0)return;
    setBudget(val);setBudgetOpen(false);showToast("Budget atualizado ✦");
  }

  function registerBudgetSpend(amount,note){
    setBudgetSpent(p=>[...p,{id:Date.now().toString(),amount,note,date:getTodayKey()}]);
  }

  function daysOnWishlist(item){return Math.floor((Date.now()-new Date(item.addedAt).getTime())/86400000);}

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:"100vh",background:P.bg,color:P.text,fontFamily:"'Georgia',serif",maxWidth:430,margin:"0 auto",position:"relative",paddingBottom:90}}>

      {/* Toast */}
      {toast&&<div style={{position:"fixed",top:18,left:"50%",transform:"translateX(-50%)",background:toast.type==="warn"?P.redBg:P.accentBg,color:toast.type==="warn"?P.red:P.accentLo,border:`1px solid ${toast.type==="warn"?P.red+"44":P.borderHi}`,padding:"9px 20px",borderRadius:40,fontSize:13,zIndex:300,whiteSpace:"nowrap",boxShadow:"0 4px 20px rgba(100,60,200,0.12)",animation:"fadeUp 0.3s ease"}}>{toast.msg}</div>}

      {/* ── Wishlist Checker Modal ── */}
      {checkerOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={()=>setCheckerOpen(false)}>
          <div style={{background:P.surface,borderRadius:"20px 20px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:430}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>◈ Vai comprar algo?</div>
            {checkerStep===0&&(
              <div style={{marginBottom:16}}>
                <input value={checkerItem.name} onChange={e=>setCheckerItem(p=>({...p,name:e.target.value}))} placeholder="O que você quer comprar?" style={{...iBase,marginBottom:8}} />
                <div style={{display:"flex",gap:10}}>
                  <input value={checkerItem.price} onChange={e=>setCheckerItem(p=>({...p,price:e.target.value}))} placeholder="Preço (R$)" type="number" style={{...iBase,flex:1}} />
                  <input value={checkerItem.link} onChange={e=>setCheckerItem(p=>({...p,link:e.target.value}))} placeholder="Link" style={{...iBase,flex:2}} />
                </div>
              </div>
            )}
            <div style={{display:"flex",gap:4,marginBottom:20}}>
              {WISHLIST_CHECKER.map((_,i)=><div key={i} style={{flex:1,height:3,background:i<=checkerStep?P.accent:P.border,borderRadius:2,transition:"background 0.3s"}}/>)}
            </div>
            <div style={{background:P.accentBg,border:`1px solid ${P.borderHi}`,borderRadius:14,padding:20,marginBottom:20}}>
              <div style={{fontSize:10,color:P.accent,marginBottom:8}}>Pergunta {checkerStep+1} de {WISHLIST_CHECKER.length}</div>
              <div style={{fontSize:18,color:P.text,lineHeight:1.5}}>{WISHLIST_CHECKER[checkerStep].text}</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>answerChecker(WISHLIST_CHECKER[checkerStep].id,true)} style={{flex:1,background:P.surface,border:`1px solid ${P.border}`,color:P.text,borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Sim</button>
              <button onClick={()=>answerChecker(WISHLIST_CHECKER[checkerStep].id,false)} style={{flex:1,background:P.accent,border:"none",color:"#fff",borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Não</button>
            </div>
          </div>
        </div>
      )}

      {/* Desapego Modal */}
      {desapegoOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={()=>setDesapegoOpen(false)}>
          <div style={{background:P.surface,borderRadius:"20px 20px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:430}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>◌ Desapego por venda</div>
            <div style={{fontSize:17,color:P.text,marginBottom:16}}>Quanto você recebeu pela peça?</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{color:P.muted}}>R$</span>
              <input autoFocus value={desapegoValue} onChange={e=>setDesapegoValue(e.target.value)} placeholder="0" type="number" style={{flex:1,background:"none",border:"none",borderBottom:`2px solid ${P.accent}`,color:P.text,fontSize:34,padding:"4px 0",outline:"none",fontFamily:"'Georgia',serif"}}/>
            </div>
            {desapegoValue&&parseFloat(desapegoValue)>0&&<div style={{fontSize:13,color:P.accent,marginBottom:20}}>= +{Math.round(parseFloat(desapegoValue.replace(",","."))*0.2)} XP</div>}
            <button onClick={logDesapego} style={{width:"100%",background:P.accent,border:"none",color:"#fff",borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Registrar</button>
          </div>
        </div>
      )}

      {/* Spend Modal */}
      {spendOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={()=>setSpendOpen(false)}>
          <div style={{background:P.surface,borderRadius:"20px 20px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:430}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>Usar saldo de vales</div>
            <div style={{fontSize:13,color:P.green,marginBottom:16}}>Disponível: R$ {brlBalance.toFixed(0)}</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{color:P.muted}}>R$</span>
              <input autoFocus value={spendValue} onChange={e=>setSpendValue(e.target.value)} placeholder="0" type="number" style={{flex:1,background:"none",border:"none",borderBottom:`2px solid ${P.green}`,color:P.text,fontSize:34,padding:"4px 0",outline:"none",fontFamily:"'Georgia',serif"}}/>
            </div>
            <input value={spendNote} onChange={e=>setSpendNote(e.target.value)} placeholder="O que comprou? (opcional)" style={{...iBase,marginBottom:20}}/>
            <button onClick={logSpend} style={{width:"100%",background:P.green,border:"none",color:"#fff",borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Registrar gasto</button>
          </div>
        </div>
      )}

      {/* Budget Modal */}
      {budgetOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:"flex-end",zIndex:200}} onClick={()=>setBudgetOpen(false)}>
          <div style={{background:P.surface,borderRadius:"20px 20px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:430}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>Budget mensal</div>
            <div style={{fontSize:14,color:P.textDim,marginBottom:16}}>Quanto você pode gastar em roupas por mês (fora os vales)?</div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <span style={{color:P.muted}}>R$</span>
              <input autoFocus value={budgetInput} onChange={e=>setBudgetInput(e.target.value)} placeholder="0" type="number" style={{flex:1,background:"none",border:"none",borderBottom:`2px solid ${P.orange}`,color:P.text,fontSize:34,padding:"4px 0",outline:"none",fontFamily:"'Georgia',serif"}}/>
            </div>
            <button onClick={saveBudget} style={{width:"100%",background:P.orange,border:"none",color:"#fff",borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Salvar budget</button>
          </div>
        </div>
      )}

      {/* Confirm Bought */}
      {confirmBought&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}} onClick={()=>setConfirmBought(false)}>
          <div style={{background:P.surface,borderRadius:20,padding:28,maxWidth:300,textAlign:"center"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:28,marginBottom:12}}>◎</div>
            <div style={{fontSize:15,color:P.text,marginBottom:8}}>Comprou algo hoje?</div>
            <div style={{fontSize:12,color:P.textDim,lineHeight:1.6,marginBottom:20}}>Isso vai <strong style={{color:P.red}}>zerar seu streak</strong> de {streakDays} dias.</div>
            <button onClick={openNecessity} style={{width:"100%",background:P.accentBg,border:`1px solid ${P.borderHi}`,color:P.accent,borderRadius:10,padding:"11px",fontSize:13,cursor:"pointer",marginBottom:8}}>Foi necessidade → fazer ritual</button>
            <button onClick={confirmBoughtBreak} style={{width:"100%",background:P.redBg,border:`1px solid ${P.red}44`,color:P.red,borderRadius:10,padding:"11px",fontSize:13,cursor:"pointer",marginBottom:8}}>Comprei mesmo — zerar streak</button>
            <button onClick={()=>setConfirmBought(false)} style={{width:"100%",background:"none",border:"none",color:P.muted,fontSize:12,cursor:"pointer",padding:"8px"}}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Necessity Modal */}
      {necessityOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:"flex-end",zIndex:200}}>
          <div style={{background:P.surface,borderRadius:"20px 20px 0 0",padding:"28px 24px 44px",width:"100%",maxWidth:430}}>
            <div style={{fontSize:10,color:P.orange,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>◎ Ritual de necessidade</div>
            <div style={{display:"flex",gap:4,marginBottom:20}}>
              {NECESSITY_QUESTIONS.map((_,i)=><div key={i} style={{flex:1,height:3,background:i<=necessityStep?P.orange:P.border,borderRadius:2,transition:"background 0.3s"}}/>)}
            </div>
            <div style={{background:P.orangeBg,border:`1px solid ${P.orange}33`,borderRadius:14,padding:20,marginBottom:20}}>
              <div style={{fontSize:10,color:P.orange,marginBottom:8}}>Pergunta {necessityStep+1} de {NECESSITY_QUESTIONS.length}</div>
              <div style={{fontSize:17,color:P.text,lineHeight:1.5}}>{NECESSITY_QUESTIONS[necessityStep].text}</div>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>answerNecessity(NECESSITY_QUESTIONS[necessityStep].id,true)} style={{flex:1,background:P.surface,border:`1px solid ${P.border}`,color:P.text,borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Sim</button>
              <button onClick={()=>answerNecessity(NECESSITY_QUESTIONS[necessityStep].id,false)} style={{flex:1,background:P.orange,border:"none",color:"#fff",borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Não</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Finalize */}
      {confirmFinalize&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}} onClick={()=>setConfirmFinalize(false)}>
          <div style={{background:P.surface,borderRadius:20,padding:32,maxWidth:300,textAlign:"center"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:28,color:P.accent,marginBottom:12}}>✦</div>
            <div style={{fontSize:16,color:P.text,marginBottom:8}}>Finalizar o dia?</div>
            <div style={{fontSize:13,color:P.textDim,lineHeight:1.6,marginBottom:24}}>Você ganhou <strong style={{color:P.accent}}>+{dayXP} XP</strong> hoje.</div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setConfirmFinalize(false)} style={{flex:1,background:"none",border:`1px solid ${P.border}`,color:P.textDim,borderRadius:10,padding:"12px",fontSize:13,cursor:"pointer"}}>Voltar</button>
              <button onClick={finalizeDay} style={{flex:1,background:P.accent,border:"none",color:"#fff",borderRadius:10,padding:"12px",fontSize:13,cursor:"pointer"}}>Finalizar</button>
            </div>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {claimingReward&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}} onClick={()=>setClaimingReward(null)}>
          <div style={{background:P.surface,border:`1px solid ${P.borderHi}`,borderRadius:22,padding:36,textAlign:"center",maxWidth:300}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,marginBottom:10}}>RECOMPENSA DESBLOQUEADA</div>
            <div style={{fontSize:48,color:P.accent,fontStyle:"italic"}}>{claimingReward.label}</div>
            <div style={{fontSize:12,color:P.textDim,marginTop:20,lineHeight:1.7}}>Use com intenção. 🤍</div>
            <button onClick={()=>setClaimingReward(null)} style={{marginTop:24,background:P.accent,border:"none",color:"#fff",borderRadius:10,padding:"12px 36px",fontSize:13,cursor:"pointer"}}>Resgatar</button>
          </div>
        </div>
      )}

      {/* Phase Modal */}
      {showPhase&&(
        <div style={{position:"fixed",inset:0,background:"rgba(26,16,48,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:24}} onClick={()=>setShowPhase(false)}>
          <div style={{background:P.surface,border:`1px solid ${P.borderHi}`,borderRadius:22,padding:32,maxWidth:320,width:"100%"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,marginBottom:16}}>SUAS FASES</div>
            {PHASES.map((ph,i)=>{
              const reached=totalXP>=ph.minXP;
              const current=ph.name===phase.name;
              return(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<PHASES.length-1?`1px solid ${P.border}`:"none",opacity:reached?1:0.35}}>
                  <div style={{width:36,height:36,borderRadius:10,background:reached?ph.bg:P.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center",color:reached?ph.color:P.muted,fontSize:16}}>{ph.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:reached?ph.color:P.muted,display:"flex",alignItems:"center",gap:6}}>
                      {ph.name} {current&&<Chip color={ph.color} bg={ph.bg}>atual</Chip>}
                    </div>
                    <div style={{fontSize:11,color:P.muted}}>{ph.minXP} XP · {ph.desc}</div>
                  </div>
                </div>
              );
            })}
            <button onClick={()=>setShowPhase(false)} style={{marginTop:20,width:"100%",background:P.accent,border:"none",color:"#fff",borderRadius:10,padding:"12px",fontSize:13,cursor:"pointer"}}>Fechar</button>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{background:P.surface,borderBottom:`1px solid ${P.border}`,padding:"24px 24px 18px"}}>
        <div style={{fontSize:10,letterSpacing:4,color:P.muted,textTransform:"uppercase",marginBottom:8}}>
          armário <span style={{color:P.accent}}>challenge</span>
        </div>

        {/* Phase badge + XP */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <button onClick={()=>setShowPhase(true)} style={{background:phase.bg,border:`1px solid ${phase.color}44`,borderRadius:10,padding:"5px 12px",display:"flex",alignItems:"center",gap:6,cursor:"pointer",marginBottom:8}}>
              <span style={{color:phase.color,fontSize:13}}>{phase.icon}</span>
              <span style={{fontSize:12,color:phase.color}}>{phase.name}</span>
              {nextPhase&&<span style={{fontSize:10,color:P.muted}}>→ {nextPhase.name} em {nextPhase.minXP-totalXP} XP</span>}
            </button>
            <div style={{fontSize:44,fontStyle:"italic",color:P.text,lineHeight:1,letterSpacing:-2}}>
              {totalXP}<span style={{fontSize:16,color:P.muted,fontStyle:"normal",marginLeft:6}}>XP</span>
            </div>
            {hasPenalty&&<div style={{fontSize:11,color:P.red,marginTop:4}}>⚠ {penaltyDays} dias sem registrar — não perca o ritmo!</div>}
          </div>

          {/* BRL + Budget */}
          <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"flex-end"}}>
            <div style={{background:brlBalance>0?P.goldBg:P.surfaceAlt,border:`1px solid ${brlBalance>0?"#e8c96044":P.border}`,borderRadius:12,padding:"8px 14px",textAlign:"center"}}>
              <div style={{fontSize:9,color:brlBalance>0?P.gold:P.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:1}}>saldo vales</div>
              <div style={{fontSize:20,color:brlBalance>0?P.gold:P.muted,fontStyle:"italic"}}>{brlBalance>0?`R$ ${brlBalance.toFixed(0)}`:"—"}</div>
              {brlBalance>0&&<button onClick={()=>setSpendOpen(true)} style={{background:"none",border:"none",color:P.gold,fontSize:9,cursor:"pointer",padding:0,textDecoration:"underline"}}>usar vale</button>}
            </div>
            <div onClick={()=>setBudgetOpen(true)} style={{background:budget>0?P.orangeBg:P.surfaceAlt,border:`1px solid ${budget>0?P.orange+"44":P.border}`,borderRadius:12,padding:"8px 14px",textAlign:"center",cursor:"pointer"}}>
              <div style={{fontSize:9,color:budget>0?P.orange:P.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:1}}>budget mensal</div>
              <div style={{fontSize:20,color:budget>0?P.orange:P.muted,fontStyle:"italic"}}>{budget>0?`R$ ${budgetLeft.toFixed(0)}`:"definir"}</div>
              {budget>0&&<div style={{fontSize:9,color:P.muted}}>de R$ {budget.toFixed(0)}</div>}
            </div>
          </div>
        </div>

        {/* Post streak */}
        {postStreak>0&&(
          <div style={{background:P.pinkBg,border:`1px solid ${P.pink}33`,borderRadius:10,padding:"8px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:P.pink,fontSize:14}}>◉</span>
            <span style={{fontSize:12,color:P.pink}}>Streak de looks postados: <strong>{postStreak} dias</strong></span>
          </div>
        )}

        {/* XP progress */}
        <div style={{marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:P.muted,marginBottom:5}}>
            <span>próxima recompensa</span>
            <span style={{color:P.accent}}>{nextReward.label} · {nextReward.xp} XP</span>
          </div>
          <div style={{height:5,background:P.surfaceAlt,borderRadius:3,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${P.accentHi},${P.accent})`,borderRadius:3,transition:"width 0.8s ease"}}/>
          </div>
        </div>

        {/* Reward chips */}
        <div style={{display:"flex",gap:8}}>
          {REWARDS.map(r=>{
            const earned=totalXP>=r.xp;
            return(
              <div key={r.xp} onClick={()=>earned&&setClaimingReward(r)} style={{flex:1,background:earned?P.accentBg:P.surfaceAlt,border:`1px solid ${earned?P.borderHi:P.border}`,borderRadius:10,padding:"8px 4px",textAlign:"center",cursor:earned?"pointer":"default",opacity:earned?1:0.45,transition:"all 0.3s"}}>
                <div style={{fontSize:12,color:earned?P.accent:P.muted,fontWeight:"bold"}}>{r.label}</div>
                <div style={{fontSize:9,color:P.muted,marginTop:1}}>{r.xp} XP</div>
                {earned&&<div style={{fontSize:9,color:P.accent,marginTop:1}}>✦ toque</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{display:"flex",background:P.surface,borderBottom:`1px solid ${P.border}`,padding:"0 8px",overflowX:"auto"}}>
        {[{id:"home",label:"Hoje"},{id:"streak",label:"Desafio"},{id:"history",label:"Histórico"},{id:"wishlist",label:"Wishlist"},{id:"rules",label:"Regras"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",color:tab===t.id?P.accent:P.muted,fontSize:12,padding:"12px 12px",cursor:"pointer",whiteSpace:"nowrap",borderBottom:tab===t.id?`2px solid ${P.accent}`:"2px solid transparent",marginBottom:-1}}>{t.label}</button>
        ))}
      </div>

      {/* ══ HOME ══ */}
      {tab==="home"&&(
        <div style={{padding:"20px 24px"}}>
          {/* Day strip */}
          <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {days7.map(day=>{
              const d=new Date(day+"T12:00:00");
              const sel=day===selectedDay;
              const fin=finalized.includes(day);
              const hasLog=(logs[day]||[]).length>0;
              return(
                <button key={day} onClick={()=>setSelectedDay(day)} style={{minWidth:46,padding:"9px 4px",background:sel?P.accent:fin?P.accentBg:hasLog?"#f3f0fb":P.surface,border:`1px solid ${sel?P.accent:fin?P.borderHi:P.border}`,borderRadius:10,cursor:"pointer",textAlign:"center",transition:"all 0.2s"}}>
                  <div style={{fontSize:9,color:sel?"#fff":P.muted}}>{DAYS_OF_WEEK[d.getDay()]}</div>
                  <div style={{fontSize:14,color:sel?"#fff":P.text,marginTop:2}}>{d.getDate()}</div>
                  {fin&&!sel&&<div style={{fontSize:8,color:P.accent,marginTop:2}}>✦</div>}
                  {hasLog&&!fin&&!sel&&<div style={{width:4,height:4,background:P.accentHi,borderRadius:"50%",margin:"4px auto 0"}}/>}
                </button>
              );
            })}
          </div>

          {todayFinalized&&selectedDay===todayKey?(
            <div style={{background:P.accentBg,border:`1px solid ${P.borderHi}`,borderRadius:14,padding:"14px 20px",marginBottom:16,textAlign:"center"}}>
              <div style={{fontSize:14,color:P.accent}}>✦ Dia finalizado</div>
              <div style={{fontSize:12,color:P.textDim,marginTop:4}}>Edite no Histórico se precisar</div>
            </div>
          ):(
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>
              {selectedDay===todayKey?"Registre o dia":`Editando · ${formatDate(selectedDay)}`}
            </div>
          )}

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {FIXED_ACTIONS.map(action=>{
              const done=currentLog.find(l=>l.id===action.id);
              return(
                <button key={action.id} onClick={()=>logAction(action)} style={{background:done?P.accentBg:P.surface,border:`1px solid ${done?P.borderHi:P.border}`,borderRadius:14,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",transition:"all 0.18s",textAlign:"left"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <IconBox icon={action.icon} active={!!done}/>
                    <div>
                      <div style={{fontSize:13,color:done?P.accent:P.text}}>{action.label}</div>
                      <div style={{fontSize:10,color:P.muted,marginTop:2}}>{done?`às ${done.time}`:action.desc}</div>
                    </div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}>
                    <div style={{fontSize:14,color:done?P.accent:P.muted,fontWeight:"bold"}}>+{action.xp}</div>
                    <div style={{fontSize:9,color:P.muted}}>XP</div>
                  </div>
                </button>
              );
            })}

            {/* Desapego */}
            <button onClick={()=>setDesapegoOpen(true)} style={{background:P.surface,border:`1px solid ${P.border}`,borderRadius:14,padding:"13px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",textAlign:"left"}}>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <IconBox icon="◌" active={false}/>
                <div><div style={{fontSize:13,color:P.text}}>Desapeguei por venda</div><div style={{fontSize:10,color:P.muted,marginTop:2}}>20% do valor em XP</div></div>
              </div>
              <div style={{fontSize:12,color:P.muted}}>+ valor</div>
            </button>

            {currentLog.filter(l=>l.id?.startsWith("desapego_")||l.id?.startsWith("necessity_")).map(l=>(
              <div key={l.id} style={{background:l.id?.startsWith("necessity_")?P.orangeBg:P.accentBg,border:`1px solid ${l.id?.startsWith("necessity_")?P.orange+"44":P.borderHi}`,borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <IconBox icon={l.icon||"◌"} active={true} color={l.id?.startsWith("necessity_")?P.orange:P.accent}/>
                  <div><div style={{fontSize:13,color:l.id?.startsWith("necessity_")?P.orange:P.accent}}>{l.label}</div><div style={{fontSize:10,color:P.muted}}>{l.time}</div></div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  {l.xp>0&&<div style={{textAlign:"right"}}><div style={{fontSize:14,color:P.accent,fontWeight:"bold"}}>+{l.xp}</div><div style={{fontSize:9,color:P.muted}}>XP</div></div>}
                  <button onClick={()=>removeLog(selectedDay,l.id)} style={{background:"none",border:"none",color:P.muted,cursor:"pointer",fontSize:18}}>×</button>
                </div>
              </div>
            ))}
          </div>

          {dayXP>0&&(
            <div style={{marginTop:16,padding:"16px 20px",background:P.surface,borderRadius:14,border:`1px solid ${P.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:10,color:P.muted,marginBottom:2}}>XP do dia</div>
                <div style={{fontSize:26,color:P.accent,fontStyle:"italic"}}>+{dayXP}</div>
              </div>
              {!todayFinalized&&selectedDay===todayKey&&(
                <button onClick={()=>setConfirmFinalize(true)} style={{background:P.accent,border:"none",color:"#fff",borderRadius:12,padding:"10px 18px",fontSize:13,cursor:"pointer"}}>Finalizar dia ✦</button>
              )}
            </div>
          )}
          {dayXP===0&&!todayFinalized&&selectedDay===todayKey&&(
            <div style={{marginTop:16,padding:"14px 20px",background:P.surface,borderRadius:14,border:`1px solid ${P.border}`,textAlign:"center"}}>
              <div style={{fontSize:12,color:P.muted}}>Registre pelo menos uma ação para finalizar o dia</div>
            </div>
          )}
        </div>
      )}

      {/* ══ STREAK / DESAFIO ══ */}
      {tab==="streak"&&(
        <div style={{padding:"20px 24px"}}>
          <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Desafio</div>
          <div style={{fontSize:24,fontStyle:"italic",color:P.text,marginBottom:20,lineHeight:1.3}}>Dias sem<br/>compras</div>

          <div style={{background:streakDays>=30?P.accentBg:P.surface,border:`1px solid ${streakDays>=30?P.borderHi:P.border}`,borderRadius:20,padding:"28px 24px",textAlign:"center",marginBottom:16}}>
            <div style={{fontSize:72,fontStyle:"italic",color:P.accent,lineHeight:1,letterSpacing:-3}}>{streakDays}</div>
            <div style={{fontSize:14,color:P.textDim,marginTop:4}}>dias consecutivos</div>
            <div style={{fontSize:12,color:P.muted,marginTop:4}}>desde {formatDate(streakStart)}</div>
            <div style={{marginTop:20}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:P.muted,marginBottom:6}}>
                <span>{lastMilestone}d</span>
                <span style={{color:P.accent}}>próximo: {nextMilestone} dias</span>
              </div>
              <div style={{height:6,background:P.surfaceAlt,borderRadius:3,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${streakPct}%`,background:`linear-gradient(90deg,${P.accentHi},${P.accent})`,borderRadius:3,transition:"width 0.8s ease"}}/>
              </div>
              <div style={{fontSize:11,color:P.muted,marginTop:6}}>faltam {Math.max(0,nextMilestone-streakDays)} dias · +1.000 XP ao atingir</div>
            </div>
          </div>

          {newMilestone&&(
            <div style={{background:P.goldBg,border:`1px solid #e8c96066`,borderRadius:16,padding:"18px 20px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div>
                <div style={{fontSize:13,color:P.gold}}>✦ {newMilestone} dias alcançados!</div>
                <div style={{fontSize:12,color:P.muted,marginTop:2}}>+1.000 XP disponível</div>
              </div>
              <button onClick={()=>claimMilestone(newMilestone)} style={{background:P.gold,border:"none",color:"#fff",borderRadius:10,padding:"10px 16px",fontSize:13,cursor:"pointer"}}>Resgatar</button>
            </div>
          )}

          <div style={{background:P.surface,border:`1px solid ${P.border}`,borderRadius:16,padding:"18px 20px",marginBottom:16}}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Marcos</div>
            {STREAK_MILESTONES.map((m,i)=>{
              const reached=streakDays>=m;
              const claimed=claimedMilestones.includes(m);
              return(
                <div key={m} style={{display:"flex",alignItems:"center",gap:12,paddingBottom:12,marginBottom:12,borderBottom:i<STREAK_MILESTONES.length-1?`1px solid ${P.border}`:"none"}}>
                  <div style={{width:36,height:36,borderRadius:10,background:reached?P.accentBg:P.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center",color:reached?P.accent:P.muted,fontSize:13,flexShrink:0,opacity:reached?1:0.4}}>
                    {claimed?"✦":reached?"◈":"◇"}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,color:reached?P.text:P.muted}}>{m} dias</div>
                    <div style={{fontSize:10,color:P.muted}}>+1.000 XP = R$ 200 em vales</div>
                  </div>
                  {claimed&&<Chip color={P.accent} bg={P.accentBg}>resgatado</Chip>}
                  {reached&&!claimed&&<Chip color={P.gold} bg={P.goldBg}>disponível</Chip>}
                </div>
              );
            })}
          </div>

          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setConfirmBought(true)} style={{flex:1,background:P.redBg,border:`1px solid ${P.red}33`,color:P.red,borderRadius:14,padding:"14px",fontSize:13,cursor:"pointer"}}>Comprei algo hoje</button>
            <button onClick={openNecessity} style={{flex:1,background:P.orangeBg,border:`1px solid ${P.orange}33`,color:P.orange,borderRadius:14,padding:"14px",fontSize:13,cursor:"pointer"}}>◎ Era necessário</button>
          </div>
        </div>
      )}

      {/* ══ HISTORY ══ */}
      {tab==="history"&&(
        <div style={{padding:"20px 24px"}}>
          <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Histórico</div>
          {days7.slice().reverse().map(day=>{
            const dl=logs[day]||[];
            const dxp=dl.reduce((s,a)=>s+a.xp,0);
            const fin=finalized.includes(day);
            const isEditing=editingDay===day;
            const favLook=dl.find(l=>l.id==="fav_look");
            return(
              <div key={day} style={{background:P.surface,border:`1px solid ${fin?P.borderHi:P.border}`,borderRadius:14,padding:16,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:dl.length?10:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {fin&&<span style={{color:P.accent,fontSize:12}}>✦</span>}
                    <span style={{fontSize:13,color:dl.length?P.text:P.muted}}>{formatDate(day)}</span>
                    {fin&&<Chip color={P.accent} bg={P.accentBg}>finalizado</Chip>}
                    {favLook&&<span style={{fontSize:14,color:P.pink}}>♡</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    {dl.length>0&&<span style={{fontSize:14,color:P.accent}}>+{dxp} XP</span>}
                    <button onClick={()=>setEditingDay(isEditing?null:day)} style={{background:"none",border:`1px solid ${P.border}`,color:P.muted,borderRadius:8,padding:"4px 10px",fontSize:11,cursor:"pointer"}}>{isEditing?"fechar":"editar"}</button>
                  </div>
                </div>
                {dl.length===0&&<div style={{fontSize:12,color:P.border}}>sem registros</div>}
                {dl.map(l=>(
                  <div key={l.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6,padding:"6px 0",borderBottom:`1px solid ${P.border}`}}>
                    <div style={{width:28,height:28,borderRadius:8,background:l.id==="fav_look"?P.pinkBg:P.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center",color:l.id==="fav_look"?P.pink:P.muted,fontSize:13,flexShrink:0}}>{l.icon||"◇"}</div>
                    <span style={{fontSize:12,color:P.textDim,flex:1}}>{l.label}</span>
                    {l.xp>0&&<span style={{fontSize:11,color:P.accent}}>+{l.xp} XP</span>}
                    {isEditing&&<button onClick={()=>removeLog(day,l.id)} style={{background:"none",border:"none",color:P.red,cursor:"pointer",fontSize:16}}>×</button>}
                  </div>
                ))}
                {isEditing&&(
                  <div style={{marginTop:10}}>
                    <div style={{fontSize:10,color:P.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>Adicionar</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {FIXED_ACTIONS.filter(a=>!dl.find(l=>l.id===a.id)).map(a=>(
                        <button key={a.id} onClick={()=>setLogs(p=>({...p,[day]:[...(p[day]||[]),{...a,time:"—"}]}))} style={{background:P.surfaceAlt,border:`1px solid ${P.border}`,borderRadius:8,padding:"6px 10px",fontSize:11,color:P.textDim,cursor:"pointer"}}>
                          {a.icon} {a.label} <span style={{color:P.accent}}>+{a.xp}</span>
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
        <div style={{padding:"20px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase"}}>Wishlist</div>
            {budget>0&&(
              <div style={{fontSize:12,color:budgetLeft>0?P.orange:P.red}}>
                Budget restante: R$ {budgetLeft.toFixed(0)}
              </div>
            )}
          </div>

          {/* Checker CTA */}
          <button onClick={openChecker} style={{width:"100%",background:P.accentBg,border:`1px solid ${P.borderHi}`,borderRadius:14,padding:"16px",marginBottom:20,cursor:"pointer",textAlign:"center"}}>
            <div style={{fontSize:14,color:P.accent}}>◈ Vai comprar algo?</div>
            <div style={{fontSize:12,color:P.textDim,marginTop:4}}>Passe pelo checker antes de adicionar</div>
          </button>

          {wishlist.length===0&&<div style={{textAlign:"center",color:P.border,fontSize:13,padding:40}}>Wishlist vazia ◇</div>}
          {wishlist.map(item=>{
            const days=daysOnWishlist(item);
            const canBuy=days>=7&&item.ritualDone&&item.approved;
            const readyForRitual=days>=7&&!item.ritualDone;
            return(
              <div key={item.id} style={{background:P.surface,border:`1px solid ${canBuy?P.borderHi:P.border}`,borderRadius:14,padding:16,marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:14,color:P.text}}>{item.name}</div>
                    {item.price&&<div style={{fontSize:12,color:P.accent,marginTop:2}}>{item.price}</div>}
                  </div>
                  <button onClick={()=>setWishlist(p=>p.filter(w=>w.id!==item.id))} style={{background:"none",border:"none",color:P.muted,cursor:"pointer",fontSize:18}}>×</button>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10}}>
                  <Chip color={days>=7?P.green:P.muted} bg={days>=7?P.greenBg:P.surfaceAlt}>{days}d na wishlist {days<7?`· faltam ${7-days}d`:"✓"}</Chip>
                  {item.ritualDone&&<Chip color={item.approved?P.green:P.red} bg={item.approved?P.greenBg:P.redBg}>{item.approved?"✦ ritual ok":"◌ reflita mais"}</Chip>}
                </div>
                {readyForRitual&&<button onClick={()=>startRitual(item)} style={{marginTop:12,width:"100%",background:"none",border:`1px solid ${P.accent}`,color:P.accent,borderRadius:10,padding:"10px",fontSize:12,cursor:"pointer"}}>Fazer ritual de compra →</button>}
                {canBuy&&<div style={{marginTop:12,background:P.greenBg,borderRadius:10,padding:"10px",textAlign:"center",fontSize:13,color:P.green}}>✦ Liberado para comprar!</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* ══ RULES ══ */}
      {tab==="rules"&&(
        <div style={{padding:"20px 24px"}}>
          <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Manifesto</div>
          <div style={{fontSize:26,fontStyle:"italic",color:P.text,marginBottom:24,lineHeight:1.3}}>As leis do<br/>meu armário</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {RULES.map((r,i)=>(
              <div key={i} style={{background:P.surface,border:`1px solid ${P.border}`,borderRadius:14,padding:"16px 18px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <div style={{width:30,height:30,borderRadius:8,background:P.accentBg,display:"flex",alignItems:"center",justifyContent:"center",color:P.accent,fontSize:14,flexShrink:0}}>{r.icon}</div>
                  <span style={{fontSize:13,color:P.text}}>{r.title}</span>
                </div>
                <div style={{fontSize:12,color:P.textDim,lineHeight:1.7,paddingLeft:40}}>{r.body}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:20,background:P.surface,border:`1px solid ${P.border}`,borderRadius:14,padding:"16px 18px"}}>
            <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Tabela de XP</div>
            {[...FIXED_ACTIONS,{icon:"◌",label:"Desapego por venda",xp:"20% do valor"},{icon:"◎",label:"Streak 30 dias",xp:"+1.000 por marco"}].map((a,i,arr)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:10,marginBottom:10,borderBottom:i<arr.length-1?`1px solid ${P.border}`:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:28,height:28,borderRadius:8,background:P.surfaceAlt,display:"flex",alignItems:"center",justifyContent:"center",color:P.muted,fontSize:13}}>{a.icon}</div>
                  <span style={{fontSize:12,color:P.textDim}}>{a.label}</span>
                </div>
                <span style={{fontSize:13,color:P.accent,fontWeight:"bold"}}>{typeof a.xp==="number"?`+${a.xp}`:a.xp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ RITUAL ══ */}
      {tab==="ritual"&&ritual&&(
        <div style={{padding:"20px 24px"}}>
          <div style={{fontSize:10,color:P.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>◈ Ritual de compra</div>
          <div style={{fontSize:18,color:P.text,fontStyle:"italic",marginBottom:24}}>{ritual.name}</div>
          <div style={{display:"flex",gap:4,marginBottom:28}}>
            {RITUAL_QUESTIONS.map((_,i)=><div key={i} style={{flex:1,height:3,background:i<=ritualStep?P.accent:P.border,borderRadius:2,transition:"background 0.3s"}}/>)}
          </div>
          <div style={{background:P.surface,border:`1px solid ${P.border}`,borderRadius:16,padding:24,marginBottom:20}}>
            <div style={{fontSize:10,color:P.muted,marginBottom:10}}>Pergunta {ritualStep+1} de {RITUAL_QUESTIONS.length}</div>
            <div style={{fontSize:18,color:P.text,lineHeight:1.6}}>{RITUAL_QUESTIONS[ritualStep].text}</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>answerRitual(RITUAL_QUESTIONS[ritualStep].id,true)} style={{flex:1,background:P.surface,border:`1px solid ${P.border}`,color:P.text,borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Sim</button>
            <button onClick={()=>answerRitual(RITUAL_QUESTIONS[ritualStep].id,false)} style={{flex:1,background:P.accent,border:"none",color:"#fff",borderRadius:12,padding:"14px",fontSize:14,cursor:"pointer"}}>Não</button>
          </div>
          <button onClick={()=>{setTab("wishlist");setRitual(null);}} style={{marginTop:16,background:"none",border:"none",color:P.muted,fontSize:12,cursor:"pointer",width:"100%"}}>← Voltar</button>
        </div>
      )}

      {/* ── Bottom nav ── */}
      <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:P.surface,borderTop:`1px solid ${P.border}`,display:"flex",justifyContent:"space-around",padding:"10px 0 14px"}}>
        {[{id:"home",icon:"◇",label:"Hoje"},{id:"streak",icon:"◎",label:"Desafio"},{id:"history",icon:"◉",label:"Histórico"},{id:"wishlist",icon:"◈",label:"Wishlist"},{id:"rules",icon:"▲",label:"Regras"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{background:"none",border:"none",color:tab===t.id?P.accent:P.muted,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"0 6px"}}>
            <span style={{fontSize:17}}>{t.icon}</span>
            <span style={{fontSize:9,letterSpacing:0.5}}>{t.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateX(-50%) translateY(-8px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
        *{-webkit-tap-highlight-color:transparent;}
        input::placeholder{color:#bbb0d0;}
        input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;}
        ::-webkit-scrollbar{display:none;}
        button:active{opacity:0.82;}
      `}</style>
    </div>
  );
}
