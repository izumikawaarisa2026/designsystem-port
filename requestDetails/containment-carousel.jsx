import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, PageToc } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / カルーセル」ページ。
 *
 * このページの発見: 「カルーセル」を部品として定義しているのはGoogleだけで、M3は4つのレイアウト
 * (マルチブラウズ・アンコンテインド・ヒーロー・全画面)を用途で選ぶ方式。Appleには専用ページがなく、
 * 横にめくるページの位置を示す「ページコントロール」(点の列)が最も近い。W3Cは自動で回るカルーセルを
 * 止められること(2.2.2の5秒、APGの停止ボタン・フォーカスで停止)を中心に求め、NN groupは利用者が
 * カルーセルを読み飛ばしがちで2枚目以降が見られにくいことから、5枚以下・位置の表示・スマホでは自動送り
 * しないことを勧める。「自動で送るか」については、W3CとNN groupが止める・避ける方向で一致している。
 *
 * Apple(HIG Page controls)はHIGのページデータ(JSON)を直接取得して確認(2026-10)。HIGのページデータを
 * 検索した範囲では「carousel」の語を含むページは見つからなかった。
 * Google(Carousel)はm3.material.ioがSPAのため本文は未確認。Material Components for Androidの
 * Carousel.md、Jetpack ComposeのCarousel.kt(CarouselDefaults)、Android Developersのカルーセルの
 * ページの本文で直接確認(2026-10)。
 * W3C(APG Carousel Pattern、WAI Carousels Tutorial、WCAG 2.2.2)・NN group(Carousel Usability、
 * Auto-Forwarding Carousels and Accordions Annoy Users)は本文を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "該当なし(関連: Human Interface Guidelines ― Page controls)",
    term: <NoData>該当なし</NoData>,
    color: "#C2542A",
    position: <NoData>該当なし(カルーセルのコンポーネントはない。関連: 横にめくるページの位置を点の列で示すPage controls)</NoData>,
    size: "関連(Page controls): 点は等間隔に並び、塗った点が今のページ。約10個を超えるとひと目で数えられないため、10ページを超えるなら、グリッドのように好きな順で選べる並べ方を検討する。",
    colorInfo: "関連(Page controls): 点に独自の色を付けると、今のページとの区別のコントラストが下がるため、色はシステムに任せる。特別な意味を持つ1ページだけ、独自の形の点にできる(天気アプリの現在地など)。点の形は2種類までにする。iOSでは、点の左右をタップすると前後のページへ移り、点の上をなぞる(スクラブ)と順にめくれる。",
    stance:
      "関連(Page controls): ページコントロールは、順番に並んだページの間の遷移を表すもので、階層や順不同の関係は表さない。より複雑な遷移にはサイドバーや分割ビューを使う。どこにあるか迷わないよう、ビューの下部中央に置く。なぞってめくるときは素早く何枚も進むため、ページ切り替えのアニメーションはタップのときだけにする。",
    exceptions:
      "macOSは非対応。visionOSでは表示だけで操作できない。tvOSでは、内容の多い全画面のページの集まりに使う。iOSの背景は3種類で、操作したときだけ出す(automatic)、いつも出す(prominent。主なナビゲーションのときだけ)、出さない(minimal)。minimalではなぞる操作を使わない。",
    accessibility:
      <span><NoData>記載なし。</NoData>点の色をシステムに任せる理由は、今のページの点とほかの点の区別(コントラスト)で、見分けやすさ(知覚可能)に関わる。</span>,
    useCases: [
      "点の列はビューの下部中央に置く",
      "10ページを超えるなら、グリッドなど別の並べ方を検討する",
      "点の色は独自に付けず、システムに任せる",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/page-controls#Best-practices",
    refs: [
      { label: "関連: Page controls", url: "https://developer.apple.com/design/human-interface-guidelines/page-controls#Best-practices" },
      { label: "Page controls ― iOS, iPadOS(タップ・なぞる操作)", url: "https://developer.apple.com/design/human-interface-guidelines/page-controls#iOS-iPadOS" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-10)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Carousel",
    term: "Carousel(マルチブラウズ・アンコンテインド・ヒーロー・全画面)",
    color: "#2F7D6E",
    position: "画像が中心の項目を並べ、画面の内外へ出入りさせるコンポーネント。4つのレイアウト(マルチブラウズ・アンコンテインド・ヒーロー・全画面)から用途で選ぶ",
    size: "大・中・小の項目を並べるレイアウトでは、小さい項目の幅を40〜56dpの範囲で決める(Jetpack ComposeのCarouselDefaults)。ヒーローの大きい項目は、横向きのカルーセルでは幅が高さの最大2倍で、画面が広くなると大きい項目の数が増える。",
    colorInfo: "マルチブラウズは大・中・小の項目が並び、写真のサムネイルのように多くを素早く見るとき(既定)。アンコンテインドは同じ大きさの項目が画面の端から流れ出し、項目の縦横比を保ちたいとき。ヒーローは1つの大きな項目に注目させ、次の小さな項目をのぞかせるとき(映画など)。全画面は1項目を端から端まで見せて縦にスクロールし、縦長の内容に向く。",
    stance:
      "項目は画像が中心で、短い文字を添えられ、文字は項目の大きさに合わせて変わる。スクロールで項目が縮む(マスクされる)と、文字が入りきらなくなったら隠すなどの調整をする。マルチブラウズとヒーローでは、スクロールを止めたら最寄りの項目に吸い付かせる。",
    exceptions:
      "全画面のレイアウトは縦向きのまま使い、横向きでは画像の縦横比を保つため別のレイアウトに切り替える。アンコンテインドでは、カルーセルの幅が項目の幅でほぼ割り切れると見た目が悪いため、幅に応じて項目の大きさを調整する。",
    accessibility:
      "知覚可能・操作可能 ― 自動送りや停止の手段の記載はない。縦にスクロールするページでは、横にスクロールしなくても全項目を見られる手段を用意する(カルーセルの下の「すべて表示」ボタン、見出しがあれば見出しの横の矢印のアイコンボタン48dp。全画面のレイアウトは対象外)。ボタンはカルーセルの中や横に置かず、上か下に置く。",
    useCases: [
      "写真のサムネイルのように多くを見せるならマルチブラウズ",
      "注目させたい1件があるならヒーロー、縦長の内容なら全画面",
      "スクロールを止めたら最寄りの項目に吸着させる",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/carousel/guidelines",
    refs: [
      { label: "Carousel", url: "https://m3.material.io/components/carousel/guidelines" },
      { label: "Carousel ― Guidelines(カルーセルの種類: Multi-browse・Uncontained・Hero・Full-screen)", url: "https://m3.material.io/components/carousel/guidelines" },
      { label: "補足: Material Components for Android ― Carousel(レイアウトの種類)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/Carousel.md#layouts-of-carousel" },
      { label: "MDC Android: Carousels(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/Carousel.md" },
      { label: "Android: Carousel(Jetpack Compose)", url: "https://developer.android.com/develop/ui/compose/components/carousel" },
      { label: "Compose Material 3: Carousel.kt(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/carousel/Carousel.kt" },
    ],
    confirmedNote: "アクセシビリティはM3 Carouselのページの本文(2026-11)、レイアウトの種類と使い分けはMaterial Components for AndroidのドキュメントとAndroid Developersの本文、小さい項目の幅はJetpack Composeのソースで確認(2026-10)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "APG Carousel Pattern / WCAG 2.2.2 Pause, Stop, Hide / WAI Carousels Tutorial",
    term: "Carousel(APGのパターン。aria-roledescription=\"carousel\")",
    color: "#A3821F",
    position: "自動で回るカルーセルを誰でも止められ、回転に振り回されないことを中心に求める。見た目の決まりは持たない",
    size: "カルーセル専用の時間の基準はない。2.2.2(レベルA)により、自動で始まり、5秒より長く続き、ほかの内容と並んで表示される動きには、一時停止・停止・非表示のいずれかの手段が必要。",
    colorInfo: "必要な操作コンポーネントは、前へ・次へのボタンと、任意でスライドを選ぶコンポーネント(点など)。自動で回るなら、さらに回転の停止・再開のボタンを置き、キーボードのフォーカスがカルーセルに入ったら回転を止め(利用者が求めるまで再開しない)、マウスを乗せている間も止める。停止ボタンは、カルーセルの中でTabの順番の最初に置く。",
    glossary: [
      { term: "2.2.2 Pause, Stop, Hide・レベルA", desc: "自動で始まり5秒を超えて続く動き・点滅・スクロール、自動更新される情報を、止めたり隠したりできることを求める基準。" },
      { term: "aria-roledescription", desc: "要素の役割の呼び名を変える属性。カルーセル全体にcarousel、各スライドにslideを設定し、スクリーンリーダーにカルーセルであることを伝える。" },
      { term: "ライブリージョン(aria-live)", desc: "中身が変わったときにスクリーンリーダーが読み上げる領域。自動で回っている間はoff、利用者が送るときはpoliteにする。" },
    ],
    stance:
      "見えていないスライドの隠し方を誤ったり、知らないうちに回ったりすると、スクリーンリーダーの利用者はスライド1の続きのつもりで、前触れなくスライド2を聞くことになり混乱する。動きに気を取られる人や読むのに時間がかかる人も、止められれば読める。",
    exceptions:
      "構造として、カルーセル全体をregionかgroupにしてaria-roledescription=\"carousel\"を付け、ラベルには「カルーセル」の語を含めない(役割の呼び名と重複するため)。各スライドに名前がなければ「3/10」のように番号と総数を名前にする。停止ボタンのラベルは「スライドの回転を停止」「開始」のように動作に合わせて変える。前へ・次へを押してもフォーカスは動かさず、何度でも押せるようにする。スライドを選ぶ点を1つずつボタンにすると、Tabで止まる場所が増え、キーボードの利用者には最も不便な形になる。APGの例では、OSで「視差効果を減らす/動きを減らす」が設定されていれば自動回転を最初から止め、停止ボタンはどの入力の人にも見えるよういつも出している。",
    accessibility:
      "操作可能(Operable)・堅牢(Robust) ― 2.2.2(止められる)とキーボードでの操作は「操作可能」、役割の呼び名やライブリージョンで状態を伝えることは「堅牢」に関わる。",
    useCases: [
      "自動で回すなら、停止・再開のボタンをカルーセルの最初に置く",
      "フォーカスが入ったら・マウスを乗せたら回転を止める",
      "スライドを包む要素は、自動回転中はaria-live=\"off\"、そうでなければ\"polite\"",
    ],
    searchHint: "Stops rotating when keyboard focus enters",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/",
    refs: [
      { kind: "apg", label: "APG: Carousel Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/" },
      { kind: "apg", label: "APG: Carousel ― Keyboard Interaction", url: "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/#keyboard_interaction" },
      { kind: "sc", level: "A", label: "2.2.2 一時停止・停止・非表示", url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html" },
      { label: "WAI Carousels Tutorial", url: "https://www.w3.org/WAI/tutorials/carousels/" },
      { kind: "apg", label: "APG: Auto-Rotating Image Carousel(実装例)", url: "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/" },
    ],
    confirmedNote: "APGのCarousel Pattern・WAIのCarousels Tutorial・2.2.2のUnderstandingページの本文を直接取得して確認済み(2026-10)。ページ内検索の語はAPGのページのもの。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Carousel Usability / Auto-Forwarding Carousels and Accordions Annoy Users",
    term: "Carousel",
    color: "#7A4F7E",
    position: "利用者はカルーセルを読み飛ばしがちで、2枚目以降は見られにくい。まず静的なヒーロー画像を検討し、使うなら案内と内容で効果を上げる、という実務指針(適合基準ではない)",
    size: "フレーム(枚数)は5枚以下にする。自動で送るなら、文字を読む速さを1秒に3語(英語)として表示時間を見積もる。視線計測では、動く広告のような要素が見られたのは27%だったとしている。",
    colorInfo: "全部で何枚あり、今どこかを示す。点は押すと何が出るか予想できず、スマートフォンでは気づかれにくいため、各フレームのボタンは中身が分かる見た目にする。操作コンポーネントはカルーセルの中に置き、下や画面の折り返しの先に離さない。ボタンは十分に大きく、背景が騒がしいフレームでも見えるようにする。",
    stance:
      <>同じ一等地に複数の内容を載せられるが、<Hl>多くの人は大きな画像をすぐに読み飛ばし、1枚目以外はほとんど見ない</Hl>。1枚だけを見て組織を誤解することもある。目当ての情報があっても、5秒ごとに切り替わると表示されているのは20%の時間だけで、見つけられずに諦めた例を挙げる。</>,
    exceptions:
      "自動送りは、表示時間を適切に合わせられない場合、広告に見える場合、スマートフォン(ページが短く、切り替わる頃には下へスクロールしている)では避ける。自動送りするなら最後で止めずに繰り返し、今のフレームを表示し続ける。自動送りしないなら、矢印や次の画像の端をのぞかせて、続きがあることを見た目で示す。重要な内容は、カルーセル以外の場所にも置く。",
    accessibility: "根拠となる原則 ― 適合区分ではなく、視線計測とユーザビリティテストの観察にもとづく設計の根拠。動くUIは、運動機能に障害のある人には押す前に消え、読むのが遅い人や母語でない人には読む時間が足りない。",
    useCases: [
      "フレームは5枚以下にし、何枚中の何枚目かを示す",
      "スマートフォンでは自動で送らない",
      "続きは矢印や次の画像の端で示し、重要な内容は別の場所にも置く",
    ],
    searchHint: "5 or fewer frames",
    url: "https://www.nngroup.com/articles/designing-effective-carousels/#toc-guidelines-for-good-carousel-design-5",
    refs: [
      { label: "Carousel Usability: Effective UI for Content Overload", url: "https://www.nngroup.com/articles/designing-effective-carousels/#toc-guidelines-for-good-carousel-design-5" },
      { label: "Auto-Forwarding Carousels and Accordions Annoy Users", url: "https://www.nngroup.com/articles/auto-forwarding/#toc-big-carousel-like-accordion-ignored-2" },
    ],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-10、1本目は2013年公開・2026年8月に見直し)。ページ内検索の語は1本目の記事のもの。",
  },
];

/* 画像エリア: カルーセルの構成(概念図) */
function CarouselSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 360 150" width="100%" style={{ maxWidth: 460, display: "block", margin: "0 auto" }} role="img" aria-label="カルーセルの構成の例">
      <rect x="10" y="8" width="340" height="112" rx="10" fill="#FFFFFF" stroke="#D5D9EC" />
      <rect x="22" y="18" width="236" height="92" rx="8" fill="#3C6E9E" />
      <text x="70" y="80" fontSize="12" fontWeight="700" fill="#FFFFFF" fontFamily={font}>秋の新作 2/4</text>
      <text x="70" y="96" fontSize="8.5" fill="#DDE7F2" fontFamily={font}>短い説明文</text>
      <rect x="264" y="18" width="80" height="92" rx="8" fill="#9DB8D2" />
      <rect x="30" y="26" width="34" height="18" rx="9" fill="#FFFFFF" fillOpacity="0.9" />
      <text x="47" y="38.5" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily={font}>❚❚ 停止</text>
      <circle cx="232" cy="64" r="11" fill="#FFFFFF" fillOpacity="0.92" />
      <text x="232" y="68.5" fontSize="12" fill="#171B36" textAnchor="middle" fontFamily={font}>›</text>
      <circle cx="48" cy="64" r="11" fill="#FFFFFF" fillOpacity="0.92" />
      <text x="48" y="68.5" fontSize="12" fill="#171B36" textAnchor="middle" fontFamily={font}>‹</text>
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={160 + i * 14} cy="132" r="4" fill={i === 1 ? "#171B36" : "#C9CEE3"} />)}
      <text x="270" y="134" fontSize="8.5" fill="#565D8A" fontFamily={font}>次の項目の端が見える</text>
      <text x="14" y="146" fontSize="8.5" fill="#565D8A" fontFamily={font}>停止ボタン(自動で回る場合) ・ 前へ/次へ ・ 位置の表示</text>
    </svg>
  );
}

