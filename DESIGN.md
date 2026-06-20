---
name: 拼豆工坊 · Perler Studio
description: 治愈系拼豆手作模拟小游戏的视觉系统——粉彩 · 拟物温度 · 主题玻璃 · 移动优先 · 每屏可截图
colors:
  ink: "#26242b"
  muted: "#5a5763"
  line: "#d6dae2"
  surface: "#ffffff"
  surface-2: "#f6f8fc"
  surface-3: "#edf2f5"
  page-base: "#eef2f4"
  table: "#dfe7e8"
  table-deep: "#c4d4d7"
  brand-mint: "#57b8a7"
  brand-ink: "#1f6153"
  brand-edge: "#3f988b"
  brand-cta: "#3d9c8c"
  brand-cta-strong: "#389586"
  coral: "#e7645f"
  amber: "#d99b3d"
  blue: "#4d77b8"
  violet: "#7b6fb1"
typography:
  display:
    fontFamily: "LXGW Marker Gothic, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "22px"
    fontWeight: 750
    lineHeight: 1.12
    letterSpacing: "normal"
  headline:
    fontFamily: "LXGW Marker Gothic, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "LXGW Marker Gothic, Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Noto Sans SC, PingFang SC, Hiragino Sans GB, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Noto Sans SC, PingFang SC, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  "2xs": "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
components:
  button-primary:
    backgroundColor: "{colors.brand-cta}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "0 16px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#3a9485"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.coral}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    height: "44px"
  chip-color:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: "3px 4px 2px"
    height: "48px"
  chip-color-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
  card-solid:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "16px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "44px"
---

# Design System: 拼豆工坊 · Perler Studio

## 1. Overview

**Creative North Star: "桃面糖豆手作 / The Cozy Pastel Bead Tray"**

一盘像糖果一样的彩豆，摆在暖意的手作桌上——可爱、轻盈、想拍下来分享，但桌面始终干净，让作品和那张截图当主角。桌面端承载完整的取豆、豆筛、豆针 / 镊子摆放流程；手机端以本图用色直接摆豆，保留检查、熨烫、冷却和收藏，不把桌面工具压缩塞入窄屏。两端共同追求「桌前慢慢做手工」的安心与专注，而不是形式上的控件一致。

视觉密度刻意压低：靠**柔和粉彩**、**圆润形状**、**拟物质感**传达可爱，而不是靠堆元素。三层结构是整套语言的骨架——阶段背景图（L0）打底并随主题染色，高透磨砂玻璃面板（L1）浮在其上，纯白实心卡片/弹窗（L2）承载需要绝对可读的内容。品牌色不是写死的薄荷绿，而是运行时按 5 套主题（雾青/奶杏/浅樱/晴蓝/草木）整体替换的一组 token，所以同一套界面能换出五种氛围而保持同一性格。

本系统明确**拒绝**：商业 SaaS 的冷淡硬朗与仪表盘感、一眼 AI 的「生成感」同质卡片网格、emoji 当 UI 图标、以及任何为了「更高级」而堆上去的装饰性玻璃/渐变。可爱来自克制，不来自繁复。

**Key Characteristics:**
- 粉彩 + 拟物温度，圆润轻盈，黏土般柔和的投影（非硬黑）。
- 三层玻璃骨架：背景图 → 高透玻璃面板 → 实心卡片/弹窗。
- 主题即一组可运行时替换的 token：一套语言，五种氛围。
- 平台分工明确：手机直接摆豆且只显示本图用色；桌面拼豆与绘图台保留完整 MARD 221 色，桌面拼豆保留豆筛与工具。
- 移动优先、强制朝向、每一屏都能单独截图发小红书。
- 治愈优先于效率：克制留白，把作品和截图当主角。

## 2. Colors

整体是**雾感低饱和的粉彩**：中性近白打底，一抹薄荷雾绿做品牌主音，五个分类强调色像糖豆一样点缀其间。

