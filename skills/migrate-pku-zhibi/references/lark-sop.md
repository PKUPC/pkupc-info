> 来源：https://x76lngd8nj.feishu.cn/wiki/FmnzwgVvViTXxGkH1WEcAlDWnAd
> 文档 ID：TXXOdXIMboXL0cxmRcFclYJdnNf；修订版本：1095；读取日期：2026-10-08。
> 全文文字导出；仅将开头分工表和人员引用转为可读 Markdown，保留其余正文、代码和链接。原 SOP 的笔误及旧组件说明未改写，当前适配见 editorial.md。

# 执笔成谜系列

| 分工 | 人员 / 标记 |
| --- | --- |
| 产品 | Winfrid |
| 研发 | JCarlson |
| 内容 | 怎苏昂 |
| 文章标签 | zhibi |

## 适用文章

标题内含有【执笔成谜】或类似名称的文章。

原则上，不搬运没有发布解析的题目。

需要注意的是，部分带有【谜协严选】、PKU Puzzle Cup 标签的文章也对纸笔谜题有所涉及，但是与本栏目无关，请注意区分。



## 文件命名

位于 zhibi 文件夹下，建立一组新的 `zhibi-000.mdx` **文件**和 `zhibi-000.assets` **文件夹**，其中 000 替换成对应谜色的序号标签。

如果开发环境已经配好，可以使用一键生成指令：

```Bash
pnpm run gen-template zhibi <序号>

# 例子
pnpm run gen-template zhibi 19  # 产物名为 zhibi-019
```

脚本会创建一组新的 `zhibi-000.mdx` **文件**和 `zhibi-000.assets` **文件夹**。

> 特殊套题文件名可以参考历史命名。



### 图片资源搬运

从需要搬运的微信文章（题目和解答两篇）中，下载需要的素材，包括题目本身、题目解答、解析/评价中出现的辅助图或者梗图，放在 assets 文件夹内。图片尽量**以 webp 格式**存储。



对于题目本身，命名方法为`zhibi-000.webp`。

对于题目规则给出的样例，命名方法为 `zhibi-000-rule.webp`。

对于题目解答，命名方法为`zhibi-000-sol.webp`。

> 对于《彼岸双生》系列等有多个答案的谜题，命名的 sol 改成 solA, solB 等以区分。

对于与题目解析相关的图片，命名方法为`zhibi-000-sol-1.webp`，按先后顺序从 1 向后编号。

> 类似的，《彼岸双生》系列这种一题双规则的情况，sol 替换为 solA, solB 以区分。

对于其他图片，命名方法为`zhibi-000-meme-1.webp`，按先后顺序从 1 向后编号。



## 文章元数据

文章元数据是指 mdx 文件最上方的，被两行 --- 包裹起来的 yaml 格式数据，用于标注作者、文章发布时间，以及添加标签等作用。

元数据请参考以下格式填写：

```yaml
---
title: 【执笔成谜】<题目名称>
slug: zhibi-000 <填写编号>
authors: [hexi] <填写作者>
tags: [zhibi]
date: 2025-02-14T20:00 <填写发布时间，北京时间>
---

```

关于作者：请参考`content/wechat-official-account/authors.yml`文件，每一名作者都按照该格式填写：

```yaml
winfrid: <作者标签名>
  name: Winfrid <作者名>
  title: P&KU 系列总策划 <作者头衔>
  image_url: https://q1.qlogo.cn/g?b=qq&nk=<QQ号>&s=100
```

## 文章正文

在填写完元数据后，mdx 文件里的其他内容均是文章正文内容。

通常情况下，执笔成谜系列包括谜题图片以及相关的规则。在 truncate 前仅放置图片和主题规则。以彼岸双生第四期为例，正文 truncate 前放置以下内容：

```Markdown
何夕老师为大家带来了一套由其编写的纸笔谜题，主题为 Hidden Twins（彼岸双生）。**在这一套谜题中，每道题目在原规则盘面能得到一个解的同时，在另一个规则下能得到另一个解，你需要在解出原题之后，确定被隐藏的规则，并且以隐藏的规则再解一遍。**

今天是该系列的第四题，原规则盘面的纸笔类型为 **LITS**。

![](./zhibi-012.assets/zhibi-012.webp)

{/* truncate */}
```

纸笔规则、提交格式、网页做题链接等请放在 truncate 后面。



## truncate

在历史文章里可以看到的 `{/* truncate */}` 的作用是将文章截断，使得在文章列表页只显示截断前的部分。也就是说，这个 truncate 前的部分将会在文章列表页作为文章的一个概括显示。

