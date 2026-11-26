import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, hasRow, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / カード」ページ。
 * 関連情報をまとめ、境界線・影・塗りつぶしなどで背景と視覚的に区別するコンテナの
 * 4系列比較。
 *
 * W3C(カードの決まりはなく、一般の達成基準のみ。2026-11 ⑦本人レビューNo.050で記事の役割の内容を外した)/ Nielsen Norman Group
 * (Cards: UI-Component Definition、記事本文を直接取得)は2026-09に確認済み。
 * Apple(HIG Boxes)・Google(Material Design 3 Cards)は公式サイトがクライアント側
 * レンダリングのSPAで本文を直接取得できなかったため、検索結果による間接確認(2026-09)。
 * Appleには「カード」という名称の専用コンポーネントは見当たらず、最も近い概念として
 * 「Boxes」(論理的に関連する情報のグループ化)を掲載している。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Boxes",
    term: "Box(Cardという名前のコンポーネントはない)",
    color: "#C2542A",
    position: <><Hl>関連する情報・コンポーネントを見た目でまとめるコンテナ</Hl>(「カード」というコンポーネントはない)</>,
    size: <NoData>記載なし</NoData>,
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      "ボックスは、関連する情報やコンポーネントをまとめて、ほかの部分と見分けられるようにする入れ物。既定では見える枠線か背景色で区切り、タイトルを付けることもできる。Googleのカードのような「タップして詳細へ進む要約」という用途のコンポーネントはない。ボックスは入れ物の画面に比べて小さく保つ(大きくなるほど、まとまりを示す効果が薄れる)。ボックスの中をさらに分けたいときは、ボックスを入れ子にせず、余白と揃えで示す。タイトルは中身を表す短い言葉にする(VoiceOverの利用者が中身を予測しやすくなる)。iOS・iPadOSでは2番目・3番目の背景色を使う。",
    scenarios: [
      "関連する情報・コンポーネントを見た目でまとめたい場面",
      "「カード」のような押せる要約が要るなら、標準のコンポーネントを組み合わせて代わりにする場面",
    ],
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility:
      <NoData>記載なし</NoData>,
    useCases: [
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/boxes",
    refs: [
      { label: "Boxes", url: "https://developer.apple.com/design/human-interface-guidelines/boxes" },
    ],
    confirmedNote: "「カード」という名前のコンポーネントはなく、最も近いBoxesを載せている。HIG Boxesの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <rect x="10" y="10" width="100" height="20" rx="2" fill="#F0F4F8" />
        <rect x="10" y="36" width="70" height="6" rx="2" fill="#F0F4F8" />
        <rect x="10" y="48" width="90" height="6" rx="2" fill="#F0F4F8" />
      </svg>
    ),
    illustrationNote: "論理的に関連する情報をまとめるBoxes(概念図)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Cards(Elevated / Filled / Outlined)",
    term: "Card(Elevated・Filled・Outlined)",
    color: "#2F7D6E",
    position: "1つの主題の内容と操作をまとめ、境界線・影・塗りのどれかで背景と分けるコンテナ。スタイルは3種類",
    size: "3種類とも容器の角丸はMedium(12dp)。影はElevatedがLevel 1、FilledとOutlinedはLevel 0、Outlinedの線の太さは1dp(Jetpack Composeのトークン)。",
    colorInfo: "色の値はデザイントークンで実装する。",
    glossary: [
      { term: "Elevated / Filled / Outlined", desc: "背景との分かれ方は、Filled(塗り。控えめ)< Elevated(影。Filledより強いがOutlinedほどではない)< Outlined(輪郭線。ほかの2種類より強調できる)の順。3種類とも読みやすさ・機能は同じで、見た目(スタイル)だけで選ぶ。強調の違いは見た目の違いで、機能の違いではない。" },
    ],
    stance:
      <>カードは、<Hl>単一の主題に関するコンテンツとアクションをまとめて表示する</Hl>コンポーネント。関係が深く行動につながる情報を、要素の階層がはっきり分かる形で、拾い読みしやすくまとめる。スタイルは立体(Elevated)・塗り(Filled)・輪郭線(Outlined)の3種類で、読みやすさ・機能は同じ。選ぶ基準は見た目だけ。画像の上に文字やアイコンを重ねるのは勧めず、必要ならコントラストを確保し、半透明の境界線などで配慮する。絞り込み・並べ替えの選択肢はカードの集まりの外に置く。ドラッグやスワイプでの並べ替え・削除などには、メニューから選ぶような単一ポインターの代わりの手段が必須。例外: 必須なのはコンテナだけで、ほか(内容のブロック・区切り・メディア)はすべて任意。画面が小さいなら、カードの代わりにリストを検討する。</>,
    scenarios: [
      "音楽アルバムや今後の予定など、詳しい情報やナビゲーションへの入り口にする場面",
      "グリッド・縦のリスト・カルーセルなどで、複数のカードをまとめて出す場面",
      "間隔・見出し・区切り線だけで簡単な階層を組めるなら、カードに押し込まない",
    ],
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility:
      "操作可能(Operable)・堅牢(Robust) ― 直接操作できるカードはボタンかリンクの役割を持つ。操作を起こさないカード(ただの入れ物)には役割を付けない。装飾の画像はスクリーンリーダーから隠す。",
    useCases: [
      "カードとその中の要素へ移動できるようにする",
      "押せるカードは、押したことが見た目で分かるようにする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/cards/guidelines",
    refs: [
      { label: "Cards(Elevated / Filled / Outlined)", url: "https://m3.material.io/components/cards/guidelines" },
    ],
    confirmedNote: "使用法・解剖学(構成要素)・行動(拡大・ナビゲーション・ジェスチャー)・インタラクションとスタイル・ユースケースの各セクションは、M3の公式ページ本文(m3.material.io「Cards」のガイドライン)で2026-09に直接確認・反映済み。具体的なdpのサイズ数値は含まれておらず未確認。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" style={{ filter: "drop-shadow(0 2px 3px rgba(47,125,110,0.25))" }} />
        <rect x="10" y="10" width="100" height="20" rx="2" fill="#EAF3F1" />
        <rect x="10" y="36" width="70" height="6" rx="2" fill="#EAF3F1" />
        <rect x="10" y="48" width="90" height="6" rx="2" fill="#EAF3F1" />
      </svg>
    ),
    illustrationNote: "影で背景から分離するElevated cardの例(分かれ方はFilledより強く、Outlinedほどではない。概念図)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.5.8 / 2.5.5 / 1.4.11",
    term: <NoData>カードの決まりはない</NoData>,
    color: "#A3821F",
    position: <NoData>W3Cはカードを定めていない</NoData>,
    size: "専用の数値基準はない。押せるカードにも一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "専用の色の基準はない。境界線などには1.4.11(非テキストのコントラスト)がかかり得る。",
    stance: <NoData>カードとしての考え方は記載なし。一般の達成基準がかかる。</NoData>,
    exceptions: <NoData>記載なし</NoData>,
    accessibility:
      "操作可能(Operable)・知覚可能(Perceivable) ― 押せるカードの大きさ(2.5.8/2.5.5)と、境界線などのコントラスト(1.4.11)。",
    useCases: [],
    searchHint: "",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
    refs: [
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { kind: "sc", level: "AAA", label: "2.5.5 ターゲットのサイズ(高度)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="38" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">カードの決まりなし</text>
        </svg>
      </div>
    ),
    illustrationNote: "カードの視覚デザインの規定はない",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Cards: UI-Component Definition",
    term: "Card",
    color: "#7A4F7E",
    position: "関連する情報をまとめた、要約+詳細への入り口。ブラウジング(見て回る閲覧)に向くが、検索・比較には向かない(数値基準ではなく使い分けの指針)",
    size: <span><NoData>数値基準なし。</NoData>高さは可変・幅は固定の柔軟なレイアウトを勧める。</span>,
    colorInfo: <span><NoData>数値基準なし。</NoData>影・境界線・背景色で、押せることを見た目で示す。</span>,
    stance:
      <>トランプのカードのような見た目の、大きさが柔軟な入れ物に関連する情報をまとめたパターン。すべての情報ではなく、詳細ページへの入り口になる要約(スナップショット)を示す。<Hl>検索(一覧しにくい)や、複数の項目の比較(レイアウトが予測しにくく比べにくい)には向かない</Hl>。写真ギャラリーのような同じ種類の内容には、通常グリッドのほうが向く。</>,
    scenarios: [
      "種類の違う内容が混ざるダッシュボードなど、見て回る閲覧に使う場面",
    ],
    exceptions:
      <NoData>記載なし</NoData>,
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、使い分けの指針。影・境界線・背景色で押せることを示すと、押せる範囲も大きくなり、使いやすさが上がる。",
    useCases: [
      "種類の違う内容が混ざる、見て回る閲覧(ダッシュボードなど)に使う",
      "検索や複数の項目の比較が主な目的ならリストを検討する",
      "写真ギャラリーなど同じ種類の内容にはグリッドを検討する",
    ],
    searchHint: "snapshot",
    url: "https://www.nngroup.com/articles/cards-component/",
    refs: [
      { label: "Cards: UI-Component Definition", url: "https://www.nngroup.com/articles/cards-component/" },
    ],
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <rect x="10" y="10" width="100" height="20" rx="2" fill="#F1E9F1" />
        <rect x="10" y="36" width="70" height="6" rx="2" fill="#F1E9F1" />
        <text x="10" y="58" fontSize="7.5" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">続きを読む &gt;</text>
      </svg>
    ),
    illustrationNote: "要約+詳細への入り口となるカード(概念図)",
  },
];
markNeg(SOURCES);

