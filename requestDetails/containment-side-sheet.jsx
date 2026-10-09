import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Containment / サイドシート」ページ(旧ページ名「モーダルポップアップ」)。
 * 確認・警告に特化した「ダイアログ」ページとは異なり、コントロールに関連する
 * 補助的な情報・操作を、画面の一部(中央・側面など)に重ねて示すオーバーレイ
 * (ポップオーバー・サイドシート)を比較する。
 *
 * 2026-09 改訂の経緯: 当初このページは、下からせり出す半モーダル(ボトムシート)と
 * 画面を覆う/中央に出るモーダル(ポップオーバー・サイドシート)を1ページに混在させて
 * いたが、ユーザーの了承のもとページ単位で分割した(タブ vs セグメントコントロール、
 * ナビゲーションバー vs アプリバーと同じ考え方)。ボトムシート関連の内容は
 * 「ボトムシート」ページへ切り出し、このページはポップオーバー・サイドシート中心の
 * 内容に絞っている。さらに、Google/NN groupの用語(サイドシート/Side Sheet)がより
 * 実態に即しているとのユーザー指摘を受け、ページ名を「モーダルポップアップ」から
 * 「サイドシート」に改称した。
 *
 * Google欄はユーザー提供の公式ドキュメント(MD3_text/SIDESHEET.docx)により
 * 直接確認・全面更新(2026-09)。Nielsen Norman Group(UI Elements Glossaryの
 * Popup/Overlay/Side Sheet各項目)/ W3C(MDNのaria-haspopup属性解説)は公式ページ・
 * 記事本文を直接取得して確認済み(2026-09)。Apple(HIG Popovers)は公式サイトが
 * クライアント側レンダリングのSPAで本文を直接取得できなかったため、検索結果による
 * 間接確認(2026-09)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Popovers(サイドシートに当たる専用の部品はなく、役割が近いものを参考として掲載)",
    color: "#C2542A",
    position: "コントロールをタップ/クリックした際に、出現元を示す矢印とともに現れる一時的なビュー(主にiPad向け)",
    size: "具体的なpt数値は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "サイドシートに当たる専用の部品はAppleにはありません。役割が近いポップオーバーを参考として載せています(形も閉じ方も別物です)。ポップオーバーは、コントロールや対話可能な領域をタップ・クリックした際に他のコンテンツの上に現れる一時的なビューで、通常は出現元を指す矢印を持つとしています。ユーザー視点で捉えると、ポップオーバーは軽量・非侵襲的なツールチップと、操作を要求するブロッキングなダイアログの中間に位置する性質を持つと言えます。コントロールから吹き出すように出現し、範囲外のタップで自動的に消える点はツールチップ的ですが、ボタンなど操作可能なアクションを含められる点はダイアログ的です。",
    scenarios: [
      "画面上のコンテンツに関連する選択肢や情報を示したい時(例: 共有オプションの表示)",
      "軽量で一時的な操作パネルを、対象コントロールの近くに表示したい時",
    ],
    exceptions:
      "「閉じる」専用のボタンは基本的に置くべきではなく、ポップオーバーは不要になった時点で自動的に閉じるべきとしています。ただし、変更を保存する/しないを明確にする必要がある場面では、キャンセル・完了などの閉じるボタンを含める価値があるとしています。範囲外のタップで自動的に閉じる際は作業内容を保存しておくべきで、明示的なキャンセル操作があった場合のみ破棄すべきだとしています。",
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "画面上のコントロールに関連する選択肢・情報を表示する",
      "範囲外のタップや選択後は自動的に閉じるようにする(明示的な閉じるボタンは限定的に使う)",
      "ポップオーバーが重要なコンテンツやトリガー元の要素を覆わないようにする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/popovers",
    confirmedNote: "「Popovers」ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#C2542A" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="30" y="10" width="70" height="34" rx="6" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <path d="M55 44l6 8 6-8z" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="65" y="30" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">ポップオーバー</text>
      </svg>
    ),
    illustrationNote: "出現元を指す矢印付きの一時的なビュー(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Side sheets(標準/モーダル)",
    color: "#2F7D6E",
    position: "画面側面に固定表示する副次的コンテンツ。標準(メイン領域と共存)とモーダル(背景操作を無効化)の2種類",
    size:
      "幅は固定で(既定の幅があり、レイアウトに応じてサイズを変えられる)、画面端(通常は右側。左端にあるナビゲーションコンポーネントとの干渉を避けるため)に配置し、16dp程度内側にずらすことは許容されるとしています。画面端からの推奨マージンを超えて内側に配置しないよう注意しており、シートの位置・スクロール挙動が分かりにくくなり、メインコンテンツも隠れてしまうためだとしています。具体的なdp数値は文書内に記載がなく確認できていません。",
    colorInfo: "色の値はデザイントークンを通して実装されるとしています。具体的なカラートークン名は確認できていません。",
    glossary: [
      { term: "標準 / モーダルサイドシート", desc: "標準サイドシートはメイン領域と共存し、ユーザーがメインコンテンツを操作している間も表示され続ける。モーダルサイドシートはコンパクトな画面向けで、下にあるコンテンツを操作するには閉じる必要がある。" },
      { term: "戻る / 閉じるアイコンボタン(いずれもオプション)", desc: "戻るアイコンボタンはサイドシートを閉じる、または別の画面へ移動するための要素。閉じるアイコンボタンは、開閉フローを予測可能にしアクセシビリティを高めるため、設置が強く推奨されている。" },
    ],
    stance:
      "標準サイドシートは、タブレット・デスクトップなど中〜大規模の画面サイズで主に使われる補助的な画面だとしています。状況に応じた操作や情報表示のための一貫性があり予測可能な画面を提供し、メインコンテンツを補完するコンテンツを表示するとしています。画面サイズが限られるモバイル端末などのコンパクトな画面では、モーダルサイドシートが好まれるとしており、標準サイドシートと同じ種類のコンテンツを表示できますが、下にあるコンテンツを操作するにはサイドシートを閉じる必要があるとしています。",
    scenarios: [
      "フィルタなど、主要コンテンツに影響を与えるアクションの一覧を表示したい時",
      "メインコンテンツを補完する補足コンテンツ・機能を表示したい時",
    ],
    exceptions:
      "サイドシートに必須の要素はコンテナのみで、戻るアイコンボタン・閉じるアイコンボタン・アクションボタン(保存・編集・ダウンロードなど)・区切り線はいずれもオプションだとしています。既定の幅を持ちつつレイアウトのニーズに応じてリサイズ可能で、独立して垂直方向にスクロールできます(水平方向のスクロールはできません)。Androidでは「予測戻る」ジェスチャーにより、サイドシート上を左右にスワイプする操作にも対応するとしています。",
    accessibility:
      "操作可能(Operable) ― 利用者は支援技術を使ってサイドシートを非表示にできるべきだとしています。閉じるアイコンボタンの設置が強く推奨されており、フォーカスしているサイドシートを簡単に閉じられるようにするためだとしています。サイドシート内の操作は、キーボードまたはスイッチコントロールを使ってタブ順序でフォーカスできるとしています。",
    useCases: [
      "中〜大画面で、主要コンテンツと共存する補助的な操作・情報を提示する(標準サイドシート)",
      "コンパクトな画面では、下のコンテンツを操作する前に閉じる必要があるモーダルサイドシートを使う",
      "閉じるアイコンボタンを設置し、開閉フローを予測可能にする(アクセシビリティ向上のため強く推奨)",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/side-sheets/guidelines",
    confirmedNote: "M3の公式ページ本文(m3.material.io「Side sheets」のガイドライン)で、使用法・構成要素(アナトミー)・配置・適応型デザイン・行動(スクロール・予測戻るジェスチャー)・アクセシビリティの各セクションを2026-09に直接確認・反映。具体的な幅などのdp数値は文書内に記載がなく未確認。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#2F7D6E" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="72" y="6" width="42" height="58" rx="6" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <rect x="78" y="14" width="24" height="4" rx="2" fill="#2F7D6E" opacity="0.4" />
        <text x="93" y="38" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">サイド</text>
        <text x="93" y="48" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">シート</text>
      </svg>
    ),
    illustrationNote: "画面側面に固定表示する副次コンテンツ(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "APG ― Dialog (Modal)パターン / WCAG 4.1.2",
    color: "#A3821F",
    position: "シート本体はdialogとして作り、ラベルとフォーカスの移動を設計する。背景を操作できないようにするときだけaria-modal=\"true\"",
    size: "サイドシート専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)は閉じるボタンなどの操作要素に適用されます。",
    colorInfo: "色の基準はありませんが、1.4.11(非テキストのコントラスト)がフォーカスインジケーターや境界線に適用され得ます。",
    glossary: [
      { term: "aria-modal", desc: "ダイアログが表示されている間、背景の内容を操作できないことを支援技術に伝える属性。背景を操作できる(非モーダルの)シートには付けない。" },
      { term: "aria-haspopup", desc: "シートを開く側のボタンに付けて、どの種類のポップアップ(menu/listbox/tree/grid/dialog)を開くかを支援技術に伝える属性。シート本体の作り方ではない。" },
    ],
    stance:
      "W3Cはサイドシートという部品を定めていないため、シート本体は、APGのDialogパターンを参考にdialogとして作るのが基本です(AI解釈)。role=\"dialog\"とaria-labelledby(またはaria-label)で名前を付け、開いたらシートの中へ、閉じたら開いたボタンへフォーカスを戻します。背景を操作できないようにする(モーダルの)シートだけにaria-modal=\"true\"を付けます。WCAGの要件は、名前・役割・状態が支援技術に伝わること(4.1.2)です。開く側のボタンには、補助としてaria-haspopup=\"dialog\"を付けることもできます(開く側の属性で、シート本体の作り方ではありません)。",
    scenarios: [
      "シート本体をdialogとして作り、名前とフォーカスの移動を設計したい時",
      "背景コンテンツを操作可能なまま残したい時は、aria-modalを付けない非モーダルとして扱う",
    ],
    exceptions: "APGの例は考え方を示すもので、そのまま本番には使わないよう注意書きがあります。ARIAの属性を付けるだけでは動きは付かないため、キーボードでの開閉・フォーカスの移動はJavaScriptで実装する必要があります。",
    accessibility:
      "堅牢(Robust) ― 名前・役割・状態を支援技術に伝えること(4.1.2)が中心です。フォーカスの移動やキーボードでの開閉は「操作可能」(2.1.1・2.4.3)にも関わります。",
    useCases: [
      "シート本体にrole=\"dialog\"と名前(aria-labelledbyなど)を付ける",
      "開いたらシートの中へ、閉じたら開いたボタンへフォーカスを移す",
      "背景を操作できないモーダルのシートだけにaria-modal=\"true\"を付ける",
      "開く側のボタンには、補助としてaria-haspopup=\"dialog\"を付けてもよい",
    ],
    searchHint: "aria-modal",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    urlSecondary: [
      { label: "4.1.2 Name, Role, Value", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
      { label: "解説(MDN): aria-haspopup", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="32" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="dialog"</text>
          <text x="60" y="44" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">+ 名前・フォーカス</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、属性・役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "User-Interface Elements: Glossary(Popup/Overlay/Side Sheet)",
    color: "#7A4F7E",
    position: "「ポップアップ(ポップオーバー)」「オーバーレイ」「サイドシート」を、それぞれ独立した用語として定義",
    size: "数値基準は明言していません。",
    colorInfo: "色についての数値基準はありませんが、オーバーレイが画面の一部だけを覆う場合、背景を暗くする(ディム)ことが多いとしています。",
    glossary: [
      { term: "Popup(Popover)", desc: "画面全体は占有しないオーバーレイ。「popup」は「overlay」「lightbox」とほぼ同義に使われ、AppleはiOS/iPadOS/macOSアプリでこれを「popover」と呼ぶ、としている(用語集本文より)。" },
      { term: "Overlay", desc: "既存のページコンテンツの上に別のコンテンツを表示するUI要素。モーダル・非モーダルのどちらもあり、画面全体または一部だけを覆う場合があり、一部だけを覆う場合は背景を暗くすることが多い(用語集本文より)。" },
      { term: "Side Sheet(Drawer, Flyout)", desc: "画面の左右どちらかの端からスライドして現れ、通常は画面のかなりの部分を覆うオーバーレイの一種。ボトムシートと同様、モーダル(背景操作を妨げる)にも非モーダルにもなり得る(用語集本文より)。" },
    ],
    stance:
      "用語集(UI Elements Glossary)は、このページで扱う概念を3つの独立した項目として定義しています。「Popup(Popover)」は画面全体を占有しないオーバーレイ全般を指す総称で、Appleの「popover」はこの一種だとしています。「Side Sheet」は画面の側面からスライドして現れるオーバーレイで、モーダル・非モーダルどちらもあり得るとしています。",
    scenarios: [
      "画面の一部だけを覆う軽量なオーバーレイを指す言葉を選びたい時(Popup/Popover)",
      "側面から現れる副次コンテンツ全般を指す言葉を選びたい時(Side Sheet、ナビゲーション以外も含む)",
    ],
    exceptions:
      "「Side Sheet」はドロワーメニュー(ナビゲーション専用の側面メニュー、「ドロワー/サイドナビ」ページで別途比較)よりも広い概念で、ナビゲーション以外の副次的コンテンツ全般を含む点に注意が必要です。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、UI要素の分類・命名の整理です。",
    useCases: [
      "画面の一部だけを覆う軽量なオーバーレイにはPopup(Popover)の考え方を当てはめる",
      "側面から現れる副次コンテンツ全般(ナビゲーション以外も含む)にはSide Sheetの考え方を当てはめる",
      "ナビゲーション専用の側面メニューは「ドロワー/サイドナビ」ページのDrawer Menuを参照する",
    ],
    searchHint: "Side Sheet",
    url: "https://www.nngroup.com/articles/ui-elements-glossary/#Side-Sheet",
    urlSecondary: [{ label: "Popup(Popover)の項目", url: "https://www.nngroup.com/articles/ui-elements-glossary/#Popup" }],
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#7A4F7E" strokeWidth="1.2" strokeDasharray="2 2" />
        <rect x="70" y="6" width="44" height="58" rx="6" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="92" y="38" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">Side Sheet</text>
      </svg>
    ),
    illustrationNote: "用語集で定義される「Side Sheet」(概念図・系列識別色)",
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

function SideSheetSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto", position: "relative", height: 90 }}>
      <div style={{ position: "absolute", inset: 0, background: "#F0F4F8", borderRadius: 8 }} />
      <div style={{ position: "absolute", right: 20, top: 10, bottom: 10, width: 120, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 10, padding: "10px 14px 14px", boxShadow: "-4px 0 14px rgba(23,27,54,0.10)" }}>
        <div style={{ fontSize: 11.5, color: "#454C78" }}>補助的な情報・操作</div>
      </div>
    </div>
  );
}

