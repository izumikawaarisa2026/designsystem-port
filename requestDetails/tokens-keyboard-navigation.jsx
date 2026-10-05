import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「キーボードナビゲーション・フォーカス順序」ページ。
 *
 * このページの発見: 4系列とも「Tab(Shift+Tab)で部品やまとまりの間を、矢印キーでまとまりの中を移動する」
 * という役割分担で一致している(Appleのフォーカスグループ、GoogleのTab=1次元・矢印=2次元、W3CのAPG、
 * NN groupのドロップダウンの例)。フォーカスの順番は読む順(上から下、行の始まりから終わり)が基本。
 * 違いが出るのは「誰がどこまで面倒を見るか」で、Appleはフルキーボードアクセスがボタンなどの操作部品を
 * 受け持ち、アプリはリストや入力欄の内容要素に対応すればよいとする。W3Cは全機能をキーボードで使えること
 * (2.1.1)、閉じ込めないこと(2.1.2)、順番(2.4.3)、見えること(2.4.7)、繰り返しを飛ばせること(2.4.1)を
 * 求め、NN groupはスキップリンクとフォーカス表示を消さないことを勧める。
 * フォーカスの見た目の数値(2.4.13の2px・3:1、Googleの重ね色10%)は「インタラクション状態」ページで扱う。
 *
 * Apple(HIG Keyboards・Focus and selection)はHIGのページデータ(JSON)を直接取得して確認(2026-10)。
 * Google(Focus in Compose・Focus traversal order・Input compatibility on large screens)はAndroid Developersの
 * 本文を直接確認(2026-10)。W3C(2.1.1・2.1.2・2.1.4・2.4.1・2.4.3・2.4.7、APG Developing a Keyboard Interface)・
 * NN group(Keyboard-Only Navigation for Improved Accessibility)は本文を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Keyboards / Focus and selection",
    color: "#C2542A",
    position: "「フルキーボードアクセス」で画面のすべての部品に届くようにし、アプリはリスト・入力欄などの内容要素のフォーカスに対応する方式。標準のショートカットを守ることを重視する",
    size: "iPadOSでは、Tabキーで「フォーカスグループ」(サイドバー・グリッド・リストなどの区画)の間を移動し、矢印キーで同じグループの中を移動します。Tabで巡る順番は読む順(行の始まりから終わり、上から下)。macOSでは、Shift-Tabで逆順、Control-Tabで次のコントロールのまとまり、Control-F2でメニューバー、Control-F5でツールバーへ移動し、Escで今の操作を取り消します。tvOSは、リモコンの方向操作で画面のすべての要素に届くようにします。",
    colorInfo: "入力欄・検索欄にはフォーカスリング(halo)、リストやコレクションには行全体のハイライトを使い分けます。iPadOS・macOSでは、フォーカスした行をアプリのアクセントカラーの背景と白い文字で表示します。独自のフォーカス効果は本当に必要な場合だけにし、システムの効果を使うよう求めています。iOSとwatchOSにはフォーカスの仕組みがありません。",
    stance:
      "利用者の操作なしにフォーカスを動かさないよう求めています。フォーカスは今どこにいるかを知る手がかりで、勝手に動くと探し直す手間がかかるためです。ただし、キーボードやリモコンで1歩ずつ移動している最中にフォーカスしていた項目が消えた場合は、近くの項目へ移してよいとしています。グループにフォーカスが入ったときは、最もよく使われる項目に自動でフォーカスが当たるよう優先度を設定できます(ページ本文を直接確認、2026-10)。",
    exceptions:
      "iPadOS・macOSではフルキーボードアクセスがボタン・スライダー・スイッチなどの操作部品を受け持つため、アプリがフォーカスに対応するのはリスト項目・入力欄・検索欄などの内容要素だけでよいとしています。逆にtvOSでは、すべての要素にフォーカスが届くようにする必要があります。ゲームでは、利用者がキーの割り当てを自分で変えられることを期待されています。",
    accessibility:
      "操作可能(Operable) ― フルキーボードアクセス(iOS・iPadOS・macOS・visionOS)は、キーボードだけでウィンドウ・メニュー・操作部品・システムの機能を移動・操作できる仕組みで、設定アプリのアクセシビリティから有効にしてテストするよう求めています。",
    useCases: [
      "Tabで区画の間、矢印キーで区画の中を移動できるようにする",
      "入力欄はフォーカスリング、リストは行のハイライトで示す",
      "利用者の操作なしにフォーカスを動かさない",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#iPadOS",
    urlSecondary: [
      { label: "Focus and selection ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#Best-practices" },
      { label: "Keyboards ― Standard keyboard shortcuts", url: "https://developer.apple.com/design/human-interface-guidelines/keyboards#Standard-keyboard-shortcuts" },
      { label: "Keyboards ― Custom keyboard shortcuts", url: "https://developer.apple.com/design/human-interface-guidelines/keyboards#Custom-keyboard-shortcuts" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・表・見出しアンカーを確認済み(2026-10)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Android Developers ― Focus in Compose / Focus traversal order",
    color: "#2F7D6E",
    position: "Tab(1次元・見た目の順)と矢印キー・D-pad(2次元・位置関係)の2種類の移動を前提に、フォーカスの初期位置・順番・復元・見せ方を設計する",
    size: "Tab/Shift+Tabは、画面に表示される順番(上の行の先頭→末尾→次の行)で前後に移動し、最後の要素から最初へ折り返します。矢印キー・D-padは、要素の位置関係から、押した方向で最も近い要素へ移動し、折り返しません。まとまり(focusGroup)を指定すると、そのまとまりの中を巡ってから次へ移ります。",
    colorInfo: "どの要素にフォーカスがあるかを、フォーカスリングや波紋のような、はっきり見える手がかりで示すよう求めています。フォーカスした要素と周りの文脈が、見える位置までスクロールされるようにします。フォーカス時の重ね色の不透明度(10%)は「インタラクション状態」ページを参照。",
    stance:
      "大画面やタッチ以外の端末(パソコンのキーボード、テレビのD-pad、車のロータリーコントローラー、タブレットのキーボードカバー)のために、5つの原則を挙げています。画面に入ったら最も使われそうな要素に最初のフォーカスを置く、Tabと矢印キーで予測できる順番にする、中断・ダイアログを閉じた後・画面の構成が変わった後にフォーカスを戻す、フォーカスをはっきり示す、フォーカスした要素を見える位置へスクロールする、です(Android Developersの本文を直接確認、2026-10)。",
    exceptions:
      "多くの場合、Tabと矢印キーでの移動はフレームワークが自動で処理します。ただし、タブやリスト、一部しか見えていない横スクロールのような複雑な部品では、次の移動先を正しく決められないことがあり、まとまりを指定して順番を整える必要があるとしています。",
    accessibility:
      "操作可能(Operable) ― タッチ中心のアプリではキーボードでの移動が実装されないことが多いが、キーボードに手を置いている人は期待しており、アクセシビリティの必要がある人にとっては、スマートフォン・タブレット・折りたたみ端末・パソコンのどれでも欠かせない場合がある、としています。",
    useCases: [
      "画面を開いたら、最も使われそうな要素に最初のフォーカスを置く",
      "ダイアログを閉じたら、開く前にフォーカスしていた要素に戻す",
      "Tabは見た目の順、矢印キーは位置関係で移動できるか確かめる",
    ],
    searchHint: "",
    url: "https://developer.android.com/develop/ui/compose/touch-input/focus#factors-for-navigation",
    urlSecondary: [
      { label: "Android: Focus traversal order", url: "https://developer.android.com/develop/ui/compose/touch-input/focus/change-focus-traversal-order#one-dimensional-focus-traversal" },
      { label: "Android: Input compatibility on large screens", url: "https://developer.android.com/develop/ui/compose/touch-input/input-compatibility-on-large-screens#navigation" },
    ],
    confirmedNote: "M3(m3.material.io)にキーボードでの移動の専用ページは見当たらないため(サイトマップで確認)、Google公式のAndroid Developersの本文を掲載しています(直接確認、2026-10)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.1.1 / 2.1.2 / 2.4.1 / 2.4.3 / 2.4.7、APG Developing a Keyboard Interface",
    color: "#A3821F",
    position: "すべての機能をキーボードで使えること・閉じ込めないこと・意味の通る順番・フォーカスが見えること・繰り返しを飛ばせることを、それぞれ独立した基準で求める",
    size: "2.1.1(レベルA): すべての機能を、キーを押す間隔の指定なしにキーボードで操作できること。2.1.2(レベルA): フォーカスが入った部品から、キーボードだけで抜け出せること(Tabや矢印以外の方法が必要なら、その方法を知らせる)。2.4.3(レベルA): 意味や操作に影響するなら、意味と操作性を保つ順番でフォーカスを受けること。2.4.7(レベルAA): フォーカスの表示が見える状態があること。2.4.1(レベルA): 複数のページで繰り返す内容を飛ばす手段があること。",
    colorInfo: "W3CのAPG(ARIAの実装ガイド)は、Tab・Shift+Tabで部品から部品へ、矢印キーで複数の要素を持つ部品(ラジオグループ・タブ・メニュー・グリッド)の中を移動する、という役割分担を全プラットフォーム共通の慣習として示しています。部品の中の移動は、Tabの順番に1つだけを入れる「ロービングtabindex」か、aria-activedescendantで実装します。",
    glossary: [
      { term: "2.1.1 Keyboard・レベルA", desc: "すべての機能をキーボードで操作できることを求める基準。手書きのように、なぞる軌跡そのものが必要な機能は例外。" },
      { term: "2.1.2 No Keyboard Trap・レベルA", desc: "キーボードでフォーカスを入れた部品から、キーボードだけで抜け出せることを求める基準。" },
      { term: "2.4.3 Focus Order・レベルA", desc: "フォーカスの移動順が、意味と操作性を保つ順番であることを求める基準。" },
      { term: "2.4.7 Focus Visible・レベルAA", desc: "キーボードで操作できる画面で、フォーカスの位置が見えることを求める基準。" },
      { term: "ロービングtabindex", desc: "部品の中で今アクティブな1つだけをTabの順番に入れ(tabindex=0)、他は外して(tabindex=-1)、矢印キーで切り替える実装方法。" },
    ],
    stance:
      "キーボードで操作できれば、目の見えない人(マウスのように目と手の協調が必要な機器を使えない)や、キーボードの代わりになる入力(音声入力、息で操作するスイッチ、画面上のキーボード、スキャン方式など)を使う人、ポインタを目で追いにくい弱視の人も使えるためです。2.1.2を満たさない内容はページ全体の利用を妨げるため、ページ上のすべての内容が満たす必要があります(Understandingページの本文を直接確認、2026-10)。",
    exceptions:
      "2.1.1は、手書きのように「なぞる軌跡」そのものが必要な機能を例外とします(ただし文字入力のように、機能自体は軌跡に依存しない場合は例外になりません)。2.4.3は、順番が意味や操作に影響しない場合は対象外です。フォーカスが重なった要素に完全に隠れないこと(2.4.11)・表示の大きさとコントラスト(2.4.13)は「インタラクション状態」「エレベーション」ページを参照。",
    accessibility: "操作可能(Operable) ― 2.1(キーボード操作可能)と2.4(ナビゲーション可能)のガイドラインに属し、POURの「操作可能」です。",
    useCases: [
      "マウスを使わず、Tab・Shift+Tab・矢印・Enter・Escだけで全機能を試す",
      "ダイアログやメニューに入ったら、Escなどで必ず抜け出せるようにする",
      "ページの先頭に「本文へ移動」のスキップリンクを置く",
    ],
    searchHint: "primary keyboard navigation convention",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html",
    urlSecondary: [
      { label: "2.1.2 No Keyboard Trap", url: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html" },
      { label: "2.4.3 Focus Order", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html" },
      { label: "2.4.7 Focus Visible", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html" },
      { label: "APG: Developing a Keyboard Interface", url: "https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#fundamentalkeyboardnavigationconventions" },
    ],
    confirmedNote: "6つのUnderstandingページ(2.1.1・2.1.2・2.1.4・2.4.1・2.4.3・2.4.7)とAPGの本文を直接取得して確認済み(2026-10)。ページ内検索の語はAPGのページのものです。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Keyboard-Only Navigation for Improved Accessibility",
    color: "#7A4F7E",
    position: "キーボードだけで使う人のために、「フォーカスが見える・すべての操作に届く・ナビゲーションを飛ばせる」の3つを満たすよう求める実務指針(適合基準ではない)",
    size: "数値基準ではなく原則としての言及です。キーボードでの移動は「順番に1つずつ」で、マウスのように目的の場所へ直接は行けない点が最大の違いだとしています。Tabの順番はページのレイアウトどおり(左から右、上から下)にするのが基本です。",
    colorInfo: "ブラウザの既定のフォーカス表示を、見た目が悪いという理由で消すのは致命的だとしています。気に入らなければ消すのではなく、サイトの見た目に合ったデザインに置き換えます(例: マウスのホバーと同じ見た目をフォーカスにも使う)。",
    stance:
      "キーボードを使うのは、効率を求める上級者と、マウスを使えない人(手の動きに障害のある人、画面が見えずスクリーンリーダーを使う人)です。フォーム・ドロップダウン・ボタン・ダイアログなどすべての操作要素にTabで届くこと、ポップアップに入って閉じられること、ドロップダウンでは下矢印で即選択せず選択肢の間を移動してEnterで決めること、を挙げています(記事本文を直接取得して確認、2026-10)。",
    exceptions:
      "ナビゲーションが多いページでは、本文にたどり着くまでに100個以上のリンクをTabで進む必要が出ることがあるため、「本文へスキップ」のリンクを勧めています。このリンクはTabを押したときだけ表示すれば、マウスで使う人の見た目を邪魔しません。スキップした先から、本文のリンクをTabで続けて進めることも大切だとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際のサイトでのキーボード操作の観察に基づく設計上の根拠です。",
    useCases: [
      "フォーカス表示を消さず、サイトに合ったデザインに置き換える",
      "ナビゲーションが長いページには、Tabで現れる「本文へスキップ」を置く",
      "ドロップダウンは、矢印キーで選択肢を移動し、Enterで決定できるようにする",
    ],
    searchHint: "Skip Navigation",
    url: "https://www.nngroup.com/articles/keyboard-accessibility/#toc-consider-a-skip-navigation-link-4",
    urlSecondary: [{ label: "Obvious Keyboard Focus(節)", url: "https://www.nngroup.com/articles/keyboard-accessibility/#toc-obvious-keyboard-focus-2" }],
    confirmedNote: "記事本文を直接取得して確認済み(2026-10)。",
  },
];

/* 画像エリア: Tabで区画の間、矢印で区画の中 */
function TabSequenceSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const badge = (x, y, n) => (
    <g>
      <circle cx={x} cy={y} r="8" fill="#A3821F" />
      <text x={x} y={y + 3.5} fontSize="9.5" fill="#FFFFFF" textAnchor="middle" fontWeight="700" fontFamily={font}>{n}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 440 190" width="100%" style={{ maxWidth: 520, display: "block", margin: "0 auto" }} role="img" aria-label="Tabキーで区画の間を、矢印キーで区画の中を移動する図">
      <rect x="10" y="8" width="420" height="160" rx="8" fill="#FFFFFF" stroke="#9EA4C4" />
      <rect x="22" y="18" width="80" height="16" rx="3" fill="#3A4FCF" opacity="0.15" stroke="#3A4FCF" strokeDasharray="3 2" />
      <text x="62" y="29" fontSize="8.5" fill="#3A4FCF" textAnchor="middle" fontFamily={font}>本文へスキップ</text>
      {badge(112, 26, 1)}
      <rect x="22" y="44" width="90" height="112" rx="4" fill="#F3F6FA" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="30" y={52 + i * 24} width="74" height="16" rx="3" fill={i === 1 ? "#D9E4F2" : "#FFFFFF"} stroke={i === 1 ? "#3C5A73" : "#E1E3F0"} strokeWidth={i === 1 ? 1.6 : 1} />)}
      {badge(22, 44, 2)}
      <text x="112" y="104" fontSize="11" fill="#5A9629" fontFamily={font}>↕</text>
      <rect x="126" y="44" width="200" height="112" rx="4" fill="#F8F9FD" />
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={136 + c * 62} y={52 + r * 34} width="54" height="26" rx="3" fill={r === 0 && c === 1 ? "#D9E4F2" : "#FFFFFF"} stroke={r === 0 && c === 1 ? "#3C5A73" : "#E1E3F0"} strokeWidth={r === 0 && c === 1 ? 1.6 : 1} />))}
      {badge(126, 44, 3)}
      <text x="226" y="166" fontSize="10" fill="#5A9629" textAnchor="middle" fontFamily={font}>↔ ↕ 矢印でグリッドの中を移動</text>
      <rect x="338" y="44" width="80" height="26" rx="13" fill="#3F51B5" />
      <text x="378" y="61" fontSize="9.5" fill="#FFFFFF" textAnchor="middle" fontFamily={font}>保存</text>
      {badge(338, 44, 4)}
      <path d="M112 34 q-40 14 -82 10 M30 48 q90 -30 96 -4 M222 46 q60 -30 116 0" stroke="#A3821F" strokeWidth="1.4" fill="none" strokeDasharray="3 2" />
      <text x="378" y="186" fontSize="9.5" fill="#A3821F" textAnchor="middle" fontFamily={font}>Tabで ①→②→③→④</text>
    </svg>
  );
}

