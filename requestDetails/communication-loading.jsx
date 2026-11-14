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
      "できるだけ早く何かを表示する。何も出さないと不具合と受け取られかねないため、読み込み中はプレースホルダー(文字・画像・アニメーション)を出し、用意できたら差し替える。待つ間もほかの操作をできるようにし、長くかかるならヒントや新機能の紹介など楽しめるものを出す。一瞬で終わらないときは、システムのプログレスインジケーターで、読み込み中であることと完了までの見込みを伝える(時間が分かれば確定的、分からなければ不確定)。",
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
    doc: "Material Design 3 ― Loading indicator",
    term: "Loading indicator",
    color: "#2F7D6E",
    position: "5秒未満の待ち時間向けに、専用コンポーネント「Loading indicator」を新設",
    size: "200ミリ秒〜5秒の待ち時間に使う。寸法の記載なし",
    stance:
      "アニメーションで注意を引き、待ち時間を短く感じさせ、処理中であることを示す。進み具合が分からないとき・示す必要がないときに使う。円形の不確定なプログレスインジケーターと働きは近いが、200ミリ秒〜5秒の処理にはこちらが向く。200ミリ秒未満なら何も出さずに内容を見せ、5秒を超えるならProgress indicatorを使う。",
    exceptions: <NoData>記載なし</NoData>,
    scenarios: [
      "5秒未満で終わる短い読み込みの時",
    ],
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "5秒未満の待ち時間にはLoading indicatorを検討する",
      "進み具合(何%か)を示したいときは、プログレスインジケーターを使う",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/loading-indicator/guidelines",
    refs: [
      { label: "Loading indicator", url: "https://m3.material.io/components/loading-indicator/guidelines" },
      { label: "Progress indicators(進み具合を示す場合)", url: "https://m3.material.io/components/progress-indicators/overview" },
    ],
    confirmedNote: "M3 Loading indicatorのガイドラインの本文で確認(2026-11)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
        <div style={{ width: 46, height: 6, borderRadius: 3, background: "#DDEFEA" }} />
        <div style={{ width: 32, height: 6, borderRadius: 3, background: "#DDEFEA" }} />
        <span style={{ fontSize: 8, color: "#2F7D6E" }}>Loading indicator</span>
      </div>
    ),
    illustrationNote: "Loading indicator(現行M3・新設。概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― aria-busy属性(更新中であることを示す)",
    term: "aria-busy(WAI-ARIAの状態)",
    color: "#A3821F",
    position: "専用のロールはないが、更新中であることを支援技術に伝えるaria-busy属性がある",
    size: <NoData>数値基準なし</NoData>,
    glossary: [
      { term: "aria-busy", desc: "要素が更新中であることを示すグローバルなARIAの状態(既定値はfalse)。trueの間、支援技術は更新が終わるまで変更の読み上げを待てる(必ず待つとは限らない)。変更を読み上げさせるaria-live(ライブリージョン)とは役割が違う。" },
    ],
    stance:
      "aria-busyは、要素が更新中であることを示すグローバルな状態(既定値はfalse)。trueの間、支援技術は要素の中の変更を無視し、falseに戻ったときにまとめて1回の更新として扱える(MAY)。ライブリージョンの複数の変更を1回の読み上げにまとめたいときは、trueにしておき、更新が終わったらfalseに戻す。",
    exceptions:
      "単独でも更新中であることを示せる。ライブリージョン(aria-live)に付けると、更新の通知を完了までまとめられる。",
    scenarios: [
      "スケルトン画面など、複数箇所が同時に書き換わる領域を読み込む時",
      "更新途中の状態を支援技術に伝えにくくしたい時(待つかどうかは支援技術による)",
    ],
    accessibility: "堅牢(Robust)・知覚可能(Perceivable) ― 更新中であることをプログラムで伝える(読み上げを必ず防げるとは限らない)。",
    useCases: [
      "読み込み中・骨組み表示の間はaria-busy=\"true\"を設定する",
      "実際のコンテンツに差し替わったらaria-busy=\"false\"に戻す",
      "ライブリージョン(aria-live)に付けて、更新の通知を完了までまとめる(任意)",
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
        <span style={{ fontSize: 8, color: "#A3821F" }}>aria-busy=true</span>
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
    position: "待ち時間の長さで、スケルトン画面/スピナー/プログレスバーを使い分ける(秒数の目安あり)",
    size: "1秒未満は表示不要、2〜10秒はスピナー(個別のモジュール向け)、スケルトン画面は10秒未満、10秒を超えるならプログレスバー。1〜2秒の扱いは明記なし。",
    stance:
      "スケルトン画面は、ページの骨組みをワイヤーフレーム風に示してコンテンツが来ることを予告し、体感の待ち時間を和らげる。静的・アニメーション・フレーム表示の3タイプがある。ヘッダーとフッターだけの「フレーム表示」は、空白のページに見えて離脱を招きかねないため避ける。",
    exceptions: "使い分けに、1秒未満・2〜10秒・10秒という秒数の目安がある。",
    scenarios: [
      "ページ全体を読み込む時(10秒未満ならスケルトン画面)",
    ],
    accessibility: "根拠となる原則 ― 適合区分ではなく、待ち時間の体感を和らげるための設計指針。",
    useCases: [
      "待ち時間の長さに応じて、スケルトン画面・スピナー・プログレスバーを使い分ける",
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
    q: "待ち時間が何秒なら、どの表示を出す?",
    sides: [
      { who: "Google", color: "#2F7D6E", t: "200ミリ秒未満は何も出さない。200ミリ秒〜5秒はLoading indicator。5秒を超えるならProgress indicator" },
      { who: "NN group", color: "#7A4F7E", t: "1秒未満は何も出さない。2〜10秒はスピナー、10秒未満ならスケルトン画面も使える。10秒を超えるならプログレスバー(1〜2秒の表示は明記していない)" },
      { who: "Apple", color: "#C2542A", t: "秒数の区切りはない。まずプレースホルダーで何かを見せ、一瞬で終わらないならプログレスインジケーターを出す(watchOSは1〜2秒かかるなら出す)" },
    ],
    tip: "区切りの秒数も、勧める表示も系列で違う。GoogleとNN groupはどちらも、ごく短い待ちには何も出さず、長い待ちには進み具合が分かる表示を勧めるが、区切り(Googleは200ミリ秒と5秒、NN groupは1秒と10秒)が違う。Appleは秒数ではなく、まず何かを見せることを勧める。長い処理では、Appleの勧めるように待つ間にほかの操作もできるようにする。",
  },
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "一瞬で終わるなら、何も出さない", d: "", who: "AI解釈。NN groupは1秒未満" },
  { n: 2, t: "数秒なら、動く表示(スケルトン画面かスピナー)を出す", d: "スピナーは2〜10秒、スケルトン画面は10秒未満", who: "NN group" },
  { n: 3, t: "長いなら、進み具合を示す", d: "10秒を超えるならプログレスバー(残り時間を必ず出すという意味ではない)", who: "NN group" },
  { n: 4, t: "できるだけ早く、何かを表示する", d: "", who: "Apple" },
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
              読み込み中の見せ方は、<strong>AppleとGoogleがそれぞれ専用のページ・コンポーネントを持っている</strong>。Appleは「Loading」のページで<strong>できるだけ早く何かを表示する</strong>よう求め、Googleは5秒未満の待ち時間向けに<strong>Loading indicator</strong>というコンポーネントを設けている。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupは、待ち時間の長さで見せ方を分ける目安を示している。<strong>1秒未満は表示不要、2〜10秒はスピナー(スケルトン画面は10秒未満)、10秒を超えるならプログレスバー</strong>だ。1〜2秒にどの表示を使うかは明記していない(スケルトン画面の記事の書き方。「プログレスインジケーター」ページで比べた記事では「10秒以上」と書いている)。
            </p>
            <p style={styles.synthesisText}>
              W3Cは<strong>aria-busy</strong>で、内容が書き換わっている最中であることを支援技術に伝える仕組みを用意している。支援技術は、更新が終わるまで変更の読み上げを待つことが<strong>できる</strong>(必ず待つとは限らない)。更新が終わったらfalseに戻す。変更を読み上げさせるのはaria-live(ライブリージョン)の役割で、aria-busyは「今は更新中」という状態を示すだけだ。
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
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
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
