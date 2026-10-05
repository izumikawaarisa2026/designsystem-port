import React from "react";
import SidebarNav from "./sidebar-nav";

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
    position: "色の見た目ではなく「意味」で定義する「セマンティックカラー」(systemBlue・label・systemBackground等)を使い、ライト/ダークモードやコントラスト設定に応じて自動的に配色を切り替える方式",
    size: "HIGのDark Modeページで、色どうしのコントラスト比は最低でも4.5:1を下回らないこと、独自の文字色・背景色では特に小さい文字で7:1を目指すことを勧めています。Accessibilityページでは、Xcodeの検査ツール(Accessibility Inspector)がWCAG AAの値を目安に判定するとして、17pt以下の文字は4.5:1、18pt以上または太字は3:1という表を示しています(Colorページ自体には数値の記載はありません)。",
    colorInfo: "systemBlue・systemRed・label・secondaryLabel・systemBackground等、意味ごとに名前が付いた「セマンティックカラー」を提供。各色はライトモード/ダークモード/Increase Contrast/Reduce Transparencyといったアクセシビリティ設定に応じて自動的に値を切り替える「ダイナミックカラー」として実装されている。",
    stance:
      "Appleは固定の色値ではなくセマンティックカラーの使用を推奨しています。iOS/macOSはVibrancyやIncrease Contrast、Reduce Transparencyといったアクセシビリティ設定に自動的に適応する一連のシステムカラーを提供しており、これらの意味を独自に再定義するのではなく意図された通りに使うことで、ライト/ダーク両方の外観・あらゆるコンテキストで一貫した見た目とコントラストを保てるとしています。独自の色を定義する場合は、ライト・ダークの版と、それぞれにコントラストを上げる設定(Increase Contrast)用の版を用意するよう求めています(ページ本文を直接確認、2026-09)。",
    exceptions:
      "アプリが1つの外観しか提供しない場合でも、Liquid Glassの見え方に対応するため、ライトとダークの両方の色を用意するよう求めています。色覚に特性のある人が区別しにくい色の組み合わせや、コントラスト不足でアイコンや文字が背景に溶け込むことを避けるよう求めています。",
    accessibility: "知覚可能(Perceivable) ― 最低4.5:1はWCAG 1.4.3(AA)の本文の基準と同じ値、独自の色で目指す7:1はWCAG 1.4.6(AAA)の本文の基準と同じ値です。システムカラーはIncrease Contrastなどの設定にも自動で対応します。",
    useCases: [
      "固定の色値ではなくセマンティックカラー(systemBlue・label等)を使う",
      "ライト/ダーク/コントラストを上げる設定のすべてでコントラストを確認する(最低4.5:1、独自の色は7:1を目指す)",
      "セマンティックカラーの意味を独自に再定義しない",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/color#Best-practices",
    urlSecondary: [
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
    position: "primary/secondary/tertiary/error/surface等、26種類の「カラーロール」で色の意味を体系化。ユーザーの壁紙等から配色を生成する「ダイナミックカラー」の仕組みを持つ",
    size: "Google公式の配色生成ライブラリ(material-color-utilities)では、標準のコントラスト設定で、本文の文字色(on-surface)は背景に対して7:1、補助の文字色(on-surface-variant)とprimary・secondary・tertiary・errorは4.5:1、枠線(outline)は3:1を目標値として色を生成します。ユーザーがコントラストを上げる設定(中・高)にすると、目標値が段階的に引き上げられます(例: on-surfaceは11:1・21:1)。",
    colorInfo: "1つのシードカラーから、HCT(Hue, Chroma, Tone)という知覚基準の色空間を使ってprimary/secondary/tertiary/neutral/neutral variantの5つのキーカラーを導出し、それぞれ0(黒)〜100(白)の13段階のトーンパレットを生成。カラーロールはこのパレットから固定のトーンを割り当てる。errorロールは、ダイナミックカラーが有効な場合でも変化しない静的な色として扱われる。",
    stance:
      "primary/secondary/tertiary/error/surface/outlineという6つのグループにまとめられた26のカラーロールが、UIのどこにどの色を使うかを結びつける「接続組織」の役割を果たすとされています。errorロールはダイナミックカラーが有効でも固定される点が特徴です(検索結果による確認、2026-09)。",
    exceptions:
      "独自のブランド色を指定する場合は、既定のPrimaryと同じ明るさ(トーン40)を保たないと、部品の中でコントラストが崩れることがあると注意しています。装飾的な区切り線に使うoutline-variantには、標準の設定ではコントラストの目標値がありません。なお、ライブラリの新しい2025年版の仕様では、スマートフォンのライトテーマでon-surfaceを9:1とするなど、一部の目標値が変わっています。",
    accessibility:
      "知覚可能(Perceivable) ― 役割ごとの目標値(本文7:1・補助の文字4.5:1・枠線3:1)は、WCAG 1.4.3(AA 4.5:1)・1.4.6(AAA 7:1)・1.4.11(3:1)の数値と対応しています。Android 14以降は、端末のコントラスト設定に合わせてロールの色が自動で調整されます。",
    useCases: [
      "UIの意味ごとにカラーロール(primary/secondary/tertiary/error/surface)を割り当てる",
      "errorロールはダイナミックカラーでも固定色として扱う",
      "ユーザーの壁紙等から配色を生成するダイナミックカラーを活用する",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/color/roles",
    urlSecondary: [
      { label: "Color system overview", url: "https://m3.material.io/styles/color/system/overview" },
      { label: "MDC Android: Color theming(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md" },
      { label: "material-color-utilities: 各ロールの目標値(GitHub)", url: "https://github.com/material-foundation/material-color-utilities/blob/main/typescript/dynamiccolor/color_spec_2021.ts" },
    ],
    confirmedNote: "m3.material.io本文はSPAのため未確認。ロールの一覧とトーンはMaterial Components for AndroidのColor theming文書、コントラストの目標値はmaterial-color-utilitiesのソース(2021年版の仕様)で直接確認(2026-09)。",
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
    position: "3つの独立した達成基準で、本文テキストのコントラスト(1.4.3)・UI部品やグラフィックのコントラスト(1.4.11)・色だけに頼らない情報伝達(1.4.1)をそれぞれ規定",
    size: "1.4.3(レベルAA): 通常テキストは4.5:1以上、大きな文字(18pt以上の通常書体、または14pt以上の太字)は3:1以上。1.4.11(レベルAA): UI部品の状態を識別するための視覚情報・理解に必要なグラフィックの要素は3:1以上。いずれも計算値は四捨五入しない(例: 4.499:1は基準を満たさない)。",
    colorInfo: "1.4.1(レベルA)により、色は情報を伝える・アクションを示す・応答を促す・視覚要素を区別する唯一の手段にしてはならないとしています。必須項目を赤だけで示すのではなく、アイコンやテキストラベルも併用すべきとしています。",
    glossary: [
      { term: "1.4.3 Contrast (Minimum)・レベルAA", desc: "本文テキストは4.5:1以上、大きな文字は3:1以上のコントラスト比を確保する基準。非活性コンポーネントの一部・純粋な装飾・不可視のテキスト・ロゴのテキストは適用除外。" },
      { term: "1.4.11 Non-text Contrast・レベルAA", desc: "UI部品を識別するための視覚情報(枠線・アイコン等、ユーザーエージェントが決定し変更されない部分を除く)、理解に必要なグラフィックの一部に3:1以上のコントラスト比を求める基準。" },
      { term: "1.4.1 Use of Color・レベルA", desc: "色を情報伝達の唯一の視覚的手段にしてはならないという基準。色覚特性を持つ人や白黒表示を使う人にも同じ情報が伝わるよう、アイコンやテキストなど別の視覚的手がかりの併用を求める。" },
    ],
    stance:
      "1.4.3は本文・画像化されたテキストのコントラスト比を規定する基準で、非活性コンポーネントの一部であるテキスト・純粋な装飾・誰にも見えないテキスト・ロゴの一部であるテキストは適用除外としています。1.4.11は、UI部品を識別するための視覚情報、理解に必要なグラフィックの一部に同様の3:1基準を課しています。1.4.1は、色を「情報を伝える・アクションを示す・応答を促す・視覚要素を区別する」唯一の手段にしてはならないとし、色覚特性を持つ人や白黒表示を使う人にも同じ情報が伝わるようにすることを求めています。",
    exceptions:
      "1.4.3は非活性コンポーネントの一部・純粋な装飾・不可視のテキスト・ロゴのテキストを適用除外としています。1.4.11も非活性コンポーネントや、ユーザーエージェントが決定し変更されない外観は適用除外です。ロゴ・国旗・写真など、特定の見た目自体が伝えたい情報そのものであるグラフィックも除外され得るとしています。",
    accessibility: "知覚可能(Perceivable) ― 1.4.3・1.4.11・1.4.1はいずれもPOURの「知覚可能」に属し、視覚・色覚に特性のあるユーザーが、テキスト・UI部品・色分けされた情報を見分けられることを目的としています。",
    useCases: [
      "本文テキストは4.5:1以上、大きな文字・UI部品や重要なグラフィックは3:1以上のコントラスト比を確保する",
      "必須項目やエラーなどを色だけで示さず、アイコン・テキストラベルも併用する",
      "コントラスト比の計算値は四捨五入せず、基準をわずかに下回る値は不合格として扱う",
    ],
    searchHint: "not be rounded",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    urlSecondary: [
      { label: "1.4.11 Non-text Contrast", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { label: "1.4.1 Use of Color", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
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
    position: "配色バランス(60-30-10ルール)・一貫性・色覚特性への配慮という、実務的な配色ガイドライン(適合基準ではない)",
    size: "数値基準としては「60%を基調色、30%を第二色、10%をアクセントカラーに」という60-30-10ルールを提案。パレットは3色程度に絞ることを推奨しています。",
    colorInfo: "パレットは3色程度に絞り、視覚的な階層とコントラストを強めることを推奨。色覚特性(color blindness)への配慮とコントラストのテストを勧め、テキストと背景の組み合わせの検証にはaccessible-colors.comのようなツールを挙げています(WCAGの具体的な比率への言及は記事中にありません)。",
    stance:
      "色の使い方は「60%基調色・30%第二色・10%アクセントカラー」という配分ルールでバランスを保つべきだとしています。同じ意味(例: CTAボタン)には常に同じ色を一貫して使うべきで、一貫性がないとユーザーが色の意味を誤解するとしています。コントラストと色覚特性の両方を検証すべきで、実例としてUberEatsの緑ロゴがオレンジ背景に対して読みにくかった事例を挙げています(記事本文を直接取得して確認済み、2026-09)。",
    exceptions:
      "配色の文化的な意味の違いにも注意が必要だとしています(赤は世界的に「停止」を意味することが多い一方、お金を表す色は中国では赤、米国では緑など)。グレーのボタンが意図せず「無効」に見えてしまうことがある点も、実際のユーザーテストで確認すべきだとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際のユーザビリティ・可読性のテスト結果に基づく実務指針です。",
    useCases: [
      "配色は60%基調色・30%第二色・10%アクセントカラーのバランスで設計する",
      "同じ意味には常に同じ色を一貫して使う",
      "コントラストと色覚特性の両方を、実際のユーザーテストとツールで検証する",
    ],
    searchHint: "",
    url: "https://www.nngroup.com/articles/color-enhance-design/",
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
      { name: "Primary background", desc: "画面全体の背景(System Background)", ratio: "背景", sample: { nest: 0 } },
      { name: "Secondary background", desc: "その中のまとまり(グループ・カードなど)の背景", ratio: "背景", sample: { nest: 1 } },
      { name: "Tertiary background", desc: "さらに内側のまとまりの背景", ratio: "背景", sample: { nest: 2 } },
      { name: "Label", desc: "主要な内容の文字", ratio: "4.5:1", sample: { text: true, opacity: 1 } },
      { name: "Secondary label", desc: "補助的な内容の文字", ratio: "4.5:1", sample: { text: true, opacity: 0.72 } },
      { name: "Tertiary label", desc: "さらに下位の内容の文字", ratio: "4.5:1", sample: { text: true, opacity: 0.5 } },
      { name: "Quaternary label", desc: "最も重要度の低い文字(macOSでは透かし文字など)", ratio: "4.5:1", sample: { text: true, opacity: 0.32 } },
    ],
    extra: "背景はPrimary(画面全体)→ Secondary(その中のまとまり)→ Tertiary(さらに内側のまとまり)の3段階で、図の濃い部分がその段階の範囲。文字はLabelの4段階。一覧形式の画面用に、同じ3段階のGrouped版の背景が別にある。",
    a11y: "段階ごとの比率は公開されていない。文字は段階にかかわらず、17pt以下は4.5:1・18pt以上または太字は3:1(検査ツールが使うWCAG AAの値)。独自の色は7:1を目指し、コントラストを上げる設定用の版も用意する。",
  },
  {
    key: "material",
    name: "Google",
    color: "#2F7D6E",
    basis: "強調の度合いで、3つのアクセント色と中立色を段階分け",
    tiers: [
      { name: "Primary", desc: "最も目立たせる要素(塗りつぶしボタン、選択中のラジオ・チェックボックス、スライダー)", ratio: "4.5:1", sample: { fill: "#2F7D6E" } },
      { name: "Secondary", desc: "控えめな強調(トーナルボタン、選択中のチップ、ナビゲーションバーの選択表示)", ratio: "4.5:1", sample: { fill: "#6E8E86" } },
      { name: "Tertiary", desc: "対比のアクセント(時刻ピッカーの午前/午後の選択、Vibrantメニュー)", ratio: "4.5:1", sample: { fill: "#4E6E8C" } },
      { name: "On Surface", desc: "本文の文字", ratio: "7:1", sample: { text: true, opacity: 1 } },
      { name: "On Surface Variant", desc: "補助の文字・アイコン", ratio: "4.5:1", sample: { text: true, opacity: 0.66 } },
      { name: "Outline", desc: "入力欄などの枠線", ratio: "3:1", sample: { line: "#8A8F99" } },
      { name: "Outline Variant", desc: "カードの枠など装飾的な区切り", ratio: "目標なし", sample: { line: "#D3D6DE" } },
    ],
    extra: "Primary・Secondary・Tertiaryにはそれぞれ強調を弱めたContainer版があり、その上に載せる文字(On … Container)は4.5:1。Primaryの上の文字(On Primary)は7:1。",
    a11y: "比率は、Google公式の配色生成ライブラリが標準のコントラスト設定で使う目標値(背景に対する比率)。ユーザーがコントラストを上げる設定では、段階ごとに引き上げられる(例: On Surfaceは11:1・21:1)。",
  },
  {
    key: "wcag",
    name: "W3C",
    color: "#A3821F",
    basis: "優先度ではなく、要素の種類で基準を分ける",
    tiers: [
      { name: "本文テキスト", desc: "1.4.3(AA)/ AAAの1.4.6では7:1", ratio: "4.5:1", sample: { text: true, hex: "#767676" } },
      { name: "大きな文字", desc: "18pt以上、または14pt以上の太字 / AAAでは4.5:1", ratio: "3:1", sample: { text: true, hex: "#949494", big: true } },
      { name: "UI部品・グラフィック", desc: "部品を見分けるための枠やアイコン(1.4.11)", ratio: "3:1", sample: { line: "#949494" } },
      { name: "色だけで区別するリンク", desc: "周囲の文字との差(1.4.1の達成方法G183)", ratio: "3:1", sample: { link: true } },
      { name: "非活性・装飾・ロゴ", desc: "コントラストの基準の適用除外", ratio: "対象外", sample: { text: true, hex: "#C9CCD9" } },
    ],
    extra: "色そのものに優先度の段階は定めない。どんな色でも、その要素の種類に応じた比率を満たすかどうかで判断する。",
    a11y: "比率は背景(リンクは周囲の文字)に対する最低値。計算値は四捨五入しない。",
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
    extra: "パレットは3色程度に絞り、同じ意味(例: CTAボタン)には常に同じ色を使う。",
    a11y: "コントラスト比の数値は示さない。ツールと実際のテストで、コントラストと色覚特性の両方を確かめるよう勧める。薄い文字は読みにくく、見落とされ、「使えない(無効)」と誤解される原因になるとして避けるよう勧めている。",
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
const COLOR_KINDS_LIST = {
  hig: ["Label(4段階)", "Placeholder text", "Separator / Opaque separator", "Link", "背景(System / Grouped × 3段階)", "App accent color", "システムカラー(12色)+グレー(6段階)", "macOSのみ: Control accent・Keyboard focus indicator・Find highlight など30種類以上"],
  material: ["Primary / Secondary / Tertiary(各: 基本・On・Container・On Container・Fixed系)", "Error(Error・On Error・Container)", "Surface(基本・Dim・Bright・Container 5段階)", "On Surface / On Surface Variant", "Inverse(Surface・On Surface・Primary)", "Outline / Outline Variant", "Background / On Background"],
  wcag: ["色の種類は定義しない", "要素の種類ごとに基準: 本文・大きな文字・UI部品・グラフィック・色で区別するリンク"],
  nn: ["基調色・第二色・アクセントカラー(60-30-10)", "未訪問リンク・訪問済みリンク"],
};

const COLOR_KINDS = [
  {
    kind: "アクセント(ブランド)色",
    hig: { mark: "◯", text: "App accent color。ボタン・選択のハイライト・サイドバーのアイコンに使うアプリ独自の色(macOS 11以降)。ユーザーがシステム設定でアクセントカラーを選ぶとそちらが優先される。Liquid Glassでは主要なボタン(完了など)の背景に使い、複数の部品に色を付けすぎないよう求める。" },
    material: { mark: "◯", text: "Primary・Secondary・Tertiaryの3グループがブランドを表すアクセント色。ダイナミックカラーでは壁紙などから自動生成される。独自の色にする場合もPrimaryはトーン40を保つよう注意がある。" },
    wcag: { mark: "―", text: "専用の定義なし。アクセント色で情報を伝える場合も、1.4.1・1.4.3・1.4.11の一般的な基準がそのまま適用される。" },
    nn: { mark: "◯", text: "60-30-10の「10%」がアクセントカラー。同じ意味(例: CTAボタン)には常に同じ色を使う。" },
  },
  {
    kind: "リンク色",
    hig: { mark: "◯", text: "リンク専用の動的システムカラーがある(iOSのLink、macOSのLink color)。ライト/ダークで自動的に値が変わる。" },
    material: { mark: "✕", text: "リンク専用のカラーロールはない(Material Components for Androidのロール一覧に存在しない)。" },
    wcag: { mark: "◯", text: "リンクを色だけで区別するなら、周囲の文字と3:1以上の差に加え、ホバー・フォーカス時に下線などの手がかりを出す(G183)。色覚に頼らないと見分けられないリンクは不適合の例(F73)。" },
    nn: { mark: "◯", text: "色+下線が最も分かりやすい。未訪問は鮮やか、訪問済みはくすんだ同系色にする。青はリンク以外の文字に使わない。2026年3月の編集注で、下線は必須ではなくG183の方式でもよいと補足された。" },
  },
  {
    kind: "エラー色",
    hig: { mark: "△", text: "エラー専用の名前付きカラーはない(システムカラーはRedなど色名で定義)。色の意味は文化によって違うことにも注意を求める。" },
    material: { mark: "◯", text: "Errorグループ(Error・On Error・Error Container)。ダイナミックカラーが有効でも変わらない固定の色で、背景に対して4.5:1。" },
    wcag: { mark: "△", text: "専用の色はないが、エラーや必須項目を色の違いだけで示すことは1.4.1の不適合の例(F81)。" },
    nn: { mark: "△", text: "言葉の意味でも区別できるなら、「エラー」を赤で示してよい。ただしリンクの色と重ならないようにする。" },
  },
  {
    kind: "枠線・区切り線",
    hig: { mark: "◯", text: "Separator(下の内容が少し透ける)とOpaque separator(透けない)の2種類。区切り線の色を文字に使うなど、意味の流用はしない。" },
    material: { mark: "◯", text: "Outline(入力欄の枠など、3:1)とOutline Variant(カードの枠など装飾的な区切り、目標値なし)の2種類。" },
    wcag: { mark: "△", text: "枠線が部品を見分けるのに必要な場合は1.4.11で3:1以上。装飾的な線は対象外。" },
    nn: { mark: "―", text: "該当する記述なし。" },
  },
  {
    kind: "非活性・プレースホルダー",
    hig: { mark: "◯", text: "Placeholder text(入力欄のプレースホルダー)。macOSには使えない部品の文字色(Unavailable control text color)もある。" },
    material: { mark: "△", text: "専用のロールはなく、On Surfaceの色を38%の不透明度で重ねて非活性を表す(Jetpack Composeのトークン定義で確認)。" },
    wcag: { mark: "△", text: "非活性の部品は1.4.3・1.4.11の適用除外。" },
    nn: { mark: "△", text: "薄いグレーは「無効」に見えやすい。使える要素を薄くすると、使えないと誤解される原因になる。" },
  },
];

const KIND_COLS = [
  { key: "hig", name: "Apple" },
  { key: "material", name: "Google" },
  { key: "wcag", name: "W3C" },
  { key: "nn", name: "NN group" },
];

function KindMark({ mark }) {
  const c = mark === "◯" ? "#2F7D6E" : mark === "△" ? "#A3821F" : mark === "✕" ? "#C0503F" : "#B7BCDA";
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
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
            <span>トークン / ファウンデーション / カラー</span>
            <span>SPEC No. 042</span>
          </div>

          <h1 style={styles.title}>カラー(配色・コントラスト基準)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、配色の仕組みと文字・UI部品のコントラスト基準をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コントラスト比とは(共通の考え方)</span>
            <ColorContrastSwatch />
            <p style={styles.swatchNote}>文字色と背景色の明るさの差を表す数値。WCAGは本文4.5:1以上を要求しており、この数値がこのページの各系列比較の共通のものさしになる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このトピックで最も数値的に具体的なのはW3Cです。<strong>本文4.5:1・大きな文字/UI部品3:1</strong>という明確な数値を持つ1.4.3・1.4.11に加え、<strong>「色だけに頼ってはならない」</strong>という1.4.1が、数値基準とは別の角度から情報の伝わりやすさを担保しています。
            </p>
            <p style={styles.synthesisText}>
              一方でApple・Googleは、どちらも<strong>数値を手計算させるのではなく「システムが意味に応じて自動的に適切な色を割り当てる」</strong>という抽象化されたアプローチを取っています。Appleの「セマンティックカラー」、Googleの「カラーロール」はいずれも、色そのものではなく色の「意味」を定義する仕組みで、アクセシビリティ設定や壁紙の色に応じて実際の値が自動的に変わります。これはW3Cの「都度、数値を検証する」思想とは構造的に異なるアプローチですが、目指すところ(十分なコントラストの確保)は共通しています。なおAppleも、独自の色を使う場合に備えて<strong>最低4.5:1、独自の色では7:1を目指す</strong>という推奨値をDark Modeのページで示しており、WCAGのAA(4.5:1)より一段高いAAA相当の水準を勧めています。
            </p>
            <p style={styles.synthesisText}>
              色の<strong>優先度(階層)の決め方</strong>も4系列で違います。Appleは<strong>内容の重要度</strong>(Label→Secondary→Tertiary→Quaternary)、Googleは<strong>強調の度合い</strong>(Primary→Secondary→Tertiary)、W3Cは<strong>要素の種類</strong>(本文・大きな文字・UI部品)、NN groupは<strong>面積の比率</strong>(60-30-10)で段階を分けています。段階ごとにコントラストの目標値まで決めているのはGoogleで、本文の文字7:1・補助の文字4.5:1・枠線3:1と、WCAGの数値に沿った値を配色の生成時に自動で満たす仕組みです。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupの<strong>「60-30-10ルール」</strong>は、コントラスト単体の合否ではなく、配色全体のバランス・階層の分かりやすさという、やや異なる関心事です。ただし「一貫性がないと色の意味を誤解される」「コントラストと色覚特性の両方をテストすべき」という指摘は、W3Cの1.4.1・1.4.3の問題意識と実質的に重なります。
            </p>
            <p style={styles.synthesisText}>
              4系列に共通する数少ない一致点は、やはり<strong>「色だけに頼ってはならない」</strong>という原則です。W3C(1.4.1の適合基準)・NN group(実際のユーザーテストに基づく指摘)がそれぞれ独立に同じ結論に達しており、Apple・Googleのセマンティックカラー/カラーロールの仕組みも、最終的にはこの原則を壊さないための設計だと解釈できます。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 色の優先度(階層)の定義とアクセシビリティの指定</h2>
            <PriorityDiagram />
            <p style={styles.chartNote}>番号は各系列の中での優先度(上ほど強い・重要)。右端の値は、その段階に求められるコントラスト比(背景に対する最低値)。NN groupのみ比率ではなく面積の割合。色見本は概念図で、各系列の実際の色の値ではありません。</p>
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
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <InfoBox label="コントラスト比" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="配色の仕組み">{s.colorInfo}</InfoBox>
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
            <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>コントラスト比</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>配色の仕組み</div>
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
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <section style={styles.kindSection}>
            <h2 style={styles.diagramTitle}>アクセントカラー・リンクカラーなど、別に定義されている色の比較</h2>
            <p style={styles.sectionLead}>
              ブランドを表すアクセント色のほかに、リンク・エラー・枠線などを専用の色として定義しているかどうかも系列ごとに違います。<strong>リンク色を専用に持つのはAppleだけ</strong>で、Googleのカラーロールにはリンク用がありません。逆に<strong>エラー色を固定の役割として持つのはGoogleだけ</strong>です。
            </p>

            <div style={styles.kindListGrid}>
              {KIND_COLS.map((c) => (
                <div key={c.key} style={styles.kindListCard}>
                  <div style={styles.kindListName}>{c.name} ― 定義されている色の種類</div>
                  <ul style={styles.useCaseList}>
                    {COLOR_KINDS_LIST[c.key].map((it) => (<li key={it} style={styles.useCaseItem}>{it}</li>))}
                  </ul>
                </div>
              ))}
            </div>

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
                        <div style={{ ...styles.labelCell, ...last }}>{row.kind}</div>
                        {KIND_COLS.map((c) => (
                          <div key={c.key} style={{ ...styles.cell, ...styles.textCell, ...last, flexDirection: "column", gap: 4 }}>
                            <KindMark mark={row[c.key].mark} />
                            <span>{row[c.key].text}</span>
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
                  {KIND_COLS.map((c) => (
                    <div key={c.key} style={styles.kindMobileRow}>
                      <div style={styles.kindMobileHead}><KindMark mark={row[c.key].mark} /><span>{c.name}</span></div>
                      <div style={styles.exceptionText}>{row[c.key].text}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p style={styles.chartNote}>◯=専用の色・基準がある △=一般的な基準の中で扱う/専用ではないが関連する定め ✕=専用の色がない ―=該当する記述なし</p>
          </section>

          <div style={styles.memoBox}>
            <span style={styles.memoLabel}>メモ: ダークモードでの扱い</span>
            <ul style={styles.memoList}>
              <li>Apple ― 独自の色はライト・ダークの2版と、それぞれにコントラストを上げる設定用の版を用意する。1つの外観しか提供しないアプリでも、Liquid Glassのためにライト・ダーク両方の色が必要。比率は最低4.5:1、独自の色は7:1を目指す。</li>
              <li>Google ― 同じロールにライトとダークで別のトーンを割り当てる(例: Primary 40→80、Surface 98→6、On Surface 10→90)。コントラストの目標値はどちらのテーマでも同じ。</li>
              <li>W3C ― ダークモード専用の基準はなく、どちらの見た目にも同じ基準が適用される。</li>
              <li>NN group ― 正常な視力の人は多くの場合ライトモードの方が読み取りの成績が良いという研究を紹介し、既定は端末の設定に従うことを勧めている。</li>
            </ul>
            <a href="/tokens/dark-mode" style={styles.memoLink}>詳しくは「ダークモード」ページへ ↗</a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、数値はGoogle公式のドキュメント・ソースで確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Colorページの「Best practices」見出しへのアンカー付きリンクで、数値が書かれたDark Modeページの見出しも併記しています。WCAGは1.4.3 Understandingページを基本リンクとし、1.4.11・1.4.1のUnderstandingページも併記しています。GoogleはM3のColor rolesページに加え、数値を確認したGitHub上の公式ドキュメント・ソースを併記しています。NN groupはUsing Color to Enhance Your Designの記事ページです。リンク色の比較はNN groupのGuidelines for Visualizing Links、WCAGの達成方法G183、薄い文字についてはNN groupのLow-Contrast Text Is Not the Answerの記事も参照しています。
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
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#9EA4C4", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
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
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  sectionLead: { fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: "0 0 14px" },
  priorityGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 12 },
  priorityCol: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 10px", minWidth: 0 },
  priorityName: { fontSize: 13.5, fontWeight: 700 },
  priorityBasis: { fontSize: 11, color: "#565D8A", margin: "2px 0 10px", lineHeight: 1.5 },
  tierList: { display: "flex", flexDirection: "column", gap: 6 },
  tierRow: { display: "flex", alignItems: "center", gap: 7, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "6px 7px" },
  tierRank: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#9EA4C4", width: 10, flexShrink: 0 },
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
