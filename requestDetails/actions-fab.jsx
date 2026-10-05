import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Actions / フローティングアクションボタン(FAB)」ページ。
 * FABはMaterial Design発祥のパターンで、Appleには公式な対応コンポーネントが無い
 * (HIGのButtonsページ本文を直接確認したが、iOS/iPadOS向けの言及は無い)。
 * この「存在しない」という事実自体が比較材料になるため、無理に近い概念を
 * 当てはめず、その旨を明記している(CLAUDE.mdの「無理に数値を作らない」方針に基づく)。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Material Design 3 のサイズ数値(小/標準/拡張)はユーザーによる目視確認待ち。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Buttons(visionOS)",
    color: "#C2542A",
    position: "iOS/iPadOSには無いが、visionOSには近い概念がある",
    size: "visionOS: Mini(28pt)/Small(32pt)/Regular(44pt)/Large(52pt)/Extra large(64pt)の5段階。※visionOS固有の概念であり、MaterialのFABと同一の概念ではない点に注意(参考情報として掲載)。",
    stance:
      "iOS/iPadOSには、画面上に常時浮かぶ円形の主要アクションボタン(FAB相当)への言及はない。ボタンは主にツールバー・ナビゲーションバー内に配置する設計が基本。一方でvisionOSには「ボタンが空間に浮かんで見える場合はglassマテリアルを背景に使う」という明確な指針があり、円形のボタンを空間に浮かせて配置するという点でFABに近い概念が存在する。",
    exceptions:
      "5段階のサイズは円形・カプセル型・角丸長方形すべてに共通する一般的なボタンサイズの規定であり、「浮かせる」ときだけの専用サイズではない。また、ボタン同士は中心間で60pt以上離すべきという配置の指針もある。なお、macOSにある「Image button(画像ボタン)」は名称が紛らわしいが、これは単なる画像アイコンのボタンでiOS向けではなく、FABの浮遊感・主役性とは異なる概念。",
    pourDetail: "―(FABという分類自体がHIGに存在しないため、POUR上の分類も定義されていない)",
    searchHint: "floating in space",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons#visionOS",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="rgba(194,84,42,0.15)" stroke="#C2542A" strokeWidth="1.5" />
          <line x1="14" y1="20" x2="26" y2="20" stroke="#C2542A" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="14" x2="20" y2="26" stroke="#C2542A" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>visionOS(参考)</span>
      </div>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― FAB(3サイズ)",
    color: "#2F7D6E",
    position: "3サイズ(FAB 56dp / Medium 80dp / Large 96dp)",
    size: "FAB 56dp / Medium FAB 80dp(最も推奨) / Large FAB 96dp。アイコンサイズはいずれも24dpで共通。",
    stance:
      "画面上で最も重要な操作に使うボタンで、他のすべてのコンテンツより手前に表示される。2025年5月のM3 Expressive更新でサイズ体系が再編された。",
    exceptions:
      "以前あったSmall FAB(40dp)は非推奨になった。1画面に複数のFABを表示すること、軽微な操作や破壊的な操作(アーカイブ・削除・警告など)への使用は避けるべきとされている。",
    pourDetail: "知覚可能・操作可能 ― アイコンはコンテナに対して最低3:1のコントラスト比を確保すべきとされており、知覚可能性に関わる。フォーカス順序で優先的に扱うべきという点は操作可能性に関わる。",
    searchHint: "FAB container height",
    url: "https://m3.material.io/components/floating-action-button/specs",
    confirmedNote: "56dp/24dpは公式ページの本文で直接確認済み。80dp/96dpは複数の二次情報による(2026-09)。",
    illustration: () => (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#2F7D6E" />
        <line x1="14" y1="20" x2="26" y2="20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="14" x2="20" y2="26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.5.5 / 2.5.8",
    color: "#A3821F",
    position: "ボタンページと同一の一般基準を適用",
    size: "―(FAB固有のサイズ規定はない。一般的なタップ領域基準は下記アクセシビリティ欄を参照)",
    stance:
      "WCAGはボタンの形状や配置(浮動か否か)を区別せず、すべてのタップ可能な要素に同一のターゲットサイズ基準を適用する。レベルAA(2.5.8)は24×24px以上、レベルAAA(2.5.5)は44×44pxを求める(詳細は「ボタン」ページ参照)。",
    exceptions:
      "「ボタン」ページと同じ4つの適合ルートが適用される: ①周囲24px以上の余白、②同機能の代替ターゲット、③文中インラインリンク、④ユーザーエージェント側の制御。FAB特有の追加規定はない。",
    pourDetail: "操作可能(Operable) ― POUR原則のうち「操作可能」に対応する、入力方法(2.5)の達成基準。",
    searchHint: "Target Size",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="10" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>最小タップ領域(概念図)</span>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "UI Elements Glossary",
    color: "#7A4F7E",
    position: "用語集項目としての定義のみ(数値基準なし)",
    size: "―(用語集にサイズの数値記載なし)",
    stance:
      "「Floating Button(Floating Action Button, FAB)」として用語集に掲載。画面上に浮かび、コンテンツがスクロールしても常駐する、画面上で最も使用頻度が高く重要なアクションのために使うボタン、と定義している。モバイル端末で主要な操作へすばやくアクセスできるようにする用途が多いとしている。",
    exceptions: "用語の定義記事であり、サイズや配置に関する数値基準・例外規定は示されていない。",
    pourDetail: "―(用語集の定義であり、適合区分や設計根拠の提示ではない)",
    searchHint: "Floating Button",
    url: "https://www.nngroup.com/articles/ui-elements-glossary/#Floating-Button",
    illustration: () => (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="#7A4F7E" />
        <line x1="14" y1="20" x2="26" y2="20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="14" x2="20" y2="26" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const RANGE_SCALE = {
  bands: [
    { from: 0, to: 24, type: "ng" },
    { from: 24, to: 44, type: "caution" },
    { from: 44, to: 60, type: "ok" },
  ],
  markers: [
    { at: 24, label: "24" },
    { at: 44, label: "44" },
  ],
  caption: "WCAGの一般基準(24px=レベルAA条件付き / 44px=レベルAAA無条件)。FAB専用の基準ではなく、タップ可能要素全般に適用される。",
};

const BAND_COLOR = {
  ng: { fill: "#F7E4E1", stroke: "#C0503F" },
  caution: { fill: "#FBF0D9", stroke: "#A97A1A" },
  ok: { fill: "#E4F0EC", stroke: "#2F7D6E" },
};

function FabSwatch() {
  const sizes = [
    { label: "FAB", dp: "56dp", r: 20 },
    { label: "Medium FAB", dp: "80dp", r: 28, recommended: true },
    { label: "Large FAB", dp: "96dp", r: 34 },
  ];
  let x = 34;
  const items = sizes.map((s) => {
    const cx = x + s.r;
    x += s.r * 2 + 26;
    return { ...s, cx };
  });
  const width = x;
  return (
    <svg viewBox={`0 0 ${width} 120`} style={{ width: "100%", maxWidth: 380, height: "auto", display: "block", margin: "0 auto" }}>
      {items.map((s) => (
        <g key={s.label}>
          <circle cx={s.cx} cy="46" r={s.r} fill="#2F7D6E" />
          <line x1={s.cx - s.r * 0.4} y1="46" x2={s.cx + s.r * 0.4} y2="46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={s.cx} y1={46 - s.r * 0.4} x2={s.cx} y2={46 + s.r * 0.4} stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <text x={s.cx} y="94" fontSize="9.5" fontFamily="Jost, Noto Sans JP" fontWeight="600" fill="#171B36" textAnchor="middle">{s.label}</text>
          <text x={s.cx} y="106" fontSize="8.5" fontFamily="IBM Plex Mono" fill="#7E86AC" textAnchor="middle">{s.dp}</text>
        </g>
      ))}
    </svg>
  );
}

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

export default function ActionsFabPage() {
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
        <SidebarNav currentPath="/components/actions/fab" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / フローティングアクションボタン</span>
            <span>SPEC No. 004</span>
          </div>

          <h1 style={styles.title}>フローティングアクションボタン(FAB)</h1>
          <p style={styles.subtitle}>Material発祥のパターンを、他系列がどう扱っている(あるいは扱っていない)かを比較する</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ</span>
            <FabSwatch />
            <p style={styles.swatchNote}>Material 3の3サイズ(2025年5月改訂)。丸いコンテナに塗りつぶしアイコンを乗せる形が共通する。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              FABは<strong>iOS/iPadOSには対応する概念がありません</strong>が、Appleの中でも<strong>visionOSには近い概念が存在します</strong>。空間に浮かぶ円形ボタンにglassマテリアルを使うという指針で、「浮かせる」「主役の操作を目立たせる」という発想はMaterialのFABと共通しています。
            </p>
            <p style={styles.synthesisText}>
              WCAGは形状を区別せず、<strong>ボタンと同じタップ領域基準(AA=24px / AAA=44px)</strong>がそのまま当てはまります。実務では、Material系のUIやvisionOS的な空間UIでFABに近い表現を使い、通常のiOS/iPadOSでは全幅ボタンやツールバーを優先するのが、各系列の思想に沿った判断と言えるでしょう。
            </p>
          </div>

          <div className="dsp-mobile-only" style={styles.sourceList}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                </div>
                <div style={styles.positionBadge}>{s.position}</div>
                {s.illustration && <div style={styles.illustrationBox}>{s.illustration()}</div>}
                <div style={styles.sizeBox}>
                  <span style={styles.exceptionLabel}>ボタンサイズ</span>
                  <p style={styles.exceptionText}>{s.size}</p>
                </div>
                <p style={styles.sourceStance}>{s.stance}</p>
                <div style={styles.exceptionBox}>
                  <span style={styles.exceptionLabel}>例外・許容ケース</span>
                  <p style={styles.exceptionText}>{s.exceptions}</p>
                </div>
                <div style={styles.pourBox}>
                  <span style={styles.exceptionLabel}>アクセシビリティ(WCAG基準)</span>
                  <p style={styles.exceptionText}>{s.pourDetail}</p>
                </div>
                <div style={styles.sourceFootRow}>
                  {s.searchHint && (
                    <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                  )}
                  <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
                </div>
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
            <div style={styles.matrixScroll}>
              <div style={styles.matrixGrid}>
                <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>ボタンのイメージ</div>
                {SOURCES.map((s) => (<div key={s.key} style={styles.cell}>{s.illustration ? s.illustration() : null}</div>))}
                <div style={styles.labelCell}>ボタンサイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ ...styles.diagramCard, maxWidth: 300 }}>
            <h2 style={styles.diagramTitle}>参考: タップ領域の基準(WCAG一般基準)</h2>
            <RangeScale scale={RANGE_SCALE} />
            <div style={styles.legendRow}>
              <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ok.fill, borderColor: BAND_COLOR.ok.stroke }} />推奨</span>
              <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.caution.fill, borderColor: BAND_COLOR.caution.stroke }} />条件付き</span>
              <span style={styles.legendItem}><i style={{ ...styles.legendSwatch, background: BAND_COLOR.ng.fill, borderColor: BAND_COLOR.ng.stroke }} />非推奨</span>
            </div>
            <p style={styles.diagramNote}>Material公式のFAB(56dp)は、この一般基準の「推奨」帯に十分収まる。</p>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["操作方法(タッチ・キーボード)"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Material Design 3のみ本文未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはButtonsページ内のvisionOSセクションへのアンカー付きリンクです。WCAGはボタンページと同一のUnderstandingページ。NN
              groupは用語集内の実アンカー(#Floating-Button)。Material Design 3はSpecsページ(公式サイトがJS描画のSPAのため、正確な数値は目視確認待ち)。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 26, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.25 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 10 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", marginBottom: 20 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", marginTop: 10, lineHeight: 1.6 },
  legendRow: { display: "flex", gap: 14, marginBottom: 4, fontSize: 11, color: "#565D8A", fontFamily: "'IBM Plex Mono', monospace" },
  legendItem: { display: "flex", alignItems: "center", gap: 5 },
  legendSwatch: { display: "inline-block", width: 10, height: 10, border: "1px solid", borderRadius: 2 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "10px 0" },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  exceptionBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  sizeBox: { background: "#F0F4F8", borderLeft: "2px solid #3C5A73", padding: "8px 10px", marginTop: 8, marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#7E86AC" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
