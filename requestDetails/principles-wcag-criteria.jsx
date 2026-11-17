import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, SummaryCard, PageLink, RelatedPages, pageLabel } from "./page-parts";

/**
 * 思想レイヤー「WCAGの達成基準(デザイン)」ページ(2026-11 ⑦本人レビューNo.001で追加)。
 * 各ページの比較やW3Cの欄に出てくる達成基準(2.5.8・1.4.11など)を、デザインで気をつけることに絞って1か所にまとめる。
 * 各ページの参照リンクの「このサイトの解説」から、このページの各基準(#sc-2-5-8 など)へ飛べる。
 * 「関わるページ」は、各ページの参照リンク(達成基準)から集めた一覧。
 * 達成基準の名前はWAICのWCAG 2.2の訳。説明はUnderstanding WCAG 2.2をもとにした要約・言い換え。
 */

const GROUPS = [
  { id: "color", title: "色とコントラスト", desc: "色の使い方と、文字・コンポーネントの見分けやすさ", items: [
    { n: "1.4.1", name: "色の用途", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html", req: "色だけで情報を伝えない。", design: "エラー・必須・選択中・リンクなどは、色に加えてアイコン・文字・下線・形でも示す。色だけでリンクを区別するなら、周りの文字と3:1以上の明度差が要る。", exc: "色の違いに意味がない装飾は対象外。", pages: ["/components/actions/link", "/components/communication/alert", "/components/communication/badge", "/components/selection/checkbox", "/components/selection/chips", "/components/text-inputs/validation", "/tokens/color"] },
    { n: "1.4.3", name: "コントラスト(最低限)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html", req: "文字と背景のコントラスト比を確保する。", design: "通常の文字は4.5:1以上、大きな文字(18pt以上、または14pt以上の太字。Webでおよそ24px/18.66px)は3:1以上。四捨五入しない(4.499:1は不合格)。ライト・ダークの両方で確かめる。", exc: "無効なコンポーネント、純粋な装飾、見えない文字、ロゴの文字。", pages: ["/components/communication/badge", "/tokens/color", "/tokens/dark-mode"] },
    { n: "1.4.11", name: "非テキストのコントラスト", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html", req: "コンポーネントの境界・状態の見た目と、意味のある図にコントラストを確保する。", design: "ボタンや入力欄の枠、チェックの印、フォーカスの表示、選択状態を示す印、アイコンなどは、隣り合う色と3:1以上。文字やアイコンでコンポーネントだと分かるなら、枠そのものは必須ではない。状態どうしの差を3:1にする必要はない。", exc: "無効なコンポーネント、ブラウザ標準の見た目を変えていないコンポーネント、ロゴ・写真など見た目そのものが情報のもの。", pages: ["/components/actions/button", "/components/communication/alert", "/components/communication/badge", "/components/navigation/app-bar", "/components/navigation/nav-bar", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/chips", "/components/selection/radio", "/components/selection/toggle", "/tokens/color", "/tokens/elevation", "/tokens/icon", "/tokens/interaction-states", "/tokens/shape"] },
    { n: "1.4.8", name: "視覚的提示", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html", req: "文章の見せ方を利用者が調整できる。", design: "前景色と背景色を選べる、1行は80文字(日本語40文字)以内にできる、両端揃えにしない、行間1.5倍以上・段落間はそれ以上、200%に拡大しても横スクロールせずに読める。", exc: "AAAのため、多くのサイトの目標(AA)には含まれない。", pages: ["/tokens/dark-mode", "/tokens/typography"] },
  ] },
  { id: "text", title: "文字とレイアウト", desc: "拡大・狭い幅・向きの変化で崩れないこと", items: [
    { n: "1.4.4", name: "テキストのサイズ変更", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html", req: "文字を200%まで拡大しても内容と機能が失われない。", design: "固定の高さに文字を押し込めない。拡大で文字が切れたり重なったりしないかを確かめる。ページ全体のズームで満たしてもよい。", exc: "字幕と文字画像。", pages: ["/components/text-inputs/text-field", "/tokens/typography"] },
    { n: "1.4.10", name: "リフロー", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html", req: "幅320 CSSピクセル相当でも、縦横2方向のスクロールなしで読める。", design: "幅1280pxを400%に拡大した状態に当たる。狭い幅では1列に組み替える(横に並んだものは縦に積む)。", exc: "データ表・地図・図・動画・ゲームなど、2次元の配置が欠かせない部分。", pages: ["/components/text-inputs/text-field", "/tokens/adaptive", "/tokens/layout-spacing"] },
    { n: "1.4.12", name: "テキストの間隔", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html", req: "利用者が文字の間隔を広げても崩れない。", design: "行の高さ1.5倍・段落の後2倍・字間0.12倍・単語間隔0.16倍に広げても、文字が切れたり重なったりしない。この値をデザインの初期値にする必要はない。", exc: "その言語でもともと使わない間隔(単語の間にスペースがない言語の単語間隔など)。", pages: ["/tokens/typography"] },
    { n: "1.3.4", name: "向き(orientation)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/orientation.html", req: "画面の向きを縦・横の一方に固定しない。", design: "端末を固定して使う人(車いすのアームなど)は回転させられない。縦向き・横向きのどちらでも使えるようにする。", exc: "小切手・ピアノのアプリ・VRなど、特定の向きが欠かせないもの。", pages: ["/tokens/adaptive"] },
    { n: "1.3.1", name: "情報及び関係性", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html", req: "見た目で伝えている構造や関係を、構造としても伝える。", design: "見出し・リスト・表の見出しとデータの関係・余白でまとめたグループなどを、見た目だけでなく構造でも示す。余白だけのまとまりは読み上げでは伝わらない。", exc: "", pages: ["/components/containment/list", "/components/containment/table", "/components/text-inputs/text-field", "/tokens/layout-spacing"] },
  ] },
  { id: "target", title: "押せる範囲と入力の方法", desc: "指・ポインター・キーボードなど、入力の手段ごとの決まり", items: [
    { n: "2.5.8", name: "ターゲットのサイズ(最低限)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html", req: "押す対象を24×24 CSSピクセル以上にする(例外あり)。", design: "小さい場合は、各対象の中心に直径24pxの円を置いて、ほかの対象やその円と重ならない間隔があれば適合する。角丸が大きく内側に24px四方が収まらない対象は「小さい対象」として扱う。", exc: "5つ: ①間隔(上の円の条件)、②同じ機能の十分な大きさの代わりがある、③文中のリンクなど文章の行の中にある、④ブラウザが大きさを決めていて変えていない、⑤その大きさや配置が欠かせない(地図のピンなど)。", pages: ["/components/actions/button", "/components/actions/fab", "/components/navigation/nav-bar", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/radio", "/components/selection/select", "/components/selection/slider", "/components/selection/toggle", "/tokens/layout-spacing", "/tokens/shape"] },
    { n: "2.5.5", name: "ターゲットのサイズ(高度)", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html", req: "押す対象を44×44 CSSピクセル以上にする。", design: "Appleの44pt、Googleの48dpに近い、より高い水準。主要なボタンの目安にしやすい。", exc: "②〜⑤と同じ種類の例外がある(2.5.8の間隔の例外はない)。", pages: ["/components/actions/button", "/components/navigation/nav-bar", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/radio"] },
    { n: "2.5.1", name: "ポインタジェスチャ", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html", req: "2本指以上や軌跡で決まる操作に、1本指で軌跡のない代わりを用意する。", design: "ピンチでの拡大には+/−のボタン、スワイプでの送りには前へ・次へのボタンなど。", exc: "軌跡そのものが欠かせない操作(手書きの署名など)。", pages: ["/tokens/input-methods"] },
    { n: "2.5.2", name: "ポインタキャンセル", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html", req: "押した瞬間ではなく、離したときに実行する。", design: "誤って触れても、指をボタンの外へずらして離せば取り消せるようにする。", exc: "キーボードやピアノの鍵盤をまねるなど、押した瞬間の実行が欠かせないもの。", pages: ["/tokens/input-methods"] },
    { n: "2.5.4", name: "動きによる起動", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html", req: "端末を振る・傾けるなどの動きで行う機能に、画面上の代わりと、動きを切る手段を用意する。", design: "「振って元に戻す」には取り消しボタンも置き、動きへの反応を無効にできるようにする。", exc: "OSのアクセシビリティ機能など、支援の仕組みで動きを使う場合。", pages: ["/tokens/input-methods"] },
    { n: "2.5.7", name: "ドラッグ動作", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html", req: "ドラッグで行う機能に、ドラッグしない1本指の代わりを用意する。", design: "スライダーは溝を押した位置へつまみを移す、並べ替えはメニューから選べる、シートの高さはグラバーを押して切り替える、など。", exc: "ドラッグが欠かせない場合、ブラウザが決めていて変えていないドラッグ。", pages: ["/components/containment/bottom-sheet", "/components/selection/slider", "/tokens/input-methods"] },
    { n: "2.5.6", name: "入力メカニズムの共存", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms.html", req: "使える入力手段(タッチ・マウス・キーボードなど)をコンテンツ側で制限しない。", design: "タッチの端末でもマウスやキーボードを使えるようにする。", exc: "セキュリティや必要不可欠な場合。", pages: ["/tokens/input-methods"] },
    { n: "2.1.1", name: "キーボード", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html", req: "すべての機能をキーボードで操作できる。", design: "ポインター前提になりやすいスライダー・ドラッグ・メニューなども、キーボードで操作できるようにする。", exc: "手書きなど、軌跡そのものが欠かせない入力。", pages: ["/components/navigation/tabs", "/components/selection/chips", "/components/selection/select", "/components/selection/slider", "/tokens/input-methods"] },
    { n: "2.1.2", name: "キーボードトラップなし", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html", req: "キーボードのフォーカスが抜け出せなくならない。", design: "ダイアログなどでフォーカスを閉じ込める場合も、Escキーなどで閉じて外に戻れるようにする。", exc: "", pages: ["/tokens/input-methods"] },
  ] },
  { id: "focus", title: "フォーカスとホバー", desc: "今どこを操作しているかが分かり、勝手に動かないこと", items: [
    { n: "2.4.3", name: "フォーカス順序", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html", req: "フォーカスの順番が、意味と操作の流れに沿っている。", design: "見た目の並びと読む順番をそろえる。ダイアログを閉じたら、開いたボタンにフォーカスを戻す。", exc: "", pages: ["/tokens/input-methods"] },
    { n: "2.4.7", name: "フォーカスの可視化", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html", req: "キーボードで操作するとき、フォーカスの位置が見える。", design: "フォーカスの表示を消さない。色の変化だけに頼らず、輪郭線などで示すと分かりやすい。", exc: "", pages: ["/components/actions/button", "/tokens/interaction-states"] },
    { n: "2.4.11", name: "隠されないフォーカス(最低限)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html", req: "フォーカスしたコンポーネントが、固定ヘッダーやバナーなど作者が作った重なりで完全に隠れない。", design: "上部の固定ヘッダーや下部のCookieバナーの下にフォーカスが入り込まないよう、スクロールの位置を調整する。", exc: "利用者が自分で開いた内容で、フォーカスを移さずに閉じられるもの。", pages: ["/tokens/elevation"] },
    { n: "2.4.12", name: "隠されないフォーカス(高度)", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced.html", req: "フォーカスしたコンポーネントが、一部も隠れない。", design: "2.4.11より厳しい水準。", exc: "", pages: ["/tokens/elevation"] },
    { n: "2.4.13", name: "フォーカスの外観", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html", req: "フォーカスの表示を十分な大きさとコントラストにする。", design: "コンポーネントの周りを2 CSSピクセルの太さで囲んだ面積以上で、フォーカスの前後の同じピクセルどうしで3:1以上の変化をつける。", exc: "ブラウザが決めていて作者が調整できないフォーカス表示。", pages: ["/tokens/interaction-states"] },
    { n: "3.2.1", name: "フォーカス時", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html", req: "フォーカスが当たっただけで、文脈を変えない。", design: "フォーカスしただけで別のページへ遷移する・新しいウィンドウを開く・送信する、といったことを起こさない。", exc: "", pages: ["/components/navigation/tabs", "/components/selection/select"] },
    { n: "1.4.13", name: "ホバー又はフォーカスで表示されるコンテンツ", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html", req: "ホバーやフォーカスで出る内容(ツールチップなど)の3つの条件を満たす。", design: "①ポインターを動かさずに消せる(Escキーなど)、②内容の上にポインターを移しても消えない、③離れるか消すまで勝手に消えない。", exc: "入力の誤りの表示など、内容がほかの情報を隠さないもの。ブラウザが出すツールチップ。", pages: ["/components/communication/tooltip"] },
  ] },
  { id: "motion", title: "動きと時間", desc: "動きで人を傷つけない、時間で追い立てない", items: [
    { n: "2.2.1", name: "期限調節可能", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html", req: "時間制限を延長・解除できるようにする。", design: "「元に戻す」などの操作を持つ通知を時間で消すと、操作が間に合わない人がいる。時間で消さないか、延長・解除できるようにする。", exc: "リアルタイムの競りなど、時間制限が欠かせないもの。20時間を超える制限。", pages: ["/components/communication/snackbar", "/components/communication/toast", "/components/text-inputs/wizard"] },
    { n: "2.2.2", name: "一時停止・停止・非表示", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html", req: "自動で始まり5秒を超えて続く動き・点滅・スクロールを止められる。", design: "自動で回るカルーセルには停止ボタンを置く。自動で更新される情報も止めたり隠したりできるようにする。", exc: "動きが欠かせない場合。", pages: ["/components/containment/carousel", "/tokens/motion"] },
    { n: "2.3.1", name: "3回の閃光、又は閾値以下", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html", req: "1秒間に3回を超えて点滅させない。", design: "光の点滅は光過敏性発作の原因になる。", exc: "点滅の明るさや面積が閾値以下の場合。", pages: ["/tokens/motion"] },
    { n: "2.3.3", name: "インタラクションによるアニメーション", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html", req: "操作をきっかけに起きる動きを、無効にできる。", design: "視差スクロールなど装飾の動きは、OS・ブラウザの「動きを減らす」設定に従って止める。", exc: "機能や情報に欠かせない動き。", pages: ["/tokens/motion"] },
  ] },
  { id: "sound", title: "音と映像", desc: "音を止められ、音だけで伝えない", items: [
    { n: "1.4.2", name: "音声の制御", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html", req: "自動で3秒を超えて鳴る音を、止めるか個別に音量を調整できる。", design: "自動再生の音は避け、鳴らすなら停止の手段をすぐ見つかる場所に置く。", exc: "3秒以内に終わる音。", pages: ["/tokens/sound"] },
    { n: "1.4.7", name: "背景音の小さい又はない音声", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/low-or-no-background-audio.html", req: "録音した音声が中心の内容で、背景音をなくす・切れる・20dB以上小さくする。", design: "ナレーションに背景音楽を重ねるなら十分に小さくする。", exc: "音声CAPTCHA・音声ロゴ・歌など。", pages: ["/tokens/sound"] },
    { n: "1.2.1", name: "音声だけ及び映像だけ(収録済み)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html", req: "録音した音声だけ・映像だけの内容に、代わりを用意する。", design: "音声だけなら書き起こし、映像だけなら書き起こしか音声の説明を用意する。", exc: "代わりのメディアであることが明らかなもの。", pages: ["/tokens/sound"] },
    { n: "1.2.2", name: "キャプション(収録済)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html", req: "録音した映像の音声に字幕を付ける。", design: "会話や重要な音を字幕で伝える。", exc: "", pages: ["/tokens/sound"] },
  ] },
  { id: "words", title: "文言・ラベル・ナビゲーション", desc: "何のためのコンポーネントか、今どこにいるかを言葉で伝える", items: [
    { n: "1.1.1", name: "非テキストコンテンツ", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html", req: "意味のある画像やアイコンに、文字の代わりを用意する。", design: "操作のアイコンには、見た目ではなく目的の名前を付ける(「虫めがね」ではなく「検索」)。飾りの画像は読み上げない。", exc: "装飾だけの画像。", pages: ["/tokens/icon"] },
    { n: "1.3.3", name: "感覚による特性", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html", req: "操作の説明を、形・大きさ・位置・音だけに頼らない。", design: "「右の丸いボタン」ではなく「[送信]ボタン」のように、コンポーネントの名前も書く。", exc: "", pages: ["/tokens/writing"] },
    { n: "2.4.2", name: "ページタイトル", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html", req: "ページに、主題や目的を表すタイトルを付ける。", design: "画面ごとに内容を表すタイトルにする。1つのURLで画面が切り替わる場合も、画面ごとにタイトルを変える。", exc: "", pages: ["/tokens/writing"] },
    { n: "2.4.4", name: "リンクの目的(コンテキスト内)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html", req: "リンクの目的が、リンクの文言か周りの文脈から分かる。", design: "「こちら」「詳しくはここ」だけのリンクにしない。", exc: "誰にとっても目的が分からないリンク。", pages: ["/components/actions/link", "/components/navigation/pagination"] },
    { n: "2.4.9", name: "リンクの目的(リンクのみ)", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html", req: "リンクの目的が、リンクの文言だけで分かる。", design: "2.4.4より厳しい水準。", exc: "誰にとっても目的が分からないリンク。", pages: ["/components/actions/link"] },
    { n: "2.4.5", name: "複数の手段", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html", req: "ページにたどり着く方法を2つ以上用意する。", design: "ナビゲーションに加えて、サイト内検索やサイトマップを置く。", exc: "手続きの途中や結果の画面。", pages: ["/components/text-inputs/search-field"] },
    { n: "2.4.6", name: "見出し及びラベル", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html", req: "見出しとラベルが、主題や目的を表す。", design: "見出しやラベルを置くこと自体は求めない。置いたなら、内容が分かる言葉にする(1語でもよい)。", exc: "", pages: ["/tokens/writing"] },
    { n: "2.4.8", name: "現在位置", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/location.html", req: "一連のページの中の今の位置が分かる。", design: "パンくずリストやステップの表示などで示す。置けば自動で適合するわけではない。", exc: "", pages: ["/components/navigation/breadcrumb"] },
    { n: "2.5.3", name: "ラベルを含む名前", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html", req: "見えるラベルの言葉を、支援技術向けの名前にも含める。", design: "食い違うと、音声入力でラベルの言葉を言っても反応しない。", exc: "", pages: ["/tokens/icon"] },
    { n: "3.1.5", name: "読解レベル", level: "AAA", url: "https://www.w3.org/WAI/WCAG22/Understanding/reading-level.html", req: "難しい文には、補足か易しい版を用意する。", design: "前期中等教育(9年の学校教育)を超える読解力が要る文が対象。", exc: "固有名詞や題名。", pages: ["/tokens/writing"] },
    { n: "3.2.3", name: "一貫したナビゲーション", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html", req: "複数のページで繰り返すナビゲーションを、いつも同じ順番で並べる。", design: "ヘッダーやサイドナビの項目の順番をページごとに変えない。", exc: "利用者が自分で並びを変えた場合。", pages: ["/components/containment/drawer", "/components/navigation/app-bar", "/components/navigation/nav-bar"] },
    { n: "3.2.4", name: "一貫した識別性", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html", req: "同じ働きのコンポーネントを、ページをまたいで一貫して識別できる。", design: "共通の検索・アカウントなどのアイコンボタンには、どのページでも同じ名前を付ける。", exc: "文脈に合わせた小さな違い(「前のページ」など)。", pages: ["/components/actions/link", "/tokens/icon"] },
    { n: "3.2.6", name: "一貫したヘルプ", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html", req: "問い合わせ先・FAQなどのヘルプを、ページをまたいで同じ位置に置く。", design: "ヘルプを置くこと自体は求めない。置くなら同じ順番の位置にする。", exc: "利用者が自分で変えた場合。", pages: ["/components/navigation/app-bar"] },
  ] },
  { id: "input", title: "入力とエラー", desc: "入力しやすく、誤りに気づいて直せること", items: [
    { n: "1.3.5", name: "入力目的の特定", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html", req: "入力欄の目的(名前・メールアドレスなど)を判別できるようにする。", design: "ブラウザの自動入力が効くようにし、入力の手間を減らす。", exc: "", pages: ["/components/text-inputs/text-field"] },
    { n: "3.2.2", name: "入力時", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html", req: "設定を変えただけで、事前の説明なしに文脈を変えない。", design: "プルダウンで選んだだけで遷移・送信しない。実行は「移動」「送信」ボタンで行う。スイッチの切り替えで画面を変えるなら事前に知らせる。", exc: "事前に知らせている場合。", pages: ["/components/selection/select", "/components/selection/toggle"] },
    { n: "3.3.1", name: "エラーの特定", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html", req: "入力の誤りを自動で見つけたら、その項目を特定し、文字で説明する。", design: "色や枠の変化だけでなく、どの欄がどう誤っているかを文字で示す。", exc: "", pages: ["/components/communication/alert", "/components/text-inputs/validation"] },
    { n: "3.3.2", name: "ラベル又は指示", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html", req: "入力が必要なところに、ラベルか説明を用意する。", design: "プレースホルダーだけをラベルにしない。書式や必須かどうかも示す。説明を増やしすぎない。", exc: "", pages: ["/components/text-inputs/text-field", "/components/text-inputs/wizard", "/tokens/writing"] },
    { n: "3.3.3", name: "エラーの修正提案", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html", req: "誤りの直し方が分かっていれば、訂正案を示す。", design: "「8文字以上で入力してください」のように具体的に書く。", exc: "セキュリティや目的を損なう場合(パスワードなど)。", pages: ["/components/text-inputs/validation"] },
    { n: "3.3.4", name: "誤り防止(法的・金融・データ)", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html", req: "法的・金融的な確約、データの変更・削除、試験の送信で、誤りを防ぐ手段を用意する。", design: "取り消せる・検査して直す機会を与える・送信前に確認できる、のどれかを備える。", exc: "対象のページだけにかかる。", pages: ["/components/text-inputs/validation"] },
    { n: "3.3.7", name: "冗長な入力", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html", req: "同じ手続きの中で、前に入力した情報をもう一度入力させない。", design: "自動で入れておくか選べるようにする(「配送先と同じ」のチェックなど)。エラーで戻しても入力を消さない。", exc: "セキュリティ上の再入力、入れ直すこと自体が目的の場合、前の情報が無効になった場合。", pages: ["/components/text-inputs/input-validation", "/components/text-inputs/wizard"] },
  ] },
  { id: "assist", title: "支援技術への伝え方", desc: "見た目と同じことを、読み上げなどにも伝える", items: [
    { n: "4.1.2", name: "名前(name)・役割(role)・値(value)", level: "A", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html", req: "コンポーネントの名前・役割・状態を、支援技術が取得できるようにする。", design: "ボタンが押されているか、メニューが開いているか、選択中かなどの状態も伝える。ブラウザ標準のコンポーネントなら多くは自動で伝わり、独自に作ったコンポーネントは配慮が要る。", exc: "", pages: ["/components/actions/button", "/components/communication/badge", "/components/containment/side-sheet", "/components/navigation/segmented-control", "/components/navigation/tabs", "/components/selection/checkbox", "/components/selection/chips", "/components/selection/radio", "/components/selection/select", "/components/selection/slider", "/components/selection/toggle", "/components/text-inputs/text-field", "/tokens/icon", "/tokens/interaction-states"] },
    { n: "4.1.3", name: "ステータスメッセージ", level: "AA", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html", req: "フォーカスを移さずに出る知らせを、支援技術にも伝える。", design: "「保存しました」「5件見つかりました」などは、控えめな知らせとして読み上げられるようにする。緊急の警告は割り込んで読み上げる。", exc: "", pages: ["/components/communication/alert", "/components/communication/empty-state", "/components/communication/progress", "/components/communication/snackbar", "/components/communication/toast"] },
  ] },
];

const styles = {
  toc: { display: "flex", flexWrap: "wrap", gap: 6, margin: "0 0 26px" },
  tocLink: { fontSize: 12, padding: "5px 10px", borderRadius: 14, background: "#F3F6FA", border: "1px solid #E1E3F0", color: "#2E3457", textDecoration: "none" },
  group: { marginBottom: 34 },
  groupDesc: { fontSize: 12, color: "#565D8A", margin: "-6px 0 12px", lineHeight: 1.6 },
  sc: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", marginBottom: 10, background: "#FFFFFF", scrollMarginTop: 16 },
  scHead: { display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 10px", marginBottom: 6 },
  scNum: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: "#171B36" },
  scName: { fontSize: 14, fontWeight: 700, color: "#171B36" },
  scLevel: { fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 3, color: "#7A5F12", background: "#FBF3DC", border: "1px solid #E2CF95", fontFamily: "'IBM Plex Mono', monospace" },
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
  { k: "目的・役割", v: "「2.5.8」「1.4.11」のような番号だけでは分かりにくい達成基準を、何を求めるか・デザインの要点・例外で引けるようにする" },
  { k: "使い方", v: "各ページの参照リンクにある「このサイトの解説」から、該当する基準へ直接飛べる。基準ごとに、関わるページへも戻れる" },
  { k: "関連するページ", v: <>WCAGの4原則(POUR)と各系列のアクセシビリティの考え方は<PageLink to="/principles/accessibility">アクセシビリティ</PageLink></> },
];

function Criterion({ c }) {
  const pages = c.pages.filter((p) => pageLabel(p));
  return (
    <div id={"sc-" + c.n.replace(/\./g, "-")} style={styles.sc}>
      <div style={styles.scHead}>
        <span style={styles.scNum}>{c.n}</span>
        <span style={styles.scName}>{c.name}</span>
        <span style={styles.scLevel}>レベル{c.level}</span>
      </div>
      <p style={styles.scReq}>{c.req}</p>
      <div style={styles.scRow}><span style={styles.scKey}>デザインの要点</span><span style={styles.scVal}>{c.design}</span></div>
      {c.exc && <div style={styles.scRow}><span style={styles.scKey}>主な例外</span><span style={styles.scVal}>{c.exc}</span></div>}
      <div style={styles.scRow}>
        <span style={styles.scKey}>関わるページ</span>
        <span style={{ ...styles.scVal, ...styles.scLinks }}>
          {pages.length ? pages.map((p, i) => (<React.Fragment key={p}>{i > 0 && "・"}<PageLink to={p}>{pageLabel(p)}</PageLink></React.Fragment>)) : "―"}
          {"　"}<a href={c.url} target="_blank" rel="noreferrer" style={{ color: "#3A4FCF" }}>Understanding WCAG 2.2 ↗</a>
        </span>
      </div>
    </div>
  );
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
            レベルは<strong>A(最低限)・AA(一般的な目標)・AAA(より高い水準)</strong>の3段階。多くのサイトや法令の目標はAAで、このページでは目標になりやすいA・AAを中心に、各ページで触れているAAAも載せている。説明はW3Cの解説書(Understanding WCAG 2.2)をもとにした要約で、正確な条件はリンク先で確かめる。
          </div>

          <div style={styles.toc}>
            {GROUPS.map((g) => (<a key={g.id} href={"#g-" + g.id} style={styles.tocLink}>{g.title}</a>))}
          </div>

          {GROUPS.map((g) => (
            <section key={g.id} id={"g-" + g.id} style={styles.group}>
              <h2 style={styles.diagramTitle}>{g.title}</h2>
              <p style={styles.groupDesc}>{g.desc}</p>
              {g.items.map((c) => (<Criterion key={c.n} c={c} />))}
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
