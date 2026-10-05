import React from "react";
import SidebarNav from "./sidebar-nav";

/**
 * トークン/ファウンデーションレイヤー「シェイプ・コーナーラジウス(角丸)」ページ。
 *
 * このページの発見: 角丸の「段階(スケール)」を持つのはGoogleだけで、0〜48dp+Fullの
 * 10段階を定義している。Appleには角丸の専用ページも数値の段階もなく、代わりにツールバー・
 * ライブアクティビティ・ウィジェット・アプリアイコンなどのページに「内側の角丸を外枠と
 * 同心(concentric)にそろえる」という共通の考え方が分散して書かれている。W3Cは形そのもの
 * を規定せず、ボタンに枠(形)が無くても文字で識別できれば適合とする。NN groupは形を
 * 「押せることを示す手がかり(シグニファイア)」として扱い、手がかりの弱いUIは探す時間が
 * 22%長くなるという調査を示している。
 *
 * Apple(HIG Toolbars・Live Activities・Widgets・App icons・Buttons)はHIGのページデータ(JSON)
 * を全ページ取得して記述箇所を確認済み(2026-09)。Google(Shape)はMaterial Components for
 * Androidのドキュメントと、Jetpack Composeのトークン定義・MaterialShapesのソースで直接確認
 * (2026-09)。W3C(1.4.11/2.5.8)・NN group(Flat-Design Best Practices、Flat UI Elements
 * Attract Less Attention and Cause Uncertainty)は本文を直接取得して確認済み(2026-09)。
 *
 * 2026-10 追記: ユーザーから「ラジウスの使い分け、具体的な数値と使用用途を書いて」「Appleも基準はあるのでは」
 * 「角丸と角丸100%の使い分けも気になる」というフィードバックを受け、(1)Googleの段階ごとの使用部品
 * (Composeの各部品のトークン定義の既定値)、(2)Appleの形の種類(HIGの全ページを再検索、SwiftUIの
 * ButtonBorderShape・ConcentricRectangleの定義)、(3)固定値とFull/カプセルの場面別の使い分け
 * (Material Components for AndroidのCommon buttons・Button groupsのドキュメントを含む)を追加した。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Toolbars / Live Activities / Widgets ほか",
    color: "#C2542A",
    position: "角丸の専用ページや数値の段階は持たず、形の種類(四角・固定値の角丸・カプセル・円・同心・自動)を部品と場面で使い分ける方式。中心にあるのは「内側の角丸を外枠と同心(concentric)にそろえる」という原則",
    size: "Googleのような角丸の段階(スケール)はありません。基準は数値ではなく「形の種類」で、ボタンの形は自動・カプセル・円・角丸長方形から選びます。個別の値としては、Dynamic Islandの角丸が44pt(TrueDepthカメラの形に一致)、visionOSのアラートに入れる補助ビューが16pt、Apple Watchの大きな画像のコンプリケーションが4ptなど、部品ごとに示されています。アプリアイコンは正方形で用意し、角丸はシステムが端末の形と揃うようにマスクします。",
    colorInfo: "内側の角丸は外枠と同心にそろえる、というのが一貫した考え方です。ツールバーでは標準のボタンや入力欄の角丸が自動でバーの角と同心になり、独自の部品も同心にするよう求めています。ライブアクティビティでは「外側の角丸 − 余白」を内側の角丸にする、という計算の仕方まで示しています。visionOSでは、視線が角に引き寄せられて中心を見続けにくいため、円形やカプセル形のボタンを勧めています。",
    stance:
      "Appleは角丸を独立したトークンとしてではなく、端末の画面の角・ウィンドウ・バーといった外側の形に内側の部品を調和させるための関係として扱っています。アプリアイコンの角丸が画面の角やほかのUIの丸みと正確に揃うようにシステムがマスクするのも同じ発想です。visionOSのボタンでは、縦に積むときは角丸長方形、横に並べるときはカプセル形が向くとしています(各ページの本文を直接確認、2026-09)。",
    exceptions:
      "Apple Payボタン・Sign in with Appleボタンなどは、アプリのほかのボタンに合わせて角丸を四角からカプセル形まで調整できます。一方、Apple Healthのアイコンなどブランドの素材は、角丸を変えたり円形に切り抜いたりしてはいけないとしています。",
    accessibility:
      "―(形そのものについての専用のアクセシビリティ基準はありません)。visionOSで円形・カプセル形を勧める理由は、対象を見続けやすくするためで、視線で操作するvisionOSでの操作のしやすさに関わる配慮です。",
    useCases: [
      "カードやバーの中に置く部品の角丸は「外側の角丸 − 余白」で決める",
      "標準の部品を使い、角丸がバーや画面の角と同心になるようにする",
      "アプリアイコンは角丸を付けずに正方形で書き出し、システムのマスクに任せる",
    ],
    searchHint: "concentric",
    url: "https://developer.apple.com/design/human-interface-guidelines/toolbars#Best-practices",
    urlSecondary: [
      { label: "Live Activities: Creating layouts", url: "https://developer.apple.com/design/human-interface-guidelines/live-activities#Creating-Live-Activity-layouts" },
      { label: "App icons: Icon shape", url: "https://developer.apple.com/design/human-interface-guidelines/app-icons#Icon-shape" },
      { label: "Buttons: visionOS", url: "https://developer.apple.com/design/human-interface-guidelines/buttons#visionOS" },
    ],
    confirmedNote: "HIGの全ページのデータを取得して角丸に関する記述を検索し、該当ページの本文・見出しアンカーを確認済み(2026-09)。",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 3 ― Shape",
    color: "#2F7D6E",
    position: "角丸を10段階の「シェイプスケール」としてトークン化し、各コンポーネントがその段階を参照する方式。M3 Expressiveでは35種類の装飾的な形と、形から形への変形(モーフ)も加わった",
    size: "None 0dp / Extra small 4dp / Small 8dp / Medium 12dp / Large 16dp / Large increased 20dp / Extra large 28dp / Extra large increased 32dp / Extra extra large 48dp / Full 50%(完全な円・カプセル)の10段階。角の処理は丸める(rounded)か、斜めに切る(cut)かを選べ、既定は丸めです。",
    colorInfo: "角丸の値はテーマで一括して変更でき、コンポーネントはその段階を参照するため、アプリ全体の印象を1か所で変えられます。M3 Expressiveでは円・四角・花・クッキー・ハートなど35種類の形(MaterialShapes)が定義され、そのまま使うことも、ある形から別の形へ滑らかに変形させることもできます。",
    stance:
      "Material Designは形をブランド表現の手段と位置づけ、角丸の段階をトークンとして持つことで、ブランドに合わせた調整と一貫性の両立を図っています。独自の形を作るための角・辺の処理(角の切り落とし・三角形の辺など)も用意されています(Material Components for Androidのドキュメントとトークン定義で直接確認、2026-09)。",
    exceptions:
      "テーマで各段階の値を変更したとき、「MediumがLargeより小さい」といった大小関係が正しいかはライブラリ側では検査されず、開発者が保証する必要があると明記されています。どの部品にどの段階を当てるかの一覧はm3.material.io(SPA)にあり、本文は直接確認できていません。",
    accessibility:
      "―(形そのものについての専用のアクセシビリティ基準は確認できていません)。角丸の大きい小さなボタンの扱いについてはW3C欄(2.5.8)を参照。",
    useCases: [
      "角丸は固定値ではなく、シェイプスケールの段階(small・large等)で指定する",
      "ブランドの印象を変えたいときは、テーマで段階の値をまとめて調整する",
      "段階の値を変えたら、小さい段階ほど小さい値になっているか確認する",
    ],
    searchHint: "",
    url: "https://m3.material.io/styles/shape/corner-radius-scale",
    urlSecondary: [
      { label: "MDC Android: Shape theming(GitHub)", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Shape.md" },
      { label: "Compose Material 3 ShapeTokens(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ShapeTokens.kt" },
      { label: "Compose Material 3 MaterialShapes(GitHub)", url: "https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/MaterialShapes.kt" },
    ],
    confirmedNote: "m3.material.ioはSPAのため本文を直接確認できていません。10段階の値はMaterial Components for Androidのドキュメントとトークン定義、35種類の形はJetpack Composeのソースで直接確認(2026-09)。",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WCAG 1.4.11 Non-text Contrast / 2.5.8 Target Size (Minimum)",
    color: "#A3821F",
    position: "形そのものは規定しない。ボタンの枠(形)は、ほかに識別する手がかりが無いときだけ必要で、その場合は3:1のコントラストを求める",
    size: "形・角丸についての数値基準はありません。1.4.11(レベルAA)は、部品を識別するのに必要な視覚情報に3:1以上のコントラストを求めますが、文字や十分なコントラストのアイコンで部品だと分かる場合、枠(押せる範囲の境界)は必須ではないとしています。2.5.8(レベルAA)では、角丸が大きいために対象の内側に24×24pxの正方形が収まらない場合、その対象は「小さい対象」として扱われます。",
    colorInfo: "入力欄の立体的な影や、コントラストの異なる背景の間の暗い線などは、明るさが最も近い色の一部とみなして計算するとしています。形の境界がほかに識別の手段がない唯一の手がかりになっている場合にだけ、その境界に3:1が求められます。",
    glossary: [
      { term: "1.4.11 Non-text Contrast・レベルAA", desc: "部品の識別や状態の把握に必要な視覚情報、図の理解に必要な部分に、隣接色との3:1以上のコントラストを求める基準。" },
      { term: "2.5.8 Target Size (Minimum)・レベルAA", desc: "押す対象を24×24 CSSピクセル以上にするか、周囲に十分な間隔を取ることを求める基準。角丸で内側に24px四方が収まらない対象は小さい対象として扱う。" },
    ],
    stance:
      "WCAGはボタンを角丸にするか四角にするかを問いません。問題にするのは、それが操作できる部品だと見分けられるかどうかです。枠のない文字だけのボタンも、文字で部品だと分かれば適合します。ただし、見た目の手がかりが枠しかない入力欄などは、その枠に3:1が必要になります。",
    exceptions:
      "1.4.11は、非活性の部品と、ブラウザが見た目を決めていて制作者が変更していない部品を適用除外としています。2.5.8では、角丸で小さい対象とみなされても、周囲に十分な間隔があれば適合します。",
    accessibility: "知覚可能(Perceivable)・操作可能(Operable) ― 1.4.11は「知覚可能」、2.5.8は「操作可能」に属します。弱視の人が部品の存在に気づけること、指での操作が難しい人が押し間違えないことが目的です。",
    useCases: [
      "枠のないボタンは、文字やアイコンで押せる部品だと分かるようにする",
      "入力欄など、枠が唯一の手がかりになる部品は枠を3:1以上にする",
      "角丸の大きい小さなボタンは、内側に24px四方が収まるか・周囲の間隔が足りるか確認する",
    ],
    searchHint: "does not require that controls have a visual boundary",
    url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html#boundaries",
    urlSecondary: [
      { label: "2.5.8 Target Size (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html#size-requirement" },
    ],
    confirmedNote: "2つのUnderstandingページの本文を直接取得して確認済み(2026-09)。",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Flat-Design Best Practices / Flat UI Elements Attract Less Attention",
    color: "#7A4F7E",
    position: "形を「押せることを示す手がかり(シグニファイア)」として扱い、フラットデザインで形の手がかりを失うと探す手間が増える、という調査に基づく実務指針(適合基準ではない)",
    size: "角丸の数値基準はありません。視線計測の調査では、押せる手がかりが弱いページは強いページに比べて、見ている時間が平均22%長く、注視の回数が平均25%多かったとしています。",
    colorInfo: "ボタンは少なくとも現実のボタンのように見えるべきで、細い枠線だけの「ゴーストボタン」は手がかりが弱いため避けるよう勧めています。完全にフラットにするのではなく、控えめな影や重なりを加えた「フラット2.0」を多くの製品に勧めています。",
    stance:
      "フラットデザインでは、押せる場所を示す手がかりが取り除かれがちで、利用者はどこを押せるか迷い、作業の効率が落ちるとしています。押せる要素と押せない要素をはっきり区別すること、同じ見た目を静的な文字とリンクの両方に使わないこと、一貫性を保つことが重要だとしています(記事本文を直接取得して確認済み、2026-09)。",
    exceptions:
      "ページ数が少なくシンプルなサイト、操作が少ないサイト、繰り返し訪れる利用者が多いサイト、利用者が専門家の場合は、完全にフラットでも問題が少ないとしています。標準的なレイアウトやパターンに沿っていれば、手がかりが弱くても利用者は要素の役割を理解しやすいとしています。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、視線計測を使ったユーザー調査に基づく設計上の根拠です。",
    useCases: [
      "ボタンは背景の塗りや形で、押せる部品だと分かるようにする",
      "細い枠線だけのゴーストボタンを主要な操作に使わない",
      "リンクと静的な文字、見出しとボタンに同じ見た目を使わない",
    ],
    searchHint: "22% more time",
    url: "https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/",
    urlSecondary: [{ label: "Flat-Design Best Practices", url: "https://www.nngroup.com/articles/flat-design-best-practices/" }],
    confirmedNote: "2記事とも本文を直接取得して確認済み(2026-09)。",
  },
];

/* 画像エリア: 同心の角丸(Apple)の考え方 */
function ConcentricSwatch() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  return (
    <svg viewBox="0 0 300 120" width="100%" style={{ maxWidth: 420, display: "block", margin: "0 auto" }} role="img" aria-label="同心の角丸の例">
      <rect x="10" y="10" width="130" height="90" rx="26" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
      <rect x="22" y="22" width="106" height="36" rx="14" fill="#F4D9CE" />
      <text x="75" y="44" fontSize="9.5" fill="#171B36" textAnchor="middle" fontFamily={font}>内側 = 26 − 12 = 14</text>
      <text x="75" y="114" fontSize="9.5" fill="#2F7D6E" textAnchor="middle" fontFamily={font}>○ 同心(外側 − 余白)</text>
      <rect x="160" y="10" width="130" height="90" rx="26" fill="#FFFFFF" stroke="#C2542A" strokeWidth="1.6" />
      <rect x="172" y="22" width="106" height="36" rx="26" fill="#F4D9CE" />
      <text x="225" y="44" fontSize="9.5" fill="#171B36" textAnchor="middle" fontFamily={font}>内側も 26</text>
      <text x="225" y="114" fontSize="9.5" fill="#C0503F" textAnchor="middle" fontFamily={font}>✕ 同じ値だと隙間が不揃い</text>
    </svg>
  );
}

