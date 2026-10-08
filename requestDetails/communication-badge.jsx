import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Communication / バッジ」ページ。
 * アイコンやタブなどの上に重ねて表示し、通知の有無(ドット)や件数(数字)を
 * 示す小さな装飾要素の4系列比較。Communicationのページの中で最も「独立した専用ページ」を
 * 持つ系列が少なく、各系列とも他コンポーネント(通知・タブ・アイコン)の
 * 一部として説明されている点が特徴。
 *
 * Nielsen Norman Group(UI Elements Glossaryの「Badge」項目、「スナックバー」
 * 「トースト」「アラート/バナー」の各ページと同一記事)は本文を直接取得して
 * 確認済み(2026-09)。W3Cは、バッジ専用のARIAロールが存在しないことを確認した
 * 上で、MDN/W3CのARIA14(aria-labelでアクセシブルネームを与える手法)・
 * WCAG 4.1.2(Name, Role, Value)の各ページ本文を直接取得して確認した
 * (いずれも一般的なラベリング手法であり、バッジ専用の一次文書ではない)。
 *
 * Apple(HIGのNotificationsページ内のアプリアイコンバッジ、Tab Barsページ内の
 * タブバッジ)・Google(M3の独立コンポーネント「Badges」)はいずれもSPAサイトの
 * ため検索結果による間接確認(2026-09)。GoogleのみバッジをM3の独立コンポーネント
 * 一覧に持ち、小(ドット)/大(数字・最大4文字)の2バリエーションが明確に定義
 * されている一方、Appleは「バッジ」という単独ページを持たない。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Notifications(アプリアイコン)/ Tab Bars(タブ)",
    color: "#C2542A",
    noDedicatedComponent: true,
    position: "「バッジ」という単独ページはなく、アプリアイコン上の未読件数バッジ(Notificationsページ)と、タブ上のバッジ(Tab Barsページ)という2箇所に説明が分かれている",
    size: "具体的なpt数値は確認できていません。",
    colorInfo: "赤い楕円に白文字という配色が事実上の標準として説明されています(検索結果による確認)。",
    stance:
      "アプリアイコンのバッジは、赤い楕円の中に数字またはアイコンを表示し、未読の通知件数を示すものだとしています。ユーザーが対応すると消え、新しい通知が来ると再表示されるとしています。バッジは通知を補助する目的で使い、重大な情報の伝達手段そのものにはすべきでないとしています。タブバーのバッジも同様に赤い楕円(数字または感嘆符)で、そのタブに新しい情報があることを控えめに伝えるものだとしています。",
    exceptions:
      "重要または新しい情報に限定して使うべきで、多用は控えるべきだとしています。対応した情報が読まれた時点で速やかにバッジを更新・非表示にすべきだとも述べています。",
    scenarios: [
      "アプリアイコン上で未読通知の件数を控えめに知らせたい時",
      "タブバーの特定のタブに新着情報があることを示したい時",
    ],
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "重要・新規の情報に限定して使い、多用を避ける",
      "対応済みの情報は速やかにバッジから取り除く",
      "バッジ単体を情報伝達の主手段にしない(通知本体を補助する位置づけに留める)",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/notifications",
    urlSecondary: [{ label: "Tab Bars(タブ上のバッジ)", url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars" }],
    confirmedNote: "両ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。「バッジ」という独立ページが存在しないこと自体も検索結果による確認です。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 26, height: 26 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#F0DED4" }} />
          <div style={{ position: "absolute", top: -4, right: -4, width: 9, height: 9, borderRadius: "50%", background: "#C2542A" }} />
        </div>
        <div style={{ position: "relative", width: 26, height: 26 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#F0DED4" }} />
          <div style={{ position: "absolute", top: -6, right: -8, minWidth: 16, height: 14, borderRadius: 7, background: "#C2542A", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
            <span style={{ fontSize: 8.5, color: "#FFFFFF", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>3</span>
          </div>
        </div>
      </div>
    ),
    illustrationNote: "ドット(左)/数字(右)いずれも赤い楕円が事実上の標準(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Badges",
    color: "#2F7D6E",
    position: "アイコン・タブ・ナビゲーション項目に重ねて表示し、通知や件数を示す小さなコンポーネント。小(ドット)/大(数字・テキスト)の2バリエーションが独立コンポーネントとして定義されている",
    size: "バッジ内のテキストは「+」を含め最大4文字までに制限すべきとされています(例: 999+)。具体的なdp数値は確認できていません。",
    colorInfo: "カラートークンの詳細は公式ページ本文で未確認です。",
    stance:
      "小サイズのバッジ(ドット)は存在を示すだけで文字を持たず、大サイズのバッジは数字やテキストで件数を定量的に示すとしています。タブでは小・大どちらのバッジも使え、ナビゲーションレールでは折りたたみ時はアイコンの右上角、展開時はラベルテキストの隣に配置するとされています。ユーザーが該当する内容を確認したら、バッジの値を更新するか非表示にすべきだとしています。",
    exceptions:
      "桁数が多い件数は「+」付きで丸めて4文字以内に収めるべきとされ、際限なく数字を伸ばすことは想定されていません。",
    scenarios: [
      "タブ・ナビゲーション項目に未読件数や新着の有無を示したい時",
      "存在の有無だけを伝えたい時は小サイズ(ドット)を使う",
      "具体的な件数を伝えたい時は大サイズ(数字・最大4文字)を使う",
    ],
    accessibility: "具体的な数値基準は確認できていません。バッジ自体には装飾的な意味しか持たせず、意味のある情報は親要素(アイコンボタン等)側で支援技術に伝えるべきだと考えられます(直接確認はできていません)。",
    useCases: [
      "存在のみを示す場合は小(ドット)、件数を示す場合は大(数字)を使い分ける",
      "件数は「+」付きで4文字以内に丸める",
      "確認された内容のバッジは速やかに更新・非表示にする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/badges/guidelines",
    confirmedNote: "m3.material.ioの公式ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 26, height: 26 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#DDEFEA" }} />
          <div style={{ position: "absolute", top: -4, right: -4, width: 9, height: 9, borderRadius: "50%", background: "#2F7D6E" }} />
        </div>
        <div style={{ position: "relative", width: 26, height: 26 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#DDEFEA" }} />
          <div style={{ position: "absolute", top: -6, right: -10, minWidth: 18, height: 14, borderRadius: 7, background: "#2F7D6E", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
            <span style={{ fontSize: 8, color: "#FFFFFF", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>99+</span>
          </div>
        </div>
      </div>
    ),
    illustrationNote: "小(ドット、左)/大(数字、最大4文字・右)の2バリエーション(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― 専用ロールなし(ARIA14のaria-label手法を援用)",
    color: "#A3821F",
    noDedicatedComponent: true,
    position: "「バッジ」自体に対応する専用のARIAロールは存在しない。装飾的な視覚要素として扱い、件数などの意味は親要素(アイコンボタン等)のアクセシブルネームに含める、というARIA14のaria-label手法を援用するのが一般的",
    size: "専用の数値基準はありません。",
    colorInfo: "ドットのバッジは、周りの色に対して3:1以上(1.4.11 非テキストのコントラスト)、バッジの中の数字は、バッジの背景に対して4.5:1以上(1.4.3 文字のコントラスト)が必要です。ドットがあるかないか自体は色以外の手がかりなので、直ちに1.4.1(色の使用)の違反にはなりません。ただし、色の違いだけで状態を分けない(例: 赤いドットと青いドットで意味を変えない)ようにし、ドットで新着を示す場合も、支援技術には親要素の名前などで同じ意味を伝えます。",
    glossary: [
      { term: "ARIA14 / aria-label", desc: "視覚的なラベルを置けない要素に対し、aria-label属性でアクセシブルネームを与える手法。バッジ付きのアイコンボタンでは、装飾的なバッジをaria-hidden=\"true\"で隠し、件数を親のボタンのaria-labelに含める実装(例: aria-label=\"通知(4件)\")がこの技法の応用として紹介される。" },
    ],
    stance:
      "ARIA14は、視覚的な文字ラベルを置けない場面でaria-label属性を使いアクセシブルネームを与える技法で、記号だけの閉じるボタンなどが例として挙げられています。バッジ付きアイコンにこれを応用すると、装飾要素であるバッジ自体はaria-hidden=\"true\"で隠し、件数などの意味のある情報は親のボタン・アイコンのaria-labelに畳み込む実装が一般的だとされます。これはWCAG 4.1.2(Name, Role, Value)が求める「名前・役割・値がプログラム的に取得できること」を満たすための具体的な手段です。",
    exceptions:
      "可視のラベル文字列がすでに存在する場合は、WCAG 2.5.3(Label in Name)により、aria-labelにもその可視文字列を含める必要があるとされています(バッジ専用の例外規定ではなく、ラベル全般に共通する規定)。",
    scenarios: [
      "アイコンに重ねた件数バッジの意味を支援技術に伝えたい時",
      "ドットのバッジで、色の違いだけで状態を分けてしまうのを避けたい時",
    ],
    accessibility: "堅牢(Robust)・知覚可能(Perceivable) ― 名前・役割・値がプログラム的に決定できること(4.1.2)、色の違いだけで状態を分けないこと(1.4.1)、ドットや数字のコントラスト(1.4.11・1.4.3)が関わります。",
    useCases: [
      "装飾的なバッジ要素にはaria-hidden=\"true\"を設定する",
      "件数などの意味は親要素(アイコンボタン等)のaria-labelに含める",
      "色の違いだけで状態を分けない。ドットで新着を示す場合も、親要素の名前などで同じ意味を支援技術に伝える",
      "ドットは周りの色と3:1以上(1.4.11)、数字はバッジの背景と4.5:1以上(1.4.3)にする",
    ],
    searchHint: "aria-label",
    url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14",
    urlSecondary: [{ label: "4.1.2 Name, Role, Value", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" }],
    confirmedNote: "ARIA14・4.1.2解説ページとも本文を直接確認しました(2026-09)。いずれもバッジ専用の一次文書ではなく、一般的なラベリング手法・達成基準をバッジに適用した間接的な整理です。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="180" height="24" viewBox="0 0 180 24">
          <rect x="1" y="1" width="178" height="22" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="90" y="15" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-label=&quot;通知(4件)&quot;</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、アクセシブルネームへの畳み込み方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "UI Elements Glossary ― Badge項目(「スナックバー」「トースト」「アラート/バナー」の各ページと同一記事)",
    color: "#7A4F7E",
    position: "アイコンの上に重ねて表示し、通知(主にドット)またはアイテム数(主に数字)を示す小さな要素、という用語集としての定義",
    size: "数値基準は明言していません。",
    colorInfo: "色についての基準はありません。",
    stance:
      "UI Elements Glossaryは、バッジを、ショッピングカートやメッセージなどのアイコンに重ねて、通知の有無(多くはドット)や件数(多くは数字)を示す小さな要素として定義しています。用語集の1項目としての簡潔な定義に留まり、頻度や配色、乱用を避けるための具体的な設計ガイドラインまでは踏み込んでいません。",
    exceptions:
      "この項目は用語の定義のみで、使用シーンの許容・非許容を示す詳細な基準は記載されていません。",
    scenarios: [
      "アイコン上で通知の有無や件数を簡潔に示したい時",
    ],
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、用語集としての定義です。",
    useCases: [
      "通知の有無を示す場合はドット、件数を示す場合は数字という使い分けの目安として参照する",
    ],
    searchHint: "Badge",
    url: "https://www.nngroup.com/articles/ui-elements-glossary/",
    confirmedNote: "UI Elements Glossaryの「Badge」項目本文を直接取得して確認しました(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ position: "relative", width: 26, height: 26 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#EEE3EE" }} />
          <div style={{ position: "absolute", top: -4, right: -4, width: 9, height: 9, borderRadius: "50%", background: "#7A4F7E" }} />
        </div>
        <div style={{ position: "relative", width: 26, height: 26 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#EEE3EE" }} />
          <div style={{ position: "absolute", top: -6, right: -8, minWidth: 16, height: 14, borderRadius: 7, background: "#7A4F7E", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
            <span style={{ fontSize: 8.5, color: "#FFFFFF", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>2</span>
          </div>
        </div>
      </div>
    ),
    illustrationNote: "「通知はドット、件数は数字」という用語集の定義を図示(概念図・系列識別色)",
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

function BadgeSwatch() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ position: "relative", width: 40, height: 40 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EEF1FA", border: "1px solid #E1E3F0" }} />
          <div style={{ position: "absolute", top: -5, right: -5, width: 12, height: 12, borderRadius: "50%", background: "#3A4FCF", border: "2px solid #FFFFFF" }} />
        </div>
        <span style={{ fontSize: 10.5, color: "#7E86AC" }}>ドット(存在の有無)</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ position: "relative", width: 40, height: 40 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EEF1FA", border: "1px solid #E1E3F0" }} />
          <div style={{ position: "absolute", top: -8, right: -12, minWidth: 22, height: 18, borderRadius: 9, background: "#3A4FCF", border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
            <span style={{ fontSize: 10, color: "#FFFFFF", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>12</span>
          </div>
        </div>
        <span style={{ fontSize: 10.5, color: "#7E86AC" }}>数字(件数)</span>
      </div>
    </div>
  );
}

export default function CommunicationBadgePage() {
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
        <SidebarNav currentPath="/components/communication/badge" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / バッジ</span>
            <span>SPEC No. 037</span>
          </div>

          <h1 style={styles.title}>バッジ</h1>
          <p style={styles.subtitle}>アイコンやタブに重ねて通知・件数を示す小さな要素について、4つのガイドラインを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <BadgeSwatch />
            <p style={styles.swatchNote}>存在の有無だけを示すドット型と、具体的な件数を示す数字型の2種類が、Google(M3)・Apple・NN groupの定義に共通して見られる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              Communicationのページの中で、バッジは<strong>各系列の「専用ページの厚み」が最も薄い</strong>コンポーネントです。Googleだけが「Badges」という独立したM3コンポーネントページを持ち、小(ドット)/大(数字・最大4文字)という2バリエーションを明確に定義しています。一方でAppleは<strong>単独の「バッジ」ページを持たず</strong>、アプリアイコンの未読件数(Notificationsページ)とタブ上のバッジ(Tab Barsページ)という、性質の異なる2箇所の記述に分散しています。
            </p>
            <p style={styles.synthesisText}>
              W3Cには<strong>バッジ専用のARIAロールがそもそも存在しません</strong>。実務で広く使われる対応方法は、装飾的なバッジ要素をaria-hiddenで隠し、件数などの意味を親のアイコンボタン側のaria-labelに畳み込むという、ARIA14の手法を応用したものです。これは「バッジのための一次情報」ではなく「一般的なラベリング手法の転用」である点を正直に記載しています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupの扱いも、独立記事ではなく<strong>UI Elements Glossaryの1項目としての簡潔な定義</strong>に留まります。Google・NN groupに共通し、Appleの実装にも見られるのは<strong>「ドットは存在の合図、数字は件数の定量化」</strong>という2区分の考え方で(W3Cは見た目の区分を定めていません)、これは名称こそ違えどAppleの実装(赤い楕円+数字/感嘆符)にも当てはまります。
            </p>
            <p style={styles.synthesisText}>
              総じてバッジは、<strong>4系列のどこにおいても「単体のコンポーネント」というより他コンポーネント(アイコン・タブ・通知)に付随する小さな装飾・情報要素</strong>として位置づけられており、この位置づけの軽さ自体が比較から見えてくる特徴です。
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
                {s.noDedicatedComponent && (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>)}
                <div style={styles.positionBadge}>{s.position}</div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <InfoBox label="推奨される使用シーン" accent="#5A9629"><UseCaseList items={s.scenarios} /></InfoBox>
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
                <div style={styles.labelCell}>専用コンポーネント</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>
                    {s.noDedicatedComponent ? (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>) : (<span style={{ color: "#B7BCDA" }}>―(この観点は対象外)</span>)}
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
                <div style={styles.labelCell}>推奨される使用シーン</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.scenarios} /></div>))}
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

          <div style={styles.linksRow}>
            <a href="/components/communication/alert" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>アラート/バナー ↗</div>
              <div style={styles.linkCardDesc}>閉じるまで残り続けるインライン通知の4系列比較</div>
            </a>
            <a href="/components/communication/overview" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>情報伝達の使い分け ↗</div>
              <div style={styles.linkCardDesc}>Communication/Containment各パーツを横断する統合ガイド</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["通知・状態表示"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(NN group・W3Cは本文確認済み。Apple・Googleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはNotificationsページ(補助的にTab Barsページ)、GoogleはM3のBadgesページ、WCAGはARIA14解説ページ(補助的に4.1.2解説ページ、いずれもバッジ専用の一次文書ではない一般的な技法・達成基準)、NN groupはUI Elements Glossaryの記事(「Badge」項目)へのリンクです。
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
  notApplicableChip: { display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#8A6210", background: "#FFF6E5", border: "1px solid #F0DBA6", padding: "3px 8px", borderRadius: 3, marginTop: 8, letterSpacing: 0.2 },
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
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
