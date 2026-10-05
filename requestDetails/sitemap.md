# デザインシステム比較サイト ― 全ページ構成

比較対象4系列: Apple(HIG) / Google(Material Design 3) / W3C(WCAG) / Nielsen Norman Group

構成の並び順・グルーピングは、主要参照元であるHIGとMaterial Design 3の実際のドキュメント構成(Foundations→Components)に合わせて整理。コンポーネントの分類はMaterial Designの伝統的な6分類(Actions/Selection/Text inputs/Navigation/Containment/Communication)を採用。デジタル庁デザインシステム・LINE Design System・Shopify Polaris(検討時にSpotifyの参考として挙がったもの)の構成も、判断に迷う項目の置き場所を決める際の補助的な参考にした。

---

## 思想レイヤー(2ページ)

| # | ページ | 内容 |
|---|---|---|
| 1 | 原則比較 | HIGの3本柱・Materialの原則・WCAGのPOUR・NNの10ヒューリスティックを横断比較 |
| 2 | POUR解説 | 知覚可能・操作可能・理解可能・堅牢の4分類を軸にした横断解説(コンポーネント個票の「アクセシビリティ」欄の元ネタ) |

---

## トークン/ファウンデーションレイヤー(15ページ)

コンポーネント個別ではなく、あらゆるコンポーネントに横断的に効いてくる基礎ルール。視覚系のトークン→挙動系のトークン→入力・操作系、の順に並べている(HIG/Material/デジタル庁とも概ねこの順)。

2026-10-05、サイドバーでは2つのグループに分けた。「トークン / ファウンデーション」(思想比較・カラー・タイポグラフィ・文章・アイコン・レイアウト・シェイプ・エレベーション・ダークモード・アダプティブの10ページ)と、「トークン / インタラクション」(操作と反応: インタラクション状態・モーション・サウンド・入力方法・キーボードナビゲーションの5ページ)。後者はGoogle M3のFoundations › Interaction(Gestures・Inputs・States)とAppleのInputsの区分にあたる。ウィジェットはコンポーネントレイヤーのCommunicationへ移した。

