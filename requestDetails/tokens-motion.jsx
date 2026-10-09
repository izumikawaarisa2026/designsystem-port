import React, { useState } from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「モーション/アニメーション」ページ。
 *
 * このページの発見: アニメーションの長さをミリ秒で示すのはGoogleとNN groupだけで、
 * Googleは50〜1000msの16段階のトークン、NN groupは「多くは100〜500ms、単純なフィードバックは
 * 約100ms、500msで遅さを感じ始める」という目安を示す。Appleは数値を示さず「目的のある動きだけ・
 * 必ず省略できるように」という原則を中心に置き、W3Cは長さではなく「5秒を超える自動の動きを
 * 止められること」「1秒間に3回を超えて点滅しないこと」「操作で起きる動きを無効にできること」
 * という安全面の上限を定める。Apple・W3C(とNN group)は「動きだけで情報を伝えない・動きを減らせるようにする」
 * 方向では一致している。
 *
 * Apple(HIG Motion・Accessibility)はHIGのページデータ(JSON)を直接取得して確認済み(2026-09)。
 * Google(Motion)はMaterial Components for AndroidのMotion.mdと、Jetpack ComposeのMotionTokens.kt
 * で数値を直接確認(2026-09、m3.material.ioはSPAのため本文は未確認)。
 * W3C(2.3.3・2.2.2・2.3.1)・NN group(Executing UX Animations: Duration and Motion Characteristics、
 * Animation for Attention and Comprehension)は本文を直接取得して確認済み(2026-09)。
 *
 * 2026-10 追記: ユーザーから「もう少しわかりやすく比較できるよう図やイラストで直感的に」というフィードバックを受け、
 * 「図で見るモーション」セクション(長さの再生デモ・イージングの打点図・場面ごとの目安・W3Cの安全面の上限)と、
 * 動きを減らす設定での置き換えの図を追加した。数値は既存の確認済みの値のみを使用。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Motion / Accessibility",
    color: "#C2542A",
    position: "動きは目的があるときだけ加え、必ず省略できるようにする、という原則中心の指針。ミリ秒の数値は示さず、標準コンポーネントの動きに任せることを基本にする",
    size: "UIのアニメーションの長さ(ミリ秒)は示していません。フィードバックの動きは短く正確に、頻繁に起きる操作には動きを足さない、という質的な基準です。数値として示されるのは、ゲーム向けの「30〜60fpsを安定して保つ」と、visionOS向けの「0.2Hz前後でゆっくり揺れ続ける動きを避ける」の2つだけです。",
    easing: "利用者のジェスチャーや期待に沿った、現実的な動きを求めています(例: 上から引き出した画面を、横に払って閉じさせない)。watchOS(WatchKit)のレイアウト・外観のアニメーションには開始と終了のイージングが組み込まれていて、無効にも変更もできないとしています。SF Symbols 5以降では、シンボル自体にアニメーションを付けられます。",
    stance:
      "動きのための動きは加えず、体験を支える目的があるときだけ使うよう求めています。過剰なアニメーションは気を散らし、体の不快感につながることもあるためです。また、動きを見られない・見たくない人もいるため、動きだけで重要な情報を伝えず、触覚(ハプティクス)や音でも補うこと、アニメーションの完了を待たせず途中で取り消せるようにすることを挙げています(ページ本文を直接確認、2026-09)。",
    exceptions:
      "システムのコンポーネントは、入力方法に応じて動きを自動で調整します(例: Liquid Glassは指で直接触れると強く、トラックパッドでは控えめに反応)。visionOSでは、視野の端での動き・大きな仮想物体の移動・仮想世界の回転を避け、意味のない移動はフェードで消してから新しい位置に出し直すことを勧めています。",
    accessibility:
      "操作可能(Operable) ― 動きで体調を崩しやすい人のために「視差効果を減らす(Reduce Motion)」設定があり、有効なときは自動・反復のアニメーション(ズーム・拡大縮小・視野の端の動き)を減らすよう求めています。速い動きや点滅を多用すると、気が散るだけでなく、めまいや、場合によっては発作の原因になるとしています。",
    useCases: [
      "標準コンポーネントの動きを使い、独自の動きは目的があるときだけ足す",
      "動きだけで情報を伝えず、触覚や音でも補う",
      "Reduce Motionが有効なら、移動をフェードに置き換えるなどして動きを減らす",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/motion#Best-practices",
    urlSecondary: [
      { label: "Providing feedback", url: "https://developer.apple.com/design/human-interface-guidelines/motion#Providing-feedback" },
      { label: "Accessibility ― Cognitive(Reduce Motion)", url: "https://developer.apple.com/design/human-interface-guidelines/accessibility#Cognitive" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Motion(Easing and duration)",
    color: "#2F7D6E",
    position: "時間とイージングを「トークン」として数値で体系化。動く範囲が広いほど時間を長くする、という1つのルールで使い分ける。物理ベースの動き(スプリング)も用意",
    size: "50〜1000msの16段階のトークンがあります。Short 1〜4 = 50/100/150/200ms、Medium 1〜4 = 250/300/350/400ms、Long 1〜4 = 450/500/550/600ms、Extra long 1〜4 = 700/800/900/1000ms。アニメーションする面積や移動距離が大きいほど、長い時間を使うのが原則です。",
    easing: "イージングは7種類です。画面内で始まり画面内で終わる動きはStandard(cubic-bezier 0.2, 0, 0, 1)、画面に入る動きは減速(Decelerate)、出ていく動きは加速(Accelerate)を使い、M3らしい表現にはEmphasized系(入る: 0.05, 0.7, 0.1, 1/出る: 0.3, 0, 0.8, 0.15)を使います。ほかに装飾のない動き用のLinearがあります。スプリングは速さ3種(fast/default/slow)×種類2種(位置を動かすspatial/色や不透明度を変えるeffects)の6種類で、effectsは行き過ぎて跳ね返らない設定です。",
    stance:
      "動きを、色や形と同じようにテーマの属性として定義し、アプリ全体で動きの印象をそろえる考え方です。時間とイージングは組で使い、独自に時間を変更する場合も「範囲が広いほど長く」を守れば、画面遷移の速さの感覚が一貫するとしています(Material Components for Androidのドキュメントで直接確認、2026-09)。",
    exceptions:
      "画面遷移には4つの定型パターン(コンテナ変形・共有軸・フェードスルー・フェード)が用意されています。スプリングは、スイッチなど小さな部品にfast、全画面の遷移にslow、ボトムシートやナビゲーションドロワーのように画面の一部を覆うものにdefaultを使います。",
    accessibility:
      "操作可能(Operable) ― 今回確認したGoogle公式のドキュメント(Material Components for AndroidのMotion.md・トークン定義)には、動きを減らす設定への対応についての記載は見当たりませんでした。m3.material.ioの本文は未確認です。",
    useCases: [
      "小さな部品の状態変化はShort(50〜200ms)、全画面の遷移はLong以上",
      "入る動きは減速、出る動きは加速のイージングを使う",
      "色・不透明度の変化には、跳ね返らないeffectsのスプリングを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/motion/easing-and-duration/tokens-specs",
    urlSecondary: [
      { label: "MDC Android: Motion(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md" },
      { label: "Jetpack Compose: MotionTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/MotionTokens.kt" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。時間・イージング・スプリングの値は、Material Components for AndroidのドキュメントとJetpack Composeのトークン定義で直接確認(2026-09)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.3.3 Animation from Interactions / 2.2.2 Pause, Stop, Hide / 2.3.1 Three Flashes",
    color: "#A3821F",
    position: "動きの長さやイージングの基準はなく、「動きで人を傷つけない・気を散らさない」ための上限と、止める手段を求める",
    size: "時間の数値は2つです。自動で始まり、5秒より長く続き、他の内容と並んで表示される動き・点滅・スクロールには、一時停止・停止・非表示の手段を用意すること(2.2.2・レベルA)。どの1秒間にも3回を超えて点滅しないこと(2.3.1・レベルA、明るさや面積が閾値以下なら可)。",
    easing: "イージングや動きの作り方は定めていません。利用者の操作をきっかけに起きる動き(スクロールに連動して装飾が動く、視差スクロールなど)は、機能や情報に欠かせない場合を除き、無効にできることを求めています(2.3.3・レベルAAA)。満たし方として、不要な動きを使わない・動きを切る設定を用意する・OSやブラウザの「動きを減らす」設定(prefers-reduced-motion)に従う、の3つを挙げています。",
    glossary: [
      { term: "2.3.3 Animation from Interactions・レベルAAA", desc: "操作をきっかけに起きる動きを、欠かせない場合を除いて無効にできることを求める基準。" },
      { term: "2.2.2 Pause, Stop, Hide・レベルA", desc: "自動で始まり5秒を超えて続く動き・点滅・スクロール、自動更新される情報を、止めたり隠したりできることを求める基準。" },
      { term: "2.3.1 Three Flashes or Below Threshold・レベルA", desc: "1秒間に3回を超える点滅を含まないこと(または閾値以下であること)を求める基準。光過敏性発作を防ぐため。" },
      { term: "前庭障害(vestibular disorder)", desc: "内耳の平衡感覚に関わる障害。画面上の動きで、めまい・吐き気・頭痛などが起きることがある。" },
    ],
    stance:
      "前庭(内耳)障害のある人は、不要な動きでめまい・吐き気・頭痛を起こし、回復のために横になる必要があるほど重くなることもあるとしています。2.3.3は利用者の操作で始まる動き、2.2.2はページが自動で始める動きを対象とし、両方に違反する動きもありえます(Understandingページの本文を直接確認、2026-09)。",
    exceptions:
      "スクロールで新しい内容が画面に入ってくること自体は、スクロールに欠かせない動きで利用者が制御しているため許容されます。アニメーション制作ツールのプレビューのように、動きそのものが機能である場合も対象外です。2.3.3はレベルAAAで、多くのサイトが目標とするAAには含まれません。",
    accessibility: "操作可能(Operable) ― 2.2.2はガイドライン2.2(十分な時間)、2.3.1・2.3.3はガイドライン2.3(発作と身体的反応)に属し、いずれもPOURの「操作可能」です。",
    useCases: [
      "自動で動くカルーセルなどは、5秒を超えるなら停止ボタンを付ける",
      "prefers-reduced-motionが有効なら、装飾的な動きを止める",
      "1秒間に3回を超える点滅を使わない",
    ],
    searchHint: "reduce motion feature",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html#success-criterion",
    urlSecondary: [
      { label: "2.2.2 Pause, Stop, Hide", url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html#success-criterion" },
      { label: "2.3.1 Three Flashes or Below Threshold", url: "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html#success-criterion" },
    ],
    confirmedNote: "3つのUnderstandingページの本文を直接取得して確認済み(2026-09)。ページ内検索の語は2.3.3のページのものです。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Executing UX Animations: Duration and Motion Characteristics / Animation for Attention and Comprehension",
    color: "#7A4F7E",
    position: "ユーザビリティの観点から、具体的なミリ秒の目安を示す実務指針(適合基準ではない)",
    size: "多くのアニメーションは100〜500msの範囲で、複雑さと移動距離に応じて決めます。チェックボックスやトグルのような単純なフィードバックは約100ms、モーダルが現れるような大きな画面の変化は200〜300ms。500msに達すると利用者は遅さを負担に感じ始め、ほとんどの場合は100〜400ms(400msは大画面で大きく動く場合のみ)が適切としています。現れる動きは消える動きより少し長くします(例: 出現300ms・消去200〜250ms)。",
    easing: "一定速度の直線的な動きは不自然に見えるため、イージングを使います。最もよく使うのはease-out(速く始まり、減速して止まる)で、画面に入る要素に向きます。画面から出る要素にはease-in(加速して去る)を使います。仕様は動画ではなく、要素・きっかけ・変化する性質・時間(フレームではなくミリ秒)・イージングを書き込んだタイムラインで開発者に渡すよう勧めています。",
    stance:
      "アニメーションは10分の1秒の違いで印象が変わる領域で、短すぎるより長すぎる方がはるかに多いため、違和感のない範囲で最短の時間を探すよう勧めています。視野の端の動きは本能的に注意を奪うため、注意を引く必要がないときは、位置を動かさずにゆっくりフェードさせる方が邪魔になりにくいとしています(記事本文を直接取得して確認、2026-09)。",
    exceptions:
      "操作の結果として要素が現れるなど、因果関係を伝える動きは、操作から0.1秒以内に始まる必要があるとしています。1回の訪問で何度も出会う動き(メニューを開くたびの長い演出など)は、最初は良くても繰り返すと苛立ちの原因になると、ユーザーテストの観察から指摘しています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、知覚・注意の研究とユーザビリティテストに基づく設計上の根拠です。移動距離が大きい動きほど滑らかさが重要で、てんかんや前庭障害のある人など動きに敏感な人への配慮にもなるとしています。",
    useCases: [
      "チェックボックス・トグルのフィードバックは約100ms",
      "モーダルの出現は200〜300ms、消えるときは少し短く",
      "画面に入る要素はease-out、出る要素はease-in",
    ],
    searchHint: "rule of thumb",
    url: "https://www.nngroup.com/articles/animation-duration/#toc-animation-duration-3",
    urlSecondary: [{ label: "Animation for Attention and Comprehension(繰り返しの頻度)", url: "https://www.nngroup.com/articles/animation-usability/#toc-frequency-dont-get-in-the-users-way-3" }],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-09)。ページ内検索の語は1本目の記事(Duration and Motion Characteristics)のものです。",
  },
];

/* 画像エリア: イージングカーブ(横軸=時間、縦軸=進み具合) */
const CURVES = [
  { name: "Linear(0, 0, 1, 1)", p: [0, 0, 1, 1], color: "#B7BCDA", dash: "4 3" },
  { name: "Standard(0.2, 0, 0, 1)", p: [0.2, 0, 0, 1], color: "#3C5A73" },
  { name: "Emphasized decelerate(0.05, 0.7, 0.1, 1)", p: [0.05, 0.7, 0.1, 1], color: "#5A9629" },
  { name: "Standard accelerate(0.3, 0, 1, 1)", p: [0.3, 0, 1, 1], color: "#A6ACC9" },
];

function EasingCurves() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const x0 = 30, y0 = 130, w = 120, h = 110;
  const X = (t) => x0 + t * w;
  const Y = (v) => y0 - v * h;
  return (
    <svg viewBox="0 0 440 150" width="100%" style={{ maxWidth: 560, display: "block", margin: "0 auto" }} role="img" aria-label="イージングカーブの比較">
      <rect x={x0} y={Y(1)} width={w} height={h} fill="#FFFFFF" stroke="#E1E3F0" />
      {CURVES.map((c) => (
        <path key={c.name} d={`M ${X(0)} ${Y(0)} C ${X(c.p[0])} ${Y(c.p[1])}, ${X(c.p[2])} ${Y(c.p[3])}, ${X(1)} ${Y(1)}`} fill="none" stroke={c.color} strokeWidth="2" strokeDasharray={c.dash} />
      ))}
      <text x={x0 + w / 2} y={y0 + 14} fontSize="9" fill="#7E86AC" textAnchor="middle" fontFamily={font}>時間 →</text>
      <text x={x0 - 6} y={Y(0.5)} fontSize="9" fill="#7E86AC" textAnchor="middle" fontFamily={font} transform={`rotate(-90 ${x0 - 8} ${Y(0.5)})`}>進み具合 →</text>
      {CURVES.map((c, i) => (
        <g key={c.name}>
          <line x1="172" x2="192" y1={36 + i * 24} y2={36 + i * 24} stroke={c.color} strokeWidth="2" strokeDasharray={c.dash} />
          <text x="198" y={39 + i * 24} fontSize="9.5" fill="#454C78" fontFamily={font}>{c.name}</text>
        </g>
      ))}
    </svg>
  );
}

/* 四サイト比較図: 時間の目安(0〜1000ms)と、W3Cの安全面の上限 */
const GOOGLE_TOKENS = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 700, 800, 900, 1000];

function MotionChart() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const left = 96, right = 560;
  const X = (ms) => left + (ms / 1000) * (right - left);
  const groupLabels = [
    { label: "Short", from: 50, to: 200 },
    { label: "Medium", from: 250, to: 400 },
    { label: "Long", from: 450, to: 600 },
    { label: "Extra long", from: 700, to: 1000 },
  ];
  return (
    <svg viewBox="0 0 580 250" width="100%" style={{ maxWidth: 680, display: "block", margin: "0 auto" }} role="img" aria-label="アニメーションの時間の目安の比較図">
      {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((ms) => (
        <g key={ms}>
          <line x1={X(ms)} x2={X(ms)} y1="16" y2="128" stroke="#EEF0F7" />
          <text x={X(ms)} y="12" fontSize="8.5" fill="#9EA4C4" textAnchor="middle" fontFamily={mono}>{ms}</text>
        </g>
      ))}
      <text x={right + 2} y="24" fontSize="8.5" fill="#9EA4C4" fontFamily={mono}>ms</text>

      <text x="0" y="46" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Google</text>
      {GOOGLE_TOKENS.map((ms) => (
        <line key={ms} x1={X(ms)} x2={X(ms)} y1="34" y2="50" stroke="#2F7D6E" strokeWidth="2" />
      ))}
      {groupLabels.map((g) => (
        <text key={g.label} x={(X(g.from) + X(g.to)) / 2} y="62" fontSize="8.5" fill="#2F7D6E" textAnchor="middle" fontFamily={font}>{g.label}</text>
      ))}

      <text x="0" y="96" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>NN group</text>
      <rect x={X(0)} y="84" width={X(100) - X(0)} height="14" fill="#F4D6D6" />
      <rect x={X(100)} y="84" width={X(400) - X(100)} height="14" fill="#CFE8C4" />
      <rect x={X(400)} y="84" width={X(500) - X(400)} height="14" fill="#F6E6B4" />
      <rect x={X(500)} y="84" width={X(1000) - X(500)} height="14" fill="#F4D6D6" />
      <line x1={X(100)} x2={X(100)} y1="78" y2="104" stroke="#7A4F7E" strokeWidth="2" />
      <text x={X(100)} y="116" fontSize="8.5" fill="#7A4F7E" textAnchor="middle" fontFamily={font}>単純なフィードバック 約100</text>
      <line x1={X(200)} x2={X(300)} y1="76" y2="76" stroke="#7A4F7E" strokeWidth="3" />
      <text x={X(250)} y="72" fontSize="8.5" fill="#7A4F7E" textAnchor="middle" fontFamily={font}>モーダル 200〜300</text>
      <text x={X(750)} y="94.5" fontSize="8.5" fill="#8A3B3B" textAnchor="middle" fontFamily={font}>500〜 遅さが負担に</text>
      <text x={X(450)} y="116" fontSize="8.5" fill="#8A6A10" textAnchor="middle" fontFamily={font}>大きな移動のみ</text>

      <text x="0" y="158" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Apple</text>
      <text x={left} y="158" fontSize="9.5" fill="#454C78" fontFamily={font}>ミリ秒の基準なし ― 短く正確に・頻繁な操作には足さない・途中で取り消せるように</text>
      <text x="0" y="190" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>W3C</text>
      <text x={left} y="190" fontSize="9.5" fill="#454C78" fontFamily={font}>長さの基準なし ― 自動の動きが 5秒 を超えるなら止める手段(2.2.2)</text>
      <text x={left} y="206" fontSize="9.5" fill="#454C78" fontFamily={font}>点滅は 1秒間に3回 まで(2.3.1)・操作で起きる動きは無効にできる(2.3.3)</text>
      <rect x={left} y="226" width="12" height="9" fill="#CFE8C4" />
      <text x={left + 16} y="234" fontSize="8.5" fill="#7E86AC" fontFamily={font}>推奨</text>
      <rect x={left + 52} y="226" width="12" height="9" fill="#F6E6B4" />
      <text x={left + 68} y="234" fontSize="8.5" fill="#7E86AC" fontFamily={font}>条件付き</text>
      <rect x={left + 120} y="226" width="12" height="9" fill="#F4D6D6" />
      <text x={left + 136} y="234" fontSize="8.5" fill="#7E86AC" fontFamily={font}>非推奨(短すぎて見えない/長すぎる)</text>
    </svg>
  );
}

/* 動きを減らすときの置き換え方(Apple・W3C) */
const REDUCE_MOTION = [
  {
    name: "Apple",
    lead: "Reduce Motionが有効なときの、動きの減らし方の例",
    items: [
      "スプリングを固くして、跳ね返りを小さくする",
      "アニメーションを利用者のジェスチャーに直接追従させる",
      "奥行き(z軸)方向の変化をアニメーションさせない",
      "x・y・z軸方向の移動を、フェードに置き換える",
      "ぼかしの出入りをアニメーションさせない",
    ],
  },
  {
    name: "W3C",
    lead: "2.3.3を満たす方法(いずれか1つ)",
    items: [
      "不要なアニメーションを使わない",
      "操作で起きる装飾的な動きを切る設定を用意する",
      "OS・ブラウザの「動きを減らす」設定(prefers-reduced-motion)に従う",
    ],
  },
];

/* ---------- 図で見るモーション ---------- */

/* cubic-bezier(x1, y1, x2, y2) の時間 t における進み具合 */
function bezierAt(p, t) {
  const [x1, y1, x2, y2] = p;
  const f = (a, b, s) => 3 * a * s * (1 - s) * (1 - s) + 3 * b * s * s * (1 - s) + s * s * s;
  let lo = 0, hi = 1, s = t;
  for (let i = 0; i < 30; i++) {
    s = (lo + hi) / 2;
    if (f(x1, x2, s) < t) lo = s; else hi = s;
  }
  return f(y1, y2, s);
}

/* ① 長さの体感: ボタンを押すと、同じ距離を各ミリ秒で動かす */
const PLAY_ROWS = [
  { ms: 100, g: "Short 2", nn: "単純なフィードバック(トグル・チェック)", tone: "ok" },
  { ms: 200, g: "Short 4", nn: "推奨の範囲", tone: "ok" },
  { ms: 300, g: "Medium 2", nn: "モーダルの出現(200〜300)", tone: "ok" },
  { ms: 500, g: "Long 2", nn: "遅さが負担に感じ始める", tone: "warn" },
  { ms: 1000, g: "Extra long 4", nn: "500msを大きく超え、遅さが目立つ", tone: "ng" },
];
const PLAY_EASINGS = [
  { key: "standard", label: "Standard(画面内の移動)", css: "cubic-bezier(0.2, 0, 0, 1)" },
  { key: "decel", label: "Emphasized decelerate(入る)", css: "cubic-bezier(0.05, 0.7, 0.1, 1)" },
  { key: "linear", label: "Linear(一定速度)", css: "linear" },
];
const TONE = { ok: "#CFE8C4", warn: "#F6E6B4", ng: "#F4D6D6" };

function DurationPlayground() {
  const [on, setOn] = useState(false);
  const [ease, setEase] = useState("standard");
  const css = PLAY_EASINGS.find((e) => e.key === ease).css;
  return (
    <div>
      <div style={styles.playBar}>
        <button type="button" onClick={() => setOn((v) => !v)} style={styles.playBtn}>▶ 動かす(もう一度押すと戻る)</button>
        <div style={styles.playEaseRow}>
          {PLAY_EASINGS.map((e) => (
            <button key={e.key} type="button" onClick={() => setEase(e.key)} style={{ ...styles.easeChip, ...(ease === e.key ? styles.easeChipOn : {}) }}>{e.label}</button>
          ))}
        </div>
      </div>
      <div style={styles.playList}>
        {PLAY_ROWS.map((r) => (
          <div key={r.ms} style={styles.playRow}>
            <div style={styles.playMs}>{r.ms}<span style={{ fontSize: 10, color: "#7E86AC" }}>ms</span></div>
            <div style={{ ...styles.playTrack, background: TONE[r.tone] }}>
              <span style={{ ...styles.playDot, left: on ? "calc(100% - 22px)" : "4px", transition: `left ${r.ms}ms ${css}` }} />
            </div>
            <div style={styles.playMeta}>
              <span style={{ color: "#2F7D6E" }}>Google: {r.g}</span>
              <span style={{ color: "#7A4F7E" }}>NN group: {r.nn}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ② イージングのストロボ図: 同じ時間間隔(1/10ごと)で要素の位置を打点 */
const STROBE = [
  { name: "Linear", p: [0, 0, 1, 1], color: "#9EA4C4", who: "一定速度。機械的で不自然に見える(NN group)。Googleは装飾のない動き用" },
  { name: "減速(ease-out / Decelerate)", p: [0, 0, 0, 1], color: "#5A9629", who: "画面に「入る」動き。速く入って、ゆっくり止まる(Google・NN groupで一致)" },
  { name: "加速(ease-in / Accelerate)", p: [0.3, 0, 1, 1], color: "#C0503F", who: "画面から「出る」動き。ゆっくり動き出して、速く去る" },
  { name: "Standard(0.2, 0, 0, 1)", p: [0.2, 0, 0, 1], color: "#3C5A73", who: "画面内で始まり画面内で終わる動き(Google)" },
];

function EasingStrobe() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const x0 = 10, x1 = 300, rowH = 46;
  return (
    <div style={styles.strobeWrap}>
      {STROBE.map((s) => (
        <div key={s.name} style={styles.strobeRow}>
          <svg viewBox={`0 0 310 ${rowH - 14}`} width="100%" style={{ maxWidth: 420, display: "block" }} role="img" aria-label={`${s.name}の動きの打点図`}>
            <line x1={x0} x2={x1} y1="16" y2="16" stroke="#E1E3F0" strokeWidth="2" />
            {Array.from({ length: 11 }, (_, i) => {
              const v = bezierAt(s.p, i / 10);
              return <circle key={i} cx={x0 + v * (x1 - x0)} cy="16" r={i === 10 ? 7 : 5} fill={s.color} fillOpacity={0.25 + i * 0.07} />;
            })}
            <text x={x0} y="31" fontSize="8" fill="#9EA4C4" fontFamily={font}>開始</text>
            <text x={x1} y="31" fontSize="8" fill="#9EA4C4" textAnchor="end" fontFamily={font}>終了位置</text>
          </svg>
          <div style={{ minWidth: 0 }}>
            <div style={{ ...styles.strobeName, color: s.color }}>{s.name}</div>
            <div style={styles.strobeWho}>{s.who}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ③ 場面ごとの目安: 動く範囲が広いほど長く */
const SCENES = [
  { key: "toggle", label: "スイッチ・チェック", area: 1, google: "スプリング fast(小さな部品)", nn: "約100ms", apple: "標準の部品の動きに任せる。頻繁な操作に動きを足さない" },
  { key: "menu", label: "メニュー・ボトムシート・ドロワー", area: 2, google: "スプリング default(画面の一部を覆う)", nn: "大きめの画面の変化は200〜300ms(消えるときは少し短く)", apple: "上から出したものを横に払って閉じさせない(ジェスチャーと動きをそろえる)" },
  { key: "modal", label: "モーダル・ダイアログ", area: 2.5, google: "部品ごとの時間は未確認。原則は「範囲が広いほど長く」", nn: "出現300ms・消去200〜250msの例", apple: "途中で取り消せるようにし、完了を待たせない" },
  { key: "full", label: "全画面の遷移", area: 3, google: "スプリング slow(全画面)・定型の遷移パターン4種", nn: "最大400ms(大画面での大きな移動のみ)", apple: "Reduce Motion時は移動をフェードに置き換える" },
];

function SceneIcon({ k }) {
  const phone = <rect x="2" y="2" width="40" height="64" rx="6" fill="#FFFFFF" stroke="#B7BCDA" strokeWidth="1.4" />;
  return (
    <svg viewBox="0 0 44 68" width="44" height="68" aria-hidden="true">
      {phone}
      {k === "toggle" && (<g><rect x="12" y="29" width="20" height="11" rx="5.5" fill="#2F7D6E" /><circle cx="26.5" cy="34.5" r="4" fill="#FFFFFF" /></g>)}
      {k === "menu" && (<g><rect x="2" y="38" width="40" height="28" rx="6" fill="#D9E4F2" /><line x1="18" x2="26" y1="42" y2="42" stroke="#7E86AC" strokeWidth="1.6" strokeLinecap="round" /></g>)}
      {k === "modal" && (<g><rect x="2" y="2" width="40" height="64" rx="6" fill="#171B36" opacity="0.25" /><rect x="8" y="22" width="28" height="24" rx="4" fill="#FFFFFF" /></g>)}
      {k === "full" && (<g><rect x="2" y="2" width="40" height="64" rx="6" fill="#D9E4F2" /><path d="M30 34 L14 34 M19 29 L14 34 L19 39" stroke="#3C5A73" strokeWidth="1.6" fill="none" /></g>)}
    </svg>
  );
}

function SceneDurationMap() {
  return (
    <div style={styles.sceneGrid}>
      {SCENES.map((s) => (
        <div key={s.key} style={styles.sceneCard}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <SceneIcon k={s.key} />
            <div style={{ minWidth: 0 }}>
              <div style={styles.sceneLabel}>{s.label}</div>
              <div style={styles.sceneAreaBar}><span style={{ ...styles.sceneAreaFill, width: `${(s.area / 3) * 100}%` }} /></div>
              <div style={styles.sceneAreaNote}>動く範囲 {s.area <= 1 ? "小" : s.area < 3 ? "中" : "大"} → 長さも{s.area <= 1 ? "短く" : s.area < 3 ? "中くらい" : "長め"}</div>
            </div>
          </div>
          <div style={styles.sceneLine}><span style={{ ...styles.sceneWho, color: "#2F7D6E" }}>Google</span>{s.google}</div>
          <div style={styles.sceneLine}><span style={{ ...styles.sceneWho, color: "#7A4F7E" }}>NN group</span>{s.nn}</div>
          <div style={styles.sceneLine}><span style={{ ...styles.sceneWho, color: "#C2542A" }}>Apple</span>{s.apple}</div>
        </div>
      ))}
    </div>
  );
}

/* ④ 安全面の上限(W3C)を絵で示す */
function SafetyLimits() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  return (
    <div style={styles.safetyGrid}>
      <div style={styles.safetyCard}>
        <div style={styles.safetyTitle}>2.2.2 ― 5秒を超えて自動で動くもの</div>
        <svg viewBox="0 0 240 92" width="100%" style={{ display: "block", maxWidth: 300 }} role="img" aria-label="自動で動くカルーセルと停止ボタンの図">
          {[0, 1, 2].map((i) => <rect key={i} x={8 + i * 74} y="6" width="66" height="42" rx="5" fill={i === 1 ? "#D9E4F2" : "#EEF0F5"} />)}
          <circle cx="120" cy="58" r="2.5" fill="#B7BCDA" /><circle cx="130" cy="58" r="2.5" fill="#3C5A73" /><circle cx="140" cy="58" r="2.5" fill="#B7BCDA" />
          <rect x="184" y="52" width="48" height="14" rx="7" fill="#A3821F" />
          <text x="208" y="62" fontSize="8.5" fill="#FFFFFF" textAnchor="middle" fontFamily={font}>❚❚ 停止</text>
          <line x1="8" x2="232" y1="80" y2="80" stroke="#E1E3F0" strokeWidth="2" />
          <line x1="8" x2="98" y1="80" y2="80" stroke="#5A9629" strokeWidth="3" />
          <line x1="98" x2="232" y1="80" y2="80" stroke="#C0503F" strokeWidth="3" />
          <text x="98" y="90" fontSize="8" fill="#454C78" textAnchor="middle" fontFamily={mono}>5秒</text>
        </svg>
        <p style={styles.safetyText}>自動で始まり5秒を超えて続く動き(カルーセル・流れる文字など)には、一時停止・停止・非表示の手段が必要(レベルA)。</p>
      </div>
      <div style={styles.safetyCard}>
        <div style={styles.safetyTitle}>2.3.1 ― 1秒間に3回を超える点滅</div>
        <svg viewBox="0 0 240 92" width="100%" style={{ display: "block", maxWidth: 300 }} role="img" aria-label="1秒間の点滅回数の図">
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={8 + i * 28} y="10" width="22" height="22" rx="3" fill={i % 2 === 0 ? "#171B36" : "#F3F4F9"} stroke="#E1E3F0" />)}
          <text x="8" y="46" fontSize="8.5" fill="#C0503F" fontFamily={font}>✕ 1秒間に4回(3回を超える)</text>
          {Array.from({ length: 4 }, (_, i) => <rect key={i} x={8 + i * 56} y="54" width="22" height="22" rx="3" fill="#171B36" />)}
          <text x="8" y="88" fontSize="8.5" fill="#5A9629" fontFamily={font}>◯ 1秒間に3回以下</text>
        </svg>
        <p style={styles.safetyText}>光過敏性発作を防ぐための上限(レベルA)。点滅が小さく暗いなど、閾値以下なら例外。</p>
      </div>
      <div style={styles.safetyCard}>
        <div style={styles.safetyTitle}>2.3.3 ― 操作で起きる動きを切れる</div>
        <svg viewBox="0 0 240 92" width="100%" style={{ display: "block", maxWidth: 300 }} role="img" aria-label="視差スクロールと動きを減らす設定の図">
          <rect x="8" y="6" width="100" height="70" rx="5" fill="#EEF0F5" />
          <rect x="18" y="16" width="50" height="22" rx="3" fill="#D9E4F2" />
          <rect x="38" y="44" width="56" height="22" rx="3" fill="#B7BCDA" />
          <path d="M100 20 l0 40 M96 54 l4 6 l4 -6" stroke="#7E86AC" fill="none" />
          <text x="58" y="88" fontSize="8" fill="#454C78" textAnchor="middle" fontFamily={font}>スクロールで背景がずれる</text>
          <text x="124" y="44" fontSize="14" fill="#9EA4C4" fontFamily={font}>→</text>
          <rect x="146" y="6" width="86" height="70" rx="5" fill="#EEF0F5" />
          <rect x="156" y="16" width="66" height="22" rx="3" fill="#D9E4F2" />
          <rect x="156" y="44" width="66" height="22" rx="3" fill="#B7BCDA" />
          <text x="189" y="88" fontSize="8" fill="#454C78" textAnchor="middle" fontFamily={font}>reduced-motionで静止</text>
        </svg>
        <p style={styles.safetyText}>視差スクロールなど、操作をきっかけに起きる装飾的な動きは無効にできること(レベルAAA)。OSの「動きを減らす」設定に従うのが代表的な方法。</p>
      </div>
    </div>
  );
}

/* ⑤ Reduce Motionの置き換え(Apple): 移動 → フェード */
function ReduceMotionDiagram() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const frames = [0, 0.33, 0.66, 1];
  return (
    <svg viewBox="0 0 520 120" width="100%" style={{ maxWidth: 620, display: "block", margin: "0 auto 10px" }} role="img" aria-label="通常時のスライドと、動きを減らす設定でのフェードの比較図">
      <text x="0" y="14" fontSize="10" fill="#171B36" fontWeight="600" fontFamily={font}>通常: 横から滑り込む(位置が動く)</text>
      {frames.map((f, i) => (
        <g key={`a${i}`}>
          <rect x={4 + i * 64} y="22" width="54" height="34" rx="4" fill="#FFFFFF" stroke="#D5D9EC" />
          <rect x={4 + i * 64 + 54 - f * 46 - 4} y="26" width={f * 46} height="26" rx="3" fill="#3C5A73" opacity="0.7" />
        </g>
      ))}
      <text x="270" y="14" fontSize="10" fill="#171B36" fontWeight="600" fontFamily={font}>動きを減らす: その場でフェード</text>
      {frames.map((f, i) => (
        <g key={`b${i}`}>
          <rect x={270 + i * 64} y="22" width="54" height="34" rx="4" fill="#FFFFFF" stroke="#D5D9EC" />
          <rect x={274 + i * 64} y="26" width="46" height="26" rx="3" fill="#3C5A73" opacity={0.08 + f * 0.62} />
        </g>
      ))}
      <text x="0" y="76" fontSize="9" fill="#7E86AC" fontFamily={font}>時間 →</text>
      <text x="270" y="76" fontSize="9" fill="#7E86AC" fontFamily={font}>時間 →</text>
      <text x="0" y="100" fontSize="9.5" fill="#454C78" fontFamily={font}>大きな移動・ズーム・奥行き(z軸)の変化は、前庭(内耳)障害のある人にめまいや吐き気を起こすことがある。</text>
      <text x="0" y="114" fontSize="9.5" fill="#454C78" fontFamily={font}>位置を動かさず不透明度だけを変えると、変化は伝わったまま体への負担を減らせる(Apple・W3C)。</text>
    </svg>
  );
}

/* ---------- はじめに(概要) ----------
   2026-10: 「初見で何を見ればよいか分からない」というフィードバックを受け、サウンドのページにならって
   概要(目的・3つの観点・共通ルール)→ 比較(◯△―の一覧・時間の図)→ 詳細(図・系列ごとの表)の順に組み直した。
   目的・ルールの内容は、下のSOURCESで確認済みの記述から抜き出したもの。 */
const MOTION_PURPOSES = [
  { k: "feedback", title: "操作が伝わったことを示す", text: "スイッチが動く・ボタンが反応するなど、押した結果をすぐに見せる(Appleの「フィードバック」、NN groupの約100ms)" },
  { k: "relation", title: "画面どうしのつながりを示す", text: "どこから来て、どこへ戻るのかを動きで伝え、迷わせない(Googleの画面遷移パターン、Appleの「ジェスチャーと動きをそろえる」)" },
  { k: "attention", title: "必要なときだけ注意を向ける", text: "視野の端の動きは本能的に目を奪う。注意を引く必要がなければ、位置を動かさずにフェードさせる(NN group)" },
  { k: "brand", title: "アプリ全体の印象をそろえる", text: "動きを色や形と同じテーマの属性として決め、どの画面でも同じ速さの感覚にする(Google)" },
];

const MOTION_ASPECTS = [
  { k: "duration", title: "長さ(duration)", q: "何ミリ秒かけて動かすか", who: "数値で示すのはGoogle・NN groupだけ" },
  { k: "easing", title: "緩急(イージング)", q: "どう加速・減速させるか", who: "入る=減速・出る=加速でGoogle・NN groupが一致" },
  { k: "reduce", title: "減らす配慮", q: "動きが苦手な人にどう対応するか", who: "Apple・W3Cが明記。W3Cは安全面の上限も" },
];

const MOTION_RULES = [
  { k: "目的のある動きだけ", t: "動きのための動きは足さない。頻繁に行う操作には動きを付けない", who: "Apple・NN group" },
  { k: "短く、範囲に合わせる", t: "違和感のない範囲で最短に。動く範囲が広いほど長く(多くは100〜500ms)", who: "Google・NN group" },
  { k: "入る=減速・出る=加速", t: "画面に入る要素はゆっくり止まり、出ていく要素は加速して去る", who: "Google・NN group" },
  { k: "動きを減らせるように", t: "端末の「視差効果を減らす/動きを減らす」設定のときは、移動をフェードに置き換える", who: "Apple・W3C" },
  { k: "止められる・傷つけない", t: "5秒を超える自動の動きは止められるように。点滅は1秒間に3回まで", who: "W3C" },
];

/* 目的ごとの小さなイラスト(動きは CSS の keyframes。動きを減らす設定では止める) */
function PurposeIllust({ k }) {
  return (
    <svg viewBox="0 0 64 44" width="64" height="44" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="1" y="1" width="62" height="42" rx="6" fill="#F8F9FD" stroke="#E1E3F0" />
      {k === "feedback" && (
        <g>
          <rect x="18" y="15" width="28" height="14" rx="7" fill="#2F7D6E" />
          <circle className="mo-knob" cx="25" cy="22" r="5" fill="#FFFFFF" />
        </g>
      )}
      {k === "relation" && (
        <g>
          <rect x="8" y="9" width="20" height="26" rx="3" fill="#FFFFFF" stroke="#B7BCDA" />
          <rect className="mo-slide" x="36" y="9" width="20" height="26" rx="3" fill="#D9E4F2" stroke="#3C5A73" />
          <path d="M29 22 h5 M31 19 l3 3 l-3 3" stroke="#7E86AC" fill="none" strokeWidth="1.2" />
        </g>
      )}
      {k === "attention" && (
        <g>
          <rect x="8" y="10" width="34" height="4" rx="2" fill="#E1E3F0" />
          <rect x="8" y="18" width="28" height="4" rx="2" fill="#E1E3F0" />
          <rect x="8" y="26" width="31" height="4" rx="2" fill="#E1E3F0" />
          <circle className="mo-pulse" cx="51" cy="14" r="5" fill="#C0503F" />
        </g>
      )}
      {k === "brand" && (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} className="mo-sync" x={9 + i * 17} y="14" width="12" height="16" rx="3" fill={["#3C5A73", "#5A9629", "#A6ACC9"][i]} />
          ))}
        </g>
      )}
    </svg>
  );
}

/* 3つの観点のイラスト: 長さ=時計と線、緩急=カーブ、減らす=移動→フェード */
function AspectIllust({ k }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 120 64" width="100%" style={{ maxWidth: 180, display: "block", margin: "0 auto 6px" }} aria-hidden="true">
      {k === "duration" && (
        <g>
          <line x1="10" x2="110" y1="40" y2="40" stroke="#E1E3F0" strokeWidth="3" strokeLinecap="round" />
          <line x1="10" x2="48" y1="40" y2="40" stroke="#5A9629" strokeWidth="3" strokeLinecap="round" />
          <circle className="mo-run" cx="14" cy="40" r="6" fill="#3C5A73" />
          <text x="10" y="58" fontSize="8" fill="#7E86AC" fontFamily={font}>0ms</text>
          <text x="110" y="58" fontSize="8" fill="#7E86AC" textAnchor="end" fontFamily={font}>1000ms</text>
          <circle cx="60" cy="16" r="10" fill="#FFFFFF" stroke="#7E86AC" strokeWidth="1.4" />
          <path d="M60 10 v6 l4 3" stroke="#3C5A73" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>
      )}
      {k === "easing" && (
        <g>
          <rect x="34" y="4" width="52" height="46" fill="#FFFFFF" stroke="#E1E3F0" />
          <path d="M34 50 C 37 18, 39 4, 86 4" stroke="#5A9629" strokeWidth="2" fill="none" />
          <path d="M34 50 C 50 50, 86 50, 86 4" stroke="#C0503F" strokeWidth="2" fill="none" strokeDasharray="3 2" />
          <text x="60" y="60" fontSize="8" fill="#7E86AC" textAnchor="middle" fontFamily={font}>緑=入る(減速)・赤=出る(加速)</text>
        </g>
      )}
      {k === "reduce" && (
        <g>
          <rect x="6" y="10" width="44" height="32" rx="4" fill="#FFFFFF" stroke="#D5D9EC" />
          <rect className="mo-slide2" x="10" y="16" width="20" height="20" rx="3" fill="#3C5A73" opacity="0.7" />
          <path d="M54 26 h10 M60 22 l4 4 l-4 4" stroke="#7E86AC" fill="none" strokeWidth="1.4" />
          <rect x="70" y="10" width="44" height="32" rx="4" fill="#FFFFFF" stroke="#D5D9EC" />
          <rect className="mo-fade" x="82" y="16" width="20" height="20" rx="3" fill="#3C5A73" />
          <text x="28" y="56" fontSize="8" fill="#7E86AC" textAnchor="middle" fontFamily={font}>移動</text>
          <text x="92" y="56" fontSize="8" fill="#7E86AC" textAnchor="middle" fontFamily={font}>フェード</text>
        </g>
      )}
    </svg>
  );
}

function MotionIntro() {
  return (
    <section style={styles.introBox}>
      <h2 style={styles.introTitle}>はじめに ― UIでモーションを使う目的と、このページで比べる3つの観点</h2>
      <div style={styles.introHead}>目的(なぜ動かすか)</div>
      <div style={styles.purposeGrid}>
        {MOTION_PURPOSES.map((p) => (
          <div key={p.k} style={styles.purposeCard}>
            <PurposeIllust k={p.k} />
            <div style={{ minWidth: 0 }}>
              <div style={styles.purposeTitle}>{p.title}</div>
              <div style={styles.purposeText}>{p.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.introHead}>比べる観点(このページの読み方)</div>
      <div style={styles.aspectGrid}>
        {MOTION_ASPECTS.map((a, i) => (
          <div key={a.k} style={styles.aspectCard}>
            <AspectIllust k={a.k} />
            <div style={styles.aspectTitle}><span style={styles.aspectNum}>{i + 1}</span>{a.title}</div>
            <div style={styles.aspectQ}>{a.q}</div>
            <div style={styles.aspectWho}>{a.who}</div>
          </div>
        ))}
      </div>
      <div style={styles.introHead}>ルールの概要(4系列の共通点)</div>
      <ol style={styles.ruleList}>
        {MOTION_RULES.map((r) => (
          <li key={r.k} style={styles.ruleItem}>
            <strong>{r.k}</strong> ― {r.t}
            <span style={styles.ruleWho}>{r.who}</span>
          </li>
        ))}
      </ol>
      <div style={styles.pageFlow}>
        {["① 概要(この枠)", "② AI解釈と4サイト比較", "③ 図で詳しく見る", "④ 系列ごとの詳細表"].map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <span style={styles.pageFlowArrow}>→</span>}
            <span style={styles.pageFlowStep}>{s}</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* 四サイト比較: 何を定めているかを◯△―で一覧にする */
const MARK_COLORS = { "◯": "#2E6B3A", "△": "#8A6A10", "―": "#B7BCDA" };
const RULE_ROWS = [
  {
    label: "長さをミリ秒で示す",
    cells: [
      { mark: "―", note: "数値なし。短く正確に" },
      { mark: "◯", note: "50〜1000msの16段階" },
      { mark: "―", note: "長さの基準なし" },
      { mark: "◯", note: "多くは100〜500ms" },
    ],
  },
  {
    label: "イージングを指定",
    cells: [
      { mark: "△", note: "ジェスチャーに沿った現実的な動き(値なし)" },
      { mark: "◯", note: "7種類+スプリング6種類" },
      { mark: "―", note: "作り方は定めない" },
      { mark: "◯", note: "入る=ease-out・出る=ease-in" },
    ],
  },
  {
    label: "範囲・場面で長さを変える",
    cells: [
      { mark: "△", note: "頻繁な操作には足さない" },
      { mark: "◯", note: "範囲が広いほど長く" },
      { mark: "―", note: "" },
      { mark: "◯", note: "複雑さ・移動距離に応じて" },
    ],
  },
  {
    label: "動きを減らす設定に従う",
    cells: [
      { mark: "◯", note: "Reduce Motionで移動→フェード等" },
      { mark: "―", note: "確認した資料に記載なし" },
      { mark: "◯", note: "2.3.3(AAA)" },
      { mark: "△", note: "動きに敏感な人への配慮に言及" },
    ],
  },
  {
    label: "止める・取り消す手段",
    cells: [
      { mark: "◯", note: "完了を待たせず途中で取り消せる" },
      { mark: "―", note: "" },
      { mark: "◯", note: "5秒超の自動の動きは停止できる(2.2.2)" },
      { mark: "―", note: "" },
    ],
  },
  {
    label: "点滅・速い動きの上限",
    cells: [
      { mark: "△", note: "発作の原因になりうると注意(数値なし)" },
      { mark: "―", note: "" },
      { mark: "◯", note: "1秒間に3回まで(2.3.1)" },
      { mark: "―", note: "" },
    ],
  },
];

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

export default function TokensMotionPage() {
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
        @keyframes moKnob { 0%, 30% { transform: translateX(0); } 50%, 80% { transform: translateX(14px); } 100% { transform: translateX(0); } }
        @keyframes moSlide { 0% { transform: translateX(16px); opacity: 0; } 40%, 80% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(0); opacity: 0; } }
        @keyframes moPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes moSync { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes moRun { 0%, 15% { transform: translateX(0); } 55%, 85% { transform: translateX(34px); } 100% { transform: translateX(0); } }
        @keyframes moSlide2 { 0%, 15% { transform: translateX(0); } 55%, 85% { transform: translateX(16px); } 100% { transform: translateX(0); } }
        @keyframes moFade { 0%, 15% { opacity: 0.1; } 55%, 85% { opacity: 0.7; } 100% { opacity: 0.1; } }
        .mo-knob { animation: moKnob 2.4s cubic-bezier(0.2, 0, 0, 1) infinite; }
        .mo-slide { animation: moSlide 2.8s cubic-bezier(0.05, 0.7, 0.1, 1) infinite; }
        .mo-pulse { animation: moPulse 1.6s ease-in-out infinite; }
        .mo-sync { animation: moSync 1.8s cubic-bezier(0.2, 0, 0, 1) infinite; }
        .mo-run { animation: moRun 2.4s cubic-bezier(0.2, 0, 0, 1) infinite; }
        .mo-slide2 { animation: moSlide2 2.4s cubic-bezier(0.2, 0, 0, 1) infinite; }
        .mo-fade { animation: moFade 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mo-knob, .mo-slide, .mo-pulse, .mo-sync, .mo-run, .mo-slide2, .mo-fade { animation: none; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/tokens/motion" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / インタラクション / モーション</span>
            <span>SPEC No. 049</span>
          </div>

          <h1 style={styles.title}>モーション/アニメーション</h1>
          <p style={styles.subtitle}>4つのガイドラインが、アニメーションの長さ(duration)・動きの緩急(イージング)・動きを減らす配慮をどう定めているかを比較します</p>

          <MotionIntro />

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              アニメーションの長さをミリ秒で示しているのは、GoogleとNN groupだけです。Googleは<strong>50〜1000msの16段階</strong>のトークンを持ち、NN groupは<strong>多くは100〜500ms、単純なフィードバックは約100ms</strong>という目安を示します。両者を重ねると、<strong>小さな部品の反応は100〜200ms前後、画面の大きな変化は300ms前後</strong>が共通の目安になります。
            </p>
            <p style={styles.synthesisText}>
              使い分けのルールも似ています。Googleは<strong>「動く範囲が広いほど長く」</strong>、NN groupは<strong>「違和感のない範囲で最短に」「現れる動きは消える動きより少し長く」</strong>とし、イージングは両者とも<strong>入る動きは減速、出る動きは加速</strong>で一致しています。
            </p>
            <p style={styles.synthesisText}>
              Appleは数値を示さず、<strong>目的のある動きだけを使い、頻繁な操作には足さず、途中で取り消せるようにする</strong>という原則を重視します。W3Cは長さではなく安全面の上限として、<strong>5秒を超える自動の動きを止められること</strong>と<strong>1秒間に3回を超えて点滅しないこと</strong>を定めています。
            </p>
            <p style={styles.synthesisText}>
              <strong>動きだけで情報を伝えず、動きを減らせるようにする</strong>ことは、<strong>AppleとW3Cが明記し、NN groupも配慮に触れています</strong>(Googleは確認した資料に記載がありません)。Appleは端末のReduce Motion設定への対応を求め、W3Cは操作で起きる装飾的な動きを無効にできること(AAA)を求めています。実務では、<strong>トークンで長さをそろえたうえで、「動きを減らす」設定のときはフェードに置き換える</strong>、という組み合わせが各系列の考え方を満たします。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 何を定めているか</h2>
            <RuleMatrix />
            <p style={styles.chartNote}>◯=明記されている、△=部分的・条件付き、―=確認した範囲では記載なし。数値で長さを示すのはGoogleとNN groupだけで、W3Cは長さではなく安全面の上限(5秒・1秒間に3回)を定めています。</p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― アニメーションの時間の目安</h2>
            <MotionChart />
            <p style={styles.chartNote}>横軸は0〜1000ms。Googleの縦線は16段階の時間トークン、NN groupの帯は記事の目安(100〜400msが適切、400〜500msは大画面での大きな移動のみ、500ms以上は遅さが負担に)を色分けしたものです。100ms未満は「動きとして知覚できる下限」を下回るため非推奨の色にしています。</p>
          </div>

          <section style={styles.figSection}>
            <h2 style={styles.diagramTitle}>図で詳しく見る ― 長さ・緩急・場面・安全面</h2>
            <p style={styles.diagramNote}>「はじめに」の3つの観点(長さ・緩急・減らす配慮)を、実際に動かしたり、時間ごとの位置を打点したりして確かめます。①長さ → ②緩急 → ③場面ごとの使い分け → ④安全面の上限 の順です。</p>

            <div style={styles.chartCard}>
              <h3 style={styles.figTitle}>① 長さの体感 ― 同じ距離を、違う時間で動かす</h3>
              <DurationPlayground />
              <p style={styles.chartNote}>帯の色はNN groupの目安(緑=推奨、黄=条件付き、赤=非推奨)。右はGoogleの時間トークンのうち、その長さに当たるもの。端末で「視差効果を減らす/動きを減らす」を有効にしている場合も、確認用にそのまま動かしています。</p>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.figTitle}>② 緩急(イージング)の違い ― 同じ時間間隔で位置を打点</h3>
              <EasingCurves />
              <p style={styles.chartNote}>上はイージングカーブ(横軸=時間、縦軸=進み具合)。曲線が早く立ち上がるほど、動き始めが速く、止まる直前にゆっくりになります。数値はGoogleのトークン(cubic-bezier)。下は同じ動きを打点で見たものです。</p>
              <div style={{ height: 12 }} />
              <EasingStrobe />
              <p style={styles.chartNote}>点は時間を10等分した各瞬間の位置です。点の間隔が広いところは速く、狭いところはゆっくり動いています。「入る動きは減速、出る動きは加速」はGoogleとNN groupで一致しています。</p>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.figTitle}>③ 場面ごとの目安 ― 動く範囲が広いほど長く</h3>
              <SceneDurationMap />
              <p style={styles.chartNote}>Googleのスプリング(fast/default/slow)の使い分けはMaterial Components for Androidのドキュメント、NN groupの値は記事の目安です。Appleは場面ごとの数値を示さないため、該当する原則を載せています。</p>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.figTitle}>④ 安全面の上限(W3C)</h3>
              <SafetyLimits />
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
                <InfoBox label="時間(duration)の基準" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="イージング・動きの作り方">{s.easing}</InfoBox>
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
            <h2 style={styles.diagramTitle}>モーション デザインシステム比較(系列ごとの詳細)</h2>
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
                <div style={styles.labelCell}>時間(duration)の基準</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>イージング・動きの作り方</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.easing}</div>))}
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
            <h2 style={styles.diagramTitle}>動きを減らすときの置き換え方(Apple・W3C)</h2>
            <ReduceMotionDiagram />
            <div className="dsp-reduce-grid">
              {REDUCE_MOTION.map((r) => (
                <div key={r.name} style={styles.reduceCard}>
                  <div style={styles.sourceName}>{r.name}</div>
                  <div style={styles.reduceLead}>{r.lead}</div>
                  <UseCaseList items={r.items} />
                </div>
              ))}
            </div>
            <p style={styles.chartNote}>Googleは今回確認した公式ドキュメントに該当する記載がなく、NN groupは長さの目安の中で「動きに敏感な人ほど滑らかさが重要」と触れるにとどまるため、この2系列のみを並べています。</p>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、数値はGoogle公式のドキュメント・トークン定義で確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Motionページの「Best practices」見出しへのアンカー付きリンクで、Reduce Motionを扱うAccessibilityページの「Cognitive」見出しも併記しています。GoogleはM3のトークンのページに加え、数値を確認したGitHub上の公式ドキュメント・トークン定義を併記しています。WCAGは2.3.3・2.2.2・2.3.1の各Understandingページの基準本文です。NN groupは時間の目安の節と、繰り返しの頻度の節です。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  introBox: { border: "1px solid #E1E3F0", borderRadius: 8, padding: "16px 16px 14px", marginBottom: 22, background: "#FFFFFF" },
  introTitle: { fontSize: 15, fontWeight: 700, color: "#171B36", margin: "0 0 12px" },
  introHead: { fontSize: 11.5, fontWeight: 700, color: "#3C5A73", margin: "12px 0 8px", letterSpacing: 0.2 },
  purposeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 8 },
  purposeCard: { display: "flex", gap: 10, alignItems: "flex-start" },
  purposeTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  purposeText: { fontSize: 11, lineHeight: 1.6, color: "#454C78" },
  aspectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 8 },
  aspectCard: { background: "#F8F9FD", borderRadius: 6, padding: "10px 12px" },
  aspectTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36", display: "flex", alignItems: "center", gap: 6 },
  aspectNum: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 9, background: "#3C5A73", color: "#FFFFFF", fontSize: 10.5, fontFamily: "'IBM Plex Mono', monospace" },
  aspectQ: { fontSize: 11, color: "#454C78", marginTop: 2 },
  aspectWho: { fontSize: 10.5, color: "#7E86AC", marginTop: 4, lineHeight: 1.5 },
  ruleList: { margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 },
  ruleItem: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457" },
  ruleWho: { display: "inline-block", marginLeft: 6, fontSize: 9.5, color: "#7E86AC", border: "1px solid #E1E3F0", borderRadius: 3, padding: "0 4px" },
  pageFlow: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginTop: 14, paddingTop: 10, borderTop: "1px dashed #E1E3F0" },
  pageFlowStep: { fontSize: 10.5, color: "#2E3457", background: "#F3F6FA", borderRadius: 12, padding: "3px 10px" },
  pageFlowArrow: { fontSize: 10.5, color: "#9EA4C4" },
  ruleScroll: { overflowX: "auto" },
  ruleGrid: { display: "grid", gridTemplateColumns: "120px repeat(4, minmax(110px, 1fr))", minWidth: 560, border: "1px solid #E1E3F0", borderRadius: 4 },
  ruleHead: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#FFFFFF" },
  ruleLabel: { fontSize: 11, color: "#454C78", fontWeight: 600, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", lineHeight: 1.5 },
  ruleCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 2 },
  ruleMark: { fontSize: 15, fontWeight: 700, lineHeight: 1.1 },
  ruleNote: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5 },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  figSection: { marginBottom: 8 },
  figTitle: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "0 0 10px" },
  playBar: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 10 },
  playBtn: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, color: "#FFFFFF", background: "#3C5A73", border: "none", borderRadius: 16, padding: "7px 14px", cursor: "pointer" },
  playEaseRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  easeChip: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 10.5, color: "#454C78", background: "#FFFFFF", border: "1px solid #D5D9EC", borderRadius: 12, padding: "4px 9px", cursor: "pointer" },
  easeChipOn: { background: "#EEF1FA", borderColor: "#3C5A73", color: "#171B36", fontWeight: 700 },
  playList: { display: "flex", flexDirection: "column", gap: 8 },
  playRow: { display: "grid", gridTemplateColumns: "56px minmax(0, 1fr)", gap: "4px 10px", alignItems: "center" },
  playMs: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: "#171B36" },
  playTrack: { position: "relative", height: 26, borderRadius: 13 },
  playDot: { position: "absolute", top: 4, width: 18, height: 18, borderRadius: 9, background: "#3C5A73" },
  playMeta: { gridColumn: "2", display: "flex", flexWrap: "wrap", gap: "0 12px", fontSize: 10.5, lineHeight: 1.5 },
  strobeWrap: { display: "flex", flexDirection: "column", gap: 10 },
  strobeRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "4px 14px", alignItems: "center", borderBottom: "1px dashed #E1E3F0", paddingBottom: 8 },
  strobeName: { fontSize: 12, fontWeight: 700 },
  strobeWho: { fontSize: 11, lineHeight: 1.55, color: "#454C78" },
  sceneGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 210px), 1fr))", gap: 10 },
  sceneCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  sceneLabel: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  sceneAreaBar: { height: 6, borderRadius: 3, background: "#EEF0F5", margin: "5px 0 3px", width: 110 },
  sceneAreaFill: { display: "block", height: 6, borderRadius: 3, background: "#3C5A73" },
  sceneAreaNote: { fontSize: 10, color: "#7E86AC" },
  sceneLine: { fontSize: 11, lineHeight: 1.55, color: "#2E3457", marginTop: 6 },
  sceneWho: { display: "block", fontSize: 10, fontWeight: 700 },
  safetyGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))", gap: 10 },
  safetyCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  safetyTitle: { fontSize: 12, fontWeight: 700, color: "#A3821F", marginBottom: 6 },
  safetyText: { fontSize: 11, lineHeight: 1.6, color: "#454C78", margin: "6px 0 0" },
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
};
