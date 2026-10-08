import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Actions / リンク」ページ。
 * ボタン(タップ領域)と違い、リンクには「単一の数値基準」がないため、
 * データモデルの「基準値」欄は系列ごとの位置づけの説明に置き換えている。
 * 「四サイト比較図」も許容レンジ図ではなく、各系列が何を求めているかの
 * 要求ポイント比較表に置き換えた(CLAUDE.mdの「都度判断してよい」方針に基づく)。
 *
 * Apple / W3C / Nielsen Norman Group は一次情報を直接取得して確認済み(2026-09)。
 * Material Design 3 は独立した「リンク」コンポーネントページが存在しないことを
 * サイトマップで確認済みだが、近接する内容(状態管理・ライティング)は未確認。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines",
    color: "#C2542A",
    position: "文言による目的の明確化(数値基準なし)",
    stance:
      "独立した「リンク」ページは持たず、ライティングとアクセシビリティの各ページに分けて言及している。リンクのラベルには動詞を使い、「ここをタップ」のような曖昧な文言を避け、「◯◯について詳しく見る」のように具体的な行き先や機能を示す言葉を使うべきとしている。",
    exceptions:
      "色による区別についても直接のリンク基準ではなく、アクセシビリティ全般の方針として「色だけに頼らず、形やアイコンなど視覚的な手がかりを追加する」ことを求めている。数値的な例外規定はない。",
    pourDetail: "理解可能(Understandable) ― リンク単体で目的が伝わる文言を求める点は、WCAGのPOUR原則のうち「理解可能」に対応する。",
    searchHint: "avoid using \"Click here\"",
    url: "https://developer.apple.com/design/human-interface-guidelines/writing#Best-practices",
    colorCue: { mark: "○", note: "推奨(下線やアイコンなど視覚的な手がかりを追加)" },
    wordingCue: { mark: "○", note: "推奨(具体的な行き先を示す文言。数値基準はなし)" },
    visitedCue: { mark: "―", note: "明記なし" },
    tapArea: { mark: "○", note: "既定44×44pt・最小28×28pt(iOS/iPadOS。全インタラクティブ要素に適用される一般原則で、リンク専用の記載はない。ボタンのページと同じ)" },
    illustration: () => (
      <span style={{ color: "#2F6FED", fontWeight: 600, fontSize: 12 }}>詳しく見る</span>
    ),
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Text button(最も近い相当物)",
    color: "#2F7D6E",
    position: "独立したLinkコンポーネントはなく、「Text button」が最も近い",
    stance:
      "独立した「Link」コンポーネントはない。ただしMaterialには2014年の初代デザイン(当時は「Flat button」)から続く「Text button」という考え方があり、ラベルのみ・枠や塗りの背景を持たない、最も優先度が低いアクションに使う表現として定義されている。ダイアログやカードの中の軽い操作など、見た目の重さを抑えたい場面で使われる。",
    exceptions: "「Text button」はあくまでボタン(操作)の一種であり、文中に埋め込む本来のハイパーリンクとは位置づけが異なる。この点を踏まえ、厳密な意味での「リンク」の独立ガイダンスは見当たらない、という理解が正確。",
    pourDetail: "―(リンク単体を対象にしたアクセシビリティ言及は確認できていない)",
    searchHint: "text-only buttons",
    url: "https://m3.material.io/components/buttons/guidelines",
    urlSecondary: [{ label: "参考: M1 Buttons(Text buttonの由来)", url: "https://m1.material.io/components/buttons.html" }],
    colorCue: { mark: "―", note: "独立した記載なし" },
    wordingCue: { mark: "―", note: "独立した記載なし" },
    visitedCue: { mark: "―", note: "独立した記載なし" },
    tapArea: { mark: "○", note: "48×48dp(Text buttonを含む全インタラクティブ要素の一般原則。リンク専用の記載はない)" },
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <span style={{ display: "inline-block", color: "#2F7D6E", fontWeight: 600, fontSize: 11.5, padding: "6px 4px" }}>詳しく見る</span>
        <span style={{ fontSize: 9, color: "#9EA4C4" }}>(Text button)</span>
      </div>
    ),
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 2.4.4 / 2.4.9 / 1.4.1 / 3.2.4",
    color: "#A3821F",
    position: "レベルA〜AAAにまたがる4つの達成基準",
    stance:
      "2.4.4(レベルA)は、リンクの目的がリンクテキスト単体、またはリンクテキストと周囲の文脈から判別できることを求める。より厳格な2.4.9(レベルAAA)は、リンクテキスト単体だけで目的が分かることを求める。1.4.1(レベルA)は、色だけをリンクの識別手段にしてはならないと規定する。3.2.4(レベルAA)は、ページをまたいで繰り返し出てくる同じ働きの部品を、一貫して識別できるようにすることを求めます。全ページ共通のナビゲーションやフッターのリンクに、ページごとに違う名前を付けないことが基本です。ただし文言が完全に同じである必要はなく、5ページ目から見た「4ページ目」へのリンクを「前のページ」と呼ぶような、文脈に合わせた違いは認められます。",
    exceptions:
      "2.4.4は、リンクの文言だけで、または同じ文・段落などの文脈と合わせて目的が分かればよい。例外は、ページ上の情報だけでは誰にとっても目的が分からないリンク(その場合は求められない)。1.4.1は、色だけでリンクを見分けさせないこと。色だけで区別するなら、周りの文字と3:1以上の明度の差が必要になる(テクニックG183)。いちばん確実なのは下線を付けること。",
    pourDetail: "知覚可能(Perceivable)・操作可能(Operable) ― 1.4.1は「知覚可能」、2.4.4/2.4.9は「操作可能」の中のナビゲーションに関する達成基準として分類される。 3.2.4は「理解可能」の予測可能性(3.2)に分類される。",
    searchHint: "Link Purpose",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
    urlSecondary: [
      { label: "2.4.9 Link Purpose (Link Only)", url: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only.html" },
      { label: "1.4.1 Use of Color", url: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" },
      { label: "3.2.4 Consistent Identification", url: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html" },
    ],
    confirmedNote: "3.2.4はUnderstandingページの本文を直接取得して確認済み(2026-10追記)。",
    colorCue: { mark: "○", note: "必須: 色だけで見分けさせない。色だけで区別するなら、周りの文字と3:1以上の明度差が必要(G183)。いちばん確実なのは下線" },
    wordingCue: { mark: "△", note: "AA=周囲の文脈込みでOK / AAA=リンク単体で目的が分かる文言が必須" },
    visitedCue: { mark: "―", note: "直接の基準なし" },
    tapArea: { mark: "△", note: "24×24px(AA)/44×44px(AAA)。ただし文中に埋め込まれたインラインリンクは例外(ほかにも例外あり。ボタンのページを参照)" },
    illustration: () => (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#3A4FCF", fontWeight: 600, fontSize: 12, textDecoration: "underline" }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#2F7D6E", fontWeight: 700 }}>◯ 適合</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#3A4FCF", fontWeight: 600, fontSize: 12 }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#C0503F", fontWeight: 700 }}>✕ 不適合(色のみ)</span>
        </div>
      </div>
    ),
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Guidelines for Visualizing Links",
    color: "#7A4F7E",
    position: "色+下線による視認性(数値基準ではなく原則としての言及)",
    stance:
      "記事の本文は、リンクだと分かる「見た目上の手がかり」を最大化するには、リンクテキストに色と下線の両方を付けるとよいとしている。また、訪問済みリンクと未訪問リンクは彩度の異なる同系色で区別し、未訪問側をより鮮やかにすることを推奨している。",
    exceptions:
      "ナビゲーションメニューなど、リンクの集まりであることが明確な領域に限り、下線を省略してもよいとする例外がある。ただし赤や緑など色覚異常の影響を受けやすい色を使う場合や、低視力ユーザーへの配慮を優先する場合は、下線を必ず残すべきとしている。2026年3月の編注では、下線は必須ではなく、周りの文字とのコントラストにホバー時・フォーカス時の手がかりを組み合わせれば1.4.1を満たせる(G183)と補足し、記事の見た目の推奨は出発点として扱うよう書いている。なお、現在のW3CのG183(WCAG 2.2版)の確認手順は「周りの文字と3:1以上」の1つだけで、ホバー/フォーカス時の手がかりは以前の版にあった条件。",
    pourDetail: "根拠となる原則 ― POURのような適合区分ではなく、この記事自体がWCAG 1.4.1(色のみによる区別の禁止)を関連基準として明示的に引用している。",
    searchHint: "current usability guidelines for showing textual links",
    url: "https://www.nngroup.com/articles/guidelines-for-visualizing-links/",
    colorCue: { mark: "○", note: "出発点は色+下線(ナビゲーション領域は下線省略可)。編注: 下線は必須ではなく、コントラスト+ホバー/フォーカスの手がかりでもよい" },
    wordingCue: { mark: "―", note: "本記事では直接扱わない" },
    visitedCue: { mark: "○", note: "推奨: 訪問済みは彩度を落とした同系色にする" },
    tapArea: { mark: "―", note: "リンク専用の数値記載なし。一般的なタップ領域の目安は約1cm四方(別記事)" },
    illustration: () => (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#3A4FCF", fontWeight: 600, fontSize: 12, textDecoration: "underline" }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#565D8A" }}>未訪問</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ color: "#8B8FB8", fontWeight: 600, fontSize: 12, textDecoration: "underline" }}>詳しく見る</span>
          <span style={{ fontSize: 9, color: "#565D8A" }}>訪問済み</span>
        </div>
      </div>
    ),
  },
];

const CRITERIA_ROWS = [
  { key: "colorCue", label: "色以外の視覚的手がかり(下線など)" },
  { key: "wordingCue", label: "文言単体で目的が伝わるか" },
  { key: "visitedCue", label: "訪問済み/未訪問の色分け" },
  { key: "tapArea", label: "タップ領域" },
];

function LinkSwatch() {
  return (
    <p style={{ fontSize: 13, lineHeight: 2, color: "#2E3457", margin: 0 }}>
      テキストテキストテキスト<a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#3A4FCF", textDecoration: "underline" }}>リンク</a>テキストテキスト。<a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#8B8FB8", textDecoration: "underline" }}>リンク</a>(訪問済み)
    </p>
  );
}

function CriteriaMark({ cell }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 22,
          padding: "2px 8px",
          borderRadius: 10,
          background: "#FBF0D9",
          color: "#7A4A1F",
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          fontSize: 12,
        }}
      >
        {cell.mark}
      </span>
      <span style={{ fontSize: 10.5, color: "#565D8A", lineHeight: 1.4, maxWidth: 220 }}>{cell.note}</span>
    </div>
  );
}

