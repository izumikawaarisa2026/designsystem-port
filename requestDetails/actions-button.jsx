import React, { useState } from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Actions / ボタン」ページ。
 * 当初は「タップ領域」の内容のみだったが、ボタンに関する記載は
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
      "Buttonsのページでは、ボタンの押せる範囲(ヒット領域)を少なくとも44×44pt(visionOSは60×60pt)にするとしている。Accessibilityのページ(2025年3月の改訂)では、プラットフォームごとの「既定のサイズ」と「最小のサイズ」を表で示し、iOS/iPadOSは既定44×44pt・最小28×28ptとしている。小さすぎるコントロールは多くの人にとって選びにくいため、推奨の最小サイズを満たすよう求めている。",
    exceptions:
      "Accessibilityのページの表で、28×28pt(iOS/iPadOS)までの小さいコントロールを最小のサイズとして認めている(macOSは既定28・最小20、tvOSは既定66・最小56、visionOSは既定60・最小28)。あわせて、部品どうしの間隔も大きさと同じくらい重要だとし、枠のある要素のまわりに約12pt、枠のない要素は見える端のまわりに約24ptの余白を取るとよいとしている。",
    scale: { bands: [{ from: 0, to: 28, type: "ng" }, { from: 28, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }], markers: [{ at: 28, label: "28" }, { at: 44, label: "44" }], caption: "44pt=既定のサイズ・ボタンの押せる範囲 / 28pt=最小のサイズ(iOS/iPadOS、2025年改訂のAccessibilityページ)" },
    pourDetail: "操作可能(Operable) ― WCAGのPOUR原則のうち「操作可能」に対応する項目、という分類。",
    searchHint: "Offer sufficiently sized controls",
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3",
    value: "48 × 48",
    unit: "dp",
    stance:
      "インタラクティブな要素は最小48×48dpのタッチターゲットを満たすことを基準とする。密度(density)を上げる場合でも、この最小値を下回らないよう明記している。",
    exceptions:
      "アイコン自体の可視サイズ(24dpなど)を小さくすることは認めているが、タップ判定領域そのものを48×48dp未満に縮めることは推奨していない。押せる範囲は48×48を下回らないのが望ましい、という考え方をとっている。",
    scale: { bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 48, type: "caution" }, { from: 48, to: 60, type: "ok" }], markers: [{ at: 24, label: "24" }, { at: 48, label: "48" }], caption: "24dp=可視アイコンの下限 / 48dp=タップ判定領域の下限(この2つは別管理)。" },
    pourDetail: "操作可能(Operable) ― WCAGのPOUR原則のうち「操作可能」に対応する項目、という分類。",
    searchHint: "touch target",
    url: "https://m3.material.io/components/buttons/accessibility",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.5.5 / 2.5.8",
    value: "24〜44",
    unit: "CSS px",
    stance:
      "レベルAA(2.5.8)は24×24px以上を基本とし、足りない場合は周りの間隔で補えるとする。より厳しいレベルAAA(2.5.5)では44×44pxを求める、と段階的に基準を分けている。",
    exceptions:
      "2.5.8(AA)の例外は5つ: ①間隔(24px未満なら、ターゲットの中心に直径24pxの円を描き、隣のターゲットや隣の円と重ならない)、②同じ機能を持つ十分な大きさのターゲットが同じページに別にある、③文中のリンクなど、文章の行の中にある、④ブラウザなどユーザーエージェントが大きさを決めていて作り手が変えていない、⑤その大きさや配置そのものに意味があり欠かせない(地図のピンなど)。どれかに当てはまれば24px未満でも適合する。2.5.5(AAA)の44pxにも、②〜⑤と同じ種類の例外がある。こうした条件分岐は他の3系列にはない特徴。",
    scale: { bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }], markers: [{ at: 24, label: "24" }, { at: 44, label: "44" }], caption: "24px=レベルAA(例外あり) / 44px=レベルAAA(例外あり)。" },
    pourDetail: "操作可能(Operable) ― POUR原則(WCAGの4原則: 知覚可能・操作可能・理解可能・堅牢)そのものを定義している一次情報。他の3系列が従う分類の出どころ。",
    searchHint: "Target Size",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Touch Target Size / Fitts's Law",
    value: "約 1 × 1",
    unit: "cm",
    stance:
      "数値基準そのものより、フィッツの法則(対象が小さく遠いほど到達に時間がかかる)という根拠から、指の平均接地面積を踏まえた最小1cm四方を目安として提示している。",
    exceptions:
      "明確な緩和条件は提示していないが、単一ターゲットの操作と複数ターゲットが密集する操作とでは要求精度が異なると指摘。密なUIほど、サイズより余白での代替を推奨する傾向がある(数値の例外というより設計判断の指針)。",
    scale: { bands: [{ from: 0, to: 34, type: "ng" }, { from: 34, to: 42, type: "caution" }, { from: 42, to: 60, type: "ok" }], markers: [{ at: 38, label: "~38" }], caption: "1cmをpx換算した目安(画面密度により変動、幅を持たせて表示)。" },
    pourDetail: "根拠となる原則 ― POURのような適合区分ではなく、フィッツの法則という設計上の根拠(なぜ大きい方がよいか)を示す位置づけ。",
    searchHint: "1cm",
    url: "https://www.nngroup.com/articles/touch-target-size/",
  },
];

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
    position: "意味的な役割で4分類(Normal/Primary/Cancel/Destructive)",
    stance:
      "ボタンには「Role(役割)」という概念があり、Normal(特に意味を持たない)・Primary(最も選ばれやすい既定のボタン)・Cancel(操作の取り消し)・Destructive(データ削除などを伴う操作)の4種類に分類しています。役割によって見た目も変わり、たとえばPrimaryはアプリのアクセントカラーを、Destructiveはシステムの赤を使います。",
    exceptions: "破壊的な操作(Destructive)には、それが選ばれやすい操作であってもPrimaryの役割を割り当てるべきではないとしています。見た目の目立ちやすさゆえに、内容を読まずに選んでしまう危険があるためです。",
    pourDetail: "―(役割分類そのものはPOURの適合区分ではないが、誤操作防止という点で理解可能性に関わる)",
    searchHint: "one of the following roles",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons#Role",
    illustration: () => (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <MiniButton label="Normal" style={{ background: "#EEF1FA", color: "#454C78", border: "1px solid #D5D9EC" }} />
        <MiniButton label="Primary" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <MiniButton label="Cancel" style={{ background: "transparent", color: "#7E86AC", border: "1px solid #C7CCE4" }} />
        <MiniButton label="Destructive" style={{ background: "#C0503F", color: "#FFFFFF" }} />
      </div>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― 5種類のボタン",
    position: "優先度(emphasis)で5段階に分類",
    stance:
      "①Elevated・②Filled・③Filled tonal・④Outlined・⑤Textの5種類を定義しています。番号は公式の並び順です(公式のドキュメントは強調度の順として①Elevatedから並べる一方、Filledを「FABの次に最も目立つボタン」と説明しています)。見た目で最も目立つのはFilledです。",
    exceptions: "Elevatedは実質的にFilled tonalに影を加えたものと位置づけられており、背景と視覚的に分離する必要がある場合に限って使うべきとしています(影の使いすぎを避けるため)。",
    pourDetail: "―(優先度の分類そのものはPOURの適合区分ではない)",
    searchHint: "five common button types",
    url: "https://m3.material.io/components/buttons/guidelines",
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
    position: "種類の分類はなく、見分けやすさの基準のみ",
    stance:
      "ボタンの視覚的な「種類」を分類する基準は持っていません。ただし1.4.11(非テキストのコントラスト)が、ボタンの境界線や状態を周囲の背景から見分けられる十分なコントラスト(3:1以上)で示すことを求めており、種類を問わずすべてのボタンに関わります。",
    exceptions: "文字だけで表現され、背景との境界線や塗りを持たないボタン(Materialの「Text」相当)は、1.4.11の対象になりにくいという整理です。ただし、ラベルの文字そのものには1.4.3(文字のコントラスト。通常の文字は4.5:1以上)がかかります。",
    pourDetail: "知覚可能(Perceivable) ― 1.4.11はPOUR原則のうち「知覚可能」に対応する達成基準です。",
    searchHint: "Non-text Contrast",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
    illustration: () => (
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <MiniButton label="ボタン" style={{ background: "#171B36", color: "#FFFFFF" }} />
          <span style={{ fontSize: 9, color: "#2F7D6E", fontWeight: 700 }}>◯ 4.6:1</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <MiniButton label="ボタン" style={{ background: "#D9DEEF", color: "#B7BCDA" }} />
          <span style={{ fontSize: 9, color: "#C0503F", fontWeight: 700 }}>✕ 1.6:1</span>
        </div>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Similarity Principle in Visual Design",
    position: "色による優先度づけ(数値基準ではなく原則)",
    stance:
      "主要な操作(Primary)には専用の色を確保し、副次的な操作(Secondary)と視覚的に区別すべきとしています。同じ色のボタンが並んでいると、ユーザーはそれらを同じ重要度だと知覚してしまうため、主要な操作を見分けにくくなると指摘しています。",
    exceptions: "特定のボタン形状(塗り・枠線・文字のみなど)を推奨する基準ではなく、色による優先度の伝え方についての原則です。",
    pourDetail: "根拠となる原則 ― POURのような適合区分ではなく、視覚的知覚(ゲシュタルトの類同の原理)に基づく設計根拠です。",
    searchHint: "reserved for primary",
    url: "https://www.nngroup.com/articles/gestalt-similarity/",
    illustration: () => (
      <div style={{ display: "flex", gap: 8 }}>
        <MiniButton label="主要な操作" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <MiniButton label="副次的な操作" style={{ background: "#EEF1FA", color: "#7E86AC" }} />
      </div>
    ),
  },
];

