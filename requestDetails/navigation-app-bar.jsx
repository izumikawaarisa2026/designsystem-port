import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

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
    term: "Toolbar(iOSではナビゲーションバーとも呼ぶ)",
    color: "#C2542A",
    position: "画面の上部で、今の画面のタイトル・戻るなどのナビゲーション・操作をまとめるバー。iOSでは、ナビゲーションを持つ上部のツールバーをナビゲーションバーとも呼ぶ",
    size:
      "高さの数値の記載なし。タイトルは15文字未満を目安にし、ほかの操作のための場所を残す。項目は見分けて押せるよう、入れすぎない",
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      "ツールバーは、画面の上か下の端に並ぶ操作のまとまりで、今の画面のタイトル、ナビゲーション(戻る・進む、検索フィールド)、操作(ボタン・メニュー)の3種類を持つ。上部のツールバーは階層の遷移を助ける。戻る・閉じるには標準のボタン(記号)を使い、「戻る」「閉じる」の文字にはしない。項目は先頭(戻る・サイドバーの表示)・中央・末尾に置き、主な操作は1つだけ末尾に置く。",
    exceptions:
      "幅が狭くなったときに溢れる項目を決めておく。macOS・iPadOSでは、収まらない項目にシステムが自動でオーバーフローメニューを付けるので、自分では足さない。ウィンドウのタイトルにアプリ名は使わない。",
    accessibility:
      <span><NoData>記載なし。</NoData></span>,
    useCases: [
      "階層を1段ずつ下りるナビゲーションに使う(戻るボタンで1段戻る)",
      "今の画面のタイトルを示し、よく使う操作をすぐ使えるようにする",
      "項目数を絞り、それぞれを見分けやすくする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/toolbars",
    refs: [
      { label: "Toolbars(旧「Navigation Bars」の内容を含む)", url: "https://developer.apple.com/design/human-interface-guidelines/toolbars" },
    ],
    confirmedNote: "HIG Toolbarsの本文で確認(2026-11)。",
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
    doc: "Material Design 3 ― App bar",
    term: "App bar(旧Top app bar。検索アプリバーを含む)",
    color: "#2F7D6E",
    position: "画面上部で、ページの内容・主な操作・ナビゲーション(戻る/メニューなど)を示すバー。小型・中型フレキシブル・大型フレキシブルと、検索の入り口の検索アプリバーの4種類",
    size:
      "M3 Expressiveで全体の高さが低くなった。中型・大型の「ベースライン」は非推奨になり、複数行の見出しに対応しつつ高さを抑えた「中型フレキシブル」「大型フレキシブル」への置き換えを案内している。検索アプリバーのサイズはこのページ末尾の節を参照。",
    colorInfo:
      "色の値はデザイントークンで実装する。すべての種類が同じ色の役割を使い、スクロールしたら、コンテナをサーフェスコンテナの色にして内容と分けて見せるか、コンテナを透明にしてボタンを内容の上に浮かせるかを選べる。",
    glossary: [
      { term: "小型 / 中型フレキシブル / 大型フレキシブル", desc: "現行(M3 Expressive)の推奨の3つの高さ。中型・大型は複数行の見出し・サブタイトル・画像など、柔軟な配置に対応する。" },
      { term: "ベースライン中型・大型(非推奨)", desc: "M3 Expressiveより前の中型・大型アプリバー。今は非推奨で、中型フレキシブル・大型フレキシブルへの置き換えを案内している。" },
    ],
    stance:
      <>ページの情報・主な操作・「戻る」「メニュー」などのナビゲーションを、画面上部にまとめて示す。内容はそのページに合わせたものにしつつ、検索や通知などアプリ全体の操作を含めてもよい。<Hl>主な操作は2個までに絞り</Hl>、それ以上が要るならツールバーに置く。</>,
    exceptions:
      "オーバーフローメニューはなるべく置かない。塗り・トーンのアイコンボタンは、見やすくするためでも同時に複数使わない。中型・大型の「ベースライン」は非推奨のため、新しく作るなら中型フレキシブル・大型フレキシブルを使う。",
    accessibility:
      "知覚可能(Perceivable)・操作可能(Operable) ― タイトルのアクセシビリティラベルは表示と同じにし、必要なら現在地が分かる補足を加える。アイコンボタンには操作がはっきり伝わるラベル(例: 「地図で表示」)を付ける。スクリーンリーダーで最初にフォーカスするのは先頭のボタン(戻る/メニューなど)。",
    useCases: [
      "そのページの情報・操作に絞り、主な操作は2個までにする",
      "多くの操作が要るならツールバーに置く",
      "先頭に戻る/メニュー、末尾に2個までの操作アイコンを置く",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/app-bars/guidelines",
    refs: [
      { label: "App bars", url: "https://m3.material.io/components/app-bars/guidelines" },
      { label: "Specs(最新版)", url: "https://m3.material.io/components/app-bars/specs" },
    ],
    confirmedNote: "M3の公式ページ本文(m3.material.io「App bars」のガイドライン)で、名称変更の経緯・バリエーション・色・容器・先頭ボタン・見出し・末尾アイコン・アダプティブデザイン・スクロール挙動・アクセシビリティの各セクションを2026-09に直接確認・反映(M3 Expressive 2025年5月アップデート時点の内容)。具体的な高さのdp数値はドキュメント内に記載がなく未確認。",
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
    term: "banner(ランドマークのロール)/ HTMLのheader要素",
    color: "#A3821F",
    position: "role=\"banner\"(またはheader要素)で示す、サイト全体で共通のヘッダー領域のランドマーク",
    size: "専用の数値基準はない。個々のアイコン・リンクには一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、アイコンや区切り線などは3:1以上のコントラスト比にする。",
    glossary: [
      { term: "3.2.3 Consistent Navigation・レベルAA", desc: "複数のページで繰り返し出るナビゲーションを、いつも同じ順番で並べること。利用者が自分で並びを変えた場合は除く。" },
      { term: "3.2.6 Consistent Help・レベルA", desc: "問い合わせ先・問い合わせの手段・FAQなどのヘルプを複数のページに置くなら、ほかの内容に対して同じ順番の位置に置くこと(WCAG 2.2で追加)。ヘルプを置くこと自体は求めない。" },
    ],
    stance:
      "bannerランドマークは、ロゴ・検索・全体のナビゲーションなど、サイト全体で繰り返し出るヘッダーの内容を指す。HTMLのheader要素は、article/aside/main/nav/sectionの中になければ、bannerに相当する。bannerは通常1ページに1つ。ヘッダーには全ページ共通のナビゲーションやヘルプを置くことが多く、3.2.3(レベルAA)はその並びをページ間でそろえること。WCAG 2.2で加わった3.2.6(レベルA)は、問い合わせ先・チャット・FAQなどのヘルプを複数のページに置くなら、ほかの内容に対して同じ順番の位置に置くこと(ヘルプを置くこと自体は求めない)。",
    exceptions:
      "article/aside/main/nav/sectionの中のheader要素はbannerにならず、一般の役割(generic)になる。Appleの「画面ごとの戻るボタン+タイトル」と違い、サイト/アプリ全体で共通のヘッダーという、より広い単位の概念。",
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― bannerランドマークによる識別、ターゲットサイズ(2.5)、非テキストのコントラスト(1.4.11)。3.2.3・3.2.6は「理解可能(Understandable)」の予測可能(3.2)。",
    useCases: [
      "サイト/アプリ全体で共通のヘッダーは、header要素(またはrole=\"banner\")で1つだけ示す",
      "article/aside/main/nav/sectionの中のheader要素はbannerにならない",
      "アイコン・リンクにも一般のターゲットサイズの基準を当てはめる",
      "ヘッダーのヘルプ(問い合わせ・FAQ等)は、どのページでも同じ位置に置く(3.2.6)",
    ],
    searchHint: "",
    url: "https://www.w3.org/TR/wai-aria-1.2/#banner",
    refs: [
      { label: "WAI-ARIA: banner", url: "https://www.w3.org/TR/wai-aria-1.2/#banner" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "apg", label: "APG: Landmark Regions", url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/" },
      { kind: "mdn", label: "bannerロール", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/banner_role" },
      { kind: "sc", level: "AA", label: "3.2.3 一貫したナビゲーション", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html" },
      { kind: "sc", level: "A", label: "3.2.6 一貫したヘルプ", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html" },
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
    term: "Sticky header(スクロールしても残るヘッダー)",
    color: "#7A4F7E",
    position: "いつも出しておく価値があるかを費用対効果で判断する常設ヘッダー(数値基準ではなく判断の基準)",
    size: "モバイルの押せる範囲は約1×1cm、文字は約16ptを目安にし、それ以上の余白は最小限にする。",
    colorInfo: "常設ヘッダーは、内容の背景と違う不透明な色にする。半透明だと下の内容と重なって読みにくいため(Googleの「透明にしてボタンを浮かせる」方法とは考え方が違う)。",
    stance:
      <>常設(スティッキー)ヘッダーは、ナビゲーション・検索・ユーティリティナビゲーションをすぐ使える一方、いつも表示領域を占めるコストがある。入れる前に、その要素が本当に頻繁に要るかの<Hl>費用対効果を検討する</Hl>。内容とchrome(枠の部分)の比率を意識し、良い例で13:1程度、悪い例では2:1程度まで下がる。</>,
    exceptions:
      "常設ヘッダーに価値がなければ、ほかを最適化しても意味がない。アニメーションは素早く滑らかに、自然なスクロールの速さに合わせ、遅れて追いかけてくる動き(「ストーカーメニュー」)は避ける。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、内容とchromeの比率、費用対効果という使い分けの指針。モバイルの押せる範囲(約1×1cm)は、ほかのコンポーネントと共通の目安。",
    useCases: [
      "入れる前に費用対効果を検討する(本当に頻繁に使う要素か)",
      "半透明にせず不透明な背景を使う",
      "アニメーションは素早く滑らかにし、遅延した動きは避ける",
    ],
    searchHint: "cost-benefit",
    url: "https://www.nngroup.com/articles/sticky-headers/",
    refs: [
      { label: "Sticky Headers: 5 Ways to Make Them Better", url: "https://www.nngroup.com/articles/sticky-headers/" },
    ],
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
      <span style={styles.glossaryNoteLabel}>メモ</span>
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
    text: "検索アプリバーは、検索ビューを開くための目立つ入り口として使うアプリバーのバリエーションだとしている。バーのラベルには必ず「検索」という語(または各言語での相当語)を含めるべきとしている。",
  },
  {
    label: "ボタンの配置",
    text: "モバイル版では、アバターに加えて最大2つのアイコンボタンを表示できるとしている。末尾のアイコンは検索バーの内側・外側どちらにも配置可能だ。アバターを表示する場合、末尾に2つ以上のアイコンボタンを追加しないとしている。より多くの操作が必要な場合はツールバー側に配置すべきとしている。",
  },
  {
    label: "先頭のロゴ",
    text: "先頭には製品ロゴを置くことができ、装飾目的のみでも、ホーム画面に戻る・画面を更新するなどの操作を兼ねてもよいとしている。ただし、拡張ナビゲーションレールを開く操作にロゴを使うことは避けるべきだとしている。",
  },
  {
    label: "大画面での拡張",
    text: "画面幅に応じて動的に調整され、大きい画面では末尾に最大4つのアイコンを表示できるとしている。検索コンテナは先頭・末尾の要素の間のスペースを埋めるように広がり、312dpに達するまで拡大を続け、それ以降はそのスペースの50%までしか広がらないとしている。",
  },
  {
    label: "配色",
    text: "既定では検索コンテナにサーフェスコンテナの色、ラベルにサーフェスバリアントの色を使うとしている。背景が暗い場合は、サーフェスブライトなど明るいコンテナ色を使うべきだとしている。既定以外の色ロールを使う場合はテキストとコンテナのコントラスト比を3:1以上確保すべきで、カスタムの色ロール自体は避けるのが望ましいとしている。",
  },
  {
    label: "スクロール時の変形",
    text: "中型フレキシブル・大型フレキシブルのアプリバーはスクロールに応じて小型アプリバーへ変形するが、検索アプリバーへは変形させないとしている。",
  },
  {
    label: "アクセシビリティ",
    text: "見出し(タイトル)のアクセシビリティラベルは表示テキストと一致させ、必要に応じて補足情報を加えるべきだとしている。アイコンボタンには、その操作内容が明確に伝わるラベル(例: 「地図で表示」)を付けるべきだとしている。",
  },
];

function SearchAppBarSection() {
  return (
    <div style={styles.searchSection}>
      <div style={styles.searchSectionHeadRow}>
        <span style={styles.searchSectionBadge}>Googleのコンポーネント ― 4系列比較の対象外</span>
        <h2 style={styles.searchSectionTitle}>検索アプリバー(Search app bar)</h2>
      </div>
      <p style={styles.searchSectionIntro}>
        Googleのアプリバーには、検索ビューへの入り口として使う「検索アプリバー」というバリエーションがある。記載内容・注意点が多いため、上記の4系列比較には含めず、専用セクションとしてまとめている。
      </p>
      <div style={styles.diffBox}>
        <div style={styles.diffTitle}>検索アプリバーと検索フィールドの違い</div>
        <div style={styles.diffRow}>
          <div style={styles.diffCol}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#EEF1FA", borderRadius: 20, padding: "6px 10px", width: 190 }}>
              <span style={{ fontSize: 11 }}>☰</span><span style={{ flex: 1, fontSize: 11, color: "#666D93" }}>アプリ内を検索</span><span style={{ width: 16, height: 16, borderRadius: 8, background: "#C7CBE6" }} />
            </div>
            <div style={styles.diffName}>検索アプリバー(入り口)</div>
            <p style={styles.diffText}>画面の上部に置く、アプリバーの1つの型。見た目は検索欄だが、押すと<strong>検索ビュー</strong>(入力と候補を出す画面)が開く。検索がアプリ全体の主な機能であるときに向く(特定の画面の中だけを検索するなら「検索バー」)。</p>
          </div>
          <div style={styles.diffArrow}>押すと →</div>
          <div style={styles.diffCol}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1.4px solid #3A4FCF", borderRadius: 6, padding: "6px 10px", width: 190, background: "#FFFFFF" }}>
              <span style={{ fontSize: 11 }}>‹</span><span style={{ flex: 1, fontSize: 11, color: "#171B36" }}>東京 カフェ|</span><span style={{ fontSize: 11, color: "#666D93" }}>✕</span>
            </div>
            <div style={styles.diffName}>検索フィールド(入力する欄)</div>
            <p style={styles.diffText}>実際に言葉を入力する欄。検索ビューの中や、ページの中に置く。候補や結果の見せ方も含めて、<PageLink to="/components/text-inputs/search-field">検索フィールド</PageLink>のページで4系列を比較している。</p>
          </div>
        </div>
        <p style={styles.diffNote}><strong>Appleにも近い置き方がある</strong>。iOSでは、検索の入り口を「タブバーの検索タブ」「画面の上部か下部のツールバー」「内容の中」のどこに置くかを選べ、上部のツールバー(ナビゲーションバー)に置いた検索ボタンを押すと、検索フィールドに変わるとしている(HIG Search fields)。W3CとNielsen Norman Groupには、検索アプリバーに当たる項目はない。</p>
      </div>
      <div style={styles.searchSectionGrid}>
        {SEARCH_APP_BAR_ITEMS.map((it) => (
          <div key={it.label} style={styles.searchSectionCard}>
            <span style={styles.searchSectionCardLabel}>{it.label}</span>
            <p style={styles.searchSectionCardText}>{it.text}</p>
          </div>
        ))}
      </div>
      <p style={styles.searchSectionNote}>
        出典: m3.material.io「App bars」のガイドラインの本文(Material Design 3)。Appleの置き方はHIG「Search fields」のiOSの節。虫眼鏡アイコン・発見性など検索の入り口全般の4系列比較は「検索フィールド」ページを参照。
      </p>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の上部に置き、画面の名前・戻る操作・関連する操作をまとめるバー";
const ABOUT = [
  { k: "目的・役割", v: "今いる画面がどこかを示し、前の画面へ戻る手段と、その画面の主な操作を置く" },
  { k: "よく使われる場面", v: "設定画面の見出しと戻るボタン、メール画面の検索・メニューのアイコン" },
  { k: "似たコンポーネントとの違い", v: <>主な場所を切り替えるのは<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "上部のバーの背景を透かしてよい?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "スクロールしたら、バーの色を変えて内容と分けるか、バーを透明にしてボタンだけを内容の上に浮かせるかを選べる" },
      { who: "NN group", color: "#7A4F7E", t: "常に残るヘッダーは、内容と違う不透明な色にする。半透明だと下の内容と重なって読みにくい" },
      { who: "Apple", color: "#C2542A", t: "独自の背景色や色付きの操作は控え、内容の層の色をいかす。内容とバーを分ける必要があるときはスクロールの端の効果を使う" },
    ],
    tip: "透かすかどうかより、バーの文字やアイコンが下の内容の上でも読めることが大切だ。透かす場合は、どんな内容の上でもコントラストが保てるかを確かめ、保てないならNN groupの勧めのように不透明にする。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "画面の名前・戻る操作・関連する操作を置く", d: "", who: "Apple・Google" },
  { n: 2, t: "先頭に戻る/閉じる、末尾に関連する操作", d: "", who: "Apple・Google" },
  { n: 3, t: "バーの文字とアイコンは、下の内容の上でも読めるように", d: "保てないなら不透明にする", who: "NN group" },
];

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
          <SummaryCard keyPoints={KP}
            image={<><TopBarSwatch /></>}
            imageNote={<>戻るボタン・現在の画面タイトル・関連操作アイコンを持つ、画面ごとの上部バー。「ナビゲーションバー」ページで比較した常設の主要セクション切り替えバーとは別物。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              Appleが以前「Navigation Bars」と呼んでいた(現在はToolbarsに統合)、戻るボタン+画面タイトルを持つ上部バーは、Googleの<strong>「アプリバー」(旧Top app bar)がほぼ正確な対応コンポーネント</strong>だ。両者とも、画面ごとにタイトルを示し、先頭に戻る/閉じるためのアイコン、末尾に関連操作アイコンを置くという構造が共通している。
            </p>
            <p style={styles.synthesisText}>
              W3Cには、この「画面ごとの戻るボタン+タイトル」に完全に対応する専用パターンはないが、<strong>bannerランドマーク</strong>が最も近い関連概念だ。ただしbannerは、サイト/アプリ全体で共通するグローバルヘッダー(ロゴ・全体ナビゲーションなど)を指すためのもので、<strong>「1画面ごとに変わるタイトル」という粒度までは扱わない</strong>。1ページに複数のbannerランドマークを置くべきではない、という点も実装上の注意点だ。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupにも「上部バー」という名前の専用記事はないが、<strong>常設ヘッダー全般の費用対効果を問う「Sticky Headers」</strong>が関連する実務的知見を提供している。<strong>「コンテンツとchromeの比率」</strong>(良い例で13:1、悪い例で2:1)という具体的な目安は、Apple・Googleどちらのアプリバーにも当てはまる、実装時の判断材料だ。
            </p>
            <p style={styles.synthesisText}>
              背景の透明度では意見が分かれる。<strong>NN groupは常設ヘッダーを、内容と違う不透明な色にすべき</strong>としている一方、<strong>Googleはスクロール時にコンテナを透明にしてボタンを内容の上に浮かせる手法も選べる</strong>としている。透明・半透明にするなら、<strong>上に載る文字やアイコンが、下の内容と重なっても読めるかを確かめる</strong>のが判断の目安だ(AI解釈)。
            </p>
            <p style={styles.synthesisText}>
              Googleのアプリバーには、検索ビューへの入り口となる<strong>「検索アプリバー」</strong>というバリエーションもあるが、他3系列に直接対応する概念がないため、4系列比較には含めず、ページ末尾にGoogle単独の専用セクションとしてまとめている。
            </p>
            <p style={styles.synthesisText}>
              このページと「ナビゲーションバー」ページを合わせて読むと、<strong>AppleのTab BarsはGoogleのNavigation barに、ToolbarsはGoogleのアプリバーに対応する</strong>、という4系列比較全体の構造が見えてくる。
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
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
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
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
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

          <SearchAppBarSection />


          <RelatedPages paths={["/components/navigation/nav-bar", "/components/text-inputs/search-field", "/components/containment/drawer", "/components/selection/menu"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["ナビゲーション", "検索・絞り込み"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  diffBox: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", margin: "0 0 14px", background: "#FFFFFF" },
  diffTitle: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 10 },
  diffRow: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" },
  diffCol: { flex: "1 1 220px", minWidth: 0 },
  diffArrow: { fontSize: 11, color: "#666D93", alignSelf: "center" },
  diffName: { fontSize: 12.5, fontWeight: 700, color: "#171B36", margin: "8px 0 4px" },
  diffText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", margin: 0 },
  diffNote: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 0" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 8px" },
  renameNote: { fontSize: 11.5, color: "#666D93", margin: "0 0 22px", lineHeight: 1.6, fontStyle: "italic" },
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
  searchSection: { background: "#F4FAF8", border: "1px solid #D3E9E3", borderRadius: 6, padding: "18px 18px 16px", marginBottom: 22 },
  searchSectionHeadRow: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 },
  searchSectionBadge: { alignSelf: "flex-start", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#2F7D6E", background: "#E3F2EE", padding: "3px 8px", borderRadius: 3, letterSpacing: 0.2 },
  searchSectionTitle: { fontSize: 16, fontWeight: 700, margin: 0, color: "#171B36" },
  searchSectionIntro: { fontSize: 12.5, lineHeight: 1.75, color: "#2E3457", margin: "0 0 14px" },
  searchSectionGrid: { display: "grid", gridTemplateColumns: "1fr", gap: 10, marginBottom: 12 },
  searchSectionCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "10px 12px" },
  searchSectionCardLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11.5, fontWeight: 700, color: "#2F7D6E", marginBottom: 4 },
  searchSectionCardText: { fontSize: 11.5, lineHeight: 1.65, color: "#454C78", margin: 0 },
  searchSectionNote: { fontSize: 10, color: "#666D93", margin: 0, lineHeight: 1.5, fontStyle: "italic" },
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#666D93" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
