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
| `--muted` | `#686572` | 次要文字（白底 ≈5.7:1，达 AA） |
| `--line` | `#d6dae2` | 描边/分隔 |
| `--surface` / `--surface-2` / `--surface-3` | `#fff` / `#f6f8fc` / `#edf2f5` | 面层 |

### 品牌色（薄荷绿系）
| Token | 值 | 用途 |
|------|-----|------|
| `--brand` (= `--mint`) | `#57b8a7` | 品牌主色（高亮、激活态、chip） |
| `--brand-ink` | `#1f6153` | 品牌文字（白底 ≈7.6:1） |
| `--brand-edge` | `#3f988b` | 品牌描边 |
| `--brand-cta` / `--brand-cta-strong` | `#3D9C8C` / `#389586` | **主按钮渐变**专用 |

> ⚠️ 主按钮 = 白字 + `--brand-cta` 渐变 ≈ **3.3:1**：满足大字 3:1，**不满足正文 4.5:1**——这是为「更亮观感」的**有意取舍**（已与产品确认）。不要把这套 cta 色用于小字文本。

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

## 2. 表面与层次（★ 玻璃化规范 — 当前重点）

三层结构，**背景图换实景/插画后尤其要守住**：

**L0 · 阶段背景图**（`.bead-studio-grid[data-phase=…]`，变量 `--bg-*-image`）
- 每张背景图上**必须叠一层蒙版**压住杂色、保证前景可读：当前是 `linear-gradient(180deg, rgba(255,255,255,.14~.16) ×2)`。
- 规范：蒙版强度随图深浅可调，目标是**任意背景图上，L1 面板与 `--ink` 文字仍清晰**。深色/高频图要把蒙版提到 `.22~.3`。
- 背景图务必压到 **< 200KB/张（WebP）**（见 backlog NEW-1）。

**L1 · 玻璃面板**（侧栏 / 顶栏 / studio-card 等浮在背景图上的容器）
统一配方（已在 `.topbar` 实现，需推广到所有面板）：
```
background: rgba(255,255,255, 0.82~0.88);   /* 亮色玻璃必须 ≥0.80，禁止 white/0.1 这种 */
backdrop-filter: blur(14~16px);             /* ← .side-panel section 目前缺这条，要补 */
border: 1px solid rgba(139,148,166,0.42);
border-radius: var(--r-lg)/(--r-md);
box-shadow: var(--sh-2);
```
现状：`.topbar` ✓（0.85 + blur16）；`.side-panel section` 半透明 0.87 但**无 blur** → 待统一。

**L2 · 实心卡片 / 弹窗**（不透背景）
纯 `--surface` 白底，`.remap-modal` 弹窗骨架已统一（含焦点陷阱 + Esc）。新弹窗一律复用 `.remap-modal` + `modal-controller.js`。

**阴影阶梯**：`--sh-1`(贴地) → `--sh-2`(面板) → `--sh-3`(浮卡) → `--sh-pop`(弹窗) → `--sh-inset`(按钮高光)。柔和黏土感，不要硬黑投影。

---

## 3. 形状 · 间距 · 层叠

- **圆角**：`--r-2xs 4 / --r-xs 8 / --r-sm 12 / --r-md 16 / --r-lg 20 / --r-pill 999`。同心圆角规则：内 = 外 − 间隙（见 tokens 注释）。
- **间距**：`--sp-1..6 = 4/8/12/16/24/32`。
- **z-index**（只用这套，禁止裸数字）：`--z-base 1 / --z-dropdown 20 / --z-sticky 26 / --z-modal 28 / --z-modal-high 32 / --z-overlay 9000`。

---

## 4. 字体与排版

- 字族：`"Nunito","Varela Round","PingFang SC","Hiragino Sans GB","Microsoft YaHei"`（圆润、治愈，**勿换衬线**）。标题倾向 Varela Round。
- 字号阶梯：`--fs-2xs 10 / xs 11 / sm 13 / base 14 / md 15 / lg 18 / xl 22`。
- 行高 1.5–1.7；输入框 ≥16px（防 iOS 聚焦缩放，已做）。
- **演进方向**：正文 base 14 偏小 → 评估提到 15–16 增加「呼吸感」；首屏标题再大一档（Hero-centric）。改时整条阶梯一起调，勿单点。

---

## 5. 组件约定

- **按钮**：`.primary-button`（品牌 cta 渐变 + 白字，主操作，每屏≤1 个主 CTA）/ `.ghost-button`（白底墨字，次操作）/ `.danger-*`（破坏性）。`:hover` 用 color/shadow，**禁止 scale 位移**。
- **图标**：全 SVG，`viewBox="0 0 24 24"`，`stroke="currentColor"`，**禁止 emoji**。图标按钮必须有 `aria-label`。
- **卡片/入口**：圆角 `--r-md`，hover 给边框色/阴影反馈 + `cursor:pointer`。
- **弹窗**：复用 `.remap-modal` + `modal-controller`（自动获得焦点陷阱 / Esc / 焦点恢复 / `getOpenModalEl` 登记）。新弹窗照此接线。
- **提示**：toast（`.toast` 居中底部）/ 摆放提示（`.place-hint`）/ 成就（`.achievement-toast`）—— 待统一圆角/位置/动效语言（backlog F）。
- 触控目标 ≥ **44×44px**。

---

## 6. 动效

- 时长 **150–300ms**，缓动柔和；只动 `transform`/`opacity`（不动 width/height）。
- 一律包 `@media (prefers-reduced-motion: reduce)`（JS 侧用 `prefersReducedMotion()`，`utils.js`）。
- 治愈系靠反馈：阶段切换淡入、放豆弹性、**完成收藏的小庆祝**（待补，backlog D）。

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
- 移动端：单列重排、底部安全区 `env(safe-area-inset-*)`、豆盒只显示本图用色。
- 强制朝向：手机锁竖屏、平板锁横屏（`responsive.css`），由工作台宽度决定，刻意为之。
- 校验尺寸：375 / 768 / 1024 / 1440，无横向滚动。

---

## 9. 演进路线（关联 backlog）

1. **玻璃面板统一（B）** ← 当前重点：给 `.side-panel section` 等补 `backdrop-filter`，统一 opacity/border/shadow；规范背景图蒙版强度。
2. 字号阶梯上调（§4）。
3. 微交互 / 完成庆祝（§6）。
4. 反馈系统统一（§5 提示）。
5. 暗色模式（最后，工作量大）。
</content>
