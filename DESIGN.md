---
name: 拼豆工坊 · Perler Studio
description: 治愈系拼豆手作模拟小游戏的视觉系统——粉彩 · 直角墨线框 · 主题背景桌 · 移动优先 · 每屏可截图
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
  # 2026-07: corners are straight. The scale is retained (call sites reference these
  # tokens) but flattened to 0 — no rounded corners anywhere. Genuine circles
  # (round beads, colour dots, slider/toggle thumbs) use border-radius:50% directly.
  "2xs": "0"
  xs: "0"
  sm: "0"
  md: "0"
  lg: "0"
  pill: "0"
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

视觉密度刻意压低：靠**柔和粉彩**、**干净直角**、**墨线描边**传达可爱，而不是靠堆元素。两层结构是整套语言的骨架——阶段背景图（L0）打底并随主题染色，像一张暖意的手作桌；纸白实心面板/卡片/弹窗（L1）浮在其上，每一个都描一圈**墨线直角边**（大容器 2px 墨边、控件/卡片 1.5px 墨边，**一律直角**），配一枚**硬贴纸投影**（`3px 3px 0`，不模糊），像剪好的纸片摆在桌上。品牌色不是写死的薄荷绿，而是运行时按 5 套主题（雾青/奶杏/浅樱/晴蓝/草木）整体替换的一组 token，所以同一套界面能换出五种氛围而保持同一性格。

本系统明确**拒绝**：商业 SaaS 的冷淡硬朗与仪表盘感、一眼 AI 的「生成感」同质卡片网格与磨砂玻璃/柔渐变、emoji 当 UI 图标、以及任何为了「更高级」而堆上去的装饰性效果。可爱来自克制的手绘线条，不来自繁复。

**Key Characteristics:**
- 粉彩 + 墨线描边，**一律直角**；容器/卡片/控件平涂纸白 + 墨边 + 硬贴纸投影（剪纸感，非柔黏土、非磨砂玻璃、非圆角）。
- 两层骨架：主题背景桌（L0）→ 纸白墨线面板/卡片/弹窗（L1）。
- 层级即线宽：大容器 2px 墨边、控件/卡片 1.5px 墨边，一律直角；只有色号 chip / 密集格保留 1px 浅描边（密度豁免），圆珠色点·滑块钮等**真圆形**用 `border-radius:50%`（是形状，不是圆角）。
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
- **成就材质 / Achievement Materials**：未解锁 `#c3cad2`、铜 `#b56845`、银 `#7d8994`、金复用 `--amber`；三阶组按铜→银→金，两阶组按铜→金，四阶组最后以运行时 `--brand` 表示满级。只用于成就图案与阶段方块，不承载正文。

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

**The Achievement-Material Rule（成就材质规则）.** 同组成就只保留一枚严格 `5×5` 网格的纯色像素图案，每格整块填充，不画内部浅色修边；图案必须直接表达成就语义（如完成=勾选、时长=沙漏、检查=放大镜），不复用图纸剪影。每完成一阶就替换整枚图案的材质色。卡片不展示铜/银/金文字、阶段数或阶段表，当前值以无底色的次级文字放在卡片右侧中央，不展示分母；下一目标保留在图案的无障碍名称中。

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
> 注：画布出片图（`render.js` 的 `ctx.font`）已收敛为**与 DOM 同构的两常量系统**——`CANVAS_CLEAR_FONT` / `CANVAS_CUTE_FONT`（`render.js` 单一来源，`render-export/-tray/-inspect/-finish` 共用），角色判定同 clear/cute。二者刻意前置 `Avenir Next` 作画布拉丁字面（数字 / 色号 / 年份），并都含已加载的 `Noto Sans SC` webfont，使中文在各平台一致（旧的第三套"legacy"栈缺 Noto、非 Apple 端会掉到系统中文字体，现已删除）。出片位图（`drawShareImage`）在 `main.js` 绘制前已 `document.fonts.ready` 把关防 canvas FOUT；finish 展示是实时画布、重绘自愈。

