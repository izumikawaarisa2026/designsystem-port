import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, RefList, TagLink, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Communication / ステータスメッセージ(アラート)」ページ。
 * 2026-11 ③本人レビューNo.060で、「アラート/バナー」ページを2つに分けて作った。画面に残り続けるお知らせの部品は
 * 「バナー」ページ(communication-banner.jsx)。このページは、成功・情報・注意・エラーといった状態の知らせ方を比べる。
 * 一次情報: Apple HIG Feedback(ページデータのJSON)、M3の色の役割(MDC AndroidのColor.md)、WCAG 4.1.3のUnderstanding、
 * NN group「Indicators, Validations, and Notifications」(いずれも本文を直接取得して確認、2026-11)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Feedback",
    term: "Feedback(フィードバック)。重大なものはAlerts",
    color: "#C2542A",
    position: "状態の知らせを「フィードバック」として扱い、伝える情報の重さに合わせて伝え方を選ぶ",
    statuses: <span>フィードバックが伝えるものとして、<Hl>今の状態・重要な作業の成功や失敗・悪い結果になりうる操作への警告・間違いを直す機会</Hl>の4つを挙げている。</span>,
    delivery: <span>情報の重さと伝え方を合わせるとしている。<Hl>状態の知らせは、対象の近くに受け身の形で置き</Hl>、必要なときに見られるようにする(例: iOSのメールは、未読の数をツールバーに出す)。一方、データを失うおそれのある警告は、作業を止めて伝える(アラート)。</span>,
    colorIcon: <span><Hl>色・文字・音・触覚など複数の方法で伝える</Hl>ことで、消音中や画面を見ていないとき、VoiceOverを使っているときでも受け取れるようにするとしている。</span>,
    wording: "コマンドを実行できないときは、そのことと理由を伝えるとしている(例: 地図で出発地と目的地が同じとき、経路を出せないと伝える)。",
    avoid: <span><Hl>アラートを多用しない</Hl>(使いすぎると効果が薄れる)。予想どおりのデータ損失(ゴミ箱に入れるなど)では警告しない。<Hl>成功の確認は、十分に重要な作業だけにする</Hl>(人は成功を前提にしているため、知りたいのは失敗したときだけ)。</span>,
    accessibility: "知覚可能(Perceivable) ― 色・文字・音・触覚を組み合わせて、誰にでも届くようにするという点は、知覚可能に関わる。",
    useCases: [
      "状態の知らせは、対象の近くに目立ちすぎない形で置く",
      "予期しない、取り返しのつかないデータ損失になる操作だけ、作業を止めて警告する",
      "Apple Payの支払いのような重要な作業は、完了を確認できるようにする",
    ],
    searchHint: "status feedback",
    refs: [
      { label: "Feedback", url: "https://developer.apple.com/design/human-interface-guidelines/feedback" },
      { label: "Feedback ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/feedback#Best-practices" },
      { label: "Alerts(作業を止めて伝える場合)", url: "https://developer.apple.com/design/human-interface-guidelines/alerts" },
    ],
    illustration: () => <StatusMini color="#C2542A" kinds={["info", "success", "warning", "error"]} />,
    illustrationNote: "4つのフィードバック(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Color roles(error)",
    term: "専用の名称なし(色の役割としてerrorを持つ)",
    color: "#2F7D6E",
    position: "ステータスメッセージ専用のコンポーネント・指針はない。色の役割として、エラーだけを意味のある色として持つ",
    statuses: <span><Hl>色の役割として持つのは「エラー」だけ</Hl>(error・onError・errorContainer・onErrorContainer)。成功・注意・情報に当たる色の役割は、基本の組み合わせにはない。</span>,
    delivery: <NoData>記載なし</NoData>,
    colorIcon: <span>エラーには、errorの色の役割を使う。成功などの色が必要なときは、<Hl>アプリでカスタムカラーを定義し、主となる色(primary)に色合いを寄せて調和させる</Hl>(ハーモナイズ)方法が用意されている。</span>,
    wording: <NoData>記載なし</NoData>,
    avoid: <NoData>記載なし</NoData>,
    accessibility: "知覚可能(Perceivable) ― 色の役割は、背景と文字の組み合わせでコントラストを保つことを前提にしている。",
    useCases: [
      "エラーの表示には、errorとerrorContainerの色の役割を使う",
      "成功・注意の色は、カスタムカラーとして定義し、テーマの色と調和させる",
    ],
    searchHint: "",
    refs: [
      { label: "Color roles", url: "https://m3.material.io/styles/color/roles" },
      { label: "MDC Android: Color theming ― Custom Colors", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md#custom-colors" },
      { label: "MDC Android: Color theming ― Color Harmonization", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md#using-color-harmonization" },
    ],
    illustration: () => <StatusMini color="#2F7D6E" kinds={["error"]} />,
    illustrationNote: "色の役割はエラーのみ(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.3 Status Messages(ステータスメッセージ)",
    term: "Status message(ステータスメッセージ)。WAI-ARIAでは status / alert ロール",
    color: "#A3821F",
    position: "画面の見た目は定めず、ステータスメッセージを支援技術にも伝えることを求める",
    statuses: <span>ステータスメッセージを、<Hl>操作の成功や結果・待ち状態・処理の進み具合・エラーの有無</Hl>を伝えるもので、文脈の変化(フォーカスの移動など)を伴わないもの、と定義している。</span>,
    delivery: <span>フォーカスを移さずに表示するメッセージ(「5件見つかりました」「入力が正しくありません」など)は、<Hl>role="status"などで支援技術にも伝える</Hl>(4.1.3)。新しく出た緊急の警告にはrole="alert"を使う。</span>,
    colorIcon: <span><Hl>色だけで状態を伝えない</Hl>(1.4.1)。状態を示すアイコンなどは、周りの色と3:1以上のコントラストにする(1.4.11)。</span>,
    wording: "入力の誤りを見つけたら、どの項目が誤りかを特定し、文字で説明する(3.3.1。詳しくは「エラー表示」ページ)。",
    avoid: "検索結果の一覧そのものは、ステータスメッセージではない(件数などの短い知らせが対象)。",
    accessibility: "堅牢(Robust)・知覚可能(Perceivable) ― 4.1.3は互換性(4.1)の基準で「堅牢」、色の用途(1.4.1)と非テキストのコントラスト(1.4.11)は「知覚可能」に対応する。",
    useCases: [
      "保存完了・検索の件数・入力の誤りなどの短い知らせは、role=\"status\"で読み上げられるようにする",
      "状態を色だけでなく、アイコンや文字でも示す",
    ],
    searchHint: "status message",
    refs: [
      { kind: "sc", level: "AA", label: "4.1.3 ステータスメッセージ", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html" },
      { kind: "sc", level: "A", label: "1.4.1 色の用途", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "A", label: "3.3.1 エラーの特定", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html" },
      { label: "WAI-ARIA: statusロール", url: "https://www.w3.org/TR/wai-aria-1.2/#status" },
      { label: "WAI-ARIA: alertロール", url: "https://www.w3.org/TR/wai-aria-1.2/#alert" },
    ],
    illustration: () => <StatusMini color="#A3821F" kinds={["success", "info", "error"]} />,
    illustrationNote: "成功・待ち/進み具合・エラーを支援技術にも伝える(概念図)",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Indicators, Validations, and Notifications",
    term: "Status feedback(状態のフィードバック)",
    color: "#7A4F7E",
    position: "状態の伝え方を、インジケーター・バリデーション・通知の3つに分けて使い分ける",
    statuses: <span>伝え方を<Hl>インジケーター(内容やコンポーネントに付ける印)・バリデーション(入力の誤り)・通知(システムの出来事)</Hl>の3つに分ける。通知は、対応が必要な「アクション必須」と、知らせるだけの「パッシブ」に分かれる。</span>,
    delivery: <span>選ぶ基準は、<Hl>情報の種類・緊急度・利用者の対応が必要か</Hl>の3つ。インジケーターは対象の近くに出す。バリデーションは誤りのある入力欄に結び付ける。アクション必須の通知は割り込んで目立たせ、パッシブな通知は控えめにする。</span>,
    colorIcon: "インジケーターは、アイコン・文字の太さや色(未読メールの太字、株価の上下の色分けなど)・大きさや動きで作れる。バリデーションでは、誤りのある欄にアイコンと色を添えると場所が分かりやすい。",
    wording: <span>バリデーションのメッセージは、問題を示すだけでなく<Hl>直し方を伝える</Hl>(「入力されていません」ではなく「住所を入力してください」)。通知は利用者の操作の直後とは限らないため、<Hl>何についての知らせかが分かる文脈を添える</Hl>。</span>,
    avoid: <span><Hl>エラーを、数秒で消えるトーストで出さない</Hl>(気づかずに5分待ち続けた利用者の例)。お気に入りの保存のような頻繁な操作に、対応を求める通知を使わない。今の目的と関係のない通知は送らない。</span>,
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、「システムの状態を見えるようにする」というユーザビリティの原則(10ヒューリスティックの1つ目)に基づく設計指針。",
    useCases: [
      "情報の種類・緊急度・対応の要否で、インジケーター・バリデーション・通知を選ぶ",
      "入力の誤りは、その欄の近くに、直し方と一緒に出す",
      "通知には、何についての知らせかが分かる文脈を添える",
    ],
    searchHint: "Communicating System Status",
    refs: [
      { label: "Indicators, Validations, and Notifications", url: "https://www.nngroup.com/articles/indicators-validations-notifications/" },
    ],
    illustration: () => <StatusMini color="#7A4F7E" kinds={["info", "error", "warning"]} />,
    illustrationNote: "インジケーター・バリデーション・通知(概念図・系列識別色)",
  },
];

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
      <span style={styles.glossaryNoteLabel}>メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}


/* 状態の小さな見本(系列の図・ステータス別の表で使う) */
const STATUS_LOOK = {
  success: { label: "成功", mark: "✓", color: "#2F7D3B", bg: "#EAF7EC" },
  info: { label: "情報", mark: "i", color: "#2F6FED", bg: "#EAF1FE" },
  warning: { label: "注意", mark: "!", color: "#A3681A", bg: "#FFF6E5" },
  error: { label: "エラー", mark: "×", color: "#C23B3B", bg: "#FDEAEA" },
};

function StatusMini({ color, kinds }) {
  return (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
      {kinds.map((k) => (
        <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 9, color, border: `1px solid ${color}`, borderRadius: 3, padding: "1px 5px" }}>
          <span style={{ fontWeight: 700 }}>{STATUS_LOOK[k].mark}</span>{STATUS_LOOK[k].label}
        </span>
      ))}
    </div>
  );
}

