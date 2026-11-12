import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, GoodBad } from "./page-parts";

/**
 * コンポーネントレイヤー「Text inputs / テキストフィールド」ページ。
 *
 * W3C(WCAG 3.3.2 Labels or Instructions)は公式ページ本文を直接取得して確認済み
 * (2026-09)。Nielsen Norman Groupは「プレースホルダーをラベル代わりにするのは有害」
 * という記事本文を検索結果の要約で確認(2026-09、記事本文の直接取得は未実施のため
 * pending扱い)。Apple(HIG)・Google(Material Design 3)は公式サイトがクライアント側
 * レンダリングのSPAで本文を直接取得できなかったため、検索結果による間接確認(2026-09)。
 *
 * 2026-09 追記: ユーザーから「テキストエリア(複数行入力)のページが欲しい」という
 * フィードバックを受け、独立ページではなくこの「テキストフィールド」ページ内に
 * 「テキストエリアとの違い」セクションとして統合した(ユーザー確認済み)。W3C
 * (MDNのaria-multiline属性解説)・Nielsen Norman Group(「Few Guesses, More Success」
 * ―フォームの認知負荷に関する記事)は本文を直接取得して確認済み(2026-09)。Apple
 * (HIG Text views)・Google(Material Design 3 Text fieldsの複数行バリアント)は
 * 公式サイトがSPAのため検索結果による間接確認(2026-09)。
 *
 * 2026-09 追記2: ユーザーから「テキストエリアが入っているとのことだったが分かりにくい、
 * 2項目が混在していることが分かるようにしてほしい」というフィードバックを受け、
 * (1)パンくず・タイトル・サブタイトルに「テキストフィールド・テキストエリア」の
 * 両方を明記、(2)本文を「①テキストフィールド」「②テキストエリア」の2セクションに
 * 明確に分離(以前は①のAI解釈と四系列比較の間にテキストエリアの内容が挟まっており、
 * 1トピックのように見えてしまっていた)、(3)②の直前に点線の区切りと説明文を追加、
 * という3点を修正した。
 *
 * 2026-09 追記3: ユーザーから「②テキストエリアも、PC版で4系列を表で横並びに
 * 見られるようにしてほしい」というフィードバックを受け、TextareaNotesをモバイル
 * (カードのグリッド、dsp-mobile-only)とデスクトップ(①と同じmatrixGridパターンの
 * 表、dsp-desktop-only)に分割した。デスクトップ版の行は「位置づけ」「基本方針」
 * 「確認状況」「リンク」の4行で、①の四系列比較表と統一感のある見た目にしている。
 *
 * 2026-09 追記4: ユーザーから「コンポーネントイメージにはテキストフィールド、
 * テキストエリア両方のイメージを書いてほしい」というフィードバックを受け、
 * 冒頭の「コンポーネントイメージ」ボックスにTextareaSwatchを追加し、
 * TextFieldSwatchと横並びで両方表示するようにした(①②それぞれにキャプション付き)。
 * あわせて、プレビューがPC幅でもモバイル向けカードグリッドが混在して見える
 * という指摘を受け、ビルド成果物の取り違えの可能性を排除するため、現在の
 * ソースから作り直した単独プレビューを再公開した(コード側のdsp-mobile-only/
 * dsp-desktop-onlyの切り替えロジック自体に変更はない)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Text fields",
    term: "Text field(複数行はText view)",
    color: "#C2542A",
    position: "1行(または複数行)のテキストを入力・編集させる標準コントロール",
    size: <span><NoData>数値基準なし。</NoData>押せる範囲は、ほかのコンポーネントと同じ既定44×44pt・最小28×28pt(iOS・iPadOS)が目安(「ボタン」ページを参照)。</span>,
    stance:
      "テキストフィールドは、1行のテキストを入力・編集できる矩形の領域だとされている。欄が空のときは、プレースホルダー(「メールアドレス」など)で目的を示せる。プレースホルダーは入力を始めると消えるため、欄の目的を思い出せるよう別にラベルを置くと役に立つ、としている。",
    exceptions:
      <span>欄が多いときは間隔をそろえ、できるだけ縦に積み、幅をそろえる。エラーの出し方は入力の決まり(Entering data)で扱う(「エラー表示」「バリデーション」ページを参照)。</span>,
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "1行のテキストを入力・編集させる",
      "プレースホルダーで入力例や短い説明を示し、別にラベルも置く",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/text-fields",
    refs: [
      { label: "Text fields", url: "https://developer.apple.com/design/human-interface-guidelines/text-fields" },
    ],
    confirmedNote: "HIG Text fieldsの本文で確認(2026-11)。",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <rect x="1" y="1" width="138" height="24" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="10" y="17" fontSize="10" fill="#666D93" fontFamily="Jost, Noto Sans JP">example@mail.com</text>
      </svg>
    ),
    illustrationNote: "枠線+プレースホルダーの標準的なテキストフィールド(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Text fields(Filled / Outlined)",
    term: "Text field(Filled・Outlined)",
    color: "#2F7D6E",
    position: "Filled(塗りつぶし)とOutlined(枠線)の2種類。フローティングラベル+サポートテキスト/エラーテキストの構造を持つ",
    size: "欄の高さは56dp(Jetpack Composeのトークン)。押せる範囲の決まりは、テキストフィールドのページには記載なし。",
    glossary: [
      { term: "フローティングラベル", desc: "入力欄の中に表示され、フォーカス時や入力時に上に移動して常に見える状態になるラベル。何も入力していない状態でも入力欄の中に「今何を求められているか」を示す。" },
      { term: "サポートテキスト / エラーテキスト", desc: "入力欄の下に表示される補足情報。入力の使われ方などを説明するサポートテキストは、検証エラー時にはエラーテキストに置き換えられる。両方表示する場合はサポートテキストを先に、エラーテキストを後に読み上げさせる。" },
    ],
    stance:
      "Filledテキストフィールドは視覚的な主張が強く、周囲のコンテンツやコンポーネントの中で目立たせたい場合に向くとされている。Outlinedテキストフィールドは主張が弱く、フォームのように多数のテキストフィールドを並べる場面でレイアウトを簡潔に見せるのに役立つとされている。Filledはダイアログや短いフォーム、Outlinedは長いフォームでよく使う。すべての入力欄にラベルを付け、ラベルは常に見えるようにする。選ぶとラベルが欄の中央から上へ移る。",
    exceptions:
      "サポートテキストとエラーテキストの両方を表示する場合は、サポートテキストを先に、エラーテキストを後に読み上げさせる。エラーメッセージにはalertの役割を付ける。必須の欄はラベルの末尾に「*」を付け、読み上げにも含める。",
    accessibility:
      "知覚可能(Perceivable) ― 枠線のある欄は、枠線と背景のコントラストを3:1以上にする。堅牢(Robust) ― エラーメッセージにalertの役割を付け、支援技術に伝える。",
    useCases: [
      "周囲で目立たせたい単独のフィールドにはFilledを使う",
      "フォームなど多数のフィールドを並べる場合はOutlinedを使う",
      "検証エラー時はサポートテキストをエラーテキストに置き換える",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/text-fields/guidelines",
    refs: [
      { label: "Text fields(Filled / Outlined)", url: "https://m3.material.io/components/text-fields/guidelines" },
      { label: "Accessibility", url: "https://m3.material.io/components/text-fields/accessibility" },
    ],
    confirmedNote: "M3 Text fieldsのガイドライン・アクセシビリティの本文と、Jetpack Composeのトークンで確認(2026-11)。",
    illustration: () => (
      <svg width="140" height="30" viewBox="0 0 140 30">
        <rect x="1" y="6" width="138" height="22" rx="4" fill="none" stroke="#2F7D6E" strokeWidth="1.6" />
        <rect x="10" y="0" width="42" height="10" fill="#FFFFFF" />
        <text x="12" y="8" fontSize="8" fill="#2F7D6E" fontFamily="Jost, Noto Sans JP">メールアドレス</text>
        <text x="12" y="22" fontSize="9.5" fill="#171B36" fontFamily="Jost, Noto Sans JP">taro@example.com</text>
      </svg>
    ),
    illustrationNote: "Outlined + フローティングラベル(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 3.3.2 Labels or Instructions / 1.3.1 / 4.1.2",
    term: "textbox(WAI-ARIAのロール)/ HTMLのinput要素",
    color: "#A3821F",
    position: "入力を求めるコンテンツには、目に見えるラベル又は指示を提供することを要求(レベルA)",
    glossary: [
      { term: "色", desc: "1.4.11(非テキストのコントラスト)により、入力欄の境界線やフォーカス状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしている。" },
    ],
    size: "テキストフィールド専用の数値基準はないが、一般的なターゲットサイズ基準(2.5.8/2.5.5。どちらも例外あり)は関連する操作要素(送信ボタンなど)に適用される。",
    stance:
      <>入力を求めるコンテンツには、必須かどうかを問わず、<Hl>目に見えるラベル又は指示を提供しなければならない</Hl>としている。この基準は、コントロールとラベルのマークアップ上の関連付け(1.3.1)や、支援技術だけに伝わる名前(4.1.2)とは異なり、「全てのユーザーに見える形」であることを重視している。ラベルは全ユーザーに提示されるのに対し、名前(name)は支援技術によってのみ露出される場合がある、という区別が明記されている。</>,
    exceptions:
      "プレースホルダーテキストやARIAだけによるラベル付けは、この基準を満たすには不十分だとしている。目的は、ユーザーが過度な混乱なくタスクを完了できるだけの情報を提供することで、データ形式・入力例・必須項目の明示などが必要に応じて求められる。",
    accessibility:
      "理解可能(Understandable)・知覚可能(Perceivable)・堅牢(Robust) ― 3.3.2はガイドライン3.3「入力支援」に属し、POUR原則のうち「理解可能」に対応する。1.3.1(情報及び関係性)は「知覚可能」、4.1.2(名前(name)・役割(role)・値(value))は「堅牢」の基準。3つは別々の原則に属し、ラベルの「見え方」「マークアップ」「支援技術への伝達」という3つの異なる側面を別々の基準でカバーしている。",
    useCases: [
      "全ての入力欄に目に見えるラベルを付ける(必須・任意を問わない)",
      "プレースホルダーやARIAラベルだけに頼らない",
      "データ形式・入力例・必須項目の明示など、必要な補足情報を添える",
    ],
    searchHint: "undue confusion",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html",
    refs: [
      { kind: "sc", level: "A", label: "3.3.2 ラベル又は指示", url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html" },
      { kind: "sc", level: "A", label: "1.3.1 情報及び関係性", url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
      { kind: "sc", level: "AA", label: "1.3.5 入力目的の特定", url: "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html" },
      { kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="140" height="30" viewBox="0 0 140 30">
          <text x="0" y="10" fontSize="9" fill="#A3821F" fontFamily="Jost, Noto Sans JP">メールアドレス(必須)</text>
          <rect x="1" y="14" width="138" height="14" rx="3" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、目に見えるラベルの考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Placeholders in Form Fields Are Harmful",
    term: "Form field(入力欄)",
    color: "#7A4F7E",
    position: "ラベル・説明文を入力欄の中(プレースホルダー)に置くのは有害という、調査に基づく指針(数値基準ではない)",
    size: <NoData>数値基準なし</NoData>,
    stance:
      <><Hl>ラベルや説明文を入力欄の中に置くこと(プレースホルダー頼み)はユーザビリティとアクセシビリティを下げるため避けるべき</Hl>だとしている。デザイナーは視覚的な煩雑さを減らせるという理由でプレースホルダーを好むが、多くのユーザビリティ上の問題を引き起こすとしている。良し悪しを段階で示し、ラベルとヒントを入力欄の外に常に表示する形を「最良(Best)」、ラベルに加えてプレースホルダーをヒントとして使う形を「より良い(Better)」としている。フローティングラベルは従来のプレースホルダーの欠点を一部和らげるものの、場所があるならラベルとヒントを欄の外に置くのが最良だとしている。</>,
    exceptions:
      "長いフォームで入力中にヒントを忘れると、書いた内容を消して確認しないと元のヒントが見えないという記憶の負担が生じるとしている。ラベルなしでは、入力済みかどうかを確認するために各欄を1つずつ消して確認する必要が生じるとしている。アイトラッキング調査では、ユーザーの視線は空欄に引き寄せられるとしている。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際のユーザビリティ調査(記憶負荷・確認のしやすさ・視線)に基づく指針。",
    useCases: [
      "最良はラベルもヒントも入力欄の外に常に表示する形。ラベル+プレースホルダーのヒントは「より良い」止まりで、入力に欠かせない説明は欄の外に置く",
      "長いフォームほどラベル常時表示の効果が大きい",
      "入力済み内容を確認しやすい設計にする",
    ],
    searchHint: "",
    url: "https://www.nngroup.com/articles/form-design-placeholders/",
    refs: [
      { label: "Placeholders in Form Fields Are Harmful", url: "https://www.nngroup.com/articles/form-design-placeholders/" },
    ],
    confirmedNote: "記事本文を直接取得して確認(2026-10)。",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <text x="0" y="10" fontSize="9" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">メールアドレス</text>
        <rect x="1" y="14" width="138" height="12" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.4" />
      </svg>
    ),
    illustrationNote: "ラベルは欄の外に常時表示(概念図・系列識別色)",
  },
];

const TEXTAREA_NOTES = [
  {
    key: "hig",
    name: "Apple",
    position: "テキストフィールドは短い特定の文言専用。複数行・大きな文章の入力には、延長ではなく別コンポーネント「Text view」を使うべきとしている",
    text: "HIGは、テキストフィールドを氏名やメールアドレスなど短い文言のためのコンポーネントとし、長い文章には別のコンポーネントの「Text view」を使うとしている。Text viewは高さを自由に決められ、内容があふれるとスクロールでき、長い文章・編集できる文章・特別な書式の文章を表示するときに使う。少しの文章なら、表示はラベル、編集はテキストフィールドのほうが簡単としている。",
    refs: [{ label: "Text views", url: "https://developer.apple.com/design/human-interface-guidelines/text-views" }],
  },
  {
    key: "material",
    name: "Google",
    position: "別のコンポーネントではなく、同じText fieldの中の「複数行(multi-line)」と「テキストエリア(text area)」",
    text: "M3では、複数行の入力は別のコンポーネントではなく、テキストフィールドの3つの形の中で扱う。1行の欄は長い回答に向かない。複数行の欄は最初は1行で、あふれると下に伸びて画面の要素を押し下げる。テキストエリアは最初から高さがあり、決まった高さを超えるとスクロールする。最初から大きいことで、長い回答を書いてよいと伝える。最大の行数・高さのdpの値は記載なし。",
    refs: [{ label: "Text fields ― Guidelines", url: "https://m3.material.io/components/text-fields/guidelines" }],
  },
  {
    key: "wcag",
    name: "W3C",
    position: "aria-multiline属性は独自実装のrole=\"textbox\"にのみ関わる。ネイティブの<textarea>要素はこの属性なしで複数行の意味が伝わる",
    text: "aria-multiline属性は、独自に作ったrole=\"textbox\"のコンポーネントが複数行の入力を受け付けるかを支援技術に伝えるためのもの。ARIAは要素の動作そのものは変えないため、HTMLのtextarea要素には不要(MDNの解説)。高さを固定して内容を隠す作りは、1.4.4(テキストのサイズ変更)・1.4.10(リフロー)に反するおそれがある(どちらもテキストエリア専用ではない一般的な達成基準)。",
    refs: [
      { label: "WAI-ARIA 1.2: aria-multiline", url: "https://www.w3.org/TR/wai-aria-1.2/#aria-multiline" },
      { kind: "sc", level: "AA", label: "1.4.4 テキストのサイズ変更", url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html" },
      { kind: "sc", level: "AA", label: "1.4.10 リフロー", url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html" },
      { kind: "mdn", label: "aria-multiline", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-multiline" },
    ],
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    position: "入力欄の見た目の大きさ自体が、求められている回答の長さを示す視覚的な手がかりになるという指針",
    text: "短い入力欄は短い回答(郵便番号・年齢など)を、長く大きい入力欄は詳しい入力(住所・説明・コメントなど)を求めていると伝わる、としている。電話番号・市区町村・郵便番号の欄を同じ大きさにそろえて利用者を迷わせた例(NAICのフォーム)を挙げており、テキストエリアの高さは求める回答の長さに合わせる、という実務的な指針になる。",
    refs: [{ label: "4 Principles to Reduce Cognitive Load in Forms", url: "https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/" }],
  },
];

function TextareaNotes() {
  return (
    <>
      <div className="dsp-mobile-only" style={styles.textareaGrid}>
        {TEXTAREA_NOTES.map((s) => (
          <div key={s.key} style={styles.sourceCard}>
            <div style={styles.sourceName}>{s.name}</div>
            <div style={styles.positionBadge}>{s.position}</div>
            <p style={styles.sourceStance}>{s.text}</p>
            <div style={styles.textareaRefs}><RefList refs={s.refs} withW3cNote={s.key === "wcag"} /></div>
          </div>
        ))}
      </div>

      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.matrixGrid}>
            <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
            {TEXTAREA_NOTES.map((s) => (
              <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                <div style={styles.sourceName}>{s.name}</div>
              </div>
            ))}
            <div style={styles.labelCell}>位置づけ</div>
            {TEXTAREA_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
            <div style={styles.labelCell}>基本方針</div>
            {TEXTAREA_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.text}</div>))}
            <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
            {TEXTAREA_NOTES.map((s) => (
              <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>
                <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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

/* テキストフィールドのパターン(4系列の内容をまとめたもの。出典の系列を各カードに示す) */
function FieldMini({ lead, trail, prefix, suffix, value, placeholder, counter, align, masked }) {
  return (
    <div style={{ width: 150 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, border: "1.4px solid #9EA4C4", borderRadius: 4, padding: "5px 7px", background: "#FFFFFF", height: 28 }}>
        {lead && <span style={{ fontSize: 11, color: "#565D8A" }}>{lead}</span>}
        {prefix && <span style={{ fontSize: 11, color: "#666D93" }}>{prefix}</span>}
        <span style={{ flex: 1, fontSize: 11, color: value ? "#171B36" : "#666D93", textAlign: align || "left", letterSpacing: masked ? 2 : 0 }}>{value || placeholder}</span>
        {suffix && <span style={{ fontSize: 11, color: "#666D93" }}>{suffix}</span>}
        {trail && <span style={{ fontSize: 11, color: "#565D8A" }}>{trail}</span>}
      </div>
      {counter && <div style={{ fontSize: 9, color: "#666D93", textAlign: "right", marginTop: 2 }}>{counter}</div>}
    </div>
  );
}

