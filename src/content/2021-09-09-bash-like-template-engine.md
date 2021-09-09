---
date: 2021-09-09T09:26:36+09:00
description: ""
headerImage: https://imgur.com/GruKxmG.jpg
id: 2021/09/09/01
slug: /2021/09/09/01
tags:
- bash
- linux
- template
templateKey: blog-post
title: 【bash】ファイルの変数を展開して出力する方法
---

皆さんはテンプレートエンジンを使っていますでしょうか。
テンプレートエンジンとは、データとテンプレートを合体させて文字列を作る仕組みのことです。

ちなみに、使用頻度の高い言語が Python なので、Jinja2 というテンプレートエンジンをよく使っています。

[Jinja — Jinja Documentation (3.0.x)](https://jinja.palletsprojects.com/en/3.0.x/)

しかし、このテンプレートエンジンを使うには、環境構築などの準備をする必要があります。
もう少し手軽に使えるテンプレートエンジンがあればと思ってました。

そこで、Bash を使ってテンプレートエンジンのように変数を展開する方法を記載します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [はじめに](#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
- [eval コマンド](#eval-%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
- [envsubst コマンド](#envsubst-%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
- [Reference（参考文献）](#reference%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## はじめに

変数が書かれている `hello.txt` ファイルを用意します。

```bash:title=hello.txt
Hello, ${name}
```

## eval コマンド

LInux であれば標準で使用できる `eval` コマンドを使用することで、変数を展開できます。

```bash
$ name=eval
$ eval "echo \"$(cat hello.txt)\""
Hello, eval
```

ヒアストリングを使って展開することも可能です。

```bash
$ name=eval
$ eval "cat <<< \"$(cat hello.txt)\""
Hello, eval
```

## envsubst コマンド

`envsubst` コマンドに変数を渡して実行することで、`eval` コマンドよりもシンプルに変数展開できます。

通常はインストールされていないので、パッケージマネージャーより `gettext` パッケージをインストールする必要があります。[^1]

```bash
brew install gettext
```

インストールが完了したら、以下のように実行します。

```bash
$ cat hello.txt | name=envsubst envsubst
Hello, envsubst
```

## Reference（参考文献）

- [テンプレートエンジンのススメ | 前編 テンプレートエンジンとは | CodeGrid](https://www.codegrid.net/articles/template-engine-1/#:~:text=%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%B3%E3%81%A8%E3%81%AF%E3%83%87%E3%83%BC%E3%82%BF,%E3%81%A8%E8%80%83%E3%81%88%E3%81%A6%E5%95%8F%E9%A1%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82)
- [ファイルにかかれた変数をBashで展開し、Templateのように扱う - grep Tips *](https://www.greptips.com/posts/1277/)
- [envsubstを使ってテキストファイルをテンプレートエンジンとして使う | ゲンゾウ用ポストイット](https://genzouw.com/entry/2021/01/14/220134/2113/)

[^1]: Mac は Homebrew からインストールできます。Linux の場合は、yum(dnf), apt からインストールしましょう。
