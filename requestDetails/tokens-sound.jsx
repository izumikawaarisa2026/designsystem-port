import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「サウンド(音フィードバック)」ページ。
 *
 * このページの発見: 4系列のうち、UIの音の「作り方」(音の種類・音色・旋律)を体系的に
 * まとめているのはGoogleだけで、しかもそれはMaterial Design 2(旧版)の指針であり、M3には
 * 対応するページがない。Appleは音の作り方よりも「消音モード・音量・出力先の設定に従う」という
 * 鳴らし方のルールを詳しく定める。W3Cは「自動で3秒を超えて鳴る音を止められること」、
 * NN groupは「効果音は意味が伝わりにくいので控えめに使い、言葉と組み合わせる」とする。
 * Apple・W3C・NN groupは「音は補助で、音だけに頼らない・止められるようにする」点で一致している(Google(M2)は音の作り方が中心)。
 *
 * Apple(HIG Playing audio・Accessibility・Playing haptics)はHIGのページデータ(JSON)を直接取得して
 * 確認済み(2026-09)。Google(Material Design 2 Sound)はm2.material.ioのページデータ(JSON)を
 * 直接取得して確認(2026-09)。触覚はAndroid Developersの「Haptics design principles」を本文確認。
 * W3C(1.4.2・1.4.7)・NN group(Audio Signifiers for Voice Interaction、Guidelines for Multimedia
 * on the Web)は本文を直接取得して確認済み(2026-09)。
 *
 * 2026-10 追記: ユーザーから「まず目的・利用シーン・ルールの概要を」「音の種類やシーンを具体的に」というフィードバックを受け、
 * 冒頭の概要(SoundIntro)と、音の種類ごとの具体的なシーン・旋律の形・シーン別の鳴らす/鳴らさないの一覧を追加。
 * 具体例はM2のApplying sound to UI・Sound choreographyのページデータ(JSON)を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Playing audio / Accessibility(Hearing)",
    color: "#C2542A",
    position: "音は端末の消音・音量・出力先の設定に必ず従う、という「利用者の期待どおりに振る舞う」ことが中心。音の作り方より、鳴らし方のルールを詳しく定める",
    size: "消音モードでは、利用者が自分で始めた音(メディア再生・アラーム・音声/ビデオ通話)だけを鳴らし、キーボードのクリック音・効果音・ゲームのBGMなどは止めます。最終的な音量は常にシステムの音量が決め、アプリが全体の音量を変えてはいけません。ヘッドホンを外したら、再生はすぐに一時停止します。用途に応じて5つのオーディオカテゴリ(Solo ambient/Ambient/Playback/Record/Play and record)から選び、それによって消音スイッチに従うか・他の音と混ぜるか・バックグラウンドで鳴るかが決まります。",
    design: "音の作り方(音色など)の指針はほとんどありません。具体的なのはvisionOSで、独自のUI要素には独自の音を設計する、繰り返し聞く音は高さと音量をわずかにランダムに変える(仮想キーボードの例)、空間オーディオで音の出どころを物体に結びつける、といった指針があります。tvOSでは、利用者が始めた操作のときだけ音を鳴らし、アラートや通知には音を付けません。",
    stance:
      "音が体験の中心でも飾りでも、音量や出力先の変更に対して利用者の期待どおりに振る舞うことを求めています。他のアプリの音楽を必要もなく止めない、イヤホンのボタンなど音声コントロールの意味を変えない、一時的に割り込んだ後は他のアプリに再開してよいと知らせる、などです(ページ本文を直接確認、2026-09)。",
    exceptions:
      "visionOSでは逆に「音を鳴らす方を優先する」とし、音のないアプリは味気なく、壊れているようにさえ感じられるとしています。macOSの通知音は、既定で他の音と混ざります。watchOSでは、音声素材を64 kbpsのHE-AACで書き出すことを推奨しています。",
    accessibility:
      "知覚可能(Perceivable) ― 会話や重要な情報を音だけで伝えず、字幕・キャプション・音声解説・書き起こしを用意すること、成功音やエラー音には同じ意味の触覚(ハプティクス)を組み合わせること、音で誘導するときは視覚的な手がかりも添えることを求めています。",
    useCases: [
      "消音モード中は、利用者が始めた再生以外の効果音を鳴らさない",
      "音量はシステムに任せ、アプリ内の音同士のバランスだけを調整する",
      "成功・エラーの音には、同じ意味の触覚と視覚の手がかりを添える",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/playing-audio#Best-practices",
    urlSecondary: [
      { label: "Accessibility ― Hearing", url: "https://developer.apple.com/design/human-interface-guidelines/accessibility#Hearing" },
      { label: "Playing haptics ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/playing-haptics#Best-practices" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 2 ― Sound(About sound / Applying sound to UI / Sound attributes)",
    color: "#2F7D6E",
    position: "UIの音の役割と作り方を最も体系的にまとめているが、Material Design 2(旧版)の指針で、M3には対応するページがない",
    size: "数値の基準はありません。音を鳴らさない方がよい場面として、プライバシーや控えめさが求められる画面、利用者が割り込みを望まないと設定している場合、頻繁に行う操作の3つを挙げています。視覚デザインの余白のように「沈黙」を設計に組み込むことは、音を使う場面を知るのと同じくらい重要だとしています。",
    design: "UIの音を、ヒーローサウンド(重要な瞬間を祝う・まれに鳴る)、通知・アラート(注意を向けさせる・繰り返し聞けるよう短く)、プライマリUXサウンド(OSが出す操作音・最も頻繁で控えめ)、セカンダリUXサウンド(状態の変化など・頻度は低め)、アンビエント(雰囲気をつくる装飾の層)に分類しています。音色は、高音成分の多い明るい音を重要な通知や騒がしい場所向けに、少ない落ち着いた音を優先度の低い音に使い分けます。上がる旋律は開始・肯定、下がる旋律は終了、繰り返しは待機を表すのが一般的としています。",
    stance:
      "音の原則は、直感的で機能的な「Informative(情報を伝える)」、ブランドを偽りなく表す「Honest(正直)」、必要なときだけ行動を促し安心感を与える「Reassuring(安心させる)」の3つです。操作や状態の変化に結びつけた音を「イヤコン(earcon)」と呼び、現実の音に似せたもの(カメラのシャッター音など)と抽象的な音に分けています(Material Design 2のページデータを直接取得して確認、2026-09)。",
    exceptions:
      "装飾としての音は、感情の高まる場面に限り、頻度を抑えて疲れさせないよう求めています。通知音は、離れた場所や騒がしい環境でも聞こえるよう設計し、装飾のない基本的な音から豊かな音まで利用者が選べるようにすることを勧めています。現行のAndroidの触覚(ハプティクス)の指針では、視覚・音・触覚を同時に設計し、タイミングと印象をそろえるよう強く勧めています。",
    accessibility:
      "知覚可能(Perceivable) ― 確認したMaterial Design 2の音のページには、聴覚障害への配慮(音の代替手段)についての具体的な記載は見当たりませんでした。音は視覚体験を高めるもので、損なうものであってはならない、という位置づけです。",
    useCases: [
      "頻繁な操作や静かにすべき画面では、音を鳴らさない",
      "繰り返し鳴る音ほど短く控えめに、まれに鳴る音ほど印象的に",
      "重要な通知には明るい音色、優先度の低い音には落ち着いた音色",
    ],
    searchHint: "When not to use sound",
    url: "https://m2.material.io/design/sound/applying-sound-to-ui.html",
    urlSecondary: [
      { label: "M2: About sound", url: "https://m2.material.io/design/sound/about-sound.html" },
      { label: "M2: Sound attributes", url: "https://m2.material.io/design/sound/sound-attributes.html" },
      { label: "M2: Sound choreography", url: "https://m2.material.io/design/sound/sound-choreography.html" },
      { label: "Android: Haptics design principles", url: "https://developer.android.com/develop/ui/views/haptics/haptics-principles#design_visual_audio" },
    ],
    confirmedNote: "m2.material.ioはSPAですが、ページデータ(JSON)を直接取得して本文を確認済み(2026-09)。M3(m3.material.io)のサイトマップに音のページはありません。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.2 Audio Control / 1.4.7 Low or No Background Audio",
    color: "#A3821F",
    position: "効果音そのものの基準はなく、「自動で鳴る音を止められること」と「音声の聞き取りを妨げないこと」を求める",
    size: "ページで自動的に3秒より長く鳴る音には、一時停止・停止の手段か、システム全体とは別に音量を調整できる手段を用意すること(1.4.2・レベルA)。録音済みの音声が中心のコンテンツでは、背景音をなくす・切れるようにする・前景の音声より20デシベル以上小さくする、のいずれかを満たすこと(1.4.7・レベルAAA)。",
    design: "音色や効果音の設計は定めていません。音で伝える情報には、録音済みの音声のみのコンテンツに代替(書き起こしなど、1.2.1)、動画の音声に字幕(1.2.2)を求めており、音を唯一の伝達手段にしない考え方は他の系列と共通です。",
    glossary: [
      { term: "1.4.2 Audio Control・レベルA", desc: "自動で3秒を超えて鳴る音に、停止・一時停止か、個別の音量調整の手段を求める基準。" },
      { term: "1.4.7 Low or No Background Audio・レベルAAA", desc: "録音済みの音声中心のコンテンツで、背景音をなくす・切れる・20dB以上小さくすることを求める基準。" },
    ],
    stance:
      "自動で鳴る音は、スクリーンリーダーの読み上げを聞き取りにくくし、音に気を取られやすい人の妨げにもなるためです。1.4.2を満たさない内容はページ全体の利用を妨げうるため、ページ上のすべての内容がこの基準を満たす必要があるとしています(Understandingページの本文を直接確認、2026-09)。",
    exceptions:
      "1.4.2は、3秒以内に終わる音には適用されません。1.4.7は、音声CAPTCHA・音声ロゴ・歌やラップなど音楽表現が主な発声には適用されず、レベルAAAです。",
    accessibility: "知覚可能(Perceivable) ― 1.4.2・1.4.7はガイドライン1.4(判別可能)に属し、POURの「知覚可能」です。聴覚に障害のある人やスクリーンリーダーを使う人が、必要な音声を聞き分けられることを目的にしています。",
    useCases: [
      "自動再生の音は避け、鳴らすなら停止の手段をすぐ見つかる場所に置く",
      "3秒を超えて自動で鳴る音には、停止か個別の音量調整を用意する",
      "ナレーションの背景音楽は、切れるようにするか十分に小さくする",
    ],
    searchHint: "independently from the overall system volume",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html#success-criterion",
    urlSecondary: [
      { label: "1.4.7 Low or No Background Audio", url: "https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html#success-criterion" },
    ],
    confirmedNote: "2つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Audio Signifiers for Voice Interaction / Guidelines for Multimedia on the Web",
    color: "#7A4F7E",
    position: "効果音は画面とは別の補助チャネルとして有効だが、意味が伝わりにくいので控えめに使い、言葉と組み合わせる、とする実務指針(適合基準ではない)",
    size: "数値基準ではなく原則としての言及です。背景で起きた出来事を知らせる効果音は、ごく静かで邪魔にならないものにし、必ず利用者がオフにできる設定を用意するよう求めています(1995年の記事)。",
    design: "音の手がかりを、言葉を使わないイヤコン(例: Siriが起動の呼びかけを検知した後の2音のビープ)、明示的な言葉、暗黙の手がかり(話している途中で止まり、聞く態勢を示すなど)の3種類に分けています。イヤコンはアイコン以上に意味が伝わりにくく、ほとんどは意味の決まっていない音として働くため、意味が伝わるのは操作直後の確認か、繰り返し聞いて覚えた場合に限られるとしています。",
    stance:
      "音の利点は画面とは別のチャネルであることで、画面の情報を隠さずに補足できます。一方、イヤコンが効果的なのは、狭く繰り返しの多い文脈(頻繁なタスクの確認音)か、汎用的な注意喚起に限られ、多くの場合は言葉による手がかりを併用するか、置き換える必要があるとしています(記事本文を直接取得して確認、2026-09)。",
    exceptions:
      "ボタンを押したときの控えめなクリック音や、移動の方向で対になる音のように、質の良い効果音は体験を大きく高めるとしています。ゲームの研究で、音を良くしただけで、同じ映像なのに「映像が良くなった」と答えた例も紹介しています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、ユーザビリティの観察と研究に基づく設計上の根拠です。音声のナレーションは、聴覚に障害のある人や外国語の利用者には理解しにくい場合があるため、字幕を勧めています。",
    useCases: [
      "背景の出来事を知らせる音は、ごく静かにし、オフにできるようにする",
      "イヤコンは、操作直後の確認など意味が文脈から分かる場面で使う",
      "音だけでは伝わらない情報には、言葉(文字・音声)を併用する",
    ],
    searchHint: "Non-speech sound effects",
    url: "https://www.nngroup.com/articles/audio-signifiers-voice-interaction/#toc-nonverbal-sounds-3",
    urlSecondary: [{ label: "Guidelines for Multimedia on the Web(Audio)", url: "https://www.nngroup.com/articles/guidelines-for-multimedia-on-the-web/" }],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-09)。ページ内検索の語は2本目の記事(Guidelines for Multimedia on the Web)のものです。",
  },
];