| # | ページ | 備考 |
|---|---|---|
| 1 | ファウンデーションの思想比較(メタページ) | ✅ 完成済み(2026-09、SPEC No.041)。「Foundations」として何を扱うか自体が4系列で違う点を扱う概要ページ。GoogleのM3は「Foundations」と「Styles」を別セクションに分けている。2026-09、Appleのトップレベル6区分(Getting started/Foundations/Patterns/Inputs/Components/Technologies)と本サイトの層との対応図を追加(HIGのページデータ・M3のsitemap.xmlで直接確認) |
| 2 | カラー(配色・コントラスト基準) | ✅ 完成済み(2026-09、SPEC No.042)。Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、数値はGoogle公式のドキュメント・ソース(material-color-utilities等)で確認。2026-09、色の優先度(階層)の定義とアクセシビリティの指定・別定義の色(アクセント/リンク/エラー等)の比較・ダークモードのメモを追加 |
| 3 | タイポグラフィ(文字サイズ・行間) | ✅ 完成済み(2026-09、SPEC No.043)。Apple(HIGのページデータ)・W3C・NN groupは本文確認済み。Googleの数値はGoogle公式のGitHub上のドキュメント・トークン定義で確認。2026-09、四サイト比較図を「最小サイズと文字色の濃さ」に変更し、基準サイズの表示とタイプスケールの段階ごとの使用例を追加 |
| 4 | 文章・UXライティング | ✅ 完成済み(2026-10、SPEC No.060、/tokens/writing)。Apple(HIG Writing)はページデータ、GoogleはM3のContent designの本文が未確認のためMaterial Design 2のWritingのページデータ、W3C(2.4.6・2.4.2・3.3.2・3.1.5)・NN group(Plain Language・Tone of Voice・How Little Do Users Read?)は本文で確認。以前は横断ビューで扱う予定だったが、12のくくりにライティングがないため独立したページにした |
| 5 | アイコン(サイズ・スタイル) | ✅ 完成済み(2026-09、SPEC No.044)。Apple(HIGのページデータ)・W3C・NN groupは本文確認済み。Googleは4軸の仕様をdevelopers.google.comで本文確認、3スタイルの使い分けのみ間接確認 |
| 6 | レイアウト・スペーシング(余白・グリッド) | ✅ 完成済み(2026-09、SPEC No.045)。Apple(HIGのページデータ)・W3C・NN groupは本文確認済み。Googleはウィンドウサイズクラス・ペイン間隔を本文・ソースで確認、4dpグリッドとマージンのみ間接確認 |
| 7 | シェイプ・コーナーラジウス(角丸) | ✅ 完成済み(2026-09、SPEC No.046)。Appleは専用ページなし(同心の角丸の原則が複数ページに分散)。Googleの10段階はGoogle公式のドキュメント・ソースで確認 |
| 8 | エレベーション・階層表現(影・半透明素材) | ✅ 完成済み(2026-09、SPEC No.047)。Appleは専用ページなし(Materials・Dark Modeページで扱う)。Googleのレベル値はJetpack Composeのソースで確認 |
| 9 | ダークモード | ✅ 完成済み(2026-09、SPEC No.048)。Apple(HIGのページデータ)・W3C・NN groupは本文確認済み。Googleはダークテーマ・カラーのドキュメントで確認 |
| 10 | モーション/アニメーション(duration・イージング) | ✅ 完成済み(2026-10、SPEC No.049)。Apple(HIGのページデータ)・W3C・NN groupは本文確認済み。Googleの時間・イージング・スプリングはMaterial Components for AndroidのMotion.mdとJetpack ComposeのMotionTokensで確認 |
| 11 | サウンド(音フィードバック) | ✅ 完成済み(2026-10、SPEC No.050)。GoogleはM3に音のページがなく、Material Design 2のSoundページ(ページデータで本文確認)を掲載。参考として触覚(ハプティクス)のApple・Android比較を併載 |
| 12 | インタラクション状態(ホバー・フォーカス・プレス) | ✅ 完成済み(2026-10、SPEC No.051)。Googleの不透明度はJetpack ComposeのStateTokens(v0_210)、状態の原則はM2のページデータで確認。キーボードの移動順序・2.4.7は「キーボードナビゲーション」ページへ回す |
| 13 | アダプティブ/レスポンシブデザイン | ✅ 完成済み(2026-10、SPEC No.052、/tokens/adaptive)。Apple(HIG Layout・Tab bars・Split views)はページデータ、Google(カノニカルレイアウト・アダプティブナビゲーション)はAndroid Developersの本文、W3C(1.4.10・1.3.4)・NN group(Breakpoints in Responsive Design)は本文で確認。境界値・余白は「レイアウト・スペーシング」ページで扱う |
| 14 | 入力方法・ジェスチャー | ✅ 完成済み(2026-10、SPEC No.053、/tokens/input-methods)。Apple(HIG Gestures・Pointing devices)はページデータ、GoogleはM2のGesturesのページデータとAndroid Developersの本文、W3C(2.5.1・2.5.2・2.5.4・2.5.6・2.5.7)・NN group(Contextual Swipe)は本文で確認 |
| 15 | キーボードナビゲーション・フォーカス順序 | ✅ 完成済み(2026-10、SPEC No.054、/tokens/keyboard-navigation)。Apple(HIG Keyboards・Focus and selection)はページデータ、GoogleはM3に専用ページがなくAndroid Developers(Focus in Compose)の本文、W3C(2.1.1・2.1.2・2.1.4・2.4.1・2.4.3・2.4.7、APG)・NN group(Keyboard-Only Navigation)は本文で確認 |

---

## コンポーネントレイヤー(44ページ)

Material Designの伝統的な6分類(Actions / Selection / Text inputs / Navigation / Containment / Communication)に沿って再編。

### Actions ― 操作を起こす(3)
| # | ページ | 状態 |
|---|---|---|
| 1 | ボタン | ✅ 完成済み(タップ領域テーマ) |
| 2 | フローティングアクションボタン | ✅ 完成済み |
| 3 | リンク | ✅ 完成済み |