**The Title-Tier Rule（标题分档）.** 中层标题用 `--fs-title 16` 与正文 `base 14` 拉开一档——**不要让标题与正文同号、只靠字重区分**。

**The 16px-Input Rule.** 输入框字号 ≥ `16px`，防 iOS 聚焦自动缩放。

## 4. Elevation

本系统用**手绘墨线 + 硬贴纸投影**营造层次（不是柔和扩散投影，也不是磨砂玻璃）：面板是纸白实心，描一圈墨线，配一枚 `3px 3px 0` 的硬偏移投影（无模糊），像剪好的纸片摆在主题背景桌上。深度来自「墨边 + 偏移影」的剪纸感，不来自透明度堆叠。

### Shadow Vocabulary
- **硬贴纸 · 大 / Sticker-lg** (`--sketch-shadow-lg` = `5px 5px 0 --ink-line-soft`)：弹窗、悬浮件。
- **硬贴纸 · 中 / Sticker** (`--sketch-shadow` = `3px 3px 0 --ink-line-soft`)：面板、主 CTA。
- **硬贴纸 · 小 / Sticker-sm** (`--sketch-shadow-sm` = `2px 2px 0 --ink-line-soft`)：按钮、小卡；按钮 hover 时出现、`:active` 收起。
- `--ink-line-soft` = `color-mix(--ink 55%, transparent)`：投影墨色，半透以免过重。
- 旧的柔性投影 token（`--sh-1/2/3/pop`）与 `--sh-inset` 高光已退役出主界面容器；仅极少数非容器场景可能残留，逐步清理。

### Named Rules
**The Paper-on-Desk Rule（纸片摆在桌上）.** 按两层组织深度：**L0** 阶段背景图（叠 `--bg-scrim` 蒙版，随主题染色，像一张手作桌）→ **L1** 纸白实心面板/卡片/弹窗（`--surface` 不透明 + `--sketch-bw` 墨边 + 硬贴纸投影，承载绝对可读内容）。面板之间与屏幕四周留出 `--shell-pad` 的背景桌呼吸缝，让纸片「摆」在桌上。

**The Ink-Outline Rule（墨线描边）.** 线宽即层级：大容器（顶栏 / 面板 / studio-card / 弹窗）= `--sketch-bw`(2px) 墨边；控件 / 卡片（按钮 / 输入 / select / 网格卡）= `--sketch-bw-ctl`(1.5px) 墨边。**全部直角**——圆角刻度 `--r-*` 与旧的 `--wobble-*`（已退役）一律为 `0`，不再有歪角/圆角。**边框覆盖要铺满**：任何模块 / 按钮 / 输入 / 卡片都描墨边，不能用几乎看不见的浅 `--line`/`rgba` 淡边冒充「无边」。豁免只有两类：① 色号 chip / 密集格保留 1px 浅 `--line` 描边（221 色密集网格全墨边会太吵）；② 圆珠色点、滑块 / 开关钮等**真圆形**用 `border-radius:50%`（是形状，不是圆角）。墨色一律走 `--ink-line`（= `--ink`），**不写死**。

**The Solid-Paper-Readability Rule（可读性靠纸面）.** L1 面板是**不透明纸白**，文字可读性靠面板自身，不再依赖 blur 或 `--bg-scrim`（对比只升不降）。`--bg-scrim` 现在只服务 L0 背景桌的整体氛围与四周呼吸缝的观感，不再承载面板内文字对比。换背景图后仍建议按 §2 抽查四周露出的背景区域观感。

**The Hard-Sticker-Shadow Rule（硬贴纸投影）.** 投影一律 `Npx Npx 0`（零模糊）的墨色偏移，**禁止柔和扩散投影、禁止磨砂玻璃 backdrop-filter 出现在 L1 容器上**。移动端近满幅面板（画廊/收藏/社区）因外层 `overflow:hidden` 会硬切偏移影，故在 ≤860 去掉贴纸投影、仅留墨边定义。`:active` 时投影收起（纸片被按平），配合轻微 `brightness(0.96)`，**不用位移**。

