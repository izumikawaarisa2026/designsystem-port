import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection / 日付/タイムピッカー」ページ。
 * (2026-10-05、Material 3のコンポーネント分類(Date pickers・Time pickersはSelection、Flutterの公式ドキュメントで確認)に合わせ、Text inputsから移動)
 *
 * このページの発見(2026-10改訂: W3Cの例は入力欄+カレンダーで、NN groupの推奨と両立する): W3C(ARIA APG)・Google(Modal派生)は「カレンダー型のダイアログ」を
 * 基準にしているが、Nielsen Norman Groupは「多くの場面ではフリーテキスト入力の方が
 * 優れている」と明確に主張しており、業界の実装傾向とNN groupの推奨が食い違う珍しい
 * コンポーネント。GoogleのM3自身も「生年月日のような遠い日付にはモーダルカレンダーを
 * 使うべきではない」と述べており、この点はNN groupの指摘と方向性が一致する。
 *
 * W3C(WAI-ARIA APG Date Picker Dialog Example)/ Nielsen Norman Group(Date-Input
 * Form Fields)は公式ページ・記事本文を直接取得して確認済み(2026-09)。Apple(HIG
 * Pickers)・Google(Material Design 3 Date pickers / Time pickers)は公式サイトが
 * クライアント側レンダリングのSPAで自動取得できないため、検索結果による間接確認
 * (2026-09)。Appleの「ホイール1項目=44pt、ホイール全体の高さ=216pt」という具体的な
 * 数値は、Apple公式ページ本文からではなく、HIGの内容を再構成した第三者サイト(実装者
 * 向けリファレンス)経由の情報であり、一次情報での直接確認ではない点に注意。
 *
 * 2026-09 追記: ユーザーから「日付・時刻の入力方法(テキスト入力/カレンダー/ホイール)の
 * 種類と使い分けがわかる項目が欲しい」というフィードバックを受け、AI解釈の下に
 * 「3つの入力方法の使い分け」セクションを新設した。新しい一次情報の追加ではなく、
 * 既にSOURCESに集約済みの4系列のデータ(Appleのホイール、Googleの
 * Docked/Modal/Modal date input、W3Cのgridダイアログ、NN groupのフリーテキスト推奨)を、
 * 「テキスト入力/カレンダー/ホイール」という3方式の切り口で再整理したもの。
 *
 * 2026-09 追記2: ユーザーから「Google・Appleのデザインイメージには複数のパターンがあるので、
 * すべて載せてほしい」というフィードバックを受け、「デザインパターン一覧(Apple・Google)」
 * セクションを新設した(Apple 8パターン: iOSのコンパクト/インライン(日付・時刻)/ホイール/
 * カウントダウンタイマー、macOSのテキスト形式/グラフィカル形式、watchOSのホイール。
 * Google 6パターン: 日付のドッキング/モーダル/モーダル(期間選択)/モーダル入力、時刻の
 * ダイヤル/入力)。あわせてApple欄をHIGのページデータ(JSON)で直接確認して書き直し
 * (公式本文に根拠のなかった「高さはリスト5行分」「中央に濃い文字色」の記述を削除)、
 * Google欄をMaterial Components for AndroidのDatePicker.md・TimePicker.mdで更新した。
 * 入力方法の使い分けに「ダイヤル(時計の文字盤)」を加えて4種類にした。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Pickers",
    term: "Date picker(Pickersの一種)",
    color: "#C2542A",
    position: "iOS/iPadOSの日付ピッカーは、コンパクト・インライン・ホイール・自動の4スタイルと、日付・時刻・日付と時刻・カウントダウンタイマーの4モードの組み合わせ。macOSはテキスト形式とグラフィカル形式の2スタイル",
    size:
      "寸法(pt)の記載なし。分の選択肢は既定で60個(0〜59)で、60を割り切れる間隔(例: 15分刻み)に減らせる。",
    colorInfo: "コンパクトスタイルのボタンは、今の値をアプリのアクセントカラーで表示する。ほかの色の規定はない。",
    stance:
      "ピッカーは、1つか複数の部分からなる値を選ばせるコンポーネント。日付ピッカーは、カレンダーで日を選ぶ・数字キーで入力する、といった方法も持つ。表示される値と並び順は、端末の言語・地域で変わる。場所が限られるときはコンパクトスタイルを使い、ボタンを押すとカレンダー形式の編集画面と時刻ピッカーがモーダルで開き、外側を押して確定する。",
    exceptions:
      "選択肢が少なければプルダウンボタン、とても多ければリストやテーブルが向く。ピッカーは画面を切り替えずに、編集中の項目の近く(画面下部やポップオーバー)に出す。カウントダウンタイマーは最大23時間59分で、インライン・コンパクトでは使えない。",
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "場所が限られるならコンパクト、画面の中で見せたいならインラインを使う",
      "分の刻みを15分などに減らして選びやすくする",
      "選択肢が少なければプルダウンボタン、多すぎればリスト・テーブルを使う",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/pickers#iOS-iPadOS",
    refs: [
      { label: "Pickers", url: "https://developer.apple.com/design/human-interface-guidelines/pickers#iOS-iPadOS" },
      { label: "Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/pickers#Best-practices" },
      { label: "macOS(テキスト形式/グラフィカル形式)", url: "https://developer.apple.com/design/human-interface-guidelines/pickers#macOS" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。",
    illustration: () => (
      <svg width="90" height="46" viewBox="0 0 90 46">
        <rect x="1" y="1" width="88" height="44" rx="4" fill="#F8F9FD" stroke="#E1E3F0" strokeWidth="1" />
        <rect x="3" y="17" width="84" height="12" fill="#F0DACB" stroke="#C2542A" strokeWidth="1" />
        <text x="45" y="11" fontSize="9" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">8月</text>
        <text x="45" y="26" fontSize="10" fill="#171B36" fontWeight="700" textAnchor="middle" fontFamily="Jost, Noto Sans JP">9月</text>
        <text x="45" y="41" fontSize="9" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">10月</text>
      </svg>
    ),
    illustrationNote: "ホイールスタイルの例(概念図・系列識別色)。全8パターンは「デザインパターン一覧」を参照",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Date pickers / Time pickers",
    term: "Date picker・Time picker",
    color: "#2F7D6E",
    position: "日付はドッキング・モーダル・モーダル入力の3種類(モーダルとモーダル入力は期間の選択にも対応)。時刻は別コンポーネントで、ダイヤルと入力の2種類",
    size: "モーダルの日付ピッカーは360×568dp、日付の丸は40×40dp、見出し部分の高さは120dp(Jetpack Composeのトークン)。容器の角丸はExtra large(28dp)。",
    colorInfo: "コンテナはsurface container high、選んだ日はprimaryの塗りにon primaryの文字、今日の日付はprimaryの1dpの枠線、期間の範囲はsurface variantで塗るのが既定値(Material Components for Android)。",
    glossary: [
      { term: "ドッキング / モーダル / モーダル入力", desc: "ドッキングは入力欄に付いた形で、押すとカレンダーがドロップダウンで開く。モーダルはダイアログのカレンダー。モーダル入力はダイアログの中の文字入力。モーダルとモーダル入力は期間(開始日〜終了日)の選択にも使える。" },
      { term: "ダイヤル / 入力(時刻)", desc: "ダイヤルは文字盤のつまみを回して時刻を合わせる形。入力はキーボードで時・分を入れる形。ダイヤルからはキーボードアイコンでいつでも入力に切り替えられる。" },
    ],
    stance:
      "ドッキングは入力欄を既定で出し、押すとカレンダーがドロップダウンで開く。入力とカレンダーのどちらでも入れられるため、近い日付にも遠い日付にも向く。モーダルは横スワイプで月、縦スクロールで年を移動し、年をタップすると年の一覧を開ける。期間の選択は開始日と終了日をタップする方式で、フライトやホテルの予約が代表例。モーダル入力は、ダイアログの中でキーボードの数字を使って日付(または期間)を入力する。時刻は、ダイヤルのつまみを回すダイヤル式(アラームや予定の設定向き)と、キーボードで入力する入力式の2種類。",
    exceptions:
      "生年月日のような遠い日付では、モーダル(カレンダー)ではなくモーダル入力かドッキングを使う。タイトルは開いたときに読み上げられるため、「予約日を選択」のように作業が分かる文言にする。",
    accessibility:
      "操作可能(Operable)・知覚可能(Perceivable) ― Material Componentsの日付ピッカーはスクリーンリーダーに対応し、ダイアログを開くとタイトルが読み上げられる。",
    useCases: [
      "近い日付・遠い日付のどちらもあり得るならドッキングを使う",
      "予約など期間を選ばせる場合は、モーダルの期間選択を使う",
      "時刻はダイヤルを基本に、キーボード入力へ切り替えられるようにする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/date-pickers/guidelines",
    refs: [
      { label: "Date pickers", url: "https://m3.material.io/components/date-pickers/guidelines" },
      { label: "Time pickers", url: "https://m3.material.io/components/time-pickers/guidelines" },
      { label: "MDC Android: Date pickers(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/DatePicker.md" },
      { label: "MDC Android: Time pickers(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/TimePicker.md" },
    ],
    confirmedNote: "日付ピッカー3種類・期間選択・時刻ピッカー2種類・色の既定値は、Material Components for Androidのドキュメントで直接確認(2026-09)。「生年月日にはモーダルを使わない」はM3 Date pickersのガイドラインの本文で確認(2026-11)。",
    illustration: () => (
      <svg width="90" height="46" viewBox="0 0 90 46">
        <rect x="1" y="1" width="88" height="44" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.4" />
        <rect x="6" y="6" width="78" height="10" rx="2" fill="#D6E8E3" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={12 + i * 13} cy="30" r="3" fill={i === 3 ? "#2F7D6E" : "none"} stroke="#2F7D6E" strokeWidth="1" />
        ))}
      </svg>
    ),
    illustrationNote: "モーダル(カレンダー)の例(概念図・系列識別色)。全6パターンは「デザインパターン一覧」を参照",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Date Picker Dialog Example",
    term: "dialogの中のgrid(APGのDate Picker Dialog例)",
    color: "#A3821F",
    position: "日付を文字で入力する欄(形式の説明付き)と、カレンダーを開くボタンを組み合わせる例。カレンダーはrole=\"dialog\"内のrole=\"grid\"で",
    size:
      "専用の数値基準はない。各日付のボタンにも、一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、選択中の日付を示す見た目は3:1以上のコントラスト比にする。",
    glossary: [
      { term: "ローミングtabindex", desc: "グリッドの中でいつも1つのセルだけをtabindex=\"0\"にし、残りを-1にする実装方法。" },
    ],
    stance:
      <>日付ピッカーの例は、<Hl>日付を文字で入力できる欄</Hl>(「date format: mm/dd/yyyy」のように形式を添える)と、その横の「日付を選択」ボタンの組み合わせ。ボタンがDialog(Modal)パターンのダイアログを開き、その中のカレンダーはgrid roleを持つtable要素(tr/th/tdがrow/columnheader/gridcellの役割を兼ねる)で実装する。月・年の見出しにはaria-live="polite"を設定し、変化を支援技術に知らせる。</>,
    exceptions:
      "ダイアログを開いたとき、入力欄が空か無効な日付なら今日に、有効な日付が入っていればカレンダーのその日にフォーカスを当てる。Esc・OK・Cancelのどれでも閉じられ、閉じたらきっかけのボタンにフォーカスが戻る。APGの例は考え方を示すもので、そのまま本番に使わないよう注意書きがある(冒頭の「Read This First」。モバイル・タッチ端末では支援技術の対応に差があるとも書かれている)。実装したら実際の支援技術で確かめる。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 中心は、グリッドロールとローミングtabindexによるキーボード操作(2.1.1)と、aria-liveによる変化の通知(4.1.3)。",
    useCases: [
      "日付を文字で入力できる欄(形式の説明付き)を置き、カレンダーは補助として開けるようにする",
      "カレンダー本体にはgrid roleとローミングtabindexを使う",
      "上下=週・左右=日、Page Up/Down=月(Shiftで年)、Home/End=週の始点/終点というキー操作を実装する",
      "ダイアログを閉じたらトリガーボタンにフォーカスを戻す",
    ],
    searchHint: "roving tabindex",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/",
    refs: [
      { kind: "apg", label: "APG: Date Picker Dialogの例(Gridパターンを使った実装例)", url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/" },
      { kind: "apg", label: "APG: Grid Pattern(日付の並びに使う汎用の型)", url: "https://www.w3.org/WAI/ARIA/apg/patterns/grid/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="90" height="46" viewBox="0 0 90 46">
          <rect x="1" y="1" width="88" height="44" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="45" y="26" fontSize="8.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="grid"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、グリッド構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Date-Input Form Fields: UX Design Guidelines",
    term: "Date input(日付の入力欄)・Calendar picker",
    color: "#7A4F7E",
    position: "多くの場面では自由入力を勧める。カレンダーは近い日付と期間の選択に限る",
    size: <NoData>数値基準なし</NoData>,
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      <>多くの場面で、<Hl>日付は自由入力(フリーテキスト)で入れさせる</Hl>。誕生日のような過去の日付や遠い未来の日付では特に、自由入力が最も効率的。カレンダーは、今に近い(1年未満程度の)日付や、期間の選択(2か月分を並べるなど)に向く。ドロップダウンは選択肢が10個未満の場合に限り、月/日/年に分けたドロップダウンはクリックを増やすため避ける。</>,
    exceptions:
      "ドロップダウンは選択肢が10個未満の場合だけ(月/日/年に分けたものは避ける)。9-3-17、09/08/17、9.3.17のような書式の揺れは、特殊文字を強制せずに受け入れる。月名は省略せず綴り、欄にははっきりラベルを付ける(「10/11/2016」は米国式・欧州式で解釈が分かれるため)。到着日より前の出発日のようなありえない選択肢は先に除き、使えない日は選べなくし、エラーには具体的な訂正案を示す。",
    accessibility: "根拠となる原則 ― 適合区分ではなく、入力の効率とエラーの率にもとづく使い分けの指針。",
    useCases: [
      "誕生日や遠い日付では自由入力(フリーテキスト)を第一の選択肢にする",
      "近い日付と期間の選択にはカレンダーを使う",
      "選択肢が10個未満の場合のみドロップダウンを検討し、月/日/年の分割ドロップダウンは避ける",
    ],
    searchHint: "less than a year",
    url: "https://www.nngroup.com/articles/date-input/",
    refs: [
      { label: "Date-Input Form Fields: UX Design Guidelines", url: "https://www.nngroup.com/articles/date-input/" },
    ],
    illustration: () => (
      <svg width="90" height="46" viewBox="0 0 90 46">
        <rect x="1" y="14" width="88" height="18" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.4" />
        <text x="45" y="26" fontSize="10" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">2026年9月3日</text>
      </svg>
    ),
    illustrationNote: "フリーテキスト入力(概念図・系列識別色)。NN groupが多くの場面で推奨する形",
  },
];

const INPUT_METHODS = [
  {
    key: "text",
    name: "フリーテキスト入力",
    represents: "NN groupが多くの場面で第一選択として推奨。Googleのモーダル入力・時刻の入力、AppleのmacOSのテキスト形式もこの形式。",
    doText: "誕生日・契約日など、現在から離れた日付を入力させたい時",
    dontText: "近い将来の日付を素早く選ばせたい、範囲選択させたい時(→カレンダー)",
  },
  {
    key: "calendar",
    name: "カレンダー(グリッド型)",
    represents: "W3C(ARIA APG Date Picker Dialog)、Googleのドッキング・モーダル、Appleのコンパクト・インライン・macOSのグラフィカル形式が採用。",
    doText: "近い将来(1年未満程度)の日付や、日付の範囲選択をさせたい時",
    dontText: "生年月日など遠い日付を選ばせたい時(スクロール・ページ送りが多くなる)",
  },
  {
    key: "wheel",
    name: "ホイール(スクロール選択)",
    represents: "Appleのホイールスタイル(iOS・watchOS)が採用。時刻・カウントダウンタイマーの選択にも向く。",
    doText: "順序があり予測しやすい値(時刻・月など)を素早く選ばせたい時",
    dontText: "選択肢が非常に多い、または不規則な値を選ばせたい時(→テーブルやテキスト入力)",
  },
  {
    key: "dial",
    name: "ダイヤル(時計の文字盤)",
    represents: "Googleの時刻ピッカー(ダイヤル)が採用。AppleのmacOSのグラフィカル形式にも時計の文字盤の見た目がある。",
    doText: "アラームや予定の時刻を、時計の感覚で直感的に合わせてほしい時",
    dontText: "分単位で正確な値を素早く入れたい時(→キーボード入力に切り替えられるようにする)",
  },
];

function InputMethodsSummary() {
  return (
    <div style={styles.methodGrid}>
      {INPUT_METHODS.map((m) => (
        <div key={m.key} style={styles.methodCard}>
          <div style={styles.methodName}>{m.name}</div>
          <div style={styles.methodRepresents}>{m.represents}</div>
          <div style={styles.methodUsageRow}>
            <span style={{ ...styles.methodUsageMark, ...styles.methodUsageMarkOk }}>推奨</span>
            <span style={styles.methodUsageText}>{m.doText}</span>
          </div>
          <div style={styles.methodUsageRow}>
            <span style={{ ...styles.methodUsageMark, ...styles.methodUsageMarkNg }}>NG</span>
            <span style={styles.methodUsageText}>{m.dontText}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Apple・Googleのデザインパターン一覧(各公式ドキュメントに掲載されているパターンを描いた概念図) */
const PATTERNS = [
  {
    key: "hig",
    name: "Apple",
    color: "#C2542A",
    note: "iOS/iPadOSは「スタイル(見た目)」と「モード(選ぶ値)」の組み合わせで決まる。スタイルはコンパクト・インライン・ホイール・自動(システムが決める)の4つ、モードは日付・時刻・日付と時刻・カウントダウンタイマーの4つだ。",
    items: [
      { kind: "a-compact", name: "コンパクト", platform: "iOS / iPadOS", method: "カレンダー", desc: "現在の値をアクセントカラーのボタンで表示。タップするとカレンダーと時刻の編集画面がモーダルで開き、外側をタップして確定する。スペースが限られるとき向け。" },
      { kind: "a-inline", name: "インライン(日付)", platform: "iOS / iPadOS", method: "カレンダー", desc: "日付を含むモードでは、カレンダーを画面の中に埋め込んで表示する。" },
      { kind: "a-inline-time", name: "インライン(時刻のみ)", platform: "iOS / iPadOS", method: "ホイール", desc: "時刻だけを選ぶモードでは、インラインのボタンをタップするとホイールが表示される。" },
      { kind: "a-wheels", name: "ホイール", platform: "iOS / iPadOS", method: "ホイール", desc: "回転するホイールで値を選ぶ。内蔵・外付けキーボードからの入力にも対応する。" },
      { kind: "a-countdown", name: "カウントダウンタイマー(モード)", platform: "iOS / iPadOS", method: "ホイール", desc: "時間と分を選ぶ(最大23時間59分)。インライン・コンパクトのスタイルでは使えない。" },
      { kind: "a-mac-text", name: "テキスト形式", platform: "macOS", method: "テキスト入力", desc: "日時を文字で入力する形。スペースが限られ、特定の日時を入力してもらう場面向け。" },
      { kind: "a-mac-graphic", name: "グラフィカル形式", platform: "macOS", method: "カレンダー", desc: "カレンダーで日を見比べたり期間を選んだりする形。時計の文字盤の見た目も選べる。" },
      { kind: "a-watch", name: "ホイール(Digital Crown)", platform: "watchOS", method: "ホイール", desc: "Digital Crownを回して値を選ぶ。日付・時刻のピッカーもホイールで表示する。" },
    ],
  },
  {
    key: "material",
    name: "Google",
    color: "#2F7D6E",
    note: "日付ピッカー(3種類+期間選択)と時刻ピッカー(2種類)は別のコンポーネントだ。モーダルとモーダル入力は、1日だけでなく期間(開始日〜終了日)の選択にも使える。",
    items: [
      { kind: "g-docked", name: "ドッキング", platform: "日付", method: "テキスト入力+カレンダー", desc: "入力欄を既定で表示し、タップするとカレンダーがドロップダウンで開く。どちらでも入力でき、近い日付にも遠い日付にも向く。" },
      { kind: "g-modal", name: "モーダル", platform: "日付", method: "カレンダー", desc: "ダイアログでカレンダーを表示。横スワイプで月、縦スクロールで年を移動し、年をタップすると年の一覧を開ける。" },
      { kind: "g-range", name: "モーダル(期間選択)", platform: "日付", method: "カレンダー", desc: "開始日と終了日をタップして期間を選ぶ全画面の形。フライトやホテルの予約が代表例。" },
      { kind: "g-input", name: "モーダル入力", platform: "日付", method: "テキスト入力", desc: "ダイアログの中で、キーボードの数字で日付(または期間)を入力する。" },
      { kind: "g-dial", name: "ダイヤル", platform: "時刻", method: "ダイヤル", desc: "文字盤のつまみを回して時刻を合わせる。アラームや予定の設定によく使われる。" },
      { kind: "g-tinput", name: "入力", platform: "時刻", method: "テキスト入力", desc: "キーボードで時・分を入力する。どのダイヤルからもキーボードアイコンで切り替えられる。" },
    ],
  },
];

function PatternMockup({ kind, color }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const T = (x, y, t, o = {}) => <text key={`${x}-${y}-${t}`} x={x} y={y} fontSize={o.s || 7} fill={o.c || "#2E3457"} textAnchor={o.a || "start"} fontWeight={o.w || 400} fontFamily={o.f || font}>{t}</text>;
  const cal = (x, y, w, sel = [17], range) => {
    const cw = w / 7, out = [];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
      const d = r * 7 + c - 1;
      if (d < 1 || d > 30) continue;
      const cx = x + c * cw + cw / 2, cy = y + r * 9;
      const inRange = range && d > range[0] && d < range[1];
      const isSel = sel.includes(d) || (range && (d === range[0] || d === range[1]));
      out.push(
        <g key={`${r}-${c}`}>
          {inRange && <rect x={cx - cw / 2} y={cy - 5.5} width={cw} height="7.5" fill={color} opacity="0.18" />}
          {isSel && <circle cx={cx} cy={cy - 1.8} r="3.8" fill={color} />}
          <text x={cx} y={cy} fontSize="4.6" fill={isSel ? "#FFFFFF" : "#454C78"} textAnchor="middle" fontFamily={mono}>{d}</text>
        </g>
      );
    }
    return out;
  };
  const wheel = (x, y, cols) => (
    <g>
      <rect x={x} y={y + 16} width={cols.length * 30} height="11" rx="3" fill={color} opacity="0.14" />
      {cols.map((c, i) => c.map((v, j) => T(x + 15 + i * 30, y + 8 + j * 10, v, { a: "middle", s: j === 2 ? 7.5 : 6, c: j === 2 ? "#171B36" : "#B7BCDA", w: j === 2 ? 700 : 400 })))}
    </g>
  );
  let body = null;
  if (kind === "a-compact") body = (
    <g>
      {T(8, 16, "日付")}
      <rect x="66" y="8" width="46" height="12" rx="6" fill="#EEF1FA" />
      {T(89, 16.5, "9月17日", { a: "middle", c: color, s: 6.5, w: 600 })}
      <rect x="18" y="28" width="94" height="72" rx="8" fill="#FFFFFF" stroke="#D5D9EC" />
      {T(26, 40, "2026年9月", { s: 6.5, w: 700 })}
      {cal(24, 52, 82)}
    </g>
  );
  if (kind === "a-inline") body = (
    <g>
      {T(10, 16, "2026年9月", { s: 7, w: 700 })}
      {T(110, 16, "‹  ›", { a: "end", c: color })}
      {cal(8, 30, 104)}
      <line x1="8" x2="112" y1="80" y2="80" stroke="#E1E3F0" />
      {T(10, 94, "時刻")}
      <rect x="80" y="86" width="32" height="12" rx="6" fill="#EEF1FA" />
      {T(96, 94.5, "9:41", { a: "middle", s: 6.5 })}
    </g>
  );
  if (kind === "a-inline-time") body = <g>{T(10, 16, "時刻")}{wheel(15, 26, [["7", "8", "9", "10", "11"], ["39", "40", "41", "42", "43"], ["", "", "AM", "PM", ""]])}</g>;
  if (kind === "a-wheels") body = <g>{wheel(15, 22, [["7月", "8月", "9月", "10月", "11月"], ["15", "16", "17", "18", "19"], ["2024", "2025", "2026", "2027", "2028"]])}</g>;
  if (kind === "a-countdown") body = <g>{wheel(30, 22, [["0", "1", "2", "3", "4"], ["28", "29", "30", "31", "32"]])}{T(60, 88, "時間     分", { a: "middle", s: 6, c: "#666D93" })}</g>;
  if (kind === "a-mac-text") body = (
    <g>
      <rect x="14" y="42" width="78" height="16" rx="3" fill="#FFFFFF" stroke="#B7BCDA" />
      {T(20, 53, "2026/09/17  9:41", { f: mono, s: 6.5 })}
      <rect x="94" y="42" width="10" height="16" rx="2" fill="#EEF1FA" stroke="#B7BCDA" />
      {T(99, 49.5, "▴", { a: "middle", s: 5 })}{T(99, 56.5, "▾", { a: "middle", s: 5 })}
    </g>
  );
  if (kind === "a-mac-graphic") body = (
    <g>
      {cal(4, 30, 66)}
      {T(8, 18, "2026年9月", { s: 6.5, w: 700 })}
      <circle cx="92" cy="50" r="20" fill="#FFFFFF" stroke="#B7BCDA" />
      <line x1="92" y1="50" x2="92" y2="36" stroke="#2E3457" strokeWidth="1.2" />
      <line x1="92" y1="50" x2="102" y2="54" stroke="#2E3457" strokeWidth="1.2" />
      <circle cx="92" cy="50" r="1.5" fill={color} />
    </g>
  );
  if (kind === "a-watch") body = (
    <g>
      <rect x="32" y="10" width="56" height="84" rx="16" fill="#171B36" />
      <rect x="88" y="34" width="5" height="14" rx="2" fill="#565D8A" />
      <rect x="38" y="44" width="44" height="12" rx="4" fill="none" stroke={color} strokeWidth="1.2" />
      {["8月", "9月", "10月"].map((v, j) => T(60, 36 + j * 11, v, { a: "middle", s: j === 1 ? 7.5 : 6, c: j === 1 ? "#FFFFFF" : "#7E86AC", w: j === 1 ? 700 : 400 }))}
    </g>
  );
  if (kind === "g-docked") body = (
    <g>
      <rect x="8" y="6" width="104" height="16" rx="3" fill="#FFFFFF" stroke={color} strokeWidth="1.2" />
      {T(13, 17, "09/17/2026", { f: mono, s: 6.5 })}
      <rect x="8" y="26" width="104" height="76" rx="12" fill="#F1F4F3" />
      {T(16, 38, "9月 ▾    2026 ▾", { s: 6, w: 600 })}
      {cal(12, 50, 96)}
    </g>
  );
  if (kind === "g-modal") body = (
    <g>
      <rect x="6" y="4" width="108" height="100" rx="12" fill="#F1F4F3" />
      {T(14, 14, "日付を選択", { s: 5.5, c: "#565D8A" })}
      {T(14, 27, "9月17日(木)", { s: 9, w: 600 })}
      <line x1="6" x2="114" y1="32" y2="32" stroke="#D5D9EC" />
      {cal(10, 44, 100)}
      {T(108, 99, "キャンセル   OK", { a: "end", s: 5.5, c: color, w: 600 })}
    </g>
  );
  if (kind === "g-range") body = (
    <g>
      <rect x="6" y="4" width="108" height="100" rx="4" fill="#F1F4F3" />
      {T(12, 14, "✕", { s: 7 })}{T(108, 14, "保存", { a: "end", s: 6, c: color, w: 700 })}
      {T(14, 28, "9月20日 – 9月24日", { s: 8, w: 600 })}
      <line x1="6" x2="114" y1="33" y2="33" stroke="#D5D9EC" />
      {T(12, 44, "2026年9月", { s: 5.5, c: "#565D8A" })}
      {cal(10, 55, 100, [], [20, 24])}
    </g>
  );
  if (kind === "g-input") body = (
    <g>
      <rect x="6" y="14" width="108" height="80" rx="12" fill="#F1F4F3" />
      {T(14, 25, "日付を入力", { s: 5.5, c: "#565D8A" })}
      {T(14, 38, "9月17日(木)", { s: 9, w: 600 })}
      <line x1="6" x2="114" y1="43" y2="43" stroke="#D5D9EC" />
      <rect x="14" y="52" width="92" height="17" rx="3" fill="#FFFFFF" stroke={color} strokeWidth="1.2" />
      {T(19, 63.5, "09/17/2026", { f: mono, s: 6.5 })}
      {T(106, 88, "キャンセル   OK", { a: "end", s: 5.5, c: color, w: 600 })}
    </g>
  );
  if (kind === "g-dial") body = (
    <g>
      <rect x="18" y="6" width="30" height="18" rx="4" fill={color} opacity="0.2" />
      {T(33, 19, "07", { a: "middle", s: 10, f: mono })}
      {T(54, 19, ":", { a: "middle", s: 10 })}
      <rect x="60" y="6" width="30" height="18" rx="4" fill="#E7EAF4" />
      {T(75, 19, "00", { a: "middle", s: 10, f: mono })}
      <rect x="94" y="6" width="16" height="18" rx="3" fill="none" stroke="#B7BCDA" />
      {T(102, 13.5, "AM", { a: "middle", s: 4.5 })}{T(102, 21.5, "PM", { a: "middle", s: 4.5 })}
      <circle cx="60" cy="66" r="34" fill="#E7EAF4" />
      <line x1="60" y1="66" x2="60" y2="38" stroke={color} strokeWidth="1.3" />
      <circle cx="60" cy="38" r="6" fill={color} />
      {T(60, 40, "12", { a: "middle", s: 5, c: "#FFFFFF" })}
      {[3, 6, 9].map((h) => { const a = (h / 12) * Math.PI * 2; return T(60 + Math.sin(a) * 27, 68 - Math.cos(a) * 27, String(h), { a: "middle", s: 5.5 }); })}
    </g>
  );
  if (kind === "g-tinput") body = (
    <g>
      {T(12, 16, "時刻を入力", { s: 5.5, c: "#565D8A" })}
      <rect x="12" y="26" width="36" height="26" rx="4" fill={color} opacity="0.2" />
      {T(30, 44, "07", { a: "middle", s: 13, f: mono })}
      {T(54, 44, ":", { a: "middle", s: 13 })}
      <rect x="60" y="26" width="36" height="26" rx="4" fill="#E7EAF4" />
      {T(78, 44, "00", { a: "middle", s: 13, f: mono })}
      <rect x="100" y="26" width="12" height="26" rx="3" fill="none" stroke="#B7BCDA" />
      {T(106, 37, "AM", { a: "middle", s: 4 })}{T(106, 47, "PM", { a: "middle", s: 4 })}
      {T(30, 60, "時", { a: "middle", s: 5.5, c: "#666D93" })}{T(78, 60, "分", { a: "middle", s: 5.5, c: "#666D93" })}
      {T(12, 92, "⌚", { s: 8, c: "#565D8A" })}
      {T(108, 92, "キャンセル  OK", { a: "end", s: 5.5, c: color, w: 600 })}
    </g>
  );
  return (
    <svg viewBox="0 0 120 108" width="150" height="135" role="img" aria-label="デザインパターンの画面イメージ">
      <rect x="0.5" y="0.5" width="119" height="107" rx="8" fill="#FFFFFF" stroke="#E1E3F0" />
      {body}
    </svg>
  );
}

function PatternGallery() {
  return (
    <div>
      {PATTERNS.map((g) => (
        <div key={g.key} style={styles.patternGroup}>
          <div style={{ ...styles.patternGroupName, color: g.color }}>{g.name}</div>
          <p style={styles.patternGroupNote}>{g.note}</p>
          <div style={styles.patternGrid}>
            {g.items.map((it) => (
              <div key={it.kind} style={styles.patternCard}>
                <PatternMockup kind={it.kind} color={g.color} />
                <div style={styles.patternName}>{it.name}</div>
                <div style={styles.patternMeta}>
                  <span style={styles.patternChip}>{it.platform}</span>
                  <span style={styles.patternChip}>{it.method}</span>
                </div>
                <div style={styles.patternDesc}>{it.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function DateTimePickerSwatch() {
  return (
    <div style={{ width: 160, margin: "0 auto" }}>
      <div style={{ border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden", background: "#F8F9FD" }}>
        <div style={{ padding: "4px 0", textAlign: "center", fontSize: 10, color: "#666D93", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>8月</div>
        <div style={{ padding: "6px 0", textAlign: "center", fontSize: 14, fontWeight: 700, color: "#171B36", background: "#EEF1FA", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>9月</div>
        <div style={{ padding: "4px 0", textAlign: "center", fontSize: 10, color: "#666D93", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>10月</div>
      </div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "カレンダーや回転する一覧などで、日付や時刻を選んで入力するコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "日付・時刻を、形式の間違いなく入力してもらう" },
  { k: "よく使われる場面", v: "予約日・生年月日・アラームの時刻の入力" },
  { k: "似たコンポーネント", v: <>予定を一覧で見せる画面は<PageLink to="/components/text-inputs/calendar">カレンダー(スケジュール/予定表)</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "日付は、入力欄で入れる?カレンダーで選ぶ?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "多くの場面では入力欄が速い。誕生日のような遠い日付は特に入力欄。カレンダーは近い日付(1年未満ほど)と期間の選択に向く" },
      { who: "W3C(APG)", color: "#A3821F", t: "APGの例は、形式を添えた入力欄と、カレンダーを開くボタンの組み合わせ。カレンダーは入力の補助" },
      { who: "Google", color: "#2F7D6E", t: "入力欄とカレンダーの両方を持つ形(ドッキング)、カレンダー(モーダル)、入力(モーダル入力)を使い分ける。遠い日付にはカレンダーを使わない" },
      { who: "Apple", color: "#C2542A", t: "コンパクト・インライン・ホイールのスタイルを場所に合わせて選ぶ。カレンダーで日を選ぶほか、数字キーで入力もできる" },
    ],
    tip: "入力欄を基本にし、近い日付や期間を選ぶ場面でカレンダーを補助として開けるようにすると、4系列のどれとも食い違わない。誕生日の入力でカレンダーを先に出すのは避ける。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "入力欄を基本に、カレンダーは補助にする", d: "", who: "AI解釈(4系列のどれとも食い違わない形)" },
  { n: 2, t: "カレンダーは近い日付や期間に使う", d: "", who: "NN group" },
  { n: 3, t: "誕生日のような遠い日付で、カレンダーを先に出さない", d: "", who: "NN group・Google" },
];

export default function SelectionDateTimePickerPage() {
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
        <SidebarNav currentPath="/components/selection/date-time-picker" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / 日付/タイムピッカー</span>
            <span>SPEC No. 022</span>
          </div>

          <h1 style={styles.title}>日付/タイムピッカー</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ(ホイール型の例)"
            image={<><DateTimePickerSwatch /></>}
            imageNote={<>スクロール可能な値のリストから、中央に表示された値を選ぶ。カレンダー形式・フリーテキスト形式など他の実現方法もある。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <h2 style={styles.diagramTitle}>入力方法の使い分け(4種類)</h2>
          <InputMethodsSummary />
          <p style={styles.diagramNote}>どの系列も、上記いずれかの方式(または組み合わせ)を採用している。ダイヤルは時刻専用の方式だ。日付・時刻の性質(近い/遠い、範囲か単一か)に応じて方式を選び、迷ったらNN groupの「多くの場面ではフリーテキストが最も効率的」という指針を起点にするのが安全だ。</p>

          <h2 style={styles.diagramTitle}>デザインパターン一覧(Apple・Google)</h2>
          <p style={styles.diagramNote}>AppleとGoogleは、日付・時刻のピッカーを複数の見た目(パターン)で用意している。各公式ドキュメントに載っているパターンをすべて並べた。画面イメージは内容をもとに描いた概念図だ。</p>
          <PatternGallery />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>日付を入力欄で入れるか、カレンダーで選ぶか</strong>は系列ごとに重みが違うが、<strong>「入力欄を基本に、カレンダーは補助」</strong>という形で両立する(上の「意見が分かれる点」)。
            </p>
            <p style={styles.synthesisText}>
              NN groupは、カレンダーピッカーは近い将来の日付や期間の選択に向くとしている。Googleも<strong>生年月日のような遠い日付にはモーダルのカレンダーを使わず</strong>、モーダル入力かドッキングを使うとしている。
            </p>
            <p style={styles.synthesisText}>
              AppleとGoogleは、<strong>1つのコンポーネントに複数の見た目(パターン)を用意</strong>している。AppleはiOSでコンパクト・インライン・ホイール、macOSでテキスト形式・グラフィカル形式を持ち、Googleは日付でドッキング・モーダル・モーダル入力(+期間選択)、時刻でダイヤル・入力を持つ。どちらも<strong>カレンダーやダイヤルと、キーボード入力の両方を行き来できる</strong>ようにしている点は、NN groupの「自由入力が効率的な場面が多い」という指摘とも両立する設計だ。
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

          <RelatedPages paths={["/components/selection/overview", "/components/text-inputs/calendar", "/components/text-inputs/text-field", "/components/text-inputs/input-validation"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["入力・フォーム", "選択・切り替え"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 22px", lineHeight: 1.6 },
  patternGroup: { marginBottom: 20 },
  patternGroupName: { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  patternGroupNote: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A", margin: "0 0 10px" },
  patternGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))", gap: 10 },
  patternCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  patternName: { fontSize: 12.5, fontWeight: 700, color: "#171B36", textAlign: "center" },
  patternMeta: { display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" },
  patternChip: { fontSize: 9.5, fontFamily: "'IBM Plex Mono', monospace", color: "#3C5A73", background: "#EEF1FA", padding: "2px 6px", borderRadius: 3 },
  patternDesc: { fontSize: 11, lineHeight: 1.55, color: "#454C78", alignSelf: "stretch" },
  methodGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 4 },
  methodCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 16px" },
  methodName: { fontSize: 13.5, fontWeight: 700, color: "#171B36", marginBottom: 4 },
  methodRepresents: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A", marginBottom: 10 },
  methodUsageRow: { display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 },
  methodUsageMark: { flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, width: 30 },
  methodUsageMarkOk: { color: "#2F7D6E" },
  methodUsageMarkNg: { color: "#C0503F" },
  methodUsageText: { fontSize: 11, lineHeight: 1.5, color: "#454C78" },
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
  glossaryNoteBox: { marginTop: 2, marginBottom: 10 },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
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
