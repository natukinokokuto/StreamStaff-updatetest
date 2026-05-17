
const localStorage = new Map();
localStorage.getItem = localStorage.get.bind(localStorage);
localStorage.setItem = localStorage.set.bind(localStorage);
const APP_STATE_KEY = "stream_manager_integrated_v1";
function cleanText(v){ if(v == null) return ""; if(typeof v === "string" || typeof v === "number") return String(v).trim(); if(Array.isArray(v)) return v.map(cleanText).filter(Boolean).slice(0,4).join(" / "); if(typeof v === "object"){ const keys = ["title","text","memo","body","content","value","item","name","label","trunk","branch","leaf","main"]; for(const k of keys){ const hit = cleanText(v[k]); if(hit) return hit; } } return ""; }
function findDeepByKey(obj, keyRegex){ if(!obj || typeof obj !== "object") return ""; if(Array.isArray(obj)){ for(const x of obj){ const hit = findDeepByKey(x, keyRegex); if(hit) return hit; } return ""; } for(const [k,v] of Object.entries(obj)){ if(keyRegex.test(k)){ const hit = cleanText(v); if(hit) return hit; } } for(const v of Object.values(obj)){ const hit = findDeepByKey(v, keyRegex); if(hit) return hit; } return ""; }
function latestStreamMemo(state){ let direct = findDeepByKey(state, /(streamMemo|homeMemo|broadcastMemo|deliveryMemo|配信メモ|memoText|mainMemo)/i); if(direct) return direct; const logs = Array.isArray(state.logs) ? state.logs : []; const titled = logs.find(x => cleanText(x && (x.title || x.name || x.label)).includes("配信メモ")); if(titled){ const hit = cleanText(titled.text || titled.memo || titled.body || titled.content || titled.value || titled.item); if(hit) return hit; } for(const x of logs){ const hit = cleanText(x && (x.text || x.memo || x.body || x.content || x.value || x.item)); if(hit) return hit; } return ""; }
localStorage.setItem(APP_STATE_KEY, JSON.stringify({tree:{trunk:"幹テスト"}, home:{streamMemo:"ホーム配信メモ"}}));
let state = JSON.parse(localStorage.getItem(APP_STATE_KEY));
if(latestStreamMemo(state)!=="ホーム配信メモ") throw new Error("direct memo failed");
localStorage.setItem(APP_STATE_KEY, JSON.stringify({tree:{trunk:"幹テスト"}, logs:[{title:"配信メモ", text:"ログ配信メモ"}]}));
state = JSON.parse(localStorage.getItem(APP_STATE_KEY));
if(latestStreamMemo(state)!=="ログ配信メモ") throw new Error("log memo failed");
console.log("ok");
