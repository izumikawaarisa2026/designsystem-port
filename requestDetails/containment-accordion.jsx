import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Containment / アコーディオン(表示コントロール)」ページ。
 * クリック/タップで情報の表示・非表示を切り替える、段階的開示のためのコンテナの
 * 4系列比較。
 *
 * W3C(WAI-ARIA APG Disclosure(Show/Hide)パターン)/ Nielsen Norman Group
 * (Accordions on Desktop: When and How to Use)は公式ページ・記事本文を直接取得して
 * 確認済み(2026-09)。Apple(HIG Disclosure Controls)は公式サイトがクライアント側
 * レンダリングのSPAで本文を直接取得できなかったため、検索結果による間接確認
 * (2026-09)。Googleは、M1時代の「Expansion panels」という独立コンポーネントが
 * M3では見当たらず、検索結果によれば開閉(展開/折りたたみ)の考え方はListコンポーネント
 * の機能に統合されたとされている(間接確認、2026-09)。ユーザー指摘を受け、2026-09に
 * Google欄を「該当なし」(notApplicable)の表現(パンくずリスト/ページネーションページと
 * 同じグレー表示パターン)に変更し、AI解釈も分かりやすく書き直した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Disclosure Controls",
    color: "#C2542A",
    position: "特定のコントロール・ビューに関連する情報や機能を表示・非表示するコントロール",
    size: "具体的なpt数値は確認できていません。他のタップ可能要素と同じ最小44×44ptのヒットターゲット基準が適用されると考えられます。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "開示コントロールは、特定のコントロールやビューに関連する情報・機能を表示・非表示にするものだとしています。段階的開示(プログレッシブディスクロージャー)という、必要になった時点で情報を見せることでアプリを学びやすくし、誤操作を減らすという設計原則に関連するとしています。",
    exceptions:
      "見出しの書き方や複数セクションの同時展開の可否など、詳細な使用基準は公式ページ本文で未確認です。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。標準の開示コントロールを使えば、支援技術には自動的に状態が伝わると考えられます。",
    useCases: [
      "特定のコントロール・ビューに関連する追加情報・機能を、必要な時だけ表示する",
      "複雑な機能を隠すことで初期表示をシンプルに保つ",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/disclosure-controls",
    confirmedNote: "「Disclosure Controls」ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="60" viewBox="0 0 120 60">
        <rect x="1" y="1" width="118" height="16" rx="3" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="10" y="12" fontSize="8" fill="#171B36" fontFamily="Jost, Noto Sans JP">詳細を表示</text>
        <path d="M106 6l4 4-4 4" fill="none" stroke="#C2542A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="22" width="118" height="36" rx="3" fill="#F8F9FD" stroke="#C2542A" strokeDasharray="3 2" strokeWidth="1" />
      </svg>
    ),
    illustrationNote: "開示コントロールで関連情報を表示・非表示(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "該当コンポーネントなし",
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
    confirmedNote: "※現行のMaterial Design 3に「アコーディオン」に相当する名称の独立した専用コンポーネントは存在しません。旧世代(M1)には「Expansion panel」という独立コンポーネントがありましたが、M3では見当たらず、検索結果によれば開閉(展開/折りたたみ)の考え方はListコンポーネントの機能に統合されたとされています(2026-09、間接確認)。「無い」という結論自体は明確ですが、m3.material.ioがSPAで全文網羅の確認はできていないため、間接確認として扱っています。",
    pending: true,
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Disclosure (Show/Hide) Pattern",
    color: "#A3821F",
    position: "開示ボタン + 表示制御されるコンテンツの2要素で構成する、表示/非表示切り替えウィジェット。複数組み合わせたものがアコーディオンに相当する",
    size: "アコーディオン専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5)は開示ボタンに適用されます。",
    colorInfo: "色の基準はありませんが、非表示時は右向き矢印、表示時は下向き矢印などのスタイルで状態を示すとしています。",
    glossary: [
      { term: "aria-expanded", desc: "開示ボタンの状態を示す属性。コンテンツ表示時はtrue、非表示時はfalseを設定する。パターン中で最も重要な属性とされる。" },
    ],
    stance:
      "コンテンツの表示/非表示を切り替えるウィジェットで、「開示ボタン」と「表示制御されるコンテンツセクション」の2要素で構成されるとしています。ボタンにはrole=\"button\"、状態を示すaria-expanded(表示時true、非表示時false)を設定すべきとしています。ボタンが制御するコンテンツ要素との関連付けには、任意でaria-controlsを使えるとしています。",
    exceptions:
      "本文には複数の開示パターンを組み合わせた「アコーディオン」への直接的な言及はありませんが、個々の開示ボタン+コンテンツの組を複数並べた構造がアコーディオンに相当すると考えられます。",
    accessibility:
      "操作可能(Operable) ― フォーカスが開示ボタンにある状態で、Enterキー・Spaceキーのいずれでも開閉を切り替えられるようにすべきとしています。",
    useCases: [
      "開示ボタンにrole=\"button\"とaria-expandedを設定し、状態(true/false)を反映する",
      "ボタンが制御するコンテンツ要素とはaria-controlsで関連付ける(任意)",
      "Enter/Spaceキーのいずれでも開閉を切り替えられるようにする",
    ],
    searchHint: "aria-expanded",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="60" viewBox="0 0 120 60">
          <rect x="1" y="1" width="118" height="16" rx="3" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="12" fontSize="7.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-expanded="true"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、属性・役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Accordions on Desktop: When and How to Use",
    color: "#7A4F7E",
    position: "クリックして情報を表示・非表示にする設計パターン(見出し・アイコン・パネルで構成)。使うべき場面・避けるべき場面が明確に分かれる(数値基準ではなく判断基準)",
    size: "数値基準は明言していませんが、見出しはコンテンツを正確に反映する長さ・表現にすべきだとしています。",
    colorInfo: "色についての数値基準はありませんが、展開可能であることを視覚的に示すためキャレットアイコンなどを使うべきだとしています。",
    stance:
      "アコーディオンは、クリックして情報を表示・非表示にする設計パターンで、見出し・アイコン・パネルで構成されるとしています。ページの煩雑さの軽減・スクロール量の削減・ページ全体の概要提示・スキャン性の向上・(URLなどによる)直接アクセスのしやすさといった利点があるとしています。",
    exceptions:
      "ユーザーがほぼすべてのコンテンツを必要とする場合、コンテンツ量が少ない場合、深い階層構造がある場合、記事のような連続した読書が必要な場合には向かないとしています。逆に、ユーザーが少数の情報のみを必要とする場合、ステップバイステップのプロセス、FAQのように各セクションが独立している場合、長いコンテンツで画面幅が小さい場合には適しているとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、使うべき場面・避けるべき場面の判断基準です。見出しはコンテンツを正確に反映させ、展開可能であることをキャレットアイコン等で視覚的に示し、複数セクションの同時展開を許可し、重要な情報は常に表示しておくべきだとしています。",
    useCases: [
      "FAQのように各セクションが独立していて、ユーザーが少数の情報のみ必要とする場合に使う",
      "見出しはコンテンツを正確に反映させ、キャレットアイコン等で展開可能であることを示す",
      "複数セクションの同時展開を許可し、重要情報は常に表示しておく",
    ],
    searchHint: "progressive disclosure",
    url: "https://www.nngroup.com/articles/accordions-on-desktop/",
    illustration: () => (
      <svg width="120" height="60" viewBox="0 0 120 60">
        <rect x="1" y="1" width="118" height="16" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="10" y="12" fontSize="8" fill="#171B36" fontFamily="Jost, Noto Sans JP">よくある質問 1</text>
        <path d="M106 6l4 4-4 4" fill="none" stroke="#7A4F7E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="20" width="118" height="16" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    illustrationNote: "FAQのような独立セクションの開閉(概念図・系列識別色)",
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

function AccordionSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #E1E3F0" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#171B36" }}>質問1: 返品はできますか?</span>
        <span style={{ color: "#3A4FCF" }}>⌄</span>
      </div>
      <div style={{ padding: "8px 12px 10px", fontSize: 11, color: "#7E86AC", borderBottom: "1px solid #E1E3F0" }}>購入から30日以内であれば返品を受け付けています。</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px" }}>
        <span style={{ fontSize: 12, color: "#454C78" }}>質問2: 送料はいくらですか?</span>
        <span style={{ color: "#9EA4C4" }}>›</span>
      </div>
    </div>
  );
}

