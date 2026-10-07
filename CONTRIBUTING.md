# 开发与贡献

## 环境与命令

使用 `.node-version` 指定的 Node.js 24，以及 `package.json` 固定的 pnpm 版本。
可用现有版本管理器切换 Node，再用 Corepack 或 pnpm 官方安装方式安装对应 pnpm。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
GITHUB_PAGE_MODE=true pnpm build
pnpm serve
```

开发服务器默认 `http://localhost:3000`。静态构建输出到 `build/`。
`pnpm check` 检查 lint 和类型；`pnpm verify` 在此基础上构建默认根路径网站。
CI 使用 `GITHUB_PAGE_MODE=true` 检查 GitHub Pages 子路径，所以改路由或资源时两种构建都需要验证。
当前没有独立的单元测试套件；交互行为需通过浏览器验证。

仅格式化修改的文件，例如 `pnpm exec prettier --write src/components/CustomImage.tsx`。
`pnpm format` 会格式化整个仓库，通常不应使用。

## 内容编辑

文件名、图片目录及 Markdown/MDX 约定见 README。保持已有 slug、作者、日期、标签和内容授权信息。
活动资料在 `docs/archive/`，公众号文章在 `content/wechat-official-account/`。

生成新文章骨架：

```sh
pnpm gen-template mise 38
pnpm gen-template zhibi 25
```

上述命令分别使用 `mise-000.mdx`、`zhibi-000.mdx`；先确认目标文件不存在，脚本目前会覆盖同名文章。
生成后填写日期、题目、答案、作者和图片，再检查实际页面。不要以生成成功作为内容已完成的依据。

## 配置与发布

- `GITHUB_PAGE_MODE=true` 将 `baseUrl` 从 `/` 改为 `/pkupc-info/`。
- `BEI_AN_MODE=true` 在页脚展示备案信息。
- 配置读取 `.env`、`.env.local`；这些站点模式无需凭据，普通开发不需要环境文件。
- PR 到 `main`：安装锁定依赖、lint、类型检查、Pages 路径构建。
- 推送 `main`：执行同样的代码检查与构建，然后上传并部署到 GitHub Pages。
- Node 从 `.node-version` 读取；pnpm/action-setup 从 `packageManager` 读取版本。
- 默认构建域名为 `https://info.pkupuzzle.art/`；仓库现有工作流只描述 GitHub Pages 发布，不据此假设其他托管方式。

## 依赖迁移说明

React / React DOM / 对应类型包使用 19，Ant Design 使用 6，Tailwind 使用 4。
Tailwind 配置已迁入 `src/css/custom.css`，PostCSS 插件为 `@tailwindcss/postcss`。
不启用 Preflight，并保留旧有断点、强调色和 utility 的层叠优先级，避免改变资料页面。
Tailwind 4 对浏览器有新的最低要求：Safari 16.4、Chrome 111、Firefox 128。
详见 [Tailwind 升级说明](https://tailwindcss.com/docs/upgrade-guide)。

ESLint 使用 flat config 与最新版 ESLint 10；`eslint-plugin-react` 和 Docusaurus lint 插件通过
官方 `@eslint/compat` 适配。上游 peer 版本范围仍滞后，安装可能提示 peer warning；
不要通过全局关闭 peer 检查来掩盖它。更新这些插件时重新验证，并在原生支持后移除适配层。
TypeScript 使用 typescript-eslint 当前支持的 6.0 系列，暂不升级其尚不支持的 7；
`strict: false` 显式保留升级前的检查模式，`ignoreDeprecations` 用于 Docusaurus 的 `baseUrl` 配置。

新版 Docusaurus 的阅读时间改用 `Intl.Segmenter`，中文文章的预计阅读分钟数可能变化，正文不变。
图片预览转换目前仅配置于 `docs`，公众号文章使用 Docusaurus 默认图片；轮播内的原生 `<img>` 不自动提供放大预览。

## Agent 接入与交接

任何模型和编辑器都可以通过读取根目录 `AGENTS.md` 使用同一套工作约定。
不自动读取的工具，可在任务提示中写：

> 先阅读根目录 AGENTS.md、README.md 和 CONTRIBUTING.md，遵循其中的开发与验证流程，再完成以下任务：……

交接时提供需求、范围、分支、改动、验证命令与结果、截图、阻塞项。不要依赖上一模型的隐藏历史或专属工具。
依赖升级前后应留存同视口的首页、资料页与交互谜题截图；视觉回归要修复或明确记录。

## PR 说明

描述问题、最终行为和验证证据。代码使用 MIT；文档内容使用 CC BY-NC 4.0（公众号文章同属文档内容）。
提交或发布前应获得维护者授权，尤其注意 main 的自动部署。
