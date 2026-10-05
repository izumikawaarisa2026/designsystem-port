import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「ダークモード」ページ。
 *
 * このページの発見: 4系列とも「ダークモードは端末の設定に従う(アプリ独自の切り替えを
 * 前提にしない)」という点で一致している。一方で、NN groupが紹介する研究では、正常な視力の
 * 人は多くの場合ライトモードの方が読み取りの成績が良く、ダークモードを既定にすることは
 * 勧めていない。Appleはダークモードで最低4.5:1、独自の色では7:1を目指すよう数値で示して
 * おり、これはWCAGのAA(4.5:1)より高いAAA相当の水準である。W3Cにはダークモードそのものの
 * 基準はなく、どちらの見た目でも同じコントラスト基準が適用される。
 *
 * Apple(HIG Dark Mode)はHIGのページデータ(JSON)を直接取得して確認済み(2026-09)。
 * Google(Dark theme)はMaterial Components for Androidのダークテーマ・カラーのドキュメントで
 * 直接確認(2026-09)。W3C(1.4.3・1.4.8)・NN group(Dark Mode vs. Light Mode、
 * Dark Mode: How Users Think About It and Issues to Avoid)は本文を直接取得して確認済み(2026-09)。
 *
 * 2026-10 追記: ユーザーから「ダークモード内のカラールール、エレベーションルールを細かく記載して」
 * 「四サイト比較図が何を示しているかわからない」というフィードバックを受け、(1)四サイト比較図を
 * 「ライトからダークで背景・文字・アクセント色がどう変わるか」を色見本で並べる表に作り直し、
 * (2)「カラールール」(Googleの全カラーロールのトーン=material-color-utilitiesのcolor_spec_2021.ts、
 * 色見本=Jetpack ComposeのPaletteTokens、AppleのシステムカラーのRGB値=HIG Colorの表の画像の代替テキスト)と
 * (3)「エレベーションルール」(Googleの部品ごとの面の色=Composeの各部品のトークン定義、Appleの
 * base/elevated=HIG Dark Mode)のセクションを追加した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Dark Mode",
    color: "#C2542A",
    position: "端末全体の外観設定に従い、アプリ独自の外観設定は置かない。意味で定義されたシステムカラーが、ライト/ダークで自動的に切り替わる方式",
    size: "コントラスト比は最低でも4.5:1を下回らないこと。独自の文字色・背景色を使う場合は、特に小さい文字で7:1を目指すよう勧めています。",
    colorInfo: "ダークモードの配色は、背景を暗く、前景を明るくしたものですが、ライトの色を単純に反転したものではなく、反転しない色もあるとしています。独自の色が必要な場合は、明るい版と暗い版を持つカラーセットを作り、固定の色値を使わないよう求めています。iOS/iPadOSでは背景色に暗いbaseと明るいelevatedの2組があり、前面に出た画面は自動的に明るい方になります。",
    stance:
      "ダークモードを既定の外観に選ぶ人は多く、そうした人はすべてのアプリがその設定に従うことを期待しているとしています。アプリ独自の外観設定は、利用者に複数の設定を調整させ、端末の設定に反応しないアプリは壊れていると思われかねないため、避けるべきだとしています。時間帯で自動的に切り替わる「自動」設定もあるため、アプリの実行中に外観が変わっても問題ないようにする必要があります(ページ本文を直接確認、2026-09)。",
    exceptions:
      "動画や写真の鑑賞のように、UIを目立たせず内容に集中させたいアプリでは、常にダークの外観だけを使うことも「まれなケース」として認めています(例: 株価アプリ)。ダークモードはvisionOSとwatchOSでは提供されていません。白い背景を含む画像は、ダークモードの中で光って見えないよう少し暗くすることを勧めています。",
    accessibility:
      "知覚可能(Perceivable) ― ダークモードで、コントラストを上げる設定(Increase Contrast)と透明度を下げる設定(Reduce Transparency)をそれぞれ・同時に有効にして、暗い背景の上の暗い文字が読みにくくなっていないか確認するよう求めています。",
    useCases: [
      "アプリ独自のライト/ダーク切り替えは置かず、端末の設定に従う",
      "固定の色値ではなく、ライト/ダークで切り替わるシステムカラーやカラーセットを使う",
      "独自の色は、ダークモードでも小さい文字で7:1を目指す",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/dark-mode#Dark-Mode-colors",
    urlSecondary: [
      { label: "Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/dark-mode#Best-practices" },
      { label: "iOS, iPadOS(base/elevated)", url: "https://developer.apple.com/design/human-interface-guidelines/dark-mode#iOS-iPadOS" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Dark theme / Color roles",
    color: "#2F7D6E",
    position: "同じカラーロールに、ライトとダークで異なるトーン(明るさ)を割り当てる方式。端末の設定に合わせて自動で切り替わるDayNightテーマを基本にする",
    size: "コントラスト比の数値基準は確認できていません。基準の配色では、ロールごとにトーン(0=黒〜100=白)を入れ替えます。例: primary 40→80、on primary 白→20、surface 98→6、on surface 10→90(いずれもライト→ダーク)。",
    colorInfo: "ダークテーマの背景と面は、真っ黒ではなく濃いグレー(neutral 6)です。影を見えやすくし、明るい文字による目の負担を減らすためとしています。ブランドの色も、ダークテーマ用に調整された既定値が用意されています。Android 12以降では、壁紙から生成されたシステムの配色(ダイナミックカラー)を使うこともできます。",
    stance:
      "ダークテーマの利点として、有機ELの画面での電池の節約、目の負担の軽減、暗い場所での見やすさを挙げています。Android 10以降は端末全体のダークテーマ設定があり、DayNightテーマを使えば、1つのテーマ定義でライトとダークを切り替えられるとしています(Material Components for Androidのドキュメントで直接確認、2026-09)。",
    exceptions:
      "ライトとダークを別々のテーマとして定義することもできます(固定のダークテーマ)。ダークテーマでブランドの色をどう調整するかの詳しい指針は、Material Designの仕様ページ側にあるとしています。",
    accessibility:
      "知覚可能(Perceivable) ― ロールの組み合わせ(例: primaryとon primary)は、ライト・ダークのどちらでもトーンの差が大きく取られており、文字と背景のコントラストを保つ設計です。ただし具体的なコントラスト比の保証内容は確認できていません。",
    useCases: [
      "色は固定値ではなくカラーロールで指定し、ライト/ダークはテーマで切り替える",
      "ダークテーマの背景は真っ黒ではなく、濃いグレーのsurfaceを使う",
      "端末の設定に従うDayNightテーマを基本にする",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/color/roles",
    urlSecondary: [
      { label: "MDC Android: Dark theme(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md" },
      { label: "MDC Android: Color theming(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。トーンの割り当てとダークテーマの扱いは、Material Components for Androidのドキュメントで直接確認(2026-09)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.3 Contrast (Minimum) / 1.4.8 Visual Presentation",
    color: "#A3821F",
    position: "ダークモードそのものの基準はなく、どちらの見た目でも同じコントラスト基準が適用される。背景色と文字色は必ず組で指定することを求める",
    size: "ダークモード専用の数値はありません。ライト・ダークのどちらの見た目でも、1.4.3(レベルAA)の本文4.5:1・大きな文字3:1、1.4.11のUI部品3:1がそのまま適用されます。",
    colorInfo: "1.4.3の注記では、文字色を指定して背景色を指定しない(またはその逆の)場合、利用者の既定の色が分からずコントラストを評価できないため不合格としています。ダークモードの切り替えで片方の色だけが変わる、というのは典型的な失敗につながります。1.4.8(レベルAAA)は、文章の前景色と背景色を利用者が選べる仕組みを求めています。",
    glossary: [
      { term: "1.4.3 Contrast (Minimum)・レベルAA", desc: "本文テキストは4.5:1以上、大きな文字は3:1以上のコントラスト比を求める基準。見た目がライトかダークかにかかわらず適用される。" },
      { term: "1.4.8 Visual Presentation・レベルAAA", desc: "文章の色・行の幅・揃え方・行間・拡大を利用者が調整できる仕組みを求める基準。前景色と背景色を利用者が選べることを含む。" },
    ],
    stance:
      "WCAGは、ライトとダークのどちらを使うべきかを定めていません。求めるのは、提供するどの見た目でもコントラストの基準を満たすことです。ダークモードを用意するなら、ダークの配色も1.4.3・1.4.11で確認する必要があります。",
    exceptions:
      "1.4.3は、非活性の部品・純粋な装飾・誰にも見えない文字・ロゴの文字を適用除外としています。1.4.8はレベルAAAで、多くのサイトが目標とするAAには含まれません。",
    accessibility: "知覚可能(Perceivable) ― 1.4.3・1.4.8はいずれもPOURの「知覚可能」に属し、弱視や色覚に特性のある人、まぶしさに敏感な人が文字を読めることを目的としています。",
    useCases: [
      "ライト・ダークの両方の配色で、4.5:1(本文)・3:1(大きな文字・UI部品)を確認する",
      "文字色と背景色は必ず組で指定し、片方だけを切り替えない",
      "ダークモードの彩度の高い色が、暗い背景に対して基準を満たすか確認する",
    ],
    searchHint: "default background color is unknown",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    urlSecondary: [
      { label: "1.4.8 Visual Presentation", url: "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html#success-criterion" },
    ],
    confirmedNote: "2つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Dark Mode vs. Light Mode / Dark Mode: Issues to Avoid",
    color: "#7A4F7E",
    position: "研究の文献調査と利用者調査に基づき、「ダークモードは既定にはしないが、切り替えられるようにする」「端末の設定に従う」とする実務指針(適合基準ではない)",
    size: "数値基準ではなく研究結果の紹介です。紹介されている研究では、正常な視力の人は年齢を問わずライトモードの方が視力検査・校正作業の成績が良く、その差は文字が小さいほど大きくなりました。疲労の指標にはライト/ダークで有意な差はありませんでした。一方、白内障などの人はダークモードの方が成績が良い場合があるとしています。115人のスマートフォン利用者への調査では、ダーク・ライト・両方を使う人がほぼ3分の1ずつでした。",
    colorInfo: "ダークモードでよくある問題として、白い背景が見えてしまう画像、暗い背景で見えにくくなるモーダルの幕(スクリム)、細すぎる/太すぎる文字、暗い背景の上の彩度の高い色、見えにくくなる区切り線、色が反転して読み取れなくなるQRコードなどを挙げています。文字の色は、1つの色の不透明度を変えて使い分けると、異なる背景に対応しやすいとしています。",
    stance:
      "一般の利用者を対象とする場合、ダークモードを既定にすることは勧めていません。一方で、長期的な影響の可能性、視覚障害のある人の一部はダークの方が見やすいこと、単に好む人がいることから、切り替えられるようにすることを強く勧めています。利用者はダークモードをアプリごとではなく端末全体の設定として考えているため、既定では端末の設定に従うべきだとしています(記事本文を直接取得して確認済み、2026-09)。",
    exceptions:
      "ダークモードに力を入れるべきなのは、1回の利用時間が長い(電子書籍・ニュース)、利用頻度が高い(メッセージ)、暗い場所で使われる(動画配信)、写真や動画が少ない、という条件に当てはまる場合だとしています。調査では、ダークモードに対応していないサイトに移っても、利用者はほとんど気にせず使い続けていました。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、研究の文献調査・ユーザー調査・ユーザビリティテストに基づく設計上の根拠です。",
    useCases: [
      "既定では端末のライト/ダーク設定に従う",
      "長時間読むサービスでは、ダークモードへの切り替えを用意する",
      "画像の背景・モーダルの幕・区切り線・QRコードがダークでも機能するか確認する",
    ],
    searchHint: "Mirror the device",
    url: "https://www.nngroup.com/articles/dark-mode/#toc-takeaways-5",
    urlSecondary: [{ label: "Dark Mode: How Users Think About It and Issues to Avoid", url: "https://www.nngroup.com/articles/dark-mode-users-issues/#toc-dark-mode-best-practices-4" }],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-09)。ページ内検索の語は2本目の記事(Issues to Avoid)のものです。",
  },
];

/* 画像エリア: ライトとダークで入れ替わる明るさ */
function ModeSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const card = (x, bg, surf, fg, sub, btn, btnFg, label) => (
    <g>
      <rect x={x} y="6" width="148" height="100" rx="8" fill={bg} stroke="#E1E3F0" strokeWidth="0.8" />
      <rect x={x + 12} y="18" width="124" height="48" rx="6" fill={surf} />
      <text x={x + 22} y="36" fontSize="10" fill={fg} fontFamily={font} fontWeight="600">見出しテキスト</text>
      <text x={x + 22} y="52" fontSize="8.5" fill={sub} fontFamily={font}>本文のサンプルです</text>
      <rect x={x + 12} y="74" width="64" height="22" rx="11" fill={btn} />
      <text x={x + 44} y="88.5" fontSize="8.5" fill={btnFg} textAnchor="middle" fontFamily={font}>ボタン</text>
      <text x={x + 74} y="122" fontSize="9.5" fill="#565D8A" textAnchor="middle" fontFamily={font}>{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 320 130" width="100%" style={{ maxWidth: 440, display: "block", margin: "0 auto" }} role="img" aria-label="ライトとダークの配色の例">
      {card(6, "#FAF9FD", "#EEEDF4", "#1B1B21", "#46464F", "#3F51B5", "#FFFFFF", "ライト")}
      {card(166, "#121318", "#1F1F25", "#E4E1E9", "#C7C5D0", "#B9C3FF", "#1A2678", "ダーク(反転ではなく明るさを再設計)")}
    </svg>
  );
}

/* 四サイト比較図: ライトからダークに切り替えたとき、何がどう変わるか。
   Apple: HIG Colorの表(Gray 6・Blueのライト/ダークのRGB)、Dark Mode。
   Google: 基準の配色(Jetpack Compose ColorLightTokens/ColorDarkTokens・PaletteTokens)。 */
const SWITCH_ROWS = [
  {
    key: "hig", name: "Apple", color: "#C2542A",
    how: "端末の設定に従う。アプリ独自の切り替えは置かない",
    bg: { light: "#F2F2F7", dark: "#1C1C1E", label: "Gray 6(最も明るいグレー)", note: "ほぼ反転" },
    fg: { text: "Label(文字の色)は4段階とも自動で明るい色に変わる(値はHIGに記載なし)" },
    accent: { light: "#0088FF", dark: "#0091FF", label: "Blue(システムカラー)", note: "反転せず、少し明るく" },
    contrast: "最低4.5:1、独自の色は7:1を目指す",
  },
  {
    key: "material", name: "Google", color: "#2F7D6E",
    how: "端末の設定に従うDayNightテーマが基本",
    bg: { light: "#FEF7FF", dark: "#141218", label: "Surface(背景)", note: "トーン98 → 6" },
    fg: { light: "#1D1B20", dark: "#E6E0E9", label: "On Surface(文字)", note: "トーン10 → 90" },
    accent: { light: "#6750A4", dark: "#D0BCFF", label: "Primary(アクセント)", note: "トーン40 → 80(淡く)" },
    contrast: "本文7:1・補助4.5:1・枠線3:1(どちらのテーマでも同じ)",
  },
  {
    key: "wcag", name: "W3C", color: "#A3821F",
    how: "規定なし(どちらを提供してもよい)",
    bg: { text: "色の指定なし" }, fg: { text: "文字色と背景色は必ず組で指定する(片方だけだと不合格)" }, accent: { text: "色の指定なし" },
    contrast: "どちらの見た目でも本文4.5:1・大きな文字とUI部品3:1",
  },
  {
    key: "nn", name: "NN group", color: "#7A4F7E",
    how: "既定は端末の設定に従い、切り替えも用意する",
    bg: { text: "数値なし。一番下の面を最も暗くする" }, fg: { text: "1つの文字色の不透明度を変えて使い分けると背景の違いに強い" }, accent: { text: "彩度の高い色は暗い背景でにじむため避ける" },
    contrast: "比率の数値はなし",
  },
];

/* 色見本+その下にカラーコード */
function HexChip({ hex }) {
  return (
    <span style={styles.hexChip}>
      <span style={{ ...styles.swChip, background: hex }} />
      <span style={styles.hexText}>{hex}</span>
    </span>
  );
}

function SwatchPair({ cell }) {
  if (cell.text) return <div style={styles.swText}>{cell.text}</div>;
  return (
    <div>
      <div style={styles.swPair}>
        <HexChip hex={cell.light} />
        <span style={styles.swArrow}>→</span>
        <HexChip hex={cell.dark} />
      </div>
      <div style={styles.swNote}>{cell.note}</div>
      <div style={styles.swLabel}>{cell.label}</div>
    </div>
  );
}

function DarkModeChart() {
  const cols = [
    { k: "how", label: "切り替え方" },
    { k: "bg", label: "背景" },
    { k: "fg", label: "文字" },
    { k: "accent", label: "アクセント色" },
    { k: "contrast", label: "コントラストの目標" },
  ];
  return (
    <div style={styles.matrixScroll}>
      <div style={styles.switchGrid}>
        <div style={styles.switchHead} />
        {cols.map((c) => (<div key={c.k} style={styles.switchHead}>{c.label}</div>))}
        {SWITCH_ROWS.map((r) => (
          <React.Fragment key={r.key}>
            <div style={{ ...styles.switchName, color: r.color }}>{r.name}</div>
            <div style={styles.switchCell}>{r.how}</div>
            <div style={styles.switchCell}><SwatchPair cell={r.bg} /></div>
            <div style={styles.switchCell}><SwatchPair cell={r.fg} /></div>
            <div style={styles.switchCell}><SwatchPair cell={r.accent} /></div>
            <div style={styles.switchCell}>{r.contrast}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ダークモードのカラールール(Google): material-color-utilities color_spec_2021.ts のトーン、
   色見本は基準の配色(Compose PaletteTokens)の実際の値 */
const G_ROLE_RULES = [
  { group: "背景・面", role: "Surface / Background", light: 98, dark: 6, lhex: "#FEF7FF", dhex: "#141218", use: "画面の背景" },
  { group: "背景・面", role: "Surface Container Lowest", light: 100, dark: 4, lhex: "#FFFFFF", dhex: "#0F0D13", use: "最も奥に沈める面" },
  { group: "背景・面", role: "Surface Container Low", light: 96, dark: 10, lhex: "#F7F2FA", dhex: "#1D1B20", use: "浮いたカード・ボトムシート・モーダルのドロワー" },
  { group: "背景・面", role: "Surface Container", light: 94, dark: 12, lhex: "#F3EDF7", dhex: "#211F26", use: "メニュー・ナビゲーションバー・スクロール時のアプリバー" },
  { group: "背景・面", role: "Surface Container High", light: 92, dark: 17, lhex: "#ECE6F0", dhex: "#2B2930", use: "ダイアログ・検索バー・日付/時刻ピッカー" },
  { group: "背景・面", role: "Surface Container Highest", light: 90, dark: 22, lhex: "#E6E0E9", dhex: "#36343B", use: "塗りつぶしのカード・入力欄" },
  { group: "背景・面", role: "Surface Bright / Dim", light: "98 / 87", dark: "24 / 6", lhex: ["#FEF7FF", "#DED8E1"], dhex: ["#3B383E", "#141218"], use: "明るさだけで差を付けたい面(ダークでBrightが最も明るい)" },
  { group: "文字・アイコン", role: "On Surface", light: 10, dark: 90, lhex: "#1D1B20", dhex: "#E6E0E9", use: "本文の文字" },
  { group: "文字・アイコン", role: "On Surface Variant", light: 30, dark: 80, lhex: "#49454F", dhex: "#CAC4D0", use: "補助の文字・アイコン" },
  { group: "アクセント", role: "Primary", light: 40, dark: 80, lhex: "#6750A4", dhex: "#D0BCFF", use: "塗りつぶしボタンなど最も目立たせる要素" },
  { group: "アクセント", role: "On Primary", light: 100, dark: 20, lhex: "#FFFFFF", dhex: "#381E72", use: "Primaryの上の文字" },
  { group: "アクセント", role: "Primary Container", light: 90, dark: 30, lhex: "#EADDFF", dhex: "#4F378B", use: "控えめな強調の面" },
  { group: "アクセント", role: "Error", light: 40, dark: 80, lhex: "#B3261E", dhex: "#F2B8B5", use: "エラー" },
  { group: "線", role: "Outline", light: 50, dark: 60, lhex: "#79747E", dhex: "#938F99", use: "入力欄などの枠線" },
  { group: "線", role: "Outline Variant", light: 80, dark: 30, lhex: "#CAC4D0", dhex: "#49454F", use: "装飾的な区切り線" },
  { group: "その他", role: "Inverse Surface", light: 20, dark: 90, lhex: "#322F35", dhex: "#E6E0E9", use: "スナックバー・ツールチップ(周りと逆の明るさ)" },
  { group: "その他", role: "Shadow / Scrim", light: 0, dark: 0, lhex: "#000000", dhex: "#000000", use: "影・モーダルの幕(どちらのテーマでも黒)" },
];

/* Apple: HIG Colorの「System colors」「iOS, iPadOS system gray colors」表(既定の値)。
   HIGはRGBの10進数で記載しているため、16進のカラーコードに変換して表示する */
const A_COLOR_RULES = [
  { name: "Blue", l: "#0088FF", d: "#0091FF" },
  { name: "Red", l: "#FF383C", d: "#FF4245" },
  { name: "Green", l: "#34C759", d: "#30D158" },
  { name: "Orange", l: "#FF8D28", d: "#FF9230" },
  { name: "Indigo", l: "#6155F5", d: "#6D7CFF" },
  { name: "Gray", l: "#8E8E93", d: "#8E8E93" },
  { name: "Gray 2", l: "#AEAEB2", d: "#636366" },
  { name: "Gray 3", l: "#C7C7CC", d: "#48484A" },
  { name: "Gray 4", l: "#D1D1D6", d: "#3A3A3C" },
  { name: "Gray 5", l: "#E5E5EA", d: "#2C2C2E" },
  { name: "Gray 6", l: "#F2F2F7", d: "#1C1C1E" },
];

/* トーンの数字の下に、実際のカラーコードを並べる(Bright/Dimのように2色ある行は2つ) */
function ToneCell({ tone, hex }) {
  const hexes = Array.isArray(hex) ? hex : [hex];
  return (
    <div style={styles.roleCell}>
      <div style={styles.toneRow}>
        {hexes.map((h) => (<span key={h} style={{ ...styles.swChipSm, background: h }} />))}
        <span>トーン{tone}</span>
      </div>
      {hexes.map((h) => (<div key={h} style={{ ...styles.toneHex, paddingLeft: hexes.length * 20 }}>{h}</div>))}
    </div>
  );
}

function DarkColorRules() {
  return (
    <>
      <div style={styles.ruleSummary}>
        {[
          { t: "背景・面", d: "明るさを反転(Google トーン98→6 = #FEF7FF→#141218、Apple Gray 6 #F2F2F7→#1C1C1E)。真っ黒にはしない" },
          { t: "文字", d: "明るさを反転(Google トーン10→90 = #1D1B20→#E6E0E9)。Appleは文字色4段階が自動で切り替わる" },
          { t: "アクセント色", d: "反転しない。少し明るく・淡くする(Google トーン40→80 = #6750A4→#D0BCFF、Apple Blue #0088FF→#0091FF)" },
          { t: "面の上のアクセント", d: "Container系は逆に暗くする(Google トーン90→30 = #EADDFF→#4F378B)" },
          { t: "線", d: "枠線はほぼ同じ明るさ(トーン50→60 = #79747E→#938F99)、装飾の区切り線は暗くする(80→30 = #CAC4D0→#49454F)" },
          { t: "影・幕", d: "どちらのテーマでも黒(#000000)のまま(Google)。暗い背景では見えにくくなる" },
        ].map((x) => (
          <div key={x.t} style={styles.ruleCard}>
            <div style={styles.ruleCardTitle}>{x.t}</div>
            <div style={styles.ruleCardText}>{x.d}</div>
          </div>
        ))}
      </div>

      <h3 style={styles.subTitle}>Google ― カラーロールごとのライト/ダークのトーン</h3>
      <div style={styles.matrixScroll}>
        <div style={styles.roleGrid}>
          {["分類", "カラーロール", "ライト", "ダーク", "主な使いどころ"].map((h) => (<div key={h} style={styles.roleHead}>{h}</div>))}
          {G_ROLE_RULES.map((r) => (
            <React.Fragment key={r.role}>
              <div style={styles.roleCellMuted}>{r.group}</div>
              <div style={styles.roleCellName}>{r.role}</div>
              <ToneCell tone={r.light} hex={r.lhex} />
              <ToneCell tone={r.dark} hex={r.dhex} />
              <div style={styles.roleCellMuted}>{r.use}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <p style={styles.chartNote}>数字はトーン(0=黒・100=白)、その下は基準の配色での実際のカラーコードです。標準のコントラスト設定での値で、ユーザーがコントラストを上げる設定にすると、ダークの面の明るさの差が広がります(例: Surface Container Highは17→21→25)。基準の配色は紫系で、壁紙から配色を作るダイナミックカラーでも明るさ(トーン)の割り当ては同じです。</p>

      <h3 style={styles.subTitle}>Apple ― システムカラーのライト/ダークの値(既定)</h3>
      <div style={styles.appleColorGrid}>
        {A_COLOR_RULES.map((c) => (
          <div key={c.name} style={styles.appleColorItem}>
            <div style={styles.swPair}>
              <HexChip hex={c.l} />
              <span style={styles.swArrow}>→</span>
              <HexChip hex={c.d} />
            </div>
            <div style={styles.swLabel}><strong>{c.name}</strong>{c.l === c.d ? "(変わらない)" : ""}</div>
          </div>
        ))}
      </div>
      <p style={styles.chartNote}>色味のあるシステムカラーは反転せず、暗い背景で見えやすいよう少し明るくなります。グレーはGray(中間)だけが変わらず、Gray 2〜6は明るさが反転します。HIGはこのほか、コントラストを上げる設定用の値もライト・ダークそれぞれに定めています。背景色(System Background等)と文字色(Label等)は役割で指定し、具体的な値はHIGに載っていません。</p>
    </>
  );
}

/* ダークモードのエレベーションルール */
const DARK_LAYERS = [
  { name: "Surface(背景)", tone: 6, hex: "#141218", comp: "画面の背景・ナビゲーションレール・常時表示のドロワー" },
  { name: "Container Low", tone: 10, hex: "#1D1B20", comp: "浮いたカード・ボトムシート・モーダルのドロワー(Level 1)" },
  { name: "Container", tone: 12, hex: "#211F26", comp: "メニュー・ナビゲーションバー・スクロール時のアプリバー(Level 2)" },
  { name: "Container High", tone: 17, hex: "#2B2930", comp: "ダイアログ・検索バー・日付/時刻ピッカー(Level 3)" },
  { name: "Container Highest", tone: 22, hex: "#36343B", comp: "塗りつぶしのカード・入力欄(影なし)" },
];

function DarkElevationRules() {
  return (
    <div style={styles.dkGrid}>
      <div style={styles.dkCol}>
        <div style={{ ...styles.dkColTitle, color: "#2F7D6E" }}>Google ― 上の面ほど明るいトーン</div>
        <div style={styles.dkStack}>
          {DARK_LAYERS.slice().reverse().map((l, i) => (
            <div key={l.name} style={{ ...styles.dkLayer, background: l.hex, marginLeft: (4 - i) * 10 }}>
              <span style={styles.dkLayerName}>{l.name}<span style={styles.dkTone}>トーン{l.tone}<span style={styles.dkHex}>{l.hex}</span></span></span>
              <span style={styles.dkLayerComp}>{l.comp}</span>
            </div>
          ))}
        </div>
        <ul style={styles.memoList}>
          <li>影の色はダークでも黒(トーン0)のままなので、暗い背景では影がほとんど見えない。代わりに面の色の明るさで高さを表す。</li>
          <li>以前はPrimaryの色を高さに応じた濃さで重ねる「エレベーションオーバーレイ」を使っていたが、現在はトーンの異なるSurface Containerの色に置き換えられた。</li>
          <li>部品の高さ(Level)と面の色の組み合わせは部品ごとに決まっている(上の括弧内は標準部品の既定値)。</li>
        </ul>
      </div>
      <div style={styles.dkCol}>
        <div style={{ ...styles.dkColTitle, color: "#C2542A" }}>Apple ― base(奥)と elevated(手前)の2組</div>
        <div style={styles.dkStack}>
          <div style={{ ...styles.dkLayer, background: "#3A3A3C", marginLeft: 20 }}>
            <span style={styles.dkLayerName}>elevated(明るい組)</span>
            <span style={styles.dkLayerComp}>ポップオーバー・モーダルのシートなど前面に出た画面。マルチタスク時の他アプリとの境目、複数ウィンドウの区別にも使われる</span>
          </div>
          <div style={{ ...styles.dkLayer, background: "#1C1C1E" }}>
            <span style={styles.dkLayerName}>base(暗い組)</span>
            <span style={styles.dkLayerComp}>通常の画面。暗くすることで奥に引いて見せる</span>
          </div>
        </div>
        <ul style={styles.memoList}>
          <li>前面に出たときに base → elevated へ自動で切り替わる。システムの背景色を使っていないと、この切り替えが働かない。</li>
          <li>それぞれの組の中に、画面全体・その中のまとまり・さらに内側のまとまり、の3段階(Primary/Secondary/Tertiary)がある。</li>
          <li>色見本は明るさの関係を示す概念図(base/elevatedの実際の値はHIGに記載なし)。</li>
        </ul>
        <div style={{ ...styles.dkColTitle, color: "#7A4F7E", marginTop: 12 }}>NN group / W3C</div>
        <ul style={styles.memoList}>
          <li>NN group: 一番下の面を最も暗く、手前の要素ほど明るくする。白い要素に黒い影という表現は使えず、黒い面に明るい影を付けると光って見える。モーダルの暗い幕もダークでは見えにくい。</li>
          <li>W3C: 専用の基準なし。重なった要素でフォーカスが完全に隠れないこと(2.4.11)はダークでも同じ。</li>
        </ul>
      </div>
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

export default function TokensDarkModePage() {
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
        <SidebarNav currentPath="/tokens/dark-mode" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / ファウンデーション / ダークモード</span>
            <span>SPEC No. 048</span>
          </div>

          <h1 style={styles.title}>ダークモード</h1>
          <p style={styles.subtitle}>4つのガイドラインが、ダークモードの切り替え方・配色の作り方・コントラストの基準をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>ライトとダーク(同じ役割の色の明るさを入れ替える)</span>
            <ModeSwatch />
            <p style={styles.swatchNote}>ダークモードは色の反転ではありません。背景は暗く、文字は明るくしつつ、ボタンの色などは暗い背景に合う明るさに作り直します(図の配色はGoogleの基準の考え方を参考にした概念図)。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列がそろって一致しているのは、<strong>ダークモードは端末の設定に従う</strong>という点です。Appleはアプリ独自の外観設定を置かないよう求め、Googleは端末の設定に合わせて切り替わるDayNightテーマを基本にし、NN groupも利用者はダークモードを端末全体の設定として考えていると報告しています。
            </p>
            <p style={styles.synthesisText}>
              配色の作り方も共通しています。Appleは<strong>「ライトの色の単純な反転ではない」</strong>と明言し、Googleは同じ役割の色に<strong>ライトとダークで別のトーン(primary 40→80、surface 98→6など)</strong>を割り当てます。どちらも背景は真っ黒ではなく、Googleは影を見えやすくするため濃いグレーを使います。役割ごとに見ると、<strong>背景と文字は明るさを反転し、アクセント色は反転せずに明るく淡くする</strong>という変え方が2系列で共通しています(Googleのprimaryは40→80、AppleのBlueも少し明るくなる)。
            </p>
            <p style={styles.synthesisText}>
              コントラストでは、Appleが<strong>最低4.5:1、独自の色では7:1を目指す</strong>と数値で示しており、WCAGのAA(4.5:1)より高い水準を勧めています。W3Cにはダークモード専用の基準はなく、<strong>どちらの見た目でも同じ基準が適用</strong>されます。文字色と背景色を組で指定しないと不合格になる、という1.4.3の注記は、切り替えの実装で特に注意が必要な点です。
            </p>
            <p style={styles.synthesisText}>
              注意したいのは、NN groupが紹介する研究では、<strong>正常な視力の人は多くの場合ライトモードの方が読み取りの成績が良い</strong>ことです。そのためNN groupは、一般向けのサービスでダークを既定にすることは勧めず、<strong>既定は端末の設定に従い、切り替えられるようにする</strong>ことを勧めています。ダークモードは「目に優しい」と一律に考えず、両方の見た目を同じ品質で用意するのが、4系列を合わせた結論です。
            </p>
            <p style={styles.synthesisText}>
              重なり(エレベーション)の表し方も、ダークでは変わります。影は暗い背景でほとんど見えないため、<strong>Googleは上の面ほど明るいトーン(背景6→ダイアログ17)、Appleは前面の画面を暗いbaseから明るいelevatedに切り替える</strong>ことで手前と奥を表します。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― ライトからダークに切り替えると、何がどう変わるか</h2>
            <p style={styles.diagramNote}>各行の色見本は「左=ライト → 右=ダーク」です。背景・文字・アクセント色のそれぞれが、ダークでどの明るさに変わるかを4系列で並べています。</p>
            <DarkModeChart />
            <p style={styles.chartNote}>色見本は、AppleはHIGのシステムカラーの表、Googleは基準の配色(紫系)の実際の値です。どちらも背景と文字は明るさが反転する一方、アクセント色は反転せず、暗い背景に合うよう明るく調整されます。W3C・NN groupは色の値を定めず、W3Cは組で指定すること、NN groupは彩度や面の重なり方を問題にしています。</p>
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
                <InfoBox label="コントラストの基準" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="配色の作り方">{s.colorInfo}</InfoBox>
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
            <h2 style={styles.diagramTitle}>ダークモード デザインシステム比較</h2>
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
                <div style={styles.labelCell}>コントラストの基準</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>配色の作り方</div>
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
            <h2 style={styles.diagramTitle}>ダークモードのカラールール ― 役割ごとの色の変わり方</h2>
            <p style={styles.diagramNote}>ダークモードは「全部の色を反転する」のではなく、役割ごとに変え方が決まっています。まず6つの共通ルールを示し、その下にGoogleの全カラーロールとAppleのシステムカラーの具体的な値を並べます。</p>
            <DarkColorRules />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>ダークモードのエレベーションルール ― 暗い画面で重なりをどう表すか</h2>
            <p style={styles.diagramNote}>暗い背景では影が見えにくいため、Apple・Googleとも「手前の面ほど明るい色にする」ことで重なりを表します。Googleは5段階以上のトーン、Appleはbase/elevatedの2組で切り替えます。影の段階そのものは「エレベーション」ページを参照してください。</p>
            <DarkElevationRules />
            <a href="/tokens/elevation" style={styles.memoLink}>「エレベーション・階層表現」ページへ ↗</a>
          </section>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、トーンの割り当て・部品ごとの面の色・ダークテーマの扱いはGoogle公式のドキュメント・ソースで確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Dark Modeページの「Dark Mode colors」見出しへのアンカー付きリンクで、関連する見出しも併記しています。GoogleはM3のColor rolesページに加え、内容を確認したGitHub上の公式ドキュメントを併記しています。WCAGは1.4.3 Understandingページ(注記4を含む)と1.4.8です。NN groupは研究の文献調査の記事(まとめの節)と、利用者調査の記事(ベストプラクティスの節)です。
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
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  subTitle: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "18px 0 8px" },
  ruleSection: { marginBottom: 26 },
  switchGrid: { display: "grid", gridTemplateColumns: "80px 1fr 1.2fr 1.2fr 1.2fr 1fr", minWidth: 760, borderTop: "1px solid #E1E3F0" },
  switchHead: { fontSize: 10.5, color: "#7E86AC", padding: "6px 8px", borderBottom: "1px solid #E1E3F0" },
  switchName: { fontSize: 12.5, fontWeight: 700, padding: "10px 8px", borderBottom: "1px solid #E1E3F0" },
  switchCell: { fontSize: 11, lineHeight: 1.55, color: "#2E3457", padding: "10px 8px", borderBottom: "1px solid #E1E3F0", minWidth: 0 },
  swPair: { display: "flex", alignItems: "flex-start", gap: 5, flexWrap: "wrap" },
  hexChip: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 },
  hexText: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: "#454C78", letterSpacing: 0.2 },
  swChip: { width: 26, height: 26, borderRadius: 4, border: "1px solid #D5D9EC", flexShrink: 0, display: "inline-block" },
  swChipSm: { width: 14, height: 14, borderRadius: 3, border: "1px solid #D5D9EC", display: "inline-block", marginRight: 6, verticalAlign: "-2px" },
  swArrow: { fontSize: 11, color: "#9EA4C4", lineHeight: "26px" },
  swNote: { fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", fontSize: 10, color: "#3C5A73", marginTop: 4 },
  swLabel: { fontSize: 10.5, color: "#565D8A", marginTop: 3, lineHeight: 1.45 },
  swText: { fontSize: 11, color: "#454C78", lineHeight: 1.55 },
  ruleSummary: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8, marginBottom: 6 },
  ruleCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 4, padding: "9px 11px" },
  ruleCardTitle: { fontSize: 12, fontWeight: 700, color: "#171B36", marginBottom: 3 },
  ruleCardText: { fontSize: 11, lineHeight: 1.6, color: "#454C78" },
  roleGrid: { display: "grid", gridTemplateColumns: "90px 190px 140px 140px 1fr", minWidth: 740, border: "1px solid #E1E3F0" },
  roleHead: { fontSize: 10.5, color: "#565D8A", background: "#F8F9FD", padding: "6px 8px", borderBottom: "1px solid #E1E3F0" },
  roleCell: { fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", fontSize: 11, color: "#171B36", padding: "6px 8px", borderBottom: "1px solid #EEF0F7", display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 },
  toneRow: { display: "flex", alignItems: "center" },
  toneHex: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#565D8A" },
  roleCellName: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, color: "#171B36", padding: "6px 8px", borderBottom: "1px solid #EEF0F7" },
  roleCellMuted: { fontSize: 10.5, color: "#565D8A", padding: "6px 8px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.5 },
  appleColorGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 8 },
  appleColorItem: { border: "1px solid #E1E3F0", borderRadius: 4, padding: "8px 9px" },
  dkGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 16, marginBottom: 10 },
  dkCol: { minWidth: 0 },
  dkColTitle: { fontSize: 12.5, fontWeight: 700, marginBottom: 8 },
  dkStack: { display: "flex", flexDirection: "column", gap: 4, background: "#0B0A0E", borderRadius: 8, padding: 10, marginBottom: 8 },
  dkLayer: { borderRadius: 6, padding: "7px 10px", display: "flex", flexDirection: "column", gap: 2 },
  dkLayerName: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, color: "#E6E0E9" },
  dkTone: { fontWeight: 400, color: "#B7BCDA", marginLeft: 8 },
  dkHex: { marginLeft: 6, color: "#9EA4C4" },
  dkLayerComp: { fontSize: 10.5, color: "#C9CCD9", lineHeight: 1.5 },
  memoList: { margin: "0 0 8px", paddingLeft: 18, fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  memoLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
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
