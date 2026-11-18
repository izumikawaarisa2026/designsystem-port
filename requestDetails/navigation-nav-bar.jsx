import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Navigation / タブバー」ページ(URLは /nav-bar/ のまま)。
 * 2026-11 ⑦本人レビューで「ナビゲーションバー」から改名(Googleの呼び名は下部、Apple・NN groupの呼び名は上部の
 * バーを指し、1つの言葉が2つのコンポーネントを指すため)。「ナビゲーションバー」はGoogleの名前を示すときだけ使う。
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
    term: "Tab bar",
    color: "#C2542A",
    position: "アプリのトップレベルのセクションの間を遷移する、画面下部に常にあるナビゲーション専用のバー",
    size:
      "タブの数の上限はない。必要な数だけ使い、少ないほど遷移しやすいため増やしすぎない。収まらないタブが「その他(More)」にまとめられると見つけにくいため、はみ出しを避ける。",
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      <><Hl>ナビゲーション専用で、操作の実行には使わない</Hl>。遷移中もいつも出しておく(隠すと現在地を見失う)。</>,
    exceptions:
      "機能が一時的に使えなくても、タブを消したり無効にしたりせず、使えない理由を説明する。",
    accessibility:
      <span><NoData>記載なし。</NoData></span>,
    useCases: [
      "アプリのトップレベルのセクションの間を遷移する(タブは必要な数に絞り、はみ出しを避ける)",
      "遷移中もいつも出し、現在地を見失わないようにする",
      "機能が使えなくてもタブは無効にも削除もせず、理由を説明する",
    ],
    searchHint: "Avoid overflow tabs",
    url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars",
    refs: [
      { label: "Tab Bars", url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars" },
    ],
    confirmedNote: "「タブ」ページで直接取得・確認済みの内容と同一の一次情報(2026-09)。GoogleのNavigation barに対応するのはこのTab Bars(Appleが別に「Navigation Bars」と呼んでいた上部バーは「アプリバー」ページ)。",
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
    doc: "Material Design 3 ― Navigation bar(画面下部)",
    term: "Navigation bar(Googleの呼び名はナビゲーションバー)",
    color: "#2F7D6E",
    position: "画面下部に常にあるバー(3〜5個の主な行き先)。コンパクト/中サイズのウィンドウ専用(モバイル/タブレットのみ)。AppleのTab barと同じ役割",
    size:
      <span><Hl>高さ64dp</Hl>(高い形は80dp。Jetpack Composeのトークン)。幅はいつもウィンドウいっぱい。文字を大きくしても2倍まではラベルを切らない。</span>,
    colorInfo:
      "選択中は塗りのアイコン+太字、それ以外は枠線のアイコン。アイコンはコンテナと3:1以上。",
    glossary: [
      { term: "ベースライン / フレキシブル(Flexible navigation bar)", desc: "従来の見た目(ベースライン)は推奨されなくなり、より低く、中サイズのウィンドウで横型の項目に対応する「フレキシブル」の型への置き換えを案内している。" },
      { term: "状態を保持する / 状態のリセット", desc: "項目を選んだときの2つの動き。「状態を保持する」は各行き先のスクロール位置・タブ・検索の状態を覚えておく。「状態のリセット」は毎回既定の画面に戻す。セクションを頻繁に行き来するアプリには前者が合う。" },
    ],
    stance:
      <>モバイル・タブレットで、<Hl>同じ重要度の3〜5個の行き先</Hl>を切り替える。行き先はどの画面でも変わらない。</>,
    exceptions:
      "行き先が5個を超えるなら使わず、タブやモーダルの展開型ナビゲーションレールに内包することを検討する。3個未満の場合はタブにする。モーダルなどで一時的に覆うのはよいが、ずっと隠さない。",
    accessibility:
      "操作可能(Operable) ― 項目には必ずラベルを付ける(アイコンだけは不可。1〜2語)。スクリーンリーダーの使用中は、スクロールでバーを隠さない。",
    useCases: [
      "主なページが3〜5個あるモバイル/タブレットの製品で使う(単一のタスクには使わない)",
      "行き先が5個を超えるなら、タブやモーダルの展開型ナビゲーションレールを検討する",
      "行き先が3個未満ならタブを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/navigation-bar/guidelines",
    refs: [
      { label: "Navigation bar", url: "https://m3.material.io/components/navigation-bar/guidelines" },
    ],
    confirmedNote: "使用法・バリエーション(ベースライン/フレキシブル)・配置・状態の保持/リセット・インタラクションとスタイル・アクセシビリティ(ラベル要件・テキスト拡大)の各セクションは2026-09時点で公式ページ本文(m3.material.io「Navigation bar」のガイドライン)を確認済み。具体的な高さなどのspecs数値は未確認。",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={20 + i * 27} cy="13" r="5" fill={i === 0 ? "#2F7D6E" : "none"} stroke="#2F7D6E" strokeWidth="1.4" />
        ))}
      </svg>
    ),
    illustrationNote: "画面下部のタブバー(概念図・系列識別色)。上部のアプリバーは別のコンポーネント",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA Landmark Regions(ナビゲーション領域)/ WCAG 1.4.11 / 2.5.8 / 2.5.5 / 3.2.3",
    term: "ナビゲーション領域(WAI-ARIAの役割)",
    color: "#A3821F",
    position: <>ナビゲーションのリンクのまとまりを、<Hl>1つの領域(目印)として支援技術に伝える</Hl></>,
    size:
      "専用の数値基準はなく、一般のターゲットサイズの基準がかかる。2.5.8(レベルAA)は24×24 CSSピクセル以上、2.5.5(レベルAAA)は44×44 CSSピクセル(どちらも例外あり。詳しくは「ボタン」ページ)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、選択中の項目を示す見た目は3:1以上のコントラスト比にする。",
    glossary: [
      { term: "3.2.3 Consistent Navigation・レベルAA", desc: "複数のページで繰り返し出るナビゲーションを、いつも同じ順番で並べること。利用者が自分で並びを変えた場合は除く。" },
    ],
    stance:
      <>ナビゲーションのリンクのまとまりを領域として示し、1ページに複数あるなら別々の名前を付ける。<Hl>全ページで項目を同じ順番に並べる</Hl>(3.2.3)。画面拡大や読み上げで使う人が、位置を覚えて素早く見つけられるようにするため。</>,
    exceptions:
      "リンクがほかのナビゲーション領域とまったく同じ場合だけ、同じ名前でよい。それ以外は別の名前が要る。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 領域として示すこと、ターゲットサイズ(2.5)、非テキストのコントラスト(1.4.11、知覚可能)。3.2.3は「理解可能(Understandable)」の予測可能(3.2)。",
    useCases: [],
    searchHint: "unique label",
    url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/",
    refs: [
      { kind: "apg", label: "APG: Landmark Regions", url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { kind: "sc", level: "AAA", label: "2.5.5 ターゲットのサイズ(高度)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html" },
      { kind: "sc", level: "AA", label: "3.2.3 一貫したナビゲーション", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html" },
    ],
    confirmedNote: "3.2.3はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="26" viewBox="0 0 120 26">
          <rect x="1" y="1" width="118" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="17" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ナビゲーション領域</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、領域の目印(役割)の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Basic Patterns for Mobile Navigation: A Primer",
    term: "Tab bar",
    color: "#7A4F7E",
    position: <>上と下のどちらに置くかで一長一短があり、<Hl>選択肢が少ない場合に向く</Hl>(数値基準ではなく使い分けの指針)</>,
    size: <span><NoData>数値基準なし。</NoData>選択肢が5個を超えると、バーに収めながら十分な押せる範囲を保つのが難しい。</span>,
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      <>上部のバーは画面上部の貴重な場所を取り、下部のタブバーはスクロールしても出続ける。<Hl>どちらも選択肢の少ないアプリ向け</Hl>。</>,
    exceptions:
      "ロゴ・検索・アカウントのリンクと並べると、場所の取り合いになる。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、画面の領域と押せる範囲の取り合いにもとづく使い分けの指針。",
    useCases: [
      "選択肢が少ない(4〜5個程度まで)場合に使う",
      "いつも出しておきたいなら、プラットフォームの慣習に沿った配置を検討する",
      "ロゴ・検索・アカウントのリンクなどと並べるなら、優先度を検討する",
    ],
    searchHint: "relatively few navigation options",
    url: "https://www.nngroup.com/articles/mobile-navigation-patterns/",
    refs: [
      { label: "Basic Patterns for Mobile Navigation: A Primer", url: "https://www.nngroup.com/articles/mobile-navigation-patterns/" },
    ],
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
  if (!items || !items.length) return <NoData>―</NoData>;
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

function NavBarSwatch() {
  const items = ["ホーム", "検索", "通知", "設定"];
  return (
    <div style={{ width: 260, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 8px", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 8 }}>
        {items.map((label, i) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", border: `1.6px solid ${i === 0 ? "#3A4FCF" : "#B7BCDA"}`, background: i === 0 ? "#3A4FCF" : "none" }} />
            <span style={{ fontSize: 9, color: i === 0 ? "#3A4FCF" : "#666D93", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>{label}</span>
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
        <span style={styles.columnTitle}>上部のバーはアプリバー</span>
      </div>
      <p style={styles.columnIntro}>
        戻るボタン・画面タイトル・関連する操作を持つ上部のバー(Appleの呼び名: ナビゲーションバー)は、このページのタブバーとは別のコンポーネント。Googleのアプリバーが対応し、4系列の比較は「アプリバー」のページにある。
      </p>
      <a href="/components/navigation/app-bar" style={styles.linkCard}>
        <div style={styles.linkCardTitle}>アプリバー ↗</div>
        <div style={styles.linkCardDesc}>戻るボタン・画面タイトル・関連操作を示す上部バーの4系列比較</div>
      </a>
    </div>
  );
}

/* 名前の対応と、上部・下部の使い分け(No.041) */
const NAME_MAP = [
  { sys: "Apple", name: "Tab bar", note: "iOSは画面の下部、iPadOSは画面の上部近く。上部の「Navigation bar」はアプリバーのこと" },
  { sys: "Google", name: "Navigation bar", note: "画面の下部。コンパクト・中サイズの画面向け" },
  { sys: "NN group", name: "Tab bar", note: "アプリの下部。サイトの上部に主な項目を並べるものは「Navigation bar」と呼び、別のもの" },
];
const POSITION_ROWS = [
  ["主な使われ方", "サイトの上部に主な項目を並べる(デスクトップ由来)", "アプリの主な場所を切り替える"],
  ["スクロールしたとき", "消えることが多い(上部に固定する型や、上に戻すと再び出る型もある)", "常に表示される"],
  ["向いている場面", "主な項目が少ないサイト", "主な場所が3〜5か所のアプリ"],
  ["懸念点", "画面の上の大事な場所をとる。項目が多いと収まらない", "項目が5個を超えると、押せる大きさを保てない"],
];

function NameAndPosition() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>呼び名の違いと、上部・下部の置き場所</h2>
      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <table style={styles.npTable}>
          <thead><tr>{["系列", "呼び名", "メモ"].map((h) => (<th key={h} style={styles.npTh}>{h}</th>))}</tr></thead>
          <tbody>{NAME_MAP.map((r) => (<tr key={r.sys}><td style={{ ...styles.npTd, fontWeight: 700, whiteSpace: "nowrap" }}>{r.sys}</td><td style={styles.npTd}>{r.name}</td><td style={styles.npTd}>{r.note}</td></tr>))}</tbody>
        </table>
      </div>
      <h3 style={styles.npSub}>主な項目のバーを上部に置く場合と、下部に置く場合(NN group)</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.npTable}>
          <thead><tr>{["", "上部のバー", "下部のバー(タブバー)"].map((h) => (<th key={h} style={styles.npTh}>{h}</th>))}</tr></thead>
          <tbody>{POSITION_ROWS.map((r) => (<tr key={r[0]}><td style={{ ...styles.npTd, fontWeight: 700, whiteSpace: "nowrap" }}>{r[0]}</td><td style={styles.npTd}>{r[1]}</td><td style={styles.npTd}>{r[2]}</td></tr>))}</tbody>
        </table>
      </div>
      <p style={styles.npNote}>どちらの場合も、項目が多いときに横にスクロールさせると、隠れた項目は見つけてもらいにくくなる。バーをその画面の主な場所にし、補助の項目や検索に場所を割きすぎないこと、アイコンには文字のラベルを付けることも、NN groupは勧めている。</p>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の下などに常に表示し、アプリの主な場所(3〜5か所)を切り替えるバー";
const ABOUT = [
  { k: "目的・役割", v: "アプリのいちばん上の階層の行き先を常に見せ、1回で遷移できるようにする" },
  { k: "呼び名", v: "Googleの呼び名はナビゲーションバー(Navigation bar)" },
  { k: "よく使われる場面", v: "SNS・ショッピングアプリの「ホーム・検索・通知・マイページ」" },
  { k: "似たコンポーネント", v: <>同じ画面の中の内容を切り替えるなら<PageLink to="/components/navigation/tabs">タブ</PageLink>、行き先が多いときは<PageLink to="/components/containment/drawer">ドロワー/サイドナビ</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "行き先はいくつまで置ける?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "3〜5個。5個を超えるならモーダルのナビゲーションレール、3個未満ならタブを使う" },
      { who: "Apple", color: "#C2542A", t: "数の上限は示さない。少ないほど遷移しやすいので増やしすぎず、「その他(More)」に溢れさせない" },
      { who: "NN group", color: "#7A4F7E", t: "数値の上限はないが、5個を超えると十分な押せる範囲を保ちにくい。選択肢の少ないサイト・アプリ向き" },
    ],
    tip: "5個までにしておけば3系列のどれとも食い違わない。行き先が増えるなら、Appleはサイドバーの形に切り替えられるタブバー、Googleはナビゲーションレールやドロワーへ移す、という逃がし先も決めておく。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "主な行き先は3〜5個", d: "", who: "Google(5個までならApple・NN groupとも食い違わない)" },
  { n: 2, t: "3個未満なら使わない", d: "タブを使う", who: "Google" },
  { n: 3, t: "行き先が増えたときの逃がし先を決めておく", d: "サイドバー(Apple)、ナビゲーションレールやドロワー", who: "Google" },
];

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
            <span>コンポーネント / タブバー</span>
            <span>SPEC No. 015</span>
          </div>

          <h1 style={styles.title}>タブバー</h1>
          <SummaryCard keyPoints={KP}
            image={<><NavBarSwatch /></>}
            imageNote={<>主要な行き先(Googleは3〜5個)を常設で切り替えるバー。</>}
            lead={LEAD}
            rows={ABOUT}
          />


          <SplitSection splits={SPLITS} />



          <NameAndPosition />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>AppleのTab barとGoogleのNavigation bar(このページのタブバー)は同じ役割</strong>(画面下部に常にあり、アプリの主な場所を切り替える)。違いは数の決め方で、Appleは上限を示さず「少ないほどよい」とし、<strong>Googleは3〜5個</strong>と下限・上限を明記する。どちらも<strong>ラベルは必須</strong>(アイコンだけにしない)。
            </p>
            <p style={styles.synthesisText}>
              NN groupも、選択肢の少ないアプリ向けとする点で一致する。W3Cは見た目ではなく、<strong>ナビゲーションの領域として示し、全ページで同じ順番に並べる</strong>ことを求める。
            </p>
            <p style={styles.synthesisText}>
              戻るボタンとタイトルを持つ上部のバーは別のコンポーネントで、<a href="/components/navigation/app-bar" style={{ color: "#3A4FCF" }}>アプリバー</a>のページで比べている。
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
                {s.useCases.length > 0 && <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>}
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

          <TopBarPointerSection />

          <RelatedPages paths={["/components/navigation/tabs-vs-segmented", "/components/navigation/tabs", "/components/containment/drawer", "/components/navigation/app-bar", "/components/communication/badge"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["ナビゲーション"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  npNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 10px" },
  npSub: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "8px 0 8px" },
  npTable: { width: "100%", minWidth: 640, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457", marginBottom: 10 },
  npTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  npTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
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
  columnCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 20px 20px", marginBottom: 22 },
  columnHeadRow: { display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12, flexWrap: "wrap" },
  columnLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, background: "#EEF1FA", padding: "2px 8px", borderRadius: 3 },
  columnTitle: { fontSize: 15, fontWeight: 700, color: "#171B36" },
  columnIntro: { fontSize: 12.5, lineHeight: 1.7, color: "#2E3457", margin: "0 0 14px" },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#666D93" },
};
