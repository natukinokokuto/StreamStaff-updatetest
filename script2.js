
const KEY="stream_manager_integrated_v1";
function ym(d){
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  return `${y}-${m}`;
}
const kana=["一","二","三","四","五","六"];
const pipMap={
  1:[5],
  2:[1,9],
  3:[1,5,9],
  4:[1,3,7,9],
  5:[1,3,5,7,9],
  6:[1,3,4,6,7,9]
};
function setDice(el,num){
  el.dataset.value=num;
  el.innerHTML=pipMap[num].map(pos=>`<span class="pip p${pos} ${num===1?"red":""}"></span>`).join("");
}
const defaultState={
  logs:[],
  tree:{
    trunk:"今日のメインテーマを決める",
    branch:"話が止まった時の逃げ道",
    leaf:"コメントが増えたポイント"
  },
  listeners:[
    {name:"ジャック",days:[1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,30,31],memo:"ほぼ皆勤。強い常連。",penalty:0,registeredDate:"",birthday:""},
    {name:"くる",days:[1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,18,20,21,22,23,24,25,26,29,30,31],memo:"ログボ管理対象。",penalty:0,registeredDate:"",birthday:""},
    {name:"ドク",days:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,19,21,22,23,24,25,26,27,28,29,30,31],memo:"救ってあげたい / 200",penalty:0,registeredDate:"",birthday:""}
  ],
  rewards:[
    {days:7,name:"週達成：リング / ヘッダー / ロック / しめじ"},
    {days:14,name:"14日達成：個通30分"},
    {days:31,name:"皆勤賞：リアルグッズ or 通話券1時間"}
  ],
  gameHistory:[],
  chLog:[],
  settings:{bgmVolume:45,seVolume:80,alarmVolume:80},
  chin:{
    mode:"normal",
    diceCount:3,
    diceNames:["サイコロ1","サイコロ2","サイコロ3","サイコロ4","サイコロ5","サイコロ6"],
    customDice:[
      {1:"罰ゲーム",2:"一発ギャグ",3:"水を飲む",4:"英語で一言",5:"自慢話",6:"歌う"},
      {1:"罰ゲーム",2:"一発ギャグ",3:"水を飲む",4:"英語で一言",5:"自慢話",6:"歌う"},
      {1:"罰ゲーム",2:"一発ギャグ",3:"水を飲む",4:"英語で一言",5:"自慢話",6:"歌う"},
      {1:"小話",2:"質問",3:"モノマネ",4:"昔話",5:"暴露",6:"褒める"},
      {1:"右の人",2:"左の人",3:"初見",4:"常連",5:"自分",6:"全員"},
      {1:"10秒",2:"30秒",3:"1分",4:"3分",5:"次の枠",6:"今日は封印"}
    ],
    localMap:{}
  },
  calendarEvents:[],
  monthlyEvents:[],
  yearlyEvents:[],
  calendarTypes:[
    {name:"登録日",color:"#10b981"},
    {name:"返礼品獲得日",color:"#f59e0b"},
    {name:"配信メモ",color:"#8b5cf6"},
    {name:"ペナルティー",color:"#ef4444"},
    {name:"約束",color:"#38bdf8"},
    {name:"その他",color:"#94a3b8"},
    {name:"誕生日",color:"#ec4899"}
  ],
  logboMonth:"",
  polls:[
    {
      id:"poll_sample_1",
      title:"今日どの企画からやる？",
      options:[
        {text:"チンチロ",votes:0},
        {text:"雑談",votes:0},
        {text:"大喜利",votes:0}
      ],
      memo:"URL投票は外部連携が必要。今は手動集計用。"
    }
  ],
  countdowns:[
    {
      id:"cd_newyear",
      title:"新年度",
      target:"2027-04-01T00:00:00",
      sound:"assets/countdown/学校のチャイム.mp3"
    }
  ],
  roulette:{
    items:["チンチロ","大喜利","雑談","罰ゲーム","歌う","モノマネ"],
    history:[]
  },
  tools:{
    counters:[
      {id:"c_sample_1",name:"ツッコミ回数",value:0},
      {id:"c_sample_2",name:"水飲み回数",value:0}
    ],
    timers:[
      {id:"t_sample_1",name:"休憩",duration:180,remaining:180,running:false,sound:"hato1",done:false},
      {id:"t_sample_2",name:"企画残り",duration:300,remaining:300,running:false,sound:"alarm_clock",done:false}
    ],
    endurance:{
      mode:"timer",
      title:"カウントアップタイマー",
      timerSound:"alarm_clock",
      timerDuration:180,
      timerRemaining:180,
      timerRunning:false,
      counterGoal:100,
      counterValue:0,
      buttons:[
        {id:"ed_btn_1",name:"ギフト +30秒",value:30,unit:"seconds",color:"#38bdf8"},
        {id:"ed_btn_2",name:"NGワード +10秒",value:10,unit:"seconds",color:"#fb7185"},
        {id:"ed_btn_3",name:"コメント +1",value:1,unit:"count",color:"#a78bfa"}
      ]
    },
    kuji:{
      prizes:[
        {id:"kuji_a",name:"A賞",count:1,drawn:0,color:"#f59e0b"},
        {id:"kuji_b",name:"B賞",count:2,drawn:0,color:"#38bdf8"},
        {id:"kuji_c",name:"C賞",count:5,drawn:0,color:"#a78bfa"},
        {id:"kuji_hazure",name:"ハズレ",count:10,drawn:0,color:"#64748b"}
      ],
      lastOne:"ラストワン賞",
      history:[]
    },
    tiles:{
      title:"12星座コンプ",
      mode:"normal",
      free:false,
      items:["牡羊座","牡牛座","双子座","蟹座","獅子座","乙女座","天秤座","蠍座","射手座","山羊座","水瓶座","魚座"].map((name,i)=>({id:"tile_zodiac_"+i,name,done:false}))
    }
  },
  customGames:{
    animalAnimals:["猫", "犬", "ゾウ", "牛", "キツネ", "ハト", "ゴリラ", "サル", "馬", "深夜のコンビニ店員", "クアッカワラビー", "マヌルネコ", "ハダカデバネズミ", "オカピ", "ヤブイヌ", "アイアイ", "カピバラ", "ウォンバット", "コビトカバ", "ビントロング", "フェネック", "スナネコ", "カラカル", "サーバル", "ラーテル", "ミーアキャット", "アルマジロ", "センザンコウ", "バク", "ナマケモノ", "アリクイ", "カモノハシ", "ハリモグラ", "タスマニアデビル", "キーウィ", "ハシビロコウ", "ヘビクイワシ", "ライチョウ", "エミュー", "カカポ", "アホウドリ", "シロイルカ", "イッカク", "ジュゴン", "マナティー", "ラッコ", "アザラシ", "ウミウシ", "メンダコ", "ダイオウグソクムシ", "チンアナゴ", "リュウグウノツカイ", "クリオネ", "カブトガニ", "オオサンショウウオ", "ウーパールーパー", "ベルツノガエル", "フトアゴヒゲトカゲ", "ゲッコー", "カメレオン", "カマキリ", "タランチュラ", "サソリ", "モモンガ", "プレーリードッグ", "レッサーパンダ", "シマエナガ", "アカクラゲ", "デンキウナギ", "ピラルク"],
    animalTopics:["簡単にできる料理", "昔流行ったもの", "身につけるもの", "虫の名前", "冬に使うもの", "配信で起きがちなこと", "初見挨拶", "一番似合う職業", "配信タイトル", "決め台詞", "コンビニで買いそうな物", "好きそうなラーメン", "カラオケ十八番", "絶対言わなそうな一言", "配信で炎上しない謝罪文", "LINEの返信速度", "恋愛相談された時の答え", "遅刻した時の言い訳", "スマホの待ち受け", "旅行先で最初にすること", "居酒屋で頼む一品目", "ダーツの投げ方", "筋トレの掛け声", "寝起きの第一声", "謎のこだわり", "弱点っぽいもの", "実は得意そうなこと", "絶対苦手そうなこと", "視聴者へのお願い", "誕生日プレゼント", "一日店長した時の売り文句", "バンド名", "必殺技名", "負け惜しみ", "勝った時のドヤ顔コメント", "深夜テンションの発言", "プロフィール欄", "推し活の仕方", "学校でのあだ名", "地元での立ち位置", "仕事でやらかしそうなこと", "雨の日の過ごし方", "夏祭りで買うもの", "冬に欲しがるもの", "一番似合うBGM", "サムネに書かれる煽り文", "握手会で言いそうなこと", "寝る前のルーティン", "配信の締め方", "コメント欄への圧", "謝り方", "褒められた時の返し", "謎に強そうな能力", "課金したくなるポイント", "メンタルが折れる瞬間", "一番似合う絵文字"],
    ogiri:["身につけるものっぽく一番くだらないことを言って", "深夜のコンビニ店員が急に言いそうな一言", "猫が配信者だった時の初見挨拶", "絶対に盛り上がらないイベント名", "絶対に登録者が増えない配信タイトルとは？", "初見さんが3秒で逃げた理由とは？", "コンビニ店員が急にラスボス感を出した一言とは？", "世界一どうでもいい重大発表とは？", "絶対に弱い必殺技名とは？", "配信者が寝落ち直前に言った名言とは？", "お母さんが急にVTuberデビュー。最初の挨拶は？", "このラーメン屋、配信者向けすぎる。なぜ？", "ダーツバーで一番言っちゃダメな一言とは？", "ギター初心者が言いがちなプロっぽい一言とは？", "「これは案件じゃないです」の後に続いた怪しい一言とは？", "世界一テンションが低いコール＆レスポンスとは？", "視聴者全員が「え？」となった罰ゲームとは？", "AIが考えた最悪のデートプランとは？", "朝礼で言ったら会社がざわつく一言とは？", "絶対に流行らないSNSの新機能とは？", "美容室で言われたら不安になる一言とは？", "一番ダサい魔王の弱点とは？", "ガチで要らないスマホ通知とは？", "「今日の配信は安全です」なぜ信用できない？", "カラオケで一瞬で空気が変わった選曲とは？", "絶対にモテない自己紹介とは？", "居酒屋の新メニュー「枠主セット」中身は？", "地元のヤンキーが急に丁寧語になった理由とは？", "誰も得しないランキング第1位とは？", "「それ褒めてる？」と思った一言とは？", "ゲームのラスボスが配信慣れしていた時の一言とは？", "視聴者にしか伝わらない謎ルールとは？", "「この人、常連だな」と分かる行動とは？", "寝坊した配信者の新しい言い訳とは？", "絶対に泣けない感動シーンとは？", "強そうで弱いチーム名とは？", "配信画面に一瞬映ってはいけないものとは？", "一番雑な謝罪会見の第一声とは？", "世界一浅い人生相談の答えとは？", "絶対にバズらないハッシュタグとは？", "先生が配信者だった時の宿題とは？", "未来の自分から来たのに言うことがショボい。何て言った？", "「BAN回避しました」と言いながら危ない理由とは？", "誰も覚えられない新ルールとは？", "コメント欄が一斉に黙った一言とは？", "一番信用できない占い結果とは？", "駅員さんが急に詩人になった一言とは？", "絶対に負けたくないしょうもない勝負とは？", "配信者専用の四字熟語とは？", "一番嫌なサプライズとは？", "パスワードのヒントが怖すぎる。何？", "桃太郎が現代の配信者だったら最初に何をする？", "世界一小さい炎上理由とは？", "コメントで来たら困る質問とは？"],
    line:["分からない……何も思い出せない……。何で炊けた米が部屋中に塗りたくられてるんだ……！？", "それはもう、ほぼ事件じゃん。", "ちょっと待って、話の枝が折れた。", "いま誰がこの空気の責任取るの？", "「今日の俺、ちょっとだけ伝説寄りじゃない？」", "「待って、今の沈黙にも著作権ある？」", "「その一言、俺のメンタルにクリティカル入ってる」", "「俺の中の小さい審査員が全員札を上げてる」", "「今のは恋じゃない。通信エラーだ」", "「安心して。まだギリギリ人間側にいる」", "「そのノリ、深夜二時なら国宝だよ」", "「ちょっと待て、ツッコミが渋滞してる」", "「この空気、誰か領収書切ってくれ」", "「俺のビジュ、今日だけログインボーナス付いてる」", "「やめろ、その優しさは効く」", "「今のコメント、心のスクショ撮った」", "「俺が悪いんじゃない。テンションが先に走った」", "「それ以上言うと、俺の中のPTAが動く」", "「大丈夫、これは下ネタじゃない。概念だ」", "「ちょっと大人の階段、手すり持って降りようか」", "「その話はカーテン閉めてからにしよう」", "「今の発言、配信的には薄目で見よう」", "「それは匂わせじゃなくて、香りの暴走」", "「危ない単語は全部ピー音に就職しました」", "「俺の理性、いま有給取ってる」", "「帰り道、あと一駅だけ遠回りしない？」", "「言い方だけイケボにしたら全部許されると思うなよ」", "「ベイベェ、今日の水道水、やけにエモいな」", "「この胸騒ぎ、たぶん通知音のせい」", "「君の既読、俺の心拍数より正確だね」", "「今の俺、だいぶ主人公の友達ポジ」", "「その角度から褒める人、初めて見た」", "「待って、今の俺ちょっと名言っぽくなかった？」", "「俺の辞書に不可能はない。説明書はある」", "「この場を借りて言います。借りた場は返します」", "「好きって言ってない。高評価って言った」", "「その誘惑、サムネなら釣られてた」", "「俺たちの関係？コメント欄と固定コメントくらいかな」", "「やばい、今の流れにBGMが追いついてない」", "「俺の中のホストが水を頼めって言ってる」", "「その笑い方、課金ボイスにしよう」", "「今だけ俺をラスボス前の村人だと思って聞いて」", "「その発想、冷蔵庫の奥から出てきた？」", "「今日の俺は優しいぞ。昨日の俺に怒られたからな」", "「そこまで言うなら、俺も小声で乗る」", "「今のセリフ、家族の前では再放送禁止ね」", "「安心して、BANの手前でちゃんと土下座してる」", "「これは事故じゃない。企画の呼吸だ」", "「コメント欄、今のは聞かなかったことにして」", "「俺の青春、だいたい充電切れだった」", "「その顔、絶対コンビニでプリン選んでる時の顔じゃん」", "「今日の俺、たぶん3割くらい湘南の風」", "「世界が俺に追いついてない。主に洗濯物が」", "「その質問、答えた瞬間に人生のログが残るやつ」"],
    when:["昨日", "今日", "朝", "明日", "おととい", "去年", "昼に", "夕方に", "夜に", "誕生日に", "配信開始3秒後に", "深夜2時22分に", "給料日前日に", "月曜日の朝に", "雨で靴下が終わった日に", "誕生日の0時ちょうどに", "美容室のシャンプー中に", "コンビニのレジ前で", "ダーツで負けた直後に", "カラオケのサビ前に", "寝落ち寸前に", "アラーム5個目で起きた瞬間に", "初見さんが来た瞬間に", "コメントが止まった時に", "風呂上がり3分後に", "ご飯炊き忘れに気づいた時に", "スマホ残り1％で", "推しの通知が来た瞬間に", "職場で休憩に入った瞬間に", "夜中に冷蔵庫を開けた時に", "Wi-Fiが切れた瞬間に", "洗濯機が終わった音の直後に", "花火大会の帰り道で", "雪の日の朝に", "免許更新の写真撮影前に", "ライブ前の楽屋で", "配信を切ったと思った直後に", "親が部屋に入ってきた瞬間に", "宅配便が来た瞬間に", "寝癖が限界の日に"],
    who:["お母さんが", "酔っ払いが", "猫が", "常連が", "初見さんが", "師匠が", "枠主が", "古参リスナーが", "ROM専が", "妹が", "近所のおじさんが", "コンビニ店員が", "職場の先輩が", "地元の友達が", "ギターの神様が", "ダーツのライバルが", "AIアシスタントが", "ハシビロコウが", "未来の自分が", "過去の自分が", "ラスボスが", "校長先生が", "美容師さんが", "宅配のお兄さんが", "居酒屋の店長が", "駅員さんが", "謎のイケボが", "自称プロデューサーが", "寝起きの自分が", "コメント欄の総意が", "常連メンバーが", "通りすがりの犬が", "宇宙人が"],
    where:["コンビニで", "配信画面の裏で", "公園で", "居酒屋で", "ダーツバーで", "風呂場で", "駅のホームで", "美容室で", "布団の中で", "車の中で", "職場の休憩所で", "スーパーの惣菜前で", "カラオケで", "ライブハウスで", "公園のベンチで", "ファミレスで", "ラーメン屋で", "海沿いで", "湘南の風を浴びながら", "エレベーターの中で", "信号待ちで", "楽器部屋で", "ゲームセンターで", "病院の待合室で", "市役所で", "友達の家で", "夢の中で", "コメント欄で", "サムネの中で", "謎の会議室で", "月面で"],
    what:["急に歌い出した", "米を炊きすぎた", "名言っぽいことを言った", "謎のルールを作った", "コメント欄を凍らせた", "急に名言っぽいことを言った", "謎の謝罪会見を始めた", "初見挨拶を噛んだ", "高評価をお願いしながら自分で照れた", "水を飲むだけで拍手された", "自分の名前を忘れた", "コメント欄に説教された", "ギターソロのつもりで鼻歌を始めた", "ダーツのフォームを語り出した", "謎のランキングを発表した", "一番いらない能力を手に入れた", "いきなり小声で勝利宣言した", "レシートを見て人生を悟った", "スマホに向かって土下座した", "しょうもない嘘をすぐ認めた", "配信タイトルを3回変えた", "謎の横文字で乗り切ろうとした", "語尾だけイケボになった", "BAN回避のために急に敬語になった", "突然カーテンに話しかけた", "冷蔵庫のプリンと和解した", "初恋みたいな顔で唐揚げを見た", "世界平和より晩ご飯を優先した", "サムネ詐欺を自白した", "謎の手拍子を求めた", "一人でコール＆レスポンスした", "負けたのに勝者インタビューを受けた", "靴下に人生相談した", "「これは企画です」と言い張った"],
    bob:["アクセル", "エンジン", "オイル", "オートマチック", "ガソリン", "ガソリンスタンド", "カバー", "ガレージ", "アプローチ", "ジュース", "ランプ", "サブスク", "スマホ", "アプリ", "コメント", "フォロー", "チャンネル", "ログイン", "パスワード", "スクショ", "サムネ", "アイコン", "プロフィール", "ダウンロード", "アップデート", "バグ", "バックアップ", "クラウド", "リモコン", "エアコン", "イヤホン", "マイク", "ギター", "アンプ", "コード", "ライブ", "スタジオ", "ドラム", "ベース", "エフェクター", "カラオケ", "コンビニ", "スーパー", "レシート", "ポイントカード", "ラーメン", "チャーハン", "ハンバーグ", "プリン", "アイス", "コーヒー", "カレンダー", "アラーム", "タイマー", "ランキング", "ルーレット", "チンチロ", "ダーツ", "ブル", "トリプル", "ゼロワン", "ファッション", "パーカー", "スニーカー", "ジーンズ", "ベルト", "ヘアワックス", "シャンプー", "ドライヤー", "エレベーター"],
    relo:["マーボー豆腐", "チャンジャ", "鮭とば", "たこわさ", "だし巻きたまご", "枝豆", "焼きナス", "冷やしトマト", "もつ鍋", "軟骨のから揚げ", "サラリーマン", "オーダーメイド", "ガソリンスタンド", "コンセント", "ノートパソコン", "キーホルダー", "ベビーカー", "ペットボトル", "フライドポテト", "シュークリーム", "ホットケーキ", "アイスコーヒー", "モーニングコール", "クレーム", "リフォーム", "リサイクルショップ", "バイキング", "コインランドリー", "パワハラ", "セクハラ", "ノンアル", "テイクアウト", "テーブルチャージ", "フリーダイヤル", "ワンピース", "スキンシップ", "マイブーム", "リベンジ", "レベルアップ", "スキルアップ", "サインペン", "シャープペン", "ビニール袋", "ダンボール", "ホームセンター", "ゲームセンター", "ライブハウス", "タレント", "アイドル", "グラビア", "テンション", "ハイテンション", "ローテンション", "ナイーブ", "ドンマイ", "ファイト", "サービスエリア", "バックミラー", "ウインカー", "フロントガラス", "ハンドルキーパー", "キッチンペーパー", "サランラップ", "電子レンジ", "オーブントースター", "フリーサイズ", "オーバーオール", "マンツーマン", "キャッチコピー", "イメージチェンジ", "スキンヘッド", "モーニングセット", "カンニング", "アルバイト", "パート", "サラダバー", "ドリンクバー", "ソフトクリーム", "タッチパネル", "セルフレジ", "ガードマン", "ベテラン", "デッドボール", "ナイター", "ゲームオーバー"]
  }
};
let state=load();
state.settings = state.settings || structuredClone(defaultState.settings);
if(typeof state.settings.alarmVolume!=="number") state.settings.alarmVolume=80;
state.polls = state.polls || structuredClone(defaultState.polls || []);
state.ui = Object.assign({pollOpen:false,rouletteOpen:true,countersOpen:true,timersOpen:true,countdownsOpen:true}, state.ui || {});
state.ui = Object.assign({pollOpen:false,rouletteOpen:true,countersOpen:true,timersOpen:true,countdownsOpen:true}, state.ui || {});
    state.countdowns = state.countdowns || structuredClone(defaultState.countdowns || []);
state.countdowns.forEach(c=>{
  if(typeof c.sound!=="string") c.sound="assets/countdown/学校のチャイム.mp3";
  if(typeof c.finishedPlayed!=="boolean") c.finishedPlayed=false;
});
    state.tools = state.tools || structuredClone(defaultState.tools);
state.tools.counters = state.tools.counters || [];
state.tools.timers = state.tools.timers || [];
state.tools.endurance = state.tools.endurance || structuredClone(defaultState.tools.endurance);
state.tools.endurance.buttons = state.tools.endurance.buttons || [];
if(typeof state.tools.endurance.timerDuration !== "number") state.tools.endurance.timerDuration = 180;
if(typeof state.tools.endurance.timerRemaining !== "number") state.tools.endurance.timerRemaining = state.tools.endurance.timerDuration;
if(typeof state.tools.endurance.counterGoal !== "number") state.tools.endurance.counterGoal = 100;
if(typeof state.tools.endurance.counterValue !== "number") state.tools.endurance.counterValue = 0;
state.tools.kuji = state.tools.kuji || structuredClone(defaultState.tools.kuji);
state.tools.kuji.prizes = state.tools.kuji.prizes || [];
state.tools.kuji.history = state.tools.kuji.history || [];
state.tools.kuji.prizes.forEach(p=>{ if(typeof p.drawn!=="number") p.drawn=0; if(!p.color) p.color="#f59e0b"; });
state.tools.tiles = state.tools.tiles || structuredClone(defaultState.tools.tiles);
state.tools.tiles.items = state.tools.tiles.items || [];
if(!state.tools.tiles.mode) state.tools.tiles.mode = 'normal';
if(typeof state.tools.tiles.free !== 'boolean') state.tools.tiles.free = false;
state.tools.tiles.items.forEach((t,i)=>{ if(!t.id) t.id=uid('tile'); if(typeof t.done!=="boolean") t.done=false; if(!t.name) t.name=`タイル${i+1}`; });

state.chin = state.chin || structuredClone(defaultState.chin);
state.chin.diceCount = state.chin.diceCount || 3;
state.chin.diceNames = state.chin.diceNames || structuredClone(defaultState.chin.diceNames);
state.chin.customDice = state.chin.customDice || structuredClone(defaultState.chin.customDice);
while(state.chin.diceNames.length<6) state.chin.diceNames.push(`サイコロ${state.chin.diceNames.length+1}`);
while(state.chin.customDice.length<6) state.chin.customDice.push(structuredClone(defaultState.chin.customDice[state.chin.customDice.length] || defaultState.chin.customDice[0]));
state.chin.localMap = state.chin.localMap || {};
state.customGames = state.customGames || structuredClone(defaultState.customGames);
for (const k in defaultState.customGames) {
  state.customGames[k] = state.customGames[k] || structuredClone(defaultState.customGames[k]);
  defaultState.customGames[k].forEach(item=>{
    if(!state.customGames[k].includes(item)) state.customGames[k].push(item);
  });
}
state.listeners = state.listeners || [];
state.calendarEvents = state.calendarEvents || [];
state.monthlyEvents = state.monthlyEvents || [];
state.yearlyEvents = state.yearlyEvents || [];
state.calendarTypes = state.calendarTypes || structuredClone(defaultState.calendarTypes || []);
if(!state.calendarTypes.length) state.calendarTypes = structuredClone(defaultState.calendarTypes || []);
    if(!state.calendarTypes.some(t=>t.name==="誕生日")) state.calendarTypes.push({name:"誕生日",color:"#ec4899"});
if(!state.calendarTypes.some(t=>t.name==="誕生日")) state.calendarTypes.push({name:"誕生日",color:"#ec4899"});
    state.polls = state.polls || structuredClone(defaultState.polls || []);
state.logboMonth = state.logboMonth || ym(new Date());
state.listeners.forEach(l=>{
  if(typeof l.penalty!=="number") l.penalty=0;
  if(typeof l.registeredDate!=="string") l.registeredDate="";
  if(typeof l.birthday!=="string") l.birthday="";
  if(typeof l.birthYear!=="string") l.birthYear="";
  if(typeof l.bloodType!=="string") l.bloodType="";
  if(typeof l.firstVisitDate!=="string") l.firstVisitDate="";
  if(typeof l.nickname!=="string") l.nickname="";
  if(typeof l.searchYomi!=="string") l.searchYomi="";
  if(typeof l.searchTags!=="string") l.searchTags="";
  if(!l.favorites) l.favorites={};
  ["project","game","food","area","music","anime","habit","free1","free2","ngTopic","dislikeFood","firstGame","mainWeapon","holiday","bgm","localThing","season","animal","oshi","firstStream","oneLine","teaseLine"].forEach(k=>{ if(typeof l.favorites[k]!=="string") l.favorites[k]=""; });
  if(!Array.isArray(l.topicSeeds)) l.topicSeeds=[];
  l.logboByMonth = l.logboByMonth || {};
  if(Array.isArray(l.days) && !l.logboByMonth[state.logboMonth]){
    l.logboByMonth[state.logboMonth] = [...l.days].sort((a,b)=>a-b);
  }
});
let selectedListener=0;
let selectedGame="animal";