### canvas 道具素描语言

canvas 绘制的道具（豆筛 / 拼豆板 / 图纸 / 台灯 / 豆针与镊子 / 熨斗 / 展示台 / 分享海报）与 CSS 面板遵循**同一套素描语言**：平涂填色、直角形状、墨线描边、硬贴纸投影（偏移无模糊）。实现入口是 `src/sketch-style.js`，它镜像 `src/styles/tokens.css` 中的 sketch token——`SKETCH_INK`、`SKETCH_INK_SOFT`、`SKETCH_PAPER`、`SKETCH_BW`、`SKETCH_SHADOW` 等常量与 CSS 变量一一对应。**修改 token 时须同步两处**：`tokens.css` 和 `sketch-style.js`。

**豁免清单**（以下效果不受平涂约束，保留渐变 / 模糊）：
- **豆子本体及其接触影**：圆形色块与软性接触投影是拼豆的核心视觉，属内容渲染范畴。
- **玩法反馈光效**：台灯辉光（`createRadialGradient`）、热度染色与冷却闪光（动画态）、熔接桥高光（`createLinearGradient`）——这些是即时状态反馈，需要光感渐变才能被玩家识别。
- **作品光泽 sheen**：完成品与分享海报上的画面整体 sheen（`render-fusion.js`、`render-export.js`），以及刮痕擦除的动态轨迹，是作品表现力的一部分，不属于「道具 UI」。
- **真圆 / 真药丸形状**：豆子（圆）和部分统计徽标（药丸），`arc()` 是形状而非圆角，不受直角规则约束。

> 自检：改动 canvas 道具绘制后跑 `npm run test:canvas-sketch`，它会在 Part 2 扫描 `src/render*.js` / `src/board-skin.js` / `src/draw.js`，若渐变或 shadowBlur 数量超出豁免清单，测试立即报红。新增合法渐变须同步更新脚本的 `EXPECTED` 并附注原因。

## 5. Components

**The Quiet Tray Rule（克制留白）.** 全局总纲：可爱来自颜色与克制留白，不来自堆元素或装饰。任何一屏都先保证作品和「可截图」当主角，干扰元素能省则省。

### Buttons
- **Shape:** **直角**（圆角刻度归零），`--sketch-bw-ctl`(1.5px) `--ink-line` 墨边，`min-height: 44px`，字重 750，过渡 `0.16s`。药丸 / tab / 计数徽标同样直角（`--r-pill` 已为 0）。
- **Primary** (`.primary-button`)：白字 + **平涂** `--brand-cta`（无渐变）+ 墨边 + `--sketch-shadow` 硬贴纸投影。**每屏 ≤ 1 个主 CTA。**
- **Ghost / 默认** (`.ghost-button` 及一般 `button`)：`--surface` 底墨字 + 墨边，次操作。`.active` 给 `--brand-edge` 边框 + `--brand-tint` 底 + 内描边。
- **Danger** (`.danger-button`)：白字 + 平涂 `--danger`（无渐变）+ 墨边 + 硬贴纸投影，破坏性操作。
- **Hover / Focus:** hover 仅改 color/shadow——普通按钮浮现 `--sketch-shadow-sm` 硬投影，CTA 加深填充；**禁止 scale/translate 位移**。`:active` 投影收起 + `brightness(0.96)`（纸片被按平）。`:focus-visible` 统一 `outline: 2px solid color-mix(--brand 72%, transparent)` + `offset 2px`。disabled 降到 `opacity 0.48`。

### Chips（色号 chip）
- **Style:** `.color-chip` 白底、`--r-xs`(8px)、1px `--line` 描边、`min-height 48px`、无投影。
- **State:** `.active` 用 `2px --ink` 外描边并向外偏移 `2px`，保留低透明度外晕圈；选中态不得侵占色样面积。`.color-palette` 必须保留至少 `4px` 内边距，避免边缘 chip 被 `overflow:auto` 裁切。`.needed`（当前图纸所需色号）保留品牌色辉光 + `needed-chip-glow/-aura` 呼吸动画（环境型循环，受 reduced-motion 覆盖）。

