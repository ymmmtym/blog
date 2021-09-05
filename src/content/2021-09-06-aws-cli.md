---
templateKey: blog-post
id: 2021/08/30/01
title: terraform cloud で tfstate を管理している時ローカルで terraform を実行する方法
slug: /2021/08/30/01
date: 2021-08-30T19:25:00.125Z
headerImage: "https://imgur.com/RXiX3OS.png"
description: ""
tags:
  - terraform
  - github
---

個人環境で、OCI(Oracle Cloud Infrastructure) の無料枠を terraform でデプロイしています。

[GitHub - ymmmtym/terraform-cloud-oci: https://console.ap-tokyo-1.oraclecloud.com/](https://github.com/ymmmtym/terraform-cloud-oci)

Terraform Cloud では tfstate とクレデンシャル情報を管理しており、GitHub に PR(merge) すると GitHub Acitons より terraform plan(terraform apply) が実行されます。

実装方法としては、API-driven workflow を採用しており、GitHub に

以下の記事に詳しく記載されています。

[GitHub Actions × Terraform Cloud | 株式会社AI Shift](https://www.ai-shift.co.jp/techblog/1924)

GitHub と連携しているため、terraform コマンドを実行するためには GitHub に操作を加える必要があります。 [^1]

もしくは、Terraform Cloud の管理画面より手動で実行する必要があります。

検証環境であれば、もう少し気軽に試したいと思い、ローカルで実行できる方法を探しました。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [terraform.rc を使ってみる](#terraformrc-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%81%BF%E3%82%8B)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## terraform.rc を使ってみる

`terraform.rc` or `.terraformrc` ファイルに以下のような形で API_TOKEN を書くと、terraform cloud にある tfstate を参照してローカルで動作させる事ができます。

```hci
credentials "app.terraform.io" {
  token = "xxxxxx.atlasv1.zzzzzzzzzzzzz"
}
```

## Reference

- [Terraform Cloud は AWS の credentials を持たせずに tfstate だけ管理することができる | DevelopersIO](https://dev.classmethod.jp/articles/manage-tfstate-terraform-cloud/)
- [CLI Configuration - Terraform by HashiCorp](https://www.terraform.io/docs/cli/config/config-file.html)

[^1]: [GitHub Actions workflow_dispatch の設定してみる | yumenomatayume's Blog](https://blog.ymmmtym.com/2021/08/17/04) より、workflow_dispatch で実行することもできます。
