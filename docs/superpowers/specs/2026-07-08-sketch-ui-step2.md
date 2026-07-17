# 手绘 UI 改版 · 第二步实施计划（手绘分隔线/下划线 + 歪角多样化）

日期：2026-07-08 · 分支：`main` · 前置：第一步 `4f20f6c`（纸+墨线语言已落地）

## 目标与范围

第二步只做两件事（用户已选定）：

1. **手绘分隔线/下划线** —— 把现有 6 处平直 `1px` 分隔线换成手绘抖动墨线；给侧栏区块标题 `.section-title` 补一道手绘下划线（=区块下的手绘分隔）。
2. **歪角多样化** —— 把 `--wobble` 从 3 个变体扩到 5 个、加大不对称幅度，并重新分配，让**相邻**大容器不再用同一变体（重点治侧栏堆叠 section 全部同角、以及 `--wobble-2` 被 5 处复用）。

**明确不做**（本步之外）：逐屏涂鸦细节、hero SVG 抖动滤镜、背景图替换（`select-pattern.webp` 已还原）、`.remap-modal-head` 残留渐变的扁平化（越界，另议）。

## 技术约定

- 手绘线用 **URL 编码的内联 SVG data-URI**，存进 `tokens.css` 的 token（house style 见 `components.css:823` 的对勾图标）。CSP `img-src 'self' data: blob:` 已放行，`background-image` data-URI 合法。
- 线条颜色**烘焙为中性浅灰**（`--ink`/`--line` 不随主题变，只有 `--brand*` 变），所以烘焙颜色不破坏 5 主题；无需 `currentColor`（SVG data-URI 读不到）。
- 分隔线用**多重背景层**叠加：`background: var(--sketch-rule) left bottom / auto 5px repeat-x, <原有背景>` —— 即便元素本身有背景/渐变也能叠。以此**替代** `border-*: 1px …`（把原 border 去掉或置 0）。
- 仅 CSS 改动 → 一次 `npm run build`，`styles.css` + `app.bundle.js` 与源码同一提交。24 项回归须全绿。

## Part A — 手绘分隔线 / 下划线

### A1. 在 `tokens.css` 新增两个 token（Sketch 区块内）

```css
/* 手绘抖动线：分隔线（横向可平铺的浅灰波浪，theme-neutral，烘焙灰色） */
--sketch-rule: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='6' viewBox='0 0 48 6' fill='none' stroke='%23c5cbd6' stroke-width='1.4' stroke-linecap='round'%3E%3Cpath d='M0 3.4 Q6 1.6 12 3.4 T24 3.4 T36 3.4 T48 3.4'/%3E%3C/svg%3E");
/* 手绘下划线：区块标题下的一道略粗笔触 */
--sketch-underline: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='8' viewBox='0 0 60 8' fill='none' stroke='%23aeb5c2' stroke-width='2.2' stroke-linecap='round'%3E%3Cpath d='M2 5 Q18 2 30 4.5 T58 4'/%3E%3C/svg%3E");
```

（实现时若波形不满意，只调这两个 token 的 `path`/`stroke`，调用处不动。）

### A2. 替换 6 处平直分隔线为手绘线

统一改法：删掉/置零原 `border-*`，改用背景层叠加（保留原有 `padding-*` 间距）。逐处：

| 选择器 | 文件 | 原样式 | 改为 |
|---|---|---|---|
| `.draw-recent-colors` | layout.css | `border-bottom: 1px solid var(--line)` | 去 border；`background: var(--sketch-rule) left bottom / auto 5px repeat-x` |
| `.custom-inline` | components.css | `border-top: 1px dashed #d7dde7` | 去 border；`background: var(--sketch-rule) left top / auto 5px repeat-x` |
| `.library-footer` | components.css | `border-top: 1px solid var(--line)` | 去 border；`background: var(--sketch-rule) left top / auto 5px repeat-x` |
| `.remap-modal-head` | components.css | `border-bottom: 1px solid #e0e5ee`（含渐变底） | 去 border；`background: var(--sketch-rule) left bottom / auto 5px repeat-x, <保留原 linear-gradient>` |
| `.remap-modal-foot` | components.css | `border-top: 1px solid #e6eaf0`（底 `#fff`） | 去 border；`background: var(--sketch-rule) left top / auto 5px repeat-x, #fff` |
| `.remap-card-head` | components.css | `border-bottom: 1px dashed rgba(...)` | 去 border；`background: var(--sketch-rule) left bottom / auto 5px repeat-x` |