export default function ContainmentAccordionPage() {
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
        <SidebarNav currentPath="/components/containment/accordion" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / アコーディオン(表示コントロール)</span>
            <span>SPEC No. 028</span>
          </div>

          <h1 style={styles.title}>アコーディオン(表示コントロール)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、クリック/タップで情報の表示・非表示を切り替える段階的開示のコントロールをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <AccordionSwatch />
            <p style={styles.swatchNote}>見出しをクリックすると、関連するパネル(詳細内容)の表示・非表示が切り替わる。展開可能であることを示すキャレットアイコンを伴うのが一般的。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このコンポーネントで最も具体的な判断材料を示しているのはNielsen Norman Groupです。<strong>「FAQのように各セクションが独立していて、ユーザーが少数の情報のみ必要とする場合」に適し、「ほぼすべてのコンテンツが必要」「記事のような連続読書が必要」な場合には不向き</strong>という、使うべき場面・避けるべき場面のリストは、他3系列にはない実務的な価値を持っています。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、<strong>aria-expanded属性(表示時true/非表示時false)</strong>を軸にした技術的な実装パターンを明確に定めています。「開示ボタン+コンテンツ」という最小単位の組み合わせを複数並べたものがアコーディオンに相当する、という捉え方は、Apple・Googleが単一コンポーネントとして説明するのに対し、より構成要素に分解した視点です。
            </p>
            <p style={styles.synthesisText}>
              <strong>Googleには現在、「アコーディオン」に相当する独立コンポーネントがありません。</strong>M1時代には「Expansion panel」という独立コンポーネントが存在しましたが、検索結果によれば現行のM3では見当たらず、開閉(展開/折りたたみ)の考え方はリストコンポーネントの機能に統合されたとされています。つまり「見落とし」ではなく、<strong>コンポーネントとしての格が時代とともに変わり、今は単体では存在しない</strong>というのが実情です。
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
            {["操作可能(POUR)", "理解可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["情報の整理・一覧", "段階的に見せる"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3C・NN groupは本文確認済み。Apple・Googleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはDisclosure Controlsページへのリンクです。Googleは該当する独立コンポーネントが存在しないため、リンクなしとしています。WCAGはWAI-ARIA APGのDisclosure(Show/Hide)パターン、NN groupは記事ページ単位です。
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