const serifTemplates = {
  all:[
    {lv:1,t:[
      "「ちょっと待って、今の言い方だけもう一回もらっていい？」",
      "「今の空気、なんか名前つけたくなるな。」",
      "「その一言で、急にこの場がドラマっぽくなったんだけど。」",
      "「なんでそんな自然に人の心を揺らしてくるんだよ。」",
      "「今のはズルい。普通に反応に困るやつ。」",
      "「その笑い方、ちょっと平和すぎるだろ。」",
    ]},
    {lv:2,t:[
      "「お前さ、そういうことサラッと言うから勘違いされるんだぞ。」",
      "「今の距離感、友達って言い張るには近すぎるって。」",
      "「その優しさ、こっちの心に無断で入ってきたぞ。」",
      "「待て待て、今のはコメント欄より先に俺がざわついた。」",
      "「そういう顔するなって。こっちはまだ普通の会話してるつもりなんだよ。」",
      "「今の沈黙、なんか意味ありそうで困るんだけど。」",
    ]},
    {lv:3,t:[
      "「その声のトーン、深夜に聞いたら普通に事故るって。」",
      "「その距離でその冗談は、こっちの情緒が持たない。」",
      "「今の空気、詳しく説明すると配信が変な方向行くからやめとく。」",
      "「お前のその余裕、たぶん人を狂わせるタイプだぞ。」",
      "「その一言、冗談で流すにはちょっと効きすぎた。」",
      "「今のはダメだ。笑ってごまかしてるけど、普通に刺さってる。」",
    ]},
    {lv:4,t:[
      "「それ以上は言うな。俺の中のコンプラ担当が立ち上がった。」",
      "「今の続きは、配信じゃなくて各自の想像に任せます。」",
      "「その空気、ピー音が靴履いて走ってくるタイプだぞ。」",
      "「危ない危ない、今ちょっと配信の端っこが揺れた。」",
      "「これ以上踏み込むと、コメント欄が急に水を飲み始める。」",
    ]}
  ],
  confess:[
    {lv:1,t:[
      "「帰り道、もうちょい遠回りしない？」",
      "「お前と話してる時間、なんか終わるの早いんだよな。」",
      "「今日、会えて普通に嬉しかった。」",
      "「また明日も、同じ時間に話せたらいいな。」",
      "「お前が笑ってると、なんか安心する。」",
      "「好きって言うには早いかもだけど、気になってるのは本当。」",
      "「その“またね”が聞きたくて、帰るの遅くしてる。」",
      "「たぶん俺、お前といる時だけちょっと素直になれる。」",
    ]},
    {lv:2,t:[
      "「正直さ、お前から通知来ると普通にテンション上がる。」",
      "「友達って言えば楽だけど、それだけじゃ足りなくなってきた。」",
      "「お前のこと考えてる時間、思ってたより多いんだよ。」",
      "「冗談っぽく言うけど、ちゃんと好きだよ。」",
      "「その優しさ、俺だけに向けてくれたらいいのにって思った。」",
      "「今日の帰り、隣にいるのがお前でよかった。」",
      "「なんかさ、お前と話す前だけちょっと緊張する。」",
      "「お前の特別枠、空いてるなら入りたい。」",
    ]},
    {lv:3,t:[
      "「寝る前に思い出す顔が、お前になってるんだよ。」",
      "「深夜に声聞きたくなる相手って、もうだいぶ特別だろ。」",
      "「友達のままでいたい気持ちと、もう無理だろって気持ちが喧嘩してる。」",
      "「お前の何気ない一言で、こっちは一日引きずってる。」",
      "「好きって言ったら困る？ 困っても、たぶん言うけど。」",
      "「その距離で笑われると、もう平気なふりできない。」",
      "「今だけでいいから、俺のことちょっと意識して。」",
      "「たぶんさ、お前が思ってるより、ずっと好き。」",
    ]},
    {lv:4,t:[
      "「これ以上近くにいられると、好きって言葉だけじゃ足りなくなる。」",
      "「冗談に逃げたいけど、今のは本気で言ってる。」",
      "「今ここで言うのズルいけど、誰にも取られたくない。」",
      "「その目で見られると、配信用の余裕が全部消える。」",
      "「続きは言わない。言ったらたぶん空気が戻れなくなる。」",
    ]}
  ],
  gal:[
    {lv:1,t:[
      "「え待って、今の普通にかわいくない？」",
      "「それは優勝。異論ある人コメントで戦お？」",
      "「今の“おつかれ”の言い方、地味に刺さるんだけど。」",
      "「ガチで？ そういう優しさ自然に出るタイプ？」",
      "「その笑い方、普通にずるいんだけどｗ」",
      "「え、今の見た？ ちょっとキュン案件じゃない？」",
    ]},
    {lv:2,t:[
      "「その“別に？”、絶対別にじゃないやつじゃんｗ」",
      "「無理無理、その余裕は沼。こっち足首まで入った。」",
      "「そういうとこ自然にやるの、ほんとズルいて。」",
      "「その返信の速さ、期待させるからやめな？」",
      "「今の一言、スクショして友達に相談するレベルなんだけど。」",
      "「かわいいって言われ慣れてない顔するの、逆にかわいいから。」",
    ]},
    {lv:3,t:[
      "「その声のトーン、深夜に聞いたら普通に事故るって。」",
      "「友達の顔して心拍数だけ上げてくるのやめて？」",
      "「その距離感なに？ 近いって言ったら負けな空気じゃん。」",
      "「今の“来る？”はずるい。言い方に罠ある。」",
      "「え、待って。今のは好きになる側にも責任ない？」",
      "「その目で“何もしてない”は無理があるんだけど。」",
    ]},
    {lv:4,t:[
      "「それ以上はダメ。ギャルの勘が配信の危険を察知してる。」",
      "「今の続き、言葉にしたらコメント欄が一回静かになるやつ。」",
      "「その空気はスタンプで誤魔化すしかないって。」",
      "「はいストップ。今のは心のモザイク案件です。」",
    ]}
  ],
  yankee:[
    {lv:1,t:[
      "「おい、今の笑い方なんだよ。調子狂うだろ。」",
      "「ったく、そういうとこ嫌いじゃねぇんだよな。」",
      "「お前さ、無防備で笑うのやめろって。」",
      "「別に心配してねぇよ。見てただけだ。」",
      "「その顔で“大丈夫”って言うな。全然大丈夫そうじゃねぇだろ。」",
      "「隣歩くなら、ちゃんとついてこいよ。」",
    ]},
    {lv:2,t:[
      "「勝手に隣歩いてくんな。勘違いすんだろ。」",
      "「お前が困ってたら、そりゃ行くだろ。理由いるか？」",
      "「その余裕、俺の前でだけにしとけよ。」",
      "「泣きそうな顔すんな。こっちが何も言えなくなる。」",
      "「お前だけ特別扱い？ うるせぇ、見ればわかんだろ。」",
      "「強がんな。そういうの、こっちは見抜いてんだよ。」",
    ]},
    {lv:3,t:[
      "「その距離で見上げてくんな。普通に危ねぇだろ。」",
      "「お前のその一言で、こっちは一日引きずってんだよ。」",
      "「他のやつに同じ顔すんな。……いや、今のは忘れろ。」",
      "「今だけ素直に言うわ。お前のこと、けっこう大事に思ってる。」",
      "「そういう声で名前呼ぶな。マジで調子狂う。」",
      "「守るとか大げさなこと言わねぇけど、隣にはいる。」",
    ]},
    {lv:4,t:[
      "「これ以上近づくな。俺の理性が単車で逃げる。」",
      "「その目は反則だろ。配信じゃなかったら空気変わってたぞ。」",
      "「今の続きは言わせんな。俺でもコンプラくらい知ってる。」",
      "「おいストップ。今のはピー音の方から寄ってきた。」",
    ]}
  ],
  ikemen:[
    {lv:1,t:[
      "「こっち見んなよ。……いや、見ててもいいけど。」",
      "「その笑い方、今日だけ俺の負けでいい。」",
      "「大丈夫。守るとかじゃない、隣に立つだけだ。」",
      "「無理しなくていい。今は俺が聞く番だろ。」",
      "「お前が笑うなら、今日はそれで勝ちでいい。」",
      "「その一言、思ったより効いた。」",
    ]},
    {lv:2,t:[
      "「黙って聞けよ。今だけは、俺がちゃんとカッコつける番だ。」",
      "「近い？ 悪い、気持ちが先に寄った。」",
      "「お前が頼るなら、俺はたぶん断れない。」",
      "「その顔されたら、平気なふりする方が難しい。」",
      "「今日くらいは、俺に甘えとけよ。」",
      "「その不安、半分くらい俺に寄こせ。」",
    ]},
    {lv:3,t:[
      "「その声で呼ぶなって。俺の余裕、今ちょうど在庫切れ。」",
      "「今夜だけは、冗談に逃げないで聞いてくれ。」",
      "「その距離は危ない。俺がカッコつけられなくなる。」",
      "「お前の前だと、余裕ある男のふりが一番難しい。」",
      "「今のは忘れなくていい。むしろ覚えてて。」",
      "「俺のこと試してるなら、たぶんもう負けてる。」",
    ]},
    {lv:4,t:[
      "「それ以上近づくな。配信じゃなかったら空気が変わる。」",
      "「その目はダメだ。言葉選びが全部ピー音側に倒れる。」",
      "「今の続きは言わない。言ったら戻れなくなる。」",
      "「俺の余裕を壊すの、上手すぎるだろ。」",
    ]}
  ],
  kawabo:[
    {lv:1,t:[
      "「え、今の言い方ちょっと照れるんだけど。」",
      "「そんな急に優しくされたら、反応バグるじゃん。」",
      "「だいじょぶ。強がってるの、ちゃんと見えてるから。」",
      "「ねぇ、今だけはちゃんとこっち見て？」",
      "「その一言、今日ずっと思い出すやつなんだけど。」",
      "「無理しないで。今日はウチが味方でいるから。」",
    ]},
    {lv:2,t:[
      "「そういうとこ自然にやるの、ほんとズルいって。」",
      "「今の優しさ、勘違いしても怒らないでね？」",
      "「ねぇ、そういう顔されると普通に困るんだけど。」",
      "「好きとかじゃないけど……いや、ちょっと待って今のナシ。」",
      "「その距離で笑うの禁止。こっちが負ける。」",
      "「今日だけ甘えていい？ ちゃんと今日だけって言ったから。」",
    ]},
    {lv:3,t:[
      "「その声で名前呼ばれると、平気なふりできないんだけど。」",
      "「ねぇ、今のはズルい。普通に心臓もってかれた。」",
      "「友達の距離じゃないって言ったら、困る？」",
      "「その優しさ、他の子にもしてたらちょっと怒るよ？」",
      "「今だけでいいから、ウチのことちゃんと見て。」",
      "「冗談っぽく言うけど、ほんとは結構本気だからね。」",
    ]},
    {lv:4,t:[
      "「それ以上近いと、配信用の顔できなくなるから。」",
      "「今の続きは言えない。言ったらたぶん空気戻らない。」",
      "「その目はだめ。ウチのコンプラ担当が泣く。」",
      "「はいストップ。今のは心のモザイク案件です。」",
    ]}
  ],
  host:[
    {lv:1,t:[
      "「いらっしゃいませ。今日は笑顔だけ置いて帰ってください。」",
      "「お姫様、グラスより先にその機嫌を満たしましょう。」",
      "「その笑顔、今日の売上より大事にしたいですね。」",
      "「指名じゃなくてもいいです。今だけ、目を見てください。」",
      "「乾杯の前に、その顔は反則です。」",
    ]},
    {lv:2,t:[
      "「その一言、シャンパンより効きました。」",
      "「延長ですか？ それとも俺の勘違いだけ置いていきますか？」",
      "「帰るって言われると、急に店の照明が暗く見えます。」",
      "「今夜は酔わせません。先に俺が酔いそうなので。」",
      "「その目、指名料に入ってないんですけど。」",
    ]},
    {lv:3,t:[
      "「今夜だけは、冗談のふりして本音を出してもいいですか？」",
      "「帰したくないって言ったら、少しは困ってくれます？」",
      "「その沈黙、会計より重いですよ。」",
      "「お姫様、今の笑顔はボトルより危険です。」",
      "「その距離で見つめるの、営業妨害です。」",
    ]},
    {lv:4,t:[
      "「これ以上は店外じゃなくて配信外の話になります。」",
      "「お姫様、その沈黙は危険です。会計が情緒になります。」",
      "「今の空気、黒服より先にコンプラが来ます。」",
      "「その続きは、グラスじゃなくて想像に注ぎます。」",
    ]}
  ],
  cabaret:[
    {lv:1,t:[
      "「いらっしゃい。今日はグラスより先に、ちゃんと顔見せて？」",
      "「その疲れた顔、ウチの席に置いていきな。」",
      "「指名とか関係なく、今はちゃんと話聞くから。」",
      "「乾杯する前に、その顔ちょっと反則じゃない？」",
      "「今日は無理に笑わなくていいよ。ウチが笑わせる番だから。」",
    ]},
    {lv:2,t:[
      "「その一言、シャンパンより効くんだけど。」",
      "「延長する？ それともウチに寂しい顔させて帰る？」",
      "「帰るって言われると、急に店の照明まで暗く見えるじゃん。」",
      "「酔わせるつもり？ 先にウチがその目に酔いそうなんだけど。」",
      "「その優しさ、指名料に入ってないからズルいよ。」",
    ]},
    {lv:3,t:[
      "「今夜だけは、営業トークじゃなくて本音で聞いてくれる？」",
      "「帰したくないって言ったら、ちょっとは困ってくれる？」",
      "「その沈黙、会計より重いんだけど。」",
      "「今の笑顔、ボトルより危険だからやめて？」",
      "「その距離で見つめるの、普通に営業妨害なんだけど。」",
    ]},
    {lv:4,t:[
      "「これ以上は店外じゃなくて配信外の空気になるからストップ。」",
      "「その沈黙は危険。ウチのコンプラ担当が黒服呼びそう。」",
      "「今の続きは、グラスじゃなくて想像に注ぐね。」",
      "「その目はだめ。配信用の余裕が全部溶ける。」",
    ]}
  ],
  chuni:[
    {lv:1,t:[
      "「貴様、今の一言で物語の扉を開けたな。」",
      "「我が右目が告げている。これはただの雑談ではない。」",
      "「その名を呼ぶな。封印が少し揺れる。」",
      "「月が出たか。ならば、話は変わる。」",
      "「運命とは、だいたい予告なくコメント欄に現れる。」",
    ]},
    {lv:2,t:[
      "「封印されし感情が、今コメント欄で目覚めようとしている。」",
      "「月が満ちた。さあ、黒歴史を解放する時間だ。」",
      "「その微笑み、古の契約書に記されていたぞ。」",
      "「待て、その優しさは光属性に見せかけた罠だ。」",
      "「貴様の一言で、俺の中の第二章が始まった。」",
    ]},
    {lv:3,t:[
      "「その誘惑、禁忌の書に載ってるやつだぞ。」",
      "「待て、理性の結界が薄い。これ以上は深淵が笑う。」",
      "「その距離は危険だ。封印が人の形を保てない。」",
      "「今の声、闇の王でも少し照れるぞ。」",
      "「冗談に聞こえるか？ これは呪いではなく本音だ。」",
    ]},
    {lv:4,t:[
      "「これ以上踏み込めば、我らはピー音の領域へ堕ちる。」",
      "「禁断の扉に手をかけるな。配信が闇落ちする。」",
      "「その続きを言えば、世界線ごと年齢確認が必要になる。」",
      "「深淵がこちらを見ている。いったんCMに逃げろ。」",
    ]}
  ],
  kimo:[
    {lv:1,t:[
      "「ごめん、今のリアクションだけ冷凍保存していい？」",
      "「その優しさ、俺の心に勝手に入居してきたんだけど。」",
      "「今の笑顔、脳内で勝手にサムネ化された。」",
      "「その一言、日記に書いたら自分で引くかもしれない。」",
      "「待って、今の空気だけ瓶に詰めたい。」",
    ]},
    {lv:2,t:[
      "「お前のその一言、脳内で勝手にリピート再生されてる。」",
      "「今の“ん？”だけで、こっちの理性が体育座りしてる。」",
      "「その返信、既読つける前に三回見た。」",
      "「やばい、今の褒め方がキモくなりそうだから一回黙る。」",
      "「その距離感、気まずいのにクセになるからやめろ。」",
    ]},
    {lv:3,t:[
      "「その沈黙、何も言ってないのに情報量多すぎる。」",
      "「今のは良くない。こっちの妄想が勝手に靴履いた。」",
      "「その声で名前呼ばれると、情緒がログアウトする。」",
      "「気持ち悪いこと言いそうだから、先に謝っとく。今の好き。」",
      "「その近さ、心の防犯ブザーが小さく鳴ってる。」",
    ]},
    {lv:4,t:[
      "「これはまずい。気持ち悪い方向に褒めそうだから一回水飲む。」",
      "「今のは言語化した瞬間アウト寄りになる。察してくれ。」",
      "「危ない。今の感想、配信に載せるには粘度が高い。」",
      "「その空気、俺の中の変な部分が拍手し始めた。」",
    ]}
  ],
  streamer:[
    {lv:1,t:[
      "「初見さん、今のは通常運転です。たぶん。」",
      "「コメント欄、今の一言に名前つけてくれ。」",
      "「今の反応、切り抜くほどじゃないけど地味に好き。」",
      "「待って、配信者なのにこっちがコメント待ちになった。」",
      "「この空気、誰かタイムスタンプ押しといて。」",
    ]},
    {lv:2,t:[
      "「切り抜き班、今のはサムネにするな。するなら盛れ。」",
      "「今の流れ、配信者としてはおいしいけど人間としては不安。」",
      "「コメント止まった？ じゃあ今の勝ちでいいな。」",
      "「今の発言、あとで自分で見返して恥ずかしくなるやつだ。」",
      "「待て、チャット欄がニヤついてるの見えるぞ。」",
    ]},
    {lv:3,t:[
      "「ちょっと待て、この空気はクリップに残すには濃すぎる。」",
      "「今の発言、配信の端っこでコンプラが震えてる。」",
      "「リスナー、今のは聞かなかったことにしてもろて。」",
      "「この距離感の話を配信でやるな。俺が負ける。」",
      "「今のコメント、読み上げたら枠の方向性変わるぞ。」",
    ]},
    {lv:4,t:[
      "「ストップ。今のはコメント欄も一回水飲め。」",
      "「この先は配信ではなく、各自の想像力に委託します。」",
      "「運営さん、今のは雰囲気です。単なる雰囲気です。」",
      "「危ない、今ちょっとBAN回避の反復横跳びしてた。」",
    ]}
  ],
  meme:[
    {lv:1,t:[
      "「それもうログボじゃん。毎日ちょっと嬉しいやつ。」",
      "「完全に伏線回収。誰も覚えてないタイプの。」",
      "「今のは草じゃ足りない。鉢植えから始めよう。」",
      "「それはもう概念。物じゃなくて概念。」",
      "「一旦スクショして、未来の自分に投げよう。」",
    ]},
    {lv:2,t:[
      "「ワンチャンある顔すんな。こっちの脳が勝手に会議始める。」",
      "「今のは草じゃ足りない。森を申請する。」",
      "「その一言、脳内で勝手にMAD化された。」",
      "「待って、今のは名言っぽい顔した迷言だろ。」",
      "「それ言われた側、感情のアップデート入るぞ。」",
    ]},
    {lv:3,t:[
      "「その言い方、脳内で勝手にセンシティブ判定されてる。」",
      "「待って、今のは概念が服着てギリ歩いてる。」",
      "「その空気、令和のコンプラが一瞬こっち見た。」",
      "「今のはネタに見せかけた本音の擬態だろ。」",
      "「その距離感、コメント欄が勝手に考察始めるやつ。」",
    ]},
    {lv:4,t:[
      "「それはもうピー音の公式アンバサダーなんよ。」",
      "「今の流れ、アルゴリズムが目をそらしたぞ。」",
      "「その発言、サムネにしたら黄色いマークつくぞ。」",
      "「危ない。今のは草じゃなくて警告灯が生えた。」",
    ]}
  ],
  wasei:[
    {lv:1,t:[
      "「そのフィーリング、かなりグッドコンディションです。」",
      "「一旦アジェンダに載せる？ 感情の会議だけど。」",
      "「今のリアクション、ベリーグッドなレスポンスでした。」",
      "「その空気、ナイスコミュニケーションすぎる。」",
      "「この流れ、わりとハッピーエンド寄りです。」",
    ]},
    {lv:2,t:[
      "「君のリアクション、エビデンス無しで説得力あるのズルい。」",
      "「その距離感、コンセンサス取れてないのに進行してます。」",
      "「今の優しさ、ノーアポで心にアサインされました。」",
      "「その笑顔、感情のKPIを達成してます。」",
      "「一旦リスケしていい？ 心の準備がペンディングなんで。」",
    ]},
    {lv:3,t:[
      "「感情のバッファが足りない。今のは一旦ペンディングで。」",
      "「そのアプローチ、コンプラ的にはセーフだけど心がアウト寄り。」",
      "「今の距離感、事前共有なしでローンチされて困ってます。」",
      "「その一言、心のタスク管理に勝手に追加されました。」",
      "「この空気、議事録に残すにはちょっと濃いです。」",
    ]},
    {lv:4,t:[
      "「これ以上はオーソライズ不可です。各自、察しでお願いします。」",
      "「そのスキーム、配信上はフィックスできません。」",
      "「今の続きは、社内規定ではなく心の規定に引っかかります。」",
      "「危ない。感情のリスクヘッジが間に合ってません。」",
    ]}
  ],
  ossan:[
    {lv:1,t:[
      "「おいおい、今のは茶が進むやつだな。」",
      "「昔ならそのノリ、町内会で表彰されてたぞ。」",
      "「その一言、味噌汁くらい落ち着くな。」",
      "「今の空気、縁側で聞きたいわ。」",
      "「いいねぇ。そういう素直さ、嫌いじゃないよ。」",
    ]},
    {lv:2,t:[
      "「その言い方、昭和なら近所のおばちゃんが二度見してる。」",
      "「嫌いじゃないぞ。むしろ畳の上で聞きたい。」",
      "「おじさん今の一言で、ちょっと若返ったかもしれん。」",
      "「その距離感、居酒屋なら大将がニヤつくやつだ。」",
      "「今のは反則だな。焼き鳥ならタレ多めだ。」",
    ]},
    {lv:3,t:[
      "「ちょっと待て。その空気は居酒屋の奥座敷でやるやつだ。」",
      "「今のは若い子のノリに見せかけた、だいぶ危ない橋だぞ。」",
      "「その沈黙、暖簾の向こうでやるやつだな。」",
      "「おじさんでも分かる。今のはちょっと色っぽい。」",
      "「その一言、二軒目に持ち込むには強すぎる。」",
    ]},
    {lv:4,t:[
      "「それ以上はおじさんでも咳払いで止めるぞ。」",
      "「今の話は暖簾の向こうに置いてこい。」",
      "「危ない危ない、急に大人の時間割になったぞ。」",
      "「この先はお茶割りじゃ薄まらん空気だな。」",
    ]}
  ]
};

const serifFixedLines = [
  {level:1,genre:["confess"],target:"common",text:"「帰り道、あと一駅だけ遠回りしない？」"},
  {level:2,genre:["confess"],target:"common",text:"「お前の“またね”が、最近ちょっと待ち遠しい。」"},
  {level:3,genre:["confess"],target:"common",text:"「好きって言ったら困る？ でも、言わない方がもっと困ってる。」"},
  {level:4,genre:["confess"],target:"common",text:"「今だけでいい。俺のこと、少しだけ特別に見て。」"},
  {level:2,genre:["gal","confess"],target:"female",text:"「ねぇ、ウチだけ特別扱いしてよ。冗談っぽく言うけどさ。」"},
  {level:3,genre:["yankee","confess"],target:"male",text:"「お前だけは、他の奴と違ぇんだよ。……言わせんな。」"},
  {level:3,genre:["cabaret","confess"],target:"female",text:"「ねぇ、今夜だけは営業じゃなくて本音で聞いてくれる？」"},
  {level:3,genre:["ikemen","confess"],target:"common",text:"「お前の隣、俺が一番似合うって言ったら笑う？」"},
  {level:4,genre:["kimo"],target:"common",text:"「今のは危ない。褒め方を間違えると、俺の人間性が疑われる。」"},
  {level:3,genre:["streamer"],target:"common",text:"「この空気、切り抜きにされたら一週間くらい言い訳するやつだ。」"}
];

const serifTargetWords = {
  common:["お前","君","その人","今の空気","コメント欄"],
  male:["兄貴","お前","その男前ムーブ","そのドヤ顔","その謎の余裕"],
  female:["お姫様","君","そのあざとさ","その“別に？”","その余裕"]
};
const serifVoices = {normal:"",whisper:"【囁きで】",ikemen:"【イケボで】",yankee:"【ヤンキー風で】",anime:"【アニメ主人公で】",old:"【老人風で】",robot:"【ロボ口調で】"};
const serifGenreLabels={all:"全部混ぜ",confess:"告白・罰ゲーム",ikemen:"イケボ",kawabo:"カワボ",kimo:"キモおもろ",chuni:"中二病",gal:"ギャル",yankee:"ヤンキー",host:"ホスト",cabaret:"キャバ嬢",streamer:"配信者",meme:"ネットミーム",wasei:"和製英語地獄",ossan:"おっさん"};
function getSerifVisibleTarget(){ return (document.getElementById("serifTarget")||{}).value || "common"; }
function updateSerifDynamicLabels(){
  const target=getSerifVisibleTarget();
  const isFemale=target==="female";
  const genreSel=document.getElementById("serifGenre");
  const voiceSel=document.getElementById("serifVoice");
  if(genreSel){
    const ikemenOpt=genreSel.querySelector('option[value="ikemen"]');
    const yankeeOpt=genreSel.querySelector('option[value="yankee"]');
    const galOpt=genreSel.querySelector('option[value="gal"]');
    const hostOpt=genreSel.querySelector('option[value="host"]');
    if(ikemenOpt) ikemenOpt.textContent=isFemale?"カワボ":"イケボ";
    if(yankeeOpt) yankeeOpt.textContent=isFemale?"ギャル":"ヤンキー";
    if(galOpt) galOpt.textContent=isFemale?"あざとギャル":"ギャル";
    if(hostOpt) hostOpt.textContent=isFemale?"キャバ嬢":"ホスト";
  }
  if(voiceSel){
    const ikemenVoice=voiceSel.querySelector('option[value="ikemen"]');
    const yankeeVoice=voiceSel.querySelector('option[value="yankee"]');
    if(ikemenVoice) ikemenVoice.textContent=isFemale?"カワボ":"イケボ";
    if(yankeeVoice) yankeeVoice.textContent=isFemale?"ギャル風":"ヤンキー";
  }
}
function getSerifVoicePrefix(voice,target){
  if(target==="female" && voice==="ikemen") return "【カワボで】";
  if(target==="female" && voice==="yankee") return "【ギャル風で】";
  return serifVoices[voice] || "";
}
function getSerifGenreLabel(genre,target){
  if(target==="female" && genre==="ikemen") return "カワボ";
  if(target==="female" && genre==="yankee") return "ギャル";
  if(target==="female" && genre==="gal") return "あざとギャル";
  if(target==="female" && genre==="host") return "キャバ嬢";
  if(target==="female" && genre==="cabaret") return "キャバ嬢";
  return serifGenreLabels[genre] || genre;
}
let serifRecentLines=[];
function serifPick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function getSerifSettings(){
  updateSerifDynamicLabels();
  const rawGenre=(document.getElementById("serifGenre")||{}).value || "all";
  let target=(document.getElementById("serifTarget")||{}).value || "common";
  if(target==="random") target=serifPick(["common","male","female"]);
  let genre=rawGenre;
  if(target==="female" && rawGenre==="ikemen") genre="kawabo";
  if(target==="female" && rawGenre==="yankee") genre="gal";
  if(target==="female" && rawGenre==="host") genre="cabaret";
  const level=Number((document.getElementById("serifLevel")||{}).value || 3);
  const includeLower=((document.getElementById("serifIncludeLower")||{}).value || "yes")==="yes";
  let voice=(document.getElementById("serifVoice")||{}).value || "random";
  if(voice==="random") voice=serifPick(["normal","whisper","ikemen","yankee","anime","old","robot"]);
  const guard=((document.getElementById("serifGuard")||{}).value || "normal");
  return {genre,rawGenre,target,level,includeLower,voice,guard};
}
function serifLevelOk(itemLv, set){ return set.includeLower ? itemLv <= set.level : itemLv === set.level; }
function fillSerifTemplate(tpl,set){
  const targetWord = serifPick(serifTargetWords[set.target] || serifTargetWords.common);
  let line = tpl.replaceAll("{target}", targetWord);
  if(set.target==="male") line = line.replace(/君/g,"お前").replace(/お姫様/g,"兄貴").replace(/かわいい/g,"かっこいい");
  if(set.target==="female") line = line.replace(/兄貴/g,"お姫様").replace(/そのドヤ顔/g,"その余裕");
  if(set.guard==="strong"){
    line = line.replace(/BAN/g,"配信").replace(/ピー音/g,"カット音").replace(/センシティブ/g,"大人向け").replace(/アウト寄り/g,"攻め気味").replace(/色っぽい/g,"雰囲気ある");
  }
  return line;
}
function rememberSerifLine(text){
  serifRecentLines.unshift(text);
  serifRecentLines=[...new Set(serifRecentLines)].slice(0,24);
}
function avoidRecent(candidates){
  const fresh=candidates.filter(x=>!serifRecentLines.includes(x));
  return fresh.length?fresh:candidates;
}
function generateSerifLine(set){
  let genrePool = set.genre==="all" ? Object.keys(serifTemplates).filter(x=>x!=="all") : [set.genre];
  genrePool=genrePool.filter(x=>serifTemplates[x]);
  if(!genrePool.length) genrePool=["all"];
  const g = serifPick(genrePool);
  const packs = (serifTemplates[g] || serifTemplates.all).filter(pack=>serifLevelOk(pack.lv,set));
  const fallback = (serifTemplates.all || []).filter(pack=>serifLevelOk(pack.lv,set));
  const usable = packs.length ? packs : fallback;
  const candidates = usable.flatMap(pack=>pack.t).map(t=>fillSerifTemplate(t,set));
  return serifPick(avoidRecent(candidates));
}
function rollSerifGame(){
  const set=getSerifSettings();
  const fixed=serifFixedLines.filter(x=>serifLevelOk(x.level,set) && (set.genre==="all" || x.genre.includes(set.genre)) && (x.target==="common" || x.target===set.target));
  const fixedTexts=fixed.map(x=>x.text);
  let text = (fixedTexts.length && Math.random()<0.28) ? serifPick(avoidRecent(fixedTexts)) : generateSerifLine(set);
  rememberSerifLine(text);
  const prefix = getSerifVoicePrefix(set.voice,set.target);
  const out = prefix ? `${prefix}\n${text}` : text;
  const prev=document.getElementById("serifPreview");
  if(prev) prev.textContent=out;
  const meta=document.getElementById("serifMeta");
  const targetLabel={common:"共通",male:"男向け",female:"女向け",random:"ランダム"}[set.target]||set.target;
  if(meta) meta.textContent=`Lv${set.level}${set.includeLower?"以下":"のみ"} / ${targetLabel} / ${getSerifGenreLabel(set.rawGenre||set.genre,set.target)} / BANガード:${set.guard==="strong"?"強":"標準"}`;
}
(function initSerifDynamicLabelEvents(){
  const target=document.getElementById("serifTarget");
  if(target) target.addEventListener("change", updateSerifDynamicLabels);
  updateSerifDynamicLabels();
})();


