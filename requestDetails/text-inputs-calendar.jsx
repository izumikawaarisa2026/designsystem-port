import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Text inputs / カレンダー(スケジュール/予定表)」ページ。
 *
 * 「日付/タイムピッカー」ページが扱う「単一の日付を選ぶための入力コントロール」
 * とは異なり、このページはGoogleカレンダーのような「予定を表示・管理する
 * スケジュール/アジェンダのビュー」を扱う。ユーザーからの新規ページ依頼を受けて
 * 2026-09に新規作成。
 *
 * 2026-09 追記(内容の訂正): 初版はApple・Googleを「該当コンポーネントなし」と
 * していたが、ユーザーから「MD3・Appleにも存在する(名称が日付ピッカーなど
 * 違うだけ)」という指摘を受け、確認したところ事実だった。Apple の
 * UIDatePickerStyle.inline/.compactは「十分なスペースがあればモーダルの手間
 * なくフルサイズのカレンダーを直接表示する」ものであり、実質的に月表示の
 * カレンダーグリッドである(検索結果で確認、2026-09)。GoogleのDate pickers
 * Modalバリアントも、月をまたぐ横スワイプ・年をまたぐ縦スクロールを持つ
 * カレンダーグリッドUIそのもの(「日付/タイムピッカー」ページで確認済み)。
 * NN groupの既存記事(Date-Input Form Fields)も、カレンダーピッカー(グリッド
 * UI)の使いどころを論じている。したがって正しい発見は「4系列とも独立した
 * 『カレンダー』コンポーネントは持たないが、いずれも日付ピッカーの1バリエー
 * ションとして実質的なカレンダーグリッドUIを持つ」であり、「該当なし」では
 * なかった。一方で、複数の予定を並べて表示・管理するスケジュール/アジェンダ
 * 専用のビューは、4系列のいずれにも見当たらないという点は変わらない
 * (この差を正しく分けて記載するよう全面的に書き直した)。
 *
 * Apple(UIDatePickerStyle.inlineの技術文書、iOS 14での.inline/.compact追加の
 * 経緯)・Google(m3.material.ioのDate pickers Modalバリアントのナビゲーション
 * 操作)は検索結果による確認(2026-09、いずれも公式サイト本文はSPAのため
 * 直接確認はできていない)。W3C(WAI-ARIA APG Grid Patternのページ本文、Layout
 * Grid Examplesページ)・NN group(Date-Input Form Fields記事)は本文を直接
 * 取得して確認済み(2026-09)。
 *
 * 2026-09 追記: ユーザーから「四系列デザインシステム比較のApple・Googleのデザイン
 * イメージも追記したい」というフィードバックを受け、W3C・NN groupにのみあった
 * illustrationを、Apple(UIDatePickerStyle.inlineの月表示グリッド、選択日を円形で表示)・
 * Google(Date pickers Modalの月表示グリッド、月送りナビゲーション付き、選択日を
 * 角丸四角で表示)にも追加した。あわせて、プレビューがPC幅でもモバイル向けカード
 * グリッドが混在して見えるという指摘を受け、ビルド成果物の取り違えの可能性を
 * 排除するため、現在のソースから作り直した単独プレビューを再公開した(コード側の
 * dsp-mobile-only/dsp-desktop-onlyの切り替えロジック自体に変更はない)。
 */

