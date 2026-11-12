import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / ボトムシート」ページ。
 *
 * 2026-09 新規作成の経緯: 「モーダルポップアップ」ページ(現「サイドシート」ページ)が、
 * 性質の異なる2つのパターン(下からせり出す半モーダルの「ボトムシート」と、画面を覆う/
 * 中央に出るモーダル)を1ページに混在させていたため、ユーザーの了承のもとページ単位で
 * 分割した(タブ vs セグメントコントロール、ナビゲーションバー vs アプリバーと
 * 同じ考え方)。「サイドシート」ページ側はPopover/Side sheet中心の内容に絞り、
 * ボトムシート関連の内容をこのページに切り出している。
 *
 * Google欄はユーザー提供の公式ドキュメント(MD3_text/bottomsheets.docx)により
 * 直接確認・全面更新(2026-09)。Nielsen Norman Group(Bottom Sheets: Definition
 * and UX Guidelines)は公式記事本文を直接取得して確認済み(2026-09)。Apple
 * (HIG Sheets)は公式サイトがクライアント側レンダリングのSPAで本文を直接取得
 * できなかったため、検索結果による間接確認(2026-09)。W3Cは、ボトムシート専用の
 * ARIAパターンが存在しないため、モーダル/非モーダルの実装をDialog (Modal)
 * Patternとの対比で整理した内容(検索結果による確認)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Sheets(デタント)",
    term: "Sheet",
    color: "#C2542A",
    position: "大(large)・中(medium)の2段階の高さ(デタント)で止まるシート。iOS・iPadOSではモーダルにも非モーダルにもできる",
    size:
      "大デタントは開いたときの全高、中デタントはおよそ半分の高さ。既定は大デタントだけで、中を加えると両方の高さで止まれる。中だけを指定すると全高までは開けない。",
    colorInfo: <NoData>記載なし</NoData>,
    glossary: [
      { term: "デタント(detent)", desc: "シートが止まる高さの段階。大デタントは全高、中デタントは約半分の高さ。" },
      { term: "グラバー(grabber)", desc: "シートの上端の小さな横線。ドラッグして高さを変えられることを示す。" },
    ],
    stance:
      "シートは、今の画面に関係する、範囲を限った作業(ファイルの添付や保存先の選択など)をしてもらい、終わったら元の画面に戻るためのもの。iOS・iPadOSではモーダルにも非モーダルにもでき、非モーダルのシート(メモの書式設定など)は開いたまま元の画面を操作できる。高さを変えられるシートにはグラバー(上端の小さな横線)を付け、縦のスワイプで閉じられるようにする。",
    scenarios: [
      "今の画面に深く関係する、範囲を限った作業をしてもらいたい時",
      "内容のスクロールやグラバーのドラッグで、高さを調整させたい時",
    ],
    exceptions:
      "中デタントだけを指定すると、それ以上(全画面)には開けない。メインの画面から出すシートは一度に1枚にし、シートから別のシートを出すときは最初のシートを閉じてから出す。長く複雑な作業には、シートではなく全画面のモーダルなどを検討する。",
    accessibility:
      <span><NoData>記載なし。</NoData></span>,
    useCases: [
      "今の画面に関係する、範囲を限った作業に使う(既定はモーダル)",
      "大デタントだけか、大+中かで高さの動きを選ぶ",
      "内容のスクロールかグラバーのドラッグで、高さを変えられるようにする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/sheets",
    refs: [
      { label: "Sheets(デタント)", url: "https://developer.apple.com/design/human-interface-guidelines/sheets" },
    ],
    confirmedNote: "HIG Sheetsの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#C2542A" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="14" y="20" width="92" height="44" rx="8" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <rect x="46" y="26" width="28" height="4" rx="2" fill="#C2542A" opacity="0.4" />
        <text x="60" y="48" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">中デタント</text>
      </svg>
    ),
    illustrationNote: "グラバーをドラッグして高さ(デタント)を変える(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Bottom sheets(標準/モーダル)",
    term: "Bottom sheet(標準・モーダル)",
    color: "#2F7D6E",
    position: "コンパクト・ミディアムのブレークポイントで使う画面下部のシート。標準(メイン領域と共存)とモーダル(後ろの操作を完全に止める)の2種類",
    size:
      "最初の高さは、上の操作に届くよう画面の高さの50%まで。内容が50%を超えるなら、画面全体に伸び、中のスクロールで残りに届く。上の48dpの領域は大きさを変えるための操作領域で、ドラッグハンドルが出ていれば利用者が大きさを変えられる。",
    colorInfo: "色の値はデザイントークンで実装する。モーダルはスクリム(幕)の上に出し、標準にはスクリムがない。それ以外の仕様は共通。",
    glossary: [
      { term: "標準 / モーダルボトムシート", desc: "標準はメインのUI領域と共存し、両方を同時に見て操作できる。モーダルはアプリの内容の手前に出て、出ている間はほかのすべての機能を無効にし、確認・閉じる・必要な操作をするまで残る。" },
    ],
    stance:
      <>標準ボトムシートは、<Hl>画面のメインUI領域と共存</Hl>し、特にメインの領域を頻繁にスクロール・パンするとき、両方を同時に見て操作できるようにする。モーダルはダイアログと同じく内容の手前に出て、出ている間はほかのすべての機能を無効にし、確認・閉じる・必要な操作をするまで残る。</>,
    scenarios: [
      "音楽プレーヤーのように、主な内容を補う内容を出したい時(標準。全画面のときはアプリバーに折りたたみアイコンを出す)",
      "操作の項目が多く、詳しい説明やアイコンが要るメニューを出したい時(モーダル。モバイルアプリのみ)",
    ],
    exceptions:
      "必須なのはコンテナだけで、項目の一覧(任意)とメディア(任意: サムネイル・画像・動画)を入れられる。ボタンやオーバーフローアイコンを押すと出て、項目を押す・画面を押す・下にスワイプする・アプリバーの閉じる、のどれかで隠せる(全画面のモーダルには閉じるボタンを出す)。折りたたみ/展開を切り替えられ、ドラッグハンドルのドラッグか選択で高さを変える。ハンドルを選ぶと決まった高さの切り替えか閉じる動作、スクリムを選ぶといつも閉じる。決まった高さが複数あってハンドルを使えない場合は、高さを変える単一ポインターの代わりの手段を必ず入れる。コンパクトなブレークポイントでは幅いっぱい、中〜拡張では既定で最大幅を設ける(上書きできる)。複雑な作業には、フローティングシートなど一時的でないサーフェスを検討する。Androidの「予測型の戻る」ジェスチャーにも対応する。",
    accessibility:
      "操作可能(Operable) ― 上の48dpは大きさを変えるための操作領域。ドラッグハンドル(任意)はタブ順でフォーカスでき、キーボードやスイッチなどタッチ以外でも操作できる。ドラッグでできる操作には、すべて単一ポインターの代わりの操作を入れる(W3Cの2.5.7 ドラッグ動作と同じ考え方)。",
    useCases: [
      "主な内容と同時に操作したい補助の機能には標準を使う(例: 音楽プレーヤー)",
      "選択や確認が済むまで後ろの操作を止めたいならモーダルを使う(モバイルアプリのみ)",
      "ドラッグハンドルで高さを変える操作には、単一ポインターの代わりの手段を必ず用意する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/bottom-sheets/guidelines",
    refs: [
      { label: "Bottom sheets(標準/モーダル)", url: "https://m3.material.io/components/bottom-sheets/guidelines" },
    ],
    confirmedNote: "M3の公式ページ本文(m3.material.io「Bottom sheets」のガイドライン)で、使用法・構成要素(アナトミー)・可視性・表示/非表示のトリガー・レスポンシブレイアウト・行動(拡張・カスタムポジショニング・予測戻る)・アクセシビリティの各セクションを2026-09に直接確認・反映。具体的なコンテナ幅などのdp数値は文書内に記載がなく未確認。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#2F7D6E" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="14" y="30" width="92" height="34" rx="8" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <rect x="46" y="35" width="28" height="4" rx="2" fill="#2F7D6E" opacity="0.4" />
        <text x="60" y="52" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ボトムシート</text>
      </svg>
    ),
    illustrationNote: "画面下部から現れる補助コンテンツ用シート(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― Dialog (Modal) Patternとの対比(専用パターンなし) / WCAG 2.5.7",
    term: "dialog(モーダルの場合。専用のロールなし)",
    color: "#A3821F",
    position: "専用のロール・パターンはなく、モーダルか非モーダルかで当てはめる考え方が変わる",
    size: "専用の数値基準はない。閉じるボタンなどの操作要素には一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "色の基準はない。グラバーや境界線には1.4.11(非テキストのコントラスト)がかかり得る。",
    stance:
      "後ろの操作を完全に遮るモーダルなシートには、WAI-ARIAのDialog (Modal) Patternが合う。role=\"dialog\"とaria-modal=\"true\"を設定し、Tab/Shift+Tabでシートの外にフォーカスが出ないようにし(フォーカストラップ)、Escキーで閉じられるようにする。2.5.7(ドラッグ動作・レベルAA)により、ドラッグしないと高さを変えられない作りにせず、グラバーを押すと高さが切り替わる、などドラッグ以外の方法も用意する。",
    scenarios: [
      "後ろの操作を完全に遮るモーダルなシートを作る時",
      "後ろの内容を操作できるまま残す非モーダルなシート(Googleの「標準」に相当)を作る時",
    ],
    exceptions:
      "後ろを完全に遮り、見た目でも覆っていないなら、aria-modal=\"true\"を設定しない。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― モーダルならフォーカストラップ・Escキー・ラベル付け(4.1.2、2.1.1)、非モーダルなら後ろの操作を妨げない実装。ドラッグ以外の操作方法(2.5.7)も「操作可能」の基準。",
    useCases: [
      "後ろを完全に止めるシートにはrole=\"dialog\"+aria-modal=\"true\"を使う",
      "後ろを操作できるシートではaria-modalを設定しない",
      "ドラッグしなくても高さを変えられるようにする(グラバーのタップで切り替えるなど。2.5.7)",
    ],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    refs: [
      { kind: "apg", label: "APG: Dialog Modal Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" },
      { kind: "sc", level: "AA", label: "2.5.7 ドラッグ動作", url: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="38" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-modal?</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、モーダル/非モーダルで異なる役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Bottom Sheets: Definition and UX Guidelines",
    term: "Bottom sheet",
    color: "#7A4F7E",
    position: "モバイルの画面下部に固定され、段階的に情報を見せる、短い利用向けのオーバーレイ(数値基準ではなく実装の指針)",
    size: "モバイルの押せる範囲の一般の目安に触れるが、ボトムシート専用の数値ではない。",
    colorInfo: <NoData>数値基準なし</NoData>,
    stance:
      "モバイルの画面下端に固定され、追加の詳細・操作を出すオーバーレイと定義する。モーダルは操作するか閉じるまで後ろとのやり取りを遮り、非モーダルは後ろの内容と並行して操作できる。",
    scenarios: [
      "短く済む追加の詳細・操作を出したい時(複雑な内容や長い閲覧には向かない)",
    ],
    exceptions:
      "実装の注意は3つ。(1) 標準の「戻る」操作と一貫させる。(2) 閉じる操作をグラバーだけに頼らず、上部にはっきりした×か閉じるボタンを置く(アクセシビリティと操作の確実さのため)。(3) シートを重ねない(現在位置が分かりにくく、誤操作を招くため)。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、実装の注意点。閉じるボタンを示す・戻る操作と一貫させる・重ねない、が支援技術の利用者にも操作の確実さをもたらす。",
    useCases: [
      "短い追加の情報・操作に使う(長い閲覧や複雑な内容には使わない)",
      "グラバーだけでなく、はっきりした閉じるボタンを上部に置く",
      "シートを重ねない",
    ],
    searchHint: "Do Not Stack Bottom Sheets",
    url: "https://www.nngroup.com/articles/bottom-sheet/",
    refs: [
      { label: "Bottom Sheets: Definition and UX Guidelines", url: "https://www.nngroup.com/articles/bottom-sheet/" },
    ],
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#7A4F7E" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="14" y="30" width="92" height="34" rx="8" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <circle cx="98" cy="36" r="6" fill="none" stroke="#7A4F7E" strokeWidth="1.4" />
        <text x="98" y="39" fontSize="8" fill="#7A4F7E" textAnchor="middle">✕</text>
        <text x="55" y="52" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">短時間の操作</text>
      </svg>
    ),
    illustrationNote: "グラバーだけでなく明確な閉じるボタンを併設(概念図・系列識別色)",
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

function BottomSheetSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto", position: "relative", height: 100 }}>
      <div style={{ position: "absolute", inset: 0, background: "#F0F4F8", borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 20, right: 20, bottom: 0, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: "10px 10px 0 0", padding: "10px 14px 14px", boxShadow: "0 -4px 14px rgba(23,27,54,0.10)" }}>
        <div style={{ width: 28, height: 4, borderRadius: 2, background: "#D5D9EC", margin: "0 auto 8px" }} />
        <div style={{ fontSize: 11.5, color: "#454C78" }}>下からせり出す半モーダル</div>
      </div>
    </div>
  );
}

