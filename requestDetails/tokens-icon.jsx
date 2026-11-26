import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, GoodBad, hasRow, markNeg } from "./page-parts";

/**
 * トークン/ファウンデーションレイヤー「アイコン(サイズ・スタイル)」ページ。
 *
 * 2026-09 新規作成。あらゆるコンポーネントに横断的に効いてくる基礎ルールの1つとして、
 * アイコンのサイズ・スタイル・アクセシビリティを4系列で比較する。
 *
 * Apple(HIG SF Symbols)はHIGのページデータ(JSON)を直接取得して本文・見出しアンカーを
 * 確認済み(2026-09)。Google(Material Symbols)は、可変フォント4軸の範囲・既定値を
 * developers.google.comのガイド本文で直接確認し、3スタイルの使い分けの説明のみ
 * m3.material.io(SPA)の検索結果による間接確認(2026-09)。W3C(WCAG 1.1.1/4.1.2/1.4.11の
 * Understandingページ)・Nielsen Norman Group(Icon Usability記事)は本文を直接取得して
 * 確認済み(2026-09)。
 *
 * 2026-09 追記: ユーザーから「Apple・Googleのサイズの比較とスペーシングの指定があれば、図と
 * テキストで比較してほしい」というフィードバックを受け、「Apple・Googleのサイズと余白
 * (スペーシング)の比較」セクションを新設。GoogleはJetpack ComposeのXSmall〜XLarge
 * IconButtonTokens(容器32/40/56/96/136dp・アイコン20/24/24/32/40dp・余白)と
 * minimumInteractiveComponentSize(48dp)、AppleはHIGのButtons(44×44pt、visionOSは60×60pt・
 * 5サイズ・中心間60pt)・Iconsページ(光学的な中心合わせ、書類アイコンの約10%の余白)で確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "SF Symbols(Human Interface Guidelines ― Foundations)",
    color: "#C2542A",
    position: "システムフォントと連動する9段階のウェイト・3段階のスケール・4種類のレンダリングモードを持つシンボル",
    size: <>隣の文字のサイズに合わせて表示し、<Hl>3段階のスケール</Hl>(small/medium/large)で強弱を調整する。ptの数値はない。</>,
    colorInfo: "4つのモード: モノクローム(単色)・階層的(濃淡で奥行き)・パレット(2色以上で強調)・マルチカラー。",
    stance:
      <>9段階のウェイトが<Hl>隣の文字のウェイトと対応し</Hl>、文字と調和する。選択状態は塗り(fill)、使えない状態は斜線(slash)で表せる。モードの決まりはなく、使う場所ごとに見え方を確かめる。可変カラーは量の変化を表すもので、奥行きには使わない。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility: "知覚可能 ― システムカラーを使えば、アクセシビリティの設定やダークモードに追従する。",
    useCases: [
      "隣の文字のウェイトに合わせてシンボルのウェイトを選ぶ",
      "中立ならモノクローム、強調ならパレット/マルチカラー",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Weights-and-scales",
    refs: [
      { label: "SF Symbols(Human Interface Guidelines ― Foundations)", url: "https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Weights-and-scales" },
      { label: "Rendering modes", url: "https://developer.apple.com/design/human-interface-guidelines/sf-symbols#Rendering-modes" },
      { label: "Icons", url: "https://developer.apple.com/design/human-interface-guidelines/icons" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。",
    illustration: () => (
      <svg width="120" height="50" viewBox="0 0 120 50">
        <text x="20" y="24" fontSize="20" fill="#C2542A" textAnchor="middle" fontWeight="200">★</text>
        <text x="60" y="26" fontSize="24" fill="#C2542A" textAnchor="middle" fontWeight="500">★</text>
        <text x="100" y="30" fontSize="30" fill="#C2542A" textAnchor="middle" fontWeight="900">★</text>
        <text x="20" y="42" fontSize="7" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">small</text>
        <text x="60" y="42" fontSize="7" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">medium</text>
        <text x="100" y="42" fontSize="7" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">large</text>
      </svg>
    ),
    illustrationNote: "3段階のスケール、ウェイトによる太さの違い(概念図)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Symbols(Material Design 3)",
    color: "#2F7D6E",
    position: "Outlined/Rounded/Sharpの3スタイル。塗り・太さ・グレード・光学サイズの4軸を持つ可変フォント",
    size: <><Hl>標準24dp</Hl>。光学サイズは20〜48dpで、表示サイズに合わせて線の太さが自動で調整される。</>,
    colorInfo: <span><NoData>数値基準なし。</NoData>weight軸・grade軸で、太さ・濃さの印象を調整できる。</span>,
    glossary: [
      { term: "fill軸", desc: "塗りの軸。0=輪郭のみ、1=塗り。1つのアイコンで未選択/選択を表せる。" },
      { term: "optical size(opsz)軸", desc: "20〜48dpで表示サイズを指定し、線の太さを自動で調整する軸。" },
      { term: "weight軸・grade軸", desc: "weightは線の太さ(100〜700)。gradeは大きさを変えずに太さを細かく調整する。" },
    ],
    stance:
      <>Outlined(密なUI向き)・Rounded(角丸)・Sharp(直線的)の3スタイル。塗りは各スタイルの軸で表し、<Hl>1つのフォントで幅広い見た目を表せる</Hl>。</>,
    exceptions: "暗い背景の明るいアイコンは低いグレード(例: -25)、強調は高いグレード(例: 200)にする。",
    accessibility:
      "知覚可能 ― 専用の数値基準はない。",
    useCases: [
      "密なUIにはOutlined、丸みのあるブランドにはRounded",
      "選択中などの塗りはfill軸で表す",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/icons/overview",
    refs: [
      { label: "Material Symbols(Material Design 3)", url: "https://m3.material.io/styles/icons/overview" },
      { label: "Designing icons", url: "https://m3.material.io/styles/icons/designing-icons" },
      { label: "Applying icons", url: "https://m3.material.io/styles/icons/applying-icons" },
      { label: "Material Symbols guide(developers.google.com)", url: "https://developers.google.com/fonts/docs/material_symbols" },
    ],
    confirmedNote: "可変フォント4軸の範囲・既定値はdevelopers.google.comのMaterial Symbolsガイド本文で直接確認(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="50" viewBox="0 0 120 50">
        <circle cx="20" cy="20" r="10" fill="none" stroke="#2F7D6E" strokeWidth="2" />
        <rect x="48" y="10" width="20" height="20" rx="6" fill="none" stroke="#2F7D6E" strokeWidth="2" />
        <rect x="88" y="10" width="20" height="20" fill="none" stroke="#2F7D6E" strokeWidth="2" />
        <text x="20" y="42" fontSize="7" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Outlined</text>
        <text x="58" y="42" fontSize="7" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Rounded</text>
        <text x="98" y="42" fontSize="7" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Sharp</text>
      </svg>
    ),
    illustrationNote: "3スタイルの形状の違い(概念図)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.1.1 Non-text Content / 4.1.2 Name, Role, Value / 1.4.11 Non-text Contrast / 3.2.4 / 2.5.3",
    color: "#A3821F",
    position: "意味を持つアイコンに代わりの文字(A)、アイコンだけの操作に支援技術へ伝わる名前(A)、3:1のコントラスト(AA)を求める",
    size: <span>アイコン専用の基準はない。押せるなら24×24 CSS px以上(2.5.8・AA、例外あり)、44×44(2.5.5・AAA、例外あり)。詳しくは<PageLink to="/components/actions/button">ボタン</PageLink>。</span>,
    colorInfo: <>意味を伝えるアイコンは<Hl>隣の色と3:1以上</Hl>(1.4.11)。</>,
    glossary: [
      { term: "1.1.1 Non-text Content(レベルA)", desc: "意味を伝える文字以外のコンテンツに、同じ目的を果たす文字の代替を用意すること。" },
      { term: "4.1.2 Name, Role, Value(レベルA)", desc: "UIコンポーネントの名前と役割を、支援技術に伝えること。" },
      { term: "1.4.11 Non-text Contrast(レベルAA)", desc: "コンポーネントを見分ける見た目と、理解に必要な図の一部に3:1以上を求める。" },
      { term: "3.2.4 Consistent Identification・レベルAA", desc: "ページをまたいで出てくる同じ働きのコンポーネントを、一貫して識別できること。文言が完全に同じでなくてよい。" },
      { term: "2.5.3 Label in Name(レベルA)", desc: "見えるラベルの言葉を、支援技術向けの名前にも含めること(食い違うと音声入力で反応しない)。" },
    ],
    stance:
      <>意味を持つアイコンに代わりの文字を付ける(1.1.1)。操作のアイコンなら、<Hl>見た目ではなく「何をするか」を表す名前</Hl>にする。名前は見えなくてもよいが、支援技術に伝わる必要がある(4.1.2)。同じ働きのアイコンは、どのページでも同じ名前にする(3.2.4・AA)。</>,
    exceptions:
      "無効なコンポーネント・ロゴ・旗は1.4.11の対象外。装飾だけの画像は1.1.1の対象外。",
    accessibility:
      "知覚可能(1.1.1・1.4.11)・堅牢(4.1.2)・理解可能(3.2.4)・操作可能(2.5.3)。",
    useCases: [
      "アイコンだけのボタン・リンクに名前を付ける",
      "見えるラベルがあれば、名前にも同じ言葉を含める(2.5.3)",
    ],
    searchHint: "describes its purpose",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    refs: [
      { kind: "sc", level: "A", label: "1.1.1 非テキストコンテンツ", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" },
      { kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "A", label: "2.5.3 ラベルを含む名前", url: "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html" },
      { kind: "sc", level: "AA", label: "3.2.4 一貫した識別性", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html" },
    ],
    confirmedNote: "3.2.4はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="50" viewBox="0 0 120 50">
          <rect x="1" y="1" width="118" height="48" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="22" fontSize="8.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">1.1.1 → 4.1.2</text>
          <text x="60" y="34" fontSize="8.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">→ 1.4.11(3:1)</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、3つの達成基準の関係を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Icon Usability",
    color: "#7A4F7E",
    position: "アイコン単体の意味は決まっていないことが多く、文字のラベルを添えるのが原則",
    size: <NoData>数値基準なし</NoData>,
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      <>アイコンの理解は過去の経験によるので、意味が曖昧になりやすい(例: ハートはお気に入り・保存・評価とまちまち)。<Hl>ほぼすべてのアイコンに、いつも見える文字のラベルを添える</Hl>。ふさわしいアイコンを思いつくのに5秒以上かかるなら、アイコンにしない(5秒ルール)。小さくすると潰れる細部は避ける。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility: "根拠となる原則 ― 適合区分ではなく、認識しやすさ・覚えやすさの調査にもとづく。",
    useCases: [
      "ラベルはホバーのときだけ出さず、いつも見せる",
      "出す前に、意味が分かるか・覚えられるかをテストする",
    ],
    searchHint: "5-second rule",
    url: "https://www.nngroup.com/articles/icon-usability/",
    refs: [
      { label: "Icon Usability", url: "https://www.nngroup.com/articles/icon-usability/" },
      { label: "Usability Testing of Icons", url: "https://www.nngroup.com/articles/icon-testing/" },
    ],
    confirmedNote: "記事本文を直接取得して確認済み(2026-09)。",
    illustration: () => (
      <svg width="120" height="50" viewBox="0 0 120 50">
        <rect x="1" y="1" width="118" height="48" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.4" />
        <text x="60" y="20" fontSize="18" fill="#7A4F7E" textAnchor="middle">☰</text>
        <text x="60" y="38" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">メニュー</text>
      </svg>
    ),
    illustrationNote: "アイコン単体ではなく常時表示のラベルを併用(概念図)",
  },
];
markNeg(SOURCES);

/* Apple・Googleのアイコンのサイズと余白(スペーシング)の比較
   Google: Jetpack Compose Material 3 の XSmall〜XLarge IconButtonTokens(容器の高さ・アイコンの大きさ・左右の余白)、
           minimumInteractiveComponentSize(48dp)、Material Symbolsのopsz軸(20〜48dp)。
   Apple: HIG Buttons(44×44pt・visionOS 60×60pt・visionOSのボタン5サイズ・中心間60pt)、SF Symbols(3スケール)、Icons(光学的な中心合わせの余白)。 */
