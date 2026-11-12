import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, PageLink, SummaryCard, RelatedPages } from "./page-parts";

/**
 * 「情報伝達の使い分け」ページ。Communicationカテゴリの先頭に置く統合ガイド。
 * 「Selectionの選び方」ページと同種の位置づけで、Containment/Communication
 * 両カテゴリにまたがる9パーツ(サイドシート・ボトムシート・ダイアログ・
 * フルスクリーンダイアログ・スナックバー・トースト・ツールチップ・
 * バナー・アコーディオン)を、「ユーザーに何かアクションをさせる
 * 必要があるか」というユーザー行動を起点に整理する。
 *
 * 2026-09 改訂の経緯: 初版は「スナックバー・トースト」を1パーツとして扱い、
 * 判断フローも「求める性質」を起点にしていたが、ユーザーから(1)スナックバーと
 * トーストは実際の使い方が異なるため別項目にしたい、(2)判断フローの起点は
 * ユーザーの行動(アクションの有無・ヒント・アクションボタン・エラーなど)に
 * したい、(3)○✕の比較表で差分を明確にしたい、(4)アコーディオンなど足りない
 * パーツを追加したい、というフィードバックを受けて全面改訂した。スナックバーと
 * トーストは「スナックバー・トースト」ページ自体もユーザー承認のもと別ページに
 * 分割済み(各ページを参照)。
 *
 * 各パーツのページで確認した「AI解釈」の内容を統合したものであり、新しい
 * 一次情報の要約ではない。系列別の引用・公式リンクは持たず、詳細は各パーツの
 * ページ側を参照する構成にしている。
 *
 * 判断フローは当初、Selectionの選び方ページと同じ「ひし形=分岐、角丸=開始/結果、
 * ラベル付き矢印」の型を踏襲していたが、下記の改訂を経て現在は
 * 「角丸の枠=分岐/結果、直角の矢印」の左→右フローチャートになっている。
 *
 * 2026-09 再改訂の経緯: ユーザーから(1)SVG版の判断フローが小さく読みにくい、
 * (2)ルートの「ユーザーにアクションをさせる必要がある?」という単一のひし形から
 * 実質4方向(いいえ×2種、はい×2種)に分岐しており、1つの問いに2通りの
 * 「いいえ」・2通りの「はい」が存在する矛盾した構造になっている、という指摘を
 * 受けて全面的に作り直した。新しい判断フローは、1つのひし形=1つの正味の
 * 二択質問という原則を徹底した上で、いったんHTML/CSSの入れ子カード表示に
 * 置き換えた。ルートの軸も「アクションの要否」から「操作を完全にブロックするか」
 * (比較表の1列目と一致)に変更し、「バナー」ページ(旧「アラート/バナー」)のAI解釈で確認した
 * Nielsen Norman Groupの「アクション必須通知」という分類(単純な自動消去型の
 * パッシブ通知とは別の性質)を、判断フロー上でも「対応するまで画面に残すべきか」
 * という独立した問いとして正しく反映した(旧版では「アクション不要」の枝に
 * 誤って同居していた)。
 *
 * 2026-09 三度目の改訂: 入れ子カード表示は階層が深くなるほどインデントで
 * 読みにくいというフィードバックを受け、「昔ながらのフローチャート(枠+矢印)を
 * より大きく作り直す」方針に変更した。1つの質問=1つの正味の二択という
 * 構造(上記の改訂内容)は維持しつつ、見た目だけSVGの枠+矢印に戻した。
 *
 * 2026-09 四度目の改訂: さらに「上から下ではなく左から右に流れる形にしてほしい」
 * 「画面内に収めてほしい」という指摘を受け、レイアウトを90度回転させた。
 * 縦方向に伸ばしていた前版は横長になり画面幅に収まらなかったが、左→右に
 * 変えたことで木の形が縦長寄りになり、PCでは図全体が本文幅に収まるようになった。
 * 詳細は DECISION_TREE 付近のコメントを参照。
 *
 * 2026-09 追記: 新規作成された「プログレスインジケーター」「バッジ」
 * 「空状態」「ローディング状態」の4ページは、いずれも「進行中のシステム状態を
 * 示す」ことが目的で、本ページの9パーツが扱う「何かが起きたのでユーザーに
 * 伝える・対応させる」という性質とは異なるため、判断フロー・比較表には含めず、
 * ページ末尾に「関連するが対象外のパーツ」として参照リンクのみ追加した。
 *
 * 2026-09 五度目の改訂: ユーザーから3点の指摘を受け、以下の通り改訂した。
 * (1) フローチャートの「はい」を上・「いいえ」を下に置く並びが、ダイアログ/
 * フルスクリーンダイアログを分ける分岐だけ逆転しており(旧版は「いいえ」→
 * ダイアログが上、「はい」→フルスクリーンダイアログが下)、他の全分岐と矛盾
 * していたため統一した。この並び順の矛盾が、枝と結果の対応関係を読み取り
 * にくくしていた主因と考えられる。
 * (2) 「アコーディオン・ボトムシート・サイドシートは、実質的に他の操作を
 * 完全にブロックしているのでは」という指摘を受け、①の軸が指す「ブロック」は
 * 「開いている間そのUIに注意が向くか」ではなく「背景コンテンツの操作を技術的に
 * 無効化するか(モーダル性)」であることを明記した。標準ボトムシート/サイド
 * シート・アコーディオンは、操作している間の体感としては他のことをしづらい
 * が、技術的には背景を操作不能にはしない(Googleの標準/モーダルの区別、
 * W3Cのaria-modal有無と一致)。この区別を軸の説明文・判断フローの質問文言
 * (「操作を完全にブロックする?」→「背景の操作も無効にする?」)の両方で
 * 明示した。
 * (3) 「ダイアログとフルスクリーンダイアログの違いは、複数ステップかより
 * 情報の性質の違いが大きいのでは(閲覧・確認ベースはダイアログ、情報量が
 * 多く集中実行させたいものはフルスクリーン)」という指摘を受け、両者を分ける
 * 判断フローの質問を「複数ステップの入力が必要?」から「情報量が多く集中
 * 実行が必要?」に変更した。Googleの一次情報(フォーム入力等の複数ステップ
 * タスクに使う)自体は変えていないが、複数ステップになりやすいのは情報量が
 * 多いタスクの「結果」であって「原因」ではない、という整理に改めた。
 *
 * 2026-09 六度目の改訂: 五度目の改訂は「①の軸が指す意味を文章で補足する」
 * 対応にとどまり、フローの分岐構造そのものは直していなかったため、ユーザーから
 * 「選択のさせ方に誤りがある、分岐の項目自体を変えてほしい」という再指摘を
 * 受けた。実際に構造上の誤りがあった: 旧ルートの質問「背景の操作も無効にする?」
 * は、ボトムシート/サイドシートが標準/モーダルの2バリエーションを持ち背景を
 * 無効にするかどうかが一意に決まらない(比較表で△)にもかかわらず、「はい」の
 * 枝ではダイアログ/フルスクリーンダイアログしか選べない構成になっていた。
 * つまり、背景をブロックする補助パネル(モーダルボトムシート/サイドシート)を
 * 探しているユーザーが「はい」と答えても、本来最適な選択肢に辿り着けなかった。
 * これを修正するため、ルートの質問を全9パーツを漏れなく二分できる軸
 * 「決定・確認を求める?」に置き換えた。ダイアログ・フルスクリーンダイアログの
 * みが単一の決定・確認をユーザーに求め、残り7パーツ(アコーディオン・ボトム
 * シート・サイドシート・バナー・ツールチップ・スナックバー・トースト)は
 * いずれもモーダル版の有無にかかわらず決定を要求しない。背景操作の無効化
 * (モーダル性)は、ボトムシート/サイドシートのページ内で標準/モーダルを選ぶ
 * 際の判断材料として引き続き比較表・判断軸の1つ(参考情報)に残すが、フロー自体の分岐
 * には使わないことにした。木の形(第2階層以下の分岐)は変更していない。
 *
 * 2026-09 七度目の改訂: 六度目の改訂も、ユーザーから「決定・確認を求めるのは
 * ボトムシートやサイドシート、アコーディオンでもあり得るので初めの問いが成り立たない」
 * という再指摘を受けた。その通りで、比較表でもボトムシート/サイドシートは
 * actionButton列が○であり、実際に保存・確認などの操作を持てる。つまり
 * 「決定・確認を求めるか」は、五度目の改訂で問題になった「背景操作を無効にするか」と
 * 同じ欠陥を抱えていた: どちらも「その部品に何を入れるか(中身・使い方)」で
 * 変わってしまう属性であり、ボトムシート/サイドシート・アコーディオンのような
 * 汎用コンテナは、中身次第でどちらの性質も持ち得るため、単一の振る舞い軸では
 * 9パーツを漏れなく二分できない。
 * この教訓から、ルート軸を「その部品の使い方」ではなく「その部品として公式に
 * 定義されている実装形態」という、中身に左右されない構造的な事実に置き換えた:
 * 「非モーダル版が存在しない(常にモーダルとしてしか実装できない)か?」。
 * ダイアログ・フルスクリーンダイアログは、Apple・Googleいずれの定義でも背景操作を
 * 残したまま使う非モーダル版が存在しない。一方ボトムシート/サイドシートは
 * 標準(非モーダル)版が公式に用意されており、アコーディオン・バナー・
 * ツールチップ・スナックバー・トーストはそもそもモーダルという概念を持たない。
 * この軸は比較表の「背景操作を無効化」列で○(常に無効化)/△(条件による)/✕(常に
 * 無効化しない)のうち「○だけがYES」という、コンテンツの使われ方に左右されない
 * 部品定義そのものの区別であり、行動軸(決定を求める/背景をブロックする)とは
 * 本質的に異なる。判断軸は4つに整理し直し、「決定・確認を求めるか」の軸は
 * 削除、旧④の「背景操作も止めるか(参考情報)」をこの新しいルート軸に統合した。
 *
 * 2026-09 八度目の改訂: ユーザーから(1)「ボトムシート/サイドシートは実務上モーダルで
 * 使われることが多いのでは」という指摘、(2)AI解釈が長く冗長という指摘を受けた。
 * (1)は各パーツのページのSOURCESを確認したところ事実だった: Apple(Sheets)は
 * 「既定ではモーダルとして提示され」と明記しており、Google(Side sheets)も
 * 「画面サイズが限られるモバイル端末などのコンパクトな画面では、モーダル
 * サイドシートが好まれる」としている。比較表の表記を「△(モーダル時)」から
 * 「△(モーダルが多い)」に変更し、AI解釈にも反映した。この事実は、両パーツに
 * 非モーダル版が公式に存在するという①軸の前提(七度目の改訂の根拠)自体は
 * 覆さない――非モーダル版の有無という部品定義と、実務でどちらが多く使われるか
 * という利用傾向は別の話のため。(2)はAI解釈を5段落の長文から3段落の短文に
 * 圧縮し、既に修正済みの過去の失敗(旧版の軸など)の説明を削り、現在の結論だけを
 * 述べる形にした。
 *
 * 2026-09 九度目の改訂: ユーザーから「モーダルボトムシートは実務上フルスクリーン
 * ダイアログと似た使われ方をすることが多いので、その違いを判断フローで区別
 * できるようにしてほしい」という要望を受けた。ルート軸(①非モーダル版が存在
 * しないか)自体は変更していない――ボトムシートには公式に非モーダル版が存在する
 * という定義上の事実は変わらないため。代わりに、「補助コンテンツを提供する?」
 * →「同じ場所で開閉させる?」の「いいえ」側(アコーディオンではなくボトムシート/
 * サイドシートに向かう経路)に、新しい質問「画面全体を使う一連のタスクか?」を
 * 追加した。「はい」の場合はフルスクリーンダイアログの結果に合流させ(ダイアログ/
 * フルスクリーンダイアログの分岐に続く2つ目の経路)、「いいえ」の場合は従来通り
 * 「画面の下から出すか?」でボトムシート/サイドシートに進む。これにより、
 * フルスクリーンダイアログの結果は木の中に2箇所登場する(9パーツ・10個の結果枠)。
 * この追加は、ルート軸の「非モーダル版の有無」という定義上の事実とは別の話――
 * 「補助コンテンツとして提供する情報量が、画面全体を使うタスクの水準か」という、
 * 補助コンテンツ側の枝の中だけで完結する実務的な判断だからである。
 *
 * 2026-09 十度目の改訂: ユーザーから「ボトムシートは補助コンテンツの提供以外の
 * 用途でもよく使われるため違和感がある」という指摘を受けた。実際、ボトムシートの
 * ページで確認済みのGoogleの一次情報は、モーダルボトムシートの用途を「多数の
 * 操作項目があり、詳細な説明やアイコンが必要なメニューを提示したい時」としており、
 * 受け身の「コンテンツ」というより能動的な「操作(メニュー・アクション一覧)」の
 * 提示が主要な用途であることが分かる。②の軸・質問・カードのラベルがいずれも
 * 「補助コンテンツ」とだけ表現しており「操作」を明記していなかったため、違和感の
 * 原因になっていた。分岐のロジック自体(通知か、そうでないか)は正しいままなので、
 * ②の軸ラベル・判断フローの質問文言・ボトムシート/サイドシートのカードの
 * 一言説明のすべてに「操作」を追記し、「補助コンテンツ・操作を提供する?」という
 * 表現に統一した。
 *
 * 2026-09 十一度目の改訂: ユーザーから「フロー図がやはり矛盾が気になるので
 * 項目ごと削除してほしい」という指摘を受けた。10回の改訂を重ねても解消
 * しなかった根本原因は、ボトムシート/サイドシート/アコーディオンが
 * 「補助コンテンツの提示」「操作メニュー」「ダイアログに近い使い方」の
 * いずれにもなり得る多目的な部品であり、木構造の1つの質問には必ず
 * 「はい/いいえ」の二択しか持たせられないため、実際には△(条件付き)である
 * 実情を強引にどちらかに倒さざるを得ず、そのたびに別の使われ方と矛盾して
 * 見えてしまう、という構造的な限界にあった。表(比較表)であれば△を
 * そのまま表現できるため、フローチャート一式(DECISION_TREEのデータ・
 * レイアウト計算・SVG描画コンポーネント・本文の説明段落)を削除し、
 * 判断基準は比較表に統合した。あわせて、フロー図が担っていた「決定・
 * 確認を求める操作か」「画面全体を置き換えるか」という2つの判断基準を
 * 比較表の列として新設し、△を使って多目的な部品の実情を正直に表現できる
 * ようにした。
 */

