---
templateKey: blog-post
id: 2021/08/24/01
title: "[Qwiklabs] Introduction to AWS Lambda（ハンズオン）を実施してみました"
slug: /2021/08/24/01
date: 2021-08-24T02:40:00+09:00
headerImage: "https://imgur.com/y3f4qwQ.png"
description: ""
tags:
  - qwiklabs
  - aws
  - google
  - lambda
  - s3
  - cloudwatch
---

<div class="iframely-embed"><div class="iframely-responsive" style="height: 140px; padding-bottom: 0;"><a href="https://www.qwiklabs.com/focuses/16506?catalog_rank=%7B%22rank%22%3A7%2C%22num_filters%22%3A1%2C%22has_search%22%3Atrue%7D&amp;parent=catalog&amp;search_id=12415632" data-iframely-url="//cdn.iframe.ly/BG3AP5t"></a></div></div>

トレーニング内容の再配布はできないため、コースの概要や受講した感想をご紹介します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [概要](#%E6%A6%82%E8%A6%81)
- [構成図](#%E6%A7%8B%E6%88%90%E5%9B%B3)
- [手順](#%E6%89%8B%E9%A0%86)
- [感想](#%E6%84%9F%E6%83%B3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 概要

- ハンズオン形式で Lambda の使い方を学習できます。
- 無料のコースであるため、Google のアカウントがあれば実施できます。

## 構成図

![https://imgur.com/QgwyOz3.png](https://imgur.com/QgwyOz3.png)

ユーザーが S3 バケットに画像ファイルをアップロードした時、自動的に Lambda 関数が実行され、その画像ファイルをリサイズして別の S3 バケットにアップロードされます。

その実行ログを CloudWatch で確認できます。

使用するサービスは以下の通りです。

- AWS Lambda
- Amazon S3
- Amazon CloudWatch Logs

## 手順

Qwiklabs をご覧ください🙇🏻‍♀️

## 感想

- Amazon S3 にファイルがアップロードされたことを**トリガー**に、Lambda 関数を実行する仕組みをハンズオン形式で学ぶことができました。
  - Lambda のコードソースの容量が大きく、コードの中身すべてを見ることはできませんでした。
    ![https://imgur.com/W8SfeXf.png](https://imgur.com/W8SfeXf.png)
- ハンズオンでは指定の画像ファイルが準備されてますが、環境構築後は任意のファイルをアップロードして Lambda の動作を試すことができます。
