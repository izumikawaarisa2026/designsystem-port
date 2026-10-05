# プレビューのビルド手順

`requestDetails/*.jsx` の全ページを1つのHTMLにまとめたプレビューを作る。ページの移動は各ページのサイドバー(SPはハンバーガーメニュー)で行う(2026-10-04に上部のタブバーは削除)。

## 使い方

```sh
python3 preview-build/build_preview.py
```

`preview-build/preview.html`(Claudeのアーティファクト用)と `docs/index.html`(GitHub Pagesで公開する版)ができる。どちらも圧縮しない。`preview.html` については、Claude Codeに「プレビューを公開して」と頼めば、
既存のアーティファクト(https://claude.ai/artifact/N5stN4Lth1zbkn755UnNXL)が同じURLで更新される。

## 仕組み

- プレビューに入るページは `requestDetails/sidebar-nav.jsx` の `NAV_SECTIONS` で決まる
  (`built: true` の項目のみ)。`index.jsx` が「トップ」として最初に表示される。
- URLの `#/パス`(例: `#/tokens/color`)で表示するページを指定できる。
- 新しいページは、`requestDetails` に `.jsx` を追加し、サイドバーで `built: true` にすれば自動で入る。
- `done_paths.json` は完成済みページの記録(ビルド時の件数表示にのみ使う)。
- 各ページの `@media (...)` はビルド時に `@container dsp (...)` に置き換わる。
  ページ枠の幅が860px未満ならSP表示になる(SP表示はブラウザの幅を狭めるか、スマートフォンで確認する)。
- ページ内の `<a href="/...">` をクリックすると、該当するページに切り替わる。
- `design-system-compare-*.jsx`(初期の試作)は対象外。
- 画面の外枠(ページ枠・共通CSS)は `shell.html` で編集する。
