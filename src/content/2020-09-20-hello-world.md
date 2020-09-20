---
templateKey: blog-post
id: hello-world
title: 個人ブログを開設しました
slug: /hello-world
date: 2020-09-20T02:30:00.125Z
headerImage: ""
description: ""
tags:
  - hello-world
  - gatsby
  - blog
  - react
---

初めまして。[ymmmtym](../about)と申します。
この度は個人ブログを開設しました。

エンジニアとして技術ブログを投稿していく予定です。

初投稿では、ブログを開設したきっかけを書いていきます。
よろしくお願いします。

---

## はじめての情報発信

---

情報発信として最初に投稿させて頂いたのはQiitaでした。

エンジニア駆け出しの頃に、分からないことをググってよくたどり着くのがQiitaで、
当時は何となく「こんな便利なサイトがあるんだ」と思っていたことを覚えています。

8割くらいQittaで問題解決できてたような気がします。
(大変お世話になっております)

始めの頃は情報収集として利用していましたが、**InputよりOutputが重要**と言うように、

エンジニアが情報発信することには、
執筆する私にも、みてもらう方々にもお互いにメリットがあると思います。

情報発信の重要性は、以下のページがよくまとまっています。

[エンジニアが情報発信をする重要性【絶対やるべき】 | Engineer Village](https://engineer-village.com/outgoing-information/)

元々、文章を書くのが上手ではない方ではなかったため、
何かを書くのに膨大な時間がかかるタイプでした。

しかしながら、Qiitaに投稿する内容はソースコードやコマンド実行結果などを貼り付けることが多く、
ライティング力のない私でも気軽に始めることができました。

投稿する内容は、自分にとっての備忘録やトラブルシューティングなど、
ピンポイントに欲しい情報だけを書くことが多かったです。

---

## 情報発信をするにつれて

---

最初にQiitaに投稿した頃は、

ターミナルのログを漁ったり、参考サイトなどを調べなおしたりと、

**実行すること**と**書き残すこと**が同時にできていなかったので、
投稿するまでに割と時間がかかってしまっていました。

その中で、記事を書いている中で気づいたことがあります。

- 考えたことではなく、**実践したこと**や**体験談**を書いていた

かなりざっくりとしてますが、要は**悩まずに書くことが出来る**と感じるようになります。

何かエラーが起きた時は人に伝わるように(markdown形式で)メモを残すことにしました。
仮に人に伝えなくても、そのメモを書くこと自体が知識として定着すると考えています。
(自分の中でのOutputです)

そのおかげで、記事を書く速さが少し上がったかなと思います。
(実際に速くなったかどうかは分かりませんが、気持ち的な余裕があったのは確かです)

「それならブログ書けばいいんじゃないか？」と、この頃から思い始めます。

---

## なぜ？ブログを書くのか

---

私の個人的に、

- ブログ: 人に伝えることに特化した記事を書く
- Qiita: 技術に特化した記事を書く

というイメージがありました。
(もちろんその逆の記事もあったり、使い方によっては大差ないと思いますが)

[良い記事を書くためのガイドライン - Qiita:Support](https://help.qiita.com/ja/articles/qiita-article-guideline)

私自身、Qiitaにはピンポイントな技術情報を書いてきたのですが、
「1から○○をして○○を作る」といったように、
少し技術的な内容から離れてしまう記事もありました。

また、私はQiitaから情報収集することが多いので、投稿しても同じようなものが既に投稿されていることがありました。
もし他の人の投稿内容が古かったり、誤りがあったときには、
編集リクエストなどを活用して記事のクオリティを高めていくやり方がベストかと思います。

結果として、以下のような分け方で投稿しようと思いました。

- ブログ: チュートリアルや知識中心(基本的で分かりやすく技術情報を伝える)
- Qiita: エラーやトラブルシューティング(ニッチな技術情報を伝える)

---

## なぜ？個人ブログなのか

---

簡単にブログを開設出来るサービスは多くあります。
エンジニア向けの有名どころだと、Mediumやはてなブログが挙げられます。

[エンジニアブログや会社ブログはどこで書くのがいいのか(note,WordPress,はてなブログ) | umi.design](https://umi.design/blog/engineer-blog-dokode/)

開設前は、どのサービスを使ってブログを作るか考えてましたが、結局は個人ブログにすることに決めました。

主な理由としては以下です。

- 好みのデザインを使用することができる
- 独自ドメインが使用できる
- 個人ブログ開設することでフロントエンドの知識がつく

ブログによっては上記を実現できるものがあるかもしれませんが、
深くは調べておりません。
(はてなブログは有料で独自ドメインを使用できることは知っている)

また、Github PagesやNetlify、Firebaseなどの無料ホスティングサービスの使用経験があったので、
これらのサービスを利用してブログ開設することで、さらに知見を得られればなと思いました。

ブログ開設をすること自体を技術スタックとしたかった点が大きかったです。

---

## なぜ？CMSを利用しなかったのか

---

新しいサイトを作りにおいて、Word Pressという選択肢は少しレガシーな感じがありました。

[WordPressからHugoへ：どうしていま静的サイトなのか](https://mehori.com/blog/2020/04/move-to-hugo-1/)

CMSはWebサイトの管理者ページにログインして記事を書くので、
脆弱性など考慮すると中途半端な知識で安全に運用するには難しそうだと思った次第です。

前の章で述べた「個人でデザインとカスタムしたい」と言うことと、
慣れている**Markdown**言語で記事を書きたいと思いがありました。

さらには、記事はソースコードとして管理したかったので、
Githubに記事をPushしたら公開されるといったCI/CDでのモダンな運営をしたいと思ってました。

以上の理由から、CMSとは相性が悪そうだなと思いましたので、
静的サイトジェネレーターを使用してブログを運営することに決めました。

---

## なぜ？Gatsbyを選んだ

---

一概に静的サイトジェネレーターと言っても様々な選択肢があったので、
正直どれを使用して良いか分かりませんでした。

以下のページで静的サイトジェネレーターの人気が確認できます。

[StaticGen | Top Open Source Static Site Generators](https://www.staticgen.com/)

何となく有名どころを使用したいと思ってましたので、以下の3つのどれかを使用することに絞りました。

- Hugo(Go)
- Gatsby(React)
- Next.js(React)

HugoではGo言語が使用されてますが、Go言語に関する知見が全くなかったので、
学習コストなどを考慮すると、GatsbyかNext.jsを使用することにしました。
(Hugoはまたの機会に使ってみたいです)

Javascriptを使うなら、Next.jsよりGatsbyの方が新しくて良さそうだなと思い、
色々と下調べしていたときに目についたのがこちらの2記事です。

[Reactベース静的サイトジェネレータGatsbyの真の力をお見せします - Qiita](https://qiita.com/uehaj/items/1b7f0a86596353587466)
[Gatsby で gatsby-theme-blog を使うときの tips | gotohayato.com](https://gotohayato.com/content/502/)

Gatsbyには機能的にNext.jsより優れてそうで、尚且つBlog専用のテンプレートが用意されており、
ターミナルで少しのコマンドを叩くだけですぐに使用できることを知りました。

[Quick Start | Gatsby](https://www.gatsbyjs.com/docs/quick-start/)

上記に沿ってローカル環境に開発用のブログを構築することができ、
そのままGatsbyを使用してブログを書くことに決めました。

---

## さいごに

---

ここまで読んで頂きまして誠にありがとうございます。

私はインフラエンジニアですが、フロントエンドやバックエンド技術にも興味があります。
特にDevOps技術にはとても興味があります。

幅広い技術の範囲で、読者様のためになる情報を発信していきますので、
どうぞよろしくお願いします。