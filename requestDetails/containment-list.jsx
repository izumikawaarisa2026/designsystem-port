import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Containment / リスト」ページ。
 * テキスト・画像を縦に連続して並べ、項目の一覧性・比較のしやすさを重視する
 * コンテナの4系列比較。「カード」ページとは、ブラウジング型の閲覧(カード)か、
 * 検索・比較を重視した一覧(リスト)かという使い分けの関係にある。
 *
 * W3C(MDNのlist role/listitem role解説)/ Nielsen Norman Group(Card View vs.
 * List View)は公式ページ・記事本文を直接取得して確認済み(2026-09)。
 * Google(Material Design 3 Lists)はユーザー提供の公式ドキュメント(list.docx)
 * により2026-09に直接確認・全面更新(M3 Expressiveの「表現力豊かなリスト」・
 * スロット構造・選択モードなど)。Apple(HIG Lists and Tables)は公式サイトが
 * クライアント側レンダリングのSPAで本文を直接取得できなかったため、検索結果による
 * 間接確認(2026-09)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Lists and Tables",
    color: "#C2542A",
    position: "行(row)・セルの形で、データを1列以上に並べて提示するコンテナ。単純なテキストリストから並べ替え可能な列を持つテーブルまで対応",
    size: "具体的なpt数値は確認できていません。各行には他のタップ可能要素と同じ最小44×44ptのヒットターゲット基準が適用されると考えられます。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "リストとテーブルは、データを1列以上の行として提示するとしています。複雑なデータ集合を、明確で一覧性の高い表示に変換し、必要な情報をすぐに見つけられるようにする役割を持つとしています。各行・セルはコンテナとして機能し、単純なテキストリストから画像・操作を含むリッチなプレビューまで、様々なデータ種別・ユーザー操作に対応しつつ一貫した提示を行うとしています。テーブルはこのパターンを拡張したもので、並べ替え可能な列や階層データにも対応するとしています。",
    exceptions:
      "テーブルは、スクロールする単一列の行のリストとして、セクションやグループに分けて表示できるとしています。大量・少量どちらの情報も、リスト形式で簡潔かつ効率的に表示するために使うべきだとしています。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。標準のリスト/テーブルコントロールを使えば、支援技術には自動的に構造が伝わると考えられます。",
    scenarios: [
      "データを1列以上の行として一覧表示し、素早く見つけられるようにしたい場面",
      "単純なテキストリストから、画像・操作を含むリッチなプレビューまで内容に応じて使い分ける場面",
      "大量のデータにはセクション・グループ分けや並べ替え可能な列を持つテーブルを使う場面",
    ],
    useCases: [
      "―(支援技術に関する専用のユースケース記載は確認できていません)",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/lists-and-tables",
    confirmedNote: "「Lists and Tables」ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        {[13, 30, 47].map((y) => (
          <g key={y}>
            <rect x="8" y={y} width="104" height="13" rx="2" fill="#F8F9FD" />
            <text x="14" y={y + 9.5} fontSize="7.5" fill="#454C78" fontFamily="Jost, Noto Sans JP">項目</text>
          </g>
        ))}
      </svg>
    ),
    illustrationNote: "行として並ぶリスト/テーブル(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Lists(表現力豊かなリスト / ベースライン)",
    color: "#2F7D6E",
    position: "テキスト・画像を縦に連続して並べた索引。特定の項目を見つけて操作するために使う。2025年12月のM3 Expressiveアップデートで「表現力豊かなリスト」が追加された",
    size: "リスト項目の高さは、項目内の最も高い要素によって56dp・72dp・88dpのいずれかに決まるとしています。配置は中央揃えが基本ですが、高さが88dp以上、または3行以上のテキストを含む場合は上揃えになるとしています。スロット内のターゲットサイズは最低48×48dpを確保すべきとしています。",
    colorInfo: "色の値はデザイントークンを通じて実装されるとしています。リスト項目に画像が含まれる場合は、コンテンツに基づく配色でコンテナの色をカスタマイズすることを検討すべきとしています。",
    glossary: [
      { term: "表現力豊かなリスト / リスト(ベースライン)", desc: "2025年12月のM3 Expressiveアップデートで追加された「表現力豊かなリスト」は、セグメント化されたビジュアルスタイル・選択状態の強調表示・柔軟なスロットに対応し、新規デザインに推奨される。従来の「リスト(ベースライン)」も引き続き利用できるが、これらの新機能には対応しない。" },
      { term: "先頭 / コンテンツ / 末尾スロット", desc: "リスト項目を構成する3つの領域。先頭スロットにはアバター・アイコン・選択コントロールなど、コンテンツスロットにはラベルテキスト・補足テキストなど、末尾スロットにはアクション要素や選択コントロールなどを配置できる。" },
    ],
    stance:
      "リストは、テキストと画像を縦方向に連続してグループ化したもので、読みやすさを最適化するように設計されているとしています。ユーザーが特定の項目を見つけて、それに基づいて行動できるようにする役割を持つとしています。選択モードはリスト単位で1つのみ持てるとし、単一選択にはラジオボタン、複数選択にはチェックボックスやスイッチとの組み合わせが適するとしています。",
    scenarios: [
      "特定の項目を見つけて操作させたい、縦方向の索引を作りたい場面",
      "中〜拡張ブレークポイントで、リストと詳細情報を並べて表示したい場面",
      "大きい画面幅では、カルーセルなど同じ目的を持つ他のコンポーネントへの置き換えも検討する",
    ],
    exceptions:
      "選択モードはリスト単位で1つのみ持てるとし、単一選択リストと複数選択リストを同時に持つことはできないとしています。単一選択リスト項目にはチェックボックスを、複数選択リスト項目にはラジオボタンを使うべきではないとしています。先頭・コンテンツ・末尾のスロットはデフォルトではアクセスできず、実装にはカスタムコードが必要だとしています。",
    accessibility:
      "操作可能(Operable)・知覚可能(Perceivable) ― 単一アクションリストではTabキーで最初の要素(または選択済みの項目)にフォーカスが移り、矢印キーで項目間を移動できるとしています。複数アクションリスト項目では個々のアクションのみが選択対象になり、リスト項目全体は選択できないとしています。選択状態は色だけに頼らず、ラジオボタン/チェックボックス、アイコン、下線など色以外の手がかりでも示すべきだとしています。",
    useCases: [
      "リスト項目に移動できるようにする",
      "リスト項目を選択できるようにする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/lists/guidelines",
    confirmedNote: "使用法・バリエーション(表現力豊かなリスト/ベースライン)・スロット構造・適応型デザイン・行動(選択モード・スワイプ・展開折りたたみ)・インタラクションとスタイル・ユースケースの各セクションは、ユーザー提供の公式ドキュメント(list.docx)により2026-09に直接確認・反映済み。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" />
        {[13, 30, 47].map((y) => (
          <g key={y}>
            <circle cx="16" cy={y + 6.5} r="5" fill="#EAF3F1" />
            <rect x="28" y={y + 2} width="80" height="9" rx="2" fill="#EAF3F1" />
          </g>
        ))}
      </svg>
    ),
    illustrationNote: "画像+テキストの縦方向インデックス(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― list role / listitem role",
    color: "#A3821F",
    position: "role=\"list\" + role=\"listitem\"(またはHTMLのul/ol + li)で識別する、非対話的な項目の集合",
    size: "リスト専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5)は各項目内の操作要素に適用されます。",
    colorInfo: "リスト専用の色基準はありませんが、1.4.11(非テキストのコントラスト)が区切り線などの視覚的要素に適用され得ます。",
    stance:
      "listロールは0個以上のlistitem子要素のみを含むコンテナで、支援技術にリスト構造を伝えるためのものだとしています。可能な限りHTMLのセマンティック要素(順序がない場合はul+li、順序が重要な場合はol+li)を優先すべきで、ARIAのlist/listitemロールは、HTMLを直接制御できない場合やJavaScriptで動的にアクセシビリティを付与する場合にのみ使うべきだとしています。",
    scenarios: [
      "支援技術にリスト構造を明示的に伝えたい場面(特にHTMLを直接制御できない場合)",
    ],
    exceptions:
      "ARIAのlistロールは順序付き/順序なしを区別しないため、順序が意味を持つ場合はHTMLのol要素を使うべきだとしています。リストがタブとして機能する場合は、list/listitemではなくtablist/tab/tabpanelロールを使うべきだとしています。",
    accessibility:
      "堅牢(Robust) ― セマンティックHTML(ul/ol/li)を優先することで、支援技術に構造が自動的に伝わるとしています。ARIA属性はHTMLを直接制御できない場合の代替手段という位置づけです。",
    useCases: [
      "可能な限りHTMLのul/ol + liを使い、ARIAのlist/listitemはHTMLを制御できない場合の代替とする",
      "順序が意味を持つ場合はul(順序なし)ではなくol(順序あり)を使う",
      "タブとして機能するリストにはlist/listitemではなくtablist/tab/tabpanelを使う",
    ],
    searchHint: "listitem",
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/list_role",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="30" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="list"</text>
          <text x="60" y="44" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="listitem"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Card View vs. List View",
    color: "#7A4F7E",
    position: "複数項目のソート・比較を効率的に行える、スペース効率の高い表示形式(「カード」ページで比較したカード表示との対比が判断基準)",
    size: "数値基準は明言していませんが、リスト表示はスペース効率が高いという特性が挙げられています。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "リスト表示は、ソートが容易でスペース効率が高いという特性を持つとしています。対してカード表示は視覚的な魅力が高く、関連情報のグループ化に効果的だとしています。",
    scenarios: [
      "複数項目を素早く比較・ソートする必要がある場面",
    ],
    exceptions:
      "複数の項目を素早く比較・ソートする必要がある場合はリスト表示が適しており、情報をビジュアル中心で提示し関連情報をグループ化したい場合はカード表示が向いているとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、比較・ソートのしやすさと視覚的訴求力のどちらを優先するかという使い分けの指針です。",
    useCases: [
      "複数項目を素早く比較・ソートする必要がある場合はリスト表示を使う",
      "視覚的な訴求・関連情報のグループ化を重視する場合はカード表示を検討する",
    ],
    searchHint: "space efficient",
    url: "https://www.nngroup.com/videos/card-view-vs-list-view/",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        {[13, 30, 47].map((y) => (
          <rect key={y} x="8" y={y} width="104" height="13" rx="2" fill="#F1E9F1" />
        ))}
      </svg>
    ),
    illustrationNote: "ソート・比較に適した密なリスト表示(概念図・系列識別色)",
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

function ListSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden", textAlign: "left" }}>
      {["リスト項目 1", "リスト項目 2", "リスト項目 3"].map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderBottom: i < 2 ? "1px solid #E1E3F0" : "none" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#F0F4F8" }} />
          <span style={{ fontSize: 12, color: "#171B36" }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ContainmentListPage() {
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
        <SidebarNav currentPath="/components/containment/list" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / リスト</span>
            <span>SPEC No. 027</span>
          </div>

          <h1 style={styles.title}>リスト</h1>
          <p style={styles.subtitle}>4つのガイドラインが、項目を縦に並べ、一覧性・比較のしやすさを重視するコンテナをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <ListSwatch />
            <p style={styles.swatchNote}>テキスト・画像を縦に連続して並べる索引。「カード」ページで比較した、ブラウジング型のカード表示とは使い分けの関係にある。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              リストの位置づけを最も明確に言語化しているのはNielsen Norman Groupで、<strong>「リスト表示はソートが容易でスペース効率が高い」</strong>という特性を、カード表示(視覚的訴求力・グループ化に強い)と対比させています。この対比は、そのまま「カード」ページとの使い分けの軸になります。
            </p>
            <p style={styles.synthesisText}>
              Apple・Googleとも、<strong>リストを「特定の項目を素早く見つけて操作するための索引」</strong>と位置づけている点は共通しています。Appleはこれをテーブル(並べ替え可能な列・階層データ)まで拡張して扱っているのに対し、Googleは行の内容量に応じた1行/2行/3行というバリエーションで表現しており、対象とする粒度がやや異なります。
            </p>
            <p style={styles.synthesisText}>
              W3Cが強調する<strong>「可能な限りARIAのlist/listitemロールではなくHTMLのul/ol+liを使うべき」</strong>という原則は、他のコンポーネントページではあまり見られない実装上の注意点です。順序の有無(ul/ol)を区別できるのはHTMLのセマンティック要素側だけで、ARIAロールだけでは表現できないという技術的な限界も示されています。
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
                {s.scenarios && <InfoBox label="推奨される使用シーン" accent="#2F7D6E"><UseCaseList items={s.scenarios} /></InfoBox>}
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
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.scenarios ? <UseCaseList items={s.scenarios} /> : <span style={{ color: "#B7BCDA" }}>―(該当する記載なし)</span>}</div>))}
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
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.linksRow}>
            <a href="/components/containment/card" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>カード ↗</div>
              <div style={styles.linkCardDesc}>ブラウジング型の閲覧に適した要約表示との使い分けはこちら</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["情報の整理・一覧"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3C・NN group・Googleは本文確認済み。Appleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはLists and Tablesページ、GoogleはListsページへのリンクです。WCAGはMDNのlist role解説ページ、NN groupは動画ページ単位です。
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
