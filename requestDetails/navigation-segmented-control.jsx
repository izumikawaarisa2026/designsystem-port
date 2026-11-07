import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection } from "./page-parts";

/**
 * コンポーネントレイヤー「Navigation / セグメントコントロール」ページ。
 * 当初はSelectionカテゴリに分類していたが、タブと役割が近く比較・使い分けの
 * 需要が高いことから、タブと同じNavigationカテゴリに移動した(2026-09)。
 * ラジオボタンと似た「相互排他的な選択」の役割を持ちながら、ボタンのような見た目で
 * 横一列に並ぶ点が特徴。Appleでは「表示の切り替え」(ビュー切替)、Googleでは
 * 「選択・表示切替・並べ替え」とやや広い用途で説明されている。タブとの使い分けは
 * 「タブとセグメントの使い分け」ページを参照。
 *
 * Apple / W3C(WAI-ARIA)は公式ページ・仕様本文を直接取得して確認済み(2026-09)。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで検索結果による間接確認だったが、公式ページ本文(使用法・M2からの変更点・単一選択/
 * 複数選択・配置・行動・色のコントラスト・フォーカス・アクセシビリティラベルの各セクション)を
 * 確認できたため、その内容を反映済み(2026-09、MD3_text/segmentedbutton.docx)。これにより、
 * Material 3の表現力向上(Expressive)アップデート以降、セグメントボタンは推奨されなくなり、
 * 代わりに「接続ボタングループ(Connected button groups)」が案内されていることが判明したため、
 * ページ冒頭に注記を追加した。また、セグメントボタンには単一選択・複数選択の2つの公式
 * バリアントがあることも判明し、反映した(従来は単一選択の記載のみだった)。
 * Nielsen Norman Groupはセグメントコントロール専用の設計ガイドライン記事が見当たらないことを
 * 確認済み。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Segmented Controls",
    term: "Segmented control",
    color: "#C2542A",
    position: "2つ以上の等幅セグメントからなる線形の集合。それぞれがボタンとして機能する",
    size:
      "数値による具体的なセグメントサイズの規定は見当たらないが、全てのタップ可能な要素に適用される一般的なヒットターゲット基準(44×44pt)がここにも適用されるとしている。セグメントは幅が広いほどタップしやすいとしている。",
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      "セグメントコントロールは、地図アプリの「マップ/交通機関/航空写真」の切り替えのように、異なる表示(ビュー)を切り替える際によく使われるとしている。コントロール内の全セグメントは同じ幅を持ち、テキストまたは画像のどちらかを含められる。",
    exceptions:
      <>セグメントが多すぎると読み取りにくく操作に時間がかかるため、<Hl>広い画面では約5〜7個まで、iPhoneでは約5個まで</Hl>を目安にするとしている(2026-10にHIGの本文で再確認)。全セグメントの幅が同じであるため、内容量が一部のセグメントだけ多い/少ないと見た目が崩れるとして、内容量を揃えることを推奨している。1つのコントロール内でテキストと画像を混在させることも、一貫性を欠き分かりにくくなるため避けるべきとしている。</>,
    accessibility:
      <span><NoData>記載なし。</NoData>全てのインタラクティブ要素に適用される最小44×44ptのタップ領域基準が、ここにも適用されると考えられる。</span>,
    useCases: [
      "地図の表示切り替えのように、同じコンテンツの異なるビューを切り替える",
      "iPhoneでは5個以下のセグメントに収める",
      "セグメント間で内容量(文字数・画像の有無)を揃える",
    ],
    searchHint: "Limit the number of segments",
    url: "https://developer.apple.com/design/human-interface-guidelines/segmented-controls",
    refs: [
      { label: "Segmented Controls", url: "https://developer.apple.com/design/human-interface-guidelines/segmented-controls" },
    ],
    illustration: () => (
      <svg width="110" height="26" viewBox="0 0 110 26">
        <rect x="1" y="1" width="108" height="24" rx="6" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <rect x="1" y="1" width="36" height="24" rx="6" fill="#C2542A" />
        <line x1="37" y1="4" x2="37" y2="22" stroke="#C2542A" strokeWidth="1.2" />
        <line x1="73" y1="4" x2="73" y2="22" stroke="#C2542A" strokeWidth="1.2" />
        <text x="19" y="17" fontSize="9" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">A</text>
        <text x="55" y="17" fontSize="9" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">B</text>
        <text x="91" y="17" fontSize="9" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">C</text>
      </svg>
    ),
    illustrationNote: "3セグメント、左端が選択済み(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Segmented buttons",
    term: "Segmented button(単一選択・複数選択)",
    color: "#2F7D6E",
    position: "単一選択・複数選択の2種類。2〜5個の選択肢に最適(5個超はチップを推奨)",
    size:
      "コンテナの高さは40dp。角は完全な丸み(フル角丸)を持つ(M2の「トグルボタン」から刷新)。具体的なセグメント幅や最小タップ領域のdp数値は確認できていない。",
    colorInfo:
      "色の値はデザイントークンを通して実装され、ダイナミックカラーにも対応している。セグメントボタンは類似した部品(セグメント)の集合体であるため、輪郭線は背景との間で少なくとも3:1のコントラスト比を確保すべきとしている。選択状態はチェックマークアイコンと色の変化の両方で示すべきで、色だけに頼るべきではないとしている。",
    glossary: [
      { term: "単一選択 / 複数選択", desc: "セグメントボタンには2つの公式バリアントがある。単一選択はラジオボタンのように一度に1つだけ選択でき、複数選択はチェックボックスのように複数(またはゼロ)を選択できる。M2では「トグルボタン」という名称だったが、M3でこの2バリアントを持つ「セグメントボタン」として刷新された。" },
    ],
    stance:
      "セグメントボタンは、人々が選択肢を選んだり、表示を切り替えたり、要素を並べ替えたりするのを助けるコンポーネントで、アイコン・ラベルテキスト・またはその両方を含められるとしている。単一選択セグメントボタンは、複数のオプションから1つを選ぶ・ビューを切り替える・最大5つの要素を並べ替える場合に使うとしている(例: 飲料のサイズセレクター)。複数選択セグメントボタンは、選択が必須ではなく、何も選ばない状態も含め任意の数のオプションを同時に選べるとしている(例: レストラン検索の価格帯フィルタ)。",
    exceptions:
      <>1つのセグメントボタンに5個を超えるセグメントを使うべきではなく、<Hl>選択肢が5個を超える場合はチップなど別のコンポーネントの使用を検討すべき</Hl>としている。セグメントボタンは、ビューポートやフレームの端から十分な余白を確保すべきで、大きな画面幅いっぱいに広げることは避けるべきとしている(ラベル周りの余白が大きくなりすぎて使い勝手が悪化するため)。</>,
    accessibility:
      "操作可能(Operable) ― アクセシビリティ上、単一選択セグメントボタンはラジオボタンと同じ「radiogroup」、複数選択はチェックボックスと同じ「checkbox」として扱われるとしている(Appleの地図アプリのような「表示切り替え」用途でも、Google独自の実装はTabsパターンではなくradiogroup/checkboxとして扱われる点に注意)。ラベルテキストのないアイコンのみのセグメントには、そのアクションを説明するアクセシビリティラベル(例: 通貨記号→「安価」)を用意すべきとしている。",
    useCases: [
      "2〜5個の選択肢から1つを選ぶ、表示を切り替える、要素を並べ替える(単一選択)",
      "2〜5個の選択肢を、選択必須にせず複数(またはゼロ)選べるようにする(複数選択、例: 価格帯フィルタ)",
      "5個を超える選択肢にはチップなど別のコンポーネントを使う",
      "新しく作る場合は、後継の接続ボタングループ(Connected button groups)を検討する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/segmented-buttons/guidelines",
    refs: [
      { label: "Segmented buttons", url: "https://m3.material.io/components/segmented-buttons/guidelines" },
      { label: "Specs(最新版)", url: "https://m3.material.io/components/segmented-buttons/specs" },
      { label: "後継: Connected button groups", url: "https://m3.material.io/components/button-groups/guidelines" },
    ],
    confirmedNote: "使用法・M2からの変更点・単一選択/複数選択・配置・色のコントラスト・キーボード操作・フォーカス・アクセシビリティラベルの各セクションは2026-09時点で公式ページ本文を直接確認済み。具体的なセグメント幅などのspecs数値は未確認。",
    deprecated: true,
    deprecatedNote: "Material 3の表現力向上(Expressive)アップデート以降、セグメントボタンは推奨されなくなりました。公式には代わりに「接続ボタングループ(Connected button groups)」の使用が案内されている(機能はほぼ同じで、デザインが刷新されているとのこと)。",
    illustration: () => (
      <svg width="110" height="26" viewBox="0 0 110 26">
        <rect x="1" y="1" width="108" height="24" rx="12" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        <rect x="1" y="1" width="36" height="24" rx="12" fill="#2F7D6E" />
        <path d="M12 13l3 3 6-7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="55" y="17" fontSize="9" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">B</text>
        <text x="91" y="17" fontSize="9" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">C</text>
      </svg>
    ),
    illustrationNote: "単一選択セグメントボタン。選択済みセグメントにチェックマーク(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "該当コンポーネントなし(作るときはRadio GroupかTabsの型を使う)",
    term: <NoData>該当なし</NoData>,
    color: "#A3821F",
    position: <NoData>該当なし</NoData>,
    glossary: [
      { term: "作るときの型(AI解釈)", desc: "W3Cはセグメントコントロールという部品を定めていない。フォームの中で1つの値を選ぶ用途ならRadio Groupパターン(radiogroup/radio)、表示する内容を切り替える用途ならTabsパターン(tablist/tab/tabpanel)が近い。いずれも、名前・役割・状態が支援技術に伝わることが求められる(4.1.2)。Google自身の実装は、表示の切り替えでもradiogroup/checkboxとして扱うとしている。" },
    ],
    size: <NoData>該当なし</NoData>,
    colorInfo: <NoData>該当なし</NoData>,
    stance: <NoData>該当なし</NoData>,
    exceptions: <NoData>該当なし</NoData>,
    accessibility: <NoData>該当なし</NoData>,
    useCases: ["該当なし"],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/radio/",
    refs: [
      { kind: "apg", label: "APG: Radio Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/radio/" },
      { kind: "apg", label: "APG: 参考: APG Tabsパターン", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" },
      { kind: "sc", level: "A", label: "4.1.2 名前・役割・値", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" },
    ],
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "該当コンポーネントなし(用語集で定義のみ)",
    term: "Segmented control(用語集の定義のみ)",
    color: "#7A4F7E",
    position: <NoData>該当なし</NoData>,
    glossary: [
      { term: "用語集の定義", desc: "UI Elements Glossaryでは「Segmented Button(Segmented Control)」を、同じデータの見せ方の切り替えや、内容の絞り込みに使う、ボタンがつながった部品として定義している。設計の指針を述べた専用の記事はない。" },
    ],
    size: <NoData>該当なし</NoData>,
    colorInfo: <NoData>該当なし</NoData>,
    stance: <NoData>該当なし</NoData>,
    exceptions: <NoData>該当なし</NoData>,
    accessibility: <NoData>該当なし</NoData>,
    useCases: ["該当なし"],
    searchHint: "",
    url: "https://www.nngroup.com/articles/ui-elements-glossary/#Segmented-Button",
    refs: [
      { label: "該当コンポーネントなし(用語集で定義のみ)", url: "https://www.nngroup.com/articles/ui-elements-glossary/#Segmented-Button" },
      { label: "UI Elements Glossary: Tab Bar(タブとの違い)", url: "https://www.nngroup.com/articles/ui-elements-glossary/#Tab-Bar" },
    ],
  },
];

function InfoBox({ label, accent, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent ? { borderLeftColor: accent } : {}) }}>
      <span style={styles.exceptionLabel}>{label}</span>
      <div style={styles.exceptionText}>{children}</div>
    </div>
  );
}

function UseCaseList({ items }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={styles.useCaseItem}>{it}</li>))}
    </ul>
  );
}

function GlossaryNote({ items }) {
  return (
    <div style={styles.glossaryNoteBox}>
      <span style={styles.glossaryNoteLabel}>メモ</span>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function SegmentedSwatch() {
  const items = ["日", "週", "月"];
  return (
    <div style={{ display: "inline-flex", border: "2px solid #3A4FCF", borderRadius: 8, overflow: "hidden" }}>
      {items.map((label, i) => (
        <div
          key={label}
          style={{
            padding: "8px 20px", fontSize: 13, fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
            background: i === 0 ? "#3A4FCF" : "#FFFFFF",
            color: i === 0 ? "#FFFFFF" : "#2E3457",
            borderRight: i < items.length - 1 ? "1px solid #3A4FCF" : "none",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

/* Appleでのタブバーとの使い分け(No.039。HIG Segmented controls・Tab bars・Tab viewsの本文による) */
const APPLE_TAB_VS_SEG = [
  ["切り替えるもの", "アプリのまったく別のセクション(時計アプリのアラーム・ストップウォッチ・タイマーなど)", "密接に関係するサブビューや、同じ対象の表示(カレンダーの新規作成で「イベント」と「リマインダー」、ヘルスケアのグラフの期間)"],
  ["置く場所", "iOSは画面の下部、iPadOSは画面の上部近く。アプリのどの画面でも表示し続ける", "画面の中、ツールバー、インスペクタなど、対象の近く"],
  ["数の目安", "少ないほど移動しやすい。収まらないと「その他」タブになるので避ける", "iPhoneでは5個程度まで、広い画面では5〜7個程度まで"],
  ["押したときの働き", "移動だけ。今の画面への操作には使わない(操作はツールバー)", "選んだ状態を示すか、操作のボタンの集まり(macOSのメールの返信・全員に返信・転送)。1つのコントロールの中で両方を混ぜない"],
];

