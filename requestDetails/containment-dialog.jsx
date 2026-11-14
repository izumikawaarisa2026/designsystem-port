import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages, GoodBad } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / ダイアログ(基本ダイアログ)」ページ。
 * 確認・警告のため、操作をブロックして注意を促す、スクリム上に乗る中央寄せの
 * 小さいダイアログの4系列比較。「サイドシート」ページとは、より汎用的な
 * オーバーレイ全般(シートなど)か、確認・警告に特化したブロッキングUIかという
 * 点で役割を分けている。
 *
 * 2026-09 改訂の経緯: 当初このページは、スクリム上に乗る中央寄せの「基本
 * ダイアログ」と、画面全体を占める「フルスクリーンダイアログ」を1ページに
 * 混在させていたが、ユーザー提供の公式ドキュメント(MD3_text/daialog.docx)により
 * 両者が明確に異なる用途を持つ変異体だと判明したため、ページ単位で分割した
 * (モーダルポップアップ→サイドシート/ボトムシート分割と同じ考え方)。
 * このページは基本ダイアログ中心の内容に絞り、フルスクリーンダイアログの内容は
 * 「フルスクリーンダイアログ」ページへ切り出している。
 *
 * Google欄はユーザー提供の公式ドキュメント(MD3_text/daialog.docx)により直接
 * 確認・全面更新(2026-09、M2→M3の変更点を含む)。W3C(WAI-ARIA Dialog(Modal)
 * パターン)/ Nielsen Norman Group(Confirmation Dialogs Can Prevent User Errors)は
 * 公式ページ・記事本文を直接取得して確認済み(2026-09)。Apple(HIG Alerts)は
 * 公式サイトがクライアント側レンダリングのSPAで本文を直接取得できなかったため、
 * 検索結果による間接確認(2026-09)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Alerts",
    term: "Alert(「ダイアログ」という名前のコンポーネントはなく、用途が重なるAlertを比べる。作業をさせるモーダルはSheets=ボトムシートのページ)",
    color: "#C2542A",
    position: "取り消せない重大な操作の前などに、ユーザーへ注意を促すモーダルの警告メッセージ",
    size: "寸法の数値の記載なし。ボタンは3つまで。タイトルは2行を超えないようにする",
    colorInfo: <span><NoData>記載なし。</NoData></span>,
    stance:
      "アラートは、重要な情報を知らせ、必要なら操作を求めるモーダルの表示。作業を中断させるので控えめに使い、情報を伝えるだけの場面、よくある取り消せる操作(メールの削除など)、アプリの起動時には出さない。タイトルは何が起きたかを具体的に短く書き(「エラー」だけにしない)、説明文は価値があるときだけ短く書く。相手を責めず、深刻さもごまかさない。",
    scenarios: [
      "取り消せない重大な操作の前に、注意を促したい時",
    ],
    exceptions:
      "ボタンの名前は、押した結果を表す1〜2語の動詞にする(「OK」は情報だけを伝えるアラートに限る)。最も選ばれやすいボタンは末尾(横並びなら右)、キャンセルは先頭(左)に置き、キャンセルを既定のボタンにしない。利用者が意図して選んだのではない壊す操作のボタンだけ、壊す操作の見た目にする。",
    accessibility:
      <span><NoData>記載なし。</NoData></span>,
    useCases: [
      "取り消せない重大な操作の前など、本当に必要な場面に限る",
      "タイトルは1行・簡潔に、メッセージは1〜2行に収める",
      "最も選ばれやすいボタンを右、キャンセルを左に置く",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/alerts",
    refs: [
      { label: "Alerts", url: "https://developer.apple.com/design/human-interface-guidelines/alerts" },
      { label: "参考: Sheets(作業をさせるモーダル)", url: "https://developer.apple.com/design/human-interface-guidelines/sheets" },
    ],
    confirmedNote: "HIG Alertsの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="8" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="60" y="26" fontSize="9" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">削除しますか?</text>
        <text x="60" y="40" fontSize="7.5" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">この操作は取り消せません</text>
        <text x="38" y="58" fontSize="8" fill="#454C78" textAnchor="middle" fontFamily="Jost, Noto Sans JP">キャンセル</text>
        <text x="88" y="58" fontSize="8" fontWeight="700" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">削除</text>
      </svg>
    ),
    illustrationNote: "キャンセルは左、よく選ばれるボタンは右(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Dialogs(Basic dialog)",
    term: "Dialog(Basic dialog)",
    color: "#2F7D6E",
    position: "アプリの内容の手前に出て、重要な情報を伝えたり判断を求めたりするモーダルウィンドウ。基本と全画面の2種類のうち、このページはスクリムの上に出る基本ダイアログを扱う",
    size: <span>幅280〜560dp(AlertDialog)、容器の角丸Extra large(28dp)、影Level 3、容器の色Surface container high(Jetpack Composeのトークン)。M3では、角丸とタイトルが大きくなったのに合わせて余白も広がった。</span>,
    colorInfo: "色の値はデザイントークンで実装する。M3で新しいカラーマッピングとダイナミックカラーへの対応が加わった。コンテナはほかの要素の上に出し、注目を集めるため後ろには一時的な幕(スクリム)を重ねる。",
    glossary: [
      { term: "M2→M3の主な変更点", desc: "新しいカラーマッピング・ダイナミックカラーへの対応/角丸とタイトルの拡大に伴う余白の拡大/基本ダイアログの位置を変えるオプションの追加/角の半径の拡大/より大きく濃い見出しの文字、の5点。" },
    ],
    stance:
      <>アプリの内容の手前に出て、重要な情報を伝えたり判断を求めたりするモーダルウィンドウ。出ている間はアプリのすべての機能が無効になり、確認・閉じる・必要な操作をするまで残る。わざと操作を中断させるため控えめに使い、<Hl>優先度の低い・中くらいの情報には、自動で閉じるスナックバーを使う</Hl>。</>,
    scenarios: [
      "進行状況の削除など、リスクの高い操作を確認したい時",
      "単一タスクの完了に関わる重要な判断を求めたい時",
    ],
    exceptions:
      "操作は2つまで。1つなら確認、2つなら確認と却下にする。確認ボタンは末尾に置く。中で選択肢を選ばせるなら、選ぶまで確認ボタンを押せなくするが、閉じる操作は無効にしない(「削除しますか?」のような単純な確認では、確認ボタンを無効にしない)。否定の操作を肯定の操作の右(末尾側)に置かない。「詳細を見る」のような3つ目の操作は、作業が終わらないままダイアログを離れてしまうため勧めず、インラインで開いて情報を示す。確認のラベルは「送信」「作成」など次に起きることがはっきり分かる語にし、「完了」「OK」「閉じる」のような曖昧な語は避ける。",
    accessibility:
      "操作可能(Operable)・理解可能(Understandable) ― 出たら、フォーカスは自動でダイアログの中の最初の操作要素に移動する。アクセシビリティラベルは通常タイトルと同じで、Webの基本ダイアログにはalertdialogロールを与えるとする(W3Cの区別では、削除の確認のようにすぐ応答を求める警告がalertdialog、それ以外はdialog。W3Cの欄を参照)。文字を200%に拡大しても見出しが4行以内に収まるよう短くする。",
    useCases: [
      "重要な情報・判断・1つの作業の確認には基本ダイアログを使う(優先度の低い情報にはスナックバー)",
      "操作は2つまで(確認+却下、または確認のみ)にし、確認ボタンを末尾に置く",
      "確認のラベルは次に起きることを具体的に示す(曖昧な「OK」などは避ける)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/dialogs/guidelines",
    refs: [
      { label: "Dialogs(Basic dialog)", url: "https://m3.material.io/components/dialogs/guidelines" },
    ],
    confirmedNote: "M3の公式ページ本文(m3.material.io「Dialogs」のガイドライン)で、M2→M3の変更点・コンテナとスクリム・見出し・ボタンの配置ルール・エラーメッセージ・登場/位置/スクロールの挙動・アクセシビリティ(初期フォーカス・ラベル要素)の各セクションを2026-09に直接確認・反映。具体的なdp数値は文書内に記載がなく未確認。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <text x="60" y="24" fontSize="9" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">見出し</text>
        <text x="60" y="38" fontSize="7.5" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">補足テキスト</text>
        <text x="88" y="58" fontSize="8" fontWeight="700" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">OK</text>
      </svg>
    ),
    illustrationNote: "見出し+補足テキスト+ボタンの基本ダイアログ(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Dialog (Modal) Pattern",
    term: "dialog・alertdialog(WAI-ARIAのロール)/ HTMLのdialog要素",
    color: "#A3821F",
    position: "role=\"dialog\" + aria-modal=\"true\"で示す、後ろの内容を操作できなくして重ねて出す領域",
    size: "専用の数値基準はない。ボタンなどの操作要素には一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "専用の色の基準はない。フォーカスの表示やボタンの境界線などには1.4.11(非テキストのコントラスト)がかかり得る。",
    glossary: [
      { term: "aria-modal", desc: "見た目で覆うこと(スクリムなど)と操作を止めることの両方を実装したときだけtrueにする属性。ダイアログの外の内容をスクリーンリーダーからも隠す。" },
    ],
    stance:
      "後ろの内容を操作できなくして重ねて出す領域。role=\"dialog\"、aria-modal=\"true\"、aria-labelledbyかaria-labelでのラベル付けが必須。フォーカスはダイアログの中に閉じ込め、Tabキーで循環させる。削除の確認のようにすぐ応答を求める警告にはalertdialog(APGのAlert Dialogパターン)、それ以外はdialogを使う。",
    scenarios: [
      "見た目で覆うことと操作を止めることの両方を実装したら、aria-modal=\"true\"を設定する",
      "リストや表など複雑な内容を含むダイアログで、最初のフォーカスの位置を決める時",
    ],
    exceptions:
      "最初のフォーカスの位置は内容で変える。リストや表など複雑な内容ならtabindex=\"-1\"を付けた最初の静的な要素に、内容が多いならスクロールで見えなくなるのを避けるためタイトルに置く。aria-describedbyは説明が単純な場合だけ使い、複雑な構造なら省く。",
    accessibility:
      "操作可能(Operable)・理解可能(Understandable) ― Tabキーでフォーカスをダイアログの中に閉じ込め、Shift+Tabで逆順に循環させる。Escapeキーで閉じられるようにし、閉じたら通常、開いた要素にフォーカスを戻す。",
    useCases: [
      "role=\"dialog\"とaria-modal=\"true\"を設定し、見た目で覆うことと操作を止めることを両方実装する",
      "タイトル要素をaria-labelledbyで参照するか、aria-labelでラベル付けする",
      "Tabキーでフォーカスをダイアログの中に閉じ込め、Escapeで閉じられるようにする",
    ],
    searchHint: "Escape",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    refs: [
      { kind: "apg", label: "APG: Dialog Modal Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" },
      { kind: "apg", label: "APG: Alert Dialog Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="30" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="dialog"</text>
          <text x="60" y="44" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-modal="true"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Confirmation Dialogs Can Prevent User Errors",
    term: "Confirmation dialog(確認ダイアログ)",
    color: "#7A4F7E",
    position: "本当に重大で取り消せない操作の前だけに使う確認の手段(数値基準ではなく判断の基準)",
    size: <span><NoData>数値基準なし。</NoData>使いすぎによる「オオカミ少年」効果(出すぎて読まれなくなること)を避けるため、出す回数を絞る。</span>,
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      <>確認ダイアログは操作を考え直す機会を与えるが、設計を誤ると逆効果になる。日常の操作に多用すると、内容を読まずに「はい」を押す習慣がつく(<Hl>「オオカミ少年」効果</Hl>)。</>,
    scenarios: [
      "ファイル削除など、取り消しできない操作の前",
      "高額な支払いなど、重大な結果を伴う操作の前",
    ],
    exceptions:
      "最も重大な操作には、ボタンを押すだけでなく「DELETE」と入力させるなど、普段と違う確認を課す。日常に繰り返す操作では、確認を出さない設定を選べるようにする。「本当によろしいですか?」ではなく、具体的な情報と選択肢(「ファイルを削除」「ファイルを保持」など)を示す。",
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、誤操作を防ぐ観点の指針。「はい/いいえ」ではなく操作が分かる具体的なラベルにする点は、理解可能(Understandable)にも関わる。",
    useCases: [
      "取り消せない重大な操作の前だけに使う(日常の操作には使わない)",
      "「はい/いいえ」ではなく、操作が分かる具体的なラベルにする",
      "最も重大な操作には、文字の入力など普段と違う確認を課す",
    ],
    searchHint: "confirmation dialog",
    url: "https://www.nngroup.com/articles/confirmation-dialog/",
    refs: [
      { label: "Confirmation Dialogs Can Prevent User Errors", url: "https://www.nngroup.com/articles/confirmation-dialog/" },
    ],
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="60" y="26" fontSize="9" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ファイルを削除</text>
        <text x="34" y="52" fontSize="7.5" fill="#454C78" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ファイルを保持</text>
        <text x="88" y="52" fontSize="7.5" fontWeight="700" fill="#7A4F7E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ファイルを削除</text>
      </svg>
    ),
    illustrationNote: "「はい/いいえ」ではなく具体的なラベルにする(概念図・系列識別色)",
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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function DialogSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto" }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 8, padding: "16px 14px", boxShadow: "0 4px 14px rgba(23,27,54,0.12)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 4, fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>削除しますか?</div>
        <div style={{ fontSize: 11, color: "#666D93", marginBottom: 12 }}>この操作は取り消せない</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
          <span style={{ fontSize: 11.5, color: "#454C78" }}>キャンセル</span>
          <span style={{ fontSize: 11.5, color: "#3A4FCF", fontWeight: 700 }}>削除</span>
        </div>
      </div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の上に小さな枠を重ねて表示し、確認や選択を求めるコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "作業をいったん止めて、大事な確認(削除してよいかなど)や短い選択に答えてもらう" },
  { k: "よく使われる場面", v: "削除・破棄の確認、権限の許可、保存せずに閉じるときの確認" },
  { k: "似たコンポーネント", v: <>画面全体を使って一連の入力をさせるなら<PageLink to="/components/containment/fullscreen-dialog">フルスクリーンダイアログ</PageLink>、作業を止めずに知らせるなら<PageLink to="/components/communication/snackbar">スナックバー</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "取り消せない操作の確認は、ボタンを押すだけでよい?",
    sides: [
      { who: "NN group", color: "#7A4F7E", t: "最も重大な操作では、「DELETE」と入力させるなど、いつもと違う確認をさせる。「本当によろしいですか?」ではなく、具体的な選択肢(「ファイルを削除」「ファイルを残す」)を示す" },
      { who: "Apple", color: "#C2542A", t: "ボタンで確認する。読まずにReturnで閉じてほしくないときは、どのボタンも既定にしない。意図せず壊す操作になるボタンには壊す操作の見た目を付ける" },
      { who: "Google", color: "#2F7D6E", t: "ボタンで確認する。確認ボタンのラベルは「削除」のように次に起きることが分かる語にする。単純な確認では確認ボタンを無効にしない" },
    ],
    tip: "ふだんはボタンの名前を具体的にする(Apple・Google・NN groupで一致)だけで十分だ。アカウントの削除のように取り返しがつかず影響の大きい操作だけ、NN groupの勧める入力させる確認を足す。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "本当に重要な場面だけに使う", d: "多用すると読まずに押されるようになる", who: "NN group" },
  { n: 2, t: "優先度の低い知らせはスナックバーにする", d: "", who: "Google" },
  { n: 3, t: "ボタンの名前を具体的にする", d: "「削除」のように、押すと何が起きるか分かる語", who: "Apple・Google・NN group" },
  { n: 4, t: "ボタンは2つまで", d: "", who: "Google" },
  { n: 5, t: "取り返しのつかない操作だけ、入力させる確認を足す", d: "", who: "NN group" },
];