const PRIVATE_ANIMAL_KEY = "streamStaff.privateAnimals.v1";
function safeHtml(v){return String(v??"").replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function loadPrivateAnimals(){
  try{ const arr=JSON.parse(localStorage.getItem(PRIVATE_ANIMAL_KEY)||"[]"); return Array.isArray(arr)?arr:[]; }catch(e){ return []; }
}
function savePrivateAnimals(arr){ localStorage.setItem(PRIVATE_ANIMAL_KEY, JSON.stringify(arr||[])); }
let privateAnimalData = loadPrivateAnimals();

const animalImageQuery = {
  "猫":"cat", "犬":"dog", "キツネ":"fox", "うさぎ":"rabbit", "パンダ":"giant-panda", "ゴリラ":"gorilla", "ペンギン":"penguin", "ライオン":"lion", "牛":"cow", "鳥":"bird", "カエル":"frog", "ブタ":"pig", "サル":"monkey", "馬":"horse", "ハムスター":"hamster", "オオカミ":"wolf", "カピバラ":"capybara", "レッサーパンダ":"red-panda", "シマエナガ":"long-tailed-tit", "フェネック":"fennec-fox", "スナネコ":"sand-cat", "ラッコ":"sea-otter", "ナマケモノ":"sloth", "ハシビロコウ":"shoebill", "マヌルネコ":"pallas-cat", "ウォンバット":"wombat", "ミーアキャット":"meerkat", "アライグマ":"raccoon", "カワウソ":"otter", "シャチ":"orca", "オカピ":"okapi", "クアッカワラビー":"quokka", "ハダカデバネズミ":"naked-mole-rat", "アイアイ":"aye-aye", "ヤブイヌ":"bush-dog", "ビントロング":"binturong", "コビトカバ":"pygmy-hippo", "センザンコウ":"pangolin", "カモノハシ":"platypus", "ハリモグラ":"echidna", "タスマニアデビル":"tasmanian-devil", "カカポ":"kakapo", "メンダコ":"octopus", "ダイオウグソクムシ":"isopod", "チンアナゴ":"garden-eel", "クリオネ":"sea-angel", "ウーパールーパー":"axolotl", "ラーテル":"honey-badger", "テンレック":"tenrec", "ピラルク":"arapaima", "深夜のコンビニ店員":"convenience-store-worker"
};
function hashCode(str){let h=0; for(let i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i); h|=0;} return Math.abs(h);}
function defaultAnimalImageUrl(name){
  const q=animalImageQuery[name] || String(name||'animal').toLowerCase();
  // 内蔵サムネは使わず、初期状態からURL画像を持たせる方式。
  // lockで同じ動物はなるべく同じ画像になるように固定。
  return `https://loremflickr.com/640/640/${encodeURIComponent(q)},animal?lock=${(hashCode(name||q)%997)+1}`;
}
function animalImageUrl(a){
  if(a && a.imageData) return a.imageData;      // 手元画像を登録した場合
  if(a && a.imageUrl) return a.imageUrl;        // URL登録方式
  if(a && a.image) return a.image;              // 旧データ互換
  return defaultAnimalImageUrl(a?.name||'animal');
}
const builtInAnimalData = [
  {name:"猫",emoji:"🐱",diff:"easy",suffix:"にゃ",hint:"自由気まま。人の作業を邪魔しがち。",tags:["かわいい","気まぐれ","身近"]},
  {name:"犬",emoji:"🐶",diff:"easy",suffix:"ワン",hint:"忠実で元気。散歩という言葉に弱い。",tags:["元気","忠犬","身近"]},
  {name:"キツネ",emoji:"🦊",diff:"easy",suffix:"コン",hint:"賢くて少しあざとい。油揚げイメージ。",tags:["ずる賢い","あざとい"]},
  {name:"うさぎ",emoji:"🐰",diff:"easy",suffix:"ぴょん",hint:"寂しがりっぽく見える。跳ねてごまかせる。",tags:["かわいい","寂しがり"]},
  {name:"パンダ",emoji:"🐼",diff:"easy",suffix:"パン",hint:"笹と寝転び。かわいいの暴力。",tags:["のんびり","笹"]},
  {name:"ゴリラ",emoji:"🦍",diff:"easy",suffix:"ウホ",hint:"強い・優しい・胸を叩く。",tags:["筋肉","兄貴","圧"]},
  {name:"ペンギン",emoji:"🐧",diff:"easy",suffix:"ペン",hint:"よちよち歩き。集団行動が得意。",tags:["かわいい","寒い"]},
  {name:"ライオン",emoji:"🦁",diff:"easy",suffix:"ガオ",hint:"王者感。寝てる時間も長い。",tags:["王者","威厳"]},
  {name:"牛",emoji:"🐮",diff:"easy",suffix:"モ〜",hint:"のんびり。牧場とミルク。",tags:["のんびり","牧場"]},
  {name:"鳥",emoji:"🐤",diff:"easy",suffix:"ピヨ",hint:"軽いノリで飛べる。歌もいける。",tags:["自由","歌"]},
  {name:"カエル",emoji:"🐸",diff:"easy",suffix:"ケロ",hint:"雨の日とジャンプ。湿度に強い。",tags:["雨","ジャンプ"]},
  {name:"ブタ",emoji:"🐷",diff:"easy",suffix:"ブー",hint:"食べる・寝る・正直。",tags:["食いしん坊","正直"]},
  {name:"サル",emoji:"🐵",diff:"easy",suffix:"ウキ",hint:"いたずら好き。テンション高め。",tags:["いたずら","陽キャ"]},
  {name:"馬",emoji:"🐴",diff:"easy",suffix:"ヒヒン",hint:"走るのが得意。爽やかに逃げられる。",tags:["速い","爽やか"]},
  {name:"ハムスター",emoji:"🐹",diff:"easy",suffix:"チュ",hint:"ほっぺに溜める。回し車で忙しい。",tags:["小さい","かわいい"]},
  {name:"オオカミ",emoji:"🐺",diff:"normal",suffix:"ガル",hint:"群れと孤高の両方でいける。夜が似合う。",tags:["クール","夜"]},
  {name:"カピバラ",emoji:"🦫",diff:"normal",suffix:"バラ",hint:"温泉とのんびり。怒らなそう。",tags:["温泉","平和"]},
  {name:"レッサーパンダ",emoji:"🐾",diff:"normal",suffix:"パンダ",hint:"立つと強い。見た目で勝てる。",tags:["かわいい","威嚇"]},
  {name:"シマエナガ",emoji:"🐦",diff:"normal",suffix:"チュン",hint:"雪の妖精っぽい丸い鳥。",tags:["かわいい","白い"]},
  {name:"フェネック",emoji:"🦊",diff:"normal",suffix:"フェネ",hint:"大きな耳が特徴。砂漠のかわいい枠。",tags:["耳","かわいい"]},
  {name:"スナネコ",emoji:"🐱",diff:"normal",suffix:"にゃ",hint:"砂漠の天使。小さくて強気。",tags:["砂漠","かわいい"]},
  {name:"ラッコ",emoji:"🦦",diff:"normal",suffix:"ラコ",hint:"貝を割る。手をつないで寝る。",tags:["海","かわいい"]},
  {name:"ナマケモノ",emoji:"🦥",diff:"normal",suffix:"のん",hint:"とにかくゆっくり。急かされるのが苦手。",tags:["遅い","省エネ"]},
  {name:"ハシビロコウ",emoji:"🦤",diff:"normal",suffix:"ビロ",hint:"動かない鳥。目力がすごい。",tags:["無言","圧"]},
  {name:"マヌルネコ",emoji:"🐱",diff:"normal",suffix:"マヌ",hint:"もふもふで表情が渋い。",tags:["もふもふ","渋い"]},
  {name:"ウォンバット",emoji:"🐻",diff:"normal",suffix:"バット",hint:"ずんぐり。お尻が硬いことで有名。",tags:["丸い","防御"]},
  {name:"ミーアキャット",emoji:"🐾",diff:"normal",suffix:"ミャ",hint:"立って見張る。家族感が強い。",tags:["見張り","集団"]},
  {name:"アライグマ",emoji:"🦝",diff:"normal",suffix:"ラス",hint:"手先が器用。洗ってるイメージ。",tags:["器用","いたずら"]},
  {name:"カワウソ",emoji:"🦦",diff:"normal",suffix:"うそ",hint:"遊び好き。手を使うのがかわいい。",tags:["水辺","遊び"]},
  {name:"シャチ",emoji:"🐋",diff:"normal",suffix:"シャチ",hint:"海のギャング。賢くて強い。",tags:["強い","海"]},
  {name:"オカピ",emoji:"🦓",diff:"hard",suffix:"オカ",hint:"シマウマっぽい脚だけどキリンの仲間。",tags:["珍獣","しましま"]},
  {name:"クアッカワラビー",emoji:"🦘",diff:"hard",suffix:"ッカ",hint:"笑ってるように見える幸せそうな動物。",tags:["笑顔","珍獣"]},
  {name:"ハダカデバネズミ",emoji:"🐭",diff:"hard",suffix:"デバ",hint:"裸っぽい見た目の地中生活者。クセが強い。",tags:["地中","クセ強"]},
  {name:"アイアイ",emoji:"🐒",diff:"hard",suffix:"アイ",hint:"細長い指で木を探る夜行性の霊長類。",tags:["夜行性","指"]},
  {name:"ヤブイヌ",emoji:"🐕",diff:"hard",suffix:"ヤブ",hint:"ずんぐりした野生の犬。群れで動く。",tags:["群れ","野生"]},
  {name:"ビントロング",emoji:"🐾",diff:"hard",suffix:"ビン",hint:"ポップコーンみたいな匂いと言われる動物。",tags:["匂い","珍獣"]},
  {name:"コビトカバ",emoji:"🦛",diff:"hard",suffix:"カバ",hint:"小さいカバ。かわいいけどカバ。",tags:["小型","水辺"]},
  {name:"センザンコウ",emoji:"🐾",diff:"hard",suffix:"ザン",hint:"うろこで丸まる。防御力高め。",tags:["うろこ","防御"]},
  {name:"カモノハシ",emoji:"🦆",diff:"hard",suffix:"カモ",hint:"くちばし・卵・毒爪。属性盛りすぎ。",tags:["謎","水辺"]},
  {name:"ハリモグラ",emoji:"🦔",diff:"hard",suffix:"チク",hint:"針がある卵を産む哺乳類。",tags:["針","珍獣"]},
  {name:"タスマニアデビル",emoji:"😈",diff:"hard",suffix:"デビ",hint:"名前が強い。鳴き声も迫力。",tags:["名前強い","野生"]},
  {name:"カカポ",emoji:"🦜",diff:"hard",suffix:"カポ",hint:"飛べないオウム。丸くてかわいい。",tags:["鳥","飛べない"]},
  {name:"メンダコ",emoji:"🐙",diff:"hard",suffix:"メン",hint:"深海のゆるいタコ。見た目が癒し。",tags:["深海","ゆるい"]},
  {name:"ダイオウグソクムシ",emoji:"🪲",diff:"hard",suffix:"グソ",hint:"深海の巨大ダンゴムシみたいなやつ。",tags:["深海","装甲"]},
  {name:"チンアナゴ",emoji:"🐍",diff:"hard",suffix:"チン",hint:"砂からにょきっと出る海の人気者。",tags:["水族館","にょき"]},
  {name:"クリオネ",emoji:"🪽",diff:"hard",suffix:"クリ",hint:"流氷の天使。食事シーンは別物。",tags:["透明","天使"]},
  {name:"ウーパールーパー",emoji:"🦎",diff:"hard",suffix:"パー",hint:"ゆるい顔の両生類。再生能力の印象。",tags:["ゆる顔","水槽"]},
  {name:"ラーテル",emoji:"🦡",diff:"hard",suffix:"テル",hint:"怖いもの知らずでめちゃくちゃ強気。",tags:["強気","無敵感"]},
  {name:"テンレック",emoji:"🦔",diff:"hard",suffix:"チク",hint:"ハリネズミっぽいけど別の謎かわ生物。",tags:["謎","夜行性"]},
  {name:"ピラルク",emoji:"🐟",diff:"hard",suffix:"ルク",hint:"巨大な淡水魚。古代魚っぽい迫力。",tags:["巨大","魚"]},
  {name:"深夜のコンビニ店員",emoji:"🏪",diff:"chaos",suffix:"です",hint:"動物ではない。だが配信では動物扱いでよい。",tags:["人類","カオス"]}
].map(a=>({...a, imageUrl: defaultAnimalImageUrl(a.name), source:"builtIn"}));
function getAllAnimalData(){ return [...builtInAnimalData, ...privateAnimalData.map(a=>({...a, source:"private"}))]; }
function getAnimalSourceMode(){ return document.getElementById('animalSourceMode')?.value || 'all'; }
function getSourceAnimalData(){
  const m=getAnimalSourceMode();
  if(m==='builtIn') return builtInAnimalData;
  if(m==='private') return privateAnimalData.map(a=>({...a, source:'private'}));
  return getAllAnimalData();
}
const animalData = getAllAnimalData;
const animalQuestions = {
  self:["最近ハマってることは？","休日は何してる？","朝起きて最初にすることは？","好きな食べ物は？","苦手なことは？","テンションが上がる瞬間は？","今一番ほしいものは？","自分のチャームポイントは？","最近ちょっとムカついたことは？","寝る前のルーティンは？"],
  stream:["初見さんに一言どうぞ","コメントが止まった時どうする？","配信で滑った時どうする？","高評価をお願いしてください","今日の配信タイトルをつけるなら？","常連さんに甘えてください","BAN回避しながら謝ってください","枠を締める一言をどうぞ","リスナーにお願いするとしたら？","急にスパチャが来た時の反応は？"],
  love:["好きなタイプは？","告白するなら何て言う？","デートに誘うなら？","嫉妬した時どうする？","好きな人から返信が来ない時どうする？","キュンとする瞬間は？","フラれた時の一言は？","好きバレした時どうごまかす？","初デートで行きたい場所は？","相手を褒めるなら？"],
  daily:["寝坊した時どうする？","コンビニでつい買うものは？","雨の日の過ごし方は？","お腹が空いた時の第一声は？","怒られた時どうする？","宝くじが当たったら？","カラオケで歌うなら？","仕事でミスした時の言い訳は？","旅行先で最初にすることは？","一番落ち着く場所は？"],
  chaos:["世界征服するなら最初に何する？","魔王に会ったら何て言う？","急に人間になったら何する？","自分の必殺技名は？","ラスボス前に一言どうぞ","コメント欄をざわつかせる一言は？","謎の会見を開いてください","人生最大の秘密を匂わせてください","宇宙人に自己紹介してください","この世で一番許せないものは？"]
};
const animalExamples = {
  simple:["自分のことを答えて語尾だけ足せばOK。例：テレビゲームにゃ〜","困ったら短く答えるだけでOK。例：寝ることワン！"],
  role:["動物っぽい理由を少し混ぜる。例：暖かい場所で寝ることにゃ","性格を乗せると強い。例：散歩って聞いたら全部忘れるワン"],
  gachi:["習性や見た目まで寄せる。例：人間の作業場に乗って邪魔するにゃ","知らなければ想像で押し切る。例：たぶん夜にこっそり動くチク…"],
  nohint:["ヒントなし。名前の響きだけで想像して答える地獄モードｗ"]
};
function animalDiffRank(d){return {easy:1,normal:2,hard:3,chaos:4}[d]||2;}
function getAnimalPool(){
  const d=document.getElementById('animalDifficulty')?.value||'normal';
  const base=getSourceAnimalData();
  if(d==='easy') return base.filter(a=>a.diff==='easy');
  if(d==='normal') return base.filter(a=>animalDiffRank(a.diff)<=2);
  if(d==='hard') return base.filter(a=>a.diff==='hard');
  return base;
}
function getAnimalQuestion(){
  const cat=document.getElementById('animalQuestionCategory')?.value||'random';
  const keys=Object.keys(animalQuestions);
  const k=cat==='random'?pick(keys):cat;
  return pick(animalQuestions[k]||animalQuestions.self);
}
function renderAnimalCard(a,q){
  const mode=document.getElementById('animalImageMode')?.value||'real';
  const play=document.getElementById('animalPlayMode')?.value||'role';
  const v=document.getElementById('animalVisual');
  if(v){
    v.classList.toggle('silhouette',mode==='silhouette');
    v.classList.toggle('name-only',mode==='name');
    if(mode==='name'){
      v.textContent='？';
    }else if(mode==='emoji'){
      v.innerHTML=`<span class="animal-fallback">${a.emoji||'🐾'}</span>`;
    }else{
      const fallback=(a.emoji||'🐾').replace(/</g,'');
      v.innerHTML=`<img src="${animalImageUrl(a)}" alt="${a.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentElement.innerHTML='<span class=&quot;animal-fallback&quot;>${fallback}</span>'">`;
    }
  }
  const photoNote=document.getElementById('animalPhotoNote');
  if(photoNote) photoNote.textContent=(mode==='real'||mode==='silhouette')?'URL画像表示ON：読み込み失敗時だけ絵文字に退避':(mode==='emoji'?'絵文字表示中：画像を使わない時向け':'名前のみ：想像力だけで勝負ｗ');
  const n=document.getElementById('animalName'); if(n) n.textContent=a.name;
  const tags=document.getElementById('animalTags'); if(tags) tags.innerHTML=[a.diff,`語尾：${a.suffix}`,(a.source==='private'?'プライベート':'内蔵'),...(a.tags||[])].map(x=>`<span>${safeHtml(x)}</span>`).join('');
  const hint=document.getElementById('animalHint'); if(hint) hint.textContent=(play==='nohint'||mode==='name')?'ヒント：非表示。名前だけで想像して答えろｗ':`ヒント：${a.hint}`;
  const ques=document.getElementById('animalQuestion'); if(ques) ques.textContent=q;
  const guide=document.getElementById('animalGuide'); if(guide) guide.textContent=pick(animalExamples[play]||animalExamples.role)+` / 推奨語尾：${a.suffix}`;
}
function rollAnimalGame(){
  const pool=getAnimalPool();
  const all=getAllAnimalData(); const a=pick(pool.length?pool:all);
  renderAnimalCard(a,getAnimalQuestion());
}
function searchAnimalData(showAll=false){
  const box=document.getElementById('animalSearch');
  const out=document.getElementById('animalSearchResults');
  if(!out) return;
  const q=(box?.value||'').trim().toLowerCase();
  let arr=getSourceAnimalData();
  if(!showAll && q){
    arr=arr.filter(a=>[a.name,a.suffix,a.hint,a.source==='private'?'プライベート':'内蔵',...(a.tags||[])].join(' ').toLowerCase().includes(q));
  }
  if(!showAll && !q){out.innerHTML='<div class="animal-small">動物名・語尾・特徴で検索してね。例：にゃ / コン / かわいい / 深海 / プライベート</div>';return;}
  window.__animalSearchCache = arr.slice(0,80);
  out.innerHTML=window.__animalSearchCache.map((a,i)=>{ const img=animalImageUrl(a); const fb=safeHtml(a.emoji||'🐾'); return `<div class="animal-result" onclick="renderAnimalCard(window.__animalSearchCache[${i}], getAnimalQuestion())"><div class="animal-result-main"><img class="animal-thumb" src="${safeHtml(img)}" alt="${safeHtml(a.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;animal-thumb-fallback&quot;>${fb}</span>'"><div><b>${safeHtml(a.name)}</b> <span class="animal-source-badge">${a.source==='private'?'プライベート':'内蔵'}</span><div class="animal-small">${safeHtml(a.hint)}</div></div></div><div class="animal-small">${safeHtml(a.suffix)}</div></div>`; }).join('') || '<div class="animal-small">見つからなかった。別の語尾や特徴で検索してみてｗ</div>';
}
function fileToDataUrl(file){
  return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); });
}
async function addPrivateAnimal(){
  const name=(document.getElementById('privateAnimalName')?.value||'').trim();
  if(!name){ alert('名前を入れてね'); return; }
  const suffix=(document.getElementById('privateAnimalSuffix')?.value||'').trim() || 'です';
  const diff=document.getElementById('privateAnimalDiff')?.value || 'normal';
  const hint=(document.getElementById('privateAnimalHint')?.value||'').trim() || 'プライベート追加。自由に想像してOK。';
  const tags=(document.getElementById('privateAnimalTags')?.value||'').split(',').map(x=>x.trim()).filter(Boolean);
  const imageUrl=(document.getElementById('privateAnimalImageUrl')?.value||'').trim();
  const file=document.getElementById('privateAnimalImage')?.files?.[0];
  let imageData='';
  if(file){
    if(file.size>2.5*1024*1024 && !confirm('画像が大きめです。保存できない場合があります。このまま追加する？')) return;
    try{ imageData=await fileToDataUrl(file); }catch(e){ alert('画像の読み込みに失敗したよ'); return; }
  }
  privateAnimalData.push({id:Date.now()+''+Math.random().toString(16).slice(2), name, emoji:'🐾', diff, suffix, hint, tags, imageUrl, imageData, source:'private'});
  try{ savePrivateAnimals(privateAnimalData); }catch(e){ alert('保存容量が足りない可能性があります。画像を小さくして再追加してね。'); privateAnimalData.pop(); return; }
  ['privateAnimalName','privateAnimalSuffix','privateAnimalHint','privateAnimalTags','privateAnimalImageUrl','privateAnimalImage'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  renderPrivateAnimalList();
  searchAnimalData(true);
}
function deletePrivateAnimal(id){
  privateAnimalData=privateAnimalData.filter(a=>a.id!==id);
  savePrivateAnimals(privateAnimalData);
  renderPrivateAnimalList();
  searchAnimalData(true);
}
function clearPrivateAnimalsConfirm(){
  if(!privateAnimalData.length){ alert('まだプライベート動物はないよ'); return; }
  if(confirm('プライベート動物を全部削除する？')){ privateAnimalData=[]; savePrivateAnimals(privateAnimalData); renderPrivateAnimalList(); searchAnimalData(true); }
}
function renderPrivateAnimalList(){
  const out=document.getElementById('privateAnimalList'); if(!out) return;
  if(!privateAnimalData.length){ out.innerHTML='<div class="animal-small">まだプライベート動物はありません。</div>'; return; }
  out.innerHTML=privateAnimalData.map(a=>`<div class="private-animal-item"><div><b>${safeHtml(a.name)}</b><div class="animal-small">語尾：${safeHtml(a.suffix)} / ${safeHtml(a.diff)} / ${(a.imageUrl||a.imageData||a.image)?'画像あり':'画像なし'} / ${safeHtml((a.tags||[]).join('・'))}</div></div><button class="btn" onclick="deletePrivateAnimal('${a.id}')">削除</button></div>`).join('');
}
setTimeout(()=>{ renderPrivateAnimalList(); if(document.getElementById('animalVisual')) renderAnimalCard(builtInAnimalData[0], '最近ハマってることは？'); },0);


let currentReloAnswer = "";
const RELO_READING_MAP = {"マーボー豆腐": "マーボードウフ", "チャンジャ": "チャンジャ", "鮭とば": "サケトバ", "たこわさ": "タコワサ", "だし巻きたまご": "ダシマキタマゴ", "枝豆": "エダマメ", "焼きナス": "ヤキナス", "冷やしトマト": "ヒヤシトマト", "もつ鍋": "モツナベ", "軟骨のから揚げ": "ナンコツノカラアゲ", "サラリーマン": "サラリーマン", "オーダーメイド": "オーダーメイド", "ガソリンスタンド": "ガソリンスタンド", "コンセント": "コンセント", "ノートパソコン": "ノートパソコン", "キーホルダー": "キーホルダー", "ベビーカー": "ベビーカー", "ペットボトル": "ペットボトル", "フライドポテト": "フライドポテト", "シュークリーム": "シュークリーム", "ホットケーキ": "ホットケーキ", "アイスコーヒー": "アイスコーヒー", "モーニングコール": "モーニングコール", "クレーム": "クレーム", "リフォーム": "リフォーム", "リサイクルショップ": "リサイクルショップ", "バイキング": "バイキング", "コインランドリー": "コインランドリー", "パワハラ": "パワハラ", "セクハラ": "セクハラ", "ノンアル": "ノンアル", "テイクアウト": "テイクアウト", "テーブルチャージ": "テーブルチャージ", "フリーダイヤル": "フリーダイヤル", "ワンピース": "ワンピース", "スキンシップ": "スキンシップ", "マイブーム": "マイブーム", "リベンジ": "リベンジ", "レベルアップ": "レベルアップ", "スキルアップ": "スキルアップ", "サインペン": "サインペン", "シャープペン": "シャープペン", "ビニール袋": "ビニールブクロ", "ダンボール": "ダンボール", "ホームセンター": "ホームセンター", "ゲームセンター": "ゲームセンター", "ライブハウス": "ライブハウス", "タレント": "タレント", "アイドル": "アイドル", "グラビア": "グラビア", "テンション": "テンション", "ハイテンション": "ハイテンション", "ローテンション": "ローテンション", "ナイーブ": "ナイーブ", "ドンマイ": "ドンマイ", "ファイト": "ファイト", "サービスエリア": "サービスエリア", "バックミラー": "バックミラー", "ウインカー": "ウインカー", "フロントガラス": "フロントガラス", "ハンドルキーパー": "ハンドルキーパー", "キッチンペーパー": "キッチンペーパー", "サランラップ": "サランラップ", "電子レンジ": "デンシレンジ", "オーブントースター": "オーブントースター", "フリーサイズ": "フリーサイズ", "オーバーオール": "オーバーオール", "マンツーマン": "マンツーマン", "キャッチコピー": "キャッチコピー", "イメージチェンジ": "イメージチェンジ", "スキンヘッド": "スキンヘッド", "モーニングセット": "モーニングセット", "カンニング": "カンニング", "アルバイト": "アルバイト", "パート": "パート", "サラダバー": "サラダバー", "ドリンクバー": "ドリンクバー", "ソフトクリーム": "ソフトクリーム", "タッチパネル": "タッチパネル", "セルフレジ": "セルフレジ", "ガードマン": "ガードマン", "ベテラン": "ベテラン", "デッドボール": "デッドボール", "ナイター": "ナイター", "ゲームオーバー": "ゲームオーバー"};
function normalizeReloReading(text){
  return String(text||'')
    .replace(/[ぁ-ん]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 0x60))
    .replace(/ヴ/g,'ブ');
}
function reloVowelToRa(vowel){
  return {a:'ラ', i:'リ', u:'ル', e:'レ', o:'ロ'}[vowel] || '';
}
function kanaCharVowel(ch){
  if('アカサタナハマヤラワガザダバパァャヮ'.includes(ch)) return 'a';
  if('イキシチニヒミリヰギジヂビピィ'.includes(ch)) return 'i';
  if('ウクスツヌフムユルグズヅブプゥュ'.includes(ch)) return 'u';
  if('エケセテネヘメレヱゲゼデベペェ'.includes(ch)) return 'e';
  if('オコソトノホモヨロヲゴゾドボポォョ'.includes(ch)) return 'o';
  return '';
}
function kanaToRero(text){
  const raw=String(text||'');
  const src=normalizeReloReading(RELO_READING_MAP[raw] || raw);
  const smallVowels={'ャ':'a','ュ':'u','ョ':'o','ァ':'a','ィ':'i','ゥ':'u','ェ':'e','ォ':'o'};
  let out='';
  for(let i=0;i<src.length;i++){
    const ch=src[i];
    const next=src[i+1];
    if(ch==='ン'){ out+='ン'; continue; }
    if(ch==='ー' || ch==='ッ' || ch===' ' || ch==='　'){ out+=ch; continue; }
    if(smallVowels[next] && kanaCharVowel(ch)){
      out+=reloVowelToRa(smallVowels[next]);
      i++;
      continue;
    }
    if(smallVowels[ch]){ out+=reloVowelToRa(smallVowels[ch]); continue; }
    const vowel=kanaCharVowel(ch);
    if(vowel){ out+=reloVowelToRa(vowel); continue; }
    out+=ch;
  }
  return out;
}
function getReloMode(){
  return document.querySelector('input[name="reloMode"]:checked')?.value || 'host';
}
function renderReloMode(){
  const hint=document.getElementById('reloHint');
  const ans=document.getElementById('reloAnswerBox');
  const mode=getReloMode();
  if(hint) hint.textContent = mode==='host' ? '枠主読み上げ：正解は枠主だけ確認して、ラリルレロで読んでね。' : '回答モード：ラリルレロ表記を画面に出して、みんなで元の言葉を当てよう。';
  if(ans) ans.style.display='none';
  if(currentReloAnswer) {
    const prev=document.getElementById('reloPreview');
    if(prev) prev.textContent = mode==='host' ? `お題を引いた！枠主は正解表示で確認して読んでね` : kanaToRero(currentReloAnswer);
  }
}
function rollReloGame(){
  currentReloAnswer = pick(state.customGames.relo || []) || 'アジェンダ';
  const mode=getReloMode();
  const prev=document.getElementById('reloPreview');
  const ans=document.getElementById('reloAnswer');
  const box=document.getElementById('reloAnswerBox');
  if(prev) prev.textContent = mode==='host' ? 'お題を引いた！枠主は正解表示で確認して読んでね' : kanaToRero(currentReloAnswer);
  if(ans) ans.textContent=currentReloAnswer;
  if(box) box.style.display='none';
}
function toggleReloAnswer(){
  if(!currentReloAnswer) rollReloGame();
  const ans=document.getElementById('reloAnswer');
  const box=document.getElementById('reloAnswerBox');
  if(ans) ans.textContent=currentReloAnswer;
  if(box) box.style.display = box.style.display==='none' ? 'block' : 'none';
}

