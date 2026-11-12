import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, GoodBad } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection / トグルスイッチ」ページ。
 * チェックボックスと似た「オン・オフ」の二値コントロールだが、即時反映という
 * 挙動の違いが使い分けの決め手になる、という点が4系列でおおむね共通している。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで複数の公式系資料による間接確認だったが、公式ページ本文(使用法・代替選択制御・アイコン・
 * ラベルテキスト・行動・ユースケース・インタラクションとスタイルの各セクション)を確認できたため、
 * その内容を反映済み(2026-09、MD3_text/SWITCH.docx)。トラック・つまみの見た目サイズ(dp単位)や
 * 具体的なカラートークン名など、視覚仕様(specsページ)側の数値はこのテキストに含まれておらず未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Toggles内「Switches」",
    term: "Switch(Togglesの見た目の1つ)",
    color: "#C2542A",
    position: "チェックボックスより見た目が重い、1つの設定のオン・オフ用のネイティブのコントロール",
    size:
      <span><NoData>数値基準なし。</NoData>ネイティブのコントロールとしてシステムが描く。行の高さをほかのコントロールとそろえるなら小型の「ミニスイッチ」もあるが、数値はない。</span>,
    colorInfo:
      "オン・オフを、トラックの塗りの有無とつまみの位置で示す。塗りの色はシステムのアクセントカラーに従い、個別には指定しない。",
    stance:
      <>以下はmacOSでの使い分け。<Hl>iOS/iPadOSでは、スイッチはリストの行の中でだけ使う</Hl>(HIG Togglesの「iOS, iPadOS」の節)。スイッチは、オン・オフのような対の状態を見た目を変えて示すコントロール。チェックボックスより見た目が重いため、複数の設定をまとめて切り替えるなど、より広い範囲を制御する場面に向く。</>,
    exceptions:
      "まとまったフォームの中では、行の高さをそろえるために「ミニスイッチ」も使える。ただし、すでにチェックボックスを使っている箇所を、原則としてスイッチに置き換えない(macOSの節)。",
    accessibility:
      "理解可能(Understandable) ― オン・オフを見た目で正確に伝える。支援技術に状態を伝えることはW3Cの4.1.2(堅牢)に当たるが、HIGに記載はない。",
    useCases: [
      "1つの設定のオン・オフをすぐ切り替える",
      "チェックボックスより広い範囲を制御する場面",
      "まとまったフォームの中でミニスイッチを使い、行の高さをそろえる",
    ],
    searchHint: "don’t replace a checkbox with a switch",
    url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Switches",
    refs: [
      { label: "Toggles内「Switches」", url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Switches" },
    ],
    illustration: () => (
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {[false, true].map((on, i) => (
          <svg key={i} width="38" height="22" viewBox="0 0 38 22">
            <rect x="1" y="1" width="36" height="20" rx="10" fill={on ? "#C2542A" : "#FFFFFF"} stroke="#C2542A" strokeWidth="1.6" />
            <circle cx={on ? 27 : 11} cy="11" r="7.5" fill={on ? "#FFFFFF" : "#C2542A"} />
          </svg>
        ))}
      </div>
    ),
    illustrationNote: "AppKitネイティブ(色はシステム依存、ここでは系列識別色で図示)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Switch(使用法・アクセシビリティ)",
    term: "Switch",
    color: "#2F7D6E",
    position: "独立した設定をすぐオン/オフするためのコントロール(月額/年額のような相反する2択の切り替えには使わない)",
    size:
      "推奨の押せる範囲は48×48 CSSピクセル。既定で高密度の設定を適用しない(ターゲットサイズが48×48pxを下回るため)。高密度のレイアウトを選べるようにする場合も、各要素を48×48ピクセル以上に戻せるようにする。トラックは52×32dp(枠線2dp)、つまみはオフ16dp・オン24dp・押している間28dp、状態レイヤーは直径40dp(Jetpack Composeのトークン)。",
    colorInfo:
      "色の値はカラーロールに対応するデザイントークンで実装する。隣のラベルの色は、操作中かどうかにかかわらず、サーフェス上のカラーロールを使う。",
    glossary: [
      { term: "デザイントークン", desc: "色・サイズ・角丸などの値に、意味のある名前を付けて管理する仕組み。値(例: #3A4FCF)を直接書く代わりに「primary」のような名前を参照させ、1か所変えれば全体に反映できる。" },
      { term: "カラーロール", desc: "色を「役割」で管理する考え方。例えば「on-surface(サーフェス上の文字色)」のように役割を指定する。値はテーマ(ライト/ダークなど)で決まるため、テーマが変わっても同じ役割名で適切な色になる。" },
    ],
    stance:
      <>設定などの独立した選択肢の調整に最適なコントロール。オン/オフ・真/偽の2択で、切り替えは<Hl>保存の操作なしにすぐ反映する</Hl>。リストの項目を1つずつ制御できるなら、スイッチ(ラジオボタンではない)を使う。</>,
    exceptions:
      "スイッチは独立した1つの設定のオン/オフのためのもので、月額/年額のような相反する2択の切り替えには使わない。リスト表示/マップ表示のように1つだけを選ぶ場面では、接続されたボタングループを使う。スイッチはボタンの代わりにならず(人はボタンに行動の呼びかけを期待する)、保存が要る複数選択にはチェックボックスを使う。",
    accessibility:
      "操作可能(Operable) ― キーボードかスイッチ入力で移動・切り替えできること。ハンドルは操作すると大きさが変わり、フィードバックになる(触れると大きくなる、カーソルを重ねるとホバーの範囲が広がる、など)。スイッチの上に文字を載せず(小さくなりすぎるため)、意味のはっきりしたアイコンを使う。",
    useCases: [
      "1つの項目のオン/オフをすぐ切り替える(保存の操作なし)",
      "ほかと独立した1つの設定のオン/オフを調整する",
      "リスト表示/マップ表示のような相反する選択肢の切り替えには、接続されたボタングループを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/switch/guidelines",
    refs: [
      { label: "Switch(使用法・アクセシビリティ)", url: "https://m3.material.io/components/switch/guidelines" },
      { label: "Specs(最新版)", url: "https://m3.material.io/components/switch/specs" },
    ],
    confirmedNote: "使用法・代替選択制御・アイコン・ラベルテキスト・行動・ユースケース・インタラクションとスタイルの各セクションは2026-09時点で確認済み。トラック・つまみの見た目サイズ(dp)やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="38" height="22" viewBox="0 0 38 22">
        <rect x="1" y="1" width="36" height="20" rx="10" fill="#2F7D6E" />
        <circle cx="27" cy="11" r="7.5" fill="#FFFFFF" />
      </svg>
    ),
    illustrationNote: "系列識別色で図示",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.5.8 / 2.5.5 / 1.4.11 / 3.2.2",
    term: "switch(WAI-ARIAのロール)。HTMLには標準のコンポーネントなし",
    color: "#A3821F",
    position: "形を問わず、状態を支援技術に正しく伝える",
    size:
      "専用のサイズの規定はなく、WCAG 2.2の一般のターゲットサイズの基準がかかる。2.5.8(レベルAA)は24×24 CSSピクセル以上、2.5.5(レベルAAA)は44×44 CSSピクセル(どちらも例外あり。詳しくは「ボタン」ページ)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、トラックやつまみの境界と状態は周りと3:1以上にする。1.4.1により、色だけでオン・オフを示さない。",
    glossary: [
      { term: "3.2.2 On Input・レベルA", desc: "設定(選択・チェック・入力)を変えただけで、事前の説明なしに文脈の変化を起こさないこと。リンクやボタンを押すことは「設定の変更」ではない。" },
      { term: "文脈の変化(change of context)", desc: "気づかないうちに起きると混乱させる大きな変化。新しいウィンドウを開く、フォーカスを別のコンポーネントに移す、別のページへ遷移する、ページの内容を大きく組み替える、など。内容の変化(アコーディオンの開閉・タブの切り替えなど)は、それだけでは文脈の変化ではない。" },
    ],
    stance:
      <>独自のUIコンポーネントは、名前(ラベル)・役割・状態(オン・オフ)を支援技術から取得・設定できること。見た目はボタンやチェックボックスと違っても、WCAGは形を問わず同じ基準を適用する。切り替えは「設定の変更」に当たるため、<Hl>3.2.2(レベルA)</Hl>により、切り替えただけで別の画面へ遷移したり新しいウィンドウを開いたりするなら、事前に知らせる。設定がその場で反映されるだけなら、内容の変化で文脈の変化ではない。</>,
    exceptions:
      "HTMLには広く使える標準のスイッチがなく、Webのスイッチの多くは独自の実装になる。その場合はrole=\"switch\"とaria-checkedなどで、スイッチであることと状態(オン・オフ)を支援技術に伝える。",
    accessibility:
      "堅牢(Robust) ― 互換性(4.1)の達成基準。ほかに、操作可能(Operable)のターゲットサイズ(2.5)、知覚可能(Perceivable)の非テキストのコントラスト(1.4.11)も関わる。3.2.2は「理解可能(Understandable)」の予測可能(3.2)。",
    useCases: [
      "ARIAのswitchロールなどで支援技術にスイッチであることを伝える",
      "オン・オフをプログラムで伝える",
      "切り替えただけで画面の遷移や新しいウィンドウを起こさない(起こすなら事前に知らせる、3.2.2)",
    ],
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    refs: [
      { kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { kind: "sc", level: "A", label: "3.2.2 入力時", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { kind: "apg", label: "APG: Switch Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/switch/" },
    ],
    confirmedNote: "3.2.2はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <rect x="10" y="14" width="20" height="12" rx="6" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#666D93" }}>最小タップ領域(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、タップ領域の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Toggle-Switch Guidelines",
    term: "Toggle switch(トグルスイッチ)",
    color: "#7A4F7E",
    position: "オンとオフの2状態で、すぐ反映される場面に限る",
    size:
      <NoData>数値基準なし</NoData>,
    colorInfo:
      <NoData>数値基準なし</NoData>,
    stance:
      <>オンとオフのどちらかを選び、既定の値を持ち、<Hl>選んだ結果がすぐ反映される場面</Hl>で使う。保存や送信のボタンが要る設定には向かない。送信が必要な長いフォームにトグルを混ぜると、すぐ反映されたのか分からず混乱する。航空会社のアプリで、トグルを押しても見た目が変わるだけで何も起きない例を挙げ、単独のチェックボックスが適切だったとしている。</>,
    exceptions:
      "すぐ反映されるから、誤操作にすぐ気づき元に戻しやすい。ラベルは短く直接的にし、曖昧な表現や質問の形を避ける。動きや色などの手がかりを使い、プラットフォームの慣習に沿って一貫させる。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、すぐ反映されるという動きの違いにもとづく使い分けの指針。",
    useCases: [
      "オン・オフの2状態をすぐ反映する設定",
      "保存や送信のボタンが要らない場面",
      "既定の値を持つ独立した設定",
    ],
    searchHint: "immediate results",
    url: "https://www.nngroup.com/articles/toggle-switch-guidelines/",
    refs: [
      { label: "Toggle-Switch Guidelines", url: "https://www.nngroup.com/articles/toggle-switch-guidelines/" },
    ],
    illustration: () => (
      <svg width="38" height="22" viewBox="0 0 38 22">
        <rect x="1" y="1" width="36" height="20" rx="10" fill="#7A4F7E" />
        <circle cx="27" cy="11" r="7.5" fill="#FFFFFF" />
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

function ToggleSwatch() {
  const items = [
    { on: false, label: "オフの状態" },
    { on: true, label: "オンの状態" },
  ];
  return (
    <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="38" height="22" viewBox="0 0 38 22">
            <rect x="1" y="1" width="36" height="20" rx="10" fill={it.on ? "#3A4FCF" : "#FFFFFF"} stroke={it.on ? "#3A4FCF" : "#9EA4C4"} strokeWidth="2" />
            <circle cx={it.on ? 27 : 11} cy="11" r="7.5" fill={it.on ? "#FFFFFF" : "#9EA4C4"} />
          </svg>
          <span style={{ fontSize: 12, color: "#2E3457" }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

const SIZE_BAND_COLOR = { ng: { fill: "#F7E4E1", stroke: "#C0503F" }, caution: { fill: "#FBF0D9", stroke: "#A97A1A" }, ok: { fill: "#E4F0EC", stroke: "#2F7D6E" } };
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
    { name: "Apple", color: "#C2542A", note: "数値なし(コントロールサイズに応じてシステムが自動決定)" },
    { name: "Google", color: "#2F7D6E", note: "48px(既定のタップ領域)" },
    { name: "W3C", color: "#A3821F", note: "24px(AA)/44px(AAA)。どちらも例外あり" },
    { name: "Nielsen Norman Group", color: "#7A4F7E", note: "数値なし(即時反映という挙動の違いに基づく指針)" },
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
      <p style={styles.diagramNote}>0〜60pxを共通スケールとした目安だ(赤=非推奨/黄=条件付き/緑=推奨の帯は、WCAGのターゲットサイズ基準に基づく)。Apple・Nielsen Norman Groupは数値基準を明言していないため、スケール上にマーカーはない。</p>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "押すとオンとオフがすぐに切り替わる、スイッチの形のコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "1つの設定のオン・オフを、押した瞬間に反映させる" },
  { k: "よく使われる場面", v: "Wi-Fi・通知・ダークモードのオン・オフなど、設定画面の項目" },
  { k: "似たコンポーネントとの違い", v: <>保存ボタンで確定するフォームの中なら<PageLink to="/components/selection/checkbox">チェックボックス</PageLink>(比べ方は<PageLink to="/components/selection/overview">Selectionの選び方</PageLink>)</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "押したらすぐに反映させる必要がある?",
    sides: [
      { who: "Google・NN group", color: "#2F7D6E", t: "ある。保存ボタンなしで、すぐに反映させる。保存や送信で確定する場面ではスイッチではなくチェックボックスを使う" },
      { who: "Apple", color: "#C2542A", t: "すぐに反映するかどうかは書いていない。使い分けの理由は見た目の重さで、macOSではチェックボックスをスイッチに置き換えない。iOS・iPadOSではリストの行の中で使う" },
      { who: "W3C", color: "#A3821F", t: "すぐに反映するかは定めていない。ただし切り替えただけで別の画面に移ったり新しいウィンドウを開いたりするなら、事前に知らせる(3.2.2)" },
    ],
    tip: "スイッチは「押した瞬間に効く設定」にだけ使い、保存ボタンのあるフォームではチェックボックスにする、というGoogle・NN groupの使い分けに合わせれば、Apple・W3Cの決まりとも食い違わない。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "押した瞬間に効く設定にだけ使う", d: "", who: "Google・NN group" },
  { n: 2, t: "保存ボタンのあるフォームではチェックボックスにする", d: "", who: "Google・NN group" },
  { n: 3, t: "相反する2つの選択肢の切り替えには使わない", d: "月額/年額などはボタングループ", who: "Google" },
  { n: 4, t: "名前・役割・状態を支援技術に伝える", d: "", who: "W3C 4.1.2" },
  { n: 5, t: "押せる範囲は48×48以上", d: "", who: "Google" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
            title="良い例・悪い例 ― すぐ反映するか"
            items={[
              { kind: "good", fig: <><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: 210 }}><span style={{ fontSize: 13, color: "#2E3457" }}>Wi-Fi</span><span style={{ width: 36, height: 20, borderRadius: 10, background: "#3A4FCF", display: "inline-flex", alignItems: "center", padding: 2, justifyContent: "flex-end" }}><span style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} /></span></div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: 210 }}><span style={{ fontSize: 13, color: "#2E3457" }}>Bluetooth</span><span style={{ width: 36, height: 20, borderRadius: 10, background: "#8E93B5", display: "inline-flex", alignItems: "center", padding: 2, justifyContent: "flex-start" }}><span style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} /></span></div><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>切り替えるとすぐに反映</span></>, text: "設定画面で、切り替えた瞬間に反映される。保存ボタンはない。" },
              { kind: "bad", fig: <><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: 210 }}><span style={{ fontSize: 13, color: "#2E3457" }}>ニュースレターを受け取る</span><span style={{ width: 36, height: 20, borderRadius: 10, background: "#3A4FCF", display: "inline-flex", alignItems: "center", padding: 2, justifyContent: "flex-end" }}><span style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} /></span></div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: 210 }}><span style={{ fontSize: 13, color: "#2E3457" }}>新着のお知らせを受け取る</span><span style={{ width: 36, height: 20, borderRadius: 10, background: "#8E93B5", display: "inline-flex", alignItems: "center", padding: 2, justifyContent: "flex-start" }}><span style={{ width: 16, height: 16, borderRadius: "50%", background: "#FFFFFF" }} /></span></div><span style={{ alignSelf: "flex-end", fontSize: 12, padding: "5px 14px", borderRadius: 16, background: "#3A4FCF", color: "#FFFFFF" }}>保存</span></>, text: "保存ボタンで確定するフォームの中にスイッチがある。この場面はチェックボックスにする。" },
            ]}
            basis="Google・NN group(保存ボタンなしで、すぐに反映させる。保存や送信で確定する場面ではスイッチではなくチェックボックスを使う)。Appleは、すぐ反映するかを書いていない。"
          />
  );
}

