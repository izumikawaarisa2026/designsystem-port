import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Containment / カード」ページ。
 * 関連情報をまとめ、境界線・影・塗りつぶしなどで背景と視覚的に区別するコンテナの
 * 4系列比較。
 *
 * W3C(WAI-ARIA article role、仕様原文を直接取得)/ Nielsen Norman Group
 * (Cards: UI-Component Definition、記事本文を直接取得)は2026-09に確認済み。
 * Apple(HIG Boxes)・Google(Material Design 3 Cards)は公式サイトがクライアント側
 * レンダリングのSPAで本文を直接取得できなかったため、検索結果による間接確認(2026-09)。
 * Appleには「カード」という名称の専用コンポーネントは見当たらず、最も近い概念として
 * 「Boxes」(論理的に関連する情報のグループ化)を掲載している。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Boxes",
    color: "#C2542A",
    position: "論理的に関連する情報・コンポーネントを視覚的にグループ化するコンテナ(「カード」という名称の専用コンポーネントは見当たらない)",
    size: "具体的なpt数値は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "ボックスは、論理的に関連する情報とコンポーネントを視覚的に区別してグループ化するものだとしています。Googleの「カード」のような、タップして詳細画面に進む要約表示・エントリーポイントという用途に完全に一致する専用コンポーネントは見当たりません。",
    scenarios: [
      "論理的に関連する情報・コンポーネントを視覚的にグループ化したい場面",
      "「カード」のようなタップ可能な要約表示が必要な場合は、標準コンポーネントの組み合わせで代替する場面",
    ],
    exceptions:
      "検索で確認できた情報は限定的で、詳細な使用基準(境界線の有無、影の使用可否など)は公式ページ本文で未確認です。",
    accessibility:
      "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "―(支援技術に関する専用のユースケース記載は確認できていません)",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/boxes",
    confirmedNote: "「カード」という名称の専用コンポーネントは見当たらず、最も近い概念として「Boxes」を掲載しています。ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <rect x="10" y="10" width="100" height="20" rx="2" fill="#F0F4F8" />
        <rect x="10" y="36" width="70" height="6" rx="2" fill="#F0F4F8" />
        <rect x="10" y="48" width="90" height="6" rx="2" fill="#F0F4F8" />
      </svg>
    ),
    illustrationNote: "論理的に関連する情報をまとめるBoxes(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Cards(Elevated / Filled / Outlined)",
    color: "#2F7D6E",
    position: "単一の主題に関するコンテンツとアクションをまとめる、境界線・影・塗りつぶしのいずれかで背景と区別するコンテナ。3種類のスタイルバリエーションを持つ",
    size: "具体的なdp数値は確認できていません。",
    colorInfo: "色の値はデザイントークンを通じて実装されるとしています。3種類のスタイル間で色の役割自体に基準の違いがあるという記載は確認できていません。",
    glossary: [
      { term: "Elevated / Filled / Outlined", desc: "背景との分かれ方は、Filled(塗りつぶし。控えめ)< Elevated(影。Filledより強いがOutlinedほどではない)< Outlined(輪郭線。ほかの2種類より強調できる)の順。3種類とも読みやすさ・機能は同じで、どれを選ぶかは見た目(スタイル)だけで決める。つまり、強調の強さの違いは見た目の違いで、機能の違いではない。" },
    ],
    stance:
      "カードは、単一の主題に関するコンテンツとアクションをまとめて表示するコンポーネントだとしています。関連性が高く実行可能な情報を、要素の階層が明確にわかる形でスキャンしやすくまとめるべきだとし、立体的(Elevated)・塗りつぶし(Filled)・輪郭線付き(Outlined)の3種類のスタイルを持つとしています。3種類とも可読性・機能性は同等で、選択はスタイルのみによる判断だとしています。",
    scenarios: [
      "音楽アルバムや今後の予定の詳細など、より詳しい情報やナビゲーションへの入り口として使う場面",
      "グリッド表示・縦型リスト表示・カルーセル表示など、複数のカードをまとめて表示する場面",
      "間隔・見出し・区切り線だけでシンプルな階層を組める場合は、無理にカードへ押し込まない",
    ],
    exceptions:
      "カードコンテナが唯一の必須要素で、その他の要素(コンテンツブロック・仕切り・メディア)はすべてオプションだとしています。画像上にテキストやアイコンを重ねる配置は推奨されず、どうしても必要な場合はコントラスト確保や半透明の境界線などの配慮が必要だとしています。フィルタ・並べ替えのオプションはカードコレクションの外に配置すべきとし、ドラッグやスワイプによる並べ替え・削除などの操作には、メニューからの選択のような単一ポインターの代替手段が必須だとしています。画面が小さい場合はカードの代わりにリストの使用を検討すべきとしています。",
    accessibility:
      "操作可能(Operable)・堅牢(Robust) ― 直接操作可能なカードはボタンまたはリンクの役割を持ち、タップやSpace/Enterキーで操作できるとしています。操作を起こさないカード(単なるコンテナ)には役割を付与しないとし、装飾目的の画像はスクリーンリーダーから隠すべきとしています。",
    useCases: [
      "カードとその中の要素へ移動できるようにする",
      "押せるカードは、タップ・クリック・キーボード(Space/Enter)のどれでも操作でき、押したことが見た目で分かるようにする",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/cards/guidelines",
    confirmedNote: "使用法・解剖学(構成要素)・行動(拡大・ナビゲーション・ジェスチャー)・インタラクションとスタイル・ユースケースの各セクションは、M3の公式ページ本文(m3.material.io「Cards」のガイドライン)で2026-09に直接確認・反映済み。具体的なdpのサイズ数値は含まれておらず未確認です。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.6" style={{ filter: "drop-shadow(0 2px 3px rgba(47,125,110,0.25))" }} />
        <rect x="10" y="10" width="100" height="20" rx="2" fill="#EAF3F1" />
        <rect x="10" y="36" width="70" height="6" rx="2" fill="#EAF3F1" />
        <rect x="10" y="48" width="90" height="6" rx="2" fill="#EAF3F1" />
      </svg>
    ),
    illustrationNote: "影で背景から分離するElevated cardの例(分かれ方はFilledより強く、Outlinedほどではない。概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA ― article role",
    color: "#A3821F",
    position: "W3Cはカードを定めていない。カードの内容が単独でも意味を持つ記事・投稿などなら、article要素(role=\"article\")が一つの例(AI解釈)",
    size: "カード専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5。どちらも例外あり)はタップ可能なカードにも適用されます。",
    colorInfo: "カード専用の色基準はありませんが、1.4.11(非テキストのコントラスト)が境界線などの視覚的要素に適用され得ます。",
    stance:
      "articleロールは、ページ内で独立した構成をなす領域(ブログ記事・フォーラムの投稿・複合ドキュメント内の自己完結したセクションなど)を示すためのロールだとしています。関連するラベル付けにはaria-labelledby(タイトル要素を参照)またはaria-labelを使うべきだとしています。複数のarticleを入れ子にすることも可能だとしています。",
    scenarios: [
      "カードを、見出しを持つ独立した自己完結型のセクションとして提示したい場面",
    ],
    exceptions:
      "articleはランドマークロールではなく文書構造ロールである点に注意が必要だとしています(ナビゲーション用の目印としては機能しません)。HTML5のarticle要素がある場合は、role属性を明示的に指定するのではなく、そちらのホスト言語の意味を優先すべきだとしています。",
    accessibility:
      "堅牢(Robust)・知覚可能(Perceivable) ― article要素・ロールによる構造の明示、aria-labelledby/aria-labelによるラベル付けが中心です。",
    useCases: [
      "カードの内容が単独でも意味を持つ記事・投稿などなら、article要素を検討する(一つの例・AI解釈)。単なるレイアウトの入れ物や操作のまとまりなら、内容に合う別のHTMLを選ぶ",
      "カード全体を押せるようにする場合は、中に別のボタンやリンクを入れ子にしない(支援技術で正しく扱えないため)",
      "カードのタイトル要素をaria-labelledbyで参照するか、aria-labelでラベル付けする",
      "article要素がある場合はrole属性を明示的に付けず、ホスト言語の意味を優先する",
    ],
    searchHint: "independent part",
    url: "https://www.w3.org/TR/wai-aria-1.2/#article",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="38" fontSize="9" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="article"</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、役割・構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Cards: UI-Component Definition",
    color: "#7A4F7E",
    position: "関連情報をまとめた、要約+詳細への入り口としてのカード。ブラウジング(探索的な閲覧)に適するが、検索・比較には不向き(数値基準ではなく使い分けの指針)",
    size: "数値基準は明言していませんが、高さは可変で幅は固定という柔軟なレイアウトを推奨しています。",
    colorInfo: "色についての数値基準はありませんが、ドロップシャドウ・境界線・背景色でクリック可能性を視覚的に示すべきだとしています。",
    stance:
      "カードは、トランプのカードのような外観を持つ、柔軟なサイズのコンテナに関連情報をまとめたUIパターンだとしています。完全な情報ではなく、詳細ページへの入り口となる要約(スナップショット)を示すものだとしています。",
    scenarios: [
      "異なる種類のコンテンツが混在するダッシュボードなど、ブラウジング(探索的な閲覧)に使う場面",
    ],
    exceptions:
      "検索時の使用(一覧性が低い)や、複数項目の比較(レイアウトが予測しにくく比較しづらい)には不向きだとしています。写真ギャラリーのような同種コンテンツには、通常グリッド表示の方が適しているとしています。",
    accessibility:
      "根拠となる原則 ― POURのような適合区分ではなく、使い分けの指針です。ドロップシャドウ・境界線・背景色でクリック可能性を視覚的に示すことは、大きなタップ領域の確保にもつながり、ユーザビリティを高めるとしています。",
    useCases: [
      "異なる種類のコンテンツが混在するブラウジング型の閲覧(ダッシュボード等)に使う",
      "検索や複数項目の比較が主目的の場合はリスト表示を検討する",
      "写真ギャラリーなど同種コンテンツにはグリッド表示を検討する",
    ],
    searchHint: "snapshot",
    url: "https://www.nngroup.com/articles/cards-component/",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <rect x="10" y="10" width="100" height="20" rx="2" fill="#F1E9F1" />
        <rect x="10" y="36" width="70" height="6" rx="2" fill="#F1E9F1" />
        <text x="10" y="58" fontSize="7.5" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">続きを読む &gt;</text>
      </svg>
    ),
    illustrationNote: "要約+詳細への入り口となるカード(概念図・系列識別色)",
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

