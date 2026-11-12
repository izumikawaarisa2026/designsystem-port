import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Navigation / パンくずリスト」ページ。
 * サイト階層内の現在位置を示す補助的なナビゲーション要素。グローバルナビや
 * ローカルナビを補完するものであり、それらの代わりにはならない点が重要。
 *
 * W3C(WAI-ARIA Breadcrumbパターン)/ Nielsen Norman Groupは公式ページ・記事本文を
 * 直接取得して確認済み(2026-09)。
 * Apple(HIG)は「パンくず(breadcrumb)」という名称の専用コンポーネントページが
 * 見当たらないことを検索で確認した(2026-09)。iOS/macOSは階層をたどる場合、
 * 戻るボタン(前の画面に戻る)によるナビゲーションスタックを基本としており、
 * 常時表示のパンくずリストという発想自体を持たないと考えられる。
 * Google(Material Design 3)も、公式サイト内に「Breadcrumbs」という名称の
 * 専用コンポーネントページが見当たらないことを検索で確認した(2026-09)。ただし
 * m3.material.ioはクライアント側レンダリングのSPAで全文を網羅的に確認できないため、
 * 「存在しない」という結論はpending(間接確認)として扱う。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "該当コンポーネントなし(近いコンポーネント: macOSのPath controls)",
    term: <NoData>該当なし(近いコンポーネント: macOSのPath control)</NoData>,
    color: "#C2542A",
    notApplicable: true,
    urlSecondary: [{ label: "参考: Path controls(macOS)", url: "https://developer.apple.com/design/human-interface-guidelines/path-controls" }],
    position: "該当なし",
    size: "該当なし",
    colorInfo: "該当なし",
    stance: <>該当なし。iOSは階層の遷移を、上部のツールバーの戻るボタンで扱うのが基本(HIG Toolbars)。近いコンポーネントとして、macOSにはPath controls(Finderのパスバーのように、階層の中の位置を並べて示すコンポーネント。iOSなどでは使えない)がある。</>,
    exceptions: "該当なし",
    accessibility: "該当なし",
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
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
    colorInfo: "該当なし",
    stance: "該当なし(M3のコンポーネントの一覧にBreadcrumbsはない)",
    exceptions: "該当なし",
    accessibility: "該当なし",
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    pending: true,
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA Breadcrumbパターン",
    term: "Breadcrumb(APGのパターン)",
    color: "#A3821F",
    position: "nav要素(ランドマーク)+ 順序リスト(ol)+ 現在ページへのaria-current=\"page\"",
    size: "専用の数値基準はない。個々のリンクには一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "専用の色の基準はない。リンクの文字には1.4.3(コントラスト(最低限)。通常の文字は4.5:1以上)がかかる。区切り記号(> や / など)は装飾のため、1.4.11(非テキストのコントラスト)の対象外。",
    glossary: [
      { term: "aria-current", desc: "一連の項目の中で「今の項目」を示すARIA属性。パンくずリストでは、今のページへのリンクに aria-current=\"page\" を付ける。今のページがリンクでなければ任意。" },
    ],
    stance:
      "今のページの親ページへのリンクを、階層の順に並べたリスト。ナビゲーションのランドマーク(nav要素。aria-labelかaria-labelledbyでラベルを付ける)として作り、リンクは順序リスト(ol)で並べる。多くはページ本文の直前に横に置く。",
    exceptions:
      "APGは、今のページをリンクにする作りも、しない作りも認める(リンクならaria-current=\"page\"を付け、リンクでなければ任意)。リンクにしないのはNN groupの推奨。キーボード操作が「適用なし(Not applicable)」なのは、普通のリンクの並びで特別なキー操作が要らないため。",
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― nav要素によるランドマーク(支援技術がページ内を移動しやすくする)、aria-current=\"page\"による現在位置の明示が中心。区切り記号(> や / など)は装飾で、支援技術に読み上げさせる必要はない。",
    useCases: [
      "nav要素(aria-label付き)でパンくずリスト全体を囲む",
      "リンクを順序リスト(ol)で並べる",
      "今のページへのリンクにはaria-current=\"page\"を付ける(リンクにしないなら任意)",
    ],
    searchHint: "Not applicable",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
    refs: [
      { kind: "apg", label: "APG: Breadcrumb Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/" },
      { kind: "sc", level: "AAA", label: "2.4.8 現在位置(パンくずリストは満たし方の1つで、置けば自動的に適合するわけではない)", url: "https://www.w3.org/WAI/WCAG22/Understanding/location.html" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="26" viewBox="0 0 120 26">
          <rect x="1" y="1" width="118" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="17" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">nav &gt; ol &gt; aria-current</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Breadcrumbs: 11 Design Guidelines for Desktop and Mobile",
    term: "Breadcrumbs(パンくずリスト)",
    color: "#7A4F7E",
    position: "グローバルナビ・ローカルナビを補う要素(数値基準ではなく使い分けの指針)",
    size: "モバイルの押せる範囲の一般の目安(約1×1cm)に触れるが、パンくず専用の数値ではない。",
    colorInfo: <span><NoData>数値基準なし。</NoData>区切り記号は「&gt;」を勧めるが、「/」と働きの違いはない。</span>,
    stance:
      <>サイトの階層での現在位置を示す補助のナビゲーションで、グローバルナビゲーションバーやローカルナビゲーションを補うものであり、代わりにはならない。最も重要なのは、<Hl>閲覧の履歴(たどってきた順)ではなく、サイトの階層そのものを表示する</Hl>こと。</>,
    exceptions:
      "1〜2階層しかない浅いサイトでは不要。親が複数あるページ(ポリヒエラルキー)では、代表的な経路を1つだけ示す。モバイルでは複数行に折り返さず、押せる範囲が小さすぎたり項目が密集しすぎたりしないようにする。画面が狭ければ末尾の階層だけを出す短縮もできるが、「いつもホームへのリンクから始める」原則とはぶつかる。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、サイトの構造の理解を助ける使い分けの指針。モバイルの押せる範囲(約1×1cm)は、ほかのコンポーネントと共通の目安。",
    useCases: [
      "閲覧の履歴ではなく、サイトの階層を表示する(位置で示し、履歴で示さない)",
      "今のページは最後の項目として表示し、リンクにしない",
      "先頭は必ずホームへのリンクにする",
      "1〜2階層しかない浅いサイトでは使わない",
    ],
    searchHint: "supplement",
    url: "https://www.nngroup.com/articles/breadcrumbs/",
    refs: [
      { label: "Breadcrumbs: 11 Design Guidelines for Desktop and Mobile", url: "https://www.nngroup.com/articles/breadcrumbs/" },
    ],
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <text x="14" y="17" fontSize="9.5" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">ホーム</text>
        <text x="42" y="17" fontSize="9.5" fill="#666D93" fontFamily="Jost, Noto Sans JP">&gt;</text>
        <text x="56" y="17" fontSize="9.5" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">カテゴリ</text>
        <text x="94" y="17" fontSize="9.5" fill="#666D93" fontFamily="Jost, Noto Sans JP">&gt;</text>
        <text x="106" y="17" fontSize="9.5" fill="#171B36" fontWeight="700" fontFamily="Jost, Noto Sans JP">現在地</text>
      </svg>
    ),
    illustrationNote: "現在ページ(最後の項目)はリンクにしない(概念図・系列識別色)",
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

function BreadcrumbSwatch() {
  const items = ["ホーム", "デザイン", "コンポーネント"];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>
      {items.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 && <span style={{ color: "#666D93" }}>&gt;</span>}
          <span style={{ color: i === items.length - 1 ? "#171B36" : "#3A4FCF", fontWeight: i === items.length - 1 ? 700 : 400, textDecoration: i === items.length - 1 ? "none" : "underline" }}>
            {label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "サイトの階層の中で今いる場所を、上の階層からの道筋で示すリンクの並び";
const ABOUT = [
  { k: "目的・役割", v: "今の場所を示し、上の階層へ1回で戻れるようにする" },
  { k: "よく使われる場面", v: "ネットショップの「ホーム > 家電 > 冷蔵庫」、ヘルプサイトの記事の上部" },
  { k: "似たコンポーネントとの違い", v: <>主な場所を切り替えるのは<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink>。パンくずは補助の案内</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "今いるページ(末尾の項目)を、リンクにする?",
    sides: [
      { who: "W3C(APG)", color: "#A3821F", t: "どちらの作りも認めている。リンクにするならaria-current=\"page\"を付ける。リンクにしなければaria-currentは任意" },
      { who: "NN group", color: "#7A4F7E", t: "リンクにしない。何も起きないリンクは置かないため。リンクの項目とは見た目でも区別する" },
    ],
    tip: "今いるページはリンクにせず文字だけにし、「現在のページ」と分かるようにすると、NN groupの勧めに沿い、W3CのAPGの作り方の1つにも当たる。APGは実装の参考例で、適合の要件ではない。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "閲覧の履歴ではなく、サイトの階層を見せる", d: "", who: "NN group" },
  { n: 2, t: "今いるページはリンクにしない", d: "", who: "NN group。W3CのAPGの作り方の1つ" },
  { n: 3, t: "アプリでは戻るボタンが基本", d: "Apple・Googleに専用のコンポーネントはない", who: "Apple・Google" },
  { n: 4, t: "リンクの文字は4.5:1以上", d: "", who: "W3C 1.4.3" },
];

export default function NavigationBreadcrumbPage() {
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
        <SidebarNav currentPath="/components/navigation/breadcrumb" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / パンくずリスト</span>
            <span>SPEC No. 017</span>
          </div>

          <h1 style={styles.title}>パンくずリスト</h1>
          <SummaryCard keyPoints={KP}
            image={<><BreadcrumbSwatch /></>}
            imageNote={<>現在ページの親ページへのリンクを階層順に並べる。この例では、NN groupの推奨どおり現在ページ(最後の項目)をリンクにしていない。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>AppleとGoogleには、パンくずリストに当たる専用のコンポーネントはない</strong>(Appleは、階層を戻るボタンで行き来するのが基本)。専用の内容を持つのは、W3C(WAI-ARIA)とNielsen Norman Groupの2系列だ。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupが示す最も重要な原則は、<strong>ユーザーの閲覧履歴ではなく、サイトの階層構造そのものを表示すべき</strong>という点だ。ブラウザの「戻る」履歴とパンくずリストは似ているようで役割が異なり、パンくずリストは常に同じサイト構造を反映すべきものだ。
            </p>
            <p style={styles.synthesisText}>
              W3Cの実装パターン(nav要素 + 順序リスト + 現在ページへのaria-current="page")と、NN groupの「先頭は必ずホームページへのリンクにする」という原則は、<strong>モバイルでの短縮表示(末尾の階層だけを表示する)という現実的な要請と緊張関係にある</strong>点も見逃せない。画面幅に応じてどちらを優先するかは、実装側の判断が必要になる。
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
                <InfoBox label="色" muted={s.notApplicable}>{s.colorInfo}</InfoBox>
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
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.colorInfo}</div>))}
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

          <RelatedPages paths={["/components/navigation/nav-bar", "/components/navigation/app-bar", "/components/navigation/pagination"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
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