### Primary
- **薄荷雾绿 / Misty Mint** (`#57b8a7`，token `--brand` = `--mint`)：品牌主色，用于高亮、激活态、chip 选中。**运行时被主题覆盖**——雾青默认绿、奶杏转金、浅樱转粉、晴蓝转蓝、草木转草绿。
- **深苔绿 / Deep Moss** (`#1f6153`，`--brand-ink`)：品牌文字色，白底 ≈7.6:1，达 AA，用于品牌语义的可读文本。
- **松石描边 / Teal Edge** (`#3f988b`，`--brand-edge`)：品牌描边与激活边框。
- **亮松石 CTA / Brightened Teal** (`#3d9c8c` → `#389586`，`--brand-cta` / `--brand-cta-strong`)：**仅供主按钮渐变**，每套主题各有一组同色相压深值，保证白字 ≥3:1（见下方具名规则）。

### Secondary（五彩分类强调）
- **珊瑚橘红 / Coral** (`#e7645f`，`--coral`)：破坏性操作（`.danger-*`）、分类标识。
- **蜜糖琥珀 / Honey Amber** (`#d99b3d`，`--amber`)：分类标识、提示点缀。
- **晴空蓝 / Sky Blue** (`#4d77b8`，`--blue`)：分类标识。
- **薰衣草紫 / Lavender** (`#7b6fb1`，`--violet`)：分类标识。

### Neutral
- **浓墨 / Ink** (`#26242b`，`--ink`)：主文字。
- **雾灰 / Muted Slate** (`#5a5763`，`--muted`)：次要文字，白底 ≈7.05:1（为玻璃面板叠背景照片留对比度余量；原 #686572=5.7:1）。
- **浅雾描边 / Mist Line** (`#d6dae2`，`--line`)：描边与分隔线。
- **面层三阶 / Surfaces** (`#ffffff` / `#f6f8fc` / `#edf2f5`，`--surface` / `-2` / `-3`)：实心面层由白到浅青白。
- **雾青底 / Foggy Teal Base** (`#eef2f4`，`--page-base`)：页面底色（默认主题）。
- **看板色 / Pegboard** (`#dfe7e8` / `#c4d4d7`，`--table` / `--table-deep`)：拼豆板表面与深格，随主题替换。

### Named Rules
**The Theme-Token Rule（主题 token 铁律）.** 组件颜色一律用 `var(--brand…)` 等 token，**永不写死薄荷绿**。运行时 `theme.js` 的 `applyBackgroundTheme()` 会按主题覆盖 `--brand` / `--brand-ink` / `--brand-edge` / `--brand-tint(-strong)` / `--bg-scrim` / `--page-*` / `--table*`；写死颜色会在切主题时脱节。改 `tokens.css` 必须同步本文件与 `design-system/MASTER.md`。

**The Bright-CTA Exception Rule（亮 CTA 例外）.** 主按钮 = 白字 + cta 渐变 ≈ **3.3:1**：满足大字 3:1，**不满足正文 4.5:1**——这是为「更亮观感」的**有意取舍**。每套主题在 `constants.js` 里有自己的 `cta:[top,bottom]`（同色相压深），各套都保证 ≥3:1。**cta 色绝不能用于小字文本。**

**The Five-Accent Rule（五彩仅分类）.** `--mint` / `--coral` / `--amber` / `--blue` / `--violet` 只作分类标识（首页入口、按系列区分等），**不承载正文文字**（饱和度不够暗，达不到 4.5:1）。颜色不作为唯一信息载体——一律配文字或图标。

## 3. Typography

**全站只用两款字体，按「角色」二选一**——代号即角色，换字只改 `tokens.css` 两行值：

- **`--font-clear` = Noto Sans SC（更清晰）**：正文 / 标签 / 数据 / 色号 / 计数 / 输入框 / 小字——一切「读信息」的文字。走 Google Fonts，是页面默认字族。
- **`--font-cute` = LXGW 霞鹜记号体（LXGW Marker Gothic，更可爱·手写记号体）**：Hero/标题 / 品牌标 / 区块标题 / 主要动作按钮 / 工具卡标题 / 反馈三件套 / 引导步骤标题——「身份与时刻」。走 jsDelivr（CSP 已放行 `cdn.jsdelivr.net`），单字重 400，靠字号撑层级（避免重 faux-bold）。

二者离线 `file://` 时优雅回退：cute → clear → 系统圆黑（PingFang / Hiragino / YaHei）。**短码等需被复制/输入的内容用 clear**，不用 cute。

