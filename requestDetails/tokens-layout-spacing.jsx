import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList } from "./page-parts";

/**
 * トークン/ファウンデーションレイヤー「レイアウト・スペーシング(余白・グリッド)」ページ。
 *
 * このページの発見: Apple・Googleはどちらも「端末の種類ではなく、実際に使える画面の広さで
 * レイアウトを切り替える」という同じ原則を明言している(Appleのサイズクラス、Googleの
 * ウィンドウサイズクラス)。ただしGoogleが境界値(600/840/1200/1600dp)を数値で公開して
 * いるのに対し、Appleはcompact/regularの2区分をシステムが判定し、HIGでは境界値を
 * 公開していない。余白についても、Appleは数値の刻み(スペーシングスケール)を持たず
 * システムのマージン・セーフエリアに任せる方式で、固定値はtvOSのセーフエリア(上下60pt・
 * 左右80pt)など一部に限られる。
 *
 * Apple(HIG Layout)はHIGのページデータ(JSON)を直接取得して確認済み(2026-09)。
 * Googleはウィンドウサイズクラスの境界値をAndroid Developersの本文、ペイン間の間隔
 * (24dp)をJetpack Composeのソースで直接確認。4dpグリッド・画面端のマージンの値は
 * m3.material.io(SPA)の検索結果による間接確認(2026-09)。W3C(1.4.10/2.5.8/1.3.1)・
 * Nielsen Norman Group(Proximity Principle in Visual Design)は本文を直接取得して確認済み(2026-09)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Layout",
    color: "#C2542A",
    position: "余白の刻みは定めず、システムのマージンとセーフエリアに従う。画面の広さはサイズクラス(compact/regular)で判断する",
    size: <><NoData>iOS/iPadOSは数値なし</NoData>(<Hl>システムのマージンに任せる</Hl>)。watchOSは1行のボタンをアイコン3つ・文字2つまで。</>,
    colorInfo: <>サイズクラスは横・縦それぞれcompactかregularで、システムが決める(境界値の記載なし)。<Hl>端末の種類や向きではなくサイズクラスで</Hl>切り替え、使える機能は変えない。</>,
    structure: "関連する項目は、余白・容器の形・区切り線でまとめる。",
    stance:
      <>重要なものを上・行の始まり側に置き、揃えと字下げで階層を表す。文字が大きくなったら、横並びを縦に積み直して切れや重なりを防ぐ。</>,
    exceptions:
      "向きを固定するアプリでも、端末やウィンドウの大きさの違いには対応する。",
    accessibility:
      "知覚可能 ― 文字の拡大で組み替えるのは、WCAG 1.4.10・1.4.4と同じ目的。",
    useCases: [
      "余白は独自の数値ではなく、システムのマージンを使う",
      "文字を最大にしたら横並びを縦積みに変える",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes",
    refs: [
      { label: "Layout", url: "https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes" },
      { label: "Visual hierarchy", url: "https://developer.apple.com/design/human-interface-guidelines/layout#Visual-hierarchy" },
      { label: "Guides and safe areas", url: "https://developer.apple.com/design/human-interface-guidelines/layout#Guides-and-safe-areas" },
      { label: "Split views", url: "https://developer.apple.com/design/human-interface-guidelines/split-views" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・数値表・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Layout / Window size classes",
    color: "#2F7D6E",
    position: "使える幅を5段階のウィンドウサイズクラスに分け、区分ごとにレイアウト(1ペイン/2ペインなど)を切り替える",
    size: <><Hl>画面端16dp(Compact)・24dp(それ以外)、ペインの間24dp</Hl>。幅の決まったペインはExpanded 360dp・Large以上412dp(上の図)。</>,
    colorInfo: <>幅の境界は<Hl>600・840・1200・1600dp</Hl>(上の比較図)。高さがCompact(480dp未満)なら、幅がMediumでも2ペインは避ける。</>,
    structure: "線・区切り線・影で囲む明示的なまとめ方と、近さと空きで示す暗黙のまとめ方がある。",
    stance:
      <>サイズクラスはアプリが実際に使えるウィンドウの大きさで決まり、分割画面や折りたたみで変わる。<Hl>「タブレットかどうか」の判定には使わない</Hl>。</>,
    exceptions:
      "Large・Extra-largeは、デスクトップや外部ディスプレイのために後から加えた区分。",
    accessibility:
      "知覚可能 ― 狭い幅で1ペインに切り替えると、WCAG 1.4.10(リフロー)を満たしやすい。",
    useCases: [
      "Medium幅以上では2ペイン(一覧+詳細)を検討する",
    ],
    searchHint: "",
    url: "https://m3.material.io/foundations/layout/breakpoints/overview",
    refs: [
      { label: "Breakpoints(Window size classes)", url: "https://m3.material.io/foundations/layout/breakpoints/overview" },
      { label: "Panes", url: "https://m3.material.io/foundations/layout/scaffold/panes" },
      { label: "Canonical layout examples", url: "https://m3.material.io/foundations/layout/canonical-examples/overview" },
      { label: "Spacing", url: "https://m3.material.io/foundations/layout/grids-spacing/spacing" },
      { label: "Use window size classes(Android Developers)", url: "https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes" },
      { label: "Compose adaptive: PaneScaffoldDirective(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/adaptive/adaptive-layout/src/commonMain/kotlin/androidx/compose/material3/adaptive/layout/PaneScaffoldDirective.kt" },
    ],
    confirmedNote: "ウィンドウサイズクラスはAndroid Developersの本文、ペイン間24dpはJetpack Composeのソースで直接確認(2026-09)。マージン16/24dp・固定ペイン360/412dpはM3 Breakpoints・Panesの本文で確認(2026-11)。4dpのグリッドは未確認。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.10 Reflow / 2.5.8 Target Size (Minimum) / 1.3.1 Info and Relationships",
    color: "#A3821F",
    position: "余白やグリッドの値は定めず、狭い幅でも読めること・押す対象の間隔・まとまりを構造でも伝えることを求める",
    size: <><Hl>幅320 CSS pxでも2方向のスクロールなしで読める</Hl>こと(1.4.10・AA。1280pxを400%に拡大した幅)。押す対象は24×24 CSS px以上か、中心どうしを24px以上離す(2.5.8・AA、例外あり)。</>,
    colorInfo: <NoData>幅ごとの決まりはない</NoData>,
    structure: <>1.3.1(A): <Hl>余白でまとめたグループは、構造でも支援技術に伝える</Hl>(余白だけでは読み上げで伝わらない)。</>,
    glossary: [
      { term: "1.4.10 Reflow・レベルAA", desc: "幅320 CSSピクセル相当まで狭めても、縦横両方向のスクロールなしで読めること。地図・図表・データ表など2次元の配置が要る部分は例外。" },
      { term: "2.5.8 Target Size (Minimum)・レベルAA", desc: "押す対象を24×24 CSSピクセル以上にするか、小さいなら周りに十分な間隔を取ること。文中のリンクなどは例外。" },
      { term: "1.3.1 Info and Relationships・レベルA", desc: "見た目で表している構造や関係を、見出し・リスト・グループなどのマークアップでも表すこと。" },
    ],
    stance:
      <><Hl>余白の大きさや列数は指定しない</Hl>。結果としての使いやすさ(狭い幅で組み替わる・近づけすぎない・構造でも伝える)を求める。</>,
    exceptions:
      "1.4.10は、地図・図・動画・ゲーム・データ表など2次元の配置が欠かせない部分を除外。2.5.8の例外は5つ(詳しくはボタンのページ)。",
    accessibility: "知覚可能(1.4.10・1.3.1)・操作可能(2.5.8)。",
    useCases: [
      "幅320pxで横スクロールが出ないか確かめる",
      "余白でまとめたグループは、見出しやグループの構造でも伝える",
    ],
    searchHint: "320 CSS pixels",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html#success-criterion",
    refs: [
      { kind: "sc", level: "AA", label: "1.4.10 リフロー", url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html#success-criterion" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html#spacing" },
      { kind: "sc", level: "A", label: "1.3.1 情報及び関係性", url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html#success-criterion" },
    ],
    confirmedNote: "3つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Proximity Principle in Visual Design",
    color: "#7A4F7E",
    position: "余白は「何と何が関係しているか」を伝える手段、という近接の原則にもとづく",
    size: "原則としての言及。例: 12項目のフォームは、4項目×3グループに分けると取り組みやすく見える。",
    colorInfo: <NoData>記載なし</NoData>,
    structure: "近接は色や形の似ていることより優先されることがある。見出しは自分の節の本文に近く置く。",
    stance:
      <><Hl>関連する要素は近くに、関係のない要素は離して置く</Hl>。関連する操作が離れていると、作業に集中している人は見落とす。</>,
    exceptions:
      "狭い画面で別のグループが同じグループに見えるなら、配置そのものを変える。",
    accessibility: "根拠となる原則 ― 適合区分ではなく、知覚の原則とユーザーテストにもとづく。",
    useCases: [
      "ラベルと入力欄の間は狭く、次のラベルとの間は広く",
      "関連する操作(戻る/次へ)はまとめる",
    ],
    searchHint: "Principle of proximity",
    url: "https://www.nngroup.com/articles/gestalt-proximity/",
    refs: [
      { label: "Proximity Principle in Visual Design", url: "https://www.nngroup.com/articles/gestalt-proximity/" },
    ],
    confirmedNote: "記事本文を直接取得して確認済み(2026-09)。",
  },
];

/* 画像エリア: 近接によるグループ化の例 */
function ProximitySwatch() {
  const dot = (x, y, c) => <rect key={`${x}-${y}`} x={x} y={y} width="14" height="14" rx="3" fill={c} />;
  const g1 = [], g2 = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { g1.push(dot(10 + c * 20, 10 + r * 20, "#7E86AC")); }
  for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { g2.push(dot(150 + c * 20 + (c >= 2 ? 22 : 0), 10 + r * 20, "#7E86AC")); }
  return (
    <svg viewBox="0 0 280 90" width="100%" style={{ maxWidth: 360, display: "block", margin: "0 auto" }} role="img" aria-label="余白の違いによるグループ化の例">
      {g1}{g2}
      <text x="45" y="84" fontSize="9.5" fill="#565D8A" textAnchor="middle" fontFamily="'Jost', 'Noto Sans JP', sans-serif">均等な間隔 → 1つのまとまり</text>
      <text x="211" y="84" fontSize="9.5" fill="#565D8A" textAnchor="middle" fontFamily="'Jost', 'Noto Sans JP', sans-serif">間を広げる → 2つのグループ</text>
    </svg>
  );
}