const gameData={
  animal:{label:"動物",roll:()=>{ rollAnimalGame(); return `🐾 動物なりきり大喜利を表示したよ`; }},
  ogiri:{label:"大喜利",roll:()=>`🧠 大喜利：${pick(state.customGames.ogiri)}`},
  line:{label:"セリフ",roll:()=>`🎭 セリフ：${pick(state.customGames.line)}`},
  itsu:{label:"いつ誰",roll:()=>`🧩 ${pick(state.customGames.when)} ${pick(state.customGames.who)} ${pick(state.customGames.where)} ${pick(state.customGames.what)}`},
  bob:{label:"ボブ",roll:()=>`📘 ボブジテン：${pick(state.customGames.bob)} ※カタカナ禁止で説明`},
  relo:{label:"酒場",roll:()=>{ rollReloGame(); return "🍻 レロレロ酒場を表示したよ"; }}
};
function rollStageGame(key, targetId){
  if(key==='line' && targetId==='serifPreview'){ rollSerifGame(); return; }
  const el=document.getElementById(targetId);
  if(!el || !gameData[key]) return;
  el.textContent = gameData[key].roll();
}

const trunks=[
  "最近あった地味にムカついた話",
  "昔はダサいと思ってたけど今はアリなもの",
  "仕事中にふと思ったこと",
  "最近ちょっと成長したこと",
  "配信中に決めたい謎ルール",
  "人に言うほどじゃないけど好きなもの",
  "最近買ってよかったもの / 失敗したもの",
  "昔の自分に言いたいこと",
  "大人になってから分かったこと",
  "自分だけかもしれない変なこだわり",
  "初見に聞きたい質問",
  "常連にだけ伝わる内輪ネタ",
  "最近の生活改善チャレンジ",
  "ちょっとした怒りを笑い話にする",
  "食べ物で一生語れるテーマ",
  "仕事あるあるから広げる話",
  "配信で起きたら面白い事件",
  "子どもの頃の謎ルール",
  "もし1日だけ別の職業をやるなら",
  "視聴者に二択で決めてもらう話",
  "自分の弱点をネタにする",
  "最近覚えた言葉・表現",
  "やってみたい企画の相談",
  "昔の流行を今見たらどう思うか",
  "今日のどうでもいいニュース"
];

const branches=[
  "食べ物の話に逃げる",
  "ダーツに例える",
  "英語学習に例える",
  "服の話に飛ばす",
  "昔の自分を掘る",
  "リスナーに二択で聞く",
  "失敗談に変える",
  "地域ネタにする",
  "仕事現場あるあるにする",
  "家族・友達の話に薄く寄せる",
  "コンビニで例える",
  "ゲームのステータス風にする",
  "ランキング形式にする",
  "『逆に』で反対意見を作る",
  "自分の偏見として話す",
  "昭和/平成/令和で比べる",
  "値段の話にする",
  "モテる/モテない論に脱線する",
  "配信者あるあるにする",
  "もしリスナーだったらで聞く",
  "一番ダサい答えを募集する",
  "一番かっこいい言い方に変える",
  "あるあるを3つ出す",
  "小学生の頃ならどうだったか考える",
  "老後の自分ならどうするか考える",
  "湘南っぽく言い換える",
  "英語で言うなら何か考える",
  "食わず嫌いだったものに繋げる",
  "自分ルールを作る",
  "次回企画にできるか考える"
];

const leaves=[
  "コメントが増えた単語を拾う",
  "初見が反応したらそこを太くする",
  "常連がツッコんだら枝化する",
  "笑いが起きた表現を保存",
  "次回の伏線としてログに残す",
  "リスナーの一言をタイトル化する",
  "投票ネタに変える",
  "切り抜き候補として保存する"
];

function makeBranchPack(){
  const pool=[...branches];
  const count=2+Math.floor(Math.random()*2);
  const picked=[];
  for(let i=0;i<count;i++){
    const idx=Math.floor(Math.random()*pool.length);
    picked.push(`・${pool.splice(idx,1)[0]}`);
  }
  return picked.join("\n");
}

function load(){try{return JSON.parse(localStorage.getItem(KEY))||defaultState}catch(e){return structuredClone(defaultState)}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function showScreen(id){
  if(id!=="chinchiro") stopChinBgm();
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.screen===id));
  if(id==="bonus") renderBonus();
  if(id==="memo") renderMemo();
  if(id==="settings") renderSettings();
  if(id==="calendar") renderCalendar();
  if(id==="tools") renderTools();
  if(id==="enduranceTool") renderEnduranceTool();
  if(id==="kujiTool") renderKujiTool();
  if(id==="tileTool") renderTileTool();
  if(id==="chinchiro"){ renderChinMode(); startChinBgm(); }
}
document.querySelectorAll(".nav button").forEach(b=>b.addEventListener("click",()=>showScreen(b.dataset.screen)));

if(window.openChinchiroFromGames) openChinchiroFromGames.onclick=()=>showScreen("chinchiro");
if(window.openCalendarFromTools) openCalendarFromTools.onclick=()=>showScreen("calendar");


function renderHome(){
  treeTrunk.textContent=state.tree.trunk;
  const branchesText=String(state.tree.branch||"").split(/\n+/).map(x=>x.replace(/^・/,"").trim()).filter(Boolean);
  treeBranch.innerHTML=branchesText.length
    ? `<ul class="branch-list">${branchesText.map(x=>`<li>${escapeHtml(x)}</li>`).join("")}</ul>`
    : "話が止まった時の逃げ道";
  treeLeaf.textContent=state.tree.leaf;
  homeLogs.innerHTML=state.logs.slice(0,8).map(l=>`<div><b>${escapeHtml(l.title||"ログ")}</b><br><span class="muted">${escapeHtml(l.date)}</span><br>${escapeHtml(l.text)}</div>`).join("")||`<div>まだログなし</div>`;
  renderHomeNotice();
}
function renderHomeNotice(){
  if(!window.homeNoticeList) return;
  const today=new Date();
  const items=[];
  for(let i=1;i<=3;i++){
    const d=new Date(today.getFullYear(),today.getMonth(),today.getDate()+i);
    const date=ymd(d);
    const evs=eventsForDate(date);
    if(evs.length){
      items.push(`<div class="notice-item"><div class="notice-date">📅 ${escapeHtml(date)}</div>${evs.map(ev=>`<div>・${escapeHtml(ev.listener)}：${escapeHtml(ev.item||ev.type)} <span class="muted">${escapeHtml(ev.type||"")}</span></div>`).join("")}</div>`);
    }
  }
  homeNoticeList.innerHTML=items.join("") || `<div class="notice-empty">明日から3日間の予定はありません。</div>`;
}
if(window.openCalendarFromNotice) openCalendarFromNotice.onclick=()=>showScreen("calendar");
autoTree.onclick=()=>{state.tree={trunk:pick(trunks),branch:makeBranchPack(),leaf:pick(leaves)};save();renderHome()}
nextBranch.onclick=()=>{state.tree.branch=makeBranchPack();save();renderHome()}
branchToLeaf.onclick=()=>{state.tree.leaf=state.tree.branch;state.logs.unshift({date:new Date().toLocaleString("ja-JP"),title:"葉っぱ保存",text:state.tree.branch});save();renderHome()}
saveQuickMemo.onclick=()=>{const v=quickMemo.value.trim();if(!v)return;state.logs.unshift({date:new Date().toLocaleString("ja-JP"),title:"配信メモ",text:v});quickMemo.value="";save();renderHome()}

function renderGames(){
  setupToolCollapse();
  renderRoulette();
  // v94: ゲーム一覧は「開く」ボタンだけに整理。旧クイックガチャUIが残っている場合のみ動かす。
  if(typeof gameTabs!=="undefined" && gameTabs){
    gameTabs.innerHTML=Object.entries(gameData).map(([k,g])=>`<button data-game="${k}" class="${k===selectedGame?"active":""}">${g.label}</button>`).join("");
    gameTabs.querySelectorAll("button").forEach(b=>b.onclick=()=>{selectedGame=b.dataset.game;renderGames()});
  }
  if(typeof gameHistory!=="undefined" && gameHistory){
    gameHistory.innerHTML=state.gameHistory.map(h=>`<div>${escapeHtml(h)}</div>`).join("")||`<div>まだ履歴なし</div>`;
  }
}
if(typeof rollGame!=="undefined" && rollGame){
  rollGame.onclick=()=>{const r=gameData[selectedGame].roll();gameResult.textContent=r;state.gameHistory.unshift(r);state.gameHistory=state.gameHistory.slice(0,20);save();renderGames()}
}
if(typeof saveGameLog!=="undefined" && saveGameLog){
  saveGameLog.onclick=()=>{const r=gameResult.textContent.trim();state.logs.unshift({date:new Date().toLocaleString("ja-JP"),title:"ゲーム結果",text:r});save();renderHome()}
}


function getLogboDays(listener){
  listener.logboByMonth = listener.logboByMonth || {};
  if(!listener.logboByMonth[state.logboMonth]) listener.logboByMonth[state.logboMonth]=[];
  return listener.logboByMonth[state.logboMonth];
}
function setLogboDays(listener, days){
  listener.logboByMonth = listener.logboByMonth || {};
  listener.logboByMonth[state.logboMonth]=[...days].sort((a,b)=>a-b);
  listener.days = listener.logboByMonth[state.logboMonth]; // 旧表示互換
}
function logboMonthDate(){
  const [y,m]=state.logboMonth.split("-").map(Number);
  return new Date(y,m-1,1);
}
function shiftLogboMonth(delta){
  const d=logboMonthDate();
  d.setMonth(d.getMonth()+delta);
  state.logboMonth=ym(d);
  state.listeners.forEach(l=>{ l.days=getLogboDays(l); });
  save();
  renderBonus();
  renderMemo();
}
function renderLogboCalendar(listener, listenerIndex){
  const d=logboMonthDate();
  const y=d.getFullYear();
  const m=d.getMonth();
  const daysInMonth=new Date(y,m+1,0).getDate();
  const firstDow=new Date(y,m,1).getDay();
  const checked=getLogboDays(listener);
  const weeks=["日","月","火","水","木","金","土"];
  let daysHtml="";
  for(let i=0;i<firstDow;i++){
    daysHtml+=`<div class="day blank"></div>`;
  }
  for(let day=1;day<=daysInMonth;day++){
    const dow=new Date(y,m,day).getDay();
    daysHtml+=`<button class="day ${checked.includes(day)?"on":""} ${dow===0?"sun":dow===6?"sat":""}" data-day="${day}">
      <span>${day}</span><small>${weeks[dow]}</small>
    </button>`;
  }
  return `<div class="logbo-calendar"><div class="logbo-days-grid" style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:7px;width:100%">${daysHtml}</div></div>`;
}
function currentLogboCount(listener){
  return getLogboDays(listener).length;
}

function renderBonus(){
  if(window.bulkLogboDate && !bulkLogboDate.value) bulkLogboDate.value=ymd(new Date());
  state.listeners.forEach(l=>{ l.days=getLogboDays(l); });
  listenerTabs.innerHTML=state.listeners.map((l,i)=>`<button class="${i===selectedListener?"active":""}" data-i="${i}">${escapeHtml(l.name)}</button>`).join("");
  listenerTabs.querySelectorAll("button").forEach(b=>b.onclick=()=>{selectedListener=Number(b.dataset.i);renderBonus()});
  const l=state.listeners[selectedListener];
  selectedListenerBox.innerHTML=`
    <h3>${escapeHtml(l.name)}</h3>
    <p class="muted">参加 ${currentLogboCount(l)}日 / ${state.logboMonth}</p>
    <div class="penalty-box">
      <div class="row" style="justify-content:space-between">
        <div>
          <div class="muted">ペナルティー</div>
          <div class="penalty-count">${l.penalty || 0}</div>
        </div>
        <div class="row">
          <button class="btn danger mini-btn" data-penalty-minus="${selectedListener}">−</button>
          <button class="btn danger mini-btn" data-penalty-plus="${selectedListener}">＋</button>
          <button class="btn mini-btn" data-penalty-reset="${selectedListener}">リセット</button>
          <button class="btn mini-btn" data-penalty-detail="${selectedListener}">内容を開く</button>
        </div>
      </div>
      <div class="penalty-details" data-penalty-detail-box="${selectedListener}">
        ${penaltyDetailList(l.name)}
      </div>
    </div>
    <div class="logbo-month-head">
      <button class="btn mini-btn" onclick="shiftLogboMonth(-1)">← 前月</button>
      <b>${state.logboMonth}</b>
      <button class="btn mini-btn" onclick="shiftLogboMonth(1)">次月 →</button>
    </div>
    ${renderLogboCalendar(l, selectedListener)}
    <h3 style="margin-top:14px">達成済み</h3>
    ${achievedList(l)}
  `;
  selectedListenerBox.querySelectorAll(".day:not(.blank)").forEach(b=>b.onclick=()=>{
    const d=Number(b.dataset.day);
    const days=getLogboDays(l);
    setLogboDays(l, days.includes(d)?days.filter(x=>x!==d):[...days,d]);
    save();renderBonus();renderMemo();
  });
  bindPenaltyButtons(selectedListenerBox);
  renderRewards();
}

function getBulkLogboInfo(){
  const v=bulkLogboDate?.value;
  const date=v ? new Date(v+"T00:00:00") : new Date();
  if(!v && bulkLogboDate) bulkLogboDate.value=ymd(date);
  return {month:ym(date), day:date.getDate()};
}
function bulkSetLogbo(shouldAdd){
  const info=getBulkLogboInfo();
  const day=info.day;
  if(!day || day<1 || day>31) return alert("日付が変だぞｗ");
  const msg=shouldAdd
    ? `${info.month} ${day}日を全員にログボ入力する？`
    : `${info.month} ${day}日を全員から外す？`;
  if(!confirm(msg)) return;
  state.logboMonth=info.month;
  state.listeners.forEach(l=>{
    l.logboByMonth=l.logboByMonth||{};
    const days=l.logboByMonth[info.month]||[];
    l.logboByMonth[info.month]=shouldAdd
      ? Array.from(new Set([...days,day])).sort((a,b)=>a-b)
      : days.filter(d=>d!==day);
    l.days=l.logboByMonth[state.logboMonth];
  });
  save();
  renderBonus();
  renderMemo();
}
if(window.bulkLogboAdd) bulkLogboAdd.onclick=()=>bulkSetLogbo(true);
if(window.bulkLogboRemove) bulkLogboRemove.onclick=()=>bulkSetLogbo(false);

function renderRewards(){
  rewardEditor.innerHTML=state.rewards.map((r,i)=>`
    <div class="reward-row">
      <input type="number" min="1" max="31" value="${r.days}" data-i="${i}" data-field="days">
      <input value="${escapeAttr(r.name)}" data-i="${i}" data-field="name">
      <button class="btn danger" data-del="${i}">削除</button>
    </div>`).join("");
  rewardEditor.querySelectorAll("input").forEach(inp=>inp.onchange=()=>{const i=Number(inp.dataset.i); const f=inp.dataset.field; state.rewards[i][f]=f==="days"?Number(inp.value):inp.value; state.rewards.sort((a,b)=>a.days-b.days); save();renderBonus();renderMemo()});
  rewardEditor.querySelectorAll("[data-del]").forEach(btn=>btn.onclick=()=>{state.rewards.splice(Number(btn.dataset.del),1);save();renderBonus();renderMemo()});
}
addReward.onclick=()=>{state.rewards.push({days:1,name:"新しい達成品"});state.rewards.sort((a,b)=>a.days-b.days);save();renderBonus()}
addListener.onclick=()=>{const name=prompt("常連名");if(!name)return;const today=ymd(new Date());state.listeners.push({name,days:[],logboByMonth:{[state.logboMonth]:[]},memo:"",penalty:0,registeredDate:today,updatedAt:new Date().toISOString(),searchYomi:"",searchTags:""});selectedListener=state.listeners.length-1;state.calendarEvents.push({id:uid("cal"),date:today,listener:name,type:"登録日",item:"常連登録"});save();renderBonus();renderMemo();renderCalendar()}
function deleteListener(index){
  const l=state.listeners[index];
  if(!l)return;
  if(!confirm(`${l.name} を削除する？\nログボ記録と常連メモも消えるよ。`)) return;
  state.calendarEvents = (state.calendarEvents||[]).filter(ev=>ev.listener!==l.name);
  state.listeners.splice(index,1);
  if(state.listeners.length===0){
    state.listeners.push({name:"新しい常連",days:[],logboByMonth:{[state.logboMonth]:[]},memo:"",penalty:0,registeredDate:"",birthday:""});
  }
  selectedListener=Math.min(selectedListener,state.listeners.length-1);
  if(selectedListener<0) selectedListener=0;
  save();
  renderBonus();
  renderMemo();
}
if(window.deleteSelectedListener) deleteSelectedListener.onclick=()=>deleteListener(selectedListener);
function changePenalty(index,delta){
  const l=state.listeners[index];
  if(!l)return;
  if(typeof l.penalty!=="number") l.penalty=0;
  l.penalty=Math.max(0,l.penalty+delta);
  save();
  renderBonus();
  renderMemo();
}
function resetPenalty(index){
  const l=state.listeners[index];
  if(!l)return;
  if(!confirm(`${l.name} のペナルティーをリセットする？`)) return;
  l.penalty=0;
  save();
  renderBonus();
  renderMemo();
}
function bindPenaltyButtons(root=document){
  root.querySelectorAll("[data-penalty-plus]").forEach(btn=>btn.onclick=()=>changePenalty(Number(btn.dataset.penaltyPlus),1));
  root.querySelectorAll("[data-penalty-minus]").forEach(btn=>btn.onclick=()=>changePenalty(Number(btn.dataset.penaltyMinus),-1));
  root.querySelectorAll("[data-penalty-reset]").forEach(btn=>btn.onclick=()=>resetPenalty(Number(btn.dataset.penaltyReset)));
  root.querySelectorAll("[data-penalty-detail]").forEach(btn=>btn.onclick=()=>{
    const idx=btn.dataset.penaltyDetail;
    const box=root.querySelector(`[data-penalty-detail-box="${idx}"]`);
    if(!box)return;
    box.classList.toggle("open");
    btn.textContent=box.classList.contains("open") ? "内容を閉じる" : "内容を開く";
  });
}

function achievedList(l){
  const count=currentLogboCount(l);
  const items=state.rewards.filter(r=>count>=r.days).map(r=>`<li>${r.days}日：${escapeHtml(r.name)}</li>`).join("");
  return `<ul class="clean">${items||"<li>まだ達成品なし</li>"}</ul>`;
}

let detailListenerIndex=0;

function dateDiffText(dateStr){
  if(!dateStr) return "-";
  const start=new Date(dateStr+"T00:00:00");
  const now=new Date();
  if(isNaN(start.getTime())) return "-";
  let days=Math.floor((now-start)/(1000*60*60*24));
  if(days<0) return "未来の日付";
  const years=Math.floor(days/365.2425);
  const months=Math.floor(days/30.4375);
  if(years>=1) return `${years}年くらい / ${days}日`;
  if(months>=1) return `${months}ヶ月くらい / ${days}日`;
  return `${days}日`;
}
function calcAge(birthday){
  if(!birthday) return "-";
  const b=new Date(birthday+"T00:00:00");
  const now=new Date();
  if(isNaN(b.getTime())) return "-";
  let age=now.getFullYear()-b.getFullYear();
  const hadBirthday=(now.getMonth()>b.getMonth()) || (now.getMonth()===b.getMonth() && now.getDate()>=b.getDate());
  if(!hadBirthday) age--;
  return age>=0 ? `${age}歳` : "-";
}


function splitBirthday(birthday){
  if(!birthday) return {month:"",day:""};
  const parts=String(birthday).split("/");
  return {month:parts[0]||"",day:parts[1]||""};
}
function formatBirthday(month, day){
  const m=Number(month);
  const d=Number(day);
  if(!m || !d) return "";
  return `${String(m).padStart(2,"0")}/${String(d).padStart(2,"0")}`;
}

function isBirthdayToday(birthday){
  if(!birthday) return false;
  const now=new Date();
  const md=`${String(now.getMonth()+1).padStart(2,"0")}/${String(now.getDate()).padStart(2,"0")}`;
  return birthday===md;
}

function displayAge(l){
  if(!l || !l.birthday) return "-";
  if(!l.birthYear) return "年齢不詳";
  const birth=l.birthday || "";
  if(birth.length>=5){
    const md=birth.replace("/", "-");
    return calcAge(`${l.birthYear}-${md}`);
  }
  return "年齢不詳";
}

