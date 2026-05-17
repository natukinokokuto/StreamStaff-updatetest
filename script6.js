
(function(){
const ageRns={
 student:['放課後エナドリ戦士','テスト前の消しゴム','部活帰りの肉まん','文化祭の余り係','朝練サボり隊','給食じゃんけん王'],
 young:['深夜のカフェオレ','既読スルー研究家','コンビニ前のため息','休日の二度寝職人','サウナ上がりのラムネ','終電ギリギリ侍'],
 adult:['MDウォークマン世代','着メロを信じた男','ガラケーのストラップ','平成の待ち受け職人','レンタルビデオ返却係','ポケベル鳴らしたい'],
 chaos:['唐揚げ錬金術師','冷蔵庫の住民','枕カバー2号','湯船の哲学者','迷子のチャーハン','右足だけ靴下']
};
const banks={
 midnight:{label:'深夜ラジオ',ages:['young','adult'],prefix:['深夜にコンビニへ行った帰りにふと思ったんですが、','眠れなくて天井を見てたら考えすぎちゃって、','夜中に急に昔のことを思い出して、','寝る前だけ妙に素直になるタイプなんですが、','風呂上がりにぼーっとしてたら、'],q:['ひとり時間って何をして過ごしますか？','昔の自分に今なら何て声をかけますか？','大人になってから好きになったものってありますか？','考えすぎる夜ってどうやって抜け出しますか？','深夜に食べるなら何が一番罪ですか？']},
 talk:{label:'雑談',ages:['student','young','adult'],prefix:['最近ちょっとだけ生活が変わりまして、','友達と話してて気になったんですが、','休みの日にふと思ったんですけど、','最近まわりで流行ってるものがあって、','なんとなく気分転換したくて、'],q:['最近ハマってることはありますか？','休日の理想の過ごし方は何ですか？','地元の好きなところってありますか？','買ってよかったものありますか？','昔は苦手だったけど今は好きなものありますか？']},
 silly:{label:'どうでもいい質問',ages:['student','young','adult','chaos'],prefix:['人生に関係ないんですけど、','友達と揉めるほどではないんですが、','どうでもいいのに気になって眠れません。','家でひとりで考えてたんですが、','コメント欄なら決着つくと思って送ります。'],q:['風呂でどこから洗うタイプですか？','カレーは混ぜる派ですか？そのまま派ですか？','ポテトは細い派ですか？太い派ですか？','コンビニ入ったら最初どこ見ますか？','寝る時、足だけ布団から出しますか？','グミは噛みますか？溶かしますか？','冷蔵庫を開けて何も取らずに閉めることありますか？','イヤホンは片耳派ですか？両耳派ですか？','目玉焼きには何かけますか？','ラーメンの海苔はいつ食べますか？','歯磨き中に歩き回るタイプですか？','靴下は右から履きますか？左からですか？']},
 worry:{label:'お悩み相談',ages:['student','young','adult'],prefix:['ちょっとだけ相談です。','誰かに聞いてほしくてメールしました。','最近モヤモヤしていることがあって、','たいした悩みじゃないかもしれませんが、','自分だけかもしれないんですが、'],q:['飽き性で何も続きません。どうしたらいいですか？','人に気を使いすぎて疲れます。どう切り替えますか？','好きなことを仕事にするのってありだと思いますか？','友達との距離感がたまに難しいです。どうしてますか？','失敗を引きずるタイプです。切り替え方ありますか？','やる気が出ない日に最低限やることってありますか？']},
 chaos:{label:'カオス',ages:['chaos'],prefix:['さっき冷蔵庫と目が合いました。','夢の中でカラスに説教されました。','唐揚げを見てたら人生が分からなくなりました。','右の靴下だけ反抗期です。','うちのクッションが全部を知ってる顔をしています。'],q:['唐揚げはおかずですか？主役ですか？','人生を調味料で例えるなら何ですか？','もし冷蔵庫が喋ったら最初に何て言われたいですか？','布団から出る時の必殺技名をつけるなら？','世界で一番弱そうな魔法名を考えてください。']},
 host:{label:'枠主プロフィール寄せ',ages:['young','adult'],prefix:['プロフィールを見て気になったんですが、','最近配信を見てて思ったんですが、','枠主さんに聞いてみたいことがあります。','自分も始めてみたいなと思っていて、'],q:['最近いちばんハマってることは何ですか？','好きなものを長く楽しむコツってありますか？','趣味を始める時、最初に何からやりますか？','配信で話しやすいテーマって何ですか？','自分らしさってどうやって出してますか？']}
};
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function hostWords(){try{const h=window.state&&state.hostProfile||{};let arr=[];['favoriteThings','hobbies','frequentTopics','streamGenres'].forEach(k=>{if(Array.isArray(h[k]))arr.push(...h[k]);else if(typeof h[k]==='string')arr.push(...h[k].split(/\n+/));}); return arr.map(x=>String(x).trim()).filter(Boolean);}catch(e){return []}}
function makeRadioMail(cat){let keys=Object.keys(banks); if(!cat||cat==='all') cat=pick(keys); const b=banks[cat]||banks.talk; const age=pick(b.ages); const rn=pick(ageRns[age]||ageRns.young); let pre=pick(b.prefix), q=pick(b.q); const hw=hostWords(); if(cat==='host'&&hw.length){const w=pick(hw); pre=`最近「${w}」が気になっていて、`; q=`${(state.hostProfile&&state.hostProfile.name)||'枠主'}さんは${w}のどんなところが好きですか？`;}
 return {rn:`RN：${rn}`,meta:`${b.label} / ${age==='student'?'学生っぽい':age==='adult'?'30〜40代っぽい':age==='chaos'?'年齢不詳':'20〜30代っぽい'}`,letter:pre+'\n'+q,fav:false,cat};}
function radioState(){window.state=window.state||{}; state.radioDj=state.radioDj||{history:[],index:-1}; return state.radioDj;}
window.renderRadioDj=function(){const rs=radioState(); const cur=rs.history[rs.index]||makeRadioMail('silly'); if(rs.index<0){rs.history.push(cur);rs.index=0;if(window.save)save();}
 const set=(id,v)=>{const el=document.getElementById(id); if(el) el.textContent=v}; set('radioDjRn',cur.rn+(cur.fav?' ★':'')); set('radioDjMeta',cur.meta); set('radioDjLetter',cur.letter); set('radioDjHistory',`履歴 ${rs.index+1} / ${rs.history.length}`); const fav=document.getElementById('radioDjFavBtn'); if(fav) fav.textContent=cur.fav?'★お気に入り解除':'★お気に入り';};
window.nextRadioDj=function(){const sel=document.getElementById('radioDjCategory'); const cur=makeRadioMail(sel?sel.value:'all'); const rs=radioState(); rs.history=rs.history.slice(0,rs.index+1); rs.history.push(cur); rs.index=rs.history.length-1; if(window.save)save(); renderRadioDj();};
window.moveRadioDj=function(d){const rs=radioState(); if(!rs.history.length)return; rs.index=Math.max(0,Math.min(rs.history.length-1,rs.index+d)); if(window.save)save(); renderRadioDj();};
window.toggleRadioFav=function(){const rs=radioState(); const cur=rs.history[rs.index]; if(cur){cur.fav=!cur.fav;if(window.save)save();renderRadioDj();}};
document.addEventListener('DOMContentLoaded',function(){const n=document.getElementById('radioDjNextBtn'),p=document.getElementById('radioDjPrevBtn'),f=document.getElementById('radioDjForwardBtn'),fav=document.getElementById('radioDjFavBtn'),cat=document.getElementById('radioDjCategory'); if(n)n.onclick=nextRadioDj; if(p)p.onclick=()=>moveRadioDj(-1); if(f)f.onclick=()=>moveRadioDj(1); if(fav)fav.onclick=toggleRadioFav; if(cat)cat.onchange=nextRadioDj; try{renderRadioDj()}catch(e){}});
})();
