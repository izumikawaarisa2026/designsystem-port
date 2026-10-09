import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「ファウンデーションの思想比較」ページ(メタページ)。
 *
 * このページの位置づけ: 個別のトークン(カラー・タイポグラフィ等)の数値比較ではなく、
 * 「Foundations(ファウンデーション)として何を扱うか」という分類方法そのものが
 * 4系列で違う、という構造の違いを扱う概要ページ。本サイトが採用している15項目の
 * 「トークン/ファウンデーション」という括り自体が、主にApple・Googleの実際のドキュメント
 * 構成を参考にした編集上の判断であり、W3C・NN groupはそもそもこの括り方をしていない
 * ため、その齟齬を正直に扱う。
 *
 * 最大の発見: Google(Material Design 3)は「Foundations」と「Styles」を明確に別の
 * トップレベルセクションとして分離しており、色・タイポグラフィ・シェイプ・モーションは
 * 「Styles」側に属する(m3.material.io/stylesで確認)。「Foundations」側にはAccessible
 * design・Adaptive design・Content design・Customizing Material・Design tokens・
 * Usabilityなど、機能横断的なルール・考え方が集められている(m3.material.io/foundations
 * で確認)。つまり本サイトの「トークン/ファウンデーション」という1つの括りは、Googleの
 * 実際の区分では「Foundations」と「Styles」という2つの異なるセクションにまたがっている。
 *
 * Apple(HIG)はFoundations配下にAccessibility・Color・Typography・Motion・Layoutなど
 * 個別トピックを並列に配置しており(developer.apple.com/design/human-interface-
 * guidelines/foundations/配下の各ページを検索結果で確認)、Googleのような
 * Foundations/Stylesの二分はしていない。
 *
 * W3C(WCAG)はそもそも「Foundations」という概念を持たず、最も近い構造的な等価物は
 * 知覚可能・操作可能・理解可能・堅牢というPOUR4原則とその配下のガイドライン群である。
 * Nielsen Norman Groupも構造化されたデザインシステムではなく記事・調査ベースのため、
 * 「Foundations」に相当する固定のカテゴリ構造は持たない。
 *
 * Apple(HIG)はページデータ(JSON)を直接取得し、トップレベルの6区分(Getting started /
 * Foundations / Patterns / Components / Inputs / Technologies)と、Foundations配下の18
 * トピックを確認済み(2026-09)。Google(M3)はm3.material.ioのsitemap.xml(静的XML)を
 * 直接取得し、Foundations / Styles / Components / Developの区分と配下のURLを確認済み
 * (2026-09。各ページの本文はSPAのため未取得)。
 *
 * 追加の発見(2026-09): AppleはFoundationsと並列に、Patterns(よくある操作・体験の流れ)・
 * Inputs(入力手段)・Technologies(Apple固有の技術)という区分を持ち、設計原則(Design
 * principles)はFoundationsではなくGetting startedの中にある。Googleは原則を
 * Foundationsの中(foundations/overview/principles)に置いており、「原則をどこに置くか」
 * 自体が2系列で違う。W3C・NN groupについては、両者の性質(適合基準の集合か、
 * 記事ベースの調査発信か)は本サイトの他の全ページで一貫して確認済みの前提を踏まえた
 * ものであり、本ページで新たに一次情報を取得したものではない。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    color: "#C2542A",
    categories: ["Accessibility", "App icons", "Branding", "Color", "Dark Mode", "Icons", "Images", "Immersive experiences", "Inclusion", "Layout", "Materials", "Motion", "Privacy", "Right to left", "SF Symbols", "Spatial layout", "Typography", "Writing"],
    summary: "Foundations配下に18トピックを区別せず並列に配置。Foundationsと並列にPatterns・Inputs・Technologiesなどの区分がある",
    stance:
      "HIGのFoundationsには、Accessibility・Color・Typography・Layout・Writingなど18のトピックが、「視覚トークンか機能横断ルールか」という区別なく、アルファベット順に同じ階層で並んでいます。Googleのような「Foundations」と「Styles」の二分はありません。一方でHIG全体は6つの区分に分かれており、Foundationsの外に、よくある操作の流れを扱うPatterns、入力手段を扱うInputs、Apple固有の技術を扱うTechnologiesが並列に置かれています(ページデータを直接確認、2026-09)。",
    structuralNote: "本サイトの「トークン/ファウンデーション」15項目は、AppleのFoundations(色・文字・レイアウト等)とInputs(入力方法・ジェスチャー、キーボード)の2区分にまたがる。また「ローディング」「モーダル」のようなAppleのPatternsの一部は、本サイトではコンポーネントページ側で扱っている。",
    accessibilityNote: "AccessibilityはFoundationsの1トピックとして扱われており、他の視覚トークン(Color・Typography等)と同格に並ぶ。「横断的な前提条件」というより「並列の1トピック」という位置づけに近い。",
    url: "https://developer.apple.com/design/human-interface-guidelines/foundations",
    urlSecondary: [{ label: "Design principles(Getting started)", url: "https://developer.apple.com/design/human-interface-guidelines/design-principles" }],
    confirmedNote: "HIGのページデータを直接取得し、トップレベルの6区分とFoundations配下の18トピックを確認済み(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start", padding: "8px 10px" }}>
        {["Accessibility", "Color", "Typography", "Layout", "Writing"].map((t) => (
          <span key={t} style={{ fontSize: 9.5, fontFamily: "'IBM Plex Mono', monospace", color: "#C2542A", background: "#F8F0EC", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
        ))}
      </div>
    ),
    illustrationNote: "Foundations配下に18トピックを並列配置(5つを抜粋。概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    color: "#2F7D6E",
    categories: ["Foundations: Overview(原則・支援技術)/ Building for all / Content design / Customization / Design tokens / Designing(色のコントラスト等)/ Interaction / Layout / Usability / Writing / Watches / XR", "Styles: Color / Elevation / Icons / Motion / Shape / Spacing / Typography"],
    summary: "「Foundations」と「Styles」を明確に別セクションとして分離。色・タイポグラフィ等はStyles側",
    stance:
      "Material Design 3のサイトは、Foundations・Styles・Components・Develop(実装)という区分に分かれています。Foundationsには原則・アクセシビリティ・レイアウト・操作(Interaction)・文章など機能横断的な考え方が集められ、色・タイポグラフィ・シェイプ・モーション・エレベーション・アイコン・余白といった視覚的なトークンはStylesに属します。設計原則(principles)もFoundationsの中(Overview配下)に置かれています(サイトのsitemap.xmlでURL構成を直接確認、2026-09)。",
    structuralNote: "本サイトの「トークン/ファウンデーション」という1つの括りは、Googleの実際の区分ではFoundationsとStylesという2つの異なるセクションにまたがっている。つまり本サイトはGoogleの構造をそのまま踏襲してはいない。レイアウトはStylesではなくFoundations側にある点にも注意。",
    accessibilityNote: "アクセシビリティはFoundations側の複数の区分(Overviewの支援技術、Building for all、Designingの色のコントラストなど)に分かれて置かれており、1トピックというより横断的な前提条件としての位置づけに近い。",
    url: "https://m3.material.io/foundations",
    urlSecondary: [{ label: "Styles", url: "https://m3.material.io/styles" }],
    confirmedNote: "区分とトピックは、m3.material.ioのsitemap.xml(静的なXML)でURL構成を直接確認(2026-09)。トピック名はURL上の区分名で、各ページの本文はSPAのため直接確認はできていません。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "8px 10px" }}>
        <div style={{ fontSize: 8.5, fontFamily: "'IBM Plex Mono', monospace", color: "#565D8A" }}>Foundations</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {["Principles", "Layout", "Interaction", "Tokens"].map((t) => (
            <span key={t} style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", color: "#2F7D6E", background: "#EAF3F0", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize: 8.5, fontFamily: "'IBM Plex Mono', monospace", color: "#565D8A", marginTop: 2 }}>Styles</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {["Color", "Typography", "Shape", "Motion"].map((t) => (
            <span key={t} style={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", color: "#2F7D6E", background: "#EAF3F0", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
          ))}
        </div>
      </div>
    ),
    illustrationNote: "FoundationsとStylesが別セクション(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    color: "#A3821F",
    categories: ["知覚可能(Perceivable)", "操作可能(Operable)", "理解可能(Understandable)", "堅牢(Robust)"],
    summary: "「Foundations」に相当する概念自体を持たない。最も近い構造はPOUR4原則",
    stance:
      "WCAGは「Foundations」という括りを持たず、達成基準は知覚可能・操作可能・理解可能・堅牢というPOURの4原則の下にガイドライン・達成基準という階層で整理されています。本サイトの各コンポーネントページの「アクセシビリティ」欄がこのPOUR分類を一貫して参照しているのは、この構造に基づいています。",
    structuralNote: "本サイトの「トークン/ファウンデーション」15項目に対応するW3C側の構造は存在しない。強いて対応させるなら、各項目に関連するWCAG達成基準が個別に分散して存在するのみで、Apple・Googleのような「ファウンデーション」という独立した文書体系はない。",
    accessibilityNote: "WCAGにとってはアクセシビリティが文書全体の目的そのものであり、「Foundationsの中の1トピック」という位置づけ自体が成立しない。",
    url: "https://www.w3.org/WAI/WCAG22/quickref/",
    confirmedNote: "POURの4原則によるWCAG全体の構造は、本サイトの他の全コンポーネントページで一貫して参照している前提であり、既に確認済みのものです。本ページで新たに一次情報を取得したものではありません。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, padding: "8px 10px" }}>
        {["知覚可能", "操作可能", "理解可能", "堅牢"].map((t) => (
          <span key={t} style={{ fontSize: 9.5, fontFamily: "'IBM Plex Mono', monospace", color: "#A3821F", background: "#F5F0DF", padding: "2px 6px", borderRadius: 3 }}>{t}</span>
        ))}
      </div>
    ),
    illustrationNote: "POUR4原則(概念図・系列識別色)",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    color: "#7A4F7E",
    categories: ["(固定カテゴリなし。記事・調査単位)"],
    summary: "構造化されたデザインシステムではなく記事・調査ベースのため、固定の「Foundations」カテゴリを持たない",
    stance:
      "Nielsen Norman GroupはApple・Googleのような実装者向けデザインシステムではなく、ユーザビリティ調査に基づく記事・レポートの集合体です。「Foundations」に相当する固定のカテゴリ構造や網羅的な索引は持たず、トピックごとに独立した記事が随時公開される形式です。",
    structuralNote: "NN groupに専用の記事がないトピックは、各トークンページのNN group欄に「専用記事なし」と書いている。",
    accessibilityNote: "アクセシビリティ単体の記事群はあるが、Foundations的な包括的体系としては提示されていない。",
    url: "https://www.nngroup.com/articles/",
    confirmedNote: "NN groupが記事ベースで固定カテゴリ構造を持たないという性質は、本サイトの他の全ページで一貫して確認済みの前提であり、本ページで新たに一次情報を取得したものではありません。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, padding: "8px 10px", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <span style={{ fontSize: 9.5, fontFamily: "'IBM Plex Mono', monospace", color: "#7A4F7E" }}>記事単位(索引なし)</span>
      </div>
    ),
    illustrationNote: "固定カテゴリなし(概念図・系列識別色)",
  },
];

