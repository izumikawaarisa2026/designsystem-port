import React from "react";
import SidebarNav from "./sidebar-nav";

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
 * 2026-09改訂: 四サイト比較図を「最小サイズと文字色の濃さ(コントラスト)」に変更し、行送りの図は
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
    position: "Large Title〜Caption 2の11段階の「テキストスタイル」にサイズ・行送りを定義し、Dynamic Type(ユーザーの文字サイズ設定)で全体が連動して拡大縮小する方式",
    size: "iOS/iPadOSの既定の文字サイズ設定(Large)で、基準となる本文(Body)は17pt・最小は11pt(Caption 2)。文字色のコントラストは17pt以下で4.5:1、18pt以上または太字で3:1(Accessibilityページ)。Large Title 34 / Title 1 28 / Title 2 22 / Title 3 20 / Headline 17 / Body 17 / Callout 16 / Subhead 15 / Footnote 13 / Caption 1 12 / Caption 2 11(pt)。本文は設定に応じてxSmallの14ptからxxxLargeの23pt、アクセシビリティサイズ最大(AX5)の53ptまで変化します。プラットフォーム別の既定/最小はmacOS 13/10pt、tvOS 29/23pt、visionOS 17/12pt、watchOS 16/12pt。",
    colorInfo: "テキストスタイルごとに行送り(leading)を指定。本文は17ptに対して22pt(約1.29倍)、Large Titleは34ptに対して41pt。既定サイズでの行送りの比率は約1.18〜1.39倍の範囲です。字間(tracking)はシステムフォントがサイズごとに自動調整するため、通常は指定不要としています。長文ではゆったりした行送り(loose leading)、高さに制約がある場所では詰めた行送り(tight leading)を選べますが、3行以上のテキストでは詰めた行送りを避けるよう勧めています。",
    stance:
      "Appleは固定のフォントサイズではなく、システムが用意したテキストスタイルを使うことを勧めています。テキストスタイルはウェイト・サイズ・行送りの組み合わせで情報の階層を表し、ユーザーが文字サイズを変えると全体が比例して拡大縮小します。文字を大きくしたときにはレイアウトが崩れないか、省略(truncation)が増えないかを、最大のアクセシビリティサイズまで実際に確かめるよう求めています。細いウェイト(Ultralight・Thin・Light)は小さい文字で読みにくいため避けるべきとしています(ページ本文を直接確認、2026-09)。",
    exceptions:
      "カスタムフォントを使う場合も、既定・最小サイズの推奨値に従い、Dynamic TypeやBold Text(文字を太くする設定)に自前で対応する必要があるとしています。文字サイズを大きくしたときに、すべての文字を同じように大きくする必要はなく、ユーザーが読みたい主要なコンテンツを優先してよい(例: タブのタイトルは拡大しなくてよい)とも述べています。",
    accessibility:
      "知覚可能(Perceivable) ― Dynamic Typeはユーザーが読みやすい文字サイズを選べる仕組みで、WCAG 1.4.4(テキストのサイズ変更)の考え方をOSの機能として実現したものといえます。テキストスタイルを使えば、この拡大に自動的に追従します。",
    useCases: [
      "固定のpt値ではなくテキストスタイル(Body・Headline等)を指定する",
      "本文は17pt、どんな場合も11pt未満にしない(iOS/iPadOS)",
      "最大のアクセシビリティサイズでレイアウト崩れ・省略がないか確認する",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/typography#Ensuring-legibility",
    urlSecondary: [
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
    position: "Display/Headline/Title/Body/Labelの5つの役割 × Large/Medium/Smallの3サイズ=15段階の「タイプスケール」を定義。さらに同じ15段階に太さを強めた「Emphasized」版がある",
    size: "Display 57 / 45 / 36、Headline 32 / 28 / 24、Title 22 / 16 / 14、Body 16 / 14 / 12、Label 14 / 12 / 11(いずれもLarge/Medium/Smallの順、単位sp)。基準(本文の既定)はBody Large 16sp(Jetpack ComposeのMaterialThemeが文字の既定スタイルに設定)、最小はLabel Small 11sp。本文の文字色(On Surface)は背景に対して7:1が目標値です。spはAndroidの端末の文字サイズ設定に応じて拡縮する単位です。",
    colorInfo: "行送り(line height)はDisplay Large 64sp、Body Large 24sp、Body Medium 20sp、Label Small 16spなど、段階ごとに固定値で定義。比率に直すとBody Largeが1.5倍、Display Largeは約1.12倍で、大きい文字ほど行送りの比率が小さくなる設計です(全体で約1.12〜1.5倍)。スタイルはフォント・ウェイト・サイズ・字間などの組み合わせとしてトークン化されています。",
    stance:
      "Material Design 3は、UI全体で使う文字の段階を15種類の名前付きトークンに絞り、コンポーネントはこのトークンを参照します。ブランドに合わせてフォントやサイズを変える場合も、トークンの値を差し替えれば全体に反映される仕組みです。Emphasized版は、選択状態・アクション・見出しなど、強調して階層を作りたい箇所に使うとしています(Google公式のMaterial Components for Androidのドキュメントで確認、2026-09)。",
    exceptions:
      "トークンの値はブランドに合わせて変更できる前提です(カスタマイズ例として、Display Smallを64spに変える例が示されています)。m3.material.io本文の指針(最小サイズの考え方など)は、サイトがSPAのため直接確認できていません。",
    accessibility:
      "知覚可能(Perceivable) ― 単位にspを使うことで、端末の文字サイズ設定による拡大に追従し、WCAG 1.4.4(テキストのサイズ変更)の考え方に沿う仕組みです。Body Largeの行送り1.5倍は、WCAG 1.4.12・1.4.8で登場する1.5倍という値とも一致しています。",
    useCases: [
      "文字サイズは直接指定せず、タイプスケールのトークン(bodyLarge等)を参照する",
      "本文にはBody(Large 16sp/Medium 14sp)を使い、Labelはボタン等の短い文字に使う",
      "強調したい見出しや選択状態にはEmphasized版を使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/typography/type-scale-tokens",
    urlSecondary: [
      { label: "MDC Android: Typography theming(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md" },
      { label: "Compose Material 3 TypeScaleTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TypeScaleTokens.kt" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。数値は、Google公式のMaterial Components for Androidのドキュメント(サイズ・ウェイト)と、Jetpack ComposeのMaterial 3トークン定義(行送り)をソースで直接確認(2026-09)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.4 Resize Text / 1.4.12 Text Spacing / 1.4.8 Visual Presentation",
    color: "#A3821F",
    position: "文字サイズの最小値は定めず、「ユーザーが拡大・行間の変更をしても表示が壊れないこと」を求める基準",
    size: "文字サイズそのものの最小値はありません。1.4.4(レベルAA): 支援技術を使わずに200%まで拡大しても、内容や機能が失われないこと(字幕と文字画像は除く)。1.4.8(レベルAAA): 1行の幅は80文字以内(CJKは40文字以内)にできること、200%に拡大しても横スクロールなしで1行を読めること。",
    colorInfo: "1.4.12(レベルAA): 行の高さを文字サイズの1.5倍以上、段落の後の間隔を2倍以上、字間を0.12倍以上、単語間隔を0.16倍以上に変更しても、内容や機能が失われないこと。1.4.8(レベルAAA): 段落内の行間を1.5倍以上、段落間の間隔をその行間の1.5倍以上にできること、両端揃えにしないこと。",
    glossary: [
      { term: "1.4.4 Resize Text・レベルAA", desc: "支援技術なしで文字を200%まで拡大しても、内容・機能が失われないことを求める基準。字幕と文字画像は対象外。" },
      { term: "1.4.12 Text Spacing・レベルAA", desc: "ユーザーが行の高さ・段落の間隔・字間・単語間隔を指定の値まで広げても、文字の重なりや切れが起きないことを求める基準。" },
      { term: "1.4.8 Visual Presentation・レベルAAA", desc: "文章のかたまりについて、色・行の幅・揃え方・行間・拡大をユーザーが調整できる仕組みを求める、最上位レベルの基準。" },
    ],
    stance:
      "WCAGの数値は、デザインの初期値として使うための値ではありません。1.4.12・1.4.8には「コンテンツがこの値を使う必要はない」と明記されており、求められているのは、ユーザーが自分で見やすい値に変えたときに、文字が重なったり切れたりしないことです。1.4.4も、拡大の大部分はブラウザなどのユーザーエージェントの役割とし、ページ全体のズームで満たす方法も認めています。",
    exceptions:
      "1.4.4は字幕と文字画像を適用除外としています。1.4.12は、ある言語・文字体系でもともと使われない文字間の設定(例: 単語間スペースを使わない言語の単語間隔)については、存在するものだけで適合してよいとしています。1.4.8はレベルAAAで、多くのサイトが目標とするAAには含まれません。",
    accessibility: "知覚可能(Perceivable) ― 1.4.4・1.4.12・1.4.8はいずれもPOURの「知覚可能」に属し、弱視・ディスレクシア(読字障害)・高齢などで文字が読みにくい人が、自分に合った大きさ・間隔に調整して読めることを目的としています。",
    useCases: [
      "200%に拡大しても文字の切れ・重なり・機能の消失がないか確認する",
      "行の高さ1.5倍・段落後2倍・字間0.12倍・単語間隔0.16倍を当てても崩れない、固定高さに頼らないレイアウトにする",
      "長文は1行80文字(日本語は40文字)以内に収められるようにする(AAA)",
    ],
    searchHint: "not required to use these",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html#success-criterion",
    urlSecondary: [
      { label: "1.4.4 Resize Text", url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html#success-criterion" },
      { label: "1.4.8 Visual Presentation", url: "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html#success-criterion" },
    ],
    confirmedNote: "3つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Legibility, Readability, and Comprehension ほか",
    color: "#7A4F7E",
    position: "読みやすさを「判読性(文字が見分けられるか)・可読性(文が難しすぎないか)・理解度」の3段階に分け、文字の見た目は最初の判読性の問題として扱う実務指針(適合基準ではない)",
    size: "数値基準ではなく原則としての言及が中心です。2015年の記事では、文字を小さくして目立たなさを調整する場合も少なくとも8ptは確保するよう勧めています。2002年の記事では、既定の文字サイズは十分に大きく(10pt以上)、高齢者向けには12pt以上、画像内の文字も12pt以上にするよう勧めています。352人が16書体を読んだ調査では、同じ人でも最も速く読めた書体は最も遅い書体より平均35%速く、20歳の年齢差でおよそ毎分30語遅くなる(50歳は30歳より約11%長くかかる)という結果でした。",
    colorInfo: "行間・行の長さについての数値は、確認した記事の中では示されていません。前景と背景の高いコントラスト、すっきりした書体、十分に大きい既定サイズ、ユーザーが文字サイズを変えられることを、判読性の条件として挙げています。",
    stance:
      "小さい文字は判読性を損ない、どこからが「小さすぎる」かは視力によって人それぞれで、視力は年齢とともに落ちるとしています。そのため、十分に大きい既定サイズを選んだうえで、ユーザーが文字サイズを変えられるようにすべきだという立場です。書体の調査では、すべての人に最適な書体は存在せず、しかも人は自分にとって最も速く読める書体を選べない(好みと読む速さが一致しない)という結果が示されています(記事本文を直接取得して確認済み、2026-09)。",
    exceptions:
      "10pt・12ptという数値は2002年の記事によるもので、当時のデスクトップのWebを前提にしています。現在のスマートフォンの単位(pt/sp)とそのまま比べることはできません。書体の調査は英語の文章を対象にしたものです。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、ユーザーテストと読む速さの調査に基づく設計上の根拠です。",
    useCases: [
      "既定の文字サイズは小さくしすぎず、ユーザーが拡大できるようにする",
      "高齢のユーザーが多いサービスでは、既定サイズを一段大きくする",
      "書体は好みで選ばず、読む速さなど実際のテストで確かめる",
    ],
    searchHint: "No Best Font",
    url: "https://www.nngroup.com/articles/legibility-readability-comprehension/",
    urlSecondary: [
      { label: "Best Font for Online Reading", url: "https://www.nngroup.com/articles/best-font-for-online-reading/" },
      { label: "Let Users Control Font Size(2002)", url: "https://www.nngroup.com/articles/let-users-control-font-size/" },
      { label: "Low-Contrast Text Is Not the Answer(2015)", url: "https://www.nngroup.com/articles/low-contrast/" },
    ],
    confirmedNote: "4記事とも本文を直接取得して確認済み(2026-09)。ページ内検索の語は「Best Font for Online Reading」の見出しです。",
  },
];

/* 四サイト比較図: 最小サイズ・基準サイズと、本文の文字色に求められるコントラスト */
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
          <text x={X(t)} y={44} fontSize="8.5" fill="#9EA4C4" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{t}</text>
        </g>
      ))}
      {row.noMin ? (
        <text x={X(0) + 2} y={13} fontSize="9.5" fill="#7E86AC" fontFamily="'Jost', 'Noto Sans JP', sans-serif">{row.noMin}</text>
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
    { name: "Label Medium", size: 12, lh: 16, w: "Medium", wn: 500, tr: 0.5, use: "ナビゲーションバーのラベル、アプリバーのサブタイトル" },
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
      <ScaleTable k="hig" title="Apple ― テキストスタイル(全11段階)" unit="pt" color="#C2542A" note="iOS/iPadOSの既定の文字サイズ設定(Large)での値(HIGの表)。基準=HIGが示す既定サイズ(Default size)。コントラストは段階ごとの指定ではなく、HIG(Accessibility)の「17pt以下は4.5:1、18pt以上または太字は3:1」を各段階に当てはめた値。字間はシステムフォントがサイズに応じて自動で調整する" />
      <ScaleTable k="material" title="Google ― タイプスケール(全15段階)" unit="sp" color="#2F7D6E" note="基準=Jetpack ComposeのMaterialThemeが文字の既定スタイルに使う段階。太さ・行送り・字間はJetpack Composeのトークン定義(TypeScaleTokens)の値、使用例は標準部品のトークン定義から。コントラスト比は文字の段階には指定がなく、組み合わせる色のロールで決まる(本文のOn Surfaceは7:1、補助のOn Surface Variantは4.5:1)" />
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
          <text x={X(t)} y={h - 5} fontSize="10" fill="#7E86AC" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{t.toFixed(1)}倍</text>
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
              <text x={X(1.0) + 4} y={y + 4} fontSize="10" fill="#7E86AC" fontFamily="'Jost', 'Noto Sans JP', sans-serif">{r.markLabel}</text>
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
            <span>トークン / ファウンデーション / タイポグラフィ</span>
            <span>SPEC No. 043</span>
          </div>

          <h1 style={styles.title}>タイポグラフィ(文字サイズ・行間)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、文字サイズの段階・行送り・拡大への対応をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>文字サイズの段階(実寸の60%で表示)</span>
            <TypeLadder />
            <p style={styles.swatchNote}>AppleもGoogleも、文字サイズを自由に指定するのではなく、名前の付いた段階から選ぶ仕組みです。<strong>基準(本文の既定)はAppleがBodyの17pt、GoogleがBody Largeの16sp</strong>、最小はどちらも11です。全段階と使用例は下部の「タイプスケールの段階ごとの使用例」を参照。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              AppleとGoogleは、どちらも<strong>名前の付いた文字の段階(テキストスタイル/タイプスケール)にサイズと行送りを割り当て、ユーザーの文字サイズ設定に連動させる</strong>という同じ構造を持っています。本文はApple 17pt・Google 16sp、最小はどちらも11と、数値もかなり近い水準です。
            </p>
            <p style={styles.synthesisText}>
              最小サイズと文字色の濃さを並べると、<strong>数値で下限を決めているのはApple・Google(サイズと濃さの両方)とW3C(濃さのみ)</strong>です。Appleは17pt以下の文字に4.5:1、Googleは本文の文字色に7:1・補助の文字に4.5:1を求め、Googleの本文はWCAGのAA(4.5:1)より一段濃い水準です。W3Cは文字サイズの最小値を持たず、NN groupは8pt・10ptといった目安を示すものの、コントラスト比の数値は示していません。
            </p>
            <p style={styles.synthesisText}>
              違いが出るのは行送りです。Appleの本文は17ptに対して22pt(約1.29倍)、GoogleのBody Largeは16spに対して24sp(1.5倍)です。どちらも<strong>大きい文字ほど行送りの比率を小さくする</strong>点は共通しています。
            </p>
            <p style={styles.synthesisText}>
              ここで誤解しやすいのがW3Cの数値です。1.4.12の「行の高さ1.5倍」などは、<strong>デザインの初期値として守るべき値ではなく、ユーザーがその値に変えても表示が壊れないことを確かめる耐性テストの値</strong>です(基準の注記に「コンテンツがこの値を使う必要はない」と明記されています)。そのため、Appleの約1.29倍という初期値もWCAGに反しているわけではありません。WCAGは文字サイズの最小値も定めておらず、代わりに「200%まで拡大できること」を求めています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは数値より原則が中心で、<strong>「十分に大きい既定サイズ+ユーザーが変えられること」</strong>を判読性の条件としています。これはAppleのDynamic Type、Googleのsp単位、WCAGの1.4.4と同じ方向を向いており、4系列に共通する結論は、<strong>文字サイズを固定せず、ユーザーの拡大に追従して崩れない作りにすること</strong>だといえます。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 最小サイズと文字色の濃さ(コントラスト)</h2>
            <MinSizeChart />
            <p style={styles.chartNote}>○=最小サイズ、◆=基準(本文の既定)サイズ。pt(Apple)・sp(Google)・NN groupのpt(当時のデスクトップのWeb)は実際の大きさが一致しない単位のため、同じ目盛りに並べたのは目安です。右側の「本文 Aa」は、白背景でその比率ちょうどになる灰色で表示しており、これより薄い色は基準を下回ります。</p>
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
            <h2 style={styles.diagramTitle}>タイポグラフィ デザインシステム比較</h2>
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
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>行送り・字間</div>
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

          <section style={styles.usageSection}>
            <h2 style={styles.diagramTitle}>タイプスケールの段階ごとの使用例(実寸の60%で表示)</h2>
            <p style={styles.sectionLead}>
              Apple・Googleとも、<strong>基準は「本文」の段階</strong>(Apple=Body 17pt、Google=Body Large 16sp)で、他の段階はそこから上下に広がります。Googleは段階の名前が役割(Display/Headline/Title/Body/Label)を表し、ボタンなどの部品の文字はLabel、見出しはHeadline・Titleを使います。
            </p>
            <TypeScaleUsage />
          </section>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>参考 ― 文字サイズに対する行送りの比率</h2>
            <LeadingChart />
            <p style={styles.chartNote}>帯は各系列の段階全体の範囲、丸は本文の値です。W3Cの破線は初期値の基準ではなく、ユーザーがこの値に変更しても崩れないことを求める値です。</p>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、数値はGoogle公式のソース・ドキュメントで確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Typographyページの該当見出しへのアンカー付きリンクです。WCAGは1.4.12 Understandingページの達成基準の箇所を基本リンクとし、1.4.4・1.4.8も併記しています。GoogleはM3のType scale tokensページに加え、数値を確認したGitHub上の公式ソースを併記しています。NN groupはLegibility, Readability, and Comprehensionの記事を基本リンクとし、書体の調査記事と2002年の文字サイズの記事を併記しています。
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
  sectionLead: { fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: "0 0 14px" },
  minChart: { display: "flex", flexDirection: "column" },
  minRow: { display: "grid", gap: "6px 16px", alignItems: "center", padding: "10px 0", borderTop: "1px solid #E1E3F0" },
  minHeadRow: { borderTop: "none", paddingTop: 0 },
  minHead: { fontSize: 10.5, color: "#7E86AC" },
  minName: { fontSize: 13, fontWeight: 700 },
  minLegend: { display: "flex", flexWrap: "wrap", gap: "2px 10px", fontSize: 10.5, color: "#565D8A", marginTop: 2 },
  contrastRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  contrastSample: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 3, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "6px 9px", minWidth: 112 },
  contrastRatio: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 600, color: "#FFFFFF", background: "#3C5A73", borderRadius: 3, padding: "1px 6px" },
  contrastNoteSmall: { fontSize: 10, color: "#565D8A" },
  contrastFoot: { fontSize: 10.5, color: "#7E86AC", marginTop: 4 },
  usageSection: { marginBottom: 22 },
  scaleCol: { flex: "1 1 320px", minWidth: 0, textAlign: "left" },
  scaleNote: { fontSize: 10.5, color: "#7E86AC", lineHeight: 1.5, marginBottom: 6 },
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
