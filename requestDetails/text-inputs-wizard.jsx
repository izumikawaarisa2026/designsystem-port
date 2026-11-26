import React from "react";
import SidebarNav from "./sidebar-nav";
import { SummaryCard, Hl, NoData, PageLink, RefList, SplitSection, TagLink, RelatedPages, markNeg } from "./page-parts";

/**
 * コンポーネントレイヤー「Text inputs / ウィザード(ステップ形式の入力)」ページ。
 * 2026-11 ③本人レビューNo.046で、「フルスクリーンダイアログ」ページに混ざっていたウィザードの内容を独立させた。
 * 一次情報: Apple HIG Modality(ページデータのJSON)、Material Design 1 Steppers(現行M3にはない)、WAI Forms Tutorialの
 * Multi-page FormsとWCAG 3.3.7のUnderstanding、NN group「Wizards」(いずれも本文を直接取得して確認、2026-11)。
 */

const SOURCES = [
  {
    key: "hig",
    name: "Apple",
    doc: "Human Interface Guidelines ― Modality",
    term: "専用の名称なし(複数ステップの作業は全画面のモーダルで扱う)",
    color: "#C2542A",
    position: "ウィザード専用のコンポーネントはない。コンテンツの編集のような複数ステップの作業は、全画面のモーダルで支えられるとしている",
    stance: <span>複数ステップの作業(文書への書き込み・写真の編集など)には、気が散りにくい<Hl>全画面のモーダルを使うことを検討できる</Hl>としている。一方で、モーダルの作業は<Hl>単純・短く・すっきりと</Hl>保つよう求めている(複雑すぎると、中断した元の作業を見失うため)。</span>,
    progress: "モーダルに入ると元の場所から離れるため、作業名をタイトルに書き、必要なら説明を添えて、今どこで何をしているかを分かるようにする。",
    order: "モーダルの中に画面の階層を作ると、戻り方が分からなくなるとしている。サブビューが必要なら、たどる道を1本にし、閉じるボタンと間違えるようなボタンを置かない。",
    interruption: "閉じる手段を常に分かるようにする。閉じると作った内容が失われる場合は、事情を説明し、保存などの解決策を示す。",
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "写真の編集のような複数ステップの作業を、全画面のモーダルで集中して行う",
      "画面の中の道筋は1本にし、閉じる手段を常に見せる",
    ],
    searchHint: "multistep task",
    refs: [
      { label: "Modality", url: "https://developer.apple.com/design/human-interface-guidelines/modality" },
      { label: "Modality ― Best practices", url: "https://developer.apple.com/design/human-interface-guidelines/modality#Best-practices" },
    ],
    illustration: () => <StepMini color="#C2542A" steps={3} current={1} />,
    illustrationNote: "全画面のモーダルの中で進める(概念図)",
  },
  {
    key: "material",
    name: "Google",
    doc: "Material Design 1 ― Steppers(参考。現行M3には該当なし)",
    term: "Steppers(M1)",
    color: "#2F7D6E",
    position: "番号付きのステップで進み具合を示すStepperがM1にあった。現行M3のコンポーネント一覧にはなく、代わりのコンポーネントもない",
    stance: <span>手順を番号付きのステップに分けて、進み具合を示す。<Hl>ある入力によって次の入力が決まる場合に使う</Hl>。短いフォームを区切るために使ったり、1ページに複数置いたり、入れ子にしたりしない。</span>,
    progress: "画面の幅に合わせて、横型(前のステップの内容で次が決まる場合)と縦型(狭い画面向け)を使い分ける。モバイルでは、ステップを文字・点・プログレスバーで示し、ステップが多いときや途中で増えるときはプログレスバーにする。",
    order: <span>順に終えないと進めない型(linear)に加え、<Hl>好きな順に入れられる型(non-linear)</Hl>もある。順に進む流れの中の任意のステップは、「任意」と示す。</span>,
    interruption: "後から戻って直せる「編集できるステップ」と、終えたら直せない「編集できないステップ」がある。ステップの保存に時間がかかる場合は、保存後に短い知らせを出してよい。",
    accessibility: <NoData>記載なし</NoData>,
    useCases: [
      "前の入力で次の入力が決まる手順に、番号付きのステップを使う",
      "短いフォームの区切りには使わない",
    ],
    searchHint: "Steppers display progress",
    refs: [
      { label: "Steppers(M1、参考情報・現行M3ではない)", url: "https://m1.material.io/components/steppers.html" },
    ],
    glossary: [
      { term: "寸法(M1)", desc: "ステップの高さ72dp、番号の丸は24×24dp。" },
    ],
    illustration: () => <StepMini color="#2F7D6E" steps={3} current={1} numbered />,
    illustrationNote: "番号付きのステップ(M1の参考情報。概念図)",
  },
  {
    key: "wcag",
    name: "W3C",
    doc: "WAI Forms Tutorial ― Multi-page Forms / WCAG 3.3.7",
    term: "Multi-page forms(複数ページのフォーム)/ multi-step process",
    color: "#A3821F",
    position: "長いフォームは論理的なステップに分けることを勧め(チュートリアル)、同じ手続きの中で同じ入力を求めないことを要件とする(3.3.7。ウィザード形式そのものを求める基準ではない)",
    stance: <span>長いフォームは、論理的なまとまりごとの小さなフォームに分けると、取り組みやすく分かりやすくなる(特に、操作に慣れていない人や認知障害のある人)としている。<Hl>同じ手続きの中で、前に入力した情報をもう一度入力させない</Hl>(3.3.7・レベルA。自動で入れるか、選べるようにする。例外あり)。</span>,
    progress: <span>最初のステップで<Hl>全部で何ステップあるかを伝え</Hl>、各ステップで進み具合を伝える。ページのtitleと見出しに「ステップ2/4」のように入れる。ステップ数が決まっていれば、手順の一覧(順序付きリスト)で、完了・現在のステップを支援技術にも分かるように示す。</span>,
    order: "任意のステップは分かるようにし、飛ばせるようにする。全体の説明は各ページで繰り返す。",
    interruption: "できれば制限時間を設けない。設ける場合は、延長・調整できるようにする(2.2.1)。",
    accessibility: "理解可能(Understandable)・操作可能(Operable) ― 3.3.7(冗長な入力)と3.3.2(ラベル又は指示)は「理解可能」、2.2.1(期限調節可能)は「操作可能」、手順の一覧の構造(1.3.1)は「知覚可能」に対応する。",
    useCases: [
      "最初に全体のステップ数を伝え、ページの見出しとtitleに「ステップ2/4」を入れる",
      "前のステップで入力した情報は、自動で入れるか選べるようにする(3.3.7)",
    ],
    searchHint: "Indicating progress",
    refs: [
      { kind: "sc", level: "A", label: "3.3.7 冗長な入力", url: "https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html" },
      { kind: "sc", level: "A", label: "2.2.1 期限調節可能", url: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html" },
      { kind: "sc", level: "A", label: "3.3.2 ラベル又は指示", url: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html" },
      { label: "Forms Tutorial ― Multi-page Forms(チュートリアル。要件ではない)", url: "https://www.w3.org/WAI/tutorials/forms/multi-page/" },
    ],
    illustration: () => <StepMini color="#A3821F" steps={4} current={1} label="ステップ2/4" />,
    illustrationNote: "全体の数と今のステップを伝える(概念図)",
  },
  {
    key: "nn",
    name: "Nielsen Norman Group",
    doc: "Wizards: Definition and Design Recommendations",
    term: "Wizard(ウィザード)",
    color: "#7A4F7E",
    position: "決められた順に入力し、前の入力で次が変わる手順を、1ステップずつ進める形。たまにしか行わない作業向け",
    stance: <span><Hl>慣れていない人や、たまにしか行わない作業(設定・セットアップなど)に向く</Hl>。1ページの情報が少なくなり、間違いが減る。分岐によって、その人に関係のあるステップだけを見せられる。繰り返し使う人には、別の速い方法も用意する。</span>,
    progress: <span><Hl>ステップの一覧や図を出し、今のステップを強調して</Hl>、全体の流れと長さが分かるようにする。</span>,
    order: <span><Hl>順番をはっきりさせ、前のステップを終えるまで先に進ませない</Hl>(好きな順に進められる利点が大きいなら、ウィザードに向かない)。「次へ」「戻る」のボタンを置き、ボタンには次にすることが分かる名前を付ける。</span>,
    interruption: "途中で抜けて状態を保存し、後で再開できるようにする。各ステップは、ほかの場所や前のステップの情報を必要としないようにする。",
    accessibility: "根拠となる原則 ― POURのような適合区分ではなく、入力の負担と間違いを減らすための設計指針。",
    useCases: [
      "設定・セットアップのような、たまにしか行わない作業に使う",
      "ヘルプや説明は、ウィザードを覆わない位置に出す",
      "前回の選択を、次回の初期値に使う",
    ],
    searchHint: "Recommendations for Designing Usable Wizards",
    refs: [
      { label: "Wizards: Definition and Design Recommendations", url: "https://www.nngroup.com/articles/wizards/" },
      { label: "Modal & Nonmodal Dialogs(複数ステップの作業とモーダル)", url: "https://www.nngroup.com/articles/modal-nonmodal-dialog/" },
    ],
    illustration: () => <StepMini color="#7A4F7E" steps={3} current={1} list />,
    illustrationNote: "ステップの一覧で今の位置を示す(概念図)",
  },
];
markNeg(SOURCES);

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
      {items.map((it) => (
        <p key={it.term} style={styles.glossaryNoteLine}>
          <span style={styles.glossaryNoteTerm}>{it.term}</span>: {it.desc}
        </p>
      ))}
    </div>
  );
}


