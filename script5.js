
/* v97 regular memo compact cards + roulette guest sync final */
(function(){
  function html(s){ return (typeof escapeHtml === "function") ? escapeHtml(s) : String(s ?? "").replace(/[&<>"]/g, function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];}); }
  function attr(s){ return html(s).replace(/'/g,"&#39;"); }
  function todayYmd(){ return (typeof ymd === "function") ? ymd(new Date()) : new Date().toISOString().slice(0,10); }
  function regularSearchNormalize(value){
    if(typeof normalizeRouletteSearchText === "function") return normalizeRouletteSearchText(value);
    let raw=String(value||"").normalize("NFKC").toLowerCase();
    raw=raw.replace(/[ァ-ン]/g,function(ch){return String.fromCharCode(ch.charCodeAt(0)-0x60);});
    try{ raw=raw.replace(/[^\p{L}\p{N}ー々〆〤]/gu,""); }catch(e){ raw=raw.replace(/[^0-9a-zぁ-んァ-ン一-龯ー々〆〤]/g,""); }
    return raw;
  }
  function splitRegularTokens(parts){
    return parts.join(' ').split(/[\s,、，/／・|｜]+/).map(regularSearchNormalize).filter(Boolean);
  }
  function listenerSearchTokens(l){
    // 常連メモ検索は「名前系」と「検索補助欄」を中心にする。
    // メモ・話題の種・好きな物まで毎回見ると、1文字検索で関係ない人が出しゃばるため除外。
    const base=[l && l.name, l && l.nickname, l && l.searchYomi, l && l.searchTags];
    return splitRegularTokens(base);
  }
  function listenerMatchesRegularSearch(l, query){
    const q=regularSearchNormalize(query);
    if(!q) return true;
    const tokens=listenerSearchTokens(l||{});
    // 1文字検索は完全に先頭一致だけ。例：「か」でミホが出る誤爆を防ぐ。
    if(q.length<=1) return tokens.some(function(t){ return t.indexOf(q)===0; });
    // 2文字以上も基本は先頭一致。タグだけは「深夜 雑談」のような複数語検索用に部分一致も許可。
    return tokens.some(function(t){ return t.indexOf(q)===0 || (t.length>=2 && t.indexOf(q)>=0); });
  }
  function touchListener(l){ if(l) l.updatedAt = new Date().toISOString(); }
  function ensureListenerUpdatedAt(){
    let changed=false;
    (state.listeners||[]).forEach(function(l){
      if(l && !l.updatedAt){ l.updatedAt = l.registeredDate || l.firstVisitDate || todayYmd(); changed=true; }
    });
    if(changed){ try{ save(); }catch(e){} }
  }
  function listenerUpdatedKey(l){ return String((l && (l.updatedAt || l.modifiedAt || l.lastUpdated || l.registeredDate || l.firstVisitDate)) || ""); }
  function listenerSortKey(l){ return regularSearchNormalize(String((l && (l.searchYomi || l.kana || l.name)) || "")); }
  function ensureRegularToolbar(){
    const grid=document.getElementById("memoGrid");
    if(!grid || document.getElementById("regularMemoToolbar")) return;
    const bar=document.createElement("div");
    bar.id="regularMemoToolbar";
    bar.className="regular-toolbar";
    bar.innerHTML=''
      + '<input id="regularMemoSearch" placeholder="常連検索" style="flex:1;min-width:180px">'
      + '<select id="regularMemoSort">'
      + '<option value="updated">最終更新日順</option>'
      + '<option value="kana">50音順</option>'
      + '<option value="recent">最近追加</option>'
      + '<option value="birthday">誕生日近い順</option>'
      + '</select>';
    grid.parentNode.insertBefore(bar, grid);
    regularMemoSearch.value = window.__regularMemoSearch || "";
    regularMemoSearch.addEventListener("compositionstart", function(){ window.__regularMemoSearchComposing=true; });
    regularMemoSearch.addEventListener("compositionend", function(){ window.__regularMemoSearchComposing=false; window.__regularMemoSearch=this.value; renderMemo(); });
    regularMemoSearch.addEventListener("input", function(e){ window.__regularMemoSearch=this.value; if(window.__regularMemoSearchComposing || (e && e.isComposing)) return; renderMemo(); });
    regularMemoSort.value = window.__regularMemoSort || "updated";
    regularMemoSort.addEventListener("change", function(){ window.__regularMemoSort=this.value; renderMemo(); });
  }
  function daysUntilBirthday(l){
    if(!l || !l.birthday) return 99999;
    const parts=String(l.birthday).split('/');
    if(parts.length<2) return 99999;
    const now=new Date();
    const m=Number(parts[0]); let d=Number(parts[1]);
    if(!m || !d) return 99999;
    function lastDay(y,mi){ return new Date(y,mi,0).getDate(); }
    let y=now.getFullYear();
    if(m===2 && d===29){
      const leap=(y%4===0 && y%100!==0)||y%400===0;
      if(!leap) d=28;
    }else d=Math.min(d,lastDay(y,m));
    let target=new Date(y,m-1,d);
    const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    if(target<today){
      y++;
      d=Number(parts[1]);
      if(m===2 && d===29){
        const leap=(y%4===0 && y%100!==0)||y%400===0;
        if(!leap) d=28;
      }else d=Math.min(d,lastDay(y,m));
      target=new Date(y,m-1,d);
    }
    return Math.round((target-today)/86400000);
  }
  function primarySeed(l){
    const seeds=(l && l.topicSeeds && l.topicSeeds.length) ? l.topicSeeds : (typeof generateTopicSeeds === "function" ? generateTopicSeeds(l) : []);
    return seeds && seeds.length ? seeds[0] : "好きな物・趣味を入れると話題の種が出るよ";
  }
  function nearestPlan(l){
    if(!l) return "予定なし";
    const now=todayYmd();
    const evs=(state.calendarEvents||[]).filter(function(ev){ return ev.listener===l.name && ev.date>=now; })
      .sort(function(a,b){ return String(a.date).localeCompare(String(b.date)); });
    if(evs.length){
      const ev=evs[0];
      return ev.date + "：" + (ev.type || "予定") + (ev.item ? " / " + ev.item : "");
    }
    const bd=daysUntilBirthday(l);
    if(bd!==99999){
      if(bd===0) return "今日：誕生日";
      if(bd<=30) return bd + "日後：誕生日";
    }
    return "予定なし";
  }
  function getSortedListeners(){
    ensureListenerUpdatedAt();
    const search=regularSearchNormalize(String(window.__regularMemoSearch || "").trim());
    const sort=window.__regularMemoSort || "updated";
    let arr=(state.listeners||[]).map(function(l,i){ return {l:l,i:i}; });
    if(search){
      arr=arr.filter(function(x){ return listenerMatchesRegularSearch(x.l||{}, search); });
    }
    if(sort==="updated") arr.sort(function(a,b){ return listenerUpdatedKey(b.l).localeCompare(listenerUpdatedKey(a.l)) || listenerSortKey(a.l).localeCompare(listenerSortKey(b.l),'ja', {numeric:true, sensitivity:"base"}); });
    else if(sort==="recent") arr.sort(function(a,b){ return String(b.l.registeredDate||"").localeCompare(String(a.l.registeredDate||"")); });
    else if(sort==="birthday") arr.sort(function(a,b){ return daysUntilBirthday(a.l)-daysUntilBirthday(b.l); });
    else arr.sort(function(a,b){ return listenerSortKey(a.l).localeCompare(listenerSortKey(b.l),'ja', {numeric:true, sensitivity:"base"}); });
    return arr;
  }
  window.renderMemo=function(){
    const grid=document.getElementById("memoGrid");
    if(!grid) return;
    ensureRegularToolbar();
    grid.classList.add("regular-one-list");
    const items=getSortedListeners();
    grid.innerHTML=items.map(function(x){
      const l=x.l, i=x.i;
      const seed=primarySeed(l);
      const plan=nearestPlan(l);
      return ''
      + '<div class="card regular-compact-card"><div class="inner">'
      + '<div class="regular-compact-head">'
      + '<div><div class="regular-compact-name">' + html(l.name || '名前なし') + '</div>'
      + (l.nickname ? '<div class="muted">@' + html(l.nickname) + '</div>' : '') + '</div>'
      + '<div class="row"><button class="btn mini-btn" data-toggle-regular="'+i+'">開く</button>'
      + '<button class="btn danger mini-btn" data-delete-memo-listener="'+i+'">削除</button></div>'
      + '</div>'
      + '<div class="regular-topic-blue">🩵 ' + html(seed) + '</div>'
      + '<div class="regular-next-plan">📅 ' + html(plan) + '</div>'
      + '<div class="regular-detail-fold" data-regular-fold="'+i+'">'
      + '<p class="muted">ログボ ' + html((typeof currentLogboCount==="function" ? currentLogboCount(l) : 0)) + '日 / ' + html(state.logboMonth || '') + '</p>'
      + (l.birthday ? '<p class="muted">🎂 誕生日 ' + html(l.birthday) + '</p>' : '')
      + (typeof isLeapBirthday==="function" && isLeapBirthday(l.birthday) ? '<div class="leap-note">🎂 うるう日生まれ：平年は2/28扱いで表示します。</div>' : '')
      + '<p class="muted">年齢 ' + html(typeof displayAge==="function" ? displayAge(l) : '-') + ' / 初来枠から ' + html(typeof dateDiffText==="function" ? dateDiffText(l.firstVisitDate || l.registeredDate) : '-') + '</p>'
      + (typeof renderSeedList==="function" ? renderSeedList(l,i) : '')
      + '<div class="penalty-box"><div class="row" style="justify-content:space-between"><div><div class="muted">ペナルティー</div><div class="penalty-count">' + html(l.penalty || 0) + '</div></div>'
      + '<div class="row"><button class="btn danger mini-btn" data-penalty-minus="'+i+'">−</button><button class="btn danger mini-btn" data-penalty-plus="'+i+'">＋</button><button class="btn mini-btn" data-penalty-reset="'+i+'">リセット</button><button class="btn mini-btn" data-penalty-detail="'+i+'">内容を開く</button></div></div>'
      + '<div class="penalty-details" data-penalty-detail-box="'+i+'">' + (typeof penaltyDetailList==="function" ? penaltyDetailList(l.name) : '') + '</div></div>'
      + '<h3>達成依頼 / 達成品</h3>' + (typeof achievedList==="function" ? achievedList(l) : '')
      + '<h3>カレンダー同期メモ</h3>' + (typeof calendarMemoList==="function" ? calendarMemoList(l.name) : '')
      + '<label>検索用よみ</label><input data-search-yomi="'+i+'" value="' + attr(l.searchYomi || '') + '" placeholder="例：あらた / びーる / よろしくたろう">'
      + '<p class="muted">アプリ内検索用。記号・絵文字（★🍺+など）は自動で飛ばすから普通の名前は入力不要。当て字・特殊名・絵文字だけの名前だけ設定。</p>'
      + '<label>検索用タグ</label><input data-search-tags="'+i+'" value="' + attr(l.searchTags || '') + '" placeholder="例：酒 飲み 深夜 筋トレ">'
      + '<p class="muted">スペース区切り。名前以外でも探したい時用。</p>'
      + '<label>常連メモ</label><textarea data-memo="'+i+'">' + html(l.memo || '') + '</textarea>'
      + '<div class="row" style="margin-top:8px"><button class="btn primary mini-btn" data-open-detail="'+i+'">詳細設定</button><button class="btn mini-btn" data-refresh-seeds="'+i+'">話題更新</button></div>'
      + '</div></div></div>';
    }).join('') || '<div class="card"><div class="inner muted">常連なし</div></div>';

    grid.querySelectorAll('[data-toggle-regular]').forEach(function(btn){ btn.onclick=function(){ const box=grid.querySelector('[data-regular-fold="'+btn.dataset.toggleRegular+'"]'); if(box){ box.classList.toggle('open'); btn.textContent=box.classList.contains('open')?'閉じる':'開く'; } }; });
    grid.querySelectorAll('textarea[data-memo]').forEach(function(t){ t.onchange=function(){ const l=state.listeners[Number(t.dataset.memo)]; l.memo=t.value; touchListener(l); save(); renderMemo(); }; });
    grid.querySelectorAll('input[data-search-yomi]').forEach(function(inp){ inp.onchange=function(){ const l=state.listeners[Number(inp.dataset.searchYomi)]; l.searchYomi=inp.value.trim(); touchListener(l); save(); renderMemo(); }; });
    grid.querySelectorAll('input[data-search-tags]').forEach(function(inp){ inp.onchange=function(){ const l=state.listeners[Number(inp.dataset.searchTags)]; l.searchTags=inp.value.trim(); touchListener(l); save(); renderMemo(); }; });
    grid.querySelectorAll('[data-refresh-seeds]').forEach(function(btn){ btn.onclick=function(){ refreshTopicSeeds(Number(btn.dataset.refreshSeeds)); }; });
    grid.querySelectorAll('[data-open-detail]').forEach(function(btn){ btn.onclick=function(){ openListenerDetail(Number(btn.dataset.openDetail)); }; });
    grid.querySelectorAll('[data-delete-memo-listener]').forEach(function(btn){ btn.onclick=function(){ deleteListener(Number(btn.dataset.deleteMemoListener)); }; });
    if(typeof bindPenaltyButtons==="function") bindPenaltyButtons(grid);
  };
  if(document.readyState!=="loading"){
    try{ renderMemo(); }catch(e){ console.warn(e); }
  }else{
    document.addEventListener("DOMContentLoaded", function(){ try{ renderMemo(); }catch(e){ console.warn(e); } });
  }
})();