const SOURCES = [
  {
    key: "hig",
    related: <>日付ピッカーのインライン・コンパクトのスタイルが月表示のカレンダーを描くが、1つの日付を選ぶためのコンポーネント(<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink>)。</>,
    name: "Apple",
    doc: "Human Interface Guidelines ― Pickers(関連)",
    term: <NoData>該当なし</NoData>,
    color: "#C2542A",
    position: <NoData>該当なし(予定表のコンポーネントはない)</NoData>,
    size: <NoData>該当なし</NoData>,
    colorInfo: <NoData>該当なし</NoData>,
    stance: <><NoData>該当なし</NoData>。関連: 日付ピッカーのインライン・コンパクトのスタイルが月表示のカレンダーを描くが、1つの日付を選ぶためのコンポーネント(<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink>)。</>,
    exceptions: <NoData>該当なし</NoData>,
    accessibility: <NoData>該当なし</NoData>,
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/pickers",
    refs: [
      { label: "関連: Pickers", url: "https://developer.apple.com/design/human-interface-guidelines/pickers" },
      { label: "補足(実装): UIDatePickerStyle.inline", url: "https://developer.apple.com/documentation/uikit/uidatepickerstyle/inline" },
    ],
    confirmedNote:
      "HIG Pickersの本文(iOS・iPadOSの日付ピッカーのコンパクト・インライン・ホイール・自動のスタイル)と、UIDatePickerStyleの技術文書で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="6" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.4" />
        <text x="60" y="12" fontSize="7.5" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">2026年9月</text>
        <line x1="6" y1="17" x2="114" y2="17" stroke="#C2542A" strokeWidth="0.6" opacity="0.4" />
        {Array.from({ length: 14 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const cx = 13 + col * 15.5;
          const cy = 32 + row * 18;
          return (
            <g key={i}>
              {i === 8 && <circle cx={cx} cy={cy} r="6.5" fill="#C2542A" />}
              <text x={cx} y={cy + 2.5} fontSize="7" fill={i === 8 ? "#FFFFFF" : "#454C78"} textAnchor="middle" fontFamily="Jost, Noto Sans JP">{i + 1}</text>
            </g>
          );
        })}
      </svg>
    ),
    illustrationNote: "関連: 日付ピッカー(インライン)の月表示(概念図・系列識別色)",
  },
  {
    key: "material",
    related: <>Date pickersのモーダルの形が月表示のカレンダーを描くが、1つの日付(または範囲)を選ぶためのコンポーネント(<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink>)。</>,
    name: "Google",
    doc: "Material Design 3 ― Date pickers(関連)",
    term: <NoData>該当なし</NoData>,
    color: "#2F7D6E",
    position: <NoData>該当なし(予定表のコンポーネントはない)</NoData>,
    size: <NoData>該当なし</NoData>,
    colorInfo: <NoData>該当なし</NoData>,
    stance: <><NoData>該当なし</NoData>。関連: Date pickersのモーダルの形が月表示のカレンダーを描くが、1つの日付(または範囲)を選ぶためのコンポーネント(<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink>)。</>,
    exceptions: <NoData>該当なし</NoData>,
    accessibility: <NoData>該当なし</NoData>,
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    url: "https://m3.material.io/components/date-pickers/guidelines",
    refs: [
      { label: "関連: Date pickers", url: "https://m3.material.io/components/date-pickers/guidelines" },
    ],
    confirmedNote:
      "月・年の移動(横スワイプで月、年をタップして年を選ぶ)はM3 Date pickersのガイドラインによる。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="6" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.4" />
        <text x="60" y="12" fontSize="7.5" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">◀ 2026年9月 ▶</text>
        <line x1="6" y1="17" x2="114" y2="17" stroke="#2F7D6E" strokeWidth="0.6" opacity="0.4" />
        {Array.from({ length: 14 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const cx = 13 + col * 15.5;
          const cy = 32 + row * 18;
          return (
            <g key={i}>
              {i === 8 && <rect x={cx - 6.5} y={cy - 6.5} width="13" height="13" rx="6.5" fill="#2F7D6E" />}
              <text x={cx} y={cy + 2.5} fontSize="7" fill={i === 8 ? "#FFFFFF" : "#454C78"} textAnchor="middle" fontFamily="Jost, Noto Sans JP">{i + 1}</text>
            </g>
          );
        })}
      </svg>
    ),
    illustrationNote: "関連: Date pickers(モーダル)の月表示(概念図・系列識別色)",
  },
  {
    key: "wcag",
    related: <>表の形で操作するコンポーネントの参考例としてGridパターンがあり、日付ピッカーの例もこれを使っている。予定表を作るときも、各セルの押せる範囲(2.5.8)や、選んだ日・予定を示す印のコントラスト(1.4.11)は、ほかのコンポーネントと同じく満たす。</>,
    name: "W3C",
    doc: "WAI-ARIA APG ― Grid Pattern(関連)",
    term: <NoData>該当なし</NoData>,
    color: "#A3821F",
    position: <NoData>該当なし(予定表の決まりや実装例はない)</NoData>,
    size: <NoData>該当なし</NoData>,
    colorInfo: <NoData>該当なし</NoData>,
    stance: <><NoData>該当なし</NoData>。関連: 表の形で操作するコンポーネントの参考例としてGridパターンがあり、日付ピッカーの例もこれを使っている。予定表を作るときも、各セルの押せる範囲(2.5.8)や、選んだ日・予定を示す印のコントラスト(1.4.11)は、ほかのコンポーネントと同じく満たす。</>,
    exceptions: <NoData>該当なし</NoData>,
    accessibility: <NoData>該当なし</NoData>,
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/grid/",
    refs: [
      { kind: "apg", label: "関連: APG Grid Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/grid/" },
    ],
    confirmedNote: "Grid Patternの本文、およびLayout Grid Examplesページ(実例が3つのみで、カレンダー・アジェンダの実例がないこと)を直接取得して確認済み(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="30" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="grid"</text>
          <text x="60" y="44" fontSize="7.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">(汎用パターンの転用)</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、汎用グリッド構造の考え方を図示",
  },
  {
    key: "nn",
    related: <>日付入力の記事で、カレンダーピッカーは近い日付や期間を選ぶのに向くとしている(<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink>)。</>,
    name: "Nielsen Norman Group",
    doc: "Date-Input Form Fields(関連)",
    term: <NoData>該当なし</NoData>,
    color: "#7A4F7E",
    position: <NoData>該当なし(予定表を主題にした記事はない)</NoData>,
    size: <NoData>該当なし</NoData>,
    colorInfo: <NoData>該当なし</NoData>,
    stance: <><NoData>該当なし</NoData>。関連: 日付入力の記事で、カレンダーピッカーは近い日付や期間を選ぶのに向くとしている(<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink>)。</>,
    exceptions: <NoData>該当なし</NoData>,
    accessibility: <NoData>該当なし</NoData>,
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "less than a year",
    url: "https://www.nngroup.com/articles/date-input/",
    refs: [
      { label: "関連: Date-Input Form Fields: UX Design Guidelines", url: "https://www.nngroup.com/articles/date-input/" },
    ],
    confirmedNote: "記事本文を直接取得して確認済み(2026-09)。「日付/タイムピッカー」ページと同一の記事。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.4" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={16 + i * 16} cy="35" r="4" fill={i === 3 ? "#7A4F7E" : "none"} stroke="#7A4F7E" strokeWidth="1" />
        ))}
        <text x="60" y="58" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">近い日付・範囲選択向き</text>
      </svg>
    ),
    illustrationNote: "「日付/タイムピッカー」ページと同じカレンダーピッカーの使いどころ(概念図・系列識別色)",
  },
];

