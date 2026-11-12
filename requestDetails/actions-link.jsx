import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, GoodBad } from "./page-parts";

/**
 * コンポーネントレイヤー「Actions / リンク」ページ。
 * ボタン(タップ領域)と違い、リンクには「単一の数値基準」がないため、
 * データモデルの「基準値」欄は系列ごとの位置づけの説明に置き換えている。
 * 「四系列比較図」も許容レンジ図ではなく、各系列が何を求めているかの
 * 要求ポイント比較表に置き換えた(CLAUDE.mdの「都度判断してよい」方針に基づく)。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Material Design 3 は独立した「リンク」コンポーネントページが存在しないことを
 * サイトマップで確認済みだが、近接する内容(状態管理・ライティング)は未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines",
    term: "専用の部品なし。リンクの文字色(Link)をシステムカラーとして持つ",
    color: "#C2542A",
    position: "文言による目的の明確化(数値基準なし)",
    stance:
      "独立した「リンク」ページは持たず、ライティングとアクセシビリティの各ページに分けて言及している。リンクのラベルには動詞を使い、「ここをタップ」のような曖昧な文言を避け、「◯◯について詳しく見る」のように具体的な行き先や機能を示す言葉を使うべきとしている。文中のリンクに矢印を付けるかどうかは定めていない(リストの行の右端の矢印「›」は、階層の次の画面へ移る印(disclosure indicator)として、リンクとは別に定めている)。",
    exceptions:
      "色による区別についても直接のリンク基準ではなく、アクセシビリティ全般の方針として「色だけに頼らず、形やアイコンなど視覚的な手がかりを追加する」ことを求めている。数値的な例外規定はない。",
    pourDetail: "理解可能(Understandable) ― リンク単体で目的が伝わる文言を求める点は、WCAGのPOUR原則のうち「理解可能」に対応する。",
    searchHint: "avoid using \"Click here\"",
    url: "https://developer.apple.com/design/human-interface-guidelines/writing#Best-practices",
    refs: [
      { label: "Writing ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/writing#Best-practices" },
      { label: "Lists and tables(行の右端の矢印 disclosure indicator)", url: "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables" },
    ],
    colorCue: { mark: "○", note: "推奨(下線やアイコンなど視覚的な手がかりを追加)" },
    wordingCue: { mark: "○", note: "推奨(具体的な行き先を示す文言。数値基準はなし)" },
    visitedCue: { mark: "―", note: "明記なし" },
    tapArea: { mark: "○", note: "既定44×44pt・最小28×28pt(iOS/iPadOS。全インタラクティブ要素に適用される一般原則で、リンク専用の記載はない。ボタンのページと同じ)" },
    illustration: () => (
      <span style={{ color: "#2F6FED", fontWeight: 600, fontSize: 12 }}>詳しく見る</span>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― 該当なし(参考: Text button)",
    term: <NoData>該当なし</NoData>,
    color: "#2F7D6E",
    position: <NoData>該当なし(参考: Text buttonが見た目は近い)</NoData>,
    stance:
      <><NoData>該当なし</NoData>(<Hl>独立した「Link」コンポーネントはない</Hl>)。参考: Materialには2014年の初代デザイン(当時は「Flat button」)から続く「Text button」という考え方があり、ラベルのみ・枠や塗りの背景を持たない、最も優先度が低いアクションに使う表現として定義されている。ダイアログやカードの中の軽い操作など、見た目の重さを抑えたい場面で使われる。</>,
    exceptions: "「Text button」はあくまでボタン(操作)の一種であり、文中に埋め込む本来のハイパーリンクとは位置づけが異なる。この点を踏まえ、厳密な意味での「リンク」の独立ガイダンスは見当たらない、という理解が正確。",
    pourDetail: <NoData>記載なし</NoData>,
    searchHint: "text-only buttons",
    url: "https://m3.material.io/components/buttons/guidelines",
    refs: [
      { label: "参考: Buttons(Text button)", url: "https://m3.material.io/components/buttons/guidelines" },
      { label: "参考: M1 Buttons(Text buttonの由来)", url: "https://m1.material.io/components/buttons.html" },
    ],
    colorCue: { mark: "―", note: "独立した記載なし" },
    wordingCue: { mark: "―", note: "独立した記載なし" },
    visitedCue: { mark: "―", note: "独立した記載なし" },
    tapArea: { mark: "○", note: "48×48dp(Text buttonを含む全インタラクティブ要素の一般原則。リンク専用の記載はない)" },
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <span style={{ display: "inline-block", color: "#2F7D6E", fontWeight: 600, fontSize: 11.5, padding: "6px 4px" }}>詳しく見る</span>
        <span style={{ fontSize: 9, color: "#666D93" }}>参考: Text button</span>
      </div>
    ),
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.4.4 / 2.4.9 / 1.4.1 / 3.2.4",
    term: "link(WAI-ARIAのロール)/ HTMLのa要素",
    color: "#A3821F",
    position: "レベルA〜AAAにまたがる4つの達成基準",
    stance:
      <>2.4.4(レベルA)は、リンクの目的がリンクテキスト単体、またはリンクテキストと周囲の文脈から判別できることを求める。より厳格な2.4.9(レベルAAA)は、リンクテキスト単体だけで目的が分かることを求める。<Hl>1.4.1(レベルA)は、色だけをリンクの識別手段にしてはならないと規定する</Hl>。3.2.4(レベルAA)は、ページをまたいで繰り返し出てくる同じ働きの部品を、一貫して識別できるようにすることを求める。全ページ共通のナビゲーションやフッターのリンクに、ページごとに違う名前を付けないことが基本。ただし文言が完全に同じである必要はなく、5ページ目から見た「4ページ目」へのリンクを「前のページ」と呼ぶような、文脈に合わせた違いは認められる。</>,
    exceptions:
      "2.4.4は、リンクの文言だけで、または同じ文・段落などの文脈と合わせて目的が分かればよい。例外は、ページ上の情報だけでは誰にとっても目的が分からないリンク(その場合は求められない)。1.4.1は、色だけでリンクを見分けさせないこと。色だけで区別するなら、周りの文字と3:1以上の明度の差が必要になる(テクニックG183)。いちばん確実なのは下線を付けること。",
    pourDetail: "知覚可能(Perceivable)・操作可能(Operable) ― 1.4.1は「知覚可能」、2.4.4/2.4.9は「操作可能」の中のナビゲーションに関する達成基準として分類される。 3.2.4は「理解可能」の予測可能性(3.2)に分類される。",
    searchHint: "Link Purpose",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
    refs: [
      { kind: "sc", level: "A", label: "2.4.4 リンクの目的(コンテキスト内)", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html" },
      { kind: "sc", level: "AAA", label: "2.4.9 リンクの目的(リンクのみ)", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html" },
      { kind: "sc", level: "A", label: "1.4.1 色の用途", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
      { kind: "sc", level: "AA", label: "3.2.4 一貫した識別性", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html" },
    ],
    confirmedNote: "3.2.4はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    colorCue: { mark: "○", note: "必須: 色だけで見分けさせない。色だけで区別するなら、周りの文字と3:1以上の明度差が必要(G183)。いちばん確実なのは下線" },
    wordingCue: { mark: "△", note: "AA=周囲の文脈込みでOK / AAA=リンク単体で目的が分かる文言が必須" },
    visitedCue: { mark: "―", note: "直接の基準なし" },
    tapArea: { mark: "△", note: "24×24px(AA)/44×44px(AAA)。ただし文中に埋め込まれたインラインリンクは例外(ほかにも例外あり。ボタンのページを参照)" },
    illustration: () => (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#3A4FCF", fontWeight: 600, fontSize: 12, textDecoration: "underline" }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#2F7D6E", fontWeight: 700 }}>◯ 適合</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#3A4FCF", fontWeight: 600, fontSize: 12 }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#C0503F", fontWeight: 700 }}>✕ 不適合(色のみ)</span>
        </div>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Guidelines for Visualizing Links",
    term: "Link(リンク)",
    color: "#7A4F7E",
    position: "色+下線による視認性(数値基準ではなく原則としての言及)",
    stance:
      <>記事の本文は、リンクだと分かる「見た目上の手がかり」を最大化するには、<Hl>リンクテキストに色と下線の両方を付けるとよい</Hl>としている。また、訪問済みリンクと未訪問リンクは彩度の異なる同系色で区別し、未訪問側をより鮮やかにすることを推奨している。</>,
    exceptions:
      "ナビゲーションメニューなど、リンクの集まりであることが明確な領域に限り、下線を省略してもよいとする例外がある。ただし赤や緑など色覚異常の影響を受けやすい色を使う場合や、低視力ユーザーへの配慮を優先する場合は、下線を必ず残すべきとしている。2026年3月の編注では、下線は必須ではなく、周りの文字とのコントラストにホバー時・フォーカス時の手がかりを組み合わせれば1.4.1を満たせる(G183)と補足し、記事の見た目の推奨は出発点として扱うよう書いている。なお、現在のW3CのG183(WCAG 2.2版)の確認手順は「周りの文字と3:1以上」の1つだけで、ホバー/フォーカス時の手がかりは以前の版にあった条件。",
    pourDetail: "根拠となる原則 ― POURのような適合区分ではなく、この記事自体がWCAG 1.4.1(色の用途)を関連基準として明示的に引用している。",
    searchHint: "current usability guidelines for showing textual links",
    url: "https://www.nngroup.com/articles/guidelines-for-visualizing-links/",
    refs: [
      { label: "Guidelines for Visualizing Links", url: "https://www.nngroup.com/articles/guidelines-for-visualizing-links/" },
    ],
    colorCue: { mark: "○", note: "出発点は色+下線(ナビゲーション領域は下線省略可)。編注: 下線は必須ではなく、コントラスト+ホバー/フォーカスの手がかりでもよい" },
    wordingCue: { mark: "―", note: "本記事では直接扱わない" },
    visitedCue: { mark: "○", note: "推奨: 訪問済みは彩度を落とした同系色にする" },
    tapArea: { mark: "―", note: "リンク専用の数値記載なし。一般的なタップ領域の目安は約1cm四方(別記事)" },
    illustration: () => (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#3A4FCF", fontWeight: 600, fontSize: 12, textDecoration: "underline" }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#565D8A" }}>未訪問</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#8B8FB8", fontWeight: 600, fontSize: 12, textDecoration: "underline" }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#565D8A" }}>訪問済み</span>
        </div>
      </div>
    ),
  },
];

const CRITERIA_ROWS = [
  { key: "colorCue", label: "色以外の視覚的手がかり(下線など)" },
  { key: "wordingCue", label: "文言単体で目的が伝わるか" },
  { key: "visitedCue", label: "訪問済み/未訪問の色分け" },
  { key: "tapArea", label: "タップ領域" },
];

function LinkSwatch() {
  return (
    <p style={{ fontSize: 13, lineHeight: 2, color: "#2E3457", margin: 0 }}>
      テキストテキストテキスト<span style={{ color: "#3A4FCF", textDecoration: "underline" }}>リンク</span>テキストテキスト。<span style={{ color: "#6E5A8E", textDecoration: "underline" }}>リンク</span>(訪問済み)
    </p>
  );
}

/* タップ領域の図(No.022)。リンクの文字の周りの点線が押せる範囲の目安 */
const TAP_MINI = {
  hig: { w: 44, label: "44×44pt(最小28pt)" },
  material: { w: 48, label: "48×48dp" },
  wcag: { w: 24, label: "24×24px(AA)。文中は例外" },
  nn: { w: 38, label: "約1cm四方(一般の目安)" },
};
function TapMini({ k, color }) {
  const t = TAP_MINI[k];
  if (!t) return null;
  const h = t.w;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <div style={{ position: "relative", width: Math.max(h, 60), height: h, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", width: Math.max(h, 60), height: h, border: `1.4px dashed ${color}`, borderRadius: 4, background: "#FFFFFF" }} />
        <span style={{ position: "relative", fontSize: 11, color: "#2F6FED", textDecoration: "underline" }}>リンク</span>
      </div>
      <span style={{ fontSize: 9.5, color: "#666D93" }}>{t.label}</span>
    </div>
  );
}

function CriteriaLegend() {
  return <p style={styles.criteriaLegend}>記号の意味: ○=定めている、△=条件付き・例外あり、―=記載なし</p>;
}

function CriteriaMark({ cell }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 22,
          padding: "2px 8px",
          borderRadius: 10,
          background: cell.mark === "―" ? "#F3F4F9" : "#FBF0D9",
          color: cell.mark === "―" ? "#666D93" : "#7A4A1F",
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          fontSize: 12,
        }}
      >
        {cell.mark}
      </span>
      <span style={{ fontSize: 10.5, color: "#565D8A", lineHeight: 1.4, maxWidth: 220 }}>{cell.note}</span>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "押すと別のページや同じページの別の場所へ移動する、文字の部品だ。";
