import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Navigation / タブとセグメントの使い分け」ページ。
 *
 * タブとセグメントコントロールは、どちらも横一列に並ぶボタン状の見た目を持ち、
 * 「複数の選択肢から1つを選ぶ」という操作も共通するため混同されやすい。しかし
 * 「タブ」ページ・「セグメントコントロール」ページで確認した通り、Apple・Google
 * ともに両者を明確に区別しており、本質的な違いは「選ぶと何が起きるか」にある。
 * このページは基本的に、両ページのAI解釈を統合した比較・使い分けガイドであり、
 * 新規の一次情報の要約ではない(詳細はタブ・セグメントコントロールの各ページ側を参照)。
 *
 * 2026-09 追加調査: 「Nielsen Norman Groupはこの2つを比較して書いていないか」との
 * 質問を受け、nngroup.comを直接調査した。両者を正面から比較する専用記事は見当たら
 * なかったが、UI Elements Glossary(https://www.nngroup.com/articles/ui-elements-glossary/)
 * が「Segmented Button」と「Tab Bar」をそれぞれ別項目として定義しており、その定義の
 * 違い自体が使い分けの手がかりになるため、四系列比較の1つとして反映した(直接確認済み)。
 * また、視覚的な見分け方(セグメントコントロールは項目同士が1つの帯(トラック)で
 * つながっている一方、タブは項目同士が独立している)は、複数のUIデザイン解説記事で
 * 言及される一般的な観察であり、いずれか1系列の公式見解ではないため、AI解釈側の
 * 補助的な説明として扱い、系列別の主張としては記載していない。
 */

const COMPARE_ROWS = [
  { label: "選ぶと何が起きるか", tab: "別のコンテンツ領域(画面・セクション)に移動する", seg: "同じ場所の見え方や設定が変わる(移動はしない)" },
  { label: "Appleでの位置づけ", tab: "画面の中のタブに当たる専用の部品はない(Appleのタブバーは画面下部のアプリ全体のナビゲーションで、別の部品)", seg: "地図の「マップ/交通機関/航空写真」のように、同じデータの異なるビューを切り替える" },
  { label: "Googleでの位置づけ", tab: "コンテンツを画面・データセットのカテゴリに整理する", seg: "選択・表示切替・並べ替えを助ける(選択肢は2〜5個。5個を超えたらチップ)" },
  { label: "典型的な配置", tab: "画面の上部(コンテンツの見出しとして)", seg: "画面上部やツールバー内、フォームの一部として" },
  { label: "選択肢の数の目安", tab: "固定タブは4個まで、多い場合は横スクロール(Google)", seg: "iPhoneでは約5個まで(Apple)・5個を超えたらチップ(Google)" },
  { label: "切り替えるもの", tab: "内容のまとまり(別の一覧・別のセクション)。同じページの中でパネルを切り替える", seg: "同じ内容の見せ方・並び順・設定" },
  { label: "代表的なARIAパターン", tab: "role=\"tablist\"/\"tab\"/\"tabpanel\"", seg: "用途により role=\"radiogroup\"/\"radio\" または \"tablist\"/\"tab\"" },
];

const EXAMPLES = [
  { good: true, label: "タブが適切な例", text: "ニュースアプリの「おすすめ/フォロー中/話題」のように、それぞれ別のコンテンツ一覧に切り替わる場合" },
  { good: false, label: "セグメントが適切な例", text: "地図アプリの「マップ/交通機関/航空写真」のように、同じ地図データの見え方だけが変わる場合" },
  { good: true, label: "タブが適切な例", text: "設定画面の「アカウント/通知/プライバシー」のように、それぞれ独立したページに移動する場合" },
  { good: false, label: "セグメントが適切な例", text: "並べ替えの「新着順/人気順」のように、同じ一覧の表示順だけが変わる場合" },
];

function TabMock() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width="220" height="44" viewBox="0 0 220 44">
        <text x="40" y="20" fontSize="12" fill="#3A4FCF" fontWeight="700" textAnchor="middle" fontFamily="Jost, Noto Sans JP">おすすめ</text>
        <rect x="18" y="28" width="44" height="3" rx="1.5" fill="#3A4FCF" />
        <text x="115" y="20" fontSize="12" fill="#9EA4C4" textAnchor="middle" fontFamily="Jost, Noto Sans JP">フォロー中</text>
        <text x="185" y="20" fontSize="12" fill="#9EA4C4" textAnchor="middle" fontFamily="Jost, Noto Sans JP">話題</text>
      </svg>
      <span style={styles.mockCaption}>項目同士が独立している(trackなし)</span>
    </div>
  );
}

