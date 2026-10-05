# DesignSystem Port(仮称)

Apple(Human Interface Guidelines)・Google(Material Design)・W3C(WCAG)・Nielsen Norman Groupの4つの指針を、UIの部品・基礎ルールごとに比較し、AIによる統合見解(AI解釈)を添えたサイトです。

- 公開URL(GitHub Pages): https://izumikawaarisa2026.github.io/designsystem-port/
- 状態: **レビュー中(正式リリース前・v0.x)**。正式リリースはv1.0.0です。レビュー期間中は検索エンジンに載せない設定(noindex)にしています。

> 各公式サイトの文章は転載せず、要約・言い換えのみを掲載し、必ず公式ページへのリンクを添えています。数値などの最終判断は、リンク先の一次情報を確認してください。

## フォルダ構成

| 場所 | 中身 |
|---|---|
| `requestDetails/` | サイトの本体。1ページ=1つのJSXファイル(React)。見た目の指定(CSS)も各ファイルの中に、圧縮せずに書いてある |
| `requestDetails/CLAUDE.md` | サイトの方針・ページの作り方・デザイン仕様 |
| `requestDetails/sitemap.md` | 全ページの構成と状態 |
| `requestDetails/dev-changelog.md` | 制作中の細かい変更の記録 |
| `requestDetails/sidebar-nav.jsx` | 全ページ共通のサイドバー(ページの一覧と並び順もここで決まる) |
| `preview-build/` | 全ページを1つのHTMLに束ねるビルドの仕組み |
| `docs/index.html` | ビルドしたサイト(GitHub Pagesで公開する版)。**手で編集しない** |
| `reviews/` | レビューの進め方とレビュー表のひな形 |
| `CHANGELOG.md` | 版(バージョン)ごとの変更内容 |

## 修正のしかた

1. `requestDetails/` の該当ページのJSXを編集する(文章・数値は各ファイル上部の `SOURCES` などのデータ、見た目は下部の `styles`)。
2. ビルドする:

   ```sh
   python3 preview-build/build_preview.py
   ```

   `docs/index.html` が作り直されます(圧縮しないので、出力を見ても修正箇所を追えます)。
3. コミットしてpushすると、数分でGitHub Pagesに反映されます。

新しいページの追加方法は `preview-build/README.md` と `requestDetails/CLAUDE.md` を参照してください。

## 版(バージョン)とブランチの運用

| 版 | 内容 |
|---|---|
| v0.1.0 | レビュー開始版(全62ページ+トップ) |
| v0.2.0 | ① AIレビュー(1回目・Claude・ChatGPT・Gemini)の修正を反映 |
| v0.3.0 | ③ 本人レビュー(1回目)の修正を反映 |
| v0.4.0 | ⑤ AIレビュー(2回目)の修正を反映 |
| v0.5.0 | ⑦ 本人レビュー(2回目)の修正を反映 |
| v0.6.0 | ⑨ AI最終チェックの修正を反映(修正があれば) |
| v1.0.0 | ⑩ 本人最終レビューを経た完全FIX版(正式リリース。noindexを外す) |

- `main` ブランチ = GitHub Pagesで公開している版。レビューする人は常にここを見る。
- ステップごとの修正は `fix/r1-ai`・`fix/r1-owner`・`fix/r2-ai`・`fix/r2-owner`・`fix/final` のブランチで行い、プルリクエストで `main` に取り込む。プルリクエストの説明に、対応したレビュー表の行(ページ)と修正内容を書く。
- 取り込んだら版のタグ(例: `v0.2.0`)を付け、GitHubのReleasesに変更内容を書く。ステップの途中の小さな修正はパッチ番号(v0.2.1 …)。
- どの版にもタグから戻れるため、大きく作り直すときも安全に試せます。

レビューの詳しい手順は [`reviews/README.md`](reviews/README.md) を参照してください。
