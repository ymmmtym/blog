---
templateKey: blog-post
id: 2021/08/17/02
title: kubectl wait コマンドを使ってみる
slug: /2021/08/17/02
date: 2021-08-17T17:50:00+09:00
headerImage: "https://imgur.com/IcWawg8.png"
description: ""
tags:
  - kubernetes
---

`kubectl wait` コマンドを使用すると、1つ以上のリソースが特定の状態になるまで待つことができます。実験的なコマンドのようです。

[Kubectl Reference Docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#wait)

> Experimental: Wait for a specific condition on one or many resources.

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [コマンド例](#%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E4%BE%8B)
- [使用例](#%E4%BD%BF%E7%94%A8%E4%BE%8B)
- [その他](#%E3%81%9D%E3%81%AE%E4%BB%96)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## コマンド例

たとえば、

- すべての namespace の
- deployment が available になるまで
- 300 秒待つ (`timeout` オプションはデフォルトで 30s)

をしたいとき、以下のコマンドを実行します。

```bash
kubectl wait -A --for=condition=available deployment --all --timeout=300s
```

## 使用例

[manifests/jupyter-notebook at main · ymmmtym/manifests](https://github.com/ymmmtym/manifests/tree/main/jupyter-notebook)

この jupyter-notebook を作成する上記の manifest で試してみます。

`deployment/jupyter-notebook` が available になるまで、300s 待つコマンドが以下になります。

```bash
kubectl wait --for=condition=available deployment/jupyter-notebook --timeout=300s
```

これを実行すると、プロンプトが返ってこなくなります。
この間、別のターミナルを立ち上げて、jupyter-notebook の manifest を apply してみましょう。

以下のように、available になることを確認します。

```bash
$ kubectl get deploy
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
jupyter-notebook   1/1     1            1           63s
```

先ほどの、`kubectl wait` を実行したターミナルに移動してみましょう。

```bash
$ kubectl wait --for=condition=available deployment/jupyter-notebook --timeout=300s
deployment.apps/jupyter-notebook condition met
$
```

`deployment.apps/jupyter-notebook condition met` が出力され、プロンプトが返ってきていることが分かります。

簡単な例ですが、上手く使ってリソース間の依存関係の解決などに役立ちそうですね。

## その他

現時点では、後から発生するリソース（特定の Job 完了後に、Deployment が作成される等）には対応できないようなので、注意が必要です。