/* 四系列比較図: レイアウトを切り替える幅の境界 */
function BreakpointChart() {
  const x0 = 96, x1 = 530, max = 1800;
  const X = (v) => x0 + (Math.min(v, max) / max) * (x1 - x0);
  const bands = [
    { from: 0, to: 600, label: "Compact" },
    { from: 600, to: 840, label: "Medium" },
    { from: 840, to: 1200, label: "Expanded" },
    { from: 1200, to: 1600, label: "Large" },
    { from: 1600, to: 1800, label: "XL" },
  ];
  const shades = ["#2F7D6E", "#4F9486", "#72AB9F", "#97C2B8", "#BCD9D2"];
  const ticks = [0, 320, 600, 840, 1200, 1600];
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 540 172" width="100%" style={{ maxWidth: 640, display: "block", margin: "0 auto" }} role="img" aria-label="レイアウトを切り替える幅の境界の比較図">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={X(t)} x2={X(t)} y1="8" y2="150" stroke="#E1E3F0" strokeWidth="1" />
          <text x={X(t)} y="164" fontSize="9.5" fill="#666D93" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{t}</text>
        </g>
      ))}
      <text x="0" y="24" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Apple</text>
      <rect x={X(0)} y="14" width={X(1800) - X(0)} height="14" rx="3" fill="#C2542A" opacity="0.15" />
      <text x={X(0) + 6} y="24.5" fontSize="9.5" fill="#454C78" fontFamily={font}>compact / regular をシステムが判定(HIGに境界値の記載なし)</text>
      <text x="0" y="58" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Google</text>
      {bands.map((b, i) => (
        <g key={b.label}>
          <rect x={X(b.from)} y="48" width={X(b.to) - X(b.from) - 1} height="14" fill={shades[i]} />
          <text x={(X(b.from) + X(b.to)) / 2} y="58.5" fontSize="8.5" fill={i < 2 ? "#FFFFFF" : "#171B36"} textAnchor="middle" fontFamily={font}>{b.label}</text>
        </g>
      ))}
      <text x="0" y="92" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>W3C</text>
      <line x1={X(320)} x2={X(320)} y1="78" y2="100" stroke="#A3821F" strokeWidth="2" />
      <circle cx={X(320)} cy="89" r="4" fill="#A3821F" />
      <text x={X(320) + 8} y="92.5" fontSize="9.5" fill="#454C78" fontFamily={font}>320px でも2方向スクロールなし(1.4.10)</text>
      <text x="0" y="126" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>NN group</text>
      <text x={X(0) + 6} y="126" fontSize="9.5" fill="#666D93" fontFamily={font}>数値基準なし(幅が変わっても近接によるグループが崩れないこと)</text>
    </svg>
  );
}