/* ステップの小さな見本(系列の図・サマリーで使う) */
function StepMini({ color, steps, current, numbered, list, label }) {
  if (list) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
        {Array.from({ length: steps }).map((_, i) => (
          <span key={i} style={{ fontSize: 9, color: i === current ? color : "#666D93", fontWeight: i === current ? 700 : 400 }}>{i < current ? "✓ " : i === current ? "▶ " : "・"}ステップ{i + 1}</span>
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {Array.from({ length: steps }).map((_, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ width: 14, height: 1.5, background: i <= current ? color : "#D5D9EC" }} />}
            <span style={{ width: numbered ? 16 : 10, height: numbered ? 16 : 10, borderRadius: "50%", background: i <= current ? color : "#FFFFFF", border: `1.5px solid ${i <= current ? color : "#D5D9EC"}`, color: "#FFFFFF", fontSize: 8.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{numbered ? (i < current ? "✓" : i + 1) : ""}</span>
          </React.Fragment>
        ))}
      </div>
      {label && <span style={{ fontSize: 9, color }}>{label}</span>}
    </div>
  );
}

/* サマリーのイメージ図: ステップの一覧と、今のステップの入力画面 */
function WizardSwatch() {
  const steps = ["お届け先", "支払い方法", "確認"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((t, i) => (
          <React.Fragment key={t}>
            {i > 0 && <span style={{ width: 36, height: 2, background: i <= 1 ? "#3A4FCF" : "#D5D9EC" }} />}
            <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: i <= 1 ? "#3A4FCF" : "#FFFFFF", border: `2px solid ${i <= 1 ? "#3A4FCF" : "#D5D9EC"}`, color: "#FFFFFF", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{i < 1 ? "✓" : i + 1}</span>
              <span style={{ fontSize: 10.5, color: i === 1 ? "#171B36" : "#666D93", fontWeight: i === 1 ? 700 : 400 }}>{t}</span>
            </span>
          </React.Fragment>
        ))}
      </div>
      <div style={{ width: 260, border: "1px solid #E1E3F0", borderRadius: 6, padding: "10px 12px", textAlign: "left", background: "#FFFFFF" }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "#171B36", marginBottom: 6 }}>支払い方法(ステップ2/3)</div>
        <div style={{ height: 8, borderRadius: 4, background: "#EEF1FA", marginBottom: 5 }} />
        <div style={{ height: 8, width: "70%", borderRadius: 4, background: "#EEF1FA", marginBottom: 10 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10.5, color: "#3A4FCF" }}>← お届け先に戻る</span>
          <span style={{ fontSize: 10.5, color: "#FFFFFF", background: "#3A4FCF", borderRadius: 4, padding: "2px 8px" }}>確認へ進む</span>
        </div>
      </div>
    </div>
  );
}

