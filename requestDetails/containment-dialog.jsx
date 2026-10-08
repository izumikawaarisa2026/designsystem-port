import React from "react";
import SidebarNav from "./sidebar-nav";

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
    color: "#C2542A",
    position: "取り消せない重大な操作の前などに、ユーザーへ注意を促すモーダルの警告メッセージ",
    size: "具体的なpt数値は確認できていません。ボタンには他のタップ可能要素と同じ最小44×44ptのヒットターゲット基準が適用されると考えられます。",
    colorInfo: "色についての明確な規定は確認できていません。危険な操作を表す赤系の強調表示が一般的に使われますが、Alertsページ本文で直接の規定は確認できていません。",
    stance:
      "タイトルは状況を簡潔・明確に伝える一文にすべきで、単語1つだけのタイトルは有用な情報を提供しにくいため避けるべきとしています。メッセージは短い完全な文にし、非難めいた・判断がましい言い回しは避けるべきとしています。ボタンのラベルは、選んだ結果を示す短い動詞・動詞句(例: 「表示」「返信」「無視」)にするとしています。",
    scenarios: [
      "取り消せない重大な操作の前に、注意を促したい時",
    ],
    exceptions:
      "よく選ばれる(最も可能性の高い)ボタンは右側に、キャンセルボタンは常に左側に置くべきとしています。メッセージは必須ではなく、必要な場合にのみ表示すべきだとしています。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。VoiceOver等の支援技術での読み上げは、標準のAlertコントロールを使うことで自動的に対応されると考えられます。",
    useCases: [
      "取り消せない重大な操作の前など、本当に必要な場面に限定して使う",
      "タイトルは1行・簡潔に、メッセージは1〜2行に収める",
      "最も選ばれやすいボタンを右、キャンセルを左に置く",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/alerts",
    confirmedNote: "「Alerts」ページ本文はSPAのため直接確認できておらず、検索結果(ページの引用抜粋)による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="8" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="60" y="26" fontSize="9" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">削除しますか?</text>
        <text x="60" y="40" fontSize="7.5" fill="#7E86AC" textAnchor="middle" fontFamily="Jost, Noto Sans JP">この操作は取り消せません</text>
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
    color: "#2F7D6E",
    position: "アプリのコンテンツ手前に表示され、重要な情報を提供したり判断を求めたりするモーダルウィンドウ。基本ダイアログと全画面ダイアログの2種類のうち、このページはスクリム上の基本ダイアログを扱う",
    size: "具体的なdp数値は文書内に記載がなく確認できていません。M2→M3では、角丸拡大とタイトルサイズの増加に対応するため余白が拡大され、角の半径も拡大されたとしています。",
    colorInfo: "色の値はデザイントークンを通して実装されるとしています。M2→M3では新しいカラーマッピングとダイナミックカラーへの対応が加わったとしています。ダイアログコンテナは他の画面要素の上に表示され、対話に注目を集めるため背後の表面には一時的なオーバーレイ(スクリム)が重ねられるとしています。",
    glossary: [
      { term: "M2→M3の主な変更点", desc: "新しいカラーマッピング・ダイナミックカラーへの対応/角丸拡大とタイトルサイズ増加に伴う余白拡大/基本ダイアログの位置をカスタマイズするオプションの追加/角の半径拡大/より大きく濃い見出しタイポグラフィ、の5点。" },
    ],
    stance:
      "ダイアログは、アプリのコンテンツの前に表示され、重要な情報を提供したりユーザーに判断を求めたりするモーダルウィンドウだとしています。表示されるとアプリのすべての機能が無効になり、確認・閉じる・必要な操作が行われるまで画面上に表示され続けるとしています。ダイアログは意図的にユーザーの操作を中断させるため使用は控えめにすべきで、優先度の低い・中程度の情報には自動的に閉じるスナックバーを使うべきとしています。",
    scenarios: [
      "進行状況の削除など、リスクの高い操作を確認させたい時",
      "単一タスクの完了に関わる重要な判断を求めたい時",
    ],
    exceptions:
      "ダイアログには最大2つのアクションを含めるべきで、単一のアクションを提供する場合は確認アクションでなければならず、2つの場合は一方が確認、もう一方が却下アクションでなければならないとしています。確認ボタンは末尾(後端)に配置します。ダイアログの中で選択肢を選ばせる場合は、選ぶまで確認ボタンを押せなくする一方、閉じる操作は決して無効化しないとしています(「削除しますか?」のような単純な確認では、確認ボタンを無効にしません)。否定的な行動を肯定的な行動の右側(末尾側)に配置してはならないとしています。「詳細を見る」のような3つ目のアクションは、タスクが未完了のままユーザーがダイアログを離れてしまうため推奨されず、代わりにインライン展開で追加情報を示すべきとしています。確認アクションのラベルは「送信」「作成」など次に何が起こるか明確に示す語にし、「完了」「OK」「閉じる」のような曖昧な表現は避けるべきとしています。",
    accessibility:
      "操作可能(Operable)・理解可能(Understandable) ― ダイアログが表示されると、フォーカスは自動的にダイアログ内の最初のインタラクティブ要素に移動すべきだとしています。Tabキーで次の要素へ、Shift+Tabで逆方向へフォーカスが移動し、Space/Enterキーでフォーカス中の要素が操作されるとしています。ダイアログのアクセシビリティラベルは通常タイトル・見出しと同じで、Web上の基本ダイアログにはalertdialogロールを与えるべきだとしています(W3Cの区別では、削除の確認のようにすぐに応答を求める警告がalertdialog、それ以外はdialog。W3C欄を参照)。テキストサイズを200%に拡大しても見出しが4行以内に収まるよう簡潔にすべきとしています。",
    useCases: [
      "重要な情報の伝達・判断・単一タスクの確認には基本ダイアログを使う(優先度の低い情報にはスナックバーを使う)",
      "アクションは最大2つ(確認+却下、または確認のみ)にし、確認ボタンを末尾に配置する",
      "確認アクションのラベルは次に起こることを具体的に示す(曖昧な「OK」等は避ける)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/dialogs/guidelines",
    confirmedNote: "M3の公式ページ本文(m3.material.io「Dialogs」のガイドライン)で、M2→M3の変更点・コンテナとスクリム・見出し・ボタンの配置ルール・エラーメッセージ・登場/位置/スクロールの挙動・アクセシビリティ(初期フォーカス・ラベル要素)の各セクションを2026-09に直接確認・反映。具体的なdp数値は文書内に記載がなく未確認。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <text x="60" y="24" fontSize="9" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">見出し</text>
        <text x="60" y="38" fontSize="7.5" fill="#7E86AC" textAnchor="middle" fontFamily="Jost, Noto Sans JP">補足テキスト</text>
        <text x="88" y="58" fontSize="8" fontWeight="700" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">OK</text>
      </svg>
    ),
    illustrationNote: "見出し+補足テキスト+ボタンの基本ダイアログ(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Dialog (Modal) Pattern",
    color: "#A3821F",
    position: "role=\"dialog\" + aria-modal=\"true\"で識別する、背後のコンテンツを操作不能にする重ねて表示される領域",
    size: "ダイアログ専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)はボタンなどの操作要素に適用されます。",
    colorInfo: "ダイアログ専用の色基準はありませんが、1.4.11(非テキストのコントラスト)がフォーカスインジケーターやボタンの境界線などに適用され得ます。",
    glossary: [
      { term: "aria-modal", desc: "視覚的な隠蔽(スクリム等)と操作防止の両方が実装されている場合にのみtrueを設定すべき属性。ダイアログの外側にあるコンテンツをスクリーンリーダーからも隠す効果を持つ。" },
    ],
    stance:
      "モーダルダイアログは、背後のコンテンツを操作不能にする、重ねて表示される領域だとしています。実装には role=\"dialog\"、aria-modal=\"true\"、aria-labelledbyまたはaria-labelによるラベル付けが必須だとしています。フォーカスはダイアログ内に閉じ込め、Tabキーで循環させるべきとしています。なお、削除の確認のように、すぐに応答を求める警告にはalertdialog(APGのAlert Dialogパターン)を使い、それ以外はdialogを使う、という区別があります。",
    scenarios: [
      "視覚的な隠蔽と操作防止の両方を実装したい時にaria-modal=\"true\"を設定する",
      "リストや表など複雑なコンテンツを含むダイアログの初期フォーカス位置を検討する時",
    ],
    exceptions:
      "初期フォーカスの位置は内容により異なるべきとし、リストや表など複雑なコンテンツの場合はtabindex=\"-1\"を付けた最初の静的要素に、コンテンツ量が多い場合はスクロールで見えなくなる内容を避けるためタイトル側に置くべきとしています。aria-describedbyは説明が単純な場合のみ推奨され、複雑な構造を持つ場合は省くべきとしています。",
    accessibility:
      "操作可能(Operable)・理解可能(Understandable) ― Tabキーでフォーカスをダイアログ内に閉じ込め、Shift+Tabで逆順に循環させるべきとしています。Escapeキーでダイアログを閉じられるようにし、閉じた後は通常、起動した要素へフォーカスを戻すべきとしています。",
    useCases: [
      "role=\"dialog\"とaria-modal=\"true\"を設定し、視覚的な隠蔽と操作防止を両方実装する",
      "タイトル要素をaria-labelledbyで参照するか、aria-labelでラベル付けする",
      "Tabキーでフォーカスをダイアログ内に閉じ込め、Escapeで閉じられるようにする",
    ],
    searchHint: "Escape",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    urlSecondary: [{ label: "APG: Alert Dialog Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/" }],
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
    color: "#7A4F7E",
    position: "本当に重大で取り消せない操作の前にのみ使うべき確認手段(数値基準ではなく判断基準)",
    size: "数値基準はありませんが、乱用による「オオカミ少年」効果(頻出しすぎて内容を読まれなくなること)を避けるため、表示頻度を絞るべきだとしています。",
    colorInfo: "色についての基準はありません。",
    stance:
      "確認ダイアログは、ユーザーに操作を再考する機会を与える手段ですが、設計を誤ると逆効果になるとしています。日常的な操作に多用すると、ユーザーが内容を読まずに「はい」を押す習慣がついてしまう(「オオカミ少年」効果)としています。",
    scenarios: [
      "ファイル削除など、取り消しできない操作の前",
      "高額な支払いなど、重大な結果を伴う操作の前",
    ],
    exceptions:
      "最も重大な操作には、確認ボタンを押すだけでなく「DELETE」と入力させるなど、非標準の確認操作を課すべきだとしています。日常的に繰り返す操作については、確認ダイアログを表示しない設定を選べるようにすべきだとしています。「本当によろしいですか?」ではなく、具体的な情報・選択肢(「ファイルを削除」「ファイルを保持」など)を示すべきだとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、誤操作防止という観点の指針です。「はい/いいえ」ではなく操作内容が分かる具体的なラベルにすべきという点は、理解可能性(Understandable)にも関わる実務上の知見です。",
    useCases: [
      "取り消せない重大な操作の前にのみ確認ダイアログを使う(日常操作には使わない)",
      "「はい/いいえ」ではなく操作内容が分かる具体的なラベルの選択肢にする",
      "最も重大な操作には文字入力など非標準の確認操作を課す",
    ],
    searchHint: "confirmation dialog",
    url: "https://www.nngroup.com/articles/confirmation-dialog/",
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
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
        <div style={{ fontSize: 11, color: "#7E86AC", marginBottom: 12 }}>この操作は取り消せません</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 16 }}>
          <span style={{ fontSize: 11.5, color: "#454C78" }}>キャンセル</span>
          <span style={{ fontSize: 11.5, color: "#3A4FCF", fontWeight: 700 }}>削除</span>
        </div>
      </div>
    </div>
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
            <span>コンポーネント / ダイアログ</span>
            <span>SPEC No. 024</span>
          </div>

          <h1 style={styles.title}>ダイアログ</h1>
          <p style={styles.subtitle}>4つのガイドラインが、確認・警告のために操作をブロックする、スクリム上の基本ダイアログをどう定めているかを比較します(画面全体を占める形は「フルスクリーンダイアログ」ページを参照)</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <DialogSwatch />
            <p style={styles.swatchNote}>タイトル・メッセージ・ボタンで構成される、スクリム上に乗る中央寄せの小さいダイアログ。「サイドシート」ページで比較する、より汎用的なオーバーレイ(シート等)や、画面全体を占める「フルスクリーンダイアログ」とは役割が異なる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページは、<strong>スクリム上に乗る「基本ダイアログ」中心の内容に絞ったもの</strong>です。画面全体を占め、一連のタスク完了(カレンダー予定の作成など)に使う「フルスクリーンダイアログ」とは、用途もブレークポイントによる使い分けも異なるため、モーダルポップアップ→サイドシート/ボトムシートの分割と同じ考え方でページを分けました。
            </p>
            <p style={styles.synthesisText}>
              4系列を通じて共通するのは、<strong>ダイアログを「本当に重要な場面に限定して使うべき」</strong>という姿勢です。Nielsen Norman Groupは、日常的な操作に確認ダイアログを多用すると、ユーザーが内容を読まずに反射的に「はい」を押す「オオカミ少年」効果を招くと明確に警告しています。Googleも優先度の低い・中程度の情報にはダイアログではなく自動的に閉じるスナックバーを使うべきとしており、方向性が一致しています。
            </p>
            <p style={styles.synthesisText}>
              ボタンの配置については、<strong>Appleが「よく選ばれるボタンは右、キャンセルは常に左」</strong>という明快な基準を示し、Googleも<strong>確認ボタンは末尾配置・最大2アクション・3つ目のアクションは避けインライン展開を使う</strong>という具体的なルールを持っています。NN groupはさらに踏み込み、<strong>「はい/いいえ」ではなく「ファイルを削除/ファイルを保持」のように操作内容が分かるラベル</strong>にすべきだとしており、Googleの<strong>「OK/完了のような曖昧な確認ラベルを避ける」</strong>という指針と補完関係にあります。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、<strong>フォーカス管理の技術要件(role="dialog"・aria-modal・Tabキーの閉じ込め・Escapeキーでの終了)</strong>を具体的に定めており、Googleの初期フォーカスは最初のインタラクティブ要素に自動的に移動するという挙動と実装レベルで一致しています。
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
                <div style={styles.positionBadge}>{s.position}</div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <InfoBox label="推奨される使用シーン" accent="#5A9629"><UseCaseList items={s.scenarios} /></InfoBox>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
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
                  {s.urlSecondary && s.urlSecondary.map((sl) => (<a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{sl.label} ↗</a>))}
                </div>
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
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
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>推奨される使用シーン</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.scenarios} /></div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
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
                  {s.urlSecondary && s.urlSecondary.map((sl) => (<a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>))}
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.linksRow}>
            <a href="/components/containment/fullscreen-dialog" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>フルスクリーンダイアログ ↗</div>
              <div style={styles.linkCardDesc}>画面全体を占め、一連のタスク完了に使うダイアログの4系列比較(このページから独立)</div>
            </a>
            <a href="/components/containment/side-sheet" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>サイドシート ↗</div>
              <div style={styles.linkCardDesc}>確認・警告に限らない、より汎用的な重ね表示オーバーレイの4系列比較</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["エラー・確認"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(GoogleはM3の公式ページ本文で確認済み。W3C・NN groupは本文確認済み。Appleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはAlertsページ、GoogleはDialogsページへのリンクです。WCAGはWAI-ARIA APGのDialog(Modal)パターン、NN groupは記事ページ単位です。
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
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#9EA4C4", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
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
};