/* 四サイト比較図: キーごとの役割 */
const KEY_ROWS = [
  { keys: ["Tab"], name: "次へ", hig: "フォーカスグループの間を移動(iPadOS)", material: "見た目の順で次へ。最後から最初へ折り返す", wcag: "部品から部品へ(APG)。順番は意味と操作性を保つ(2.4.3)", nn: "レイアウトどおり左→右、上→下の順に" },
  { keys: ["Shift", "Tab"], name: "前へ", hig: "逆順に移動(macOSの標準ショートカット)", material: "見た目の順で前へ", wcag: "部品から部品へ逆順(APG)", nn: "1つ前へ戻る" },
  { keys: ["↑", "↓", "←", "→"], name: "まとまりの中", hig: "同じフォーカスグループの中を方向で移動。tvOSは方向操作で全要素へ", material: "位置関係で、押した方向の最も近い要素へ。折り返さない", wcag: "ラジオ・タブ・メニュー・グリッドの中を移動(APG)", nn: "ドロップダウンでは選択肢の間を移動(すぐ選択しない)" },
  { keys: ["Enter"], name: "決定", hig: "―(フォーカスした項目の選択はシステムに任せる)", material: "入力の確定(大画面のキーボード対応)", wcag: "―(2.1.1で全機能をキーボードで)", nn: "フォーカスしたリンクを開く・選択肢を決める" },
  { keys: ["Esc"], name: "取り消し・閉じる", hig: "今の操作・処理を取り消す", material: "―", wcag: "閉じ込めない。抜け方が特殊なら知らせる(2.1.2)", nn: "ポップアップから抜けて閉じられること" },
  { keys: ["スキップ"], name: "繰り返しを飛ばす", hig: "Control-F2(メニューバー)・F5(ツールバー)など、区画へ直接移動", material: "―", wcag: "繰り返す内容を飛ばす手段(2.4.1)", nn: "Tabで現れる「本文へスキップ」リンク" },
];

