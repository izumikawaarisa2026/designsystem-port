import React from "react";
import SidebarNav from "./sidebar-nav";
import { TagLink, RefList, PageLink, KeyPoints } from "./page-parts";

/**
 * 思想レイヤー「アクセシビリティ」ページ(旧「POUR解説」を改称・再構成)。
 * POURはWCAG固有の枠組みだが、アクセシビリティという概念自体は他3系列にも存在するため、
 * 4系列の比較ページとして再構成し、その中でWCAGのPOUR(4原則・13ガイドライン)を
 * 詳しく解説する形にしている。各コンポーネントページの「アクセシビリティ」欄の元ネタでもある。
 *
 * データはすべて2026-09に一次情報を直接取得して確認済み。
 */

const FRAMEWORKS = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Accessibility",
    color: "#C2542A",
    items: [
      { name: "目指す3つの性質", desc: "使いやすい(Intuitive: なじみのある一貫した操作)・知覚できる(Perceivable: 視覚・聴覚・発話・触覚のどれか1つに頼らない)・合わせられる(Adaptable: システムの支援機能や利用者の設定に合わせて変わる)。" },
      { name: "Vision(視覚)", desc: "文字は200%以上に拡大できるようにする(watchOSは140%)。本文の既定は17pt・最小11pt(iOS/iPadOS)。文字のコントラストは、17ptまでは4.5:1、18pt以上か太字(大きさを問わない)なら3:1(WCAG AAの値を目安にしているが、大きさは画面の単位ptで示しており、WCAGの「大きな文字」の条件とは別)。色だけに頼らず形やアイコンを添え、VoiceOver向けに画面の内容を説明する。" },
      { name: "Hearing(聴覚)", desc: "字幕・音声解説・書き起こしなど、文字で受け取れる手段を用意する。音の合図には触覚(ハプティクス)や画面上の印も添える。" },
      { name: "Mobility(運動)", desc: "操作部品は既定44×44pt・最小28×28pt(iOS/iPadOS)。部品の間は、枠のある部品なら約12pt、枠のない部品なら約24ptの余白をとる。よく使う操作は簡単なジェスチャーにし、ジェスチャーには画面上のボタンなどの代わりを用意する。音声コントロール・スイッチコントロールなどの支援機能に対応する。" },
      { name: "Speech(発話)", desc: "キーボードだけで操作できるようにし(フルキーボードアクセス)、システムのショートカットを上書きしない。スイッチコントロールに対応する。" },
      { name: "Cognitive(認知)", desc: "操作は単純で一貫させ、時間で自動的に消える表示は控える。音声・動画の自動再生を避け、点滅や速い動きは「視差効果を減らす」設定に合わせて減らす。アシスティブアクセス(機能をしぼった表示)にも対応する。" },
    ],
    extra: "apple",
    url: "https://developer.apple.com/design/human-interface-guidelines/accessibility",
    refs: [
      { label: "Accessibility", url: "https://developer.apple.com/design/human-interface-guidelines/accessibility" },
      { label: "Inclusion", url: "https://developer.apple.com/design/human-interface-guidelines/inclusion" },
    ],
    confirmedNote: "各分野の見出しに実アンカーあり(例: #Vision)。ページ本体の裏側データを直接取得して確認(2026-11)。Accessibility Nutrition LabelsはApp Store Connectのヘルプで確認。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Principles・Accessibility designing",
    color: "#2F7D6E",
    items: [
      { name: "アクセシビリティをデフォルトに", desc: "アクセシビリティ基準はマテリアルの各コンポーネントに組み込まれており、包括的な製品設計の基盤になっているという考え方。多様なユーザーを想定することが、後からの手戻り(再設計)や技術的負債を防ぐことにもつながるとしている。" },
      { name: "要件を機会として捉える", desc: "WCAGが定める最低限の要件は特定のニーズに応えるものだが、その制約の中で生まれた工夫(ダークモード・読み上げ・音声認識など)が結果的に幅広いユーザーの助けになってきたという考え方。" },
      { name: "設計の手順 ① 構造(Structure)", desc: "見た目の画面を、読み上げソフトが上から順に読む1本の流れに置き換えて考える。重要な操作は画面の上か下に置く。Webではランドマーク(navigation・main など8種類)と見出し(H1〜H6を飛ばさない)で構造を示す。押せる範囲の目安は、指で触る操作で48×48dp以上(約9mm)、マウスなどのポインターで44×44dp以上、部品どうしの間隔は8dp以上(M3 Structure)。" },
      { name: "設計の手順 ② 流れ(Flow)", desc: "キーボード・読み上げソフトでも目的を達成できるようにする。フォーカスの順番は基本的に既定(ソースコードの順)を使い、画面を開いたときの最初のフォーカスを決める。ダイアログを閉じたら、開いた部品にフォーカスを戻す。" },
      { name: "設計の手順 ③ 要素(Elements)", desc: "文字のないアイコンボタン・意味のある画像・状態を示すアイコンにはラベルを付け、見た目ではなく目的を書く(「虫めがね」ではなく「検索」)。ラベルに「ボタン」などの部品名は入れない。飾りの画像は読み上げから外し、操作できる要素には役割(ロール)を割り当てる。" },
      { name: "色とコントラスト", desc: "文字は4.5:1以上(大きな文字は3:1以上)。ボタンが並ぶときは、各ボタンの容器を背景に対して3:1以上にする(FABのように単独で目立つ部品は対象外)。無効状態はコントラストの要件の対象外。" },
    ],
    extra: "google",
    url: "https://m3.material.io/foundations/overview/principles",
    confirmedNote: "M3のAccessibility(Designing・Building for all)の各ページを、ブラウザで表示した本文で確認(2026-11)。ページ内の見出しアンカーは確認できていないため、ページ単位のリンクに留めています。",
    refs: [
      { label: "Principles", url: "https://m3.material.io/foundations/overview/principles" },
      { label: "Accessibility designing ― Overview", url: "https://m3.material.io/foundations/designing/overview" },
      { label: "Structure", url: "https://m3.material.io/foundations/designing/structure" },
      { label: "Flow", url: "https://m3.material.io/foundations/designing/flow" },
      { label: "Elements", url: "https://m3.material.io/foundations/designing/elements" },
      { label: "Color & contrast", url: "https://m3.material.io/foundations/designing/color-contrast" },
      { label: "Building for all ― User needs", url: "https://m3.material.io/foundations/building-for-all/user-needs" },
    ],
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.2 ― POUR(4原則・13ガイドライン)",
    color: "#A3821F",
    items: [
      {
        name: "Perceivable(知覚可能)",
        desc: "情報やUIコンポーネントは、ユーザーが知覚できる形で提示されなければならないという原則。",
        url: "https://www.w3.org/TR/WCAG22/#perceivable",
        sub: [
          { name: "1.1 Text Alternatives", desc: "非テキストコンテンツに代替テキストを用意すべきという指針。", sc: "例: 1.1.1 非テキストコンテンツ(A)" },
          { name: "1.2 Time-based Media", desc: "動画・音声に代替手段を用意すべきという指針。", sc: "例: 1.2.2 キャプション(収録済み)(A)" },
          { name: "1.3 Adaptable", desc: "情報や構造を失わずに異なる形式でも提示できるべきという指針。", sc: "例: 1.3.1 情報及び関係性(A)、1.3.4 向き(orientation)(AA)" },
          { name: "1.4 Distinguishable", desc: "前景と背景を区別しやすくすべきという指針(色のみによる区別の禁止など)。", sc: "例: 1.4.1 色の用途(A)、1.4.3 コントラスト(最低限)4.5:1(AA)、1.4.4 200%まで拡大(AA)、1.4.11 非テキストのコントラスト3:1(AA)" },
        ],
      },
      {
        name: "Operable(操作可能)",
        desc: "UIコンポーネントとナビゲーションは操作可能でなければならないという原則。",
        url: "https://www.w3.org/TR/WCAG22/#operable",
        sub: [
          { name: "2.1 Keyboard Accessible", desc: "すべての機能をキーボードだけで利用できるべきという指針。", sc: "例: 2.1.1 キーボード(A)、2.1.2 キーボードトラップなし(A)" },
          { name: "2.2 Enough Time", desc: "内容を読んだり操作したりするのに十分な時間を与えるべきという指針。", sc: "例: 2.2.1 期限調節可能(A)、2.2.2 一時停止・停止・非表示(A)" },
          { name: "2.3 Seizures and Physical Reactions", desc: "発作等を誘発する設計をしてはならないという指針。", sc: "例: 2.3.1 3回の閃光、又は閾値以下(A)" },
          { name: "2.4 Navigable", desc: "現在地の把握やナビゲートを助ける手段を提供すべきという指針(リンクの目的など)。", sc: "例: 2.4.3 フォーカス順序(A)、2.4.4 リンクの目的(A)、2.4.7 フォーカスの可視化(AA)、2.4.11 隠されないフォーカス(最低限)(AA)" },
          { name: "2.5 Input Modalities", desc: "多様な入力方法での操作性を高めるべきという指針(タップ領域など)。", sc: "例: 2.5.1 ポインタジェスチャ(A)、2.5.7 ドラッグ動作(AA)、2.5.8 ターゲットのサイズ(最低限) 24×24px(AA・例外あり)" },
        ],
      },
      {
        name: "Understandable(理解可能)",
        desc: "情報とUIの操作方法は理解可能でなければならないという原則。",
        url: "https://www.w3.org/TR/WCAG22/#understandable",
        sub: [
          { name: "3.1 Readable", desc: "テキストを読みやすく理解しやすくすべきという指針。", sc: "例: 3.1.1 ページの言語(A)" },
          { name: "3.2 Predictable", desc: "見た目や動作を予測可能にすべきという指針。", sc: "例: 3.2.1 フォーカス時(A)、3.2.3 一貫したナビゲーション(AA)" },
          { name: "3.3 Input Assistance", desc: "入力ミスを避け、修正を助けるべきという指針。", sc: "例: 3.3.1 エラーの特定(A)、3.3.2 ラベル又は指示(A)、3.3.8 アクセシブルな認証(最低限)(AA)" },
        ],
      },
      {
        name: "Robust(堅牢)",
        desc: "コンテンツは、支援技術(読み上げソフトなど、障害のある人が使う道具)を含む様々なユーザーエージェント(ブラウザなど、内容を読み込んで表示・利用する道具)で確実に解釈できるべきという原則。",
        url: "https://www.w3.org/TR/WCAG22/#robust",
        sub: [
          { name: "4.1 Compatible", desc: "現在・将来のユーザーエージェントとの互換性を最大化すべきという指針。", sc: "例: 4.1.2 名前(name)・役割(role)・値(value)(A)、4.1.3 ステータスメッセージ(AA)" },
        ],
      },
    ],
    extra: "wcag",
    url: "https://www.w3.org/TR/WCAG22/",
    refs: [
      { label: "WCAG 2.2", url: "https://www.w3.org/TR/WCAG22/" },
      { label: "WAI: Accessibility, Usability, and Inclusion", url: "https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/" },
    ],
    confirmedNote: "4原則・13ガイドラインすべて実アンカーあり。達成基準の数とレベルは仕様書本体で数えて確認(2026-11)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Accessibility and Inclusivity: Study Guide",
    color: "#7A4F7E",
    items: [
      { name: "アクセシビリティ = 心構え", desc: "アクセシビリティとインクルーシブデザインは、ユーザビリティの一部であり、手続き・規制・チェックリストの集まりではなく、心構え(マインドセット)であるという考え方。" },
      { name: "アクセシブルデザイン", desc: "視覚・聴覚・認知・情緒・運動面で困難を抱えるユーザーを助けるデザインという整理。" },
      { name: "インクルーシブデザイン", desc: "人種・性別・宗教など多様な背景を持つユーザーを歓迎し、それらが体験の妨げにならないようにする設計という整理。" },
    ],
    extra: "nn",
    url: "https://www.nngroup.com/articles/accessibility-inclusivity-study-guide/",
    confirmedNote: "Study Guideと各記事の本文で確認(2026-11)。",
    refs: [
      { label: "Accessibility and Inclusivity: Study Guide", url: "https://www.nngroup.com/articles/accessibility-inclusivity-study-guide/" },
      { label: "5 Visual Treatments that Improve Accessibility", url: "https://www.nngroup.com/articles/visual-treatments-accessibility/" },
      { label: "Inclusive Design", url: "https://www.nngroup.com/articles/inclusive-design/" },
    ],
  },
];