const SPLITS = [
  {
    q: "複数ステップの作業は、モーダルで出してよい?",
    sides: [
      { figure: <StepMini color="#C2542A" steps={3} current={1} />, who: "Apple", color: "#C2542A", t: "コンテンツの編集のような複数ステップの作業には、全画面のモーダルを検討できる。ただし、モーダルの作業は単純・短く保つ" },
      { figure: <StepMini color="#7A4F7E" steps={3} current={1} list />, who: "NN group", color: "#7A4F7E", t: "複数ステップのモーダルは、元の作業から離れる時間を延ばすだけ。最初から複数ステップが必要なら、モーダルではない普通のページを割り当てる" },
    ],
    tip: "写真の編集のように、元の画面を見る必要がなく、短く終わる作業なら全画面のモーダルでもよく(Apple)、会員登録や購入のように長く、途中で別の画面を確かめたくなる手順は、普通のページで進める(NN group)と考えると両立する。",
  },
  {
    q: "ステップは、好きな順に進めてよい?",
    sides: [
      { figure: <StepMini color="#2F7D6E" steps={3} current={2} numbered />, who: "Google(M1)", color: "#2F7D6E", t: "順に終えないと進めない型(linear)と、好きな順に入れられる型(non-linear)の両方を用意している" },
      { figure: <StepMini color="#7A4F7E" steps={3} current={1} list />, who: "NN group", color: "#7A4F7E", t: "順番をはっきりさせ、前のステップを終えるまで先に進ませない。好きな順に進められる利点が大きいなら、そもそもウィザードに向かない" },
    ],
    tip: "前の入力で次の内容が変わる手順は、順に進める形にする(両者とも一致)。順番に意味がない入力なら、ステップに分けずに1つのフォームや、見出しで区切ったページにするほうが、NN groupの考え方に合う。Googleのnon-linearは、現行M3にはないM1の参考情報だ。",
  },
];

/* タイトル直下の1文と、サマリーの表(目的・役割など) */
const LEAD = "入力の手順をいくつかのステップに分け、1つずつ順に進めてもらう形式";
const ABOUT = [
  { k: "目的・役割", v: "長く複雑な入力を小さなまとまりに分け、迷わず最後まで進めるようにする" },
  { k: "よく使われる場面", v: "会員登録、購入手続き(お届け先→支払い→確認)、アプリの初期設定" },
  { k: "似たコンポーネント", v: <>1画面で済む入力は<PageLink to="/components/text-inputs/text-field">テキストフィールド</PageLink>などを並べたフォーム、1つの作業を全画面で行うのは<PageLink to="/components/containment/fullscreen-dialog">フルスクリーンダイアログ</PageLink></> },
];

