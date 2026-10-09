import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Selection / チェックボックス」ページ。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで「確認中」だったが、今回ユーザーが公式ページ本文(使用法・行動・ユースケース・
 * インタラクションとスタイル・アクセシビリティの各セクション)を手動で取得・貼付してくれたため、
 * その内容を反映済み(2026-09、MD3_text/label_text.docx)。ただし正方形本体の見た目サイズ(dp単位)や
 * 具体的なカラートークン名など、視覚仕様(specsページ)側の数値はこのテキストに含まれておらず未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Toggles内「Checkboxes」(macOS)",
    color: "#C2542A",
    position: "3状態(オン・オフ・不定)を形状の違いで示す、AppKit提供のネイティブな正方形ボタン",
    size:
      "HIG本文に数値(pt)の基準はありません。ネイティブコントロールのため開発者がサイズを指定する対象ではなく、実際の見た目はコントロールサイズ(Regular/Small/Miniなど)やmacOSのバージョンに応じてシステムが自動決定します。「サイズが無い」のではなく「設計者向けの基準が無い」という意味です。",
    colorInfo:
      "色を切り替えて状態を伝える設計ではなく、空(未選択)/チェックマーク(選択)/ダッシュ(不定)という形状の違いで状態を区別することを基本にしています。塗りの色はシステムのアクセントカラーに従い、個別に色を指定することは想定されていません。",
    stance:
      "チェックボックスはmacOS向けの部品で、iOS/iPadOSには標準のチェックボックスがありません(HIG Togglesでは、macOSの節で「macOSはスイッチに加えてチェックボックスに対応する」と説明されています)。チェックボックスは、オフのとき空、オンのときチェックマーク、状態が不定(mixed)のときダッシュを表示する正方形のボタンと定義されています。階層を持つ設定項目を示したいときは、スイッチよりチェックボックスを使うべきとしています。",
    exceptions:
      "2つ以上の選択肢から1つだけを選ばせたい場合は、チェックボックスではなくラジオボタンを使うべきとしています。また、上位のチェックボックスが複数の下位項目を一括でオン・オフする場合、下位項目の状態が揃っていなければ「不定(mixed)」状態で表示すべきとしています。",
    accessibility:
      "理解可能(Understandable) ― 状態(オン・オフ・不定)を見た目で正確に伝えるべきという点は、理解可能性に関わります。標準のチェックボックスコントロールを使えば、VoiceOverなどの支援技術に状態が自動的に伝わるため、独自実装は推奨されていません。",
    useCases: [
      "階層を持つ設定項目を表現する(親子のチェックボックス)",
      "チェックリスト形式で複数の項目を選ぶ",
      "単一のオン・オフではなく、複数の選択肢から選ぶ場面全般",
    ],
    searchHint: "checkbox’s state",
    url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Checkboxes",
    illustration: () => (
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {["unchecked", "checked", "mixed"].map((st) => (
          <svg key={st} width="26" height="26" viewBox="0 0 26 26">
            <rect x="2" y="2" width="22" height="22" rx="3" fill={st === "unchecked" ? "#FFFFFF" : "#C2542A"} stroke="#C2542A" strokeWidth="1.6" />
            {st === "checked" && <path d="M7 13.5l3.5 3.5 7-8" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
            {st === "mixed" && <line x1="7" y1="13" x2="19" y2="13" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />}
          </svg>
        ))}
      </div>
    ),
    illustrationNote: "AppKitネイティブ(色はシステム依存、ここでは系列識別色で図示)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Checkbox(使用法・アクセシビリティ)",
    color: "#2F7D6E",
    position: "複数選択・親子階層(不定状態)を持つ正方形ボタン。隣接するテキストラベルからも選択可能",
    size:
      "チェックボックスに既定で高密度設定を適用すべきではないとしており、推奨タップ領域は48×48 CSSピクセル(Googleの文書の表記。Materialでは通常dpで表し、WCAGの単位はCSS px。単位の違いはトップの「用語メモ」を参照)。より高密度なレイアウトをユーザーが選べるようにする場合も、対象の各要素は最低48×48ピクセルへ戻せる設計にすべきとしています。正方形本体自体の見た目サイズ(dp単位)はこのテキストに含まれておらず未確認です。",
    colorInfo:
      "色の値はカラーロールに対応するデザイントークンを通じて実装されます。隣接するテキストラベルの色は、ラベルやコンポーネントを操作している最中かどうかにかかわらず、サーフェス上のカラーロールを一貫して使うとしています。",
    glossary: [
      { term: "デザイントークン", desc: "色・サイズ・角丸などの具体的な値に、意味のある名前を付けて管理する仕組み。実際の値(例: #3A4FCF)を各所に直接書く代わりに「primary」のような名前を参照させることで、値を1箇所変更するだけで全体に反映できる。" },
      { term: "カラーロール", desc: "色そのものではなく「役割」で色を管理する考え方。例えば「on-surface(サーフェス上の文字色)」のように、UI内でその色が果たす役割を指定する。実際の色の値はテーマ(ライト/ダークなど)側で決まるため、テーマが切り替わっても同じ役割名を参照するだけで自動的に適切な色になる。" },
    ],
    stance:
      "複数の関連する選択肢をリストから選べる場合は、スイッチではなくチェックボックスを使うことを推奨しています。チェックボックスは類似の項目を視覚的にグループ化しやすく、スイッチより省スペースだとしています。",
    exceptions:
      "リストに複数の選択肢がある場合にスイッチを使うのは避けるべきで、代わりにチェックボックスを使うべきとしています。チェックボックス・ラジオボタン・スイッチは主要な選択操作方法の3つで、チェックボックス=複数選択、ラジオボタン=単一選択、スイッチ=独立した設定のオン/オフ、という役割分担が明記されています。",
    accessibility:
      "UIテキストがチェックボックスと正しくリンクされていれば、支援技術(スクリーンリーダーなど)はUIテキストに続けてコンポーネントの役割を読み上げます。個々のチェックボックスのアクセシビリティラベルは通常、隣接するテキストラベルと同一にします。親チェックボックスは「選択済み」「未選択」「未確定(indeterminate)」の3状態を持ち、子の一部だけが選択されている場合は親が不確定状態になり、不確定状態の親を選択すると全ての子項目が選択されます。",
    useCases: [
      "リストから1つ以上のオプションを選択する",
      "サブ選択を含む階層的なリストを表示する",
      "デスクトップ環境で項目のオン/オフを切り替える",
      "類似オプションを視覚的にグループ化する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/checkbox/guidelines",
    urlSecondary: [
      { label: "Accessibility", url: "https://m3.material.io/components/checkbox/accessibility" },
      { label: "Specs(数値)", url: "https://m3.material.io/components/checkbox/specs" },
    ],
    confirmedNote: "使用法・行動・ユースケース・インタラクションとスタイル・アクセシビリティラベルの各セクションは2026-09時点で確認済み。正方形の見た目サイズ(dp)やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <rect x="2" y="2" width="22" height="22" rx="4" fill="#2F7D6E" />
        <path d="M7 13.5l3.5 3.5 7-8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    illustrationNote: "Material tokens(系列識別色で図示。実際のカラートークンは未確認)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.5.8 / 2.5.5 / 1.4.11",
    color: "#A3821F",
    position: "形状を問わず、名前・役割・状態・タップ領域を支援技術/操作性の観点から要求する適合基準の集合",
    size:
      "チェックボックス専用の数値基準はありませんが、WCAG 2.2で追加された一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA、拡張基準)は44×44 CSSピクセルを求めます(どちらも例外あり。詳しくは「ボタン」ページを参照)。いずれもタップ可能な要素全般に適用される基準で、チェックボックス固有の規定ではありません。",
    colorInfo:
      "1.4.11(非テキストのコントラスト、レベルAA)により、チェックボックスの境界線や状態を示す視覚的要素は、隣接する色との間で3:1以上のコントラスト比を確保すべきとしています。1.4.1(色の使用、レベルA)により、色だけで選択状態を示すことも避けるべきとしています。",
    stance:
      "チェックボックスのような独自UIコンポーネントは、その名前(ラベル)・役割(チェックボックスであること)・状態(オン・オフ・不定)が、支援技術から取得・設定できなければならないとしています。見た目だけでなく、プログラム的にも状態が伝わることを求める基準です。",
    exceptions:
      "標準的なHTMLのinput type=\"checkbox\"要素を使っていれば、ブラウザが自動的にこれらの情報を提供するため、通常は追加の対応は不要です。独自にデザインしたカスタムチェックボックスを実装する場合にのみ、この基準への配慮が必要になります。",
    accessibility:
      "堅牢(Robust) ― POUR原則のうち「堅牢」に対応する、互換性(4.1)の達成基準です。加えて操作可能(Operable)の観点からターゲットサイズ(2.5)、知覚可能(Perceivable)の観点から非テキストのコントラスト(1.4.11)も関わります。",
    useCases: [
      "支援技術のユーザーがチェックボックスへ移動し、状態を切り替えられるようにする",
      "状態の変化がプログラム的に(支援技術に)正しく通知されるようにする",
      "最低限のタップ領域・コントラストを確保し、運動機能や視覚に制約のある人でも操作できるようにする",
    ],
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <rect x="14" y="14" width="12" height="12" rx="2" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>最小タップ領域(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、タップ領域の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Checkboxes: Design Guidelines",
    color: "#7A4F7E",
    position: "用途別に3つの形を整理(数値基準ではなく設計パターン)",
    size:
      "数値基準は明言していません。ただしチェックボックス本体だけでなく、隣接するテキストラベルもクリック可能領域に含める(ラベルをクリックしても選択できるようにする)ことが、実務上のベストプラクティスとして広く知られています(Googleの公式ページも同様に、テキストラベルからの選択に対応していると明記しています)。",
    colorInfo:
      "色そのものについての数値基準はありません。選択された項目は選択されていない項目よりも視覚的に目立たせるべき、という原則面の言及があります。",
    stance:
      "チェックボックスの使い方を「単独のチェックボックス」「チェックボックスのリスト」「入れ子のチェックボックスリスト」の3種類に整理しています。入れ子の場合、一部の子項目だけが選択されているときは、親チェックボックスを「不定(indeterminate)」状態で表示すべきとしています。",
    exceptions:
      "2つ以上の選択肢から1つだけを選ぶ場面でチェックボックスを使うのは、よくある誤用だと指摘しています。その場面ではラジオボタンを使うべきとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、用途に応じた使い分けの指針という位置づけです。",
    useCases: [
      "単独のチェックボックスでオン・オフを1つだけ選ばせる",
      "チェックボックスのリストで複数の関連項目を選ばせる",
      "入れ子のチェックボックスリストで階層的な選択を扱う",
    ],
    searchHint: "Nested Checkbox Lists",
    url: "https://www.nngroup.com/articles/checkboxes-design-guidelines/",
    illustration: () => (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <rect x="2" y="2" width="22" height="22" rx="3" fill="#7A4F7E" />
        <path d="M7 13.5l3.5 3.5 7-8" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function CheckboxSwatch() {
  const items = [
    { state: "unchecked", label: "未選択の項目" },
    { state: "checked", label: "選択済みの項目" },
    { state: "mixed", label: "不定(mixed)の項目" },
  ];
  return (
    <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      {items.map((it) => (
        <div key={it.state} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 22 22">
            <rect x="2" y="2" width="18" height="18" rx="4" fill={it.state === "unchecked" ? "#FFFFFF" : "#3A4FCF"} stroke={it.state === "unchecked" ? "#9EA4C4" : "#3A4FCF"} strokeWidth="2" />
            {it.state === "checked" && <path d="M6.5 11.5l3 3 6-6.6" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
            {it.state === "mixed" && <line x1="6.5" y1="11" x2="15.5" y2="11" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />}
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
    { name: "Nielsen Norman Group", color: "#7A4F7E", note: "数値なし(隣接ラベルも含めクリック領域にする指針)" },
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
      <p style={styles.diagramNote}>0〜60pxを共通スケールとした目安です(赤=非推奨/黄=条件付き/緑=推奨の帯は、WCAGのターゲットサイズ基準に基づく)。Apple・Nielsen Norman Groupは数値基準を明言していないため、スケール上にマーカーはありません。</p>
    </div>
  );
}

export default function SelectionCheckboxPage() {
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
        <SidebarNav currentPath="/components/selection/checkbox" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / チェックボックス</span>
            <span>SPEC No. 005</span>
          </div>

          <h1 style={styles.title}>チェックボックス</h1>
          <p style={styles.subtitle}>4つのガイドラインが、状態の伝え方・サイズ・色・アクセシビリティの基準をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <CheckboxSwatch />
            <p style={styles.swatchNote}>3つの状態(未選択・選択済み・不定)。「不定」は一部の子項目だけが選択されている状態を示す。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              チェックボックスは<strong>4系列とも「複数選択」という役割で一致</strong>しています。Apple・Nielsen Norman
              Groupは共通して、ラジオボタン(単一選択)と取り違えないよう注意を促しており、この使い分けは広く定着した考え方と言えます。
            </p>
            <p style={styles.synthesisText}>
              もう一つの共通点は<strong>「オン・オフ」だけでなく「不定(indeterminate / mixed)」という第3の状態</strong>です。Apple・Google・Nielsen Norman
              Groupの3系列が明確に言及しており、階層を持つ設定で一部の子項目だけが選択されているときに使われます。
            </p>
            <p style={styles.synthesisText}>
              サイズについては、<strong>Googleが「既定で48×48 CSSピクセルを下回らせない」という具体的な数値を持つ</strong>のに対し、Appleはネイティブコントロールとして描画されるため、HIG自体には設計者向けの数値基準がありません(実際の見た目サイズはシステムが自動決定するもので、「サイズが無い」わけではない点に注意)。WCAGはコンポーネントの種類を問わない一般基準として、24×24px(AA)/44×44px(AAA)のターゲットサイズを求めています(どちらも例外あり)。なお、Appleのチェックボックスは<strong>macOS向けの部品</strong>で、iOS/iPadOSには標準のチェックボックスがありません。
            </p>
            <p style={styles.synthesisText}>
              色については、Googleがデザイントークンを介した具体的な実装方法を示す一方、Apple・W3C・NNは「色だけに依存せず形状やコントラストで状態を伝える」という考え方で共通しています。
            </p>
          </div>

          <SizeInfographic />

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
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
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
                  {s.urlSecondary && s.urlSecondary.map((sl) => (<a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{sl.label} ↗</a>))}
                </div>
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
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
                  {s.urlSecondary && s.urlSecondary.map((sl) => (<a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>))}
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["選択・切り替え", "入力・フォーム"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(Googleの使用法・アクセシビリティ本文は確認済み。specs数値の一部は未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはToggleページ内のCheckboxesセクションへのアンカー付きリンクです。WCAGはUnderstandingページ、NN
              groupは記事ページ単位です。Googleは最新版(M3)の公式ページへリンクしていますが、specsページ本文(見た目サイズの数値など)はまだ確認できていません。
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
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#9EA4C4", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#9EA4C4", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#7E86AC", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  infographicCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 22 },
  infographicLegend: { display: "flex", flexDirection: "column", gap: 8, margin: "16px 0 4px" },
  infographicLegendRow: { display: "flex", alignItems: "flex-start", gap: 8 },
  infographicDot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0, marginTop: 3 },
  infographicLegendName: { fontSize: 12, fontWeight: 700, color: "#171B36", width: 130, flexShrink: 0 },
  infographicLegendNote: { fontSize: 11.5, color: "#454C78", lineHeight: 1.5 },
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
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