const TAB_STATES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Buttonsページ",
    position: "個別の状態名を列挙せず、システム標準の挙動に委ねる",
    stance:
      "Enabled/Hover/Pressedのような状態を個別に定義するのではなく、システムが提供する標準の見た目・挙動を使うことを基本方針としています。処理に時間がかかる操作では、ボタン内にアクティビティインジケーターを表示し、ラベルを一時的に変更する(例:「購入」→「購入中…」)方法を案内しています。",
    exceptions: "配信中の状態を示す際、ボタンの画像を隠してインジケーターとラベルを表示する、という具体的な切り替え方法が示されています。",
    pourDetail: "理解可能(Understandable) ― 処理中であることを伝える点は理解可能性に関わります。",
    searchHint: "activity indicator",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons",
    illustration: () => (
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <MiniButton label="購入" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <span style={{ fontSize: 11, color: "#9EA4C4" }}>→</span>
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
      "すべてのインタラクティブ要素に共通する「状態レイヤー(state layer)」という仕組みで、Enabled・Disabled・Hover・Focused・Pressed・Draggedの6状態を管理しています。Disabled状態は、有効時は強いコントラストのコンテナと文字を持つのに対し、無効時はグレー地にグレー文字という低コントラストで表現される、という具体例が示されています。",
    exceptions: "Draggedは主にドラッグ操作が可能な要素(FABなど)向けの状態で、通常のボタンには適用されない場合があります。",
    pourDetail: "知覚可能・操作可能 ― 状態を視覚的に区別できることは知覚可能性に、操作可否を伝えることは操作可能性に関わります。",
    searchHint: "state layer",
    url: "https://m3.material.io/foundations/interaction/states/overview",
    illustration: () => (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <MiniButton label="Enabled" style={{ background: "#2F7D6E", color: "#FFFFFF" }} />
        <MiniButton label="Hover" style={{ background: "#2F7D6E", color: "#FFFFFF", opacity: 0.85 }} />
        <MiniButton label="Focused" style={{ background: "#2F7D6E", color: "#FFFFFF", boxShadow: "0 0 0 2px #A9D6CC" }} />
        <MiniButton label="Pressed" style={{ background: "#1F5A4E", color: "#FFFFFF" }} />
        <MiniButton label="Dragged" style={{ background: "#2F7D6E", color: "#FFFFFF", boxShadow: "0 3px 6px rgba(23,27,54,0.3)" }} />
        <MiniButton label="Disabled" style={{ background: "#E4E7F2", color: "#B7BCDA" }} />
      </div>
    ),
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 1.4.11",
    position: "状態を支援技術に正しく伝えることを要求",
    stance:
      "4.1.2(Name, Role, Value)は、ボタンの現在の状態(押せる・押せない、選択中かどうかなど)が支援技術からプログラム的に取得できることを求めています。1.4.11は状態変化時の見た目(フォーカスリングなど)にも十分なコントラストを求めます。",
    exceptions: "標準的なHTMLのbutton要素を使っていれば、多くの場合ブラウザが自動的にこれらの情報を提供します。独自にデザインしたカスタムボタンでのみ追加対応が必要です。",
    pourDetail: "堅牢・知覚可能 ― 4.1.2は「堅牢」、1.4.11は「知覚可能」に対応する達成基準です。",
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
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
      "Enabled(既定、押せる)・Disabled(押せない)・Hover・Focus・Pressedの5状態を、押せるかどうかをユーザーに正しく伝えるための仕組みとして整理しています。Enabled状態は背景と文字の高いコントラスト、はっきり読めるラベルを特徴とするとしています。",
    exceptions: "この5つのほかに、処理中を示すLoadingと、選ばれていることを示すSelectedの状態にも触れています。また「状態(States)」と「種類・見た目のスタイル(Styles)」を明確に別の概念として区別しており、両者を混同しないよう注意を促しています。",
    pourDetail: "根拠となる原則 ― POURのような適合区分ではなく、押せる/押せないを正しく伝えるための設計根拠です。",
    searchHint: "most commonly used button states",
    url: "https://www.nngroup.com/articles/button-states-communicate-interaction/",
    illustration: () => (
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <MiniButton label="Enabled" style={{ background: "#7A4F7E", color: "#FFFFFF" }} />
        <MiniButton label="Hover" style={{ background: "#7A4F7E", color: "#FFFFFF", opacity: 0.85 }} />
        <MiniButton label="Focus" style={{ background: "#7A4F7E", color: "#FFFFFF", boxShadow: "0 0 0 2px #D8C6DA" }} />
        <MiniButton label="Pressed" style={{ background: "#5B3B5E", color: "#FFFFFF" }} />
        <MiniButton label="Disabled" style={{ background: "#E4E7F2", color: "#B7BCDA" }} />
      </div>
    ),
  },
];