### Selection ― 選ぶ(10)
| # | ページ | 備考 |
|---|---|---|
| 1 | Selectionの選び方 | 個別コンポーネントではなく、6パーツ(チェックボックス/ラジオ/トグル/スライダー/チップ/プルダウン)の使い分けをまとめた導入ページ。新規の一次情報は持たず、各ページのAI解釈を統合したもの |
| 2 | チェックボックス | |
| 3 | ラジオボタン | |
| 4 | トグルスイッチ | |
| 5 | スライダー | |
| 6 | チップ(Chips) | Material Design発祥のパターン。他系列には同名コンポーネントはないが、Appleの「トークンフィールド」が近い概念として存在するため追加(当初のsitemapには無く、後日追加) |
| 7 | セレクト(プルダウン) | |
| 8 | セレクトの種類(プルダウン以外) | ドラムロール/ホイールピッカーなど、プルダウン以外の単一選択パターンをまとめたギャラリー的なページ(当初のsitemapには無く、後日追加) |
| 9 | メニュー(ドロップダウン・コンテキストメニュー) | ✅ 完成済み(2026-10、SPEC No.059、/components/selection/menu)。命令(操作)の一覧を扱い、値を選ぶ用途は「セレクト」ページ。Apple(HIG Menus・Context menus・Pull-down buttons)はページデータ、GoogleはMaterial Components for AndroidのMenu.mdとJetpack Composeのソース、W3C(APG Menu and Menubar・Menu Button)・NN group(Contextual Menus・Dropdowns)は本文で確認。使えない項目を隠すか薄くするか、コンテキストメニューにショートカットを出すかで、AppleとNN groupの意見が分かれる |。2026-10-05、Material 3のコンポーネント分類(MenusはSelection)に合わせてActionsから移動
| 10 | 日付ピッカー / タイムピッカー | Apple・Googleの全デザインパターン(8+6種)の一覧を含む(2026-09)。2026-10-05、Material 3のコンポーネント分類(Date pickers・Time pickersはSelection)に合わせてText inputsから移動(/components/selection/date-time-picker) |

備考: 「セグメントコントロール」は当初このSelectionカテゴリに分類していたが、タブとの役割の近さ・使い分けの需要から、Navigationカテゴリ(タブの隣)に移動した(2026-09)。

### Text inputs ― 入力する(5)
| # | ページ | 備考 |
|---|---|---|
| 1 | テキストフィールド | テキストエリア(複数行)の比較を統合 |
| 2 | 検索フィールド | 使用シーン(通常時〜終了の6シーン)ごとの比較を含む(2026-09) |
| 3 | カレンダー(スケジュール/予定表) | 「日付ピッカー」ページとは別に、月表示グリッドUIの比較として新設(2026-09) |
| 4 | エラー表示 | 検知したエラーの見せ方(文言・視覚表現・訂正案)。旧「エラー表示・フォームバリデーション」から改題(2026-09) |
| 5 | バリデーション | 検証を「いつ行うか」というタイミング・トリガーの比較。旧「エラー表示・フォームバリデーション」から分割・新設(2026-09) |

### Navigation ― 移動する(7)
| # | ページ | 備考 |
|---|---|---|
| 1 | タブ | |
| 2 | セグメントコントロール | 当初Selectionに分類していたが、タブとの使い分けの需要からこちらに移動(2026-09) |
| 3 | タブとセグメントの使い分け | タブとセグメントコントロールの違い・使い分けをまとめた比較ページ(当初のsitemapには無く、後日追加) |
| 4 | ナビゲーションバー | Appleの真の対応コンポーネントは「Tab Bars」(画面下部・3〜5行き先)。Googleの同名「Navigation bar」も同じ対象を指す |
| 5 | アプリバー | 戻るボタン+画面タイトルを持つ上部バー(Appleが元々「Navigation Bars」と呼んでいたもの)の4系列比較。「ナビゲーションバー」ページから独立(当初のsitemapには無く、後日追加)。2026-09、Googleの改称(トップアプリバー→アプリバー、2025年5月)に合わせてページ名を「トップバー」から変更。検索アプリバーの詳細はページ末尾のGoogle単独セクションにまとめ、4系列比較には含めない |
| 6 | パンくずリスト | Appleは専用コンポーネントを持たない(バック遷移スタックで代替)。Google/M3も専用コンポーネントが見当たらない |
| 7 | ページネーション | Appleの「Page Controls」(ドット表示)は固定枚数の画面切替用で、可変長リストの番号付きページネーションとは別物 |

