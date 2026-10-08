import React, { useState } from "react";
import SidebarNav from "./sidebar-nav";

/**
 * 横断ビュー「タグから見る」ページ。
 *
 * 各ページの末尾に付けている「原則タグ」(POURなど)と「プロセスタグ」(フォーム入力・エラー処理など)を
 * 逆引きして、同じタグを持つページを一覧にする。sitemap.md の「横断ビュー(専用ページ0・自動生成)」に
 * あたるページで、一次情報は持たない(各ページのタグを集計しているだけ)。
 *
 * TAG_INDEX は手で編集しない。preview-build/gen_tag_index.py が、サイドバー(sidebar-nav.jsx)の並び順と
 * 各ページの tagsRow から作り直す(build_preview.py の実行時に毎回自動で更新される)。
 * タグを変えたいときは、各ページの tagsRow を直してからビルドする。
 */

/*__TAG_INDEX_START__*/
const TAG_INDEX = [
  {"group": "思想レイヤー", "label": "原則比較", "path": "/principles/comparison", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["設計の原則・使い分け"]},
  {"group": "思想レイヤー", "label": "アクセシビリティ", "path": "/principles/accessibility", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["設計の原則・使い分け"]},
  {"group": "トークン / ファウンデーション", "label": "ファウンデーションの思想比較", "path": "/tokens/overview", "principles": [], "processes": ["設計の原則・使い分け", "デザインの基礎"]},
  {"group": "トークン / ファウンデーション", "label": "カラー", "path": "/tokens/color", "principles": ["知覚可能(POUR)"], "processes": ["デザインの基礎"]},
  {"group": "トークン / ファウンデーション", "label": "タイポグラフィ", "path": "/tokens/typography", "principles": ["知覚可能(POUR)"], "processes": ["デザインの基礎"]},
  {"group": "トークン / ファウンデーション", "label": "文章・UXライティング", "path": "/tokens/writing", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)"], "processes": ["デザインの基礎", "エラー・確認", "入力・フォーム"]},
  {"group": "トークン / ファウンデーション", "label": "アイコン", "path": "/tokens/icon", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["デザインの基礎"]},
  {"group": "トークン / ファウンデーション", "label": "レイアウト・スペーシング", "path": "/tokens/layout-spacing", "principles": ["知覚可能(POUR)", "操作可能(POUR)"], "processes": ["デザインの基礎", "情報の整理・一覧"]},
  {"group": "トークン / ファウンデーション", "label": "シェイプ・コーナーラジウス", "path": "/tokens/shape", "principles": ["知覚可能(POUR)", "操作可能(POUR)"], "processes": ["デザインの基礎", "見つけやすさ・初めての案内"]},
  {"group": "トークン / ファウンデーション", "label": "エレベーション・階層表現", "path": "/tokens/elevation", "principles": ["知覚可能(POUR)", "操作可能(POUR)"], "processes": ["デザインの基礎"]},
  {"group": "トークン / ファウンデーション", "label": "ダークモード", "path": "/tokens/dark-mode", "principles": ["知覚可能(POUR)"], "processes": ["デザインの基礎"]},
  {"group": "トークン / ファウンデーション", "label": "アダプティブ/レスポンシブ", "path": "/tokens/adaptive", "principles": ["知覚可能(POUR)"], "processes": ["デザインの基礎"]},
  {"group": "トークン / インタラクション", "label": "インタラクション状態", "path": "/tokens/interaction-states", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"], "processes": ["デザインの基礎", "操作方法(タッチ・キーボード)"]},
  {"group": "トークン / インタラクション", "label": "モーション/アニメーション", "path": "/tokens/motion", "principles": ["操作可能(POUR)"], "processes": ["デザインの基礎"]},
  {"group": "トークン / インタラクション", "label": "サウンド", "path": "/tokens/sound", "principles": ["知覚可能(POUR)"], "processes": ["デザインの基礎", "通知・状態表示"]},
  {"group": "トークン / インタラクション", "label": "入力方法・ジェスチャー", "path": "/tokens/input-methods", "principles": ["操作可能(POUR)"], "processes": ["操作方法(タッチ・キーボード)", "見つけやすさ・初めての案内"]},
  {"group": "トークン / インタラクション", "label": "キーボードナビゲーション", "path": "/tokens/keyboard-navigation", "principles": ["操作可能(POUR)"], "processes": ["操作方法(タッチ・キーボード)", "ナビゲーション"]},
  {"group": "Actions", "label": "ボタン", "path": "/components/actions/button", "principles": ["知覚可能(POUR)", "操作可能(POUR)"], "processes": ["操作方法(タッチ・キーボード)"]},
  {"group": "Actions", "label": "フローティングアクションボタン", "path": "/components/actions/fab", "principles": ["操作可能(POUR)"], "processes": ["操作方法(タッチ・キーボード)"]},
  {"group": "Actions", "label": "リンク", "path": "/components/actions/link", "principles": ["知覚可能(POUR)", "理解可能(POUR)"], "processes": ["ナビゲーション"]},
  {"group": "Selection", "label": "Selectionの選び方", "path": "/components/selection/overview", "principles": [], "processes": ["設計の原則・使い分け", "選択・切り替え"]},
  {"group": "Selection", "label": "チェックボックス", "path": "/components/selection/checkbox", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["選択・切り替え", "入力・フォーム"]},
  {"group": "Selection", "label": "ラジオボタン", "path": "/components/selection/radio", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["選択・切り替え", "入力・フォーム"]},
  {"group": "Selection", "label": "トグルスイッチ", "path": "/components/selection/toggle", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["選択・切り替え", "入力・フォーム"]},
  {"group": "Selection", "label": "スライダー", "path": "/components/selection/slider", "principles": ["操作可能(POUR)"], "processes": ["選択・切り替え", "入力・フォーム"]},
  {"group": "Selection", "label": "チップ(Chips)", "path": "/components/selection/chips", "principles": ["操作可能(POUR)", "堅牢(POUR)"], "processes": ["選択・切り替え", "検索・絞り込み"]},
  {"group": "Selection", "label": "セレクト(プルダウン)", "path": "/components/selection/select", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["選択・切り替え", "入力・フォーム"]},
  {"group": "Selection", "label": "セレクトの種類(プルダウン以外)", "path": "/components/selection/select-patterns", "principles": [], "processes": ["選択・切り替え", "入力・フォーム"]},
  {"group": "Selection", "label": "メニュー", "path": "/components/selection/menu", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["段階的に見せる", "見つけやすさ・初めての案内"]},
  {"group": "Selection", "label": "日付/タイムピッカー", "path": "/components/selection/date-time-picker", "principles": ["操作可能(POUR)", "堅牢(POUR)"], "processes": ["入力・フォーム", "選択・切り替え"]},
  {"group": "Text inputs", "label": "テキストフィールド", "path": "/components/text-inputs/text-field", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["入力・フォーム"]},
  {"group": "Text inputs", "label": "検索フィールド", "path": "/components/text-inputs/search-field", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"], "processes": ["検索・絞り込み", "見つけやすさ・初めての案内"]},
  {"group": "Text inputs", "label": "カレンダー(スケジュール/予定表)", "path": "/components/text-inputs/calendar", "principles": ["操作可能(POUR)", "堅牢(POUR)"], "processes": ["情報の整理・一覧"]},
  {"group": "Text inputs", "label": "エラー表示", "path": "/components/text-inputs/validation", "principles": ["理解可能(POUR)", "知覚可能(POUR)"], "processes": ["エラー・確認", "入力・フォーム"]},
  {"group": "Text inputs", "label": "バリデーション", "path": "/components/text-inputs/input-validation", "principles": ["知覚可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["エラー・確認", "入力・フォーム"]},
  {"group": "Navigation", "label": "タブ", "path": "/components/navigation/tabs", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["ナビゲーション"]},
  {"group": "Navigation", "label": "セグメントコントロール", "path": "/components/navigation/segmented-control", "principles": ["操作可能(POUR)", "堅牢(POUR)"], "processes": ["選択・切り替え", "ナビゲーション"]},
  {"group": "Navigation", "label": "タブとセグメントの使い分け", "path": "/components/navigation/tabs-vs-segmented", "principles": [], "processes": ["設計の原則・使い分け", "ナビゲーション", "選択・切り替え"]},
  {"group": "Navigation", "label": "ナビゲーションバー", "path": "/components/navigation/nav-bar", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["ナビゲーション"]},
  {"group": "Navigation", "label": "アプリバー", "path": "/components/navigation/app-bar", "principles": ["知覚可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["ナビゲーション", "検索・絞り込み"]},
  {"group": "Navigation", "label": "パンくずリスト", "path": "/components/navigation/breadcrumb", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["ナビゲーション"]},
  {"group": "Navigation", "label": "ページネーション", "path": "/components/navigation/pagination", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["ナビゲーション", "情報の整理・一覧"]},
  {"group": "Containment", "label": "ダイアログ", "path": "/components/containment/dialog", "principles": ["操作可能(POUR)", "理解可能(POUR)"], "processes": ["エラー・確認"]},
  {"group": "Containment", "label": "フルスクリーンダイアログ", "path": "/components/containment/fullscreen-dialog", "principles": ["操作可能(POUR)", "理解可能(POUR)"], "processes": ["入力・フォーム"]},
  {"group": "Containment", "label": "サイドシート", "path": "/components/containment/side-sheet", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"], "processes": ["段階的に見せる"]},
  {"group": "Containment", "label": "ボトムシート", "path": "/components/containment/bottom-sheet", "principles": ["知覚可能(POUR)", "操作可能(POUR)"], "processes": ["段階的に見せる"]},
  {"group": "Containment", "label": "ドロワー/サイドナビ", "path": "/components/containment/drawer", "principles": ["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"], "processes": ["ナビゲーション"]},
  {"group": "Containment", "label": "カード", "path": "/components/containment/card", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["情報の整理・一覧"]},
  {"group": "Containment", "label": "リスト", "path": "/components/containment/list", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["情報の整理・一覧"]},
  {"group": "Containment", "label": "表(データテーブル)", "path": "/components/containment/table", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"], "processes": ["情報の整理・一覧", "検索・絞り込み"]},
  {"group": "Containment", "label": "カルーセル", "path": "/components/containment/carousel", "principles": ["操作可能(POUR)", "堅牢(POUR)"], "processes": ["情報の整理・一覧", "見つけやすさ・初めての案内"]},
  {"group": "Containment", "label": "アコーディオン(表示コントロール)", "path": "/components/containment/accordion", "principles": ["操作可能(POUR)", "理解可能(POUR)"], "processes": ["情報の整理・一覧", "段階的に見せる"]},
  {"group": "Communication", "label": "情報伝達の使い分け", "path": "/components/communication/overview", "principles": [], "processes": ["設計の原則・使い分け", "通知・状態表示"]},
  {"group": "Communication", "label": "スナックバー", "path": "/components/communication/snackbar", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["通知・状態表示", "エラー・確認"]},
  {"group": "Communication", "label": "トースト", "path": "/components/communication/toast", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["通知・状態表示"]},
  {"group": "Communication", "label": "ツールチップ", "path": "/components/communication/tooltip", "principles": ["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"], "processes": ["段階的に見せる", "見つけやすさ・初めての案内"]},
  {"group": "Communication", "label": "プログレスインジケーター", "path": "/components/communication/progress", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["通知・状態表示"]},
  {"group": "Communication", "label": "アラート/バナー", "path": "/components/communication/alert", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["通知・状態表示", "エラー・確認"]},
  {"group": "Communication", "label": "バッジ", "path": "/components/communication/badge", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["通知・状態表示"]},
  {"group": "Communication", "label": "空状態・ローディング状態", "path": "/components/communication/empty-state", "principles": ["知覚可能(POUR)", "堅牢(POUR)"], "processes": ["通知・状態表示", "見つけやすさ・初めての案内"]},
  {"group": "Communication", "label": "ウィジェット", "path": "/components/communication/widget", "principles": ["知覚可能(POUR)", "操作可能(POUR)"], "processes": ["デザインの基礎", "段階的に見せる"]},
];
/*__TAG_INDEX_END__*/

const POUR = [
  { tag: "知覚可能(POUR)", short: "知覚可能", en: "Perceivable", desc: "見る・聞くなど、情報を感じ取れること" },
  { tag: "操作可能(POUR)", short: "操作可能", en: "Operable", desc: "キーボードや指など、どの手段でも操作できること" },
  { tag: "理解可能(POUR)", short: "理解可能", en: "Understandable", desc: "内容と操作の仕方が分かること" },
  { tag: "堅牢(POUR)", short: "堅牢", en: "Robust", desc: "支援技術など、さまざまな環境で正しく伝わること" },
];
const POUR_TAGS = POUR.map((p) => p.tag);

/* プロセスタグ(12のくくり)。2026-10-04に、ページごとにばらばらだった26種類のタグをまとめ直し、
   同日、軸を「利用者が何をしたいか(作業・場面)」にそろえて組み直した。
   新しいページにタグを付けるときは、この12個から選ぶ(ここにないタグは下の「未定義のタグ」に表示される)。 */
const CATEGORIES = [
  { tag: "設計の原則・使い分け", icon: "◇", desc: "原則そのものや、似た部品の使い分けをまとめたページ" },
  { tag: "デザインの基礎", icon: "Aa", desc: "色・文字・余白・角丸・影・動き・音など、見た目と動きの土台" },
  { tag: "操作方法(タッチ・キーボード)", icon: "☝", desc: "タップ・ジェスチャー・キーボード・押せる大きさ" },
  { tag: "入力・フォーム", icon: "✎", desc: "文字や値を入力し、送信するまで" },
  { tag: "選択・切り替え", icon: "☑", desc: "選択肢から選ぶ・オン/オフを切り替える" },
  { tag: "検索・絞り込み", icon: "⌕", desc: "探す・フィルタで絞り込む" },
  { tag: "ナビゲーション", icon: "→", desc: "画面やページの間を移動する" },
  { tag: "情報の整理・一覧", icon: "≡", desc: "情報をまとめる・並べる" },
  { tag: "段階的に見せる", icon: "▸", desc: "必要になったときに、詳しい情報や操作を出す" },
  { tag: "見つけやすさ・初めての案内", icon: "✦", desc: "機能に気づかせる・初めての人に使い方を伝える" },
  { tag: "通知・状態表示", icon: "◔", desc: "お知らせ・進み具合・空の状態などを伝える" },
  { tag: "エラー・確認", icon: "!", desc: "間違いを伝える・取り消す・重要な操作を確かめる" },
];
const CATEGORY_TAGS = CATEGORIES.map((c) => c.tag);

/* サイドバーのグループを、サイトの3つの層にまとめる */
const LAYER_OF = (group) => (group === "思想レイヤー" ? "思想レイヤー" : group.startsWith("トークン") ? "トークン / ファウンデーション" : "コンポーネント");

const tagged = TAG_INDEX.filter((p) => p.principles.length || p.processes.length);
const untagged = TAG_INDEX.filter((p) => !p.principles.length && !p.processes.length);

function countTags(key) {
  const m = new Map();
  tagged.forEach((p) => p[key].forEach((t) => m.set(t, (m.get(t) || 0) + 1)));
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"));
}
const principleCounts = countTags("principles");
const processCounts = CATEGORIES.map((c) => [c.tag, tagged.filter((p) => p.processes.includes(c.tag)).length]);
const undefinedTags = countTags("processes").filter(([t]) => !CATEGORY_TAGS.includes(t));
const otherPrinciples = principleCounts.filter(([t]) => !POUR_TAGS.includes(t));
const pourCount = (tag) => (principleCounts.find(([t]) => t === tag) || [tag, 0])[1];
const groups = [...new Set(TAG_INDEX.map((p) => p.group))].filter((g) => g !== "横断ビュー");

/* 画像エリア: タグの見方 */
function TagLegend() {
  return (
    <div style={styles.legendRow}>
      <div style={styles.legendItem}>
        <span style={styles.tagPrinciple}>操作可能(POUR)</span>
        <div style={styles.legendText}><strong>原則タグ</strong>(濃い色)<br />そのページが主に関わる原則。WCAGのPOUR(知覚可能・操作可能・理解可能・堅牢)が中心</div>
      </div>
      <div style={styles.legendItem}>
        <span style={styles.tagProcess}>入力・フォーム</span>
        <div style={styles.legendText}><strong>プロセスタグ</strong>(薄い色)<br />そのページが役立つ作業や場面。12のくくり(入力・フォーム、ナビゲーション、エラー・確認など)から1〜3個</div>
      </div>
    </div>
  );
}

/* 図: 層・カテゴリ × POUR の件数 */
function PourHeatmap() {
  const max = Math.max(1, ...groups.flatMap((g) => POUR_TAGS.map((t) => tagged.filter((p) => p.group === g && p.principles.includes(t)).length)));
  return (
    <div style={styles.hmScroll}>
      <div style={styles.hmGrid}>
        <div style={styles.hmHead}>カテゴリ(ページ数)</div>
        {POUR.map((p) => (<div key={p.tag} style={{ ...styles.hmHead, textAlign: "center" }}>{p.short}<span style={styles.hmHeadEn}>{p.en}</span></div>))}
        {groups.map((g) => {
          const pages = tagged.filter((p) => p.group === g);
          return (
            <React.Fragment key={g}>
              <div style={styles.hmLabel}>{g}<span style={styles.hmLabelCount}>{pages.length}</span></div>
              {POUR_TAGS.map((t) => {
                const n = pages.filter((p) => p.principles.includes(t)).length;
                return (
                  <div key={t} style={styles.hmCell}>
                    <span style={{ ...styles.hmBox, background: n ? `rgba(60, 90, 115, ${0.12 + (n / max) * 0.78})` : "#F3F4F9", color: n / max > 0.45 ? "#FFFFFF" : n ? "#171B36" : "#B7BCDA" }}>{n || "―"}</span>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
        <div style={{ ...styles.hmLabel, fontWeight: 700, borderBottom: "none" }}>合計<span style={styles.hmLabelCount}>{tagged.length}</span></div>
        {POUR_TAGS.map((t) => (<div key={t} style={{ ...styles.hmCell, borderBottom: "none", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: "#171B36", fontSize: 12.5 }}>{pourCount(t)}</div>))}
      </div>
    </div>
  );
}

/* 12のくくりの一覧: 押すと下の一覧がそのくくりに切り替わる */
function CategoryGrid({ sel, onSelect }) {
  return (
    <div style={styles.catGrid}>
      {CATEGORIES.map((c) => {
        const n = (processCounts.find(([t]) => t === c.tag) || [c.tag, 0])[1];
        const on = sel === c.tag;
        return (
          <button key={c.tag} type="button" onClick={() => onSelect(c.tag)} aria-pressed={on} style={{ ...styles.catCard, ...(on ? styles.catCardOn : {}) }}>
            <span style={{ ...styles.catIcon, ...(on ? styles.catIconOn : {}) }}>{c.icon}</span>
            <span style={{ minWidth: 0, textAlign: "left" }}>
              <span style={styles.catName}>{c.tag}<span style={styles.catCount}>{n}</span></span>
              <span style={styles.catDesc}>{c.desc}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* 選んだタグを持つページを層ごとに並べる */
function TagResult({ sel }) {
  const isPrinciple = principleCounts.some(([t]) => t === sel);
  const hits = tagged.filter((p) => (isPrinciple ? p.principles : p.processes).includes(sel));
  const byLayer = ["思想レイヤー", "トークン / ファウンデーション", "コンポーネント"].map((l) => ({ layer: l, pages: hits.filter((p) => LAYER_OF(p.group) === l) })).filter((x) => x.pages.length);
  return (
    <div style={styles.resultBox} aria-live="polite">
      <div style={styles.resultHead}>
        <span style={isPrinciple ? styles.tagPrinciple : styles.tagProcess}>{sel}</span>
        <span style={styles.resultCount}>{hits.length}ページ</span>
      </div>
      {byLayer.map((x) => (
        <div key={x.layer} style={styles.resultLayer}>
          <div style={styles.resultLayerName}>{x.layer}</div>
          <div style={styles.resultList}>
            {x.pages.map((p) => (
              <a key={p.path} href={p.path} style={styles.resultCard}>
                <span style={styles.resultGroup}>{p.group}</span>
                <span style={styles.resultTitle}>{p.label}</span>
                <span style={styles.resultTags}>
                  {[...p.principles, ...p.processes].filter((t) => t !== sel).map((t) => (
                    <span key={t} style={p.principles.includes(t) ? styles.miniPrinciple : styles.miniProcess}>{t}</span>
                  ))}
                </span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* タグを選ぶと、そのタグを持つページを層ごとに並べる */
function TagExplorer() {
  const [sel, setSel] = useState(CATEGORIES[5].tag);
  const isStatic = typeof window !== "undefined" && window.__DSP_STATIC__;
  const chip = ([t, n], principle) => (
    <button key={t} type="button" onClick={() => setSel(t)} aria-pressed={!isStatic && sel === t}
      style={{ ...styles.chip, ...(principle ? styles.chipPrinciple : {}), ...(!isStatic && sel === t ? (principle ? styles.chipPrincipleOn : styles.chipOn) : {}) }}>
      {t}<span style={styles.chipCount}>{n}</span>
    </button>
  );
  return (
    <div>
      <div style={styles.chipGroupLabel}>プロセスタグ(12のくくり)― 作業や場面から探す</div>
      <CategoryGrid sel={isStatic ? null : sel} onSelect={setSel} />
      <div style={styles.chipGroupLabel}>原則タグ ― WCAGのPOURから探す</div>
      <div style={styles.chipRow}>{POUR_TAGS.map((t) => chip([t, pourCount(t)], true))}{otherPrinciples.map((c) => chip(c, true))}</div>
      {undefinedTags.length > 0 && (
        <p style={styles.warnNote}>12のくくりにない未定義のタグ: {undefinedTags.map(([t, n]) => `${t}(${n})`).join("・")}。各ページのタグを12のくくりから選び直してください。</p>
      )}

      {isStatic ? (
        // 静的HTMLの書き出し時は、すべてのタグの結果を並べる(押して切り替えられないため)
        [...CATEGORIES.map((c) => c.tag), ...POUR_TAGS, ...otherPrinciples.map(([t]) => t)].map((t) => <TagResult key={t} sel={t} />)
      ) : (
        <TagResult sel={sel} />
      )}
    </div>
  );
}

/* 全ページのタグ一覧(折りたたみ) */
function AllPagesTable() {
  return (
    <details style={styles.fold} open={typeof window !== "undefined" && window.__DSP_STATIC__ ? true : undefined}>
      <summary style={styles.foldSummary}>全ページのタグ一覧を開く({tagged.length}ページ。このページを除く)</summary>
      <div style={styles.foldBody}>
        {groups.map((g) => {
          const pages = tagged.filter((p) => p.group === g);
          if (!pages.length) return null;
          return (
            <div key={g} style={{ marginBottom: 12 }}>
              <div style={styles.allGroup}>{g}</div>
              {pages.map((p) => (
                <div key={p.path} style={styles.allRow}>
                  <a href={p.path} style={styles.allLink}>{p.label}</a>
                  <span style={styles.resultTags}>
                    {p.principles.map((t) => <span key={t} style={styles.miniPrinciple}>{t}</span>)}
                    {p.processes.map((t) => <span key={t} style={styles.miniProcess}>{t}</span>)}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </details>
  );
}

function TrendSummary() {
  const pourSorted = [...POUR].sort((a, b) => pourCount(b.tag) - pourCount(a.tag));
  const top = pourSorted[0], low = pourSorted[pourSorted.length - 1];
  const procSorted = [...processCounts].sort((a, b) => b[1] - a[1]);
  const topProc = procSorted.slice(0, 3);
  const fewProc = procSorted.filter(([, n]) => n > 0).slice(-2);
  return (
    <div style={styles.synthesisBox}>
      <div style={styles.synthesisLabel}>AI解釈 ― タグから見える傾向</div>
      <p style={styles.synthesisText}>
        全{TAG_INDEX.length}ページ(このページを除く)に、作業や場面を表す<strong>12のくくり(プロセスタグ)</strong>を1〜3個ずつ付けています。上位は<strong>{topProc.map(([t, n]) => `「${t}」(${n})`).join("・")}</strong>で、このサイトが部品を「どんな作業で使うか」の単位で比べていることが分かります。少ないのは{fewProc.map(([t, n]) => `「${t}」(${n})`).join("・")}です。
      </p>
      <p style={styles.synthesisText}>
        原則タグで最も多いのは<strong>「{top.short}」({pourCount(top.tag)}ページ)</strong>、最も少ないのは<strong>「{low.short}」({pourCount(low.tag)}ページ)</strong>です。比較の中心は、見え方や操作のしやすさ、支援技術への伝わり方に関わる基準です。
      </p>
      <p style={styles.synthesisText}>
        使い方としては、<strong>まず12のくくりから作業を選び、同じくくりのページを層をまたいで読む</strong>のがおすすめです。たとえば「入力・フォーム」では、テキストフィールド・選択部品・エラー表示・バリデーションを続けて確認できます。
      </p>
    </div>
  );
}

export default function CrossViewPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/cross-view" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>横断ビュー / タグから見る</span>
            <span>SPEC No. 056</span>
          </div>

          <h1 style={styles.title}>横断ビュー(タグから見る)</h1>
          <p style={styles.subtitle}>各ページの末尾に付けたタグを逆引きして、同じ原則・同じ作業に関わるページを、層やカテゴリをまたいで一覧にします</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>タグの見方</span>
            <TagLegend />
            <p style={styles.swatchNote}>このページは一次情報を持たず、各ページのタグを集計して自動で作っています。ページを追加したりタグを直したりすると、次のビルドでこの一覧にも反映されます。</p>
          </div>

          <TrendSummary />

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>カテゴリ × POUR ― どの原則に関わるページがどこに多いか</h2>
            <PourHeatmap />
            <p style={styles.chartNote}>数字は、そのカテゴリで該当する原則タグを持つページの数です(1ページに複数の原則タグが付くことがあります)。色が濃いほど多いことを示します。タグのないページは数えていません。</p>
          </div>

          <section style={styles.section}>
            <h2 style={styles.diagramTitle}>12のくくりから、関係するページを探す</h2>
            <p style={styles.diagramNote}>くくりやタグを押すと、それが付いたページを層ごとに並べます。カードの下の小さいタグは、そのページに付いているほかのタグです。数字はページ数です。</p>
            <TagExplorer />
          </section>

          <section style={styles.section}>
            <h2 style={styles.diagramTitle}>全ページのタグ一覧</h2>
            <AllPagesTable />
            {untagged.length > 0 && (
              <p style={styles.chartNote}>
                タグが付いていないページ({untagged.length}): {untagged.map((p, i) => (<React.Fragment key={p.path}>{i > 0 && "・"}<a href={p.path} style={styles.inlineLink}>{p.label}</a></React.Fragment>))}。12のくくりから選んでタグを付けてください。
              </p>
            )}
          </section>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(各ページのタグをビルド時に自動で集計)</span>
            <span>更新方針: タグは各ページ側で付ける → ビルド時にこの一覧を作り直す → 人が確認</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20 },
  swatchLabel: { display: "block", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  legendRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 },
  legendItem: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px" },
  legendText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.7 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  section: { marginBottom: 26 },
  hmScroll: { overflowX: "auto" },
  hmGrid: { display: "grid", gridTemplateColumns: "minmax(150px, 1.3fr) repeat(4, minmax(72px, 1fr))", minWidth: 470, border: "1px solid #E1E3F0", borderRadius: 4 },
  hmHead: { fontSize: 11, fontWeight: 700, color: "#171B36", padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD" },
  hmHeadEn: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 500, color: "#7E86AC" },
  hmLabel: { fontSize: 11.5, color: "#2E3457", padding: "6px 10px", borderBottom: "1px solid #EEF0F7", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 },
  hmLabelCount: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#7E86AC" },
  hmCell: { padding: "5px 8px", borderBottom: "1px solid #EEF0F7", borderLeft: "1px solid #EEF0F7", display: "flex", alignItems: "center", justifyContent: "center" },
  hmBox: { width: "100%", maxWidth: 64, height: 26, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, fontWeight: 600 },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: 8, marginBottom: 14 },
  catCard: { display: "flex", gap: 10, alignItems: "flex-start", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "9px 11px", cursor: "pointer", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" },
  catCardOn: { borderColor: "#3C5A73", boxShadow: "0 0 0 1px #3C5A73 inset", background: "#F3F6FA" },
  catIcon: { width: 28, height: 28, flexShrink: 0, borderRadius: 6, background: "#EEF1FA", color: "#3C5A73", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
  catIconOn: { background: "#3C5A73", color: "#FFFFFF" },
  catName: { display: "flex", alignItems: "baseline", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  catCount: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 600, color: "#7E86AC" },
  catDesc: { display: "block", fontSize: 10.5, lineHeight: 1.5, color: "#565D8A", marginTop: 2 },
  warnNote: { fontSize: 11, color: "#A33A2E", background: "#FBEFEC", borderRadius: 4, padding: "6px 9px", margin: "4px 0 10px" },
  chipGroupLabel: { fontSize: 11, fontWeight: 700, color: "#565D8A", margin: "4px 0 6px" },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  chip: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11.5, color: "#2E3457", background: "#EEF1FA", border: "1px solid #EEF1FA", borderRadius: 14, padding: "4px 10px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 },
  chipOn: { background: "#FFFFFF", borderColor: "#3C5A73", color: "#171B36", fontWeight: 700, boxShadow: "0 0 0 1px #3C5A73 inset" },
  chipPrinciple: { background: "#FFFFFF", borderColor: "#B7BCDA" },
  chipPrincipleOn: { background: "#171B36", borderColor: "#171B36", color: "#FFFFFF", fontWeight: 700 },
  chipCount: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, opacity: 0.75 },
  resultBox: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px", background: "#F8F9FD", marginTop: 6 },
  resultHead: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  resultCount: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: "#3C5A73" },
  resultLayer: { marginTop: 8 },
  resultLayerName: { fontSize: 11, fontWeight: 700, color: "#565D8A", marginBottom: 6 },
  resultList: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 210px), 1fr))", gap: 8 },
  resultCard: { display: "flex", flexDirection: "column", gap: 3, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "9px 11px", textDecoration: "none", color: "inherit" },
  resultGroup: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: "#7E86AC" },
  resultTitle: { fontSize: 13, fontWeight: 700, color: "#3A4FCF" },
  resultTags: { display: "flex", flexWrap: "wrap", gap: 4, marginTop: 2 },
  miniPrinciple: { fontSize: 9.5, padding: "1px 6px", borderRadius: 3, background: "#454C78", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace" },
  miniProcess: { fontSize: 9.5, padding: "1px 6px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace" },
  fold: { border: "1px solid #E1E3F0", borderRadius: 6, background: "#FFFFFF" },
  foldSummary: { cursor: "pointer", padding: "10px 12px", fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  foldBody: { padding: "4px 12px 12px" },
  allGroup: { fontSize: 11.5, fontWeight: 700, color: "#565D8A", borderBottom: "1px solid #E1E3F0", padding: "4px 0", marginBottom: 4 },
  allRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "2px 12px", alignItems: "center", padding: "5px 0", borderBottom: "1px dashed #EEF0F7" },
  allLink: { fontSize: 12, color: "#3A4FCF", textDecoration: "underline" },
  inlineLink: { color: "#3A4FCF", textDecoration: "underline" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