/* 各系列のカードの下に出す補足(No.004) */
const NAMES_9 = ["VoiceOver", "音声コントロール", "さらに大きな文字(200%以上)", "ダークインターフェース", "色だけに頼らない区別", "十分なコントラスト", "動きを減らす", "字幕(キャプション)", "音声解説"];
const GOOGLE_DIMENSIONS = ["年齢", "文化", "障害", "教育・読み書きの力", "民族", "ジェンダー", "地域", "身体的な特徴", "人種", "宗教", "性的指向", "社会経済的な状況", "技術への慣れ"];
const NN_POINTS = [
  { t: "文字と背景のコントラスト", d: "弱視の人が支援技術なしで読めるよう、コントラストを高くする" },
  { t: "色以外の手がかり", d: "線・模様・アイコン・文言を添える。画面をグレースケールにして伝わるか確かめる" },
  { t: "フォーカスの状態", d: "キーボードで操作する人のため、太い枠線などではっきり示す(色の変化だけにしない)" },
  { t: "画像の代替テキスト", d: "短く書き、キャプションと同じ内容を繰り返さない。飾りの画像には付けない" },
  { t: "実際の利用者でテスト", d: "読み上げソフトなどを自分でも使ってみる。5人ほどでも効果があり、ニーズの違う人を混ぜる" },
];