const FIELD_PATTERNS = [
  { t: "先頭のアイコン(目的を示す)", fig: <FieldMini lead="🔍" placeholder="検索" />, d: "先頭の画像やアイコンで、入力欄の目的を示す。", src: "Apple(先頭は目的、末尾は追加の機能)・Google(Leading icon)" },
  { t: "末尾のボタン(消す・表示を切り替える)", fig: <FieldMini value="山田太郎" trail="✕" />, d: "末尾には、入力を一度に消すクリアボタンなど、追加の機能を置く。", src: "Apple(iOS・iPadOSのClearボタン)・Google(clear text)" },
  { t: "パスワード(隠す入力)", fig: <FieldMini value="●●●●●●" trail="👁" masked />, d: "パスワードなどは、入力した文字を隠す欄を使う。末尾のアイコンで、隠す/表示するを切り替えられる。", src: "Apple(secure text field)・Google(password toggle)" },
  { t: "前後に単位や決まった文字を置く", fig: <FieldMini prefix="¥" value="1,200" suffix="円" />, d: "金額の「¥」、重さの「kg」、メールの「@example.com」など、決まった文字を入力欄の前後に表示する。", src: "Google(prefix・suffix text)" },
  { t: "メールアドレス・数値など形式のある入力", fig: <FieldMini placeholder="name@example.com" />, d: "入力する内容に合ったキーボード(メール用・数字用など)を出す。数値は書式(小数点・通貨・%)を自動でそろえられる。名前やメールアドレスなど利用者自身の情報は、入力の目的をプログラムで判別できるようにする。", src: "Apple(キーボードの種類・number formatter)・W3C(1.3.5 入力目的の特定、レベルAA)" },
  { t: "文字数カウンター", fig: <FieldMini value="こんにちは" counter="5 / 50" />, d: "入力できる文字数に上限があるとき、欄の下に今の文字数と上限を表示する。", src: "Google(counter text)" },
  { t: "左揃え・右揃え", fig: <FieldMini value="12,800" align="right" />, d: "4系列とも、入力欄の文字の揃え方は定めていない。文字は左揃え(右から左に書く言語では右揃え)が基本で、桁をそろえて比べたい数値だけ右揃えにする、という使い分けが一般的(AI解釈)。", src: "4系列とも記載なし" },
];