### Cards / Containers
- **Corner Style:** **一律直角**——容器 / 卡片 / 控件 / 药丸 / chip 的圆角刻度（`--r-*`、`--r-pill`）与旧 `--wobble-*` 全部为 `0`，没有圆角也没有歪角。唯一的「圆」是**真圆形**（圆珠色点、滑块 / 开关钮）走 `border-radius:50%`，那是形状不是圆角。
- **L1 纸白面板**（顶栏 / 侧栏 section / studio-card / 画廊·收藏·社区内容面）：统一走 paper 原语——`background: --surface`（不透明）+ `--sketch-bw`(2px) `--ink-line` 墨边 + `--sketch-shadow` 硬贴纸投影，**无 backdrop-filter、直角**（无歪角 / 圆角）。**全部面板共用这套配方**，不要各写各的；渐变面 / 柔影 / 磨砂玻璃一律不用（已全站清除）。
- **网格卡**（`.gallery-card` / `.collection-tile` / `.pattern-card`）：`--surface` 平底 + `--sketch-bw-ctl`(1.5px) 墨边 + `--sketch-shadow-sm`；hover 时把硬投影加深到 `--sketch-shadow`（**不位移、不缩放**）。
- **主工作方框**（拼豆板 / 绘图画布）：统一使用 `--sketch-bw-ctl`(1.5px) 墨边与 `--sketch-shadow-sm` 的右下硬投影；Canvas 内绘制的板框须镜像同一线宽层级和投影方向。密集缩略图内部只用 1px `--line`，外层卡片负责墨边与投影，禁止内外重复加重。相邻方框的内边距、栏间距与标题基线统一走 `--sp-*`，不使用一次性裸值补齐。
- **L2 弹窗**：`--surface` 白底 + `--sketch-bw` 墨边 + 直角 + `--sketch-shadow-lg`，内边距 `--sp-4`(16px)。

#### 盒子原语（Layout primitives，`components.css` 顶部）
每种「盒子」只定义一次，组件去**组合**原语而非各写各的——这是防止「每个 box 各写宽高/间距/溢出导致漏改」的单一真源。新盒子直接挂原语类；存量用「别名法」(把现有类名并进原语选择器列表，保持原特异性、渲染零变化)。
- `.surface-glass` — L1 玻璃面配方（收编 topbar / 侧栏面 / 画廊·作品集内容面）。
- `.studio-shell` — 居中定宽列，宽度 `min(var(--content-max), 100%)`（画廊/作品集/绘图台外壳 + `.app-shell` 共用）。
- `.scroll-area` — **每个 `overflow:auto` 容器都属于它**，统一内呼吸边距 `var(--scroll-pad)`，防卡片/选中环/焦点环被滚动边缘硬切（`overflow` 本身由 ≥861 容器模型按断点声明）。
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
| `--studio-compact-rail` | `240px` | — | 861–1007 紧凑工作区的辅助栏宽 |
| `--studio-cols-compact` | `minmax(0,1fr) 240px` | — | 861–1007 中央优先两列轨道 |
| `--studio-cols-work` | `minmax(196px,22fr) minmax(540px,54fr) minmax(204px,24fr)` | — | ≥1008 三列工作区轨道；**拼豆台 working 与绘图台共用的单一来源** |
| ~~`--mobile-board-size`~~ | （已移除） | — | 旧的 mobile 方板垂直上限；现已删除：手机工作区改为 flex 填满视口，画布吃满剩余高度并画桌子+地板（板放桌上）|
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
- **工作台自适应规则**：≤860 保留手机单列；861–1007 用「中央工作区 + 240px 辅助栏」，左右辅助面板在同一栏内上下排列；≥1008 才同时展开三列。三列最小宽为 196/540/204px，最小可行视口由 `196 + 540 + 204 + 32(间距) + 36(外壳) = 1008px` 得出，不是设备标签。最小宽满足后轨道收敛为 22/54/24；在同一拓扑内等长宽比缩放时，每列占比漂移不得超过 2 个百分点。拼豆 working 与绘图台共用 `--studio-cols-compact` / `--studio-cols-work`，禁止各写一份。
- **工作台纵向规则**：工作区吃掉顶栏之后的剩余高度，保留界面原有的 16px 上间距；禁止通用固定高度上限与 `margin-block:auto` 自动上下居中。高窗口应让工作区变高，需要的面板在内部滚动。
- **mobile-working 布局（手机竖屏 = mode A）**：`.bead-studio-grid:not([data-phase=choose])` 是**填满视口的 flex 纵列**——workbench（画布区）`flex:1 1 auto` 吃满剩余高度，`#sceneCanvas` `width/height:100%` 填满 workbench；操作区（检查/清空）与豆盒 `flex:0 0 auto` 贴底（底部留 `safe-area` 呼吸），**下方不再留装饰背景空白**。画布里 `render.js` 画**桌子+地板**场景（同桌面端，去掉豆筛/参考/灯），拼豆板带阴影**自然放在桌上**（`computeLayout` 手机分支保留底部 floor band、板子歇在桌面上）。board 几何由实测盒子算。**朝向分流**：手机强制竖屏走 mode A（`useStackedMobileLayout`，≤860）；平板强制横屏（≥861 触屏）走桌面三列分栏 + 轻量工具集，画布**方板紧贴**（平铺木纹、无桌地）；鼠标宽屏走完整桌面手作流程；横屏手机 / 竖屏平板由 `.orientation-overlay` 全屏提示旋转。

