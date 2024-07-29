# P&KU 资料站

这是基于 [Docusaurus](https://docusaurus.io/) 构建的 Puzzle and Key Universe (P&KU) 系列活动的资料站。

## 如何贡献？

如果您具有一定的代码开发和 GitHub 使用基础，可以直接提 Pull Request。如果你不会操作但也想贡献内容，也可以直接联系我们提供原始内容，
由我们来更新，内容格式最好是 Markdown。

## 开发

### 安装依赖

我们使用 `pnpm` 管理依赖，`pnpm-lock.yaml` 文件也一并在项目中提供了。

```
$ pnpm install
```

### 本地开发

```
$ pnpm run start
```

这个命令会启动一个本地的开发服务器并且在浏览器中打开。
绝大多数文件更新都可以实时反映在页面上。

### 构建

```
$ pnpm run build
```

这个命令会构建出静态网站，默认输出到 `build` 目录。

## 开源协议

代码部分（`src` 文件夹下）使用 [MIT 协议](./LICENSE)。
文档部分（`docs` 和 `blog` 文件夹下）使用 [CC BY-NC 4.0 协议](https://creativecommons.org/licenses/by-nc/4.0/)。