/* 四サイト比較図: 角丸の段階 */
const SHAPE_STEPS = [
  ["None", 0], ["XS", 4], ["S", 8], ["M", 12], ["L", 16], ["L+", 20], ["XL", 28], ["XL+", 32], ["XXL", 48], ["Full", 999],
];

function ShapeChart() {
  const font = "'Jost', 'Noto Sans JP', sans-serif";
  const box = 44, gap = 8, x0 = 96;
  return (
    <svg viewBox="0 0 640 214" width="100%" style={{ maxWidth: 700, display: "block", margin: "0 auto" }} role="img" aria-label="角丸の段階の比較図">
      <text x="0" y="40" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Google</text>
      {SHAPE_STEPS.map(([n, r], i) => {
        const x = x0 + i * (box + gap);
        const rr = r === 999 ? box / 2 : Math.min(r / 2, box / 2);
        return (
          <g key={n}>
            <rect x={x} y="14" width={box} height={box} rx={rr} fill="#2F7D6E" opacity={0.25 + i * 0.06} />
            <text x={x + box / 2} y="72" fontSize="9" fill="#454C78" textAnchor="middle" fontFamily={font}>{n}</text>
            <text x={x + box / 2} y="83" fontSize="8.5" fill="#7E86AC" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace">{r === 999 ? "50%" : r}</text>
          </g>
        );
      })}
      <text x="0" y="116" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>Apple</text>
      <text x={x0} y="116" fontSize="9.5" fill="#454C78" fontFamily={font}>段階なし。内側の角丸 = 外側の角丸 − 余白(同心)/ 例: Dynamic Island 44pt</text>
      <text x="0" y="150" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>W3C</text>
      <text x={x0} y="150" fontSize="9.5" fill="#454C78" fontFamily={font}>形の規定なし。枠が唯一の手がかりなら 3:1(1.4.11)</text>
      <text x="0" y="184" fontSize="11.5" fill="#171B36" fontWeight="600" fontFamily={font}>NN group</text>
      <text x={x0} y="184" fontSize="9.5" fill="#454C78" fontFamily={font}>形は「押せる」手がかり。手がかりが弱いと見る時間 +22%</text>
      <text x={x0} y="206" fontSize="8.5" fill="#9EA4C4" fontFamily={font}>Googleの図は値の半分の縮尺で描画(単位dp)</text>
    </svg>
  );
}