備考: 「ドロワー/サイドナビ」は当初このNavigationカテゴリに分類していたが、「サイドシート」ページとの近接性から、ユーザーの了承のもとContainmentカテゴリに移動した(2026-09、ページ内容自体に変更はなし)。

### Containment ― まとめる・囲う(10)
| # | ページ | 備考 |
|---|---|---|
| 1 | ダイアログ(基本ダイアログ) | スクリム上に乗る中央寄せの小さいダイアログに絞った内容。Apple(Alerts)は検索結果による間接確認。Google(Dialogs、M2→M3の変更点を含む)はユーザー提供の公式ドキュメント(daialog.docx)で直接確認。W3C(Dialog(Modal) Pattern)・NN group(Confirmation Dialogs)は本文確認済み。2026-09、画面全体を占める変異体を「フルスクリーンダイアログ」ページへ分割 |
| 2 | フルスクリーンダイアログ | 画面全体を占め一連のタスクを完了させる変異体。「ダイアログ」ページから独立(2026-09、新規)。Google(Full-screen dialog)はdaialog.docxで直接確認。Apple(Modality/Sheets)は検索結果による間接確認。W3Cは「ダイアログ」ページと同一のDialog(Modal) Patternを準用。NN group(Modal & Nonmodal Dialogs、Wizards)は本文を直接取得して確認 |
| 3 | サイドシート | 旧ページ名「モーダルポップアップ」。Apple(Popovers)は検索結果による間接確認。Google(Side sheets)はユーザー提供の公式ドキュメント(SIDESHEET.docx)で直接確認。W3C(aria-haspopup)・NN group(UI Elements GlossaryのPopup/Overlay/Side Sheet項目)は本文確認済み。2026-09、下からせり出す半モーダルの内容を「ボトムシート」ページへ分割、あわせて「サイドシート」に改称 |
| 4 | ボトムシート | Apple(Sheets/デタント)は検索結果による間接確認。Google(Bottom sheets)はユーザー提供の公式ドキュメント(bottomsheets.docx)で直接確認。W3C(Dialog(Modal) Pattern準用)・NN group(Bottom Sheets記事)は本文確認済み。「サイドシート」ページから独立(2026-09) |
| 5 | ドロワー/サイドナビ | 当初Navigationカテゴリに分類していたが、「サイドシート」ページとの近接性からContainmentへ移動(2026-09、ページ内容自体に変更はなし)。GoogleのNavigation drawerは現役の詳細なガイドラインが存在する(navigationDrawer.docxで直接確認)。Appleはドロワー概念自体を持たず、iPadOS/macOS向けの常時表示Sidebarのみ存在 |
| 6 | カード | Appleに「カード」専用コンポーネントは見当たらず、近似概念のBoxesを掲載(間接確認)。Google(Cards、Elevated/Filled/Outlinedの3種類)はユーザー提供の公式ドキュメント(CARD.docx)で直接確認。W3C(article role)・NN group(Cards記事)は本文確認済み |
| 7 | リスト | Apple(Lists and Tables)は検索結果による間接確認。Google(Lists、M3 Expressiveの表現力豊かなリスト/スロット構造)はユーザー提供の公式ドキュメント(list.docx)で直接確認。W3C(list/listitem role)・NN group(Card View vs. List View)は本文確認済み |
| 8 | 表(データテーブル) | ✅ 完成済み(2026-10、SPEC No.057、/components/containment/table)。複数列で値を比べる表(1列の一覧は「リスト」)。Apple(HIG Lists and tables)はページデータ、GoogleはM3にページがなくMaterial Design 2のData tablesのページデータ、W3C(Tables Tutorial・1.3.1・APG Table/Sortable Table)・NN group(Data Tables・Mobile Tables)は本文で確認 |
| 9 | カルーセル | ✅ 完成済み(2026-10、SPEC No.058、/components/containment/carousel)。Appleは専用ページなし(Page controlsが最も近い)。GoogleはMaterial Components for AndroidのCarousel.md・Jetpack Composeのソース・Android Developersの本文、W3C(APG Carousel・2.2.2・WAI Carousels Tutorial)・NN group(Carousel Usability・Auto-Forwarding)は本文で確認 |
| 10 | アコーディオン(表示コントロール) | Apple(Disclosure Controls)は間接確認。GoogleはM1の独立コンポーネント(Expansion panel)がM3ではListに統合されたとみられる(間接確認)。W3C(Disclosure Pattern)・NN group(Accordions on Desktop)は本文確認済み |

