# 拼豆工坊 · Perler Studio

一个纯前端、可离线运行的浏览器拼豆手作模拟小游戏：从选图、取豆、豆筛整理、摆放、检查、熨烫、冷却到收藏，完整还原「桌前慢慢做手工」的治愈体验，并让每一屏都「出片」可分享。

- **治愈拟物**：柔和粉彩 + 圆润质感 + 三层玻璃，5 套主题（雾青 / 奶杏 / 浅樱 / 晴蓝 / 草木）运行时整体换色。
- **移动优先**：手机强制竖屏、直接摆豆、只显示本图用色；桌面横屏保留豆筛 / 豆针 / 镊子等完整工具流。
- **真实色卡**：221 个 MARD 色号，支持自定义尺寸（桌面最大 100×100）。
- **可分享**：每个阶段都能单独截图，右侧可导出小红书竖图 / 方图并复制文案。
- **零后端也能跑**：`file://` 双击即玩；画廊与分享码（图纸名 + 短码）由 CloudBase 提供。

## 运行

1. **本地双击**：直接打开 `index.html`（加载已提交的打包产物 `app.bundle.js` / `styles.css`，可离线运行）。
2. **本地服务器（推荐）**：`npm run dev`，访问 <http://localhost:5173>。

> 页面通过 `<link>` 引用 Google Fonts（`fonts.googleapis.com` / `fonts.gstatic.com`）与 jsDelivr 字体；离线时优雅回退到系统圆体。

## 构建