/* 形状ごとの使い方と、Google・Appleの扱い。
   Google: ShapeTokensの値と、Composeの各部品のトークン定義(ContainerShape等)の既定値、Material Components
   for AndroidのCommon buttons・Button groupsのドキュメント。
   Apple: HIG(Buttons・Toolbars・Live Activities・Widgets・App icons・Alerts・Complications・Activity rings・
   Apple Pay・Sign in with Apple)と、SwiftUIの形の定義(ButtonBorderShape・ConcentricRectangle)。
   2026-10-04: 「Appleの角丸の使用箇所をもっと洗い出して」というフィードバックを受け、HIGの全172ページのデータを取得して
   角丸・円・カプセル・同心に関する記述を検索し、Pointing devices・Focus and selection・Context menus・Wallet・Privacy・
   Toggles・Sliders・Game Center・Lockups・Designing for games・Buttons(macOS)の記述を追加した。
   2026-10: 「Googleの段階表/Appleの形の種類/固定値とFullの使い分け」の3セクションに分かれていたものを、
   ユーザーのフィードバックを受けて「形状 × 使い方 × Google・Apple」の1つの表に統合した。 */
const SHAPE_GROUPS = [
  {
    group: "固定値の角丸",
    note: "中身で大きさが変わる「面」。面が大きいほど角丸も大きくする",
    rows: [
      {
        shape: "square", name: "角なし", value: "0",
        use: "画面の端に貼り付く部品",
        g: [{ k: "None 0dp", v: "アプリバー、ナビゲーションレール、タブ、ドッキングしたツールバー、全画面の検索ビュー" }],
        a: [
          { k: "四角", v: "Apple Pay・Sign in with Appleのボタンは、ほかのボタンに合わせて四角にもできる" },
          { k: "四角いボタン", v: "macOSの、表の行の追加・削除など特定のビューに付くボタン(Square buttons)。文字ではなく記号やアイコンを入れ、ビューの中か真下に置く" },
          { k: "端末の角", v: "画面の角が丸い端末では、角やカメラの部分にかからないよう、システムのセーフエリアに合わせて配置する(ゲーム)" },
        ],
      },
      {
        shape: "small", name: "小さい固定値", value: "2〜8",
        use: "小さく情報量の多い部品・選択や入力の部品",
        g: [
          { k: "Extra small 4dp", v: "メニュー、枠線の入力欄(塗りつぶしの入力欄は上の角だけ)、プレーンツールチップ、スナックバー" },
          { k: "Small 8dp", v: "チップ(アシスト・フィルター・入力・候補)、押している間の小さいボタン" },
          { k: "段階外の固定値", v: "チェックボックス 2dp、タブの選択中の下線 3dp" },
        ],
        a: [
          { k: "4pt", v: "Apple Watchの大きな画像のコンプリケーション(システムが自動で付ける)" },
          { k: "角丸を自分で付ける", v: "Walletのパスに載せるサムネイル画像(映画のポスターなど)は、正方形の画像に自分で角丸を付けて書き出す" },
        ],
      },
      {
        shape: "medium", name: "中くらいの固定値", value: "12〜20",
        use: "内容をまとめる面・浮かぶ操作",
        g: [
          { k: "Medium 12dp", v: "カード、リッチツールチップ、小さいFAB、四角型の小さいボタン" },
          { k: "Large 16dp", v: "FAB、小さい拡張FAB、リスト、ナビゲーションドロワー(外側の角だけ)、下から出るドロワー(上の角だけ)、四角型の中サイズのボタン" },
          { k: "Large increased 20dp", v: "中サイズのFAB・拡張FAB" },
        ],
        a: [
          { k: "16pt", v: "visionOSのアラートに入れる補助ビュー" },
          { k: "角丸長方形", v: "visionOSで縦に積む文字のボタン(値の指定はなし)" },
          { k: "ボタンと同じ角丸", v: "macOSの高さ可変のプッシュボタン(2行の文字や高いアイコン用)は、通常のプッシュボタンと同じ角丸と内側の余白にそろえる" },
          { k: "調整できる例", v: "位置情報ボタン(Location button)は、タイトル・アイコン・色に加えて角丸を調整してUIになじませられる" },
        ],
      },
      {
        shape: "large", name: "大きい固定値", value: "28〜48",
        use: "画面の上に出る大きな面",
        g: [
          { k: "Extra large 28dp", v: "ダイアログ、日付/時刻ピッカー、大きいFAB、ドッキングした検索ビュー、ボトムシート(上の角だけ)、四角型の大きいボタン" },
          { k: "XL increased 32dp / XXL 48dp", v: "段階として定義されているが、標準部品の既定値では使われていない(独自の部品・ブランド表現向け)" },
        ],
        a: [
          { k: "44pt", v: "Dynamic Island(TrueDepthカメラの形に一致)" },
          { k: "角丸のカード", v: "macOSのシート" },
          { k: "角丸の背景", v: "iPadOSのポインタのハイライト効果。ポインタが半透明の角丸長方形に変わり、バーボタン・タブバー・セグメントコントロールなどの背景になる" },
        ],
      },
    ],
  },
  {
    group: "外枠との関係で決める角丸",
    note: "枠の中に置く部品。外枠と内側の隙間を均一にする",
    rows: [
      {
        shape: "concentric", name: "同心", value: "外側 − 余白",
        use: "カード・バー・ウィジェットの中に置く部品",
        g: null, gNone: "確認できた範囲では、同心にそろえる指定はない(内側の部品も段階の固定値を参照する)",
        a: [
          { k: "自動で同心", v: "ツールバー内の標準のボタン・入力欄(バーの角とそろう)" },
          { k: "計算で同心", v: "ライブアクティビティ・ウィジェットの中の部品(外側の角丸 − 余白)" },
          { k: "システムがマスク", v: "アプリアイコンは正方形で書き出し、端末の画面の角とそろうようシステムが角丸にする(tvOSは長方形で、同じく同心の角)。Walletのパスのアイコンも正方形で用意し、角丸はシステムが付ける" },
          { k: "形をそろえる", v: "コンテキストメニューのプレビューは、切り抜きを画像の形に合わせ、表示のアニメーション中に角丸が変わって見えないようにする" },
          { k: "ウィジェット", v: "中の内容の角丸をウィジェットの角丸に合わせる。SwiftUIのコンテナを使うと正しい角丸が付く" },
        ],
      },
    ],
  },
  {
    group: "角丸100%(Full/カプセル/円)",
    note: "高さが一定の「押す・つまむ」部品。大きな面には使わない",
    rows: [
      {
        shape: "full", name: "Full / カプセル", value: "50%",
        use: "高さが一定のボタン・スイッチ・つまみ・バッジ・選択表示",
        g: [{ k: "Full 50%", v: "丸型のボタン(ボタンの既定)、検索バー、バッジ、スイッチ(つまみと溝)、スライダーのつまみ、進捗バーの溝、ナビゲーションの選択表示、ドラッグハンドル、フローティングツールバー、セグメントボタン、スプリットボタン" }],
        a: [
          { k: "カプセル", v: "visionOSで単独に置くボタン・横に並べるボタン・アイコン+文字のボタン、watchOSで内容の中に置くボタン" },
          { k: "調整できる例", v: "Apple Pay・Sign in with Appleのボタンは、四角からカプセルまで角丸を調整できる" },
          { k: "円か楕円", v: "ライブアクティビティが2つあるとき、Dynamic Islandから離れて表示される最小表示は、中身の大きさで円か楕円になる" },
        ],
      },
      {
        shape: "circle", name: "円", value: "正方形にFull",
        use: "アイコンだけの正方形の部品",
        g: [{ k: "Full(正方形)", v: "丸型のアイコンボタン" }],
        a: [
          { k: "円", v: "visionOSのアイコンだけのボタン(視線が角に引き寄せられず、中心を見続けやすい)" },
          { k: "Activityリング", v: "リングを囲む場合は、円形のマスクではなく角丸で円にする" },
          { k: "円の部品", v: "macOSのヘルプボタン(?マーク)、ラジオボタン、円形スライダーのつまみ" },
          { k: "システムが円にマスク", v: "visionOS・watchOSのアプリアイコン、Apple Watchの円形のコンプリケーション、ロック画面の円形ウィジェット、Game Centerの実績の画像、tvOSの出演者の写真(モノグラム)" },
        ],
      },
    ],
  },
  {
    group: "システムに任せる",
    note: "",
    rows: [
      {
        shape: "auto", name: "自動", value: "―",
        use: "状況とプラットフォームに合わせて形を選ばせる",
        g: null, gNone: "自動で選ぶ形はない(部品ごとに既定の形が決まっている。ボタンは丸型)",
        a: [
          { k: "既定", v: "標準のボタン。SwiftUIのボタンの形は自動・カプセル・円・角丸長方形から選べ、既定は自動" },
          { k: "フォーカスの輪", v: "iPadOS・macOSのフォーカスリング(halo)は、部品の形から自動で形が決まる。合わないときは角丸やベジェ曲線の形に合わせて調整する" },
          { k: "ポインタのリフト効果", v: "iPadOSで要素を持ち上げる効果では、ポインタがシステム既定の角丸長方形に変形する。円など違う形の独自部品は、角丸の値を指定する" },
        ],
      },
    ],
  },
];