/* 星形のパス(図の中のアイコンの見本) */
function starPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return "M" + pts.join("L") + "Z";
}

/* No.009: Googleの24dpグリッドと、Appleの文字との太さ・大きさの合わせ方の図 */
function IconAnatomy() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const u = 7; // 1dp = 7px(実寸の約7倍)
  const ox = 30, oy = 34;
  const grid = [];
  for (let i = 0; i <= 24; i++) {
    grid.push(<line key={"v" + i} x1={ox + i * u} x2={ox + i * u} y1={oy} y2={oy + 24 * u} stroke="#E3EDE9" strokeWidth="0.6" />);
    grid.push(<line key={"h" + i} y1={oy + i * u} y2={oy + i * u} x1={ox} x2={ox + 24 * u} stroke="#E3EDE9" strokeWidth="0.6" />);
  }
  return (
    <div style={styles.anatomyWrap}>
      <figure style={styles.anatomyFig}>
        <svg viewBox="0 0 250 230" style={{ width: "100%", maxWidth: 300 }} role="img" aria-label="Appleのシンボルと文字の太さ・大きさの合わせ方">
        <text x="0" y="14" fontSize="11" fontWeight="700" fill="#C2542A" fontFamily={font}>Apple ― 隣の文字に合わせる</text>
        {[{ w: 300, sw: 1.2, l: "Light" }, { w: 400, sw: 2, l: "Regular" }, { w: 700, sw: 3.4, l: "Bold" }].map((r, i) => (
          <g key={r.l}>
            <path d={starPath(22, 46 + i * 34, 11)} fill="none" stroke="#C2542A" strokeWidth={r.sw} strokeLinejoin="round" />
            <text x="40" y={52 + i * 34} fontSize="17" fontWeight={r.w} fill="#171B36" fontFamily="-apple-system, 'Helvetica Neue', sans-serif">Favorites</text>
            <text x="140" y={52 + i * 34} fontSize="8.5" fill="#666D93" fontFamily={mono}>{r.l}</text>
          </g>
        ))}
        <text x="0" y="146" fontSize="8.5" fill="#454C78" fontFamily={font}>文字と同じ太さにそろえる(9段階)</text>
        {[{ s: 0.8, l: "small" }, { s: 1, l: "medium" }, { s: 1.25, l: "large" }].map((r, i) => (
          <g key={r.l}>
            <path d={starPath(22 + i * 74, 186, 10 * r.s)} fill="#C2542A" />
            <text x={36 + i * 74 + (r.s - 1) * 12} y="191" fontSize="13" fill="#171B36" fontFamily="-apple-system, 'Helvetica Neue', sans-serif">Aa</text>
            <text x={14 + i * 74} y="214" fontSize="8.5" fill="#666D93" fontFamily={mono}>{r.l}</text>
          </g>
        ))}
        <text x="0" y="228" fontSize="8" fill="#666D93" fontFamily={font}>同じ文字サイズのまま、シンボルの大きさを3段階で調整</text>
      </svg>
        <figcaption style={styles.anatomyCap}>アイコンの大きさや太さを、アイコン単体では決めない。<strong>横に並ぶ文字の太さ(9段階)と大きさに合わせて</strong>表示され、文字とそろって見える。</figcaption>
      </figure>
      <figure style={styles.anatomyFig}>
        <svg viewBox="0 0 250 230" style={{ width: "100%", maxWidth: 300 }} role="img" aria-label="Googleのアイコンの24dpグリッド">
        <text x="0" y="14" fontSize="11" fontWeight="700" fill="#2F7D6E" fontFamily={font}>Google ― 24dpの枠の中に描く</text>
        {grid}
        <rect x={ox} y={oy} width={24 * u} height={24 * u} fill="none" stroke="#2F7D6E" strokeWidth="1.2" />
        <rect x={ox + 2 * u} y={oy + 2 * u} width={20 * u} height={20 * u} fill="rgba(47,125,110,0.06)" stroke="#2F7D6E" strokeDasharray="4 3" />
        <circle cx={ox + 12 * u} cy={oy + 12 * u} r={10 * u} fill="none" stroke="#A3821F" strokeDasharray="2 2" />
        <path d={starPath(ox + 12 * u, oy + 12.6 * u, 8.6 * u)} fill="none" stroke="#2F7D6E" strokeWidth={2 * u * 0.55} strokeLinejoin="round" />
        <text x={ox + 24 * u + 6} y={oy + 8} fontSize="8.5" fill="#2F7D6E" fontFamily={mono}>24dp</text>
        <text x={ox + 24 * u + 6} y={oy + 20} fontSize="8" fill="#454C78" fontFamily={font}>全体</text>
        <text x={ox + 24 * u + 6} y={oy + 48} fontSize="8.5" fill="#2F7D6E" fontFamily={mono}>20dp</text>
        <text x={ox + 24 * u + 6} y={oy + 60} fontSize="8" fill="#454C78" fontFamily={font}>描く範囲</text>
        <text x={ox + 24 * u + 6} y={oy + 88} fontSize="8.5" fill="#A3821F" fontFamily={mono}>円 20dp</text>
        <text x={ox + 24 * u + 6} y={oy + 100} fontSize="8" fill="#454C78" fontFamily={font}>基準の形</text>
        <text x={ox + 24 * u + 6} y={oy + 128} fontSize="8.5" fill="#2F7D6E" fontFamily={mono}>線 2dp</text>
        <text x={ox} y={oy + 24 * u + 16} fontSize="8" fill="#666D93" fontFamily={font}>周りに2dpの余白。角の丸みは2dpが基本</text>
      </svg>
        <figcaption style={styles.anatomyCap}>アイコンは<strong>24dpの正方形の枠</strong>の中に描く(方眼の1マス=1dp)。周りの2dpは余白で、絵は<strong>内側の20dp(点線)</strong>に収める。丸い形は直径20dpの円(金色)を目安にし、線は2dpの太さで描く。こうすると、どのアイコンも同じ大きさ・太さに見える。</figcaption>
      </figure>
    </div>
  );
}

