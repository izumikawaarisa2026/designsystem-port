import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * 思想レイヤー「原則比較」ページ。
 * コンポーネントページの「基準値+許容レンジ図」というデータモデルはここには馴染まないため、
 * 「各系列が何を目的に原則を定義しているか」「原則の数・粒度」「テーマの重なり」を軸にした
 * 専用の構成にしている(CLAUDE.mdの「都度判断してよい」方針に基づく)。
 *
 * データはすべて2026-09に一次情報を直接取得して確認済み。
 * Material Design 3 のみ、公式サイトがクライアント側レンダリングのSPAで
 * 自動取得ができなかったため、ユーザー確認待ちの箇所を明示している。
 */

const FRAMEWORKS = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― デザイン原則",
    color: "#C2542A",
    count: 8,
    items: [
      { name: "Purpose(目的)", anchor: "Purpose", desc: "デザインは意図から始まる。ユーザーにとって最も重要なことを見極め、そこに力を注ぐことで、初めて本当に価値のある体験になるという考え方。" },
      { name: "Agency(主体性)", anchor: "Agency", desc: "インターフェースは人の目標達成を助ける存在であるべきで、行動の自由度を与え、状況を伝え、間違いから簡単に立ち直れるようにすべきという考え方。" },
      { name: "Responsibility(責任)", anchor: "Responsibility", desc: "自分たちの仕事が人々の生活に影響を与えることを自覚し、安全性とプライバシーを優先し、製品の挙動について透明であることで信頼を得るべきという考え方。" },
      { name: "Familiarity(馴染みやすさ)", anchor: "Familiarity", desc: "人がすでに理解している概念を土台にすることで、初めてでもすぐに馴染める体験になる。既存の物理的・デジタル的なパターンを一貫して使うべきという考え方。" },
      { name: "Flexibility(柔軟性)", anchor: "Flexibility", desc: "人はそれぞれ異なる方法でソフトウェアを使う。多様な状況やニーズに適応し、できるだけ多くの端末・入力方法・視点を支えるべきという考え方。" },
      { name: "Simplicity(簡潔さ)", anchor: "Simplicity", desc: "不要な要素を削ぎ落とし、すべての要素がそこにある理由を持つべきという考え方。論理的に整理され、迷わず操作できることを重視する。" },
      { name: "Craft(作り込み)", anchor: "Craft", desc: "デザインはどれだけ気を配ったかの表れであり、細部まで丁寧に作り込むことへの献身を示すべきという考え方。" },
      { name: "Delight(喜び)", anchor: "Delight", desc: "人は製品がどう感じさせてくれたかを覚えている。体験にふさわしい感情を考え、満足感や喜びのある形で届けるべきという考え方。" },
    ],
    url: "https://developer.apple.com/design/human-interface-guidelines/design-principles",
    confirmedNote: "各原則の見出しに実アンカーあり(例: #Purpose)。ページ本体の裏側データを直接取得して確認(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design ― 3世代の思想変遷",
    color: "#2F7D6E",
    count: 3,
    countLabel: "世代",
    items: [
      {
        name: "第1世代(2014〜)",
        desc: "3つの中核原則を掲げた。",
        sub: [
          { name: "Material is the Metaphor", desc: "紙とインクの質感を手がかりに、デジタル上のUIを設計するという考え方。" },
          { name: "Bold, Graphic, Intentional", desc: "タイポグラフィ・色・余白を、意図を持って大胆に使うという原則。" },
          { name: "Motion Provides Meaning", desc: "モーションは装飾ではなく、要素同士の関係や状態の変化を伝えるためのものという考え方。" },
        ],
        url: "https://m1.material.io/material-design/introduction.html",
      },
      {
        name: "第2世代(2021〜、Material You)",
        desc: "「好みの感じ方は人それぞれ」という前提のもと、3つの指針を示した。",
        sub: [
          { name: "Personal", desc: "自分の端末だと感じられる心地よさを目指す指針。壁紙から配色を抽出するダイナミックカラーが代表例。" },
          { name: "Adaptive", desc: "スマートフォンから折りたたみ端末・大画面まで、一貫した体験を提供する指針。" },
          { name: "Accessible", desc: "すべてのユーザーのニーズに応えるという指針。後付けの配慮ではなく、最初からの中核指針として位置づけられている。" },
        ],
        url: "https://design.google/library/material-design-eras",
        note: "3指針の名称は、Google I/Oでの発表を報じた報道(9to5google)に基づく。design.google(公式)では同じ方向性の内容を確認済みだが、この3語そのものは未確認。",
      },
      {
        name: "第3世代(2025〜、Material 3 Expressive)",
        desc: "46件の調査研究・18,000人以上のデータに基づき、使いやすさと感情に働きかけるデザインを両立させている。",
        sub: [],
        url: "https://design.google/library/expressive-material-design-google-research",
      },
    ],
    url: "https://design.google/library/expressive-material-design-google-research",
    confirmedNote: "第1世代はm1.material.io、第3世代はdesign.google(いずれも公式)の本文を直接取得して確認(2026-09)。第2世代のみ一部報道ベース(上記参照)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.2 ― 4つの原則(POUR)",
    color: "#A3821F",
    count: 4,
    items: [
      { name: "Perceivable(知覚可能)", anchor: "perceivable", desc: "情報やUIコンポーネントは、ユーザーが知覚できる形で提示されなければならないという原則。特定の感覚だけに依存する提示は認めない。" },
      { name: "Operable(操作可能)", anchor: "operable", desc: "UIコンポーネントとナビゲーションは操作可能でなければならないという原則。ユーザーが実行できない操作を前提にしてはならない。" },
      { name: "Understandable(理解可能)", anchor: "understandable", desc: "情報とUIの操作方法は理解可能でなければならないという原則。内容や操作がユーザーの理解を超えてはならない。" },
      { name: "Robust(堅牢)", anchor: "robust", desc: "コンテンツは、支援技術を含む様々なユーザーエージェントで確実に解釈できるだけ堅牢でなければならないという原則。" },
    ],
    url: "https://www.w3.org/TR/WCAG22/",
    confirmedNote: "各原則の見出しに実アンカーあり(#perceivable など)。仕様書本体で確認(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "10 Usability Heuristics",
    color: "#7A4F7E",
    count: 10,
    items: [
      { name: "システム状態の可視性", anchor: "toc-1-visibility-of-system-status-1", desc: "システムが今何をしているかを、適切なタイミングでのフィードバックを通じて常にユーザーに知らせるべきという原則。" },
      { name: "システムと実世界の一致", anchor: "toc-2-match-between-the-system-and-the-real-world-2", desc: "システム内部の言葉ではなく、ユーザーにとって馴染みのある言葉・概念・慣習を使うべきという原則。" },
      { name: "ユーザーによる制御と自由", anchor: "toc-3-user-control-and-freedom-3", desc: "誤って進んだ操作から、明確な『非常口』ですぐ抜け出せるようにすべきという原則。" },
      { name: "一貫性と標準", anchor: "toc-4-consistency-and-standards-4", desc: "同じ言葉・状況・操作には同じ意味を持たせ、プラットフォームの慣習に従うべきという原則。" },
      { name: "エラーの防止", anchor: "toc-5-error-prevention-5", desc: "優れたエラーメッセージより優れているのは、そもそもエラーが起きない設計であるという原則。" },
      { name: "想起より認識", anchor: "toc-6-recognition-rather-than-recall-6", desc: "ユーザーに思い出させるのではなく、選択肢や操作方法を見えるようにして記憶の負荷を減らすべきという原則。" },
      { name: "柔軟性と効率性", anchor: "toc-7-flexibility-and-efficiency-of-use-7", desc: "初心者にも上級者にも対応できるよう、操作を加速するショートカットなどの手段を用意すべきという原則。" },
      { name: "美的で最小限のデザイン", anchor: "toc-8-aesthetic-and-minimalist-design-8", desc: "関連性の低い情報や滅多に使わない情報でインターフェースを埋めず、必要な情報に絞るべきという原則。" },
      { name: "エラーの認識・診断・回復の支援", anchor: "toc-9-help-users-recognize-diagnose-and-recover-from-errors-9", desc: "エラーメッセージは平易な言葉で問題を正確に示し、具体的な解決策を提案すべきという原則。" },
      { name: "ヘルプとドキュメント", anchor: "toc-10-help-and-documentation-10", desc: "説明なしで使えるのが理想だが、必要な場合はヘルプを用意し、探しやすく具体的な手順を示すべきという原則。" },
    ],
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    confirmedNote: "各原則の見出しに実アンカーあり(toc-1-... など)。記事本体で確認(2026-09)。",
  },
];