源码在 `src/`（ES modules）+ `src/styles/`，由 [esbuild](https://esbuild.github.io/) 打包成**提交进仓库**的产物 `app.bundle.js` 与 `styles.css`，供 `index.html` 直接加载（所以 `file://` 也能跑）。

```bash
npm install        # 安装 esbuild / wrangler 等开发依赖
npm run build      # src/main.js -> app.bundle.js；src/styles/index.css -> styles.css
npm run watch:js   # 开发时监听重建 JS（另开终端可 watch:css）
```

> **改完 `src/` 必须重新 `npm run build`** 并提交更新后的产物，否则线上加载的是旧打包。

## 测试

回归检查都是独立的 Node 脚本（`scripts/*-regression.mjs`），部分用 Playwright：

```bash
npm test                       # 跑全部已注册回归
node scripts/session-regression.mjs   # 单跑某一项（例：会话存档/恢复）
```

合并到 `main` 前请跑齐所有 `test:<area>`；交互 / 响应式改动需在桌面、移动、必要时平板横屏各自验证。

## 项目结构

| 模块 | 职责 |
|------|------|
| `src/main.js` | 主控：应用模式切换、拼豆核心玩法（倒豆 / 豆针 / 镊子 / 熨烫 / 冷却 / 检查）、输入、主循环 |
| `src/render.js` + `render-{export,tray,inspect,finish,fusion,stats,primitives}.js` | Canvas 绘制引擎，按场景拆分（工作台 / 看板 / 豆筛 / 工具 / 出片图 / 成品展示） |
| `src/draw.js` | 绘图台（画笔 / 橡皮 / 填充 / 吸管 / 多级撤销 / 双指缩放）；创作图纸并存入图纸库 |
| `src/pattern-library.js` | 图纸库（拼豆台挑图屏）数据层：默认 + 导入图纸的本地持久化、星标置顶、删除 / 恢复默认、拼音排序；刻意 DOM-free 便于 Node 测试 |
| `src/gallery.js` · `src/share-qr.js` | 网络层 + 图纸画廊 + 云端分享码（图纸名 + 短码）分享 / 导入；分享图与二维码生成 |
| `src/session.js` | 在制作品自动存档 / 恢复（含恢复校验加固） |
| `src/custom-pattern.js` · `src/image-convert.js` | 导入图片 → 像素图纸转换（独立实现的转换管线） |
| `src/ui.js` · `src/modal-controller.js` | 侧栏 / 工具栏 / 调色盘 / 作品集等 DOM 渲染；弹窗 + 焦点陷阱 |
| `src/board-layout.js` · `src/board-skin.js` | 棋盘几何（固定 30×30、可吸附拼接）与看板皮肤 |
| `src/constants.js` · `src/state.js` · `src/theme.js` | 配置（板尺寸 / 主题）、全局状态、主题切换 |
| `src/sfx.js` · `src/bgm.js` | 音效 / 背景音 |
| 其它 | `pattern*.js` 图纸数据 / 编码、`palette.js` 调色、`utils.js` 共享工具 |

## 文档

| 文档 | 内容 |
|------|------|
| [PRODUCT.md](./PRODUCT.md) | 产品策略、目标用户、平台分工、可访问性目标 |
| [DESIGN.md](./DESIGN.md) | 视觉与交互契约（颜色 / 字体 / 间距 / 组件 / 动效）——设计单一事实来源 |
| [design-system/MASTER.md](./design-system/MASTER.md) | 设计系统更深的实现历史与佐证（冲突以 DESIGN.md 为准） |
| [AGENTS.md](./AGENTS.md) | 仓库工作流、构建、测试、代码风格、提交规范 |
| [SECURITY.md](./SECURITY.md) | 威胁模型与加固记录 |
| [DEPLOY_CLOUDFLARE_PAGES.md](./DEPLOY_CLOUDFLARE_PAGES.md) | Cloudflare Pages 上线 + CloudBase 后端部署 |
| [FIGMA_HANDOFF.md](./FIGMA_HANDOFF.md) | Figma 协作规范 |

## 图纸画廊与审核

- 首页「图纸画廊」只读取后端**已发布**内容；用户投稿先进入待审核队列。
- 接口：投稿 `POST /api/gallery/submit`、公开列表 `POST /api/gallery/list`、审核 `POST /api/gallery/{pending,approve,reject}`。
- 审核页 `admin.html` 需云端环境变量 `ADMIN_TOKEN`；**不要把真实 token 提交到 GitHub**，仓库只提供 `.env.example` 的变量名示例。
- CloudBase 集合：`gallery_submissions`（待审 / 拒绝 / 通过）、`gallery_items`（公开图纸）、`shares`（短码）、`rate_limits`（按 IP 限流）、`admin_guards`（管理员失败锁定）。后端部署见 DEPLOY 文档「后端」一节。

## 安全

- **CSP**：`_headers`（Cloudflare）与 `index.html` 的 `<meta http-equiv>`（任意托管）**双写**，脚本仅 `'self'`，放行字体与后端 API 域。⚠️ 改一处需同步另一处。
- **限流**：分享 / 投稿按 IP 限流（DB 事务，多实例有效，IPv6 按 /64 归并）；管理员接口失败 5 次锁定 15 分钟，token 定长比较。
- 页面无内联脚本：后端域名经 `<meta name="beam-share-api-base">` 注入，由打包脚本读取。

## 玩法要点

- 先选图纸，再进入拼豆工作台。棋盘是一块固定 **30×30** 的拼豆板（真实拼豆板可吸附拼接成更大画面）。
- 豆盒里有 **221 个 MARD 色号**；图纸和豆盒都显示类似 `H5` 的色号，玩家照图纸选色。移动端只显示本图用到的色号。
- 桌面端保留豆筛 / 豆针 / 镊子：豆筛只有一个，换色前必须先倒掉原来的豆子；针工具从豆筛取豆铺大面积，镊子要先夹一颗再点空位放下。移动端直接摆豆，不塞这些工具。
- 检查阶段统计漏放 / 错色 / 多放，可开提示后回到摆放修正；熨烫阶段控制温度、压力与移动速度；冷却阶段压平作品后存入本机作品集。
- 左侧可导入图片，按「像素画优先」流程自动生成当前尺寸图纸：先估算源图色复杂度，再自适应简化颜色、锁定少量色号映射，并清理孤立杂点与小色块。

## 开源与协议

- 本项目采用 [MIT](./LICENSE) 协议发布。
- 仓库地址：<https://github.com/5akur0/perler-studio>
