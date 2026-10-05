"""各ページの「タグ」(原則タグ・プロセスタグ)を集めて、横断ビュー(cross-view.jsx)の TAG_INDEX を作り直す。
使い方: python3 preview-build/gen_tag_index.py [requestDetailsのパス]
  build_preview.py からも毎回呼ばれるので、通常は単独で実行する必要はない。
  cross-view.jsx の /*__TAG_INDEX_START__*/ 〜 /*__TAG_INDEX_END__*/ の間だけを書き換える。
"""
import re, sys, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
TARGET = "cross-view.jsx"
START, END = "/*__TAG_INDEX_START__*/", "/*__TAG_INDEX_END__*/"
# タグの配列: {["a", "b"].map((t) => (<span key={t} style={styles.tagPrinciple}>...
TAG_RE = re.compile(r'\{(\[[^\]]*\])\.map\(\(t\)\s*=>\s*\(\s*<span key=\{t\} style=\{styles\.(tagPrinciple|tagProcess)\}', re.S)


def nav_items(sidebar_src):
    """サイドバーの NAV_SECTIONS から (グループ名, ラベル, パス) を順に返す。"""
    out = []
    for sec in re.finditer(r'title: "([^"]+)",\s*items: \[(.*?)\]\s*,?\s*\}', sidebar_src, re.S):
        for label, path, built in re.findall(r'\{ label: "([^"]+)", path: "([^"]+)", built: (true|false) \}', sec.group(2)):
            out.append((sec.group(1), label, path, built == "true"))
    return out


def page_tags(src):
    principles, processes = [], []
    for arr, kind in TAG_RE.findall(src):
        tags = json.loads(arr)
        (principles if kind == "tagPrinciple" else processes).extend(tags)
    return principles, processes


def build_index(src_dir):
    sidebar_src = open(os.path.join(src_dir, "sidebar-nav.jsx"), encoding="utf8").read()
    by_path = {}
    for f in os.listdir(src_dir):
        if not f.endswith(".jsx") or f in ("sidebar-nav.jsx", TARGET):
            continue
        s = open(os.path.join(src_dir, f), encoding="utf8").read()
        m = re.search(r'<SidebarNav currentPath="([^"]*)"', s)
        if m:
            by_path[m.group(1)] = s
    index = []
    for group, label, path, built in nav_items(sidebar_src):
        if not built or path not in by_path:
            continue
        principles, processes = page_tags(by_path[path])
        index.append({"group": group, "label": label, "path": path, "principles": principles, "processes": processes})
    return index


def write_index(src_dir):
    index = build_index(src_dir)
    target = os.path.join(src_dir, TARGET)
    src = open(target, encoding="utf8").read()
    rows = ",\n".join("  " + json.dumps(p, ensure_ascii=False) for p in index)
    block = f"{START}\nconst TAG_INDEX = [\n{rows},\n];\n{END}"
    new = re.sub(re.escape(START) + r".*?" + re.escape(END), lambda _: block, src, flags=re.S)
    if new != src:
        open(target, "w", encoding="utf8").write(new)
    return index


if __name__ == "__main__":
    d = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "requestDetails")
    idx = write_index(d)
    print(f"{len(idx)} pages indexed ({sum(1 for p in idx if p['principles'] or p['processes'])} with tags)")
