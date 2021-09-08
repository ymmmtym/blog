---
date: 2021-09-08T14:41:53+09:00
description: ""
headerImage: https://imgur.com/eeaOT5E.jpg
id: 2021/09/08/01
slug: /2021/09/08/01
tags:
- go
templateKey: blog-post
title: Go 言語でゼロ埋めする方法
---

<!-- DOCTOC SKIP -->

fmt パッケージを使って、以下のように記載できます。

```go
fmt.Printf("%02d", 1)
// 01

s := fmt.Sprintf("%04d", 1)
fmt.Printf(s)
// 0001
```

## Reference（参考文献）

- [Go言語でゼロ埋め【zero padding】【golang】 - DRYな備忘録](https://otiai10.hatenablog.com/entry/2014/06/15/000217)