/* 画像エリア: Google(M2)のUIの音の分類(頻度と目立ち方の概念図) */
function SoundTypesMap() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const x0 = 60, x1 = 400, y0 = 20, y1 = 150;
  const pts = [
    { x: 0.12, y: 0.86, label: "ヒーローサウンド", sub: "重要な瞬間を祝う" },
    { x: 0.45, y: 0.64, label: "通知・アラート", sub: "注意を向けさせる" },
    { x: 0.3, y: 0.36, label: "セカンダリUX", sub: "状態の変化など" },
    { x: 0.76, y: 0.18, label: "プライマリUX", sub: "操作音・控えめに" },
  ];
  const X = (v) => x0 + v * (x1 - x0);
  const Y = (v) => y1 - v * (y1 - y0);
  return (
    <svg viewBox="0 0 420 196" width="100%" style={{ maxWidth: 540, display: "block", margin: "0 auto" }} role="img" aria-label="UIの音の種類を、鳴る頻度と目立ち方で配置した概念図">
      <line x1={x0} y1={y1} x2={x1} y2={y1} stroke="#B7BCDA" />
      <line x1={x0} y1={y1} x2={x0} y2={y0} stroke="#B7BCDA" />
      <text x={x1} y={y1 + 14} fontSize="9" fill="#7E86AC" textAnchor="end" fontFamily={font}>鳴る頻度 → 多い</text>
      <text x={x0 - 6} y={y0 + 4} fontSize="9" fill="#7E86AC" textAnchor="end" fontFamily={font}>印象的</text>
      <text x={x0 - 6} y={y1} fontSize="9" fill="#7E86AC" textAnchor="end" fontFamily={font}>控えめ</text>
      {pts.map((p) => (
        <g key={p.label}>
          <circle cx={X(p.x)} cy={Y(p.y)} r={5 + p.y * 7} fill="#2F7D6E" fillOpacity="0.18" stroke="#2F7D6E" />
          <text x={X(p.x) + 14} y={Y(p.y) - 1} fontSize="10" fill="#171B36" fontWeight="600" fontFamily={font}>{p.label}</text>
          <text x={X(p.x) + 14} y={Y(p.y) + 11} fontSize="8.5" fill="#565D8A" fontFamily={font}>{p.sub}</text>
        </g>
      ))}
      <rect x={x0} y={y1 + 22} width={x1 - x0} height="14" rx="3" fill="#2F7D6E" fillOpacity="0.08" stroke="#2F7D6E" strokeDasharray="3 3" />
      <text x={(x0 + x1) / 2} y={y1 + 32} fontSize="9" fill="#2F7D6E" textAnchor="middle" fontFamily={font}>アンビエント(雰囲気をつくる装飾の層。作業の邪魔をしない)</text>
    </svg>
  );
}