function ShapeIcon({ shape }) {
  const base = { width: 50, height: 32, border: "1.6px solid #3C5A73", background: "#E6EDF3", display: "inline-block", flexShrink: 0 };
  const r = { square: 0, small: 3, medium: 6, large: 10, full: 999 };
  if (shape === "circle") return <span style={{ ...base, width: 32, borderRadius: "50%" }} />;
  if (shape === "auto") return <span style={{ ...base, borderRadius: 6, borderStyle: "dashed" }} />;
  if (shape === "concentric") return (
    <span style={{ ...base, borderRadius: 12, padding: 4, display: "inline-flex" }}>
      <span style={{ flex: 1, borderRadius: 8, background: "#3C5A73", opacity: 0.55 }} />
    </span>
  );
  return <span style={{ ...base, borderRadius: r[shape] }} />;
}

function SideList({ items, none }) {
  if (!items) return <div style={styles.smNone}>{none}</div>;
  return (
    <div style={styles.smItems}>
      {items.map((it) => (
        <div key={it.k} style={styles.smItem}>
          <span style={styles.smKey}>{it.k}</span>
          <span>{it.v}</span>
        </div>
      ))}
    </div>
  );
}

function ShapeMatrix() {
  return (
    <>
      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.smGrid}>
            {["形状", "どう使うか", "Google", "Apple"].map((h, i) => (
              <div key={h} style={{ ...styles.usageHead, ...(i === 2 ? { color: "#2F7D6E", fontWeight: 700 } : i === 3 ? { color: "#C2542A", fontWeight: 700 } : {}) }}>{h}</div>
            ))}
            {SHAPE_GROUPS.map((grp) => (
              <React.Fragment key={grp.group}>
                <div style={styles.smGroup}>
                  {grp.group}{grp.note && <span style={styles.smGroupNote}>{grp.note}</span>}
                </div>
                {grp.rows.map((r) => (
                  <React.Fragment key={r.name}>
                    <div style={styles.smShapeCell}>
                      <ShapeIcon shape={r.shape} />
                      <div>
                        <div style={styles.smName}>{r.name}</div>
                        <div style={styles.smValue}>{r.value}</div>
                      </div>
                    </div>
                    <div style={styles.usageCell}>{r.use}</div>
                    <div style={styles.usageCell}><SideList items={r.g} none={r.gNone} /></div>
                    <div style={styles.usageCell}><SideList items={r.a} none={r.aNone} /></div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="dsp-mobile-only">
        {SHAPE_GROUPS.map((grp) => (
          <div key={grp.group} style={{ marginBottom: 14 }}>
            <div style={styles.smGroupMobile}>{grp.group}</div>
            {grp.note && <div style={styles.smGroupNoteMobile}>{grp.note}</div>}
            <div style={styles.sourceList}>
              {grp.rows.map((r) => (
                <div key={r.name} style={styles.sourceCard}>
                  <div style={styles.smShapeHead}>
                    <ShapeIcon shape={r.shape} />
                    <div>
                      <div style={styles.smName}>{r.name}<span style={styles.smValueInline}>{r.value}</span></div>
                      <div style={styles.smUse}>{r.use}</div>
                    </div>
                  </div>
                  <div style={styles.smSideLabel}><span style={{ color: "#2F7D6E" }}>Google</span></div>
                  <SideList items={r.g} none={r.gNone} />
                  <div style={styles.smSideLabel}><span style={{ color: "#C2542A" }}>Apple</span></div>
                  <SideList items={r.a} none={r.aNone} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p style={styles.chartNote}>Googleは段階名と値(dp)、Appleは形の種類か、HIGに値が書かれている部品の値(pt)です。Appleは角丸の段階表を持たないため、値が示されているのは一部の部品だけです。</p>
    </>
  );
}

/* 状態や並べ方で形を切り替えるルール */
const SHAPE_CHANGES = [
  {
    scene: "並べたとき",
    g: "つながったボタングループ(Connected)は、外側の角をFull、隣り合う内側の角を8dp、間隔を2dpにする",
    a: "横に並べるならカプセル、縦に積むなら角丸長方形(visionOS)",
  },
  {
    scene: "押した・選んだとき",
    g: "押している間は角丸を小さくし、トグルボタンは選ぶと丸型から四角型に変わる(形の変化で状態を示す)",
    a: "形を変える指定はなし(選択は色や塗りで示す)",
  },
  {
    scene: "大きさが変わるとき",
    g: "M3 Expressiveのボタンは丸型(Full)と四角型(固定値)を選べ、四角型の角丸は大きさで変わる(XS・S 12、M 16、L・XL 28dp)",
    a: "確認できた範囲では指定なし",
  },
];

function ShapeChangeRules() {
  return (
    <>
      <div className="dsp-desktop-only">
        <div style={styles.matrixScroll}>
          <div style={styles.fvGrid}>
            <div style={styles.usageHead}>場面</div>
            <div style={{ ...styles.usageHead, color: "#2F7D6E", fontWeight: 700 }}>Google</div>
            <div style={{ ...styles.usageHead, color: "#C2542A", fontWeight: 700 }}>Apple</div>
            {SHAPE_CHANGES.map((r) => (
              <React.Fragment key={r.scene}>
                <div style={styles.usageCellStrong}>{r.scene}</div>
                <div style={styles.usageCell}>{r.g}</div>
                <div style={styles.usageCell}>{r.a}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="dsp-mobile-only" style={styles.sourceList}>
        {SHAPE_CHANGES.map((r) => (
          <div key={r.scene} style={styles.sourceCard}>
            <div style={styles.smName}>{r.scene}</div>
            <div style={styles.usageMobileText}><strong style={{ color: "#2F7D6E" }}>Google: </strong>{r.g}</div>
            <div style={styles.usageMobileText}><strong style={{ color: "#C2542A" }}>Apple: </strong>{r.a}</div>
          </div>
        ))}
      </div>
      <p style={styles.chartNote}>W3Cの観点: 形の指定はありませんが、円やカプセルの小さなボタンは角が削れる分だけ内側に24px四方が収まりにくく、2.5.8では小さい対象として扱われます。その場合は周りの間隔で補う必要があります。</p>
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

export default function TokensShapePage() {
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
        <SidebarNav currentPath="/tokens/shape" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>トークン / ファウンデーション / シェイプ・コーナーラジウス</span>
            <span>SPEC No. 046</span>
          </div>

          <h1 style={styles.title}>シェイプ・コーナーラジウス(角丸)</h1>
          <p style={styles.subtitle}>4つのガイドラインが、角丸の段階・形の選び方・形が伝える意味をどう定めているかを比較します</p>

          <div style={styles.swatchCard}>
            <span style={styles.swatchLabel}>同心の角丸(外枠と内側の部品の関係)</span>
            <ConcentricSwatch />
            <p style={styles.swatchNote}>外枠と内側の部品に同じ角丸を使うと、角の部分だけ隙間が広がって見えます。内側の角丸を「外側の角丸 − 余白」にすると、隙間が均一になります(Appleがライブアクティビティなどで示している考え方)。</p>
          </div>

          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― まず結論</div>
            <p style={styles.synthesisText}>
              角丸を<strong>数値の段階(トークン)として持っているのはGoogleだけ</strong>です。0・4・8・12・16・20・28・32・48dpとFull(50%)の10段階があり、テーマで一括して変えられます。M3 Expressiveでは35種類の装飾的な形と、形の変形(モーフ)まで加わり、形をブランド表現の中心に据えています。
            </p>
            <p style={styles.synthesisText}>
              Appleには角丸の専用ページがありません。代わりに、ツールバー・ライブアクティビティ・ウィジェット・アプリアイコンの各ページに、<strong>内側の角丸を外枠と同心(concentric)にそろえる</strong>という同じ考え方が繰り返し出てきます。Googleが「絶対値の段階」で統一するのに対し、Appleは<strong>「外側との関係」で統一する</strong>、という発想の違いです。ただしAppleにも基準がないわけではなく、<strong>形の種類(四角・固定値の角丸・カプセル・円・同心・自動)を場面で使い分ける</strong>というルールがあります。例えばvisionOSでは、アイコンだけのボタンは円、単独や横並びのボタンはカプセル、縦に積むボタンは角丸長方形です。
            </p>
            <p style={styles.synthesisText}>
              W3Cは形を規定しません。<strong>ボタンに枠がなくても、文字で押せる部品だと分かれば適合</strong>とし、枠が唯一の手がかりになる場合にだけ3:1を求めます。一方でNN groupは、形が押せることを示す手がかりになると考え、<strong>手がかりの弱いUIでは探す時間が22%長くなる</strong>という調査を示しています。
            </p>
            <p style={styles.synthesisText}>
              つまり、W3Cの基準を満たす最低限(文字だけのボタン)と、NN groupが勧める使いやすさ(ボタンらしい形と塗り)の間には差があります。実務では、<strong>主要な操作には塗りと形のあるボタンを使い、角丸はGoogleの段階またはAppleの同心の考え方で一貫させる</strong>のが、4系列を合わせた結論です。
            </p>
            <p style={styles.synthesisText}>
              角丸100%(Full/カプセル)と固定値の使い分けは、Apple・Googleでほぼ一致しています。<strong>高さが一定の「押す・つまむ」部品(ボタン・スイッチ・つまみ・バッジ)はFull、中身によって大きさが変わる「面」(カード・ダイアログ・シート・入力欄)は固定値</strong>です。大きな面をFullにすると形が崩れ、小さな部品を固定値にすると押せる部品らしさが弱まる、という理由で考えると判断しやすくなります。
            </p>
          </div>

          <section style={styles.ruleSection}>
            <h2 style={styles.diagramTitle}>形状ごとの使い方 ― 固定値の角丸・角丸100%と、Google・Appleの扱い</h2>
            <p style={styles.diagramNote}>形を「固定値の角丸」「外枠との関係で決める角丸」「角丸100%(Full/カプセル/円)」「システムに任せる」の4つに分け、それぞれどんな部品に使うか、Google・Appleがどう定めているかを1つの表に並べました。大まかな判断は、<strong>高さが一定の小さな操作部品は角丸100%、中身で大きさが変わる面は固定値(面が大きいほど角丸も大きく)、枠の中の部品は外枠と同心</strong>です。</p>
            <div style={styles.smLegend}>
              {SHAPE_GROUPS.slice(0, 3).map((g, i) => (
                <div key={g.group} style={styles.smLegendItem}>
                  <ShapeIcon shape={["medium", "concentric", "full"][i]} />
                  <div>
                    <div style={styles.smName}>{g.group}</div>
                    <div style={styles.smUse}>{g.note}</div>
                  </div>
                </div>
              ))}
            </div>
            <ShapeMatrix />
            <h3 style={styles.subTitle}>状態や並べ方で形を切り替えるルール</h3>
            <ShapeChangeRules />
          </section>

          <div style={styles.chartCard}>
            <h2 style={styles.diagramTitle}>四サイト比較図 ― 角丸の決め方</h2>
            <ShapeChart />
            <p style={styles.chartNote}>Googleは絶対値の段階、Appleは外枠との関係で角丸を決めます。W3C・NN groupは角丸の値ではなく、形が部品の識別や押せることの手がかりになるかを問題にしています。</p>
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
                <InfoBox label="角丸の数値" accent="#3C5A73">{s.size}</InfoBox>
                <InfoBox label="形の選び方">{s.colorInfo}</InfoBox>
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
            <h2 style={styles.diagramTitle}>シェイプ・コーナーラジウス デザインシステム比較</h2>
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
                <div style={styles.labelCell}>角丸の数値</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell, ...styles.sizeCell }}>{s.size}</div>))}
                <div style={styles.labelCell}>形の選び方</div>
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
                    {s.confirmedNote && <span style={styles.confirmedNoteSmall}>{s.confirmedNote}</span>}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>用語メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <span style={{ color: "#B7BCDA" }}>―(該当する専門用語なし)</span>}</div>))}
              </div>
            </div>
          </div>

          <div style={styles.tagsRow}>
            {["知覚可能(POUR)", "操作可能(POUR)"].map((t) => (<span key={t} style={styles.tagPrinciple}>{t}</span>))}
            {["デザインの基礎", "見つけやすさ・初めての案内"].map((t) => (<span key={t} style={styles.tagProcess}>{t}</span>))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-10(Apple・W3C・NN groupは本文確認済み。Googleはm3.material.io本文は未確認、数値と形の一覧はGoogle公式のドキュメント・ソースで確認)</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
            <span style={{ marginTop: 4 }}>
              リンクについて: AppleはHIGに角丸の専用ページがないため、同心の角丸について書かれたToolbarsページの見出しを基本リンクとし、関連する3ページの見出しを併記しています。GoogleはM3のShapeの角丸スケール(Corner radius scale)ページに加え、数値を確認したGitHub上の公式ソースを併記しています。WCAGは1.4.11 Understandingページの「Boundaries」の節と、2.5.8の大きさの要件の節です。NN groupは視線計測の調査記事と、フラットデザインの実践記事です。
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
  diagramNote: { fontSize: 11.5, color: "#565D8A", margin: "0 0 14px", lineHeight: 1.6 },
  ruleSection: { marginBottom: 26 },
  fvGrid: { display: "grid", gridTemplateColumns: "150px 1fr 1fr", minWidth: 680, border: "1px solid #E1E3F0" },
  subTitle: { fontSize: 13, fontWeight: 700, color: "#171B36", margin: "18px 0 8px" },
  smLegend: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 8, marginBottom: 14 },
  smLegendItem: { display: "flex", gap: 10, alignItems: "flex-start", background: "#F8F9FD", border: "1px solid #E1E3F0", borderRadius: 4, padding: "9px 11px" },
  smGrid: { display: "grid", gridTemplateColumns: "160px 150px 1fr 1fr", minWidth: 780, border: "1px solid #E1E3F0" },
  smGroup: { gridColumn: "1 / -1", background: "#EEF1FA", padding: "7px 10px", fontSize: 12, fontWeight: 700, color: "#171B36", borderBottom: "1px solid #E1E3F0" },
  smGroupNote: { fontSize: 10.5, fontWeight: 400, color: "#565D8A", marginLeft: 10 },
  smShapeCell: { display: "flex", gap: 10, alignItems: "flex-start", padding: "8px", borderBottom: "1px solid #EEF0F7" },
  smName: { fontSize: 12, fontWeight: 700, color: "#171B36" },
  smValue: { fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", fontSize: 10.5, color: "#3C5A73", marginTop: 1 },
  smValueInline: { fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", fontSize: 10.5, fontWeight: 400, color: "#3C5A73", marginLeft: 8 },
  smUse: { fontSize: 10.5, lineHeight: 1.5, color: "#565D8A", marginTop: 2 },
  smItems: { display: "flex", flexDirection: "column", gap: 5 },
  smItem: { fontSize: 11, lineHeight: 1.6, color: "#2E3457" },
  smKey: { fontFamily: "'IBM Plex Mono', 'Noto Sans JP', monospace", fontSize: 10.5, fontWeight: 600, color: "#171B36", background: "#F0F4F8", padding: "1px 5px", borderRadius: 3, marginRight: 6 },
  smNone: { fontSize: 11, lineHeight: 1.6, color: "#9EA4C4" },
  smGroupMobile: { fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 2 },
  smGroupNoteMobile: { fontSize: 11, color: "#565D8A", marginBottom: 8 },
  smShapeHead: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 },
  smSideLabel: { fontSize: 11, fontWeight: 700, margin: "8px 0 3px" },
  usageHead: { fontSize: 10.5, color: "#565D8A", background: "#F8F9FD", padding: "7px 8px", borderBottom: "1px solid #E1E3F0" },
  usageCell: { fontSize: 11, lineHeight: 1.6, color: "#2E3457", padding: "8px", borderBottom: "1px solid #EEF0F7", minWidth: 0 },
  usageCellStrong: { fontSize: 11.5, fontWeight: 700, color: "#171B36", padding: "8px", borderBottom: "1px solid #EEF0F7" },
  usageMobileText: { fontSize: 11.5, lineHeight: 1.6, color: "#2E3457", marginTop: 4 },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
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
};