function WcagLevels() {
  return (
    <>
      <div style={styles.extraTitle}>番号とレベルの読み方</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {[
          { lv: "原則", n: "4つ", ex: "2 = 操作可能", w: "100%" },
          { lv: "ガイドライン", n: "13", ex: "2.5 = 入力モダリティ", w: "88%" },
          { lv: "達成基準", n: "86", ex: "2.5.8 = ターゲットのサイズ(最低限)", w: "76%" },
        ].map((r) => (
          <div key={r.lv} style={{ width: r.w, background: "#FBF6E6", borderLeft: "3px solid #A3821F", padding: "5px 8px", borderRadius: "0 3px 3px 0" }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "#171B36" }}>{r.lv}<span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: "#666D93", marginLeft: 6 }}>{r.n}</span></div>
            <div style={{ fontSize: 10.5, color: "#454C78" }}>例: {r.ex}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 4, margin: "10px 0 4px" }}>
        {[{ l: "A", n: 31, t: "最低限" }, { l: "AA", n: 24, t: "実務の一般的な目標" }, { l: "AAA", n: 31, t: "より高い水準" }].map((x) => (
          <div key={x.l} style={{ flex: 1, border: "1px solid #E7DDB8", borderRadius: 4, padding: "5px 6px", textAlign: "center" }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 12, color: "#A3821F" }}>{x.l}<span style={{ color: "#666D93", fontWeight: 500 }}> {x.n}</span></div>
            <div style={{ fontSize: 10, color: "#454C78", lineHeight: 1.4 }}>{x.t}</div>
          </div>
        ))}
      </div>
      <p style={styles.extraText}>番号の先頭の数字が原則(1=知覚可能・2=操作可能・3=理解可能・4=堅牢)。AAに適合するには、AとAAの達成基準をすべて満たす。法令や社内基準の多くはAAを求め、AAAはすべてのページで満たすことは求められていない。4.1.1(構文解析)はWCAG 2.2で廃止。APGは実装の参考例で、適合の基準ではない。</p>
    </>
  );
}

