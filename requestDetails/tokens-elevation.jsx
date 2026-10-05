import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「エレベーション・階層表現(影・半透明素材)」ページ。
 *
 * このページの発見: 重なりの表現方法は、Googleが「影の高さ(dp)の段階」、Appleが
 * 「半透明の素材(Liquid Glass・マテリアル)」と、手段がまったく異なる。一方で、暗い画面
 * では影が見えにくいため「上の層ほど明るい色にする」という点では、Apple(base/elevated
 * の背景色)・Google(トーンで明るくなるsurface container)・NN group(暗い要素は下、
 * 明るい要素は上)の3系列が独立に同じ結論に達している。W3Cには重なりそのものの基準は
 * なく、上に重なった要素でフォーカス中の部品が完全に隠れないこと(2.4.11)を求める。
 *
 * Apple(HIG Materials・Dark Mode)はHIGのページデータ(JSON)を直接取得して確認済み(2026-09)。
 * Google(Elevation)はJetpack Composeのトークン定義(レベル0〜5のdp値)と、Material Components
 * for Androidのダークテーマ・カラーのドキュメントで直接確認(2026-09)。W3C(2.4.11/1.4.11)・
 * NN group(Flat-Design Best Practices、Dark Mode: How Users Think About It and Issues to Avoid)
 * は本文を直接取得して確認済み(2026-09)。
 *
 * 2026-10 追記: ユーザーから「階層ごとの役割、カラー、シャドールールについても知りたい」「Appleも
 * 厚さという定義で階層を示しているので、そのルールが分かれば」というフィードバックを受け、
 * (1)GoogleのLevel 0〜5ごとの役割・面の色・影・使う部品(Composeの各部品のトークン定義、影の値は
 * Google公式のWeb版コンポーネントmaterial-webのelevation定義)、(2)Appleの2つの層と標準マテリアルの
 * 厚さ4段階の推奨用途(HIG Materials)・影を付ける場面(HIG Multitasking・Pointing devices・Tab bars・
 * Windows)のセクションを追加した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Materials / Dark Mode",
    color: "#C2542A",
    position: "影の段階ではなく、背景が透けて見える「素材(マテリアル)」で層を表す方式。操作系はLiquid Glass、コンテンツ内は標準マテリアル(4段階の厚さ)を使い分ける",
    size: null,
    colorInfo: null,
    stance:
      "マテリアルは、背景の色を前景へ透過させることで、文字や操作部品を背景の内容から視覚的に分け、今どこにいるかの感覚を保つためのものとしています(ページ本文を直接確認、2026-09)。",
    exceptions:
      "Liquid Glassの効果は目立つため、独自の部品に使う場合は最も重要な操作に限り、控えめに使うよう求めています。背後の内容が十分に暗い場合や、独自の暗い層を持つ標準の動画再生コントロールを使う場合は、暗い層を敷く必要はないとしています。visionOSには独立したダークモードがなく、ウィンドウのガラス素材が周囲の明るさに自動で合わせます。",
    accessibility:
      "知覚可能(Perceivable) ― 透明度を下げる設定(Reduce Transparency)やコントラストを上げる設定(Increase Contrast)を有効にすると、Liquid Glassの見え方が変わるとしています。半透明の素材の上でも文字を読めるよう、システムのバイブラントカラーを使うことが前提です。",
    useCases: null,
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/materials#Liquid-Glass",
    urlSecondary: [
      { label: "Standard materials", url: "https://developer.apple.com/design/human-interface-guidelines/materials#Standard-materials" },
      { label: "Dark Mode: iOS, iPadOS(base/elevated)", url: "https://developer.apple.com/design/human-interface-guidelines/dark-mode#iOS-iPadOS" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Elevation / Dark theme",
    color: "#2F7D6E",
    position: "面の高さを6段階のエレベーション(dp)で表し、影の深さで重なりを示す方式。ダークテーマでは影が見えにくいため、上の面ほど明るい色(トーン)にする",
    size: null,
    colorInfo: null,
    stance:
      "ダークテーマの背景を真っ黒ではなく濃いグレーにしているのは、影を見えやすくし、明るい文字による目の負担を減らすためだと説明しています(Material Components for Androidのドキュメントとトークン定義で直接確認、2026-09)。",
    exceptions:
      "どのコンポーネントがどのレベルを使うか、ホバーやドラッグで高さがどう変わるかといった指針はm3.material.io(SPA)にあり、本文は直接確認できていません。",
    accessibility:
      "―(エレベーションそのものについての専用のアクセシビリティ基準は確認できていません)。影だけで層を区別すると、暗い画面や低いコントラストでは違いが伝わりにくいため、ダークテーマでは色の明るさでも区別する設計になっています。",
    useCases: null,
    searchHint: "",
    url: "https://m3.material.io/styles/elevation/overview",
    urlSecondary: [
      { label: "Compose Material 3 ElevationTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ElevationTokens.kt" },
      { label: "MDC Android: Dark theme(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。レベルの値はJetpack Composeのトークン定義、ダークテーマでの扱いはMaterial Components for Androidのドキュメントで直接確認(2026-09)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.4.11 Focus Not Obscured (Minimum) / 1.4.11 Non-text Contrast",
    color: "#A3821F",
    position: "重なりの表現方法は規定しない。上に重なった要素によって、キーボードでフォーカスした部品が完全に隠れないことを求める",
    size: "影・重なりについての数値基準はありません。2.4.11(レベルAA): 部品がキーボードのフォーカスを受けたとき、制作者が作ったコンテンツ(固定ヘッダー、画面下に固定されたバナー、非モーダルのダイアログなど)によって、その部品が完全に隠れないこと。",
    colorInfo: "1.4.11では、入力欄の立体的な影などは、明るさが最も近い色の一部とみなしてコントラストを計算するとしています。つまり影は部品を識別する手がかりとしては数えられず、影があってもなくても、部品の境界や中身そのものが識別できる必要があります。",
    glossary: [
      { term: "2.4.11 Focus Not Obscured (Minimum)・レベルAA", desc: "フォーカスを受けた部品が、固定ヘッダーやバナーなど制作者が作った重なりによって完全に隠れないことを求める基準。一部が隠れるのはこの基準では許容される。" },
      { term: "1.4.11 Non-text Contrast・レベルAA", desc: "部品の識別や状態の把握に必要な視覚情報に、隣接色との3:1以上のコントラストを求める基準。" },
    ],
    stance:
      "WCAGは、影や半透明の素材で層を表すこと自体は問いません。問題にするのは、重なった層の結果として、キーボードで操作している人が今どこにフォーカスがあるかを見失うことです。画面上部に固定したヘッダーや下部のCookieバナーの下にフォーカスが入り込んで見えなくなる、というのが典型的な失敗です。",
    exceptions:
      "利用者が自分で開いた内容(メニューなど)がフォーカスを隠していても、フォーカスを移さずにその内容を閉じたり動かしたりできれば、隠れているとはみなしません。利用者が位置を動かせる要素は、初期位置で判定します。",
    accessibility: "操作可能(Operable) ― 2.4.11はPOURの「操作可能」に属し、キーボードや代替入力で操作する人が、フォーカスの位置を目で追えることを目的としています。1.4.11は「知覚可能」に属します。",
    useCases: [
      "固定ヘッダー・固定フッターの下にフォーカスが隠れないよう、スクロール位置を調整する(scroll-paddingなど)",
      "Cookieバナーなど固定表示の要素が、フォーカス中の部品を完全に覆わないか確認する",
      "影だけに頼らず、部品の境界や中身で識別できるようにする",
    ],
    searchHint: "not entirely hidden",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html#success-criterion",
    urlSecondary: [
      { label: "1.4.11 Non-text Contrast", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#adjacent-colors" },
    ],
    confirmedNote: "2つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Flat-Design Best Practices / Dark Mode: Issues to Avoid",
    color: "#7A4F7E",
    position: "影や重なりは、要素の関係を伝える手がかりとして使うべきで、見た目の装飾のためだけに使うべきではない、という実務指針(適合基準ではない)",
    size: "数値基準ではなく原則としての言及です。完全にフラットなデザインではなく、控えめな影・ハイライト・重なりで奥行きを加えた「フラット2.0(セミフラット)」を、多くの製品に勧めています。",
    colorInfo: "ダークモードでは、白い要素に暗い影を付けるような重なりの表現がそのまま使えず、黒い背景に黒い要素を置いて明るい影を付けると、影ではなく光っているように見えるとしています。暗い画面で奥行きを出すには、一番下の面を最も暗く、手前(利用者に近い)の要素ほど明るい色にするのがよいとしています。",
    stance:
      "フラットデザインは押せる場所の手がかりを失いやすいため、控えめな3Dの影や重なりを加えて要素どうしの関係を明確にするよう勧めています。Material Designが影と層のルールを体系化した点を評価しつつ、実際には影や層が利用者の理解を助けるためではなく、見た目のためだけに使われていることが多いと指摘しています(記事本文を直接取得して確認済み、2026-09)。",
    exceptions:
      "モーダルと背景を区別するための暗い半透明の幕(スクリム)は、ダークモードでは背景との差が小さくなり、ほとんど見えなくなることがあるとしています。浮いて見せたい要素(フローティングボタンなど)は、ライト・ダークの両方で同じように目立つか確認するよう勧めています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、ユーザビリティテスト・視線計測に基づく設計上の根拠です。",
    useCases: [
      "影や重なりは、要素の関係(手前/奥、押せる/押せない)を伝える目的で使う",
      "ダークモードでは、手前の要素ほど明るい色にして奥行きを出す",
      "モーダルのスクリムや浮いている要素が、ダークモードでも見分けられるか確認する",
    ],
    searchHint: "Add back in some depth",
    url: "https://www.nngroup.com/articles/flat-design-best-practices/",
    urlSecondary: [{ label: "Dark Mode: How Users Think About It and Issues to Avoid", url: "https://www.nngroup.com/articles/dark-mode-users-issues/#toc-dark-mode-issues-to-avoid-3" }],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-09)。",
  },
];

/* 画像エリア: 影で表す(ライト)と明るさで表す(ダーク) */
function DepthSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 320 130" width="100%" style={{ maxWidth: 440, display: "block", margin: "0 auto" }} role="img" aria-label="ライトとダークでの重なりの表し方">
      <defs>
        <filter id="elvShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#171B36" floodOpacity="0.28" />
        </filter>
      </defs>
      <rect x="6" y="6" width="148" height="100" rx="8" fill="#F3F4F9" />
      <rect x="26" y="22" width="108" height="44" rx="8" fill="#FFFFFF" filter="url(#elvShadow)" />
      <text x="80" y="48" fontSize="9.5" fill="#171B36" textAnchor="middle" fontFamily={font}>影で浮かせる</text>
      <text x="80" y="122" fontSize="9.5" fill="#565D8A" textAnchor="middle" fontFamily={font}>ライト: 影で重なりを表す</text>
      <rect x="166" y="6" width="148" height="100" rx="8" fill="#111318" />
      <rect x="186" y="22" width="108" height="44" rx="8" fill="#2A2D34" />
      <rect x="200" y="50" width="80" height="44" rx="8" fill="#3A3E47" />
      <text x="240" y="76" fontSize="9.5" fill="#E7E9F5" textAnchor="middle" fontFamily={font}>手前ほど明るく</text>
      <text x="240" y="122" fontSize="9.5" fill="#565D8A" textAnchor="middle" fontFamily={font}>ダーク: 明るさで重なりを表す</text>
    </svg>
  );
}

