---
templateKey: blog-post
id: 2021/08/21/01
title: URL を自由なフォーマットでコピーできる Chrome 拡張機能「Simple URL Copy [F]」の使い方
slug: /2021/08/21/01
date: 2021-08-21T20:30:00.125Z
headerImage: "https://imgur.com/cEJGWaw.png"
description: ""
tags:
  - chrome
  - 作業効率化
---

[Simple URL Copy [F]](https://chrome.google.com/webstore/detail/simple-url-copy-f/kmkdfdfknlkjbmgdenhpeckpdafojnfo)

Simple URL Copy [F]とは、[Simple URL Copy](https://chrome.google.com/webstore/detail/simple-url-copy/cefkgjbbpagcilodnhboolbppdjlplip) という Chrome 拡張機能のフォーク（改良版）です。

ブラウザで開いているをページの URL を自由なフォーマットでクリップボードにコピーできます。

たとえば、**Markdown** や **Scrapbox**、**はてなブログ（埋め込み）**は、以下の形式で URL を記載します。

- Markdown:  `[ページのタイトル](URL)`
- Scrapbox: `[ページのタイトル URL]`
- はてなブログ（埋め込み）: `[URL:embed:cite]`

この拡張機能を使うことで、上記の形式をすぐにコピーできます。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [使い方](#%E4%BD%BF%E3%81%84%E6%96%B9)
- [設定方法](#%E8%A8%AD%E5%AE%9A%E6%96%B9%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 使い方

拡張機能のアイコンをクリックするか、 `Ctrl` + `Shift` + `C`（Mac のショートカットキー）を押下すると、設定した形式をコピーできます。
Windows のショートカットキーは、`Ctrl` + `Shift` + `K` です

デフォルトでは一番左上の形式はコピーされるので、他の形式をコピーしたいときは選択してクリックします。

![Simple URL Copy [F] Eye catch](https://imgur.com/cEJGWaw.png)

## 設定方法

拡張機能のアイコンをクリック（もしくはショートカットキー）して、「OPTION」をクリックします。

![Simple URL Copy [F]](https://imgur.com/MvjaRCJ.png)

すると設定画面が開きますので、ここで好きなように設定できます。

![Simple URL Copy [F] Option](https://imgur.com/QasPmsr.png)

- `{title}` : サイトのタイトルが入ります
- `{url}` : サイトの URL が入ります。
- 「有効」にチェックを入れると、コピーしたとき表示されます。
- 一番上のものが、デフォルトでコピーされる形式になります。

また、「EXPORT」をクリックすると、json 形式でクリップボードにコピーされます。私は以下の内容になっておりました。
（実際にはワンラインでコピーされますが、見やすいように改行しております。）

```json
[
  [
    "Scrapbox Style",
    "[{title} {url}]",
    true
  ],
  [
    "Markdown Style",
    "[{title}]({url})",
    true
  ],
  [
    "Hatena embed Style",
    "[{url}:embed:cite]",
    true
  ],
  [
    "gist-it",
    "<script src=\"https://gist-it.appspot.com/{url}\"></script>",
    true
  ],
  [
    "Simple (Title URL)",
    "{title} {url}",
    true
  ],
  [
    "Simple /w Breakline",
    "{title}\\n{url}",
    true
  ],
  [
    "Bold /w Breakline",
    "**{title}**\\n{url}",
    false
  ],
  [
    "URL Only",
    "{url}",
    false
  ],
  [
    "Title Only",
    "{title}",
    false
  ],
  [
    "Backlog Style",
    "[[{title}:{url}]]",
    false
  ],
  [
    "Textile Style",
    "\"{title}\":{url}",
    false
  ],
  [
    "Org mode Style",
    "[[{url}][{title}]]",
    false
  ]
]
```

これを「IMPORT」から読み込むことで設定することもできます。バックアップとして保存しておくといいです。