/* No.010: 画面の幅ごとの余白(Google)と、Appleの分割ビュー・tvOSのセーフエリアの図 */
function MarginDiagram() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const k = 0.16; // 1dp = 0.16px
  const frames = [
    { name: "Compact", w: 412, m: 16, panes: [{ f: 1 }], note: "600dp未満(スマホ縦)" },
    { name: "Medium", w: 700, m: 24, panes: [{ f: 1 }], note: "600〜839dp(タブレット縦)" },
    { name: "Expanded", w: 1000, m: 24, panes: [{ fixed: 360 }, { f: 1 }], note: "840〜1199dp" },
    { name: "Large", w: 1400, m: 24, panes: [{ fixed: 412 }, { f: 1 }], note: "1200〜1599dp" },
  ];
  let x = 4;
  const H = 120 * 1.0;
  const items = frames.map((fr) => {
    const W = fr.w * k, fx = x; x += W + 14;
    const inner = W - fr.m * 2 * k;
    const fixedW = fr.panes.reduce((a, p) => a + (p.fixed ? p.fixed * k : 0), 0);
    const spacers = (fr.panes.length - 1) * 24 * k;
    const flexW = inner - fixedW - spacers;
    let px = fx + fr.m * k;
    const panes = fr.panes.map((p, i) => {
      const pw = p.fixed ? p.fixed * k : flexW;
      const el = (
        <g key={i}>
          <rect x={px} y={30} width={pw} height={H - 26} rx="3" fill={p.fixed ? "#CFE3DD" : "#E3EDE9"} />
          {p.fixed && <text x={px + pw / 2} y={30 + (H - 26) / 2} fontSize="7.5" textAnchor="middle" fill="#2F7D6E" fontFamily={mono}>{p.fixed}</text>}
        </g>
      );
      px += pw + 24 * k;
      return el;
    });
    return (
      <g key={fr.name}>
        <rect x={fx} y={22} width={W} height={H - 10} rx="5" fill="#FFFFFF" stroke="#7E86AC" />
        {panes}
        <text x={fx} y={14} fontSize="9" fontWeight="700" fill="#171B36" fontFamily={font}>{fr.name}</text>
        <text x={fx} y={H + 26} fontSize="7.5" fill="#666D93" fontFamily={font}>{fr.note}</text>
        <text x={fx} y={H + 37} fontSize="7.5" fill="#2F7D6E" fontFamily={mono}>端 {fr.m}{fr.panes.length > 1 ? " / 間 24" : ""}</text>
      </g>
    );
  });
  return (
    <svg viewBox={`0 0 ${x} ${H + 44}`} style={{ width: "100%", display: "block" }} role="img" aria-label="Googleの画面の幅ごとの余白とペインの図">
      {items}
    </svg>
  );
}

