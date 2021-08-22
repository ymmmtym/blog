---
templateKey: blog-post
id: 2020/09/25/01
title: Gatsbyでブログを開設する③ 【デプロイ編】
slug: /2020/09/25/01
date: 2020-09-25T11:30:03.125Z
headerImage: "https://imgur.com/1iUZtX8.jpg"
description: ""
tags:
  - gatsby
  - blog
  - react
  - netlify
  - github
---

こんにちは。yumenomatayumeです。

静的サイトジェネレーターのGatsbyJSを使用してブログを開設しましたので、  
それまでの過程を3回に分けて書いていきたいと思います。

実際のソースコードは[こちら](https://github.com/ymmmtym/blog)になります。

- [Gatsbyでブログを開設する① 【インストール編】](/2020/09/20/01)
- [Gatsbyでブログを開設する② 【デザイン編】](/2020/09/22/01)
- Gatsbyでブログを開設する③ 【デプロイ編】 <- 本記事

前回では、**gatsby-starter-calpa-blog**をベースとしたブログを、  
デフォルトの状態から自分向けのデザインに変更しました。

今回は、Netlifyを使用してWebサイトをデプロイしたいと思います。

---

## 目次

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前回のおさらい](#%E5%89%8D%E5%9B%9E%E3%81%AE%E3%81%8A%E3%81%95%E3%82%89%E3%81%84)
- [投稿する記事の作成](#%E6%8A%95%E7%A8%BF%E3%81%99%E3%82%8B%E8%A8%98%E4%BA%8B%E3%81%AE%E4%BD%9C%E6%88%90)
- [独自ドメインの取得](#%E7%8B%AC%E8%87%AA%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%AE%E5%8F%96%E5%BE%97)
- [GitHubにソースコードをPush](#github%E3%81%AB%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92push)
  - [Gitalkで使用するtokenを修正する](#gitalk%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8Btoken%E3%82%92%E4%BF%AE%E6%AD%A3%E3%81%99%E3%82%8B)
- [Netlifyでサイトをデプロイする](#netlify%E3%81%A7%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4%E3%81%99%E3%82%8B)
  - [環境変数の設定](#%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%81%AE%E8%A8%AD%E5%AE%9A)
  - [独自ドメインの設定](#%E7%8B%AC%E8%87%AA%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%AE%E8%A8%AD%E5%AE%9A)
- [さいごに](#%E3%81%95%E3%81%84%E3%81%94%E3%81%AB)
  - [おまけ](#%E3%81%8A%E3%81%BE%E3%81%91)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 前回のおさらい

---

ローカル環境で自分向けのブログに修正するところまで完了しました。  
表示画面は以下になっています。

![gatsby-starter-calpa-blog-fixed](https://i.imgur.com/1iUZtX8.jpg)

このサイト用の独自ドメインを取得し、こちらのサイトを**Netlify**でデプロイまでしたいと思います。

## 投稿する記事の作成

---

ブログを開設すると同時に、元々投稿しておく記事を作成します。

使用した記事は以下の2つです。

- [個人ブログを開設しました](/hello-world)
- [このサイトについて](/about)

markdownファイル名は任意でいいですが、あとで整理しやすいように、  
`YYYY-MM-DD-<ブログのdescription>.md`のような命名規則にしています。

また指定の**front-matter**（ファイルの一番上に書くやつ）を使用する必要があり、  
本記事だと以下を使用しております。

```yml
---
templateKey: blog-post
id: 2020/09/25/01
title: Gatsbyでブログを開設する③ 【デプロイ編】
slug: /2020/09/25/01
date: 2020-09-25T10:40:03.125Z
headerImage: "https://imgur.com/1iUZtX8.jpg"
description: ""
tags:
  - gatsby
  - blog
  - react
  - netlify
  - github
---
```

記事のタイトル (title) や URL(slug)、投稿日 (date) などはここで指定します。  
これを最上部に書いて、あとは通常通りmarkdown形式で記事を書いていきます。

記事の執筆が完了したら、ファイルを`src/content`ディレクトリに配置します。  
するとサーバ側で処理されて記事一覧に表示されます。

ちなみにデフォルトで3つの記事がありますが、これらは削除しています。

---

## 独自ドメインの取得

---

私の場合は、`お名前.com`を使用してドメインを取得しました。  
すでにポートフォリオで使用している`ymmmtym.com`という名前のドメインを取得してましたので、  
`blog.ymmmtym.com`という名前のドメインを新たに取得しました。（追加料金などは不要）

`お名前.com`の詳しい使い方は以下のサイトが参考になりました。

[【ブログ初心者向け】お名前.comで独自ドメインを取得する方法をステップごとに解説](https://tekito-style.me/columns/domain-onamae)

---

## GitHubにソースコードをPush

---

記事を追加したら、GitHubにソースコードをPushします。

この時の注意点として、Publicリポジトリを使用する場合は、  
secret な情報をソースコードから消しておくことをオススメします。  
(Privateリポジトリを使用する場合は、読み飛ばして大丈夫です。)

### Gitalkで使用するtokenを修正する

このブログのsecretな情報は、Gitalkで使用するGitHubのtokenです。  
他のサイトではtokenがベタ書きされているものもありますが、  
GitHubの公式では、公開しない方がいいとのことなので修正します。

関連のGitHub Issue: [console.log(gitalk); 就可以看到 clientID 和 clientSecret，会有安全问题吗？ · Issue #285 · gitalk/gitalk](https://github.com/gitalk/gitalk/issues/285)

ということで、tokenはコード上に書かず、環境変数から読み取れるように修正します。

まず、`data/template/config.json`に記載されている以下の 2 行を削除します。

```json
    "clientID": "SECRET", // 実際のSECRETにはデフォルトの値が入っています
    "clientSecret": "SECRET", // 実際のSECRETにはデフォルトの値が入っています
```

実際に修正したもの: [blog/config.json](https://github.com/ymmmtym/blog/blob/master/data/template/config.json)

次に、`src/templates/blog-post.js`に以下 2 行を追加します。

```javascript
    gitalk.clientID = process.env.GATSBY_GITHUB_OAUTH_CLIENT_ID;
    gitalk.clientSecret = process.env.GATSBY_GITHUB_OAUTH_CLIENT_SECRET;
```

実際に修正したもの: [blog/blog-post.js](https://github.com/ymmmtym/blog/blob/master/src/templates/blog-post.js)

上記の修正が完了したら、以下の環境変数からtokenが読み込めるようになります。  

- `GATSBY_GITHUB_OAUTH_CLIENT_ID`
- `GATSBY_GITHUB_OAUTH_CLIENT_SECRET`

ちなみに、環境変数に`GATSBY_`プレフィックスを付けないとGatsby側で認識されません。  
(知らなくて結構ハマってしましました。。)

もしくは、
`.env`や`.env.development`（gatsby develop 時のみ有効）、
`.env.production`（gatsby build 時のみ有効）ファイルを作成して、  
その中に環境変数を記載する必要があります。

参考記事: [GatsbyJS + Netlifyで環境変数を利用するのに迷った話 - Qiita](https://qiita.com/xrxoxcxox/items/4e337b96fc9017b3771c)

コードの修正が完了したので、GitHubにPushします。

---

## Netlifyでサイトをデプロイする

---

Netlifyで**New site from Git**をクリックして、Pushしたリポジトリを選択してNetlifyに登録しましょう。

登録後は以下のような画面になっています。(こちらは事後のキャプチャなので、デプロイしたログなどが表示されています。)

![netlify-ymmmtym-blog-top](https://imgur.com/SQ2ZV49.jpg)

ここから、**環境変数の設定**と**独自ドメインの設定**をします。

### 環境変数の設定

**Site Settings > Build & deploy > Environment > Edit variables**の順に進んでいき、  
環境変数を設定します。

![netlify-edit-variables](https://imgur.com/iNj2sJv.jpg)

環境変数の設定はこれだけで完了です。  
デプロイしたとき読み込まれるようになります。

### 独自ドメインの設定

**Domain Settings > Add custom domain**の順に進んでいき、  
独自ドメインを入力して**Verify**をクリックします。

その後、ネームサーバの設定をするように言われたので、  
以下の4つを`お名前.com`から登録します。

![netlify-nameserver](https://imgur.com/N8M6Pu3.jpg)

ネームサーバの登録が完了しましたら、最後にSSL化します。  
HTTPSの箇所にある**Verify DNS configuration**をクリックします。

![netlify-verify-ssl](https://imgur.com/Bue56bw.jpg)

少し待って **Your site has HTTPS enabled** と表示されていれば無事にSSL化されています。

![netlify-apply-ssl](https://imgur.com/YMneg3U.jpg)

以上でNetlifyの設定がすべて完了しましたので、サイトをデプロイしてみます。

**Deploys > Trigger deploy > Deploy site**の順に進みビルドしましょう。

約2分くらいでデプロイが完了しました。  
<https://blog.ymmmtym.com>にアクセスすると、無事にブログが表示されました。

これ以降は、GitHubにPushするだけで自動でデプロイされます。

---

## さいごに

---

以上で個人ブログを開設することができました。  
GatsbyテンプレートのおかげでReact初心者の私でも簡単にブログを開設することができました。

また、Gatsbyテンプレートにはブログ以外にもLPだったりと高品質なものが多いので、  
機会があれば活用していきたいと思います。

### おまけ

ブログを開設して数日後に、Netlifyでデプロイしていたら以下のエラーが発生しました。

```console
1:52:23 AM: Installing NPM modules using Yarn version 1.22.4
1:52:23 AM: yarn install v1.22.4
1:52:24 AM: [1/4] Resolving packages...
1:52:25 AM: [2/4] Fetching packages...
1:52:36 AM: warning url-loader@1.1.2: Invalid bin field for "url-loader".
1:53:02 AM: error gatsby@2.24.54: The engine "node" is incompatible with this module. Expected version ">=10.13.0". Got "8.9.0"
```

> `Expected version ">=10.13.0". Got "8.9.0"`

現在のnodeのversionが`8.9.0`だけど、`10.13.0`以上を使用してくださいとのことなので、  
`.nvmrc`に記載されているversionを`v10.13.0`にしてエラー解消しました。
