import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, SummaryCard, PageLink, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Navigation」カテゴリの先頭に置く、使い分けガイドページ(2026-11 ⑦本人レビューNo.049で追加)。
 * 各ナビゲーションのページ(タブバー・ドロワー/サイドナビ・アプリバー・タブ・セグメントコントロール・
 * パンくずリスト・ページネーション)で確認した内容をまとめ、「どこへ移るか」「画面の広さ」から選べるようにしたもの。
 * 新しい一次情報の要約ではなく、既存ページの統合見解のため、系列別の引用・公式リンクは各ページ側に置く。
 */

/* ナビゲーションの種類。level: どの範囲を移るか */
const KINDS = [
  { key: "navbar", name: "タブバー", path: "/components/navigation/nav-bar", level: "アプリの主な場所", oneLiner: "画面下部に常にあり、3〜5個の主な場所を切り替える(AppleのTab bar・GoogleのNavigation bar)", doText: "スマートフォンで、主な場所が3〜5個", dontText: "6個以上・2個以下、画面の中の内容の切り替え", fig: "navbar" },
  { key: "drawer", name: "ナビゲーションドロワー", path: "/components/containment/drawer#drawer", level: "アプリの主な場所", oneLiner: "ボタン(≡)で一時的に開く、行き先の一覧。後ろの画面を覆う", doText: "狭い画面で、行き先が多くバーに収まらないとき", dontText: "広い画面(隠すと見つけにくい)", fig: "drawer" },
  { key: "sidenav", name: "サイドナビ", path: "/components/containment/drawer#rail", level: "アプリの主な場所", oneLiner: "画面の脇に常に表示する行き先の一覧(Appleのサイドバー・Googleのナビゲーションレール)", doText: "タブレット・PCなど広い画面", dontText: "スマートフォン(場所を取る)", fig: "sidenav" },
  { key: "appbar", name: "アプリバー", path: "/components/navigation/app-bar", level: "1つ上の画面", oneLiner: "画面上部で、今の画面のタイトル・戻る・操作をまとめる", doText: "階層を1段ずつ下りるアプリで、戻り道とタイトルを示す", dontText: "主な場所の切り替え(タブバーを使う)", fig: "appbar" },
  { key: "tabs", name: "タブ", path: "/components/navigation/tabs", level: "同じ画面の中", oneLiner: "同じ階層の関連する内容を、画面の中で切り替える", doText: "内容のまとまりが2〜5個ほどで、行き来する", dontText: "順番に読む内容、アプリ全体の移動", fig: "tabs" },
  { key: "segmented", name: "セグメントコントロール", path: "/components/navigation/segmented-control", level: "同じ画面の中", oneLiner: "同じ内容の見せ方(地図/航空写真など)を、少ない選択肢から切り替える", doText: "表示の切り替えや絞り込みが2〜5個", dontText: "別々の内容のまとまり(タブを使う)", fig: "segmented" },
  { key: "breadcrumb", name: "パンくずリスト", path: "/components/navigation/breadcrumb", level: "階層の中の今の位置", oneLiner: "サイトの階層の中で、今どこにいるかと上の階層へのリンクを示す", doText: "3階層以上のWebサイト", dontText: "浅いサイト、アプリ(戻るボタンが基本)", fig: "breadcrumb" },
  { key: "pagination", name: "ページネーション", path: "/components/navigation/pagination", level: "一覧の続き", oneLiner: "長い一覧を番号付きのページに分け、ページを行き来する", doText: "件数が多い一覧(検索結果・商品一覧)", dontText: "少ない一覧(「もっと見る」も検討)", fig: "pagination" },
];

