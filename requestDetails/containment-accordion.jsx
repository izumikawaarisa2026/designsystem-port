import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Containment / アコーディオン(表示コントロール)」ページ。
 * クリック/タップで情報の表示・非表示を切り替える、段階的開示のためのコンテナの
 * 4系列比較。
 *
 * W3C(WAI-ARIA APG Disclosure(Show/Hide)パターン)/ Nielsen Norman Group
 * (Accordions on Desktop: When and How to Use)は公式ページ・記事本文を直接取得して
 * 確認済み(2026-09)。Apple(HIG Disclosure Controls)は公式サイトがクライアント側
 * レンダリングのSPAで本文を直接取得できなかったため、検索結果による間接確認
 * (2026-09)。Googleは、M1時代の「Expansion panels」という独立コンポーネントが
 * M3では見当たらず、検索結果によれば開閉(展開/折りたたみ)の考え方はListコンポーネント
 * の機能に統合されたとされている(間接確認、2026-09)。ユーザー指摘を受け、2026-09に
 * Google欄を「該当なし」(notApplicable)の表現(パンくずリスト/ページネーションページと
 * 同じグレー表示パターン)に変更し、AI解釈も分かりやすく書き直した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Disclosure Controls",
    term: "Disclosure control(開示三角形・開示ボタン)",
    color: "#C2542A",
    position: "ビューやリストに関連する情報・機能を表示・非表示するコンポーネント。開示三角形と開示ボタンの2種類",
    size: "Disclosure controlsのページにサイズの規定はない。目安はAppleの一般の押せる範囲(iOS/iPadOSで既定44pt・最小28pt。ボタンのページ)(AI解釈)。",
    colorInfo: <NoData>記載なし</NoData>,
    stance:
      "詳細を必要になるまで隠しておくために使う。よく使うコントロールを上に置いていつも見せ、高度な機能は既定で隠すと、選択肢に圧倒されずに大事な情報を見つけられる。開示三角形は、ビューやリストに関連する情報・機能を表示・非表示にし、隠れているときは内側を、見えているときは下を向く。何が表示・非表示になるかが分かるラベル(例:「詳細オプション」)を付ける。",
    exceptions:
      "開示ボタンは、特定のコントロールに関連する機能を表示・非表示にする(macOSの保存シートなど)。隠れているときは下を、見えているときは上を向く。内容の近くに置き、1つのビューに1つまでにする(複数あると分かりにくいため)。iOS・iPadOS・visionOSではSwiftUIのDisclosureGroupで使え、tvOS・watchOSでは使えない。",
    accessibility:
      <span><NoData>記載なし。</NoData></span>,
    useCases: [
      "詳細や高度な機能を、必要になるまで隠しておく",
      "何が表示・非表示になるかが分かるラベルを付ける",
      "開示ボタンは内容の近くに置き、1つのビューに1つまでにする",
    ],
    searchHint: "descriptive label",
    url: "https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#Disclosure-triangles",
    refs: [
      { label: "Disclosure Controls", url: "https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#Disclosure-triangles" },
      { label: "Disclosure controls ― Disclosure buttons", url: "https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#Disclosure-buttons" },
      { label: "Disclosure controls ― iOS・iPadOS・visionOS(DisclosureGroup)", url: "https://developer.apple.com/design/human-interface-guidelines/disclosure-controls#iOS-iPadOS-visionOS" },
    ],
    confirmedNote: "HIGのページデータ(Disclosure controlsのJSON)を直接取得して本文を確認(2026-10)。",
    illustration: () => (
      <svg width="120" height="60" viewBox="0 0 120 60">
        <rect x="1" y="1" width="118" height="16" rx="3" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="10" y="12" fontSize="8" fill="#171B36" fontFamily="Jost, Noto Sans JP">詳細を表示</text>
        <path d="M106 6l4 4-4 4" fill="none" stroke="#C2542A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="22" width="118" height="36" rx="3" fill="#F8F9FD" stroke="#C2542A" strokeDasharray="3 2" strokeWidth="1" />
      </svg>
    ),
    illustrationNote: "開示コントロールで関連情報を表示・非表示(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "該当コンポーネントなし",
    term: <NoData>該当なし</NoData>,
    color: "#2F7D6E",
    notApplicable: true,
    position: "該当なし",
    size: "該当なし",
    colorInfo: "該当なし",
    stance: "該当なし(M3のコンポーネントの一覧にアコーディオンに当たるコンポーネントはなく、M1の「Expansion panel」に当たるコンポーネントもない)",
    exceptions: "該当なし",
    accessibility: "該当なし",
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    pending: true,
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Accordion Pattern(単体の開閉はDisclosure Pattern)",
    term: "Accordion(APGのパターン)",
    color: "#A3821F",
    position: "見出し要素(h2など)の中にボタンを置き、aria-expanded・aria-controlsで開閉の状態と対応するパネルを示す",
    size: "専用の数値基準はない。見出しのボタンには一般のターゲットサイズの基準(WCAG 2.5.8/2.5.5。どちらも例外あり)がかかる。",
    colorInfo: "色の基準はない。隠れているときは右向き、見えているときは下向きの矢印などで状態を示す例がある。",
    glossary: [
      { term: "aria-expanded", desc: "見出しのボタンの状態を示す属性。パネルが見えているときはtrue、隠れているときはfalse。" },
      { term: "aria-controls", desc: "ボタンが、どのパネルを開閉するかを示す属性。値はパネルのIDにする。" },
    ],
    stance:
      "縦に並んだ見出しが、それぞれ対応する内容(パネル)を表示・非表示にする(APGのAccordion Pattern)。見出しの文字は、見出し要素(h2など、ページの構成に合ったレベル)の中のbutton要素(またはbuttonの役割の要素)にし、見出しの中にはそのボタンだけを入れる。パネルが見えているときはaria-expanded=\"true\"、隠れているときは\"false\"にし、aria-controlsでパネルのIDを指す。ネイティブの<button>要素を使うなら、role=\"button\"を足す必要はない。",
    exceptions:
      "パネルを閉じられないアコーディオンでは、開いているパネルのボタンにaria-disabled=\"true\"を付ける。パネルにregionの役割を付けてもよいが、同時に開けるパネルが6個程度を超えるなら、ランドマークが増えすぎるため避ける。1つだけを開閉するなら、Disclosure(Show/Hide)パターンが参考になる。",
    accessibility:
      "操作可能(Operable)・堅牢(Robust) ― 開閉の状態は、aria-expandedで支援技術に伝える(4.1.2)。",
    useCases: [
      "見出し要素(h2など)の中にbutton要素を置き、そのボタンで開閉する",
      "ボタンにaria-expanded(true/false)とaria-controls(パネルのID)を付ける",
    ],
    searchHint: "aria-expanded",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/",
    refs: [
      { kind: "apg", label: "APG: Accordion Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" },
      { kind: "apg", label: "APG: Disclosure (Show/Hide) Pattern", url: "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="60" viewBox="0 0 120 60">
          <rect x="1" y="1" width="118" height="16" rx="3" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="12" fontSize="7.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-expanded="true"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、属性・役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Accordions on Desktop: When and How to Use",
    term: "Accordion",
    color: "#7A4F7E",
    position: "クリックで情報を表示・非表示にするパターン(見出し・アイコン・パネル)。使う場面と避ける場面がはっきり分かれる(数値基準ではなく判断の基準)",
    size: <span><NoData>数値基準なし。</NoData>見出しは内容を正確に表す長さ・表現にする。</span>,
    colorInfo: <span><NoData>数値基準なし。</NoData>開けることを示すため、キャレットアイコンなどを使う。</span>,
    stance:
      "クリックで情報を表示・非表示にするパターンで、見出し・アイコン・パネルでできている。利点は、ページがすっきりする・スクロールが減る・全体の概要が見える・拾い読みしやすい・(URLなどで)直接たどり着きやすい。",
    exceptions:
      <>ほぼすべての内容が必要な場合、内容が少ない場合、階層が深い場合、記事のように続けて読む場合には向かない。逆に、少しの情報だけが要る場合、段階を追う手順、<Hl>FAQのように各セクションが独立している場合</Hl>、長い内容を狭い画面で見せる場合に向く。</>,
    accessibility:
      "根拠となる原則 ― 適合区分ではなく、使う場面・避ける場面の判断の基準。見出しは内容を正確に表し、開けることをキャレットアイコンなどで示し、複数のセクションを同時に開けるようにし、重要な情報はいつも見せておく。",
    useCases: [
      "FAQのように各セクションが独立していて、少しの情報だけが要る場合に使う",
      "見出しは内容を正確に表し、キャレットアイコンなどで開けることを示す",
      "複数のセクションを同時に開けるようにし、重要な情報はいつも見せておく",
    ],
    searchHint: "progressive disclosure",
    url: "https://www.nngroup.com/articles/accordions-on-desktop/",
    refs: [
      { label: "Accordions on Desktop: When and How to Use", url: "https://www.nngroup.com/articles/accordions-on-desktop/" },
    ],
    illustration: () => (
      <svg width="120" height="60" viewBox="0 0 120 60">
        <rect x="1" y="1" width="118" height="16" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="10" y="12" fontSize="8" fill="#171B36" fontFamily="Jost, Noto Sans JP">よくある質問 1</text>
        <path d="M106 6l4 4-4 4" fill="none" stroke="#7A4F7E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="20" width="118" height="16" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    illustrationNote: "FAQのような独立セクションの開閉(概念図・系列識別色)",
  },
];

function InfoBox({ label, accent, muted, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent && !muted ? { borderLeftColor: accent } : {}) }}>
      <span style={{ ...styles.exceptionLabel, ...(muted ? styles.mutedText : {}) }}>{label}</span>
      <div style={{ ...styles.exceptionText, ...(muted ? styles.mutedText : {}) }}>{children}</div>
    </div>
  );
}

