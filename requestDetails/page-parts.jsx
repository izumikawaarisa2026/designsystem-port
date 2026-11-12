import React from "react";

/**
 * 各ページで共通に使う部品(③本人レビュー No.001 で決めたページのひな形)。
 * - SummaryCard: タイトルの下のサマリー(イメージ図・どんな部品か・目的・役割・使われる場面・似た部品との違い)
 * - RefList: 参照ページ(公式)の一覧。公式で別のページ・別のセクションに分かれている内容は、それぞれへのリンクを並べる。
 *   W3Cは、適合の要件である「達成基準(レベルA/AA/AAA)」と、実装の参考例である「APG」をバッジで見分けられるようにする
 * - Hl: 比較(カード・比較表)の中で、ページ下の「AI解釈 ― 総括」で取り上げている違い・共通点に引くマーカー
 * - NoData: 比較の中の「記載なし」「数値基準なし」「未確認」など、データがない箇所(薄いグレーの文字で示す)
 * - TagLink / TAG_LIST: ページ末尾のタグ。横断ビューの、そのタグの一覧へのリンクにする
 * - SplitSection: 「意見が分かれる点」(同じ問いに対して、系列によって答えが違う点)
 * - RelatedPages: ページ末尾の「関連するページ」(名前と1文の説明は、ビルド時に作る PAGE_INDEX から引く)
 * - PageToc: 長いページの上部に置く目次「このページの内容」(ページの見出しから自動で作る)
 * - KeyPoints: 「まず押さえる要点」。SummaryCard に keyPoints を渡すと、概要の1行とサマリーの枠の間に出る
 * - GoodBad: 良い例・悪い例の図(良い/悪いは文字のラベルでも示す)
 *
 * ビルド(build_preview.py)では、このファイルの export した名前が全ページから使えるようになる。
 * 各ページでは import { SummaryCard, RefList, SplitSection } from "./page-parts"; と書いて使う。
 */

const LINK = "#3A4FCF";

/* タイトルの下のサマリー。タイトル直下に、どんな部品か(lead)の1文。その下の枠の中に、イメージ図 → 目的・役割などの表(グレーの背景)を置く。
   lead は1文の定義(静的版のページ説明にも使われる。class="dsp-lead" を目印にしている)、rows は「目的・役割」などの行 */
