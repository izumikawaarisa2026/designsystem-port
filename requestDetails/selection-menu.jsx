import React from "react";
import SidebarNav from "./sidebar-nav";

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
    color: "#C2542A",
    position: "メニュー全般のラベル・並べ方の指針に加え、プルダウンボタン(ボタンの操作に関係する命令)・ポップアップボタン(排他的な選択肢)・コンテキストメニュー(今の対象によく使う操作)を使い分ける",
    size: "サブメニューは1階層までにし、項目が約5個を超えるなら別のメニューにします。コンテキストメニューは項目を少なくし、区切り線で分けるグループは約3つまで。プルダウンボタンは3項目以上にします(1〜2項目ならボタンやスイッチで足りる)。iOSのメニューには、上に4つのアイコンだけを並べるsmall、3つのアイコン+短いラベルのmedium、全部をリストで見せるlarge(既定)のレイアウトがあります。",
    colorInfo: "ラベルは何をするかを動詞で短く書きます。実行する前にさらに入力や選択が必要な項目は、末尾に「…」を付けます。使えない項目は、通常のメニューでは薄く表示し(全部使えなくてもメニュー自体は開けるようにする)、コンテキストメニューでは薄くせずに隠します。アイコンは同じグループの項目すべてに付けるか、どれにも付けないかにそろえます。",
    stance:
      "人はメニューを上から読むため、重要な項目・よく使う項目を先頭に置きます。コピー・カット・ペーストのように論理的に関係する項目はグループにまとめ、区切り線で分けます。長すぎるメニューは読む負担が大きく、目的の項目を見落とすため、分けるかサブメニューを使います(履歴やブックマークのように利用者が増やしていくメニューは長くてよい)。オン/オフの項目は、状態に合わせてラベルを変える(「地図を表示」⇔「地図を隠す」)か、チェックマークで示します(ページ本文を直接確認、2026-10)。",
    exceptions:
      "コンテキストメニューは最初は隠れていて気づかれないことがあるため、同じ項目を必ずメインの画面(ツールバー、macOSならメニューバー)からも使えるようにします。キーボードショートカットはメインのメニューに表示し、コンテキストメニューには表示しません(それ自体が近道のため重複する)。削除など破壊的な項目はコンテキストメニューの最後に置き、赤い文字で示します(iOS・iPadOS・visionOS)。メニューが対象の上下どちらに開くかに合わせて、よく使う項目が指やポインタの近くに来るよう並びを逆にすることもあります。",
    accessibility:
      "―(これらのページに専用のアクセシビリティの記載はありません)。使えない項目があってもメニュー自体は開けるようにし、どんな命令があるかを知れるようにする点は、分かりやすさ(理解可能)に関わります。",
    useCases: [
      "ラベルは動詞で短く。入力が続く項目は末尾に「…」",
      "よく使う項目を上に置き、関係する項目を区切り線でまとめる",
      "コンテキストメニューの項目は、ツールバーなどメインの画面からも使えるようにする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/menus#Labels",
    urlSecondary: [
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
    color: "#2F7D6E",
    position: "一時的な面に選択肢の一覧を出す部品。ボタンや操作をきっかけに現れ、ラジオボタンの組より場所を取らない。ドロップダウンメニューと、入力欄の形をしたエクスポーズドドロップダウンメニューの2種類",
    size: "項目の高さは48dp、メニューの幅は112〜280dp、項目の左右の余白は12dp、メニューの上下の余白は8dp(Jetpack Compose)。容器の角丸はExtra small(4dp)、影の高さはLevel 2(3dp)です。",
    colorInfo: "構成は、項目・先頭のアイコン・末尾のアイコン・末尾の文字(ショートカットなど)・容器・区切り線です。容器の色はSurface Container、項目の文字はBody Large。選んだ状態の項目は、Secondary Containerの背景で示します(Jetpack Composeのトークン定義)。",
    stance:
      "メニューは、ボタン・操作・ほかの部品を操作したときに現れ、複数の選択肢から選ばせるものです。ラジオボタンの組のような選択の部品より目立たず、場所を取らないとしています。ポップアップ・コンテキスト・オーバーフロー(…で開くメニュー)のそれぞれにスタイルが用意されています(Material Components for Androidのドキュメントで直接確認、2026-10)。",
    exceptions:
      "エクスポーズドドロップダウンメニューは入力欄の形で、選んだ値を表示し続けます。既定では文字を入力して候補を絞ることもでき、入力させずに選ぶだけの形にもできます。値を選ぶ用途は「セレクト(プルダウン)」ページも参照してください。",
    accessibility:
      "―(確認したGoogle公式のドキュメントには、メニュー専用のアクセシビリティの記載は見当たりませんでした)。M3のAccessibilityのページ(m3.material.io)はSPAのため本文を確認できていません。項目の高さ48dpは、押せる範囲の最小(48dp)と同じ値です。",
    useCases: [
      "項目は48dpの高さ、メニューは112〜280dpの幅にする",
      "先頭にアイコン、末尾にショートカットの文字を置ける",
      "選んだ値を見せ続けたいときは、エクスポーズドドロップダウンメニューを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/menus/guidelines",
    urlSecondary: [
      { label: "MDC Android: Menus(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/Menu.md" },
      { label: "Compose Material 3: Menu.kt(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/Menu.kt" },
      { label: "Compose Material 3: MenuTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/MenuTokens.kt" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。種類と構成はMaterial Components for Androidのドキュメント、寸法・色はJetpack Composeのソースで直接確認(2026-10)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "APG Menu and Menubar Pattern / Menu Button Pattern",
    color: "#A3821F",
    position: "OSのメニューのように振る舞う「選択肢の一覧」の部品について、役割・状態とキーボード操作を定める。メニューボタンで開く一時的なmenuと、常に表示されるmenubarを扱う",
    size: "メニュー専用の数値基準はありません。項目を押す範囲には、一般的なターゲットサイズの基準(2.5.8・レベルAA、24×24 CSSピクセル)が当てはまります。",
    colorInfo: "メニューが開いたら最初の項目にフォーカスを置きます。上下の矢印キーで項目の間を移動し(メニューバーでは左右)、Enterで実行して閉じます。Escで閉じて、開いたボタンにフォーカスを戻します。Home・Endで最初・最後へ、文字キーでその文字で始まる項目へ移れるようにもできます。Tab・Shift+Tabは項目の間を移動せず、メニューの外へ出てすべて閉じます。",
    glossary: [
      { term: "menu・menuitem", desc: "メニュー本体と、その中の項目の役割。オン/オフの項目はmenuitemcheckbox、1つだけ選ぶ項目はmenuitemradioを使う。" },
      { term: "aria-haspopup", desc: "その要素を押すとメニューなどが開くことを伝える属性。メニューボタンにはmenu(またはtrue)を設定する。" },
      { term: "aria-expanded", desc: "メニューが開いているかどうかを伝える属性。開いている間はtrue、閉じているときはfalse。" },
    ],
    stance:
      "メニューボタンはrole=\"button\"にaria-haspopup=\"menu\"(またはtrue)を付け、メニューが開いている間はaria-expanded=\"true\"にします。開いたメニューにはrole=\"menu\"、項目にはmenuitem・menuitemcheckbox・menuitemradioを使います。メニューは項目をまとめた1つの部品として扱うため、中の移動はTabではなく矢印キーで行います。ダイアログを開く項目のラベルの末尾に「…」を付ける慣習も紹介しています(APGの本文を直接確認、2026-10)。",
    exceptions:
      "使えない項目はフォーカスできるが実行はできない、としています(フォーカスを当てて存在を知ることはできる)。区切り線はフォーカスしません。チェックボックスやラジオの項目は、メニューを閉じずに状態を変えてもかまいません。メニューバーに再びフォーカスが入ったときは、前にフォーカスしていた項目に戻してもよいとしています。",
    accessibility:
      "操作可能(Operable)・堅牢(Robust) ― 矢印・Enter・Escでの操作は「操作可能」(2.1.1)、役割と開閉の状態を支援技術に伝えることは「堅牢」(4.1.2)に関わります。",
    useCases: [
      "メニューボタンにaria-haspopupと、開閉に合わせたaria-expandedを付ける",
      "開いたら最初の項目にフォーカスし、矢印キーで移動・Escで閉じてボタンに戻す",
      "使えない項目もフォーカスできるようにし、実行だけできなくする",
    ],
    searchHint: "Disabled menu items are focusable",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#keyboard_interaction",
    urlSecondary: [
      { label: "APG: Menu and Menubar ― 役割と属性", url: "https://www.w3.org/WAI/ARIA/apg/patterns/menubar/#roles_states_properties" },
      { label: "APG: Menu Button Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/" },
    ],
    confirmedNote: "APGのMenu and Menubar Pattern・Menu Button Patternの本文を直接取得して確認済み(2026-10)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Contextual Menus: Delivering Relevant Tools for Tasks / Dropdowns: Design Guidelines",
    color: "#7A4F7E",
    position: "対象に関係する少数の操作を出すコンテキストメニューと、命令・移動・入力・属性の選択に使われるドロップダウンについての実務指針(適合基準ではない)",
    size: "コンテキストメニューの項目は10〜12個未満にし、スクロールせずに全部見えるようにします。サブメニューを使うなら、その中からさらにサブメニューを開かない(1階層まで)ようにします。",
    colorInfo: "使えない項目は消さずに薄く表示します。消すと項目の位置が変わって覚えにくく、どこへ行ったのか、どうすれば出てくるのかを探させてしまうためです。関係する命令は一式そろえて載せます(「戻る」があれば「進む」も)。コンテキストメニューがあることは、縦・横の三点や下向きの矢印のボタンで示し、歯車やハンバーガーのアイコンは全体の設定やメニューと誤解されるため使いません。",
    stance:
      "コンテキストメニューには、今の作業や選んだ要素に直接関係する操作だけを載せ、よく使う順に上から並べます。隠れていて気づかれないことがあるため、同じ命令をメインのメニューからも使えるようにします。キーボードショートカットを表示して、繰り返し見るうちに覚えてもらうよう勧めています(記事本文を直接取得して確認、2026-10)。",
    exceptions:
      "ドロップダウンは、スクロールが必要なほど長いリストを避け、入力した方が速い場合(州・国の名前、生年月日など)には使いません。開いている間もラベルが見えるようにします。デスクトップでは、サイトの主要なナビゲーションをドロップダウンの中に隠しません。ほかのメニューの選択によって中身が変わるメニューも避けます。キーボードで文字を打って項目に移れるようにします。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、ユーザビリティテストの観察に基づく設計上の根拠です。キーボードでの移動を支えることは、目の見えない人の使いやすさにもつながるとしています。",
    useCases: [
      "コンテキストメニューは10〜12項目未満、よく使う順に並べる",
      "使えない項目は隠さずに薄く表示する",
      "三点や下向き矢印でメニューがあることを示し、同じ命令をメインのメニューにも置く",
    ],
    searchHint: "Show keyboard shortcuts in contextual menus",
    url: "https://www.nngroup.com/articles/contextual-menus/#toc-tips-for-effective-contextual-menus-3",
    urlSecondary: [
      { label: "Dropdowns: Design Guidelines", url: "https://www.nngroup.com/articles/drop-down-menus/#toc-guidelines-for-dropdown-design-1" },
    ],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-10)。ページ内検索の語は1本目の記事(Contextual Menus)のものです。",
  },
];

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
        <text x="222" y="24">← aria-haspopup / expanded</text>
      </g>
    </svg>
  );
}