function AppleTabVsSegmented() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>Appleでの、タブバーとセグメントコントロールの使い分け</h2>
      <p style={styles.atvNote}>Appleでは、どちらも横に並んだ選択肢に見えますが、役割がはっきり分かれています。iOS・iPadOSには画面の中のタブ(Tab view)がないため、画面の中で関係のある表示を切り替えるときは、セグメントコントロールを使います。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.atvTable}>
          <thead><tr>{["", "タブバー(Tab bar)", "セグメントコントロール"].map((h) => (<th key={h} style={styles.atvTh}>{h}</th>))}</tr></thead>
          <tbody>{APPLE_TAB_VS_SEG.map((r) => (<tr key={r[0]}><td style={{ ...styles.atvTd, fontWeight: 700, whiteSpace: "nowrap" }}>{r[0]}</td><td style={styles.atvTd}>{r[1]}</td><td style={styles.atvTd}>{r[2]}</td></tr>))}</tbody>
        </table>
      </div>
      <p style={styles.atvNote}>4系列での使い分けは、<PageLink to="/components/navigation/tabs-vs-segmented">タブとセグメントの使い分け</PageLink>のページで比べています。</p>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "ボタンを横につなげて並べ、同じ場所の表示の仕方を切り替える部品です。";
const ABOUT = [
  { k: "目的・役割", v: "少ない選択肢(2〜5個)から1つを選び、同じ内容の見え方(表示形式・期間など)を切り替える" },
  { k: "よく使われる場面", v: "「日・週・月」の切り替え、リスト表示とグリッド表示の切り替え" },
  { k: "似た部品との違い", v: <>内容の違う画面へ切り替えるなら<PageLink to="/components/navigation/tabs">タブ</PageLink>(比べ方は<PageLink to="/components/navigation/tabs-vs-segmented">タブとセグメントの使い分け</PageLink>)</> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "選択肢はいくつまで並べてよい?",
    sides: [
      { who: "Apple", color: "#C2542A", t: "iPhoneでは約5個まで、広い画面では約5〜7個まで。多いと読み取りにくく、操作に時間がかかる" },
      { who: "Google", color: "#2F7D6E", t: "5個まで。5個を超えるならチップなど別の部品を検討する" },
    ],
    tip: "スマートフォンでは5個までにそろえれば、AppleとGoogleのどちらにも沿います。6〜7個を並べられるのはAppleの広い画面だけなので、選択肢が増えそうならチップやメニューに切り替えます。",
  },
];