**The Board-Viewport Rule（棋盘视窗规则）.** 手机与平板的 canvas 是观察和操作棋盘的**有界视窗**，不是必须完整包住棋盘的内容盒。棋盘可以超出当前取景，但绘制、命中测试、缩放和平移必须共享同一坐标变换，保证任意有效格子均可到达。页面级 canvas DOM 盒不得随图纸长宽比无限扩张，也不得把阶段操作或豆盒推出视口；超出部分由画布内部导航处理。手机初始不要求全览，平板横屏长方形图纸也必须受工作区可用高度约束。输入字号继续保持 ≥16px，触控目标继续保持 ≥44×44px。
- 自检：改动布局后跑 `grep -rnP ': ?[0-9]+px' src/styles/ | grep -iE 'sidebar|canvas|modal|tile|topbar'` 确认没有新的裸魔法数。
- **Spacing 尺度分工（2026-06-24 扫描收尾）**：`--sp-*`（4/8/12/16/24/32）治理**布局级**间距——外壳 / 栏 / 面板 / 卡片之间的 `gap`/`padding`/`margin`，凡裸值等于某 token 的已全部并入（扫描确认 0 残留）。**药丸 / 徽标 / chip / 计数标签**自带一档**微间距**（1/2/3px 纵向、5/6/7/9/10/11px 横向），刻意落在 `--sp-*` 之下与之间，用来贴合小字；这些**不是 drift，不要强并入** `--sp-*`（会把紧凑药丸撑变形）。另有 `clamp()` 流式表达式与图标内缩 padding（如 `0 … 0 32px` 给图标让位）属 bespoke，同样不并入。自检脚本命中这类微间距时按本条豁免。

