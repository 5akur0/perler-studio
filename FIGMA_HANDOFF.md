# Figma 协作规范（网页版公开测试）

## 目标

用最小成本让设计稿和线上版本同步，避免“稿是稿、页面是页面”。

## 1) 页面与断点

Figma 至少保持这两个 Frame：

1. `Desktop / 1440 x 900`
2. `Mobile / 390 x 844`

如需补中间态，增加：

1. `Tablet / 768 x 900`

## 2) 命名规范

页面名建议：

1. `00_Tokens`
2. `01_Choose`
3. `02_Working`
4. `03_Modals`
5. `99_Handoff`

组件命名建议：

- `Topbar/WorkflowStep`
- `Panel/PatternCard`
- `Panel/ColorChip`
- `Button/Primary`
- `Button/IconOnly`

## 3) 设计令牌（Tokens）

在 `00_Tokens` 里固定这些字段：

- Color: `ink/muted/line/mint/coral/table/surface`
- Radius: `xs/sm/md/lg/pill`
- Space: `4/8/12/16/24/32`
- Type: `11/13/15/18/22`

要求：Figma Token 名称和 CSS 变量语义一一对应。

## 4) 关键流程稿

`01_Choose` 必须包含：

1. 图纸列表
2. 预览区
3. `开始拼豆` CTA（移动端粘性）

`02_Working` 必须包含：

1. 工作板
2. 豆盒（移动端前置）
3. 工具台（打开操作面板、豆针、镊子）
4. 参考图纸

## 5) 验收规则

每次设计改动后，`99_Handoff` 输出三张对照图：

1. Desktop 实机截图
2. Mobile 实机截图
3. Figma 同视口截图

只要出现以下任意一条，不允许合并：

- 文字溢出或重叠
- 横向滚动
- 关键按钮首屏不可达
- 点击区小于 `44x44`

## 6) 发布节奏建议

公开测试期每周最多发布 2 个 UI 主题改动，优先顺序：

1. 可读性（板面、色号）
2. 可操作性（触控区、路径）
3. 美观（配色、动画）
