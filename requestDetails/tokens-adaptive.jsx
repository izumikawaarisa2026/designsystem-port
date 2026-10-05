import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「アダプティブ/レスポンシブデザイン」ページ。
 *
 * このページの発見: Apple・Googleはどちらも「端末の種類ではなく、使える広さで見せ方を変える」が、
 * 変える対象を具体的に決めているのはGoogleで、ウィンドウサイズクラスごとにナビゲーションの部品
 * (ナビゲーションバー → ナビゲーションレール)とペインの数(1ペイン → 2ペイン)を切り替える
 * 「カノニカルレイアウト」を3種類用意している。Appleは境界値を示さず、「機能は変えず、見える量と
 * ナビゲーションの形(タブバー → サイドバー)だけを変える」という原則を示す。W3Cは広さそのものではなく、
 * 狭くしても(320 CSS px)・向きを変えても情報と機能が失われないことを求め、NN groupはWebの
 * ブレークポイントの目安(500/1200/1400px)と、切り替えで起きる典型的な変化を示す。
 * 余白の値やウィンドウサイズクラスの境界値そのものは「レイアウト・スペーシング」ページで扱う。
 *
 * Apple(HIG Layout・Tab bars・Split views)はHIGのページデータ(JSON)を直接取得して確認(2026-10)。
 * Google(Canonical layouts・Build adaptive navigation)はAndroid Developersの本文を直接確認(2026-10)。
 * m3.material.ioのAdaptive design・Canonical examplesのページはSPAのため本文は未確認。
 * W3C(1.4.10・1.3.4)・NN group(Breakpoints in Responsive Design)は本文を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Layout(Adaptability・Size classes)/ Tab bars / Split views",
    color: "#C2542A",
    position: "端末の種類や向きではなく、システムが判定する「サイズクラス」(compact/regular)で見せ方を変える。機能は変えず、画面に見せる量とナビゲーションの形だけを変える",
    size: "広さの区分は横・縦それぞれcompact/regularの2つで、境界値は公開されていません。対応すべき変化として、画面サイズ、向きと縦横比、Dynamic Islandなどのシステムの機能、外部ディスプレイ・画面表示の拡大・iPadとMacでのウィンドウのリサイズ、文字サイズの変更、地域設定(右から左の表記・日付や数字の書式・文字の長さ)を挙げています。",
    colorInfo: "広い画面では、タブバーをサイドバーに切り替えたり、オーバーフローメニューにまとめていた機能を表に出したりしてよいとしています。iPadOSでは、タブバーを、サイドバーに切り替えるボタン付きで表示できます。スプリットビューはiPadOSで2列(メールのように)か3列(Keynoteのように)。iPhoneの縦向きのようなcompactの環境では、スプリットビューを使わないよう勧めています。",
    stance:
      "回転・ウィンドウのリサイズ・ディスプレイの追加・別の端末への切り替えのどれでも、体験が変わらず慣れたものに感じられるようにすることを求めています。そのために、セーフエリア・マージン・レイアウトガイドを尊重します。サイズクラスの組み合わせはすべて起こりうるため、縦横どちらの向きでも全部を検討し、最大と最小のレイアウトから確認すると効率的だとしています(ページ本文を直接確認、2026-10)。",
    exceptions:
      "横向き専用のゲームのように向きを固定するアプリでも、ウィンドウや端末の大きさの違いには対応すべきだとしています。背景の画像は、縦横比を変えずに拡大して画面を埋めます。macOSのスプリットビューは縦・横・両方に分割でき、ペインに最小・最大の大きさを決めたり、作業に集中するためにペインを隠せるようにしたりします。",
    accessibility:
      "知覚可能(Perceivable) ― 文字サイズを大きくしたときに、横に並んだ要素を縦に積み直し、行の高さを伸ばして文字が切れたり重なったりしないようにすることを求めています。WCAG 1.4.10(リフロー)・1.4.4(テキストのサイズ変更)と同じ目的です。",
    useCases: [
      "レイアウトは端末の種類や向きではなく、サイズクラスで切り替える",
      "広い画面ではタブバーをサイドバーにし、隠していた機能を表に出す(機能そのものは変えない)",
      "最大と最小のレイアウト、最大の文字サイズで、切れや重なりがないか確認する",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/layout#Adaptability",
    urlSecondary: [
      { label: "Layout ― Size classes", url: "https://developer.apple.com/design/human-interface-guidelines/layout#Size-classes" },
      { label: "Tab bars ― iPadOS(サイドバーへの切り替え)", url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars#iPadOS" },
      { label: "Split views ― iPadOS", url: "https://developer.apple.com/design/human-interface-guidelines/split-views#iPadOS" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-10)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Adaptive design / Canonical layouts(Android Developers)",
    color: "#2F7D6E",
    position: "ウィンドウサイズクラスごとに、ナビゲーションの部品とペイン(画面の区画)の数を切り替える。よく使う形を「カノニカルレイアウト」(リスト・詳細/フィード/補助ペイン)として3種類用意している",
    size: "ナビゲーションは、幅か高さがCompact(またはテーブルトップの姿勢)ならナビゲーションバー、それ以外はナビゲーションレールに自動で切り替わります(NavigationSuiteScaffoldの既定)。リスト・詳細は、Expanded幅でリストと詳細を並べ、Medium・Compact幅ではどちらか一方だけを表示します。補助ペインは、Medium幅で主と補助を1:1、Expanded幅で7:3に分け、Compact幅では下に置くかボトムシートに入れます。",
    colorInfo: "広さが変わっても状態を保ちます。リストと詳細を並べていた画面が狭くなったら、詳細を残してリストを隠します。詳細だけを表示していた画面が広くなったら、リストも並べ、詳細に表示中の項目をリストで選択中として示します。リストだけのときに広くなったら、空の詳細ペインを並べます。",
    stance:
      "カノニカルレイアウトは、スマートフォンからタブレット・折りたたみ端末・ChromeOSまで、多くの画面で実績のある汎用的な形で、Material Designの指針から作られたものだとしています。ナビゲーションの切り替えは、タブレットを両手で持ったときに左右の端に手が届きやすいよう、広い画面ではレールにする、という考え方です(Android Developersの本文を直接確認、2026-10)。",
    exceptions:
      "補助ペインの内容は、主の内容と組み合わせて初めて意味を持つもの(文書へのコメント、動画の関連動画、編集ツールのパレットなど)に使い、単独でも意味のある詳細(商品の説明など)はリスト・詳細を使う、と区別しています。フィードは、1列のスクロールから複数列のグリッドまで、画面の広さに合わせて列の数を変えます。",
    accessibility:
      "―(アダプティブ専用のアクセシビリティ基準は確認できていません)。狭い画面で1ペインに切り替える設計は、WCAG 1.4.10(リフロー)が求める「狭い幅でも2方向にスクロールせずに読めること」を満たしやすくします。",
    useCases: [
      "Compactではナビゲーションバー、それより広い画面ではナビゲーションレールにする",
      "一覧と詳細があるアプリ(メッセージ・連絡先など)は、Expanded幅で2ペインを並べる",
      "広さが変わっても、選択中の項目や開いている詳細を失わない",
    ],
    searchHint: "",
    url: "https://m3.material.io/foundations/layout/canonical-examples/overview",
    urlSecondary: [
      { label: "Android: Canonical layouts", url: "https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts#list-detail" },
      { label: "Android: Build adaptive navigation", url: "https://developer.android.com/develop/ui/compose/layouts/adaptive/build-adaptive-navigation" },
      { label: "M3: Adaptive design", url: "https://m3.material.io/foundations/layout/layout-overview/adaptive-design" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。切り替えのルールと比率は、Android Developersのカノニカルレイアウト・アダプティブナビゲーションのページ本文で直接確認(2026-10)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.10 Reflow / 1.3.4 Orientation",
    color: "#A3821F",
    position: "どの広さで何に切り替えるかは定めず、「狭くしても・向きを変えても、情報と機能が失われないこと」を求める",
    size: "1.4.10(レベルAA): 縦にスクロールする内容は幅320 CSSピクセル相当、横にスクロールする内容は高さ256 CSSピクセル相当で、情報や機能を失わず、縦横2方向のスクロールなしで表示できること。320pxは、幅1280pxの画面を400%に拡大した状態にあたります。1.3.4(レベルAA): 表示と操作を縦向き・横向きのどちらか一方に限定しないこと。",
    colorInfo: "見た目の切り替え方は自由です。求めるのは結果で、拡大して幅が狭くなったら内容が1列に組み替わり、横スクロールせずに読めることです。向きについては、利用者が好む向きで表示されることを目的としています。",
    glossary: [
      { term: "1.4.10 Reflow・レベルAA", desc: "幅320 CSSピクセル相当まで狭めても、2方向のスクロールなしで内容を読めることを求める基準。2次元の配置が必要な部分は例外。" },
      { term: "1.3.4 Orientation・レベルAA", desc: "表示と操作を縦・横のどちらかに固定しないことを求める基準。特定の向きが欠かせない場合は例外。" },
    ],
    stance:
      "大きな文字が必要な人にとって、長い行を読むために横にスクロールし続けるのは難しいためです。向きについては、車いすのアームなどに端末を固定して使う人は、端末を回転させられないためだとしています(Understandingページの本文を直接確認、2026-10)。",
    exceptions:
      "1.4.10は、使い方や意味のために2次元の配置が必要な部分(理解に必要な図や地図、動画、ゲーム、プレゼンテーション、データ表、操作中に表示し続ける必要があるツールバー)を例外とします。1.3.4は、小切手、ピアノのアプリ、プロジェクターやテレビ向けのスライド、VRのように、特定の向きが欠かせない場合を例外とします。",
    accessibility: "知覚可能(Perceivable) ― 1.4.10・1.3.4はいずれもPOURの「知覚可能」に属し、拡大して使う弱視の人や、端末を固定して使う人が、同じ情報と操作にたどり着けることを目的としています。",
    useCases: [
      "幅320pxで、横スクロールが出ないか・情報や機能が消えていないか確認する",
      "縦向き・横向きのどちらでも使えるようにする(向きを固定しない)",
      "データ表・地図など2次元が必要な部分だけ、横スクロールを許す",
    ],
    searchHint: "mounted in a fixed orientation",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
    urlSecondary: [
      { label: "1.3.4 Orientation", url: "https://www.w3.org/WAI/WCAG22/Understanding/orientation.html" },
    ],
    confirmedNote: "2つのUnderstandingページの本文を直接取得して確認済み(2026-10)。ページ内検索の語は1.3.4のページのものです。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Breakpoints in Responsive Design",
    color: "#7A4F7E",
    position: "Webのレスポンシブデザインで、ブレークポイント(レイアウトを切り替える画面幅)を4段階で考える実務指針(適合基準ではない)",
    size: "標準は決まっていないとしたうえで、よく使う目安として、Extra-small 500pxまで(スマートフォン・4列のグリッド)、Small 500〜1200px(タブレット・8列)、Medium 1200〜1400px(ノートパソコン・12列)、Large 1400px以上(外部モニター・12列)を挙げています。実際には、2〜3個のブレークポイントに対応するのが一般的です。",
    colorInfo: "切り替えで起きる典型的な変化として、ナビゲーションの変更(左のナビゲーションをハンバーガーメニューに畳む)、列を畳む(右の列を本文に入れる・別の場所に移す)、1行に見える要素の数を変える、の3つを挙げています。実例として、広い画面で一覧と地図を並べ、タブレットでは地図をボタンの奥に隠すサイトを紹介しています。",
    stance:
      "ブレークポイントの値は、利用者がどんな端末で見ているかを分析して決め、開発チームと一緒に定めるよう勧めています。各サイズで、利用者が知るべきことがすぐ手に入るか、列を縦に積んだときに重要な操作(右の列にあった主な行動ボタンなど)が見つけにくくならないかを確かめるよう求めています(記事本文を直接取得して確認、2026-10)。",
    exceptions:
      "ブレークポイントを増やすほど細かく対応できますが、デザインの手間が増えるため、実際には2〜3個に絞られることが多いとしています。重要な操作が埋もれる場合は、前にある内容をアコーディオンに畳むなど、通常の積み方の例外を作ってもよいとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、Webのレイアウト設計の実務に基づく指針です。",
    useCases: [
      "ブレークポイントは利用者の端末の分析から決め、名前(S/M/Lなど)を付けて共有する",
      "狭い画面では、左のナビゲーションをハンバーガーに畳み、本文に集中させる",
      "列を縦に積んだとき、主な行動ボタンが下に埋もれないか確認する",
    ],
    searchHint: "Four Common Breakpoints",
    url: "https://www.nngroup.com/articles/breakpoints-in-responsive-design/#toc-four-common-breakpoints-3",
    confirmedNote: "記事本文を直接取得して確認済み(2026-10)。",
  },
];

/* 画像エリア: 同じ内容が、画面の広さで組み替わる */
function Wire({ w, h, nav, cols, accent = "#3C5A73", label }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const pad = 4;
  let x = pad, y = pad, cw = w - pad * 2, ch = h - pad * 2;
  const parts = [];
  if (nav === "bottom") { parts.push(<rect key="n" x={pad} y={h - pad - 10} width={w - pad * 2} height="10" rx="2" fill={accent} opacity="0.85" />); ch -= 12; }
  if (nav === "rail") { parts.push(<rect key="n" x={pad} y={pad} width="10" height={h - pad * 2} rx="2" fill={accent} opacity="0.85" />); x += 12; cw -= 12; }
  if (nav === "side") { parts.push(<rect key="n" x={pad} y={pad} width="26" height={h - pad * 2} rx="2" fill={accent} opacity="0.55" />); x += 28; cw -= 28; }
  if (nav === "hamburger") {
    parts.push(<rect key="n" x={pad} y={pad} width={w - pad * 2} height="9" rx="2" fill="#E1E3F0" />);
    [0, 1, 2].forEach((i) => parts.push(<line key={`h${i}`} x1={pad + 3} x2={pad + 10} y1={pad + 2.5 + i * 2} y2={pad + 2.5 + i * 2} stroke={accent} strokeWidth="1" />));
    y += 11; ch -= 11;
  }
  const gap = 3;
  const colW = (cw - gap * (cols.length - 1)) / cols.reduce((a, b) => a + b, 0);
  let cx = x;
  cols.forEach((c, i) => {
    const ww = colW * c;
    parts.push(<rect key={`c${i}`} x={cx} y={y} width={ww} height={ch} rx="2" fill={i === 0 ? "#D9E4F2" : "#EEF1FA"} stroke="#C9CEE3" strokeWidth="0.6" />);
    [0, 1, 2].forEach((r) => parts.push(<rect key={`l${i}${r}`} x={cx + 3} y={y + 4 + r * 7} width={Math.max(ww - 6, 2)} height="3" rx="1.5" fill="#B7BCDA" />));
    cx += ww + gap;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h + 14}`} width={w} height={h + 14} role="img" aria-label={label}>
      <rect x="0.5" y="0.5" width={w - 1} height={h - 1} rx="5" fill="#FFFFFF" stroke="#9EA4C4" />
      {parts}
      <text x={w / 2} y={h + 11} fontSize="8.5" fill="#565D8A" textAnchor="middle" fontFamily={font}>{label}</text>
    </svg>
  );
}

function ReflowSwatch() {
  return (
    <div style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap" }}>
      <Wire w={52} h={86} nav="bottom" cols={[1]} label="狭い" />
      <Wire w={104} h={76} nav="rail" cols={[1]} label="中くらい" />
      <Wire w={170} h={96} nav="rail" cols={[1, 1.6]} label="広い" />
    </div>
  );
}

/* 四サイト比較図: 画面の広さが変わると、何が変わるか */
const ADAPT_ROWS = [
  {
    key: "hig", name: "Apple", color: "#C2542A",
    cells: [
      { wire: { nav: "bottom", cols: [1] }, text: "compact: タブバーで行き先を切り替え。スプリットビューは使わない" },
      { wire: { nav: "side", cols: [1] }, text: "regular: タブバーをサイドバーに切り替えられる。スプリットビュー2列" },
      { wire: { nav: "side", cols: [0.8, 1.4] }, text: "regular(さらに広い): スプリットビュー3列も可。機能は同じで、見える量が増える" },
    ],
  },
  {
    key: "material", name: "Google", color: "#2F7D6E",
    cells: [
      { wire: { nav: "bottom", cols: [1] }, text: "Compact: ナビゲーションバー+1ペイン(リストか詳細の一方)" },
      { wire: { nav: "rail", cols: [1, 1] }, text: "Medium: ナビゲーションレール。補助ペインは1:1で並べる(リスト・詳細は一方のみ)" },
      { wire: { nav: "rail", cols: [1, 1.6] }, text: "Expanded: レール+2ペイン(リストと詳細を並べる)。補助ペインは7:3" },
    ],
  },
  {
    key: "wcag", name: "W3C", color: "#A3821F",
    cells: [
      { wire: { nav: "none", cols: [1] }, text: "幅320 CSS px相当でも、横スクロールなしで情報・機能を失わない(1.4.10)" },
      { wire: null, text: "広さごとの見せ方の規定なし。縦・横どちらの向きにも固定しない(1.3.4)" },
      { wire: null, text: "広さごとの見せ方の規定なし" },
    ],
  },
  {
    key: "nn", name: "NN group", color: "#7A4F7E",
    cells: [
      { wire: { nav: "hamburger", cols: [1] }, text: "XS 〜500px(4列): 左のナビゲーションをハンバーガーに畳み、1列に" },
      { wire: { nav: "hamburger", cols: [1, 1] }, text: "S 500〜1200px(8列): 1行に並ぶ要素を減らす。地図などはボタンの奥へ" },
      { wire: { nav: "side", cols: [1, 1, 1] }, text: "M・L 1200px〜(12列): 左のナビゲーションを常に表示、右の列も並べる" },
    ],
  },
];
const WIDTHS = [
  { label: "狭い", sub: "スマートフォン縦", w: 46, h: 74 },
  { label: "中くらい", sub: "タブレット縦・折りたたみ", w: 86, h: 64 },
  { label: "広い", sub: "タブレット横・デスクトップ", w: 128, h: 72 },
];

function AdaptiveChart() {
  return (
    <div style={styles.adScroll}>
      <div style={styles.adGrid}>
        <div style={styles.adHead} />
        {WIDTHS.map((w) => (<div key={w.label} style={styles.adHead}><strong>{w.label}</strong><span style={styles.adHeadSub}>{w.sub}</span></div>))}
        {ADAPT_ROWS.map((r) => (
          <React.Fragment key={r.key}>
            <div style={{ ...styles.adName, color: r.color }}>{r.name}</div>
            {r.cells.map((c, i) => (
              <div key={i} style={styles.adCell}>
                {c.wire ? <Wire w={WIDTHS[i].w} h={WIDTHS[i].h} nav={c.wire.nav} cols={c.wire.cols} accent={r.color} label="" /> : <div style={styles.adNone}>―</div>}
                <div style={styles.adText}>{c.text}</div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* 変えてよいもの・変えてはいけないもの */
const CHANGE_OK = [
  { t: "ナビゲーションの形", d: "下のバー → 横のレール・サイドバー(Apple・Google)、左のメニュー → ハンバーガー(NN group)", who: "Apple・Google・NN group" },
  { t: "ペイン・列の数", d: "1ペイン → 2ペイン(Google)、スプリットビュー2〜3列(Apple)、3列 → 1列(NN group)", who: "Apple・Google・NN group" },
  { t: "画面に見せる量", d: "広い画面では、オーバーフローメニューに入れていた機能を表に出す。1行に並ぶ要素の数を増やす", who: "Apple・NN group" },
  { t: "補助的な内容の置き場所", d: "補助ペインは、狭い画面では下に置くかボトムシートに。地図などはボタンの奥へ", who: "Google・NN group" },
];
const CHANGE_NG = [
  { t: "使える機能", d: "広さによって機能そのものを変えない(見える量だけを変える)", who: "Apple" },
  { t: "今の状態", d: "選択中の項目・開いている詳細を、広さが変わっても保つ", who: "Google" },
  { t: "情報と機能(拡大・狭い幅)", d: "320 CSS px相当でも、情報と機能を失わない", who: "W3C" },
  { t: "重要な情報・操作の見つけやすさ", d: "列を積み直しても、主な行動ボタンや必要な情報が埋もれない", who: "NN group" },
  { t: "プラットフォームらしさ", d: "リサイズしても、その端末で見慣れたレイアウトのままにする", who: "Apple" },
];

function ChangeRules() {
  const col = (title, items, color, mark) => (
    <div style={styles.crCol}>
      <div style={{ ...styles.crTitle, color }}>{mark} {title}</div>
      {items.map((x) => (
        <div key={x.t} style={styles.crItem}>
          <div style={styles.crItemTitle}>{x.t}<span style={styles.crWho}>{x.who}</span></div>
          <div style={styles.crItemText}>{x.d}</div>
        </div>
      ))}
    </div>
  );
  return (
    <div style={styles.crGrid}>
      {col("変えてよいもの(広さに合わせて組み替える)", CHANGE_OK, "#2E6B3A", "◯")}
      {col("変えてはいけないもの(どの広さでも保つ)", CHANGE_NG, "#A33A2E", "✕")}
    </div>
  );
}

/* Googleのカノニカルレイアウトと、Appleの対応する考え方 */
const CANONICAL = [
  {
    name: "リスト・詳細", en: "List-detail",
    narrow: { nav: "bottom", cols: [1] }, wide: { nav: "rail", cols: [1, 1.6] },
    rule: "Expandedで2ペインを並べ、Medium・Compactではリストか詳細の一方だけ。狭い画面で詳細を開いたら、戻るでリストに戻す",
    use: "メッセージ・連絡先・メディアの閲覧など",
    apple: "スプリットビュー(サイドバー → 一覧 → 詳細の2〜3列)が近い。各ペインで選択中の項目を強調し続ける",
  },
  {
    name: "フィード", en: "Feed",
    narrow: { nav: "bottom", cols: [1] }, wide: { nav: "rail", cols: [1, 1, 1] },
    rule: "同じ種類の内容をグリッドに並べ、画面の広さに合わせて1列から複数列に増やす。大きく表示した要素で注意を引く",
    use: "ニュース・SNS",
    apple: "専用の型はなし。サイズクラスに応じて列の数を変える",
  },
  {
    name: "補助ペイン", en: "Supporting pane",
    narrow: { nav: "bottom", cols: [1] }, wide: { nav: "rail", cols: [2.33, 1] },
    rule: "主の内容に約2/3、補助に残りを割り当てる(Expandedは7:3、Mediumは1:1)。Compactでは補助を下に置くかボトムシートに",
    use: "文書+コメント、動画+関連動画、編集ツール+パレット",
    apple: "スプリットビューで補助的な機能を並べる例(KeynoteのナビゲーターやインスペクターをmacOSのペインに置く)が近い",
  },
];

function CanonicalLayouts() {
  return (
    <div style={styles.canGrid}>
      {CANONICAL.map((c) => (
        <div key={c.name} style={styles.canCard}>
          <div style={styles.canName}>{c.name}<span style={styles.canEn}>{c.en}</span></div>
          <div style={styles.canWires}>
            <Wire w={44} h={70} nav={c.narrow.nav} cols={c.narrow.cols} accent="#2F7D6E" label="Compact" />
            <span style={styles.canArrow}>→</span>
            <Wire w={120} h={70} nav={c.wide.nav} cols={c.wide.cols} accent="#2F7D6E" label="Expanded" />
          </div>
          <div style={styles.canRule}>{c.rule}</div>
          <div style={styles.canUse}><strong>向くアプリ: </strong>{c.use}</div>
          <div style={styles.canApple}><strong style={{ color: "#C2542A" }}>Appleでは: </strong>{c.apple}</div>
        </div>
      ))}
    </div>
  );
}

/* 向き(縦・横) */
function OrientationDiagram() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 520 120" width="100%" style={{ maxWidth: 620, display: "block", margin: "0 auto" }} role="img" aria-label="縦向きと横向きの両方に対応する図">
      <rect x="20" y="8" width="56" height="92" rx="8" fill="#FFFFFF" stroke="#9EA4C4" />
      <rect x="28" y="18" width="40" height="66" rx="3" fill="#D9E4F2" />
      <text x="48" y="114" fontSize="9.5" fill="#454C78" textAnchor="middle" fontFamily={font}>縦向き</text>
      <text x="100" y="58" fontSize="16" fill="#5A9629" textAnchor="middle" fontFamily={font}>⇄</text>
      <rect x="124" y="26" width="104" height="58" rx="8" fill="#FFFFFF" stroke="#9EA4C4" />
      <rect x="134" y="34" width="84" height="42" rx="3" fill="#D9E4F2" />
      <text x="176" y="114" fontSize="9.5" fill="#454C78" textAnchor="middle" fontFamily={font}>横向き</text>
      <text x="262" y="30" fontSize="10.5" fill="#171B36" fontWeight="600" fontFamily={font}>どちらの向きでも使えるようにする(W3C 1.3.4・AA)</text>
      <text x="262" y="48" fontSize="9.5" fill="#454C78" fontFamily={font}>車いすのアームなどに端末を固定して使う人は、</text>
      <text x="262" y="61" fontSize="9.5" fill="#454C78" fontFamily={font}>端末を回せない。</text>
      <text x="262" y="82" fontSize="10.5" fill="#171B36" fontWeight="600" fontFamily={font}>例外: 向きが欠かせないもの</text>
      <text x="262" y="99" fontSize="9.5" fill="#454C78" fontFamily={font}>小切手・ピアノのアプリ・スライド・VR(W3C)</text>
      <text x="262" y="113" fontSize="9.5" fill="#454C78" fontFamily={font}>向きを固定するゲームも、大きさの違いには対応(Apple)</text>
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

export default function TokensAdaptivePage() {
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
        <SidebarNav currentPath="/tokens/adaptive" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / ファウンデーション / アダプティブ・レスポンシブ</span>
            <span>SPEC No. 052</span>
          </div>

          <h1 style={styles.title}>アダプティブ/レスポンシブデザイン</h1>
          <p style={styles.subtitle}>4つのガイドラインが、画面の広さ・向き・ウィンドウの大きさが変わったときに、何をどう組み替え、何を保つべきとしているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>同じ内容を、画面の広さに合わせて組み替える(概念図)</span>
            <ReflowSwatch />
            <p style={styles.swatchNote}>狭い画面では下のナビゲーションと1列、広くなるにつれて横のナビゲーションと複数の区画(ペイン)に組み替えます。内容と機能は同じまま、見せ方だけを変えるのが基本です。ブレークポイントの値や余白は「レイアウト・スペーシング」ページを参照してください。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列に共通するのは、<strong>広さが変わっても内容と機能は同じに保ち、見せ方だけを組み替える</strong>という考え方です。Appleは「広さによって機能を変えない」と明言し、W3Cは「320 CSS px相当まで狭めても情報と機能を失わない」ことを求めています。
            </p>
            <p style={styles.synthesisText}>
              組み替え方を最も具体的に決めているのはGoogleです。<strong>Compactではナビゲーションバー、それより広ければナビゲーションレール</strong>に自動で切り替え、<strong>リスト・詳細/フィード/補助ペイン</strong>という3つのカノニカルレイアウトで、何列にするか(補助ペインはMediumで1:1、Expandedで7:3)まで示しています。広さが変わったときに<strong>選択中の項目や開いている詳細を保つ</strong>ルールもあります。
            </p>
            <p style={styles.synthesisText}>
              Appleは境界値を示さず、システムが決める<strong>サイズクラス(compact/regular)</strong>で判断させます。広い画面では<strong>タブバーをサイドバーに切り替え、スプリットビューで2〜3列</strong>にするなど、Googleと同じ方向の組み替えを勧めつつ、<strong>リサイズしてもプラットフォームらしいレイアウトのままにする</strong>ことを重視しています。
            </p>
            <p style={styles.synthesisText}>
              NN groupはWebのブレークポイントの目安として<strong>500px・1200px・1400px</strong>を挙げ、実際には2〜3個で十分としています。切り替えで<strong>ナビゲーションをハンバーガーに畳む・列を減らす</strong>ときは、主な行動ボタンが埋もれないかの確認を求めています。実務では、<strong>Googleの型で組み替え方を決め、W3Cの320pxと縦横両方の向きで情報と機能が残るかを確かめる</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 画面の広さが変わると、何が変わるか</h2>
            <AdaptiveChart />
            <p style={styles.chartNote}>図はそれぞれの記述をもとにした概念図で、色の帯はナビゲーション(下=バー、細い縦=レール、太い縦=サイドバー・左のナビゲーション、上の線=ハンバーガー)、四角は内容の区画です。「狭い・中くらい・広い」は比較のための便宜的な区分で、Appleはcompact/regularの2区分、Googleはウィンドウサイズクラス、NN groupはWebの画面幅(px)を基準にしています。</p>
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
                <InfoBox label="切り替えの基準" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="切り替えるもの・保つもの">{s.colorInfo}</InfoBox>
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
            <h2 style={styles.diagramTitle}>アダプティブ/レスポンシブデザイン デザインシステム比較</h2>
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
                <div style={styles.labelCell}>切り替えの基準</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>切り替えるもの・保つもの</div>
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
            <h2 style={styles.diagramTitle}>広さに合わせて「変えてよいもの」と「変えてはいけないもの」</h2>
            <p style={styles.diagramNote}>4系列の記述を、組み替えてよい要素と、どの広さでも保つべき要素に分けて整理しました。右の名前は根拠にした系列です。</p>
            <ChangeRules />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>Googleのカノニカルレイアウト3種と、Appleの近い考え方</h2>
            <p style={styles.diagramNote}>Googleは、よく使う画面構成を3つの「型」として用意し、広さに応じた組み替え方まで決めています。Appleには同じ名前の型はありませんが、スプリットビューが近い役割を持ちます。</p>
            <CanonicalLayouts />
          </section>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>向き(縦・横)の扱い</h2>
            <OrientationDiagram />
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、切り替えのルールはAndroid Developersの本文で確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Layoutページの「Adaptability」見出しへのアンカー付きリンクで、Size classes・Tab bars・Split viewsの見出しも併記しています。GoogleはM3のCanonical examplesのページに加え、内容を確認したAndroid Developersのページを併記しています。WCAGは1.4.10・1.3.4のUnderstandingページです。NN groupはBreakpoints in Responsive Designの「Four Common Breakpoints」の節です。
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
  adScroll: { overflowX: "auto" },
  adGrid: { display: "grid", gridTemplateColumns: "84px repeat(3, minmax(150px, 1fr))", minWidth: 620, border: "1px solid #E1E3F0", borderRadius: 4 },
  adHead: { fontSize: 11.5, color: "#171B36", padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", display: "flex", flexDirection: "column", gap: 1 },
  adHeadSub: { fontSize: 9.5, color: "#7E86AC" },
  adName: { fontSize: 12.5, fontWeight: 700, padding: "10px", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  adCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 4 },
  adNone: { fontSize: 14, color: "#B7BCDA", height: 30, display: "flex", alignItems: "center" },
  adText: { fontSize: 10.5, lineHeight: 1.5, color: "#2E3457" },
  crGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 12 },
  crCol: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 6px", background: "#FFFFFF" },
  crTitle: { fontSize: 12.5, fontWeight: 700, marginBottom: 8 },
  crItem: { borderTop: "1px dashed #E1E3F0", padding: "7px 0" },
  crItemTitle: { fontSize: 12, fontWeight: 700, color: "#171B36" },
  crWho: { marginLeft: 6, fontSize: 9.5, fontWeight: 400, color: "#7E86AC" },
  crItemText: { fontSize: 11, lineHeight: 1.6, color: "#454C78", marginTop: 2 },
  canGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 10 },
  canCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px", background: "#FFFFFF" },
  canName: { fontSize: 13.5, fontWeight: 700, color: "#171B36", marginBottom: 8 },
  canEn: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 400, color: "#7E86AC", marginLeft: 6 },
  canWires: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 },
  canArrow: { fontSize: 14, color: "#9EA4C4" },
  canRule: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457" },
  canUse: { fontSize: 11, lineHeight: 1.6, color: "#454C78", marginTop: 6 },
  canApple: { fontSize: 10.5, lineHeight: 1.55, color: "#454C78", borderTop: "1px dashed #E1E3F0", paddingTop: 6, marginTop: 6 },
};
