---
date: 2021-09-18T14:20:33+09:00
description: ""
headerImage: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/2560px-Python_logo_and_wordmark.svg.png
id: 2021/09/18/01
slug: /2021/09/18/01
tags:
- "python"
- "error"
templateKey: blog-post
title: 【Python】dict 型で KeyError が発生する時の処理
---

Python では、dict 型に存在しないキーの値を取得しようとしたとき、**KeyError** となります。

```python
dic = dict()
print(dic['integer'])

---------------------------------------------------------------------------
KeyError                                  Traceback (most recent call last)
/tmp/ipykernel_29/3655157808.py in <module>
----> 1 print(dic['integer'])

KeyError: 'integer'
```

**KeyError** を発生させたくない場合は、`get(key)` を使用します。
これを行うことで、存在しないキーを取得しようとした場合は、デフォルトで `None` が返ってきます。

```python
dic = dict()
print(dic.get('integer'))

// None
```

dict 型に存在しないキーがあった場合、処理を分ける例を紹介します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [目次](#目次)
- [try, except で例外処理する](#try-except-で例外処理する)
- [get() を使う](#get-を使う)
- [Reference（参考文献）](#reference参考文献)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## try, except で例外処理する

`{偶数: [偶数のリスト], 奇数: [奇数のリスト]}` といった dict を作成します。

try, error を用いて、キーが存在しない場合は新しくキーを作成する処理をしています。

```python
dic = dict()

for i in range(10):
    if i % 2 == 1:
        try:
            dic['odd'].append(i)
        except KeyError:
            dic['odd'] = [i]
    else:
        try:
            dic['even'].append(i)
        except KeyError:
            dic['even'] = [i]

print(dic)

// {'even': [0, 2, 4, 6, 8], 'odd': [1, 3, 5, 7, 9]}
```

## get() を使う

get() は dic[key] と同じくキーの値を取得するメソッドですが、キーが存在しない場合は `KeyError` を発生させません。

デフォルトでは、`None` が返されます。第 2 引数にデフォルトの値を設定できます。（ここでは `'hoge'` とした例をあげます。）

```python
dic = dict()

for i in range(10):
    if i % 2 == 1:
        if dic.get('odd') != None:
            dic['odd'].append(i)
        else:
            dic['odd'] = [i]
    else:
        if dic.get('even', 'hoge') != 'hoge':
            dic['even'].append(i)
        else:
            dic['even'] = [i]

print(dic)

// {'even': [0, 2, 4, 6, 8], 'odd': [1, 3, 5, 7, 9]}
```

今回の例はほぼ同じコード量になりましたが、`get()` を使用すると例外処理を書く必要がなくなります。

## Reference（参考文献）

- [pythonのdictionaryでKeyErrorを出さないようにする - Qiita](https://qiita.com/sue71/items/b7f5c9373d0af587e256)
- [組み込み型 — Python 3.9.4 ドキュメント](https://docs.python.org/ja/3/library/stdtypes.html?highlight=dict)
