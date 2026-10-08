import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Containment / 表(データテーブル)」ページ。
 *
 * このページの発見: 4系列とも「表は比べるための形」という点で一致するが、決めていることの層が違う。
 * Google(M2)は行の高さ52dp・見出し行56dp・列の間32dp以上という寸法と、並べ替えの矢印・選択した行の
 * 背景色まで決める。Appleは数値を持たず、macOSの複数列の表で「見出しをクリックして並べ替え、もう一度で
 * 逆順」「列幅を変えられる」「行の色を交互に」を求める。W3Cは見た目を問わず、見出しセル(th)とデータ
 * セル(td)の関係を構造として伝えること(1.3.1)を求める。NN groupは、表が支えるべき4つの作業(探す・比べる・
 * 1行を見る/編集する・まとめて操作する)から、見出しの固定・縞模様・列の非表示などを導く。
 * 縦に並ぶ項目の一覧(1列)は「リスト」ページで扱い、このページは複数列で比べる表を扱う。
 *
 * Apple(HIG Lists and tables)はHIGのページデータ(JSON)を直接取得して確認(2026-10)。
 * GoogleはM3のサイトマップにデータテーブルのページがないため、Material Design 2のData tablesの
 * ページデータ(JSON)で本文を直接確認(2026-10)。
 * W3C(WAI Tables Tutorial・Caption & Summary、WCAG 1.3.1、APG Table Pattern・Sortable Table Example)・
 * NN group(Data Tables: Four Major User Tasks、Mobile Tables)は本文を直接取得して確認(2026-10)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Lists and tables",
    color: "#C2542A",
    position: "1列のリストと複数列の表を1つのページで扱う。数値の基準は持たず、macOSの複数列の表では、列ごとの並べ替え・列幅の変更・行の色の交互表示を求める",
    size: "数値の基準は示していません。行の文字は短くして、省略や折り返しを減らすよう求めています。1項目の文章が長いときは、一覧には題名だけを出し、選ぶと詳細画面で全文を見せる方法を勧めています。",
    colorInfo: "macOSの縦横に広い表では、行ごとに背景色を交互に変えると、列をまたいで同じ行の値を目で追いやすくなるとしています(bordered style)。iOS/iPadOSのgrouped styleは、見出し・脚注・余白でデータのまとまりを分けます。",
    stance:
      "行の形式は文字を読み流すのに向いているため、文字の情報は表かリストで見せることを勧めています。大きさのまちまちな項目や大量の画像には、表ではなくコレクションを使います。複数列の表の列見出しは名詞か短い名詞句にし、末尾に句読点を付けません。選んだときの反応も使い分け、階層をたどる表は選んだ行の強調を残して道筋を示し、選択肢の表は一瞬強調してからチェックマークを付けます(ページ本文を直接確認、2026-10)。",
    exceptions:
      "macOSでは、列見出しをクリックするとその列で並べ替え、すでに並べ替えた列の見出しをもう一度クリックすると逆順にします。列幅は利用者が変えられるようにします。階層のあるデータには、表ではなく開閉の三角が付いたアウトラインビューを使います。表の幅が狭いときは、文字の途中を省略して先頭と末尾を残すと区別しやすい場合があります。iOSでは、行の末尾に開示インジケーターがある表に五十音などの索引を付けないよう求めています(両方が右端にあり、押し間違えるため)。",
    accessibility:
      "―(このページには表専用のアクセシビリティの記載はありません)。列見出しを付けない1列の表でも、ラベルや見出しで何の一覧かを示すよう求めており、内容の理解(知覚可能)に関わります。",
    useCases: [
      "列見出しをクリックすると並べ替え、もう一度クリックで逆順にする(macOS)",
      "列幅を変えられるようにし、広い表では行の色を交互にする",
      "階層のあるデータは、表ではなくアウトラインビューで見せる",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables#macOS",
    urlSecondary: [
      { label: "Lists and tables ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables#Best-practices" },
      { label: "Lists and tables ― Content", url: "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables#Content" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-10)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 2 ― Data tables(M3には対応するページなし)",
    color: "#2F7D6E",
    position: "行と列の格子で情報を並べ、データの傾向を見つけやすくする部品。行の高さ・余白・並べ替え・選択まで寸法と見た目を決めている。M3のサイトにはページがなく、旧版M2の指針が最新",
    size: "行の高さは52dp、列見出しの行は56dp(通常の行より4dp高い)。列と列の間は32dp以上空け、各見出しの左右に16dpの余白を取ります。",
    colorInfo: "チェックボックスで行を選ぶと、行全体に背景色を付けます。画面を拡大して使う人には、チェックボックスが拡大した範囲の外に出てしまうことがあるため、色の塗りで選択をもう1つの方法で示すという理由です。デスクトップでは、ポインタを乗せた行にも背景色を付けます。",
    stance:
      "原則は3つで、意味のある順(階層・五十音など)に整理されていること、利用者が表示を変えられること、論理的な構造で分かりやすいことです。列見出しは中くらいの太さにして行の文字と区別し、列幅より長い見出しは「…」で省略して、ポインタを乗せると全文をツールチップで見せます。並べ替えている列は見出しの横に下向きか上向きの矢印で示し、見出しか矢印を押すと逆順になって矢印も反転します(Material Design 2のページデータを直接取得して確認、2026-10)。",
    exceptions:
      "並べ替えやページの切り替えの処理中は、線形のプログレスインジケーターで処理中であることを示します。表示を変える操作(フィルタチップ・ページネーションなど)は、表の直上か直下に置きます。ページネーションは表の下に置き、1ページに表示する行数をメニューで選べるようにします。セルの中に、決められた選択肢から選ぶインラインメニューを置くこともできます。",
    accessibility:
      "知覚可能(Perceivable)・操作可能(Operable) ― 選択した行の背景色は、画面拡大を使う人のための手がかりです。キーボードのTabでチェックボックスなどに移ると、フォーカスの表示が出ることも定めています。",
    useCases: [
      "見出し行56dp・行52dp・列の間32dp以上を基準にする",
      "並べ替えている列の見出しに矢印を付け、押すと逆順にする",
      "選択した行は、チェックだけでなく行全体の背景色でも示す",
    ],
    searchHint: "52dp",
    url: "https://m2.material.io/components/data-tables",
    confirmedNote: "m3.material.ioのサイトマップにデータテーブルのページはありません。Material Design 2のData tablesのページデータ(JSON)を直接取得して本文を確認済み(2026-10)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI Tables Tutorial / WCAG 1.3.1 Info and Relationships / APG Table Pattern",
    color: "#A3821F",
    position: "見た目の決まりは持たず、見出しセルとデータセルの関係を構造として支援技術に伝えることを求める",
    size: "表専用の数値基準はありません。1.4.10(リフロー)では、データ表は理解に2次元の配置が必要な部分として、横スクロールが例外として認められています(「アダプティブ/レスポンシブ」ページを参照)。",
    colorInfo: "見出しセルは<th>、データセルは<td>で書きます。行と列の両方に見出しがあるならscope=\"col\"/\"row\"で向きを示し、複数の見出しが1つのセルにかかる複雑な表はidとheaders属性で関係を明示します。表の題名は<caption>で付け、見出しのように働いて多くのスクリーンリーダーが読み上げます。",
    glossary: [
      { term: "1.3.1 Info and Relationships・レベルA", desc: "見た目で伝えている構造や関係(表の見出しとデータの関係など)を、マークアップなどでプログラムからも判別できるようにすることを求める基準。" },
      { term: "scope属性", desc: "見出しセル(th)が列の見出しか行の見出しかを示す属性。col・row・colgroup・rowgroupの値を取る。" },
      { term: "aria-sort", desc: "並べ替えている列(または行)の見出しセルに付け、昇順・降順などの並べ替えの状態を支援技術に伝える属性。" },
      { term: "Gridパターン", desc: "表の形をした、操作する部品(セルにフォーカスでき、矢印キーで移動する)を作るためのAPGのパターン。読むだけの表はTableパターンを使う。" },
    ],
    stance:
      "見た目の手がかりだけでは表は使えるものにならず、構造をマークアップすることで、スクリーンリーダーは1セルずつ読むときに対応する行と列の見出しも読み上げ、利用者は文脈を見失いません。独自のスタイルシートで見出しを目立たせたり、表をリストとして表示し直したりする人もいるため、正しい構造はその前提にもなるとしています(Tables Tutorialの本文を直接確認、2026-10)。",
    exceptions:
      "APGのTableパターンは操作する部品ではなく、セルはフォーカスできません。表の中にボタンなどの操作部品が多い場合は、1つの部品として扱えるGridパターンに替えると、Tabを押す回数を大きく減らせます。並べ替えできる表では、並べ替えている列の見出しにaria-sortを付け、見出しの文字をボタンで包みます(APGのSortable Tableの例)。並べ替えできない列と区別するアイコンを付けるなら、並べ替えの向きの矢印とは色や大きさだけでなく形でも違いを出します。表をレイアウトの目的に使わないことも求めています。",
    accessibility:
      "知覚可能(Perceivable)・堅牢(Robust) ― 見出しとデータの関係を構造で示す1.3.1は「知覚可能」、aria-sortなどで状態を支援技術に伝えることは「堅牢」に関わります。並べ替えのボタンをキーボードで操作できることは「操作可能」です。",
    useCases: [
      "見出しは<th>、データは<td>で書き、必要ならscopeで向きを示す",
      "表には<caption>で題名を付ける",
      "並べ替えできる見出しはボタンにし、並べ替えている列にaria-sortを付ける",
    ],
    searchHint: "Header cells must be marked up",
    url: "https://www.w3.org/WAI/tutorials/tables/",
    urlSecondary: [
      { label: "Tables Tutorial ― Caption & Summary", url: "https://www.w3.org/WAI/tutorials/tables/caption-summary/" },
      { label: "APG: Table Pattern(役割と属性)", url: "https://www.w3.org/WAI/ARIA/apg/patterns/table/#roles_states_properties" },
      { label: "APG: Sortable Table Example", url: "https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/" },
      { label: "1.3.1 Info and Relationships", url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html" },
    ],
    confirmedNote: "Tables Tutorial・Caption & Summary・APGのTable PatternとSortable Table Example・1.3.1のUnderstandingページの本文を直接取得して確認済み(2026-10)。ページ内検索の語はTables Tutorialのものです。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Data Tables: Four Major User Tasks / Mobile Tables",
    color: "#7A4F7E",
    position: "表は「探す・比べる・1行を見る/編集する・まとめて操作する」の4つの作業を支えるべき、という観点で設計を決める実務指針(適合基準ではない)",
    size: "数値基準はありません。表の利点として、行も列も増やしやすいことと、隣り合うデータを目や記憶を使わずに比べられることを挙げ、カードの並びより比較に向くとしています。",
    colorInfo: "大きい表では見出し行と最初の列を固定し、薄い境界線・縞模様(ゼブラ)・ポインタを乗せた行の強調で、目を横に動かしても位置を見失わないようにします。固定した見出しに控えめな影を付けると、表の上に浮いて見えて位置関係がつかみやすいとしています。",
    stance:
      "最初の列には、自動で振った番号ではなく人が読める識別名を置き、列は利用者にとっての重要度の順に、関連する列を隣り合わせに並べます。フィルタは見つけやすく速くし、絞り込み中であることをはっきり示します。列を隠す・並べ替えることも簡単にし、ドラッグ以外の方法も用意します(記事本文を直接取得して確認、2026-10)。",
    exceptions:
      "1行を編集するときは、モーダルは他の行を隠して参照できなくなるため深い編集には勧めず、表を見ながら編集できる非モーダルの横パネルを勧めています。行の中に置く操作は1〜2個までにし、それ以上は行を選んでからまとめて操作する形(全選択も用意)にします。スマートフォンでは、見出しを固定する、横スクロールが必要なら右端の列を少し切って続きがあると示す(点より矢印や切れ目の方が気づかれやすい)、最初の列を固定する、横向きへの回転を強いるのは最後の手段にする、見たい列を選ばせる、としています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、視線計測とユーザビリティテストの観察に基づく設計上の根拠です。列の並べ替えをドラッグだけにすると、見つけにくく使えない人もいるとしています。",
    useCases: [
      "最初の列は人が読める名前にし、関連する列を隣に並べる",
      "大きい表は見出し行と最初の列を固定し、縞模様や境界線で行を追いやすくする",
      "行の操作が3つ以上なら、選択してまとめて操作する形にする",
    ],
    searchHint: "Freeze header rows",
    url: "https://www.nngroup.com/articles/data-tables/#toc-main-user-tasks-in-tables-2",
    urlSecondary: [
      { label: "Mobile Tables(最初の列を固定)", url: "https://www.nngroup.com/articles/mobile-tables/#toc-stick-the-left-column-in-place-5" },
    ],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-10)。ページ内検索の語は1本目の記事(Data Tables)のものです。",
  },
];