/* No.048: モーダルにするかどうかの選び方と、閉じ方(ドラッグハンドル・×ボタン) */
const MODAL_CHOICE = [
  { t: "非モーダル(後ろの画面も操作できる)", when: "後ろの画面を見ながら、補助の情報や操作を使いたいとき", ex: "地図の場所の詳細(地図は動かせる)、音楽プレーヤー、メモの文字の書式", src: "Google(標準)・Apple(iOS・iPadOSの非モーダルのシート)・NN group" },
  { t: "モーダル(答えるか閉じるまで後ろは操作できない)", when: "選択肢に集中させたいとき、対応しないと先へ進めないとき", ex: "ファイルの操作メニュー、共有先の選択、接続の問題を直すお願い", src: "Google(モバイルのみ。操作の項目が多いときは、インラインのメニューや簡単なダイアログの代わりに勧める)・NN group" },
  { t: "広げると全画面になる", when: "最初は小さく出し、必要なら広げて詳しく見せたいとき", ex: "再生中のエピソードの小さなシートを、上へ引いて全画面に", src: "NN group(小さいときは非モーダル、広げるとモーダルになることが多い)" },
  { t: "シートを使わない", when: "長い作業や、じっくり読む内容", ex: "複数ステップの編集、長い記事", src: "Apple(全画面のモーダルや別のウィンドウを検討)・NN group(短い操作だけに使う)" },
];
const CLOSE_ROWS = [
  ["ドラッグハンドル(グラバー)", "上部の48dpを高さを変える操作の領域にできる。ドラッグか、選ぶ操作で決まった高さへ切り替えたり閉じたりする。ドラッグできない人のため、選ぶだけで次の高さに切り替わるようにする(キーボード・スイッチでもフォーカスできる)", "上端の小さな横線(グラバー)をドラッグすると広がる。止まる高さ(デタント)は、ほぼ全体のlargeと、その半分ほどのmedium", "見落とされやすい。下へなぞる操作は、場所によって通知の画面を開いてしまうなど、あいまいになりやすい"],
  ["×・閉じるボタン", "全画面のモーダルのボトムシートには閉じるボタンを出す", "キャンセル(閉じる)は保存せずに閉じ、完了は作業を終えて閉じる。完了だけにせず、キャンセルか戻るを組み合わせる", "ハンドルだけに頼らず、上部に見える×(または「閉じる」)を置く。スクリーンリーダーやキーボードの利用者にも閉じ方が分かる"],
  ["そのほかの閉じ方", "項目を選ぶ、後ろ(スクリム)をタップ、下へなぞる、シートのアプリバーの閉じるボタン。Androidの「予測型の戻る」操作", <NoData>記載なし</NoData>, "端末の戻るボタン・戻る操作でも閉じられるようにする"],
  ["重ねない", <NoData>記載なし</NoData>, "一度に出すシートは1枚にする。シートから別のシートを出すなら、先に最初のシートを閉じる", "シートの上にシートを重ねない。ページ間の遷移の代わりに使わない"],
];

