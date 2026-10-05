import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Selection」カテゴリの先頭に置く、使い分けガイドページ。
 *
 * 個別コンポーネント(チェックボックス・ラジオボタン・トグルスイッチ・スライダー・チップ)の
 * ページで確認した「AI解釈」の内容を統合し、どの場面でどのパーツを選ぶべきかを1つの判断フローと
 * してまとめたもの。新しい一次情報の要約ではなく、既存ページの統合見解のため、系列別の引用・
 * 公式リンクは持たない(詳細は各パーツのページ側を参照する構成)。
 *
 * 判断フローは、コンポーネントの性質(連続値か・複数選択かなど)を起点にした「システムベース」の
 * 判定ではなく、「ユーザーが今、何をしたいか」という行動を起点にした分岐ツリーにしている
 * (フィードバックを受け、システムベース判定から変更)。1本の直線ではなく、複数箇所で枝分かれする
 * ツリー構造。図の見た目(ひし形=分岐、角丸=開始/結果、ラベル付き矢印)は、ユーザー提供の参考画像
 * (トレードオフ判断のフローチャート)の型を踏襲している。
 *
 * プルダウン(セレクト)は「Selection」の6パーツ目として比較対象に含めている(専用ページは作成済み)。
 * 2026-10-05、Selectionに後から加わった「セレクトの種類」「メニュー」「日付/タイムピッカー」への案内を
 * 「このカテゴリのほかのページ」として追加した(判断フローの6パーツとは役割が異なるため、フローには含めない)。
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
    dontText: "選択肢が多く場所を取りすぎる時(→プルダウン)",
    icon: () => (<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="9" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="2" /><circle cx="11" cy="11" r="4.5" fill="#3A4FCF" /></svg>),
  },
  {
    key: "toggle", name: "トグルスイッチ", path: "/components/selection/toggle", built: true,
    oneLiner: "単一設定を送信ボタンなしで即座にオン/オフする。",
    doText: "単一設定を送信なしで即座に反映したい時",
    dontText: "既存のチェックボックスを置き換える時",
    icon: () => (<svg width="38" height="22" viewBox="0 0 38 22"><rect x="1" y="1" width="36" height="20" rx="10" fill="#3A4FCF" /><circle cx="27" cy="11" r="7.5" fill="#FFFFFF" /></svg>),
  },
  {
    key: "slider", name: "スライダー", path: "/components/selection/slider", built: true,
    oneLiner: "連続した範囲から、正確さより「感覚的な」値を選ぶ。",
    doText: "音量・明るさなど感覚的な値でよい時",
    dontText: "年齢・体重など正確な値が必要な時",
    icon: () => (<svg width="70" height="16" viewBox="0 0 70 16"><line x1="2" y1="8" x2="68" y2="8" stroke="#D5D9EC" strokeWidth="4" strokeLinecap="round" /><line x1="2" y1="8" x2="44" y2="8" stroke="#3A4FCF" strokeWidth="4" strokeLinecap="round" /><circle cx="44" cy="8" r="6" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="2" /></svg>),
  },
  {
    key: "chips", name: "チップ(Chips)", path: "/components/selection/chips", built: true,
    oneLiner: "選択・入力・提案を、コンパクトな「タグ」として並べる。",
    doText: "フィルタ・入力済み項目をタグで見せたい時",
    dontText: "フォームの主要な選択肢一覧として使う時",
    icon: () => (<svg width="60" height="22" viewBox="0 0 60 22"><rect x="1" y="1" width="58" height="20" rx="10" fill="#3A4FCF" /></svg>),
  },
  {
    key: "select", name: "プルダウン(セレクト)", path: "/components/selection/select", built: true,
    oneLiner: "選択肢を折りたたみ、省スペースで1つだけ選ぶ。",
    doText: "選択肢が多く省スペースにしたい時",
    dontText: "選択肢が少ない・2〜5個程度の時(→ラジオボタン)",
    icon: () => (
      <svg width="60" height="22" viewBox="0 0 60 22"><rect x="1" y="1" width="58" height="20" rx="4" fill="#FFFFFF" stroke="#9EA4C4" strokeWidth="1.6" /><path d="M48 8l4 4-4 4" fill="none" stroke="#9EA4C4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 50 12)" /></svg>
    ),
  },
];

