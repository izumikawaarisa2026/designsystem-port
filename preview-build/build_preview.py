"""requestDetails/*.jsx から、タブ付きプレビューHTMLを組み立てる。
使い方: python3 preview-build/build_preview.py [requestDetailsのパス] [出力html]
  引数省略時は ../requestDetails を読み、preview-build/preview.html と docs/index.html(GitHub Pages用)に出力する。
  出力は圧縮しない(各ページのJSX・CSSをそのまま束ねるだけなので、出力を見ても修正箇所を追える)。
"""
import re, sys, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "requestDetails")
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(HERE, "preview.html")
# GitHub Pages で公開する版(リポジトリの docs/index.html)。圧縮せず、プレビューと同じ中身をそのまま書き出す
PAGES_OUT = os.path.join(HERE, "..", "docs", "index.html")
SKIP = {"design-system-compare-desktop-matrix.jsx", "design-system-compare-prototype.jsx"}
# 以前のプレビューで「完成済み」扱いだったページ(パス)。それ以外はレビュー中。
DONE = set(json.load(open(os.path.join(HERE, "done_paths.json"))))

def convert(fname, src):
    name = re.search(r"export default function (\w+)", src).group(1)
    hooks = re.search(r'import React, \{([^}]*)\} from "react";', src)
    src = re.sub(r'^import .*?;\s*$', "", src, flags=re.M)
    src = src.replace("export default function " + name, "function " + name)
    src = re.sub(r"^export const ", "const ", src, flags=re.M)
    # 画面幅の@mediaを、プレビュー枠(container: dsp)基準のコンテナクエリに置き換える
    src = re.sub(r"@media\s*\(", "@container dsp (", src)
    # .dsp-mobile-only / .dsp-desktop-only の表示切り替えは shell.html 側の共通CSSで行う。
    # (各ページの「display: none」はインラインstyleのdisplay:flex等に負けて効かないため削除)
    src = re.sub(r"\s*\.dsp-(?:mobile|desktop)-only \{ display: (?:none|block); \}", "", src)
    head = f"const {{{hooks.group(1)}}} = React;\n" if hooks else ""
    return name, f"/* ================= {fname} ================= */\nconst {name} = (function () {{\n{head}{src}\nreturn {name};\n}})();\n"

# 横断ビューのタグ一覧を、最新の各ページのタグから作り直す
if os.path.exists(os.path.join(SRC, "cross-view.jsx")):
    sys.path.insert(0, HERE)
    from gen_tag_index import write_index
    write_index(SRC)

files = sorted(f for f in os.listdir(SRC) if f.endswith(".jsx") and f not in SKIP)
blocks, comp_of_path = [], {}
sidebar_src = open(os.path.join(SRC, "sidebar-nav.jsx"), encoding="utf8").read()
_, sb = convert("sidebar-nav.jsx", sidebar_src)
blocks.append(sb)
for f in files:
    if f == "sidebar-nav.jsx":
        continue
    s = open(os.path.join(SRC, f), encoding="utf8").read()
    name, b = convert(f, s)
    blocks.append(b)
    m = re.search(r'<SidebarNav currentPath="([^"]*)"', s)
    path = m.group(1) if m else ("/" if f == "index.jsx" else None)
    spec = re.search(r"SPEC No\. ([0-9.]+)", s)
    comp_of_path[path] = (name, spec.group(1) if spec else "")

# タブの並びはサイドバーの順(トップページを先頭に)
nav = re.findall(r'\{ label: "([^"]+)", path: "([^"]+)", built: (true|false) \}', sidebar_src)
pages = [{"id": "index", "label": "トップ", "spec": "", "comp": comp_of_path["/"][0], "path": "/", "fixed": "/" in DONE}]
missing = []
for label, path, built in nav:
    if built != "true":
        continue
    if path not in comp_of_path:
        missing.append(path); continue
    comp, spec = comp_of_path[path]
    pages.append({"id": path.strip("/").replace("/", "-"), "label": label, "spec": spec, "comp": comp, "path": path, "fixed": path in DONE})
extra = [p for p in comp_of_path if p not in {x["path"] for x in pages}]
if missing or extra:
    print("WARN missing:", missing, "not in sidebar:", extra)

pages_js = "const PAGES = [\n" + "".join(
    f'  {{ id: {json.dumps(p["id"])}, label: {json.dumps(p["label"], ensure_ascii=False)}, spec: {json.dumps(p["spec"])}, Component: {p["comp"]}, path: {json.dumps(p["path"])}, fixed: {str(p["fixed"]).lower()} }},\n'
    for p in pages) + "];\n"

shell = open(os.path.join(HERE, "shell.html"), encoding="utf8").read()
html = shell.replace("/*__PAGES_SOURCE__*/", "".join(blocks)).replace("/*__PAGES_LIST__*/", pages_js)
open(OUT, "w", encoding="utf8").write(html)
if len(sys.argv) <= 2:
    os.makedirs(os.path.dirname(PAGES_OUT), exist_ok=True)
    open(PAGES_OUT, "w", encoding="utf8").write(html)
print(f"{len(pages)} pages ({sum(p['fixed'] for p in pages)} done / {sum(not p['fixed'] for p in pages)} review)")

# 公開版の各ページを、JavaScriptなしで本文が読める静的HTMLにも書き出す(docs/pages/)。省略するときは --no-static
if len(sys.argv) <= 2 or "--no-static" not in sys.argv:
    if "--no-static" not in sys.argv and len([a for a in sys.argv[1:] if not a.startswith("--")]) == 0:
        sys.path.insert(0, HERE)
        import prerender
        prerender.main()