/* 四サイト比較図: 何を定めているか(◯=明記/△=部分的・条件付き/―=確認した範囲で記載なし) */
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
    label: "破壊的な項目",
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
      { mark: "◯", note: "aria-haspopupで開くことを伝える" },
      { mark: "◯", note: "三点・下向き矢印で示す。メインのメニューにも" },
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

/* 意見が分かれる2点 */
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
            {mode === "shortcut" && <text x="110" y={20 + i * 22} fontSize="9" fill="#7E86AC" textAnchor="end" fontFamily="'IBM Plex Mono', monospace">{["⌘C", "⌘V", "⌘P"][i]}</text>}
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
      { mode: "hide", who: "Apple(コンテキストメニュー)", color: "#C2542A", t: "隠す。今の対象に関係する操作だけを見せるため(通常のメニューでは薄く表示)" },
      { mode: "dim", who: "NN group・W3C", color: "#7A4F7E", t: "薄く表示する。消すと位置が変わって覚えにくい(NN)。フォーカスはできるが実行できない(W3C)" },
    ],
    tip: "コンテキストメニューでは隠し、通常のメニュー・メニューバーでは薄く表示する、というAppleの使い分けが両方の考え方に沿いやすい。ただし、隠すと「どうすれば使えるか」が分からなくなるため、隠した操作はメインの画面からたどれるようにする。",
  },
  {
    q: "コンテキストメニューに、キーボードショートカットを表示する?",
    sides: [
      { mode: "plain", who: "Apple", color: "#C2542A", t: "表示しない。コンテキストメニュー自体が近道なので重複する。ショートカットはメインのメニューに" },
      { mode: "shortcut", who: "NN group", color: "#7A4F7E", t: "表示する。繰り返し見るうちにショートカットを覚えてもらえる" },
    ],
    tip: "Appleのプラットフォームでは、ショートカットはメニューバー(メインのメニュー)で必ず見つかるようにすれば、コンテキストメニューで省いても覚える機会は残る。Webや他のOSでメインのメニューがない場合は、NN groupの勧めに沿って表示する方が親切。",
  },
];

