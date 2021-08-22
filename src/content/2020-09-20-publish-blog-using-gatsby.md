---
templateKey: blog-post
id: 2020/09/20/01
title: Gatsbyでブログを開設する① 【インストール編】
slug: /2020/09/20/01
date: 2020-09-20T10:40:03.125Z
headerImage: "https://imgur.com/RgF4cDu.jpg"
description: ""
tags:
  - gatsby
  - blog
  - react
---

こんにちは。yumenomatayumeです。

静的サイトジェネレーターのGatsbyJSを使用してブログを開設しましたので、  
それまでの過程を3回に分けて書いていきたいと思います。

実際のソースコードは[こちら](https://github.com/ymmmtym/blog)になります。

- Gatsbyでブログを開設する① 【インストール編】 <- 本記事
- [Gatsbyでブログを開設する② 【デザイン編】](/2020/09/22/01)
- [Gatsbyでブログを開設する③ 【デプロイ編】](/2020/09/25/01)

---

## 目次

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [GatsbyJS公式サイトの Get Started を進める](#gatsbyjs%E5%85%AC%E5%BC%8F%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE-get-started-%E3%82%92%E9%80%B2%E3%82%81%E3%82%8B)
  - [gatsbyのインストール](#gatsby%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
  - [使用するテンプレート選択](#%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E9%81%B8%E6%8A%9E)
  - [ソースコードのダウンロード](#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%81%AE%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89)
  - [開発用サーバ起動](#%E9%96%8B%E7%99%BA%E7%94%A8%E3%82%B5%E3%83%BC%E3%83%90%E8%B5%B7%E5%8B%95)
  - [ブログのbuild](#%E3%83%96%E3%83%AD%E3%82%B0%E3%81%AEbuild)
- [さいごに](#%E3%81%95%E3%81%84%E3%81%94%E3%81%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## GatsbyJS公式サイトの Get Started を進める

---

[Get Started](https://www.gatsbyjs.com/docs/quick-start/)を見ながら進めてみます。

### gatsbyのインストール

npmでgatsbyをinstallします。

```bash
npm install -g gatsby-cli
```

これで`gatsby`コマンドが使用できるようになりました。

### 使用するテンプレート選択

Get Startedでは、`gatsby-starter-hello-world`と言うテンプレートが使用されています。  
デフォルトのページは以下のように**Hello world!**のテキストだけ記載されたシンプルなものになっています。

![gatsby-starter-hello-world](https://www.gatsbyjs.com/static/5fc26b098a6d1b3327812166ccde80a2/73c85/6de89bdd6911e106630e48eb69e56cd1.png)

※Demoサイトは[こちら](https://gatsby-starter-hello-world-demo.netlify.app/)です。

ブログのような自分好みのテンプレートを使用したいので、  
[gatsby-starter-calpa-blog](https://www.gatsbyjs.com/starters/calpa/gatsby-starter-calpa-blog)を使って、ブログを開設します。

![gatsby-starter-calpa-blog](https://www.gatsbyjs.com/static/f81598d7cbc8456a21b1e97b3dd2df46/73c85/59fb651f52f97cafc5e2fec63c05680d-1.png)

※ちなみに[Starter Library](https://www.gatsbyjs.com/starters/)から好きなTemplateを探すことができます。

### ソースコードのダウンロード

以下のコマンドを実行することで、`blog`ディレクトリ（名前は任意）にソースコードがダウンロードされます。

```bash
gatsby new blog https://github.com/calpa/gatsby-starter-calpa-blog
```

ちなみに、リポジトリ直下は以下のファイルで構成されています。

```console
ymmmtym@macbook-pro ~/blog $ tree -L 1
.
├── CODE_OF_CONDUCT.md
├── LICENSE
├── PULL_REQUEST_TEMPLATE.md
├── README-zh-Hans.md
├── README-zh-Hant.md
├── README.md
├── data
├── gatsby
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── netlify.toml
├── node_modules
├── package.json
├── public
├── src
├── static
├── stylelint.config.js
└── yarn.lock
```

### 開発用サーバ起動

デフォルトの状態で開発用のserverを立ち上げて、
webブラウザでアクセスしてみます。

```bash
cd blog

gatsby develop
```

<http://localhost:8000>にアクセスすると以下の画面が表示されています。

![gatsby-starter-calpa-blog](https://imgur.com/RgF4cDu.jpg)

### ブログのbuild

buildコマンドで静的ファイルの作成ができます。

```bash
gatsby build
```

`public`ディレクトリに静的ファイルが作成されるので、  
これをproduction環境のWebサーバにデプロイすればブログが公開できます。

また、serveコマンドでproduction環境としてbuildした内容をローカルで確認できます。

```bash
gatsby serve
```

この場合は、<http://localhost:9000>にアクセスしてWebサイトを確認できます。

---

## さいごに

---

Gatsbyの**gatsby-starter-calpa-blog**テンプレートを使用して、
ローカル環境でブログを立てることができました。

次回は、デフォルトの状態から自分向けのサイトになるように
デザインの部分を修正していきたいと思います。
