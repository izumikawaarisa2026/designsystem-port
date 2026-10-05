import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Text inputs / テキストフィールド」ページ。
 *
 * W3C(WCAG 3.3.2 Labels or Instructions)は公式ページ本文を直接取得して確認済み
 * (2026-09)。Nielsen Norman Groupは「プレースホルダーをラベル代わりにするのは有害」
 * という記事本文を検索結果の要約で確認(2026-09、記事本文の直接取得は未実施のため
 * pending扱い)。Apple(HIG)・Google(Material Design 3)は公式サイトがクライアント側
 * レンダリングのSPAで本文を直接取得できなかったため、検索結果による間接確認(2026-09)。
 *
 * 2026-09 追記: ユーザーから「テキストエリア(複数行入力)のページが欲しい」という
 * フィードバックを受け、独立ページではなくこの「テキストフィールド」ページ内に
 * 「テキストエリアとの違い」セクションとして統合した(ユーザー確認済み)。W3C
 * (MDNのaria-multiline属性解説)・Nielsen Norman Group(「Few Guesses, More Success」
 * ―フォームの認知負荷に関する記事)は本文を直接取得して確認済み(2026-09)。Apple
 * (HIG Text views)・Google(Material Design 3 Text fieldsの複数行バリアント)は
 * 公式サイトがSPAのため検索結果による間接確認(2026-09)。
 *
 * 2026-09 追記2: ユーザーから「テキストエリアが入っているとのことだったが分かりにくい、
 * 2項目が混在していることが分かるようにしてほしい」というフィードバックを受け、
 * (1)パンくず・タイトル・サブタイトルに「テキストフィールド・テキストエリア」の
 * 両方を明記、(2)本文を「①テキストフィールド」「②テキストエリア」の2セクションに
 * 明確に分離(以前は①のAI解釈と四系列比較の間にテキストエリアの内容が挟まっており、
 * 1トピックのように見えてしまっていた)、(3)②の直前に点線の区切りと説明文を追加、
 * という3点を修正した。
 *
 * 2026-09 追記3: ユーザーから「②テキストエリアも、PC版で4系列を表で横並びに
 * 見られるようにしてほしい」というフィードバックを受け、TextareaNotesをモバイル
 * (カードのグリッド、dsp-mobile-only)とデスクトップ(①と同じmatrixGridパターンの
 * 表、dsp-desktop-only)に分割した。デスクトップ版の行は「位置づけ」「基本方針」
 * 「確認状況」「リンク」の4行で、①の四系列比較表と統一感のある見た目にしている。
 *
 * 2026-09 追記4: ユーザーから「コンポーネントイメージにはテキストフィールド、
 * テキストエリア両方のイメージを書いてほしい」というフィードバックを受け、
 * 冒頭の「コンポーネントイメージ」ボックスにTextareaSwatchを追加し、
 * TextFieldSwatchと横並びで両方表示するようにした(①②それぞれにキャプション付き)。
 * あわせて、プレビューがPC幅でもモバイル向けカードグリッドが混在して見える
 * という指摘を受け、ビルド成果物の取り違えの可能性を排除するため、現在の
 * ソースから作り直した単独プレビューを再公開した(コード側のdsp-mobile-only/
 * dsp-desktop-onlyの切り替えロジック自体に変更はない)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Text fields",
    color: "#C2542A",
    position: "1行(または複数行)のテキストを入力・編集させる標準コントロール",
    size: "具体的なpt数値は確認できていません。他のタップ可能要素と同じ最小44×44ptのヒットターゲット基準が適用されると考えられます。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "テキストフィールドは、1行のテキストを入力・編集できる矩形の領域だとされています。プレースホルダーテキストを使って、フィールドが空のときに入力例や短い説明を示せるとしていますが、検索結果からは、それ自体がラベルの代わりになるとは明記されていません(検索結果による確認、2026-09)。",
    exceptions:
      "確認中。エラー表示やヘルパーテキストの扱いについての詳細な基準は公式ページ本文で未確認です。",
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "1行のテキストを入力・編集させる",
      "プレースホルダーテキストで入力例や短い説明を示す(ラベルの代わりにはしない)",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/text-fields",
    confirmedNote: "公式ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    pending: true,
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <rect x="1" y="1" width="138" height="24" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="10" y="17" fontSize="10" fill="#9EA4C4" fontFamily="Jost, Noto Sans JP">example@mail.com</text>
      </svg>
    ),
    illustrationNote: "枠線+プレースホルダーの標準的なテキストフィールド(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Text fields(Filled / Outlined)",
    color: "#2F7D6E",
    position: "Filled(塗りつぶし)とOutlined(枠線)の2種類。フローティングラベル+サポートテキスト/エラーテキストの構造を持つ",
    size: "具体的な高さのdp数値は確認できていません。一般的なタッチターゲット基準(48×48dp)が適用されると考えられます(検索結果による確認)。",
    colorInfo: "確認中。カラートークンの詳細は公式ページ本文で未確認です。",
    glossary: [
      { term: "フローティングラベル", desc: "入力欄の中に表示され、フォーカス時や入力時に上に移動して常に見える状態になるラベル。何も入力していない状態でも入力欄の中に「今何を求められているか」を示す。" },
      { term: "サポートテキスト / エラーテキスト", desc: "入力欄の下に表示される補足情報。入力の使われ方などを説明するサポートテキストは、検証エラー時にはエラーテキストに置き換えられる。両方表示する場合はサポートテキストを先に、エラーテキストを後に読み上げるべきとされる。" },
    ],
    stance:
      "Filledテキストフィールドは視覚的な主張が強く、周囲のコンテンツやコンポーネントの中で目立たせたい場合に向くとされています。Outlinedテキストフィールドは主張が弱く、フォームのように多数のテキストフィールドを並べる場面でレイアウトを簡潔に見せるのに役立つとされています。フローティングラベルは入力欄と揃って配置され、常に表示され続け、フォーカス時や入力時に浮き上がるとされています(検索結果による確認、2026-09)。",
    exceptions:
      "サポートテキストとエラーテキストの両方を表示する場合、アクセシビリティ上はサポートテキストを先に、エラーテキストを後に読み上げる構成にすべきとされています。エラーメッセージには「alert」ロールを与えるべきとされています。",
    accessibility:
      "操作可能(Operable) ― 一般的なタッチターゲット基準(48×48dp)が適用されると考えられます(直接確認はできていません)。エラーメッセージには「alert」ロールを与えるべきとされています。",
    useCases: [
      "周囲で目立たせたい単独のフィールドにはFilledを使う",
      "フォームなど多数のフィールドを並べる場合はOutlinedを使う",
      "検証エラー時はサポートテキストをエラーテキストに置き換える",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/text-fields/guidelines",
    urlSecondary: [{ label: "Accessibility", url: "https://m3.material.io/components/text-fields/accessibility" }],
    confirmedNote: "Filled/Outlinedの区分・フローティングラベル・サポート/エラーテキストの構造は検索結果による確認(2026-09)。m3.material.io本文はSPAのため直接確認はできていません。",
    pending: true,
    illustration: () => (
      <svg width="140" height="30" viewBox="0 0 140 30">
        <rect x="1" y="6" width="138" height="22" rx="4" fill="none" stroke="#2F7D6E" strokeWidth="1.6" />
        <rect x="10" y="0" width="42" height="10" fill="#FFFFFF" />
        <text x="12" y="8" fontSize="8" fill="#2F7D6E" fontFamily="Jost, Noto Sans JP">メールアドレス</text>
        <text x="12" y="22" fontSize="9.5" fill="#171B36" fontFamily="Jost, Noto Sans JP">taro@example.com</text>
      </svg>
    ),
    illustrationNote: "Outlined + フローティングラベル(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 3.3.2 Labels or Instructions / 1.3.5 / 4.1.2",
    color: "#A3821F",
    position: "入力を求めるコンテンツには、目に見えるラベルまたは説明を提供することを要求(レベルA)",
    size: "テキストフィールド専用の数値基準はありませんが、一般的なターゲットサイズ基準(2.5.8/2.5.5)は関連する操作要素(送信ボタンなど)に適用されます。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、入力欄の境界線やフォーカス状態を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    stance:
      "入力を求めるコンテンツには、必須かどうかを問わず、目に見えるラベルまたは説明を提供しなければならないとしています。この基準は、コントロールとラベルのマークアップ上の関連付け(1.3.1)や、支援技術だけに伝わる名前(4.1.2)とは異なり、「全てのユーザーに見える形」であることを重視しています。ラベルは全ユーザーに提示されるのに対し、名前(name)は支援技術によってのみ露出される場合がある、という区別が明記されています。",
    exceptions:
      "プレースホルダーテキストやARIAだけによるラベル付けは、この基準を満たすには不十分だとしています。目的は、ユーザーが過度な混乱なくタスクを完了できるだけの情報を提供することで、データ形式・入力例・必須項目の明示などが必要に応じて求められます。",
    accessibility:
      "知覚可能(Perceivable) ― 3.3.2はPOUR原則のうち「知覚可能」に対応します。1.3.1(情報と関係性)・4.1.2(名前・役割・値)と合わせて、ラベルの「見え方」「マークアップ」「支援技術への伝達」という3つの異なる側面を別々の基準でカバーしています。",
    useCases: [
      "全ての入力欄に目に見えるラベルを付ける(必須・任意を問わない)",
      "プレースホルダーやARIAラベルだけに頼らない",
      "データ形式・入力例・必須項目の明示など、必要な補足情報を添える",
    ],
    searchHint: "undue confusion",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="140" height="30" viewBox="0 0 140 30">
          <text x="0" y="10" fontSize="9" fill="#A3821F" fontFamily="Jost, Noto Sans JP">メールアドレス(必須)</text>
          <rect x="1" y="14" width="138" height="14" rx="3" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、目に見えるラベルの考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Placeholders in Form Fields Are Harmful",
    color: "#7A4F7E",
    position: "ラベル・説明文を入力欄の中(プレースホルダー)に置くのは有害という、調査に基づく指針(数値基準ではない)",
    size: "数値基準は明言していません。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "ラベルや説明文を入力欄の中に置くこと(プレースホルダー頼み)はユーザビリティとアクセシビリティを下げるため避けるべきだとしています。デザイナーは視覚的な煩雑さを減らせるという理由でプレースホルダーを好みますが、多くのユーザビリティ上の問題を引き起こすとしています(検索結果による確認、2026-09、記事本文の直接取得は未実施)。",
    exceptions:
      "長いフォームで入力中にヒントを忘れると、書いた内容を消して確認しないと元のヒントが見えないという記憶の負担が生じるとしています。ラベルなしでは、入力済みかどうかを確認するために各欄を1つずつ消して確認する必要が生じるとしています。アイトラッキング調査では、ユーザーの視線は空欄に引き寄せられるとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際のユーザビリティ調査(記憶負荷・確認のしやすさ・視線)に基づく指針です。",
    useCases: [
      "ラベルは入力欄の外に常時表示し、補足情報だけをプレースホルダーに置く",
      "長いフォームほどラベル常時表示の効果が大きい",
      "入力済み内容を確認しやすい設計にする",
    ],
    searchHint: "",
    url: "https://www.nngroup.com/articles/form-design-placeholders/",
    confirmedNote: "検索結果の要約による間接確認(2026-09)。記事本文の直接取得は未実施。",
    pending: true,
    illustration: () => (
      <svg width="140" height="26" viewBox="0 0 140 26">
        <text x="0" y="10" fontSize="9" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">メールアドレス</text>
        <rect x="1" y="14" width="138" height="12" rx="3" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.4" />
      </svg>
    ),
    illustrationNote: "ラベルは欄の外に常時表示(概念図・系列識別色)",
  },
];

