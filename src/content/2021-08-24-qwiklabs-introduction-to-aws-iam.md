---
templateKey: blog-post
id: 2021/08/24/02
title: "[Qwiklabs] Introduction to AWS Identity and Access Management（ハンズオン）を実施してみました"
slug: /2021/08/24/02
date: 2021-08-24T12:40:00.125Z
headerImage: "https://imgur.com/y3f4qwQ.png"
description: ""
tags:
  - qwiklabs
  - aws
  - google
  - iam
  - s3
  - ec2
---

[Introduction to AWS Identity and Access Management (IAM) | Qwiklabs](https://www.qwiklabs.com/focuses/18123?catalog_rank=%7B%22rank%22%3A11%2C%22num_filters%22%3A0%2C%22has_search%22%3Atrue%7D&parent=catalog&search_id=12441744)

トレーニング内容の再配布はできないため、コースの概要や受講した感想をご紹介します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [概要](#%E6%A6%82%E8%A6%81)
  - [実施できること](#%E5%AE%9F%E6%96%BD%E3%81%A7%E3%81%8D%E3%82%8B%E3%81%93%E3%81%A8)
  - [使用するサービス](#%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9)
- [構成図](#%E6%A7%8B%E6%88%90%E5%9B%B3)
- [手順](#%E6%89%8B%E9%A0%86)
- [正常性確認](#%E6%AD%A3%E5%B8%B8%E6%80%A7%E7%A2%BA%E8%AA%8D)
- [感想](#%E6%84%9F%E6%83%B3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 概要

- ハンズオン形式で IAM(Identity and Access Management) の使い方を学習できます。
- 無料のコースであるため、Google のアカウントがあれば実施できます。

### 実施できること

- IAM ユーザを IAM ユーザグループに割り当てる
- IAM ユーザに正しい権限が付与されているかテストする
  - ログインできること
  - 設定した権限のみの動作が行えること

### 使用するサービス

- AWS IAM
- Amazon EC2
- Amazon S3

## 構成図

3 ユーザと、3 ユーザグループが用意されています。

ユーザグループにはそれぞれ以下のポリシーが設定されています。

- S3 読み取り権限
- EC2 読み取り権限
- EC2 管理権限（特定インスタンスの起動と停止が可能）

これらのユーザグループに、それぞれユーザを割り当てます。

![https://imgur.com/dNuMVRC.png](https://imgur.com/dNuMVRC.png)

## 手順

詳細はQwiklabs をご覧ください🙇🏻‍♀️

## 感想

- IAM で細かく権限の設定ができることを知りました。
- 権限がない時に各サービスはどのような表示になるのか実際にみることができました。

インスタンスに対して何も権限がないときは、インスタンスが表示されません。

![https://imgur.com/nL4uSFQ.png](https://imgur.com/nL4uSFQ.png)

インスタンスに接続するためにも権限が必要です。

![https://imgur.com/s1vTe1d.png](https://imgur.com/s1vTe1d.png)
