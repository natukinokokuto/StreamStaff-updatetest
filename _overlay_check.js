
const APP_STATE_KEY = "stream_manager_integrated_v1";

function nowTime(){
 const d = new Date();
 return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
}

function readJson(key, fallback){
 try{return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));}
 catch(e){return fallback;}
}

function readAppState(){
 try{return JSON.parse(localStorage.getItem(APP_STATE_KEY) || "{}") || {};}
 catch(e){return {};}
}

function cleanText(v){
 if(v == null) return "";
 if(typeof v === "string" || typeof v === "number") return String(v).trim();
 if(Array.isArray(v)) return v.map(cleanText).filter(Boolean).slice(0,3).join(" / ");
 if(typeof v === "object"){
   const keys = ["title","text","memo","content","name","label","value","trunk","branch","leaf"];
   for(const k of keys){
     const hit = cleanText(v[k]);
     if(hit) return hit;
   }
 }
 return "";
}

function latestStreamMemo(state){
 const logs = Array.isArray(state.logs) ? state.logs : [];
 const hit = logs.find(x => cleanText(x && x.title).includes("配信メモ"));
 if(hit) return cleanText(hit.text || hit.memo || hit.content || hit);
 const first = logs[0];
 return cleanText(first && (first.text || first.memo || first.content)) || "";
}

function syncedValue(kind){
 const state = readAppState();
 const tree = state.tree || {};
 if(kind === "配信メモ") return latestStreamMemo(state) || "配信メモ";
 if(kind === "幹") return cleanText(tree.trunk) || "今日のメインテーマ";
 if(kind === "枝") return cleanText(tree.branch) || "枝";
 if(kind === "葉") return cleanText(tree.leaf) || "葉";
 if(kind === "お知らせ"){
   const ev = Array.isArray(state.calendarEvents) ? state.calendarEvents[0] : null;
   return cleanText(ev && (ev.item || ev.title || ev.type)) || "お知らせ";
 }
 if(kind === "常連メモ"){
   const l = Array.isArray(state.listeners) ? state.listeners[0] : null;
   return l ? [l.name, l.memo].map(cleanText).filter(Boolean).join("：") : "常連メモ";
 }
 if(kind === "カレンダー"){
   const ev = Array.isArray(state.calendarEvents) ? state.calendarEvents[0] : null;
   return ev ? [ev.date, ev.item || ev.title || ev.type].map(cleanText).filter(Boolean).join(" ") : "カレンダー";
 }
 if(kind === "ルーレット結果"){
   const h = state.roulette && Array.isArray(state.roulette.history) ? state.roulette.history[0] : null;
   return cleanText(h) || "ルーレット結果";
 }
 if(kind === "カウントダウン"){
   const cd = Array.isArray(state.countdowns) ? state.countdowns[0] : null;
   return cd ? [cd.title, cd.target].map(cleanText).filter(Boolean).join(" ") : "カウントダウン";
 }
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
 if(value==="タイトル") return data.titleText || localStorage.getItem("ss_obs_title_text") || "";
 if(value==="時計") return nowTime();
 if(value==="タイトル＋時計"){
   const title = data.titleText || localStorage.getItem("ss_obs_title_text") || "";
   return title ? title+"　"+nowTime() : nowTime();
 }
 if(value==="テロップ文") return data.tickerText || localStorage.getItem("ss_obs_ticker_text") || "";
 if(value==="テロップ文＋時計"){
   const ticker = data.tickerText || localStorage.getItem("ss_obs_ticker_text") || "";
   return ticker ? ticker+"　"+nowTime() : nowTime();
 }
 if(value==="枠のみ") return "";
 return syncedValue(value) || value;
}

function layoutItems(data){
 const m = data.merge || {};
 function row(prefix,rowNum){
   const cap = prefix.charAt(0).toUpperCase()+prefix.slice(1);
   const leftKey = prefix+"Left", centerKey = prefix+"Center", rightKey = prefix+"Right";
   const mergeLeft = !!m["obsMerge"+cap+"Left"];
   const mergeRight = !!m["obsMerge"+cap+"Right"];
   if(mergeLeft && mergeRight) return [{key:leftKey,row:rowNum,col:1,colSpan:3}];
   if(mergeLeft) return [{key:leftKey,row:rowNum,col:1,colSpan:2},{key:rightKey,row:rowNum,col:3,colSpan:1}];
   if(mergeRight) return [{key:leftKey,row:rowNum,col:1,colSpan:1},{key:centerKey,row:rowNum,col:2,colSpan:2}];
   return [{key:leftKey,row:rowNum,col:1,colSpan:1},{key:centerKey,row:rowNum,col:2,colSpan:1},{key:rightKey,row:rowNum,col:3,colSpan:1}];
 }
 return [...row("top",1),...row("mid",2),...row("bottom",3)];
}

function makeMarquee(text){
 const wrap = document.createElement("div");
 wrap.className = "ticker-marquee";
 const track = document.createElement("div");
 track.className = "ticker-track";
 const item = document.createElement("span");
 item.className = "ticker-item";
 item.textContent = text;
 track.appendChild(item);
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
