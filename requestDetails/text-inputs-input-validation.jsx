import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection } from "./page-parts";

/**
 * コンポーネントレイヤー「Text inputs / バリデーション」ページ。
 *
 * 2026-09 新規作成(ページ分割): ユーザーから「エラー表示とバリデーションは明確に
 * 違うものなので、使い方・コンポーネント・使用ルールを分けて記載してほしい。文章量や
 * 比較POINTが多ければページも分けてよい」というフィードバックを受け、旧「エラー表示・
 * バリデーション」ページ(SPEC No.023)から分離した新規ページ。「エラー表示」ページ
 * (/components/text-inputs/validation)が「検知したエラーをどう見せるか」(文言・
 * 視覚表現・訂正案の提示)を扱うのに対し、このページは「いつ検証するか」という
 * タイミング・トリガーの仕組みに対象を絞る(リアルタイム/フォーカス離脱時/送信時、
 * 必須項目の示し方、エラーが出る前の書式ヒント、入力済みの成功表示)。
 *
 * このページの発見: Nielsen Norman Groupが最も具体的なタイミング指針を持ち、
 * 「入力中(タイピング中)にエラーを出さない」「フィールドを離れた時点で検証する」
 * を原則としつつ、パスワードの要件チェックリストのような場面でのみリアルタイム
 * 検証を認めている。Appleも「メールアドレスはフォーカスが外れた時、ユーザー名・
 * パスワードの作成は次のフィールドに移る前に検証」という、場面に応じた使い分けを
 * 示しており、方向性がNN groupと一致する。一方W3C(WCAG)は、エラーを動的に通知
 * する技術的な仕組み(ARIA19のライブリージョン)や送信成功時のフィードバック
 * (G199)は規定するものの、「いつ検証すべきか」自体を規範的に定めた記述は見当たら
 * ず、実装者の判断に委ねられている。この「W3Cはタイミングに無関心」という発見は
 * 探し方が甘かったのではなく、実際にWAIの複数の一次情報を直接確認した上での結論。
 *
 * 2026-09 追記: ユーザーから「タイミング(リアルタイム/フォーカス離脱時/送信時)の比較が
 * 分からないので、図やテキストを用いて別項目を作り、分かりやすく解説してほしい」という
 * フィードバックを受け、AI解釈の下に「検証タイミングの比較(図解)」セクションを新設した。
 * (1)5つの時点(入力前・入力中・フィールドを離れた時・送信時・送信後)×4系列の比較表
 * (◯/△/✕/―/?)、(2)各タイミングの解説カード(メールアドレス欄の画面イメージ・良い点・
 * 注意点・どの系列が勧めているか)、(3)入力欄の種類ごとの目安表(◯/△/✕)の3つ。
 * 新しい一次情報の追加ではなく、SOURCESに集約済みの各系列の記述を時点ごとに整理し直したもの
 * (「プレースホルダーは入力を始めると消える」はテキストフィールドページのNN group記事による)。
 *
 * Nielsen Norman Group(Hostile Patterns in Error Messages、10 Design Guidelines
 * for Reporting Errors in Forms)/ W3C(WAI「Validating Input」チュートリアル、
 * ARIA19、G199)は公式ページ・記事本文を直接取得して確認済み(2026-09)。Apple
 * (HIG Text fields / Feedback)は公式サイトがSPAで本文を直接取得できず、検索結果
 * による間接確認(2026-09)。Google(Material Design 3 Text fields)のサポート
 * テキスト/エラーテキストの切り替えの仕組みも検索結果による間接確認で、具体的な
 * 検証トリガー条件はm3.material.io本文で確認できていない。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "専用ページなし(Text fields / Feedbackの記載に含まれる)",
    term: <NoData>専用の部品なし(入力の決まりの中で扱う)</NoData>,
    color: "#C2542A",
    position: "値は入力されたらすぐに確かめ、問題があればすぐに知らせる(動的な検証)。欄ごとのタイミング(フォーカスが外れたときなど)の決まりはない",
    colorInfo: "色についての明確な規定は確認できていない(視覚的な状態表現は「エラー表示」ページを参照)。",
    stance:
      <>長いフォームを書き終えてから戻って直すのは利用者の負担になるため、<Hl>値は入力されたらすぐに確かめ</Hl>、問題を見つけたらすぐに知らせて、その場で直せるようにするとしている(HIG Entering dataの本文で確認、2026-11)。どの時点で確かめるか(入力中か、欄を離れたときか)は書いていない。</>,
    exceptions:
      "数値の欄では、数字だけを受け付けて決まった形で表示する書式(number formatter)を使うとよいとしている。必須の入力がある場合は、入力が済むまで「次へ」などのボタンを使えないようにして、入力が必要なことを伝える。",
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "値は入力されたらすぐに確かめ、問題があればすぐに知らせる",
      "ユーザー名・パスワードの作成は、次のフィールドに移る前に検証する",
      "数字専用フィールドなど値の種類が限定される場合は、不正な文字の入力時点で警告する",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/entering-data#Best-practices",
    refs: [
      { label: "Entering data ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/entering-data#Best-practices" },
      { label: "Feedback", url: "https://developer.apple.com/design/human-interface-guidelines/feedback" },
    ],
    confirmedNote: "HIG Entering dataの本文で確認(2026-11)。",
    illustration: () => (
      <svg width="120" height="40" viewBox="0 0 120 40">
        <rect x="1" y="1" width="118" height="20" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.4" />
        <text x="8" y="14" fontSize="8.5" fill="#171B36" fontFamily="Jost, Noto Sans JP">meail@example</text>
        <text x="2" y="33" fontSize="7" fill="#C2542A" fontFamily="Jost, Noto Sans JP">→ フォーカスが外れた時に検証(場面により異なる)</text>
      </svg>
    ),
    illustrationNote: "フォーカス変更をきっかけに検証(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Text fields(サポートテキスト/エラーテキストの切り替え)",
    term: "Supporting text → Error text",
    color: "#2F7D6E",
    position: "検証する欄では、欄の下のサポートテキスト(書式のヒント)を、同じ位置のエラーテキストに入れ替える(レイアウトを動かさないため)。いつ検証するかの決まりは記載なし",
    colorInfo: "エラーテキストはエラーの色で表示し、エラーアイコンも表示することを強く勧めている。",
    stance:
      "Material Design 3のテキストフィールドは、通常は欄の下の「サポートテキスト」で使い方や書式のヒントを示し、パスワードのように検証する欄では、エラーのときにサポートテキストをエラーテキストに入れ替える。行が増えてレイアウトが動くのを避けるためとしている(M3 Text fieldsのガイドラインで確認、2026-11)。",
    exceptions:
      "検証をいつ行うか(入力中・欄を離れたとき・送信時)の決まりは、M3のテキストフィールドのページには書かれていない。",
    accessibility:
      "操作可能(Operable)・知覚可能(Perceivable) ― サポートテキストからエラーテキストへの切り替えはテキストによる状態伝達の一種と考えられるが、直接確認はできていない。",
    useCases: [
      "書式のヒントは、エラーが起きる前からサポートテキストとして常に示しておく",
      "検証エラー時は同じ位置のテキストをエラーテキストに置き換える(改行によるレイアウト崩れを避ける)",
      "パスワードのような複雑な入力は、検証を伴うテキストフィールドとして扱う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/text-fields/guidelines",
    refs: [
      { label: "Text fields(サポートテキスト/エラーテキストの切り替え)", url: "https://m3.material.io/components/text-fields/guidelines" },
    ],
    confirmedNote: "M3 Text fieldsのガイドラインの本文で確認(2026-11)。",
    illustration: () => (
      <svg width="120" height="46" viewBox="0 0 120 46">
        <rect x="1" y="1" width="118" height="20" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.4" />
        <text x="8" y="14" fontSize="8.5" fill="#171B36" fontFamily="Jost, Noto Sans JP">パスワード</text>
        <text x="2" y="30" fontSize="7" fill="#9EA4C4" fontFamily="Jost, Noto Sans JP">サポートテキスト(書式ヒント)</text>
        <text x="2" y="41" fontSize="7" fill="#2F7D6E" fontFamily="Jost, Noto Sans JP">↓ 検証エラー時は同じ位置でエラーテキストに置換</text>
      </svg>
    ),
    illustrationNote: "同じ位置でサポートテキスト⇄エラーテキストを切り替え(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI「Validating Input」チュートリアル / ARIA19(role=alert・ライブリージョン) / G199(送信成功のフィードバック) / WCAG 3.3.7(Redundant Entry)",
    term: "Validating Input(WAIのチュートリアル)",
    color: "#A3821F",
    position: "検証を「いつ行うべきか」の規範的な基準は見当たらない。ARIA19はエラーを動的に通知する技術的な仕組み(ライブリージョン)を示すが、タイミング自体は実装者の判断に委ねている。G199は送信成功時のフィードバック提供を推奨する、数少ない「タイミング」に触れた技術",
    colorInfo: "色についての明確な規定はこの3つの資料には見当たらない(視覚的な状態表現は「エラー表示」ページを参照)。",
    glossary: [
      { term: "サイズ", desc: "検証タイミング専用の数値基準はない。" },
      { term: "ARIA19", desc: "role=\"alert\"またはaria-live属性を持つライブリージョンに、JavaScriptでエラーメッセージを挿入することで、スクリーンリーダーに動的な変化を通知する技術。ライブリージョンのコンテナ自体はページ読み込み時点でDOM内に存在している必要がある。" },
      { term: "G199", desc: "フォームやデータの送信が成功した際に、成功したことを明示的に伝えるフィードバック(「正常にログインしました」等)を提供する技術。" },
      { term: "3.3.7 Redundant Entry・レベルA", desc: "同じ手続きの中で、すでに入力・提供された情報をもう一度求める場合は、自動で入れておくか、選べるようにすることを求める基準(WCAG 2.2で追加)。" },
    ],
    stance:
      "WAI「Validating Input」チュートリアルは、クライアント側での検証は一般に良いユーザー体験につながり、エラーの解決を分かりやすくするとされているが、検証を「いつ」実行すべきか(リアルタイム/フォーカス離脱時/送信時)を指定する記述はない。可能な限り、ユーザーが入力内容を確認し訂正できる機会を持てるようにすべきだ、という一般原則にとどまる。ARIA19(role=\"alert\"またはライブリージョンでエラーを識別する技術)は、エラーメッセージをライブリージョンに動的に挿入してスクリーンリーダーに通知する仕組みは規定しているが、いつ挿入するかというタイミング自体は実装者の判断に委ねられており、技術の例では送信時に検証し500ミリ秒待ってから挿入する例が示されているのみ。G199(送信成功時のフィードバック提供)は、送信が成功したことを明示的に伝えるフィードバックを提供すべきだとされており、検証タイミングというより送信「後」の結果通知に関する技術。WCAG 2.2で追加された3.3.7(レベルA)は、同じ手続きの中ですでに入力された情報をもう一度求める場合、自動で入れておくか、選べるようにすることを求める(例: 請求先住所の「配送先と同じ」チェック、エラーの後も入力済みの内容を消さない)。ブラウザの自動入力だけでは満たしたことにならず、サイト側で前の入力を引き継ぐ必要がある。パスワードの確認入力のようなセキュリティ上の理由、記憶ゲームのように再入力が本質的な場合、前の情報が無効になった場合は例外。",
    exceptions:
      "ARIA19のライブリージョンは、ページ読み込み時点でDOM内に空のコンテナとして存在している必要があり、後から動的に追加したコンテナには対応できない支援技術がある、という実装上の注意点がある。",
    accessibility:
      "堅牢(Robust) ― ARIA19のライブリージョンによる動的な通知、G199の送信結果フィードバックが中心。「いつ検証するか」自体はWCAGの規範的な適合基準ではなく、実装上の判断に委ねられている点に注意してください。3.3.7は「理解可能(Understandable)」の入力支援(3.3)に関わる。",
    useCases: [
      "エラーメッセージ用のライブリージョンコンテナは、ページ読み込み時点でDOM内に空の状態で用意しておく",
      "検証タイミング自体に絶対的な基準はないため、他系列(特にNN groupの実務指針)を参考に決める",
      "送信が成功した場合も、成功したことを示す明示的なフィードバックを提供する(G199)",
      "エラーで送り返しても、入力済みの内容を消さない(3.3.7)",
    ],
    searchHint: "",
    url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19",
    refs: [
      { label: "WAI「Validating Input」チュートリアル / ARIA19(role=alert・ライブリージョン) / G199(送信成功のフィードバック) / WCAG 3.3.7(Redundant Entry)", url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19" },
      { label: "Validating Input(WAIチュートリアル)", url: "https://www.w3.org/WAI/tutorials/forms/validation/" },
      { label: "G199 送信成功のフィードバック", url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G199" },
      { kind: "sc", level: "A", label: "3.3.7 冗長な入力", url: "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html" },
    ],
    confirmedNote: "ARIA19・Validating Inputチュートリアル・G199はいずれも本文を直接取得して確認済み(2026-09)。3つとも検証タイミング自体を規定するものではなく、通知の仕組みや送信後のフィードバックについての技術である点に注意してください。3.3.7はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="30" viewBox="0 0 120 30">
          <rect x="1" y="1" width="118" height="22" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="15" fontSize="7.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-live(タイミングは規定なし)</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザイン・タイミングの規定はなく、通知の仕組み(ライブリージョン)のみを図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Hostile Patterns in Error Messages / 10 Design Guidelines for Reporting Errors in Forms",
    term: "Inline validation(インラインの検証)",
    color: "#7A4F7E",
    position: "検証タイミングについて最も具体的な実務指針を持つ。原則は「フィールドを離れた時」に検証し、入力中(タイピング中)にエラーを出すことは避けるべきとしている。パスワードの要件チェックリストのような特殊なケースでのみ、入力中のリアルタイム検証を許容する",
    colorInfo: "色についての数値基準はこの2記事にはない(視覚的な状態表現は「エラー表示」ページを参照)。",
    stance:
      <>「Hostile Patterns in Error Messages」は、大半のケースでは、ユーザーがその<Hl>フィールドの入力を終えて次のフィールドへ移動するまでエラー表示を待つべき</Hl>だとしている。入力中にエラーメッセージを表示するのは、頼んでもいない叱責のように感じられ、苛立たせる可能性があるため。「10 Design Guidelines for Reporting Errors in Forms」も同様に、理想的にはすべての検証をインラインで行い、ユーザーがフィールドの入力を終えた時点でエラーがあれば近くにインジケーターを表示すべきだとしつつ、パスワードのような複雑なフィールドでは、入力中に即座に検証するインライン表示(タイプ中に表示される)が有効だともしている。両記事を通じて一貫しているのは、「入力途中で急いで警告しない」という原則。</>,
    exceptions:
      "必須項目が空欄のまま送信された場合のエラーは、送信を試みた後に表示するのが有用だとしている。技術的にリアルタイム検証ができない場合は、フォームやページが再読み込みされた際にエラーメッセージが分かりやすく見つけやすい場所にあるようにすべきだとしている。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際のユーザー体験調査(苛立ち・中断のしやすさ)に基づく実務的なタイミング指針。",
    useCases: [
      "大半のフィールドは、ユーザーが入力を終えてフィールドを離れた時点(フォーカス離脱時)で検証する",
      "パスワードの要件チェックリストなど、即時フィードバックがユーザーの助けになる場合のみ、入力中のリアルタイム検証を使う",
      "必須項目の未入力は、送信を試みた後にエラーとして示す",
    ],
    searchHint: "unwarranted scolding",
    url: "https://www.nngroup.com/articles/hostile-error-messages/",
    refs: [
      { label: "Hostile Patterns in Error Messages / 10 Design Guidelines for Reporting Errors in Forms", url: "https://www.nngroup.com/articles/hostile-error-messages/" },
      { label: "10 Design Guidelines for Reporting Errors in Forms", url: "https://www.nngroup.com/articles/errors-forms-design-guidelines/" },
    ],
    confirmedNote: "両記事とも本文を直接取得して確認済み(2026-09)。",
    illustration: () => (
      <svg width="120" height="40" viewBox="0 0 120 40">
        <rect x="1" y="1" width="118" height="20" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.4" />
        <text x="8" y="14" fontSize="8.5" fill="#171B36" fontFamily="Jost, Noto Sans JP">meail@example</text>
        <text x="2" y="33" fontSize="7" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">✕ 入力中は検証しない → 離脱時に検証</text>
      </svg>
    ),
    illustrationNote: "入力中の検証を避け、フィールド離脱時に検証(概念図・系列識別色)",
  },
];

/* 検証タイミングの比較(図解)
   入力前 → 入力中 → フィールドを離れた時 → 送信時 → 送信後 の5つの時点で、各系列が何を定めているか */