const ROWS = [
  ["名称", "term"], ["位置づけ", "position"], ["基本方針", "stance"], ["進み具合と現在地", "progress"], ["順番・戻る", "order"],
  ["中断・保存", "interruption"], ["アクセシビリティ(WCAG基準)", "accessibility"],
];

/* まず押さえる要点(2026-11 ⑦本人レビュー。レビュー表M列の案。根拠が「AI解釈」のものはこのサイトの解釈) */
const KP = [
  { n: 1, t: "全体のステップ数と、今の位置を示す", d: "", who: "Google(M1)・W3C・NN group" },
  { n: 2, t: "前の入力で次の内容が変わる手順だけ、ステップに分ける", d: "", who: "AI解釈" },
  { n: 3, t: "順番に意味がない入力は、1つのフォームにする", d: "", who: "NN groupの考え方。AI解釈" },
  { n: 4, t: "長く、途中で別の画面を確かめたくなる手順は、普通のページで進める", d: "", who: "NN group" },
];


/* ウィザードの種類と使い方(2026-11 ⑦本人レビューNo.067で追加。M1 Steppers・W3C Multi-page Forms・NN group Wizardsの要約。図は概念図) */
function WizFig({ k }) {
  const g = "#2F7D6E", l = "#D5D9EC";
  const box = (c) => (<svg width="120" height="70" viewBox="0 0 120 70" aria-hidden="true"><rect x="0.5" y="0.5" width="119" height="69" rx="5" fill="#F8F9FD" stroke="#E1E3F0" />{c}</svg>);
  if (k === "h") return box(<>{[16, 50, 84].map((x, i) => (<g key={x}><circle cx={x} cy="16" r="6" fill={i < 2 ? g : "#FFFFFF"} stroke={g} /><text x={x} y="19" fontSize="7" textAnchor="middle" fill={i < 2 ? "#FFFFFF" : g}>{i + 1}</text></g>))}<line x1="22" y1="16" x2="44" y2="16" stroke={l} /><line x1="56" y1="16" x2="78" y2="16" stroke={l} />{[34, 44, 54].map((y) => (<rect key={y} x="12" y={y} width="96" height="5" rx="2" fill={l} />))}</>);
  if (k === "v") return box(<>{[10, 30, 50].map((y, i) => (<g key={y}><circle cx="14" cy={y} r="5.5" fill={i === 1 ? g : i === 0 ? "#E3EDE9" : "#FFFFFF"} stroke={g} /><rect x="26" y={y - 3} width={i === 1 ? 50 : 36} height="5" rx="2" fill={i === 1 ? g : l} />{i === 1 && <rect x="26" y={y + 6} width="80" height="8" rx="2" fill={l} />}</g>))}<line x1="14" y1="16" x2="14" y2="24" stroke={l} /><line x1="14" y1="36" x2="14" y2="44" stroke={l} /></>);
  if (k === "m") return box(<><text x="20" y="20" fontSize="8" fill={g} fontWeight="700">2 / 4</text>{[52, 60, 68, 76].map((x, i) => (<circle key={x} cx={x} cy="17" r="2.6" fill={i <= 1 ? g : l} />))}<rect x="12" y="34" width="96" height="4" rx="2" fill={l} /><rect x="12" y="34" width="48" height="4" rx="2" fill={g} /><text x="60" y="56" fontSize="7" textAnchor="middle" fill="#565D8A">文字・点・バー</text></>);
  return box(<><text x="12" y="20" fontSize="8.5" fill="#171B36" fontWeight="700">お届け先(ステップ2/4)</text>{[32, 42, 52].map((y) => (<rect key={y} x="12" y={y} width="96" height="5" rx="2" fill={l} />))}</>);
}
const WIZ_LOOKS = [
  { k: "h", t: "横に並べる", d: "上部に番号とステップ名を並べる。前のステップで次の内容が変わるときに向く。名前は短くし、スクロールしても上部に固定できる", src: "Google(M1 Steppers)" },
  { k: "v", t: "縦に並べる", d: "ステップを縦に並べ、今のステップだけを開く。狭い画面向けで、スマートフォンにそのまま使える", src: "Google(M1 Steppers)" },
  { k: "m", t: "スマートフォンの簡易表示", d: "「2/4」の文字、点(ステップが少ないとき)、バー(ステップが多いとき・途中で増えるとき)", src: "Google(M1 Steppers)" },
  { k: "t", t: "見出しで示す", d: "見出しやページのタイトルに「ステップ2/4」と入れる。スクリーンリーダーの利用者にもすぐ伝わる", src: "W3C(Multi-page Forms)" },
];
const WIZ_FLOWS = [
  { k: "linear", t: "順番どおりに進む", d: "前のステップを終えないと次へ進めない", src: "Google(M1 Linear)" },
  { k: "free", t: "好きな順に進める", d: "どのステップからでも始められる", src: "Google(M1 Non-linear)" },
  { k: "edit", t: "あとで直せる・直せない", d: "直せるステップは戻って編集できる。直すと完了の妨げになるなら直せないステップにする", src: "Google(M1)" },
  { k: "opt", t: "任意のステップ", d: "「任意」と示し、飛ばせるようにする", src: "Google(M1)・W3C" },
];
/* 進み方の概念図 */
function FlowFig({ k }) {
  const g = "#2F7D6E", l = "#D5D9EC";
  const dot = (x, i, fill, label) => (<g key={i}><circle cx={x} cy="30" r="9" fill={fill} stroke={g} /><text x={x} y="33.5" fontSize="9" textAnchor="middle" fill={fill === g ? "#FFFFFF" : g} fontWeight="700">{label}</text></g>);
  const xs = [20, 60, 100];
  return (
    <svg width="120" height="70" viewBox="0 0 120 70" aria-hidden="true">
      <rect x="0.5" y="0.5" width="119" height="69" rx="5" fill="#F8F9FD" stroke="#E1E3F0" />
      {k === "linear" && <>{[0, 1].map((i) => (<path key={i} d={`M${xs[i] + 10} 30 h20 m-4 -4 l4 4 l-4 4`} stroke={g} strokeWidth="1.4" fill="none" />))}{xs.map((x, i) => dot(x, i, i === 0 ? g : "#FFFFFF", i + 1))}<text x="60" y="58" fontSize="8" textAnchor="middle" fill="#565D8A">1→2→3の順だけ</text></>}
      {k === "free" && <>{xs.map((x, i) => dot(x, i, i === 2 ? g : "#FFFFFF", i + 1))}<path d="M20 42 C20 56, 100 56, 100 42" stroke={g} strokeWidth="1.4" fill="none" strokeDasharray="3 2" /><path d="M96 46 l4 -4 l3 5" stroke={g} strokeWidth="1.4" fill="none" /><text x="60" y="64" fontSize="8" textAnchor="middle" fill="#565D8A">どこからでも</text></>}
      {k === "edit" && <>{[0, 1].map((i) => (<line key={i} x1={xs[i] + 10} y1="30" x2={xs[i + 1] - 10} y2="30" stroke={l} strokeWidth="1.4" />))}{xs.map((x, i) => dot(x, i, i < 2 ? g : "#FFFFFF", i < 2 ? "✓" : 3))}<text x="20" y="54" fontSize="7.5" textAnchor="middle" fill={g}>直せる</text><text x="60" y="54" fontSize="7.5" textAnchor="middle" fill="#C0503F">直せない</text></>}
      {k === "opt" && <>{[0, 1].map((i) => (<line key={i} x1={xs[i] + 10} y1="30" x2={xs[i + 1] - 10} y2="30" stroke={l} strokeWidth="1.4" />))}{dot(20, 0, g, 1)}<g><circle cx="60" cy="30" r="9" fill="#FFFFFF" stroke={g} strokeDasharray="2.5 2" /><text x="60" y="33.5" fontSize="9" textAnchor="middle" fill={g}>2</text></g>{dot(100, 2, "#FFFFFF", 3)}<path d="M24 20 C40 4, 80 4, 96 20" stroke={g} strokeWidth="1.4" fill="none" /><path d="M92 18 l4 2 l-1 -4" stroke={g} strokeWidth="1.4" fill="none" /><text x="60" y="54" fontSize="8" textAnchor="middle" fill="#565D8A">2は任意(飛ばせる)</text></>}
    </svg>
  );
}
const WIZ_FIT = [
  { k: "good", t: "向いている", d: "初めての人や、たまにしかしない手続き(初期設定・申し込みなど)。前の答えで次に聞くことが変わる手続き(人によって最短の道筋になる)", src: "NN group" },
  { k: "bad", t: "向いていない", d: "何度も繰り返す入力(1つずつ進むのは手間になる)。ステップをまたいで情報を見比べたい作業。途中で別の画面を確かめたくなる作業", src: "NN group" },
  { k: "avoid", t: "避ける", d: "短いフォームを区切るためだけに使う。1ページにステップ表示を複数置く・入れ子にする", src: "Google(M1)" },
];
/* 使うとき・使わないときの概念図 */
function FitFig({ k }) {
  const g = "#2F7D6E", l = "#D5D9EC";
  const mark = { good: ["◯", "#5A9629"], bad: ["△", "#A3821F"], avoid: ["✕", "#C0503F"] }[k];
  return (
    <svg width="120" height="70" viewBox="0 0 120 70" aria-hidden="true">
      <rect x="0.5" y="0.5" width="119" height="69" rx="5" fill="#F8F9FD" stroke="#E1E3F0" />
      {k === "good" && <>{[22, 52, 82].map((x, i) => (<g key={x}><rect x={x} y="22" width="22" height="26" rx="3" fill="#FFFFFF" stroke={g} /><rect x={x + 4} y="28" width="14" height="3" rx="1" fill={l} /><rect x={x + 4} y="35" width="10" height="3" rx="1" fill={l} />{i < 2 && <path d={`M${x + 24} 35 h4`} stroke={g} strokeWidth="1.4" />}</g>))}<text x="56" y="62" fontSize="7.5" textAnchor="middle" fill="#565D8A">1つずつ順に答える</text></>}
      {k === "bad" && <>{[0, 1, 2].map((i) => (<g key={i}><rect x={14 + i * 32} y="16" width="26" height="34" rx="3" fill="#FFFFFF" stroke={g} /><rect x={18 + i * 32} y="22" width="18" height="3" rx="1" fill={l} /></g>))}<path d="M27 56 C40 66, 80 66, 91 56" stroke="#A3821F" strokeWidth="1.4" fill="none" /><path d="M27 56 l-1 5 m1 -5 l5 1 M91 56 l1 5 m-1 -5 l-5 1" stroke="#A3821F" strokeWidth="1.4" fill="none" /><text x="60" y="12" fontSize="7.5" textAnchor="middle" fill="#565D8A">行き来して見比べる</text></>}
      {k === "avoid" && <><rect x="30" y="12" width="60" height="46" rx="4" fill="#FFFFFF" stroke={g} /><text x="60" y="24" fontSize="7" textAnchor="middle" fill={g}>ステップ1/2</text><rect x="38" y="30" width="44" height="5" rx="2" fill={l} /><rect x="38" y="40" width="30" height="5" rx="2" fill={l} /><text x="60" y="66" fontSize="7.5" textAnchor="middle" fill="#565D8A">入力が2つだけのフォーム</text></>}
      <circle cx="108" cy="12" r="8" fill="#FFFFFF" stroke={mark[1]} /><text x="108" y="15.5" fontSize="9" textAnchor="middle" fill={mark[1]} fontWeight="700">{mark[0]}</text>
    </svg>
  );
}
const cardGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 10, marginBottom: 12 };
const cardBox = { border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 10px" };
function WizCards({ items, Fig, titleColor }) {
  return (
    <div style={cardGrid}>
      {items.map((w) => (
        <div key={w.k} style={cardBox}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><Fig k={w.k} /></div>
          <div style={{ fontSize: 13, fontWeight: 700, color: titleColor ? titleColor(w.k) : "#171B36", marginBottom: 4 }}>{w.t}</div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: "#2E3457" }}>{w.d}</div>
          <div style={{ fontSize: 10.5, color: "#666D93", marginTop: 4 }}>{w.src}</div>
        </div>
      ))}
    </div>
  );
}
function WizardKinds() {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={styles.diagramTitle}>ウィザードの見せ方</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 10, marginBottom: 12 }}>
        {WIZ_LOOKS.map((w) => (
          <div key={w.k} style={{ border: "1px solid #E1E3F0", borderRadius: 6, padding: "12px 12px 10px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><WizFig k={w.k} /></div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#171B36", marginBottom: 4 }}>{w.t}</div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: "#2E3457" }}>{w.d}</div>
            <div style={{ fontSize: 10.5, color: "#666D93", marginTop: 4 }}>{w.src}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, lineHeight: 1.7, color: "#454C78", margin: "0 0 24px" }}>どの見せ方でも、<strong>全体のステップと今の位置</strong>を示す(NN group・W3C)。最初のステップで、あといくつ続くかを伝えるとよい(W3C)。</p>
      <h2 style={styles.diagramTitle}>進み方の種類</h2>
      <WizCards items={WIZ_FLOWS} Fig={FlowFig} />
      <h2 style={{ ...styles.diagramTitle, marginTop: 24 }}>使うとき・使わないとき</h2>
      <WizCards items={WIZ_FIT} Fig={FitFig} titleColor={(k) => ({ good: "#2E6B3A", bad: "#7A5F12", avoid: "#A33A2E" }[k])} />
    </section>
  );
}

