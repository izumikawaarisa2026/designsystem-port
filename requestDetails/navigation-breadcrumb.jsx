import React from "react";
import SidebarNav from "./sidebar-nav";

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
    doc: "該当コンポーネントなし",
    color: "#C2542A",
    notApplicable: true,
    position: "該当なし",
    size: "該当なし",
    colorInfo: "該当なし",
    stance: "該当なし",
    exceptions: "該当なし",
    accessibility: "該当なし",
    useCases: ["該当なし"],
    searchHint: "",
    confirmedNote: "※「パンくずリスト」という名称の専用コンポーネントは見当たりません。iOS/macOSは階層ナビゲーションを戻るボタン(ナビゲーションスタック)で扱うのが基本的な設計思想と考えられます(検索による間接確認、2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "該当コンポーネントなし(確認中)",
    color: "#2F7D6E",
    notApplicable: true,
    position: "該当なし",
    size: "該当なし",
    colorInfo: "該当なし",
    stance: "該当なし",
    exceptions: "該当なし",
    accessibility: "該当なし",
    useCases: ["該当なし"],
    searchHint: "",
    confirmedNote: "※「Breadcrumbs」という名称の専用コンポーネントページは見当たりません(検索による間接確認。m3.material.ioはSPAのため断定はできません、2026-09)。",
    pending: true,
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA Breadcrumbパターン",
    color: "#A3821F",
    position: "nav要素(ランドマーク)+ 順序リスト(ol)+ 現在ページへのaria-current=\"page\"",
    size: "パンくず専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5)は個々のリンクにも適用されます。",
    colorInfo: "パンくず専用の色基準はありませんが、1.4.11(非テキストのコントラスト)は区切り記号などの視覚的要素に適用され得ます。",
    glossary: [
      { term: "aria-current", desc: "一連の項目の中で「現在の項目」を示すARIA属性。パンくずリストでは、現在のページを表す最後の項目に aria-current=\"page\" を設定する。現在のページがリンクでない(クリック不可)場合、この属性の設定は必須ではないとされる。" },
    ],
    stance:
      "パンくずリストは、現在ページの親ページへのリンクを階層順に並べたリストと定義されています。ナビゲーションのランドマーク領域(nav要素、aria-labelまたはaria-labelledbyでラベル付け)として実装し、リンクの並びは順序リスト(ol)で構成すべきとしています。多くの場合、ページ本文の直前に水平に配置されます。",
    exceptions:
      "現在ページを表す最後の項目はリンクにしないことが前提のため、キーボード操作は「適用なし(Not applicable)」とされています。パンくずリスト自体は独自のキーボード操作パターンを持たない、単純なリンクの集合という位置づけです。",
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― nav要素によるランドマーク(支援技術がページ内を移動しやすくする)、aria-current=\"page\"による現在位置の明示が中心です。区切り記号(> や / など)は装飾であり、支援技術に読み上げさせる必要がない点にも注意が必要です。",
    useCases: [
      "nav要素(aria-label付き)でパンくずリスト全体を囲む",
      "リンクの並びを順序リスト(ol)で構成する",
      "現在ページ(最後の項目)にはaria-current=\"page\"を設定し、リンクにしない",
    ],
    searchHint: "Not applicable",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/",
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
    color: "#7A4F7E",
    position: "グローバルナビ・ローカルナビを補完する補助的な要素(数値基準ではなく使い分けの指針)",
    size: "数値基準としては、モバイルのタップ領域について一般的な目安(約1×1cm)に言及していますが、パンくず専用の数値ではありません。",
    colorInfo: "色についての数値基準はありません。区切り記号は「>」を推奨していますが、「/」との間に機能的な違いはないとしています。",
    stance:
      "パンくずリストは、サイトの階層構造上の現在位置を示す補助的なナビゲーションであり、グローバルナビゲーションバーやローカルナビゲーションを補完するものであって、それらの代わりにはならないとしています。最も重要な原則は、ユーザーの閲覧履歴(たどってきた順序)ではなく、サイトの階層構造そのものを表示すべきという点です。",
    exceptions:
      "1〜2階層しかない「浅い」サイト構造ではパンくずリストは不要としています。複数の親を持つページ(ポリヒエラルキー)では、1つの代表的な経路だけを示すべきとしています。モバイルでは複数行に折り返してはならず、タップ領域が小さすぎたり項目が密集しすぎたりしないよう注意すべきとしています。画面が狭い場合は末尾の階層だけを表示する短縮も検討できますが、これは「常にホームページへのリンクから始めるべき」という原則とは緊張関係にある点に注意が必要です。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、サイト構造の理解を助けるという使い分けの指針です。ただしモバイルでのタップ領域(約1×1cm)は、他のコンポーネントと共通するアクセシビリティ上の目安として関わります。",
    useCases: [
      "ユーザーの履歴ではなく、サイトの階層構造を表示する(位置ベース、履歴ベースにしない)",
      "現在ページは最後の項目として表示し、リンクにはしない",
      "パンくずリストの先頭は必ずホームページへのリンクにする",
      "1〜2階層しかない浅いサイト構造では使わない",
    ],
    searchHint: "supplement",
    url: "https://www.nngroup.com/articles/breadcrumbs/",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <text x="14" y="17" fontSize="9.5" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">ホーム</text>
        <text x="42" y="17" fontSize="9.5" fill="#9EA4C4" fontFamily="Jost, Noto Sans JP">&gt;</text>
        <text x="56" y="17" fontSize="9.5" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">カテゴリ</text>
        <text x="94" y="17" fontSize="9.5" fill="#9EA4C4" fontFamily="Jost, Noto Sans JP">&gt;</text>
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
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
          {i > 0 && <span style={{ color: "#9EA4C4" }}>&gt;</span>}
          <span style={{ color: i === items.length - 1 ? "#171B36" : "#3A4FCF", fontWeight: i === items.length - 1 ? 700 : 400, textDecoration: i === items.length - 1 ? "none" : "underline" }}>
            {label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

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
          <p style={styles.subtitle}>4つのガイドラインが、サイト階層内の現在位置を示す補助的なナビゲーションをどう扱っているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <BreadcrumbSwatch />
            <p style={styles.swatchNote}>現在ページの親ページへのリンクを階層順に並べる。現在ページ(最後の項目)はリンクにしない。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              パンくずリストは、4系列のうち<strong>実質的にW3C(WAI-ARIA)とNielsen Norman Groupの2系列だけが専用の内容を持つ</strong>、やや特殊なコンポーネントです。Appleは「パンくずリスト」という名称の専用ガイドラインページを持たず、階層は<strong>戻るボタンによるナビゲーションスタック</strong>で扱うのが基本という設計思想と考えられます。Googleも、検索した限りでは専用コンポーネントページが見当たりませんでした(ただしSPAのため断定はできず、pending扱いとしています)。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupが示す最も重要な原則は、<strong>「ユーザーの閲覧履歴ではなく、サイトの階層構造そのものを表示すべき」</strong>という点です。ブラウザの「戻る」履歴とパンくずリストは似ているようで役割が異なり、パンくずリストは常に同じサイト構造を反映すべきものです。
            </p>
            <p style={styles.synthesisText}>
              W3Cの実装パターン(nav要素 + 順序リスト + 現在ページへのaria-current="page")と、NN groupの「先頭は必ずホームページへのリンクにする」という原則は、<strong>モバイルでの短縮表示(末尾の階層だけを表示する)という現実的な要請と緊張関係にある</strong>点も見逃せません。画面幅に応じてどちらを優先するかは、実装側の判断が必要になります。
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
                <div style={{ ...styles.positionBadge, ...(s.notApplicable ? styles.positionBadgeMuted : {}) }}>{s.position}</div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <InfoBox label="サイズ" accent="#3C5A73" muted={s.notApplicable}>{s.size}</InfoBox>
                <InfoBox label="色" muted={s.notApplicable}>{s.colorInfo}</InfoBox>
                <p style={{ ...styles.sourceStance, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</p>
                <InfoBox label="例外・許容ケース" muted={s.notApplicable}>{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)" muted={s.notApplicable}>{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース" muted={s.notApplicable}><UseCaseList items={s.useCases} muted={s.notApplicable} /></InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                {!s.notApplicable && (
                  <div style={styles.sourceFootRow}>
                    {s.searchHint && (
                      <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                    )}
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
                  </div>
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
            <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
            <div style={styles.matrixScroll}>
              <div style={styles.matrixGrid}>
                <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                    <div style={{ ...styles.sourceName, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.name}</div>
                    <div style={{ ...styles.sourceDoc, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.position}</div>))}
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : (s.notApplicable ? <span style={styles.mutedText}>該当なし</span> : null)}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} muted={s.notApplicable} /></div>))}
                <div style={styles.labelCell}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    {s.notApplicable ? (
                      <span style={styles.mutedText}>該当なし</span>
                    ) : (
                      <>
                        <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                        {s.urlSecondary && s.urlSecondary.map((sl) => (
                          <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                        ))}
                        {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                      </>
                    )}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["ナビゲーション"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3C・NN groupは本文確認済み。Apple・Googleは専用コンポーネントが見当たらないことを検索で確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: WCAGはWAI-ARIA Authoring Practices(Breadcrumbパターン)、NN groupは記事ページ単位です。Apple・Googleは専用コンポーネントページが見当たらなかったため、それぞれのトップページへのリンクとしています。
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
  positionBadgeMuted: { color: "#B7BCDA", background: "#F3F4F9" },
  mutedText: { color: "#B7BCDA" },
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
