import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, GoodBad, hasRow, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Communication / ツールチップ」ページ。
 * 今後作成予定の「情報伝達の使い分け」(モーダル・ボトムシート・サイドシート・
 * ダイアログ・フルスクリーンダイアログ・スナックバー・ツールチップ・アラートを
 * 横断する統合ガイドページ、Selectionの選び方ページと同種)から参照される想定のため、
 * 他コンポーネントとの役割の違い(操作不要・ホバー/フォーカスで一時的に表示・
 * クリックやタップでは開かない)が分かるよう記述している。
 *
 * W3C(WAI-ARIA APG Tooltip Pattern)/ Nielsen Norman Group(Tooltip Guidelines /
 * Why So Many Info Tips Are Bad)は記事本文を直接取得して確認済み(2026-09)。
 * Google(Material Design 3 Tooltips)はユーザー提供の公式ドキュメント
 * (MD3_text/tooltips.docx)により本文を直接確認済み(2026-09)。
 *
 * 2026-09 追記(ユーザー指摘): Appleにも「リッチツールチップ」に相当する概念が
 * ないか確認したところ、独立フレームワーク「TipKit」(iOS 17〜)がそれにあたる
 * ことが判明した。developer.apple.com/documentation/TipKit および
 * /HighlightingAppFeaturesWithTipKit はAPIリファレンスのためMarkdown版
 * (URL末尾に.md)が取得でき、本文を直接確認済み(2026-09)。一方、Appleの基本の
 * 「ヘルプタグ(プレーン相当)」を説明する「Showing help tags...」ページ、および
 * HIGの「Offering help」ページはSPAで直接取得できず、検索結果による間接確認の
 * ままである。また、W3C・Nielsen Norman Groupは独自の「リッチツールチップ」概念を
 * 持たないことを本文で確認した(W3C: 対話的内容は非モーダルダイアログを推奨。
 * NN group: 複雑な内容をtipに隠さず可視化すべきと明記)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Offering help(Tooltips・Tips)",
    term: "Tooltip(利用者向けの説明ではHelp tag)・TipKitのTip",
    color: "#C2542A",
    position: <>ポインターを重ねると出る文字だけの「ヘルプタグ(プレーン相当)」と、タイトル・メッセージ・任意の画像・アクションボタンを持てる別フレームワーク「TipKit」の「Tip(リッチ相当)」という、<Hl>実装の違う2系統がある</Hl></>,
    size: "文字数は60〜75文字までを目安にする(多言語化で長さが変わることにも注意)。macOS",
    colorInfo: <NoData>記載なし</NoData>,
    glossary: [
      { term: "ポップオーバー(Popovers)", desc: "コントロールを押すと、出どころを指す矢印とともにほかの内容の上に出る一時的なビュー(主にiPad向け)。ボタンなども置ける。不要になったら自動で閉じるのが基本で、閉じるボタンは原則置かない(保存する/しないを明確にする場面ではキャンセル・完了を置いてよい)。範囲外を押して閉じたら作業内容を保存し、明示的にキャンセルしたときだけ破棄する。" },
      { term: "ヘルプタグ(プレーン相当)", desc: "要素にポインターを重ねると出る、文字だけの短い説明。macOSなどポインターを使える環境向け。" },
      { term: "TipKit の Tip(リッチ相当)", desc: "タイトル・メッセージ・任意の画像・アクションボタンを持てる、新機能の紹介などに使うフレームワーク。画面に埋め込む「インライン形式」と、UIに重ねる「ポップオーバー形式」がある。" },
    ],
    stance:
      "ヘルプタグは、コンポーネントの使い方を短く説明する一時的な表示。まだ気づかれていない新機能や、より速く目的を果たせる使い方を紹介するなら、別フレームワークTipKitのTip(タイトル・メッセージ・任意の画像)を使う。Tipを、機能を使うたびに出す・操作の案内にする・宣伝に使う、のは避ける。Tipには、レイアウトを押し広げて周りのUIを隠さない「インライン形式」(基本はこちら)と、画面に重ねる「ポップオーバー形式」(隠れてもよい場合向け。矢印で対象を示せるため画像は入れないほうがよい)がある。",
    exceptions:
      "ヘルプタグはポインター前提のため、タッチだけの環境(iPhoneなど)では基本的に使えない。",
    accessibility: <span><NoData>記載なし。</NoData>Tipは、閉じるボタンを押すか、機能を使ったことによるプログラムでの無効化で消える。</span>,
    scenarios: [
      "ポインターを使える環境(Macなど)で、使い方を短く補いたい時(ヘルプタグ)",
      "気づかれていない新機能や、より速い操作方法を紹介したい時(TipKitのTip)",
      "周りのUIを隠したくないならインライン形式、隠れてもよいならポップオーバー形式のTipを使う時",
    ],
    useCases: [
      "ポインターを使える環境(Macなど)で、使い方を短く補う(ヘルプタグ)",
      "気づかれていない新機能・便利な使い方の紹介にはTipKitのTip(タイトル+メッセージ+任意の画像+アクションボタン)を使う",
      "Tipを、機能を使うたびに出したり、操作の案内や宣伝に使ったりしない",
    ],
    searchHint: "help tag",
    url: "https://developer.apple.com/design/human-interface-guidelines/offering-help#macOS-visionOS",
    refs: [
      { label: "Offering help(Tooltips・Tips)", url: "https://developer.apple.com/design/human-interface-guidelines/offering-help#macOS-visionOS" },
      { label: "HIG Offering help ― Creating tips(TipKit)", url: "https://developer.apple.com/design/human-interface-guidelines/offering-help#Creating-tips" },
      { label: "HIG Popovers(メモ参照)", url: "https://developer.apple.com/design/human-interface-guidelines/popovers" },
      { label: "補足(実装): UIKit ― ヘルプタグ(ツールチップ)", url: "https://developer.apple.com/documentation/uikit/showing-help-tags-for-views-and-controls-using-tooltip-interactions" },
      { label: "補足(実装): TipKit", url: "https://developer.apple.com/documentation/tipkit" },
      { label: "補足(実装): Highlighting app features with TipKit", url: "https://developer.apple.com/documentation/tipkit/highlightingappfeatureswithtipkit" },
    ],
    confirmedNote: "TipKitの公式リファレンス(developer.apple.com/documentation/TipKit、/HighlightingAppFeaturesWithTipKit)は本文を直接取得して確認済み(2026-09)。Tipの構成要素・インライン/ポップオーバー2形式の使い分け・乱用を避けるべきという指針を直接確認・反映。ツールチップ(ヘルプタグ)はHIG Offering helpの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="40" viewBox="0 0 120 40">
          <rect x="30" y="2" width="60" height="16" rx="4" fill="#171B36" />
          <text x="60" y="13" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ヘルプタグ</text>
          <polygon points="55,18 65,18 60,24" fill="#171B36" />
          <circle cx="60" cy="32" r="7" fill="none" stroke="#C2542A" strokeWidth="1.6" />
        </svg>
      </div>
    ),
    illustrationNote: "ポインターホバーで現れる短い説明(ヘルプタグ、概念図)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Tooltips(プレーン/リッチ)",
    term: "Tooltip(プレーン・リッチ)",
    color: "#2F7D6E",
    position: <>アイコンだけのボタンなどにラベルを補う<Hl>「プレーンツールチップ」と、見出し・リンク・ボタンを持てる「リッチツールチップ」の2種類</Hl>。文字のラベルがある要素にプレーンツールチップは不要。</>,
    size: "境界のある要素(ボタンなど)から4dp、境界のない要素(テキストのベースラインなど)から8dp離す。画面の端にはみ出すなら8dp刻みで位置を調整する。",
    colorInfo: "色の値はデザイントークンで実装する。",
    glossary: [
      { term: "プレーンツールチップ", desc: "アイコンだけのボタンなど、文字のない要素にラベルを補う、文字だけの短いツールチップ。" },
      { term: "リッチツールチップ", desc: "小見出し・本文・2つまでのボタン・ハイパーリンクを入れられるツールチップ。定義や機能の値の説明など、プレーンより詳しい情報に使う。" },
    ],
    stance:
      "プレーンは、アイコンだけのボタンなど文字のない要素を短く説明する。リッチは定義や機能の値など長めの説明に向き、小見出しは1行程度、ボタンは横に並べられるよう短くする。重要な情報をツールチップだけに隠さず、その場合は割り込み型のダイアログを使う。アイコンボタンに常にツールチップを出す使い方は避ける。",
    exceptions:
      "リッチツールチップは通常、対象から離れると1.5秒後に自動で消え、新しいツールチップを出すとほかはすぐ閉じる。(1)親要素をクリックしたとき、(2)ページを開いたときに新機能を紹介するときは「永続的なリッチツールチップ」になり、対象から離れても残り、別のUI要素を操作するまで消えない(マウスを重ねても出ない)。",
    scenarios: [
      "アイコンだけのボタンなど、文字のない要素の意味を補いたい時(プレーン)",
      "定義や機能の値など、詳しい補足を出したい時(リッチ)",
      "新機能の紹介など、ページを開いたときに説明を出し続けたい時(永続的なリッチツールチップ)",
    ],
    accessibility:
      "操作可能(Operable) ― 支援技術の利用者がメッセージを受け取れ、キーボードやスイッチ入力でツールチップを出せること。堅牢(Robust) ― ツールチップであることを支援技術に伝える。リッチツールチップの中のフォーカスは操作できる要素を上から下へたどるが、スクリーンリーダーやキーボードのフォーカスが中に閉じ込められないようにし、ページの残りを直線的に移動できるようにする。",
    useCases: [
      "アイコンだけのボタンなど文字のない要素には、プレーンツールチップでラベルを補う",
      "定義や機能の値など詳しい情報には、リッチツールチップ(小見出し・リンク・2つまでのボタン)を使う",
      "重要な情報をツールチップだけに隠さず、必要なら割り込み型のダイアログを使う",
      "デスクトップではホバー、モバイルでは長押しでトリガーする。永続的なリッチツールチップはクリック/タップ時のみ表示する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/tooltips/guidelines",
    refs: [
      { label: "Tooltips(プレーン/リッチ)", url: "https://m3.material.io/components/tooltips/guidelines" },
    ],
    confirmedNote: "M3の公式ページ本文(m3.material.io「Tooltips」のガイドライン)で、プレーン/リッチの使い分け・配置(4dp/8dpの距離、画面端での8dp調整)・行動(1.5秒での自動消去、永続的なリッチツールチップの条件)・アクセシビリティ要件を2026-09に直接確認・反映。カラートークンの具体的な数値、最大幅の正確なdp数値は本文中の表形式部分が今回のテキスト抽出で再現できず未確認。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="40" viewBox="0 0 120 40">
          <rect x="20" y="2" width="80" height="16" rx="4" fill="#2F7D6E" />
          <text x="60" y="13" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">アイコンの説明</text>
          <polygon points="55,18 65,18 60,24" fill="#2F7D6E" />
          <circle cx="60" cy="32" r="7" fill="#EEF1FA" stroke="#2F7D6E" strokeWidth="1.6" />
        </svg>
      </div>
    ),
    illustrationNote: "プレーンツールチップ(概念図)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.13 Content on Hover or Focus(主な根拠)/ APG Tooltip Pattern(検討中のパターン)",
    term: "ツールチップ(WAI-ARIAの役割)",
    color: "#A3821F",
    position: <>ホバーやフォーカスで出る内容は、<Hl>消せる・ポインターを移しても消えない・勝手に消えない、の3点</Hl>を満たす(1.4.13・レベルAA)</>,
    size: "専用の数値基準はない。きっかけになる要素には、一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "専用の色の基準はない。境界線などには1.4.11(非テキストのコントラスト)がかかり得る。",
    glossary: [
      { term: "1.4.13 Content on Hover or Focus・レベルAA", desc: "ホバーやフォーカスで出る内容に、ポインターを動かさずに消せる(Escなど)、内容の上にポインターを移しても消えない、離れるか消すまで勝手に消えない、の3点を求める。" },
      { term: "ツールチップの役割", desc: "ツールチップであることを支援技術に伝える役割。ツールチップ自体はフォーカスを受け取らず、きっかけの要素の説明として読み上げられる。" },
    ],
    stance:
      "主な根拠は1.4.13(ホバー又はフォーカスで表示されるコンテンツ・レベルAA)。ツールチップは、①ポインターを動かさずに消せる(Escキーなど)、②上にポインターを移しても消えない、③ホバーやフォーカスを外すか消すまで勝手に消えない、の3点を満たす。参考として、APGのTooltipパターン(検討中)が、きっかけの要素の説明として結び付けること、Escで閉じること、フォーカスはきっかけの要素に留めることを示している。ツールチップ自体はフォーカスを受け取らない。",
    exceptions:
      "リンクやボタンなど操作できる内容を入れるなら、ツールチップではなく非モーダルなダイアログを使う。このパターンは、ワーキンググループでまだ合意に至っていない検討中のもの。",
    scenarios: [
      "ホバーやフォーカスで補足を表示し、1.4.13の3点(消せる・上に移っても消えない・勝手に消えない)を満たしたい時",
      "キーボードのフォーカスかマウスのホバーで、少し遅らせて補足を出したい時",
      "操作できる内容(リンク・ボタンなど)を入れたいなら非モーダルなダイアログにする",
    ],
    accessibility:
      "知覚可能(Perceivable)・操作可能(Operable)・堅牢(Robust) ― 1.4.13は「知覚可能」。フォーカスとホバーの両方で出すことと、Escapeキーで閉じることは「操作可能」、きっかけの要素との結び付けは「堅牢」。",
    useCases: [
      "ポインターを動かさずに消せる(Escなど)・ツールチップの上にポインターを移しても消えない・勝手に消えない、の3点を満たす(1.4.13)",
      "ツールチップを、きっかけの要素の説明として支援技術に結び付ける(APG)",
      "キーボードのフォーカスとマウスのホバーの両方で出せるようにする",
      "操作できる内容(リンク・ボタンなど)を入れたいなら非モーダルなダイアログにする",
    ],
    searchHint: "dismissible",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html",
    refs: [
      { kind: "sc", level: "AA", label: "1.4.13 ホバー又はフォーカスで表示されるコンテンツ", url: "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html" },
      { kind: "apg", label: "APG: Tooltip Pattern(検討中)", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="40" viewBox="0 0 120 40">
          <rect x="20" y="2" width="80" height="16" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="13" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">説明として結び付ける</text>
          <polygon points="55,18 65,18 60,24" fill="none" stroke="#A3821F" strokeWidth="1.2" />
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Tooltip Guidelines",
    term: "Tooltip",
    color: "#7A4F7E",
    position: "補足の説明だけに使う、マイクロコンテンツ(短く完結した文)。数値基準ではなく使い分けの指針",
    size: <NoData>数値基準なし</NoData>,
    colorInfo: "背景との適度なコントラストを求めるが、数値基準はない。",
    stance:
      <>タスクに必須ではない補足の説明に最も向く。<Hl>タスクに欠かせない情報をツールチップだけで伝えない</Hl>。ツールチップは「マイクロコンテンツ」(短く完結した文の断片)にし、冗長・自明・長すぎる内容は避ける。マウスのホバーかキーボードのフォーカスで出す。キーボードでも出せないと、キーボードで操作する人を締め出す。</>,
    scenarios: [
      "慣れない入力項目の意味を説明したい時",
      "一見不自然に見える要求の理由を示したい時",
    ],
    exceptions:
      "タッチスクリーンでは使えない。要素が密集しているなら、どの要素の説明かが分かるよう矢印で方向を示す。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、補足情報の使いどころの指針。「マウスだけでなくキーボードでも出せるようにする」は、W3Cのフォーカスで出す要件と同じ方向。",
    useCases: [
      "慣れない入力項目の説明や、一見不自然な要求の理由を補足する(タスク必須の情報には使わない)",
      "マウスのホバーだけでなく、キーボードのフォーカスでも出せるようにする",
      "要素が密集するなら矢印で方向を示す",
    ],
    searchHint: "microcontent",
    url: "https://www.nngroup.com/articles/tooltip-guidelines/",
    refs: [
      { label: "Tooltip Guidelines", url: "https://www.nngroup.com/articles/tooltip-guidelines/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="40" viewBox="0 0 120 40">
          <rect x="20" y="2" width="80" height="16" rx="4" fill="#7A4F7E" />
          <text x="60" y="13" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">補足の説明</text>
          <polygon points="55,18 65,18 60,24" fill="#7A4F7E" />
        </svg>
      </div>
    ),
    illustrationNote: "マイクロコンテンツとしてのツールチップ(概念図)",
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

function TooltipSwatch() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 28 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={styles.swatchTypeLabel}>プレーン</span>
        <div style={{ width: 180, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ background: "#2E3457", color: "#FFFFFF", fontSize: 12, padding: "6px 12px", borderRadius: 6, fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>
            画像を検索
          </div>
          <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #2E3457" }} />
          <div style={{ width: 30, height: 30, borderRadius: 6, border: "1.6px solid #9EA4C4", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🔍</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={styles.swatchTypeLabel}>リッチ</span>
        <div style={{ width: 210, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 8, boxShadow: "0 2px 8px rgba(23,27,54,0.08)", padding: "10px 14px", width: "100%" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#171B36", marginBottom: 3, fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>お気に入りに追加</div>
            <div style={{ fontSize: 10.5, color: "#565D8A", lineHeight: 1.5, marginBottom: 6, fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>お気に入りは常にリストの先頭に表示されます</div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: "#666D93" }}>閉じる</span>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#3A4FCF" }}>試してみる</span>
            </div>
          </div>
          <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "5px solid #E1E3F0", marginTop: -1 }} />
          <div style={{ width: 30, height: 30, borderRadius: 6, border: "1.6px solid #9EA4C4", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>⭐</div>
        </div>
      </div>
    </div>
  );
}

const PLAIN_RICH_ROWS = [
  {
    key: "hig",
    name: "Apple",
    plain: "ヘルプタグ ― ポインターホバーで現れる文字のみの短い説明(Mac等ポインター操作向け)",
    rich: "TipKitのTip ― タイトル+メッセージ+任意の画像+アクションボタン。新機能紹介などに使う独立フレームワークで、インライン/ポップオーバーの2形式を持つ。押して開く補足や操作には、出どころを指す矢印とともに出るポップオーバー(Popovers。主にiPad向けで、ボタンなども置ける)もある",
  },
  {
    key: "material",
    name: "Google",
    plain: "プレーンツールチップ ― アイコンのみのボタン等、文字を持たない要素にラベルを補う",
    rich: "リッチツールチップ ― 小見出し+本文+最大2つのボタン+リンクを持てる。クリックで「永続的な表示」に切り替え可能",
  },
  {
    key: "wcag",
    name: "W3C",
    plain: "ツールチップ ― 操作できる要素を持たない補足の情報だけを想定するパターンとして定義",
    rich: <><NoData>定義なし</NoData> ― 対話的な内容(リンク・ボタン等)を含めたい場合は、ツールチップではなく非モーダルなダイアログを使うべきとしている</>,
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    plain: "マイクロコンテンツ(短い自己完結型テキスト)としての基本形のみを推奨",
    rich: <><NoData>定義なし</NoData> ― むしろ「長い/複雑な内容はもはやtipではない」「重要な情報をtipに隠すべきではない」と明確に戒めており、複雑な内容は隠さず可視化することを推奨している</>,
  },
];
markNeg(PLAIN_RICH_ROWS);

function PlainRichTable() {
  return (
    <div style={styles.prTableWrap}>
      <h2 style={styles.diagramTitle}>プレーン / リッチの立ち位置比較</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.prTable}>
          <thead>
            <tr>
              <th style={styles.prTableHeadCell}>系列</th>
              <th style={styles.prTableHeadCell}>プレーン(基本形)</th>
              <th style={styles.prTableHeadCell}>リッチ(拡張・代替パターン)</th>
            </tr>
          </thead>
          <tbody>
            {PLAIN_RICH_ROWS.map((r) => (
              <tr key={r.key}>
                <td style={styles.prTableNameCell}>{r.name}</td>
                <td style={styles.prTableCell}>{r.plain}</td>
                <td style={styles.prTableCell}>{r.rich}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={styles.prTableNote}>
        Googleは「プレーン/リッチ」を公式に2種類のコンポーネントとして定義しているが、Appleは「ヘルプタグ」と「TipKit」という<strong>別フレームワーク</strong>として実装が分かれている。一方W3C・Nielsen Norman Groupは、ツールチップという1つのパターンに<strong>リッチな内容を持ち込むこと自体に慎重</strong>で、対話的・複雑な内容は非モーダルダイアログや可視化されたUIへ逃がすべきという立場を取っている。<strong>Googleのリッチツールチップ(ボタンやリンクを含められる)と、W3Cのツールチップ(操作できる要素を持たない補足の説明)は別のもの</strong>で、名前が同じでも同じコンポーネントとして扱わない(AI解釈)。
      </p>
    </div>
  );
}

/* 説明の出し方のイメージ(概念図)。screen=画面に書く、popup=「?」を押して開くヒント、tooltip=乗せる・フォーカスで出るツールチップ */
function TipIllust({ k }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 150 80" width="100%" style={{ display: "block", maxWidth: 160 }} role="img" aria-label={k === "screen" ? "入力欄の下に条件の説明が最初から書かれている図" : k === "popup" ? "「?」のアイコンを押すと、閉じるボタン付きのヒントが開く図" : "アイコンのボタンにポインターを乗せると、短い名前のツールチップが出る図"}>
      {k === "screen" && (
        <g>
          <text x="10" y="18" fontSize="8" fill="#454C78" fontFamily={font}>パスワード</text>
          <rect x="10" y="22" width="130" height="18" rx="3" fill="#FFFFFF" stroke="#B7BCDA" />
          <text x="10" y="54" fontSize="8" fill="#2E3457" fontFamily={font}>8文字以上・英字と数字を含める</text>
        </g>
      )}
      {k === "popup" && (
        <g>
          <text x="10" y="64" fontSize="8" fill="#454C78" fontFamily={font}>手数料</text>
          <circle cx="44" cy="61" r="6" fill="#3A4FCF" />
          <text x="44" y="64" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontFamily={font}>?</text>
          <rect x="30" y="6" width="112" height="40" rx="5" fill="#FFFFFF" stroke="#7E86AC" />
          <path d="M40 46 l4 6 4-6" fill="#FFFFFF" stroke="#7E86AC" />
          <text x="38" y="22" fontSize="7.5" fill="#2E3457" fontFamily={font}>振込1回ごとに110円</text>
          <text x="38" y="36" fontSize="7.5" fill="#2E3457" fontFamily={font}>かかります</text>
          <text x="134" y="17" fontSize="8" fill="#565D8A" textAnchor="middle" fontFamily={font}>×</text>
        </g>
      )}
      {k === "tooltip" && (
        <g>
          <rect x="20" y="44" width="28" height="28" rx="6" fill="#FFFFFF" stroke="#B7BCDA" />
          <path d="M28 52h12v12H28z M31 56h6M31 60h6" stroke="#454C78" fill="none" strokeWidth="1.2" />
          <path d="M42 62 l6 12 3-5 5 1z" fill="#171B36" />
          <rect x="34" y="14" width="64" height="20" rx="4" fill="#2E3457" />
          <text x="66" y="27" fontSize="8" fill="#FFFFFF" textAnchor="middle" fontFamily={font}>コピー</text>
        </g>
      )}
    </svg>
  );
}

/* No.058: NN groupによる、ツールチップとポップアップのヒントの違い */
const TT_VS_POPUP = [
  ["使える画面", "デスクトップ(マウスやキーボードがある画面)", "どの画面でも(スマートフォンのアプリでも)"],
  ["出すきっかけ", "マウスを乗せる・キーボードでフォーカスする", "押す(タップ・クリック)"],
  ["消えるとき", "決められた範囲からポインターが離れたとき", "閉じるを押すか、画面のほかの場所を押したとき"],
  ["組み合わせるコンポーネント", "アイコン・文字のリンク・ボタン・画像", "「?」や「i」のアイコン"],
  ["内容", "短い補足", "短い補足"],
];

function TooltipVsPopupTip() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>ツールチップとポップアップのヒント(Nielsen Norman Group)</h2>
      <p style={styles.tvpNote}><strong>スマートフォンなどタッチの画面では、マウスを乗せる操作がないため、ツールチップは基本的に使えない</strong>。同じ目的(短い補足を出す)には、「?」や「i」のアイコンを押して開くポップアップのヒントを使う。NN groupは、この2つを次のように区別している。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.tvpTable}>
          <thead><tr>{["", "ツールチップ", "ポップアップのヒント"].map((h) => (<th key={h} style={styles.tvpTh}>{h}</th>))}</tr></thead>
          <tbody>
            <tr><td style={{ ...styles.tvpTd, fontWeight: 700, whiteSpace: "nowrap" }}>イメージ</td><td style={styles.tvpTd}><TipIllust k="tooltip" /></td><td style={styles.tvpTd}><TipIllust k="popup" /></td></tr>
            {TT_VS_POPUP.map((r) => (<tr key={r[0]}><td style={{ ...styles.tvpTd, fontWeight: 700, whiteSpace: "nowrap" }}>{r[0]}</td><td style={styles.tvpTd}>{r[1]}</td><td style={styles.tvpTd}>{r[2]}</td></tr>))}
          </tbody>
        </table>
      </div>
      <p style={styles.tvpNote}>また、ツールチップは利用者が自分で出すもので、新機能の紹介などのために画面に勝手に出てくるヒントは、ツールチップではないとしている。一部のコンポーネントだけに補足が必要なときも、ツールチップではなくポップアップのヒントを使うよう勧めている(ツールチップはサイト全体で一貫して付けないと見つけてもらえないため)。出典: <a href="https://www.nngroup.com/articles/tooltip-guidelines/" target="_blank" rel="noreferrer" style={{ color: "#3A4FCF" }}>Tooltip Guidelines ↗</a></p>
    </section>
  );
}


/* 説明をどこに置くか(2026-11 ⑦本人レビューNo.058で追加) */
const PLACE_ROWS = [
  { k: "screen", where: "最初から画面に書く", what: "作業に欠かせない情報(入力の条件、取り消せない操作の注意など)", src: "NN group(ツールチップに必須の情報を入れない)・W3C 3.3.2(入力に必要な説明を示す)" },
  { k: "popup", where: "「?」「i」のボタンを押して開く", what: "一部の人だけが必要な補足。スマートフォンなどタッチの画面での補足", src: "NN group(ポップアップのヒント)・Apple(TipKitのTip)" },
  { k: "tooltip", where: "ツールチップ(乗せる・フォーカスで出す)", what: "知っている人には要らない短い補足(アイコンだけのボタンの名前など)。デスクトップ向け", src: "Google・Apple(macOS)・NN group" },
];
function TipPlacement() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>説明を画面に出すか、ボタンやツールチップに入れるか</h2>
      <p style={styles.tvpNote}>見落とされると困る情報ほど、最初から画面に出す。隠すほど、気づかれにくくなる。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.tvpTable}>
          <thead><tr>{["イメージ", "置き場所", "向いている情報", "根拠"].map((h) => (<th key={h} style={styles.tvpTh}>{h}</th>))}</tr></thead>
          <tbody>{PLACE_ROWS.map((r) => (<tr key={r.where}><td style={{ ...styles.tvpTd, width: 150 }}><TipIllust k={r.k} /></td><td style={{ ...styles.tvpTd, fontWeight: 700 }}>{r.where}</td><td style={styles.tvpTd}>{r.what}</td><td style={{ ...styles.tvpTd, color: "#565D8A" }}>{r.src}</td></tr>))}</tbody>
        </table>
      </div>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "マウスを乗せたりフォーカスしたりしたときに、短い説明を一時的に出すコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "アイコンだけのボタンなど、見ただけでは分かりにくいコンポーネントの名前や働きを補う" },
  { k: "よく使われる場面", v: "ツールバーのアイコンボタンの名前、略語や記号の説明" },
  { k: "似たコンポーネント", v: <>押して開く詳しい説明や操作を含むなら<PageLink to="/components/containment/side-sheet">サイドシート</PageLink>などのポップオーバー。必ず読ませたい情報は画面に直接書く</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "タッチの画面(スマートフォン)で、ツールチップを使う?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "使う。デスクトップではポインターを重ねる、モバイルでは要素を長押しすると出る" },
      { who: "NN group", color: "#7A4F7E", t: "タッチの画面では使えない。「?」「i」などを押して開くポップアップのヒントにする" },
      { who: "Apple", color: "#C2542A", t: "ツールチップはmacOS(iPhone・iPadのアプリをMacで動かす場合を含む)のもの。iPhoneで新機能を知らせるならTipKitのTipを使う" },
    ],
    tip: "スマートフォンでは、長押しで出す(Google)、「?」などの印を押すと開くヒント(NN group・AppleのTip)、常に見える補足、から選べる。長押しは気づかれにくいため、説明が欠かせないなら押すと開くヒントか常に見せる形が確実だ。デスクトップではツールチップを使い、キーボードのフォーカスでも出るようにする(W3C 1.4.13。ホバー・フォーカスで出る内容の基準で、タッチ操作の決まりではない)。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "アイコンだけのボタンの名前など、短い補足に使う", d: "", who: "Google" },
  { n: 2, t: "重要な情報を隠さない", d: "", who: "NN group" },
  { n: 3, t: "キーボードのフォーカスでも出るようにする", d: "", who: "W3C(1.4.13・APGのTooltipパターン)" },
  { n: 4, t: "スマートフォンでは「?」などの印を置き、押すと開くヒントにする", d: "", who: "NN group・Apple" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
      title="良い例・悪い例 ― ツールチップに入れる内容"
      items={[
        { kind: "good", fig: <><span style={{ background: "#2E3457", color: "#FFFFFF", fontSize: 12, borderRadius: 4, padding: "4px 8px", maxWidth: 200, lineHeight: 1.5 }}>通知</span><span style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #8E93B5", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20h4" fill="none" stroke="#2E3457" strokeWidth="1.8" strokeLinejoin="round" /></svg></span><span style={{ fontSize: 11, color: "#454C78", fontFamily: "'IBM Plex Mono', monospace" }}>ホバーでもフォーカスでも出る</span></>, text: "アイコンだけのボタンに、短い補足(名前)が出る。ポインターを重ねたときも、キーボードでフォーカスしたときも出る。" },
        { kind: "bad", fig: <><span style={{ background: "#2E3457", color: "#FFFFFF", fontSize: 12, borderRadius: 4, padding: "4px 8px", maxWidth: 200, lineHeight: 1.5 }}>8文字以上で、数字と記号を含めてください</span><div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 150, border: "1.5px solid #8E93B5", borderRadius: 4, padding: "6px 8px", fontSize: 12, color: "#666D93" }}>パスワード</span><span aria-hidden="true" style={{ width: 18, height: 18, borderRadius: "50%", border: "1.5px solid #454C78", fontSize: 11, color: "#454C78", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>i</span></div></>, text: "入力の条件のような、操作に欠かせない説明がツールチップの中にしかない。出すまで気づけない。" },
      ]}
      basis="NN group・Google(重要な情報をツールチップだけに隠さない)、W3C 1.4.13(ホバーやフォーカスで出る内容は、消せる・上に移っても消えない・勝手に消えない・AA)、APGのTooltipパターン(キーボードのフォーカスでも出す。参考例)。"
    />
  );
}

export default function CommunicationTooltipPage() {
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
        <SidebarNav currentPath="/components/communication/tooltip" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ツールチップ</span>
            <span>SPEC No. 032</span>
          </div>

          <h1 style={styles.title}>ツールチップ</h1>
          <SummaryCard keyPoints={KP}
            image={<><TooltipSwatch /></>}
            imageNote={<>プレーン(左): ホバー/フォーカスで出る短い補足。リッチ(右): 見出し・本文・ボタンを持てる詳しい説明。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <PlainRichTable />
          <GoodBadFigure />


          <TipPlacement />
          <TooltipVsPopupTip />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              ツールチップは、<strong>マウスを乗せる・フォーカスするときだけ出て、離れると消える補足</strong>。消えてしまうため、<strong>作業に欠かせない情報は入れない</strong>(NN group)。マウスだけでなく<strong>キーボードのフォーカスでも出し</strong>、乗せている間は勝手に消さない(W3C 1.4.13)。
            </p>
            <p style={styles.synthesisText}>
              GoogleとAppleは、詳しい説明やボタンを持てる形も用意している(Googleはリッチツールチップ、AppleはTipKitのTip)。W3CとNN groupは、<strong>操作を含む内容はツールチップに入れず</strong>、押して開くヒントやダイアログにする立場。
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
                <div style={styles.sourceStance}>{s.stance}</div>
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

          <RelatedPages paths={["/components/communication/overview", "/tokens/icon", "/components/containment/overview", "/tokens/input-methods"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["段階的に見せる", "見つけやすさ・初めての案内"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  tvpNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 10px" },
  tvpTable: { width: "100%", minWidth: 600, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457", marginBottom: 10 },
  tvpTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  tvpTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  swatchTypeLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 700, color: "#565D8A", letterSpacing: 0.3 },
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
  prTableWrap: { marginBottom: 22 },
  prTable: { borderCollapse: "collapse", width: "100%", minWidth: 640, border: "1px solid #E1E3F0" },
  prTableHeadCell: { textAlign: "left", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", background: "#F8F9FD", padding: "9px 12px", borderBottom: "1px solid #E1E3F0", borderRight: "1px solid #E1E3F0" },
  prTableNameCell: { fontWeight: 600, fontSize: 12.5, color: "#171B36", padding: "10px 12px", borderBottom: "1px solid #E1E3F0", borderRight: "1px solid #E1E3F0", verticalAlign: "top", whiteSpace: "nowrap" },
  prTableCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", padding: "10px 12px", borderBottom: "1px solid #E1E3F0", borderRight: "1px solid #E1E3F0", verticalAlign: "top" },
  prTableNote: { fontSize: 11, color: "#666D93", lineHeight: 1.7, margin: "10px 0 0" },
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
