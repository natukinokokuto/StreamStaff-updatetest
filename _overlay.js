
function nowTime(){
 const d = new Date();
 return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
}

function readJson(key, fallback){
 try{return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));}
 catch(e){return fallback;}
}

function textFromValue(v){
 if(v == null) return "";
 if(typeof v === "string" || typeof v === "number") return String(v).trim();
 if(Array.isArray(v)) return v.map(textFromValue).filter(Boolean).slice(0,3).join(" / ");
 if(typeof v === "object"){
   const preferred = ["title","text","main","trunk","branch","leaf","theme","memo","content","name","label","value","body"];
   for(const k of preferred){
     const t = textFromValue(v[k]);
     if(t) return t;
   }
   for(const x of Object.values(v)){
     const t = textFromValue(x);
     if(t) return t;
   }
 }
 return "";
}

function findByKeys(keys, fallback){
 for(const key of keys){
   const raw = localStorage.getItem(key);
   if(!raw) continue;
   try{
     const parsed = JSON.parse(raw);
     const t = textFromValue(parsed);
     if(t) return t;
   }catch(e){
     if(raw.trim()) return raw.trim();
   }
 }
 return fallback || "";
}

function syncedValue(kind){
 if(kind === "幹") return findByKeys(["ss_current_trunk","currentTrunk","rescueTrunk","topicTrunk","streamstaff_trunk","ss_rescue_current","streamstaff_topics"], "雑談テーマ");
 if(kind === "枝") return findByKeys(["ss_current_branch","currentBranch","rescueBranch","topicBranch","streamstaff_branch","streamstaff_topics"], "枝");
 if(kind === "葉") return findByKeys(["ss_current_leaf","currentLeaf","rescueLeaf","topicLeaf","streamstaff_leaf","streamstaff_topics"], "葉");
 if(kind === "お知らせ") return findByKeys(["ss_notice","notice","notices","calendarNotice","ss_calendar_notice","calendarEvents","events"], "お知らせ");
 if(kind === "常連メモ") return findByKeys(["ss_regulars","regulars","listeners","streamstaff_regulars"], "常連メモ");
 if(kind === "カレンダー") return findByKeys(["ss_calendar","calendar","calendarEvents","events"], "カレンダー");
 if(kind === "ルーレット結果") return findByKeys(["ss_roulette_result","rouletteResult","lastRouletteResult"], "ルーレット結果");
 if(kind === "カウントダウン") return findByKeys(["ss_countdown","countdown","timerTarget"], "カウントダウン");
 return "";
}

function defaultData(){
 return {slots:{},merge:{},titleText:"",tickerText:"",tickerScroll:true,colors:{bg:"transparent",frame:"#555555",text:"#ffffff",panel:"rgba(0,0,0,.35)"}};
}

function load(){
 const d = Object.assign(defaultData(), readJson("ss_obs_9slot_layout", defaultData()));
 d.slots = d.slots || {};
 d.merge = d.merge || {};
 d.colors = Object.assign(defaultData().colors, d.colors || {});
 if(!d.titleText) d.titleText = localStorage.getItem("ss_obs_title_text") || "";
 if(!d.tickerText) d.tickerText = localStorage.getItem("ss_obs_ticker_text") || "";
 if(localStorage.getItem("ss_obs_ticker_scroll") === "0") d.tickerScroll = false;
 return d;
}

function labelFor(value,data){
 if(!value || value==="空白") return "";
 if(value==="タイトル") return data.titleText || "";
 if(value==="時計") return nowTime();
 if(value==="タイトル＋時計") return (data.titleText ? data.titleText+"　" : "") + nowTime();
 if(value==="テロップ文") return data.tickerText || "";
 if(value==="テロップ文＋時計") return (data.tickerText ? data.tickerText+"　" : "") + nowTime();
 if(value==="枠のみ") return "";
 return syncedValue(value) || value;
}

function layoutItems(data){
 const m = data.merge || {};
 function row(prefix,rowNum){
   const cap = prefix.charAt(0).toUpperCase() + prefix.slice(1);
   const leftKey = prefix+"Left";
   const centerKey = prefix+"Center";
   const rightKey = prefix+"Right";
   const mergeLeft = !!m["obsMerge"+cap+"Left"];
   const mergeRight = !!m["obsMerge"+cap+"Right"];
   if(mergeLeft && mergeRight) return [{key:leftKey,row:rowNum,col:1,colSpan:3}];
   if(mergeLeft) return [{key:leftKey,row:rowNum,col:1,colSpan:2},{key:rightKey,row:rowNum,col:3,colSpan:1}];
   if(mergeRight) return [{key:leftKey,row:rowNum,col:1,colSpan:1},{key:centerKey,row:rowNum,col:2,colSpan:2}];
   return [
     {key:leftKey,row:rowNum,col:1,colSpan:1},
     {key:centerKey,row:rowNum,col:2,colSpan:1},
     {key:rightKey,row:rowNum,col:3,colSpan:1}
   ];
 }
 return [...row("top",1),...row("mid",2),...row("bottom",3)];
}

function makeMarquee(text){
 const wrap = document.createElement("div");
 wrap.className = "ticker-marquee";
 const track = document.createElement("div");
 track.className = "ticker-track";
 const a = document.createElement("span");
 a.className = "ticker-item";
 a.textContent = text;
 const b = document.createElement("span");
 b.className = "ticker-item";
 b.textContent = text;
 track.appendChild(a);
 track.appendChild(b);
 wrap.appendChild(track);
 return wrap;
}

function render(){
 const data = load();
 const overlay = document.getElementById("overlay");
 overlay.innerHTML = "";

 const c = data.colors || {};
 document.body.style.background = c.bg || "transparent";

 layoutItems(data).forEach(item=>{
   const value = (data.slots && data.slots[item.key]) || "空白";
   const div = document.createElement("div");
   div.className = "slot";
   div.style.gridRow = item.row;
   div.style.gridColumn = item.col + " / span " + item.colSpan;

   if(item.row===1) div.classList.add("topbar");
   if(item.row===3) div.classList.add("ticker");

   div.style.background = c.panel || "rgba(0,0,0,.35)";
   div.style.border = "2px solid " + (c.frame || "#555");
   div.style.color = c.text || "#fff";

   if(value==="空白") div.classList.add("empty");

   const text = labelFor(value,data);
   if(item.row === 3 && value.indexOf("テロップ文") >= 0 && text && data.tickerScroll !== false){
     div.appendChild(makeMarquee(text));
   }else{
     div.textContent = text;
   }

   overlay.appendChild(div);
 });
}

window.addEventListener("storage", render);
window.addEventListener("focus", render);
document.addEventListener("visibilitychange", render);
setInterval(render,300);
render();
