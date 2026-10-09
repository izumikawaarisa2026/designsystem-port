import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * 思想レイヤー「アクセシビリティ」ページ(旧「POUR解説」を改称・再構成)。
 * POURはWCAG固有の枠組みだが、アクセシビリティという概念自体は他3系列にも存在するため、
 * 4系列の比較ページとして再構成し、その中でWCAGのPOUR(4原則・13ガイドライン)を
 * 詳しく解説する形にしている。各コンポーネントページの「アクセシビリティ」欄の元ネタでもある。
 *
 * データはすべて2026-09に一次情報を直接取得して確認済み。
 */

const FRAMEWORKS = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Accessibility",
    color: "#C2542A",
    items: [
      { name: "Vision(視覚)", desc: "色だけに頼らず、形やアイコンなど視覚的な手がかりを追加して情報を伝えるべきという指針。色覚特性により特定の色の組み合わせ(赤緑・青橙など)の判別が難しい人がいることに配慮する。" },
      { name: "Hearing(聴覚)", desc: "音声情報には字幕や代替テキストなど、聴覚以外でも受け取れる手段を用意すべきという指針。" },
      { name: "Mobility(可動性)", desc: "運動機能に制約がある人でも操作できるよう、タップ領域の確保や代替の入力手段を用意すべきという指針。" },
      { name: "Speech(発話)", desc: "音声入力に頼らず操作できる代替手段を用意すべきという指針。" },
      { name: "Cognitive(認知)", desc: "認知的な負荷を減らし、分かりやすく一貫した設計にすべきという指針。" },
    ],
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
    confirmedNote: "各分野の見出しに実アンカーあり(例: #Vision)。ページ本体の裏側データを直接取得して確認(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design ― アクセシビリティ原則",
    color: "#2F7D6E",
    items: [
      { name: "アクセシビリティをデフォルトに", desc: "アクセシビリティ基準はマテリアルの各コンポーネントに組み込まれており、包括的な製品設計の基盤になっているという考え方。多様なユーザーを想定することが、後からの手戻り(再設計)や技術的負債を防ぐことにもつながるとしている。" },
      { name: "要件を機会として捉える", desc: "WCAGが定める最低限の要件は特定のニーズに応えるものだが、その制約の中で生まれた工夫(ダークモード・読み上げ・音声認識など)が結果的に幅広いユーザーの助けになってきたという考え方。" },
    ],
    url: "https://m3.material.io/foundations/overview/principles",
    confirmedNote: "ユーザーによる目視確認(2026-09)。ページ内に個別の見出しアンカーは確認できていないため、ページ単位のリンクに留めています。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.2 ― POUR(4原則・13ガイドライン)",
    color: "#A3821F",
    items: [
      {
        name: "Perceivable(知覚可能)",
        desc: "情報やUIコンポーネントは、ユーザーが知覚できる形で提示されなければならないという原則。",
        url: "https://www.w3.org/TR/WCAG22/#perceivable",
        sub: [
          { name: "1.1 Text Alternatives", desc: "非テキストコンテンツに代替テキストを用意すべきという指針。" },
          { name: "1.2 Time-based Media", desc: "動画・音声に代替手段を用意すべきという指針。" },
          { name: "1.3 Adaptable", desc: "情報や構造を失わずに異なる形式でも提示できるべきという指針。" },
          { name: "1.4 Distinguishable", desc: "前景と背景を区別しやすくすべきという指針(色のみによる区別の禁止など)。" },
        ],
      },
      {
        name: "Operable(操作可能)",
        desc: "UIコンポーネントとナビゲーションは操作可能でなければならないという原則。",
        url: "https://www.w3.org/TR/WCAG22/#operable",
        sub: [
          { name: "2.1 Keyboard Accessible", desc: "すべての機能をキーボードだけで利用できるべきという指針。" },
          { name: "2.2 Enough Time", desc: "内容を読んだり操作したりするのに十分な時間を与えるべきという指針。" },
          { name: "2.3 Seizures and Physical Reactions", desc: "発作等を誘発する設計をしてはならないという指針。" },
          { name: "2.4 Navigable", desc: "現在地の把握やナビゲートを助ける手段を提供すべきという指針(リンクの目的など)。" },
          { name: "2.5 Input Modalities", desc: "多様な入力方法での操作性を高めるべきという指針(タップ領域など)。" },
        ],
      },
      {
        name: "Understandable(理解可能)",
        desc: "情報とUIの操作方法は理解可能でなければならないという原則。",
        url: "https://www.w3.org/TR/WCAG22/#understandable",
        sub: [
          { name: "3.1 Readable", desc: "テキストを読みやすく理解しやすくすべきという指針。" },
          { name: "3.2 Predictable", desc: "見た目や動作を予測可能にすべきという指針。" },
          { name: "3.3 Input Assistance", desc: "入力ミスを避け、修正を助けるべきという指針。" },
        ],
      },
      {
        name: "Robust(堅牢)",
        desc: "コンテンツは支援技術を含む様々なユーザーエージェントで確実に解釈できるべきという原則。",
        url: "https://www.w3.org/TR/WCAG22/#robust",
        sub: [
          { name: "4.1 Compatible", desc: "現在・将来のユーザーエージェントとの互換性を最大化すべきという指針。" },
        ],
      },
    ],
    url: "https://www.w3.org/TR/WCAG22/",
    confirmedNote: "4原則・13ガイドラインすべて実アンカーあり。仕様書本体で確認(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Accessibility and Inclusivity: Study Guide",
    color: "#7A4F7E",
    items: [
      { name: "アクセシビリティ = 心構え", desc: "アクセシビリティとインクルーシブデザインは、手続き・規制・チェックリストの集まりではなく、マインドセットであるという考え方。" },
      { name: "アクセシブルデザイン", desc: "視覚・聴覚・認知・情緒・運動面で困難を抱えるユーザーを助けるデザインという整理。" },
      { name: "インクルーシブデザイン", desc: "人種・性別・宗教など多様な背景を持つユーザーを歓迎し、それらが体験の妨げにならないようにする設計という整理。" },
    ],
    url: "https://www.nngroup.com/articles/accessibility-inclusivity-study-guide/",
    confirmedNote: "記事本体で確認(2026-09)。個別の見出しアンカーは未確認のため、ページ単位のリンクに留めています。",
  },
];

