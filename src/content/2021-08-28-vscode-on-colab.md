---
templateKey: blog-post
id: 2021/08/28/01
title: Google Colab で VS Code を使用する
slug: /2021/08/28/01
date: 2021-08-28T16:55:00+09:00
headerImage: "https://imgur.com/LHNTBMn.png"
description: ""
tags:
  - vscode
  - jupyter
  - colab
  - google
---

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
- [ローカルの VS Code から Google Colab に SSH する方法](#%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E3%81%AE-vs-code-%E3%81%8B%E3%82%89-google-colab-%E3%81%AB-ssh-%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)
- [Google Colab で colabcode モジュールをインストールしてブラウザで使用する方法](#google-colab-%E3%81%A7-colabcode-%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%82%92%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%97%E3%81%A6%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%A7%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 使用方法

大きく分けて 2 通りの方法があります。

- ローカルの VS Code から Google Colab に SSH する
  - Google Colab に ssh-server をインストール
  - ngrok のアカウント作成とインストール
    - Google Colab はグローバル IP アドレスを持たないので、外部からアクセスできるようするため
- Google Colab で colabcode モジュールをインストールしてブラウザで使用する

## ローカルの VS Code から Google Colab に SSH する方法

以下の記事には、`ngrok` を使用して SSH するやり方が記載されています。

[Google ColabとVS Codeを用いた分析環境運用方法 〜kaggle Tipsを添えて〜 - ギークなエンジニアを目指す男](https://www.takapy.work/entry/2021/08/17/185047?utm_source=pocket_mylist)

## Google Colab で colabcode モジュールをインストールしてブラウザで使用する方法

以下の記事に詳しく載っておりました。

[ColabCodeを使って、Google Colabの上でVS Codeを使ってみよう](https://atmarkit.itmedia.co.jp/ait/articles/2108/27/news038.html)

新規でノートブックを作成して、以下のように記述します。

```notebook
!pip install colabcode
```

すると、実行出力の最後に [RESTART RUNTIME] が表示されるので、これをクリックします。

その後、以下のブロックを実行します。
引数には、VS Code にアクセスするためのパスワードと、Google Drive をマウントするための設定を入れます。

```notebook
from colabcode import ColabCode
ColabCode(password='password', mount_drive=True)
```

これを実行すると実行出力に以下が含まれていることが確認できます。

- VS Code の URL
- Google アカウント認証の URL
- アカウント認証用の token の入力フォーム

まず、Google アカウント認証の URL へ移動して認証を許可します。許可すると、token が出力されるので、それを入力フォームに入れます。
これを実施することで、Google Drive へのアクセス権限を得ることができます。

次に、VS Code の URL に移動して、設定したパスワードでログインします。

![https://imgur.com/LHNTBMn.png](https://imgur.com/LHNTBMn.png)

`/content/drive/MyDrive` に私のドライブがマウントされていました。

以上で使用する準備は完了です。

## Reference

- [Google ColabとVS Codeを用いた分析環境運用方法 〜kaggle Tipsを添えて〜 - ギークなエンジニアを目指す男](https://www.takapy.work/entry/2021/08/17/185047?utm_source=pocket_mylist)
- [ColabCodeを使って、Google Colabの上でVS Codeを使ってみよう](https://atmarkit.itmedia.co.jp/ait/articles/2108/27/news038.html)