### Communication ― 伝える・知らせる(9)
| # | ページ | 備考 |
|---|---|---|
| 1 | 情報伝達の使い分け | 個別コンポーネントではなく、Containment/Communication両カテゴリにまたがる9パーツ(サイドシート/ボトムシート/ダイアログ/フルスクリーンダイアログ/スナックバー/トースト/ツールチップ/アラート・バナー/アコーディオン)の使い分けをまとめた導入ページ。新規の一次情報は持たず、各ページのAI解釈を統合したもの。判断フローはユーザーの行動(アクションをさせる必要があるか)起点、○/△/✕の比較表を併設(当初のsitemapには無く、後日追加。2026-09、スナックバー・トーストの分割とアコーディオン追加にあわせて全面改訂) |
| 2 | スナックバー | ✅ 完成済み。Undo(元に戻す)アクションのパターンを含む。「スナックバー・トースト」ページから、Androidの実装として別APIである「トースト」を分割・独立(2026-09)。Apple(該当コンポーネントなし、近似のNotifications/バナー)は検索結果による間接確認。Google(Snackbar、Android Developers公式ページで前面/背面の使い分けを直接確認)・W3C(role="status"/"alert")・NN group(UI Elements Glossaryの「Snackbar (Toast)」項目、Indicators/Validations/Notifications記事)は本文確認済み |
| 3 | トースト | ✅ 完成済み。「スナックバー」ページから独立(2026-09、新規)。⚠ Material Design 3の公式コンポーネント一覧に「Toast」は存在しない(M1〜M2の「Snackbars & Toasts」がM3でSnackbarに統合・廃止。見落としではなく仕様通り、ユーザー指摘により2026-09にページ冒頭へ注記を追加)。Google欄はM3コンポーネントではなくAndroidのOSレベルAPI(プラットフォーム機能)として扱う。Google(Android Developers公式ページ、カスタムToastビューのAPI30非推奨を確認)・NN group(用語集に「Toast」単独の項目は存在せず「Snackbar (Toast)」の1項目であることを確認)は本文確認済み。W3Cは、role="status"の一般原則に加えAndroid実装固有の既知の課題(TalkBack非対応)を検索結果で確認。Appleはスナックバーページと同一の間接確認 |
| 4 | ツールチップ | ✅ 完成済み。W3C(WAI-ARIA Tooltip Pattern)・NN group(Tooltip Guidelines)は本文確認済み。Apple(UIKit Help Tag)・Google(Tooltips、プレーン/リッチの2種類)は検索結果による間接確認 |
| 5 | プログレスインジケーター | ✅ 完成済み(2026-09)。確定的(determinate)/不確定(indeterminate)の2状態。W3C(MDNのrole="progressbar")・NN group(「Progress Indicators...」、1秒未満は非表示・1〜10秒はスピナー・10秒超はバーという秒数目安)は本文確認済み。Apple・GoogleはSPAのため間接確認(GoogleはM3に5秒未満向けの新コンポーネント「Loading indicator」を追加) |
| 6 | アラート/バナー | ✅ 完成済み。ダイアログとの違い: 画面遷移を止めない・インライン表示。GoogleのBannerはM3の一覧になく、M2仕様を参考掲載(検索で非推奨傾向を確認)。W3C(role="alert"、role="alertdialog"と対比)・NN group(Indicators, Validations, and Notifications)は本文確認済み。Appleは該当なしに近い(検索結果による間接確認) |
| 7 | バッジ | ✅ 完成済み(2026-09)。4系列中もっとも専用ページが薄いコンポーネント。Google(M3のBadgesコンポーネント、小=ドット/大=数字最大4文字)のみ独立コンポーネントを持つ。Apple(Notifications/Tab Barsの2ページに分散、専用コンポーネントなし)・W3C(専用ARIAロールなし、ARIA14のaria-label手法を援用、本文確認済み)・NN group(UI Elements Glossaryの「Badge」項目、本文確認済み) |
| 8 | 空状態・ローディング状態 | ✅ 完成済み(2026-09)。Empty state / Loading state。AppleにもGoogleにも現行の「空状態」専用コンポーネントは存在せず(Apple=Writingページの文言指針、Google=旧世代M1のパターンページのみ)、一方でローディング側はApple「Loading」ページ・Google新設「Loading indicator」コンポーネントと手厚く、非対称であることを確認。NN group(空状態記事の3原則、Skeleton Screens 101の秒数目安)・W3C(MDNのaria-busy属性)は本文確認済み |
| 9 | ウィジェット(ホーム画面ウィジェット) | ✅ 完成済み(2026-10、SPEC No.055、/components/communication/widget)。Apple(HIG Widgets)はページデータ、GoogleはM3にページがなくAndroid Developersのウィジェットのデザインガイド・品質ガイドの本文で確認。W3Cは専用の基準なし(WAI-ARIAのwidgetは別の意味)。NN groupはMobile Microsessionsの本文で確認。2026-10-05、トークン/ファウンデーションレイヤーから移動(AppleのHIGではComponents › System experiencesに属し、情報を一目で伝える部品のため) |