/* 四サイト比較図: 高さの段階と、ダークでの明るさ */
const LEVELS = [0, 1, 3, 6, 8, 12];
const DARK_TONES = [["Lowest", 4, "#0F0D13"], ["Low", 10, "#1D1B20"], ["標準", 12, "#211F26"], ["High", 17, "#2B2930"], ["Highest", 22, "#36343B"]];

function ElevationChart() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const x0 = 96;
  return (
    <svg viewBox="0 0 560 212" width="100%" style={{ maxWidth: 660, display: "block", margin: "0 auto" }} role="img" aria-label="エレベーションの段階とダークでの明るさの比較図">
      <text x="0" y="22" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Google</text>
      <text x={x0} y="12" fontSize="9" fill="#7E86AC" fontFamily={font}>影の高さ(Level 0〜5, dp)</text>
      {LEVELS.map((v, i) => (
        <g key={i}>
          <rect x={x0 + i * 58} y={46 - v * 2.2} width="40" height={Math.max(v * 2.2, 1)} fill="#2F7D6E" opacity="0.75" />
          <text x={x0 + 20 + i * 58} y="58" fontSize="9" fill="#454C78" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{v}</text>
        </g>
      ))}
      <text x={x0} y="76" fontSize="9" fill="#7E86AC" fontFamily={font}>ダークでの面の明るさ(neutralのトーン)</text>
      {DARK_TONES.map(([n, t, hex], i) => (
        <g key={n}>
          <rect x={x0 + i * 70} y="82" width="60" height="22" rx="4" fill={hex} stroke="#E1E3F0" strokeWidth="0.6" />
          <text x={x0 + 30 + i * 70} y="96.5" fontSize="8" fill="#E7E9F5" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{hex}</text>
          <text x={x0 + 30 + i * 70} y="115" fontSize="8.5" fill="#454C78" textAnchor="middle" fontFamily={font}>{n}・トーン{t}</text>
        </g>
      ))}
      <text x="0" y="140" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Apple</text>
      <text x={x0} y="140" fontSize="9.5" fill="#454C78" fontFamily={font}>影の段階なし。素材の厚さ4段階 / ダークは base(暗)→ elevated(明)</text>
      <text x="0" y="168" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>W3C</text>
      <text x={x0} y="168" fontSize="9.5" fill="#454C78" fontFamily={font}>表現方法の規定なし。重なりでフォーカスが完全に隠れないこと(2.4.11)</text>
      <text x="0" y="196" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>NN group</text>
      <text x={x0} y="196" fontSize="9.5" fill="#454C78" fontFamily={font}>数値なし。ダークでは一番下を最も暗く、手前ほど明るく</text>
    </svg>
  );
}