const STYLE_ROWS = [
  { k: "考え方", hig: "単純ですぐ分かる形。大きさ・細かさ・線の太さ・視点をそろえる", material: "単純で親しみやすい形。くっきり太めに描き、スタイルを混ぜない" },
  { k: "形", hig: "見た目の中心に合わせる。状態は塗り・斜線・囲みで表す", material: "24dpの枠の内側20dpに描く(上の図)。スタイルはアウトライン・ラウンド・シャープの3種類" },
  { k: "線の太さ", hig: "9段階。隣の文字と同じ太さにする", material: "標準2dp(太さ400)。24dpでは200より細くしない。光学サイズで自動で調整する" },
  { k: "色", hig: "色はシステムが付ける。4つのモード(単色・階層・パレット・マルチカラー)", material: "塗り(Fill 0〜1)で未選択と選択を切り替える。暗い背景ではグレード-25で細く補正する" },
];

function IconStyleTable() {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={styles.styleTable}>
        <thead><tr><th style={styles.styleTh} /><th style={{ ...styles.styleTh, color: "#C2542A" }}>Apple(SF Symbols・Icons)</th><th style={{ ...styles.styleTh, color: "#2F7D6E" }}>Google(Material Symbols)</th></tr></thead>
        <tbody>{STYLE_ROWS.map((r) => (<tr key={r.k}><th style={styles.styleRowHead}>{r.k}</th><td style={styles.styleTd}>{r.hig}</td><td style={styles.styleTd}>{r.material}</td></tr>))}</tbody>
      </table>
    </div>
  );
}