export default function PrinciplesAccessibilityPage() {
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
        <SidebarNav currentPath="/principles/accessibility" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>思想レイヤー / アクセシビリティ</span>
            <span>SPEC No. 002</span>
          </div>

          <h1 style={styles.title}>アクセシビリティ</h1>
          <p style={styles.subtitle}>4つのガイドラインが、アクセシビリティという概念をどう捉え、どう体系立てているかを比較する</p>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              「アクセシビリティ」という言葉が指す範囲は、4系列でかなり異なります。<strong>WCAGは適合の可否を判定できる規格</strong>として、知覚可能・操作可能・理解可能・堅牢という4原則(POUR)を定義しています。一方でApple・Google・Nielsen Norman Groupは、規格というより実践的な指針や考え方として、それぞれ独自の言葉でアクセシビリティを語っています。
            </p>
            <p style={styles.synthesisText}>
              なかでもNielsen Norman Groupは、アクセシビリティを<strong>「チェックリストではなく心構え(マインドセット)」</strong>だと明言しており、WCAGの規格的な性格とは対照的です。Appleは視覚・聴覚・可動性・発話・認知という障害の種類ごとに実践的なガイダンスを示し、Googleは「制約を機会に変える」という前向きな捉え方を打ち出しています。
            </p>
            <p style={styles.synthesisText}>
              本サイトが各コンポーネントページの「アクセシビリティ」欄でPOURの語彙を採用しているのは、<strong>数ある考え方の中でWCAGが最も具体的で、かつ検証可能</strong>だからです。ただし、それが唯一の正解というわけではありません。他の3系列の視点も知っておくと、アクセシビリティへの理解がより立体的になります。
            </p>
          </div>

          {/* 四系列比較: 性格の違いを一目で示す */}
          <div style={styles.diagramCard}>
            <h2 style={styles.diagramTitle}>四系列比較 ― アプローチの性格</h2>
            <div style={styles.spectrumScroll}>
              <div style={styles.spectrumTrack}>
                <div style={styles.spectrumLine} />
                {[
                  { key: "nn", label: "Nielsen Norman Group", sub: "心構え(マインドセット)", pos: 8, color: "#7A4F7E" },
                  { key: "hig", label: "Apple", sub: "実践ガイダンス(5分野)", pos: 36, color: "#C2542A" },
                  { key: "material", label: "Google", sub: "前向きな再解釈(2原則)", pos: 60, color: "#2F7D6E" },
                  { key: "wcag", label: "W3C", sub: "検証可能な規格(4原則13項目)", pos: 90, color: "#A3821F" },
                ].map((p) => (
                  <div key={p.key} style={{ ...styles.spectrumPoint, left: `${p.pos}%` }}>
                    <span style={{ ...styles.spectrumDot, background: p.color }} />
                    <span style={styles.spectrumLabel}>{p.label}</span>
                    <span style={styles.spectrumSub}>{p.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.spectrumAxis}>
              <span>抽象的な心構え</span>
              <span>検証可能な規格</span>
            </div>
            <p style={styles.diagramNote}>左右は「規格としての厳密さ」の度合いのイメージです。厳密さの高低は優劣を意味しません。詳しい内容は下の「各サイトの詳細」を参照してください。</p>
          </div>

          {/* WCAGの番号とレベルの読み方(各ページで繰り返し出てくるため、ここで一度説明する) */}
          <div style={styles.diagramCard}>
            <h2 style={styles.diagramTitle}>WCAGの番号とレベルの読み方</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { lv: "原則", n: "4つ", ex: "2 = 操作可能(Operable)", w: "100%" },
                { lv: "ガイドライン", n: "13", ex: "2.5 = 入力方法(Input Modalities)", w: "86%" },
                { lv: "達成基準", n: "番号付き", ex: "2.5.8 = ターゲットのサイズ(最低限)", w: "72%" },
              ].map((r) => (
                <div key={r.lv} style={{ width: r.w, background: "#FBF6E6", borderLeft: "3px solid #A3821F", padding: "6px 10px", borderRadius: "0 3px 3px 0" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#171B36" }}>{r.lv}<span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "#7E86AC", marginLeft: 8 }}>{r.n}</span></div>
                  <div style={{ fontSize: 11.5, color: "#454C78", fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace" }}>例: {r.ex}</div>
                </div>
              ))}
            </div>
            <p style={styles.diagramNote}>番号の先頭の数字が原則を表します(1=知覚可能・2=操作可能・3=理解可能・4=堅牢)。各達成基準には適合レベルがあり、<strong>A=最低限</strong>、<strong>AA=実務で一般的な目標</strong>(法令や社内基準の多くがAAを求めます)、<strong>AAA=より高い水準</strong>(すべてのページで満たすことは求められていません)です。なお、W3CのAPG(ARIA Authoring Practices Guide)は実装の参考例で、適合の基準ではありません。</p>
          </div>

          {/* 各サイトの詳細: mobile card stack */}
          <h2 className="dsp-mobile-only" style={styles.diagramTitle}>各サイトの詳細</h2>
          <div className="dsp-mobile-only" style={styles.sourceList}>
            {FRAMEWORKS.map((f) => (
              <div key={f.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={styles.sourceName}>{f.name}</div>
                    <div style={styles.sourceDoc}>{f.doc}</div>
                  </div>
                </div>
                <div style={styles.itemList}>
                  {f.items.map((it) =>
                    it.sub ? (
                      <div key={it.name} style={styles.genBlock}>
                        <div style={styles.genHead}>
                          <span style={styles.genName}>{it.name}</span>
                          {it.url && (<a href={it.url} target="_blank" rel="noreferrer" style={styles.genLink}>仕様書へ ↗</a>)}
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
                      </div>
                    ) : (
                      <div key={it.name} style={styles.itemRow}>
                        <span style={{ ...styles.itemDot, background: f.color }} />
                        <div><div style={styles.itemName}>{it.name}</div><div style={styles.itemDesc}>{it.desc}</div></div>
                      </div>
                    )
                  )}
                </div>
                <div style={styles.sourceFootRow}>
                  <span style={styles.confirmedNote}>{f.confirmedNote}</span>
                  <a href={f.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
                </div>
              </div>
            ))}
          </div>

          {/* desktop: 4-column card grid (variable-length item lists don't fit a matrix well) */}
          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>各サイトの詳細</h2>
            <div style={styles.desktopGrid}>
              {FRAMEWORKS.map((f) => (
                <div key={f.key} style={styles.desktopCard}>
                  <div style={styles.sourceName}>{f.name}</div>
                  <div style={styles.sourceDoc}>{f.doc}</div>
                  <div style={styles.itemList}>
                    {f.items.map((it) =>
                      it.sub ? (
                        <div key={it.name} style={styles.genBlock}>
                          <div style={styles.genHead}>
                            <span style={styles.genName}>{it.name}</span>
                            {it.url && (<a href={it.url} target="_blank" rel="noreferrer" style={styles.genLink}>仕様書へ ↗</a>)}
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
                        </div>
                      ) : (
                        <div key={it.name} style={styles.itemRow}>
                          <span style={{ ...styles.itemDot, background: f.color }} />
                          <div><div style={styles.itemName}>{it.name}</div><div style={styles.itemDesc}>{it.desc}</div></div>
                        </div>
                      )
                    )}
                  </div>
                  <div style={styles.sourceFootRow}>
                    <span style={styles.confirmedNote}>{f.confirmedNote}</span>
                    <a href={f.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
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
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: Apple・WCAGは各項目に対応する実アンカーを確認済みです。Google・NN groupは、個別の見出しアンカーが確認できていないため、ページ単位のリンクに留めています。
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
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", marginBottom: 20 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", marginTop: 14, lineHeight: 1.6 },
  spectrumScroll: { overflowX: "auto" },
  spectrumTrack: { position: "relative", height: 74, minWidth: 440, margin: "8px 0 34px" },
  spectrumLine: { position: "absolute", top: 4, left: 0, right: 0, height: 2, background: "#E1E3F0" },
  spectrumPoint: { position: "absolute", top: 0, display: "flex", flexDirection: "column", alignItems: "center", transform: "translateX(-50%)", width: 118 },
  spectrumDot: { width: 10, height: 10, borderRadius: "50%", display: "block", marginBottom: 6 },
  spectrumLabel: { fontSize: 11, fontWeight: 700, color: "#171B36", textAlign: "center", lineHeight: 1.3 },
  spectrumSub: { fontSize: 10, color: "#7E86AC", textAlign: "center", lineHeight: 1.4, marginTop: 2 },
  spectrumAxis: { display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "#9EA4C4", fontFamily: "'IBM Plex Mono', monospace" },
  genSubList: { display: "flex", flexDirection: "column", gap: 8, background: "#F8F9FD", borderRadius: 4, padding: "10px 12px", marginBottom: 4 },
  genSubRow: { display: "flex", gap: 8, alignItems: "flex-start" },
  genSubIndex: { flexShrink: 0, width: 16, height: 16, borderRadius: "50%", color: "#FFFFFF", fontSize: 9.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 },
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
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginTop: 8, paddingTop: 8, borderTop: "1px solid #E1E3F0" },
  confirmedNote: { fontSize: 10.5, color: "#9EA4C4", maxWidth: 340 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline", flexShrink: 0 },
  desktopGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 22 },
  desktopCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", display: "flex", flexDirection: "column" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
