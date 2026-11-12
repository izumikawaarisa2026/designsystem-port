import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Communication / トースト」ページ。
 *
 * 2026-09 新規作成の経緯: 「スナックバー・トースト」ページが、Androidの実装としては
 * 別のAPIである2つのコンポーネントを1ページに混在させていたため、ユーザーの了承の
 * もとページ単位で分割した。Toastは操作不要のOS標準ポップアップ(カスタムToast
 * ビューはAPI30で非推奨)、Snackbarはアクションを持てるMaterial Designの公式
 * コンポーネントという違いがある。「スナックバー」ページ側を参照。
 *
 * 2026-09 追記(ユーザー指摘): Material Design 3の公式コンポーネント一覧に
 * 「Toast」という項目は存在しない。M1〜M2時代は「Snackbars & Toasts」として
 * 2つが並記されていたが(m1.material.ioに現存)、M3ではSnackbarに統合され、
 * Toastは独立したデザインシステムコンポーネントではなくなった。これは見落とし
 * ではなく仕様通りの結果であるため、ページ冒頭に注記(warningBox)を追加し、
 * このページで扱うGoogleの情報はM3のコンポーネントではなく、Androidの
 * OSレベルAPI(プラットフォーム機能)としてのToastである点を明記した。
 * それでも独立ページとして残しているのは、(1)実務でAndroid開発者が今なお
 * 頻繁に触れる現役のAPIであること、(2)「スナックバー」ページとの対比(操作の
 * 有無)が「情報伝達の使い分け」ページの判断軸そのものであることの2点から、
 * 比較の材料として一定の価値があると判断したため。
 *
 * 各系列エントリに `scenarios`(推奨される使用シーン)フィールドを新設し、
 * アクセシビリティ観点の `useCases` とは区別した。
 *
 * Google(Android Developers公式ページ developer.android.com/guide/topics/ui/
 * notifiers/toasts)/ Nielsen Norman Group(UI Elements Glossaryに「Toast」単独の
 * 項目は存在せず「Snackbar (Toast)」という1項目にまとめられている点を含む)は
 * 本文を直接取得して確認済み(2026-09)。W3Cは、role="status"の一般原則に加え、
 * Android実装固有の既知の課題(TalkBackにToastが伝わらない)を検索結果で確認した
 * ものであり、W3Cの一次文書そのものがToastに言及しているわけではない点に注意。
 * Appleには「トースト」という名称のコンポーネントは見当たらず、最も近い概念
 * (バナー形式の通知)を検索結果により間接確認した(2026-09、スナックバーページと
 * 同一の一次情報)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Notifications(バナー、近い概念)",
    term: <NoData>該当なし(近いもの: 通知のバナー)</NoData>,
    color: "#C2542A",
    noDedicatedComponent: true,
    position: "トーストに当たる部品はない。最も近いのは通知(ロック画面やホーム画面などのバナー、通知センター)",
    size: <NoData>数値基準なし</NoData>,
    scenarios: [
      "OSレベルの短時間通知を見せたい時(バナー形式)",
      "アプリ内の一時的なフィードバックは専用コンポーネントがないため独自実装が必要になる時",
    ],
    stance:
      "HIGに「トースト」という名前の部品はない。通知は、ロック画面・ホーム画面・デスクトップなどのバナー、アプリアイコンのバッジ、通知センターの項目といった形で出る。アプリの中で短く出て消えるフィードバックの部品はなく、Appleはトーストとスナックバーを区別していない。",
    exceptions:
      "表示時間や同時に出す数の数値の記載なし。利用者がアプリを使っている最中なら、通知を送るより、今の画面にさりげなく加える(バッジの数を増やす、一覧に新しい項目を入れる)ほうがよいとしている。",
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "OSレベルの短時間通知にはバナー形式を使う",
      "アプリ内の一時的なフィードバック表示に厳密に対応する専用コンポーネントは持たない",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/notifications",
    refs: [
      { label: "Notifications(バナー、近い概念)", url: "https://developer.apple.com/design/human-interface-guidelines/notifications" },
    ],
    confirmedNote: "HIG Notificationsの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <svg width="140" height="30" viewBox="0 0 140 30">
        <rect x="1" y="1" width="138" height="28" rx="14" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <circle cx="16" cy="15" r="6" fill="#C2542A" opacity="0.15" />
        <text x="76" y="19" fontSize="9.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">通知バナー(近い概念)</text>
      </svg>
    ),
    illustrationNote: "画面上部の短時間バナー(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Android Developers ― Toasts overview(Material Design 3のコンポーネントではなく、AndroidのOSレベルAPI)",
    term: "Toast(AndroidのOSの仕組み)",
    color: "#2F7D6E",
    m3NotApplicable: true,
    successorNote: "M3のコンポーネントとして「操作を必要としないシンプルな通知」を実現したい場合は、Snackbarでアクションボタンを設定しない構成が事実上の後継に相当する。Snackbarはアクション任意のため、Toastが担っていた役割はボタンなしのSnackbarでもほぼ再現できる。",
    position: "M3の公式コンポーネント一覧には存在しない(旧M1〜M2時代の名残であるAndroidのプラットフォームAPI)。操作に対する簡潔なフィードバックを示す、必要最小限のスペースだけを占める小さなポップアップ。現在の画面はそのまま操作可能",
    size: <span><NoData>記載なし</NoData>。Android 12(API31)以降は最大2行のテキストに制限され、アプリのアイコンがテキストの隣に表示されるとしている。</span>,
    scenarios: [
      "取り消しや追加操作を必要としない、ごく簡潔な操作結果のフィードバックを出したい時",
      "ユーザー操作(Undoなど)を持たせたい場合はSnackbarを検討したい時",
      "アプリがバックグラウンドにあり、ユーザーに何らかの対応を求めたい場合はNotificationを使いたい時",
    ],
    stance:
      "Toastは、操作に対する簡潔なフィードバックを示す小さなポップアップで、メッセージに必要な分だけの領域を占め、現在の画面はそのまま表示・操作可能な状態を保つとしている。自動的に消えるまでの時間はToast.LENGTH_SHORT等の指定に従うとしている。公式ページは、アプリが前面表示中の場合はSnackbar(アクション性が高い)、背面にある場合はNotification(対応を求める)を検討すべきと案内しており、Toast自体は「取り消し等の操作を伴わない最も簡潔なフィードバック」という位置づけ。",
    exceptions:
      "カスタムToastビュー(独自レイアウト)はAPI30で非推奨となり、標準のテキストのみのToastかSnackbarへの置き換えが案内されている。表示テキストの行の長さは画面サイズによって変わるため、できるだけ短い文言にすべきとしている。",
    accessibility:
      <span><NoData>記載なし。</NoData>自動で消えるため、スクリーンリーダーの読み上げが間に合わないことがあり、重要な情報には使わないのが安全(AI解釈)。</span>,
    useCases: [
      "makeText()メソッドで標準的なテキストのみのToastを作成する",
      "独自レイアウトが必要な場合はカスタムToastビュー(非推奨)ではなくSnackbarを使う",
      "表示文言はできるだけ短くする(画面サイズにより行の折り返し方が変わるため)",
    ],
    searchHint: "makeText",
    url: "https://developer.android.com/guide/topics/ui/notifiers/toasts",
    refs: [
      { label: "Android Developers ― Toasts overview(Material Design 3のコンポーネントではなく、AndroidのOSレベルAPI)", url: "https://developer.android.com/guide/topics/ui/notifiers/toasts" },
      { label: "Snackbar(このコンポーネントとの使い分け)", url: "https://m3.material.io/components/snackbar/guidelines" },
    ],
    confirmedNote: "Android Developers公式ページ本文を直接取得して確認(2026-09)。カスタムToastビューがAPI30で非推奨になったこと、Android12以降の2行制限・アイコン表示も同ページで直接確認済み。",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <rect x="1" y="1" width="138" height="24" rx="13" fill="#171B36" opacity="0.85" />
        <text x="70" y="17" fontSize="9.5" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">送信しました</text>
      </svg>
    ),
    illustrationNote: "アクションボタンを持たない、最小限のポップアップ(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.3 Status Messages(主な根拠)/ 2.2.1(関わり得る)",
    term: "status(WAI-ARIAのロール。4.1.3のステータスメッセージ)",
    color: "#A3821F",
    position: "フォーカスを移さずに出る状態の知らせは、支援技術にも伝える(4.1.3)。Webでトースト風の通知を作るならrole=\"status\"が基本",
    glossary: [
      { term: "色", desc: "1.4.11(非テキストのコントラスト)は、Toast内にアイコン等の視覚的要素がある場合に適用され得る。" },
    ],
    size: "トースト専用の数値基準はないが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)は操作可能な要素に適用される(Toast自体は操作不可のため直接の対象にはなりにくい)。",
    scenarios: [
      "Webでトースト風の通知を作り、内容を支援技術にも伝えたい時(4.1.3、role=\"status\")",
      "自動で消える通知に、重要な情報を載せてよいか判断したい時",
    ],
    stance:
      "4.1.3(ステータスメッセージ・レベルAA)は、フォーカスを移さずに表示される状態の知らせ(「保存しました」など)を、支援技術にも伝えることを求める。Webでトースト風の通知を作るなら、内容の緊急度に応じてrole=\"status\"(ポライト)を使うのが基本(「スナックバー」ページと同じ考え方)。自動で消える通知は、読み上げが間に合わないことがあるため、重要な情報には使わない。",
    exceptions:
      "2.2.1(期限調節可能・レベルA)は、利用者が読んだり操作したりする時間を必要とする時間制限についての基準。操作ボタンのないトーストに当てはまるかは解釈が分かれるため、ここでは「関わり得る」とだけ書く。",
    accessibility:
      "堅牢(Robust) ― 4.1.3(Status Messages)が主な根拠。表示の時間という観点では、2.2.1(Timing Adjustable、操作可能)も関わり得る。",
    useCases: [
      "Web実装でトースト風の通知を作る場合はrole=\"status\"を使う",
      "自動で消えるため、読み上げが間に合わないことがある。重要な情報の伝達には使わない",
    ],
    searchHint: "without receiving focus",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html",
    refs: [
      { kind: "sc", level: "AA", label: "4.1.3 ステータスメッセージ", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html" },
      { kind: "sc", level: "A", label: "2.2.1 期限調節可能", url: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html" },
      { label: "WAI-ARIA: statusロール", url: "https://www.w3.org/TR/wai-aria-1.2/#status" },
      { kind: "mdn", label: "statusロール", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role" },
    ],
    confirmedNote: "4.1.3・2.2.1のUnderstandingページと、WAI-ARIA仕様のstatusロールを確認(2026-10)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="140" height="26" viewBox="0 0 140 26">
          <rect x="1" y="1" width="138" height="24" rx="6" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="70" y="17" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="status"(4.1.3)</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、実装上の注意点を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "User-Interface Elements: Glossary(「Snackbar (Toast)」項目、Toast単独の項目はなし)",
    term: "Snackbar(Toast)",
    color: "#7A4F7E",
    position: "「Toast」を独立した用語としては区別しておらず、用語集では「Snackbar (Toast)」という1つの項目にまとめられている",
    size: <NoData>数値基準なし</NoData>,
    scenarios: [
      "パッシブ通知(見落としても致命的でない)として位置づけたい時",
      "重要な情報の唯一の伝達手段にはしたくない時",
    ],
    stance:
      "UI Elements Glossaryには「Toast」単独の項目はなく、「Snackbar (Toast)」という1つの項目で扱っている。定義は「スナックバー」ページと同じ(操作を求めずに短時間で自動的に消える、一時的な非モーダルの表示)で、通知を「操作が必要」と「受け身(パッシブ)」に分ける枠組みでは受け身の側に入る。",
    exceptions:
      "トースト独自の決まりは記載なし(スナックバーと同じ扱い)。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、通知の緊急度・割り込み度に応じた使い分けの指針だ(Snackbarと共通)。",
    useCases: [
      "ユーザーの操作を必須にしない、パッシブな通知に使う",
      "重要な情報の唯一の伝達手段にはしない",
    ],
    searchHint: "Snackbar",
    url: "https://www.nngroup.com/articles/ui-elements-glossary/#Snackbar",
    refs: [
      { label: "UI Elements Glossary: Snackbar (Toast)", url: "https://www.nngroup.com/articles/ui-elements-glossary/#Snackbar" },
    ],
    confirmedNote: "用語集本文を直接取得し、「Toast」単独の項目が存在しないこと(「Snackbar (Toast)」という1項目名であること)を確認済み(2026-09)。",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <rect x="1" y="1" width="138" height="24" rx="13" fill="#7A4F7E" opacity="0.85" />
        <text x="70" y="17" fontSize="9.5" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">送信しました</text>
      </svg>
    ),
    illustrationNote: "Snackbarと同一項目内で扱われる「Toast」(概念図・系列識別色)",
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

function ToastSwatch() {
  return (
    <div style={{ width: 200, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 16px", background: "#171B36", opacity: 0.85, borderRadius: 20 }}>
        <span style={{ color: "#FFFFFF", fontSize: 13, fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>送信しました</span>
      </div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "短い文を一時的に表示して自動で消える、操作のない通知だ(主にAndroidのOSの機能)。";
const ABOUT = [
  { k: "目的・役割", v: "作業を止めずに、ちょっとした結果や状態を一言で知らせる" },
  { k: "よく使われる場面", v: "「コピーしました」「送信しました」などの簡単な知らせ" },
  { k: "似た部品との違い", v: <>操作(元に戻すなど)を添えるなら<PageLink to="/components/communication/snackbar">スナックバー</PageLink>(比べ方は<PageLink to="/components/communication/overview">情報伝達の使い分け</PageLink>)</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "自動で消える短い通知(トースト)に、大事な情報を載せてよい?",
    sides: [
      { who: "Google(Android)", color: "#2F7D6E", t: "トーストは、取り消しなどの操作のない、いちばん簡単なフィードバック用。操作が要るならスナックバー、アプリが裏にあるなら通知を使う" },
      { who: "W3C・NN group", color: "#A3821F", t: "載せない。自動で消える通知は読み上げが間に合わないことがある(W3C)。受け身の通知は見落とされやすい(NN group)" },
      { who: "Apple", color: "#C2542A", t: "アプリの中のトーストの部品はない。使っている最中なら、今の画面にさりげなく加える方法を勧めている" },
    ],
    tip: "トーストは「保存しました」のような、見落としても困らない知らせだけに使う。読んでもらう必要のある情報は、消えない場所(画面の中の文やステータスメッセージ)に出す。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "見落としても困らない知らせだけに使う", d: "「保存しました」など", who: "AI解釈" },
  { n: 2, t: "読んでもらう必要のある情報は、消えない場所に出す", d: "", who: "AI解釈" },
  { n: 3, t: "操作を添えるなら、スナックバーを使う", d: "", who: "Google" },
];

export default function CommunicationToastPage() {
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
        <SidebarNav currentPath="/components/communication/toast" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / トースト</span>
            <span>SPEC No. 035</span>
          </div>

          <h1 style={styles.title}>トースト</h1>
          <SummaryCard keyPoints={KP}
            image={<ToastSwatch />}
            imageNote="アクションボタンを持たない、最も簡潔なフィードバック。取り消し操作などを添えたい場合は「スナックバー」ページを参照。"
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />
          <div style={styles.warningBox}>
            <div style={styles.warningLabel}>⚠ 重要な注記(Google/Material Design 3)</div>
            <p style={styles.warningText}>
              <strong>Material Design 3の公式コンポーネント一覧に「Toast」という項目は存在しない。</strong>M1〜M2時代は「Snackbars & Toasts」として2つが並記されていたが(m1.material.ioに現存)、M3では<strong>Snackbarに統合され、Toastは独立したデザインシステムコンポーネントではなくなった</strong>。このページでGoogle欄として扱っているのは、M3のコンポーネントではなく、<strong>AndroidのOSレベルAPI(プラットフォーム機能)としてのToast</strong>だ。それでも独立ページとして残しているのは、実務でAndroid開発者が今なお頻繁に触れる現役のAPIであり、「スナックバー」ページとの対比(操作の有無)自体が比較材料として価値を持つためだ。
            </p>
          </div>



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              このページで比較しているのは、<strong>Material Design 3の「コンポーネント」ではなく、AndroidのOSレベルAPIとしてのToast</strong>だ(詳しくはページ冒頭の注記を参照)。「スナックバー」ページから独立させたのは、Androidの実装として<strong>両者が別のAPI</strong>だからだ。Toastは<strong>メッセージに必要な分だけの領域を占め、現在の画面はそのまま操作可能</strong>な最も簡潔なポップアップで、<strong>カスタムToastビューはAPI30で非推奨</strong>になっている。
            </p>
            <p style={styles.synthesisText}>
              興味深いのは、<strong>Nielsen Norman Groupの用語集には「Toast」単独の項目が存在せず</strong>、「Snackbar (Toast)」という1つの項目名でまとめられている点だ。つまり、UXの観点ではToastとSnackbarを別概念として扱っているのは、実質<strong>Googleの実装(別API)だけ</strong>だと言える。
            </p>
            <p style={styles.synthesisText}>
              アクセシビリティ面では、<strong>自動で消えるため、読み上げが間に合わないことがある</strong>点に注意が必要だ。W3Cの4.1.3(ステータスメッセージ)は、フォーカスを移さずに出る知らせを支援技術にも伝えることを求めており、Webでトースト風の通知を作るならrole="status"が基本だ。<strong>「操作不要で自動的に消える」という性質は、支援技術との相性の悪さと表裏一体</strong>なので、重要な情報はトーストに載せないのが実務上の注意点だ。
            </p>
            <p style={styles.synthesisText}>
              Google公式は、<strong>前面表示中の軽いフィードバックはToast、アクションを持たせたい場合はSnackbar、背面でユーザーに対応を求めたい場合はNotification</strong>という3段階の使い分けを案内している。この「アクションの有無」という軸は、「情報伝達の使い分け」ページで整理した判断軸とも一致する。M3のコンポーネントとして同じ役割を再現したい場合は、<strong>Snackbarでアクションボタンを設定しない構成</strong>が事実上の後継に相当し、Toastという名前のコンポーネントが消えても、その機能自体は失われていない。Appleも同様に「トースト」という専用コンポーネントは持たず、この点は「スナックバー」ページのApple欄と同一の一次情報だ。
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
                  <span style={styles.notApplicableChip}>{s.m3NotApplicable ? "M3では該当なし(OS APIとして存在)" : "専用コンポーネントなし"}</span>
                )}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                {s.successorNote && <InfoBox label="M3での実質的な後継" accent="#B8860B">{s.successorNote}</InfoBox>}
                <InfoBox label="推奨される使用シーン" accent="#5A9629"><UseCaseList items={s.scenarios} /></InfoBox>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
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
                      <span style={styles.notApplicableChip}>{s.m3NotApplicable ? "M3では該当なし(OS APIとして存在)" : "専用コンポーネントなし"}</span>
                    ) : (<span style={{ color: "#666D93" }}>―(この観点は対象外)</span>)}
                  </div>
                ))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>M3での実質的な後継</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.successorNote || <span style={{ color: "#666D93" }}>―(この観点は対象外)</span>}</div>))}
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
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>


          <RelatedPages paths={["/components/communication/overview", "/components/communication/snackbar", "/components/communication/alert"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["通知・状態表示"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  warningBox: { background: "#FFF6E5", borderLeft: "4px solid #B8860B", padding: "14px 18px", marginBottom: 20, borderRadius: "0 4px 4px 0" },
  warningLabel: { fontSize: 12.5, fontWeight: 700, color: "#8A6210", marginBottom: 6, letterSpacing: 0.2 },
  notApplicableChip: { display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#8A6210", background: "#FFF6E5", border: "1px solid #F0DBA6", padding: "3px 8px", borderRadius: 3, marginTop: 8, letterSpacing: 0.2 },
  warningText: { fontSize: 12.5, lineHeight: 1.75, color: "#5A4419", margin: 0 },
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
