# Cloudflare Pages 发布指南（网页版公开测试）

## 0) 准备

- 一个 GitHub 仓库（当前项目已满足）。
- 一个 Cloudflare 账号。
- 一个域名（可选，但强烈建议用于小红书发布）。

当前项目是静态站，无需构建步骤。Cloudflare Pages 可直接发布仓库根目录文件。

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

此项目当前不依赖环境变量，`Environment Variables` 可空。

如果以后要加统计或开关，建议只加这类变量：

- `PUBLIC_APP_ENV=beta`
- `PUBLIC_FEEDBACK_URL=https://...`

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
