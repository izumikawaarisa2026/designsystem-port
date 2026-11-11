"""サイト内の全ページの「名前」と「1文の説明」を集めて、page-parts.jsx の PAGE_INDEX を作り直す。
使い方: python3 preview-build/gen_page_index.py [requestDetailsのパス]
  build_preview.py からも毎回呼ばれるので、通常は単独で実行する必要はない。
  page-parts.jsx の /*__PAGE_INDEX_START__*/ 〜 /*__PAGE_INDEX_END__*/ の間だけを書き換える。
  「関連するページ」(RelatedPages)は、ここで作った名前と説明を表示する。

説明は、各ページの次のどれか(上ほど優先)から取る。
  1. const LEAD = "…";   2. SummaryCard の lead="…"   3. サブタイトル(<p style={styles.subtitle}>…</p>)
"""
import json, os, re, sys

from gen_tag_index import nav_items

HERE = os.path.dirname(os.path.abspath(__file__))
TARGET = "page-parts.jsx"
START, END = "/*__PAGE_INDEX_START__*/", "/*__PAGE_INDEX_END__*/"


def page_lead(src):
    for pat in (r'const LEAD = "([^"]+)"', r'\blead="([^"]+)"', r'<p style=\{styles\.subtitle\}>(.*?)</p>'):
        m = re.search(pat, src, re.S)
        if m:
            return re.sub(r"<[^>]+>|\{[^}]*\}", "", m.group(1)).strip()
    return ""


def build_index(src_dir):
    sidebar_src = open(os.path.join(src_dir, "sidebar-nav.jsx"), encoding="utf8").read()
    leads = {}
    for f in os.listdir(src_dir):
        if not f.endswith(".jsx") or f.startswith("design-system-compare"):
            continue
        s = open(os.path.join(src_dir, f), encoding="utf8").read()
        m = re.search(r'<SidebarNav currentPath="([^"]*)"', s)
        if m:
            leads[m.group(1)] = page_lead(s)
    index = {}
    for _group, label, path, built in nav_items(sidebar_src):
        if built:
            index[path] = {"label": label, "lead": leads.get(path, "")}
    return index


def write_index(src_dir):
    path = os.path.join(src_dir, TARGET)
    src = open(path, encoding="utf8").read()
    a, b = src.index(START) + len(START), src.index(END)
    body = "\nconst PAGE_INDEX = " + json.dumps(build_index(src_dir), ensure_ascii=False, indent=1) + ";\n"
    if src[a:b] != body:
        open(path, "w", encoding="utf8").write(src[:a] + body + src[b:])


if __name__ == "__main__":
    write_index(sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "requestDetails"))
