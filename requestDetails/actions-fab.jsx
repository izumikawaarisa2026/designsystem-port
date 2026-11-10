import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection } from "./page-parts";

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
    term: <NoData>該当なし</NoData>,
    color: "#C2542A",
    position: <NoData>該当なし(FABに当たる部品はない)</NoData>,
    size: <NoData>該当なし</NoData>,
    stance: <><NoData>該当なし</NoData>。主な操作は、ツールバーやナビゲーションバーに置くのが基本。</>,
    exceptions: <NoData>該当なし</NoData>,
    memo: "参考: visionOSには、空間に浮かんで見えるボタンの背景にglassマテリアルを使う指針がある(大きさはMini 28〜Extra large 64ptの5段階、ボタンの中心どうしを60pt以上離す)。見た目が近いだけで、画面の主役の操作という役割までは定めていない。",
    pourDetail: <NoData>該当なし</NoData>,
    searchHint: "floating in space",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons#visionOS",
    refs: [
      { label: "Buttons(visionOS)", url: "https://developer.apple.com/design/human-interface-guidelines/buttons#visionOS" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="rgba(194,84,42,0.15)" stroke="#C2542A" strokeWidth="1.5" />
          <line x1="14" y1="20" x2="26" y2="20" stroke="#C2542A" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="14" x2="20" y2="26" stroke="#C2542A" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 9, color: "#666D93" }}>visionOSの浮かぶボタン(参考)</span>
      </div>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― FAB(3サイズ)",
    term: "FAB(Floating action button)。文字のラベル付きはExtended FAB",
    color: "#2F7D6E",
    position: "3サイズ(FAB 56dp / Medium 80dp / Large 96dp)",
    size: "FAB 56dp / Medium FAB 80dp(最も推奨) / Large FAB 96dp。アイコンの大きさは、MDC Androidでは FAB 24dp・Medium FAB 28dp・Large FAB 36dp。",
    stance:
      <><Hl>画面上で最も重要な操作に使うボタン</Hl>で、他のすべてのコンテンツより手前に表示される。2025年5月のM3 Expressive更新でサイズ体系が再編された。</>,
    exceptions:
      "以前あったSmall FAB(40dp)は非推奨になった。1画面に複数のFABを表示すること、軽微な操作や破壊的な操作(アーカイブ・削除・警告など)への使用は避けるべきとされている。なお、アイコンに文字のラベルを添えたい場合は、「Extended FAB」という別の部品が用意されている。",
    pourDetail: "知覚可能・操作可能 ― アイコンはコンテナに対して最低3:1のコントラスト比を確保すべきとされており、知覚可能性に関わる。フォーカス順序で優先的に扱うべきという点は操作可能性に関わる。",
    searchHint: "FAB container height",
    url: "https://m3.material.io/components/floating-action-button/specs",
    refs: [
      { label: "FAB ― Specs(3サイズ)", url: "https://m3.material.io/components/floating-action-button/specs" },
      { label: "FAB ― Guidelines", url: "https://m3.material.io/components/floating-action-button/guidelines" },
      { label: "Extended FAB", url: "https://m3.material.io/components/extended-fab/guidelines" },
      { label: "FAB menu", url: "https://m3.material.io/components/fab-menu/guidelines" },
      { label: "Floating action button(Material Components for Android、補足)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/FloatingActionButton.md" },
    ],
    confirmedNote: "56dp/80dp/96dpとアイコンの大きさは、GoogleのMDC Androidのドキュメントで確認(2026-10)。",
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
    term: <NoData>専用の名称なし(ボタンとして扱う)</NoData>,
    color: "#A3821F",
    position: "ボタンページと同一の一般基準を適用",
    size: "―(FAB固有のサイズ規定はない。一般的なタップ領域基準は下記アクセシビリティ欄を参照)",
    stance:
      <>WCAGはボタンの形状や配置(浮動か否か)を区別せず、すべてのタップ可能な要素に同一のターゲットサイズ基準を適用する。<Hl>レベルAA(2.5.8)は24×24px以上、レベルAAA(2.5.5)は44×44pxを求める</Hl>(どちらも例外あり。詳細は「ボタン」ページ参照)。</>,
    exceptions:
      "「ボタン」ページと同じく、2.5.8(AA)には5つの例外がある: ①間隔(24px未満なら、中心に直径24pxの円を描いて隣と重ならない)、②同じ機能の十分な大きさの代替がある、③文中のリンクなど、④ユーザーエージェントが大きさを決めている、⑤その大きさや配置に意味があり欠かせない。2.5.5(AAA)にも例外がある。FAB特有の追加規定はない。",
    pourDetail: "操作可能(Operable) ― POUR原則のうち「操作可能」に対応する、入力方法(2.5)の達成基準。",
    searchHint: "Target Size",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html",
    refs: [
      { kind: "sc", level: "AA", label: "2.5.8 ターゲットサイズ(最低限)・例外あり", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="10" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#666D93" }}>最小タップ領域(概念図)</span>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "UI Elements Glossary",
    term: "Floating Button(Floating Action Button、FAB)",
    color: "#7A4F7E",
    position: "用語集項目としての定義のみ(数値基準なし)",
    size: "―(用語集にサイズの数値記載なし)",
    stance:
      "「Floating Button(Floating Action Button, FAB)」として用語集に掲載。画面上に浮かび、コンテンツがスクロールしても常駐する、画面上で最も使用頻度が高く重要なアクションのために使うボタン、と定義している。モバイル端末で主要な操作へすばやくアクセスできるようにする用途が多いとしている。",
    exceptions: "用語の定義記事であり、サイズや配置に関する数値基準・例外規定は示されていない。",
    pourDetail: <NoData>記載なし</NoData>,
    searchHint: "Floating Button",
    url: "https://www.nngroup.com/articles/ui-elements-glossary/#Floating-Button",
    refs: [
      { label: "UI Elements Glossary", url: "https://www.nngroup.com/articles/ui-elements-glossary/#Floating-Button" },
    ],
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
  caption: "WCAGの一般基準(24px=レベルAA / 44px=レベルAAA。どちらも例外あり)。FAB専用の基準ではなく、タップ可能要素全般に適用される。",
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
          <text x={s.cx} y="106" fontSize="8.5" fontFamily="IBM Plex Mono" fill="#666D93" textAnchor="middle">{s.dp}</text>
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

/* No.021: FABの種類・変形・ユースケース(Google。M3の本文とMaterial Components for Androidの説明による) */
const FAB_KINDS = [
  { t: "FAB", d: "標準のFAB。ほかの操作も画面に出ているコンパクトな画面向け", tag: "" },
  { t: "中サイズのFAB", d: "ほとんどの場面で最も勧められるサイズ。コンパクト・中サイズの画面に向く", tag: "最も推奨" },
  { t: "大サイズのFAB", d: "主な操作をはっきり目立たせたいとき。広い画面に最も向く", tag: "" },
  { t: "小サイズのFAB", d: "M3 Expressive(2025年5月)で非推奨になった", tag: "非推奨" },
  { t: "拡張FAB", d: "アイコンに文字のラベルを添えたFAB。ラベルが必要なときに使う。小56dp・中80dp・大96dp(高さ)の3サイズ(Jetpack Composeのトークン)", tag: "" },
  { t: "FABメニュー", d: "FABから開き、関連する2〜6個の操作を出す。小さいFABを重ねて出す使い方の代わり", tag: "" },
];
const FAB_CHANGES = [
  { from: "FAB → 拡張FAB", d: "画面が大きいときは、FABを拡張FAB(文字ラベル付き)に変えられる。拡張FABは、文字を隠したアイコンだけの形に縮めたり、元に戻したりできる(MDC Androidのshrink・extend)" },
  { from: "FAB → FABメニュー", d: "押すと、関連する操作の一覧(FABメニュー)に変わる。メニューは開いたFABと同じ場所に出て、閉じるボタンを持つ。拡張FABからは開かない" },
];
const FAB_USE = [
  { ok: true, t: "使う操作", d: "その画面でいちばん大事な、前向きな操作(作成・お気に入り・共有・処理を始める)" },
  { ok: false, t: "使わない操作", d: "アーカイブ・ゴミ箱のような小さな操作や壊す操作、警告・エラー、文字の切り抜きのような限られた作業、音量や文字色の調整(ツールバー向き)" },
  { ok: true, t: "置く場所", d: "コンパクト・中サイズの画面では右下。広い画面では左上(ナビゲーションレールの中)も検討する" },
  { ok: false, t: "避けること", d: "1画面に複数のFABを置く。使えないときに無効表示にする(使えないなら出さない)。分かりにくいアイコン" },
];

function FabGuide() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>FABの種類と使い方(Google)</h2>
      <p style={styles.fgNote}>FABを部品として定めているのはGoogleだ。AppleにはiOS・iPadOSで常に画面に浮かぶFABに当たる部品はなく(visionOSには近い考え方がある。比較表のApple欄)、W3CとNN groupも、FABの見た目や種類は定めていない。</p>
      <div style={styles.fgGrid}>
        {FAB_KINDS.map((k) => (
          <div key={k.t} style={styles.fgCard}>
            <div style={styles.fgTitle}>{k.t}{k.tag && <span style={{ ...styles.fgTag, ...(k.tag === "非推奨" ? styles.fgTagDep : {}) }}>{k.tag}</span>}</div>
            <p style={styles.fgText}>{k.d}</p>
          </div>
        ))}
      </div>
      <h3 style={styles.fgSub}>変形するとき</h3>
      {FAB_CHANGES.map((c) => (<p key={c.from} style={styles.fgText}><strong>{c.from}</strong>: {c.d}</p>))}
      <p style={styles.fgNote}>変形の動き(コンテナの変形)は<PageLink to="/tokens/motion">モーション</PageLink>のページを参照。</p>
      <h3 style={styles.fgSub}>使いどころ</h3>
      <div style={styles.fgGrid}>
        {FAB_USE.map((u) => (
          <div key={u.t} style={{ ...styles.fgCard, borderLeft: `3px solid ${u.ok ? "#2F7D6E" : "#C0503F"}` }}>
            <div style={styles.fgTitle}>{u.t}</div>
            <p style={styles.fgText}>{u.d}</p>
          </div>
        ))}
      </div>
      <p style={styles.fgNote}>出典: Material Design 3「FAB」のガイドライン、Material Components for Android(Extended FAB・FAB menu)。</p>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の上に浮かべて置く、その画面でいちばん大事な操作のためのボタンだ。";
const ABOUT = [
  { k: "目的・役割", v: "その画面の主な操作(新規作成・作成開始など)を、スクロールしても常に押せる位置に置く" },
  { k: "よく使われる場面", v: "メールの新規作成、メモ・予定の追加、地図の現在地へ移動" },
  { k: "似た部品との違い", v: <>画面の中の普通の操作は<PageLink to="/components/actions/button">ボタン</PageLink>。FABは1画面に1つ、主な操作だけに使う</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "画面に常に浮かぶ、主な操作のボタンを置く?",
    sides: [
      { who: "Google・NN group", color: "#2F7D6E", t: "置く。その画面でいちばん大事な前向きな操作(作成・共有など)に使い、1画面に1つまで(Google)。スクロールしても常に見えている主要な操作のボタン(NN group)" },
      { who: "Apple", color: "#C2542A", t: "iOS・iPadOSには当たる部品がない。主な操作はツールバーやナビゲーションバーに置く。visionOSには空間に浮かぶ円形のボタンがあるが、主役の操作という役割までは定めていない" },
    ],
    tip: "AndroidやMaterialのWebではFAB、iOS・iPadOSではツールバーやナビゲーションバーの右上に置くのが、それぞれの利用者が見慣れた形だ。両方に出すアプリでは、OSごとに置き場所を変えても、操作の名前とアイコンはそろえる。",
  },
  {
    q: "大きさはどれくらい?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "FAB 56dp・中サイズ 80dp(最も推奨)・大サイズ 96dp" },
      { who: "Apple(visionOS)", color: "#C2542A", t: "ボタン全般の5段階(28〜64pt)。FAB専用の大きさはない" },
      { who: "W3C", color: "#A3821F", t: "ボタンと同じ基準。24×24px(2.5.8・AA)/44×44px(2.5.5・AAA)。どちらも例外あり" },
    ],
    tip: "Googleのいちばん小さいFAB(56dp)でも、W3CのAA・AAAの両方を満たす。FABは画面の内容に重なるので、大きくするほど下の内容を隠す点にも気をつける(重なりについては「エレベーション」ページ)。",
  },
];

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
          <SummaryCard
            imageLabel="コンポーネントイメージ"
            image={<><FabSwatch /></>}
            imageNote={<>Material 3の3サイズ(2025年5月改訂)。丸いコンテナに塗りつぶしアイコンを乗せる形が共通する。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <FabGuide />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>AppleにはFABに当たる部品がない</strong>(visionOSの浮かぶボタンは見た目が近いだけ。比較表のメモ)。
            </p>
            <p style={styles.synthesisText}>
              WCAGは形状を区別せず、<strong>ボタンと同じタップ領域基準(AA=24px / AAA=44px。どちらも例外あり)</strong>がそのまま当てはまる。実務では、Material系のUIやvisionOS的な空間UIでFABに近い表現を使い、通常のiOS/iPadOSでは全幅ボタンやツールバーを優先するのが、各系列の思想に沿った判断と言えるだろう。
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
                {s.illustration && <div style={styles.illustrationBox}>{s.illustration()}</div>}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
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
                {s.memo && (
                  <div style={styles.exceptionBox}>
                    <span style={styles.exceptionLabel}>メモ</span>
                    <p style={styles.exceptionText}>{s.memo}</p>
                  </div>
                )}
                <div style={styles.exceptionBox}>
                  <span style={styles.exceptionLabel}>参照ページ(公式)</span>
                  <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                </div>
                {s.searchHint && (
                  <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                )}
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
                <div style={styles.labelCell}>ボタンのイメージ</div>
                {SOURCES.map((s) => (<div key={s.key} style={styles.cell}>{s.illustration ? s.illustration() : null}</div>))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>ボタンサイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>))}
                <div style={styles.labelCell}>メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.memo || <NoData>―</NoData>}</div>))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p style={styles.diagramNote}>押せる範囲の基準(2.5.8・2.5.5の例外を含む)は、<PageLink to="/components/actions/button">ボタン</PageLink>のページの「アクセシビリティ」を参照。Material公式のFAB(56dp)は、どの系列の目安も満たす。</p>

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
  fgNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 10px" },
  fgGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 8, marginBottom: 6 },
  fgCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px" },
  fgTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36", marginBottom: 3, display: "flex", alignItems: "center", gap: 6 },
  fgTag: { fontSize: 9.5, fontWeight: 700, color: "#2F7D6E", border: "1px solid #2F7D6E", borderRadius: 3, padding: "0 4px" },
  fgTagDep: { color: "#666D93", borderColor: "#D5D9EC" },
  fgText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", margin: "0 0 6px" },
  fgSub: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "16px 0 8px" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 26, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.25 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 10 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "10px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", marginBottom: 20 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", marginTop: 10, lineHeight: 1.6 },
  legendRow: { display: "flex", gap: 14, marginBottom: 4, fontSize: 11, color: "#565D8A", fontFamily: "'IBM Plex Mono', monospace" },
  legendItem: { display: "flex", alignItems: "center", gap: 5 },
  legendSwatch: { display: "inline-block", width: 10, height: 10, border: "1px solid", borderRadius: 2 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "10px 0" },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  exceptionBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  sizeBox: { background: "#F0F4F8", borderLeft: "2px solid #3C5A73", padding: "8px 10px", marginTop: 8, marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
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
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
