import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「入力方法・ジェスチャー」ページ。
 *
 * このページの発見: 4系列とも「見つけにくいジェスチャーを重要な操作の唯一の手段にしない」方向で考えている(WCAGの要件は2.5.1・2.5.7・2.5.4の範囲)。Appleは
 * 標準ジェスチャー7種の意味を全プラットフォームでそろえ、独自ジェスチャーは「発見しやすく・簡単で・
 * 区別でき・重要な操作の唯一の手段にしない」ものに限る。Google(Material Design 2)はジェスチャーを
 * ナビゲーション・アクション・変形の3種類に分け、指の動きに直接追従させることを重視する。W3Cは
 * 2本指・軌跡のあるジェスチャー(2.5.1)、ドラッグ(2.5.7)、端末を振る動き(2.5.4)のそれぞれに
 * 1本指のタップなどの代わりを求め、押した瞬間ではなく離したときに実行すること(2.5.2)を求める。
 * NN groupは、合図のないスワイプは見つけにくく、削除など破壊的な操作に限るべきだとする。
 * キーボードでの操作は「キーボードナビゲーション」ページで扱う。
 *
 * Apple(HIG Gestures・Pointing devices)はHIGのページデータ(JSON)を直接取得して確認(2026-10)。
 * Google(Gestures)はM3のページがSPAのため、Material Design 2のGesturesページのページデータ(JSON)と、
 * Android Developersの「Input compatibility on large screens」の本文で確認(2026-10)。
 * W3C(2.5.1・2.5.2・2.5.4・2.5.6・2.5.7)・NN group(Using Swipe to Trigger Contextual Actions)は
 * 本文を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Gestures / Pointing devices",
    color: "#C2542A",
    position: "標準ジェスチャーの意味を全プラットフォームでそろえ、声・キーボード・スイッチコントロールなど、ジェスチャー以外の入力でも操作できるようにする方式",
    size: "標準ジェスチャーは7種類: タップ(操作・選択)、スワイプ(操作を表示・画面を閉じる・スクロール)、ドラッグ(移動)、長押し(追加の操作を表示)、ダブルタップ(拡大・縮小)、ズーム(拡大)、回転。iOS・iPadOSにはさらに、3本指のスワイプ(取り消し・やり直し)、3本指のピンチ(コピー・ペースト)、4本指のスワイプ(iPadOSのアプリ切り替え)、振る(取り消し・やり直し)があります。",
    colorInfo: "ポインタ(マウス・トラックパッド)は、iPadではタッチの代わりではなく追加の手段です。iPadOSでは、ポインタが部品に近づくと形が変わり(highlight・lift・hoverの3つの効果)、部品に吸い寄せられる「磁力」で狙いやすくします。visionOSでは、見て狙い、指をタップして選ぶ「間接」のジェスチャーと、手で直接触れる「直接」のジェスチャーがあり、ボタンなどには間接を優先します。",
    stance:
      "ジェスチャーは期待どおりに反応させ、タップや戻るのような標準の操作に独自のジェスチャーを当てないよう求めています。独自のジェスチャーは、ゲームやお絵かきアプリのように頻繁で特殊な作業にだけ加え、「見つけやすい・簡単にできる・他と区別できる・重要な操作の唯一の手段にしない」ことを条件にしています。近道のジェスチャー(画面の端からのスワイプで戻るなど)は、標準の操作(戻るボタン)を置き換えず補うものだとしています(ページ本文を直接確認、2026-10)。",
    exceptions:
      "ゲームでは、ジョイスティックと発射ボタンのように複数のジェスチャーを同時に受け付けてもよいとしています。システムの操作に使うジェスチャー(watchOSの画面端のスワイプ、visionOSで手のひらを見る・手を返す動き)と衝突させないことを求めますが、没入型のゲームなどでは、システム側の反応を後回しにできます。",
    accessibility:
      "操作可能(Operable) ― 特定のジェスチャーができると決めつけず、声・キーボード・スイッチコントロールなど別の入力でも操作できるようにすることを求めています。visionOSでは、特定の体の動きや姿勢を求めない、片手だけでもできる代わりを用意する、特定の手(右手など)を指定しない、としています。",
    useCases: [
      "タップは操作・選択、スワイプは操作の表示や閉じる、など標準の意味で使う",
      "端からのスワイプで戻れても、戻るボタンは残す",
      "独自のジェスチャーは、重要な操作の唯一の手段にしない",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/gestures#Best-practices",
    urlSecondary: [
      { label: "Gestures ― Standard gestures(一覧表)", url: "https://developer.apple.com/design/human-interface-guidelines/gestures#Standard-gestures" },
      { label: "Gestures ― Custom gestures", url: "https://developer.apple.com/design/human-interface-guidelines/gestures#Custom-gestures" },
      { label: "Pointing devices ― Pointer shape and content effects", url: "https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Pointer-shape-and-content-effects" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・表・見出しアンカーを確認済み(2026-10)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design ― Gestures / Android: Input compatibility on large screens",
    color: "#2F7D6E",
    position: "ジェスチャーを「ナビゲーション・アクション・変形」の3種類に分け、指の動きに要素が直接ついてくることを重視する。大画面ではキーボード・マウス・スタイラスなどの入力への対応も求める",
    size: "ナビゲーションのジェスチャー: タップ、スクロール・パン、ドラッグ、スワイプ(タブの切り替えなど)、ピンチ(面を開閉)。アクションのジェスチャー: タップ、長押し(追加の機能)、スワイプ(リスト項目への操作)。変形のジェスチャー: ダブルタップ・ピンチ(拡大縮小)、複合ジェスチャー(拡大・回転・パンを続けて)、長押しで持ち上げて移動(カードの並べ替え)。",
    colorInfo: "大画面では、キーボード(Ctrl+Zで取り消し、Ctrl+Cでコピー、Ctrl+Sで保存、Tab・矢印キーでの移動、Enterで確定、スペースで再生・一時停止)、マウス(右クリックでコンテキストメニュー、ホバーでアイコンの変化、ホイールでスクロール)、スタイラス、ゲームコントローラーでの操作を確認するよう求めています。",
    stance:
      "ジェスチャーは、タッチで素早く直感的に操作するための「もう1つの方法」で、多少不正確でも使えるものとしています。要素は指の動きに直接ついてきて、ジェスチャーの速さと要素の動く速さを合わせ、ジェスチャーをきっかけに勝手にアニメーションを始めないこと、要素の見た目(シートの端がのぞく、カードが浮いている)でジェスチャーができることを示すことを求めています(Material Design 2のページデータとAndroid Developersの本文で確認、2026-10)。",
    exceptions:
      "長押しは追加の機能を出せますが、見つけにくいとしています。1つのジェスチャーで2つの異なる結果が起きる状況を避け、拡大・回転・パンの間を滑らかに切り替えられるようにすることを求めています。スワイプで操作を実行するときは、進み具合に合わせて図形を動かし、確定の境目を越えたことを示します。",
    accessibility:
      "―(確認したジェスチャーのページには、アクセシビリティの専用の記載は見当たりませんでした)。タッチを「もう1つの方法」と位置づけ、ボタンやナビゲーションの部品など明示的な操作を補うものとしている点は、W3Cの考え方と同じ方向です。押せる範囲の最小(48dp)は「ボタン」ページを参照。",
    useCases: [
      "ドラッグやスワイプでは、要素を指の動きに直接ついてこさせる",
      "シートの端をのぞかせるなど、見た目でジェスチャーができることを示す",
      "大画面では、右クリックのメニュー・ホバー・Ctrl系のショートカットにも対応する",
    ],
    searchHint: "",
    url: "https://m3.material.io/foundations/interaction/gestures",
    urlSecondary: [
      { label: "M2: Gestures", url: "https://m2.material.io/design/interaction/gestures.html" },
      { label: "Android: Input compatibility on large screens", url: "https://developer.android.com/develop/ui/compose/touch-input/input-compatibility-on-large-screens" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。ジェスチャーの分類と原則はMaterial Design 2のGesturesページのページデータ、大画面での入力はAndroid Developersの本文で直接確認(2026-10)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.5.1 Pointer Gestures / 2.5.2 Pointer Cancellation / 2.5.4 Motion Actuation / 2.5.7 Dragging Movements",
    color: "#A3821F",
    position: "ジェスチャーそのものは禁止せず、複雑なジェスチャー・ドラッグ・端末の動きのそれぞれに、1本指の簡単な操作などの代わりを用意することを求める",
    size: "2.5.1(レベルA): 2本指以上・軌跡のあるジェスチャーで行う機能は、1本指で軌跡のない操作(タップなど)でもできること。2.5.7(レベルAA): ドラッグで行う機能は、ドラッグなしの1本指の操作でもできること。2.5.4(レベルA): 端末を振る・傾けるなどの動きで行う機能は、画面上の部品でも操作でき、動きへの反応を無効にできること。2.5.2(レベルA): 押した瞬間ではなく離したときに実行し、途中でやめられる(または取り消せる)こと。",
    colorInfo: "2.5.6(レベルAAA)は、プラットフォームで使える入力手段(タッチ・マウス・キーボードなど)を、コンテンツ側で制限しないことを求めます。キーボードでの操作(2.1.1)とは別の基準で、マウスやタッチを使えても複雑な動きが難しい人のためのものです。",
    glossary: [
      { term: "2.5.1 Pointer Gestures・レベルA", desc: "ピンチなど2本指以上の操作や、なぞる軌跡で決まる操作に、1本指で軌跡のない代わりの操作を求める基準。" },
      { term: "2.5.2 Pointer Cancellation・レベルA", desc: "押した瞬間(ダウンイベント)では実行せず、離したとき(アップイベント)に実行して途中で中止できるようにすることなどを求める基準。" },
      { term: "2.5.4 Motion Actuation・レベルA", desc: "端末や体の動きで行う機能に、画面上の部品での代わりと、動きへの反応を切る手段を求める基準。" },
      { term: "2.5.7 Dragging Movements・レベルAA", desc: "ドラッグで行う機能に、ドラッグを使わない1本指の操作の代わりを求める基準(WCAG 2.2で追加)。" },
    ],
    stance:
      "複雑なジェスチャーやドラッグは、正確な動きが難しい人や、頭の動きで操作するポインタ・視線入力・声でマウスを動かす仕組みなどを使う人には、できないか非常に難しいためです。ドラッグの代わりの例として、スライダーのつまみを動かすだけでなく、溝をタップした位置へつまみを移せるようにする方法を挙げています。押した瞬間に実行しないのは、誤って触れたときに、指を部品の外へずらして離せば取り消せるようにするためです(Understandingページの本文を直接確認、2026-10)。",
    exceptions:
      "ジェスチャーや動きそのものが欠かせない場合は例外です。2.5.7は、ブラウザなどが決めていて制作者が変更していないドラッグも対象外です。2.5.4は、OSのアクセシビリティ機能のように支援された仕組みで動きを使う場合も例外です。2.5.2で、キーボードやテンキーの押下をまねる機能は、押した瞬間の実行が欠かせないものとして扱われます。",
    accessibility: "操作可能(Operable) ― いずれもガイドライン2.5(入力モダリティ)に属し、POURの「操作可能」です。キーボード以外の入力を使う人が、自分にできる動きで同じ機能を使えることを目的としています。",
    useCases: [
      "ピンチでの拡大には、+/−のボタンも用意する",
      "スライダーは、つまみのドラッグに加えて、溝をタップした位置へ移せるようにする",
      "ボタンは指を離したときに実行し、押したまま外へずらせば取り消せるようにする",
    ],
    searchHint: "single pointer",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html",
    urlSecondary: [
      { label: "2.5.2 Pointer Cancellation", url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html" },
      { label: "2.5.4 Motion Actuation", url: "https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html" },
      { label: "2.5.7 Dragging Movements", url: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html" },
    ],
    confirmedNote: "5つのUnderstandingページ(2.5.1・2.5.2・2.5.4・2.5.6・2.5.7)の本文を直接取得して確認済み(2026-10)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Using Swipe to Trigger Contextual Actions",
    color: "#7A4F7E",
    position: "ジェスチャーは画面に合図(シグニファイア)がないため見つけにくい、という観察に基づき、スワイプの使い方を絞る実務指針(適合基準ではない)",
    size: "数値基準ではなく原則としての言及です。リスト項目を横にスワイプして操作を出す「コンテキストスワイプ」について、合図がないためどこで使えるか分からない、アプリによって使えたり使えなかったりして覚えにくい、操作を出すと対象の内容が隠れる、といった問題を挙げています。",
    colorInfo: "同じジェスチャーに複数の意味を持たせる(左右の方向や項目の状態で操作が変わる)と、学びにくく思い出しにくくなるとしています。横のスワイプは、前の画面に戻る・隠れたメニューを出す・iPadで画面を分割するなどにも使われるため、取り違えて大事なメールを消してしまうような事故も起きうるとしています。",
    stance:
      "コンテキストスワイプは、削除など破壊的な操作に限るのがよいとしています。もともと削除のために生まれた操作で、「画面から払いのける」動きと「消す」の意味が結びついているためです。主要な操作をスワイプの奥に隠すと見つけてもらえません。操作の対象が見えるように内容を残し、破壊的な操作は確認するか、すぐ取り消せるようにすることを勧めています(記事本文を直接取得して確認、2026-10)。",
    exceptions:
      "確認を毎回求めると面倒な、繰り返しの多い操作では、確認の代わりに目立つ取り消しを用意すればよいとしています。スワイプを使うなら、アプリ内の他のスワイプ(画面の切り替えなど)と干渉しないようにします。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、ユーザビリティテストの観察に基づく設計上の根拠です。",
    useCases: [
      "コンテキストスワイプは、削除などの破壊的な操作に限る",
      "スワイプで削除したら、確認するか、目立つ取り消しを出す",
      "同じスワイプに、画面や状態によって違う意味を持たせない",
    ],
    searchHint: "Limit contextual swipe",
    url: "https://www.nngroup.com/articles/contextual-swipe/#toc-recommendations-for-using-contextual-swipe-1",
    confirmedNote: "記事本文を直接取得して確認済み(2026-10)。",
  },
];

/* ジェスチャーのアイコン(手の動きの概念図) */
function GestureIcon({ g, size = 44 }) {
  const c = "#3C5A73", f = "#D9E4F2";
  const dot = (x, y) => <circle cx={x} cy={y} r="5" fill={c} />;
  const arrow = (x1, y1, x2, y2) => (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d={`M${x2} ${y2} l${x1 < x2 ? -5 : x1 > x2 ? 5 : -4} ${y1 < y2 ? -5 : y1 > y2 ? 5 : -4} M${x2} ${y2} l${x1 < x2 ? -5 : x1 > x2 ? 5 : 4} ${y1 < y2 ? -5 : y1 > y2 ? 5 : 4}`} stroke={c} strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  );
  let body = null;
  if (g === "tap") body = <g><circle cx="22" cy="22" r="11" fill="none" stroke={c} strokeOpacity="0.35" strokeWidth="2" />{dot(22, 22)}</g>;
  if (g === "double") body = <g><circle cx="22" cy="22" r="9" fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="2" /><circle cx="22" cy="22" r="15" fill="none" stroke={c} strokeOpacity="0.25" strokeWidth="2" />{dot(22, 22)}</g>;
  if (g === "long") body = <g><circle cx="22" cy="22" r="13" fill="none" stroke="#E1E3F0" strokeWidth="3" /><path d="M22 9 a13 13 0 1 1 -12.4 17" fill="none" stroke={c} strokeWidth="3" />{dot(22, 22)}</g>;
  if (g === "swipe") body = <g>{dot(30, 22)}{arrow(28, 22, 8, 22)}</g>;
  if (g === "drag") body = <g><rect x="26" y="26" width="13" height="11" rx="2" fill={f} stroke={c} strokeDasharray="2 2" /><path d="M10 12 q8 2 12 14" stroke={c} strokeWidth="2" fill="none" strokeDasharray="3 2" />{dot(10, 12)}</g>;
  if (g === "pinch") body = <g>{dot(10, 34)}{dot(34, 10)}{arrow(12, 32, 18, 26)}{arrow(32, 12, 26, 18)}</g>;
  if (g === "rotate") body = <g>{dot(12, 22)}{dot(32, 22)}<path d="M8 13 a16 16 0 0 1 28 0" stroke={c} strokeWidth="2" fill="none" /><path d="M36 13 l-5 -1 M36 13 l1 -5" stroke={c} strokeWidth="2" /></g>;
  if (g === "shake") body = <g><rect x="15" y="8" width="14" height="26" rx="3" fill={f} stroke={c} strokeWidth="1.6" transform="rotate(-12 22 21)" /><path d="M6 14 q-3 7 0 14 M38 14 q3 7 0 14" stroke={c} strokeWidth="2" fill="none" /></g>;
  return <svg viewBox="0 0 44 44" width={size} height={size} aria-hidden="true">{body}</svg>;
}

function GestureSwatch() {
  const items = [["tap", "タップ"], ["double", "ダブルタップ"], ["long", "長押し"], ["swipe", "スワイプ"], ["drag", "ドラッグ"], ["pinch", "ピンチ"], ["rotate", "回転"], ["shake", "振る"]];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
      {items.map(([g, l]) => (
        <div key={g} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: 64 }}>
          <GestureIcon g={g} />
          <span style={{ fontSize: 10.5, color: "#454C78" }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

/* 四サイト比較図: ジェスチャーごとの意味と、求められる代わりの操作 */
const GESTURE_ROWS = [
  { g: "tap", name: "タップ", hig: "操作・選択(全プラットフォーム)", material: "ナビゲーション・アクション", wcag: "押した瞬間でなく、離したときに実行(2.5.2)", nn: "―" },
  { g: "double", name: "ダブルタップ", hig: "拡大・縮小。Apple Watchでは主な操作の実行", material: "変形(拡大、拡大段階の切り替え)", wcag: "―(1本指・軌跡なしの操作)", nn: "―" },
  { g: "long", name: "長押し", hig: "追加の操作・機能を表示", material: "追加のモード・機能。ただし見つけにくい", wcag: "―(1本指・軌跡なしの操作)", nn: "―" },
  { g: "swipe", name: "スワイプ", hig: "操作の表示・画面を閉じる・スクロール", material: "タブの切り替え・リスト項目への操作", wcag: "なぞる軌跡で決まる場合は、タップなどの代わりが必要(2.5.1)", nn: "合図がなく見つけにくい。削除など破壊的な操作に限る" },
  { g: "drag", name: "ドラッグ", hig: "要素の移動", material: "シートを引き出す・長押しで持ち上げて並べ替え", wcag: "ドラッグなしの1本指の代わりが必要(2.5.7・AA)", nn: "―" },
  { g: "pinch", name: "ピンチ", hig: "拡大(ズーム)", material: "拡大縮小・面を開閉", wcag: "2本指の操作には、1本指の代わりが必要(2.5.1)", nn: "―" },
  { g: "rotate", name: "回転", hig: "選んだ項目を回転", material: "変形(拡大・パンと滑らかに続けて)", wcag: "2本指の操作には、1本指の代わりが必要(2.5.1)", nn: "―" },
  { g: "shake", name: "振る・傾ける", hig: "振って取り消し・やり直し(iOS・iPadOS)", material: "―", wcag: "画面上の部品でも操作でき、動きへの反応を切れること(2.5.4)", nn: "―" },
];

function GestureChart() {
  const heads = [["Apple(よくある意味)", "#C2542A"], ["Google(分類・用途)", "#2F7D6E"], ["W3C(求める代わり)", "#A3821F"], ["NN group", "#7A4F7E"]];
  return (
    <div style={styles.gcScroll}>
      <div style={styles.gcGrid}>
        <div style={styles.gcHead}>ジェスチャー</div>
        {heads.map(([h, c]) => (<div key={h} style={{ ...styles.gcHead, color: c }}>{h}</div>))}
        {GESTURE_ROWS.map((r) => (
          <React.Fragment key={r.g}>
            <div style={styles.gcName}><GestureIcon g={r.g} size={34} /><span>{r.name}</span></div>
            {[r.hig, r.material, r.wcag, r.nn].map((t, i) => (
              <div key={i} style={{ ...styles.gcCell, ...(t === "―" || t.startsWith("―(") ? styles.gcMuted : {}) }}>{t}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ジェスチャーと、代わりの操作の組み合わせ例 */
const ALTERNATIVES = [
  { g: "swipe", from: "スワイプで削除", to: "編集ボタン → 削除ボタン/長押しのメニュー", who: "W3C 2.5.1・NN group" },
  { g: "pinch", from: "ピンチで拡大", to: "+ / − のボタン、ダブルタップ", who: "W3C 2.5.1" },
  { g: "drag", from: "ドラッグで並べ替え", to: "「上へ」「下へ」のボタン、移動先を選ぶメニュー", who: "W3C 2.5.7" },
  { g: "shake", from: "振って取り消し", to: "取り消しボタン。誤作動しないよう振る反応を切れる設定", who: "W3C 2.5.4" },
  { g: "swipe", from: "画面の端からスワイプして戻る", to: "上部のバーの戻るボタン(1回のタップで戻れる)", who: "Apple" },
];

function AlternativesList() {
  return (
    <div style={styles.altGrid}>
      {ALTERNATIVES.map((a) => (
        <div key={a.from} style={styles.altCard}>
          <div style={styles.altFrom}><GestureIcon g={a.g} size={30} /><span>{a.from}</span></div>
          <div style={styles.altArrow}>↓ 代わりの操作も用意する</div>
          <div style={styles.altTo}>{a.to}</div>
          <div style={styles.altWho}>{a.who}</div>
        </div>
      ))}
    </div>
  );
}

/* 押した瞬間ではなく、離したときに実行(W3C 2.5.2) */
function PointerCancelDiagram() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const step = (x, title, sub, ok) => (
    <g>
      <rect x={x} y="10" width="112" height="58" rx="6" fill="#FFFFFF" stroke="#D5D9EC" />
      <rect x={x + 18} y="22" width="76" height="24" rx="12" fill={ok === false ? "#EEF0F5" : "#3F51B5"} />
      <text x={x + 56} y="38" fontSize="9.5" fill={ok === false ? "#7E86AC" : "#FFFFFF"} textAnchor="middle" fontFamily={font}>送信</text>
      <text x={x + 56} y="84" fontSize="10" fill="#171B36" fontWeight="600" textAnchor="middle" fontFamily={font}>{title}</text>
      <text x={x + 56} y="98" fontSize="9" fill="#565D8A" textAnchor="middle" fontFamily={font}>{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 108" width="100%" style={{ maxWidth: 620, display: "block", margin: "0 auto" }} role="img" aria-label="押して、ずらして、離す操作の流れの図">
      {step(4, "① 押す", "まだ実行しない", true)}
      <circle cx="78" cy="34" r="6" fill="#171B36" opacity="0.6" />
      <text x="128" y="44" fontSize="14" fill="#9EA4C4" fontFamily={font}>→</text>
      {step(146, "② 離す", "ここで実行する", true)}
      <circle cx="202" cy="34" r="6" fill="#5A9629" />
      <text x="270" y="44" fontSize="11" fill="#9EA4C4" fontFamily={font}>または</text>
      {step(320, "②' 外へずらして離す", "実行しない(取り消し)", false)}
      <path d="M368 34 l38 -14" stroke="#C0503F" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="408" cy="19" r="6" fill="#C0503F" />
    </svg>
  );
}

/* 入力手段ごとの対応(Apple・Google) */
const INPUTS = [
  { k: "タッチ", hig: "標準ジェスチャー7種。iOS・iPadOSは3本指・4本指のジェスチャーも", material: "ナビゲーション・アクション・変形の3種類のジェスチャー" },
  { k: "マウス・トラックパッド", hig: "Macでは主な入力。iPadでは追加の手段。ポインタの形が変わる効果と、部品に吸い寄せられる磁力", material: "右クリックでコンテキストメニュー、ホバーでアイコンが変わる、ホイールでスクロール" },
  { k: "キーボード", hig: "フルキーボードアクセスで全部の操作に届く。標準ショートカットを流用しない", material: "Ctrl+Z・C・Sなど、Tab・矢印キーでの移動、Enterで確定" },
  { k: "ペン", hig: "Apple Pencilに専用のページがある(タッチとの組み合わせ)", material: "スタイラスでの操作を確認する" },
  { k: "視線・手(空間)", hig: "visionOS: 見て狙い、指をタップして選ぶ(間接)/手で直接触れる(直接)", material: "XR向けの指針がある(本ページでは扱わない)" },
  { k: "リモコン・コントローラー", hig: "tvOS: リモコンのスワイプでフォーカスを移動。ゲームコントローラー", material: "テレビのD-pad、車のロータリーコントローラー、ゲームコントローラー" },
  { k: "声・スイッチ", hig: "声・スイッチコントロールでも操作できるようにする(ジェスチャーを前提にしない)", material: "―(確認した資料には記載なし)" },
];

function InputTable() {
  return (
    <div style={styles.inList}>
      {INPUTS.map((r) => (
        <div key={r.k} style={styles.inRow}>
          <div style={styles.inKey}>{r.k}</div>
          <div style={styles.inCell}><span style={{ ...styles.inWho, color: "#C2542A" }}>Apple</span>{r.hig}</div>
          <div style={styles.inCell}><span style={{ ...styles.inWho, color: "#2F7D6E" }}>Google</span>{r.material}</div>
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

export default function TokensInputMethodsPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        .dsp-mobile-only { display: block; }
        .dsp-desktop-only { display: none; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
          .dsp-mobile-only { display: none; }
          .dsp-desktop-only { display: block; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/tokens/input-methods" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / インタラクション / 入力方法・ジェスチャー</span>
            <span>SPEC No. 053</span>
          </div>

          <h1 style={styles.title}>入力方法・ジェスチャー</h1>
          <p style={styles.subtitle}>4つのガイドラインが、タップ・スワイプ・ピンチなどのジェスチャーの意味と、マウス・ペン・視線などの入力手段、ジェスチャーが使えない人への代わりの操作をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>よく使われるジェスチャー(概念図)</span>
            <GestureSwatch />
            <p style={styles.swatchNote}>丸は指の位置、矢印は動かす方向です。タップや長押しは1本指で軌跡がない操作、スワイプ・ドラッグは軌跡がある操作、ピンチ・回転は2本指の操作、振るは端末そのものの動きで、W3Cはこの違いごとに求めることを変えています。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列とも、<strong>見つけにくいジェスチャーを重要な操作の唯一の手段にしない</strong>方向で考えています。ただし、決まりの強さは違います。Appleは独自のジェスチャーを「重要な操作の唯一の手段にしない」ことを勧め、Googleはジェスチャーを「もう1つの方法」と位置づけています(どちらも設計の勧め)。<strong>WCAGが要件として代わりの操作を求めるのは、複数の指や軌跡で決まるジェスチャー(2.5.1)、ドラッグ(2.5.7)、端末を動かす操作(2.5.4)</strong>で、タップや長押しのすべてに代わりを求めているわけではありません。
            </p>
            <p style={styles.synthesisText}>
              意味をそろえる点も共通です。Appleは<strong>標準ジェスチャー7種(タップ・スワイプ・ドラッグ・長押し・ダブルタップ・ズーム・回転)</strong>の意味を全プラットフォームで統一し、タップや戻るのような標準の操作に独自のジェスチャーを当てないよう求めています。Googleは<strong>1つのジェスチャーで2つの結果を起こさない</strong>こと、NN groupは<strong>同じスワイプに画面や状態で違う意味を持たせない</strong>ことを求めています。
            </p>
            <p style={styles.synthesisText}>
              見つけやすさの問題もはっきりしています。ジェスチャーには画面上の合図がないため、NN groupは<strong>スワイプを削除などの破壊的な操作に限り、確認か取り消しを用意する</strong>よう勧め、Googleも<strong>長押しは見つけにくい</strong>としたうえで、シートの端をのぞかせるなど<strong>見た目でジェスチャーができることを示す</strong>よう求めています。
            </p>
            <p style={styles.synthesisText}>
              実装の細部ではW3Cの<strong>2.5.2(押した瞬間ではなく離したときに実行し、外へずらせば取り消せる)</strong>が重要です。実務では、<strong>標準のジェスチャーを標準の意味で使い、複数の指・軌跡・ドラッグ・端末を動かす操作にはボタンなどの代わりを必ず用意し(WCAGの要件)、独自のジェスチャーは近道として足す</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― ジェスチャーごとの意味と、求められる代わりの操作</h2>
            <GestureChart />
            <p style={styles.chartNote}>Appleは標準ジェスチャーの表、GoogleはMaterial Design 2のジェスチャーの分類、W3Cは2.5系の達成基準、NN groupはコンテキストスワイプの記事によります。W3Cの「―(1本指・軌跡なしの操作)」は、2.5.1で代わりが求められる対象ではないことを示します(押した瞬間に実行しないことは2.5.2で全般に求められます)。</p>
          </div>

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
                <InfoBox label="ジェスチャーの種類と意味" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="入力手段の扱い">{s.colorInfo}</InfoBox>
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
            <h2 style={styles.diagramTitle}>入力方法・ジェスチャー デザインシステム比較</h2>
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
                <div style={styles.labelCell}>ジェスチャーの種類と意味</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>入力手段の扱い</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
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

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>ジェスチャーには、必ず代わりの操作を</h2>
            <p style={styles.diagramNote}>4系列とも、見つけにくいジェスチャーを重要な操作の唯一の手段にしない方向で考えています(WCAGの要件になるのは、複数の指・軌跡・ドラッグ・端末を動かす操作)。よくあるジェスチャーと、一緒に用意する代わりの操作の組み合わせ例です。</p>
            <AlternativesList />
          </section>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>押した瞬間ではなく、離したときに実行する(W3C 2.5.2)</h2>
            <PointerCancelDiagram />
            <p style={styles.chartNote}>押し間違えたとき、指を部品の外へずらしてから離せば取り消せます。押した瞬間に実行する場合は、取り消しの手段を用意するか、離したときに元に戻すことが求められます(キーボードの押下をまねる機能などは例外)。</p>
          </div>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>入力手段ごとの対応(Apple・Google)</h2>
            <p style={styles.diagramNote}>タッチ以外の入力も、AppleとGoogleはそれぞれ指針を持っています。キーボードでの移動の順番やフォーカスの見せ方は「キーボードナビゲーション」ページで詳しく扱います。</p>
            <InputTable />
          </section>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["操作方法(タッチ・キーボード)", "見つけやすさ・初めての案内"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。GoogleはM3のジェスチャーのページが未確認、Material Design 2のページデータとAndroid Developersの本文で確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Gesturesページの「Best practices」見出しへのアンカー付きリンクで、標準ジェスチャーの表・独自ジェスチャー・ポインタの効果の見出しも併記しています。GoogleはM3のGesturesページに加え、内容を確認したM2のGesturesページとAndroid Developersのページを併記しています。WCAGは2.5.1を基本リンクとし、2.5.2・2.5.4・2.5.7のUnderstandingページも併記しています。NN groupはコンテキストスワイプの記事の推奨事項の節です。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  subHead: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "0 0 10px" },
  ruleSection: { marginBottom: 26 },
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
  gcScroll: { overflowX: "auto" },
  gcGrid: { display: "grid", gridTemplateColumns: "104px repeat(4, minmax(130px, 1fr))", minWidth: 680, border: "1px solid #E1E3F0", borderRadius: 4 },
  gcHead: { fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", color: "#171B36" },
  gcName: { display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: "#171B36", padding: "6px 8px", borderBottom: "1px solid #E1E3F0" },
  gcCell: { fontSize: 10.5, lineHeight: 1.55, color: "#2E3457", padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", alignItems: "center" },
  gcMuted: { color: "#B7BCDA" },
  altGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: 10 },
  altCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  altFrom: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#171B36" },
  altArrow: { fontSize: 10, color: "#5A9629", margin: "6px 0 4px" },
  altTo: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", background: "#F3F6FA", borderRadius: 4, padding: "6px 8px" },
  altWho: { fontSize: 9.5, color: "#7E86AC", marginTop: 5 },
  inList: { display: "flex", flexDirection: "column", border: "1px solid #E1E3F0", borderRadius: 4 },
  inRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "4px 14px", padding: "9px 12px", borderBottom: "1px solid #EEF0F7" },
  inKey: { fontSize: 12, fontWeight: 700, color: "#171B36" },
  inCell: { fontSize: 11, lineHeight: 1.6, color: "#2E3457" },
  inWho: { display: "block", fontSize: 9.5, fontWeight: 700 },
};