function AppleLayoutDiagram() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  return (
    <svg viewBox="0 0 200 130" style={{ width: "100%", maxWidth: 280, display: "block" }} role="img" aria-label="Appleの分割ビューの図">
      <text x="0" y="12" fontSize="9" fontWeight="700" fill="#171B36" fontFamily={font}>分割ビュー(例: メールアプリ)</text>
      <rect x="0" y="20" width="190" height="96" rx="6" fill="#FFFFFF" stroke="#7E86AC" />
      <rect x="4" y="24" width="48" height="88" rx="3" fill="#F4DDD3" />
      <rect x="54" y="24" width="56" height="88" rx="3" fill="#F8ECE6" />
      <rect x="112" y="24" width="74" height="88" rx="3" fill="#FCF6F3" />
      <text x="28" y="66" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={font}>サイドバー</text>
      <text x="28" y="77" fontSize="6.5" textAnchor="middle" fill="#454C78" fontFamily={font}>フォルダ</text>
      <text x="82" y="66" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={font}>一覧</text>
      <text x="82" y="77" fontSize="6.5" textAnchor="middle" fill="#454C78" fontFamily={font}>メール</text>
      <text x="149" y="66" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={font}>詳細</text>
      <text x="149" y="77" fontSize="6.5" textAnchor="middle" fill="#454C78" fontFamily={font}>本文</text>
      <text x="0" y="128" fontSize="7.5" fill="#666D93" fontFamily={font}>左で選ぶと、右の列に中身が出る</text>
    </svg>
  );
}

