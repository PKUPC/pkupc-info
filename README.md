# P&KU 资料站

这是基于 [Docusaurus](https://docusaurus.io/) 构建的 Puzzle and Key Universe (P&KU) 系列活动的资料站。

## 如何贡献？

如果您具有一定的代码开发和 GitHub 使用基础，可以直接提 Pull Request。如果你不会操作但也想贡献内容，也可以直接联系我们提供原始内容，
由我们来更新，内容格式最好是 Markdown。

### 目前的 TODO

将原先部署在 [GitBook](https://puzzle-and-key-universe.gitbook.io/) 上的内容先转移到这里。
GitBook 上的内容已经同步到了 [GitHub 仓库](https://github.com/Winfridx/PnKU-archive/) 中。
需要做的事情：

1. 将每个 mdx 文件用到的图片放到同路径下的 `{filename}.assets` 文件夹下。图片最好压成 `webp` 格式，如果原始图片大小并不大（小于
   500KB）也可以先不压。
   但是较大的图片暂时不要上传（先注释掉也可以）。
2. 整理文件排版，原始文件中存在大量的结尾反斜杠，以及有很多中英混排上的问题（主要是某人总是不加空格）。

目前已经先更新了一些文本但是没有放图片，也可以从原始位置找到图片后帮忙压成 `webp` 格式后放到对应的位置。

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