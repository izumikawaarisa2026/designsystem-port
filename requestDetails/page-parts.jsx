import React from "react";

/**
 * 各ページで共通に使う部品(③本人レビュー No.001 で決めたページのひな形)。
 * - SummaryCard: タイトルの下のサマリー(イメージ図・どんな部品か・目的・役割・使われる場面・似た部品との違い)
 * - RefList: 参照ページ(公式)の一覧。公式で別のページ・別のセクションに分かれている内容は、それぞれへのリンクを並べる。
 *   W3Cは、適合の要件である「達成基準(レベルA/AA/AAA)」と、実装の参考例である「APG」をバッジで見分けられるようにする
 * - Hl: 比較(カード・比較表)の中で、ページ下の「AI解釈 ― 総括」で取り上げている違い・共通点に引くマーカー
 * - NoData: 比較の中の「記載なし」「数値基準なし」「未確認」など、データがない箇所(薄いグレーの文字で示す)
 * - SplitSection: 「意見が分かれる点」(同じ問いに対して、系列によって答えが違う点)
 *
 * ビルド(build_preview.py)では、このファイルの export した名前が全ページから使えるようになる。
 * 各ページでは import { SummaryCard, RefList, SplitSection } from "./page-parts"; と書いて使う。
 */

const LINK = "#3A4FCF";

/* タイトルの下のサマリー。タイトル直下に、どんな部品か(lead)の1文。その下の枠の中に、イメージ図 → 目的・役割などの表(グレーの背景)を置く。
   lead は1文の定義(静的版のページ説明にも使われる。class="dsp-lead" を目印にしている)、rows は「目的・役割」などの行 */