/* 種類ごとの小さなイメージ(概念図) */
function KindFig({ kind }) {
  const g = "#2F7D6E", line = "#D5D9EC", frame = "#7E86AC";
  const phone = (c) => (<svg width="54" height="80" viewBox="0 0 54 80" aria-hidden="true"><rect x="1" y="1" width="52" height="78" rx="8" fill="#FFFFFF" stroke={frame} />{c}</svg>);
  const wide = (c) => (<svg width="96" height="64" viewBox="0 0 96 64" aria-hidden="true"><rect x="1" y="1" width="94" height="62" rx="6" fill="#FFFFFF" stroke={frame} />{c}</svg>);
  switch (kind) {
    case "navbar": return phone(<><rect x="8" y="12" width="38" height="4" rx="2" fill={line} /><rect x="8" y="20" width="30" height="4" rx="2" fill={line} /><rect x="1" y="62" width="52" height="17" rx="0" fill="#E3EDE9" />{[10, 21, 32, 43].map((x, i) => (<circle key={x} cx={x} cy="70" r="3" fill={i === 0 ? g : "#FFFFFF"} stroke={g} />))}</>);
    case "drawer": return phone(<><rect x="1" y="1" width="52" height="78" rx="8" fill="#171B36" opacity="0.25" /><rect x="1" y="1" width="34" height="78" rx="8" fill="#FFFFFF" stroke={g} />{[12, 22, 32, 42].map((y, i) => (<rect key={y} x="6" y={y} width="24" height="6" rx="2" fill={i === 0 ? "#E3EDE9" : "#F3F6FA"} />))}</>);
    case "sidenav": return wide(<><rect x="1" y="1" width="22" height="62" rx="6" fill="#E3EDE9" />{[10, 20, 30].map((y, i) => (<rect key={y} x="5" y={y} width="14" height="6" rx="2" fill={i === 0 ? g : "#FFFFFF"} />))}{[10, 18, 26, 34].map((y) => (<rect key={y} x="30" y={y} width="58" height="4" rx="2" fill={line} />))}</>);
    case "appbar": return phone(<><rect x="1" y="1" width="52" height="14" rx="8" fill="#E3EDE9" /><text x="7" y="11" fontSize="8" fill={g}>‹</text><rect x="14" y="6" width="22" height="4" rx="2" fill={g} />{[22, 30, 38].map((y) => (<rect key={y} x="8" y={y} width="38" height="4" rx="2" fill={line} />))}</>);
    case "tabs": return phone(<>{[8, 22, 36].map((x, i) => (<rect key={x} x={x} y="10" width="11" height="4" rx="2" fill={i === 0 ? g : line} />))}<rect x="8" y="16" width="11" height="1.6" fill={g} />{[24, 32, 40].map((y) => (<rect key={y} x="8" y={y} width="38" height="4" rx="2" fill={line} />))}</>);
    case "segmented": return phone(<><rect x="7" y="9" width="40" height="10" rx="5" fill="#FFFFFF" stroke={g} /><rect x="7" y="9" width="13" height="10" rx="5" fill="#E3EDE9" /><rect x="8" y="26" width="38" height="30" rx="3" fill="#F3F6FA" /></>);
    case "breadcrumb": return wide(<><text x="8" y="16" fontSize="8" fill={g}>ホーム › 商品 › 靴</text>{[24, 32, 40].map((y) => (<rect key={y} x="8" y={y} width="78" height="4" rx="2" fill={line} />))}</>);
    default: return wide(<>{[8, 16, 24].map((y) => (<rect key={y} x="8" y={y} width="78" height="4" rx="2" fill={line} />))}{["‹", "1", "2", "3", "›"].map((t, i) => (<text key={i} x={26 + i * 11} y="50" fontSize="8" textAnchor="middle" fill={i === 1 ? g : "#454C78"} fontWeight={i === 1 ? 700 : 400}>{t}</text>))}</>);
  }
}

/* どの範囲を移るか × 画面の広さ */
const CHOOSE = [
  { q: "アプリの主な場所を切り替える", narrow: "タブバー(3〜5個)。多ければナビゲーションドロワー", wide: "サイドナビ(常に表示)" },
  { q: "1つ上の画面に戻る・今の画面のタイトルを示す", narrow: "アプリバー(戻る+タイトル)", wide: "アプリバー。Webならパンくずリストも" },
  { q: "同じ画面の中で、内容のまとまりを切り替える", narrow: "タブ", wide: "タブ" },
  { q: "同じ内容の見せ方を切り替える", narrow: "セグメントコントロール", wide: "セグメントコントロール" },
  { q: "長い一覧の続きを見る", narrow: "ページネーション(少なければ「もっと見る」)", wide: "ページネーション" },
];