const TABS = [
  { id: "a11y", label: "アクセシビリティ", data: TAB_ACCESSIBILITY, hasScale: true },
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
    <>Appleも2025年3月の改訂で、既定44pt・<strong>最小28pt</strong>の2段階を示すようになり、W3Cの「24px以上か、足りなければ周りの間隔で補う」と同じく、<strong>大きさが足りない分を間隔で補う</strong>考え方(枠のある要素のまわりに約12pt)が4系列で近づいた。</>,
    <>数値の下限には24〜48pxという幅があるが、これは<strong>「絶対最低ライン」(WCAG AA)</strong>と<strong>「快適に押せる目安」(HIG・Material・NN)</strong>という異なる問いに答えているために生じる差にすぎない。</>,
    <>実務では<strong>主要なアクションボタンは44〜48px前後を基準</strong>にし、密なUIでやむを得ず縮める場合のみ、WCAG AAの<strong>24px以上</strong>を最終防衛ラインとし、どうしてもそれより小さくする場合だけ<strong>間隔で補う</strong>(中心の直径24pxの円が隣と重ならない)のが現実的な着地点。</>,
  ],
  styles: [
    <>ボタンを「種類」で分ける発想はAppleとGoogleに共通しているが、<strong>分け方の軸が違う</strong>。Appleは「何のための操作か」という意味(Role)、Googleは「どれだけ目立たせるか」という優先度(emphasis)で分類している。</>,
    <>WCAGは種類そのものを定義しないが、<strong>1.4.11のコントラスト基準はすべての種類のボタンに等しく適用される</strong>。NN groupの「主要操作には専用の色を」という指摘は、AppleのPrimary・GoogleのFilledの両方に共通する考え方と言える。</>,
  ],
  states: [
    <>Enabled・Hover・Focused・Pressed・Disabledという<strong>基本の状態はGoogleとNN groupでほぼ一致</strong>している。Appleだけは個別の状態を列挙せず、システム標準の挙動に委ねる立場を取っている。</>,
    <>WCAGは見た目そのものより、<strong>状態が支援技術に正しく伝わるか(4.1.2)</strong>を重視する。標準的なHTML要素を使っていれば、多くの場合は自動的に満たされる。</>,
  ],
};

