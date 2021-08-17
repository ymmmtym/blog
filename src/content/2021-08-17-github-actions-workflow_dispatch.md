---
templateKey: blog-post
id: 2021/08/17/04
title: GitHub Actions workflow_dispatch の設定してみる
slug: /2021/08/17/04
date: 2021-08-17T23:00:00.125Z
headerImage: "https://raw.githubusercontent.com/github/explore/2c7e603b797535e5ad8b4beb575ab3b7354666e1/topics/actions/actions.png"
description: ""
tags:
  - github
  - github-actions
---

[ワークフローをトリガーするイベント](https://docs.github.com/ja/actions/reference/events-that-trigger-workflows#workflow_dispatch)

GitHub Actions のイベントトリガーには、`workflow_dispatch` というものがあります。

これを設定することで、手動で GitHub Actions 実行のトリガーを作ることができます。

## 適用したリポジトリ

[terraform-cloud-oci/terraform.yml at main · ymmmtym/terraform-cloud-oci](https://github.com/ymmmtym/terraform-cloud-oci/blob/main/.github/workflows/terraform.yml)

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

![https://i.imgur.com/x4KnxB5.png](https://i.imgur.com/x4KnxB5.png)

ブラウザからは上記から workflow を実行することができ、この時に branch や引数を指定できます。

APIで実行する方法もあるようです。

[GitHub Actionsの手動実行 workflow_dispatchを試す - notebook](https://swfz.hatenablog.com/entry/2020/07/10/201136)