const LAYOUT_PATTERNS = [
  { s: "Google", c: "#2F7D6E", t: "フィード(Feed)", d: "カードなどを格子状に並べ、たくさんの内容をざっと見せる", fig: "feed", ref: ["M3: Feed", "https://m3.material.io/foundations/layout/canonical-examples/feed"] },
  { s: "Google", c: "#2F7D6E", t: "リスト・詳細(List-detail)", d: "一覧と、選んだ項目の詳細を左右に並べる", fig: "listdetail", ref: ["M3: List-detail", "https://m3.material.io/foundations/layout/canonical-examples/list-detail"] },
  { s: "Google", c: "#2F7D6E", t: "補助ペイン(Supporting pane)", d: "主な内容の横に補助の内容を置く(主:補助=Expandedは7:3、Mediumは1:1)", fig: "support", ref: ["M3: Supporting pane", "https://m3.material.io/foundations/layout/canonical-examples/supporting-pane"] },
  { s: "Google", c: "#2F7D6E", t: "重ねる(Levitate)", d: "ペインを内容の上に浮かべ、カートの確認やコメントの返信など1つの作業に集中させる", fig: "levitate", ref: ["M3: Panes ― Levitate", "https://m3.material.io/foundations/layout/scaffold/panes"] },
  { s: "Apple", c: "#C2542A", t: "分割ビュー(Split view)", d: "サイドバー・一覧・詳細の2〜3列で、階層を一度に見せる。広い画面(regular)向け", fig: "split", ref: ["HIG: Split views", "https://developer.apple.com/design/human-interface-guidelines/split-views#Best-practices"] },
  { s: "Apple", c: "#C2542A", t: "タブバー ↔ サイドバー", d: "広い画面では、タブバーをサイドバーに切り替えてよい(使える機能は変えない)", fig: "tabside", ref: ["HIG: Layout ― Size classes", "https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes"] },
  { s: "W3C", c: "#A3821F", t: "1列に組み替える(リフロー)", d: "幅320px相当でも、横スクロールなしで読めるようにする(1.4.10)", fig: "reflow", ref: ["WCAG 1.4.10 リフロー", "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html#success-criterion"] },
  { s: "NN group", c: "#7A4F7E", t: "近接でまとめる", d: "関係するものを近づけ、別のグループとは余白で離す", fig: "proximity", ref: ["NN/g: Proximity Principle", "https://www.nngroup.com/articles/gestalt-proximity/"] },
];
function PatternFig({ k, c }) {
  const box = (x, y, w, h, o = 1) => <rect x={x} y={y} width={w} height={h} rx="2" fill={c} opacity={o} />;
  const f = {
    feed: <>{[0, 1, 2].map((i) => [0, 1].map((j) => <g key={i + "" + j}>{box(6 + i * 22, 6 + j * 22, 18, 18, 0.35)}</g>))}</>,
    listdetail: <>{[0, 1, 2, 3].map((i) => <g key={i}>{box(6, 6 + i * 11, 26, 8, i === 1 ? 0.7 : 0.3)}</g>)}{box(36, 6, 38, 41, 0.18)}</>,
    support: <>{box(6, 6, 46, 41, 0.3)}{box(56, 6, 18, 41, 0.15)}</>,
    levitate: <>{box(6, 6, 68, 41, 0.12)}{box(40, 12, 30, 30, 0.45)}</>,
    split: <>{box(6, 6, 16, 41, 0.45)}{box(25, 6, 20, 41, 0.28)}{box(48, 6, 26, 41, 0.14)}</>,
    tabside: <>{box(6, 6, 22, 41, 0.12)}{box(6, 40, 22, 7, 0.5)}<text x="33" y="30" fontSize="9" fill={c}>→</text>{box(44, 6, 9, 41, 0.45)}{box(55, 6, 19, 41, 0.15)}</>,
    reflow: <>{box(6, 6, 30, 8, 0.3)}{box(6, 17, 30, 8, 0.3)}{box(6, 28, 30, 8, 0.3)}<text x="40" y="30" fontSize="9" fill={c}>→</text>{box(52, 6, 14, 41, 0.3)}</>,
    proximity: <>{[0, 1].map((i) => <g key={i}>{box(6 + i * 9, 10, 7, 7, 0.5)}{box(6 + i * 9, 19, 7, 7, 0.5)}</g>)}{[0, 1].map((i) => <g key={"b" + i}>{box(46 + i * 9, 10, 7, 7, 0.5)}{box(46 + i * 9, 19, 7, 7, 0.5)}</g>)}</>,
  };
  return <svg viewBox="0 0 80 53" style={{ width: 96, height: 64, flexShrink: 0, border: "1px solid #E1E3F0", borderRadius: 4, background: "#FFFFFF" }} aria-hidden="true">{f[k]}</svg>;
}

