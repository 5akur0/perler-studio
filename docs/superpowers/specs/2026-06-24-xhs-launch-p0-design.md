# 拼豆工坊 · 小红书发布 P0 设计 (Spec A — 一次性交付)

> Status: draft for review · 2026-06-24
> Owner: 5akur0 · Build cadence: 本 spec 内 P0 六块作为**一个**交付批次完成 (用户明确要求一次性做完)，但前端/后端分节，可按依赖排序实现。
> 关联文档: `PRODUCT.md` · `DESIGN.md` · `design-system/MASTER.md` · `AGENTS.md`。本 spec 不覆盖 P1 (WS3-art / WS4 / WS5)，仅在末尾登记。

## 1. 背景与目标

拼豆工坊即将在小红书发布。用户最在意三件事:**成品出片图、文案钩子、封面/首屏**;并主动加入两个粘性功能:**留言板**与**更新板**;以及一个**版本号**用于发帖。本 spec 把发布前必须就位 (P0) 的六个工作流锁成一份可一次性实现的设计。

成功判据:
1. 把网址贴到小红书/微信/Twitter,链接自带 1200×630 预览大图 (不再是死链)。
2. 复制文案有多套小红书原生钩子可轮换,标签保留。
3. 成品可导出「纯作品图」(无图表 chrome) 变体。
4. 留言板 (先审后发 · 匿名+可填昵称) 与更新板 (你列项 · 用户点赞) 发布日即可用,且发布日 UGC 滥用面被审核+限流兜住。
5. 全站有可见版本号,发帖时一眼可引用。

## 2. 范围

**In (P0,本 spec):** WS1 og-image · WS2 文案钩子 · WS3-core 纯作品图导出 · WS6 留言板 · WS6 更新板 · WS7 版本号 · 社区入口 UI。

**Out (P1,后续各自 spec):** WS3-art (成品物件上卡 + KPI 柔化) · WS4 新手 coachmark · WS5 首屏封面化。**实现顺序约定:P0 全部 → P1 的 WS3-art 与 WS4 → WS5 暂缓。**

**铁律 (AGENTS.md):** 只改 `src/` 与后端 `cloudbase/`;前端改完必须 `npm run build` 重生成 `app.bundle.js`+`styles.css`。Agent 面向文字 (spec/注释/commit) 用英文;UI 文案与产品文档用中文。

---

## 3. 前端/Canvas 工作流 (零后端风险)

### WS1 · og-image 链接封面

**问题:** `index.html` 的 `og:image` 被注释,`twitter:card` 为 `summary` (小图)。URL 分享无预览图。

**方案:**
- 新增构建脚本 `scripts/gen-og-image.mjs`:无头 (Playwright,仓库已装 Chromium) 或离屏 canvas 复用现有出片管线,选一个精选图纸渲染一张 **1200×630** 的品牌封面 (左作品 + 右「拼豆工坊」标题/一句 slogan + 二维码可选),输出到 `og-image.png` (根目录,随站点提交)。固定种子图纸,保证可复现。
- `index.html`:取消注释 `<meta property="og:image" content="og-image.png">`,补 `og:image:width/height` (1200/630),`twitter:card` 改 `summary_large_image`,补 `twitter:image`。
- 补 `apple-touch-icon` (180×180,可由现有 favicon/品牌 mark 生成 `apple-touch-icon.png`)。
- CSP/`_headers` 无需改 (同源图片)。

**验收:** 用 opengraph 校验器 (或本地 meta dump) 确认 og:image/twitter:image 解析到真实文件;脚本可重复生成同一张图。

### WS2 · 文案钩子系统

**现状:** `main.js::copyShareText` 单模板 + 好标签 (`#拼豆 #手作 #像素画 #解压 #小游戏`);`render-export.js::SHARE_SLOGANS` 三条页脚 slogan。

**方案:**
- 抽出 `src/share-copy.js`:导出 `HOOKS` (8–12 条小红书原生首行钩子,覆盖**治愈/打卡/教程/解压**四种角度,例如「今天也给自己拼了一颗糖 🫧」「碎片时间打卡 Day _,赛博拼豆上头了」「零基础也能拼,手机点点就出片」) 与 `buildShareText(state)`。
- `copyShareText` 改为从 `HOOKS` 随机取首行 + 现有成绩行 + CTA 行 + 标签行。标签保留并可加 `#拼豆工坊`。
- slogan 与 hook 分离:slogan 留在出片图,hook 用于复制文案。
- 纯字符串,零渲染风险。