const TEXTAREA_NOTES = [
  {
    key: "hig",
    name: "Apple",
    position: "テキストフィールドは短い特定の文言専用。複数行・大きな文章の入力には、延長ではなく別コンポーネント「Text view」を使うべきとしている",
    text: "HIGは、テキストフィールドを氏名やメールアドレスなど「小さく具体的な文言」専用と位置づけています。より多くの文章を入力させたい場合は、テキストフィールドを大きくするのではなく別コンポーネントの「Text view」を使うべきだとしており、Text viewは複数行のスタイル付きテキストを表示でき、編集可能/読み取り専用のどちらにもできるとされています。",
    confirmedNote: "「Text views」ページ本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    url: "https://developer.apple.com/design/human-interface-guidelines/text-views",
  },
  {
    key: "material",
    name: "Google",
    position: "別コンポーネントではなく、同じText Fieldsコンポーネントが持つ「複数行(multi-line)」バリアント",
    text: "Material Design 3では、複数行入力はAppleのように独立したコンポーネントに分かれておらず、単一行のテキストフィールドと同じコンポーネントのバリアントの1つとして扱われています。複数行になると入力欄が伸びて複数行分の文章を収められるとされていますが、具体的な最大行数・高さのdp数値は確認できていません。",
    confirmedNote: "m3.material.io本文はSPAのため直接確認できておらず、検索結果による間接確認です(2026-09)。",
    url: "https://m3.material.io/components/text-fields/guidelines",
  },
  {
    key: "wcag",
    name: "W3C",
    position: "aria-multiline属性は独自実装のrole=\"textbox\"にのみ関わる。ネイティブの<textarea>要素はこの属性なしで複数行の意味が伝わる",
    text: "MDNのaria-multiline解説を直接確認したところ、この属性はカスタムのrole=\"textbox\"ウィジェットが複数行入力を受け付けるかを支援技術に伝えるためのもので、ARIAは要素の既定の動作自体は変えないため、ネイティブの<textarea>要素にはそもそも不要だとされています。高さを固定して内容を隠してしまう実装は、達成基準1.4.4(テキストのサイズ変更)・1.4.10(リフロー)に抵触し得る点にも注意が必要です(この2つはテキストエリア専用の基準ではなく一般的な達成基準です)。",
    confirmedNote: "aria-multiline属性の解説はMDN本文を直接確認済み(2026-09)。",
    url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-multiline",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    position: "入力欄の見た目の大きさ自体が、求められている回答の長さを示す視覚的な手がかりになるという指針",
    text: "NN groupの記事「Few Guesses, More Success」を直接確認したところ、短い入力欄は簡潔な回答(郵便番号・年齢など)を示唆し、長い・大きい入力欄はより詳しい入力(住所・説明・コメントなど)が必要なことを示すとされています。電話番号・市区町村・郵便番号の欄を同じ大きさで揃えてしまいユーザーを混乱させた実例(NAICのフォーム)が紹介されており、テキストエリアの高さは求める回答の長さに比例させるべきという実務的な指針です。",
    confirmedNote: "記事本文を直接取得して確認済み(2026-09)。テキストエリア専用の記事ではなく、フォーム全般の認知負荷に関する記事の一節です。",
    url: "https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/",
  },
];