/* 四サイト比較図: 音を鳴らすときのルール(◯=明記/△=部分的・条件付き/―=確認した範囲で記載なし) */
const RULE_ROWS = [
  {
    label: "利用者が音を止められる",
    cells: [
      { mark: "◯", note: "消音モード・システム音量に従う" },
      { mark: "△", note: "通知音を選べるように(推奨)" },
      { mark: "◯", note: "3秒超の自動音に停止/音量(1.4.2)" },
      { mark: "◯", note: "オフにする設定を必ず用意" },
    ],
  },
  {
    label: "音だけで情報を伝えない",
    cells: [
      { mark: "◯", note: "字幕・触覚・視覚の手がかりを併用" },
      { mark: "△", note: "視覚・音・触覚の同時設計(Android)" },
      { mark: "◯", note: "音声の代替・字幕(1.2.1・1.2.2)" },
      { mark: "◯", note: "イヤコンには言葉を併用" },
    ],
  },
  {
    label: "鳴らさない場面を示す",
    cells: [
      { mark: "◯", note: "消音中は効果音を止める・tvOSは通知音なし" },
      { mark: "◯", note: "控えめさが必要な画面・割り込み拒否・頻繁な操作" },
      { mark: "―", note: "" },
      { mark: "△", note: "背景の音はごく静かに" },
    ],
  },
  {
    label: "音の種類・作り方",
    cells: [
      { mark: "△", note: "visionOSのみ具体的" },
      { mark: "◯", note: "5分類・音色・旋律・音の減衰(M2)" },
      { mark: "―", note: "" },
      { mark: "△", note: "音の手がかりの3種類" },
    ],
  },
  {
    label: "数値の基準",
    cells: [
      { mark: "△", note: "watchOSの書き出し形式のみ" },
      { mark: "―", note: "" },
      { mark: "◯", note: "3秒(1.4.2)・20dB(1.4.7)" },
      { mark: "―", note: "" },
    ],
  },
];