/* 6つの知らせる部品(⑥ No.055で、オーバーレイの部品を「オーバーレイの使い分け」へ分け、
 * ステータスメッセージを加えた)。並びは判断軸①→②の順(作業を止める → 残る → 操作を持てる → 見るだけ) */
const CARDS = [
  {
    key: "dialog", name: "モーダルダイアログ", path: "/components/containment/dialog", built: true,
    oneLiner: "作業を止めて、答え(OK・キャンセルなど)を求める知らせ方。",
    doText: "取り消せない操作の確認など、答えを得るまで先へ進ませたくない時",
    dontText: "答えのいらない知らせで済む時(→バナー・スナックバー)",
    icon: () => (
      <svg width="50" height="24" viewBox="0 0 50 24">
        <rect x="0" y="0" width="50" height="24" fill="#171B36" opacity="0.12" />
        <rect x="8" y="4" width="34" height="16" rx="3" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="1.6" />
        <line x1="12" y1="9" x2="34" y2="9" stroke="#3A4FCF" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <rect x="26" y="13" width="12" height="5" rx="2.5" fill="#3A4FCF" />
      </svg>
    ),
  },
  {
    key: "banner", name: "バナー", path: "/components/communication/banner", built: true,
    oneLiner: "画面に残り続ける、作業を止めないお知らせ。",
    doText: "オフライン状態など、対応するまで気づかせ続けたい時",
    dontText: "一度きりの結果の知らせで十分な時(→スナックバー)",
    icon: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="3" fill="#FFF6E5" stroke="#B8860B" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="#8A6210" strokeWidth="1.6" />
        <line x1="22" y1="12" x2="58" y2="12" stroke="#8A6210" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
      </svg>
    ),
  },
  {
    key: "snackbar", name: "スナックバー", path: "/components/communication/snackbar", built: true,
    oneLiner: "操作の完了を知らせる。基本は自動で消えるが、元に戻すなど1つの操作を持つなら自動で消さないのが安全。",
    doText: "取り消せる操作の完了を知らせたい時(例: 削除した→元に戻す)",
    dontText: "操作を持たせる必要がない、ただの知らせで十分な時(→トースト)",
    icon: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#2E3457" />
        <line x1="10" y1="12" x2="42" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="50" y1="12" x2="62" y2="12" stroke="#9EB6FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "status", name: "ステータスメッセージ", path: "/components/communication/alert", built: true,
    oneLiner: "操作の結果や今の状態(成功・情報・注意・エラー)を、作業を止めずに伝えるメッセージ。",
    doText: "保存の完了・入力の誤り・検索結果の件数などを知らせたい時",
    dontText: "答えを得るまで先へ進ませたくない時(→モーダルダイアログ)",
    icon: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="3" fill="#EAF7EC" stroke="#2F7D3B" strokeWidth="1.2" />
        <path d="M8 12l3 3 5-6" fill="none" stroke="#2F7D3B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="22" y1="12" x2="58" y2="12" stroke="#2F7D3B" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },
  {
    key: "toast", name: "トースト", path: "/components/communication/toast", built: true,
    oneLiner: "操作ボタンを持たない、最も軽い一時的なメッセージ。",
    doText: "取り消しなどの操作を持たない、ごく軽いお知らせをしたい時",
    dontText: "元に戻すなどの操作を持たせたい時(→スナックバー)",
    icon: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#6B7290" />
        <line x1="18" y1="12" x2="52" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
  },
  {
    key: "tooltip", name: "ツールチップ", path: "/components/communication/tooltip", built: true,
    oneLiner: "ポインターを重ねたときやフォーカスしたときに出る、短い一言の補足説明。",
    doText: "アイコンの意味など、短い補足を添えたい時",
    dontText: "押せる操作を含めたい時(→ダイアログやシートなど)",
    icon: () => (
      <svg width="56" height="24" viewBox="0 0 56 24">
        <rect x="1" y="1" width="54" height="16" rx="4" fill="#3A4FCF" />
        <path d="M18 17l4 6 4-6z" fill="#3A4FCF" />
        <line x1="10" y1="9" x2="46" y2="9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
  },
];

/* 比較表: 部品 × 判断基準を○/△/✕で整理。値は各部品のページの内容をまとめた独自の整理
 * (新規の一次情報ではない)。PCでは横スクロールさせず、列の数を6つに絞って幅に収める(③本人レビューの指示) */
const COMPARISON_ROWS = [
  { key: "dialog", name: "モーダルダイアログ", block: "○", autoDismiss: "✕", actionButton: "○(答えのボタン)", error: "△(取り消せない操作の前など)", hint: "✕", place: "画面中央" },
  { key: "banner", name: "バナー", block: "✕", autoDismiss: "✕", actionButton: "△", error: "○", hint: "✕", place: "画面上部" },
  { key: "snackbar", name: "スナックバー", block: "✕", autoDismiss: "△(操作があれば消さない)", actionButton: "△(1つまで)", error: "✕", hint: "✕", place: "画面下部" },
  { key: "status", name: "ステータスメッセージ", block: "✕", autoDismiss: "△(エラーは直すまで残す)", actionButton: "△(次の行動への案内)", error: "○", hint: "✕", place: "操作した場所の近く" },
  { key: "toast", name: "トースト", block: "✕", autoDismiss: "○", actionButton: "✕", error: "✕", hint: "✕", place: "画面下部" },
  { key: "tooltip", name: "ツールチップ", block: "✕", autoDismiss: "△(ポインター・フォーカスが離れたら)", actionButton: "✕", error: "✕", hint: "○", place: "指しているコンポーネントの近く" },
];

const COMPARISON_COLUMNS = [
  { key: "block", label: "作業を\n止める" },
  { key: "autoDismiss", label: "自動で\n消える" },
  { key: "actionButton", label: "操作\nボタン" },
  { key: "error", label: "エラーを\n伝える" },
  { key: "hint", label: "補足・ヒント\nに特化" },
  { key: "place", label: "主な配置" },
];

const styles = {
  axisGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 12, marginBottom: 24 },
  axisBox: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", background: "#FFFFFF" },
  axisBoxTitle: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 10 },
  axisGroup: { marginBottom: 8 },
  axisGroupName: { fontSize: 11, fontWeight: 700, marginBottom: 4 },
  axisChips: { display: "flex", flexWrap: "wrap", gap: 5 },
  axisChip: { fontSize: 11, border: "1px solid", borderRadius: 12, padding: "1px 8px", background: "#FFFFFF" },
  axisDetails: { marginTop: 8 },
  axisDetailsSummary: { fontSize: 11, color: "#3A4FCF", cursor: "pointer" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 0", lineHeight: 1.6 },
  axisCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", marginBottom: 22 },
  axisRow: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 },
  axisRowLast: { marginBottom: 0 },
  axisLabel: { flexShrink: 0, width: 118, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 700, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3, textAlign: "center" },
  axisText: { fontSize: 11.5, lineHeight: 1.65, color: "#454C78", margin: "6px 0 0" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 24 },
  card: { display: "block", textDecoration: "none", background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 16px", color: "inherit" },
  cardIcon: { marginBottom: 10, height: 30, display: "flex", alignItems: "center" },
  cardName: { fontSize: 13.5, fontWeight: 700, color: "#171B36", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 },
  cardOneLiner: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A", marginBottom: 10 },
  usageRow: { display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 },
  usageMark: { flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, width: 30 },
  usageMarkOk: { color: "#2F7D6E" },
  usageMarkNg: { color: "#C0503F" },
  usageText: { fontSize: 11, lineHeight: 1.5, color: "#454C78" },
  matrixScroll: { overflowX: "auto", marginBottom: 22 },
  matrixGrid: { display: "grid", gridTemplateColumns: "128px repeat(6, minmax(0, 1fr))", border: "1px solid #E1E3F0" },
  headerCell: { padding: "8px 8px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#565D8A", whiteSpace: "pre-line", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1.4 },
  labelCell: { padding: "8px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", fontSize: 11.5, fontWeight: 700, color: "#171B36", display: "flex", alignItems: "center" },
  cell: { padding: "8px 6px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", fontSize: 12, color: "#2E3457", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" },
  cellText: { fontSize: 10.5, color: "#454C78", textAlign: "center" },
  markOk: { color: "#2F7D6E", fontWeight: 700 },
  markNg: { color: "#666D93", fontWeight: 700 },
  markMid: { color: "#A3821F", fontWeight: 700 },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  relatedBox: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 18px", marginBottom: 22 },
  relatedLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: "#565D8A", letterSpacing: 0.3, marginBottom: 8 },
  relatedText: { fontSize: 12, lineHeight: 1.75, color: "#454C78", margin: "0 0 12px" },
  relatedLinks: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 },
  relatedLink: { display: "flex", flexDirection: "column", gap: 3, textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px" },
  relatedLinkName: { fontSize: 12.5, fontWeight: 700, color: "#3A4FCF" },
  relatedLinkNote: { fontSize: 11, color: "#666D93", lineHeight: 1.5 },
};