function InfoBox({ label, accent, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent ? { borderLeftColor: accent } : {}) }}>
      <span style={styles.exceptionLabel}>{label}</span>
      <div style={styles.exceptionText}>{children}</div>
    </div>
  );
}

function UseCaseList({ items }) {
  if (!items || !items.length) return <NoData>記載なし</NoData>;
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

function CardSwatch() {
  return (
    <div style={{ width: 220, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 8, padding: "12px 14px", boxShadow: "0 2px 8px rgba(23,27,54,0.08)", textAlign: "left" }}>
      <div style={{ width: "100%", height: 60, borderRadius: 4, background: "#F0F4F8", marginBottom: 10 }} />
      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#171B36", marginBottom: 4 }}>見出しテキスト</div>
      <div style={{ fontSize: 11, color: "#666D93" }}>要約テキストがここに入る…</div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "1つの話題に関わる情報と操作を、1つの枠にまとめて見せるコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "関連する情報をひとまとまりに見せ、詳しい画面への入り口にする" },
  { k: "よく使われる場面", v: "商品や記事の一覧、ダッシュボードの項目、SNSの投稿" },
  { k: "似たコンポーネント", v: <>同じ形の項目を縦に並べて比べやすくするなら<PageLink to="/components/containment/list">リスト</PageLink>、行と列で比べるなら<PageLink to="/components/containment/table">表</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "カード(まとまりの入れ物)は、何のために使う?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "1つの主題についての内容と操作をまとめる。画面が小さいときは、カードの代わりにリストも検討する" },
      { who: "NN group", color: "#7A4F7E", t: "詳細への入り口になる要約。ざっと眺める閲覧に向き、検索や比べる作業には向かない" },
      { who: "Apple", color: "#C2542A", t: "カードというコンポーネントはなく、関連する情報をまとめるボックスがある。小さく保ち、入れ子にしない" },
    ],
    tip: "眺めて選んでもらう一覧(おすすめ・特集など)はカード、探したり比べたりする一覧はリストや表、と分けると3系列の考え方がつながる(「リスト」「表」ページ)。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "眺めて選ぶ一覧はカード、探す・比べる一覧はリストや表", d: "", who: "AI解釈" },
  { n: 2, t: "小さく保ち、入れ子にしない", d: "", who: "Apple" },
];


/* カードの並べ方(2026-11 ⑦本人レビューNo.050で追加。Googleの「Cards in collections」の要約) */
const LAYOUTS = [
  { k: "grid", t: "グリッド", when: "たくさんのカードを一覧で眺めてもらう(商品・写真・記事)", note: "画面が広いほど列を増やす。狭い画面ではリストも検討する", links: [["/tokens/layout-spacing", "レイアウト"], ["/tokens/adaptive", "レスポンシブデザイン"]] },
  { k: "list", t: "縦のリスト", when: "1列に並べ、上から順に読んでもらう(SNSの投稿・ニュース)", note: "比べる・探すのが目的なら、カードではなくリストや表にする", links: [["/components/containment/list", "リスト"], ["/components/containment/table", "表(データテーブル)"]] },
  { k: "carousel", t: "カルーセル", when: "関連するカードを横1列にまとめ、一部だけ見せる(おすすめ・特集)", note: "広い画面で、関連するカードをまとめるのにも使う", links: [["/components/containment/carousel", "カルーセル"]] },
];
function LayoutFig({ k }) {
  const c = (x, y, w, h) => (<rect key={x + "-" + y} x={x} y={y} width={w} height={h} rx="3" fill="#FFFFFF" stroke="#7E86AC" />);
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" aria-hidden="true">
      <rect x="0.5" y="0.5" width="119" height="71" rx="5" fill="#F3F6FA" stroke="#E1E3F0" />
      {k === "grid" && [8, 44, 80].flatMap((x) => [c(x, 8, 32, 25), c(x, 39, 32, 25)])}
      {k === "list" && [8, 30, 52].map((y) => c(10, y, 100, 16))}
      {k === "carousel" && <>{[10, 50, 90].map((x) => c(x, 14, 36, 44))}<path d="M60 66 L54 66 M60 66 L66 66" stroke="#2F7D6E" strokeWidth="1.4" /><circle cx="52" cy="66" r="1.6" fill="#2F7D6E" /><circle cx="60" cy="66" r="1.6" fill="#B7BCDA" /><circle cx="68" cy="66" r="1.6" fill="#B7BCDA" /></>}
    </svg>
  );
}
function CardLayouts() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>カードの並べ方(Google)</h2>
      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#454C78", margin: "0 0 12px" }}>カードは、まとめてグリッド・縦のリスト・カルーセルのどれかで並べられる。</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 }}>
        {LAYOUTS.map((l) => (
          <div key={l.k} style={{ border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><LayoutFig k={l.k} /></div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 4 }}>{l.t}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: "#2E3457", marginBottom: 4 }}>{l.when}</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.6, color: "#565D8A" }}>{l.note}</div>
            <div style={{ fontSize: 11.5, lineHeight: 1.6, color: "#565D8A", marginTop: 6, paddingTop: 6, borderTop: "1px solid #EEF0F7" }}>関連するページ: {l.links.map(([to, name], i) => (<span key={to}>{i > 0 && "・"}<PageLink to={to}>{name}</PageLink></span>))}</div>
          </div>
        ))}
      </div>
      <ul style={{ fontSize: 12, lineHeight: 1.75, color: "#2E3457", margin: "12px 0 0", paddingLeft: 18 }}>
        <li>並んだカードは同じ高さ(影の強さ)にそろえる。持ち上げてドラッグしているときだけ高くする。</li>
        <li>並べ替え・絞り込みの操作は、カードのまとまりの外に置き、すべてのカードにかける。</li>
        <li>カードの中に、横にスワイプする内容(画像のカルーセルなど)を入れない。カードの中をスクロールさせない。</li>
        <li>余白・見出し・区切り線で十分にまとまるなら、無理にカードにしない。</li>
      </ul>
    </section>
  );
}

