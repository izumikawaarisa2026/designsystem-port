import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Selection / トグルスイッチ」ページ。
 * チェックボックスと似た「オン・オフ」の二値コントロールだが、即時反映という
 * 挙動の違いが使い分けの決め手になる、という点が4系列でおおむね共通している。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで複数の公式系資料による間接確認だったが、公式ページ本文(使用法・代替選択制御・アイコン・
 * ラベルテキスト・行動・ユースケース・インタラクションとスタイルの各セクション)を確認できたため、
 * その内容を反映済み(2026-09、MD3_text/SWITCH.docx)。トラック・つまみの見た目サイズ(dp単位)や
 * 具体的なカラートークン名など、視覚仕様(specsページ)側の数値はこのテキストに含まれておらず未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Toggles内「Switches」",
    color: "#C2542A",
    position: "チェックボックスより視覚的な重みが大きい、単一設定のオン・オフ用ネイティブコントロール",
    size:
      "数値によるサイズ規定は見当たりません。ネイティブコントロールとしてシステムが自動的に描画します。行の高さを他のコントロールと揃えたい場合は「ミニスイッチ」という小型バリエーションも案内していますが、具体的な数値は示されていません。",
    colorInfo:
      "オン・オフの状態を、トラックの塗りの有無とつまみの位置の違いで示すことを基本にしています。塗りの色はシステムのアクセントカラーに従い、個別に色を指定することは想定されていません。",
    stance:
      "以下はmacOSでの使い分けです。iOS/iPadOSでは、スイッチはリストの行の中でだけ使うとしています(HIG Togglesの「iOS, iPadOS」の節)。スイッチは、オン・オフのような対をなす状態を、異なる見た目で切り替えて示すコントロールだとしています。チェックボックスより視覚的な重みがあるため、複数の設定をまとめて切り替える場合など、チェックボックスより大きな機能範囲を制御する場面に向いているとしています。",
    exceptions:
      "グループ化されたフォーム内では、行の高さを他のコントロールと揃えるために「ミニスイッチ」を使うことも案内しています。ただし、すでにチェックボックスを使っている箇所を、原則としてスイッチに置き換えるべきではないとしています(macOSの節)。",
    accessibility:
      "理解可能(Understandable) ― オン・オフの状態を見た目で正確に伝えるべきという点は、理解可能性に関わります。標準のスイッチコントロールを使えば、支援技術に状態が自動的に伝わります。",
    useCases: [
      "単一の設定項目のオン・オフを即座に切り替える",
      "チェックボックスより大きな機能範囲を制御する場面",
      "グループ化されたフォーム内でミニスイッチを使い行の高さを揃える",
    ],
    searchHint: "don’t replace a checkbox with a switch",
    url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Switches",
    illustration: () => (
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {[false, true].map((on, i) => (
          <svg key={i} width="38" height="22" viewBox="0 0 38 22">
            <rect x="1" y="1" width="36" height="20" rx="10" fill={on ? "#C2542A" : "#FFFFFF"} stroke="#C2542A" strokeWidth="1.6" />
            <circle cx={on ? 27 : 11} cy="11" r="7.5" fill={on ? "#FFFFFF" : "#C2542A"} />
          </svg>
        ))}
      </div>
    ),
    illustrationNote: "AppKitネイティブ(色はシステム依存、ここでは系列識別色で図示)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Switch(使用法・アクセシビリティ)",
    color: "#2F7D6E",
    position: "独立した設定を即座にオン/オフするための推奨コントロール(月額/年額のような相反する2つの選択肢の切り替えには使わない)",
    size:
      "推奨タップ領域は48×48 CSSピクセル。デフォルトで高密度設定を適用すべきではないとしています(密度を上げるとターゲットサイズが48×48pxを下回ってしまうため)。より高密度なレイアウトをユーザーが選べるようにする場合も、対象の各要素は最低48×48ピクセルへ戻せる設計にすべきとしています。トラック・つまみの見た目サイズ(dp単位)はこのテキストに含まれておらず未確認です。",
    colorInfo:
      "色の値はカラーロールに対応するデザイントークンを通じて実装されます。隣接するテキストラベルの色は、ラベルやコンポーネントを操作している最中かどうかにかかわらず、サーフェス上のカラーロールを一貫して使うとしています。",
    glossary: [
      { term: "デザイントークン", desc: "色・サイズ・角丸などの具体的な値に、意味のある名前を付けて管理する仕組み。実際の値(例: #3A4FCF)を各所に直接書く代わりに「primary」のような名前を参照させることで、値を1箇所変更するだけで全体に反映できる。" },
      { term: "カラーロール", desc: "色そのものではなく「役割」で色を管理する考え方。例えば「on-surface(サーフェス上の文字色)」のように、UI内でその色が果たす役割を指定する。実際の色の値はテーマ(ライト/ダークなど)側で決まるため、テーマが切り替わっても同じ役割名を参照するだけで自動的に適切な色になる。" },
    ],
    stance:
      "設定やその他の独立したオプションを調整するのに最適なコントロールと位置づけられています。オン/オフ・真/偽のような二者択一を選ぶもので、切り替えた効果は保存操作なしに即座に反映されるべきとしています。リスト内の項目を個別に制御できる場合はスイッチ(ラジオボタンではない)を使うべきとしています。",
    exceptions:
      "スイッチは、ほかの設定と独立した1つの設定のオン/オフを制御するためのもので、月額/年額のような相反する2つの選択肢を切り替えるためのものではないとしています。リスト表示/マップ表示の切り替えのように、複数の選択肢から1つだけを選ぶ場面では、スイッチではなく接続されたボタングループを使うべきとしています。またスイッチはボタンの代替にはならず(人はボタンに行動喚起を期待する)、保存操作を要する複数選択にスイッチを使うことも避けるべきで、その場合はチェックボックスを使うべきとしています。",
    accessibility:
      "操作可能(Operable) ― キーボードまたはスイッチ入力で移動・切り替えできるべきとしています。ハンドルは操作時にサイズが変化してフィードバックを与えます(タッチ時の拡大、カーソルホバー時のホバー領域拡大など)。ラベルテキストをスイッチ本体に直接載せることは避け(文字が小さくなりすぎるため)、意味の明確なアイコンを使うべきとしています。",
    useCases: [
      "単一項目のオン/オフを即座に切り替える(保存操作なし)",
      "ほかと独立した1つの設定のオン/オフを調整する",
      "リスト表示/マップ表示のような、相反する選択肢の切り替えには接続されたボタングループを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/switch/guidelines",
    urlSecondary: [{ label: "Specs(最新版)", url: "https://m3.material.io/components/switch/specs" }],
    confirmedNote: "使用法・代替選択制御・アイコン・ラベルテキスト・行動・ユースケース・インタラクションとスタイルの各セクションは2026-09時点で確認済み。トラック・つまみの見た目サイズ(dp)やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="38" height="22" viewBox="0 0 38 22">
        <rect x="1" y="1" width="36" height="20" rx="10" fill="#2F7D6E" />
        <circle cx="27" cy="11" r="7.5" fill="#FFFFFF" />
      </svg>
    ),
    illustrationNote: "系列識別色で図示。実際のカラートークンは未確認",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.5.8 / 2.5.5 / 1.4.11 / 3.2.2",
    color: "#A3821F",
    position: "形状を問わず状態を支援技術に正しく伝えることを要求",
    size:
      "スイッチ専用のサイズ規定はありませんが、WCAG 2.2の一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA、拡張基準)は44×44 CSSピクセルを求めます(どちらも例外あり。詳しくは「ボタン」ページを参照)。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、トラックやつまみの視覚的な境界・状態は、周囲との間で3:1以上のコントラスト比を確保すべきとしています。1.4.1により、色だけで状態(オン・オフ)を示すことも避けるべきです。",
    glossary: [
      { term: "3.2.2 On Input・レベルA", desc: "部品の設定(選択・チェック・入力)を変えただけで、事前の説明なしに文脈の変化を起こさないことを求める基準。リンクやボタンを押すことは「設定の変更」ではない。" },
      { term: "文脈の変化(change of context)", desc: "利用者が気づかないうちに起きると混乱させる大きな変化。新しいウィンドウを開く、フォーカスを別の部品に移す、別のページへ移動する、ページの内容を大きく組み替える、など。内容の変化(アコーディオンの開閉・タブの切り替えなど)は、それだけでは文脈の変化ではない。" },
    ],
    stance:
      "スイッチのような独自UIコンポーネントは、その名前(ラベル)・役割・状態(オン・オフ)が、支援技術から取得・設定できなければならないとしています。見た目上はボタンやチェックボックスと異なりますが、WCAGは形状を問わず同じ基準を適用します。スイッチの切り替えは「設定の変更」にあたるため、3.2.2(レベルA)により、切り替えただけで別の画面へ移動したり新しいウィンドウを開いたりする場合は、事前に知らせる必要があります。設定がその場で反映されるだけなら、内容の変化であって文脈の変化ではありません。",
    exceptions:
      "HTMLには広く使える標準のスイッチ部品がないため、Webのスイッチの多くは独自の実装になります。その場合は、role=\"switch\"とaria-checkedなどで、スイッチであることと状態(オン・オフ)を支援技術に伝える必要があります。",
    accessibility:
      "堅牢(Robust) ― POUR原則のうち「堅牢」に対応する、互換性(4.1)の達成基準です。加えて操作可能(Operable)の観点からターゲットサイズ(2.5)、知覚可能(Perceivable)の観点から非テキストのコントラスト(1.4.11)も関わります。3.2.2は「理解可能(Understandable)」の予測可能性(3.2)に関わります。",
    useCases: [
      "ARIAのswitchロールなどで支援技術にスイッチであることを伝える",
      "状態(オン・オフ)がプログラム的に伝わるようにする",
      "切り替えただけで画面の移動や新しいウィンドウを起こさない(起こすなら事前に知らせる、3.2.2)",
    ],
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    urlSecondary: [
      { label: "3.2.2 On Input", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-input.html" },
    ],
    confirmedNote: "3.2.2はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <rect x="10" y="14" width="20" height="12" rx="6" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>最小タップ領域(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、タップ領域の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Toggle-Switch Guidelines",
    color: "#7A4F7E",
    position: "オンとオフの2状態+即時反映が前提の場面に限定使用",
    size:
      "数値基準は明言していません。ただし即時反映という挙動そのものが、ユーザーが誤操作にすぐ気づき、元に戻しやすいUXの前提になっているとしています。",
    colorInfo:
      "色についての数値基準はありません。動きや色などの視覚的な手がかりを一貫して使い、プラットフォームの慣習に沿うべきとしています。",
    stance:
      "トグルスイッチは、オンとオフの2つの状態のどちらかを選び、デフォルト値を持ち、選択結果が即座に反映される場面で使うべきとしています。保存や送信ボタンを必要とする設定には向かないとしています。たとえば、送信が必要な長いフォームにトグルを混ぜると、すぐ反映されたのか分からず利用者が混乱するとし、航空会社のアプリで、トグルを押しても見た目が変わるだけで何も起きない例を挙げて、この場合は単独のチェックボックスが適切だったとしています。",
    exceptions:
      "ラベルは短く直接的にし、曖昧な表現や質問形式を避けるべきとしています。また、動きや色などの視覚的な手がかりを使い、プラットフォームの慣習に沿って一貫した実装をすべきとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、即時反映という挙動の違いに基づく使い分けの指針です。",
    useCases: [
      "オン・オフの2状態を即座に反映する設定",
      "保存や送信ボタンを必要としない場面",
      "デフォルト値を持つ独立した設定",
    ],
    searchHint: "immediate results",
    url: "https://www.nngroup.com/articles/toggle-switch-guidelines/",
    illustration: () => (
      <svg width="38" height="22" viewBox="0 0 38 22">
        <rect x="1" y="1" width="36" height="20" rx="10" fill="#7A4F7E" />
        <circle cx="27" cy="11" r="7.5" fill="#FFFFFF" />
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

function ToggleSwatch() {
  const items = [
    { on: false, label: "オフの状態" },
    { on: true, label: "オンの状態" },
  ];
  return (
    <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="38" height="22" viewBox="0 0 38 22">
            <rect x="1" y="1" width="36" height="20" rx="10" fill={it.on ? "#3A4FCF" : "#FFFFFF"} stroke={it.on ? "#3A4FCF" : "#9EA4C4"} strokeWidth="2" />
            <circle cx={it.on ? 27 : 11} cy="11" r="7.5" fill={it.on ? "#FFFFFF" : "#9EA4C4"} />
          </svg>
          <span style={{ fontSize: 12, color: "#2E3457" }}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

const SIZE_BAND_COLOR = { ng: { fill: "#F7E4E1", stroke: "#C0503F" }, caution: { fill: "#FBF0D9", stroke: "#A97A1A" }, ok: { fill: "#E4F0EC", stroke: "#2F7D6E" } };
const SIZE_SCALE = {
  bands: [{ from: 0, to: 24, type: "ng" }, { from: 24, to: 44, type: "caution" }, { from: 44, to: 60, type: "ok" }],
  markers: [{ at: 24, label: "24" }, { at: 44, label: "44" }, { at: 48, label: "48" }],
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
    { name: "Apple", color: "#C2542A", note: "数値なし(コントロールサイズに応じてシステムが自動決定)" },
    { name: "Google", color: "#2F7D6E", note: "48px(既定のタップ領域)" },
    { name: "W3C", color: "#A3821F", note: "24px(AA)/44px(AAA)。どちらも例外あり" },
    { name: "Nielsen Norman Group", color: "#7A4F7E", note: "数値なし(即時反映という挙動の違いに基づく指針)" },
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
      <p style={styles.diagramNote}>0〜60pxを共通スケールとした目安です(赤=非推奨/黄=条件付き/緑=推奨の帯は、WCAGのターゲットサイズ基準に基づく)。Apple・Nielsen Norman Groupは数値基準を明言していないため、スケール上にマーカーはありません。</p>
    </div>
  );
}

export default function SelectionTogglePage() {
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
        <SidebarNav currentPath="/components/selection/toggle" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / トグルスイッチ</span>
            <span>SPEC No. 007</span>
          </div>

          <h1 style={styles.title}>トグルスイッチ</h1>
          <p style={styles.subtitle}>4つのガイドラインが、チェックボックスとの使い分け・サイズ・色・アクセシビリティをどう説明しているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <ToggleSwatch />
            <p style={styles.swatchNote}>オン・オフの2状態を、送信ボタンなしで即座に切り替えるコントロール。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              トグルスイッチは<strong>「オン・オフの2状態を切り替える」</strong>部品です。<strong>即座に反映することを明示しているのはGoogleとNielsen Norman Group</strong>で、NN groupは特に、保存ボタンを必要とせず結果が即座に反映される点を、チェックボックスとの決定的な違いとして挙げています。保存・送信ボタンで確定するフォームにトグルを混ぜると、「もう反映されたのか」が分からず混乱を招きます。
            </p>
            <p style={styles.synthesisText}>
              Appleは(macOSで)<strong>すでにチェックボックスを使っている箇所を、原則としてスイッチに置き換えるべきではない</strong>としていますが、理由は即時反映ではなく、<strong>見た目の重さと一貫性</strong>です(iOS/iPadOSでは、スイッチはリストの行の中で使います)。Googleは<strong>月額/年額のような相反する2つの選択肢の切り替えにはスイッチを使わない</strong>と明記しています。WCAGは即時反映を定めておらず、スイッチの名前・役割・状態が支援技術に伝わること(4.1.2)を求めます。
            </p>
            <p style={styles.synthesisText}>
              サイズについては、<strong>Appleが明示しない一方でGoogleは「既定で48×48 CSSピクセルを下回らせない」という具体的な数値</strong>を持っており、チェックボックス・ラジオボタンと同一の考え方です。WCAGはコンポーネントの種類を問わず、24×24px(AA)/44×44px(AAA)のターゲットサイズ(どちらも例外あり)と非テキストのコントラスト(1.4.11)を一般基準として要求しており、実務上はこのWCAG基準とGoogleの48dpが最も具体的な数値の指針になります。
            </p>
          </div>

          <SizeInfographic />

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
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["選択・切り替え", "入力・フォーム"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(Googleの使用法・アクセシビリティ本文は確認済み。specs数値の一部は未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはTogglesページ内のSwitchesセクションへのアンカー付きリンクです。WCAGはUnderstandingページ、NN groupは記事ページ単位です。Googleは最新版(M3)の公式ページへリンクしていますが、specsページ本文(見た目サイズの数値など)はまだ確認できていません。
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
  infographicCard: { background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 14px", marginBottom: 22 },
  infographicLegend: { display: "flex", flexDirection: "column", gap: 8, margin: "16px 0 4px" },
  infographicLegendRow: { display: "flex", alignItems: "flex-start", gap: 8 },
  infographicDot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0, marginTop: 3 },
  infographicLegendName: { fontSize: 12, fontWeight: 700, color: "#171B36", width: 130, flexShrink: 0 },
  infographicLegendNote: { fontSize: 11.5, color: "#454C78", lineHeight: 1.5 },
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
