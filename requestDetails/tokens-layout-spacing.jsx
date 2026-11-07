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
    position: "余白の数値の刻みは定めず、システムが用意するマージン・レイアウトガイド・セーフエリアに従って配置する方式。画面の広さはcompact/regularの「サイズクラス」で判断する",
    size: "iOS/iPadOSでは余白や列の数値基準は示されていない(システムのマージンとセーフエリアを使う前提)。固定値があるのは一部のプラットフォームのみで、tvOSはセーフエリアとして上下60pt・左右80ptの内側に主要な内容を置き、グリッドの列間は40pt・行間は最低100pt。visionOSはボタンの中心同士を最低60pt離す、watchOSは1行に並べるボタンをアイコンなら3つ・文字なら2つまで、としている。",
    colorInfo: "サイズクラスは横・縦それぞれがcompact(狭い/低い)かregular(広い/高い)のどちらかで、システムが端末・ウィンドウの状態・マルチタスクの状況から判定する。レイアウトは端末の種類や向きではなくサイズクラスで決めるべきで、広い画面ではタブバーをサイドバーに切り替えるなど見せ方を変えてもよいが、使える機能そのものは変えないよう求めている。",
    stance:
      "重要なものを上・行の始まり側に置き、揃えと字下げで階層を表し、関連するものは余白・囲み・区切り線でまとめる、という視覚的な階層の原則を示している。画面サイズ・向き・ウィンドウの大きさ・文字サイズの変化に対応すること、特にDynamic Typeで文字が大きくなったときに、横に並んだ要素を縦に積み直すなどして文字が切れたり重なったりしないようにすることを求めている(ページ本文を直接確認、2026-09)。",
    exceptions:
      "横向き専用のゲームのように向きを固定するアプリでも、端末やウィンドウの大きさの違いには対応すべきとしている。背景の画像は、画面の縦横比が変わっても縦横比を変えずに拡大して画面を埋めるよう勧めている。",
    accessibility:
      "知覚可能(Perceivable) ― 文字サイズの拡大に合わせてレイアウトを組み替えることは、WCAG 1.4.10(リフロー)・1.4.4(テキストのサイズ変更)と同じ目的を持つ。セーフエリアを守ることは、システムの表示や端末の形状で内容や操作が隠れないようにするため。",
    useCases: [
      "余白は独自の数値ではなく、システムのマージン・レイアウトガイドを使う",
      "レイアウトは端末の種類や向きではなくサイズクラスで切り替える",
      "文字を最大サイズにしたときは横並びを縦積みに変えて、切れ・重なりを防ぐ",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes",
    refs: [
      { label: "Layout", url: "https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes" },
      { label: "Visual hierarchy", url: "https://developer.apple.com/design/human-interface-guidelines/layout#Visual-hierarchy" },
      { label: "Guides and safe areas", url: "https://developer.apple.com/design/human-interface-guidelines/layout#Guides-and-safe-areas" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・数値表・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Layout / Window size classes",
    color: "#2F7D6E",
    position: "使える画面の幅を5段階の「ウィンドウサイズクラス」に分け、その区分ごとにレイアウト(1ペイン/2ペインなど)を切り替える方式。画面端の余白はCompactで16dp、それより広い幅で24dp",
    size: "幅のウィンドウサイズクラスは、Compact 600dp未満 / Medium 600〜840dp未満 / Expanded 840〜1200dp未満 / Large 1200〜1600dp未満 / Extra-large 1600dp以上。高さはCompact 480dp未満 / Medium 480〜900dp未満 / Expanded 900dp以上。2つのペインを並べるときの間隔は24dp。余白を4dpのグリッドに揃えるという値は、M3のレイアウトのページでは未確認。画面端のマージンは幅がCompactで16dp、それ以外で24dp。幅の決まったペインはExpandedで360dp、Large以上で412dp(M3の本文で確認、2026-11)。",
    colorInfo: "縦スクロールが一般的なため、ほとんどのアプリは幅のサイズクラスだけ考えればよいとしている。ただしスマートフォンを横にした場合のように、幅はMediumでも高さがCompactのときは2ペインが実用的でないため、高さも考慮するよう勧めている。",
    stance:
      "ウィンドウサイズクラスは端末の画面サイズではなく、アプリが実際に使えるウィンドウの大きさで決まり、分割画面・折りたたみ端末の開閉・ウィンドウのリサイズでアプリの実行中にも変わるとしている。そのため「タブレットかどうか」の判定に使うものではない、と明言している。各区分は典型的な端末の大多数に対応するよう選ばれており、例えばCompact幅は縦向きのスマートフォンの99.96%にあたるとしている(Android Developersの本文を直接確認、2026-09)。",
    exceptions:
      "Large・Extra-largeの2区分は、デスクトップや外部ディスプレイに対応するため、Material Designの元のレイアウト指針(Compact/Medium/Expanded)に後から追加されたもの。画面端のマージン(16/24dp)はM3の本文で確認(2026-11)。4dpのグリッドは未確認。",
    accessibility:
      "知覚可能(Perceivable) ― 画面の幅が狭くなったときに1ペインへ切り替える設計は、WCAG 1.4.10(リフロー)が求める「狭い幅でも2方向にスクロールせずに読めること」を満たしやすくする。",
    useCases: [
      "レイアウトの切り替えは端末の種類ではなく、幅のウィンドウサイズクラスで判断する",
      "Medium幅以上では2ペイン(一覧+詳細)を検討し、ペインの間は24dp空ける",
      "余白・サイズは4dpの倍数に揃える",
    ],
    searchHint: "",
    url: "https://m3.material.io/foundations/layout/breakpoints/overview",
    refs: [
      { label: "Layout / Window size classes", url: "https://m3.material.io/foundations/layout/breakpoints/overview" },
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
    position: "余白やグリッドの値は定めず、「狭い幅でも読めること」「押す対象どうしの間隔」「見た目のまとまりを構造でも伝えること」を求める基準",
    size: "1.4.10(レベルAA): 幅320 CSSピクセル相当(縦スクロールの内容)でも、情報や機能を失わず、縦横2方向のスクロールなしで表示できること。320pxは、幅1280pxの画面を400%に拡大した状態にあたる。2.5.8(レベルAA): 押す対象は24×24 CSSピクセル以上。これより小さい場合は、各対象の中心に直径24pxの円を置いたとき、ほかの対象やその円と重ならない間隔があれば適合する。",
    colorInfo: "1.3.1(レベルA): 見た目で伝えている情報・構造・関係(余白でまとめたグループ、見出しと本文の関係など)は、プログラムでも判別できるか、テキストで示されていること。余白だけでグループを表すと、スクリーンリーダーの利用者にはそのまとまりが伝わらない。",
    glossary: [
      { term: "1.4.10 Reflow・レベルAA", desc: "幅320 CSSピクセル相当まで狭めても、縦横両方向のスクロールなしで内容を読めることを求める基準。地図・図表・データ表など2次元の配置が必要な部分は例外。" },
      { term: "2.5.8 Target Size (Minimum)・レベルAA", desc: "ポインターで押す対象を24×24 CSSピクセル以上にするか、小さい場合は周囲に十分な間隔を取ることを求める基準。文中のリンクなどは例外。" },
      { term: "1.3.1 Info and Relationships・レベルA", desc: "見た目で表している構造や関係を、見出し・リスト・グループなどのマークアップでも表すことを求める基準。" },
    ],
    stance:
      "WCAGは余白の大きさやグリッドの列数を指定しない。代わりに、拡大して幅が狭くなったときに内容が1列に組み替わること(1.4.10)、小さな対象どうしを近づけすぎないこと(2.5.8)、余白で表したまとまりを構造としても伝えること(1.3.1)という、結果としての使いやすさを求めている。",
    exceptions:
      "1.4.10は、地図・図・動画・ゲーム・プレゼンテーション・データ表、操作中に表示し続ける必要があるツールバーなど、2次元の配置が使い方や意味に必要な部分を例外としている。2.5.8は、同じ機能を持つ別の十分な大きさの操作がある場合、文中のリンク、ブラウザが決める大きさの部品、見た目が本質的な場合を例外としている。",
    accessibility: "知覚可能(Perceivable)・操作可能(Operable) ― 1.4.10と1.3.1は「知覚可能」、2.5.8は「操作可能」に属する。拡大して使う弱視の人、指先の細かい操作が難しい人、スクリーンリーダーの利用者が、同じ情報と操作にたどり着けることが目的。",
    useCases: [
      "幅320pxで横スクロールが出ないか確認する(データ表・地図などは例外)",
      "24px未満の小さなアイコンボタンを並べるときは、中心どうしを24px以上離す",
      "余白でまとめたグループは、見出し・リスト・fieldsetなどの構造でも表す",
    ],
    searchHint: "320 CSS pixels",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html#success-criterion",
    refs: [
      { kind: "sc", level: "AA", label: "1.4.10 リフロー", url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html#success-criterion" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html#spacing" },
      { kind: "sc", level: "A", label: "1.3.1 情報及び関係性", url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html#success-criterion" },
    ],
    confirmedNote: "3つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Proximity Principle in Visual Design",
    color: "#7A4F7E",
    position: "余白は「何と何が関係しているか」を伝える手段である、というゲシュタルト心理学の近接の原則に基づく実務指針(適合基準ではない)",
    size: "数値基準ではなく原則としての言及。近くにある要素は同じグループとして、余白で離れた要素は別のグループとして認識されるとしている。例として、12項目のフォームを1つのまとまりで見せるより、意味のある4項目×3グループに分けた方が取り組みやすく見えると述べている。",
    colorInfo: "近接は最も強いグループ化の原則の1つで、色や形の類似といった別の手がかりよりも優先されることがあるとしている。見出しの上下の余白も同じで、見出しは前の節の本文より、自分の節の本文に近く置くべきだとしている。",
    stance:
      "関連する要素は近くに置き、関係のない要素は離すべきだとしている。関係のない要素を近くに置くと、その中の1つを見ただけで残りも同じ種類だと判断され、必要なボタンが埋もれてしまう。逆に、関連する操作が離れた場所にあると、作業に集中している利用者は目の前にあっても見落とする(いわゆる「トンネル視」)。実例として、アカウント作成を飛ばせる「スキップ」リンクが画面の隅にあったため、登録が必須だと誤解された事例を挙げている(記事本文を直接取得して確認済み、2026-09)。",
    exceptions:
      "レスポンシブデザインでは画面の幅によって要素の近さが変わるため、広い画面で余白によって分けていたものが、狭い画面では同じグループに見えてしまうことがある。その場合は配置そのものを変える(例: 検索を別の場所へ移す)必要があるとしている。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、視覚的なグループ化の知覚に関する心理学の原則とユーザーテストに基づく設計上の根拠。",
    useCases: [
      "ラベルと入力欄の間は狭く、次のラベルとの間は広く取る",
      "関連する操作(戻る/次へ)はまとめ、関係のない操作(下書き保存・追加)とは離す",
      "画面幅を変えたときに、余白で分けていたグループが崩れないか確認する",
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

/* 四サイト比較図: レイアウトを切り替える幅の境界 */
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
          <text x={X(t)} y="164" fontSize="9.5" fill="#7E86AC" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{t}</text>
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
      <text x={X(0) + 6} y="126" fontSize="9.5" fill="#7E86AC" fontFamily={font}>数値基準なし(幅が変わっても近接によるグループが崩れないこと)</text>
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
        <text x={fx} y={H + 26} fontSize="7.5" fill="#7E86AC" fontFamily={font}>{fr.note}</text>
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
    <svg viewBox="0 0 400 130" style={{ width: "100%", maxWidth: 520, display: "block" }} role="img" aria-label="Appleの分割ビューとtvOSのセーフエリアの図">
      <text x="0" y="12" fontSize="9" fontWeight="700" fill="#171B36" fontFamily={font}>分割ビュー(iPadOS・macOS)</text>
      <rect x="0" y="20" width="190" height="96" rx="6" fill="#FFFFFF" stroke="#7E86AC" />
      <rect x="4" y="24" width="48" height="88" rx="3" fill="#F4DDD3" />
      <rect x="54" y="24" width="56" height="88" rx="3" fill="#F8ECE6" />
      <rect x="112" y="24" width="74" height="88" rx="3" fill="#FCF6F3" />
      <text x="28" y="70" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={font}>サイドバー</text>
      <text x="82" y="70" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={font}>一覧</text>
      <text x="149" y="70" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={font}>詳細</text>
      <text x="0" y="128" fontSize="7.5" fill="#7E86AC" fontFamily={font}>2〜3列。区切り線は細い1pt。狭い幅(compact)では使わない</text>
      <text x="216" y="12" fontSize="9" fontWeight="700" fill="#171B36" fontFamily={font}>tvOSのセーフエリア</text>
      <rect x="216" y="20" width="176" height="99" rx="4" fill="#FFFFFF" stroke="#7E86AC" />
      <rect x={216 + 176 * (80 / 1920)} y={20 + 99 * (60 / 1080)} width={176 * (1 - 160 / 1920)} height={99 * (1 - 120 / 1080)} fill="#F8ECE6" stroke="#C2542A" strokeDasharray="3 2" />
      <text x="304" y="66" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={font}>主な内容はこの内側</text>
      <text x="304" y="78" fontSize="7.5" textAnchor="middle" fill="#C2542A" fontFamily={mono}>上下60pt・左右80pt</text>
    </svg>
  );
}

const LAYOUT_PATTERNS = [
  { s: "Google", c: "#2F7D6E", t: "フィード(Feed)", d: "カードなどを格子状に並べ、たくさんの内容をざっと見せる", fig: "feed" },
  { s: "Google", c: "#2F7D6E", t: "リスト・詳細(List-detail)", d: "一覧と、選んだ項目の詳細を左右に並べる", fig: "listdetail" },
  { s: "Google", c: "#2F7D6E", t: "補助ペイン(Supporting pane)", d: "主な内容(約3分の2)の横に、補助の内容を置く", fig: "support" },
  { s: "Google", c: "#2F7D6E", t: "重ねる(Levitate)", d: "ペインを内容の上に浮かべ、カートの確認やコメントの返信など1つの作業に集中させる", fig: "levitate" },
  { s: "Apple", c: "#C2542A", t: "分割ビュー(Split view)", d: "サイドバー・一覧・詳細の2〜3列で、階層を一度に見せる。広い画面(regular)向け", fig: "split" },
  { s: "Apple", c: "#C2542A", t: "タブバー ↔ サイドバー", d: "広い画面では、タブバーをサイドバーに切り替えてよい(使える機能は変えない)", fig: "tabside" },
  { s: "W3C", c: "#A3821F", t: "1列に組み替える(リフロー)", d: "幅320px相当でも、横スクロールなしで読めるようにする(1.4.10)", fig: "reflow" },
  { s: "NN group", c: "#7A4F7E", t: "近接でまとめる", d: "関係するものを近づけ、別のグループとは余白で離す", fig: "proximity" },
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
      <p style={styles.lvNote}>画面の端の余白はCompactで16dp、それより広い幅で24dp。ペインとペインの間(スペーサー)は24dp。幅の決まったペインはExpandedで360dp、Large以上で412dp。図は幅の比率を合わせた概念図です(出典: M3「Breakpoints」「Panes」)。</p>
      <h3 style={styles.lvSub}>Apple ― 分割ビューとtvOSのセーフエリア</h3>
      <div style={styles.lvCard}><AppleLayoutDiagram /></div>
      <p style={styles.lvNote}>iOS・iPadOSの余白の数値は示されておらず、システムのマージンとセーフエリアに合わせます。固定の数値があるのはtvOSなど一部です(出典: HIG「Layout」「Split views」)。</p>
      <h3 style={styles.lvSub}>レイアウトのパターン</h3>
      <div style={styles.lvGrid}>
        {LAYOUT_PATTERNS.map((p) => (
          <div key={p.t} style={styles.lvPattern}>
            <PatternFig k={p.fig} c={p.c} />
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: p.c }}>{p.s}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#171B36" }}>{p.t}</div>
              <div style={{ fontSize: 11, lineHeight: 1.55, color: "#454C78" }}>{p.d}</div>
            </div>
          </div>
        ))}
      </div>
      <p style={styles.lvNote}>Googleの4つはM3「Canonical layout examples」、Appleの2つはHIG「Split views」「Layout」、W3Cは1.4.10、NN groupは近接の原則によります。</p>
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
      <span style={styles.glossaryNoteLabel}>メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "余白の刻み、画面の幅に応じたレイアウトの切り替え、要素のまとめ方の決まりです。";
const ABOUT = [
  { k: "目的・役割", v: "余白をそろえて関係のある要素をまとめ、画面の構造を分かりやすくする" },
  { k: "関わる場面", v: "部品どうしの間隔、画面の端の余白、列(グリッド)の数" },
  { k: "関連するページ", v: <><PageLink to="/tokens/adaptive">アダプティブ/レスポンシブ</PageLink>、<PageLink to="/tokens/typography">タイポグラフィ</PageLink></> },
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
            <span>トークン / ファウンデーション / レイアウト・スペーシング</span>
            <span>SPEC No. 045</span>
          </div>

          <h1 style={styles.title}>レイアウト・スペーシング(余白・グリッド)</h1>
          <SummaryCard
            imageLabel="余白が「まとまり」を作る(近接の原則)"
            image={<><ProximitySwatch /></>}
            imageNote={<>同じ12個の四角でも、間隔を変えるだけで1つのまとまりにも2つのグループにも見えます。余白は見た目を整えるだけでなく、要素どうしの関係を伝える情報です。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― レイアウトを切り替える幅の境界(dp / CSS px)</h2>
            <BreakpointChart />
            <p style={styles.chartNote}>Googleの帯はウィンドウサイズクラス(幅)の区分です。W3Cの320pxはレイアウトの境界ではなく、この幅でも内容を読めることを求める値です。単位(dp・pt・CSS px)は厳密には異なりますが、いずれも画面の密度に依存しない論理的な単位です。</p>
          </div>

          <LayoutVisuals />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              AppleとGoogleは、<strong>端末の種類ではなく、実際に使える画面の広さでレイアウトを切り替える</strong>という同じ原則を明言しています。Appleはサイズクラス(compact/regular)、Googleはウィンドウサイズクラス(Compact〜Extra-large)と呼び、どちらも分割画面やウィンドウのリサイズで実行中に変わるものとして扱います。
            </p>
            <p style={styles.synthesisText}>
              違いは数値の公開の仕方です。Googleは<strong>600・840・1200・1600dpという境界値と、画面端16/24dp・ペイン間24dpといった余白の値</strong>を示しています。一方AppleのHIGは、iOS/iPadOSについて境界値も余白の刻みも示さず、<strong>システムのマージンとセーフエリアに任せる</strong>方式です。固定値が出てくるのはtvOS(上下60pt・左右80pt)やvisionOS(ボタンの中心を60pt以上離す)など一部に限られます。
            </p>
            <p style={styles.synthesisText}>
              W3Cは余白の大きさを指定せず、<strong>幅320pxまで狭めても読めること(1.4.10)</strong>と<strong>小さな押す対象どうしの間隔(2.5.8の24px)</strong>を求めます。Googleのサイズクラスで言えばCompactの中のさらに狭い幅で、拡大して使う人を想定した値です。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupの近接の原則は、<strong>余白が要素どうしの関係を伝える</strong>という、数値とは別の観点を加えます。ここでW3Cの1.3.1と組み合わせると、<strong>余白で表したまとまりは、見出しやグループといった構造でも表しておく</strong>必要がある、というのが4系列を合わせた実務上の結論です。
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
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
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
            <span>最終確認: 2026-11(③本人レビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(Apple・W3C・NN groupは本文確認済み。Googleはブレークポイント・マージン・ペインをM3の本文とソースで確認、4dpのグリッドのみ未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Layoutページの「Size classes」見出しへのアンカー付きリンクで、関連する見出しも併記しています。GoogleはM3のブレークポイント(Breakpoints)の概要ページに加え、数値を確認したAndroid Developersのページとソースを併記しています。WCAGは1.4.10 Understandingページの達成基準の箇所を基本リンクとし、2.5.8(間隔の例外の節)・1.3.1も併記しています。NN groupはProximity Principle in Visual Designの記事です。
            </span>
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
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
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
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
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
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