const DETAIL_1 = <>モーダルダイアログは、答えを得るまで後ろの画面を操作させない。ほかの5つは、作業を止めずに知らせる。フルスクリーンダイアログ・ボトムシート・サイドシートなど、画面の上に重ねて内容や操作を出すコンポーネントの使い分けは<PageLink to="/components/containment/overview">オーバーレイの使い分け</PageLink>で比べている。下の比較表の「作業を止める」列に対応する。</>;
const DETAIL_2 = "「利用者の対応が必要か」は、表示がどれだけ続くか・どれだけ急ぎか(緊急度)とは別の軸だ。画面に残り続けるバナーでも、必ず対応が必要とは限らない。Nielsen Norman Groupの「アクション必須/受け身(パッシブ)」の分類は、この対応の必要性の軸として読む。スナックバーの操作(元に戻すなど)は任意で、押さなくても作業は続けられる。";
const DETAIL_3 = "トーストは時間で自動的に消える。スナックバーも基本は自動で消えるが、操作を持つなら自動で消さないのが安全。ツールチップは時間ではなく、ポインターやフォーカスが外れたときに消える(1.4.13)。バナーとモーダルダイアログは、閉じるか対応するまで残る。ステータスメッセージは内容で変わり、入力の誤りは直すまで問題の場所の近くに残す(NN group)。";
const DETAIL_4 = "モーダルダイアログ=中央、バナー=上部、スナックバー/トースト=下部、ステータスメッセージ=操作した場所や問題の場所の近く、ツールチップ=指しているコンポーネントの近く。";

