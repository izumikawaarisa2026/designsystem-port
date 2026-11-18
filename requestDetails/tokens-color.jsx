import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, GoodBad } from "./page-parts";

/**
 * トークン/ファウンデーションレイヤー「カラー(配色・コントラスト基準)」ページ。
 *
 * このページの発見: 適合基準として具体的な数値(4.5:1/3:1)でコントラストを規定するのは
 * W3C(WCAG)で、Appleは推奨値(最低4.5:1、独自の色は7:1)をDark Modeページで示している。
 * Apple・Googleはどちらも「セマンティックカラー」「カラーロール」
 * という抽象化された仕組みを通じてアクセシビリティに配慮する設計になっている
 * (デザイナーが毎回数値を手計算するのではなく、システム側が意味に応じて自動的に
 * 適切な色を割り当てる思想)。Nielsen Norman Groupは適合基準ではなく、配色バランス
 * (60-30-10ルール)と一貫性という、コントラスト単体とは別の実務的な観点を提供する。
 *
 * W3C(WCAG 2.2 Understanding: 1.4.3/1.4.11/1.4.1)・Nielsen Norman Group
 * (Using Color to Enhance Your Design)は公式ページ・記事本文を直接取得して確認済み
 * (2026-09)。Apple(HIG Color・Dark Mode)は、HIGのページデータ(JSON)を直接取得して
 * 本文を確認済み(2026-09、当初は検索結果による間接確認だったものを更新)。
 * Google(Material Design 3 Color roles)はm3.material.io本文がSPAで取得できないため、
 * Google公式のMaterial Components for AndroidのColor theming文書(ロール一覧・トーン)と、
 * 配色生成ライブラリmaterial-color-utilities(GitHub)のソースにある各ロールのコントラスト目標値、
 * Jetpack ComposeのMaterial 3トークン定義(どの部品がどのロールを使うか)で確認(2026-09)。
 *
 * 2026-09追加: 「色の優先度(階層)の定義」「別定義されている色の種類(アクセント・リンク等)」
 * 「ダークモードのメモ」の3セクション。優先度の決め方自体が4系列で違う(Apple=内容の重要度、
 * Google=強調の度合い、W3C=要素の種類、NN group=面積の比率)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Color",
    color: "#C2542A",
    position: "色を「意味」で指定するセマンティックカラー(systemBlue・labelなど)。ライト/ダークやコントラストの設定に合わせて自動で変わる",
    size: "4.5:1以上。独自の色は、特に小さい文字で7:1を目指す(Dark Mode)。文字サイズ別の表は17pt以下4.5:1・18pt以上3:1・太字はサイズを問わず3:1(Accessibility)。WCAGでは小さい太字は3:1の対象外で、条件が違う。",
    colorInfo: "意味ごとに名前の付いた色(systemBlue・label・systemBackgroundなど)。ライト/ダーク/Increase Contrast/Reduce Transparencyで値が自動で変わる。",
    stance:
      <><Hl>固定の値ではなくセマンティックカラーを使う</Hl>。意味を定義し直さずに使えば、どの外観でも見た目とコントラストがそろう。独自の色は、ライト・ダークと、それぞれのIncrease Contrast用の版を用意する。</>,
    exceptions:
      "外観が1つだけのアプリでも、Liquid Glassのためにライト・ダーク両方の色を用意する。",
    accessibility: "知覚可能 ― 4.5:1はWCAG 1.4.3(AA)、7:1は1.4.6(AAA)と同じ値。",
    useCases: [
      "セマンティックカラーを使い、意味を定義し直さない",
      "ライト/ダーク/Increase Contrastのすべてでコントラストを確かめる",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/color#Best-practices",
    refs: [
      { label: "Color", url: "https://developer.apple.com/design/human-interface-guidelines/color#Best-practices" },
      { label: "Dark Mode colors(4.5:1・7:1)", url: "https://developer.apple.com/design/human-interface-guidelines/dark-mode#Dark-Mode-colors" },
      { label: "Accessibility ― Vision(文字サイズ別の比率)", url: "https://developer.apple.com/design/human-interface-guidelines/accessibility#Vision" },
      { label: "System colors", url: "https://developer.apple.com/design/human-interface-guidelines/color#System-colors" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、Color・Dark Mode・Accessibilityページの本文・見出しアンカーを確認済み(2026-09)。",
    illustration: () => (
      <svg width="120" height="40" viewBox="0 0 120 40">
        <rect x="1" y="1" width="56" height="38" rx="6" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.4" />
        <circle cx="29" cy="14" r="7" fill="#C2542A" />
        <text x="29" y="32" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Light</text>
        <rect x="63" y="1" width="56" height="38" rx="6" fill="#171B36" stroke="#C2542A" strokeWidth="1.4" />
        <circle cx="91" cy="14" r="7" fill="#E8946F" />
        <text x="91" y="32" fontSize="7.5" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Dark</text>
      </svg>
    ),
    illustrationNote: "同じセマンティックカラーがライト/ダークで自動的に値を変える(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Color roles / Dynamic color",
    color: "#2F7D6E",
    position: <>色の意味を「カラーロール」(primary・surfaceなど)で決める。<Hl>壁紙などから配色を作るダイナミックカラー</Hl>がある</>,
    size: "ロールごとに目標がある(配色ライブラリの2021年版の仕様・標準の設定): 本文の文字7:1、補助の文字・primaryなど4.5:1、枠線3:1。コントラストを上げる設定では上がる(例: on-surfaceは11:1・21:1)。",
    colorInfo: "元の1色から5つのキーカラーを作り、それぞれ0(黒)〜100(白)の13段階のトーンにする。各ロールは決まったトーンを使う。",
    stance:
      "カラーロールが、UIのどこにどの色を使うかを結びつける。errorはダイナミックカラーでも変わらない固定の色(ライト・ダークでは変わる)。",
    exceptions:
      "独自のブランド色は、Primaryと同じ明るさ(トーン40)を保たないとコントラストが崩れることがある。装飾の区切り線(outline-variant)は目標なし。2025年版の仕様では一部の目標が違う(例: スマートフォンのライトテーマでon-surfaceは9:1)。",
    accessibility:
      "知覚可能 ― 7:1・4.5:1・3:1は、WCAG 1.4.6(AAA)・1.4.3(AA)・1.4.11と同じ値。Android 14以降は端末のコントラスト設定に合わせて自動で調整される。",
    useCases: [
      "UIの意味ごとにカラーロールを割り当てる",
      "壁紙などから配色を作るダイナミックカラーを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/color/roles",
    refs: [
      { label: "Color roles", url: "https://m3.material.io/styles/color/roles" },
      { label: "Dynamic color ― Choosing a source", url: "https://m3.material.io/styles/color/dynamic/choosing-a-source" },
      { label: "Color system overview", url: "https://m3.material.io/styles/color/system/overview" },
      { label: "MDC Android: Color theming(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md" },
      { label: "material-color-utilities: 各ロールの目標値(GitHub)", url: "https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/color_spec_2021.ts" },
    ],
    confirmedNote: "ロールの役割とerrorの扱いはM3 Color rolesの本文(2026-11)、ロールの一覧とトーンはMaterial Components for AndroidのColor theming文書、コントラストの目標値はmaterial-color-utilitiesのソース(2021年版の仕様)で直接確認(2026-09)。",
    illustration: () => (
      <svg width="120" height="40" viewBox="0 0 120 40">
        {[
          { c: "#2F7D6E", l: "P" },
          { c: "#6FAE9F", l: "S" },
          { c: "#A9C9BF", l: "T" },
          { c: "#C0503F", l: "E" },
          { c: "#E3EDE9", l: "Sf" },
        ].map((s, i) => (
          <g key={i}>
            <rect x={1 + i * 24} y="1" width="20" height="30" rx="4" fill={s.c} />
            <text x={11 + i * 24} y="38" fontSize="7" fill="#454C78" textAnchor="middle" fontFamily="Jost, Noto Sans JP">{s.l}</text>
          </g>
        ))}
      </svg>
    ),
    illustrationNote: "primary/secondary/tertiary/error/surfaceのカラーロール(概念図・系列識別色を基調に配色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.3 Contrast (Minimum) / 1.4.11 Non-text Contrast / 1.4.1 Use of Color",
    color: "#A3821F",
    position: "文字のコントラスト(1.4.3)・コンポーネントと図のコントラスト(1.4.11)・色だけに頼らない(1.4.1)の3つの達成基準",
    size: "1.4.3(AA): 本文4.5:1以上、大きな文字(18pt以上、または14pt以上の太字。Webで約24px・約18.66px)3:1以上。1.4.11(AA): コンポーネントと理解に必要な図は3:1以上。四捨五入しない(4.499:1は不合格)。",
    colorInfo: <NoData>配色の仕組みは定めない</NoData>,
    glossary: [
      { term: "1.4.3 Contrast (Minimum)・レベルAA", desc: "本文の文字は4.5:1以上、大きな文字は3:1以上のコントラスト比にする(除外は「例外・許容ケース」)。" },
      { term: "1.4.11 Non-text Contrast・レベルAA", desc: "UIコンポーネントを見分けるための見た目(枠線・アイコンなど。ユーザーエージェントが決めて変えていない部分を除く)と、理解に必要な図の一部に3:1以上を求める。" },
      { term: "1.4.1 Use of Color・レベルA", desc: "色を情報を伝える唯一の手段にしない。色覚に特性のある人や白黒表示の人にも伝わるよう、アイコンや文字などほかの手がかりも添える。" },
    ],
    stance:
      <>どんな色でも、要素の種類ごとの比率を満たすかで判断する。1.4.1(A)で、<Hl>色を情報を伝える唯一の手段にしない</Hl>(必須項目を赤だけで示さず、文字やアイコンも添える)。</>,
    exceptions:
      "無効なコンポーネント・装飾・ロゴの文字は除外(1.4.3)。1.4.11も、無効なコンポーネントとブラウザ標準のままの見た目を除外。",
    accessibility: "知覚可能 ― 3つとも。視覚・色覚に特性のある人が、文字・コンポーネント・色分けされた情報を見分けられるようにする。",
    useCases: [
      "本文4.5:1以上、大きな文字・コンポーネント・重要な図3:1以上",
      "必須項目やエラーを色だけで示さない",
    ],
    searchHint: "not be rounded",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    refs: [
      { kind: "sc", level: "AA", label: "1.4.3 コントラスト(最低限)", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "A", label: "1.4.1 色の用途", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
      { label: "G183(達成方法: 色だけで区別するリンクは周りの文字と3:1)", url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G183" },
      { label: "F73(失敗例: 色の違いだけで見分けるリンク)", url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F73" },
      { label: "F81(失敗例: 必須項目やエラーを色の違いだけで示す)", url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F81" },
    ],
    illustration: () => (
      <svg width="120" height="40" viewBox="0 0 120 40">
        <rect x="1" y="1" width="56" height="38" rx="6" fill="#171B36" />
        <text x="29" y="24" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Aa</text>
        <text x="29" y="34" fontSize="6.5" fill="#9FD0C0" textAnchor="middle" fontFamily="Jost, Noto Sans JP">16.8:1 合格</text>
        <rect x="63" y="1" width="56" height="38" rx="6" fill="#B7BCDA" />
        <text x="91" y="24" fontSize="10" fill="#E7E9F5" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Aa</text>
        <text x="91" y="34" fontSize="6.5" fill="#8A3F32" textAnchor="middle" fontFamily="Jost, Noto Sans JP">1.5:1 不合格</text>
      </svg>
    ),
    illustrationNote: "4.5:1基準の合格/不合格の対比イメージ(概念図・系列識別色は使わず値を強調)",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Using Color to Enhance Your Design",
    color: "#7A4F7E",
    position: "配色のバランス(60-30-10ルール)・一貫性・色覚の特性への配慮という実務の指針",
    size: <NoData>数値基準なし</NoData>,
    colorInfo: "面積を60%基調色・30%第二色・10%アクセントカラーにし、パレットは3色程度に絞る。",
    stance:
      <><Hl>60-30-10の配分</Hl>でバランスを保つ。同じ意味(例: CTAボタン)にはいつも同じ色を使う(ばらつくと意味を誤解される)。<Hl>コントラストと色覚の特性をツールとテストで確かめる</Hl>(WCAGの比率には触れない)。</>,
    exceptions:
      "色の意味は文化で違う(お金の色は中国では赤、米国では緑など)。グレーのボタンは「無効」に見えやすい。",
    accessibility: "根拠となる原則 ― 適合区分ではなく、テスト結果にもとづく実務の指針。",
    useCases: [
      "配色を60-30-10のバランスにする",
      "同じ意味にはいつも同じ色を使う",
    ],
    searchHint: "",
    url: "https://www.nngroup.com/articles/color-enhance-design/",
    refs: [
      { label: "Using Color to Enhance Your Design", url: "https://www.nngroup.com/articles/color-enhance-design/" },
      { label: "Guidelines for Visualizing Links", url: "https://www.nngroup.com/articles/guidelines-for-visualizing-links/" },
      { label: "Low-Contrast Text Is Not the Answer", url: "https://www.nngroup.com/articles/low-contrast/" },
    ],
    confirmedNote: "記事本文を直接取得して確認済み(2026-09)。",
    illustration: () => (
      <svg width="120" height="40" viewBox="0 0 120 40">
        <rect x="1" y="6" width="72" height="28" fill="#EEE6EF" />
        <rect x="73" y="6" width="36" height="28" fill="#B79ABB" />
        <rect x="109" y="6" width="12" height="28" fill="#7A4F7E" />
        <text x="37" y="22" fontSize="7" fill="#454C78" textAnchor="middle" fontFamily="Jost, Noto Sans JP">60</text>
        <text x="91" y="22" fontSize="7" fill="#454C78" textAnchor="middle" fontFamily="Jost, Noto Sans JP">30</text>
        <text x="115" y="22" fontSize="6.5" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">10</text>
      </svg>
    ),
    illustrationNote: "60-30-10ルールの配分イメージ(概念図・系列識別色)",
  },
];

/*
 * 色の優先度(階層)の定義。4系列で「何を基準に段階を分けるか」から違う。
 * Apple: HIG Color(iOS, iPadOSの表)・Accessibility(Vision)・Dark Mode。
 * Google: material-color-utilities color_spec_2021.ts の ContrastCurve(標準コントラストの値)、
 *         使用例は Jetpack Compose Material 3 のトークン定義(FilledButton=Primary など)。
 * W3C: 1.4.3 / 1.4.6 / 1.4.11 / 1.4.1(G183)。NN group: Using Color to Enhance Your Design ほか。
 */
