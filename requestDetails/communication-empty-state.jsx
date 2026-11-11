import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, GoodBad } from "./page-parts";

/**
 * コンポーネントレイヤー「Communication / 空状態」ページ。
 * 2026-11 ③本人レビューNo.062で、読み込み中の内容は「ローディング状態」ページ(communication-loading.jsx)に分けた。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Writing(空の画面の文言)",
    term: <NoData>専用の部品なし(Writingで空の画面の文言を扱う)</NoData>,
    color: "#C2542A",
    noDedicatedComponent: true,
    position: "「空状態」という単独のコンポーネントはなく、文章の書き方(Writing)のページで空の画面の文言に触れている",
    size: <NoData>数値基準なし</NoData>,
    stance:
      "完了済みのToDoリストや空のブックマークフォルダのような空の画面を、歓迎の気持ちを伝えたりアプリの使い方を伝えたりする機会にでき、次にできる操作を案内し、可能ならそのためのボタンやリンクを置くよう勧めている。",
    exceptions:
      "空状態は基本的に一時的なものなので、消えてしまう可能性のある重要な情報をそこに置くべきではないとしている。なお、Tab barsのページは、機能が一時的に使えないときもタブを消したり無効にしたりしないよう求めている。",
    scenarios: [
      "ToDoリストや保存済みアイテムが1件もない画面で、次にできる操作を案内したい時",
    ],
    accessibility: <span><NoData>記載なし。</NoData>Writingのページは、誰にでも伝わるように、平易な言葉でアクセシビリティとローカライズを意識して書くよう勧めている。</span>,
    useCases: [
      "空の画面では次にできる操作を案内し、可能ならそのボタンやリンクを置く",
      "消えてしまう可能性のある重要な情報は空状態に置かない",
    ],
    searchHint: "empty state",
    url: "https://developer.apple.com/design/human-interface-guidelines/writing",
    refs: [
      { label: "Writing(空の画面の文言)", url: "https://developer.apple.com/design/human-interface-guidelines/writing" },
    ],
    confirmedNote: "HIGのページデータ(WritingのJSON)を直接取得して本文を確認(2026-10)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ width: 40, height: 28, borderRadius: 4, border: "1.4px dashed #C2542A" }} />
        <span style={{ fontSize: 8, color: "#C2542A" }}>空の画面</span>
      </div>
    ),
    illustrationNote: "空の画面に、次にできる操作を添える(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 1 ― Empty states(参考。現行M3には該当なし)",
    term: "Empty state(Material Design 1のパターン)",
    color: "#2F7D6E",
    noDedicatedComponent: true,
    position: "現行M3の一覧には「空状態」の正式なコンポーネント・パターンはなく、旧世代(M1)のパターンページにのみ記述がある",
    size: <NoData>数値基準なし</NoData>,
    stance:
      "M1のパターンページでは、「リストに項目が1件もない」「検索結果が0件」といった場面での基本形が、操作のない画像+短い説明文だとし、見出しは短く分かりやすくし、ユーザーを責めるような表現は避けるべきだとしている。",
    exceptions:
      "現行M3のコンポーネント一覧には「空状態」の正式コンポーネントがないため、上記はM1時代の古いパターンページの内容で、現行M3が保証している内容ではない。",
    scenarios: [
      "検索結果が0件、リストに項目が1件もない画面の基本形を検討したい時(M1由来の参考情報)",
    ],
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "空状態の文言は責めるような表現を避け、次の行動を促す(M1由来の参考情報)",
      "現行M3に空状態の正式な一次情報がないことを踏まえ、実装時は自社の判断で設計する",
    ],
    searchHint: "",
    url: "https://m1.material.io/patterns/empty-states.html",
    refs: [
      { label: "Empty states(参考。現行M3には該当なし)", url: "https://m1.material.io/patterns/empty-states.html" },
    ],
    confirmedNote: "M3の部品の一覧(m3.material.ioのサイトマップ)に「空状態」はない(2026-11に確認)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ width: 40, height: 28, borderRadius: 4, border: "1.4px dashed #2F7D6E" }} />
        <span style={{ fontSize: 8, color: "#2F7D6E" }}>空状態(M1参考)</span>
      </div>
    ),
    illustrationNote: "画像+短い説明文(M1の参考情報。概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.3 ステータスメッセージ",
    term: "status(4.1.3のステータスメッセージ)",
    color: "#A3821F",
    position: "空状態専用のロールはない。検索結果0件などの結果を、フォーカスを移さずに画面を更新して知らせる場合は、ステータスメッセージとして支援技術にも伝える(4.1.3)",
    size: <NoData>数値基準なし</NoData>,
    stance:
      "4.1.3の対象は、フォーカスを移さずに表示・更新されるステータスメッセージだ。検索や絞り込みでその場の結果だけを書き換え、件数や「見つかりませんでした」を知らせる場合は、ステータスメッセージ(role=\"status\"など)として伝える。結果のページへ移動する場合や、フォーカスを移して見せる場合は対象外で、検索結果の表示すべてにrole=\"status\"を付けるという意味ではない。",
    exceptions: <NoData>記載なし</NoData>,
    scenarios: [
      "検索や絞り込みの結果が0件だったことを、画面を見ていない利用者にも伝えたい時",
    ],
    accessibility: "堅牢(Robust) ― 4.1.3は互換性(4.1)の基準で、POUR原則のうち「堅牢」に対応する。",
    useCases: [
      "その場で結果を書き換えて件数や「見つかりませんでした」を知らせるなら、ステータスメッセージ(role=\"status\"など)で伝える(4.1.3。フォーカスを移さない場合)",
    ],
    searchHint: "status message",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
    refs: [
      { kind: "sc", level: "AA", label: "4.1.3 ステータスメッセージ", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html" },
    ],
    confirmedNote: "",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ width: 40, height: 28, borderRadius: 4, border: "1.4px dashed #A3821F" }} />
        <span style={{ fontSize: 8, color: "#A3821F" }}>0件を知らせる</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、結果を支援技術に伝える考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Designing Empty States in Complex Applications",
    term: "Empty state",
    color: "#7A4F7E",
    position: "空状態を「システムの状態を伝える」「学習の機会にする」「主なタスクへ導く」という3つの役割を持つ設計対象として位置づける(数値基準ではなく原則)",
    size: <NoData>数値基準なし</NoData>,
    stance:
      "(1)「該当期間のレコードがありません」のように状況を明示して、読み込み中なのか本当にデータがないのかの混乱を避ける、(2)「お気に入りに追加するとここに表示されます」のように操作方法を教える学習機会として使う、(3)「作成」ボタンなど次に取るべき行動への直接の導線を用意する、という3つの指針を挙げている。",
    exceptions: "3つの指針は数値基準ではなく、原則としての言及。",
    scenarios: [
      "検索結果0件やリスト未設定など、データがない理由をユーザーに明示したい時",
      "初めて使う機能の使い方を、空状態の文言を通じて教えたい時",
    ],
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、システム状態の伝達・学習支援・タスク導線という観点からの設計指針。",
    useCases: [
      "空欄を放置せず、状況を明示するメッセージを必ず入れる",
      "ユーザーを責めるトーンを避け、次の行動を案内する",
    ],
    searchHint: "empty states",
    url: "https://www.nngroup.com/articles/empty-state-interface-design/",
    refs: [
      { label: "Designing Empty States in Complex Applications", url: "https://www.nngroup.com/articles/empty-state-interface-design/" },
    ],
    confirmedNote: "記事本文を直接取得して確認しました(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ width: 40, height: 28, borderRadius: 4, border: "1.4px dashed #7A4F7E" }} />
        <span style={{ fontSize: 8, color: "#7A4F7E" }}>空状態(3つの役割)</span>
      </div>
    ),
    illustrationNote: "状況の説明+次の行動への導線(概念図・系列識別色)",
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

function EmptyStateSwatch() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 150 }}>
        <div style={{ width: 56, height: 40, borderRadius: 8, border: "1.6px dashed #C7CBE6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📭</div>
        <div style={{ fontSize: 11, color: "#2E3457", fontWeight: 600 }}>まだアイテムがない</div>
        <div style={{ fontSize: 9.5, color: "#666D93", textAlign: "center" }}>お気に入りに追加するとここに表示される</div>
        <span style={{ fontSize: 9, fontWeight: 700, color: "#3A4FCF" }}>+ 追加する</span>
        <span style={{ fontSize: 9.5, color: "#666D93" }}>空状態</span>
      </div>
    </div>
  );
}

/* No.062: 空状態の文言 ― どうあるべきか(4系列の内容をまとめたAI解釈。例文はAIの作例) */
const EMPTY_STEPS = [
  { n: "1", t: "今の状況を伝える", d: "読み込み中なのか、本当に中身がないのかを区別できるように書く。", src: "NN group(システムの状態を伝える)", ex: "「この期間の注文はありません」" },
  { n: "2", t: "なぜ空なのか・どうすれば埋まるかを教える", d: "初めての人には、使い方を伝える機会にする。歓迎の気持ちを伝えてもよい。", src: "NN group(学習の機会)・Apple(Writing)", ex: "「気になる商品のハートを押すと、ここに表示されます」" },
  { n: "3", t: "次にできることへ案内する", d: "次の行動を書き、可能ならそのためのボタンやリンクを置く。", src: "Apple(Writing)・NN group(主なタスクへの導線)", ex: "「期間を変えて探す」「商品を見る」のボタン" },
];
const EMPTY_DONTS = [
  { t: "責める・突き放す言い方", why: "見出しは短く分かりやすくし、利用者を責める表現は避ける", src: "Google(M1)・NN group", ex: "×「検索条件が正しくありません」→ ◯「条件に合う商品は見つかりませんでした」" },
  { t: "何も書かない・あいまいな一言", why: "読み込み中なのか中身がないのか分からず、不安にさせる", src: "NN group", ex: "×「データがありません」だけ" },
  { t: "大事な情報を空状態に置く", why: "空状態は一時的なもので、中身が入ると消えてしまう", src: "Apple(Writing)", ex: "×利用規約の重要な注意を空の一覧に書く" },
];
const EMPTY_SCENES = [
  { t: "初めて使うとき", ex: "まだメモはありません。右下の「+」から最初のメモを作りましょう" },
  { t: "検索・絞り込みの結果が0件", ex: "「赤いスニーカー」に合う商品は見つかりませんでした。条件を減らして探す" },
  { t: "すべて済んだとき", ex: "今日のタスクはすべて完了しました" },
];

