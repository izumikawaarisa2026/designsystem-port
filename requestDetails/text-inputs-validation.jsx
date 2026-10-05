import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Text inputs / エラー表示」ページ。
 *
 * このページの発見: Appleには「バリデーション」という名称の専用ガイドラインページは
 * 見当たらず、テキストフィールド全般の記載の中に埋め込まれている。一方W3C(WCAG)は
 * この領域で最も具体的・体系的な基準を持ち、「エラーの特定(3.3.1)」「訂正案の提示
 * (3.3.3)」「重要な操作でのエラー防止(3.3.4)」という3段階の要求を積み上げている。
 * Nielsen Norman Groupは、この3段階の要求と方向性が一致する実務的な文章表現の
 * ガイドラインを提供しており、両者は補完関係にある。
 *
 * W3C(WCAG 2.2 Understanding: 3.3.1/3.3.3/3.3.4)/ Nielsen Norman Group(Error
 * Message Guidelines、10 Design Guidelines for Reporting Errors in Forms)は
 * 公式ページ・記事本文を直接取得して確認済み(2026-09)。Apple(HIG)は「バリデーション」
 * という名称の専用ページが見当たらないことを検索で確認した(2026-09)。テキストフィールド
 * 全般の記載の中に、動的な検証・即時フィードバック・色だけに頼らない状態表示についての
 * 言及があることを検索結果で確認したが、公式ページ本文の直接確認ではない。Google
 * (Material Design 3)は、テキストフィールドのエラー状態(エラーカラー・エラーテキスト・
 * アイコン)についての一般的な言及を検索結果で確認したが、公式サイトがクライアント側
 * レンダリングのSPAで本文を直接確認できていない。
 *
 * 2026-09 追記(ページ分割): ユーザーから「エラー表示とバリデーションは明確に違う
 * ものなので、使い方・コンポーネント・使用ルールを分けて記載してほしい。文章量や
 * 比較POINTが多ければページも分けてよい」というフィードバックを受け、旧「エラー表示・
 * バリデーション」ページを2ページに分割した。このページは「検知したエラーをどう
 * 見せるか」(文言・視覚表現・訂正案の提示・ARIAでの通知)に対象を絞り、「いつ検証
 * するか」(リアルタイム/フォーカス離脱時/送信時というタイミングの選択、必須項目の
 * 示し方、エラーが出る前の書式ヒント、入力済みの成功表示)は新設の「バリデーション」
 * ページ(/components/text-inputs/input-validation、SPEC No.040)に分離した。
 * このページのSOURCESの内容自体(エラー文言・視覚状態・WCAG 3.3.1/3.3.3/3.3.4・
 * NN groupのエラー文言指針)はすべて「表示方法」についてのものなので変更していない。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "専用ページなし(Text fields等の記載に含まれる)",
    color: "#C2542A",
    position: "「バリデーション」という名称の専用ガイドラインページは見当たらない。テキストフィールド関連の記載に含まれる",
    size: "専用コンポーネントページがないため、数値基準は確認できていません。",
    colorInfo: "色だけでエラー状態を伝えるべきではないという言及があります(検索結果による確認)。色に加えてアイコンやテキストラベルを併用すべきとされています。",
    stance:
      "AppleのHIGには「バリデーション」という名称の専用ガイドラインページは見当たりません。テキストフィールドなど個別コンポーネントの記載の中に、動的にフィールドの値を検証し、問題を検知した時点で即座にフィードバックを与え、ユーザーがすぐに訂正できるようにすべきという言及があるとされています(検索結果による確認、2026-09)。",
    exceptions:
      "エラーメッセージはエラーコードや汎用的な文言ではなく、次に何をすべきかを説明すべきとしています。赤いエラー表示のように色だけで状態を伝えるべきではなく、アイコンやテキストラベルを併用すべきとされています(検索結果による確認)。",
    accessibility: "―(専用のアクセシビリティ記載は確認できていません)。一般的な原則として、色だけに頼らない状態表示が挙げられています。",
    useCases: [
      "問題を検知した時点で即座にフィードバックを与える(事後の一括表示ではなく動的な検証)",
      "エラーメッセージは次にすべき行動を説明する(エラーコードや汎用文言は避ける)",
      "色だけでなくアイコン・テキストラベルも併用して状態を伝える",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/text-fields",
    confirmedNote: "「バリデーション」という名称の専用ページは見当たらないことを検索で確認(2026-09)。テキストフィールド全般の記載中の言及も、公式ページ本文の直接確認ではなく検索結果による間接確認です。",
    pending: true,
    illustration: () => (
      <svg width="120" height="30" viewBox="0 0 120 30">
        <rect x="1" y="1" width="118" height="22" rx="4" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
        <text x="10" y="15" fontSize="9" fill="#171B36" fontFamily="Jost, Noto Sans JP">meail@example</text>
        <text x="2" y="29" fontSize="8" fill="#C2542A" fontFamily="Jost, Noto Sans JP">⚠ メールアドレスの形式が正しくありません</text>
      </svg>
    ),
    illustrationNote: "色に加えアイコン+テキストで状態を示す(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Text fields(エラー状態)",
    color: "#2F7D6E",
    position: "テキストフィールドのバリエーションの1つとして「エラー状態」を持つ。専用の「バリデーション」コンポーネントはない",
    size: "専用コンポーネントページがないため、数値基準は確認できていません。",
    colorInfo: "エラー状態では、枠線・フローティングラベル・ヘルパーテキストにエラーカラー(赤系のトークン)を適用し、末尾にエラーアイコンを表示できるとされています(検索結果による確認)。",
    stance:
      "Material Design 3には「バリデーション」という独立したコンポーネントはなく、テキストフィールドの状態(Enabled/Focused/Error等)の1つとして「エラー状態」が定義されているとされています。エラー状態ではエラーカラーの枠線・ラベル・ヘルパーテキストに加え、末尾にエラーアイコンを表示できるとされています(検索結果による確認、2026-09)。",
    exceptions: "エラー状態と他の状態(Disabledなど)が同時に発生する場合の優先順位など、詳細な規定は公式ページ本文で未確認です。",
    accessibility:
      "操作可能(Operable)・知覚可能(Perceivable) ― エラーの発生をテキスト(ヘルパーテキスト)でも伝えるべきとされ、色のみに依存しない表示が求められると考えられます(直接確認はできていません)。",
    useCases: [
      "無効な入力にはエラーカラーの枠線・ラベル・ヘルパーテキストを適用する",
      "エラーであることを示す末尾アイコンを併用する",
      "エラーテキストで具体的な訂正方法を伝える",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/text-fields/guidelines",
    confirmedNote: "テキストフィールドのエラー状態(エラーカラー・ヘルパーテキスト・アイコン)についての一般的な言及は検索結果による確認(2026-09)。m3.material.io本文はSPAのため直接確認はできていません。",
    pending: true,
    illustration: () => (
      <svg width="120" height="30" viewBox="0 0 120 30">
        <rect x="1" y="1" width="118" height="22" rx="4" fill="#FFFFFF" stroke="#C0503F" strokeWidth="1.6" />
        <text x="10" y="15" fontSize="9" fill="#171B36" fontFamily="Jost, Noto Sans JP">meail@example</text>
        <circle cx="105" cy="12" r="6" fill="none" stroke="#C0503F" strokeWidth="1.4" />
        <text x="105" y="15" fontSize="8" fill="#C0503F" textAnchor="middle" fontWeight="700">!</text>
        <text x="2" y="29" fontSize="8" fill="#C0503F" fontFamily="Jost, Noto Sans JP">メールアドレスの形式が正しくありません</text>
      </svg>
    ),
    illustrationNote: "エラー状態(赤系の枠線・ラベル・末尾アイコン、概念図)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 3.3.1 Error Identification / 3.3.3 Error Suggestion / 3.3.4 Error Prevention",
    color: "#A3821F",
    position: "エラーの検知・説明(レベルA)、訂正案の提示(レベルAA)、重要操作での防止策(レベルAA)という3段階の達成基準",
    size: "サイズ専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5)はエラー訂正のためのUI要素にも適用されます。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、エラーを示す枠線などの視覚的要素は3:1以上のコントラスト比を確保すべきとしています。エラーは視覚的表示だけでなく、必ずテキストで説明する必要があります。",
    glossary: [
      { term: "3.3.1 Error Identification(レベルA)", desc: "入力エラーが自動検出された場合、エラーの項目を特定し、エラーの内容をテキストでユーザーに説明しなければならないという基準。視覚的な表示だけでは不十分とされる。" },
      { term: "3.3.3 Error Suggestion(レベルAA)", desc: "入力エラーが自動検出され、訂正方法が分かっている場合、セキュリティや目的を損なわない限り、その訂正案をユーザーに提示しなければならないという基準。" },
      { term: "3.3.4 Error Prevention(レベルAA)", desc: "法的・金融的な確約、ユーザーデータの変更・削除、テスト回答の送信を伴うページでは、「取消可能」「入力エラーを検査して訂正機会を与える」「送信前に確認・訂正できる仕組みがある」のいずれかを満たさなければならないという基準。" },
    ],
    stance:
      "3.3.1は、入力エラーが自動検出された場合、エラーのある項目を特定し、エラーの内容をテキストで説明することを求めます(レベルA)。必須項目の未入力にはaria-invalid等での特定、書式が不正な入力にはARIAのアラートやライブリージョンでの説明が代表的な実装手法とされています。3.3.3はこれを一段進め、訂正方法が分かっている場合はその訂正案自体を提示することを求めます(レベルAA、例: 月に「12」以外の値が入力された場合、正しい月名の一覧や「12月のことですか?」という提案を示す)。3.3.4は、法的・金融的な確約やデータの変更・削除、テスト送信を伴う場面において、取消可能・入力エラーの検査と訂正機会・送信前の確認という3つの手段のいずれかを備えることを求めます(レベルAA)。",
    exceptions:
      "3.3.3の訂正案の提示は、それによってセキュリティや機能の目的が損なわれる場合(パスワード入力欄など)は除外されるとしています。3.3.4は全てのページに適用されるわけではなく、法的確約・金融取引・データの変更や削除・試験の回答送信を伴うページに限定されます。",
    accessibility:
      "知覚可能(Perceivable)・操作可能(Operable) ― エラーの視覚的表示に加えテキストでの説明が必須である点は知覚可能性に、訂正機会の提供は操作可能性に関わります。認知障害・視覚障害・運動障害のあるユーザーが、エラーによってフォームの送信を断念せずに済むようにするという意図が明記されています。",
    useCases: [
      "エラーは項目の特定+テキストによる説明の両方を必ず行う(視覚表示だけにしない)",
      "訂正方法が分かっている場合は具体的な訂正案を提示する(セキュリティ上避けるべき場合を除く)",
      "法的・金融・データ変更・試験送信を伴う場面では、取消可能/訂正機会/送信前確認のいずれかを用意する",
    ],
    searchHint: "unless it would jeopardize",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html",
    urlSecondary: [
      { label: "3.3.3 Error Suggestion", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html" },
      { label: "3.3.4 Error Prevention", url: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html" },
    ],
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="30" viewBox="0 0 120 30">
          <rect x="1" y="1" width="118" height="22" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="15" fontSize="8.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">3.3.1 → 3.3.3 → 3.3.4</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、3段階の達成基準の関係を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Error-Message Guidelines / 10 Design Guidelines for Reporting Errors in Forms",
    color: "#7A4F7E",
    position: "文言・トーン・配置の実務ガイドライン(数値基準ではなく、伝わりやすさの原則)",
    size: "数値基準は明言していません。",
    colorInfo: "色だけに頼らず、太字・高コントラストの赤色文字など複数の視覚的手がかりを重ねて使うべきとしています。",
    stance:
      "エラーはフィールドの近くに表示し、認知的な負荷を減らすべきとしています。理想的には全ての検証をインラインで行い、ユーザーが1つのフィールドの入力を終えた直後に、その場でエラーの有無を示すべきとしています。これによりユーザーは入力の途中で修正でき、やり直しのコストを減らせるとしています。エラーメッセージは平易な言葉で、簡潔かつ正確に問題を説明し、具体的な解決策を提示すべきで、ユーザーを責める表現(「無効」「不正」など)は避けるべきとしています。",
    exceptions:
      "ユーザーが実際に何らかの入力を行うまでは、エラーを早まって表示すべきではないとしています。前の入力内容は保持し、ユーザーがゼロから入力し直す必要がないようにすべきとしています。可能であれば、正しい候補を推測し、小さな一覧からユーザーが選べるようにするとよいとしています。ユーモアは繰り返されると陳腐化するため避けるべきとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、エラーメッセージの伝わりやすさ・修正のしやすさに基づく実務的な指針です。",
    useCases: [
      "フィールドの近くにインラインでエラーを表示し、入力直後に検証する",
      "エラーメッセージは平易な言葉で具体的な解決策を示し、ユーザーを責めない",
      "軽微な問題にはインライン表示・トースト・バナーを、深刻な問題にはモーダルダイアログを使い分ける",
    ],
    searchHint: "don't blame the user",
    url: "https://www.nngroup.com/articles/error-message-guidelines/",
    urlSecondary: [{ label: "10 Design Guidelines for Reporting Errors in Forms", url: "https://www.nngroup.com/articles/errors-forms-design-guidelines/" }],
    illustration: () => (
      <svg width="120" height="30" viewBox="0 0 120 30">
        <rect x="1" y="1" width="118" height="22" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.6" />
        <text x="10" y="15" fontSize="9" fill="#171B36" fontFamily="Jost, Noto Sans JP">meail@example</text>
        <text x="2" y="29" fontSize="8" fill="#7A4F7E" fontFamily="Jost, Noto Sans JP">「@」の後にドメイン名を入力してください</text>
      </svg>
    ),
    illustrationNote: "具体的な解決策を示すエラー文言(概念図・系列識別色)",
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

function ValidationSwatch() {
  return (
    <div style={{ width: 220, margin: "0 auto", textAlign: "left" }}>
      <div style={{ border: "1.6px solid #C0503F", borderRadius: 6, padding: "8px 12px", fontSize: 13, color: "#171B36", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", background: "#FFFFFF" }}>
        meail@example
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
        <span style={{ color: "#C0503F", fontSize: 12 }}>⚠</span>
        <span style={{ fontSize: 11, color: "#C0503F", fontFamily: "'Jost', 'Noto Sans JP', sans-serif" }}>メールアドレスの形式が正しくありません</span>
      </div>
    </div>
  );
}

export default function TextInputsValidationPage() {
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
        <SidebarNav currentPath="/components/text-inputs/validation" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / エラー表示</span>
            <span>SPEC No. 023</span>
          </div>

          <h1 style={styles.title}>エラー表示</h1>
          <p style={styles.subtitle}>4つのガイドラインが、検知したエラーの見せ方(文言・視覚的表現・訂正案の提示)をどう定めているかを比較します。「いつ検証するか」というタイミングの比較は「バリデーション」ページを参照してください。</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(共通形状)</span>
            <ValidationSwatch />
            <p style={styles.swatchNote}>エラー状態の枠線に加え、アイコン・テキストで問題と訂正方法を伝える。色だけに頼らない表示が各系列で共通して求められている。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このコンポーネントで最も体系的なのはW3Cです。<strong>「エラーの特定(3.3.1・レベルA)」→「訂正案の提示(3.3.3・レベルAA)」→「重要操作でのエラー防止(3.3.4・レベルAA)」</strong>という3段階の達成基準が積み上がっており、単に「エラーを表示する」だけでなく「何が間違っているか」「どう直せばよいか」「重要な操作では事前に防ぐ」という段階的な要求になっています。
            </p>
            <p style={styles.synthesisText}>
              Nielsen Norman Groupのガイドラインは、この3段階の要求と方向性が一致する<strong>実務的な文章表現の指針</strong>を提供しています。「ユーザーを責めない」「具体的な解決策を示す」「入力を保持する」といった原則は、W3Cの「訂正案の提示」を実際にどう書くかという具体化と言えます。
            </p>
            <p style={styles.synthesisText}>
              興味深いのは、<strong>Apple・Googleどちらにも「バリデーション」という独立したコンポーネント名は見当たらない</strong>ことです。両社とも、これをテキストフィールドという個別コンポーネントの「状態の1つ」として扱っており、W3C・NN groupのような横断的な原則としては文書化していないと考えられます。
            </p>
            <p style={styles.synthesisText}>
              4系列に共通する数少ない一致点は、<strong>「色だけに頼ってはならない」</strong>という原則です。Apple(アイコン・テキストの併用)・W3C(1.4.11の非テキストコントラスト+テキストによる説明の必須化)・NN group(太字・高コントラストなど複数の手がかりを重ねる)がそれぞれ独立に同じ結論に達している点は、実装上の優先度が高い指摘だと言えます。
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

          <div style={styles.linksRow}>
            <a href="/components/text-inputs/input-validation" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>バリデーション ↗</div>
              <div style={styles.linkCardDesc}>「いつ検証するか」(リアルタイム/フォーカス離脱時/送信時)というタイミングの比較はこちら</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["エラー・確認", "入力・フォーム"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3C・NN groupは本文確認済み。Apple・Googleは検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはText fieldsページへのリンクです(専用のバリデーションページなし)。WCAGは3.3.1 Understandingページを基本リンクとし、3.3.3・3.3.4のUnderstandingページも併記しています。Googleは最新版(M3)のText fieldsページへリンクしていますが、本文はまだ直接確認できていません。NN groupはError-Message Guidelinesを基本リンクとし、関連記事も併記しています。
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
  linksRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 22 },
  linkCard: { display: "block", textDecoration: "none", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, padding: "14px 16px", color: "inherit" },
  linkCardTitle: { fontSize: 13.5, fontWeight: 700, color: "#3A4FCF", marginBottom: 4 },
  linkCardDesc: { fontSize: 12, color: "#7E86AC" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#7E86AC", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
