import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, PageLink, TagLink } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / オーバーレイの使い分け」ページ。
 * 2026-11 ③本人レビューNo.045で追加。今の画面の上に重ねて出す部品(モーダルダイアログ・フルスクリーンダイアログ・
 * ボトムシート・サイドシート・ドロワー・メニュー/ポップオーバー)を、出る位置・背景を操作できるか・大きさ・閉じ方・場面で並べる。
 * 既存ページの統合見解で、新しい一次情報は引用していない。系列別の詳細と公式リンクは各ページにある。
 */

/* 画面の枠の中で、どこに重なるかを示す小さな図 */
function OverlayMini({ kind }) {
  const W = 64, H = 104;
  const frame = <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#F3F6FA" stroke="#C7CBE6" />;
  const scrim = <rect x="1" y="1" width={W - 2} height={H - 2} rx="8" fill="#171B36" opacity="0.28" />;
  const sheet = (x, y, w, h, r = 6) => <rect x={x} y={y} width={w} height={h} rx={r} fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="1.4" />;
  const lines = (x, y, n, w) => Array.from({ length: n }).map((_, i) => <rect key={i} x={x} y={y + i * 7} width={w - (i % 2) * 8} height="3" rx="1.5" fill="#D5D9EC" />);
  const parts = {
    dialog: <>{scrim}{sheet(9, 36, 46, 32)}{lines(14, 42, 2, 34)}<rect x="36" y="58" width="14" height="5" rx="2" fill="#3A4FCF" /></>,
    fullscreen: <>{sheet(1, 1, W - 2, H - 2, 8)}<rect x="1" y="1" width={W - 2} height="14" rx="8" fill="#EEF1FA" />{lines(8, 24, 5, 46)}</>,
    bottom: <>{scrim}{sheet(1, 56, W - 2, 47, 8)}<rect x="26" y="60" width="12" height="2.5" rx="1.25" fill="#B7BCDA" />{lines(8, 68, 4, 44)}</>,
    side: <>{lines(6, 10, 9, 30)}{sheet(36, 1, 27, H - 2, 6)}{lines(40, 12, 6, 18)}</>,
    drawer: <>{scrim}{sheet(1, 1, 40, H - 2, 6)}{lines(6, 12, 7, 28)}</>,
    menu: <>{lines(6, 10, 9, 44)}<rect x="40" y="12" width="12" height="7" rx="2" fill="#3A4FCF" />{sheet(24, 22, 34, 34, 4)}{lines(28, 28, 4, 24)}</>,
  };
  return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">{frame}{parts[kind]}</svg>;
}

const OVERLAYS = [
  { kind: "dialog", name: "モーダルダイアログ", path: "/components/containment/dialog", where: "画面の中央に小さな枠", modal: "常にモーダル(後ろは操作できない)", size: "小さい", close: "答えのボタン(OK・キャンセルなど)を押す", scene: "削除の確認、権限の許可、保存せずに閉じるときの確認" },
  { kind: "fullscreen", name: "フルスクリーンダイアログ", path: "/components/containment/fullscreen-dialog", where: "画面全体を覆う", modal: "常にモーダル", size: "画面いっぱい", close: "×で閉じる・保存で終える(内容が失われるなら確認する)", scene: "予定や連絡先の新規作成、スマホでの長めの入力" },
  { kind: "bottom", name: "ボトムシート", path: "/components/containment/bottom-sheet", where: "画面の下からせり出す", modal: "モーダル・非モーダルの両方がある", size: "内容に合わせた高さ。段階的に広げられる", close: "下へスワイプ、外側をタップ、×", scene: "共有先の選択、地図の場所の詳細、スマホの絞り込み" },
  { kind: "side", name: "サイドシート", path: "/components/containment/side-sheet", where: "画面の横(主に右)に出る", modal: "非モーダル(標準)・モーダルの両方がある", size: "決まった幅", close: "×、モーダルなら外側をタップ", scene: "一覧の絞り込み、選んだ項目の詳細、編集パネル(主にPC・タブレット)" },
  { kind: "drawer", name: "ドロワー/サイドナビ", path: "/components/containment/drawer", where: "画面の横(主に左)から出る", modal: "スマホは一時的に出すモーダル、PCは常に表示", size: "決まった幅", close: "行き先を選ぶ、外側をタップ", scene: "アプリの主な行き先の一覧(行き先が多いとき)" },
  { kind: "menu", name: "メニュー(ポップオーバー)", path: "/components/selection/menu", where: "押した部品のすぐ近く", modal: "一時的(外側を押すと閉じる)", size: "内容に合わせた小ささ", close: "項目を選ぶ、外側をタップ", scene: "「…」のその他の操作、右クリックの操作の一覧" },
];