export default function TextInputsWizardPage() {
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
        <SidebarNav currentPath="/components/text-inputs/wizard" />
        <div className="dsp-inner">
          <div style={styles.metaRow}>
            <span>コンポーネント / ウィザード</span>
            <span>SPEC No. 063</span>
          </div>

          <h1 style={styles.title}>ウィザード(ステップ形式の入力)</h1>
          <SummaryCard keyPoints={KP}
            image={<WizardSwatch />}
            imageNote="全体のステップと今の位置を示し、次にすることが分かる名前のボタンで進む。"
            lead={LEAD}
            rows={ABOUT}
          />

          <SplitSection splits={SPLITS} />

          <WizardKinds />

          <h2 style={styles.diagramTitle}>四系列デザインシステム比較</h2>
          <div style={styles.synthesisBox}>
            <div style={styles.synthesisLabel}>AI解釈 ― 総括</div>
            <p style={styles.synthesisText}>
              <strong>ウィザード専用のコンポーネントを、現行のガイドラインとして持つ系列はない</strong>。Appleは全画面のモーダルの中で扱い、GoogleはMaterial Design 1にStepperがあったが現行のM3にはない。最も具体的なのはNN groupの記事と、W3Cの複数ページのフォームのチュートリアルだ。
            </p>
            <p style={styles.synthesisText}>
              共通しているのは、<strong>全体のステップ数と今の位置を示す</strong>ことだ。NN groupはステップの一覧や図で今のステップを強調するよう求め、W3Cは最初に全体の数を伝え、見出しやtitleに「ステップ2/4」と入れることを勧めている。また、<strong>途中で中断しても作業を失わないようにする</strong>ことも、Apple・W3C・NN groupの3系列が触れている(閉じる前の確認・制限時間の延長・途中保存)。
            </p>
            <p style={styles.synthesisText}>
              W3Cの<strong>3.3.7(冗長な入力)</strong>は、同じ手続きの中で前に入力した情報をもう一度入力させないことを求める、ウィザードに直接関わる要件だ(例外あり)。モーダルで出すかどうかと、好きな順に進めてよいかは、系列で意見が分かれる(「意見が分かれる点」を参照)。
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
                {s.illustration && (
                  <div style={styles.illustrationBox}>
                    {s.illustration()}
                    {s.illustrationNote && <p style={styles.illustrationNote}>{s.illustrationNote}</p>}
                  </div>
                )}
                <div style={styles.termLine}><span style={styles.termLabel}>名称</span>{s.term}</div>
                <div style={styles.positionBadge}>{s.position}</div>
                {ROWS.slice(2).map(([label, key]) => (<InfoBox key={key} label={label}>{s[key]}</InfoBox>))}
                <InfoBox label="ユースケース"><UseCaseList items={s.useCases} /></InfoBox>
                <InfoBox label="参照ページ(公式)">
                  <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                </InfoBox>
                {s.searchHint && (
                  <span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>
                )}
                {s.glossary && <GlossaryNote items={s.glossary} />}
              </div>
            ))}
          </div>

          <div className="dsp-desktop-only">
            <div style={styles.matrixScroll}>
              <div style={styles.matrixGrid}>
                <div style={{ ...styles.labelCell, ...styles.headerRowCell }} />
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.headerCell, ...styles.headerRowCell }}>
                    <div style={styles.sourceName}>{s.name}</div>
                    <div style={styles.sourceDoc}>{s.doc}</div>
                  </div>
                ))}
                <div style={styles.labelCell}>デザインイメージ</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, flexDirection: "column", gap: 4 }}>
                    {s.illustration ? s.illustration() : null}
                    {s.illustrationNote && <span style={styles.illustrationNoteSmall}>{s.illustrationNote}</span>}
                  </div>
                ))}
                {ROWS.map(([label, key]) => (
                  <React.Fragment key={key}>
                    <div style={styles.labelCell}>{label}</div>
                    {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}>{s[key]}</div>))}
                  </React.Fragment>
                ))}
                <div style={styles.labelCell}>ユースケース</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.textCell }}><UseCaseList items={s.useCases} /></div>))}
                <div style={styles.labelCell}>参照ページ(公式)</div>
                {SOURCES.map((s) => (
                  <div key={s.key} style={{ ...styles.cell, ...styles.textCell, flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
                    <RefList refs={s.refs} withW3cNote={s.key === "wcag"} />
                    {s.searchHint && (<span style={styles.searchHint}>ページ内検索: <span style={styles.searchHintWord}>&ldquo;{s.searchHint}&rdquo;</span></span>)}
                  </div>
                ))}
                <div style={{ ...styles.labelCell, ...styles.lastRowCell }}>メモ</div>
                {SOURCES.map((s) => (<div key={s.key} style={{ ...styles.cell, ...styles.lastRowCell, ...styles.textCell }}>{s.glossary ? <GlossaryNote items={s.glossary} /> : <NoData>該当なし</NoData>}</div>))}
              </div>
            </div>
          </div>

          <RelatedPages paths={["/components/text-inputs/text-field", "/components/containment/fullscreen-dialog", "/components/text-inputs/input-validation", "/components/communication/progress"]} />

          <div style={styles.tagsRow}>
            {["操作可能(POUR)", "理解可能(POUR)"].map((t) => (<TagLink key={t} t={t} style={styles.tagPrinciple} />))}
            {["入力・フォーム", "段階的に見せる"].map((t) => (<TagLink key={t} t={t} style={styles.tagProcess} />))}
          </div>

          <div style={styles.footer}>
            <span>最終確認: 2026-11</span>
            <span>更新方針: 一次情報の変更を定期確認 → AIが下書き → 人が承認</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Jost', 'Noto Sans JP', sans-serif", color: "#171B36" },
  layout: { display: "flex", alignItems: "flex-start" },
  metaRow: { display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#666D93", letterSpacing: 0.3, marginBottom: 14 },
  title: { fontSize: 28, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2 },
  synthesisBox: { background: "#FAFCEE", borderLeft: "4px solid #5A9629", padding: "18px 20px", marginBottom: 22, borderRadius: "0 4px 4px 0" },
  synthesisLabel: { fontSize: 17, color: "#5A9629", fontWeight: 700, marginBottom: 10, letterSpacing: 0.2 },
  synthesisText: { fontSize: 13.5, lineHeight: 1.85, color: "#171B36", margin: "0 0 10px" },
  diagramTitle: { fontSize: 15, fontWeight: 700, margin: "0 0 12px", color: "#171B36" },
  sourceList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 },
  sourceCard: { background: "#FFFFFF", border: "1px solid #E1E3F0", borderRadius: 4, padding: "14px 16px" },
  sourceHeadRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  sourceName: { fontWeight: 600, fontSize: 14.5 },
  sourceDoc: { fontSize: 11, color: "#666D93", marginTop: 1 },
  positionBadge: { display: "inline-block", marginTop: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#3C5A73", background: "#F0F4F8", padding: "3px 8px", borderRadius: 3 },
  illustrationBox: { margin: "12px 0", textAlign: "center" },
  illustrationNote: { fontSize: 10, color: "#666D93", margin: "6px 0 0" },
  illustrationNoteSmall: { fontSize: 9.5, color: "#666D93", lineHeight: 1.4 },
  sourceStance: { fontSize: 12.5, lineHeight: 1.65, color: "#2E3457", margin: "10px 0 10px" },
  infoBox: { background: "#F8F9FD", borderLeft: "2px solid #E1E3F0", padding: "8px 10px", marginBottom: 10, borderRadius: "0 3px 3px 0" },
  exceptionLabel: { fontFamily: "'Jost', 'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 700, color: "#454C78", letterSpacing: 0.2, display: "block", marginBottom: 4 },
  exceptionText: { fontSize: 11.5, lineHeight: 1.6, color: "#454C78", margin: 0 },
  confirmedNote: { fontSize: 10, color: "#666D93", margin: "0 0 10px", lineHeight: 1.5, fontStyle: "italic" },
  useCaseList: { margin: 0, padding: "0 0 0 16px" },
  useCaseItem: { fontSize: 11.5, lineHeight: 1.7, color: "#454C78" },
  glossaryNoteBox: { marginTop: 2, marginBottom: 10 },
  glossaryNoteLabel: { display: "block", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, fontWeight: 700, color: "#666D93", letterSpacing: 0.3, marginBottom: 4 },
  glossaryNoteLine: { fontSize: 10.5, lineHeight: 1.6, color: "#666D93", margin: "0 0 4px", fontStyle: "italic" },
  glossaryNoteTerm: { color: "#565D8A", fontStyle: "normal", fontWeight: 600 },
  sourceFootRow: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 },
  searchHint: { fontSize: 10.5, color: "#666D93" },
  searchHintWord: { fontFamily: "'IBM Plex Mono', monospace", color: "#454C78", fontWeight: 600 },
  sourceLink: { fontSize: 11, color: "#3A4FCF", textDecoration: "underline" },
  matrixScroll: { overflowX: "auto", marginBottom: 40 },
  matrixGrid: { display: "grid", gridTemplateColumns: "110px repeat(4, 1fr)", minWidth: 700, border: "1px solid #E1E3F0" },
  labelCell: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 10.5, color: "#565D8A", padding: "10px 10px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center", background: "#F8F9FD" },
  headerCell: { padding: "16px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  headerRowCell: { background: "#FFFFFF" },
  cell: { padding: "10px 12px", borderRight: "1px solid #E1E3F0", borderBottom: "1px solid #E1E3F0", display: "flex", alignItems: "center" },
  textCell: { display: "block", fontSize: 11.5, lineHeight: 1.65, color: "#2E3457", alignItems: "flex-start", minWidth: 0, overflowWrap: "break-word", wordBreak: "break-word" },
  link: { fontSize: 11, color: "#171B36", textDecoration: "underline" },
  lastRowCell: { borderBottom: "none" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 40 },
  tagPrinciple: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#171B36", color: "#FFFFFF", fontFamily: "'IBM Plex Mono', monospace" },
  tagProcess: { fontSize: 11, padding: "4px 9px", borderRadius: 3, background: "#EEF1FA", color: "#2E3457", fontFamily: "'IBM Plex Mono', monospace" },
  termLine: { fontSize: 12, color: "#2E3457", marginTop: 8 },
  termLabel: { fontSize: 10.5, fontWeight: 700, color: "#565D8A", marginRight: 8 },
  diagramNote: { fontSize: 11.5, color: "#666D93", margin: "0 0 10px", lineHeight: 1.6 },
  footer: { display: "flex", flexDirection: "column", gap: 3, fontSize: 10.5, color: "#666D93", borderTop: "1px solid #E1E3F0", paddingTop: 12 },
};
