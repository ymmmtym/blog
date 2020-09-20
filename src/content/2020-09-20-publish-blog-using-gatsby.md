---
templateKey: blog-post
id: 2020/09/20/01
title: Gatsbyで簡単なブログを作成する
slug: /2020/09/20/01
date: 2020-09-20T10:40:03.125Z
headerImage: "https://imgur.com/hzI3mxb.jpg"
description: ""
tags:
  - gatsby
  - blog
  - react
---

---

## 本家のGet Startedを参考に、自分好みのブログを開設する

---

[Get Started](https://www.gatsbyjs.com/docs/quick-start/)を見ながら進めてみる。

### gatsbyのインストール

npmでgatsbyをinstallする

```bash
npm install -g gatsby-cli
```

これで`gatsby`コマンドが使用できるようになる。

### ブログの作成

Get Startedと違うTemplateを使用したいので、
Blog用のTemplateで一番ベーシックな[gatsby-starter-blog](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog)を使って、新たにblogを作ってみる。

ちなみに[Starter Library](https://www.gatsbyjs.com/starters/)から好きなTemplateが選べる。

```bash
: gatsby new ${ブログ用リポジトリ名} ${使用するTemplateのURL} :

gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog
```

`blog`ディレクトリに、gatsby-starter-blogのデフォルト状態が作成される。

開発用のserverを立ち上げて、webブラウザでアクセスしてみる

```bash
cd blog

gatsby develop
```

<http://localhost:8000>にアクセスすると以下の画面が表示される。

![Imgur](https://imgur.com/hzI3mxb.jpg)

gatsby starter blog Templateが読み込まれていることが確認できる。
<https://gyazo.com/186d6382758784d15742acde1f1ac2d8>

buildコマンドで静的ファイルを作成する。

```bash
gatsby build
```

`public`ディレクトリに静的ファイルたちが作成される。production環境ではこれを使用する。

serveコマンドでproduction環境のWebサーバをローカルに立てることができる。

```bash
gatsby serve
```

`content/blog/<ブログ名>/index.md`を作成することで新規記事の投稿ができる。

<http://localhost:9000>にアクセスしてWebサイトを確認できる。
ここまでを通して、gatsbyのstarter blog Templateを使ってローカル環境でブログを立てることができた。

ローカルでTemplateを使用してBlogを開設することが出来たので、
次回は好みのTemplateを使用して実際に個人ブログを作成してみる。