const PRIORITY = [
  {
    key: "hig",
    name: "Apple",
    color: "#C2542A",
    basis: "内容の重要度で、文字と背景の色を段階分け",
    tiers: [
      { name: "Primary background", desc: "画面全体の背景(System Background)", ratio: "--", sample: { nest: 0 } },
      { name: "Secondary background", desc: "その中のまとまり(グループ・カードなど)の背景", ratio: "--", sample: { nest: 1 } },
      { name: "Tertiary background", desc: "さらに内側のまとまりの背景", ratio: "--", sample: { nest: 2 } },
      { name: "Label", desc: "主要な内容の文字", ratio: "--", sample: { text: true, opacity: 1 } },
      { name: "Secondary label", desc: "補助的な内容の文字", ratio: "--", sample: { text: true, opacity: 0.72 } },
      { name: "Tertiary label", desc: "さらに下位の内容の文字(重要でない情報に使う)", ratio: "--", sample: { text: true, opacity: 0.5 } },
      { name: "Quaternary label", desc: "最も重要度の低い文字(macOSでは透かし文字など。重要でない情報に使う)", ratio: "--", sample: { text: true, opacity: 0.32 } },
    ],
    extra: "背景は3段階(図の濃い部分がその段階の範囲)、文字は4段階。一覧形式の画面用にGrouped版の背景もある。",
    a11y: "段階ごとの比率は定めていない(--)。文字は文字サイズで決める: 17pt以下4.5:1・18pt以上3:1・太字3:1。独自の色は7:1を目指す。",
  },
  {
    key: "material",
    name: "Google",
    color: "#2F7D6E",
    basis: "強調の度合いで、3つのアクセント色と中立色を段階分け",
    tiers: [
      { name: "Primary", desc: "最も目立たせる要素(塗りつぶしボタン、選択中のラジオ・チェックボックス、スライダー)", ratio: "4.5:1", sample: { fill: "#2F7D6E" } },
      { name: "Secondary", desc: "控えめな強調(トーナルボタン、選択中のチップ、タブバーの選択表示)", ratio: "4.5:1", sample: { fill: "#6E8E86" } },
      { name: "Tertiary", desc: "対比のアクセント(時刻ピッカーの午前/午後の選択、Vibrantメニュー)", ratio: "4.5:1", sample: { fill: "#4E6E8C" } },
      { name: "On Surface", desc: "本文の文字", ratio: "7:1", sample: { text: true, opacity: 1 } },
      { name: "On Surface Variant", desc: "補助の文字・アイコン", ratio: "4.5:1", sample: { text: true, opacity: 0.66 } },
      { name: "Outline", desc: "入力欄などの枠線", ratio: "3:1", sample: { line: "#8A8F99" } },
      { name: "Outline Variant", desc: "カードの枠など装飾的な区切り", ratio: "--", sample: { line: "#D3D6DE" } },
    ],
    extra: "各アクセント色には強調を弱めたContainer版があり、その上の文字は4.5:1。",
    a11y: "段階ごとに比率を定める(配色ライブラリの2021年版の仕様・標準の設定)。コントラストを上げる設定では引き上げられる。",
  },
  {
    key: "wcag",
    name: "W3C",
    color: "#A3821F",
    basis: "優先度ではなく、要素の種類で基準を分ける",
    tiers: [
      { name: "本文テキスト", desc: "1.4.3(AA)/ AAAの1.4.6では7:1", ratio: "4.5:1", sample: { text: true, hex: "#767676" } },
      { name: "大きな文字", desc: "18pt(Webで約24px)以上、または14pt(約18.66px)以上の太字 / AAAでは4.5:1", ratio: "3:1", sample: { text: true, hex: "#949494", big: true } },
      { name: "UIコンポーネント・グラフィック", desc: "コンポーネントを見分けるための枠やアイコン(1.4.11)", ratio: "3:1", sample: { line: "#949494" } },
      { name: "色だけで区別するリンク", desc: "周囲の文字との差(1.4.1の達成方法G183)", ratio: "3:1", sample: { link: true } },
      { name: "非活性・装飾・ロゴ", desc: "コントラストの基準の適用除外", ratio: "--", sample: { text: true, hex: "#C9CCD9" } },
    ],
    extra: "色の優先度は定めない。要素の種類ごとの比率で判断する。",
    a11y: "要素の種類ごとに最低値を定める(リンクは周囲の文字に対する比率)。非活性・装飾・ロゴは対象外(--)。四捨五入しない。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    color: "#7A4F7E",
    basis: "画面に占める面積の比率で、色の役割を段階分け",
    tiers: [
      { name: "基調色", desc: "画面の約60%。全体の印象を決める", ratio: "60%", sample: { bar: 60 } },
      { name: "第二色", desc: "約30%。基調色を支える", ratio: "30%", sample: { bar: 30 } },
      { name: "アクセントカラー", desc: "約10%。目を引きたい要素に使う", ratio: "10%", sample: { bar: 10 } },
    ],
    extra: "右端の値はコントラスト比ではなく面積の割合。",
    a11y: "比率は定めていない(--)。ツールとテストで、コントラストと色覚の特性を確かめる。薄い文字は「無効」と誤解されるので避ける。",
  },
];