function BottomSheetGuide() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>モーダルにするかどうか</h2>
      <div style={styles.bsGrid}>
        {MODAL_CHOICE.map((m) => (
          <div key={m.t} style={styles.bsCard}>
            <div style={styles.bsTitle}>{m.t}</div>
            <div style={styles.bsLine}><span style={styles.bsKey}>向いている場面</span>{m.when}</div>
            <div style={styles.bsLine}><span style={styles.bsKey}>例</span>{m.ex}</div>
            <div style={styles.bsSrc}>{m.src}</div>
          </div>
        ))}
      </div>
      <h2 style={{ ...styles.diagramTitle, marginTop: 28 }}>閉じ方 ― ドラッグハンドルと×ボタン</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.bsTable}>
          <thead><tr>{["", "Google", "Apple", "NN group"].map((h) => (<th key={h} style={styles.bsTh}>{h}</th>))}</tr></thead>
          <tbody>{CLOSE_ROWS.map((r) => (<tr key={r[0]}>{r.map((c, i) => (<td key={i} style={{ ...styles.bsTd, ...(i === 0 ? { fontWeight: 700, whiteSpace: "nowrap" } : {}) }}>{c}</td>))}</tr>))}</tbody>
        </table>
      </div>
      <p style={styles.bsNote}>W3Cにはボトムシート専用の型はない。モーダルにするならダイアログとして作り、非モーダルなら後ろの操作を妨げないように作る(比較表のW3C欄)。</p>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の下からせり出し、今の画面に関わる追加の情報や操作を見せるパネル";