/* 良い例・悪い例の図(2026-11 ⑦本人レビュー。レビュー表M列の案。図は概念図) */
function GoodBadFigure() {
  return (
    <GoodBad
            title="良い例・悪い例 ― 確認ボタンのラベル"
            items={[
              { kind: "good", fig: <div style={{ width: 220, border: "1px solid #E1E3F0", borderRadius: 12, padding: "14px 16px", boxShadow: "0 4px 14px rgba(23,27,54,0.12)" }}><div style={{ fontSize: 14, fontWeight: 700, color: "#171B36", marginBottom: 4 }}>この写真を削除しますか?</div><div style={{ fontSize: 12, color: "#454C78", marginBottom: 12 }}>削除すると元に戻せません。</div><div style={{ display: "flex", justifyContent: "flex-end", gap: 16, fontSize: 13, fontWeight: 600, color: "#3A4FCF" }}><span>キャンセル</span><span>削除</span></div></div>, text: "確認ボタンが「削除」で、押すと何が起きるか分かる。" },
              { kind: "bad", fig: <div style={{ width: 220, border: "1px solid #E1E3F0", borderRadius: 12, padding: "14px 16px", boxShadow: "0 4px 14px rgba(23,27,54,0.12)" }}><div style={{ fontSize: 14, fontWeight: 700, color: "#171B36", marginBottom: 4 }}>この写真を削除しますか?</div><div style={{ fontSize: 12, color: "#454C78", marginBottom: 12 }}>削除すると元に戻せません。</div><div style={{ display: "flex", justifyContent: "flex-end", gap: 16, fontSize: 13, fontWeight: 600, color: "#3A4FCF" }}><span>キャンセル</span><span>OK</span></div></div>, text: "確認ボタンが「OK」だけで、押すと何が起きるかをタイトルまで読み返さないと分からない。" },
            ]}
            basis="Apple・Google・NN group(ボタンの名前を具体的にし、押すと何が起きるか分かる語にする)。Googleは、確認ボタンのラベルを「削除」のように次に起きることが分かる語にし、「OK」のようなあいまいな語を避けるとしている。"
            note="ボタンの並び順(確認が右か左か)は系列で違うので、この図では扱わない。"
          />
  );
}

