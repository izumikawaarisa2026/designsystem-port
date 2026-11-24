import React, { useState } from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, SummaryCard, PageLink, SplitSection, Hl, RefList, RelatedPages, GoodBad, hasRow, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Actions / ボタン」ページ。
 * 当初は「押せる範囲」の内容のみだったが、ボタンに関する記載は
 * アクセシビリティ以外にも複数あるため、コンテンツエリア内にセグメンテッドコントロールを設け、
 * 「アクセシビリティ / 種類・優先度 / 状態」の3つを切り替えて比較できるようにしている。
 * 「状態」はトークンレイヤーに独立ページ(インタラクション状態)を作る予定があり、将来的に
 * どちらか良い方へ統合・重複整理する前提で、まずは抜け漏れなく網羅する方針(2026-09)。
 */

const TAB_ACCESSIBILITY = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Accessibility / Buttons",
    value: "44 × 44",
    unit: "pt",
    stance:
      <>押せる範囲は<Hl>既定44×44pt・最小28×28pt</Hl>(iOS/iPadOS)。枠のある要素のまわりに約12pt、枠のない要素は約24ptの余白を取る。</>,
    exceptions:
      "macOSは既定28・最小20pt、watchOSは既定44・最小28pt(プラットフォームで値が違う)。",
    scale: { bands: [{ from: 0, to: 28, type: "ng" }, { from: 28, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }], markers: [{ at: 28, label: "28" }, { at: 44, label: "44" }], caption: "44pt=既定のサイズ・ボタンの押せる範囲 / 28pt=最小のサイズ(iOS/iPadOS、2025年改訂のAccessibilityページ)" },
    pourDetail: "操作可能(Operable) ― 押せる範囲の大きさは「操作可能」に関わる。",
    searchHint: "Offer sufficiently sized controls",
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
    refs: [{ label: "Accessibility ― Mobility", url: "https://developer.apple.com/design/human-interface-guidelines/accessibility#Mobility" }, { label: "Buttons", url: "https://developer.apple.com/design/human-interface-guidelines/buttons" }],
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3",
    value: "48 × 48",
    unit: "dp",
    stance:
      <>押せる範囲は<Hl>48×48dp以上</Hl>。密度を上げても下回らない。</>,
    exceptions:
      "アイコンの見た目(24dpなど)は小さくてよいが、押せる範囲は48dp未満にしない。",
    scale: { bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 48, type: "caution" }, { from: 48, to: 60, type: "ok" }], markers: [{ at: 24, label: "24" }, { at: 48, label: "48" }], caption: "24dp=標準のアイコンの大きさ(XSのアイコンボタンは20dp) / 48dp=タップ判定領域の下限(この2つは別管理)。" },
    pourDetail: "操作可能(Operable) ― 押せる範囲の大きさは「操作可能」に関わる。",
    searchHint: "touch target",
    url: "https://m3.material.io/components/buttons/accessibility",
    refs: [{ label: "Buttons ― Accessibility", url: "https://m3.material.io/components/buttons/accessibility" }],
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.5.5 / 2.5.8",
    value: "24〜44",
    unit: "CSS px",
    stance:
      <><Hl>24×24px以上</Hl>(2.5.8・AA)。足りなければ周りの間隔で補える。AAA(2.5.5)は44×44px。</>,
    exceptions:
      "2.5.8の例外は5つ: ①間隔(中心に直径24pxの円を描き、隣と重ならない)、②同じ機能の十分な大きさのものが別にある、③文中のリンク、④ブラウザ標準のまま、⑤大きさに意味があり欠かせない(地図のピンなど)。",
    scale: { bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }], markers: [{ at: 24, label: "24" }, { at: 44, label: "44" }], caption: "24px=レベルAA(例外あり) / 44px=レベルAAA(例外あり)。" },
    pourDetail: "操作可能(Operable) ― 2.5.8(AA)・2.5.5(AAA)。",
    searchHint: "Target Size",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
    refs: [{ kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" }, { kind: "sc", level: "AAA", label: "2.5.5 ターゲットのサイズ(高度)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html" }],
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Touch Target Size / Fitts's Law",
    value: "約 1 × 1",
    unit: "cm",
    stance:
      <>フィッツの法則を根拠に、<Hl>1cm四方以上</Hl>を目安とする。</>,
    exceptions:
      "密なUIほど、大きさより余白で補う。",
    scale: { bands: [{ from: 0, to: 34, type: "ng" }, { from: 34, to: 42, type: "caution" }, { from: 42, to: 60, type: "ok" }], markers: [{ at: 38, label: "~38" }], caption: "1cmをpx換算した目安(画面密度により変動、幅を持たせて表示)。" },
    pourDetail: "根拠となる原則 ― 適合区分ではなく、フィッツの法則という設計の根拠(なぜ大きいほうがよいか)。",
    searchHint: "1cm",
    url: "https://www.nngroup.com/articles/touch-target-size/",
    refs: [{ label: "Touch Targets on Touchscreens", url: "https://www.nngroup.com/articles/touch-target-size/" }],
  },
];
markNeg(TAB_ACCESSIBILITY);