const G_ICON_BUTTONS = [
  { name: "XS", h: 32, icon: 20, pad: 6, narrow: 4, wide: 10 },
  { name: "S", h: 40, icon: 24, pad: 8, narrow: 4, wide: 14 },
  { name: "M", h: 56, icon: 24, pad: 16, narrow: 12, wide: 24 },
  { name: "L", h: 96, icon: 32, pad: 32, narrow: 16, wide: 48 },
  { name: "XL", h: 136, icon: 40, pad: 48, narrow: 32, wide: 72 },
];

function IconSizeChart() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const k = 0.55; // 描画の縮尺
  let gx = 96;
  const gItems = G_ICON_BUTTONS.map((b) => {
    const w = (b.icon + b.pad * 2) * k, h = b.h * k, x = gx, y = 120 - h;
    gx += w + 18;
    const ix = x + (w - b.icon * k) / 2, iy = y + (h - b.icon * k) / 2;
    return (
      <g key={b.name}>
        <rect x={x} y={y} width={w} height={h} rx={Math.min(h / 2, 14)} fill="#E3EDE9" />
        <path d={starPath(ix + (b.icon * k) / 2, iy + (b.icon * k) / 2 + 0.6, (b.icon * k) / 2)} fill="#2F7D6E" />
        <line x1={x} x2={ix} y1={y + h + 6} y2={y + h + 6} stroke="#A3821F" strokeWidth="1" />
        <text x={x + w / 2} y={y - 5} fontSize="9" fill="#171B36" textAnchor="middle" fontWeight="600" fontFamily={font}>{b.name}</text>
        <text x={x + w / 2} y={136} fontSize="8" fill="#454C78" textAnchor="middle" fontFamily={mono}>{b.h}dp</text>
        <text x={x + w / 2} y={146} fontSize="7.5" fill="#2F7D6E" textAnchor="middle" fontFamily={mono}>icon {b.icon}</text>
        <text x={x + w / 2} y={156} fontSize="7.5" fill="#A3821F" textAnchor="middle" fontFamily={mono}>余白 {b.pad}</text>
      </g>
    );
  });
  const tx = 470;
  return (
    <svg viewBox="0 0 640 300" width="100%" style={{ maxWidth: 700, display: "block", margin: "0 auto" }} role="img" aria-label="Apple・Googleのアイコンボタンの大きさと余白の比較図">
      <text x="0" y="24" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Google</text>
      <text x="0" y="38" fontSize="8.5" fill="#666D93" fontFamily={font}>アイコンボタン</text>
      <text x="0" y="49" fontSize="8.5" fill="#666D93" fontFamily={font}>5段階(標準幅)</text>
      {gItems}
      {/* 押せる範囲の最小(48dp)の枠 */}
      <rect x={tx + 60} y={120 - 48 * k} width={48 * k} height={48 * k} fill="none" stroke="#2F7D6E" strokeDasharray="3 2" />
      <text x={tx + 60 + 24 * k} y={136} fontSize="8" fill="#2F7D6E" textAnchor="middle" fontFamily={mono}>48dp</text>
      <text x={tx + 60 + 24 * k} y={146} fontSize="7.5" fill="#454C78" textAnchor="middle" fontFamily={font}>押せる範囲の最小</text>
      <line x1="0" x2="640" y1="176" y2="176" stroke="#E1E3F0" />
      <text x="0" y="200" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Apple</text>
      <text x="0" y="214" fontSize="8.5" fill="#666D93" fontFamily={font}>アイコンボタンの</text>
      <text x="0" y="225" fontSize="8.5" fill="#666D93" fontFamily={font}>段階はなし</text>
      <rect x={tx + 60} y={236 - 44 * k} width={44 * k} height={44 * k} fill="none" stroke="#C2542A" strokeDasharray="3 2" />
      <text x={tx + 60 + 22 * k} y={252} fontSize="8" fill="#C2542A" textAnchor="middle" fontFamily={mono}>44pt</text>
      <text x={tx + 60 + 22 * k} y={262} fontSize="7.5" fill="#454C78" textAnchor="middle" fontFamily={font}>押せる範囲の最小</text>
      <text x="96" y="282" fontSize="8.5" fill="#666D93" fontFamily={font}>図は実寸の55%。緑・オレンジの星はアイコン本体(Appleはアイコンの大きさの規定がないため目安として描画)。</text>
      <text x="96" y="294" fontSize="8.5" fill="#666D93" fontFamily={font}>金色の線は、容器の端からアイコンまでの余白。点線の枠は押せる範囲の最小。</text>
    </svg>
  );
}