**The Clear-vs-Cute Rule（二选一判定）.** 一句话：**为读信息（正文/数据/标签/数字/小字）→ `--font-clear`；是标题/品牌/主动作/庆祝时刻 → `--font-cute`**。硬底线：**< ~15px 或数字/代码一律 clear**（记号体小字会糊）。

**Character:** clear 端清晰中性、cute 端手写记号体的圆头亲和；二者都贴合粉彩拟物的治愈基调。**勿换衬线**——衬线会立刻把治愈感变成编辑感/冷淡感。

### Hierarchy
- **Display / 标题** (`--font-cute`, `22px` = `--fs-xl`, line-height `1.12`)：Hero / 首屏大标题，大字略放松行高。
- **Headline** (700, `18px` = `--fs-lg`, line-height `1.2`)：区块主标题。
- **Title** (700, `16px` = `--fs-title`, line-height `1.2`)：模态/区块/卡片标题，**专门比正文 base14 高一档**。
- **Body** (`--font-clear`, 400, `14px` = `--fs-base`（次要可用 `15px` = `--fs-md`）, line-height `1.55`)：多行正文，达 1.5–1.7 呼吸目标。
- **Label** (`--font-clear`, 700, `13/11/10px` = `--fs-sm/xs/2xs`, line-height `1.2`)：色号、徽标、辅助小字。

### Named Rules
**The Round-Only Rule（只用圆体）.** 字族锁定 clear = Noto Sans SC、cute = LXGW 霞鹜记号体，二者皆配中文圆黑回退。**禁止衬线、禁止再引入第三款字体**。一律走 `var(--font-clear)` / `var(--font-cute)` token，不要再写死字族；改字族同步 `tokens.css` 与本文件。
> 注：画布出片图（`render.js` 的 `ctx.font`）仍是独立体系（Avenir Next / PingFang），未并入这两款 token——如需统一，需先 `document.fonts.ready` 再绘制以避免 canvas FOUT。

**The Title-Tier Rule（标题分档）.** 中层标题用 `--fs-title 16` 与正文 `base 14` 拉开一档——**不要让标题与正文同号、只靠字重区分**。

**The 16px-Input Rule.** 输入框字号 ≥ `16px`，防 iOS 聚焦自动缩放。

## 4. Elevation

本系统用**柔和黏土感的扩散投影**营造层次（不是硬黑投影，也不是纯扁平），并叠加一套**三层玻璃**的透明度层次。「黏土感」指投影柔软、扩散、贴合圆角的质感——是描述投影风格的比喻，与材质无关。

### Shadow Vocabulary
- **贴地 / Grounded** (`--sh-1` = `0 2px 8px rgba(49,54,68,0.06)`)：贴地小元素。
- **面板 / Panel** (`--sh-2` = `0 10px 24px rgba(49,54,68,0.09)`)：L1 玻璃面板。
- **浮卡 / Floating** (`--sh-3` = `0 18px 46px rgba(49,54,68,0.14)`)：浮起卡片。
- **弹窗 / Popover** (`--sh-pop` = `0 22px 56px rgba(38,36,43,0.22)`)：L2 弹窗。
- **高光内阴影 / Inset Highlight** (`--sh-inset` = `inset 0 1px 0 rgba(255,255,255,0.7)`)：按钮顶部高光，黏土立体感来源。

### Named Rules
**The Three-Layer Glass Rule（三层玻璃）.** 永远按三层组织深度：**L0** 阶段背景图（叠 `--bg-scrim` 蒙版，随主题染色）→ **L1** 高透磨砂玻璃面板（`--glass-bg` 实际不透明度仅 ~10% + `blur(3px)` + 主题染边框）→ **L2** 纯白实心卡片/弹窗（绝对可读内容）。

**The Scrim-Carries-Readability Rule（可读性靠蒙版）.** L1 玻璃面板**刻意高透**，几乎只靠 blur + 边框成形；文字可读性**不靠面板本身，而靠 L0 的 `--bg-scrim` 把背景压淡**。背景图越忙/越深，越要提高该主题的 scrim alpha（`.6+`）来保 `--ink`/`--muted` 对比度。换背景图后必须按 §2 对比度规则实测 5 主题。
> ✅ **2026-06-13 实测**（当前 7 张 WebP 背景 × 5 主题，逐像素合成 `(photo·0.48+scrim·0.52)·0.9+brand·0.1`）：`ink` 最低 **9.47:1**、0% 失败；`muted` 最低 **4.36:1**（place×草木/浅樱），仅 **0.1%** 像素 <4.5、**0%** <3.0。保守模型（未计 blur、含无文字中心区）下已达 AA 实用线。**换背景图后需重测。**