function InfoBox({ label, accent, muted, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent && !muted ? { borderLeftColor: accent } : {}) }}>
      <span style={{ ...styles.exceptionLabel, ...(muted ? styles.mutedText : {}) }}>{label}</span>
      <div style={{ ...styles.exceptionText, ...(muted ? styles.mutedText : {}) }}>{children}</div>
    </div>
  );
}

function UseCaseList({ items, muted }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={{ ...styles.useCaseItem, ...(muted ? styles.mutedText : {}) }}>{it}</li>))}
    </ul>
  );
}

function GlossaryNote({ items }) {
  return (
    <div style={styles.glossaryNoteBox}>
      <span style={styles.glossaryNoteLabel}>メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function CalendarSwatch() {
  return (
    <div style={{ width: 260, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden", textAlign: "left" }}>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #E1E3F0", fontSize: 12, fontWeight: 700, color: "#171B36" }}>2026年9月</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, background: "#E1E3F0" }}>
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <div key={d} style={{ background: "#F8F9FD", textAlign: "center", fontSize: 9, color: "#666D93", padding: "3px 0" }}>{d}</div>
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ background: "#FFFFFF", minHeight: 26, fontSize: 9, color: "#454C78", padding: "2px 3px", position: "relative" }}>
            {i + 1}
            {i === 8 && <div style={{ marginTop: 2, background: "#3A4FCF", height: 4, borderRadius: 2 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "予定を日・週・月などの表で見せる画面(予定表そのものの指針は4系列ともない)";
const ABOUT = [
  { k: "目的・役割", v: "予定や出来事を、日付の並びの中で見渡せるようにする" },
  { k: "よく使われる場面", v: "カレンダーアプリ、会議室・店舗の予約状況、シフト表" },
  { k: "似たコンポーネントとの違い", v: <>日付を1つ選んで入力するのは<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink></> },
];

export default function TextInputsCalendarPage() {
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
        <SidebarNav currentPath="/components/text-inputs/calendar" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / カレンダー(スケジュール/予定表)</span>
            <span>SPEC No. 039</span>
          </div>

          <h1 style={styles.title}>カレンダー(スケジュール/予定表)</h1>
          <SummaryCard
            imageLabel="コンポーネントイメージ(月表示の例)"
            image={<><CalendarSwatch /></>}
            imageNote={<>コンポーネントとしてこの形のカレンダーを持つのはAppleとGoogleで、どちらも独立した「Calendar」コンポーネントではなく「日付ピッカー」の1バリエーションだ。W3Cは汎用のGridパターン(と実装例)、NN groupは日付入力の記事の中で扱っている。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>予定を日・週・月の表で見せる「予定表」のコンポーネントや指針は、4系列のどれにもない</strong>。AppleとGoogleが持つ月表示のカレンダーは、どちらも1つの日付(または期間)を選ぶ<PageLink to="/components/selection/date-time-picker">日付/タイムピッカー</PageLink>の形で、予定表とは別物だ。W3CにもGridパターン(表の形で操作するコンポーネントの参考例)があるだけで、予定表の実装例はない。
            </p>
            <p style={styles.synthesisText}>
              自作する場合は、<strong>日付の並びの操作はAPGのGridパターンを参考にし、予定の見せ方は<PageLink to="/components/containment/card">カード</PageLink>・<PageLink to="/components/containment/list">リスト</PageLink>・<PageLink to="/components/communication/badge">バッジ</PageLink>など、ほかのコンポーネントを組み合わせて設計する</strong>ことになる(AI解釈)。
            </p>
          </div>
          <div style={styles.noneRow}><NoData>4系列とも、予定表の独立したコンポーネント・指針はない</NoData></div>
          <h3 style={styles.relHead}>関連(各系列の近いコンポーネント・参考例)</h3>
          <div style={styles.relGrid}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceName}>{s.name}</div>
                <div style={styles.sourceDoc}>{s.doc}</div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <p style={styles.sourceStance}>{s.related}</p>
                <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
              </div>
            ))}
          </div>

          <RelatedPages paths={["/components/selection/date-time-picker", "/components/selection/overview", "/components/containment/card", "/components/containment/list"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["情報の整理・一覧"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  noneRow: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 16px", fontSize: 13.5, fontWeight: 600, marginBottom: 22 },
  relHead: { fontSize: 13.5, fontWeight: 700, color: "#171B36", margin: "0 0 10px" },
  relGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 40 },
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  positionBadgeMuted: { color: "#666D93", background: "#F3F4F9" },
  mutedText: { color: "#666D93" },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#666D93", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#666D93", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#666D93", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#666D93" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
