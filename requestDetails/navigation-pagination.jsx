import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Navigation / ページネーション」ページ。
 * 長いリスト・一覧を複数ページに分割し、番号や次/前で移動する仕組み。
 * Appleの「Page Controls」(ドット表示)は、少数の固定画面をページ送りする
 * パターンであり、検索結果一覧のような「番号付きページネーション」とは
 * 対象が異なる点に注意(このページでは両方を扱う)。
 *
 * W3C(WAI-ARIA)/ Nielsen Norman Groupは公式ページ・記事本文を直接取得して
 * 確認済み(2026-09)。
 * Apple(HIG)のPage Controlsページは公式サイトがクライアント側レンダリングのSPAで
 * 本文を直接取得できなかったため、検索結果による間接確認(2026-09)。
 * Google(Material Design 3)は、「Pagination」という名称の専用コンポーネントページが
 * 見当たらないことを検索で確認した(2026-09)。m3.material.ioはSPAのため、
 * 「存在しない」という結論はpending(間接確認)として扱う。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "該当コンポーネントなし(番号付きページネーションとしては)",
    term: <NoData>該当なし(近い部品: Page control)</NoData>,
    color: "#C2542A",
    notApplicable: true,
    urlSecondary: [{ label: "参考: Page Controls", url: "https://developer.apple.com/design/human-interface-guidelines/page-controls" }],
    position: "該当なし",
    size: "該当なし",
    stance: <>該当なし。関連: Page controls(ドット表示)は、少数の決まった画面を順に送る部品で、検索結果のような長さの変わる一覧を分ける番号付きのページ送りとは対象が違う(上の「ページ送りの種類と使い分け」)。ドットは順序のあるページの移動に使い、10個ほどを超えると数えにくいとしている。</>,
    exceptions: "該当なし",
    accessibility: "該当なし",
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    pending: true,
  },
  {
    key: "material",
    name: "Google",
    doc: "該当コンポーネントなし",
    term: <NoData>該当なし</NoData>,
    color: "#2F7D6E",
    notApplicable: true,
    position: "該当なし",
    size: "該当なし",
    stance: "該当なし(M3の部品の一覧にPaginationはない。長い一覧の分割は、リストや表などを組み合わせる想定とみられる。AI解釈)",
    exceptions: "該当なし",
    accessibility: "該当なし",
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    pending: true,
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA(nav landmark + aria-current、専用ウィジェットなし)",
    term: "navigation+aria-current=\"page\"(専用のロールなし)",
    color: "#A3821F",
    position: "role=\"pagination\"は存在しない。nav要素+リスト+aria-current=\"page\"の組み合わせで実装する",
    size: "ページネーション専用の数値基準はないが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)は各ページ番号のリンク/ボタンにも適用される。",
    glossary: [
      { term: "色", desc: "ページネーション専用の色基準はないが、1.4.11(非テキストのコントラスト)は現在ページを示す枠線・背景色などの視覚的要素に適用され得る。" },
      { term: "role=\"pagination\"は存在しない", desc: "WAI-ARIAには「ページネーション」という名前の専用ウィジェット・ロールは定義されていない。必要な部品(nav landmark、リスト、リンク/ボタン、aria-current)がすでに存在するため、それらを組み合わせて実装するのが一般的(AI解釈)。" },
    ],
    stance:
      "ページネーションには専用のARIAロールやパターンは定義されていない。代わりに、ラベル付きのnav要素(例: aria-label=\"Pagination\")でページ番号の一覧を囲み、各ページ番号に「3ページ目に移動」のような分かりやすいアクセシビリティ名を付け、現在のページにはaria-current=\"page\"を設定するという組み合わせで実装するのが一般的だ(AI解釈。専用のパターンがないため、既存の部品を組み合わせる)。W3Cの一次情報としては、WAI-ARIA仕様のaria-current、APGのLandmark Regions(navigationランドマーク)、WCAG 2.4.4(リンクの目的)がこの組み合わせの根拠になる。",
    exceptions:
      "現在のページ番号は、リンクではなく単なるテキスト(span等)として実装し、その要素にaria-current=\"page\"を設定することが多いとされている。単一ページアプリで画面遷移せずにコンテンツだけを切り替える場合は、切り替えをライブリージョンなどで支援技術に通知する配慮も必要。",
    accessibility:
      "知覚可能・堅牢 ― nav要素によるランドマーク、各リンクの分かりやすい名前、aria-current=\"page\"による現在位置の明示が中心。「前へ/次へ」ボタンのアイコンのみの表示には、テキストによるアクセシビリティ名を別途用意する必要がある。",
    useCases: [
      "ラベル付きのnav要素(例: aria-label=\"Pagination\")でページ番号の一覧を囲む",
      "各ページ番号に「○ページ目に移動」など分かりやすい名前を付ける",
      "現在のページにはaria-current=\"page\"を設定する(リンクにしない場合が多い)",
    ],
    searchHint: "",
    url: "https://www.w3.org/TR/wai-aria-1.2/#aria-current",
    refs: [
      { label: "WAI-ARIA: aria-current", url: "https://www.w3.org/TR/wai-aria-1.2/#aria-current" },
      { kind: "apg", label: "APG: Landmark Regions", url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/" },
      { kind: "sc", level: "A", label: "2.4.4 リンクの目的(コンテキスト内)", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html" },
      { kind: "mdn", label: "aria-current", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current" },
    ],
    confirmedNote: "WAI-ARIA仕様にpaginationという役割はなく、APGにも専用のパターンはない(2026-10に確認)。nav+リスト+aria-currentの組み合わせは、既存の部品を組み合わせる一般的な作り方です(AI解釈)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="24" viewBox="0 0 120 24">
          <rect x="1" y="1" width="118" height="22" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="15" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">nav[aria-label] + aria-current</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Alternatives to Pagination on Product-Listing Pages / Infinite Scrolling",
    term: "Pagination(ページ送り)",
    color: "#7A4F7E",
    position: "巨大な一覧には従来型ページネーションが向き、少数の一覧には代替案(もっと見るボタンなど)も検討に値する",
    size: "数値基準としては、無限スクロールが向くのは「おおよそ1ページ40件未満」程度の比較的少ない商品数の場合としている。",
    stance:
      <>Amazonのような巨大な商品数を持つサイトには、精密な位置制御ができる従来型のページネーションが適しているとしている。一方、商品数が比較的少なく強力な絞り込み機能がある場合は、無限ローディングや「もっと見る」ボタンといった代替案も選択肢になるとしている。<Hl>「もっと見る」ボタンは、ユーザーが自らの操作で次のセットを読み込む点で、自動で読み込まれる無限スクロールより望ましい</Hl>としている(ページ末尾のフッターに到達できなくなる問題を避けられるため)。</>,
    exceptions:
      "無限スクロールは、ユーザーが自分の閲覧位置を思い出しにくくなり、フッターのコンテンツに到達できなくなるという欠点があるとしている。一覧に「全件表示」の総数を明示し、読み込み済み件数・残り件数を伝えるべきとしている。ユーザーが「全て表示」に切り替えた場合は、その設定を尊重すべきとしている。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、ユーザーが自分の閲覧位置を把握し続けられるか(オリエンテーション)という使い分けの指針。一覧ページは「ポゴスティッキング」(一覧に戻ってまた個別ページに進む往復行動)を支えられるよう、戻ってきたときに元の位置を保持すべきとしている。",
    useCases: [
      "商品数が非常に多い一覧(大規模ECサイトなど)には従来型ページネーションを使う",
      "商品数が比較的少なく絞り込み機能が強い場合は無限ローディングや「もっと見る」ボタンも検討する",
      "総件数・読み込み済み件数・残り件数を明示する",
      "一覧に戻ったときに元のスクロール位置を保持する(ポゴスティッキング対応)",
    ],
    searchHint: "pogo sticking",
    url: "https://www.nngroup.com/articles/alternatives-pagination-listing-pages/",
    refs: [
      { label: "Alternatives to Pagination on Product-Listing Pages", url: "https://www.nngroup.com/articles/alternatives-pagination-listing-pages/" },
      { label: "Infinite Scrolling", url: "https://www.nngroup.com/articles/infinite-scrolling-tips/" },
    ],
    illustration: () => (
      <svg width="120" height="22" viewBox="0 0 120 22">
        <text x="10" y="15" fontSize="9" fill="#666D93" fontFamily="Jost, Noto Sans JP">&lt;</text>
        {[1, 2, 3].map((n, i) => (
          <text key={n} x={30 + i * 20} y="15" fontSize="9.5" fill={n === 1 ? "#171B36" : "#7A4F7E"} fontWeight={n === 1 ? "700" : "400"} textAnchor="middle" fontFamily="Jost, Noto Sans JP">{n}</text>
        ))}
        <text x="100" y="15" fontSize="9" fill="#666D93" fontFamily="Jost, Noto Sans JP">&gt;</text>
      </svg>
    ),
    illustrationNote: "従来型の番号付きページネーション(概念図・系列識別色)",
  },
];

function InfoBox({ label, accent, muted, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent && !muted ? { borderLeftColor: accent } : {}) }}>
      <span style={{ ...styles.exceptionLabel, ...(muted ? styles.mutedText : {}) }}>{label}</span>
      <div style={{ ...styles.exceptionText, ...(muted ? styles.mutedText : {}) }}>{children}</div>
    </div>
  );
}