/* 4つの判断軸(No.055で図にした)。各軸で6つの部品をグループに分けて示し、詳しい説明は開いて読む */
const AXES = [
  { label: "① 作業を止めるか", groups: [
    { name: "止める(モーダル)", color: "#C0503F", parts: ["モーダルダイアログ"] },
    { name: "止めない", color: "#2F7D6E", parts: ["バナー", "スナックバー", "ステータスメッセージ", "トースト", "ツールチップ"] },
  ], detail: DETAIL_1 },
  { label: "② 利用者の対応が要るか", groups: [
    { name: "答えを求める", color: "#C0503F", parts: ["モーダルダイアログ"] },
    { name: "対応するか閉じるまで残る", color: "#A3821F", parts: ["バナー"] },
    { name: "操作を1つ添えられる(任意)", color: "#3A4FCF", parts: ["スナックバー"] },
    { name: "見るだけ", color: "#2F7D6E", parts: ["ステータスメッセージ", "トースト", "ツールチップ"] },
  ], detail: DETAIL_2 },
  { label: "③ どう消えるか", groups: [
    { name: "閉じるか対応するまで残る", color: "#3A4FCF", parts: ["モーダルダイアログ", "バナー"] },
    { name: "時間で自動的に消える", color: "#666D93", parts: ["スナックバー(操作があれば消さない)", "トースト"] },
    { name: "内容で変わる", color: "#2F7D6E", parts: ["ステータスメッセージ(エラーは直すまで残す)"] },
    { name: "ポインター・フォーカスが離れたら消える", color: "#A3821F", parts: ["ツールチップ"] },
  ], detail: DETAIL_3 },
];