function TextareaNotes() {
  return (
    <>
      <div className="dsp-mobile-only" style={styles.textareaGrid}>
        {TEXTAREA_NOTES.map((s) => (
          <div key={s.key} style={styles.sourceCard}>
            <div style={styles.sourceName}>{s.name}</div>
            <div style={styles.positionBadge}>{s.position}</div>
            <p style={styles.sourceStance}>{s.text}</p>
            <p style={styles.confirmedNote}>{s.confirmedNote}</p>
            <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
          </div>
        ))}
      </div>

      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.matrixGrid}>
            <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
            {TEXTAREA_NOTES.map((s) => (
              <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                <div style={styles.sourceName}>{s.name}</div>
              </div>
            ))}
            <div style={styles.labelCell}>位置づけ</div>
            {TEXTAREA_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.position}</div>))}
            <div style={styles.labelCell}>基本方針</div>
            {TEXTAREA_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.text}</div>))}
            <div style={styles.labelCell}>確認状況</div>
            {TEXTAREA_NOTES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell }}>{s.confirmedNote}</div>))}
            <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>リンク</div>
            {TEXTAREA_NOTES.map((s) => (
              <div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>
                <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
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

function TextFieldSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto" }}>
      <div style={{ position: "relative", marginBottom: 6 }}>
        <span style={{ position: "absolute", top: -8, left: 10, background: "#FFFFFF", padding: "0 4px", fontSize: 10.5, color: "#3A4FCF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>メールアドレス</span>
        <div style={{ border: "1.6px solid #3A4FCF", borderRadius: 6, padding: "10px 12px", fontSize: 13, color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>taro@example.com</div>
      </div>
      <div style={{ fontSize: 10.5, color: "#7E86AC", padding: "0 4px" }}>正しい形式で入力してください</div>
    </div>
  );
}

function TextareaSwatch() {
  return (
    <div style={{ width: 240, margin: "0 auto" }}>
      <div style={{ position: "relative", marginBottom: 6 }}>
        <span style={{ position: "absolute", top: -8, left: 10, background: "#FFFFFF", padding: "0 4px", fontSize: 10.5, color: "#3A4FCF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>お問い合わせ内容</span>
        <div style={{ border: "1.6px solid #3A4FCF", borderRadius: 6, padding: "10px 12px", height: 58, fontSize: 13, color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", textAlign: "left" }}>
          ご質問の詳細をご記入ください。折り返しご連絡いたします。
        </div>
      </div>
      <div style={{ fontSize: 10.5, color: "#7E86AC", padding: "0 4px" }}>複数行にわたる入力に対応</div>
    </div>
  );
}

export default function TextInputsTextFieldPage() {
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
        <SidebarNav currentPath="/components/text-inputs/text-field" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / テキストフィールド・テキストエリア</span>
            <span>SPEC No. 020</span>
          </div>

          <h1 style={styles.title}>テキストフィールド・テキストエリア</h1>
          <p style={styles.subtitle}>4つのガイドラインが、単一行のテキストフィールドと複数行のテキストエリアをどう定めているかを比較します。このページは<strong>①テキストフィールド(単一行)</strong>と<strong>②テキストエリア(複数行)</strong>の2つを扱います(②は後半のセクション)。</p>

          <h2 style={styles.diagramTitle}>① テキストフィールド(単一行)</h2>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <div style={styles.swatchPairRow}>
              <div style={styles.swatchPairItem}>
                <TextFieldSwatch />
                <div style={styles.swatchPairCaption}>① テキストフィールド(単一行)</div>
              </div>
              <div style={styles.swatchPairItem}>
                <TextareaSwatch />
                <div style={styles.swatchPairCaption}>② テキストエリア(複数行)</div>
              </div>
            </div>
            <p style={styles.swatchNote}>ラベル・入力欄・補足情報(サポートテキスト/エラーテキスト)の3層構造が、単一行・複数行のどちらにも、4系列で共通して見られる。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページで最も重要な発見は、<strong>W3CとNielsen Norman Groupが、それぞれ異なる角度から「プレースホルダーだけに頼るべきではない」という同じ結論</strong>に達していることです。W3Cは適合基準(3.3.2)として「目に見えるラベルまたは説明」を要求し、NN groupは記憶負荷や確認のしやすさといった実際のユーザビリティ調査から、ラベルを入力欄の外に常時表示すべきだとしています。規格と実証研究という異なるアプローチが、同じ実務上の結論に収束している点は信頼度が高いと言えます。
            </p>
            <p style={styles.synthesisText}>
              Googleは<strong>「フローティングラベル」という、常時ラベルを表示しつつ省スペースにする具体的な解決策</strong>を持っており、W3C/NN groupが指摘する問題への実務的な回答の1つになっています。フォーカス時や入力時にラベルが浮き上がる構造は、「常に見えるラベル」という要求と、コンパクトなレイアウトという要求を両立させる工夫です。
            </p>
            <p style={styles.synthesisText}>
              W3Cは<strong>「ラベルは全ユーザーに提示されるが、名前(name)は支援技術によってのみ露出される場合がある」</strong>という区別を明確にしており、見た目のラベル(3.3.2)・マークアップ上の関連付け(1.3.1)・支援技術への伝達(4.1.2)という3つの異なる基準が、それぞれ別の失敗モードをカバーしていることが分かります。
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

          <hr style={styles.sectionDivider} />

          <h2 style={styles.diagramTitle}>② テキストエリア(複数行)</h2>
          <p style={styles.diagramNote}>ここから先は、複数行のテキストエリアに関する4系列比較です(①のテキストフィールドとは別トピック)。</p>
          <TextareaNotes />
          <p style={styles.diagramNote}>Appleは複数行入力を「Text view」という別コンポーネントとして独立させている一方、Googleは同じText Fieldsコンポーネントの複数行バリアントとして扱っており、系列によって捉え方が異なります。ネイティブの<code>&lt;textarea&gt;</code>要素であれば、W3Cの技術要件(aria-multiline)は追加対応なしで満たされる点が実務上重要です。NN groupが指摘する通り、入力欄の高さ自体が求める回答の長さを示す手がかりになるため、短い回答を求める欄をテキストエリアサイズにしない(逆も同様)という配慮が必要です。</p>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["入力・フォーム"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3Cは本文確認済み。Apple・Google・NN groupは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはText fieldsページ本体へのリンクです。WCAGはUnderstandingページ、NN groupは記事ページ単位です。Googleは最新版(M3)の公式ページへリンクしていますが、本文はまだ直接確認できていません。
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
  swatchPairRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 },
  swatchPairItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  swatchPairCaption: { fontSize: 10.5, color: "#565D8A", fontFamily: "'IBM Plex Mono', monospace" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "10px 0 22px", lineHeight: 1.6 },
  textareaGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10, marginBottom: 4 },
  sectionDivider: { border: "none", borderTop: "1px dashed #D5D9EC", margin: "8px 0 26px" },
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