function UseCaseList({ items, muted }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={{ ...styles.useCaseItem, ...(muted ? styles.mutedText : {}) }}>{it}</li>))}
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

function PaginationSwatch() {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13 }}>
      <span style={{ color: "#666D93" }}>&lt;</span>
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          style={{
            width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
            background: n === 1 ? "#3A4FCF" : "transparent",
            color: n === 1 ? "#FFFFFF" : "#565D8A",
            fontWeight: n === 1 ? 700 : 400,
          }}
        >
          {n}
        </span>
      ))}
      <span style={{ color: "#666D93" }}>&gt;</span>
    </div>
  );
}

const PAGINATION_TYPES = [
  {
    name: "番号付きページネーション",
    desc: "1・2・3のようにページ番号を並べ、任意のページへ直接移動できる形。検索結果一覧・商品一覧など、位置を把握しながら精密に移動したい場合に向く。",
    illustration: () => (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11 }}>
        {[1, 2, 3].map((n) => (
          <span key={n} style={{ width: 18, height: 18, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: n === 1 ? "#3A4FCF" : "#EEF1FA", color: n === 1 ? "#FFFFFF" : "#565D8A" }}>{n}</span>
        ))}
      </div>
    ),
  },
  {
    name: "ドット表示(Page Controls)",
    desc: "現在位置を小さなドットの並びで示す形。Appleが定義する、オンボーディングのような少数の固定画面向けのパターンで、番号は表示せず正確な位置よりも「だいたいどこにいるか」を伝える。",
    illustration: () => (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {[0, 1, 2, 3].map((i) => (<span key={i} style={{ width: i === 1 ? 8 : 6, height: i === 1 ? 8 : 6, borderRadius: "50%", background: i === 1 ? "#171B36" : "#D5D9EC" }} />))}
      </div>
    ),
  },
  {
    name: "もっと見るボタン / 無限スクロール",
    desc: "ユーザーの操作(ボタン)または自動でスクロールに応じて、次のセットを一覧の末尾に読み込む形。NN groupは、自動追加される無限スクロールよりも、ユーザーが操作する「もっと見る」ボタンの方が望ましいとしている。",
    illustration: () => (
      <div style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 14, border: "1.4px solid #7A4F7E", color: "#7A4F7E", fontSize: 10.5, fontFamily: "Jost, Noto Sans JP" }}>もっと見る</div>
    ),
  },
];