const TIMING_POINTS = [
  { key: "before", name: "入力前", sub: "ヒントを示す" },
  { key: "typing", name: "入力中", sub: "リアルタイム" },
  { key: "blur", name: "フィールドを離れた時", sub: "フォーカス離脱" },
  { key: "submit", name: "送信時", sub: "送信ボタン" },
  { key: "after", name: "送信後", sub: "結果の通知" },
];

/* m: "good"=推奨・既定 / "cond"=条件付き / "avoid"=避ける / "none"=言及なし / "unknown"=未確認 */
const TIMING_MATRIX = [
  {
    key: "hig", name: "Apple",
    cells: {
      before: { m: "none", t: "言及なし" },
      typing: { m: "good", t: "入力されたらすぐに確かめ、問題があればすぐに知らせる(入力中か離れたときかは記載なし)。数値の欄は数字だけを受け付ける書式を使う" },
      blur: { m: "none", t: "記載なし(「すぐに知らせる」のみ)" },
      submit: { m: "none", t: "言及なし(長いフォームの最後にまとめて直させるのは負担としている)" },
      after: { m: "none", t: "言及なし" },
    },
  },
  {
    key: "material", name: "Google",
    cells: {
      before: { m: "good", t: "サポートテキストで書式のヒントを常に示す" },
      typing: { m: "none", t: "検証のきっかけは記載なし" },
      blur: { m: "none", t: "検証のきっかけは記載なし" },
      submit: { m: "none", t: "検証のきっかけは記載なし" },
      after: { m: "none", t: "言及なし" },
    },
  },
  {
    key: "wcag", name: "W3C",
    cells: {
      before: { m: "none", t: "タイミングの規定なし" },
      typing: { m: "none", t: "タイミングの規定なし" },
      blur: { m: "none", t: "タイミングの規定なし" },
      submit: { m: "cond", t: "ARIA19の例は送信時に検証してライブリージョンで通知" },
      after: { m: "good", t: "送信の成功をはっきり伝える(G199)" },
    },
  },
  {
    key: "nn", name: "NN group",
    cells: {
      before: { m: "none", t: "言及なし" },
      typing: { m: "avoid", t: "原則は出さない。パスワードの要件チェックリストなどは例外" },
      blur: { m: "good", t: "既定のタイミング。入力を終えて次の欄へ移った時" },
      submit: { m: "good", t: "必須項目の未入力は送信を試みた後に示す" },
      after: { m: "cond", t: "再読み込み後もエラーが見つけやすい場所にあるようにする" },
    },
  },
];

