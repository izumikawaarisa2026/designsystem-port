import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Communication / スナックバー」ページ。
 *
 * 2026-09 分割の経緯: 当初「スナックバー・トースト」として1ページにまとめていたが、
 * Androidの実装としては別のAPI(Snackbar=アクション可能、Toast=操作不要のOS標準
 * ポップアップで、カスタムToastビューはAPI30で非推奨)であり、Google公式も
 * 「アプリが前面表示中はSnackbar、背面ではNotification」と用途を明確に分けている
 * ことを確認したため、ユーザーの了承のもとページ単位で分割した(ダイアログ vs
 * フルスクリーンダイアログと同じ考え方)。「トースト」ページ側を参照。
 *
 * 各系列エントリに `scenarios`(推奨される使用シーン)フィールドを新設し、
 * アクセシビリティ観点の `useCases` とは区別した。`stance` は定義・原則のみに
 * 絞り、具体的な利用シーンは `scenarios` 側に記載している。
 *
 * Nielsen Norman Group(UI Elements GlossaryのSnackbar項目、Indicators/
 * Validations/Notifications記事)/ Google(Android Developers公式ページ
 * developer.android.com/guide/topics/ui/notifiers/toasts、Snackbarとの
 * 使い分け案内を含む)は本文を直接取得して確認済み(2026-09)。W3C(role="status"/
 * role="alert")はMDN解説記事による確認。Appleには「スナックバー」という名称の
 * コンポーネントは見当たらず、最も近い概念(バナー形式の通知)を検索結果により
 * 間接確認した(2026-09)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Notifications(バナー、近い概念)",
    color: "#C2542A",
    position: "「スナックバー」という名称のコンポーネントはなく、最も近いのは画面上部に短時間表示され自動的に消える「バナー」形式の通知",
    size: "具体的な数値基準は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    scenarios: [
      "OSレベルの短時間通知を見せたい時(バナー形式)",
      "アプリ内の一時的なステータス表示は専用コンポーネントがないため独自実装が必要になる時",
    ],
    stance:
      "HIGには「スナックバー」という名称のコンポーネントは見当たりません。最も近い概念は、デバイス使用中に画面上部に数秒間表示されてから消える「バナー」形式の通知だとされています。ただしこれは主に通知センターと連動するOSレベルの通知の表示形式であり、アプリ内の一時的なステータスメッセージ専用のコンポーネントとは言い切れない点に注意が必要です。",
    exceptions:
      "表示時間・同時表示数などの数値基準は確認できていません。重大な確認が必要な場合は、このページの対象ではなく「ダイアログ」ページで比較したAlertsを使うべきと考えられます。",
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "OSレベルの短時間通知にはバナー形式を使う",
      "アプリ内の一時的なステータス表示に厳密に対応する専用コンポーネントは持たない",
      "重要な確認が必要な場合は「ダイアログ」ページのAlertsを検討する",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/notifications",
    confirmedNote: "「スナックバー」に厳密に対応するコンポーネントは見当たらず、最も近い「バナー」形式の通知は検索結果による間接確認です(2026-09)。「Notifications」ページ本文はSPAのため直接確認できていません。",
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
    doc: "Material Design 3 ― Snackbar",
    color: "#2F7D6E",
    position: "画面下部に一時的に表示し、アプリが実行した(またはこれから実行する)処理をユーザーに知らせる非モーダルなメッセージ。同時に1つだけ表示する",
    size: "コンパクトなブレークポイントでは、1〜2行のテキストを収めるため、縦方向に48dpから64dpまで拡張するとしています。タブレット・デスクトップなど中〜大型のブレークポイントでは、長めの文章に対応するため横方向に伸縮させ、読みやすい行長の目安として1行あたり40〜60文字程度を推奨しています。画面幅が広いレイアウトで下部の表示位置が一定であれば、左揃え・中央揃えのどちらでも構わないとしています。",
    colorInfo: "コンテナは不透明なグレーの長方形が基本で、影付きの単色背景によりラベルの文字を読みやすくするとしています。テキストがはっきり読める範囲であれば背景にわずかな透明度を適用することも許容されますが、テキストラベルの色をテキストボタンの色と同じにしてはいけないとしています。",
    scenarios: [
      "操作完了後の簡潔な状態通知をしたい時(例: 「アーカイブしました」)",
      "取り消し可能な操作にUndo(元に戻す)アクションを添えたい時",
      "アプリが前面表示中に軽量なフィードバックを出したい時(背面ではNotificationを使う)",
    ],
    stance:
      "Snackbarは、アプリが実行した、またはこれから実行する処理をユーザーに知らせる、画面下部に一時的に現れる非モーダルなメッセージコンポーネントです。ユーザー体験を妨げてはならず、ユーザーはSnackbarを操作しなくてもページのコンテンツを閲覧できるべきだとしています。M2からM3への変更点として、Snackbarの動作は「一時的に表示され自動的に消える」か「ユーザーが操作するまで画面に残る」かのどちらかであることが明確化されました。",
    exceptions:
      "Snackbarに設定できるアクションは1つまでで、閉じる/キャンセルアクションは任意とされています。アイコンの追加、装飾されたテキスト、インラインリンクの使用は避けるべきで、必要な場合はダイアログなど別のコンポーネントを検討すべきとしています。塗りつぶし・立体的(elevated)なボタンスタイルは目立ちすぎるため使うべきではないとしています。なお、ダイアログも重要なメッセージの表示を想定したコンポーネントであるため、メッセージの重要度に応じてSnackbarとダイアログのどちらを使うかを判断し、Snackbarの濫用を避けるべきだとしています。配置面では、UIの下部・メインコンテンツより手前に置き、FABや固定ツールバーなど他の要素と重なる場合は少し上にずらす、頻繁に操作するタッチ領域やナビゲーション部分の手前には置かない、といった配慮が必要としています。画面幅いっぱいに広げられるのは、アプリバーやナビゲーションバーのような永続的なナビゲーション要素が無い場合に限られ、FABがある場合はSnackbarをFABより上に表示するとしています。",
    accessibility:
      "操作可能(Operable) ― Web上で自動的に閉じるSnackbarは、視覚に障害のある人や情報の理解に時間がかかる人にとって利用しづらいとしています。対策として、(1)Snackbarをトリガーした操作の近くに別途インラインフィードバックを用意する(例: 「保存」ボタンのラベルを「保存済み」に変える)、(2)Snackbarに操作を追加して自動的に閉じないようにする、の2つを挙げています。キーボード操作時に、操作可能な要素を完全に覆い隠すような配置も避けるべきだとしています。",
    useCases: [
      "操作完了後の簡潔な状態通知に使う(例: 「アーカイブしました」)",
      "取り消し可能な操作にはUndoアクションを添える",
      "同時に複数のSnackbarを表示しない(1つまで。更新情報があれば古いSnackbarを即座に置き換えてよい)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/snackbar/guidelines",
    urlSecondary: [{ label: "Android Developers: Toasts overview(Snackbarとの使い分け)", url: "https://developer.android.com/guide/topics/ui/notifiers/toasts" }],
    confirmedNote: "ユーザー提供の公式ドキュメント(MD3_text/snackbar.docx)により、使用法・M2からの変更点・容器・アクション・配置・レスポンシブレイアウト・行動・Web上のアクセシビリティ要件の各セクションを2026-09に直接確認・反映。コンテナの高さ以外の具体的なdp数値は未確認。",
    illustration: () => (
      <svg width="140" height="30" viewBox="0 0 140 30">
        <rect x="1" y="1" width="138" height="28" rx="6" fill="#2F7D6E" />
        <text x="55" y="19" fontSize="9.5" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">アーカイブしました</text>
        <text x="118" y="19" fontSize="9.5" fill="#A9D6CC" fontWeight="700" textAnchor="middle" fontFamily="Jost, Noto Sans JP">元に戻す</text>
      </svg>
    ),
    illustrationNote: "Undo(元に戻す)アクション付きのSnackbar(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― role=\"status\" / role=\"alert\"(ライブリージョン)",
    color: "#A3821F",
    position: "緊急度に応じて、控えめな通知にはrole=\"status\"、即時に伝えるべき警告にはrole=\"alert\"を使い分ける",
    size: "スナックバー専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5)はアクションボタンに適用されます。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、境界線やアイコンなどの視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    glossary: [
      { term: "role=\"status\"", desc: "aria-live=\"polite\"相当の暗黙のライブリージョン。スクリーンリーダーは現在読み上げ中の内容を終えてから新しいテキストを読み上げる。確認メッセージなど緊急性の低い通知に向く。" },
      { term: "role=\"alert\"", desc: "aria-live=\"assertive\"相当。スクリーンリーダーが現在読み上げている内容を中断してでも即座に読み上げる。ユーザーが即座に気づく必要のある重大なエラーに限定して使うべきとされる。" },
    ],
    scenarios: [
      "確認メッセージや処理結果の通知などにはrole=\"status\"を使いたい時",
      "ユーザーが即座に気づく必要のある重大なエラーにrole=\"alert\"を使いたい時(多用は避ける)",
    ],
    stance:
      "スナックバーのような一時的な通知は、緊急度に応じてrole=\"status\"(ポライト)とrole=\"alert\"(アサーティブ)を使い分けるべきだとしています。",
    exceptions:
      "role=\"alert\"は読み上げ中の内容を中断するため多用は避けるべきで、緊急性の低い通知に使うと過剰な割り込みになるとしています。",
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― ライブリージョンによる自動読み上げ(4.1.3 Status Messages)が中心的な基準です。ターゲットサイズ(2.5)、非テキストのコントラスト(1.4.11)も関わります。",
    useCases: [
      "確認・処理完了などの通知にはrole=\"status\"を使う",
      "即座の対応が必要な重大なエラーにはrole=\"alert\"を使う",
      "role=\"alert\"の多用を避け、読み上げの割り込みを最小限にする",
    ],
    searchHint: "polite",
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role",
    urlSecondary: [{ label: "role=\"alert\"", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/alert_role" }],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="140" height="30" viewBox="0 0 140 30">
          <rect x="1" y="1" width="138" height="28" rx="6" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="70" y="19" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="status" / "alert"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、緊急度による役割の使い分けを図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "User-Interface Elements: Glossary(Snackbar (Toast)項目)/ Indicators, Validations, and Notifications",
    color: "#7A4F7E",
    position: "一時的な非モーダルダイアログで、操作不要のまま自動的に消える。多くはUndoなど1つの操作ボタンを持てる",
    size: "数値基準は明言していません。",
    colorInfo: "色についての数値基準はありません。",
    scenarios: [
      "処理完了の確認をしたい時(例: ファイル削除の完了通知)",
      "元に戻す(Undo)など操作を1つだけ添えたい時",
      "重要な情報の唯一の伝達手段にはしたくない時(パッシブ通知という前提を踏まえる)",
    ],
    stance:
      "スナックバーを、プロセスの状態をユーザーに知らせ、ユーザーの操作を要求せずに短時間で自動的に消える、一時的な非モーダルダイアログと定義しています。通知全般を「アクション必須」と「パッシブ(受動的)」の2種類に分類しており、スナックバーは基本的にパッシブ通知(見落としても致命的でない)に位置づけられるとしています。",
    exceptions:
      "パッシブ通知は非割り込み型であるがゆえに見落とされやすいという弱点があるとしており、重要な情報を伝える手段としては不向きだとしています。ユーザーの直接的な操作に対する応答ではなく、システム側の一般的な出来事を伝える点でも、他のコンポーネント(バリデーションなど)とは性質が異なるとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、通知の緊急度・割り込み度に応じた使い分けの指針です。",
    useCases: [
      "処理完了の確認に使う(例: ファイル削除の完了通知)",
      "元に戻す(Undo)など、操作を1つだけ添えられる",
      "ユーザーの操作を必須にしない、パッシブな通知に使う(重要な情報の唯一の伝達手段にはしない)",
    ],
    searchHint: "Snackbar",
    url: "https://www.nngroup.com/articles/ui-elements-glossary/#Snackbar",
    urlSecondary: [{ label: "Indicators, Validations, and Notifications", url: "https://www.nngroup.com/articles/indicators-validations-notifications/" }],
    confirmedNote: "用語集の項目名は「Snackbar (Toast)」で、Snackbar/Toastを別項目としては区別していません(2026-09、本文を直接取得して確認)。このページではGoogle実装(操作を持てる)としての性質を中心に扱っています。",
    illustration: () => (
      <svg width="140" height="30" viewBox="0 0 140 30">
        <rect x="1" y="1" width="138" height="28" rx="6" fill="#7A4F7E" />
        <text x="55" y="19" fontSize="9.5" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">送信しました</text>
        <text x="118" y="19" fontSize="9.5" fill="#E7DCE8" fontWeight="700" textAnchor="middle" fontFamily="Jost, Noto Sans JP">元に戻す</text>
      </svg>
    ),
    illustrationNote: "パッシブ通知としてのスナックバー(概念図・系列識別色)",
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

function SnackbarSwatch() {
  return (
    <div style={{ width: 260, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 16px", background: "#2E3457", borderRadius: 8 }}>
        <span style={{ color: "#FFFFFF", fontSize: 13, fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>1件のメールをアーカイブしました</span>
        <span style={{ color: "#9EB6FF", fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap" }}>元に戻す</span>
      </div>
    </div>
  );
}

export default function CommunicationSnackbarPage() {
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
        <SidebarNav currentPath="/components/communication/snackbar" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / スナックバー</span>
            <span>SPEC No. 030</span>
          </div>

          <h1 style={styles.title}>スナックバー</h1>
          <p style={styles.subtitle}>4つのガイドラインが、操作完了後の簡潔な状態通知(スナックバー)をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <SnackbarSwatch />
            <p style={styles.swatchNote}>画面下部に一時的に現れ、操作不要で自動的に消える。Undo(元に戻す)など1つの操作ボタンを持てる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページは「スナックバー」に絞った内容です。当初は「トースト」と一体で扱っていましたが、Androidの実装としては<strong>別のAPI</strong>(Snackbar=アクションを持てる、Toast=操作不要のOS標準ポップアップ)であり、Google公式も用途を明確に分けているため、専用ページ「トースト」に切り出しました(末尾のリンクを参照)。スナックバーの一番の特徴は<strong>取り消し可能な操作(Undo)を1つだけ持てる</strong>点で、受動的な通知でありながら操作の余地を残す中間的な性質を持ちます。
            </p>
            <p style={styles.synthesisText}>
              Android Developers公式ページを直接確認したところ、Googleは<strong>「アプリが前面表示中はSnackbar、背面にある場合はNotification」</strong>と明確に使い分けを案内していることが分かりました。さらに<strong>「同時に1つまで」「アクションは1つまで」</strong>という具体的な制約も持っています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは、通知全般を「アクション必須」と<strong>「パッシブ(受動的)」</strong>に分類する中で、スナックバーをパッシブ通知に位置づけています。つまり「見落としても致命的ではない」ことが前提であり、<strong>重要な情報を伝える唯一の手段としては使うべきではありません</strong>(重要な確認には「ダイアログ」ページを使う)。W3Cも、緊急度に応じて<strong>role="status"(控えめ)とrole="alert"(即時)を使い分けるべき</strong>としており、スナックバーの多くはrole="status"に該当します。
            </p>
            <p style={styles.synthesisText}>
              なお、Nielsen Norman Groupの用語集では<strong>「Snackbar (Toast)」として1つの項目</strong>にまとめられており、両者を明確に別コンポーネントとして区別しているのは実質<strong>Google(別API)だけ</strong>だという点も付記しておきます。
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
            <a href="/components/communication/toast" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>トースト ↗</div>
              <div style={styles.linkCardDesc}>操作不要のOS標準ポップアップ(Toast)の4系列比較。「スナックバー」ページから独立</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["通知・状態表示", "エラー・確認"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(NN group・Googleは本文確認済み。W3CはMDN解説記事による確認。Appleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはNotificationsページへのリンクです(専用コンポーネントなしのため近似)。GoogleはSnackbarページ+Android Developers公式ページ(Toastsとの使い分け)へのリンクです。WCAGはMDNのstatus role解説ページ(alert roleも併記)、NN groupは用語集内の実アンカー(Snackbar (Toast)項目)と関連記事です。
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