注：`left top` 用于原 `border-top`（线在顶边）；`left bottom` 用于原 `border-bottom`。

### A3. 侧栏区块标题下划线

给 `.section-title`（`components.css:634`，flex 行）加底部手绘线，作为区块下的手绘分隔：

```css
.section-title {
  /* …原有属性保留… */
  padding-bottom: var(--sp-2);
  background: var(--sketch-underline) left bottom / 100% 6px no-repeat;
}
```

范围克制：只此一个类（每个侧栏 section 出现一次），不铺到所有标题（那属被否掉的"逐屏涂鸦"）。

*备选（暂不做）*：下划线若想用品牌高亮色（随主题变），需改 `mask-image + background-color: var(--brand)` 方案；本步用中性灰烘焙，保持"克制"。

## Part B — 歪角多样化

### B1. `tokens.css`：扩到 5 个变体、加大幅度

保留 `--wobble-1/2/3`，新增两个更"歪"的（幅度 10–26px）：

```css
--wobble-4: 24px 12px 20px 15px / 13px 22px 16px 25px;
--wobble-5: 11px 25px 18px 13px / 24px 12px 26px 15px;
```

### B2. 重新分配，消除"相邻同角"

当前 `--wobble-2` 被 gallery/collection/community/modal 组/remap-card 复用；侧栏 `.side-panel section` 全部 `--wobble-3`（竖向堆叠 = 相邻同角，最扎眼）。改：

- **`.side-panel section`（重点）**：改为按 `:nth-of-type` 轮换，相邻不重样：
  ```css
  .side-panel section { border-radius: var(--wobble-3); }
  .side-panel section:nth-of-type(3n+1) { border-radius: var(--wobble-1); }
  .side-panel section:nth-of-type(3n+2) { border-radius: var(--wobble-5); }
  ```
- `.gallery-layout` → `--wobble-2`（保持）
- `.collection-layout` → `--wobble-4`（原 2）
- `.community-layout` → `--wobble-5`（原 2）
- 弹窗组 `:where(.remap-modal-card, …)` → `--wobble-2`（保持）
- `.remap-modal-card` → `--wobble-1`（原 2，让它与组内默认区分）
- `.topbar` → `--wobble-1`（保持）

网格卡/控件维持干净圆角，**不动**（DESIGN §4 铁律：歪角只给大框）。

## 构建与验证

1. `npm run build` —— 重建 `styles.css` + `app.bundle.js`。
2. `npm test` —— 24 项回归须全绿（ui-quality 无 wobble/divider 断言，风险低，仍须全跑）。
3. **人工四态核查**（第一步返工教训 [[ui-fix-verification-discipline]]）：
   - 桌面 + 手机分别看：侧栏各 section 歪角互不相同、分隔线为手绘波浪而非直线、`.section-title` 下划线不糊不压字。
   - 切至少 2 套主题（如草木/浅樱）确认烘焙灰线在各主题背景桌上观感 OK、无对比问题。
   - reduced-motion 无关（纯静态）；确认无横向溢出。

## 提交

单个 commit（Conventional Commits，英文）：

```
style(ui): hand-drawn dividers + diversified wobble (sketch step 2)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

暂存：`tokens.css`、`layout.css`、`components.css`、`styles.css`、`app.bundle.js`。**不碰** `CLAUDE.md`、`AUDIT_FIX_PLAN.md`。不推送、不合并（除非用户要求）。
