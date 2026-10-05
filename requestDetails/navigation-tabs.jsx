import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Navigation / タブ」ページ。
 * セグメントコントロールと見た目が似ているため混同されやすいが、タブは「異なる
 * コンテンツ領域(画面・セクション)への移動」を担う点が本質的な違い。詳しい
 * 使い分けは「タブとセグメントの使い分け」ページを参照。
 *
 * Apple / W3C(WAI-ARIA)/ Nielsen Norman Groupは公式ページ・記事本文を直接取得して
 * 確認済み(2026-09)。Google(Material Design 3)は公式サイトがクライアント側
 * レンダリングのSPAで自動取得できないため、これまで検索結果による間接確認だったが、
 * 公式ページ本文(使用法・プライマリ/セカンダリ・コンテナ・アイコン・ラベル・バッジ・
 * アクティブインジケーター・Fixed/Scrollable・インタラクションとスタイル・
 * アクセシビリティの各セクション)を確認できたため、その内容を反映済み(2026-09、
 * MD3_text/tab.docx)。これにより「プライマリ/セカンダリの2階層」という、従来は
 * 未確認だった構造が判明し反映した。タブの高さなどのspecs数値は未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Tab Bars",
    color: "#C2542A",
    position: "アプリのトップレベルのセクション間を移動するための、ナビゲーション専用のバー",
    size:
      "タブの数の上限は数値で示しておらず、必要な数のタブを使い、タブは少ないほど移動しやすいことを踏まえて増やしすぎないよう求めています。画面の幅でタブが収まらないと、末尾が「その他(More)」タブにまとめられて中身が見つけにくくなるため、はみ出しを避けるよう求めています(2026-10にHIGの本文で再確認。以前の「3〜5個」という記述は現在の本文にはありません)。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "タブバーは、アプリのトップレベルのセクション間を移動するために使うものと定義されています。厳密にナビゲーション専用とし、タブバーのボタンを操作の実行(アクション)に使うべきではないとしています。",
    exceptions:
      "機能が一時的に使えない場合でも、タブを削除したり無効化したりすべきではないとしています(インターフェースが不安定・予測不能になるため)。タブが使えない理由は説明し、常に全てのタブを有効にしておくべきとしています。また、画面遷移中もタブバーを常に表示しておくべきで、非表示にするとユーザーが自分のいる場所を見失うとしています。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。標準のタブバーコントロールを使えば、支援技術には自動的に状態が伝わると考えられます。",
    useCases: [
      "アプリのトップレベルセクション間を移動する",
      "タブは必要な数に絞り、「その他(More)」タブへのはみ出しを避ける",
      "機能が使えない場合もタブ自体は無効化・削除せず、理由を説明する",
    ],
    searchHint: "Avoid overflow tabs",
    url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        <rect x="1" y="1" width="118" height="24" rx="4" fill="#FFFFFF" stroke="#E1E3F0" strokeWidth="1.2" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={2 + i * 29.5} y="2" width="28.5" height="22" fill={i === 0 ? "#F7E4E1" : "none"} />
        ))}
        <line x1="1" y1="1" x2="1" y2="25" stroke="#C2542A" strokeWidth="2.5" />
        <text x="16" y="17" fontSize="8" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">A</text>
        <text x="45" y="17" fontSize="8" fill="#9EA4C4" textAnchor="middle" fontFamily="Jost, Noto Sans JP">B</text>
        <text x="75" y="17" fontSize="8" fill="#9EA4C4" textAnchor="middle" fontFamily="Jost, Noto Sans JP">C</text>
        <text x="104" y="17" fontSize="8" fill="#9EA4C4" textAnchor="middle" fontFamily="Jost, Noto Sans JP">D</text>
      </svg>
    ),
    illustrationNote: "4タブ、左端が選択済み(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Tabs",
    color: "#2F7D6E",
    position: "コンテンツを画面・データセットなどのカテゴリに整理する。プライマリ/セカンダリの2階層と、Fixed/Scrollableの2表示方式を持つ",
    size:
      "タッチターゲットは48×48 CSSピクセル以上を確保すべきとしています。密度設定はデフォルトで適用すべきではなく(適用するとターゲットサイズが48×48pxを下回るため)、より高密度なレイアウトを選ぶ場合も各要素は最低48×48pxを維持すべきとしています。固定タブは一度に4個までを推奨し、5個以上は容器が窮屈になるとしています。スクロール可能なタブでは、最初のタブを端から52dp離して配置し、スクロール可能であることを示すべきとしています。",
    colorInfo:
      "アクティブなタブは、テキストとアイコンに下線と色の変化を適用して区別するとしています。具体的なカラートークンの詳細は確認できていません。",
    glossary: [
      { term: "プライマリタブ / セカンダリタブ", desc: "タブには2つの階層がある。プライマリタブはコンテンツペイン上部・アプリバー直下に置き、主要なコンテンツへのリンクを示す。セカンダリタブは常にプライマリタブの下に配置し、その中でさらに関連コンテンツを細分化する。見た目はよりシンプルだが機能はプライマリタブと同じ。" },
      { term: "Fixed(固定) / Scrollable(スクロール可能)", desc: "固定タブはセット内の全タブを同時に表示する(地図の交通手段切り替えなど)。スクロール可能なタブは画面に収まりきらない場合に使い、より長いラベルや多くのタブに対応できる。" },
    ],
    stance:
      "タブは、同じ階層レベルにある関連コンテンツをグループ分けして整理するコンポーネントで、連続した(順番に読むべき)コンテンツではなく、関連するコンテンツをまとめる用途に限定すべきとしています。プライマリタブはコンテンツペイン上部・アプリバーの下に置き、セカンダリタブは常にその下に配置します(詳しくは下記「用語メモ」を参照)。コンテナは常にウィンドウ幅いっぱいに広がり、下端の区切り線でコンテンツと区切られるとしています。",
    exceptions:
      "特定の順序で読む必要がある連続したコンテンツにはタブを使うべきではなく、代わりにタイポグラフィや余白でコンテンツ内の階層を作るべきとしています。一部のタブにだけアイコンとラベルの両方を使う(他は片方だけ)といった不統一な構成は避けるべきとしています。タブセットを無限スクロールさせるループ処理は避けるべきで、スクリーンリーダーで直線的にナビゲーションしているユーザーの操作を妨げる可能性があるとしています。",
    accessibility:
      "操作可能(Operable) ― タッチターゲット48×48 CSSピクセル以上の確保に加え(上記「サイズ」を参照)、アイコンのみで文字を持たないタブには読み上げ用のラベルを設定すべきとしています。Tabキーでフォーカスインジケーターが表示され、Space/Enterキーでアクティブなタブを選択すると新しいページに移動します。タブメニュー内では矢印キーまたはTabキーで項目間を移動できます。",
    useCases: [
      "同じ階層レベルの関連コンテンツをカテゴリにグループ化する(連続して読むコンテンツには使わない)",
      "タブの階層が複数必要な場合はプライマリ+セカンダリの2段構成にする",
      "収まりきらない場合はScrollable、全部見せたい場合はFixed(4個までを推奨)を選ぶ",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/tabs/guidelines",
    urlSecondary: [{ label: "Accessibility", url: "https://m3.material.io/components/tabs/accessibility" }],
    confirmedNote: "使用法・プライマリ/セカンダリ・コンテナ・アイコン・ラベル・バッジ・アクティブインジケーター・Fixed/Scrollable・インタラクションとスタイル・アクセシビリティの各セクションは2026-09時点で公式ページ本文を直接確認済み。タブの高さなどのspecs数値は未確認。",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        {[0, 1, 2].map((i) => (
          <text key={i} x={20 + i * 40} y="13" fontSize="8" fill={i === 0 ? "#2F7D6E" : "#9EA4C4"} textAnchor="middle" fontFamily="Jost, Noto Sans JP" fontWeight={i === 0 ? "700" : "400"}>{["カテゴリA", "カテゴリB", "カテゴリC"][i]}</text>
        ))}
        <line x1="1" y1="22" x2="119" y2="22" stroke="#E1E3F0" strokeWidth="2" />
        <line x1="2" y1="22" x2="38" y2="22" stroke="#2F7D6E" strokeWidth="2.5" />
      </svg>
    ),
    illustrationNote: "選択中のタブに下線インジケーター(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 4.1.2 / 2.1.1 / 2.5.8 / 2.5.5(WAI-ARIA Tabsパターン) / 3.2.1",
    color: "#A3821F",
    position: "role=\"tablist\"/\"tab\"/\"tabpanel\"という、名前・役割・状態とキーボード操作性を求める一般基準の集合",
    size:
      "タブ専用の数値基準はありませんが、一般的なターゲットサイズ基準が適用されます。2.5.8(レベルAA)は最低24×24 CSSピクセル、2.5.5(レベルAAA)は44×44 CSSピクセルを求めます。",
    colorInfo:
      "1.4.11(非テキストのコントラスト)により、選択中のタブを示す下線や背景などの視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    glossary: [
      { term: "3.2.1 On Focus・レベルA", desc: "部品にフォーカスが当たっただけで、文脈の変化(新しいウィンドウ・ページの移動・フォーカスの移動など)を起こさないことを求める基準。" },
      { term: "文脈の変化(change of context)", desc: "利用者が気づかないうちに起きると混乱させる大きな変化。新しいウィンドウを開く、フォーカスを別の部品に移す、別のページへ移動する、ページの内容を大きく組み替える、など。内容の変化(アコーディオンの開閉・タブの切り替えなど)は、それだけでは文脈の変化ではない。" },
    ],
    stance:
      "タブはWAI-ARIAのTabsパターンに沿って実装すべきとしています。タブの並びを囲む要素にrole=\"tablist\"、各タブにrole=\"tab\"、対応するコンテンツ領域にrole=\"tabpanel\"を割り当て、選択中のタブにはaria-selected=\"true\"を設定するとしています。3.2.1(レベルA)は、フォーカスを当てただけで文脈の変化を起こさないことを求めます。W3Cは、タブの切り替えのような内容の変化は、それだけでは文脈の変化にあたらないとしているため、矢印キーでタブに移ったときに同じページ内のパネルを切り替えるのは問題ありません。ただし、タブにフォーカスしただけで別のページへ移動したり、フォーカスをパネルの中へ動かしたりする作りは避けます。",
    exceptions:
      "矢印キーで隣接するタブへ移動できるようにし、Tabキーでは現在選択中のタブだけにフォーカスが止まるようにする(ロービングタブインデックス)という実装上の注意点があります。標準的なARIAロールを使わないカスタム実装の場合にのみ、この配慮が必要になります。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― 名前・役割・状態(4.1.2)に加え、矢印キーでのタブ間移動などのキーボード操作性(2.1.1)、ターゲットサイズ(2.5)が関わります。3.2.1は「理解可能(Understandable)」の予測可能性(3.2)に関わります。",
    useCases: [
      "タブの並びにrole=\"tablist\"、各タブにrole=\"tab\"を割り当てる",
      "対応するコンテンツ領域にrole=\"tabpanel\"を割り当てる",
      "矢印キーでタブ間を移動できるようにする(ロービングタブインデックス)",
      "タブにフォーカスしただけで別のページへ移動させない(パネルの切り替えはよい、3.2.1)",
    ],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/",
    urlSecondary: [
      { label: "3.2.1 On Focus", url: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html" },
    ],
    confirmedNote: "3.2.1はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="26" viewBox="0 0 120 26">
          <rect x="1" y="1" width="118" height="24" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="17" fontSize="8.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">tablist / tab / tabpanel</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Tabs, Used Right",
    color: "#7A4F7E",
    position: "少数・並列で重要度が均等なコンテンツグループに向く(数値基準ではなく使い分けの指針)",
    size: "数値基準は明言していません。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "内容が長く、明確なグループ分けがある場合、タブは情報を一目で見える単位に分割し、認知負荷を減らすとしています。タブは、ユーザーが自然に「まとまっているはず」と期待する並列カテゴリを整理するのに最も向くとしています。",
    exceptions:
      "タブの数が多すぎてタブ一覧からあふれると、キャルーセル化して隠れたタブが見つけにくくなるため、タブはできるだけ少なくすべきとしています。また、内容の重要度が均等でない場合はタブを使うべきではないとし、既定で表示されるタブに注目が集まりやすいため、既定でないタブの内容は必須ではなく補助的なものにすべきとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、コンテンツを自然に期待されるグループへ整理するという使い分けの指針です。",
    useCases: [
      "内容が長く、明確な並列グループに分けられる場合に使う",
      "タブ数はできるだけ少なく保つ(あふれるとキャルーセル化し発見性が下がる)",
      "全てのタブの内容が同程度重要な場合に使う(そうでなければ避ける)",
    ],
    searchHint: "the fewer tabs, the better",
    url: "https://www.nngroup.com/articles/tabs-used-right/",
    illustration: () => (
      <svg width="120" height="26" viewBox="0 0 120 26">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={2 + i * 39} y="2" width="37" height="22" rx="3" fill={i === 0 ? "#7A4F7E" : "#FFFFFF"} stroke="#7A4F7E" strokeWidth="1.4" />
        ))}
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

