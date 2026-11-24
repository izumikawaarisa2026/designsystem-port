import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, RelatedPages, hasRow, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Communication / プログレスインジケーター」ページ。
 * 処理の進行状況を示す、確定的(determinate)/不確定(indeterminate)の2状態を
 * 持つコンポーネントの4系列比較。「ローディング状態」ページとは対象が
 * 隣接するが、本ページは進行状況の可視化そのもの(バー・スピナー等の形状と
 * 状態遷移)に焦点を当て、空のコンテナへのプレースホルダー表示や骨組み表示
 * (スケルトン画面)は「ローディング状態」ページで扱う。
 *
 * Nielsen Norman Group(Progress Indicators Make a Slow System Less
 * Insufferable)は本文を直接取得して確認済み(2026-09)。1秒未満は表示不要、
 * 1〜10秒はループアニメーション(スピナー)、10秒超は達成率表示(プログレスバー)
 * という具体的な秒数の目安を明記している数少ない一次情報。
 *
 * W3C(MDNのrole="progressbar"解説ページ)も本文を直接取得して確認済み。
 * aria-valuenow/aria-valuemin/aria-valuemaxの意味、不確定状態では
 * aria-valuenowを「0にする」のではなく「省略する」べきという点、
 * ネイティブの<progress>要素の使用が推奨されている点を確認した。
 *
 * Apple(HIGのProgress indicatorsページ、Loadingページ)・Google(M3の
 * Progress indicatorsページ、および新設のLoading indicatorページ)は
 * いずれもSPAサイトのため検索結果による間接確認(2026-09)。GoogleのLoading
 * indicatorは「5秒未満の待ち時間向け、従来の不確定円形インジケーターの
 * 多くを置き換える意図」と説明されており、NN groupの1〜10秒という目安と
 * 近い時間感覚である点をAI解釈で指摘した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Progress Indicators / Loading",
    term: "Progress indicator(Progress bar・Activity indicator=スピナー)",
    color: "#C2542A",
    position: <>処理中であることを一時的に示す。<Hl>確定的/不確定の2種類</Hl>を使い分ける</>,
    size: "寸法の数値の記載なし",
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      <>処理が終わると消える一時的な表示。<Hl>できるだけ確定的な表示を優先する</Hl>。いつも同じ場所に出し、「読み込み中」のようなあいまいな文言を避け、表示中に円とバーを切り替えない。どうしても長くかかるなら、待つ間に見てもらえるもの(ヒントや短い映像など)を用意する。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    scenarios: [
      "所要時間が分かるダウンロード・ファイル変換などにプログレスバー(確定的)を使いたい時",
      "所要時間が見積もれない読み込み・同期処理にスピナー(不確定)を使いたい時",
      "処理が長時間かかることが避けられず、待機中に見せるものが必要な時",
    ],
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "所要時間が分かる処理には確定的な表示を優先する",
      "曖昧な文言(「読み込み中」等)だけに頼らず、常に同じ場所に表示して見つけやすくする",
      "表示中に円形⇔バー形状を切り替えない",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/progress-indicators",
    refs: [
      { label: "Progress indicators", url: "https://developer.apple.com/design/human-interface-guidelines/progress-indicators" },
      { label: "Loading(読み込み中のプレースホルダー指針)", url: "https://developer.apple.com/design/human-interface-guidelines/loading" },
    ],
    confirmedNote: "HIG Progress indicatorsの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <svg width="70" height="10" viewBox="0 0 70 10"><rect x="0.5" y="0.5" width="69" height="9" rx="4.5" fill="none" stroke="#C2542A" strokeWidth="1" /><rect x="0.5" y="0.5" width="44" height="9" rx="4.5" fill="#C2542A" /></svg>
        <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8.5" fill="none" stroke="#F0DED4" strokeWidth="2.4" /><path d="M11 2.5a8.5 8.5 0 0 1 6 2.5" fill="none" stroke="#C2542A" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </div>
    ),
    illustrationNote: "確定的(左・バー)/不確定(右・スピナー)の2形状(概念図)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Progress indicators / Loading indicator",
    term: "Progress indicator(線形・円形)",
    color: "#2F7D6E",
    position: <>linear(直線)/circular(円形)の2形状と、determinate(確定的)/indeterminate(不確定)の2状態を組み合わせる。<Hl>5秒未満の待ち時間向けに新設した「Loading indicator」もある</Hl></>,
    size: <>Loading indicator(短い待ち用)は<Hl>既定48dp、置く場所や画面の幅に合わせて24〜240dp</Hl>。Progress indicatorの線形の終わりには直径4dpの丸を置く。</>,
    colorInfo: <NoData>色の値は記載なし</NoData>,
    stance:
      <>線形はコンテナの端、円形は要素の中央に置くのに向く。波形(wavy)は、長い処理を単調に感じさせないスタイルとして選べる。<Hl>5秒未満の短い待ちはLoading indicator、5秒を超えるならProgress indicator</Hl>。進み具合が分かったら、不確定から確定に切り替える。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    scenarios: [
      "コンテナの端(画面上部など)に置く時(linear)",
      "要素の中央に置く時(circular)",
      "5秒未満で終わる短い待ち時間の時(Loading indicator)",
    ],
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "配置(端か中央か)に応じてlinear/circularを選ぶ",
      "待ち時間が5秒未満ならLoading indicator、それ以上ならProgress indicatorを検討する",
      "長い処理には表現力のあるwavy形状も選択肢にする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/progress-indicators/overview",
    refs: [
      { label: "Progress indicators", url: "https://m3.material.io/components/progress-indicators/overview" },
      { label: "Loading indicator", url: "https://m3.material.io/components/loading-indicator/overview" },
      { label: "Progress indicators ― Guidelines(使い方)", url: "https://m3.material.io/components/progress-indicators/guidelines" },
      { label: "Loading indicator(新設、短い待ち時間向け)", url: "https://m3.material.io/components/loading-indicator/guidelines" },
    ],
    confirmedNote: "M3 Progress indicators・Loading indicatorのガイドラインの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <svg width="70" height="10" viewBox="0 0 70 10"><rect x="0.5" y="3.5" width="69" height="3" rx="1.5" fill="#DDEFEA" /><rect x="10" y="3.5" width="22" height="3" rx="1.5" fill="#2F7D6E" /></svg>
        <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8.5" fill="none" stroke="#DDEFEA" strokeWidth="2.4" /><path d="M11 2.5a8.5 8.5 0 0 1 6 2.5" fill="none" stroke="#2F7D6E" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </div>
    ),
    illustrationNote: "linear(左、両端に隙間のある帯)/circular(右)の2形状(概念図)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― プログレスバーの役割",
    term: "プログレスバー(WAI-ARIAの役割)",
    color: "#A3821F",
    position: <>進み具合を支援技術に伝える役割。<Hl>今の値を伝えるかどうかで、確定的/不確定を表す</Hl></>,
    size: "専用の数値基準はない。値は最小(既定0)〜最大(既定100)の範囲で伝える。",
    colorInfo: "色についての専用基準はない。",
    glossary: [
      { term: "今の値/値の言い換え", desc: "今の値は、不確定な処理では存在しないため、0とせず伝えない。パーセンテージで伝えると誤解を招くときは、支援技術に伝える文言を言い換えられる。" },
    ],
    stance:
      <>何の進み具合かを示す名前が必須。<Hl>確定なら今の値・最小・最大を伝える</Hl>。進み具合の表示にスライダーを使わない。</>,
    exceptions:
      <>不確定な処理では、<Hl>今の値を0にせず、伝えない</Hl>(「0%」と誤って伝わるため)。</>,
    scenarios: [
      "確定的な進み具合を、今の値・最小・最大で伝えたい時",
      "パーセンテージが実態に合わず、伝える文言を言い換えたい時",
      "進み具合を支援技術にも伝えたい時",
    ],
    accessibility: "知覚可能(Perceivable)・堅牢(Robust) ― 進み具合と名前を支援技術に伝える。",
    useCases: [
      "不確定な処理では今の値を伝えない(0にしない)",
      "何の進み具合かが分かる名前を付ける",
      "値の最小・最大と今の値を伝える(確定的な場合)",
      "完了や失敗は、ステータスメッセージとして支援技術にも伝える(4.1.3)",
    ],
    searchHint: "aria-valuenow",
    url: "https://www.w3.org/TR/wai-aria-1.2/#progressbar",
    refs: [
      { label: "WAI-ARIA: progressbar(プログレスバーの役割)", url: "https://www.w3.org/TR/wai-aria-1.2/#progressbar" },
      { kind: "sc", level: "AA", label: "4.1.3 ステータスメッセージ", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html" },
      { kind: "mdn", label: "progressbarロール", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="150" height="24" viewBox="0 0 150 24">
          <rect x="1" y="1" width="148" height="22" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="75" y="15" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">今の値 60(伝えないと不確定)</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、今の値を伝えるかどうかによる確定/不確定の切り替えを図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Progress Indicators Make a Slow System Less Insufferable",
    term: "Progress indicator",
    color: "#7A4F7E",
    position: <><Hl>待ち時間の長さで、インジケーターの種類を決める</Hl>(数値の目安あり)</>,
    size: <><Hl>1秒未満は何も出さない。スピナーは2〜10秒、10秒以上は何%かの表示</Hl>。所要時間が読めないなら、早めに%表示へ切り替える。</>,
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      <>動いていると安心させ、待ち時間の目安を示す。<Hl>動くプログレスバーを見た人は、何も出ない場合の平均3倍長く待った</Hl>。情報のない静的な表示や注意書きはほとんど読まれない。</>,
    exceptions:
      "10秒未満でも、複数の書類や台帳をまとめて処理するなら、達成率の表示(プログレスバー)を使ってよい。",
    scenarios: [
      "2〜10秒程度の読み込みにループアニメーション(スピナー)を使いたい時",
      "10秒以上かかる、またはかかる可能性がある処理に達成率表示を使いたい時",
      "複数ファイルの一括処理など、短くても進捗の内訳を示したい時",
    ],
    accessibility: "根拠となる原則 ― 待ち時間の長さで表示を使い分ける、利用者の心理にもとづく指針。",
    useCases: [
      "1秒未満の処理にはインジケーターを表示しない",
      "何も情報を示さない静的な表示や「二度押ししないでください」の注意書きは避ける",
      "所要時間の見積もりが不確かな時は、早めに達成率表示へ切り替える",
    ],
    searchHint: "Percent-Done",
    url: "https://www.nngroup.com/articles/progress-indicators/",
    refs: [
      { label: "Progress Indicators Make a Slow System Less Insufferable", url: "https://www.nngroup.com/articles/progress-indicators/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#7A4F7E", textAlign: "center" }}>
          <div>&lt;1s</div>
          <div style={{ color: "#666D93" }}>非表示</div>
        </div>
        <span style={{ color: "#D8CBDA" }}>→</span>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#7A4F7E", textAlign: "center" }}>
          <div>1-10s</div>
          <div>スピナー</div>
        </div>
        <span style={{ color: "#D8CBDA" }}>→</span>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#7A4F7E", textAlign: "center" }}>
          <div>10s+</div>
          <div>バー</div>
        </div>
      </div>
    ),
    illustrationNote: "待ち時間の長さによる使い分けの目安(概念図)",
  },
];
markNeg(SOURCES);

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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function ProgressSwatch() {
  return (
    <div style={{ width: 300, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 10.5, color: "#666D93", marginBottom: 6, textAlign: "left" }}>確定的(determinate)― 線形バー</div>
        <svg width="300" height="10" viewBox="0 0 300 10"><rect x="0.5" y="0.5" width="299" height="9" rx="4.5" fill="#EEF1FA" /><rect x="0.5" y="0.5" width="190" height="9" rx="4.5" fill="#3A4FCF" /></svg>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 10.5, color: "#666D93", textAlign: "left" }}>不確定(indeterminate)― 円形スピナー</div>
        <svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="10" fill="none" stroke="#E1E3F0" strokeWidth="2.8" /><path d="M13 3a10 10 0 0 1 7 3" fill="none" stroke="#3A4FCF" strokeWidth="2.8" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
}