/* タブ1つ分の中身。通常は選んだタブだけを表示し、静的HTMLの書き出し時(window.__DSP_STATIC__)は全タブを並べる */
function ButtonTabContent({ tabId }) {
  const tab = TABS.find((t) => t.id === tabId) || TABS[0];
  const SOURCES = tab.data;
  return (
    <>
    <div style={styles.synthesisBox}>
      <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
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
          {!tab.hasScale && <div style={styles.positionBadge}>{s.position}</div>}
          <p style={styles.sourceStance}>{s.stance}</p>
          <div style={styles.exceptionBox}>
            <span style={styles.exceptionLabel}>例外・許容ケース</span>
            <p style={styles.exceptionText}>{s.exceptions}</p>
          </div>
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
          <div style={styles.sourceFootRow}>
            <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
            <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
          </div>
        </div>
      ))}
    </div>

    <div className="dsp-desktop-only">
      <h2 style={styles.diagramTitle}>ボタンデザインシステム比較 ― {tab.label}</h2>
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
              <div style={styles.labelCell}>位置づけ</div>
              {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
              <div style={styles.labelCell}>見た目イメージ</div>
              {SOURCES.map((s) => (<div key={s.key} style={styles.cell}>{s.illustration ? s.illustration() : null}</div>))}
            </>
          )}
          <div style={styles.labelCell}>基本方針</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
          <div style={styles.labelCell}>例外・許容ケース</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
          <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>))}
          <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>リンク</div>
          {SOURCES.map((s) => (
            <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
              <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
              <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {tabId === "a11y" && (
      <>
        <div style={styles.diagramCard}>
          <h2 style={styles.diagramTitle}>参考: 四サイト比較図(実寸オーバーレイ)</h2>
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
          <p style={styles.subtitle}>4つのガイドラインが、ボタンについて定めている内容を項目ごとに比較する</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ</span>
            <ButtonSwatch />
            <p style={styles.swatchNote}>優先度の異なる2つの見た目の例(強調 / 中間)。系列によって呼び方や境界は異なる。</p>
          </div>

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
              <section key={t.id} style={{ marginBottom: 28 }}>
                <h2 style={styles.staticTabTitle}>{t.label}</h2>
                <ButtonTabContent tabId={t.id} />
              </section>
            ))
          ) : (
            <ButtonTabContent tabId={tabId} />
          )}

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["操作方法(タッチ・キーボード)"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(AppleのAccessibility・Buttonsのページは2026-10に本文を再確認し、2025年改訂の最小28ptを反映)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              状態の見た目(重ね色の不透明度など)の詳しい比較は「インタラクション状態」ページ、押せる範囲の数値の詳しい比較は「入力方法・ジェスチャー」ページも参照してください。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 18px" },
  segmented: { display: "inline-flex", gap: 4, background: "#F3F6FA", padding: 4, borderRadius: 8, marginBottom: 20, flexWrap: "wrap" },
  segItem: { appearance: "none", border: "none", background: "transparent", color: "#454C78", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 13, padding: "7px 14px", borderRadius: 6, cursor: "pointer" },
  segItemActive: { background: "#171B36", color: "#FFFFFF", fontWeight: 500 },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
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
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  sourceValueWrap: { textAlign: "right" },
  sourceValue: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 15, color: "#171B36" },
  sourceUnit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#7E86AC", marginLeft: 3 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "8px 0 10px" },
  exceptionBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  illustrationBox: { margin: "10px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#7E86AC" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  value: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14 },
  unit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#7E86AC", marginLeft: 4 },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