/* 画像エリア: データテーブルの構成(概念図) */
function TableSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const cols = [{ x: 36, w: 92, h: "名前" }, { x: 128, w: 70, h: "部署" }, { x: 198, w: 64, h: "件数 ▼" }, { x: 262, w: 66, h: "更新日" }];
  const rows = [["佐藤 葵", "営業", "128", "10/02"], ["鈴木 蓮", "開発", "96", "09/28"], ["高橋 凛", "総務", "74", "10/01"], ["田中 陽", "開発", "51", "09/30"]];
  const callout = (x, y, n) => (
    <g>
      <circle cx={x} cy={y} r="7" fill="#3C5A73" />
      <text x={x} y={y + 3} fontSize="8" fill="#FFFFFF" textAnchor="middle" fontWeight="700" fontFamily={font}>{n}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 196" width="100%" style={{ maxWidth: 460, display: "block", margin: "0 auto" }} role="img" aria-label="データテーブルの構成の例">
      <rect x="8" y="8" width="320" height="150" rx="6" fill="#FFFFFF" stroke="#D5D9EC" />
      <rect x="8" y="8" width="320" height="28" rx="6" fill="#F3F6FA" />
      <rect x="8" y="30" width="320" height="6" fill="#F3F6FA" />
      {cols.map((c) => (
        <text key={c.h} x={c.x + 6} y="26" fontSize="9" fontWeight="700" fill={c.h.includes("▼") ? "#2F7D6E" : "#171B36"} fontFamily={font}>{c.h}</text>
      ))}
      {rows.map((r, i) => {
        const y = 36 + i * 24;
        const selected = i === 1;
        return (
          <g key={r[0]}>
            <rect x="8" y={y} width="320" height="24" fill={selected ? "#E3EDE9" : i % 2 === 1 ? "#FAFBFD" : "#FFFFFF"} />
            <rect x="15" y={y + 7} width="10" height="10" rx="2" fill={selected ? "#2F7D6E" : "#FFFFFF"} stroke={selected ? "#2F7D6E" : "#9EA4C4"} />
            {selected && <path d={`M17.5 ${y + 12} l2 2 l4 -4.5`} stroke="#FFFFFF" strokeWidth="1.4" fill="none" />}
            {r.map((v, j) => (
              <text key={j} x={cols[j].x + 6 + (j === 2 ? 28 : 0)} y={y + 16} fontSize="9" fill="#2E3457" textAnchor={j === 2 ? "end" : "start"} fontFamily={j >= 2 ? mono : font}>{v}</text>
            ))}
            <line x1="8" x2="328" y1={y + 24} y2={y + 24} stroke="#EEF0F7" />
          </g>
        );
      })}
      <line x1="128" x2="128" y1="8" y2="132" stroke="#EEF0F7" />
      <rect x="8" y="132" width="320" height="26" fill="#FFFFFF" />
      <text x="320" y="149" fontSize="8.5" fill="#565D8A" textAnchor="end" fontFamily={font}>1ページの行数 25 ▾   1–25 / 100   ‹ ›</text>
      {callout(340, 22, 1)}
      {callout(250, 14, 2)}
      {callout(340, 72, 3)}
      {callout(100, 14, 4)}
      {callout(340, 146, 5)}
      <text x="8" y="180" fontSize="8.5" fill="#565D8A" fontFamily={font}>① 見出し行(固定) ② 並べ替えの矢印 ③ 選択した行の背景色 ④ 識別名の列 ⑤ ページ送り</text>
    </svg>
  );
}