/*
 * Foundationsと並列の区分(トップレベル構成)。
 * Apple: HIGのページデータ(human-interface-guidelines.json と各区分のJSON)で確認。
 * Google: m3.material.io/sitemap.xml のURL構成で確認(get-startedはブログ記事のみで、区分としては存在しない)。
 */
const LAYERS = [
  {
    key: "principles",
    label: "思想(原則)",
    site: "思想レイヤー",
    apple: { name: "Getting started", sub: "Design principles(8原則)+各プラットフォームの設計概要" },
    google: { name: "Foundations の中", sub: "Overview › Principles。原則がFoundationsの一部", inside: true },
  },
  {
    key: "foundations",
    label: "基礎",
    site: "トークン/ファウンデーション",
    apple: { name: "Foundations", sub: "色・文字・レイアウト・アクセシビリティなど18トピック", highlight: true },
    google: { name: "Foundations + Styles", sub: "考え方はFoundations、視覚トークンはStylesに二分", highlight: true },
  },
  {
    key: "inputs",
    label: "入力手段",
    site: "トークン/インタラクション(入力方法・キーボード)",
    apple: { name: "Inputs", sub: "ジェスチャー・キーボード・ポインター・Apple Pencilなど13トピック" },
    google: { name: "Foundations の中", sub: "Interaction(Gestures / Inputs / Selection / States)", inside: true },
  },
  {
    key: "patterns",
    label: "体験パターン",
    site: "横断ビュー(プロセスタグ)/一部はコンポーネント",
    apple: { name: "Patterns", sub: "ローディング・オンボーディング・フィードバック・モーダルなど25トピック" },
    google: { name: "独立した区分なし", sub: "該当する内容はFoundationsやComponentsに分散", none: true },
  },
  {
    key: "components",
    label: "部品",
    site: "コンポーネントレイヤー",
    apple: { name: "Components", sub: "8グループ(Content、Menus and actionsなど)" },
    google: { name: "Components", sub: "ボタン・ダイアログなど部品ごとのページ" },
  },
  {
    key: "tech",
    label: "技術・実装",
    site: "対象外",
    apple: { name: "Technologies", sub: "Apple Pay・Siri・CarPlayなどApple固有の技術29トピック" },
    google: { name: "Develop", sub: "Jetpack Compose・MDC Android・Flutter・Web向けの実装情報" },
  },
];

