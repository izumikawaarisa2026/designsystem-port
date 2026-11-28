import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, SummaryCard, PageLink, SplitSection, Hl, RefList, RelatedPages, GoodBad, hasRow, markNeg } from "./page-parts";

/**
 * Foundation「押せる範囲(ターゲットサイズ)」ページ(2026-11-28 ⑩本人最終レビューNo.016で新設)。
 * もとは「ボタン」ページのタブ「押せる範囲の大きさ」だった内容を、ボタン以外(チェックボックス・チップ・スライダー・リンクなど)
 * にも共通する基準としてこのページへ移した。数値・文章はボタンのページのものをそのまま移している。
 * WCAG 2.5.8の例外(5つ)の詳しい説明は、このページにそろえる。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Accessibility / Buttons",
    value: "44 × 44",
    unit: "pt",
    stance:
      <>押せる範囲は<Hl>既定44×44pt・最小28×28pt</Hl>(iOS/iPadOS)。枠のある要素のまわりに約12pt、枠のない要素は約24ptの余白を取る。</>,
    exceptions:
      "macOSは既定28・最小20pt、watchOSは既定44・最小28pt(プラットフォームで値が違う)。",
    scale: { bands: [{ from: 0, to: 28, type: "ng" }, { from: 28, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }], markers: [{ at: 28, label: "28" }, { at: 44, label: "44" }], caption: "44pt=既定のサイズ・ボタンの押せる範囲 / 28pt=最小のサイズ(iOS/iPadOS、2025年改訂のAccessibilityページ)" },
    pourDetail: "操作可能(Operable) ― 押せる範囲の大きさは「操作可能」に関わる。",
    searchHint: "Offer sufficiently sized controls",
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
    refs: [{ label: "Accessibility ― Mobility", url: "https://developer.apple.com/design/human-interface-guidelines/accessibility#Mobility" }, { label: "Buttons", url: "https://developer.apple.com/design/human-interface-guidelines/buttons" }],
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3",
    value: "48 × 48",
    unit: "dp",
    stance:
      <>押せる範囲は<Hl>48×48dp以上</Hl>。密度を上げても下回らない。</>,
    exceptions:
      "アイコンの見た目(24dpなど)は小さくてよいが、押せる範囲は48dp未満にしない。",
    scale: { bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 48, type: "caution" }, { from: 48, to: 60, type: "ok" }], markers: [{ at: 24, label: "24" }, { at: 48, label: "48" }], caption: "24dp=標準のアイコンの大きさ(XSのアイコンボタンは20dp) / 48dp=タップ判定領域の下限(この2つは別管理)。" },
    pourDetail: "操作可能(Operable) ― 押せる範囲の大きさは「操作可能」に関わる。",
    searchHint: "touch target",
    url: "https://m3.material.io/components/buttons/accessibility",
    refs: [{ label: "Buttons ― Guidelines", url: "https://m3.material.io/components/buttons/guidelines" }, { label: "Buttons ― Accessibility", url: "https://m3.material.io/components/buttons/accessibility" }],
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.5.5 / 2.5.8",
    value: "24〜44",
    unit: "px",
    stance:
      <><Hl>24×24px以上</Hl>(2.5.8・AA)。足りなければ周りの間隔で補える。AAA(2.5.5)は44×44px。</>,
    exceptions:
      "2.5.8の例外は5つ: ①間隔(中心に直径24pxの円を描き、隣と重ならない)、②同じ機能の十分な大きさのものが別にある、③文中のリンク、④ブラウザ標準のまま、⑤大きさに意味があり欠かせない(地図のピンなど)。",
    scale: { bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }], markers: [{ at: 24, label: "24" }, { at: 44, label: "44" }], caption: "24px=レベルAA(例外あり) / 44px=レベルAAA(例外あり)。" },
    pourDetail: "操作可能(Operable) ― 2.5.8(AA)・2.5.5(AAA)。",
    searchHint: "Target Size",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
    refs: [{ kind: "sc", level: "AA", label: "2.5.8 ターゲットのサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" }, { kind: "sc", level: "AAA", label: "2.5.5 ターゲットのサイズ(高度)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html" }],
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Touch Target Size / Fitts's Law",
    value: "約 1 × 1",
    unit: "cm",
    stance:
      <>フィッツの法則を根拠に、<Hl>1cm四方以上</Hl>を目安とする。</>,
    exceptions:
      "密なUIほど、大きさより余白で補う。",
    scale: { bands: [{ from: 0, to: 34, type: "ng" }, { from: 34, to: 42, type: "caution" }, { from: 42, to: 60, type: "ok" }], markers: [{ at: 38, label: "~38" }], caption: "1cmをpx換算した目安(画面密度により変動、幅を持たせて表示)。" },
    pourDetail: "根拠となる原則 ― 適合区分ではなく、フィッツの法則という設計の根拠(なぜ大きいほうがよいか)。",
    searchHint: "1cm",
    url: "https://www.nngroup.com/articles/touch-target-size/",
    refs: [{ label: "Touch Targets on Touchscreens", url: "https://www.nngroup.com/articles/touch-target-size/" }],
  },
];
markNeg(SOURCES);

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
          <rect key={i} x={x(b.from)} y={4} width={x(b.to) - x(b.from)} height={14} fill={BAND_COLOR[b.type].fill} stroke={BAND_COLOR[b.type].stroke} strokeWidth="1" />
        ))}
        {[0, 10, 20, 30, 40, 50, 60].map((t) => (
          <line key={t} x1={x(t)} y1={18} x2={x(t)} y2={22} stroke="#D5D9EC" strokeWidth="1" />
        ))}
        {scale.markers.map((m, i) => (
          <g key={i}>
            <line x1={x(m.at)} y1={1} x2={x(m.at)} y2={20} stroke="#171B36" strokeWidth="1.4" />
            <circle cx={x(m.at)} cy={1} r="2" fill="#171B36" />
            <text x={x(m.at)} y={34} fontSize="9" fontFamily="IBM Plex Mono" fill="#171B36" textAnchor="middle" fontWeight="600">{m.label}</text>
          </g>
        ))}
      </svg>
      <p style={{ fontSize: 11, color: "#565D8A", margin: "4px 0 0", lineHeight: 1.5 }}>{scale.caption}</p>
    </div>
  );
}

const SYNTHESIS = {
  a11y: [
    <>Appleは既定44×44pt・<strong>最小28×28pt</strong>(iOS/iPadOS)の2段階を示し、枠のある要素のまわりに約12ptの余白を勧める。W3Cの2.5.8も、24×24pxに足りない分を周りの間隔で補う例外を持つ。<strong>大きさが足りない分を間隔で補う考え方は、Apple・W3Cに共通</strong>する。</>,
    <>数値に24〜48という幅があるのは、<strong>最低ライン(W3C 2.5.8・AA)</strong>と、<strong>快適に押せる目安(Apple 44pt・Google 48dp・W3C 2.5.5のAAA 44px・NN groupの約1cm四方)</strong>という、違う問いに答えているため。</>,
    <>主なボタンは<strong>44pt(Apple)・48dp(Google)を基準</strong>にする。密な画面で縮めるときの最低ラインは、<strong>W3C 2.5.8の24×24px(AA・例外あり)</strong>。それより小さくするなら、中心に描いた直径24pxの円が隣と重ならない<strong>間隔を空ける</strong>。</>,
  ],
};

function TargetSizeComparison() {
  const tab = { label: "押せる範囲の大きさ", hasScale: true };
  return (
    <>
    <div style={styles.synthesisBox}>
      <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
      {SYNTHESIS.a11y.map((node, i) => (<p key={i} style={styles.synthesisText}>{node}</p>))}
    </div>

    <div className="dsp-mobile-only" style={styles.sourceList}>
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
          <div style={styles.sourceStance}>{s.stance}</div>
          {hasRow(SOURCES, "exceptions") && (<div style={styles.exceptionBox}>
            <span style={styles.exceptionLabel}>例外・許容ケース</span>
            <p style={styles.exceptionText}>{s.exceptions}</p>
          </div>)}
          <div style={{ maxWidth: 220 }}>
            <RangeScale scale={s.scale} />
          </div>
          <div style={styles.pourBox}>
            <span style={styles.exceptionLabel}>アクセシビリティ(WCAG基準)</span>
            <p style={styles.exceptionText}>{s.pourDetail}</p>
          </div>
          <div style={styles.pourBox}>
            <span style={styles.exceptionLabel}>参照ページ(公式)</span>
            <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
          </div>
        </div>
      ))}
    </div>

    <div className="dsp-desktop-only">
      <div style={styles.matrixScroll}>
        <div style={styles.matrixGrid}>
          <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
          {SOURCES.map((s) => (
            <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
              <div style={styles.sourceName}>{s.name}</div>
              <div style={styles.sourceDoc}>{s.doc}</div>
            </div>
          ))}
          <div style={styles.labelCell}>基準値</div>
          {SOURCES.map((s) => (
            <div key={s.key} style={styles.cell}>
              <span style={styles.value}>{s.value}</span>
              <span style={styles.unit}>{s.unit}</span>
            </div>
          ))}
          <div style={styles.labelCell}>許容レンジ</div>
          {SOURCES.map((s) => (<div key={s.key} style={styles.cell}><div style={{ width: "100%", maxWidth: 170 }}><RangeScale scale={s.scale} /></div></div>))}
          <div style={styles.labelCell}>基本方針</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
          {hasRow(SOURCES, "exceptions") && (<>
            <div style={styles.labelCell}>例外・許容ケース</div>
            {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
          </>)}
          <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>))}
          <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
          {SOURCES.map((s) => (
            <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, display: "block" }}>
              <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div style={{ marginBottom: 14, maxWidth: 420 }}>
      <h2 style={styles.diagramTitle}>参考: 四系列比較図(実寸オーバーレイ)</h2>
      <svg viewBox="0 0 240 96" style={{ width: "100%", height: "auto" }}>
        <rect x="8" y="6" width="70" height="70" fill="none" stroke="#2F7D6E" strokeWidth="1.6" />
        <rect x="8" y="15" width="61" height="61" fill="none" stroke="#C2542A" strokeWidth="1.6" />
        <rect x="10" y="17" width="61" height="61" fill="none" stroke="#A3821F" strokeWidth="1.2" strokeDasharray="4 3" />
        <rect x="8" y="29" width="47" height="47" fill="#7A4F7E" fillOpacity="0.08" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="92" y="14" fontSize="9.5" fill="#2F7D6E" fontFamily="IBM Plex Mono" fontWeight="600">Material 48dp</text>
        <text x="92" y="30" fontSize="9.5" fill="#C2542A" fontFamily="IBM Plex Mono" fontWeight="600">HIG 44pt</text>
        <text x="92" y="46" fontSize="9.5" fill="#A3821F" fontFamily="IBM Plex Mono" fontWeight="600">WCAG AAA 44px</text>
        <text x="92" y="62" fontSize="9.5" fill="#7A4F7E" fontFamily="IBM Plex Mono" fontWeight="600">NN 約1cm(目安)</text>
      </svg>
    </div>
    <div style={styles.legendRow}>
      <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ok.fill, borderColor: BAND_COLOR.ok.stroke }} />推奨</span>
      <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.caution.fill, borderColor: BAND_COLOR.caution.stroke }} />条件付き</span>
      <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ng.fill, borderColor: BAND_COLOR.ng.stroke }} />非推奨</span>
    </div>
    </>
  );
}

function GoodBadFigure() {
  return (
    <GoodBad
          title="良い例・悪い例 ― 押せる範囲"
          items={[
            { kind: "good", fig: <><svg width="200" height="70" viewBox="0 0 200 70" aria-hidden="true">
          {[30, 100, 170].map((x) => (<g key={x}><rect x={x - 24} y="11" width="48" height="48" fill="none" stroke="#2F7D6E" strokeDasharray="4 3" /><rect x={x - 11} y="24" width="22" height="22" rx="5" fill="#3A4FCF" /></g>))}
        </svg><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>点線=押せる範囲(概念図)</span></>, text: "見た目は小さいボタンでも、押せる範囲(点線)をApple 44×44pt・Google 48×48dp確保し、隣と重ならない。" },
            { kind: "bad", fig: <><svg width="200" height="70" viewBox="0 0 200 70" aria-hidden="true">
          {[76, 100, 124].map((x) => (<g key={x}><rect x={x - 24} y="11" width="48" height="48" fill="none" stroke="#C0503F" strokeDasharray="4 3" /><rect x={x - 11} y="24" width="22" height="22" rx="5" fill="#3A4FCF" /></g>))}
        </svg><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>点線=押せる範囲(概念図)</span></>, text: "小さいボタンが余白なしで並び、押せる範囲が重なる。押し間違えやすい。" },
          ]}
          basis="Apple(既定44×44pt。足りない分は周りの余白で補う)、Google(48×48dp)、W3C 2.5.8(24×24px・AA。例外あり。小さい場合は、中心に描いた直径24pxの円が隣と重ならない間隔で補える)。"
        />
  );
}

const LEAD = "指やポインターで押せる範囲(ターゲット)の大きさと、隣との間隔の基準";
const ABOUT = [
  { k: "目的・役割", v: "押し間違いを防ぎ、手の動きが不自由な人でも確実に押せるようにする" },
  { k: "よく使われる場面", v: "ボタン・アイコンボタン・チェックボックス・チップ・スライダーのつまみ・リンクなど、押せるものすべて" },
  { k: "関連", v: <>ボタンの種類や役割は<PageLink to="/components/actions/button">ボタン</PageLink>、余白の考え方は<PageLink to="/tokens/layout-spacing">レイアウト・スペーシング</PageLink></> },
];

const SPLITS = [
  {
    q: "押せる範囲の最小は?",
    sides: [
      { who: "Apple", color: "#C2542A", t: "既定44×44pt・最小28×28pt(iOS・iPadOS)。足りない分は周りの余白(枠のあるコンポーネントで約12pt)で補う" },
      { who: "Google", color: "#2F7D6E", t: "48×48dp。見た目が小さくても、押せる範囲は48dpを確保する" },
      { who: "W3C", color: "#A3821F", t: "24×24px(2.5.8・AA)/44×44px(2.5.5・AAA)。どちらも例外あり。小さい場合は、中心の直径24pxの円が隣と重ならない間隔で補える" },
      { who: "NN group", color: "#7A4F7E", t: "数値基準ではなく目安として約1cm四方" },
    ],
    tip: "24px(W3CのAA)は「最低ライン」、44pt(Apple)・48dp(Google)・44px(W3CのAAA)は「快適に押せる目安」と、答えている問いが違う。主なボタンは44pt・48dpを基準にし、密な画面で24pxより小さくするなら、周りに十分な間隔を空ける(2.5.8・例外あり。詳しくは下の「四系列デザインシステム比較」)。",
  },];

const KP = [
  { n: 1, t: "主なボタンの押せる範囲は44pt・48dp", d: "Apple 44×44pt、Google 48×48dp", who: "Apple・Google" },
  { n: 2, t: "24px未満にするなら、周りに間隔を空ける", d: "24×24pxが最低ライン。足りない分は周りの間隔で補える(例外あり)", who: "W3C 2.5.8" },
  { n: 3, t: "見た目が小さくても、押せる範囲は確保する", d: "アイコンが24dpでも、押せる範囲は48dp", who: "Google・Apple" },
];

export default function TokensTargetSizePage() {
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
        <SidebarNav currentPath="/tokens/target-size" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / 押せる範囲(ターゲットサイズ)</span>
            <span>SPEC No. 047.5</span>
          </div>

          <h1 style={styles.title}>押せる範囲(ターゲットサイズ)</h1>
          <SummaryCard keyPoints={KP}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />

          <GoodBadFigure />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <TargetSizeComparison />

          <RelatedPages paths={["/components/actions/button", "/components/selection/checkbox", "/components/selection/chips", "/tokens/layout-spacing", "/principles/wcag-criteria"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["操作方法(タッチ・キーボード)"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 18px" },
  segmented: { display: "inline-flex", gap: 4, background: "#F3F6FA", padding: 4, borderRadius: 8, marginBottom: 20, flexWrap: "wrap" },
  segItem: { appearance: "none", border: "none", background: "transparent", color: "#454C78", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 13, padding: "7px 14px", borderRadius: 6, cursor: "pointer" },
  segItemActive: { background: "#171B36", color: "#FFFFFF", fontWeight: 500 },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  staticTabTitle: { fontSize: 17, fontWeight: 700, color: "#171B36", margin: "8px 0 12px", paddingTop: 12, borderTop: "2px solid #171B36" },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "12px 16px", marginBottom: 14, maxWidth: 420 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 10px", color: "#171B36" },
  legendRow: { display: "flex", gap: 14, marginBottom: 20, fontSize: 11, color: "#565D8A", fontFamily: "'IBM Plex Mono', monospace" },
  legendItem: { display: "flex", alignItems: "center", gap: 5 },
  legendSwatch: { display: "inline-block", width: 10, height: 10, border: "1px solid", borderRadius: 2 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  sourceValueWrap: { textAlign: "right" },
  sourceValue: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 15, color: "#171B36" },
  sourceUnit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#666D93", marginLeft: 3 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "8px 0 10px" },
  exceptionBox: { background: "#FFFFFF", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  illustrationBox: { margin: "10px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: {},
  value: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14 },
  unit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#666D93", marginLeft: 4 },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