const MARK_COLORS = { "◯": "#2E6B3A", "△": "#8A6A10", "―": "#B7BCDA" };

function RuleMatrix() {
  const names = ["Apple", "Google", "W3C", "NN group"];
  const colors = ["#C2542A", "#2F7D6E", "#A3821F", "#7A4F7E"];
  return (
    <div style={styles.ruleScroll}>
      <div style={styles.ruleGrid}>
        <div style={styles.ruleHead} />
        {names.map((n, i) => (<div key={n} style={{ ...styles.ruleHead, color: colors[i] }}>{n}</div>))}
        {RULE_ROWS.map((r) => (
          <React.Fragment key={r.label}>
            <div style={styles.ruleLabel}>{r.label}</div>
            {r.cells.map((c, i) => (
              <div key={i} style={styles.ruleCell}>
                <span style={{ ...styles.ruleMark, color: MARK_COLORS[c.mark] }}>{c.mark}</span>
                {c.note && <span style={styles.ruleNote}>{c.note}</span>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* 音と組み合わせる触覚(ハプティクス) */
const HAPTICS = [
  {
    name: "Apple(Playing haptics)",
    items: [
      "システムの触覚パターンは、決められた意味のとおりに使う",
      "触覚と原因の操作の対応を、アプリ全体で一貫させる",
      "視覚・音・触覚の強さや鋭さをそろえる",
      "使いすぎない。アプリでは短い触覚を区切りのある出来事に使う",
      "オフにでき、触覚なしでも使えるようにする",
    ],
  },
  {
    name: "Google(Android Haptics design principles)",
    items: [
      "あらかじめ用意された触覚の定数・効果を優先して使う",
      "頻繁な出来事ほど弱く、重要な出来事ほど強くする",
      "同じ種類の操作には同じ触覚を使い、システムとも合わせる",
      "視覚・音と同時に設計し、タイミングをずらさない",
      "古い単発の振動(one-shot vibration)を触覚フィードバックに使わない",
    ],
  },
];

/* ---------- はじめに: 目的・利用シーン・ルールの概要 ---------- */
const SOUND_PURPOSES = [
  { icon: "✓", title: "操作が届いたと伝える", text: "押した・選んだ・入力した、が受け付けられたことを返す(Googleのプライマリ UX、Appleの成功・エラー音、NN groupの「操作直後の確認」)" },
  { icon: "!", title: "注意を向けさせる", text: "通知・着信・アラームなど、画面を見ていない人にも届ける(Googleの通知・アラート)" },
  { icon: "↻", title: "状態の変化を知らせる", text: "更新が終わった、その操作は使えない、などを短い音で伝える(Googleのセカンダリ UX)" },
  { icon: "♪", title: "感情・ブランドを表す", text: "達成を祝う、世界観を演出する(Googleのヒーローサウンド・アンビエント)。控えめに、まれに" },
];

const SOUND_RULES = [
  { k: "端末の設定に従う", t: "消音モード・システムの音量・出力先(ヘッドホンなど)に従う。消音中は、利用者が自分で始めた再生(動画・アラーム・通話)以外は鳴らさない", who: "Apple" },
  { k: "鳴らさない場面を決める", t: "プライバシーや控えめさが必要な画面、割り込みを望まない設定の利用者、頻繁に行う操作には音を付けない", who: "Google(M2)" },
  { k: "音だけに頼らない", t: "同じ意味を、文字・アイコン・触覚(振動)でも伝える。会話や重要な情報には字幕・書き起こしを用意", who: "Apple・W3C・NN group" },
  { k: "止められるようにする", t: "自動で3秒を超えて鳴る音には停止か音量調整の手段を。効果音はオフにする設定を必ず用意", who: "W3C・NN group" },
  { k: "頻度が高いほど控えめに", t: "何度も聞く音ほど短く静かに、まれな音ほど印象的に。繰り返す音はわずかに変化させて耳障りにしない", who: "Google(M2)・Apple(visionOS)" },
];

function SoundIntro() {
  return (
    <section style={styles.introBox}>
      <h2 style={styles.introTitle}>はじめに ― UIでサウンドを使う目的・利用シーン・ルール</h2>
      <div style={styles.introCols}>
        <div style={{ minWidth: 0 }}>
          <div style={styles.introHead}>目的(なぜ音を使うか)</div>
          {SOUND_PURPOSES.map((p) => (
            <div key={p.title} style={styles.purposeRow}>
              <span style={styles.purposeIcon}>{p.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={styles.purposeTitle}>{p.title}</div>
                <div style={styles.purposeText}>{p.text}</div>
              </div>
            </div>
          ))}
          <p style={styles.introNote}>音の強みは、画面とは別の「もう1つの通り道」であること。画面の情報を隠さずに補足でき、画面を見ていない人にも届きます(NN group)。</p>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={styles.introHead}>ルールの概要(4系列の共通点)</div>
          <ol style={styles.ruleList}>
            {SOUND_RULES.map((r) => (
              <li key={r.k} style={styles.ruleItem}>
                <strong>{r.k}</strong> ― {r.t}
                <span style={styles.ruleWho}>{r.who}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div style={styles.introHead}>主な利用シーン</div>
      <div style={styles.sceneChips}>
        {["ボタン・スイッチの操作音", "キーボード入力のクリック音", "メッセージ・プッシュ通知", "着信音・アラーム・タイマー", "送信完了・エラー", "一覧の更新完了", "タスクをすべて完了したときのお祝い", "アプリの起動・ようこそ画面", "動画・音楽の再生", "ゲームの効果音・BGM"].map((s) => (<span key={s} style={styles.sceneChip}>{s}</span>))}
      </div>
    </section>
  );
}

/* ---------- 音の種類と具体的なシーン(Google M2の分類+Appleの鳴らし方) ---------- */
const SOUND_KINDS = [
  {
    key: "brand", name: "ブランドサウンド", sub: "サウンドロゴ", prio: 1, freq: 1, len: "短い・象徴的", timbre: "製品らしさを最も強く表す",
    scenes: ["製品・ブランドを象徴する短い旋律(優先度の表で最上位)"],
    apple: "―(HIGに該当する記載なし)",
  },
  {
    key: "hero", name: "ヒーローサウンド", sub: "大事な瞬間を祝う", prio: 2, freq: 1, len: "やや長め・印象的", timbre: "達成感・祝福",
    scenes: ["受信トレイの項目をすべて片付けたときのお祝い", "新しいアプリ・体験へのようこそ", "製品の目的に関わる重要な瞬間の確認"],
    apple: "作り方の指定はなし。効果音として、消音モード中は鳴らさない",
  },
  {
    key: "alert", name: "通知・アラート", sub: "注意を向けさせる", prio: 3, freq: 2, len: "短め・繰り返し聞ける", timbre: "明るい音色(緊急ほどエネルギッシュに)",
    scenes: ["プッシュ通知(操作できる通知に独自の音)", "緊急の知らせ(明るく目立つ音)", "着信音・アラーム・タイマー(好みで選べる/穏やか〜急な音)"],
    apple: "アラーム・通話は利用者が始めたものとして消音中も鳴る。macOSの通知音は既定で他の音と混ざる。tvOSは通知・アラートに音を付けない",
  },
  {
    key: "primary", name: "プライマリ UX", sub: "操作音", prio: 4, freq: 3, len: "ごく短い", timbre: "シンプルで控えめ",
    scenes: ["メニューの移動", "直接の操作の確認(選択・タップ)", "データ入力(キーボードのクリック音など)"],
    apple: "キーボードのクリック音は消音中は鳴らさない。visionOSの仮想キーボードは、繰り返し聞くため音の高さ・音量をわずかにランダムに変える",
  },
  {
    key: "secondary", name: "セカンダリ UX", sub: "状態の変化", prio: 5, freq: 2, len: "短い", timbre: "機能的・控えめ",
    scenes: ["フィードを更新し終えたときの小さな音", "使えない(選べない)項目を操作したときの音"],
    apple: "成功・エラーの音には、同じ意味の触覚(ハプティクス)を組み合わせる",
  },
  {
    key: "ambient", name: "アンビエント", sub: "雰囲気の層", prio: null, freq: 1, len: "流れ続ける", timbre: "作業の邪魔をしない装飾",
    scenes: ["起動時の流れで、利用者を体験に迎え入れる", "ホーム画面の伴奏として、感情のトーンや今いる場所を表す"],
    apple: "ゲームのBGMは消音中は止める。visionOSでは空間オーディオで音の出どころを物体に結びつける",
  },
];

function KindIcon({ k }) {
  const c = "#2F7D6E";
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
      <rect x="1" y="1" width="46" height="46" rx="10" fill="#E3EDE9" />
      {k === "brand" && <text x="24" y="31" fontSize="18" fontWeight="700" fill={c} textAnchor="middle">B</text>}
      {k === "hero" && <path d="M24 10 l4 9 l10 1 l-7.5 6.5 l2.5 10 l-9 -5.5 l-9 5.5 l2.5 -10 L10 20 l10 -1 z" fill={c} />}
      {k === "alert" && <g><path d="M15 31 c0 -12 3 -17 9 -17 s9 5 9 17 z" fill={c} /><circle cx="24" cy="35" r="3" fill={c} /></g>}
      {k === "primary" && <g><rect x="11" y="18" width="26" height="14" rx="7" fill={c} /><circle cx="30" cy="25" r="5" fill="#FFFFFF" /></g>}
      {k === "secondary" && <path d="M33 18 a11 11 0 1 0 2 9" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />}
      {k === "ambient" && <path d="M8 28 q5 -8 10 0 t10 0 t10 0" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />}
    </svg>
  );
}

function Level({ n, max = 3 }) {
  return <span style={styles.levelRow}>{Array.from({ length: max }, (_, i) => <span key={i} style={{ ...styles.levelDot, background: i < n ? "#2F7D6E" : "#E1E3F0" }} />)}</span>;
}

function SoundKindCatalog() {
  return (
    <div style={styles.kindGrid}>
      {SOUND_KINDS.map((s) => (
        <div key={s.key} style={styles.kindCard}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <KindIcon k={s.key} />
            <div>
              <div style={styles.kindName}>{s.name}<span style={styles.kindSub}>{s.sub}</span></div>
              <div style={styles.kindMeta}>
                {s.prio && <span>優先度 {s.prio}</span>}
                <span>鳴る頻度 <Level n={s.freq} /></span>
              </div>
            </div>
          </div>
          <div style={styles.kindSpec}><span style={styles.kindSpecK}>長さ</span>{s.len}<span style={styles.kindSpecK}>音色</span>{s.timbre}</div>
          <div style={styles.kindSceneHead}>具体的なシーン</div>
          <ul style={styles.kindScenes}>{s.scenes.map((x) => <li key={x}>{x}</li>)}</ul>
          <div style={styles.kindApple}><strong style={{ color: "#C2542A" }}>Appleでは: </strong>{s.apple}</div>
        </div>
      ))}
    </div>
  );
}

/* 音の形(旋律)で意味を伝える: M2 Sound attributes・Sound choreography */
function MelodyShapes() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const block = (x, notes, label, sub, color) => (
    <g>
      <rect x={x} y="4" width="150" height="70" rx="6" fill="#FFFFFF" stroke="#E1E3F0" />
      {[18, 30, 42, 54].map((y) => <line key={y} x1={x + 8} x2={x + 142} y1={y} y2={y} stroke="#EEF0F7" />)}
      {notes.map((n, i) => (
        <g key={i}>
          <ellipse cx={x + 26 + i * 32} cy={n} rx="6" ry="4.5" fill={color} transform={`rotate(-20 ${x + 26 + i * 32} ${n})`} />
          <line x1={x + 31.5 + i * 32} x2={x + 31.5 + i * 32} y1={n} y2={n - 18} stroke={color} strokeWidth="1.4" />
        </g>
      ))}
      <text x={x + 75} y="90" fontSize="10.5" fill="#171B36" fontWeight="600" textAnchor="middle" fontFamily={font}>{label}</text>
      <text x={x + 75} y="103" fontSize="9" fill="#565D8A" textAnchor="middle" fontFamily={font}>{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 490 108" width="100%" style={{ maxWidth: 600, display: "block", margin: "0 auto" }} role="img" aria-label="上がる旋律・下がる旋律・繰り返しの旋律の図">
      {block(0, [56, 46, 36, 26], "上がる旋律", "開始・肯定(例: スイッチをオン)", "#5A9629")}
      {block(170, [26, 36, 46, 56], "下がる旋律", "終了(例: スイッチをオフ)", "#C0503F")}
      {block(340, [40, 32, 40, 32], "繰り返し", "待っている・続いている", "#3C5A73")}
    </svg>
  );
}

/* シーン別: 鳴らす?鳴らさない? */
const SCENE_DECISIONS = [
  { scene: "消音モード中に、キーボードで文字を打つ", mark: "✕", why: "キーボードのクリック音・効果音は消音中は止める", who: "Apple" },
  { scene: "消音モード中に、自分で動画を再生した・アラームが鳴る時刻になった", mark: "◯", why: "利用者が自分で始めた再生・アラーム・通話は鳴らす", who: "Apple" },
  { scene: "再生中にヘッドホンが外れた", mark: "✕", why: "すぐに一時停止する", who: "Apple" },
  { scene: "暗証番号の入力など、人目を気にする画面", mark: "✕", why: "プライバシーや控えめさが必要な画面には音を付けない", who: "Google(M2)" },
  { scene: "スクロール・スワイプ・タイピングのように何度も繰り返す操作", mark: "△", why: "基本は付けない。付けるなら毎回わずかに音色を変え、耳障りにしない", who: "Google(M2)" },
  { scene: "受信トレイの項目をすべて片付けた", mark: "◯", why: "大事な達成はヒーローサウンドで祝ってよい(まれに・一貫して)", who: "Google(M2)" },
  { scene: "ページを開いたら、BGMが自動で流れ始める", mark: "△", why: "避けるのが基本。3秒を超えるなら停止か音量調整の手段が必須", who: "W3C" },
  { scene: "裏で処理が終わったことを知らせる", mark: "△", why: "ごく静かな音にし、オフにできる設定を用意する", who: "NN group" },
  { scene: "テレビ(tvOS)で通知が届いた", mark: "✕", why: "通知・アラートには音を付けない(利用者が始めた操作だけに音)", who: "Apple" },
  { scene: "送信に失敗した", mark: "◯", why: "音を鳴らすなら、同じ意味の触覚と画面上の表示を必ず添える", who: "Apple・NN group" },
];
const DEC_COLORS = { "◯": "#2E6B3A", "△": "#8A6A10", "✕": "#A33A2E" };

function SceneDecisionTable() {
  return (
    <div style={styles.decList}>
      {SCENE_DECISIONS.map((d) => (
        <div key={d.scene} style={styles.decRow}>
          <span style={{ ...styles.decMark, color: DEC_COLORS[d.mark] }}>{d.mark}</span>
          <div style={{ minWidth: 0 }}>
            <div style={styles.decScene}>{d.scene}</div>
            <div style={styles.decWhy}>{d.why}<span style={styles.decWho}>{d.who}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoBox({ label, accent, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent ? { borderLeftColor: accent } : {}) }}>
      <span style={styles.exceptionLabel}>{label}</span>
      <div style={styles.exceptionText}>{children}</div>
    </div>
  );
}

function UseCaseList({ items }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={styles.useCaseItem}>{it}</li>))}
    </ul>
  );
}

function GlossaryNote({ items }) {
  return (
    <div style={styles.glossaryNoteBox}>
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

export default function TokensSoundPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        .dsp-mobile-only { display: block; }
        .dsp-desktop-only { display: none; }
        .dsp-reduce-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
          .dsp-mobile-only { display: none; }
          .dsp-desktop-only { display: block; }
          .dsp-reduce-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/tokens/sound" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / インタラクション / サウンド</span>
            <span>SPEC No. 050</span>
          </div>

          <h1 style={styles.title}>サウンド(音フィードバック)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、UIの音をいつ鳴らし・いつ鳴らさないか、どう作り、音に頼れない人にどう配慮するかを比較します</p>

          <SoundIntro />

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>UIの音の種類(Google・Material Design 2の分類)</span>
            <SoundTypesMap />
            <p style={styles.swatchNote}>頻繁に鳴る音ほど短く控えめに、まれに鳴る音ほど印象的にする、という考え方を図にしたものです。位置はM2の説明文をもとにした概念図で、数値の基準ではありません。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              <strong>Apple・W3C・NN groupの3系列が一致</strong>しているのは、<strong>音は補助であり、音だけに頼らず、利用者が止められるようにする</strong>という点です(Google(M2)は音の作り方が中心で、音の代わりの手段についての記載は見当たりません)。Appleは字幕や触覚・視覚の手がかりの併用を求め、W3Cは自動で3秒を超えて鳴る音を止められることを求め、NN groupは効果音をオフにする設定を必ず用意するよう求めています。
            </p>
            <p style={styles.synthesisText}>
              違いが大きいのは、指針の重心です。Appleは<strong>消音モード・音量・出力先といった端末の設定に従う「鳴らし方」</strong>を詳しく定め、音の作り方にはほとんど触れません。反対に、Googleは<strong>音の種類・音色・旋律といった「作り方」</strong>を体系的にまとめていますが、これは<strong>Material Design 2(旧版)の指針で、M3には対応するページがありません</strong>。
            </p>
            <p style={styles.synthesisText}>
              「鳴らさない」判断も重要です。Googleは<strong>控えめさが求められる画面・割り込みを望まない利用者・頻繁な操作</strong>では音を使わないよう求め、Appleも消音モードでは利用者が始めた再生以外を止めます。NN groupは、言葉を使わない効果音(イヤコン)は<strong>意味が伝わりにくく、操作直後の確認か、繰り返し聞いて覚えた場合にしか伝わらない</strong>と指摘しています。
            </p>
            <p style={styles.synthesisText}>
              実務では、<strong>音は「頻繁なものほど控えめに・まれなものほど印象的に」作り、必ず視覚(と触覚)の手がかりと組にして、端末の消音・音量設定に従わせる</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 音を鳴らすときのルール</h2>
            <RuleMatrix />
            <p style={styles.chartNote}>◯=明記されている、△=部分的・条件付き、―=確認した範囲では記載なし。数値の基準を持つのはW3Cだけで、AppleはwatchOSの音声素材の書き出し形式(64 kbps HE-AAC)を示すのみです。</p>
          </div>

          <section style={styles.kindSection}>
            <h2 style={styles.diagramTitle}>音の種類と具体的なシーン</h2>
            <p style={styles.diagramNote}>Google(Material Design 2)の分類をもとに、それぞれの音が「どんな場面で・どのくらいの頻度で・どんな音で」鳴るのかを具体例で並べ、Appleでの扱いを添えました。優先度は、M2の「Sound choreography」の表(1が最も目立たせる音)です。</p>
            <SoundKindCatalog />
            <div style={styles.chartCard}>
              <h3 style={styles.subHead}>音の形(旋律)で意味を伝える</h3>
              <MelodyShapes />
              <p style={styles.chartNote}>Googleは、上がる旋律は開始・肯定、下がる旋律は終了、繰り返しは待機を表すのが一般的としています。スイッチのオン/オフのように対になる状態は、同じ音のモチーフを逆向きに鳴らすと「関係があるが反対の働き」だと伝わるとしています(M2 Sound attributes・Sound choreography)。</p>
            </div>
            <div style={styles.chartCard}>
              <h3 style={styles.subHead}>シーン別 ― 鳴らす?鳴らさない?</h3>
              <SceneDecisionTable />
              <p style={styles.chartNote}>◯=鳴らしてよい(条件を守って)、△=条件付き・基本は避ける、✕=鳴らさない。右の名前は根拠にした系列です。</p>
            </div>
          </section>

          <div className="dsp-mobile-only" style={styles.sourceList}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                </div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="鳴らす・鳴らさない基準" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="音の種類・作り方">{s.design}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                <div style={styles.sourceFootRow}>
                  {s.searchHint && (
                    <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                  )}
                  <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
                </div>
                {s.urlSecondary && (
                  <div style={styles.secondaryLinks}>
                    {s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{sl.label} ↗</a>
                    ))}
                  </div>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>サウンド デザインシステム比較</h2>
            <div style={styles.matrixScroll}>
              <div style={styles.matrixGrid}>
                <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>鳴らす・鳴らさない基準</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>音の種類・作り方</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.design}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
                <div style={styles.labelCell}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                    {s.confirmedNote && <span style={styles.confirmedNoteSmall}>{s.confirmedNote}</span>}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>参考 ― 音と組み合わせる触覚(ハプティクス)</h2>
            <div className="dsp-reduce-grid">
              {HAPTICS.map((r) => (
                <div key={r.name} style={styles.reduceCard}>
                  <div style={styles.sourceName}>{r.name}</div>
                  <div style={styles.reduceLead}>触覚の設計で共通する考え方</div>
                  <UseCaseList items={r.items} />
                </div>
              ))}
            </div>
            <p style={styles.chartNote}>AppleとGoogleはどちらも、音を単独で使うより、視覚・触覚と同時に設計してタイミングと印象をそろえることを勧めています。W3CとNN groupには触覚の指針はありません。</p>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎", "通知・状態表示"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Apple・W3C・NN groupは本文確認済み。GoogleはMaterial Design 2の音のページをページデータで本文確認、M3には対応ページなし)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Playing audioページの「Best practices」見出しへのアンカー付きリンクで、AccessibilityページのHearingとPlaying hapticsも併記しています。GoogleはM2の「Applying sound to UI」ページ(アンカーなし)と、関連するM2のページ・Androidの触覚の指針です。WCAGは1.4.2・1.4.7の各Understandingページの基準本文です。NN groupはイヤコン(言葉を使わない音)の節と、マルチメディアの指針の記事です。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  introBox: { border: "1px solid #E1E3F0", borderRadius: 8, padding: "16px 16px 14px", marginBottom: 22, background: "#FFFFFF" },
  introTitle: { fontSize: 15, fontWeight: 700, color: "#171B36", margin: "0 0 12px" },
  introCols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "6px 22px" },
  introHead: { fontSize: 11.5, fontWeight: 700, color: "#3C5A73", margin: "6px 0 8px", letterSpacing: 0.2 },
  introNote: { fontSize: 11, lineHeight: 1.6, color: "#7E86AC", margin: "6px 0 8px" },
  purposeRow: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 },
  purposeIcon: { width: 26, height: 26, flexShrink: 0, borderRadius: 13, background: "#EEF1FA", color: "#3C5A73", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" },
  purposeTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  purposeText: { fontSize: 11, lineHeight: 1.6, color: "#454C78" },
  ruleList: { margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 },
  ruleItem: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457" },
  ruleWho: { display: "inline-block", marginLeft: 6, fontSize: 9.5, color: "#7E86AC", border: "1px solid #E1E3F0", borderRadius: 3, padding: "0 4px" },
  sceneChips: { display: "flex", flexWrap: "wrap", gap: 6 },
  sceneChip: { fontSize: 11, color: "#2E3457", background: "#F3F6FA", borderRadius: 12, padding: "3px 10px" },
  kindSection: { marginBottom: 8 },
  subHead: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "0 0 10px" },
  kindGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 290px), 1fr))", gap: 10, marginBottom: 18 },
  kindCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 10px", background: "#FFFFFF" },
  kindName: { fontSize: 13.5, fontWeight: 700, color: "#171B36" },
  kindSub: { fontSize: 10.5, fontWeight: 400, color: "#565D8A", marginLeft: 6 },
  kindMeta: { display: "flex", gap: 10, fontSize: 10, color: "#7E86AC", marginTop: 3, alignItems: "center" },
  levelRow: { display: "inline-flex", gap: 2, marginLeft: 3, verticalAlign: "middle" },
  levelDot: { width: 7, height: 7, borderRadius: 4, display: "inline-block" },
  kindSpec: { fontSize: 11, color: "#2E3457", marginTop: 8, lineHeight: 1.7 },
  kindSpecK: { fontSize: 9.5, fontWeight: 700, color: "#FFFFFF", background: "#3C5A73", borderRadius: 3, padding: "0 5px", margin: "0 5px 0 0", display: "inline-block" },
  kindSceneHead: { fontSize: 10.5, fontWeight: 700, color: "#2F7D6E", marginTop: 8 },
  kindScenes: { margin: "3px 0 6px", paddingLeft: 16, fontSize: 11.5, lineHeight: 1.6, color: "#2E3457" },
  kindApple: { fontSize: 10.5, lineHeight: 1.55, color: "#454C78", borderTop: "1px dashed #E1E3F0", paddingTop: 6 },
  decList: { display: "flex", flexDirection: "column" },
  decRow: { display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0", borderBottom: "1px solid #EEF0F7" },
  decMark: { fontSize: 16, fontWeight: 700, width: 18, flexShrink: 0, lineHeight: 1.3 },
  decScene: { fontSize: 12, fontWeight: 600, color: "#171B36" },
  decWhy: { fontSize: 11, lineHeight: 1.55, color: "#454C78" },
  decWho: { marginLeft: 6, fontSize: 9.5, color: "#7E86AC" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6, textAlign: "left" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  reduceCard: { background: "#F8F9FD", borderRadius: 4, padding: "12px 14px" },
  reduceLead: { fontSize: 11, color: "#7E86AC", margin: "2px 0 8px" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  confirmedNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.5, fontStyle: "italic", marginTop: 4 },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#9EA4C4", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#7E86AC", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#7E86AC" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  secondaryLinks: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  ruleScroll: { overflowX: "auto" },
  ruleGrid: { display: "grid", gridTemplateColumns: "120px repeat(4, minmax(110px, 1fr))", minWidth: 560, border: "1px solid #E1E3F0", borderRadius: 4 },
  ruleHead: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#FFFFFF" },
  ruleLabel: { fontSize: 11, color: "#454C78", fontWeight: 600, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", lineHeight: 1.5 },
  ruleCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 2 },
  ruleMark: { fontSize: 15, fontWeight: 700, lineHeight: 1.1 },
  ruleNote: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5 },
};
