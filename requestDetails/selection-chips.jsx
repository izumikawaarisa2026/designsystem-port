import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, hasRow, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Selection / チップ(Chips)」ページ。
 *
 * Chipsは元々Material Designが体系化したパターンで、他系列には同一名称の
 * コンポーネントは存在しない。Appleには「Chip」という名前のコンポーネントはないが、
 * 発想が近いネイティブコントロール「トークンフィールド(Token Fields)」がmacOS向けに
 * 存在することを確認できたため、無理に「対応コンポーネントなし」と切り捨てず、
 * 近い概念として記載している(FABページと同じ方針: CLAUDE.mdの「無理に数値を作らない」に基づく)。
 *
 * W3C / Apple(Token Fieldsの存在確認)は検索により確認済み(2026-09、公式サイトが
 * SPAで本文の自動取得ができないため、検索結果の要約・複数の言及による確認)。
 * Nielsen Norman Groupはチップ専用の設計ガイドライン記事が見当たらないことを確認済み。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで複数の公式系資料による間接確認だったが、公式ページ本文(使用法・バリエーション・
 * ユースケース・インタラクションとスタイル・水平方向のオーバーフローの各セクション)を確認できたため、
 * その内容を反映済み(2026-09、MD3_text/chips.docx)。形状も「ピル型」ではなく「角丸長方形」が正しい
 * ことが判明したため図版を修正した。各サイズのdp数値やカラートークン名などのspecs数値は未確認。
 *
 * 2026-09 追加修正(ユーザー指摘による):
 * ・サイズの比較インフォグラフィックの帯色(赤/黄/緑)が系列識別色と衝突していた
 *   (特にGoogleの識別色#2F7D6Eと「推奨」帯の色が同一)。スライダーページと同じ配色
 *   (赤#D64545/黄#E8A317/緑#219653)に変更し、信号色と識別色の意味を分離。
 * ・チップの種類とユースケースの例文が抽象的(「選択済み」「招待者」「返信の候補」など、
 *   チップ自身の状態やカテゴリ名を説明するだけの文言)で4種類の違いが直感的にわかりにくかった
 *   ため、実際にその場面で使われそうな具体的な文言(在庫あり/田中 太郎/了解です!など)に変更し、
 *   種類ごとに視覚的な手がかり(先頭アイコンなど)も追加した。
 * ・Googleのサイズに関する記述が「サイズ」項目とアクセシビリティ項目に重複していたため、
 *   「サイズ」項目に統合し、アクセシビリティ側は数値の重複記載を削除。
 * ・Googleの「例外・許容ケース」に混在していたオーバーフロー処理(水平スクロール・
 *   リフロー方式/メニュー方式)の記述を、新設の「オーバーフロー」項目に分離。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Token Fields(macOS)",
    term: "Token field(macOS)。Chipという名前のコンポーネントはない",
    color: "#C2542A",
    position: <><NoData>「Chip」はない</NoData>(近いmacOSのトークンフィールドは、別のコンポーネントとして下の「トークンフィールド(Apple)」で扱う)</>,
    size: <NoData>数値基準なし</NoData>,
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      <><NoData>記載なし</NoData>(チップに当たるコンポーネントはない)。</>,
    exceptions: <NoData>記載なし</NoData>,
    accessibility: <NoData>記載なし</NoData>,
    useCases: [<NoData>記載なし</NoData>],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/token-fields",
    refs: [
      { label: "Token Fields(macOS。チップではない近いコンポーネント)", url: "https://developer.apple.com/design/human-interface-guidelines/token-fields" },
    ],
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="none" stroke="#C2542A" strokeWidth="1.6" />
        <rect x="6" y="6" width="30" height="12" rx="4" fill="#C2542A" />
      </svg>
    ),
    illustrationNote: "macOSの「トークンフィールド」内に浮かぶトークン(概念図)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Chips(使用法・アクセシビリティ)",
    term: "Chip(アシスト・フィルタ・インプット・サジェスチョン)",
    color: "#2F7D6E",
    position: <><Hl>4種類(アシスト/フィルタ/インプット/サジェスチョン)</Hl>。ボタンとは別の操作要素</>,
    size:
      <><Hl>見た目の高さ32dp、押せる範囲は48dp以上</Hl>。角丸8dp。</>,
    colorInfo:
      "ラベルは背景と3:1以上。",
    glossary: [
      { term: "リフロー方式", desc: "1行に収まらないときの対処の1つ。横のリストを折り返して複数行にし、下の内容を押し下げてすべてのチップを一度に見せる。" },
      { term: "メニュー方式", desc: "もう1つの対処。先頭にボタンを1つ置き、そこから開くメニューに残りの選択肢をまとめる。下の内容がずれない利点があるが、削除アイコンなど2つ目の操作が要るチップには使わない。" },
    ],
    stance:
      <><Hl>チップはボタンではない</Hl>。ボタンは一直線の手順を進め、チップは今のタスクに応じて変わる選択肢を表す。主要な操作(次へ・前へなど)はチップにせず、ボタンにする。</>,
    exceptions:
      <NoData>記載なし</NoData>,
    overflow:
      "チップセットは横スクロールにでき、1行に収まらないなら「リフロー方式」か「メニュー方式」ですべて見せる(用語は下の「メモ」)。",
    accessibility:
      "操作可能(Operable) ― 動作を実行するチップは、ボタンと同じ意味を支援技術に伝える。",
    useCases: [
      "アシスト: 予定への追加など、内容に関わる動作を実行する(詳しくは下の「チップの種類とユースケース」)",
      "フィルタ: コンテンツを絞り込むタグとして使う",
      "インプット: 入力した情報(招待者など)を表す",
      "サジェスチョン: 製品が作った提案(返信文など)を示す",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/chips/guidelines",
    refs: [
      { label: "Chips(使用法・アクセシビリティ)", url: "https://m3.material.io/components/chips/guidelines" },
      { label: "Specs(最新版)", url: "https://m3.material.io/components/chips/specs" },
    ],
    confirmedNote: "使用法・バリエーション(4種類の選び方)・ユースケース・インタラクションとスタイル・水平方向のオーバーフローの各セクションは2026-09時点で確認済み。各サイズの詳細なdp数値やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#2F7D6E" />
        <path d="M10 12l3 3 6-7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    illustrationNote: "選択済みのフィルタチップ(概念図、角丸長方形)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.1.1 / 2.5.8 / 2.5.5 / 1.4.11 / 1.4.1",
    term: "ボタン(WAI-ARIAの役割。選択式は押された状態も伝える)",
    color: "#A3821F",
    position: <>形を問わず、<Hl>ボタン/トグルボタンとしての名前・役割・状態・操作性を求める</Hl>一般の基準</>,
    size:
      <><NoData>専用の数値基準なし</NoData>。一般のターゲットサイズの基準(2.5.8・2.5.5。どちらも例外あり)がかかる。</>,
    colorInfo:
      <>ラベルの文字は<Hl>4.5:1以上</Hl>(1.4.3。Googleの3:1より厳しい)。選択状態を色だけで示さない(1.4.1)。</>,
    stance:
      "ボタンかトグルボタンとして、名前・役割・状態を支援技術に伝える(4.1.2)。",
    exceptions:
      "標準のボタンなら自動で伝わる。独自に描いたチップだけ配慮が要る。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 4.1.2・2.1.1・2.5・1.4.11。",
    useCases: [
      "チップの一覧をキーボードだけで移動・選択できるようにする",
      "選択状態をプログラムで支援技術に正しく伝える",
    ],
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    refs: [
      { kind: "sc", level: "A", label: "4.1.2 名前(name)・役割(role)・値(value)", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { kind: "sc", level: "A", label: "2.1.1 キーボード", url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html" },
      { kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" },
      { kind: "sc", level: "A", label: "1.4.1 色の用途", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
      { kind: "apg", label: "APG: Button Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/button/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="70" height="24" viewBox="0 0 70 24">
          <rect x="1" y="1" width="68" height="22" rx="6" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
        </svg>
        <span style={{ fontSize: 9, color: "#666D93" }}>ボタン/トグルボタン相当(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "該当なし",
    term: <NoData>該当なし</NoData>,
    color: "#7A4F7E",
    position: <NoData>該当なし(チップを主題にした記事はない)</NoData>,
    size: <NoData>数値基準なし</NoData>,
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      <><NoData>チップを主題にした記事はない</NoData>。コンポーネントの一覧で「トークン(チップ)」を、メールの宛先を1件ずつ分けて1回で消せるもの、詳細検索やタグで語を区切るものと紹介する。絞り込みは、探りながら選ぶ人には押してすぐ反映し、条件を決めてから見たい人には「適用」ボタンを置く。</>,
    exceptions: <NoData>記載なし</NoData>,
    accessibility: <NoData>記載なし</NoData>,
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    url: "https://www.nngroup.com/articles/front-end-style-guides/#toc-25-common-ui-components-included-in-front-end-style-guides-6",
    refs: [
      { label: "Front-End Style Guides(コンポーネント一覧の25番目「Tokens, also known as chips」の項)", url: "https://www.nngroup.com/articles/front-end-style-guides/#toc-25-common-ui-components-included-in-front-end-style-guides-6" },
      { label: "User Intent Affects Filter Design(絞り込みを押してすぐ反映するか、適用ボタンで反映するか)", url: "https://www.nngroup.com/articles/applying-filters/#toc-when-to-apply-the-filters-2" },
    ],
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#7A4F7E" />
      </svg>
    ),
    illustrationNote: "視覚デザインの規定なし(概念図)",
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

function ChipSwatch() {
  const items = [
    { label: "予定に追加", sub: "アシスト", leading: "+" },
    { label: "在庫あり", sub: "フィルタ", filled: true },
    { label: "田中 太郎", sub: "インプット", closable: true },
    { label: "了解です!", sub: "サジェスチョン", leading: "✨" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
      {items.map((it) => (
        <div key={it.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "7px 16px", borderRadius: 8, whiteSpace: "nowrap",
              background: it.filled ? "#3A4FCF" : "#FFFFFF",
              border: `1.6px solid ${it.filled ? "#3A4FCF" : "#9EA4C4"}`,
              color: it.filled ? "#FFFFFF" : "#454C78",
              fontSize: 12.5, fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
            }}
          >
            {it.filled && (
              <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
                <path d="M2 6.2l2.6 2.6L10 3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {it.leading && !it.filled && <span style={{ fontSize: 11, opacity: 0.75 }}>{it.leading}</span>}
            {it.label}
            {it.closable && <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 1 }}>✕</span>}
          </div>
          <span style={{ fontSize: 9.5, color: "#666D93" }}>{it.sub}</span>
        </div>
      ))}
    </div>
  );
}

/* チップの種類とユースケース(2026-11-28 ⑩本人最終レビューNo.027で詳しくした。M3 Chips ― Guidelinesを取得して確認) */
const CHIP_TYPES = [
  {
    name: "アシストチップ",
    purpose: "内容に関係する操作を、その場で実行する(アシスタントに頼んだように)",
    timing: "押すとすぐ実行する。必要ならダイアログや全画面に変わる",
    state: "選択状態は持たない。実行後は文言で結果を示す(「追加」→「追加済み」)。進み具合も表示できる",
    remove: "―",
    place: "主な内容の下(カードの下や画面の下部)。動詞で始める",
    example: "メール本文の日時の下の「予定に追加」",
  },
  {
    name: "フィルタチップ",
    purpose: "一覧や検索結果を絞り込む。チェックボックスやセグメントボタンの代わりになる",
    timing: "押すと選択・解除が切り替わる(反映のタイミングは、下の注を参照)",
    state: "選択中は先頭にチェックマークが付く。複数選べるのが基本で、1つだけ選ぶ設定もできる(1つの画面で混ぜない)",
    remove: "もう一度押して解除。広い画面では末尾の✕で外したり、メニューを開いたりできる",
    place: "検索欄の下。多いときはサイドシートにまとめる。2行を超えるなら横スクロール。含めるものを名詞で書く(「画像を除く」のような否定は避ける)",
    example: "商品一覧の「在庫あり」「送料無料」",
  },
  {
    name: "インプットチップ",
    purpose: "人が入力した情報を、1つずつのまとまりにして見せる",
    timing: "入力した文字が確定すると、チップに変わる",
    state: "選択状態は持たない。押すと編集でき、編集中は文字に戻る",
    remove: "末尾の✕(必須)で外す。並べ替えや、別の欄への移動もできる",
    place: "入力欄の中のカーソルの位置、縦のリスト、横にスクロールする列",
    example: "メールの宛先欄の「田中 太郎」",
  },
  {
    name: "サジェスチョンチップ",
    purpose: "製品が出した候補で、したいことを絞り込む手助けをする",
    timing: "押すと、その内容が入力・送信されたり、検索が始まったりする",
    state: "選択状態は持たない",
    remove: "―",
    place: "横に1列に並べ、あふれたら折り返す(1行の欄なら横スクロール)。名詞か短い句で",
    example: "チャットの返信候補「了解です」",
  },
];
const CHIP_COMMON = "どの種類も: 1つだけで出さず、まとまりで並べる。ラベルは20文字以内。チップどうしは8dp以上空け、押せる範囲は48dp以上。次へ・前へのような主な操作はボタンにする。";

/* 種類ごとの図(押す前 → 押した後。概念図) */
function ChipTypeFig({ i }) {
  const F = "Jost, Noto Sans JP";
  const chip = (x, y, w, label, o = {}) => (
    <g>
      <rect x={x} y={y} width={w} height="20" rx="6" fill={o.sel ? "#DDE3FA" : "#FFFFFF"} stroke={o.sel ? "#3A4FCF" : "#9EA4C4"} strokeWidth="1.2" />
      {o.check && <path d={`M${x + 7} ${y + 10.5}l2.5 2.5 5-5.5`} fill="none" stroke="#3A4FCF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
      {o.lead && <text x={x + 7} y={y + 13.5} fontSize="9" fill="#3A4FCF" fontFamily={F}>{o.lead}</text>}
      <text x={x + (o.check || o.lead ? 19 : 8)} y={y + 13.5} fontSize="8.5" fill={o.sel ? "#1E2A8A" : "#2E3457"} fontWeight={o.sel ? 700 : 400} fontFamily={F}>{label}</text>
      {o.close && <text x={x + w - 9} y={y + 13.5} fontSize="8" fill="#565D8A" textAnchor="middle" fontFamily={F}>✕</text>}
    </g>
  );
  const arrow = (<g><path d="M118 32h14" stroke="#9EA4C4" strokeWidth="1.4" /><path d="M129 28l4 4-4 4" fill="none" stroke="#9EA4C4" strokeWidth="1.4" /><text x="125" y="22" fontSize="7" fill="#565D8A" textAnchor="middle" fontFamily={F}>押す</text></g>);
  const cap = (x, t) => (<text x={x} y="62" fontSize="7.5" fill="#565D8A" fontFamily={F}>{t}</text>);
  if (i === 0) return (
    <svg viewBox="0 0 250 66" width="250" height="66" role="img" aria-label="「予定に追加」を押すと、文言が「追加済み」に変わる図">
      <rect x="4" y="4" width="108" height="14" rx="2" fill="#F3F6FA" /><text x="8" y="14" fontSize="7.5" fill="#565D8A" fontFamily={F}>5月10日 14時に打ち合わせ</text>
      {chip(4, 22, 76, "予定に追加", { lead: "+" })}{cap(4, "その場の操作")}
      {arrow}
      {chip(140, 22, 76, "追加済み", { check: true })}{cap(140, "結果を文言で示す")}
    </svg>
  );
  if (i === 1) return (
    <svg viewBox="0 0 250 66" width="250" height="66" role="img" aria-label="「在庫あり」を押すと選択中になり、先頭にチェックマークが付く図">
      {chip(4, 22, 56, "在庫あり")}{chip(62, 22, 50, "新品")}{cap(4, "未選択")}
      {arrow}
      {chip(140, 22, 68, "在庫あり", { sel: true, check: true })}{chip(210, 22, 38, "新品")}{cap(140, "選択中=チェックマーク")}
    </svg>
  );
  if (i === 2) return (
    <svg viewBox="0 0 250 66" width="250" height="66" role="img" aria-label="宛先欄に入力した名前が確定するとチップに変わり、末尾の✕で外せる図">
      <rect x="4" y="22" width="108" height="20" rx="3" fill="#FFFFFF" stroke="#C9CDE0" /><text x="9" y="35.5" fontSize="8.5" fill="#171B36" fontFamily={F}>宛先: 田中 太郎|</text>{cap(4, "入力中の文字")}
      <g><path d="M118 32h14" stroke="#9EA4C4" strokeWidth="1.4" /><path d="M129 28l4 4-4 4" fill="none" stroke="#9EA4C4" strokeWidth="1.4" /><text x="125" y="22" fontSize="7" fill="#565D8A" textAnchor="middle" fontFamily={F}>確定</text></g>
      <rect x="140" y="22" width="108" height="20" rx="3" fill="#FFFFFF" stroke="#C9CDE0" />{chip(143, 22, 68, "田中 太郎", { close: true })}{cap(140, "チップに変わり、✕で外せる")}
    </svg>
  );
  return (
    <svg viewBox="0 0 250 66" width="250" height="66" role="img" aria-label="届いたメッセージの下に返信候補のチップが並び、押すとそのまま送られる図">
      <rect x="4" y="2" width="80" height="16" rx="8" fill="#F3F6FA" /><text x="10" y="13" fontSize="7.5" fill="#2E3457" fontFamily={F}>明日10時でいい?</text>
      {chip(4, 22, 52, "了解です")}{chip(58, 22, 54, "変えたい")}{cap(4, "製品が出した候補")}
      {arrow}
      <rect x="168" y="22" width="80" height="18" rx="9" fill="#3A4FCF" /><text x="178" y="34" fontSize="8" fill="#FFFFFF" fontFamily={F}>了解です</text>{cap(140, "そのまま送られる")}
    </svg>
  );
}

function ChipTypesSection() {
  const rows = [["用途", "purpose"], ["押したとき", "timing"], ["選択中の見た目", "state"], ["外す・直す", "remove"], ["置き場所・書き方", "place"], ["例", "example"]];
  return (
    <div style={styles.typesCard}>
      <h2 style={styles.diagramTitle}>チップの種類とユースケース</h2>
      <p style={styles.diagramNote}>Googleは、<strong>操作か絞り込みか</strong>(アシスト/フィルタ)と、<strong>製品が出したものか人が入力したものか</strong>(サジェスチョン/インプット)の2つの問いで種類を選ぶとする。図は押す前と押した後の概念図。</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CHIP_TYPES.map((t, i) => (
          <div key={t.name} style={{ display: "flex", flexWrap: "wrap", gap: "10px 16px", border: "1px solid #E1E3F0", borderRadius: 6, padding: 12, background: "#FFFFFF" }}>
            <div style={{ flex: "1 0 250px", maxWidth: "100%" }}>
              <div style={styles.typeName}>{t.name}</div>
              <div style={{ background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: 8, overflowX: "auto" }}><ChipTypeFig i={i} /></div>
            </div>
            <div style={{ flex: "999 1 320px", minWidth: 0 }}>
              {rows.map(([k, f]) => (
                <div key={f} style={{ display: "grid", gridTemplateColumns: "96px minmax(0, 1fr)", gap: 8, fontSize: 12, lineHeight: 1.6, color: "#2E3457", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, color: "#454C78", fontSize: 11 }}>{k}</span><span>{t[f]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p style={{ ...styles.diagramNote, marginTop: 10 }}>{CHIP_COMMON}(Google)</p>
      <p style={styles.diagramNote}><strong>フィルタチップの反映のタイミング</strong>: Googleは決めていない。NN groupは、探りながら選ぶ人には押してすぐ結果を変え、条件をそろえてから見たい人には「適用」ボタンを置くとする。</p>
      <p style={styles.diagramNote}>なおM2からM3で、旧「アクションチップ」はアシストチップとサジェスチョンチップに分かれ、旧「チョイスチップ」はフィルタチップにまとめられた。</p>
    </div>
  );
}

/* Appleのトークンフィールド(チップとは別のコンポーネント。2026-11-28 ⑩本人最終レビューNo.027で、比較から分けてここに置いた) */
function TokenFieldSection() {
  const F = "Jost, Noto Sans JP";
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={styles.diagramTitle}>トークンフィールド(Apple)</h2>
      <p style={styles.diagramNote}>Appleにチップはないが、macOSには、入力した文字を<strong>選んで操作できる「トークン」に変えるテキストフィールド</strong>がある。チップのように選んだり外したりするコンポーネントではなく、<strong>あくまで入力欄</strong>で、Googleのインプットチップを入力欄に入れた形に近い。図は概念図。</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 16px", alignItems: "center", border: "1px solid #E1E3F0", borderRadius: 6, padding: 12 }}>
        <svg viewBox="0 0 250 46" width="250" height="46" role="img" aria-label="宛先の入力欄の中に、田中 太郎と佐藤 花子のトークンが並び、続けて文字を入力している図">
          <text x="2" y="10" fontSize="8" fill="#565D8A" fontFamily={F}>宛先:</text>
          <rect x="2" y="14" width="246" height="26" rx="4" fill="#FFFFFF" stroke="#9EA4C4" />
          <rect x="8" y="19" width="56" height="16" rx="8" fill="#DDE3FA" /><text x="15" y="30.5" fontSize="8" fill="#1E2A8A" fontFamily={F}>田中 太郎</text>
          <rect x="68" y="19" width="56" height="16" rx="8" fill="#DDE3FA" /><text x="75" y="30.5" fontSize="8" fill="#1E2A8A" fontFamily={F}>佐藤 花子</text>
          <text x="130" y="30.5" fontSize="8.5" fill="#171B36" fontFamily={F}>suz|</text>
        </svg>
        <ul style={{ flex: "999 1 300px", margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.7, color: "#2E3457" }}>
          <li>メールの宛先(To・Cc)欄のように、入力した項目を1つずつのトークンとして見せる(Apple: Token Fields)</li>
          <li>macOS向け。iOS・iPadOSの検索フィールドには、検索語を選んで編集できる「トークン」として示し、続く語の絞り込みに使う仕組みがある(Apple: Search fields。詳しくは<PageLink to="/components/text-inputs/search-field">検索フィールド</PageLink>)</li>
          <li>NN groupも、宛先を1件ずつ分けて1回で消せる「トークン(チップ)」を紹介している</li>
        </ul>
      </div>
      <div style={{ fontSize: 11, color: "#565D8A", marginTop: 6 }}><RefList refs={[
        { label: "Apple: Token Fields(macOS)", url: "https://developer.apple.com/design/human-interface-guidelines/token-fields" },
        { label: "Apple: Search fields ― Scope bars and tokens", url: "https://developer.apple.com/design/human-interface-guidelines/search-fields#Scope-bars-and-tokens" },
      ]} /></div>
    </section>
  );
}

const SIZE_BAND_COLOR = { ng: { fill: "#FBE7E7", stroke: "#D64545" }, caution: { fill: "#FDF3D9", stroke: "#E8A317" }, ok: { fill: "#E2F4E8", stroke: "#219653" } };
const SIZE_SCALE = {
  bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }],
  markers: [{ at: 24, label: "24" }, { at: 32, label: "32" }, { at: 44, label: "44" }, { at: 48, label: "48" }],
};

function SizeRangeScale() {
  const domainMax = 60;
  const w = 280;
  const x = (v) => (v / domainMax) * w;
  return (
    <svg viewBox={`0 0 ${w} 44`} style={{ width: "100%", maxWidth: 320, height: "auto", display: "block", margin: "0 auto" }}>
      {SIZE_SCALE.bands.map((b, i) => (
        <rect key={i} x={x(b.from)} y={4} width={x(b.to) - x(b.from)} height={14} fill={SIZE_BAND_COLOR[b.type].fill} stroke={SIZE_BAND_COLOR[b.type].stroke} strokeWidth="1" />
      ))}
      {SIZE_SCALE.markers.map((m, i) => (
        <g key={i}>
          <line x1={x(m.at)} y1={1} x2={x(m.at)} y2={20} stroke="#171B36" strokeWidth="1.4" />
          <circle cx={x(m.at)} cy={1} r="2" fill="#171B36" />
          <text x={x(m.at)} y={34} fontSize="9" fontFamily="IBM Plex Mono" fill="#171B36" textAnchor="middle" fontWeight="600">{m.label}</text>
        </g>
      ))}
    </svg>
  );
}

function SizeInfographic() {
  const legend = [
    { name: "Apple", color: "#C2542A", note: "数値なし(トークンフィールドとしての規定のみ)" },
    { name: "Google", color: "#2F7D6E", note: "見た目32dp・押せる範囲48dp(2段構え)" },
    { name: "W3C", color: "#A3821F", note: "24px(AA)/44px(AAA)。どちらも例外あり" },
    { name: "Nielsen Norman Group", color: "#7A4F7E", note: "数値なし(専用記事なし)" },
  ];
  return (
    <div style={styles.infographicCard}>
      <span style={styles.swatchLabel}>サイズの比較</span>
      <SizeRangeScale />
      <div style={styles.infographicLegend}>
        {legend.map((l) => (
          <div key={l.name} style={styles.infographicLegendRow}>
            <span style={{ ...styles.infographicDot, background: l.color }} />
            <span style={styles.infographicLegendName}>{l.name}</span>
            <span style={styles.infographicLegendNote}>{l.note}</span>
          </div>
        ))}
      </div>
      <p style={styles.diagramNote}>0〜60を共通スケール(dp・pxを同じ目盛りに並べた目安。単位の違いはトップの「用語メモ」を参照)とした目安だ(赤=非推奨/黄=条件付き/緑=推奨の帯は、WCAGのターゲットサイズ基準に基づく信号色)。Googleは見た目のコンテナ高さ(32dp)と押せる範囲(48dp)を分けている点が特徴的だ。Apple・Nielsen Norman Groupは数値基準を明言していないため、スケール上にマーカーはない。帯の信号色(赤/黄/緑)は、下記の凡例で使う4系列の識別色とは別の配色を使っており、両者の意味を混同しないようにしている。</p>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "短い言葉を小さな角丸の枠に入れ、選択・絞り込み・入力済みの値などを表すコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "絞り込みの条件や入力した値などを、小さくまとめて見せ、選んだり外したりできるようにする" },
  { k: "よく使われる場面", v: "検索結果の絞り込み条件、メールの宛先、タグの入力" },
  { k: "似たコンポーネント", v: <>1つの設定のオン・オフなら<PageLink to="/components/selection/toggle">トグルスイッチ</PageLink>、遷移や実行なら<PageLink to="/components/actions/button">ボタン</PageLink>(比べ方は<PageLink to="/components/selection/overview">Selectionの選び方</PageLink>)</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "チップは何に使う?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "4つの用途に使う。操作の手助け(アシスト)・絞り込み(フィルタ)・入力した値の表示(インプット)・候補の提示(サジェスチョン)。ただし次へ・前へのような主な操作はボタンにする" },
      { who: "Apple", color: "#C2542A", t: "チップに当たるコンポーネントはない。近いのは、入力した文字をまとまり(トークン)に変えるmacOSの入力欄(下の「トークンフィールド(Apple)」)" },
      { who: "NN group", color: "#7A4F7E", t: "専用の記事はない。メールの宛先を1件ずつ分けて1回で消せるようにする、詳細検索やタグに使う、という使い方の紹介にとどまる" },
    ],
    tip: "3系列に共通するのは「入力した値をまとまりで見せる」使い方だけだ。絞り込みや候補にチップを使うのはGoogleの考え方なので、iOS・macOSのアプリでは、同じ用途を標準のコンポーネント(セグメントコントロールやメニュー)で作れないかも検討する。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "入力した値をまとまりで見せる", d: "この使い方は3系列に共通する", who: "Apple・Google・NN group(AI解釈)" },
  { n: 2, t: "絞り込みや候補に使うのはGoogleの考え方", d: "iOS・macOSでは標準のコンポーネント(セグメントコントロールやメニュー)も検討", who: "AI解釈" },
  { n: 3, t: "主な操作をチップに置き換えない", d: "「次へ」などはボタンにする", who: "Google" },
];

export default function SelectionChipsPage() {
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
        <SidebarNav currentPath="/components/selection/chips" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / チップ(Chips)</span>
            <span>SPEC No. 009</span>
          </div>

          <h1 style={styles.title}>チップ(Chips)</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ(Material 3の4種類)"
            image={<><ChipSwatch /></>}
            imageNote={<>アシスト・フィルタ・インプット・サジェスチョンの4種類。角丸長方形(角の半径8dp)のコンテナが共通する。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <ChipTypesSection />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              チップを体系化しているのは<strong>Googleだけ</strong>(4種類)。Appleは近いものとしてmacOSのトークンフィールドを持ち、NN groupには専用の記事がない。Googleは<strong>「チップはボタンではない」</strong>とし、次へ・前へのような主な操作はボタンにする。
            </p>
            <p style={styles.synthesisText}>
              Googleは<strong>見た目32dp・押せる範囲48dp</strong>。ラベルの色はGoogleが3:1(M3独自の目安)、WCAGは通常の文字で<strong>4.5:1</strong>・大きな文字で3:1(1.4.3)なので、Webのチップの小さな文字では4.5:1を目安にする。複数選択は、<strong>その場で一覧を絞り込むならフィルタチップ、フォームで送信するならチェックボックス</strong>。
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
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
                <div style={styles.sourceStance}>{s.stance}</div>
                {hasRow(SOURCES, "exceptions") && <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>}
                {s.overflow && <InfoBox label="オーバーフロー" accent="#3A4FCF">{s.overflow}</InfoBox>}
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
                <div style={styles.labelCell}>オーバーフロー</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.overflow || <span style={{ color: "#666D93" }}>―(該当する記載なし)</span>}</div>))}
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

          <SizeInfographic />

          <TokenFieldSection />

          <RelatedPages paths={["/components/selection/overview", "/components/selection/checkbox", "/components/actions/button", "/components/navigation/segmented-control"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["選択・切り替え", "検索・絞り込み"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 0", lineHeight: 1.6 },
  infographicCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 40 },
  infographicLegend: { display: "flex", flexDirection: "column", gap: 8, margin: "16px 0 4px" },
  infographicLegendRow: { display: "flex", alignItems: "flex-start", gap: 8 },
  infographicDot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0, marginTop: 3 },
  infographicLegendName: { fontSize: 12, fontWeight: 700, color: "#171B36", width: 130, flexShrink: 0 },
  infographicLegendNote: { fontSize: 11.5, color: "#454C78", lineHeight: 1.5 },
  typesCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 22 },
  typesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 4 },
  typeItem: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 12px" },
  typeIllustration: { marginBottom: 10 },
  typeName: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  typeDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10 },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