/* No.059: 形の使い分け(2026-11 ⑦本人レビューで、待ち時間 × 終わりが分かるか の表に作り直し)。出典の系列を括弧で示す */
function MiniShape({ k }) {
  const g = "#2F7D6E", t = "#D5D9EC";
  if (k === "none") return <svg width="56" height="24" viewBox="0 0 56 24" aria-hidden="true"><text x="28" y="16" fontSize="10" textAnchor="middle" fill="#9EA4C4">表示なし</text></svg>;
  if (k === "spinner") return <svg width="56" height="24" viewBox="0 0 56 24" aria-hidden="true"><circle cx="28" cy="12" r="9" fill="none" stroke={t} strokeWidth="3" /><path d="M28 3 A9 9 0 0 1 37 12" fill="none" stroke={g} strokeWidth="3" strokeLinecap="round" /></svg>;
  if (k === "ring") return <svg width="56" height="24" viewBox="0 0 56 24" aria-hidden="true"><circle cx="28" cy="12" r="9" fill="none" stroke={t} strokeWidth="3" /><path d="M28 3 A9 9 0 1 1 19 12" fill="none" stroke={g} strokeWidth="3" /><text x="28" y="15" fontSize="7" textAnchor="middle" fill={g}>75%</text></svg>;
  if (k === "barI") return <svg width="56" height="24" viewBox="0 0 56 24" aria-hidden="true"><rect x="2" y="10" width="52" height="4" rx="2" fill={t} /><rect x="18" y="10" width="18" height="4" rx="2" fill={g} /></svg>;
  return <svg width="56" height="24" viewBox="0 0 56 24" aria-hidden="true"><rect x="2" y="10" width="52" height="4" rx="2" fill={t} /><rect x="2" y="10" width="36" height="4" rx="2" fill={g} /></svg>;
}
const SHAPE_GRID = [
  { time: "1秒未満", unknown: { k: "none", t: "何も出さない", n: "すぐ終わるなら不要(NN group)" }, known: { k: "none", t: "何も出さない", n: "" } },
  { time: "2〜10秒", unknown: { k: "spinner", t: "くるくる回る円(スピナー)", n: "止まって見えると固まったと思われるので、動かし続ける(Apple)" }, known: { k: "ring", t: "塗り進む円かバー", n: "時計回りに塗り進める(Apple・Google)" } },
  { time: "10秒以上", unknown: { k: "barI", t: "流れるバー", n: "早めに「何%か」の表示に切り替える(NN group)" }, known: { k: "bar", t: "伸びるバー(何%か)", n: "キャンセル・一時停止を用意する(Apple)" } },
];
const SHAPE_RULES = [
  "できるだけ確定(何%か分かる)の表示にする。途中で時間が分かったら、不確定から確定に切り替える(Apple)",
  "円形とバーの間では切り替えない。形と大きさが違うため、画面が乱れる(Apple)",
  "「読み込み中」のような、あいまいな説明は避ける(Apple)。何も情報のない静的な表示や「二度押ししないで」の注意書きも効果が薄い(NN group)",
  "支援技術には、確定なら今の値を伝え、不確定なら値を伝えない(W3C)",
];

