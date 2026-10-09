import React from "react";
import SidebarNav from "./sidebar-nav";

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
    color: "#C2542A",
    position: "大(large)・中(medium)の2段階の高さ(デタント)で静止する、既定でモーダルなシート",
    size:
      "大デタントは展開時の全高、中デタントは展開時のおよそ半分の高さとされています。既定では大デタントのみをサポートし、中デタントを追加すると両方の高さの間で静止できるようになる一方、中デタントのみを指定すると全高までは展開できなくなるとしています。",
    colorInfo: "色についての明確な規定は確認できていません。",
    glossary: [
      { term: "デタント(detent)", desc: "シートが自然に静止する高さの段階。大デタントは展開時の全高、中デタントは約半分の高さを指す。" },
      { term: "グラバー(grabber)", desc: "シート上端に表示される小さな水平のインジケーター。ドラッグしてシートの高さを変更できることを示す。" },
    ],
    stance:
      "シートは、現在の文脈に密接に関連する、範囲を限定したタスクを行うのに役立つコンポーネントだとしています。既定ではモーダルとして提示され、閉じるまで親ビューを操作できなくするとしています。",
    scenarios: [
      "現在の文脈に密接に関連する、範囲を限定したタスクを行わせたい時",
      "コンテンツのスクロールやグラバーのドラッグで、シートの高さを調整させたい時",
    ],
    exceptions:
      "中デタントのみを指定した場合、シートはそれ以上(全画面)には展開できなくなる点に注意が必要だとしています。複数シートの積み重ねに関する明確な記載はこのトピックでは確認できていません。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。標準のシートコントロールを使えば、支援技術には自動的に状態が伝わると考えられます。",
    useCases: [
      "現在の文脈に関連する、範囲を限定したタスクに使う(既定はモーダル)",
      "大デタントのみ、または大+中デタントの組み合わせで高さの挙動を選ぶ",
      "コンテンツのスクロール、またはグラバーのドラッグでリサイズできるようにする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/sheets",
    confirmedNote: "「Sheets」ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。デタントの定義・グラバーの挙動は複数の検索結果で一致しています。",
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
    color: "#2F7D6E",
    position: "コンパクト・ミディアムのブレークポイントで使う、標準(メイン領域と共存)とモーダル(背景操作を完全にブロック)の2種類を持つ画面下部のシート",
    size:
      "初期の垂直位置は、上位のアクションにアクセスできるよう画面高さの50%に制限されるとしています。コンテンツが50%を超える場合は、画面全体に伸びて内部スクロールで残りの項目にアクセスできるとしています。上部48dpの領域はサイズ変更用にインタラクティブで、ドラッグハンドルが表示されている場合はユーザーによるサイズ変更が可能だとしています。具体的なdp数値(コンテナ幅など)は文書内に記載がなく確認できていません。",
    colorInfo: "色の値はデザイントークンを通して実装されるとしています。モーダルボトムシートはスクリム(裏地)の上に敷かれますが、標準ボトムシートにはスクリムがなく、それ以外の仕様は両者共通だとしています。",
    glossary: [
      { term: "標準 / モーダルボトムシート", desc: "標準ボトムシートは画面のメインUI領域と共存し、両方を同時に閲覧・操作できる。モーダルボトムシートはアプリコンテンツの手前に表示され、表示中は他のすべてのアプリ機能を無効化し、確認・閉じる・必要な操作が行われるまで画面上に表示され続ける。" },
    ],
    stance:
      "標準ボトムシートは、画面のメインUI領域と共存し、特にメインUI領域が頻繁にスクロール・パンされる場合に両方の領域を同時に表示・操作できるようにするコンポーネントだとしています。モーダルボトムシートはダイアログと同様にアプリコンテンツの手前に表示され、表示中は他のすべてのアプリ機能を無効化し、確認・閉じる・必要な操作が行われるまで画面上に表示され続けるとしています。",
    scenarios: [
      "音楽プレーヤーのように、画面の主要コンテンツを補完するコンテンツを表示したい時(標準ボトムシート、全画面表示時はアプリバーに折りたたみアイコンを表示)",
      "多数の操作項目があり、詳細な説明やアイコンが必要なメニューを提示したい時(モーダルボトムシート、モバイルアプリのみ)",
    ],
    exceptions:
      "ボトムシートの必須要素はコンテナのみで、項目一覧(オプション)、メディア(オプション: サムネイル・画像・動画)を含められるとしています。ボタン/オーバーフローアイコンのタップで表示され、項目のタップ・画面のタップ・下スワイプ・アプリバーの閉じる機能のいずれかで非表示にできるとしています(全画面表示のモーダルボトムシートには閉じるボタンを表示すべきとしています)。折りたたみ/展開を切り替える拡張オプションがあり、ドラッグハンドルのドラッグまたは選択で高さを変更できるとしています。ドラッグハンドルを選択するとプリセット高さの切り替えまたはシートを閉じる動作になり、スクリムを選択すると常にシートを閉じるとしています。複数のプリセット高さがありドラッグハンドルを使用できない場合は、高さ変更のための単一ポインターによる代替手段を必ず含めるべきだとしています。レスポンシブレイアウトとしては、コンパクトなブレークポイントでは画面幅いっぱいに広がる一方、中〜拡張ブレークポイントでは既定で最大幅が設定される(上書き可能)としており、複雑なタスクにはフローティングシートなど非一時的なサーフェスの使用を検討すべきだとしています。Androidの「予測戻る」ジェスチャーにも対応するとしています。",
    accessibility:
      "操作可能(Operable) ― 上部48dpの領域はサイズ変更用にインタラクティブだとしています。オプションのドラッグハンドルはタブ順序でフォーカスでき、キーボードやスイッチ操作などの非タッチ入力で操作できるとしています。ドラッグ操作で実行できるすべてのアクションについて、単一ポインターによる代替操作を含めるべきだとしています(W3Cの2.5.7・ドラッグ操作に対応する考え方です)。",
    useCases: [
      "メインコンテンツと同時に操作したい補助機能には標準ボトムシートを使う(例: 音楽プレーヤー)",
      "選択や確認が完了するまで背景操作をブロックしたい場合はモーダルボトムシートを使う(モバイルアプリのみ)",
      "ドラッグハンドルによる高さ変更には、タッチに頼らない単一ポインターの代替手段を必ず用意する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/bottom-sheets/guidelines",
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
    color: "#A3821F",
    position: "ボトムシート専用のロール・パターンは存在せず、モーダル/非モーダルのどちらとして実装するかで適用すべき考え方が変わる",
    size: "ボトムシート専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)は閉じるボタンなどの操作要素に適用されます。",
    colorInfo: "色の基準はありませんが、1.4.11(非テキストのコントラスト)がグラバーや境界線に適用され得ます。",
    stance:
      "背景の操作を完全に遮断するモーダルなボトムシートには、WAI-ARIAのDialog (Modal) Patternが適切とされます。role=\"dialog\"を持ち、aria-modal=\"true\"を設定し、Tab/Shift+Tabでシート外にフォーカスが出ないようにし(フォーカストラップ)、Escキーで閉じられるようにすべきとしています。また、2.5.7(ドラッグ操作・レベルAA)により、グラバーをドラッグしないと高さを変えられない作りにはせず、グラバーをタップすると高さが切り替わる、などドラッグ以外の方法も用意します。",
    scenarios: [
      "背景の操作を完全に遮断したいモーダルなボトムシートを実装する時",
      "背景コンテンツを操作可能なまま残したい非モーダルなボトムシート(Googleの「標準」に相当)を実装する時",
    ],
    exceptions:
      "背後のコンテンツを完全に遮断・視覚的に覆っていない場合は、aria-modal=\"true\"を設定すべきではないとしています。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― モーダルの場合はフォーカストラップ・Escキー・ラベル付け(4.1.2、2.1.1)が、非モーダルの場合は背景操作を妨げない実装が関わります。ドラッグ以外の操作方法(2.5.7)も「操作可能」の基準です。",
    useCases: [
      "背景を完全にブロックするボトムシートにはrole=\"dialog\"+aria-modal=\"true\"を使う",
      "背景操作を許すボトムシートではaria-modalを設定しない",
      "ドラッグしなくても高さを変えられるようにする(グラバーのタップで切り替えるなど。2.5.7)",
    ],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/",
    urlSecondary: [{ label: "2.5.7 Dragging Movements", url: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html" }],
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
    color: "#7A4F7E",
    position: "モバイル画面下部に固定される、段階的な情報開示のための短時間利用向けオーバーレイ(数値基準ではなく実装上の指針)",
    size: "数値基準としては、モバイルのタップ領域について一般的な目安に言及していますが、ボトムシート専用の数値ではありません。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "ボトムシートは、モバイル端末の画面下端に固定され、追加の詳細・操作を表示するオーバーレイと定義されています。モーダル型はユーザーが操作・閉じるまで背景とのやり取りを遮断し、非モーダル型は背景コンテンツとの並行操作を可能にするとしています。",
    scenarios: [
      "短時間で済む追加の詳細・操作を提示したい時(複雑なコンテンツ・長時間の閲覧には不向き)",
    ],
    exceptions:
      "3つの実装上の注意点を挙げています。(1) 標準的な「戻る」操作との一貫性を保つこと、(2) グラバーハンドルだけに閉じる操作を依存させず、上部に明確な×または閉じるボタンを配置すること(アクセシビリティと操作の確実性の向上のため)、(3) 複数のボトムシートを積み重ねないこと(現在位置の認識を妨げ、誤操作を招くため)。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、実装上の注意点です。上記の閉じるボタンの明示、戻る操作との一貫性、積み重ねの回避が、支援技術利用者にも操作の確実性をもたらすとしています。",
    useCases: [
      "短時間の追加情報・操作の提示に使う(長時間の閲覧・複雑なコンテンツには使わない)",
      "グラバーだけでなく、明確な閉じるボタンを上部に配置する",
      "複数のボトムシートを積み重ねない",
    ],
    searchHint: "Do Not Stack Bottom Sheets",
    url: "https://www.nngroup.com/articles/bottom-sheet/",
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
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
          <p style={styles.subtitle}>4つのガイドラインが、下からせり出す半モーダル(ボトムシート)の高さ・モーダル性・閉じ方をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <BottomSheetSwatch />
            <p style={styles.swatchNote}>画面下部から現れ、グラバー(つまみ)のドラッグで高さを変えられる。「サイドシート」ページで比較したポップオーバー・サイドシートとは、下から出るという性質が異なる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページは、<strong>「サイドシート」ページ(旧「モーダルポップアップ」ページ)から、下からせり出す半モーダルの内容を独立させたもの</strong>です。AppleのSheets(デタント)とGoogleのBottom sheetsは、どちらも「複数の高さの段階を持ち、ドラッグで変更できる」という発想が共通しており、ほぼ正確に対応するコンポーネント同士だと言えます。
            </p>
            <p style={styles.synthesisText}>
              4系列に共通する軸は、<strong>「モーダル(背景を操作不可にする)」か「非モーダル(背景を操作可能なまま残す)」か</strong>という区別です。Googleは「標準/モーダル」という名前でこの2種類を明確に定義し(モーダルはスクリム上に乗るが標準にはスクリムがない、という違いのみ)、Nielsen Norman Groupも同じ区別をボトムシート全般の判断基準として挙げています。W3Cも技術的に同じ区別を持ち、<strong>aria-modal属性を設定するかどうか</strong>でこの違いを表現します。
            </p>
            <p style={styles.synthesisText}>
              公式ドキュメントを確認したところ、<strong>初期の垂直位置は画面高さの50%に制限され、それを超えるコンテンツは全画面まで伸びて内部スクロールする</strong>という具体的な挙動が判明しました。また<strong>ドラッグハンドルが使えない場合は、高さ変更のための単一ポインター代替手段が必須</strong>とされている点は、Nielsen Norman Groupが示す<strong>グラバーハンドルだけに閉じる操作を依存させず、明確な閉じるボタンも併設すべき</strong>という指摘、W3Cが求めるフォーカストラップ・Escキー対応、<strong>ドラッグ以外の操作方法(2.5.7)</strong>と方向性が一致しており、視覚的な操作(ドラッグ)とキーボード・支援技術での操作の両方を保証する必要があることを示しています。<strong>「複数のシートを積み重ねない」</strong>という注意点も、モーダル性を問わず共通して守るべき実務上のルールです。
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
            <a href="/components/containment/side-sheet" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>サイドシート ↗</div>
              <div style={styles.linkCardDesc}>ポップオーバー・サイドシートなど、画面を覆う/中央や側面に出るオーバーレイの4系列比較</div>
            </a>
            <a href="/components/containment/dialog" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>ダイアログ ↗</div>
              <div style={styles.linkCardDesc}>確認・警告のため操作を完全にブロックする基本ダイアログの4系列比較</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["段階的に見せる"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(GoogleはM3の公式ページ本文で確認済み。NN groupは本文確認済み。Appleは検索結果による間接確認。W3Cはドロワーページ・サイドシートページと同一のDialog (Modal) Patternを準用)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはSheetsページへのリンクです。GoogleはBottom sheetsページへのリンクです。WCAGはWAI-ARIA Dialog (Modal) Patternのページ、NN groupは記事ページ単位です。
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