function TabSwatch() {
  const items = ["おすすめ", "フォロー中", "話題"];
  return (
    <div style={{ display: "inline-flex", borderBottom: "2px solid #E1E3F0" }}>
      {items.map((label, i) => (
        <div
          key={label}
          style={{
            padding: "8px 16px", fontSize: 13, fontFamily: "'Jost', 'Noto Sans JP', sans-serif",
            color: i === 0 ? "#3A4FCF" : "#9EA4C4",
            fontWeight: i === 0 ? 700 : 400,
            borderBottom: i === 0 ? "2px solid #3A4FCF" : "2px solid transparent",
            marginBottom: -2,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default function NavigationTabsPage() {
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
        <SidebarNav currentPath="/components/navigation/tabs" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / タブ</span>
            <span>SPEC No. 013</span>
          </div>

          <h1 style={styles.title}>タブ</h1>
          <p style={styles.subtitle}>4つのガイドラインが、コンテンツ間を移動するナビゲーションコンポーネントとしてサイズ・色・アクセシビリティをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <TabSwatch />
            <p style={styles.swatchNote}>選択中のタブを下線などで示し、タップすると対応するコンテンツ領域に切り替わる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              タブは4系列とも<strong>「コンテンツの異なる領域(画面・セクション・データセット)を切り替えるためのナビゲーション」</strong>という理解で一致しています。セグメントコントロールと見た目が似ていますが、<strong>「移動先が変わる」のがタブ、「同じ場所の見え方が変わる」のがセグメントコントロール</strong>、という役割の違いが本質です(詳しくは「タブとセグメントの使い分け」を参照)。
            </p>
            <p style={styles.synthesisText}>
              Googleは<strong>「固定タブは4個までを推奨し、5個以上は容器が窮屈になる」</strong>という数値の上限を示し、Appleは数値を示さないものの<strong>「タブは少ないほど移動しやすく、『その他』タブへのはみ出しは避ける」</strong>としています(以前のHIGにあった「3〜5個」という記述は、2026-10時点の本文にはありません)。Nielsen Norman Groupも<strong>「タブはできるだけ少なく、あふれるとキャルーセル化して発見性が下がる」</strong>と、実質的に同じ方向の注意を促しており、数値の有無は違っても、4系列中3系列が「タブを増やしすぎない」という同じ結論に達している点は信頼度が高いと言えます。
            </p>
            <p style={styles.synthesisText}>
              公式ページ本文を確認したところ、<strong>Googleのタブには「プライマリ/セカンダリ」という2階層の構造</strong>があることが判明しました(セカンダリタブは常にプライマリタブの下に配置)。これはAppleのTab Bars(1階層のみ)にはない発想で、Googleが「Fixed/Scrollable」という表示方式の軸とは別に、階層の軸も持っている点が特徴的です。
            </p>
            <p style={styles.synthesisText}>
              アクセシビリティについては、<strong>W3Cがrole="tablist"/"tab"/"tabpanel"という具体的なARIAパターン</strong>を示しており、矢印キーでのタブ間移動(ロービングタブインデックス)という実装上の要点も明確です。Appleは「機能が使えない場合もタブを無効化・削除しない」という、他系列にはない具体的な運用ルールを持っています。Googleも「タブセットを無限ループでスクロールさせない」という、スクリーンリーダーの直線的なナビゲーションを妨げないための具体的な注意点を示しています。
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
            {["操作可能(POUR)", "理解可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["ナビゲーション"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(Apple・W3C・NN group・Googleとも本文確認済み。Googleのタブ高さなどのspecs数値のみ未確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはTab Bars本体へのリンクです。WCAGはWAI-ARIA Authoring Practices(Tabsパターン)、NN groupは記事ページ単位です。Googleは最新版(M3)の公式ページ(Tabs)へリンクしており本文は確認済みですが、タブの高さなどのspecs数値はまだ確認できていません。
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
