---
date: 2021-09-07T17:14:39+09:00
description: ""
headerImage: https://imgur.com/GruKxmG.jpg
id: 2021/09/07/01
slug: /2021/09/07/01
tags:
- bash
- terminal
templateKey: blog-post
title: ターミナルでペーストしたら不要文字（0~,1~）が入ってしまった時の対処法
---

とあるホストに SSH してターミナルに文字をペーストすると、`0~` <文字> `1~` となってしまい、最初と最後に不要な文字が入ってしまいました。

使用していたターミナルは、「Windows Terminal」です。

```bash
$ 0~ls -l1~
bash: 0~ls: command not found
```

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [原因](#%E5%8E%9F%E5%9B%A0)
- [Reference（参考文献）](#reference%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 原因

StackExchange にて解決方法が記載されてました。

[Copy-Paste in xfce4-terminal adds 0~ and 1~ - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/196098/copy-paste-in-xfce4-terminal-adds-0-and-1)

ターミナルが、ブラケットペーストモードになっていることが原因でした。

以下のコマンドより、このモードをオフにできます。

```bash
printf "\e[?2004l"
```

## Reference（参考文献）

- [Copy-Paste in xfce4-terminal adds 0~ and 1~ - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/196098/copy-paste-in-xfce4-terminal-adds-0-and-1)
- [GNU Bashのbracketed pasteの設定 – matoken's meme](https://matoken.org/blog/2020/11/12/gnu-bash-bracketed-paste-settings/)
