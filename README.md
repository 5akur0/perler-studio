# 拼豆工坊

一个静态浏览器游戏原型，模拟拼豆手作从选图、取豆、豆筛整理、摆放、检查、熨烫、冷却到收藏的完整流程。

## 开源与协议

- 本项目采用 [AGPL-3.0](./LICENSE) 协议发布。


- 在线版本用户可通过仓库获取完整对应源码：<https://github.com/5akur0/perler-studio>

## 运行

1. 本地文件方式：直接打开 `index.html`（加载的是已提交的打包产物，可离线双击运行）。
2. 推荐 `localhost`：在项目目录运行 `npm run dev`，然后访问 `http://localhost:5173`。

> 注意：页面通过 `<link>` 引用 Google Fonts（`fonts.googleapis.com` / `fonts.gstatic.com`），离线时会回退到系统字体。

## 构建

源码在 `src/`（ES modules）+ `src/styles/`，由 [esbuild](https://esbuild.github.io/) 打包成提交进仓库的产物 `app.bundle.js` 与 `styles.css`，供 `index.html` 直接加载（这样 `file://` 双击也能跑）。

```bash
npm install        # 安装 esbuild / wrangler 等开发依赖
npm run build      # src/main.js -> app.bundle.js；src/styles/index.css -> styles.css
npm run watch:js   # 开发时监听重建 JS（另开终端可 watch:css）
```

**改完 `src/` 必须重新 `npm run build`**，否则线上加载的是旧产物（产物已提交进 git）。

回归测试（会话存档/恢复）：

```bash
node scripts/session-regression.mjs
```

## 项目结构

| 文件 | 职责 |
|------|------|
| `src/main.js` | 主控：应用模式切换、拼豆核心玩法（倒豆/豆针/镊子/熨烫/冷却/检查）、输入处理、主循环 |
| `src/render.js` | Canvas 绘制引擎（工作台、看板、豆筛、工具、分享图） |
| `src/draw.js` | 绘图台（画笔/橡皮/填充/吸管/多级撤销/双指缩放） |
| `src/gallery.js` | 网络层 + 图纸画廊 + 云端短码分享 + 短码导入 |
| `src/session.js` | 在制作品自动存档 / 恢复（含恢复校验加固） |
| `src/custom-pattern.js` | 导入图片 → 像素图纸转换层 |
| `src/ui.js` | 侧栏 / 工具栏 / 调色盘 / 作品集等 DOM 渲染 |
| `src/modal-controller.js` | 弹窗开关 + 焦点陷阱 |
| `src/utils.js` | 共享工具（escapeHtml / prefersReducedMotion / stableHash / 随机文案） |
| 其它 | `pattern*.js` 图纸数据/编码、`palette.js` 调色、`image-convert.js` 图像算法、`state.js` 全局状态 |

## 公开测试发布

- Cloudflare Pages 上线步骤见 [DEPLOY_CLOUDFLARE_PAGES.md](./DEPLOY_CLOUDFLARE_PAGES.md)。
- Figma 协作规范见 [FIGMA_HANDOFF.md](./FIGMA_HANDOFF.md)。

## 图纸画廊审核

- 首页的“图纸画廊”只读取后端已发布内容，用户投稿会先进入待审核队列。
- 投稿接口：`POST /api/gallery/submit`。
- 公开列表接口：`POST /api/gallery/list`。
- 审核接口：`POST /api/gallery/pending`、`POST /api/gallery/approve`、`POST /api/gallery/reject`。
- 管理审核页是 `admin.html`，需要输入云端环境变量 `ADMIN_TOKEN` 才能读取、通过或拒绝投稿。
- 不要把真实 `ADMIN_TOKEN` 提交到 GitHub；本仓库只提供 `.env.example` 里的变量名示例。
- CloudBase 数据集合：`gallery_submissions`（待审/拒绝/通过记录）、`gallery_items`（公开发布图纸）、`shares`（云端短码）、`rate_limits`（按 IP 限流计数）、`admin_guards`（管理员失败锁定）。后端部署见 [DEPLOY_CLOUDFLARE_PAGES.md](./DEPLOY_CLOUDFLARE_PAGES.md) 的「后端」一节。

## 安全

- **内容安全策略（CSP）**：`_headers`（Cloudflare）与 `index.html` 的 `<meta http-equiv>`（任意托管）**双写**，限制脚本只走 `'self'`、放行 Google Fonts 与后端 API 域。⚠️ 改一处需同步另一处。
- **限流**：分享/投稿按 IP 限流（DB 事务，多实例有效）；管理员接口失败 5 次锁定 15 分钟，token 用定长比较。
- 页面无内联脚本：后端域名通过 `<meta name="beam-share-api-base">` 注入，再由打包脚本读取。

## 玩法要点

- 先选择图纸，再进入拼豆工作台。
- 豆盒里有 221 个色号（MARD 色卡）。图纸和豆盒都显示类似 `H5` 的色号，玩家需要自己按图纸选择；移动端只显示当前图纸用到的色号。
- 图纸尺寸默认是 `24x24`，也可以改成 `16x16`、`32x32`、`40x40`、`48x48`、`100x100`，或输入 `12-100` 之间的自定义尺寸。
- 豆筛只有一个。把豆盒里的某个色号倒入豆筛后，换色前必须先倒掉原来的豆子。
- 豆筛在拼豆阶段常驻，只保留“抖动豆筛”动作，也可以直接拖动工作台里的豆筛来抖动。
- 针工具只从豆筛取豆，适合拖动铺大面积同色区域。
- 镊子必须先从豆盒夹一颗，或从板面夹起一颗，再点击空位放下。
- 检查阶段会统计漏放、错色和多放，可打开提示后回到摆放修正。
- 熨烫阶段按住工作台上的拼豆板移动熨斗，控制温度、压力和移动速度。
- 冷却阶段压平作品，最后保存到本机作品集。
- 左侧可以导入图片生成当前尺寸的自定义图纸。
- 自定义图片采用像素画优先流程：先估算源图色复杂度，再自适应颜色简化，锁定少量拼豆色号后再映射，并清理孤立杂点和小色块，默认关闭抖动。
- 右侧小红书区可以导出带水印竖图/方图，并复制分享文案。