const ABOUT = [
  { k: "目的・役割", v: "移動先を文字で示し、押すとそこへ移動させる" },
  { k: "よく使われる場面", v: "本文中の参照先、ヘッダー・フッターのページ一覧、「詳しくはこちら」の案内" },
  { k: "似た部品との違い", v: <>その場で処理を実行する(保存・送信など)なら<PageLink to="/components/actions/button">ボタン</PageLink>。リンクは「移動」に使う</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "リンクに下線は必要?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "色と下線の両方が最も分かりやすい。ナビゲーションのようにリンクの集まりと分かる場所だけ省いてよい。2026年3月の編注で、下線は必須ではないとした" },
      { who: "W3C", color: "#A3821F", t: "下線は求めていない。ただし色だけで見分けさせる場合は、周りの文字と3:1以上の明度の差が必要(1.4.1・G183)。下線を付けるのがいちばん確実" },
      { who: "Apple", color: "#C2542A", t: "リンク専用の決まりはなく、全体の方針として、色だけに頼らず形やアイコンなどの手がかりを足すよう求めている" },
    ],
    tip: "文章の中のリンクは下線を付け、ナビゲーションやメニューのようにリンクと分かる場所だけ省く、という使い分けなら3系列のどれとも食い違わない。下線をなくす場合は、周りの文字との3:1の差を確かめる。",
  },
  {
    q: "リンクの文言だけで行き先が分かる必要がある?",
    sides: [
      { who: "Apple", color: "#C2542A", t: "「ここをタップ」のような曖昧な文言は避け、「◯◯について詳しく見る」のように行き先や機能が分かる言葉にする" },
      { who: "W3C", color: "#A3821F", t: "レベルA(2.4.4)では、同じ文や段落などの文脈と合わせて分かればよい。レベルAAA(2.4.9)では、リンクの文言だけで分かる必要がある" },
    ],
    tip: "「詳しく見る」だけでも、すぐ前の見出しや文と合わせて分かればW3CのAAは満たせる。ただし読み上げソフトでリンクだけを一覧にすると区別がつかなくなるため、Appleの勧めるように行き先を入れた文言にしておくのが安全だ。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "移動はリンク、処理の実行はボタン", d: "役割で使い分ける", who: "このサイトの整理(サマリーの「似た部品との違い」)" },
  { n: 2, t: "文章の中のリンクは色と下線", d: "両方あるのが最も分かりやすい", who: "NN group" },
  { n: 3, t: "下線を省くなら差を確かめる", d: "周りの文字と3:1以上", who: "W3C 1.4.1・G183" },
  { n: 4, t: "文言に行き先を入れる", d: "「詳しく見る」だけにしない", who: "Apple。W3C 2.4.4" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
            title="良い例・悪い例 ― リンクの見分け方"
            items={[
              { kind: "good", fig: <p style={{ fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: 0 }}>詳しくは<span style={{ color: "#3A4FCF", textDecoration: "underline" }}>料金プランの比較</span>をご覧ください。</p>, text: "本文の中のリンクに色と下線の両方があり、ひと目でリンクと分かる。" },
              { kind: "bad", fig: <p style={{ fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: 0 }}>詳しくは<span style={{ color: "#3A4FCF" }}>料金プランの比較</span>をご覧ください。</p>, text: "色だけで示し、周りの文字(#2E3457)との明るさの差が1.83:1で3:1に届かない。リンクと気づきにくい。" },
            ]}
            basis="NN group(色と下線の両方があるのが最も分かりやすい)、W3C 1.4.1・G183(色だけで見分けさせるなら、周りの文字と3:1以上)。比はこのサイトで計算した値。"
            note="下線を必ず付けるかは系列で違う(NN groupも必須とはしていない)。悪い例は、下線がないことではなく、色の差が足りないことを示している。"
          />
  );
}