**The Soft-Clay Shadow Rule（柔和黏土投影）.** 投影一律柔和扩散、低不透明度，**禁止硬黑投影**。`@supports not (backdrop-filter)` 时玻璃面板退回更不透明（white 0.92），保证无 blur 也能读。

## 5. Components

**The Quiet Tray Rule（克制留白）.** 全局总纲：可爱来自颜色与圆角，不来自堆元素。任何一屏都先保证作品和「可截图」当主角，干扰元素能省则省。

### Buttons
- **Shape:** 圆角 `--r-sm`(12px)，`min-height: 44px`，字重 750，过渡 `0.16s`。
- **Primary** (`.primary-button`)：白字 + `linear-gradient(180deg, --brand-cta, --brand-cta-strong)` 渐变 + `--sh-inset` 高光 + 柔和品牌色投影。**每屏 ≤ 1 个主 CTA。**
- **Ghost** (`.ghost-button`)：白底墨字，`padding: 0 14px`，次操作。`.active` 给 `--brand-edge` 边框 + `--brand-tint` 底 + 内描边。
- **Danger** (`.danger-button`)：白字 + 珊瑚红渐变，破坏性操作。
- **Hover / Focus:** hover 仅改 color/shadow（渐变压深 5%、投影加深），**禁止 scale 位移**。`:focus-visible` 统一 `outline: 2px solid color-mix(--brand 72%, transparent)` + `offset 2px`。disabled 降到 `opacity 0.48`。

### Chips（色号 chip）
- **Style:** `.color-chip` 白底、`--r-xs`(8px)、1px `--line` 描边、`min-height 48px`、无投影。
- **State:** `.active` 用 `2px --ink` 外描边并向外偏移 `2px`，保留低透明度外晕圈；选中态不得侵占色样面积。`.color-palette` 必须保留至少 `4px` 内边距，避免边缘 chip 被 `overflow:auto` 裁切。`.needed`（当前图纸所需色号）保留品牌色辉光 + `needed-chip-glow/-aura` 呼吸动画（环境型循环，受 reduced-motion 覆盖）。

### Cards / Containers
- **Corner Style:** `--r-md`(16px)（大容器 `--r-lg` 20px）。同心圆角：内 = 外 − 间隙。
- **L1 玻璃面板**（侧栏/顶栏/studio-card/画廊卡）：统一走 `--glass-*`——`background: --glass-bg` + `backdrop-filter: blur(--glass-blur)` + `1px --glass-border` + `--sh-2`。**全部面板共用这一组 token**，不要各写各的。
- **L2 实心卡片/弹窗**：纯 `--surface` 白底，内边距 `--sp-4`(16px)。

#### 盒子原语（Layout primitives，`components.css` 顶部）
每种「盒子」只定义一次，组件去**组合**原语而非各写各的——这是防止「每个 box 各写宽高/间距/溢出导致漏改」的单一真源。新盒子直接挂原语类；存量用「别名法」(把现有类名并进原语选择器列表，保持原特异性、渲染零变化)。
- `.surface-glass` — L1 玻璃面配方（收编 topbar / 侧栏面 / 画廊·作品集内容面）。
- `.studio-shell` — 居中定宽列，宽度 `min(var(--content-max), 100%)`（画廊/作品集/绘图台外壳 + `.app-shell` 共用）。
- `.scroll-area` — **每个 `overflow:auto` 容器都属于它**，统一内呼吸边距 `var(--scroll-pad)`，防圆角卡片/选中环/焦点环被滚动边缘硬切（`overflow` 本身由 ≥861 容器模型按断点声明）。
- `.card` — 卡片表面（白底 + `1px --line` 描边）；悬停抬升统一用 `--sh-card-hover`。
- 尺度 token（`tokens.css`）：`--content-max 1640` / `--list-cap min(72vh,720px)` / `--scroll-pad`。**禁止再裸写这些魔法数。**
- 自检：改动滚动/容器后跑 `grep -rn "overflow: *auto" src/styles/` 确认每个都进了 `.scroll-area`。