---

## 横断ビュー(1ページ・自動生成)

「タグから見る」ページ1つで、各ページに付けた原則タグ・プロセスタグから逆引きで一覧を生成する(手で書く個別のページは持たない)。

✅ 完成済み(2026-10、SPEC No.056、/cross-view「タグから見る」)。各ページの原則タグ・プロセスタグを `preview-build/gen_tag_index.py` がビルド時に自動集計し、cross-view.jsx の TAG_INDEX を作り直す(手で編集しない)。カテゴリ×POURの件数図、タグを選んで関係ページを層ごとに表示する一覧、全ページのタグ一覧、タグ未設定ページの表示を持つ。プロセスタグは2026-10-04に12のくくりへ組み直した。ライティングは当初ここで扱う予定だったが、12のくくりにはないため、2026-10にトークン/ファウンデーションレイヤーの「文章・UXライティング」ページとして独立させた。

---

## 合計

**思想レイヤー 2 + トークン/ファウンデーションレイヤー 15 + コンポーネントレイヤー 44 + 横断ビュー 1 = 62ページ**(トップページ `index.jsx` を含めると63ページ。2026-10-05時点)

コンポーネントレイヤーの内訳: Actions 3 / Selection 10 / Text inputs 5 / Navigation 7 / Containment 10 / Communication 9。

2026-10-05の変更: メニューをActions→Selection、ウィジェットをトークン/ファウンデーション→Communicationへ移動。インタラクション状態・モーション・サウンド・入力方法・キーボードナビゲーションを「トークン / インタラクション」グループにまとめた(合計は変わらず)。同日、日付・タイムピッカーもText inputs→Selectionへ移動。

2026-10の追加分(58→62ページ): 抜け漏れの見直しで、Actionsに「メニュー」、Containmentに「表(データテーブル)」「カルーセル」、トークン/ファウンデーションレイヤーに「文章・UXライティング」を新規作成。

以下は2026-09以前の追加・変更の記録(当時の件数のまま残している)。

2026-09の追加分: 旧「エラー表示・フォームバリデーション」ページをSPEC No.023「エラー表示」とSPEC No.040「バリデーション」の2ページに分割(Text inputsカテゴリが4→6ページに)。ユーザーから「エラー表示とバリデーションは明確に違うものなので分けて記載してほしい」というフィードバックを受けたもの。

(2026-09時点の旧集計: 思想レイヤー 2 + トークン/ファウンデーションレイヤー 15 + コンポーネントレイヤー 38 = 55ページ。各カテゴリの実際の合計とずれていたため、上の最新の合計を正とする)