export default function NavigationSegmentedControlPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        .dsp-mobile-only { display: block; }
        .dsp-desktop-only { display: none; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 980px; padding: 36px 24px 48px; }
          .dsp-mobile-only { display: none; }
          .dsp-desktop-only { display: block; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/components/navigation/segmented-control" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / セグメントコントロール</span>
            <span>SPEC No. 011</span>
          </div>

          <h1 style={styles.title}>セグメントコントロール</h1>
          <SummaryCard
            image={<><SegmentedSwatch /></>}
            imageNote={<>横一列の等幅ボタン群。常に全ての選択肢を見せながら、1つ(または表示ビュー)を選ぶ。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />

          <div style={styles.warningBox}>
            <div style={styles.warningLabel}>⚠ 重要な注記(2026-09、Google/Material Design 3)</div>
            <p style={styles.warningText}>
              Material 3の表現力向上(Expressive)アップデート以降、<strong>セグメントボタンは推奨されなくなりました</strong>。Google公式には、代わりに<strong>「接続ボタングループ(Connected button groups)」</strong>の使用が案内されています(機能はほぼ同じで、デザインが刷新されているとのことです)。このページはこれまでの「セグメントボタン」としての情報を扱っています。Material 3の最新版を使う場合は、接続ボタングループの情報もあわせて確認することをおすすめします(下記Google欄の「後継: Connected button groups」リンクを参照)。他の3系列(Apple・W3C・Nielsen Norman Group)の情報には影響しません。
            </p>
          </div>



          <AppleTabVsSegmented />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>W3CとNN groupには、セグメントコントロールに当たる項目はありません</strong>(W3Cは作るときの型、NN groupは用語の定義だけを「メモ」に載せています)。セグメントコントロールは、<strong>Appleが「表示(ビュー)の切り替え」を主な用途として説明する</strong>のに対し、<strong>Googleは「選択・表示切替・並べ替え」とやや広い用途</strong>で説明しており、両者で強調点が異なります。ラジオボタンと同じ「相互排他的な単一選択」を扱える点は共通しています。
            </p>
            <p style={styles.synthesisText}>
              <strong>Googleのセグメントボタンには単一選択・複数選択の2つの公式バリアント</strong>があります。複数選択は、チェックボックスのように何も選ばない状態を含め任意の数を選べるもので、価格帯フィルタのような場面で使うとされています。
            </p>
            <p style={styles.synthesisText}>
              Appleは<strong>「iPhoneでは5個以下のセグメントに収めるべき」</strong>としており、Googleも<strong>「5個を超える場合はチップの使用を検討すべき」</strong>と明記しています。両社とも独立に近い数値の上限を示している点は、実務上の目安として信頼度が高いと言えます。
            </p>
            <p style={styles.synthesisText}>
              最も重要な点は、<strong>Material 3の表現力向上(Expressive)アップデート以降、セグメントボタン自体がGoogle公式に「推奨されない」コンポーネントになった</strong>ことです(詳しくはページ冒頭の注記を参照)。アクセシビリティについては、<strong>用途によって当てはめるARIAパターンが変わる</strong>と考えられる(W3Cはセグメントコントロールを定めていないため、AI解釈)一方、Google自身の実装は表示切り替え用途でもTabsパターンではなくradiogroup/checkboxとして扱われるとしており、両者で考え方が異なります。
            </p>
          </div>
          <div className="dsp-mobile-only" style={styles.sourceList}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                </div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                <InfoBox label="参照ページ(公式)">
                  <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                </InfoBox>
                {s.searchHint && (
                  <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <div style={styles.matrixScroll}>
              <div style={styles.matrixGrid}>
                <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
                <div style={styles.labelCell}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <NoData>該当なし</NoData>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["選択・切り替え", "ナビゲーション"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(Apple・WAI-ARIA・Googleとも公式ページ本文を確認済み。Googleのセグメント幅などのspecs数値のみ未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはSegmented Controls本体へのリンクです。WCAGはWAI-ARIA Authoring Practices(Radio Group / Tabsパターン)、NN groupは関連記事(チェックボックス vs ラジオボタン)です。Googleは最新版(M3)の公式ページ(Segmented buttons)へリンクしており本文は確認済みですが、specsページ本文(セグメント幅などのdp数値)はまだ確認できていません。後継の「接続ボタングループ」へのリンクも併記しています。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  atvNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 10px" },
  atvTable: { width: "100%", minWidth: 640, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457", marginBottom: 10 },
  atvTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  atvTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  warningBox: { background: "#FFF6E5", borderLeft: "4px solid #B8860B", padding: "14px 18px", marginBottom: 20, borderRadius: "0 4px 4px 0" },
  warningLabel: { fontSize: 12.5, fontWeight: 700, color: "#8A6210", marginBottom: 6, letterSpacing: 0.2 },
  warningText: { fontSize: 12.5, lineHeight: 1.75, color: "#5A4419", margin: 0 },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#9EA4C4", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#9EA4C4", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#7E86AC", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#7E86AC" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  secondaryLinks: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