function EmptyWriting() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>空状態の文言 ― どうあるべきか</h2>
      <p style={styles.ewNote}>4系列の内容をまとめると、空状態の文言は次の3つの順で書くと伝わりやすくなる(AI解釈。例文はAIの作例)。検索結果の件数などをその場で画面を書き換えて知らせる場合は、画面に書くだけでなく、ステータスメッセージとして支援技術にも伝える(W3C 4.1.3)。</p>
      <div style={styles.ewSteps}>
        {EMPTY_STEPS.map((x) => (
          <div key={x.n} style={styles.ewStep}>
            <span style={styles.ewNo}>{x.n}</span>
            <div style={{ minWidth: 0 }}>
              <div style={styles.ewTitle}>{x.t}</div>
              <p style={styles.ewText}>{x.d}</p>
              <div style={styles.ewEx}>例: {x.ex}</div>
              <div style={styles.ewSrc}>{x.src}</div>
            </div>
          </div>
        ))}
      </div>
      <h3 style={styles.ewSub}>避けたい書き方</h3>
      <div style={styles.ewDontGrid}>
        {EMPTY_DONTS.map((x) => (
          <div key={x.t} style={styles.ewDont}>
            <div style={styles.ewTitle}>{x.t}</div>
            <p style={styles.ewText}>{x.why}</p>
            <div style={styles.ewEx}>{x.ex}</div>
            <div style={styles.ewSrc}>{x.src}</div>
          </div>
        ))}
      </div>
      <h3 style={styles.ewSub}>場面ごとの例(AIの作例)</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {EMPTY_SCENES.map((x) => (<li key={x.t} style={styles.ewText}><strong>{x.t}</strong>: {x.ex}</li>))}
      </ul>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "表示する中身がない画面(空状態)の見せ方だ。";
