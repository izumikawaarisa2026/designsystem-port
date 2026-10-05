import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * コンポーネントレイヤー「Text inputs / カレンダー(スケジュール/予定表)」ページ。
 *
 * 「日付・タイムピッカー」ページが扱う「単一の日付を選ぶための入力コントロール」
 * とは異なり、このページはGoogleカレンダーのような「予定を表示・管理する
 * スケジュール/アジェンダのビュー」を扱う。ユーザーからの新規ページ依頼を受けて
 * 2026-09に新規作成。
 *
 * 2026-09 追記(内容の訂正): 初版はApple・Googleを「該当コンポーネントなし」と
 * していたが、ユーザーから「MD3・Appleにも存在する(名称が日付ピッカーなど
 * 違うだけ)」という指摘を受け、確認したところ事実だった。Apple の
 * UIDatePickerStyle.inline/.compactは「十分なスペースがあればモーダルの手間
 * なくフルサイズのカレンダーを直接表示する」ものであり、実質的に月表示の
 * カレンダーグリッドである(検索結果で確認、2026-09)。GoogleのDate pickers
 * Modalバリアントも、月をまたぐ横スワイプ・年をまたぐ縦スクロールを持つ
 * カレンダーグリッドUIそのもの(「日付・タイムピッカー」ページで確認済み)。
 * NN groupの既存記事(Date-Input Form Fields)も、カレンダーピッカー(グリッド
 * UI)の使いどころを論じている。したがって正しい発見は「4系列とも独立した
 * 『カレンダー』コンポーネントは持たないが、いずれも日付ピッカーの1バリエー
 * ションとして実質的なカレンダーグリッドUIを持つ」であり、「該当なし」では
 * なかった。一方で、複数の予定を並べて表示・管理するスケジュール/アジェンダ
 * 専用のビューは、4系列のいずれにも見当たらないという点は変わらない
 * (この差を正しく分けて記載するよう全面的に書き直した)。
 *
 * Apple(UIDatePickerStyle.inlineの技術文書、iOS 14での.inline/.compact追加の
 * 経緯)・Google(m3.material.ioのDate pickers Modalバリアントのナビゲーション
 * 操作)は検索結果による確認(2026-09、いずれも公式サイト本文はSPAのため
 * 直接確認はできていない)。W3C(WAI-ARIA APG Grid Patternのページ本文、Layout
 * Grid Examplesページ)・NN group(Date-Input Form Fields記事)は本文を直接
 * 取得して確認済み(2026-09)。
 *
 * 2026-09 追記: ユーザーから「四系列デザインシステム比較のApple・Googleのデザイン
 * イメージも追記したい」というフィードバックを受け、W3C・NN groupにのみあった
 * illustrationを、Apple(UIDatePickerStyle.inlineの月表示グリッド、選択日を円形で表示)・
 * Google(Date pickers Modalの月表示グリッド、月送りナビゲーション付き、選択日を
 * 角丸四角で表示)にも追加した。あわせて、プレビューがPC幅でもモバイル向けカード
 * グリッドが混在して見えるという指摘を受け、ビルド成果物の取り違えの可能性を
 * 排除するため、現在のソースから作り直した単独プレビューを再公開した(コード側の
 * dsp-mobile-only/dsp-desktop-onlyの切り替えロジック自体に変更はない)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "UIDatePickerStyle.inline / .compact(日付ピッカーの1バリエーション)",
    color: "#C2542A",
    position: "「カレンダー」という独立コンポーネント名はないが、日付ピッカーの.inline/.compactスタイルが実際に月表示のカレンダーグリッドを描画する。単一の日付選択用であり、複数の予定を並べるスケジュール/アジェンダ専用ではない",
    size: "具体的なpt数値は確認できていません。",
    colorInfo: "色についての明確な規定は確認できていません。",
    stance:
      "「日付・タイムピッカー」ページで比較したAppleのピッカーはホイール型を中心に扱いましたが、UIDatePickerには.inlineスタイルもあり、これは十分なスペースがある場合にモーダルの手間なくフルサイズのカレンダーを直接表示するものだとされています。.compactスタイルもタップすると同じカレンダーグリッドを開きます。Appleにも実質的な「カレンダーUI」は存在しますが、独立した「Calendar」コンポーネントではなく日付ピッカーの1バリエーションという位置づけです。",
    exceptions:
      ".inline/.compactスタイルはあくまで単一の日付を選ぶためのコントロールで、複数の予定(イベント)を同時に表示・管理するスケジュール/アジェンダのビューではありません。カレンダーアプリの予定自体を表示・編集する場合は、EventKitUIというシステムフレームワーク(EKEventViewController等)を呼び出す形になり、これもデザインパターンというよりOS標準UIを呼び出す技術的な仕組みです。",
    accessibility: "―(このトピックには専用のアクセシビリティ記載を確認できていません)。",
    useCases: [
      "十分なスペースがある画面では.inlineスタイルでカレンダーグリッドを直接表示する",
      "スペースが限られる場合は.compactスタイルでタップ時に同じグリッドを開く",
      "複数の予定を並べて管理する用途にはEventKitUI等の別の仕組みが必要になる",
    ],
    searchHint: "",
    url: "https://developer.apple.com/documentation/uikit/uidatepickerstyle/inline",
    confirmedNote:
      "UIDatePickerStyle.inlineの技術文書、およびiOS 14で.inline/.compactが追加された経緯についての検索結果による確認(2026-09)。HIGの「Pickers」ページ本文でこのスタイルが明示的に扱われているかどうかは、同ページがSPAのため直接確認できていません。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="6" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.4" />
        <text x="60" y="12" fontSize="7.5" fill="#C2542A" textAnchor="middle" fontFamily="Jost, Noto Sans JP">2026年9月</text>
        <line x1="6" y1="17" x2="114" y2="17" stroke="#C2542A" strokeWidth="0.6" opacity="0.4" />
        {Array.from({ length: 14 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const cx = 13 + col * 15.5;
          const cy = 32 + row * 18;
          return (
            <g key={i}>
              {i === 8 && <circle cx={cx} cy={cy} r="6.5" fill="#C2542A" />}
              <text x={cx} y={cy + 2.5} fontSize="7" fill={i === 8 ? "#FFFFFF" : "#454C78"} textAnchor="middle" fontFamily="Jost, Noto Sans JP">{i + 1}</text>
            </g>
          );
        })}
      </svg>
    ),
    illustrationNote: "UIDatePickerStyle.inlineの月表示カレンダーグリッド(概念図・系列識別色)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Date pickers(Modalバリアントのカレンダーグリッド)",
    color: "#2F7D6E",
    position: "「カレンダー」という独立コンポーネント名はないが、Date pickersのModalバリアントが月表示のカレンダーグリッドUIそのもの。単一の日付(または範囲)選択用であり、複数の予定を並べるスケジュール/アジェンダ専用ではない",
    size: "具体的なdp数値は確認できていません。",
    colorInfo: "色の値はデザイントークンを通して実装されるとされています。",
    stance:
      "「日付・タイムピッカー」ページで比較した通り、GoogleのModal date pickerは月をまたぐ横スワイプ・年をまたぐ縦スクロール・年タップでの年選択という具体的な操作を持つカレンダーグリッドUIです。Googleにも実質的な「カレンダーUI」は存在しますが、独立した「Calendar」コンポーネントとしてではなく、日付ピッカーの1バリエーションとして提供されています。",
    exceptions:
      "Modal date pickerは主に単一の日付・日付範囲の選択に使われ、「日付・タイムピッカー」ページで確認した通り生年月日のような遠い日付には不向き(Docked/Modal date inputを推奨)とされています。複数の予定を同時に表示・管理するスケジュール/アジェンダのビューとしての専用コンポーネントは、m3.material.ioのコンポーネント一覧に見当たりません。",
    accessibility:
      "操作可能(Operable) ― 「日付・タイムピッカー」ページで比較したDate Picker Dialogのアクセシビリティ要件(グリッドロール・ローミングtabindexなど)が同様に関わると考えられます。",
    useCases: [
      "単一の日付・範囲を選ばせたい場合にModal date pickerのカレンダーグリッドを使う",
      "生年月日など遠い日付にはDocked/Modal date inputを使う(カレンダー形式は避ける)",
      "複数の予定を並べて管理する用途には、このコンポーネントとは別のUI設計が必要になる",
    ],
    searchHint: "",
    url: "https://m3.material.io/components/date-pickers/guidelines",
    confirmedNote:
      "月/年のナビゲーション操作(横スワイプ・縦スクロール・年タップ)は検索結果による確認(2026-09)。m3.material.io本文はSPAのため直接確認はできていません。",
    pending: true,
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="6" fill="#FFFFFF" stroke="#2F7D6E" strokeWidth="1.4" />
        <text x="60" y="12" fontSize="7.5" fill="#2F7D6E" textAnchor="middle" fontFamily="Jost, Noto Sans JP">◀ 2026年9月 ▶</text>
        <line x1="6" y1="17" x2="114" y2="17" stroke="#2F7D6E" strokeWidth="0.6" opacity="0.4" />
        {Array.from({ length: 14 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const cx = 13 + col * 15.5;
          const cy = 32 + row * 18;
          return (
            <g key={i}>
              {i === 8 && <rect x={cx - 6.5} y={cy - 6.5} width="13" height="13" rx="6.5" fill="#2F7D6E" />}
              <text x={cx} y={cy + 2.5} fontSize="7" fill={i === 8 ? "#FFFFFF" : "#454C78"} textAnchor="middle" fontFamily="Jost, Noto Sans JP">{i + 1}</text>
            </g>
          );
        })}
      </svg>
    ),
    illustrationNote: "Date pickers Modalバリアントのカレンダーグリッド、月送りナビゲーション付き(概念図・系列識別色)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI-ARIA APG ― Grid (Interactive Tabular Data) Pattern(「日付・タイムピッカー」ページのDate Picker Dialog例と同じ基盤)",
    color: "#A3821F",
    position: "カレンダーグリッド専用のパターンではなく、Date Picker Dialog例が使う汎用のGridパターンがそのまま基盤になる。複数の予定を持つスケジュール/アジェンダ向けの完成された実例はない",
    size: "カレンダー専用の数値基準はありませんが、一般的なターゲットサイズ基準(WCAG 2.5.8/2.5.5)は各日・各予定のセルにも適用されます。",
    colorInfo: "1.4.11(非テキストのコントラスト)により、選択中のセルや予定を示す視覚的要素は3:1以上のコントラスト比を確保すべきとしています。",
    glossary: [
      { term: "ローミングtabindex", desc: "グリッド内で常に1つのセルだけがtabindex=\"0\"を持ち、残りは-1にする実装方法。「日付・タイムピッカー」ページのDate Picker Dialog例と同じ仕組みで、矢印キーでセル間を移動できる。" },
    ],
    stance:
      "APG本文・Layout Grid Examplesページを直接確認したところ、カレンダー・アジェンダ専用の完成された実例(ワークドエグザンプル)は掲載されていません。掲載されているのはrelated documents list・pill list・search resultsの3例のみです。一方でGrid (Interactive Tabular Data) Patternの一般原則(role=\"grid\"、行・列のセル構造、矢印キーでの移動、ローミングtabindex)は、「日付・タイムピッカー」ページで比較したDate Picker Dialog例と同じ仕組みであり、複数の予定を日・週・月のマス目に並べるスケジュールビューを自作する際の実装の土台になり得るとしています。",
    exceptions:
      "「日付・タイムピッカー」ページのDate Picker Dialog例は単一の日付を選ぶ一過性のダイアログですが、スケジュール/予定表は複数の予定を持つ永続的な画面であるため、単純に同じ実装を流用できるわけではありません。APG本文にも、複数イベントを持つカレンダービュー特有の追加要件(1つのセルに複数の予定がある場合の扱いなど)についての記載はありません。",
    accessibility:
      "堅牢(Robust)・操作可能(Operable) ― グリッドロール・ローミングtabindexによるキーボード操作性(2.1.1)が中心ですが、カレンダー・アジェンダに特有の要件(予定の読み上げ順序、複数予定の扱いなど)はAPGでカバーされていません。",
    useCases: [
      "日・週・月のマス目状のレイアウトには、role=\"grid\"とローミングtabindexを土台として使う",
      "矢印キーでのセル間移動など、「日付・タイムピッカー」ページと同じキー操作の考え方を踏襲する",
      "1つのセルに複数の予定がある場合の読み上げ順序・操作性は、APGに実例がないため独自に設計する",
    ],
    searchHint: "",
    url: "https://www.w3.org/WAI/ARIA/apg/patterns/grid/",
    confirmedNote: "Grid Patternの本文、およびLayout Grid Examplesページ(実例が3つのみで、カレンダー・アジェンダの実例がないこと)を直接取得して確認済み(2026-09)。",
    illustration: () => (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="1" y="1" width="118" height="68" rx="4" fill="none" stroke="#A3821F" strokeDasharray="3 2" strokeWidth="1.2" />
          <text x="60" y="30" fontSize="8" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">role="grid"</text>
          <text x="60" y="44" fontSize="7.5" fill="#A3821F" textAnchor="middle" fontFamily="Jost, Noto Sans JP">(汎用パターンの転用)</text>
        </svg>
      </div>
    ),
    illustrationNote: "視覚デザインの規定はなく、汎用グリッド構造の考え方を図示",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Date-Input Form Fields: UX Design Guidelines(「日付・タイムピッカー」ページと同じ記事、カレンダーピッカーの使い分け箇所)",
    color: "#7A4F7E",
    position: "「カレンダー」単体を論じた記事はないが、この記事内でカレンダーピッカー(グリッドUI)の使いどころを具体的に論じている。日付入力の文脈であり、複数の予定を並べるスケジュール/アジェンダ表示について論じたものではない",
    size: "数値基準としては、選択肢が10個未満の場合のみドロップダウンを検討すべきとしています。カレンダーグリッド専用の寸法基準はありません。",
    colorInfo: "色についての数値基準はありません。",
    stance:
      "「日付・タイムピッカー」ページで確認した通り、この記事はカレンダーピッカーを「現在に近い(1年未満程度の)日付」や「日付の範囲選択」に向くとしています。誕生日のような遠い日付ではフリーテキスト入力を推奨しており、カレンダーグリッドUIは万能ではなく用途を選ぶという立場です。",
    exceptions:
      "スケジュール/予定表(複数の予定を並べて表示・管理するアジェンダビュー)そのものを扱った記事は見つかっていません。calendar UX・week view・scheduling app design・appointment bookingなど複数の観点で検索しましたが、この記事以上に近い一次情報はありませんでした。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、実際の入力効率・エラー率に基づく使い分けの指針です。",
    useCases: [
      "近い将来の日付・範囲選択にはカレンダーピッカー(グリッドUI)を使う",
      "誕生日など遠い日付にはフリーテキスト入力を使う(カレンダーグリッドは避ける)",
      "複数の予定を並べるスケジュール表示は、この記事の範囲外として別途設計する",
    ],
    searchHint: "less than a year",
    url: "https://www.nngroup.com/articles/date-input/",
    confirmedNote: "記事本文を直接取得して確認済み(2026-09)。「日付・タイムピッカー」ページと同一の記事です。",
    illustration: () => (
      <svg width="120" height="70" viewBox="0 0 120 70">
        <rect x="1" y="1" width="118" height="68" rx="4" fill="#FFFFFF" stroke="#7A4F7E" strokeWidth="1.4" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={16 + i * 16} cy="35" r="4" fill={i === 3 ? "#7A4F7E" : "none"} stroke="#7A4F7E" strokeWidth="1" />
        ))}
        <text x="60" y="58" fontSize="8" fill="#171B36" textAnchor="middle" fontFamily="Jost, Noto Sans JP">近い日付・範囲選択向き</text>
      </svg>
    ),
    illustrationNote: "「日付・タイムピッカー」ページと同じカレンダーピッカーの使いどころ(概念図・系列識別色)",
  },
];

