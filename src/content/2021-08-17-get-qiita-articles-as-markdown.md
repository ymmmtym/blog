---
templateKey: blog-post
id: 2021/08/17/03
title: Qiita の記事を markdown で一括取得するコマンド
slug: /2021/08/17/03
date: 2021-08-17T22:25:00+09:00
headerImage: "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-ec5ba42a24ae923f16825592efdc356f.png"
description: ""
tags:
  - qiita
  - markdown
  - blog
---

Qiita 記事のURLの最後に`.md`をつけることで、記事の markdown を表示させることができます。

たとえば、以下の記事の markdown は以下のリンクになります。

- [Mac起動音のOn(Off)に切り替える方法 - Qiita](https://qiita.com/yumenomatayume/items/69ef0911d9a46145dfd5)
- [Mac起動音のOn(Off)に切り替える方法 - Qiita (markdown表示)](https://qiita.com/yumenomatayume/items/69ef0911d9a46145dfd5.md)

上記を利用して、自分が投稿した記事の markdown を一括で取得したいと思います。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前提条件](#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6)
- [コマンド](#%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89)
- [GitHub Actions に設定する](#github-actions-%E3%81%AB%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 前提条件

- markdown ファイル名は `記事タイトル.md`
- 記事のタイトルに`/`が入っていないこと
- 以下のコマンドがインストールされていること
  - `jq`
  - `nkf`

## コマンド

- `USERNAME`に Qiita ユーザー名を指定します。
- 投稿記事が 100 個以上の場合は、`&page=2`を使って繰り返し実行すれば全記事が取得できそうです。

```bash
USERNAME=yumenomatayume # ユーザー名を指定
articles=$(curl -s "https://qiita.com/api/v2//users/${USERNAME}/items?per_page=100" | jq -r ".[].url")

for article in $articles;do
  file=$(echo "$(curl -s $article.md | grep '^title:' | sed -E 's/^title: //g').md" | nkf -w --url-input)
  curl -s $article.md > "$file"
done
```

## GitHub Actions に設定する

以上を踏まえて、Qiita 記事を自動で取得できるリポジトリを作りました。

[ymmmtym/qiita: Qiita Articles](https://github.com/ymmmtym/qiita)

GitHub Actions で、1 時間ごとにコマンドを実行するようにしています。

## Reference

- [自分の Qiita の投稿を markdown で全て手元に落とす](https://dev.to/nekottyo/qiita-markdown-5dbp)
