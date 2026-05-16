
const slotOrder = [
"topLeft","topCenter","topRight",
"midLeft","midCenter","midRight",
"bottomLeft","bottomCenter","bottomRight"
];

function nowTime(){
 const d = new Date();
 return String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0");
}

function load(){
 try{
   return JSON.parse(localStorage.getItem("ss_obs_9slot_layout") || '{"slots":{},"merge":{},"colors":{},"titleText":"","tickerText":""}');
 }catch(e){
   return {slots:{},merge:{},colors:{},titleText:"",tickerText:""};
 }
}

function labelFor(value,data){
 if(!value || value==="空白") return "";
 if(value==="タイトル") return data.titleText || "";
 if(value==="時計") return nowTime();
 if(value==="タイトル＋時計") return (data.titleText ? data.titleText+"　" : "") + nowTime();
 if(value==="テロップ文") return data.tickerText || "";
 if(value==="テロップ文＋時計") return (data.tickerText ? data.tickerText+"　" : "") + nowTime();
 if(value==="幹") return "雑談テーマ";
 if(value==="枠のみ") return "";
 return value;
}

function layoutItems(data){
 const m = data.merge || {};

 function row(prefix,rowNum){
   const leftKey = prefix+"Left";
   const centerKey = prefix+"Center";
   const rightKey = prefix+"Right";

   const cap = prefix.charAt(0).toUpperCase() + prefix.slice(1);
   const mergeLeft = !!m["obsMerge"+cap+"Left"];
   const mergeRight = !!m["obsMerge"+cap+"Right"];

   if(mergeLeft && mergeRight){
     return [{key:leftKey,row:rowNum,col:1,colSpan:3}];
   }

   if(mergeLeft){
     return [
       {key:leftKey,row:rowNum,col:1,colSpan:2},
       {key:rightKey,row:rowNum,col:3,colSpan:1}
     ];
   }

   if(mergeRight){
     return [
       {key:leftKey,row:rowNum,col:1,colSpan:1},
       {key:centerKey,row:rowNum,col:2,colSpan:2}
     ];
   }

   return [
     {key:leftKey,row:rowNum,col:1,colSpan:1},
     {key:centerKey,row:rowNum,col:2,colSpan:1},
     {key:rightKey,row:rowNum,col:3,colSpan:1}
   ];
 }

 return [
   ...row("top",1),
   ...row("mid",2),
   ...row("bottom",3)
 ];
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

   if(value==="空白"){
     div.classList.add("empty");
   }

   const text = labelFor(value,data);

   if(item.row === 3 && value.indexOf("テロップ文") >= 0 && text){
     const span = document.createElement("span");
     span.className = "ticker-scroll";
     span.textContent = text;
     div.appendChild(span);
   }else{
     div.textContent = text;
   }

   overlay.appendChild(div);
 });
}

window.addEventListener("storage", render);
window.addEventListener("focus", render);
document.addEventListener("visibilitychange", render);
setInterval(render,500);
render();
