import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, SummaryCard, PageLink, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection」カテゴリの先頭に置く、使い分けガイドページ。
 *
 * 個別コンポーネント(チェックボックス・ラジオボタン・トグルスイッチ・スライダー・チップ)の
 * ページで確認した「AI解釈」の内容を統合し、どの場面でどのコンポーネントを選ぶべきかを1つの判断フローと
 * してまとめたもの。新しい一次情報の要約ではなく、既存ページの統合見解のため、系列別の引用・
 * 公式リンクは持たない(詳細は各コンポーネントのページ側を参照する構成)。
 *
 * 判断フローは、コンポーネントの性質(連続値か・複数選択かなど)を起点にした「システムベース」の
 * 判定ではなく、「ユーザーが今、何をしたいか」という行動を起点にした分岐ツリーにしている
 * (フィードバックを受け、システムベース判定から変更)。1本の直線ではなく、複数箇所で枝分かれする
 * ツリー構造。図の見た目(ひし形=分岐、角丸=開始/結果、ラベル付き矢印)は、ユーザー提供の参考画像
 * (トレードオフ判断のフローチャート)の型を踏襲している。
 *
 * セレクト(プルダウン)は「Selection」の6コンポーネント目として比較対象に含めている(専用ページは作成済み)。
 * 2026-10-05、Selectionに後から加わった「セレクトの種類」「メニュー」「日付/タイムピッカー」への案内を
 * 「このカテゴリのほかのページ」として追加した(判断フローの6コンポーネントとは役割が異なるため、フローには含めない)。
 */