function PaginationTypesSection() {
  return (
    <div style={styles.typesCard}>
      <h2 style={styles.diagramTitle}>ページ送りの種類と使い分け</h2>
      <div style={styles.typesGrid}>
        {PAGINATION_TYPES.map((t) => (
          <div key={t.name} style={styles.typeItem}>
            <div style={styles.typeIllustration}>{t.illustration()}</div>
            <div style={styles.typeName}>{t.name}</div>
            <p style={styles.typeDesc}>{t.desc}</p>
          </div>
        ))}
      </div>
      <p style={styles.diagramNote}>
        この3種類は特定の1系列の公式分類ではなく、Apple(Page Controls)・W3C(番号付きページネーションの実装パターン)・Nielsen Norman Group(もっと見る/無限スクロールの比較)の内容を横断して整理したものだ。
      </p>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "長い一覧をページに分け、ページ番号などで移動できるようにする部品だ。";
const ABOUT = [
  { k: "目的・役割", v: "多くの結果を一定の数ずつに分け、今どこを見ているかと、ほかのページへの行き方を示す" },
  { k: "よく使われる場面", v: "検索結果、ネットショップの商品一覧、ブログの記事一覧" },
  { k: "似た部品との違い", v: <>同じ場所で項目を横に送るのは<PageLink to="/components/containment/carousel">カルーセル</PageLink></> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "今どのページにいるかを示す", d: "", who: "W3C: aria-current" },
  { n: 2, t: "専用の部品はない", d: "nav要素・リスト・リンクを組み合わせて作る", who: "W3C" },
  { n: 3, t: "AppleのPage controlsは別の部品", d: "少数の画面を点で送るもの", who: "Apple" },
];

export default function NavigationPaginationPage() {
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
        <SidebarNav currentPath="/components/navigation/pagination" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ページネーション</span>
            <span>SPEC No. 018</span>
          </div>

          <h1 style={styles.title}>ページネーション</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ(番号付きページネーション)"
            image={<><PaginationSwatch /></>}
            imageNote={<>ページ番号を並べ、任意のページへ直接移動できる。前後の矢印を併設することが多い。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <PaginationTypesSection />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>AppleとGoogleには、番号付きページネーションに当たる専用の部品はない</strong>(AppleのPage Controlsは、オンボーディングのような少数の画面をドットで送る別の部品)。
            </p>
            <p style={styles.synthesisText}>
              W3C(WAI-ARIA)にも<strong>専用のロールはなく</strong>、nav要素・リスト・リンク・aria-currentを組み合わせて作る。ページネーションは独立した部品というより、既存の部品を組み合わせる実装パターンとして扱われている。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは<strong>巨大な一覧には従来型ページネーション、少数の一覧には無限ローディングや『もっと見る』ボタンも検討</strong>という規模に応じた使い分けを示しており、単純に「ページネーション vs 無限スクロール」の二択ではない点が実務上重要だ。特に<strong>「もっと見る」ボタンは無限スクロールの欠点(フッターに到達できない)を避けられる</strong>という指摘は、実装の意思決定に直結する具体的な指針だ。
            </p>
          </div>
          <div className="dsp-mobile-only" style={styles.sourceList}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={{ ...styles.sourceName, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.name}</div>
                    <div style={{ ...styles.sourceDoc, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.doc}</div>
                  </div>
                </div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={{ ...styles.positionBadge, ...(s.notApplicable ? styles.positionBadgeMuted : {}) }}>{s.position}</div>
                <InfoBox label="サイズ" accent="#3C5A73" muted={s.notApplicable}>{s.size}</InfoBox>
                <p style={{ ...styles.sourceStance, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</p>
                <InfoBox label="例外・許容ケース" muted={s.notApplicable}>{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)" muted={s.notApplicable}>{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース" muted={s.notApplicable}><UseCaseList items={s.useCases} muted={s.notApplicable} /></InfoBox>
                {!s.notApplicable && (
                  <>
                    <InfoBox label="参照ページ(公式)">
                      <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    </InfoBox>
                    {s.searchHint && (
                      <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                    )}
                  </>
                )}
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
                    <div style={{ ...styles.sourceName, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.name}</div>
                    <div style={{ ...styles.sourceDoc, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : (s.notApplicable ? <span style={styles.mutedText}>該当なし</span> : null)}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.position}</div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.size}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} muted={s.notApplicable} /></div>))}
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

          <RelatedPages paths={["/components/containment/table", "/components/containment/carousel", "/components/navigation/breadcrumb"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["ナビゲーション", "情報の整理・一覧"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 0", lineHeight: 1.6 },
  typesCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 22 },
  typesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 4 },
  typeItem: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 12px" },
  typeIllustration: { marginBottom: 10 },
  typeName: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  typeDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  positionBadgeMuted: { color: "#666D93", background: "#F3F4F9" },
  mutedText: { color: "#666D93" },
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
