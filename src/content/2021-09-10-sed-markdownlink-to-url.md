---
date: 2021-09-10T15:59:58+09:00
description: ""
headerImage: https://imgur.com/bu0KxCP.png
id: 2021/09/10/01
slug: /2021/09/10/01
tags:
- vscode
- markdown
- 正規表現
templateKey: blog-post
title: VSCode で Markdown 形式で記載されている内容を一括置換する
---

<!-- DOCTOC SKIP -->

記事を投稿するとき、参考文献をリストで記載しています。

```markdown

## Reference（参考文献）

- [リモートで消されたブランチが手元で残ってしまう件を解消する - Qiita](https://qiita.com/yuichielectric/items/84cd61915a1236f19221)
- [【Git】git push --delete origin {削除したいリモートブランチ名} →リモートブランチの削除 - Qiita](https://qiita.com/megu_ma/items/7533b4327dc110a9e2b8)

```

Zenn や Qiita にあげるときは、リンクカードで表示させたいので、
URL 形式に戻したい時があります。

---

![bu0KxCP.gif (743×448)](https://i.imgur.com/bu0KxCP.gif)

正規表現で置換します。

- 検索: `- \[.*\]\((.*)\)`
- 置換: `$1\n`

一括で置換するのはとても気持ちいいです。