/* 四系列比較図: 何を定めているか(◯=明記/△=部分的・条件付き/―=記載なし) */
const CAROUSEL_ROWS = [
  {
    label: "枚数",
    cells: [
      { mark: "◯", note: "点は約10個まで。超えるならグリッドなど" },
      { mark: "△", note: "画面の広さで大きい項目の数が増える" },
      { mark: "―", note: "" },
      { mark: "◯", note: "5枚以下" },
    ],
  },
  {
    label: "位置の表示",
    cells: [
      { mark: "◯", note: "点の列を下部中央。塗った点が今のページ" },
      { mark: "△", note: "次の項目を小さくのぞかせる(ヒーロー等)" },
      { mark: "△", note: "スライドを選ぶコンポーネントは任意。名前がなければ「3/10」" },
      { mark: "◯", note: "何枚中の何枚目か。点は気づかれにくい" },
    ],
  },
  {
    label: "前後の移動",
    cells: [
      { mark: "◯", note: "点の左右をタップ/なぞってめくる(iOS)" },
      { mark: "◯", note: "スクロールして最寄りの項目に吸着" },
      { mark: "◯", note: "前へ・次へのボタン。押してもフォーカスは動かさない" },
      { mark: "◯", note: "操作コンポーネントはカルーセルの中に、十分な大きさで" },
    ],
  },
  {
    label: "最後の1枚の後",
    cells: [
      { mark: "◯", note: "順番に並んだページ。なぞると先頭・末尾へ素早く移動(ループしない)" },
      { mark: "△", note: "端のある一覧。最初・最後の項目は端にそろう" },
      { mark: "△", note: "全部のスライドを見せたら自動回転を止める実装もある" },
      { mark: "◯", note: "自動送りは最後で止めず繰り返す" },
    ],
  },
  {
    label: "自動送り",
    cells: [
      { mark: "―", note: "" },
      { mark: "―", note: "記載なし" },
      { mark: "◯", note: "5秒を超えるなら止める手段(2.2.2)" },
      { mark: "◯", note: "避けるのが基本。スマホでは送らない" },
    ],
  },
  {
    label: "止める・待つ",
    cells: [
      { mark: "―", note: "" },
      { mark: "―", note: "" },
      { mark: "◯", note: "停止ボタンを最初に。フォーカス・ホバーで停止" },
      { mark: "◯", note: "送るなら1秒3語で時間を見積もる" },
    ],
  },
  {
    label: "項目の形",
    cells: [
      { mark: "△", note: "全画面のページの集まり(tvOS)" },
      { mark: "◯", note: "4つのレイアウト。小さい項目は40〜56dp" },
      { mark: "―", note: "" },
      { mark: "◯", note: "読みやすい文字と画像。押せるボタンは中身が分かる見た目に" },
    ],
  },
  {
    label: "構造・通知",
    cells: [
      { mark: "―", note: "" },
      { mark: "―", note: "" },
      { mark: "◯", note: "carousel/slideの役割の呼び名、aria-live" },
      { mark: "―", note: "" },
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
        {CAROUSEL_ROWS.map((r) => (
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

/* 自動送りで何が起きるか: 5秒ごとに5枚が切り替わると、目当ての1枚が見えているのは時間の5分の1(NN groupの例では20%) */
function AutoForwardTimeline() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const x0 = 70, x1 = 520, total = 25;
  const X = (s) => x0 + (s / total) * (x1 - x0);
  const slides = [0, 1, 2, 3, 4];
  const colors = ["#D9E4F2", "#F6D27A", "#D9E4F2", "#D9E4F2", "#D9E4F2"];
  return (
    <svg viewBox="0 0 540 132" width="100%" style={{ maxWidth: 640, display: "block", margin: "0 auto" }} role="img" aria-label="自動送りのカルーセルで、目当ての1枚が表示される時間の割合を示す図">
      <text x="0" y="30" fontSize="10.5" fontWeight="600" fill="#171B36" fontFamily={font}>表示中の枚</text>
      {slides.map((i) => (
        <g key={i}>
          <rect x={X(i * 5)} y="16" width={X(5) - X(0) - 2} height="22" rx="3" fill={colors[i]} />
          <text x={X(i * 5 + 2.5)} y="31" fontSize="9" fill="#171B36" textAnchor="middle" fontFamily={font}>{i === 1 ? "目当ての1枚" : `${(i % 5) + 1}枚目`}</text>
        </g>
      ))}
      <line x1={x0} x2={x1} y1="54" y2="54" stroke="#E1E3F0" strokeWidth="2" />
      {[0, 5, 10, 15, 20, 25].map((s) => (
        <g key={s}>
          <line x1={X(s)} x2={X(s)} y1="50" y2="58" stroke="#9EA4C4" />
          <text x={X(s)} y="70" fontSize="8.5" fill="#666D93" textAnchor="middle" fontFamily={mono}>{s}秒</text>
        </g>
      ))}
      <rect x={X(0)} y="80" width={X(5) - X(0)} height="10" fill="#5A9629" />
      <rect x={X(5)} y="80" width={X(25) - X(5)} height="10" fill="#C0503F" opacity="0.8" />
      <text x="0" y="89" fontSize="10.5" fontWeight="600" fill="#171B36" fontFamily={font}>W3C 2.2.2</text>
      <text x={X(5) + 6} y="104" fontSize="9" fill="#454C78" fontFamily={font}>5秒を超えて自動で動き続けるなら、一時停止・停止・非表示の手段が必要</text>
      <text x="0" y="124" fontSize="10.5" fontWeight="600" fill="#171B36" fontFamily={font}>NN group</text>
      <text x={x0} y="124" fontSize="9" fill="#454C78" fontFamily={font}>5秒ごとに切り替わる例では、目当ての情報が見えていたのは時間の20%だけ</text>
    </svg>
  );
}

/* Googleの4つのレイアウト */
const LAYOUTS = [
  {
    k: "multi", name: "マルチブラウズ", use: "大・中・小の項目が並び、多くを一度に素早く見る。既定のレイアウト",
    official: "写真のように、多くの項目をまとめて見るとき(Android Developers)。写真のサムネイルのギャラリー(MDC)",
    examples: ["写真アプリのアルバム・最近の写真", "最近見た商品・閲覧履歴", "カテゴリのアイコン一覧"],
  },
  {
    k: "uncontained", name: "アンコンテインド", use: "同じ大きさの項目が画面の端から流れ出る。項目の縦横比を変えない",
    official: "各項目の上下に文字やほかのUIを足せる(Android Developers)。縦横比を保つ必要があるとき(MDC)",
    examples: ["価格・評価を下に添えた商品カード", "見出し付きのニュース記事の並び", "店舗・施設のカード(住所や営業時間付き)"],
  },
  {
    k: "hero", name: "ヒーロー", use: "1つの大きな項目に注目させ、次の小さな項目をのぞかせる",
    official: "強調したい内容を目立たせるとき。映画や番組のサムネイルなど(Android Developers)",
    examples: ["動画・音楽配信のおすすめ作品", "アプリのトップの特集・新作", "旅行先・イベントの紹介"],
  },
  {
    k: "full", name: "全画面", use: "1項目を端から端まで見せ、縦にスクロールする",
    official: "幅より高さがある内容(Android Developers)。縦向きのまま使い、横向きでは別のレイアウトへ(MDC)",
    examples: ["縦長のショート動画", "ストーリー形式のお知らせ", "縦長の写真・作品を1枚ずつ見る"],
  },
];

function LayoutIcon({ k }) {
  const f = "#2F7D6E";
  return (
    <svg viewBox="0 0 120 64" width="100%" style={{ maxWidth: 150, display: "block", margin: "0 auto 6px" }} aria-hidden="true">
      <rect x="1" y="1" width="118" height="62" rx="6" fill="#F8F9FD" stroke="#E1E3F0" />
      {k === "multi" && <g><rect x="8" y="10" width="54" height="44" rx="6" fill={f} /><rect x="66" y="10" width="28" height="44" rx="6" fill={f} opacity="0.6" /><rect x="98" y="10" width="14" height="44" rx="5" fill={f} opacity="0.35" /></g>}
      {k === "uncontained" && <g>{[0, 1, 2].map((i) => <rect key={i} x={8 + i * 42} y="10" width="38" height="44" rx="6" fill={f} opacity={1 - i * 0.2} />)}</g>}
      {k === "hero" && <g><rect x="8" y="10" width="86" height="44" rx="6" fill={f} /><rect x="98" y="10" width="14" height="44" rx="5" fill={f} opacity="0.4" /></g>}
      {k === "full" && <g><rect x="40" y="4" width="40" height="56" rx="6" fill={f} /><path d="M92 26 v12 M88 34 l4 4 l4 -4" stroke="#7E86AC" strokeWidth="1.4" fill="none" /></g>}
    </svg>
  );
}

function LayoutCards() {
  return (
    <div style={styles.layoutGrid}>
      {LAYOUTS.map((l) => (
        <div key={l.k} style={styles.layoutCard}>
          <LayoutIcon k={l.k} />
          <div style={styles.layoutName}>{l.name}</div>
          <div style={styles.layoutUse}>{l.use}</div>
          <div style={styles.layoutOfficial}><span style={styles.layoutTag}>公式の用途</span>{l.official}</div>
          <div style={styles.layoutExHead}>具体例(AI提案)</div>
          <ul style={styles.layoutEx}>{l.examples.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

/* 最後の1枚の後の扱い(端の処理) */
const END_TYPES = [
  {
    k: "stop", name: "端で止まる(リニア)", how: "最後の1枚では「次へ」が働かない(または消える)。最初に戻るには前へ送る",
    who: "Apple(ページコントロールは順番に並んだページ。なぞると先頭・末尾へ素早く移動できる)/Google(端のある一覧。最初と最後の項目は端にそろう)",
    fit: "手順・使い方の案内のように順番に意味があるもの、写真や商品を手で送って見る一覧",
  },
  {
    k: "loop", name: "最後の次は1枚目に戻る(ループ)", how: "最後の1枚の「次へ」で1枚目に戻り、1枚目の「前へ」で最後へ移る",
    who: "NN group(自動送りなら、最後で止めずに繰り返し、今のフレームを表示し続ける)",
    fit: "自動で送る特集・お知らせ(ただし止める手段は必須)",
  },
  {
    k: "once", name: "1周したら自動送りを止める", how: "自動送りで全部のスライドを見せたら回転を止め、あとは手で送る",
    who: "W3C(APGは、自動回転が全部のスライドを見せたら止まる実装もあると説明)",
    fit: "自動送りしたいが、動き続けることで読む邪魔をしたくないとき",
  },
];

function EndIcon({ k }) {
  const c = "#3C5A73";
  const dots = [0, 1, 2, 3].map((i) => <rect key={i} x={10 + i * 26} y="14" width="20" height="26" rx="4" fill={i === 3 ? c : "#D9E4F2"} />);
  return (
    <svg viewBox="0 0 130 64" width="100%" style={{ maxWidth: 170, display: "block", margin: "0 auto 6px" }} aria-hidden="true">
      {dots}
      {k === "stop" && <g><line x1="114" x2="114" y1="8" y2="46" stroke="#C0503F" strokeWidth="2.5" /><text x="65" y="60" fontSize="8.5" fill="#565D8A" textAnchor="middle">4/4で止まる</text></g>}
      {k === "loop" && <g><path d="M110 44 C110 58, 20 58, 20 44" stroke="#5A9629" strokeWidth="2" fill="none" /><path d="M20 44 l-4 6 M20 44 l5 5" stroke="#5A9629" strokeWidth="2" /><text x="65" y="62" fontSize="8.5" fill="#565D8A" textAnchor="middle">4/4 → 1/4</text></g>}
      {k === "once" && <g><rect x="104" y="4" width="20" height="10" rx="2" fill="#A3821F" /><text x="114" y="12" fontSize="6.5" fill="#FFFFFF" textAnchor="middle">❚❚</text><text x="65" y="60" fontSize="8.5" fill="#565D8A" textAnchor="middle">1周で自動回転を停止</text></g>}
    </svg>
  );
}

function EndBehavior() {
  return (
    <div style={styles.layoutGrid}>
      {END_TYPES.map((t) => (
        <div key={t.k} style={styles.layoutCard}>
          <EndIcon k={t.k} />
          <div style={styles.endName}>{t.name}</div>
          <div style={styles.layoutUse}>{t.how}</div>
          <div style={styles.endWho}>{t.who}</div>
          <div style={styles.layoutOfficial}><span style={styles.layoutTag}>向いている場面</span>{t.fit}</div>
        </div>
      ))}
    </div>
  );
}

/* SP版とPC版の違い */
const DEVICE_ROWS = [
  {
    aspect: "送る操作",
    sp: "スワイプが中心。ただしスワイプは軌跡のあるジェスチャーなので、前へ・次へのボタンなど1回のタップでできる代わりも用意する(W3C 2.5.1・APG)。iOSのページコントロールは点の左右をタップ/なぞる(Apple)",
    pc: "前へ・次へのボタンをクリック、キーボードはTabでボタンに移ってEnter(APG)。macOSはページコントロールに対応していない(Apple)",
  },
  {
    aspect: "自動送り",
    sp: "しない。ページが短く、切り替わる頃には下へスクロールしているため見られず、ページも重くなる(NN group)",
    pc: "するなら停止ボタンを置き、マウスを乗せている間・フォーカスがある間は止める(APG)。表示時間は1秒3語で見積もる(NN group)",
  },
  {
    aspect: "止めるきっかけ",
    sp: "ホバーがないため、停止ボタンを常に見えるようにする(APGの実装例)",
    pc: "ホバー・キーボードのフォーカスで自動的に止まる(APG)+停止ボタン",
  },
  {
    aspect: "続きの示し方",
    sp: "点は気づかれにくい。次の画像の端をのぞかせる(NN group・Googleのヒーロー/マルチブラウズ)",
    pc: "中身が分かるボタン(画像+文字)や矢印を、カルーセルの中に十分な大きさで置く(NN group)",
  },
  {
    aspect: "項目の見せ方",
    sp: "全画面のレイアウトは縦向きで縦にスクロール(Google)。操作コンポーネントが画面からはみ出さないよう注意(NN groupのiPhoneでの例)",
    pc: "画面が広いほどヒーローの大きい項目の数が増えるなど、ウィンドウの幅に合わせて並びが変わる(Google)",
  },
];

function DeviceTable() {
  return (
    <div style={styles.devList}>
      <div className="dsp-desktop-only" style={{ ...styles.devRow, ...styles.devHeadRow }}>
        <div style={styles.devAspect} />
        <div style={styles.devHead}>SP版(スマートフォン・タッチ)</div>
        <div style={styles.devHead}>PC版(マウス・キーボード)</div>
      </div>
      {DEVICE_ROWS.map((r) => (
        <div key={r.aspect} style={styles.devRow}>
          <div style={styles.devAspect}>{r.aspect}</div>
          <div style={styles.devCell}><span style={styles.devWho}>SP</span>{r.sp}</div>
          <div style={styles.devCell}><span style={styles.devWho}>PC</span>{r.pc}</div>
        </div>
      ))}
    </div>
  );
}

/* カルーセルを使う前に: 代わりの選択肢(NN group・Apple) */
const ALTERNATIVES = [
  { t: "静的なヒーロー画像", d: "伝えたいことが1つなら、1枚を固定で見せる方が見られやすい", who: "NN group" },
  { t: "グリッド", d: "同じ階層のページが10を超えるなら、好きな順で選べるグリッドに", who: "Apple" },
  { t: "ページの中に並べる", d: "重要な内容はカルーセルだけに置かず、情報設計の中にも置く", who: "NN group" },
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
const LEAD = "同じ場所で、複数の項目を横に送りながら順番に見せるコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "限られた場所で、画像などの複数の項目を1つずつ(または少しずつ)見せる" },
  { k: "よく使われる場面", v: "トップページの特集、商品写真の切り替え、おすすめの横スクロール" },
  { k: "似たコンポーネント", v: <>全部を一度に見せて比べさせるなら<PageLink to="/components/containment/list">リスト</PageLink>や<PageLink to="/components/containment/card">カード</PageLink>の並び</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "スライドを自動で送る?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "多くの場面で避ける(表示時間を合わせられない、広告に見える、スマートフォンでは切り替わる頃には下へスクロールしている)。送るなら最後で止めずに繰り返す" },
      { who: "W3C", color: "#A3821F", t: "自動で始まり5秒より長く続くなら、一時停止・停止・非表示の手段が要る(2.2.2・A)。APGの例は、動きを減らす設定なら最初から止め、停止ボタンを常に見せる" },
      { who: "Google・Apple", color: "#2F7D6E", t: "自動送りの記載なし。Googleは、横にスクロールしなくても全項目を見られる「すべて表示」を求める。Appleのページコントロールは、ページの切り替えのアニメーションをタップのときだけにする" },
    ],
    tip: "自動送りは基本的に使わず、続きがあることを見た目(次の画像の端や矢印)で示す。どうしても自動で送るなら、停止ボタンを最初から見える位置に置き(W3C)、表示時間を読む速さに合わせる(NN group)。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "自動送りは基本的に使わない", d: "", who: "NN group" },
  { n: 2, t: "続きがあることを見た目で示す", d: "次の項目の端や矢印", who: "AI解釈" },
  { n: 3, t: "自動で送るなら停止ボタンを置く", d: "5秒より長く続くなら止める手段が要る", who: "W3C 2.2.2" },
  { n: 4, t: "位置を示す点は約10個まで", d: "", who: "Apple" },
];

export default function ContainmentCarouselPage() {
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
        <SidebarNav currentPath="/components/containment/carousel" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / カルーセル</span>
            <span>SPEC No. 058</span>
          </div>

          <h1 style={styles.title}>カルーセル</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ(カルーセルの構成)"
            image={<><CarouselSwatch /></>}
            imageNote={<>前へ・次へのボタン、位置を示す点、次の項目の端、自動で回る場合の停止ボタンで構成した概念図だ。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <PageToc />

          <SplitSection splits={SPLITS} />



          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四系列比較図 ― 何を定めているか</h2>
            <RuleMatrix />
            <p style={styles.chartNote}>◯=明記されている、△=部分的・条件付き、―=記載なし。Appleの欄はカルーセルではなく、最も近いページコントロールの指針だ。</p>
          </div>

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              「カルーセル」をコンポーネントとして定義しているのは<strong>Googleだけ</strong>で、M3は<strong>4つのレイアウト(マルチブラウズ・アンコンテインド・ヒーロー・全画面)</strong>を用途で選ぶ方式だ。Appleには専用のページがなく、横にめくるページの位置を点で示す<strong>ページコントロール</strong>が最も近い指針だ(点は約10個まで、下部中央)。
            </p>
            <p style={styles.synthesisText}>
              一方、W3CとNN groupは、カルーセルの<strong>危うさ</strong>を中心に扱っている。WCAGの2.2.2は、<strong>自動で始まり、5秒を超えて続き、ほかの内容と並んで表示される動き</strong>に、一時停止・停止・非表示などの手段を求める(要件)。APGのカルーセルは、それとは別に、<strong>停止ボタンを最初に置き、フォーカスやホバーで止める</strong>ことを設計に含めている(実装の参考)。NN groupは、利用者が<strong>カルーセルを読み飛ばしがちで2枚目以降は見られにくい</strong>ことから、<strong>5枚以下・何枚目かの表示・スマホでは自動で送らない</strong>ことを勧めている。
            </p>
            <p style={styles.synthesisText}>
              自動送りについては、AppleとGoogleには記載がない。W3CとNN groupは、どちらも<strong>自動送りに慎重で、送るなら止められるようにする</strong>方向で一致している。
            </p>
            <p style={styles.synthesisText}>
              実務では、<strong>まず静的なヒーロー画像やグリッドで足りないかを考え、カルーセルにするならGoogleのレイアウトから用途に合うものを選び、5枚以下・位置の表示・次の項目の端を見せ、自動では送らない(送るなら止められる)</strong>のが、4系列を合わせた結論だ。
            </p>
          </div>
          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>Google ― 4つのレイアウトの使い分けと具体例</h2>
            <p style={styles.diagramNote}>M3のカルーセルは、見せたい内容に合わせてレイアウトを選ぶ。「公式の用途」はAndroid Developers・Material Components for Androidに書かれている例、「具体例」はその用途に当てはまる場面をAIが挙げたものだ(図は概念図)。</p>
            <LayoutCards />
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
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="枚数・大きさ・時間" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="位置の示し方・操作">{s.colorInfo}</InfoBox>
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
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>枚数・大きさ・時間</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>位置の示し方・操作</div>
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

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>自動送りで何が起きるか(W3C・NN group)</h2>
            <AutoForwardTimeline />
            <p style={styles.chartNote}>5秒ごとに切り替わるカルーセルの概念図だ。目当ての内容が載っている1枚は、表示されている時間の一部でしか見えない。W3Cは5秒を超える自動の動きに止める手段を求め、NN groupは自動送りそのものを避けるよう勧めている。</p>
          </div>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>最後の1枚の後の扱い</h2>
            <p style={styles.diagramNote}>最後まで送ったあとに止まるか、1枚目に戻るかは、系列によって考え方が違う。下の名前は根拠にした系列だ。</p>
            <EndBehavior />
            <div style={styles.aiNote}><strong>AI解釈: </strong>手で送るカルーセルは<strong>端で止める</strong>のが基本だ(Apple・Googleとも端のある一覧として扱う)。端で止めると「4/4」の表示や次の項目の端が見えなくなることで終わりが伝わる。自動で送るなら、NN groupは繰り返しを、W3Cは1周で止める実装も認めており、どちらでも<strong>5秒を超えて動くなら止める手段が必要(2.2.2)</strong>だ。ループにする場合は「4/4 → 1/4」のように位置の表示で1枚目に戻ったことを伝える。4系列とも、継ぎ目なく無限に続くループについての記述は見当たらなかった。</div>
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>SP版とPC版の違い</h2>
            <p style={styles.diagramNote}>タッチで使うスマートフォンと、マウス・キーボードで使うPCでは、送り方・自動送り・止めるきっかけが変わる。かっこ内は根拠にした系列だ。</p>
            <DeviceTable />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>カルーセルにする前に考えたい代わりの形</h2>
            <div style={styles.altGrid}>
              {ALTERNATIVES.map((a) => (
                <div key={a.t} style={styles.altCard}>
                  <div style={styles.altTitle}>{a.t}</div>
                  <div style={styles.altText}>{a.d}</div>
                  <div style={styles.altWho}>{a.who}</div>
                </div>
              ))}
            </div>
          </section>


          <RelatedPages paths={["/components/containment/card", "/components/containment/list", "/components/navigation/pagination", "/tokens/motion"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["情報の整理・一覧", "見つけやすさ・初めての案内"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
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
  ruleGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, minmax(120px, 1fr))", minWidth: 640, border: "1px solid #E1E3F0", borderRadius: 4 },
  ruleHead: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#FFFFFF" },
  ruleLabel: { fontSize: 11, color: "#454C78", fontWeight: 600, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", lineHeight: 1.5 },
  ruleCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 2 },
  ruleMark: { fontSize: 15, fontWeight: 700, lineHeight: 1.1 },
  ruleNote: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5 },
  layoutGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: 10 },
  layoutCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  layoutName: { fontSize: 12.5, fontWeight: 700, color: "#2F7D6E" },
  layoutUse: { fontSize: 11, lineHeight: 1.6, color: "#454C78", marginTop: 3 },
  layoutOfficial: { fontSize: 11, lineHeight: 1.6, color: "#2E3457", background: "#F3F6FA", borderRadius: 4, padding: "6px 8px", marginTop: 6 },
  layoutTag: { display: "block", fontSize: 9.5, fontWeight: 700, color: "#3C5A73", marginBottom: 2 },
  layoutExHead: { fontSize: 10, fontWeight: 700, color: "#666D93", marginTop: 6 },
  layoutEx: { margin: "2px 0 0", paddingLeft: 16, fontSize: 11, lineHeight: 1.6, color: "#454C78" },
  endName: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  endWho: { fontSize: 10, lineHeight: 1.55, color: "#666D93", marginTop: 4 },
  aiNote: { fontSize: 11.5, lineHeight: 1.7, color: "#2E3457", background: "#FAFCEE", borderLeft: "3px solid #5A9629", padding: "8px 12px", marginTop: 12, borderRadius: "0 3px 3px 0" },
  devList: { display: "flex", flexDirection: "column", border: "1px solid #E1E3F0", borderRadius: 4 },
  devRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "4px 14px", padding: "9px 12px", borderBottom: "1px solid #EEF0F7" },
  devHeadRow: { background: "#F8F9FD" },
  devHead: { fontSize: 11.5, fontWeight: 700, color: "#171B36" },
  devAspect: { fontSize: 12, fontWeight: 700, color: "#171B36" },
  devCell: { fontSize: 11, lineHeight: 1.6, color: "#2E3457" },
  devWho: { display: "inline-block", fontSize: 9, fontWeight: 700, color: "#FFFFFF", background: "#3C5A73", borderRadius: 3, padding: "0 5px", marginRight: 6 },
  altGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10 },
  altCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  altTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  altText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 4 },
  altWho: { fontSize: 9.5, color: "#666D93", marginTop: 5 },
};