/* Google・Appleの階層ルール。
   Google: 高さ=Compose ElevationTokens、部品の割り当てと面の色=Composeの各部品のトークン定義
   (ContainerElevation / ContainerColor / Hover・Dragged時の値)、影=Google公式のWeb版コンポーネント
   (material-web)のelevationの定義(キーの影30%+周囲の影15%の2枚重ね。影の色はどちらのテーマでも黒)。
   Apple: HIG Materials・Dark Mode(層と厚さ)、Multitasking・Pointing devices・Tab bars・Windows(影)。
   2026-10: 「Google・Appleの詳細ルールのまとめ方が煩雑」というフィードバックを受け、
   (1)役割ごとに両者を横に並べた対応図、(2)同じ観点で並べたルール比較表、(3)詳しい値、の3段構成に整理した(2026-10-04、詳しい値は折りたたまず常に表示に変更)。 */
const G_SHADOW = {
  0: "none",
  1: "0 1px 2px 0 rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)",
  2: "0 1px 2px 0 rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15)",
  3: "0 1px 3px 0 rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15)",
  4: "0 2px 3px 0 rgba(0,0,0,.3), 0 6px 10px 4px rgba(0,0,0,.15)",
  5: "0 4px 4px 0 rgba(0,0,0,.3), 0 8px 12px 6px rgba(0,0,0,.15)",
};

