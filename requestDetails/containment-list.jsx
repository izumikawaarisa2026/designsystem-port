import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / リスト」ページ。
 * テキスト・画像を縦に連続して並べ、項目の一覧性・比較のしやすさを重視する
 * コンテナの4系列比較。「カード」ページとは、ブラウジング型の閲覧(カード)か、
 * 検索・比較を重視した一覧(リスト)かという使い分けの関係にある。
 *
 * W3C(MDNのlist role/listitem role解説)/ Nielsen Norman Group(Card View vs.
 * List View)は公式ページ・記事本文を直接取得して確認済み(2026-09)。
 * Google(Material Design 3 Lists)はユーザー提供の公式ドキュメント(list.docx)
 * により2026-09に直接確認・全面更新(M3 Expressiveの「表現力豊かなリスト」・
 * スロット構造・選択モードなど)。Apple(HIG Lists and Tables)は公式サイトが
 * クライアント側レンダリングのSPAで本文を直接取得できなかったため、検索結果による
 * 間接確認(2026-09)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Lists and Tables",
    term: "List(Lists and tables)",
    color: "#C2542A",
    position: "グループや階層に分かれたデータを、行の形で並べて見せるコンポーネント。選択・追加・削除・並べ替えにも対応できる",
    size: "Lists and tablesのページにリスト固有の数値(pt)はない。目安はAppleの一般の押せる範囲(iOS/iPadOSで既定44pt・最小28pt。ボタンのページ)(AI解釈)。",
    colorInfo: <span><NoData>記載なし。</NoData>macOSには、行の背景色を交互に変えて大きな表を使いやすくする枠付きのスタイルがある。</span>,
    stance:
      "グループや階層に分かれたデータを表すコンポーネントで、選択・追加・削除・並べ替えにも対応できる。行の形は文字を読みやすく、ざっと見るのに向くため、文字はリストやテーブルで見せる(大きさがばらばらの項目や画像が多いならコレクションを検討)。選んだときのフィードバックは、別の画面に進むのか、状態が切り替わるのかで変え、階層を進むリストでは選んだ行を強調し続ける。項目の文字は短くし、長い内容はタイトルだけを並べて詳細の画面で見せる。",
    exceptions:
      "iOS/iPadOSでは、項目を選ぶ前に編集モードに入る。並べ替えだけでもできると喜ばれる。iOS・iPadOS・visionOSでは、情報ボタン(行の中では詳細開示ボタン)は行の追加情報を見せるためだけに使い、階層を進むには開示インジケーターを使う。行の末尾に開示インジケーターのような操作がある表には、索引(アルファベットの縦並び)を付けない(どちらも末尾にあり、誤操作しやすいため)。",
    accessibility:
      <span><NoData>記載なし。</NoData></span>,
    scenarios: [
      "文字の項目を、ざっと見やすい行の形で一覧表示したい場面",
      "階層をたどって設定などを選ばせたい場面(iOSの設定アプリのように)",
      "大きさがばらばらの項目や画像が多い場合は、コレクションを検討する",
    ],
    useCases: [
      "―(支援技術についての記載はない)",
    ],
    searchHint: "Provide appropriate feedback",
    url: "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables",
    refs: [
      { label: "Lists and Tables", url: "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables" },
    ],
    confirmedNote: "HIGのページデータ(Lists and tablesのJSON)を直接取得して本文を確認(2026-10)。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        {[13, 30, 47].map((y) => (
          <g key={y}>
            <rect x="8" y={y} width="104" height="13" rx="2" fill="#F8F9FD" />
            <text x="14" y={y + 9.5} fontSize="7.5" fill="#454C78" fontFamily="Jost, Noto Sans JP">項目</text>
          </g>
        ))}
      </svg>
    ),
    illustrationNote: "行として並ぶリスト/テーブル(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Lists(表現力豊かなリスト / ベースライン)",
    term: "List",
    color: "#2F7D6E",
    position: "文字・画像を縦に並べた索引。特定の項目を見つけて操作するために使う。2025年12月のM3 Expressiveで「表現力豊かなリスト」が加わった",
    size: "項目の高さは、中の最も高い要素で56dp・72dp・88dpのどれかに決まる。中央揃えが基本だが、高さが88dp以上か、3行以上の文字を含むなら上揃え。スロットの中のターゲットサイズは48×48dp以上。",
    colorInfo: "色の値はデザイントークンで実装する。項目に画像があるなら、内容にもとづく配色でコンテナの色を変えることを検討する。",
    glossary: [
      { term: "表現力豊かなリスト / リスト(ベースライン)", desc: "2025年12月のM3 Expressiveで加わった「表現力豊かなリスト」は、区切られた見た目・選択状態の強調・柔軟なスロットに対応し、新しいデザインに勧める。従来の「リスト(ベースライン)」も使えるが、これらには対応しない。" },
      { term: "先頭 / コンテンツ / 末尾スロット", desc: "項目の3つの領域。先頭にはアバター・アイコン・選択コントロールなど、コンテンツにはラベル・補足の文など、末尾には操作の要素や選択コントロールなどを置ける。" },
    ],
    stance:
      "文字と画像を縦にまとめたもので、読みやすさを重視して作られている。特定の項目を見つけて、それをもとに行動できるようにする。選択モードはリストごとに1つだけで、単一選択にはラジオボタン、複数選択にはチェックボックスやスイッチが合う。",
    scenarios: [
      "特定の項目を見つけて操作させる、縦の索引を作りたい場面",
      "中〜拡張のブレークポイントで、リストと詳細を並べて見せたい場面",
      "広い画面では、カルーセルなど同じ目的のほかのコンポーネントへの置き換えも検討する",
    ],
    exceptions:
      "選択モードはリストごとに1つだけで、単一選択と複数選択を同時には持てない。単一選択にチェックボックス、複数選択にラジオボタンを使わない。先頭・コンテンツ・末尾のスロットは既定ではアクセスできず、実装には独自のコードが要る。",
    accessibility:
      "操作可能(Operable)・知覚可能(Perceivable) ― 操作が複数ある項目では、個々の操作だけが選べ、項目全体は選べない。選択状態は色だけでなく、ラジオボタン/チェックボックス、アイコン、下線など色以外の手がかりでも示す。",
    useCases: [
      "リスト項目に移動できるようにする",
      "リスト項目を選択できるようにする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/lists/guidelines",
    refs: [
      { label: "Lists(表現力豊かなリスト / ベースライン)", url: "https://m3.material.io/components/lists/guidelines" },
    ],
    confirmedNote: "使用法・バリエーション(表現力豊かなリスト/ベースライン)・スロット構造・適応型デザイン・行動(選択モード・スワイプ・展開折りたたみ)・インタラクションとスタイル・ユースケースの各セクションは、M3の公式ページ本文(m3.material.io「Lists」のガイドライン)で2026-09に直接確認・反映済み。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        {[13, 30, 47].map((y) => (
          <g key={y}>
            <circle cx="16" cy={y + 6.5} r="5" fill="#EAF3F1" />
            <rect x="28" y={y + 2} width="80" height="9" rx="2" fill="#EAF3F1" />
          </g>
        ))}
      </svg>
    ),
    illustrationNote: "画像+テキストの縦方向インデックス(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.3.1 / WAI-ARIA ― list role / listitem role / APG Listbox",
    term: "list・listitem(WAI-ARIAのロール)/ HTMLのul・ol・li",
    color: "#A3821F",
    position: "role=\"list\" + role=\"listitem\"(またはHTMLのul/ol + li)で示す、操作しない項目の集まり",
    size: "専用の数値基準はない。項目の中の操作要素には一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "専用の色の基準はない。区切り線などには1.4.11(非テキストのコントラスト)がかかり得る。",
    stance:
      <>listロールは0個以上のlistitemだけを含む入れ物で、支援技術にリストの構造を伝える。<Hl>可能な限りHTMLのセマンティック要素</Hl>(順序がない場合はul+li、順序が重要な場合はol+li)を優先し、ARIAのlist/listitemは、HTMLを直接変えられない場合やJavaScriptで後からアクセシビリティを加える場合だけに使う。</>,
    scenarios: [
      "支援技術にリストの構造をはっきり伝えたい場面(特にHTMLを直接変えられない場合)",
      "項目を選べるリストを作る場面(APGのListboxパターン。list/listitemは読むだけの一覧用)",
    ],
    exceptions:
      "ARIAのlistは順序あり/なしを区別しないため、順序に意味があるならHTMLのol要素を使う。タブとして働くリストには、list/listitemではなくtablist/tab/tabpanelを使う。",
    accessibility:
      "知覚可能(Perceivable) ― 中心は、見た目で伝わる一覧の構造を支援技術にも伝えること(1.3.1 情報及び関係性)。HTMLの意味のある要素(ul/ol/li)を使えば構造は自動で伝わる。ARIAはHTMLを直接変えられない場合の代わり。",
    useCases: [
      "できるだけHTMLのul/ol + liを使い、ARIAのlist/listitemはHTMLを変えられない場合の代わりにする",
      "順序に意味があるなら、ul(順序なし)ではなくol(順序あり)を使う",
      "タブとして働くリストには、list/listitemではなくtablist/tab/tabpanelを使う",
      "項目を選べるリストはAPGのListboxパターン(role=\"listbox\"/\"option\")で作る。list/listitem(ul/ol/li)は読むだけの一覧用",
    ],
    searchHint: "listitem",
    url: "https://www.w3.org/TR/wai-aria-1.2/#list",
    refs: [
      { label: "WAI-ARIA: list", url: "https://www.w3.org/TR/wai-aria-1.2/#list" },
      { label: "WAI-ARIA: listitem", url: "https://www.w3.org/TR/wai-aria-1.2/#listitem" },
      { kind: "sc", level: "A", label: "1.3.1 情報及び関係性", url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
      { kind: "apg", label: "APG: Listboxパターン", url: "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" },
      { kind: "mdn", label: "listロール", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/list_role" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="30" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="list"</text>
          <text x="60" y="44" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="listitem"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Card View vs. List View",
    term: "List view(リスト表示)",
    color: "#7A4F7E",
    position: "複数の項目の並べ替え・比較がしやすく、場所を取らない表示(「カード」ページのカード表示との対比で判断する)",
    size: <span><NoData>数値基準なし。</NoData>リスト表示は場所を取らない。</span>,
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      <><Hl>リスト表示は、ソートが容易でスペース効率が高い</Hl>。カード表示は見た目の魅力が高く、関連する情報をまとめるのに向く。</>,
    scenarios: [
      "複数の項目を素早く比べ・並べ替える場面",
    ],
    exceptions:
      "複数の項目を素早く比べ・並べ替えるならリスト、見た目を中心に見せ関連する情報をまとめたいならカードが向く。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、比べ・並べ替えやすさと見た目の訴求のどちらを優先するかという使い分けの指針。",
    useCases: [
      "複数の項目を素早く比べ・並べ替えるならリストを使う",
      "見た目の訴求や関連する情報のまとまりを重視するならカードを検討する",
    ],
    searchHint: "space efficient",
    url: "https://www.nngroup.com/videos/card-view-vs-list-view/",
    refs: [
      { label: "Card View vs. List View", url: "https://www.nngroup.com/videos/card-view-vs-list-view/" },
    ],
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        {[13, 30, 47].map((y) => (
          <rect key={y} x="8" y={y} width="104" height="13" rx="2" fill="#F1E9F1" />
        ))}
      </svg>
    ),
    illustrationNote: "ソート・比較に適した密なリスト表示(概念図・系列識別色)",
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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function ListSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden", textAlign: "left" }}>
      {["リスト項目 1", "リスト項目 2", "リスト項目 3"].map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderBottom: i < 2 ? "1px solid #E1E3F0" : "none" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#F0F4F8" }} />
          <span style={{ fontSize: 12, color: "#171B36" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "同じ種類の項目を縦に並べて、一覧で見せるコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "多くの項目を少ない場所に並べ、目で追って探したり比べたりしやすくする" },
  { k: "よく使われる場面", v: "設定の項目、連絡先、メールの受信一覧" },
  { k: "似たコンポーネント", v: <>1件ごとに画像や操作を大きく見せるなら<PageLink to="/components/containment/card">カード</PageLink>、項目ごとに複数の値を比べるなら<PageLink to="/components/containment/table">表</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "リストとカード、どちらで見せる?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "並べ替えて比べるならリスト(場所も取らない)。見た目で引きつけ、情報をまとまりで見せたいならカード" },
      { who: "Apple", color: "#C2542A", t: "文字は読み流しやすいリストや表で見せる。大きさがばらばらの項目や画像が多いなら、コレクション(格子状の並び)を検討する" },
      { who: "Google", color: "#2F7D6E", t: "リストは項目を見つけて操作するための並び。画面が小さいときは、カードの代わりにリストを検討する" },
    ],
    tip: "文字中心で数が多く、探したり比べたりする一覧はリスト、画像中心で眺めて選ぶ一覧はカードやコレクション、と中身で決めると3系列とも両立する。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "文字が中心で数が多く、探す・比べる一覧に使う", d: "", who: "AI解釈" },
  { n: 2, t: "画像が中心で眺めて選ぶ一覧は、カードにする", d: "", who: "AI解釈" },
  { n: 3, t: "並べ替えやすく、場所をとらないのが強み", d: "", who: "NN group" },
];

export default function ContainmentListPage() {
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
        <SidebarNav currentPath="/components/containment/list" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / リスト</span>
            <span>SPEC No. 027</span>
          </div>

          <h1 style={styles.title}>リスト</h1>
          <SummaryCard keyPoints={KP}
            image={<><ListSwatch /></>}
            imageNote={<>テキスト・画像を縦に連続して並べる索引。「カード」ページで比較した、ブラウジング型のカード表示とは使い分けの関係にある。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              リストの位置づけを最も明確に言語化しているのはNielsen Norman Groupで、<strong>「リスト表示はソートが容易でスペース効率が高い」</strong>という特性を、カード表示(視覚的訴求力・グループ化に強い)と対比させている。この対比は、そのまま「カード」ページとの使い分けの軸になる。
            </p>
            <p style={styles.synthesisText}>
              Apple・Googleとも、<strong>リストを「特定の項目を素早く見つけて操作するための索引」</strong>と位置づけている点は共通している。Appleはこれをテーブル(並べ替え可能な列・階層データ)まで拡張して扱っているのに対し、Googleは行の内容量に応じた1行/2行/3行というバリエーションで表現しており、対象とする粒度がやや異なる。
            </p>
            <p style={styles.synthesisText}>
              W3Cが強調する<strong>できるだけARIAのlist/listitemロールではなくHTMLのul/ol+liを使う</strong>という原則は、他のコンポーネントページではあまり見られない実装上の注意点だ。順序の有無(ul/ol)を区別できるのはHTMLのセマンティック要素側だけで、ARIAロールだけでは表現できないという技術的な限界も示されている。
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
                <div style={styles.labelCell}>推奨される使用シーン</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.scenarios ? <UseCaseList items={s.scenarios} /> : <span style={{ color: "#666D93" }}>―(該当する記載なし)</span>}</div>))}
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


          <RelatedPages paths={["/components/containment/card", "/components/containment/table", "/components/containment/accordion"]} />

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
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
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
