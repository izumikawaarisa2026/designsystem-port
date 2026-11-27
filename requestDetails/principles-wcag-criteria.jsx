import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, SummaryCard, PageLink, RelatedPages, pageLabel } from "./page-parts";

/**
 * 思想レイヤー「WCAGの達成基準(デザイン)」ページ(2026-11 ⑦本人レビューNo.001で追加)。
 * 各ページの比較やW3Cの欄に出てくる達成基準(2.5.8・1.4.11など)を、デザインで気をつけることに絞って1か所にまとめる。
 * 2026-11 ⑩: 各ページの参照リンクに付けていた「このサイトの解説」(このページの各基準 #sc-2-5-8 などへのリンク)は、本人の指示で外した。
 * 「関わるページ」は、各ページの参照リンク(達成基準)から集めた一覧。
 * 「なぜ必要か」(why)は、Understanding WCAG 2.2の Intent・Benefits をもとに、誰がどう困るかを1〜2文で言い換えたもの(2026-11-27 チャットでの指示で追加)。
 * 達成基準の名前はWAICのWCAG 2.2の訳。説明はUnderstanding WCAG 2.2をもとにした要約・言い換え。
 */

const GROUPS = [
  { id: "color", title: "色とコントラスト", desc: "色の使い方と、文字・コンポーネントの見分けやすさ", items: [
    { n: "1.4.1", name: "色の用途", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html", req: "色だけで情報を伝えない。", why: "色の見分けがつきにくい人や、白黒の画面・強い外光のもとで見る人には、色の違いが伝わらないため。", design: "エラー・必須・選択中・リンクなどは、色に加えてアイコン・文字・下線・形でも示す。色だけでリンクを区別するなら、周りの文字と3:1以上の明度差が要る。", exc: "色の違いに意味がない装飾は対象外。", pages: ["/components/actions/link", "/components/communication/alert", "/components/communication/badge", "/components/selection/checkbox", "/components/selection/chips", "/components/text-inputs/validation", "/tokens/color"] },
    { n: "1.4.3", name: "コントラスト(最低限)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", req: "文字と背景のコントラスト比を確保する。", why: "弱視の人や、年齢とともに見えにくくなった人、色を見分けにくい人でも文字を読めるようにするため。", design: "通常の文字は4.5:1以上、大きな文字(18pt以上、または14pt以上の太字。Webでおよそ24px/18.66px)は3:1以上。四捨五入しない(4.499:1は不合格)。ライト・ダークの両方で確かめる。", exc: "無効なコンポーネント、純粋な装飾、見えない文字、ロゴの文字。", pages: ["/components/communication/badge", "/tokens/color", "/tokens/dark-mode"] },
    { n: "1.4.11", name: "非テキストのコントラスト", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html", req: "コンポーネントの境界・状態の見た目と、意味のある図にコントラストを確保する。", why: "コンポーネントの境界や状態が見分けられないと、弱視の人などは、どこを押せるか・今どの状態かが分からないため。", design: "ボタンや入力欄の枠、チェックの印、フォーカスの表示、選択状態を示す印、アイコンなどは、隣り合う色と3:1以上。文字やアイコンでコンポーネントだと分かるなら、枠そのものは必須ではない。状態どうしの差を3:1にする必要はない。", exc: "無効なコンポーネント、ブラウザ標準の見た目を変えていないコンポーネント、ロゴ・写真など見た目そのものが情報のもの。", pages: ["/components/actions/button", "/components/communication/alert", "/components/communication/badge", "/components/navigation/app-bar", "/components/navigation/nav-bar", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/chips", "/components/selection/radio", "/components/selection/toggle", "/tokens/color", "/tokens/elevation", "/tokens/icon", "/tokens/interaction-states", "/tokens/shape"] },
    { n: "1.4.8", name: "視覚的提示", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html", req: "文章の見せ方を利用者が調整できる。", why: "読字障害・弱視・認知の障害がある人は、行が長い・行間が狭い・色の組み合わせが合わないと、文章を追いにくいため。", design: "前景色と背景色を選べる、1行は80文字(日本語40文字)以内にできる、両端揃えにしない、行間1.5倍以上・段落間はそれ以上、200%に拡大しても横スクロールせずに読める。", exc: "AAAのため、多くのサイトの目標(AA)には含まれない。", pages: ["/tokens/dark-mode", "/tokens/typography"] },
  ] },
  { id: "text", title: "文字とレイアウト", desc: "拡大・狭い幅・向きの変化で崩れないこと", items: [
    { n: "1.4.4", name: "テキストのサイズ変更", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html", req: "文字を200%まで拡大しても内容と機能が失われない。", why: "弱視の人など、文字を大きくして読む人が、内容や機能を失わずに使えるようにするため。", design: "固定の高さに文字を押し込めない。拡大で文字が切れたり重なったりしないかを確かめる。ページ全体のズームで満たしてもよい。", exc: "字幕と文字画像。", pages: ["/components/text-inputs/text-field", "/tokens/typography"] },
    { n: "1.4.10", name: "リフロー", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html", req: "幅320 CSS px相当でも、縦横2方向のスクロールなしで読める。", why: "拡大して読む人は、1行ごとに横へスクロールすると、どこを読んでいたかを見失いやすいため。", design: "幅1280pxを400%に拡大した状態に当たる。狭い幅では1列に組み替える(横に並んだものは縦に積む)。", exc: "データ表・地図・図・動画・ゲームなど、2次元の配置が欠かせない部分。", pages: ["/components/text-inputs/text-field", "/tokens/adaptive", "/tokens/layout-spacing"] },
    { n: "1.4.12", name: "テキストの間隔", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html", req: "利用者が文字の間隔を広げても崩れない。", why: "読字障害や弱視の人などは、文字の間隔を広げると読みやすくなる。その設定で表示が崩れると、かえって読めなくなるため。", design: "行の高さ1.5倍・段落の後2倍・字間0.12倍・単語間隔0.16倍に広げても、文字が切れたり重なったりしない。この値をデザインの初期値にする必要はない。", exc: "その言語でもともと使わない間隔(単語の間にスペースがない言語の単語間隔など)。", pages: ["/tokens/typography"] },
    { n: "1.3.4", name: "向き(orientation)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/orientation.html", req: "画面の向きを縦・横の一方に固定しない。", why: "端末を車いすなどに固定して使う人は、画面を回転させられないため。", design: "縦向き・横向きのどちらでも使えるようにする。", exc: "小切手・ピアノのアプリ・VRなど、特定の向きが欠かせないもの。", pages: ["/tokens/adaptive"] },
    { n: "1.3.1", name: "情報及び関係性", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html", req: "見た目で伝えている構造や関係を、構造としても伝える。", why: "読み上げで使う人には、見出しの大きさや余白によるまとまりといった、見た目の手がかりが伝わらないため。", design: "見出し・リスト・表の見出しとデータの関係・余白でまとめたグループなどを、見た目だけでなく構造でも示す。余白だけのまとまりは読み上げでは伝わらない。", exc: "", pages: ["/components/containment/list", "/components/containment/table", "/components/text-inputs/text-field", "/tokens/layout-spacing"] },
  ] },
  { id: "target", title: "押せる範囲と入力の方法", desc: "指・ポインター・キーボードなど、入力の手段ごとの決まり", items: [
    { n: "2.5.8", name: "ターゲットのサイズ(最低限)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html", req: "押す対象を24×24 CSS px以上にする(例外あり)。", why: "手の震えがある人や指の動きが不自由な人は、小さい対象を正確に押せず、隣の対象を押し間違えやすいため。", design: "小さい場合は、各対象の中心に直径24pxの円を置いて、ほかの対象やその円と重ならない間隔があれば適合する。角丸が大きく内側に24px四方が収まらない対象は「小さい対象」として扱う。", exc: "5つ: ①間隔(上の円の条件)、②同じ機能の十分な大きさの代わりがある、③文中のリンクなど文章の行の中にある、④ブラウザが大きさを決めていて変えていない、⑤その大きさや配置が欠かせない(地図のピンなど)。", pages: ["/components/actions/button", "/components/actions/fab", "/components/navigation/nav-bar", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/radio", "/components/selection/select", "/components/selection/slider", "/components/selection/toggle", "/tokens/layout-spacing", "/tokens/shape"] },
    { n: "2.5.5", name: "ターゲットのサイズ(高度)", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html", req: "押す対象を44×44 CSS px以上にする。", why: "手の震えや指の動きに不自由がある人に加えて、移動中や片手での操作など、誰でも押し間違えやすい場面でも確実に押せるようにするため。", design: "Appleの44pt、Googleの48dpに近い、より高い水準。主要なボタンの目安にしやすい。", exc: "②〜⑤と同じ種類の例外がある(2.5.8の間隔の例外はない)。", pages: ["/components/actions/button", "/components/navigation/nav-bar", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/radio"] },
    { n: "2.5.1", name: "ポインタジェスチャ", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html", req: "2本指以上や軌跡で決まる操作に、1本指で軌跡のない代わりを用意する。", why: "複数の指を同時に使う操作や、決まった軌跡を描く操作は、指の動きが不自由な人や、口にくわえる棒・頭の動きで操作する道具を使う人には難しいため。", design: "ピンチでの拡大には+/−のボタン、スワイプでの送りには前へ・次へのボタンなど。", exc: "軌跡そのものが欠かせない操作(手書きの署名など)。", pages: ["/tokens/input-methods"] },
    { n: "2.5.2", name: "ポインタキャンセル", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html", req: "押した瞬間ではなく、離したときに実行する。", why: "押した瞬間に実行すると、手の震えなどで誤って触れたときに、取り消す機会がないため。", design: "誤って触れても、指をボタンの外へずらして離せば取り消せるようにする。", exc: "キーボードやピアノの鍵盤をまねるなど、押した瞬間の実行が欠かせないもの。", pages: ["/tokens/input-methods"] },
    { n: "2.5.4", name: "動きによる起動", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html", req: "端末を振る・傾けるなどの動きで行う機能に、画面上の代わりと、動きを切る手段を用意する。", why: "端末を振る・傾ける操作は、体の動きが不自由な人や端末を固定している人にはできないため。意図しない動きで誤って実行されることも防ぐ。", design: "「振って元に戻す」には取り消しボタンも置き、動きへの反応を無効にできるようにする。", exc: "OSのアクセシビリティ機能など、支援の仕組みで動きを使う場合。", pages: ["/tokens/input-methods"] },
    { n: "2.5.7", name: "ドラッグ動作", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html", req: "ドラッグで行う機能に、ドラッグしない1本指の代わりを用意する。", why: "ドラッグは押したまま正確に動かし続ける操作で、手の動きが不自由な人や、頭の動き・視線で操作する道具を使う人には難しいため。", design: "スライダーは溝を押した位置へつまみを移す、並べ替えはメニューから選べる、シートの高さはグラバーを押して切り替える、など。", exc: "ドラッグが欠かせない場合、ブラウザが決めていて変えていないドラッグ。", pages: ["/components/containment/bottom-sheet", "/components/selection/slider", "/tokens/input-methods"] },
    { n: "2.5.6", name: "入力メカニズムの共存", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms.html", req: "使える入力手段(タッチ・マウス・キーボードなど)をコンテンツ側で制限しない。", why: "使いやすい入力手段は人によって違い、同じ人でも場面で切り替えるため(タブレットにキーボードをつなぐ、など)。", design: "タッチの端末でもマウスやキーボードを使えるようにする。", exc: "セキュリティや必要不可欠な場合。", pages: ["/tokens/input-methods"] },
    { n: "2.1.1", name: "キーボード", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html", req: "すべての機能をキーボードで操作できる。", why: "画面を見ずに使う人や、手の動きが不自由でマウスを使えない人は、キーボードか、キーボードの代わりになる装置(スイッチ・音声入力など)で操作するため。", design: "ポインター前提になりやすいスライダー・ドラッグ・メニューなども、キーボードで操作できるようにする。", exc: "手書きなど、軌跡そのものが欠かせない入力。", pages: ["/components/navigation/tabs", "/components/selection/chips", "/components/selection/select", "/components/selection/slider", "/tokens/input-methods"] },
    { n: "2.1.2", name: "キーボードトラップなし", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html", req: "キーボードのフォーカスが抜け出せなくならない。", why: "キーボードだけで使う人は、フォーカスが抜け出せなくなると、そこから先のページを使えなくなるため。", design: "ダイアログなどでフォーカスを閉じ込める場合も、Escキーなどで閉じて外に戻れるようにする。", exc: "", pages: ["/tokens/input-methods"] },
  ] },
  { id: "focus", title: "フォーカスとホバー", desc: "今どこを操作しているかが分かり、勝手に動かないこと", items: [
    { n: "2.4.3", name: "フォーカス順序", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html", req: "フォーカスの順番が、意味と操作の流れに沿っている。", why: "キーボードや読み上げで使う人は、フォーカスの順番どおりに内容をたどる。順番が飛ぶと、意味や操作の流れがつかめないため。", design: "見た目の並びと読む順番をそろえる。ダイアログを閉じたら、開いたボタンにフォーカスを戻す。", exc: "", pages: ["/tokens/input-methods"] },
    { n: "2.4.7", name: "フォーカスの可視化", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html", req: "キーボードで操作するとき、フォーカスの位置が見える。", why: "キーボードで操作する人は、フォーカスの位置が見えないと、今どこを操作しているのか分からないため。", design: "フォーカスの表示を消さない。色の変化だけに頼らず、輪郭線などで示すと分かりやすい。", exc: "", pages: ["/components/actions/button", "/tokens/interaction-states"] },
    { n: "2.4.13", name: "フォーカスの外観", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html", req: "フォーカスの表示を十分な大きさとコントラストにする。", why: "細い・薄いフォーカスの表示は、弱視の人や画面から離れて見る人には見つけにくいため。", design: "コンポーネントの周りを2 CSS pxの太さで囲んだ面積以上で、フォーカスの前後の同じピクセルどうしで3:1以上の変化をつける。", exc: "ブラウザが決めていて作者が調整できないフォーカス表示。", pages: ["/tokens/interaction-states"] },
    { n: "2.4.11", name: "隠されないフォーカス(最低限)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html", req: "フォーカスしたコンポーネントが、固定ヘッダーやバナーなど作者が作った重なりで完全に隠れない。", why: "フォーカスした先が隠れると、キーボードで操作する人は、今どこにいるのかが分からなくなるため。", design: "上部の固定ヘッダーや下部のCookieバナーの下にフォーカスが入り込まないよう、スクロールの位置を調整する。", exc: "利用者が自分で開いた内容で、フォーカスを移さずに閉じられるもの。", pages: ["/tokens/elevation"] },
    { n: "2.4.12", name: "隠されないフォーカス(高度)", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html", req: "フォーカスしたコンポーネントが、一部も隠れない。", why: "一部でも隠れると、フォーカスしたコンポーネントが何かを見分けにくくなる場合があるため。", design: "固定ヘッダーやバナーに少しでもかかるなら、スクロールの位置を調整するか、重なりそのものをなくす。", exc: "", pages: ["/tokens/elevation"] },
    { n: "3.2.1", name: "フォーカス時", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html", req: "フォーカスが当たっただけで、文脈を変えない。", why: "フォーカスを当てるたびに画面が変わると、キーボードや読み上げで使う人は、何が起きたのか分からずに迷うため。", design: "フォーカスしただけで別のページへ遷移する・新しいウィンドウを開く・送信する、といったことを起こさない。", exc: "", pages: ["/components/navigation/tabs", "/components/selection/select"] },
    { n: "1.4.13", name: "ホバー又はフォーカスで表示されるコンテンツ", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html", req: "ホバーやフォーカスで出る内容(ツールチップなど)の3つの条件を満たす。", why: "ツールチップなどが周りの内容を隠したり、すぐ消えたりすると、拡大して見る人や読むのに時間がかかる人が、内容を読み取れないため。", design: "①ポインターを動かさずに消せる(Escキーなど)、②内容の上にポインターを移しても消えない、③離れるか消すまで勝手に消えない。", exc: "入力の誤りの表示など、内容がほかの情報を隠さないもの。ブラウザが出すツールチップ。", pages: ["/components/communication/tooltip"] },
  ] },
  { id: "motion", title: "動きと時間", desc: "動きで人を傷つけない、時間で追い立てない", items: [
    { n: "2.2.1", name: "期限調節可能", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html", req: "時間制限を延長・解除できるようにする。", why: "読む・操作するのに時間がかかる人(視覚・運動・認知の障害がある人など)は、制限時間の中で終えられないことがあるため。", design: "「元に戻す」などの操作を持つ通知を時間で消すと、操作が間に合わない人がいる。時間で消さないか、延長・解除できるようにする。", exc: "リアルタイムの競りなど、時間制限が欠かせないもの。20時間を超える制限。", pages: ["/components/communication/snackbar", "/components/text-inputs/wizard"] },
    { n: "2.2.2", name: "一時停止・停止・非表示", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html", req: "自動で始まり5秒を超えて続く動き・点滅・スクロールを止められる。", why: "動く・変わる内容は注意をそらし、集中しにくい人が読むのを妨げる。読むのに時間がかかる人は、動いている間に読み終えられないため。", design: "自動で回るカルーセルには停止ボタンを置く。自動で更新される情報も止めたり隠したりできるようにする。", exc: "動きが欠かせない場合。", pages: ["/components/containment/carousel", "/tokens/motion"] },
    { n: "2.3.1", name: "3回の閃光、又は閾値以下", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html", req: "1秒間に3回を超えて点滅させない。", why: "光の点滅は、光過敏性てんかんの人に発作を起こすことがあるため。", design: "注意を引くための点滅は避け、色の変化やアイコンなど点滅しない方法で示す。", exc: "点滅の明るさや面積が閾値以下の場合。", pages: ["/tokens/motion"] },
    { n: "2.3.3", name: "インタラクションによるアニメーション", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html", req: "操作をきっかけに起きる動きを、無効にできる。", why: "前庭障害がある人などは、画面の大きな動きで、めまいや吐き気を起こすことがあるため。", design: "視差スクロールなど装飾の動きは、OS・ブラウザの「動きを減らす」設定に従って止める。", exc: "機能や情報に欠かせない動き。", pages: ["/tokens/motion"] },
  ] },
  { id: "sound", title: "音と映像", desc: "音を止められ、音だけで伝えない", items: [
    { n: "1.4.2", name: "音声の制御", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html", req: "自動で3秒を超えて鳴る音を、止めるか個別に音量を調整できる。", why: "ページの音が鳴っていると、読み上げで使う人は、読み上げの声が聞き取れなくなるため。", design: "自動再生の音は避け、鳴らすなら停止の手段をすぐ見つかる場所に置く。", exc: "3秒以内に終わる音。", pages: ["/tokens/sound"] },
    { n: "1.4.7", name: "背景音の小さい又はない音声", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html", req: "録音した音声が中心の内容で、背景音をなくす・切れる・20dB以上小さくする。", why: "聞こえにくい人は、背景音があると話し声を聞き分けにくいため。", design: "ナレーションに背景音楽を重ねるなら十分に小さくする。", exc: "音声CAPTCHA・音声ロゴ・歌など。", pages: ["/tokens/sound"] },
    { n: "1.2.1", name: "音声だけ及び映像だけ(収録済み)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html", req: "録音した音声だけ・映像だけの内容に、代わりを用意する。", why: "聞こえない人は音声の内容を、見えない人は映像の内容を受け取れないため。", design: "音声だけなら書き起こし、映像だけなら書き起こしか音声の説明を用意する。", exc: "代わりのメディアであることが明らかなもの。", pages: ["/tokens/sound"] },
    { n: "1.2.2", name: "キャプション(収録済)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html", req: "録音した映像の音声に字幕を付ける。", why: "聞こえない・聞こえにくい人が、会話や重要な音の内容を受け取れるようにするため。", design: "会話や重要な音を字幕で伝える。", exc: "", pages: ["/tokens/sound"] },
  ] },
  { id: "words", title: "文言・ラベル・ナビゲーション", desc: "何のためのコンポーネントか、今どこにいるかを言葉で伝える", items: [
    { n: "1.1.1", name: "非テキストコンテンツ", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html", req: "意味のある画像やアイコンに、文字の代わりを用意する。", why: "読み上げで使う人には、画像やアイコンの意味がそのままでは伝わらないため。文字にしておけば、読み上げ・点字・拡大などの形に変えられる。", design: "操作のアイコンには、見た目ではなく目的の名前を付ける(「虫めがね」ではなく「検索」)。飾りの画像は読み上げない。", exc: "装飾だけの画像。", pages: ["/tokens/icon"] },
    { n: "1.3.3", name: "感覚による特性", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html", req: "操作の説明を、形・大きさ・位置・音だけに頼らない。", why: "見えない人や位置関係をつかみにくい人は、形・大きさ・位置だけの説明では、どれを指すのか特定できないため。", design: "「右の丸いボタン」ではなく「[送信]ボタン」のように、コンポーネントの名前も書く。", exc: "", pages: ["/tokens/writing"] },
    { n: "2.4.2", name: "ページタイトル", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html", req: "ページに、主題や目的を表すタイトルを付ける。", why: "タイトルは読み上げで最初に読まれ、タブや履歴にも出る。中身を読む前に、どのページかを判断できるようにするため。", design: "画面ごとに内容を表すタイトルにする。1つのURLで画面が切り替わる場合も、画面ごとにタイトルを変える。", exc: "", pages: ["/tokens/writing"] },
    { n: "2.4.4", name: "リンクの目的(コンテキスト内)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html", req: "リンクの目的が、リンクの文言か周りの文脈から分かる。", why: "読み上げで使う人は、リンクだけを一覧にして選ぶことがある。「こちら」だけでは、行き先が分からないため。", design: "「こちら」「詳しくはここ」だけのリンクにしない。", exc: "誰にとっても目的が分からないリンク。", pages: ["/components/actions/link", "/components/navigation/pagination"] },
    { n: "2.4.9", name: "リンクの目的(リンクのみ)", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html", req: "リンクの目的が、リンクの文言だけで分かる。", why: "周りの文を読まなくても、リンクの文言だけで行き先が分かれば、誰にとっても選びやすくなるため。", design: "周りの文を読まなくても行き先が分かる文言にする(「詳しく」ではなく「料金プランの詳細」)。", exc: "誰にとっても目的が分からないリンク。", pages: ["/components/actions/link"] },
    { n: "2.4.5", name: "複数の手段", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html", req: "ページにたどり着く方法を2つ以上用意する。", why: "得意な探し方は人によって違うため(検索の方が使いやすい人も、階層をたどる方が分かりやすい人もいる)。", design: "ナビゲーションに加えて、サイト内検索やサイトマップを置く。", exc: "手続きの途中や結果の画面。", pages: ["/components/text-inputs/search-field"] },
    { n: "2.4.6", name: "見出し及びラベル", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html", req: "見出しとラベルが、主題や目的を表す。", why: "内容が分かる見出し・ラベルがあれば、読むのに時間がかかる人や読み上げで使う人も、目的の場所を早く見つけられるため。", design: "見出しやラベルを置くこと自体は求めない。置いたなら、内容が分かる言葉にする(1語でもよい)。", exc: "", pages: ["/tokens/writing"] },
    { n: "2.4.8", name: "現在位置", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/location.html", req: "一連のページの中の今の位置が分かる。", why: "長い手続きや大きいサイトでは、今どこにいるのかを見失いやすいため(特に、記憶や注意に障害がある人)。", design: "パンくずリストやステップの表示などで示す。置けば自動で適合するわけではない。", exc: "", pages: ["/components/navigation/breadcrumb"] },
    { n: "2.5.3", name: "ラベルを含む名前", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html", req: "見えるラベルの言葉を、支援技術向けの名前にも含める。", why: "音声入力で使う人は、見えるラベルの言葉を言って操作する。その言葉が名前に含まれていないと反応しないため。", design: "見えるラベルの言葉をそのまま、できれば名前の先頭に入れる(「送信」と書いたボタンの名前を「フォームを送る」にしない)。", exc: "", pages: ["/tokens/icon"] },
    { n: "3.1.5", name: "読解レベル", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html", req: "難しい文には、補足か易しい版を用意する。", why: "読解に障害がある人や、その言語に慣れていない人でも、内容を理解できるようにするため。", design: "前期中等教育(9年の学校教育)を超える読解力が要る文が対象。", exc: "固有名詞や題名。", pages: ["/tokens/writing"] },
    { n: "3.2.3", name: "一貫したナビゲーション", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html", req: "複数のページで繰り返すナビゲーションを、いつも同じ順番で並べる。", why: "並びが同じなら、場所を覚えて使える。ページごとに変わると、拡大して見る人・読み上げで使う人・認知に障害がある人は、探し直しになるため。", design: "ヘッダーやサイドナビの項目の順番をページごとに変えない。", exc: "利用者が自分で並びを変えた場合。", pages: ["/components/containment/drawer", "/components/navigation/app-bar", "/components/navigation/nav-bar"] },
    { n: "3.2.4", name: "一貫した識別性", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html", req: "同じ働きのコンポーネントを、ページをまたいで一貫して識別できる。", why: "同じ働きのものが同じ名前なら、一度覚えれば使い回せる。ページごとに違うと、別の機能だと思われやすいため。", design: "共通の検索・アカウントなどのアイコンボタンには、どのページでも同じ名前を付ける。", exc: "文脈に合わせた小さな違い(「前のページ」など)。", pages: ["/components/actions/link", "/tokens/icon"] },
    { n: "3.2.6", name: "一貫したヘルプ", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html", req: "問い合わせ先・FAQなどのヘルプを、ページをまたいで同じ位置に置く。", why: "困ったときに、助けを探す手間を減らすため。特に認知に障害がある人は、場所が変わるとヘルプを見つけにくい。", design: "ヘルプを置くこと自体は求めない。置くなら同じ順番の位置にする。", exc: "利用者が自分で変えた場合。", pages: ["/components/navigation/app-bar"] },
  ] },
  { id: "input", title: "入力とエラー", desc: "入力しやすく、誤りに気づいて直せること", items: [
    { n: "1.3.5", name: "入力目的の特定", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html", req: "入力欄の目的(名前・メールアドレスなど)を判別できるようにする。", why: "入力欄の目的が機械に分かれば、自動入力などで入力を助けられる。記憶や文字の入力に負担がある人の手間が減るため。", design: "ブラウザの自動入力が効くようにし、入力の手間を減らす。", exc: "", pages: ["/components/text-inputs/text-field"] },
    { n: "3.2.2", name: "入力時", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html", req: "設定を変えただけで、事前の説明なしに文脈を変えない。", why: "予期しない遷移や送信は、見えない人や認知に障害がある人を混乱させ、意図しない操作につながるため。", design: "プルダウンで選んだだけで遷移・送信しない。実行は「移動」「送信」ボタンで行う。スイッチの切り替えで画面を変えるなら事前に知らせる。", exc: "事前に知らせている場合。", pages: ["/components/selection/select", "/components/selection/toggle"] },
    { n: "3.3.1", name: "エラーの特定", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html", req: "入力の誤りを自動で見つけたら、その項目を特定し、文字で説明する。", why: "色や枠の変化だけでは、見えない人や色を見分けにくい人に誤りが伝わらないため。どこがどう誤っているかが分からないと直せない。", design: "色や枠の変化だけでなく、どの欄がどう誤っているかを文字で示す。", exc: "", pages: ["/components/communication/alert", "/components/text-inputs/validation"] },
    { n: "3.3.2", name: "ラベル又は指示", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html", req: "入力が必要なところに、ラベルか説明を用意する。", why: "何を入力すればよいかが分からないと、誤りや入力のやり直しが増えるため(特に認知に障害がある人)。", design: "プレースホルダーだけをラベルにしない。書式や必須かどうかも示す。説明を増やしすぎない。", exc: "", pages: ["/components/text-inputs/text-field", "/components/text-inputs/wizard", "/tokens/writing"] },
    { n: "3.3.3", name: "エラーの修正提案", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html", req: "誤りの直し方が分かっていれば、訂正案を示す。", why: "直し方が分からないと、先へ進めなくなる人がいるため(特に学習・認知に障害がある人)。", design: "「8文字以上で入力してください」のように具体的に書く。", exc: "セキュリティや目的を損なう場合(パスワードなど)。", pages: ["/components/text-inputs/validation"] },
    { n: "3.3.4", name: "誤り防止(法的・金融・データ)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html", req: "法的・金融的な確約、データの変更・削除、試験の送信で、誤りを防ぐ手段を用意する。", why: "法律やお金に関わる手続き、データの削除は、誤ると取り返しがつかないことがあるため。入力の誤りに気づきにくい人もいる。", design: "取り消せる・検査して直す機会を与える・送信前に確認できる、のどれかを備える。", exc: "対象のページだけにかかる。", pages: ["/components/text-inputs/validation"] },
    { n: "3.3.7", name: "冗長な入力", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html", req: "同じ手続きの中で、前に入力した情報をもう一度入力させない。", why: "同じ情報の入力を繰り返すのは、記憶や入力に負担がある人には大きな手間で、誤りも増えるため。", design: "自動で入れておくか選べるようにする(「配送先と同じ」のチェックなど)。エラーで戻しても入力を消さない。", exc: "セキュリティ上の再入力、入れ直すこと自体が目的の場合、前の情報が無効になった場合。", pages: ["/components/text-inputs/input-validation", "/components/text-inputs/wizard"] },
  ] },
  { id: "assist", title: "支援技術への伝え方", desc: "見た目と同じことを、読み上げなどにも伝える", items: [
    { n: "4.1.2", name: "名前(name)・役割(role)・値(value)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html", req: "コンポーネントの名前・役割・状態を、支援技術が取得できるようにする。", why: "支援技術は、コンポーネントの名前・役割・状態を受け取って利用者に伝える。伝わらないと、それが何か・押せるか・今どの状態かが分からないため。", design: "ボタンが押されているか、メニューが開いているか、選択中かなどの状態も伝える。ブラウザ標準のコンポーネントなら多くは自動で伝わり、独自に作ったコンポーネントは配慮が要る。", exc: "", pages: ["/components/actions/button", "/components/communication/badge", "/components/containment/side-sheet", "/components/navigation/segmented-control", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/chips", "/components/selection/radio", "/components/selection/select", "/components/selection/slider", "/components/selection/toggle", "/components/text-inputs/text-field", "/tokens/icon", "/tokens/interaction-states"] },
    { n: "4.1.3", name: "ステータスメッセージ", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html", req: "フォーカスを移さずに出る知らせを、支援技術にも伝える。", why: "見えている人は画面の変化で知らせに気づけるが、読み上げで使う人は、知らせが読み上げられないと気づけないため。", design: "「保存しました」「5件見つかりました」などは、控えめな知らせとして読み上げられるようにする。緊急の警告は割り込んで読み上げる。", exc: "", pages: ["/components/communication/alert", "/components/communication/empty-state", "/components/communication/progress", "/components/communication/snackbar"] },
  ] },
];

/* 同じ観点でレベルだけが違う基準は、1枚のカードにまとめる(2026-11-27 チャットでの指示)。並びは低いレベルから。 */
const FAMILIES = [
  { title: "ターゲットのサイズ", ns: ["2.5.8", "2.5.5"] },
  { title: "フォーカスの見え方", ns: ["2.4.7", "2.4.13"] },
  { title: "隠されないフォーカス", ns: ["2.4.11", "2.4.12"] },
  { title: "リンクの目的", ns: ["2.4.4", "2.4.9"] },
];
const LEVELS = ["A", "AA", "AAA"];
/* レベルが上がるほど濃くする。文字はどの段階も4.5:1以上 */
const LEVEL_TONE = {
  A: { bg: "#FBF3DC", fg: "#7A5F12", bd: "#E2CF95", rail: "#EAD9A6" },
  AA: { bg: "#EBD48C", fg: "#4F3C06", bd: "#C9A645", rail: "#C9A645" },
  AAA: { bg: "#7A5F12", fg: "#FFFFFF", bd: "#7A5F12", rail: "#7A5F12" },
};

const styles = {
  toc: { display: "flex", flexWrap: "wrap", gap: 6, margin: "0 0 26px" },
  tocLink: { fontSize: 12, padding: "5px 10px", borderRadius: 14, background: "#F3F6FA", border: "1px solid #E1E3F0", color: "#2E3457", textDecoration: "none" },
  group: { marginBottom: 34 },
  groupDesc: { fontSize: 12, color: "#565D8A", margin: "-6px 0 12px", lineHeight: 1.6 },
  sc: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", marginBottom: 10, background: "#FFFFFF", scrollMarginTop: 16, display: "flex", flexWrap: "wrap", gap: "10px 16px", alignItems: "stretch" },
  scBody: { flex: "999 1 320px", minWidth: 0 },
  scFig: { flex: "1 0 152px", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8F9FD", borderRadius: 6, padding: 6 },
  scOfficial: { fontSize: 11, color: "#3A4FCF", whiteSpace: "nowrap" },
  scHead: { display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 10px", marginBottom: 6 },
  scNum: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: "#171B36" },
  scName: { fontSize: 14, fontWeight: 700, color: "#171B36" },
  scLevel: { fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3, fontFamily: "'IBM Plex Mono', monospace" },
  fam: { border: "1px solid #E1E3F0", borderRadius: 6, marginBottom: 10, background: "#FFFFFF", overflow: "hidden" },
  famHead: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "6px 14px", padding: "10px 14px", background: "#F8F9FD", borderBottom: "1px solid #E1E3F0" },
  famTitle: { fontSize: 14, fontWeight: 700, color: "#171B36" },
  famScale: { display: "flex", alignItems: "center", gap: 6, fontSize: 10.5, color: "#565D8A" },
  famSteps: { display: "flex", gap: 2 },
  famStep: { width: 44, padding: "2px 0", textAlign: "center", fontSize: 10, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", borderRadius: 2 },
  famStepOff: { background: "transparent", color: "#9EA4C4", border: "1px dashed #D5D9EC" },
  tier: { display: "flex", flexWrap: "wrap", gap: "10px 16px", alignItems: "stretch", padding: "12px 14px 12px 12px", borderLeftWidth: 5, borderLeftStyle: "solid", scrollMarginTop: 16 },
  tierSep: { borderTop: "1px dashed #D5D9EC" },
  scReq: { fontSize: 13, lineHeight: 1.7, color: "#171B36", margin: "0 0 6px", fontWeight: 500 },
  scRow: { display: "flex", flexWrap: "wrap", gap: "2px 12px", fontSize: 12, lineHeight: 1.7, color: "#2E3457", margin: "0 0 4px" },
  scKey: { flex: "0 0 96px", fontWeight: 700, color: "#454C78" },
  scVal: { flex: "1 1 260px", minWidth: 0 },
  scLinks: { fontSize: 11.5, lineHeight: 1.8 },
  levelNote: { fontSize: 12, lineHeight: 1.7, color: "#2E3457", background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 14px", margin: "0 0 22px" },
  useTable: { width: "100%", minWidth: 720, borderCollapse: "collapse", fontSize: 12, color: "#2E3457" },
  useTh: { fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 8px", borderBottom: "1px solid #E1E3F0", textAlign: "left", verticalAlign: "bottom" },
  useTd: { padding: "8px 8px", borderBottom: "1px solid #EEF0F7", verticalAlign: "top" },
  useNote: { display: "block", fontSize: 10, lineHeight: 1.5, color: "#666D93", marginTop: 2, textAlign: "left" },
  othersGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 10, marginBottom: 24 },
  otherCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", color: "inherit" },
  otherName: { fontSize: 13, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  otherText: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A" },
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
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10, marginBottom: 24 },
  card: { display: "block", textDecoration: "none", background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 16px", color: "inherit" },
  cardUnbuilt: { background: "#FBFBFD", border: "1px dashed #D5D9EC", opacity: 0.85 },
  cardIcon: { marginBottom: 10, height: 26, display: "flex", alignItems: "center" },
  cardName: { fontSize: 13.5, fontWeight: 700, color: "#171B36", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 },
  cardOneLiner: { fontSize: 11.5, lineHeight: 1.6, color: "#565D8A", marginBottom: 10 },
  unbuiltTag: { fontSize: 9.5, fontWeight: 400, color: "#666D93", fontFamily: "'IBM Plex Mono', monospace" },
  usageRow: { display: "flex", gap: 6, alignItems: "flex-start", marginBottom: 4 },
  usageMark: { flexShrink: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, width: 30 },
  usageMarkOk: { color: "#2F7D6E" },
  usageMarkNg: { color: "#C0503F" },
  usageText: { fontSize: 11, lineHeight: 1.5, color: "#454C78" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};

const LEAD = "各ページに出てくるWCAGの達成基準を、デザインで気をつけることに絞ってまとめた一覧";
const ABOUT = [
  { k: "目的・役割", v: "「2.5.8」「1.4.11」のような番号だけでは分かりにくい達成基準を、何を求めるか・なぜ必要か・デザインの要点・例外で引けるようにする" },
  { k: "使い方", v: "基準ごとに、何を求めるか・なぜ必要か・デザインの要点・主な例外と、その基準が関わるページへのリンクを並べている" },
  { k: "関連するページ", v: <>WCAGの4原則(POUR)と各系列のアクセシビリティの考え方は<PageLink to="/principles/accessibility">アクセシビリティ</PageLink></> },
];

/* 各基準の挿絵(概念図。2026-11 ⑩本人最終レビュー)。何を求めるかを1枚で示す */
const G = "#B7BCDA", G2 = "#565D8A", L = "#E1E3F0", A = "#3A4FCF", OK = "#2F7D3B", NG = "#C0503F", FT = "'Jost', 'Noto Sans JP', sans-serif";
const SC_FIGS = {
  "1.4.1": () => (<><rect x="14" y="16" width="112" height="22" rx="4" fill="#FFF" stroke={NG} strokeWidth="1.6" /><rect x="20" y="24" width="50" height="6" rx="2" fill={L} /><circle cx="20" cy="52" r="6" fill={NG} /><text x="20" y="55.5" fontSize="9" fill="#FFF" textAnchor="middle" fontFamily={FT}>!</text><text x="30" y="55" fontSize="9" fill={NG} fontFamily={FT}>必須の項目です</text><text x="14" y="78" fontSize="8" fill={G2} fontFamily={FT}>色＋アイコン＋文字</text></>),
  "1.4.3": () => (<><rect x="12" y="14" width="54" height="54" rx="4" fill="#FFF" stroke={L} /><text x="39" y="48" fontSize="22" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily={FT}>Aa</text><rect x="74" y="14" width="54" height="54" rx="4" fill="#FFF" stroke={L} /><text x="101" y="48" fontSize="22" fontWeight="700" fill="#C9CEE3" textAnchor="middle" fontFamily={FT}>Aa</text><text x="39" y="82" fontSize="9" fill={OK} textAnchor="middle" fontFamily={FT}>4.5:1以上</text><text x="101" y="82" fontSize="9" fill={NG} textAnchor="middle" fontFamily={FT}>低い</text></>),
  "1.4.11": () => (<><rect x="14" y="20" width="18" height="18" rx="3" fill="#FFF" stroke="#454C78" strokeWidth="1.8" /><path d="M18 29l4 4 7-8" stroke="#454C78" strokeWidth="1.8" fill="none" /><rect x="44" y="20" width="80" height="18" rx="9" fill="#FFF" stroke="#454C78" strokeWidth="1.8" /><text x="84" y="32" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily={FT}>ボタン</text><text x="70" y="62" fontSize="10" fill={OK} textAnchor="middle" fontFamily={FT}>境界と背景 3:1以上</text></>),
  "1.4.8": () => (<>{[0,1,2,3].map((i) => (<rect key={i} x="14" y={14 + i * 12} width={i === 3 ? 50 : 80} height="5" rx="2" fill={L} />))}<rect x="104" y="14" width="24" height="56" rx="12" fill="#FFF" stroke={G} /><circle cx="116" cy="34" r="6" fill={A} /><text x="116" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>行間を調整</text></>),
  "1.4.4": () => (<><text x="24" y="52" fontSize="14" fill="#454C78" fontFamily={FT}>Aa</text><path d="M50 46h18m-4-4 4 4-4 4" stroke={G} strokeWidth="1.6" fill="none" /><text x="78" y="58" fontSize="30" fontWeight="700" fill="#171B36" fontFamily={FT}>Aa</text><text x="70" y="80" fontSize="9" fill={A} textAnchor="middle" fontFamily={FT}>200%まで拡大</text></>),
  "1.4.10": () => (<><rect x="8" y="12" width="70" height="50" rx="4" fill="#FFF" stroke={G} /><rect x="13" y="18" width="28" height="38" rx="2" fill={L} /><rect x="45" y="18" width="28" height="38" rx="2" fill={L} /><path d="M82 37h10m-4-4 4 4-4 4" stroke={G} strokeWidth="1.4" fill="none" /><rect x="98" y="8" width="32" height="72" rx="4" fill="#FFF" stroke={A} /><rect x="102" y="14" width="24" height="26" rx="2" fill={L} /><rect x="102" y="44" width="24" height="26" rx="2" fill={L} /><text x="114" y="88" fontSize="7" fill={A} textAnchor="middle" fontFamily={FT}>320px</text></>),
  "1.4.12": () => (<>{[0,1,2].map((i) => (<rect key={i} x="18" y={16 + i * 20} width="100" height="6" rx="2" fill={L} />))}<path d="M126 22v14m-3-3 3 3 3-3m-6-11 3-3 3 3" stroke={A} strokeWidth="1.4" fill="none" /><text x="70" y="82" fontSize="9" fill={A} textAnchor="middle" fontFamily={FT}>間隔を広げても崩れない</text></>),
  "1.3.4": () => (<><rect x="18" y="10" width="34" height="56" rx="5" fill="#FFF" stroke={G} /><rect x="23" y="18" width="24" height="5" rx="2" fill={L} /><rect x="70" y="22" width="56" height="34" rx="5" fill="#FFF" stroke={G} /><rect x="76" y="29" width="30" height="5" rx="2" fill={L} /><text x="70" y="82" fontSize="9" fill={OK} textAnchor="middle" fontFamily={FT}>縦でも横でも使える</text></>),
  "1.3.1": () => (<><rect x="14" y="12" width="60" height="9" rx="2" fill="#454C78" /><text x="80" y="20" fontSize="8" fill={A} fontFamily={FT}>見出し</text>{[0,1,2].map((i) => (<g key={i}><circle cx="20" cy={36 + i * 12} r="2.5" fill="#454C78" /><rect x="26" y={33 + i * 12} width="50" height="5" rx="2" fill={L} /></g>))}<text x="80" y="50" fontSize="8" fill={A} fontFamily={FT}>リスト</text><text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>構造を構造として伝える</text></>),
  "2.5.8": () => (<><rect x="44" y="20" width="28" height="28" rx="3" fill="none" stroke={A} strokeDasharray="3 2" /><circle cx="58" cy="34" r="6" fill={A} /><circle cx="90" cy="34" r="6" fill={A} /><path d="M64 60h20" stroke={OK} strokeWidth="1.4" /><text x="58" y="16" fontSize="8" fill={A} textAnchor="middle" fontFamily={FT}>24×24</text><text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>小さいなら間隔を空ける</text></>),
  "2.5.5": () => (<><rect x="44" y="12" width="52" height="52" rx="4" fill="none" stroke={A} strokeDasharray="3 2" /><circle cx="70" cy="38" r="10" fill={A} /><text x="70" y="80" fontSize="9" fill={A} textAnchor="middle" fontFamily={FT}>44×44 以上</text></>),
  "2.5.1": () => (<><circle cx="30" cy="30" r="5" fill={G} /><circle cx="46" cy="44" r="5" fill={G} /><path d="M24 22l-6-6M52 52l6 6" stroke={G} strokeWidth="1.4" /><path d="M66 36h12m-4-4 4 4-4 4" stroke={G} strokeWidth="1.4" fill="none" /><rect x="86" y="24" width="18" height="18" rx="9" fill="#FFF" stroke={A} /><text x="95" y="37" fontSize="12" fill={A} textAnchor="middle" fontFamily={FT}>+</text><rect x="108" y="24" width="18" height="18" rx="9" fill="#FFF" stroke={A} /><text x="117" y="37" fontSize="12" fill={A} textAnchor="middle" fontFamily={FT}>−</text><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>ピンチの代わりに1本指で</text></>),
  "2.5.2": () => (<><rect x="20" y="24" width="60" height="22" rx="11" fill={A} /><text x="50" y="38.5" fontSize="9" fill="#FFF" textAnchor="middle" fontFamily={FT}>送信</text><circle cx="50" cy="35" r="5" fill="none" stroke="#FFF" /><path d="M56 40 Q90 60 108 60" stroke={NG} strokeWidth="1.4" fill="none" strokeDasharray="3 2" /><circle cx="110" cy="60" r="5" fill="none" stroke={NG} /><text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>離したときに実行する</text></>),
  "2.5.4": () => (<><rect x="18" y="14" width="30" height="50" rx="5" fill="#FFF" stroke={G} /><path d="M12 30l-4 4 4 4M54 30l4 4-4 4" stroke={G} strokeWidth="1.4" fill="none" /><path d="M64 39h12m-4-4 4 4-4 4" stroke={G} strokeWidth="1.4" fill="none" /><rect x="84" y="28" width="44" height="22" rx="11" fill={A} /><text x="106" y="42.5" fontSize="8" fill="#FFF" textAnchor="middle" fontFamily={FT}>元に戻す</text><text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>振る代わりに画面のボタン</text></>),
  "2.5.7": () => (<>{[0,1,2].map((i) => (<g key={i}><rect x="14" y={12 + i * 20} width="70" height="16" rx="3" fill="#FFF" stroke={L} /><rect x="20" y={18 + i * 20} width="36" height="4" rx="2" fill={L} /><text x="96" y={24 + i * 20} fontSize="9" fill={A} fontFamily={FT}>▲</text><text x="110" y={24 + i * 20} fontSize="9" fill={A} fontFamily={FT}>▼</text></g>))}<text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>ボタンでも並べ替えられる</text></>),
  "2.5.6": () => (<><rect x="14" y="20" width="26" height="40" rx="4" fill="#FFF" stroke={A} /><rect x="56" y="22" width="22" height="34" rx="11" fill="#FFF" stroke={A} /><path d="M67 22v10" stroke={A} /><rect x="92" y="30" width="36" height="22" rx="3" fill="#FFF" stroke={A} />{[0,1,2].map((i) => (<rect key={i} x={96 + i * 10} y="35" width="7" height="5" rx="1" fill={L} />))}<text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>入力手段を切り替えられる</text></>),
  "2.1.1": () => (<><rect x="14" y="20" width="112" height="40" rx="5" fill="#FFF" stroke={G} />{[0,1,2,3,4,5,6].map((i) => (<rect key={i} x={20 + i * 15} y="26" width="12" height="10" rx="2" fill={L} />))}<rect x="20" y="42" width="26" height="12" rx="2" fill={A} /><text x="33" y="51" fontSize="7" fill="#FFF" textAnchor="middle" fontFamily={FT}>Tab</text><rect x="96" y="42" width="24" height="12" rx="2" fill={A} /><text x="108" y="51" fontSize="7" fill="#FFF" textAnchor="middle" fontFamily={FT}>Enter</text><text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>すべてキーボードで操作できる</text></>),
  "2.1.2": () => (<><rect x="22" y="16" width="70" height="44" rx="5" fill="#FFF" stroke={G} /><rect x="32" y="28" width="40" height="14" rx="3" fill="#FFF" stroke={A} strokeWidth="2" /><path d="M76 35 H118 m-4-4 4 4-4 4" stroke={OK} strokeWidth="1.6" fill="none" /><text x="104" y="28" fontSize="8" fill={OK} textAnchor="middle" fontFamily={FT}>Tab・Esc</text><text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>フォーカスが外へ抜け出せる</text></>),
  "2.4.3": () => (<>{[0,1,2].map((i) => (<g key={i}><rect x="30" y={10 + i * 22} width="80" height="16" rx="3" fill="#FFF" stroke={L} /><circle cx="20" cy={18 + i * 22} r="7" fill={A} /><text x="20" y={21 + i * 22} fontSize="8" fill="#FFF" textAnchor="middle" fontFamily={FT}>{i + 1}</text></g>))}<text x="70" y="86" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>意味と操作の順に移る</text></>),
  "2.4.7": () => (<><rect x="30" y="24" width="80" height="24" rx="12" fill={A} /><text x="70" y="40" fontSize="9" fill="#FFF" textAnchor="middle" fontFamily={FT}>保存</text><rect x="25" y="19" width="90" height="34" rx="17" fill="none" stroke="#171B36" strokeWidth="2" /><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>どこにフォーカスがあるか見える</text></>),
  "2.4.11": () => (<><rect x="20" y="10" width="100" height="60" rx="5" fill="#FFF" stroke={G} /><rect x="34" y="40" width="60" height="16" rx="3" fill="#FFF" stroke={A} strokeWidth="2" /><rect x="20" y="50" width="100" height="20" fill="#EEF0F5" /><text x="70" y="63" fontSize="7" fill={G2} textAnchor="middle" fontFamily={FT}>固定のフッター</text><text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>一部でも見えていればよい</text></>),
  "2.4.12": () => (<><rect x="20" y="10" width="100" height="60" rx="5" fill="#FFF" stroke={G} /><rect x="34" y="24" width="60" height="16" rx="3" fill="#FFF" stroke={A} strokeWidth="2" /><rect x="20" y="50" width="100" height="20" fill="#EEF0F5" /><text x="70" y="63" fontSize="7" fill={G2} textAnchor="middle" fontFamily={FT}>固定のフッター</text><text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>全部が見えている</text></>),
  "2.4.13": () => (<><rect x="36" y="26" width="68" height="22" rx="4" fill="#FFF" stroke={L} /><rect x="32" y="22" width="76" height="30" rx="7" fill="none" stroke="#171B36" strokeWidth="2.5" /><text x="70" y="40" fontSize="9" fill="#171B36" textAnchor="middle" fontFamily={FT}>リンク</text><text x="70" y="74" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>2px相当の太さ・3:1の変化</text></>),
  "3.2.1": () => (<><rect x="14" y="20" width="50" height="40" rx="4" fill="#FFF" stroke={G} /><rect x="20" y="32" width="38" height="12" rx="2" fill="#FFF" stroke={A} strokeWidth="2" /><path d="M70 40h12m-4-4 4 4-4 4" stroke={G} strokeWidth="1.4" fill="none" /><rect x="88" y="20" width="40" height="40" rx="4" fill="#FFF" stroke={G} /><text x="108" y="44" fontSize="9" fill={OK} textAnchor="middle" fontFamily={FT}>同じ</text><text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>フォーカスで画面を変えない</text></>),
  "1.4.13": () => (<><rect x="18" y="46" width="40" height="18" rx="9" fill={A} /><text x="38" y="58" fontSize="8" fill="#FFF" textAnchor="middle" fontFamily={FT}>?</text><rect x="44" y="14" width="80" height="26" rx="4" fill="#2E3457" /><text x="52" y="30" fontSize="8" fill="#FFF" fontFamily={FT}>補足の説明</text><text x="116" y="24" fontSize="8" fill="#FFF" fontFamily={FT}>×</text><path d="M70 44 l6 10 3-4 4 1z" fill="#171B36" /><text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>閉じられ、勝手に消えない</text></>),
  "2.2.1": () => (<><circle cx="40" cy="38" r="20" fill="#FFF" stroke={G} strokeWidth="1.6" /><path d="M40 38V24M40 38l9 6" stroke="#454C78" strokeWidth="1.8" /><rect x="74" y="28" width="52" height="20" rx="10" fill={A} /><text x="100" y="41" fontSize="9" fill="#FFF" textAnchor="middle" fontFamily={FT}>延長する</text><text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>時間制限を延長・解除できる</text></>),
  "2.2.2": () => (<>{[0,1,2].map((i) => (<rect key={i} x={10 + i * 42} y="14" width="36" height="30" rx="4" fill={i === 1 ? "#D9E4F2" : "#EEF0F5"} />))}<rect x="88" y="52" width="40" height="16" rx="8" fill={A} /><text x="108" y="63" fontSize="8" fill="#FFF" textAnchor="middle" fontFamily={FT}>❚❚ 停止</text><text x="56" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>5秒を超える動きは止められる</text></>),
  "2.3.1": () => (<>{[0,1,2,3,4,5].map((i) => (<rect key={i} x={12 + i * 20} y="22" width="16" height="22" rx="2" fill={i % 2 === 0 ? "#171B36" : "#EEF0F5"} />))}<path d="M12 54h116" stroke={G} /><text x="70" y="66" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>1秒</text><text x="70" y="82" fontSize="9" fill={NG} textAnchor="middle" fontFamily={FT}>3回を超えて点滅しない</text></>),
  "2.3.3": () => (<><rect x="14" y="14" width="56" height="50" rx="4" fill="#FFF" stroke={G} /><rect x="20" y="22" width="30" height="12" rx="2" fill={L} /><rect x="30" y="40" width="34" height="16" rx="2" fill="#D9E4F2" /><path d="M40 60v-6" stroke={G} /><rect x="86" y="30" width="36" height="18" rx="9" fill="#EEF0F5" stroke={G} /><circle cx="95" cy="39" r="7" fill="#FFF" stroke={G} /><text x="104" y="62" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>動きをオフ</text><text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>装飾の動きを止められる</text></>),
  "1.4.2": () => (<><path d="M20 30h10l12-10v40l-12-10H20z" fill="#454C78" /><path d="M50 30a12 12 0 0 1 0 20" stroke="#454C78" strokeWidth="1.6" fill="none" /><rect x="66" y="22" width="22" height="22" rx="4" fill={A} /><rect x="72" y="28" width="10" height="10" fill="#FFF" /><rect x="96" y="31" width="34" height="4" rx="2" fill={L} /><circle cx="108" cy="33" r="5" fill={A} /><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>止める・音量を変えられる</text></>),
  "1.4.7": () => (<><path d="M10 40 Q20 10 30 40 T50 40 T70 40 T90 40 T110 40 T130 40" stroke={A} strokeWidth="2" fill="none" /><path d="M10 56 Q20 52 30 56 T50 56 T70 56 T90 56 T110 56 T130 56" stroke={G} strokeWidth="1" fill="none" /><text x="134" y="34" fontSize="7" fill={A} textAnchor="end" fontFamily={FT}>声</text><text x="134" y="66" fontSize="7" fill={G2} textAnchor="end" fontFamily={FT}>背景音(小さく)</text><text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>背景音は声より20dB低く</text></>),
  "1.2.1": () => (<><path d="M14 36 Q22 16 30 36 T46 36 T62 36" stroke={A} strokeWidth="2" fill="none" /><path d="M68 36h10m-4-4 4 4-4 4" stroke={G} strokeWidth="1.4" fill="none" /><rect x="86" y="14" width="42" height="46" rx="3" fill="#FFF" stroke={G} />{[0,1,2,3].map((i) => (<rect key={i} x="91" y={20 + i * 9} width={i === 3 ? 20 : 32} height="4" rx="2" fill={L} />))}<text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>音声だけの内容に書き起こし</text></>),
  "1.2.2": () => (<><rect x="16" y="10" width="108" height="60" rx="4" fill="#2E3457" /><path d="M62 30v16l14-8z" fill="#FFF" opacity="0.7" /><rect x="30" y="54" width="80" height="11" rx="2" fill="#171B36" opacity="0.8" /><text x="70" y="62.5" fontSize="7" fill="#FFF" textAnchor="middle" fontFamily={FT}>こんにちは、今日は…</text><text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>収録済みの映像に字幕</text></>),
  "1.1.1": () => (<><circle cx="36" cy="34" r="16" fill="#FFF" stroke={G} strokeWidth="1.4" /><circle cx="34" cy="32" r="6" fill="none" stroke="#454C78" strokeWidth="1.8" /><path d="M39 37l5 5" stroke="#454C78" strokeWidth="1.8" /><path d="M58 34h10" stroke={G} /><rect x="74" y="22" width="52" height="24" rx="12" fill="#FFF" stroke={A} /><text x="100" y="38" fontSize="9" fill={A} textAnchor="middle" fontFamily={FT}>「検索」</text><text x="70" y="76" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>意味のある画像に文字の代わり</text></>),
  "1.3.3": () => (<><text x="14" y="26" fontSize="9" fill={NG} fontFamily={FT}>✕ 右の丸いボタンを押す</text><text x="14" y="48" fontSize="9" fill={OK} fontFamily={FT}>◯「送信」ボタンを押す</text><circle cx="120" cy="36" r="9" fill={A} /><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>形・位置だけで説明しない</text></>),
  "2.4.2": () => (<><rect x="10" y="14" width="120" height="56" rx="4" fill="#FFF" stroke={G} /><rect x="10" y="14" width="66" height="14" rx="4" fill="#EEF0F5" /><text x="16" y="24" fontSize="8" fill="#171B36" fontFamily={FT}>お届け先の入力</text><rect x="18" y="38" width="80" height="5" rx="2" fill={L} /><rect x="18" y="48" width="60" height="5" rx="2" fill={L} /><text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>主題が分かるタイトル</text></>),
  "2.4.4": () => (<><rect x="14" y="22" width="60" height="5" rx="2" fill={L} /><text x="78" y="28" fontSize="9" fill={A} textDecoration="underline" fontFamily={FT}>料金表</text><rect x="14" y="36" width="100" height="5" rx="2" fill={L} /><text x="70" y="70" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>文言と周りの文で目的が分かる</text></>),
  "2.4.9": () => (<><text x="18" y="28" fontSize="9" fill={NG} fontFamily={FT}>✕</text><text x="32" y="28" fontSize="9" fill={A} textDecoration="underline" fontFamily={FT}>こちら</text><text x="18" y="50" fontSize="9" fill={OK} fontFamily={FT}>◯</text><text x="32" y="50" fontSize="9" fill={A} textDecoration="underline" fontFamily={FT}>料金表を見る</text><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>リンクの文言だけで分かる</text></>),
  "2.4.5": () => (<><rect x="96" y="22" width="34" height="34" rx="4" fill="#FFF" stroke={A} /><text x="113" y="43" fontSize="8" fill={A} textAnchor="middle" fontFamily={FT}>ページ</text>{[["メニュー",18],["検索",40],["サイトマップ",62]].map(([t, y]) => (<g key={t}><text x="12" y={y} fontSize="8" fill="#454C78" fontFamily={FT}>{t}</text><path d={`M60 ${y - 3} L94 39`} stroke={G} strokeWidth="1.2" /></g>))}<text x="70" y="84" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>たどり着く方法が2つ以上</text></>),
  "2.4.6": () => (<><text x="14" y="22" fontSize="11" fontWeight="700" fill="#171B36" fontFamily={FT}>お届け先</text><text x="14" y="40" fontSize="8" fill="#454C78" fontFamily={FT}>郵便番号</text><rect x="14" y="44" width="80" height="14" rx="3" fill="#FFF" stroke={G} /><text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>見出しとラベルが内容を表す</text></>),
  "2.4.8": () => (<><text x="12" y="34" fontSize="9" fill={A} fontFamily={FT}>ホーム ›</text><text x="54" y="34" fontSize="9" fill={A} fontFamily={FT}>設定 ›</text><text x="90" y="34" fontSize="9" fontWeight="700" fill="#171B36" fontFamily={FT}>通知</text><path d="M90 40h28" stroke="#171B36" strokeWidth="2" /><text x="70" y="72" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>今どこにいるか分かる</text></>),
  "2.5.3": () => (<><rect x="18" y="34" width="50" height="22" rx="11" fill={A} /><text x="43" y="48" fontSize="9" fill="#FFF" textAnchor="middle" fontFamily={FT}>送信</text><rect x="78" y="14" width="50" height="22" rx="6" fill="#FFF" stroke={G} /><path d="M86 36l-6 8 12-8" fill="#FFF" stroke={G} /><text x="103" y="29" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily={FT}>「送信」</text><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>見えるラベルを名前に含める</text></>),
  "3.1.5": () => (<>{[0,1,2].map((i) => (<rect key={i} x="12" y={16 + i * 10} width="48" height="5" rx="1" fill="#454C78" />))}<path d="M66 30h10m-4-4 4 4-4 4" stroke={G} strokeWidth="1.4" fill="none" />{[0,1].map((i) => (<rect key={i} x="84" y={20 + i * 12} width="44" height="7" rx="2" fill={A} opacity="0.5" />))}<text x="70" y="70" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>難しい文に易しい版</text></>),
  "3.2.3": () => (<>{[0,1].map((i) => (<g key={i}><rect x={12 + i * 66} y="12" width="56" height="52" rx="4" fill="#FFF" stroke={G} />{["A","B","C"].map((t, j) => (<text key={t} x={20 + i * 66 + j * 16} y="26" fontSize="8" fill={A} fontFamily={FT}>{t}</text>))}<rect x={18 + i * 66} y="34" width="40" height="5" rx="2" fill={L} /></g>))}<text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>どのページでも同じ順</text></>),
  "3.2.4": () => (<>{[0,1].map((i) => (<g key={i}><rect x={12 + i * 66} y="12" width="56" height="52" rx="4" fill="#FFF" stroke={G} /><circle cx={30 + i * 66} cy="34" r="8" fill="none" stroke="#454C78" strokeWidth="1.6" /><text x={44 + i * 66} y="37" fontSize="8" fill="#171B36" fontFamily={FT}>検索</text></g>))}<text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>同じ働きは同じ見た目と名前</text></>),
  "3.2.6": () => (<>{[0,1].map((i) => (<g key={i}><rect x={12 + i * 66} y="12" width="56" height="52" rx="4" fill="#FFF" stroke={G} /><circle cx={58 + i * 66} cy="54" r="6" fill={A} /><text x={58 + i * 66} y="57" fontSize="8" fill="#FFF" textAnchor="middle" fontFamily={FT}>?</text></g>))}<text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>ヘルプは同じ位置に</text></>),
  "1.3.5": () => (<><text x="14" y="20" fontSize="8" fill="#454C78" fontFamily={FT}>メールアドレス</text><rect x="14" y="24" width="90" height="14" rx="3" fill="#FFF" stroke={A} /><rect x="14" y="40" width="90" height="16" rx="3" fill="#F3F6FA" stroke={L} /><text x="20" y="51" fontSize="8" fill={A} fontFamily={FT}>taro@example.com</text><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>目的が分かり、自動入力できる</text></>),
  "3.2.2": () => (<><rect x="14" y="24" width="60" height="18" rx="3" fill="#FFF" stroke={G} /><text x="20" y="36" fontSize="8" fill="#171B36" fontFamily={FT}>日本語 ▾</text><rect x="82" y="24" width="44" height="18" rx="9" fill={A} /><text x="104" y="36" fontSize="8" fill="#FFF" textAnchor="middle" fontFamily={FT}>適用</text><text x="70" y="70" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>選んだだけで画面を変えない</text></>),
  "3.3.1": () => (<><text x="14" y="18" fontSize="8" fill="#454C78" fontFamily={FT}>電話番号</text><rect x="14" y="22" width="100" height="16" rx="3" fill="#FFF" stroke={NG} strokeWidth="1.6" /><text x="14" y="52" fontSize="8" fill={NG} fontFamily={FT}>! 数字で入力してください</text><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>どの項目の何が誤りか文字で</text></>),
  "3.3.2": () => (<><text x="14" y="20" fontSize="9" fill="#171B36" fontWeight="700" fontFamily={FT}>生年月日</text><rect x="14" y="26" width="100" height="16" rx="3" fill="#FFF" stroke={G} /><text x="14" y="54" fontSize="8" fill={G2} fontFamily={FT}>例: 1990/04/01</text><text x="70" y="78" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>ラベルと入力の説明</text></>),
  "3.3.3": () => (<><rect x="14" y="16" width="100" height="16" rx="3" fill="#FFF" stroke={NG} strokeWidth="1.6" /><text x="20" y="27" fontSize="8" fill="#171B36" fontFamily={FT}>2026/13/40</text><text x="14" y="46" fontSize="8" fill={NG} fontFamily={FT}>! 日付が正しくありません</text><text x="14" y="58" fontSize="8" fill={OK} fontFamily={FT}>例: 2026/11/23</text><text x="70" y="80" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>直し方の案を示す</text></>),
  "3.3.4": () => (<><rect x="20" y="10" width="100" height="56" rx="5" fill="#FFF" stroke={G} /><text x="70" y="24" fontSize="8" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily={FT}>注文内容の確認</text><rect x="30" y="44" width="36" height="14" rx="7" fill="#FFF" stroke={G} /><text x="48" y="54" fontSize="7" fill="#454C78" textAnchor="middle" fontFamily={FT}>戻る</text><rect x="74" y="44" width="36" height="14" rx="7" fill={A} /><text x="92" y="54" fontSize="7" fill="#FFF" textAnchor="middle" fontFamily={FT}>確定</text><text x="70" y="82" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>確認・取り消し・修正ができる</text></>),
  "3.3.7": () => (<><rect x="16" y="22" width="14" height="14" rx="3" fill={A} /><path d="M19 29l3 3 6-6" stroke="#FFF" strokeWidth="1.6" fill="none" /><text x="36" y="33" fontSize="8.5" fill="#171B36" fontFamily={FT}>請求先は配送先と同じ</text><text x="70" y="66" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>同じ情報を二度入れさせない</text></>),
  "4.1.2": () => (<><rect x="16" y="30" width="16" height="16" rx="3" fill={A} /><path d="M19 38l3 3 7-7" stroke="#FFF" strokeWidth="1.6" fill="none" /><text x="38" y="42" fontSize="9" fill="#171B36" fontFamily={FT}>通知</text><rect x="64" y="12" width="68" height="26" rx="6" fill="#FFF" stroke={G} /><text x="98" y="23" fontSize="7" fill="#171B36" textAnchor="middle" fontFamily={FT}>通知、チェック</text><text x="98" y="33" fontSize="7" fill="#171B36" textAnchor="middle" fontFamily={FT}>ボックス、オン</text><text x="70" y="74" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>名前・役割・状態を伝える</text></>),
  "4.1.3": () => (<><rect x="14" y="30" width="62" height="18" rx="4" fill="#E8F3EA" /><text x="45" y="42" fontSize="8" fill={OK} textAnchor="middle" fontFamily={FT}>✓ 保存しました</text><path d="M92 32h6l7-6v22l-7-6h-6z" fill="#454C78" /><path d="M110 32a8 8 0 0 1 0 10" stroke="#454C78" strokeWidth="1.4" fill="none" /><text x="70" y="74" fontSize="8" fill={G2} textAnchor="middle" fontFamily={FT}>フォーカスを移さず読み上げる</text></>),
};
function ScFig({ n }) {
  const F = SC_FIGS[n];
  if (!F) return null;
  return (<svg viewBox="0 0 140 90" width="140" height="90" role="img" aria-label={n + "の概念図"} style={{ display: "block" }}><F /></svg>);
}

function LevelBadge({ level }) {
  const t = LEVEL_TONE[level];
  return (<span style={{ ...styles.scLevel, color: t.fg, background: t.bg, border: "1px solid " + t.bd }}>レベル{level}</span>);
}

function CriterionBody({ c }) {
  const pages = c.pages.filter((p) => pageLabel(p));
  return (
    <>
      <div style={styles.scFig}><ScFig n={c.n} /></div>
      <div style={styles.scBody}>
      <div style={styles.scHead}>
        <span style={styles.scNum}>{c.n}</span>
        <span style={styles.scName}>{c.name}</span>
        <LevelBadge level={c.level} />
        <a href={c.url} target="_blank" rel="noreferrer" style={styles.scOfficial}>公式(Understanding WCAG 2.2) ↗</a>
      </div>
      <p style={styles.scReq}>{c.req}</p>
      {c.why && <div style={styles.scRow}><span style={styles.scKey}>なぜ必要か</span><span style={styles.scVal}>{c.why}</span></div>}
      <div style={styles.scRow}><span style={styles.scKey}>デザインの要点</span><span style={styles.scVal}>{c.design}</span></div>
      {c.exc && <div style={styles.scRow}><span style={styles.scKey}>主な例外</span><span style={styles.scVal}>{c.exc}</span></div>}
      <div style={styles.scRow}>
        <span style={styles.scKey}>関わるページ</span>
        <span style={{ ...styles.scVal, ...styles.scLinks }}>
          {pages.length ? pages.map((p, i) => (<React.Fragment key={p}>{i > 0 && "・"}<PageLink to={p}>{pageLabel(p)}</PageLink></React.Fragment>)) : "―"}
        </span>
      </div>
      </div>
    </>
  );
}

const scId = (c) => "sc-" + c.n.replace(/\./g, "-");

function Criterion({ c }) {
  return (<div id={scId(c)} style={styles.sc}><CriterionBody c={c} /></div>);
}

/* 同じ観点のレベル違いを1枚にまとめたカード。左の帯と見出しの目盛りの濃さでレベルを示す */
function CriterionFamily({ title, items }) {
  const has = new Set(items.map((c) => c.level));
  return (
    <div style={styles.fam}>
      <div style={styles.famHead}>
        <span style={styles.famTitle}>{title}</span>
        <span style={styles.famScale}>
          <span>レベル</span>
          <span style={styles.famSteps}>
            {LEVELS.map((lv) => {
              const t = LEVEL_TONE[lv];
              return (<span key={lv} style={{ ...styles.famStep, ...(has.has(lv) ? { background: t.bg, color: t.fg, border: "1px solid " + t.bd } : styles.famStepOff) }}>{lv}</span>);
            })}
          </span>
          <span>右ほど厳しい</span>
        </span>
      </div>
      {items.map((c, i) => (
        <div key={c.n} id={scId(c)} style={{ ...styles.tier, borderLeftColor: LEVEL_TONE[c.level].rail, ...(i > 0 ? styles.tierSep : {}) }}>
          <CriterionBody c={c} />
        </div>
      ))}
    </div>
  );
}

/* グループの基準を、まとめカードと単独カードの並びにする */
function renderItems(items) {
  const out = [];
  const used = new Set();
  items.forEach((c) => {
    if (used.has(c.n)) return;
    const f = FAMILIES.find((fm) => fm.ns.includes(c.n));
    if (f) {
      const members = f.ns.map((n) => items.find((x) => x.n === n)).filter(Boolean);
      members.forEach((m) => used.add(m.n));
      out.push(<CriterionFamily key={f.title} title={f.title} items={members} />);
    } else {
      out.push(<Criterion key={c.n} c={c} />);
    }
  });
  return out;
}

export default function WcagCriteriaPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 800px; padding: 36px 24px 48px; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/principles/wcag-criteria" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>思想レイヤー / WCAGの達成基準</span>
            <span>SPEC No. 002.5</span>
          </div>

          <h1 style={styles.title}>WCAGの達成基準(デザイン)</h1>
          <SummaryCard lead={LEAD} rows={ABOUT} />

          <div style={styles.levelNote}>
            レベルは<strong>A(最低限)・AA(一般的な目標)・AAA(より高い水準)</strong>の3段階。多くのガイドラインや調達の要件はAAを参照する(求められるレベルは、地域の法律や契約などで変わる)。このページでは目標になりやすいA・AAを中心に、各ページで触れているAAAも載せている。ターゲットのサイズやフォーカスのように、同じ観点でレベルだけが違う基準は1枚のカードにまとめ、レベルが上がるほど左の帯とラベルを濃くしている。説明はW3Cの解説書(Understanding WCAG 2.2)をもとにした要約で、正確な条件はリンク先で確かめる。
          </div>

          <div style={styles.toc}>
            {GROUPS.map((g) => (<a key={g.id} href={"#g-" + g.id} style={styles.tocLink}>{g.title}</a>))}
          </div>

          {GROUPS.map((g) => (
            <section key={g.id} id={"g-" + g.id} style={styles.group}>
              <h2 style={styles.diagramTitle}>{g.title}</h2>
              <p style={styles.groupDesc}>{g.desc}</p>
              {renderItems(g.items)}
            </section>
          ))}

          <RelatedPages paths={["/principles/accessibility", "/components/actions/button", "/tokens/color", "/tokens/interaction-states"]} />

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>WCAG 2.2(W3C勧告)と、WAICによる日本語訳の達成基準名にもとづく。原文はリンク先で確認する。</span>
          </div>
        </div>
      </div>
    </div>
  );
}