export default function SelectionTogglePage() {
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
        <SidebarNav currentPath="/components/selection/toggle" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / トグルスイッチ</span>
            <span>SPEC No. 007</span>
          </div>

          <h1 style={styles.title}>トグルスイッチ</h1>
          <SummaryCard keyPoints={KP}
            image={<><ToggleSwatch /></>}
            imageNote={<>オン・オフの2状態を、送信ボタンなしで即座に切り替えるコントロール。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />
          <GoodBadFigure />




          <SizeInfographic />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              トグルスイッチは<strong>「オン・オフの2状態を切り替える」</strong>コンポーネントだ。<strong>押したらすぐ反映させるかどうか</strong>が系列で分かれる点で、GoogleとNN groupは「すぐ反映」をチェックボックスとの違いにしている(上の「意見が分かれる点」)。
            </p>
            <p style={styles.synthesisText}>
              Googleは<strong>月額/年額のような相反する2つの選択肢の切り替えにはスイッチを使わず</strong>、ボタングループを使うとしている。WCAGは、スイッチの名前・役割・状態が支援技術に伝わること(4.1.2)を求める。
            </p>
            <p style={styles.synthesisText}>
              サイズについては、<strong>Appleが明示しない一方でGoogleは「既定で48×48 CSSピクセルを下回らせない」という具体的な数値</strong>を持っており、チェックボックス・ラジオボタンと同一の考え方だ。WCAGはコンポーネントの種類を問わず、24×24px(AA)/44×44px(AAA)のターゲットサイズ(どちらも例外あり)と非テキストのコントラスト(1.4.11)を一般基準として要求しており、実務上はこのWCAG基準とGoogleの48dpが最も具体的な数値の指針になる。
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

          <RelatedPages paths={["/components/selection/overview", "/components/selection/checkbox", "/components/actions/button"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
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
