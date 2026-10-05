import React from "react";
import SidebarNav from "./sidebar-nav";

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

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Sidebars(iPadOS/macOS)",
    color: "#C2542A",
    position: "常時表示・折りたたみ可能な、アプリの主要領域へのナビゲーション(iPadOS/macOS向け。iOS向けの「ドロワー」概念は見当たらない)",
    size: "具体的な幅などの数値は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。macOSでは選択中の項目のハイライトに角丸のスタイルを使うとしています。",
    stance:
      "サイドバーは、アプリ内のナビゲーションを可能にし、アプリの主要な領域・コレクションへの素早いアクセスを提供するもので、ほぼ常にスプリットビューの1次(プライマリ)ペインに表示されるとしています。サイドバーで項目を選ぶと、2次(セカンダリ)ペインにその項目の詳細が表示されます。iPadOSではタブバーの代わりにサイドバーの使用を検討すべきとしており、多くの項目を表示できるためナビゲーションを効率化できるとしています。項目のカスタマイズや、サイドバー自体を隠してコンテンツ領域を広げる操作も許可すべきとしています。macOSでは、サイドバー(ソースリストとも呼ばれる)はウィンドウの全高に及ぶとしています。",
    exceptions:
      "iOS(iPhone)向けの明確なサイドバー/ドロワーガイダンスは見当たりません。AppleのHIGは、いわゆる「ハンバーガーメニュー」型の隠れたドロワーそのものを積極的に推奨しておらず、iPadOS/macOSでは常時表示または折りたたみ可能な、モーダルではない永続的なサイドバーという形を基本としています。",
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
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
    doc: "Material Design 3 ― Navigation drawer(Standard / Modal)",
    color: "#2F7D6E",
    position: "5つ以上の主要な行き先、または2階層を超える場合に使う。Standard(常時表示)とModal(一時表示)の2種類",
    size:
      "コンパクト/中サイズのブレークポイントではModal(またはNavigation bar/レールへの置き換え)、拡張/大/特大のブレークポイントではStandardを使うとしています。Web上では画面幅が320 CSSピクセル未満の場合、アクセシビリティ確保のためドロワーをNavigation barに置き換えるべきとしています。ドロワー自体の幅の具体的なdp数値は確認できていません。",
    colorInfo:
      "色の値はデザイントークンを通して実装されます。選択中の行き先は塗りつぶしアイコン、非選択は枠線アイコンで区別し、アクティブインジケーター(背景図形)で現在表示中のページを示すとしています。具体的なカラートークン名は確認できていません。",
    glossary: [
      { term: "Standard / Modal(ドロワー)", desc: "Standardは拡張/大/特大のブレークポイント向けの常時表示(または開閉可能な)ドロワー。Modalはコンパクト/中サイズのブレークポイント向けで、スクリムで背後のコンテンツとの操作を遮断し、画面のレイアウトグリッドには影響を与えない、一時的なドロワー。" },
      { term: "アクティブインジケーター", desc: "現在表示中のページを示す背景図形。選択された行き先には塗りつぶしアイコン、非選択には枠線アイコンを使うことで視覚的に区別する。" },
    ],
    stance:
      "ナビゲーションドロワーは、大型デバイスでUIビューを切り替えるためのコンポーネントで、目的の画面やアプリの機能(アカウント切り替えなど)へのアクセスを提供します。常時表示することも、ナビゲーションメニューアイコンで開閉することもできるとしています。常に1つの行き先がアクティブになっているとしています。最も頻繁に訪れる行き先を上位に表示し、関連する行き先はグループ化すべきとしています。5つ以上の主要な行き先、2階層を超えるナビゲーション階層、関連性のない行き先間を素早く移動したい場合、または大型画面でのナビゲーションレール/ナビゲーションバーの置き換えとして推奨されるとしています。",
    exceptions:
      "ナビゲーションドロワーは、ナビゲーションバーなど他の主要なナビゲーションコンポーネントと併用すべきではなく、製品要件とブレークポイントに応じて単一のナビゲーションコンポーネントを選ぶべきとしています(コンパクト→Navigation bar、中/拡張→Navigation rail、拡張/大/特大→Standardドロワー)。アイコンは全ての行き先に適用するか、全く適用しないかのどちらかにすべきで、一部の行き先にだけ適用するのは避けるべきとしています。",
    accessibility:
      "操作可能(Operable) ― ナビゲーション項目のアクセシビリティラベルは通常、行き先名と同じで、UIテキストが正しくリンクされていれば支援技術がUIテキストに続けて役割を読み上げるとしています。Android Views(MDC-Android)では、より詳細なアクセシビリティラベルの設定や役割の読み上げに対応していないとしています。表示テキストが曖昧な場合(例:「最近使用した項目」)は、アクセシビリティラベルに補足情報を加えるべきとしています。",
    useCases: [
      "5つ以上の主要な行き先、または2階層を超えるナビゲーション階層を持つ製品で使う",
      "コンパクト/中サイズはModal、拡張/大/特大サイズはStandardを使う(他のナビゲーションコンポーネントと併用しない)",
      "アイコンを使う場合は全ての行き先に適用する(一部だけの適用は避ける)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/navigation-drawer/guidelines",
    urlSecondary: [{ label: "関連: Navigation rail", url: "https://m3.material.io/components/navigation-rail/guidelines" }],
    confirmedNote: "使用法・Standard/Modalの区分・配置(ブレークポイント別)・シート/スクリム・区切り線・アクティブインジケーター・ラベル/アイコン・レスポンシブレイアウト・インタラクションとスタイル・アクセシビリティラベルの各セクションは2026-09時点で公式ページ本文を直接確認済み(MD3_text/navigationDrawer.docx)。ドロワー幅などのspecs数値は未確認。",
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
    doc: "WAI-ARIA Dialog(Modal)パターン / Landmark Regions(常時表示実装の場合) / WCAG 3.2.3",
    color: "#A3821F",
    position: "「ドロワー」専用のARIAパターンは存在せず、モーダルか常時表示かで適用すべきパターンが変わる",
    size:
      "ドロワー専用の数値基準はありませんが、一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求めます。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、閉じるボタンや選択状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    glossary: [
      { term: "3.2.3 Consistent Navigation・レベルAA", desc: "複数のページで繰り返し出てくるナビゲーションを、毎回同じ相対的な順番で並べることを求める基準。利用者が自分で並びを変えた場合は除く。" },
    ],
    stance:
      "背後の操作を完全に遮断するモーダルなドロワーには、WAI-ARIAのDialog(Modal)パターンが適切とされています。role=\"dialog\"を持ち、Tab/Shift+Tabでドロワー外にフォーカスが出ないようにし(フォーカストラップ)、Escキーで閉じられるようにし、aria-labelledbyまたはaria-labelでラベル付けし、閲覧可能な閉じるボタン(role=\"button\")を持つべきとしています。aria-modal=\"true\"は、背後のコンテンツへの操作を完全に遮断し、視覚的にも覆っている場合にのみ設定すべきとしています。一方、Appleのサイドバーのような常時表示・非モーダルな実装であれば、Dialogパターンではなくnavigationランドマークとして扱うのが適切と考えられます。ドロワーの中身が複数のページで共通のナビゲーションなら、3.2.3(レベルAA)により、どのページで開いても項目を同じ相対的な順番で並べる必要があります(利用者が自分で並びを変えた場合を除く)。",
    exceptions:
      "背後のコンテンツを完全に遮断・視覚的に覆っていない場合は、aria-modal=\"true\"を設定すべきではないとしています。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― モーダルの場合はフォーカストラップ・Escキー・ラベル付け(4.1.2、2.1.1)が、非モーダルの場合はランドマークとしての識別が関わります。3.2.3は「理解可能(Understandable)」の予測可能性(3.2)に関わります。",
    useCases: [
      "モーダル(背後を遮断する)ドロワーにはDialog(Modal)パターンを使う",
      "常時表示の非モーダルなサイドバーにはnavigationランドマークを使う",
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
    size: "モバイルでは、ナビゲーション項目が4個以下なら常時表示すべきとしています。5個を超える場合はやむを得ず隠す形になりますが、その場合も重要な情報へのページ内リンクを併設すべきとしています。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "調査によれば、メインナビゲーションを隠すとコンテンツの発見性はほぼ半分に低下し、デスクトップでは作業時間が39%以上、モバイルでは15%遅くなるとしています。隠れたナビゲーションは常時表示・併用型と比べて21%難しいと感じられ、実際の利用率も低い(デスクトップで27% vs 常時表示/併用型の48〜50%)としています。原因として、アイコンの視認性の低さ・中身が予測できないこと・展開の手間・実装の不統一・パターンとしての不慣れさの5点を挙げています。",
    exceptions:
      "デスクトップのUIでは、ハンバーガーアイコンのような隠れたナビゲーションを使うべきではないとし、主要な選択肢は常に見える形で表示すべきとしています。モバイルでは項目が4個以下なら見える形にすべきですが、4個を超える場合はやむを得ず隠す形も許容され、その際は重要な情報へのページ内リンクを補うべきとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際の利用データ(発見性・作業時間・満足度)に基づく調査結果です。",
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
          <p style={styles.subtitle}>4つのガイドラインが、画面の脇に現れるナビゲーションをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(常時表示型の例)</span>
            <DrawerSwatch />
            <p style={styles.swatchNote}>画面の脇に、主要なナビゲーション項目を並べた領域。常時表示する形と、一時的に開閉するモーダル形の2系統がある。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページで最も重要な訂正は、<strong>Googleの「Navigation drawer」がM3で非推奨になったという、以前の間接確認に基づく記載が誤りだった</strong>ことです。公式ページ本文を直接確認したところ、拡張/大/特大のブレークポイントではStandard、コンパクト/中サイズではModalを使うという、現役の詳細なガイドラインが存在することが分かりました。
            </p>
            <p style={styles.synthesisText}>
              一方でAppleは、<strong>iOS向けに「隠れたドロワー」の概念自体を持たず</strong>、iPadOS/macOS向けの常時表示サイドバーのみを提供します。Googleとは異なる形ですが、両社とも一時的に「隠す」タイプのナビゲーションには慎重、という点では共通しています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは調査データで<strong>「隠れたナビゲーションは発見性をほぼ半減させ、作業時間を最大39%遅くする」</strong>と指摘しています。Googleが現役でNavigation drawerを提供している以上、これは特定ベンダーの動向というより、<strong>「隠す」設計そのものに内在するリスク</strong>として捉えるべき指摘です。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、<strong>「ドロワー」という単一のARIAパターンを持たず、モーダルか常時表示かで適用すべきパターンが変わる</strong>としています。Googleの「Modal(コンパクト/中サイズ)/Standard(拡張/大/特大)」という2区分は、この「モーダルか常時表示か」というアクセシビリティ上の分岐とほぼ対応しており、実装判断の軸として実務上参考になります。
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
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
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
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
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

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["ナビゲーション"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3C・NN group・Googleとも本文確認済み。Appleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはSidebarsページへのリンクです。WCAGはWAI-ARIA Authoring Practices(Dialog Modalパターン)、NN groupは記事ページ単位です。Googleは最新版(M3)の公式ページ(Navigation drawer)へリンクしており本文は確認済みですが、ドロワー幅などのspecs数値はまだ確認できていません。関連コンポーネント「Navigation rail」へのリンクも併記しています。
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
};
