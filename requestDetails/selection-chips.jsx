import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Selection / チップ(Chips)」ページ。
 *
 * Chipsは元々Material Designが体系化したパターンで、他系列には同一名称の
 * コンポーネントは存在しない。Appleには「Chip」という名前のコンポーネントはないが、
 * 発想が近いネイティブコントロール「トークンフィールド(Token Fields)」がmacOS向けに
 * 存在することを確認できたため、無理に「対応コンポーネントなし」と切り捨てず、
 * 近い概念として記載している(FABページと同じ方針: CLAUDE.mdの「無理に数値を作らない」に基づく)。
 *
 * W3C / Apple(Token Fieldsの存在確認)は検索により確認済み(2026-09、公式サイトが
 * SPAで本文の自動取得ができないため、検索結果の要約・複数の言及による確認)。
 * Nielsen Norman Groupはチップ専用の設計ガイドライン記事が見当たらないことを確認済み。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで複数の公式系資料による間接確認だったが、公式ページ本文(使用法・バリエーション・
 * ユースケース・インタラクションとスタイル・水平方向のオーバーフローの各セクション)を確認できたため、
 * その内容を反映済み(2026-09、MD3_text/chips.docx)。形状も「ピル型」ではなく「角丸長方形」が正しい
 * ことが判明したため図版を修正した。各サイズのdp数値やカラートークン名などのspecs数値は未確認。
 *
 * 2026-09 追加修正(ユーザー指摘による):
 * ・サイズの比較インフォグラフィックの帯色(赤/黄/緑)が系列識別色と衝突していた
 *   (特にGoogleの識別色#2F7D6Eと「推奨」帯の色が同一)。スライダーページと同じ配色
 *   (赤#D64545/黄#E8A317/緑#219653)に変更し、信号色と識別色の意味を分離。
 * ・チップの種類とユースケースの例文が抽象的(「選択済み」「招待者」「返信の候補」など、
 *   チップ自身の状態やカテゴリ名を説明するだけの文言)で4種類の違いが直感的にわかりにくかった
 *   ため、実際にその場面で使われそうな具体的な文言(在庫あり/田中 太郎/了解です!など)に変更し、
 *   種類ごとに視覚的な手がかり(先頭アイコンなど)も追加した。
 * ・Googleのサイズに関する記述が「サイズ」項目とアクセシビリティ項目に重複していたため、
 *   「サイズ」項目に統合し、アクセシビリティ側は数値の重複記載を削除。
 * ・Googleの「例外・許容ケース」に混在していたオーバーフロー処理(水平スクロール・
 *   リフロー方式/メニュー方式)の記述を、新設の「オーバーフロー」項目に分離。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Token Fields(macOS)",
    color: "#C2542A",
    position: "「Chip」という名称の専用コンポーネントはないが、近い発想の「トークンフィールド」がmacOS向けに存在",
    size: "数値によるサイズ規定は確認できていません。トークンフィールドはmacOSのテキストコントロールの一種として位置づけられています。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "トークンフィールドは、入力したテキストを選択・操作しやすい「トークン」(まとまったブロック)に変換するテキストフィールドの一種と定義されています。Materialの「インプットチップ」―ユーザーが入力した情報を表すチップ―に近い発想です。",
    exceptions:
      "トークンフィールドはmacOS向けのガイダンスで、iOS/iPadOS向けの言及は確認できていません。また「フィルタ」や「アシスト」用途のChip相当の概念は見当たらず、あくまで入力補助のコントロールという位置づけです。",
    accessibility: "―(このトピックにはアクセシビリティに関する直接の記載を確認できていません)",
    useCases: [
      "メール作成画面の宛先(To/Cc)欄など、入力した項目をトークンとして表示する",
      "入力された情報をひとまとまりの単位として選択・削除できるようにする",
    ],
    searchHint: "converts the text",
    url: "https://developer.apple.com/design/human-interface-guidelines/token-fields",
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="none" stroke="#C2542A" strokeWidth="1.6" />
        <rect x="6" y="6" width="30" height="12" rx="4" fill="#C2542A" />
      </svg>
    ),
    illustrationNote: "macOSの「トークンフィールド」内に浮かぶトークン(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Chips(使用法・アクセシビリティ)",
    color: "#2F7D6E",
    position: "4種類(アシスト/フィルタ/インプット/サジェスチョン)。状況に応じて動的に変わる、ボタンとは異なるインタラクティブ要素の集合",
    size:
      "コンテナの高さは32dp、最小タップ領域は48dpを確保する設計です。角の半径は8dp(shape small)で、いわゆる「ピル型」ではなく「角丸長方形」です(以前の記載を訂正)。デフォルトで高密度設定を適用すべきではないとしており(適用するとターゲットサイズが48×48pxを下回るため)、より高密度なレイアウトを選ぶ場合もタップ領域は最低48×48pxに戻せる設計にすべきとしています。",
    colorInfo:
      "チップのラベルは、背景との間で少なくとも3:1のコントラスト比を確保すべきとしています。M2からの変更点として、新しいカラーマッピングとダイナミックカラーへの対応が加わっています。",
    glossary: [
      { term: "リフロー方式", desc: "1行に収まりきらないほどチップが多い場合の対処法の1つ。水平リストを折り返して複数行にすることで、下のコンテンツを押し下げつつ、全てのチップを一度に表示する方法。" },
      { term: "メニュー方式", desc: "1行に収まりきらないチップの対処法のもう1つ。先頭にボタンを1つ置き、そこから開くメニューに残りのチップ選択肢をまとめる方法。下のコンテンツの位置がずれないという利点があるが、削除アイコンなど2つ目の操作が必要なチップには使うべきではないとされている。" },
    ],
    stance:
      "チップはボタンではないと明確に位置づけられています。ボタンは常に同じ見た目・操作方法で配置され、製品の操作を進めたり重要なアクションを実行させたりするのに使う一方、チップは現在のタスクに応じて動的に変化し、インタラクティブな要素の集合として現れ、ユーザーの現在の体験を向上させ行動を促すために使うとしています。チップはタスクの分岐経路を、ボタンは直線的なステップを表すという整理です。",
    exceptions:
      "主要な操作をチップに置き換えることは避けるべきで、次/前のステップに進む操作は必ずボタンにすべきとしています。複数のチップはセットとしてまとめて表示すべきですが、ボタンは1つの配置につき最大3つまでとしています。",
    overflow:
      "チップセットは水平スクロールに対応でき、1行に収まらない場合は「リフロー方式」または「メニュー方式」で全て表示できるようにすべきとしています(用語の詳細は下記「用語メモ」を参照)。",
    accessibility:
      "操作可能(Operable) ― 動作を実行するチップは、プラットフォームのアクセシビリティAPIに対してボタンと同じ意味論を提示すべきとしています(タップ領域の数値は上記「サイズ」を参照)。ラベルは背景との3:1以上のコントラストを確保すべきとしています(詳しくは上記「色」を参照)。",
    useCases: [
      "アシスト: 予定への追加など、コンテンツに関連する動作を実行する(詳しくは下記「チップの種類とユースケース」を参照)",
      "フィルタ: コンテンツを絞り込むタグとして使う",
      "インプット: ユーザーが入力した情報(招待者など)を表す",
      "サジェスチョン: 製品が動的に生成した提案(返信文など)を提示する",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/chips/guidelines",
    urlSecondary: [{ label: "Specs(最新版)", url: "https://m3.material.io/components/chips/specs" }],
    confirmedNote: "使用法・バリエーション(4種類の選び方)・ユースケース・インタラクションとスタイル・水平方向のオーバーフローの各セクションは2026-09時点で確認済み。各サイズの詳細なdp数値やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#2F7D6E" />
        <path d="M10 12l3 3 6-7" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    illustrationNote: "選択済みのフィルタチップ(概念図・系列識別色、角丸長方形)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.1.1 / 2.5.8 / 2.5.5 / 1.4.11 / 1.4.1",
    color: "#A3821F",
    position: "形状を問わず、ボタン/トグルボタンとしての名前・役割・状態・操作性を要求する一般基準の集合",
    size:
      "チップ専用の数値基準はありませんが、一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求めます(どちらも例外あり。詳しくは「ボタン」ページのターゲットサイズの説明を参照)。",
    colorInfo:
      "チップのラベルの文字には1.4.3(文字のコントラスト)がかかり、通常サイズの文字は4.5:1以上が必要です(Googleの「ラベルは背景と3:1以上」より厳しい値)。1.4.11により、チップの境界線や選択状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしています。1.4.1により、フィルタチップの選択状態を色だけで示すことも避けるべきです。",
    stance:
      "チップは実装上ボタンまたはトグルボタンとして扱われることが多く、その名前・役割・状態が支援技術から取得できなければならないとしています(4.1.2)。複数のチップが並ぶ場合、キーボードだけで一覧を移動・選択できる必要があります(2.1.1)。",
    exceptions:
      "標準的なbutton要素やARIAのボタン/トグルボタンロールを使えば、通常は追加対応は不要です。独自に描画したカスタムチップを実装する場合にのみ、この基準への配慮が必要になります。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 名前・役割・状態(4.1.2)に加え、キーボード操作性(2.1.1)、ターゲットサイズ(2.5)、非テキストのコントラスト(1.4.11、知覚可能)が関わります。",
    useCases: [
      "支援技術のユーザーがチップの一覧をキーボードだけで移動・選択できるようにする",
      "選択状態がプログラム的に(支援技術に)正しく伝わるようにする",
    ],
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="70" height="24" viewBox="0 0 70 24">
          <rect x="1" y="1" width="68" height="22" rx="6" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>ボタン/トグルボタン相当(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "専用記事なし(用語的な言及のみ)",
    color: "#7A4F7E",
    position: "専用の設計ガイドライン記事は見当たらない",
    size: "数値基準は見当たりません。",
    colorInfo: "色についての記述は見当たりません。",
    stance:
      "チップ(トークン)そのものを主題にした専用の設計ガイドライン記事は確認できていません。フロントエンドのスタイルガイドに関する記事の中で、スタイルガイドに載せるべき部品の1つとして「トークン(チップ)」を挙げ、メールの宛先欄で宛先を1件ずつ分けて表示し、1回のクリックで削除できるようにする使い方や、詳細検索の欄・メタデータのタグでの使い方を紹介しています。",
    exceptions: "専用記事がないため、例外・許容ケースの記載も確認できていません。",
    accessibility: "―(専用の適合区分・設計根拠の提示は見当たりません)",
    useCases: ["(専用記事なし)他のSelectionコンポーネントの原則(相互排他性・複数選択・即時反映など)を踏まえて個別に判断する"],
    searchHint: "",
    url: "https://www.nngroup.com/articles/front-end-style-guides/",
    illustration: () => (
      <svg width="70" height="24" viewBox="0 0 70 24">
        <rect x="1" y="1" width="68" height="22" rx="6" fill="#7A4F7E" />
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

function ChipSwatch() {
  const items = [
    { label: "予定に追加", sub: "アシスト", leading: "+" },
    { label: "在庫あり", sub: "フィルタ", filled: true },
    { label: "田中 太郎", sub: "インプット", closable: true },
    { label: "了解です!", sub: "サジェスチョン", leading: "✨" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
      {items.map((it) => (
        <div key={it.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "7px 16px", borderRadius: 8, whiteSpace: "nowrap",
              background: it.filled ? "#3A4FCF" : "#FFFFFF",
              border: `1.6px solid ${it.filled ? "#3A4FCF" : "#9EA4C4"}`,
              color: it.filled ? "#FFFFFF" : "#454C78",
              fontSize: 12.5, fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
            }}
          >
            {it.filled && (
              <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
                <path d="M2 6.2l2.6 2.6L10 3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {it.leading && !it.filled && <span style={{ fontSize: 11, opacity: 0.75 }}>{it.leading}</span>}
            {it.label}
            {it.closable && <span style={{ fontSize: 11, opacity: 0.6, marginLeft: 1 }}>✕</span>}
          </div>
          <span style={{ fontSize: 9.5, color: "#9EA4C4" }}>{it.sub}</span>
        </div>
      ))}
    </div>
  );
}

const CHIP_TYPES = [
  {
    name: "アシストチップ",
    desc: "コンテンツに関連する動作(アクション)をその場で実行するチップ。タップすると即座に処理が実行される。例: メール本文の日時に反応して表示される「予定に追加」チップ。",
    example: "予定に追加",
    leading: "+",
  },
  {
    name: "フィルタチップ",
    desc: "コンテンツを絞り込む(フィルタリングする)ためのチップ。タップすると選択状態(チェックマーク)がオン/オフに切り替わり、一覧の表示内容が変わる。例: ECサイトの商品一覧を「在庫あり」の商品だけに絞り込む。M2の「Choiceチップ」はこれに統合された。",
    example: "在庫あり",
    filled: true,
  },
  {
    name: "インプットチップ",
    desc: "ユーザーが入力した情報を表すチップ。あとから選択・削除(✕)できる単位として扱われる。例: メール作成画面の宛先欄に入力した「田中 太郎」という宛先。",
    example: "田中 太郎",
    closable: true,
  },
  {
    name: "サジェスチョンチップ",
    desc: "製品(システム)側が動的に生成した提案を表すチップ。タップするとその内容がそのまま入力される。例: メッセージアプリが自動生成する「了解です!」という返信候補。",
    example: "了解です!",
    leading: "✨",
  },
];

function ChipTypesSection() {
  return (
    <div style={styles.typesCard}>
      <h2 style={styles.diagramTitle}>チップの種類とユースケース</h2>
      <div style={styles.typesGrid}>
        {CHIP_TYPES.map((t) => (
          <div key={t.name} style={styles.typeItem}>
            <div style={styles.typeIllustration}>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  padding: "6px 14px", borderRadius: 8, whiteSpace: "nowrap",
                  background: t.filled ? "#3A4FCF" : "#FFFFFF",
                  border: `1.6px solid ${t.filled ? "#3A4FCF" : "#9EA4C4"}`,
                  color: t.filled ? "#FFFFFF" : "#454C78",
                  fontSize: 12, fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
                }}
              >
                {t.filled && (
                  <svg width="11" height="11" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
                    <path d="M2 6.2l2.6 2.6L10 3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {t.leading && !t.filled && <span style={{ fontSize: 10.5, opacity: 0.75 }}>{t.leading}</span>}
                {t.example}
                {t.closable && <span style={{ fontSize: 10, opacity: 0.6, marginLeft: 1 }}>✕</span>}
              </div>
            </div>
            <div style={styles.typeName}>{t.name}</div>
            <p style={styles.typeDesc}>{t.desc}</p>
          </div>
        ))}
      </div>
      <p style={styles.diagramNote}>
        種類の選び分けは、Googleの公式ページ本文で確認済みの2つの問いに沿っています(2026-09): 「そのチップは動作を表すか、それとも結果を絞り込むか?」(アシスト⇔フィルタ)、「そのコンテンツは製品が生成したものか、それとも人が入力したものか?」(サジェスチョン⇔インプット)。なおM2からM3への変更で、旧「アクションチップ」はアシストチップとサジェスチョンチップに分割され、旧「チョイスチップ」はフィルタチップの一種として統合されています。
      </p>
    </div>
  );
}

const SIZE_BAND_COLOR = { ng: { fill: "#FBE7E7", stroke: "#D64545" }, caution: { fill: "#FDF3D9", stroke: "#E8A317" }, ok: { fill: "#E2F4E8", stroke: "#219653" } };
const SIZE_SCALE = {
  bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }],
  markers: [{ at: 24, label: "24" }, { at: 32, label: "32" }, { at: 44, label: "44" }, { at: 48, label: "48" }],
};

function SizeRangeScale() {
  const domainMax = 60;
  const w = 280;
  const x = (v) => (v / domainMax) * w;
  return (
    <svg viewBox={`0 0 ${w} 44`} style={{ width: "100%", maxWidth: 320, height: "auto", display: "block", margin: "0 auto" }}>
      {SIZE_SCALE.bands.map((b, i) => (
        <rect key={i} x={x(b.from)} y={4} width={x(b.to) - x(b.from)} height={14} fill={SIZE_BAND_COLOR[b.type].fill} stroke={SIZE_BAND_COLOR[b.type].stroke} strokeWidth="1" />
      ))}
      {SIZE_SCALE.markers.map((m, i) => (
        <g key={i}>
          <line x1={x(m.at)} y1={1} x2={x(m.at)} y2={20} stroke="#171B36" strokeWidth="1.4" />
          <circle cx={x(m.at)} cy={1} r="2" fill="#171B36" />
          <text x={x(m.at)} y={34} fontSize="9" fontFamily="IBM Plex Mono" fill="#171B36" textAnchor="middle" fontWeight="600">{m.label}</text>
        </g>
      ))}
    </svg>
  );
}

function SizeInfographic() {
  const legend = [
    { name: "Apple", color: "#C2542A", note: "数値なし(トークンフィールドとしての規定のみ)" },
    { name: "Google", color: "#2F7D6E", note: "見た目32dp・タップ領域48dp(2段構え)" },
    { name: "W3C", color: "#A3821F", note: "24px(AA)/44px(AAA)。どちらも例外あり" },
    { name: "Nielsen Norman Group", color: "#7A4F7E", note: "数値なし(専用記事なし)" },
  ];
  return (
    <div style={styles.infographicCard}>
      <span style={styles.swatchLabel}>サイズの比較</span>
      <SizeRangeScale />
      <div style={styles.infographicLegend}>
        {legend.map((l) => (
          <div key={l.name} style={styles.infographicLegendRow}>
            <span style={{ ...styles.infographicDot, background: l.color }} />
            <span style={styles.infographicLegendName}>{l.name}</span>
            <span style={styles.infographicLegendNote}>{l.note}</span>
          </div>
        ))}
      </div>
      <p style={styles.diagramNote}>0〜60を共通スケール(dp・CSS pxを同じ目盛りに並べた目安。単位の違いはトップの「用語メモ」を参照)とした目安です(赤=非推奨/黄=条件付き/緑=推奨の帯は、WCAGのターゲットサイズ基準に基づく信号色です)。Googleは見た目のコンテナ高さ(32dp)とタップ領域(48dp)を分けている点が特徴的です。Apple・Nielsen Norman Groupは数値基準を明言していないため、スケール上にマーカーはありません。帯の信号色(赤/黄/緑)は、下記の凡例で使う4系列の識別色とは別の配色を使っており、両者の意味を混同しないようにしています。</p>
    </div>
  );
}

export default function SelectionChipsPage() {
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
        <SidebarNav currentPath="/components/selection/chips" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / チップ(Chips)</span>
            <span>SPEC No. 009</span>
          </div>

          <h1 style={styles.title}>チップ(Chips)</h1>
          <p style={styles.subtitle}>Material発祥のパターンを、他系列がどう扱っている(あるいは扱っていない)かサイズ・色・アクセシビリティの観点から比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(Material 3の4種類)</span>
            <ChipSwatch />
            <p style={styles.swatchNote}>アシスト・フィルタ・インプット・サジェスチョンの4種類。角丸長方形(角の半径8dp)のコンテナが共通する。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              チップは<strong>Material Designが体系化したパターン</strong>で、同じ名称のコンポーネントは他系列にはありません。ただしAppleには、入力内容をトークン化するmacOS向けの「トークンフィールド」という近い発想のコントロールが存在し、特にMaterialの「インプットチップ」と役割が重なります。
            </p>
            <p style={styles.synthesisText}>
              Googleは<strong>「チップはボタンではない」</strong>と明確に区別しています。ボタンは常に同じ見た目で配置され直線的な操作を進めるのに対し、チップはタスクに応じて動的に変わる分岐的な選択肢の集合だとしています。主要な操作(次へ/前へなど)をチップに置き換えることは避けるべき、という点は実務上の注意点です。
            </p>
            <p style={styles.synthesisText}>
              サイズについては、<strong>Googleが「見た目32dp・タップ領域48dp」という2段構えの数値</strong>を持つ点が特徴的です。見た目を小さく保ちながら、タップ領域だけを広げるという考え方は、WCAGの24×24px(AA)/44×44px(AAA)基準(どちらも例外あり)を満たすための実務的な工夫と言えます。</p>
            <p style={styles.synthesisText}>
              色については、Googleは<strong>「チップのラベルは背景と3:1以上」</strong>としています。一方WCAGでは、通常サイズの文字には<strong>4.5:1(1.4.3)</strong>、枠線や選択状態の表示には<strong>3:1(1.4.11)</strong>が必要です。Webで作るなら、ラベルは4.5:1を目安にするのが安全です。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupにはチップ専用の設計記事がなく、<strong>4系列の中で最も情報が薄いコンポーネント</strong>です。実務では、他のSelectionコンポーネント(複数選択はチェックボックス、単一選択はラジオボタン)の原則を踏まえつつ、Materialの4分類(アシスト/フィルタ/インプット/サジェスチョン)を判断軸として使うのが実用的でしょう。複数選択なら、<strong>その場で一覧を絞り込むならフィルタチップ、送信して確定するフォームの複数選択ならチェックボックス</strong>が目安です。
            </p>
          </div>

          <ChipTypesSection />

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
                {s.overflow && <InfoBox label="オーバーフロー" accent="#3A4FCF">{s.overflow}</InfoBox>}
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
                <div style={styles.labelCell}>オーバーフロー</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.overflow || <span style={{ color: "#B7BCDA" }}>―(該当する記載なし)</span>}</div>))}
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

          <SizeInfographic />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["選択・切り替え", "検索・絞り込み"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(Googleの使用法・アクセシビリティ本文は確認済み。各サイズのdp数値・カラートークンなどspecs数値は未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはToken Fieldsページへの直接リンクです。WCAGはUnderstandingページ、NN
              groupはスタイルガイド記事です(チップ専用記事なし)。Googleは最新版(M3)の公式ページへリンクしていますが、specsページ本文(各サイズのdp数値など)はまだ確認できていません。
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
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 0", lineHeight: 1.6 },
  infographicCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 22 },
  infographicLegend: { display: "flex", flexDirection: "column", gap: 8, margin: "16px 0 4px" },
  infographicLegendRow: { display: "flex", alignItems: "flex-start", gap: 8 },
  infographicDot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0, marginTop: 3 },
  infographicLegendName: { fontSize: 12, fontWeight: 700, color: "#171B36", width: 130, flexShrink: 0 },
  infographicLegendNote: { fontSize: 11.5, color: "#454C78", lineHeight: 1.5 },
  typesCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 22 },
  typesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 4 },
  typeItem: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 14px 12px" },
  typeIllustration: { marginBottom: 10 },
  typeName: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 6 },
  typeDesc: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10, paddingTop: 8, borderTop: "1px dashed #E1E3F0" },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#9EA4C4", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#7E86AC", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
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