const ABOUT = [
  { k: "目的・役割", v: "中身がない理由を伝え、次にできることへ案内する" },
  { k: "よく使われる場面", v: "初めて使うときの空の一覧、検索結果0件、完了済みのToDoリスト" },
  { k: "似た部品との違い", v: <>読み込み中の見せ方は<PageLink to="/components/communication/loading">ローディング状態</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "空の画面に、次の操作のボタンを置く?",
    sides: [
      { who: "Apple・NN group", color: "#C2542A", t: "置く。次にできる操作を案内し、できればそのボタンやリンクを置く(Apple)。「作成」など次の行動への直接の入り口を用意する(NN group)" },
      { who: "Google(M1)", color: "#2F7D6E", t: "基本の形は、操作のない画像と短い説明文(旧版M1のパターン。M3には空状態の決まりはない)" },
    ],
    tip: "利用者が自分で埋められる空(まだ何も作っていない一覧など)には、作成のボタンを置く。検索結果0件のように操作で埋められない空なら、説明文と、条件を変えるための案内(リンク)にとどめる。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "状況の説明と、次の行動への案内を置く", d: "", who: "Apple・Google・W3C・NN groupに共通する考え方" },
  { n: 2, t: "利用者が自分で埋められる空には、作成のボタンを置く", d: "", who: "AI解釈" },
  { n: 3, t: "検索結果0件のような空には、説明と、条件を変えるための案内を置く", d: "", who: "AI解釈" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
            title="良い例・悪い例 ― 空状態の中身"
            items={[
              { kind: "good", fig: <div style={{ width: 220, minHeight: 120, border: "1px solid #E1E3F0", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, textAlign: "center" }}><svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l3 3v15H6zM15 3v3h3M9 11h6M9 15h4" fill="none" stroke="#454C78" strokeWidth="1.6" strokeLinejoin="round" /></svg><span style={{ fontSize: 13, fontWeight: 700, color: "#171B36" }}>まだメモはありません</span><span style={{ fontSize: 11.5, color: "#454C78", lineHeight: 1.5 }}>最初のメモを作ると、ここに並びます</span><span style={{ fontSize: 12, padding: "5px 14px", borderRadius: 16, background: "#3A4FCF", color: "#FFFFFF" }}>メモを作る</span></div>, text: "何もない理由の説明と、次にできる操作のボタンがある。" },
              { kind: "bad", fig: <div style={{ width: 220, minHeight: 120, border: "1px solid #E1E3F0", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, padding: 12, textAlign: "center" }}><span style={{ fontSize: 13, color: "#454C78" }}>データがありません</span></div>, text: "「データがありません」だけで、なぜ空なのか、次に何をすればよいかが分からない。" },
            ]}
            basis="このページの「状況の説明と、次の行動への導線を置く」(Apple・Google・W3C・NN groupに共通する考え方)。文言はAIの作例。"
          />
  );
}

export default function CommunicationEmptyStatePage() {
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
        <SidebarNav currentPath="/components/communication/empty-state" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / 空状態</span>
            <span>SPEC No. 038</span>
          </div>

          <h1 style={styles.title}>空状態</h1>
          <SummaryCard keyPoints={KP}
            image={<><EmptyStateSwatch /></>}
            imageNote={<>「状況の説明+次の行動への導線」が4系列に共通する考え方。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <GoodBadFigure />

          <EmptyWriting />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>AppleにもGoogleにも、現行の「空状態」の専用コンポーネントはない</strong>。Appleは文章の書き方のページ(Writing)の中で触れ、Googleは旧世代(Material Design 1)のパターンページにだけ記述がある。
            </p>
            <p style={styles.synthesisText}>
              最も具体的なのはNielsen Norman Groupで、空状態には<strong>「今の状況を伝える」「使い方を教える」「次の行動へ案内する」の3つの役割</strong>があるとしている。AppleのWritingのページも、<strong>次にできる操作を案内し、可能ならそのボタンやリンクを置く</strong>点で同じ考え方だ。
            </p>
            <p style={styles.synthesisText}>
              W3Cには空状態の専用の決まりはないが、検索結果0件のような結果を<strong>フォーカスを移さずにその場で書き換えて知らせるなら、ステータスメッセージとして支援技術にも伝える</strong>(4.1.3)必要がある。結果のページへ移動して見せる場合は、4.1.3の対象ではない。
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
                {s.noDedicatedComponent && (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>)}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="推奨される使用シーン" accent="#5A9629"><UseCaseList items={s.scenarios} /></InfoBox>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
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
                <div style={styles.labelCell}>専用コンポーネント</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>
                    {s.noDedicatedComponent ? (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>) : (<span style={{ color: "#666D93" }}>―(この観点は対象外)</span>)}
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
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
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


          <RelatedPages paths={["/components/communication/overview", "/components/communication/loading", "/tokens/writing"]} />

          <div style={styles.tagsRow}>
            {["理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["通知・状態表示", "見つけやすさ・初めての案内"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  ewNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 12px" },
  ewSteps: { display: "flex", flexDirection: "column", gap: 8 },
  ewStep: { display: "flex", gap: 10, border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px" },
  ewNo: { width: 22, height: 22, flexShrink: 0, borderRadius: "50%", background: "#3C5A73", color: "#FFFFFF", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
  ewTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36", marginBottom: 3 },
  ewText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", margin: "0 0 4px" },
  ewEx: { fontSize: 11.5, color: "#3A4FCF", marginBottom: 2 },
  ewSrc: { fontSize: 10, color: "#666D93" },
  ewSub: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "18px 0 8px" },
  ewDontGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: 8 },
  ewDont: { border: "1px solid #F0D5D0", borderRadius: 6, padding: "10px 12px", background: "#FFFBFA" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  notApplicableChip: { display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#8A6210", background: "#FFF6E5", border: "1px solid #F0DBA6", padding: "3px 8px", borderRadius: 3, marginTop: 8, letterSpacing: 0.2 },
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
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
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
