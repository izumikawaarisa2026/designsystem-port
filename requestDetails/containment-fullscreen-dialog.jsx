import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Containment / フルスクリーンダイアログ」ページ。
 *
 * 2026-09 新規作成の経緯: 「ダイアログ」ページが、性質の異なる2つの変異体
 * (スクリム上に乗る中央寄せの「基本ダイアログ」と、画面全体を占める
 * 「フルスクリーンダイアログ」)を1ページに混在させていたが、ユーザー提供の
 * 公式ドキュメント(MD3_text/daialog.docx)により両者が明確に異なる用途・
 * ブレークポイントの使い分けを持つと判明したため、ページ単位で分割した
 * (モーダルポップアップ→サイドシート/ボトムシート分割と同じ考え方)。
 * 「ダイアログ」ページは基本ダイアログ中心の内容に絞り、フルスクリーン
 * ダイアログの内容をこのページに切り出している。
 *
 * Google欄はユーザー提供の公式ドキュメント(MD3_text/daialog.docx)により
 * 直接確認(2026-09)。Apple・Nielsen Norman Groupは、フルスクリーンダイアログ
 * (画面全体を占める複数ステップのタスク完了フロー)に対応する一次情報を
 * WebSearch/WebFetchで新規に検索・確認した(2026-09)。AppleはHIGの
 * 「Modality」「Sheets」ページの該当箇所を検索結果で確認(SPAのため間接確認)。
 * Nielsen Norman Groupは「Modal & Nonmodal Dialogs」記事本文を直接取得して
 * 確認(複数ステップのモーダルは専用のフルページにすべきという主張を直接引用)。
 * W3Cは「ダイアログ」ページと同一のDialog (Modal) Patternを準用する(APGは
 * サイズによる区別を設けていない)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Modality / Sheets",
    color: "#C2542A",
    position: "一時的な没入体験や、複数ステップのタスク(コンテンツ編集など)に集中させるための全画面モーダル体験",
    size: "具体的なpt数値は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "一時的な没入体験を提供したり、複数ステップのタスクに集中させたりするため、アプリは全画面のモーダル体験を提供できるとしています。画面またはウィンドウ全体を占めることで、注意散漫の要素を減らせるという考え方です。",
    scenarios: [
      "動画・写真・カメラビューなど、一時的な没入体験を提示したい時",
      "ドキュメント編集・写真編集のような複数ステップのタスクに集中させたい時",
      "複雑なタスクで、iOS/iPadOSの全画面スタイルのモーダルビューが適する時",
    ],
    exceptions:
      "モーダルタスク内に複数の階層を持つビューを表示すると、ユーザーが元の手順を思い出せなくなる可能性があるとしています。モーダルタスクがサブビューを含む必要がある場合は、単一の経路のみを提供し、モーダルビューを閉じるボタンと誤認されるようなボタンを含めないようにすべきとしています。",
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "動画・写真・カメラビューなど、一時的な没入体験の提示に使う",
      "ドキュメント編集・写真編集のような複数ステップのタスクに使う",
      "サブビューを含む場合は単一の経路のみを提供し、閉じるボタンと誤認される要素を避ける",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/modality",
    confirmedNote: "「Modality」「Sheets」ページ本文はSPAのため直接確認できておらず、検索結果(ページの引用抜粋)による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="60" y="20" fontSize="8.5" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">写真を編集</text>
        <rect x="12" y="28" width="96" height="26" rx="4" fill="#F0DACB" />
        <text x="60" y="62" fontSize="7.5" fill="#7E86AC" textAnchor="middle" fontFamily="Jost, Noto Sans JP">複数ステップのタスク</text>
      </svg>
    ),
    illustrationNote: "画面全体を占める複数ステップの編集タスク(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Full-screen dialog",
    color: "#2F7D6E",
    position: "画面全体を占め、一連のタスクを完了させるためのモーダル。コンパクトブレークポイントでのみ使用",
    size: "具体的なdp数値は文書内に記載がなく確認できていません。コンテナ・ヘッダー・閉じるアイコン・テキストボタン・任意の区切り線で構成されるとしています。",
    colorInfo: "色の値はデザイントークンを通して実装されるとしています。全画面ダイアログを起動すると、アプリの画面上の位置が一時的にリセットされ、その上に表示されるシンプルなメニューやダイアログは画面全体を覆う形になるとしています。",
    stance:
      "全画面ダイアログは、一連のタスクを完了する必要がある操作に使うモーダルだとしています。画面全体を占めるため、その上に他のダイアログを表示できる唯一のダイアログだとしています。コンパクトなブレークポイントでのみ使用でき、中〜拡張ブレークポイントでは基本ダイアログを使うべきとしています。",
    scenarios: [
      "イベントのタイトル・日付・場所・時刻を含むカレンダーエントリの作成のような、一連のタスクを完了させたい時",
      "フォームフィールドなどキーボード入力を必要とするコンポーネントを含む時",
      "変更が即座に保存されない、またはダイアログ内から別のダイアログを開く時",
    ],
    exceptions:
      "全画面ダイアログを保存せずに閉じようとした場合、選択内容を破棄するかどうかを確認する基本ダイアログを前面に表示すべきとしています(全画面ダイアログの上に基本ダイアログを表示できる唯一のケース)。「保存」などの確認操作を押したときは、確認のダイアログを挟まずに閉じてよく、×アイコン・「キャンセル」・「戻る」で閉じようとして未保存の変更があるときだけ、破棄するかどうかの確認を出すとしています。ナビゲーションは完了・閉じる・破棄しかできないため、アプリバーのナビゲーションオプションは閉じる「×」アイコンボタンのみにすべきとしています。",
    accessibility:
      "操作可能(Operable)・理解可能(Understandable) ― 基本ダイアログと同様、初期フォーカスは最初のインタラクティブ要素に自動的に移動すべきだとしています。全画面ダイアログに含まれるテキストフィールド・タイポグラフィ・ボタンなどの各要素は、それぞれ固有のアクセシビリティガイドラインに従うべきとしています。",
    useCases: [
      "フォーム入力などキーボード入力が必要な一連のタスクに使う(コンパクトブレークポイントのみ)",
      "閉じる際に未保存の変更があれば、基本ダイアログで破棄確認を表示する",
      "ナビゲーションは閉じる「×」アイコンのみにする。保存を押したら確認を挟まずに閉じ、×などで閉じようとして未保存の変更があるときだけ破棄の確認を出す",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/dialogs/guidelines",
    confirmedNote: "M3の公式ページ本文(m3.material.io「Dialogs」のガイドライン)で、使用法・コンテナとスクリム・確認/エラーメッセージ・ダイアログウィンドウ・ナビゲーション・適応型デザイン(ブレークポイント切り替え)の各セクションを2026-09に直接確認・反映。具体的なdp数値は文書内に記載がなく未確認。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="0" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <text x="60" y="16" fontSize="8" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">新しい予定</text>
        <text x="106" y="16" fontSize="9" fill="#2F7D6E" textAnchor="middle">✕</text>
        <rect x="10" y="26" width="100" height="8" rx="2" fill="#D6E8E3" />
        <rect x="10" y="38" width="100" height="8" rx="2" fill="#D6E8E3" />
        <text x="97" y="60" fontSize="8" fontWeight="700" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">保存</text>
      </svg>
    ),
    illustrationNote: "画面全体を占め、フォーム入力を伴う全画面ダイアログ(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Dialog (Modal) Pattern(基本ダイアログと共通)",
    color: "#A3821F",
    position: "role=\"dialog\" + aria-modal=\"true\"で識別する、背後のコンテンツを操作不能にする重ねて表示される領域。サイズによる区別は設けられていない",
    size: "フルスクリーンダイアログ専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)はボタンなどの操作要素に適用されます。",
    colorInfo: "フルスクリーンダイアログ専用の色基準はありませんが、1.4.11(非テキストのコントラスト)がフォーカスインジケーターやボタンの境界線などに適用され得ます。",
    stance:
      "WAI-ARIAのDialog (Modal) Patternは、ダイアログの視覚的な大きさ(画面全体を占めるか、中央寄せの小さいものか)による区別を設けておらず、「ダイアログ」ページで比較した基本ダイアログと同じ実装要件がそのまま当てはまります。",
    scenarios: [
      "画面全体を占めるダイアログを実装する時も、基本ダイアログと同じrole=\"dialog\"・aria-modal=\"true\"・フォーカストラップを実装する",
      "全画面ダイアログの上にさらに別のダイアログを重ねる時、フォーカストラップの対象を最前面に正しく移す",
    ],
    exceptions:
      "画面全体を占める場合でも、フォーカスはダイアログ内に閉じ込め、Tab/Shift+Tabで循環させる必要がある点は同じです。全画面ダイアログの上にさらに別のダイアログ(Googleの破棄確認ダイアログなど)を表示する場合、フォーカストラップの範囲を最前面のダイアログに正しく移す実装上の注意が必要です(APG本文に全画面特有の追加要件としての明記はありません)。",
    accessibility:
      "操作可能(Operable)・理解可能(Understandable) ― Tabキーでフォーカスをダイアログ内に閉じ込め、Escapeキーで閉じられるようにし、閉じた後は起動した要素へフォーカスを戻すべきとしています(「ダイアログ」ページと共通の要件)。",
    useCases: [
      "role=\"dialog\"とaria-modal=\"true\"を設定する(基本ダイアログと同じ実装)",
      "複数のダイアログを重ねる場合はフォーカストラップの対象を最前面に正しく移す",
      "Escapeキーで閉じ、閉じた後は起動要素へフォーカスを戻す",
    ],
    searchHint: "Escape",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="0" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="30" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="dialog"</text>
          <text x="60" y="44" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-modal="true"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、基本ダイアログと共通の役割・構造を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Modal & Nonmodal Dialogs / Wizards: Definition and Design Recommendations",
    color: "#7A4F7E",
    position: "複数ステップの作業はモーダル(全画面ダイアログも含む)にせず、モーダルではない普通のページ(ウィザード)にすべきという主張",
    size: "数値基準は明言していません。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "複数ステップのモーダルは、メインの作業から離れている時間を引き延ばすだけだとし、最初から複数ステップが必要なら、専用のページを1つ割り当てるだけの理由がある、としています。ここでの「ページ」は、モーダルではない普通のページのことで、Googleの全画面ダイアログ(これもモーダル)とは別物です。",
    scenarios: [
      "ドメイン知識の少ない新規ユーザー向けのオンボーディングフロー",
      "頻繁には行わない、複数ステップのセットアップ・設定作業(日常的に繰り返す操作には不向き)",
    ],
    exceptions:
      "ウィザード形式にする場合は、ステップの一覧や図表で全体像と現在位置を示し、ユーザーが進捗とプロセスの長さを把握できるようにすべきとしています。ステップの順序を明確にし、前のステップを完了させてから次へ進ませ、「次へ」「戻る」ボタンにはステップの内容が分かる説明的なラベルを付けるべきとしています。途中保存・再開の機能や、ウィザードの内容を覆わない位置にヘルプを表示することも推奨しています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、モーダルによる文脈喪失を避けるための設計根拠です。全画面ダイアログもモーダルなので、NN groupの指摘は「複数ステップの作業はモーダル(全画面ダイアログも含む)にしない」という意味になります。",
    useCases: [
      "複数ステップの複雑なタスクは、モーダル(全画面ダイアログも含む)ではなく、普通のページにする",
      "ウィザード形式にする場合は、進捗・全体のステップ数を明示する",
      "途中保存・再開の機能を用意し、日常的に繰り返す操作には使わない",
    ],
    searchHint: "dedicating a full page",
    url: "https://www.nngroup.com/articles/modal-nonmodal-dialog/",
    urlSecondary: [{ label: "Wizards: Definition and Design Recommendations", url: "https://www.nngroup.com/articles/wizards/" }],
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="0" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <circle cx="30" cy="16" r="6" fill="#7A4F7E" />
        <circle cx="60" cy="16" r="6" fill="none" stroke="#7A4F7E" strokeWidth="1.6" />
        <circle cx="90" cy="16" r="6" fill="none" stroke="#7A4F7E" strokeWidth="1.6" />
        <line x1="36" y1="16" x2="54" y2="16" stroke="#7A4F7E" strokeWidth="1.2" />
        <line x1="66" y1="16" x2="84" y2="16" stroke="#7A4F7E" strokeWidth="1.2" />
        <text x="60" y="52" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ステップ 1 / 3</text>
      </svg>
    ),
    illustrationNote: "進捗を示すウィザード形式の全画面フロー(概念図・系列識別色)",
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

function FullscreenDialogSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto", background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 8, padding: "10px 14px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>新しい予定</span>
        <span style={{ fontSize: 13, color: "#7E86AC" }}>✕</span>
      </div>
      <div style={{ height: 8, borderRadius: 4, background: "#E1E3F0", marginBottom: 8 }} />
      <div style={{ height: 8, borderRadius: 4, background: "#E1E3F0", marginBottom: 12 }} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11.5, color: "#3A4FCF", fontWeight: 700 }}>保存</span>
      </div>
    </div>
  );
}

export default function ContainmentFullscreenDialogPage() {
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
        <SidebarNav currentPath="/components/containment/fullscreen-dialog" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / フルスクリーンダイアログ</span>
            <span>SPEC No. 031</span>
          </div>

          <h1 style={styles.title}>フルスクリーンダイアログ</h1>
          <p style={styles.subtitle}>4つのガイドラインが、画面全体を占め一連のタスクを完了させるダイアログをどう定めているかを比較します(スクリム上の小さいダイアログは「ダイアログ」ページを参照)</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <FullscreenDialogSwatch />
            <p style={styles.swatchNote}>画面全体を占め、フォーム入力など一連のタスクをまとめて完了させる。ナビゲーションは閉じる「×」のみで、保存には専用ボタンを使う。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページは、<strong>「ダイアログ」ページから、画面全体を占める変異体を独立させたもの</strong>です。Googleは、フォーム入力などキーボード入力を要する一連のタスクや、変更が即座に保存されないタスクに全画面ダイアログを使うべきとしており、<strong>コンパクトなブレークポイントでのみ使用し、中〜拡張ブレークポイントでは基本ダイアログに切り替える</strong>という明確な使い分けを持っています。
            </p>
            <p style={styles.synthesisText}>
              Appleにはこの用途にぴったり対応する専用コンポーネント名はありませんが、<strong>作業に集中させるための全画面のモーダル</strong>という考え方はHIGの「Modality」に見られます。ただしAppleは、<strong>モーダルの作業の中に階層のある画面を入れると、元の手順を思い出しにくくなる</strong>という認知的なリスクをはっきり警告しており、これはGoogleが定めていない観点です。
            </p>
            <p style={styles.synthesisText}>
              最も踏み込んだ主張をしているのはNielsen Norman Groupです。<strong>複数ステップのモーダルはメインの作業から離れる時間を引き延ばすだけで、最初から複数ステップが必要なら専用のページを割り当てる</strong>べきだとしています。ここでの「ページ」は<strong>モーダルではない普通のページ</strong>で、全画面ダイアログもモーダルなので、<strong>「複数ステップの作業は、全画面ダイアログも含めてモーダルにしない」</strong>という意味になります。Googleの全画面ダイアログは、<strong>予定の作成のような1つのタスク</strong>に向けたもの、と書き分けて読むのが正確です。ウィザード形式にする場合は<strong>進捗と全体のステップ数を明示すべき</strong>という指摘も、実装時の具体的な指針です。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、<strong>ダイアログの視覚的な大きさによる区別を設けていません</strong>。「ダイアログ」ページで比較した基本ダイアログと同じrole="dialog"・aria-modal・フォーカストラップの要件がそのまま適用され、全画面か否かという分岐は、4系列の中でもApple・Googleの実務的な使い分けに委ねられていることが分かります。
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
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.linksRow}>
            <a href="/components/containment/dialog" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>ダイアログ ↗</div>
              <div style={styles.linkCardDesc}>スクリム上に乗る、確認・警告のための基本ダイアログの4系列比較(このページの分割元)</div>
            </a>
            <a href="/components/containment/side-sheet" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>サイドシート ↗</div>
              <div style={styles.linkCardDesc}>確認・警告に限らない、より汎用的な重ね表示オーバーレイの4系列比較</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["入力・フォーム"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(GoogleはM3の公式ページ本文で確認済み。NN groupは記事本文を直接取得して確認済み。Apple・W3Cは検索結果・既存ページ内容の準用による確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはModalityページへのリンクです(検索結果による間接確認)。GoogleはDialogsページへのリンクです。WCAGは「ダイアログ」ページと同一のWAI-ARIA APG Dialog(Modal)パターンです。NN groupはModal & Nonmodal Dialogs記事、および関連するWizards記事です。
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
};