function PositionMap() {
  const W = 220, H = 150;
  const tag = (x, y, t, c) => (
    <g key={t}>
      <rect x={x} y={y} width={t.length * 9 + 10} height="16" rx="8" fill="#FFFFFF" stroke={c} />
      <text x={x + 5} y={y + 11.5} fontSize="9" fill={c} fontFamily="Jost, Noto Sans JP">{t}</text>
    </g>
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 360, display: "block", margin: "0 auto" }} role="img" aria-label="画面内の位置の図">
      <rect x="20" y="6" width="180" height="138" rx="10" fill="#F3F6FA" stroke="#C7CBE6" />
      <rect x="20" y="6" width="180" height="22" rx="10" fill="#E6EAF6" />
      {tag(26, 10, "バナー(上部)", "#3A4FCF")}
      <rect x="62" y="56" width="96" height="40" rx="6" fill="#FFFFFF" stroke="#C0503F" />
      <text x="110" y="74" fontSize="9" fill="#C0503F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">モーダルダイアログ</text>
      <text x="110" y="87" fontSize="8" fill="#666D93" textAnchor="middle" fontFamily="Jost, Noto Sans JP">(中央)</text>
      <rect x="20" y="118" width="180" height="26" rx="10" fill="#FFFFFF" stroke="#2F7D6E" />
      <text x="110" y="134" fontSize="8.5" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">下部: スナックバー・トースト</text>
      {tag(26, 34, "ツールチップ(コンポーネントの近く)", "#A3821F")}
      {tag(26, 100, "ステータスメッセージ", "#2F7D3B")}
    </svg>
  );
}