/* 四サイト比較図: 表の要素ごとに、何を定めているか(◯=明記/△=部分的・条件付き/―=確認した範囲で記載なし) */
const TABLE_ROWS = [
  {
    label: "列見出し",
    cells: [
      { mark: "◯", note: "名詞か短い名詞句。末尾に句読点なし" },
      { mark: "◯", note: "中くらいの太さ。長いと「…」で省略し、ツールチップで全文" },
      { mark: "◯", note: "<th>で書き、scopeで列/行の向き(1.3.1)" },
      { mark: "◯", note: "大きい表では見出し行を固定する" },
    ],
  },
  {
    label: "並べ替え",
    cells: [
      { mark: "◯", note: "見出しをクリック、もう一度で逆順(macOS)" },
      { mark: "◯", note: "見出しの横に矢印。押すと逆順・矢印も反転。処理中はプログレス" },
      { mark: "◯", note: "見出しをボタンにし、aria-sortで状態を伝える(APG)" },
      { mark: "◯", note: "並べ替え・列の非表示や並べ替えを簡単に" },
    ],
  },
  {
    label: "行の大きさ・余白",
    cells: [
      { mark: "―", note: "数値なし(行の文字は短く)" },
      { mark: "◯", note: "行52dp・見出し行56dp・列の間32dp以上" },
      { mark: "―", note: "" },
      { mark: "―", note: "" },
    ],
  },
  {
    label: "行を目で追う",
    cells: [
      { mark: "◯", note: "広い表は行の色を交互に(macOS)" },
      { mark: "△", note: "ポインタを乗せた行に背景色(デスクトップ)" },
      { mark: "―", note: "" },
      { mark: "◯", note: "薄い境界線・縞模様・乗せた行の強調" },
    ],
  },
  {
    label: "行の選択",
    cells: [
      { mark: "◯", note: "階層をたどる表は強調を残す/選択肢はチェックマーク" },
      { mark: "◯", note: "チェックボックス+行全体の背景色" },
      { mark: "△", note: "読むだけの表のセルは選べない。選ぶならGridパターン" },
      { mark: "◯", note: "選んでまとめて操作。全選択も用意" },
    ],
  },
  {
    label: "画面に収まらないとき",
    cells: [
      { mark: "△", note: "列幅を変えられる。文字の途中を省略" },
      { mark: "△", note: "長い見出しは省略+ツールチップ" },
      { mark: "◯", note: "データ表は1.4.10で横スクロールが例外として可" },
      { mark: "◯", note: "見出しと最初の列を固定。切れ目で続きを示す" },
    ],
  },
  {
    label: "構造を支援技術へ",
    cells: [
      { mark: "―", note: "" },
      { mark: "△", note: "Tabで移るとフォーカスを表示" },
      { mark: "◯", note: "th/td・scope・caption(1.3.1)" },
      { mark: "―", note: "" },
    ],
  },
];

