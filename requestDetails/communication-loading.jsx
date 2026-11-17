import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, TagLink, RefList, SplitSection, RelatedPages } from "./page-parts";

/**
 * コンポーネントレイヤー「Communication / ローディング状態」ページ。
 * 2026-11 ③本人レビューNo.062で、「空状態・ローディング状態」ページから読み込み中の内容を分けて作った。
 * 「プログレスインジケーター」ページは進み具合の見せ方そのもの(バー・スピナー)、このページは読み込み中に
 * 画面に何を見せるか(プレースホルダー・スケルトン画面など)を扱う。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Loading",
    term: "Loading(プレースホルダー・Progress indicator)",
    color: "#C2542A",
    noDedicatedComponent: true,
    position: "単独のコンポーネントはなく、Loadingのページで読み込み中の見せ方を扱う",
    size: <NoData>数値基準なし</NoData>,
    stance:
      <><Hl>できるだけ早く何かを表示する</Hl>。読み込み中はプレースホルダー(文字・画像・アニメーション)を出し、用意できたら差し替える。待つ間もほかの操作をできるようにする。</>,
    exceptions:
      "watchOSでは、読み込み中の表示はなるべく出さずにすぐ内容を見せる。1〜2秒かかるなら、空白の画面よりインジケーターを出す。",
    scenarios: [
      "読み込みが一瞬で終わらず、プレースホルダーで体感速度を保ちたい時",
    ],
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "読み込み中はプレースホルダーを表示し、完了後に実際のコンテンツへ差し替える",
      "時間がかかる読み込みは、プログレスインジケーターで進み具合を伝える",
    ],
    searchHint: "Show something as soon as possible",
    url: "https://developer.apple.com/design/human-interface-guidelines/loading",
    refs: [
      { label: "Loading", url: "https://developer.apple.com/design/human-interface-guidelines/loading" },
    ],
    confirmedNote: "HIGのページデータ(LoadingのJSON)を直接取得して本文を確認(2026-10)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
        <div style={{ width: 46, height: 6, borderRadius: 3, background: "#F0DED4" }} />
        <div style={{ width: 32, height: 6, borderRadius: 3, background: "#F0DED4" }} />
        <span style={{ fontSize: 8, color: "#C2542A" }}>読込中(骨組み)</span>
      </div>
    ),
    illustrationNote: "読み込み中のプレースホルダー(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "読み込み中の画面の見せ方の専用ページなし",
    term: <NoData>該当なし</NoData>,
    color: "#2F7D6E",
    position: <NoData>読み込み中の画面の見せ方(スケルトン画面など)の指針はない</NoData>,
    size: <NoData>記載なし</NoData>,
    stance: <>待ち時間の表示には、Loading indicatorとProgress indicatorがある(<PageLink to="/components/communication/progress">プログレスインジケーター</PageLink>のページで比較)。</>,
    exceptions: <NoData>記載なし</NoData>,
    scenarios: [<NoData>該当なし</NoData>],
    accessibility: <NoData>記載なし</NoData>,
    useCases: [<NoData>該当なし</NoData>],
    searchHint: "",
    url: "",
    refs: [],
    confirmedNote: "M3のサイトマップで、読み込み中の画面の見せ方の専用ページがないことを確認(2026-11)。",
    pending: true,
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― 更新中であることを示す状態",
    term: "更新中の状態(WAI-ARIA)",
    color: "#A3821F",
    position: <>専用の役割はないが、<Hl>更新中であることを支援技術に伝える仕組みがある</Hl></>,
    size: <NoData>数値基準なし</NoData>,
    glossary: [
      { term: "更新中の状態", desc: "内容が更新中であることを支援技術に伝える状態。更新中は、支援技術は更新が終わるまで変更の読み上げを待てる(必ず待つとは限らない)。変更を読み上げさせる仕組みとは役割が違う。" },
    ],
    stance:
      <>更新中であることを支援技術に伝えておくと、<Hl>書き換わり終わってから、まとめて1回の更新として扱える</Hl>(必ずそうなるとは限らない)。終わったら更新中の状態を解く。</>,
    exceptions:
      "変更を読み上げる領域と組み合わせると、更新の知らせを完了までまとめられる。",
    scenarios: [
      "スケルトン画面など、複数箇所が同時に書き換わる領域を読み込む時",
      "更新途中の状態を支援技術に伝えにくくしたい時(待つかどうかは支援技術による)",
    ],
    accessibility: "堅牢(Robust)・知覚可能(Perceivable) ― 更新中であることをプログラムで伝える(読み上げを必ず防げるとは限らない)。",
    useCases: [
      "読み込み中・骨組みの表示の間は、更新中であることを支援技術に伝える",
      "実際の内容に差し替わったら、更新中の状態を解く",
      "変更を読み上げる領域と組み合わせ、更新の知らせを完了までまとめる(任意)",
    ],
    searchHint: "aria-busy",
    url: "https://www.w3.org/TR/wai-aria-1.2/#aria-busy",
    refs: [
      { label: "aria-busy属性(更新中であることを示す)", url: "https://www.w3.org/TR/wai-aria-1.2/#aria-busy" },
      { kind: "mdn", label: "aria-busy", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy" },
    ],
    confirmedNote: "WAI-ARIA仕様のaria-busy(2026-10)と、MDNの解説本文を確認しました(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
        <div style={{ width: 46, height: 6, borderRadius: 3, background: "#F3EBD0" }} />
        <div style={{ width: 32, height: 6, borderRadius: 3, background: "#F3EBD0" }} />
        <span style={{ fontSize: 8, color: "#A3821F" }}>更新中を伝える</span>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、更新中/完了の状態遷移を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Skeleton Screens 101",
    term: "Skeleton screen・Spinner・Progress bar",
    color: "#7A4F7E",
    position: <><Hl>ページ全体の読み込みはスケルトン画面</Hl>、一部の読み込みはスピナー</>,
    size: <NoData>数値基準なし</NoData>,
    stance:
      <>スケルトン画面はページの骨組みを先に見せ、<Hl>内容が来ることを予告して体感の待ち時間を和らげる</Hl>。ヘッダーとフッターだけの「フレーム表示」は、空白のページに見えるので避ける。</>,
    exceptions: "スケルトン画面は10秒未満の読み込み向け(長い待ちはプログレスインジケーターのページ)。",
    scenarios: [
      "ページ全体を読み込む時(10秒未満ならスケルトン画面)",
    ],
    accessibility: "根拠となる原則 ― 適合区分ではなく、待ち時間の体感を和らげるための設計指針。",
    useCases: [
      "ページ全体はスケルトン画面、一部はスピナーにする",
      "ヘッダー・フッターだけの「フレーム表示」型スケルトンは避ける",
    ],
    searchHint: "skeleton screens",
    url: "https://www.nngroup.com/articles/skeleton-screens/",
    refs: [
      { label: "Skeleton Screens 101", url: "https://www.nngroup.com/articles/skeleton-screens/" },
    ],
    confirmedNote: "記事本文を直接取得して確認しました(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
        <div style={{ width: 46, height: 6, borderRadius: 3, background: "#EEE3EE" }} />
        <div style={{ width: 32, height: 6, borderRadius: 3, background: "#EEE3EE" }} />
        <span style={{ fontSize: 8, color: "#7A4F7E" }}>スケルトン(2-10s)</span>
      </div>
    ),
    illustrationNote: "スケルトン画面(10秒未満の目安。概念図・系列識別色)",
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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}

function LoadingStateSwatch() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 150 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: "#EEF1FA" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            <div style={{ width: "80%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
            <div style={{ width: "55%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
          </div>
        </div>
        <div style={{ width: "100%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
        <div style={{ width: "70%", height: 6, borderRadius: 3, background: "#EEF1FA" }} />
        <span style={{ fontSize: 9.5, color: "#666D93" }}>ローディング状態(スケルトン)</span>
      </div>
    </div>
  );
}

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "中身を読み込んでいる最中の画面の見せ方";
const ABOUT = [
  { k: "目的・役割", v: "待っていることと、もうすぐ表示されることを伝え、止まっていないと分かるようにする" },
  { k: "よく使われる場面", v: "画面を開いた直後の読み込み、一覧の追加読み込み、画像の表示待ち" },
  { k: "似たコンポーネント", v: <>進み具合(何%か)を示すのは<PageLink to="/components/communication/progress">プログレスインジケーター</PageLink>、中身がないときは<PageLink to="/components/communication/empty-state">空状態</PageLink></> },
];

/* 意見が分かれる点 */
const SPLITS = [
  {
    q: "読み込み中の画面に、何を見せる?",
    sides: [
      { who: "Apple", color: "#C2542A", t: "できるだけ早く何かを見せる。文字・画像のプレースホルダーを出し、用意できたら差し替える" },
      { who: "NN group", color: "#7A4F7E", t: "ページ全体ならスケルトン画面(骨組み)、一部の読み込みならスピナー。ヘッダーとフッターだけの表示は避ける" },
      { who: "Google", color: "#2F7D6E", t: "画面の見せ方の指針はなく、待ち時間を示すインジケーター(Loading indicator)を用意している" },
    ],
    tip: "ページや一覧を読み込むときは、内容の形をした骨組み(プレースホルダー・スケルトン画面)を先に見せる。ボタンを押した後など一部だけの処理は、小さなインジケーターで足りる。何秒でどのインジケーターを出すかは「プログレスインジケーター」ページ。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビューNo.066で、プログレスインジケーターと重なる秒数の内容を外して組み直し) */
const KP = [
  { n: 1, t: "できるだけ早く、何かを表示する", d: "文字・画像のプレースホルダーを出し、用意できたら差し替える", who: "Apple" },
  { n: 2, t: "ページ全体の読み込みは、骨組み(スケルトン画面)を見せる", d: "一部だけの読み込みならスピナー", who: "NN group" },
  { n: 3, t: "ヘッダーとフッターだけの表示は避ける", d: "空白のページに見えて、離れられてしまう", who: "NN group" },
  { n: 4, t: "読み込み中は、更新中であることを支援技術に伝える", d: "", who: "W3C(WAI-ARIA)" },
];

export default function CommunicationLoadingPage() {
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
        <SidebarNav currentPath="/components/communication/loading" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ローディング状態</span>
            <span>SPEC No. 061</span>
          </div>

          <h1 style={styles.title}>ローディング状態</h1>
          <SummaryCard keyPoints={KP}
            image={<><LoadingStateSwatch /></>}
            imageNote={<>実際のレイアウトを模した骨組み(スケルトン)を先に見せる考え方。</>}
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />



          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              読み込み中は、<strong>空白のままにせず、内容の形を先に見せる</strong>点でAppleとNN groupが一致する。Appleはプレースホルダー、NN groupはページ全体ならスケルトン画面を勧める。Googleには画面の見せ方の指針はない。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、<strong>更新中であることを支援技術に伝える仕組み</strong>を持つ。待ち時間に応じたインジケーターの選び方は<PageLink to="/components/communication/progress">プログレスインジケーター</PageLink>のページで比べている。
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
                {s.noDedicatedComponent && (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>)}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                <InfoBox label="推奨される使用シーン" accent="#5A9629"><UseCaseList items={s.scenarios} /></InfoBox>
                <InfoBox label="サイズ" accent="#3C5A73">{s.size}</InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="例外・許容ケース">{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)">{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
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
                <div style={styles.labelCell}>専用コンポーネント</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>
                    {s.noDedicatedComponent ? (<span style={styles.notApplicableChip}>専用コンポーネントなし</span>) : (<span style={{ color: "#666D93" }}>―</span>)}
                  </div>
                ))}
                <div style={styles.labelCell}>名称</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.term}</div>))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
                <div style={styles.labelCell}>推奨される使用シーン</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.scenarios} /></div>))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.size}</div>))}
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


          <RelatedPages paths={["/components/communication/overview", "/components/communication/progress", "/components/communication/empty-state"]} />

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["通知・状態表示"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
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
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  subtitle: { fontSize: 13.5, color: "#565D8A", margin: "0 0 22px" },
  notApplicableChip: { display: "inline-block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: "#454C78", background: "#EEF1F7", border: "1px solid #D5DAE8", padding: "3px 8px", borderRadius: 3, alignSelf: "flex-start", letterSpacing: 0.2 },
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
  secondaryLinks: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  sizeCell: { background: "#F0F4F8" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#666D93" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