const STEPS = [
  { q: "今の作業を止めて、答えてもらう必要がある?", a: <>はい、短く答えるだけなら<PageLink to="/components/containment/dialog">モーダルダイアログ</PageLink>。まとまった入力なら<PageLink to="/components/containment/fullscreen-dialog">フルスクリーンダイアログ</PageLink>(手順が長いなら、重ねずに<PageLink to="/components/text-inputs/wizard">ウィザード</PageLink>の普通のページ)</> },
  { q: "今の画面を見ながら、補助の内容を出したい?", a: <>スマホなら下から出す<PageLink to="/components/containment/bottom-sheet">ボトムシート</PageLink>、PC・タブレットなら横に出す<PageLink to="/components/containment/side-sheet">サイドシート</PageLink></> },
  { q: "アプリの行き先の一覧を出したい?", a: <><PageLink to="/components/containment/drawer">ドロワー/サイドナビ</PageLink>(行き先が3〜5か所なら<PageLink to="/components/navigation/nav-bar">ナビゲーションバー</PageLink>)</> },
  { q: "押した部品に関係する、その場の操作を少しだけ出したい?", a: <><PageLink to="/components/selection/menu">メニュー</PageLink>。短い説明だけなら<PageLink to="/components/communication/tooltip">ツールチップ</PageLink></> },
];

const LEAD = "今の画面の上に重ねて出す部品(オーバーレイ)を並べ、どれを使うかを比べるページだ。";
const ABOUT = [
  { k: "目的・役割", v: "似た見た目のオーバーレイを、出る位置・後ろを操作できるか・閉じ方で見分けられるようにする" },
  { k: "扱う部品", v: "モーダルダイアログ、フルスクリーンダイアログ、ボトムシート、サイドシート、ドロワー/サイドナビ、メニュー(ポップオーバー)" },
  { k: "関連するページ", v: <>知らせ方の違い(スナックバー・バナーなど)は<PageLink to="/components/communication/overview">情報伝達の使い分け</PageLink></> },
];