**验收:** 新增 `scripts/share-copy-regression.mjs` 断言 HOOKS 条数、四角度覆盖、标签存在、无空首行;多次调用首行有轮换。

### WS3-core · 纯作品图导出 (no-chrome)

**现状:** `exportShareImage(format)` 仅 portrait/square,均走完整卡片 (标题/评级/KPI/二维码/品牌)。

**方案:**
- `drawShareImage` 增参 `variant = "card" | "clean"` (默认 `"card"`)。`"clean"` 只画:页面渐变底 + 居中作品 well + 一行极小品牌水印 (`拼豆工坊 · 扫码同款` + 角落小二维码,可关),不画评级/KPI/slogan。
- `exportShareImage` 增第三个导出按钮「纯作品图」(`ui.js::addShareButton`),透传 `variant:"clean"`,正方形 1080×1080。
- 复用现有 `navigator.share({files})` + `<a download>` 兜底。

**验收:** 扩展 `scripts/finish-showcase-regression.mjs` 或新增断言:`drawShareImage` 接受 variant,clean 分支不绘制 KPI/评级文本调用。

### WS7 · 版本号

**方案:**
- `src/constants.js` 增 `export const APP_VERSION = "1.0.0";` (手动 bump,单一真源)。
- 露出位置:
  1. **更新板**头部「当前版本 v1.0.0」。
  2. **设置/关于**:在设置弹窗底部加一行「拼豆工坊 v1.0.0」(灰字小号,`--font-clear`,≥ legible)。
  3. 出片图卡片页脚可选追加极小 `v1.0` (品牌块右侧,`CANVAS_CLEAR_FONT`,不影响 clean 变体)。
- 发布脚本提示:bump `APP_VERSION` 后 `npm run build`。

**验收:** `scripts/version-regression.mjs` 断言 `APP_VERSION` 形如 `\d+\.\d+\.\d+` 且被更新板/设置消费。

---

## 4. 社区粘性后端 (WS6) — 复用 `share-api`

### 4.1 架构基线 (复用,不另起)

`cloudbase/share-api/index.js` 是单一 action 路由云函数,已有:CORS allowlist、`hashIp` (HMAC)、`rate_limits` 滑窗限流、`admin_guards` 失败锁定 + `x-admin-token`、请求体上限、定期清理。新功能**作为新路由挂上去**,复用全部上述机制;`admin.html`/`admin.js` 复用审核 UI 模式。

新增集合:`messages` (公开已审)、`messages_submissions` (待审)、`roadmap_items` (公开)、`roadmap_votes` (去重)。沿用 gallery 的「submissions → admin approve → 公开集合」两段式。

### 4.2 留言板 (先审后发 · 匿名+可填昵称)

**数据模型 `messages_submissions` / `messages`:**
`{ id, nickname, content, createdAt, status: pending|approved|deleted, ipHash, clientId }`
- `nickname`:可空,空则展示「匿名豆友」;长度 ≤ 16;`escapeHtml` 渲染。
- `content`:必填,长度 ≤ 200;去首尾空白;**剥离/拒绝 URL** (降垃圾外链);`escapeHtml` 渲染。

**新增路由:**
- `POST /api/messages/submit` — 限流 (复用写限流,建议 ≤ 6/min/IP);校验长度/URL;落 `messages_submissions` status=pending;返回「已提交,审核后展示」。
- `POST /api/messages/list` — 读限流;只返回 `messages` (已审) status=approved,按 createdAt 倒序,分页 (cursor/limit ≤ 20)。
- `POST /api/messages/approve` (admin) — 待审转入 `messages` 公开。
- `POST /api/messages/delete` (admin) — 删除待审或已公开。

**前端 (`src/community.js` 新模块):** 留言列表 (L2 白卡,昵称 + 内容 + 相对时间)、提交表单 (昵称 input 可空 + content textarea,≥16px,字数计数,提交按钮单 CTA)、空态/失败态 (复用画廊空态范式)、`shareApiBase` 未配置时降级提示。提交后乐观提示「等待审核」,不即时插入列表。

**Admin:** `admin.js` 加「留言审核」分区,复用 `request()`+token+卡片范式;approve/delete 按钮。

### 4.3 更新板 (你列项 · 用户点赞)

