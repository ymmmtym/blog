---
date: 2022-08-14T21:10:19+09:00
description: ""
headerImage: https://www.linuxfoundation.jp/wp-content/uploads/2018/02/bg_post_kubernetes-300x169.png
id: 2022/08/14/01
slug: /2022/08/14/01
tags:
- "kubernetes"
- "volume"
- "permission"
templateKey: blog-post
title: Kubernetes の permission はどのように記載するのか
---

Kubernetes 環境において、Pod に volume をマウントする時に permission を指定できます。  
一般的な permission は 8 進数で記述しますが、Kubernetes 環境では 10 進数でも記述できます。  
どちらが正しいか気になったので、些細なことですが調べてみました。

## 結論

**（基本的には）8 進数にして、頭に 0 をつけた 4 桁表記にする。**

もう少し詳しく書くと、マニフェストのファイル形式によって異なります。

- yaml の場合 ← こちらが一般的
  - 8 進数表記で先頭に 0 をつける
  - 例）`0644`
- json の場合
  - 10 進数表記
  - 例）`420`

なおマニフェストが yaml 形式の場合でも、`kubectl apply` などのコマンド出力では 10 進数で表示されることがあります。

以下は[公式ドキュメント](https://kubernetes.io/ja/docs/concepts/configuration/secret/)からの抜粋ですが、10 進数表記が現れる原因は json ファイルの制約のようです。

> この例では、ファイル/etc/foo/my-group/my-usernameのパーミッションは0777になります。 JSONを使う場合は、JSONの制約により10進表記の511と記述する必要があります。
後で参照する場合、このパーミッションの値は10進表記で表示されることがあることに注意してください。
