import React from "react";
import SidebarNav from "./sidebar-nav";

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
 * 複数選択にも公式に対応していることが判明し、この点をページに反映した(従来は単一選択の
 * コンポーネントとしてのみ記載していた)。メニュー全体のdp数値やカラートークン名などの
 * specs数値は未確認。
 * W3CはWCAG本文に加え、WAI-ARIA Authoring Practices(Combobox・Listboxパターン)を直接取得して確認済み。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Pop-up buttons / Pull-down buttons",
    color: "#C2542A",
    position: "相互排他的な選択肢を示す「Pop-upボタン」と、関連する操作をまとめる「Pull-downボタン」に分かれる",
    size:
      "Pop-up buttonsのページには、サイズの規定がありません(ネイティブコントロールとしてシステムが自動的に描画します)。参考として、Appleの一般的なタップ領域(iOS/iPadOSで既定44pt・最小28pt。ボタンのページを参照)が目安になります(AI解釈)。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "Pop-upボタンは、相互排他的な選択肢のフラットなリストを提示し、選択済みの内容を反映するようラベルを更新できるコントロールと定義されています。一方Pull-downボタンは、そのボタンの目的に直接関連する操作のメニューを表示するもので、選択というより操作の実行に近い位置づけです。",
    exceptions:
      "ユーザーがメニューを開かなくても選択肢の内容をある程度予測できるよう、説明的な前置きラベルやボタンラベルを用意すべきとしています。",
    accessibility:
      "―(このトピックにはアクセシビリティに関する直接の記載を確認できていません。標準のPop-up/Pull-downボタンコントロールを使えば、支援技術には自動的に状態が伝わると考えられます。)",
    useCases: [
      "相互排他的な選択肢から1つを選ばせる(Pop-upボタン)",
      "ボタンの目的に関連する複数の操作をまとめて提示する(Pull-downボタン、選択というより操作の実行)",
      "選択肢を開かなくても内容を予測できるラベルを用意する",
    ],
    searchHint: "flat list of mutually exclusive options",
    url: "https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons",
    urlSecondary: [{ label: "Pull-down buttons", url: "https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons" }],
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
    color: "#2F7D6E",
    position: "選択中の項目をテキストフィールド上に表示する「Exposed dropdown menu」。単一選択が基本だが、複数選択にも対応する(レアケース)",
    size:
      "メニュー全体の具体的なdp数値は確認できていませんが、メニュー項目の最小タップ領域は48×48dpと直接確認できました(単一選択・複数選択のメニュー共通)。",
    colorInfo:
      "メニューには「標準(表面ベースの配色、視覚的強調は控えめ)」と「鮮やか(第三次色ベース、視覚的強調が強い)」の2種類のカラーマッピングがあるとしています。鮮やかな配色は目立つため控えめに使うべきとしています。選択済み/未選択の項目間は、デフォルトで少なくとも3:1のコントラスト比を確保すべきとし、チェックマークなど色以外の視覚的な手がかりも併用することを推奨しています。",
    glossary: [
      { term: "単一選択メニュー / 複数選択メニュー", desc: "メニューは単一選択・複数選択のどちらにも対応する。単一選択メニューは新しい項目を選ぶと以前の選択が自動的に解除されるのに対し、複数選択メニューは複数の項目を選択したままメニューが開き続け、ユーザーが閉じるまで選択操作を続けられる。" },
    ],
    stance:
      "メニューは、一時的な表面(サーフェス)に選択肢の一覧を表示するコンポーネントで、アイコンボタンやテキストフィールドなど様々な要素から開けます。Exposed dropdown menu(「スピナー」「コンボボックス」とも呼ばれる)は、選択中の項目をアンカーとなるテキストフィールド上に表示する点が特徴で、ラジオボタンのような選択コントロールよりも目立たず、コンパクトな選択肢リストに向くとしています。公式ページ本文では、メニューは単一選択・複数選択のどちらにも対応すると明記されています。単一選択メニューでは新しい項目を選ぶと以前の選択が自動的に解除されますが、複数選択メニューでは複数の項目を選んだままメニューが開き続け、ユーザーが閉じるまで選択操作を続けられます。",
    exceptions:
      "利用できない選択肢は、削除するのではなく無効状態(グレーアウトなど)で示すべきとしています。メニュー項目にボタンやスイッチなど別の直接操作可能な要素を追加することは避けるべきで、ネストされた要素は1つの操作のみを行うようにすべきとしています(複数の操作を持たせるとキーボード操作やスクリーンリーダーの機能が損なわれる可能性があるため)。",
    accessibility:
      "操作可能(Operable) ― メニュー項目の最小タップ領域は48×48dpです(上記「サイズ」を参照)。メニューが開いたら最初の項目に自動的にフォーカスが当たるべきとしており、Escキー・メニュー外側のタップ・システムの戻るボタンで閉じられるべきとしています。無効化された項目はフォーカスを受け取れますが選択はできません(区切り線や空白部分はフォーカスを受け取りません)。",
    useCases: [
      "選択肢が多く、常に全部表示すると場所を取りすぎる場面(ラジオボタン・チップより省スペース)",
      "単一選択が基本だが、複数の項目を選ばせたい場合は複数選択メニューを使う(レアケース)",
      "オーバーフローメニュー・テキストフィールドのドロップダウン・コンテキストメニューなど、追加の操作が必要な場面に使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/menus/guidelines",
    urlSecondary: [{ label: "Specs(最新版)", url: "https://m3.material.io/components/menus/specs" }],
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
    color: "#A3821F",
    position: "標準select要素かカスタム実装かで対応が変わる、名前・役割・状態とキーボード操作性を求める一般基準の集合",
    size:
      "セレクト専用の数値基準はありませんが、一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求めます(どちらも例外あり)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、境界線や選択状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    glossary: [
      { term: "3.2.1 On Focus・レベルA", desc: "部品にフォーカスが当たっただけで、文脈の変化(新しいウィンドウ・ページの移動・フォーカスの移動など)を起こさないことを求める基準。" },
      { term: "3.2.2 On Input・レベルA", desc: "部品の設定(選択・チェック・入力)を変えただけで、事前の説明なしに文脈の変化を起こさないことを求める基準。リンクやボタンを押すことは「設定の変更」ではない。" },
      { term: "文脈の変化(change of context)", desc: "利用者が気づかないうちに起きると混乱させる大きな変化。新しいウィンドウを開く、フォーカスを別の部品に移す、別のページへ移動する、ページの内容を大きく組み替える、など。内容の変化(アコーディオンの開閉・タブの切り替えなど)は、それだけでは文脈の変化ではない。" },
    ],
    stance:
      "標準的なHTMLのselect要素であれば、ブラウザが自動的に名前・役割・状態を支援技術に伝えます。WCAGの要件は、部品の名前・役割・状態が支援技術に伝わること(4.1.2)と、すべての機能をキーボードで操作できること(2.1.1)です。独自にデザインしたカスタム実装の作り方は、W3CのAPG(実装の参考例。適合の要件ではない)が示しています。折りたたみ式のプルダウンの型は、Comboboxパターンの「Select-Only Combobox」(select要素と同じ働きをする例)です。Listboxは、常に表示する一覧や、開いたポップアップの中身に使う型です。また、選択肢を選んだだけで別のページへ移動したりフォームを送信したりすると、利用者が予期しない文脈の変化になります。3.2.2(レベルA)は、事前に知らせない限りこれを認めず、選んだ後に押す「移動」「送信」ボタンで実行する方法を示しています。3.2.1(レベルA)も、フォーカスを当てただけで文脈を変えないことを求めており、キーボードで選択肢の上を移動しているだけではページを移動させないようにします。",
    exceptions:
      "APGは実装の勧めとして、選択肢名が長すぎたり、同じ単語・フレーズで始まる選択肢が並ぶと、スクリーンリーダー利用者にとって分かりにくくなるため避けるよう勧めています。7個を超える選択肢がある場合は、先頭文字を入力してジャンプできる機能(タイプアヘッド)を用意するよう勧めています(どちらもWCAGの要件ではありません)。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 名前・役割・状態(4.1.2)に加え、矢印キー・Home/Endキー・タイプアヘッドなどのキーボード操作性(2.1.1)が関わります。3.2.1・3.2.2は「理解可能(Understandable)」の予測可能性(3.2)に関わります。",
    useCases: [
      "標準のselect要素を使い、ブラウザ標準のアクセシビリティに任せる",
      "カスタム実装の場合は、APGのSelect-Only Comboboxの例を参考にする(開いた一覧はrole=\"listbox\"/\"option\"とaria-selected)",
      "7個を超える選択肢には、タイプアヘッドでのジャンプ機能を用意する(APGの勧め)",
      "選んだだけでページの移動や送信をせず、「移動」「送信」ボタンで実行する(3.2.2)",
    ],
    searchHint: "aria-selected",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
    urlSecondary: [
      { label: "APG: Select-Only Comboboxの例", url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/" },
      { label: "APG: Listboxパターン", url: "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" },
      { label: "4.1.2 Name, Role, Value", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { label: "3.2.2 On Input", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html" },
      { label: "3.2.1 On Focus", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html" },
    ],
    confirmedNote: "3.2.1・3.2.2はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="90" height="26" viewBox="0 0 90 26">
          <rect x="1" y="1" width="88" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="10" y="17" fontSize="9.5" fill="#A3821F" fontFamily="Jost, Noto Sans JP">role="combobox"</text>
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>視覚デザインの規定はなく、役割の考え方を図示</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・状態の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Dropdowns: Design Guidelines",
    color: "#7A4F7E",
    position: "画面スペースの節約に向くが乱用されがちで扱いにくい面もある(数値基準ではなく使い分けの指針)",
    size: "数値基準は明言していません。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "ドロップダウンは、コマンドメニュー・ナビゲーションメニュー・フォーム入力・属性選択という4つの用途で使われるとしています。画面スペースを節約でき、ユーザーに標準的なウィジェットとして理解されやすいという長所がある一方、選択肢が多い・長いと使いにくくなるとしています。",
    exceptions:
      "他のウィジェットの選択に応じて選択肢が動的に変化する「インタラクティブメニュー」は、ユーザーを混乱させるため避けるべきとしています。利用不可の選択肢はグレーアウトで示し、非表示にすべきではないとしています。都道府県・国名のようにタイピングの方が速い場面や、生年月日のようにユーザーが暗記している情報には不向きだとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、使い分けの指針です。マウス操作とキーボード操作の両方に対応すべきとしています。",
    useCases: [
      "画面スペースを節約したい属性選択・フォーム入力",
      "選択肢が少なく1階層に収まるコマンド/ナビゲーションメニュー",
      "都道府県・国名などタイピングの方が速い場面では避ける",
    ],
    searchHint: "typing may be faster",
    url: "https://www.nngroup.com/articles/drop-down-menus/",
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function MultiSelectMenuIllustration() {
  return (
    <svg width="150" height="90" viewBox="0 0 150 90">
      <rect x="1" y="1" width="148" height="88" rx="6" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
      <rect x="10" y="10" width="14" height="14" rx="3" fill="#2F7D6E" />
      <path d="M13 17l3 3 6-7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="32" y="21" fontSize="11" fill="#171B36" fontFamily="Jost, Noto Sans JP">チーズ</text>
      <rect x="10" y="38" width="14" height="14" rx="3" fill="none" stroke="#9EA4C4" strokeWidth="1.6" />
      <text x="32" y="49" fontSize="11" fill="#565D8A" fontFamily="Jost, Noto Sans JP">ベーコン</text>
      <rect x="10" y="66" width="14" height="14" rx="3" fill="#2F7D6E" />
      <path d="M13 73l3 3 6-7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="32" y="77" fontSize="11" fill="#171B36" fontFamily="Jost, Noto Sans JP">トマト</text>
    </svg>
  );
}

function MultiSelectMenuSection() {
  return (
    <div style={styles.multiSelectCard}>
      <span style={styles.swatchLabel}>複数選択メニューのイメージ(Google/Material Design 3)</span>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MultiSelectMenuIllustration />
      </div>
      <p style={styles.swatchNote}>複数の項目を選択済みのまま、ユーザーが閉じるまでメニューが開き続ける(例: トッピングの複数選択。概念図・系列識別色)。</p>
      <a href="https://m3.material.io/components/menus/guidelines" target="_blank" rel="noreferrer" style={styles.sourceLink}>Google公式ページ(Menus)へ ↗</a>
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
          <p style={styles.subtitle}>4つのガイドラインが、選択肢を折りたたむセレクト(基本は単一選択)のサイズ・色・アクセシビリティ・選択方式をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <SelectSwatch />
            <p style={styles.swatchNote}>選択中の項目を1行で表示し、開くと選択肢の一覧が現れる。ラジオボタンと同じ単一選択だが、常時は折りたたまれている点が異なる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              セレクトは4系列とも<strong>「選択肢を折りたたんで省スペースにする」</strong>という理解では一致していますが、<strong>Googleは単一選択だけでなく複数選択のメニューにも公式に対応している</strong>点が他の3系列にはない特徴です(実務では単一選択が圧倒的に多いと考えられますが、公式ガイドラインには選択方式として明記されています)。ラジオボタンと役割は近いですが、Googleが「ラジオボタンほど目立たせたくないコンパクトな選択に向く」としている通り、<strong>常に全部を見せるラジオボタンと、折りたたむセレクトのどちらを使うかは表示スペースと選択肢の数で決まる</strong>という位置づけです。
            </p>
            <p style={styles.synthesisText}>
              複数選択メニューは、新しい項目を選んでも以前の選択が解除されず、<strong>ユーザーが閉じるまで複数の項目を選び続けられる</strong>という単一選択メニューとは異なる挙動を持ちます。ただし複数選択そのものを目的とするなら、チェックボックスの一覧やフィルタチップのセットの方が選択状態を常に見せられる分わかりやすく、Googleの複数選択メニューは<strong>選択肢が多く画面スペースを節約したい場面向けの、例外的な実装</strong>と捉えるのが実務上妥当でしょう。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは<strong>「都道府県・国名のようにタイピングの方が速い場面」「生年月日のように暗記している情報」にはセレクトは不向き</strong>と具体的に指摘しており、実務でよくある誤用への注意点として重要です。
            </p>
            <p style={styles.synthesisText}>
              アクセシビリティについては、<strong>標準のHTML select要素を使えばブラウザが自動的に対応します</strong>。HTMLの標準のselect要素を使うと、モバイルでは多くの場合、端末やブラウザに標準で用意された選択の画面が使われます(見た目や操作は端末・ブラウザによって異なります)。そのため、<strong>独自のプルダウンを安易に作らない</strong>のが安全です。どうしても作る場合、WCAGの要件は名前・役割・状態(4.1.2)とキーボード操作(2.1.1)で、作り方の参考はW3CのAPGの「Select-Only Combobox」の例です(矢印キー操作・7個超でのタイプアヘッドなどは、APGの勧め)。
            </p>
          </div>

          <MultiSelectMenuSection />

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
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
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
            <span>最終確認: 2026-09(Apple・NN group・WAI-ARIA・Googleとも公式ページ本文を確認済み。Googleのメニュー全体のdp数値・カラートークンなどspecs数値のみ未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはPop-up buttons本体へのリンクです。W3CはAPGのComboboxパターン(実装の参考)を主リンクに、Select-Only Comboboxの例・Listboxパターン・WCAGの各Understandingページを併記、NN groupは記事ページ単位です。Googleは最新版(M3)の公式ページ(Menus)へリンクしており、本文は確認済みですが、specsページ本文(dp数値など)はまだ確認できていません。
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
  multiSelectCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 22, textAlign: "center" },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