const ABOUT = [
  { k: "目的・役割", v: "今の画面を残したまま、選択肢や補助の内容を手の届きやすい下側に出す" },
  { k: "よく使われる場面", v: "共有先の選択、地図の場所の詳細、スマホの絞り込み条件" },
  { k: "似たコンポーネントとの違い", v: <>画面の横から出るのは<PageLink to="/components/containment/side-sheet">サイドシート</PageLink>、作業を止めて答えを求めるなら<PageLink to="/components/containment/dialog">モーダルダイアログ</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "閉じるボタン(×)を、いつも置く?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "置く。ハンドルや下へなぞる操作だけに頼らず、上部に見える×(または「閉じる」)を置く。読み上げソフトやキーボードの利用者にも閉じ方が分かる" },
      { who: "Google", color: "#2F7D6E", t: "全画面のモーダルのボトムシートには閉じるボタンを出す。それ以外は、項目を選ぶ・後ろをタップ・下へなぞる・戻るでも閉じられる" },
      { who: "Apple", color: "#C2542A", t: "利用者は縦のスワイプで閉じることを期待する。ボタンはキャンセル(保存せずに閉じる)と完了(作業を終えて閉じる)を使い分ける" },
    ],
    tip: "スワイプや後ろのタップで閉じられるようにしたうえで、見える閉じるボタン(またはキャンセル)も置くと、3系列のどれにも沿う。スワイプはなぞる操作が苦手な人や読み上げソフトの利用者には使いにくいため、ボタンが代わりの手段になる。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "見える閉じるボタンも置く", d: "スワイプやハンドルだけに頼らない", who: "AI解釈(Google・W3C・NN groupのどれにも沿う形)" },
  { n: 2, t: "ドラッグしなくても高さを変えられるようにする", d: "", who: "W3C 2.5.7" },
  { n: 3, t: "モーダルにするなら、フォーカスをシートの中にとどめ、Escキーで閉じられるように", d: "", who: "W3C" },
];