function generateTopicSeeds(l){
  const f=l.favorites || {};
  const name=l.nickname || l.name || "この人";
  const seeds=[];

  if(l.nickname) seeds.push(`あだ名は「${l.nickname}」。呼び方ネタにできる`);
  if(l.birthday) seeds.push(`誕生日は ${l.birthday}。${calcAge(l.birthday)}の話題にできる`);
  if(l.bloodType) seeds.push(`${l.bloodType}っぽいところを軽く聞ける`);
  if(l.firstVisitDate || l.registeredDate) seeds.push(`初来枠から ${dateDiffText(l.firstVisitDate || l.registeredDate)}。記念日トークにできる`);
  if(f.area) seeds.push(`${f.area}の天気・方言・地元ネタを振れる`);
  if(f.project) seeds.push(`${name}は「${f.project}」好き。今日やるか聞ける`);
  if(f.game) seeds.push(`${f.game}最近やってる？で広げられる`);
  if(f.food) seeds.push(`${f.food}のおすすめ店・食べ方を聞ける`);
  if(f.music) seeds.push(`${f.music}系の曲やライブ話を振れる`);
  if(f.anime) seeds.push(`${f.anime}の推しキャラ・名シーンを聞ける`);
  if(f.habit) seeds.push(`${f.habit}としていじれる/拾える`);
  if(f.free1) seeds.push(`${f.free1}から一言質問を作る`);
  if(f.free2) seeds.push(`${f.free2}から近況を聞ける`);
  if(f.dislikeFood) seeds.push(`嫌いな食べ物は${f.dislikeFood}。食べ物トークで避ける/軽く聞ける`);
  if(f.firstGame) seeds.push(`初めてやったゲームは${f.firstGame}。懐かしゲーム話に繋げる`);
  if(f.mainWeapon) seeds.push(`よく使う武器/キャラは${f.mainWeapon}。こだわりを聞ける`);
  if(f.holiday) seeds.push(`休日は${f.holiday}。休みの日トークに使える`);
  if(f.bgm) seeds.push(`作業用BGMは${f.bgm}。音楽の話を振れる`);
  if(f.localThing) seeds.push(`地元あるある：${f.localThing}`);
  if(f.season) seeds.push(`好きな季節は${f.season}。季節ネタに振れる`);
  if(f.animal) seeds.push(`好きな動物は${f.animal}。動物ネタに使える`);
  if(f.oshi) seeds.push(`推しは${f.oshi}。推し活トークに繋げる`);
  if(f.firstStream) seeds.push(`初見だった配信/企画は${f.firstStream}。思い出話にできる`);
  if(f.oneLine) seeds.push(`一言プロフィール：${f.oneLine}`);
  if(f.teaseLine) seeds.push(`いじりOKライン：${f.teaseLine}`);
  if(f.ngTopic) seeds.push(`⚠ NG注意：${f.ngTopic}`);
  if((l.penalty||0)>0) seeds.push(`ペナルティー${l.penalty}回。内容確認から話を作れる`);

  if(!seeds.length) seeds.push("まだ情報少なめ。好きな企画・地域・NG話題を入れると話題化できる");
  return seeds.slice(0,16);
}
function refreshTopicSeeds(index){
  const l=state.listeners[index];
  if(!l)return;
  l.topicSeeds=generateTopicSeeds(l);
  save();
  renderMemo();
  if(document.getElementById("listenerDetail").classList.contains("active")) renderListenerDetail();
}
function renderSeedList(l,i){
  const seeds=(l.topicSeeds && l.topicSeeds.length) ? l.topicSeeds : generateTopicSeeds(l);
  return `<div class="seed-box">
    <div class="row" style="justify-content:space-between">
      <b>🧠 話題の種</b>
      <button class="btn mini-btn" data-refresh-seeds="${i}">話題更新</button>
    </div>
    <div class="seed-list">${seeds.slice(0,5).map(s=>`<div class="seed-item">${escapeHtml(s)}</div>`).join("")}</div>
  </div>`;
}

function openListenerDetail(index){
  detailListenerIndex=index;
  renderListenerDetail();
  showScreen("listenerDetail");
}
function renderListenerDetail(){
  const l=state.listeners[detailListenerIndex];
  if(!l) return;
  detailName.textContent=`${l.name} の詳細設定`;
  detailInputName.value=l.name || "";
  detailNickname.value=l.nickname || "";
  if(window.detailSearchYomi) detailSearchYomi.value=l.searchYomi || "";
  if(window.detailSearchTags) detailSearchTags.value=l.searchTags || "";
  const bd=splitBirthday(l.birthday || "");
  detailBirthMonth.value=bd.month ? Number(bd.month) : "";
  detailBirthDay.value=bd.day ? Number(bd.day) : "";
  detailBirthYear.value=l.birthYear || "";
  detailBlood.value=l.bloodType || "";
  detailFirstVisit.value=l.firstVisitDate || l.registeredDate || "";
  detailAge.textContent=displayAge(l);
  detailSinceFirst.textContent=dateDiffText(l.firstVisitDate || l.registeredDate);
  detailBloodView.textContent=l.bloodType || "-";
  if(window.detailLeapNote) detailLeapNote.style.display=isLeapBirthday(l.birthday) ? "block" : "none";
  const f=l.favorites || {};
  favProject.value=f.project || "";
  favGame.value=f.game || "";
  favFood.value=f.food || "";
  favArea.value=f.area || "";
  favMusic.value=f.music || "";
  favAnime.value=f.anime || "";
  favHabit.value=f.habit || "";
  favFree1.value=f.free1 || "";
  favFree2.value=f.free2 || "";
  favNgTopic.value=f.ngTopic || "";
  favDislikeFood.value=f.dislikeFood || "";
  favFirstGame.value=f.firstGame || "";
  favMainWeapon.value=f.mainWeapon || "";
  favHoliday.value=f.holiday || "";
  favBgm.value=f.bgm || "";
  favLocalThing.value=f.localThing || "";
  favSeason.value=f.season || "";
  favAnimal.value=f.animal || "";
  favOshi.value=f.oshi || "";
  favFirstStream.value=f.firstStream || "";
  favOneLine.value=f.oneLine || "";
  favTeaseLine.value=f.teaseLine || "";

  const seeds=l.topicSeeds && l.topicSeeds.length ? l.topicSeeds : generateTopicSeeds(l);
  detailTopicSeeds.innerHTML=seeds.map(s=>`<div>${escapeHtml(s)}</div>`).join("") || `<div class="muted">まだ話題の種なし</div>`;
}
if(window.backToMemo) backToMemo.onclick=()=>showScreen("memo");
if(window.refreshDetailSeeds) refreshDetailSeeds.onclick=()=>refreshTopicSeeds(detailListenerIndex);
if(window.toggleMoreDetail) toggleMoreDetail.onclick=()=>{
  moreDetailPanel.classList.toggle("open");
  toggleMoreDetail.textContent=moreDetailPanel.classList.contains("open") ? "お気に入り詳細を閉じる" : "お気に入りをもっと詳しく";
};
if(window.saveListenerDetail) saveListenerDetail.onclick=()=>{
  const l=state.listeners[detailListenerIndex];
  if(!l) return;
  const oldName=l.name;
  const newName=detailInputName.value.trim() || oldName;
  l.name=newName;
  l.nickname=detailNickname.value.trim();
  l.searchYomi=(window.detailSearchYomi ? detailSearchYomi.value.trim() : (l.searchYomi || ""));
  l.searchTags=(window.detailSearchTags ? detailSearchTags.value.trim() : (l.searchTags || ""));
  l.birthday=formatBirthday(detailBirthMonth.value, detailBirthDay.value);
  l.birthYear=detailBirthYear.value.trim();
  l.bloodType=detailBlood.value;
  l.firstVisitDate=detailFirstVisit.value;
  l.favorites={
    project:favProject.value.trim(),
    game:favGame.value.trim(),
    food:favFood.value.trim(),
    area:favArea.value.trim(),
    music:favMusic.value.trim(),
    anime:favAnime.value.trim(),
    habit:favHabit.value.trim(),
    free1:favFree1.value.trim(),
    free2:favFree2.value.trim(),
    ngTopic:favNgTopic.value.trim(),
    dislikeFood:favDislikeFood.value.trim(),
    firstGame:favFirstGame.value.trim(),
    mainWeapon:favMainWeapon.value.trim(),
    holiday:favHoliday.value.trim(),
    bgm:favBgm.value.trim(),
    localThing:favLocalThing.value.trim(),
    season:favSeason.value.trim(),
    animal:favAnimal.value.trim(),
    oshi:favOshi.value.trim(),
    firstStream:favFirstStream.value.trim(),
    oneLine:favOneLine.value.trim(),
    teaseLine:favTeaseLine.value.trim()
  };
  l.topicSeeds=generateTopicSeeds(l);
  l.updatedAt=new Date().toISOString();
  if(l.firstVisitDate) l.registeredDate=l.firstVisitDate;

  if(oldName!==newName){
    (state.calendarEvents||[]).forEach(ev=>{ if(ev.listener===oldName) ev.listener=newName; });
  }

  if(l.registeredDate){
    const exists=(state.calendarEvents||[]).some(ev=>ev.listener===l.name && ev.type==="登録日" && ev.date===l.registeredDate);
    if(!exists) state.calendarEvents.push({id:uid("cal"),date:l.registeredDate,listener:l.name,type:"登録日",item:"初来枠 / 常連登録"});
  }

  save();
  renderListenerDetail();
  renderMemo();
  renderBonus();
  renderCalendar();
  alert("保存した！");
};

function renderMemo(){
  memoGrid.innerHTML=state.listeners.map((l,i)=>`
    <div class="card"><div class="inner">
      <div class="row" style="justify-content:space-between">
        <h2 style="margin:0">${escapeHtml(l.name)}</h2>
        <div class="row">
          <button class="btn mini-btn" data-open-detail="${i}">詳細設定</button>
          <button class="btn danger" data-delete-memo-listener="${i}" style="min-height:36px;padding:6px 10px">削除</button>
        </div>
      </div>
      <p class="muted">${l.nickname ? "@" + escapeHtml(l.nickname) + " / " : ""}ログボ ${currentLogboCount(l)}日 / ${state.logboMonth}</p>
      ${l.birthday ? `<p class="muted">🎂 誕生日 ${escapeHtml(l.birthday)}</p>` : ""}
      ${isLeapBirthday(l.birthday) ? `<div class="leap-note">🎂 うるう日生まれ：平年は2/28扱いで表示します。</div>` : ""}
      <p class="muted">年齢 ${displayAge(l)} / 初来枠から ${dateDiffText(l.firstVisitDate || l.registeredDate)}</p>
      ${renderSeedList(l,i)}
      <div class="penalty-box">
        <div class="row" style="justify-content:space-between">
          <div>
            <div class="muted">ペナルティー</div>
            <div class="penalty-count">${l.penalty || 0}</div>
          </div>
          <div class="row">
            <button class="btn danger mini-btn" data-penalty-minus="${i}">−</button>
            <button class="btn danger mini-btn" data-penalty-plus="${i}">＋</button>
            <button class="btn mini-btn" data-penalty-reset="${i}">リセット</button>
            <button class="btn mini-btn" data-penalty-detail="${i}">内容を開く</button>
          </div>
        </div>
        <div class="penalty-details" data-penalty-detail-box="${i}">
          ${penaltyDetailList(l.name)}
        </div>
      </div>
      <h3>達成依頼 / 達成品</h3>
      ${achievedList(l)}
      <h3>カレンダー同期メモ</h3>
      ${calendarMemoList(l.name)}
      <label>常連メモ</label>
      <textarea data-memo="${i}">${escapeHtml(l.memo||"")}</textarea>
    </div></div>`).join("");
  memoGrid.querySelectorAll("textarea").forEach(t=>t.onchange=()=>{state.listeners[Number(t.dataset.memo)].memo=t.value;save()});
  memoGrid.querySelectorAll("[data-birthday]").forEach(inp=>inp.onchange=()=>{
    state.listeners[Number(inp.dataset.birthday)].birthday=inp.value;
    save();renderMemo();renderCalendar();
  });
  memoGrid.querySelectorAll("[data-registered-date]").forEach(inp=>inp.onchange=()=>{
    const l=state.listeners[Number(inp.dataset.registeredDate)];
    l.registeredDate=inp.value;
    if(inp.value){
      const exists=(state.calendarEvents||[]).some(ev=>ev.listener===l.name && ev.type==="登録日" && ev.date===inp.value);
      if(!exists) state.calendarEvents.push({id:uid("cal"),date:inp.value,listener:l.name,type:"登録日",item:"常連登録"});
    }
    save();renderMemo();renderCalendar();
  });
  memoGrid.querySelectorAll("[data-refresh-seeds]").forEach(btn=>btn.onclick=()=>refreshTopicSeeds(Number(btn.dataset.refreshSeeds)));
  memoGrid.querySelectorAll("[data-open-detail]").forEach(btn=>btn.onclick=()=>openListenerDetail(Number(btn.dataset.openDetail)));
  memoGrid.querySelectorAll("[data-delete-memo-listener]").forEach(btn=>btn.onclick=()=>deleteListener(Number(btn.dataset.deleteMemoListener)));
  bindPenaltyButtons(memoGrid);
}


function fitBrushText(text){
  const plain=String(text).replace(/[─ー\\s]/g,"");
  brush.classList.remove("long","xlong");
  if(plain.length>=18) brush.classList.add("xlong");
  else if(plain.length>=10) brush.classList.add("long");
}

/* Chinchiro */
let rolling=false;
let diceEls=[];
function renderDiceArea(count){
  const c=Math.max(1,Math.min(6,Number(count)||3));
  const size = c<=3 ? "clamp(68px,13vw,112px)" : c<=4 ? "clamp(58px,11vw,92px)" : "clamp(48px,9vw,76px)";
  diceArea.style.setProperty("--dice-size", size);
  diceArea.innerHTML=Array.from({length:c},(_,i)=>`<div class="dice" id="d${i+1}"></div>`).join("");
  diceEls=Array.from(diceArea.querySelectorAll(".dice"));
  diceEls.forEach(d=>setDice(d,1));
}
renderDiceArea(3);
function play(id){const a=document.getElementById(id); if(!a) return; try{a.volume=(state.settings?.seVolume ?? 80)/100; a.currentTime=0; a.play().catch(()=>{})}catch(e){}}
function rand(){return Math.floor(Math.random()*6)+1}
function judge(arr){
  const s=[...arr].sort((a,b)=>a-b).join("");
  if(s==="111") return {name:"ピンゾロ",brush:"── ピンゾロ ──",type:"best"};
  if(s==="123") return {name:"ヒフミ",brush:"── ヒフミ ──",type:"worst"};
  if(s==="456") return {name:"シゴロ",brush:"── シゴロ ──",type:"win"};
  if(arr[0]===arr[1]&&arr[1]===arr[2]) return {name:`${arr[0]}ゾロ`,brush:`── ${kana[arr[0]-1]}ゾロ ──`,type:"zoro"};
  for(let n=1;n<=6;n++){
    if(arr.filter(x=>x===n).length===2){
      const point=arr.find(x=>x!==n);
      return {name:`通常目 ${point}`,brush:`── ${kana[point-1]}の目 ──`,type:"normal"};
    }
  }
  return {name:"目なし",brush:"── 目なし ──",type:"none"};
}
rollChin.onclick=()=>{
  if(rolling)return; rolling=true;
  chStage.className="ch-stage"; brush.className="brush"; ink.className="ink";
  play("seGlass");
  diceEls.forEach(d=>d.classList.add("rolling"));
  let spin=setInterval(()=>diceEls.forEach(d=>setDice(d,rand())),75);
  setTimeout(()=>{
    clearInterval(spin);
    const diceCount = state.chin.mode==="custom" ? state.chin.diceCount : 3;
    let final=Array.from({length:diceCount},()=>rand());
    const p=Math.random();
    if(state.chin.mode!=="custom"){
      if(p<0.08) final=[1,1,1];
      else if(p<0.17) final=[1,2,3];
    }
    diceEls.forEach((d,i)=>{d.classList.remove("rolling");setDice(d,final[i])});
    let res=judge(final);
    let displayText=res.brush;
    let logName=res.name;

    if(state.chin.mode==="custom"){
      const items=final.map((num,i)=>state.chin.customDice[i]?.[num] || `${num}の目`);
      const namedItems=items.map((item,i)=>`${state.chin.diceNames[i]||`サイコロ${i+1}`}：${item}`);
      const allSame=items.length>1 && items.every(x=>x===items[0]);
      if(allSame){
        displayText=`── ${items[0]} ──`;
        logName=`カスタム一致：${items[0]}`;
        res={...res,type:"customHit"};
      }else{
        displayText=`── ${namedItems.join(" / ")} ──`;
        logName=`カスタム：${namedItems.join(" / ")}`;
        res={...res,type:"custom"};
      }
    }

    if(state.chin.mode==="local"){
      const key=comboKey(final);
      const text=state.chin.localMap[key] || defaultLocalText(key);
      displayText=`── ${text} ──`;
      logName=`ローカル：${text}`;
      res={...res,type:res.type};
    }

    const hasSpecialSound = ["best","worst","zoro","customHit"].includes(res.type);
    if(!hasSpecialSound) play("seKoduzumi");
    setTimeout(()=>{
      ink.className="ink show";
      brush.textContent=displayText;
      brush.className="brush show";
      fitBrushText(displayText);
      if(res.type==="best"){chStage.className="ch-stage hot shake";brush.className="brush gold show";fitBrushText(displayText);play("seHorn")}
      else if(res.type==="worst"){chStage.className="ch-stage cold shake";brush.className="brush blue show";fitBrushText(displayText);play("seChime")}
      else if(res.type==="zoro" || res.type==="customHit"){chStage.className="ch-stage hot shake";brush.className="brush gold show";fitBrushText(displayText);play("seSword")}
      else if(res.type==="win"){chStage.className="ch-stage hot";brush.className="brush gold show";fitBrushText(displayText)}
      else {chStage.className="ch-stage";fitBrushText(displayText)}
      state.chLog.unshift(`${new Date().toLocaleTimeString("ja-JP")}　${final.join("・")}　${logName}`);
      state.chLog=state.chLog.slice(0,20); save(); renderChLog();
      rolling=false;
    },420);
  },1450);
}
function renderChLog(){chLog.innerHTML=state.chLog.map(x=>`<div>${escapeHtml(x)}</div>`).join("")||`<div>まだ出目なし</div>`}


function applyVolumes(){
  const bgm=document.getElementById("bgmChin");
  if(bgm) bgm.volume=(state.settings.bgmVolume||0)/100;
  ["seGlass","seKoduzumi","seHorn","seChime","seSword"].forEach(id=>{
    const a=document.getElementById(id);
    if(a) a.volume=(state.settings.seVolume||0)/100;
  });
}
function startChinBgm(){
  applyVolumes();
  const bgm=document.getElementById("bgmChin");
  if(!bgm) return;
  try{ bgm.play().catch(()=>{}); }catch(e){}
}
function stopChinBgm(){
  const bgm=document.getElementById("bgmChin");
  if(!bgm) return;
  bgm.pause();
}
const editLabels={
  animalAnimals:"動物ゲーム：動物",
  animalTopics:"動物ゲーム：お題",
  ogiri:"大喜利：お題",
  line:"セリフ：セリフ",
  when:"いつ誰どこ何：いつ",
  who:"いつ誰どこ何：誰が",
  where:"いつ誰どこ何：どこで",
  what:"いつ誰どこ何：何をした",
  bob:"ボブジテン：単語",
  relo:"レロレロ酒場：単語"
};

function renderFirebaseSettings(){
  if(!window.firebaseApiKey) return;
  const f=state.settings.firebase || {};
  firebaseEnabled.checked=!!f.enabled;
  firebaseApiKey.value=f.apiKey || "";
  firebaseAuthDomain.value=f.authDomain || "";
  firebaseProjectId.value=f.projectId || "";
  firebaseStorageBucket.value=f.storageBucket || "";
  firebaseMessagingSenderId.value=f.messagingSenderId || "";
  firebaseAppId.value=f.appId || "";
}
if(window.saveFirebaseConfig) saveFirebaseConfig.onclick=()=>{
  state.settings.firebase={
    enabled:!!firebaseEnabled.checked,
    apiKey:firebaseApiKey.value.trim(),
    authDomain:firebaseAuthDomain.value.trim(),
    projectId:firebaseProjectId.value.trim(),
    storageBucket:firebaseStorageBucket.value.trim(),
    messagingSenderId:firebaseMessagingSenderId.value.trim(),
    appId:firebaseAppId.value.trim()
  };
  save();
  alert("Firebase設定を保存した！");
};
if(window.firebaseTestBtn) firebaseTestBtn.onclick=()=>{
  const f=state.settings.firebase || {};
  const ok=f.apiKey && f.projectId && f.appId;
  alert(ok ? "Firebase接続情報OKっぽい！" : "設定が足りないかも！");
};

function renderSettings(){
  bgmVolume.value=state.settings.bgmVolume;
  seVolume.value=state.settings.seVolume;
  alarmVolume.value=state.settings.alarmVolume;
  bgmVolText.textContent=state.settings.bgmVolume;
  seVolText.textContent=state.settings.seVolume;
  alarmVolText.textContent=state.settings.alarmVolume;
  editCategory.innerHTML=Object.entries(editLabels).map(([k,v])=>`<option value="${k}">${v}</option>`).join("");
  renderGameItemList();
  applyVolumes();
}
function renderGameItemList(){
  const key=editCategory.value || "animalAnimals";
  const list=state.customGames[key] || [];
  gameItemList.innerHTML=list.map((item,i)=>`
    <div class="row" style="justify-content:space-between;background:#0b0d13;border:1px solid var(--line);border-radius:12px;padding:9px">
      <span>${escapeHtml(item)}</span>
      <button class="btn danger" data-delitem="${i}" style="min-height:36px;padding:6px 10px">削除</button>
    </div>
  `).join("") || `<div>まだ項目なし</div>`;
  gameItemList.querySelectorAll("[data-delitem]").forEach(btn=>btn.onclick=()=>{
    state.customGames[key].splice(Number(btn.dataset.delitem),1);
    save(); renderGameItemList(); renderGames();
  });
}
bgmVolume.oninput=()=>{state.settings.bgmVolume=Number(bgmVolume.value);bgmVolText.textContent=state.settings.bgmVolume;save();applyVolumes();}
seVolume.oninput=()=>{state.settings.seVolume=Number(seVolume.value);seVolText.textContent=state.settings.seVolume;save();applyVolumes();}
alarmVolume.oninput=()=>{state.settings.alarmVolume=Number(alarmVolume.value);alarmVolText.textContent=state.settings.alarmVolume;save();applyVolumes();}
testBgm.onclick=()=>startChinBgm();
stopBgm.onclick=()=>stopChinBgm();
testSe.onclick=()=>play("seKoduzumi");
resetChLog.onclick=()=>{if(confirm("チンチロ履歴をリセットする？")){state.chLog=[];save();renderChLog();alert("リセットした！")}}
editCategory.onchange=()=>renderGameItemList();
addGameItem.onclick=()=>{
  const key=editCategory.value;
  const v=newItemText.value.trim();
  if(!v)return;
  state.customGames[key].push(v);
  newItemText.value="";
  save(); renderGameItemList(); renderGames();
}


function renderChinMode(){
  if(!window.chinModeTabs) return;
  document.querySelectorAll("#chinModeTabs button").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.mode===state.chin.mode);
    btn.onclick=()=>{state.chin.mode=btn.dataset.mode;save();renderChinMode();}
  });

  const isNormal=state.chin.mode==="normal";
  const isCustom=state.chin.mode==="custom";
  const isLocal=state.chin.mode==="local";

  normalRuleView.style.display=isNormal?"block":"none";
  customRuleView.style.display=isCustom?"grid":"none";
  localRuleView.style.display=isLocal?"grid":"none";
  customPanel.classList.toggle("active",isCustom);
  localPanel.classList.toggle("active",isLocal);

  ruleTitle.textContent=isNormal?"チンチロ役表":isCustom?"カスタム登録一覧":"ローカル登録一覧";

  renderCustomDiceSelect();
  renderCustomRuleView();
  renderLocalRuleView();
  renderCustomDiceEditor();
  renderLocalComboEditor();
  renderDiceArea(state.chin.mode==="custom" ? state.chin.diceCount : 3);
}
function renderCustomDiceSelect(){
  if(!window.customDiceSelect) return;
  customDiceCount.value=state.chin.diceCount;
  const current=Math.min(Number(customDiceSelect.value || 0), state.chin.diceCount-1);
  customDiceSelect.innerHTML=state.chin.diceNames.slice(0,state.chin.diceCount).map((name,i)=>`<option value="${i}" ${i===current?"selected":""}>${escapeHtml(name)}</option>`).join("");
  customDiceSelect.value=String(current);
  const idx=Number(customDiceSelect.value||0);
  customDiceName.value=state.chin.diceNames[idx] || `サイコロ${idx+1}`;
}
function renderCustomRuleView(){
  if(!window.customRuleView) return;
  customRuleView.innerHTML=`<div class="registered-item"><b>使用サイコロ</b>${state.chin.diceCount}個</div>`+
    state.chin.customDice.slice(0,state.chin.diceCount).map((diceMap,i)=>`
      <div class="registered-item">
        <b>${escapeHtml(state.chin.diceNames[i] || `サイコロ${i+1}`)}</b>
        ${Array.from({length:6},(_,n)=>`${n+1}：${escapeHtml(diceMap[n+1]||"")}`).join("<br>")}
      </div>
    `).join("");
}
function renderLocalRuleView(){
  if(!window.localRuleView) return;
  localRuleView.innerHTML=makeLocalKeys().map(k=>`
    <div class="registered-item">
      <b>${escapeHtml(comboLabelFromKey(k))}</b>
      ${escapeHtml(state.chin.localMap[k] || defaultLocalText(k))}
    </div>
  `).join("");
}
function renderCustomDiceEditor(){
  if(!window.customDiceEditor) return;
  const diceIndex=Number(customDiceSelect.value||0);
  customDiceName.value=state.chin.diceNames[diceIndex] || `サイコロ${diceIndex+1}`;
  const diceMap=state.chin.customDice[diceIndex];
  customDiceEditor.innerHTML=Array.from({length:6},(_,i)=>{
    const n=i+1;
    return `<div class="map-row"><label>${n}の目</label><input data-custom-face="${n}" value="${escapeAttr(diceMap[n]||"")}"></div>`;
  }).join("");
  customDiceEditor.querySelectorAll("[data-custom-face]").forEach(inp=>{
    inp.oninput=()=>{state.chin.customDice[diceIndex][inp.dataset.customFace]=inp.value;save();renderCustomRuleView();}
  });
}
function comboKey(arr){
  for(let n=1;n<=6;n++){
    if(arr.filter(x=>x===n).length===2){
      const point=arr.find(x=>x!==n);
      return `point-${point}`;
    }
  }
  const res=judge(arr);
  return res.type;
}
function comboLabelFromKey(key){
  if(key.startsWith("point-")) return `${key.replace("point-","")}の目`;
  const labels={best:"ピンゾロ",worst:"ヒフミ",zoro:"ゾロ目",win:"シゴロ",none:"目なし"};
  return labels[key] || key;
}
function makeLocalKeys(){
  return ["point-1","point-2","point-3","point-4","point-5","point-6","best","zoro","win","worst","none"];
}
function defaultLocalText(key){
  const defaults={
    "point-1":"一の目",
    "point-2":"二の目",
    "point-3":"三の目",
    "point-4":"四の目",
    "point-5":"五の目",
    "point-6":"六の目",
    best:"ピンゾロ",
    zoro:"ゾロ目",
    win:"シゴロ",
    worst:"ヒフミ",
    none:"目なし"
  };
  return defaults[key] || key;
}
function renderLocalComboEditor(){
  if(!window.localComboSelect) return;
  const keys=makeLocalKeys();
  const current=localComboSelect.value || keys[0];
  localComboSelect.innerHTML=keys.map(k=>`<option value="${k}" ${k===current?"selected":""}>${comboLabelFromKey(k)}</option>`).join("");
  const key=localComboSelect.value || keys[0];
  localComboText.value=state.chin.localMap[key] || defaultLocalText(key);
}
if(window.customDiceCount) customDiceCount.onchange=()=>{
  state.chin.diceCount=Math.max(1,Math.min(6,Number(customDiceCount.value)||3));
  if(Number(customDiceSelect.value||0)>=state.chin.diceCount) customDiceSelect.value=String(state.chin.diceCount-1);
  save(); renderChinMode();
};
if(window.customDiceSelect) customDiceSelect.onchange=()=>{renderCustomDiceSelect();renderCustomDiceEditor();};
if(window.customDiceName) customDiceName.oninput=()=>{
  const idx=Number(customDiceSelect.value||0);
  state.chin.diceNames[idx]=customDiceName.value.trim() || `サイコロ${idx+1}`;
  save(); renderCustomDiceSelect(); renderCustomRuleView();
};
if(window.localComboSelect) localComboSelect.onchange=()=>{
  const key=localComboSelect.value;
  localComboText.value=state.chin.localMap[key] || defaultLocalText(key);
};
if(window.saveLocalCombo) saveLocalCombo.onclick=()=>{
  const key=localComboSelect.value;
  state.chin.localMap[key]=localComboText.value.trim() || defaultLocalText(key);
  save();
  renderLocalRuleView();
  alert("保存した！");
};