function UseCaseList({ items, muted }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={{ ...styles.useCaseItem, ...(muted ? styles.mutedText : {}) }}>{it}</li>))}
    </ul>
  );
}

function GlossaryNote({ items }) {
  return (
    <div style={styles.glossaryNoteBox}>
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function AccordionSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #E1E3F0" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#171B36" }}>質問1: 返品はできますか?</span>
        <span style={{ color: "#3A4FCF" }}>⌄</span>
      </div>
      <div style={{ padding: "8px 12px 10px", fontSize: 11, color: "#666D93", borderBottom: "1px solid #E1E3F0" }}>購入から30日以内であれば返品を受け付けている。</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px" }}>
        <span style={{ fontSize: 12, color: "#454C78" }}>質問2: 送料はいくらだか?</span>
        <span style={{ color: "#666D93" }}>›</span>
      </div>
    </div>
  );
}

/* No.054: タブとアコーディオンの使い分け(NN group「Tabs, Used Right」の「Tabs Versus Accordions」による) */
const TAB_VS_ACC = [
  ["向いている画面", "モバイル(狭い画面ではタブより使いやすい)", "デスクトップ(閉じたアコーディオンは、ページが空っぽに見えやすい)"],
  ["見出しの長さ", "長めの見出しも使える", "短い見出しがよい(横に並べるため)"],
  ["内容", "FAQのような、短い内容をまとめる", "長い内容や、複雑なレイアウトも扱える"],
  ["見比べる必要", "—", "別のタブの内容を同時に見る必要がないときに使う(見比べるなら切り替えが負担になる)"],
];