/* サマリーのイメージ図: 4種類のステータスメッセージ */
function StatusSwatch() {
  const ex = { success: "変更を保存しました", info: "新しいバージョンがあります", warning: "空き容量が残りわずかです", error: "保存できませんでした。もう一度お試しください" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 320, margin: "0 auto" }}>
      {Object.keys(STATUS_LOOK).map((k) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, background: STATUS_LOOK[k].bg, borderLeft: `3px solid ${STATUS_LOOK[k].color}`, borderRadius: 4, padding: "6px 10px", textAlign: "left" }}>
          <span style={{ width: 16, height: 16, borderRadius: "50%", background: STATUS_LOOK[k].color, color: "#FFFFFF", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{STATUS_LOOK[k].mark}</span>
          <span style={{ fontSize: 11.5, color: "#2E3457" }}><strong style={{ color: STATUS_LOOK[k].color, marginRight: 6 }}>{STATUS_LOOK[k].label}</strong>{ex[k]}</span>
        </div>
      ))}
    </div>
  );
}

/* ステータス別のまとめ(4系列の内容を合わせたAI解釈) */
const STATUS_ROWS = [
  { k: "success", what: "操作や作業が正しく終わった(W3Cの定義では「操作の成功や結果」)", how: "重要な作業だけ、完了を知らせる(Apple)。作業を止めず、操作した場所の近くに出す", words: "何が終わったかを短く書く(例: 「変更を保存しました」)", look: "緑系の色とチェックのアイコン。Googleは成功の色の役割を持たないため、使うならカスタムカラーをテーマの色と調和させる", avoid: "ささいな操作のたびに出す。頻繁な操作に、対応を求める通知を使う(NN group)", exc: "ささいな作業の成功は知らせなくてよい。人は成功を前提にしていて、知りたいのは失敗したときだから(Apple)" },
  { k: "info", what: "今の状態や、知っておくとよい出来事(Appleの「今の状態」)", how: "対象の近くに、目立ちすぎない形で置く(Apple)。コンポーネントに付ける印(インジケーター)も使える(NN group)", words: "何についての知らせかが分かる文脈を添える(NN group)", look: "青や灰など、目立ちすぎない色と「i」のアイコン", avoid: "今の目的と関係のない知らせを送る(NN group)", exc: "フォーカスを移して見せるメッセージは、4.1.3のステータスメッセージには当たらない(フォーカスの移動で読み上げられるため。W3C)" },
  { k: "warning", what: "悪い結果になりうる操作や状況(Appleの「警告」)", how: "予期しない、取り返しのつかないデータ損失になる操作だけ、作業を止めて伝える(Apple)", words: "何が起きうるかと、どうすれば避けられるかを書く", look: "黄・オレンジ系の色と「!」のアイコン", avoid: "予想どおりの結果(ゴミ箱に入れるなど)にまで毎回警告する(Apple)", exc: "作業を止めて警告するのは、予期しない・取り返しのつかないデータ損失のときだけ。それ以外は作業を止めずに伝える(Apple)" },
  { k: "error", what: "操作の失敗や、入力の誤り(W3Cの「エラーの有無」、NN groupの「バリデーション」)", how: "問題のある場所の近くに出し、直すまで残す(NN group)。実行できないときは理由を伝える(Apple)", words: "何が問題で、どう直せばよいかを書く(NN group・W3C 3.3.1)", look: "Googleのerrorの色の役割(赤系)と、×などのアイコン", avoid: "数秒で消える通知(トースト)で出す(NN group)", exc: "入力の誤りは、作業を止めるダイアログではなく、誤りのある入力欄の近くに出して入力を続けられるようにする(NN group: バリデーション)" },
];

