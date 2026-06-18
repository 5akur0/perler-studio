# 计划：移动端拼豆台 / 绘图台「整屏不滚动」视口锁定

## 目标
移动端（≤860px）让**拼豆台**和**绘图台**像原生 App：页面整体不上下滚动，
顶栏固定，高度按手机视口（dvh）自适应；内容超出时只在**屏内某个区域**滚动。

> 首页已完成（`.start-screen` 锁 `calc(100dvh - 2*--shell-pad) + overflow:hidden`）。
> 全站 `100vh→100dvh` 已完成。本计划只针对 placing / draw（必要时含 gallery / collection）。

## 当前状态（commit c0e59a8 之后）
- 移动端 placing/draw **仍走自然页面滚动**（内容多时整页滚）。
- 桌面（≥861px）**已有完整视口锁定模型**，直接照抄它的结构即可：
  `src/styles/responsive.css` 约 316–420 行 `@media (min-width: 861px)`：
  - `html,body { height:100%; overflow:hidden }`
  - `.app-shell { height:100dvh; min-height:0; display:flex; flex-direction:column; overflow:hidden }`
  - `.topbar { flex:0 0 auto }`
  - `.studio-grid { flex:1 1 auto; min-height:0; overflow:hidden }`
  - `.side-panel section { min-height:0; overflow:auto }`（侧栏内部滚动）
  - `.color-palette { overflow-y:auto; overscroll-behavior:contain }`
  - drawing：`.drawing-studio/.drawing-studio-card { flex:1; min-height:0; display:flex/column }`

## ⚠️ 上一次尝试为什么失败（务必先读）
我把 `≤860` 的 `.bead-studio-grid` 直接改成 `display:flex; flex-direction:column; overflow-y:auto`，
结果**画布塌陷 / 顺序错乱**：canvas 跑到了调色盘下面，不再是第一屏主元素。

原因（需要在 devtools/playwright 里实测确认）：
- `.app-shell` 的**直接子节点**里，拼豆台是 `header.bead-topbar` + `main.studio-grid.bead-studio-grid` **两个平级节点**
  （不是一个 wrapper）。gallery/collection/drawing 则是各自一个 `section` 包着自己的 topbar+content。
- 移动端 `.bead-studio-grid` 原本是 **`display:grid` 单列**，靠 `order` 规则排版：
  `.workbench{order:-1}`（responsive.css ~1042）、working 态 `.left-panel{order:1}`、`.side-reference{order:3}`。
- `#sceneCanvas` 用 `aspect-ratio:1/1; height:auto; max-height:72vh`（responsive.css ~1051），
  **由 JS `computeLayout()`（src/render.js）按 canvas 的 clientWidth/Height 实时定尺寸**。
- 我把 grid 改 flex 后，`order` 的语义 + canvas 的 aspect 尺寸在「flex 列 + overflow 滚动容器」里解析变了，
  canvas 拿到的高度异常 → 渲染塌陷。

**教训**：不要简单把 grid 换 flex。要么保留 grid 让它内部滚动，要么给 canvas 一个**显式高度预算**。

## 推荐方案（A，最小改动、先做）
让**内容区作为一个整体在屏内滚动**，顶栏固定。页面整体不滚。

逐屏：
1. **app-shell 锁定（≤860）**：照搬桌面那套
   `html,body{height:100%;overflow:hidden}` +
   `.app-shell{height:100dvh;min-height:0;display:flex;flex-direction:column;overflow:hidden}` +
   `.topbar{flex:0 0 auto}`。
   （首页已锁，注意别和现有 `.start-screen{height:calc(100dvh - 2*--shell-pad)}` 冲突——
   home 模式下 topbar 是隐藏的，见 layout.css ~13。）
2. **拼豆台**：`.bead-studio-grid{flex:1 1 auto;min-height:0;overflow-y:auto}`，**保持 `display:grid`不变**。
   - 验证 canvas 是否仍塌陷。若塌陷：给 `#sceneCanvas`（移动锁定态）一个明确高度，
     如 `height:min(72vh, 92vw)` 或包一层固定高度的 `.workbench`，避免它在滚动容器里被压扁。
   - choose 态（选图）和 working 态（摆放）分别验证——两态 DOM/order 不同。
   - 注意 working 态有 sticky 底部 CTA（`.mobile-selection-summary{position:sticky;bottom}`，仅 choose 态用）
     和 `检查作品` 主 CTA；确保它们在滚动容器里仍可达、不被裁。
3. **绘图台**：`.drawing-studio{flex:1;min-height:0;display:flex}` +
   `.drawing-studio-card{flex:1;min-height:0;display:flex;flex-direction:column}` +
   `.drawing-studio-card>.topbar{flex:0 0 auto}` +
   `.drawing-studio-grid{flex:1;min-height:0;overflow-y:auto}`（移动态已是 flex column，加 flex/min-height/overflow）。
   - 画布 `.drawing-canvas-wrap{aspect-ratio:1/1;max-height:56vh}` 已有，验证不塌陷。
4. **gallery / collection（卡片网格，低风险，可一并做）**：
   `.gallery-screen/.collection-screen{flex:1;min-height:0;display:flex}` +
   各自 `.*-studio-card{flex:1;min-height:0;display:flex;flex-direction:column}` +
   `card>main{flex:1;min-height:0;overflow-y:auto}`。

## 备选方案（B，原生分区，若 A 的滚动体验不够好再做）
拼豆台固定三段：顶栏（固定）/ 画布（固定高度预算，如 `min(60vh, 92vw)`）/ 调色盘+CTA（屏内滚动，CTA 贴底）。
工作量更大，但最「App 化」。仅当 A 落地后体验不满意再升级。

## 验证协议（每改一屏都要跑）
用 Chromium（playwright-core，已装）截图 + 量「整页溢出」：
```js
// 关键断言：整页不滚 → scrollHeight - innerHeight === 0
const overflow = await p.evaluate(()=>document.documentElement.scrollHeight - window.innerHeight);
```
- Chromium 路径：`~/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`
- 两个视口都测：**360×640（短机，最易塌/裁）** 和 **390×844**。`isMobile:true, hasTouch:true`。
- 每屏都肉眼看截图，确认：① 整页 overflow=0 ② canvas 是主元素、未塌陷 ③ 主 CTA 可见可达 ④ 调色盘能滚到底。
- 进入流程：清 localStorage → 点「拼豆台」→ 点「开始拼豆」→ Esc 关引导。绘图台：点「绘图台」。
- 改完跑 `npm run build`（**必须**，index.html 加载的是打包产物）+ `node scripts/session-regression.mjs`。

## 关键文件
- `src/styles/responsive.css`：`@media (max-width:860px)`（第 1 行起）加锁定；`@media (min-width:861px)`（~316）是抄写样板。
- `src/styles/layout.css`：`.app-shell`、home 模式隐藏 topbar 的规则（~13）。
- `src/render.js`：`computeLayout()`（~302）按 canvas rect 定板尺寸——理解 canvas 为何塌陷的关键。
- `index.html`：app-shell 子结构（~69 起）；拼豆台 topbar+grid 是平级直接子节点（~326/375）。

## 收尾
- 文档/提交信息用中文（项目约定）。提交信息结尾加
  `Co-Authored-By: Claude ...`。
- 别提交 `.superpowers/`、`preview-plans.html`（本地草稿）。
- 改完 build + 回归测试通过再提交；在 main 上直接提交（用户惯例）。