function AxisSummary() {
  return (
    <div style={styles.axisGrid}>
      {AXES.map((a) => (
        <div key={a.label} style={styles.axisBox}>
          <div style={styles.axisBoxTitle}>{a.label}</div>
          {a.groups.map((g) => (
            <div key={g.name} style={styles.axisGroup}>
              <div style={{ ...styles.axisGroupName, color: g.color }}>{g.name}</div>
              <div style={styles.axisChips}>
                {g.parts.map((p) => (<span key={p} style={{ ...styles.axisChip, borderColor: g.color, color: g.color }}>{p}</span>))}
              </div>
            </div>
          ))}
          <details style={styles.axisDetails} open={typeof window !== "undefined" && window.__DSP_STATIC__ ? true : undefined}>
            <summary style={styles.axisDetailsSummary}>くわしい説明</summary>
            <p style={styles.axisText}>{a.detail}</p>
          </details>
        </div>
      ))}
      <div style={styles.axisBox}>
        <div style={styles.axisBoxTitle}>④ 画面内の位置</div>
        <PositionMap />
        <details style={styles.axisDetails} open={typeof window !== "undefined" && window.__DSP_STATIC__ ? true : undefined}>
          <summary style={styles.axisDetailsSummary}>くわしい説明</summary>
          <p style={styles.axisText}>{DETAIL_4}</p>
        </details>
      </div>
    </div>
  );
}

