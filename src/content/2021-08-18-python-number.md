---
templateKey: blog-post
id: 2021/08/18/02
title: python 2,8,10,16進数の変換
slug: /2021/08/18/02
date: 2021-08-18T23:15:00+09:00
headerImage: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Python_logo_and_wordmark.svg/2560px-Python_logo_and_wordmark.svg.png
description: ""
tags:
  - python
---

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [目次](#目次)
- [各進数の変換](#各進数の変換)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 各進数の変換

各進数で `18` を表す場合は以下のように記載します。

- 2 進数: `0b10010`
- 8 進数: `0o22`
- 10 進数: `18`
- 16 進数: `0x12`

```python
>>> 0b10010
18
>>> 0o22
18
>>> 18
18
>>> 0x12
18
```

関数を使う場合は以下になります。

```python
>>> bin(18) # format(18,'b')も可能
'0b10010'
>>> oct(18) # format(18,'o')も可能
'0o22'
>>> int(18)
18
>>> hex(18) # format(18,'x')も可能
'0x12'
```

それぞれ、bin,oct,hex という関数がありますが、format 関数の引数に x 進数を指定することも可能です。

また、関数を使わずに各進数を表す方法は以下になります。

```python
>>> '%0b' % 18
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: unsupported format character 'b' (0x62) at index 2
>>> '%0o' % 18
'22'
>>> '%0i' % 18
'18'
>>> '%0x' % 18
'12'
```

2 進数は無かったようです。

## Reference

- [Changing a decimal value into a hex value (jinja)](https://community.home-assistant.io/t/changing-a-decimal-value-into-a-hex-value-jinja/11925)
- [【Python】16進数・2進数・8進数と10進数を変換する](https://pg-chain.com/python-hex-bin-oct)