const APPLE_SECTIONS = [
  {
    name: "Getting started",
    role: "設計の出発点。Apple全体の設計原則(Design principles)と、iOS・macOSなどプラットフォームごとの設計の概要をまとめた区分",
    items: "Design principles / Designing for iOS / iPadOS / macOS / tvOS / visionOS / watchOS / games など9ページ",
    site: "思想レイヤー(「原則比較」ページのApple欄はここのDesign principles)",
  },
  {
    name: "Foundations",
    role: "どの画面・部品にも共通する、見た目と体験の基礎要素",
    items: "Accessibility / Color / Dark Mode / Layout / Materials / Motion / Typography / Writing など18トピック",
    site: "トークン/ファウンデーションレイヤー",
  },
  {
    name: "Patterns",
    role: "ユーザーのよくある操作や体験の流れ(複数の部品にまたがる手順)の設計指針",
    items: "Loading / Onboarding / Feedback / Modality / Searching / Settings / Undo and redo など25トピック",
    site: "横断ビュー(プロセスタグ)の考え方に近い。一部はコンポーネントページで参照(例: 空状態・ローディング状態=Loading、フルスクリーンダイアログ=Modality)",
  },
  {
    name: "Inputs",
    role: "人がアプリを操作・入力するための手段ごとの設計指針",
    items: "Gestures / Keyboards / Pointing devices / Apple Pencil and Scribble / Focus and selection / Game controls など13トピック",
    site: "トークン/ファウンデーションレイヤーの「入力方法・ジェスチャー」「キーボードナビゲーション」(Appleでは Foundations とは別区分)",
  },
  {
    name: "Components",
    role: "システムが用意する部品の使い方とカスタマイズ",
    items: "Content / Layout and organization / Menus and actions / Navigation and search / Presentation / Selection and input / Status / System experiences の8グループ",
    site: "コンポーネントレイヤー",
  },
  {
    name: "Technologies",
    role: "アプリに組み込めるApple固有の技術・機能・サービス",
    items: "Apple Pay / Siri / CarPlay / HealthKit / Sign in with Apple / VoiceOver など29トピック",
    site: "対象外(他の3系列と比較できる共通の対象がないプラットフォーム機能のため)",
  },
];