function PartCards() {
  return (
    <div style={styles.cardGrid}>
      {CARDS.map((c) => (
        <a key={c.key} href={c.path} style={styles.card}>
          <div style={styles.cardIcon}>{c.icon()}</div>
          <div style={styles.cardName}>{c.name}</div>
          <div style={styles.cardOneLiner}>{c.oneLiner}</div>
          <div style={styles.usageRow}>
            <span style={{ ...styles.usageMark, ...styles.usageMarkOk }}>推奨</span>
            <span style={styles.usageText}>{c.doText}</span>
          </div>
          <div style={styles.usageRow}>
            <span style={{ ...styles.usageMark, ...styles.usageMarkNg }}>NG</span>
            <span style={styles.usageText}>{c.dontText}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

function MarkCell({ value }) {
  const style = value.startsWith("○") ? styles.markOk : value.startsWith("✕") ? styles.markNg : styles.markMid;
  return <div style={styles.cell}><span style={style}>{value}</span></div>;
}

function ComparisonTable() {
  return (
    <div style={styles.matrixScroll}>
      <div className="dsp-ovw-matrix" style={styles.matrixGrid}>
        <div style={styles.headerCell}>コンポーネント</div>
        {COMPARISON_COLUMNS.map((c) => (<div key={c.key} style={styles.headerCell}>{c.label}</div>))}
        {COMPARISON_ROWS.map((r) => (
          <React.Fragment key={r.key}>
            <div style={styles.labelCell}>{r.name}</div>
            {COMPARISON_COLUMNS.filter((c) => c.key !== "place").map((c) => (<MarkCell key={c.key} value={r[c.key]} />))}
            <div style={{ ...styles.cell, ...styles.cellText }}>{r.place}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const RELATED_PARTS = [
  { name: "オーバーレイの使い分け", path: "/components/containment/overview", note: "画面の上に重ねて内容や操作を出すコンポーネント(フルスクリーンダイアログ・ボトムシート・サイドシートなど)の比較" },
  { name: "アコーディオン", path: "/components/containment/accordion", note: "同じ場所で開閉して、詳しい内容を見せる" },
  { name: "プログレスインジケーター", path: "/components/communication/progress", note: "処理の進行状況(待ち時間)を示す" },
  { name: "バッジ", path: "/components/communication/badge", note: "件数・存在の有無を示す小さな装飾要素" },
  { name: "空状態", path: "/components/communication/empty-state", note: "データが「まだ無い」ことを示す" },
  { name: "ローディング状態", path: "/components/communication/loading", note: "データを「読み込み中」であることを示す" },
];

function RelatedPartsNote() {
  return (
    <div style={styles.relatedBox}>
      <div style={styles.relatedLabel}>関連するページ(この比較には含めていないコンポーネント)</div>
      <p style={styles.relatedText}>
        画面の上に重ねて内容や操作を出すコンポーネント(フルスクリーンダイアログ・ボトムシート・サイドシートなど)は「オーバーレイの使い分け」で、同じ場所で開閉して詳しい内容を見せるコンポーネントは「アコーディオン」で比べている。プログレスインジケーター・バッジ・空状態・ローディング状態は、何かが起きたことを知らせるのではなく<strong>「今どんな状態か」を示すこと自体が目的</strong>のため、この比較には含めていない。
      </p>
      <div style={styles.relatedLinks}>
        {RELATED_PARTS.map((it) => (
          <a key={it.path} href={it.path} style={styles.relatedLink}>
            <span style={styles.relatedLinkName}>{it.name} ↗</span>
            <span style={styles.relatedLinkNote}>{it.note}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const LEAD = "利用者に何かを知らせるコンポーネントを、4つの判断軸と比較表で選び分けるためのページ";
const ABOUT = [
  { k: "目的・役割", v: "作業を止めるか・対応が要るか・どう消えるか・どこに出すかで、知らせ方のコンポーネントを見分けられるようにする" },
  { k: "扱うコンポーネント", v: <><PageLink to="/components/containment/dialog">モーダルダイアログ</PageLink>、<PageLink to="/components/communication/banner">バナー</PageLink>、<PageLink to="/components/communication/snackbar">スナックバー</PageLink>、<PageLink to="/components/communication/alert">ステータスメッセージ</PageLink>、<PageLink to="/components/communication/toast">トースト</PageLink>、<PageLink to="/components/communication/tooltip">ツールチップ</PageLink></> },
  { k: "関連するページ", v: <>画面の上に重ねて内容や操作を出すコンポーネントは<PageLink to="/components/containment/overview">オーバーレイの使い分け</PageLink></> },
];

export default function CommunicationOverviewPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        .dsp-ovw-matrix { min-width: 600px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
          .dsp-ovw-matrix { min-width: 0; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/components/communication/overview" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / 情報伝達の使い分け</span>
            <span>SPEC No. 034</span>
          </div>

          <h1 style={styles.title}>情報伝達の使い分け</h1>
          <SummaryCard lead={LEAD} rows={ABOUT} />

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              6つの知らせ方は、<strong>①作業を止めるか ②利用者の対応が要るか ③どう消えるか ④画面のどこに出すか</strong>という4つの軸で整理できる(詳しくは下の「4つの判断軸」を参照)。<strong>作業を止めるのはモーダルダイアログだけ</strong>で、答えを得るまで先へ進ませたくない場面に限って使う。ほかの5つは作業を止めずに知らせる。
            </p>
            <p style={styles.synthesisText}>
              スナックバーとトーストの違いは<strong>取り消しなどの操作を持たせるか</strong>。バナーは<strong>自動で消えず、画面に残り続ける</strong>お知らせだ。ステータスメッセージは成功・情報・注意・エラーという<strong>状態の伝え方</strong>そのもので、バナーやスナックバーの形で出すこともある(AI解釈)。ツールチップは、知らせるというよりコンポーネントの意味を補う短い説明だ。
            </p>
            <p style={styles.synthesisText}>
              ただし、<strong>表示がどれだけ続くか・利用者の対応が必要か・どれだけ急ぎか(緊急度)は別々の軸</strong>で、残り続ける通知が必ず対応を求めるとは限らない(Nielsen Norman Groupの「アクション必須/受け身」の分類は、対応の必要性の軸)。フルスクリーンダイアログ・ボトムシート・サイドシートなど、画面の上に重ねて内容や操作を出すコンポーネントの使い分けは「オーバーレイの使い分け」ページで比べている。
            </p>
          </div>

          <h2 style={styles.diagramTitle}>4つの判断軸</h2>
          <AxisSummary />

          <h2 style={styles.diagramTitle}>6つのコンポーネント</h2>
          <PartCards />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>比較表(◯/△/✕)</h2>
          <ComparisonTable />
          <p style={styles.diagramNote}>◯=あてはまる、△=条件付き(場面による)、✕=あてはまらない。この表は各コンポーネントのページの内容をまとめた独自の整理だ。数値基準・アクセシビリティの詳細は、上のカードから各ページを参照。</p>

          <RelatedPartsNote />

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け", "通知・状態表示"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>このページは各コンポーネントのページ(モーダルダイアログ・バナー・スナックバー・ステータスメッセージ・トースト・ツールチップ)をまとめた見解だ。系列別の詳細・公式リンクは各コンポーネントのページを参照。</span>
          </div>
        </div>
      </div>
    </div>
  );
}
