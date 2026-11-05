"""公開版(docs/index.html)の各ページを、JavaScriptなしで本文が読める静的HTMLに書き出す。

使い方: python3 preview-build/prerender.py   (build_preview.py の最後でも自動で実行される)
出力:   docs/pages/index.html(トップ)、docs/pages/<パス>/index.html(各ページ)

- 公開サイトは、ブラウザがJavaScriptで本文を組み立てる作り(SPA)のため、AIのレビューや検索エンジンでは本文が読めない。
  そこで、ビルド時にChromeで各ページを実際に描画し、描画後のHTMLをそのまま保存する。
- URLに ?static=1 を付けて描画するため、ボタンのページのタブなど、押すまで出てこない中身もすべて展開される。
- 出力は圧縮しない(各ページの style 属性・<style> をそのまま残す)。
- サイト内リンク(/tokens/color など)は、静的版どうしの完全なURL(https://…/designsystem-port/pages/tokens/color/)に張り替える。
- Chromeは1回だけ起動し、同じ読み込みの中で全ページを順に表示して集める(shell.html の __DSP_STATIC__ の処理)。
- 各ページはスマホ用のカード(.dsp-mobile-only)とPC用の比較表(.dsp-desktop-only)を両方持つ。人が見たときに通常版と
  同じ見た目になるよう、静的版でも両方を書き出し、画面の幅で切り替える(860px未満=カード、860px以上=比較表)。
  文字だけで読むAIには同じ内容が2回見えるため、比較表の文字のほぼすべて(90%以上)がカード側にもある比較表には、
  「カードと同じ内容」という注記を画面には出さずに添える(mark_duplicate_views)。
"""
import html
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(HERE, "..", "docs")
INDEX = os.path.abspath(os.path.join(DOCS, "index.html"))
BASE = "/designsystem-port/"          # GitHub Pages のパス(https://izumikawaarisa2026.github.io/designsystem-port/)
SITE = "https://izumikawaarisa2026.github.io" + BASE
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")


def static_href(path):
    """静的版のURL。AIのツールでもたどれるよう、https:// から始まる完全なURLにする"""
    return SITE + "pages/" if path == "/" else SITE + "pages" + path + "/"


def render_all(n_pages):
    """Chromeを1回だけ起動し、全ページの描画後のHTMLをまとめて受け取る"""
    url = "file://" + INDEX + "?static=1"
    budget = 2000 + n_pages * 600
    r = subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
         f"--virtual-time-budget={budget}", "--window-size=1280,900", "--dump-dom", url],
        capture_output=True, timeout=900)
    dom = r.stdout.decode("utf8", "replace")
    m = re.search(r'<textarea id="dsp-static-dump">(.*?)</textarea>', dom, re.S)
    if not m:
        return None
    import json
    return json.loads(html.unescape(m.group(1)))


VOID_TAGS = {"br", "img", "hr", "input", "meta", "link", "source", "area", "col", "wbr"}


def find_elements(s, cls):
    """class に cls を含む要素の (開始位置, 終了位置) の一覧。同じタグの入れ子を数えて閉じタグを探す"""
    out = []
    for m in re.finditer(r'<(\w+)\b[^>]*\bclass="[^"]*\b' + cls + r'\b[^"]*"[^>]*>', s):
        tag, depth, pos = m.group(1), 1, m.end()
        for t in re.finditer(r"<(/?)(\w+)\b[^>]*?(/?)>", s[pos:]):
            if t.group(2) != tag or tag in VOID_TAGS:
                continue
            depth += -1 if t.group(1) else (0 if t.group(3) else 1)
            if depth == 0:
                out.append((m.start(), pos + t.end()))
                break
    return out


def text_chunks(fragment):
    """要素の中の文字のかたまり(SVGの図の中の文字は除く)"""
    t = re.sub(r"<svg\b.*?</svg>", "", fragment, flags=re.S)
    return [c for c in (html.unescape(x).strip() for x in re.split(r"<[^>]+>", t)) if c]


DUP_NOTE = ('<p class="dsp-static-dup-note">(ここからPC用の比較表です。上のスマホ用のカードと同じ内容を'
            '表の形にしたもので、新しい情報はありません)</p>')


def mark_duplicate_views(body):
    """カードと内容が重なる比較表の直前に、AI向けの注記(画面には出さない)を入れる。入れた数を返す"""
    mobile = find_elements(body, "dsp-mobile-only")
    desktop = find_elements(body, "dsp-desktop-only")
    if not mobile or not desktop:
        return body, 0
    mobile_text = " ".join(" ".join(text_chunks(body[a:b])) for a, b in mobile)
    dup = []
    for a, b in desktop:
        chunks = text_chunks(body[a:b])
        total = sum(len(c) for c in chunks)
        if total and sum(len(c) for c in chunks if c in mobile_text) / total >= 0.9:
            dup.append(a)
    for a in sorted(dup, reverse=True):
        body = body[:a] + DUP_NOTE + body[a:]
    return body, len(dup)