function LayerBox({ cell, color }) {
  const base = { borderRadius: 4, padding: "7px 9px", minWidth: 0, textAlign: "left" };
  const style = cell.none
    ? { ...base, border: "1px dashed #D5D9EC", background: "#FFFFFF" }
    : cell.inside
      ? { ...base, border: `1px dashed ${color}`, background: "#FFFFFF" }
      : { ...base, border: `1px solid ${color}`, background: cell.highlight ? color : "#FFFFFF" };
  const nameColor = cell.none ? "#9EA4C4" : cell.highlight ? "#FFFFFF" : color;
  const subColor = cell.highlight ? "#FFFFFF" : cell.none ? "#9EA4C4" : "#454C78";
  return (
    <div style={style}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, color: nameColor }}>{cell.name}</div>
      <div style={{ fontSize: 10.5, lineHeight: 1.5, color: subColor, marginTop: 2 }}>{cell.sub}</div>
    </div>
  );
}

function LayerDiagram() {
  return (
    <div style={styles.layerGrid}>
      <div style={styles.layerHead} />
      <div style={{ ...styles.layerHead, color: "#C2542A" }}>Apple(HIG)</div>
      <div style={{ ...styles.layerHead, color: "#2F7D6E" }}>Google(M3)</div>
      {LAYERS.map((l) => (
        <React.Fragment key={l.key}>
          <div style={styles.layerLabel}>
            <div style={{ fontWeight: 700, color: "#171B36" }}>{l.label}</div>
            <div style={{ fontSize: 9.5, color: "#7E86AC", marginTop: 2 }}>本サイト: {l.site}</div>
          </div>
          <LayerBox cell={l.apple} color="#C2542A" />
          <LayerBox cell={l.google} color="#2F7D6E" />
        </React.Fragment>
      ))}
    </div>
  );
}

