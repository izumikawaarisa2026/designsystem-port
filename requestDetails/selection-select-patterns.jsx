import React from "react";
import SidebarNav from "./sidebar-nav";
import { NoData, TagLink, SummaryCard, PageLink } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection / セレクトの種類(プルダウン以外)」ページ。
 *
 * 「セレクト(プルダウン)」ページでは、Apple(Pop-up/Pull-downボタン)・
 * Google(Exposed dropdown menu)を中心に「折りたたみ式の単一選択」を扱ったが、
 * 単一選択を実現するUIパターンはプルダウンだけではない。このページは4系列を
 * 横断比較する形式ではなく、確認できた代表的なパターンをギャラリー形式で
 * まとめた補助的なページ(新しい一次情報の要約というより、既存ページ+個別調査の統合)。
 *
 * ドラムロール/ホイールピッカーはApple公式ページ(Pickers)の本文を直接取得して
 * 確認済み(2026-09)。リストボックス・コンボボックスはWAI-ARIA Authoring Practices(2026-10にCombobox本文を再確認)
 * および「セレクト(プルダウン)」ページで確認済みの内容を再構成したもの。
 */

const PATTERNS = [
  {
    name: "プルダウン(ドロップダウン)",
    system: "Apple(Pop-upボタン)・Google(Exposed dropdown menu)",
    desc: "普段は折りたたまれており、タップすると選択肢が現れる最も一般的な単一選択パターン。省スペースだが、開くまで選択肢が見えないという弱点がある。なお、AppleのPull-downボタンは操作(命令)のメニューで、値の選択には使わない(HIG Pull-down buttonsは、操作ではない選択肢の一覧にはPop-upボタンを使うとしている)。",
    when: "選択肢が多く、常に全部を見せる必要がない場面",
    link: "/components/selection/select",
    linkLabel: "詳細ページ(4系列比較)へ",
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="4" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="1.6" />
        <path d="M56 9l4 4-4 4" fill="none" stroke="#3A4FCF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 58 13)" />
      </svg>
    ),
  },
  {
    name: "ドラムロール/ホイールピッカー",
    system: "Apple(Pickers)",
    desc: "縦(または横)に回転するホイール状のリストから値を選ぶパターン。選択中の値は中央に濃い文字で表示される。高さはおおよそリスト5行分、幅は画面またはその親要素の幅に合わせるとされている。",
    when: "国名や日付のように、順序があり予測しやすい値を選ぶ場面。長すぎるリストには不向きで、その場合はテーブル(索引付きの一覧)を使うべきとされている",
    link: "https://developer.apple.com/design/human-interface-guidelines/pickers",
    linkLabel: "Apple HIG: Pickers ↗",
    illustration: () => (
      <svg width="70" height="40" viewBox="0 0 70 40">
        <rect x="1" y="1" width="68" height="38" rx="4" fill="#F8F9FD" stroke="#E1E3F0" strokeWidth="1" />
        <rect x="3" y="16" width="64" height="8" fill="#EEF1FA" stroke="#3A4FCF" strokeWidth="1" />
        <text x="35" y="10" fontSize="8" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">8月</text>
        <text x="35" y="22" fontSize="9" fill="#171B36" fontWeight="700" textAnchor="middle" fontFamily="Jost, Noto Sans JP">9月</text>
        <text x="35" y="34" fontSize="8" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">10月</text>
      </svg>
    ),
  },
  {
    name: "リストボックス(常時展開)",
    system: "WAI-ARIA(Listboxパターン)",
    desc: "選択肢を折りたたまず、常に一覧として表示するパターン。単一選択・複数選択のどちらにも対応できる。Nielsen Norman Groupは、ドロップダウンが「クリックしないと選択肢が見えない」のに対し、リストボックスは「選択肢がすぐに見える」点で区別している。",
    when: "選択肢が多く、スクロールする一覧にしたい場面(選択肢が少なく常に見せたいなら、まずラジオボタン)",
    refs: [{ label: "NN group: Listboxes vs. Dropdown Lists ↗", url: "https://www.nngroup.com/articles/listbox-dropdown/" }],
    link: "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/",
    linkLabel: "APG: Listboxパターン(参考例) ↗",
    illustration: () => (
      <svg width="70" height="40" viewBox="0 0 70 40">
        <rect x="1" y="1" width="68" height="38" rx="4" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="1.6" />
        <rect x="4" y="4" width="62" height="10" fill="#EEF1FA" />
        <text x="10" y="12" fontSize="7.5" fill="#3A4FCF" fontFamily="Jost, Noto Sans JP">選択肢A</text>
        <text x="10" y="25" fontSize="7.5" fill="#565D8A" fontFamily="Jost, Noto Sans JP">選択肢B</text>
        <text x="10" y="36" fontSize="7.5" fill="#565D8A" fontFamily="Jost, Noto Sans JP">選択肢C</text>
      </svg>
    ),
  },
  {
    name: "コンボボックス(入力+絞り込み)",
    system: "Google(Exposed dropdown menuの入力対応版)・WAI-ARIA(Comboboxパターン)",
    desc: "入力部と、それに対応するポップアップ(選択肢の一覧)を組み合わせた部品。文字を入力できる型(editable)と入力できない型(select-only)があり、入力に応じて候補を絞り込む実装もできる(APGのComboboxパターンには、絞り込まない型の例もある)。選択肢が非常に多い場合は、入力で絞り込めるとプルダウンより素早く目的の項目へたどり着ける。",
    when: "選択肢の数が多く、都道府県・国名のようにユーザーがタイピングで絞り込める場面",
    link: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
    linkLabel: "APG: Comboboxパターン(参考例) ↗",
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="4" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="1.6" />
        <text x="8" y="15" fontSize="8" fill="#3A4FCF" fontFamily="Jost, Noto Sans JP">東京|</text>
        <line x1="24" y1="7" x2="24" y2="17" stroke="#3A4FCF" strokeWidth="1" />
      </svg>
    ),
  },
];