function ProgressShapes() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>形の使い分け</h2>
      <p style={styles.psNote}>「どのくらい待つか」と「終わりが分かるか」の2つで選ぶ。待ち時間の目安はNN group。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ ...styles.psTable, minWidth: 520 }}>
          <thead><tr>{["待ち時間", "終わりが分からない(不確定)", "終わりが分かる(確定)"].map((h) => (<th key={h} style={styles.psTh}>{h}</th>))}</tr></thead>
          <tbody>{SHAPE_GRID.map((r) => (
            <tr key={r.time}>
              <td style={{ ...styles.psTd, fontWeight: 700, whiteSpace: "nowrap" }}>{r.time}</td>
              {[r.unknown, r.known].map((c, i) => (
                <td key={i} style={styles.psTd}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}><MiniShape k={c.k} /><strong>{c.t}</strong></div>
                  {c.n && <div style={{ fontSize: 11.5, color: "#565D8A", marginTop: 3 }}>{c.n}</div>}
                </td>
              ))}
            </tr>
          ))}</tbody>
        </table>
      </div>
      <p style={styles.psNote}>置く場所: <strong>円は要素の中央、バーは画面やコンテナの端</strong>(Google)。Googleは、5秒未満の短い待ちに専用のLoading indicatorも用意している(<PageLink to="/components/communication/loading">ローディング状態</PageLink>のページ)。</p>
      <div style={styles.psRules}>
        <div style={styles.psRulesTitle}>どの形にも共通すること</div>
        <ul style={{ margin: 0, paddingLeft: 18 }}>{SHAPE_RULES.map((t) => (<li key={t} style={styles.psRule}>{t}</li>))}</ul>
      </div>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "処理がどこまで進んだか、または処理中であることを示す表示";