/* 役割で並べた対応図。Google・Appleの公式の対応表ではなく、役割の近さでAIが並べたもの */
const TIERS = [
  {
    role: "画面の地",
    desc: "画面そのもの。浮かせない",
    g: { lv: 0, dp: 0, surf: "Surface", dark: "#141218", parts: "アプリバー(スクロール前)、ナビゲーションレール、常時表示のドロワー、塗りつぶし・枠線のカード、タブ" },
    a: { kind: "base", name: "コンテンツの層 ― システムの背景色", parts: "通常の画面。ダークでは暗いbaseの組を使い、奥に引いて見せる" },
  },
  {
    role: "少し浮かせたまとまり",
    desc: "背景と区別して、ひとまとまりを示す",
    g: { lv: 1, dp: 1, surf: "Surface Container Low", dark: "#1D1B20", parts: "浮いたカード、Elevatedボタン、浮いたチップ、ボトムシート、モーダルのドロワー" },
    a: { kind: "material", name: "コンテンツの層 ― 標準マテリアル", parts: "内容の中の区別。厚さ4段階で、厚いほど文字が読みやすく、薄いほど背後が見える(iOS/iPadOSの既定はregular)" },
  },
  {
    role: "常に乗っている操作の層",
    desc: "内容の上に浮かぶナビゲーション・操作",
    g: { lv: 2, dp: 3, surf: "Surface Container", dark: "#211F26", parts: "ナビゲーションバー、メニュー、ボトムアプリバー、スクロール中のトップアプリバー、リッチツールチップ" },
    a: { kind: "glass", name: "機能の層 ― Liquid Glass", parts: "タブバー・ツールバー・サイドバー。既定のregularと、写真や動画の上だけに使うclearの2種類" },
  },
  {
    role: "手前に出て注意を引く",
    desc: "内容より前に出る・作業を中断させる",
    g: { lv: 3, dp: 6, surf: "Surface Container High", dark: "#2B2930", parts: "FAB、ダイアログ、日付/時刻ピッカー、検索バー、スナックバー" },
    a: { kind: "elevated", name: "前面の画面 ― elevatedの背景色", parts: "ポップオーバー・シート。ダークでは自動で明るいelevatedの組に切り替わる。文字の多いアラートはLiquid Glass(regular)" },
  },
  {
    role: "操作中だけ持ち上げる",
    desc: "ホバー・ドラッグの間だけ",
    g: { lv: 4, dp: 8, surf: "(色の割り当てなし)", dark: null, parts: "FABのホバー時、チップ・浮いたカード・リスト項目のドラッグ中" },
    a: { kind: "lift", name: "ポインターのリフト効果", parts: "iPadOSで要素を少し拡大し、下に影・上に光沢を付けて持ち上げる" },
  },
];

function ApplePreview({ kind }) {
  if (kind === "base") return <div style={{ ...styles.apPrevBox, background: "#F2F2F7" }}><span style={styles.apPrevSolid}>背景</span></div>;
  if (kind === "material") return <div style={styles.apPrevGrad}><span style={{ ...styles.apPrevPane, background: "rgba(255,255,255,0.65)" }}>Aa</span></div>;
  if (kind === "glass") return <div style={styles.apPrevGrad}><span style={styles.apPrevGlass}>● ● ●</span></div>;
  if (kind === "elevated") return (
    <div style={{ ...styles.apPrevBox, background: "#1C1C1E" }}>
      <span style={{ ...styles.apPrevPane, background: "#3A3A3C", color: "#E6E0E9" }}>前面</span>
    </div>
  );
  return <div style={{ ...styles.apPrevBox, background: "#F2F2F7" }}><span style={styles.apPrevLift}>↑</span></div>;
}

function GooglePreview({ g }) {
  return (
    <div style={styles.gPrevWrap}>
      <div style={{ ...styles.gPrevCard, boxShadow: G_SHADOW[g.lv] }}>
        <span style={styles.gPrevLv}>Level {g.lv}</span>
        <span style={styles.gPrevDp}>{g.dp}dp</span>
      </div>
      {g.dark ? (
        <div style={{ ...styles.gPrevDark, background: g.dark }}>
          <span style={styles.gPrevDarkText}>{g.dark}</span>
        </div>
      ) : (
        <div style={{ ...styles.gPrevDark, background: "transparent", borderStyle: "dashed" }}>
          <span style={styles.gPrevNone}>ダークの色なし</span>
        </div>
      )}
    </div>
  );
}