function CategoryList({ items }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={styles.useCaseItem}>{it}</li>))}
    </ul>
  );
}

function InfoBox({ label, accent, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent ? { borderLeftColor: accent } : {}) }}>
      <span style={styles.exceptionLabel}>{label}</span>
      <div style={styles.exceptionText}>{children}</div>
    </div>
  );
}

export default function TokensOverviewPage() {
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
        <SidebarNav currentPath="/tokens/overview" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / ファウンデーションの思想比較</span>
            <span>SPEC No. 041</span>
          </div>

          <h1 style={styles.title}>ファウンデーションの思想比較</h1>
          <p style={styles.subtitle}>個別のトークン(カラー・タイポグラフィ等)の数値比較の前に、「Foundations(ファウンデーション)として何を扱うか」という分類方法自体が4系列でどう違うかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>4系列の「Foundations」の括り方(概念図)</span>
            <div style={styles.categoryPreviewRow}>
              {SOURCES.map((s) => (
                <div key={s.key} style={styles.categoryPreviewItem}>
                  <div style={{ ...styles.categoryPreviewName, color: s.color }}>{s.name}</div>
                  {s.illustration()}
                </div>
              ))}
            </div>
            <p style={styles.swatchNote}>4系列とも「Foundations」という言葉、あるいはそれに近い括りは持つが、実際にそこに何を含めるかの範囲・粒度は大きく異なる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              以降の各トークンページ(カラー・タイポグラフィ等)を読む際は、<strong>「4系列が同じ棚に同じものを並べている」という前提を持たない</strong>ことが重要です(理由は以下のとおり)。この比較サイトの15項目という区切り方自体が、Apple・Googleの実際の構成を主な参考にした編集上の判断であることを踏まえて読んでください。
            </p>
            <p style={styles.synthesisText}>
              最大の発見は、<strong>Google(Material Design 3)が「Foundations」と「Styles」を明確に別のトップレベルセクションとして分離している</strong>ことです。色・タイポグラフィ・シェイプ・モーションといった視覚的なトークンはStyles側に属し、Foundations側にはAccessible design・Adaptive design・Content design・Design tokensなど機能横断的な考え方が集められています。<strong>本サイトの「トークン/ファウンデーション」という1つの括りは、Googleの実際の区分ではFoundationsとStylesという2つの異なるセクションにまたがっている</strong>ことになります。
            </p>
            <p style={styles.synthesisText}>
              一方Appleは、AccessibilityもColorもTypographyもWritingも、Foundations配下の18トピックとして区別なく並べており、Googleのような二分はしていません。ただしAppleは<strong>Foundationsの外に、Patterns(よくある操作の流れ)・Inputs(入力手段)・Technologies(Apple固有の技術)を並列の区分として持ち、設計原則(Design principles)もFoundationsではなくGetting startedに置いています</strong>。Googleは原則もFoundationsの中に置いているため、<strong>「原則」「入力」「体験パターン」を基礎と同じ箱に入れるか、別の箱に分けるか</strong>が2系列の構造上の違いです(下部の「Foundationsと並列の区分」参照)。
            </p>
            <p style={styles.synthesisText}>
              W3C(WCAG)は「Foundations」という概念自体を持たず、<strong>最も近い構造的な等価物は知覚可能・操作可能・理解可能・堅牢というPOURの4原則</strong>です。Nielsen Norman Groupは構造化されたデザインシステムではないため、対応する固定カテゴリを持ちません。<strong>この2系列は「Foundations」という枠組みそのものに当てはめようとすること自体が、そもそも無理があります。</strong>
            </p>
          </div>

          <div className="dsp-mobile-only" style={styles.sourceList}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={styles.sourceName}>{s.name}</div>
                  </div>
                </div>
                <div style={styles.positionBadge}>{s.summary}</div>
                <InfoBox label="含まれる主なトピック"><CategoryList items={s.categories} /></InfoBox>
                <p style={styles.sourceStance}>{s.stance}</p>
                <InfoBox label="本サイトの分類との関係">{s.structuralNote}</InfoBox>
                <InfoBox label="アクセシビリティの位置づけ">{s.accessibilityNote}</InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                <div style={styles.sourceFootRow}>
                  <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
                </div>
                {s.urlSecondary && (
                  <div style={styles.secondaryLinks}>
                    {s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>{sl.label} ↗</a>
                    ))}
                  </div>
                )}
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
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.summary}</div>))}
                <div style={styles.labelCell}>概念図</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration()}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>含まれる主なトピック</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><CategoryList items={s.categories} /></div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>))}
                <div style={styles.labelCell}>本サイトの分類との関係</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.structuralNote}</div>))}
                <div style={styles.labelCell}>アクセシビリティの位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.accessibilityNote}</div>))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section style={styles.parallelSection}>
            <h2 style={styles.diagramTitle}>Foundationsと並列の区分 ― Appleのトップレベル構成</h2>
            <p style={styles.sectionLead}>
              AppleのHIGは、Foundationsのほかに<strong>Getting started・Patterns・Inputs・Components・Technologies</strong>という区分を並列に持っています。中でも、設計原則(Design principles)がFoundationsではなくGetting startedに置かれている点と、入力手段(Inputs)と体験の流れ(Patterns)がFoundationsから独立している点が、Googleとの大きな違いです。
            </p>

            <div style={styles.swatchCard}>
              <span style={styles.swatchLabel}>Apple・Googleの区分の対応と、本サイトでの位置づけ(概念図)</span>
              <LayerDiagram />
              <p style={{ ...styles.swatchNote, textAlign: "left" }}>塗りつぶしの枠=各系列の「Foundations」本体。点線の枠=独立した区分ではなく、別の区分の中に含まれている内容。「本サイト」は、その内容を本サイトのどの層で扱っているかを示す。W3C・NN groupはこうした区分自体を持たないため図から除外している。</p>
            </div>

            <div style={styles.parallelList}>
              {APPLE_SECTIONS.map((sec) => (
                <div key={sec.name} style={{ ...styles.parallelCard, ...(sec.name === "Foundations" ? styles.parallelCardActive : {}) }}>
                  <div style={styles.parallelName}>{sec.name}</div>
                  <p style={styles.parallelRole}>{sec.role}</p>
                  <InfoBox label="主な中身">{sec.items}</InfoBox>
                  <InfoBox label="本サイトでの位置づけ" accent="#3C5A73">{sec.site}</InfoBox>
                </div>
              ))}
            </div>
            <p style={styles.confirmedNote}>HIGのページデータ(トップページと6区分それぞれのJSON)を直接取得して確認(2026-09)。Googleの対応はm3.material.ioのsitemap.xmlのURL構成で確認。</p>
          </section>

          <div style={styles.tagsRow}>
                        {["設計の原則・使い分け", "デザインの基礎"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(AppleはHIGのページデータ、Googleはsitemap.xmlで区分を直接確認。W3C・NN groupの性質は本サイトの他ページで確認済みの前提を踏襲)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはFoundationsのトップページとDesign principlesのページ、GoogleはFoundations・Styles両方のトップページへのリンクです。W3CはWCAGクイックリファレンス、NN groupは記事一覧ページへのリンクです。
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
  categoryPreviewRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 },
  categoryPreviewItem: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, minWidth: 140, textAlign: "left" },
  categoryPreviewName: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px 0" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  positionBadge: { display: "inline-block", marginTop: 8, marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  secondaryLinks: { display: "flex", flexDirection: "column", gap: 4, marginTop: 6 },
  illustrationNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.4 },
  matrixScroll: { overflowX: "auto", marginBottom: 20 },
  matrixGrid: { display: "grid", gridTemplateColumns: "150px repeat(4, 1fr)", minWidth: 760, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  exceptionCell: { background: "#F8F9FD" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
  parallelSection: { marginBottom: 26 },
  sectionLead: { fontSize: 13, lineHeight: 1.8, color: "#2E3457", margin: "0 0 14px" },
  layerGrid: { display: "grid", gridTemplateColumns: "minmax(78px, 0.8fr) 1fr 1fr", gap: 6, alignItems: "stretch" },
  layerHead: { fontSize: 11.5, fontWeight: 700, textAlign: "left", padding: "0 2px 2px" },
  layerLabel: { fontSize: 11, lineHeight: 1.4, textAlign: "left", padding: "6px 4px 6px 0", borderTop: "1px solid #E1E3F0" },
  parallelList: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10, marginBottom: 8 },
  parallelCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "12px 14px" },
  parallelCardActive: { borderColor: "#C2542A" },
  parallelName: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: "#C2542A" },
  parallelRole: { fontSize: 12, lineHeight: 1.65, color: "#2E3457", margin: "6px 0 8px" },
};