export default function ContainmentDialogPage() {
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
        <SidebarNav currentPath="/components/containment/dialog" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / モーダルダイアログ</span>
            <span>SPEC No. 024</span>
          </div>

          <h1 style={styles.title}>モーダルダイアログ</h1>
          <SummaryCard keyPoints={KP}
            image={<><DialogSwatch /></>}
            imageNote={<>タイトル・メッセージ・ボタンで構成される、スクリム上に乗る中央寄せの小さいダイアログ。「サイドシート」ページで比較する、より汎用的なオーバーレイ(シート等)や、画面全体を占める「フルスクリーンダイアログ」とは役割が異なる。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />
          <GoodBadFigure />




          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              4系列を通じて共通するのは、<strong>ダイアログを「本当に重要な場面に限定して使うべき」</strong>という姿勢だ。Nielsen Norman Groupは、日常的な操作に確認ダイアログを多用すると、ユーザーが内容を読まずに反射的に「はい」を押す「オオカミ少年」効果を招くと明確に警告している。Googleも優先度の低い・中程度の情報にはダイアログではなく自動的に閉じるスナックバーを使うべきとしており、方向性が一致している。
            </p>
            <p style={styles.synthesisText}>
              ボタンの配置については、<strong>Appleが「よく選ばれるボタンは末尾(右)、キャンセルは先頭(左)」</strong>という明快な基準を示し、Googleも<strong>確認ボタンは末尾配置・最大2アクション・3つ目のアクションは避けインライン展開を使う</strong>という具体的なルールを持っている。NN groupはさらに踏み込み、<strong>「はい/いいえ」ではなく「ファイルを削除/ファイルを保持」のように操作内容が分かるラベル</strong>にすべきだとしており、Googleの<strong>「OK/完了のような曖昧な確認ラベルを避ける」</strong>という指針と補完関係にある。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、<strong>フォーカス管理の技術要件(role="dialog"・aria-modal・Tabキーの閉じ込め・Escapeキーでの終了)</strong>を具体的に定めており、Googleの初期フォーカスは最初のインタラクティブ要素に自動的に移動するという挙動と実装レベルで一致している。
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


          <RelatedPages paths={["/components/containment/overview", "/components/containment/fullscreen-dialog", "/components/containment/bottom-sheet", "/components/communication/overview"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["エラー・確認"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
