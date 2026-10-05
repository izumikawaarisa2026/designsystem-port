import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Selection / ラジオボタン」ページ。
 * チェックボックス(複数選択)と対をなす、相互排他的な単一選択のコンポーネント。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Google(Material Design 3)は公式サイトがクライアント側レンダリングのSPAで自動取得できないため、
 * これまで複数の公式系資料による間接確認だったが、公式ページ本文(使用法・配置・行動・ユースケース・
 * インタラクションとスタイル・初期フォーカス・ラベル要素の各セクション)を確認できたため、
 * その内容を反映済み(2026-09、MD3_text/radio_text.docx)。正方形本体の見た目サイズ(dp単位)や
 * 具体的なカラートークン名など、視覚仕様(specsページ)側の数値はこのテキストに含まれておらず未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Toggles内「Radio buttons」",
    color: "#C2542A",
    position: "小さな円形+ラベル、2〜5個のグループで相互排他的選択に使用",
    size:
      "数値によるサイズ規定は見当たりません。ラジオボタンもAppKitが描画するネイティブコントロールで、システムが自動的にサイズを調整します。水平に並べる場合は一貫した間隔を保つべきとしていますが、具体的な数値は示されていません。",
    colorInfo:
      "選択時は塗りつぶされた円、非選択時は空の円という形状の違いで状態を示すことを基本にしています。塗りの色はシステムのアクセントカラーに従い、個別に色を指定することは想定されていません。",
    stance:
      "ラジオボタンは、ラベルを伴う小さな円形のボタンで、通常2〜5個のグループとして表示され、相互排他的な選択肢の集合を提示するものと定義されています。単一のオン・オフ設定を示したい場合は、ラジオボタンではなくチェックボックスを使うべきとしています。",
    exceptions:
      "ラジオボタンも「不定(mixed)」状態を表示できますが、追加のラジオボタンで複数の状態を表現できるため、この状態が有用な場面はまれだとしています。設定や項目が混在状態を示したい場合は、チェックボックスの使用を検討すべきとしています。また、選択肢が多すぎるリストは避け、水平に並べる場合は一貫した間隔を保つべきとしています。",
    accessibility:
      "理解可能(Understandable) ― 選択・非選択の状態を見た目で正確に伝えるべきという点は、理解可能性に関わります。標準のラジオボタンコントロールを使えば、グループ内での相互排他性が支援技術に自動的に伝わります。",
    useCases: [
      "2〜5個程度の選択肢からちょうど1つを選ばせる",
      "設定画面で相互排他的なオプションを提示する",
      "全ての選択肢を並べて比較させたい場面",
    ],
    searchHint: "mutually exclusive choices",
    url: "https://developer.apple.com/design/human-interface-guidelines/toggles#Radio-buttons",
    illustration: () => (
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {["selected", "unselected", "unselected"].map((st, i) => (
          <svg key={i} width="22" height="22" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r="9" fill="#FFFFFF" stroke="#C2542A" strokeWidth="2" />
            {st === "selected" && <circle cx="11" cy="11" r="4.5" fill="#C2542A" />}
          </svg>
        ))}
      </div>
    ),
    illustrationNote: "AppKitネイティブ(色はシステム依存、ここでは系列識別色で図示)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Radio button(使用法・アクセシビリティ)",
    color: "#2F7D6E",
    position: "リストから1つを選ぶ推奨コントロール。5個以下の選択肢に向く",
    size:
      "推奨タップ領域は48×48 CSSピクセル。デフォルトで高密度設定を適用すべきではないとしています(密度を上げるとターゲットサイズが48×48pxを下回ってしまうため)。より高密度なレイアウトをユーザーが選べるようにする場合も、対象の各要素は最低48×48ピクセルへ戻せる設計にすべきとしています。正方形本体自体の見た目サイズ(dp単位)はこのテキストに含まれておらず未確認です。",
    colorInfo:
      "色の値はカラーロールに対応するデザイントークンを通じて実装されます。隣接するテキストラベルの色は、ラベルやコンポーネントを操作している最中かどうかにかかわらず、サーフェス上のカラーロールを一貫して使うとしています。",
    glossary: [
      { term: "デザイントークン", desc: "色・サイズ・角丸などの具体的な値に、意味のある名前を付けて管理する仕組み。実際の値(例: #3A4FCF)を各所に直接書く代わりに「primary」のような名前を参照させることで、値を1箇所変更するだけで全体に反映できる。" },
      { term: "カラーロール", desc: "色そのものではなく「役割」で色を管理する考え方。例えば「on-surface(サーフェス上の文字色)」のように、UI内でその色が果たす役割を指定する。実際の色の値はテーマ(ライト/ダークなど)側で決まるため、テーマが切り替わっても同じ役割名を参照するだけで自動的に適切な色になる。" },
    ],
    stance:
      "ユーザーが複数の選択肢から1つを選ぶための推奨コントロールと定義されています。リストから1つの項目しか選択できない場合はラジオボタン(スイッチではない)を使うべきとし、選択肢が5つ以下の場合に向くとしています。画面スペースを節約したい場合はドロップダウンメニューの使用を検討できますが、ドロップダウンはクリック数・認知負荷の両面で追加の手間になるとも指摘しています。",
    exceptions:
      "ラジオボタンのネスト(入れ子)や、複数選択のための使用は避けるべきとしています。常に1つのオプションが事前選択された状態で開始すべきで、積み重ねた(縦の)レイアウトを基本とし、水平方向のリストは避けるべきとしています。選択済みのラジオボタンは、ユーザー操作だけでは選択解除できないため、解除が必要な場合は「該当なし」の選択肢や「選択をクリア」といった別の手段を用意すべきとしています。",
    accessibility:
      "操作可能(Operable) ― グループ外からTabキーで移動すると、選択済みのラジオボタンに直接フォーカスが移動します(未選択なら先頭の項目)。矢印キーで選択肢間を移動できるべきとしています。UIテキストが正しくリンクされていれば、支援技術はテキストに続けてコンポーネントの役割(ラジオグループ)を読み上げます。",
    useCases: [
      "リストから1つの項目だけを選ばせる(複数選択が必要ならチェックボックスを使う)",
      "5個以下の選択肢を縦に並べ、全て見せた状態で選ばせる",
      "常に1つのオプションを事前選択しておく",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/radio-button/guidelines",
    urlSecondary: [{ label: "Specs(最新版)", url: "https://m3.material.io/components/radio-button/specs" }],
    confirmedNote: "使用法・配置・行動・ユースケース・インタラクションとスタイル・初期フォーカス・ラベル要素の各セクションは2026-09時点で確認済み。円の見た目サイズ(dp)やカラートークン名などのspecs数値は未確認。",
    illustration: () => (
      <svg width="22" height="22" viewBox="0 0 22 22">
        <circle cx="11" cy="11" r="9" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="2" />
        <circle cx="11" cy="11" r="4.5" fill="#2F7D6E" />
      </svg>
    ),
    illustrationNote: "系列識別色で図示。実際のカラートークンは未確認",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.5.8 / 2.5.5 / 1.4.11",
    color: "#A3821F",
    position: "状態と相互排他性を支援技術に正しく伝えることを要求",
    size:
      "ラジオボタン専用の数値基準はありませんが、WCAG 2.2の一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA、拡張基準)は44×44 CSSピクセルを求めます。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、選択状態を示す塗りつぶしの円などの視覚的要素は、周囲との間で3:1以上のコントラスト比を確保すべきとしています。1.4.1により、色だけで選択状態を示すことも避けるべきです。",
    stance:
      "ラジオボタンのような独自UIコンポーネントは、その名前(ラベル)・役割(ラジオボタンであること)・状態(選択・非選択)、そしてグループ内での相互排他性が、支援技術から取得・設定できなければならないとしています。",
    exceptions:
      "標準的なHTMLのinput type=\"radio\"要素を同じname属性でグループ化していれば、ブラウザが自動的にこれらの情報を提供するため、通常は追加の対応は不要です。独自にデザインしたカスタムラジオボタンを実装する場合にのみ、この基準への配慮が必要になります。",
    accessibility:
      "堅牢(Robust) ― POUR原則のうち「堅牢」に対応する、互換性(4.1)の達成基準です。加えて操作可能(Operable)の観点からターゲットサイズ(2.5)、知覚可能(Perceivable)の観点から非テキストのコントラスト(1.4.11)も関わります。",
    useCases: [
      "支援技術のユーザーがグループ内を移動し、1つを選択できるようにする",
      "相互排他性(1つ選ぶと他が自動的に外れる)がプログラム的に伝わるようにする",
    ],
    searchHint: "Name, Role, Value",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="2" y="2" width="36" height="36" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="8" fill="#A3821F" />
        </svg>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>最小タップ領域(概念図)</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、タップ領域の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Checkboxes vs. Radio Buttons",
    color: "#7A4F7E",
    position: "相互排他的な選択肢に限定使用(数値基準ではなく使い分けの指針)",
    size:
      "数値基準は明言していません。ただし選択肢は常にすべて可視状態に保つべきとしており、隠れた選択肢のために追加の操作が発生しない設計を推奨しています。",
    colorInfo:
      "色についての数値基準はありません。デフォルトで1つの選択肢を選んだ状態にしておくことが、視覚的にも分かりやすいとしています。",
    stance:
      "2つ以上の選択肢があり、それらが相互排他的で、ユーザーが必ず1つを選ばなければならない場合にラジオボタンを使うべきとしています。選択肢は縦方向に1行1つで配置し、常にすべての選択肢を可視状態に保つことを推奨しています。",
    exceptions:
      "デフォルトで1つの選択肢を選んだ状態にしておくべきとしています(関連記事「Radio Buttons: Select One by Default or Leave All Unselected?」でも、ほとんどの場合デフォルト選択が優れたUXになると結論づけています)。選択肢が網羅的でない場合は「その他」の選択肢を用意すべきとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、選択のしやすさに関する設計根拠です。",
    useCases: [
      "相互排他的な2つ以上の選択肢から1つを選ばせる",
      "デフォルト選択肢を用意し、無選択状態を避ける",
      "選択肢が網羅的でない場合に「その他」を用意する",
    ],
    searchHint: "mutually exclusive",
    url: "https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/",
    urlSecondary: [{ label: "Radio Buttons: Select One by Default?", url: "https://www.nngroup.com/articles/radio-buttons-default-selection/" }],
    illustration: () => (
      <svg width="22" height="22" viewBox="0 0 22 22">
        <circle cx="11" cy="11" r="9" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="2" />
        <circle cx="11" cy="11" r="4.5" fill="#7A4F7E" />
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

function RadioSwatch() {
  const items = [
    { state: "selected", label: "選択済みの項目" },
    { state: "unselected", label: "未選択の項目" },
  ];
  return (
    <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="#FFFFFF" stroke={it.state === "selected" ? "#3A4FCF" : "#9EA4C4"} strokeWidth="2" />
            {it.state === "selected" && <circle cx="10" cy="10" r="4" fill="#3A4FCF" />}
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
    { name: "W3C", color: "#A3821F", note: "24px(AA)/44px(AAA)" },
    { name: "Nielsen Norman Group", color: "#7A4F7E", note: "数値なし(すべての選択肢を可視状態に保つ指針)" },
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

export default function SelectionRadioPage() {
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
        <SidebarNav currentPath="/components/selection/radio" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ラジオボタン</span>
            <span>SPEC No. 006</span>
          </div>

          <h1 style={styles.title}>ラジオボタン</h1>
          <p style={styles.subtitle}>4つのガイドラインが、単一選択のコンポーネントとしてサイズ・色・アクセシビリティをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <RadioSwatch />
            <p style={styles.swatchNote}>2〜5個のグループで使い、常に1つが選択された状態を基本とする。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              ラジオボタンは4系列とも<strong>「複数の選択肢から1つだけを選ぶ」相互排他的な用途</strong>で一致しています。特にApple・Google・Nielsen Norman Groupは、チェックボックス(複数選択)との役割の違いを明確に示しています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Group・Appleに加え、<strong>Googleも「常に1つのオプションを事前選択しておくべき」</strong>と明記しており、3系列が同じ運用ルールで一致しています。また<strong>Googleは「選択肢が5個以下の場合に向く」という具体的な目安</strong>を持ち、選択肢が多い/省スペースにしたい場合はドロップダウンを検討すべきとしています(ただしクリック数・認知負荷の面で追加の手間になるとも指摘)。
            </p>
            <p style={styles.synthesisText}>
              サイズについては、<strong>Googleも「既定で48×48 CSSピクセルを下回らせない」という具体的な数値</strong>を持っており、チェックボックスと同じ考え方です。WCAGはコンポーネントの種類を問わず、24×24px(AA)/44×44px(AAA)のターゲットサイズと、非テキストのコントラスト(1.4.11)を一般基準として要求しています。
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
            <span>最終確認: 2026-09(Googleの使用法・アクセシビリティ本文は確認済み。specs数値の一部は未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはTogglesページ内のRadio buttonsセクションへのアンカー付きリンクです。WCAGはUnderstandingページ、NN groupは記事ページ単位です。Googleは最新版(M3)の公式ページへリンクしていますが、specsページ本文(見た目サイズの数値など)はまだ確認できていません。
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