const ICON_SPEC_ROWS = [
  {
    label: "アイコン本体の大きさ",
    hig: "pt数の段階はなし。SF Symbolsは隣の文字のサイズに合わせて表示され、small/medium(既定)/largeの3スケールで文字との比率を変える。",
    material: "標準は24dp。アイコンボタンではXS 20dp・S/M 24dp・L 32dp・XL 40dp。Material Symbolsのoptical size軸は20〜48dpで、サイズに応じて線の太さが自動で調整される。",
  },
  {
    label: "押せる範囲の最小",
    hig: "44×44pt。指・ポインタのどちらでも選びやすくするため(Buttons)。Accessibilityのページでは、iOS/iPadOSの既定44×44pt・最小28×28ptという2段階を示している(2025年改訂)。",
    material: "48×48dp。見た目が小さいコンポーネントでも、押せる範囲は48dpまで自動で確保される(Jetpack Compose)。",
  },
  {
    label: "コンポーネントの大きさの段階",
    hig: "iOS/iPadOSのアイコンボタンの段階は示されていない。",
    material: "アイコンボタンは XS 32 / S 40 / M 56 / L 96 / XL 136dp(容器の高さ)の5段階(M3 Expressive)。",
  },
  {
    label: "アイコンの周りの余白",
    hig: "数値の指定はなし。非対称なアイコンは、見た目の中心が合うよう余白を含めた画像にして中心をそろえる(光学的な中心合わせ)。macOSの書類アイコンは、画像を枠の約80%に収め、約10%の余白を取る。",
    material: "容器の端からアイコンまでの余白が段階ごとに決まっている。標準幅でXS 6 / S 8 / M 16 / L 32 / XL 48dp。さらに狭い(Narrow)・広い(Wide)の3種類の幅がある(例: Sは4 / 8 / 14dp)。",
  },
  {
    label: "並べるときの間隔",
    hig: <NoData>記載なし</NoData>,
    material: "アイコンボタン自体の間隔の数値は記載なし(押せる範囲48dpを確保すれば重ならない)。",
  },
];

