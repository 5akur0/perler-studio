# Cloudflare Pages 发布指南（网页版公开测试）

## 0) 准备

- 一个 GitHub 仓库（当前项目已满足）。
- 一个 Cloudflare 账号。
- 一个域名（可选，但强烈建议用于小红书发布）。

当前项目的打包产物（`app.bundle.js` / `styles.css`）已提交进仓库，Cloudflare Pages 可直接发布根目录文件、**无需在 Pages 上配置构建命令**。
但本地改动 `src/` 后，**推送前必须先 `npm run build`** 重新生成产物，否则线上仍是旧版（详见 README 的「构建」一节）。

> 后端（图纸画廊 / 云端短码）是独立的 CloudBase 云函数，**不在** Cloudflare Pages 上，部署见文末「后端」一节。

## 1) 推送代码到 GitHub

在项目目录执行：

```bash
git add .
git commit -m "chore: prepare cloudflare pages public beta"
git push
```

## 2) 在 Cloudflare Pages 创建项目

1. 登录 Cloudflare 控制台。
2. 进入 `Workers & Pages`。
3. 点 `Create` -> `Pages` -> `Connect to Git`。
4. 选择本仓库。

构建参数填写：

- `Framework preset`: `None`
- `Build command`: 留空
- `Build output directory`: `/`

这和仓库里的 `wrangler.toml` 一致（`pages_build_output_dir = "."`）。

## 3) 配置环境

**Cloudflare Pages（前端）不需要环境变量**，`Environment Variables` 可空。
（后端 `ADMIN_TOKEN` / `ALLOWED_ORIGINS` 是 CloudBase 云函数的环境变量，见文末「后端」一节。）

## 3.5) 安全头 / CSP

- `_headers` 已配置安全响应头（含 `Content-Security-Policy`），Cloudflare Pages 会自动应用。
- 同一份 CSP 也写在 `index.html` 的 `<meta http-equiv="Content-Security-Policy">`（让非 Cloudflare 托管也生效）。
- ⚠️ **两处 CSP 必须保持一致**：改了后端域名 / 字体源时，`_headers` 和 `index.html` 都要同步改。
- CSP 放行项：脚本 `'self'`、样式 + 内联 `'unsafe-inline'` + `fonts.googleapis.com`、字体 `fonts.gstatic.com`、`connect-src` 含 CloudBase 后端域、`img-src 'self' data:`（覆盖背景图与导入图）。

## 4) 绑定域名

1. 项目创建成功后，进入 `Custom domains`。
2. 添加你的域名（例如 `perler.yourdomain.com`）。
3. 按 Cloudflare 引导完成 DNS。
4. 开启 `Always Use HTTPS`。

## 5) 小红书测试期建议

- 主页链接、评论区、私信自动回复统一指向同一个 URL。
- 每次迭代只改 1-2 个核心点（例如图纸导入、开始按钮、移动端板面可读性）。
- 用 Cloudflare Web Analytics 看三项：
  1. UV
  2. 平均停留时长
  3. 回访率

## 6) 发布前核对清单

- [ ] 桌面 `1440` 可用
- [ ] 手机 `390` 无横向滚动
- [ ] 首屏可达 `开始拼豆`
- [ ] 自定义图纸上传正常
- [ ] 导出分享图正常
- [ ] HTTPS 正常
- [ ] 域名生效

## 7) 回滚策略

如果新版有问题：

1. 在 Cloudflare Pages -> `Deployments` 找上一版成功部署。
2. 点 `Rollback to this deployment`。
3. 修复后再推送新版本。

---

## 后端（CloudBase 云函数 `share-api`）

图纸画廊、云端短码、限流、管理员审核都跑在 CloudBase 云函数 `cloudbase/share-api/`，与前端独立部署。

### 一次性准备

1. 安装并登录 CLI：`tcb login`（`tcb env list` 确认能看到环境）。
2. 在 CloudBase 控制台「数据库」创建集合（权限均选 **仅管理员可读写**）：
   - `shares`、`gallery_submissions`、`gallery_items`（业务数据）
   - `rate_limits`、`admin_guards`（限流 / 管理员失败锁定，**新增，缺了会报错**）
3. 在云函数环境变量配置：
   - `ADMIN_TOKEN`：一段足够长的随机串（审核页 `admin.html` 要输入它；**勿提交进 git**）
   - `ALLOWED_ORIGINS`：允许跨域的前端域名，逗号分隔（缺省值见 `index.js`）
4. 仓库根目录的 `cloudbaserc.json` 已配置好函数名 / runtime（`Nodejs18.15`）/ 环境 ID。

### 部署

```bash
cd cloudbase/share-api && npm install && cd ../..   # 安装函数依赖
tcb fn deploy share-api --env-id <你的环境ID>        # 提示覆盖时输 y
```

### 部署后冒烟

```bash
# 画廊列表应返回 {"ok":true,...}
curl -s -X POST <API_BASE>/api/gallery/list -H "content-type: application/json" -d '{"limit":3}'
# admin 连错 token 5 次：前 3 次 401，之后 429 admin_locked（锁 15 分钟）
```

> 锁定后想立即解锁：去控制台 `admin_guards` 集合删掉对应 IP 的记录，或等 15 分钟。
> 改了 `index.js` 后需 `tcb fn deploy` 重新部署才生效。
