# 拼豆工坊 · 设计语言 MASTER

> 单一事实来源（Source of Truth）。改 UI 前先看这里；某一屏要偏离时，在 `design-system/pages/<屏名>.md` 写覆盖规则，否则一律遵循本文件。
> 所有取值与 `src/styles/tokens.css` 对齐——**改了 token 要同步本文件**。

## 0. 设计理念

治愈系手作模拟小游戏。关键词：**柔和粉彩 · 拟物温度 · 氛围感 · 移动优先 · 适合截图发小红书**。
- 不要：高对比硬朗、商业 SaaS 冷淡风、生成感（无氛围）、emoji 当图标。
- 要：圆润、轻盈、有「桌前慢慢做手工」的温度；每一屏单独截图都好看。

---

## 1. 色彩

### 中性 / 墨色（文字与描边）
| Token | 值 | 用途 |
|------|-----|------|
| `--ink` | `#26242b` | 主文字 |
| `--muted` | `#5a5763` | 次要文字（白底 ≈7.05:1；原 #686572=5.7:1，为玻璃叠背景图留对比度余量） |
| `--line` | `#d6dae2` | 描边/分隔 |
| `--surface` / `--surface-2` / `--surface-3` | `#fff` / `#f6f8fc` / `#edf2f5` | 面层 |

### 品牌色（薄荷绿系）
| Token | 值 | 用途 |
|------|-----|------|
| `--brand` (= `--mint`) | `#57b8a7` | 品牌主色（高亮、激活态、chip） |
| `--brand-ink` | `#1f6153` | 品牌文字（白底 ≈7.6:1） |
| `--brand-edge` | `#3f988b` | 品牌描边 |
| `--brand-cta` / `--brand-cta-strong` | `#3D9C8C` / `#389586` | **主按钮渐变**专用 |

> ⚠️ 主按钮 = 白字 + `--brand-cta` 渐变 ≈ **3.3:1**：满足大字 3:1，**不满足正文 4.5:1**——为「更亮观感」的**有意取舍**。不要把这套 cta 色用于小字文本。
> **随主题切换**：每套主题在 `constants.js` 里有自己的 `cta:[top,bottom]`（同色相压深到白字 ~3.3:1），由 `applyBackgroundTheme` 写到 `--brand-cta(-strong)`。所以主按钮颜色随主题变（粉/金/蓝/绿…），各套都保证 ≥3:1。默认（雾青）`#3D9C8C`。

### 五彩强调（分类用）
`--mint #57b8a7` · `--coral #e7645f` · `--amber #d99b3d` · `--blue #4d77b8` · `--violet #7b6fb1`
用途：首页四入口的图标分类色、按系列区分等。**不承载正文文字**（饱和度不够暗）。

### 运行时主题（5 套背景）
`theme.js` 的 `applyBackgroundTheme()` 会在运行时覆盖 `--brand` / `--brand-ink` / `--brand-edge` / `--brand-tint(-strong)` / `--page-*` / `--table*`。所以**组件一律用 `var(--brand…)` 等 token，不要写死薄荷绿**，否则切主题会脱节。
- 雾青 `#eef2f4`(默认) · 奶杏 `#f6f0e8` · 浅樱 `#f6eef0` · 晴蓝 `#edf4f7` · 草木 `#eef3ec`

### 工具款式（4 套，画 canvas 工具用）
糖果 / 薄荷 / 晴空 / 薰衣草（`constants.js > toolStyles`，各含 primary/secondary/accent/tip）。仅作用于画布内的豆针/镊子等实体绘制。

### 对比度规则（硬约束）
- 正文/小字：≥ **4.5:1**（`--ink`、`--muted` 均达标）。
- 大字（≥18.66px 粗体 / ≥24px）：≥ **3:1**（主按钮走这条豁免）。
- 颜色不作为唯一信息载体（配文字/图标）。

---

## 2. 表面与层次（★ 手绘墨线简笔规范 — 2026-07 改版，DESIGN.md §4 为准）

> 2026-07 语言切换：**退役三层玻璃**，改为**两层「纸片摆在主题背景桌上」**。面板不再高透磨砂，而是纸白实心 + 手绘墨线描边 + 硬贴纸投影。DESIGN.md §4「Paper-on-Desk / Ink-Outline / Hard-Sticker-Shadow」为权威，本节与其一致。

