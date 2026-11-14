import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, RefList, SplitSection, TagLink, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Navigation / タブ」ページ。
 * セグメントコントロールと見た目が似ているため混同されやすいが、タブは「異なる
 * コンテンツ領域(画面・セクション)への移動」を担う点が本質的な違い。詳しい
 * 使い分けは「タブとセグメントの使い分け」ページを参照。
 *
 * Apple / W3C(WAI-ARIA)/ Nielsen Norman Groupは公式ページ・記事本文を直接取得して
 * 確認済み(2026-09)。Google(Material Design 3)は公式サイトがクライアント側
 * レンダリングのSPAで自動取得できないため、これまで検索結果による間接確認だったが、
 * 公式ページ本文(使用法・プライマリ/セカンダリ・コンテナ・アイコン・ラベル・バッジ・
 * アクティブインジケーター・Fixed/Scrollable・インタラクションとスタイル・
 * アクセシビリティの各セクション)を確認できたため、その内容を反映済み(2026-09、
 * MD3_text/tab.docx)。これにより「プライマリ/セカンダリの2階層」という、従来は
 * 未確認だった構造が判明し反映した。タブの高さなどのspecs数値は未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Tab views(macOS)",
    term: "Tab view(macOSの画面の中のタブ。iOS・iPadOSでは代わりにSegmented controlを勧める)",
    color: "#C2542A",
    position:
      <span>Tab viewはmacOSのコンポーネントで、iOS・iPadOS・tvOS・visionOSにはない(<Hl>iOS・iPadOSではSegmented controlを勧める</Hl>)。画面下部のTab bar(アプリ全体の遷移)は別のコンポーネントで、「タブの種類」の表と<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink>のページで扱う</span>,
    structure:
      "タブの並び(タブのコントロール)は、内容の領域の上端に置く。ウィンドウの端との間には余白を取る。プログラムで切り替えるアプリでは、タブの並びを隠してもよい。",
    count:
      <span><Hl>1つのタブビューに6個を超えるタブを置かない</Hl>。多すぎると圧倒され、レイアウトも崩れやすいため、それ以上ならポップアップボタンのメニューで選ぶなど別の作りにする。</span>,
    size:
      <NoData>記載なし</NoData>,
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      "密接に関係する内容の領域を並べて見せるのに使う。各タブの中身は互いに関係が深く、各パネルの中の操作はそのパネルの内容だけに効くようにする(パネルは互いに独立)。タブのラベルは中身を予想できる名詞(または短い動詞句)にする。",
    exceptions:
      "タブの切り替えにポップアップボタンを使わない(1回で選べ、全部見えるタブのほうが効率的なため)。ただしパネルが多すぎて並べきれないなら、ポップアップボタンが代わりになる。",
    accessibility:
      <span><NoData>記載なし</NoData></span>,
    useCases: [
      "macOSの設定画面などで、関係の深い内容の領域をタブで切り替える",
      "タブは6個までにし、それ以上ならポップアップボタンのメニューなど別の作りにする",
      "iOS・iPadOSでは、Tab viewの代わりにSegmented controlを使う",
    ],
    searchHint: "more than six tabs",
    url: "https://developer.apple.com/design/human-interface-guidelines/tab-views",
    refs: [
      { label: "Tab views", url: "https://developer.apple.com/design/human-interface-guidelines/tab-views" },
      { label: "Segmented controls(iOS・iPadOSでの代わり)", url: "https://developer.apple.com/design/human-interface-guidelines/segmented-controls" },
      { label: "参考: Tab bars(アプリ全体の遷移)", url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars" },
    ],
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#E1E3F0" strokeWidth="1.2" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={2 + i * 29.5} y="2" width="28.5" height="22" fill={i === 0 ? "#F7E4E1" : "none"} />
        ))}
        <line x1="1" y1="1" x2="1" y2="25" stroke="#C2542A" strokeWidth="2.5" />
        <text x="16" y="17" fontSize="8" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">A</text>
        <text x="45" y="17" fontSize="8" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">B</text>
        <text x="75" y="17" fontSize="8" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">C</text>
        <text x="104" y="17" fontSize="8" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">D</text>
      </svg>
    ),
    illustrationNote: "4タブ、左端が選択済み(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Tabs",
    term: "Tabs(Primary tabs / Secondary tabs)",
    color: "#2F7D6E",
    position: "内容を画面・データセットなどのカテゴリに整理する。プライマリ/セカンダリの2階層と、Fixed/Scrollableの2つの表示方式がある",
    structure:
      <span>プライマリタブはコンテンツペイン上部・アプリバーの下に置き、<Hl>セカンダリタブは常にその下に配置</Hl>する(詳しくは下の「メモ」)。コンテナはいつもウィンドウの幅いっぱいで、下端の区切り線で内容と分ける。</span>,
    count:
      <span><Hl>固定タブは一度に4個までを推奨し、5個以上は容器が窮屈になる</Hl>。多いときはスクロールできるタブにし、最初のタブを端から52dp離して、スクロールできることを示す。</span>,
    size:
      "タブの高さは48dp(アイコンとラベルを並べると64dp)、選んだタブの下線(インジケーター)の太さは3dp(Jetpack Composeのトークン)。タッチターゲットは48×48 CSSピクセル以上。既定で高密度の設定を適用せず(ターゲットサイズが48×48pxを下回るため)、高密度のレイアウトを選ぶ場合も各要素を48×48px以上に保つ。",
    colorInfo:
      <span>選んだタブは、文字とアイコンの下線と色の変化で区別する。</span>,
    glossary: [
      { term: "プライマリタブ / セカンダリタブ", desc: "階層は2つ。プライマリタブはコンテンツペインの上・アプリバーの直下に置き、主な内容へのリンクを示す。セカンダリタブはいつもその下に置き、関連する内容をさらに分ける。見た目はより簡素だが、働きはプライマリと同じ。" },
      { term: "Fixed(固定) / Scrollable(スクロール可能)", desc: "固定タブはすべてのタブを同時に出す(地図の交通手段の切り替えなど)。スクロールできるタブは画面に収まらないときに使い、長いラベルや多くのタブに対応できる。" },
    ],
    stance:
      "同じ階層の関連する内容をまとめて整理するコンポーネント。順番に読む内容ではなく、関連する内容をまとめる用途に限る。",
    exceptions:
      <span>順番に読む内容にはタブを使わず、タイポグラフィや余白で階層を作る。一部のタブだけアイコンとラベルの両方を使う(ほかは片方だけ)ような不統一は避ける。<Hl>タブをループして無限にスクロールさせない</Hl>(スクリーンリーダーで順にたどる人の妨げになりうるため)。</span>,
    accessibility:
      "操作可能(Operable) ― タッチターゲットを48×48 CSSピクセル以上にし(「サイズ」を参照)、アイコンだけで文字のないタブには読み上げ用のラベルを付ける。",
    useCases: [
      "同じ階層の関連する内容をカテゴリにまとめる(順に読む内容には使わない)",
      "階層が複数要るなら、プライマリ+セカンダリの2段にする",
      "収まらないならScrollable、全部見せたいならFixed(4個まで)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/tabs/guidelines",
    refs: [
      { label: "Tabs ― Guidelines(使用法)", url: "https://m3.material.io/components/tabs/guidelines" },
      { label: "Tabs ― Accessibility", url: "https://m3.material.io/components/tabs/accessibility" },
    ],
    confirmedNote: "使用法・プライマリ/セカンダリ・コンテナ・アイコン・ラベル・バッジ・アクティブインジケーター・Fixed/Scrollable・インタラクションとスタイル・アクセシビリティの各セクションは2026-09時点で公式ページ本文を直接確認済み。タブの高さなどのspecs数値は未確認。",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        {[0, 1, 2].map((i) => (
          <text key={i} x={20 + i * 40} y="13" fontSize="8" fill={i === 0 ? "#2F7D6E" : "#9EA4C4"} textAnchor="middle" fontFamily="Jost, Noto Sans JP" fontWeight={i === 0 ? "700" : "400"}>{["カテゴリA", "カテゴリB", "カテゴリC"][i]}</text>
        ))}
        <line x1="1" y1="22" x2="119" y2="22" stroke="#E1E3F0" strokeWidth="2" />
        <line x1="2" y1="22" x2="38" y2="22" stroke="#2F7D6E" strokeWidth="2.5" />
      </svg>
    ),
    illustrationNote: "選択中のタブに下線インジケーター(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.1.1 / 2.5.8 / 2.5.5(WAI-ARIA Tabsパターン) / 3.2.1",
    term: "tablist・tab・tabpanel(WAI-ARIAのロール)。APGでは Tabs",
    color: "#A3821F",
    position: "role=\"tablist\"/\"tab\"/\"tabpanel\"で、名前・役割・状態とキーボード操作を求める一般の基準",
    structure:
      <span>APGでは、<Hl>タブの並びを囲む要素にrole="tablist"、各タブにrole="tab"、対応するコンテンツ領域にrole="tabpanel"を割り当て</Hl>、選択中のタブにはaria-selected="true"を設定するとしている。</span>,
    count:
      <NoData>記載なし</NoData>,
    size:
      "専用の数値基準はなく、一般のターゲットサイズの基準がかかる。2.5.8(レベルAA)は24×24 CSSピクセル以上、2.5.5(レベルAAA)は44×44 CSSピクセル(どちらも例外あり。詳しくは「ボタン」ページ)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、選択中のタブを示す下線や背景などは3:1以上のコントラスト比にする。",
    glossary: [
      { term: "3.2.1 On Focus・レベルA", desc: "フォーカスが当たっただけで、文脈の変化(新しいウィンドウ・ページの遷移・フォーカスの移動など)を起こさないこと。" },
      { term: "文脈の変化(change of context)", desc: "気づかないうちに起きると混乱させる大きな変化。新しいウィンドウを開く、フォーカスを別のコンポーネントに移す、別のページへ遷移する、ページの内容を大きく組み替える、など。内容の変化(アコーディオンの開閉・タブの切り替えなど)は、それだけでは文脈の変化ではない。" },
    ],
    stance:
      "WCAGの要件は、タブの名前・役割・状態が支援技術に伝わること(4.1.2)と、キーボードで操作できること(2.1.1)。作り方は、W3CのAPG(実装の参考例。適合の要件ではない)のTabsパターンが示している。",
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 名前・役割・状態(4.1.2)、キーボード操作(2.1.1)、ターゲットサイズ(2.5)。3.2.1は「理解可能(Understandable)」の予測可能(3.2)。",
    useCases: [
      "タブの並びにrole=\"tablist\"、各タブにrole=\"tab\"を割り当てる",
      "対応するコンテンツ領域にrole=\"tabpanel\"を割り当てる",
    ],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
    refs: [
      { kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { kind: "sc", level: "A", label: "2.1.1 キーボード", url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html" },
      { kind: "sc", level: "A", label: "3.2.1 フォーカス時", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { kind: "sc", level: "AAA", label: "2.5.5 ターゲットのサイズ(高度)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html" },
      { kind: "apg", label: "APG ― Tabs Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" },
      { kind: "apg", label: "APG ― 選択をフォーカスに追従させるかの判断", url: "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#decidingwhentomakeselectionautomaticallyfollowfocus" },
    ],
    confirmedNote: "3.2.1はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="26" viewBox="0 0 120 26">
          <rect x="1" y="1" width="118" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="17" fontSize="8.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">tablist / tab / tabpanel</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Tabs, Used Right",
    term: "Tabs",
    color: "#7A4F7E",
    position: "数が少なく、並列で重要度のそろった内容のまとまりに向く(数値基準ではなく使い分けの指針)",
    structure:
      <NoData>記載なし</NoData>,
    count:
      <span>タブの数が多すぎてタブ一覧からあふれると、<Hl>カルーセル化して隠れたタブが見つけにくくなる</Hl>ため、<Hl>タブはできるだけ少なくすべき</Hl>としている。</span>,
    size: <NoData>数値基準なし</NoData>,
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      "内容が長く、はっきりしたまとまりがあるなら、タブは情報をひと目で見える単位に分け、認知の負担を減らす。利用者が自然に「まとまっているはず」と思う並列のカテゴリの整理に最も向く。",
    exceptions:
      "重要度がそろっていないなら使わない。既定で出るタブに注目が集まりやすいため、ほかのタブの内容は必須ではない補助的なものにする。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、内容を利用者が期待するまとまりに整理するという使い分けの指針。",
    useCases: [
      "内容が長く、はっきりした並列のまとまりに分けられるときに使う",
      "タブはできるだけ少なくする(あふれるとカルーセルのようになり、見つけにくい)",
      "すべてのタブの内容が同じくらい重要なときに使う(そうでなければ避ける)",
    ],
    searchHint: "the fewer tabs, the better",
    url: "https://www.nngroup.com/articles/tabs-used-right/",
    refs: [{ label: "Tabs, Used Right", url: "https://www.nngroup.com/articles/tabs-used-right/" }],
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={2 + i * 39} y="2" width="37" height="22" rx="3" fill={i === 0 ? "#7A4F7E" : "#FFFFFF"} stroke="#7A4F7E" strokeWidth="1.4" />
        ))}
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

