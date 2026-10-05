import React from "react";
import SidebarNav from "./sidebar-nav";

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines",
    value: "44 × 44",
    unit: "pt",
    diagramColor: "#C2542A",
    stance:
      "全てのタッチ操作可能な要素は、最小44×44ptのヒットターゲットを持つべきと規定。運動機能に制約のある人にとって、小さすぎるコントロールは操作の障壁になるとしている。",
    exceptions:
      "視覚的なアイコン自体を小さくすることは許容するが、その場合もヒット領域(判定範囲)は可視サイズより広く確保し、44×44pt以上を保つ設計を前提としている。数値そのものを下げてよいケースは明記していない。",
    scale: {
      bands: [
        { from: 0, to: 44, type: "ng" },
        { from: 44, to: 60, type: "ok" },
      ],
      markers: [{ at: 44, label: "44" }],
      caption: "44pt が唯一の基準線。それ未満を許容する条件は明記なし。",
    },
    pourDetail: "操作可能(Operable) ― WCAGのPOUR原則(知覚可能・操作可能・理解可能・堅牢)のうち「操作可能」に対応する項目、という分類。",
    searchHint: "hit target",
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3",
    value: "48 × 48",
    unit: "dp",
    diagramColor: "#2F7D6E",
    stance:
      "インタラクティブな要素は最小48×48dpのタッチターゲットを満たすことを基準とする。密度(density)を上げる場合でも、この最小値を下回らないよう明記している。",
    exceptions:
      "アイコン自体の可視サイズ(24dpなど)を小さくすることは認めているが、タップ判定領域そのものを48×48dp未満に縮めることは推奨していない。'ベストプラクティスとして48×48pxを下回らない'という表現を繰り返し使っている。",
    scale: {
      bands: [
        { from: 0, to: 24, type: "ng" },
        { from: 24, to: 48, type: "caution" },
        { from: 48, to: 60, type: "ok" },
      ],
      markers: [
        { at: 24, label: "24" },
        { at: 48, label: "48" },
      ],
      caption: "24dp=可視アイコンの下限 / 48dp=タップ判定領域の下限(この2つは別管理)。",
    },
    pourDetail: "操作可能(Operable) ― WCAGのPOUR原則のうち「操作可能」に対応する項目、という分類。",
    searchHint: "touch target",
    url: "https://m3.material.io/components/buttons/accessibility",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.5.5 / 2.5.8",
    value: "24〜44",
    unit: "CSS px",
    diagramColor: "#A3821F",
    stance:
      "レベルAA(2.5.8)は24×24px以上、または隣接要素との間隔確保を最低条件とする。より厳格なレベルAAA(2.5.5)では44×44pxを求める、と段階的に基準を分けている。",
    exceptions:
      "AA基準には4つの適合ルートがある: ①周囲24px以上の余白を確保、②同機能の十分な大きさの代替ターゲットが別途ある、③文中インラインリンクである、④ブラウザなどユーザーエージェント側がサイズを制御している。いずれかを満たせば24px未満でも適合と見なす、という条件分岐が他の3系列にはない特徴。",
    scale: {
      bands: [
        { from: 0, to: 24, type: "ng" },
        { from: 24, to: 44, type: "caution" },
        { from: 44, to: 60, type: "ok" },
      ],
      markers: [
        { at: 24, label: "24" },
        { at: 44, label: "44" },
      ],
      caption: "24px=レベルAA(条件付き) / 44px=レベルAAA(無条件)。",
    },
    pourDetail: "操作可能(Operable) ― POUR原則そのものを定義している一次情報。他の3系列が従う分類の出どころ。",
    searchHint: "Target Size",
    // このページのテーマ(タップ領域)については、このURL自体がすでに単独トピックの最小単位ページのため、
    // これ以上細かいアンカーは存在しない(2026-08 確認)。
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Touch Target Size / Fitts's Law",
    value: "約 1 × 1",
    unit: "cm",
    diagramColor: "#7A4F7E",
    stance:
      "数値基準そのものより、フィッツの法則(対象が小さく遠いほど到達に時間がかかる)という根拠から、指の平均接地面積を踏まえた最小1cm四方を目安として提示している。",
    exceptions:
      "明確な緩和条件は提示していないが、単一ターゲットの操作と複数ターゲットが密集する操作とでは要求精度が異なると指摘。密なUIほど、サイズより余白での代替を推奨する傾向がある(数値の例外というより設計判断の指針)。",
    scale: {
      bands: [
        { from: 0, to: 34, type: "ng" },
        { from: 34, to: 42, type: "caution" },
        { from: 42, to: 60, type: "ok" },
      ],
      markers: [{ at: 38, label: "~38" }],
      caption: "1cmをpx換算した目安(画面密度により変動、幅を持たせて表示)。",
    },
    pourDetail: "根拠となる原則 ― POURのような適合区分ではなく、フィッツの法則という設計上の根拠(なぜ大きい方がよいか)を示す位置づけ。",
    searchHint: "1cm",
    // このページのテーマ(タップ領域)については、このURL自体がすでに単独トピックの記事ページのため、
    // これ以上細かいアンカーは存在しない(2026-08 確認)。
    url: "https://www.nngroup.com/articles/touch-target-size/",
  },
];