function FrameworkExtra({ k }) {
  if (k === "apple") return (
    <div style={styles.extraBox}>
      <div style={styles.extraTitle}>Apple独自の評価 ― Accessibility Nutrition Labels</div>
      <p style={styles.extraText}>App Storeの製品ページに、そのアプリが対応している支援機能をラベルで表示する仕組み(iOS 26などの端末で表示。当初は任意)。開発者が自分で評価して申告する。</p>
      <div style={styles.extraChips}>{NAMES_9.map((n) => (<span key={n} style={styles.extraChip}>{n}</span>))}</div>
      <p style={styles.extraText}><strong>判定の基準</strong>: その機能を使って、アプリの「よく行う作業」をすべて最後までできること。よく行う作業は、アプリの主な機能に加えて、初回起動・ログイン・購入・設定。</p>
      <p style={styles.extraText}>確認には、XcodeのAccessibility Inspectorで画面の問題を洗い出す方法をHIGが勧めている。</p>
      <a href="https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels/" target="_blank" rel="noreferrer" style={styles.extraLink}>Overview of Accessibility Nutrition Labels ↗</a>
    </div>
  );
  if (k === "google") return (
    <div style={styles.extraBox}>
      <div style={styles.extraTitle}>人の多様さを見る観点(Building for all)</div>
      <p style={styles.extraText}>調査・設計・テストのときに思い浮かべる観点として、次の一覧を挙げている(増えていく一覧としている)。障害は観点の1つ。</p>
      <div style={styles.extraChips}>{GOOGLE_DIMENSIONS.map((n) => (<span key={n} style={styles.extraChip}>{n}</span>))}</div>
      <p style={styles.extraText}>Material の考え方はWCAGと業界のよい実践を土台にしている。標準の部品(Webでは意味のあるHTML)を使えば、支援技術に必要な情報が自動で入るため、独自の部品は余分なテストが必要になる。</p>
    </div>
  );
  if (k === "wcag") return (<div style={styles.extraBox}><WcagLevels /></div>);
  if (k === "nn") return (
    <div style={styles.extraBox}>
      <div style={styles.extraTitle}>気にすべきポイント(5 Visual Treatments)</div>
      {NN_POINTS.map((x, i) => (<p key={x.t} style={styles.extraText}><strong>{i + 1}. {x.t}</strong>: {x.d}</p>))}
      <p style={styles.extraText}>Study Guideではほかに、65歳以上の利用者(小さい文字・密な文字が読みにくい)と、読み上げソフトの利用者(画面を1本道で体験する。後付けのアクセシビリティ用ウィジェットでは足りない)を、分けて取り上げている。</p>
    </div>
  );
  return null;
}