let calendarCursor=new Date();
let selectedCalendarDate=ymd(new Date());

function ymd(d){
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  const day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}
function monthStart(d){return new Date(d.getFullYear(),d.getMonth(),1)}
function addMonths(d,n){return new Date(d.getFullYear(),d.getMonth()+n,1)}
function lastDayOfMonth(year,monthIndex){return new Date(year, monthIndex+1, 0).getDate()}
function isLeapYear(year){return (year%4===0 && year%100!==0) || year%400===0}
function birthdayMatchesDate(birthday,date){
  if(!birthday) return false;
  const current=date.slice(5).replace("-","/");
  if(birthday==="02/29"){
    const y=Number(date.slice(0,4));
    return isLeapYear(y) ? current==="02/29" : current==="02/28";
  }
  return current===birthday;
}
function isLeapBirthday(birthday){return birthday==="02/29";}
function effectiveMonthlyDate(year,monthIndex,day){
  const d=Math.max(1,Math.min(31,Number(day)||1));
  const last=lastDayOfMonth(year,monthIndex);
  return ymd(new Date(year,monthIndex,Math.min(d,last)));
}
function monthlyEventsForDate(date){
  const y=Number(date.slice(0,4));
  const m=Number(date.slice(5,7))-1;
  return (state.monthlyEvents||[]).filter(ev=>effectiveMonthlyDate(y,m,ev.day)===date).map(ev=>({
    id:"monthly_"+ev.id+"_"+date,
    date,
    listener:ev.listener||"毎月予定",
    type:ev.type||"毎月予定",
    item:ev.item||"毎月予定",
    monthly:true,
    sourceId:ev.id
  }));
}
function isLeapYear(y){ return (y%4===0 && y%100!==0) || (y%400===0); }
function effectiveYearlyDate(year, month, day){
  const m=Math.max(1,Math.min(12,Number(month)||1));
  let d=Math.max(1,Math.min(31,Number(day)||1));
  if(m===2 && d===29 && !isLeapYear(year)) d=28;
  else d=Math.min(d,lastDayOfMonth(year,m-1));
  return ymd(new Date(year,m-1,d));
}
function yearlyEventsForDate(date){
  const y=Number(date.slice(0,4));
  return (state.yearlyEvents||[]).filter(ev=>effectiveYearlyDate(y,ev.month,ev.day)===date).map(ev=>({
    id:"yearly_"+ev.id+"_"+date,
    date,
    listener:ev.listener||"毎年予定",
    type:ev.type||"毎年予定",
    item:ev.item||"毎年予定",
    yearly:true,
    sourceId:ev.id
  }));
}
function getCalendarHostName(){
  const h=state.hostProfile || {};
  return String(h.name || "").trim();
}
function getCalendarTargets(){
  const hostName=getCalendarHostName();
  const targets=[];
  if(hostName) targets.push({name:hostName,label:"★ " + hostName + "（枠主）",host:true});
  (state.listeners||[]).forEach(l=>{
    if(l && l.name) targets.push({name:l.name,label:l.name,host:false});
  });
  return targets;
}
function eventsForDate(date){
  const evs=[...(state.calendarEvents||[]).filter(ev=>ev.date===date), ...monthlyEventsForDate(date), ...yearlyEventsForDate(date)];
  // registeredDate from listeners also shown, even if old data has no explicit event
  state.listeners.forEach(l=>{
    if(l.registeredDate===date && !evs.some(ev=>ev.listener===l.name && ev.type==="登録日")){
      evs.push({id:"auto_"+l.name+"_"+date,date,listener:l.name,type:"登録日",item:"常連登録"});
    }
  });
  state.listeners.forEach(l=>{
    if(l.birthday){
      if(birthdayMatchesDate(l.birthday,date) && !evs.some(ev=>ev.listener===l.name && ev.type==="誕生日")){
        const note=isLeapBirthday(l.birthday) ? "🎂 誕生日（2/29生まれ：平年は2/28扱いで表示）" : "🎂 誕生日";
        evs.push({id:"birthday_"+l.name+"_"+date,date,listener:l.name,type:"誕生日",item:note});
      }
    }
  });
  const hostName=getCalendarHostName();
  const hostBirthday=state.hostProfile && state.hostProfile.birthday ? state.hostProfile.birthday : "";
  if(hostName && hostBirthday && birthdayMatchesDate(hostBirthday,date) && !evs.some(ev=>ev.listener===hostName && ev.type==="誕生日")){
    const note=isLeapBirthday(hostBirthday) ? "🎂 枠主誕生日（2/29生まれ：平年は2/28扱いで表示）" : "🎂 枠主誕生日";
    evs.push({id:"birthday_host_"+date,date,listener:hostName,type:"誕生日",item:note,host:true});
  }
  return evs;
}
function calendarMemoList(listenerName){
  const evs=(state.calendarEvents||[])
    .filter(ev=>ev.listener===listenerName)
    .sort((a,b)=>String(b.date).localeCompare(String(a.date)))
    .slice(0,10);
  if(!evs.length) return `<ul class="clean"><li>カレンダー記録なし</li></ul>`;
  return `<ul class="clean">${evs.map(ev=>`<li>${escapeHtml(ev.date)}：${escapeHtml(ev.type)} / ${escapeHtml(ev.item)}</li>`).join("")}</ul>`;
}
function applyCalendarPenalty(listenerName, delta){
  const l=state.listeners.find(x=>x.name===listenerName);
  if(!l) return;
  if(typeof l.penalty!=="number") l.penalty=0;
  l.penalty=Math.max(0,l.penalty+delta);
}
function penaltyDetailList(listenerName){
  const evs=(state.calendarEvents||[])
    .filter(ev=>ev.listener===listenerName && ev.type==="ペナルティー")
    .sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  if(!evs.length) return `<div class="penalty-log"><div class="muted">カレンダー登録のペナルティー内容なし</div></div>`;
  return `<div class="penalty-log">${evs.map(ev=>`
    <div>
      <b>${escapeHtml(ev.date)}</b><br>
      ${escapeHtml(ev.item || "ペナルティー")}
    </div>
  `).join("")}</div>`;
}



function getCalendarType(typeName){
  return (state.calendarTypes||[]).find(t=>t.name===typeName) || {name:typeName,color:"#8b5cf6"};
}
function renderCalendarTypeOptions(){
  if(!window.calendarType) return;
  const current=calendarType.value;
  calendarType.innerHTML=(state.calendarTypes||[]).map(t=>`<option value="${escapeAttr(t.name)}" ${t.name===current?"selected":""}>${escapeHtml(t.name)}</option>`).join("");
}
function renderCalendarTypeEditor(){
  if(!window.calendarTypeEditor) return;
  calendarTypeEditor.innerHTML=(state.calendarTypes||[]).map((t,i)=>`
    <span class="type-chip">
      <span class="type-color-dot" style="background:${escapeAttr(t.color)}"></span>
      ${escapeHtml(t.name)}
      <input type="color" value="${escapeAttr(t.color)}" data-type-color="${i}" style="width:34px;height:26px;padding:0;border:0">
      ${["登録日","返礼品獲得日","配信メモ","ペナルティー","約束","その他"].includes(t.name) ? "" : `<button class="btn danger mini-btn" data-type-del="${i}">削除</button>`}
    </span>
  `).join("");
  calendarTypeEditor.querySelectorAll("[data-type-color]").forEach(inp=>inp.oninput=()=>{
    state.calendarTypes[Number(inp.dataset.typeColor)].color=inp.value;
    save();renderCalendar();
  });
  calendarTypeEditor.querySelectorAll("[data-type-del]").forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.typeDel);
    if(!confirm(`${state.calendarTypes[i].name} を削除する？`)) return;
    state.calendarTypes.splice(i,1);
    save();renderCalendar();
  });
}

function renderCalendar(){
  if(!window.calendarMonth) return;
  const y=calendarCursor.getFullYear();
  const m=calendarCursor.getMonth();
  calendarTitle.textContent=`${y}年 ${m+1}月`;
  calendarListener.innerHTML=getCalendarTargets().map(t=>`<option value="${escapeAttr(t.name)}">${escapeHtml(t.label)}</option>`).join("");
  renderCalendarTypeOptions();
  renderCalendarTypeEditor();
  selectedDateTitle.textContent=`${selectedCalendarDate} の記録`;

  const first=new Date(y,m,1);
  const start=new Date(y,m,1-first.getDay());
  const today=ymd(new Date());
  const weeks=["日","月","火","水","木","金","土"];
  let cells=weeks.map((w,i)=>`<div class="cal-week ${i===0?"sun":i===6?"sat":""}">${w}</div>`).join("");

  const jpHolidays={
    "01-01":"元日",
    "02-11":"建国記念の日",
    "02-23":"天皇誕生日",
    "04-29":"昭和の日",
    "05-03":"憲法記念日",
    "05-04":"みどりの日",
    "05-05":"こどもの日",
    "08-11":"山の日",
    "11-03":"文化の日",
    "11-23":"勤労感謝の日"
  };

  for(let i=0;i<42;i++){
    const d=new Date(start);
    d.setDate(start.getDate()+i);
    const date=ymd(d);
    const md=date.slice(5);
    const dow=d.getDay();
    const isHoliday=Boolean(jpHolidays[md]);
    const evs=eventsForDate(date);
    const marks=evs.slice(0,3).map(ev=>{
      const typeInfo=getCalendarType(ev.type);
      const label=ev.type==="誕生日" ? `🎂 ${ev.listener}` : `${ev.listener}：${ev.type}`;
      return `<div class="cal-mark ${ev.type==="誕生日"?"birthday-mark":""}" style="background:${escapeAttr(typeInfo.color)}22;color:${escapeAttr(typeInfo.color)};border:1px solid ${escapeAttr(typeInfo.color)}66">${escapeHtml(label)}</div>`;
    }).join("");
    const more=evs.length>3?`<div class="cal-mark">+${evs.length-3}</div>`:"";
    cells+=`<button class="cal-day 
      ${d.getMonth()!==m?"out":""}
      ${date===today?"today":""}
      ${date===selectedCalendarDate?"selected":""}
      ${(dow===0 || isHoliday)?"sun":dow===6?"sat":""}
      " data-cal-date="${date}">
      <div class="cal-num">${d.getDate()}</div>${marks}${more}
    </button>`;
  }
  calendarMonth.innerHTML=cells;
  calendarMonth.querySelectorAll("[data-cal-date]").forEach(btn=>btn.onclick=()=>{selectedCalendarDate=btn.dataset.calDate;renderCalendar();});
  renderSelectedDateEvents();
}
function renderSelectedDateEvents(){
  if(!window.selectedDateEvents) return;
  selectedDateTitle.textContent=`${selectedCalendarDate} の記録`;
  const evs=eventsForDate(selectedCalendarDate);
  selectedDateEvents.innerHTML=evs.map(ev=>`
    <div class="event-item">
      <b><span class="type-color-dot" style="background:${escapeAttr(getCalendarType(ev.type).color)}"></span> ${escapeHtml(ev.listener)}：${escapeHtml(ev.type)}</b>
      <div>${escapeHtml(ev.item)}</div>
      <div class="muted">${escapeHtml(ev.date)}</div>
      ${String(ev.id||"").startsWith("auto_") || String(ev.id||"").startsWith("birthday_") ? "" : (ev.yearly ? `<button class="btn danger mini-btn" data-del-yearly="${escapeAttr(ev.sourceId)}" style="margin-top:8px">毎年予定を削除</button>` : (ev.monthly ? `<button class="btn danger mini-btn" data-del-monthly="${escapeAttr(ev.sourceId)}" style="margin-top:8px">毎月予定を削除</button>` : `<button class="btn danger mini-btn" data-del-cal="${escapeAttr(ev.id)}" style="margin-top:8px">削除</button>`))}
    </div>
  `).join("") || `<div class="event-item muted">この日の記録なし</div>`;
  selectedDateEvents.querySelectorAll("[data-del-cal]").forEach(btn=>btn.onclick=()=>{
    if(!confirm("このカレンダー記録を削除する？")) return;
    const target=state.calendarEvents.find(ev=>ev.id===btn.dataset.delCal);
    if(target && target.type==="ペナルティー") applyCalendarPenalty(target.listener,-1);
    state.calendarEvents=state.calendarEvents.filter(ev=>ev.id!==btn.dataset.delCal);
    save();renderCalendar();renderMemo();renderBonus();
  });
  selectedDateEvents.querySelectorAll("[data-del-monthly]").forEach(btn=>btn.onclick=()=>{
    if(!confirm("この毎月予定を削除する？")) return;
    state.monthlyEvents=(state.monthlyEvents||[]).filter(ev=>ev.id!==btn.dataset.delMonthly);
    save();renderCalendar();renderHome();
  });
  selectedDateEvents.querySelectorAll("[data-del-yearly]").forEach(btn=>btn.onclick=()=>{
    if(!confirm("この毎年予定を削除する？")) return;
    state.yearlyEvents=(state.yearlyEvents||[]).filter(ev=>ev.id!==btn.dataset.delYearly);
    save();renderCalendar();renderHome();
  });
}
if(window.prevMonth) prevMonth.onclick=()=>{calendarCursor=addMonths(calendarCursor,-1);renderCalendar();}
if(window.nextMonth) nextMonth.onclick=()=>{calendarCursor=addMonths(calendarCursor,1);renderCalendar();}
if(window.todayCalendar) todayCalendar.onclick=()=>{calendarCursor=new Date();selectedCalendarDate=ymd(new Date());renderCalendar();}

if(window.addCalendarType) addCalendarType.onclick=()=>{
  const name=newCalendarTypeName.value.trim();
  const color=newCalendarTypeColor.value || "#38bdf8";
  if(!name) return alert("種類名を入れてｗ");
  if((state.calendarTypes||[]).some(t=>t.name===name)) return alert("その種類はもうあるｗ");
  state.calendarTypes.push({name,color});
  newCalendarTypeName.value="";
  save();renderCalendar();
};

if(window.addCalendarEvent) addCalendarEvent.onclick=()=>{
  const listener=calendarListener.value;
  const type=calendarType.value;
  const item=calendarItem.value.trim() || type;
  if(!listener)return;
  if(window.calendarYearlyEnabled && calendarYearlyEnabled.checked){
    const month=Math.max(1,Math.min(12,Number(calendarYearlyMonth.value)||1));
    const day=Math.max(1,Math.min(31,Number(calendarYearlyDay.value)||1));
    state.yearlyEvents=state.yearlyEvents || [];
    state.yearlyEvents.push({id:uid("year"),month,day,listener,type,item});
    calendarYearlyEnabled.checked=false;
  }else if(window.calendarMonthlyEnabled && calendarMonthlyEnabled.checked){
    const day=Math.max(1,Math.min(31,Number(calendarMonthlyDay.value)||1));
    state.monthlyEvents=state.monthlyEvents || [];
    state.monthlyEvents.push({id:uid("mon"),day,listener,type,item});
    calendarMonthlyEnabled.checked=false;
  }else{
    state.calendarEvents.push({id:uid("cal"),date:selectedCalendarDate,listener,type,item});
    if(type==="登録日"){
      const l=state.listeners.find(x=>x.name===listener);
      if(l) l.registeredDate=selectedCalendarDate;
    }
    if(type==="ペナルティー"){
      applyCalendarPenalty(listener,1);
    }
  }
  calendarItem.value="";
  save();renderCalendar();renderMemo();renderBonus();renderHome();
}



function encodeUrlData(obj){
  const json=JSON.stringify(obj);
  const bytes=new TextEncoder().encode(json);
  let bin="";
  bytes.forEach(b=>bin+=String.fromCharCode(b));
  return btoa(bin);
}
function getFirebaseConfig(){
  const f=state.settings?.firebase || {};
  return {
    apiKey:f.apiKey || "",
    authDomain:f.authDomain || "",
    projectId:f.projectId || "",
    storageBucket:f.storageBucket || "",
    messagingSenderId:f.messagingSenderId || "",
    appId:f.appId || ""
  };
}
function firebaseReady(){
  const f=state.settings?.firebase || {};
  return !!(f.enabled && f.apiKey && f.projectId && f.appId);
}
function getPollVoteUrl(poll){
  const base=location.href.split("#")[0].split("?")[0].replace(/index\.html$/,"");
  const url=new URL("vote.html", base);
  const payload={
    poll:poll.id,
    title:poll.title || "",
    options:(poll.options||[]).map(o=>o.text || String(o))
  };
  url.searchParams.set("data", encodeUrlData(payload));
  // 古いURL形式との互換用
  url.searchParams.set("poll", poll.id);
  url.searchParams.set("title", poll.title || "");
  url.searchParams.set("options", payload.options.join("|"));
  if(firebaseReady()){
    url.searchParams.set("fb", encodeUrlData(getFirebaseConfig()));
  }
  return url.toString();
}
function getQrUrl(text){
  return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(text)}`;
}


let ssFirebaseApp=null;
let ssFirestore=null;
const pollUnsubs={};

function initSSFirebase(){
  if(!firebaseReady()) return null;
  if(ssFirestore) return ssFirestore;
  try{
    const cfg=getFirebaseConfig();
    ssFirebaseApp=firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
    ssFirestore=firebase.firestore();
    return ssFirestore;
  }catch(e){
    console.error(e);
    alert("Firebase初期化に失敗。設定を確認してｗ");
    return null;
  }
}
async function syncPollToFirebase(pi){
  const poll=state.polls[pi];
  if(!poll) return;
  const db=initSSFirebase();
  if(!db) return alert("Firebase設定が未完了。設定画面で有効化してねｗ");

  const docRef=db.collection("streamstaff_polls").doc(poll.id);
  const payload={
    id:poll.id,
    title:poll.title,
    options:poll.options.map(o=>({text:o.text,votes:Number(o.votes||0)})),
    updatedAt:firebase.firestore.FieldValue.serverTimestamp()
  };

  await docRef.set(payload,{merge:true});

  if(pollUnsubs[poll.id]) pollUnsubs[poll.id]();

  pollUnsubs[poll.id]=docRef.onSnapshot(snap=>{
    if(!snap.exists) return;
    const data=snap.data();
    const target=state.polls.find(p=>p.id===poll.id);
    if(!target || !data.options) return;
    target.options=target.options.map((o,i)=>({
      text:o.text,
      votes:Number(data.options[i]?.votes || 0)
    }));
    target.firebaseLive=true;
    save();
    renderPolls();
  });

  poll.firebaseLive=true;
  save();
  renderPolls();
  alert("Firebaseリアルタイム同期を開始した！");
}

function renderPolls(){
  if(window.pollPanelBody){
    pollPanelBody.classList.toggle("open", !!state.ui?.pollOpen);
    if(window.togglePollPanel) togglePollPanel.textContent=state.ui?.pollOpen ? "閉じる" : "開く";
  }
  if(window.togglePollPanel) togglePollPanel.onclick=()=>{
    state.ui=state.ui||{};
    state.ui.pollOpen=!state.ui.pollOpen;
    save();renderPolls();
  };
  if(!window.pollList) return;
  pollList.innerHTML=(state.polls||[]).map((poll,pi)=>{
    const total=poll.options.reduce((s,o)=>s+(o.votes||0),0);
    const options=poll.options.map((o,oi)=>{
      const pct=total ? Math.round((o.votes||0)/total*100) : 0;
      return `<div class="poll-option">
        <div class="row" style="justify-content:space-between">
          <b>${escapeHtml(o.text)}</b>
          <span class="poll-votes">${o.votes||0}票 / ${pct}%</span>
        </div>
        <div class="poll-bar"><div class="poll-fill" style="width:${pct}%"></div></div>
        <div class="row" style="margin-top:8px">
          <button class="btn primary mini-btn" data-poll-plus="${pi}" data-option="${oi}">＋1</button>
          <button class="btn mini-btn" data-poll-minus="${pi}" data-option="${oi}">−1</button>
        </div>
      </div>`;
    }).join("");
    return `<div class="poll-box">
      <div class="row" style="justify-content:space-between">
        <div>
          <h3 style="margin:0">${escapeHtml(poll.title)}</h3>
          <div class="muted">合計 ${total}票</div>
          <div class="firebase-sync-badge ${poll.firebaseLive ? "" : "off"}">${poll.firebaseLive ? "Firebase LIVE" : "Local"}</div>
        </div>
        <div class="row">
          <button class="btn mini-btn" data-poll-firebase="${pi}">Firebase同期</button>
          <button class="btn danger mini-btn" data-poll-delete="${pi}">削除</button>
        </div>
      </div>
      <div class="row" style="margin-top:10px">
        <button class="btn mini-btn" data-poll-share="${pi}">URL / QR表示</button>
      </div>
      <div class="poll-share" data-poll-share-box="${pi}">
        <b>リスナー投票URL</b>
        <div class="poll-url">${escapeHtml(getPollVoteUrl(poll))}</div>
        <div class="row" style="margin-top:8px">
          <button class="btn primary mini-btn" data-copy-poll-url="${pi}">URLコピー</button>
          <a class="btn mini-btn" href="${escapeHtml(getPollVoteUrl(poll))}" target="_blank">投票ページを開く</a>
        </div>
        <img class="poll-qr" src="${escapeHtml(getQrUrl(getPollVoteUrl(poll)))}" alt="投票QR">
        <div class="muted" style="margin-top:8px">※Firebase設定済みなら、このURLからリアルタイム投票できます。QR生成にはネット接続が必要。</div>
      </div>
      ${options}
      <div class="row" style="margin-top:10px">
        <button class="btn mini-btn" data-poll-reset="${pi}">投票リセット</button>
      </div>
    </div>`;
  }).join("") || `<div class="poll-box muted">投票なし</div>`;

  pollList.querySelectorAll("[data-poll-plus]").forEach(btn=>btn.onclick=()=>{
    const p=state.polls[Number(btn.dataset.pollPlus)];
    const o=p.options[Number(btn.dataset.option)];
    o.votes=(o.votes||0)+1;
    save();renderPolls();
  });
  pollList.querySelectorAll("[data-poll-minus]").forEach(btn=>btn.onclick=()=>{
    const p=state.polls[Number(btn.dataset.pollMinus)];
    const o=p.options[Number(btn.dataset.option)];
    o.votes=Math.max(0,(o.votes||0)-1);
    save();renderPolls();
  });
  pollList.querySelectorAll("[data-poll-reset]").forEach(btn=>btn.onclick=()=>{
    const p=state.polls[Number(btn.dataset.pollReset)];
    if(!confirm(`${p.title} の票をリセットする？`)) return;
    p.options.forEach(o=>o.votes=0);
    save();renderPolls();
  });
  pollList.querySelectorAll("[data-poll-firebase]").forEach(btn=>btn.onclick=()=>syncPollToFirebase(Number(btn.dataset.pollFirebase)));
  pollList.querySelectorAll("[data-poll-delete]").forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.pollDelete);
    if(!confirm(`${state.polls[i].title} を削除する？`)) return;
    state.polls.splice(i,1);
    save();renderPolls();
  });
  pollList.querySelectorAll("[data-poll-share]").forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.pollShare);
    if(firebaseReady() && !state.polls[i].firebaseLive){
      syncPollToFirebase(i);
    }
    const box=pollList.querySelector(`[data-poll-share-box="${i}"]`);
    if(box) box.classList.toggle("open");
  });
  pollList.querySelectorAll("[data-copy-poll-url]").forEach(btn=>btn.onclick=async()=>{
    const i=Number(btn.dataset.copyPollUrl);
    const url=getPollVoteUrl(state.polls[i]);
    try{
      await navigator.clipboard.writeText(url);
      alert("投票URLをコピーした！");
    }catch(e){
      prompt("コピーできなかったから手動でコピーしてｗ", url);
    }
  });
}
if(window.addPoll) addPoll.onclick=()=>{
  const title=newPollTitle.value.trim() || "新しい投票";
  const options=newPollOptions.value.split(",").map(x=>x.trim()).filter(Boolean);
  if(options.length<2) return alert("選択肢は2つ以上ほしいｗ");
  state.polls.push({
    id:uid("poll"),
    title,
    options:options.map(text=>({text,votes:0})),
    memo:""
  });
  newPollTitle.value="";
  newPollOptions.value="";
  save();renderPolls();
}

const timerSounds=[
  {id:"hato1",label:"鳩時計1"},
  {id:"hato2",label:"鳩時計2"},
  {id:"alarm_clock",label:"目覚まし時計"},
  {id:"wall_clock",label:"柱時計の鐘"},
  {id:"sponsor",label:"スポンサー提供"},
  {id:"closed",label:"営業終了アナウンス"}
];
window.timerSounds = timerSounds;
let timerTick=null;
function uid(prefix){return prefix+"_"+Date.now()+"_"+Math.random().toString(36).slice(2,7)}
function fmtTime(sec){
  sec=Math.max(0,Number(sec)||0);
  const m=Math.floor(sec/60);
  const s=sec%60;
  return `${m}:${String(s).padStart(2,"0")}`;
}
function playAlarm(sound){
  const a=document.getElementById("alarm_"+sound);
  if(!a) return;
  try{
    a.volume=(state.settings?.alarmVolume ?? 80)/100;
    a.currentTime=0;
    a.play().catch(()=>{});
  }catch(e){}
}

function formatCountdown(ms){
  if(ms<=0) return "00日 00:00:00";
  const total=Math.floor(ms/1000);
  const days=Math.floor(total/86400);
  const hours=Math.floor((total%86400)/3600);
  const mins=Math.floor((total%3600)/60);
  const secs=total%60;
  return `${String(days).padStart(2,"0")}日 ${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;
}
function renderCountdowns(){
  setupToolCollapse();
  if(!window.countdownList) return;

  countdownList.innerHTML=(state.countdowns||[]).map((c,i)=>{
    const diff=new Date(c.target).getTime()-Date.now();
    const done=diff<=0;
    if(!done && c.finishedPlayed) c.finishedPlayed=false;

    if(done && !c.finishedPlayed){
      c.finishedPlayed=true;
      try{
        const a=new Audio(c.sound || "assets/countdown/学校のチャイム.mp3");
        a.volume=(state.settings?.masterVolume ?? 70)/100;
        a.play();
      }catch(e){}
      save();
    }
    return `<div class="countdown-box ${done ? "countdown-finished" : ""}">
      <div class="row" style="justify-content:space-between">
        <div>
          <h3 style="margin:0">${escapeHtml(c.title)}</h3>
          <div class="countdown-label">${escapeHtml(c.target.replace("T"," "))}</div>
          <div class="countdown-label">通知音：${escapeHtml((c.sound||"").split("/").pop().replace(".mp3",""))}</div>
        </div>
        <button class="btn danger mini-btn" data-del-countdown="${i}">削除</button>
      </div>

      <div class="countdown-time">
        ${done ? "🎉 到達！" : formatCountdown(diff)}
      </div>
    </div>`;
  }).join("") || `<div class="countdown-box muted">カウントダウンなし</div>`;

  countdownList.querySelectorAll("[data-del-countdown]").forEach(btn=>btn.onclick=()=>{
    const i=Number(btn.dataset.delCountdown);
    if(!confirm(`${state.countdowns[i].title} を削除する？`)) return;
    state.countdowns.splice(i,1);
    save();
    renderCountdowns();
  });
}