function PatternCards() {
  return (
    <div style={styles.cardGrid}>
      {PATTERNS.map((p) => (
        <div key={p.name} style={styles.card}>
          <div style={styles.cardIllustration}>{p.illustration()}</div>
          <div style={styles.cardName}>{p.name}</div>
          <div style={styles.cardSystem}>{p.system}</div>
          <p style={styles.cardDesc}>{p.desc}</p>
          <div style={styles.cardWhenLabel}>向いている場面</div>
          <p style={styles.cardWhen}>{p.when}</p>
          {p.refs && p.refs.map((r) => (<a key={r.url} href={r.url} target="_blank" rel="noreferrer" style={{ ...styles.cardLink, display: "block", marginBottom: 4 }}>{r.label}</a>))}
          <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel={p.link.startsWith("http") ? "noreferrer" : undefined} style={styles.cardLink}>{p.linkLabel}</a>
        </div>
      ))}
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表 */
const LEAD = "プルダウンのほかにも、決まった選択肢から1つを選ぶ形はいくつかある。代表的な4つの形をまとめた。";
const ABOUT = [
  { k: "目的・役割", v: "選択肢の見え方(常に見えるか・開くまで隠れるか)と、絞り込み方(タップだけか・入力もできるか)で、1つを選ぶ形を選び分ける" },
  { k: "よく使われる場面", v: "日付・国名をホイールで選ぶ、長い一覧から1つ選ぶ、都道府県を入力して絞り込む" },
  { k: "似た部品との違い", v: <>選択肢が少なく、すべて見せたいなら<PageLink to="/components/selection/radio">ラジオボタン</PageLink>、表示の切り替えのように少ない選択肢から1つ選んですぐ反映するなら<PageLink to="/components/navigation/segmented-control">セグメントコントロール</PageLink>。折りたたむ形は<PageLink to="/components/selection/select">セレクト(プルダウン)</PageLink></> },
];

/* 4系列での扱い。name があれば、その系列での名前(リンク付き)。none は記載なし・未確認 */
const AVAIL_SYSTEMS = ["Apple", "Google", "W3C", "NN group"];
const AVAIL = [
  { pattern: "プルダウン", cells: [
    { name: "Pop-up buttons", url: "https://developer.apple.com/design/human-interface-guidelines/pop-up-buttons" },
    { name: "Exposed dropdown menu", url: "https://m3.material.io/components/menus/guidelines" },
    { name: "Select-Only Combobox(APGの例)", url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/" },
    { name: "Dropdowns: Design Guidelines", url: "https://www.nngroup.com/articles/drop-down-menus/" },
  ] },
  { pattern: "ドラムロール/ホイールピッカー", cells: [
    { name: "Pickers(ホイール)", url: "https://developer.apple.com/design/human-interface-guidelines/pickers" },
    { none: "記載なし" },
    { none: "専用の型なし" },
    { name: "UI Elements Glossary: Wheel Picker(用語の定義のみ)", url: "https://www.nngroup.com/articles/ui-elements-glossary/#Wheel-Picker" },
  ] },
  { pattern: "リストボックス(常時展開)", cells: [
    { none: "記載なし" },
    { none: "記載なし" },
    { name: "Listboxパターン", url: "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/" },
    { name: "Listboxes vs. Dropdown Lists", url: "https://www.nngroup.com/articles/listbox-dropdown/" },
  ] },
  { pattern: "コンボボックス(入力+選択)", cells: [
    { name: "Combo boxes(macOSのみ)", url: "https://developer.apple.com/design/human-interface-guidelines/combo-boxes" },
    { name: "Exposed dropdown menu(入力できる型)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/Menu.md#exposed-dropdown-menu" },
    { name: "Comboboxパターン", url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/" },
    { name: "UI Elements Glossary: Combo Box(用語の定義のみ)", url: "https://www.nngroup.com/articles/ui-elements-glossary/#Combo-Box" },
  ] },
];

function AvailabilityTable() {
  return (
    <section style={{ marginTop: 40 }}>
      <h2 style={styles.availTitle}>4系列での扱い</h2>
      <p style={styles.availNote}>◯の欄は、その系列での名前とページへのリンクだ。「記載なし」は公式に該当するページがないものだ。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.availTable}>
          <thead>
            <tr><th style={styles.availTh}>パターン</th>{AVAIL_SYSTEMS.map((n) => (<th key={n} style={styles.availTh}>{n}</th>))}</tr>
          </thead>
          <tbody>
            {AVAIL.map((r) => (
              <tr key={r.pattern}>
                <td style={{ ...styles.availTd, fontWeight: 700 }}>{r.pattern}</td>
                {r.cells.map((c, i) => (
                  <td key={i} style={styles.availTd}>
                    {c.none ? <NoData>{c.none}</NoData> : (<><span style={{ color: "#2F7D6E", fontWeight: 700, marginRight: 4 }}>◯</span><a href={c.url} target="_blank" rel="noreferrer" style={{ color: "#3A4FCF" }}>{c.name} ↗</a></>)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={styles.availNote}>AppleのCombo boxesはmacOSだけの部品だ(iOS・iPadOSなどでは使えない)。GoogleのExposed dropdown menuは、選択肢から選ぶだけの型と、文字を入力できる型の両方を持つとしている。</p>
    </section>
  );
}

export default function SelectionSelectPatternsPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 900px; padding: 36px 24px 48px; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/components/selection/select-patterns" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / セレクトの種類(プルダウン以外)</span>
            <span>SPEC No. 012</span>
          </div>

          <h1 style={styles.title}>セレクトの種類(プルダウン以外)</h1>

          <SummaryCard lead={LEAD} rows={ABOUT} />

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              「セレクト(プルダウン)」ページで扱ったのは<strong>「普段は折りたたまれていて、開くと選択肢が現れる」</strong>という1つのパターンだったが、単一選択を実現する方法はそれだけではない。<strong>選択肢の見え方(常に見えるか/開くまで隠れているか)と、絞り込み方(タップだけか/入力もできるか)</strong>という2つの軸で整理すると、4つの代表的なパターンに分けられる。
            </p>
            <p style={styles.synthesisText}>
              特に<strong>Appleの「ドラムロール/ホイールピッカー」は、日付や国名のように順序がある予測しやすい値に特化</strong>した独自のパターンだ。2つの軸で言えば、選択肢の一部(前後の数行)が常に見えていて、タップや回転で選ぶ(入力はしない)位置にある。長すぎるリストにはテーブル(索引付き一覧)を使うべきという注意点も明記されている。
            </p>
            <p style={styles.synthesisText}>
              選択肢が非常に多い場合は、<strong>タイピングで絞り込める「コンボボックス」がプルダウンより素早い</strong>という点も、実務上重要な判断材料だ。
            </p>
          </div>

          <PatternCards />
          <AvailabilityTable />

          <div style={styles.tagsRow}>
            {["選択・切り替え", "入力・フォーム"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>このページは代表的なパターンをまとめた補助ページ。プルダウンの4系列比較は「セレクト(プルダウン)」ページを参照。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  availTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 8px", color: "#171B36" },
  availNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 10px" },
  availTable: { width: "100%", minWidth: 640, borderCollapse: "collapse", fontSize: 12, color: "#2E3457", marginBottom: 10 },
  availTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  availTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
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
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, marginBottom: 24 },
  card: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px" },
  cardIllustration: { marginBottom: 10, height: 40, display: "flex", alignItems: "center" },
  cardName: { fontSize: 14, fontWeight: 700, color: "#171B36", marginBottom: 3 },
  cardSystem: { fontSize: 10.5, color: "#666D93", marginBottom: 8 },
  cardDesc: { fontSize: 12, lineHeight: 1.65, color: "#454C78", margin: "0 0 10px" },
  cardWhenLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#3C5A73", marginBottom: 3 },
  cardWhen: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: "0 0 10px" },
  cardLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