### 图纸库（Pattern library，拼豆台 choose 阶段）
拼豆台新开作品时的挑图屏 = 图纸库，复用**画廊卡片网格**的视觉（手机 2 列、桌面 `auto-fill minmax(--tile-min,1fr)` 多列），但装的是用户本地图纸（默认 + 导入），可管理。
- **卡片** `.library-card`：纵向三段——顶部悬浮控件条 `.library-card-controls`（收藏 ⭐ 左 / 删除 🗑 右，半透明白底药丸，`pointer-events:none` 让条本身点穿、只有按钮捕获点击）→ 满宽方形预览 `.library-card-open`（`aspect-ratio:1/1`，点击=载入并直接开摆）→ 底部名字 `.library-card-name`（点击=轻量 `prompt` 改名）。**不放 note 小字**（默认图纸的可爱注释已去掉）。
- **缩略图**：`drawPatternThumb` 按元素**实际 client 宽高**建位图（非写死方形），`pixelPatternPreviewLayout` 居中 letterbox，长方板也不变形。
- **布局**：`.pattern-list` 在 choose 下是 flex 纵列——`.library-scroll`（`flex:1` 滚动区，吃满高度）+ `.library-footer`（`flex:0` 贴底，固定**导入分享码**主按钮；删过默认时多一个「恢复默认」）。手机覆盖规则需用 `.left-panel .pattern-thumb`/`.left-panel .pattern-list` 同级特异性盖过遗留的横向条样式，否则会被 `--list-cap`/旧 tile 宽度限制（出现底部空白或预览过小）。
- **排序**：星标置顶组在前（组内**最近收藏的在最前**，star 存单调递增的 order 值），未收藏组按 `localeCompare(b,'zh-CN')` 拼音首字母（不维护拼音表）。
- 数据层 `pattern-library.js` 刻意 **DOM-free**（自带 localStorage 读写，不经 `storage.js→notify.js→dom.js`），可在 Node 直接测试。

### Inputs / Fields
- **Style:** `--surface` 底、`--r-sm`/`--r-xs`、`min-height: var(--field-h)`（行）/ `var(--tap-min)`（按钮触控）、`--sketch-bw-ctl`(1.5px) `--ink-line` 墨边（与同栏按钮同一线宽，避免输入框比按钮细一圈）、字号 ≥16px。
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
- **Do** 把深度组织成两层（L0 主题背景桌+scrim / L1 纸白墨线面板+硬贴纸投影），可读性靠不透明纸面自撑；面板四周留 `--shell-pad` 背景桌呼吸缝。
- **Do** 文字二选一：读信息用 `--font-clear`（Noto Sans SC），标题/品牌/主动作/反馈用 `--font-cute`（LXGW 霞鹜记号体）；中层标题用 `--fs-title 16` 与正文拉开一档。
- **Do** 图标全用 SVG（`viewBox="0 0 24 24"`，`stroke="currentColor"`）；图标按钮必须有 `aria-label`。
- **Do** 守住对比度：正文/小字 ≥4.5:1，大字 ≥3:1；触控目标 ≥44×44px；输入框 ≥16px。
- **Do** 每屏只放 ≤1 个主 CTA；hover 只动 color/shadow。
- **Do** 给所有动画包 `@media (prefers-reduced-motion: reduce)`（含环境型呼吸/旋转循环）。

### Don't:
- **Don't** 做成商业 SaaS 冷淡风：高对比硬朗、冷灰蓝、仪表盘式信息密度堆叠。
- **Don't** 落入「生成感」：一眼 AI 的同质化等大卡片网格、磨砂玻璃、柔渐变卡面、薄荷绿写死不随主题。
- **Don't** 用 emoji 当 UI 图标——一律 SVG。
- **Don't** 用渐变文字（`background-clip: text` + 渐变）、彩色侧边竖条（>1px 的 `border-left/right` 当强调）。
- **Don't** 在 L1 容器上用 `backdrop-filter` 磨砂或柔性扩散投影；面板一律纸白墨边 + 硬贴纸投影。
- **Don't** 再引入歪角或圆角（`--wobble-*` 已退役、圆角刻度 `--r-*` / `--r-pill` 全为 `0`）——除色号 chip 密度豁免与真圆形（圆珠点 / 滑块钮，用 `50%`）外一律直角墨边；也别用浅 `--line` / `rgba` 淡边冒充「无边」。
- **Don't** 把 cta 平涂色（≈3.3:1）用在小字文本上；它只够大字。
- **Don't** 用裸 z-index 数字或 hover scale 位移；用语义 z 阶梯、只动 color/shadow。
- **Don't** 为了「更高级/更可爱」往画面里堆干扰元素——克制留白，让作品和截图当主角。