const MARKS = {
  good: { sym: "◯", label: "推奨・既定", color: "#2F7D6E", bg: "#E6F2EE" },
  cond: { sym: "△", label: "条件付き", color: "#A3821F", bg: "#F7F0DC" },
  avoid: { sym: "✕", label: "原則避ける", color: "#C0503F", bg: "#F8E6E2" },
  none: { sym: "―", label: "言及なし", color: "#9EA4C4", bg: "#FFFFFF" },
  unknown: { sym: "?", label: "未確認", color: "#7E86AC", bg: "#F8F9FD" },
};

function TimingLegend() {
  return (
    <div style={styles.timingLegend}>
      {Object.entries(MARKS).map(([k, v]) => (
        <span key={k} style={styles.timingLegendItem}>
          <span style={{ ...styles.timingMark, color: v.color, background: v.bg, border: `1px solid ${v.color}33` }}>{v.sym}</span>
          {v.label}
        </span>
      ))}
    </div>
  );
}

function TimingChart() {
  return (
    <div style={styles.matrixScroll}>
      <div style={styles.timingGrid}>
        <div style={styles.timingCorner} />
        {TIMING_POINTS.map((p, i) => (
          <div key={p.key} style={styles.timingHead}>
            <div style={styles.timingStepNo}>{i + 1}</div>
            <div style={styles.timingHeadName}>{p.name}</div>
            <div style={styles.timingHeadSub}>{p.sub}</div>
          </div>
        ))}
        {TIMING_MATRIX.map((row) => (
          <React.Fragment key={row.key}>
            <div style={styles.timingRowName}>{row.name}</div>
            {TIMING_POINTS.map((p) => {
              const c = row.cells[p.key];
              const mk = MARKS[c.m];
              return (
                <div key={p.key} style={{ ...styles.timingCell, background: mk.bg }}>
                  <span style={{ ...styles.timingMark, color: mk.color }}>{mk.sym}</span>
                  <span style={{ ...styles.timingCellText, color: c.m === "none" || c.m === "unknown" ? "#9EA4C4" : "#2E3457" }}>{c.t}</span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* 各タイミングの画面イメージ(メールアドレス欄を例にした概念図) */
function TimingField({ value, state, caption, cursor }) {
  const border = state === "error" ? "#C0503F" : state === "ok" ? "#2F7D6E" : state === "focus" ? "#3A4FCF" : "#B7BCDA";
  return (
    <div style={{ width: "100%", maxWidth: 220, margin: "0 auto", textAlign: "left" }}>
      <div style={{ fontSize: 10, color: "#565D8A", marginBottom: 3 }}>メールアドレス</div>
      <div style={{ border: `1.6px solid ${border}`, borderRadius: 5, padding: "6px 8px", fontSize: 11.5, background: "#FFFFFF", color: value ? "#171B36" : "#9EA4C4", minHeight: 28, fontFamily: "'IBM Plex Mono', monospace" }}>
        {value || "name@example.com"}{cursor && <span style={{ color: "#3A4FCF" }}>|</span>}
      </div>
      <div style={{ fontSize: 10, marginTop: 4, lineHeight: 1.45, color: state === "error" ? "#C0503F" : state === "ok" ? "#2F7D6E" : "#7E86AC" }}>{caption}</div>
    </div>
  );
}

const TIMING_DETAILS = [
  {
    key: "before",
    name: "① 入力前 ― 書式のヒントを先に示す",
    demo: <TimingField value="" state="idle" caption="例: name@example.com の形式で入力" />,
    what: "エラーが起きる前から、入力の形式や条件を欄の下などに表示しておく。厳密には検証ではなく、エラーを未然に防ぐための準備。",
    good: "そもそも間違いが起きにくくなる。エラー時に同じ場所の文を差し替えれば、レイアウトも動かない。",
    care: "欄の中のプレースホルダーだけに書くと、入力を始めた時点で消えてしまう(NN groupが別の記事で指摘)。",
    who: "Google(サポートテキストを常に表示し、エラー時は同じ位置でエラーテキストに置き換える)",
  },
  {
    key: "typing",
    name: "② 入力中 ― リアルタイム検証",
    demo: <TimingField value="taro@exa" state="error" cursor caption="✕ 形式が正しくありません(まだ入力の途中なのに表示されてしまう例)" />,
    what: "1文字入力するたびに検証し、その場で結果を表示する。",
    good: "パスワードの条件(文字数・記号など)のように、満たした項目が1つずつ分かると助けになる。数字だけの欄に文字が入ったことにもすぐ気づける。",
    care: "入力の途中はほぼ必ず「不正な形式」になるため、書き終える前から叱られているように感じさせる。NN groupはこれを原則として避けるべきとしている。",
    who: "NN group(原則は避ける。パスワードの要件チェックリストは例外)、Apple(数字だけの欄の不正な文字はすぐ警告)",
  },
  {
    key: "blur",
    name: "③ フィールドを離れた時 ― 既定のタイミング",
    demo: <TimingField value="taro@example" state="error" caption="✕「@」の後のドメインを最後まで入力してください" />,
    what: "欄の入力を終えて次の欄へ移った(フォーカスが外れた)時点で検証し、問題があればその欄の近くに表示する。",
    good: "書き終えた内容だけを判定するので、途中で急かさない。フォームの最後まで行かなくても、その場で直せる。",
    care: "何も入力せずにTabキーで通り過ぎただけの欄に、すぐ「必須です」と出すのは早すぎる(NN group)。",
    who: "NN group(大半の欄の既定)",
  },
  {
    key: "submit",
    name: "④ 送信時 ― まとめて確認",
    demo: <TimingField value="" state="error" caption="✕ メールアドレスを入力してください(送信後に表示)" />,
    what: "送信ボタンを押した時点でフォーム全体を検証し、問題のある欄をまとめて示す。",
    good: "未入力の必須項目など、欄を離れた時点では判断できない問題を確実に見つけられる。",
    care: "長いフォームの最後にまとめて戻って直させるのは負担が大きい(Apple)。",
    who: "NN group(必須項目の未入力は送信を試みた後に示す)、W3C(ARIA19の例は送信時に検証してライブリージョンで通知)",
  },
  {
    key: "after",
    name: "⑤ 送信後 ― 結果をはっきり伝える",
    demo: <TimingField value="taro@example.com" state="ok" caption="◯ 登録が完了しました。確認メールを送りました" />,
    what: "送信が成功したか失敗したかを、画面とスクリーンリーダーの両方に伝える。",
    good: "送信できたかどうか分からず、何度も押してしまうことを防げる。",
    care: "ページを再読み込みしてエラーを表示する場合は、エラーが見つけやすい場所にあるようにする(NN group)。",
    who: "W3C(G199: 送信の成功をはっきり伝える)、NN group(再読み込み後もエラーを見つけやすく)",
  },
];

function TimingDetails() {
  return (
    <div style={styles.timingDetailGrid}>
      {TIMING_DETAILS.map((d) => (
        <div key={d.key} style={styles.timingDetailCard}>
          <div style={styles.timingDetailName}>{d.name}</div>
          <div style={styles.timingDemo}>{d.demo}</div>
          <div style={styles.timingDetailRow}><span style={styles.timingDetailLabel}>何をするか</span><span style={styles.timingDetailText}>{d.what}</span></div>
          <div style={styles.timingDetailRow}><span style={{ ...styles.timingDetailLabel, color: "#2F7D6E" }}>良い点</span><span style={styles.timingDetailText}>{d.good}</span></div>
          <div style={styles.timingDetailRow}><span style={{ ...styles.timingDetailLabel, color: "#C0503F" }}>注意点</span><span style={styles.timingDetailText}>{d.care}</span></div>
          <div style={styles.timingDetailRow}><span style={styles.timingDetailLabel}>どの系列が</span><span style={styles.timingDetailText}>{d.who}</span></div>
        </div>
      ))}
    </div>
  );
}

/* 入力欄の種類ごとの目安(◯/△/✕)。各系列の記述を入力欄の種類で整理し直したもの */
const FIELD_GUIDE = [
  { field: "メールアドレス・電話番号など書式が決まった欄", typing: ["avoid", "途中は必ず不正な形式になる"], blur: ["good", "NN groupの既定"], submit: ["cond", "離脱時に見逃した分の最終確認"] },
  { field: "パスワード・ユーザー名の作成", typing: ["good", "要件チェックリストで満たした条件を示す(NN group)"], blur: ["good", "入力を終えた時点で確認"], submit: ["cond", "最終確認"] },
  { field: "数字だけの欄(金額・数量など)", typing: ["good", "数字だけを受け付ける書式にする(Apple)"], blur: ["cond", "書式が決まった欄と同じく、入力を終えた時点で確認"], submit: ["cond", "最終確認"] },
  { field: "必須項目の未入力", typing: ["avoid", "入力前から出さない"], blur: ["cond", "何か入力して消した場合など。通り過ぎただけでは出さない"], submit: ["good", "送信を試みた後に示す(NN group)"] },
];

function FieldGuide() {
  const cell = ([m, t]) => {
    const mk = MARKS[m];
    return (
      <div style={{ ...styles.cell, ...styles.textCell, gap: 6, background: mk.bg }}>
        <span style={{ ...styles.timingMark, color: mk.color, flexShrink: 0 }}>{mk.sym}</span>
        <span>{t}</span>
      </div>
    );
  };
  return (
    <div style={styles.matrixScroll}>
      <div style={styles.guideGrid}>
        <div style={{ ...styles.labelCell, ...styles.headerRowCell }}>入力欄の種類</div>
        <div style={{ ...styles.headerCell, ...styles.headerRowCell }}><div style={styles.timingHeadName}>② 入力中</div></div>
        <div style={{ ...styles.headerCell, ...styles.headerRowCell }}><div style={styles.timingHeadName}>③ フィールドを離れた時</div></div>
        <div style={{ ...styles.headerCell, ...styles.headerRowCell }}><div style={styles.timingHeadName}>④ 送信時</div></div>
        {FIELD_GUIDE.map((r) => (
          <React.Fragment key={r.field}>
            <div style={{ ...styles.labelCell, color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11.5 }}>{r.field}</div>
            {cell(r.typing)}{cell(r.blur)}{cell(r.submit)}
          </React.Fragment>
        ))}
      </div>
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
      <span style={styles.glossaryNoteLabel}>メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function ValidationTimingSwatch() {
  const stages = [
    { label: "入力中", desc: "多くの場合は検証しない", color: "#B7BCDA" },
    { label: "フィールドを離れた時", desc: "既定のタイミング(NN group・Apple)", color: "#3A4FCF" },
    { label: "送信時", desc: "必須項目の見落としを検知", color: "#5A9629" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
      {stages.map((s) => (
        <div key={s.label} style={{ width: 130, textAlign: "center" }}>
          <div style={{ height: 4, borderRadius: 2, background: s.color, marginBottom: 6 }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: "#171B36" }}>{s.label}</div>
          <div style={{ fontSize: 9.5, color: "#7E86AC", lineHeight: 1.4 }}>{s.desc}</div>
        </div>
      ))}
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "入力が正しいかを、いつ確かめるか(入力中・欄を離れたとき・送信時)の考え方です。";
const ABOUT = [
  { k: "目的・役割", v: "間違いを早めに知らせつつ、入力の途中で邪魔をしないタイミングを選ぶ" },
  { k: "よく使われる場面", v: "メールアドレス・パスワードの確認、会員登録・購入のフォーム" },
  { k: "似た部品との違い", v: <>見つけたエラーの見せ方は<PageLink to="/components/text-inputs/validation">エラー表示</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "入力の検証は、いつ行う?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "欄の入力を終えて次の欄へ移るまで待つ。入力中にエラーを出すと責められているように感じる。パスワードの条件の一覧のような場面だけは入力中に示してよい" },
      { who: "Apple", color: "#C2542A", t: "入力されたらすぐに確かめ、問題があればすぐに知らせる。入力中か欄を離れたときかは書いていない" },
      { who: "W3C・Google", color: "#A3821F", t: "タイミングの決まりはない(W3CのARIA19の例は送信時に確かめる。Googleはエラーテキストの出し方だけを定めている)" },
    ],
    tip: "「欄を離れたときに確かめる」を基本にすると、Appleの「すぐに知らせる」とNN groupの「入力中は待つ」の両方に沿います。入力中に示すのは、パスワードの条件のように、満たしたかどうかを見ながら入力したい場面だけにします。",
  },
];

export default function TextInputsInputValidationPage() {
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
        <SidebarNav currentPath="/components/text-inputs/input-validation" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / バリデーション</span>
            <span>SPEC No. 040</span>
          </div>

          <h1 style={styles.title}>バリデーション</h1>
          <SummaryCard
            imageLabel="検証タイミングの3つの選択肢"
            image={<><ValidationTimingSwatch /></>}
            imageNote={<>NN group・Appleとも、「入力中に急いで警告しない」という点で一致している。フィールド離脱時の検証が既定、リアルタイム検証はパスワード要件チェックリストなど特殊な場面に限定される。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <h2 style={styles.diagramTitle}>検証タイミングの比較(図解)</h2>
          <p style={styles.diagramNote}>入力欄を操作する流れを「入力前 → 入力中 → フィールドを離れた時 → 送信時 → 送信後」の5つの時点に分け、各系列がどの時点で何をすべきとしているかを並べました。表は横にスクロールできます。</p>
          <TimingLegend />
          <TimingChart />
          <p style={styles.diagramNote}>具体的なタイミングを定めているのはNN group(フィールドを離れた時)だけです。Appleは「入力されたらすぐに知らせる」とし、どの時点かは書いていません。W3Cはタイミングを定めず、通知の仕組み(ライブリージョン)と送信後の成功の伝え方を扱います。Googleは入力前のヒントの出し方を定め、検証のきっかけは書いていません。</p>

          <h3 style={styles.subTitle}>5つのタイミングの解説</h3>
          <p style={styles.diagramNote}>それぞれのタイミングで何をするのか、メールアドレス欄を例にした画面イメージ(概念図)と、良い点・注意点を並べました。</p>
          <TimingDetails />

          <h3 style={styles.subTitle}>入力欄の種類ごとの目安</h3>
          <p style={styles.diagramNote}>上の各系列の記述を、入力欄の種類ごとに整理し直した目安です(◯=推奨・既定、△=条件付き、✕=原則避ける)。系列名のないセルは、各系列の原則から導いた一般的な実務としての補足です。1つの欄に1つのタイミングだけを選ぶのではなく、組み合わせて使うのが一般的です。</p>
          <FieldGuide />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              検証タイミングについて最も具体的な指針を持つのはNielsen Norman Groupです。<strong>「入力中(タイピング中)にエラーを出さない」「フィールドを離れた時点で検証する」</strong>を原則としつつ、<strong>パスワードの要件チェックリストのような場面に限りリアルタイム検証を認める</strong>という、原則+例外の形で整理されています。
            </p>
            <p style={styles.synthesisText}>
              Appleは<strong>「入力されたらすぐに確かめ、問題があればすぐに知らせる」</strong>としていますが、入力中か欄を離れたときかまでは書いていません。いつ検証するかは系列で分かれます(上の「意見が分かれる点」)。
            </p>
            <p style={styles.synthesisText}>
              W3C(WCAG)は、<strong>「いつ検証すべきか」を定めていません</strong>。ARIA19はエラーを動的に知らせる仕組み(ライブリージョン)を、G199は送信が成功したことの知らせ方を扱いますが、どちらも検証のタイミングではありません。WCAGは「エラーをどう伝えるか」(「エラー表示」ページで扱う3.3.1・3.3.3・3.3.4)には具体的で、「いつ」には中立です。
            </p>
            <p style={styles.synthesisText}>
              Googleは<strong>「サポートテキストをエラーテキストに入れ替える」という見せ方</strong>を定めていますが、いつ検証するかはM3のページに書かれていません。エラーの前から書式のヒントをサポートテキストで示しておく点は、NN groupの「入力途中で急がせない」という考え方と相性のよい作りです。
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
                <InfoBox label="色">{s.colorInfo}</InfoBox>
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

          <div style={styles.linksRow}>
            <a href="/components/text-inputs/validation" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>エラー表示 ↗</div>
              <div style={styles.linkCardDesc}>検知したエラーをどう見せるか(文言・視覚表現・訂正案の提示)はこちら</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["エラー・確認", "入力・フォーム"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(4系列とも本文を確認。Apple・Googleは2026-11に確認し直した)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはEntering dataページを基本リンクとし、Feedbackページも併記しています(専用のバリデーションページなし)。WCAGはARIA19を基本リンクとし、Validating InputチュートリアルとG199も併記しています。GoogleはM3のText fieldsのガイドラインへのリンクです。NN groupはHostile Patterns in Error Messagesを基本リンクとし、10 Design Guidelines for Reporting Errors in Formsも併記しています。
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
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
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
  subTitle: { fontSize: 13.5, fontWeight: 700, margin: "22px 0 8px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  timingLegend: { display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 10, fontSize: 11, color: "#454C78" },
  timingLegendItem: { display: "inline-flex", alignItems: "center", gap: 5 },
  timingMark: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: 9, fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" },
  timingGrid: { display: "grid", gridTemplateColumns: "84px repeat(5, minmax(120px, 1fr))", minWidth: 700, border: "1px solid #E1E3F0" },
  timingCorner: { borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD" },
  timingHead: { padding: "10px 8px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", textAlign: "center", background: "#FFFFFF" },
  timingStepNo: { display: "inline-block", width: 18, height: 18, lineHeight: "18px", borderRadius: 9, background: "#3A4FCF", color: "#FFFFFF", fontSize: 10, fontWeight: 700, marginBottom: 4 },
  timingHeadName: { fontSize: 11.5, fontWeight: 700, color: "#171B36" },
  timingHeadSub: { fontSize: 10, color: "#7E86AC" },
  timingRowName: { padding: "10px 8px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", background: "#F8F9FD" },
  timingCell: { padding: "8px 8px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center" },
  timingCellText: { fontSize: 10.5, lineHeight: 1.5 },
  timingDetailGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 10, marginBottom: 8 },
  timingDetailCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 12px" },
  timingDetailName: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 10 },
  timingDemo: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "12px 10px", marginBottom: 10 },
  timingDetailRow: { display: "grid", gridTemplateColumns: "64px 1fr", gap: 6, marginBottom: 6 },
  timingDetailLabel: { fontSize: 10.5, fontWeight: 700, color: "#454C78" },
  timingDetailText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457" },
  guideGrid: { display: "grid", gridTemplateColumns: "180px repeat(3, 1fr)", minWidth: 640, border: "1px solid #E1E3F0", marginBottom: 4 },
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
