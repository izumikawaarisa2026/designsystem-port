import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Text inputs / 検索フィールド」ページ。
 *
 * W3C(WAI-ARIA search landmark)は公式系の解説記事・仕様本文を検索結果で確認
 * (2026-09、role="search"の仕様原文そのものの直接取得は未実施のためpending扱い)。
 * Nielsen Norman Group(虫眼鏡アイコンの利点・弱点を論じた記事)は検索結果の要約で
 * 確認(2026-09、記事本文の直接取得は未実施のためpending扱い)。Apple(HIG)・
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで本文を
 * 直接取得できなかったため、検索結果による間接確認(2026-09)。
 *
 * 2026-09 追記: ユーザーから「虫眼鏡アイコンの位置と挙動についても比較したい」
 * というフィードバックを受け、「虫眼鏡アイコンの位置と挙動」セクションを新設した
 * (モバイルはカードグリッド、PCはmatrixGridパターンの表)。Apple(先頭/leading
 * 配置、フォーカス時のキャンセルボタン)・Google(先頭アイコンがタップ時に左へ
 * 遷移し入力欄が拡張するアニメーション)は検索結果による間接確認。W3C(role="search"
 * は視覚的なアイコン位置を規定しない)・NN group(ページ右上への配置推奨、アイコンを
 * クリックで送信させる、1クリックで入力欄にフォーカスさせる)は本文を直接取得して
 * 確認済み(2026-09)。NN groupの記事はボックス全体のページ内配置(右上)を論じて
 * おり、アイコン自体の箱内での左右位置は明言していない点に注意。
 *
 * 2026-09 追記2: ユーザーからの指摘を受け2点を修正。(1)SOURCESのGoogle欄が
 * M2時代のURL(m2.material.io/design/navigation/search.html)のままだったため、
 * ICON_NOTESで既に使っていたM3の公式ページ(m3.material.io/components/search)に
 * 統一した。(2)プレビューがPC幅でもモバイル向けカードグリッドが混在して見える
 * という指摘を受け、ビルド成果物の取り違えの可能性を排除するため、現在の
 * ソースから作り直した単独プレビューを再公開した(コード側のdsp-mobile-only/
 * dsp-desktop-onlyの切り替えロジック自体に変更はない)。
 *
 * 2026-09 追記3: ユーザーから「MD3の検索フィールドのドキュメントを作成したので内容を
 * 確認してほしい」「通常・アクティブ・予測レコメンドなど、使用シーンごとのコンポーネントも
 * 詳しく検証してほしい」というフィードバックを受け、次の2点を行った。
 * (1)SOURCESのGoogle欄を、ユーザー提供の公式ドキュメント(MD3_text/検索フィールド.docx)と
 * Material Components for AndroidのSearch.mdで全面更新(包含/分割の2スタイル、全画面/
 * ドッキングの2レイアウト、56dp・360〜720dp・余白24→12dpなどの寸法、surface container high、
 * 入り口3種、アクセシビリティ)。あわせてApple(HIGのページデータ)・W3C(MDN・APG
 * Combobox)・NN group(虫眼鏡アイコン・検索候補の2記事)も本文を直接確認し、pending扱いを
 * 解除した。NN group欄にあった「アイコンをプレースホルダーの右側に置く」という記述は、
 * 記事本文に根拠がなかったため削除した。
 * (2)「使用シーンごとのコンポーネント比較」セクションを新設。通常時・アクティブ(入力前)・
 * 入力中(予測候補)・検索結果・絞り込み・クリア/終了の6シーンについて、画面イメージ
 * (概念図)と、シーン×4系列の比較表(PCは表、スマホはカード)を置き、Google(M3)の
 * スタイル×レイアウトの4つの組み合わせ図を補足として加えた。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Search fields",
    color: "#C2542A",
    position: "検索アイコン・クリアボタン・プレースホルダーを持つ、編集できるテキストフィールド。スコープバーとトークンで検索範囲を絞り込める。iOSでは入り口をタブ・ツールバー・インラインの3か所から選ぶ",
    size: "検索フィールド自体の寸法(pt)は、HIGの検索フィールドのページには示されていません。",
    colorInfo: "色についての規定は、検索フィールドのページにはありません。",
    stance:
      "HIGは検索フィールドを、検索アイコン・クリアボタン・プレースホルダーを表示する、編集できるテキストフィールドとしています。プレースホルダーで何を検索できるかを伝えること、できれば入力と同時に検索を始めて結果を絞り込み続けること、検索を始める前は最近の検索を、入力中は予測した候補を表示することを勧めています。結果は関連の高いものから並べ、必要なら分類し、スコープバーで絞り込めるようにするとしています(ページ本文を直接確認、2026-09)。",
    exceptions:
      "検索専用のエリア(タブなど)に移ったときは、すぐ検索フィールドにフォーカスを当てるとよいとしています。ただしiPadで画面上のキーボードしか使えない場合は、キーボードが急に画面を覆わないよう、フォーカスを当てない方がよいとしています。watchOSでは、検索フィールドをタップすると画面全体の文字入力に切り替わり、キャンセルか検索を押すまで戻りません。",
    accessibility: "―(検索フィールドのページには、専用のアクセシビリティの記載はありません)。",
    useCases: [
      "プレースホルダーで、検索できる内容や範囲を伝える",
      "検索前は最近の検索、入力中は予測した候補を表示する",
      "スコープバー・トークンで、検索範囲を絞り込めるようにする",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/search-fields#Best-practices",
    urlSecondary: [
      { label: "Scope bars and tokens", url: "https://developer.apple.com/design/human-interface-guidelines/search-fields#Scope-bars-and-tokens" },
      { label: "iOS(入り口の3つの配置)", url: "https://developer.apple.com/design/human-interface-guidelines/search-fields#iOS" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <rect x="1" y="1" width="138" height="24" rx="8" fill="#F0F4F8" stroke="#C2542A" strokeWidth="1.2" />
        <circle cx="16" cy="13" r="4.5" fill="none" stroke="#C2542A" strokeWidth="1.6" />
        <line x1="19.2" y1="16.2" x2="23" y2="20" stroke="#C2542A" strokeWidth="1.6" strokeLinecap="round" />
        <text x="30" y="17" fontSize="9.5" fill="#9EA4C4" fontFamily="Jost, Noto Sans JP">検索</text>
        <circle cx="126" cy="13" r="5" fill="#C9CEE3" />
        <text x="126" y="16" fontSize="7" fill="#FFFFFF" textAnchor="middle">✕</text>
      </svg>
    ),
    illustrationNote: "検索アイコン・プレースホルダー・クリアボタン(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Search(Search bar / Search view)",
    color: "#2F7D6E",
    position: "画面上部の「検索バー」と、選択すると開く「検索ビュー」をまとめて「Search」と呼ぶ。見た目は包含(Contained、推奨)と分割(Divided、従来型)の2スタイル、候補・結果の出し方は全画面とドッキングの2レイアウト",
    size: "検索バーの高さは56dp、幅は最小360dp〜最大720dp。先頭・末尾のアイコンはタップ領域48dp(アイコン自体は24dp)、アバターは30dp。画面端からの余白は、フォーカス前24dp → フォーカス時12dp(M3 Expressive)。ドッキング表示の候補・結果の領域は、幅360〜720dp、高さは最小240dp〜最大で画面の高さの2/3。",
    colorInfo: "検索バーのコンテナは「surface container high」の色ロールを使います。背景が白や単色でもバーがはっきり見えるようにするためで、背景と1段階以上離れたsurface containerのロールを使い、バーを背景に溶け込ませないよう求めています。M3の既定では影(エレベーション)を付けません。",
    glossary: [
      { term: "Search bar / Search view", desc: "Search barは画面上部に置く検索の入り口。選択するとSearch view(候補・結果を表示する画面)が開く。M3 Expressiveで、両者をまとめて「Search(検索)」と呼ぶようになった。" },
      { term: "包含(Contained)/分割(Divided)", desc: "包含は、塗りつぶしたコンテナで検索バーと候補・結果をひとまとめにし、フォーカスの前後でバーの形を変えないスタイル(M3 Expressiveで追加、推奨)。分割は、検索バーと候補・結果の間を区切り線で分ける従来(ベースライン)のスタイル。" },
      { term: "全画面/ドッキング", desc: "全画面は、候補・結果が画面全体に広がる表示で、コンパクト幅(スマートフォン)の既定。ドッキングは、検索バーの下にリストを出し、残りの画面を幕(スクリム)で覆う表示で、中〜広い幅に向く。" },
    ],
    stance:
      "検索は、ファイルやメッセージのように扱う項目が多い製品で、情報を素早く見つけるための仕組みとされています。入り口は、特定の画面の中を検索する「検索バー」、検索がアプリ全体の主要な機能であるときの「検索アプリバー」、検索が補助的な操作であるときの「検索アイコンボタン」の3つから選びます。検索バーには先頭のアイコン、何を検索できるかを示すヒントテキスト(例:「メッセージを検索」)、1〜2個の末尾アイコンを置き、選択すると候補・結果を表示する状態(フォーカスした検索)に切り替わります(M3の公式ページ本文とMaterial Components for Androidのドキュメントで確認、2026-09)。",
    exceptions:
      "先頭には、メニューや戻るなどのナビゲーション用アイコンボタンか、押しても動作しない検索アイコンのどちらかを置く必要があります。末尾には、音声検索などの別の検索方法、現在地やプロフィールなど別の上位の操作、オーバーフローメニューを置けます。包含スタイルでは、フォーカスの前後でコンテナの形を変えてはいけないとしています。",
    accessibility:
      "知覚可能(Perceivable)・操作可能(Operable)・堅牢(Robust) ― 検索バーのアクセシビリティラベルはヒントテキストと一致させ、役割はAndroidではテキストフィールド、iOSでは検索フィールドとして伝えます。候補や結果が表示されたらスクリーンリーダーで知らせ、キーボードではTab/Shift+Tabで要素の間を移動、Space/Enterで入力を始め、矢印キーで結果の間を移動できるようにするとしています。",
    useCases: [
      "特定の画面内の検索は検索バー、アプリ全体の主要機能なら検索アプリバー、補助的な操作なら検索アイコンボタンを使う",
      "スマートフォンでは全画面、中〜広い画面ではドッキングで候補・結果を表示する",
      "ヒントテキストは「メッセージを検索」のように、検索対象を具体的に示す",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/search/guidelines",
    urlSecondary: [
      { label: "Search overview", url: "https://m3.material.io/components/search/overview" },
      { label: "MDC Android: Search(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/components/Search.md" },
    ],
    confirmedNote: "M3の公式ページ本文(m3.material.io「Search」のガイドライン、2026-09)と、Material Components for Androidのドキュメント(GitHub)で確認。m3.material.io本文はSPAのため直接取得はできていません。",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <rect x="1" y="1" width="138" height="24" rx="12" fill="#E3EDE9" />
        <line x1="12" y1="9" x2="22" y2="9" stroke="#2F7D6E" strokeWidth="1.5" />
        <line x1="12" y1="13" x2="22" y2="13" stroke="#2F7D6E" strokeWidth="1.5" />
        <line x1="12" y1="17" x2="22" y2="17" stroke="#2F7D6E" strokeWidth="1.5" />
        <text x="30" y="17" fontSize="9.5" fill="#565D8A" fontFamily="Jost, Noto Sans JP">メッセージを検索</text>
        <circle cx="125" cy="13" r="7" fill="#2F7D6E" opacity="0.55" />
      </svg>
    ),
    illustrationNote: "先頭アイコン+ヒントテキスト+末尾のアバター(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA search landmark / APG Combobox Pattern / WCAG 2.4.5",
    color: "#A3821F",
    position: "role=\"search\"(またはHTMLのsearch要素)で検索機能一式をランドマークとして示す。候補を出す検索欄は、APGのコンボボックスのパターンで組み立てる",
    size: "検索フィールド専用の数値基準はありませんが、一般的なターゲットサイズ基準(2.5.8/2.5.5。どちらも例外あり)は検索ボタンなどの操作要素にも適用されます。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、検索アイコンや入力欄の境界線が部品を見分ける唯一の手がかりである場合は、3:1以上のコントラスト比が必要です。",
    glossary: [
      { term: "コンボボックス(combobox)", desc: "入力欄と、候補を出すポップアップ(リストなど)を組み合わせた部品。検索欄で「以前の検索や似た検索を候補に出す」のが代表的な用途としてAPGに挙げられている。" },
    ],
    stance:
      "searchランドマークは、検索機能を構成する要素一式を囲むコンテナに付ける役割です。input type=\"search\"だけではランドマークにならず、検索用のフォームには汎用のformではなくsearchを使います。可能ならHTMLのsearch要素を使うことが推奨されています。候補を表示する検索欄は、APGのコンボボックスのパターンで、候補の出し方(自動補完の4つの形)とキーボード操作を実装します(MDN・APGの本文を直接確認、2026-09)。また2.4.5(レベルAA)は、サイトの中のページにたどり着く方法を2つ以上用意することを求めており、ナビゲーションに加えてサイト内検索を置くのが代表的な満たし方です。画面拡大やスクリーンリーダーで大きなナビゲーションをたどるより、検索の方が目的のページに早く着ける人がいるためです(Understandingページの本文を直接確認、2026-10)。",
    exceptions:
      "1ページに複数のsearchランドマークがある場合は、それぞれに区別できるラベルを付けます。同じ検索をページの上下に繰り返し置く場合は、同じラベルにします。ランドマークを多用しすぎると、スクリーンリーダーで全体の構造が分かりにくくなる点にも注意が必要です。2.4.5は、手続きの途中の画面や手続きの結果の画面には適用されません。3〜4ページの小さなサイトなら、トップページから全ページへのリンク(サイトマップの代わり)だけでも満たせる場合があります。",
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― searchランドマークによる識別に加え、ターゲットサイズ(2.5)、非テキストのコントラスト(1.4.11)、結果件数などのステータスメッセージ(4.1.3)が関わります。ページにたどり着く方法を複数用意する2.4.5は「操作可能」(ナビゲーション可能)に属します。",
    useCases: [
      "検索フォームには、汎用のformではなくsearch要素(またはrole=\"search\")を使う",
      "複数のsearchランドマークがある場合は、それぞれに区別できるラベルを付ける",
      "候補を出す場合は、APGのコンボボックスのパターンで役割とキーボード操作を実装する",
      "ナビゲーションに加えてサイト内検索を置き、ページへの行き方を2つ以上にする(2.4.5)",
    ],
    searchHint: "",
    url: "https://www.w3.org/TR/wai-aria-1.2/#search",
    urlSecondary: [
      { label: "解説(MDN): searchロール", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role" },
      { label: "APG: Combobox Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/#aboutthispattern" },
      { label: "2.4.5 Multiple Ways", url: "https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html" },
    ],
    confirmedNote: "MDNのsearchロールの解説と、W3CのAPG Combobox Patternの本文を直接取得して確認済み(2026-09)。WAI-ARIA仕様のsearchロールの節は2026-10に確認。2.4.5はUnderstandingページの本文を直接取得して確認(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="140" height="26" viewBox="0 0 140 26">
          <rect x="1" y="1" width="138" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="70" y="17" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="search"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、ランドマーク(役割)の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "The Magnifying-Glass Icon in Search Design / Site Search Suggestions",
    color: "#7A4F7E",
    position: "虫眼鏡アイコンだけにすると検索が見つけにくくなるため、入力欄を開いたまま置くことを基本とする。候補(オートコンプリート)は、良い結果につながり、入力した文字と見分けられることを重視する",
    size: "固定幅の検索欄は、入力内容を見直せるよう27文字分以上の幅にするよう勧めています。アイコンは大きく、周りに余白を取って押しやすくするとしています。",
    colorInfo: "アイコンが背景や周りの要素から目立つよう、十分なコントラストを取るよう勧めています(数値基準はありません)。",
    stance:
      "多くの人は、ラベルがなくても虫眼鏡アイコンが検索を表すと分かります。ただしアイコンだけにすると目立たず、検索を探す手間が増えるとしています。デスクトップでは入力欄を開いたままページの右上に置き、アイコンのクリックとEnterキーのどちらでも検索を実行できるようにすべきだとしています。スマートフォンのような小さな画面では、アイコンをタップするまで入力欄を隠してもよいとしています(記事本文を直接取得して確認済み、2026-09)。",
    exceptions:
      "アイコンだけにする場合は、アイコンを1回押したらすぐ入力欄にカーソルが入り、入力できる状態にすべきだとしています。入力欄はアイコンの近くに出し、周りに他のアイコンを詰め込みすぎず、かといって孤立させすぎないようにします。クリックで入力欄が広がる検索欄も、場所を節約しつつ見つけやすい方法として挙げています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、検索の見つけやすさ・操作の手間に関するユーザー調査に基づく指針です。",
    useCases: [
      "デスクトップ・タブレットでは、入力欄を開いたまま置く",
      "アイコンのクリックとEnterキーのどちらでも検索を実行できるようにする",
      "アイコンだけにする場合は、1回のタップで入力できる状態にする",
    ],
    searchHint: "27 characters",
    url: "https://www.nngroup.com/articles/magnifying-glass-icon/#toc-recommendations-for-designing-with-the-magnifying-glass-icon-4",
    urlSecondary: [{ label: "Site Search Suggestions", url: "https://www.nngroup.com/articles/site-search-suggestions/" }],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-09)。",
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <rect x="1" y="1" width="112" height="24" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="10" y="17" fontSize="9.5" fill="#9EA4C4" fontFamily="Jost, Noto Sans JP">検索する内容を入力</text>
        <rect x="113" y="1" width="26" height="24" rx="4" fill="#7A4F7E" />
        <circle cx="124.5" cy="12" r="4.5" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
        <line x1="127.7" y1="15.2" x2="131" y2="18.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    illustrationNote: "開いた入力欄+送信ボタンを兼ねるアイコン(概念図・系列識別色)",
  },
];

