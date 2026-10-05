import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * サイトのインデックス(トップ)ページ。
 * 初めて訪れた人がサイトの狙い・読み方・注意点・運用ルールを理解でき、
 * 運用担当者(将来の自分)が迷わないよう、更新履歴も同じページに置いている(リリース後の運用分のみ)。
 */

/*
 * 公開ページの更新履歴は、サイトリリース後の運用分から記載する。
 * リリース前の制作・改訂の記録は dev-changelog.md に移した。
 * リリース日が決まったら、下の仮の日付(2026.xx.x)を差し替える。
 */
const CHANGELOG = [
  {
    date: "2026.xx.x",
    entries: ["X サイトリリース"],
  },
];

export default function IndexPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@600&family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/" />

        <main style={styles.main}>
          <div style={styles.inner}>
            <div style={styles.metaRow}>
              <span>INDEX</span>
              <span>最終更新: 2026-08</span>
            </div>
            <h1 style={styles.title}>DesignSystem Port</h1>
            <p style={styles.tagline}>(サイト名は仮称です)</p>
            <p style={styles.subtitle}>
              Apple(Human Interface Guidelines)/ Google(Material Design 3)/ W3C(WCAG)/ Nielsen Norman
              Groupという、UI/UXの主要なガイドラインを横断的に集約し、AIの独自解釈を加えて比較するサイトです。
            </p>

            {/* このサイトについて */}
            <section style={styles.section}>
              <h2 style={styles.h2}>このサイトについて(思想)</h2>
              <p style={styles.p}>
                単なる情報の転載サイトではありません。同じ「ボタンのタップ領域」でも、系列ごとに数値や考え方が違います。その違いを一目で比較でき、そこに
                <strong>「総合するとこうだが、実務上はこう」</strong>というAIの統合見解が乗っている、という点が価値の核です。
              </p>
              <p style={styles.p}>
                各系列の文章はそのまま転載せず、要約・独自解釈・言い換えのみを行い、必ず公式ページへのリンクを添えています。原文はリンク先で確認してください。
              </p>
              <p style={styles.p}>
                また、一度作って終わりの静的なページにはせず、内容を定期的に見直し続けることを前提としています(詳しくは下部の「運用ルール」)。
              </p>
            </section>

            {/* サイトの読み方 */}
            <section style={styles.section}>
              <h2 style={styles.h2}>サイトの読み方</h2>
              <p style={styles.p}>各コンポーネントページは、以下の要素で構成されています。初めて見るページでも、この対応関係が分かれば迷いません。</p>
              <div style={styles.guideGrid}>
                {[
                  ["AI解釈(まず結論)", "4系列の違いを統合したAIの見解。太字が結論部分。"],
                  ["四サイト比較図", "4系列の基準を並べた図。数値は実寸に近い縮尺で重ね、決まりの有無は◯(明記)・△(部分的)・―(記載なし)の一覧で示す。"],
                  ["基準値・基本方針", "各系列の数値と、その数値を定めている考え方。"],
                  ["例外・許容ケース", "条件付きで緩和される基準がある場合の内容。"],
                  ["許容レンジの図", "押せる範囲など数値を比べるページで、0〜60を共通スケールにした非推奨(赤)/条件付き(黄)/推奨(緑)の帯。"],
                  ["アクセシビリティ(WCAG基準)", "WCAGのPOUR(知覚可能・操作可能・理解可能・堅牢)のどれに対応するかの分類。"],
                  ["公式リンク / ページ内検索ヒント", "可能ならアンカー付きリンク。不可の場合はCmd+F/Ctrl+Fで探せる語を併記。"],
                  ["タグ", "原則タグ(POUR)とプロセスタグ(12のくくり)。横断ビュー「タグから見る」で、同じタグのページを逆引きできる。"],
                ].map(([term, desc]) => (
                  <div key={term} style={styles.guideItem}>
                    <div style={styles.guideTerm}>{term}</div>
                    <div style={styles.guideDesc}>{desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 対象4系列 */}
            <section style={styles.section}>
              <h2 style={styles.h2}>対象の4系列</h2>
              <div style={styles.sourceGrid}>
                {[
                  ["Apple", "Human Interface Guidelines", "iOS/iPadOS/macOSなどApple製品の公式デザインガイドライン。"],
                  ["Google", "Material Design 3", "Android/Webを中心としたGoogleの公式デザインシステム。M3に該当ページがない項目は、旧版のMaterial Design 2やAndroid Developersの公式ドキュメントで比較する。"],
                  ["W3C", "WCAG", "Webアクセシビリティの国際標準規格。数値基準の一次情報として扱う。"],
                  ["Nielsen Norman Group", "UXリサーチ", "特定製品に属さない、独立系のユーザビリティ研究機関。"],
                ].map(([name, doc, desc]) => (
                  <div key={name} style={styles.sourceCard}>
                    <div style={styles.sourceName}>{name}</div>
                    <div style={styles.sourceDoc}>{doc}</div>
                    <p style={styles.sourceDesc}>{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 注意点・免責事項 */}
            <section style={styles.section}>
              <h2 style={styles.h2}>注意点・免責事項</h2>
              <ul style={styles.ul}>
                <li>このサイトは各公式ガイドラインの<strong>非公式な要約・比較</strong>です。実装や審査の最終判断には、必ず公式ページ(リンク先)の一次情報を確認してください。</li>
                <li>「AI解釈」は統合的な見解であり、特定のプロジェクトの制約(ブランドガイドライン、対象ユーザーなど)を考慮したものではありません。</li>
                <li>公式ページの内容は更新されることがあります。掲載内容と最新の公式情報が食い違う場合は、公式情報を優先してください。</li>
                <li>本文は要約・言い換えのみで構成し、原文の転載は行っていません。</li>
              </ul>
            </section>

            {/* 運用ルール */}
            <section style={styles.section}>
              <h2 style={styles.h2}>運用ルール</h2>
              <p style={styles.p}>
                内容の更新は<strong>完全自動では行いません</strong>。著作権・正確性の観点から、必ず人の承認を挟みます。
              </p>
              <ol style={styles.ol}>
                <li>年1回程度、各ページのデータと公式URLを再確認する</li>
                <li>変更点があれば、その項目だけ書き換えを提案する(変更箇所を明示)</li>
                <li>プレビュー環境(例: Netlifyのブランチプレビュー)で目視確認する</li>
                <li>「確認しました」と明示的な返答があってから、本番に反映する</li>
              </ol>
              <p style={styles.p}>この更新作業では、レイアウトやコンポーネント構造は変更せず、数値・文章などデータ部分のみを対象とします。</p>
            </section>

            {/* 更新履歴 */}
            <section style={styles.section}>
              <h2 style={styles.h2}>更新履歴</h2>
              {CHANGELOG.map((entry) => (
                <div key={entry.date} style={styles.logGroup}>
                  <div style={styles.logDate}>{entry.date}</div>
                  <ul style={styles.ul}>
                    {entry.entries.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#FFFFFF", color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" },
  layout: { display: "flex", alignItems: "flex-start" },
  main: { flex: 1, minWidth: 0, padding: "28px 20px 60px" },
  inner: { maxWidth: 720, margin: "0 auto" },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "#7E86AC",
    marginBottom: 14,
  },
  title: {
    fontFamily: "'Unbounded', sans-serif",
    fontSize: 26,
    fontWeight: 600,
    margin: "0 0 4px",
    backgroundImage: "linear-gradient(135deg, #3730A3, #2F6FED)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  },
  tagline: { fontSize: 11, color: "#7E86AC", margin: "0 0 10px" },
  subtitle: { fontSize: 14, lineHeight: 1.8, color: "#2E3457", margin: "0 0 32px" },
  section: { marginBottom: 34 },
  h2: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 12px" },
  p: { fontSize: 13.5, lineHeight: 1.85, color: "#2E3457", margin: "0 0 10px" },
  ul: { margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.85, color: "#2E3457" },
  ol: { margin: "0 0 10px", paddingLeft: 20, fontSize: 13.5, lineHeight: 1.85, color: "#2E3457" },
  guideGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 },
  guideItem: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 4, padding: "10px 12px" },
  guideTerm: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, fontWeight: 600, color: "#3A4FCF", marginBottom: 4 },
  guideDesc: { fontSize: 12, lineHeight: 1.6, color: "#454C78" },
  sourceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "12px 14px" },
  sourceName: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontWeight: 700, fontSize: 14 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", margin: "2px 0 6px" },
  sourceDesc: { fontSize: 12, lineHeight: 1.6, color: "#454C78", margin: 0 },
  logGroup: { marginBottom: 16 },
  logDate: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: "#171B36", marginBottom: 6 },
};