export default function ActionsLinkPage() {
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
        <SidebarNav currentPath="/components/actions/link" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / リンク</span>
            <span>SPEC No. 003</span>
          </div>

          <h1 style={styles.title}>リンク</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ"
            image={<><LinkSwatch /></>}
            imageNote={<>色+下線(濃い青=未訪問)と、彩度を落とした色(訪問済み)の組み合わせ例。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <GoodBadFigure />

          <SplitSection splits={SPLITS} />



          {/* mobile: unified card stack (position + criteria + stance + exceptions + a11y + links, all in one card) */}
          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              リンクには、ボタンのような<strong>数値の基準がない</strong>。代わりにApple・WCAG・NN groupは、「色だけに頼らず見分けられるか」と「文言だけで目的が伝わるか」という2つの観点で考え方を示している。
            </p>
            <p style={styles.synthesisText}>
              Googleには独立した「Link」コンポーネントはなく、<strong>「Text button」(ラベルのみ・枠なしの低優先度ボタン)が最も近い相当物</strong>だ。厳密なハイパーリンクとは別物だが、見た目の軽さという点では近い存在と言える。
            </p>
            <p style={styles.synthesisText}>
              実務では<strong>色+下線を基本にし、ナビゲーションのように文脈で明らかな場合だけ下線を省く</strong>のが、いちばん確実な着地点だ。WCAG 1.4.1は「色だけで見分けさせない」ことを求めていて、色だけで区別するなら周りの文字と3:1以上の明度差が必要だ(G183)。Nielsen Norman Groupも2026年3月の編注で、下線は必須ではなく、コントラストにホバー時・フォーカス時の手がかりを組み合わせる方法もあるとし、記事の見た目の推奨は出発点として扱うよう補足している。
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
                <div style={{ ...styles.illustrationBox, display: "flex", gap: 18, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                  {s.illustration && s.illustration()}
                  <TapMini k={s.key} color={s.color} />
                </div>
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <p style={styles.sourceStance}>{s.stance}</p>
                <div style={styles.exceptionBox}>
                  <span style={styles.exceptionLabel}>例外・許容ケース</span>
                  <p style={styles.exceptionText}>{s.exceptions}</p>
                </div>
                <div style={styles.criteriaList}>
                  <CriteriaLegend />
                  {CRITERIA_ROWS.map((row) => (
                    <div key={row.key} style={styles.criteriaItem}>
                      <span style={styles.criteriaItemLabel}>{row.label}</span>
                      <CriteriaMark cell={s[row.key]} />
                    </div>
                  ))}
                </div>
                <div style={styles.pourBox}>
                  <span style={styles.exceptionLabel}>アクセシビリティ(WCAG基準)</span>
                  <p style={styles.exceptionText}>{s.pourDetail}</p>
                </div>
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

          {/* desktop: single unified matrix (position + criteria + stance + exceptions + a11y + links) */}
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
                <div style={styles.labelCell}>リンクのイメージ・タップ領域</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, gap: 14, flexWrap: "wrap", justifyContent: "center" }}>{s.illustration ? s.illustration() : null}<TapMini k={s.key} color={s.color} /></div>
                ))}

                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>
                ))}


                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>
                ))}

                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>
                ))}

                <div style={{ ...styles.labelCell, gridColumn: "1 / -1", background: "#FFFFFF" }}><CriteriaLegend /></div>
                {CRITERIA_ROWS.map((row) => (
                  <React.Fragment key={row.key}>
                    <div style={styles.labelCell}>{row.label}</div>
                    {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><CriteriaMark cell={s[row.key]} /></div>))}
                  </React.Fragment>
                ))}

                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>
                ))}

                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
              </div>
            </div>
            <p style={styles.diagramNote}>○=明確に求める / △=条件付き / ―=直接の言及なし</p>
          </div>

          <RelatedPages paths={["/components/actions/button", "/tokens/color", "/tokens/writing"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["ナビゲーション"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  criteriaLegend: { fontSize: 10.5, color: "#666D93", margin: "0 0 6px" },
  criteriaList: { margin: "10px 0", borderTop: "1px solid #EEF0F7" },
  criteriaItem: { display: "grid", gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)", gap: 10, padding: "8px 0", borderBottom: "1px solid #EEF0F7" },
  criteriaItemLabel: { fontSize: 11.5, fontWeight: 700, color: "#454C78", lineHeight: 1.5 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", marginBottom: 20 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", marginTop: 10, lineHeight: 1.6 },
  criteriaScroll: { overflowX: "auto" },
  criteriaGrid: { display: "grid", gridTemplateColumns: "220px repeat(4, 1fr)", minWidth: 680, border: "1px solid #E1E3F0" },
  criteriaCell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", fontSize: 12, display: "flex", alignItems: "center" },
  criteriaHeaderCell: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 12.5, background: "#F8F9FD" },
  criteriaLabelCell: { color: "#2E3457", lineHeight: 1.5 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "10px 0" },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  exceptionBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
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
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