function IconSpecTable() {
  return (
    <>
      <div className="dsp-mobile-only" style={styles.specCardList}>
        {ICON_SPEC_ROWS.map((r) => (
          <div key={r.label} style={styles.sourceCard}>
            <div style={styles.sourceName}>{r.label}</div>
            <div style={styles.specCardRow}><span style={{ ...styles.specCardSite, color: "#C2542A" }}>Apple</span><span style={styles.specCardText}>{r.hig}</span></div>
            <div style={styles.specCardRow}><span style={{ ...styles.specCardSite, color: "#2F7D6E" }}>Google</span><span style={styles.specCardText}>{r.material}</span></div>
          </div>
        ))}
      </div>
      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.specGrid}>
            <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
            <div style={{ ...styles.headerCell, ...styles.headerRowCell }}><div style={styles.sourceName}>Apple</div></div>
            <div style={{ ...styles.headerCell, ...styles.headerRowCell }}><div style={styles.sourceName}>Google</div></div>
            {ICON_SPEC_ROWS.map((r, i) => {
              const last = i === ICON_SPEC_ROWS.length - 1 ? styles.lastRowCell : {};
              return (
                <React.Fragment key={r.label}>
                  <div style={{ ...styles.labelCell, ...last }}>{r.label}</div>
                  <div style={{ ...styles.cell, ...styles.textCell, ...last }}>{r.hig}</div>
                  <div style={{ ...styles.cell, ...styles.textCell, ...last }}>{r.material}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function IconSwatch() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 20, margin: "0 auto" }}>
      {[
        { label: "16", size: 16 },
        { label: "24", size: 24 },
        { label: "32", size: 32 },
      ].map((it) => (
        <div key={it.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <svg width={it.size} height={it.size} viewBox="0 0 24 24">
            <path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7.1L12 17.9l-6.2 3.4L7 14.2 2 9.3l7.1-.7z" fill="none" stroke="#3A4FCF" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 10.5, color: "#666D93", fontFamily: "'IBM Plex Mono', monospace" }}>{it.label}pt/dp</span>
        </div>
      ))}
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "アイコンの大きさ・線の太さなどのスタイルと、意味の伝え方の決まり";
const ABOUT = [
  { k: "目的・役割", v: "小さな絵で操作や内容を伝え、見た目をそろえる" },
  { k: "関わる場面", v: "ツールバーのボタン、タブバーの項目、リストの先頭の印" },
  { k: "関連するページ", v: <><PageLink to="/components/actions/button">ボタン</PageLink>、<PageLink to="/components/communication/tooltip">ツールチップ</PageLink>、<PageLink to="/components/navigation/nav-bar">タブバー</PageLink>、<PageLink to="/components/actions/fab">フローティングアクションボタン</PageLink></> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "隣の文字とそろえる", d: "線の太さと大きさを、横の文字に合わせる", who: "Apple・Google" },
  { n: 2, t: "文字のラベルを添える", d: "アイコンだけでは意味が1つに決まらないことが多い", who: "NN group" },
  { n: 3, t: "背景との差を確かめる", d: "意味を伝えるアイコンは背景と3:1以上", who: "W3C 1.4.11" },
  { n: 4, t: "押せる範囲の最低限の大きさを確保する", d: "アイコンが小さくても、押せる範囲はApple 44×44pt・Google 48×48dp以上にする", who: "Apple・Google" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
      title="良い例・悪い例 ― アイコンとラベル"
      items={[
        { kind: "good", fig: <div style={{ display: "flex", gap: 18 }}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" fill="none" stroke="#2E3457" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 11, color: "#2E3457" }}>ホーム</span></div><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM15.5 15.5L20 20" fill="none" stroke="#2E3457" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 11, color: "#2E3457" }}>検索</span></div><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" fill="none" stroke="#2E3457" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><span style={{ fontSize: 11, color: "#2E3457" }}>設定</span></div></div>, text: "アイコンの下に文字のラベルがあり、意味が1つに決まる。ラベルを見せないアイコンにも、支援技術に伝わる名前を付ける。" },
        { kind: "bad", fig: <div style={{ display: "flex", gap: 18 }}><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.8 6.4.6-4.8 4.3 1.4 6.3L12 16.8 6.4 20l1.4-6.3L3 9.4l6.4-.6z" fill="none" stroke="#2E3457" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5M20 12a8 8 0 0 1-14 5M18 3v4h-4M6 21v-4h4" fill="none" stroke="#2E3457" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg><svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h.01M12 12h.01M19 12h.01" fill="none" stroke="#2E3457" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></div>, text: "意味が1つに決まらないアイコンだけが並び、見えるラベルも名前もない(お気に入り?更新?共有?)。" },
      ]}
      basis="NN group(アイコンには文字のラベルを添える)、W3C 1.1.1(文字でない情報には代わりの文字)・4.1.2(名前)。"
      note={<>押せる範囲の良い例・悪い例は<PageLink to="/components/actions/button">ボタン</PageLink>のページにある。</>}
    />
  );
}

export default function TokensIconPage() {
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
        <SidebarNav currentPath="/tokens/icon" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>Foundation / アイコン</span>
            <span>SPEC No. 044</span>
          </div>

          <h1 style={styles.title}>アイコン(サイズ・スタイル)</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="サイズの目安(概念図)"
            image={<><IconSwatch /></>}
            imageNote={<>同じ形のアイコンでも、系列・文脈によって最適なサイズ・太さ・スタイルは異なる。実寸の基準は各系列の欄を参照。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <section style={{ marginBottom: 40 }}>
            <h2 style={styles.diagramTitle}>アイコンのスタイルの考え方 ― 形・線の太さ・色</h2>
            <p style={styles.diagramNote}>描き方を決めているのはAppleとGoogle(左がApple、右がGoogle)。どちらも<Hl>隣の文字と線の太さ・大きさをそろえる</Hl>。W3CとNN groupは描き方を定めない。</p>
            <IconAnatomy />
            <IconStyleTable />
            <p style={styles.diagramNote}>出典: HIG「Icons」「SF Symbols」、Material Design 3「Designing icons」「Applying icons」。</p>
          </section>
          <GoodBadFigure />


          <h2 style={styles.diagramTitle}>Apple・Googleのサイズと余白(スペーシング)の比較</h2>
          <p style={styles.diagramNote}>アイコン本体の大きさ、押せる範囲、コンポーネントの大きさの段階、アイコンの周りの余白を比べる。Googleはアイコンボタンの段階ごとに余白まで数値で決めているのに対し、Appleはアイコン自体の大きさを文字に合わせ、押せる範囲(44pt)を中心に定めている。</p>
          <div style={styles.chartCard}>
            <IconSizeChart />
          </div>
          <IconSpecTable />
          <p style={styles.diagramNote}>出典: GoogleはJetpack Compose Material 3のトークン定義(XSmall〜XLargeのIconButtonTokens、押せる範囲の最小48dp)とMaterial Symbolsのガイド、AppleはHIGのButtons・SF Symbols・Iconsページ。</p>

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              Apple・Googleは、太さ・大きさを切り替えられるアイコンの体系(SF Symbols/Material Symbols)を持つ。力点は違い、<strong>Appleは隣の文字と太さをそろえ</strong>、<strong>Googleは24dpの枠と光学サイズで線の太さをそろえる</strong>。
            </p>
            <p style={styles.synthesisText}>
              W3Cは見た目ではなく、<strong>意味が伝わるか</strong>(代わりの文字・支援技術に伝わる名前・<strong>3:1</strong>)を求める。NN groupは、<strong>アイコン単体の意味は決まっていないことが多い</strong>とし、文字のラベルを添えるよう勧める。名前を付けてもアイコンだけでは見て分からないことがあるので、ラベルとテストで確かめる(AI解釈)。
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
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
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

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["デザインの基礎"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  anatomyFig: { margin: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: "1 1 260px", minWidth: 0 },
  anatomyCap: { fontSize: 11.5, lineHeight: 1.7, color: "#2E3457", maxWidth: 320 },
  anatomyWrap: { display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 12px", marginBottom: 14 },
  styleTable: { width: "100%", minWidth: 620, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457" },
  styleTh: { textAlign: "left", fontSize: 12, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  styleRowHead: { textAlign: "left", verticalAlign: "top", width: 80, padding: "9px 10px", background: "#F8F9FD", borderBottom: "1px solid #EEF0F7", fontWeight: 700, color: "#454C78" },
  styleTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.65, verticalAlign: "top" },
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
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 14 },
  specGrid: { display: "grid", gridTemplateColumns: "150px repeat(2, 1fr)", minWidth: 600, border: "1px solid #E1E3F0" },
  specCardList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 },
  specCardRow: { display: "flex", flexDirection: "column", gap: 2, borderTop: "1px dashed #E1E3F0", paddingTop: 8, marginTop: 8 },
  specCardSite: { fontSize: 11, fontWeight: 700 },
  specCardText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457" },
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
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