function TierSample({ sample, color }) {
  const box = { width: 34, height: 22, borderRadius: 3, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF", border: "1px solid #E1E3F0" };
  if (sample.nest !== undefined) {
    // 背景の入れ子: 外枠=画面全体、中=まとまり、内=さらに内側。該当する段階を塗る
    const on = (lv) => (sample.nest === lv ? color : "#FFFFFF");
    return (
      <span style={{ ...box, padding: 2, background: on(0), border: `1px solid ${sample.nest === 0 ? color : "#D5D9EC"}` }}>
        <span style={{ width: 24, height: 14, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", background: sample.nest === 1 ? color : "#F2F3F8", border: "1px solid #D5D9EC" }}>
          <span style={{ width: 12, height: 6, borderRadius: 1, background: sample.nest === 2 ? color : on(-1), border: "1px solid #D5D9EC" }} />
        </span>
      </span>
    );
  }
  if (sample.fill) return <span style={{ ...box, background: sample.fill, border: "none" }} />;
  if (sample.line) return <span style={box}><span style={{ width: 22, height: 12, border: `1.5px solid ${sample.line}`, borderRadius: 2 }} /></span>;
  if (sample.bar) return <span style={{ ...box, justifyContent: "flex-start", padding: 2 }}><span style={{ width: `${sample.bar}%`, height: "100%", background: color, borderRadius: 2 }} /></span>;
  if (sample.link) return <span style={{ ...box, fontSize: 10, gap: 1 }}><span style={{ color: "#171B36" }}>a</span><span style={{ color: "#2F6FED", fontWeight: 600 }}>b</span></span>;
  return (
    <span style={{ ...box, fontSize: sample.big ? 14 : 11.5, fontWeight: 600, color: sample.hex || "#171B36", opacity: sample.hex ? 1 : sample.opacity }}>Aa</span>
  );
}

function PriorityDiagram() {
  return (
    <div style={styles.priorityGrid}>
      {PRIORITY.map((p) => (
        <div key={p.key} style={styles.priorityCol}>
          <div style={{ ...styles.priorityName, color: p.color }}>{p.name}</div>
          <div style={styles.priorityBasis}>{p.basis}</div>
          <div style={styles.tierList}>
            {p.tiers.map((t, i) => (
              <div key={t.name} style={styles.tierRow}>
                <span style={styles.tierRank}>{i + 1}</span>
                <TierSample sample={t.sample} color={p.color} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={styles.tierName}>{t.name}</div>
                  <div style={styles.tierDesc}>{t.desc}</div>
                </div>
                <span style={{ ...styles.ratioChip, ...(/[:]/.test(t.ratio) ? {} : styles.ratioChipMuted) }}>{t.ratio}</span>
              </div>
            ))}
          </div>
          <p style={styles.tierExtra}>{p.extra}</p>
          <div style={styles.tierA11y}>
            <span style={styles.tierA11yLabel}>アクセシビリティの指定</span>
            {p.a11y}
          </div>
        </div>
      ))}
    </div>
  );
}

/*
 * 別定義されている色の種類(アクセント・リンクなど)。
 * Apple: HIG Color(iOS, iPadOSの前景色の表・macOSの表・App accent colors・Liquid Glass color)。
 * Google: MDC Android Color.md のロール一覧(リンク用ロールは存在しない)、Composeトークン(非活性=On Surface 38%)。
 * W3C: 1.4.1(G183・F73・F81)・1.4.3・1.4.11。NN group: Guidelines for Visualizing Links(2026年3月の編集注を含む)ほか。
 */

const COLOR_KINDS = [
  {
    kind: "アクセント(ブランド)色",
    hig: { mark: "◯", text: "App accent color(アプリ独自の色)。ボタン・選択のハイライトなどに使う。ユーザーがシステム設定で選んだ色が優先される。", sw: [{ n: "Blue(例)", l: "#0088FF", d: "#0091FF" }, { n: "Blue(コントラストを上げる設定)", l: "#1E6EF4", d: "#5CB8FF" }], swNote: "システムカラーのBlue。アクセント色はアプリ独自の色にできる" },
    material: { mark: "◯", text: "Primary・Secondary・Tertiaryの3つ。ダイナミックカラーでは壁紙などから作られる。", sw: [{ n: "Primary", l: "#6750A4", d: "#D0BCFF" }, { n: "Secondary", l: "#625B71", d: "#CCC2DC" }, { n: "Tertiary", l: "#7D5260", d: "#EFB8C8" }], swNote: "基準の配色(壁紙などから作る場合は値が変わる)" },
    wcag: { mark: "―", text: "専用の定めはない。1.4.1・1.4.3・1.4.11がかかる。" },
    nn: { mark: "◯", text: "60-30-10の「10%」。同じ意味には同じ色を使う。" },
  },
  {
    kind: "リンク色",
    rel: <><PageLink to="/components/actions/link">リンク</PageLink></>,
    hig: { mark: "◯", text: "専用のシステムカラーLinkがある(ライト/ダークで値が変わる)。", swNone: "色の値はHIGに記載なし" },
    material: { mark: "✕", text: "専用のカラーロールはない。" },
    wcag: { mark: "◯", text: "色だけで区別するなら、周りの文字と3:1以上(G183)。色でしか見分けられないリンクは失敗例(F73)。" },
    nn: { mark: "◯", text: "色+下線が最も分かりやすい。未訪問は鮮やか、訪問済みはくすんだ同系色。青はリンク以外に使わない(下線なしでG183の方式でもよい)。", sw: [{ n: "未訪問(例)", l: "#1A5FD0", d: "#7FB0FF" }, { n: "訪問済み(例)", l: "#6E5A8E", d: "#B6A6CF" }], swNote: "色はAIの作例。NN groupは具体的な色の値を定めていない(青が最も強い手がかり)" },
  },
  {
    kind: "エラー色",
    rel: <><PageLink to="/components/text-inputs/validation">エラー表示</PageLink>・<PageLink to="/components/communication/alert">ステータスメッセージ</PageLink></>,
    hig: { mark: "△", text: "専用の色はなく、システムカラーのRedを使う。", sw: [{ n: "Red", l: "#FF383C", d: "#FF4245" }, { n: "Red(コントラストを上げる設定)", l: "#E9152D", d: "#FF6165" }], swNote: "エラー専用ではなく、システムカラーのRed" },
    material: { mark: "◯", text: "Errorのロール。ダイナミックカラーでも変わらない固定の色で、4.5:1。", sw: [{ n: "Error", l: "#B3261E", d: "#F2B8B5" }] },
    wcag: { mark: "△", text: "専用の色はない。エラーを色だけで示すのは失敗例(F81)。" },
    nn: { mark: "△", text: "言葉でも区別できるなら赤で示してよい。リンクの色と重ねない。" },
  },
  {
    kind: "枠線・区切り線",
    rel: <><PageLink to="/components/text-inputs/text-field">テキストフィールド</PageLink></>,
    hig: { mark: "◯", text: "Separator(少し透ける)とOpaque separator(透けない)の2つ。" },
    material: { mark: "◯", text: "Outline(入力欄の枠、3:1)とOutline Variant(装飾の区切り、目標なし)の2つ。", sw: [{ n: "Outline", l: "#79747E", d: "#938F99" }, { n: "Outline Variant", l: "#CAC4D0", d: "#49454F" }], swNote: "基準の配色" },
    wcag: { mark: "△", text: "コンポーネントを見分けるのに必要な枠線は3:1以上(1.4.11)。装飾の線は対象外。" },
    nn: { mark: "―", text: "記載なし。" },
  },
  {
    kind: "非活性・プレースホルダー",
    rel: <><PageLink to="/tokens/interaction-states">インタラクション状態</PageLink></>,
    hig: { mark: "◯", text: "Placeholder text。macOSには使えないコントロールの文字色もある。" },
    material: { mark: "△", text: "専用のロールはなく、On Surfaceを38%の不透明度にして表す。", sw: [{ n: "On Surface 38%", l: "#1D1B20", d: "#E6E0E9", op: 0.38 }], swNote: "基準の配色のOn Surfaceを38%で重ねた見え方" },
    wcag: { mark: "△", text: "非活性のコンポーネントは1.4.3・1.4.11の対象外。" },
    nn: { mark: "△", text: "薄いグレーは「無効」に見えやすい。使える要素を薄くしない。" },
  },
];

const KIND_COLS = [
  { key: "hig", name: "Apple" },
  { key: "material", name: "Google" },
  { key: "wcag", name: "W3C" },
  { key: "nn", name: "NN group" },
];

/* 色見本(ライト/ダーク)。値はApple=HIG Colorの色見本、Google=Jetpack Composeの基準の配色トークン */
function ColorSwatches({ cell }) {
  if (cell.swNone) return <NoData>{cell.swNone}</NoData>;
  if (!cell.sw) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 2 }}>
      {cell.sw.map((c) => (
        <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ display: "inline-flex", borderRadius: 4, overflow: "hidden", border: "1px solid #E1E3F0", flexShrink: 0 }}>
            <span style={{ width: 26, height: 20, background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: 16, height: 12, borderRadius: 2, background: c.l, opacity: c.op || 1 }} /></span>
            <span style={{ width: 26, height: 20, background: "#141218", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: 16, height: 12, borderRadius: 2, background: c.d, opacity: c.op || 1 }} /></span>
          </span>
          <span style={{ fontSize: 10, lineHeight: 1.35, color: "#454C78" }}>{c.n}<br /><span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#666D93" }}>{c.l} / {c.d}</span></span>
        </div>
      ))}
      {cell.swNote && <span style={{ fontSize: 9.5, color: "#666D93", lineHeight: 1.4 }}>{cell.swNote}</span>}
    </div>
  );
}