function SegmentedMock() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width="220" height="40" viewBox="0 0 220 40">
        <rect x="1" y="1" width="218" height="38" rx="19" fill="#F3F6FA" stroke="#D5D9EC" strokeWidth="1.4" />
        <rect x="5" y="5" width="68" height="30" rx="15" fill="#2F7D6E" />
        <text x="39" y="24" fontSize="11" fill="#FFFFFF" fontWeight="700" textAnchor="middle" fontFamily="Jost, Noto Sans JP">マップ</text>
        <text x="112" y="24" fontSize="11" fill="#565D8A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">交通機関</text>
        <text x="183" y="24" fontSize="11" fill="#565D8A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">航空写真</text>
      </svg>
      <span style={styles.mockCaption}>項目同士が1つの帯(track)でつながっている</span>
    </div>
  );
}

function VisualCompare() {
  return (
    <div style={styles.visualCard}>
      <div style={styles.visualGrid}>
        <div style={styles.visualItem}>
          <span style={{ ...styles.visualLabel, color: "#3A4FCF" }}>タブ</span>
          <TabMock />
        </div>
        <div style={styles.visualItem}>
          <span style={{ ...styles.visualLabel, color: "#2F7D6E" }}>セグメントコントロール</span>
          <SegmentedMock />
        </div>
      </div>
      <p style={styles.diagramNote}>見た目だけで見分ける簡単な手がかりは<strong>「項目同士が1つの帯(track)でつながっているか」</strong>です。つながっていればセグメントコントロール、項目が独立していればタブです。ただしこれは複数のUIデザイン解説で見られる一般的な観察であり、4系列いずれかの公式な判定基準ではない点に注意してください。</p>
    </div>
  );
}