**L0 · 阶段背景桌**（`.bead-studio-grid[data-phase=…]`，变量 `--bg-*-image`）
- 每张背景图上叠一层蒙版 `var(--bg-scrim)`（压杂色 + 统一色调）。
- **`--bg-scrim` 随主题切换**：每套主题在 `constants.js` 有自己的 `scrim`，由 `applyBackgroundTheme` 写入——**切主题时同一套背景图染上对应色调**（青/奶/粉/蓝/绿）。
- 面板现在不透明，可读性不再依赖 scrim；scrim 只管 L0 背景桌本身与四周 `--shell-pad` 呼吸缝的观感。
- 背景图务必压到 **< 200KB/张（WebP）**。

**L1 · 纸白墨线面板**（顶栏 / 侧栏 section / studio-card / 画廊·收藏·社区面 / 弹窗）
统一配方（DESIGN.md §4/§5 为准），全部面板共用：
```
background: var(--surface);              /* 不透明纸白，文字自撑对比 */
border: var(--sketch-bw) solid var(--ink-line);   /* 大容器 2px 墨边（控件 --sketch-bw-ctl 1.5px）*/
border-radius: var(--wobble-1/2/3);      /* 大容器歪角，邻居轮换；控件/网格卡用干净 --r-* */
box-shadow: var(--sketch-shadow);        /* 3px 3px 0 硬贴纸投影，无模糊；弹窗用 --sketch-shadow-lg */
/* 禁止 backdrop-filter 磨砂 */
```
> 色号 chip 是密度豁免：保留 1px 浅 `--line` 描边（221 色网格全墨边会太吵）。移动端近满幅面板去掉硬投影（外层 `overflow:hidden` 会切影），仅留墨边。

**L2 · 弹窗**：`--surface` 白底 + 墨边 + 歪角 + `--sketch-shadow-lg`。`.remap-modal` 骨架已统一（焦点陷阱 + Esc）；新弹窗一律复用 `.remap-modal` + `modal-controller.js`。

**阴影阶梯**：`--sketch-shadow-sm`(按钮/小卡) → `--sketch-shadow`(面板/CTA) → `--sketch-shadow-lg`(弹窗)。一律 `Npx Npx 0` 硬偏移墨影，**不要柔性扩散、不要磨砂玻璃**。旧 `--sh-*` / `--glass-*` token 已退役。

---

## 3. 形状 · 间距 · 层叠

- **圆角**：`--r-2xs 4 / --r-xs 8 / --r-sm 12 / --r-md 16 / --r-lg 20 / --r-pill 999`。同心圆角规则：内 = 外 − 间隙（见 tokens 注释）。
- **间距**：`--sp-1..6 = 4/8/12/16/24/32`。
- **z-index**（只用这套，禁止裸数字）：`--z-base 1 / --z-dropdown 20 / --z-sticky 26 / --z-modal 28 / --z-modal-high 32 / --z-overlay 9000`。

---

## 4. 字体与排版

- 字族：`"Nunito","Varela Round","PingFang SC","Hiragino Sans GB","Microsoft YaHei"`（圆润、治愈，**勿换衬线**）。标题倾向 Varela Round。
- 字号阶梯：`--fs-2xs 10 / xs 11 / sm 13 / base 14 / md 15 / title 16 / lg 18 / xl 22`。`--fs-title 16` 专用于中层标题（模态/区块/卡片标题），与正文 base14 拉开一档，避免「标题与正文同号、只靠字重」。
- 行高用 token：`--lh-heading 1.2`（标题/紧凑大字）/ `--lh-body 1.55`（多行正文，达 1.5-1.7 目标）。单行截断（nowrap）文字行高无效，不强制 token 化。Hero 标题 `1.12`（display 大字略放松）。输入框 ≥16px（防 iOS 聚焦缩放，已做）。
- **演进方向**：正文 base 14 偏小 → 评估提到 15–16 增加「呼吸感」；首屏标题再大一档（Hero-centric）。改时整条阶梯一起调，勿单点。

---

## 5. 组件约定