const LEAD = "ナビゲーションのコンポーネントを、どこへ移るかと画面の広さから選び分けるためのページ";
const ABOUT = [
  { k: "目的・役割", v: "名前や見た目が似たナビゲーション(バー・ドロワー・サイドナビ・タブなど)を、移る範囲と画面の広さで選べるようにする" },
  { k: "扱うコンポーネント", v: "タブバー、ナビゲーションドロワー、サイドナビ、アプリバー、タブ、セグメントコントロール、パンくずリスト、ページネーション" },
  { k: "関連するページ", v: <>タブとセグメントの細かい違いは<PageLink to="/components/navigation/tabs-vs-segmented">タブとセグメントの使い分け</PageLink></> },
];

export default function NavigationOverviewPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 800px; padding: 36px 24px 48px; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/components/navigation/overview" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / Navigationの選び方</span>
            <span>SPEC No. 012.5</span>
          </div>

          <h1 style={styles.title}>Navigationの選び方</h1>
          <SummaryCard lead={LEAD} rows={ABOUT} />

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              まず<strong>「どの範囲を移るか」</strong>で分ける。アプリの主な場所ならタブバー・ドロワー・サイドナビ、1つ上へ戻るならアプリバー、同じ画面の中ならタブかセグメントコントロール、一覧の続きならページネーションだ。
            </p>
            <p style={styles.synthesisText}>
              主な場所の切り替えは<strong>画面の広さ</strong>で決まる。スマートフォンは<strong>3〜5個ならタブバー</strong>、多ければドロワー。タブレット・PCは<strong>隠さずサイドナビ</strong>にする(隠すナビゲーションは見つけにくい: NN group)。
            </p>
          </div>

          <h2 style={styles.diagramTitle}>8つのナビゲーション</h2>
          <div style={styles.cardGrid}>
            {KINDS.map((c) => (
              <a key={c.key} href={c.path} style={styles.card}>
                <div style={styles.cardHead}>
                  <KindFig kind={c.fig} />
                  <div style={{ minWidth: 0 }}>
                    <div style={styles.cardLevel}>{c.level}</div>
                    <div style={styles.cardName}>{c.name} ↗</div>
                  </div>
                </div>
                <div style={styles.cardOneLiner}>{c.oneLiner}</div>
                <div style={styles.usageRow}><span style={{ ...styles.usageMark, ...styles.usageMarkOk }}>向く</span><span style={styles.usageText}>{c.doText}</span></div>
                <div style={styles.usageRow}><span style={{ ...styles.usageMark, ...styles.usageMarkNg }}>避ける</span><span style={styles.usageText}>{c.dontText}</span></div>
              </a>
            ))}
          </div>

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>移る範囲と画面の広さから選ぶ</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.useTable}>
              <thead>
                <tr>{["したいこと", "スマートフォン", "タブレット・PC"].map((h) => (<th key={h} style={styles.useTh}>{h}</th>))}</tr>
              </thead>
              <tbody>
                {CHOOSE.map((r) => (
                  <tr key={r.q}>
                    <td style={{ ...styles.useTd, fontWeight: 700 }}>{r.q}</td>
                    <td style={styles.useTd}>{r.narrow}</td>
                    <td style={styles.useTd}>{r.wide}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={styles.diagramNote}>各ページの内容をまとめた独自の整理。数値・系列ごとの違いは、上のカードから各ページを参照。</p>

          <RelatedPages paths={["/components/navigation/tabs-vs-segmented", "/components/containment/drawer", "/tokens/adaptive", "/components/selection/overview"]} />

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>このページは各ナビゲーションのページの内容をまとめた整理。系列別の詳細・公式リンクは各ページを参照。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  useTable: { width: "100%", minWidth: 560, borderCollapse: "collapse", fontSize: 12, color: "#2E3457" },
  useTh: { fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0", textAlign: "left" },
  useTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", verticalAlign: "top", lineHeight: 1.6 },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 24px", lineHeight: 1.6 },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 230px), 1fr))", gap: 10, marginBottom: 24 },
  card: { display: "block", textDecoration: "none", background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px 14px", color: "inherit" },
  cardHead: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  cardLevel: { fontSize: 10, fontWeight: 700, color: "#2F7D6E", marginBottom: 2 },
  cardName: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF" },
  cardOneLiner: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", marginBottom: 8 },
  usageRow: { display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 },
  usageMark: { flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, width: 36 },
  usageMarkOk: { color: "#2F7D6E" },
  usageMarkNg: { color: "#C0503F" },
  usageText: { fontSize: 11, lineHeight: 1.5, color: "#454C78" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