/* この部品について(冒頭の説明) */
const ABOUT = [
  { k: "目的・役割", v: "同じ画面の中で、関連する内容のまとまり(セクション・カテゴリ)を切り替えて見せる。今どのまとまりを見ているかを、選択中のタブで示す" },
  { k: "よく使われる場面", v: "商品ページの「概要・仕様・レビュー」、設定画面のカテゴリ、SNSの「おすすめ・フォロー中」" },
  { k: "似たコンポーネント", v: <>同じ内容の見え方(表示形式・絞り込み)を切り替えるなら<PageLink to="/components/navigation/segmented-control">セグメントコントロール</PageLink>(<PageLink to="/components/navigation/tabs-vs-segmented">タブとセグメントの使い分け</PageLink>)。アプリ全体の行き先を切り替えるなら<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink>(Appleのタブバーはこちらに相当)</> },
];

/* 意見が分かれる2点の図 */
function MiniTabs({ mode }) {
  const c = "#454C78";
  if (mode === "auto" || mode === "manual") {
    return (
      <svg width="132" height="40" viewBox="0 0 132 40" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={2 + i * 43} y="2" width="40" height="14" rx="2" fill={i === 1 && mode === "auto" ? c : "#FFFFFF"} stroke={c} strokeWidth="1.2" strokeDasharray={i === 1 ? "0" : "0"} />
        ))}
        <rect x="44" y="0.5" width="44" height="17" rx="3" fill="none" stroke="#3A4FCF" strokeWidth="1.6" />
        <rect x="2" y="20" width="126" height="18" rx="2" fill="#F3F6FA" stroke="#D5D9EC" />
        <text x="65" y="32" fontSize="8" textAnchor="middle" fill="#565D8A" fontFamily="Jost, Noto Sans JP">{mode === "auto" ? "フォーカスで表示" : "Enter/Spaceで表示"}</text>
      </svg>
    );
  }
  /* 収まらないタブ: scroll=はみ出してスクロール、few=数を絞る */
  return (
    <svg width="132" height="22" viewBox="0 0 132 22" aria-hidden="true">
      <rect x="1" y="1" width="110" height="20" rx="2" fill="none" stroke="#D5D9EC" />
      {(mode === "scroll" ? [0, 1, 2, 3, 4] : [0, 1, 2]).map((i) => (
        <rect key={i} x={4 + i * (mode === "scroll" ? 30 : 36)} y="4" width={mode === "scroll" ? 27 : 33} height="14" rx="2" fill={i === 0 ? c : "#FFFFFF"} stroke={c} strokeWidth="1" opacity={mode === "scroll" && i > 3 ? 0.35 : 1} />
      ))}
      {mode === "scroll" && <path d="M116 11h12m-4-4l4 4-4 4" fill="none" stroke="#9EA4C4" strokeWidth="1.4" />}
    </svg>
  );
}