- **按钮**：`.primary-button`（品牌 cta 平涂 + 白字 + 墨边 + 硬贴纸投影，主操作，每屏≤1 个主 CTA）/ `.ghost-button`（纸白墨字 + 墨边，次操作）/ `.danger-*`（珊瑚红平涂 + 墨边，破坏性）。`:hover` 用 color/shadow（普通按钮浮现硬投影、CTA 加深填充），`:active` 收影 + `brightness(0.96)`，**禁止 scale/translate 位移**。
- **图标**：全 SVG，`viewBox="0 0 24 24"`，`stroke="currentColor"`，**禁止 emoji**。图标按钮必须有 `aria-label`。
- **卡片/入口**：圆角 `--r-md`，hover 给边框色/阴影反馈 + `cursor:pointer`。
- **弹窗**：复用 `.remap-modal` + `modal-controller`（自动获得焦点陷阱 / Esc / 焦点恢复 / `getOpenModalEl` 登记）。新弹窗照此接线。
- **提示**：toast（`.toast` 居中底部）/ 摆放提示（`.place-hint` 顶部居中）/ 成就（`.achievement-toast` 右上角）。✅ **已统一视觉语言**：三者共用 `--feedback-radius`(12) / `--feedback-shadow` / `--feedback-ease`(0.2s)，padding 对齐 `10px 14px`，停留时长收成两档（瞬时 toast/提示 2000ms、奖励成就 2600ms）。**刻意保留「分位」**：位置、深浅色身份（深 toast / 浅提示 / 近白成就）、入场位移方向各自不同——它们语义不同且会同时出现。
- 触控目标 ≥ **44×44px**。

---

## 6. 动效

- **微交互**（hover/press/过渡/入场）时长 **150–300ms**，缓动柔和；只动 `transform`/`opacity`（不动 width/height）。hover/press 过渡不低于 150ms（已全站统一到 0.16s）。
- **环境型无限循环动画**（如 `needed-chip-glow/-aura` 呼吸、`rotate-hint` 旋转）不受 150–300ms 约束——它们是持续氛围，慢一点才柔和；但仍须被 reduced-motion 覆盖。
- 一律包 `@media (prefers-reduced-motion: reduce)`（JS 侧用 `prefersReducedMotion()`，`utils.js`）。
- 治愈系靠反馈：阶段切换淡入、放豆弹性。✅ **完成收藏的小庆祝**（backlog D 已补）：保存成功时 `celebrate()`（notify.js）触发 `.celebrate-layer` 的 7 颗错峰五角星从屏幕中心绽放（纯 CSS `celebrate-pop` 0.52s，仅 transform/opacity，reduced-motion 下被全局块吞掉、仅留 toast）。

---

## 7. 无障碍硬清单

- [ ] 对比度：正文 4.5、大字 3:1（见 §1）
- [ ] 所有交互元素有可见 `:focus-visible` 焦点环（含 select/input/链接）
- [ ] 图标按钮有 `aria-label`；图片有 alt
- [ ] 颜色非唯一信息
- [ ] `prefers-reduced-motion` 尊重
- [ ] 切屏时非活动屏 `aria-hidden`（已做）

---

## 8. 响应式与朝向

- 断点（doc，CSS @media 用字面值）：`sm 420 / phone 620 / mobile 860 / tablet 1180`。
- **平台不是等比缩放关系**：手机与桌面共享作品状态和阶段语义，但允许采用不同的摆豆交互；不要把桌面工具面板压缩后塞进手机布局。
- **手机端**：单列重排、底部安全区 `env(safe-area-inset-*)`、豆盒只显示本图用色；直接点选颜色并摆豆。豆筛、豆针、镊子不进入手机布局。
- **桌面拼豆端**：保留豆筛、豆针、镊子和完整 MARD 221 色豆盒；本图用色通过 `.needed` 状态突出，完整色板属于深度玩法。
- **绘图台**：保留完整 MARD 221 色，服务自由绘制和真实配色预览。
- **豆盒选中态**：桌面、手机和绘图台统一使用向外扩展的 `2px` 深色描边（offset `2px`），不得用内嵌环压缩色样；滚动色板保留至少 `4px` 安全内边距。
- 手机端的手作感通过取豆 / 落豆反馈、当前颜色状态、熨烫和完成反馈表达，不通过增加桌面工具容器表达。
- 强制朝向：手机锁竖屏、平板锁横屏（`responsive.css`），由工作台宽度决定，刻意为之。
- 校验尺寸：375 / 768 / 1024 / 1440，无横向滚动。

---

## 9. 演进路线（关联 backlog）

0. ✅ 主按钮随主题（每主题 cta 压深到 ~3.3:1）+ 背景图随主题色蒙版染色（`--bg-scrim`）—— 已完成。
1. ✅ **面板语言切换（2026-07）**：三层玻璃退役，改为纸白墨线面板 + 硬贴纸投影（`--ink-line` / `--sketch-*` / `--wobble-*`）；面板不透明、可读性自撑，`--bg-scrim` 仅服务 L0 背景桌。见 DESIGN.md §4。
2. 字号阶梯上调（§4）。
3. 微交互 / 完成庆祝（§6）。
4. 反馈系统统一（§5 提示）。
5. 暗色模式（最后，工作量大）。
</content>
