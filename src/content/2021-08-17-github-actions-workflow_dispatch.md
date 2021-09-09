---
templateKey: blog-post
id: 2021/08/17/04
title: GitHub Actions workflow_dispatch の設定してみる
slug: /2021/08/17/04
date: 2021-08-17T23:00:00+09:00
headerImage: "https://raw.githubusercontent.com/github/explore/2c7e603b797535e5ad8b4beb575ab3b7354666e1/topics/actions/actions.png"
description: ""
tags:
  - github
  - github-actions
---

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://docs.github.com/ja/actions/reference/events-that-trigger-workflows" data-iframely-url="//cdn.iframe.ly/ZKkSjSX"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

GitHub Actions のイベントトリガーには、`workflow_dispatch` というものがあります。

これを設定することで、手動で GitHub Actions 実行のトリガーを作ることができます。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [適用したリポジトリ](#%E9%81%A9%E7%94%A8%E3%81%97%E3%81%9F%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 適用したリポジトリ

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://github.com/ymmmtym/terraform-cloud-oci" data-iframely-url="//cdn.iframe.ly/sU4oQq7?card=small"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>

`workflow_dispatch` 箇所を抜粋したものは以下になります。

```yaml
on:
  workflow_dispatch:
    inputs:
      args:
        description: 'Args to terraform (default: show)'
        required: true
        default: 'show'
jobs:
  terraform:
    name: Terraform
    runs-on: ubuntu-latest
    steps:
      - name: Terraform ${{ github.event.inputs.args }}
        run: terraform ${{ github.event.inputs.args }}
        if: ${{ github.event_name == 'workflow_dispatch' }}
```

GitHubをブラウザで開き、Actions タブに移動すると、以下のように Run workflow という項目が追加されています。

![GitHub Actions workflow_dispatch](https://i.imgur.com/x4KnxB5.png)

ブラウザからは上記から workflow を実行することができ、この時に branch や引数を指定できます。

APIで実行する方法もあるようです。

https://swfz.hatenablog.com/entry/2020/07/10/201136