function InfoBox({ label, accent, muted, children }) {
  return (
    <div style={{ ...styles.infoBox, ...(accent && !muted ? { borderLeftColor: accent } : {}) }}>
      <span style={{ ...styles.exceptionLabel, ...(muted ? styles.mutedText : {}) }}>{label}</span>
      <div style={{ ...styles.exceptionText, ...(muted ? styles.mutedText : {}) }}>{children}</div>
    </div>
  );
}

function UseCaseList({ items, muted }) {
  return (
    <ul style={styles.useCaseList}>
      {items.map((it, i) => (<li key={i} style={{ ...styles.useCaseItem, ...(muted ? styles.mutedText : {}) }}>{it}</li>))}
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

function CalendarSwatch() {
  return (
    <div style={{ width: 260, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 6, overflow: "hidden", textAlign: "left" }}>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #E1E3F0", fontSize: 12, fontWeight: 700, color: "#171B36" }}>2026年9月</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, background: "#E1E3F0" }}>
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <div key={d} style={{ background: "#F8F9FD", textAlign: "center", fontSize: 9, color: "#9EA4C4", padding: "3px 0" }}>{d}</div>
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ background: "#FFFFFF", minHeight: 26, fontSize: 9, color: "#454C78", padding: "2px 3px", position: "relative" }}>
            {i + 1}
            {i === 8 && <div style={{ marginTop: 2, background: "#3A4FCF", height: 4, borderRadius: 2 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TextInputsCalendarPage() {
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
        <SidebarNav currentPath="/components/text-inputs/calendar" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / カレンダー(スケジュール/予定表)</span>
            <span>SPEC No. 039</span>
          </div>

          <h1 style={styles.title}>カレンダー(スケジュール/予定表)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、月表示のカレンダーグリッドUIをどう定めているかを比較します(いずれも「日付ピッカー」の1バリエーションとして提供されます。詳しい入力コントロールとしての比較は「日付・タイムピッカー」ページを参照)</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>コンポーネントイメージ(月表示の例)</span>
            <CalendarSwatch />
            <p style={styles.swatchNote}>4系列とも、この形のカレンダーグリッドを持ちますが、いずれも独立した「Calendar」コンポーネントではなく「日付ピッカー」の1バリエーションとして提供されており、単一の日付(または範囲)を選ぶためのものです。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              このページの一番の発見は、<strong>4系列とも「カレンダー」という名前の独立コンポーネントこそ持たないものの、いずれも実質的なカレンダーグリッド(月表示)のUIを「日付ピッカー」の1バリエーションとして持っている</strong>ことです。Appleは<strong>UIDatePickerの.inline/.compactスタイル</strong>で、十分なスペースがあればモーダルの手間なくフルサイズのカレンダーを直接表示します。Googleは<strong>Date pickersのModalバリアント</strong>で、月をまたぐ横スワイプ・年をまたぐ縦スクロールという具体的な操作を持つカレンダーグリッドを提供しています。
            </p>
            <p style={styles.synthesisText}>
              W3Cは、<strong>「日付・タイムピッカー」ページで比較したDate Picker Dialog例と同じ汎用Grid (Interactive Tabular Data) Pattern</strong>がそのまま基盤になります。Nielsen Norman Groupも、同じ記事「Date-Input Form Fields」の中でカレンダーピッカー(グリッドUI)の使いどころを論じており、<strong>近い将来の日付・範囲選択には向くが、誕生日のような遠い日付にはフリーテキスト入力を推奨</strong>しています。
            </p>
            <p style={styles.synthesisText}>
              一方で、<strong>複数の予定を並べて表示・管理するスケジュール/アジェンダ専用のビュー(Googleカレンダーのような画面)は、4系列のいずれにも見当たりません</strong>。どの系列の「カレンダー」も、単一の日付(または範囲)を選ぶための入力コントロールとしてのグリッドUIであり、予定表そのものではないという点が実務上重要です。自作する場合は、<strong>W3Cの汎用Gridパターン(矢印キー移動・ローミングtabindex)を土台にしつつ、予定の表示自体は「カード」「リスト」「バッジ」など本サイトの他のパーツを組み合わせて設計する</strong>ことになります。
            </p>
          </div>

          <div className="dsp-mobile-only" style={styles.sourceList}>
            {SOURCES.map((s) => (
              <div key={s.key} style={styles.sourceCard}>
                <div style={styles.sourceHeadRow}>
                  <div>
                    <div style={{ ...styles.sourceName, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.name}</div>
                    <div style={{ ...styles.sourceDoc, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.doc}</div>
                  </div>
                </div>
                <div style={{ ...styles.positionBadge, ...(s.notApplicable ? styles.positionBadgeMuted : {}) }}>{s.position}</div>
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <InfoBox label="サイズ" accent="#3C5A73" muted={s.notApplicable}>{s.size}</InfoBox>
                <InfoBox label="色" muted={s.notApplicable}>{s.colorInfo}</InfoBox>
                <p style={{ ...styles.sourceStance, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</p>
                <InfoBox label="例外・許容ケース" muted={s.notApplicable}>{s.exceptions}</InfoBox>
                <InfoBox label="アクセシビリティ(WCAG基準)" muted={s.notApplicable}>{s.accessibility}</InfoBox>
                <InfoBox label="ユースケース" muted={s.notApplicable}><UseCaseList items={s.useCases} muted={s.notApplicable} /></InfoBox>
                {s.confirmedNote && <p style={styles.confirmedNote}>{s.confirmedNote}</p>}
                {!s.notApplicable && (
                  <div style={styles.sourceFootRow}>
                    {s.searchHint && (
                      <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                    )}
                    <a href={s.url} target="_blank" rel="noreferrer" style={styles.sourceLink}>公式ページへ ↗</a>
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
                    <div style={{ ...styles.sourceName, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.name}</div>
                    <div style={{ ...styles.sourceDoc, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>位置づけ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.position}</div>))}
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : (s.notApplicable ? <span style={styles.mutedText}>該当なし</span> : null)}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                <div style={styles.labelCell}>サイズ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.size}</div>))}
                <div style={styles.labelCell}>色</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.colorInfo}</div>))}
                <div style={styles.labelCell}>基本方針</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.stance}</div>))}
                <div style={styles.labelCell}>例外・許容ケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.exceptionCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.exceptions}</div>))}
                <div style={styles.labelCell}>アクセシビリティ(WCAG基準)</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...(s.notApplicable ? styles.mutedText : {}) }}>{s.accessibility}</div>))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} muted={s.notApplicable} /></div>))}
                <div style={styles.labelCell}>リンク</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
                    {s.notApplicable ? (
                      <span style={styles.mutedText}>該当なし</span>
                    ) : (
                      <>
                        <a href={s.url} target="_blank" rel="noreferrer" style={styles.link}>公式ページへ ↗</a>
                        {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                      </>
                    )}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.linksRow}>
            <a href="/components/selection/date-time-picker" style={styles.linkCard}>
              <div style={styles.linkCardTitle}>日付・タイムピッカー ↗</div>
              <div style={styles.linkCardDesc}>同じカレンダーグリッドを、単一の日付・時刻を選ぶ入力コントロールという角度から詳しく比較</div>
            </a>
          </div>

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["情報の整理・一覧"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-09(W3C・NN groupは本文確認済み。Apple・Googleはカレンダーグリッドの挙動について検索結果による間接確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはUIDatePickerStyle.inlineの技術文書、GoogleはDate pickersページ(「日付・タイムピッカー」ページと同一URL)へのリンクです。WCAGはWAI-ARIA APGのGrid (Interactive Tabular Data) Patternのページ、NN groupは「日付・タイムピッカー」ページと同じ記事です。
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
  positionBadgeMuted: { color: "#B7BCDA", background: "#F3F4F9" },
  mutedText: { color: "#B7BCDA" },
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
