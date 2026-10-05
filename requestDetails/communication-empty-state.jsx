import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Communication / 空状態・ローディング状態」ページ。
 * (1)コンテンツが存在しない画面・領域(空状態)の見せ方と、(2)コンテンツ読み込み中の
 * プレースホルダー表示(骨組み表示・スケルトン画面を含む)の2テーマをまとめて扱う。
 * 「プログレスインジケーター」ページとは対象が隣接するが、そちらは進行状況の
 * 可視化そのもの(バー・スピナーの形状と状態遷移)、本ページはコンテンツ領域に
 * 何を表示するか(空/読み込み中それぞれの見せ方)に焦点を当てる。
 *
 * Nielsen Norman Groupは、空状態とスケルトン画面それぞれの独立記事本文を
 * 直接取得して確認済み(2026-09)。「Designing Empty States in Complex
 * Applications」の3原則(状態の伝達・学習機会・主要タスクへの導線)と、
 * 「Skeleton Screens 101」の待ち時間の目安(1秒未満は非表示、2〜10秒は
 * スケルトン画面/スピナー、10秒超はプログレスバー)を確認した。
 *
 * W3C(MDNのaria-busy属性解説ページ)も本文を直接取得して確認済み。
 * ライブリージョンの更新中であることを支援技術に伝える仕組みを確認した。
 *
 * Apple(HIGのLoadingページ、Writingページ)・Google(M3の新設コンポーネント
 * 「Loading indicator」、および現行M3には見当たらない「空状態」パターン、
 * M1時代のEmpty statesページのみ確認)はいずれもSPAサイトのため検索結果による
 * 間接確認(2026-09)。特にGoogleは「ローディング」には専用コンポーネントを
 * 新設した一方、「空状態」はM3の正式なコンポーネント/パターン一覧には見当たらず、
 * 旧世代(M1)のパターンページしか確認できなかった非対称性が新たな発見。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Loading(読み込み中の指針)/ Writing(空状態の文言指針)",
    color: "#C2542A",
    noDedicatedComponent: true,
    position: "「空状態」「ローディング状態」という単独コンポーネントはなく、コンテンツ読み込み中の体験に関する指針(Loadingページ)と、空状態の文言に関する指針(Writingページ)に分かれて記載されている",
    size: "具体的な数値基準は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "最良の読み込み体験は、ユーザーが読み込みに気づく前に終わっているものだとしています。可能な限り早くコンテンツを表示し、まだ用意できていない部分にはプレースホルダーのテキスト・グラフィック・アニメーションを表示して、読み込み完了とともに実際のコンテンツに差し替えるべきだとしています。可能であればアニメーション再生中やメニュー操作中など、バックグラウンドで先読みしておくことも勧めています。空状態については、完了済みのToDoリストや空のブックマークフォルダのような場面を、ユーザーを歓迎したりアプリの世界観を伝えたりする好機として捉えるべきだとしています。文言はVoiceOverでの読み上げを想定し、翻訳されにくい言い回しや、文化によって伝わらない慣用句を避けるべきだとしています。",
    exceptions:
      "空状態は基本的に一時的なものなので、消えてしまう可能性のある重要な情報をそこに置くべきではないとしています。また、あるセクションが空だからといってタブバーのボタン自体を無効化・非表示にすべきではなく(ボタンの出没はインターフェースが不安定に見える)、タブは表示したまま、その中身として空状態を説明すべきだとしています。",
    scenarios: [
      "コンテンツの読み込みが一瞬で終わらない時に、プレースホルダー表示で体感速度を保ちたい時",
      "ToDoリストや保存済みアイテムが1件もない画面で、ユーザーを歓迎したり次の行動を案内したりしたい時",
    ],
    accessibility: "VoiceOverでの読み上げを想定した文言配慮(翻訳されにくい表現・特定の文化圏でしか伝わらない慣用句を避ける)が、Writingページの原則として述べられています。",
    useCases: [
      "空だからといってタブやボタンを消さず、表示したまま中身で状態を説明する",
      "空状態の文言はVoiceOverでの読み上げを想定し、慣用句や翻訳しにくい表現を避ける",
      "読み込み中はプレースホルダーを表示し、完了後に実際のコンテンツへ差し替える",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/loading",
    urlSecondary: [{ label: "Writing(空状態の文言指針)", url: "https://developer.apple.com/design/human-interface-guidelines/writing" }],
    confirmedNote: "両ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。「空状態」という単独コンポーネントページが存在しないこと自体も検索結果による確認です。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 34, height: 24, borderRadius: 4, border: "1.4px dashed #C2542A" }} />
          <span style={{ fontSize: 8, color: "#C2542A" }}>空状態</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ width: 46, height: 6, borderRadius: 3, background: "#F0DED4" }} />
          <div style={{ width: 32, height: 6, borderRadius: 3, background: "#F0DED4" }} />
          <span style={{ fontSize: 8, color: "#C2542A" }}>読込中(骨組み)</span>
        </div>
      </div>
    ),
    illustrationNote: "空状態(左)と読み込み中プレースホルダー(右)の概念図(系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Loading indicator(新設)/ Empty state(現行M3では非該当、M1に参考記述)",
    color: "#2F7D6E",
    position: "5秒未満の待ち時間向けに新設された「Loading indicator」という専用コンポーネントを持つ一方、「空状態(Empty state)」という名称の正式なコンポーネント・パターンは現行M3の一覧には見当たらず、旧世代(M1)のパターンページのみ関連記述として確認できた",
    size: "「5秒未満」という待ち時間の目安以外の具体的な数値基準は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "Loading indicatorは、短い待ち時間の処理の進行を示すために新設されたコンポーネントで、5秒未満で終わる読み込みに使うことを想定し、従来の不確定な円形プログレスインジケーターの多くの用途を置き換える意図があるとされています(検索結果による確認)。一方、空状態については、M1時代のパターンページで「リストに項目が1件もない」「検索結果が0件」といった場面での基本形が、非インタラクティブな画像+短い説明文であるとされ、見出しは短く分かりやすく、ユーザーを責めるような表現を避けるべきだとしていますが、これは現行M3の一次情報としての位置づけではありません。",
    exceptions:
      "現行M3のコンポーネント一覧には「空状態」という名称の正式コンポーネントは見当たらないため、上記の空状態に関する記述はM1時代の古いパターンページの内容であり、現行M3が一次情報として保証している内容ではない点に注意が必要です。",
    scenarios: [
      "5秒未満で終わる短い読み込みにLoading indicatorを使いたい時",
      "検索結果が0件、リストに項目が1件もない画面の基本形を検討したい時(M1由来の参考情報)",
    ],
    accessibility: "具体的な数値基準は確認できていません。",
    useCases: [
      "5秒未満の待ち時間にはLoading indicatorを検討する",
      "空状態の文言は責めるような表現を避け、次の行動を促す(M1由来の参考情報)",
      "現行M3に空状態の正式な一次情報がないことを踏まえ、実装時は自社の判断で設計する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/loading-indicator/guidelines",
    urlSecondary: [{ label: "Empty states(M1、参考情報・現行M3ではない)", url: "https://m1.material.io/patterns/empty-states.html" }],
    confirmedNote: "Loading indicatorの仕様、および現行M3のコンポーネント/パターン一覧に「空状態」が見当たらないことは、いずれも検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 34, height: 24, borderRadius: 4, border: "1.4px dashed #2F7D6E" }} />
          <span style={{ fontSize: 8, color: "#2F7D6E" }}>空状態(M1参考)</span>
        </div>
        <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8.5" fill="none" stroke="#DDEFEA" strokeWidth="2.4" /><path d="M11 2.5a8.5 8.5 0 0 1 6 2.5" fill="none" stroke="#2F7D6E" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </div>
    ),
    illustrationNote: "空状態(左、M1参考)とLoading indicator(右、現行M3・新設)(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― aria-busy属性(ライブリージョンの更新中を示す)",
    color: "#A3821F",
    position: "「空状態」「ローディング状態」自体に専用ロールはないが、コンテンツが更新中であることを支援技術に伝えるaria-busy属性と、ライブリージョン(aria-live)の組み合わせが実装上の指針となる",
    size: "専用の数値基準はありません。",
    colorInfo: "色についての専用基準はありません。",
    glossary: [
      { term: "aria-busy", desc: "要素が現在更新中であることを示すグローバルなARIA状態。既定値はfalse。trueの間は、ライブリージョンの変更内容の読み上げを更新完了まで遅らせることができる。複数箇所が同時に更新されるスケルトン画面などで、更新途中の不完全な状態が読み上げられてしまうのを防ぐ目的で使う。" },
    ],
    stance:
      "aria-busy属性は、要素が現在更新中であることを示すグローバルな状態で、既定値はfalseだとしています。trueに設定すると、ライブリージョン内で複数の変更が発生する間、更新が完了するまで読み上げを遅らせることができ、フィード(feed)のようなロールでも、rendering(描画中)の変更が読み上げから除外されるとしています。更新が完了したらfalseに戻すという使い方が基本パターンとして示されています。",
    exceptions:
      "aria-busyだけでは自動的に何かが読み上げられるわけではなく、aria-live(読み上げのタイミング・割り込み方)と組み合わせて初めて機能する点に注意が必要だとしています。",
    scenarios: [
      "スケルトン画面など、複数箇所が同時に書き換わる読み込み中の領域を扱いたい時",
      "更新途中の不完全な状態を支援技術に読み上げさせたくない時",
    ],
    accessibility: "堅牢(Robust)・知覚可能(Perceivable) ― コンテンツが更新中であることをプログラム的に伝え、不完全な状態の誤った読み上げを防ぐことに関わります。",
    useCases: [
      "読み込み中・骨組み表示の間はaria-busy=\"true\"を設定する",
      "実際のコンテンツに差し替わったらaria-busy=\"false\"に戻す",
      "aria-liveと組み合わせ、読み上げのタイミングを制御する",
    ],
    searchHint: "aria-busy",
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy",
    confirmedNote: "MDNのaria-busy属性解説ページ本文を直接確認しました(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="180" height="24" viewBox="0 0 180 24">
          <rect x="1" y="1" width="178" height="22" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="90" y="15" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-busy=&quot;true&quot; → &quot;false&quot;</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、更新中/完了の状態遷移を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Designing Empty States in Complex Applications / Skeleton Screens 101(2記事)",
    color: "#7A4F7E",
    position: "空状態を「システム状態の伝達」「学習機会の提供」「主要タスクへの導線」という3つの役割を持つ設計対象として位置づけ、読み込み表現は待ち時間の長さに応じてスケルトン画面/スピナー/プログレスバーを使い分けるべきとする(数値の目安を伴う指針)",
    size: "待ち時間の目安: 1秒未満は表示不要、2〜10秒はスケルトン画面またはスピナー(個別モジュール向け)、10秒超はプログレスバーが望ましいとしている。",
    colorInfo: "色についての基準はありません。",
    stance:
      "空状態については、(1)「該当期間のレコードがありません」のように状況を明示して読み込み中か本当にデータが無いのかの混乱を避ける、(2)「お気に入りに追加するとここに表示されます」のように操作方法を教える学習機会として使う、(3)「作成」ボタンなど次に取るべき行動への直接的な導線を用意する、という3つの指針を挙げています。スケルトン画面については、ページ全体の骨組みをワイヤーフレーム風に示すことで、コンテンツが来ることを予告し体感待ち時間を和らげるパターンだとし、静的/アニメーション/フレーム表示の3タイプがあるとしています。ヘッダー・フッターだけを示す「フレーム表示」型は、空白ページのように見えて離脱を招きかねないため避けるべきだとしています。",
    exceptions:
      "空状態の3指針は数値基準ではなく原則としての言及です。一方でスケルトン画面/スピナー/プログレスバーの使い分けには、1秒・10秒という具体的な秒数の目安が示されています。",
    scenarios: [
      "検索結果0件やリスト未設定など、データが無い理由をユーザーに明示したい時",
      "初めて使う機能の使い方を、空状態の文言を通じて教えたい時",
      "ページ全体の読み込みで、2〜10秒程度ならスケルトン画面を使いたい時",
    ],
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、システム状態の伝達・学習支援・タスク導線という観点からの設計指針です。",
    useCases: [
      "空欄を放置せず、状況を明示するメッセージを必ず入れる",
      "ユーザーを責めるトーンを避け、次の行動を案内する",
      "ヘッダー・フッターだけの「フレーム表示」型スケルトンは避ける",
    ],
    searchHint: "skeleton screens",
    url: "https://www.nngroup.com/articles/empty-state-interface-design/",
    urlSecondary: [{ label: "Skeleton Screens 101", url: "https://www.nngroup.com/articles/skeleton-screens/" }],
    confirmedNote: "両記事とも本文を直接取得して確認しました(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: 34, height: 24, borderRadius: 4, border: "1.4px dashed #7A4F7E" }} />
          <span style={{ fontSize: 8, color: "#7A4F7E" }}>空状態(3原則)</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ width: 46, height: 6, borderRadius: 3, background: "#EEE3EE" }} />
          <div style={{ width: 32, height: 6, borderRadius: 3, background: "#EEE3EE" }} />
          <span style={{ fontSize: 8, color: "#7A4F7E" }}>スケルトン(2-10s)</span>
        </div>
      </div>
    ),
    illustrationNote: "空状態(左)とスケルトン画面(右)の概念図(系列識別色)",
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