function TabVsAccordion() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>アコーディオンとタブの使い分け(Nielsen Norman Group)</h2>
      <p style={styles.tvaNote}>どちらも内容を折りたたんで、必要な部分だけを見せる方法だ。画面の広さと内容の長さで選ぶ。</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.tvaTable}>
          <thead><tr>{["", "アコーディオン", "タブ"].map((h) => (<th key={h} style={styles.tvaTh}>{h}</th>))}</tr></thead>
          <tbody>{TAB_VS_ACC.map((r) => (<tr key={r[0]}><td style={{ ...styles.tvaTd, fontWeight: 700, whiteSpace: "nowrap" }}>{r[0]}</td><td style={styles.tvaTd}>{r[1]}</td><td style={styles.tvaTd}>{r[2]}</td></tr>))}</tbody>
        </table>
      </div>
      <p style={styles.tvaNote}>出典: Nielsen Norman Group「<a href="https://www.nngroup.com/articles/tabs-used-right/" target="_blank" rel="noreferrer" style={{ color: "#3A4FCF" }}>Tabs, Used Right ↗</a>」の「Tabs Versus Accordions」と「When to Use Tabs」。タブの詳しい比較は<PageLink to="/components/navigation/tabs">タブ</PageLink>のページ。</p>
    </section>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "見出しを押すと、その下の内容を開いたり閉じたりできるコンポーネント";
const ABOUT = [
  { k: "目的・役割", v: "必要な部分だけを開いて読めるようにし、長いページを短く見せる" },
  { k: "よく使われる場面", v: "よくある質問(FAQ)、設定の詳細項目、スマホでの長い説明の折りたたみ" },
  { k: "似たコンポーネント", v: <>同じ場所で内容を切り替えるなら<PageLink to="/components/navigation/tabs">タブ</PageLink>。アコーディオンは複数を同時に開ける</> },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "各項目が独立していて、一部だけ読めば足りる内容に使う", d: "よくある質問など", who: "NN group" },
  { n: 2, t: "ほぼ全部を読む内容や、続けて読む記事には使わない", d: "", who: "NN group" },
  { n: 3, t: "開閉できると分かる印(矢印)を付ける", d: "", who: "NN group" },
];