function StatusTable() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>ステータス別のまとめ</h2>
      <p style={styles.diagramNote}>成功・情報・注意・エラーの4分類は、4系列のどれかが公式に定めた分け方ではなく、広く使われている整理だ。各欄は4系列の内容を合わせたAI解釈で、出典の系列を括弧で示している。どの種類でも、色だけで伝えず(W3C 1.4.1)、画面を見ていない人や支援技術の利用者にも伝わるようにする(W3C 4.1.3・Apple)。</p>
      <div style={styles.matrixScroll}>
        <table style={styles.statusTable}>
          <thead>
            <tr>{["種類", "どんな状態か", "伝え方", "文言のポイント", "色・アイコン", "避けること", "例外・特例"].map((h) => (<th key={h} style={styles.statusTh}>{h}</th>))}</tr>
          </thead>
          <tbody>
            {STATUS_ROWS.map((r) => (
              <tr key={r.k}>
                <td style={{ ...styles.statusTd, whiteSpace: "nowrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, color: STATUS_LOOK[r.k].color }}>
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: STATUS_LOOK[r.k].color, color: "#FFFFFF", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{STATUS_LOOK[r.k].mark}</span>
                    {STATUS_LOOK[r.k].label}
                  </span>
                </td>
                <td style={styles.statusTd}>{r.what}</td>
                <td style={styles.statusTd}>{r.how}</td>
                <td style={styles.statusTd}>{r.words}</td>
                <td style={styles.statusTd}>{r.look}</td>
                <td style={styles.statusTd}>{r.avoid}</td>
                <td style={styles.statusTd}>{r.exc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* NN groupの、状態の伝え方の3つの方法 */
const NN_METHODS = [
  { t: "インジケーター", d: "内容やコンポーネントに付ける印。条件によって現れたり変わったりし、対応は求めない。対象のすぐ近くに出す", ex: "未読メールの太字、新着の印、株価の上下の矢印" },
  { t: "バリデーション", d: "利用者の入力の誤りを伝える。対応しないと消えず、誤りのある入力欄に結び付ける", ex: "「住所を入力してください」と欄の近くに表示" },
  { t: "通知", d: "利用者の操作とは関係なく起きた出来事を伝える。対応が必要な「アクション必須」と、知らせるだけの「パッシブ」がある", ex: "アクセサリーの充電が必要(アクション必須)、アップデートがある(パッシブ)" },
];

function NnMethods() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>状態の伝え方の3つの方法(Nielsen Norman Group)</h2>
      <p style={styles.diagramNote}>どれを選ぶかは、情報の種類・緊急度・利用者の対応が必要か、の3つで決める。</p>
      <div style={styles.methodGrid}>
        {NN_METHODS.map((m) => (
          <div key={m.t} style={styles.methodCard}>
            <div style={styles.methodTitle}>{m.t}</div>
            <p style={styles.methodText}>{m.d}</p>
            <p style={styles.methodEx}>例: {m.ex}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "操作の結果や今の状態(成功・情報・注意・エラー)を、利用者に知らせるメッセージ";
const ABOUT = [
  { k: "目的・役割", v: "何が起きたか、今どんな状態かを伝え、必要なら次の行動を促す" },
  { k: "よく使われる場面", v: "保存完了の知らせ、入力の誤り、通信の注意、検索結果の件数" },
  { k: "似たコンポーネントとの違い", v: <>画面に残り続けるお知らせのコンポーネントは<PageLink to="/components/communication/banner">バナー</PageLink>、短時間で消える通知は<PageLink to="/components/communication/snackbar">スナックバー</PageLink>、入力欄のエラーの見せ方は<PageLink to="/components/text-inputs/validation">エラー表示</PageLink>(比べ方は<PageLink to="/components/communication/overview">情報伝達の使い分け</PageLink>)</> },
];

const ROWS = [
  ["名称", "term"], ["位置づけ", "position"], ["扱うステータス", "statuses"], ["伝え方", "delivery"], ["色・アイコン", "colorIcon"],
  ["文言", "wording"], ["避けること", "avoid"], ["アクセシビリティ(WCAG基準)", "accessibility"],
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "情報の重さに合わせて、伝え方を変える", d: "", who: "Apple" },
  { n: 2, t: "状態の知らせは、対象の近くに控えめに置く", d: "", who: "Apple" },
  { n: 3, t: "作業を止めるのは、取り返しのつかないデータ損失のときだけ", d: "", who: "Apple" },
  { n: 4, t: "入力の誤りは、欄の近くに出す", d: "", who: "NN group" },
  { n: 5, t: "見た目だけでなく、支援技術にも伝える", d: "", who: "W3C 4.1.3" },
];

export default function CommunicationStatusMessagePage() {
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
        <SidebarNav currentPath="/components/communication/alert" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ステータスメッセージ</span>
            <span>SPEC No. 033</span>
          </div>

          <h1 style={styles.title}>ステータスメッセージ(アラート)</h1>
          <SummaryCard keyPoints={KP}
            image={<StatusSwatch />}
            imageNote="成功・情報・注意・エラーを、色だけでなくアイコンと文字でも区別する。"
            lead={LEAD}
            rows={ABOUT}
          />

          <StatusTable />
          <NnMethods />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>ステータスメッセージ専用のコンポーネントを持つ系列はない</strong>。Appleは「フィードバック」、W3Cは「ステータスメッセージ」、NN groupは「状態のフィードバック」という考え方で扱い、Googleは色の役割として<strong>エラーだけ</strong>を持っている。
            </p>
            <p style={styles.synthesisText}>
              共通しているのは、<strong>伝える情報の重さに合わせて伝え方を変える</strong>ことだ。Appleは状態の知らせを対象の近くに控えめに置き、取り返しのつかないデータ損失の警告だけ作業を止めて伝えるとし、NN groupも情報の種類・緊急度・対応の要否で伝え方を選ぶとしている。また、<strong>色だけに頼らず、支援技術にも伝える</strong>ことは、AppleとW3Cの2系列が明記している。
            </p>
            <p style={styles.synthesisText}>
              実務では、<strong>エラーは問題の場所の近くに直し方と一緒に出し、直すまで残す</strong>、<strong>成功の知らせは重要な作業だけにして控えめに出す</strong>、という使い分けが、AppleとNN groupの考え方を満たす。数秒で消える通知にエラーを出すのは避ける(NN group)。
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
                {ROWS.slice(2).map(([label, key]) => (<InfoBox key={key} label={label}>{s[key]}</InfoBox>))}
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                <InfoBox label="参照ページ(公式)">
                  <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                </InfoBox>
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                {ROWS.map(([label, key]) => (
                  <React.Fragment key={key}>
                    <div style={styles.labelCell}>{label}</div>
                    {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s[key]}</div>))}
                  </React.Fragment>
                ))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.lastRowCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <RelatedPages paths={["/components/communication/overview", "/components/communication/banner", "/components/communication/snackbar", "/components/text-inputs/validation", "/components/text-inputs/input-validation"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["通知・状態表示", "エラー・確認"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  statusTable: { width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457" },
  statusTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  statusTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  methodGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 },
  methodCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px" },
  methodTitle: { fontSize: 13, fontWeight: 700, color: "#7A4F7E", marginBottom: 6 },
  methodText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", margin: "0 0 6px" },
  methodEx: { fontSize: 11, lineHeight: 1.6, color: "#666D93", margin: 0 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
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
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  diagramNote: { fontSize: 11.5, color: "#666D93", margin: "0 0 10px", lineHeight: 1.6 },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