function LayoutVisuals() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>余白とレイアウトを図で見る</h2>
      <h3 style={styles.lvSub}>Google ― 画面の幅ごとの余白とペイン(dp)</h3>
      <div style={styles.lvCard}><MarginDiagram /></div>
      <p style={styles.lvNote}>画面の端の余白はCompactで16dp、それより広い幅で24dp。ペインとペインの間(スペーサー)は24dp。幅の決まったペインはExpandedで360dp、Large以上で412dp。図は幅の比率を合わせた概念図だ(出典: M3「Breakpoints」「Panes」)。</p>
      <h3 style={styles.lvSub}>Apple ― 分割ビュー(1つの画面を2〜3列に分ける)</h3>
      <div style={styles.lvCard}><AppleLayoutDiagram /></div>
      <p style={styles.lvNote}>分割ビューは、画面を縦に2〜3列に分け、<strong>左の列で選んだ項目の中身を右の列に出す</strong>見せ方。メールアプリなら、フォルダ→メールの一覧→本文を1画面に並べ、画面を移らずに階層をたどれる。広い画面(iPadOS・macOS)向けで、狭い幅(compact)では1列ずつ表示する。余白の数値は示されず、システムのマージンとセーフエリアに合わせる。</p>
      <h3 style={styles.lvSub}>レイアウトのパターン(各系列の公式ページへのリンク付き)</h3>
      <div style={styles.lvGrid}>
        {LAYOUT_PATTERNS.map((p) => (
          <div key={p.t} style={styles.lvPattern}>
            <PatternFig k={p.fig} c={p.c} />
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: p.c }}>{p.s}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#171B36" }}>{p.t}</div>
              <div style={{ fontSize: 11, lineHeight: 1.55, color: "#454C78" }}>{p.d}</div>
              <a href={p.ref[1]} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#3A4FCF", textDecoration: "underline" }}>{p.ref[0]} ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "余白の刻み、画面の幅に応じたレイアウトの切り替え、要素のまとめ方の決まり";
const ABOUT = [
  { k: "目的・役割", v: "余白をそろえて関係のある要素をまとめ、画面の構造を分かりやすくする" },
  { k: "関わる場面", v: "コンポーネントどうしの間隔、画面の端の余白、列(グリッド)の数" },
  { k: "関連するページ", v: <><PageLink to="/tokens/adaptive">レスポンシブデザイン</PageLink></> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "端末ではなく、使える広さで切り替える", d: "分割画面やウィンドウの大きさで変わるものとして扱う", who: "Apple・Google" },
  { n: 2, t: "余白でまとまりを作る", d: "関係のある要素は近づけ、別のグループは間を広げる", who: "NN group" },
  { n: 3, t: "狭めても読めるようにする", d: "幅320pxまで狭めても内容を読める", who: "W3C 1.4.10" },
  { n: 4, t: "切り替える幅の目安", d: "600・840・1200・1600dp", who: "Google。Appleは境界値を示さない" },
];

export default function TokensLayoutSpacingPage() {
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
        <SidebarNav currentPath="/tokens/layout-spacing" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>Foundation / レイアウト・スペーシング</span>
            <span>SPEC No. 045</span>
          </div>

          <h1 style={styles.title}>レイアウト・スペーシング(余白・グリッド)</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="余白が「まとまり」を作る(近接の原則)"
            image={<><ProximitySwatch /></>}
            imageNote={<>同じ12個の四角でも、間隔を変えるだけで1つのまとまりにも2つのグループにも見える。余白は見た目を整えるだけでなく、要素どうしの関係を伝える情報だ。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四系列比較図 ― レイアウトを切り替える幅の境界(dp / CSS px)</h2>
            <BreakpointChart />
            <p style={styles.chartNote}>Googleの帯はウィンドウサイズクラス(幅)の区分だ。W3Cの320pxはレイアウトの境界ではなく、この幅でも内容を読めることを求める値だ。単位(dp・pt・CSS px)は厳密には異なるが、いずれも画面の密度に依存しない論理的な単位だ。</p>
          </div>

          <LayoutVisuals />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              AppleとGoogleは、<strong>端末の種類ではなく、使える画面の広さで切り替える</strong>点が同じ。違いは数値の公開で、Googleは<strong>境界(600・840・1200・1600dp)と余白(端16/24dp・ペインの間24dp)</strong>を示し、Appleは<strong>システムのマージンに任せる</strong>。
            </p>
            <p style={styles.synthesisText}>
              W3Cは余白を指定せず、<strong>幅320pxでも読めること</strong>(1.4.10)を求める。NN groupの近接の原則とW3Cの1.3.1を合わせると、<strong>余白で作ったまとまりは、構造でも伝えておく</strong>(AI解釈)。
            </p>
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
                <InfoBox label="余白・グリッドの数値" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="画面幅による切り替え">{s.colorInfo}</InfoBox>
                <InfoBox label="構造・グループ化">{s.structure}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                <InfoBox label="参照ページ(公式)">
                  <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                </InfoBox>
                {s.searchHint && (
                  <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
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
                <div style={styles.labelCell}>余白・グリッドの数値</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>画面幅による切り替え</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>構造・グループ化</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.structure}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
                <div style={styles.labelCell}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <NoData>該当なし</NoData>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["デザインの基礎", "情報の整理・一覧"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  lvSub: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "14px 0 8px" },
  lvCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", overflowX: "auto" },
  lvNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "6px 0 0" },
  lvGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 8 },
  lvPattern: { display: "flex", gap: 10, alignItems: "flex-start", border: "1px solid #E1E3F0", borderRadius: 6, padding: "8px 10px" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6, textAlign: "left" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#666D93", margin: "10px 0 0", lineHeight: 1.6 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#666D93", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  confirmedNoteSmall: { fontSize: 9.5, color: "#666D93", lineHeight: 1.5, fontStyle: "italic", marginTop: 4 },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10 },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  secondaryLinks: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
