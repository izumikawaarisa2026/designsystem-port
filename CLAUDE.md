# DesignSystem Port ― リポジトリの作業ルール

サイトの方針・ページの作り方・デザイン仕様は、次のファイルにまとめています。必ず読んでから作業してください。

@requestDetails/CLAUDE.md

## このリポジトリでの作業ルール

- ページを修正したら、必ず `python3 preview-build/build_preview.py` を実行して `docs/index.html` を作り直し、ソースと一緒にコミットする。`docs/index.html` を手で編集しない。
- CSS・JSXは圧縮・難読化しない(今後の大きな修正をしやすくするため)。ビルドは各ページを束ねるだけにしておく。
- `MD3_text/` と `requestDetails/_m3-research-notes.md` は公式の文章をそのまま写した資料なので、コミットしない(`.gitignore` で除外済み)。
- 版の付け方・ブランチの運用は `README.md` の「版(バージョン)とブランチの運用」、レビューの進め方は `reviews/README.md` に従う。
- レビュー表の正本はGoogleドライブのスプレッドシート。Claude Codeは、共有URL(CSVとして読む)か `reviews/inbox/` に置かれたCSVから指摘を読み、対応後は「総括」「見送った指摘と理由」「対応内容」「対応バージョン」「状態」の列を埋めたCSVを `reviews/inbox/` に出力する。
- AIのレビュー(①⑤⑨)の後は、3つのAIの指摘を読み比べ、一次情報で確かめてから採用・見送りを決める(AIの指摘にも誤りがあり得るため)。ステップと版の対応は `reviews/README.md` の表に従う。
- レビュー表のシートは「１回目レビュー表」(①〜④)・「２回目レビュー表」(⑤〜⑧)・「最終レビュー」(⑨〜⑩)。
- コミット・push・タグ付け・Releasesの作成は、ユーザーの指示があったときに行う。