const CARDS = [
  {
    key: "checkbox", name: "チェックボックス", path: "/components/selection/checkbox", built: true,
    oneLiner: "リストから複数選ぶ。親子階層と「不定」状態を持てる。",
    doText: "複数の関連項目を選ばせたい時",
    dontText: "1つだけを選ばせたい時(→ラジオボタン)",
    icon: () => (
      <svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4" fill="#3A4FCF" /><path d="M6.5 12l3 3 7-7.5" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
  {
    key: "radio", name: "ラジオボタン", path: "/components/selection/radio", built: true,
    oneLiner: "選択肢を全部見せた上で、相互排他的に1つだけ選ぶ。",
    doText: "少数の選択肢を全部見せて1つ選ばせたい時",
    dontText: "選択肢が多く場所を取りすぎる時(→セレクト(プルダウン))",
    icon: () => (<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="2" /><circle cx="11" cy="11" r="4.5" fill="#3A4FCF" /></svg>),
  },
  {
    key: "toggle", name: "トグルスイッチ", path: "/components/selection/toggle", built: true,
    oneLiner: "単一設定を送信ボタンなしで即座にオン/オフする。",
    doText: "単一設定を送信なしで即座に反映したい時",
    dontText: "保存・送信ボタンで確定するフォームの項目(→チェックボックス)",
    icon: () => (<svg width="38" height="22" viewBox="0 0 38 22"><rect x="1" y="1" width="36" height="20" rx="10" fill="#3A4FCF" /><circle cx="27" cy="11" r="7.5" fill="#FFFFFF" /></svg>),
  },
  {
    key: "slider", name: "スライダー", path: "/components/selection/slider", built: true,
    oneLiner: "数の範囲の中から、値や範囲(価格帯など)を選ぶ。",
    doText: "音量・明るさ、価格帯・時間帯の範囲",
    dontText: "年齢・体重など正確な値が必要な時",
    icon: () => (<svg width="70" height="16" viewBox="0 0 70 16"><line x1="2" y1="8" x2="68" y2="8" stroke="#D5D9EC" strokeWidth="4" strokeLinecap="round" /><line x1="2" y1="8" x2="44" y2="8" stroke="#3A4FCF" strokeWidth="4" strokeLinecap="round" /><circle cx="44" cy="8" r="6" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="2" /></svg>),
  },
  {
    key: "chips", name: "チップ(Chips)", path: "/components/selection/chips", built: true,
    oneLiner: "小さなタグの形で、その場の絞り込みや選択を切り替える。1つでもオン/オフに使える(フィルターチップ)。",
    doText: "一覧をその場で絞り込む条件を選ぶ・切り替える時",
    dontText: "次の手順へ進むなど主要な操作(→ボタン)",
    icon: () => (<svg width="60" height="22" viewBox="0 0 60 22"><rect x="1" y="1" width="58" height="20" rx="10" fill="#3A4FCF" /></svg>),
  },
  {
    key: "select", name: "セレクト(プルダウン)", path: "/components/selection/select", built: true,
    oneLiner: "選択肢を折りたたみ、省スペースで1つを選ぶ。",
    doText: "選択肢が多く省スペースにしたい時",
    dontText: "選択肢が少なく、全部を見比べて選ぶ方が分かりやすい時(→ラジオボタン。目安はAppleの2〜5個、Googleの5つ以下)",
    icon: () => (
      <svg width="60" height="22" viewBox="0 0 60 22"><rect x="1" y="1" width="58" height="20" rx="4" fill="#FFFFFF" stroke="#9EA4C4" strokeWidth="1.6" /><path d="M48 8l4 4-4 4" fill="none" stroke="#9EA4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 50 12)" /></svg>
    ),
  },
];

/* このカテゴリのほかのページ(表の6コンポーネントとは役割が違うもの) */
const OTHERS = [
  { name: "セレクトの種類", path: "/components/selection/select-patterns", text: "ホイールピッカーなど、プルダウン以外で1つを選ぶ形の一覧" },
  { name: "メニュー", path: "/components/selection/menu", text: "値ではなく、操作(命令)を一覧から選ぶ。選んだ値を表示し続けたいならセレクト(プルダウン)" },
  { name: "日付/タイムピッカー", path: "/components/selection/date-time-picker", text: "日付・時刻という決まった形の値を選ぶ。生年月日のように遠い日付は入力欄の方が速いことも" },
  { name: "セグメントコントロール", path: "/components/navigation/segmented-control", text: "少ない選択肢から1つを選び、同じ場所の見え方をすぐ切り替える(表示形式の切り替えなど)" },
];

const styles = {
  useTable: { width: "100%", minWidth: 720, borderCollapse: "collapse", fontSize: 12, color: "#2E3457" },
  useTh: { fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 8px", borderBottom: "1px solid #E1E3F0", textAlign: "left", verticalAlign: "bottom" },
  useTd: { padding: "8px 8px", borderBottom: "1px solid #EEF0F7", verticalAlign: "top" },
  useNote: { display: "block", fontSize: 10, lineHeight: 1.5, color: "#666D93", marginTop: 2, textAlign: "left" },
  othersGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10, marginBottom: 24 },
  otherCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", color: "inherit" },
  otherName: { fontSize: 13, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  otherText: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 0", lineHeight: 1.6 },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10, marginBottom: 24 },
  card: { display: "block", textDecoration: "none", background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 16px", color: "inherit" },
  cardUnbuilt: { background: "#FBFBFD", border: "1px dashed #D5D9EC", opacity: 0.85 },
  cardIcon: { marginBottom: 10, height: 26, display: "flex", alignItems: "center" },
  cardName: { fontSize: 13.5, fontWeight: 700, color: "#171B36", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 },
  cardOneLiner: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A", marginBottom: 10 },
  unbuiltTag: { fontSize: 9.5, fontWeight: 400, color: "#666D93", fontFamily: "'IBM Plex Mono', monospace" },
  usageRow: { display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 },
  usageMark: { flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, width: 30 },
  usageMarkOk: { color: "#2F7D6E" },
  usageMarkNg: { color: "#C0503F" },
  usageText: { fontSize: 11, lineHeight: 1.5, color: "#454C78" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};

function PartCards() {
  return (
    <div style={styles.cardGrid}>
      {CARDS.map((c) => {
        const inner = (
          <React.Fragment>
            <div style={styles.cardIcon}>{c.icon()}</div>
            <div style={styles.cardName}>{c.name}{!c.built && <span style={styles.unbuiltTag}>準備中</span>}</div>
            <div style={styles.cardOneLiner}>{c.oneLiner}</div>
            <div style={styles.usageRow}>
              <span style={{ ...styles.usageMark, ...styles.usageMarkOk }}>推奨</span>
              <span style={styles.usageText}>{c.doText}</span>
            </div>
            <div style={styles.usageRow}>
              <span style={{ ...styles.usageMark, ...styles.usageMarkNg }}>NG</span>
              <span style={styles.usageText}>{c.dontText}</span>
            </div>
          </React.Fragment>
        );
        return c.built ? (
          <a key={c.key} href={c.path} style={styles.card}>{inner}</a>
        ) : (
          <div key={c.key} style={{ ...styles.card, ...styles.cardUnbuilt }}>{inner}</div>
        );
      })}
    </div>
  );
}

/* ================= 判断フロー(ユーザー行動ベースの分岐ツリー) =================
 * 「ユーザーが今何をしたいか」を起点に、ひし形(分岐)を辿るツリー構造。
 * 1本の直線ではなく、途中3箇所(複数選びたい場合/オン/オフの場合/1つだけ選びたい場合)で
 * さらに枝分かれし、最終的に7つの結果(角丸の四角形)に至る。2026-10、1つの項目のオン/オフを「すぐ反映されるか」で分ける分岐を追加。
 * 図の見た目(ひし形=分岐、角丸=開始/結果、ラベル付き矢印)は、
 * ユーザー提供の参考画像(トレードオフ判断のフローチャート)の型を踏襲している。
 */
/* 行動ごとに、どのコンポーネントが使えるか(◯=向いている、△=使い方次第、✕=向いていない)。
   チップのように使い方で役割が変わるコンポーネントがあるため、はい/いいえの分岐図ではなく表で示す */
const USE_COLS = [
  { k: "multi", t: "複数の項目を選ぶ" },
  { k: "onoff", t: "1つの項目をオン/オフ" },
  { k: "one", t: "1つだけ選ぶ" },
  { k: "value", t: "範囲の中から値を決める(音量・価格帯など)" },
  { k: "filter", t: "表示中の一覧を絞り込む・並べ替える(選ぶとすぐ反映)" },
  { k: "form", t: "フォームで選び、送信ボタンで確定する" },
];
const USE_ROWS = [
  { name: "チェックボックス", path: "/components/selection/checkbox", multi: "◯", onoff: ["◯", "単独のチェックボックス。送信で確定する場面向け"], one: "✕", value: "✕", filter: ["△", "絞り込みの条件の一覧にも使える"], form: "◯" },
  { name: "ラジオボタン", path: "/components/selection/radio", multi: "✕", onoff: "✕", one: ["◯", "選択肢を全部見せる"], value: "✕", filter: ["△", "並べ替えの基準など"], form: "◯" },
  { name: "トグルスイッチ", path: "/components/selection/toggle", multi: "✕", onoff: ["◯", "押した瞬間に反映する場面向け"], one: "✕", value: "✕", filter: ["△", "1つの条件のオン/オフ"], form: ["✕", "送信で確定するフォームには使わない(NN group)"] },
  { name: "スライダー", path: "/components/selection/slider", multi: "✕", onoff: "✕", one: "✕", value: "◯", filter: ["△", "価格帯などの範囲"], form: ["△", "正確な値が要るなら入力欄"] },
  { name: "チップ(Chips)", path: "/components/selection/chips", multi: ["◯", "フィルターチップの組み合わせ"], onoff: ["◯", "フィルターチップ1つ。トグルボタンやチェックボックスの代わりに使える(Google)"], one: ["△", "チップのグループを1つだけ選べる設定にできる(Google)"], value: "✕", filter: ["◯", "フィルターチップ"], form: ["△", "入力した値を並べる入力チップ"] },
  { name: "セレクト(プルダウン)", path: "/components/selection/select", multi: "✕", onoff: "✕", one: ["◯", "選択肢が多く、場所を節約したい"], value: "✕", filter: ["△", "並べ替えの基準など"], form: "◯" },
];
const MARK_COLOR = { "◯": "#2F7D6E", "△": "#A3821F", "✕": "#666D93" };

function UseTable() {
  const chip = (r, note, m) => (
    <a key={r.name} href={r.path} style={{ display: "inline-flex", flexDirection: "column", textDecoration: "none", border: `1px solid ${m === "◯" ? "#2F7D6E55" : "#A3821F55"}`, borderRadius: 6, padding: "4px 8px", background: "#FFFFFF", maxWidth: 260 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: "#3A4FCF" }}>{r.name}</span>
      {note && <span style={{ fontSize: 10.5, color: "#565D8A", lineHeight: 1.45 }}>{note}</span>}
    </a>
  );
  const pick = (c, m) => USE_ROWS.map((r) => {
    const v = Array.isArray(r[c.k]) ? r[c.k] : [r[c.k], ""];
    return v[0] === m ? chip(r, v[1], m) : null;
  }).filter(Boolean);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {USE_COLS.map((c) => (
        <div key={c.k} style={{ display: "grid", gridTemplateColumns: "minmax(0, 200px) 1fr", gap: 10, alignItems: "start", border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#171B36" }}>{c.t}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "flex-start" }}><span style={{ fontSize: 11, fontWeight: 700, color: MARK_COLOR["◯"], width: 84, flexShrink: 0, paddingTop: 4 }}>◯ 向いている</span>{pick(c, "◯")}</div>
            {pick(c, "△").length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "flex-start" }}><span style={{ fontSize: 11, fontWeight: 700, color: MARK_COLOR["△"], width: 84, flexShrink: 0, paddingTop: 4 }}>△ 場合による</span>{pick(c, "△")}</div>}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 11.5, color: "#565D8A", margin: "2px 0 0" }}>ここにないコンポーネントは、そのしたいことには向かない。</p>
    </div>
  );
}

const LEAD = "値や項目を選ぶコンポーネントを、利用者が今何をしたいかから選び分けるためのページ";
const ABOUT = [
  { k: "目的・役割", v: "見た目や機能が重なる選択のコンポーネントを、利用者の行動(オン/オフ・1つ選ぶ・複数選ぶ・範囲を決めるなど)から選べるようにする" },
  { k: "扱うコンポーネント", v: <><PageLink to="/components/selection/checkbox">チェックボックス</PageLink>、<PageLink to="/components/selection/radio">ラジオボタン</PageLink>、<PageLink to="/components/selection/toggle">トグルスイッチ</PageLink>、<PageLink to="/components/selection/slider">スライダー</PageLink>、<PageLink to="/components/selection/chips">チップ(Chips)</PageLink>、<PageLink to="/components/selection/select">セレクト(プルダウン)</PageLink></> },
  { k: "関連するページ", v: <>プルダウン以外の選び方は<PageLink to="/components/selection/select-patterns">セレクトの種類</PageLink>、1つを選んで表示を切り替えるなら<PageLink to="/components/navigation/tabs-vs-segmented">タブとセグメントの使い分け</PageLink></> },
];

export default function SelectionOverviewPage() {
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
        <SidebarNav currentPath="/components/selection/overview" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / Selectionの選び方</span>
            <span>SPEC No. 004.5</span>
          </div>

          <h1 style={styles.title}>Selectionの選び方</h1>
          <SummaryCard lead={LEAD} rows={ABOUT} />

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              6つは<strong>「利用者が今、何をしたいか」</strong>から選ぶと迷わない(下の「したいことから選ぶ」)。
            </p>
            <p style={styles.synthesisText}>
              迷いやすいのは3組。1つのオン/オフは、<strong>押した瞬間に反映するならトグルスイッチ、送信で確定するならチェックボックス</strong>(NN group)。複数を選ぶなら、<strong>一覧をその場で絞り込むならチップ、フォームで送信するならチェックボックス</strong>。1つだけ選ぶなら、<strong>全部見せたいならラジオボタン、場所を節約するならセレクト(プルダウン)</strong>。
            </p>
          </div>

          <h2 style={styles.diagramTitle}>6つのコンポーネント</h2>
          <PartCards />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>したいことから選ぶ</h2>
          <UseTable />
          <p style={styles.diagramNote}>まず今したいことの行を見て、「◯ 向いている」のコンポーネントから選ぶ。「△ 場合による」は、添えた条件に合うときに使える。チップのように使い方で役割が変わるコンポーネントがあるため、はい/いいえで分ける図ではなく表にしている。この表は、各コンポーネントのページの内容をまとめた独自の整理。数値基準・アクセシビリティの詳細は、上のカードから各ページを参照。</p>

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>このカテゴリのほかのページ</h2>
          <p style={{ ...styles.diagramNote, margin: "0 0 12px" }}>表の6つのコンポーネントとは役割が少し違う、Selectionのページ。</p>
          <div style={styles.othersGrid}>
            {OTHERS.map((o) => (
              <a key={o.path} href={o.path} style={styles.otherCard}>
                <div style={styles.otherName}>{o.name} ↗</div>
                <div style={styles.otherText}>{o.text}</div>
              </a>
            ))}
          </div>

          <RelatedPages paths={["/components/selection/select-patterns", "/components/navigation/tabs-vs-segmented", "/components/containment/overview", "/components/communication/overview"]} />

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け", "選択・切り替え"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>このページは各コンポーネントのページの内容をまとめた整理。系列別の詳細・公式リンクは各コンポーネントのページを参照。</span>
          </div>
        </div>
      </div>
    </div>
  );
}