const MARK_COLORS = { "◯": "#2E6B3A", "△": "#8A6A10", "―": "#B7BCDA" };

function RuleMatrix() {
  const names = ["Apple", "Google", "W3C", "NN group"];
  const colors = ["#C2542A", "#2F7D6E", "#A3821F", "#7A4F7E"];
  return (
    <div style={styles.ruleScroll}>
      <div style={styles.ruleGrid}>
        <div style={styles.ruleHead}>表の要素</div>
        {names.map((n, i) => (<div key={n} style={{ ...styles.ruleHead, color: colors[i] }}>{n}</div>))}
        {TABLE_ROWS.map((r) => (
          <React.Fragment key={r.label}>
            <div style={styles.ruleLabel}>{r.label}</div>
            {r.cells.map((c, i) => (
              <div key={i} style={styles.ruleCell}>
                <span style={{ ...styles.ruleMark, color: MARK_COLORS[c.mark] }}>{c.mark}</span>
                {c.note && <span style={styles.ruleNote}>{c.note}</span>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* 表が支える4つの作業(NN group)と、各系列で関わる機能 */
const TASKS = [
  { icon: "find", t: "探す", d: "条件に合う行を見つける。絞り込み・並べ替え・検索・目で読み下す", how: "最初の列を人が読める名前に/フィルタを見つけやすく、絞り込み中を明示", who: "NN group・Google(フィルタは表の直上か直下)" },
  { icon: "compare", t: "比べる", d: "行どうし・列どうしの値を比べ、傾向や外れ値を見つける", how: "見出しと最初の列を固定/縞模様・境界線/関連する列を隣に・列を隠せる", who: "NN group・Apple(行の交互の色・列幅)" },
  { icon: "edit", t: "1行を見る・編集する", d: "1件の全項目を読む、追加・編集する", how: "表を見ながら編集できる横パネル(モーダルは他の行を隠す)", who: "NN group・Apple(長い内容は詳細画面へ)" },
  { icon: "batch", t: "まとめて操作する", d: "複数の行を選んで削除・共有などをする", how: "チェックボックスで選択+表の上か下に操作。全選択/選んだ行は背景色", who: "NN group・Google" },
];

function TaskIcon({ k }) {
  const c = "#3C5A73";
  return (
    <svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="8" fill="#EEF1FA" />
      {k === "find" && <g><circle cx="17" cy="17" r="7" fill="none" stroke={c} strokeWidth="2" /><path d="M22 22 l7 7" stroke={c} strokeWidth="2.4" strokeLinecap="round" /></g>}
      {k === "compare" && <g>{[0, 1, 2].map((i) => <rect key={i} x={8 + i * 9} y={30 - (i + 1) * 6} width="6" height={(i + 1) * 6} fill={c} opacity={0.5 + i * 0.25} />)}<line x1="6" x2="34" y1="30" y2="30" stroke={c} /></g>}
      {k === "edit" && <g><rect x="8" y="11" width="24" height="18" rx="2" fill="#FFFFFF" stroke={c} strokeWidth="1.4" /><path d="M14 24 l10 -10 l3 3 l-10 10 h-3 z" fill={c} /></g>}
      {k === "batch" && <g>{[0, 1, 2].map((i) => <g key={i}><rect x="9" y={9 + i * 8} width="6" height="6" rx="1.5" fill={i < 2 ? c : "#FFFFFF"} stroke={c} /><line x1="19" x2="31" y1={12 + i * 8} y2={12 + i * 8} stroke={c} strokeWidth="1.6" /></g>)}</g>}
    </svg>
  );
}

function TaskCards() {
  return (
    <div style={styles.taskGrid}>
      {TASKS.map((t) => (
        <div key={t.t} style={styles.taskCard}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><TaskIcon k={t.icon} /><div style={styles.taskTitle}>{t.t}</div></div>
          <div style={styles.taskText}>{t.d}</div>
          <div style={styles.taskHow}>{t.how}</div>
          <div style={styles.taskWho}>{t.who}</div>
        </div>
      ))}
    </div>
  );
}

/* 小さい画面で表が収まらないとき(NN group・W3C) */
function NarrowTableDiagram() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const phone = (x, title, sub, ok, children) => (
    <g>
      <rect x={x} y="6" width="120" height="132" rx="12" fill="#FFFFFF" stroke="#9EA4C4" />
      <g>{children}</g>
      <text x={x + 60} y="156" fontSize="10" fontWeight="600" fill={ok ? "#2E6B3A" : "#A33A2E"} textAnchor="middle" fontFamily={font}>{ok ? "◯ " : "✕ "}{title}</text>
      <text x={x + 60} y="170" fontSize="8.5" fill="#565D8A" textAnchor="middle" fontFamily={font}>{sub}</text>
    </g>
  );
  const grid = (x0, firstFixed, cut) => {
    const parts = [];
    for (let r = 0; r < 6; r++) {
      const y = 22 + r * 18;
      parts.push(<rect key={`h${r}`} x={x0 + 8} y={y} width="34" height="16" fill={r === 0 ? "#D9E4F2" : firstFixed ? "#EEF1FA" : "#FFFFFF"} stroke="#E1E3F0" />);
      for (let c = 0; c < 3; c++) {
        const w = c === 2 && cut ? 18 : 30;
        parts.push(<rect key={`c${r}${c}`} x={x0 + 42 + c * 30} y={y} width={w} height="16" fill={r === 0 ? "#D9E4F2" : "#FFFFFF"} stroke="#E1E3F0" />);
      }
    }
    return parts;
  };
  return (
    <svg viewBox="0 0 420 178" width="100%" style={{ maxWidth: 520, display: "block", margin: "0 auto" }} role="img" aria-label="小さい画面で表を見せるときの良い例と悪い例">
      {phone(6, "見出しと最初の列を固定", "右端を少し切り、続きを示す", true, <>{grid(6, true, true)}<rect x="14" y="22" width="34" height="108" fill="none" stroke="#3C5A73" strokeWidth="1.6" /><text x="122" y="80" fontSize="11" fill="#3C5A73" fontFamily={font}>›</text></>)}
      {phone(150, "スクロールで見出しが消える", "何の値か分からなくなる", false, <>{[0, 1, 2, 3, 4, 5].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={158 + c * 26} y={22 + r * 18} width="26" height="16" fill="#FFFFFF" stroke="#E1E3F0" />))}</>)}
      {phone(294, "横向きに回転させる", "最後の手段。行が見えなくなる", false, <><rect x="302" y="40" width="104" height="60" rx="6" fill="#F3F6FA" stroke="#C9CEE3" /><path d="M354 112 a14 14 0 1 0 -14 -14" stroke="#7E86AC" strokeWidth="1.6" fill="none" /><path d="M340 98 l-4 -5 M340 98 l5 -3" stroke="#7E86AC" strokeWidth="1.6" /></>)}
    </svg>
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

export default function ContainmentTablePage() {
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
        <SidebarNav currentPath="/components/containment/table" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / 表(データテーブル)</span>
            <span>SPEC No. 057</span>
          </div>

          <h1 style={styles.title}>表(データテーブル)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、行と列でデータを比べる表の見出し・並べ替え・選択・小さい画面での見せ方をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(データテーブルの構成)</span>
            <TableSwatch />
            <p style={styles.swatchNote}>列見出し・並べ替えの矢印・選択した行の背景色・識別名の列・ページ送りで構成した概念図です。1列で縦に並べる一覧は「リスト」ページで扱い、このページは複数の列で値を比べる表を扱います。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              <strong>表は「比べる」ための形</strong>だという位置づけは、NN group・Apple・Googleの3系列に共通しています。NN groupは、隣り合う値を目や記憶に頼らずに比べられる点をカードより優れた点に挙げ、Appleは文字を読み流すには行の形式が向くとし、Googleは傾向を見つけやすくすることを目的にしています。
            </p>
            <p style={styles.synthesisText}>
              違いは決めている層です。Google(M2)は<strong>行52dp・見出し行56dp・列の間32dp以上</strong>という寸法と、<strong>並べ替えの矢印・選択した行の背景色</strong>まで決めています。Appleは数値を持たず、macOSの表で<strong>見出しをクリックして並べ替え、もう一度で逆順、列幅を変えられる、行の色を交互に</strong>といった振る舞いを求めます。並べ替えの操作は、AppleとGoogleでほぼ同じです。
            </p>
            <p style={styles.synthesisText}>
              W3Cは見た目ではなく、<strong>見出しセル(th)とデータセル(td)の関係を構造として伝えること(1.3.1)</strong>を求めます。スクリーンリーダーは1セルずつ読むため、構造がないと何の値か分からなくなるからです。並べ替えの状態も<strong>aria-sort</strong>で伝えます。
            </p>
            <p style={styles.synthesisText}>
              NN groupは、表が支えるべき<strong>4つの作業(探す・比べる・1行を見る/編集する・まとめて操作する)</strong>から、<strong>見出しと最初の列の固定・縞模様・列の非表示</strong>を導いています。実務では、<strong>見た目はGoogleの寸法とAppleの並べ替えの振る舞いを土台にし、構造はW3Cのth/td・aria-sortで正しく伝え、4つの作業がどれも楽にできるかで機能を足す</strong>のが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 表の要素ごとに何を定めているか</h2>
            <RuleMatrix />
            <p style={styles.chartNote}>◯=明記されている、△=部分的・条件付き、―=確認した範囲では記載なし。Googleは旧版(Material Design 2)の指針です。「画面に収まらないとき」のW3Cは、狭い幅でも2方向にスクロールせずに読めることを求める1.4.10の中で、データ表を例外としていることを指します。</p>
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
                <InfoBox label="サイズ・余白" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="見出し・行の見分け方">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
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
            <h2 style={styles.diagramTitle}>表(データテーブル) デザインシステム比較</h2>
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
                <div style={styles.labelCell}>サイズ・余白</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>見出し・行の見分け方</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
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
            <h2 style={styles.diagramTitle}>表が支える4つの作業と、そのための機能</h2>
            <p style={styles.diagramNote}>NN groupが挙げる4つの作業ごとに、必要な機能と、それを定めている系列をまとめました。表を設計するときは、4つの作業がどれも楽にできるかを確かめます。</p>
            <TaskCards />
          </section>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>小さい画面で表が収まらないとき</h2>
            <NarrowTableDiagram />
            <p style={styles.chartNote}>NN groupは、見出しと最初の列を固定し、右端の列を少し切って横に続きがあることを示す方法を勧めています(点の表示より矢印や切れ目の方が気づかれやすい)。横向きへの回転を求めるのは、列は増えても行が見えなくなるため最後の手段です。W3Cも、データ表は2次元の配置が必要な部分として、狭い幅での横スクロールを例外として認めています(1.4.10)。</p>
          </div>

          <div style={styles.linksRow}>
            <a href="/components/containment/list" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>リスト ↗</div>
              <div style={styles.linkCardDesc}>1列で縦に並べる一覧はこちら</div>
            </a>
            <a href="/components/navigation/pagination" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>ページネーション ↗</div>
              <div style={styles.linkCardDesc}>表の下に置くページ送りの比較はこちら</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["情報の整理・一覧", "検索・絞り込み"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。GoogleはM3にページがなく、Material Design 2のページデータで本文確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Lists and tablesページの「macOS」見出し(並べ替え・列幅・行の色)へのアンカー付きリンクで、Best practices・Contentの見出しも併記しています。GoogleはMaterial Design 2のData tablesページです(M3には対応するページがありません)。W3CはWAIのTables Tutorialを基本リンクとし、Caption & Summary・APGのTable PatternとSortable Table Example・1.3.1も併記しています。NN groupはData Tablesの記事の「4つの作業」の節と、Mobile Tablesの記事の節です。
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
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  ruleScroll: { overflowX: "auto" },
  ruleGrid: { display: "grid", gridTemplateColumns: "120px repeat(4, minmax(120px, 1fr))", minWidth: 640, border: "1px solid #E1E3F0", borderRadius: 4 },
  ruleHead: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#FFFFFF" },
  ruleLabel: { fontSize: 11, color: "#454C78", fontWeight: 600, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", lineHeight: 1.5 },
  ruleCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 2 },
  ruleMark: { fontSize: 15, fontWeight: 700, lineHeight: 1.1 },
  ruleNote: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5 },
  taskGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 210px), 1fr))", gap: 10 },
  taskCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", background: "#FFFFFF" },
  taskTitle: { fontSize: 13, fontWeight: 700, color: "#171B36" },
  taskText: { fontSize: 11, lineHeight: 1.6, color: "#454C78", marginTop: 6 },
  taskHow: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", background: "#F3F6FA", borderRadius: 4, padding: "6px 8px", marginTop: 6 },
  taskWho: { fontSize: 9.5, color: "#7E86AC", marginTop: 5 },
};