const OVERLAP_ROWS = [
  { theme: "馴染みやすさ・一貫性", hig: "Familiarity", material: "Bold, Graphic, Intentional(近い観点)", wcag: "(Understandableに関連する考え方だが、直接対応する項目はない)", nn: "システムと実世界の一致 / 一貫性と標準" },
  { theme: "主体性の回復・エラーからの立ち直り", hig: "Agency", material: "Personal(近い観点)", wcag: "(Operableに関連する考え方だが、直接対応する項目はない)", nn: "ユーザーによる制御と自由 / エラーの認識・診断・回復の支援" },
  { theme: "端末・状況への適応", hig: "Flexibility", material: "Adaptive", wcag: "(直接対応する項目はない)", nn: "―(10ヒューリスティックに直接対応する項目なし)" },
  { theme: "アクセシビリティを前提とする発想", hig: "Responsibility(関連する考え方だが、直接対応する項目ではない)", material: "Accessible", wcag: "(POUR全体がこの発想の規格化)", nn: "―(10ヒューリスティックに直接対応する項目なし)" },
];

function CountDots({ count, color, label }) {
  if (!count) {
    return <span style={{ fontSize: 12, color: "#9EA4C4", fontFamily: "'IBM Plex Mono', monospace" }}>確認中</span>;
  }
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
      ))}
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#565D8A", marginLeft: 4 }}>{count}{label || "項目"}</span>
    </div>
  );
}