/* タブの種類(4系列のまとめ)と、NN groupによる2種類の違い */
const TAB_KINDS = [
  { kind: "ナビゲーションのタブ(主な場所へ遷移)", cells: [
    "Tab bar。iOSは画面の下部に浮かび、iPadOSは画面の上部近くに出る(サイドバーに切り替えられる)",
    <>タブではなく<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink>という別のコンポーネント</>,
    <NoData>記載なし</NoData>,
    "Navigation tabs。別のページへ遷移する。画面の上部か左に置き、モバイルでは下部が多い",
  ] },
  { kind: "ページ内のタブ(同じ画面の中で切り替え)", cells: [
    <>Tab view(macOSのみ。内容の領域の上端に置く)。iOS・iPadOSでは<PageLink to="/components/navigation/segmented-control">セグメントコントロール</PageLink>を使う</>,
    "Tabs。同じ階層の関連する内容を切り替える",
    "APGのTabsパターン。同じページの中でパネルを切り替える",
    "In-page tabs。今の画面に留まったまま、関連する内容を切り替える",
  ] },
  { kind: "2段(階層)にする", cells: [
    <NoData>記載なし</NoData>,
    "Primary tabs(コンテンツの上、アプリバーの下)と、その下のSecondary tabs",
    <NoData>記載なし</NoData>,
    "1つのタブの並びに、ナビゲーションのタブとページ内のタブを混ぜない",
  ] },
  { kind: "収まらないとき", cells: [
    "末尾が「その他(More)」タブになるため、はみ出しを避ける",
    "Scrollable(横にスクロールできるタブ)を使う。全部を見せるFixedは4個まで",
    <NoData>記載なし</NoData>,
    "カルーセルのようになり、隠れたタブが見つけにくくなるので、少ないほどよい",
  ] },
];
const NN_TAB_DIFF = [
  ["内容", "広い範囲の、関連の薄い・異なる内容", "狭い範囲の、関連する・似た内容"],
  ["位置", "画面の上部か左(モバイルでは下部が多い)", "ページの中の、内容に合わせた場所"],
  ["スクロールしたとき", "上部(か下部)に固定されることがある", "固定されることは少ない"],
  ["利用者が思うこと", "新しい画面へ移る。少し読み込みを待つ", "今の画面に留まる。すぐに切り替わる"],
  ["最初に選ばれているタブ", "通常は1つ。どのタブにも属さない画面では選ばれていないこともある", "必ず1つ選ばれている"],
];