function CompareTable() {
  return (
    <div style={styles.compareScroll}>
      <div style={styles.compareGrid}>
        <div style={{ ...styles.compareCell, ...styles.compareHeaderCell }} />
        <div style={{ ...styles.compareCell, ...styles.compareHeaderCell, ...styles.compareTabHeader }}>タブ</div>
        <div style={{ ...styles.compareCell, ...styles.compareHeaderCell, ...styles.compareSegHeader }}>セグメントコントロール</div>
        {COMPARE_ROWS.map((row, i) => (
          <React.Fragment key={i}>
            <div style={{ ...styles.compareCell, ...styles.compareLabelCell }}>{row.label}</div>
            <div style={{ ...styles.compareCell, ...styles.compareTextCell }}>{row.tab}</div>
            <div style={{ ...styles.compareCell, ...styles.compareTextCell }}>{row.seg}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function VennDiagram() {
  const tabOnly = ["内容のまとまり", "(別の一覧・セクション)の切替", "同じページ内でパネルを切替", "画面上部の配置が典型"];
  const segOnly = ["同じ場所に留まる", "見え方・設定・フィルタの切替", "並べ替えに近い操作感", "trackで項目が連結"];
  const shared = ["横一列のボタン状の見た目", "複数の選択肢から1つを選ぶ", "見た目が似て混同されやすい"];
  return (
    <div style={styles.vennCard}>
      <svg viewBox="0 0 520 300" style={{ width: "100%", maxWidth: 480, height: "auto", display: "block", margin: "0 auto" }}>
        <circle cx="195" cy="150" r="140" fill="#3A4FCF" fillOpacity="0.1" stroke="#3A4FCF" strokeWidth="2" />
        <circle cx="325" cy="150" r="140" fill="#2F7D6E" fillOpacity="0.1" stroke="#2F7D6E" strokeWidth="2" />
        <text x="110" y="55" fontSize="14" fontWeight="700" fill="#3A4FCF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">タブ</text>
        {tabOnly.map((line, i) => (
          <text key={i} x="105" y={88 + i * 19} fontSize="10" fill="#2E3457" textAnchor="middle" fontFamily="Jost, Noto Sans JP">{line}</text>
        ))}
        <text x="410" y="55" fontSize="14" fontWeight="700" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">セグメント</text>
        <text x="410" y="72" fontSize="14" fontWeight="700" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">コントロール</text>
        {segOnly.map((line, i) => (
          <text key={i} x="410" y={100 + i * 19} fontSize="10" fill="#2E3457" textAnchor="middle" fontFamily="Jost, Noto Sans JP">{line}</text>
        ))}
        <text x="260" y="140" fontSize="11" fontWeight="700" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">共通点</text>
        {shared.map((line, i) => (
          <text key={i} x="260" y={162 + i * 18} fontSize="9.5" fill="#454C78" textAnchor="middle" fontFamily="Jost, Noto Sans JP">{line}</text>
        ))}
      </svg>
      <p style={styles.diagramNote}>混同されやすい理由は、この図の重なり部分(共通点)が大きいためです。判断の決め手は、左右どちらか片方にしかない特徴、特に<strong>「選ぶと何が起きるか」</strong>にあります。</p>
    </div>
  );
}

function ExampleList() {
  return (
    <div style={styles.exampleGrid}>
      {EXAMPLES.map((ex, i) => (
        <div key={i} style={{ ...styles.exampleCard, borderLeftColor: ex.good ? "#2F7D6E" : "#3A4FCF" }}>
          <span style={{ ...styles.exampleLabel, color: ex.good ? "#2F7D6E" : "#3A4FCF" }}>{ex.label}</span>
          <p style={styles.exampleText}>{ex.text}</p>
        </div>
      ))}
    </div>
  );
}

const SYSTEM_VIEWS = [
  { key: "hig", name: "Apple", color: "#C2542A", text: "Tab BarsとSegmented Controlsを別々のガイドラインページで明確に区別している。タブバーは画面下部でアプリのトップレベルのセクション間を移動する専用のナビゲーション要素(画面の中のタブとは別の部品)、セグメントコントロールは同じデータの異なるビューを切り替えるための要素と位置づけている。" },
  { key: "material", name: "Google", color: "#2F7D6E", text: "TabsとSegmented buttonsを別コンポーネントとして扱っている。タブはコンテンツを画面・データセットのカテゴリに整理するもの、セグメントボタンは選択・表示切替・並べ替えを助けるものと説明している。" },
  { key: "wcag", name: "W3C", color: "#A3821F", text: "「タブ」「セグメントコントロール」という名称や専用roleでの区別は持たない。WAI-ARIAにはtablist/tabパターンはあるが、セグメントコントロール専用のroleは存在せず、挙動(パネルを切り替えるか、持続する選択状態を示すか)に応じてtablist/tabかradiogroup/radioのいずれかを選ぶ、と考えられる(AI解釈。W3Cはセグメントコントロールについて定めていない)。名称ではなく振る舞いで判断する点が特徴的。", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" },
  { key: "nn", name: "Nielsen Norman Group", color: "#7A4F7E", text: "両者を正面から比較した記事は見当たらないが、UI Elements Glossaryで「Segmented Button」と「Tab Bar」をそれぞれ別項目として定義している。Segmented Buttonは同じデータの異なるビューの切り替えやコンテンツの絞り込みに使う、Tab Barは利用可能な選択肢(タブ)の中から1つのパネルだけを選択的に表示するとしており、この定義の違いが使い分けの手がかりになる。", url: "https://www.nngroup.com/articles/ui-elements-glossary/" },
];

function SystemViews() {
  return (
    <div style={styles.systemGrid}>
      {SYSTEM_VIEWS.map((s) => (
        <div key={s.key} style={{ ...styles.systemCard, borderLeftColor: s.color }}>
          <span style={{ ...styles.systemName, color: s.color }}>{s.name}</span>
          <p style={styles.systemText}>{s.text}</p>
          {s.url && (<a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>)}
        </div>
      ))}
    </div>
  );
}

function FlowDiamond({ cx, cy, w, h, lines, stroke }) {
  const pts = `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
  const lh = 13;
  const startY = cy - ((lines.length - 1) * lh) / 2 + 4;
  return (
    <g>
      <polygon points={pts} fill="#FFFFFF" stroke={stroke} strokeWidth="1.8" />
      {lines.map((line, i) => (
        <text key={i} x={cx} y={startY + i * lh} fontSize="10.5" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">{line}</text>
      ))}
    </g>
  );
}

function FlowResult({ x, y, w, h, lines, color }) {
  const cx = x + w / 2, cy = y + h / 2;
  const lh = 14;
  const startY = cy - ((lines.length - 1) * lh) / 2 + 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} stroke={color} strokeWidth="1.6" />
      {lines.map((line, i) => (
        <text key={i} x={cx} y={startY + i * lh} fontSize="11.5" fontWeight="700" fill="#FFFFFF" textAnchor="middle" fontFamily="Jost, Noto Sans JP">{line}</text>
      ))}
    </g>
  );
}

function FlowTag({ x, y, text }) {
  return (
    <g>
      <rect x={x - 17} y={y - 10} width="34" height="18" rx="9" fill="#FFFFFF" stroke="#9EA4C4" strokeWidth="1.2" />
      <text x={x} y={y + 3} fontSize="9.5" fill="#565D8A" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{text}</text>
    </g>
  );
}

function FlowArrowH({ x1, x2, y }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - 7} y2={y} stroke="#9EA4C4" strokeWidth="1.6" />
      <polygon points={`${x2 - 10},${y - 5} ${x2},${y} ${x2 - 10},${y + 5}`} fill="#9EA4C4" />
    </g>
  );
}

function FlowArrowV({ y1, y2, x }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 7} stroke="#9EA4C4" strokeWidth="1.6" />
      <polygon points={`${x - 5},${y2 - 10} ${x},${y2} ${x + 5},${y2 - 10}`} fill="#9EA4C4" />
    </g>
  );
}

function DecisionFlow() {
  return (
    <div style={styles.flowCard}>
      <svg viewBox="0 0 640 460" style={{ width: "100%", maxWidth: 560, height: "auto", display: "block", margin: "0 auto" }}>
        <FlowArrowH x1={430} x2={490} y={50} />
        <FlowArrowV y1={88} y2={190} x={320} />
        <FlowArrowH x1={440} x2={485} y={230} />
        <FlowArrowV y1={270} y2={370} x={320} />

        <FlowDiamond cx={320} cy={50} w={220} h={76} stroke="#3A4FCF" lines={["選んだ結果、別のコンテンツ領域", "(画面・セクション)に移動する?"]} />
        <FlowResult x={490} y={25} w={140} h={50} color="#3A4FCF" lines={["タブ"]} />
        <FlowTag x={460} y={38} text="はい" />
        <FlowTag x={340} y={140} text="いいえ" />

        <FlowDiamond cx={320} cy={230} w={240} h={80} stroke="#2F7D6E" lines={["同じ場所に留まったまま、見え方・", "設定・フィルタだけが変わる?"]} />
        <FlowResult x={485} y={205} w={150} h={50} color="#2F7D6E" lines={["セグメントコントロール"]} />
        <FlowTag x={462} y={218} text="はい" />
        <FlowTag x={340} y={320} text="いいえ" />

        <FlowResult x={190} y={370} w={260} h={60} color="#7E86AC" lines={["タブ・セグメント以外", "(ラジオボタン等)を検討"]} />
      </svg>
      <p style={styles.diagramNote}>どちらの問いにも「いいえ」の場合は、そもそも「複数の選択肢から1つを選ぶ」という前提自体を見直すサインです。ラジオボタンやドロップダウンなど、他のSelectionコンポーネントも検討してください。</p>
    </div>
  );
}

export default function NavigationTabsVsSegmentedPage() {
  return (
    <div className="dsp-page" style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        * { box-sizing: border-box; }
        .dsp-inner { max-width: 560px; min-width: 0; margin: 0 auto; padding: 28px 16px 40px; }
        @media (min-width: 860px) {
          .dsp-inner { max-width: 820px; padding: 36px 24px 48px; }
        }
      `}</style>

      <div style={styles.layout}>
        <SidebarNav currentPath="/components/navigation/tabs-vs-segmented" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / タブとセグメントの使い分け</span>
            <span>SPEC No. 014</span>
          </div>

          <h1 style={styles.title}>タブとセグメントの使い分け</h1>
          <p style={styles.subtitle}>見た目が似ている2つのコンポーネントを、「選ぶと何が起きるか」という軸で比較します</p>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              タブとセグメントコントロールは、<strong>「横一列に並ぶボタン状の見た目」と「複数の選択肢から1つを選ぶ操作」が共通</strong>しているため混同されやすいコンポーネントです。しかしAppleは両者を明確に別のガイドラインページで扱っており、Googleも用途を分けて説明しています。
            </p>
            <p style={styles.synthesisText}>
              最も本質的な違いは<strong>「選ぶと何が起きるか」</strong>です。タブは<strong>内容のまとまり(別の一覧・別のセクション)を、同じページの中で切り替える</strong>ためのものです(W3CのAPGのTabsパターンも、同じページの中でパネルを切り替える部品として定義しています)。一方セグメントコントロールは<strong>同じ場所に留まったまま、見え方や設定を切り替える</strong>ためのもので、Appleの地図アプリの例(マップ/交通機関/航空写真)のように、移動はせず同じデータの見せ方だけが変わります。
            </p>
            <p style={styles.synthesisText}>
              迷ったときは、<strong>切り替えるものの意味</strong>で見分けます。<strong>内容のまとまり(別の一覧・別のセクション)ならタブ、同じ内容の見せ方・並び順・設定ならセグメントコントロール</strong>です。別のページへ移るなら、そもそもタブではなくナビゲーション(リンク)を使います。見た目だけで判断したい場合は、<strong>項目同士が1つの帯(track)でつながっているかどうか</strong>も手がかりになります(つながっていればセグメントコントロール)。
            </p>
          </div>

          <h2 style={styles.diagramTitle}>見た目の比較</h2>
          <VisualCompare />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>共通点・相違点</h2>
          <VennDiagram />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>比較表</h2>
          <CompareTable />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>判断フローチャート</h2>
          <DecisionFlow />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>具体例で見る使い分け</h2>
          <ExampleList />

          <h2 style={{ ...styles.diagramTitle, marginTop: 26 }}>四系列デザインシステム比較</h2>
          <SystemViews />

          <div style={styles.linksRow}>
            <a href="/components/navigation/tabs" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>タブ ↗</div>
              <div style={styles.linkCardDesc}>4系列比較の詳細ページ</div>
            </a>
            <a href="/components/navigation/segmented-control" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>セグメントコントロール ↗</div>
              <div style={styles.linkCardDesc}>4系列比較の詳細ページ</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["設計の原則・使い分け", "ナビゲーション", "選択・切り替え"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Nielsen Norman GroupのUI Elements Glossaryは直接確認済み)</span>
            <span>このページは主に「タブ」「セグメントコントロール」両ページの内容を統合した独自の整理です。Nielsen Norman Groupの用語定義のみ新規に直接確認して追加しました。系列別の詳細・公式リンクは各パーツのページを参照してください。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "14px 0 0", lineHeight: 1.6 },
  visualCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 22 },
  visualGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, justifyItems: "center" },
  visualItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10 },
  visualLabel: { fontSize: 13, fontWeight: 700 },
  mockCaption: { fontSize: 10, color: "#9EA4C4" },
  vennCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 22 },
  flowCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 22 },
  systemGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12, marginBottom: 24 },
  systemCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderLeft: "3px solid", borderRadius: 4, padding: "12px 14px" },
  systemName: { display: "block", fontSize: 12.5, fontWeight: 700, marginBottom: 6 },
  systemText: { fontSize: 11.5, lineHeight: 1.65, color: "#454C78", margin: "0 0 8px" },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  compareScroll: { overflowX: "auto", marginBottom: 22 },
  compareGrid: { display: "grid", gridTemplateColumns: "150px 1fr 1fr", minWidth: 640, border: "1px solid #E1E3F0" },
  compareCell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", fontSize: 12, lineHeight: 1.6 },
  compareHeaderCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, background: "#F8F9FD", color: "#171B36" },
  compareTabHeader: { color: "#3A4FCF" },
  compareSegHeader: { color: "#2F7D6E" },
  compareLabelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", background: "#F8F9FD" },
  compareTextCell: { color: "#2E3457" },
  exampleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10, marginBottom: 24 },
  exampleCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderLeft: "3px solid", borderRadius: 4, padding: "12px 14px" },
  exampleLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, fontWeight: 700, marginBottom: 6 },
  exampleText: { fontSize: 12, lineHeight: 1.6, color: "#454C78", margin: 0 },
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 24 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
