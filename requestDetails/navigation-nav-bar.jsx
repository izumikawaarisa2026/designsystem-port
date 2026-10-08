import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Navigation / ナビゲーションバー」ページ。
 *
 * 2026-09 再考(ユーザー指摘による): 当初はAppleの「戻るボタンを持つ上部バー」
 * (Toolbars/旧Navigation Bars)を軸に4系列を並べていたが、Google(Navigation bar =
 * 画面下部・主要な行き先)、W3C(navigationランドマーク)、Nielsen Norman Group(Mobile
 * Navigation Patterns、少ない選択肢の常設バー)の3系列が実は同じ対象 ―
 * 「永続的な主要セクション切り替えバー」― を指していることに気づいた。この対象に
 * 対応するAppleの本当の等価コンポーネントは「Tab Bars」(画面下部の主要なタブ)であり、
 * 「タブ」ページのApple欄と同じ一次情報を指す。Appleは1つのコンポーネント(Tab Bars)で
 * (2026-10訂正: AppleのTab BarsはGoogleのNavigation barに対応し、画面内のTabsに当たる部品はAppleにない)Googleの2つの概念(Tabsページで比較した「Tabs」と、このページで比較する「Navigation
 * bar」)の両方を兼ねている、という点自体が興味深い非対称性のため、四系列比較はTab Bars
 * を軸に組み直した。
 *
 * 一方、Appleが元々「Navigation Bars」と呼んでいた「戻るボタン+画面タイトルを持つ上部バー」
 * (階層を1段ずつ掘り下げる用途)は、上記の対象とは別物のため、四系列比較の外に出し、
 * 「コラム」として独立させていたが、その後Googleの「アプリバー」(当時の名称は
 * 「Top app bar」)が正確な対応
 * コンポーネントであること、W3C・NN groupにも関連する内容があることが分かったため、
 * 単なるコラムではなく独立した4系列比較ページ「アプリバー」(旧ページ名「トップバー」、
 * 2026-09にGoogleの改称に合わせて変更)として切り出した
 * (2026-09)。このページには短い誘導カードのみを残している。
 *
 * W3C(WAI-ARIA landmark regions)/ Nielsen Norman Group(Mobile Navigation Patterns)は
 * 公式ページ・記事本文を直接取得して確認済み(2026-09)。Apple(HIG Tab Bars)は「タブ」
 * ページで直接取得済みの内容を流用。Google(Material Design 3)は公式サイトが
 * クライアント側レンダリングのSPAで自動取得できないため、これまで検索結果による間接確認
 * だったが、公式ページ本文(使用法・バリエーション・設定・配置・ナビゲーション項目・
 * アイコン・アクティブインジケーター・ラベルテキスト・適応型デザイン・行動・
 * インタラクションとスタイル・アクセシビリティの各セクション)を確認できたため、その
 * 内容を反映済み(2026-09、MD3_text/navber.docx)。これにより、従来の「ベースライン」
 * スタイルは推奨されなくなり、より短い「フレキシブルナビゲーションバー」への置き換えが
 * 案内されていることが判明した(コンポーネント全体の非推奨ではなく、見た目の変異体単位の
 * 刷新)。「アプリバー」ページで扱うApple「Toolbars」(旧Navigation Bars)ページは
 * 引き続き検索結果による間接確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Tab Bars",
    color: "#C2542A",
    position: "アプリのトップレベルのセクション間を移動するための、画面下部の永続的なナビゲーション専用バー",
    size:
      "タブの数の上限は数値で示しておらず、必要な数のタブを使い、少ないほど移動しやすいことを踏まえて増やしすぎないよう求めています。収まらないタブが「その他(More)」タブにまとめられると中身が見つけにくくなるため、はみ出しを避けます(2026-10にHIGの本文で再確認。以前の「3〜5個」という記述は現在の本文にはありません)。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "タブバーは、アプリのトップレベルのセクション間を移動するために使う、画面下部の永続的なバーだとしています。厳密にナビゲーション専用とし、操作の実行(アクション)には使うべきではないとしています。画面遷移中も常に表示しておくべきで、非表示にするとユーザーが自分のいる場所を見失うとしています。この役割は、Googleの「Navigation bar」(画面下部・3〜5行き先)と一致します。",
    exceptions:
      "機能が一時的に使えない場合でも、タブを削除したり無効化したりすべきではないとしています(インターフェースが不安定・予測不能になるため)。タブが使えない理由は説明し、常に全てのタブを有効にしておくべきとしています。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。標準のタブバーコントロールを使えば、支援技術には自動的に状態が伝わると考えられます。",
    useCases: [
      "アプリのトップレベルセクション間を移動する(タブは必要な数に絞り、はみ出しを避ける)",
      "画面遷移中も常に表示し、ユーザーが現在地を見失わないようにする",
      "機能が使えない場合もタブは無効化・削除せず、理由を説明する",
    ],
    searchHint: "Avoid overflow tabs",
    url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars",
    confirmedNote: "「タブ」ページで直接取得・確認済みの内容と同一の一次情報です(2026-09)。Appleには「Navigation bar」という名前の別コンポーネントはなく、Googleの同名コンポーネントに対応するのはこのTab Barsです(Appleが別に「Navigation Bars」と呼んでいた上部バーについては「アプリバー」ページを参照)。",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={20 + i * 27} cy="13" r="5" fill={i === 0 ? "#C2542A" : "none"} stroke="#C2542A" strokeWidth="1.4" />
        ))}
      </svg>
    ),
    illustrationNote: "画面下部の永続的なTab Bar。主要セクションを切り替える(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Navigation bar(画面下部)/ アプリバー(画面上部、別コンポーネント)",
    color: "#2F7D6E",
    position: "画面下部の永続的なバー(3〜5個の主要な行き先)。コンパクト/中サイズのウィンドウ専用(モバイル/タブレットのみ)。Appleの「Tab Bars」と同じ役割を担う",
    size:
      "コンテナは常にウィンドウ幅いっぱいに広がります。コンパクトなウィンドウでは縦型のナビゲーション項目(アイコンの下にラベル)、中サイズのウィンドウでは横型の項目(アイコンとラベルが横並び)を使うとしています。デバイスのテキスト表示サイズが大きい場合、既定のパディングを保ったまま縦方向に拡張してラベルを収めるべきで、最大2倍の文字サイズまではラベル全体を切り詰めずに表示すべきとしています。具体的な高さのdp数値は確認できていません。",
    colorInfo:
      "アクティブなページには塗りつぶしのアイコン+太字ラベル、非アクティブなページには枠線付きアイコン+中程度の太さのラベルを使うとしています(塗りつぶし版のアイコンがない場合はセミボールドの太さで代用)。アクティブ/非アクティブ双方のアイコンは、コンテナとの間で最低3:1のコントラスト比を確保すべきとしています。コンテナ自体も、他のコンテンツと区別するため色付きの塗りつぶしを持つとしています。",
    glossary: [
      { term: "ベースライン変異体 / フレキシブルナビゲーションバー", desc: "従来の標準的な見た目のナビゲーションバー(ベースライン変異体)は推奨されなくなり、より短く、中サイズのウィンドウで横型のナビゲーション項目に対応する「フレキシブルナビゲーションバー」への置き換えが案内されている。" },
      { term: "状態を保持する / 状態のリセット", desc: "ナビゲーション項目を選ぶ際の2つの挙動。「状態を保持する」は各行き先のスクロール位置・タブ・検索状態を記憶し続ける。「状態のリセット」は毎回既定のビューに戻す。セクション間を頻繁に行き来するアプリでは前者が適するとされる。" },
    ],
    stance:
      "ナビゲーションバーは、小型〜中型デバイスでUIビューを切り替えるためのコンポーネントで、同等の重要度を持つ3〜5個の行き先を提供します。行き先はアプリの画面間で一貫しており、変わらないものだとしています。製品に3〜5個の主要ページがあり、モバイルまたはタブレット端末である場合に使うべきで、メールを1通読むような単一タスクへのアクセスには使うべきではないとしています。上部の「アプリバー」は、現在の画面のタイトルや関連する操作を示す別のコンポーネントで、Appleが「Navigation Bars」と呼んでいた(現在はToolbarsに統合された)戻るボタン付きの上部バーに近い役割を担います。",
    exceptions:
      "行き先が5個を超える場合はナビゲーションバーを使うべきではなく、代わりにタブ(ページ内の類似コンテンツの整理)やモーダル展開ナビゲーションレール(メニューアイコンの背後にナビゲーションを隠す)を検討すべきとしています。行き先が3個未満の場合もナビゲーションバーは使うべきではなく、代わりにタブを使うべきとしています。画面のスワイプで行き先を切り替える操作はサポートされておらず、スワイプはカルーセルやリスト項目のアーカイブなど別の操作に限定すべきとしています。フローティングアクションボタン(FAB)はナビゲーションバーを覆ってはならず、バーの上に右揃えで配置すべきとしています。ダイアログやボトムシートなどによる一時的な被覆は許容されますが、恒久的に隠すべきではないとしています。",
    accessibility:
      "操作可能(Operable) ― ナビゲーション項目には常にラベルテキストが必須で(アイコンのみの項目は認めない)、1〜2語程度に収めるべきとしています。アクセシビリティラベルは通常は行き先名と同じですが、表示テキストが曖昧な場合(例: 「ライブラリ」)はより詳細な説明を追加すべきとしています(Android Views(MDC-Android)では、より詳細なラベルや役割のアナウンスに対応していない点に注意が必要です)。スクリーンリーダー使用中は、スクロールによってバーを非表示にすべきではないとしています。",
    useCases: [
      "3〜5個の主要ページを持つモバイル/タブレット向け製品で使う(単一タスクへのアクセスには使わない)",
      "行き先が5個を超える場合はタブやモーダル展開ナビゲーションレールを検討する",
      "行き先が3個未満の場合はタブを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/navigation-bar/guidelines",
    urlSecondary: [{ label: "アプリバー", url: "https://m3.material.io/components/app-bars/guidelines" }],
    confirmedNote: "使用法・バリエーション(ベースライン/フレキシブル)・配置・状態の保持/リセット・インタラクションとスタイル・アクセシビリティ(ラベル要件・テキスト拡大)の各セクションは2026-09時点で公式ページ本文(m3.material.io「Navigation bar」のガイドライン)を確認済み。具体的な高さなどのspecs数値は未確認。",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={20 + i * 27} cy="13" r="5" fill={i === 0 ? "#2F7D6E" : "none"} stroke="#2F7D6E" strokeWidth="1.4" />
        ))}
      </svg>
    ),
    illustrationNote: "画面下部のNavigation bar(概念図・系列識別色)。上部アプリバーは別コンポーネント",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA Landmark Regions(navigationランドマーク)/ WCAG 1.4.11 / 2.5.8 / 2.5.5 / 3.2.3",
    color: "#A3821F",
    position: "role=\"navigation\"(またはnav要素)で識別する、ページ内のナビゲーション用リンク群を示すランドマーク",
    size:
      "ナビゲーションバー専用の数値基準はありませんが、一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求めます(どちらも例外あり。詳しくは「ボタン」ページのターゲットサイズの説明を参照)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、選択中の項目を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    glossary: [
      { term: "3.2.3 Consistent Navigation・レベルAA", desc: "複数のページで繰り返し出てくるナビゲーションを、毎回同じ相対的な順番で並べることを求める基準。利用者が自分で並びを変えた場合は除く。" },
    ],
    stance:
      "ナビゲーション用のリンク群には、nav要素またはrole=\"navigation\"を使ってランドマークとして識別すべきとしています。1ページに複数のnavigationランドマークがある場合、それぞれに一意のラベル(aria-label等)を付けるべきとしていますが、リンクの集合が別のnavigationランドマークと完全に同じ場合は同じラベルを使ってよいとしています。3.2.3(レベルAA)は、複数のページで繰り返し表示されるナビゲーションを、毎回同じ相対的な順番で並べることを求めます。画面拡大で一部しか見えない人や、上から順に読み上げを聞く人が、項目の位置を覚えて素早く見つけられるようにするためです。選んだ項目の下にサブメニューを差し込むことは認められています。",
    exceptions:
      "リンクの集合が他のnavigationランドマークと完全に同一である場合に限り、同じラベルを使うことが許容されています。それ以外の場合は一意のラベルが必要です。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― ランドマークによる識別に加え、ターゲットサイズ(2.5)、非テキストのコントラスト(1.4.11、知覚可能)が関わります。3.2.3は「理解可能(Understandable)」の予測可能性(3.2)に関わります。",
    useCases: [
      "ナビゲーション用のリンク群をnav要素またはrole=\"navigation\"で囲む",
      "1ページに複数のnavigationランドマークがある場合は一意のラベルを付ける",
      "リンクの集合が完全に同じ場合のみ同じラベルを使ってよい",
      "全ページで、ナビゲーションの項目を同じ順番に並べる(3.2.3)",
    ],
    searchHint: "unique label",
    url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
    urlSecondary: [
      { label: "3.2.3 Consistent Navigation", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html" },
    ],
    confirmedNote: "3.2.3はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="26" viewBox="0 0 120 26">
          <rect x="1" y="1" width="118" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="17" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="navigation"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、ランドマーク(役割)の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Basic Patterns for Mobile Navigation: A Primer",
    color: "#7A4F7E",
    position: "画面の上部・下部どちらに置くかで一長一短があり、選択肢が少ない場合に向く(数値基準ではなく使い分けの指針)",
    size: "数値基準は明言していませんが、選択肢が5個を超えると、バーに収めながら十分なタップ領域を保つのが難しくなるとしています。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "上部ナビゲーションバーは、選択肢が比較的少ない場合にしかうまく働かず、画面上部の貴重な領域(fold上)を取るとしています。タブバーは上部ナビゲーションバーの近い仲間で同じ欠点を持ち、違いはスクロールしても常に表示される点だとしています。いずれのパターンも選択肢が少ないサイト・アプリに適しているとしています。",
    exceptions:
      "選択肢が5個を超える場合、バーに収めながら十分なタップ領域サイズを保つことが難しくなるとしています。ロゴ・検索・アカウントリンクなど他のUI要素と併用する場合、ナビゲーションの視認性とコンテンツの優先度のどちらを取るかのトレードオフが生じるとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、画面領域とタップ領域の取り合いに基づく使い分けの指針です。",
    useCases: [
      "選択肢が少ない(4〜5個程度まで)場合に使う",
      "常時表示させたい場合はプラットフォームの慣習に沿った配置を検討する",
      "ロゴ・検索・アカウントリンクなど他の要素と両立する場合は優先度を検討する",
    ],
    searchHint: "relatively few navigation options",
    url: "https://www.nngroup.com/articles/mobile-navigation-patterns/",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={30 + i * 30} cy="13" r="5" fill="none" stroke="#7A4F7E" strokeWidth="1.4" />
        ))}
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

