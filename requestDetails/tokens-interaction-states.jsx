import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「インタラクション状態」ページ。
 *
 * このページの発見: 状態の見た目を数値で体系化しているのはGoogleだけで、文字色と同じ色を
 * 半透明で重ねる「ステートレイヤー」の不透明度(ホバー8%・フォーカス10%・プレス10%・
 * ドラッグ16%、無効は38%)をトークンにしている。Appleは状態の一覧を共通では持たず、
 * tvOS(5状態)・visionOS(4状態)・iPadOSのポインタ効果のようにプラットフォームと入力方法ごとに
 * 定義し、システムの効果に任せることを基本にする。W3Cは状態の種類を定めず、状態を見分ける
 * コントラスト(3:1)と、状態を支援技術に伝えることを求める。NN groupは基本の5状態+2状態と、
 * 表示までの時間の目安(ホバーは150〜200msの遅延、フォーカス・プレスは100〜150ms以内)を示す。
 *
 * Apple(HIG Buttons・Focus and selection・Pointing devices)はHIGのページデータ(JSON)を直接取得して
 * 確認済み(2026-09)。tvOS・visionOSの状態名は、表の画像ファイル名・画像の代替テキストで確認。
 * Google(States)はJetpack ComposeのStateTokens.kt・FilledButtonTokens.kt(v0_210)と、
 * m2.material.ioのページデータ(JSON)で直接確認(2026-09、m3.material.ioはSPAのため本文は未確認)。
 * W3C(1.4.11・2.4.13・4.1.2)・NN group(Button States: Communicate Interaction)は本文を直接取得して
 * 確認済み(2026-09)。
 *
 * 2026-10 追記: ユーザーから「四サイト比較図の項目に具体的なイメージ図と数値を」というフィードバックを受け、
 * 各状態の行にGoogleのトークン値で描いたボタンのイメージ図(StateMini)と数値を追加した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Buttons / Focus and selection / Pointing devices",
    color: "#C2542A",
    position: "状態の見た目はシステムのコンポーネントに組み込まれており、独自に作るより標準の効果に任せることを基本にする。状態の種類はプラットフォームと入力方法ごとに定義される",
    size: "共通の一覧はなく、プラットフォームごとに定義されています。tvOSのフォーカスできる項目は5状態(Unfocused/Focused/Highlighted/Selected/Unavailable)、visionOSのボタンは4状態(Idle/Hover/Selected/Unavailable)。iPadOSのポインタにはhighlight・lift・hoverの3つの効果があります。独自のボタンには、押した状態(press state)を必ず用意するよう求めています。",
    visual: "iPadOS・macOSでは、フォーカスをリング(halo)かハイライトで示し、テキストフィールドや検索フィールドにはフォーカスリング、リストやコレクションには行全体のハイライトを使い分けます。tvOSはフォーカスした項目を拡大・浮き上がり・光・動きで目立たせ、visionOSは視線を向けた要素をハイライト(hover effect)で示します。ボタンの白い塗り+黒い文字は、トグルのオン状態を表す見た目としてシステムが予約しているため、独自のボタンに使わないよう求めています(visionOS)。",
    stance:
      "システムの効果はAppleのデバイスでの操作に合わせて精密に調整されており、それを使うことで一貫性と予測しやすさが得られるため、独自のフォーカス効果は本当に必要な場合だけにするよう求めています。利用者の操作なしにフォーカスを移動させないことも挙げています(ページ本文を直接確認、2026-09)。",
    exceptions:
      "iOSとwatchOSには、フォーカスの仕組みがありません。iPadOS・macOSのフルキーボードアクセスでは、ボタンやスライダーなどのコントロールにはシステムが到達させるため、アプリ側でフォーカスに対応させるのは、リスト項目・テキストフィールド・検索フィールドなどの内容要素だけでよいとしています。visionOSのボタンは、独自のhover effectに対応しません。",
    accessibility:
      "知覚可能・操作可能(Perceivable/Operable) ― 押した状態がないボタンは反応していないように感じられ、入力が受け付けられたか分からなくなるとしています。フォーカスの見た目は、キーボードやリモコン、ゲームコントローラーで操作する人が、いまどこにいるかを知るための手がかりです。",
    useCases: [
      "独自のボタンにも、押した状態を必ず用意する",
      "入力欄はフォーカスリング、リストは行のハイライトで示す",
      "独自のフォーカス効果は避け、システムの効果を使う",
    ],
    searchHint: "",
    url: "https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#Best-practices",
    urlSecondary: [
      { label: "Buttons ― Best practices(press state)", url: "https://developer.apple.com/design/human-interface-guidelines/buttons#Best-practices" },
      { label: "Focus and selection ― tvOS(5つの状態)", url: "https://developer.apple.com/design/human-interface-guidelines/focus-and-selection#tvOS" },
      { label: "Pointing devices ― Pointer shape and content effects", url: "https://developer.apple.com/design/human-interface-guidelines/pointing-devices#Pointer-shape-and-content-effects" },
    ],
    confirmedNote: "HIGのページデータを直接取得し、本文・見出しアンカーを確認済み(2026-09)。tvOS・visionOSの状態名は、ページデータ内の画像名・代替テキストで確認。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Interaction states(State layers)",
    color: "#2F7D6E",
    position: "状態を「ステートレイヤー」という半透明の重ね色で体系的に表し、状態ごとの不透明度をトークンとして数値化している",
    size: "M3のトークンでは、ホバー・フォーカス・プレス・ドラッグの4つの操作状態にステートレイヤーを定義し、これに有効(Enabled)・無効(Disabled)が加わります。旧版のM2では、選択(Selected)・アクティブ(Activated)・オン/オフ・エラーを含む11の状態を挙げていました。",
    visual: "ステートレイヤーは、要素の文字やアイコンと同じ色を半透明で重ねる方式です。不透明度は、ホバー8%・フォーカス10%・プレス10%・ドラッグ16%。無効状態は、文字とアイコンを38%、塗りの容器を10%の不透明度で表します(Jetpack Composeのトークン定義v0_210で確認)。M2では、ステートレイヤーは同時に1つだけ表示し、影(エレベーション)・色・アイコンの変化と組み合わせることもあるとしていました。",
    stance:
      "状態は、互いに、また周りのレイアウトとはっきり区別できる必要がある一方、部品の見た目を大きく変えすぎず、すべての部品で一貫して適用することを原則にしています。選択とホバーのように複数の状態が同時に起きたら、両方を示すとしています(M2の「States」ページの3原則 Distinct・Additive・Consistent。ページデータを直接取得して確認、2026-09)。",
    exceptions:
      "M2では、ステートレイヤーの不透明度を文字と背景の組み合わせごとに調整し、見やすさとコントラストを確保するよう求めていました(例: 白い背景ではホバー4%・フォーカス12%、紫の背景ではホバー8%・フォーカス24%)。ホバーは内容の邪魔にならないよう低く、フォーカスは他に視覚的な手がかりがないため高くする、という考え方です。",
    accessibility:
      "知覚可能(Perceivable) ― 無効状態は有効時の38%の不透明度で表示し、操作できないことを伝えます。WCAGの1.4.11は無効な部品をコントラストの要件から除外しているため、この表現と矛盾しません。",
    useCases: [
      "ホバー・フォーカス・プレスは、文字色と同じ色を半透明で重ねて表す",
      "無効状態は、文字・アイコン38%、容器10%の不透明度にする",
      "Webの実装(Material Web)では、フォーカスを重ね色に加えて太さ3px・外側2pxの輪郭線(フォーカスリング)でも示す",
      "状態が重なるときも、選択などの表示は消さずに残す",
    ],
    searchHint: "",
    url: "https://m3.material.io/foundations/interaction/states/state-layers",
    urlSecondary: [
      { label: "M2: States", url: "https://m2.material.io/design/interaction/states.html" },
      { label: "Jetpack Compose: StateTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StateTokens.kt" },
      { label: "Material Web: フォーカスリングのトークン(GitHub)", url: "https://github.com/material-components/material-web/blob/main/tokens/_md-comp-focus-ring.scss" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。不透明度はJetpack Composeのトークン定義(v0_210)で、状態の原則・種類はM2のページデータで直接確認(2026-09)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.11 Non-text Contrast / 2.4.7 Focus Visible / 2.4.13 Focus Appearance / 4.1.2 Name, Role, Value",
    color: "#A3821F",
    position: "状態の種類や見た目は定めず、「状態を見分けられるコントラスト」と「状態を支援技術に伝えること」を求める",
    size: "部品やその状態を見分けるのに必要な見た目(枠線・チェックの印など)は、隣り合う色に対して3:1以上(1.4.11・レベルAA)。ホバー・押下などの状態どうしの差をすべて3:1にすることまでは求めていません。フォーカスは別の基準で、実務の目標(AA)はフォーカスが見えること(2.4.7)と、フォーカスした部品が他の内容に隠れないこと(2.4.11)。さらに厳しいレベルAAAの2.4.13では、フォーカスの表示が、フォーカスしていない部品の周囲を2 CSSピクセルの太さで囲んだ面積以上の大きさで、フォーカス時と非フォーカス時の同じピクセル同士で3:1以上の変化があること(2.4.13・レベルAAA)。",
    visual: "見た目の作り方は自由です。ただし、選択・オン/オフなどの状態を示す見た目(印や枠線)は、隣り合う色と3:1以上にする必要があります。隣り合って表示されない状態どうしの色の変化は、3:1でなくてもかまわないとしています(Understanding 1.4.11)。見た目とは別に、利用者が変えられる状態(チェック・展開・選択など)は、プログラムで判別・設定でき、変化が支援技術に通知されること(4.1.2・レベルA)を求めています。",
    glossary: [
      { term: "1.4.11 Non-text Contrast・レベルAA", desc: "UI部品とその状態を見分けるための視覚情報、意味のある図形に、隣接する色との3:1以上のコントラストを求める基準。" },
      { term: "2.4.7 Focus Visible・レベルAA", desc: "キーボードで操作するとき、どこにフォーカスがあるかが見えることを求める基準。実務の目標(AA)になる。" },
      { term: "2.4.13 Focus Appearance・レベルAAA", desc: "2.4.7のフォーカス表示の大きさとコントラストを、さらに厳しくした基準。大きさは2 CSSピクセルの外周相当以上、表示前後の変化は3:1以上。" },
      { term: "4.1.2 Name, Role, Value・レベルA", desc: "UI部品の名前・役割と、状態・値をプログラムで判別でき、変化が支援技術に通知されることを求める基準。" },
    ],
    stance:
      "中程度のロービジョンの人でも部品とその状態を見分けられるよう、大きな文字と同じ3:1を求めています。3:1はしきい値として扱い、2.999:1のように四捨五入して合格にはできないとしています(Understandingページの本文を直接確認、2026-09)。キーボードの移動順序と、フォーカスが見えること自体(2.4.3・2.4.7)の詳しい比較は「キーボードナビゲーション」ページ(サイドバーの「トークン / インタラクション」にあります)を参照してください。",
    exceptions:
      "無効(inactive)な部品は、コントラストの要件の対象外です。ブラウザ標準の見た目を作者が変更していない部品も対象外です。2.4.13も、フォーカス表示をブラウザが決めていて作者が調整できない場合などは除外され、レベルAAAです。",
    accessibility: "知覚可能・操作可能・堅牢(Perceivable/Operable/Robust) ― 1.4.11は「知覚可能」、2.4.7・2.4.13は「操作可能」、4.1.2は「堅牢」に属します。目に見える状態と、支援技術に伝わる状態の両方をそろえることが求められます。",
    useCases: [
      "選択・オン/オフなど状態を示す見た目(チェックの印・枠など)を、隣の色に対して3:1以上にする(ホバー・押下など状態どうしの差を3:1にする必要はない)",
      "フォーカスがどこにあるかを必ず見えるようにする(2.4.7・AA)。より高い水準(2.4.13・AAA)を目指すなら、2px相当以上の太さで3:1以上の変化をつける",
      "aria-pressed・aria-expandedなどで、状態を支援技術に伝える",
    ],
    searchHint: "Inactive User Interface Components",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#success-criterion",
    urlSecondary: [
      { label: "2.4.7 Focus Visible", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html" },
      { label: "2.4.13 Focus Appearance", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html#success-criterion" },
      { label: "4.1.2 Name, Role, Value", url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html#success-criterion" },
    ],
    confirmedNote: "3つのUnderstandingページの本文を直接取得して確認済み(2026-09)。ページ内検索の語は1.4.11のページのものです。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Button States: Communicate Interaction",
    color: "#7A4F7E",
    position: "ボタンの状態を、デザインシステムに含めるべき基本セットとして整理し、表示までの時間の目安も示す実務指針(適合基準ではない)",
    size: "基本の5状態(有効・無効・ホバー・フォーカス・プレス)に、読み込み中と選択を加えた7状態を挙げています。表示の目安は、ホバーが約150〜200msの遅延(マウスが通り過ぎただけで反応しないように)、フォーカスとプレスは100〜150ms以内です。",
    visual: "有効はコントラストが高く読みやすい表示、無効はグレーなど彩度を落とした低コントラスト(ただし読める程度)、ホバーは背景をわずかに暗くしてカーソルを手の形に、フォーカスは色の変化だけでなく輪郭線(アウトライン)で示すことを強く勧めています。読み込み中はラベルの左にスピナーを置きます。選択はチェックボックスやラジオボタンの状態で、ボタンのプレスとは別物としています。",
    stance:
      "押せるのか押せないのか、押したことが伝わったのかが分からないと、利用者は戸惑い、何度も押してしまいます。状態は小さな視覚的手がかりで伝えるものなので、実際の利用者でテストし、見分けられるか確認するよう勧めています(記事本文を直接取得して確認、2026-09)。",
    exceptions:
      "ホバーは、マウスを使わない利用者(スマートフォンなど)には見えません。無効なボタンに aria-disabled=\"true\" を付けると、タブでフォーカスはできるまま、スクリーンリーダーに無効であることが伝わるとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、ユーザビリティの観察に基づく設計上の根拠です。フォーカスを色だけで示すと、視覚に障害のある人には伝わらない場合があるとしています。",
    useCases: [
      "ホバーには150〜200msの遅延を入れる",
      "プレスのフィードバックは100〜150ms以内に表示する",
      "フォーカスは輪郭線で示し、色の変化だけに頼らない",
    ],
    searchHint: "Focus State",
    url: "https://www.nngroup.com/articles/button-states-communicate-interaction/#toc-button-states-explained-1",
    urlSecondary: [{ label: "Other States: Loading and Selected", url: "https://www.nngroup.com/articles/button-states-communicate-interaction/#toc-other-states-loading-and-selected-2" }],
    confirmedNote: "記事本文を直接取得して確認済み(2026-09、2025年4月公開の記事)。",
  },
];

/* 画像エリア: ステートレイヤーによる状態の表し方(Googleのトークン値で描画した概念図) */
const STATES = [
  { name: "有効", sub: "Enabled", layer: 0 },
  { name: "ホバー", sub: "+8%", layer: 0.08 },
  { name: "フォーカス", sub: "+10%・輪郭", layer: 0.1, ring: true },
  { name: "プレス", sub: "+10%", layer: 0.1 },
  { name: "ドラッグ", sub: "+16%・影", layer: 0.16, shadow: true },
  { name: "無効", sub: "38% / 10%", disabled: true },
];

function StateSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 480 96" width="100%" style={{ maxWidth: 600, display: "block", margin: "0 auto" }} role="img" aria-label="ボタンの6つの状態の見た目の例">
      <defs>
        <filter id="dspStateShadow" x="-20%" y="-30%" width="140%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#171B36" floodOpacity="0.28" />
        </filter>
      </defs>
      {STATES.map((s, i) => {
        const x = 8 + i * 79;
        return (
          <g key={s.name}>
            {s.ring && <rect x={x - 3} y="11" width="72" height="34" rx="19" fill="none" stroke="#171B36" strokeWidth="2" />}
            {s.disabled ? (
              <g>
                <rect x={x} y="14" width="66" height="28" rx="14" fill="#1B1B21" fillOpacity="0.1" />
                <text x={x + 33} y="32" fontSize="10" fill="#1B1B21" fillOpacity="0.38" textAnchor="middle" fontFamily={font}>ボタン</text>
              </g>
            ) : (
              <g filter={s.shadow ? "url(#dspStateShadow)" : undefined}>
                <rect x={x} y="14" width="66" height="28" rx="14" fill="#3F51B5" />
                <rect x={x} y="14" width="66" height="28" rx="14" fill="#FFFFFF" fillOpacity={s.layer} />
                <text x={x + 33} y="32" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontFamily={font}>ボタン</text>
              </g>
            )}
            <text x={x + 33} y="64" fontSize="10" fill="#171B36" fontWeight="600" textAnchor="middle" fontFamily={font}>{s.name}</text>
            <text x={x + 33} y="78" fontSize="8.5" fill="#7E86AC" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{s.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* 四サイト比較図: どの状態を定義しているか(◯=定義あり/△=部分的・条件付き/―=確認した範囲で定義なし) */
const STATE_ROWS = [
  { key: "enabled", label: "有効(通常)", num: "重ね色 0%", cells: [{ mark: "◯", note: "visionOS: Idle/tvOS: Unfocused" }, { mark: "◯", note: "Enabled(重ね色なし)" }, { mark: "△", note: "部品を見分ける境界は隣の色と3:1以上(1.4.11)" }, { mark: "◯", note: "高コントラストで読みやすく" }] },
  { key: "hover", label: "ホバー", num: "+8%", cells: [{ mark: "◯", note: "visionOS: 視線でハイライト/iPadOS: ポインタのhighlight・lift・hoverの3効果" }, { mark: "◯", note: "文字色を8%重ねる" }, { mark: "―", note: "" }, { mark: "◯", note: "150〜200ms待ってから表示・背景をわずかに暗く・カーソルを手の形に" }] },
  { key: "focus", label: "フォーカス", num: "+10%・輪郭", cells: [{ mark: "◯", note: "入力欄はリング、リストは行のハイライト(iOS・watchOSはフォーカスなし)" }, { mark: "◯", note: "文字色を10%重ねる。Webの実装(Material Web)では太さ3pxの輪郭線(フォーカスリング)も出す" }, { mark: "◯", note: "フォーカスが見えること(2.4.7・AA)。AAAの2.4.13は2 CSS px相当の外周以上・前後の変化3:1以上とさらに厳しい" }, { mark: "◯", note: "色だけでなく輪郭線で・100〜150ms以内" }] },
  { key: "press", label: "プレス", num: "+10%", cells: [{ mark: "◯", note: "独自ボタンにも必須(tvOS: Highlighted)" }, { mark: "◯", note: "文字色を10%重ねる" }, { mark: "―", note: "" }, { mark: "◯", note: "100〜150ms以内に反応を表示" }] },
  { key: "selected", label: "選択", num: "オン/オフ", cells: [{ mark: "◯", note: "Selected(tvOS・visionOS)" }, { mark: "△", note: "M2で定義(Selected・Activated)。選択とホバーが重なれば両方を示す" }, { mark: "◯", note: "状態を示す印や枠は隣の色と3:1(1.4.11)+状態を支援技術へ(4.1.2)" }, { mark: "△", note: "ボタンではなく、チェックボックス・ラジオの状態" }] },
  { key: "drag", label: "ドラッグ", num: "+16%・影", cells: [{ mark: "―", note: "" }, { mark: "◯", note: "文字色を16%重ねる(影と組み合わせることも)" }, { mark: "―", note: "" }, { mark: "―", note: "" }] },
  { key: "disabled", label: "無効", num: "文字38%・容器10%", cells: [{ mark: "◯", note: "Unavailable" }, { mark: "◯", note: "文字・アイコン38%、塗りの容器10%の不透明度" }, { mark: "△", note: "コントラストの要件の対象外" }, { mark: "◯", note: "彩度を落とした低コントラスト(読める程度)+aria-disabled" }] },
  { key: "loading", label: "読み込み中", num: "スピナー", cells: [{ mark: "―", note: "" }, { mark: "―", note: "" }, { mark: "―", note: "" }, { mark: "◯", note: "ラベルの左にスピナー" }] },
];

const MARK_COLORS = { "◯": "#2E6B3A", "△": "#8A6A10", "―": "#B7BCDA" };

/* 各状態のイメージ図(Googleのトークン値で描いたボタン) */
function StateMini({ k }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const base = "#3F51B5";
  const btn = (layer, extra) => (
    <g>
      <rect x="6" y="10" width="72" height="26" rx="13" fill={base} />
      {layer > 0 && <rect x="6" y="10" width="72" height="26" rx="13" fill="#FFFFFF" fillOpacity={layer} />}
      <text x={k === "loading" ? 48 : 42} y="27" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontFamily={font}>ボタン</text>
      {extra}
    </g>
  );
  let body;
  if (k === "enabled") body = btn(0);
  if (k === "hover") body = btn(0.08, <path d="M66 26 l0 12 l3 -3 l2.5 5 l2 -1 l-2.5 -5 l4 0 z" fill="#171B36" stroke="#FFFFFF" strokeWidth="0.8" />);
  if (k === "focus") body = btn(0.1, <rect x="2" y="6" width="80" height="34" rx="17" fill="none" stroke="#171B36" strokeWidth="2" />);
  if (k === "press") body = btn(0.1, <g><circle cx="52" cy="23" r="9" fill="#FFFFFF" fillOpacity="0.25" /><circle cx="52" cy="23" r="3" fill="#FFFFFF" fillOpacity="0.6" /></g>);
  if (k === "drag") body = (
    <g>
      <rect x="10" y="16" width="72" height="26" rx="13" fill="#171B36" opacity="0.15" />
      {btn(0.16)}
    </g>
  );
  if (k === "disabled") body = (
    <g>
      <rect x="6" y="10" width="72" height="26" rx="13" fill="#1B1B21" fillOpacity="0.1" />
      <text x="42" y="27" fontSize="10" fill="#1B1B21" fillOpacity="0.38" textAnchor="middle" fontFamily={font}>ボタン</text>
    </g>
  );
  if (k === "loading") body = btn(0, <g><circle cx="22" cy="23" r="5" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" /><path d="M22 18 a5 5 0 0 1 5 5" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" /></g>);
  if (k === "selected") body = (
    <g>
      <rect x="6" y="14" width="16" height="16" rx="3" fill={base} />
      <path d="M9.5 22 l3.5 3.5 l6 -7" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <text x="27" y="26" fontSize="9.5" fill="#171B36" fontFamily={font}>オン</text>
      <rect x="48" y="14" width="16" height="16" rx="3" fill="none" stroke="#565D8A" strokeWidth="1.6" />
      <text x="68" y="26" fontSize="9.5" fill="#565D8A" fontFamily={font}>オフ</text>
    </g>
  );
  return <svg viewBox="0 0 86 44" width="86" height="44" role="img" aria-label={`${k}の状態の例`}>{body}</svg>;
}

/* 四サイト比較図の各セルのイメージ(2026-10、「4サイトのセルにも具体的なイメージが欲しい」というフィードバックで追加)。
   各系列が書いている見せ方を、セルの注記に沿って描いた概念図。色・寸法は各系列の実際の値ではなく説明用。 */
const CELL_SYS = ["apple", "google", "wcag", "nn"];

function CellMini({ k, sys }) {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const indigo = "#3F51B5";
  const pill = (fill, opts = {}) => (
    <g>
      <rect x={opts.x ?? 10} y={opts.y ?? 7} width={opts.w ?? 56} height="20" rx="10" fill={fill} stroke={opts.stroke} strokeWidth={opts.sw} fillOpacity={opts.fo} />
      {opts.layer > 0 && <rect x={opts.x ?? 10} y={opts.y ?? 7} width={opts.w ?? 56} height="20" rx="10" fill="#FFFFFF" fillOpacity={opts.layer} />}
      <text x={(opts.x ?? 10) + (opts.w ?? 56) / 2 + (opts.tx ?? 0)} y={(opts.y ?? 7) + 13.5} fontSize="8.5" fill={opts.tc || "#FFFFFF"} fillOpacity={opts.to} textAnchor="middle" fontFamily={font}>{opts.label || "ボタン"}</text>
    </g>
  );
  const tag = (x, t, c = "#565D8A") => <text x={x} y="31" fontSize="7" fill={c} fontFamily={mono}>{t}</text>;
  const arrow = <path d="M58 19 l0 10 l2.5 -2.5 l2 4 l1.6 -0.8 l-2 -4 l3.4 0 z" fill="#171B36" stroke="#FFFFFF" strokeWidth="0.7" />;
  const hand = <g><path d="M60 17 v7 M60 17 a1.4 1.4 0 0 1 2.8 0 v4 M62.8 20 a1.4 1.4 0 0 1 2.8 0 v2 M65.6 21 a1.4 1.4 0 0 1 2.8 0 v4 c0 4 -2 6 -5 6 h-1 c-2 0 -3 -1 -4 -3 l-2 -4 a1.3 1.3 0 0 1 2.2 -1.3 l1.2 1.6" fill="#FFFFFF" stroke="#171B36" strokeWidth="1" strokeLinejoin="round" /></g>;
  const id = `${k}-${sys}`;
  let body = null;
  switch (id) {
    case "enabled-apple": body = pill("#E5E5EA", { tc: "#171B36" }); break;
    case "enabled-google": body = pill(indigo); break;
    case "enabled-wcag": body = <g>{pill("#FFFFFF", { stroke: "#767676", sw: 1.2, tc: "#171B36" })}{tag(70, "3:1", "#A3821F")}</g>; break;
    case "enabled-nn": body = pill("#171B36", { label: "ボタン" }); break;
    case "hover-apple": body = <g><rect x="6" y="3" width="64" height="28" rx="14" fill="#C2542A" fillOpacity="0.12" />{pill("#E5E5EA", { tc: "#171B36" })}<circle cx="60" cy="22" r="5" fill="#8E8E93" fillOpacity="0.55" /></g>; break;
    case "hover-google": body = <g>{pill(indigo, { layer: 0.08 })}{arrow}{tag(70, "+8%", "#2F7D6E")}</g>; break;
    case "hover-nn": body = <g>{pill("#2B2F4F", {})}{hand}{tag(72, "150ms", "#7A4F7E")}</g>; break;
    case "focus-apple": body = <g><rect x="6" y="5" width="64" height="24" rx="6" fill="none" stroke="#0A84FF" strokeWidth="2.5" strokeOpacity="0.6" /><rect x="9" y="8" width="58" height="18" rx="4" fill="#FFFFFF" stroke="#C7C7CC" /><line x1="14" x2="14" y1="12" y2="22" stroke="#0A84FF" strokeWidth="1.2" /><text x="18" y="20" fontSize="7.5" fill="#9EA4C4" fontFamily={font}>入力欄</text></g>; break;
    case "focus-google": body = <g>{pill(indigo, { layer: 0.1 })}{tag(70, "+10%", "#2F7D6E")}</g>; break;
    case "focus-wcag": body = <g><rect x="6" y="3" width="64" height="28" rx="14" fill="none" stroke="#171B36" strokeWidth="2" />{pill(indigo)}{tag(72, "2px", "#A3821F")}</g>; break;
    case "focus-nn": body = <g><rect x="6" y="3" width="64" height="28" rx="14" fill="none" stroke="#7A4F7E" strokeWidth="2" strokeDasharray="0" />{pill(indigo)}{tag(72, "≤150", "#7A4F7E")}</g>; break;
    case "press-apple": body = <g>{pill("#C7C7CC", { x: 13, w: 50, tc: "#171B36" })}<text x="68" y="20" fontSize="7" fill="#7E86AC" fontFamily={font}>縮む</text></g>; break;
    case "press-google": body = <g>{pill(indigo, { layer: 0.1 })}<circle cx="44" cy="17" r="8" fill="#FFFFFF" fillOpacity="0.3" /><circle cx="44" cy="17" r="3" fill="#FFFFFF" fillOpacity="0.6" /></g>; break;
    case "press-nn": body = <g>{pill(indigo, { layer: 0.1 })}<circle cx="50" cy="20" r="5" fill="#7A4F7E" fillOpacity="0.35" />{tag(70, "≤150", "#7A4F7E")}</g>; break;
    case "selected-apple": body = <g><rect x="6" y="7" width="64" height="20" rx="10" fill="#E5E5EA" /><rect x="8" y="9" width="30" height="16" rx="8" fill="#FFFFFF" /><text x="23" y="20" fontSize="7.5" fill="#171B36" textAnchor="middle" fontFamily={font}>選択</text><text x="53" y="20" fontSize="7.5" fill="#7E86AC" textAnchor="middle" fontFamily={font}>―</text></g>; break;
    case "selected-google": body = <g><rect x="6" y="7" width="58" height="20" rx="6" fill="#E8DEF8" /><path d="M12 17 l3 3 l5 -6" stroke="#1D192B" strokeWidth="1.6" fill="none" /><text x="40" y="20" fontSize="8" fill="#1D192B" textAnchor="middle" fontFamily={font}>チップ</text></g>; break;
    case "selected-wcag": body = <g><rect x="8" y="9" width="16" height="16" rx="3" fill={indigo} /><path d="M11.5 17 l3.5 3.5 l6 -7" stroke="#FFFFFF" strokeWidth="2" fill="none" /><path d="M32 13 h3 l4 -3 v14 l-4 -3 h-3 z" fill="#A3821F" /><text x="43" y="20" fontSize="7" fill="#454C78" fontFamily={mono}>checked</text></g>; break;
    case "selected-nn": body = <g><rect x="8" y="9" width="14" height="14" rx="3" fill={indigo} /><path d="M11 16 l3 3 l5 -6" stroke="#FFFFFF" strokeWidth="1.8" fill="none" /><circle cx="40" cy="16" r="7" fill="none" stroke={indigo} strokeWidth="1.5" /><circle cx="40" cy="16" r="3.5" fill={indigo} /><text x="52" y="19" fontSize="7" fill="#7E86AC" fontFamily={font}>部品側</text></g>; break;
    case "drag-google": body = <g><rect x="14" y="12" width="56" height="20" rx="10" fill="#171B36" opacity="0.18" />{pill(indigo, { x: 8, y: 5, layer: 0.16 })}{tag(70, "+16%", "#2F7D6E")}</g>; break;
    case "disabled-apple": body = pill("#E5E5EA", { tc: "#171B36", to: 0.3, fo: 0.6 }); break;
    case "disabled-google": body = <g>{pill("#1B1B21", { fo: 0.1, tc: "#1B1B21", to: 0.38 })}{tag(70, "38/10%", "#2F7D6E")}</g>; break;
    case "disabled-wcag": body = <g>{pill("#1B1B21", { fo: 0.1, tc: "#1B1B21", to: 0.38 })}{tag(70, "対象外", "#A3821F")}</g>; break;
    case "disabled-nn": body = <g>{pill("#9EA4C4", { tc: "#FFFFFF", to: 0.85 })}{tag(70, "aria-", "#7A4F7E")}</g>; break;
    case "loading-nn": body = <g>{pill(indigo, { tx: 6 })}<circle cx="22" cy="17" r="4.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.8" /><path d="M22 12.5 a4.5 4.5 0 0 1 4.5 4.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" /></g>; break;
    default: return null;
  }
  return <svg viewBox="0 0 96 34" width="128" height="45" style={{ display: "block", margin: "2px 0" }} role="img" aria-label={`${k}の状態の例(${sys})`}>{body}</svg>;
}

function StateMatrix() {
  const names = ["Apple", "Google", "W3C", "NN group"];
  const colors = ["#C2542A", "#2F7D6E", "#A3821F", "#7A4F7E"];
  return (
    <div style={styles.ruleScroll}>
      <div style={styles.ruleGrid}>
        <div style={styles.ruleHead}>状態とイメージ</div>
        {names.map((n, i) => (<div key={n} style={{ ...styles.ruleHead, color: colors[i] }}>{n}</div>))}
        {STATE_ROWS.map((r) => (
          <React.Fragment key={r.label}>
            <div style={styles.ruleLabel}>
              <div>{r.label}</div>
              <StateMini k={r.key} />
              <span style={styles.ruleNum}>{r.num}</span>
            </div>
            {r.cells.map((c, i) => (
              <div key={i} style={styles.ruleCell}>
                <span style={{ ...styles.ruleMark, color: MARK_COLORS[c.mark] }}>{c.mark}</span>
                {c.mark !== "―" && <CellMini k={r.key} sys={CELL_SYS[i]} />}
                {c.note && <span style={styles.ruleNote}>{c.note}</span>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* 参考図: 状態の数値(Googleの不透明度と、NN groupの表示までの時間) */
function StateNumbersChart() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const mono = "'IBM Plex Mono', monospace";
  const opacity = [
    { label: "ホバー", v: 8 },
    { label: "フォーカス", v: 10 },
    { label: "プレス", v: 10 },
    { label: "ドラッグ", v: 16 },
    { label: "無効(文字)", v: 38 },
  ];
  const timing = [
    { label: "フォーカス", from: 100, to: 150 },
    { label: "プレス", from: 100, to: 150 },
    { label: "ホバー(遅延)", from: 150, to: 200 },
  ];
  const oX = (v) => 92 + (v / 40) * 160;
  const tX = (ms) => 382 + (ms / 250) * 170;
  return (
    <svg viewBox="0 0 580 116" width="100%" style={{ maxWidth: 680, display: "block", margin: "0 auto" }} role="img" aria-label="Googleのステートレイヤーの不透明度と、NN groupの表示時間の目安">
      <text x="0" y="14" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Google ― 不透明度(%)</text>
      {opacity.map((o, i) => (
        <g key={o.label}>
          <text x="86" y={38 + i * 20} fontSize="9.5" fill="#454C78" textAnchor="end" fontFamily={font}>{o.label}</text>
          <rect x="92" y={29 + i * 20} width={oX(o.v) - 92} height="12" fill="#2F7D6E" fillOpacity={o.label.startsWith("無効") ? 0.35 : 0.8} />
          <text x={oX(o.v) + 5} y={38 + i * 20} fontSize="9" fill="#2F7D6E" fontFamily={mono}>{o.v}</text>
        </g>
      ))}
      <text x="300" y="14" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>NN group ― 表示までの時間(ms)</text>
      {[0, 50, 100, 150, 200, 250].map((ms) => (
        <g key={ms}>
          <line x1={tX(ms)} x2={tX(ms)} y1="28" y2="94" stroke="#EEF0F7" />
          <text x={tX(ms)} y="106" fontSize="8.5" fill="#9EA4C4" textAnchor="middle" fontFamily={mono}>{ms}</text>
        </g>
      ))}
      {timing.map((t, i) => (
        <g key={t.label}>
          <text x="376" y={42 + i * 22} fontSize="9.5" fill="#454C78" textAnchor="end" fontFamily={font}>{t.label}</text>
          <rect x={tX(t.from)} y={33 + i * 22} width={tX(t.to) - tX(t.from)} height="12" fill="#7A4F7E" fillOpacity="0.75" />
        </g>
      ))}
    </svg>
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

export default function TokensInteractionStatesPage() {
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
        <SidebarNav currentPath="/tokens/interaction-states" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / インタラクション / インタラクション状態</span>
            <span>SPEC No. 051</span>
          </div>

          <h1 style={styles.title}>インタラクション状態</h1>
          <p style={styles.subtitle}>4つのガイドラインが、ホバー・フォーカス・プレス・無効などの状態をどう定義し、どう見せ、どう伝えるかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>ステートレイヤー(同じボタンに、状態ごとの半透明の色を重ねる)</span>
            <StateSwatch />
            <p style={styles.swatchNote}>Googleのトークン値(ホバー8%・フォーカス10%・プレス10%・ドラッグ16%、無効は文字38%・容器10%)で描いた概念図です。フォーカスの輪郭線とドラッグの影は、NN groupの「フォーカスは輪郭線で」とM2の「影と組み合わせることもある」を参考に加えています。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              4系列で共通する中心の状態は、<strong>有効・ホバー・フォーカス・プレス・無効</strong>の5つです。NN groupはこれをボタンの基本セットとし、Googleもこの5つ(+ドラッグ)にトークンを定義しています。Appleは共通の一覧を持たず、<strong>tvOSは5状態・visionOSは4状態</strong>のように、プラットフォームと入力方法ごとに定義しています。
            </p>
            <p style={styles.synthesisText}>
              見せ方を数値で決めているのはGoogleだけで、<strong>文字色と同じ色を半透明で重ねる「ステートレイヤー」</strong>の不透明度を、<strong>ホバー8%・フォーカス10%・プレス10%・ドラッグ16%、無効は38%</strong>としています。Appleは<strong>独自の効果を作らず、システムの効果に任せる</strong>ことを基本にし、そのうえで独自のボタンにも押した状態を必ず用意するよう求めています。
            </p>
            <p style={styles.synthesisText}>
              W3Cは状態の種類を定めず、<strong>部品や状態を見分けるための見た目を、隣り合う色と3:1以上にすること</strong>(すべての状態どうしの差を3:1にすることではありません)、<strong>フォーカスが見えること(2.4.7・AA)</strong>、<strong>状態を支援技術にも伝えること</strong>を求めます。無効な部品はコントラストの対象外なので、Googleの38%やNN groupの「読める程度の低コントラスト」と矛盾しません。
            </p>
            <p style={styles.synthesisText}>
              実務で特に役立つのが、NN groupの<strong>時間の目安(ホバーは150〜200ms待ってから、フォーカスとプレスは100〜150ms以内に)</strong>と、<strong>フォーカスは色だけでなく輪郭線で示す</strong>という点です。これはW3Cの2.4.7(フォーカスが見えること・AA)を確実に満たす方法で、より厳しい2.4.13(AAA。2px相当の太さ・3:1の変化)にも近づきます。GoogleもWebの実装(Material Web)では、重ね色に加えて太さ3pxのフォーカスリングを出します。状態の見た目をトークンでそろえ、輪郭線のフォーカスと支援技術への通知を組み合わせるのが、4系列を合わせた結論です。
            </p>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― どの状態を定義しているか</h2>
            <StateMatrix />
            <p style={styles.chartNote}>各セルの小さな図は、その系列が書いている見せ方を注記に沿って描いた概念図です(色・寸法は説明用)。左端のイメージ図は、Googleのトークン値(重ね色の不透明度)で描いたボタンで、緑の数値はその値です。フォーカスの輪郭線・ドラッグの影・読み込み中のスピナーは、NN groupとM2の記述を参考に加えています。◯=定義・明記されている、△=部分的・条件付き、―=確認した範囲では定義なし。W3Cは状態の一覧を持たないため、状態ごとに関係する達成基準を記載しています。ホバーやフォーカスで現れる内容の扱い(1.4.13)は、状態の見た目ではないためこの表には含めていません。</p>
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
                <InfoBox label="状態の種類" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="見た目の表し方">{s.visual}</InfoBox>
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
            <h2 style={styles.diagramTitle}>インタラクション状態 デザインシステム比較</h2>
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
                <div style={styles.labelCell}>状態の種類</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>見た目の表し方</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s.visual}</div>))}
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
                    {s.confirmedNote && <span style={styles.confirmedNoteSmall}>{s.confirmedNote}</span>}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>参考 ― 状態の数値(不透明度と表示までの時間)</h2>
            <StateNumbersChart />
            <p style={styles.chartNote}>左はGoogle(Jetpack Composeのトークン定義v0_210)のステートレイヤーの不透明度、右はNN groupの記事の時間の目安です。ホバーは誤反応を防ぐための「待ち時間」、フォーカスとプレスは「この時間内に表示する」という上限です。AppleとW3Cは、状態の不透明度や表示時間の数値を示していません。</p>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)", "堅牢(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎", "操作方法(タッチ・キーボード)"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(①AIレビュー(1回目)の指摘を反映)/ 初回の確認 2026-09(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、不透明度はGoogle公式のトークン定義、状態の原則はM2のページデータで確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIG Focus and selectionページの「Best practices」見出しへのアンカー付きリンクで、Buttons(押した状態)・tvOSの5状態・iPadOSのポインタ効果の各見出しも併記しています。GoogleはM3のState layersページに加え、M2のStatesページと、数値を確認したGitHub上のトークン定義を併記しています。WCAGは1.4.11・2.4.13・4.1.2の各Understandingページの基準本文です。NN groupはボタンの状態の解説の節と、読み込み中・選択の節です。
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
  swatchNote: { fontSize: 11, color: "#7E86AC", margin: "14px 0 0", lineHeight: 1.6, textAlign: "left" },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  chartCard: { border: "1px solid #E1E3F0", borderRadius: 6, padding: "16px 16px 12px", marginBottom: 22 },
  chartNote: { fontSize: 11, color: "#7E86AC", margin: "10px 0 0", lineHeight: 1.6 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  reduceCard: { background: "#F8F9FD", borderRadius: 4, padding: "12px 14px" },
  reduceLead: { fontSize: 11, color: "#7E86AC", margin: "2px 0 8px" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#7E86AC", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, marginBottom: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#9EA4C4", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  confirmedNoteSmall: { fontSize: 9.5, color: "#9EA4C4", lineHeight: 1.5, fontStyle: "italic", marginTop: 4 },
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
  ruleScroll: { overflowX: "auto" },
  ruleGrid: { display: "grid", gridTemplateColumns: "130px repeat(4, minmax(120px, 1fr))", minWidth: 640, border: "1px solid #E1E3F0", borderRadius: 4 },
  ruleHead: { fontSize: 11.5, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#FFFFFF" },
  ruleLabel: { fontSize: 11, color: "#454C78", fontWeight: 600, padding: "8px 10px", borderBottom: "1px solid #E1E3F0", background: "#F8F9FD", lineHeight: 1.5 },
  ruleCell: { padding: "8px 10px", borderBottom: "1px solid #E1E3F0", borderLeft: "1px solid #EEF0F7", display: "flex", flexDirection: "column", gap: 2 },
  ruleMark: { fontSize: 15, fontWeight: 700, lineHeight: 1.1 },
  ruleNum: { display: "inline-block", fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", fontSize: 9.5, fontWeight: 600, color: "#FFFFFF", background: "#2F7D6E", borderRadius: 3, padding: "1px 5px" },
  ruleNote: { fontSize: 10.5, color: "#565D8A", lineHeight: 1.5 },
};
