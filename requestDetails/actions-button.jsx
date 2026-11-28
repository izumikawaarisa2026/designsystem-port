import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, SummaryCard, PageLink, SplitSection, Hl, RefList, RelatedPages, GoodBad, hasRow, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Actions / ボタン」ページ。
 * 2026-11-28 ⑩本人最終レビューNo.016: 「押せる範囲の大きさ」は新しいページ「押せる範囲(ターゲットサイズ)」(/tokens/target-size)へ、「状態」は「インタラクション状態」へ移し、このページは種類・優先度・特別な役割のボタンを扱う。
 * (以下は当時の記録)当初は「押せる範囲」の内容のみだったが、ボタンに関する記載は
 * アクセシビリティ以外にも複数あるため、コンテンツエリア内にセグメンテッドコントロールを設け、
 * 「アクセシビリティ / 種類・優先度 / 状態」の3つを切り替えて比較できるようにしている。
 * 「状態」はトークンレイヤーに独立ページ(インタラクション状態)を作る予定があり、将来的に
 * どちらか良い方へ統合・重複整理する前提で、まずは抜け漏れなく網羅する方針(2026-09)。
 */

function MiniButton({ label, style }) {
  return (
    <span style={{ display: "inline-block", fontSize: 9.5, fontWeight: 600, padding: "5px 10px", borderRadius: 14, whiteSpace: "nowrap", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", ...style }}>
      {label}
    </span>
  );
}

const TAB_STYLES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Buttonsページ「Role」",
    term: "Button(役割はNormal・Primary・Cancel・Destructive)",
    position: "意味的な役割で4分類(Normal/Primary/Cancel/Destructive)",
    stance:
      <>役割(Role)で<Hl>Normal・Primary・Cancel・Destructiveの4種類</Hl>。Primaryはアクセントカラー、Destructiveはシステムの赤を使う。壊す操作(Destructive)には、Primaryの役割を割り当てない(読まずに選ばれる危険がある)。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "―(役割の分類はPOURの適合区分ではないが、誤操作を防ぐ点で理解可能に関わる)",
    searchHint: "one of the following roles",
    url: "https://developer.apple.com/design/human-interface-guidelines/buttons#Role",
    refs: [{ label: "Buttons ― Role", url: "https://developer.apple.com/design/human-interface-guidelines/buttons#Role" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <MiniButton label="Normal" style={{ background: "#EEF1FA", color: "#454C78", border: "1px solid #D5D9EC" }} />
        <MiniButton label="Primary" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <MiniButton label="Cancel" style={{ background: "transparent", color: "#666D93", border: "1px solid #C7CCE4" }} />
        <MiniButton label="Destructive" style={{ background: "#C0503F", color: "#FFFFFF" }} />
      </div>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― 5種類のボタン",
    term: "Button(Elevated・Filled・Filled tonal・Outlined・Text)",
    position: "優先度(emphasis)で5段階に分類",
    stance:
      <>優先度で<Hl>Elevated・Filled・Filled tonal・Outlined・Textの5種類</Hl>。いちばん目立つのはFilled。M3 Expressiveでは大きさ5段階(高さ32〜136dp)と形2種類も選べる。Elevatedは、背景から分けて見せる必要がある場合に限る。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "―(優先度の分類そのものはPOURの適合区分ではない)",
    searchHint: "five common button types",
    url: "https://m3.material.io/components/buttons/guidelines",
    refs: [{ label: "Buttons ― Guidelines", url: "https://m3.material.io/components/buttons/guidelines" }, { label: "Buttons ― Specs(大きさ・形)", url: "https://m3.material.io/components/buttons/specs" }, { label: "Button groups", url: "https://m3.material.io/components/button-groups/overview" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { n: 1, label: "Elevated", style: { background: "#FFFFFF", color: "#2F7D6E", boxShadow: "0 2px 4px rgba(23,27,54,0.22)" } },
          { n: 2, label: "Filled", style: { background: "#2F7D6E", color: "#FFFFFF" } },
          { n: 3, label: "Filled tonal", style: { background: "#D9ECE7", color: "#1F5A4E" } },
          { n: 4, label: "Outlined", style: { background: "transparent", color: "#2F7D6E", border: "1px solid #2F7D6E" } },
          { n: 5, label: "Text", style: { background: "transparent", color: "#2F7D6E", padding: "5px 4px" } },
        ].map((b) => (
          <MiniButton key={b.n} label={b.label} style={b.style} />
        ))}
      </div>
    ),
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.11",
    term: "ボタン(WAI-ARIAの役割)",
    position: "種類の分類はなく、見分けやすさの基準のみ",
    stance:
      <>種類の基準はない。ただし<Hl>どの種類のボタンも、境界や状態を背景と3:1以上で見分けられる</Hl>ようにする(1.4.11)。例外: 文字だけのボタンは1.4.11の対象になりにくいが、ラベルの文字には4.5:1(1.4.3)がかかる。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "知覚可能(Perceivable) ― 1.4.11は「知覚可能」の達成基準。",
    searchHint: "Non-text Contrast",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",
    refs: [{ kind: "sc", level: "AA", label: "1.4.11 非テキストのコントラスト", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <MiniButton label="ボタン" style={{ background: "#171B36", color: "#FFFFFF" }} />
          <span style={{ fontSize: 9, color: "#2F7D6E", fontWeight: 700 }}>◯ 4.6:1</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <MiniButton label="ボタン" style={{ background: "#D9DEEF", color: "#666D93" }} />
          <span style={{ fontSize: 9, color: "#C0503F", fontWeight: 700 }}>✕ 1.6:1</span>
        </div>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Similarity Principle in Visual Design",
    term: "Button(主要な操作=Primary、副次的な操作=Secondary)",
    position: "色による優先度づけ(数値基準ではなく原則)",
    stance:
      <><Hl>主要な操作には専用の色を確保し</Hl>、ほかの操作と見分けられるようにする。特定の形を勧めるものではなく、色で優先度を伝える原則。</>,
    exceptions: <NoData>記載なし</NoData>,
    pourDetail: "根拠となる原則 ― 適合区分ではなく、見た目の知覚(ゲシュタルトの類同の原理)にもとづく設計の根拠。",
    searchHint: "reserved for primary",
    url: "https://www.nngroup.com/articles/gestalt-similarity/",
    refs: [{ label: "Similarity Principle in Visual Design", url: "https://www.nngroup.com/articles/gestalt-similarity/" }],
    illustration: () => (
      <div style={{ display: "flex", gap: 8 }}>
        <MiniButton label="主要な操作" style={{ background: "#2F6FED", color: "#FFFFFF" }} />
        <MiniButton label="副次的な操作" style={{ background: "#EEF1FA", color: "#666D93" }} />
      </div>
    ),
  },
];
markNeg(TAB_STYLES);

/* 「状態」の比較は、2026-11-28 ⑩本人最終レビューNo.016で「インタラクション状態」のページと重なるため外した */

const TABS = [
  { id: "styles", label: "種類・優先度", data: TAB_STYLES, hasScale: false },
];

function ButtonSwatch() {
  return (
    <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      <div style={{ background: "#2F6FED", color: "#FFFFFF", fontSize: 12, fontWeight: 600, padding: "9px 18px", borderRadius: 20 }}>登録する</div>
      <div style={{ background: "transparent", color: "#9199BE", fontSize: 12, fontWeight: 600, padding: "8px 17px", borderRadius: 20, border: "1.5px solid #C7CCE4" }}>キャンセル</div>
    </div>
  );
}

const SYNTHESIS = {
  styles: [
    <>ボタンを「種類」で分ける発想はAppleとGoogleに共通しているが、<strong>分け方の軸が違う</strong>。Appleは「何のための操作か」という意味(Role)、Googleは「どれだけ目立たせるか」という優先度(emphasis)で分類している。</>,
    <>WCAGは種類そのものを定義しないが、<strong>1.4.11のコントラスト基準はすべての種類のボタンに等しく適用される</strong>。NN groupの「主要操作には専用の色を」という指摘は、AppleのPrimary・GoogleのFilledの両方に共通する。</>,
  ],
  states: [
    <>Enabled・Hover・Focused・Pressed・Disabledという<strong>基本の状態はGoogleとNN groupでほぼ一致</strong>している。Appleは共通の状態の一覧を持たず、プラットフォームごとに定めている(独自のボタンには押した状態を必ず用意する)。</>,
    <>WCAGは見た目そのものより、<strong>状態が支援技術に正しく伝わるか(4.1.2)</strong>を重視する。ブラウザ標準のボタンなら、多くの場合は自動的に満たされる。</>,
  ],
};

/* タブ1つ分の中身。通常は選んだタブだけを表示し、静的HTMLの書き出し時(window.__DSP_STATIC__)は全タブを並べる */
function ButtonTabContent({ tabId }) {
  const tab = TABS.find((t) => t.id === tabId) || TABS[0];
  const SOURCES = tab.data;
  return (
    <>
    <div style={styles.synthesisBox}>
      <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
      {SYNTHESIS[tabId].map((node, i) => (<p key={i} style={styles.synthesisText}>{node}</p>))}
    </div>

    <div className="dsp-mobile-only" style={styles.sourceList}>
      {SOURCES.map((s) => (
        <div key={s.key} style={styles.sourceCard}>
          <div style={styles.sourceHeadRow}>
            <div>
              <div style={styles.sourceName}>{s.name}</div>
              <div style={styles.sourceDoc}>{s.doc}</div>
            </div>
            {tab.hasScale && (
              <div style={styles.sourceValueWrap}>
                <span style={styles.sourceValue}>{s.value}</span>
                <span style={styles.sourceUnit}>{s.unit}</span>
              </div>
            )}
          </div>
          {!tab.hasScale && s.term && <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>}
          {!tab.hasScale && <div style={styles.positionBadge}>{s.position}</div>}
          <div style={styles.sourceStance}>{s.stance}</div>
          {hasRow(SOURCES, "exceptions") && (<div style={styles.exceptionBox}>
            <span style={styles.exceptionLabel}>例外・許容ケース</span>
            <p style={styles.exceptionText}>{s.exceptions}</p>
          </div>)}
          {!tab.hasScale && s.illustration && (
            <div style={styles.illustrationBox}>{s.illustration()}</div>
          )}
          {tab.hasScale && (
            <div style={{ maxWidth: 220 }}>
              <RangeScale scale={s.scale} />
            </div>
          )}
          <div style={styles.pourBox}>
            <span style={styles.exceptionLabel}>アクセシビリティ(WCAG基準)</span>
            <p style={styles.exceptionText}>{s.pourDetail}</p>
          </div>
          <div style={styles.pourBox}>
            <span style={styles.exceptionLabel}>参照ページ(公式)</span>
            <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
          </div>
        </div>
      ))}
    </div>

    <div className="dsp-desktop-only">
      <h2 style={styles.diagramTitle}>四系列デザインシステム比較 ― {tab.label}</h2>
      <div style={styles.matrixScroll}>
        <div style={styles.matrixGrid}>
          <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
          {SOURCES.map((s) => (
            <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
              <div style={styles.sourceName}>{s.name}</div>
              <div style={styles.sourceDoc}>{s.doc}</div>
            </div>
          ))}
          {tab.hasScale ? (
            <>
              <div style={styles.labelCell}>基準値</div>
              {SOURCES.map((s) => (
                <div key={s.key} style={styles.cell}>
                  <span style={styles.value}>{s.value}</span>
                  <span style={styles.unit}>{s.unit}</span>
                </div>
              ))}
              <div style={styles.labelCell}>許容レンジ</div>
              {SOURCES.map((s) => (<div key={s.key} style={styles.cell}><div style={{ width: "100%", maxWidth: 170 }}><RangeScale scale={s.scale} /></div></div>))}
            </>
          ) : (
            <>
              {SOURCES.some((s) => s.term) && (<>
              <div style={styles.labelCell}>名称</div>
              {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
              </>)}
              <div style={styles.labelCell}>位置づけ</div>
              {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
              <div style={styles.labelCell}>見た目イメージ</div>
              {SOURCES.map((s) => (<div key={s.key} style={styles.cell}>{s.illustration ? s.illustration() : null}</div>))}
            </>
          )}
          <div style={styles.labelCell}>基本方針</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
          {hasRow(SOURCES, "exceptions") && (<>
            <div style={styles.labelCell}>例外・許容ケース</div>
            {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
          </>)}
          <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
          {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>))}
          <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
          {SOURCES.map((s) => (
            <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, display: "block" }}>
              <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
            </div>
          ))}
        </div>
      </div>
    </div>

    </>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "押すとその場で処理(保存・送信・削除など)を実行するコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "利用者が選んだ操作を、押した瞬間に実行する" },
  { k: "よく使われる場面", v: "フォームの送信、ダイアログの「OK」「キャンセル」、画面の主な操作(購入・保存)" },
  { k: "似たコンポーネント", v: <>別のページへ遷移するなら<PageLink to="/components/actions/link">リンク</PageLink>、画面の上に浮かべて主な操作を1つだけ置くなら<PageLink to="/components/actions/fab">フローティングアクションボタン</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "確定とキャンセル、どちらを右(末尾)に置く?",
    sides: [
      { who: "Apple・Google", color: "#2F7D6E", t: "確定(最も選ばれやすい既定のボタン)を末尾側(右)に置き、キャンセルは先頭側(左)に置く。縦に積むときは確定を上にする" },
      { who: "NN group", color: "#7A4F7E", t: "Webアプリでは「OKを先、キャンセルを後」とする。ただし、個々の画面の最適化より、プラットフォームの慣習に従うことのほうが大事" },
    ],
    tip: "iOS・Android・macOSのアプリでは、その系列の並び(確定を右)に従う。Webでは、どちらかに決めてサイト全体でそろえる。並びより、ボタンの名前で何が起きるかを伝える(「削除」「保存」)ほうが、押し間違いを減らせる。",
    refs: [
      { label: "Apple: Alerts ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/alerts#Best-practices" },
      { label: "Google: Dialogs ― Guidelines", url: "https://m3.material.io/components/dialogs/guidelines" },
      { label: "NN group: OK-Cancel or Cancel-OK?", url: "https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/#toc-dialog-buttons-for-web-based-apps-2" },
    ],
  },
  {
    q: "ボタンの種類は、何で分ける?",
    sides: [
      { who: "Apple", color: "#C2542A", t: "操作の意味(役割)で4つに分ける。Normal・Primary(最も選ばれやすい既定の操作)・Cancel・Destructive(削除など)。役割に応じて色が変わる" },
      { who: "Google", color: "#2F7D6E", t: "どれだけ目立たせるか(優先度)で5つに分ける。Elevated・Filled・Filled tonal・Outlined・Text" },
      { who: "NN group", color: "#7A4F7E", t: "種類の決まりはなく、主要な操作には専用の色を当てて、副次的な操作と見分けられるようにする" },
    ],
    tip: "「何の操作か(Apple)」と「どれだけ目立たせるか(Google)」は両立する。まず操作の意味を決め、そのうえで画面の中の優先度で見た目を選ぶ。削除のような操作は、選ばれやすくても目立つ見た目にしない(Apple)点に気をつける。",
  },

];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "押せる範囲は44pt・48dpを基準に", d: "詳しくは「押せる範囲(ターゲットサイズ)」", who: "Apple・Google" },
  { n: 2, t: "取りやめるボタンは「キャンセル」と書き、既定のボタンにしない", d: "", who: "Apple" },
  { n: 3, t: "まず操作の意味を決め、次に目立たせ方を選ぶ", d: "役割(Apple)と優先度(Google)は両立する", who: "AI解釈" },
  { n: 4, t: "削除のような操作は目立たせすぎない", d: "選ばれやすくても目立つ見た目にしない", who: "Apple" },
  { n: 5, t: "主な操作と副次的な操作を見分けられるように", d: "主な操作に専用の色を当てる", who: "NN group" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
/* 特別な役割のボタン(2026-11-28 ⑩本人最終レビューNo.016。Apple HIG Buttons・Alerts、M3 Dialogs、NN groupの各記事を取得して確認) */
const SPECIAL_BUTTONS = [
  {
    name: "主ボタン(既定のボタン)",
    fig: { label: "保存", style: { background: "#3A4FCF", color: "#FFFFFF" } },
    rules: [
      ["Apple", "最も選ばれやすいボタンに「Primary」の役割を付け、目立つ見た目にする。目立つボタンは1画面に1〜2個まで"],
      ["Google", "いちばん目立つのはFilled。確定のボタンはダイアログの端に最も近く置く"],
      ["NN group", "最もよく選ばれるボタンを既定にして強調する。ただし特に危険な操作は既定にしない"],
    ],
  },
  {
    name: "キャンセル",
    fig: { label: "キャンセル", style: { background: "transparent", color: "#3A4FCF", border: "1px solid #9EA4C4" } },
    rules: [
      ["Apple", "操作を取りやめるボタンの名前は必ず「キャンセル」にする。既定のボタンにしない。行の先頭側(左)、縦に積むなら下に置く"],
      ["Google", "取りやめる操作(dismissive)は、確定の左に置く。取りやめる操作は無効にしない"],
      ["NN group", "Webでは戻る操作があるので多用しない。何かを確定してしまったと不安になる場面や、複数ステップの手続きで置く"],
    ],
  },
  {
    name: "削除などの破壊的なボタン",
    fig: { label: "削除", style: { background: "transparent", color: "#C0503F", border: "1px solid #C0503F" } },
    rules: [
      ["Apple", "データを失う操作には「Destructive」の役割(システムの赤)。主ボタンにしない。添えるキャンセルで、安全に避けられるようにする。利用者が自分で選んだ削除の確認では、破壊的な見た目にしなくてよい"],
      ["NN group", "取り消せない重い操作の前には確認を出す(日常の操作には出さない)。答えは「はい/いいえ」ではなく「ファイルを削除」「残す」のように結果を書く。無害な操作のすぐ隣に置かない"],
      ["W3C", "法的・金銭的な確約やデータの削除では、取り消せる・確かめて直せる・送信前に確認できる、のどれかを用意する(3.3.4)"],
    ],
  },
  {
    name: "閉じる(×)",
    fig: { label: "×", style: { background: "transparent", color: "#2E3457", border: "1px solid #9EA4C4", padding: "5px 9px" } },
    rules: [
      ["Google", "全画面ダイアログの閉じる操作は、×のアイコンボタンだけにする。保存せずに閉じるときは、変更を捨ててよいかを確認する"],
      ["NN group", "閉じる(作業を保存して閉じる)と、キャンセル(変更を捨てる)を区別し、×だけでなく文字のラベルで示す。迷ったら保存してから閉じる"],
    ],
  },
  {
    name: "OK",
    fig: { label: "OK", style: { background: "#3A4FCF", color: "#FFFFFF" } },
    rules: [
      ["Apple", "OKを使うのは、知らせるだけのアラートでの了承に限る。それ以外は「消去」「変換」のように、押した結果を表す動詞にする"],
      ["NN group", "「OK」のような汎用の名前より、何をするかを表す名前のほうがよいことが多い"],
    ],
  },
  {
    name: "リセット(入力を消す)",
    fig: { label: "リセット", style: { background: "transparent", color: "#565D8A", border: "1px dashed #9EA4C4" } },
    rules: [
      ["NN group", "Webのフォームには、ほぼ置かない(送信のつもりで押して、入力を失う)。同じフォームを何度も入力する場合や、既定値に戻す場合は例外"],
    ],
  },
];
const SPECIAL_BTN_REFS = [
  { label: "Apple: Buttons ― Role", url: "https://developer.apple.com/design/human-interface-guidelines/buttons#Role" },
  { label: "Apple: Alerts ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/alerts#Best-practices" },
  { label: "Google: Dialogs ― Guidelines", url: "https://m3.material.io/components/dialogs/guidelines" },
  { label: "NN group: Reset and Cancel Buttons", url: "https://www.nngroup.com/articles/reset-and-cancel-buttons/#toc-cancel-use-sparingly-2" },
  { label: "NN group: Confirmation Dialogs Can Prevent User Errors", url: "https://www.nngroup.com/articles/confirmation-dialog/" },
  { label: "NN group: Cancel vs Close", url: "https://www.nngroup.com/articles/cancel-vs-close/#toc-avoid-losing-users-work-1" },
  { label: "NN group: Dangerous UX: Consequential Options Close to Benign Options", url: "https://www.nngroup.com/articles/proximity-consequential-options/" },
  { kind: "sc", level: "AA", label: "3.3.4 誤り防止(法的・金融・データ)", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html" },
];
const WHO_COLOR = { Apple: "#C2542A", Google: "#2F7D6E", W3C: "#A3821F", "NN group": "#7A4F7E" };

function SpecialButtons() {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={styles.diagramTitle}>特別な役割のボタン</h2>
      <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#454C78", margin: "-4px 0 12px" }}>見た目の優先度とは別に、<strong>決まった役割を持つボタン</strong>には、名前・置き場所・見た目の決まりがある。役割で分けているのはAppleで(Normal・Primary・Cancel・Destructive)、Google・NN group・W3Cは、ダイアログや確認の場面で決まりを持つ。記載のない系列は省いた。</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SPECIAL_BUTTONS.map((b) => (
          <div key={b.name} style={{ display: "flex", flexWrap: "wrap", gap: "10px 16px", border: "1px solid #E1E3F0", borderRadius: 6, padding: 12, background: "#FFFFFF" }}>
            <div style={{ flex: "1 0 170px", maxWidth: 220 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 8 }}>{b.name}</div>
              <div style={{ background: "#F8F9FD", borderRadius: 6, padding: 10, display: "flex", justifyContent: "center" }}><MiniButton label={b.fig.label} style={b.fig.style} /></div>
            </div>
            <div style={{ flex: "999 1 320px", minWidth: 0 }}>
              {b.rules.map(([who, t]) => (
                <div key={who} style={{ display: "grid", gridTemplateColumns: "72px minmax(0, 1fr)", gap: 8, fontSize: 12, lineHeight: 1.6, color: "#2E3457", marginBottom: 5 }}>
                  <span style={{ fontWeight: 700, color: WHO_COLOR[who], fontSize: 11 }}>{who}</span><span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "8px 0" }}>並べ方(確定とキャンセルのどちらを右に置くか)は、系列で答えが分かれる(上の「意見が分かれる点」)。</p>
      <div style={{ fontSize: 11, color: "#565D8A" }}><RefList refs={SPECIAL_BTN_REFS} /></div>
    </section>
  );
}

export default function ActionsButtonPage() {

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
        <SidebarNav currentPath="/components/actions/button" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ボタン</span>
            <span>SPEC No. 001</span>
          </div>

          <h1 style={styles.title}>ボタン</h1>
          <SummaryCard keyPoints={KP}
            imageLabel="コンポーネントイメージ"
            image={<ButtonSwatch />}
            imageNote="優先度の異なる2つの見た目の例(強調 / 中間)。系列によって呼び方や境界は異なる。"
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />

          <SpecialButtons />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <p style={{ fontSize: 12.5, lineHeight: 1.7, color: "#454C78", margin: "-4px 0 12px" }}>ここでは<strong>種類・優先度</strong>(見た目の分け方)を比べる。<strong>押せる範囲の大きさ</strong>(何pt・dp・pxか)は、ボタン以外にも共通するので<PageLink to="/tokens/target-size">押せる範囲(ターゲットサイズ)</PageLink>のページに、<strong>状態</strong>(押せる・押した・使えない・処理中など)は、ボタン以外にも共通するので<PageLink to="/tokens/interaction-states">インタラクション状態</PageLink>のページにまとめた。</p>

          <ButtonTabContent tabId="styles" />

          <RelatedPages paths={["/tokens/interaction-states", "/components/actions/fab", "/components/actions/link", "/tokens/shape", "/principles/accessibility"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["操作方法(タッチ・キーボード)"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              状態の見た目(重ね色の不透明度など)の詳しい比較は「インタラクション状態」ページ、押せる範囲の大きさと間隔は「押せる範囲(ターゲットサイズ)」ページを参照。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 18px" },
  segmented: { display: "inline-flex", gap: 4, background: "#F3F6FA", padding: 4, borderRadius: 8, marginBottom: 20, flexWrap: "wrap" },
  segItem: { appearance: "none", border: "none", background: "transparent", color: "#454C78", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 13, padding: "7px 14px", borderRadius: 6, cursor: "pointer" },
  segItemActive: { background: "#171B36", color: "#FFFFFF", fontWeight: 500 },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  staticTabTitle: { fontSize: 17, fontWeight: 700, color: "#171B36", margin: "8px 0 12px", paddingTop: 12, borderTop: "2px solid #171B36" },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "12px 16px", marginBottom: 14, maxWidth: 420 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 10px", color: "#171B36" },
  legendRow: { display: "flex", gap: 14, marginBottom: 20, fontSize: 11, color: "#565D8A", fontFamily: "'IBM Plex Mono', monospace" },
  legendItem: { display: "flex", alignItems: "center", gap: 5 },
  legendSwatch: { display: "inline-block", width: 10, height: 10, border: "1px solid", borderRadius: 2 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  sourceValueWrap: { textAlign: "right" },
  sourceValue: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 15, color: "#171B36" },
  sourceUnit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#666D93", marginLeft: 3 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "8px 0 10px" },
  exceptionBox: { background: "#FFFFFF", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  illustrationBox: { margin: "10px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: {},
  value: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 14 },
  unit: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#666D93", marginLeft: 4 },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