function KindMark({ mark }) {
  const c = mark === "◯" ? "#2F7D6E" : mark === "△" ? "#A3821F" : mark === "✕" ? "#C0503F" : "#666D93";
  return <span style={{ ...styles.kindMark, color: c }}>{mark}</span>;
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

function ColorContrastSwatch() {
  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
      <div style={{ width: 150 }}>
        <div style={{ background: "#171B36", color: "#FFFFFF", padding: "10px 12px", borderRadius: 6, fontSize: 13, textAlign: "center", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>Aa 本文サンプル</div>
        <div style={{ fontSize: 10.5, color: "#2F7D6E", textAlign: "center", marginTop: 4 }}>約16.8:1 ― AA/AAA 合格</div>
      </div>
      <div style={{ width: 150 }}>
        <div style={{ background: "#B7BCDA", color: "#E7E9F5", padding: "10px 12px", borderRadius: 6, fontSize: 13, textAlign: "center", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>Aa 本文サンプル</div>
        <div style={{ fontSize: 10.5, color: "#C0503F", textAlign: "center", marginTop: 4 }}>約1.5:1 ― 不合格(4.5:1未満)</div>
      </div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の色の決め方と、文字やコンポーネントを読みやすくするための色の差(コントラスト)の基準";
const ABOUT = [
  { k: "目的・役割", v: "役割に合った色を一貫して使い、文字やコンポーネントが誰にでも見分けられるようにする" },
  { k: "関わる場面", v: "文字と背景の色、ボタンや入力欄の枠、リンクの色、エラーの赤" },
  { k: "関連するページ", v: <><PageLink to="/tokens/dark-mode">ダークモード</PageLink>、<PageLink to="/tokens/typography">タイポグラフィ</PageLink></> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "文字と背景の差を確かめる", d: "本文は4.5:1以上、大きな文字とコンポーネントは3:1以上", who: "W3C 1.4.3・1.4.11" },
  { n: 2, t: "色は値ではなく役割で指定する", d: "色そのものではなく「意味」で決める", who: "Appleのセマンティックカラー、Googleのカラーロール" },
  { n: 3, t: "独自の色は濃いめに", d: "最低4.5:1、できれば7:1を目指す", who: "Apple" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
      title="良い例・悪い例 ― 文字のコントラスト"
      pairs
      items={[
        { kind: "good", label: "良い例(本文)", fig: <><span style={{ fontSize: 14, color: "#171B36" }}>本文の文字のサンプル</span><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>#171B36 / 白 = 16.85:1</span></>, text: "白い背景に濃い文字。本文に必要な4.5:1を大きく上回る。" },
        { kind: "bad", label: "悪い例(本文)", fig: <><span style={{ fontSize: 14, color: "#9EA4C4" }}>本文の文字のサンプル</span><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>#9EA4C4 / 白 = 2.45:1</span></>, text: "薄いグレーの文字は2.45:1で、本文に必要な4.5:1に届かない(枠の中は見本)。" },
        { kind: "good", label: "良い例(大きい文字)", fig: <><span style={{ fontSize: 24, color: "#8E8E8E" }}>大きい見出し</span><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>#8E8E8E / 白 = 3.28:1</span></>, text: "18pt以上(Webではおよそ24px)の大きい文字は3:1以上でよい。3.28:1で足りる。" },
        { kind: "bad", label: "悪い例(小さい文字)", fig: <><span style={{ fontSize: 12, color: "#8E8E8E" }}>小さい文字のサンプル</span><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>#8E8E8E / 白 = 3.28:1</span></>, text: "同じ3.28:1でも、小さい文字では4.5:1に届かない(枠の中は見本)。" },
      ]}
      basis="W3C 1.4.3(本文は4.5:1以上、大きい文字は3:1以上・AA)、Appleの表(17pt以下は4.5:1、18pt以上は3:1)。比は白い背景に対する値(このサイトで計算)。"
    />
  );
}

export default function TokensColorPage() {
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
        <SidebarNav currentPath="/tokens/color" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>Foundation / カラー</span>
            <span>SPEC No. 042</span>
          </div>

          <h1 style={styles.title}>カラー(配色・コントラスト基準)</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コントラスト比とは(共通の考え方)"
            image={<><ColorContrastSwatch /></>}
            imageNote={<>文字色と背景色の明るさの差を表す数値。WCAGは本文4.5:1以上を要求しており、この数値がこのページの各系列比較の共通のものさしになる。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <div style={{ marginBottom: 22 }}>
            <h2 style={styles.diagramTitle}>四系列比較図 ― 色の優先度(階層)の定義とアクセシビリティの指定</h2>
            <PriorityDiagram />
            <p style={styles.chartNote}>番号は各系列の中での優先度(上ほど強い・重要)。右端の値は、その段階に求められるコントラスト比(背景に対する最低値)。--=比率の指定なし。NN groupのみ比率ではなく面積の割合。色見本は概念図で、実際の色の値ではない。</p>
          </div>
          <GoodBadFigure />


          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              数値の基準を持つのはW3Cで、<strong>本文4.5:1、大きな文字とコンポーネント3:1</strong>(1.4.3・1.4.11)。Apple・Googleは、<strong>色を「意味」で指定し、システムが設定に合わせて値を変える</strong>(Appleのセマンティックカラー、Googleのカラーロール)。Appleは独自の色に<strong>7:1</strong>を目指すよう勧め、Googleはロールごとに<strong>7:1・4.5:1・3:1</strong>の目標を配色の生成時に満たす。
            </p>
            <p style={styles.synthesisText}>
              色の段階の分け方は4系列で違う(上の比較図)。<strong>「色だけで伝えない」はW3C(1.4.1)とNN groupが一致</strong>する。セマンティックカラーやカラーロールを使っても1.4.1は満たされないので、文字やアイコンの手がかりは別に用意する(AI解釈)。
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
                <InfoBox label="コントラスト比" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="配色の仕組み">{s.colorInfo}</InfoBox>
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>コントラスト比</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>配色の仕組み</div>
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

          <section style={styles.kindSection}>
            <h2 style={styles.diagramTitle}>役割ごとの色の比較 ― アクセント・リンク・エラー・枠線・非活性</h2>
            <p style={styles.sectionLead}>
              行が色の役割、列が系列。その役割に<strong>専用の色を決めているか</strong>を記号で示し、決めている系列は色見本(左=ライト、右=ダーク)を添えた。<strong>リンクの色を決めているのはApple</strong>だけ、<strong>エラーの色を固定の役割として持つのはGoogle</strong>だけ。W3Cは色を決めず、どの役割にも同じ比率の基準がかかる。
            </p>
            <p style={styles.chartNote}>◯=専用の色・基準がある △=専用ではないが関連する定めがある ✕=専用の色がない ―=記載なし</p>

            <div className="dsp-desktop-only">
              <div style={styles.matrixScroll}>
                <div style={styles.matrixGrid}>
                  <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
                  {KIND_COLS.map((c) => (
                    <div key={c.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                      <div style={styles.sourceName}>{c.name}</div>
                    </div>
                  ))}
                  {COLOR_KINDS.map((row, ri) => {
                    const last = ri === COLOR_KINDS.length - 1 ? styles.lastRowCell : {};
                    return (
                      <React.Fragment key={row.kind}>
                        <div style={{ ...styles.labelCell, ...last, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>{row.kind}{row.rel && <span style={{ fontSize: 10.5, fontWeight: 400 }}>関連: {row.rel}</span>}</div>
                        {KIND_COLS.map((c) => (
                          <div key={c.key} style={{ ...styles.cell, ...styles.textCell, ...last, flexDirection: "column", gap: 4 }}>
                            <KindMark mark={row[c.key].mark} />
                            <span>{row[c.key].text}</span>
                            <ColorSwatches cell={row[c.key]} />
                          </div>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="dsp-mobile-only" style={styles.sourceList}>
              {COLOR_KINDS.map((row) => (
                <div key={row.kind} style={styles.sourceCard}>
                  <div style={styles.sourceName}>{row.kind}</div>
                  {row.rel && <div style={{ fontSize: 11, marginTop: 2 }}>関連: {row.rel}</div>}
                  {KIND_COLS.map((c) => (
                    <div key={c.key} style={styles.kindMobileRow}>
                      <div style={styles.kindMobileHead}><KindMark mark={row[c.key].mark} /><span>{c.name}</span></div>
                      <div style={styles.exceptionText}>{row[c.key].text}</div>
                      <ColorSwatches cell={row[c.key]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p style={styles.chartNote}>色見本の値: Apple=HIG Colorの色見本、Google=Jetpack Composeの基準の配色。</p>
          </section>

          <div style={styles.memoBox}>
            <span style={styles.memoLabel}>メモ: ダークモードでの扱い(詳しくは<PageLink to="/tokens/dark-mode">ダークモード</PageLink>)</span>
            <ul style={styles.memoList}>
              <li>Apple ― 独自の色はライト・ダークの2版と、それぞれにコントラストを上げる設定用の版を用意する。1つの外観しか提供しないアプリでも、Liquid Glassのためにライト・ダーク両方の色が必要。比率は最低4.5:1、独自の色は7:1を目指す。</li>
              <li>Google ― 同じロールにライトとダークで別のトーンを割り当てる(例: Primary 40→80、Surface 98→6、On Surface 10→90)。コントラストの目標値はどちらのテーマでも同じ。</li>
              <li>W3C ― ダークモード専用の基準はなく、どちらの見た目にも同じ基準が適用される。</li>
              <li>NN group ― 正常な視力の人は多くの場合ライトモードの方が読み取りの成績が良いという研究を紹介し、既定は端末の設定に従うことを勧めている。</li>
            </ul>
            <a href="/tokens/dark-mode" style={styles.memoLink}>詳しくは「ダークモード」ページへ ↗</a>
          </div>

          <div style={styles.relatedBox}>
            <span style={styles.memoLabel}>関連するページ</span>
            <p style={{ fontSize: 12, lineHeight: 1.8, margin: 0 }}>
              <PageLink to="/tokens/dark-mode">ダークモード</PageLink>(ライト/ダークの色の切り替え)・<PageLink to="/tokens/interaction-states">インタラクション状態</PageLink>(押した・選んだときの重ね色)・<PageLink to="/tokens/typography">タイポグラフィ</PageLink>(文字の大きさとコントラスト)・<PageLink to="/tokens/elevation">エレベーション</PageLink>(面の色の段階)・<PageLink to="/tokens/icon">アイコン</PageLink>(アイコンのコントラスト)・<PageLink to="/components/actions/link">リンク</PageLink>(リンクの色と下線)
            </p>
          </div>

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
  relatedBox: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", marginBottom: 40 },
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
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#666D93", margin: "10px 0 0", lineHeight: 1.6 },
  sectionLead: { fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: "0 0 14px" },
  priorityGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 12 },
  priorityCol: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 10px", minWidth: 0 },
  priorityName: { fontSize: 13.5, fontWeight: 700 },
  priorityBasis: { fontSize: 11, color: "#565D8A", margin: "2px 0 10px", lineHeight: 1.5 },
  tierList: { display: "flex", flexDirection: "column", gap: 6 },
  tierRow: { display: "flex", alignItems: "center", gap: 7, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "6px 7px" },
  tierRank: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#666D93", width: 10, flexShrink: 0 },
  tierName: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 600, color: "#171B36" },
  tierDesc: { fontSize: 10, lineHeight: 1.45, color: "#565D8A" },
  ratioChip: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 600, color: "#FFFFFF", background: "#3C5A73", borderRadius: 3, padding: "2px 6px", flexShrink: 0, whiteSpace: "nowrap" },
  ratioChipMuted: { background: "#E1E3F0", color: "#454C78" },
  tierExtra: { fontSize: 10.5, lineHeight: 1.6, color: "#454C78", margin: "8px 0 6px" },
  tierA11y: { fontSize: 10.5, lineHeight: 1.6, color: "#2E3457", borderTop: "1px dashed #D5D9EC", paddingTop: 6 },
  tierA11yLabel: { display: "block", fontSize: 10, fontWeight: 700, color: "#3C5A73", marginBottom: 2 },
  kindSection: { marginBottom: 22 },
  kindListGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10, marginBottom: 14 },
  kindListCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 4, padding: "10px 12px" },
  kindListName: { fontSize: 11.5, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  kindMark: { fontSize: 15, fontWeight: 700, lineHeight: 1 },
  kindMobileRow: { borderTop: "1px solid #E1E3F0", paddingTop: 8, marginTop: 8 },
  kindMobileHead: { display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 600, color: "#171B36", marginBottom: 3 },
  memoBox: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "12px 14px", marginBottom: 22 },
  memoLabel: { display: "block", fontSize: 12, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  memoList: { margin: "0 0 8px", paddingLeft: 18, fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  memoLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
};
