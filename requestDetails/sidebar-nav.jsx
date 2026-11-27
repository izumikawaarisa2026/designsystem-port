import React, { useState } from "react";

/**
 * サイト全体の共通サイドバー。
 * sitemap.md の構成(思想レイヤー/トークン・ファウンデーションレイヤー/コンポーネントレイヤー/横断ビュー)を
 * そのままナビゲーション構造として反映している。
 *
 * 参考にした他デザインシステムのサイトナビ:
 * - Material Design 3 / Apple HIG: 左サイドバーに折りたたみ可能なカテゴリツリー
 * - デジタル庁デザインシステム: 「基本要素」→「コンポーネント」の大分類が上から順に並ぶ構成
 * - Shopify Polaris: Foundations → Components → Patterns の順で、現在地がハイライトされる
 *
 * 実際のプロジェクトに組み込む際は、他ページから
 *   import SidebarNav, { NAV_SECTIONS } from "./sidebar-nav";
 * として読み込み、<SidebarNav currentPath="/components/actions/button" /> のように
 * 現在のページパスを渡す。パスの割り当てはClaude Code側でルーティング方式(Next.jsなど)に
 * 合わせて調整してよい。
 */

export const NAV_SECTIONS = [
  {
    title: "思想レイヤー",
    items: [
      { label: "原則比較", path: "/principles/comparison", built: true },
      { label: "アクセシビリティ", path: "/principles/accessibility", built: true },
      { label: "WCAGの達成基準", path: "/principles/wcag-criteria", built: true },
    ],
  },
  {
    title: "Foundation",
    items: [
      { label: "ファウンデーションの思想比較", path: "/tokens/overview", built: true },
      { label: "カラー", path: "/tokens/color", built: true },
      { label: "ダークモード", path: "/tokens/dark-mode", built: true },
      { label: "タイポグラフィ", path: "/tokens/typography", built: true },
      { label: "文章・UXライティング", path: "/tokens/writing", built: true },
      { label: "アイコン", path: "/tokens/icon", built: true },
      { label: "レイアウト・スペーシング", path: "/tokens/layout-spacing", built: true },
      { label: "レスポンシブデザイン", path: "/tokens/adaptive", built: true },
      { label: "シェイプ・コーナーラジウス", path: "/tokens/shape", built: true },
      { label: "エレベーション・階層表現", path: "/tokens/elevation", built: true },
    ],
  },
  {
    title: "Actions",
    items: [
      { label: "ボタン", path: "/components/actions/button", built: true },
      { label: "インタラクション状態", path: "/tokens/interaction-states", built: true },
      { label: "フローティングアクションボタン", path: "/components/actions/fab", built: true },
      { label: "リンク", path: "/components/actions/link", built: true },
    ],
  },
  {
    title: "Selection",
    items: [
      { label: "Selectionの選び方", path: "/components/selection/overview", built: true },
      { label: "チェックボックス", path: "/components/selection/checkbox", built: true },
      { label: "ラジオボタン", path: "/components/selection/radio", built: true },
      { label: "トグルスイッチ", path: "/components/selection/toggle", built: true },
      { label: "セレクトの種類", path: "/components/selection/select-patterns", built: true },
      { label: "セレクト(プルダウン)", path: "/components/selection/select", built: true },
      { label: "メニュー", path: "/components/selection/menu", built: true },
      { label: "チップ(Chips)", path: "/components/selection/chips", built: true },
      { label: "スライダー", path: "/components/selection/slider", built: true },
      { label: "日付/タイムピッカー", path: "/components/selection/date-time-picker", built: true },
    ],
  },
  {
    title: "Text inputs",
    items: [
      { label: "テキストフィールド・テキストエリア", path: "/components/text-inputs/text-field", built: true },
      { label: "エラー表示", path: "/components/text-inputs/validation", built: true },
      { label: "バリデーション", path: "/components/text-inputs/input-validation", built: true },
      { label: "検索フィールド", path: "/components/text-inputs/search-field", built: true },
    ],
  },
  {
    title: "Navigation",
    items: [
      { label: "Navigationの選び方", path: "/components/navigation/overview", built: true },
      { label: "タブバー", path: "/components/navigation/nav-bar", built: true },
      { label: "ドロワー/サイドナビ", path: "/components/containment/drawer", built: true },
      { label: "アプリバー", path: "/components/navigation/app-bar", built: true },
      { label: "パンくずリスト", path: "/components/navigation/breadcrumb", built: true },
      { label: "ページネーション", path: "/components/navigation/pagination", built: true },
      { label: "ウィザード(ステップ形式の入力)", path: "/components/text-inputs/wizard", built: true },
    ],
  },
  /* 2026-11-26 ⑩本人最終レビュー: 使う目的で分け直した(Navigation=画面・場所を移る / Switching=同じ画面の中で見せ方を変える / Overlay=今の画面の上に重ねて出す / Containment=まとめて並べて見せる / Communication=状態を伝える)。URLは変えていない */
  {
    title: "Switching",
    items: [
      { label: "タブとセグメントの使い分け", path: "/components/navigation/tabs-vs-segmented", built: true },
      { label: "タブ", path: "/components/navigation/tabs", built: true },
      { label: "セグメントコントロール", path: "/components/navigation/segmented-control", built: true },
      { label: "アコーディオン(表示コントロール)", path: "/components/containment/accordion", built: true },
    ],
  },
  {
    title: "Overlay",
    items: [
      { label: "オーバーレイの使い分け", path: "/components/containment/overview", built: true },
      { label: "モーダルダイアログ", path: "/components/containment/dialog", built: true },
      { label: "フルスクリーンダイアログ", path: "/components/containment/fullscreen-dialog", built: true },
      { label: "ボトムシート", path: "/components/containment/bottom-sheet", built: true },
      { label: "サイドシート", path: "/components/containment/side-sheet", built: true },
    ],
  },
  {
    title: "Containment",
    items: [
      { label: "カード", path: "/components/containment/card", built: true },
      { label: "リスト", path: "/components/containment/list", built: true },
      { label: "カルーセル", path: "/components/containment/carousel", built: true },
      { label: "表(データテーブル)", path: "/components/containment/table", built: true },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "情報伝達の使い分け", path: "/components/communication/overview", built: true },
      { label: "ステータスメッセージ", path: "/components/communication/alert", built: true },
      { label: "スナックバー(トースト)", path: "/components/communication/snackbar", built: true },
      { label: "ツールチップ", path: "/components/communication/tooltip", built: true },
      { label: "エンプティステート", path: "/components/communication/empty-state", built: true },
      { label: "プログレスインジケーター(ローディング)", path: "/components/communication/progress", built: true },
      { label: "スケルトンスクリーン(ローディング)", path: "/components/communication/loading", built: true },
      { label: "バッジ", path: "/components/communication/badge", built: true },
      { label: "ウィジェット", path: "/components/communication/widget", built: true },
    ],
  },
  {
    title: "Interaction",
    items: [
      { label: "入力方法・ジェスチャー", path: "/tokens/input-methods", built: true },
      { label: "モーション", path: "/tokens/motion", built: true },
      { label: "サウンド", path: "/tokens/sound", built: true },
    ],
  },
  {
    title: "Sitemap",
    items: [{ label: "タグから見る", path: "/cross-view", built: true }],
  },
];

