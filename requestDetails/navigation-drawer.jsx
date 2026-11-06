import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / ドロワー/サイドナビ」ページ(旧カテゴリ: Navigation)。
 *
 * 2026-09 カテゴリ変更: 「サイドシート」ページの内容(Google/NN groupが共に
 * Side Sheet/Drawerを近い概念として扱っていること)を踏まえ、ユーザーの了承のもと
 * NavigationカテゴリからContainmentカテゴリへ移動した(ページ内容自体に変更はなし)。
 *
 * 2026-09 訂正(ユーザー提供の公式ドキュメントによる): 当初は検索結果による間接確認に
 * 基づき、Googleの「Navigation drawer」はM3の表現力向上アップデート以降「推奨されなく
 * なった(非推奨)」と記載し、ページ冒頭に警告表示も置いていた。しかし公式ページ本文
 * (MD3_text/navigationDrawer.docx)を直接確認したところ、そのような非推奨の記載は
 * 見当たらなかった。実際には、ブレークポイントに応じてStandard(拡張/大/特大)・
 * Modal(コンパクト/中)を使い分ける、現役の詳細なガイドラインが存在する。誤りだった
 * 非推奨の記載・警告表示・「後継」という表現は削除・訂正した。
 *
 * このページの発見: Appleはそもそも iOS向けにドロワー(隠れたハンバーガーメニュー)の
 * 概念自体を持たず、iPadOS/macOS向けに「常時表示・非モーダルなサイドバー」を提供する
 * のみ。GoogleのNavigation drawerは実在し現役のコンポーネントだが、Nielsen Norman
 * Groupは独自の調査データで「隠れたナビゲーションは発見性・作業速度を悪化させる」と
 * 指摘しており、ベンダーの提供有無とは独立に、隠す設計自体への実務的な注意が必要である。
 *
 * Nielsen Norman Group(Hamburger Menus and Hidden Navigation Hurt UX Metrics)/
 * W3C(WAI-ARIA Dialog Modalパターン)は公式ページ・記事本文を直接取得して確認済み
 * (2026-09)。Google(Material Design 3 Navigation drawer)は、公式ページ本文
 * (navigationDrawer.docx)を確認できたため直接確認済み(2026-09)。Apple(HIG Sidebars)
 * は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、検索結果に
 * よる間接確認(2026-09)。
 */

