import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, GoodBad } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection / セレクト(プルダウン)」ページ。
 * ラジオボタンと同じ「単一選択」の役割だが、選択肢を折りたたんで省スペースにする点が対照的。
 * 「Selectionの選び方」ページのプルダウンカードから最初にリンクされる本編ページ。
 *
 * Apple / Nielsen Norman Groupは公式ページ・記事本文を直接取得して確認済み(2026-09)。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで検索結果・Android開発者向けドキュメントなど複数の公式系資料による間接確認だったが、
 * 公式ページ本文(Menusページ: 使用法・バリエーション・色・状態・単一選択/複数選択・
 * インタラクションとスタイル・アクセシビリティの各セクション)を確認できたため、その内容を
 * 反映済み(2026-09、MD3_text/pulldown.docx)。これにより、Googleのメニューは単一選択だけでなく
 * 複数選択にも公式に対応している(2026-11 ③本人レビューNo.029で、複数選択の内容はこのページから外した。従来は単一選択の
 * コンポーネントとしてのみ記載していた)。メニュー全体のdp数値やカラートークン名などの
 * specs数値は未確認。
 * W3CはWCAG本文に加え、WAI-ARIA Authoring Practices(Combobox・Listboxパターン)を直接取得して確認済み。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Pop-up buttons / Pull-down buttons",
    term: "Pop-up button(選んだ値を表示)/ Pull-down button(操作の一覧)",
    color: "#C2542A",
    position: "1つだけを選ぶ「Pop-upボタン」と、関連する操作をまとめる「Pull-downボタン」に分かれる",
    size:
      "Pop-up buttonsのページにサイズの規定はない(ネイティブのコントロールとしてシステムが描く)。目安はAppleの一般の押せる範囲(iOS/iPadOSで既定44pt・最小28pt。ボタンのページ)(AI解釈)。",
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      "Pop-upボタンは、1つだけを選ぶ平らな選択肢のリストを出し、選んだ内容をラベルに反映できる。Pull-downボタンは、ボタンの目的に関わる操作のメニューを出すもので、選択より操作の実行に近い。",
    exceptions:
      "メニューを開かなくても選択肢をある程度予測できるよう、説明的なラベルを付ける。",
    accessibility:
      <span><NoData>記載なし。</NoData></span>,
    useCases: [
      "選択肢から1つだけを選ばせる(Pop-upボタン)",
      "ボタンの目的に関わる操作をまとめて出す(Pull-downボタン。選択より操作の実行)",
      "選択肢を開かなくても内容を予測できるラベルを用意する",
    ],
    searchHint: "flat list of mutually exclusive options",
    url: "https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons",
    refs: [
      { label: "Pop-up buttons", url: "https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons" },
      { label: "Pull-down buttons", url: "https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons" },
    ],
    illustration: () => (
      <svg width="90" height="26" viewBox="0 0 90 26">
        <rect x="1" y="1" width="88" height="24" rx="6" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="10" y="17" fontSize="10" fill="#C2542A" fontFamily="Jost, Noto Sans JP">選択中の項目</text>
        <path d="M76 9l4 4-4 4" fill="none" stroke="#C2542A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 78 13)" />
      </svg>
    ),
    illustrationNote: "Pop-upボタン(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Menus(Exposed dropdown menu)",
    term: "Exposed dropdown menu",
    color: "#2F7D6E",
    position: "選択中の項目をテキストフィールド上に表示する「Exposed dropdown menu」。セレクトとしては単一選択で使う(複数選択は「メニュー」「チェックボックス」ページ)",
    size:
      "メニュー項目の最小タップ領域は48×48dp。",
    colorInfo:
      "カラーマッピングは「標準(サーフェスの配色、強調は控えめ)」と「鮮やか(第三の色、強調が強い)」の2種類。鮮やかな配色は目立つため控えめに使う。選択済み/未選択の項目は既定で3:1以上のコントラスト比にし、チェックマークなど色以外の手がかりも添える。",
    glossary: [
    ],
    stance:
      <>メニューは、一時的なサーフェスに選択肢の一覧を出すコンポーネントで、アイコンボタンやテキストフィールドなどから開ける。Exposed dropdown menuは、選択中の項目をテキストフィールドに表示するのが特徴で、<Hl>ラジオボタンのような選択コントロールよりも目立たず</Hl>、コンパクトな選択肢の一覧に向く。1つだけ選ぶメニューでは、新しく選ぶと前の選択が外れる。</>,
    exceptions:
      "使えない選択肢は消さずに無効の状態(グレーアウトなど)で示す。項目にボタンやスイッチなど別の操作要素を加えず、入れ子の要素は1つの操作だけにする(複数の操作があるとキーボード操作やスクリーンリーダーが損なわれうるため)。",
    accessibility:
      "操作可能(Operable) ― 項目の押せる範囲は48×48dp以上(「サイズ」を参照)。開いたら最初の項目にフォーカスを当て、外側を押すかシステムの戻るボタンで閉じられるようにする。無効な項目はフォーカスできるが選べない(区切り線や空白はフォーカスしない)。",
    useCases: [
      "選択肢が多く、全部出すと場所を取りすぎる場面(ラジオボタン・チップより場所を取らない)",
      "テキストフィールドの形のドロップダウンで、決まった選択肢から値を1つ選ぶ(オーバーフロー・コンテキストメニューなど命令の一覧は「メニュー」のページ)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/menus/guidelines",
    refs: [
      { label: "Menus(Exposed dropdown menu)", url: "https://m3.material.io/components/menus/guidelines" },
      { label: "Specs(最新版)", url: "https://m3.material.io/components/menus/specs" },
    ],
    confirmedNote: "使用法・バリエーション・色のマッピング・単一選択/複数選択・メニュー項目・アクセシビリティ(タップ領域・フォーカス・終了操作)の各セクションは2026-09時点で公式ページ本文を直接確認済み。メニュー全体のdp数値やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="90" height="26" viewBox="0 0 90 26">
        <rect x="1" y="1" width="88" height="24" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <text x="10" y="17" fontSize="10" fill="#2F7D6E" fontFamily="Jost, Noto Sans JP">選択中の項目</text>
        <path d="M76 9l4 4-4 4" fill="none" stroke="#2F7D6E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 78 13)" />
        <line x1="1" y1="20" x2="89" y2="20" stroke="#2F7D6E" strokeWidth="1.6" />
      </svg>
    ),
    illustrationNote: "Exposed dropdown menu(概念図・系列識別色。下線はテキストフィールドとしての位置づけを示す)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.5.8 / 2.5.5 / 2.1.1 / 3.2.1 / 3.2.2、APG Comboboxパターン(Select-Only)",
    term: "combobox(Select-Only)・listbox(WAI-ARIAのロール)/ HTMLのselect要素",
    color: "#A3821F",
    position: "名前・役割・状態とキーボード操作を求める一般の基準。標準のselect要素か独自の実装かで対応が変わる",
    size:
      "専用の数値基準はなく、一般のターゲットサイズの基準がかかる。2.5.8(レベルAA)は24×24 CSSピクセル以上、2.5.5(レベルAAA)は44×44 CSSピクセル(どちらも例外あり)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、境界線や選択状態を示す見た目は3:1以上のコントラスト比にする。",
    glossary: [
      { term: "3.2.1 On Focus・レベルA", desc: "フォーカスが当たっただけで、文脈の変化(新しいウィンドウ・ページの遷移・フォーカスの移動など)を起こさないこと。" },
      { term: "3.2.2 On Input・レベルA", desc: "設定(選択・チェック・入力)を変えただけで、事前の説明なしに文脈の変化を起こさないこと。リンクやボタンを押すことは「設定の変更」ではない。" },
      { term: "文脈の変化(change of context)", desc: "気づかないうちに起きると混乱させる大きな変化。新しいウィンドウを開く、フォーカスを別のコンポーネントに移す、別のページへ遷移する、ページの内容を大きく組み替える、など。内容の変化(アコーディオンの開閉・タブの切り替えなど)は、それだけでは文脈の変化ではない。" },
    ],
    stance:
      "標準のselect要素なら、ブラウザが名前・役割・状態を支援技術に自動で伝える。WCAGの要件は、名前・役割・状態が支援技術に伝わること(4.1.2)と、すべての機能をキーボードで操作できること(2.1.1)。独自の実装の作り方は、W3CのAPG(実装の参考例。適合の要件ではない)が示す。折りたたみ式のプルダウンの型はComboboxパターンの「Select-Only Combobox」(select要素と同じ働きの例)。Listboxは、いつも出している一覧や、開いたポップアップの中身に使う型。選んだだけで別のページへ遷移したりフォームを送信したりすると、予期しない文脈の変化になる。3.2.2(レベルA)は、事前に知らせない限りこれを認めず、選んだ後に押す「移動」「送信」ボタンで実行する方法を示す。3.2.1(レベルA)も、フォーカスを当てただけで文脈を変えないことを求め、キーボードで選択肢の上を移動しているだけではページを遷移させない。",
    exceptions:
      "APGの勧め: 選択肢の名前が長すぎる・同じ語で始まる選択肢が並ぶと、スクリーンリーダーでは分かりにくいため避ける。7個を超えるなら、先頭の文字を打ってジャンプできる機能(タイプアヘッド)を用意する(どちらもWCAGの要件ではない)。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 名前・役割・状態(4.1.2)とキーボード操作(2.1.1)。3.2.1・3.2.2は「理解可能(Understandable)」の予測可能(3.2)。",
    useCases: [
      "標準のselect要素を使い、ブラウザ標準のアクセシビリティに任せる",
      "独自に実装するなら、APGのSelect-Only Comboboxの例を参考にする(開いた一覧はrole=\"listbox\"/\"option\"とaria-selected)",
      "7個を超える選択肢には、タイプアヘッドでのジャンプ機能を用意する(APGの勧め)",
      "選んだだけでページの遷移や送信をせず、「移動」「送信」ボタンで実行する(3.2.2)",
    ],
    searchHint: "aria-selected",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/",
    refs: [
      { kind: "apg", label: "APG: Select-Only Comboboxの例", url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/" },
      { kind: "apg", label: "APG: Comboboxパターン(全体)", url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" },
      { kind: "apg", label: "APG: Listboxパターン", url: "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" },
      { kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { kind: "sc", level: "A", label: "3.2.2 入力時", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html" },
      { kind: "sc", level: "A", label: "3.2.1 フォーカス時", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html" },
      { kind: "sc", level: "A", label: "2.1.1 キーボード", url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
    ],
    confirmedNote: "3.2.1・3.2.2はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="90" height="26" viewBox="0 0 90 26">
          <rect x="1" y="1" width="88" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="10" y="17" fontSize="9.5" fill="#A3821F" fontFamily="Jost, Noto Sans JP">role="combobox"</text>
        </svg>
        <span style={{ fontSize: 9, color: "#666D93" }}>視覚デザインの規定はなく、役割の考え方を図示</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・状態の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Dropdowns: Design Guidelines",
    term: "Dropdown(ドロップダウン)",
    color: "#7A4F7E",
    position: "場所の節約に向くが、使いすぎられやすく扱いにくい面もある(数値基準ではなく使い分けの指針)",
    size: <NoData>数値基準なし</NoData>,
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      "用途は、コマンドメニュー・ナビゲーションメニュー・フォーム入力・属性の選択の4つ。場所を節約でき、標準のウィジェットとして理解されやすい一方、選択肢が多い・長いと使いにくい。",
    exceptions:
      <>ほかのウィジェットの選択で選択肢が変わる「インタラクティブメニュー」は、混乱させるため避ける。使えない選択肢は隠さずグレーアウトで示す。<Hl>都道府県・国名のように打つほうが速い場面</Hl>や、生年月日のように覚えている情報には向かない。</>,
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、使い分けの指針。マウスとキーボードの両方の操作に対応する。",
    useCases: [
      "場所を節約したい属性の選択・フォーム入力",
      "選択肢が少なく1階層に収まるコマンド/ナビゲーションメニュー",
      "都道府県・国名など、打つほうが速い場面では避ける",
    ],
    searchHint: "typing may be faster",
    url: "https://www.nngroup.com/articles/drop-down-menus/",
    refs: [
      { label: "Dropdowns: Design Guidelines", url: "https://www.nngroup.com/articles/drop-down-menus/" },
    ],
    illustration: () => (
      <svg width="90" height="26" viewBox="0 0 90 26">
        <rect x="1" y="1" width="88" height="24" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="10" y="17" fontSize="10" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">選択中の項目</text>
        <path d="M76 9l4 4-4 4" fill="none" stroke="#7A4F7E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 78 13)" />
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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function SelectSwatch() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "fit-content", margin: "0 auto" }}>
      <svg width="180" height="40" viewBox="0 0 180 40">
        <rect x="1" y="1" width="178" height="38" rx="6" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="2" />
        <text x="14" y="25" fontSize="14" fill="#2E3457" fontFamily="Jost, Noto Sans JP">東京都</text>
        <path d="M155 15l6 6 6-6" fill="none" stroke="#3A4FCF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "押すと選択肢の一覧が開き、その中から値を選ぶコンポーネント(プルダウン)";
const ABOUT = [
  { k: "目的・役割", v: "選択肢が多いときに場所をとらずに置き、選んだ値を表示し続ける" },
  { k: "よく使われる場面", v: "都道府県・国の選択、並べ替えの順番、フォームの選択項目" },
  { k: "似たコンポーネント", v: <>選択肢が少なく、すべて見せたいなら<PageLink to="/components/selection/radio">ラジオボタン</PageLink>、操作(命令)の一覧を出すなら<PageLink to="/components/selection/menu">メニュー</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "選択肢がいくつまでならラジオボタン、いくつからセレクト?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "5つ以下ならラジオボタン。場所を節約したいならドロップダウンも使えるが、押す回数と考える手間が増える" },
      { who: "NN group", color: "#7A4F7E", t: "数の目安はない。場所を節約できる一方、選択肢が多い・長いと使いにくい。国名や生年月日のように入力した方が速いものには使わない" },
      { who: "Apple", color: "#C2542A", t: "数の目安はない。互いに排他的な選択肢の平らな一覧にポップアップボタンを使う" },
    ],
    tip: "5つ以下で場所に余裕があればラジオボタン(全部見えて比べやすい)、それより多いか場所がなければセレクト、数十件を超えて名前を知っているものなら入力して絞り込める欄、という順に考えると、3系列の考え方がつながる。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "5つ以下で場所があればラジオボタン", d: "全部見えて比べやすい", who: "AI解釈" },
  { n: 2, t: "それより多いか、場所がなければセレクト", d: "", who: "AI解釈" },
  { n: 3, t: "数十件を超えるなら、入力して絞り込める欄にする", d: "名前を知っている項目を選ぶとき", who: "AI解釈" },
  { n: 4, t: "入力のほうが速い情報には使わない", d: "生年月日のように覚えている情報など", who: "NN group" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
            title="良い例・悪い例 ― 選択肢が少ないとき"
            items={[
              { kind: "good", fig: <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}><span style={{ fontSize: 12, fontWeight: 700, color: "#2E3457" }}>配送方法</span><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #3A4FCF", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3A4FCF" }} /></span><span style={{ fontSize: 13, color: "#2E3457" }}>通常配送</span></span><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #3A4FCF", display: "inline-flex", alignItems: "center", justifyContent: "center" }}></span><span style={{ fontSize: 13, color: "#2E3457" }}>お急ぎ便</span></span><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #3A4FCF", display: "inline-flex", alignItems: "center", justifyContent: "center" }}></span><span style={{ fontSize: 13, color: "#2E3457" }}>店舗で受け取る</span></span></div>, text: "選択肢が少ないときは、ラジオボタンですべて見せる。開かなくても比べられる。" },
              { kind: "bad", fig: <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}><span style={{ fontSize: 12, fontWeight: 700, color: "#2E3457" }}>配送方法</span><span style={{ width: 200, display: "flex", justifyContent: "space-between", border: "1.5px solid #8E93B5", borderRadius: 4, padding: "6px 10px", fontSize: 13, color: "#2E3457" }}>選択してください<span aria-hidden="true">▾</span></span></div>, text: "数個しかない選択肢をセレクトの中に隠すと、開くまで何があるか分からない。" },
            ]}
            basis="このページのサマリー(選択肢が少なく、すべて見せたいならラジオボタン)と「意見が分かれる点」のAI解釈(5つ以下で場所に余裕があればラジオボタン)。"
          />
  );
}

export default function SelectionSelectPage() {
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
        <SidebarNav currentPath="/components/selection/select" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / セレクト(プルダウン)</span>
            <span>SPEC No. 010</span>
          </div>

          <h1 style={styles.title}>セレクト(プルダウン)</h1>
          <SummaryCard keyPoints={KP}
            image={<><SelectSwatch /></>}
            imageNote={<>選択中の項目を1行で表示し、開くと選択肢の一覧が現れる。ラジオボタンと同じ単一選択だが、常時は折りたたまれている点が異なる。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <GoodBadFigure />

          <SplitSection splits={SPLITS} />




          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              セレクトは4系列とも<strong>「選択肢を折りたたんで省スペースにする」</strong>という理解で一致している。ラジオボタンと役割は近いが、Googleが「ラジオボタンほど目立たせたくないコンパクトな選択に向く」としている通り、<strong>常に全部を見せるラジオボタンと、折りたたむセレクトのどちらを使うかは表示スペースと選択肢の数で決まる</strong>という位置づけだ。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは<strong>「都道府県・国名のようにタイピングの方が速い場面」「生年月日のように暗記している情報」にはセレクトは不向き</strong>と具体的に指摘しており、実務でよくある誤用への注意点として重要だ。
            </p>
            <p style={styles.synthesisText}>
              アクセシビリティについては、<strong>標準のHTML select要素を使えばブラウザが自動的に対応する</strong>。HTMLの標準のselect要素を使うと、モバイルでは多くの場合、端末やブラウザに標準で用意された選択の画面が使われる(見た目や操作は端末・ブラウザによって異なる)。そのため、<strong>独自のプルダウンを安易に作らない</strong>のが安全だ。どうしても作る場合、WCAGの要件は名前・役割・状態(4.1.2)とキーボード操作(2.1.1)で、作り方の参考はW3CのAPGの「Select-Only Combobox」の例だ(矢印キー操作・7個超でのタイプアヘッドなどは、APGの勧め)。
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

          <RelatedPages paths={["/components/selection/overview", "/components/selection/select-patterns", "/components/selection/menu", "/components/selection/radio"]} />

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
