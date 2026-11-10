import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList } from "./page-parts";

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
    position: "システムフォント San Francisco と連動する9段階のウェイト・3段階のスケール・4種類のレンダリングモードを持つシンボル体系",
    size: "3段階のスケール(small / medium(既定) / large)。スケールはSan Franciscoフォントのキャップハイト(大文字の高さ)を基準に定義される。シンボルは隣接するテキストのポイントサイズに合わせて表示され、スケールで文字に対する強弱を調整する。スケールごとの具体的なpt数値はHIG本文には示されていない。",
    colorInfo: "4種類のレンダリングモードで色の適用方法が変わる。モノクローム(単色、最も中立的)・階層的(1つの色相の濃淡で奥行きを表現)・パレット(2色以上のコントラストで要素を強調)・マルチカラー(シンボル自体が複数色を内蔵)。",
    stance:
      "SF Symbolsは、ウルトラライトからブラックまでの9段階のウェイトを持ち、それぞれ隣接するテキストのSan Franciscoフォントのウェイトと精密に対応させることで、シンボルと文字の視覚的な調和を図れるとされている。スケールはsmall/medium(既定)/largeの3段階で、キャップハイトを基準に定義され、同じポイントサイズの文字とのウェイトの対応を崩さずに強弱を調整できる。選択状態にはfill、利用できない状態にはslashといったバリアントで状態を表せる。",
    exceptions:
      "どのレンダリングモードを使うべきかという固定のルールはなく、シンボルのサイズや背景とのコントラストによって細部の見えやすさが変わるため、使う場所ごとに見え方を確認するよう求めている。自動設定でシンボルごとの推奨モードを使うこともできる。可変カラー(Variable color)は量や強さの変化を表すためのもので、奥行きの表現には使わない(奥行きは階層的モードで表す)としている。",
    accessibility: "知覚可能(Perceivable) ― 専用の数値基準はないが、どのレンダリングモードでもシステムカラーを使えば、アクセシビリティ設定やダークモードに自動で追従するとしている。アイコン単体の意味の伝達については、W3C(1.1.1/4.1.2)を参照。",
    useCases: [
      "隣接するテキストのウェイトに合わせてシンボルのウェイトを選ぶ",
      "文脈に応じてスケール(small/medium/large)を使い分ける",
      "中立的に見せたい場合はモノクローム、強調したい場合はパレット/マルチカラーを検討する",
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
    illustrationNote: "3段階のスケール、ウェイトによる太さの違い(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Symbols(Material Design 3)",
    color: "#2F7D6E",
    position: "Outlined / Rounded / Sharpの3スタイル(可変フォントのfill軸で塗りつぶし表現も可能)。fill/weight/grade(太さの細かい調整)/optical size(表示サイズに合わせた線の太さの調整)の4軸を持つ可変フォント",
    size: "オプティカルサイズ(opsz)軸は20〜48dpの範囲。表示サイズを変えても同じ見た目に見えるよう、ストロークの太さが自動調整される。Google Fontsから読み込んだときの既定値はopsz 48・weight 400・grade 0・fill 0。",
    colorInfo: <span><NoData>数値基準なし。</NoData>weight軸・grade軸によって視覚的な太さ・濃さの印象を調整できるとされている。</span>,
    glossary: [
      { term: "fill軸", desc: "塗りつぶしの有無を切り替える軸。0が既定(輪郭のみ)、1が完全な塗りつぶしで、1つのアイコンで非選択/選択の両方の状態を表せる。状態の切り替えのアニメーションにも使う。独立した「Filledフォント」ではなく、Outlined/Rounded/Sharpそれぞれの可変フォントの1軸として提供される。" },
      { term: "optical size(opsz)軸", desc: "20〜48dpの範囲でアイコンの表示サイズを指定する軸。値に応じてストロークの太さが自動調整され、サイズを変えても同じ見た目に保たれる。" },
      { term: "weight軸・grade軸", desc: "weightは線の太さで、thin(100)〜bold(700)の範囲。gradeはweightより細かい太さの調整で、アイコンの大きさへの影響が小さい。暗い背景の明るいアイコンのにじみを抑えるには低いgrade(例: -25)、強調には高いgrade(例: 200)を使う。" },
    ],
    stance:
      "Material Symbolsは、Outlined(密なUIに向く軽く整理されたスタイル)・Rounded(角丸で太めのタイポグラフィやロゴと調和)・Sharp(直線的で小さいスケールでも視認性が高い)の3スタイルで提供されるとされている。独立した「Filled」フォントは無く、各スタイルが持つfill軸で塗りつぶし表現を実現する。fill・weight・grade・optical sizeの4つの可変フォント軸により、1つのフォントファイルで幅広い見た目を表現できる。",
    exceptions: "gradeは、暗い背景に明るいアイコンを置くときのにじみを抑える目的で低い値(例: -25)に、強調したいときは高い値(例: 200)にするとしている。文字のフォントがgrade軸を持つ場合は、文字とアイコンのgradeをそろえると調和するとしている。",
    accessibility:
      "操作可能(Operable)・知覚可能(Perceivable) ― アイコン単体の意味の伝達については、下記W3C(1.1.1/4.1.2)を参照。Material Symbols自体に専用のアクセシビリティ数値基準はない。",
    useCases: [
      "密なUIにはOutlined、丸みのあるブランドにはRounded、直線的で小さいスケールにはSharpを選ぶ",
      "表示サイズに応じてoptical size軸を調整し、ストローク幅を最適化する",
      "塗りつぶし状態(選択中など)の表現にはfill軸を使う(別スタイルへの切り替えではなく)",
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
    illustrationNote: "3スタイルの形状の違い(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.1.1 Non-text Content / 4.1.2 Name, Role, Value / 1.4.11 Non-text Contrast / 3.2.4 / 2.5.3",
    color: "#A3821F",
    position: "意味を持つアイコンには代替テキストを(レベルA)、アイコンのみの操作要素には programmatic な名前を(レベルA)、UI部品として機能するアイコンには3:1のコントラストを(レベルAA)要求する、などの主な基準",
    size: <span>アイコン専用の数値基準はない。アイコンを押せる部品として使う場合は、2.5.8(AA)の24×24 CSS px以上(例外あり。詳しくは<PageLink to="/components/actions/button">ボタン</PageLink>のページ)。より高い水準の2.5.5(AAA)では44×44 CSS px以上(例外あり)。</span>,
    colorInfo: "1.4.11により、UIコンポーネントの識別に必要な視覚情報(境界線・フォーカス表示・選択状態など)、および情報伝達に必要なグラフィックの一部(アイコン・図表の線など)は、隣接色に対して3:1以上のコントラスト比を確保しなければならないとしている(無効化された要素は除外)。ロゴ・旗・写真など、特定の見た目自体が意味を持つ場合は例外。",
    glossary: [
      { term: "1.1.1 Non-text Content(レベルA)", desc: "意味を伝える非テキストコンテンツ(アイコン・画像など)には、同等の目的を果たすテキストによる代替を提供しなければならないという基準。アイコンが操作要素(ボタンなど)として機能する場合は、視覚的な等価物ではなく「その操作の目的を説明する名前」が必要になる。" },
      { term: "4.1.2 Name, Role, Value(レベルA)", desc: "全てのUIコンポーネントについて、名前と役割をプログラム的に判定可能にしなければならないという基準。名前は視覚的に非表示のままでも構わないが、支援技術が取得・通知できる形で存在しなければならない。アイコンのみのボタンに aria-label 等で名前を与えることが代表的な実装。" },
      { term: "1.4.11 Non-text Contrast(レベルAA)", desc: "UIコンポーネントの識別に必要な視覚情報、および理解に必要なグラフィックの一部について、隣接色との間で3:1以上のコントラスト比を要求する基準。2.999:1のような僅かな未達も不合格になる、厳密な数値基準。" },
      { term: "3.2.4 Consistent Identification・レベルAA", desc: "ページをまたいで繰り返し出てくる、同じ働きの部品を一貫して識別できるようにすることを求める基準。文言が完全に同じである必要はない。" },
      { term: "2.5.3 Label in Name(レベルA)", desc: "見えるラベル(文字)が付いた部品は、支援技術向けの名前にもそのラベルの言葉を含めることを求める基準。食い違うと、音声入力でラベルの言葉を言っても反応しない。" },
    ],
    stance:
      "1.1.1は、意味を伝える非テキストコンテンツには同じ情報を別の形式(視覚・聴覚・触覚のいずれでも認識できる形)で提供する代替テキストを求める。短い代替で意味を伝えきれる場合はそれで十分だが、複雑な図表などでは長い説明が必要になるとしている。アイコンが操作要素として機能する場合は、視覚的な見た目の説明ではなく「その操作が何をするか」を説明する名前が必要だと明記されている。4.1.2は、全てのUIコンポーネントについて名前・役割をプログラム的に判定可能にすることを求め、名前は視覚的に非表示でも構わないが支援技術には常に伝わる必要があるとしている。1.4.11は、UIコンポーネントの識別に必要な視覚情報や、理解に必要なグラフィックの一部について3:1以上のコントラスト比を求める。3.2.4(レベルAA)は、ページをまたいで繰り返し出てくる同じ働きの部品を、一貫して識別できるようにすることを求める。全ページ共通の検索・アカウントなどのアイコンボタンには、どのページでも同じ意味が伝わる名前(代替テキスト)を付ける。",
    exceptions:
      "1.4.11は、無効化(非アクティブ)なコンポーネントには適用されない。また、ロゴ・旗・写真など、特定の視覚的表現自体が情報として本質的な場合は例外とされている。1.1.1についても、装飾目的のみで情報を持たない画像は対象外。",
    accessibility:
      "知覚可能(Perceivable)・堅牢(Robust) ― 1.1.1はテキストによる代替という知覚可能性の基準、4.1.2は支援技術への露出という堅牢性の基準、1.4.11は視覚的な識別可能性という知覚可能性の基準で、それぞれ異なる失敗モードをカバーしている。3.2.4は「理解可能(Understandable)」の予測可能性(3.2)に関わる。2.5.3は「操作可能(Operable)」の入力方法(2.5)の基準。",
    useCases: [
      "意味を持つアイコンには代替テキストを用意する(装飾目的のみの場合は不要)",
      "アイコンのみのボタン・リンクには aria-label 等でプログラム的な名前を必ず与える",
      "UIコンポーネントとして機能するアイコン・境界線は、隣接色に対し3:1以上のコントラストを確保する(無効化状態・ロゴ等の例外を除く)",
      "全ページ共通のアイコンボタンには、どのページでも同じ意味が伝わる名前を付ける(3.2.4)",
      "見えるラベルを付けたアイコンは、支援技術向けの名前(aria-labelなど)にも同じ言葉を含める(2.5.3)。食い違うと、音声入力でラベルの言葉を言っても反応しない",
    ],
    searchHint: "describes its purpose",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
    refs: [
      { kind: "sc", level: "A", label: "1.1.1 非テキストコンテンツ", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html" },
      { kind: "sc", level: "A", label: "4.1.2 名前・役割・値", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
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
    position: "アイコン単体の意味は標準化されていないことが多く、テキストラベルの併用が原則。アイコン化すべきかを5秒ルールで判断し、再認テスト・記憶テストで実用性を検証すべきという実務指針",
    size: <span><NoData>数値基準なし。</NoData>タッチ操作の対象として十分な大きさを持たせつつ画面領域を節約できる点をアイコンの利点として挙げている。</span>,
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      "アイコンは、タッチ操作の対象として押しやすく、画面領域を節約でき、見慣れた標準的なものであれば素早く認識でき、言語を越えて通用し、見た目の一貫性を高めるという利点を持つ一方、「アイコンの理解は過去の経験に基づく」ため、多くのアイコンには標準化された意味がなく曖昧さを生むとしている。ハンバーガーメニュー(一覧を表す場合もある)やハートアイコン(お気に入り・保存・評価など用途がまちまち)を曖昧さの実例として挙げている。そのため、ほぼすべてのアイコンには意味を補うテキストラベルが必要で、ラベルはホバーなどの操作なしで常に表示すべきだとしている。標準的なアイコンでも、見た目を少し変えた場合などはラベルを付けた方が安全だとしている。",
    exceptions:
      "デザイナーがある機能にふさわしいアイコンを思いつくのに5秒以上かかるなら、その意味をアイコンで効果的に伝えるのは難しいとしている(5秒ルール)。デザインはシンプルかつ図式的に保ち、小さいサイズで潰れるような細かいディテールは避けるべきとしている。競合・プラットフォームの慣習を先に調査し、ユーザーの期待は既存のパターンに従う傾向があるとしている。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、認識性(recognizability)・記憶性(memorability)に関する実務的なユーザビリティ調査に基づく指針。",
    useCases: [
      "意味が標準化されていないアイコンには、常時表示のテキストラベルを併用する(ホバー時のみの表示は避ける)",
      "配備前に再認テスト(アイコンが何を意味するか)・記憶テスト(数週間後も意味を覚えているか)を行う",
      "デザインはシンプル・図式的に保ち、小さいサイズでも潰れないようにする",
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
    illustrationNote: "アイコン単体ではなく常時表示のラベルを併用(概念図・系列識別色)",
  },
];

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
      <svg viewBox="0 0 250 230" style={{ width: "100%", maxWidth: 300 }} role="img" aria-label="Googleのアイコンの24dpグリッド">
        <text x="0" y="14" fontSize="11" fontWeight="700" fill="#2F7D6E" fontFamily={font}>Google ― 24dpのグリッド</text>
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
    </div>
  );
}

const STYLE_ROWS = [
  { k: "考え方", hig: "単純で、すぐに分かる形にする。身近な比喩を使い、アプリの中のアイコンは大きさ・細かさ・線の太さ・視点をそろえる", material: "単純・現代的・親しみやすく、ときに遊び心がある形。細く頼りない線ではなく、くっきり太めに描く。1つのセットの中でスタイルを混ぜない" },
  { k: "形", hig: "非対称の形は、図形の中心ではなく見た目の中心に合わせる(余白を含めた画像にする)。状態は塗り(fill)・斜線(slash)・囲み(enclosed)の形の違いで表す", material: "24dpのグリッドの中、20dpの範囲に描く。基準の形(正方形18dp・円20dp・縦長20×16dp・横長16×20dp)で大きさをそろえる。角の丸みは2dp。スタイルはアウトライン・ラウンド・シャープの3種類" },
  { k: "線の太さ", hig: "ウルトラライトからブラックまでの9段階。San Franciscoの文字の太さと対応し、隣の文字と同じ太さにするのが基本", material: "標準は2dp(太さ400)。100〜700で変えられるが、24dpでは200より細くしない。光学サイズ(20〜48dp)で、大きさが変わっても線の太さが自然に見えるよう自動で調整する" },
  { k: "色", hig: "形は黒と透明で作り、色はシステムが付ける。色の付け方は4つのモード(単色・階層・パレット・マルチカラー)。量の変化には可変カラーを使い、奥行きの表現には使わない", material: "塗り(Fill 0〜1)で未選択と選択を切り替える(例: ナビゲーションバー)。暗い背景の明るいアイコンは太く見えやすいため、グレード-25で細く補正する。色の意味は文化で違う(赤と緑の警告など)" },
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
const A_VISION_BUTTONS = [
  { name: "Mini", h: 28 }, { name: "Small", h: 32 }, { name: "Regular", h: 44 }, { name: "Large", h: 52 }, { name: "Extra large", h: 64 },
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
  let ax = 96;
  const aItems = A_VISION_BUTTONS.map((b) => {
    const d = b.h * k, x = ax, y = 236 - d;
    ax += d + 26;
    return (
      <g key={b.name}>
        <circle cx={x + d / 2} cy={y + d / 2} r={d / 2} fill="#F4DDD3" />
        <path d={starPath(x + d / 2, y + d / 2 + 0.5, d * 0.24)} fill="#C2542A" />
        <text x={x + d / 2} y={252} fontSize="8" fill="#454C78" textAnchor="middle" fontFamily={mono}>{b.h}pt</text>
        <text x={x + d / 2} y={262} fontSize="7.5" fill="#666D93" textAnchor="middle" fontFamily={font}>{b.name}</text>
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
      <text x="0" y="214" fontSize="8.5" fill="#666D93" fontFamily={font}>visionOSの</text>
      <text x="0" y="225" fontSize="8.5" fill="#666D93" fontFamily={font}>ボタン5サイズ</text>
      {aItems}
      <rect x={tx + 60} y={236 - 44 * k} width={44 * k} height={44 * k} fill="none" stroke="#C2542A" strokeDasharray="3 2" />
      <text x={tx + 60 + 22 * k} y={252} fontSize="8" fill="#C2542A" textAnchor="middle" fontFamily={mono}>44pt</text>
      <text x={tx + 60 + 22 * k} y={262} fontSize="7.5" fill="#454C78" textAnchor="middle" fontFamily={font}>押せる範囲の最小</text>
      <rect x={tx + 110} y={236 - 60 * k} width={60 * k} height={60 * k} fill="none" stroke="#C2542A" strokeDasharray="3 2" />
      <text x={tx + 110 + 30 * k} y={252} fontSize="8" fill="#C2542A" textAnchor="middle" fontFamily={mono}>60pt</text>
      <text x={tx + 110 + 30 * k} y={262} fontSize="7.5" fill="#454C78" textAnchor="middle" fontFamily={font}>visionOS</text>
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
    hig: "44×44pt(visionOSは60×60pt)。指・ポインタ・視線・リモコンのどれでも選びやすくするため(Buttons)。Accessibilityのページでは、iOS/iPadOSの既定44×44pt・最小28×28ptという2段階を示している(2025年改訂)。",
    material: "48×48dp。見た目が小さい部品でも、押せる範囲は48dpまで自動で確保される(Jetpack Compose)。",
  },
  {
    label: "部品の大きさの段階",
    hig: "visionOSのボタンは Mini 28 / Small 32 / Regular 44 / Large 52 / Extra large 64pt の5段階。iOS/iPadOSのアイコンボタンの段階は示されていない。",
    material: "アイコンボタンは XS 32 / S 40 / M 56 / L 96 / XL 136dp(容器の高さ)の5段階(M3 Expressive)。",
  },
  {
    label: "アイコンの周りの余白",
    hig: "数値の指定はなし。非対称なアイコンは、見た目の中心が合うよう余白を含めた画像にして中心をそろえる(光学的な中心合わせ)。macOSの書類アイコンは、画像を枠の約80%に収め、約10%の余白を取る。",
    material: "容器の端からアイコンまでの余白が段階ごとに決まっている。標準幅でXS 6 / S 8 / M 16 / L 32 / XL 48dp。さらに狭い(Narrow)・広い(Wide)の3種類の幅がある(例: Sは4 / 8 / 14dp)。",
  },
  {
    label: "並べるときの間隔",
    hig: "visionOSでは、ボタンの中心どうしを60pt以上離す。60pt以上のボタンには、ホバー効果が重ならないよう周りに4ptの余白を取る。",
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
      <span style={styles.glossaryNoteLabel}>メモ</span>
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
const LEAD = "アイコンの大きさ・線の太さなどのスタイルと、意味の伝え方の決まりだ。";
const ABOUT = [
  { k: "目的・役割", v: "小さな絵で操作や内容を伝え、見た目をそろえる" },
  { k: "関わる場面", v: "ツールバーのボタン、ナビゲーションバーの項目、リストの先頭の印" },
  { k: "関連するページ", v: <><PageLink to="/components/actions/button">ボタン</PageLink>、<PageLink to="/components/communication/tooltip">ツールチップ</PageLink>、<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink>、<PageLink to="/components/actions/fab">フローティングアクションボタン</PageLink></> },
];

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
            <span>トークン / ファウンデーション / アイコン</span>
            <span>SPEC No. 044</span>
          </div>

          <h1 style={styles.title}>アイコン(サイズ・スタイル)</h1>
          <SummaryCard
            imageLabel="サイズの目安(概念図)"
            image={<><IconSwatch /></>}
            imageNote={<>同じ形のアイコンでも、系列・文脈によって最適なサイズ・太さ・スタイルは異なる。実寸の基準は各系列の欄を参照。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <section style={{ marginBottom: 40 }}>
            <h2 style={styles.diagramTitle}>アイコンのスタイルの考え方 ― 形・線の太さ・色</h2>
            <p style={styles.diagramNote}>アイコンの描き方を決めているのはAppleとGoogleだ。どちらも<Hl>隣の文字と線の太さ・大きさをそろえる</Hl>ことを求めている。W3Cは形や色を定めず、意味を伝えるアイコンに背景との3:1のコントラスト(1.4.11)と代わりの文字(1.1.1)を求める。NN groupも描き方は定めず、文字のラベルを添えることを勧めている。</p>
            <IconAnatomy />
            <IconStyleTable />
            <p style={styles.diagramNote}>出典: HIG「Icons」「SF Symbols」、Material Design 3「Designing icons」「Applying icons」。</p>
          </section>

          <h2 style={styles.diagramTitle}>Apple・Googleのサイズと余白(スペーシング)の比較</h2>
          <p style={styles.diagramNote}>アイコン本体の大きさ、押せる範囲、部品の大きさの段階、アイコンの周りの余白を比べる。Googleはアイコンボタンの段階ごとに余白まで数値で決めているのに対し、Appleはアイコン自体の大きさを文字に合わせ、押せる範囲(44pt)を中心に定めている。</p>
          <div style={styles.chartCard}>
            <IconSizeChart />
          </div>
          <IconSpecTable />
          <p style={styles.diagramNote}>出典: GoogleはJetpack Compose Material 3のトークン定義(XSmall〜XLargeのIconButtonTokens、押せる範囲の最小48dp)とMaterial Symbolsのガイド、AppleはHIGのButtons・SF Symbols・Iconsページ。</p>

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              Apple・Googleはどちらも<strong>可変的なアイコン体系(SF Symbols / Material Symbols)</strong>を持ち、単一のスタイルではなく複数のウェイト・スタイル・サイズを1つのフォント技術で連続的に切り替えられるようにしている。Appleは<strong>隣接するテキストとのウェイト一致</strong>を重視し、Googleは<strong>optical size軸によるストローク幅の自動最適化</strong>を重視するなど、同じ「可変フォント」的アプローチでも力点が異なる。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、アイコンそのものの見た目ではなく<strong>「意味がちゃんと伝わるか」を3段階(代替テキスト・プログラム的な名前・コントラスト比)で規定</strong>している。特に4.1.2は、アイコンのみのボタンに視覚的なラベルがなくても、支援技術に伝わる名前さえあれば基準を満たせるとしており、Apple・Googleのようなビジュアル面の柔軟性とは別の軸の要求だ。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupの指摘は、Apple・Googleが提供する洗練されたアイコン体系があっても<strong>「アイコン単体の意味は標準化されていないことが多い」</strong>という現実を突いている。5秒ルールや再認・記憶テストといった実務的な検証手法は、W3Cの「プログラム的な名前」という技術要件だけでは解決しない、<strong>視覚的に見ただけで意味が伝わるか</strong>という別の問題を扱っている。
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
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
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
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
