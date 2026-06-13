# Lucide 图标统一设计

## 目标

将主应用与管理页中的功能性图标统一为 Lucide 描边风格，消除散落的手写 SVG、混杂线宽和文本 `×` 关闭符号，同时保持项目可离线运行、支持 `file://`、不依赖 CDN。

## 范围

覆盖：

- 首页四个入口及箭头
- 画廊、作品集、绘图台和拼豆台顶栏操作
- 绘图工具、检查操作、收藏删除和沙盒状态
- 空状态与按钮中的功能图标
- 主应用全部弹窗关闭按钮
- `admin.html` 与 `admin.js` 中适合图标化的操作

不覆盖：

- 品牌 mark
- Canvas 绘制内容
- 方向提示等插画型 SVG
- 仅用于视觉装饰的拼豆图形

## 架构

`src/icons.js` 是图标几何与渲染规则的唯一事实来源。图标路径使用 `better-icons get lucide:<name>` 获取，并以 Lucide 官方图形为准。

模块提供两个入口：

- `icon(name, options)`：返回 SVG 字符串，供动态 DOM 模板使用。
- `hydrateIcons(root)`：查找 `data-lucide-icon` 静态占位并替换为 SVG，供 `index.html` 和 `admin.html` 使用。

主应用在初始化早期调用 `hydrateIcons(document)`。管理页直接从 `src/icons.js` 导入并调用同一函数，不引入额外图标包或 CDN。

## 视觉规则

- `viewBox="0 0 24 24"`
- `fill="none"`
- `stroke="currentColor"`
- `stroke-linecap="round"`
- `stroke-linejoin="round"`
- 默认 `stroke-width="2"`
- 仅在大尺寸空状态图标中允许降低到 `1.75` 或 `1.8`
- 尺寸使用有限层级：`14`、`16`、`18`、`20`、`22`、`40`
- 弹窗关闭统一使用 Lucide `x`
- 同一语义在所有页面使用同一图标名

自定义 `pegboard` 可保留为产品专属图形，但必须遵守相同 viewBox、描边和端点规则。

## 静态与动态图标

静态 HTML 不再保存完整 SVG 路径，改为语义占位，例如：

```html
<span data-lucide-icon="settings" data-icon-size="18" aria-hidden="true"></span>
```

动态模板通过 `icon("settings", { size: 18 })` 生成。两种路径最终都使用相同注册表和渲染器，避免静态 HTML 与 JS 各维护一份图标。

## 无障碍

- 仅装饰或已有按钮文本/`aria-label` 的图标使用 `aria-hidden="true"`。
- 独立表达语义的图标通过 `icon()` 的 `label` 选项生成 `role="img"` 与 `aria-label`。
- 图标按钮继续保留准确的按钮级 `aria-label` 和 `title`。
- 替换文本 `×` 不改变按钮点击区域、焦点顺序或键盘行为。
- 颜色不作为唯一状态信息，保留现有文字与 `aria-pressed`。

## 错误处理

- 未知图标名在控制台输出 `[icons] unknown icon` 警告。
- 动态调用返回空字符串；静态占位保留在 DOM 中，便于开发时定位。
- 图标加载失败不得阻断页面初始化或核心玩法。

## 实施边界

- 不改变按钮文案、业务逻辑、布局结构和主题 token。
- 只在图标替换导致对齐差异时调整最小范围 CSS。
- 保留工作区现有未提交修改，不回退或覆盖无关变更。
- 修改 `src/*.js` 后必须运行 `npm run build`，更新已提交的 `app.bundle.js`。

## 验证

1. 使用代码扫描确认功能性手写 `<svg>` 和文本 `×` 已清除；允许列表仅包含品牌或插画。
2. 运行 `npm run build`。
3. 运行 `npm run test:session`。
4. 在主应用检查首页、各顶栏、绘图工具、检查操作、空状态、收藏和所有弹窗。
5. 在管理页检查读取、通过和拒绝操作的图标表现。
6. 用键盘验证图标按钮焦点、关闭按钮和 `aria-label`。
7. 确认桌面与移动断点下尺寸、基线和点击区域未发生回归。
