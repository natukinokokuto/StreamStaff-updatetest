
const localStorage = new Map();
localStorage.setItem = localStorage.set.bind(localStorage);
localStorage.getItem = localStorage.get.bind(localStorage);
const APP_STATE_KEY = "stream_manager_integrated_v1";
function cleanText(v){ if(v == null) return ""; if(typeof v === "string" || typeof v === "number") return String(v).trim(); if(Array.isArray(v)) return v.map(cleanText).filter(Boolean).slice(0,3).join(" / "); if(typeof v === "object"){ const keys = ["title","text","memo","content","name","label","value","trunk","branch","leaf"]; for(const k of keys){ const hit = cleanText(v[k]); if(hit) return hit; } } return ""; }
function readAppState(){ try{return JSON.parse(localStorage.getItem(APP_STATE_KEY) || "{}") || {};}catch(e){return {};}}
function latestStreamMemo(state){ const logs = Array.isArray(state.logs) ? state.logs : []; const hit = logs.find(x => cleanText(x && x.title).includes("配信メモ")); if(hit) return cleanText(hit.text || hit.memo || hit.content || hit); const first = logs[0]; return cleanText(first && (first.text || first.memo || first.content)) || ""; }
function syncedValue(kind){ const state = readAppState(); const tree = state.tree || {}; if(kind === "配信メモ") return latestStreamMemo(state) || "配信メモ"; if(kind === "幹") return cleanText(tree.trunk) || "今日のメインテーマ"; if(kind === "枝") return cleanText(tree.branch) || "枝"; if(kind === "葉") return cleanText(tree.leaf) || "葉"; return ""; }
localStorage.setItem(APP_STATE_KEY, JSON.stringify({tree:{trunk:"テスト幹", branch:"テスト枝", leaf:"テスト葉"}, logs:[{title:"配信メモ", text:"テスト配信メモ"}]}));
if(syncedValue("幹") !== "テスト幹") throw new Error("trunk failed");
if(syncedValue("配信メモ") !== "テスト配信メモ") throw new Error("memo failed");
console.log("ok");