/* このカテゴリのほかのページ(判断フローの6パーツとは役割が違うもの) */
const OTHERS = [
  { name: "セレクトの種類(プルダウン以外)", path: "/components/selection/select-patterns", text: "ドラムロール(ホイール)など、プルダウン以外で1つを選ぶ形の一覧" },
  { name: "メニュー", path: "/components/selection/menu", text: "値ではなく、操作(命令)を一覧から選ぶ。選んだ値を表示し続けたいならプルダウン" },
  { name: "日付/タイムピッカー", path: "/components/selection/date-time-picker", text: "日付・時刻という決まった形の値を選ぶ。生年月日のように遠い日付は入力欄の方が速いことも" },
];

const styles = {
  othersGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10, marginBottom: 24 },
  otherCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", color: "inherit" },
  otherName: { fontSize: 13, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  otherText: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
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
  unbuiltTag: { fontSize: 9.5, fontWeight: 400, color: "#B7BCDA", fontFamily: "'IBM Plex Mono', monospace" },
  usageRow: { display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 },
  usageMark: { flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, width: 30 },
  usageMarkOk: { color: "#2F7D6E" },
  usageMarkNg: { color: "#C0503F" },
  usageText: { fontSize: 11, lineHeight: 1.5, color: "#454C78" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
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
 * 1本の直線ではなく、途中2箇所(複数選びたい場合/1つだけ選びたい場合)で
 * さらに枝分かれし、最終的に6つの結果(角丸の四角形)に至る。
 * 図の見た目(ひし形=分岐、角丸=開始/結果、ラベル付き矢印)は、
 * ユーザー提供の参考画像(トレードオフ判断のフローチャート)の型を踏襲している。
 */
function Diamond({ cx, cy, hw, hh, lines }) {
  return (
    <g>
      <polygon points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`} fill="#EEF1FA" stroke="#3A4FCF" strokeWidth="1.6" />
      <text x={cx} y={cy - 6} fontSize="11.5" fontWeight="600" fill="#171B36" textAnchor="middle">{lines[0]}</text>
      <text x={cx} y={cy + 14} fontSize="11.5" fontWeight="600" fill="#171B36" textAnchor="middle">{lines[1]}</text>
    </g>
  );
}
function ResultBox({ cx, cy, label }) {
  return (
    <g>
      <rect x={cx - 65} y={cy - 20} width="130" height="40" rx="10" fill="#3A4FCF" />
      <text x={cx} y={cy + 5} fontSize="12" fontWeight="700" fill="#FFFFFF" textAnchor="middle">{label}</text>
    </g>
  );
}
function FlowEdge({ x1, y1, x2, y2, label, lx, ly }) {
  const fontSize = 15;
  const w = label.length * fontSize * 1.15 + 30;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7E86AC" strokeWidth="1.6" markerEnd="url(#flowArrowHead)" />
      <rect x={lx - w / 2} y={ly - 19} width={w} height={30} rx="15" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="1.8" />
      <text x={lx} y={ly + 2} fontSize={fontSize} fontWeight="700" fill="#171B36" textAnchor="middle">{label}</text>
    </g>
  );
}

function DecisionTree() {
  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox="0 0 1500 336" style={{ width: "100%", maxWidth: 1000, height: "auto", display: "block", margin: "0 auto" }} role="img" aria-label="ユーザーの行動を起点にした、Selectionパーツを選ぶための判断フローチャート">
        <defs>
          <marker id="flowArrowHead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#7E86AC" />
          </marker>
        </defs>

        {/* ルートの分岐: ユーザーが今したいことは? */}
        <Diamond cx={720} cy={36} hw={115} hh={36} lines={["ユーザーが今", "したいことは?"]} />

        {/* ルート -> 4方向 */}
        <FlowEdge x1={720} y1={72} x2={120} y2={276} label="感覚的な値の調整" lx={120} ly={251} />
        <FlowEdge x1={720} y1={72} x2={360} y2={276} label="設定を今すぐオン/オフ" lx={360} ly={251} />
        <FlowEdge x1={720} y1={72} x2={720} y2={136} label="複数の項目を選ぶ" lx={720} ly={101} />
        <FlowEdge x1={720} y1={72} x2={1200} y2={136} label="1つだけ選ぶ" lx={1116} ly={94} />

        {/* 直接の結果(スライダー・トグル) */}
        <ResultBox cx={120} cy={296} label="スライダー" />
        <ResultBox cx={360} cy={296} label="トグルスイッチ" />

        {/* サブ分岐B: 複数選ぶ場合、どう見せたいか */}
        <Diamond cx={720} cy={166} hw={80} hh={30} lines={["選んだ結果を", "どう見せたい?"]} />
        <FlowEdge x1={720} y1={196} x2={600} y2={276} label="タグとして見せる" lx={600} ly={251} />
        <FlowEdge x1={720} y1={196} x2={840} y2={276} label="一覧として見せる" lx={840} ly={251} />
        <ResultBox cx={600} cy={296} label="チップ" />
        <ResultBox cx={840} cy={296} label="チェックボックス" />

        {/* サブ分岐D: 1つだけ選ぶ場合、見せ方は */}
        <Diamond cx={1200} cy={166} hw={80} hh={30} lines={["選択肢の", "見せ方は?"]} />
        <FlowEdge x1={1200} y1={196} x2={1080} y2={276} label="全部見比べる" lx={1080} ly={251} />
        <FlowEdge x1={1200} y1={196} x2={1320} y2={276} label="省スペースにする" lx={1320} ly={251} />
        <ResultBox cx={1080} cy={296} label="ラジオボタン" />
        <ResultBox cx={1320} cy={296} label="プルダウン" />
      </svg>
    </div>
  );
}

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
          <p style={styles.subtitle}>チェックボックス・ラジオボタン・トグルスイッチ・スライダー・チップ(Chips)・プルダウン。6つのパーツを、ユーザーの行動を起点に使い分けます</p>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              6つのパーツは、コンポーネントの性質(連続値かどうか、複数選択かどうかなど)からではなく、<strong>「ユーザーが今、何をしたいか」という行動</strong>から辿ると迷いにくくなります。下の判断フローは「感覚的な値を調整したい」「複数の項目を選びたい」「設定をすぐ切り替えたい」「1つだけ選びたい」という4つの行動を起点にした分岐ツリーです。
            </p>
            <p style={styles.synthesisText}>
              特に<strong>チェックボックスとラジオボタンの取り違え</strong>、<strong>チェックボックスとトグルスイッチの取り違え</strong>は、Apple・Nielsen Norman
              Groupの双方が典型的な誤用として明確に指摘している、業界で広く定着した注意点です。
            </p>
            <p style={styles.synthesisText}>
              <strong>チップは「複数選べる」という行動でチェックボックスと重なります</strong>が、「選んだ結果をコンパクトなタグでどう見せるか」という表示形式の違いが決め手です。判断フローでは、複数選択の後にこの見せ方の分岐を置いています。
            </p>
            <p style={styles.synthesisText}>
              <strong>プルダウンはラジオボタンと同じ「1つだけ選ぶ」行動</strong>ですが、Googleがラジオボタンのページで明示している通り、選択肢を折りたたんで省スペースにしたいかどうかが分かれ目です。全選択肢を常に見せておきたいならラジオボタン、表示スペースを節約したいならプルダウン、という使い分けです。
            </p>
          </div>

          <h2 style={styles.diagramTitle}>6つのパーツ</h2>
          <PartCards />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>判断フロー(ユーザーの行動から)</h2>
          <DecisionTree />
          <p style={styles.diagramNote}>ひし形が分岐、角丸の四角形が開始・結果です。矢印のラベルは「ユーザーが今したいこと」を表し、1本の直線ではなく途中2箇所(複数選びたい場合/1つだけ選びたい場合)でさらに枝分かれします。この判断フローは、各パーツのページのAI解釈を統合した独自の整理です。数値基準・アクセシビリティの詳細は、上のカードから各ページを開いて確認してください。</p>

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>このカテゴリのほかのページ</h2>
          <p style={{ ...styles.diagramNote, margin: "0 0 12px" }}>判断フローの6パーツとは役割が少し違う、Selectionのページです。</p>
          <div style={styles.othersGrid}>
            {OTHERS.map((o) => (
              <a key={o.path} href={o.path} style={styles.otherCard}>
                <div style={styles.otherName}>{o.name} ↗</div>
                <div style={styles.otherText}>{o.text}</div>
              </a>
            ))}
          </div>

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け", "選択・切り替え"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10</span>
            <span>このページは既存ページの統合見解であり、新規の一次情報の引用は行っていません。系列別の詳細・公式リンクは各パーツのページを参照してください。2026-10-05、Selectionに加わったページへの案内を追加。</span>
          </div>
        </div>
      </div>
    </div>
  );
}
