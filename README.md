# 拼豆工坊

一个静态浏览器游戏原型，模拟拼豆手作从选图、取豆、豆筛整理、摆放、检查、熨烫、冷却到收藏的完整流程。

## 开源与协议

- 本项目采用 [AGPL-3.0](</Users/Sakuro/beam/LICENSE>) 协议发布。


- 在线版本用户可通过仓库获取完整对应源码：<https://github.com/5akur0/perler-studio>

## 运行

1. 本地文件方式：直接打开 `index.html`。
2. 推荐 `localhost`：在项目目录运行 `npm run dev`，然后访问 `http://localhost:5173`。

项目没有构建步骤，也不依赖外部资源。

## 公开测试发布

- Cloudflare Pages 上线步骤见 [DEPLOY_CLOUDFLARE_PAGES.md](/Users/Sakuro/beam/DEPLOY_CLOUDFLARE_PAGES.md)。
- Figma 协作规范见 [FIGMA_HANDOFF.md](/Users/Sakuro/beam/FIGMA_HANDOFF.md)。

## 图纸画廊审核

- 首页的“图纸画廊”只读取后端已发布内容，用户投稿会先进入待审核队列。
- 投稿接口：`POST /api/gallery/submit`。
- 公开列表接口：`POST /api/gallery/list`。
- 审核接口：`POST /api/gallery/pending`、`POST /api/gallery/approve`、`POST /api/gallery/reject`。
- 管理审核页是 `admin.html`，需要输入云端环境变量 `ADMIN_TOKEN` 才能读取、通过或拒绝投稿。
- 不要把真实 `ADMIN_TOKEN` 提交到 GitHub；本仓库只提供 `.env.example` 里的变量名示例。
- Cloudbase 数据集合使用 `gallery_submissions` 保存待审/拒绝/通过记录，`gallery_items` 保存公开发布图纸。

## 玩法要点

- 先选择图纸，再进入拼豆工作台。
- 豆盒里有 48 个色号。图纸和豆盒都显示类似 `H5` 的色号，玩家需要自己按图纸选择。
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