function SplitCards() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {SPLITS.map((s) => (
        <div key={s.q} style={styles.splitCard}>
          <div style={styles.splitQ}>{s.q}</div>
          <div style={styles.splitRow}>
            {s.sides.map((side) => (
              <div key={side.who} style={styles.splitSide}>
                <MiniMenu mode={side.mode} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ ...styles.splitWho, color: side.color }}>{side.who}</div>
                  <div style={styles.splitText}>{side.t}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.splitTip}><strong>AI解釈: </strong>{s.tip}</div>
        </div>
      ))}
    </div>
  );
}

/* メニューの種類と使い分け(Apple・Google・NN group) */
const KINDS = [
  { name: "プルダウンボタン/ドロップダウンメニュー", use: "ボタンの操作に関係する命令を選ぶ(「追加」で追加するものを選ぶ、「並べ替え」で基準を選ぶ)", who: "Apple・Google・NN group" },
  { name: "コンテキストメニュー", use: "選んだ対象・場所に関係する、よく使う少数の操作。長押し・右クリック・副ボタンで開く", who: "Apple・Google・NN group" },
  { name: "メニューバー", use: "アプリのすべての命令を常に並べる(macOS・iPadOS)。ショートカットを表示する場所", who: "Apple・W3C(menubar)" },
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

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
          <p style={styles.subtitle}>4つのガイドラインが、操作の一覧を出すメニューのラベル・並べ方・長さ・使えない項目・キーボード操作をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(メニューの構成)</span>
            <MenuSwatch />
            <p style={styles.swatchNote}>ボタンを押すと開くメニューの概念図です。値を選んで表示し続けるセレクト(プルダウン)は「セレクト」ページで扱い、このページは命令(操作)の一覧を扱います。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列がそろって一致しているのは、<strong>よく使う項目を上に置き、関係する項目は区切り線でまとめ、サブメニューは1階層まで</strong>という並べ方です。Appleはサブメニューを約5項目まで、NN groupはコンテキストメニューを10〜12項目未満とし、Googleは項目の高さ48dp・幅112〜280dpという寸法を決めています。
            </p>
            <p style={styles.synthesisText}>
              一方で、<strong>2点ではっきり意見が分かれます</strong>。1つは使えない項目の扱いで、Appleは<strong>コンテキストメニューでは隠す</strong>とし、NN groupは<strong>隠さず薄く表示する</strong>よう勧め、W3Cは<strong>使えない項目もフォーカスできるように</strong>します。もう1つはキーボードショートカットで、Appleは<strong>コンテキストメニューには表示しない</strong>、NN groupは<strong>表示して覚えてもらう</strong>としています(下の「意見が分かれる2点」を参照)。
            </p>
            <p style={styles.synthesisText}>
              W3Cは見た目ではなく、<strong>開いたら最初の項目にフォーカス・矢印で移動・Enterで実行・Escで閉じてボタンへ戻る</strong>というキーボード操作と、<strong>aria-haspopup・aria-expanded</strong>で開閉を伝えることを定めています。
            </p>
            <p style={styles.synthesisText}>
              また、AppleとNN groupは、コンテキストメニューが<strong>最初は隠れていて気づかれない</strong>点でも一致しており、<strong>同じ命令をメインの画面からも使えるようにする</strong>ことを求めています。実務では、<strong>並べ方と寸法を4系列の共通点でそろえ、キーボード操作はW3Cの通りに作り、隠す/薄くする・ショートカットの表示は「メインのメニューがあるか」で決める</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 何を定めているか</h2>
            <RuleMatrix />
            <p style={styles.chartNote}>◯=明記されている、△=部分的・条件付き、―=確認した範囲では記載なし。Googleは寸法と構成要素を、W3Cは役割とキーボード操作を中心に定めています。</p>
          </div>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>意見が分かれる2点</h2>
            <p style={styles.diagramNote}>同じ問いに対して、系列によって答えが逆になっている点です。左右の図は概念図です。</p>
            <SplitCards />
          </section>

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
                <InfoBox label="長さ・大きさ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="ラベル・項目の見せ方">{s.colorInfo}</InfoBox>
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
            <h2 style={styles.diagramTitle}>メニュー デザインシステム比較</h2>
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
                <div style={styles.labelCell}>長さ・大きさ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>ラベル・項目の見せ方</div>
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
            <h2 style={styles.diagramTitle}>メニューの種類と使い分け</h2>
            <p style={styles.diagramNote}>命令を選ぶのか、値を選ぶのかで部品が変わります。下の名前は根拠にした系列です。</p>
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

          <div style={styles.linksRow}>
            <a href="/components/selection/select" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>セレクト(プルダウン) ↗</div>
              <div style={styles.linkCardDesc}>値を選んで表示し続ける部品の比較はこちら</div>
            </a>
            <a href="/tokens/keyboard-navigation" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>キーボードナビゲーション ↗</div>
              <div style={styles.linkCardDesc}>Tabと矢印キーの役割分担・ショートカットのルールはこちら</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["段階的に見せる", "見つけやすさ・初めての案内"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、Google公式のドキュメント・ソースで確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Menusページの「Labels」見出しへのアンカー付きリンクで、Organization・Context menus・Pull-down buttonsの見出しも併記しています。GoogleはM3のMenusのGuidelinesページに加え、内容を確認したGitHub上の公式ドキュメント・ソースを併記しています。W3CはAPGのMenu and Menubar Patternのキーボード操作の節を基本リンクとし、役割と属性の節・Menu Button Patternも併記しています。NN groupはContextual Menusの記事のヒントの節と、Dropdownsの記事のガイドラインの節です。
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
  kindWho: { fontSize: 9.5, color: "#7E86AC", marginTop: 5 },
};
