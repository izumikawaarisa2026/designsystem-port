import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList } from "./page-parts";

/**
 * コンポーネントレイヤー「Communication / バナー」ページ。
 * 画面の上部などに表示し、利用者が対応するか閉じるまで残り続けるお知らせの部品を比べる。
 * 2026-11 ③本人レビューNo.060で「アラート/バナー」ページを2つに分け、成功・情報・注意・エラーの知らせ方は
 * 「ステータスメッセージ(アラート)」ページ(communication-alert.jsx)へ移した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Notifications(バナー通知、近い概念)",
    color: "#C2542A",
    noDedicatedComponent: true,
    position: "「バナー」という名称の、アプリ内に留まり続けるインラインコンポーネントは見当たらない。最も近いのはOSレベルのバナー通知だが、これは自動的に消える点で本ページの対象とは性質が異なる",
    size: <NoData>数値基準なし</NoData>,
    stance:
      "HIGには、アプリ内にユーザーが閉じるまで留まり続けるインラインのバナーという専用コンポーネントは見当たらない。近い概念として、デバイス使用中に画面上部に数秒間表示されてから自動的に消える「バナー」形式の通知があるが、これは「スナックバー」「トースト」の各ページで比較した自動消去型の通知と同じ性質を持ち、本ページが対象とする「ユーザーが閉じるまで残り続ける」インラインバナーとは異なる。",
    exceptions:
      "「ユーザーの操作が完了するまで画面内に留まり続ける」という、本ページで比較する性質に厳密に対応するAppleのガイダンスは確認できていない。取り消せない重大な操作の確認には「モーダルダイアログ」ページで比較したAlerts(モーダル)を使うべきと考えられる。",
    accessibility: <NoData>記載なし</NoData>,
    scenarios: [
      "OSレベルの自動消去型通知を実装したい時(バナー形式、本ページの対象とは性質が異なる)",
      "重大な確認が必要な場合は「モーダルダイアログ」ページのAlertsを検討する",
    ],
    useCases: [
      "OSレベルの自動消去型通知にはバナー形式を使う(本ページの対象とは性質が異なる)",
      "永続的なインライン通知に厳密に対応する専用コンポーネントは持たない",
      "重大な確認が必要な場合は「モーダルダイアログ」ページのAlertsを検討する",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/notifications",
    refs: [
      { label: "Notifications(バナー通知、近い概念)", url: "https://developer.apple.com/design/human-interface-guidelines/notifications" },
    ],
    confirmedNote: "「スナックバー」「トースト」の各ページのApple欄と同じ一次情報。「ユーザーが閉じるまで残り続ける」インラインバナーに厳密に対応するガイダンスは見当たらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="160" height="30" viewBox="0 0 160 30">
        <rect x="1" y="1" width="158" height="28" rx="6" fill="none" stroke="#C2542A" strokeDasharray="3 2" strokeWidth="1.2" />
        <text x="80" y="19" fontSize="9" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">厳密に対応する概念なし</text>
      </svg>
    ),
    illustrationNote: "視覚デザインの規定はなく、該当なしに近い状況を図示",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 2 ― Banners(M3の一覧からは削除)",
    color: "#2F7D6E",
    m3NotApplicable: true,
    successorNote: "M3で「重要だが緊急ではない、対応するまで残り続けるメッセージ」を実現したい場合は、内容の重さに応じてダイアログ(強く操作を止める必要がある場合)またはSnackbar(比較的軽い場合)への置き換えが案内されているとみられる(検索結果による確認)。",
    position: "重要だが緊急ではないメッセージを、ユーザーが対応・却下するまで画面上部に表示し続けるコンポーネント",
    size: <span><NoData>数値は未確認。</NoData>1行で収まる「シングルライン」バリエーションでは、デスクトップで最大2つのボタンを配置できるとされている(検索結果による確認)。</span>,
    stance:
      "バナーは、重要かつ簡潔なメッセージを表示し、ユーザーがそのメッセージに対応する(または閉じる)ための操作を提供するコンポーネントだとされている。ユーザーが操作するか閉じるまで持続する非モーダルな要素で、いつでも無視することも操作することもできるとされている。アプリバーの直下、画面上部に表示すべきとされている(検索結果による確認)。",
    exceptions:
      "アイコン(任意)+テキスト+最大2つのボタンという構成が一般的とされている。1画面に同時に表示するバナーは1つまでにすべきとされている(検索結果による確認)。",
    scenarios: [
      "通信環境の不安定さなど、重要だが緊急ではない状態を伝えたい時",
      "ユーザーの対応(再試行など)を促す簡潔なメッセージを画面上部に表示したい時",
    ],
    accessibility:
      "操作可能(Operable) ― 一般的なタッチターゲット基準がバナー内のボタンに適用されると考えられる(直接確認はできていない)。",
    useCases: [
      "重要だが緊急ではない情報を、ユーザーが対応するまで画面上部に表示し続ける",
      "アイコン(任意)+簡潔なテキスト+最大2つのボタンで構成する",
      "同時に表示するバナーは1つまでにする",
    ],
    searchHint: "",
    url: "https://m2.material.io/components/banners",
    refs: [
      { label: "Banners(M3の一覧からは削除)", url: "https://m2.material.io/components/banners" },
    ],
    confirmedNote: "M3(m3.material.io)の公式コンポーネント一覧にはBannerが見当たらないことを検索で確認しました(2026-09)。M3では、旧Bannerが担っていた用途にダイアログまたはスナックバーを使うよう案内されているとみられる(検索結果による確認)。上記の仕様はM2時点のもの。",
    pending: true,
    deprecated: true,
    deprecatedNote: "GoogleのBannerコンポーネントはMaterial Design 2に存在しましたが、M3の公式コンポーネント一覧には見当たらない。M3では、旧Bannerが担っていた用途に応じて、ダイアログまたはスナックバーの使用が案内されているとみられる(検索結果による確認、2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="160" height="30" viewBox="0 0 160 30">
          <rect x="1" y="1" width="158" height="28" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
          <circle cx="14" cy="15" r="5" fill="none" stroke="#2F7D6E" strokeWidth="1.4" />
          <text x="80" y="12" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">通信環境が不安定です</text>
          <text x="130" y="22" fontSize="7.5" fontWeight="700" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">再試行</text>
        </svg>
      </div>
    ),
    illustrationNote: "アイコン+テキスト+最大2ボタン(M2仕様、概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― alert / status / alertdialog の使い分け、WCAG 4.1.3",
    color: "#A3821F",
    position: "条件で分ける: 操作の結果として新しく出た緊急の警告だけalert、緊急でない更新はstatus、最初から表示されているバナーは見出しやラベル付きの領域、モーダルで確認を求めるならalertdialog",
    size: "バナー専用の数値基準はないが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)はボタン等の操作要素に適用される。",
    glossary: [
      { term: "色", desc: "1.4.11(非テキストのコントラスト)により、境界線やアイコンなどの視覚的要素は3:1以上のコントラスト比を確保すべきとしている。" },
      { term: "role=\"alert\" / role=\"status\" / role=\"alertdialog\"", desc: "role=\"alert\"は、新しく出たら読み上げ中の内容を中断してでもすぐ読み上げられる(aria-live=\"assertive\"相当)ライブリージョン。role=\"status\"は、読み上げ中の内容を終えてから読み上げられる(polite相当)。role=\"alertdialog\"はフォーカスを閉じ込め、応答を求めるモーダルのダイアログ(「モーダルダイアログ」ページ参照)。" },
    ],
    stance:
      "バナーは、ひとまとめにrole=\"alert\"にするのではなく、条件で分ける。①操作の結果として新しく出た、緊急の警告だけをrole=\"alert\"にする(新しく出たときに読み上げられる)。②緊急でない更新(「保存しました」など)はrole=\"status\"にする(4.1.3のステータスメッセージ)。③ページを開いたときから表示されているバナーは、ライブリージョンにする必要はなく、見出しやラベル付きの領域として読めるようにする。④モーダルで確認を求めるならrole=\"alertdialog\"にする(「モーダルダイアログ」ページ参照)。",
    exceptions:
      "role=\"alert\"は読み上げ中の内容を中断するため、重大な内容に限定して使うべきで、多用すると過剰な割り込みになるとしている。alertは、操作のあとなどに動的に表示される内容のためのもので、ページを開いたときからある内容には使わない(ライブリージョンは、内容が変わったときにだけ読み上げられるため。MDNの解説)。",
    scenarios: [
      "操作の結果として新しく出た、緊急の警告を伝えたい時にrole=\"alert\"を使う",
      "緊急でない更新を伝えたい時はrole=\"status\"を使う",
      "最初から表示されているバナーは、見出しやラベル付きの領域として読めるようにする",
      "モーダルで確認を求めたい時はrole=\"alertdialog\"を使う(「モーダルダイアログ」ページ参照)",
    ],
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― ライブリージョンによる読み上げ(4.1.3)、非テキストのコントラスト(1.4.11)、ターゲットサイズ(2.5)が関わる。alertかalertdialogかで、フォーカス管理の要件が大きく変わる点に注意が必要。",
    useCases: [
      "新しく出た緊急の警告だけrole=\"alert\"にする",
      "緊急でない更新はrole=\"status\"にする(4.1.3)",
      "最初から表示されているバナーは、見出しやラベル付きの領域にする(ライブリージョンにしない)",
      "モーダルで確認を求める警告はrole=\"alertdialog\"にする",
    ],
    searchHint: "assertive",
    url: "https://www.w3.org/TR/wai-aria-1.2/#alert",
    refs: [
      { label: "alert / status / alertdialog の使い分け、WCAG 4.1.3", url: "https://www.w3.org/TR/wai-aria-1.2/#alert" },
      { label: "WAI-ARIA: statusロール", url: "https://www.w3.org/TR/wai-aria-1.2/#status" },
      { kind: "apg", label: "APG: Alert Dialog Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/" },
      { kind: "sc", level: "AA", label: "4.1.3 ステータスメッセージ", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html" },
      { kind: "mdn", label: "alertロール", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="160" height="30" viewBox="0 0 160 30">
          <rect x="1" y="1" width="158" height="28" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="80" y="19" fontSize="8.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">alert / status / 領域</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、role=\"alertdialog\"との対比を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Indicators, Validations, and Notifications(「スナックバー」「トースト」の各ページと同一記事)",
    color: "#7A4F7E",
    position: "通知を「アクション必須」と「パッシブ」に分ける分類で、対応の必要性を判断する指針(数値基準ではない)",
    size: <NoData>数値基準なし</NoData>,
    stance:
      "通知全般を「アクション必須(Action-required)」と「パッシブ(Passive)」の2種類に分類しており、この分類は「利用者の対応が必要か」の軸で、表示がどれだけ続くかとは別の軸。画面に残り続けるバナーでも、必ず対応が必要とは限らず、対応が必要なものだけがアクション必須通知に当たる(AI解釈。「情報伝達の使い分け」ページと同じ整理)。アクション必須通知は、ユーザーがタスクを進めるために対応が必要な情報を伝えるものだとしている。",
    exceptions:
      "アクション必須通知は、パッシブ通知と異なり見落とされることを許容できないため、消えずに残り続ける・視覚的に目立つ、といった設計が必要になるとしている。一方で頻度が高すぎたり不必要に使われたりすると、ユーザーの信頼を損なうとも指摘している。",
    scenarios: [
      "ユーザーの対応や明示的な却下を必要とする、見落とし厳禁の情報を伝えたい時",
      "支払い情報の更新など、対応が完了するまで通知を残しておきたい時",
    ],
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、通知の緊急度・対応要否に応じた分類・使い分けの指針。",
    useCases: [
      "ユーザーの対応(または明示的な却下)を必要とする情報に使う(見落とし厳禁の内容)",
      "頻度を絞り、不必要な場面での多用を避ける",
      "見落としが許容できる内容には「スナックバー」「トースト」の各ページのパッシブ通知を検討する",
    ],
    searchHint: "action-required",
    url: "https://www.nngroup.com/articles/indicators-validations-notifications/",
    refs: [
      { label: "Indicators, Validations, and Notifications(「スナックバー」「トースト」の各ページと同一記事)", url: "https://www.nngroup.com/articles/indicators-validations-notifications/" },
    ],
    illustration: () => (
      <svg width="160" height="30" viewBox="0 0 160 30">
        <rect x="1" y="1" width="158" height="28" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <circle cx="14" cy="15" r="5" fill="none" stroke="#7A4F7E" strokeWidth="1.4" />
        <text x="90" y="12" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">お支払い情報の更新が必要です</text>
        <text x="140" y="22" fontSize="7.5" fontWeight="700" fill="#7A4F7E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">更新</text>
      </svg>
    ),
    illustrationNote: "対応を求めるバナーの例(概念図・系列識別色)",
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

function AlertSwatch() {
  return (
    <div style={{ width: 280, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 8 }}>
        <span style={{ fontSize: 16 }}>⚠️</span>
        <span style={{ flex: 1, fontSize: 12.5, color: "#2E3457", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>ストレージの空き容量が残りわずかです</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#3A4FCF", whiteSpace: "nowrap" }}>管理</span>
      </div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "画面の上部などに表示し、利用者が対応するか閉じるまで残り続けるお知らせです。";
const ABOUT = [
  { k: "目的・役割", v: "見落とすと困るが緊急ではない情報を、作業を止めずに伝え続ける" },
  { k: "よく使われる場面", v: "オフラインの知らせ、支払い情報の更新のお願い、サービスのお知らせ" },
  { k: "似た部品との違い", v: <>成功・注意・エラーなど状態の知らせ方は<PageLink to="/components/communication/alert">ステータスメッセージ</PageLink>、短時間で消える通知は<PageLink to="/components/communication/snackbar">スナックバー</PageLink>、作業を止めて答えを求めるなら<PageLink to="/components/containment/dialog">モーダルダイアログ</PageLink></> },
];

export default function CommunicationBannerPage() {
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
        <SidebarNav currentPath="/components/communication/banner" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / バナー</span>
            <span>SPEC No. 062</span>
          </div>

          <h1 style={styles.title}>バナー</h1>
          <SummaryCard
            image={<><AlertSwatch /></>}
            imageNote={<>画面上部などにインラインで表示され、ユーザーが対応するか明示的に閉じるまで残り続ける。「モーダルダイアログ」ページのように操作をブロックはしない。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <div style={styles.warningBox}>
            <div style={styles.warningLabel}>⚠ 重要な注記(2026-09、Google/Material Design)</div>
            <p style={styles.warningText}>
              GoogleのBannerコンポーネントは<strong>Material Design 2に存在しましたが、M3の公式コンポーネント一覧には見当たりません</strong>。M3では、旧Bannerが担っていた用途に応じて<strong>ダイアログまたはスナックバーの使用</strong>が案内されているとみられます(検索結果による確認)。このページでは、現在も多くの実装で参考にされているM2時点のBanner仕様を掲載しつつ、この状況を明記しています。他の3系列(Apple・W3C・Nielsen Norman Group)の情報には影響しません。
            </p>
          </div>




          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              このページの対象は、<strong>「ダイアログ」(操作をブロックし、閉じるまで先に進めない)</strong>とも<strong>「スナックバー」「トースト」(操作不要で自動的に消える)</strong>とも異なる、<strong>第三の性質</strong>を持つ通知です。画面遷移や操作はブロックしないものの、ユーザーが対応するか明示的に閉じるまでインラインに残り続けます。W3Cの<strong>role="alert"(新しく出た緊急の警告)とrole="alertdialog"(ダイアログページ)</strong>という2つのロールの対比が、この違いを最も的確に表しています。ただし、インラインのバナーをすべてrole="alert"にするわけではありません。<strong>緊急でない更新はrole="status"、ページを開いたときから表示されているバナーは見出しやラベル付きの領域</strong>にします(W3C欄を参照)。
            </p>
            <p style={styles.synthesisText}>
              最も大きな点は、<strong>Googleの「Banner」コンポーネントがMaterial Design 2止まりで、M3の公式コンポーネント一覧からは姿を消している</strong>ことです。M3では旧Bannerの用途がダイアログ・スナックバーという既存コンポーネントに整理・統合されたとみられます(公式の記述は未確認)。なお、セグメントボタン(M3の公式ページ)やナビゲーションドロワー(Googleの公式ドキュメント「MDC AndroidのNavigation drawer」)は、M3 Expressiveで非推奨・非推奨化が公式に示されています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupの<strong>「アクション必須(見落とし厳禁)」と「パッシブ(見落としても致命的でない)」という通知の2分類</strong>は、<strong>利用者の対応が必要か</strong>という軸です。対応を求めるバナーは前者、「スナックバー」「トースト」の各ページの対象は多くが後者に当たります。ただし、表示が続くかどうかとは別の軸なので、<strong>画面に残り続けるバナーでも、必ず対応を求めるとは限りません</strong>(「情報伝達の使い分け」ページと同じ整理)。この分類軸は、Containment・Communication両カテゴリを横断して各コンポーネントの役割を整理する共通の物差しとして機能します。
            </p>
            <p style={styles.synthesisText}>
              Appleには、この「ユーザーが閉じるまで残り続けるインライン通知」に厳密に対応する専用コンポーネントが見当たりません。「スナックバー」「トースト」の各ページのApple欄と同じ「バナー通知」を参考として挙げていますが、これは自動的に消える点で本ページの対象とは性質が異なり、正確な対応物がないという結論になります。
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
                {(s.m3NotApplicable || s.noDedicatedComponent) && (
                  <span style={styles.notApplicableChip}>{s.m3NotApplicable ? "M3では該当なし(M2仕様を参考掲載)" : "専用コンポーネントなし"}</span>
                )}
                <div style={styles.positionBadge}>{s.position}</div>
                {s.successorNote && <InfoBox label="M3での実質的な後継" accent="#B8860B">{s.successorNote}</InfoBox>}
                <InfoBox label="推奨される使用シーン" accent="#5A9629"><UseCaseList items={s.scenarios} /></InfoBox>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
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
                <div style={styles.labelCell}>M3該当状況</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>
                    {(s.m3NotApplicable || s.noDedicatedComponent) ? (
                      <span style={styles.notApplicableChip}>{s.m3NotApplicable ? "M3では該当なし(M2仕様を参考掲載)" : "専用コンポーネントなし"}</span>
                    ) : (<span style={{ color: "#B7BCDA" }}>―(この観点は対象外)</span>)}
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>M3での実質的な後継</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.successorNote || <span style={{ color: "#B7BCDA" }}>―(この観点は対象外)</span>}</div>))}
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

          <div style={styles.linksRow}>
            <a href="/components/containment/dialog" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>ダイアログ ↗</div>
              <div style={styles.linkCardDesc}>操作を完全にブロックするモーダルな確認・警告の4系列比較</div>
            </a>
            <a href="/components/communication/snackbar" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>スナックバー ↗</div>
              <div style={styles.linkCardDesc}>アクションを持てる、操作不要で自動的に消えるパッシブ通知の4系列比較</div>
            </a>
            <a href="/components/communication/toast" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>トースト ↗</div>
              <div style={styles.linkCardDesc}>アクションを持たない、最も簡潔なパッシブ通知の4系列比較(M3では非該当)</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["通知・状態表示", "エラー・確認"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11(③本人レビューNo.060で「アラート/バナー」ページから名前を変更し、状態の種類の内容は「ステータスメッセージ」ページへ移動)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはNotificationsページへのリンクです(専用コンポーネントなしのため近似)。GoogleはM2のBannersページへのリンクです(M3に後継ページが見当たらないため)。WCAGはMDNのalert role解説ページ(alertdialog roleも併記)、NN groupは「スナックバー」「トースト」の各ページと同一記事です。
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
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  warningBox: { background: "#FFF6E5", borderLeft: "4px solid #B8860B", padding: "14px 18px", marginBottom: 20, borderRadius: "0 4px 4px 0" },
  warningLabel: { fontSize: 12.5, fontWeight: 700, color: "#8A6210", marginBottom: 6, letterSpacing: 0.2 },
  notApplicableChip: { display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#8A6210", background: "#FFF6E5", border: "1px solid #F0DBA6", padding: "3px 8px", borderRadius: 3, marginTop: 8, letterSpacing: 0.2 },
  warningText: { fontSize: 12.5, lineHeight: 1.75, color: "#5A4419", margin: 0 },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
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
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