export default function PrinciplesComparisonPage() {
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
        .cmp-row { grid-template-columns: 1fr; gap: 6px; }
        @media (min-width: 560px) {
          .cmp-row { grid-template-columns: 160px auto; gap: 12px; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/principles/comparison" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>思想レイヤー / 原則比較</span>
            <span>SPEC No. 000</span>
          </div>

          <h1 style={styles.title}>原則比較</h1>
          <p style={styles.subtitle}>4つのガイドラインが、それぞれ何本の原則を、何のために定めているかを比較する</p>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              「原則」という同じ言葉でも、4系列が指している範囲はそれぞれ異なります。AppleとNielsen Norman Groupは製品デザイン全般の心構えを、WCAGは適合判定の規格を指しています。そしてGoogleは、<strong>原則の内容そのものより、3世代にわたる思想の進化の軌跡に独自性</strong>があります。
            </p>
            <p style={styles.synthesisText}>
              Apple HIGの原則は<strong>2026年6月に刷新されたばかり</strong>です。かつての「明瞭性・敬意・奥行き」という3本柱は、現在の公式ページにはもう見当たりません。一次情報は定点観測しないと、古い理解のまま止まってしまうことがよく分かる例です。
            </p>
          </div>

          {/* 原則の数の比較: 詳細カードより前に置く、一目で分かる要約 */}
          <div style={styles.diagramCard}>
            <h2 style={styles.diagramTitle}>原則の数の比較</h2>
            <div style={styles.compareGrid}>
              {FRAMEWORKS.map((f) => (
                <div key={f.key} className="cmp-row" style={styles.compareRow}>
                  <div style={styles.compareName}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, display: "inline-block", marginRight: 7 }} />
                    {f.name}
                  </div>
                  <CountDots count={f.count} color={f.color} label={f.countLabel} />
                </div>
              ))}
            </div>
            <p style={styles.diagramNote}>数の多寡は、網羅性や厳密さの優劣を意味しません。詳しい内容は下の「系列ごとの詳細」を参照してください。</p>
          </div>

          <div style={styles.diagramCard}>
            <h2 style={styles.diagramTitle}>テーマの重なり(一部抜粋)</h2>
            <div style={styles.overlapScroll}>
              <div style={styles.overlapGrid}>
                <div style={{ ...styles.overlapCell, ...styles.overlapHeaderCell }}>共通テーマ</div>
                <div style={{ ...styles.overlapCell, ...styles.overlapHeaderCell }}>Apple</div>
                <div style={{ ...styles.overlapCell, ...styles.overlapHeaderCell }}>Google</div>
                <div style={{ ...styles.overlapCell, ...styles.overlapHeaderCell }}>W3C</div>
                <div style={{ ...styles.overlapCell, ...styles.overlapHeaderCell }}>NN</div>
                {OVERLAP_ROWS.map((row, i) => (
                  <React.Fragment key={i}>
                    <div style={{ ...styles.overlapCell, fontWeight: 600 }}>{row.theme}</div>
                    <div style={styles.overlapCell}>{row.hig}</div>
                    <div style={styles.overlapCell}>{row.material}</div>
                    <div style={{ ...styles.overlapCell, fontSize: 11.5 }}>{row.wcag}</div>
                    <div style={styles.overlapCell}>{row.nn}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* 系列ごとの詳細(概要+項目一覧を1カードに統合): mobile card stack */}
          <h2 className="dsp-mobile-only" style={styles.diagramTitle}>系列ごとの詳細</h2>
          <div className="dsp-mobile-only" style={styles.sourceList}>
            {FRAMEWORKS.map((f) => (
              <div key={f.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={styles.sourceName}>{f.name}</div>
                    <div style={styles.sourceDoc}>{f.doc}</div>
                  </div>
                </div>
                {f.items.length > 0 && (
                  <div style={styles.itemList}>
                    {f.items.map((it) =>
                      it.sub ? (
                        <div key={it.name} style={styles.genBlock}>
                          <div style={styles.genHead}>
                            <span style={styles.genName}>{it.name}</span>
                            {it.url && (
                              <a href={it.url} target="_blank" rel="noreferrer" style={styles.genLink}>公式ページへ ↗</a>
                            )}
                          </div>
                          <p style={styles.genDesc}>{it.desc}</p>
                          <div style={styles.genSubList}>
                            {it.sub.map((s, si) => (
                              <div key={s.name} style={styles.genSubRow}>
                                <span style={{ ...styles.genSubIndex, background: f.color }}>{si + 1}</span>
                                <div><div style={styles.itemName}>{s.name}</div><div style={styles.itemDesc}>{s.desc}</div></div>
                              </div>
                            ))}
                          </div>
                          {it.note && <p style={styles.genNote}>{it.note}</p>}
                        </div>
                      ) : (
                        <div key={it.name} style={styles.itemRow}>
                          <span style={{ ...styles.itemDot, background: f.color }} />
                          <div>
                            <div style={styles.itemName}>{it.name}</div>
                            <div style={styles.itemDesc}>{it.desc}</div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                <div style={styles.sourceFootRow}>
                  <span style={styles.confirmedNote}>{f.confirmedNote}</span>
                  <a href={f.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>
                    公式ページへ ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* desktop: per-source sections (matrix doesn't fit well for variable-length item lists, so use wide columns) */}
          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>系列ごとの詳細</h2>
            <div style={styles.desktopGrid}>
              {FRAMEWORKS.map((f) => (
                <div key={f.key} style={styles.desktopCard}>
                  <div style={styles.sourceName}>{f.name}</div>
                  <div style={styles.sourceDoc}>{f.doc}</div>
                  {f.items.length > 0 && (
                    <div style={styles.itemList}>
                      {f.items.map((it) =>
                        it.sub ? (
                          <div key={it.name} style={styles.genBlock}>
                            <div style={styles.genHead}>
                              <span style={styles.genName}>{it.name}</span>
                              {it.url && (<a href={it.url} target="_blank" rel="noreferrer" style={styles.genLink}>公式ページへ ↗</a>)}
                            </div>
                            <p style={styles.genDesc}>{it.desc}</p>
                            <div style={styles.genSubList}>
                              {it.sub.map((s, si) => (
                                <div key={s.name} style={styles.genSubRow}>
                                  <span style={{ ...styles.genSubIndex, background: f.color }}>{si + 1}</span>
                                  <div><div style={styles.itemName}>{s.name}</div><div style={styles.itemDesc}>{s.desc}</div></div>
                                </div>
                              ))}
                            </div>
                            {it.note && <p style={styles.genNote}>{it.note}</p>}
                          </div>
                        ) : (
                          <div key={it.name} style={styles.itemRow}>
                            <span style={{ ...styles.itemDot, background: f.color }} />
                            <div>
                              <div style={styles.itemName}>{it.name}</div>
                              <div style={styles.itemDesc}>{it.desc}</div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div style={styles.sourceFootRow}>
                    <span style={styles.confirmedNote}>{f.confirmedNote}</span>
                    <a href={f.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>
                      公式ページへ ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["設計の原則・使い分け"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: Apple HIG・W3C WCAG・NN groupは各原則に対応する実アンカーを確認済みです。Googleは第1世代(m1.material.io)・第3世代(design.google)は公式ページの本文を確認済み、第2世代のみ報道ベースの情報を含みます(詳細は該当箇所に記載)。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: {
    display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14,
  },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", marginBottom: 20 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", marginTop: 10, lineHeight: 1.6 },
  overlapScroll: { overflowX: "auto" },
  overlapGrid: { display: "grid", gridTemplateColumns: "140px 110px 110px 1fr 1fr", minWidth: 640, border: "1px solid #E1E3F0" },
  overlapCell: { padding: "8px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", fontSize: 12.5, color: "#2E3457" },
  overlapHeaderCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#565D8A", background: "#F8F9FD" },
  sourceList: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  sourceName: { fontWeight: 600, fontSize: 15 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  itemList: { display: "flex", flexDirection: "column", gap: 8, marginTop: 10, marginBottom: 10 },
  itemRow: { display: "flex", gap: 8, alignItems: "flex-start" },
  itemDot: { width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0 },
  itemName: { fontSize: 12.5, fontWeight: 600, color: "#171B36" },
  itemDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78" },
  genBlock: { marginBottom: 4, paddingBottom: 10, borderBottom: "1px solid #F0F1F8" },
  genHead: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 3, flexWrap: "wrap" },
  genName: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  genLink: { fontSize: 10.5, color: "#3A4FCF", textDecoration: "underline", flexShrink: 0 },
  genDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", margin: "0 0 8px" },
  genNote: { fontSize: 10, color: "#9EA4C4", lineHeight: 1.5, margin: "6px 0 0" },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginTop: 8, paddingTop: 8, borderTop: "1px solid #E1E3F0" },
  confirmedNote: { fontSize: 10.5, color: "#9EA4C4", maxWidth: 340 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline", flexShrink: 0 },
  desktopGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 22 },
  compareGrid: { display: "flex", flexDirection: "column", gap: 12 },
  compareRow: { display: "grid", alignItems: "center" },
  compareName: { fontSize: 13, fontWeight: 700, color: "#171B36", display: "flex", alignItems: "center" },
  genSubList: { display: "flex", flexDirection: "column", gap: 10, background: "#F8F9FD", borderRadius: 4, padding: "10px 12px", marginBottom: 4 },
  genSubRow: { display: "flex", gap: 9, alignItems: "flex-start" },
  genSubIndex: { flexShrink: 0, width: 16, height: 16, borderRadius: "50%", color: "#FFFFFF", fontSize: 9.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 },
  desktopCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", display: "flex", flexDirection: "column" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