export function SummaryCard({ image, imageLabel, imageNote, lead, rows }) {
  return (
    <>
      <p className="dsp-lead" style={partStyles.lead}>{lead}</p>
      <section style={partStyles.summary}>
        {image && (
          <div style={partStyles.summaryImage}>
            <span style={partStyles.summaryImageLabel}>{imageLabel || "コンポーネントイメージ(共通形状)"}</span>
            {image}
            {imageNote && <p style={partStyles.summaryImageNote}>{imageNote}</p>}
          </div>
        )}
        <dl style={partStyles.aboutList}>
          {(rows || []).map((a) => (
            <div key={a.k} style={partStyles.aboutRow}>
              <dt style={partStyles.aboutKey}>{a.k}</dt>
              <dd style={partStyles.aboutVal}>{a.v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

/* サイト内のページへのリンク(SummaryCard などの文中で使う) */
export function PageLink({ to, children }) {
  return <a href={to} style={{ color: LINK }}>{children}</a>;
}

const REF_KIND = {
  sc: { text: (r) => "達成基準 " + r.level, style: { color: "#7A5F12", background: "#FBF3DC", border: "1px solid #E2CF95" } },
  apg: { text: () => "参考例 APG", style: { color: "#565D8A", background: "#F3F6FA", border: "1px solid #D5D9EC" } },
  mdn: { text: () => "解説 MDN", style: { color: "#565D8A", background: "#F3F6FA", border: "1px solid #D5D9EC" } },
};

export const W3C_REF_NOTE = "達成基準=WCAGに適合するために満たす要件(Aが最低限、AAが一般的な目標、AAAはより高い水準)。APG=WAI-ARIAの使い方を示す実装の参考例で、適合の要件ではない。";

/* refs: [{ label, url, kind?: "sc"|"apg"|"mdn", level?: "A"|"AA"|"AAA" }]。W3C欄では withW3cNote で凡例を添える */
export function RefList({ refs, withW3cNote }) {
  return (
    <div>
      <ul style={partStyles.refList}>
        {refs.map((r) => (
          <li key={r.url} style={partStyles.refItem}>
            {r.kind && <span style={{ ...partStyles.refBadge, ...REF_KIND[r.kind].style }}>{REF_KIND[r.kind].text(r)}</span>}
            <a href={r.url} target="_blank" rel="noreferrer" style={{ color: LINK, textDecoration: "underline" }}>{r.label} ↗</a>
          </li>
        ))}
      </ul>
      {withW3cNote && <p style={partStyles.refNote}>{W3C_REF_NOTE}</p>}
    </div>
  );
}

/* 比較の中で、総括で取り上げている箇所に引くマーカー(太字+AI解釈と同じ若草色の下線マーカー) */
export function Hl({ children }) {
  return <strong style={partStyles.hl}>{children}</strong>;
}

/* データがない箇所。「記載なし」「数値基準なし」「未確認」など短い言葉で書き、薄いグレーにする */
export function NoData({ children }) {
  return <span style={partStyles.noData}>{children}</span>;
}

/* 意見が分かれる点。splits: [{ q, figure?(問い全体の図), sides: [{ who, color, t, figure? }], tip }] */
export function SplitSection({ title, splits }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={partStyles.h2}>{title || "意見が分かれる点"}</h2>
      <p style={partStyles.note}>同じ問いに対して、系列によって答えが違う点です。図は概念図です。</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {splits.map((s) => (
          <div key={s.q} style={partStyles.splitCard}>
            <div style={partStyles.splitQ}>{s.q}</div>
            {s.figure && <div style={partStyles.splitFigure}>{s.figure}</div>}
            <div style={partStyles.splitRow}>
              {s.sides.map((side) => (
                <div key={side.who} style={partStyles.splitSide}>
                  {side.figure}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ ...partStyles.splitWho, color: side.color }}>{side.who}</div>
                    <div style={partStyles.splitText}>{side.t}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={partStyles.splitTip}><strong>AI解釈: </strong>{s.tip}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const partStyles = {
  summary: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "18px 20px 20px", marginBottom: 40 },
  summaryImage: { textAlign: "center", marginBottom: 18 },
  summaryImageLabel: { display: "block", fontSize: 11.5, fontWeight: 700, color: "#454C78", textAlign: "left", marginBottom: 18 },
  summaryImageNote: { fontSize: 11, color: "#7E86AC", margin: "16px 0 0", lineHeight: 1.6 },
  lead: { fontSize: 14, fontWeight: 500, color: "#2E3457", margin: "0 0 28px", lineHeight: 1.7 },
  aboutList: { margin: 0, padding: "6px 16px", background: "#F3F6FA", borderRadius: 4 },
  aboutRow: { display: "flex", flexWrap: "wrap", gap: "2px 14px", padding: "8px 0" },
  aboutKey: { flex: "0 0 112px", fontSize: 12, fontWeight: 700, color: "#454C78", margin: 0 },
  aboutVal: { flex: "1 1 260px", fontSize: 12.5, lineHeight: 1.7, color: "#2E3457", margin: 0, minWidth: 0 },
  refList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 5 },
  refItem: { fontSize: 11, lineHeight: 1.6 },
  refBadge: { display: "inline-block", fontSize: 9.5, fontWeight: 600, padding: "0 5px", marginRight: 6, borderRadius: 3, whiteSpace: "nowrap", lineHeight: 1.6, fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace" },
  refNote: { fontSize: 10, lineHeight: 1.55, color: "#7E86AC", margin: "6px 0 0" },
  hl: { fontWeight: 700, color: "#171B36", background: "linear-gradient(transparent 58%, #E2EFC4 58%)" },
  noData: { color: "#9EA4C4" },
  h2: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  note: { fontSize: 11.5, color: "#7E86AC", margin: "0 0 10px", lineHeight: 1.6 },
  splitCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", background: "#FFFFFF" },
  splitQ: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 8 },
  splitFigure: { margin: "0 0 10px", padding: "10px 12px", background: "#F8F9FD", borderRadius: 4 },
  splitRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 },
  splitSide: { display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start", background: "#F8F9FD", borderRadius: 4, padding: "8px 10px" },
  splitWho: { fontSize: 11.5, fontWeight: 700 },
  splitText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 2 },
  splitTip: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", background: "#FAFCEE", borderLeft: "3px solid #5A9629", padding: "6px 10px", marginTop: 10, borderRadius: "0 3px 3px 0" },
};