#### 布局尺度 token（Layout scale tokens，`tokens.css`）
页面外壳 / 栏宽 / 画布 / 间距 / 控件 / 卡片 / 弹窗的尺寸**一律走这些 token，禁止裸写魔法数**。断点差异用「在 `@media` 里重定义 token」表达（**不要**起 `-tablet` 兄弟 token），调用处永不分叉。

| Token | 默认值 | `@media` 重定义 | 用途 |
|---|---|---|---|
| `--content-max` | `1640px` | — | 外壳/`.studio-shell` 最大宽 |
| `--shell-pad` | `18px` | — | `.app-shell` 内边距；`calc(100vh - 2*var())` 由它派生 |
| `--sidebar-w` | `320px` | `240px` ≤1179 | 拼豆台左右栏（对称） |
| `--canvas-min` | `520px` | `360px` ≤1179 | 中央画布列下限 |
| `--studio-cols-work` | `clamp(208,25vw,300) 1fr clamp(216,27vw,320)` | — | ≥861 三列工作区轨道；**拼豆台 working 与绘图台共用的单一来源** |
| `--mobile-board-size` | （未定义） | `64vh` ≤860；`80vh` ≤620 | mobile-working 方板的**垂直上限**（只管高度）；宽度由容器 `100cqi` 拥有，`#sceneCanvas` 取 `min(100cqi, 本 token)` |
| `--panel-gap` | `--sp-4`(16) | `--sp-3`(12) ≤860 | `.studio-grid` 间距 |
| `--panel-pad` / `--panel-pad-tight` | 16 / 8 | — | 内容面 / 紧凑侧栏内边距 |
| `--topbar-h` | `70px` | `60px` 861–1179 | 顶栏 min-height |
| `--tap-min` | `44px` | — | 触控目标下限（WCAG） |
| `--control-h-sm` | `28px` | — | 小圆按钮 / select / toggle |
| `--field-h` | `42px` | — | 输入框 / 行 min-height |
| `--tile-min` / `--tile-min-lg` | 200 / 240 | — | 画廊·作品集瓦片 / 放大·审核瓦片 |
| `--list-cap` | `min(72vh,720px)` | — | 长列表滚动上限 |
| `--modal-gutter` | `24px` | — | 弹窗视口侧距 |
| `--modal-w-sm/md/lg/xl` | 360/520/700/1280 | — | 弹窗宽度阶梯 |
| `--modal-max-h` | `min(86vh,760px)` | — | 弹窗高度上限 |

- 弹窗宽度一律 `min(var(--modal-w-*), calc(100vw - var(--modal-gutter)))`。
- **绘图台**左右栏走**流式 clamp** 网格（不走对称的 `--sidebar-w`，刻意保留）。这条 clamp 轨道与拼豆台 working 完全相同，已收敛到单一来源 `--studio-cols-work`，两台同时消费、不再各写一份。
- **mobile-working 尺寸所有权（组合式）**：容器（workbench）/ canvas CSS 盒子（`#sceneCanvas`）/ 内部 board 几何三层各有所有者——**宽度**由容器拥有：workbench 设 `container-type: inline-size`，`100cqi` 即其真实内容宽度（已扣除 app-shell / safe-area / 自身 padding）；**垂直上限**由 `--mobile-board-size`（tokens.css，仅 ≤860/≤620 的 `:root` @media 里定义）拥有；`#sceneCanvas` 边长取 `min(100cqi, var(--mobile-board-size))` 保持方形，因此任何 padding/safe-area 变化下都不溢出、不被 `overflow:hidden` 裁切。token **禁止**用 `100vw` 假装拥有容器宽度，也**禁止**裸挂在 `@media` 体内（无效声明会被丢弃）。board 几何由 `render.js` 从实测盒子算。桌面 working 仍是矩形复合工作台（board+豆盘+参考），不改成方形。
- 自检：改动布局后跑 `grep -rnP ': ?[0-9]+px' src/styles/ | grep -iE 'sidebar|canvas|modal|tile|topbar'` 确认没有新的裸魔法数。
- **遗留（TODO）**：`gap`/`padding` 大多仍是 8/10/12/16 裸值，未并入 `--sp-*` 尺度；off-scale（5/7/9/10/14）待对齐。需一次专门的「spacing 扫描 + 截图复核」pass。