function TabKinds() {
  const systems = ["Apple", "Google", "W3C", "NN group"];
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>タブの種類</h2>
      <p style={styles.diagramNote}>「主な場所へ遷移するタブ」と「同じ画面の中で内容を切り替えるタブ」は、見た目が似ていても別のものだ。このページの比較は、後者(ページ内のタブ)が対象だ。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.kindTable}>
          <thead><tr><th style={styles.kindTh}>種類</th>{systems.map((n) => (<th key={n} style={styles.kindTh}>{n}</th>))}</tr></thead>
          <tbody>
            {TAB_KINDS.map((r) => (
              <tr key={r.kind}>
                <td style={{ ...styles.kindTd, fontWeight: 700 }}>{r.kind}</td>
                {r.cells.map((c, i) => (<td key={i} style={styles.kindTd}>{c}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 style={styles.kindSub}>ナビゲーションのタブとページ内のタブの違い(Nielsen Norman Group)</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.kindTable}>
          <thead><tr>{["", "ナビゲーションのタブ", "ページ内のタブ"].map((h) => (<th key={h} style={styles.kindTh}>{h}</th>))}</tr></thead>
          <tbody>
            {NN_TAB_DIFF.map((r) => (<tr key={r[0]}><td style={{ ...styles.kindTd, fontWeight: 700 }}>{r[0]}</td><td style={styles.kindTd}>{r[1]}</td><td style={styles.kindTd}>{r[2]}</td></tr>))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const SPLITS = [
  {
    q: "キーボードでタブに移ったら、すぐに内容を切り替える?",
    sides: [
      { figure: <MiniTabs mode="auto" />, who: "W3C(APG)", color: "#A3821F", t: "内容をすぐに表示できるなら、フォーカスが移った時点で切り替える(自動)ことを勧める。表示に時間がかかる場合は、Enter/Spaceで選んだときに切り替える(手動)" },
      { figure: <MiniTabs mode="manual" />, who: "Google", color: "#2F7D6E", t: "Tabキー・矢印キーでフォーカスを移し、Space/Enterで選んだときに切り替える(手動)と説明している" },
    ],
    tip: "どちらも、矢印キーで移動できる点は同じだ。違いは「いつ切り替わるか」だけなので、内容がすぐ出るタブ(同じページ内の文章など)はAPGの自動、読み込みが必要なタブ(通信して一覧を取る、別ページへ移るなど)は手動、と分けると両方に沿う。Appleはキーボードでの切り替え方を定めていない。APGは実装の参考例で、適合の要件ではない。",
  },
  {
    q: "タブが画面に収まらないほど多いときは?",
    sides: [
      { figure: <MiniTabs mode="scroll" />, who: "Google", color: "#2F7D6E", t: "横にスクロールできるタブ(Scrollable)を使えば、必要な数だけ置いてよい。ただし、全部を一度に見せる固定タブは4個まで" },
      { figure: <MiniTabs mode="few" />, who: "Apple・NN group", color: "#7A4F7E", t: "数を絞る。Appleはタブビューを6個までとし、タブバーでは「その他」へのはみ出しを避ける。NN groupは、あふれてカルーセルのようになると隠れたタブが見つけにくくなるとして、少ないほどよいとする" },
    ],
    tip: "まず数を減らせないかを考え、どうしても減らせないときにGoogleのスクロール可能なタブを使う、という順番が3系列の考え方に沿う。スクロールさせる場合は、Googleの「最初のタブを端から52dp離して、続きがあると分かるようにする」工夫を入れると、NN groupが心配する「隠れたタブに気づかない」問題を和らげられる。",
  },
];

function TabSwatch() {
  const items = ["おすすめ", "フォロー中", "話題"];
  return (
    <div style={{ display: "inline-flex", borderBottom: "2px solid #E1E3F0" }}>
      {items.map((label, i) => (
        <div
          key={label}
          style={{
            padding: "8px 16px", fontSize: 13, fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
            color: i === 0 ? "#3A4FCF" : "#666D93",
            fontWeight: i === 0 ? 700 : 400,
            borderBottom: i === 0 ? "2px solid #3A4FCF" : "2px solid transparent",
            marginBottom: -2,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "まず数を減らす", d: "Appleのタブビューは6個まで、Googleの固定タブは4個まで", who: "Apple・Google" },
  { n: 2, t: "減らせないときはスクロールできるタブ", d: "続きがあると分かるようにする", who: "Google" },
  { n: 3, t: "iOS・iPadOSではセグメントコントロールを使う", d: "", who: "Apple" },
];

export default function NavigationTabsPage() {
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
        <SidebarNav currentPath="/components/navigation/tabs" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / タブ</span>
            <span>SPEC No. 013</span>
          </div>

          <h1 style={styles.title}>タブ</h1>
          <SummaryCard keyPoints={KP}
            image={<TabSwatch />}
            imageNote="選択中のタブを下線などで示し、タップすると対応するコンテンツ領域に切り替わる。"
            lead="横に並んだ見出しを押して、同じ画面の中の内容を切り替えるコンポーネント"
            rows={ABOUT}
          />


          <TabKinds />
          <SplitSection splits={SPLITS} />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              タブは<strong>画面の中で、内容の異なる領域(セクション・データセット)を切り替えるコンポーネント</strong>だ。Google・W3C・NN groupはこの意味のタブを扱い、AppleはmacOSの<strong>Tab view</strong>がこれに当たる(<strong>iOS・iPadOSではSegmented controlを勧める</strong>)。画面下部のAppleのタブバーはアプリ全体のナビゲーションで、別のコンポーネントだ(<a href="/components/navigation/nav-bar" style={{ color: "#3A4FCF" }}>ナビゲーションバー</a>のページ)。セグメントコントロールと見た目が似ているが、<strong>「内容のまとまりが切り替わる」のがタブ、「同じ内容の見え方が変わる」のがセグメントコントロール</strong>、という役割の違いが本質だ(詳しくは「タブとセグメントの使い分け」を参照)。
            </p>
            <p style={styles.synthesisText}>
              タブの数は、Google・Apple・NN groupとも<strong>「増やしすぎない」方向で共通</strong>している(Googleは固定タブ4個まで、AppleのTab viewは6個まで)。画面に収まらないときの扱いは系列で分かれる(「意見が分かれる点」を参照)。
            </p>
            <p style={styles.synthesisText}>
              <strong>Googleのタブには「プライマリ/セカンダリ」の2階層</strong>がある(セカンダリタブは常にプライマリタブの下)。Fixed/Scrollableという表示方式の軸とは別に、階層の軸も持っている点が特徴で、AppleのTab view(1階層のみ)にはない考え方だ。
            </p>
            <p style={styles.synthesisText}>
              アクセシビリティについては、WCAGの要件(4.1.2など)に対し、<strong>W3CのAPGがrole="tablist"/"tab"/"tabpanel"という具体的な作り方(Tabsパターン)</strong>を示している。Appleは「機能が使えない場合もタブを無効化・削除しない」という、他系列にはない具体的な運用ルールを持っている。Googleも「タブセットを無限ループでスクロールさせない」という、スクリーンリーダーの直線的なナビゲーションを妨げないための具体的な注意点を示している。
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
                <InfoBox label="タブの数">{s.count}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="構成・配置">{s.structure}</InfoBox>
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
                <div style={styles.labelCell}>タブの数</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.count}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>構成・配置</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.structure}</div>))}
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

          <RelatedPages paths={["/components/navigation/tabs-vs-segmented", "/components/navigation/segmented-control", "/components/navigation/nav-bar", "/components/containment/accordion"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["ナビゲーション"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  diagramNote: { fontSize: 11.5, color: "#666D93", margin: "0 0 10px", lineHeight: 1.6 },
  kindTable: { width: "100%", minWidth: 720, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457" },
  kindTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  kindTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  kindSub: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "20px 0 8px" },
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
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
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