const BAND_COLOR = {
  ng: { fill: "#F7E4E1", stroke: "#C0503F" },
  caution: { fill: "#FBF0D9", stroke: "#A97A1A" },
  ok: { fill: "#E4F0EC", stroke: "#2F7D6E" },
};

function RangeScale({ scale }) {
  const domainMax = 60;
  const w = 264;
  const x = (v) => (v / domainMax) * w;
  return (
    <div style={{ marginBottom: 10 }}>
      <svg viewBox={`0 0 ${w} 44`} style={{ width: "100%", height: "auto", display: "block" }}>
        {scale.bands.map((b, i) => (
          <rect
            key={i}
            x={x(b.from)}
            y={4}
            width={x(b.to) - x(b.from)}
            height={14}
            fill={BAND_COLOR[b.type].fill}
            stroke={BAND_COLOR[b.type].stroke}
            strokeWidth="1"
          />
        ))}
        {[0, 10, 20, 30, 40, 50, 60].map((t) => (
          <line key={t} x1={x(t)} y1={18} x2={x(t)} y2={22} stroke="#D5D9EC" strokeWidth="1" />
        ))}
        {scale.markers.map((m, i) => (
          <g key={i}>
            <line x1={x(m.at)} y1={1} x2={x(m.at)} y2={20} stroke="#171B36" strokeWidth="1.4" />
            <circle cx={x(m.at)} cy={1} r="2" fill="#171B36" />
            <text x={x(m.at)} y={34} fontSize="9" fontFamily="IBM Plex Mono" fill="#171B36" textAnchor="middle" fontWeight="600">
              {m.label}
            </text>
          </g>
        ))}
      </svg>
      <p style={{ fontSize: 11, color: "#565D8A", margin: "4px 0 0", lineHeight: 1.5 }}>{scale.caption}</p>
    </div>
  );
}