function EmptyStateSwatch() {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 30, flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 150 }}>
        <div style={{ width: 56, height: 40, borderRadius: 8, border: "1.6px dashed #C7CBE6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📭</div>
        <div style={{ fontSize: 11, color: "#2E3457", fontWeight: 600 }}>まだアイテムがありません</div>
        <div style={{ fontSize: 9.5, color: "#9EA4C4", textAlign: "center" }}>お気に入りに追加するとここに表示されます</div>
        <span style={{ fontSize: 9, fontWeight: 700, color: "#3A4FCF" }}>+ 追加する</span>
        <span style={{ fontSize: 9.5, color: "#7E86AC" }}>空状態</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 150 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: "#EEF1FA" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <div style={{ width: "80%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
            <div style={{ width: "55%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
          </div>
        </div>
        <div style={{ width: "100%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
        <div style={{ width: "70%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
        <span style={{ fontSize: 9.5, color: "#7E86AC" }}>ローディング状態(スケルトン)</span>
      </div>
    </div>
  );
}

export default function CommunicationEmptyStatePage() {
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
        <SidebarNav currentPath="/components/communication/empty-state" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / 空状態・ローディング状態</span>
            <span>SPEC No. 038</span>
          </div>

          <h1 style={styles.title}>空状態・ローディング状態</h1>
          <p style={styles.subtitle}>コンテンツが無い画面の見せ方(空状態)と、読み込み中のプレースホルダー表示について、4つのガイドラインを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <EmptyStateSwatch />
            <p style={styles.swatchNote}>空状態は「状況の説明+次の行動への導線」、ローディング状態は「実際のレイアウトを模した骨組み(スケルトン)表示」が共通の考え方。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページで最も明確な発見は、<strong>AppleにもGoogleにも「空状態」という名称の現行の正式コンポーネントが存在しない</strong>ことです。Appleの関連記述はコンポーネント集ではなく<strong>文言ガイド(Writingページ)</strong>の中にあり、Googleの関連記述は現行M3ではなく<strong>旧世代(Material Design 1)のパターンページ</strong>にしか見当たりませんでした。
            </p>
            <p style={styles.synthesisText}>
              一方で「ローディング(読み込み中)」の扱いは対照的に手厚く、Appleには専用の<strong>「Loading」ページ</strong>があり、Googleは<strong>5秒未満の待ち時間向けに「Loading indicator」という新しいコンポーネントを独立させた</strong>ばかりです。同じページ内で扱う2つのテーマの間に、これほど明確な非対称性(ローディングは正式コンポーネント化、空状態は文言ガイド止まり)が見られたのは、この4系列比較を通じた新しい発見です。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは両テーマとも独立記事を持ち、最も具体的です。空状態には<strong>「状況の伝達・学習機会・タスクへの導線」という3原則</strong>を、スケルトン画面には<strong>「プログレスインジケーター」ページと同じ1秒/10秒という時間の目安</strong>を示しており、この秒数基準は2ページを横断する共通の物差しとして機能します。
            </p>
            <p style={styles.synthesisText}>
              W3Cの貢献はここでも技術的なもので、<strong>aria-busy属性</strong>により「このコンテンツは今まさに書き換わっている最中なので、不完全な状態を読み上げないでほしい」という意図を支援技術に伝える仕組みを提供します。これは視覚的なスケルトン画面の裏側で、スクリーンリーダー利用者が中途半端な内容を読まされないようにするための、見落とされがちな実装上のポイントです。
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
                {s.noDedicatedComponent && (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>)}
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
                <div style={styles.labelCell}>専用コンポーネント</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>
                    {s.noDedicatedComponent ? (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>) : (<span style={{ color: "#B7BCDA" }}>―(この観点は対象外)</span>)}
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
            <a href="/components/communication/progress" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>プログレスインジケーター ↗</div>
              <div style={styles.linkCardDesc}>確定的/不確定な進行状況表示の4系列比較</div>
            </a>
            <a href="/components/communication/overview" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>情報伝達の使い分け ↗</div>
              <div style={styles.linkCardDesc}>Communication/Containment各パーツを横断する統合ガイド</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["通知・状態表示", "見つけやすさ・初めての案内"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(NN group・W3Cは本文確認済み。Apple・Googleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはLoadingページ(補助的にWritingページ)、GoogleはM3のLoading indicatorページ(補助的にM1のEmpty statesページ、現行M3ではない参考情報)、WCAGはMDNのaria-busy属性解説ページ、NN groupは空状態記事(補助的にSkeleton Screens 101記事)へのリンクです。
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
  notApplicableChip: { display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#8A6210", background: "#FFF6E5", border: "1px solid #F0DBA6", padding: "3px 8px", borderRadius: 3, marginTop: 8, letterSpacing: 0.2 },
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
