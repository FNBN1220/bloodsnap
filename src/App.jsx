import { useState, useEffect, useRef } from "react";
import { Home, Calendar, Settings, Plus, X, TrendingUp, Clock, BarChart3, Camera, Download, Users, Target, AlertTriangle, Lightbulb, ChevronLeft, ChevronRight, Droplets, FileText, Copy, Bell, Sun, Moon, Activity, Zap, Search, CheckCircle, BarChart2, Sunrise, Heart, Pill, Trash2, Mic } from "lucide-react";

const LOGO = "data:image/png;base64,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";

/* ─── Helpers ─── */
/* ─── Blood glucose ranges by measurement type (대한당뇨병학회 기준) ─── */
const RANGES = {
  "식전": { low: 70, normal: 80, warn: 130, high: 160, label: "식전/공복" },
  "식후": { low: 70, normal: 90, warn: 180, high: 200, label: "식후 2시간" },
  "취침": { low: 70, normal: 100, warn: 140, high: 160, label: "취침 전" },
};
const getRangeType = (type) => {
  if (!type) return RANGES["식전"];
  if (type.includes("식후") || type.includes("간식")) return RANGES["식후"];
  if (type.includes("취침")) return RANGES["취침"];
  return RANGES["식전"];
};
const getLevel = (v, type) => {
  const r = getRangeType(type);
  if (v < r.low) return { label: "저혈당", color: "#5B8DEF", bg: "rgba(91,141,239,0.08)", ring: "rgba(91,141,239,0.2)" };
  if (v <= r.normal) return { label: "양호", color: "#00C48C", bg: "rgba(0,196,140,0.06)", ring: "rgba(0,196,140,0.18)" };
  if (v <= r.warn) return { label: "정상", color: "#00C48C", bg: "rgba(0,196,140,0.06)", ring: "rgba(0,196,140,0.18)" };
  if (v <= r.high) return { label: "주의", color: "#FFB340", bg: "rgba(255,179,64,0.07)", ring: "rgba(255,179,64,0.2)" };
  return { label: "위험", color: "#EF4444", bg: "rgba(239,68,68,0.07)", ring: "rgba(239,68,68,0.25)" };
};
const fmtDate = (s) => { const d = new Date(s); return (d.getMonth()+1)+"."+d.getDate()+" "+["일","월","화","수","목","금","토"][d.getDay()]; };
const todayISO = () => { const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };
const nowTime = () => new Date().toTimeString().slice(0,5);
const uid = () => Date.now().toString(36)+Math.random().toString(36).slice(2,5);

/* ─── Demo Data ─── */
const getDemoData = () => [];

/* ─── AI Food Recognition ─── */
const analyzeFood = async (base64) => {
  try {
    const mt = base64.startsWith("data:image/png")?"image/png":"image/jpeg";
    const raw = base64.split(",")[1];
    const res = await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({image:raw, media_type:mt, mode:"food"})});
    return await res.json();
  } catch(e) { return null; }
};

/* ─── AI Diet Recommendation ─── */
const getAIDiet = async (records) => {
  try {
    const recent = records.slice(-60);
    if(!recent.length) return null;
    const avgGlucose = Math.round(recent.reduce((s,r)=>s+r.glucose,0)/recent.length);
    // Detailed stats
    const preM=recent.filter(r=>r.type&&r.type.includes("식전"));
    const postM=recent.filter(r=>r.type&&r.type.includes("식후"));
    const avgPre=preM.length?Math.round(preM.reduce((s,r)=>s+r.glucose,0)/preM.length):null;
    const avgPost=postM.length?Math.round(postM.reduce((s,r)=>s+r.glucose,0)/postM.length):null;
    // Foods that raised blood sugar
    const highFoods={};const goodFoods={};
    recent.filter(r=>r.food&&r.glucose>160).forEach(r=>{highFoods[r.food]=(highFoods[r.food]||0)+1;});
    recent.filter(r=>r.food&&r.type&&r.type.includes("식후")&&r.glucose<=140).forEach(r=>{goodFoods[r.food]=(goodFoods[r.food]||0)+1;});
    const topBad=Object.entries(highFoods).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,c])=>n+"("+c+"회)").join(", ");
    const topGood=Object.entries(goodFoods).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([n,c])=>n+"("+c+"회)").join(", ");
    // Spike patterns
    const spikes={};
    ["아침","점심","저녁"].forEach(meal=>{const posts=recent.filter(r=>r.type===meal+" 식후");const pres=recent.filter(r=>r.type===meal+" 식전");
      if(posts.length&&pres.length){const avgP=Math.round(posts.reduce((s,r)=>s+r.glucose,0)/posts.length);const avgR=Math.round(pres.reduce((s,r)=>s+r.glucose,0)/pres.length);spikes[meal]={post:avgP,pre:avgR,delta:avgP-avgR};}});
    const res = await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({mode:"diet", avgGlucose, avgPre, avgPost, topBad, topGood, spikes:JSON.stringify(spikes)})});
    return await res.json();
  } catch(e) { return null; }
};

/* ─── Components ─── */
const C = { // Colors
  pri: "#38BDF8", priD: "#0284C7", priDD: "#082F49",
  bg: "#E8F4FD", card: "#F0F7FC", cardH: "#DCE9F5",
  txt: "#1a1a2e", txtL: "#64748b", txtLL: "#94a3b8", txtLLL: "#b0b8c9",
  border: "#C5DDF0", inputBg: "#EDF5FC",
};

function GoalRing({current,goal}) {
  const pct=current?Math.min(100,Math.round(current<=goal?100:(goal/current)*100)):0;
  const ok=current&&current<=goal;const r=36,circ=2*Math.PI*r,offset=circ-(pct/100)*circ;
  const color=ok?"#00C48C":"#FF6B6B";
  return (<div style={{position:"relative",width:84,height:84,flexShrink:0}}>
    <svg width={84} height={84} style={{transform:"rotate(-90deg)"}}>
      <circle cx={42} cy={42} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7"/>
      <circle cx={42} cy={42} r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}/>
    </svg>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontSize:18,fontWeight:800,color:"#fff",fontFamily:"monospace"}}>{current||"—"}</div>
      <div style={{fontSize:7,color:"rgba(255,255,255,0.5)",fontWeight:600}}>mg/dL</div>
    </div>
  </div>);
}

function Chart({records}) {
  const arr=[];const today=new Date();
  for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);const ds=d.toISOString().split("T")[0];
    const dr=records.filter(r=>r.date===ds);const avg=dr.length?Math.round(dr.reduce((s,r)=>s+r.glucose,0)/dr.length):null;
    const mx=dr.length?Math.max(...dr.map(r=>r.glucose)):null;const mn=dr.length?Math.min(...dr.map(r=>r.glucose)):null;
    arr.push({avg,mx,mn,day:(d.getMonth()+1)+"."+d.getDate()});}
  const W=340,H=185,PL=34,PR=12,PT=18,PB=28,cW=W-PL-PR,cH=H-PT-PB;
  const x=i=>PL+(i/6)*cW,y=v=>PT+cH-((v-60)/170)*cH;
  const valid=arr.map((d,i)=>d.avg!==null?[x(i),y(d.avg)]:null).filter(Boolean);
  const line=valid.map(p=>p.join(",")).join(" L");
  return(<svg viewBox={"0 0 "+W+" "+H} style={{width:"100%",height:"auto",display:"block"}}>
    <defs><linearGradient id="aG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.pri} stopOpacity="0.2"/><stop offset="100%" stopColor={C.pri} stopOpacity="0"/></linearGradient></defs>
    {[80,100,126,160,200].map(v=><g key={v}><line x1={PL} y1={y(v)} x2={W-PR} y2={y(v)} stroke={v===126?"rgba(255,107,107,0.25)":"rgba(0,0,0,0.04)"} strokeWidth={0.8} strokeDasharray={v===126?"4,4":"none"}/><text x={PL-5} y={y(v)+3} textAnchor="end" fill={C.txtLLL} fontSize="7" fontFamily="monospace">{v}</text></g>)}
    {arr.map((d,i)=>d.mx!==null?<rect key={"r"+i} x={x(i)-4} y={y(d.mx)} width="8" height={Math.max(3,y(d.mn)-y(d.mx))} rx="4" fill={C.pri} opacity="0.08"/>:null)}
    {valid.length>1&&<><path d={"M"+line+" L"+valid[valid.length-1][0]+","+(PT+cH)+" L"+valid[0][0]+","+(PT+cH)+" Z"} fill="url(#aG)"/><path d={"M"+line} fill="none" stroke={C.pri} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></>}
    {arr.map((d,i)=>d.avg!==null?<g key={"d"+i}><circle cx={x(i)} cy={y(d.avg)} r={i===6?6:4} fill="#fff" stroke={C.pri} strokeWidth={i===6?3:2}/><text x={x(i)} y={y(d.avg)-10} textAnchor="middle" fill={C.priD} fontSize={i===6?"9":"7.5"} fontWeight="700" fontFamily="monospace">{d.avg}</text></g>:null)}
    {arr.map((d,i)=><text key={"l"+i} x={x(i)} y={H-5} textAnchor="middle" fill={i===6?C.priD:C.txtLLL} fontSize="8" fontWeight={i===6?"700":"400"}>{d.day}</text>)}
  </svg>);
}

