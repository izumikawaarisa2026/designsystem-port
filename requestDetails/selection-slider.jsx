import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection / スライダー」ページ。
 * 他のSelectionコンポーネント(チェックボックス・ラジオボタン・トグル)と違い、
 * WCAGは形状ではなく「操作方法(キーボード操作性)」に焦点を当てた基準を持つ点が特徴的。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで複数の公式系資料による間接確認だったが、公式ページ本文(使用法・トラック・値の表示・
 * 停止表示器・埋め込みアイコン・ユースケース・インタラクションとスタイル・フォーカスとナビゲーション・
 * 色のコントラストの各セクション)を確認できたため、その内容を反映済み(2026-09、MD3_text/slider.docx)。
 * これにより「連続/離散/中央基準/範囲選択の4種類」としていた旧記述は誤りと判明し、公式の3種類
 * (標準・中央揃え・範囲指定)に修正した。トラック・つまみの見た目サイズ(dp単位)や具体的なカラー
 * トークン名など、視覚仕様(specsページ)側の数値はこのテキストに含まれておらず未確認。
 *
 * 2026-09 追加修正(ユーザー指摘による):
 * ・セクション順を コンポーネントイメージ→AI解釈→種類と使い分け→四系列比較→数値の表示方法→
 *   サイズの比較 に並べ替え。
 * ・サイズの比較インフォグラフィックの帯色(赤/黄/緑)が系列識別色と衝突していた
 *   (特にGoogleの識別色#2F7D6Eと「推奨」帯の色が同一)。帯色を系列識別色と重複しない
 *   独立した配色(赤#D64545/黄#E8A317/緑#219653)に変更し、信号色と識別色の意味を分離。
 * ・数値の表示方法セクションを、共通の一例のみの図解から、4系列それぞれの図解+出典リンク付きに拡張。
 * ・サイズに関する記述が基本方針/例外/アクセシビリティ/ユースケースの各項目に分散していたため、
 *   「サイズ」項目に統合し、他項目からは重複箇所を削除。
 * ・Googleの「例外・許容ケース」に混在していたアイコン関連の記述(埋め込みアイコンのサイズ対応・
 *   位置移動・ゼロ値での入れ替え)を、新設の「アイコン」項目に分離。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Sliders",
    term: "Slider",
    color: "#C2542A",
    position: "最小値〜最大値の範囲からおおよその値を選ぶ水平(または垂直)トラック",
    size:
      <span><NoData>数値基準なし。</NoData>トラックやつまみの見た目は自由にカスタマイズできる(配置の慣習については下記「基本方針」を参照)。</span>,
    colorInfo:
      <NoData>記載なし</NoData>,
    stance:
      "スライダーは、つまみ(thumb)を最小値と最大値の間で調整できる水平のトラックだとしている。見た目は自由にカスタマイズしてよいものの、最小値は先頭側/下側、最大値は末尾側/上側に置くという、人々が慣れ親しんだ方向は守るべきとしている。",
    exceptions:
      <>特に広い範囲の値を扱う場合は、<Hl>対応するテキストフィールドやステッパーを併設し</Hl>、正確な値を確認・入力できるようにするとよいとしている。例外として、iOS/iPadOSでは音量の調整にスライダーを使わず、専用のボリュームビュー(音量のスライダーと出力先の切り替えを含む部品)を使うべきとしている(HIG Slidersの「iOS, iPadOS」の節)。</>,
    accessibility:
      <span><NoData>記載なし。</NoData>一般的なコントロールとして、キーボード操作性などの基準はW3C欄を参照。</span>,
    useCases: [
      "明るさなど、おおよその値でよい設定を調整する(iOS/iPadOSの音量は例外で、専用のボリュームビューを使う)",
      "広い範囲の値を扱う場合はテキストフィールドやステッパーを併設する",
      "(iOS/iPadOS)音量調整には専用のボリュームビューを使い、汎用スライダーは避ける",
    ],
    searchHint: "minimum and maximum sides of sliders",
    url: "https://developer.apple.com/design/human-interface-guidelines/sliders",
    refs: [
      { label: "Sliders", url: "https://developer.apple.com/design/human-interface-guidelines/sliders" },
    ],
    illustration: () => (
      <svg width="120" height="20" viewBox="0 0 120 20">
        <line x1="4" y1="10" x2="116" y2="10" stroke="#F0DACB" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="10" x2="70" y2="10" stroke="#C2542A" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="10" r="7" fill="#FFFFFF" stroke="#C2542A" strokeWidth="2.2" />
      </svg>
    ),
    illustrationNote: "見た目は自由にカスタマイズ可(ここでは系列識別色で図示)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Sliders(使用法・アクセシビリティ)",
    term: "Slider(標準・中央揃え・範囲指定)",
    color: "#2F7D6E",
    position: "標準・中央揃え・範囲指定の3種類。横/縦・埋め込みアイコンに対応(サイズの詳細は下記「サイズ」を参照)",
    size:
      "つまみ(handle)の既定タップ領域は48dp。チェックボックス・ラジオボタン・スイッチと同じ48dp基準。M3 Expressiveでは5つの大きさがあり、トラックの太さはXS 16・S 24・M 40・L 56・XL 96dp、つまみの高さはXS〜M 44dp・L 68dp・XL 108dp(Material Components for Androidのトークン)。",
    colorInfo:
      "アクティブなトラック(最小値からつまみまで)と非アクティブなトラック(つまみから最大値まで)を区別して塗り分けるとしている。非アクティブなトラックの端(エンドストップ)は、背景との間で少なくとも3:1のコントラスト比を確保すべきとしており、非アクティブなトラック自体が既にこの比率を満たしていれば、エンドストップは省略できるとしている。",
    glossary: [
      { term: "アクティブ/非アクティブなトラック", desc: "スライダーの帯(トラック)のうち、「最小値からつまみまで」の選択済み部分をアクティブ、「つまみから最大値まで」の未選択部分を非アクティブと呼ぶ区別。" },
      { term: "停止表示器(ストップインジケーター)", desc: "スライダー上で選べる既定の値を示す小さな目盛りマーカー。つまみを離すと最も近い停止表示器の位置に自動的にスナップする。" },
    ],
    stance:
      <>スライダーには<Hl>標準・中央揃え・範囲指定の3種類</Hl>がある。標準スライダーはゼロや範囲の先頭から1つの値を選ぶ場合に、中央揃えスライダーはゼロ(既定値)が範囲の中央にある正負の値を選ぶ場合に、範囲指定スライダーは1つのトラック上で最小値・最大値の2つを選ぶ場合に使うとしている。ほとんどのスライダーは横方向に配置し、特に範囲指定スライダーを縦方向で使うことは認知負荷が大きくなりすぎるため避けるべきとしている。</>,
    exceptions:
      "停止表示器(既定の選択可能値を示すマーカー)は、多く配置しすぎると視覚的に混雑し値の調整が難しくなるため避けるべきとしている。",
    icons:
      "M/L/XLサイズの標準スライダーには、トラック内に埋め込みアイコン(制御対象を示すもの)を含められるが、XS/Sサイズには追加すべきではないとしている。アクティブなトラックにアイコンを表示するスペースが足りない場合(値が低い場合など)は、アイコンを非アクティブ側に移動すべきとし、ゼロ値でアイコンを入れ替える(例: 音量アイコン→ミュートアイコン)ことも検討すべきとしている。",
    accessibility:
      "操作可能(Operable) ― タップ領域の数値は上記「サイズ」を参照。タップ・ドラッグ時やカーソルのホバー・クリック時につまみの幅が変化し、現在値が表示されることで操作のフィードバックを与えるとしている。",
    useCases: [
      "標準・中央揃え・範囲指定の3種類を用途に応じて使い分ける(詳しくは下記「スライダーの種類と使い分け」を参照)",
      "M/L/XLサイズでは埋め込みアイコンで制御対象を示す(詳しくは下記「アイコン」を参照)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/sliders/guidelines",
    refs: [
      { label: "Sliders(使用法・アクセシビリティ)", url: "https://m3.material.io/components/sliders/guidelines" },
      { label: "Specs(最新版)", url: "https://m3.material.io/components/sliders/specs" },
    ],
    confirmedNote: "使用法・トラック・値の表示・停止表示器・埋め込みアイコン・ユースケース・インタラクションとスタイル・フォーカスとナビゲーション・色のコントラストの各セクションは2026-09時点で確認済み。各サイズの具体的なdp数値やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="120" height="20" viewBox="0 0 120 20">
        <line x1="4" y1="10" x2="116" y2="10" stroke="#D6E8E3" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="10" x2="70" y2="10" stroke="#2F7D6E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="10" r="7" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="2.2" />
      </svg>
    ),
    illustrationNote: "系列識別色で図示",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.1.1 / 2.5.7 / 2.5.8 / 2.5.5 / 1.4.11",
    term: "slider(WAI-ARIAのロール)/ HTMLの input type=\"range\"",
    color: "#A3821F",
    position: "キーボード操作性を明確に要求(レベルA)",
    size:
      "スライダー専用のサイズ規定はない。WCAG 2.2のターゲットサイズ基準(2.5.8・レベルAAは24×24 CSSピクセル、2.5.5・レベルAAAは44×44 CSSピクセル。どちらも例外あり)では、スライダーのように位置で値を選ぶ部品は、つまみだけでなく全体を1つのターゲットとして扱う(Understanding 2.5.8の注記で、スライダーが例として挙げられている)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、トラックやつまみの視覚的な境界は、周囲との間で3:1以上のコントラスト比を確保すべきとしている。",
    stance:
      <>スライダーのようにポインタ操作が前提になりやすいコントロールも、キーボードだけですべての機能を操作できなければならないとしている(2.1.1・レベルA)。さらに2.5.7(ドラッグ動作・レベルAA)は、ドラッグしないと操作できない部品に、<Hl>タップやクリックだけで操作できる方法を求める</Hl>。Understanding 2.5.7はスライダーを例に、「トラックをタップするとつまみがその位置へ移動する」「つまみの横に数値の入力欄を置く」といった方法を挙げている。</>,
    exceptions:
      "自由な手書きや水彩画のような、操作の軌跡そのものに意味がある「経路依存の入力」は、この基準の対象外としている。",
    accessibility:
      "操作可能(Operable) ― POUR原則のうち「操作可能」に対応する、キーボードアクセシビリティ(2.1)とドラッグ動作(2.5.7)の達成基準。加えてターゲットサイズ(2.5)・非テキストのコントラスト(1.4.11、知覚可能)も関わる。",
    useCases: [
      "ドラッグしなくても操作できるようにする(トラックをタップするとつまみが移動する、数値の入力欄を横に置く、など。2.5.7)",
      "経路依存の入力(手書きなど)は対象外とする例外を理解する",
    ],
    searchHint: "path-dependent",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
    refs: [
      { kind: "sc", level: "A", label: "2.1.1 キーボード", url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html" },
      { kind: "sc", level: "AA", label: "2.5.7 ドラッグ動作", url: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { kind: "apg", label: "APG: Slider Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/slider/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="8" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#666D93" }}>最小タップ領域(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、タップ領域の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Slider Design: Rules of Thumb",
    term: "Slider",
    color: "#7A4F7E",
    position: "正確な値の指定には不向き、おおよその値でよい場面に限定(数値基準ではなく使い分けの指針)",
    size:
      "数値基準は明言していない(ラベルの配置については下記「例外・許容ケース」を参照)。",
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      <>スライダーは、正確な値そのものが重要ではなく、おおよその値で十分な場面に最も適しているとしている。<Hl>年齢や体重のような正確な数値が求められる場面では、スライダーは避けるべき</Hl>としている。</>,
    exceptions:
      "スライダーやそのつまみの現在値を示すラベルは、指で隠れてしまわないよう、つまみの下ではなく上または横に配置すべきとしている。範囲が広い、または密になるほど、正確な値を選びにくくなる点にも注意が必要だとしている。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、操作の正確さ(操舵の法則)に基づく設計根拠。",
    useCases: [
      "正確な値より、おおよその値で十分な設定を調整する",
      "年齢や体重のような正確な数値が求められる場面では使わない",
      "範囲が広い/密になるほど正確な値を選びにくいことを踏まえて設計する",
    ],
    searchHint: "approximate value is good enough",
    url: "https://www.nngroup.com/articles/gui-slider-controls/",
    refs: [
      { label: "Slider Design: Rules of Thumb", url: "https://www.nngroup.com/articles/gui-slider-controls/" },
    ],
    illustration: () => (
      <svg width="120" height="20" viewBox="0 0 120 20">
        <line x1="4" y1="10" x2="116" y2="10" stroke="#E7DCE8" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="10" x2="70" y2="10" stroke="#7A4F7E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="10" r="7" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="2.2" />
      </svg>
    ),
    illustrationNote: "視覚デザインの規定はなく、系列識別色で図示",
  },
];

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

const SIZE_BAND_COLOR = { ng: { fill: "#FBE7E7", stroke: "#D64545" }, caution: { fill: "#FDF3D9", stroke: "#E8A317" }, ok: { fill: "#E2F4E8", stroke: "#219653" } };
const SIZE_SCALE = {
  bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }],
  markers: [{ at: 24, label: "24" }, { at: 44, label: "44" }, { at: 48, label: "48" }],
};

function SizeRangeScale() {
  const domainMax = 60;
  const w = 280;
  const x = (v) => (v / domainMax) * w;
  return (
    <svg viewBox={`0 0 ${w} 44`} style={{ width: "100%", maxWidth: 320, height: "auto", display: "block", margin: "0 auto" }}>
      {SIZE_SCALE.bands.map((b, i) => (
        <rect key={i} x={x(b.from)} y={4} width={x(b.to) - x(b.from)} height={14} fill={SIZE_BAND_COLOR[b.type].fill} stroke={SIZE_BAND_COLOR[b.type].stroke} strokeWidth="1" />
      ))}
      {SIZE_SCALE.markers.map((m, i) => (
        <g key={i}>
          <line x1={x(m.at)} y1={1} x2={x(m.at)} y2={20} stroke="#171B36" strokeWidth="1.4" />
          <circle cx={x(m.at)} cy={1} r="2" fill="#171B36" />
          <text x={x(m.at)} y={34} fontSize="9" fontFamily="IBM Plex Mono" fill="#171B36" textAnchor="middle" fontWeight="600">{m.label}</text>
        </g>
      ))}
    </svg>
  );
}

function SizeInfographic() {
  const legend = [
    { name: "Apple", color: "#C2542A", note: "数値なし(見た目は自由にカスタマイズ可)" },
    { name: "Google", color: "#2F7D6E", note: "48px(つまみの既定タップ領域)" },
    { name: "W3C", color: "#A3821F", note: "24px(AA)/44px(AAA)。どちらも例外あり" },
    { name: "Nielsen Norman Group", color: "#7A4F7E", note: "数値なし(正確な値には不向きという使いどころの指針)" },
  ];
  return (
    <div style={styles.infographicCard}>
      <span style={styles.swatchLabel}>サイズの比較</span>
      <SizeRangeScale />
      <div style={styles.infographicLegend}>
        {legend.map((l) => (
          <div key={l.name} style={styles.infographicLegendRow}>
            <span style={{ ...styles.infographicDot, background: l.color }} />
            <span style={styles.infographicLegendName}>{l.name}</span>
            <span style={styles.infographicLegendNote}>{l.note}</span>
          </div>
        ))}
      </div>
      <p style={styles.diagramNote}>0〜60pxを共通スケールとした目安だ(赤=非推奨/黄=条件付き/緑=推奨の帯は、WCAGのターゲットサイズ基準に基づく信号色)。Apple・Nielsen Norman Groupは数値基準を明言していないため、スケール上にマーカーはない。帯の信号色(赤/黄/緑)は、下記の凡例で使う4系列の識別色とは別の配色を使っており、両者の意味を混同しないようにしている。</p>
    </div>
  );
}

function SliderSwatch() {
  return (
    <div style={{ width: 220, margin: "0 auto" }}>
      <svg width="220" height="30" viewBox="0 0 220 30">
        <line x1="4" y1="15" x2="216" y2="15" stroke="#E1E3F0" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="15" x2="140" y2="15" stroke="#3A4FCF" strokeWidth="4" strokeLinecap="round" />
        <circle cx="140" cy="15" r="9" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="2.5" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#666D93", fontFamily: "'IBM Plex Mono', monospace" }}>
        <span>最小</span>
        <span>最大</span>
      </div>
    </div>
  );
}

const SLIDER_TYPES = [
  {
    name: "標準スライダー",
    desc: "値の範囲から1つの値を選ぶ、最も基本的な形。ゼロや範囲の先頭から値を選び始める場面に向く。",
    illustration: () => (
      <svg width="140" height="24" viewBox="0 0 140 24">
        <line x1="4" y1="12" x2="136" y2="12" stroke="#D6E8E3" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="12" x2="90" y2="12" stroke="#2F7D6E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="90" cy="12" r="7" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    name: "中央揃えスライダー",
    desc: "正負の値を持つ範囲から1つの値を選ぶ形。ゼロ(既定値)が範囲の中央にある場面(例: 色温度の暖色⇔寒色調整)に向く。",
    illustration: () => (
      <svg width="140" height="24" viewBox="0 0 140 24">
        <line x1="4" y1="12" x2="136" y2="12" stroke="#D6E8E3" strokeWidth="4" strokeLinecap="round" />
        <line x1="70" y1="12" x2="105" y2="12" stroke="#2F7D6E" strokeWidth="4" strokeLinecap="round" />
        <line x1="70" y1="6" x2="70" y2="18" stroke="#9EA4C4" strokeWidth="1.5" />
        <circle cx="105" cy="12" r="7" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    name: "範囲指定スライダー",
    desc: "1つのトラック上で2つの値(最小値・最大値)を選ぶ形。価格帯のように範囲そのものを定義したい場面に向く。縦方向での使用は認知負荷が大きくなるため避けるべきとされている。",
    illustration: () => (
      <svg width="140" height="24" viewBox="0 0 140 24">
        <line x1="4" y1="12" x2="136" y2="12" stroke="#D6E8E3" strokeWidth="4" strokeLinecap="round" />
        <line x1="45" y1="12" x2="100" y2="12" stroke="#2F7D6E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="45" cy="12" r="7" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="2.2" />
        <circle cx="100" cy="12" r="7" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="2.2" />
      </svg>
    ),
  },
];

function SliderTypesSection() {
  return (
    <div style={styles.typesCard}>
      <h2 style={styles.diagramTitle}>スライダーの種類と使い分け</h2>
      <div style={styles.typesGrid}>
        {SLIDER_TYPES.map((t) => (
          <div key={t.name} style={styles.typeItem}>
            <div style={styles.typeIllustration}>{t.illustration()}</div>
            <div style={styles.typeName}>{t.name}</div>
            <p style={styles.typeDesc}>{t.desc}</p>
          </div>
        ))}
      </div>
      <p style={styles.diagramNote}>
        3種類の名称・使い分けはGoogle(Material Design 3)の公式ページによる。Appleはこれほど明確な3分類を示していないが、見た目は自由にカスタマイズしてよいものの、最小値は先頭側/下側・最大値は末尾側/上側に置くという慣習を挙げており、Googleの「横方向配置を基本とする」という指針と方向性は一致している。
      </p>
    </div>
  );
}

const VALUE_DISPLAY = [
  {
    name: "Apple",
    color: "#C2542A",
    note: "スライダー本体に値表示の規定はなし。特に広い範囲を扱う場合は、外部のテキストフィールドやステッパーを併設し、正確な値を確認・入力できるようにするとよいとしている。",
    url: "https://developer.apple.com/design/human-interface-guidelines/sliders",
    refs: [{ label: "Sliders", url: "https://developer.apple.com/design/human-interface-guidelines/sliders" }],
    illustration: () => (
      <svg width="140" height="46" viewBox="0 0 140 46">
        <line x1="4" y1="34" x2="90" y2="34" stroke="#F0DACB" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="34" x2="54" y2="34" stroke="#C2542A" strokeWidth="4" strokeLinecap="round" />
        <circle cx="54" cy="34" r="7" fill="#FFFFFF" stroke="#C2542A" strokeWidth="2.2" />
        <rect x="100" y="24" width="34" height="20" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.4" />
        <text x="117" y="38" fontSize="10" fontWeight="700" fill="#C2542A" textAnchor="middle" fontFamily="IBM Plex Mono">42</text>
      </svg>
    ),
    illustrationNote: "外部のテキストフィールドを併設する形の概念図",
  },
  {
    name: "Google",
    color: "#2F7D6E",
    note: "つまみを押す/ドラッグしている間、つまみの近くに現在値をポップアップ表示する(範囲指定スライダーでは一度に1つだけ)。値が他の場所に表示されていればこの表示自体は不要。外部の別テキスト入力フィールドを用意し、スライダーと値を自動同期させる方法も案内している(その場合、スライダー直後にタブキーで移動できるようにする)。",
    url: "https://m3.material.io/components/sliders/guidelines",
    refs: [{ label: "Sliders ― Guidelines", url: "https://m3.material.io/components/sliders/guidelines" }],
    illustration: () => (
      <svg width="140" height="46" viewBox="0 0 140 46">
        <rect x="60" y="2" width="28" height="16" rx="4" fill="#171B36" />
        <text x="74" y="14" fontSize="10" fontWeight="700" fill="#FFFFFF" textAnchor="middle" fontFamily="IBM Plex Mono">42</text>
        <path d="M70 18l4 5 4-5z" fill="#171B36" />
        <line x1="4" y1="34" x2="136" y2="34" stroke="#D6E8E3" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="34" x2="74" y2="34" stroke="#2F7D6E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="74" cy="34" r="7" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="2.5" />
      </svg>
    ),
    illustrationNote: "操作中だけつまみの近くにポップアップ表示する形の概念図",
  },
  {
    name: "W3C(WCAG)",
    color: "#A3821F",
    note: "視覚的な表示方法そのものは規定していないが、現在値が支援技術からプログラム的に取得できることを求めている(4.1.2 Name, Role, Value)。「どこに表示するか」ではなく「値が伝わるか」を重視する基準。",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    refs: [{ kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" }],
    illustration: () => (
      <svg width="140" height="46" viewBox="0 0 140 46">
        <line x1="4" y1="34" x2="136" y2="34" stroke="#EDE3C9" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="34" x2="74" y2="34" stroke="#A3821F" strokeWidth="4" strokeLinecap="round" />
        <circle cx="74" cy="34" r="7" fill="#FFFFFF" stroke="#A3821F" strokeWidth="2.2" />
        <rect x="94" y="6" width="42" height="14" rx="3" fill="none" stroke="#A3821F" strokeDasharray="2 2" strokeWidth="1.2" />
        <text x="115" y="16" fontSize="7" fontWeight="700" fill="#A3821F" textAnchor="middle" fontFamily="IBM Plex Mono">aria-value</text>
      </svg>
    ),
    illustrationNote: "視覚的な位置は規定せず、支援技術への値の伝達(プログラム的取得)を図示",
  },
  {
    name: "Nielsen Norman Group",
    color: "#7A4F7E",
    note: "値を示すラベルは、つまみの下ではなく上または横に配置すべきとしている。指やポインタでつまみの下が隠れ、値が読めなくなることを避けるため。",
    url: "https://www.nngroup.com/articles/gui-slider-controls/",
    refs: [{ label: "Slider Design: Rules of Thumb", url: "https://www.nngroup.com/articles/gui-slider-controls/" }],
    illustration: () => (
      <svg width="140" height="46" viewBox="0 0 140 46">
        <text x="74" y="14" fontSize="11" fontWeight="700" fill="#7A4F7E" textAnchor="middle" fontFamily="IBM Plex Mono">42</text>
        <line x1="4" y1="34" x2="136" y2="34" stroke="#E7DCE8" strokeWidth="4" strokeLinecap="round" />
        <line x1="4" y1="34" x2="74" y2="34" stroke="#7A4F7E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="74" cy="34" r="7" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="2.2" />
      </svg>
    ),
    illustrationNote: "つまみの上に常時ラベルを置く(下には置かない)形の概念図",
  },
];

function ValueDisplaySection() {
  return (
    <div style={styles.typesCard}>
      <h2 style={styles.diagramTitle}>数値の表示方法(比較)</h2>
      <div style={styles.typesGrid}>
        {VALUE_DISPLAY.map((v) => (
          <div key={v.name} style={{ ...styles.typeItem, borderTopColor: v.color, borderTopWidth: 3, borderTopStyle: "solid" }}>
            <div style={styles.typeIllustration}>{v.illustration()}</div>
            <div style={styles.typeName}>{v.name}</div>
            {v.illustrationNote && <p style={styles.illustrationNoteSmall}>{v.illustrationNote}</p>}
            <p style={styles.typeDesc}>{v.note}</p>
            <RefList refs={v.refs} />
          </div>
        ))}
      </div>
      <p style={styles.diagramNote}>4系列の違いは<strong>「値をどこに出すか」</strong>だ。Googleは操作中に<strong>つまみの近くへ一時的に表示</strong>し、Appleは<strong>スライダーの外に入力欄やステッパー</strong>を置いて正確な値を扱い、W3C(WCAG)は<strong>視覚的な位置を定めず</strong>支援技術に値が伝わることを求め、Nielsen Norman Groupは<strong>ラベルの位置</strong>(つまみの下ではなく上か横)を示している。</p>
    </div>
  );
}

/* スライダーに向いているもの・向いていないもの(4系列の内容をまとめたAI解釈。出典の系列を括弧で示す) */
const FIT_GOOD = [
  { t: "大まかな値でよい調整", ex: "音量・明るさ・画像フィルターの強さ", src: "Google・NN group" },
  { t: "動かしながら結果をすぐ見たい調整", ex: "写真の明るさ、文字の大きさのプレビュー", src: "Google(値をすぐ反映し、効果を見ながら選べるようにする)" },
  { t: "範囲の指定(2つのつまみ)", ex: "価格帯、出発の時間帯", src: "Google(範囲スライダー)・NN group" },
  { t: "0を中心にした±の調整", ex: "露出・色温度の補正", src: "Google(中央スライダー)" },
];
const FIT_BAD = [
  { t: "正確な値が必要", ex: "体重・金額・分単位の時刻", alt: "入力欄(テキストフィールド)", src: "NN group" },
  { t: "範囲が広い、刻みが細かい", ex: "0.1刻みの点数、広い範囲の数値", alt: "入力欄やステッパーを添える", src: "NN group・Apple" },
  { t: "評価をつける", ex: "商品やお店の評価", alt: "タップできる星", src: "NN group" },
  { t: "縦向きの範囲スライダー", ex: "縦に置いた価格帯の指定", alt: "横向きにする", src: "Google(負担が大きくなる)" },
  { t: "iOS・iPadOSの音量の調整", ex: "アプリ内の再生音量", alt: "システムの音量ビュー", src: "Apple" },
];

function FitSection() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>スライダーに向いているもの・向いていないもの</h2>
      <div style={styles.fitGrid}>
        <div style={{ ...styles.fitCol, borderTopColor: "#2F7D6E" }}>
          <div style={{ ...styles.fitHead, color: "#2F7D6E" }}>◯ 向いている</div>
          {FIT_GOOD.map((f) => (
            <div key={f.t} style={styles.fitItem}>
              <div style={styles.fitTitle}>{f.t}</div>
              <div style={styles.fitText}>例: {f.ex}</div>
              <div style={styles.fitSrc}>{f.src}</div>
            </div>
          ))}
        </div>
        <div style={{ ...styles.fitCol, borderTopColor: "#C0503F" }}>
          <div style={{ ...styles.fitHead, color: "#C0503F" }}>✕ 向いていない</div>
          {FIT_BAD.map((f) => (
            <div key={f.t} style={styles.fitItem}>
              <div style={styles.fitTitle}>{f.t}</div>
              <div style={styles.fitText}>例: {f.ex} → 代わりに<strong>{f.alt}</strong></div>
              <div style={styles.fitSrc}>{f.src}</div>
            </div>
          ))}
        </div>
      </div>
      <p style={styles.fitNote}>使う場合も、値のラベルは指で隠れないよう、スライダーの上か横に出す(NN group)。正確な値も選べるようにしたいときは、入力欄を並べて置き、互いの値をそろえる(Google・Apple)。各系列の内容をまとめたAI解釈で、出典の系列を各項目の下に示している。</p>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "つまみを横に動かして、範囲の中から値を選ぶ部品だ。";
const ABOUT = [
  { k: "目的・役割", v: "正確な数値より、大まかな量や程度を直感的に調整してもらう" },
  { k: "よく使われる場面", v: "音量・明るさの調整、価格帯の絞り込み" },
  { k: "似た部品との違い", v: <>正確な数値を入れてもらうなら<PageLink to="/components/text-inputs/text-field">テキストフィールド</PageLink>、決まった選択肢から選ぶなら<PageLink to="/components/selection/radio">ラジオボタン</PageLink>や<PageLink to="/components/navigation/segmented-control">セグメントコントロール</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "正確な値を選ぶ場面でも、スライダーを使う?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "使わない。年齢や体重のように正確な値が要る場面には向かない。おおよその値でよい場面に使う" },
      { who: "Apple", color: "#C2542A", t: "使ってよいが、広い範囲の値を扱うなら、数値の入力欄やステッパーを横に置いて正確な値を確かめ・入れられるようにする" },
      { who: "W3C", color: "#A3821F", t: "向き不向きは定めないが、ドラッグせずにタップやクリックだけでも操作できる方法を求める(2.5.7・AA)。例として数値の入力欄を横に置く方法を挙げている" },
    ],
    tip: "正確な値が要るならまず入力欄を使い、スライダーを使うときも入力欄を横に置く、という形にすると、3系列のどれにも沿う。入力欄はW3Cの2.5.7の「ドラッグしない操作」にもなる。",
  },
  {
    q: "つまみの押せる範囲は、どのくらいの大きさにする?",
    figure: <SizeInfographic />,
    sides: [
      { who: "Google", color: "#2F7D6E", t: "つまみの既定のタップ領域は48dp" },
      { who: "W3C", color: "#A3821F", t: "24×24 CSS px以上(2.5.8・AA)、より高い水準では44×44 CSS px以上(2.5.5・AAA)。どちらも例外あり" },
      { who: "Apple・NN group", color: "#C2542A", t: "スライダーとしての数値はない" },
    ],
    tip: "つまみの押せる範囲を48px前後にしておけば、Googleの既定とW3CのAA・AAAのどちらにも届く。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "おおよその値を選ぶときに使う", d: "正確な値が要るなら、まず入力欄", who: "AI解釈" },
  { n: 2, t: "使うときも入力欄を横に置く", d: "ドラッグしない操作の手段にもなる", who: "W3C 2.5.7" },
  { n: 3, t: "つまみの押せる範囲は48前後", d: "", who: "Google" },
  { n: 4, t: "キーボードでも操作できるようにする", d: "", who: "W3C" },
];

export default function SelectionSliderPage() {
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
        <SidebarNav currentPath="/components/selection/slider" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / スライダー</span>
            <span>SPEC No. 008</span>
          </div>

          <h1 style={styles.title}>スライダー</h1>
          <SummaryCard keyPoints={KP}
            image={<><SliderSwatch /></>}
            imageNote={<>最小値〜最大値の範囲を、つまみの位置でおおよそ表す。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />

          <FitSection />



          <SliderTypesSection />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              スライダーは4系列で扱いの重みがかなり異なる。Apple・Nielsen Norman Groupは実践的な使いどころを示し、WCAGは<strong>キーボードやドラッグ以外の操作でも使えること</strong>に焦点を当てた基準を定めている。
            </p>
            <p style={styles.synthesisText}>
              <strong>正確な値を選ぶ場面でスライダーを使うか</strong>は系列で分かれる(上の「意見が分かれる点」)。Googleが公式に定義する<strong>「標準・中央揃え・範囲指定」の3種類</strong>は、ほかの3系列にはない分類だ。
            </p>
            <p style={styles.synthesisText}>
              サイズについては、<strong>Googleがつまみの既定タップ領域を48dpと定めている</strong>ことが確認できており、他のSelectionコンポーネントと同じ48dp基準だ。WCAGは、スライダー全体を1つのターゲットとして扱う一般的なターゲットサイズ(24×24px AA / 44×44px AAA。どちらも例外あり)とコントラスト基準(1.4.11)に加えて、<strong>ドラッグしなくても操作できる方法(2.5.7・AA)</strong>を求めている。トラックのタップでつまみを動かせるようにするか、数値の入力欄を横に置くのが実務的な対応だ。
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
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                {s.icons && <InfoBox label="アイコン" accent="#3A4FCF">{s.icons}</InfoBox>}
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アイコン</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.icons || <span style={{ color: "#666D93" }}>―(該当する記載なし)</span>}</div>))}
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

          <ValueDisplaySection />

          <RelatedPages paths={["/components/selection/overview", "/tokens/input-methods", "/components/text-inputs/text-field"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["選択・切り替え", "入力・フォーム"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  fitGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 12 },
  fitCol: { border: "1px solid #E1E3F0", borderTop: "3px solid", borderRadius: 6, padding: "12px 14px" },
  fitHead: { fontSize: 13, fontWeight: 700, marginBottom: 8 },
  fitItem: { padding: "7px 0", borderBottom: "1px solid #EEF0F7" },
  fitTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  fitText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 2 },
  fitSrc: { fontSize: 10, color: "#666D93", marginTop: 2 },
  fitNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "10px 0 0" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 0", lineHeight: 1.6 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#666D93", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#666D93", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#666D93", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  infographicCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 40 },
  infographicLegend: { display: "flex", flexDirection: "column", gap: 8, margin: "16px 0 4px" },
  infographicLegendRow: { display: "flex", alignItems: "flex-start", gap: 8 },
  infographicDot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0, marginTop: 3 },
  infographicLegendName: { fontSize: 12, fontWeight: 700, color: "#171B36", width: 130, flexShrink: 0 },
  infographicLegendNote: { fontSize: 11.5, color: "#454C78", lineHeight: 1.5 },
  typesCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 22 },
  typesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 4 },
  typeItem: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 12px" },
  typeIllustration: { marginBottom: 10 },
  typeName: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  typeDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
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
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