function KeyCap({ k }) {
  return <span style={styles.keyCap}>{k}</span>;
}

function KeyRoleChart() {
  const heads = [["Apple", "#C2542A"], ["Google", "#2F7D6E"], ["W3C", "#A3821F"], ["NN group", "#7A4F7E"]];
  return (
    <div style={styles.kcScroll}>
      <div style={styles.kcGrid}>
        <div style={styles.kcHead}>キー・役割</div>
        {heads.map(([h, c]) => (<div key={h} style={{ ...styles.kcHead, color: c }}>{h}</div>))}
        {KEY_ROWS.map((r) => (
          <React.Fragment key={r.name}>
            <div style={styles.kcName}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>{r.keys.map((k) => <KeyCap key={k} k={k} />)}</div>
              <span style={styles.kcRole}>{r.name}</span>
            </div>
            {[r.hig, r.material, r.wcag, r.nn].map((t, i) => (
              <div key={i} style={{ ...styles.kcCell, ...(t.startsWith("―") ? styles.kcMuted : {}) }}>{t}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* フォーカスの順番と動かし方のルール */
const FOCUS_RULES = [
  { icon: "order", t: "読む順に巡る", d: "行の始まりから終わり、上から下へ。見た目の順番と、Tabで巡る順番をそろえる", who: "Apple・Google・W3C 2.4.3・NN group" },
  { icon: "group", t: "まとまりの中は矢印で", d: "Tabでまとまり(区画・部品)の間、矢印キーでその中を移動。まとまりを指定して順番を整える", who: "Apple・Google・W3C(APG)" },
  { icon: "first", t: "最初のフォーカスを決める", d: "画面やまとまりに入ったら、最も使われそうな要素に最初のフォーカスを当てる", who: "Apple・Google" },
  { icon: "keep", t: "勝手に動かさず、戻すべきときは戻す", d: "利用者の操作なしにフォーカスを動かさない。ダイアログを閉じた後や中断の後は、元の位置に戻す", who: "Apple・Google" },
  { icon: "trap", t: "閉じ込めない", d: "ダイアログやメニューに入ったら、キーボードだけで抜け出せる。ポップアップは閉じられる", who: "W3C 2.1.2・NN group" },
  { icon: "skip", t: "繰り返しを飛ばせる", d: "長いナビゲーションを毎回Tabで進まなくて済むよう、本文へのスキップや区画への直接移動を用意", who: "W3C 2.4.1・NN group・Apple(macOS)" },
];

function RuleIcon({ k }) {
  const c = "#3C5A73";
  return (
    <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="8" fill="#EEF1FA" />
      {k === "order" && <g>{[0, 1, 2].map((i) => <rect key={i} x="8" y={9 + i * 8} width="24" height="5" rx="2" fill={c} opacity={1 - i * 0.25} />)}<path d="M34 10 v20 l-3 -3 M34 30 l3 -3" stroke={c} strokeWidth="1.4" fill="none" /></g>}
      {k === "group" && <g><rect x="7" y="9" width="12" height="22" rx="2" fill="none" stroke={c} strokeWidth="1.4" /><rect x="22" y="9" width="12" height="22" rx="2" fill="none" stroke={c} strokeWidth="1.4" /><path d="M13 14 v12 M28 14 v12" stroke="#5A9629" strokeWidth="1.6" /></g>}
      {k === "first" && <g><rect x="8" y="10" width="24" height="8" rx="2" fill="none" stroke={c} strokeWidth="2.2" /><rect x="8" y="22" width="24" height="8" rx="2" fill="#FFFFFF" stroke="#B7BCDA" /></g>}
      {k === "keep" && <g><rect x="8" y="12" width="14" height="16" rx="2" fill="none" stroke={c} strokeWidth="2" /><path d="M26 20 a7 7 0 1 0 -2 5" stroke="#5A9629" strokeWidth="1.6" fill="none" /></g>}
      {k === "trap" && <g><rect x="8" y="10" width="24" height="20" rx="3" fill="#FFFFFF" stroke={c} strokeWidth="1.4" /><path d="M20 20 h14 M30 16 l4 4 l-4 4" stroke="#5A9629" strokeWidth="1.6" fill="none" /><text x="13" y="24" fontSize="8" fill={c}>Esc</text></g>}
      {k === "skip" && <g>{[0, 1, 2, 3].map((i) => <line key={i} x1="8" x2="18" y1={10 + i * 5} y2={10 + i * 5} stroke="#B7BCDA" strokeWidth="2" />)}<rect x="8" y="30" width="24" height="5" rx="2" fill={c} /><path d="M24 8 q8 10 0 20" stroke="#5A9629" strokeWidth="1.6" fill="none" /></g>}
    </svg>
  );
}

function FocusRules() {
  return (
    <div style={styles.frGrid}>
      {FOCUS_RULES.map((r) => (
        <div key={r.t} style={styles.frCard}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><RuleIcon k={r.icon} /><div style={styles.frTitle}>{r.t}</div></div>
          <div style={styles.frText}>{r.d}</div>
          <div style={styles.frWho}>{r.who}</div>
        </div>
      ))}
    </div>
  );
}

/* フォーカスの見せ方 */
function FocusLooks() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const card = (title, who, color, body, note) => (
    <div style={styles.flCard}>
      <svg viewBox="0 0 150 64" width="100%" style={{ maxWidth: 190, display: "block" }} aria-hidden="true">{body}</svg>
      <div style={{ ...styles.flTitle, color }}>{title}<span style={styles.flWho}>{who}</span></div>
      <div style={styles.flNote}>{note}</div>
    </div>
  );
  return (
    <div style={styles.flGrid}>
      {card("フォーカスリング", "Apple・Google", "#C2542A",
        <g><rect x="12" y="18" width="126" height="28" rx="6" fill="#FFFFFF" stroke="#C9CEE3" /><rect x="8" y="14" width="134" height="36" rx="9" fill="none" stroke="#3A4FCF" strokeWidth="3" /><text x="22" y="36" fontSize="10" fill="#7E86AC" fontFamily={font}>検索</text></g>,
        "入力欄・検索欄に。部品の形に沿った輪郭を表示")}
      {card("行のハイライト", "Apple", "#C2542A",
        <g>{[0, 1, 2].map((i) => <g key={i}><rect x="8" y={6 + i * 19} width="134" height="16" rx="3" fill={i === 1 ? "#3A4FCF" : "#FFFFFF"} stroke="#E1E3F0" /><text x="16" y={17 + i * 19} fontSize="9" fill={i === 1 ? "#FFFFFF" : "#454C78"} fontFamily={font}>項目 {i + 1}</text></g>)}</g>,
        "リスト・コレクションに。行全体をアクセントカラーで")}
      {card("消さずに置き換える", "NN group", "#7A4F7E",
        <g><rect x="8" y="16" width="62" height="30" rx="4" fill="#FFFFFF" stroke="#E1E3F0" /><text x="39" y="35" fontSize="9" fill="#C0503F" textAnchor="middle" fontFamily={font}>✕ 表示なし</text><rect x="80" y="16" width="62" height="30" rx="4" fill="#EEF1FA" stroke="#7A4F7E" strokeWidth="2" /><text x="111" y="35" fontSize="9" fill="#2E6B3A" textAnchor="middle" fontFamily={font}>◯ 独自の見た目</text></g>,
        "既定の表示が気に入らなくても消さず、サイトに合う見た目に")}
      {card("見えること・隠れないこと", "W3C", "#A3821F",
        <g><rect x="8" y="6" width="134" height="14" rx="2" fill="#B7BCDA" /><text x="75" y="16" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontFamily={font}>固定ヘッダー</text><rect x="30" y="30" width="90" height="24" rx="5" fill="#FFFFFF" stroke="#A3821F" strokeWidth="2.5" /><text x="75" y="46" fontSize="9" fill="#454C78" textAnchor="middle" fontFamily={font}>フォーカス中</text></g>,
        "見える状態があること(2.4.7・AA)。重なりで完全に隠さない(2.4.11)。大きさと変化の目安は2.4.13(AAA)")}
    </div>
  );
}

/* キーボードショートカットのルール */
const SHORTCUTS = [
  { who: "Apple", color: "#C2542A", items: ["標準のショートカット(Command-Z・C・V・Qなど)を別の機能に流用しない", "独自のショートカットは、よく使う機能だけに", "Commandを主な修飾キーに、Shiftは関連する操作の補助に、Optionは控えめに、Controlは避ける(システムが使うため)", "複数の修飾キーは Control → Option → Shift → Command の順に表記"] },
  { who: "Google", color: "#2F7D6E", items: ["Ctrl+Z(取り消し)・Ctrl+C(コピー)・Ctrl+S(保存)などの基本のショートカットを確認する", "スペースで再生・一時停止(メディアアプリ)、Enterで入力の確定", "キーボードを中心に使う人向けに、独自のショートカットも検討する"] },
  { who: "W3C", color: "#A3821F", items: ["文字・数字・記号の1キーだけのショートカットは、オフにできる・修飾キー付きに変えられる・その部品にフォーカスがあるときだけ有効、のいずれかにする(2.1.4・A)", "音声入力の人(話した言葉が文字の並びとして入力される)や、キーを押し間違えやすい人の誤作動を防ぐため"] },
];

function ShortcutRules() {
  return (
    <div style={styles.scGrid}>
      {SHORTCUTS.map((s) => (
        <div key={s.who} style={styles.scCard}>
          <div style={{ ...styles.scWho, color: s.color }}>{s.who}</div>
          <ul style={styles.scList}>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

export default function TokensKeyboardNavigationPage() {
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
        <SidebarNav currentPath="/tokens/keyboard-navigation" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / インタラクション / キーボードナビゲーション</span>
            <span>SPEC No. 054</span>
          </div>

          <h1 style={styles.title}>キーボードナビゲーション・フォーカス順序</h1>
          <p style={styles.subtitle}>4つのガイドラインが、キーボードでの移動の仕方・フォーカスの順番と見せ方・ショートカットをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>Tabで区画の間を、矢印キーで区画の中を移動する(概念図)</span>
            <TabSequenceSwatch />
            <p style={styles.swatchNote}>Tabは「本文へスキップ」→ サイドバー → グリッド → 保存ボタンの順に、区画から区画へ進みます。サイドバーやグリッドの中の項目は、矢印キーで移動します。こうするとTabを押す回数が減り、どこにいるかも分かりやすくなります。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列がそろって一致しているのは、<strong>Tab(Shift+Tab)で部品やまとまりの間を、矢印キーでまとまりの中を移動する</strong>という役割分担です。Appleはこれを「フォーカスグループ」、Googleは「Tab=1次元・矢印=2次元」と呼び、W3CのAPGは全プラットフォーム共通の慣習として示しています。<strong>順番は読む順(上から下、行の始まりから終わり)</strong>が基本です。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、この上に<strong>すべての機能をキーボードで使える(2.1.1)・閉じ込めない(2.1.2)・意味の通る順番(2.4.3)・フォーカスが見える(2.4.7)・繰り返しを飛ばせる(2.4.1)</strong>という基準を重ねています。NN groupも同じく<strong>「フォーカスが見える・すべてに届く・ナビゲーションを飛ばせる」</strong>の3点を挙げ、<strong>フォーカス表示を見た目の理由で消すのは致命的</strong>だとしています。
            </p>
            <p style={styles.synthesisText}>
              違いが出るのは、フォーカスを誰が受け持つかです。Appleは<strong>フルキーボードアクセスがボタンなどの操作部品を受け持つ</strong>ため、アプリはリストや入力欄などの内容要素に対応すればよいとし、<strong>利用者の操作なしにフォーカスを動かさない</strong>ことを重視します。Googleは<strong>最初のフォーカスの位置と、ダイアログを閉じた後などにフォーカスを戻すこと</strong>まで原則に入れています。
            </p>
            <p style={styles.synthesisText}>
              実務では、<strong>マウスを使わずTab・矢印・Enter・Escだけで全機能を試し、順番・見え方・抜け出し方・スキップの4点を確認する</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― キーごとの役割</h2>
            <KeyRoleChart />
            <p style={styles.chartNote}>AppleはiPadOS・macOSの記述(標準ショートカットの表を含む)、GoogleはAndroid Developersのフォーカスの説明、W3Cは達成基準とAPG、NN groupはキーボード操作の記事によります。「―」は確認した範囲で該当する記述がないことを示します。</p>
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
                <InfoBox label="移動の仕方とキー" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="フォーカスの見せ方">{s.colorInfo}</InfoBox>
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
            <h2 style={styles.diagramTitle}>キーボードナビゲーション デザインシステム比較</h2>
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
                <div style={styles.labelCell}>移動の仕方とキー</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>フォーカスの見せ方</div>
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
            <h2 style={styles.diagramTitle}>フォーカスの順番と動かし方 ― 6つのルール</h2>
            <p style={styles.diagramNote}>4系列の記述を、フォーカスの順番・最初の位置・動かし方・抜け出し方にまとめました。下の名前は根拠にした系列です。</p>
            <FocusRules />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>フォーカスの見せ方</h2>
            <p style={styles.diagramNote}>フォーカスの表示の太さ・コントラストの数値(W3C 2.4.13の2px・3:1、Googleの重ね色10%)は「インタラクション状態」ページで比較しています。</p>
            <FocusLooks />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>キーボードショートカットのルール</h2>
            <ShortcutRules />
            <p style={styles.chartNote}>NN groupの記事はショートカットではなく、Tabでの移動・フォーカス表示・スキップリンクを扱っています。</p>
          </section>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["操作方法(タッチ・キーボード)", "ナビゲーション"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。GoogleはM3に専用ページがなく、Android Developersの本文で確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Focus and selectionページの「iPadOS」見出し(フォーカスグループの説明)へのアンカー付きリンクで、Keyboardsページのショートカットの見出しも併記しています。GoogleはAndroid Developersのフォーカスのページ(キーボード操作の5原則の節)です。WCAGは2.1.1を基本リンクとし、2.1.2・2.4.3・2.4.7とAPGも併記しています。NN groupはキーボード操作の記事のスキップリンクの節です。
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
  subHead: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "0 0 10px" },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  kcScroll: { overflowX: "auto" },
  kcGrid: { display: "grid", gridTemplateColumns: "120px repeat(4, minmax(130px, 1fr))", minWidth: 700, border: "1px solid #E1E3F0", borderRadius: 4 },
  kcHead: { fontSize: 11, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", color: "#171B36" },
  kcName: { display: "flex", flexDirection: "column", gap: 4, padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  kcRole: { fontSize: 10.5, color: "#565D8A" },
  kcCell: { fontSize: 10.5, lineHeight: 1.55, color: "#2E3457", padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7" },
  kcMuted: { color: "#B7BCDA" },
  keyCap: { display: "inline-block", fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", fontSize: 10.5, fontWeight: 600, color: "#171B36", background: "#FFFFFF", border: "1px solid #B7BCDA", borderBottomWidth: 3, borderRadius: 4, padding: "1px 6px", minWidth: 20, textAlign: "center" },
  frGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 10 },
  frCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  frTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  frText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 6 },
  frWho: { fontSize: 9.5, color: "#7E86AC", marginTop: 5 },
  flGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 210px), 1fr))", gap: 10 },
  flCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  flTitle: { fontSize: 12, fontWeight: 700, marginTop: 6 },
  flWho: { fontSize: 9.5, fontWeight: 400, color: "#7E86AC", marginLeft: 6 },
  flNote: { fontSize: 11, lineHeight: 1.55, color: "#454C78", marginTop: 3 },
  scGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10 },
  scCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  scWho: { fontSize: 12.5, fontWeight: 700, marginBottom: 4 },
  scList: { margin: 0, paddingLeft: 16, fontSize: 11.5, lineHeight: 1.65, color: "#2E3457" },
};
