import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, hasRow, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection / メニュー」ページ。
 * (2026-10-05、Material 3のコンポーネント分類(Flutterの公式ドキュメントで確認)に合わせ、ActionsからSelectionへ移動)
 *
 * このページの発見: 4系列とも「よく使う項目を上に、関係する項目はまとめて区切る」「サブメニューは
 * 1階層まで」で一致する一方、2点ではっきり意見が分かれる。(1)使えない項目: Appleは通常のメニューでは
 * 薄く表示し、コンテキストメニューでは隠すとするが、NN groupはコンテキストメニューでも隠さず薄く表示
 * するよう勧め、W3C(APG)は使えない項目もフォーカスできるようにする。(2)キーボードショートカット:
 * Appleはコンテキストメニューに表示しないとし、NN groupは表示して覚えてもらうよう勧める。
 * Googleは寸法(項目の高さ48dp・幅112〜280dp)を決め、W3Cはキーボード操作(矢印・Enter・Esc)と
 * 役割(menu/menuitem・aria-haspopup・aria-expanded)を定める。
 * 値を選ぶためのセレクト(プルダウン)は「セレクト」ページで扱い、このページは命令(操作)の一覧を扱う。
 *
 * Apple(HIG Menus・Context menus・Pull-down buttons)はHIGのページデータ(JSON)を直接取得して確認(2026-10)。
 * Google(Menus)はm3.material.ioがSPAのため本文は未確認。Material Components for AndroidのMenu.mdと、
 * Jetpack ComposeのMenu.kt・MenuTokens.ktで直接確認(2026-10)。
 * W3C(APG Menu and Menubar Pattern・Menu Button Pattern)・NN group(Contextual Menus、Dropdowns:
 * Design Guidelines)は本文を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Menus / Context menus / Pull-down buttons",
    term: "Menu(コンテキストメニュー・プルダウンボタン・ポップアップボタン)",
    color: "#C2542A",
    position: <>プルダウンボタン・ポップアップボタン・コンテキストメニューを<Hl>用途で使い分ける</Hl></>,
    size: <><Hl>サブメニューは1階層まで</Hl>、項目が約5個を超えるなら別のメニューに。区切り線のグループは約3つまで。</>,
    colorInfo: "ラベルは動詞で短く。さらに入力が要る項目は末尾に「…」。使えない項目は薄く表示する(コンテキストメニューでは隠す)。",
    stance:
      <><Hl>重要な項目・よく使う項目を先頭に置く</Hl>。関係する項目はグループにまとめ、長すぎるメニューは分ける。コンテキストメニューの項目は、メインの画面からも使えるようにする。削除など壊す項目は最後に置き、赤い文字で示す(iOS・iPadOS)。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility:
      <span><NoData>記載なし。</NoData>使えない項目があってもメニュー自体は開けるようにし、どんな命令があるかを知れるようにする点は、分かりやすさ(理解可能)に関わる。</span>,
    useCases: [
      "ラベルは動詞で短く。入力が続く項目は末尾に「…」",
      "よく使う項目を上に置き、関係する項目を区切り線でまとめる",
      "コンテキストメニューの項目は、ツールバーなどメインの画面からも使えるようにする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/menus#Labels",
    refs: [
      { label: "Menus", url: "https://developer.apple.com/design/human-interface-guidelines/menus#Labels" },
      { label: "Menus ― Organization", url: "https://developer.apple.com/design/human-interface-guidelines/menus#Organization" },
      { label: "Context menus ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/context-menus#Best-practices" },
      { label: "Pull-down buttons ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/pull-down-buttons#Best-practices" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-10)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Menus",
    term: "Menu(ドロップダウンメニュー・エクスポーズドドロップダウンメニュー)",
    color: "#2F7D6E",
    position: <>ボタンなどで開く一時的な面に選択肢を並べる。<Hl>ドロップダウンメニューと、入力欄の形のエクスポーズドドロップダウンメニューの2種類</Hl></>,
    size: <><Hl>項目の高さは48dp、幅は112〜280dp</Hl>(Jetpack Compose)。角丸4dp(M3 Expressiveは16dp)。</>,
    colorInfo: "選んだ項目は背景の色(Secondary Container)で示す。",
    stance:
      "ラジオボタンの組より目立たず、場所を取らない。エクスポーズドドロップダウンメニューは選んだ値を表示し続け、文字を入力して候補を絞ることもできる(「セレクト(プルダウン)」ページ)。",
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility:
      "知覚可能・操作可能 ― 選んだ項目は形と色で示し、チェックマークも添える。押せる範囲は48×48dp以上。",
    useCases: [
      "項目は48dpの高さ、メニューは112〜280dpの幅にする",
      "先頭にアイコン、末尾にショートカットの文字を置ける",
      "選んだ値を見せ続けたいときは、エクスポーズドドロップダウンメニューを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/menus/guidelines",
    refs: [
      { label: "Menus", url: "https://m3.material.io/components/menus/guidelines" },
      { label: "MDC Android: Menus(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/Menu.md" },
      { label: "Compose Material 3: Menu.kt(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/Menu.kt" },
      { label: "Compose Material 3: MenuTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/MenuTokens.kt" },
    ],
    confirmedNote: "アクセシビリティはM3 Menusのページの本文(2026-11)、種類と構成はMaterial Components for Androidのドキュメント、寸法・色はJetpack Composeのソースで確認(2026-10)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "APG Menu and Menubar Pattern / Menu Button Pattern",
    term: "メニュー・メニューバー・メニュー項目(WAI-ARIAの役割)",
    color: "#A3821F",
    position: <>OSのメニューのように振る舞う選択肢の一覧の、<Hl>役割・状態とキーボード操作を定める</Hl>。メニューボタンで開く一時的なメニューと、常に出ているメニューバーを扱う</>,
    size: <><NoData>専用の数値基準なし</NoData>。項目には一般のターゲットサイズの基準(2.5.8・AA。例外あり)がかかる。</>,
    colorInfo: <NoData>記載なし</NoData>,
    glossary: [
      { term: "メニュー・メニュー項目", desc: "メニュー本体と、その中の項目の役割。オン/オフの項目と、1つだけ選ぶ項目は、それぞれの種類の項目として伝える。" },
      { term: "開くことを伝える", desc: "押すとメニューなどが開くことを、メニューボタンで支援技術に伝える。" },
      { term: "開閉の状態", desc: "メニューが開いているか閉じているかを支援技術に伝える。" },
    ],
    stance:
      <>メニューボタンは<Hl>メニューが開くことと、今開いているかを支援技術に伝える</Hl>。項目はメニュー項目として伝える。例外: 使えない項目もフォーカスでき、存在を知ることはできる。サイト内のリンク一覧は、開閉ボタンと普通のリンクの一覧で作るほうが合うことが多い(AI解釈)。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility:
      "操作可能(Operable)・堅牢(Robust) ― 2.1.1・4.1.2。",
    useCases: [
      "メニューボタンで、メニューが開くことと開閉の状態を伝える",
      "使えない項目もフォーカスできるようにし、実行だけできなくする",
    ],
    searchHint: "Disabled menu items are focusable",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#keyboard_interaction",
    refs: [
      { kind: "apg", label: "APG: Menubar Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#keyboard_interaction" },
      { kind: "apg", label: "APG: Menu and Menubar ― 役割と属性", url: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#roles_states_properties" },
      { kind: "apg", label: "APG: Menu Button Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/" },
      { kind: "apg", label: "APG: Disclosure Navigation Menuの例", url: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/" },
    ],
    confirmedNote: "APGのMenu and Menubar Pattern・Menu Button Patternの本文を直接取得して確認済み(2026-10)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Contextual Menus: Delivering Relevant Tools for Tasks / Dropdowns: Design Guidelines",
    term: "Contextual menu・Dropdown",
    color: "#7A4F7E",
    position: <>コンテキストメニューとドロップダウンの実務指針。<Hl>使えない項目は消さずに薄く表示する</Hl></>,
    size: <>コンテキストメニューは<Hl>10〜12項目未満</Hl>で、スクロールせずに全部見えるように。サブメニューは1階層まで。</>,
    colorInfo: "使えない項目を消すと位置が変わって覚えにくい。メニューがあることは三点や下向きの矢印で示し、歯車やハンバーガーは使わない。",
    stance:
      <>今の作業に直接関係する操作だけを、<Hl>よく使う順に上から並べる</Hl>。同じ命令をメインのメニューからも使えるようにする。入力した方が速い場合(国名・生年月日など)はドロップダウンにしない。サイトの主要なナビゲーションを隠さない。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility: "根拠となる原則 ― ユーザビリティテストの観察にもとづく設計の根拠。",
    useCases: [
      "コンテキストメニューは10〜12項目未満、よく使う順に並べる",
      "使えない項目は隠さずに薄く表示する",
      "三点や下向き矢印でメニューがあることを示し、同じ命令をメインのメニューにも置く",
    ],
    searchHint: "Show keyboard shortcuts in contextual menus",
    url: "https://www.nngroup.com/articles/contextual-menus/#toc-tips-for-effective-contextual-menus-3",
    refs: [
      { label: "Contextual Menus: Delivering Relevant Tools for Tasks", url: "https://www.nngroup.com/articles/contextual-menus/#toc-tips-for-effective-contextual-menus-3" },
      { label: "Dropdowns: Design Guidelines", url: "https://www.nngroup.com/articles/drop-down-menus/#toc-guidelines-for-dropdown-design-1" },
    ],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-10)。ページ内検索の語は1本目の記事(Contextual Menus)のもの。",
  },
];
markNeg(SOURCES);

/* 画像エリア: メニューの構成(概念図) */
function MenuSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const items = [
    { t: "コピー", k: "⌘C", icon: true },
    { t: "貼り付け", k: "⌘V", icon: true },
    { sep: true },
    { t: "名前を変更…", k: "", icon: true },
    { t: "並べ替え", k: "›", icon: true },
    { t: "印刷", k: "", icon: true, disabled: true },
    { sep: true },
    { t: "削除", k: "", icon: true, danger: true },
  ];
  let y = 46;
  return (
    <svg viewBox="0 0 360 236" width="100%" style={{ maxWidth: 440, display: "block", margin: "0 auto" }} role="img" aria-label="メニューの構成の例">
      <rect x="20" y="8" width="92" height="28" rx="6" fill="#FFFFFF" stroke="#9EA4C4" />
      <text x="36" y="26" fontSize="10" fill="#171B36" fontFamily={font}>操作</text>
      <text x="96" y="26" fontSize="9" fill="#565D8A" textAnchor="middle" fontFamily={font}>▾</text>
      <rect x="20" y="40" width="190" height="186" rx="6" fill="#FFFFFF" stroke="#D5D9EC" style={{ filter: "drop-shadow(0 2px 4px rgba(23,27,54,0.14))" }} />
      {items.map((it, i) => {
        if (it.sep) { const ly = y + 4; y += 8; return <line key={i} x1="20" x2="210" y1={ly} y2={ly} stroke="#E1E3F0" />; }
        const cy = y; y += 24;
        const col = it.danger ? "#C0503F" : it.disabled ? "#B7BCDA" : "#171B36";
        return (
          <g key={i}>
            {i === 0 && <rect x="22" y={cy} width="186" height="24" fill="#EEF1FA" />}
            <rect x="32" y={cy + 7} width="10" height="10" rx="2" fill="none" stroke={col} strokeWidth="1.3" />
            <text x="52" y={cy + 16} fontSize="10" fill={col} fontFamily={font}>{it.t}</text>
            {it.k && <text x="198" y={cy + 16} fontSize="9" fill={it.k === "›" ? "#565D8A" : "#7E86AC"} textAnchor="end" fontFamily={mono}>{it.k}</text>}
          </g>
        );
      })}
      <g fontFamily={font} fontSize="8.5" fill="#565D8A">
        <text x="222" y="60">← よく使う項目を上に</text>
        <text x="222" y="98">← 区切り線でグループ</text>
        <text x="222" y="118">← 「…」は入力が続く</text>
        <text x="222" y="142">← 「›」はサブメニュー</text>
        <text x="222" y="166">← 使えない項目</text>
        <text x="222" y="200">← 破壊的な項目は最後</text>
        <text x="222" y="24">← 開くこと・開閉の状態を伝える</text>
      </g>
    </svg>
  );
}

/* 四系列比較図: 何を定めているか(◯=明記/△=部分的・条件付き/―=記載なし) */
const MENU_ROWS = [
  {
    label: "ラベル",
    cells: [
      { mark: "◯", note: "動詞で短く。入力が続くなら「…」" },
      { mark: "△", note: "構成要素として末尾の文字(ショートカット)を持つ" },
      { mark: "◯", note: "ダイアログを開く項目に「…」の慣習" },
      { mark: "◯", note: "関係する命令は一式そろえる" },
    ],
  },
  {
    label: "並べ方",
    cells: [
      { mark: "◯", note: "よく使う項目を上。関係する項目を区切り線でまとめる" },
      { mark: "△", note: "区切り線を構成要素に持つ" },
      { mark: "―", note: "区切り線はフォーカスしない" },
      { mark: "◯", note: "よく使う順に上から" },
    ],
  },
  {
    label: "長さ・階層",
    cells: [
      { mark: "◯", note: "サブメニューは1階層、約5項目まで。グループは約3つ" },
      { mark: "◯", note: "項目48dp・幅112〜280dp" },
      { mark: "―", note: "" },
      { mark: "◯", note: "10〜12項目未満。サブメニューは1階層" },
    ],
  },
  {
    label: "使えない項目",
    cells: [
      { mark: "◯", note: "通常のメニューは薄く表示、コンテキストメニューは隠す" },
      { mark: "―", note: "" },
      { mark: "◯", note: "フォーカスはできるが実行できない" },
      { mark: "◯", note: "隠さず薄く表示する" },
    ],
  },
  {
    label: "ショートカットの表示",
    cells: [
      { mark: "◯", note: "メインのメニューに表示。コンテキストメニューには出さない" },
      { mark: "△", note: "末尾の文字として表示できる" },
      { mark: "―", note: "" },
      { mark: "◯", note: "コンテキストメニューにも表示して覚えてもらう" },
    ],
  },
  {
    label: "破壊的な項目(取り消せない、またはデータを失う操作。削除など)",
    cells: [
      { mark: "◯", note: "最後に置き、赤い文字。プルダウンでは確認も" },
      { mark: "―", note: "" },
      { mark: "―", note: "" },
      { mark: "―", note: "" },
    ],
  },
  {
    label: "キーボード操作",
    cells: [
      { mark: "△", note: "メニューの項目にショートカットを表示" },
      { mark: "―", note: "" },
      { mark: "◯", note: "矢印で移動・Enterで実行・Escで閉じてボタンへ戻る" },
      { mark: "◯", note: "文字を打って項目へ移れるように" },
    ],
  },
  {
    label: "隠れたメニューの扱い",
    cells: [
      { mark: "◯", note: "コンテキストメニューの項目はメインの画面にも" },
      { mark: "―", note: "" },
      { mark: "◯", note: "メニューが開くことを伝える" },
      { mark: "◯", note: "三点・下向き矢印で示す。メインのメニューにも" },
    ],
  },
];

const MARK_COLORS = { "◯": "#2E6B3A", "△": "#8A6A10", "―": "#666D93" };

function RuleMatrix() {
  const names = ["Apple", "Google", "W3C", "NN group"];
  const colors = ["#C2542A", "#2F7D6E", "#A3821F", "#7A4F7E"];
  return (
    <div style={styles.ruleScroll}>
      <div style={styles.ruleGrid}>
        <div style={styles.ruleHead}>観点</div>
        {names.map((n, i) => (<div key={n} style={{ ...styles.ruleHead, color: colors[i] }}>{n}</div>))}
        {MENU_ROWS.map((r) => (
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

/* 意見が分かれる点 */
function MiniMenu({ mode }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const rows = mode === "hide" ? ["コピー", "貼り付け"] : ["コピー", "貼り付け", "印刷"];
  return (
    <svg viewBox="0 0 120 84" width="120" height="84" aria-hidden="true">
      <rect x="2" y="2" width="116" height={8 + rows.length * 22} rx="5" fill="#FFFFFF" stroke="#D5D9EC" />
      {rows.map((r, i) => {
        const dim = r === "印刷" && mode === "dim";
        return (
          <g key={r}>
            <text x="12" y={20 + i * 22} fontSize="10" fill={dim ? "#B7BCDA" : "#171B36"} fontFamily={font}>{r}</text>
            {mode === "shortcut" && <text x="110" y={20 + i * 22} fontSize="9" fill="#666D93" textAnchor="end" fontFamily="'IBM Plex Mono', monospace">{["⌘C", "⌘V", "⌘P"][i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

const SPLITS = [
  {
    q: "使えない項目は、隠す?薄く表示する?",
    sides: [
      { figure: <MiniMenu mode="hide" />, who: "Apple(コンテキストメニュー)", color: "#C2542A", t: "隠す。今の対象に関係する操作だけを見せるため(通常のメニューでは薄く表示)" },
      { figure: <MiniMenu mode="dim" />, who: "NN group・W3C", color: "#7A4F7E", t: "薄く表示する。消すと位置が変わって覚えにくい(NN)。フォーカスはできるが実行できない(W3C)" },
    ],
    tip: "コンテキストメニューでは隠し、通常のメニュー・メニューバーでは薄く表示する、というAppleの使い分けが両方の考え方に沿いやすい。ただし、隠すと「どうすれば使えるか」が分からなくなるため、隠した操作はメインの画面からたどれるようにする。",
  },
  {
    q: "コンテキストメニューに、キーボードショートカットを表示する?",
    sides: [
      { figure: <MiniMenu mode="plain" />, who: "Apple", color: "#C2542A", t: "表示しない。コンテキストメニュー自体が近道なので重複する。ショートカットはメインのメニューに" },
      { figure: <MiniMenu mode="shortcut" />, who: "NN group", color: "#7A4F7E", t: "表示する。繰り返し見るうちにショートカットを覚えてもらえる" },
    ],
    tip: "Appleのプラットフォームでは、ショートカットはメニューバー(メインのメニュー)で必ず見つかるようにすれば、コンテキストメニューで省いても覚える機会は残る。Webや他のOSでメインのメニューがない場合は、NN groupの勧めに沿って表示する方が親切。",
  },
];

/* メニューの種類と使い分け(Apple・Google・NN group) */
const KINDS = [
  { name: "プルダウンボタン/ドロップダウンメニュー", use: "ボタンの操作に関係する命令を選ぶ(「追加」で追加するものを選ぶ、「並べ替え」で基準を選ぶ)", who: "Apple・Google・NN group" },
  { name: "コンテキストメニュー", use: "選んだ対象・場所に関係する、よく使う少数の操作。長押し・右クリック・副ボタンで開く", who: "Apple・Google・NN group" },
  { name: "メニューバー", use: "アプリのすべての命令を常に並べる(macOS・iPadOS)。ショートカットを表示する場所", who: "Apple・W3C(メニューバー)" },
  { name: "ポップアップボタン/エクスポーズドドロップダウン", use: "命令ではなく、排他的な選択肢から値を選ぶ。選んだ値を表示し続ける(→「セレクト」ページ)", who: "Apple・Google" },
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

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "ボタンなどを押すと開き、その場で実行できる操作(コピー・削除など)の一覧を見せるコンポーネント(サイトのナビゲーションやフォームの値選びとは別)";
const ABOUT = [
  { k: "目的・役割", v: "画面に常に置くほどではない操作を、必要なときだけ一覧で出す" },
  { k: "よく使われる場面", v: "「…」ボタンのその他の操作、右クリックのメニュー、アプリのメニューバー" },
  { k: "似たコンポーネント", v: <>値を選んで表示し続けるなら<PageLink to="/components/selection/select">セレクト(プルダウン)</PageLink></> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "命令を選ぶならメニュー、値を選ぶならセレクト", d: "", who: "Apple(プルダウンボタンは命令、ポップアップボタンは選択肢)" },
  { n: 2, t: "よく使う項目を上に置く", d: "", who: "Apple・NN group" },
  { n: 3, t: "メニューの項目を増やしすぎない", d: "サブメニューは約5項目まで(Apple)、コンテキストメニューは10〜12項目未満(NN group)", who: "Apple・NN group" },
  { n: 4, t: "キーボードで操作できるようにする", d: "", who: "W3C" },
];

export default function SelectionMenuPage() {
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
        <SidebarNav currentPath="/components/selection/menu" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / メニュー</span>
            <span>SPEC No. 059</span>
          </div>

          <h1 style={styles.title}>メニュー(ドロップダウン・コンテキストメニュー)</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ(メニューの構成)"
            image={<><MenuSwatch /></>}
            imageNote={<>ボタンを押すと開くメニューの概念図だ。値を選んで表示し続けるセレクト(プルダウン)は「セレクト」ページで扱い、このページは命令(操作)の一覧を扱う。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>メニューの種類と使い分け</h2>
            <p style={styles.diagramNote}>命令を選ぶのか、値を選ぶのかでコンポーネントが変わる。下の名前は根拠にした系列だ。</p>
            <div style={styles.kindGrid}>
              {KINDS.map((k) => (
                <div key={k.name} style={styles.kindCard}>
                  <div style={styles.kindName}>{k.name}</div>
                  <div style={styles.kindUse}>{k.use}</div>
                  <div style={styles.kindWho}>{k.who}</div>
                </div>
              ))}
            </div>
          </section>

          <SplitSection splits={SPLITS} />



          <div style={{ marginBottom: 22 }}>
            <h2 style={styles.diagramTitle}>四系列比較図 ― 何を定めているか</h2>
            <RuleMatrix />
            <p style={styles.chartNote}>◯=明記されている、△=部分的・条件付き、―=記載なし。Googleは寸法と構成要素を、W3Cは役割とキーボード操作を中心に定めている。</p>
          </div>

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              並べ方は、<strong>よく使う項目を上に置き、項目を増やしすぎない</strong>(Apple・NN group)。目安は、Appleがサブメニュー約5項目まで、NN groupがコンテキストメニュー10〜12項目未満だ。Googleは<strong>寸法(項目の高さ48dp・幅112〜280dp)</strong>と、関係する項目をまとめる区切り線を決める。W3Cは見た目ではなく、キーボード操作と、開閉の状態などの役割・状態を伝えることを定める。
            </p>
            <p style={styles.synthesisText}>
              <strong>使えない項目を隠すか薄く出すか、コンテキストメニューにショートカットを出すかは、AppleとNN groupで答えが逆だ</strong>(上の「意見が分かれる点」)。一方で両者は、コンテキストメニューは最初は隠れていて気づかれにくいので、<strong>同じ命令をメインの画面からも使えるようにする</strong>点で一致する。
            </p>
            <p style={styles.synthesisText}>
              <strong>実務では、並べ方はApple・NN group、寸法はGoogle、役割と状態はW3Cにそろえる</strong>。隠すか薄くするか・ショートカットを出すかは、メインのメニューがあるかで決める(AI解釈)。
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
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="長さ・大きさ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="ラベル・項目の見せ方">{s.colorInfo}</InfoBox>
                <div style={styles.sourceStance}>{s.stance}</div>
                {hasRow(SOURCES, "exceptions") && <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>}
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
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>長さ・大きさ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>ラベル・項目の見せ方</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                {hasRow(SOURCES, "exceptions") && (<>
                  <div style={styles.labelCell}>例外・許容ケース</div>
                  {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
                </>)}
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




          <RelatedPages paths={["/components/selection/select", "/components/actions/button", "/components/containment/overview", "/components/containment/bottom-sheet"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["段階的に見せる", "見つけやすさ・初めての案内"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6, textAlign: "left" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#666D93", margin: "10px 0 0", lineHeight: 1.6 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  ruleSection: { marginBottom: 26 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#666D93", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  confirmedNoteSmall: { fontSize: 9.5, color: "#666D93", lineHeight: 1.5, fontStyle: "italic", marginTop: 4 },
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
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#666D93" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  ruleScroll: { overflowX: "auto" },
  ruleGrid: { display: "grid", gridTemplateColumns: "120px repeat(4, minmax(120px, 1fr))", minWidth: 640, border: "1px solid #E1E3F0", borderRadius: 4 },
  ruleHead: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#FFFFFF" },
  ruleLabel: { fontSize: 11, color: "#454C78", fontWeight: 600, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", lineHeight: 1.5 },
  ruleCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 2 },
  ruleMark: { fontSize: 15, fontWeight: 700, lineHeight: 1.1 },
  ruleNote: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5 },
  splitCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", background: "#FFFFFF" },
  splitQ: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 8 },
  splitRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 10 },
  splitSide: { display: "flex", gap: 10, alignItems: "flex-start", background: "#F8F9FD", borderRadius: 4, padding: "8px 10px" },
  splitWho: { fontSize: 11.5, fontWeight: 700 },
  splitText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 2 },
  splitTip: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", background: "#FAFCEE", borderLeft: "3px solid #5A9629", padding: "6px 10px", marginTop: 10, borderRadius: "0 3px 3px 0" },
  kindGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10 },
  kindCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  kindName: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  kindUse: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 4 },
  kindWho: { fontSize: 9.5, color: "#666D93", marginTop: 5 },
};
