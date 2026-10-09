import React from "react";
import SidebarNav from "./sidebar-nav";

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
    color: "#C2542A",
    position: "2つ以上の等幅セグメントからなる線形の集合。それぞれがボタンとして機能する",
    size:
      "数値による具体的なセグメントサイズの規定は見当たりませんが、全てのタップ可能な要素に適用される一般的なヒットターゲット基準(44×44pt)がここにも適用されるとしています。セグメントは幅が広いほどタップしやすいとしています。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "セグメントコントロールは、地図アプリの「マップ/交通機関/航空写真」の切り替えのように、異なる表示(ビュー)を切り替える際によく使われるとしています。コントロール内の全セグメントは同じ幅を持ち、テキストまたは画像のどちらかを含められます。",
    exceptions:
      "セグメントが多すぎると読み取りにくく操作に時間がかかるため、広い画面では約5〜7個まで、iPhoneでは約5個までを目安にするとしています(2026-10にHIGの本文で再確認)。全セグメントの幅が同じであるため、内容量が一部のセグメントだけ多い/少ないと見た目が崩れるとして、内容量を揃えることを推奨しています。1つのコントロール内でテキストと画像を混在させることも、一貫性を欠き分かりにくくなるため避けるべきとしています。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。全てのインタラクティブ要素に適用される最小44×44ptのタップ領域基準が、ここにも適用されると考えられます。",
    useCases: [
      "地図の表示切り替えのように、同じコンテンツの異なるビューを切り替える",
      "iPhoneでは5個以下のセグメントに収める",
      "セグメント間で内容量(文字数・画像の有無)を揃える",
    ],
    searchHint: "Limit the number of segments",
    url: "https://developer.apple.com/design/human-interface-guidelines/segmented-controls",
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
    color: "#2F7D6E",
    position: "単一選択・複数選択の2種類。2〜5個の選択肢に最適(5個超はチップを推奨)",
    size:
      "コンテナの高さは40dpです。角は完全な丸み(フル角丸)を持ちます(M2の「トグルボタン」から刷新)。具体的なセグメント幅や最小タップ領域のdp数値は確認できていません。",
    colorInfo:
      "色の値はデザイントークンを通して実装され、ダイナミックカラーにも対応しています。セグメントボタンは類似した部品(セグメント)の集合体であるため、輪郭線は背景との間で少なくとも3:1のコントラスト比を確保すべきとしています。選択状態はチェックマークアイコンと色の変化の両方で示すべきで、色だけに頼るべきではないとしています。",
    glossary: [
      { term: "単一選択 / 複数選択", desc: "セグメントボタンには2つの公式バリアントがある。単一選択はラジオボタンのように一度に1つだけ選択でき、複数選択はチェックボックスのように複数(またはゼロ)を選択できる。M2では「トグルボタン」という名称だったが、M3でこの2バリアントを持つ「セグメントボタン」として刷新された。" },
    ],
    stance:
      "セグメントボタンは、人々が選択肢を選んだり、表示を切り替えたり、要素を並べ替えたりするのを助けるコンポーネントで、アイコン・ラベルテキスト・またはその両方を含められるとしています。単一選択セグメントボタンは、複数のオプションから1つを選ぶ・ビューを切り替える・最大5つの要素を並べ替える場合に使うとしています(例: 飲料のサイズセレクター)。複数選択セグメントボタンは、選択が必須ではなく、何も選ばない状態も含め任意の数のオプションを同時に選べるとしています(例: レストラン検索の価格帯フィルタ)。",
    exceptions:
      "1つのセグメントボタンに5個を超えるセグメントを使うべきではなく、選択肢が5個を超える場合はチップなど別のコンポーネントの使用を検討すべきとしています。セグメントボタンは、ビューポートやフレームの端から十分な余白を確保すべきで、大きな画面幅いっぱいに広げることは避けるべきとしています(ラベル周りの余白が大きくなりすぎて使い勝手が悪化するため)。",
    accessibility:
      "操作可能(Operable) ― Tabキーで個々のセグメントにフォーカスが移り、最初のフォーカスは言語の方向に応じて最も左または最も右のセグメントに当たります。単一選択ではSpace/Enterキーでフォーカス中のセグメントを選択/選択解除し、複数選択でも同様のキーで各セグメントの選択状態を個別に切り替えます。アクセシビリティ上、単一選択セグメントボタンはラジオボタンと同じ「radiogroup」、複数選択はチェックボックスと同じ「checkbox」として扱われるとしています(Appleの地図アプリのような「表示切り替え」用途でも、Google独自の実装はTabsパターンではなくradiogroup/checkboxとして扱われる点に注意)。ラベルテキストのないアイコンのみのセグメントには、そのアクションを説明するアクセシビリティラベル(例: 通貨記号→「安価」)を用意すべきとしています。なお、Googleの実装はTabキーで各セグメントに移りますが、Webでradiogroupとして作るなら、Tabキーではグループに1回だけ止まり、中は矢印キーで移動します(W3C欄・APGのRadio Groupパターン)。",
    useCases: [
      "2〜5個の選択肢から1つを選ぶ、表示を切り替える、要素を並べ替える(単一選択)",
      "2〜5個の選択肢を、選択必須にせず複数(またはゼロ)選べるようにする(複数選択、例: 価格帯フィルタ)",
      "5個を超える選択肢にはチップなど別のコンポーネントを使う",
      "新しく作る場合は、後継の接続ボタングループ(Connected button groups)を検討する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/segmented-buttons/guidelines",
    urlSecondary: [
      { label: "Specs(最新版)", url: "https://m3.material.io/components/segmented-buttons/specs" },
      { label: "後継: Connected button groups", url: "https://m3.material.io/components/button-groups/guidelines" },
    ],
    confirmedNote: "使用法・M2からの変更点・単一選択/複数選択・配置・色のコントラスト・キーボード操作・フォーカス・アクセシビリティラベルの各セクションは2026-09時点で公式ページ本文を直接確認済み。具体的なセグメント幅などのspecs数値は未確認。",
    deprecated: true,
    deprecatedNote: "Material 3の表現力向上(Expressive)アップデート以降、セグメントボタンは推奨されなくなりました。公式には代わりに「接続ボタングループ(Connected button groups)」の使用が案内されています(機能はほぼ同じで、デザインが刷新されているとのことです)。",
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
    doc: "WCAG 4.1.2 / 2.1.1 / 2.5.8 / 2.5.5(WAI-ARIA Radio Group / Tabsパターン)",
    color: "#A3821F",
    position: "用途によって適切なARIAパターンが変わる、名前・役割・状態とキーボード操作性を求める一般基準の集合",
    size:
      "セグメントコントロール専用の数値基準はありませんが、一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求めます(どちらも例外あり。詳しくは「ボタン」ページのターゲットサイズの説明を参照)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、境界線や選択状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    stance:
      "セグメントコントロールが「フォーム内の1つの値を選ぶ」用途であればWAI-ARIAのRadio Groupパターン(役割はradiogroup/radio、矢印キーで移動)が、Appleの地図の例のように「表示コンテンツを切り替える」用途であればTabsパターン(role=tablist/tab/tabpanel)が適切と考えられます(AI解釈。W3Cはセグメントコントロールという部品を定めていないため)。いずれの場合も、名前・役割・状態が支援技術から取得できることを求めます(4.1.2)。なお、Google自身のセグメントボタン実装は、表示切り替え用途であってもTabsパターンではなく、単一選択=radiogroup・複数選択=checkboxとして扱われるとしており、用途で考えるか実装で考えるかによって当てはめが変わりうる点には注意が必要です。",
    exceptions:
      "標準的なHTMLのinput type=\"radio\"要素や、適切なARIAロールを持つカスタム実装であれば基準を満たします。用途(選択かビュー切替か)を誤ってARIAパターンを選ぶと、支援技術に正しく伝わらない点に注意が必要です。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 名前・役割・状態(4.1.2)に加え、矢印キーでのセグメント間移動などのキーボード操作性(2.1.1)、ターゲットサイズ(2.5)が関わります。",
    useCases: [
      "フォーム内の単一選択にはRadio Groupパターン(radiogroup/radio)を使う",
      "表示コンテンツの切り替えにはTabsパターン(tablist/tab/tabpanel)を使う",
      "矢印キーでセグメント間を移動できるようにする",
    ],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/radio/",
    urlSecondary: [{ label: "Tabsパターン", url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/" }],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="110" height="26" viewBox="0 0 110 26">
          <rect x="1" y="1" width="108" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="55" y="17" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">radiogroup / tablist</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、用途に応じた役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "専用記事なし",
    color: "#7A4F7E",
    position: "セグメントコントロール専用の設計ガイドライン記事は見当たらない",
    size: "数値基準は見当たりません。",
    colorInfo: "色についての数値基準は見当たりません。",
    stance:
      "セグメントコントロールそのものを主題にした専用の設計ガイドライン記事は確認できていません。トグルスイッチやチェックボックス・ラジオボタンとの使い分けを扱う記事の中で、関連コンポーネントとして触れられる程度です。",
    exceptions: "専用記事がないため、例外・許容ケースの記載も確認できていません。",
    accessibility: "―(専用の適合区分・設計根拠の提示は見当たりません)",
    useCases: ["(専用記事なし)ラジオボタン・トグルスイッチの原則(常に選択肢を可視化する、即時反映するなど)を踏まえて個別に判断する"],
    searchHint: "",
    url: "https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/",
    illustration: () => (
      <svg width="110" height="26" viewBox="0 0 110 26">
        <rect x="1" y="1" width="108" height="24" rx="6" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <rect x="1" y="1" width="36" height="24" rx="6" fill="#7A4F7E" />
      </svg>
    ),
    illustrationNote: "視覚デザインの規定はなく、系列識別色で図示",
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
      <span style={styles.glossaryNoteLabel}>用語メモ</span>
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
          <p style={styles.subtitle}>4つのガイドラインが、ボタン状に並ぶ選択コンポーネントとしてサイズ・色・アクセシビリティをどう定めているかを比較します</p>

          <div style={styles.warningBox}>
            <div style={styles.warningLabel}>⚠ 重要な注記(2026-09、Google/Material Design 3)</div>
            <p style={styles.warningText}>
              Material 3の表現力向上(Expressive)アップデート以降、<strong>セグメントボタンは推奨されなくなりました</strong>。Google公式には、代わりに<strong>「接続ボタングループ(Connected button groups)」</strong>の使用が案内されています(機能はほぼ同じで、デザインが刷新されているとのことです)。このページはこれまでの「セグメントボタン」としての情報を扱っています。Material 3の最新版を使う場合は、接続ボタングループの情報もあわせて確認することをおすすめします(下記Google欄の「後継: Connected button groups」リンクを参照)。他の3系列(Apple・W3C・Nielsen Norman Group)の情報には影響しません。
            </p>
          </div>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <SegmentedSwatch />
            <p style={styles.swatchNote}>横一列の等幅ボタン群。常に全ての選択肢を見せながら、1つ(または表示ビュー)を選ぶ。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              セグメントコントロールは、<strong>Appleが「表示(ビュー)の切り替え」を主な用途として説明する</strong>のに対し、<strong>Googleは「選択・表示切替・並べ替え」とやや広い用途</strong>で説明しており、両者で強調点が異なります。ラジオボタンと同じ「相互排他的な単一選択」を扱える点は共通しています。
            </p>
            <p style={styles.synthesisText}>
              公式ページ本文を確認したところ、<strong>Googleのセグメントボタンには単一選択・複数選択の2つの公式バリアント</strong>があることが判明しました。複数選択は、チェックボックスのように何も選ばない状態を含め任意の数を選べるもので、価格帯フィルタのような場面で使うとされています(「セレクト(プルダウン)」ページで確認した複数選択メニューと同様、Googleには複数選択に対応するSelection系コンポーネントが複数存在する点は興味深い共通項です)。
            </p>
            <p style={styles.synthesisText}>
              Appleは<strong>「iPhoneでは5個以下のセグメントに収めるべき」</strong>としており、Googleも<strong>「5個を超える場合はチップの使用を検討すべき」</strong>と明記しています。両社とも独立に近い数値の上限を示している点は、実務上の目安として信頼度が高いと言えます。
            </p>
            <p style={styles.synthesisText}>
              最も重要な発見は、<strong>Material 3の表現力向上(Expressive)アップデート以降、セグメントボタン自体がGoogle公式に「推奨されない」コンポーネントになった</strong>ことです(詳しくはページ冒頭の注記を参照)。アクセシビリティについては、<strong>用途によって当てはめるARIAパターンが変わる</strong>と考えられる(W3Cはセグメントコントロールを定めていないため、AI解釈)一方、Google自身の実装は表示切り替え用途でもTabsパターンではなくradiogroup/checkboxとして扱われるとしており、両者の視点の違いも見えてきました。Nielsen Norman Groupには専用記事がなく、4系列の中で最も情報が薄いコンポーネントです。
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
                <div style={styles.positionBadge}>{s.position}</div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="色">{s.colorInfo}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                <div style={styles.sourceFootRow}>
                  {s.searchHint && (
                    <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                  )}
                  <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
                </div>
                {s.urlSecondary && (
                  <div style={styles.secondaryLinks}>
                    {s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{sl.label} ↗</a>
                    ))}
                  </div>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
            <div style={styles.matrixScroll}>
              <div style={styles.matrixGrid}>
                <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
                <div style={styles.labelCell}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["選択・切り替え", "ナビゲーション"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
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
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#7E86AC", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
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
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
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
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
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
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