export default function ContainmentCardPage() {
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
        <SidebarNav currentPath="/components/containment/card" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / カード</span>
            <span>SPEC No. 026</span>
          </div>

          <h1 style={styles.title}>カード</h1>
          <SummaryCard keyPoints={KP}
            image={<><CardSwatch /></>}
            imageNote={<>画像・見出し・要約テキストをまとめ、詳細への入り口となるコンテナ。境界線・影・塗りつぶしのいずれかで背景と区別する。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />

          <CardLayouts />



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              カードは、<strong>Googleが最も明確にコンポーネント化している</strong>。<strong>Appleには「カード」という専用のコンポーネントはない</strong>。近いのは関連する情報をまとめるBoxesで、タップで詳しい画面に進む要約という記載はない。Googleのカードは、関連する情報と操作をまとめる入れ物で、詳しい画面への入り口にも使える(カード全体を押せるようにするかは内容による)。
            </p>
            <p style={styles.synthesisText}>
              NN groupは、<strong>カードは眺めて選ぶ閲覧には向くが、検索や複数の項目の比較には向かない</strong>とする。カードを使う場面かどうかは、この使い分けで決める。
            </p>
            <p style={styles.synthesisText}>
              W3Cはカードについて定めていない。押せるカードには、ほかのコンポーネントと同じく<strong>ターゲットサイズ(2.5.8・例外あり)</strong>と、境界線などの<strong>非テキストのコントラスト(1.4.11)</strong>がかかる。
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
                {s.scenarios && <InfoBox label="推奨される使用シーン" accent="#2F7D6E"><UseCaseList items={s.scenarios} /></InfoBox>}
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
                <div style={styles.sourceStance}>{s.stance}</div>
                {hasRow(SOURCES, "exceptions") && <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>}
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
                <div style={styles.labelCell}>推奨される使用シーン</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.scenarios ? <UseCaseList items={s.scenarios} /> : <span style={{ color: "#666D93" }}>―(該当する記載なし)</span>}</div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                {hasRow(SOURCES, "exceptions") && (<>
                  <div style={styles.labelCell}>例外・許容ケース</div>
                  {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
                </>)}
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


          <RelatedPages paths={["/components/containment/list", "/components/containment/table", "/components/containment/carousel", "/components/communication/widget", "/tokens/elevation"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["情報の整理・一覧"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#666D93" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