/* アクセシビリティとインクルーシブデザインの関係(No.004) */
const RELATION_ROWS = [
  { k: "Apple", v: "Accessibilityとは別に「Inclusion」のページを持つ。年齢・ジェンダー・人種・言語と文化・一時的/状況による障害などの観点を挙げ、「不快なものがない」ことと「インクルーシブである」ことは別だとしている" },
  { k: "Google", v: "Accessibility designing(作り方)と、Building for all(多様な人と一緒に作る・人の多様さの観点)を分けて置いている" },
  { k: "W3C", v: "WCAGは、障害のある人が使えるかを確かめる基準。インクルーシブデザインの全体は扱わない。WAIの解説「Accessibility, Usability, and Inclusion」は、インクルージョンを年齢・言語・文化・通信環境なども含む広い考え方とし、アクセシビリティはあえて障害に絞ることで、障害に合わせた解決策を深められるとしている" },
  { k: "NN group", v: "アクセシビリティは障害のある人への配慮に絞った、インクルーシブデザインより狭い範囲。WCAGがあるので確かめやすいが、それは意味のある体験のための最低限にすぎない、としている" },
];
function InclusionSection() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>アクセシビリティとインクルーシブデザインの関係</h2>
      <div style={styles.incWrap}>
        <svg viewBox="0 0 300 200" style={{ width: "100%", maxWidth: 360, flexShrink: 0 }} role="img" aria-label="インクルーシブデザインの中にアクセシビリティ、その中にWCAGがある図">
          <ellipse cx="150" cy="100" rx="146" ry="96" fill="#F3F6FA" stroke="#7A4F7E" />
          <text x="150" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">インクルーシブデザイン</text>
          <text x="150" y="42" textAnchor="middle" fontSize="8.5" fill="#565D8A" fontFamily="Jost, Noto Sans JP">年齢・文化・言語・ジェンダー・障害 など</text>
          <ellipse cx="150" cy="124" rx="104" ry="60" fill="#FFFFFF" stroke="#C2542A" />
          <text x="150" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill="#C2542A" fontFamily="Jost, Noto Sans JP">アクセシビリティ</text>
          <text x="150" y="95" textAnchor="middle" fontSize="8.5" fill="#565D8A" fontFamily="Jost, Noto Sans JP">障害への配慮(視覚・聴覚・運動・認知)</text>
          <rect x="95" y="106" width="110" height="54" rx="6" fill="#FBF6E6" stroke="#A3821F" />
          <text x="150" y="126" textAnchor="middle" fontSize="11" fontWeight="700" fill="#A3821F" fontFamily="Jost, Noto Sans JP">WCAG</text>
          <text x="150" y="140" textAnchor="middle" fontSize="8.5" fill="#565D8A" fontFamily="Jost, Noto Sans JP">確かめられる最低限</text>
          <text x="150" y="152" textAnchor="middle" fontSize="8.5" fill="#565D8A" fontFamily="Jost, Noto Sans JP">(A・AA・AAA)</text>
        </svg>
        <div style={{ flex: 1, minWidth: 0 }}>
          <table style={styles.incTable}>
            <tbody>{RELATION_ROWS.map((r) => (<tr key={r.k}><th style={styles.incTh}>{r.k}</th><td style={styles.incTd}>{r.v}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
      <div style={styles.incRead}>
        <div style={styles.extraTitle}>読み解き方(AI解釈)</div>
        <p style={styles.extraText}><strong>1. WCAGで最低限を確かめる</strong> ― 障害のある人が使えるかを、番号付きの基準で検証する(実務の目標はAA)。</p>
        <p style={styles.extraText}><strong>2. 各OSの支援機能に合わせる</strong> ― AppleやGoogleの指針で、読み上げ・文字の拡大・動きを減らすなど、端末の設定に応える。</p>
        <p style={styles.extraText}><strong>3. 障害以外の違いにも広げる</strong> ― 年齢・言語・文化・状況(片手がふさがっている、まぶしい屋外など)の違いを想定し、当事者と一緒に作り、実際の利用者でテストする。</p>
        <p style={styles.extraNote}>NN groupは、ひとつの解決策ですべての人に使えるようにする「ユニバーサルデザイン」とも区別している。インクルーシブデザインは、目的を果たせるなら複数のデザインの違い(設定で切り替えるなど)を認める考え方だ。</p>
      </div>
    </section>
  );
}

/* 公式へのリンクは、飛び先のページ名で示す */
const LINK_NAMES = {"https://developer.apple.com/design/human-interface-guidelines/accessibility": "HIG: Accessibility", "https://m3.material.io/foundations/overview/principles": "M3: Principles", "https://www.w3.org/TR/WCAG22/": "WCAG 2.2", "https://www.w3.org/TR/WCAG22/#perceivable": "WCAG 2.2: 原則1 知覚可能", "https://www.w3.org/TR/WCAG22/#operable": "WCAG 2.2: 原則2 操作可能", "https://www.w3.org/TR/WCAG22/#understandable": "WCAG 2.2: 原則3 理解可能", "https://www.w3.org/TR/WCAG22/#robust": "WCAG 2.2: 原則4 堅牢", "https://www.nngroup.com/articles/accessibility-inclusivity-study-guide/": "Accessibility and Inclusivity: Study Guide"};
const linkName = (u) => LINK_NAMES[u] || u;

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "文字のコントラスト", d: "本文は4.5:1以上", who: "W3C 1.4.3・AA" },
  { n: 2, t: "色だけで伝えない", d: "色のほかに文字や形でも伝える", who: "W3C 1.4.1・A" },
  { n: 3, t: "押せる範囲", d: "24×24px以上。例外あり", who: "W3C 2.5.8・AA" },
  { n: 4, t: "フォーカスが見える", d: "キーボードで今どこにいるか分かる", who: "W3C 2.4.7・AA" },
  { n: 5, t: "キーボードで操作できる", d: "すべての操作をキーボードでもできる", who: "W3C 2.1.1・A" },
  { n: 6, t: "名前(name)・役割(role)・値(value)", d: "部品の名前と状態が支援技術に伝わる", who: "W3C 4.1.2・A" },
];

