---
date: 2021-11-26T03:05:32+09:00
description: ""
headerImage: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/2560px-Python_logo_and_wordmark.svg.png
id: 2021/11/26/01
slug: /2021/11/26/01
tags:
- "python"
templateKey: blog-post
title: 【python】 *args と **kwargs の使い方
---

<!-- DOCTOC SKIP -->

`*args`　と `**kwargs` は、関数を定義するときに、**任意の数の引数を受け取る**ときに使用されます。

引数を受け取る時の方は次のようになります。

- `*args`: tuple 型
- `**kwargs`: dict 型

一般的に、args, kwargs と書かれることが多いですが、任意の値（ `*a`, `**b`）でも問題ありません。

```python
def test(*args, **kwargs, *extra_args):
    print(args)
    print(kwargs)

test(1, 2, 3, 4, 5, col=4, row=5)

// (1, 2, 3, 4, 5)
// {'col': 4, 'row': 5}
```

引数の順番は型でまとめないとエラーになります。

```python
def extra_test(*args, **kwargs, *extra_args):
    print(args)
    print(kwargs)
    print(extra_args)

// File "<stdin>", line 1
//    extra_test(1, 2, 3, 4, 5, col=4, row=5, 6)
                                               ^
// SyntaxError: positional argument follows keyword argument
```

## Reference（参考文献）

- [python *args, **kwargs 使い方メモ - Qiita](https://qiita.com/studio_haneya/items/40be89b384c5b6da5f68)