2026-09の追加分(55ページ、「スナックバー・トースト」を「スナックバー」「トースト」の2ページに分割したため+1): Communicationカテゴリが8ページに(スナックバー・トースト分割分)。

2026-09の追加分(54ページ、コンポーネントレイヤーの集計を36→37に訂正): Communicationに「情報伝達の使い分け」を新規追加(Selectionの選び方ページと同種の統合ガイド。サイドシート・ボトムシート・ダイアログ・フルスクリーンダイアログ・スナックバー・トースト・ツールチップ・アラート/バナーの7パーツを、「ユーザーに何を求めるか」を起点にした判断フローで整理)。あわせて、以前の集計(コンポーネントレイヤー38・全体55)が各カテゴリ件数の実際の合計(36)と食い違っていたため、37(このページ追加後の正しい値)に訂正した。

2026-09の追加分: Communicationに「ツールチップ」「アラート/バナー」の2ページを新規追加。ツールチップはW3C(Tooltip Pattern)・NN group(Tooltip Guidelines)を本文確認、Apple(UIKit Help Tag)・Google(プレーン/リッチの2種類)は検索結果による間接確認。アラート/バナーは、GoogleのBannerコンポーネントがM3の一覧に見当たらず(M2仕様を参考掲載)、W3Cのrole="alert"(本ページ)とrole="alertdialog"(ダイアログページ)の対比を軸に整理。

2026-09の追加分(52→53ページ): Containmentに「フルスクリーンダイアログ」を新規追加(「ダイアログ」ページから、画面全体を占める変異体を分割・独立)。「モーダルポップアップ」を「サイドシート」に改称(Google/NN groupの用語に合わせた変更、ページ数は変わらず)。「ドロワー/サイドナビ」をNavigationからContainmentカテゴリへ移動(ページ内容自体に変更なし、Navigation 8→7・Containment 6→8)。

2026-09の追加分(51→52ページ): Containmentに「ボトムシート」を追加(「モーダルポップアップ」ページから、下からせり出す半モーダルの内容を分割・独立)。Communicationに「スナックバー・トースト」を新規作成(Communicationカテゴリで最初に完成したページ)。

2026-09の追加分(48→51ページ): Selectionに「セレクトの種類(プルダウン以外)」を追加。Navigationに「セグメントコントロール」(Selectionから移動)・「タブとセグメントの使い分け」・「ナビゲーションバー」「ドロワー/サイドナビ」「パンくずリスト」「ページネーション」・「トップバー」(「ナビゲーションバー」ページから独立)を追加。

今回の整理内容:
- コンポーネントの分類を「アクション/選択・入力/ナビゲーション/表示・伝達」から、Material Designの伝統的な6分類(Actions/Selection/Text inputs/Navigation/Containment/Communication)に組み替え
- 旧「選択・入力」に混在していたテキスト系(テキストフィールド・検索・日付ピッカー・エラー表示)と選択系(チェックボックス・ラジオ・トグル・スライダー・セレクト・セグメント)を分離
- 旧「表示・伝達」をContainment(カード・リスト・ダイアログ・アコーディオンなど"囲う"もの)とCommunication(トースト・バッジ・アラートなど"知らせる"もの)に分離
- トークン/ファウンデーションレイヤーの並び順を、視覚系トークン→挙動系トークン→入力・操作系の順に整理(HIG/Material/デジタル庁の一般的な並びに準拠)
- ページ数・内容自体に変更はなし(46ページのまま)

---

## 抜け漏れの可能性(未確定・要判断)

今後の見直しで気づいた追加候補をここに書き足していく想定のセクションです。確定して該当レイヤーの表に移すまでは、ここに置いたままにします。

2026-10-04の見直しの結果: 候補のうち「表」「カルーセル」「メニュー」「文章・UXライティング」はページを作成した。ほかの候補(オンボーディング・ログイン/認証・ツールバー・元に戻す/削除の確認・ドラッグ&ドロップ・ポップオーバー・ステッパー)は、ユーザーの判断で作らないことにした。

保留中(比較材料はやや薄いが検討の余地あり):
- 通知(プッシュ通知・システム通知)
- 国際化・RTL対応
- 権限リクエストのタイミング(位置情報・カメラなど)