export default function PrinciplesAccessibilityPage() {
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
        <SidebarNav currentPath="/principles/accessibility" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>思想レイヤー / アクセシビリティ</span>
            <span>SPEC No. 002</span>
          </div>

          <h1 style={styles.title}>アクセシビリティ</h1>
          <p style={styles.subtitle}>4つのガイドラインが、アクセシビリティという概念をどう捉え、どう体系立てているかを比較する</p>
          <KeyPoints items={KP} title="実務でまず見る達成基準" />

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              「アクセシビリティ」という言葉が指す範囲は、4系列でかなり異なる。<strong>WCAGは適合の可否を判定できる規格</strong>として、知覚可能・操作可能・理解可能・堅牢という4原則(POUR)を定義している。一方でApple・Google・Nielsen Norman Groupは、規格というより実践的な指針や考え方として、それぞれ独自の言葉でアクセシビリティを語っている。
            </p>
            <p style={styles.synthesisText}>
              なかでもNielsen Norman Groupは、アクセシビリティを<strong>「チェックリストではなく心構え(マインドセット)」</strong>だと明言しており、WCAGの規格的な性格とは対照的だ。Appleは視覚・聴覚・運動・発話・認知の分野ごとに具体的な数値を示し、さらに<strong>App Storeの「Accessibility Nutrition Labels」で、アプリがどの支援機能に対応しているかを開発者に申告させる独自の評価</strong>を持っている。Googleは「制約を機会に変える」という考え方に加え、構造・流れ・要素の3段階で、見た目の画面を読み上げの流れに置き換える手順を示している。
            </p>
            <p style={styles.synthesisText}>
              本サイトが各コンポーネントページの「アクセシビリティ」欄でPOURの語彙を採用しているのは、<strong>数ある考え方の中でWCAGが最も具体的で、かつ検証可能</strong>だからだ。ただし、それが唯一の正解というわけではない。他の3系列の視点も知っておくと、アクセシビリティへの理解がより立体的になる。
            </p>
          </div>


          {/* 四系列比較: 性格の違いを一目で示す */}
          <div style={styles.diagramCard}>
            <h2 style={styles.diagramTitle}>四系列比較 ― アプローチの性格</h2>
            <div style={styles.spectrumScroll}>
              <div style={styles.spectrumTrack}>
                <div style={styles.spectrumLine} />
                {[
                  { key: "nn", label: "Nielsen Norman Group", sub: "心構え(マインドセット)", pos: 8, color: "#7A4F7E" },
                  { key: "hig", label: "Apple", sub: "実践ガイダンス(5分野)", pos: 36, color: "#C2542A" },
                  { key: "material", label: "Google", sub: "原則+設計の手順", pos: 60, color: "#2F7D6E" },
                  { key: "wcag", label: "W3C", sub: "検証可能な規格(4原則13項目)", pos: 90, color: "#A3821F" },
                ].map((p) => (
                  <div key={p.key} style={{ ...styles.spectrumPoint, left: `${p.pos}%` }}>
                    <span style={{ ...styles.spectrumDot, background: p.color }} />
                    <span style={styles.spectrumLabel}>{p.label}</span>
                    <span style={styles.spectrumSub}>{p.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.spectrumAxis}>
              <span>抽象的な心構え</span>
              <span>検証可能な規格</span>
            </div>
            <p style={styles.diagramNote}>左右は「規格としての厳密さ」の度合いのイメージだ。厳密さの高低は優劣を意味しない。詳しい内容は下の「各サイトの詳細」を参照。</p>
          </div>

          {/* 各サイトの詳細: mobile card stack */}
          <h2 className="dsp-mobile-only" style={styles.diagramTitle}>各サイトの詳細</h2>
          <div className="dsp-mobile-only" style={styles.sourceList}>
            {FRAMEWORKS.map((f) => (
              <div key={f.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={styles.sourceName}>{f.name}</div>
                    <div style={styles.sourceDoc}>{f.doc}</div>
                  </div>
                </div>
                <div style={styles.itemList}>
                  {f.items.map((it) =>
                    it.sub ? (
                      <div key={it.name} style={styles.genBlock}>
                        <div style={styles.genHead}>
                          <span style={styles.genName}>{it.name}</span>
                          {it.url && (<a href={it.url} target="_blank" rel="noreferrer" style={styles.genLink}>仕様書へ ↗</a>)}
                        </div>
                        <p style={styles.genDesc}>{it.desc}</p>
                        <div style={styles.genSubList}>
                          {it.sub.map((s, si) => (
                            <div key={s.name} style={styles.genSubRow}>
                              <span style={{ ...styles.genSubIndex, background: f.color }}>{si + 1}</span>
                              <div><div style={styles.itemName}>{s.name}</div><div style={styles.itemDesc}>{s.desc}</div>{s.sc && <div style={styles.scLine}>{s.sc}</div>}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div key={it.name} style={styles.itemRow}>
                        <span style={{ ...styles.itemDot, background: f.color }} />
                        <div><div style={styles.itemName}>{it.name}</div><div style={styles.itemDesc}>{it.desc}</div></div>
                      </div>
                    )
                  )}
                </div>
                {f.extra && <FrameworkExtra k={f.extra} />}
                {f.refs && <div style={styles.refBox}><span style={styles.extraTitle}>参照ページ(公式)</span><RefList refs={f.refs} /></div>}
                <div style={styles.sourceFootRow}>
                  <a href={f.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{linkName(f.url)} ↗</a>
                </div>
              </div>
            ))}
          </div>

          {/* desktop: 4-column card grid (variable-length item lists don't fit a matrix well) */}
          <div className="dsp-desktop-only">
            <h2 style={styles.diagramTitle}>各サイトの詳細</h2>
            <div style={styles.desktopGrid}>
              {FRAMEWORKS.map((f) => (
                <div key={f.key} style={styles.desktopCard}>
                  <div style={styles.sourceName}>{f.name}</div>
                  <div style={styles.sourceDoc}>{f.doc}</div>
                  <div style={styles.itemList}>
                    {f.items.map((it) =>
                      it.sub ? (
                        <div key={it.name} style={styles.genBlock}>
                          <div style={styles.genHead}>
                            <span style={styles.genName}>{it.name}</span>
                            {it.url && (<a href={it.url} target="_blank" rel="noreferrer" style={styles.genLink}>仕様書へ ↗</a>)}
                          </div>
                          <p style={styles.genDesc}>{it.desc}</p>
                          <div style={styles.genSubList}>
                            {it.sub.map((s, si) => (
                              <div key={s.name} style={styles.genSubRow}>
                                <span style={{ ...styles.genSubIndex, background: f.color }}>{si + 1}</span>
                                <div><div style={styles.itemName}>{s.name}</div><div style={styles.itemDesc}>{s.desc}</div>{s.sc && <div style={styles.scLine}>{s.sc}</div>}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div key={it.name} style={styles.itemRow}>
                          <span style={{ ...styles.itemDot, background: f.color }} />
                          <div><div style={styles.itemName}>{it.name}</div><div style={styles.itemDesc}>{it.desc}</div></div>
                        </div>
                      )
                    )}
                  </div>
                  {f.extra && <FrameworkExtra k={f.extra} />}
                  {f.refs && <div style={styles.refBox}><span style={styles.extraTitle}>参照ページ(公式)</span><RefList refs={f.refs} /></div>}
                  <div style={styles.sourceFootRow}>
                    <a href={f.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{linkName(f.url)} ↗</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <InclusionSection />

          <div style={styles.relatedBox}>
            <span style={styles.memoLabel}>関連するページ</span>
            <p style={{ fontSize: 12, lineHeight: 1.8, margin: 0 }}>
              <PageLink to="/tokens/color">カラー</PageLink>(文字・部品のコントラスト)・<PageLink to="/components/actions/button">ボタン</PageLink>(押せる範囲の大きさ。2.5.8の例外)・<PageLink to="/tokens/interaction-states">インタラクション状態</PageLink>(フォーカスの見え方)・<PageLink to="/principles/comparison">原則比較</PageLink>
            </p>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["設計の原則・使い分け"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  relatedBox: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 14px", marginBottom: 40 },
  memoLabel: { display: "block", fontSize: 12, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  extraBox: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 4, padding: "10px 12px", margin: "4px 0 10px" },
  extraTitle: { display: "block", fontSize: 12, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  extraText: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", margin: "0 0 6px" },
  extraNote: { fontSize: 11, lineHeight: 1.6, color: "#565D8A", margin: "6px 0 0" },
  extraChips: { display: "flex", flexWrap: "wrap", gap: 4, margin: "2px 0 8px" },
  extraChip: { fontSize: 10.5, background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 10, padding: "1px 7px", color: "#454C78" },
  extraLink: { fontSize: 11, color: "#3A4FCF" },
  refBox: { margin: "4px 0 10px" },
  scLine: { fontSize: 10.5, color: "#666D93", marginTop: 2, lineHeight: 1.5 },
  incWrap: { display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", marginBottom: 14 },
  incTable: { width: "100%", borderCollapse: "collapse", fontSize: 11.5 },
  incTh: { textAlign: "left", verticalAlign: "top", width: 74, padding: "7px 8px", background: "#F8F9FD", borderBottom: "1px solid #E1E3F0", fontWeight: 700, color: "#454C78" },
  incTd: { padding: "7px 8px", borderBottom: "1px solid #E1E3F0", lineHeight: 1.6, color: "#2E3457" },
  incRead: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "12px 14px", borderRadius: "0 4px 4px 0" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 6px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", marginBottom: 20 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", marginTop: 14, lineHeight: 1.6 },
  spectrumScroll: { overflowX: "auto" },
  spectrumTrack: { position: "relative", height: 74, minWidth: 440, margin: "8px 0 34px" },
  spectrumLine: { position: "absolute", top: 4, left: 0, right: 0, height: 2, background: "#E1E3F0" },
  spectrumPoint: { position: "absolute", top: 0, display: "flex", flexDirection: "column", alignItems: "center", transform: "translateX(-50%)", width: 118 },
  spectrumDot: { width: 10, height: 10, borderRadius: "50%", display: "block", marginBottom: 6 },
  spectrumLabel: { fontSize: 11, fontWeight: 700, color: "#171B36", textAlign: "center", lineHeight: 1.3 },
  spectrumSub: { fontSize: 10, color: "#666D93", textAlign: "center", lineHeight: 1.4, marginTop: 2 },
  spectrumAxis: { display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "#666D93", fontFamily: "'IBM Plex Mono', monospace" },
  genSubList: { display: "flex", flexDirection: "column", gap: 8, background: "#F8F9FD", borderRadius: 4, padding: "10px 12px", marginBottom: 4 },
  genSubRow: { display: "flex", gap: 8, alignItems: "flex-start" },
  genSubIndex: { flexShrink: 0, width: 16, height: 16, borderRadius: "50%", color: "#FFFFFF", fontSize: 9.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 },
  sourceList: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  sourceName: { fontWeight: 600, fontSize: 15 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  itemList: { display: "flex", flexDirection: "column", gap: 8, marginTop: 10, marginBottom: 10 },
  itemRow: { display: "flex", gap: 8, alignItems: "flex-start" },
  itemDot: { width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0 },
  itemName: { fontSize: 12.5, fontWeight: 600, color: "#171B36" },
  itemDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78" },
  genBlock: { marginBottom: 4, paddingBottom: 10, borderBottom: "1px solid #F0F1F8" },
  genHead: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 3, flexWrap: "wrap" },
  genName: { fontSize: 12.5, fontWeight: 700, color: "#171B36" },
  genLink: { fontSize: 10.5, color: "#3A4FCF", textDecoration: "underline", flexShrink: 0 },
  genDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", margin: "0 0 8px" },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginTop: 8, paddingTop: 8, borderTop: "1px solid #E1E3F0" },
  confirmedNote: { fontSize: 10.5, color: "#666D93", maxWidth: 340 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline", flexShrink: 0 },
  desktopGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 22 },
  desktopCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", display: "flex", flexDirection: "column" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
