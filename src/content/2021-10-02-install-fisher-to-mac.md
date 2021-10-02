---
date: 2021-10-02T22:51:19+09:00
description: ""
headerImage: https://fishshell.com/assets/img/Terminal_Logo2_CRT_Flat.png
id: 2021/10/02/01
slug: /2021/10/02/01
tags:
- "fish"
templateKey: blog-post
title: Mac に Fisher をインストールする
---

[jorgebucaran/fisher: A plugin manager for Fish.](https://github.com/jorgebucaran/fisher)

Fisher とは、fish shell のプラグインです。

同様のプラグインに oh-my-fish がありますが、fisherman の方が後発であり oh-my-fish のプラグインもインストールできるためこちらを使います。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Fisher インストール](#fisher-%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
- [プラグインのインストール](#%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
  - [インストールされたプラグインの確認](#%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%95%E3%82%8C%E3%81%9F%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E7%A2%BA%E8%AA%8D)
  - [プラグインのアンインストール](#%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%AE%E3%82%A2%E3%83%B3%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Fisher インストール

ワンライナーを実行するだけでインストールが完了します。

```fish
$ curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
fisher install version 4.3.0
Fetching https://codeload.github.com/jorgebucaran/fisher/tar.gz/HEAD
Installing jorgebucaran/fisher
           /Users/yukihisa/.config/fish/functions/fisher.fish
           /Users/yukihisa/.config/fish/completions/fisher.fish
Installed 1 plugin/s
```

## プラグインのインストール

[こちら](https://github.com/jorgebucaran/awsm.fish)からプラグインを探すことができるので、好みのプラグインを見つけてインストールしてみると良さそうです。

以下は z というプラグインをインストールしたログになります。

```fish
$ fisher install jethrokuan/z

fisher install version 4.3.0
Fetching https://codeload.github.com/jethrokuan/z/tar.gz/HEAD
Installing jethrokuan/z
           /Users/yukihisa/.config/fish/functions/__z.fish
           /Users/yukihisa/.config/fish/functions/__z_add.fish
           /Users/yukihisa/.config/fish/functions/__z_clean.fish
           /Users/yukihisa/.config/fish/functions/__z_complete.fish
           /Users/yukihisa/.config/fish/conf.d/z.fish
Installed 1 plugin/s
```

### インストールされたプラグインの確認

```fish
$ fisher list
jorgebucaran/fisher
jethrokuan/z
```

### プラグインのアンインストール

```fish
$ fisher remove jethrokuan/z
fisher remove version 4.3.0
To completely erase z's data, remove:
/Users/yukihisa/.local/share/z/data
Removing jethrokuan/z
         /Users/yukihisa/.config/fish/functions/__z.fish
         /Users/yukihisa/.config/fish/functions/__z_add.fish
         /Users/yukihisa/.config/fish/functions/__z_clean.fish
         /Users/yukihisa/.config/fish/functions/__z_complete.fish
         /Users/yukihisa/.config/fish/conf.d/z.fish
Removed 1 plugin/s
```

Fisher 自体を含むすべてのプラグインをアンインストールする場合は以下を実行します。

```fish
fisher list | fisher remove
```
