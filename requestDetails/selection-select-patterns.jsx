import React from "react";
import SidebarNav from "./sidebar-nav";

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
 * 確認済み(2026-09)。リストボックス・コンボボックスはWAI-ARIA Authoring Practices
 * および「セレクト(プルダウン)」ページで確認済みの内容を再構成したもの。
 */

const PATTERNS = [
  {
    name: "プルダウン(ドロップダウン)",
    system: "Apple(Pop-up/Pull-downボタン)・Google(Exposed dropdown menu)",
    desc: "普段は折りたたまれており、タップすると選択肢が現れる最も一般的な単一選択パターン。省スペースだが、開くまで選択肢が見えないという弱点がある。",
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
    linkLabel: "Apple公式ページへ ↗",
    illustration: () => (
      <svg width="70" height="40" viewBox="0 0 70 40">
        <rect x="1" y="1" width="68" height="38" rx="4" fill="#F8F9FD" stroke="#E1E3F0" strokeWidth="1" />
        <rect x="3" y="16" width="64" height="8" fill="#EEF1FA" stroke="#3A4FCF" strokeWidth="1" />
        <text x="35" y="10" fontSize="8" fill="#B7BCDA" textAnchor="middle" fontFamily="Jost, Noto Sans JP">8月</text>
        <text x="35" y="22" fontSize="9" fill="#171B36" fontWeight="700" textAnchor="middle" fontFamily="Jost, Noto Sans JP">9月</text>
        <text x="35" y="34" fontSize="8" fill="#B7BCDA" textAnchor="middle" fontFamily="Jost, Noto Sans JP">10月</text>
      </svg>
    ),
  },
  {
    name: "リストボックス(常時展開)",
    system: "WAI-ARIA(Listboxパターン)",
    desc: "選択肢を折りたたまず、常に一覧として表示するパターン。単一選択・複数選択のどちらにも対応できる。Nielsen Norman Groupは、ドロップダウンが「クリックしないと選択肢が見えない」のに対し、リストボックスは「選択肢がすぐに見える」点で区別している。",
    when: "選択肢を見比べながら選ばせたい場面、画面スペースに余裕がある場面",
    link: "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/",
    linkLabel: "WAI-ARIA公式ページへ ↗",
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
    desc: "テキストフィールドに文字を入力すると、一致する選択肢だけに絞り込まれるパターン。「スピナー」とも呼ばれ、選択肢が非常に多い場合にプルダウンより素早く目的の項目へたどり着ける。",
    when: "選択肢の数が多く、都道府県・国名のようにユーザーがタイピングで絞り込める場面",
    link: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
    linkLabel: "WAI-ARIA公式ページへ ↗",
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
          <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel={p.link.startsWith("http") ? "noreferrer" : undefined} style={styles.cardLink}>{p.linkLabel}</a>
        </div>
      ))}
    </div>
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
          <p style={styles.subtitle}>単一選択を実現するUIパターンは、プルダウンだけではありません。代表的な4つのパターンをまとめました</p>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              「セレクト(プルダウン)」ページで扱ったのは<strong>「普段は折りたたまれていて、開くと選択肢が現れる」</strong>という1つのパターンでしたが、単一選択を実現する方法はそれだけではありません。<strong>選択肢の見え方(常に見えるか/開くまで隠れているか)と、絞り込み方(タップだけか/入力もできるか)</strong>という2つの軸で整理すると、4つの代表的なパターンに分けられます。
            </p>
            <p style={styles.synthesisText}>
              特に<strong>Appleの「ドラムロール/ホイールピッカー」は、日付や国名のように順序がある予測しやすい値に特化</strong>した独自のパターンです。長すぎるリストにはテーブル(索引付き一覧)を使うべきという注意点も明記されています。
            </p>
            <p style={styles.synthesisText}>
              選択肢が非常に多い場合は、<strong>タイピングで絞り込める「コンボボックス」がプルダウンより素早い</strong>という点も、実務上重要な判断材料です。
            </p>
          </div>

          <PatternCards />

          <div style={styles.tagsRow}>
            {["選択・切り替え", "入力・フォーム"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(ドラムロール/ホイールピッカーはApple公式ページ本文を直接確認。リストボックス・コンボボックスはWAI-ARIA公式仕様を確認)</span>
            <span>このページは4系列横断の比較表ではなく、代表的なパターンをまとめたギャラリー的な補助ページです。プルダウンの4系列比較は「セレクト(プルダウン)」ページを参照してください。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
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
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14, marginBottom: 24 },
  card: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px" },
  cardIllustration: { marginBottom: 10, height: 40, display: "flex", alignItems: "center" },
  cardName: { fontSize: 14, fontWeight: 700, color: "#171B36", marginBottom: 3 },
  cardSystem: { fontSize: 10.5, color: "#7E86AC", marginBottom: 8 },
  cardDesc: { fontSize: 12, lineHeight: 1.65, color: "#454C78", margin: "0 0 10px" },
  cardWhenLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#3C5A73", marginBottom: 3 },
  cardWhen: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: "0 0 10px" },
  cardLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