export default function ContainmentBottomSheetPage() {
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
        <SidebarNav currentPath="/components/containment/bottom-sheet" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ボトムシート</span>
            <span>SPEC No. 029</span>
          </div>

          <h1 style={styles.title}>ボトムシート</h1>
          <SummaryCard keyPoints={KP}
            image={<><BottomSheetSwatch /></>}
            imageNote={<>画面下部から現れ、グラバー(つまみ)のドラッグで高さを変えられる。「サイドシート」ページで比較したポップオーバー・サイドシートとは、下から出るという性質が異なる。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <BottomSheetGuide />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              このページは、<strong>「サイドシート」ページ(旧「モーダルポップアップ」ページ)から、下からせり出す半モーダルの内容を独立させたもの</strong>だ。AppleのSheets(デタント)とGoogleのBottom sheetsは、どちらも「複数の高さの段階を持ち、ドラッグで変更できる」という発想が共通しており、ほぼ正確に対応するコンポーネント同士だと言える。
            </p>
            <p style={styles.synthesisText}>
              4系列に共通する軸は、<strong>「モーダル(背景を操作不可にする)」か「非モーダル(背景を操作可能なまま残す)」か</strong>という区別だ。Googleは「標準/モーダル」という名前でこの2種類を明確に定義し(モーダルはスクリム上に乗るが標準にはスクリムがない、という違いのみ)、Nielsen Norman Groupも同じ区別をボトムシート全般の判断基準として挙げている。W3Cも技術的に同じ区別を持ち、<strong>aria-modal属性を設定するかどうか</strong>でこの違いを表現する。
            </p>
            <p style={styles.synthesisText}>
              Googleは、<strong>初期の垂直位置は画面高さの50%に制限され、それを超えるコンテンツは全画面まで伸びて内部スクロールする</strong>という具体的な挙動を示している。また<strong>ドラッグハンドルが使えない場合は、高さ変更のための単一ポインター代替手段が必須</strong>とされている点は、Nielsen Norman Groupが示す<strong>グラバーハンドルだけに閉じる操作を依存させず、明確な閉じるボタンも併設すべき</strong>という指摘、W3Cが求めるフォーカストラップ・Escキー対応、<strong>ドラッグ以外の操作方法(2.5.7)</strong>と方向性が一致しており、視覚的な操作(ドラッグ)とキーボード・支援技術での操作の両方を保証する必要があることを示している。<strong>「複数のシートを積み重ねない」</strong>という注意点も、モーダル性を問わず共通して守るべき実務上のルールだ。
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


          <RelatedPages paths={["/components/containment/overview", "/components/containment/side-sheet", "/components/containment/dialog", "/components/selection/menu"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["段階的に見せる"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  bsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10 },
  bsCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 10px" },
  bsTitle: { fontSize: 12.5, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  bsLine: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginBottom: 4 },
  bsKey: { display: "inline-block", fontSize: 10, fontWeight: 700, color: "#565D8A", background: "#F3F6FA", borderRadius: 3, padding: "0 5px", marginRight: 6 },
  bsSrc: { fontSize: 10, color: "#666D93", marginTop: 4 },
  bsTable: { width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457" },
  bsTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  bsTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  bsNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "10px 0 0" },
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
