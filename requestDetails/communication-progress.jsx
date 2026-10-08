import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Communication / プログレスインジケーター」ページ。
 * 処理の進行状況を示す、確定的(determinate)/不確定(indeterminate)の2状態を
 * 持つコンポーネントの4系列比較。「空状態・ローディング状態」ページとは対象が
 * 隣接するが、本ページは進行状況の可視化そのもの(バー・スピナー等の形状と
 * 状態遷移)に焦点を当て、空のコンテナへのプレースホルダー表示や骨組み表示
 * (スケルトン画面)は「空状態・ローディング状態」ページで扱う。
 *
 * Nielsen Norman Group(Progress Indicators Make a Slow System Less
 * Insufferable)は本文を直接取得して確認済み(2026-09)。1秒未満は表示不要、
 * 1〜10秒はループアニメーション(スピナー)、10秒超は達成率表示(プログレスバー)
 * という具体的な秒数の目安を明記している数少ない一次情報。
 *
 * W3C(MDNのrole="progressbar"解説ページ)も本文を直接取得して確認済み。
 * aria-valuenow/aria-valuemin/aria-valuemaxの意味、不確定状態では
 * aria-valuenowを「0にする」のではなく「省略する」べきという点、
 * ネイティブの<progress>要素の使用が推奨されている点を確認した。
 *
 * Apple(HIGのProgress indicatorsページ、Loadingページ)・Google(M3の
 * Progress indicatorsページ、および新設のLoading indicatorページ)は
 * いずれもSPAサイトのため検索結果による間接確認(2026-09)。GoogleのLoading
 * indicatorは「5秒未満の待ち時間向け、従来の不確定円形インジケーターの
 * 多くを置き換える意図」と説明されており、NN groupの1〜10秒という目安と
 * 近い時間感覚である点をAI解釈で指摘した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Progress Indicators / Loading",
    color: "#C2542A",
    position: "処理中であることを一時的に示すコンポーネント。確定的(determinate)/不確定(indeterminate)の2種類を使い分ける",
    size: "具体的なpt数値やバーの太さの基準は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "進行状況インジケーターは、処理中でアプリが停止していないことを伝える一時的な表示で、処理が終わると消えるとしています。所要時間が分かるタスクには確定的なプログレスバー、所要時間が見積もれないタスク(読み込み・同期など)には不確定なインジケーターを使うべきで、可能な限り確定的な表示を優先すべきだとしています。また、常に同じ場所に表示して見つけやすくすること、「読み込み中」「認証中」のような曖昧な文言を避けること、円形(スピナー)からバー形状へ表示中に切り替えて混乱させないことを求めています。",
    exceptions:
      "処理が避けられないほど長くかかる場合は、ゲームのヒントや短い映像、参考になるプレースホルダー画像など、待っている間に見てもらえるものを用意することを勧めています。また、コンテンツ読み込み中はプレースホルダーのテキスト・グラフィック・アニメーションを表示し、読み込み完了後に実際のコンテンツへ差し替えるべきだとしています(詳細は「空状態・ローディング状態」ページ参照)。",
    scenarios: [
      "所要時間が分かるダウンロード・ファイル変換などにプログレスバー(確定的)を使いたい時",
      "所要時間が見積もれない読み込み・同期処理にスピナー(不確定)を使いたい時",
      "処理が長時間かかることが避けられず、待機中に見せるものが必要な時",
    ],
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "所要時間が分かる処理には確定的な表示を優先する",
      "曖昧な文言(「読み込み中」等)だけに頼らず、常に同じ場所に表示して見つけやすくする",
      "表示中に円形⇔バー形状を切り替えない",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/progress-indicators",
    urlSecondary: [{ label: "Loading(読み込み中のプレースホルダー指針)", url: "https://developer.apple.com/design/human-interface-guidelines/loading" }],
    confirmedNote: "公式ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <svg width="70" height="10" viewBox="0 0 70 10"><rect x="0.5" y="0.5" width="69" height="9" rx="4.5" fill="none" stroke="#C2542A" strokeWidth="1" /><rect x="0.5" y="0.5" width="44" height="9" rx="4.5" fill="#C2542A" /></svg>
        <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8.5" fill="none" stroke="#F0DED4" strokeWidth="2.4" /><path d="M11 2.5a8.5 8.5 0 0 1 6 2.5" fill="none" stroke="#C2542A" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </div>
    ),
    illustrationNote: "確定的(左・バー)/不確定(右・スピナー)の2形状(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Progress indicators / Loading indicator",
    color: "#2F7D6E",
    position: "linear(直線)/circular(円形)の2形状と、determinate(確定的)/indeterminate(不確定)の2状態を組み合わせて使うコンポーネント群。5秒未満の短い待ち時間向けに新設された専用の「Loading indicator」も持つ",
    size: "具体的なdp数値は確認できていません。アクティブインジケーターの形状にはflat(直線的)とwavy(波形)の2オプションがあるとされています。",
    colorInfo: "不確定インジケーターは既定でprimary・primary container・tertiary・tertiary containerの4色を順に切り替えられるとされています(検索結果による確認)。",
    stance:
      "linearインジケーターはコンテナの端に配置するのに適し、トラック上をリーディング側からトレーリング側へ帯がアニメーションするとされています。circularインジケーターは要素の中央に配置するのに適し、確定的な場合は0〜360度で色を塗り進め、不確定な場合はトラック上を動きながら伸縮するとされています。波形(wavy)の形状は、長い処理を単調に感じさせないための、より表現力のあるスタイルとして選べるとしています。",
    exceptions:
      "5秒未満の待ち時間向けに、従来の不確定円形インジケーターの多くの用途を置き換える意図で「Loading indicator」という別コンポーネントが新設されたとみられます(検索結果による確認)。用途が重なるため、実装時にはProgress indicatorとLoading indicatorのどちらが適切か、待ち時間の長さで判断する必要があります。",
    scenarios: [
      "コンテナの端(画面上部など)に配置する処理にはlinearインジケーターを使いたい時",
      "要素の中央に配置する処理にはcircularインジケーターを使いたい時",
      "5秒未満で終わる短い待ち時間にはLoading indicatorを使いたい時",
    ],
    accessibility: "操作可能・知覚可能 ― 具体的な数値基準は確認できていませんが、一般的なM3の状態・モーション関連のアクセシビリティ原則(モーション低減設定への配慮等)が適用されると考えられます(直接確認はできていません)。",
    useCases: [
      "配置(端か中央か)に応じてlinear/circularを選ぶ",
      "待ち時間が5秒未満ならLoading indicator、それ以上ならProgress indicatorを検討する",
      "長い処理には表現力のあるwavy形状も選択肢にする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/progress-indicators/guidelines",
    urlSecondary: [{ label: "Loading indicator(新設、短い待ち時間向け)", url: "https://m3.material.io/components/loading-indicator/guidelines" }],
    confirmedNote: "m3.material.ioの公式ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。「Loading indicator」が比較的新しいコンポーネントであることも検索結果による確認です。",
    pending: true,
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <svg width="70" height="10" viewBox="0 0 70 10"><rect x="0.5" y="3.5" width="69" height="3" rx="1.5" fill="#DDEFEA" /><rect x="10" y="3.5" width="22" height="3" rx="1.5" fill="#2F7D6E" /></svg>
        <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="8.5" fill="none" stroke="#DDEFEA" strokeWidth="2.4" /><path d="M11 2.5a8.5 8.5 0 0 1 6 2.5" fill="none" stroke="#2F7D6E" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </div>
    ),
    illustrationNote: "linear(左、両端に隙間のある帯)/circular(右)の2形状(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― role=\"progressbar\"",
    color: "#A3821F",
    position: "処理の進行状況を伝える範囲(range)系のロール。aria-valuenowの有無で確定的/不確定を表現する",
    size: "プログレスバー専用の数値基準はありませんが、値はaria-valuemin(既定0)〜aria-valuemax(既定100)の範囲で設定するとしています。",
    colorInfo: "色についての専用基準はありません。",
    glossary: [
      { term: "aria-valuenow / aria-valuetext", desc: "aria-valuenowは現在値。不確定な処理では値自体が存在しないため、0に設定するのではなく属性ごと省略すべきとされる。aria-valuetextは、値をパーセンテージとして提示すると誤解を招く場合に、支援技術に伝える文言を上書きするための属性。" },
    ],
    stance:
      "role=\"progressbar\"には、aria-valuenow(不確定でない限り必須)・aria-valuemin(既定0)・aria-valuemax(既定100)・aria-valuetext(任意)を設定するとしています。要素にはaria-labelまたはaria-labelledbyによるアクセシブルネームが必須です。可能な場合はこのロールを使わず、ネイティブの<progress>要素を使うことを勧めています(なお、量を示すだけなら<meter>という別の要素があります。<input type=\"range\">は値を動かすスライダーで、進捗の表示には使いません)。progressbar内の子要素はすべてプレゼンテーション扱いとなり、アクセシビリティツリーからは取り除かれます。",
    exceptions:
      "不確定な処理を表現する場合は、aria-valuenowを0や特定の値に設定するのではなく、属性そのものを省略すべきだとしています。0を設定すると「進捗0%」という誤った情報を支援技術に伝えてしまうためです。",
    scenarios: [
      "確定的な進行状況を伝えたい時はaria-valuenow/min/maxを設定する",
      "パーセンテージ表示が実態に合わない時はaria-valuetextで文言を上書きする",
      "可能な場合はrole属性ではなくネイティブの<progress>要素を使う",
    ],
    accessibility: "知覚可能(Perceivable)・堅牢(Robust) ― 進行状況が支援技術にプログラム的に伝わることを保証する。アクセシブルネームは必須。",
    useCases: [
      "不確定な処理ではaria-valuenowを省略する(0にしない)",
      "可能な限りネイティブの<progress>要素を使い、role=\"progressbar\"は代替手段として扱う",
      "aria-labelまたはaria-labelledbyで必ずアクセシブルネームを与える",
      "完了や失敗は、ステータスメッセージ(role=\"status\"など)で伝える(4.1.3)",
    ],
    searchHint: "aria-valuenow",
    url: "https://www.w3.org/TR/wai-aria-1.2/#progressbar",
    urlSecondary: [
      { label: "4.1.3 Status Messages", url: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html" },
      { label: "解説(MDN): progressbarロール", url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/progressbar_role" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="150" height="24" viewBox="0 0 150 24">
          <rect x="1" y="1" width="148" height="22" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="75" y="15" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">aria-valuenow=&quot;60&quot;(省略で不確定)</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、属性の有無による確定/不確定の切り替えを図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Progress Indicators Make a Slow System Less Insufferable",
    color: "#7A4F7E",
    position: "待ち時間の長さそのものを基準に、表示すべきインジケーターの種類を決めるべきという時間ベースの指針(数値の目安あり)",
    size: "1秒未満は表示不要、1〜10秒はループアニメーション(スピナー)、10秒超は達成率表示(プログレスバー)が望ましいとしている。所要時間が読めない場合は、目安より早めにパーセンテージ表示へ切り替えるべきだとしている。",
    colorInfo: "色についての基準はありません。",
    stance:
      "進行状況インジケーターは、システムが動作していることを安心させ、おおよその待ち時間を示し、待つ間に見るものを提供するという3つの利点があるとしています。実験では、動く進行状況バーを見たユーザーは、何も表示されなかった場合に比べて平均で3倍長く待つ意思を示したと紹介されています。何も情報を示さない静的な表示は「十分なフィードバックにならない」として避けるべきとし、「しばらくお待ちください、二度押ししないでください」のような注意書きも、ユーザーがほとんど読まないため効果が薄いとしています。",
    exceptions:
      "10秒未満の処理でも、複数の書類や台帳をまとめて処理するような場合は、達成率表示(プログレスバー)を使ってよいとしています。",
    scenarios: [
      "1〜10秒程度の読み込みにループアニメーション(スピナー)を使いたい時",
      "10秒を超える、または超える可能性がある処理に達成率表示を使いたい時",
      "複数ファイルの一括処理など、短くても進捗の内訳を示したい時",
    ],
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、待ち時間の長さに応じた表示方法の使い分けというユーザー心理に基づく指針です。",
    useCases: [
      "1秒未満の処理にはインジケーターを表示しない",
      "何も情報を示さない静的な表示や「二度押ししないでください」の注意書きは避ける",
      "所要時間の見積もりが不確かな時は、早めに達成率表示へ切り替える",
    ],
    searchHint: "Percent-Done",
    url: "https://www.nngroup.com/articles/progress-indicators/",
    illustration: () => (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#7A4F7E", textAlign: "center" }}>
          <div>&lt;1s</div>
          <div style={{ color: "#B7BCDA" }}>非表示</div>
        </div>
        <span style={{ color: "#D8CBDA" }}>→</span>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#7A4F7E", textAlign: "center" }}>
          <div>1-10s</div>
          <div>スピナー</div>
        </div>
        <span style={{ color: "#D8CBDA" }}>→</span>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#7A4F7E", textAlign: "center" }}>
          <div>10s+</div>
          <div>バー</div>
        </div>
      </div>
    ),
    illustrationNote: "待ち時間の長さによる使い分けの目安(概念図・系列識別色)",
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

function ProgressSwatch() {
  return (
    <div style={{ width: 300, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <div style={{ fontSize: 10.5, color: "#7E86AC", marginBottom: 6, textAlign: "left" }}>確定的(determinate)― 線形バー</div>
        <svg width="300" height="10" viewBox="0 0 300 10"><rect x="0.5" y="0.5" width="299" height="9" rx="4.5" fill="#EEF1FA" /><rect x="0.5" y="0.5" width="190" height="9" rx="4.5" fill="#3A4FCF" /></svg>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 10.5, color: "#7E86AC", textAlign: "left" }}>不確定(indeterminate)― 円形スピナー</div>
        <svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="13" r="10" fill="none" stroke="#E1E3F0" strokeWidth="2.8" /><path d="M13 3a10 10 0 0 1 7 3" fill="none" stroke="#3A4FCF" strokeWidth="2.8" strokeLinecap="round" /></svg>
      </div>
    </div>
  );
}

export default function CommunicationProgressPage() {
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
        <SidebarNav currentPath="/components/communication/progress" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / プログレスインジケーター</span>
            <span>SPEC No. 036</span>
          </div>

          <h1 style={styles.title}>プログレスインジケーター</h1>
          <p style={styles.subtitle}>処理の進行状況を示す確定的(determinate)/不確定(indeterminate)インジケーターについて、4つのガイドラインを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <ProgressSwatch />
            <p style={styles.swatchNote}>所要時間が分かる処理には確定的なバー、分からない処理には不確定なスピナーを使うのが4系列共通の基本的な考え方。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列とも<strong>「確定的(determinate)/不確定(indeterminate)」という2状態の区別</strong>自体には合意していますが、その扱い方はレイヤーが異なります。Apple・Googleはこれを<strong>視覚デザインの指針</strong>として説明し、W3Cは<strong>aria-valuenow属性の有無という技術的な表現方法</strong>として定義し、Nielsen Norman Groupは<strong>待ち時間の長さで機械的に判断できる基準</strong>として提示しています。
            </p>
            <p style={styles.synthesisText}>
              最も具体的な数値を持つのはNN groupで、<strong>1秒未満は非表示、1〜10秒はスピナー、10秒超はプログレスバー</strong>という秒数の目安を明言しています。Apple・Googleはいずれも「所要時間が分かるなら確定的表示を優先する」という原則は述べていますが、具体的な秒数の閾値は確認できませんでした。
            </p>
            <p style={styles.synthesisText}>
              興味深い符合として、Googleが新設した<strong>「Loading indicator」コンポーネント(5秒未満の待ち時間向けに、従来の不確定円形インジケーターの多くを置き換える意図)</strong>は、NN groupの「1〜10秒はスピナー」という研究知見と時間感覚が近く、<strong>実装レベルのコンポーネント分割が、独立したUX研究の目安とほぼ一致</strong>している例として読み取れます。
            </p>
            <p style={styles.synthesisText}>
              W3Cの貢献は「いつ表示するか」ではなく<strong>「どう支援技術に伝えるか」</strong>という一点に絞られています。特に、不確定な処理ではaria-valuenowを<strong>0に設定するのではなく属性ごと省略すべき</strong>という具体的な注意点は、見た目の設計だけでは気づきにくい実装上の落とし穴です。
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
            <a href="/components/communication/empty-state" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>空状態・ローディング状態 ↗</div>
              <div style={styles.linkCardDesc}>コンテンツ読み込み中のプレースホルダー表示・骨組み表示の4系列比較</div>
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
              リンクについて: AppleはProgress indicatorsページ(補助的にLoadingページ)、GoogleはM3のProgress indicatorsページ(補助的に新設のLoading indicatorページ)、W3CはWAI-ARIA仕様のprogressbarロール(4.1.3とMDNの解説を併記)、NN groupは「Progress Indicators Make a Slow System Less Insufferable」記事へのリンクです。
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
