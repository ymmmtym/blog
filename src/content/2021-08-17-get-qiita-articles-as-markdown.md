---
templateKey: blog-post
id: 2021/08/17/03
title: Qiitaの記事を markdown で一括取得するコマンド
slug: /2021/08/17/03
date: 2021-08-17T22:25:00.125Z
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

## 前提条件

- markdown ファイル名は `記事タイトル.md`
- 記事のタイトルに`/`が入っていないこと
- 以下のコマンドがインストールされていること
  - `jq`
  - `nkf`

## コマンド

- `user_id`に Qiita ユーザー名を指定します。
- 投稿記事が 100 個以上の場合は、`&page=2`を使って繰り返し実行すれば全記事が取得できそうです。

```bash
user_id=yumenomatayume # ユーザー名を指定
articles=$(curl -s "https://qiita.com/api/v2//users/${user_id}/items?per_page=100" | jq -r ".[].url")

for article in $articles;do
  file=$(echo "$(curl -s $article.md | grep '^title:' | sed -E 's/^title: //g').md" | nkf -w --url-input)
  curl -s $article.md > "$file"
done
```

## Reference

[自分の Qiita の投稿を markdown で全て手元に落とす](https://dev.to/nekottyo/qiita-markdown-5dbp)
