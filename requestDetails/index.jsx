import React from "react";
import SidebarNav from "./sidebar-nav";
import { PageLink } from "./page-parts";

/**
 * サイトのインデックス(トップ)ページ。
 * 初めて訪れた人がサイトの狙い・読み方・注意点・運用ルールを理解でき、
 * 運用担当者(将来の自分)が迷わないよう、更新履歴も同じページに置いている(リリース後の運用分のみ)。
 */

/*
 * 公開ページの更新履歴は、サイトリリース後の運用分から記載する。
 * リリース前の制作・改訂の記録は dev-changelog.md に移した。
 * 正式リリース(v1.0.0)までは、公開前(レビュー中)であることだけを表示する。
 */
const CHANGELOG = [
  {
    date: "公開前(レビュー中)",
    entries: ["正式リリース(v1.0.0)の前に、AIと本人によるレビューと修正を進めています。"],
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
              <span>最終更新: 2026-11</span>
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
              <h3 style={styles.h3}>読む順番</h3>
              <p style={styles.p}>初めての方は、次の順に読むと全体がつかみやすくなります。</p>
              <ol style={styles.orderList}>
                <li><PageLink to="/principles/comparison">原則比較</PageLink> ― 4系列がそれぞれ何を大事にしているか(根本の考え方)。<PageLink to="/principles/accessibility">アクセシビリティ</PageLink>もここに入ります。</li>
                <li><PageLink to="/tokens/overview">ファウンデーションの思想比較</PageLink> ― 色・文字・余白など、どの部品にも効く土台の分け方。そこから<PageLink to="/tokens/color">カラー</PageLink>などの各ページへ。</li>
                <li>各部品のページ ― グループごとの入口から読むと、似た部品の違いが分かります(<PageLink to="/components/actions/button">ボタン</PageLink>/<PageLink to="/components/selection/overview">Selectionの選び方</PageLink>/<PageLink to="/components/containment/overview">オーバーレイの使い分け</PageLink>/<PageLink to="/components/communication/overview">情報伝達の使い分け</PageLink>)。</li>
                <li><PageLink to="/cross-view">タグから見る</PageLink> ― エラー処理・通知など、作業の場面からページを探せます。</li>
              </ol>
              <h3 style={styles.h3}>各部品のページの構成</h3>
              <p style={styles.p}>各部品のページは、上から次の順に並んでいます。</p>
              <div style={styles.guideGrid}>
                {[
                  ["サマリー", "タイトルの下の1文と、部品のイメージ図・目的と役割・よく使われる場面・似た部品との違いの表。"],
                  ["意見が分かれる点", "4系列で答えが違う論点。サイズなど図にできるものは図で示す(系列の意見が分かれていないページにはない)。"],
                  ["四系列デザインシステム比較", "見出しの下に「AI解釈 ― 総括」(4系列の違いを統合したAIの見解。太字が結論)。続けて、スマホでは系列ごとのカード、PCでは項目を行・系列を列にした比較表。図(デザインイメージ)が先頭。"],
                  ["マーカー", "若草色の下線が付いた太字は、総括で取り上げている違い・共通点。"],
                  ["メモ", "用語の説明や、1系列だけの補足。"],
                  ["参照ページ(公式)", "その内容を確かめられる公式のページ。公式で別のページ・節に分かれている内容は、それぞれリンクする。"],
                  ["関連するページ", "このサイトの中の、関係する部品やトピックのページ。"],
                  ["タグ", "原則タグ(POUR)とプロセスタグ(12のくくり)。押すと「タグから見る」で同じタグのページを一覧できる。"],
                ].map(([term, desc]) => (
                  <div key={term} style={styles.guideItem}>
                    <div style={styles.guideTerm}>{term}</div>
                    <div style={styles.guideDesc}>{desc}</div>
                  </div>
                ))}
              </div>
              <h3 style={styles.h3}>用語メモ</h3>
              <div style={styles.guideGrid}>
                {[
                  ["単位(pt・dp・CSS px)", "pt(Apple)・dp(Google)・CSS px(Web)は、それぞれのプラットフォームで使う論理的な単位で、画面の密度に左右されない。ただし、違うプラットフォームの数値を1:1で同じ物理的な大きさとして比べることはできない。44pt・48dp・24pxなどは、各系列の基準値として並べて示している。"],
                  ["WCAGの文字サイズ(18pt・14pt)", "WCAGの「大きな文字」の18pt・14pt(太字)は印刷の単位で、Webではそれぞれおよそ24 CSS px・約18.66 CSS px。Appleの18pt(画面の論理単位)とは別の単位。"],
                  ["WCAGのレベル(A・AA・AAA)", "達成基準ごとの適合レベル。A=最低限、AA=実務で一般的な目標(多くの場合はAAを目指す)、AAA=より高い水準。番号の先頭の数字は原則(1=知覚可能・2=操作可能・3=理解可能・4=堅牢)。"],
                  ["APG(ARIA Authoring Practices Guide)", "W3Cが公開している、部品の作り方(キー操作やARIAの使い方)の参考例集。WCAGのような適合の基準ではない。"],
                  ["W3Cの参照ページのバッジ", "「達成基準 A/AA/AAA」=WCAGに適合するために満たす要件とそのレベル。「参考例 APG」=実装の参考例(適合の要件ではない)。「解説 MDN」=Mozillaによる解説(W3Cの文書ではない補足)。"],
                  ["グレーの表記", "記載なし=その系列の公式の文書に書かれていない。数値基準なし=考え方はあるが数値は決めていない。該当なし=その系列にこの部品・トピックがない。未確認=こちらで確かめられていない。"],
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
                  ["W3C", "WCAG・WAI-ARIA(APG)", "Webアクセシビリティの国際標準規格(WCAG)と、支援技術に部品の役割を伝える仕様(WAI-ARIA)。数値基準の一次情報として扱う。APGは実装の参考例。"],
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
                <li>年1回程度、各ページのデータと公式URLを再確認する(M3 Expressiveのような大きな更新の発表があったときは、臨時に確認する)</li>
                <li>変更点があれば、その項目だけ書き換えを提案する(変更箇所を明示)</li>
                <li>GitHubの修正用ブランチで直し、プレビューで目視確認する</li>
                <li>「確認しました」と明示的な返答があってから、本番(GitHub Pages)に反映する</li>
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
    color: "#666D93",
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
  tagline: { fontSize: 11, color: "#666D93", margin: "0 0 10px" },
  subtitle: { fontSize: 14, lineHeight: 1.8, color: "#2E3457", margin: "0 0 32px" },
  section: { marginBottom: 34 },
  h3: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 14, fontWeight: 700, margin: "18px 0 10px" },
  h2: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 12px" },
  p: { fontSize: 13.5, lineHeight: 1.85, color: "#2E3457", margin: "0 0 10px" },
  ul: { margin: 0, paddingLeft: 20, fontSize: 13.5, lineHeight: 1.85, color: "#2E3457" },
  ol: { margin: "0 0 10px", paddingLeft: 20, fontSize: 13.5, lineHeight: 1.85, color: "#2E3457" },
  orderList: { fontSize: 14, lineHeight: 1.9, color: "#2E3457", margin: "0 0 12px", paddingLeft: 22 },
  guideGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 },
  guideItem: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 4, padding: "10px 12px" },
  guideTerm: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, fontWeight: 600, color: "#3A4FCF", marginBottom: 4 },
  guideDesc: { fontSize: 12, lineHeight: 1.6, color: "#454C78" },
  sourceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "12px 14px" },
  sourceName: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontWeight: 700, fontSize: 14 },
  sourceDoc: { fontSize: 11, color: "#666D93", margin: "2px 0 6px" },
  sourceDesc: { fontSize: 12, lineHeight: 1.6, color: "#454C78", margin: 0 },
  logGroup: { marginBottom: 16 },
  logDate: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: "#171B36", marginBottom: 6 },
};