function NavBarSwatch() {
  const items = ["ホーム", "検索", "通知", "設定"];
  return (
    <div style={{ width: 260, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 8px", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 8 }}>
        {items.map((label, i) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", border: `1.6px solid ${i === 0 ? "#3A4FCF" : "#B7BCDA"}`, background: i === 0 ? "#3A4FCF" : "none" }} />
            <span style={{ fontSize: 9, color: i === 0 ? "#3A4FCF" : "#9EA4C4", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopBarPointerSection() {
  return (
    <div style={styles.columnCard}>
      <div style={styles.columnHeadRow}>
        <span style={styles.columnLabel}>関連ページ</span>
        <span style={styles.columnTitle}>Appleが別に「ナビゲーションバー」と呼んでいたもの</span>
      </div>
      <p style={styles.columnIntro}>
        Appleには元々「Navigation Bars」という名前のページ(戻るボタン+画面タイトルを持つ上部バー)がありましたが、これは上記で比較した<strong>「常設の主要セクション切り替えバー」とは別物</strong>です。Googleの「アプリバー」(2025年5月改称、旧「Top app bar」)がほぼ正確な対応コンポーネントであること、W3C(bannerランドマーク)・Nielsen Norman Group(Sticky Headers)にも関連する内容があることが分かったため、単独の4系列比較ページ<strong>「アプリバー」</strong>として切り出しました。
      </p>
      <a href="/components/navigation/app-bar" style={styles.linkCard}>
        <div style={styles.linkCardTitle}>アプリバー ↗</div>
        <div style={styles.linkCardDesc}>戻るボタン・画面タイトル・関連操作を示す上部バーの4系列比較</div>
      </a>
    </div>
  );
}

export default function NavigationNavBarPage() {
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
        <SidebarNav currentPath="/components/navigation/nav-bar" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ナビゲーションバー</span>
            <span>SPEC No. 015</span>
          </div>

          <h1 style={styles.title}>ナビゲーションバー</h1>
          <p style={styles.subtitle}>4つのガイドラインが、画面下部などに常設する「主要セクション切り替えバー」をどう定めているかを比較します(Apple独自のもう1つの「ナビゲーションバー」は末尾の関連ページを参照)</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <NavBarSwatch />
            <p style={styles.swatchNote}>主要な行き先(Googleは3〜5個)を常設で切り替えるバー。Appleでは「Tab Bars」、Googleでは「Navigation bar」と呼ばれる、同じ役割のコンポーネント。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              <strong>Apple・Google・Nielsen Norman Groupは、常設の主要ナビゲーションの見た目と使い方</strong>を扱っています(Googleの「Navigation bar」、NN groupの「選択肢の少ない常設バー」)。これに対応するAppleの部品は<strong>「Tab Bars」</strong>(「タブ」ページで比較したのと同じ一次情報)です。<strong>AppleのタブバーはGoogleのNavigation barに対応</strong>し、画面の中で内容を切り替えるGoogleのTabsに当たる専用の部品は、Appleにはありません。<strong>W3Cは見た目の部品ではなく、ナビゲーションのリンク群であることを伝える意味の構造(navigationランドマーク)</strong>を定めています。
            </p>
            <p style={styles.synthesisText}>
              公式ページ本文を確認したところ、<strong>GoogleのNavigation barはApple以上に厳格な行き先数の基準</strong>を持つことが判明しました。Appleは数値の上限を示さず「タブは少ないほど移動しやすく、はみ出しは避ける」とするだけですが、Googleは<strong>「3〜5個」</strong>という範囲に加えて<strong>「3個未満なら使うべきではない(タブを使う)」という下限も明記</strong>しており、5個を超える場合の代替案(タブ、モーダル展開ナビゲーションレール)も具体的です。さらに、<strong>ナビゲーション項目には常にラベルテキストが必須</strong>(アイコンのみは不可)という点は、Appleが暗黙に採用している慣習と一致する、実務上重要な収束点です。
            </p>
            <p style={styles.synthesisText}>
              ややこしいのは、<strong>Appleが別に「Navigation Bars」と呼んでいた(現在はToolbarsに統合)、戻るボタンを持つ上部バー</strong>が存在することです。これは今回比較した「常設の主要セクション切り替えバー」とは別物(階層を1段ずつ掘り下げる用途)のため、混同を避けるためこのページの比較表からは外し、独立した4系列比較ページ「アプリバー」として切り出しました(末尾のリンクを参照)。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは、<strong>上部のナビゲーションバー</strong>の欠点として、選択肢が比較的少ないときにしかうまく働かないことと、画面上部の貴重な場所を取ることを挙げています。そのうえで、<strong>タブバー(iOSでは主に下部)も同じ欠点を持つ</strong>とし、違いはタブバーがスクロールしても常に表示される点だとしています。AppleのTab Bars・GoogleのNavigation barを設計するときにも、行き先を少なく保つという制約は同じです。なおGoogleは、従来の「ベースライン」スタイルが推奨されなくなり、より短い「フレキシブルナビゲーションバー」への置き換えが案内されていることも確認できました(コンポーネント自体の廃止ではなく、見た目の変異体単位の刷新です)。
            </p>
            <p style={styles.synthesisText}>
              W3Cは他系列と異なり、<strong>見た目やサイズではなく「ランドマークとしての識別のされ方」</strong>に焦点を当てています。特に、1ページに複数のnavigationランドマークがある場合は一意のラベルを付けるべきという指摘は、Apple/Googleどちらの実装にも共通して当てはまる、実装上の重要な注意点です。
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

          <TopBarPointerSection />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["ナビゲーション"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Apple・W3C・NN group・Googleとも本文確認済み。Googleの高さなどのspecs数値のみ未確認。「アプリバー」ページで扱うApple「Toolbars」は間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはTab Barsページへのリンクです(「タブ」ページと同じ一次情報)。WCAGはWAI-ARIA Landmark Regionsの実践ガイド、NN groupは記事ページ単位です。Googleは下部Navigation barの最新版(M3)公式ページへリンクしており本文は確認済みですが、高さなどのspecs数値はまだ確認できていません。上部アプリバーおよびAppleのToolbarsページへのリンクは「アプリバー」ページに記載しています。
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
  columnCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 20px 20px", marginBottom: 22 },
  columnHeadRow: { display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12, flexWrap: "wrap" },
  columnLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 700, color: "#7E86AC", letterSpacing: 0.3, background: "#EEF1FA", padding: "2px 8px", borderRadius: 3 },
  columnTitle: { fontSize: 15, fontWeight: 700, color: "#171B36" },
  columnIntro: { fontSize: 12.5, lineHeight: 1.7, color: "#2E3457", margin: "0 0 14px" },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
};