const ABOUT = [
  { k: "目的・役割", v: "待ち時間があることと、進み具合(分かる場合)を伝え、止まっていないと分かるようにする" },
  { k: "よく使われる場面", v: "ファイルのアップロード・ダウンロード、画面の読み込み、送信中の待ち" },
  { k: "似たコンポーネント", v: <>中身の形を先に見せる読み込み表示は<PageLink to="/components/communication/loading">ローディング状態</PageLink></> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "待ち時間で見せ方を選ぶ", d: "1秒未満は出さない、2〜10秒はスピナー、10秒以上はプログレスバー(1〜2秒は明記なし。進み具合を測れないなら、10秒以上でも不確定の表示)", who: "NN group" },
  { n: 2, t: "進み具合が分かるなら確定、分からないなら不確定の表示にする", d: "", who: "Apple・Google・W3C・NN group" },
  { n: 3, t: "止まって見えないようにする", d: "", who: "Apple" },
];

export default function CommunicationProgressPage() {
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
        <SidebarNav currentPath="/components/communication/progress" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / プログレスインジケーター</span>
            <span>SPEC No. 036</span>
          </div>

          <h1 style={styles.title}>プログレスインジケーター</h1>
          <SummaryCard keyPoints={KP}
            image={<><ProgressSwatch /></>}
            imageNote={<>終わりが分かるか(確定/不確定)の区別はApple・Google・W3C・NN groupの4系列にあるが、形(バー/円)とは別の軸だ。Apple・Googleはバーと円のどちらにも確定・不確定があり、NN groupは待ち時間の長さで表示を選ぶ(下の「形の使い分け」を参照)。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <ProgressShapes />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              4系列とも<strong>確定(進み具合が分かる)/不確定(分からない)の2つを分ける</strong>点は同じだが、決めている観点が違う。Apple・Googleは見た目の指針、W3Cは今の値を支援技術に伝えるかどうか、NN groupは<strong>待ち時間の秒数で選べる目安</strong>を示す。
            </p>
            <p style={styles.synthesisText}>
              NN groupの目安は<strong>1秒未満は出さない、2〜10秒はスピナー、10秒以上はプログレスバー</strong>(1〜2秒は明記なし)。ただし秒数だけで決めず、<strong>進み具合を測れるならプログレスバー、測れないなら不確定の表示</strong>にする(Apple・Google)。秒数の目安は、Googleが5秒未満の待ちにLoading indicatorを勧めるだけで、Appleにはない。GoogleのLoading indicatorの5秒と、NN groupの「2〜10秒はスピナー」は別の系列の目安だが、時間の感覚は近い。
            </p>
            <p style={styles.synthesisText}>
              W3Cは「いつ出すか」ではなく<strong>「どう支援技術に伝えるか」</strong>を扱う。不確定な処理では、今の値を<strong>0とせず、伝えない</strong>。
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
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="推奨される使用シーン" accent="#5A9629"><UseCaseList items={s.scenarios} /></InfoBox>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                {hasRow(SOURCES, "exceptions") && <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>}
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                <InfoBox label="参照ページ(公式)">
                  <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                </InfoBox>
                {s.searchHint && (
                  <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>推奨される使用シーン</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.scenarios} /></div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                {hasRow(SOURCES, "exceptions") && (<>
                  <div style={styles.labelCell}>例外・許容ケース</div>
                  {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
                </>)}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
                <div style={styles.labelCell}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <NoData>該当なし</NoData>}</div>))}
              </div>
            </div>
          </div>


          <RelatedPages paths={["/components/communication/overview", "/components/communication/loading", "/tokens/motion"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["通知・状態表示"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  psNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 10px" },
  psTable: { width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457", marginBottom: 12 },
  psTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  psTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  psRules: { background: "#F8F9FD", borderRadius: 6, padding: "10px 14px" },
  psRulesTitle: { fontSize: 12, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  psRule: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  notApplicableChip: { display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#454C78", background: "#EEF1F7", border: "1px solid #D5DAE8", padding: "3px 8px", borderRadius: 3, alignSelf: "flex-start", letterSpacing: 0.2 },
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
  glossaryNoteBox: { marginTop: 2, marginBottom: 10 },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  secondaryLinks: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
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