if(window.addCountdown) addCountdown.onclick=()=>{
  const title=newCountdownTitle.value.trim() || "カウントダウン";
  const target=newCountdownTarget.value;
  if(!target) return alert("日時を入れてｗ");

  state.countdowns.push({
    id:uid("countdown"),
    title,
    target,
    sound:newCountdownSound.value,
    finishedPlayed:false
  });

  newCountdownTitle.value="";
  newCountdownTarget.value="";
  save();
  renderCountdowns();
};

setInterval(()=>{
  renderCountdowns();
},1000);


function setupToolCollapse(){
  const pairs=[
    ["rouletteOpen","toggleRoulettePanel","roulettePanelBody"],
    ["countersOpen","toggleCountersPanel","countersPanelBody"],
    ["timersOpen","toggleTimersPanel","timersPanelBody"],
    ["countdownsOpen","toggleCountdownsPanel","countdownsPanelBody"]
  ];
  pairs.forEach(([key,btnId,bodyId])=>{
    const btn=document.getElementById(btnId);
    const body=document.getElementById(bodyId);
    if(!btn || !body) return;
    body.classList.toggle("open", !!state.ui[key]);
    btn.textContent=state.ui[key] ? "閉じる" : "開く";
    btn.onclick=()=>{
      state.ui[key]=!state.ui[key];
      save();
      setupToolCollapse();
    };
  });
}


let rouletteRotation=0;
let rouletteSpinning=false;

function renderRoulette(){
  const itemsBox=document.getElementById("rouletteItems");
  const histBox=document.getElementById("rouletteHistory");
  const card=document.getElementById("rouletteGameCard");
  const toggle=document.getElementById("toggleRoulettePanel");

  state.roulette = state.roulette || {items:[],history:[]};
  state.roulette.items = state.roulette.items || [];
  state.roulette.history = state.roulette.history || [];
  state.ui = state.ui || {};
  if(typeof state.ui.rouletteOpen!=="boolean") state.ui.rouletteOpen=true;

  if(card){
    card.classList.toggle("open", state.ui.rouletteOpen);
  }
  if(toggle){
    toggle.textContent=state.ui.rouletteOpen ? "閉じる" : "開く";
  }

  if(itemsBox){
    const items=state.roulette.items;
    itemsBox.innerHTML=items.map((item,i)=>`
      <div class="roulette-item">
        <div class="row" style="justify-content:space-between">
          <b>${escapeHtml(item)}</b>
          <button class="btn danger mini-btn" data-del-roulette="${i}" type="button">削除</button>
        </div>
      </div>
    `).join("") || `<div class="roulette-item muted">項目なし</div>`;
  }

  if(histBox){
    histBox.innerHTML=(state.roulette.history||[]).slice(0,10).map(h=>`
      <div>${escapeHtml(h.time)}：<b>${escapeHtml(h.result)}</b></div>
    `).join("") || `<div>履歴なし</div>`;
  }
}




const tilePresets={
  zodiac:["牡羊座","牡牛座","双子座","蟹座","獅子座","乙女座","天秤座","蠍座","射手座","山羊座","水瓶座","魚座"],
  prefectures:["北海道","青森","岩手","宮城","秋田","山形","福島","茨城","栃木","群馬","埼玉","千葉","東京","神奈川","新潟","富山","石川","福井","山梨","長野","岐阜","静岡","愛知","三重","滋賀","京都","大阪","兵庫","奈良","和歌山","鳥取","島根","岡山","広島","山口","徳島","香川","愛媛","高知","福岡","佐賀","長崎","熊本","大分","宮崎","鹿児島","沖縄"],
  blood:["A型","B型","O型","AB型"],
  blank25:Array.from({length:25},(_,i)=>`マス${i+1}`),
  bingoAchieve:["初見さんが来る","コメント10件突破","ギフトが飛ぶ","同接目標達成","常連が来る","質問コメントが来る","笑いが起きる","話題が広がる","企画が成功する","リスナー同士が会話","スクショタイム成功","高評価が増える","フォローが増える","いいツッコミが来る","名前を呼べる","昔話が出る","おすすめを聞かれる","今日の名言が出る","水分補給できる","予定時間まで続く","新しい話題が出る","誰かを褒める","サムネを褒められる","配信設定が安定","締めの挨拶成功"],
  bingoMiss:["噛む","漢字を読み間違える","言い間違える","話が脱線する","水を飲み忘れる","同じ話をする","コメントを見逃す","操作を間違える","名前を呼び間違える","マイク確認を忘れる","画面を間違える","ツッコミ遅れる","急に黙る","謎の間が生まれる","説明が長くなる","笑って進まない","ルールを忘れる","ボタンを押し間違える","時間を見失う","言葉が出てこない","読み上げ失敗","急に素になる","予定と違うことする","自分で自分にツッコむ","締めを噛む"],
  bingoChaos:["急に歌う","謎の例え話が出る","コメント欄が困惑","ルーレット事故る","話題が迷子になる","急に名言っぽくなる","飯テロが始まる","変なテンションになる","急に反省会","誰かが暴走する","謎ルール追加","カオスな流れになる","笑いすぎて止まる","急に小声になる","想定外の展開","無駄に熱弁する","ボケが渋滞する","全員で乗っかる","急に茶番開始","謎の勝負が始まる","コメントで大喜利開始","変なあだ名が生まれる","ツッコミ不在","枠主が迷言を残す","最後だけ綺麗に終わる"],
  bingoTalk:["好きな食べ物の話","地元トーク","最近買った物","昔の流行り","仕事の話","ファッションの話","音楽の話","ゲームの話","アニメの話","コンビニの話","ラーメンの話","恋バナ未満の話","失敗談","子どもの頃の話","休日の過ごし方","旅行したい場所","おすすめを聞く","リスナーの地域話","季節の話","健康の話","家電の話","ペットの話","名前の由来","配信あるある","今日の締めトーク"]
};
const bingoCategoryMap={achieve:'bingoAchieve',miss:'bingoMiss',chaos:'bingoChaos',talk:'bingoTalk'};
function shuffleArray(arr){ return [...arr].sort(()=>Math.random()-.5); }
function createBingoItems(category){
  const key=bingoCategoryMap[category]||'bingoAchieve';
  return shuffleArray(tilePresets[key]).slice(0,25);
}
function bingoLines(items){
  const lines=[];
  for(let r=0;r<5;r++) lines.push([0,1,2,3,4].map(c=>r*5+c));
  for(let c=0;c<5;c++) lines.push([0,1,2,3,4].map(r=>r*5+c));
  lines.push([0,6,12,18,24],[4,8,12,16,20]);
  const doneAt=i=>!!(items[i]&&items[i].done);
  let bingo=0, reach=0;
  const bingoSet=new Set(), reachSet=new Set();
  lines.forEach(line=>{
    const n=line.filter(doneAt).length;
    if(n===5){ bingo++; line.forEach(i=>bingoSet.add(i)); }
    else if(n===4){ reach++; line.filter(i=>!doneAt(i)).forEach(i=>reachSet.add(i)); }
  });
  return {bingo,reach,bingoSet,reachSet};
}
function normalizeBingoItems(t){
  t.items=t.items||[];
  if(t.mode==='bingo'){
    while(t.items.length<25) t.items.push({id:uid('tile'),name:`マス${t.items.length+1}`,done:false});
    if(t.items.length>25) t.items=t.items.slice(0,25);
    if(t.free && t.items[12]){ t.items[12].name=t.items[12].name||'FREE'; t.items[12].done=true; }
  }
}
function tileState(){
  state.tools = state.tools || {};
  state.tools.tiles = state.tools.tiles || structuredClone(defaultState.tools.tiles);
  state.tools.tiles.items = state.tools.tiles.items || [];
  return state.tools.tiles;
}
function setTileItems(title, names, mode){
  const t=tileState();
  t.title=title || t.title || "耐久タイル";
  if(mode) t.mode=mode;
  t.items=(names||[]).map((name,i)=>({id:uid('tile'),name:String(name||`タイル${i+1}`).trim()||`タイル${i+1}`,done:false}));
  normalizeBingoItems(t);
  save();
  renderTileTool();
}
function renderTileTool(){
  const t=tileState();
  normalizeBingoItems(t);
  const isBingo=t.mode==='bingo';
  const items=t.items||[];
  const done=items.filter(x=>x.done).length;
  const total=items.length;
  const pct=total ? Math.round(done/total*100) : 0;
  const b=isBingo ? bingoLines(items) : {bingo:0,reach:0,bingoSet:new Set(),reachSet:new Set()};
  if(window.tileBoardTitle) tileBoardTitle.value=t.title||"";
  if(window.tileBoardHeading) tileBoardHeading.textContent=t.title||(isBingo?'今日の枠ビンゴ':'耐久タイル');
  if(window.tileBoardSub) tileBoardSub.textContent=isBingo?`BINGO ${b.bingo} / REACH ${b.reach}`:`${done} / ${total} 達成`;
  if(window.tileProgressText) tileProgressText.textContent=isBingo?`${done} / ${total}（${pct}%）  BINGO ${b.bingo} / REACH ${b.reach}`:`${done} / ${total}（${pct}%）`;
  if(window.tileProgressBar) tileProgressBar.style.width=pct+"%";
  if(window.tileBingoStats){ tileBingoStats.style.display=isBingo?'block':'none'; tileBingoStats.textContent=`BINGO ${b.bingo} / REACH ${b.reach}`; }
  if(window.tileBingoFree){ tileBingoFree.checked=!!t.free; tileBingoFree.disabled=!isBingo; }
  if(window.tileModeNormalBtn){ tileModeNormalBtn.className='btn '+(!isBingo?'primary':''); }
  if(window.tileModeBingoBtn){ tileModeBingoBtn.className='btn '+(isBingo?'primary':''); }
  if(window.tileBingoQuickRow) tileBingoQuickRow.style.display=isBingo?'flex':'none';
  if(window.tileGrid){
    tileGrid.style.gridTemplateColumns=isBingo?'repeat(5, minmax(0, 1fr))':'repeat(auto-fill,minmax(92px,1fr))';
    tileGrid.innerHTML=items.map((it,i)=>{
      const isFree=isBingo && t.free && i===12;
      const lineDone=b.bingoSet.has(i);
      const lineReach=b.reachSet.has(i);
      const border=lineDone?'rgba(250,204,21,.95)':(it.done?'rgba(34,197,94,.95)':(lineReach?'rgba(251,191,36,.8)':'rgba(255,255,255,.16)'));
      const bg=lineDone?'linear-gradient(135deg,rgba(250,204,21,.45),rgba(245,158,11,.22))':(it.done?'linear-gradient(135deg,rgba(34,197,94,.34),rgba(132,204,22,.20))':'rgba(15,23,42,.78)');
      const mark=isFree?'FREE':(it.done?'✅':'');
      return `<button class="tile-cell ${it.done?'done':''} ${lineDone?'bingo-line':''}" data-tile-toggle="${i}" type="button" style="aspect-ratio:1/1;width:100%;border-radius:14px;border:2px solid ${border};background:${bg};box-shadow:${lineDone?'0 0 26px rgba(250,204,21,.30), inset 0 0 0 1px rgba(255,255,255,.12)':(it.done?'0 0 22px rgba(34,197,94,.22), inset 0 0 0 1px rgba(255,255,255,.10)':'inset 0 0 0 1px rgba(255,255,255,.04)')};display:flex;align-items:center;justify-content:center;text-align:center;padding:8px;cursor:pointer;font-weight:950;word-break:break-word;color:#fff;line-height:1.16;overflow:hidden;position:relative;font-size:${isBingo?'clamp(11px,1.6vw,16px)':'16px'}">
        <span>${mark?`<b style="display:block;color:${lineDone?'#fef3c7':'#bbf7d0'};font-size:13px;margin-bottom:3px">${mark}</b>`:''}${escapeHtml(it.name||'')}</span>
      </button>`;
    }).join('') || '<p class="muted">タイルがありません。プリセットか自由入力で作成してね。</p>';
    tileGrid.querySelectorAll('[data-tile-toggle]').forEach(el=>el.onclick=()=>{ const i=Number(el.dataset.tileToggle); if(isBingo && t.free && i===12) return; items[i].done=!items[i].done; save(); renderTileTool(); });
  }
  if(window.tileManageList){
    tileManageList.innerHTML=items.map((it,i)=>`
      <div style="display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center;background:rgba(15,23,42,.58);border:1px solid rgba(255,255,255,.10);border-radius:14px;padding:8px">
        <input data-tile-name="${i}" value="${escapeHtml(it.name||'')}" aria-label="タイル名" ${isBingo&&t.free&&i===12?'disabled':''}>
        <button class="btn mini-btn" data-tile-edit="${i}" type="button" ${isBingo&&t.free&&i===12?'disabled':''}>反映</button>
        <button class="btn mini-btn danger" data-tile-del="${i}" type="button" ${isBingo&&t.free&&i===12?'disabled':''}>削除</button>
      </div>`).join('') || '<p class="muted">管理するタイルがありません。</p>';
    tileManageList.querySelectorAll('[data-tile-name]').forEach(inp=>{
      inp.onchange=()=>{ const i=Number(inp.dataset.tileName); if(items[i]){items[i].name=inp.value.trim()||items[i].name; save(); renderTileTool();} };
    });
    tileManageList.querySelectorAll('[data-tile-edit]').forEach(btn=>btn.onclick=()=>{ const i=Number(btn.dataset.tileEdit); const inp=tileManageList.querySelector(`[data-tile-name="${i}"]`); if(items[i] && inp){items[i].name=inp.value.trim()||items[i].name; save(); renderTileTool();} });
    tileManageList.querySelectorAll('[data-tile-del]').forEach(btn=>btn.onclick=()=>{ const i=Number(btn.dataset.tileDel); if(items[i] && confirm(`${items[i].name} を削除する？`)){items.splice(i,1); normalizeBingoItems(t); save(); renderTileTool();} });
  }
}
if(window.tileBoardTitle) tileBoardTitle.onchange=()=>{tileState().title=tileBoardTitle.value.trim()||'耐久タイル'; save(); renderTileTool();};
if(window.tileModeNormalBtn) tileModeNormalBtn.onclick=()=>{const t=tileState(); t.mode='normal'; save(); renderTileTool();};
if(window.tileModeBingoBtn) tileModeBingoBtn.onclick=()=>{const t=tileState(); t.mode='bingo'; if(!t.title||t.title==='耐久タイル') t.title='今日の枠ビンゴ'; normalizeBingoItems(t); save(); renderTileTool();};
if(window.tileBingoFree) tileBingoFree.onchange=()=>{const t=tileState(); t.free=tileBingoFree.checked; if(t.free && t.items[12]){t.items[12].name='FREE';t.items[12].done=true;} save(); renderTileTool();};
if(window.tileApplyPresetBtn) tileApplyPresetBtn.onclick=()=>{ const key=tilePresetSelect.value||'zodiac'; const titleMap={zodiac:'12星座コンプ',prefectures:'47都道府県制覇',blood:'血液型コンプ',blank25:'空白25マス',bingoAchieve:'達成系ビンゴ',bingoMiss:'ミス系ビンゴ',bingoChaos:'カオス系ビンゴ',bingoTalk:'雑談系ビンゴ'}; const mode=key.startsWith('bingo')?'bingo':'normal'; if(confirm('現在のタイルを上書きしてプリセットを作成する？')) setTileItems(titleMap[key]||'耐久タイル', tilePresets[key]||tilePresets.zodiac, mode); };
if(window.tileApplyCustomBtn) tileApplyCustomBtn.onclick=()=>{ const names=(tileCustomText.value||'').split(/\n+/).map(x=>x.trim()).filter(Boolean); if(!names.length){alert('1行につき1タイルで入力してね'); return;} if(confirm('現在のタイルを上書きして自由タイルを作成する？')) setTileItems(tileBoardTitle.value.trim()||(tileState().mode==='bingo'?'自由ビンゴ':'自由耐久タイル'), names, tileState().mode); };
if(window.tileAddOneBtn) tileAddOneBtn.onclick=()=>{ const t=tileState(); if(t.mode==='bingo' && (t.items||[]).length>=25){alert('ビンゴモードは25マス固定だよ'); return;} const name=prompt('追加するタイル名', `タイル${(t.items||[]).length+1}`); if(name!==null && name.trim()){t.items.push({id:uid('tile'),name:name.trim(),done:false}); save(); renderTileTool();} };
if(window.tileResetBtn) tileResetBtn.onclick=()=>{ const t=tileState(); if(confirm('埋め状態だけリセットする？')){(t.items||[]).forEach((x,i)=>x.done=!!(t.mode==='bingo'&&t.free&&i===12)); save(); renderTileTool();} };
document.querySelectorAll('[data-bingo-generate]').forEach(btn=>btn.onclick=()=>{ const cat=btn.dataset.bingoGenerate; const titles={achieve:'達成系ビンゴ',miss:'ミス系ビンゴ',chaos:'カオス系ビンゴ',talk:'雑談系ビンゴ'}; if(confirm(`${titles[cat]||'ビンゴ'}をランダム作成する？`)) setTileItems(titles[cat]||'今日の枠ビンゴ', createBingoItems(cat), 'bingo'); });

function kujiState(){
  state.tools = state.tools || {};
  state.tools.kuji = state.tools.kuji || structuredClone(defaultState.tools.kuji);
  state.tools.kuji.prizes = state.tools.kuji.prizes || [];
  state.tools.kuji.history = state.tools.kuji.history || [];
  return state.tools.kuji;
}
function kujiRemainingPrize(p){ return Math.max(0,(Number(p.count)||0)-(Number(p.drawn)||0)); }
function kujiTotalRemaining(){ return kujiState().prizes.reduce((sum,p)=>sum+kujiRemainingPrize(p),0); }
function renderKujiTool(){
  const k=kujiState();
  const total=kujiTotalRemaining();
  if(window.kujiTotalRemain) kujiTotalRemain.textContent = total + "本";
  if(window.kujiLastOneStatus) kujiLastOneStatus.textContent = (k.lastOne||"設定なし") + (total===1 && k.lastOne ? " / 次で発動圏内" : "");
  if(window.kujiTicketText && !kujiTicketText.dataset.locked){
    kujiTicketText.textContent = total>0 ? "ぺりぺり待機中" : "くじ終了！";
    if(window.kujiTicket){
      kujiTicket.style.background='repeating-linear-gradient(135deg,#fff7ed 0,#fff7ed 14px,#fed7aa 14px,#fed7aa 28px)';
      kujiTicket.style.boxShadow='inset 0 0 0 4px rgba(120,53,15,.15),0 14px 34px rgba(0,0,0,.3)';
      kujiTicket.style.transform='scale(1) rotate(0deg)';
    }
  }
  if(window.kujiPrizeList){
    kujiPrizeList.innerHTML = k.prizes.map((p,i)=>{
      const remain=kujiRemainingPrize(p);
      const pct=(Number(p.count)||0)>0 ? Math.round((remain/(Number(p.count)||1))*100) : 0;
      return `<div class="tool-item" style="margin-bottom:8px;border-color:${p.color||'#f59e0b'};background:rgba(15,23,42,.55)">
        <div class="row" style="justify-content:space-between;align-items:center">
          <div style="min-width:180px">
            <input value="${escapeHtml(p.name||'賞')}" data-kuji-name="${i}" style="font-weight:900">
            <div class="muted">残り ${remain} / ${p.count||0}本</div>
          </div>
          <input type="number" min="0" value="${p.count||0}" data-kuji-count="${i}" style="max-width:90px">
          <input type="color" value="${p.color||'#f59e0b'}" data-kuji-color="${i}" style="max-width:70px">
          <button class="btn mini-btn" data-kuji-plus="${i}" type="button">+1戻す</button>
          <button class="btn mini-btn danger" data-kuji-del="${i}" type="button">削除</button>
        </div>
        <div style="height:8px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;margin-top:8px"><div style="height:100%;width:${pct}%;background:${p.color||'#f59e0b'}"></div></div>
      </div>`;
    }).join('') || '<p class="muted">賞がまだありません。まず賞を追加してね。</p>';
    kujiPrizeList.querySelectorAll('[data-kuji-name]').forEach(inp=>inp.onchange=()=>{k.prizes[Number(inp.dataset.kujiName)].name=inp.value.trim()||'賞';save();renderKujiTool();});
    kujiPrizeList.querySelectorAll('[data-kuji-count]').forEach(inp=>inp.onchange=()=>{const p=k.prizes[Number(inp.dataset.kujiCount)];p.count=Math.max(0,Number(inp.value)||0);p.drawn=Math.min(p.drawn||0,p.count);save();renderKujiTool();});
    kujiPrizeList.querySelectorAll('[data-kuji-color]').forEach(inp=>inp.onchange=()=>{k.prizes[Number(inp.dataset.kujiColor)].color=inp.value;save();renderKujiTool();});
    kujiPrizeList.querySelectorAll('[data-kuji-plus]').forEach(btn=>btn.onclick=()=>{const p=k.prizes[Number(btn.dataset.kujiPlus)];p.drawn=Math.max(0,(p.drawn||0)-1);save();renderKujiTool();});
    kujiPrizeList.querySelectorAll('[data-kuji-del]').forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.kujiDel); if(confirm(`${k.prizes[i].name} を削除する？`)){k.prizes.splice(i,1);save();renderKujiTool();}});
  }
  if(window.kujiHistoryList){
    kujiHistoryList.innerHTML = (k.history||[]).slice().reverse().map((h,idx)=>`<div class="tool-item" style="margin-bottom:6px"><b>${escapeHtml(h.prize||'')}</b>${h.lastOne?` <span style="color:#fbbf24;font-weight:900">+ ${escapeHtml(h.lastOne)}</span>`:''}<div class="muted">${escapeHtml(h.time||'')}</div></div>`).join('') || '<p class="muted">まだ履歴なし。</p>';
  }
  if(window.kujiLastOneName) kujiLastOneName.value = k.lastOne || '';
  if(window.kujiDrawBtn) kujiDrawBtn.disabled = total<=0;
}
function playKujiPeelSe(){
  const a = document.getElementById("seKujiPeel");
  if(!a) return;
  try{
    const seVol = Number((state.settings && state.settings.seVolume) ?? (state.roulette && state.roulette.settings && state.roulette.settings.seVolume) ?? 80);
    a.volume = Math.max(0, Math.min(1, seVol/100));
    a.currentTime = 0;
    a.play().catch(()=>{});
  }catch(e){}
}

function drawKuji(){
  const k=kujiState();
  const pool=[];
  k.prizes.forEach((p,i)=>{ for(let n=0;n<kujiRemainingPrize(p);n++) pool.push(i); });
  if(!pool.length){ alert('くじが全部なくなった！'); renderKujiTool(); return; }
  const before=pool.length;
  const idx=pool[Math.floor(Math.random()*pool.length)];
  const prize=k.prizes[idx];
  prize.drawn=(prize.drawn||0)+1;
  const after=before-1;
  const lastOne = after===0 ? (k.lastOne||'') : '';
  const time=new Date().toLocaleString('ja-JP');
  k.history=k.history||[];
  k.history.push({prize:prize.name,lastOne,time});
  if(k.history.length>100) k.history=k.history.slice(-100);
  save();
  if(window.kujiTicketText){
    playKujiPeelSe();
    kujiTicketText.dataset.locked='1';
    kujiTicketText.innerHTML='<div style="font-size:32px">ぺり…</div><div class="muted" style="color:#7c2d12;font-size:14px;margin-top:6px">ゆっくり開封中</div>';
    if(window.kujiTicket){
      kujiTicket.style.transform='scale(1.02) rotate(-1deg)';
      kujiTicket.style.boxShadow='inset 0 0 0 4px rgba(120,53,15,.15),0 20px 46px rgba(251,146,60,.28)';
    }
    setTimeout(()=>{ kujiTicketText.innerHTML='<div style="font-size:36px">ぺりぺり…</div><div style="height:8px;margin:12px auto 0;max-width:260px;background:linear-gradient(90deg,#92400e 0%,#f59e0b 55%,#fff7ed 55%);border-radius:999px"></div>'; },420);
    setTimeout(()=>{ kujiTicketText.innerHTML='<div style="font-size:34px">もう少し…！</div><div style="height:8px;margin:12px auto 0;max-width:260px;background:linear-gradient(90deg,#92400e 0%,#f59e0b 82%,#fff7ed 82%);border-radius:999px"></div>'; },900);
    setTimeout(()=>{
      const remainAfter = kujiRemainingPrize(prize);
      const totalAfter = kujiTotalRemaining();
      const resultLabel = escapeHtml(prize.name || '賞');
      const resultColor = prize.color || '#f59e0b';
      kujiTicketText.innerHTML = `
        <div style="width:100%;padding:10px 14px">
          <div style="display:inline-block;padding:5px 14px;border-radius:999px;background:#3b1b08;color:#fff7ed;font-size:16px;letter-spacing:.08em;margin-bottom:8px">今回の結果</div>
          <div style="font-size:82px;line-height:.95;font-weight:1000;color:${resultColor};text-shadow:0 4px 0 rgba(255,255,255,.78),0 10px 22px rgba(0,0,0,.18);-webkit-text-stroke:2px rgba(59,27,8,.28);word-break:break-word">${resultLabel}</div>
          ${lastOne?`<div style="margin:10px auto 0;display:inline-block;padding:8px 14px;border-radius:14px;background:#fbbf24;color:#3b1b08;font-size:28px;font-weight:1000;box-shadow:0 8px 18px rgba(180,83,9,.25)">ラストワン：${escapeHtml(lastOne)}</div>`:''}
          <div style="margin-top:12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;font-size:15px;color:#7c2d12;font-weight:900">
            <span style="padding:5px 10px;border-radius:999px;background:rgba(255,247,237,.75)">この賞 残り ${remainAfter}本</span>
            <span style="padding:5px 10px;border-radius:999px;background:rgba(255,247,237,.75)">全体 残り ${totalAfter}本</span>
          </div>
        </div>`;
      if(window.kujiTicket){
        kujiTicket.style.transform='scale(1.01) rotate(0deg)';
        kujiTicket.style.background=`linear-gradient(135deg,#fff7ed 0%,#ffedd5 58%,${resultColor}33 100%)`;
        kujiTicket.style.boxShadow=`inset 0 0 0 5px ${resultColor},0 24px 54px ${resultColor}55`;
      }
      delete kujiTicketText.dataset.locked;
      renderKujiTool();
    },1450);
  } else renderKujiTool();
}
if(window.kujiDrawBtn) kujiDrawBtn.onclick=drawKuji;
if(window.kujiAddPrizeBtn) kujiAddPrizeBtn.onclick=()=>{const k=kujiState(); k.prizes.push({id:uid('kuji'),name:(kujiPrizeName.value||'新しい賞').trim(),count:Math.max(1,Number(kujiPrizeCount.value)||1),drawn:0,color:kujiPrizeColor.value||'#f59e0b'}); kujiPrizeName.value=''; save(); renderKujiTool();};
if(window.kujiSaveLastOneBtn) kujiSaveLastOneBtn.onclick=()=>{kujiState().lastOne=(kujiLastOneName.value||'').trim(); save(); renderKujiTool();};
if(window.kujiResetDrawsBtn) kujiResetDrawsBtn.onclick=()=>{if(confirm('引いた本数と履歴をリセットする？')){const k=kujiState(); k.prizes.forEach(p=>p.drawn=0); k.history=[]; save(); renderKujiTool();}};