export function SummaryCard({ image, imageLabel, imageNote, lead, rows, keyPoints, keyPointsTitle }) {
  return (
    <>
      <p className="dsp-lead" style={partStyles.lead}>{lead}</p>
      {keyPoints && (Array.isArray(keyPoints) ? <KeyPoints items={keyPoints} title={keyPointsTitle} /> : keyPoints)}
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

/* 「まず押さえる要点」(2026-11 ⑦本人レビュー)。タイトル → 概要の1行 → この要点 → サマリー の順に置く。
   形はダークモードのページの要点と同じ(番号・見出し・1文の説明・根拠の系列)。items: [{ n, t, d, who }]。
   根拠が「AI解釈」のものは、公式の記載ではなくこのサイトの解釈 */
export function KeyPoints({ items, title }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={partStyles.h2}>{title || "まず押さえる要点"}</h2>
      <ol style={partStyles.kpList}>
        {items.map((k) => (
          <li key={k.n} style={partStyles.kpItem}>
            <span style={partStyles.kpNum}>{k.n}</span>
            <div style={{ minWidth: 0 }}>
              <div style={partStyles.kpTitle}>{k.t}</div>
              {k.d && <div style={partStyles.kpText}>{k.d}</div>}
              {k.who && <div style={partStyles.kpWho}>{k.who}</div>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー)。良い例と悪い例を横に並べ(スマホの幅では縦)、それぞれに
   どこが良い/悪いかの1文を添え、最後に根拠(系列名と基準)を置く。良い/悪いは色だけでなく文字のラベルでも示す。
   items: [{ kind: "good"|"bad", label?, fig, text }]、basis: 根拠の文、note: 注記(任意) */
export function GoodBad({ title, items, basis, note }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={partStyles.h2}>{title}</h2>
      <div style={partStyles.gbGrid}>
        {items.map((it, i) => (
          <div key={i} style={partStyles.gbCard}>
            <span style={{ ...partStyles.gbLabel, ...(it.kind === "good" ? partStyles.gbGood : partStyles.gbBad) }}>
              {it.kind === "good" ? "◯ " : "✕ "}{it.label || (it.kind === "good" ? "良い例" : "悪い例")}
            </span>
            <div style={partStyles.gbFig}>{it.fig}</div>
            <p style={partStyles.gbText}>{it.text}</p>
          </div>
        ))}
      </div>
      {basis && <p style={partStyles.gbBasis}>根拠: {basis}</p>}
      <p style={partStyles.gbBasis}>図は概念図。</p>
      {note && <p style={partStyles.gbBasis}>{note}</p>}
    </section>
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
  if (!refs || !refs.length) return <NoData>該当なし</NoData>;
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

/* 横断ビューのタグ。番号(No)は横断ビューの「12のくくり」の番号。id は横断ビュー内の位置(/cross-view#c1 など) */
export const TAG_LIST = [
  { no: 1, id: "c1", tag: "設計の原則・使い分け", icon: "◇", desc: "原則そのものや、似たコンポーネントの使い分けをまとめたページ" },
  { no: 2, id: "c2", tag: "デザインの基礎", icon: "Aa", desc: "色・文字・余白・角丸・影・動き・音など、見た目と動きの土台" },
  { no: 3, id: "c3", tag: "操作方法(タッチ・キーボード)", icon: "☝", desc: "タップ・ジェスチャー・キーボード・押せる大きさ" },
  { no: 4, id: "c4", tag: "入力・フォーム", icon: "✎", desc: "文字や値を入力し、送信するまで" },
  { no: 5, id: "c5", tag: "選択・切り替え", icon: "☑", desc: "選択肢から選ぶ・オン/オフを切り替える" },
  { no: 6, id: "c6", tag: "検索・絞り込み", icon: "⌕", desc: "探す・フィルタで絞り込む" },
  { no: 7, id: "c7", tag: "ナビゲーション", icon: "→", desc: "画面やページの間を遷移する" },
  { no: 8, id: "c8", tag: "情報の整理・一覧", icon: "≡", desc: "情報をまとめる・並べる" },
  { no: 9, id: "c9", tag: "段階的に見せる", icon: "▸", desc: "必要になったときに、詳しい情報や操作を出す" },
  { no: 10, id: "c10", tag: "見つけやすさ・初めての案内", icon: "✦", desc: "機能に気づかせる・初めての人に使い方を伝える" },
  { no: 11, id: "c11", tag: "通知・状態表示", icon: "◔", desc: "お知らせ・進み具合・空の状態などを伝える" },
  { no: 12, id: "c12", tag: "エラー・確認", icon: "!", desc: "間違いを伝える・取り消す・重要な操作を確かめる" },
];
const PRINCIPLE_IDS = { "知覚可能(POUR)": "p1", "操作可能(POUR)": "p2", "理解可能(POUR)": "p3", "堅牢(POUR)": "p4" };
export const tagAnchor = (t) => PRINCIPLE_IDS[t] || (TAG_LIST.find((c) => c.tag === t) || {}).id;

export function TagLink({ t, style }) {
  const id = tagAnchor(t);
  if (!id) return <span style={style}>{t}</span>;
  return <a href={"/cross-view#" + id} style={{ ...style, textDecoration: "none" }} title="このタグが付いたページの一覧へ">{t}</a>;
}

/* 意見が分かれる点。splits: [{ q, figure?(問い全体の図), sides: [{ who, color, t, figure? }], tip }] */
export function SplitSection({ title, splits }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={partStyles.h2}>{title || "意見が分かれる点"}</h2>
      <p style={partStyles.note}>同じ問いに対して、系列によって答えが違う点。図は概念図。</p>
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

/* サイト内の全ページの名前と1文の説明(各ページの LEAD・lead・サブタイトル)。
   ビルド時に preview-build/gen_page_index.py が、サイドバーと各ページから作り直す(手で編集しない) */
/*__PAGE_INDEX_START__*/
const PAGE_INDEX = {
 "/principles/comparison": {
  "label": "原則比較",
  "lead": "4系列がそれぞれ何本の原則を、何のために定めているかの比較"
 },
 "/principles/accessibility": {
  "label": "アクセシビリティ",
  "lead": "4系列がアクセシビリティをどう捉え、どう体系立てているかの比較"
 },
 "/tokens/overview": {
  "label": "ファウンデーションの思想比較",
  "lead": "色や文字などの基礎(ファウンデーション)として何を扱うか、その分け方の4系列比較"
 },
 "/tokens/color": {
  "label": "カラー",
  "lead": "画面の色の決め方と、文字やコンポーネントを読みやすくするための色の差(コントラスト)の基準"
 },
 "/tokens/typography": {
  "label": "タイポグラフィ",
  "lead": "文字の大きさの段階、行の間隔、文字を拡大したときの対応の決まり"
 },
 "/tokens/writing": {
  "label": "文章・UXライティング",
  "lead": "ボタン・見出し・エラーなど、画面に出る言葉の書き方の決まり"
 },
 "/tokens/icon": {
  "label": "アイコン",
  "lead": "アイコンの大きさ・線の太さなどのスタイルと、意味の伝え方の決まり"
 },
 "/tokens/layout-spacing": {
  "label": "レイアウト・スペーシング",
  "lead": "余白の刻み、画面の幅に応じたレイアウトの切り替え、要素のまとめ方の決まり"
 },
 "/tokens/shape": {
  "label": "シェイプ・コーナーラジウス",
  "lead": "コンポーネントの角の丸み(角丸)と、形の使い分けの決まり"
 },
 "/tokens/elevation": {
  "label": "エレベーション・階層表現",
  "lead": "影や半透明の素材で、要素の重なり(手前か奥か)を表す決まり"
 },
 "/tokens/dark-mode": {
  "label": "ダークモード",
  "lead": "暗い背景に明るい文字を置く配色(ダークモード)の、切り替え方と作り方の決まり"
 },
 "/tokens/adaptive": {
  "label": "アダプティブ/レスポンシブ",
  "lead": "画面の広さや向き、ウィンドウの大きさに合わせて、レイアウトを組み替える考え方"
 },
 "/components/actions/button": {
  "label": "ボタン",
  "lead": "押すとその場で処理(保存・送信・削除など)を実行するコンポーネント"
 },
 "/tokens/interaction-states": {
  "label": "インタラクション状態",
  "lead": "ホバー・フォーカス・押している最中・使えないなど、コンポーネントの状態の見せ方の決まり"
 },
 "/components/actions/fab": {
  "label": "フローティングアクションボタン",
  "lead": "画面の上に浮かべて置く、その画面でいちばん大事な操作のためのボタン"
 },
 "/components/actions/link": {
  "label": "リンク",
  "lead": "押すと別のページや同じページの別の場所へ遷移する、文字のコンポーネント(処理を実行するボタンとは役割が異なる)"
 },
 "/components/selection/overview": {
  "label": "Selectionの選び方",
  "lead": "値や項目を選ぶコンポーネントを、利用者が今何をしたいかから選び分けるためのページ"
 },
 "/components/selection/checkbox": {
  "label": "チェックボックス",
  "lead": "四角い枠のチェックマークで、項目を選んでいるかどうかを示すコンポーネント"
 },
 "/components/selection/radio": {
  "label": "ラジオボタン",
  "lead": "丸いボタンを並べ、選択肢の中から1つだけを選ばせるコンポーネント"
 },
 "/components/selection/toggle": {
  "label": "トグルスイッチ",
  "lead": "押すとオンとオフがすぐに切り替わる、スイッチの形のコンポーネント"
 },
 "/components/selection/slider": {
  "label": "スライダー",
  "lead": "つまみを横に動かして、範囲の中から値を選ぶコンポーネント"
 },
 "/components/selection/chips": {
  "label": "チップ(Chips)",
  "lead": "短い言葉を小さな角丸の枠に入れ、選択・絞り込み・入力済みの値などを表すコンポーネント"
 },
 "/components/selection/select": {
  "label": "セレクト(プルダウン)",
  "lead": "押すと選択肢の一覧が開き、その中から値を選ぶコンポーネント(プルダウン)"
 },
 "/components/selection/select-patterns": {
  "label": "セレクトの種類(プルダウン以外)",
  "lead": "プルダウン以外で、決まった選択肢から1つを選ぶ代表的な4つの形のまとめ"
 },
 "/components/selection/menu": {
  "label": "メニュー",
  "lead": "ボタンなどを押すと開き、その場で実行できる操作の一覧を見せるコンポーネント"
 },
 "/components/selection/date-time-picker": {
  "label": "日付/タイムピッカー",
  "lead": "カレンダーや回転する一覧などで、日付や時刻を選んで入力するコンポーネント"
 },
 "/components/text-inputs/calendar": {
  "label": "カレンダー(スケジュール/予定表)",
  "lead": "予定を日・週・月などの表で見せる画面(予定表そのものの指針は4系列ともない)"
 },
 "/components/text-inputs/text-field": {
  "label": "テキストフィールド・テキストエリア",
  "lead": "文字を入力する欄(1行のテキストフィールドと、複数行のテキストエリア)"
 },
 "/components/text-inputs/search-field": {
  "label": "検索フィールド",
  "lead": "言葉を入力して、アプリやサイトの中を検索するための入力欄"
 },
 "/components/text-inputs/validation": {
  "label": "エラー表示",
  "lead": "入力の間違いを見つけたときに、何が問題でどう直せばよいかを伝える表示"
 },
 "/components/text-inputs/input-validation": {
  "label": "バリデーション",
  "lead": "入力が正しいかを、いつ確かめるか(入力中・欄を離れたとき・送信時)の考え方"
 },
 "/components/text-inputs/wizard": {
  "label": "ウィザード(ステップ形式の入力)",
  "lead": "入力の手順をいくつかのステップに分け、1つずつ順に進めてもらう形式"
 },
 "/components/navigation/tabs": {
  "label": "タブ",
  "lead": "横に並んだ見出しを押して、同じ画面の中の内容を切り替えるコンポーネント"
 },
 "/components/navigation/segmented-control": {
  "label": "セグメントコントロール",
  "lead": "ボタンを横につなげて並べ、同じ場所の表示の仕方を切り替えるコンポーネント"
 },
 "/components/navigation/tabs-vs-segmented": {
  "label": "タブとセグメントの使い分け",
  "lead": "見た目が似ているタブとセグメントコントロールを、「選ぶと何が起きるか」で使い分けるためのページ"
 },
 "/components/navigation/nav-bar": {
  "label": "ナビゲーションバー",
  "lead": "画面の下などに常に表示し、アプリの主な場所(3〜5か所)を切り替えるバー"
 },
 "/components/navigation/app-bar": {
  "label": "アプリバー",
  "lead": "画面の上部に置き、画面の名前・戻る操作・関連する操作をまとめるバー"
 },
 "/components/containment/drawer": {
  "label": "ドロワー/サイドナビ",
  "lead": "画面の横にアプリの行き先の一覧を出すナビゲーション(スマホで一時的に開くナビゲーションドロワーと、タブレット・PCで常に表示するナビゲーションレール/サイドバー)"
 },
 "/components/navigation/breadcrumb": {
  "label": "パンくずリスト",
  "lead": "サイトの階層の中で今いる場所を、上の階層からの道筋で示すリンクの並び"
 },
 "/components/navigation/pagination": {
  "label": "ページネーション",
  "lead": "長い一覧をページに分け、ページ番号などで遷移できるようにするコンポーネント"
 },
 "/components/containment/overview": {
  "label": "オーバーレイの使い分け",
  "lead": "今の画面の上に重ねて出すコンポーネント(オーバーレイ)を並べ、どれを使うかを比べるページ"
 },
 "/components/containment/dialog": {
  "label": "モーダルダイアログ",
  "lead": "画面の上に小さな枠を重ねて表示し、確認や選択を求めるコンポーネント"
 },
 "/components/containment/fullscreen-dialog": {
  "label": "フルスクリーンダイアログ",
  "lead": "画面全体を覆って開き、一連の入力や作業を終えてもらうダイアログ"
 },
 "/components/containment/side-sheet": {
  "label": "サイドシート",
  "lead": "画面の横から現れ、今の画面に関わる補助の情報や操作を見せるパネル"
 },
 "/components/containment/bottom-sheet": {
  "label": "ボトムシート",
  "lead": "画面の下からせり出し、今の画面に関わる追加の情報や操作を見せるパネル"
 },
 "/components/containment/card": {
  "label": "カード",
  "lead": "1つの話題に関わる情報と操作を、1つの枠にまとめて見せるコンポーネント"
 },
 "/components/communication/widget": {
  "label": "ウィジェット",
  "lead": "ホーム画面などに置き、アプリを開かずに情報を見たり簡単な操作をしたりできる小さな画面"
 },
 "/components/containment/list": {
  "label": "リスト",
  "lead": "同じ種類の項目を縦に並べて、一覧で見せるコンポーネント"
 },
 "/components/containment/table": {
  "label": "表(データテーブル)",
  "lead": "行と列にデータを並べ、項目どうしを比べられるようにするコンポーネント"
 },
 "/components/containment/carousel": {
  "label": "カルーセル",
  "lead": "同じ場所で、複数の項目を横に送りながら順番に見せるコンポーネント"
 },
 "/components/containment/accordion": {
  "label": "アコーディオン(表示コントロール)",
  "lead": "見出しを押すと、その下の内容を開いたり閉じたりできるコンポーネント"
 },
 "/components/communication/overview": {
  "label": "情報伝達の使い分け",
  "lead": "利用者に何かを知らせるコンポーネントを、4つの判断軸と比較表で選び分けるためのページ"
 },
 "/components/communication/snackbar": {
  "label": "スナックバー",
  "lead": "操作の結果を画面の下などに短く表示し、しばらくすると消える通知"
 },
 "/components/communication/toast": {
  "label": "トースト",
  "lead": "短い文を一時的に表示して自動で消える、操作のない通知(主にAndroidのOSの機能)"
 },
 "/components/communication/tooltip": {
  "label": "ツールチップ",
  "lead": "マウスを乗せたりフォーカスしたりしたときに、短い説明を一時的に出すコンポーネント"
 },
 "/components/communication/progress": {
  "label": "プログレスインジケーター",
  "lead": "処理がどこまで進んだか、または処理中であることを示す表示"
 },
 "/components/communication/alert": {
  "label": "ステータスメッセージ(アラート)",
  "lead": "操作の結果や今の状態(成功・情報・注意・エラー)を、利用者に知らせるメッセージ"
 },
 "/components/communication/banner": {
  "label": "バナー",
  "lead": "画面の上部などに表示し、利用者が対応するか閉じるまで残り続けるお知らせ"
 },
 "/components/communication/badge": {
  "label": "バッジ",
  "lead": "アイコンやタブの角に重ねて、新着や未読の数を知らせる小さな印"
 },
 "/components/communication/empty-state": {
  "label": "空状態",
  "lead": "表示する中身がない画面(空状態)の見せ方"
 },
 "/components/communication/loading": {
  "label": "ローディング状態",
  "lead": "中身を読み込んでいる最中の画面の見せ方"
 },
 "/tokens/motion": {
  "label": "モーション/アニメーション",
  "lead": "アニメーションの長さ、動きの緩急、動きを減らす配慮の決まり"
 },
 "/tokens/sound": {
  "label": "サウンド",
  "lead": "操作や通知に音を付けるかどうか、音の作り方、音に頼れない人への配慮の決まり"
 },
 "/tokens/input-methods": {
  "label": "入力方法・ジェスチャー",
  "lead": "タップ・スワイプなどのジェスチャーと、マウス・キーボード・ペンなどの入力手段の扱い方の決まり"
 },
 "/cross-view": {
  "label": "タグから見る",
  "lead": "各ページのタグから、同じ原則・同じ作業に関わるページを、層やカテゴリをまたいで探せる一覧"
 }
};
/*__PAGE_INDEX_END__*/

/* ページ末尾の「関連するページ」(ページ設計ルール1-8)。paths: サイト内のパスの配列。
   名前と説明は PAGE_INDEX から引くので、リンク先のページの説明を変えても自動で追従する */
export function RelatedPages({ paths }) {
  const list = (paths || []).filter((p) => PAGE_INDEX[p]);
  if (!list.length) return null;
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={partStyles.h2}>関連するページ</h2>
      <div style={partStyles.relatedGrid}>
        {list.map((p) => (
          <a key={p} href={p} style={partStyles.relatedCard}>
            <span style={partStyles.relatedName}>{PAGE_INDEX[p].label} ↗</span>
            {PAGE_INDEX[p].lead && <span style={partStyles.relatedLead}>{PAGE_INDEX[p].lead}</span>}
          </a>
        ))}
      </div>
    </section>
  );
}

/* 長いページの上部に置く、ページ内の目次。表示後にページの見出し(h2)を順に集めて作る。
   通常版はURLの # でページを切り替えるため、押したときはスクロールだけ行う(静的版では普通のページ内リンク) */
export function PageToc() {
  const ref = React.useRef(null);
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const root = ref.current && ref.current.closest(".dsp-inner");
    if (!root) return;
    const hs = Array.from(root.querySelectorAll("h2"));
    // 「A ― B」の見出しは前半だけを出す。ただし前半が短い・系列名・ほかの見出しと重なるときは全文
    const heads = hs.map((h) => h.textContent.trim().split(" ― ")[0]);
    setItems(hs.map((h, i) => {
      if (!h.id) h.id = "sec-" + (i + 1);
      const full = h.textContent.trim();
      const head = heads[i];
      const series = ["Apple", "Google", "W3C", "NN group", "Nielsen Norman Group"].includes(head);
      const dup = heads.filter((x) => x === head).length > 1;
      return { id: h.id, label: head.length >= 5 && !series && !dup ? head : full };
    }));
  }, []);
  const go = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav ref={ref} aria-label="このページの内容" style={partStyles.toc}>
      <span style={partStyles.tocLabel}>このページの内容</span>
      <ol style={partStyles.tocList}>
        {items.map((it) => (
          <li key={it.id} style={partStyles.tocItem}>
            <a href={"#" + it.id} onClick={(e) => go(e, it.id)} style={partStyles.tocLink}>{it.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

const partStyles = {
  gbGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 },
  gbCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", background: "#FFFFFF", minWidth: 0 },
  gbLabel: { display: "inline-block", fontSize: 12, fontWeight: 700, borderRadius: 3, padding: "2px 8px", marginBottom: 10 },
  gbGood: { color: "#245C30", background: "#E7F3EA", border: "1px solid #B9DBC1" },
  gbBad: { color: "#9B2F25", background: "#FBEAE8", border: "1px solid #EDBDB7" },
  gbFig: { border: "1px dashed #C7CBE6", borderRadius: 4, padding: "14px 12px", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, minHeight: 90 },
  gbText: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 0" },
  gbBasis: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: "10px 0 0" },
  kpList: { listStyle: "none", margin: 0, padding: "14px 16px", border: "1px solid #E1E3F0", borderRadius: 6, display: "flex", flexDirection: "column", gap: 10 },
  kpItem: { display: "flex", gap: 10, alignItems: "flex-start" },
  kpNum: { flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "#3A4FCF", color: "#FFFFFF", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 },
  kpTitle: { fontSize: 13, fontWeight: 700, color: "#171B36" },
  kpText: { fontSize: 12, lineHeight: 1.6, color: "#2E3457" },
  kpWho: { fontSize: 11, lineHeight: 1.5, color: "#666D93" },
  relatedGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 },
  relatedCard: { display: "flex", flexDirection: "column", gap: 4, textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", color: "inherit" },
  relatedName: { fontSize: 13.5, fontWeight: 700, color: LINK },
  relatedLead: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78" },
  toc: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 16px", marginBottom: 32 },
  tocLabel: { display: "block", fontSize: 11.5, fontWeight: 700, color: "#454C78", marginBottom: 6 },
  tocList: { margin: 0, padding: "0 0 0 20px", columns: "2 220px", columnGap: 24 },
  tocItem: { fontSize: 12.5, lineHeight: 1.8, color: "#454C78", breakInside: "avoid" },
  tocLink: { color: LINK, textDecoration: "none" },
  summary: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "18px 20px 20px", marginBottom: 40 },
  summaryImage: { textAlign: "center", marginBottom: 18 },
  summaryImageLabel: { display: "block", fontSize: 11.5, fontWeight: 700, color: "#454C78", textAlign: "left", marginBottom: 18 },
  summaryImageNote: { fontSize: 11, color: "#666D93", margin: "16px 0 0", lineHeight: 1.6 },
  lead: { fontSize: 14, fontWeight: 500, color: "#2E3457", margin: "0 0 28px", lineHeight: 1.7 },
  aboutList: { margin: 0, padding: "6px 16px", background: "#F3F6FA", borderRadius: 4 },
  aboutRow: { display: "flex", flexWrap: "wrap", gap: "2px 14px", padding: "8px 0" },
  aboutKey: { flex: "0 0 112px", fontSize: 12, fontWeight: 700, color: "#454C78", margin: 0 },
  aboutVal: { flex: "1 1 260px", fontSize: 12.5, lineHeight: 1.7, color: "#2E3457", margin: 0, minWidth: 0 },
  refList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 5 },
  refItem: { fontSize: 11, lineHeight: 1.6 },
  refBadge: { display: "inline-block", fontSize: 9.5, fontWeight: 600, padding: "0 5px", marginRight: 6, borderRadius: 3, whiteSpace: "nowrap", lineHeight: 1.6, fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace" },
  refNote: { fontSize: 10, lineHeight: 1.55, color: "#666D93", margin: "6px 0 0" },
  hl: { fontWeight: 700, color: "#171B36", background: "linear-gradient(transparent 58%, #E2EFC4 58%)" },
  noData: { color: "#666D93" },
  h2: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  note: { fontSize: 11.5, color: "#666D93", margin: "0 0 10px", lineHeight: 1.6 },
  splitCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", background: "#FFFFFF" },
  splitQ: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 8 },
  splitFigure: { margin: "0 0 10px", padding: "10px 12px", background: "#F8F9FD", borderRadius: 4 },
  splitRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 },
  splitSide: { display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start", background: "#F8F9FD", borderRadius: 4, padding: "8px 10px" },
  splitWho: { fontSize: 11.5, fontWeight: 700 },
  splitText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 2 },
  splitTip: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", background: "#FAFCEE", borderLeft: "3px solid #5A9629", padding: "6px 10px", marginTop: 10, borderRadius: "0 3px 3px 0" },
};