export default function ContainmentOverviewPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/components/containment/overview" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / オーバーレイの使い分け</span>
            <span>SPEC No. 064</span>
          </div>

          <h1 style={styles.title}>オーバーレイの使い分け</h1>
          <SummaryCard lead={LEAD} rows={ABOUT} />

          <h2 style={styles.diagramTitle}>6つのオーバーレイ</h2>
          <div style={styles.ovGrid}>
            {OVERLAYS.map((o) => (
              <a key={o.kind} href={o.path} style={styles.ovCard}>
                <OverlayMini kind={o.kind} />
                <div style={{ minWidth: 0 }}>
                  <div style={styles.ovName}>{o.name} ↗</div>
                  <div style={styles.ovLine}><span style={styles.ovKey}>出る位置</span>{o.where}</div>
                  <div style={styles.ovLine}><span style={styles.ovKey}>場面</span>{o.scene}</div>
                </div>
              </a>
            ))}
          </div>

          <h2 style={{ ...styles.diagramTitle, marginTop: 40 }}>比較表</h2>
          <div style={{ overflowX: "auto", marginBottom: 40 }}>
            <table style={styles.ovTable}>
              <thead>
                <tr>{["部品", "出る位置", "後ろの画面", "大きさ", "閉じ方", "よく使う場面"].map((h) => (<th key={h} style={styles.ovTh}>{h}</th>))}</tr>
              </thead>
              <tbody>
                {OVERLAYS.map((o) => (
                  <tr key={o.kind}>
                    <td style={{ ...styles.ovTd, fontWeight: 700, whiteSpace: "nowrap" }}><a href={o.path} style={{ color: "#3A4FCF" }}>{o.name}</a></td>
                    <td style={styles.ovTd}>{o.where}</td>
                    <td style={styles.ovTd}>{o.modal}</td>
                    <td style={styles.ovTd}>{o.size}</td>
                    <td style={styles.ovTd}>{o.close}</td>
                    <td style={styles.ovTd}>{o.scene}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={styles.diagramTitle}>選び方(したいことから)</h2>
          <div style={styles.stepList}>
            {STEPS.map((s, i) => (
              <div key={i} style={styles.stepRow}>
                <span style={styles.stepNo}>{i + 1}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={styles.stepQ}>{s.q}</div>
                  <div style={styles.stepA}>{s.a}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 40 }} />
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              オーバーレイは、<strong>「後ろの画面を操作できるか(モーダルかどうか)」</strong>と<strong>「どこに出るか」</strong>の2つで見分けると整理しやすくなる。モーダルダイアログとフルスクリーンダイアログは常にモーダルで、ボトムシートとサイドシートは、Googleがモーダルと非モーダル(標準)の両方を用意している。
            </p>
            <p style={styles.synthesisText}>
              モーダルは作業を止めるため、<strong>本当に必要な場面に絞る</strong>ことは、AppleとNN groupの2系列が明記している。Appleはモーダルの作業を単純・短く保つよう求め、NN groupは複数ステップの作業はモーダルにせず普通のページにするよう勧めている(詳しくは各ページ)。
            </p>
            <p style={styles.synthesisText}>
              W3Cはオーバーレイの種類ごとの区別は設けず、<strong>モーダルならrole="dialog"とaria-modal="true"、フォーカスの閉じ込めと、閉じた後に元の場所へ戻すこと</strong>を共通の作り方としている。見た目の種類が違っても、モーダルかどうかで作り方が決まる。
            </p>
          </div>

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け", "段階的に見せる"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>このページは既存ページの統合見解で、新しい一次情報の引用は行っていない。系列別の詳細と公式リンクは、各部品のページを参照。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  ovGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: 10 },
  ovCard: { display: "flex", gap: 12, alignItems: "flex-start", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", textDecoration: "none", color: "inherit", background: "#FFFFFF" },
  ovName: { fontSize: 13, fontWeight: 700, color: "#3A4FCF", marginBottom: 6 },
  ovLine: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginBottom: 3 },
  ovKey: { display: "inline-block", fontSize: 10, fontWeight: 700, color: "#565D8A", background: "#F3F6FA", borderRadius: 3, padding: "0 5px", marginRight: 6 },
  ovTable: { width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457" },
  ovTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  ovTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  stepList: { display: "flex", flexDirection: "column", gap: 8 },
  stepRow: { display: "flex", gap: 10, alignItems: "flex-start", border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px" },
  stepNo: { width: 22, height: 22, flexShrink: 0, borderRadius: "50%", background: "#3C5A73", color: "#FFFFFF", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
  stepQ: { fontSize: 12.5, fontWeight: 700, color: "#171B36", marginBottom: 4 },
  stepA: { fontSize: 12, lineHeight: 1.7, color: "#2E3457" },
  othersGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10, marginBottom: 24 },
  otherCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", color: "inherit" },
  otherName: { fontSize: 13, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  otherText: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 40, borderRadius: "0 4px 4px 0" },
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
