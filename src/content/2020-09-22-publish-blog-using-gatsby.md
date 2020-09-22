---
templateKey: blog-post
id: 2020/09/22/01
title: Gatsbyでブログを開設する② 【デザイン編】
slug: /2020/09/22/01
date: 2020-09-22T10:40:03.125Z
headerImage: "https://imgur.com/1iUZtX8.jpg"
description: ""
tags:
  - gatsby
  - blog
  - react
---

こんにちは。ymmmtymです。

静的サイトジェネレーターのGatsbyJSを使用してブログを開設しましたので、  
それまでの過程を3回に分けて書いていきたいと思います。

実際のソースコードは[こちら](https://github.com/ymmmtym/blog)になります。

- [Gatsbyでブログを開設する① 【インストール編】](/2020/09/20/01)
- Gatsbyでブログを開設する② 【デザイン編】 <- 本記事
- Gatsbyでブログを開設する③ 【デプロイ編】

前回では、**gatsby-starter-calpa-blog**を使用して、  
デフォルトのブログをローカルにダウンロードしました。  
今回は、デフォルトの状態から自分向けのデザインに変更していきます。

---

## 目次

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前回のおさらい](#%E5%89%8D%E5%9B%9E%E3%81%AE%E3%81%8A%E3%81%95%E3%82%89%E3%81%84)
- [configの修正](#config%E3%81%AE%E4%BF%AE%E6%AD%A3)
- [componentsの修正](#components%E3%81%AE%E4%BF%AE%E6%AD%A3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 前回のおさらい

---

前回はローカル環境に開発用のサーバを起動させて、ブログが表示されるところまで完了しました。  
表示画面は以下になっていると思います。

![gatsby-starter-calpa-blog](https://imgur.com/RgF4cDu.jpg)

READMEをみながらローカル環境のソースコードの修正していきます。

## configの修正

---

**Get Started**には、Netlifyにデプロイする方法も記載されていますが、
今回はローカルで開発を行うので、[Configuration](https://github.com/calpa/gatsby-starter-calpa-blog#user-content-develop:~:text=browser-,Configuration)から始めます。
(Developは前回の内容で完了しています。)

`data/template/config.json`を修正していきます。

デフォルトのコードは[Github](https://github.com/calpa/gatsby-starter-calpa-blog/blob/master/data/template/config.json)を参考にしてください。

修正内容を1つ1つ説明していくと長くなりますので、
ざっくり変更点をまとめると以下のようになりました。

- 名前 (**calpa** -> **ymmmtym**)
- ブログURL
- email
- 画像やアイコン
- ナビゲーションバー
- Googleサーチコンソール ID(**google\_site\_verification**)
- Googleアナリティクス ID(**gaTrackId**)
- Googleタグマネージャ ID(**gaOptimizeId**)
- Gitalk ID

実際に変更したソースコードは[こちら](https://github.com/ymmmtym/blog/blob/master/data/template/config.json)です。

余談ですが、**imgur**と**gitalk**はブログを始める前までは知らなかったサービスなので、  
便利なものを知るきっかけとなって良かったと感じています。

この状態でローカル環境から確認すると以下の表示になりました。
![gatsby-starter-calpa-blog-edited](https://i.imgur.com/0hIHsXM.jpg)

ナビゲーションバーとサイドバーが変更されましたが、
デフォルトの状態になっている箇所も見受けられます。

`config.json`だけでなく、他のソースコードも修正してきます。

---

## componentsの修正

---

`src/components/`ディレクトリを確認すると、以下のようになっています。  
以下は全てディレクトリです。

```console
ymmmtym@macbook-pro ~/blog $ tree -L 1
.
├── Card
├── Content
├── ExternalLink
├── Footer
├── GithubCorner
├── Header
├── Image
├── JueJin
├── Layout
├── Navbar
├── Pagination
├── SEO
├── ShareBox
├── Sidebar
├── TableOfContent
├── Tag
└── Transition

17 directories, 0 files
```

この中のファイルを修正すれば、ブログのデザインを変更することができます。  
例えば`Header`ディレクトリの場合、以下の`index.js`と`index.scss`を修正します。

これらを修正したあとの表示は以下のようになりました。

![gatsby-starter-calpa-blog-fixed](https://i.imgur.com/1iUZtX8.jpg)

トップページのデザインは個人ブログとして運用するのには遜色ないレベルになりました。  
まだデフォルトのブログデザインに毛が生えた程度ですが、  
運用していくうちにデザインもアップデートしようと思います。

次回は、記事の新規投稿からデプロイまでを試します。  
よろしくお願いします。
