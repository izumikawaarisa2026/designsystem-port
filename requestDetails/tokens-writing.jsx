import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「文章・UXライティング」ページ。
 *
 * このページの発見: 4系列とも「短く・平易に・一貫して」で一致する。AppleとNN groupは「声(voice)は
 * 一定、調子(tone)は場面で変える」という考え方を持ち、NN groupは調子を4つの軸(形式的⇔くだけた、
 * 真面目⇔面白い、敬意⇔不遜、淡々⇔熱心)で分ける。Googleは現在形・算用数字・不要な句読点を省く・
 * 目的を先に書く、といった文の書き方の決まりが最も細かい(確認できる本文は旧版M2)。W3Cは書き方を
 * 定めず、見出し・ラベル・ページのタイトルが主題や目的を表すこと(2.4.6・2.4.2)、入力にラベルか説明が
 * あること(3.3.2)を求め、読解の難しさはAAA(3.1.5)で扱う。
 * エラー文の詳しい比較は「エラー表示」ページ、ボタン・リンクの文言は各ページも参照。
 *
 * Apple(HIG Writing)はHIGのページデータ(JSON)を直接取得して確認(2026-10)。
 * GoogleはM3にContent designのページ(UX writing best practices等)があることをサイトマップで確認したが、
 * m3.material.ioがSPAのため本文は未確認。Material Design 2のWritingのページデータ(JSON)で本文を確認(2026-10)。
 * W3C(2.4.6・2.4.2・3.3.2・3.1.5)・NN group(Plain Language Is for Everyone, Even Experts、
 * The Four Dimensions of Tone of Voice、How Little Do Users Read?)は本文を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Writing",
    color: "#C2542A",
    position: "アプリの「声(voice)」を決めて言葉をそろえ、場面に合わせて「調子(tone)」を変える。ボタン・エラー・空の画面・設定・入力欄など、UIの言葉の場面ごとの書き方を示す",
    size: "数値の基準はありません。エラーの書き方の例として、「パスワードが短すぎます」より「8文字以上のパスワードを選んでください」の方が役に立つ、という書き換えを示しています。",
    colorInfo: "声: 誰に話すのか、どんな気持ちになってほしいのか(銀行なら信頼と安定、ゲームなら興奮と楽しさ)から言葉を決め、よく使う用語のリストを作って言葉をそろえます。調子: 利用者が今何をしているか(運動の目標を達成した、支払いでエラーが出た)に合わせ、深刻な場面では率直に、祝う場面では明るくします。英語の大文字の使い方(title case/sentence case)も、要素の種類ごとに決めてそろえます。",
    stance:
      "明確に書き(1語ずつ必要かを確かめ、減らせるなら減らす。迷ったら声に出して読む)、誰にでも伝わるよう平易な言葉を選び、専門用語や性別のある言葉を避け、アクセシビリティと翻訳を考えて書くよう求めています。画面ごとに目的を考えて重要な情報を先に置き、ボタンやリンクには動詞を使い、気の利いた表現より明確さを優先します(「やってみよう!」より「送信」)。リンクに「ここをクリック」は使いません(ページ本文を直接確認、2026-10)。",
    exceptions:
      "複数の画面にまたがる手順では、始め(「始める」)・途中(「続ける」「次へ」)・終わり(「完了」)の言葉を決めてそろえます。「あなたの」「マイ」のような所有の言葉は控えめにし、「私たち(we)」は誰を指すか分からないため使いません。端末ごとに操作の言葉を正しく使い、タッチの端末では「クリック」ではなく「タップ」と書きます。空の画面には次にできることと、そのためのボタンを置きます。エラーは問題の近くに出し、責めず、直し方を書きます。「おっと」のような感嘆の言葉は、不誠実に聞こえることがあるとしています。",
    accessibility:
      "理解可能(Understandable) ― 平易な言葉を選び、専門用語を避けることは、WCAGの「理解可能」(3.1 読みやすさ)と同じ目的です。VoiceOverで読み上げられることも考えて書くよう、関連ページへの案内があります。",
    useCases: [
      "ボタン・リンクは動詞で、何が起きるかが分かる言葉にする",
      "手順の言葉(始める・次へ・完了)と用語のリストを決めてそろえる",
      "エラーは責めずに直し方を書き、空の画面には次の行動を置く",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/writing#Best-practices",
    urlSecondary: [
      { label: "Writing ― Getting started(声と調子)", url: "https://developer.apple.com/design/human-interface-guidelines/writing#Getting-started" },
      { label: "Alerts ― Content・Buttons(タイトルは2行まで・ボタンは1〜2語)", url: "https://developer.apple.com/design/human-interface-guidelines/alerts#Content" },
      { label: "Toolbars ― Titles(15文字未満)", url: "https://developer.apple.com/design/human-interface-guidelines/toolbars#Titles" },
      { label: "Notifications ― Content", url: "https://developer.apple.com/design/human-interface-guidelines/notifications#Content" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-10、2025年12月の改訂を含む)。文字数・行数の目安はAlerts・Toolbars・Tab bars・Buttons・Notifications・Action sheetsのページデータで確認。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Content design(本文はMaterial Design 2 ― Writing)",
    color: "#2F7D6E",
    position: "UIの文字は使いやすさと信頼を生むもので、明確・正確・簡潔に書く、という原則のもと、文の書き方の決まりを細かく示す。M3にはContent designのページ群があるが、確認できる本文は旧版M2のWriting",
    size: "数値の基準はありません。数は算用数字で書きます(「3件のメッセージ」。違う使い方の数が並ぶときは、片方を文字にする)。",
    colorInfo: "呼びかけは、基本は2人称(「あなたの」)で、UIが利用者に直接話しかけるように書きます。利用者の持ち物や行動であることを強調したいときは1人称(「マイアカウント」「利用規約に同意します」)にし、同じ文の中で2人称と1人称を混ぜません。どの読解レベルでも分かる一般的な言葉を使い、業界の用語やUIの機能に付けた造語を避けます。",
    stance:
      "UIの文字は、少数の概念に絞った短く読み流せる単位で書き、簡潔で直接的な言葉を使います(「変更を保存しますか?」)。利用者が自分の作業に集中できるよう、必要なことだけを伝え、処理の仕組みのような余計な説明は省きます。現在形で書き、目的と操作を述べるときは目的を先に書きます(「このアルバムから写真を消すには、ゴミ箱へドラッグ」)。同じ操作は同じ言葉で呼び(「削除」と「消去」を混ぜない)、UIの部品はラベルの文字で呼びます(Material Design 2のページデータを直接取得して確認、2026-10)。",
    exceptions:
      "読み流しやすくするため、ラベル・ホバーで出る文字・箇条書き・ダイアログの本文が1文だけなら句点を付けません。複数の文や、後にリンクが続く文には付けます。最初にすべての詳細を説明する必要はなく、利用者が機能を使い進めて必要になったときに詳しく見せます。「〜しなければなりません」ではなく、どうすればよいかを書きます。",
    accessibility:
      "理解可能(Understandable) ― どの読解レベルでも分かる言葉を使い、文化や言語を問わず誰にでも理解できる文を目指す、としています(Writing for global audiencesの関連ページあり)。",
    useCases: [
      "短く読み流せる単位で、1つの画面の概念を少なくする",
      "現在形・算用数字で書き、目的を先に書く",
      "同じ操作には同じ言葉を使い、UIの部品はラベルの文字で呼ぶ",
    ],
    searchHint: "",
    url: "https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices",
    urlSecondary: [
      { label: "M2: Writing", url: "https://m2.material.io/design/communication/writing.html" },
      { label: "M2: Snackbars(行数・1行40〜60文字)", url: "https://m2.material.io/components/snackbars" },
      { label: "M2: Dialogs(タイトルの書き方)", url: "https://m2.material.io/components/dialogs" },
      { label: "M3: Content design ― Overview", url: "https://m3.material.io/foundations/content-design/overview" },
    ],
    confirmedNote: "M3のContent design(UX writing best practices・Word choice・Global writing等)のページがあることはm3.material.ioのサイトマップで確認しましたが、SPAのため本文は未確認です。内容はMaterial Design 2のWritingのページデータ(JSON)を直接取得して確認(2026-10)。文字数・行数の目安はM2のSnackbars・Dialogs・Buttons・Tabs・Bottom navigation・Navigation rail・Top app bar・Text fieldsのページデータで確認。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.4.6 Headings and Labels / 2.4.2 Page Titled / 3.3.2 Labels or Instructions / 1.3.3 Sensory Characteristics / 3.1.5 Reading Level",
    color: "#A3821F",
    position: "文章の書き方そのものは定めず、見出し・ラベル・ページのタイトルが主題や目的を表すこと、入力にラベルか説明があることを求める。文の難しさはAAAで扱う",
    size: "3.1.5(レベルAAA): 固有名詞や題名を除いて、前期中等教育(9年の学校教育)を超える読解力が必要な文には、補足の内容か、そこまでの読解力を必要としない版を用意します。",
    colorInfo: "2.4.6(レベルAA): 見出しとラベルが主題や目的を表すこと(長い必要はなく、1語でもよい)。2.4.2(レベルA): ページのタイトルが主題や目的を表すこと(1つのURLで画面が切り替わるSPAでは、画面ごとにタイトルを更新する)。3.3.2(レベルA): 入力が必要なところに、ラベルか説明(決まった書式など)があること。1.3.3(レベルA): 操作の説明を、形・大きさ・位置・向き・音だけに頼らないこと(「右の丸いボタン」ではなく「[送信]ボタン」のように名前で呼ぶ)。",
    glossary: [
      { term: "2.4.6 Headings and Labels・レベルAA", desc: "見出しとラベルが、主題や目的を表していることを求める基準。見出しやラベルを置くこと自体は求めない。" },
      { term: "2.4.2 Page Titled・レベルA", desc: "ページに、主題や目的を表すタイトルがあることを求める基準。" },
      { term: "3.3.2 Labels or Instructions・レベルA", desc: "利用者の入力が必要なところに、ラベルか説明を用意することを求める基準。" },
      { term: "1.3.3 Sensory Characteristics・レベルA", desc: "操作や理解のための説明が、形・色・大きさ・見た目の位置・向き・音だけに頼らないことを求める基準。色については1.4の基準で扱う。" },
      { term: "3.1.5 Reading Level・レベルAAA", desc: "前期中等教育を超える読解力が必要な文に、補足か易しい版を求める基準。" },
    ],
    stance:
      "見出しが明確なら、利用者は探している情報を見つけやすく、内容の部分どうしの関係もつかみやすくなります。ページのタイトルは、内容を読まなくても今どこにいるかを示し、検索結果やブラウザのタブで区別する手がかりになります。リンクの文言と、行き先のページのタイトルをそろえると、つながりが分かりやすいとしています。読解障害のある人には、専門知識のある読み手でも、易しい文が役に立ちます。形や位置だけの説明は、画面の見えない人や見えにくい人には伝わらないため、部品の名前も添えます(1.3.3)。形や位置の手がかり自体は認知に障害のある人などにも役立つため、使うこと自体は妨げないとしています(Understandingページの本文を直接確認、2026-10)。",
    exceptions:
      "2.4.6は見出しやラベルを置くことは求めず、置いたなら内容を表していることを求めます。見出しのマークアップが正しいか(1.3.1)や、部品のアクセシブルな名前(4.1.2)は別の基準です。3.3.2は説明でページを散らかすことを求めておらず、多すぎる説明は少なすぎるのと同じく害になるとしています。1.3.3では、読む順番どおりに並んでいて指すものがはっきりしていれば、「下のリンクから選ぶ」「以上のすべて」のような上下の言い方は認められます。3.1.5はレベルAAAで、多くのサイトが目標とするAAには含まれません。",
    accessibility: "知覚可能(Perceivable)・操作可能(Operable)・理解可能(Understandable) ― 1.3.3は「知覚可能」、2.4.2・2.4.6はガイドライン2.4(ナビゲーション可能)で「操作可能」、3.3.2(入力支援)・3.1.5(読みやすさ)は「理解可能」に属します。",
    useCases: [
      "見出し・ボタン・入力欄のラベルは、主題や目的が分かる言葉にする(2.4.6)",
      "画面ごとに、内容を表すタイトルを付ける(2.4.2)",
      "入力欄にはラベルと、必要なら書式の説明を付ける(3.3.2)",
      "「右の丸いボタン」のように形や位置だけで説明せず、部品の名前も書く(1.3.3)",
    ],
    searchHint: "describe topic or purpose",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html",
    urlSecondary: [
      { label: "2.4.2 Page Titled", url: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html" },
      { label: "3.3.2 Labels or Instructions", url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html" },
      { label: "1.3.3 Sensory Characteristics", url: "https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html" },
      { label: "3.1.5 Reading Level", url: "https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html" },
    ],
    confirmedNote: "5つのUnderstandingページの本文を直接取得して確認済み(2026-10)。ページ内検索の語は2.4.6のページのものです。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Plain Language Is for Everyone, Even Experts / The Four Dimensions of Tone of Voice / How Little Do Users Read?",
    color: "#7A4F7E",
    position: "Webでは人はほとんど読まないという調査に基づき、平易で短い言葉と、ブランドと場面に合った調子を勧める実務指針(適合基準ではない)",
    size: "平均的なWebページでは、1回の訪問で読める言葉は多くても28%、実際には20%程度という分析があります(2008年の記事)。言葉を100語足しても滞在は4.4秒しか延びず、足した分の約18%しか読まれません。Webでは、印刷物で使う言葉の50%未満を目安にするよう勧めています。",
    colorInfo: "調子は4つの軸で分けられます。形式的⇔くだけた、真面目⇔面白い、敬意⇔不遜、淡々⇔熱心です。同じ「エラーが発生しました」でも、丁寧で淡々とした文から、冗談めかした文まで調子が変わります。どれが合うかは、ブランドの性格・場面・相手で決めます。",
    stance:
      "平易な言葉は内容を薄めるものではなく、専門家にも好まれるとしています(科学・技術・医療の専門家を対象にした調査でも、短く読み流せる情報が求められた)。まず対象の読み手を決め、その人たちになじみのある言葉を選びます。俗語・慣用句・組織の中だけの造語は避け、必要な専門用語は先に説明します(3記事とも本文を直接取得して確認、2026-10)。",
    exceptions:
      "専門家どうしで共有されている専門用語は、短く正確な近道になるため使ってよい(ただし本当に通じるか確かめる)としています。専門家向けの文の途中で一般向けの説明を挟むと専門家が離れてしまうため、補足はリンクなど別の層に置きます。全員に向けて書くと誰にも向けていない文になるため、読み手に優先順位を付けます。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、ユーザビリティテストと閲覧行動の分析に基づく設計上の根拠です。平易な言葉は、母語でない読み手や海外の読み手にも役立つとしています。",
    useCases: [
      "印刷物の半分未満の言葉にし、読み流せる形に整える",
      "読み手を決め、なじみのある言葉を選ぶ(造語・慣用句を避ける)",
      "調子は4つの軸で決め、場面(エラー・お祝いなど)で調整する",
    ],
    searchHint: "fewer than 50% of the words",
    url: "https://www.nngroup.com/articles/plain-language-experts/#toc-tips-for-writing-in-plain-language-3",
    urlSecondary: [
      { label: "The Four Dimensions of Tone of Voice", url: "https://www.nngroup.com/articles/tone-of-voice-dimensions/#toc-the-four-dimensions-of-tone-of-voice-2" },
      { label: "How Little Do Users Read?(2008)", url: "https://www.nngroup.com/articles/how-little-do-users-read/#toc-percentage-of-text-read-3" },
    ],
    confirmedNote: "3記事とも本文を直接取得して確認済み(2026-10)。ページ内検索の語は1本目の記事(Plain Language)のものです。",
  },
];

/* 画像エリア: 声は一定、調子は場面で変える(Apple・NN group) */
function VoiceToneSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const card = (x, title, text, tone, color) => (
    <g>
      <rect x={x} y="50" width="150" height="74" rx="8" fill="#FFFFFF" stroke="#D5D9EC" />
      <text x={x + 12} y="70" fontSize="9" fontWeight="700" fill={color} fontFamily={font}>{title}</text>
      <text x={x + 12} y="90" fontSize="10.5" fill="#171B36" fontFamily={font}>{text[0]}</text>
      <text x={x + 12} y="106" fontSize="10.5" fill="#171B36" fontFamily={font}>{text[1]}</text>
      <text x={x + 75} y="142" fontSize="8.5" fill="#565D8A" textAnchor="middle" fontFamily={font}>{tone}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 340 150" width="100%" style={{ maxWidth: 440, display: "block", margin: "0 auto" }} role="img" aria-label="声は一定のまま、場面に応じて調子を変える例">
      <rect x="10" y="8" width="320" height="28" rx="14" fill="#EEF1FA" />
      <text x="170" y="26" fontSize="10" fill="#171B36" textAnchor="middle" fontFamily={font}>声(voice): 信頼できて、分かりやすい ― どの画面でも同じ</text>
      {card(10, "目標を達成したとき", ["今日のムーブの", "目標を達成しました"], "調子: 明るく、祝う", "#5A9629")}
      {card(180, "支払いに失敗したとき", ["カードを確認できません", "でした。別のカードを…"], "調子: 率直に、落ち着いて", "#C0503F")}
    </svg>
  );
}

/* 四サイト比較図: UIの言葉の場面ごとに、何を定めているか(◯=明記/△=部分的・条件付き/―=確認した範囲で記載なし) */
const WRITING_ROWS = [
  {
    label: "ボタン・リンク",
    cells: [
      { mark: "◯", note: "動詞で。気の利いた表現より明確さ。「ここをクリック」は使わない" },
      { mark: "◯", note: "UIの部品はラベルの文字で呼ぶ" },
      { mark: "◯", note: "ラベルが目的を表す(2.4.6)。形・位置だけで説明しない(1.3.3)" },
      { mark: "△", note: "リンクの文言は意味が分かり、欲しいものを表す" },
    ],
  },
  {
    label: "見出し・タイトル",
    cells: [
      { mark: "△", note: "画面の目的を考え、重要な情報を先に" },
      { mark: "△", note: "目的を先に書く" },
      { mark: "◯", note: "見出し(2.4.6)とページのタイトル(2.4.2)が主題を表す" },
      { mark: "△", note: "読み流せるよう見出しで整える" },
    ],
  },
  {
    label: "入力欄",
    cells: [
      { mark: "◯", note: "すべての欄にラベル、書式はヒントで示す" },
      { mark: "―", note: "" },
      { mark: "◯", note: "ラベルか説明を用意(3.3.2)。多すぎも害" },
      { mark: "―", note: "" },
    ],
  },
  {
    label: "エラー",
    cells: [
      { mark: "◯", note: "問題の近くに、責めずに直し方を。感嘆の言葉は避ける" },
      { mark: "△", note: "「〜しなければ」ではなく、どうすればよいかを書く" },
      { mark: "△", note: "3.3.1・3.3.3(「エラー表示」ページ)" },
      { mark: "◯", note: "調子の例にエラー文。場面に合う調子を選ぶ" },
    ],
  },
  {
    label: "用語の一貫性",
    cells: [
      { mark: "◯", note: "用語のリストを作る。手順の言葉をそろえる" },
      { mark: "◯", note: "同じ操作は同じ言葉で" },
      { mark: "△", note: "同じ働きの部品を一貫して識別(3.2.4)" },
      { mark: "―", note: "" },
    ],
  },
  {
    label: "呼びかけ・人称",
    cells: [
      { mark: "◯", note: "所有の言葉は控えめに。「私たち」は使わない" },
      { mark: "◯", note: "基本は2人称、所有を強調するなら1人称。混ぜない" },
      { mark: "―", note: "" },
      { mark: "―", note: "" },
    ],
  },
  {
    label: "調子(tone)",
    cells: [
      { mark: "◯", note: "声は一定、調子は場面で変える" },
      { mark: "―", note: "" },
      { mark: "―", note: "" },
      { mark: "◯", note: "4つの軸で決める" },
    ],
  },
  {
    label: "易しさ・長さ",
    cells: [
      { mark: "◯", note: "平易な言葉。専門用語・性別のある言葉を避ける" },
      { mark: "◯", note: "どの読解レベルでも分かる言葉。造語を避ける" },
      { mark: "◯", note: "中等教育前期を超える文には補足(3.1.5・AAA)" },
      { mark: "◯", note: "印刷物の50%未満。読まれるのは20%程度" },
    ],
  },
];

const MARK_COLORS = { "◯": "#2E6B3A", "△": "#8A6A10", "―": "#B7BCDA" };

function RuleMatrix() {
  const names = ["Apple", "Google", "W3C", "NN group"];
  const colors = ["#C2542A", "#2F7D6E", "#A3821F", "#7A4F7E"];
  return (
    <div style={styles.ruleScroll}>
      <div style={styles.ruleGrid}>
        <div style={styles.ruleHead}>UIの言葉</div>
        {names.map((n, i) => (<div key={n} style={{ ...styles.ruleHead, color: colors[i] }}>{n}</div>))}
        {WRITING_ROWS.map((r) => (
          <React.Fragment key={r.label}>
            <div style={styles.ruleLabel}>{r.label}</div>
            {r.cells.map((c, i) => (
              <div key={i} style={styles.ruleCell}>
                <span style={{ ...styles.ruleMark, color: MARK_COLORS[c.mark] }}>{c.mark}</span>
                {c.note && <span style={styles.ruleNote}>{c.note}</span>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* 書き換えの例(各系列が示している例を日本語に置き換えたもの) */
const REWRITES = [
  { before: "やってみよう!", after: "送信", why: "気の利いた表現より、何が起きるかが分かる動詞", who: "Apple" },
  { before: "パスワードが短すぎます", after: "8文字以上のパスワードを選んでください", why: "エラーは直し方を書く", who: "Apple" },
  { before: "詳しくはここをクリック", after: "UXライティングについて詳しく", why: "リンクは行き先が分かる言葉に", who: "Apple・W3C" },
  { before: "変更内容を保存したいですか?", after: "変更を保存しますか?", why: "簡潔で直接的な言葉", who: "Google" },
  { before: "位置情報の履歴を有効化", after: "位置情報の履歴をオンにする", why: "どの読解レベルでも分かる一般的な言葉", who: "Google" },
  { before: "ゴミ箱へドラッグすると、このアルバムから写真を消せます", after: "このアルバムから写真を消すには、ゴミ箱へドラッグ", why: "目的を先に書く", who: "Google" },
];

function RewriteCards() {
  return (
    <div style={styles.rwGrid}>
      {REWRITES.map((r) => (
        <div key={r.before} style={styles.rwCard}>
          <div style={styles.rwBefore}><span style={styles.rwMarkNg}>✕</span>{r.before}</div>
          <div style={styles.rwAfter}><span style={styles.rwMarkOk}>◯</span>{r.after}</div>
          <div style={styles.rwWhy}>{r.why}</div>
          <div style={styles.rwWho}>{r.who}</div>
        </div>
      ))}
    </div>
  );
}

/* 調子の4つの軸(NN group)と、同じエラーの書き分け */
const TONE_AXES = [
  { l: "形式的", r: "くだけた" },
  { l: "真面目", r: "面白い" },
  { l: "敬意", r: "不遜" },
  { l: "淡々", r: "熱心" },
];
const TONE_SAMPLES = [
  { t: "申し訳ありませんが、問題が発生しています。", pos: [0.1, 0.1, 0.1, 0.1], color: "#3C5A73" },
  { t: "すみません、こちら側で問題が起きています。", pos: [0.45, 0.1, 0.15, 0.15], color: "#5A9629" },
  { t: "おっと! すみません、こちら側で問題が起きています。", pos: [0.65, 0.25, 0.2, 0.7], color: "#C0503F" },
];

function ToneAxes() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const x0 = 70, x1 = 330;
  return (
    <div>
      <svg viewBox="0 0 400 150" width="100%" style={{ maxWidth: 520, display: "block", margin: "0 auto" }} role="img" aria-label="調子の4つの軸と、3つのエラー文の位置">
        {TONE_AXES.map((a, i) => {
          const y = 22 + i * 32;
          return (
            <g key={a.l}>
              <text x={x0 - 8} y={y + 4} fontSize="10" fill="#171B36" textAnchor="end" fontFamily={font}>{a.l}</text>
              <line x1={x0} x2={x1} y1={y} y2={y} stroke="#D5D9EC" strokeWidth="3" strokeLinecap="round" />
              <text x={x1 + 8} y={y + 4} fontSize="10" fill="#171B36" fontFamily={font}>{a.r}</text>
              {TONE_SAMPLES.map((s, j) => <circle key={j} cx={x0 + s.pos[i] * (x1 - x0)} cy={y} r="6" fill={s.color} fillOpacity="0.85" stroke="#FFFFFF" strokeWidth="1.5" />)}
            </g>
          );
        })}
      </svg>
      <div style={styles.toneList}>
        {TONE_SAMPLES.map((s) => (
          <div key={s.t} style={styles.toneItem}><span style={{ ...styles.toneDot, background: s.color }} />{s.t}</div>
        ))}
      </div>
    </div>
  );
}

/* 場所ごとの文字数・行数の目安(英語の文字数・語数) */
const LENGTH_ROWS = [
  { place: "ボタン", apple: "数語で、何をするかを簡潔に。動詞で始めるとよい(Buttons)。アラートのボタンは1〜2語(Alerts)", google: "1行に収め、簡潔に(M2 Buttons)", w3c: "―", nn: "―" },
  { place: "画面・ツールバーのタイトル", apple: "1語か短い句で、15文字未満(Toolbars)", google: "切り詰めたり文字を縮めたりしない。長いなら大きいアプリバーで2行にする(M2 Top app bar)", w3c: "主題や目的を表す(2.4.2)", nn: "―" },
  { place: "タブ・ナビゲーションのラベル", apple: "できるだけ1語(Tab bars)", google: "短く。切り詰めず、文字を縮めて1行に押し込まない(タブは2行目も可)(M2 Tabs・Bottom navigation・Navigation rail)", w3c: "―", nn: "―" },
  { place: "ダイアログ・アラートのタイトル", apple: "2行を超えて折り返さない。「エラー」だけのような情報のないタイトルは避ける(Alerts)。アクションシートのタイトルは1行(Action sheets)", google: "簡潔な文か問い。謝罪・警告・「よろしいですか?」を避ける(M2 Dialogs)", w3c: "―", nn: "―" },
  { place: "スナックバー・通知", apple: "通知のタイトルは短く、本文は簡潔な完全な文で。自分で切り詰めない(システムが行う)(Notifications)", google: "スマートフォンでは2行まで、タブレット・デスクトップでは1行(M2 Snackbars)", w3c: "―", nn: "―" },
  { place: "入力欄のラベル・補助テキスト", apple: "すべての欄にラベル。書式はヒントや例で示す(Writing)", google: "ラベルは切り詰めない。補助テキストは1行(M2 Text fields)", w3c: "ラベルか説明を用意(3.3.2)", nn: "―" },
  { place: "本文の1行の長さ", apple: "―", google: "理想は40〜60文字(M2 Snackbarsのページ)", w3c: "80文字以内にできること。CJKは40文字(1.4.8・AAA)", nn: "―(数値基準なし)" },
  { place: "ページ全体の量", apple: "1語ずつ必要かを確かめ、減らせるなら減らす", google: "少数の概念に絞った短い単位で", w3c: "難しい文には補足か易しい版(3.1.5・AAA)", nn: "印刷物の50%未満。読まれるのは20%程度" },
];

function LengthTable() {
  const heads = [["Apple", "#C2542A"], ["Google", "#2F7D6E"], ["W3C", "#A3821F"], ["NN group", "#7A4F7E"]];
  return (
    <div style={styles.ruleScroll}>
      <div style={styles.lenGrid}>
        <div style={styles.ruleHead}>使う場所</div>
        {heads.map(([h, c]) => (<div key={h} style={{ ...styles.ruleHead, color: c }}>{h}</div>))}
        {LENGTH_ROWS.map((r) => (
          <React.Fragment key={r.place}>
            <div style={styles.ruleLabel}>{r.place}</div>
            {[r.apple, r.google, r.w3c, r.nn].map((t, i) => (
              <div key={i} style={{ ...styles.ruleCell, ...(t.startsWith("―") ? { color: "#B7BCDA" } : {}) }}><span style={styles.ruleNote}>{t}</span></div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* 1行の長さの目安(Google 40〜60文字、W3C 80文字/CJK 40文字) */
function LineLengthChart() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const x0 = 110, x1 = 470, max = 90;
  const X = (v) => x0 + (v / max) * (x1 - x0);
  return (
    <svg viewBox="0 0 490 112" width="100%" style={{ maxWidth: 600, display: "block", margin: "0 auto" }} role="img" aria-label="1行の文字数の目安の比較図">
      {[0, 20, 40, 60, 80].map((v) => (
        <g key={v}><line x1={X(v)} x2={X(v)} y1="10" y2="86" stroke="#EEF0F7" /><text x={X(v)} y="100" fontSize="8.5" fill="#9EA4C4" textAnchor="middle" fontFamily={mono}>{v}</text></g>
      ))}
      <text x={x1 + 4} y="100" fontSize="8.5" fill="#9EA4C4" fontFamily={font}>文字</text>
      <text x="0" y="28" fontSize="10.5" fontWeight="600" fill="#2F7D6E" fontFamily={font}>Google(英語)</text>
      <rect x={X(40)} y="18" width={X(60) - X(40)} height="14" rx="3" fill="#2F7D6E" fillOpacity="0.75" />
      <text x={X(60) + 6} y="29" fontSize="9" fill="#454C78" fontFamily={font}>理想 40〜60</text>
      <text x="0" y="54" fontSize="10.5" fontWeight="600" fill="#A3821F" fontFamily={font}>W3C(英語など)</text>
      <rect x={X(0)} y="44" width={X(80) - X(0)} height="14" rx="3" fill="#A3821F" fillOpacity="0.3" />
      <line x1={X(80)} x2={X(80)} y1="40" y2="62" stroke="#A3821F" strokeWidth="2" />
      <text x={X(80) - 4} y="55" fontSize="9" fill="#454C78" textAnchor="end" fontFamily={font}>80文字以内にできること</text>
      <text x="0" y="78" fontSize="10.5" fontWeight="600" fill="#A3821F" fontFamily={font}>W3C(日本語など)</text>
      <rect x={X(0)} y="68" width={X(40) - X(0)} height="14" rx="3" fill="#A3821F" fillOpacity="0.3" />
      <line x1={X(40)} x2={X(40)} y1="64" y2="86" stroke="#A3821F" strokeWidth="2" />
      <text x={X(40) + 6} y="79" fontSize="9" fill="#454C78" fontFamily={font}>40文字以内(CJK)</text>
    </svg>
  );
}

/* 主語で変わる文言の使い分け */
const SUBJECTS = [
  {
    key: "user", title: "ユーザー主語 ― 利用者がこれからすること", where: "ボタン・メニューの項目・リンク・チェックボックス・設定のラベル", color: "#3C5A73",
    rules: [
      { t: "利用者の行動を動詞で書く。押した結果が分かる言葉にする", who: "Apple(Writing・Alerts)・Google(UIの部品はラベルで呼ぶ)" },
      { t: "「OK」「はい/いいえ」より、結果を表す具体的な動詞(「削除」「消去」)。取り消しは常に「キャンセル」", who: "Apple(Alerts)" },
      { t: "利用者の持ち物・行動を強調したいときは1人称(「利用規約に同意します」「マイアカウント」)。ただし所有の言葉は控えめに", who: "Google(M2 Writing)・Apple(Writing)" },
      { t: "気の利いた表現より明確さ(「やってみよう!」より「送信」)", who: "Apple(Writing)" },
    ],
    examples: [["OK", "削除"], ["はい", "保存して閉じる"], ["ここをクリック", "料金プランを見る"]],
  },
  {
    key: "system", title: "システム主語 ― アプリが利用者に伝えること", where: "エラー・状態の表示・通知・確認ダイアログの本文・空の画面", color: "#C0503F",
    rules: [
      { t: "何が起きたか・なぜ・どうすればよいかを書く。情報のない「エラー」だけにしない", who: "Apple(Alerts・Writing)" },
      { t: "利用者を責めず、直し方を書く。「〜しなければなりません」ではなく、どうすればよいか", who: "Apple(Writing)・Google(M2 Writing)・NN group(Error-Message Guidelines)" },
      { t: "利用者には2人称で話しかけ、同じ文で1人称と混ぜない", who: "Google(M2 Writing)" },
      { t: "謝罪・警告の言葉や「よろしいですか?」で始めず、具体的な問いや文にする", who: "Google(M2 Dialogs)・Apple(Alerts)" },
      { t: "「私たち」は誰を指すか分からないため使わない(Apple)。NN groupは調子の例に「申し訳ありませんが、こちら側で問題が…」を挙げており、扱いが分かれる", who: "Apple(Writing)・NN group(Tone of Voice)" },
    ],
    examples: [["エラー 329347", "写真を保存できませんでした。空き容量を確認してください"], ["入力が不正です", "メールアドレスに「@」を含めてください"], ["本当によろしいですか?", "この写真を削除しますか?"]],
  },
];

function SubjectCards() {
  return (
    <div style={styles.subjGrid}>
      {SUBJECTS.map((g) => (
        <div key={g.key} style={{ ...styles.subjCard, borderTopColor: g.color }}>
          <div style={{ ...styles.subjTitle, color: g.color }}>{g.title}</div>
          <div style={styles.subjWhere}>{g.where}</div>
          <ul style={styles.subjRules}>
            {g.rules.map((r) => (<li key={r.t}>{r.t}<span style={styles.subjWho}>{r.who}</span></li>))}
          </ul>
          <div style={styles.subjExHead}>書き換えの例</div>
          {g.examples.map(([b, a]) => (
            <div key={b} style={styles.subjEx}><span style={styles.subjNg}>✕ {b}</span><span style={styles.subjOk}>◯ {a}</span></div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* どれだけ読まれるか(NN group、2008年の分析) */
function ReadingShare() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const w = 340;
  return (
    <svg viewBox="0 0 400 84" width="100%" style={{ maxWidth: 520, display: "block", margin: "0 auto" }} role="img" aria-label="平均的なWebページで読まれる言葉の割合">
      <text x="0" y="14" fontSize="10" fill="#171B36" fontWeight="600" fontFamily={font}>平均的なページ(593語)</text>
      <rect x="0" y="22" width={w} height="20" rx="4" fill="#EEF0F5" />
      <rect x="0" y="22" width={w * 0.28} height="20" rx="4" fill="#B7C9DC" />
      <rect x="0" y="22" width={w * 0.2} height="20" rx="4" fill="#3C5A73" />
      <text x={w * 0.2 - 4} y="36" fontSize="9" fill="#FFFFFF" textAnchor="end" fontFamily={mono}>20%</text>
      <text x={w * 0.28 + 4} y="36" fontSize="9" fill="#3C5A73" fontFamily={mono}>28%</text>
      <text x="0" y="60" fontSize="9" fill="#454C78" fontFamily={font}>濃い色=実際に読まれる量(約20%)、薄い色=滞在時間をすべて読むのに使った場合の上限(28%)</text>
      <text x="0" y="76" fontSize="9" fill="#454C78" fontFamily={font}>言葉を100語足しても、滞在は4.4秒しか延びない(足した分の約18%)</text>
    </svg>
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

export default function TokensWritingPage() {
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
        <SidebarNav currentPath="/tokens/writing" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / ファウンデーション / 文章・UXライティング</span>
            <span>SPEC No. 060</span>
          </div>

          <h1 style={styles.title}>文章・UXライティング</h1>
          <p style={styles.subtitle}>4つのガイドラインが、ボタン・見出し・入力欄・エラーなどUIの言葉の書き方、使う場所ごとの長さ、ユーザー主語とシステム主語の使い分け、声・調子・易しさをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>声(voice)は一定、調子(tone)は場面で変える(概念図)</span>
            <VoiceToneSwatch />
            <p style={styles.swatchNote}>AppleとNN groupに共通する考え方です。アプリの人柄にあたる「声」はどの画面でも変えず、目標の達成と支払いの失敗のように、場面によって「調子」を変えます。例文は説明用に作ったものです(AppleはApple Watchの、深刻な場面と祝う場面の2つの表示を例にしています)。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列がそろって一致しているのは、<strong>短く・平易に・一貫して</strong>書くことです。Appleは「1語ずつ必要かを確かめる」、Googleは「少数の概念に絞った短い単位で」、NN groupは「印刷物の50%未満の言葉に」とし、W3Cも難しい文には易しい版や補足を求めています(3.1.5・AAA)。NN groupの分析では、平均的なWebページで読まれる言葉は<strong>20%程度</strong>です。
            </p>
            <p style={styles.synthesisText}>
              AppleとNN groupは、<strong>声(voice)は一定にし、調子(tone)は場面で変える</strong>という考え方も共有しています。NN groupは調子を<strong>4つの軸(形式的⇔くだけた、真面目⇔面白い、敬意⇔不遜、淡々⇔熱心)</strong>で整理しています。Appleは、エラーでの「おっと」のような感嘆を不誠実に聞こえることがあるとし、<strong>「私たち」も使わない</strong>よう求めています。
            </p>
            <p style={styles.synthesisText}>
              文の書き方の決まりが最も細かいのはGoogleで、<strong>現在形・算用数字・目的を先に・同じ操作は同じ言葉で・1文だけなら句点を付けない</strong>などを示しています(確認できる本文は旧版のM2)。W3Cは書き方ではなく、<strong>見出し・ラベル・ページのタイトルが主題や目的を表していること(2.4.6・2.4.2)</strong>と、<strong>入力にラベルか説明があること(3.3.2)</strong>を求めます。
            </p>
            <p style={styles.synthesisText}>
              実務では、<strong>まず声と用語のリストを決め、ボタンは動詞・エラーは直し方・空の画面は次の行動、という場面ごとの型を作り、見出しとタイトルが内容を表しているかをW3Cの基準で確かめる</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― UIの言葉の場面ごとに何を定めているか</h2>
            <RuleMatrix />
            <p style={styles.chartNote}>◯=明記されている、△=部分的・条件付き、―=確認した範囲では記載なし。Googleは旧版(Material Design 2)のWritingの指針です。W3Cの「エラー」「用語の一貫性」は、ほかのページで扱っている基準(3.3.1・3.3.3は「エラー表示」、3.2.4は「リンク」「アイコン」)を示しています。</p>
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
                <InfoBox label="数値・長さの目安" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="声・調子・言葉の選び方">{s.colorInfo}</InfoBox>
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
                </div>
                {s.urlSecondary && (
                  <div style={styles.secondaryLinks}>
                    {s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{sl.label} ↗</a>
                    ))}
                  </div>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>文章・UXライティング デザインシステム比較</h2>
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
                <div style={styles.labelCell}>数値・長さの目安</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>声・調子・言葉の選び方</div>
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
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                    {s.confirmedNote && <span style={styles.confirmedNoteSmall}>{s.confirmedNote}</span>}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>書き換えの例</h2>
            <p style={styles.diagramNote}>AppleとGoogleが示している英語の例を、同じ考え方で日本語に置き換えたものです。</p>
            <RewriteCards />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>使う場所ごとの文字数・行数の目安</h2>
            <p style={styles.diagramNote}>各系列が部品のページなどで示している、長さの目安を集めました。Apple・Googleの文字数・語数は英語の場合の値です。かっこ内は根拠にしたページです。</p>
            <LengthTable />
            <div style={{ height: 14 }} />
            <LineLengthChart />
            <div style={styles.aiNote}><strong>AI解釈: </strong>日本語の文字数を直接示しているのはW3Cだけで、1行の長さを英語の80文字に対してCJK(日本語・中国語・韓国語)は40文字としています。英語の文字数の目安を日本語に置き換えるときは、<strong>おおよそ半分</strong>を目安にすると、W3Cの比率と合います(例: Googleの1行40〜60文字→日本語で20〜30文字程度、Appleのタイトル15文字未満→7〜8文字程度)。ただし、AppleとGoogleがはっきり求めているのは文字数より<strong>「切り詰めない・文字を縮めて押し込まない・短い言葉を選ぶ」</strong>ことです。</div>
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>主語で変わる文言の使い分け ― ユーザー主語とシステム主語</h2>
            <p style={styles.diagramNote}>ボタンのように<strong>利用者がこれからすること</strong>を書く言葉と、エラーのように<strong>アプリが利用者に伝えること</strong>を書く言葉では、書き方が変わります。各系列の記述を2つに分けて整理しました(書き換えの例は、各系列の考え方に沿ってAIが作ったものです)。</p>
            <SubjectCards />
            <div style={styles.aiNote}><strong>AI解釈: </strong>日本語は主語を省くことが多いため、<strong>文末で主語が決まります</strong>。ユーザー主語は動詞(「保存」「保存する」「同意する」)で終え、「〜してください」のような依頼の形にしません(押す本人への依頼になってしまうため)。システム主語は、起きたことを「〜しました」「〜できませんでした」で伝え、続けて次の行動を「〜してください」で示すと、何が起きて何をすればよいかが1文ずつ分かります。</div>
          </section>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>調子の4つの軸(NN group)</h2>
            <ToneAxes />
            <p style={styles.chartNote}>NN groupが示した英語のエラー文の例を日本語にし、4つの軸のおおよその位置を描いた概念図です。「おっと!」を足すと、くだけて熱心な調子になります。どの調子が合うかはブランドの性格と場面で決まり、Appleはエラーでの感嘆の言葉を不誠実に聞こえることがあるとしています。</p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>どれだけ読まれるか(NN group)</h2>
            <ReadingShare />
            <p style={styles.chartNote}>2008年の記事で、25人のWebの閲覧記録(約4万5千ページ分)を分析した結果です。言葉を増やしても読まれる量はほとんど増えないため、伝えたいことを先に、短く書く理由になります。</p>
          </div>

          <div style={styles.linksRow}>
            <a href="/components/text-inputs/validation" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>エラー表示 ↗</div>
              <div style={styles.linkCardDesc}>エラー文の書き方・見せ方の詳しい比較はこちら</div>
            </a>
            <a href="/components/communication/empty-state" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>空状態・ローディング状態 ↗</div>
              <div style={styles.linkCardDesc}>空の画面で次の行動を示す方法はこちら</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎", "エラー・確認", "入力・フォーム"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。GoogleはM3のContent designの本文は未確認、Material Design 2のページデータで本文確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Writingページの「Best practices」見出しへのアンカー付きリンクで、「Getting started」の見出しも併記しています。GoogleはM3のContent designのUX writing best practicesページに加え、内容を確認したM2のWritingページとM3のContent designの概要ページを併記しています。WCAGは2.4.6 Understandingページを基本リンクとし、2.4.2・3.3.2・3.1.5も併記しています。NN groupはPlain Languageの記事のヒントの節と、調子の4軸の記事・読まれる量の記事の各節です。
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
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6, textAlign: "left" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  ruleSection: { marginBottom: 26 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
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
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  ruleScroll: { overflowX: "auto" },
  ruleGrid: { display: "grid", gridTemplateColumns: "120px repeat(4, minmax(120px, 1fr))", minWidth: 640, border: "1px solid #E1E3F0", borderRadius: 4 },
  ruleHead: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#FFFFFF" },
  ruleLabel: { fontSize: 11, color: "#454C78", fontWeight: 600, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", lineHeight: 1.5 },
  ruleCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 2 },
  ruleMark: { fontSize: 15, fontWeight: 700, lineHeight: 1.1 },
  ruleNote: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5 },
  rwGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: 10 },
  rwCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  rwBefore: { fontSize: 12, lineHeight: 1.6, color: "#7E86AC", textDecoration: "line-through", textDecorationColor: "#C0503F" },
  rwAfter: { fontSize: 12.5, lineHeight: 1.6, color: "#171B36", fontWeight: 600, marginTop: 4 },
  rwMarkNg: { color: "#A33A2E", marginRight: 6, textDecoration: "none", display: "inline-block" },
  rwMarkOk: { color: "#2E6B3A", marginRight: 6 },
  rwWhy: { fontSize: 11, lineHeight: 1.55, color: "#454C78", background: "#F3F6FA", borderRadius: 4, padding: "5px 8px", marginTop: 6 },
  rwWho: { fontSize: 9.5, color: "#7E86AC", marginTop: 5 },
  lenGrid: { display: "grid", gridTemplateColumns: "130px repeat(4, minmax(120px, 1fr))", minWidth: 680, border: "1px solid #E1E3F0", borderRadius: 4 },
  aiNote: { fontSize: 11.5, lineHeight: 1.7, color: "#2E3457", background: "#FAFCEE", borderLeft: "3px solid #5A9629", padding: "8px 12px", marginTop: 12, borderRadius: "0 3px 3px 0" },
  subjGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 12 },
  subjCard: { border: "1px solid #E1E3F0", borderTop: "3px solid", borderRadius: 6, padding: "10px 14px 12px", background: "#FFFFFF" },
  subjTitle: { fontSize: 13, fontWeight: 700 },
  subjWhere: { fontSize: 11, color: "#565D8A", marginTop: 2 },
  subjRules: { margin: "8px 0 0", paddingLeft: 16, fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", display: "flex", flexDirection: "column", gap: 4 },
  subjWho: { display: "block", fontSize: 9.5, color: "#7E86AC" },
  subjExHead: { fontSize: 10.5, fontWeight: 700, color: "#7E86AC", marginTop: 10, marginBottom: 4 },
  subjEx: { display: "flex", flexDirection: "column", gap: 1, fontSize: 11.5, lineHeight: 1.55, padding: "4px 0", borderTop: "1px dashed #E1E3F0" },
  subjNg: { color: "#7E86AC" },
  subjOk: { color: "#171B36", fontWeight: 600 },
  toneList: { display: "flex", flexDirection: "column", gap: 4, marginTop: 8 },
  toneItem: { display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "#2E3457" },
  toneDot: { width: 10, height: 10, borderRadius: 5, flexShrink: 0 },
};