function FieldPatterns() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h3 style={styles.patternTitle}>テキストフィールドのパターン</h3>
      <div style={styles.patternGrid}>
        {FIELD_PATTERNS.map((f) => (
          <div key={f.t} style={styles.patternCard}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{f.fig}</div>
            <div style={styles.patternName}>{f.t}</div>
            <p style={styles.patternText}>{f.d}</p>
            <div style={styles.patternSrc}>{f.src}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TextFieldSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto" }}>
      <div style={{ position: "relative", marginBottom: 6 }}>
        <span style={{ position: "absolute", top: -8, left: 10, background: "#FFFFFF", padding: "0 4px", fontSize: 10.5, color: "#3A4FCF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>メールアドレス</span>
        <div style={{ border: "1.6px solid #3A4FCF", borderRadius: 6, padding: "10px 12px", fontSize: 13, color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>taro@example.com</div>
      </div>
      <div style={{ fontSize: 10.5, color: "#666D93", padding: "0 4px" }}>正しい形式で入力してください</div>
    </div>
  );
}

function TextareaSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto" }}>
      <div style={{ position: "relative", marginBottom: 6 }}>
        <span style={{ position: "absolute", top: -8, left: 10, background: "#FFFFFF", padding: "0 4px", fontSize: 10.5, color: "#3A4FCF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>お問い合わせ内容</span>
        <div style={{ border: "1.6px solid #3A4FCF", borderRadius: 6, padding: "10px 12px", height: 58, fontSize: 13, color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", textAlign: "left" }}>
          ご質問の詳細をご記入ください。折り返しご連絡いたします。
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: "#666D93", padding: "0 4px" }}>複数行にわたる入力に対応</div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "文字を入力する欄(1行のテキストフィールドと、複数行のテキストエリア)";
const ABOUT = [
  { k: "目的・役割", v: "名前・メールアドレス・本文など、自由な文字を入力してもらう" },
  { k: "よく使われる場面", v: "会員登録・ログインのフォーム、問い合わせの本文、コメント欄" },
  { k: "似たコンポーネントとの違い", v: <>検索のための欄は<PageLink to="/components/text-inputs/search-field">検索フィールド</PageLink>、決まった選択肢から選ぶなら<PageLink to="/components/selection/select">セレクト(プルダウン)</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "入力欄の中の文字(プレースホルダー)を、ラベルの代わりにしてよい?",
    sides: [
      { who: "W3C・NN group", color: "#A3821F", t: "代わりにしない。目に見えるラベルか説明が必要で、プレースホルダーだけでは足りない(W3C 3.3.2)。ラベルとヒントを欄の外に常に見せるのが最良(NN group)" },
      { who: "Google", color: "#2F7D6E", t: "すべての欄にラベルを付け、常に見せる。ラベルは欄の中に置いてよく、選ぶと上へ移る(フローティングラベル)" },
      { who: "Apple", color: "#C2542A", t: "プレースホルダーで欄の目的を示してよい。ただし入力すると消えるので、別にラベルを置くと役に立つ、としている(必須とはしていない)" },
    ],
    tip: "ラベルは欄の外に常に表示し、プレースホルダーは入力例(「例: name@example.com」)だけに使う形にすれば、4系列のどれとも食い違わない。場所が足りないときは、Googleのフローティングラベルが次の選択肢だ(NN groupは、場所があるなら外に置く方がよいとしている)。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "ラベルは欄の外に常に見せる", d: "", who: "W3C 3.3.2・NN group" },
  { n: 2, t: "プレースホルダーは入力例だけに使う", d: "ラベルの代わりにしない", who: "W3C 3.3.2" },
  { n: 3, t: "場所が足りないときはフローティングラベル", d: "", who: "Google" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
            title="良い例・悪い例 ― ラベルとプレースホルダー"
            items={[
              { kind: "good", fig: <><div style={{ width: 210 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#2E3457", marginBottom: 4 }}>メールアドレス</div><div style={{ border: "1.5px solid #8E93B5", borderRadius: 4, padding: "7px 10px", fontSize: 13, color: "#666D93" }}>例: name@example.com</div></div></>, text: "ラベルが欄の外に常に見えていて、プレースホルダーは入力例だけ。" },
              { kind: "bad", fig: <><div style={{ width: 210 }}><div style={{ border: "1.5px solid #8E93B5", borderRadius: 4, padding: "7px 10px", fontSize: 13, color: "#666D93" }}>メールアドレス</div></div><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>↓ 入力すると</span><div style={{ width: 210 }}><div style={{ border: "1.5px solid #8E93B5", borderRadius: 4, padding: "7px 10px", fontSize: 13, color: "#171B36" }}>taro@</div></div></>, text: "ラベルがなく、プレースホルダーだけで欄の目的を示している。入力すると消えて、何の欄か分からなくなる。" },
            ]}
            basis="W3C 3.3.2(目に見えるラベルか説明が必要。プレースホルダーだけでは足りない)、このページの「4系列のどれとも食い違わない」形の記載。"
            note="Googleのフローティングラベル(欄の中に置き、選ぶと上へ移る)はラベルが残るので、ここでの悪い例には当たらない。"
          />
  );
}

export default function TextInputsTextFieldPage() {
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
        <SidebarNav currentPath="/components/text-inputs/text-field" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / テキストフィールド・テキストエリア</span>
            <span>SPEC No. 020</span>
          </div>

          <h1 style={styles.title}>テキストフィールド・テキストエリア</h1>
          <SummaryCard keyPoints={KP}
            image={<><div style={styles.swatchPairRow}>
              <div style={styles.swatchPairItem}>
                <TextFieldSwatch />
                <div style={styles.swatchPairCaption}>① テキストフィールド(単一行)</div>
              </div>
              <div style={styles.swatchPairItem}>
                <TextareaSwatch />
                <div style={styles.swatchPairCaption}>② テキストエリア(複数行)</div>
              </div>
            </div></>}
            imageNote={<>ラベル・入力欄・補足情報(サポートテキスト/エラーテキスト)の3層構造は、単一行・複数行のどちらにも、AppleとGoogleに共通して見られる(W3C・NN groupは見た目の構造を定めていない)。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />
          <GoodBadFigure />


          <h2 style={styles.diagramTitle}>① テキストフィールド(単一行)</h2>
          <FieldPatterns />



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              このページで最も重要な点は、<strong>W3CとNielsen Norman Groupが、それぞれ異なる角度から「プレースホルダーだけに頼るべきではない」という同じ結論</strong>に達していることだ。W3Cは適合基準(3.3.2)として「目に見えるラベル又は指示」を要求し、NN groupは記憶負荷や確認のしやすさといった実際のユーザビリティ調査から、ラベルを入力欄の外に常時表示すべきだとしている。規格と実証研究という異なるアプローチが、同じ実務上の結論に収束している点は信頼度が高いと言える。
            </p>
            <p style={styles.synthesisText}>
              Googleは<strong>「フローティングラベル」という、常時ラベルを表示しつつ省スペースにする具体的な解決策</strong>を持っており、W3C/NN groupが指摘する問題への実務的な回答の1つになっている。フォーカス時や入力時にラベルが浮き上がる構造は、「常に見えるラベル」という要求と、コンパクトなレイアウトという要求を両立させる工夫だ。ただしNN groupは、<strong>フローティングラベルは従来のプレースホルダーの欠点を一部和らげるが、場所があるならラベルとヒントを欄の外に置くのが最良</strong>としている。
            </p>
            <p style={styles.synthesisText}>
              W3Cは<strong>ラベルは全ユーザーに提示されるが、名前(name)は支援技術によってのみ露出される場合がある</strong>という区別を明確にしており、見た目のラベル(3.3.2)・マークアップ上の関連付け(1.3.1)・支援技術への伝達(4.1.2)という3つの異なる基準が、それぞれ別の失敗モードをカバーしていることが分かる。
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

          <hr style={styles.sectionDivider} />

          <h2 style={styles.diagramTitle}>② テキストエリア(複数行)</h2>
          <div style={styles.textareaImage}>
            <span style={styles.textareaImageLabel}>コンポーネントイメージ(テキストエリア)</span>
            <TextareaSwatch />
            <p style={styles.textareaImageNote}>複数行の文章を入力する欄。ラベル・入力欄・補足情報(文字数など)で構成する。</p>
          </div>
          <p style={styles.diagramNote}>ここから先は、複数行のテキストエリアに関する4系列比較だ(①のテキストフィールドとは別トピック)。</p>
          <TextareaNotes />
          <p style={styles.diagramNote}>Appleは複数行入力を「Text view」という別コンポーネントとして独立させている一方、Googleは同じText Fieldsコンポーネントの複数行バリアントとして扱っており、系列によって捉え方が異なる。ネイティブの<code>&lt;textarea&gt;</code>要素であれば、WAI-ARIA仕様のaria-multiline(WCAGの要件ではなく、独自の入力欄で使う属性)は追加対応なしで済む点が実務上重要だ。NN groupが指摘する通り、入力欄の高さ自体が求める回答の長さを示す手がかりになるため、短い回答を求める欄をテキストエリアサイズにしない(逆も同様)という配慮が必要だ。</p>

          <RelatedPages paths={["/components/text-inputs/search-field", "/components/text-inputs/validation", "/components/text-inputs/input-validation", "/components/selection/select"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["入力・フォーム"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  patternTitle: { fontSize: 14, fontWeight: 700, color: "#171B36", margin: "0 0 10px" },
  patternGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10 },
  patternCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 10px" },
  patternName: { fontSize: 12.5, fontWeight: 700, color: "#171B36", marginBottom: 4 },
  patternText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", margin: "0 0 6px" },
  patternSrc: { fontSize: 10, color: "#666D93" },
  textareaImage: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", marginBottom: 20, textAlign: "center" },
  textareaImageLabel: { display: "block", fontSize: 11.5, fontWeight: 700, color: "#454C78", textAlign: "left", marginBottom: 12 },
  textareaImageNote: { fontSize: 11, color: "#666D93", margin: "12px 0 0", lineHeight: 1.6 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  swatchPairRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 },
  swatchPairItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  swatchPairCaption: { fontSize: 10.5, color: "#565D8A", fontFamily: "'IBM Plex Mono', monospace" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 22px", lineHeight: 1.6 },
  textareaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10, marginBottom: 4 },
  sectionDivider: { border: "none", borderTop: "1px dashed #D5D9EC", margin: "8px 0 26px" },
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
  textareaRefs: { marginTop: 8 },
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
