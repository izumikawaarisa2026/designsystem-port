import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Communication / ウィジェット(ホーム画面ウィジェット)」ページ。
 * (2026-10-05、トークン/ファウンデーションレイヤーから移動。AppleのHIGではウィジェットは通知・ライブアクティビティと同じ
 * Components › System experiencesに属し、情報を一目で伝える部品であるため、Communicationに置いた)
 *
 * このページの発見: Apple・Google・NN groupの3系列とも「1つの主な目的に絞り、アプリを開かずに一目で
 * 分かる内容にする」で一致している。大きさの決め方は違い、Appleは端末ごとのpt寸法(iPhoneの小=170×170pt
 * など)と、置かれる場所に応じた表示モード(フルカラー・アクセント・バイブラント)を定める。Googleは
 * ホーム画面のグリッドのマス数(2×2・4×2など)と幅・高さの範囲(dp)で決め、品質を3段階で判定する
 * チェックリスト(マスを端まで埋める・押せる範囲48dp・コントラストなど)を持つ。NN groupはウィジェットを
 * 15秒未満の短い利用(マイクロセッション)を支える仕組みとし、内容を途中で切らないことを求める。
 * W3Cにはホーム画面のウィジェットの基準はなく、WAI-ARIAの「widget」は操作部品全般を指す別の言葉。
 *
 * Apple(HIG Widgets)はHIGのページデータ(JSON)を直接取得して本文・寸法表を確認(2026-10)。
 * Google(Android Developers: Widgets・Sizing・Widget quality guide)は本文を直接確認(2026-10)。
 * m3.material.ioのサイトマップにウィジェットのページはない。W3C(WAI-ARIA 1.2のwidgetロール)・
 * NN group(Mobile Microsessions)は本文を直接取得して確認(2026-10)。
 *
 * 2026-10-04 追記: ユーザーから「はじめに ― 使う目的・利用シーン・ルールが欲しい」というフィードバックを受け、
 * サウンドページと同じ形の冒頭の概要(WidgetIntro)を追加。内容はページ内の確認済みの記述(HIG Widgets・
 * Android Developers・NN group Mobile Microsessions)から構成し、新しい数値は加えていない。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Widgets",
    color: "#C2542A",
    position: "端末ごとのpt寸法で大きさを決め、置かれる場所で見た目が自動で変わる",
    size: "小・中・大・特大と、ロック画面などのアクセサリ。iPhoneの寸法は上の比較図。余白16pt(まとまりは11pt)、文字11pt以上",
    colorInfo: "3つの表示モードで色が変わる(下の図)。単色になっても伝わるよう、色だけに意味を持たせない。中の角丸は外枠に合わせる",
    stance: "1日の中で変わる情報を優先する。サイズが大きいほど情報を一段増やし、小さいものを引き伸ばさない",
    exceptions: "リアルタイムには更新されない。更新を知らせるアニメーションは2秒以内。インラインのアクセサリは押せる場所が1つだけ",
    accessibility: "知覚可能 ― 文字は画像にせずVoiceOverで読めるように。システムフォントでDynamic Type(Large〜AX5)に対応",
    useCases: [
      "主な目的に関わる1つの情報に絞り、1日の中で変わる内容を見せる",
      "小・中・大で、見せる情報の層を増やす(小さいものを引き伸ばさない)",
      "更新が遅れうるときは、最終更新の時刻を表示する",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/widgets#Best-practices",
    urlSecondary: [
      { label: "Widgets ― Appearances(表示モード)", url: "https://developer.apple.com/design/human-interface-guidelines/widgets#Appearances" },
      { label: "Widgets ― iOS dimensions(寸法表)", url: "https://developer.apple.com/design/human-interface-guidelines/widgets#iOS-dimensions" },
      { label: "Widgets ― Choosing margins and padding", url: "https://developer.apple.com/design/human-interface-guidelines/widgets#Choosing-margins-and-padding" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・寸法表・見出しアンカーを確認済み(2026-10)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Android Developers ― Widgets(Sizing・Widget quality guide)",
    color: "#2F7D6E",
    position: "ホーム画面のマス数で大きさを決め、品質を3段階のチェックリストで判定する",
    size: "2×1〜4×3のマス数と幅・高さの範囲(dp)。主なサイズは上の比較図。最小でも押せる範囲48×48dp",
    colorInfo: "テーマの色・ライト/ダーク・システムの角丸に対応すると最上位(下の3段階)",
    stance: "外される主な理由は「ホーム画面でずれて見えること」。マスを端まで埋め、独自の余白を付けない",
    exceptions: "長方形でなくても、向かい合う2辺に接すれば標準。ヘッダーは全面写真や狭い場合は省略できる",
    accessibility: "知覚可能・操作可能 ― コントラスト不足は低品質。最小サイズで48×48dpを標準の条件にする",
    useCases: [
      "1つの主な用途を決め、割り当てられたマスを端まで埋める",
      "2×2・4×1・4×2のいずれかにリサイズでき、大きさで内容を出し入れする",
      "ライト・ダークとテーマの色に合わせ、システムの角丸を使う",
    ],
    searchHint: "",
    url: "https://developer.android.com/design/ui/mobile/guides/widgets/sizing#default-sizes",
    urlSecondary: [
      { label: "Android: Widgets(概要)", url: "https://developer.android.com/design/ui/mobile/guides/widgets" },
      { label: "Android: Widget quality guide", url: "https://developer.android.com/design/ui/mobile/guides/widgets/widget_quality_guide#checklists" },
    ],
    confirmedNote: "m3.material.ioのサイトマップにウィジェットのページはないため、Google公式のAndroid Developersのデザインガイドを掲載しています(本文を直接確認、2026-10)。寸法はPixel端末を基準にした値です。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "(ホーム画面のウィジェット専用の基準なし)WAI-ARIA 1.2 widgetロール",
    color: "#A3821F",
    position: "ホーム画面のウィジェットの基準はない。ARIAの「widget」は操作部品全般を指す別の言葉",
    size: "専用の数値なし。中の文字・操作には一般の基準(1.4.3 4.5:1・2.5.8 24×24px(例外あり)・1.4.1)を当てはめる",
    colorInfo: "―(専用の定めなし。カラー・ボタンのページと同じ基準)",
    glossary: [
      { term: "widget(WAI-ARIA)", desc: "利用者が操作できる、独立したUIの部品を表す抽象ロール。button・checkbox・sliderなどがこれに属する。ホーム画面に置くウィジェットとは別の概念。" },
    ],
    stance: "Webのコンテンツが対象で、OSのホーム画面の部品の見た目や大きさは扱わない",
    exceptions: "―",
    accessibility: "知覚可能・操作可能 ― 1.4.3(コントラスト)・2.5.8(ターゲットサイズ)・1.4.1(色)で確認する",
    useCases: [
      "「ウィジェット」がホーム画面の部品か、ARIAの操作部品かを取り違えない",
      "ウィジェットの中の文字は、背景と4.5:1以上のコントラストを目安にする",
      "押せる部分は小さくしすぎない(24px以上・Androidの品質基準では48dp)",
    ],
    searchHint: "An interactive component",
    url: "https://www.w3.org/TR/wai-aria-1.2/#widget",
    confirmedNote: "WAI-ARIA 1.2のwidgetロールの定義を直接取得して確認済み(2026-10)。1.4.3・1.4.1・2.5.8は他のページで本文を確認済みの基準です。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Mobile Microsessions",
    color: "#7A4F7E",
    position: "15秒未満の短い利用(マイクロセッション)を支える仕組みとして扱う(適合基準ではない)",
    size: "数値なし。スマートフォン利用の4割強が15秒未満という研究を紹介",
    colorInfo: "単独で意味が分かり、見出しや文を途中で切らない。最小サイズでも要点を1文で",
    stance: "頻繁に変わる情報を、アプリを開かずに確かめるのに向く。課題は追いたい「1つのこと」を圧縮できるか",
    exceptions: "追いたい項目が複数なら、一覧型のウィジェットも選択肢",
    accessibility: "根拠となる原則 ― 適合区分ではなく、利用時間の研究とユーザビリティの観察に基づく",
    useCases: [
      "利用者が追いたい「1つのこと」を決め、短い時間で確かめられるようにする",
      "見出しや文を途中で切らず、最小サイズでも要点が分かるようにする",
      "スクロール・次へなど、ウィジェットの中で済む簡単な操作を用意する",
    ],
    searchHint: "Widgets",
    url: "https://www.nngroup.com/articles/mobile-microsessions/#toc-designing-for-microsessions-2",
    confirmedNote: "記事本文を直接取得して確認済み(2026-10)。",
  },
];

/* ---------- はじめに: 目的・利用シーン・ルールの概要 ---------- */
const WIDGET_PURPOSES = [
  { icon: "◷", title: "一目で最新の情報を確かめる", text: "アプリを開かずに、今の天気や次の予定のような、1日の中で変わる情報を見られる(Apple・NN group)" },
  { icon: "▶", title: "アプリを開かずに簡単な操作をする", text: "ボタンやトグルでの操作、ウィジェットの中でのスクロールや「次へ」など(Apple・NN group)" },
  { icon: "⏱", title: "短い利用(15秒未満)を支える", text: "スマートフォンの利用の4割強は15秒未満の「マイクロセッション」。その短い時間で用が済むようにする(NN group)" },
  { icon: "★", title: "アプリの大事な機能をすぐ使えるようにする", text: "アプリの主な目的に関わる内容や機能を、ホーム画面・ロック画面・デスクトップに置く(Apple)" },
];

const WIDGET_RULES = [
  { k: "目的を1つに絞る", t: "利用者が追いたい「1つのこと」を決める。アプリのアイコンを複製しただけのウィジェットは価値が低い", who: "Apple・Google・NN group" },
  { k: "大きさごとに見せる量を決める", t: "小は1つの情報、中・大で情報や操作を一段増やす。小さいものをそのまま引き伸ばさない", who: "Apple・Google" },
  { k: "一目で分かる量にし、途中で切らない", t: "情報を詰め込みすぎない。見出しや文を省略せず、最小サイズでも要点が伝わるようにする", who: "Apple・NN group" },
  { k: "古い情報を出さない", t: "リアルタイムには更新されないため、必要なら最終更新の時刻を示す。操作したら内容を更新する", who: "Apple・Google" },
  { k: "置かれる場所になじませる", t: "マスを端まで埋め、テーマの色・ライト/ダーク・システムの角丸に合わせる。表示モードが変わっても意味が伝わるようにする", who: "Apple・Google" },
  { k: "読める・押せる", t: "文字は11pt以上が目安、コントラストを確保し、押せる範囲は48×48dpを保つ。色だけに頼らない", who: "Apple・Google・W3C" },
];

const WIDGET_SCENES = ["天気(今の気温と予報)", "ニュースの見出し", "メールなどの一覧(コレクション型)", "検索バー(Androidの4×1)", "写真を全面に見せる", "ボタン・トグルでの簡単な操作", "ロック画面(時計の上の1行・下の円形/長方形)", "StandBy", "Macのデスクトップ", "Apple Watch"];

function WidgetIntro() {
  return (
    <section style={styles.introBox}>
      <h2 style={styles.introTitle}>はじめに ― ウィジェットを使う目的・利用シーン・ルール</h2>
      <div style={styles.introCols}>
        <div style={{ minWidth: 0 }}>
          <div style={styles.introHead}>目的(なぜウィジェットを置くか)</div>
          {WIDGET_PURPOSES.map((p) => (
            <div key={p.title} style={styles.purposeRow}>
              <span style={styles.purposeIcon}>{p.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={styles.purposeTitle}>{p.title}</div>
                <div style={styles.purposeText}>{p.text}</div>
              </div>
            </div>
          ))}
          <p style={styles.introNote}>ウィジェットはアプリの「入り口」ではなく、アプリを開かなくても用が済む「小さな窓」として考えます。</p>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={styles.introHead}>ルールの概要(系列の共通点)</div>
          <ol style={styles.ruleList}>
            {WIDGET_RULES.map((r) => (
              <li key={r.k} style={styles.ruleItem}>
                <strong>{r.k}</strong> ― {r.t}
                <span style={styles.ruleWho}>{r.who}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div style={styles.introHead}>主な利用シーン</div>
      <div style={styles.sceneChips}>
        {WIDGET_SCENES.map((x) => (<span key={x} style={styles.sceneChip}>{x}</span>))}
      </div>
    </section>
  );
}

/* 画像エリア: 同じ天気ウィジェットを、大きさごとに見せる量を変える(概念図) */
function WidgetSizesSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const k = 0.32, base = 128;
  const box = (x, w, h, children, label) => (
    <g>
      <rect x={x} y={base - h * k} width={w * k} height={h * k} rx="9" fill="#3C6E9E" />
      {children(x, base - h * k)}
      <text x={x + (w * k) / 2} y={base + 14} fontSize="8.5" fill="#454C78" textAnchor="middle" fontFamily={font}>{label}</text>
    </g>
  );
  const temp = (x, y) => (
    <g>
      <text x={x + 6} y={y + 12} fontSize="6.5" fill="#FFFFFF" fontFamily={font}>東京</text>
      <text x={x + 6} y={y + 30} fontSize="16" fill="#FFFFFF" fontWeight="300" fontFamily={font}>21°</text>
      <text x={x + 6} y={y + 41} fontSize="5.5" fill="#DDE7F2" fontFamily={font}>晴れ 24°/16°</text>
    </g>
  );
  const hours = (x, y, n) => [0, 1, 2].slice(0, n).map((i) => (
    <g key={i}>
      <text x={x + i * 17} y={y} fontSize="5.5" fill="#DDE7F2" textAnchor="middle" fontFamily={mono}>{12 + i}時</text>
      <circle cx={x + i * 17} cy={y + 6} r="3" fill="#F6D27A" />
      <text x={x + i * 17} y={y + 16} fontSize="5.5" fill="#FFFFFF" textAnchor="middle" fontFamily={mono}>{21 + i}°</text>
    </g>
  ));
  return (
    <svg viewBox="0 0 346 146" width="100%" style={{ maxWidth: 480, display: "block", margin: "0 auto" }} role="img" aria-label="天気ウィジェットの小・中・大の例">
      {box(6, 170, 170, (x, y) => temp(x, y), "小: 今の天気だけ")}
      {box(80, 364, 170, (x, y) => (<g>{temp(x, y)}{hours(x + 64, y + 16, 3)}</g>), "中: +数時間の予報")}
      {box(222, 364, 382, (x, y) => (<g>{temp(x, y)}{hours(x + 64, y + 16, 3)}{[0, 1, 2, 3].map((i) => (<g key={i}><text x={x + 8} y={y + 62 + i * 15} fontSize="6" fill="#FFFFFF" fontFamily={font}>{["月", "火", "水", "木"][i]}</text><rect x={x + 24} y={y + 58 + i * 15} width={50 + (i % 2) * 15} height="4" rx="2" fill="#F6D27A" opacity="0.8" /></g>))}</g>), "大: +週間の予報")}
    </svg>
  );
}

/* 四サイト比較図: 大きさの決め方(実寸比で描画) */
function SizeChart() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const k = 0.28;
  const base = 152;
  const solid = (x, w, h, label, color) => (
    <g>
      <rect x={x} y={base - h * k} width={w * k} height={h * k} rx="6" fill={color} fillOpacity="0.18" stroke={color} />
      <text x={x + (w * k) / 2} y={base + 12} fontSize="8.5" fill="#171B36" textAnchor="middle" fontFamily={font}>{label}</text>
      <text x={x + (w * k) / 2} y={base + 23} fontSize="7.5" fill="#565D8A" textAnchor="middle" fontFamily={mono}>{w}×{h}</text>
    </g>
  );
  const range = (x, w0, h0, w1, h1, label) => (
    <g>
      <rect x={x} y={base - h1 * k} width={w1 * k} height={h1 * k} rx="6" fill="none" stroke="#2F7D6E" strokeDasharray="3 2" />
      <rect x={x} y={base - h0 * k} width={w0 * k} height={h0 * k} rx="6" fill="#2F7D6E" fillOpacity="0.2" stroke="#2F7D6E" />
      <text x={x + (w1 * k) / 2} y={base + 12} fontSize="8.5" fill="#171B36" textAnchor="middle" fontFamily={font}>{label}</text>
      <text x={x + (w1 * k) / 2} y={base + 23} fontSize="7.5" fill="#565D8A" textAnchor="middle" fontFamily={mono}>{w0}〜{w1}×{h0}〜{h1}</text>
    </g>
  );
  return (
    <div>
      <svg viewBox="0 0 640 200" width="100%" style={{ maxWidth: 720, display: "block", margin: "0 auto" }} role="img" aria-label="AppleとGoogleのウィジェットの大きさの比較図">
        <text x="0" y="14" fontSize="11.5" fill="#C2542A" fontWeight="700" fontFamily={font}>Apple(iPhone 430×932pt、単位pt)</text>
        {solid(0, 170, 170, "小", "#C2542A")}
        {solid(56, 364, 170, "中", "#C2542A")}
        {solid(166, 364, 382, "大", "#C2542A")}
        <text x="330" y="14" fontSize="11.5" fill="#2F7D6E" fontWeight="700" fontFamily={font}>Google(スマートフォン、単位dp)</text>
        {range(330, 109, 115, 306, 276, "2×2")}
        {range(430, 245, 115, 624, 276, "4×2")}
        <text x="0" y="194" fontSize="8.5" fill="#9EA4C4" fontFamily={font}>実寸の28%で描画。Googleの塗りは最小、点線は最大(画面の向きや端末で変わる範囲)。ptとdpはどちらも画面の密度に依存しない単位です。</text>
      </svg>
      <div style={styles.numRow}>
        {[
          ["Apple", "#C2542A", "余白 16pt(詰めるとき11pt)・文字 11pt以上・更新のアニメーション 2秒以内"],
          ["Google", "#2F7D6E", "押せる範囲 48×48dp・マスを端まで埋める(独自の余白なし)"],
          ["W3C", "#A3821F", "専用の数値なし(一般の基準: 文字4.5:1、押せる対象24×24 CSS px(2.5.8 AA、例外あり))"],
          ["NN group", "#7A4F7E", "マイクロセッションは15秒未満(高齢者は22秒)"],
        ].map(([n, c, t]) => (
          <div key={n} style={styles.numItem}><span style={{ ...styles.numWho, color: c }}>{n}</span>{t}</div>
        ))}
      </div>
    </div>
  );
}

/* 良いウィジェット・悪いウィジェット */
const DO_DONT = [
  { ok: true, t: "1つの主な目的に絞る", d: "天気なら今の気温と天気。追いたい「1つのこと」を見つける", who: "Apple・Google・NN group" },
  { ok: false, t: "アプリのアイコンを複製しただけ", d: "開くための入り口にしかならず、置いてもらえない", who: "Apple" },
  { ok: true, t: "大きさで情報の層を増やす", d: "小=1つの情報、中・大=予報や操作を追加。小さいものを引き伸ばさない", who: "Apple・Google" },
  { ok: false, t: "見出しを途中で切る", d: "結局アプリを開く必要がある。最小サイズでも要点を1文で", who: "NN group" },
  { ok: true, t: "マスを端まで埋める", d: "ホーム画面の他の要素とそろえる。ずれて見えると外される", who: "Google" },
  { ok: false, t: "古い情報のまま", d: "更新が遅れるなら最終更新の時刻を示す。操作後は内容を更新する", who: "Apple・Google" },
  { ok: true, t: "ブランドは控えめに", d: "色や書体で分かるようにし、ロゴが必要なら右上に小さく", who: "Apple" },
  { ok: false, t: "アプリのように詰め込む", d: "操作の場所が多すぎると誤操作が増える。押せる範囲は十分に", who: "Apple・Google" },
];

function DoDont() {
  const cols = [
    { ok: true, head: "◯ 良いウィジェット", color: "#5A9629", text: "#2E6B3A" },
    { ok: false, head: "✕ 避けたいウィジェット", color: "#C0503F", text: "#A33A2E" },
  ];
  return (
    <div style={styles.ddGrid}>
      {cols.map((c) => (
        <div key={c.head} style={{ ...styles.ddCol, borderTopColor: c.color }}>
          <div style={{ ...styles.ddHead, color: c.text }}>{c.head}</div>
          {DO_DONT.filter((x) => x.ok === c.ok).map((x) => (
            <div key={x.t} style={styles.ddItem}>
              <div style={styles.ddTitle}><span style={{ color: c.text, marginRight: 6 }}>{c.ok ? "◯" : "✕"}</span>{x.t}</div>
              <div style={styles.ddText}>{x.d}</div>
              <div style={styles.ddWho}>{x.who}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* Appleの表示モード */
function AppearanceModes() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const modes = [
    { name: "フルカラー", where: "ホーム画面(ライト・ダーク)・Macのデスクトップ", bg: "#3C6E9E", fg: "#FFFFFF", accent: "#F6D27A", wall: "#EEF1FA" },
    { name: "アクセント(色合い)", where: "ホーム画面で利用者が色合いを選んだとき", bg: "#6E5A8F", fg: "#F1E9FF", accent: "#CDB8F2", wall: "#2B2440" },
    { name: "アクセント(クリア)", where: "ホーム画面で透明な見た目を選んだとき", bg: "rgba(255,255,255,0.35)", fg: "#FFFFFF", accent: "#FFFFFF", wall: "#7FA7C9", glass: true },
    { name: "バイブラント", where: "iPhone・iPadのロック画面、暗い場所のStandBy", bg: "transparent", fg: "#E6E0E9", accent: "#E6E0E9", wall: "#141218" },
  ];
  return (
    <div style={styles.amGrid}>
      {modes.map((m) => (
        <div key={m.name} style={styles.amCard}>
          <svg viewBox="0 0 120 92" width="100%" style={{ maxWidth: 150, display: "block", margin: "0 auto" }} aria-hidden="true">
            <rect x="0" y="0" width="120" height="92" rx="8" fill={m.wall} />
            <rect x="22" y="12" width="76" height="68" rx="14" fill={m.bg} stroke={m.glass ? "#FFFFFF" : "none"} strokeOpacity="0.7" />
            <text x="32" y="32" fontSize="9" fill={m.fg} fontFamily={font}>東京</text>
            <text x="32" y="56" fontSize="20" fill={m.fg} fontWeight="300" fontFamily={font}>21°</text>
            <circle cx="84" cy="28" r="6" fill={m.accent} />
            <text x="32" y="70" fontSize="7" fill={m.fg} opacity="0.85" fontFamily={font}>晴れ</text>
          </svg>
          <div style={styles.amName}>{m.name}</div>
          <div style={styles.amWhere}>{m.where}</div>
        </div>
      ))}
    </div>
  );
}

/* Googleの品質の3段階 */
const TIERS = [
  { tier: "Tier 3 ― 低品質", color: "#A33A2E", items: ["グリッドのマスを埋めていない(向かい合う2辺に接していない)", "文字・アイコンボタンのコントラストが足りない", "ウィジェットの名前・プレビュー画像がない", "内容が古いまま・操作しても更新されない・切れている"] },
  { tier: "Tier 2 ― 標準", color: "#8A6A10", items: ["他の要素と縦横にそろい、余計な空白を占めない", "リサイズできるなら最小・最大のサイズを決める(最小でも48×48dpの押せる範囲)", "ウィジェット選択画面のプレビューが正確", "空の状態・未ログインでも価値を示すか行動を促す", "データが画面より頻繁に変わるなら、手動で更新できる"] },
  { tier: "Tier 1 ― 差別化", color: "#2E6B3A", items: ["長方形なら4辺すべてに接する(検索バーの4×1は2辺)", "2×2・4×1・4×2のいずれかにリサイズできる", "ヘッダーを仕様どおり一貫して使う", "テーマの色・ライト/ダーク・システムの角丸に対応", "読み込み中の状態・起動時の遷移もシステムの仕様に合わせる"] },
];

function QualityTiers() {
  return (
    <div style={styles.tierRow}>
      {TIERS.map((t, i) => (
        <div key={t.tier} style={{ ...styles.tierCard, borderLeftColor: t.color }}>
          <div style={{ ...styles.tierName, color: t.color }}>{t.tier}</div>
          <div style={styles.tierBar}><span style={{ ...styles.tierFill, width: `${(i + 1) * 33}%`, background: t.color }} /></div>
          <ul style={styles.tierList}>{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

function InfoBox({ label, accent, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent ? { borderLeftColor: accent } : {}) }}>
      <span style={styles.exceptionLabel}>{label}</span>
      <div style={styles.exceptionText}>{children}</div>
    </div>
  );
}

function UseCaseList({ items }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={styles.useCaseItem}>{it}</li>))}
    </ul>
  );
}

function GlossaryNote({ items }) {
  return (
    <div style={styles.glossaryNoteBox}>
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

export default function CommunicationWidgetPage() {
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
        <SidebarNav currentPath="/components/communication/widget" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ウィジェット</span>
            <span>SPEC No. 055</span>
          </div>

          <h1 style={styles.title}>ウィジェット(ホーム画面ウィジェット)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、ホーム画面などに置くウィジェットの大きさ・見せる内容・更新・品質をどう定めているかを比較します</p>

          <WidgetIntro />

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>同じウィジェットでも、大きさで見せる量を変える(概念図)</span>
            <WidgetSizesSwatch />
            <p style={styles.swatchNote}>小さいサイズは1つの情報(今の天気)、大きくなるほど予報などの情報の層を増やします。小さいウィジェットの内容をそのまま引き伸ばすのではなく、大きさごとに見せる内容を決めます(Apple)。寸法はiPhoneの小・中・大の比率で描いています。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              Apple・Google・NN groupの3系列がそろって一致しているのは、<strong>1つの主な目的に絞り、アプリを開かずに一目で分かる内容にする</strong>という点です。Appleは天気の例で「今の最高・最低気温と天気」を挙げ、Googleは「1つの主な用途を選ぶ」ことを最初の手順にし、NN groupは<strong>利用者が追いたい「1つのこと」を見つけ、収まる単位に圧縮できるか</strong>が最大の課題だとしています。
            </p>
            <p style={styles.synthesisText}>
              大きさの決め方は違います。Appleは<strong>端末ごとのpt寸法(iPhoneでは小170×170・中364×170・大364×382pt)</strong>と、<strong>置かれる場所に応じた表示モード(フルカラー・アクセント・バイブラント)</strong>を定めます。Googleは<strong>ホーム画面のマス数(2×2・4×2など)と幅・高さの範囲</strong>で決め、<strong>マスを端まで埋める・押せる範囲48dp・コントラスト</strong>などを3段階の品質チェックリストにしています。
            </p>
            <p style={styles.synthesisText}>
              更新についても考え方は近く、Appleは<strong>ウィジェットはリアルタイムに更新されないため、最終更新の時刻を示す</strong>よう求め、Googleは<strong>古いままの内容や、操作しても更新されないものを低品質</strong>としています。NN groupは、ウィジェットを<strong>15秒未満の短い利用(マイクロセッション)</strong>を支える仕組みとし、<strong>見出しを途中で切らない</strong>ことを求めています。
            </p>
            <p style={styles.synthesisText}>
              W3Cには<strong>ホーム画面のウィジェットの基準はなく</strong>、WAI-ARIAの「widget」はボタンなどの操作部品全般を指す別の言葉です。実務では、<strong>主目的を1つに決めて大きさごとに見せる量を設計し、文字のコントラスト・押せる範囲・色だけに頼らない表現を、通常の画面と同じ基準で確かめる</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 大きさの決め方と数値</h2>
            <SizeChart />
            <p style={styles.chartNote}>AppleはHIGのiOSの寸法表(画面430×932ptの端末)、GoogleはAndroid Developersのスマートフォンの既定サイズ(Pixel端末が基準)です。Appleは端末ごとに固定の寸法、Googleはマス数と幅・高さの範囲で指定する、という違いがあります。</p>
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
                <InfoBox label="大きさの決め方" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="見た目・色の扱い">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                <div style={styles.sourceFootRow}>
                  {s.searchHint && (
                    <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                  )}
                  <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
                </div>
                {s.urlSecondary && (
                  <div style={styles.secondaryLinks}>
                    {s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{sl.label} ↗</a>
                    ))}
                  </div>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>ウィジェット デザインシステム比較</h2>
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
                <div style={styles.labelCell}>大きさの決め方</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>見た目・色の扱い</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                    {s.confirmedNote && <span style={styles.confirmedNoteSmall}>{s.confirmedNote}</span>}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>良いウィジェット・避けたいウィジェット</h2>
            <p style={styles.diagramNote}>Apple・Google・NN groupの記述を、良いウィジェット(◯)と避けたいウィジェット(✕)に分けて並べました。下の名前は根拠にした系列です。</p>
            <DoDont />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>Apple ― 置かれる場所で変わる表示モード</h2>
            <p style={styles.diagramNote}>同じウィジェットでも、置かれる場所と利用者の設定によって、システムが見た目を変えます。どの表示でも意味が伝わるよう、色だけに頼らず文字とアイコンを併用します(図は概念図)。</p>
            <AppearanceModes />
          </section>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>Google ― ウィジェットの品質の3段階</h2>
            <p style={styles.diagramNote}>Androidは、ウィジェットの品質をチェックリストで3段階に分けています。Tier 3に当てはまるものは低品質、Tier 2をすべて満たせば標準、Tier 1も満たせばおすすめとして紹介される対象になります。</p>
            <QualityTiers />
          </section>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎", "段階的に見せる"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・NN groupは本文確認済み。GoogleはM3にページがなく、Android Developersのデザインガイドで確認。W3Cは専用の基準なし)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Widgetsページの「Best practices」見出しへのアンカー付きリンクで、表示モード・寸法表・余白の見出しも併記しています。GoogleはAndroid Developersのウィジェットの大きさのページ(既定サイズの節)と、概要・品質ガイドです。W3CはWAI-ARIA 1.2のwidgetロールの定義です。NN groupはMobile Microsessionsの記事の、マイクロセッションの設計の節です。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  introBox: { border: "1px solid #E1E3F0", borderRadius: 8, padding: "16px 16px 14px", marginBottom: 22, background: "#FFFFFF" },
  introTitle: { fontSize: 15, fontWeight: 700, color: "#171B36", margin: "0 0 12px" },
  introCols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "6px 22px" },
  introHead: { fontSize: 11.5, fontWeight: 700, color: "#3C5A73", margin: "6px 0 8px", letterSpacing: 0.2 },
  introNote: { fontSize: 11, lineHeight: 1.6, color: "#7E86AC", margin: "6px 0 8px" },
  purposeRow: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 },
  purposeIcon: { width: 26, height: 26, flexShrink: 0, borderRadius: 13, background: "#EEF1FA", color: "#3C5A73", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" },
  purposeTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  purposeText: { fontSize: 11, lineHeight: 1.6, color: "#454C78" },
  ruleList: { margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 7 },
  ruleItem: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457" },
  ruleWho: { display: "inline-block", marginLeft: 6, fontSize: 9.5, color: "#7E86AC", border: "1px solid #E1E3F0", borderRadius: 3, padding: "0 4px" },
  sceneChips: { display: "flex", flexWrap: "wrap", gap: 6 },
  sceneChip: { fontSize: 11, color: "#2E3457", background: "#F3F6FA", borderRadius: 12, padding: "3px 10px" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6, textAlign: "left" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  subHead: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "0 0 10px" },
  ruleSection: { marginBottom: 26 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  confirmedNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.5, fontStyle: "italic", marginTop: 4 },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#9EA4C4", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#7E86AC", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#7E86AC" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  secondaryLinks: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  numRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 8, marginTop: 8 },
  numItem: { fontSize: 11, lineHeight: 1.55, color: "#2E3457", background: "#F8F9FD", borderRadius: 4, padding: "7px 9px" },
  numWho: { display: "block", fontSize: 10, fontWeight: 700 },
  ddGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 12 },
  ddCol: { border: "1px solid #E1E3F0", borderTop: "3px solid", borderRadius: 6, padding: "10px 14px 4px", background: "#FFFFFF" },
  ddHead: { fontSize: 13, fontWeight: 700, marginBottom: 4 },
  ddItem: { padding: "8px 0", borderTop: "1px dashed #E1E3F0" },
  ddTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  ddText: { fontSize: 11, lineHeight: 1.6, color: "#454C78", marginTop: 4 },
  ddWho: { fontSize: 9.5, color: "#7E86AC", marginTop: 5 },
  amGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 170px), 1fr))", gap: 10 },
  amCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px", background: "#FFFFFF" },
  amName: { fontSize: 12, fontWeight: 700, color: "#171B36", marginTop: 6 },
  amWhere: { fontSize: 10.5, lineHeight: 1.5, color: "#565D8A", marginTop: 2 },
  tierRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10 },
  tierCard: { border: "1px solid #E1E3F0", borderLeft: "4px solid", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  tierName: { fontSize: 12.5, fontWeight: 700 },
  tierBar: { height: 5, borderRadius: 3, background: "#EEF0F5", margin: "6px 0 8px" },
  tierFill: { display: "block", height: 5, borderRadius: 3 },
  tierList: { margin: 0, paddingLeft: 16, fontSize: 11, lineHeight: 1.6, color: "#2E3457" },
};
