# CLAUDE.md

静态浏览器小游戏「拼豆工坊」（`perler-studio`）：模拟拼豆手作全流程（选图→取豆→豆筛→摆放→检查→熨烫→冷却→收藏）。纯前端 ES modules + [esbuild](https://esbuild.github.io/) 打包，可 `file://` 双击运行；后端用 CloudBase（图纸画廊审核 / 云端短码分享）。

## ⚠️ 关键规则（不照做就出错）

- **改完 `src/*.js` 或 `src/styles/*.css` → 必须 `npm run build`。** `index.html` 加载的是**已提交进 git 的打包产物** `app.bundle.js` / `styles.css`，不重建线上就是旧代码。开发时可开 `npm run watch:js` / `watch:css` 自动重建。
- **CSP 双写。** 内容安全策略同时写在 `_headers`（Cloudflare）和 `index.html` 的 `<meta http-equiv="Content-Security-Policy">`，**改一处必须同步另一处**。
- **动 UI 前先读 `DESIGN.md`（视觉事实来源，Stitch 格式 + `.impeccable/design.json` sidecar）与 `PRODUCT.md`（策略：register / 用户 / 反参考 / 设计原则）。** 含 tokens / 三层玻璃面 / 对比度规则（有意为之的 3.3:1 主按钮）。`design-system/MASTER.md` 留作更深的实现细节与历史依据，**冲突时以 `DESIGN.md` 为准**；某一屏要偏离时写到 `design-system/pages/<屏名>.md`。
- 组件颜色一律用 `var(--brand…)` 等 token，**不要写死薄荷绿**——运行时 `src/theme.js` 的 `applyBackgroundTheme()` 会按主题覆盖品牌色。改 `src/styles/tokens.css` 要同步 MASTER.md。
- **不要把真实 `ADMIN_TOKEN` 提交到仓库**，只在 `.env.example` 留变量名示例。

## 设计上下文（Design Context）

- `PRODUCT.md` — **策略事实来源**：register（`product`）、核心用户（治愈系休闲玩家为主，兼小红书创作者 / 真实拼豆爱好者 / 桌面端深度玩家）、产品目标、品牌人格（治愈·温润·沉浸）、反参考、设计原则、无障碍。
- `DESIGN.md` — **视觉事实来源**（Stitch 格式：YAML token 前置 + 六节正文）：色板 / 字体 / 三层玻璃 elevation / 组件 / Do's & Don'ts。配套机器可读 sidecar `.impeccable/design.json`（色阶 / 阴影 / 动效 / 断点 / 组件 HTML+CSS）。North Star =「桃面糖豆手作」。
- `design-system/MASTER.md` — 更深的实现细节与历史依据；已被 `DESIGN.md` 收编，**冲突时以 `DESIGN.md` 为准**。
- `/impeccable …` 各命令会自动读取根目录 `PRODUCT.md` / `DESIGN.md`；live 模式配置在 `.impeccable/live/config.json`。

## 常用命令

| 命令 | 作用 |
|------|------|
| `npm run dev` | 本地起 `server.cjs`，访问 `http://localhost:5173` |
| `npm run build` | 重建 JS + CSS 产物（改完 `src/` 必跑） |
| `npm run watch:js` / `npm run watch:css` | 开发时监听重建 |
| `node scripts/session-regression.mjs`（= `npm run test:session`） | 会话存档/恢复回归测试 |

## 架构 / 模块地图

源码在 `src/`（ES modules）+ `src/styles/`。入口 `src/main.js` → `app.bundle.js`；CSS 入口 `src/styles/index.css` → `styles.css`。

| 文件 | 职责 |
|------|------|
| `src/main.js` | 主控：模式切换、拼豆核心玩法（倒豆/豆针/镊子/熨烫/冷却/检查）、输入处理、主循环 |
| `src/render.js` | Canvas 绘制引擎（工作台、看板、豆筛、工具、分享图） |
| `src/draw.js` | 绘图台（画笔/橡皮/填充/吸管/多级撤销/双指缩放） |
| `src/gallery.js` | 网络层 + 图纸画廊 + 云端短码分享 / 导入 |
| `src/session.js` | 在制作品自动存档 / 恢复（含恢复校验加固） |
| `src/custom-pattern.js` + `src/image-convert.js` | 导入图片 → 像素图纸转换层 + 图像算法 |
| `src/ui.js` | 侧栏 / 工具栏 / 调色盘 / 作品集等 DOM 渲染 |
| `src/modal-controller.js` | 弹窗开关 + 焦点陷阱 |
| `src/utils.js` | 共享工具（escapeHtml / prefersReducedMotion / stableHash 等） |
| `pattern.js` / `pattern-code.js` / `patterns-data.js` | 图纸数据 / 编码 / 内置图纸 |
| `palette.js` / `color-utils.js` | MARD 调色盘 + 颜色算法 | 
| `state.js` / `constants.js` / `dom.js` / `theme.js` / `storage.js` / `achievements.js` / `notify.js` | 全局状态、枚举、DOM 引用、主题、本地存储、成就、提示 |

> 旧的单文件 `script.js` IIFE 已废弃（仅残留在 `.claude/worktrees/`），现为 `src/*` 模块化结构。

## 后端 / 部署

CloudBase 数据集合、画廊审核接口、Cloudflare Pages 上线步骤见 `DEPLOY_CLOUDFLARE_PAGES.md` 与 `README.md` 对应小节。审核页是 `admin.html`，需云端环境变量 `ADMIN_TOKEN`。

## 约定

- **Git 提交信息（commit message）与所有代码注释一律用英文。** 这是硬性要求，没有例外：commit message、`src/**` 内的注释、JSDoc 全部写英文，禁止中文提交信息 / 中文代码注释。提交信息沿用 Conventional Commits 风格（`fix:` / `feat:` / `refactor:` / `polish:` 等）。
- 上一条只约束「提交信息」和「代码注释」。面向用户的文案、以及 `README.md` / `DESIGN.md` / `PRODUCT.md` / 本文件等项目文档仍用中文。
- 玩法、色卡、图纸尺寸等使用细节见 `README.md`，不在此重复。