const DRAWER_SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "該当コンポーネントなし(iPhone向けの隠れたドロワーの指針はない)",
    color: "#C2542A",
    position: <NoData>該当なし</NoData>,
    size: <NoData>該当なし</NoData>,
    colorInfo: <NoData>該当なし</NoData>,
    stance: <NoData>該当なし</NoData>,
    exceptions: <NoData>該当なし</NoData>,
    accessibility: <NoData>該当なし</NoData>,
    useCases: ["該当なし"],
    searchHint: "",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Navigation drawer(Modal)",
    color: "#2F7D6E",
    position:
      "コンパクト・中サイズの画面で、ボタンを押して一時的に開くドロワー。スクリムで後ろの画面を覆う(Modal)。5つ以上の主な行き先、または2階層を超える場合に使う",
    size:
      <span>コンパクト・中サイズのブレークポイントではModal(またはナビゲーションバー/レールへの置き換え)を使うとしている。Web上では画面幅が320 CSSピクセル未満の場合、ドロワーをナビゲーションバーに置き換えるべきとしている。<NoData>ドロワーの幅の数値は未確認。</NoData></span>,
    colorInfo:
      <span>色の値はデザイントークンを通して実装される。選択中の行き先は塗りつぶしアイコン、非選択は枠線アイコンで区別し、アクティブインジケーター(背景図形)で現在表示中のページを示すとしている。<NoData>カラートークンは未確認。</NoData></span>,
    glossary: [
      { term: "Standard / Modal(ドロワー)", desc: "Standardは拡張/大/特大のブレークポイント向けの常時表示(または開閉可能な)ドロワー。Modalはコンパクト/中サイズのブレークポイント向けで、スクリムで背後のコンテンツとの操作を遮断し、画面のレイアウトグリッドには影響を与えない、一時的なドロワー。" },
      { term: "アクティブインジケーター", desc: "現在表示中のページを示す背景図形。選択された行き先には塗りつぶしアイコン、非選択には枠線アイコンを使うことで視覚的に区別する。" },
    ],
    stance:
      "ナビゲーションドロワーは、大型デバイスでUIビューを切り替えるためのコンポーネントで、目的の画面やアプリの機能(アカウント切り替えなど)へのアクセスを提供する。常時表示することも、ナビゲーションメニューアイコンで開閉することもできるとしている。常に1つの行き先がアクティブになっているとしている。最も頻繁に訪れる行き先を上位に表示し、関連する行き先はグループ化すべきとしている。5つ以上の主要な行き先、2階層を超えるナビゲーション階層、関連性のない行き先間を素早く移動したい場合、または大型画面でのナビゲーションレール/ナビゲーションバーの置き換えとして推奨されるとしている。",
    exceptions:
      "ナビゲーションドロワーは、ナビゲーションバーなど他の主要なナビゲーションコンポーネントと併用すべきではなく、製品要件とブレークポイントに応じて単一のナビゲーションコンポーネントを選ぶべきとしている(コンパクト→Navigation bar、中/拡張→Navigation rail、拡張/大/特大→Standardドロワー)。アイコンは全ての行き先に適用するか、全く適用しないかのどちらかにすべきで、一部の行き先にだけ適用するのは避けるべきとしている。",
    accessibility:
      "操作可能(Operable) ― ナビゲーション項目のアクセシビリティラベルは通常、行き先名と同じで、UIテキストが正しくリンクされていれば支援技術がUIテキストに続けて役割を読み上げるとしている。Android Views(MDC-Android)では、より詳細なアクセシビリティラベルの設定や役割の読み上げに対応していないとしている。表示テキストが曖昧な場合(例:「最近使用した項目」)は、アクセシビリティラベルに補足情報を加えるべきとしている。",
    useCases: [
      "5つ以上の主要な行き先、または2階層を超えるナビゲーション階層を持つ製品で使う",
      "コンパクト/中サイズはModal、拡張/大/特大サイズはStandardを使う(他のナビゲーションコンポーネントと併用しない)",
      "アイコンを使う場合は全ての行き先に適用する(一部だけの適用は避ける)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/navigation-drawer/guidelines",
    urlSecondary: [
      { label: "関連: Navigation rail", url: "https://m3.material.io/components/navigation-rail/guidelines" },
      { label: "MDC Android: Navigation drawer(非推奨化の注記)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/NavigationDrawer.md" },
    ],
    confirmedNote: "使用法・Standard/Modalの区分・配置(ブレークポイント別)・シート/スクリム・区切り線・アクティブインジケーター・ラベル/アイコン・レスポンシブレイアウト・インタラクションとスタイル・アクセシビリティラベルの各セクションは2026-09時点で公式ページ本文(m3.material.io「Navigation drawer」のガイドライン)を確認済み。ドロワー幅などのspecs数値は未確認。",
    illustration: () => (
      <svg width="90" height="60" viewBox="0 0 90 60">
        <rect x="0" y="0" width="90" height="60" fill="#171B36" opacity="0.25" />
        <rect x="1" y="1" width="40" height="58" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.4" />
        <rect x="6" y="8" width="30" height="8" rx="4" fill="#2F7D6E" />
        <rect x="6" y="22" width="30" height="6" rx="3" fill="#D6E8E3" />
        <rect x="6" y="32" width="30" height="6" rx="3" fill="#D6E8E3" />
      </svg>
    ),
    illustrationNote: "Modalナビゲーションドロワー(概念図・系列識別色。スクリムで背後を覆う)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Dialog (Modal)パターン / WCAG 3.2.3",
    color: "#A3821F",
    position:
      "「ドロワー」専用の型はなく、後ろを操作できなくするドロワーは、ダイアログ(モーダル)として作る",
    size:
      "ドロワー専用の数値基準はないが、一般的なターゲットサイズ基準が適用される。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求める(どちらも例外あり。詳しくは「ボタン」ページのターゲットサイズの説明を参照)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、閉じるボタンや選択状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしている。",
    glossary: [
      { term: "3.2.3 Consistent Navigation・レベルAA", desc: "複数のページで繰り返し出てくるナビゲーションを、毎回同じ相対的な順番で並べることを求める基準。利用者が自分で並びを変えた場合は除く。" },
    ],
    stance:
      "背後の操作を完全に遮断するモーダルなドロワーには、WAI-ARIAのDialog(Modal)パターンが適切とされている。role=\"dialog\"を持ち、Tab/Shift+Tabでドロワー外にフォーカスが出ないようにし(フォーカストラップ)、Escキーで閉じられるようにし、aria-labelledbyまたはaria-labelでラベル付けし、閲覧可能な閉じるボタン(role=\"button\")を持つべきとしている。aria-modal=\"true\"は、背後のコンテンツへの操作を完全に遮断し、視覚的にも覆っている場合にのみ設定すべきとしている。ドロワーの中身が複数のページで共通のナビゲーションなら、3.2.3(レベルAA)により、どのページで開いても項目を同じ相対的な順番で並べる必要がある(利用者が自分で並びを変えた場合を除く)。",
    exceptions:
      "背後のコンテンツを完全に遮断・視覚的に覆っていない場合は、aria-modal=\"true\"を設定すべきではないとしている。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― フォーカスの閉じ込め・Escで閉じる・ラベル付け(4.1.2、2.1.1)が関わる。3.2.3は「理解可能(Understandable)」の予測可能性(3.2)に関わる。",
    useCases:
      [
      "モーダル(背後を遮断する)ドロワーにはDialog(Modal)パターンを使う",
      "背後を完全に遮断・視覚的に覆う場合のみaria-modal=\"true\"を設定する",
      "どのページで開いても、ドロワーの項目を同じ順番に並べる(3.2.3)",
    ],
    searchHint: "Tab and Shift + Tab do not move focus",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    urlSecondary: [
      { label: "3.2.3 Consistent Navigation", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html" },
    ],
    confirmedNote: "3.2.3はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="90" height="60" viewBox="0 0 90 60">
          <rect x="1" y="1" width="40" height="58" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="21" y="34" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">dialog?</text>
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>モーダルか常時表示かで役割が変わる</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、モーダル/非モーダルで異なる役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Hamburger Menus and Hidden Navigation Hurt UX Metrics",
    color: "#7A4F7E",
    position: "隠れたナビゲーション(ドロワー)は発見性・作業速度・満足度の指標を悪化させるという、調査データに基づく指針",
    size: "モバイルでは、ナビゲーション項目が4個以下なら常時表示すべきとしている。5個以上(4個を超える)の場合はやむを得ず隠す形になるが、その場合も重要な情報へのページ内リンクを併設すべきとしている。",
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      "調査によれば、メインナビゲーションを隠すとコンテンツの発見性はほぼ半分に低下し、デスクトップでは作業時間が39%以上、モバイルでは15%遅くなるとしている。隠れたナビゲーションは常時表示・併用型と比べて21%難しいと感じられ、実際の利用率も低い(デスクトップで27% vs 常時表示/併用型の48〜50%)としている。原因として、アイコンの視認性の低さ・中身が予測できないこと・展開の手間・実装の不統一・パターンとしての不慣れさの5点を挙げている。",
    exceptions:
      "デスクトップのUIでは、ハンバーガーアイコンのような隠れたナビゲーションを使うべきではないとし、主要な選択肢は常に見える形で表示すべきとしている。モバイルでは項目が4個以下なら見える形にすべきが、4個を超える場合はやむを得ず隠す形も許容され、その際は重要な情報へのページ内リンクを補うべきとしている。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際の利用データ(発見性・作業時間・満足度)に基づく調査結果。",
    useCases: [
      "デスクトップでは隠れたナビゲーションを避け、主要な選択肢を常に見える形にする",
      "モバイルで項目が4個以下なら見える形にする",
      "モバイルで4個を超えて隠す場合は、重要な情報へのページ内リンクを併設する",
    ],
    searchHint: "Discoverability is cut almost in half",
    url: "https://www.nngroup.com/articles/hamburger-menus/",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <line x1="8" y1="13" x2="32" y2="13" stroke="#7A4F7E" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="20" x2="32" y2="20" stroke="#7A4F7E" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="27" x2="32" y2="27" stroke="#7A4F7E" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>発見性・速度の低下が調査で確認されている</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、系列識別色で図示(調査結果に基づく使い分けの指針)",
  },
];