### Inputs / Fields
- **Style:** 白底、`--r-sm`、`min-height: var(--field-h)`（行）/ `var(--tap-min)`（按钮触控）、1px `--line` 描边、字号 ≥16px。
- **Focus:** 同全局 `:focus-visible` 品牌色焦点环。

### Modals（签名组件）
- 一律复用 `.remap-modal` + `modal-controller.js`，自动获得**焦点陷阱 / Esc 关闭 / 焦点恢复 / 登记**。新弹窗照此接线，不另起骨架。
- **确认对话一律走 `confirmModal()`（`modal-controller.js`，返回 `Promise<boolean>`），禁止用原生 `window.confirm`**——破坏性操作 `danger:true` 给红色主按钮、默认聚焦「取消」。
- 设置弹窗桌面收窄到 `min(340px)`，避免「标签—值」中间空隙过大；模态关闭叉去掉灰色圆底、SVG 居中。
- z-index 只用语义阶梯：`--z-dropdown 20 / --z-sticky 26 / --z-modal 28 / --z-modal-high 32 / --z-overlay 9000`，**禁止裸数字**。

### Feedback（签名组件：提示三件套）
- toast（底部居中、深色）/ 摆放提示 `.place-hint`（顶部居中、浅色）/ 成就 `.achievement-toast`（右上角、近白）。
- 三者**共用** `--feedback-radius`(12) / `--feedback-shadow` / `--feedback-ease`(0.2s)，padding 对齐 `10px 14px`，停留两档（瞬时 2000ms / 奖励 2600ms）。
- **刻意保留「分位」**：位置、深浅色身份、入场位移方向各自不同——它们语义不同且会同时出现。

## 6. Do's and Don'ts

### Do:
- **Do** 组件颜色一律用 `var(--brand…)` 等 token，让 5 套主题运行时整体替换（薄荷绿是默认，不是写死值）。
- **Do** 把深度组织成三层玻璃（L0 背景图+scrim / L1 高透玻璃面板 / L2 实心卡片弹窗），可读性靠 L0 scrim 撑。
- **Do** 文字二选一：读信息用 `--font-clear`（Noto Sans SC），标题/品牌/主动作/反馈用 `--font-cute`（LXGW 霞鹜记号体）；中层标题用 `--fs-title 16` 与正文拉开一档。
- **Do** 图标全用 SVG（`viewBox="0 0 24 24"`，`stroke="currentColor"`）；图标按钮必须有 `aria-label`。
- **Do** 守住对比度：正文/小字 ≥4.5:1，大字 ≥3:1；触控目标 ≥44×44px；输入框 ≥16px。
- **Do** 每屏只放 ≤1 个主 CTA；hover 只动 color/shadow。
- **Do** 给所有动画包 `@media (prefers-reduced-motion: reduce)`（含环境型呼吸/旋转循环）。

### Don't:
- **Don't** 做成商业 SaaS 冷淡风：高对比硬朗、冷灰蓝、仪表盘式信息密度堆叠。
- **Don't** 落入「生成感」：一眼 AI 的同质化等大卡片网格、缺氛围、薄荷绿写死不随主题。
- **Don't** 用 emoji 当 UI 图标——一律 SVG。
- **Don't** 用渐变文字（`background-clip: text` + 渐变）、彩色侧边竖条（>1px 的 `border-left/right` 当强调）。
- **Don't** 把玻璃当装饰随手糊在卡片上——这里的玻璃是**有意为之的三层系统**，不是随机的磨砂特效。
- **Don't** 把 cta 渐变色（≈3.3:1）用在小字文本上；它只够大字。
- **Don't** 用裸 z-index 数字或 hover scale 位移；用语义 z 阶梯、只动 color/shadow。
- **Don't** 为了「更高级/更可爱」往画面里堆干扰元素——克制留白，让作品和截图当主角。