export default function ActionsLinkPage() {
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
        <SidebarNav currentPath="/components/actions/link" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / リンク</span>
            <span>SPEC No. 003</span>
          </div>

          <h1 style={styles.title}>リンク</h1>
          <p style={styles.subtitle}>4つのガイドラインが、リンクの「見分けやすさ」と「文言」に何を求めているかを比較する</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ</span>
            <LinkSwatch />
            <p style={styles.swatchNote}>色+下線(濃い青=未訪問)と、彩度を落とした色(訪問済み)の組み合わせ例。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              リンクには、ボタンのような<strong>数値の基準がありません</strong>。代わりにApple・WCAG・NN groupは、「色だけに頼らず見分けられるか」と「文言だけで目的が伝わるか」という2つの観点で考え方を示しています。
            </p>
            <p style={styles.synthesisText}>
              Googleには独立した「Link」コンポーネントはなく、<strong>「Text button」(ラベルのみ・枠なしの低優先度ボタン)が最も近い相当物</strong>です。厳密なハイパーリンクとは別物ですが、見た目の軽さという点では近い存在と言えます。
            </p>
            <p style={styles.synthesisText}>
              実務では<strong>色+下線を基本にし、ナビゲーションのように文脈で明らかな場合だけ下線を省く</strong>のが、いちばん確実な着地点です。WCAG 1.4.1は「色だけで見分けさせない」ことを求めていて、色だけで区別するなら周りの文字と3:1以上の明度差が必要です(G183)。Nielsen Norman Groupも2026年の編注で、下線は必須ではなく、コントラストにホバー時・フォーカス時の手がかりを組み合わせる方法もあるとし、記事の見た目の推奨は出発点として扱うよう補足しています。
            </p>
          </div>

          {/* mobile: unified card stack (position + criteria + stance + exceptions + a11y + links, all in one card) */}
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
                {s.illustration && <div style={styles.illustrationBox}>{s.illustration()}</div>}
                <p style={styles.sourceStance}>{s.stance}</p>
                <div style={styles.exceptionBox}>
                  <span style={styles.exceptionLabel}>例外・許容ケース</span>
                  <p style={styles.exceptionText}>{s.exceptions}</p>
                </div>
                <div style={styles.criteriaRowMobile}>
                  {CRITERIA_ROWS.map((row) => (
                    <div key={row.key} style={styles.criteriaChip}>
                      <CriteriaMark cell={s[row.key]} />
                      <span style={styles.criteriaChipLabel}>{row.label}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.pourBox}>
                  <span style={styles.exceptionLabel}>アクセシビリティ(WCAG基準)</span>
                  <p style={styles.exceptionText}>{s.pourDetail}</p>
                </div>
                <div style={styles.sourceFootRow}>
                  {s.searchHint && (
                    <span style={styles.searchHint}>
                      ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span>
                    </span>
                  )}
                  <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>
                    公式ページへ ↗
                  </a>
                </div>
                {s.urlSecondary && (
                  <div style={styles.secondaryLinks}>
                    {s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>
                        {sl.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* desktop: single unified matrix (position + criteria + stance + exceptions + a11y + links) */}
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
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>
                ))}

                <div style={styles.labelCell}>リンクのイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={styles.cell}>{s.illustration ? s.illustration() : null}</div>
                ))}

                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.stance}</div>
                ))}

                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.exceptions}</div>
                ))}

                {CRITERIA_ROWS.map((row) => (
                  <React.Fragment key={row.key}>
                    <div style={styles.labelCell}>{row.label}</div>
                    {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><CriteriaMark cell={s[row.key]} /></div>))}
                  </React.Fragment>
                ))}

                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.pourDetail}</div>
                ))}

                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                    {s.urlSecondary && s.urlSecondary.map((sl) => (
                      <a key={sl.url} href={sl.url} target="_blank" rel="noreferrer" style={styles.link}>{sl.label} ↗</a>
                    ))}
                    {s.searchHint && (
                      <span style={styles.searchHint}>
                        ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p style={styles.diagramNote}>○=明確に求める / △=条件付き / ―=直接の言及なし</p>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "理解可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["ナビゲーション"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: Appleは「Writing」ページ内のBest practicesセクションへのアンカー付きリンクです。WCAGは達成基準ごとのUnderstandingページ(いずれもページ単位で、これ以上細かいアンカーはありません)。NN
              groupは記事ページ単位です。Googleは独立した「Link」ページがないため、最も近い相当物である「Text button」の公式ページ(主リンクはm3.material.ioの最新仕様のButtons。m1.material.ioの旧仕様は、Text buttonの由来を見る参考リンク)へリンクしています。
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
  diagramCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px", marginBottom: 20 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", marginTop: 10, lineHeight: 1.6 },
  criteriaScroll: { overflowX: "auto" },
  criteriaGrid: { display: "grid", gridTemplateColumns: "220px repeat(4, 1fr)", minWidth: 680, border: "1px solid #E1E3F0" },
  criteriaCell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", fontSize: 12, display: "flex", alignItems: "center" },
  criteriaHeaderCell: { fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 12.5, background: "#F8F9FD" },
  criteriaLabelCell: { color: "#2E3457", lineHeight: 1.5 },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "10px 0" },
  criteriaRowMobile: { display: "flex", flexWrap: "wrap", gap: 8, margin: "10px 0" },
  criteriaChip: { display: "flex", alignItems: "center", gap: 5, background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 4, padding: "4px 8px" },
  criteriaChipLabel: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.3, maxWidth: 130 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  exceptionBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  pourBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
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
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