const TOTAL_PAGES = NAV_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
const BUILT_PAGES = NAV_SECTIONS.reduce((sum, s) => sum + s.items.filter((i) => i.built).length, 0);

// PC版のサイドバーを閉じているか。ページを移っても保てるよう、ページの外とブラウザに覚えておく
const COLLAPSE_KEY = "dsp-sidebar-collapsed";
let collapsedMemo = null;
function readCollapsed() {
  if (typeof window !== "undefined" && window.__DSP_STATIC__) return false; // 静的版は常に開いた状態で書き出す
  if (collapsedMemo !== null) return collapsedMemo;
  try { collapsedMemo = window.localStorage.getItem(COLLAPSE_KEY) === "1"; } catch (e) { collapsedMemo = false; }
  return collapsedMemo;
}

// サイドバーの開閉アイコン(枠の左側に仕切りのあるパネルの絵)
function SidebarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <rect x="2" y="3" width="14" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="7" y1="3.5" x2="7" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function SidebarNav({ currentPath = "" }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsedState] = useState(readCollapsed);
  const setCollapsed = (v) => {
    collapsedMemo = v;
    setCollapsedState(v);
    try { window.localStorage.setItem(COLLAPSE_KEY, v ? "1" : "0"); } catch (e) { /* 保存できなくても開閉はできる */ }
  };
  const isStatic = typeof window !== "undefined" && window.__DSP_STATIC__;

  const nav = (
    <nav style={styles.nav} aria-label="サイト全体のナビゲーション">
      <a href="/" style={styles.homeLink}>
        <div style={styles.homeTitle}>DesignSystem Port</div>
        <div style={styles.homeNote}>(仮称)</div>
        <div style={styles.homeSub}>
          {BUILT_PAGES} / {TOTAL_PAGES} ページ公開
        </div>
      </a>

      {NAV_SECTIONS.map((section) => {
        const containsCurrent = section.items.some((i) => i.path === currentPath);
        return (
          <details key={section.title} open={containsCurrent} style={styles.group}>
            <summary style={styles.groupTitle}>{section.title}</summary>
            <ul style={styles.list}>
              {section.items.map((item) => {
                const active = item.path === currentPath;
                if (!item.built) {
                  return (
                    <li key={item.path}>
                      <span style={styles.linkUnbuilt}>
                        {item.label}
                        <span style={styles.unbuiltTag}>準備中</span>
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      style={{
                        ...styles.link,
                        ...(active ? styles.linkActive : {}),
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </nav>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@600&family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .sbn-toggle { display: none; }
        .sbn-rail { transition: width 0.2s ease; }
        .sbn-rail-nav { transition: opacity 0.15s ease, visibility 0.15s; }
        .sbn-icon-btn { width: 26px; height: 26px; padding: 0; border: none; border-radius: 6px; background: transparent; color: #7E86AC; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1; }
        .sbn-icon-btn:hover { background: #E3E8F1; color: #3A4FCF; }
        .sbn-rail-open { position: absolute; inset: 0; width: 100%; padding: 24px 0 0; border: none; background: transparent; color: #7E86AC; cursor: pointer; display: flex; justify-content: center; align-items: flex-start; z-index: 1; }
        .sbn-rail-open:hover { background: #E8ECF4; color: #3A4FCF; }
        .sbn-icon-btn:focus-visible, .sbn-rail-open:focus-visible { outline: 2px solid #3A4FCF; outline-offset: -2px; }
        @media screen and (prefers-reduced-motion: reduce) { .sbn-rail, .sbn-rail-nav { transition: none; } }
        @media (max-width: 859px) {
          .sbn-desktop { display: none !important; }
          .sbn-toggle { display: flex !important; }
          .dsp-page { padding-top: 52px; }
        }
      `}</style>

      {/* desktop persistent sidebar(閉じると細い帯だけになり、本文が広がる。帯のどこを押しても開く) */}
      <div
        className={"sbn-desktop sbn-rail" + (collapsed ? " is-collapsed" : "")}
        style={{ ...styles.desktopWrap, width: collapsed ? 44 : 248, overflowY: collapsed ? "hidden" : "auto" }}
      >
        {collapsed ? (
          <button className="sbn-rail-open" onClick={() => setCollapsed(false)} aria-label="メニューを開く" aria-expanded="false" title="メニューを開く">
            <SidebarIcon />
          </button>
        ) : (
          !isStatic && (
            <button className="sbn-icon-btn" style={{ position: "absolute", top: 24, right: 6 }} onClick={() => setCollapsed(true)} aria-label="メニューを閉じる" aria-expanded="true" title="メニューを閉じる">
              <SidebarIcon />
            </button>
          )
        )}
        <div className="sbn-rail-nav" style={{ width: isStatic ? "auto" : 248, opacity: collapsed ? 0 : 1, visibility: collapsed ? "hidden" : "visible" }}>
          {nav}
        </div>
      </div>

      {/* mobile top bar: logo mark (left) + hamburger (right) */}
      <div className="sbn-toggle" style={styles.mobileBar}>
        <div style={styles.logoBadge}>D</div>
        <div style={{ flex: 1 }} />
        <button style={styles.hamburgerIcon} onClick={() => setOpen(true)} aria-label="メニューを開く">
          ☰
        </button>
      </div>
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)}>
          <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setOpen(false)} aria-label="メニューを閉じる">
              ✕
            </button>
            {nav}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  desktopWrap: {
    width: 248,
    flexShrink: 0,
    height: "100vh",
    position: "sticky",
    top: 0,
    overflowY: "auto",
    background: "#F3F6FA",
  },
  mobileBar: {
    display: "none",
    alignItems: "center",
    gap: 10,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    padding: "0 14px",
    background: "linear-gradient(135deg, #3730A3, #2F6FED)",
    zIndex: 50,
  },
  hamburgerIcon: {
    background: "none",
    border: "none",
    color: "#FFFFFF",
    fontSize: 19,
    cursor: "pointer",
    padding: 4,
    lineHeight: 1,
  },
  logoBadge: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Unbounded', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    color: "#3730A3",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(16,32,43,0.35)",
    zIndex: 60,
    display: "flex",
  },
  drawer: {
    width: 280,
    maxWidth: "82vw",
    height: "100%",
    background: "#F3F6FA",
    overflowY: "auto",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    background: "none",
    border: "none",
    fontSize: 16,
    color: "#666D93",
    cursor: "pointer",
    padding: 6,
  },
  nav: { padding: "28px 20px 40px", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" },
  homeLink: { display: "block", textDecoration: "none", color: "inherit", marginBottom: 28 },
  homeTitle: {
    fontFamily: "'Unbounded', sans-serif",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0,
    backgroundImage: "linear-gradient(135deg, #3730A3, #2F6FED)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  homeNote: { fontSize: 10, color: "#666D93", marginTop: 1 },
  homeSub: { fontSize: 11, color: "#666D93", marginTop: 6 },
  group: { marginBottom: 2 },
  groupTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 12,
    fontWeight: 500,
    color: "#666D93",
    cursor: "pointer",
    padding: "8px 4px",
    listStyle: "none",
  },
  groupCount: {
    fontSize: 11,
    fontWeight: 400,
    color: "#666D93",
  },
  list: { listStyle: "none", margin: "0 0 10px", padding: 0 },
  link: {
    display: "block",
    textDecoration: "none",
    color: "#3E4570",
    fontSize: 13,
    fontWeight: 400,
    padding: "7px 12px",
    borderRadius: 8,
    lineHeight: 1.4,
  },
  linkActive: {
    background: "#FFFFFF",
    color: "#3A4FCF",
    fontWeight: 500,
  },
  linkUnbuilt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#666D93",
    fontSize: 13,
    padding: "7px 12px",
    lineHeight: 1.4,
    cursor: "default",
  },
  unbuiltTag: {
    fontSize: 10.5,
    color: "#666D93",
    flexShrink: 0,
  },
};
