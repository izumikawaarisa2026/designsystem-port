import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * 「情報伝達の使い分け」ページ。Communicationカテゴリの先頭に置く統合ガイド。
 * 「Selectionの選び方」ページと同種の位置づけで、Containment/Communication
 * 両カテゴリにまたがる9パーツ(サイドシート・ボトムシート・ダイアログ・
 * フルスクリーンダイアログ・スナックバー・トースト・ツールチップ・
 * アラート/バナー・アコーディオン)を、「ユーザーに何かアクションをさせる
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
 * (比較表の1列目と一致)に変更し、「アラート/バナー」ページのAI解釈で確認した
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
 * 「空状態・ローディング状態」の3ページは、いずれも「進行中のシステム状態を
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
 * シート・サイドシート・アラート/バナー・ツールチップ・スナックバー・トースト)は
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
 * 標準(非モーダル)版が公式に用意されており、アコーディオン・アラート/バナー・
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

const CARDS = [
  {
    key: "tooltip", name: "ツールチップ", path: "/components/communication/tooltip", built: true,
    oneLiner: "ホバー/フォーカスで一時的に出る、短い一言の補足説明。",
    doText: "アイコンの意味など、短い補足を添えたい時",
    dontText: "操作可能なアクションを含めたい時(→サイドシート等)",
    icon: () => (
      <svg width="56" height="24" viewBox="0 0 56 24">
        <rect x="1" y="1" width="54" height="16" rx="4" fill="#3A4FCF" />
        <path d="M18 17l4 6 4-6z" fill="#3A4FCF" />
        <line x1="10" y1="9" x2="46" y2="9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
  },
  {
    key: "alert", name: "アラート/バナー", path: "/components/communication/alert", built: true,
    oneLiner: "画面に留まり続ける、インラインの継続的な通知。",
    doText: "オフライン状態など、対応するまで気づかせ続けたい時",
    dontText: "一度きりの結果通知で十分な時(→スナックバー)",
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
    oneLiner: "操作完了を知らせる。基本は自動で消えるが、Undoなど1つの操作を持つなら自動で消さないのが安全。",
    doText: "取り消し可能な操作の完了を知らせたい時(例: 削除しました→元に戻す)",
    dontText: "取り消し操作を持たせる必要がない、ただの通知で十分な時(→トースト)",
    icon: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#2E3457" />
        <line x1="10" y1="12" x2="42" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        <line x1="50" y1="12" x2="62" y2="12" stroke="#9EB6FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "toast", name: "トースト", path: "/components/communication/toast", built: true,
    oneLiner: "操作ボタンを持たない、最も軽量な一時的メッセージ。",
    doText: "取り消し操作などを持たない、ごく軽いお知らせをしたい時",
    dontText: "Undoなどの操作を持たせたい時(→スナックバー)",
    icon: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#6B7290" />
        <line x1="18" y1="12" x2="52" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      </svg>
    ),
  },
  {
    key: "dialog", name: "ダイアログ", path: "/components/containment/dialog", built: true,
    oneLiner: "スクリム上の小さいモーダル。閲覧・確認ベースの情報に使う。",
    doText: "ヘルプなど補助情報の閲覧や、リスクの高い操作の確認・簡潔な選択を求めたい時",
    dontText: "情報量が多く、集中してタスクを完了させたい時(→フルスクリーンダイアログ)",
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
    key: "fullscreen-dialog", name: "フルスクリーンダイアログ", path: "/components/containment/fullscreen-dialog", built: true,
    oneLiner: "画面全体を占め、情報量の多いタスクに集中させる。",
    doText: "フォーム入力など情報量が多く、集中して完了させたいタスクがある時",
    dontText: "閲覧や簡潔な確認・選択だけで済む時(→ダイアログ)",
    icon: () => (
      <svg width="50" height="24" viewBox="0 0 50 24">
        <rect x="0" y="0" width="50" height="24" rx="3" fill="#FFFFFF" stroke="#3A4FCF" strokeWidth="1.6" />
        <circle cx="8" cy="6" r="2" fill="none" stroke="#3A4FCF" strokeWidth="1.4" />
        <line x1="16" y1="6" x2="38" y2="6" stroke="#3A4FCF" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <line x1="7" y1="13" x2="43" y2="13" stroke="#D5D9EC" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="7" y1="18" x2="30" y2="18" stroke="#D5D9EC" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "accordion", name: "アコーディオン", path: "/components/containment/accordion", built: true,
    oneLiner: "同じ場所で開閉し、情報を段階的に開示する。",
    doText: "画面遷移させずに、詳細情報を必要な人にだけ見せたい時",
    dontText: "常に見えている必要がある情報を隠したい時",
    icon: () => (
      <svg width="60" height="24" viewBox="0 0 60 24">
        <rect x="1" y="1" width="58" height="9" rx="2" fill="#3A4FCF" />
        <path d="M50 3.5l3 3 3-3" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="13" width="58" height="10" rx="2" fill="#EEF1FA" stroke="#D5D9EC" strokeWidth="1" />
      </svg>
    ),
  },
  {
    key: "bottom-sheet", name: "ボトムシート", path: "/components/containment/bottom-sheet", built: true,
    oneLiner: "画面下部からせり出す補助コンテンツ・操作用のメニュー。標準/モーダルの2種類。",
    doText: "モバイルで補助的な操作・メニューを見せたい時",
    dontText: "画面全体を使う複数ステップのタスクをさせたい時(→フルスクリーンダイアログ)",
    icon: () => (
      <svg width="46" height="30" viewBox="0 0 46 30">
        <rect x="1" y="1" width="44" height="28" rx="3" fill="#F0F4F8" stroke="#E1E3F0" strokeWidth="1" />
        <rect x="6" y="14" width="34" height="14" rx="5" fill="#3A4FCF" />
        <rect x="18" y="17" width="10" height="2.5" rx="1.25" fill="#FFFFFF" opacity="0.7" />
      </svg>
    ),
  },
  {
    key: "side-sheet", name: "サイドシート", path: "/components/containment/side-sheet", built: true,
    oneLiner: "画面側面に固定される補助コンテンツ・操作パネル。標準/モーダルの2種類。",
    doText: "メインコンテンツと並行して補助情報・フィルタ操作を見せたい時",
    dontText: "タスクを完結させる主目的の操作をさせたい時(→フルスクリーンダイアログ)",
    icon: () => (
      <svg width="46" height="30" viewBox="0 0 46 30">
        <rect x="1" y="1" width="44" height="28" rx="3" fill="#F0F4F8" stroke="#E1E3F0" strokeWidth="1" />
        <rect x="28" y="4" width="14" height="22" rx="4" fill="#3A4FCF" />
        <rect x="32" y="10" width="6" height="2.5" rx="1.25" fill="#FFFFFF" opacity="0.7" />
      </svg>
    ),
  },
];

/* 比較表: パーツ × 判断基準を○/△/✕で整理。値は各パーツのページのAI解釈・
 * SOURCESデータから統合した独自の整理(新規の一次情報ではない)。 */
const COMPARISON_ROWS = [
  { key: "tooltip", name: "ツールチップ", block: "✕", autoDismiss: "△(ポインターやフォーカスが外れたら消える。時間では消さない。1.4.13)", actionButton: "✕", error: "✕", hint: "○", parallel: "○", decision: "✕", fullReplace: "✕", place: "アンカー付近" },
  { key: "alert", name: "アラート/バナー", block: "✕", autoDismiss: "✕", actionButton: "△", error: "○", hint: "✕", parallel: "○", decision: "✕", fullReplace: "✕", place: "画面上部/インライン" },
  { key: "snackbar", name: "スナックバー", block: "✕", autoDismiss: "△(操作を持つなら自動で消さないのが安全)", actionButton: "△(1つまで)", error: "✕", hint: "✕", parallel: "○", decision: "✕", fullReplace: "✕", place: "画面下部" },
  { key: "toast", name: "トースト", block: "✕", autoDismiss: "○", actionButton: "✕", error: "✕", hint: "✕", parallel: "○", decision: "✕", fullReplace: "✕", place: "画面下部" },
  { key: "dialog", name: "ダイアログ", block: "○", autoDismiss: "✕", actionButton: "○(最大2)", error: "△(確認失敗時)", hint: "✕", parallel: "✕", decision: "○", fullReplace: "✕", place: "画面中央" },
  { key: "fullscreen-dialog", name: "フルスクリーンダイアログ", block: "○", autoDismiss: "✕", actionButton: "○", error: "△(インライン)", hint: "✕", parallel: "✕", decision: "○", fullReplace: "○", place: "画面全体" },
  { key: "accordion", name: "アコーディオン", block: "✕", autoDismiss: "✕", actionButton: "✕(開閉のみ)", error: "✕", hint: "✕", parallel: "○", decision: "✕", fullReplace: "✕", place: "インライン(展開)" },
  { key: "bottom-sheet", name: "ボトムシート", block: "△(モーダルが多い)", autoDismiss: "✕", actionButton: "○", error: "✕", hint: "✕", parallel: "○", decision: "△(操作メニューとして持つ場合あり)", fullReplace: "✕", place: "画面下部" },
  { key: "side-sheet", name: "サイドシート", block: "△(モーダルが多い)", autoDismiss: "✕", actionButton: "○", error: "✕", hint: "✕", parallel: "○", decision: "△(操作メニューとして持つ場合あり)", fullReplace: "✕", place: "画面側面" },
];

const COMPARISON_COLUMNS = [
  { key: "block", label: "背景操作を\n無効化" },
  { key: "autoDismiss", label: "自動で消える" },
  { key: "actionButton", label: "アクション\nボタン" },
  { key: "error", label: "エラー表示\nに使う" },
  { key: "hint", label: "補足/ヒント\nに特化" },
  { key: "parallel", label: "並行表示\n可能" },
  { key: "decision", label: "決定・確認を\n求める" },
  { key: "fullReplace", label: "画面全体を\n置き換える" },
  { key: "place", label: "主な配置" },
];

const styles = {
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
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
  axisText: { fontSize: 12, lineHeight: 1.6, color: "#454C78" },
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
  matrixGrid: { display: "grid", gridTemplateColumns: "170px repeat(9, minmax(96px, 1fr))", minWidth: 1140, border: "1px solid #E1E3F0" },
  headerCell: { padding: "8px 8px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#565D8A", whiteSpace: "pre-line", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1.4 },
  labelCell: { padding: "8px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", fontSize: 11.5, fontWeight: 700, color: "#171B36", display: "flex", alignItems: "center" },
  cell: { padding: "8px 6px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", fontSize: 12, color: "#2E3457", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" },
  cellText: { fontSize: 10.5, color: "#454C78", textAlign: "center" },
  markOk: { color: "#2F7D6E", fontWeight: 700 },
  markNg: { color: "#B7BCDA", fontWeight: 700 },
  markMid: { color: "#A3821F", fontWeight: 700 },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  relatedBox: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 18px", marginBottom: 22 },
  relatedLabel: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: "#565D8A", letterSpacing: 0.3, marginBottom: 8 },
  relatedText: { fontSize: 12, lineHeight: 1.75, color: "#454C78", margin: "0 0 12px" },
  relatedLinks: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 },
  relatedLink: { display: "flex", flexDirection: "column", gap: 3, textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px" },
  relatedLinkName: { fontSize: 12.5, fontWeight: 700, color: "#3A4FCF" },
  relatedLinkNote: { fontSize: 11, color: "#7E86AC", lineHeight: 1.5 },
};

function AxisSummary() {
  const rows = [
    { label: "①非モーダル版が存在しないか", text: "ダイアログ・フルスクリーンダイアログは、Apple・Googleの部品としては、背景操作を残したまま使う非モーダル版が存在せず、常にモーダルとしてのみ実装される(Webのdialog要素には非モーダルの表示もある)。ボトムシート/サイドシートは標準(非モーダル)版が公式に用意されており、必ずしもモーダルにはならない。アコーディオン・アラート/バナー・ツールチップ・スナックバー・トーストはそもそもモーダルという概念を持たない。これは「その部品に何を入れるか・どう使うか」で変わる行動の属性ではなく、各系列がその部品をどう定義しているかという構造的な事実であり、コンテンツの使われ方(決定を求めるか、背景をブロックするかなど)に左右されない。下の比較表の「背景操作を無効化」列に対応する。" },
    { label: "②通知か、コンテンツ・操作の提供か", text: "「単なる通知・フィードバックを伝えたいだけ」(アラート・スナックバー・トースト・ツールチップ)か、「補助的なコンテンツや操作(メニュー・アクション一覧・フィルタなど)そのものを画面内に用意したい」(アコーディオン・ボトムシート・サイドシート)かという軸。ボトムシート/サイドシートは受け身の「コンテンツ」提示だけでなく、複数の操作項目を持つメニューとして使われることも多いため、「コンテンツ」だけでなく「操作」も軸のラベルに明記している。この軸自体は二択だが、ボトムシート/サイドシートは実際には「決定・確認を求める操作」を持つ場合と持たない場合の両方があるため、その実情は下の比較表の「決定・確認を求める」列で△として表現している。" },
    { label: "③自動で消えるか", text: "トーストは時間で自動的に消える。スナックバーも基本は自動で消えるが、操作を持つなら自動で消さないのが安全。ツールチップは時間ではなく、ポインターやフォーカスが外れたときに消える(1.4.13)。アラート/バナーは画面に残り続ける。ただし「表示がどれだけ続くか(自動で消えるか)」「利用者の対応が必要か」「どれだけ急ぎか(緊急度)」は別々の軸で、画面に残り続ける通知でも、必ず対応が必要とは限らない。Nielsen Norman Groupの「アクション必須/受け身(パッシブ)」の分類は、対応の必要性の軸として読む。" },
    { label: "④画面内の位置", text: "サイドシート=側面、ボトムシート/スナックバー/トースト=下部、ダイアログ=中央、フルスクリーンダイアログ=全画面、ツールチップ=アンカー付近、アラート=上部/インライン、アコーディオン=インライン(展開)。" },
  ];
  return (
    <div style={styles.axisCard}>
      {rows.map((r, i) => (
        <div key={r.label} style={{ ...styles.axisRow, ...(i === rows.length - 1 ? styles.axisRowLast : {}) }}>
          <span style={styles.axisLabel}>{r.label}</span>
          <span style={styles.axisText}>{r.text}</span>
        </div>
      ))}
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
      <div style={styles.matrixGrid}>
        <div style={styles.headerCell}>パーツ</div>
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
  { name: "プログレスインジケーター", path: "/components/communication/progress", note: "処理の進行状況(待ち時間)を示す" },
  { name: "バッジ", path: "/components/communication/badge", note: "件数・存在の有無を示す小さな装飾要素" },
  { name: "空状態・ローディング状態", path: "/components/communication/empty-state", note: "データが「まだ無い/読み込み中」であることを示す" },
];

function RelatedPartsNote() {
  return (
    <div style={styles.relatedBox}>
      <div style={styles.relatedLabel}>関連するが本ページの比較対象外のパーツ</div>
      <p style={styles.relatedText}>
        プログレスインジケーター・バッジ・空状態/ローディング状態の3つは、「何かが起きたのでユーザーに伝える・対応させる」という本ページの9パーツとは異なり、<strong>「今どんな状態か」という進行中のシステム状態を示すこと自体が目的</strong>のため、この比較には含めていません。用途が近い場面もあるため、参考までにリンクを掲載します。
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

export default function CommunicationOverviewPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
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
          <p style={styles.subtitle}>サイドシート・ボトムシート・ダイアログ・フルスクリーンダイアログ・スナックバー・トースト・ツールチップ・アラート/バナー・アコーディオン。9つのパーツを、4つの判断軸と比較表(◯/△/✕)で使い分けます</p>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              9つのパーツは<strong>「①非モーダル版が存在しないか ②通知か、コンテンツ・操作の提供か ③自動で消えるか ④画面内のどこに出すか」</strong>という4つの軸で整理できます(詳しくは下の「判断軸」を参照)。<strong>①だけがダイアログ・フルスクリーンダイアログを残り7パーツから分ける、部品の定義そのものに基づく軸</strong>で、中身の使い方では変わりません。一方でボトムシート/サイドシート/アコーディオンは多目的な部品で、場面によって性質が変わるため、その実情は下の比較表の△として表現しています。
            </p>
            <p style={styles.synthesisText}>
              スナックバーとトーストの違いは<strong>取り消し等の操作を持たせるか</strong>。ダイアログとフルスクリーンダイアログの違いは<strong>閲覧・確認で完結するか、情報量が多く集中実行させたいか</strong>(最大2アクションを超えたらフルスクリーンへ)。アラート/バナーは<strong>自動で消えず、画面に残り続ける</strong>通知です。ただし、<strong>表示がどれだけ続くか・利用者の対応が必要か・どれだけ急ぎか(緊急度)は別々の軸</strong>で、残り続ける通知が必ず対応を求めるとは限りません(Nielsen Norman Groupの「アクション必須/受け身」の分類は、対応の必要性の軸です)。アコーディオンは通知ではなく、同じ場所で開閉する段階的開示の仕組みです。
            </p>
            <p style={styles.synthesisText}>
              <strong>ボトムシート/サイドシートは非モーダル版も公式に用意されていますが、実務ではモーダルとして使われる場面が多い点に注意してください。</strong>Appleのシートは既定でモーダルとして提示され、Googleのサイドシートもコンパクトな画面(モバイル)ではモーダル版が好まれるとされています。比較表の「モーダルが多い」という表記はこれを反映したものです。
            </p>
          </div>

          <h2 style={styles.diagramTitle}>4つの判断軸</h2>
          <AxisSummary />

          <h2 style={styles.diagramTitle}>9つのパーツ</h2>
          <PartCards />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>比較表(◯/△/✕)</h2>
          <ComparisonTable />
          <p style={styles.diagramNote}>◯=あてはまる、△=条件付き(バリエーションや場面による)、✕=あてはまらない。この表は各パーツのページのAI解釈・データを統合した独自の整理です。特にボトムシート/サイドシートは「補助コンテンツの提示」から「操作メニュー」「ダイアログに近い使い方」まで場面によって性質が変わる多目的な部品のため、複数の列で△が付いています。数値基準・アクセシビリティの詳細は、上のカードから各ページを開いて確認してください。</p>

          <RelatedPartsNote />

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け", "通知・状態表示"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09</span>
            <span>このページは既存ページ(サイドシート・ボトムシート・ダイアログ・フルスクリーンダイアログ・スナックバー・トースト・ツールチップ・アラート/バナー・アコーディオン)の統合見解であり、新規の一次情報の引用は行っていません。系列別の詳細・公式リンクは各パーツのページを参照してください。</span>
          </div>
        </div>
      </div>
    </div>
  );
}
