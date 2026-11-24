import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, hasRow, markNeg } from "./page-parts";

/**
 * トークン/ファウンデーションレイヤー「タイポグラフィ(文字サイズ・行間)」ページ。
 *
 * このページの発見: Apple・Googleは「テキストスタイル/タイプスケール」という名前付きの
 * 段階(Body・Title等)に具体的なサイズと行送りを割り当てる一方、W3C(WCAG)の数値
 * (行間1.5倍・200%拡大など)は「デザインの初期値として使え」という指定ではなく、
 * 「ユーザーがその値に変更しても表示が壊れないこと」を求める耐性テストである。
 * そのため、Appleの本文(17pt/行送り22pt=約1.29倍)のようにWCAGの1.5倍を下回る
 * 初期値でも、WCAGに反しているわけではない。
 *
 * Apple(HIG Typography)はHIGのページデータ(JSON)を直接取得して本文・数値表・
 * 見出しアンカーを確認済み(2026-09)。Google(Material Design 3)はm3.material.ioが
 * SPAのため本文を直接取得できず、Google公式のMaterial Components for Android の
 * Typographyドキュメント(サイズ・ウェイト)とJetpack ComposeのMaterial 3トークン定義
 * (行送り)をGitHub上のソースで直接確認(2026-09)。W3C(WCAG 2.2 Understanding:
 * 1.4.4/1.4.12/1.4.8)・Nielsen Norman Group(3記事)は本文を直接取得して確認済み(2026-09)。
 *
 * 2026-09改訂: 四系列比較図を「最小サイズと文字色の濃さ(コントラスト)」に変更し、行送りの図は
 * 下部の「参考」に移動。Apple・Googleの基準サイズ(本文の既定)に印を付け、タイプスケールの段階ごとの
 * 使用例を追加。Appleの使用例はUIKitのUIFont.TextStyleの各説明とHIG(Typography・Toolbars)、
 * Googleの使用例はJetpack Compose Material 3のトークン定義(どの部品がどの段階を使うか)で確認。
 * Googleの基準サイズは、ComposeのMaterialThemeが文字の既定スタイルにbodyLargeを設定していることで確認。
 * NN groupの8ptは「Low-Contrast Text Is Not the Answer」(2015)の本文で確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Typography",
    color: "#C2542A",
    position: "11段階のテキストスタイル(Large Title〜Caption 2)。Dynamic Type(文字サイズの設定)で全体が連動して変わる",
    size: <><Hl>本文17pt(Body)・最小11pt(Caption 2)</Hl>(iOS/iPadOSの既定の設定)。本文は設定で14〜53ptまで変わる。macOSは13/10pt、watchOSは16/12pt(既定/最小)。全段階は下の「タイプスケールの段階ごとの使用例」。</>,
    colorInfo: "本文22pt(約1.29倍)。比率は「意見が分かれる点」。字間はシステムフォントが自動で調整する。3行以上では詰めた行送りを避ける。",
    stance:
      <>固定のサイズではなくテキストスタイルを使い、<Hl>利用者が文字サイズを変えると全体が比例して変わる</Hl>ようにする。最大のサイズでもレイアウトが崩れず、省略が増えないかを確かめる。細いウェイト(Ultralight・Thin・Light)は小さい文字で避ける。独自のフォントでも、推奨のサイズに従い、Dynamic TypeとBold Textに対応する。</>,
    exceptions:
      "拡大時は主な内容を優先してよい(例: タブのタイトルは拡大しなくてよい)。",
    accessibility:
      "知覚可能 ― Dynamic Typeは、WCAG 1.4.4(テキストのサイズ変更)の考え方をOSの機能にしたもの。",
    useCases: [
      "固定のptではなくテキストスタイルを指定する",
      "最大のサイズで、崩れや省略がないか確かめる",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/typography#Ensuring-legibility",
    refs: [
      { label: "Typography", url: "https://developer.apple.com/design/human-interface-guidelines/typography#Ensuring-legibility" },
      { label: "Supporting Dynamic Type", url: "https://developer.apple.com/design/human-interface-guidelines/typography#Supporting-Dynamic-Type" },
      { label: "Large (default)のサイズ表", url: "https://developer.apple.com/design/human-interface-guidelines/typography#Large-default" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・数値表・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Type scale",
    color: "#2F7D6E",
    position: "5つの役割(Display/Headline/Title/Body/Label)×3サイズ=15段階のタイプスケール。太さを強めたEmphasized版もある",
    size: <><Hl>本文16sp(Body Large)・最小11sp(Label Small)</Hl>。spは端末の文字サイズの設定に合わせて変わる単位。全段階は下の「タイプスケールの段階ごとの使用例」。</>,
    colorInfo: "本文24sp(1.5倍)。段階ごとの固定値で、比率は「意見が分かれる点」。字間も段階ごとに決める。",
    stance:
      <><Hl>文字の段階を15のトークンに絞り</Hl>、コンポーネントはトークンを参照する。トークンの値を替えれば全体に反映される。Emphasized版は選択状態・見出しなど強調したい箇所に使う。</>,
    exceptions:
      "トークンの値はブランドに合わせて変えてよい。",
    accessibility:
      "知覚可能 ― spで端末の文字サイズの設定に追従し、WCAG 1.4.4の考え方に沿う。",
    useCases: [
      "文字サイズは直接指定せず、トークンを参照する",
      "本文はBody、ボタンなどの短い文字はLabel",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/typography/type-scale-tokens",
    refs: [
      { label: "Type scale", url: "https://m3.material.io/styles/typography/type-scale-tokens" },
      { label: "MDC Android: Typography theming(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md" },
      { label: "Compose Material 3 TypeScaleTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypeScaleTokens.kt" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていない。数値は、Google公式のMaterial Components for Androidのドキュメント(サイズ・ウェイト)と、Jetpack ComposeのMaterial 3トークン定義(行送り)をソースで直接確認(2026-09)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.4 Resize Text / 1.4.12 Text Spacing / 1.4.8 Visual Presentation",
    color: "#A3821F",
    position: "文字サイズの最小値は定めず、利用者が拡大や間隔の変更をしても壊れないことを求める",
    size: <><NoData>最小値なし</NoData>。<Hl>200%まで拡大しても内容・機能が失われない</Hl>こと(1.4.4・AA)。1行は80文字以内(日本語は40文字以内)にできること(1.4.8・AAA)。</>,
    colorInfo: "1.4.12(AA): 行の高さ1.5倍・段落後2倍・字間0.12倍・単語間隔0.16倍に変えても崩れないこと(初期値ではない。「意見が分かれる点」)。1.4.8(AAA): 両端揃えにしない。",
    glossary: [
      { term: "1.4.4 Resize Text・レベルAA", desc: "支援技術なしで文字を200%まで拡大しても、内容・機能が失われないこと。字幕と文字画像は対象外。" },
      { term: "1.4.12 Text Spacing・レベルAA", desc: "利用者が行の高さ・段落の間隔・字間・単語間隔を決まった値まで広げても、文字が重なったり切れたりしないこと。" },
      { term: "1.4.8 Visual Presentation・レベルAAA", desc: "文章のかたまりの色・行の幅・揃え方・行間・拡大を、利用者が調整できる仕組みを求める、最上位レベルの基準。" },
    ],
    stance:
      <><Hl>WCAGの数値はデザインの初期値ではない</Hl>。利用者が見やすい値に変えたとき、文字が重なったり切れたりしないことを求める。1.4.4はページ全体のズームで満たす方法も認める。</>,
    exceptions:
      "1.4.4は字幕と文字画像を除外。1.4.12は、その言語で使わない間隔(日本語の単語間隔など)は対象外。1.4.8はAAA。",
    accessibility: "知覚可能 ― 3つとも。弱視・ディスレクシア・高齢などで読みにくい人が、自分に合った大きさ・間隔で読めるようにする。",
    useCases: [
      "200%に拡大しても、切れ・重なりがないか確かめる",
      "固定の高さに頼らないレイアウトにする",
    ],
    searchHint: "not required to use these",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html#success-criterion",
    refs: [
      { kind: "sc", level: "AA", label: "1.4.12 テキストの間隔", url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html#success-criterion" },
      { kind: "sc", level: "AA", label: "1.4.4 テキストのサイズ変更", url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html#success-criterion" },
      { kind: "sc", level: "AAA", label: "1.4.8 視覚的提示", url: "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html#success-criterion" },
    ],
    confirmedNote: "3つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Legibility, Readability, and Comprehension など",
    color: "#7A4F7E",
    position: "読みやすさを判読性・可読性・理解度の3段階に分け、文字の見た目は判読性として扱う",
    size: "原則としての言及が中心。目安は8pt以上(2015年)、既定10pt以上・高齢者向け12pt以上(2002年、デスクトップのWebが前提)。",
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      <>「小さすぎる」は視力で人それぞれで、年齢とともに落ちる。<Hl>十分に大きい既定のサイズにし、利用者が変えられるようにする</Hl>。書体は「フォントの種類」を参照。</>,
    exceptions:
      "10pt・12ptは当時のデスクトップのWebの値で、今のpt/spとそのまま比べられない。",
    accessibility: "根拠となる原則 ― 適合区分ではなく、ユーザーテストと読む速さの調査にもとづく。",
    useCases: [
      "既定の文字サイズを小さくしすぎず、拡大できるようにする",
      "高齢の利用者が多いなら、既定のサイズを一段大きくする",
    ],
    searchHint: "No Best Font",
    url: "https://www.nngroup.com/articles/legibility-readability-comprehension/",
    refs: [
      { label: "Legibility, Readability, and Comprehension", url: "https://www.nngroup.com/articles/legibility-readability-comprehension/" },
      { label: "Best Font for Online Reading", url: "https://www.nngroup.com/articles/best-font-for-online-reading/" },
      { label: "Let Users Control Font Size(2002)", url: "https://www.nngroup.com/articles/let-users-control-font-size/" },
      { label: "Low-Contrast Text Is Not the Answer(2015)", url: "https://www.nngroup.com/articles/low-contrast/" },
    ],
    confirmedNote: "4記事とも本文を直接取得して確認済み(2026-09)。ページ内検索の語は「Best Font for Online Reading」の見出し。",
  },
];
markNeg(SOURCES);

/* 四系列比較図: 最小サイズ・基準サイズと、本文の文字色に求められるコントラスト */
const MIN_ROWS = [
  {
    key: "hig", name: "Apple", color: "#C2542A", unit: "pt",
    min: 11, minLabel: "最小 11pt(Caption 2)", base: 17, baseLabel: "基準 17pt(Body)",
    contrast: [{ ratio: "4.5:1", hex: "#767676", note: "17pt以下" }, { ratio: "3:1", hex: "#949494", note: "18pt以上・太字" }],
    contrastNote: "独自の色は7:1を目指す",
  },
  {
    key: "material", name: "Google", color: "#2F7D6E", unit: "sp",
    min: 11, minLabel: "最小 11sp(Label Small)", base: 16, baseLabel: "基準 16sp(Body Large)",
    contrast: [{ ratio: "7:1", hex: "#595959", note: "本文(On Surface)" }, { ratio: "4.5:1", hex: "#767676", note: "補助(On Surface Variant)" }],
    contrastNote: "標準のコントラスト設定での目標値",
  },
  {
    key: "wcag", name: "W3C", color: "#A3821F",
    noMin: "文字サイズの最小値なし(代わりに200%まで拡大できること)",
    contrast: [{ ratio: "4.5:1", hex: "#767676", note: "本文(AA)" }, { ratio: "3:1", hex: "#949494", note: "大きな文字(AA)" }],
    contrastNote: "AAAでは本文7:1・大きな文字4.5:1",
  },
  {
    key: "nn", name: "NN group", color: "#7A4F7E", unit: "pt",
    min: 8, minLabel: "最小 8pt(2015)", base: 10, baseLabel: "既定 10pt以上(2002)", baseMax: 12, baseMaxLabel: "高齢者向け 12pt以上",
    contrast: [],
    contrastNote: "比率の数値はなし。薄い文字は避け、ツールで確認する",
  },
];
markNeg(MIN_ROWS);

