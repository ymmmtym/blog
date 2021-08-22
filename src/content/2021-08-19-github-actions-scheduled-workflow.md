---
templateKey: blog-post
id: 2021/08/19/01
title: GitHub Actions の schedule が停止した時の再開方法
slug: /2021/08/19/01
date: 2021-08-19T21:30:00.125Z
headerImage: "https://imgur.com/z1NIlzb.png"
description: ""
tags:
  - github
  - github-actions
---

GitHub Actions に schedule を設定しているリポジトリに、60 日間活動がないと workflow が停止します。

実際に、私も[こちら](https://github.com/ymmmtym/templates/actions/workflows/update_submodules.yml)のリポジトリで schedule を設定しているのですが、ふとした時に停止していることに気づきました。

止まってしまった workflow を再開する方法を紹介します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [再開方法](#%E5%86%8D%E9%96%8B%E6%96%B9%E6%B3%95)
- [停止しないための対策](#%E5%81%9C%E6%AD%A2%E3%81%97%E3%81%AA%E3%81%84%E3%81%9F%E3%82%81%E3%81%AE%E5%AF%BE%E7%AD%96)
  - [push する](#push-%E3%81%99%E3%82%8B)
  - [Pull Request を送る](#pull-request-%E3%82%92%E9%80%81%E3%82%8B)
  - [Issue を発行する](#issue-%E3%82%92%E7%99%BA%E8%A1%8C%E3%81%99%E3%82%8B)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 再開方法

リポジトリにアクセスして、**Actions** タブより該当の workflow を選択しましょう。

![GitHub Actions Enable workflow Top](https://imgur.com/z1NIlzb.png)

もう少し拡大します。

![GitHub Actions Enable](https://imgur.com/2xJSw88.png)

「60 日間活動がなかったので、schedule された workflow を停止しました。」という警告とともに、右の方には「Enable workflow」をクリックできるようになっています。

この「Enable workflow」をクリックすることで、schedule workflow を再開させることができます。

## 停止しないための対策

workflow を停止させないためには、何らかの活動をする必要があります。
本来であれば、「草を生やす（commit する）」を続けることが望ましいですが、どうしても放置して自動運用する場合もあるかと思います。
その場合の対応策について、考えたいと思います。

### push する

任意のブランチに push する action には、以下がオススメです。

[ad-m/github-push-action: GitHub actions to push back to repository eg. updated code](https://github.com/ad-m/github-push-action)

### Pull Request を送る

PR を作成できる action には、以下がオススメです。

[Create Pull Request · Actions · GitHub Marketplace](https://github.com/marketplace/actions/create-pull-request)

### Issue を発行する

Issue を発行する actions には、以下がオススメです。

[Create an issue · Actions · GitHub Marketplace](https://github.com/marketplace/actions/create-an-issue)

## Reference

- [GitHubActionsのscheduleは60日で無効化される](https://zenn.dev/goryudyuma/articles/6a17d087dd1bb3)
- [GitHub Actions は60日間リポジトリに活動が無いと自動停止する](https://zenn.dev/hellorusk/articles/fc6d4696f5b269)