const RAIL_SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Sidebars(iPadOS・macOS)",
    color: "#C2542A",
    position:
      "iPad・Macで、アプリの主な領域への移動を、画面の脇に常に表示する(折りたたむこともできる)",
    size:
      <NoData>数値は未確認</NoData>,
    colorInfo: <span><NoData>記載なし。</NoData>macOSでは選択中の項目のハイライトに角丸のスタイルを使うとしている。</span>,
    stance:
      "サイドバーは、アプリ内のナビゲーションを可能にし、アプリの主要な領域・コレクションへの素早いアクセスを提供するもので、ほぼ常にスプリットビューの1次(プライマリ)ペインに表示されるとしている。サイドバーで項目を選ぶと、2次(セカンダリ)ペインにその項目の詳細が表示される。iPadOSではタブバーの代わりにサイドバーの使用を検討すべきとしており、多くの項目を表示できるためナビゲーションを効率化できるとしている。項目のカスタマイズや、サイドバー自体を隠してコンテンツ領域を広げる操作も許可すべきとしている。macOSでは、サイドバー(ソースリストとも呼ばれる)はウィンドウの全高に及ぶとしている。",
    exceptions:
      "いわゆるハンバーガーメニュー型の隠れたドロワーは勧めておらず、iPadOS・macOSでは、常に表示するか折りたためる、モーダルではないサイドバーを基本にしている。",
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "iPad/Macで、多くの項目を持つ主要なナビゲーションに使う",
      "iPadOSではタブバーの代わりに検討する",
      "項目のカスタマイズや、サイドバー自体を隠す操作を許可する",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/sidebars",
    confirmedNote: "公式ページ本文はSPAのため直接確認できておらず、検索結果による間接確認(2026-09)。iOS向けの「隠れたドロワー」概念自体が見当たらない点も、複数の関連ページを確認した上での間接的な結論。",
    pending: true,
    illustration: () => (
      <svg width="90" height="60" viewBox="0 0 90 60">
        <rect x="1" y="1" width="34" height="58" fill="#F0DACB" stroke="#C2542A" strokeWidth="1.2" />
        <rect x="3" y="6" width="30" height="8" rx="2" fill="#C2542A" />
        <rect x="3" y="18" width="30" height="6" rx="2" fill="#FFFFFF" />
        <rect x="3" y="28" width="30" height="6" rx="2" fill="#FFFFFF" />
        <rect x="38" y="1" width="51" height="58" fill="#FFFFFF" stroke="#E1E3F0" strokeWidth="1" />
      </svg>
    ),
    illustrationNote: "常時表示のサイドバー(概念図・系列識別色。左が常時表示のナビゲーション、右が詳細ペイン)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Navigation rail(折りたたみ型・展開型)",
    color: "#2F7D6E",
    position: "中くらい以上の画面で、主な行き先を画面の脇に常に表示する。折りたたみ型と、ドロワーの代わりになる展開型がある",
    size: "幅96dp(M3 Expressive。以前は80dp)、項目の最小の高さ64dp(以前は60dp)。",
    colorInfo: <span>M3 Expressiveで、縦に並ぶ項目の選択中のラベルの色が「on surface variant」から「secondary」に変わった。<NoData>カラートークンの詳細は未確認。</NoData></span>,
    stance: <span>ナビゲーションレールは、中くらいの画面でUIの画面を切り替えるための部品。M3 Expressiveで、<Hl>展開できるようになり、展開型がナビゲーションドロワーの代わり</Hl>とされた。展開型は非モーダルで、折りたたみ型に戻せる。M3の本文では、中・拡張のブレークポイントではナビゲーションレール、拡張・大・特大ではStandard(常時表示)のドロワーを使うとしている。</span>,
    exceptions: "ナビゲーションドロワーは、ナビゲーションバーなど他の主要なナビゲーションと併用せず、画面の大きさに合わせて1つを選ぶ(コンパクト→ナビゲーションバー、中・拡張→ナビゲーションレール、拡張・大・特大→Standardドロワー)。",
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "タブレットやPCで、主な行き先を画面の脇に常に表示する",
      "行き先が多いときは、展開型のナビゲーションレールを使う(ドロワーの代わり)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/navigation-rail/overview",
    urlSecondary: [
      { label: "MDC Android: Navigation rail(M3 Expressiveの変更点)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/NavigationRail.md#m3-expressive" },
      { label: "Navigation drawer(Standard)", url: "https://m3.material.io/components/navigation-drawer/guidelines" },
    ],
    confirmedNote: "Material Components for AndroidのNavigation railのドキュメント本文を直接取得して確認(2026-11)。",
    illustration: () => (
      <div style={{ display: "flex", width: 110, height: 60, border: "1px solid #E1E3F0", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: 22, background: "#DDEFEA", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, paddingTop: 6 }}>
          {[0, 1, 2, 3].map((i) => (<div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: i === 0 ? "#2F7D6E" : "#9ECFC4" }} />))}
        </div>
        <div style={{ flex: 1, background: "#FFFFFF" }} />
      </div>
    ),
    illustrationNote: "折りたたみ型のナビゲーションレール(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Landmark Regions(navigation)/ WCAG 3.2.3",
    color: "#A3821F",
    position: "常に表示するサイドナビは、navigationランドマークとして作る",
    size: "専用の数値基準はないが、一般的なターゲットサイズ基準が適用される。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求める(どちらも例外あり)。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、選択状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしている。",
    glossary: [
      { term: "3.2.3 Consistent Navigation・レベルAA", desc: "複数のページで繰り返し出てくるナビゲーションを、毎回同じ相対的な順番で並べることを求める基準。利用者が自分で並びを変えた場合は除く。" },
    ],
    stance: "Appleのサイドバーのような、常に表示するモーダルではないナビゲーションは、ダイアログではなく、navigationランドマークとして扱うのが適切と考えられる(AI解釈)。複数のページで共通のナビゲーションなら、3.2.3(レベルAA)により、どのページでも項目を同じ相対的な順番で並べる必要がある。",
    exceptions: <NoData>記載なし</NoData>,
    accessibility: "知覚可能(Perceivable)・理解可能(Understandable) ― ランドマークで領域の役割を伝えること(1.3.1)と、ナビゲーションの並びをそろえること(3.2.3)が関わる。",
    useCases: [
      "常に表示するサイドナビは、nav要素(navigationランドマーク)にする",
      "どのページでも、項目を同じ順番に並べる(3.2.3)",
    ],
    searchHint: "navigation",
    url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
    urlSecondary: [
      { label: "3.2.3 Consistent Navigation", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html" },
    ],
    illustrationNote: "視覚デザインの規定はなく、ランドマークの考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Left-Side Vertical Navigation on Desktop",
    color: "#7A4F7E",
    position: "項目の多いメインナビゲーションを、デスクトップでは左側に縦に並べて常に見せる",
    size: <span><NoData>数値基準なし。</NoData>トップの項目が7〜9個を超えても、縦型なら収められるとしている。</span>,
    colorInfo: "文字や背景の色・境界線で、ナビゲーションが目立つようにするよう勧めている(数値の基準はない)。",
    stance: <span>縦型のナビゲーションは、<Hl>多くのカテゴリを収められ、項目が増えても対応しやすい</Hl>。縦のリストは横並びより目で探しやすく、モバイルにも移しやすい。一方で横型より場所をとり、内容に使える面積が減るとしている。</span>,
    exceptions: <span><Hl>左側に置き、目立つデザインにする</Hl>。縦と横に同じメニューを重ねて置かない。<Hl>アイコンだけにして文字を隠さない</Hl>。長いメニューでは、重要でない項目を下に置く。</span>,
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、見つけやすさ(情報設計)の観点からの設計指針。",
    useCases: [
      "カテゴリが多い、または増えていくサイトのメインナビゲーションに使う",
      "デスクトップでは隠さず、左側に縦に並べて見せる",
      "項目はアイコンだけにせず、文字のラベルを付ける",
    ],
    searchHint: "Guidelines for Usable Vertical Navigation",
    url: "https://www.nngroup.com/articles/vertical-nav/",
    confirmedNote: "記事本文を直接取得して確認しました(2026-11)。",
    illustration: () => (
      <div style={{ display: "flex", width: 110, height: 60, border: "1px solid #E1E3F0", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: 40, background: "#EEE3EE", display: "flex", flexDirection: "column", gap: 4, padding: "6px 5px" }}>
          {[0, 1, 2, 3, 4].map((i) => (<div key={i} style={{ height: 4, borderRadius: 2, background: i === 0 ? "#7A4F7E" : "#C9AFCB", width: i % 2 ? "70%" : "90%" }} />))}
        </div>
        <div style={{ flex: 1, background: "#FFFFFF" }} />
      </div>
    ),
    illustrationNote: "左側の縦型ナビゲーション(概念図・系列識別色)",
  },
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
      <span style={styles.glossaryNoteLabel}>メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function DrawerSwatch() {
  return (
    <div style={{ display: "flex", width: 220, margin: "0 auto", border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden" }}>
      <div style={{ width: 84, background: "#3A4FCF", padding: "10px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ height: 8, borderRadius: 2, background: "#FFFFFF" }} />
        <div style={{ height: 6, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
        <div style={{ height: 6, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
        <div style={{ height: 6, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
      </div>
      <div style={{ flex: 1, background: "#F8F9FD" }} />
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の横に、アプリの行き先の一覧を出すナビゲーションです。スマホで一時的に開く「ナビゲーションドロワー」と、タブレット・PCで常に表示する「ナビゲーションレール/サイドバー」を扱います。";
const ABOUT = [
  { k: "目的・役割", v: "行き先が多いアプリで、主な場所の一覧を見せて移動できるようにする" },
  { k: "よく使われる場面", v: "スマホアプリの≡メニュー(ドロワー)、メールアプリのフォルダ一覧や管理画面の左のメニュー(レール/サイドバー)" },
  { k: "似た部品との違い", v: <>主な場所が3〜5か所なら<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink>、補助の情報や操作を出すのは<PageLink to="/components/containment/side-sheet">サイドシート</PageLink></> },
];

/* 4系列の比較(カード・比較表)。ドロワーとレール/サイドバーで同じ形を2回使う */
function Comparison({ SOURCES }) {
  return (
    <>
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
                  {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                  <div style={styles.sourceFootRow}>
                    {s.searchHint && (
                      <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                    )}
                    {s.url && <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>}
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
                  <div style={styles.labelCell}>リンク</div>
                  {SOURCES.map((s) => (
                    <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                      {s.url ? <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a> : <NoData>該当なし</NoData>}
                      {s.urlSecondary && s.urlSecondary.map((sl) => (
                        <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                      ))}
                      {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                    </div>
                  ))}
                  <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>メモ</div>
                  {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <NoData>該当なし</NoData>}</div>))}
                </div>
              </div>
            </div>

    </>
  );
}

export default function NavigationDrawerPage() {
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
        <SidebarNav currentPath="/components/containment/drawer" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ドロワー/サイドナビ</span>
            <span>SPEC No. 016</span>
          </div>

          <h1 style={styles.title}>ドロワー/サイドナビ</h1>
          <SummaryCard
            imageLabel="コンポーネントイメージ(常時表示型の例)"
            image={<><DrawerSwatch /></>}
            imageNote={<>画面の脇に、主要なナビゲーション項目を並べた領域。常時表示する形と、一時的に開閉するモーダル形の2系統がある。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <div style={styles.warningBox}>
            <div style={styles.warningLabel}>⚠ 重要な注記(2026-10、Google/Material Design 3)</div>
            <p style={styles.warningText}>
              Googleの公式ドキュメント(MDC AndroidのNavigation drawerのページ)によると、<strong>ナビゲーションドロワーはM3 Expressiveのアップデートで非推奨になりつつあり、代わりに「展開ナビゲーションレール(expanded navigation rail)」を使う</strong>とされています。このページのGoogle欄は、それ以前のM3の本文に基づく内容です。<strong>新しく作る場合は、展開ナビゲーションレールを検討</strong>してください(下記Google欄の「MDC Android: Navigation drawer」リンクを参照)。他の3系列(Apple・W3C・Nielsen Norman Group)の情報には影響しません。
            </p>
          </div>



          <h2 style={styles.diagramTitle}>2つの種類と使用シーン</h2>
          <div style={{ overflowX: "auto", marginBottom: 40 }}>
            <table style={styles.kindTable}>
              <thead>
                <tr>{["種類", "主な画面", "表示のしかた", "向いている場面", "各系列の呼び名"].map((h) => (<th key={h} style={styles.kindTh}>{h}</th>))}</tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...styles.kindTd, fontWeight: 700 }}>① ナビゲーションドロワー</td>
                  <td style={styles.kindTd}>スマホなど狭い画面</td>
                  <td style={styles.kindTd}>ボタン(≡)を押して一時的に開く。後ろの画面を覆う(モーダル)</td>
                  <td style={styles.kindTd}>行き先が多く、ナビゲーションバー(3〜5か所)に収まらないとき</td>
                  <td style={styles.kindTd}>Apple: <NoData>該当なし</NoData> / Google: Modal navigation drawer / W3C: ダイアログ(モーダル)として作る / NN group: 隠れたナビゲーション(ハンバーガーメニュー)</td>
                </tr>
                <tr>
                  <td style={{ ...styles.kindTd, fontWeight: 700 }}>② ナビゲーションレール/サイドバー</td>
                  <td style={styles.kindTd}>タブレット・PCなど広い画面</td>
                  <td style={styles.kindTd}>画面の脇に常に表示する(モーダルではない)。折りたためる</td>
                  <td style={styles.kindTd}>広い画面で、主な行き先を常に見せたいとき</td>
                  <td style={styles.kindTd}>Apple: Sidebars / Google: Navigation rail(折りたたみ型・展開型) / W3C: navigationランドマーク / NN group: 左側の縦型ナビゲーション</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              使い分けの結論は、<strong>隠すナビゲーションは見つけにくいので、広い画面では常に表示し(ナビゲーションレール/サイドバー)、狭い画面で項目が多いときだけ隠す(ナビゲーションドロワー)</strong>ことです。NN groupはモバイルでも、トップの項目が4個以下なら見える形で表示するよう勧めています。
            </p>
            <p style={styles.synthesisText}>
              スマホのドロワーは、<strong>Appleには該当する指針がなく</strong>、GoogleはModalのナビゲーションドロワーを持っています。ただしGoogleは<strong>M3 Expressiveで、ナビゲーションドロワーを非推奨にし、展開型のナビゲーションレールに置き換える</strong>としています。NN groupは、隠れたナビゲーションは<strong>見つけてもらえる割合をほぼ半分にし、作業時間を最大39%長くする</strong>と報告しています。
            </p>
            <p style={styles.synthesisText}>
              広い画面では、Appleのサイドバー、Googleのナビゲーションレール、NN groupの左側の縦型ナビゲーションが、<strong>主な行き先を画面の脇に常に表示する</strong>点で一致しています。NN groupは、アイコンだけにせず文字のラベルを付けること、左側に置いて目立たせることも勧めています。
            </p>
            <p style={styles.synthesisText}>
              W3Cは「ドロワー」という単一の型を持たず、<strong>後ろを覆うドロワーはダイアログ(モーダル)、常に表示するものはnavigationランドマーク</strong>として作ります。どちらでも、複数のページで項目を同じ順番に並べる(3.2.3)ことが求められます。
            </p>
          </div>
          <h3 id="drawer" style={styles.subTitle}>① ナビゲーションドロワー(主にスマホ)</h3>
          <Comparison SOURCES={DRAWER_SOURCES} />

          <h3 id="rail" style={styles.subTitle}>② ナビゲーションレール/サイドバー(主にタブレット・PC)</h3>
          <Comparison SOURCES={RAIL_SOURCES} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["ナビゲーション"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11(③本人レビューNo.049で、ドロワーとレール/サイドバーに分けて比較。Googleのナビゲーションレール、NN groupの縦型ナビゲーションの記事を追加し、本文を直接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: ①ドロワーは、GoogleのNavigation drawer、W3CのAPG Dialog(Modal)パターン、NN groupのハンバーガーメニューの記事。②レール/サイドバーは、AppleのSidebars、GoogleのNavigation rail(Material Components for Androidの説明を併記)、W3CのAPG Landmark Regions、NN groupの縦型ナビゲーションの記事へのリンクです。
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
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  subTitle: { fontSize: 14, fontWeight: 700, color: "#171B36", margin: "8px 0 12px", scrollMarginTop: 16 },
  kindTable: { width: "100%", minWidth: 720, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457" },
  kindTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  kindTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
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
  warningBox: { background: "#FFF6E5", borderLeft: "4px solid #B8860B", padding: "14px 18px", marginBottom: 20, borderRadius: "0 4px 4px 0" },
  warningLabel: { fontSize: 12.5, fontWeight: 700, color: "#8A6210", marginBottom: 6, letterSpacing: 0.2 },
  warningText: { fontSize: 12.5, lineHeight: 1.75, color: "#5A4419", margin: 0 },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