function MiniButton({ label, style }) {
  return (
    <span style={{ display: "inline-block", fontSize: 9.5, fontWeight: 600, padding: "5px 10px", borderRadius: 14, whiteSpace: "nowrap", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", ...style }}>
      {label}
    </span>
  );
}

const TAB_STYLES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Buttonsページ「Role」",
    term: "Button(役割はNormal・Primary・Cancel・Destructive)",
    position: "意味的な役割で4分類(Normal/Primary/Cancel/Destructive)",
    stance:
      <>役割(Role)で<Hl>Normal・Primary・Cancel・Destructiveの4種類</Hl>。Primaryはアクセントカラー、Destructiveはシステムの赤を使う。壊す操作(Destructive)には、Primaryの役割を割り当てない(読まずに選ばれる危険がある)。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "―(役割の分類はPOURの適合区分ではないが、誤操作を防ぐ点で理解可能に関わる)",
    searchHint: "one of the following roles",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons#Role",
    refs: [{ label: "Buttons ― Role", url: "https://developer.apple.com/design/human-interface-guidelines/buttons#Role" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <MiniButton label="Normal" style={{ background: "#EEF1FA", color: "#454C78", border: "1px solid #D5D9EC" }} />
        <MiniButton label="Primary" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <MiniButton label="Cancel" style={{ background: "transparent", color: "#666D93", border: "1px solid #C7CCE4" }} />
        <MiniButton label="Destructive" style={{ background: "#C0503F", color: "#FFFFFF" }} />
      </div>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― 5種類のボタン",
    term: "Button(Elevated・Filled・Filled tonal・Outlined・Text)",
    position: "優先度(emphasis)で5段階に分類",
    stance:
      <>優先度で<Hl>Elevated・Filled・Filled tonal・Outlined・Textの5種類</Hl>。いちばん目立つのはFilled。M3 Expressiveでは大きさ5段階(高さ32〜136dp)と形2種類も選べる。Elevatedは、背景から分けて見せる必要がある場合に限る。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "―(優先度の分類そのものはPOURの適合区分ではない)",
    searchHint: "five common button types",
    url: "https://m3.material.io/components/buttons/guidelines",
    refs: [{ label: "Buttons ― Guidelines", url: "https://m3.material.io/components/buttons/guidelines" }, { label: "Buttons ― Specs(大きさ・形)", url: "https://m3.material.io/components/buttons/specs" }, { label: "Button groups", url: "https://m3.material.io/components/button-groups/overview" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { n: 1, label: "Elevated", style: { background: "#FFFFFF", color: "#2F7D6E", boxShadow: "0 2px 4px rgba(23,27,54,0.22)" } },
          { n: 2, label: "Filled", style: { background: "#2F7D6E", color: "#FFFFFF" } },
          { n: 3, label: "Filled tonal", style: { background: "#D9ECE7", color: "#1F5A4E" } },
          { n: 4, label: "Outlined", style: { background: "transparent", color: "#2F7D6E", border: "1px solid #2F7D6E" } },
          { n: 5, label: "Text", style: { background: "transparent", color: "#2F7D6E", padding: "5px 4px" } },
        ].map((b) => (
          <div key={b.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#171B36", color: "#FFFFFF", fontSize: 8.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{b.n}</span>
            <MiniButton label={b.label} style={b.style} />
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.11",
    term: "ボタン(WAI-ARIAの役割)",
    position: "種類の分類はなく、見分けやすさの基準のみ",
    stance:
      <>種類の基準はない。ただし<Hl>どの種類のボタンも、境界や状態を背景と3:1以上で見分けられる</Hl>ようにする(1.4.11)。例外: 文字だけのボタンは1.4.11の対象になりにくいが、ラベルの文字には4.5:1(1.4.3)がかかる。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "知覚可能(Perceivable) ― 1.4.11は「知覚可能」の達成基準。",
    searchHint: "Non-text Contrast",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
    refs: [{ kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <MiniButton label="ボタン" style={{ background: "#171B36", color: "#FFFFFF" }} />
          <span style={{ fontSize: 9, color: "#2F7D6E", fontWeight: 700 }}>◯ 4.6:1</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <MiniButton label="ボタン" style={{ background: "#D9DEEF", color: "#666D93" }} />
          <span style={{ fontSize: 9, color: "#C0503F", fontWeight: 700 }}>✕ 1.6:1</span>
        </div>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Similarity Principle in Visual Design",
    term: "Button(主要な操作=Primary、副次的な操作=Secondary)",
    position: "色による優先度づけ(数値基準ではなく原則)",
    stance:
      <><Hl>主要な操作には専用の色を確保し</Hl>、ほかの操作と見分けられるようにする。特定の形を勧めるものではなく、色で優先度を伝える原則。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "根拠となる原則 ― 適合区分ではなく、見た目の知覚(ゲシュタルトの類同の原理)にもとづく設計の根拠。",
    searchHint: "reserved for primary",
    url: "https://www.nngroup.com/articles/gestalt-similarity/",
    refs: [{ label: "Similarity Principle in Visual Design", url: "https://www.nngroup.com/articles/gestalt-similarity/" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 8 }}>
        <MiniButton label="主要な操作" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <MiniButton label="副次的な操作" style={{ background: "#EEF1FA", color: "#666D93" }} />
      </div>
    ),
  },
];
markNeg(TAB_STYLES);

const TAB_STATES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Buttonsページ",
    position: "共通の状態の一覧はなく、プラットフォームごとに定める。独自のボタンには押した状態を必ず用意する",
    stance:
      <>共通の状態の一覧はなく、<Hl>独自に作るボタンには押した状態を必ず用意する</Hl>。時間がかかる処理では、ボタンの中にインジケーターを出し、ラベルを変える(「購入」→「購入中…」)。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "理解可能(Understandable) ― 処理中であることを伝える。",
    searchHint: "activity indicator",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons",
    refs: [{ label: "Buttons", url: "https://developer.apple.com/design/human-interface-guidelines/buttons" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <MiniButton label="購入" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <span style={{ fontSize: 11, color: "#666D93" }}>→</span>
        <MiniButton label="⟳ 購入中…" style={{ background: "#8FAEEF", color: "#FFFFFF" }} />
      </div>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Interaction states",
    position: "6つの状態を体系化(Enabled/Disabled/Hover/Focused/Pressed/Dragged)",
    stance:
      <>状態レイヤーで<Hl>Enabled・Disabled・Hover・Focused・Pressed・Draggedの6状態</Hl>を表す。</>,
    exceptions: "Draggedは主にドラッグできる要素向け。",
    pourDetail: "知覚可能・操作可能 ― 状態を見分けられること(知覚可能)と、操作できるかを伝えること(操作可能)。",
    searchHint: "state layer",
    url: "https://m3.material.io/foundations/interaction/states/overview",
    refs: [{ label: "States", url: "https://m3.material.io/foundations/interaction/states/overview" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <MiniButton label="Enabled" style={{ background: "#2F7D6E", color: "#FFFFFF" }} />
        <MiniButton label="Hover" style={{ background: "#2F7D6E", color: "#FFFFFF", opacity: 0.85 }} />
        <MiniButton label="Focused" style={{ background: "#2F7D6E", color: "#FFFFFF", boxShadow: "0 0 0 2px #A9D6CC" }} />
        <MiniButton label="Pressed" style={{ background: "#1F5A4E", color: "#FFFFFF" }} />
        <MiniButton label="Dragged" style={{ background: "#2F7D6E", color: "#FFFFFF", boxShadow: "0 3px 6px rgba(23,27,54,0.3)" }} />
        <MiniButton label="Disabled" style={{ background: "#E4E7F2", color: "#666D93" }} />
      </div>
    ),
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 1.4.11",
    position: "状態を支援技術に正しく伝える",
    stance:
      <><Hl>今の状態(押せるか、選択中かなど)を支援技術に伝える</Hl>(4.1.2)。状態の見た目は3:1以上(1.4.11)、フォーカスの位置は見えるように(2.4.7)。</>,
    exceptions: "標準のボタンなら多くは自動で伝わる。独自のボタンだけ対応が要る。",
    pourDetail: "堅牢・知覚可能 ― 4.1.2は「堅牢」、1.4.11は「知覚可能」の達成基準。",
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    refs: [{ kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" }, { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" }, { kind: "sc", level: "AA", label: "2.4.7 フォーカスの可視化", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html" }],
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MiniButton label="ボタン" style={{ background: "#171B36", color: "#FFFFFF", boxShadow: "0 0 0 3px #AFC3F5" }} />
        <span style={{ fontSize: 9.5, color: "#565D8A" }}>フォーカスリング(視認可能)</span>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Button States: Communicate Interaction",
    position: "5つの状態を整理(Enabled/Disabled/Hover/Focus/Pressed)",
    stance:
      <><Hl>Enabled・Disabled・Hover・Focus・Pressedの5状態</Hl>で、押せるかどうかを正しく伝える。ほかに処理中(Loading)と選択中(Selected)にも触れる。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "根拠となる原則 ― 適合区分ではなく、押せる/押せないを正しく伝えるための設計の根拠。",
    searchHint: "most commonly used button states",
    url: "https://www.nngroup.com/articles/button-states-communicate-interaction/",
    refs: [{ label: "Button States: Communicate Interaction", url: "https://www.nngroup.com/articles/button-states-communicate-interaction/" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <MiniButton label="Enabled" style={{ background: "#7A4F7E", color: "#FFFFFF" }} />
        <MiniButton label="Hover" style={{ background: "#7A4F7E", color: "#FFFFFF", opacity: 0.85 }} />
        <MiniButton label="Focus" style={{ background: "#7A4F7E", color: "#FFFFFF", boxShadow: "0 0 0 2px #D8C6DA" }} />
        <MiniButton label="Pressed" style={{ background: "#5B3B5E", color: "#FFFFFF" }} />
        <MiniButton label="Disabled" style={{ background: "#E4E7F2", color: "#666D93" }} />
      </div>
    ),
  },
];
markNeg(TAB_STATES);

const TABS = [
  { id: "a11y", label: "押せる範囲の大きさ", data: TAB_ACCESSIBILITY, hasScale: true },
  { id: "styles", label: "種類・優先度", data: TAB_STYLES, hasScale: false },
  { id: "states", label: "状態", data: TAB_STATES, hasScale: false },
];

const BAND_COLOR = {
  ng: { fill: "#F7E4E1", stroke: "#C0503F" },
  caution: { fill: "#FBF0D9", stroke: "#A97A1A" },
  ok: { fill: "#E4F0EC", stroke: "#2F7D6E" },
};

function ButtonSwatch() {
  return (
    <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ background: "#2F6FED", color: "#FFFFFF", fontSize: 12, fontWeight: 600, padding: "9px 18px", borderRadius: 20 }}>登録する</div>
      <div style={{ background: "transparent", color: "#9199BE", fontSize: 12, fontWeight: 600, padding: "8px 17px", borderRadius: 20, border: "1.5px solid #C7CCE4" }}>キャンセル</div>
    </div>
  );
}

function RangeScale({ scale }) {
  const domainMax = 60;
  const w = 264;
  const x = (v) => (v / domainMax) * w;
  return (
    <div style={{ marginBottom: 10 }}>
      <svg viewBox={`0 0 ${w} 44`} style={{ width: "100%", height: "auto", display: "block" }}>
        {scale.bands.map((b, i) => (
          <rect key={i} x={x(b.from)} y={4} width={x(b.to) - x(b.from)} height={14} fill={BAND_COLOR[b.type].fill} stroke={BAND_COLOR[b.type].stroke} strokeWidth="1" />
        ))}
        {[0, 10, 20, 30, 40, 50, 60].map((t) => (
          <line key={t} x1={x(t)} y1={18} x2={x(t)} y2={22} stroke="#D5D9EC" strokeWidth="1" />
        ))}
        {scale.markers.map((m, i) => (
          <g key={i}>
            <line x1={x(m.at)} y1={1} x2={x(m.at)} y2={20} stroke="#171B36" strokeWidth="1.4" />
            <circle cx={x(m.at)} cy={1} r="2" fill="#171B36" />
            <text x={x(m.at)} y={34} fontSize="9" fontFamily="IBM Plex Mono" fill="#171B36" textAnchor="middle" fontWeight="600">{m.label}</text>
          </g>
        ))}
      </svg>
      <p style={{ fontSize: 11, color: "#565D8A", margin: "4px 0 0", lineHeight: 1.5 }}>{scale.caption}</p>
    </div>
  );
}

const SYNTHESIS = {
  a11y: [
    <>Appleは既定44×44pt・<strong>最小28×28pt</strong>(iOS/iPadOS)の2段階を示し、枠のある要素のまわりに約12ptの余白を勧める。W3Cの2.5.8も、24×24 CSS pxに足りない分を周りの間隔で補う例外を持つ。<strong>大きさが足りない分を間隔で補う考え方は、Apple・W3Cに共通</strong>する。</>,
    <>数値に24〜48という幅があるのは、<strong>最低ライン(W3C 2.5.8・AA)</strong>と、<strong>快適に押せる目安(Apple 44pt・Google 48dp・W3C 2.5.5のAAA 44 CSS px・NN groupの約1cm四方)</strong>という、違う問いに答えているため。</>,
    <>主なボタンは<strong>44pt(Apple)・48dp(Google)を基準</strong>にする。密な画面で縮めるときの最低ラインは、<strong>W3C 2.5.8の24×24 CSS px(AA・例外あり)</strong>。それより小さくするなら、中心に描いた直径24 CSS pxの円が隣と重ならない<strong>間隔を空ける</strong>。</>,
  ],
  styles: [
    <>ボタンを「種類」で分ける発想はAppleとGoogleに共通しているが、<strong>分け方の軸が違う</strong>。Appleは「何のための操作か」という意味(Role)、Googleは「どれだけ目立たせるか」という優先度(emphasis)で分類している。</>,
    <>WCAGは種類そのものを定義しないが、<strong>1.4.11のコントラスト基準はすべての種類のボタンに等しく適用される</strong>。NN groupの「主要操作には専用の色を」という指摘は、AppleのPrimary・GoogleのFilledの両方に共通する。</>,
  ],
  states: [
    <>Enabled・Hover・Focused・Pressed・Disabledという<strong>基本の状態はGoogleとNN groupでほぼ一致</strong>している。Appleは共通の状態の一覧を持たず、プラットフォームごとに定めている(独自のボタンには押した状態を必ず用意する)。</>,
    <>WCAGは見た目そのものより、<strong>状態が支援技術に正しく伝わるか(4.1.2)</strong>を重視する。ブラウザ標準のボタンなら、多くの場合は自動的に満たされる。</>,
  ],
};

/* タブ1つ分の中身。通常は選んだタブだけを表示し、静的HTMLの書き出し時(window.__DSP_STATIC__)は全タブを並べる */
function ButtonTabContent({ tabId }) {
  const tab = TABS.find((t) => t.id === tabId) || TABS[0];
  const SOURCES = tab.data;
  return (
    <>
    <div style={styles.synthesisBox}>
      <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
      {SYNTHESIS[tabId].map((node, i) => (<p key={i} style={styles.synthesisText}>{node}</p>))}
    </div>

    <div className="dsp-mobile-only" style={styles.sourceList}>
      {SOURCES.map((s) => (
        <div key={s.key} style={styles.sourceCard}>
          <div style={styles.sourceHeadRow}>
            <div>
              <div style={styles.sourceName}>{s.name}</div>
              <div style={styles.sourceDoc}>{s.doc}</div>
            </div>
            {tab.hasScale && (
              <div style={styles.sourceValueWrap}>
                <span style={styles.sourceValue}>{s.value}</span>
                <span style={styles.sourceUnit}>{s.unit}</span>
              </div>
            )}
          </div>
          {!tab.hasScale && s.term && <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>}
          {!tab.hasScale && <div style={styles.positionBadge}>{s.position}</div>}
          <p style={styles.sourceStance}>{s.stance}</p>
          {hasRow(SOURCES, "exceptions") && (<div style={styles.exceptionBox}>
            <span style={styles.exceptionLabel}>例外・許容ケース</span>
            <p style={styles.exceptionText}>{s.exceptions}</p>
          </div>)}
          {!tab.hasScale && s.illustration && (
            <div style={styles.illustrationBox}>{s.illustration()}</div>
          )}
          {tab.hasScale && (
            <div style={{ maxWidth: 220 }}>
              <RangeScale scale={s.scale} />
            </div>
          )}
          <div style={styles.pourBox}>
            <span style={styles.exceptionLabel}>アクセシビリティ(WCAG基準)</span>
            <p style={styles.exceptionText}>{s.pourDetail}</p>
          </div>
          <div style={styles.pourBox}>
            <span style={styles.exceptionLabel}>参照ページ(公式)</span>
            <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
          </div>
        </div>
      ))}
    </div>

    <div className="dsp-desktop-only">
      <h2 style={styles.diagramTitle}>四系列デザインシステム比較 ― {tab.label}</h2>
      <div style={styles.matrixScroll}>
        <div style={styles.matrixGrid}>
          <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
          {SOURCES.map((s) => (
            <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
              <div style={styles.sourceName}>{s.name}</div>
              <div style={styles.sourceDoc}>{s.doc}</div>
            </div>
          ))}
          {tab.hasScale ? (
            <>
              <div style={styles.labelCell}>基準値</div>
              {SOURCES.map((s) => (
                <div key={s.key} style={styles.cell}>
                  <span style={styles.value}>{s.value}</span>
                  <span style={styles.unit}>{s.unit}</span>
                </div>
              ))}
              <div style={styles.labelCell}>許容レンジ</div>
              {SOURCES.map((s) => (<div key={s.key} style={styles.cell}><div style={{ width: "100%", maxWidth: 170 }}><RangeScale scale={s.scale} /></div></div>))}
            </>
          ) : (
            <>
              {SOURCES.some((s) => s.term) && (<>
              <div style={styles.labelCell}>名称</div>
              {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
              </>)}
              <div style={styles.labelCell}>位置づけ</div>
              {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
              <div style={styles.labelCell}>見た目イメージ</div>
              {SOURCES.map((s) => (<div key={s.key} style={styles.cell}>{s.illustration ? s.illustration() : null}</div>))}
            </>
          )}
          <div style={styles.labelCell}>基本方針</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
          {hasRow(SOURCES, "exceptions") && (<>
            <div style={styles.labelCell}>例外・許容ケース</div>
            {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
          </>)}
          <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>))}
          <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
          {SOURCES.map((s) => (
            <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, display: "block" }}>
              <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {tabId === "a11y" && (
      <>
        <GoodBadFigure />

        <div style={styles.diagramCard}>
          <h2 style={styles.diagramTitle}>参考: 四系列比較図(実寸オーバーレイ)</h2>
          <svg viewBox="0 0 240 96" style={{ width: "100%", height: "auto" }}>
            <rect x="8" y="6" width="70" height="70" fill="none" stroke="#2F7D6E" strokeWidth="1.6" />
            <rect x="8" y="15" width="61" height="61" fill="none" stroke="#C2542A" strokeWidth="1.6" />
            <rect x="10" y="17" width="61" height="61" fill="none" stroke="#A3821F" strokeWidth="1.2" strokeDasharray="4 3" />
            <rect x="8" y="29" width="47" height="47" fill="#7A4F7E" fillOpacity="0.08" stroke="#7A4F7E" strokeWidth="1.6" />
            <text x="92" y="14" fontSize="9.5" fill="#2F7D6E" fontFamily="IBM Plex Mono" fontWeight="600">Material 48dp</text>
            <text x="92" y="30" fontSize="9.5" fill="#C2542A" fontFamily="IBM Plex Mono" fontWeight="600">HIG 44pt</text>
            <text x="92" y="46" fontSize="9.5" fill="#A3821F" fontFamily="IBM Plex Mono" fontWeight="600">WCAG AAA 44px</text>
            <text x="92" y="62" fontSize="9.5" fill="#7A4F7E" fontFamily="IBM Plex Mono" fontWeight="600">NN 約1cm(目安)</text>
          </svg>
        </div>
        <div style={styles.legendRow}>
          <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ok.fill, borderColor: BAND_COLOR.ok.stroke }} />推奨</span>
          <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.caution.fill, borderColor: BAND_COLOR.caution.stroke }} />条件付き</span>
          <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ng.fill, borderColor: BAND_COLOR.ng.stroke }} />非推奨</span>
        </div>
      </>
    )}
    </>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "押すとその場で処理(保存・送信・削除など)を実行するコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "利用者が選んだ操作を、押した瞬間に実行する" },
  { k: "よく使われる場面", v: "フォームの送信、ダイアログの「OK」「キャンセル」、画面の主な操作(購入・保存)" },
  { k: "似たコンポーネント", v: <>別のページへ遷移するなら<PageLink to="/components/actions/link">リンク</PageLink>、画面の上に浮かべて主な操作を1つだけ置くなら<PageLink to="/components/actions/fab">フローティングアクションボタン</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "ボタンの種類は、何で分ける?",
    sides: [
      { who: "Apple", color: "#C2542A", t: "操作の意味(役割)で4つに分ける。Normal・Primary(最も選ばれやすい既定の操作)・Cancel・Destructive(削除など)。役割に応じて色が変わる" },
      { who: "Google", color: "#2F7D6E", t: "どれだけ目立たせるか(優先度)で5つに分ける。Elevated・Filled・Filled tonal・Outlined・Text" },
      { who: "NN group", color: "#7A4F7E", t: "種類の決まりはなく、主要な操作には専用の色を当てて、副次的な操作と見分けられるようにする" },
    ],
    tip: "「何の操作か(Apple)」と「どれだけ目立たせるか(Google)」は両立する。まず操作の意味を決め、そのうえで画面の中の優先度で見た目を選ぶ。削除のような操作は、選ばれやすくても目立つ見た目にしない(Apple)点に気をつける。",
  },
  {
    q: "押せる範囲の最小は?",
    sides: [
      { who: "Apple", color: "#C2542A", t: "既定44×44pt・最小28×28pt(iOS・iPadOS)。足りない分は周りの余白(枠のあるコンポーネントで約12pt)で補う" },
      { who: "Google", color: "#2F7D6E", t: "48×48dp。見た目が小さくても、押せる範囲は48dpを確保する" },
      { who: "W3C", color: "#A3821F", t: "24×24 CSS px(2.5.8・AA)/44×44 CSS px(2.5.5・AAA)。どちらも例外あり。小さい場合は、中心の直径24 CSS pxの円が隣と重ならない間隔で補える" },
      { who: "NN group", color: "#7A4F7E", t: "数値基準ではなく目安として約1cm四方" },
    ],
    tip: "24 CSS px(W3CのAA)は「最低ライン」、44pt(Apple)・48dp(Google)・44 CSS px(W3CのAAA)は「快適に押せる目安」と、答えている問いが違う。主なボタンは44pt・48dpを基準にし、密な画面で24 CSS pxより小さくするなら、周りに十分な間隔を空ける(2.5.8・例外あり。詳しくは下の「押せる範囲の大きさ」)。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "主なボタンの押せる範囲は44pt・48dp", d: "Apple 44×44pt、Google 48×48dp", who: "Apple・Google" },
  { n: 2, t: "24 CSS px未満にするなら、周りに間隔を空ける", d: "24×24 CSS pxが最低ライン。足りない分は周りの間隔で補える(例外あり)", who: "W3C 2.5.8" },
  { n: 3, t: "まず操作の意味を決め、次に目立たせ方を選ぶ", d: "役割(Apple)と優先度(Google)は両立する", who: "AI解釈" },
  { n: 4, t: "削除のような操作は目立たせすぎない", d: "選ばれやすくても目立つ見た目にしない", who: "Apple" },
  { n: 5, t: "主な操作と副次的な操作を見分けられるように", d: "主な操作に専用の色を当てる", who: "NN group" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
          title="良い例・悪い例 ― 押せる範囲"
          items={[
            { kind: "good", fig: <><svg width="200" height="70" viewBox="0 0 200 70" aria-hidden="true">
          {[30, 100, 170].map((x) => (<g key={x}><rect x={x - 24} y="11" width="48" height="48" fill="none" stroke="#2F7D6E" strokeDasharray="4 3" /><rect x={x - 11} y="24" width="22" height="22" rx="5" fill="#3A4FCF" /></g>))}
        </svg><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>点線=押せる範囲(概念図)</span></>, text: "見た目は小さいボタンでも、押せる範囲(点線)をApple 44×44pt・Google 48×48dp確保し、隣と重ならない。" },
            { kind: "bad", fig: <><svg width="200" height="70" viewBox="0 0 200 70" aria-hidden="true">
          {[76, 100, 124].map((x) => (<g key={x}><rect x={x - 24} y="11" width="48" height="48" fill="none" stroke="#C0503F" strokeDasharray="4 3" /><rect x={x - 11} y="24" width="22" height="22" rx="5" fill="#3A4FCF" /></g>))}
        </svg><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>点線=押せる範囲(概念図)</span></>, text: "小さいボタンが余白なしで並び、押せる範囲が重なる。押し間違えやすい。" },
          ]}
          basis="Apple(既定44×44pt。足りない分は周りの余白で補う)、Google(48×48dp)、W3C 2.5.8(24×24 CSS px・AA。例外あり。小さい場合は、中心に描いた直径24pxの円が隣と重ならない間隔で補える)。"
        />
  );
}

export default function ActionsButtonPage() {
  const [tabId, setTabId] = useState("a11y");
  const isStatic = typeof window !== "undefined" && window.__DSP_STATIC__;

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
        <SidebarNav currentPath="/components/actions/button" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ボタン</span>
            <span>SPEC No. 001</span>
          </div>

          <h1 style={styles.title}>ボタン</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ"
            image={<ButtonSwatch />}
            imageNote="優先度の異なる2つの見た目の例(強調 / 中間)。系列によって呼び方や境界は異なる。"
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#454C78", margin: "-4px 0 12px" }}>ボタンは比べる観点が多いため、3つに分けて比べる。<strong>押せる範囲の大きさ</strong>(何pt・dp・pxか)、<strong>種類・優先度</strong>(見た目の分け方)、<strong>状態</strong>(押せる・押した・使えないなど)。下のボタンで切り替える。</p>

          {isStatic && (
            <nav style={styles.segmented} aria-label="比較する項目へ移動">
              {TABS.map((t) => (<a key={t.id} href={"#btn-" + t.id} style={{ ...styles.segItem, textDecoration: "none", textAlign: "center" }}>{t.label}</a>))}
            </nav>
          )}

          {!isStatic && <div style={styles.segmented} role="tablist" aria-label="比較する項目">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tabId === t.id}
                onClick={() => setTabId(t.id)}
                style={{ ...styles.segItem, ...(tabId === t.id ? styles.segItemActive : {}) }}
              >
                {t.label}
              </button>
            ))}
          </div>}

          {isStatic ? (
            TABS.map((t) => (
              <section key={t.id} id={"btn-" + t.id} style={{ marginBottom: 40 }}>
                <h2 style={styles.staticTabTitle}>{t.label}</h2>
                <ButtonTabContent tabId={t.id} />
              </section>
            ))
          ) : (
            <ButtonTabContent tabId={tabId} />
          )}

          <RelatedPages paths={["/tokens/interaction-states", "/components/actions/fab", "/components/actions/link", "/tokens/shape", "/principles/accessibility"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["操作方法(タッチ・キーボード)"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              状態の見た目(重ね色の不透明度など)の詳しい比較は「インタラクション状態」ページ、押せる範囲の間隔(2.5.8の直径24pxの円)の図は「レイアウト・スペーシング」ページも参照。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 18px" },
  segmented: { display: "inline-flex", gap: 4, background: "#F3F6FA", padding: 4, borderRadius: 8, marginBottom: 20, flexWrap: "wrap" },
  segItem: { appearance: "none", border: "none", background: "transparent", color: "#454C78", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 13, padding: "7px 14px", borderRadius: 6, cursor: "pointer" },
  segItemActive: { background: "#171B36", color: "#FFFFFF", fontWeight: 500 },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  staticTabTitle: { fontSize: 17, fontWeight: 700, color: "#171B36", margin: "8px 0 12px", paddingTop: 12, borderTop: "2px solid #171B36" },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "12px 16px", marginBottom: 14, maxWidth: 420 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 10px", color: "#171B36" },
  legendRow: { display: "flex", gap: 14, marginBottom: 20, fontSize: 11, color: "#565D8A", fontFamily: "'IBM Plex Mono', monospace" },
  legendItem: { display: "flex", alignItems: "center", gap: 5 },
  legendSwatch: { display: "inline-block", width: 10, height: 10, border: "1px solid", borderRadius: 2 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  sourceValueWrap: { textAlign: "right" },
  sourceValue: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 15, color: "#171B36" },
  sourceUnit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#666D93", marginLeft: 3 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "8px 0 10px" },
  exceptionBox: { background: "#FFFFFF", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  illustrationBox: { margin: "10px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: {},
  value: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14 },
  unit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#666D93", marginLeft: 4 },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