function MinSizeScale({ row }) {
  const x0 = 8, x1 = 292, lo = 0, hi = 20;
  const X = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
  const ticks = [0, 5, 10, 15, 20];
  return (
    <svg viewBox="0 0 300 50" width="100%" style={{ display: "block", maxWidth: 360 }} role="img" aria-label={`${row.name}の最小サイズと基準サイズ`}>
      <line x1={X(0)} x2={X(20)} y1={24} y2={24} stroke="#E1E3F0" strokeWidth="2" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={X(t)} x2={X(t)} y1={20} y2={28} stroke="#D5D9EC" strokeWidth="1" />
          <text x={X(t)} y={44} fontSize="8.5" fill="#666D93" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{t}</text>
        </g>
      ))}
      {row.noMin ? (
        <text x={X(0) + 2} y={13} fontSize="9.5" fill="#666D93" fontFamily="'Jost', 'Noto Sans JP', sans-serif">{row.noMin}</text>
      ) : (
        <>
          <rect x={X(row.min)} y={20} width={X(row.baseMax || row.base) - X(row.min)} height={8} rx={4} fill={row.color} opacity={0.22} />
          <circle cx={X(row.min)} cy={24} r={5} fill="#FFFFFF" stroke={row.color} strokeWidth="2" />
          <text x={X(row.min)} y={12} fontSize="9.5" fill="#454C78" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{row.min}</text>
          <rect x={X(row.base) - 5} y={19} width={10} height={10} fill={row.color} transform={`rotate(45 ${X(row.base)} 24)`} />
          <text x={X(row.base)} y={12} fontSize="9.5" fill="#171B36" fontWeight="600" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{row.base}</text>
          {row.baseMax && (
            <>
              <line x1={X(row.baseMax)} x2={X(row.baseMax)} y1={18} y2={30} stroke={row.color} strokeWidth="2" />
              <text x={X(row.baseMax)} y={12} fontSize="9.5" fill="#454C78" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{row.baseMax}</text>
            </>
          )}
        </>
      )}
    </svg>
  );
}