export default function ContainmentAccordionPage() {
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
        <SidebarNav currentPath="/components/containment/accordion" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / アコーディオン(表示コントロール)</span>
            <span>SPEC No. 028</span>
          </div>

          <h1 style={styles.title}>アコーディオン(表示コントロール)</h1>
          <SummaryCard keyPoints={KP}
            image={<><AccordionSwatch /></>}
            imageNote={<>見出しをクリックすると、関連するパネル(詳細内容)の表示・非表示が切り替わる。展開可能であることを示すキャレットアイコンを伴うのが一般的。</>}
            lead={LEAD}
            rows={ABOUT}
          />



          <TabVsAccordion />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              このコンポーネントで最も具体的な判断材料を示しているのはNielsen Norman Groupだ。<strong>FAQのように各セクションが独立していて、ユーザーが少数の情報のみ必要とする場合に適し、「ほぼすべてのコンテンツが必要」「記事のような連続読書が必要」な場合には不向き</strong>という、使うべき場面・避けるべき場面のリストは、他3系列にはない実務的な価値を持っている。
            </p>
            <p style={styles.synthesisText}>
              W3CのAPGには、専用の<strong>Accordion Pattern</strong>がある。<strong>見出し要素の中にボタンを置き、aria-expanded(表示時true/非表示時false)とaria-controlsで開閉の状態と対応するパネルを示す</strong>という作り方で、見出しの構造とボタンの役割を組み合わせる点が、Apple・Googleが単一コンポーネントとして説明するのとは違う、構成要素に分解した視点だ。
            </p>
            <p style={styles.synthesisText}>
              <strong>Googleには現在、「アコーディオン」に相当する独立コンポーネントがない。</strong>M1時代には「Expansion panel」という独立コンポーネントがあったが、現行のM3には見当たらず、開閉(展開/折りたたみ)の考え方はリストコンポーネントの機能に統合されたとされている。つまり「見落とし」ではなく、<strong>コンポーネントとしての格が時代とともに変わり、今は単体では存在しない</strong>というのが実情だ。
            </p>
          </div>
          <div className="dsp-mobile-only" style={styles.sourceList}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={{ ...styles.sourceName, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.name}</div>
                    <div style={{ ...styles.sourceDoc, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.doc}</div>
                  </div>
                </div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={{ ...styles.positionBadge, ...(s.notApplicable ? styles.positionBadgeMuted : {}) }}>{s.position}</div>
                <InfoBox label="サイズ" accent="#3C5A73" muted={s.notApplicable}>{s.size}</InfoBox>
                <InfoBox label="色" muted={s.notApplicable}>{s.colorInfo}</InfoBox>
                <p style={{ ...styles.sourceStance, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</p>
                <InfoBox label="例外・許容ケース" muted={s.notApplicable}>{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)" muted={s.notApplicable}>{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース" muted={s.notApplicable}><UseCaseList items={s.useCases} muted={s.notApplicable} /></InfoBox>
                {!s.notApplicable && (
                  <>
                    <InfoBox label="参照ページ(公式)">
                      <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    </InfoBox>
                    {s.searchHint && (
                      <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                    )}
                  </>
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
                    <div style={{ ...styles.sourceName, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.name}</div>
                    <div style={{ ...styles.sourceDoc, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : (s.notApplicable ? <span style={styles.mutedText}>該当なし</span> : null)}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.position}</div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} muted={s.notApplicable} /></div>))}
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

          <RelatedPages paths={["/components/navigation/tabs", "/components/containment/list", "/components/communication/tooltip"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["情報の整理・一覧", "段階的に見せる"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  tvaNote: { fontSize: 11.5, lineHeight: 1.65, color: "#565D8A", margin: "0 0 10px" },
  tvaTable: { width: "100%", minWidth: 600, borderCollapse: "collapse", fontSize: 11.5, color: "#2E3457", marginBottom: 10 },
  tvaTh: { textAlign: "left", fontSize: 11, fontWeight: 700, color: "#565D8A", background: "#F8F9FD", padding: "8px 10px", borderBottom: "1px solid #E1E3F0" },
  tvaTd: { padding: "9px 10px", borderBottom: "1px solid #EEF0F7", lineHeight: 1.6, verticalAlign: "top" },
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  swatchCard: { background: "#F8F9FD", border: "1px dashed #D5D9EC", borderRadius: 6, padding: "18px 16px 14px", marginBottom: 20, textAlign: "center" },
  swatchLabel: { display: "block", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.2, color: "#171B36", textAlign: "left", marginBottom: 14 },
  swatchNote: { fontSize: 11, color: "#666D93", margin: "14px 0 0", lineHeight: 1.6 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  positionBadgeMuted: { color: "#666D93", background: "#F3F4F9" },
  mutedText: { color: "#666D93" },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#666D93", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#666D93", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#666D93", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10 },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
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
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
