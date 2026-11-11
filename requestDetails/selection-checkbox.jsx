import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, RefList, SplitSection, TagLink, RelatedPages, GoodBad } from "./page-parts";

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
    term: "Checkbox(Togglesの見た目の1つ。macOSのみ)",
    color: "#C2542A",
    position: "3状態(オン・オフ・不定)を形状の違いで示す、AppKit提供のネイティブな正方形ボタン",
    choice:
      <span>2つ以上の選択肢から1つだけを選ばせたい場合は、チェックボックスではなく<Hl>ラジオボタンを使うべき</Hl>としている。階層を持つ設定項目を示したいときは、スイッチよりチェックボックスを使うべきとしている。</span>,
    states:
      <span>オフのとき空、オンのときチェックマーク、<Hl>状態が不定(mixed)のときダッシュ</Hl>を表示する。上位のチェックボックスが複数の下位項目を一括でオン・オフする場合、下位項目の状態が揃っていなければ「不定(mixed)」状態で表示すべきとしている。</span>,
    size:
      <span><NoData>数値基準なし。</NoData>ネイティブコントロールのため開発者がサイズを指定する対象ではなく、実際の見た目はコントロールサイズ(Regular/Small/Miniなど)やmacOSのバージョンに応じてシステムが自動決定する。「サイズが無い」のではなく「設計者向けの基準が無い」という意味。</span>,
    colorInfo:
      <span>色を切り替えて状態を伝える設計ではなく、空(未選択)/チェックマーク(選択)/ダッシュ(不定)という<Hl>形状の違いで状態を区別</Hl>することを基本にしている。塗りの色はシステムのアクセントカラーに従い、個別に色を指定することは想定されていない。</span>,
    stance:
      <span><Hl>チェックボックスはmacOS向けの部品で、iOS/iPadOSには標準のチェックボックスがない</Hl>(HIG Togglesでは、macOSの節で「macOSはスイッチに加えてチェックボックスに対応する」と説明されている)。チェックボックスは、状態によって表示が変わる正方形のボタンと定義されている。</span>,
    accessibility:
      "理解可能(Understandable) ― 状態(オン・オフ・不定)を見た目で正確に伝えるべきという点は、理解可能性に関わる。支援技術に状態を伝えることはW3Cの4.1.2(堅牢)に当たるが、HIGに支援技術向けの記載はない。",
    useCases: [
      "階層を持つ設定項目を表現する(親子のチェックボックス)",
      "チェックリスト形式で複数の項目を選ぶ",
      "単一のオン・オフではなく、複数の選択肢から選ぶ場面全般",
    ],
    searchHint: "checkbox’s state",
    url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Checkboxes",
    refs: [
      { label: "Toggles ― Checkboxes", url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Checkboxes" },
      { label: "Toggles ― Switches(macOSのスイッチとの使い分け)", url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Switches" },
      { label: "Toggles ― Radio buttons(1つの設定のオン・オフにはチェックボックス)", url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Radio-buttons" },
    ],
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
    term: "Checkbox",
    color: "#2F7D6E",
    position: "複数選択・親子階層(不定状態)を持つ正方形ボタン。隣接するテキストラベルからも選択可能",
    choice:
      "複数の関連する選択肢をリストから選べる場合は、スイッチではなくチェックボックスを使うことを推奨している(リストに複数の選択肢がある場合にスイッチを使うのは避けるべきとしている)。チェックボックスは類似の項目を視覚的にグループ化しやすく、スイッチより省スペースだとしている。",
    states:
      <span>親チェックボックスは<Hl>「選択済み」「未選択」「未確定(indeterminate)」の3状態</Hl>を持ち、子の一部だけが選択されている場合は親が不確定状態になり、不確定状態の親を選択すると全ての子項目が選択される。</span>,
    size:
      <span>チェックボックスに既定で高密度設定を適用すべきではないとしており、<Hl>推奨タップ領域は48×48 CSSピクセル</Hl>(Googleの文書の表記。Materialでは通常dpで表し、WCAGの単位はCSS px。単位の違いはトップの「用語メモ」を参照)。より高密度なレイアウトをユーザーが選べるようにする場合も、対象の各要素は最低48×48ピクセルへ戻せる設計にすべきとしている。四角は18×18dp・枠線2dp、押したときなどに出る状態レイヤーは直径40dpの円(Jetpack Composeのトークン)。</span>,
    colorInfo:
      <span>色の値はカラーロールに対応する<Hl>デザイントークンを通じて実装</Hl>される。隣接するテキストラベルの色は、ラベルやコンポーネントを操作している最中かどうかにかかわらず、サーフェス上のカラーロールを一貫して使うとしている。</span>,
    glossary: [
      { term: "デザイントークン", desc: "色・サイズ・角丸などの具体的な値に、意味のある名前を付けて管理する仕組み。実際の値(例: #3A4FCF)を各所に直接書く代わりに「primary」のような名前を参照させることで、値を1箇所変更するだけで全体に反映できる。" },
      { term: "カラーロール", desc: "色そのものではなく「役割」で色を管理する考え方。例えば「on-surface(サーフェス上の文字色)」のように、UI内でその色が果たす役割を指定する。実際の色の値はテーマ(ライト/ダークなど)側で決まるため、テーマが切り替わっても同じ役割名を参照するだけで自動的に適切な色になる。" },
    ],
    stance:
      <span>チェックボックス・ラジオボタン・スイッチを主要な選択操作方法の3つとし、<Hl>チェックボックス=複数選択</Hl>、ラジオボタン=単一選択、スイッチ=独立した設定のオン/オフ、という役割分担を明記している。</span>,
    accessibility:
      "堅牢(Robust) ― UIテキストがチェックボックスと正しくリンクされていれば、支援技術(スクリーンリーダーなど)はUIテキストに続けてコンポーネントの役割を読み上げる。個々のチェックボックスのアクセシビリティラベルは通常、隣接するテキストラベルと同一にする。",
    useCases: [
      "リストから1つ以上のオプションを選択する",
      "サブ選択を含む階層的なリストを表示する",
      "デスクトップ環境で項目のオン/オフを切り替える",
      "類似オプションを視覚的にグループ化する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/checkbox/guidelines",
    refs: [
      { label: "Checkbox ― Guidelines(使用法)", url: "https://m3.material.io/components/checkbox/guidelines" },
      { label: "Checkbox ― Accessibility", url: "https://m3.material.io/components/checkbox/accessibility" },
      { label: "Checkbox ― Specs(数値)", url: "https://m3.material.io/components/checkbox/specs" },
      { label: "Switch ― Guidelines(スイッチとの使い分け)", url: "https://m3.material.io/components/switch/guidelines" },
    ],
    confirmedNote: "使用法・行動・ユースケース・インタラクションとスタイル・アクセシビリティラベルの各セクションは2026-09時点で確認済み。正方形の見た目サイズ(dp)やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="26" height="26" viewBox="0 0 26 26">
        <rect x="2" y="2" width="22" height="22" rx="4" fill="#2F7D6E" />
        <path d="M7 13.5l3.5 3.5 7-8" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    illustrationNote: "Material tokens(系列識別色で図示)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.5.8 / 2.5.5 / 1.4.11",
    term: "checkbox(WAI-ARIAのロール)/ HTMLの input type=\"checkbox\"",
    color: "#A3821F",
    position: "形状を問わず、名前・役割・状態・タップ領域を支援技術/操作性の観点から要求する適合基準の集合",
    glossary:
      [
      { term: "標準のHTML部品を使う場合", desc: "標準的なHTMLのinput type=\"checkbox\"要素を使っていれば、ブラウザが自動的に名前・役割・状態を提供するため、通常は追加の対応は不要。独自にデザインしたカスタムチェックボックスを実装する場合にのみ、この基準への配慮が必要になる。" },
    ],
    choice:
      <NoData>記載なし</NoData>,
    states:
      <span>4.1.2により、<Hl>状態(オン・オフ・不定)</Hl>が支援技術に伝わる必要がある。</span>,
    size:
      <span>チェックボックス専用の数値基準はないが、WCAG 2.2で追加された一般的なターゲットサイズ基準が適用される。<Hl>2.5.8(レベルAA)は最低24×24 CSSピクセル</Hl>、<Hl>2.5.5(レベルAAA、拡張基準)は44×44 CSSピクセル</Hl>を求める(どちらも例外あり。詳しくは「ボタン」ページを参照)。いずれもタップ可能な要素全般に適用される基準で、チェックボックス固有の規定ではない。</span>,
    colorInfo:
      <span>1.4.11(非テキストのコントラスト、レベルAA)により、チェックボックスの境界線や状態を示す視覚的要素は、隣接する色との間で3:1以上のコントラスト比を確保すべきとしている。1.4.1(色の使用、レベルA)により、<Hl>色だけで選択状態を示すことも避けるべき</Hl>としている。</span>,
    stance:
      "チェックボックスのような独自UIコンポーネントは、その名前(ラベル)・役割(チェックボックスであること)・状態が、支援技術から取得・設定できなければならないとしている(4.1.2)。見た目だけでなく、プログラム的にも状態が伝わることを求める基準。",
    accessibility:
      "堅牢(Robust) ― POUR原則のうち「堅牢」に対応する、互換性(4.1)の達成基準。加えて操作可能(Operable)の観点からターゲットサイズ(2.5)、知覚可能(Perceivable)の観点から非テキストのコントラスト(1.4.11)も関わる。",
    useCases: [
      "支援技術のユーザーがチェックボックスへ移動し、状態を切り替えられるようにする",
      "状態の変化がプログラム的に(支援技術に)正しく通知されるようにする",
      "最低限のタップ領域・コントラストを確保し、運動機能や視覚に制約のある人でも操作できるようにする",
    ],
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    refs: [
      { kind: "sc", level: "A", label: "4.1.2 名前・役割・値", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { kind: "sc", level: "A", label: "1.4.1 色の使用", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { kind: "sc", level: "AAA", label: "2.5.5 ターゲットサイズ(拡張)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html" },
      { kind: "apg", label: "APG ― Checkbox Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/" },
      { kind: "apg", label: "APG ― 不定状態(mixed)のチェックボックスの例", url: "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <rect x="14" y="14" width="12" height="12" rx="2" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#666D93" }}>最小タップ領域(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、タップ領域の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Checkboxes: Design Guidelines",
    term: "Checkbox(単独・リスト・入れ子の3種類)",
    color: "#7A4F7E",
    position: "用途別に3つの形を整理(数値基準ではなく設計パターン)",
    choice:
      <span>2つ以上の選択肢から1つだけを選ぶ場面でチェックボックスを使うのは、よくある誤用だと指摘している。その場面では<Hl>ラジオボタンを使うべき</Hl>としている。</span>,
    states:
      <span>入れ子の場合、一部の子項目だけが選択されているときは、親チェックボックスを<Hl>「不定(indeterminate)」状態で表示すべき</Hl>としている。</span>,
    size:
      <span><NoData>数値基準なし。</NoData></span>,
    colorInfo:
      <span><NoData>数値基準なし。</NoData>選択された項目は選択されていない項目よりも視覚的に目立たせるべき、という原則面の言及がある。</span>,
    stance:
      "チェックボックスの使い方を「単独のチェックボックス」「チェックボックスのリスト」「入れ子のチェックボックスリスト」の3種類に整理している。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、用途に応じた使い分けの指針という位置づけ。",
    useCases: [
      "単独のチェックボックスでオン・オフを1つだけ選ばせる",
      "チェックボックスのリストで複数の関連項目を選ばせる",
      "入れ子のチェックボックスリストで階層的な選択を扱う",
    ],
    searchHint: "Nested Checkbox Lists",
    url: "https://www.nngroup.com/articles/checkboxes-design-guidelines/",
    refs: [
      { label: "Checkboxes: Design Guidelines", url: "https://www.nngroup.com/articles/checkboxes-design-guidelines/" },
      { label: "Toggle-Switch Guidelines(スイッチとの使い分け)", url: "https://www.nngroup.com/articles/toggle-switch-guidelines/" },
    ],
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
      <span style={styles.glossaryNoteLabel}>メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

/* 意見が分かれる2点 */
function MiniIcon({ kind }) {
  const c = "#454C78";
  if (kind === "checkbox") return (
    <svg width="44" height="24" viewBox="0 0 44 24" aria-hidden="true"><rect x="12" y="3" width="18" height="18" rx="3" fill={c} /><path d="M16 12l3.5 3.5 6.5-7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
  if (kind === "switch") return (
    <svg width="44" height="24" viewBox="0 0 44 24" aria-hidden="true"><rect x="3" y="3" width="38" height="18" rx="9" fill={c} /><circle cx="32" cy="12" r="6.5" fill="#FFFFFF" /></svg>
  );
  if (kind === "both") return (
    <svg width="44" height="24" viewBox="0 0 44 24" aria-hidden="true"><rect x="1" y="5" width="14" height="14" rx="3" fill={c} /><rect x="19" y="5" width="24" height="14" rx="7" fill={c} /><circle cx="36" cy="12" r="4.5" fill="#FFFFFF" /></svg>
  );
  /* 親チェックボックスの状態の移り変わり(不定 → 次の状態) */
  const box = (x, st) => (
    <g key={x + st}>
      <rect x={x} y="4" width="16" height="16" rx="3" fill={st === "off" ? "#FFFFFF" : c} stroke={c} strokeWidth="1.5" />
      {st === "on" && <path d={`M${x + 4} 12l3 3 5.5-6`} fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
      {st === "mixed" && <line x1={x + 4} y1="12" x2={x + 12} y2="12" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />}
    </g>
  );
  const arrow = (x) => <path key={"a" + x} d={`M${x} 12h8m-3-3l3 3-3 3`} fill="none" stroke="#9EA4C4" strokeWidth="1.3" />;
  const seq = kind === "all" ? ["mixed", "on"] : ["off", "mixed", "on"];
  return (
    <svg width={seq.length * 30} height="24" viewBox={`0 0 ${seq.length * 30} 24`} aria-hidden="true">
      {seq.map((st, i) => [box(i * 30 + 2, st), i < seq.length - 1 ? arrow(i * 30 + 20) : null])}
    </svg>
  );
}

const SPLITS = [
  {
    q: "1つの設定のオン・オフは、チェックボックス?スイッチ?",
    sides: [
      { figure: <MiniIcon kind="checkbox" />, who: "Apple(macOS)", color: "#C2542A", t: "1つの設定のオン・オフにはチェックボックスを優先する。スイッチは見た目が重いので、まとめて切り替える設定など強調したいときに使う(iOS・iPadOSはリストの行のスイッチが基本)" },
      { figure: <MiniIcon kind="both" />, who: "Google", color: "#2F7D6E", t: "単独の項目のオン・オフはスイッチが基本だが、デスクトップではチェックボックスでもよい。どちらを使う場合も、変更はすぐに反映させる" },
      { figure: <MiniIcon kind="switch" />, who: "NN group", color: "#7A4F7E", t: "すぐに反映するならスイッチ。保存・送信ボタンを押して確定する場面では、スイッチではなく単独のチェックボックスにする" },
    ],
    tip: "「押した瞬間に反映されるか」で分けると、3系列の考え方がほぼ両立する。保存ボタンで確定するフォームの中ではチェックボックス(3系列とも問題なし)、すぐに反映する設定はスマホならスイッチ、macOSやデスクトップのWebならチェックボックスでもよい、という使い分けだ。Googleは「チェックボックスでもすぐ反映」とする点だけがNN groupと逆なので、フォームの中に即時反映のチェックボックスを混ぜないようにする。",
  },
  {
    q: "不定(一部だけ選択)の親チェックボックスを押したら?",
    sides: [
      { figure: <MiniIcon kind="all" />, who: "Google・NN group", color: "#2F7D6E", t: "子をすべて選択する(Google)。親を押すと子がまとめて選択・解除される(NN group)" },
      { figure: <MiniIcon kind="cycle" />, who: "W3C(APG)", color: "#A3821F", t: "APGの例では、押すたびに「未選択 → 不定 → 選択」と切り替わり、不定に戻ったときは前回の一部だけ選んだ組み合わせを復元する。パターンの説明では、この復元は一部の実装が持つ機能という位置づけ" },
    ],
    tip: "基本はGoogle・NN groupの「すべて選択」にそろえるのが分かりやすい方法だ。選び直しに手間がかかる一覧(数十件の宛先など)では、APGの例のように一部だけ選んだ状態に戻せると、うっかり押したときの損失を防げる。APGは実装の参考例で、適合の要件ではない。Appleは、親の状態の表示(不定のときはダッシュ)は定めているが、押したときの動きは書いていない。",
  },
  {
    q: "押せる範囲(タップ領域)は、どれくらいの大きさが必要?",
    figure: (
      <>
        <SizeRangeScale />
        <p style={{ fontSize: 11, color: "#666D93", margin: "8px 0 0", lineHeight: 1.6 }}>0〜60pxを共通スケールにした目安。24・44=W3C(AA・AAA)、48=Google。赤=非推奨/黄=条件付き/緑=推奨の帯は、WCAGのターゲットサイズ基準に基づく</p>
      </>
    ),
    sides: [
      { who: "Google", color: "#2F7D6E", t: "48×48 CSSピクセルを下回らせない。チェックボックスに、既定で高密度の設定を当てない" },
      { who: "W3C", color: "#A3821F", t: "24×24 CSSピクセル(2.5.8・レベルAA)/44×44 CSSピクセル(2.5.5・レベルAAA)。どちらも例外あり。チェックボックス専用ではなく、押せる要素すべてに当てはまる基準" },
      { who: "Apple・NN group", color: "#C2542A", t: "数値の基準はない。Appleはシステムが大きさを自動で決める(macOSの部品)。NN groupは、横のラベルも押せる範囲に含めるよう勧める" },
    ],
    tip: "ラベルも含めた押せる範囲を48×48px以上にしておけば、Googleの基準を満たし、W3Cの24px(AA)・44px(AAA)にも届く。四角そのものは小さくても、ラベルを押して選べるようにすれば範囲を広げられる(Google・NN groupが勧める方法)。",
  },
];

/* この部品について(冒頭の説明) */
const ABOUT = [
  { k: "目的・役割", v: "一覧から、当てはまるものをいくつでも(0個でも)選べるようにする。1つだけでも、同意や通知の希望のように「はい/いいえ」を1つ選ぶ用途に使う" },
  { k: "よく使われる場面", v: "絞り込み検索の条件、メールの受信設定、利用規約への同意、「すべて選択」付きの一覧(親子のチェックボックス)" },
  { k: "似た部品との違い", v: <>1つだけ選ばせるなら<PageLink to="/components/selection/radio">ラジオボタン</PageLink>、押した瞬間に設定が切り替わるなら<PageLink to="/components/selection/toggle">トグルスイッチ</PageLink>(比べ方は<PageLink to="/components/selection/overview">Selectionの選び方</PageLink>)</> },
];

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

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "いくつでも選べるときに使う", d: "1つだけ選ぶならラジオボタン", who: "Apple・Google・W3C・NN group" },
  { n: 2, t: "保存ボタンで確定するフォームの中で使う", d: "すぐ反映する設定はスイッチを検討。フォームの中に即時反映のチェックボックスを混ぜない", who: "AI解釈" },
  { n: 3, t: "ラベルも押せるようにする", d: "ラベルを含めて48×48以上にする", who: "Google・NN group" },
  { n: 4, t: "一部だけ選ばれた親は「不定」で示す", d: "", who: "Apple・Google・NN group" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
            title="良い例・悪い例 ― ラベルも押せる"
            items={[
              { kind: "good", fig: <><span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 14px", border: "1.5px dashed #2F7D6E", borderRadius: 4 }}><span style={{ width: 18, height: 18, borderRadius: 3, border: "2px solid #3A4FCF", background: "#3A4FCF", color: "#FFFFFF", fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>✓</span><span style={{ fontSize: 13, color: "#2E3457" }}>お知らせメールを受け取る</span></span><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>点線=押せる範囲(概念図)</span></>, text: "四角とラベルの全体が押せる範囲(点線)。ラベルを押しても選べる。" },
              { kind: "bad", fig: <><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ display: "inline-flex", padding: 2, border: "1.5px dashed #C0503F", borderRadius: 3 }}><span style={{ width: 18, height: 18, borderRadius: 3, border: "2px solid #3A4FCF", background: "#3A4FCF", color: "#FFFFFF", fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>✓</span></span><span style={{ fontSize: 13, color: "#2E3457" }}>お知らせメールを受け取る</span></span><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>点線=押せる範囲(概念図)</span></>, text: "小さい四角だけが押せる。ラベルを押しても選べず、押し損ねやすい。" },
            ]}
            basis="Google・NN group(ラベルを押して選べるようにする)、Google(48×48)、W3C 2.5.8(24px・AA)・2.5.5(44px・AAA。どちらも例外あり)。"
          />
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
          <SummaryCard keyPoints={KP}
            image={<CheckboxSwatch />}
            imageNote="3つの状態(未選択・選択済み・不定)。「不定」は一部の子項目だけが選択されている状態を示す。"
            lead="四角い枠にチェックマークを付けて、項目を選んでいるかどうかを示す部品だ。"
            rows={ABOUT}
          />


          <SplitSection splits={SPLITS} />
          <GoodBadFigure />


          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              チェックボックスは<strong>4系列とも「複数選択」という役割で一致</strong>している。Apple・Nielsen Norman
              Groupは共通して、ラジオボタン(単一選択)と取り違えないよう注意を促しており、この使い分けは広く定着した考え方と言える。
            </p>
            <p style={styles.synthesisText}>
              もう一つの共通点は<strong>「オン・オフ」だけでなく「不定(indeterminate / mixed)」という第3の状態</strong>だ。Apple・Google・Nielsen Norman
              Groupの3系列が明確に言及しており、階層を持つ設定で一部の子項目だけが選択されているときに使われる。
            </p>
            <p style={styles.synthesisText}>
              サイズは系列によって基準が違う(Googleは48px、W3Cは24px・44px、Apple・NN groupは数値なし。詳しくは「意見が分かれる点」)。なお、Appleのチェックボックスは<strong>macOS向けの部品</strong>で、iOS/iPadOSには標準のチェックボックスがない。
            </p>
            <p style={styles.synthesisText}>
              色については、Googleがデザイントークンを介した具体的な実装方法を示す一方、Apple・W3Cの2系列は「色だけに頼らず、形状やコントラストで状態を伝える」という考え方で共通している。
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
                <InfoBox label="状態(不定を含む)">{s.states}</InfoBox>
                <InfoBox label="ほかの部品との使い分け">{s.choice}</InfoBox>
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
                <div style={styles.labelCell}>状態(不定を含む)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.states}</div>))}
                <div style={styles.labelCell}>ほかの部品との使い分け</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.choice}</div>))}
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

          <RelatedPages paths={["/components/selection/overview", "/components/selection/radio", "/components/selection/toggle", "/components/selection/chips"]} />

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
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
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
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  diagramNote: { fontSize: 11.5, color: "#666D93", margin: "0 0 10px", lineHeight: 1.6 },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
