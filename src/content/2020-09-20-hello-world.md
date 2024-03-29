---
templateKey: blog-post
id: hello-world
title: 個人ブログを開設しました
slug: /hello-world
date: 2020-09-20T02:30:00.120Z
headerImage: "https://imgur.com/pIdoiWV.jpg"
description: ""
tags:
  - hello-world
  - gatsby
  - blog
  - react
  - ポエム
---

初めまして。[yumenomatayume](/about)と申します。  
エンジニアとして技術ブログを開設しました。

初投稿では、ブログを開設したきっかけを書いていきます。  
ブログを始めたいと思っている方にとって、いいきっかけになればと思います。

よろしくお願いします。

このブログ開設するためのメモは以下のscrapboxに保存しています。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://scrapbox.io/yumenomatayume/Gatsby%E3%81%A7%E5%80%8B%E4%BA%BA%E3%83%96%E3%83%AD%E3%82%B0%E3%82%92%E9%96%8B%E8%A8%AD%E3%81%99%E3%82%8B" data-iframely-url="//cdn.iframe.ly/JmpKOls?card=small"></a></div></div>

---

## 目次

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [はじめての情報発信](#%E3%81%AF%E3%81%98%E3%82%81%E3%81%A6%E3%81%AE%E6%83%85%E5%A0%B1%E7%99%BA%E4%BF%A1)
- [情報発信をするにつれて](#%E6%83%85%E5%A0%B1%E7%99%BA%E4%BF%A1%E3%82%92%E3%81%99%E3%82%8B%E3%81%AB%E3%81%A4%E3%82%8C%E3%81%A6)
- [なぜブログを書くのか](#%E3%81%AA%E3%81%9C%E3%83%96%E3%83%AD%E3%82%B0%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%AE%E3%81%8B)
- [なぜ個人ブログなのか](#%E3%81%AA%E3%81%9C%E5%80%8B%E4%BA%BA%E3%83%96%E3%83%AD%E3%82%B0%E3%81%AA%E3%81%AE%E3%81%8B)
- [なぜSSGを利用したか](#%E3%81%AA%E3%81%9Cssg%E3%82%92%E5%88%A9%E7%94%A8%E3%81%97%E3%81%9F%E3%81%8B)
- [なぜGatsbyを選んだのか](#%E3%81%AA%E3%81%9Cgatsby%E3%82%92%E9%81%B8%E3%82%93%E3%81%A0%E3%81%AE%E3%81%8B)
- [さいごに](#%E3%81%95%E3%81%84%E3%81%94%E3%81%AB)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## はじめての情報発信

---

情報発信として最初に投稿させて頂いたのはQiitaでした。

エンジニア駆け出しの頃に、分からないことをググって、よくたどり着いていたのがQiitaです。  
当時は何となく「こんな便利で技術情報があふれているサイトがあるんだ」と思っていたことを覚えています。

現在でも不明点があったとき、**Qittaで6~7割くらい問題解決**できているような気がします。  
(大変お世話になっております。)

始めの頃は情報収集として利用していましたが、慣れるにつれて情報発信を始めます。

**InputよりOutputが重要**と言うように、エンジニアにとって情報発信することには、  
執筆する私自身と、ご覧いただく方々にとってお互いメリットがあると思います。

情報発信の重要性は、以下のページがよくまとまっています。  

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://engineer-village.com/outgoing-information/" data-iframely-url="//cdn.iframe.ly/Jd2l9Yt"></a></div></div>

元々、文章を書くのが上手ではないため、何かを書くのに膨大な時間がかかるタイプでした。

しかしながら、Qiitaに投稿する内容はソースコードやコマンド実行結果などを貼り付けることが多く、  
ライティング力のない私でも気軽に始めることができました。

投稿する内容は、自分にとっての備忘録やトラブルシューティングなど、  
ピンポイントに欲しい情報だけを書くことが多かったです。

---

## 情報発信をするにつれて

---

はじめてQiitaに投稿した頃は、ターミナルのログを漁ったり、参考サイトなどを調べ直したりして、自己解決したら終了していました。
**実行すること**と**書き残すこと**が同時にできていなかったので、投稿するまでに割と時間がかかってしまっていました。

その中で、記事を書いている中で気づいたことがあります。

- 考えたことではなく、**実践したこと**や**体験談**を書いていた

かなりざっくりとしてますが、要は**悩まずに書くことができる**と感じるようになります。

何かエラーが起きた時は人に伝わるように（markdown形式で）メモを残すことにしました。  
仮に人に伝えなくても、そのメモを書くこと自体が知識として定着すると考えています。  
（自分の中でのOutputです）

そのおかげで、記事を書く速さが少し上がったかなと思います。  
（実際に速くなったかどうかは分かりませんが、気持ち的な余裕があったのは確かです）

「それならブログ書けばいいんじゃないか？」と、この頃から思い始めます。

---

## なぜブログを書くのか

---

私の個人的に、エンジニアが利用するブログの種類分けについては、以下のように考えています。

- ブログ: 人へ伝えることに特化した記事を書く
- Qiitaなど: 技術に特化した記事を書く

（もちろんその逆の記事もあったり、使い方によっては大差ないと思いますが、、）

また、Qiitaのガイドラインは以下のようになっています。  
[良い記事を書くためのガイドライン - Qiita:Support](https://help.qiita.com/ja/articles/qiita-article-guideline)

私自身、Qiitaにはニッチな技術情報を書いてきた（つもり）ですが、  
「1から○○をして○○を作る」といったように、  
サービス全体的な内容を記載する記事もありました。

また、私はQiitaから情報収集することが多いので、投稿しても同じようなものがすでに投稿されていることがありました。

もし他の人の投稿内容が古かったり、誤りがあったときには、  
編集リクエストなどを活用して記事のクオリティを高めていくやり方がベストかと思います。

繰り返しになりますが、結果として以下のような分け方で投稿しようと思いました。

- ブログ: チュートリアルや知識中心（基本的で分かりやすく技術情報を伝える）
- Qiita: エラーやトラブルシューティング（ニッチな技術情報を伝える）

今後はブログとQiitaで情報発信していこうと思います。

---

## なぜ個人ブログなのか

---

簡単にブログを開設できるサービスは多くあります。  
エンジニア向けの有名どころだと、Mediumやはてなブログが挙げられます。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="http://umi.design/blog/engineer-blog-dokode/" data-iframely-url="//cdn.iframe.ly/RQb8czL?card=small"></a></div></div>

開設前は、どのサービスを使ってブログを作るか考えてましたが、結局は個人ブログにすることを決めました。

主な理由としては以下です。

- 好みのデザインを使用することができる
- 独自ドメインが使用できる
- 個人ブログ開設することでフロントエンドの知識がつく

ブログによっては上記を実現できるものがあるかもしれませんが、深くは調べておりません。  
（はてなブログは有料で独自ドメインを使用できることは知っていました。）

また、GitHub PagesやNetlify、Firebase などの無料ホスティングサービスの使用経験があったので、  
これらのサービスを利用してブログ開設することで、さらに知識を増やせると思いました。

ブログ開設をすること自体を技術スタックとしたかった点が大きかったです。

---

## なぜSSGを利用したか

---

※Static Site Generator（SSG）とは静的サイトジェネレーターのことです。

新しいサイトを作りにおいて、WordPress という選択肢は少しレガシーな感じがありました。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://mehori.com/blog/2020/04/move-to-hugo-1/" data-iframely-url="//cdn.iframe.ly/rjkPhrR?card=small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

CMSはWebサイトの管理者ページにログインして記事を書くので、  
脆弱性など考慮すると中途半端な知識で安全に運用するには難しそうだと思った次第です。

前章で述べた、「個人でデザインとカスタムしたい」と言うことと、  
慣れている**Markdown**言語で記事を書きたいと思いがありました。

さらには、記事はソースコードとして管理したかったので、  
GitHub に記事を Push したら公開されるといった CI/CD でのモダンな運営をしたいと思ってました。

以上の理由から、CMSとは相性が悪そうだなと思いましたので、  
静的サイトジェネレーターを使用してブログを運営することに決めました。

---

## なぜGatsbyを選んだのか

---

一概に静的サイトジェネレーターと言ってもさまざまな選択肢があったので、  
正直どれを使用して良いか分かりませんでした。

以下のページで静的サイトジェネレーターの人気が確認できます。

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://jamstack.org/generators/" data-iframely-url="//cdn.iframe.ly/vBUkOLy?card=small"></a></div></div>

何となく有名どころを使用したいと思ってましたので、以下の3つのどれかを使用することに絞りました。

- Hugo(Go)
- Gatsby(React)
- Next.js(React)

HugoではGo言語が使用されてますが、Go言語に関する知識がまったくなかったので、  
学習コストなどを考慮すると、GatsbyかNext.jsを使用することにしました。  
（Hugoはまたの機会に使ってみたいです）

JavaScript を使うなら、Next.jsよりGatsbyの方が新しくて良さそうだなと思い、  
色々と下調べしていたとき、目についたのがこちらの2記事です。

- [Reactベース静的サイトジェネレータGatsbyの真の力をお見せします - Qiita](https://qiita.com/uehaj/items/1b7f0a86596353587466)
- [Gatsby で gatsby-theme-blog を使うときの tips | gotohayato.com](https://gotohayato.com/content/502/)

Gatsbyには機能的にNext.jsより優れてそうで、尚且つブログ専用のテンプレートが用意されており、  
ターミナルで少しのコマンドを叩くだけですぐに使用できることを知りました。

[Quick Start | Gatsby](https://www.gatsbyjs.com/docs/quick-start/)

上記に沿ってローカル環境に開発用のブログを構築することができ、
そのままGatsbyを使用してブログを書くことに決めました。

---

## さいごに

---

ここまで読んで頂きまして誠にありがとうございます。

私はインフラエンジニアですが、フロントエンドやバックエンド技術にも興味があります。  
とくにDevOps技術にはとても興味があり、クラウド技術も今後学んでいきたいです。

幅広い技術の範囲で、読者様のためになる情報を発信しますので、  
どうぞよろしくお願いします。
