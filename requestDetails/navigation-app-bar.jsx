import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Navigation / アプリバー」ページ(旧ページ名「トップバー」)。
 *
 * 2026-09 改称の経緯: 当初「トップバー」という名称で作成したが、Googleが2025年5月の
 * M3 Expressiveアップデートで、対応コンポーネントの名称を「トップアプリバー(Top app
 * bar)」から「アプリバー(App bar)」に変更したことが判明。MD2→MD3移行時点ではなく
 * M3 Expressive時点の改称だが、旧称を引きずった「トップバー」という表現は現行の呼び方と
 * ずれるため、ページ名・パスを「アプリバー」に変更した(旧パス /components/navigation/
 * top-bar → 新パス /components/navigation/app-bar)。
 *
 * 同時に、ユーザー提供の公式ドキュメント(MD3_text/appbar.docx)によりGoogle欄を
 * 直接確認済みの内容に全面更新。検索の入り口となる「検索アプリバー」バリエーションは
 * 記載量・注意点が多く、かつApple/W3C/Nielsen Norman Groupに直接対応する概念がないため、
 * 4系列比較表には含めず、ページ末尾にGoogle単独の専用セクションとして切り出した。
 *
 * W3C(WAI-ARIA banner landmark)/ Nielsen Norman Group(Sticky Headers)は
 * 公式ページ・記事本文を直接取得して確認済み(2026-09)。Apple(HIG Toolbars、
 * 旧Navigation Bars)は「ナビゲーションバー」ページのコラムで検索結果により
 * 間接確認済みの内容を流用。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Toolbars(旧「Navigation Bars」の内容を含む)",
    color: "#C2542A",
    position: "階層構造を1段ずつ「掘り下げる」ナビゲーションのための上部バー。戻るボタンを含み、遷移先のタイトルを示す",
    size:
      "具体的な高さ(pt数値)は確認できていません。バー内の各項目には、他のタップ可能要素と同じ最小44×44ptのヒットターゲット基準が適用されると考えられます。項目を入れすぎると、それぞれを見分けてタップすることが難しくなるとしています。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "この上部バーは、階層構造を1段ずつ「掘り下げる」ナビゲーションのためのもので、戻るボタンは常にバーの左上に置かれ、そのラベルは遷移元の画面タイトルを示すとしています。「深い」コンテンツほど右側にあるという空間的な比喩を、プッシュ遷移で表現するとしています。よく使うコマンド・コントロール・検索へのアクセスを提供する、より一般的な「ツールバー」の一種としても位置づけられています。",
    exceptions:
      "項目を入れすぎると、それぞれを見分けて操作することが難しくなるため、項目数は絞るべきとしています。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。一般的なタップ領域基準(44×44pt)がここにも適用されると考えられます。",
    useCases: [
      "階層構造を1段ずつ掘り下げるナビゲーションに使う(戻るボタンで1段戻る)",
      "現在の画面タイトルを示し、よく使うコマンド・操作へのアクセスを提供する",
      "項目数を絞り、それぞれを見分けやすくする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/toolbars",
    confirmedNote: "「Toolbars」ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。旧「Navigation Bars」ページのURLは現在このページへ統合・リダイレクトされています。「ナビゲーションバー」ページで一度コラムとしてまとめた内容と同一の一次情報です。",
    pending: true,
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <path d="M12 8l-5 5 5 5" fill="none" stroke="#C2542A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="60" y="16" fontSize="9" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">画面タイトル</text>
      </svg>
    ),
    illustrationNote: "戻るボタンと画面タイトルを持つ上部バー(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― App bar(2025年5月改称、旧「Top app bar」)",
    color: "#2F7D6E",
    position: "画面上部でページの内容・主要操作・ナビゲーション操作(戻る/メニューなど)を示すバー。小型・中型フレキシブル・大型フレキシブルに加え、検索の入り口となる検索アプリバーの4系統を持つ",
    size:
      "具体的な高さのdp数値は確認できていませんが、M3 Expressiveのアップデートで全体の高さが従来より低くなったとしています。中型・大型の「ベースライン」変異体は非推奨となり、複数行の見出しに対応しつつ高さを抑えた「中型フレキシブル」「大型フレキシブル」への置き換えが案内されています。検索アプリバーの詳細サイズは本ページ末尾の専用セクションを参照してください。",
    colorInfo:
      "色の値はデザイントークン経由で実装するとしています。すべての変異体が同じ色の役割を共有し、スクロール時にはコンテナ色をサーフェスコンテナ色に変えて背景コンテンツとの分離を示すか、逆にコンテナを透明にしてボタンをコンテンツの上に浮かせるか、いずれかの手法を選べるとしています。",
    glossary: [
      { term: "小型 / 中型フレキシブル / 大型フレキシブル", desc: "現行(M3 Expressive)で推奨される3つの高さバリエーション。中型・大型は複数行の見出し・字幕・画像など、より柔軟な要素配置に対応する。" },
      { term: "ベースライン中型・大型(非推奨)", desc: "M3 Expressive以前の中型・大型アプリバー。現在は非推奨となり、中型フレキシブル・大型フレキシブルへの置き換えが案内されている。" },
    ],
    stance:
      "アプリバーは、ページに関する情報・主要な操作・「戻る」「メニュー」などのナビゲーション操作を画面上部にまとめて示すコンポーネントだとしています。内容は状況に応じてページ固有のものであるべきとしつつ、検索や通知などアプリ全体に関わるグローバルな操作を含めてもよいとしています。設定する主要操作は多くとも2個までに絞るべきで、それ以上の操作が必要な場合はアプリバーではなくツールバー側に配置すべきとしています。",
    exceptions:
      "オーバーフローメニューをアプリバーに置くことは可能な限り避けるべきとしています。塗りつぶし・トーン配色のアイコンボタンは、視認性を高める目的であっても同時に複数使うことは避けるべきとしています。中型・大型の「ベースライン」変異体は非推奨のため、新規実装では中型フレキシブル・大型フレキシブルを使うべきとしています。",
    accessibility:
      "知覚可能(Perceivable)・操作可能(Operable) ― 見出し(タイトル)のアクセシビリティラベルは表示テキストと一致させ、現在地の理解を助ける補足情報を必要に応じて加えるべきとしています。アイコンボタンには、その操作内容が明確に伝わるラベル(例: 「地図で表示」)を付けるべきとしています。スクリーンリーダー利用時に最初にフォーカスが当たるべき要素は、先頭のボタン(戻る/メニューなど)だとしています。",
    useCases: [
      "ページ固有の情報・操作に絞り、主要操作は多くとも2個までに抑える",
      "多くの操作が必要な場合はアプリバーではなくツールバー側に配置する",
      "先頭に戻る/メニューのナビゲーション操作、末尾に最大2個の操作アイコンを配置する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/app-bars/guidelines",
    urlSecondary: [{ label: "Specs(最新版)", url: "https://m3.material.io/components/app-bars/specs" }],
    confirmedNote: "ユーザー提供の公式ドキュメント(MD3_text/appbar.docx)により、名称変更の経緯・バリエーション・色・容器・先頭ボタン・見出し・末尾アイコン・アダプティブデザイン・スクロール挙動・アクセシビリティの各セクションを2026-09に直接確認・反映(M3 Expressive 2025年5月アップデート時点の内容)。具体的な高さのdp数値はドキュメント内に記載がなく未確認です。",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <path d="M14 8l-5 5 5 5" fill="none" stroke="#2F7D6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="58" y="16" fontSize="9" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">画面タイトル</text>
        <circle cx="105" cy="13" r="2.2" fill="#2F7D6E" />
        <circle cx="112" cy="13" r="2.2" fill="#2F7D6E" />
      </svg>
    ),
    illustrationNote: "戻る矢印+タイトル+末尾の操作アイコン(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA banner landmark / WCAG 1.4.11 / 3.2.3 / 3.2.6",
    color: "#A3821F",
    position: "role=\"banner\"(またはheader要素)で識別する、サイト全体で共通するグローバルヘッダー領域のランドマーク",
    size: "上部バー専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5)は個々のアイコン・リンクにも適用されます。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、アイコンや区切り線などの視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    glossary: [
      { term: "3.2.3 Consistent Navigation・レベルAA", desc: "複数のページで繰り返し出てくるナビゲーションを、毎回同じ相対的な順番で並べることを求める基準。利用者が自分で並びを変えた場合は除く。" },
      { term: "3.2.6 Consistent Help・レベルA", desc: "問い合わせ先・問い合わせの手段・FAQなどのヘルプを複数のページに置く場合、ほかの内容に対して同じ順番の位置に置くことを求める基準(WCAG 2.2で追加)。ヘルプを置くこと自体は求めていない。" },
    ],
    stance:
      "bannerランドマークは、ロゴ・検索・全体ナビゲーションなど、サイト全体で繰り返し表示されるグローバルなヘッダーコンテンツを指すランドマークだとしています。HTMLのheader要素は、article/aside/main/nav/sectionの子孫でない限り、自動的にbanner相当の役割を持つとしています。1ページに複数のbannerランドマークを置くべきではなく、通常は1つに限定すべきとしています。ヘッダーには全ページ共通のナビゲーションやヘルプを置くことが多く、3.2.3(レベルAA)はその並び順をページ間でそろえることを求めます。WCAG 2.2で追加された3.2.6(レベルA)は、問い合わせ先・チャット・FAQなどのヘルプを複数のページに置く場合、ほかの内容に対して同じ順番の位置に置くことを求めます(ヘルプを置くこと自体は求めていません)。",
    exceptions:
      "header要素がarticle/aside/main/nav/sectionの子孫である場合は、banner相当のランドマークにはならず、一般的な role(generic)として扱われるとしています。これはAppleの「1画面ごとの戻るボタン+タイトル」という個別画面単位の概念とは異なり、サイト/アプリ全体で共通するヘッダーという、より広い粒度の概念です。",
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― bannerランドマークによる識別に加え、ターゲットサイズ(2.5)、非テキストのコントラスト(1.4.11)が関わります。3.2.3・3.2.6は「理解可能(Understandable)」の予測可能性(3.2)に関わります。",
    useCases: [
      "サイト/アプリ全体で共通するヘッダーはheader要素(またはrole=\"banner\")で1つだけ識別する",
      "article/aside/main/nav/section内のheader要素はbanner相当にはならない点に注意する",
      "アイコン・リンクにも一般的なターゲットサイズ基準を適用する",
      "ヘッダーのヘルプ(問い合わせ・FAQ等)は、どのページでも同じ位置に置く(3.2.6)",
    ],
    searchHint: "",
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role",
    urlSecondary: [
      { label: "3.2.3 Consistent Navigation", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html" },
      { label: "3.2.6 Consistent Help", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html" },
    ],
    confirmedNote: "3.2.3・3.2.6はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="26" viewBox="0 0 120 26">
          <rect x="1" y="1" width="118" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="17" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="banner"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、ランドマーク(役割)の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Sticky Headers: 5 Ways to Make Them Better",
    color: "#7A4F7E",
    position: "常時表示させる価値があるかを費用対効果で判断すべき、常設ヘッダー(数値基準ではなく判断基準)",
    size: "モバイルのタップ領域は約1×1cm、テキストは約16ptを目安とし、それ以上の余白は最小限にすべきとしています。",
    colorInfo: "半透明の背景は下のコンテンツと重なって読みにくくなるため、不透明な背景を使うべきとしています。",
    stance:
      "常設(スティッキー)ヘッダーは、ナビゲーション・検索・ユーティリティナビゲーションへ素早くアクセスできる一方、常にコンテンツ表示領域を占有するというコストを伴うとしています。導入前に、その要素がセッション中に本当に頻繁に必要とされるかどうかの費用対効果分析を行うべきとしています。コンテンツと chrome(枠部分)の比率を意識すべきとし、良い例では13:1程度、悪い例では2:1程度まで下がるとしています。",
    exceptions:
      "常設ヘッダーが価値を提供しない場合、他の最適化を行っても意味がないとしています。アニメーションを付ける場合は、素早く滑らかに、自然なスクロール速度に合わせるべきで、遅延して追いかけてくるような動き(「ストーカーメニュー」)は避けるべきとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、コンテンツと chrome の比率、費用対効果という使い分けの指針です。モバイルでのタップ領域(約1×1cm)は、他のコンポーネントと共通するアクセシビリティ上の目安として関わります。",
    useCases: [
      "導入前に費用対効果を検討する(本当に頻繁にアクセスされる要素か)",
      "半透明にせず不透明な背景を使う",
      "アニメーションは素早く滑らかにし、遅延した動きは避ける",
    ],
    searchHint: "cost-benefit",
    url: "https://www.nngroup.com/articles/sticky-headers/",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="60" y="16" fontSize="9" fill="#7A4F7E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">常設ヘッダー</text>
      </svg>
    ),
    illustrationNote: "視覚デザインの規定はなく、系列識別色で図示",
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

function TopBarSwatch() {
  return (
    <div style={{ width: 220, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#3A4FCF", borderRadius: 6 }}>
        <span style={{ color: "#FFFFFF", fontSize: 14 }}>‹</span>
        <span style={{ color: "#FFFFFF", fontSize: 13, fontFamily: "'Jost', 'Noto Sans JP', sans-serif", flex: 1 }}>画面タイトル</span>
        <span style={{ color: "#FFFFFF", fontSize: 13, opacity: 0.85 }}>⋮</span>
      </div>
    </div>
  );
}

const SEARCH_APP_BAR_ITEMS = [
  {
    label: "検索の入り口として",
    text: "検索アプリバーは、検索ビューを開くための目立つ入り口として使うアプリバーのバリエーションだとしています。バーのラベルには必ず「検索」という語(または各言語での相当語)を含めるべきとしています。",
  },
  {
    label: "ボタンの配置",
    text: "モバイル版では、アバターに加えて最大2つのアイコンボタンを表示できるとしています。末尾のアイコンは検索バーの内側・外側どちらにも配置可能です。アバターを表示する場合、末尾に2つ以上のアイコンボタンを追加しないとしています。より多くの操作が必要な場合はツールバー側に配置すべきとしています。",
  },
  {
    label: "先頭のロゴ",
    text: "先頭には製品ロゴを置くことができ、装飾目的のみでも、ホーム画面に戻る・画面を更新するなどの操作を兼ねてもよいとしています。ただし、拡張ナビゲーションレールを開く操作にロゴを使うことは避けるべきだとしています。",
  },
  {
    label: "大画面での拡張",
    text: "画面幅に応じて動的に調整され、大きい画面では末尾に最大4つのアイコンを表示できるとしています。検索コンテナは先頭・末尾の要素の間のスペースを埋めるように広がり、312dpに達するまで拡大を続け、それ以降はそのスペースの50%までしか広がらないとしています。",
  },
  {
    label: "配色",
    text: "既定では検索コンテナにサーフェスコンテナの色、ラベルにサーフェスバリアントの色を使うとしています。背景が暗い場合は、サーフェスブライトなど明るいコンテナ色を使うべきだとしています。既定以外の色ロールを使う場合はテキストとコンテナのコントラスト比を3:1以上確保すべきで、カスタムの色ロール自体は避けるのが望ましいとしています。",
  },
  {
    label: "スクロール時の変形",
    text: "中型フレキシブル・大型フレキシブルのアプリバーはスクロールに応じて小型アプリバーへ変形しますが、検索アプリバーへは変形させないとしています。",
  },
  {
    label: "アクセシビリティ",
    text: "見出し(タイトル)のアクセシビリティラベルは表示テキストと一致させ、必要に応じて補足情報を加えるべきだとしています。アイコンボタンには、その操作内容が明確に伝わるラベル(例: 「地図で表示」)を付けるべきだとしています。",
  },
];

function SearchAppBarSection() {
  return (
    <div style={styles.searchSection}>
      <div style={styles.searchSectionHeadRow}>
        <span style={styles.searchSectionBadge}>Google単独 ― 4系列比較の対象外</span>
        <h2 style={styles.searchSectionTitle}>検索アプリバー(Search app bar)</h2>
      </div>
      <p style={styles.searchSectionIntro}>
        Googleのアプリバーには、検索ビューへの入り口として使う「検索アプリバー」というバリエーションがあります。記載内容・注意点が多いため、上記の4系列比較には含めず、専用セクションとしてまとめています。Apple・W3C・Nielsen Norman Groupに直接対応する概念は確認できていません。
      </p>
      <div style={styles.searchSectionGrid}>
        {SEARCH_APP_BAR_ITEMS.map((it) => (
          <div key={it.label} style={styles.searchSectionCard}>
            <span style={styles.searchSectionCardLabel}>{it.label}</span>
            <p style={styles.searchSectionCardText}>{it.text}</p>
          </div>
        ))}
      </div>
      <p style={styles.searchSectionNote}>
        出典: ユーザー提供の公式ドキュメント(MD3_text/appbar.docx)による2026-09時点のMaterial Design 3公式情報。虫眼鏡アイコン・発見性など検索の入り口全般の4系列比較は「検索フィールド」ページを参照してください。
      </p>
    </div>
  );
}

export default function NavigationAppBarPage() {
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
        <SidebarNav currentPath="/components/navigation/app-bar" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / アプリバー</span>
            <span>SPEC No. 019</span>
          </div>

          <h1 style={styles.title}>アプリバー</h1>
          <p style={styles.subtitle}>4つのガイドラインが、画面タイトル・戻るナビゲーション・関連操作を示す上部バーをどう定めているかを比較します</p>
          <p style={styles.renameNote}>
            旧ページ名「トップバー」から改称(2026-09)。Googleが2025年5月のM3 Expressiveアップデートで、対応コンポーネントの名称を「トップアプリバー」から「アプリバー」に変更したことに合わせています。
          </p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <TopBarSwatch />
            <p style={styles.swatchNote}>戻るボタン・現在の画面タイトル・関連操作アイコンを持つ、画面ごとの上部バー。「ナビゲーションバー」ページで比較した常設の主要セクション切り替えバーとは別物。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページは、<strong>「ナビゲーションバー」ページのコラムを独立させたもの</strong>です。Appleが元々「Navigation Bars」と呼んでいた(現在はToolbarsに統合)、戻るボタン+画面タイトルを持つ上部バーは、Googleの<strong>「アプリバー」(2025年5月改称、旧「Top app bar」)がほぼ正確な対応コンポーネント</strong>であることが分かりました。両者とも、画面ごとにタイトルを示し、先頭に戻る/閉じるためのアイコン、末尾に関連操作アイコンを置くという構造が共通しています。
            </p>
            <p style={styles.synthesisText}>
              W3Cには、この「画面ごとの戻るボタン+タイトル」に完全に対応する専用パターンはありませんが、<strong>bannerランドマーク</strong>が最も近い関連概念です。ただしbannerは、サイト/アプリ全体で共通するグローバルヘッダー(ロゴ・全体ナビゲーションなど)を指すためのもので、<strong>「1画面ごとに変わるタイトル」という粒度までは扱いません</strong>。1ページに複数のbannerランドマークを置くべきではない、という点も実装上の注意点です。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupにも「上部バー」という名前の専用記事はありませんが、<strong>常設ヘッダー全般の費用対効果を問う「Sticky Headers」</strong>が関連する実務的知見を提供しています。<strong>「コンテンツとchromeの比率」</strong>(良い例で13:1、悪い例で2:1)という具体的な目安は、Apple・Googleどちらのアプリバーにも当てはまる、実装時の判断材料です。
            </p>
            <p style={styles.synthesisText}>
              Googleのアプリバーには、検索ビューへの入り口となる<strong>「検索アプリバー」</strong>というバリエーションもありますが、他3系列に直接対応する概念がないため、4系列比較には含めず、ページ末尾にGoogle単独の専用セクションとしてまとめています。
            </p>
            <p style={styles.synthesisText}>
              このページと「ナビゲーションバー」ページを合わせて読むと、<strong>Appleは1つの名前(Tab Bars/Toolbars)でGoogleの2つの概念(Navigation bar/アプリバー)にそれぞれ対応するコンポーネントを持つ</strong>、という4系列比較全体の構造が見えてきます。
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

          <SearchAppBarSection />

          <div style={styles.linksRow}>
            <a href="/components/navigation/nav-bar" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>ナビゲーションバー ↗</div>
              <div style={styles.linkCardDesc}>常設の主要セクション切り替えバー(3〜5行き先)の4系列比較</div>
            </a>
            <a href="/components/text-inputs/search-field" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>検索フィールド ↗</div>
              <div style={styles.linkCardDesc}>虫眼鏡アイコン・発見性など、検索の入り口全般の4系列比較</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["ナビゲーション", "検索・絞り込み"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3C・NN groupは本文確認済み。Googleはユーザー提供の公式ドキュメントで確認済み。Appleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはToolbarsページへのリンクです(旧Navigation Barsページから統合)。WCAGはMDNのbannerロール解説ページ、NN groupは記事ページ単位です。Googleは最新版(M3)の公式ページへリンクしています。
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
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 8px" },
  renameNote: { fontSize: 11.5, color: "#7E86AC", margin: "0 0 22px", lineHeight: 1.6, fontStyle: "italic" },
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
  searchSection: { background: "#F4FAF8", border: "1px solid #D3E9E3", borderRadius: 6, padding: "18px 18px 16px", marginBottom: 22 },
  searchSectionHeadRow: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 },
  searchSectionBadge: { alignSelf: "flex-start", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#2F7D6E", background: "#E3F2EE", padding: "3px 8px", borderRadius: 3, letterSpacing: 0.2 },
  searchSectionTitle: { fontSize: 16, fontWeight: 700, margin: 0, color: "#171B36" },
  searchSectionIntro: { fontSize: 12.5, lineHeight: 1.75, color: "#2E3457", margin: "0 0 14px" },
  searchSectionGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10, marginBottom: 12 },
  searchSectionCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "10px 12px" },
  searchSectionCardLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11.5, fontWeight: 700, color: "#2F7D6E", marginBottom: 4 },
  searchSectionCardText: { fontSize: 11.5, lineHeight: 1.65, color: "#454C78", margin: 0 },
  searchSectionNote: { fontSize: 10, color: "#7E86AC", margin: 0, lineHeight: 1.5, fontStyle: "italic" },
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