function renderTools(){
  setupToolCollapse();
  renderRoulette();
  renderPolls();
  if(!window.counterList) return;
  newTimerSound.innerHTML=timerSounds.map(s=>`<option value="${s.id}">${s.label}</option>`).join("");

  counterList.innerHTML=state.tools.counters.map((c,i)=>`
    <div class="tool-item">
      <div class="row" style="justify-content:space-between">
        <input value="${escapeAttr(c.name)}" data-counter-name="${i}" style="max-width:65%">
        <button class="btn danger mini-btn" data-counter-del="${i}">削除</button>
      </div>
      <div class="row" style="justify-content:space-between;margin-top:12px">
        <div class="count-value">${c.value||0}</div>
        <div class="row">
          <button class="btn mini-btn" data-counter-minus="${i}">−</button>
          <button class="btn primary mini-btn" data-counter-plus="${i}">＋</button>
          <button class="btn mini-btn" data-counter-reset="${i}">リセット</button>
        </div>
      </div>
    </div>
  `).join("") || `<div class="tool-item muted">カウンターなし</div>`;

  timerList.innerHTML=state.tools.timers.map((t,i)=>`
    <div class="tool-item ${t.running?"running":""} ${t.done?"done":""}">
      <div class="row" style="justify-content:space-between">
        <input value="${escapeAttr(t.name)}" data-timer-name="${i}" style="max-width:58%">
        <button class="btn danger mini-btn" data-timer-del="${i}">削除</button>
      </div>
      <div class="row" style="justify-content:space-between;margin-top:12px">
        <div class="timer-value">${fmtTime(t.remaining)}</div>
        <div class="row">
          <button class="btn primary mini-btn" data-timer-toggle="${i}">${t.running?"停止":"開始"}</button>
          <button class="btn mini-btn" data-timer-reset="${i}">リセット</button>
        </div>
      </div>
      <div class="row" style="margin-top:10px">
        <label style="margin:0">時間</label>
        <input type="number" min="0" value="${Math.floor((t.duration||0)/60)}" data-timer-min="${i}" style="max-width:82px">
        <span>分</span>
        <input type="number" min="0" max="59" value="${(t.duration||0)%60}" data-timer-sec="${i}" style="max-width:82px">
        <span>秒</span>
        <select data-timer-sound="${i}" style="max-width:180px">
          ${timerSounds.map(s=>`<option value="${s.id}" ${t.sound===s.id?"selected":""}>${s.label}</option>`).join("")}
        </select>
        <button class="btn mini-btn" data-timer-test="${i}">音テスト</button>
      </div>
    </div>
  `).join("") || `<div class="tool-item muted">タイマーなし</div>`;

  bindToolButtons();
  ensureTimerTick();
}
function bindToolButtons(){
  counterList.querySelectorAll("[data-counter-name]").forEach(inp=>inp.onchange=()=>{state.tools.counters[Number(inp.dataset.counterName)].name=inp.value;save();renderTools()});
  counterList.querySelectorAll("[data-counter-plus]").forEach(btn=>btn.onclick=()=>{state.tools.counters[Number(btn.dataset.counterPlus)].value++;save();renderTools()});
  counterList.querySelectorAll("[data-counter-minus]").forEach(btn=>btn.onclick=()=>{const c=state.tools.counters[Number(btn.dataset.counterMinus)];c.value=Math.max(0,(c.value||0)-1);save();renderTools()});
  counterList.querySelectorAll("[data-counter-reset]").forEach(btn=>btn.onclick=()=>{state.tools.counters[Number(btn.dataset.counterReset)].value=0;save();renderTools()});
  counterList.querySelectorAll("[data-counter-del]").forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.counterDel); if(confirm(`${state.tools.counters[i].name} を削除する？`)){state.tools.counters.splice(i,1);save();renderTools()}});

  timerList.querySelectorAll("[data-timer-name]").forEach(inp=>inp.onchange=()=>{state.tools.timers[Number(inp.dataset.timerName)].name=inp.value;save();renderTools()});
  timerList.querySelectorAll("[data-timer-toggle]").forEach(btn=>btn.onclick=()=>toggleTimer(Number(btn.dataset.timerToggle)));
  timerList.querySelectorAll("[data-timer-reset]").forEach(btn=>btn.onclick=()=>resetTimer(Number(btn.dataset.timerReset)));
  timerList.querySelectorAll("[data-timer-del]").forEach(btn=>btn.onclick=()=>{const i=Number(btn.dataset.timerDel); if(confirm(`${state.tools.timers[i].name} を削除する？`)){state.tools.timers.splice(i,1);save();renderTools()}});
  timerList.querySelectorAll("[data-timer-min], [data-timer-sec]").forEach(inp=>inp.onchange=()=>updateTimerDurationFromInputs(inp));
  timerList.querySelectorAll("[data-timer-sound]").forEach(sel=>sel.onchange=()=>{state.tools.timers[Number(sel.dataset.timerSound)].sound=sel.value;save();});
  timerList.querySelectorAll("[data-timer-test]").forEach(btn=>btn.onclick=()=>playAlarm(state.tools.timers[Number(btn.dataset.timerTest)].sound));
}
function updateTimerDurationFromInputs(inp){
  const i=Number(inp.dataset.timerMin ?? inp.dataset.timerSec);
  const minEl=timerList.querySelector(`[data-timer-min="${i}"]`);
  const secEl=timerList.querySelector(`[data-timer-sec="${i}"]`);
  const duration=Math.max(1,(Number(minEl.value)||0)*60 + Math.min(59,Number(secEl.value)||0));
  const t=state.tools.timers[i];
  t.duration=duration;
  if(!t.running) t.remaining=duration;
  t.done=false;
  save();renderTools();
}
function toggleTimer(i){
  const t=state.tools.timers[i];
  if(!t)return;
  if(t.remaining<=0) t.remaining=t.duration;
  t.running=!t.running;
  t.done=false;
  save();renderTools();
}
function resetTimer(i){
  const t=state.tools.timers[i];
  if(!t)return;
  t.running=false;
  t.done=false;
  t.remaining=t.duration;
  save();renderTools();
}
function ensureTimerTick(){
  if(timerTick) return;
  timerTick=setInterval(()=>{
    let changed=false, needRender=false;
    state.tools.timers.forEach(t=>{
      if(t.running){
        t.remaining=Math.max(0,(t.remaining||0)-1);
        changed=true;
        needRender=true;
        if(t.remaining<=0){
          t.running=false;
          t.done=true;
          playAlarm(t.sound);
        }
      }
    });
    if(changed) save();
    if(needRender && document.getElementById("tools").classList.contains("active")) renderTools();
  },1000);
}
if(window.addCounter) addCounter.onclick=()=>{
  const name=newCounterName.value.trim() || "新しいカウンター";
  state.tools.counters.push({id:uid("c"),name,value:0});
  newCounterName.value="";
  save();renderTools();
}
if(window.addTimer) addTimer.onclick=()=>{
  const name=newTimerName.value.trim() || "新しいタイマー";
  const duration=Math.max(1,(Number(newTimerMinutes.value)||0)*60 + Math.min(59,Number(newTimerSeconds.value)||0));
  state.tools.timers.push({id:uid("t"),name,duration,remaining:duration,running:false,sound:newTimerSound.value||"hato1",done:false});
  newTimerName.value="";
  save();renderTools();
}


let enduranceTick = null;
function enduranceState(){
  state.tools = state.tools || {};
  state.tools.endurance = state.tools.endurance || structuredClone(defaultState.tools.endurance);
  const e = state.tools.endurance;
  e.buttons = e.buttons || [];
  if(!e.mode) e.mode = "timer";
  if(typeof e.timerDuration !== "number") e.timerDuration = 180;
  if(typeof e.timerRemaining !== "number") e.timerRemaining = e.timerDuration;
  if(typeof e.counterGoal !== "number") e.counterGoal = 100;
  if(typeof e.counterValue !== "number") e.counterValue = 0;
  if(typeof e.timerSound !== "string") e.timerSound = "alarm_clock";
  return e;
}
function fmtEnduranceTime(sec){
  sec = Math.max(0, Math.floor(Number(sec)||0));
  const m = Math.floor(sec/60);
  const s = sec%60;
  return String(m).padStart(2,"0") + ":" + String(s).padStart(2,"0");
}
function playEnduranceButtonSe(){
  if(typeof playAudio === "function") playAudio("seRouletteResult", true);
}
function renderEnduranceTool(){
  const e = enduranceState();
  const timerMode = e.mode !== "counter";
  if(window.enduranceTimerTab){
    enduranceTimerTab.classList.toggle("primary", timerMode);
    enduranceTimerTab.classList.toggle("active", timerMode);
  }
  if(window.enduranceCounterTab){
    enduranceCounterTab.classList.toggle("primary", !timerMode);
    enduranceCounterTab.classList.toggle("active", !timerMode);
  }
  const goal = Number(e.counterGoal)||0;
  const current = Number(e.counterValue)||0;
  const hasGoal = !timerMode && goal > 0;
  const progress = hasGoal ? Math.min(100, Math.max(0, current / goal * 100)) : 0;
  if(window.enduranceModeLabel) enduranceModeLabel.textContent = timerMode ? "タイマーモード" : "カウンターモード";
  if(window.enduranceMainValue) enduranceMainValue.textContent = timerMode ? fmtEnduranceTime(e.timerRemaining) : String(current);
  if(window.enduranceSubValue) enduranceSubValue.textContent = timerMode ? `初期 ${fmtEnduranceTime(e.timerDuration)} / 0秒を目指せ` : (hasGoal ? `目標 ${goal} / ${Math.floor(progress)}% / 残り ${Math.max(0,goal-current)}` : "目標なし / 特殊カウンターとして使用中");
  if(window.enduranceDisplayBox){
    enduranceDisplayBox.classList.toggle("warning", timerMode && e.timerRemaining <= 30 && e.timerRemaining > 0 && e.timerRunning);
    enduranceDisplayBox.classList.toggle("goal-ring", hasGoal);
    enduranceDisplayBox.classList.toggle("goal-complete", hasGoal && progress >= 100);
    enduranceDisplayBox.style.setProperty("--endurance-progress", progress + "%");
  }
  if(window.enduranceStartPause) enduranceStartPause.textContent = timerMode ? (e.timerRunning ? "停止" : "開始") : "カウンターはボタンで加算";
  if(window.enduranceStartPause) enduranceStartPause.disabled = !timerMode;
  if(window.enduranceTitleInput) enduranceTitleInput.value = e.title || "";
  if(window.enduranceTimerMin) enduranceTimerMin.value = Math.floor((e.timerDuration||0)/60);
  if(window.enduranceTimerSec) enduranceTimerSec.value = (e.timerDuration||0)%60;
  if(window.enduranceTimerSound){
    enduranceTimerSound.innerHTML = timerSounds.map(snd=>`<option value="${snd.id}" ${e.timerSound===snd.id?"selected":""}>終了音：${snd.label}</option>`).join("");
    enduranceTimerSound.value = e.timerSound || "alarm_clock";
  }
  if(window.enduranceCounterGoal) enduranceCounterGoal.value = e.counterGoal || 0;

  if(window.enduranceActionButtons){
    const visible = (e.buttons||[]).filter(b => timerMode ? b.unit !== "count" : b.unit === "count");
    enduranceActionButtons.innerHTML = visible.map(b=>{
      const label = b.unit === "minutes" ? `${b.value}分` : b.unit === "seconds" ? `${b.value}秒` : `${b.value}`;
      return `<button class="btn endurance-hit-btn" data-endurance-hit="${escapeAttr(b.id)}" style="background:${escapeAttr(b.color||"#38bdf8")};border-color:transparent;color:#020617" type="button">${escapeHtml(b.name)}<br><span>${Number(b.value)>=0?"+":""}${escapeHtml(label)}</span></button>`;
    }).join("") || `<div class="tool-item muted">このモード用のボタンなし</div>`;
    enduranceActionButtons.querySelectorAll("[data-endurance-hit]").forEach(btn=>btn.onclick=()=>hitEnduranceButton(btn.dataset.enduranceHit));
  }
  if(window.enduranceButtonList){
    enduranceButtonList.innerHTML = (e.buttons||[]).map((b,i)=>`
      <div class="endurance-action-card">
        <div class="row" style="justify-content:space-between">
          <b>${escapeHtml(b.name)}</b>
          <button class="btn danger mini-btn" data-endurance-del="${i}" type="button">削除</button>
        </div>
        <div class="muted">${escapeHtml(b.unit)} / ${Number(b.value)>=0?"+":""}${escapeHtml(b.value)} / ${escapeHtml(b.color||"")}</div>
      </div>
    `).join("") || `<div class="tool-item muted">カスタムボタンなし</div>`;
    enduranceButtonList.querySelectorAll("[data-endurance-del]").forEach(btn=>btn.onclick=()=>{
      const i = Number(btn.dataset.enduranceDel);
      e.buttons.splice(i,1); save(); renderEnduranceTool();
    });
  }
}
function hitEnduranceButton(id){
  const e = enduranceState();
  const b = (e.buttons||[]).find(x=>String(x.id)===String(id));
  if(!b) return;
  const v = Number(b.value)||0;
  if(b.unit === "count"){
    e.counterValue = Math.max(0,(e.counterValue||0)+v);
  }else{
    const add = b.unit === "minutes" ? v*60 : v;
    e.timerRemaining = Math.max(0,(e.timerRemaining||0)+add);
  }
  playEnduranceButtonSe();
  save(); renderEnduranceTool();
}
function ensureEnduranceTick(){
  if(enduranceTick) return;
  enduranceTick=setInterval(()=>{
    const e=enduranceState();
    if(e.timerRunning){
      e.timerRemaining=Math.max(0,(e.timerRemaining||0)-1);
      if(e.timerRemaining<=0){ e.timerRunning=false; if(typeof playAlarm==="function") playAlarm(e.timerSound||"alarm_clock"); }
      save();
      if(document.getElementById("enduranceTool")?.classList.contains("active")) renderEnduranceTool();
    }
  },1000);
}
if(window.enduranceTimerTab) enduranceTimerTab.onclick=()=>{const e=enduranceState(); e.mode="timer"; save(); renderEnduranceTool();};
if(window.enduranceCounterTab) enduranceCounterTab.onclick=()=>{const e=enduranceState(); e.mode="counter"; save(); renderEnduranceTool();};
if(window.enduranceStartPause) enduranceStartPause.onclick=()=>{const e=enduranceState(); if(e.timerRemaining<=0) e.timerRemaining=e.timerDuration; e.timerRunning=!e.timerRunning; save(); renderEnduranceTool(); ensureEnduranceTick();};
if(window.enduranceReset) enduranceReset.onclick=()=>{const e=enduranceState(); if(e.mode==="counter"){e.counterValue=0;}else{e.timerRunning=false; e.timerRemaining=e.timerDuration;} save(); renderEnduranceTool();};
if(window.enduranceSaveBase) enduranceSaveBase.onclick=()=>{const e=enduranceState(); e.title=(enduranceTitleInput.value||"カウントアップタイマー").trim(); const dur=Math.max(1,(Number(enduranceTimerMin.value)||0)*60 + Math.min(59,Number(enduranceTimerSec.value)||0)); e.timerDuration=dur; e.timerSound=(window.enduranceTimerSound?.value)||e.timerSound||"alarm_clock"; if(!e.timerRunning) e.timerRemaining=dur; e.counterGoal=Math.max(0,Number(enduranceCounterGoal.value)||0); save(); renderEnduranceTool();};
if(window.enduranceAddButton) enduranceAddButton.onclick=()=>{const e=enduranceState(); const name=(enduranceButtonName.value||"追加ボタン").trim(); const value=Number(enduranceButtonValue.value)||0; const unit=enduranceButtonUnit.value||"seconds"; const color=enduranceButtonColor.value||"#38bdf8"; e.buttons.push({id:uid("ed"),name,value,unit,color}); enduranceButtonName.value=""; save(); renderEnduranceTool();};
if(window.enduranceClearButtons) enduranceClearButtons.onclick=()=>{const e=enduranceState(); if(confirm("耐久カウンターのカスタムボタンを全部消す？")){e.buttons=[]; save(); renderEnduranceTool();}};
ensureEnduranceTick();

function encodeSaveData(obj){
  const json=JSON.stringify(obj);
  const bytes=new TextEncoder().encode(json);
  let binary="";
  bytes.forEach(b=>binary+=String.fromCharCode(b));
  return "STREAMBASE1:" + btoa(binary);
}
function decodeSaveData(code){
  const raw=String(code||"").trim();
  if(!raw.startsWith("STREAMBASE1:")) throw new Error("保存文字列の形式が違う");
  const b64=raw.replace("STREAMBASE1:","");
  const binary=atob(b64);
  const bytes=new Uint8Array([...binary].map(ch=>ch.charCodeAt(0)));
  const json=new TextDecoder().decode(bytes);
  return JSON.parse(json);
}
function refreshAll(){
  save();
  renderHome();
  renderGames();
  renderBonus();
  renderMemo();
  renderChLog();
  renderChinMode();
  renderSettings();
  renderFirebaseSettings();
  renderCalendar();
  renderTools();
  renderPolls();
  renderRoulette();
  renderCountdowns();
  applyVolumes();
}
if(window.exportDataCode) exportDataCode.onclick=()=>{
  dataCodeBox.value=encodeSaveData(state);
};
if(window.copyDataCode) copyDataCode.onclick=async()=>{
  if(!dataCodeBox.value.trim()) dataCodeBox.value=encodeSaveData(state);
  try{
    await navigator.clipboard.writeText(dataCodeBox.value);
    alert("コピーした！");
  }catch(e){
    dataCodeBox.select();
    document.execCommand("copy");
    alert("コピーした！ たぶん！");
  }
};
if(window.importDataCode) importDataCode.onclick=()=>{
  try{
    const next=decodeSaveData(dataCodeBox.value);
    if(!confirm("この保存文字列を読み込む？\\n今のデータは上書きされるよ。")) return;
    state=next;
    state.settings = state.settings || structuredClone(defaultState.settings);
    if(typeof state.settings.alarmVolume!=="number") state.settings.alarmVolume=80;
    state.calendarEvents = state.calendarEvents || [];
    state.calendarTypes = state.calendarTypes || structuredClone(defaultState.calendarTypes || []);
    if(!state.calendarTypes.length) state.calendarTypes = structuredClone(defaultState.calendarTypes || []);
    state.polls = state.polls || structuredClone(defaultState.polls || []);
    state.logboMonth = state.logboMonth || ym(new Date());
    state.listeners = state.listeners || [];
    state.listeners.forEach(l=>{
      l.logboByMonth = l.logboByMonth || {};
      if(Array.isArray(l.days) && !l.logboByMonth[state.logboMonth]) l.logboByMonth[state.logboMonth]=[...l.days].sort((a,b)=>a-b);
      l.days=getLogboDays(l);
    });
    state.polls = state.polls || structuredClone(defaultState.polls || []);
state.tools = state.tools || structuredClone(defaultState.tools);
    state.tools.counters = state.tools.counters || [];
    state.tools.timers = state.tools.timers || [];
    state.chin = state.chin || structuredClone(defaultState.chin);
    state.chin.diceCount = state.chin.diceCount || 3;
    state.chin.diceNames = state.chin.diceNames || structuredClone(defaultState.chin.diceNames);
    state.chin.customDice = state.chin.customDice || structuredClone(defaultState.chin.customDice);
    state.chin.localMap = state.chin.localMap || {};
    state.customGames = state.customGames || structuredClone(defaultState.customGames);
    for (const k in defaultState.customGames) state.customGames[k] = state.customGames[k] || structuredClone(defaultState.customGames[k]);
    state.listeners = state.listeners || [];
    state.listeners.forEach(l=>{ if(typeof l.penalty!=="number") l.penalty=0; if(typeof l.registeredDate!=="string") l.registeredDate="";
  if(typeof l.birthday!=="string") l.birthday="";
  if(typeof l.birthYear!=="string") l.birthYear="";
  if(typeof l.bloodType!=="string") l.bloodType="";
  if(typeof l.firstVisitDate!=="string") l.firstVisitDate="";
  if(typeof l.nickname!=="string") l.nickname="";
  if(typeof l.searchYomi!=="string") l.searchYomi="";
  if(typeof l.searchTags!=="string") l.searchTags="";
  if(!l.favorites) l.favorites={};
  ["project","game","food","area","music","anime","habit","free1","free2","ngTopic","dislikeFood","firstGame","mainWeapon","holiday","bgm","localThing","season","animal","oshi","firstStream","oneLine","teaseLine"].forEach(k=>{ if(typeof l.favorites[k]!=="string") l.favorites[k]=""; });
  if(!Array.isArray(l.topicSeeds)) l.topicSeeds=[]; });
    selectedListener=0;
    refreshAll();
    alert("読み込んだ！");
  }catch(e){
    alert("読み込み失敗：保存文字列が違うか壊れてるかも");
  }
};

function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
function escapeAttr(s){return escapeHtml(s).replace(/"/g,"&quot;")}

renderHome();renderGames();renderBonus();renderMemo();renderCalendar();renderChLog();renderChinMode();renderSettings();renderTools();renderPolls();renderRoulette();renderCountdowns();applyVolumes();ensureTimerTick();


document.addEventListener("click",(e)=>{
  if(e.target && e.target.id==="openFirebaseHelp"){
    const modal=document.getElementById("firebaseHelpModal");
    if(modal) modal.classList.add("open");
  }
  if(e.target && e.target.id==="closeFirebaseHelp"){
    const modal=document.getElementById("firebaseHelpModal");
    if(modal) modal.classList.remove("open");
  }
  if(e.target && e.target.id==="firebaseHelpModal"){
    e.target.classList.remove("open");
  }
});
document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape"){
    const modal=document.getElementById("firebaseHelpModal");
    if(modal) modal.classList.remove("open");
  }
});


document.addEventListener("click",(e)=>{
  const t=e.target;
  if(!t) return;

  if(t.id==="addRouletteItem"){
    const input=document.getElementById("newRouletteItem");
    const v=input?.value.trim();
    if(!v) return;
    state.roulette=state.roulette||{items:[],history:[]};
    state.roulette.items.push(v);
    input.value="";
    save();renderRoulette();
  }

  if(t.id==="shuffleRoulette"){
    const arr=state.roulette?.items||[];
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    save();renderRoulette();
  }

  if(t.id==="clearRouletteHistory"){
    if(!confirm("ルーレット履歴を削除する？")) return;
    state.roulette.history=[];
    save();renderRoulette();
  }

  if(t.id==="spinRoulette"){
    spinCasinoRoulette();
  }

  if(t.dataset && t.dataset.delRoulette!==undefined){
    const i=Number(t.dataset.delRoulette);
    state.roulette.items.splice(i,1);
    save();renderRoulette();
  }
});

function spinCasinoRoulette(){
  if(rouletteSpinning) return;
  const items=state.roulette?.items || [];
  if(items.length<2) return alert("ルーレット項目は2個以上ほしいｗ");

  const stage=document.getElementById("rouletteStage");
  const wheel=document.getElementById("rouletteWheel");
  const resultEl=document.getElementById("rouletteResult");
  if(!stage || !wheel || !resultEl) return alert("ルーレット表示が見つからないｗ");

  rouletteSpinning=true;
  stage.classList.remove("hit");
  resultEl.classList.remove("show");
  resultEl.textContent="回転中…";

  const winnerIndex=Math.floor(Math.random()*items.length);
  const winner=items[winnerIndex];

  rouletteRotation += 360*6 + Math.floor(Math.random()*360);
  wheel.style.transform=`rotate(${rouletteRotation}deg)`;

  setTimeout(()=>{
    resultEl.textContent=winner;
    resultEl.classList.add("show");
    stage.classList.add("hit");
    state.roulette.history.unshift({
      time:new Date().toLocaleTimeString("ja-JP"),
      result:winner
    });
    state.roulette.history=state.roulette.history.slice(0,30);
    save();renderRoulette();
    try{ playAlarm("sponsor"); }catch(e){}
    rouletteSpinning=false;
  },4200);
}


document.addEventListener("click",(e)=>{
  const t=e.target;
  if(!t) return;

  if(t.id==="toggleRoulettePanel"){
    state.ui=state.ui||{};
    state.ui.rouletteOpen=!state.ui.rouletteOpen;
    save();
    renderRoulette();
    return;
  }

  if(t.id==="addRouletteItem"){
    const input=document.getElementById("newRouletteItem");
    const v=input?.value.trim();
    if(!v) return;
    state.roulette=state.roulette||{items:[],history:[]};
    state.roulette.items=state.roulette.items||[];
    state.roulette.items.push(v);
    input.value="";
    save();
    renderRoulette();
    return;
  }

  if(t.id==="shuffleRoulette"){
    const arr=state.roulette?.items||[];
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    save();
    renderRoulette();
    return;
  }

  if(t.id==="clearRouletteHistory"){
    if(!confirm("ルーレット履歴を削除する？")) return;
    state.roulette=state.roulette||{items:[],history:[]};
    state.roulette.history=[];
    save();
    renderRoulette();
    return;
  }

  if(t.id==="spinRoulette"){
    spinCasinoRoulette();
    return;
  }

  if(t.dataset && t.dataset.delRoulette!==undefined){
    const i=Number(t.dataset.delRoulette);
    if(state.roulette?.items) state.roulette.items.splice(i,1);
    save();
    renderRoulette();
    return;
  }
});

function spinCasinoRoulette(){
  if(rouletteSpinning) return;
  state.roulette=state.roulette||{items:[],history:[]};
  const items=state.roulette.items || [];
  if(items.length<2) return alert("ルーレット項目は2個以上ほしいｗ");

  const stage=document.getElementById("rouletteStage");
  const wheel=document.getElementById("rouletteWheel");
  const resultEl=document.getElementById("rouletteResult");
  if(!stage || !wheel || !resultEl) return alert("ルーレット表示が見つからないｗ");

  rouletteSpinning=true;
  stage.classList.remove("hit");
  resultEl.classList.remove("show");
  resultEl.textContent="回転中…";

  const winnerIndex=Math.floor(Math.random()*items.length);
  const winner=items[winnerIndex];

  rouletteRotation += 360*6 + Math.floor(Math.random()*360);
  wheel.style.transform=`rotate(${rouletteRotation}deg)`;

  setTimeout(()=>{
    resultEl.textContent=winner;
    resultEl.classList.add("show");
    stage.classList.add("hit");
    state.roulette.history=state.roulette.history||[];
    state.roulette.history.unshift({
      time:new Date().toLocaleTimeString("ja-JP"),
      result:winner
    });
    state.roulette.history=state.roulette.history.slice(0,30);
    save();
    renderRoulette();
    try{ playAlarm("sponsor"); }catch(e){}
    rouletteSpinning=false;
  },4200);
}

document.addEventListener("DOMContentLoaded",()=>renderRoulette());