def main():
    src = open(INDEX, encoding="utf8").read()
    pages = re.findall(r'\{ id: "[^"]+", label: "([^"]+)", spec: "[^"]*", Component: \w+, path: "([^"]+)"', src)
    paths = {p for _, p in pages}
    # 外枠の共通CSS(shell.html の2つ目の <style>)
    shell_css = re.findall(r"<style>(.*?)</style>", src, re.S)[1]
    if not os.path.exists(CHROME):
        print("Chromeが見つからないため、静的HTMLの書き出しを省略しました(環境変数 CHROME で場所を指定できます)")
        return

    rendered = render_all(len(pages))
    if rendered is None:
        print("静的HTMLの書き出しに失敗しました(Chromeから描画結果を受け取れませんでした)")
        sys.exit(1)

    def work(item):
        label, path = item
        body = rendered.get(path)
        if not body:
            return path, None

        # サイト内リンクを静的版へ
        def fix(mm):
            href = mm.group(1)
            base, _, anchor = href.partition("#")
            if base in paths:
                return 'href="' + static_href(base) + ("#" + anchor if anchor else "") + '"'
            return mm.group(0)
        body = re.sub(r'href="(/[^"]*)"', fix, body)
        body, _ = mark_duplicate_views(body)
        h1 = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S)
        title = re.sub(r"<[^>]+>", "", h1.group(1)).strip() if h1 else label
        sub = re.search(r"<h1[^>]*>.*?</h1>\s*<p[^>]*>(.*?)</p>", body, re.S)
        desc = html.unescape(re.sub(r"<[^>]+>", "", sub.group(1))).strip() if sub else ""
        full_title = title if title == "DesignSystem Port" else title + " | DesignSystem Port"
        interactive = SITE + ("" if path == "/" else "#" + path)
        out = f"""<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(full_title)}</title>
<meta name="description" content="{html.escape(desc)}">
<!-- レビュー期間中(v1.0.0の正式リリースまで)は検索エンジンに載せない。正式リリース時に削除する -->
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap">
<style>{shell_css}
  .dsp-static-note {{ font-family: 'Jost', 'Noto Sans JP', sans-serif; font-size: 12px; color: #454C78; background: #F3F6FA; border-bottom: 1px solid #E1E3F0; padding: 8px 16px; }}
  .dsp-static-note a {{ color: #3A4FCF; }}
  /* AI向けの注記。文字としては読めるが、画面には出さない */
  .dsp-static-dup-note {{ position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; margin: 0; }}
  /* 静的版はJavaScriptが動かずハンバーガーメニューを開けないため、スマホ幅では固定のバーを隠し、
     サイドバー(<details>で開閉できる)を本文の上に全幅で表示する */
  @container dsp (max-width: 859px) {{
    .page-frame .sbn-toggle {{ display: none !important; }}
    .page-frame .dsp-page {{ padding-top: 0 !important; }}
    .page-frame .dsp-page > div {{ flex-direction: column !important; align-items: stretch !important; }}
    .page-frame .dsp-page > div > * {{ min-width: 0; max-width: 100%; }}
    .page-frame .sbn-desktop {{ display: block !important; width: 100% !important; height: auto !important; position: static !important; border-bottom: 1px solid #E1E3F0; }}
  }}
</style>
</head>
<body>
<!-- このファイルは preview-build/prerender.py が自動で書き出したもの。手で編集しない(元は requestDetails/ のJSX) -->
<div class="dsp-static-note">本文を読みやすく書き出した静的版です。タブの切り替えや動きのある見本は <a href="{interactive}">通常版</a> で確認できます。</div>
{body}
</body>
</html>
"""
        dest = os.path.join(DOCS, "pages") if path == "/" else os.path.join(DOCS, "pages", path.strip("/"))
        os.makedirs(dest, exist_ok=True)
        open(os.path.join(dest, "index.html"), "w", encoding="utf8").write(out)
        return path, len(out)

    results = [work(item) for item in pages]
    failed = [p for p, n in results if n is None]
    print(f"静的HTML: {len(results) - len(failed)} / {len(results)} ページを書き出しました(docs/pages/)")
    if failed:
        print("書き出せなかったページ:", failed)
        sys.exit(1)


if __name__ == "__main__":
    main()