export default function ContainmentSideSheetPage() {
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
        <SidebarNav currentPath="/components/containment/side-sheet" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / サイドシート</span>
            <span>SPEC No. 025</span>
          </div>

          <h1 style={styles.title}>サイドシート</h1>
          <p style={styles.subtitle}>4つのガイドラインが、コントロールに関連する補助的な情報・操作を示すオーバーレイ(ポップオーバー・サイドシート)をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <SideSheetSwatch />
            <p style={styles.swatchNote}>画面の一部(中央・側面など)に重ねて表示する補助的なオーバーレイ。下からせり出す「ボトムシート」ページ、確認・警告用の「ダイアログ」ページとは、それぞれ役割が異なる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページは、旧「モーダルポップアップ」ページのうち、<strong>下からせり出す半モーダルの内容を「ボトムシート」ページへ切り出した後に残った、ポップオーバー・サイドシート中心の内容</strong>をまとめたものです。ページ名も、Google・Nielsen Norman Groupが共通して使う「サイドシート」という呼び方に合わせて改称しました。
            </p>
            <p style={styles.synthesisText}>
              Appleの<strong>Popovers</strong>は、コントロールに関連する情報を出現元の矢印付きで示す軽量なオーバーレイです。捉え方としては、<strong>軽量で非侵襲的なツールチップと、操作を要求するブロッキングなダイアログの中間</strong>に位置するUIと言えます。コントロールから吹き出すように出現し自動的に消える点はツールチップ的ですが、ボタンなど操作可能なアクションを含められる点はダイアログ的です。Googleの<strong>サイドシート</strong>(画面側面に固定表示)とは見た目こそ異なりますが、「コンテンツを完全に切り替えず、補助的な情報・操作を添える」という役割は共通しています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupの用語集は、<strong>「Popup(Popover)」「Overlay」「Side Sheet」を独立した用語として整理</strong>しており、Side Sheetは「ドロワー/サイドナビ」ページで比較したナビゲーション専用の「Drawer Menu」より広い概念(副次コンテンツ全般)だと定義しています。この整理は、Google側の「サイドシート」の位置づけを理解する助けになります。
            </p>
            <p style={styles.synthesisText}>
              実務上の注意点として、<strong>サイドシートに当たる専用の部品はAppleにはなく</strong>、ここで並べたポップオーバーは役割が近い参考の部品です。ポップオーバーは不要になれば自動的に閉じ、閉じる専用のボタンは基本的に置かないとされる一方、Googleのサイドシートは<strong>閉じるアイコンボタンの設置を強く勧めています</strong>。部品の性質が違うため、どちらが正しいかではなく、<strong>サイドシートを作るならGoogleの勧めに沿って閉じるボタンを置く</strong>のが安全です。W3Cはサイドシートを定めていないため、シート本体は<strong>APGのDialogパターンを参考にdialogとして作り、名前とフォーカスの移動を設計する</strong>のが基本です(ARIAの属性を付けるだけでは動きは付かず、キーボード操作・フォーカス管理はJavaScriptで実装します)。
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
            <a href="/components/containment/bottom-sheet" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>ボトムシート ↗</div>
              <div style={styles.linkCardDesc}>下からせり出す半モーダルの4系列比較(このページから独立)</div>
            </a>
            <a href="/components/containment/dialog" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>ダイアログ ↗</div>
              <div style={styles.linkCardDesc}>確認・警告のため操作を完全にブロックする基本ダイアログの4系列比較</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["段階的に見せる"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(GoogleはM3の公式ページ本文で確認済み。NN group・W3Cは本文確認済み。Appleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはPopoversページへのリンクです。GoogleはSide sheetsページへのリンクです。W3CはAPGのDialogパターンを主リンクに、4.1.2とMDNのaria-haspopup解説を併記、NN groupは用語集内の実アンカー(Side Sheet項目、Popup項目)です。
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