**数据模型 `roadmap_items`:**
`{ id, title, desc, status: planned|in_progress|shipped, version, order, votes, createdAt }` — **管理员撰写** (admin 增改),公开只读 + 投票。
`roadmap_votes`:`{ itemId, clientId, ipHash, createdAt }` — 去重一人一项一票。

**新增路由:**
- `POST /api/roadmap/list` — 读限流;返回 items (按 `order`/status),含 `votes` 与「当前 clientId 是否已投」。
- `POST /api/roadmap/vote` — 写限流;入参 `{ itemId, clientId }`;按 `(itemId, clientId)` + `ipHash` 去重;**支持取消** (toggle:已投则撤);事务内 `votes` 增减 (复用 gallery 的事务写法)。
- `POST /api/roadmap/upsert` (admin) — 增/改条目 (title/desc/status/version/order)。
- `POST /api/roadmap/delete` (admin)。

**前端 (`src/community.js`):** 更新板 tab — 头部「当前版本 v{APP_VERSION}」;条目卡:状态药丸 (planned/进行中/已发布 v_)、标题、描述、点赞按钮 (心形 SVG,计数,已投高亮,乐观更新 + 失败回滚)。`clientId` 存 localStorage (复用现有 client id 若有,否则生成 uuid)。

**Admin:** `admin.js` 加「更新板管理」分区:列条目 + 新增/编辑表单 (title/desc/status/version/order) + 删除。

### 4.4 社区入口 UI (单一「社区」屏 · 两 Tab)

- 首页保持四张卡的克制留白;**新增一个「社区」次级入口** (放首页底部/页脚区,非第五张等大卡,守 DESIGN「克制留白」与「每屏 ≤1 主 CTA」)。
- 「社区」屏复用 `studio-shell` 外壳 + L1 玻璃面,顶部两 Tab:**留言板 / 更新板**;`setAppMode` 切屏时非活动屏 `aria-hidden` (复用现有多屏无障碍机制)。
- 全部图标 SVG (`stroke=currentColor`),按钮 `aria-label`,触控 ≥44×44,输入 ≥16px,动画包 `prefers-reduced-motion`。

---

## 5. 安全与审核 (发布日重点)

- **留言**:先审后发 = 公开列表永远只含已批内容,发布日刷屏/恶意内容不直接可见。提交写限流 ≤6/min/IP;content ≤200 且剥 URL;`escapeHtml` 全渲染路径;`ipHash` HMAC 存储 (复用)。
- **投票**:`(itemId, clientId)` + `ipHash` 双重去重,写限流防刷;事务保证计数一致 (复用 gallery 事务)。
- **CORS**:新路由继承现有 allowlist;无新增跨域。
- **CSP**:新调用都打到已放行的 tcloudbase 域,`index.html` 与 `_headers` 无需改。
- **Admin**:新审核动作继承 `x-admin-token` + 失败锁定 + admin 限流。

## 6. 测试与回归

- `share-copy-regression.mjs` (WS2)、`version-regression.mjs` (WS7)、扩展 finish-showcase 断言 (WS3-core)。
- 后端:新增 `scripts/community-api-regression.mjs` (源级断言:新路由存在、限流/escape/去重路径接线;沿用现有 regression 的静态断言风格)。
- og-image:脚本可重复生成 + meta 解析校验。
- 全量跑现有 `test:*` 套件确认零回退;`npm run build` 后比对产物。

## 7. 部署清单

1. 前端:bump `APP_VERSION` → `npm run build` → 提交 `app.bundle.js`/`styles.css`/`index.html`/`og-image.png`/`apple-touch-icon.png`。
2. 后端:CloudBase 建 `messages`/`messages_submissions`/`roadmap_items`/`roadmap_votes` 集合 → 部署 `share-api` → admin.html 冒烟 (提交留言→admin 通过→公开列表可见;新增更新板条目→点赞→去重生效)。
3. 录入首批更新板条目 (即将更新清单) + 设 `APP_VERSION` 初值。

## 8. P1 登记 (out of scope,后续 spec)

- **WS3-art**:出片图 well 改用 `render-finish.js` 成品物件 (钥匙扣/杯垫/摆件) 渲染选项;KPI strip 柔化去「健身报告感」。
- **WS4**:首次摆放一次性可跳过 coachmark + 快速起步图纸,提升完成率→提升分享量。
- **WS5**:首屏从「菜单」升级为「封面」(精选轮播/托盘环境动效)。**暂缓,不进发布关键路径。**