对于执笔系列，通常来说这个截断安放在题目图片之后。



## 规则介绍

对于纸笔规则，使用**二级标题**，名为`<谜题名字> 规则`的格式。基本上照搬原文即可。

对于纯英文的规则名，直接填写名字即可，如果有中文的规则名，则先英文再中文，比如

```Markdown
## Shikaku 数方规则
```

对于需要有序列表、无序列表的情况，请参考 Markdown 对于这两种内容的格式。

由于表示规则样例的图片较小，不需要缩放，但需要居中。居中时建议使用`<center />`标签。



## **做题链接**

微信文章的“阅读原文”功能能够跳转到外部网站，执笔系列中经常使用该功能跳转到做题网站（比如 penpa）。按照以下格式，讲链接替换掉后面的部分：

```Markdown
你可以[在 penpa 网站上进行尝试](https://.....)

```



## 答案验证器

truncate 后面摆放答案验证器，这是一个模仿 P&KU 系列的简易答案验证。

对于固定答案，其用法如下：

```TypeScript
<AnswerCheck
    answer={'pku'}
    mitiType="zhibi"  // 请注意这里填写mitiType
    instructions={'请填写北大简称'}
    exampleAnswer={'111X11'}
/>
```



将 pku 替换为答案即可。答案仅支持中文、英文字母和数字，不支持符号。英文字母对大小写不敏感，小写将会被转成大写。

在 instructions 里，填写解完纸笔后用于判断答案的方法。

在 exampleAnswer 里，填写提供的答案样例格式。

另外，请在谜题类型里填写 `mitiType="zhibi"`，这样回答正确的默认回复会变成“回答正确！恭喜你完成了这道纸笔谜题！”，而不会显示仅用于验证的纸笔答案。



对于双解或其他多解题，请参考这个格式：

```TypeScript
<AnswerCheck
    answer={{
        '1111111111': {
            type: 'CORRECT',
            message: '恭喜你解出了答案1！',
        },
        '2222222222': {
            type: 'CORRECT',
            message: '恭喜你解出了答案2！',
        }
    }}
    instructions={'输入xxxx判断答案'}
/>
```

其中 answer 里的每一项对应一个答案，请**不**要更改 `type: 'CORRECT'`。



输入答案的反馈（message）请参考公众号回复得到的反馈进行填写。



## 解答

解答按惯例使用 <Solutions /> 组件包裹起来，在 author 参数填入解析作者。

```Markdown
## 解答

<Solution author={'Orthos'}>
    填写解析内容
</Solution>
```

### 步骤解析

涉及到步骤解析的情况，使用三级标题步骤解析。

```Markdown
### 步骤解析
```

最外层使用 Details-Summary 语法，标题统一为【**查看步骤解析**】。

内层目前统一使用 Ant Design 提供的走马灯 *Carousel* 组件。

使用 `<Carousel arrows />`，然后每一步使用自定义容器 `<CarouselInner />` 包裹起来，请务必使用该容器，否则会出现一些样式上的问题。

每个容器相当于一张“幻灯片”，可以填写文字和图片。尽量保证**每张幻灯片的高度近似**，否则样式会崩，因为这个幻灯片组件默认使用最高的一张幻灯片的高度作为整个高度。



特别注意的是，在自定义组件 `<CarouselInner>`内部是不方便直接写 markdown 的，如果有任何字体上的需要，请使用 Tailwind 语法，图片请使用如下例所示的 require 语法。

```TypeScript
<details>
    <summary>查看步骤解析</summary>

    <Carousel arrows infinite={false}>
        <CarouselInner>
            首先最简单的道理是，如果有两个连续的黑点，那么肯定是 1-2-4 序列（方向不定），以及 5 是不能处于黑点两侧。
            同时整个盘面对对角线对称，因此推理也是对称的。
            首先观察第一行第一列，均只相差两个白点，放置完之后思考可能的序列，只有 3-6-5-4-2-1 一种。而后我们可以通过黑点信息得到下图。

            <div className="lg:w-2/3">
                <img src={require('./zhibi-002.assets/zhibi-002-sol-1.webp').default} />
            </div>
        </CarouselInner>
        <CarouselInner>
            而后由于第二行 6 和 3 之间是两倍关系，如果第二行第二列是 3，那么它和上面以及左边的 6 一定有黑点标记（全标）。
            但是没有，因此第二行第二列是 5。

            <div className="lg:w-2/3">
                <img src={require('./zhibi-002.assets/zhibi-002-sol-2.webp').default} />
            </div>
        </CarouselInner>
    </Carousel>
</details>
```