function CardSwatch() {
  return (
    <div style={{ width: 220, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 8, padding: "12px 14px", boxShadow: "0 2px 8px rgba(23,27,54,0.08)", textAlign: "left" }}>
      <div style={{ width: "100%", height: 60, borderRadius: 4, background: "#F0F4F8", marginBottom: 10 }} />
      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#171B36", marginBottom: 4 }}>見出しテキスト</div>
      <div style={{ fontSize: 11, color: "#7E86AC" }}>要約テキストがここに入ります…</div>
    </div>
  );
}

export default function ContainmentCardPage() {
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
        <SidebarNav currentPath="/components/containment/card" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / カード</span>
            <span>SPEC No. 026</span>
          </div>

          <h1 style={styles.title}>カード</h1>
          <p style={styles.subtitle}>4つのガイドラインが、関連情報をまとめて背景と視覚的に区別するコンテナをどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <CardSwatch />
            <p style={styles.swatchNote}>画像・見出し・要約テキストをまとめ、詳細への入り口となるコンテナ。境界線・影・塗りつぶしのいずれかで背景と区別する。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              カードは、<strong>Googleが最も明確にコンポーネント化している</strong>一方、<strong>Appleには「カード」という名称の専用コンポーネントが見当たりません</strong>。最も近い概念は「論理的に関連する情報をグループ化する」ためのBoxesですが、Googleのカードが持つ「タップして詳細に進む要約表示」という発見的な役割までは踏み込んでいない可能性があります。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupが示す最も重要な指針は、<strong>カードはブラウジング(探索的な閲覧)には向くが、検索や複数項目の比較には不向き</strong>という使い分けです。これはGoogleの3種類のスタイル(Elevated/Filled/Outlined、いずれも機能的には同等)という視覚バリエーションの話とは別のレイヤーで、「そもそもカードを使うべき場面かどうか」を判断する上で重要です。
            </p>
            <p style={styles.synthesisText}>
              W3Cはカードについて定めていません。<strong>articleロール(独立した構成をなす領域)</strong>は、カードの内容が単独でも意味を持つ記事・投稿などの場合に使える<strong>一つの例</strong>です(AI解釈)。単なるレイアウトの入れ物や操作のまとまりなら、内容に合う別のHTMLを選びます。また、<strong>カード全体を押せるようにするなら、中に別のボタンやリンクを入れ子にしない</strong>のが安全です(支援技術で正しく扱えないため)。これは、NN groupが定義する「完全な情報ではなく詳細への入り口となる要約」という性質と、意味的に近い関係にあります。
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
            <a href="/components/containment/list" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>リスト ↗</div>
              <div style={styles.linkCardDesc}>検索・比較に適した縦並びの項目群との使い分けはこちら</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["情報の整理・一覧"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(W3C・NN group・Googleは本文確認済み。Appleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはBoxesページ(「カード」に完全一致する専用コンポーネントは見当たらないため近似概念)、GoogleはCardsページへのリンクです。WCAGはWAI-ARIA仕様のarticleロール定義、NN groupは記事ページ単位です。
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