function ContrastSample({ c }) {
  return (
    <div style={styles.contrastSample}>
      <span style={{ fontSize: 13, fontWeight: 500, color: c.hex }}>本文 Aa</span>
      <span style={styles.contrastRatio}>{c.ratio}</span>
      <span style={styles.contrastNoteSmall}>{c.note}</span>
    </div>
  );
}

function MinSizeChart() {
  return (
    <div style={styles.minChart}>
      <div className="dsp-desktop-only">
        <div className="dsp-min-row" style={{ ...styles.minRow, ...styles.minHeadRow }}>
          <div style={styles.minHead} />
          <div style={styles.minHead}>最小サイズ ○ と基準サイズ ◆(目盛りは各系列の単位)</div>
          <div style={styles.minHead}>本文の文字色に求められる濃さ(白背景での下限)</div>
        </div>
      </div>
      {MIN_ROWS.map((r) => (
        <div key={r.key} className="dsp-min-row" style={styles.minRow}>
          <div style={{ ...styles.minName, color: r.color }}>{r.name}</div>
          <div style={{ minWidth: 0 }}>
            <MinSizeScale row={r} />
            {!r.noMin && (
              <div style={styles.minLegend}>
                <span>{r.minLabel}</span>
                <span style={{ fontWeight: 600, color: "#171B36" }}>{r.baseLabel}</span>
                {r.baseMaxLabel && <span>{r.baseMaxLabel}</span>}
              </div>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={styles.contrastRow}>
              {r.contrast.length ? r.contrast.map((c) => <ContrastSample key={c.ratio + c.note} c={c} />) : (
                <div style={{ ...styles.contrastSample, borderStyle: "dashed" }}>
                  <span style={{ fontSize: 13, color: "#171B36" }}>本文 Aa</span>
                  <span style={{ ...styles.contrastRatio, background: "#E1E3F0", color: "#454C78" }}>数値なし</span>
                </div>
              )}
            </div>
            <div style={styles.contrastFoot}>{r.contrastNote}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* タイプスケールの全段階と使用例。base=本文の既定(基準サイズ)、min=最小 */
const SCALES = {
  // Apple: HIG Typography「Large (default)」の表(太さ・サイズ・行送り・強調時の太さ)
  hig: [
    { name: "Large Title", size: 34, lh: 41, w: "Regular", wn: 400, em: "Bold", use: "画面の大きなタイトル。スクロールすると通常サイズのタイトルに切り替わる" },
    { name: "Title 1", size: 28, lh: 34, w: "Regular", wn: 400, em: "Bold", use: "第1階層の見出し" },
    { name: "Title 2", size: 22, lh: 28, w: "Regular", wn: 400, em: "Bold", use: "第2階層の見出し" },
    { name: "Title 3", size: 20, lh: 25, w: "Regular", wn: 400, em: "Semibold", use: "第3階層の見出し" },
    { name: "Headline", size: 17, lh: 22, w: "Semibold", wn: 600, em: "Semibold", use: "見出し(同じ17ptの本文と太さで区別する)" },
    { name: "Body", size: 17, lh: 22, w: "Regular", wn: 400, em: "Semibold", base: true, use: "本文。複数行を快適に読める設定" },
    { name: "Callout", size: 16, lh: 21, w: "Regular", wn: 400, em: "Semibold", use: "本文に添える補足・吹き出し" },
    { name: "Subhead", size: 15, lh: 20, w: "Regular", wn: 400, em: "Semibold", use: "小見出し" },
    { name: "Footnote", size: 13, lh: 18, w: "Regular", wn: 400, em: "Semibold", use: "脚注" },
    { name: "Caption 1", size: 12, lh: 16, w: "Regular", wn: 400, em: "Semibold", use: "標準のキャプション" },
    { name: "Caption 2", size: 11, lh: 13, w: "Regular", wn: 400, em: "Semibold", min: true, use: "もう一段小さいキャプション" },
  ],
  // Google: Jetpack Compose Material 3 TypeScaleTokens(サイズ・行送り・太さ・字間)
  material: [
    { name: "Display Large", size: 57, lh: 64, w: "Regular", wn: 400, tr: -0.2, use: "時刻ピッカーの時刻表示" },
    { name: "Display Medium", size: 45, lh: 52, w: "Regular", wn: 400, tr: 0, use: "時刻の入力欄の数字" },
    { name: "Display Small", size: 36, lh: 44, w: "Regular", wn: 400, tr: 0, use: "大きいアプリバー(フレキシブル)のタイトル" },
    { name: "Headline Large", size: 32, lh: 40, w: "Regular", wn: 400, tr: 0, use: "日付ピッカーの選択日の見出し" },
    { name: "Headline Medium", size: 28, lh: 36, w: "Regular", wn: 400, tr: 0, use: "大きいアプリバーのタイトル" },
    { name: "Headline Small", size: 24, lh: 32, w: "Regular", wn: 400, tr: 0, use: "ダイアログの見出し、中サイズのアプリバーのタイトル" },
    { name: "Title Large", size: 22, lh: 28, w: "Regular", wn: 400, tr: 0, use: "標準(小)のアプリバーのタイトル" },
    { name: "Title Medium", size: 16, lh: 24, w: "Medium", wn: 500, tr: 0.2, use: "リストの頭文字アバター、時刻ピッカーの午前/午後" },
    { name: "Title Small", size: 14, lh: 20, w: "Medium", wn: 500, tr: 0.1, use: "タブのラベル、ナビゲーションドロワーの見出し" },
    { name: "Body Large", size: 16, lh: 24, w: "Regular", wn: 400, tr: 0.5, base: true, use: "リストの項目名、テキストフィールドの入力文字、検索バー" },
    { name: "Body Medium", size: 14, lh: 20, w: "Regular", wn: 400, tr: 0.2, use: "ダイアログ・スナックバーの本文、リストの補足文" },
    { name: "Body Small", size: 12, lh: 16, w: "Regular", wn: 400, tr: 0.4, use: "テキストフィールドの補助テキスト、ツールチップ" },
    { name: "Label Large", size: 14, lh: 20, w: "Medium", wn: 500, tr: 0.1, use: "ボタン・チップのラベル、スナックバーのアクション" },
    { name: "Label Medium", size: 12, lh: 16, w: "Medium", wn: 500, tr: 0.5, use: "タブバーのラベル、アプリバーのサブタイトル" },
    { name: "Label Small", size: 11, lh: 16, w: "Medium", wn: 500, tr: 0.5, min: true, use: "バッジの数字、リストのオーバーライン(項目名の上の小さな文字)" },
  ],
};

/* コントラスト比: Appleは文字サイズと太さで決まる(17pt以下4.5:1、18pt以上または太字3:1)。
   Googleは文字の段階ではなく、組み合わせる色のロールで決まる */
function contrastFor(k, r) {
  if (k === "hig") return r.size >= 18 ? "3:1" : "4.5:1";
  return null;
}

function ScaleBadge({ base, min }) {
  if (base) return <span style={styles.badgeBase}>基準</span>;
  if (min) return <span style={styles.badgeMin}>最小</span>;
  return null;
}

function ScaleTable({ k, title, unit, color, note }) {
  return (
    <div style={styles.scaleCol}>
      <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 2 }}>{title}</div>
      <div style={styles.scaleNote}>{note}</div>
      {SCALES[k].map((r) => (
        <div key={r.name} style={{ ...styles.scaleRow, ...(r.base ? styles.scaleRowBase : {}) }}>
          <span style={{ fontSize: r.size * 0.6, fontWeight: r.weight || 400, lineHeight: 1.15, color: "#171B36", width: 40, flexShrink: 0 }}>Aa</span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={styles.scaleNameRow}>
              <span style={styles.scaleName}>{r.name}</span>
              <ScaleBadge base={r.base} min={r.min} />
              <span style={styles.scaleSize}>{r.size}{unit}</span>
            </div>
            <div style={styles.scaleSpecRow}>
              <span style={styles.specChip}>太さ {r.w}({r.wn}){r.em ? ` / 強調時 ${r.em}` : ""}</span>
              <span style={styles.specChip}>行送り {r.lh}{unit}({(r.lh / r.size).toFixed(2)}倍)</span>
              {r.tr !== undefined && <span style={styles.specChip}>字間 {r.tr}{unit}</span>}
              {contrastFor(k, r) && <span style={{ ...styles.specChip, ...styles.specChipContrast }}>コントラスト {contrastFor(k, r)}以上</span>}
            </div>
            <div style={styles.scaleUse}>{r.use}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TypeScaleUsage() {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      <ScaleTable k="hig" title="Apple ― テキストスタイル(全11段階)" unit="pt" color="#C2542A" note="iOS/iPadOSの既定の文字サイズ設定(Large)での値(HIGの表)。基準=HIGが示す既定サイズ(Default size)。コントラストは段階ごとの指定ではなく、HIG(Accessibility)の「17pt以下は4.5:1、18pt以上または太字は3:1」を各段階に当てはめた値(Appleの表の値。WCAGでは小さい太字は3:1の対象外)。字間はシステムフォントがサイズに応じて自動で調整する" />
      <ScaleTable k="material" title="Google ― タイプスケール(全15段階)" unit="sp" color="#2F7D6E" note="基準=Jetpack ComposeのMaterialThemeが文字の既定スタイルに使う段階。太さ・行送り・字間はJetpack Composeのトークン定義(TypeScaleTokens)の値、使用例は標準コンポーネントのトークン定義から。コントラスト比は文字の段階には指定がなく、組み合わせる色のロールで決まる(本文のOn Surfaceは7:1、補助のOn Surface Variantは4.5:1)" />
    </div>
  );
}

/* 参考図用: 各系列の「文字サイズに対する行送りの比率」 */
const LEADING_ROWS = [
  { key: "hig", name: "Apple", color: "#C2542A", min: 1.18, max: 1.39, mark: 1.29, markLabel: "Body 17/22pt ≈1.29", note: "テキストスタイル全体(既定サイズ)" },
  { key: "material", name: "Google", color: "#2F7D6E", min: 1.12, max: 1.5, mark: 1.5, markLabel: "Body Large 16/24sp =1.5", note: "タイプスケール全体" },
  { key: "wcag", name: "W3C", color: "#A3821F", line: 1.5, markLabel: "1.5倍に変更しても崩れないこと", note: "1.4.12(AA)の耐性テスト値" },
  { key: "nn", name: "NN group", color: "#7A4F7E", none: true, markLabel: "数値基準なし(原則としての言及)" },
];

function LeadingChart() {
  const x0 = 96, x1 = 520, lo = 1.0, hi = 1.8;
  const X = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
  const rowH = 34, top = 18;
  const ticks = [1.0, 1.2, 1.4, 1.6, 1.8];
  const h = top + rowH * LEADING_ROWS.length + 20;
  return (
    <svg viewBox={`0 0 540 ${h}`} width="100%" style={{ maxWidth: 620, display: "block", margin: "0 auto" }} role="img" aria-label="文字サイズに対する行送りの比率の比較図">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={X(t)} x2={X(t)} y1={top - 6} y2={h - 18} stroke="#E1E3F0" strokeWidth="1" />
          <text x={X(t)} y={h - 5} fontSize="10" fill="#666D93" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{t.toFixed(1)}倍</text>
        </g>
      ))}
      {LEADING_ROWS.map((r, i) => {
        const y = top + i * rowH + 10;
        return (
          <g key={r.key}>
            <text x={0} y={y + 4} fontSize="11.5" fill="#171B36" fontFamily="'Jost', 'Noto Sans JP', sans-serif" fontWeight="600">{r.name}</text>
            {r.min && (
              <>
                <rect x={X(r.min)} y={y - 4} width={X(r.max) - X(r.min)} height="8" rx="4" fill={r.color} opacity="0.25" />
                <circle cx={X(r.mark)} cy={y} r="5" fill={r.color} />
                <text x={X(r.mark) + 9} y={y - 7} fontSize="10" fill="#454C78" fontFamily="'Jost', 'Noto Sans JP', sans-serif">{r.markLabel}</text>
              </>
            )}
            {r.line && (
              <>
                <line x1={X(r.line)} x2={X(r.line)} y1={top - 6} y2={h - 18} stroke={r.color} strokeWidth="1.6" strokeDasharray="4 3" />
                <text x={X(r.line) + 7} y={y + 4} fontSize="10" fill="#454C78" fontFamily="'Jost', 'Noto Sans JP', sans-serif">{r.markLabel}</text>
              </>
            )}
            {r.none && (
              <text x={X(1.0) + 4} y={y + 4} fontSize="10" fill="#666D93" fontFamily="'Jost', 'Noto Sans JP', sans-serif">{r.markLabel}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* 画像エリア: Apple・Googleの文字サイズの段階(実寸の60%) */
const LADDER = {
  hig: [["Large Title", 34], ["Title 1", 28], ["Title 2", 22], ["Title 3", 20], ["Body", 17, "base"], ["Footnote", 13], ["Caption 2", 11, "min"]],
  material: [["Display L", 57], ["Headline L", 32], ["Title L", 22], ["Title M", 16], ["Body L", 16, "base"], ["Body M", 14], ["Label S", 11, "min"]],
};

function TypeLadder() {
  const col = (key, title, unit, color) => (
    <div style={{ flex: "1 1 220px", minWidth: 0, textAlign: "left" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 6 }}>{title}</div>
      {LADDER[key].map(([n, s, mark]) => (
        <div key={n} style={{ display: "flex", alignItems: "baseline", gap: 8, borderBottom: "1px dashed #E1E3F0", padding: "2px 0", ...(mark === "base" ? { background: "#F0F4F8" } : {}) }}>
          <span style={{ fontSize: s * 0.6, lineHeight: 1.2, color: "#171B36", width: 44, flexShrink: 0 }}>Aa</span>
          <span style={{ fontSize: 10.5, color: "#565D8A" }}>{n}</span>
          <ScaleBadge base={mark === "base"} min={mark === "min"} />
          <span style={{ marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#454C78" }}>{s}{unit}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {col("hig", "Apple ― テキストスタイル(抜粋)", "pt", "#C2542A")}
      {col("material", "Google ― タイプスケール(抜粋)", "sp", "#2F7D6E")}
    </div>
  );
}

/* No.007: フォントの種類(4系列) */
const FONT_COLS = ["Apple", "Google", "W3C", "NN group"];
const FONT_ROWS = [
  { k: "システムの既定のフォント", v: [
    <>San Francisco(SF、サンセリフ)。iOS・iPadOS・macOSはSF Pro、watchOSはSF Compact</>,
    <>Roboto(Androidの既定。M3のタイプスケールで使う)</>,
    <NoData>記載なし(フォントを指定しない)</NoData>,
    <NoData>記載なし</NoData>,
  ] },
  { k: "ほかに用意されているもの", v: [
    <>New York(NY、セリフ。SFと組み合わせて使える)、SF Mono(等幅)、角の丸いRounded版、アラビア文字・ヘブライ文字などの各言語版</>,
    <>Roboto Flex(可変フォント)、Roboto Serif(セリフ)、Roboto Mono(等幅。数字をそろえるのに向く)、Noto Sans(多言語)</>,
    <NoData>記載なし</NoData>,
    <NoData>記載なし</NoData>,
  ] },
  { k: "可変フォント", v: [
    <>SFとNYは可変フォントで、文字の大きさに合わせて形を自動で調整する(光学サイズ)</>,
    <>Roboto Flexは太さ・幅・光学サイズなどを変えられるが、M3のタイプスケールにはまだ含まれていない</>,
    <NoData>記載なし</NoData>,
    <NoData>記載なし</NoData>,
  ] },
  { k: "独自のフォントを使うとき", v: [
    <>推奨の最小サイズを守り、Dynamic Type(文字サイズの設定)と太字の設定に自分で対応する。書体の数はしぼる</>,
    <>大きい文字(Display・Headline)用の「ブランド」と、小さい文字(Body・Label)用の「プレーン」の2つのトークンを差し替える。文字サイズは変えず、行送りと字間で調整する</>,
    <>フォントの指定はないが、文字は画像にせず本物の文字で表示する(1.4.5 文字画像・AA)。利用者が行送り・字間を広げても内容が欠けないようにする(1.4.12 テキストの間隔・AA)</>,
    <>すべての人に最適なフォントはない。人によって速く読めるフォントが違い(自分の最も速い書体は最も遅い書体より平均35%速い)、好みのフォントが速く読めるフォントとは限らない。年齢が20歳上がるごとに読む速さが約11%遅くなる</>,
  ] },
  { k: "多言語・フォールバック", v: [
    <>SFに各言語版がある(SFとNYは多くの言語に対応するとしている)。日本語の書体の指定は<NoData>記載なし</NoData>(実装の例: 日本語はOSの日本語フォントで表示される。AI解釈)</>,
    <>文字がないときの代わり(フォールバック)は Roboto Flex → Roboto → Noto Sans の順。Noto Sansは150以上の文字体系に対応(実装の例: 日本語はNoto Sans JPなどNotoの日本語版で表示される。AI解釈)</>,
    <NoData>記載なし</NoData>,
    <NoData>記載なし</NoData>,
  ] },
];
const FONT_REFS = [
  { s: "Apple", label: "Typography ― Using system fonts", url: "https://developer.apple.com/design/human-interface-guidelines/typography#Using-system-fonts" },
  { s: "Google", label: "Typography ― Fonts", url: "https://m3.material.io/styles/typography/fonts" },
  { s: "Google", label: "Type scale tokens(ブランドとプレーン)", url: "https://m3.material.io/styles/typography/type-scale-tokens" },
  { s: "W3C", label: "Understanding 1.4.5 Images of Text", url: "https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html" },
  { s: "W3C", label: "Understanding 1.4.12 Text Spacing", url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html" },
  { s: "NN group", label: "Best Font for Online Reading: No Single Answer", url: "https://www.nngroup.com/articles/best-font-for-online-reading/" },
];

function FontTypes() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>フォントの種類</h2>
      <p style={styles.fontLead}>システムのフォントを持つのはAppleとGoogleだ。どちらも<Hl>サンセリフを既定にし、セリフ・等幅・可変フォントを別に用意</Hl>している。W3CとNN groupはフォントを指定せず、W3Cは文字の扱い方、NN groupは読みやすさの調査を示している。</p>
      <div style={styles.fontSamples}>
        {[
          { n: "サンセリフ", f: "-apple-system, 'Helvetica Neue', Roboto, sans-serif", ex: "SF Pro / Roboto" },
          { n: "セリフ", f: "'New York', Georgia, 'Roboto Serif', serif", ex: "New York / Roboto Serif" },
          { n: "等幅", f: "'SF Mono', 'Roboto Mono', 'IBM Plex Mono', monospace", ex: "SF Mono / Roboto Mono" },
        ].map((x) => (
          <div key={x.n} style={styles.fontSample}>
            <div style={{ fontFamily: x.f, fontSize: 22, color: "#171B36" }}>Aa 012</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#171B36" }}>{x.n}</div>
            <div style={{ fontSize: 10.5, color: "#666D93" }}>{x.ex}</div>
          </div>
        ))}
      </div>
      <p style={styles.fontNote}>見本は閲覧中の端末にあるフォントで表示している(端末によっては別のフォントになる)。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.fontTable}>
          <thead><tr><th style={styles.fontTh} />{FONT_COLS.map((c) => (<th key={c} style={styles.fontTh}>{c}</th>))}</tr></thead>
          <tbody>
            {FONT_ROWS.map((r) => (
              <tr key={r.k}><th style={{ ...styles.fontTd, ...styles.fontRowHead }}>{r.k}</th>{r.v.map((v, i) => (<td key={i} style={styles.fontTd}>{v}</td>))}</tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={styles.fontRefs}>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#171B36" }}>参照ページ(公式)</span>
        {FONT_REFS.map((r) => (<a key={r.url} href={r.url} target="_blank" rel="noreferrer" style={styles.fontRefLink}>{r.s}: {r.label} ↗</a>))}
      </div>
    </section>
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

/* 意見が分かれる点(2026-11 ⑦本人レビューNo.007で、比較表から切り出した) */
const SPLITS = [
  {
    q: "本文の行送り(行の高さ)はどれくらいにする?",
    figure: <><LeadingChart /><p style={{ fontSize: 11, color: "#565D8A", margin: "6px 0 0", lineHeight: 1.6 }}>帯=段階全体の範囲、丸=本文の値。W3Cの破線は初期値ではなく、この値に変えても崩れないことを求める値。</p></>,
    sides: [
      { who: "Apple", color: "#C2542A", t: "本文は約1.29倍(17pt/22pt)。段階全体で約1.18〜1.39倍で、大きい文字ほど比率を小さくする" },
      { who: "Google", color: "#2F7D6E", t: "本文は1.5倍(Body Large 16sp/24sp)。段階全体で約1.12〜1.5倍で、大きい文字ほど比率を小さくする" },
      { who: "W3C", color: "#A3821F", t: "初期値は決めない。利用者が1.5倍に変えても崩れないことを求める(1.4.12・AA)。この値を使う必要はないと注記している" },
    ],
    tip: <>Appleの約1.29倍もWCAGに反しない(WCAGの1.5倍は耐性のテストの値)。どちらの値もラテン文字が前提なので、<strong>日本語の長い文章は広めに取り、実際の文章で確かめる</strong>(W3Cの<a href="https://www.w3.org/TR/jlreq/" target="_blank" rel="noreferrer" style={{ color: "#3A4FCF" }}>「日本語組版処理の要件」(JLReq)</a>も参考になる。WCAGの達成基準ではない)。</>,
  },
  {
    q: "文字の最小サイズを決める?",
    sides: [
      { who: "Apple・Google", color: "#C2542A", t: "決める。最小はApple 11pt(Caption 2)、Google 11sp(Label Small)" },
      { who: "W3C", color: "#A3821F", t: "決めない。代わりに、200%まで拡大しても内容と機能が失われないことを求める(1.4.4・AA)" },
      { who: "NN group", color: "#7A4F7E", t: "目安を示す。8pt以上(2015年)、既定10pt以上・高齢者向け12pt以上(2002年、当時のデスクトップのWeb)" },
    ],
    tip: "最小サイズを守ることと、拡大しても崩れないことは別の問題。11を下回らないようにしたうえで、文字サイズの設定や200%の拡大で崩れないかも確かめる。",
  },
];

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "文字の大きさの段階、行の間隔、文字を拡大したときの対応の決まり";
const ABOUT = [
  { k: "目的・役割", v: "見出し・本文などの役割に合った文字の大きさをそろえ、読みやすくする" },
  { k: "関わる場面", v: "見出しと本文の大きさ、行間、利用者が文字を大きくする設定への対応" },
  { k: "関連するページ", v: <><PageLink to="/tokens/color">カラー</PageLink>、<PageLink to="/tokens/layout-spacing">レイアウト・スペーシング</PageLink></> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "名前の付いた段階から選ぶ", d: "文字サイズを自由に決めず、決まった段階から選ぶ", who: "Apple・Google" },
  { n: 2, t: "本文と最小の大きさ", d: "本文はApple 17pt・Google 16sp、最小はどちらも11", who: "Apple・Google" },
  { n: 3, t: "利用者の文字サイズの設定に合わせる", d: "設定に連動して大きさが変わるようにする", who: "Apple・Google" },
  { n: 4, t: "行送りは文字の大きさで変える", d: "大きい文字ほど比率を小さくする。本文はAppleが約1.29倍、Googleが1.5倍。どちらもラテン文字の値で、日本語の長い文章では広めに取り、実際の文章で確かめる(AI解釈)", who: "Apple・Google" },
];

export default function TokensTypographyPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        .dsp-mobile-only { display: block; }
        .dsp-desktop-only { display: none; }
        .dsp-min-row { grid-template-columns: 1fr; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
          .dsp-min-row { grid-template-columns: 90px minmax(0, 1.1fr) minmax(0, 1fr); }
          .dsp-mobile-only { display: none; }
          .dsp-desktop-only { display: block; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/tokens/typography" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>Foundation / タイポグラフィ</span>
            <span>SPEC No. 043</span>
          </div>

          <h1 style={styles.title}>タイポグラフィ(文字サイズ・行間)</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="文字サイズの段階(実寸の60%で表示)"
            image={<><TypeLadder /></>}
            imageNote={<>AppleもGoogleも、文字サイズを自由に指定するのではなく、名前の付いた段階から選ぶ仕組みだ。<strong>基準(本文の既定)はAppleがBodyの17pt、GoogleがBody Largeの16sp</strong>、最小はどちらも11だ。全段階と使用例は下部の「タイプスケールの段階ごとの使用例」を参照。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <SplitSection splits={SPLITS} />

          <div style={{ marginBottom: 22 }}>
            <h2 style={styles.diagramTitle}>四系列比較図 ― 最小サイズと文字色の濃さ(コントラスト)</h2>
            <MinSizeChart />
            <p style={styles.chartNote}>○=最小サイズ、◆=基準(本文の既定)サイズ。pt(Apple)・sp(Google)・NN groupのpt(当時のデスクトップのWeb)は実際の大きさが一致しない単位のため、同じ目盛りに並べたのは目安だ。右側の「本文 Aa」は、白背景でその比率ちょうどになる灰色で表示しており、これより薄い色は基準を下回る。</p>
          </div>

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              AppleとGoogleは、<strong>名前の付いた文字の段階から選び、利用者の文字サイズの設定に連動させる</strong>という同じ作り。<strong>本文はApple 17pt・Google 16sp、最小はどちらも11</strong>で、数値も近い。W3Cは最小値を決めず、200%まで拡大できることを求める。
            </p>
            <p style={styles.synthesisText}>
              分かれるのは行送りで、本文はAppleが約1.29倍、Googleが1.5倍(「意見が分かれる点」)。W3Cの1.5倍は初期値ではなく耐性のテストの値。NN groupも<strong>十分に大きい既定のサイズと、利用者が変えられること</strong>を条件にしており、<strong>4系列とも「文字を固定せず、拡大しても崩れない作り」</strong>に行き着く。
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
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="文字サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="行送り・字間">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
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
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>文字サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>行送り・字間</div>
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

          <section style={styles.usageSection}>
            <h2 style={styles.diagramTitle}>タイプスケールの段階ごとの使用例(実寸の60%で表示)</h2>
            <p style={styles.sectionLead}>
              Apple・Googleとも、<strong>基準は「本文」の段階</strong>(Apple=Body 17pt、Google=Body Large 16sp)で、他の段階はそこから上下に広がる。Googleは段階の名前が役割(Display/Headline/Title/Body/Label)を表し、ボタンなどのコンポーネントの文字はLabel、見出しはHeadline・Titleを使う。
            </p>
            <TypeScaleUsage />
          </section>

          <FontTypes />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
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
  fontLead: { fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: "0 0 12px" },
  fontSamples: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8, marginBottom: 4 },
  fontSample: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px" },
  fontNote: { fontSize: 10.5, color: "#666D93", margin: "0 0 12px" },
  fontTable: { width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457" },
  fontTh: { textAlign: "left", fontSize: 11.5, fontWeight: 700, color: "#171B36", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  fontTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  fontRowHead: { background: "#F8F9FD", fontWeight: 700, color: "#454C78", width: 130, textAlign: "left" },
  fontRefs: { display: "flex", flexDirection: "column", gap: 3, marginTop: 10 },
  fontRefLink: { fontSize: 11, color: "#3A4FCF" },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  sectionLead: { fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: "0 0 14px" },
  minChart: { display: "flex", flexDirection: "column" },
  minRow: { display: "grid", gap: "6px 16px", alignItems: "center", padding: "10px 0", borderTop: "1px solid #E1E3F0" },
  minHeadRow: { borderTop: "none", paddingTop: 0 },
  minHead: { fontSize: 10.5, color: "#666D93" },
  minName: { fontSize: 13, fontWeight: 700 },
  minLegend: { display: "flex", flexWrap: "wrap", gap: "2px 10px", fontSize: 10.5, color: "#565D8A", marginTop: 2 },
  contrastRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  contrastSample: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "6px 9px", minWidth: 112 },
  contrastRatio: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 600, color: "#FFFFFF", background: "#3C5A73", borderRadius: 3, padding: "1px 6px" },
  contrastNoteSmall: { fontSize: 10, color: "#565D8A" },
  contrastFoot: { fontSize: 10.5, color: "#666D93", marginTop: 4 },
  usageSection: { marginBottom: 22 },
  scaleCol: { flex: "1 1 320px", minWidth: 0, textAlign: "left" },
  scaleNote: { fontSize: 10.5, color: "#666D93", lineHeight: 1.5, marginBottom: 6 },
  scaleRow: { display: "flex", alignItems: "center", gap: 8, borderBottom: "1px dashed #E1E3F0", padding: "5px 4px" },
  scaleRowBase: { background: "#F0F4F8", borderRadius: 3 },
  scaleNameRow: { display: "flex", alignItems: "center", gap: 6 },
  scaleName: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 600, color: "#171B36" },
  scaleSize: { marginLeft: "auto", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#454C78" },
  scaleSpecRow: { display: "flex", flexWrap: "wrap", gap: 4, margin: "3px 0 3px" },
  specChip: { fontSize: 9.5, fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", color: "#3C5A73", background: "#EEF1FA", padding: "1px 5px", borderRadius: 3 },
  specChipContrast: { color: "#2F7D6E", background: "#E6F2EE" },
  scaleUse: { fontSize: 10.5, lineHeight: 1.5, color: "#565D8A", marginTop: 1 },
  badgeBase: { fontSize: 9.5, fontWeight: 700, color: "#FFFFFF", background: "#3C5A73", borderRadius: 3, padding: "1px 5px" },
  badgeMin: { fontSize: 9.5, fontWeight: 700, color: "#3C5A73", border: "1px solid #3C5A73", borderRadius: 3, padding: "0 4px" },
};