function CalendarView({records,selectedDate,onSelect}) {
  const [vd,setVd]=useState(new Date());
  const yr=vd.getFullYear(),mo=vd.getMonth(),fd=new Date(yr,mo,1).getDay(),dim=new Date(yr,mo+1,0).getDate(),td=todayISO();
  const cells=[];for(let i=0;i<fd;i++)cells.push(null);for(let d=1;d<=dim;d++)cells.push(d);
  const ds=d=>yr+"-"+String(mo+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
  return(<div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <button onClick={()=>setVd(new Date(yr,mo-1,1))} style={{background:C.cardH,border:"none",width:34,height:34,borderRadius:10,cursor:"pointer",color:C.txtL,display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronLeft size={18}/></button>
      <div style={{fontWeight:800,fontSize:17,color:C.txt}}>{yr}년 {mo+1}월</div>
      <button onClick={()=>setVd(new Date(yr,mo+1,1))} style={{background:C.cardH,border:"none",width:34,height:34,borderRadius:10,cursor:"pointer",color:C.txtL,display:"flex",alignItems:"center",justifyContent:"center"}}><ChevronRight size={18}/></button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,textAlign:"center",marginBottom:8}}>
      {["일","월","화","수","목","금","토"].map(d=><div key={d} style={{fontSize:10.5,fontWeight:600,color:d==="일"?"#FF6B6B":d==="토"?"#5B8DEF":C.txtLLL,padding:"4px 0"}}>{d}</div>)}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
      {cells.map((d,i)=>{if(!d)return<div key={i}/>;const s=ds(d);const dr=records.filter(r=>r.date===s);const avg=dr.length?Math.round(dr.reduce((a,r)=>a+r.glucose,0)/dr.length):null;const lv=avg?getLevel(avg):null;const isT=s===td,isS=s===selectedDate;
        return(<button key={i} onClick={()=>onSelect(s)} style={{width:"100%",aspectRatio:"1",borderRadius:12,border:isS?"2px solid "+C.pri:isT?"2px solid rgba(56,189,248,0.3)":"1.5px solid transparent",background:isS?"rgba(56,189,248,0.08)":lv?lv.bg:C.card,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:1,padding:0}}>
          <span style={{fontSize:11,fontWeight:isT||isS?700:500,color:isT?C.pri:C.txt}}>{d}</span>
          {avg?<span style={{fontSize:8,fontWeight:700,color:lv.color,fontFamily:"monospace"}}>{avg}</span>:<span style={{fontSize:7,color:"#d1d5db"}}>—</span>}
        </button>);})}
    </div>
  </div>);
}

/* ─── MAIN APP ─── */
export default function App() {
  const loadState=(key,fallback)=>{try{const s=localStorage.getItem("bs_"+key);return s?JSON.parse(s):fallback;}catch{return fallback;}};
  const [records,setRecords]=useState(()=>loadState("records",[]));
  const [tab,setTab]=useState("home");
  const [modal,setModal]=useState(false);
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [form,setForm]=useState({glucose:"",type:"아침 식전",food:"",photos:[]});
  const [previews,setPreviews]=useState([]);
  const [splash,setSplash]=useState(true);
  const [analyzing,setAnalyzing]=useState(false);
  const [aiResult,setAiResult]=useState(null);
  const defaultGoals={"아침 식전":110,"아침 식후":160,"점심 식전":110,"점심 식후":160,"저녁 식전":110,"저녁 식후":160,"공복":110,"간식 후":160,"취침 전":130};
  const [goals,setGoals]=useState(()=>loadState("goals",defaultGoals));
  const getGoal=(type)=>goals[type]||130;
  useEffect(()=>{try{localStorage.setItem("bs_goals",JSON.stringify(goals));}catch{}},[goals]);
  const [selectedDate,setSelectedDate]=useState(todayISO());
  const [toast,setToast]=useState(null);
  const [detailRecord,setDetailRecord]=useState(null);
  const [shareCode]=useState("SNAP-"+Math.random().toString(36).slice(2,8).toUpperCase());
  // New states
  const [medChecks,setMedChecks]=useState(()=>loadState("medChecks",{}));
  const [waterCups,setWaterCups]=useState(()=>{const saved=loadState("waterCups",{date:"",cups:0});return saved.date===todayISO()?saved.cups:0;});
  const [exercises,setExercises]=useState(()=>loadState("exercises",[]));
  const [hospitals,setHospitals]=useState(()=>loadState("hospitals",[]));
  const [dietRec,setDietRec]=useState(null);
  const [dietLoading,setDietLoading]=useState(false);
  const [healthTab,setHealthTab]=useState("meds");
  const [voiceListening,setVoiceListening]=useState(false);
  const [hospModal,setHospModal]=useState(false);
  const [hospForm,setHospForm]=useState({date:todayISO(),type:"정기 검진",hba1c:"",note:""});
  const fileRef=useRef(null);

  useEffect(()=>{const t=setTimeout(()=>setSplash(false),2000);return()=>clearTimeout(t);},[]);
  useEffect(()=>{try{localStorage.setItem("bs_records",JSON.stringify(records));}catch{}},[records]);
  useEffect(()=>{try{localStorage.setItem("bs_medChecks",JSON.stringify(medChecks));}catch{}},[medChecks]);
  useEffect(()=>{try{localStorage.setItem("bs_waterCups",JSON.stringify({date:todayISO(),cups:waterCups}));}catch{}},[waterCups]);
  useEffect(()=>{try{localStorage.setItem("bs_exercises",JSON.stringify(exercises));}catch{}},[exercises]);
  useEffect(()=>{try{localStorage.setItem("bs_hospitals",JSON.stringify(hospitals));}catch{}},[hospitals]);
  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(null),2500);};
  const deleteRecord=(id)=>{setRecords(p=>p.filter(r=>r.id!==id));setDetailRecord(null);showToast("기록이 삭제되었습니다");};
  const startVoice=()=>{
    if(!('webkitSpeechRecognition' in window)&&!('SpeechRecognition' in window)){showToast("이 브라우저에서 음성 인식을 지원하지 않습니다");return;}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;const recog=new SR();
    recog.lang="ko-KR";recog.continuous=false;recog.interimResults=false;
    recog.onstart=()=>setVoiceListening(true);
    recog.onresult=(e)=>{const txt=e.results[0][0].transcript;const nums=txt.replace(/[^0-9]/g,"");if(nums){setForm(p=>({...p,glucose:nums}));showToast("혈당 "+nums+" 입력됨");}else{showToast("숫자를 인식하지 못했어요. 다시 말해주세요");}};
    recog.onerror=()=>{setVoiceListening(false);showToast("음성 인식에 실패했어요");};
    recog.onend=()=>setVoiceListening(false);
    recog.start();
  };

  const ts=todayISO();
  const todayRec=records.filter(r=>r.date===ts);
  const todayAvg=todayRec.length?Math.round(todayRec.reduce((s,r)=>s+r.glucose,0)/todayRec.length):null;
  const allAvg=records.length?Math.round(records.reduce((s,r)=>s+r.glucose,0)/records.length):null;
  // HbA1c estimation: eAG = (28.7 × HbA1c) − 46.7 → HbA1c = (eAG + 46.7) / 28.7
  const hba1c=allAvg?((allAvg+46.7)/28.7).toFixed(1):null;
  // Goal rate
  const last7d=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);last7d.push(d.toISOString().split("T")[0]);}
  const last7Rec=records.filter(r=>last7d.includes(r.date));
  const goalRate=last7Rec.length?Math.round((last7Rec.filter(r=>r.glucose<=getGoal(r.type)).length/last7Rec.length)*100):0;
  // Glucose pattern analysis
  const patterns={};
  records.forEach(r=>{if(!patterns[r.type])patterns[r.type]={total:0,count:0,highs:0};patterns[r.type].total+=r.glucose;patterns[r.type].count++;if(r.glucose>getGoal(r.type))patterns[r.type].highs++;});
  const dangerTimes=Object.entries(patterns).filter(([,d])=>(d.highs/d.count)>0.5).map(([t,d])=>({type:t,avg:Math.round(d.total/d.count),risk:Math.round((d.highs/d.count)*100)}));

  const meds=[{name:"메트포르민 500mg",times:["08:00","20:00"]},{name:"혈당 측정",times:["07:30","12:00","18:30"]}];
  const todayMedKey=ts;

  // Image compression to stay under Vercel 4.5MB limit
  const compressImage=async(b64,maxW=800,quality=0.6)=>{return new Promise(res=>{const img=new Image();img.onload=()=>{const c=document.createElement("canvas");let w=img.width,h=img.height;if(w>maxW){h=Math.round(h*(maxW/w));w=maxW;}c.width=w;c.height=h;const ctx=c.getContext("2d");ctx.drawImage(img,0,0,w,h);res(c.toDataURL("image/jpeg",quality));};img.src=b64;});};

  const handlePhoto=async e=>{const files=e.target.files;if(!files||!files.length)return;
    const newPreviews=[...previews];const newPhotos=[...form.photos];
    for(let i=0;i<files.length;i++){const f=files[i];const b64=await new Promise((res)=>{const r=new FileReader();r.onloadend=()=>res(r.result);r.readAsDataURL(f);});
      const compressed=await compressImage(b64);
      newPreviews.push(compressed);newPhotos.push(compressed);}
    setPreviews(newPreviews);setForm(p=>({...p,photos:newPhotos}));
    const latest=newPreviews[newPreviews.length-1];
    setAnalyzing(true);setAiResult(null);
    const res=await analyzeFood(latest);setAnalyzing(false);
    setAiResult(res&&res.name!=="인식 불가"?res:{name:"인식 불가",emoji:"❓",gi:"unknown",gi_score:"0",calories:"0",portion:"",carbs:"0",protein:"0",fat:"0",fiber:"0",sugar:"0",sodium:"0",warning:"음식 사진을 다시 촬영해주세요",tip:"",confidence:"low"});
    e.target.value="";};
  const acceptAI=()=>{if(aiResult&&aiResult.name!=="인식 불가")setForm(p=>({...p,food:aiResult.name}));};
  const removePhoto=(idx)=>{setPreviews(p=>p.filter((_,i)=>i!==idx));setForm(p=>({...p,photos:p.photos.filter((_,i)=>i!==idx)}));};
  const retryPhoto=()=>{setPreviews([]);setAiResult(null);setAnalyzing(false);setForm(p=>({...p,photos:[],food:""}));setTimeout(()=>fileRef.current&&fileRef.current.click(),100);};
  const submit=()=>{if(!form.glucose)return;setRecords(p=>[...p,{id:uid(),date:ts,time:nowTime(),type:form.type,glucose:parseInt(form.glucose),food:form.food||null,foodEmoji:aiResult?.emoji||null,foodGI:aiResult?.gi||null,photo:form.photos.length?form.photos[0]:null}]);setForm({glucose:"",type:"아침 식전",food:"",photos:[]});setPreviews([]);setAiResult(null);setModal(false);showToast("기록이 저장되었습니다");};
  const exportCSV=()=>{const rows="날짜,시간,측정시점,혈당,음식,GI\n"+records.map(r=>[r.date,r.time,r.type,r.glucose,r.food||"",r.foodGI||""].join(",")).join("\n");const blob=new Blob(["\uFEFF"+rows],{type:"text/csv;charset=utf-8;"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="혈당스냅_"+ts+".csv";a.click();showToast("CSV 다운로드 완료");};
  const loadDiet=async()=>{setDietLoading(true);const r=await getAIDiet(records);setDietRec(r);setDietLoading(false);};
  const addExercise=(type,mins)=>{setExercises(p=>[...p,{id:uid(),date:ts,time:nowTime(),type,minutes:mins}]);showToast("운동 기록 완료");};
  const toggleMed=(medIdx,timeIdx)=>{const key=todayMedKey+"-"+medIdx+"-"+timeIdx;setMedChecks(p=>({...p,[key]:!p[key]}));};

  const mealTypes=["아침 식전","아침 식후","점심 식전","점심 식후","저녁 식전","저녁 식후","간식 후","취침 전"];

  const S = {
    app:{fontFamily:"'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif",maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.bg,position:"relative",color:C.txt},
    hdr:{background:"linear-gradient(165deg,#082F49 0%,#0C4A6E 40%,#0369A1 100%)",padding:"28px 22px 24px",color:"#fff",borderRadius:"0 0 36px 36px",boxShadow:"0 16px 48px rgba(8,47,73,0.35)",position:"relative",overflow:"hidden"},
    glow:{position:"absolute",top:-60,right:-30,width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(56,189,248,0.2),transparent 70%)",filter:"blur(20px)"},
    badge:{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(56,189,248,0.2)",borderRadius:24,padding:"5px 14px 5px 8px",fontSize:11.5,fontWeight:600,color:"#BAE6FD",border:"1px solid rgba(56,189,248,0.15)"},
    sec:{padding:"20px 18px 8px"},
    secT:{fontSize:15,fontWeight:750,color:C.txt,marginBottom:14,display:"flex",alignItems:"center",gap:8},
    card:{background:C.card,borderRadius:22,padding:18,boxShadow:"0 2px 20px rgba(0,0,0,0.03)",border:"1px solid rgba(0,0,0,0.04)"},
    nav:{position:"sticky",bottom:0,background:"rgba(224,240,252,0.95)",backdropFilter:"blur(24px)",borderTop:"1px solid rgba(0,0,0,0.04)",display:"flex",padding:"4px 0 22px",zIndex:100},
    navI:a=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",border:"none",background:"none",padding:"7px 0",color:a?C.pri:C.txtLLL,fontWeight:a?700:500,fontSize:9.5}),
    fab:{position:"fixed",bottom:120,right:"calc(50% - 197px)",width:50,height:50,borderRadius:16,background:"linear-gradient(145deg,"+C.pri+",#7DD3FC)",color:"#fff",border:"none",cursor:"pointer",boxShadow:"0 8px 32px rgba(56,189,248,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:50},
    ov:{position:"fixed",inset:0,background:"rgba(8,47,73,0.65)",backdropFilter:"blur(12px)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"},
    sht:{background:C.inputBg,borderRadius:"30px 30px 0 0",padding:"6px 22px 36px",width:"100%",maxWidth:430,maxHeight:"88vh",overflow:"auto"},
    hdl:{width:40,height:4,borderRadius:2,background:C.border,margin:"10px auto 20px"},
    inp:{width:"100%",padding:"14px 16px",borderRadius:14,border:"2px solid "+C.border,fontSize:15,outline:"none",boxSizing:"border-box",background:C.inputBg,color:C.txt},
    sel:{width:"100%",padding:"14px 16px",borderRadius:14,border:"2px solid "+C.border,fontSize:15,outline:"none",boxSizing:"border-box",background:C.inputBg,appearance:"none",color:C.txt},
    btn:{width:"100%",padding:"16px",borderRadius:16,border:"none",fontSize:15,fontWeight:700,cursor:"pointer",background:"linear-gradient(145deg,#082F49,#0C4A6E)",color:"#fff",boxShadow:"0 6px 24px rgba(8,47,73,0.25)"},
    phBtn:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"18px",borderRadius:16,border:"2px dashed "+C.border,background:C.inputBg,cursor:"pointer",fontSize:13.5,color:C.txtLLL,fontWeight:500},
    recI:{display:"flex",alignItems:"center",gap:12,padding:"12px 0"},
    ft:{textAlign:"center",padding:"20px 0 10px",display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontSize:10,color:"#ced3de",fontWeight:600,letterSpacing:1.5},
    pill:(active)=>({padding:"8px 16px",borderRadius:20,border:"none",fontSize:12,fontWeight:active?700:500,cursor:"pointer",background:active?C.pri:"transparent",color:active?"#fff":C.txtL}),
  };

  // ── Splash ──
  if(splash) return(
    <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh",background:"linear-gradient(165deg,#082F49 0%,#0C4A6E 35%,#0369A1 65%,#0C4A6E 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Pretendard',-apple-system,sans-serif"}}>
      <div style={{textAlign:"center",animation:"fadeUp 1s ease"}}>
        <img src={LOGO} alt="" style={{width:88,height:88,borderRadius:28,margin:"0 auto 24px",display:"block",boxShadow:"0 16px 48px rgba(56,189,248,0.35)"}}/>
        <div style={{fontSize:28,fontWeight:800,color:"#fff",letterSpacing:-1}}>혈당스냅</div>
        <div style={{fontSize:11.5,color:"#7DD3FC",marginTop:6,fontWeight:600,letterSpacing:4}}>BloodSnap</div>
        <div style={{width:32,height:2,background:"linear-gradient(90deg,transparent,"+C.pri+",transparent)",margin:"24px auto 0"}}/>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:16,letterSpacing:2}}>by 에프엔비엔</div>
      </div>
      <style>{"@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}"}</style>
    </div>
  );

  const Footer=()=><div style={S.ft}><img src={LOGO} alt="" style={{width:16,height:16,borderRadius:4}}/> BloodSnap by 에프엔비엔</div>;

  // ── HOME ──
  const renderHome=()=>(
    <>
      <div style={S.hdr}><div style={S.glow}/><div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={S.badge}><img src={LOGO} alt="" style={{width:18,height:18,borderRadius:5}}/><Droplets size={13}/> BloodSnap</div>
          <button onClick={()=>setSettingsOpen(true)} style={{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.06)",width:36,height:36,borderRadius:12,cursor:"pointer",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}><Settings size={18}/></button>
        </div>
        <div style={{fontSize:20,fontWeight:800,marginTop:10}}>{new Date().toLocaleDateString("ko-KR",{month:"long",day:"numeric",weekday:"long"})}</div>
        <div style={{display:"flex",alignItems:"center",gap:16,marginTop:18}}>
          <GoalRing current={todayAvg} goal={goals["아침 식전"]}/>
          <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:14,padding:"10px 12px"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontWeight:600}}>식전 목표</div><div style={{fontSize:18,fontWeight:800,marginTop:2,fontFamily:"monospace"}}>{goals["아침 식전"]}<span style={{fontSize:10,opacity:0.4}}> mg/dL</span></div></div>
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:14,padding:"10px 12px"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontWeight:600}}>HbA1c 추정</div><div style={{fontSize:18,fontWeight:800,marginTop:2,fontFamily:"monospace",color:hba1c&&parseFloat(hba1c)<7?"#00C48C":"#FFB340"}}>{hba1c||"—"}<span style={{fontSize:10,opacity:0.4}}>%</span></div></div>
            <div style={{background:"rgba(255,255,255,0.06)",borderRadius:14,padding:"10px 12px",gridColumn:"span 2"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.4)",fontWeight:600}}>7일 목표 달성률</div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}><div style={{flex:1,height:6,borderRadius:3,background:"rgba(255,255,255,0.08)",overflow:"hidden"}}><div style={{height:"100%",width:goalRate+"%",borderRadius:3,background:goalRate>=70?"#00C48C":goalRate>=40?"#FFB340":"#FF6B6B"}}/></div>
              <span style={{fontSize:14,fontWeight:800,color:goalRate>=70?"#00C48C":goalRate>=40?"#FFB340":"#FF6B6B",fontFamily:"monospace"}}>{goalRate}%</span></div></div>
          </div>
        </div>
      </div></div>
      {/* Pattern warnings */}
      {dangerTimes.length>0&&<div style={S.sec}><div style={{...S.card,background:"rgba(255,107,107,0.04)",border:"1px solid rgba(255,107,107,0.1)"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#FF6B6B",marginBottom:8,display:"flex",alignItems:"center",gap:6}}><AlertTriangle size={15}/> 혈당 주의 패턴</div>
        {dangerTimes.map((d,i)=><div key={i} style={{fontSize:12,color:C.txtL,marginBottom:4}}><span style={{fontWeight:700,color:"#FF6B6B"}}>{d.type}</span> — 평균 {d.avg}mg/dL, 목표 초과 {d.risk}%</div>)}
      </div></div>}
      <div style={S.sec}><div style={S.secT}><TrendingUp size={17} color={C.pri}/> 7일 혈당 추이</div><div style={S.card}><Chart records={records}/>
        {/* Daily health indicators */}
        <div style={{display:"flex",justifyContent:"space-between",padding:"10px 4px 0",borderTop:"1px solid "+C.border,marginTop:8}}>
          {(()=>{const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
            const hasRec=records.some(r=>r.date===ds);const hasEx=exercises.some(e=>e.date===ds);
            const medDone=Object.keys(medChecks).filter(k=>k.startsWith(ds)&&medChecks[k]).length;const medTotal=meds.reduce((s,m)=>s+m.times.length,0);
            days.push(<div key={i} style={{flex:1,textAlign:"center",fontSize:9}}>
              <div style={{display:"flex",justifyContent:"center",gap:2,marginBottom:2}}>
                <span title="혈당" style={{opacity:hasRec?1:0.2}}>💉</span>
                <span title="운동" style={{opacity:hasEx?1:0.2}}>🏃</span>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:2}}>
                <span title="약" style={{opacity:medDone>=medTotal&&medTotal>0?1:medDone>0?0.5:0.2}}>💊</span>
              </div>
            </div>);} return days;})()}
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:6,fontSize:9,color:C.txtLLL}}>
          <span>💉 혈당</span><span>🏃 운동</span><span>💊 약</span>
        </div>
      </div></div>
      {/* Quick actions: water + meds + exercise */}
      <div style={S.sec}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div style={{...S.card,padding:14,cursor:"pointer"}} onClick={()=>{setWaterCups(p=>p+1);showToast("물 "+((waterCups+1)*250)+"ml 기록");}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><Droplets size={20} color={C.pri}/><div><div style={{fontSize:12,fontWeight:700}}>수분 섭취</div><div style={{fontSize:20,fontWeight:800,color:C.pri,fontFamily:"monospace"}}>{waterCups*250}<span style={{fontSize:11,color:C.txtLLL}}>ml</span></div></div></div>
          <div style={{display:"flex",gap:3,marginTop:8}}>{[...Array(8)].map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:2,background:i<waterCups?C.pri:C.border}}/>)}</div>
        </div>
        <div style={{...S.card,padding:14,cursor:"pointer"}} onClick={()=>{setTab("health");setHealthTab("meds");}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><Pill size={20} color={C.pri}/><div><div style={{fontSize:12,fontWeight:700}}>약 복용</div><div style={{fontSize:12,color:C.txtL,marginTop:2}}>{Object.keys(medChecks).filter(k=>k.startsWith(todayMedKey)&&medChecks[k]).length}/{meds.reduce((s,m)=>s+m.times.length,0)} 완료</div></div></div>
        </div>
      </div></div>
      <div style={S.sec}><div style={S.secT}><Clock size={17} color={C.pri}/> 오늘의 기록</div><div style={S.card}>
        {!todayRec.length?<div style={{textAlign:"center",padding:"28px 0",color:C.txtLLL}}><FileText size={32} strokeWidth={1.5} color={C.txtLLL} style={{margin:"0 auto 8px"}}/><div style={{fontSize:14,fontWeight:600,color:C.txtL}}>아직 오늘의 기록이 없어요</div></div>
        :todayRec.map((r,i)=>{const lv=getLevel(r.glucose,r.type);return(<div key={r.id} onClick={()=>setDetailRecord(r)} style={{...S.recI,borderBottom:i<todayRec.length-1?"1px solid "+C.border:"none",cursor:"pointer"}}>
          <div style={{width:46,height:46,borderRadius:14,background:lv.bg,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 3px "+lv.ring}}><span style={{fontWeight:800,fontSize:15,color:lv.color,fontFamily:"monospace"}}>{r.glucose}</span></div>
          <div style={{flex:1}}><div style={{fontWeight:650,fontSize:13.5}}>{r.type}</div><div style={{fontSize:11.5,color:C.txtLLL,marginTop:2}}>{r.time}{r.food?" · "+r.food:""}</div></div>
          <div style={{padding:"5px 10px",borderRadius:10,background:lv.bg,color:lv.color,fontSize:11,fontWeight:700}}>{lv.label}</div>
        </div>);})}
      </div></div>
      <Footer/>
    </>
  );

  // ── HEALTH TAB ──
  const renderHealth=()=>(
    <>
      <div style={{...S.hdr,background:"linear-gradient(165deg,#082F49 0%,#0C4A6E 40%,#0369A1 100%)"}}><div style={S.glow}/><div style={{position:"relative",zIndex:1}}>
        <div style={S.badge}><img src={LOGO} alt="" style={{width:18,height:18,borderRadius:5}}/><Heart size={13}/> 건강관리</div>
        <div style={{fontSize:20,fontWeight:800,marginTop:10}}>매일의 건강 습관</div>
      </div></div>
      <div style={{padding:"16px 18px 8px",display:"flex",gap:4,background:C.bg}}>
        {[{id:"meds",label:"약 복용",Icon:Pill},{id:"exercise",label:"운동",Icon:Activity},{id:"water",label:"수분",Icon:Droplets},{id:"hospital",label:"병원",Icon:Heart}].map(t=>
          <button key={t.id} style={S.pill(healthTab===t.id)} onClick={()=>setHealthTab(t.id)}><t.Icon size={12} style={{marginRight:4,verticalAlign:"middle"}}/>{t.label}</button>
        )}
      </div>
      {/* Medication Checklist */}
      {healthTab==="meds"&&<div style={S.sec}><div style={S.secT}><Pill size={17} color={C.pri}/> 오늘의 약 복용 체크</div>
        {meds.map((m,mi)=><div key={mi} style={{...S.card,marginBottom:10}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>{m.name}</div>
          {m.times.map((t,ti)=>{const key=todayMedKey+"-"+mi+"-"+ti;const done=medChecks[key];
            return(<div key={ti} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderTop:ti>0?"1px solid "+C.border:"none"}}>
              <div><span style={{fontSize:13,fontWeight:600}}>{t}</span><span style={{fontSize:11,color:C.txtLLL,marginLeft:8}}>복용 시간</span></div>
              <button onClick={()=>toggleMed(mi,ti)} style={{width:44,height:28,borderRadius:14,border:"none",cursor:"pointer",background:done?C.pri:"#e2e5ec",position:"relative"}}>
                <div style={{width:22,height:22,borderRadius:11,background:"#fff",position:"absolute",top:3,left:done?19:3,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,0.15)"}}/>
              </button>
            </div>);})}
        </div>)}
      </div>}
      {/* Exercise */}
      {healthTab==="exercise"&&<div style={S.sec}><div style={S.secT}><Activity size={17} color={C.pri}/> 운동 기록</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {[{type:"걷기",min:30},{type:"조깅",min:20},{type:"자전거",min:30},{type:"수영",min:30},{type:"요가",min:30},{type:"근력운동",min:20}].map(e=>
            <button key={e.type} onClick={()=>addExercise(e.type,e.min)} style={{...S.card,padding:"14px 12px",cursor:"pointer",border:"1px solid "+C.border,textAlign:"left"}}>
              <div style={{fontWeight:700,fontSize:13}}>{e.type}</div>
              <div style={{fontSize:11,color:C.txtLLL,marginTop:4}}>{e.min}분</div>
            </button>
          )}
        </div>
        <div style={S.secT}><Activity size={17} color={C.pri}/> 최근 운동</div>
        <div style={S.card}>
          {exercises.filter(e=>e.date===ts).length===0?<div style={{textAlign:"center",padding:"20px 0",color:C.txtLLL,fontSize:13}}>오늘 운동 기록이 없어요</div>
          :exercises.filter(e=>e.date===ts).map(e=><div key={e.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0"}}><Activity size={16} color={C.pri}/><span style={{fontWeight:600,fontSize:13}}>{e.type}</span><span style={{fontSize:12,color:C.txtLLL}}>{e.minutes}분 · {e.time}</span></div>)}
        </div>
      </div>}
      {/* Water */}
      {healthTab==="water"&&<div style={S.sec}><div style={S.secT}><Droplets size={17} color={C.pri}/> 수분 섭취</div>
        <div style={S.card}><div style={{textAlign:"center",padding:"12px 0"}}>
          <div style={{fontSize:48,fontWeight:800,color:C.pri,fontFamily:"monospace"}}>{waterCups*250}<span style={{fontSize:18,color:C.txtLLL}}>ml</span></div>
          <div style={{fontSize:12,color:C.txtL,marginTop:4}}>목표 2,000ml 중 {Math.round((waterCups*250/2000)*100)}%</div>
          <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:16}}>
            {[...Array(8)].map((_,i)=><div key={i} onClick={()=>setWaterCups(i+1)} style={{width:28,height:36,borderRadius:8,background:i<waterCups?"linear-gradient(180deg,"+C.pri+",#7DD3FC)":C.cardH,cursor:"pointer",border:"1px solid "+(i<waterCups?C.pri:C.border),display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:4}}>
              <span style={{fontSize:8,fontWeight:600,color:i<waterCups?"#fff":C.txtLLL}}>{(i+1)*250}</span>
            </div>)}
          </div>
          <button onClick={()=>{setWaterCups(p=>p+1);showToast("물 "+((waterCups+1)*250)+"ml 기록");}} style={{marginTop:16,padding:"12px 32px",borderRadius:14,border:"none",background:C.pri,color:"#fff",fontWeight:700,fontSize:14,cursor:"pointer"}}>+ 한 잔 추가 (250ml)</button>
        </div></div>
      </div>}
      {/* Hospital */}
      {healthTab==="hospital"&&<div style={S.sec}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={S.secT}><Heart size={17} color={C.pri}/> 병원 방문 기록</div>
        <button onClick={()=>setHospModal(true)} style={{background:C.pri,color:"#fff",border:"none",borderRadius:10,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}><Plus size={14}/> 추가</button>
      </div>
        {!hospitals.length&&<div style={{...S.card,textAlign:"center",padding:"28px 0",color:C.txtLLL}}><Heart size={28} strokeWidth={1.5} color={C.txtLLL} style={{margin:"0 auto 8px"}}/><div style={{fontSize:13,fontWeight:600,color:C.txtL}}>병원 방문 기록이 없어요</div><div style={{fontSize:11,color:C.txtLLL,marginTop:4}}>위 "추가" 버튼으로 기록해보세요</div></div>}
        {hospitals.map((h,i)=><div key={i} style={{...S.card,marginBottom:10}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontWeight:700,fontSize:14}}>{h.type}</div><div style={{fontSize:12,color:C.txtLLL,marginTop:2}}>{h.date}</div></div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              {h.hba1c&&<div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.txtLLL}}>HbA1c</div><div style={{fontSize:20,fontWeight:800,color:parseFloat(h.hba1c)<7?"#00C48C":"#FFB340",fontFamily:"monospace"}}>{h.hba1c}%</div></div>}
              <button onClick={()=>{if(confirm("이 기록을 삭제하시겠습니까?"))setHospitals(p=>p.filter((_,j)=>j!==i));}} style={{background:"none",border:"none",cursor:"pointer",color:C.txtLLL,padding:4}}><Trash2 size={14}/></button>
            </div>
          </div>
          {h.note&&<div style={{marginTop:8,fontSize:12,color:C.txtL,background:C.bg,padding:"8px 12px",borderRadius:10}}>{h.note}</div>}
        </div>)}
        {/* Hospital Add Modal */}
        {hospModal&&<div style={S.ov} onClick={()=>setHospModal(false)}><div style={S.sht} onClick={e=>e.stopPropagation()}>
          <div style={S.hdl}/>
          <div style={{fontSize:18,fontWeight:800,marginBottom:20}}>병원 방문 기록 추가</div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div><label style={{fontSize:12,fontWeight:700,marginBottom:6,display:"block"}}>방문 날짜</label><input type="date" value={hospForm.date} onChange={e=>setHospForm(p=>({...p,date:e.target.value}))} style={S.inp}/></div>
            <div><label style={{fontSize:12,fontWeight:700,marginBottom:6,display:"block"}}>방문 유형</label><select value={hospForm.type} onChange={e=>setHospForm(p=>({...p,type:e.target.value}))} style={S.sel}>
              <option>정기 검진</option><option>혈액 검사</option><option>안과 검진</option><option>신장 검사</option><option>발 검진</option><option>기타 진료</option>
            </select></div>
            <div><label style={{fontSize:12,fontWeight:700,marginBottom:6,display:"block"}}>HbA1c (당화혈색소) %</label><input type="number" step="0.1" placeholder="예: 6.8" value={hospForm.hba1c} onChange={e=>setHospForm(p=>({...p,hba1c:e.target.value}))} style={S.inp}/></div>
            <div><label style={{fontSize:12,fontWeight:700,marginBottom:6,display:"block"}}>의사 소견 / 메모</label><input type="text" placeholder="예: 메트포르민 유지, 식단 관리 강화" value={hospForm.note} onChange={e=>setHospForm(p=>({...p,note:e.target.value}))} style={S.inp}/></div>
            <button onClick={()=>{setHospitals(p=>[{...hospForm},...p]);setHospForm({date:todayISO(),type:"정기 검진",hba1c:"",note:""});setHospModal(false);showToast("병원 기록이 저장되었습니다");}} style={S.btn}>저장</button>
          </div>
        </div></div>}
      </div>}
      <Footer/>
    </>
  );

  // ── ANALYSIS TAB ──
  const renderAnalysis=()=>{
    // Meal delta
    const byDate={};records.forEach(r=>{if(!byDate[r.date])byDate[r.date]=[];byDate[r.date].push(r);});
    const pairs=[];Object.values(byDate).forEach(day=>{["아침","점심","저녁"].forEach(meal=>{const pre=day.find(r=>r.type===meal+" 식전");const post=day.find(r=>r.type===meal+" 식후");if(pre&&post)pairs.push({meal,delta:post.glucose-pre.glucose,food:post.food,emoji:post.foodEmoji});});});
    const byMeal={};pairs.forEach(p=>{if(!byMeal[p.meal])byMeal[p.meal]={deltas:[],foods:{}};byMeal[p.meal].deltas.push(p.delta);if(p.food){if(!byMeal[p.meal].foods[p.food])byMeal[p.meal].foods[p.food]={deltas:[],emoji:p.emoji};byMeal[p.meal].foods[p.food].deltas.push(p.delta);}});
    const mealStats=Object.entries(byMeal).map(([m,d])=>({meal:m,avg:Math.round(d.deltas.reduce((a,b)=>a+b,0)/d.deltas.length),count:d.deltas.length,foods:Object.entries(d.foods).map(([n,f])=>({name:n,emoji:f.emoji,avg:Math.round(f.deltas.reduce((a,b)=>a+b,0)/f.deltas.length)})).sort((a,b)=>b.avg-a.avg).slice(0,3)}));
    // Weekly report
    const weekAvg=last7Rec.length?Math.round(last7Rec.reduce((s,r)=>s+r.glucose,0)/last7Rec.length):null;
    const weekMax=last7Rec.length?Math.max(...last7Rec.map(r=>r.glucose)):null;
    const weekMin=last7Rec.length?Math.min(...last7Rec.map(r=>r.glucose)):null;

    return(
      <>
        <div style={{...S.hdr,background:"linear-gradient(165deg,#082F49 0%,#0C4A6E 40%,#0369A1 100%)"}}><div style={S.glow}/><div style={{position:"relative",zIndex:1}}>
          <div style={S.badge}><img src={LOGO} alt="" style={{width:18,height:18,borderRadius:5}}/><BarChart2 size={13}/> 분석</div>
          <div style={{fontSize:20,fontWeight:800,marginTop:10}}>혈당 & 음식 분석</div>
        </div></div>
        {/* Weekly Report */}
        <div style={S.sec}><div style={S.secT}><BarChart3 size={17} color={C.pri}/> 주간 리포트</div>
          <div style={S.card}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,color:C.txtLLL}}>평균</div><div style={{fontSize:22,fontWeight:800,color:weekAvg?getLevel(weekAvg).color:C.txt,fontFamily:"monospace"}}>{weekAvg||"—"}</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,color:C.txtLLL}}>최저</div><div style={{fontSize:22,fontWeight:800,color:"#00C48C",fontFamily:"monospace"}}>{weekMin||"—"}</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:10,color:C.txtLLL}}>최고</div><div style={{fontSize:22,fontWeight:800,color:"#FF6B6B",fontFamily:"monospace"}}>{weekMax||"—"}</div></div>
          </div>
          <div style={{marginTop:12,display:"flex",alignItems:"center",gap:8,background:C.bg,padding:"10px 12px",borderRadius:12}}>
            <Activity size={16} color={C.pri}/><div><div style={{fontSize:12,fontWeight:600}}>추정 HbA1c: <span style={{color:hba1c&&parseFloat(hba1c)<7?"#00C48C":"#FFB340",fontFamily:"monospace"}}>{hba1c||"—"}%</span></div><div style={{fontSize:10,color:C.txtLLL,marginTop:2}}>최근 30일 평균 혈당 {allAvg||"—"}mg/dL 기반</div></div>
          </div></div>
        </div>
        {/* AI Diet Recommendation */}
        <div style={S.sec}><div style={S.secT}><Zap size={17} color={C.pri}/> AI 맞춤 식단</div>
          {!dietRec?<button onClick={loadDiet} disabled={dietLoading} style={{...S.card,width:"100%",cursor:"pointer",border:"2px dashed "+C.border,textAlign:"center",opacity:dietLoading?0.6:1}}>
            {dietLoading?<div style={{padding:"12px 0"}}><Search size={20} color={C.pri} style={{animation:"spin 1.5s linear infinite"}}/><div style={{fontSize:13,fontWeight:600,marginTop:8}}>혈당 데이터를 분석하고 있어요...</div><div style={{fontSize:11,color:C.txtLLL,marginTop:4}}>맞춤 식단 생성 중...</div></div>
            :<div style={{padding:"12px 0"}}><Zap size={24} color={C.pri}/><div style={{fontSize:13,fontWeight:600,marginTop:8}}>내 혈당 데이터 기반 맞춤 식단 추천</div><div style={{fontSize:11,color:C.txtLLL,marginTop:4}}>실제 혈당 기록을 분석해서 추천해드려요</div></div>}
          </button>
          :<div style={S.card}>
            {dietRec.theme&&<div style={{textAlign:"center",padding:"10px 0 14px",borderBottom:"1px solid "+C.border,marginBottom:10}}><div style={{fontSize:15,fontWeight:800,color:C.priD}}>{dietRec.theme}</div></div>}
            {[{key:"breakfast",label:"아침",Icon:Sunrise},{key:"lunch",label:"점심",Icon:Sun},{key:"dinner",label:"저녁",Icon:Moon}].map(({key,label,Icon})=>dietRec[key]&&(
              <div key={key} style={{padding:"12px 0",borderBottom:key!=="dinner"?"1px solid "+C.border:"none"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <div style={{width:36,height:36,borderRadius:10,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon size={16} color={C.pri}/></div>
                  <div style={{fontWeight:700,fontSize:14,color:C.txt}}>{label}: {dietRec[key].menu}</div>
                </div>
                <div style={{fontSize:12,color:C.txtL,marginLeft:46,marginBottom:4}}>{dietRec[key].desc}</div>
                {dietRec[key].reason&&<div style={{fontSize:11,color:C.priD,marginLeft:46,background:"rgba(56,189,248,0.05)",padding:"6px 10px",borderRadius:8}}>{dietRec[key].reason}</div>}
              </div>
            ))}
            {dietRec.snack&&<div style={{marginTop:10,fontSize:12,color:"#00C48C",background:"rgba(0,196,140,0.05)",padding:"10px 12px",borderRadius:10,display:"flex",alignItems:"center",gap:6}}><CheckCircle size={14}/> 간식: {dietRec.snack}</div>}
            {dietRec.avoid&&<div style={{marginTop:6,fontSize:12,color:"#FF6B6B",background:"rgba(255,107,107,0.05)",padding:"10px 12px",borderRadius:10,display:"flex",alignItems:"center",gap:6}}><AlertTriangle size={14}/> 피하세요: {dietRec.avoid}</div>}
            {dietRec.tip&&<div style={{marginTop:6,fontSize:12,color:C.priD,background:"rgba(56,189,248,0.06)",padding:"10px 12px",borderRadius:10,display:"flex",alignItems:"center",gap:6}}><Lightbulb size={14}/> {dietRec.tip}</div>}
            <button onClick={loadDiet} style={{marginTop:12,width:"100%",padding:10,borderRadius:10,border:"1px solid "+C.border,background:C.bg,fontSize:12,fontWeight:600,cursor:"pointer",color:C.txtL}}>다른 식단 추천받기</button>
          </div>}
        </div>
        {/* Meal Delta */}
        <div style={S.sec}><div style={S.secT}><BarChart3 size={17} color={C.pri}/> 식전→식후 변화량</div>
          {mealStats.map(ms=>{const MI=ms.meal==="아침"?Sunrise:ms.meal==="점심"?Sun:Moon;const c=ms.avg>40?"#FF6B6B":ms.avg>25?"#FFB340":"#00C48C";
            return(<div key={ms.meal} style={{...S.card,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:ms.foods.length?10:0}}>
                <div style={{fontWeight:750,fontSize:15,display:"flex",alignItems:"center",gap:7}}><MI size={17} color={C.pri}/> {ms.meal}</div>
                <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,color:C.txtLLL}}>{ms.count}회</span><span style={{fontWeight:800,fontSize:18,color:c,fontFamily:"monospace"}}>+{ms.avg}</span></div>
              </div>
              {ms.foods.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",background:f.avg>40?"rgba(255,107,107,0.04)":"rgba(0,0,0,0.015)",borderRadius:10,marginBottom:3}}>
                <span style={{fontSize:15}}>{f.emoji||""}</span><span style={{flex:1,fontSize:12,fontWeight:600}}>{f.name}</span><span style={{fontWeight:700,fontSize:13,color:f.avg>40?"#FF6B6B":f.avg>25?"#FFB340":"#00C48C",fontFamily:"monospace"}}>+{f.avg}</span>
              </div>)}
            </div>);
          })}
        </div>
        <Footer/>
        <style>{"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}"}</style>
      </>
    );
  };

  // ── SETTINGS ──
  const renderSettings=()=>{if(!settingsOpen)return null;return(
    <div style={S.ov} onClick={()=>setSettingsOpen(false)}><div style={S.sht} onClick={e=>e.stopPropagation()}>
      <div style={S.hdl}/><div style={{fontSize:19,fontWeight:800,marginBottom:24,display:"flex",alignItems:"center",gap:10}}><Settings size={20} color={C.pri}/> 설정</div>
      <div style={{marginBottom:24}}><div style={{fontSize:14,fontWeight:700,marginBottom:14,display:"flex",alignItems:"center",gap:7}}><Target size={16} color={C.pri}/> 측정 시점별 목표 혈당</div>
        {[
          {label:"식전 (아침/점심/저녁)",keys:["아침 식전","점심 식전","저녁 식전"],min:70,max:160,color:"#00C48C",desc:"권장 80~130"},
          {label:"식후 (아침/점심/저녁)",keys:["아침 식후","점심 식후","저녁 식후"],min:100,max:220,color:"#FFB340",desc:"권장 90~180"},
          {label:"취침 전",keys:["취침 전"],min:80,max:180,color:"#5B8DEF",desc:"권장 100~140"},
          {label:"간식 후",keys:["간식 후"],min:100,max:200,color:"#F59E0B",desc:"권장 ~180"},
        ].map((g,gi)=>(
          <div key={gi} style={{background:C.card,borderRadius:14,padding:"12px 14px",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div><div style={{fontSize:13,fontWeight:700}}>{g.label}</div><div style={{fontSize:10,color:C.txtLLL}}>{g.desc}</div></div>
              <div style={{display:"flex",alignItems:"center",gap:4}}><input type="number" value={goals[g.keys[0]]||130} onChange={e=>{const v=parseInt(e.target.value)||0;setGoals(p=>{const n={...p};g.keys.forEach(k=>{n[k]=v;});return n;});}} style={{width:60,textAlign:"right",fontWeight:800,fontSize:18,color:g.color,fontFamily:"monospace",border:"1.5px solid "+C.border,borderRadius:8,padding:"4px 6px",background:C.inputBg,outline:"none"}}/><span style={{fontSize:10,color:C.txtLLL}}>mg/dL</span></div>
            </div>
            <input type="range" min={g.min} max={g.max} value={goals[g.keys[0]]||130} onChange={e=>{const v=parseInt(e.target.value);setGoals(p=>{const n={...p};g.keys.forEach(k=>{n[k]=v;});return n;});}} style={{width:"100%",accentColor:g.color}}/>
          </div>
        ))}
        <button onClick={()=>{setGoals(defaultGoals);showToast("기본값으로 초기화됨");}} style={{width:"100%",padding:10,borderRadius:10,border:"1px solid "+C.border,background:C.bg,fontSize:12,fontWeight:600,cursor:"pointer",color:C.txtLLL,marginTop:4}}>기본값으로 초기화</button>
      </div>
      <div style={{marginBottom:24}}><div style={{fontSize:14,fontWeight:700,marginBottom:10,display:"flex",alignItems:"center",gap:7}}><Download size={16} color={C.pri}/> 기록 내보내기</div>
        <button onClick={exportCSV} style={{width:"100%",padding:14,borderRadius:14,border:"2px solid "+C.border,background:C.card,fontSize:14,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Download size={16}/> CSV 다운로드</button>
      </div>
      <div style={{marginBottom:16}}><div style={{fontSize:14,fontWeight:700,marginBottom:10,display:"flex",alignItems:"center",gap:7}}><Users size={16} color={C.pri}/> 가족 공유</div>
        <div style={{background:"rgba(56,189,248,0.04)",borderRadius:18,padding:18,border:"1px solid rgba(56,189,248,0.1)"}}>
          <div style={{fontSize:12.5,color:C.txtL,marginBottom:10}}>공유 코드를 가족에게 보내면 혈당 기록을 함께 확인할 수 있어요</div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{flex:1,background:C.card,borderRadius:12,padding:"12px 16px",fontFamily:"monospace",fontSize:16,fontWeight:700,color:C.pri,textAlign:"center",letterSpacing:2,border:"2px solid rgba(56,189,248,0.15)"}}>{shareCode}</div>
            <button onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(shareCode);showToast("코드가 복사되었습니다");}} style={{padding:"12px 16px",borderRadius:12,border:"none",background:C.pri,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><Copy size={14}/> 복사</button>
          </div>
        </div>
      </div>
    </div></div>
  );};

  return(
    <div style={S.app}>
      <div style={{paddingBottom:78}}>
        {tab==="home"&&renderHome()}
        {tab==="calendar"&&(<>
          <div style={{...S.hdr,background:"linear-gradient(165deg,#082F49 0%,#0C4A6E 40%,#0EA5E9 100%)"}}><div style={S.glow}/><div style={{position:"relative",zIndex:1}}><div style={S.badge}><img src={LOGO} alt="" style={{width:18,height:18,borderRadius:5}}/><Calendar size={13}/> 캘린더</div><div style={{fontSize:20,fontWeight:800,marginTop:10}}>날짜별 혈당 기록</div></div></div>
          <div style={S.sec}><div style={S.card}><CalendarView records={records} selectedDate={selectedDate} onSelect={setSelectedDate}/></div></div>
          <div style={S.sec}><div style={S.secT}><FileText size={17} color={C.pri}/> {fmtDate(selectedDate)} 기록</div><div style={S.card}>
            {!records.filter(r=>r.date===selectedDate).length?<div style={{textAlign:"center",padding:"20px 0",color:C.txtLLL,fontSize:13}}>이 날의 기록이 없어요</div>
            :records.filter(r=>r.date===selectedDate).map((r,i,a)=>{const lv=getLevel(r.glucose,r.type);return(<div key={r.id} onClick={()=>setDetailRecord(r)} style={{...S.recI,borderBottom:i<a.length-1?"1px solid "+C.border:"none",cursor:"pointer"}}>
              <div style={{width:42,height:42,borderRadius:13,background:lv.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,color:lv.color,fontFamily:"monospace",boxShadow:"0 0 0 2.5px "+lv.ring}}>{r.glucose}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{r.type}</div><div style={{fontSize:11,color:C.txtLLL,marginTop:1}}>{r.time}{r.food?" · "+r.food:""}</div></div>
              <div style={{padding:"4px 9px",borderRadius:8,background:lv.bg,color:lv.color,fontSize:10.5,fontWeight:700}}>{lv.label}</div>
            </div>);})}
          </div></div><Footer/>
        </>)}
        {tab==="analysis"&&renderAnalysis()}
        {tab==="health"&&renderHealth()}
      </div>
      <button style={S.fab} onClick={()=>{setModal(true);setAiResult(null);setAnalyzing(false);}}><Plus size={24} strokeWidth={2.5}/></button>
      <div style={S.nav}>
        {[{id:"home",Icon:Home,label:"홈"},{id:"calendar",Icon:Calendar,label:"캘린더"},{id:"analysis",Icon:BarChart2,label:"분석"},{id:"health",Icon:Heart,label:"건강"}].map(t=>(
          <button key={t.id} style={S.navI(tab===t.id)} onClick={()=>setTab(t.id)}>
            <t.Icon size={20} strokeWidth={tab===t.id?2.5:1.8} style={{transition:"transform .2s",transform:tab===t.id?"scale(1.1) translateY(-1px)":"scale(1)"}}/><span>{t.label}</span>
            {tab===t.id&&<div style={{width:5,height:5,borderRadius:"50%",background:C.pri,boxShadow:"0 0 8px rgba(56,189,248,0.5)"}}/>}
          </button>
        ))}
      </div>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:C.priDD,color:"#fff",padding:"12px 24px",borderRadius:14,fontSize:14,fontWeight:600,zIndex:9999,boxShadow:"0 8px 32px rgba(0,0,0,0.2)"}}>{toast}</div>}
      {renderSettings()}
      {/* Record Modal */}
      {modal&&(<div style={S.ov} onClick={()=>setModal(false)}><div style={S.sht} onClick={e=>e.stopPropagation()}>
        <div style={S.hdl}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:22}}>
          <div><div style={{fontSize:18,fontWeight:800}}>혈당 기록하기</div><div style={{fontSize:12,color:C.txtLLL,marginTop:3}}>오늘의 혈당과 식사를 기록해주세요</div></div>
          <button onClick={()=>setModal(false)} style={{background:C.cardH,border:"none",width:34,height:34,borderRadius:11,cursor:"pointer",color:C.txtLLL,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16}/></button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div><label style={{fontSize:12,fontWeight:700,marginBottom:7,display:"block"}}>혈당 수치</label>
            <div style={{position:"relative",display:"flex",gap:8}}><input type="number" placeholder="수치 입력" value={form.glucose} onChange={e=>setForm(p=>({...p,glucose:e.target.value}))} style={{...S.inp,paddingRight:70}}/>
              <span style={{position:"absolute",right:56,top:"50%",transform:"translateY(-50%)",fontSize:13,color:C.txtLLL,fontWeight:600}}>mg/dL</span>
              <button onClick={startVoice} style={{width:48,height:48,borderRadius:14,border:voiceListening?"2px solid #FF6B6B":"2px solid "+C.border,background:voiceListening?"rgba(255,107,107,0.08)":C.inputBg,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Mic size={20} color={voiceListening?"#FF6B6B":C.txtL}/></button>
            </div>
            {voiceListening&&<div style={{marginTop:6,fontSize:12,color:"#FF6B6B",fontWeight:600,display:"flex",alignItems:"center",gap:6}}><div style={{width:8,height:8,borderRadius:"50%",background:"#FF6B6B",animation:"pulse 1s infinite"}}/>듣고 있어요... 혈당 수치를 말해주세요</div>}
            {form.glucose&&(()=>{const lv=getLevel(parseInt(form.glucose)||0,form.type);const rng=getRangeType(form.type);return<div style={{marginTop:8,fontSize:12,fontWeight:600,color:lv.color,display:"flex",alignItems:"center",gap:7}}><span style={{width:9,height:9,borderRadius:"50%",background:lv.color}}/>{lv.label} 범위 <span style={{color:C.txtLLL,fontWeight:400}}>({rng.label} 목표: {rng.normal}~{rng.warn} mg/dL)</span></div>;})()}
          </div>
          <div><label style={{fontSize:12,fontWeight:700,marginBottom:7,display:"block"}}>측정 시점</label><select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={S.sel}>{mealTypes.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
          <div><label style={{fontSize:12,fontWeight:700,marginBottom:7,display:"flex",alignItems:"center",gap:8}}><Camera size={14}/> 음식 사진 <span style={{fontSize:10,background:C.pri,color:"#fff",padding:"2px 8px",borderRadius:6,fontWeight:700}}>AI 자동 인식</span></label>
            <input type="file" accept="image/*" multiple ref={fileRef} style={{display:"none"}} onChange={handlePhoto}/>
            {previews.length>0?<div>
              <div style={{display:"grid",gridTemplateColumns:previews.length===1?"1fr":"1fr 1fr",gap:8,marginBottom:8}}>
                {previews.map((p,i)=><div key={i} style={{position:"relative",borderRadius:14,overflow:"hidden"}}>
                  <img src={p} alt="" style={{width:"100%",height:previews.length===1?180:110,objectFit:"cover",display:"block"}}/>
                  <button onClick={()=>removePhoto(i)} style={{position:"absolute",top:6,right:6,background:"rgba(0,0,0,0.5)",color:"#fff",border:"none",borderRadius:8,width:24,height:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={12}/></button>
                </div>)}
              </div>
              {!analyzing&&<button onClick={()=>fileRef.current&&fileRef.current.click()} style={{width:"100%",padding:"10px",borderRadius:12,border:"2px dashed "+C.border,background:C.inputBg,cursor:"pointer",fontSize:12,color:C.txtL,fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}><Plus size={14}/> 사진 추가</button>}
            </div>
            :<button onClick={()=>fileRef.current&&fileRef.current.click()} style={S.phBtn}><Camera size={18}/> 사진을 찍으면 AI가 자동으로 음식을 인식해요</button>}
            {analyzing&&<div style={{background:"rgba(56,189,248,0.06)",borderRadius:20,padding:28,marginTop:12,textAlign:"center",border:"1.5px solid rgba(56,189,248,0.15)"}}><Search size={20} color={C.pri} style={{animation:"spin 1.5s linear infinite"}}/><div style={{fontSize:14,fontWeight:700,marginTop:8}}>AI가 음식을 분석하고 있어요</div><div style={{fontSize:12,color:C.txtLLL,marginTop:4}}>음식, 양, 영양성분 확인 중...</div></div>}
            {aiResult&&<div style={{background:"rgba(56,189,248,0.04)",borderRadius:20,padding:18,border:"1.5px solid rgba(56,189,248,0.12)",marginTop:12}}>
              <div style={{fontSize:12,fontWeight:700,color:C.priD,marginBottom:12,display:"flex",alignItems:"center",gap:6}}><Search size={15}/> AI 음식 인식 결과</div>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                <div style={{width:52,height:52,borderRadius:16,background:C.card,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{aiResult.emoji}</div>
                <div><div style={{fontWeight:800,fontSize:17}}>{aiResult.name}</div>
                  {aiResult.portion&&<div style={{fontSize:11.5,color:C.txtL,marginTop:2,display:"flex",alignItems:"center",gap:4}}><Activity size={12}/> {aiResult.portion}</div>}
                  <div style={{display:"flex",gap:8,marginTop:6}}><span style={{background:C.card,padding:"3px 9px",borderRadius:7,fontSize:11,fontWeight:600}}>GI {aiResult.gi_score}</span><span style={{background:C.card,padding:"3px 9px",borderRadius:7,fontSize:11,fontWeight:600}}>~{aiResult.calories}kcal</span></div>
                </div>
              </div>
              {aiResult.carbs&&aiResult.name!=="인식 불가"&&<div style={{background:"#f0f9ff",borderRadius:14,padding:"12px 14px",marginBottom:12,border:"1px solid rgba(56,189,248,0.12)"}}>
                <div style={{fontSize:11.5,fontWeight:700,color:C.priD,marginBottom:10,display:"flex",alignItems:"center",gap:5}}><Zap size={13}/> 영양성분</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                  {[{l:"탄수화물",v:aiResult.carbs,u:"g",c:"#F59E0B"},{l:"단백질",v:aiResult.protein,u:"g",c:"#10B981"},{l:"지방",v:aiResult.fat,u:"g",c:"#EF4444"},{l:"당류",v:aiResult.sugar,u:"g",c:"#F97316"},{l:"식이섬유",v:aiResult.fiber,u:"g",c:"#22C55E"},{l:"나트륨",v:aiResult.sodium,u:"mg",c:"#8B5CF6"}].map(n=><div key={n.l} style={{background:C.card,borderRadius:10,padding:"8px",textAlign:"center"}}><div style={{fontSize:9,color:C.txtLLL}}>{n.l}</div><div style={{fontSize:15,fontWeight:800,color:n.c,fontFamily:"monospace",marginTop:2}}>{n.v}<span style={{fontSize:9,color:C.txtLLL}}>{n.u}</span></div></div>)}
                </div>
              </div>}
              {aiResult.warning&&<div style={{background:"rgba(255,107,107,0.05)",borderRadius:12,padding:"10px 13px",marginBottom:8,fontSize:11.5,color:"#FF6B6B",fontWeight:600,display:"flex",alignItems:"center",gap:5}}><AlertTriangle size={13}/> {aiResult.warning}</div>}
              {aiResult.tip&&<div style={{background:"rgba(0,196,140,0.05)",borderRadius:12,padding:"10px 13px",marginBottom:12,fontSize:11.5,color:"#00C48C",fontWeight:600,display:"flex",alignItems:"center",gap:5}}><Lightbulb size={13}/> {aiResult.tip}</div>}
              <div style={{display:"flex",gap:10}}>
                <button onClick={acceptAI} style={{flex:1,padding:13,borderRadius:13,border:"none",background:"linear-gradient(145deg,#082F49,#0C4A6E)",color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><CheckCircle size={15}/> 적용</button>
                <button onClick={retryPhoto} style={{padding:"13px 18px",borderRadius:13,border:"2px solid "+C.border,background:C.card,color:C.txtL,fontSize:13,fontWeight:600,cursor:"pointer"}}>다시 촬영</button>
              </div>
            </div>}
          </div>
          <div><label style={{fontSize:12,fontWeight:700,marginBottom:7,display:"block"}}>먹은 음식 <span style={{fontWeight:400,color:C.txtLLL}}>직접 입력 가능</span></label><input type="text" placeholder="사진 촬영 또는 직접 입력" value={form.food} onChange={e=>setForm(p=>({...p,food:e.target.value}))} style={S.inp}/></div>
          <button onClick={submit} style={{...S.btn,marginTop:4,opacity:form.glucose?1:0.35}}>기록 저장</button>
        </div>
      </div></div>)}
      {/* Detail Record Modal */}
      {detailRecord&&(()=>{const r=detailRecord;const lv=getLevel(r.glucose,r.type);return(
        <div style={S.ov} onClick={()=>setDetailRecord(null)}>
          <div style={{...S.sht,maxHeight:"75vh"}} onClick={e=>e.stopPropagation()}>
            <div style={S.hdl}/>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div style={{fontSize:18,fontWeight:800}}>기록 상세</div>
              <button onClick={()=>setDetailRecord(null)} style={{background:C.cardH,border:"none",width:34,height:34,borderRadius:11,cursor:"pointer",color:C.txtLLL,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16}/></button>
            </div>
            <div style={{textAlign:"center",padding:"20px 0",background:lv.bg,borderRadius:20,marginBottom:16}}>
              <div style={{fontSize:48,fontWeight:800,color:lv.color,fontFamily:"monospace"}}>{r.glucose}</div>
              <div style={{fontSize:13,color:lv.color,fontWeight:700,marginTop:4}}>{lv.label} · {r.type}</div>
              <div style={{fontSize:12,color:C.txtL,marginTop:6}}>{fmtDate(r.date)} · {r.time}</div>
              <div style={{fontSize:11,color:C.txtLLL,marginTop:4}}>목표 범위: {getRangeType(r.type).normal}~{getRangeType(r.type).warn} mg/dL</div>
            </div>
            {r.food&&<div style={{...S.card,marginBottom:12}}>
              <div style={{fontSize:12,fontWeight:700,color:C.priD,marginBottom:8}}>먹은 음식</div>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                {r.foodEmoji&&<span style={{fontSize:24}}>{r.foodEmoji}</span>}
                <div>
                  <div style={{fontWeight:700,fontSize:15}}>{r.food}</div>
                  {r.foodGI&&<span style={{background:r.foodGI==="high"?"rgba(255,107,107,0.08)":r.foodGI==="medium"?"rgba(255,179,64,0.08)":"rgba(0,196,140,0.08)",color:r.foodGI==="high"?"#FF6B6B":r.foodGI==="medium"?"#FFB340":"#00C48C",padding:"2px 8px",borderRadius:6,fontWeight:600,fontSize:10.5}}>{r.foodGI==="high"?"고GI":r.foodGI==="medium"?"중GI":"저GI"}</span>}
                </div>
              </div>
            </div>}
            {r.photo&&<div style={{borderRadius:16,overflow:"hidden",marginBottom:12}}><img src={r.photo} alt="" style={{width:"100%",height:200,objectFit:"cover",display:"block"}}/></div>}
            <button onClick={()=>{if(confirm("이 기록을 삭제하시겠습니까?"))deleteRecord(r.id);}} style={{width:"100%",padding:"14px",borderRadius:14,border:"2px solid rgba(255,107,107,0.2)",background:"rgba(255,107,107,0.04)",fontSize:14,fontWeight:600,cursor:"pointer",color:"#FF6B6B",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <Trash2 size={16}/> 이 기록 삭제
            </button>
          </div>
        </div>);})()}
      <style>{"@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}"}</style>
    </div>
  );
}