const ICON_NOTES = [
  {
    key: "hig",
    name: "Apple",
    position: "検索アイコンは検索フィールドの構成要素の1つ(ほかにクリアボタンとプレースホルダー)。iOSではフォーカスするとキャンセルボタンが追加される",
    text: "HIGは、検索フィールドが検索アイコン・クリアボタン・プレースホルダーを表示すると定義しています。iOSのツールバーに置いた検索ボタンは、タップすると検索フィールドに変形してキーボードの上(場所がなければ上部)に現れます。フォーカス時のキャンセルボタンで検索を終えてキーボードを閉じられる点は、WWDC26のセッションで説明されています。",
    confirmedNote: "構成要素とツールバーでの挙動はHIGのページデータで直接確認(2026-09)。キャンセルボタンの説明はWWDC26セッション「Design intuitive search experiences」を含む検索結果による間接確認です。",
    url: "https://developer.apple.com/design/human-interface-guidelines/search-fields#Search-in-a-toolbar",
  },
  {
    key: "material",
    name: "Google",
    position: "先頭には、ナビゲーション用アイコンボタン(メニュー・戻る)か、押しても動作しない検索アイコンのどちらかを置く。フォーカスすると先頭は戻る矢印になり、M3 Expressiveではバーが横に広がる(画面端の余白24dp→12dp)",
    text: "Material Design 3の検索バーは、コンテナ・先頭のアイコンボタン・ヒントテキスト・末尾のアイコンまたはアバターで構成されます。検索アイコンは、先頭に置く場合は押しても動作しない目印として、末尾に置く場合は装飾として扱えます。フォーカスすると先頭が戻る矢印に変わり、戻るを押すとフォーカスが外れて候補・結果が閉じ、バーが元に戻ります。",
    confirmedNote: "M3の公式ページ本文(2026-09)とMaterial Components for Androidのドキュメントで確認。",
    url: "https://m3.material.io/components/search/guidelines",
  },
  {
    key: "wcag",
    name: "W3C",
    position: "アイコンの視覚的な位置・挙動についての規定はない。role=\"search\"は検索機能一式を示すランドマークであり、アイコンの配置とは別の関心事",
    text: "WAI-ARIAのsearchランドマークは、検索フォームを構成する要素をまとめて示す役割であり、虫眼鏡アイコンの視覚的な位置(左右)やアニメーションについての規定はありません。アイコンをボタンとして実装する場合は、他の操作可能な要素と同様にフォーカス可能にし、役割・名前を適切に伝える必要があります。",
    confirmedNote: "WAI-ARIA仕様のsearchロールと、MDNの解説本文を確認(2026-09、仕様は2026-10)。",
    url: "https://www.w3.org/TR/wai-aria-1.2/#search",
    urlSecondary: [{ label: "解説(MDN)", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/search_role" }],
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    position: "アイコン自体の左右位置ではなく、検索ボックス全体をページの右上に置くことを推奨。アイコンはクリックで送信されるボタンとして機能させ、1回のクリックで入力欄にカーソルが入るようにすべきとしている",
    text: "記事本文を直接確認したところ、検索の入り口は、人が最初に探す場所である右上に置くよう勧めています。アイコンの役割については、検索ボタンを押して検索する習慣を持つ人がまだ多いので、虫眼鏡アイコンを押したら検索が実行されるようにするのが大切だとしています。また、アイコンを1回押せば入力欄にカーソルが入ってすぐ入力できるようにし、できればポインターを重ねた時点で検索欄を広げて入力できる状態にするとよい、としています。アイコン自体を検索ボックス内の左右どちらに置くべきかは、この記事では明言されていません。",
    confirmedNote: "記事本文を直接取得して確認済み(2026-09)。",
    url: "https://www.nngroup.com/articles/magnifying-glass-icon/",
  },
];

/* 使用シーンごとの比較(通常時 → アクティブ → 入力中 → 結果 → 絞り込み → 終了) */
const SCENES = [
  {
    key: "idle",
    name: "① 通常時(入り口)",
    desc: "まだ操作していない状態。検索がどこにあり、何を探せるかを伝える",
    cells: {
      hig: "iOSでは入り口を3か所から選ぶ: タブバーのタブ(通常のタブ=検索用の画面へ移動/ボタン表示=すぐ入力を開始)、ツールバー(余裕があれば画面下が推奨、上部はボタンとして置く)、一覧の上などのインライン。iPad・Macはツールバーの末尾側かサイドバーの上部。",
      material: "検索バー(画面内の検索)、検索アプリバー(主要なグローバル機能)、検索アイコンボタン(補助的な操作)の3つ。検索バーは高さ56dpで画面上部に置き、スクロールで隠して戻すか、上部に固定する。",
      wcag: "search要素(またはrole=\"search\")で検索機能一式をランドマークにし、ラベルを付ける。入り口の見た目や配置は規定しない。",
      nn: "入力欄を開いたままページの右上に置く。固定幅なら27文字分以上。アイコンだけにするのはスマートフォンなど小さな画面に限る。",
    },
  },
  {
    key: "active",
    name: "② アクティブ(入力前)",
    desc: "検索欄を選んだ直後。キーボードを出し、入力前に役立つ情報を見せる",
    cells: {
      hig: "検索を始める前に、最近の検索などの候補を表示する。検索専用のエリアに移ったらすぐフォーカスを当てる(iPadで画面上のキーボードしかない場合を除く)。ツールバーの検索ボタンは、キーボードの上の検索フィールドに変形する。",
      material: "フォーカスすると先頭が戻る矢印になり、M3 Expressiveではバーが横に広がる。候補・結果は、全画面(スマートフォンの既定)かドッキング(中〜広い幅)で表示し、入力前から過去の候補を出せる。",
      wcag: "コンボボックスのポップアップをいつ開くかは実装しだい。空のままフォーカスした時点で開く方式もあり、入力に関係なく同じ候補(最近の検索など)を出す形は「自動補完なし」にあたる。",
      nn: "アイコンを1回押したら、すぐ入力欄にカーソルが入るようにする。入力欄はアイコンの近くに出す。",
    },
  },
  {
    key: "typing",
    name: "③ 入力中(予測候補)",
    desc: "文字を入力するたびに、候補やその場の結果を更新する",
    cells: {
      hig: "できれば入力と同時に検索を始め、結果を絞り込み続ける。入力中は予測した検索語を候補として出す。トークンは候補と組み合わせると、使えるトークンを知ってもらいやすい。",
      material: "入力中に候補か結果を表示する(実行するまで待つ設定も可)。候補はリストで表示し、先頭のアイコン・「最近」「おすすめ」などの分類ラベル・アバター・フィルターチップ・間隔(ギャップ)でのグループ分けで見つけやすくする。候補が出たらスクリーンリーダーで知らせる。",
      wcag: "自動補完は4つの形: なし/リスト(手動で選択)/リスト(最初の候補を自動で選択)/リスト+入力欄内の補完。下矢印で候補に移る。候補を見て回った後にEscで閉じれば、元の入力を変えずに戻れるように実装できる。",
      nn: "良い結果につながらない候補は出さない。入力した文字と候補の文字を書体で見分けられるようにする。調査では候補が選ばれたのは23%(136回中31回)だが、綴りや品ぞろえの手がかりとしても役立つ。",
    },
  },
  {
    key: "results",
    name: "④ 検索結果",
    desc: "検索を実行した後、または候補を選んだ後の一覧",
    cells: {
      hig: "関連の高い結果から並べ、スクロールを減らす。必要に応じて結果を分類する。",
      material: "Enterキーで実行するか、候補・結果を直接選ぶ。結果はバーの下にリストで表示し、バーの下をスクロールする。検索中であることを示す状態表示(検索アイコンや結果のラベル)を置く。",
      wcag: "「5件見つかりました」のような件数表示は、ステータスメッセージ(4.1.3)としてスクリーンリーダーに伝える。",
      nn: "候補の中に商品などを並べても、実際には全結果の一覧を見て比べたい人が多かった。",
    },
  },
  {
    key: "refine",
    name: "⑤ 絞り込み",
    desc: "検索範囲やカテゴリで結果を絞る",
    cells: {
      hig: "スコープバーで、はっきり分かれた範囲(例: メール全体/今のメールボックス)を切り替える。既定は広い範囲にする。トークンは、よく使う条件(人・写真など)を1つのまとまりとして扱う。",
      material: "フィルターチップで結果を絞り込む。候補・結果のリストは分類ラベルや間隔でグループ分けできる。",
      wcag: "絞り込みのUIについての規定はない(チップやタブ自体の基準は各コンポーネントのページを参照)。",
      nn: "範囲(スコープ)を持つサイトでは、候補にも範囲を表示し、入力した文字・補完した文字・範囲を見分けられるようにする(例: 候補の下に「〇〇カテゴリ内」を字下げして表示)。",
    },
  },
  {
    key: "exit",
    name: "⑥ クリア・終了",
    desc: "入力を消す、検索を終えて元の画面に戻る",
    cells: {
      hig: "入力内容はフィールド内のクリアボタンで消す。watchOSは、キャンセルか検索を押すと元の画面に戻る。",
      material: "戻るアイコンで、フォーカスが外れ、候補・結果が消え、バーが元に戻る。Androidの予測型「戻る」では、スワイプ中に全画面の検索が縮み、前の画面がのぞいて見える。",
      wcag: "Escで候補を閉じ、フォーカスを入力欄に戻す。候補が閉じている状態でEscを押したら入力内容を消す、という動作も任意で加えられる。",
      nn: "―(このシーン専用の指針は、確認した記事にはありません)。",
    },
  },
];

/* 虫眼鏡アイコンの位置と挙動の図(各系列の記述をもとにした概念図。上=操作前、下=操作後) */
function IconBehaviorDiagram({ k }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mag = (x, y, c, s = 1) => (
    <g>
      <circle cx={x} cy={y} r={3.2 * s} fill="none" stroke={c} strokeWidth={1.3} />
      <line x1={x + 2.3 * s} y1={y + 2.3 * s} x2={x + 4.6 * s} y2={y + 4.6 * s} stroke={c} strokeWidth={1.3} strokeLinecap="round" />
    </g>
  );
  const T = (x, y, t, o = {}) => <text x={x} y={y} fontSize={o.s || 7.5} fill={o.c || "#454C78"} textAnchor={o.a || "start"} fontWeight={o.w || 400} fontFamily={font}>{t}</text>;
  const step = (y, label) => T(4, y, label, { s: 7, c: "#7E86AC", w: 700 });
  const arrow = <g><line x1="90" y1="54" x2="90" y2="64" stroke="#B7BCDA" strokeWidth="1.2" /><path d="M86.5 61 L90 66 L93.5 61" fill="none" stroke="#B7BCDA" strokeWidth="1.2" /></g>;
  let body = null;
  if (k === "hig") body = (
    <g>
      {step(12, "操作前")}
      <rect x="10" y="20" width="160" height="22" rx="11" fill="#EEF0F5" />
      {mag(22, 30, "#C2542A")}
      {T(32, 34, "検索", { c: "#9EA4C4" })}
      {T(170, 52, "先頭に虫眼鏡", { a: "end", s: 6.5, c: "#C2542A" })}
      {arrow}
      {step(80, "フォーカス後")}
      <rect x="10" y="88" width="118" height="22" rx="11" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.2" />
      {mag(22, 98, "#C2542A")}
      {T(32, 102, "旅行|", { c: "#171B36" })}
      <circle cx="117" cy="99" r="5" fill="#C9CEE3" />{T(117, 101.5, "✕", { a: "middle", s: 6, c: "#FFFFFF" })}
      {T(134, 102, "キャンセル", { s: 7.5, c: "#C2542A", w: 600 })}
      {T(10, 122, "入力するとクリア、フォーカスでキャンセルが出る", { s: 6.5, c: "#7E86AC" })}
    </g>
  );
  if (k === "material") body = (
    <g>
      {step(12, "操作前")}
      <rect x="18" y="20" width="144" height="22" rx="11" fill="#E3EDE9" />
      {[26, 30, 34].map((y) => <line key={y} x1="26" x2="34" y1={y} y2={y} stroke="#2F7D6E" strokeWidth="1.2" />)}
      {T(40, 34, "メッセージを検索", { c: "#565D8A" })}
      {mag(150, 30, "#2F7D6E")}
      {T(18, 52, "余白24dp", { s: 6.5, c: "#A3821F" })}
      {T(162, 52, "先頭はメニュー等/虫眼鏡は装飾", { a: "end", s: 6.5, c: "#2F7D6E" })}
      {arrow}
      {step(80, "フォーカス後")}
      <rect x="8" y="88" width="164" height="22" rx="11" fill="#E3EDE9" />
      {T(16, 102.5, "‹", { s: 11, c: "#2F7D6E", w: 700 })}
      {T(28, 102, "旅行|", { c: "#171B36" })}
      {T(162, 102, "✕", { a: "end", c: "#454C78" })}
      {T(8, 122, "先頭が戻る矢印に変わり、バーが横に広がる(余白12dp)", { s: 6.5, c: "#7E86AC" })}
    </g>
  );
  if (k === "wcag") body = (
    <g>
      {step(12, "構造(見た目の規定なし)")}
      <rect x="8" y="20" width="164" height="62" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" />
      {T(14, 30, "<search> または role=\"search\"", { s: 7, c: "#A3821F", w: 600 })}
      {T(16, 44, "ラベル: このサイト内を検索", { s: 7 })}
      <rect x="16" y="50" width="110" height="18" rx="3" fill="#FFFFFF" stroke="#949494" />
      <rect x="130" y="50" width="34" height="18" rx="3" fill="#FFFFFF" stroke="#949494" />
      {mag(147, 58, "#454C78")}
      {T(130, 78, "名前「検索」", { s: 6.5, c: "#A3821F" })}
      {T(8, 98, "アイコンの位置・動きは自由。", { s: 7, c: "#454C78" })}
      {T(8, 110, "ボタンにする場合はフォーカスでき、", { s: 7, c: "#454C78" })}
      {T(8, 122, "「検索」という名前を持たせる", { s: 7, c: "#454C78" })}
    </g>
  );
  if (k === "nn") body = (
    <g>
      {step(12, "推奨: 右上に入力欄+アイコン")}
      <rect x="8" y="18" width="164" height="34" rx="3" fill="#F8F9FD" stroke="#E1E3F0" />
      <rect x="14" y="26" width="26" height="8" rx="2" fill="#D5D9EC" />
      <rect x="90" y="24" width="60" height="16" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.1" />
      {T(94, 35, "検索…", { s: 6.5, c: "#9EA4C4" })}
      <rect x="150" y="24" width="18" height="16" rx="3" fill="#7A4F7E" />
      {mag(158, 31, "#FFFFFF", 0.9)}
      {T(168, 48, "クリック/Enterで送信", { a: "end", s: 6.2, c: "#7A4F7E" })}
      {arrow}
      {step(80, "アイコンだけの場合(小さな画面)")}
      <rect x="148" y="88" width="20" height="18" rx="3" fill="#FFFFFF" stroke="#7A4F7E" />
      {mag(157, 96, "#7A4F7E")}
      {T(140, 100, "→", { a: "end", s: 8, c: "#B7BCDA" })}
      <rect x="20" y="88" width="104" height="18" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.2" />
      {T(26, 100, "|", { s: 8, c: "#3A4FCF" })}
      {T(8, 122, "1回押したら、アイコンの近くの入力欄にすぐカーソル", { s: 6.5, c: "#7E86AC" })}
    </g>
  );
  return (
    <svg viewBox="0 0 180 128" width="100%" style={{ maxWidth: 240, display: "block", margin: "0 auto" }} role="img" aria-label="虫眼鏡アイコンの位置と挙動の図">
      {body}
    </svg>
  );
}

function IconNotes() {
  return (
    <>
      <div className="dsp-mobile-only" style={styles.iconGrid}>
        {ICON_NOTES.map((s) => (
          <div key={s.key} style={styles.sourceCard}>
            <div style={styles.sourceName}>{s.name}</div>
            <div style={styles.iconDiagramBox}><IconBehaviorDiagram k={s.key} /></div>
            <div style={styles.positionBadge}>{s.position}</div>
            <p style={styles.sourceStance}>{s.text}</p>
            <p style={styles.confirmedNote}>{s.confirmedNote}</p>
            <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
            {s.urlSecondary && s.urlSecondary.map((sl) => (<a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={{ ...styles.sourceLink, marginLeft: 8 }}>{sl.label} ↗</a>))}
          </div>
        ))}
      </div>

      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.matrixGrid}>
            <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
            {ICON_NOTES.map((s) => (
              <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                <div style={styles.sourceName}>{s.name}</div>
              </div>
            ))}
            <div style={styles.labelCell}>図</div>
            {ICON_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, justifyContent: "center" }}><IconBehaviorDiagram k={s.key} /></div>))}
            <div style={styles.labelCell}>位置・挙動</div>
            {ICON_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
            <div style={styles.labelCell}>基本方針</div>
            {ICON_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.text}</div>))}
            <div style={styles.labelCell}>確認状況</div>
            {ICON_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.confirmedNote}</div>))}
            <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>リンク</div>
            {ICON_NOTES.map((s) => (
              <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>
                <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                {s.urlSecondary && s.urlSecondary.map((sl) => (<a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={{ ...styles.link, display: "block" }}>{sl.label} ↗</a>))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* 使用シーンの画面イメージ(4系列に共通する流れを描いた概念図) */
function SceneMockup({ scene }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const bar = (y, focused, text, typed) => (
    <g>
      <rect x="8" y={y} width="84" height="14" rx="7" fill={focused ? "#FFFFFF" : "#E7EAF4"} stroke={focused ? "#3A4FCF" : "none"} strokeWidth="1.2" />
      {focused ? (
        <path d={`M17 ${y + 4} l-3 3 l3 3`} fill="none" stroke="#454C78" strokeWidth="1.2" />
      ) : (
        <g>
          <circle cx="16" cy={y + 6.5} r="2.6" fill="none" stroke="#565D8A" strokeWidth="1.1" />
          <line x1="17.9" y1={y + 8.4} x2="19.6" y2={y + 10.1} stroke="#565D8A" strokeWidth="1.1" />
        </g>
      )}
      <text x="24" y={y + 9.8} fontSize="6.5" fill={typed ? "#171B36" : "#9EA4C4"} fontFamily={font}>{text}</text>
      {typed && <text x="85" y={y + 9.8} fontSize="6.5" fill="#7E86AC" textAnchor="middle">✕</text>}
    </g>
  );
  const rows = (y0, items, icon) =>
    items.map((t, i) => (
      <g key={i}>
        <text x="12" y={y0 + i * 12} fontSize="6" fill="#9EA4C4">{icon}</text>
        <text x="21" y={y0 + i * 12} fontSize="6.3" fill="#2E3457" fontFamily={font}>{t}</text>
      </g>
    ));
  const content = (y) => [0, 1, 2, 3].map((i) => <rect key={i} x="10" y={y + i * 14} width={i % 2 ? 60 : 78} height="8" rx="2" fill="#EEF0F7" />);
  let body;
  if (scene === "idle") body = <g>{bar(12, false, "メッセージを検索")}{content(34)}</g>;
  if (scene === "active") body = (
    <g>
      {bar(12, true, "検索", false)}
      <text x="12" y="38" fontSize="5.5" fill="#7E86AC" fontFamily={font}>最近の検索</text>
      {rows(50, ["請求書", "旅行の予定", "会議メモ"], "↺")}
      <rect x="4" y="88" width="92" height="36" fill="#E7EAF4" />
      <text x="50" y="109" fontSize="6" fill="#7E86AC" textAnchor="middle" fontFamily={font}>キーボード</text>
    </g>
  );
  if (scene === "typing") body = (
    <g>
      {bar(12, true, "旅", true)}
      <text x="21" y="42" fontSize="6.3" fill="#2E3457" fontFamily={font}><tspan fontWeight="700">旅</tspan>行の予定</text>
      <text x="21" y="54" fontSize="6.3" fill="#2E3457" fontFamily={font}><tspan fontWeight="700">旅</tspan>館 予約</text>
      <text x="21" y="66" fontSize="6.3" fill="#2E3457" fontFamily={font}><tspan fontWeight="700">旅</tspan>費 精算</text>
      {[42, 54, 66].map((y) => <text key={y} x="12" y={y} fontSize="6" fill="#9EA4C4">⌕</text>)}
      <rect x="4" y="88" width="92" height="36" fill="#E7EAF4" />
      <text x="50" y="109" fontSize="6" fill="#7E86AC" textAnchor="middle" fontFamily={font}>キーボード</text>
    </g>
  );
  if (scene === "results") body = (
    <g>
      {bar(12, true, "旅行", true)}
      <text x="12" y="38" fontSize="5.5" fill="#7E86AC" fontFamily={font}>結果 3件</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="16" cy={48 + i * 20} r="4" fill="#C9CEE3" />
          <rect x="24" y={44 + i * 20} width="54" height="4" rx="2" fill="#B7BCDA" />
          <rect x="24" y={51 + i * 20} width="40" height="3.5" rx="1.75" fill="#E1E3F0" />
        </g>
      ))}
    </g>
  );
  if (scene === "refine") body = (
    <g>
      {bar(12, true, "旅行", true)}
      {["すべて", "メール", "写真"].map((t, i) => (
        <g key={t}>
          <rect x={10 + i * 28} y="32" width="25" height="11" rx="5.5" fill={i === 1 ? "#3A4FCF" : "#FFFFFF"} stroke="#B7BCDA" strokeWidth="0.8" />
          <text x={22.5 + i * 28} y="39.8" fontSize="5.6" fill={i === 1 ? "#FFFFFF" : "#454C78"} textAnchor="middle" fontFamily={font}>{t}</text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx="16" cy={58 + i * 20} r="4" fill="#C9CEE3" />
          <rect x="24" y={54 + i * 20} width="54" height="4" rx="2" fill="#B7BCDA" />
          <rect x="24" y={61 + i * 20} width="40" height="3.5" rx="1.75" fill="#E1E3F0" />
        </g>
      ))}
    </g>
  );
  if (scene === "exit") body = (
    <g>
      {bar(12, false, "メッセージを検索")}
      {content(34)}
      <path d="M26 104 q-10 -8 0 -16" fill="none" stroke="#3A4FCF" strokeWidth="1.2" />
      <path d="M24 86 l3 2 l-3 2" fill="none" stroke="#3A4FCF" strokeWidth="1.2" />
      <text x="34" y="99" fontSize="6" fill="#3A4FCF" fontFamily={font}>戻る・クリアで元の状態へ</text>
    </g>
  );
  return (
    <svg viewBox="0 0 100 128" width="100" height="128" role="img" aria-label="使用シーンの画面イメージ">
      <rect x="1" y="1" width="98" height="126" rx="10" fill="#FFFFFF" stroke="#D5D9EC" strokeWidth="1.2" />
      {body}
    </svg>
  );
}

function SceneStrip() {
  return (
    <div style={styles.sceneStrip}>
      {SCENES.map((sc) => (
        <div key={sc.key} style={styles.sceneStep}>
          <SceneMockup scene={sc.key} />
          <div style={styles.sceneStepName}>{sc.name}</div>
          <div style={styles.sceneStepDesc}>{sc.desc}</div>
        </div>
      ))}
    </div>
  );
}

function SceneTable() {
  return (
    <>
      <div className="dsp-mobile-only" style={styles.sceneCardList}>
        {SCENES.map((sc) => (
          <div key={sc.key} style={styles.sourceCard}>
            <div style={styles.sourceName}>{sc.name}</div>
            <div style={styles.sourceDoc}>{sc.desc}</div>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sceneCardRow}>
                <span style={styles.sceneCardSite}>{s.name}</span>
                <span style={styles.sceneCardText}>{sc.cells[s.key]}</span>
              </div>
            ))}
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
              </div>
            ))}
            {SCENES.map((sc, i) => {
              const last = i === SCENES.length - 1 ? styles.lastRowCell : {};
              return (
                <React.Fragment key={sc.key}>
                  <div style={{ ...styles.labelCell, ...last, flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                    <span style={{ fontWeight: 600, color: "#171B36" }}>{sc.name}</span>
                  </div>
                  {SOURCES.map((s) => (
                    <div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...last, ...(sc.cells[s.key].startsWith("―") ? { color: "#9EA4C4" } : {}) }}>{sc.cells[s.key]}</div>
                  ))}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

/* Google(M3): スタイル2種 × レイアウト2種 の組み合わせ(ユーザー提供の公式ドキュメントの図を元にした概念図) */
function M3SearchVariants() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const phone = (x, contained, docked, label) => {
    const barX = docked ? x + 30 : x + 8;
    const barW = docked ? 88 : 110;
    return (
      <g key={label}>
        <rect x={x} y="4" width="126" height="118" rx="10" fill={docked ? "#8C90A6" : "#FFFFFF"} stroke="#D5D9EC" strokeWidth="1.2" />
        {docked && [0, 1, 2].map((i) => <rect key={i} x={x + 8} y={26 + i * 16} width="16" height="8" rx="2" fill="#A4A8BC" />)}
        {docked && <rect x={barX} y="16" width={barW} height="96" rx={contained ? 12 : 8} fill="#F3F5FA" />}
        <rect x={barX + (contained ? 4 : 0)} y={contained ? 20 : 16} width={barW - (contained ? 8 : 0)} height="16" rx={contained ? 8 : docked ? 8 : 0} fill={contained ? "#E3EDE9" : docked ? "#F3F5FA" : "#FFFFFF"} />
        {!contained && <line x1={barX} x2={barX + barW} y1="36" y2="36" stroke="#9EA4C4" strokeWidth="0.8" />}
        <text x={barX + (contained ? 12 : 8)} y={contained ? 31 : 27.5} fontSize="7" fill="#2E3457" fontFamily={font}>‹ 旅行|</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={barX + 12} cy={50 + i * 18} r="4.5" fill="#2F7D6E" opacity="0.4" />
            <rect x={barX + 20} y={46 + i * 18} width={barW - 34} height="4" rx="2" fill="#B7BCDA" />
            <rect x={barX + 20} y={53 + i * 18} width={barW - 48} height="3.5" rx="1.75" fill="#E1E3F0" />
          </g>
        ))}
        <text x={x + 63} y="136" fontSize="8.5" fill="#454C78" textAnchor="middle" fontFamily={font}>{label}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 560 142" width="100%" style={{ maxWidth: 640, display: "block", margin: "0 auto" }} role="img" aria-label="Material Design 3の検索のスタイルとレイアウトの組み合わせ">
      {phone(4, true, false, "包含 × 全画面")}
      {phone(144, true, true, "包含 × ドッキング")}
      {phone(284, false, false, "分割 × 全画面")}
      {phone(424, false, true, "分割 × ドッキング")}
    </svg>
  );
}

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

function SearchFieldSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1.6px solid #3A4FCF", borderRadius: 20, padding: "8px 14px", background: "#F8F9FD" }}>
        <span style={{ fontSize: 13, color: "#9EA4C4", flex: 1, textAlign: "left", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>検索</span>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="5" fill="none" stroke="#3A4FCF" strokeWidth="1.8" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#3A4FCF" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export default function TextInputsSearchFieldPage() {
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
        <SidebarNav currentPath="/components/text-inputs/search-field" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / 検索フィールド</span>
            <span>SPEC No. 021</span>
          </div>

          <h1 style={styles.title}>検索フィールド</h1>
          <p style={styles.subtitle}>4つのガイドラインが、検索の入り口(アイコン・配置・発見性)と、通常時・アクティブ・予測候補・結果といった使用シーンごとの部品をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <SearchFieldSwatch />
            <p style={styles.swatchNote}>虫眼鏡アイコン+テキスト入力欄の組み合わせが、4系列に共通する基本形。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              AppleとGoogleは、どちらも<strong>検索を「入り口 → 入力前の候補 → 入力中の予測候補 → 結果 → 絞り込み」という流れで設計</strong>しています。Appleは検索前に最近の検索、入力中に予測候補を出し、できれば入力と同時に結果を更新するよう勧めています。Googleも、入力前から過去の候補を出し、入力中は候補か結果をリストで表示するとしており、考え方はほぼ同じです。
            </p>
            <p style={styles.synthesisText}>
              違いが大きいのは入り口の置き方です。Appleは<strong>iOSでタブ・ツールバー(画面下が推奨)・インラインの3か所</strong>から選ばせ、Googleは<strong>検索バー・検索アプリバー・検索アイコンボタン</strong>の3種類を、検索がどれだけ主要な機能かで使い分けます。Googleは高さ56dp・幅360〜720dpなどの寸法や、スマートフォンでは全画面、広い画面ではドッキングという表示の切り替えまで具体的に定めています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは、<strong>「虫眼鏡アイコンだけにすると検索が見つけにくくなる」</strong>と指摘し、デスクトップでは入力欄を開いたまま右上に置くよう勧めています。予測候補についても、<strong>良い結果につながらない候補は出さない、入力した文字と候補を書体で見分けられるようにする</strong>という品質面の注意を示しており、見た目の仕様が中心のApple・Googleを補う内容です。
            </p>
            <p style={styles.synthesisText}>
              W3Cは見た目を定めず、<strong>検索フォームはsearchランドマークで示し、候補を出すならコンボボックスの役割とキー操作で組み立てる</strong>ことを求めます。Googleが「候補が出たらスクリーンリーダーで知らせる」「矢印キーで結果を移動する」としている点は、このW3Cのパターンと対応しています。
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

          <div style={styles.linksRow}>
            <a href="/components/navigation/app-bar" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>アプリバー ↗</div>
              <div style={styles.linkCardDesc}>Googleの「検索アプリバー」(検索ビューへの入り口となるアプリバーのバリエーション)の詳細はこちら</div>
            </a>
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

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>使用シーンごとのコンポーネント比較</h2>
          <p style={styles.diagramNote}>検索は1つの部品ではなく、状態が移り変わる一連の流れです。通常時(入り口)からクリア・終了までの6つのシーンで、4系列がそれぞれ何を定めているかを比較します。下の画面イメージは、4系列に共通する流れを描いた概念図です。</p>
          <SceneStrip />
          <SceneTable />
          <div style={styles.sceneNoteBox}>
            <div style={styles.sceneNoteTitle}>Google(M3)の補足 ― アクティブ時の見た目は「スタイル2種 × レイアウト2種」</div>
            <M3SearchVariants />
            <p style={styles.chartNote}>包含(Contained)は塗りつぶしたコンテナで検索バーと結果をまとめるM3 Expressiveのスタイルで、推奨されています。分割(Divided)は区切り線で分ける従来のスタイルです。全画面はスマートフォン(コンパクト幅)の既定、ドッキングは中〜広い幅に向き、検索バーの下にリストを出して残りの画面を幕で覆います。図はユーザー提供の公式ドキュメントの図を元にした概念図です。</p>
          </div>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 使用シーンから見た実務の結論</div>
            <p style={styles.synthesisText}>
              4系列を合わせると、<strong>入力前は最近の検索、入力中は予測候補、実行後は関連順の結果</strong>という流れが共通の型です。候補はAppleとGoogleがそろって勧めていますが、NN groupの調査では<strong>実際に候補が選ばれたのは23%</strong>にとどまり、候補は「選ばせるもの」だけでなく、綴りや品ぞろえを確かめる手がかりとしても役立つとしています。
            </p>
            <p style={styles.synthesisText}>
              絞り込みでは、Appleがスコープバーとトークン、Googleがフィルターチップと分類ラベルを使い、NN groupは候補の中に範囲(カテゴリ)を表示するよう勧めています。<strong>既定を広い範囲にするよう明記しているのはApple</strong>です(スコープバーの既定)。ほかの系列も、絞り込みを後から加える形をとっており、この考え方と矛盾しません。実装では、候補のリストをW3Cのコンボボックスのパターンで組み、結果の件数をステータスメッセージ(4.1.3)で伝えると、支援技術の利用者にも同じ流れが届きます。
            </p>
          </div>

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>虫眼鏡アイコンの位置と挙動</h2>
          <p style={styles.diagramNote}>検索の入り口としての位置づけだけでなく、虫眼鏡アイコン自体を「どこに置き、どう動かすか」を4系列で比較します。図は各系列の記述をもとにした概念図で、上が操作前、下が操作後(フォーカス・タップの後)です。</p>
          <IconNotes />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["検索・絞り込み", "見つけやすさ・初めての案内"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Apple・W3C(MDN・APG)・NN groupは本文確認済み。GoogleはM3の公式ページ本文とMaterial Components for Androidのドキュメントで確認。Appleのキャンセルボタンの説明のみ検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはSearch fieldsページの「Best practices」見出しへのアンカー付きリンクで、スコープバー・トークンとiOSの見出しも併記しています。GoogleはM3のSearchのGuidelinesページに加え、Material Components for Androidのドキュメントを併記しています(m3.material.io本文はSPAのため、内容はM3の公式ページ本文の写しで確認)。W3CはMDNのsearchロール解説と、APG Combobox Patternの「About This Pattern」の節です。NN groupは虫眼鏡アイコンの記事の推奨事項の節と、検索候補の記事です。
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
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  sceneStrip: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12, marginBottom: 18 },
  sceneStep: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 4 },
  sceneStepName: { fontSize: 11.5, fontWeight: 700, color: "#171B36", marginTop: 4 },
  sceneStepDesc: { fontSize: 10.5, lineHeight: 1.5, color: "#7E86AC" },
  sceneCardList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sceneCardRow: { display: "flex", flexDirection: "column", gap: 2, borderTop: "1px dashed #E1E3F0", paddingTop: 8, marginTop: 8 },
  sceneCardSite: { fontSize: 11, fontWeight: 700, color: "#454C78" },
  sceneCardText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457" },
  sceneNoteBox: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  sceneNoteTitle: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 10 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  iconDiagramBox: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "10px 8px", margin: "8px 0 4px" },
  iconGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10, marginBottom: 22 },
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