function TierMap() {
  return (
    <>
      <div className="dsp-desktop-only">
        <div style={styles.tierHeadGrid}>
          <span style={styles.tierHeadCell}>役割</span>
          <span style={{ ...styles.tierHeadCell, color: "#2F7D6E" }}>Google ― 影の高さ(Level)+面の色</span>
          <span style={{ ...styles.tierHeadCell, color: "#C2542A" }}>Apple ― 層と素材</span>
        </div>
      </div>
      <div style={styles.tierList}>
        {TIERS.map((t) => (
          <div key={t.role} className="elv-tier-row" style={styles.tierRow}>
            <div style={styles.tierRole}>
              <div style={styles.tierRoleName}>{t.role}</div>
              <div style={styles.tierRoleDesc}>{t.desc}</div>
            </div>
            <div style={styles.tierSide}>
              <span className="elv-side-label" style={{ ...styles.tierSideLabel, color: "#2F7D6E" }}>Google</span>
              <div style={styles.tierSideBody}>
                <GooglePreview g={t.g} />
                <div style={{ minWidth: 0 }}>
                  <div style={styles.tierName}>Level {t.g.lv}・{t.g.dp}dp / {t.g.surf}</div>
                  <div style={styles.tierParts}>{t.g.parts}</div>
                </div>
              </div>
            </div>
            <div style={styles.tierSide}>
              <span className="elv-side-label" style={{ ...styles.tierSideLabel, color: "#C2542A" }}>Apple</span>
              <div style={styles.tierSideBody}>
                <ApplePreview kind={t.a.kind} />
                <div style={{ minWidth: 0 }}>
                  <div style={styles.tierName}>{t.a.name}</div>
                  <div style={styles.tierParts}>{t.a.parts}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p style={styles.chartNote}>Googleの白いカードは実際の影の値で描画し、その下はダークテーマでの面の色です。Level 5(12dp)は段階としては定義されていますが、標準部品の既定値では使われていません。Appleの図は層の関係を示す概念図です。この対応は役割の近さでAIが並べたもので、公式の対応表ではありません。</p>
    </>
  );
}

/* 同じ観点でGoogle・Appleのルールを並べる */
const RULE_AXES = [
  { axis: "高さを何で表すか", g: "影の深さ(面の高さ dp)", a: "素材の透け具合(半透明の層)" },
  { axis: "段階", g: "Level 0〜5 = 0 / 1 / 3 / 6 / 8 / 12dp の6段階", a: "層が2つ(機能の層=Liquid Glass / コンテンツの層=標準マテリアル)+標準マテリアルの厚さ4段階(ultraThin・thin・regular・thick)。数値はなし" },
  { axis: "段階の選び方", g: "部品ごとに既定のLevelが決まっている(上の対応図)", a: "見た目の色ではなく、意味と推奨用途で選ぶ。iOS/iPadOSは厚さを用途別に指定しておらず、既定はregular" },
  { axis: "面の色・上の文字", g: "段階ごとにSurface Containerの色がセットで決まる", a: "素材は背景の色を透過する。上に載せる文字・塗りはバイブラントカラー(文字4段階・塗り3段階・区切り線1段階)を使う" },
  { axis: "影", g: "全段階で2枚重ね(真下の濃い影30%+周囲の薄い影15%)。段階が上がるほど下にずれ、ぼかしが広がる", a: "基本はシステムが付ける(macOSのウィンドウ、iPadOSのリフト効果、tvOSのフォーカス中のタブ、visionOSのウィンドウ)。独自に付けるなら影だけにせず拡大と組み合わせる" },
  { axis: "ダークモード", g: "影は黒のままで見えにくいため、上の面ほど明るいトーンにする(6→10→12→17→22)", a: "背景色をbase(暗)とelevated(明)の2組で持ち、前面に出た画面は自動でelevatedになる" },
  { axis: "状態の変化", g: "ホバーで1段上がる(浮いたカード1→2、FAB 3→4)。ドラッグ中は3〜4。押した瞬間は上げない", a: "ポインターのホバーでリフト効果(拡大+影+光沢)。周りに余白がない要素は影と拡大を使わず色味(tint)だけ" },
];

function RuleAxesTable() {
  return (
    <>
      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.axesGrid}>
            <div style={styles.lvHead}>観点</div>
            <div style={{ ...styles.lvHead, color: "#2F7D6E", fontWeight: 700 }}>Google</div>
            <div style={{ ...styles.lvHead, color: "#C2542A", fontWeight: 700 }}>Apple</div>
            {RULE_AXES.map((r) => (
              <React.Fragment key={r.axis}>
                <div style={styles.lvCellStrong}>{r.axis}</div>
                <div style={styles.lvCell}>{r.g}</div>
                <div style={styles.lvCell}>{r.a}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="dsp-mobile-only" style={styles.sourceList}>
        {RULE_AXES.map((r) => (
          <div key={r.axis} style={styles.sourceCard}>
            <div style={styles.axisMobileTitle}>{r.axis}</div>
            <p style={styles.lvMobileText}><strong style={{ color: "#2F7D6E" }}>Google: </strong>{r.g}</p>
            <p style={styles.lvMobileText}><strong style={{ color: "#C2542A" }}>Apple: </strong>{r.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* 詳しい値(常に表示) */
const G_LEVELS = [
  { lv: 0, dp: 0, key: "なし", amb: "なし", color: "部品の色そのまま(Surface など)", dark: "#141218" },
  { lv: 1, dp: 1, key: "0 1px 2px 0", amb: "0 1px 3px 1px", color: "Surface Container Low", dark: "#1D1B20" },
  { lv: 2, dp: 3, key: "0 1px 2px 0", amb: "0 2px 6px 2px", color: "Surface Container", dark: "#211F26" },
  { lv: 3, dp: 6, key: "0 1px 3px 0", amb: "0 4px 8px 3px", color: "Surface Container High(FABはPrimary Container、スナックバーはInverse Surface)", dark: "#2B2930" },
  { lv: 4, dp: 8, key: "0 2px 3px 0", amb: "0 6px 10px 4px", color: "(状態の変化で一時的に使う)", dark: null },
  { lv: 5, dp: 12, key: "0 4px 4px 0", amb: "0 8px 12px 6px", color: "―(標準部品の既定値では未使用)", dark: null },
];

function GoogleLevelTable() {
  return (
    <>
      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.lvGrid}>
            {["段階", "濃い影(30%)", "周囲の影(15%)", "面の色", "ダークでの色"].map((h) => (<div key={h} style={styles.lvHead}>{h}</div>))}
            {G_LEVELS.map((l) => (
              <React.Fragment key={l.lv}>
                <div style={styles.lvCellStrong}>Level {l.lv} <span style={styles.lvDp}>{l.dp}dp</span></div>
                <div style={styles.lvCellMono}>{l.key}</div>
                <div style={styles.lvCellMono}>{l.amb}</div>
                <div style={styles.lvCell}>{l.color}</div>
                <div style={styles.lvCellMono}>{l.dark ? (<><span style={{ ...styles.hexDot, background: l.dark }} />{l.dark}</>) : "―"}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="dsp-mobile-only" style={styles.sourceList}>
        {G_LEVELS.map((l) => (
          <div key={l.lv} style={styles.sourceCard}>
            <div style={styles.axisMobileTitle}>Level {l.lv} <span style={styles.lvDp}>{l.dp}dp</span></div>
            <p style={styles.lvMobileText}><strong>影: </strong><span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{l.key} / {l.amb}</span></p>
            <p style={styles.lvMobileText}><strong>面の色: </strong>{l.color}{l.dark ? `(ダーク ${l.dark})` : ""}</p>
          </div>
        ))}
      </div>
      <p style={styles.chartNote}>影の値はGoogle公式のWeb版コンポーネント(Material Web)の定義(x y ぼかし 広がり)。AndroidではOSの影の描画に高さ(dp)を渡します。影の色はどちらのテーマでも黒(Shadowロール)です。</p>
    </>
  );
}

const A_THICKNESS = [
  { name: "ultraThin", op: 0.25, view: "最も透ける", tv: "ライトの配色が必要な全画面のビュー", vision: "―", note: "Quaternary(4段階目)の文字は使わない" },
  { name: "thin", op: 0.45, view: "よく透ける", tv: "画面の一部を覆うオーバーレイ(ライトの配色)", vision: "ボタンや選択中の項目など、操作できる要素に注意を向ける", note: "Quaternaryの文字は使わない" },
  { name: "regular", op: 0.65, view: "標準(iOS/iPadOSの既定)", tv: "画面の一部を覆うオーバーレイ", vision: "サイドバーやグループ化した表など、セクションを分ける", note: "" },
  { name: "thick", op: 0.85, view: "最も不透明", tv: "画面の一部を覆うオーバーレイ(ダークの配色)", vision: "通常の背景の上でも目立つ、暗い要素を作る", note: "" },
];

function AppleThicknessDetail() {
  return (
    <>
      <div style={styles.apThickRow}>
        {A_THICKNESS.map((t) => (
          <div key={t.name} style={styles.apThickItem}>
            <div style={styles.apThickBg}>
              <div style={{ ...styles.apThickGlass, background: `rgba(255,255,255,${t.op})` }}>Aa</div>
            </div>
            <div style={styles.apThickName}>{t.name}</div>
            <div style={styles.apThickView}>{t.view}</div>
          </div>
        ))}
      </div>
      <div style={styles.matrixScroll}>
        <div style={styles.apTable}>
          {["厚さ", "tvOSでの推奨用途", "visionOSでの使い方", "文字の注意"].map((h) => (<div key={h} style={styles.lvHead}>{h}</div>))}
          {A_THICKNESS.map((t) => (
            <React.Fragment key={t.name}>
              <div style={styles.lvCellStrong}>{t.name}</div>
              <div style={styles.lvCell}>{t.tv}</div>
              <div style={styles.lvCell}>{t.vision}</div>
              <div style={styles.lvCell}>{t.note || "―"}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <p style={styles.chartNote}>厚さごとの推奨用途が具体的に書かれているのはtvOSとvisionOSです。macOSは用途ごとに名前の付いた標準マテリアルがあり、背景の混ぜ方をウィンドウの後ろ(behind window)とウィンドウ内(within window)から選びます。透け具合の図は概念図です。</p>
    </>
  );
}

const A_SHADOWS = [
  { where: "macOS のウィンドウ", rule: "最前面のウィンドウが後ろのウィンドウに影を落とし、重なりの順番を示す(システムが自動で付ける)" },
  { where: "iPadOS のポインター(リフト効果)", rule: "要素を少し拡大し、下に影・上に光沢を付けて持ち上がったように見せる" },
  { where: "独自のホバー効果", rule: "影だけを付けず、必ず拡大と組み合わせる。拡大しないと影があっても近づいて見えない。周りに余白がない要素は影と拡大を使わず色味(tint)だけにする" },
  { where: "tvOS のタブバー", rule: "フォーカスした状態で、選択中のタブに影を付けて強調する" },
  { where: "visionOS のウィンドウ", rule: "ガラスの背景と、システムが付ける光沢・影で、ウィンドウの大きさと位置、部品の奥行きを伝える" },
];

function AppleShadowRules() {
  return (
    <div>
      {A_SHADOWS.map((r) => (
        <div key={r.where} style={styles.shadowRow}>
          <span style={styles.shadowWhere}>{r.where}</span>
          <span style={styles.shadowRule}>{r.rule}</span>
        </div>
      ))}
    </div>
  );
}

function Fold({ title, children }) {
  return (
    <div style={styles.fold}>
      <div style={styles.foldSummary}>{title}</div>
      <div style={styles.foldBody}>{children}</div>
    </div>
  );
}

/* Google・Appleは下の「階層ルール」セクションで詳しく比べているため、比較表では重複を省いて案内だけ出す */
function SeeBelow() {
  return (
    <a href="#elv-rules" style={styles.seeBelow}>↓ 下の「Google・Appleの階層ルール」で比較</a>
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

export default function TokensElevationPage() {
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
          .elv-tier-row { grid-template-columns: 150px 1fr 1fr !important; }
          .elv-side-label { display: none !important; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/tokens/elevation" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / ファウンデーション / エレベーション・階層表現</span>
            <span>SPEC No. 047</span>
          </div>

          <h1 style={styles.title}>エレベーション・階層表現(影・半透明素材)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、要素の重なり(手前と奥)を影・素材・色でどう表すかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>重なりの表し方(ライトとダーク)</span>
            <DepthSwatch />
            <p style={styles.swatchNote}>明るい画面では影で要素を浮かせられますが、暗い画面では影が背景に溶けて見えません。そのため暗い画面では、手前の面ほど明るい色にして重なりを表します。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              重なりの表し方は、GoogleとAppleで<strong>手段がまったく違います</strong>。Googleは面の高さを<strong>0・1・3・6・8・12dpの6段階の影</strong>で表し、Appleは影の段階を持たず、<strong>背景が透けて見える素材(Liquid Glass・4段階の厚さの標準マテリアル)</strong>で層を分けます。
            </p>
            <p style={styles.synthesisText}>
              段階ごとの役割もはっきりしています。Googleは<strong>Level 0=画面に貼り付いた面、1=少し浮いたカード、2=常に乗っている操作の層(ナビゲーションバー・メニュー)、3=注意を引く部品(FAB・ダイアログ)</strong>と割り当て、影と面の色をセットで変えます。Appleは<strong>操作の層(Liquid Glass)と内容の層(標準マテリアル)を分け、内容の層の中は素材の厚さ4段階</strong>で区別し、厚いほど文字が読みやすく、薄いほど背後の文脈が見えるとしています。</p>
            <p style={styles.synthesisText}>
              ところが暗い画面になると、答えがそろいます。Appleは<strong>前面に出た画面の背景を暗いbaseから明るいelevatedに自動で切り替え</strong>、Googleは<strong>上の面ほど明るいトーン(neutral 4→22)</strong>にし、NN groupも<strong>一番下を最も暗く、手前ほど明るく</strong>と勧めています。暗い画面では影が見えないという同じ問題に、3系列が独立に同じ解決策を出しています。
            </p>
            <p style={styles.synthesisText}>
              W3Cには重なりの表し方の基準はありません。代わりに、<strong>固定ヘッダーやバナーなど上に重なった要素で、キーボードのフォーカスが完全に隠れないこと(2.4.11)</strong>を求めます。影や素材の見た目より、重なりの結果として操作を見失わないかを問題にしています。
            </p>
            <p style={styles.synthesisText}>
              NN groupは、影や重なりが<strong>見た目の装飾ではなく、要素の関係を伝えるために使われるべき</strong>だと指摘しています。実務では、Googleの段階またはAppleの素材で層の意味を決めたうえで、<strong>ダークモードでも層が見分けられるか、重なりの下にフォーカスが隠れないか</strong>を確かめるのが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 重なりの表し方</h2>
            <ElevationChart />
            <p style={styles.chartNote}>Googleの上段は影の高さ(dp)、下段はダークテーマでの面の色の明るさ(neutralパレットのトーン、0=黒・100=白)です。Appleは影の段階を持たず、素材の厚さとダークモードの背景色の2組で重なりを表します。</p>
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
                {s.size ? <InfoBox label="高さ・素材の段階" accent="#3C5A73">{s.size}</InfoBox> : <SeeBelow />}
                {s.colorInfo && <InfoBox label="層の分け方とダークでの扱い">{s.colorInfo}</InfoBox>}
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                {s.useCases && <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>}
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
            <h2 style={styles.diagramTitle}>エレベーション・階層表現 デザインシステム比較</h2>
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
                <div style={styles.labelCell}>高さ・素材の段階</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size || <SeeBelow />}</div>))}
                <div style={styles.labelCell}>層の分け方とダークでの扱い</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo || <SeeBelow />}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.useCases ? <UseCaseList items={s.useCases} /> : <SeeBelow />}</div>))}
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

          <section id="elv-rules" style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>Google・Appleの階層ルール ― 役割ごとに並べて比較</h2>
            <p style={styles.diagramNote}>Googleは「影の高さ(Level)」、Appleは「層と素材」と表し方は違いますが、どの役割の面をどう浮かせるかで並べると対応関係が見えます。①役割ごとの対応図 → ②同じ観点で並べたルール → ③詳しい値、の順に読めるようにしています。</p>
            <h3 style={styles.subTitle}>① 役割ごとの対応図(奥 → 手前)</h3>
            <TierMap />
            <h3 style={styles.subTitle}>② ルールを同じ観点で比較</h3>
            <RuleAxesTable />
            <h3 style={styles.subTitle}>③ 詳しい値</h3>
            <Fold title="Google ― Level 0〜5の影の値と面の色"><GoogleLevelTable /></Fold>
            <Fold title="Apple ― 標準マテリアルの厚さ4段階の推奨用途"><AppleThicknessDetail /></Fold>
            <Fold title="Apple ― 影が付く場面と、独自に付けるときの注意"><AppleShadowRules /></Fold>
          </section>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、数値とダークテーマでの扱いはGoogle公式のドキュメント・ソースで確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Materialsページの「Liquid Glass」見出しへのアンカー付きリンクで、標準マテリアルとダークモードのbase/elevatedの見出しも併記しています。GoogleはM3のElevationページに加え、数値を確認したGitHub上の公式ソースを併記しています。WCAGは2.4.11 Understandingページの達成基準の箇所と、1.4.11の隣接色の節です。NN groupはフラットデザインの実践記事と、ダークモードの記事の「避けるべき問題」の節です。
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
  seeBelow: { fontSize: 11.5, color: "#3C5A73", textDecoration: "none", lineHeight: 1.6 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  subTitle: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "18px 0 8px" },
  ruleSection: { marginBottom: 26 },
  lvGrid: { display: "grid", gridTemplateColumns: "110px 130px 130px 1fr 110px", minWidth: 700, border: "1px solid #E1E3F0" },
  hexDot: { display: "inline-block", width: 12, height: 12, borderRadius: 3, border: "1px solid #D5D9EC", marginRight: 5, verticalAlign: "-2px" },
  axesGrid: { display: "grid", gridTemplateColumns: "130px 1fr 1fr", minWidth: 680, border: "1px solid #E1E3F0" },
  axisMobileTitle: { fontWeight: 700, fontSize: 13, color: "#171B36" },
  tierHeadGrid: { display: "grid", gridTemplateColumns: "150px 1fr 1fr", gap: 12, padding: "0 12px 6px" },
  tierHeadCell: { fontSize: 11, fontWeight: 700, color: "#565D8A" },
  tierList: { display: "flex", flexDirection: "column", gap: 8 },
  tierRow: { display: "grid", gridTemplateColumns: "1fr", gap: 12, border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px" },
  tierRole: { minWidth: 0 },
  tierRoleName: { fontSize: 13, fontWeight: 700, color: "#171B36" },
  tierRoleDesc: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5, marginTop: 2 },
  tierSide: { minWidth: 0 },
  tierSideLabel: { display: "block", fontSize: 10.5, fontWeight: 700, marginBottom: 4 },
  tierSideBody: { display: "flex", gap: 12, alignItems: "flex-start" },
  tierName: { fontSize: 11.5, fontWeight: 700, color: "#171B36", lineHeight: 1.5 },
  tierParts: { fontSize: 11, color: "#2E3457", lineHeight: 1.6, marginTop: 2 },
  gPrevWrap: { width: 76, flexShrink: 0, display: "flex", flexDirection: "column", gap: 6, background: "#F3F4F9", borderRadius: 6, padding: 6 },
  gPrevCard: { background: "#FFFFFF", borderRadius: 6, height: 34, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  gPrevLv: { fontSize: 9.5, fontWeight: 700, color: "#171B36", lineHeight: 1.2 },
  gPrevDp: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#565D8A" },
  gPrevDark: { height: 20, borderRadius: 4, border: "1px solid #D5D9EC", display: "flex", alignItems: "center", justifyContent: "center" },
  gPrevDarkText: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 8.5, color: "#E6E0E9" },
  gPrevNone: { fontSize: 8, color: "#9EA4C4" },
  apPrevBox: { width: 76, height: 66, flexShrink: 0, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #E1E3F0" },
  apPrevGrad: { width: 76, height: 66, flexShrink: 0, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #C2542A, #3A4FCF 55%, #2F7D6E)" },
  apPrevSolid: { fontSize: 10, color: "#565D8A" },
  apPrevPane: { width: 52, height: 36, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#171B36" },
  apPrevGlass: { padding: "6px 10px", borderRadius: 999, background: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.9)", fontSize: 8, color: "#171B36", letterSpacing: 1 },
  apPrevLift: { width: 40, height: 30, borderRadius: 6, background: "#FFFFFF", transform: "scale(1.08)", boxShadow: "0 6px 12px rgba(0,0,0,.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#565D8A" },
  fold: { border: "1px solid #E1E3F0", borderRadius: 6, marginBottom: 12, background: "#FFFFFF" },
  foldSummary: { padding: "10px 12px", borderBottom: "1px solid #EEF0F7", fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  foldBody: { padding: "10px 12px 12px" },
  lvHead: { fontSize: 10.5, color: "#565D8A", background: "#F8F9FD", padding: "7px 8px", borderBottom: "1px solid #E1E3F0" },
  lvCell: { fontSize: 11, lineHeight: 1.6, color: "#2E3457", padding: "8px", borderBottom: "1px solid #EEF0F7", minWidth: 0 },
  lvCellStrong: { fontSize: 11.5, fontWeight: 700, color: "#171B36", padding: "8px", borderBottom: "1px solid #EEF0F7" },
  lvCellMono: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, lineHeight: 1.7, color: "#3C5A73", padding: "8px", borderBottom: "1px solid #EEF0F7" },
  lvDp: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 400, color: "#565D8A" },
  lvMobileText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", margin: "6px 0 0" },
  apThickRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 },
  apThickItem: { textAlign: "center", minWidth: 0 },
  apThickBg: { height: 70, borderRadius: 8, background: "linear-gradient(135deg, #C2542A, #3A4FCF 55%, #2F7D6E)", display: "flex", alignItems: "center", justifyContent: "center", padding: 8 },
  apThickGlass: { width: "100%", height: "100%", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#171B36" },
  apThickName: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, color: "#171B36", marginTop: 4 },
  apThickView: { fontSize: 10, color: "#565D8A", lineHeight: 1.4 },
  apTable: { display: "grid", gridTemplateColumns: "90px 1.4fr 1.6fr 1fr", minWidth: 640, border: "1px solid #E1E3F0" },
  shadowRow: { display: "grid", gridTemplateColumns: "minmax(120px, 200px) 1fr", gap: 10, borderBottom: "1px dashed #E1E3F0", padding: "6px 0" },
  shadowWhere: { fontSize: 11.5, fontWeight: 700, color: "#171B36" },
  shadowRule: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
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
};