export default function DesignSystemCompareProto() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/components/actions/button" />
        <div style={styles.inner}>
        {/* breadcrumb / spec no */}
        <div style={styles.metaRow}>
          <span>コンポーネント / タップ領域</span>
          <span>SPEC No. 001</span>
        </div>

        <h1 style={styles.title}>ボタン ― タップ領域</h1>
        <p style={styles.subtitle}>4つのガイドラインの基準を、実寸に近い縮尺で重ねて比較する</p>

        {/* AI synthesis - lead summary */}
        <div style={styles.synthesisBox}>
          <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
          <p style={styles.synthesisText}>
            数値の下限には24〜48pxという幅があるが、これは<strong>「絶対最低ライン」(WCAG AA)</strong>と
            <strong>「快適に押せる目安」(HIG・Material・NN)</strong>という異なる問いに答えているために生じる差にすぎない。
          </p>
          <p style={styles.synthesisText}>
            実務では<strong>主要なアクションボタンは44〜48px前後を基準</strong>にし、密なUIでやむを得ず縮める場合のみ、WCAG
            AAの24pxかつ周囲24pxの余白確保を最終防衛ラインとして扱うのが現実的な着地点。
          </p>
          <p style={styles.synthesisText}>
            また、アイコンの「可視サイズ」と「タップ判定領域」を<strong>別物として管理する設計</strong>は4系列に共通する実装上の要点で、可視サイズだけを小さくし判定領域は保つ、という考え方が横断的に見られる。
          </p>
        </div>

        {/* overlay diagram - compact, colored for readability */}
        <div style={styles.diagramCard}>
          <h2 style={styles.diagramTitle}>四サイト比較図</h2>
          <svg viewBox="0 0 240 96" style={{ width: "100%", height: "auto" }}>
            <rect x="8" y="6" width="70" height="70" fill="none" stroke="#2F7D6E" strokeWidth="1.6" />
            <rect x="8" y="15" width="61" height="61" fill="none" stroke="#C2542A" strokeWidth="1.6" />
            <rect x="10" y="17" width="61" height="61" fill="none" stroke="#A3821F" strokeWidth="1.2" strokeDasharray="4 3" />
            <rect x="8" y="29" width="47" height="47" fill="#7A4F7E" fillOpacity="0.08" stroke="#7A4F7E" strokeWidth="1.6" />

            <text x="92" y="14" fontSize="9.5" fill="#2F7D6E" fontFamily="IBM Plex Mono" fontWeight="600">Material 48dp</text>
            <text x="92" y="30" fontSize="9.5" fill="#C2542A" fontFamily="IBM Plex Mono" fontWeight="600">HIG 44pt</text>
            <text x="92" y="46" fontSize="9.5" fill="#A3821F" fontFamily="IBM Plex Mono" fontWeight="600">WCAG AAA 44px</text>
            <text x="92" y="62" fontSize="9.5" fill="#7A4F7E" fontFamily="IBM Plex Mono" fontWeight="600">NN 約1cm(目安)</text>
            <text x="92" y="80" fontSize="8.5" fill="#565D8A" fontFamily="IBM Plex Sans JP">
              <tspan x="92" dy="0">HIGとWCAG(AAA)は数値が44で一致</tspan>
              <tspan x="92" dy="12">(単位換算はあくまで目安)</tspan>
            </text>
          </svg>
        </div>

        {/* legend */}
        <div style={styles.legendRow}>
          <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ok.fill, borderColor: BAND_COLOR.ok.stroke }} />推奨</span>
          <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.caution.fill, borderColor: BAND_COLOR.caution.stroke }} />条件付き</span>
          <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ng.fill, borderColor: BAND_COLOR.ng.stroke }} />非推奨</span>
        </div>

        {/* per-source cards */}
        <div style={styles.sourceList}>
          {SOURCES.map((s) => (
            <div key={s.key} style={styles.sourceCard}>
              <div style={styles.sourceHeadRow}>
                <div>
                  <div style={styles.sourceName}>{s.name}</div>
                  <div style={styles.sourceDoc}>{s.doc}</div>
                </div>
                <div style={styles.sourceValueWrap}>
                  <span style={styles.sourceValue}>{s.value}</span>
                  <span style={styles.sourceUnit}>{s.unit}</span>
                </div>
              </div>
              <p style={styles.sourceStance}>{s.stance}</p>
              <div style={styles.exceptionBox}>
                <span style={styles.exceptionLabel}>例外・許容ケース</span>
                <p style={styles.exceptionText}>{s.exceptions}</p>
              </div>
              <RangeScale scale={s.scale} />
              <div style={styles.pourBox}>
                <span style={styles.exceptionLabel}>アクセシビリティ(WCAG基準)</span>
                <p style={styles.exceptionText}>{s.pourDetail}</p>
              </div>
              <div style={styles.sourceFootRow}>
                <span style={styles.searchHint}>
                  ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span>
                </span>
                <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>
                  公式ページへ ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* tags */}
        <div style={styles.tagsRow}>
          {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
          {["操作方法(タッチ・キーボード)"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
        </div>

        <div style={styles.footer}>
          <span>最終確認: 2026-08(プロトタイプにつき仮の日付)</span>
          <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
          <span style={{ marginTop: 4 }}>
            リンクについて: 可能な場合は該当セクションへのアンカーリンクを使う方針。ただしApple
            HIG・Material Design 3はJS描画のSPAでページ内アンカーを公開しておらず、WCAG・NN
            groupは本テーマの記事ページ自体がすでに最小単位のため、今回は4系列ともページ単位のリンクが上限。
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
    color: "#171B36",
  },
  layout: { display: "flex", alignItems: "flex-start" },
  inner: { maxWidth: 520, margin: "0 auto", flex: 1, minWidth: 0, padding: "28px 16px 40px" },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: "#7E86AC",
    letterSpacing: 0.3,
    marginBottom: 14,
  },
  title: {
    fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
    fontSize: 26,
    fontWeight: 700,
    margin: "0 0 6px",
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 13.5,
    color: "#565D8A",
    margin: "0 0 22px",
  },
  synthesisBox: {
    background: "#FAFCEE",
    borderLeft: "4px solid #5A9629",
    padding: "16px 18px",
    marginBottom: 20,
    borderRadius: "0 4px 4px 0",
  },
  synthesisLabel: {
    fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
    fontSize: 16,
    color: "#5A9629",
    fontWeight: 700,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  synthesisText: { fontSize: 13, lineHeight: 1.8, color: "#171B36", margin: "0 0 8px" },
  diagramCard: {
    background: "#FFFFFF",
    border: "1px solid #E1E3F0",
    borderRadius: 4,
    padding: "12px 14px",
    marginBottom: 20,
  },
  diagramTitle: {
    fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    margin: "0 0 10px",
    color: "#171B36",
  },
  legendRow: {
    display: "flex",
    gap: 14,
    marginBottom: 10,
    fontSize: 11,
    color: "#565D8A",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  legendItem: { display: "flex", alignItems: "center", gap: 5 },
  legendSwatch: {
    display: "inline-block",
    width: 10,
    height: 10,
    border: "1px solid",
    borderRadius: 2,
  },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: {
    background: "#FFFFFF",
    border: "1px solid #E1E3F0",
    borderRadius: 4,
    padding: "14px 16px",
  },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  sourceValueWrap: { textAlign: "right" },
  sourceValue: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 15, color: "#171B36" },
  sourceUnit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#7E86AC", marginLeft: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "8px 0 10px" },
  exceptionBox: {
    background: "#F8F9FD",
    borderLeft: "2px solid #E1E3F0",
    padding: "8px 10px",
    marginBottom: 10,
    borderRadius: "0 3px 3px 0",
  },
  pourBox: {
    background: "#F8F9FD",
    borderLeft: "2px solid #E1E3F0",
    padding: "8px 10px",
    marginBottom: 10,
    borderRadius: "0 3px 3px 0",
  },
  exceptionLabel: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 9.5,
    color: "#565D8A",
    letterSpacing: 0.3,
    display: "block",
    marginBottom: 3,
  },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#7E86AC" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: {
    fontSize: 11,
    padding: "4px 9px",
    borderRadius: 3,
    background: "#171B36",
    color: "#FFFFFF",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  tagProcess: {
    fontSize: 11,
    padding: "4px 9px",
    borderRadius: 3,
    background: "#EEF1FA",
    color: "#2E3457",
    fontFamily: "'IBM Plex Mono', monospace",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    fontSize: 10.5,
    color: "#7E86AC",
    borderTop: "1px solid #E1E3F0",
    paddingTop: 12,
  },
};
