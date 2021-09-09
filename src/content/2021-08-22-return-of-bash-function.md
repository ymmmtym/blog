---
templateKey: blog-post
id: 2021/08/22/01
title: シェルスクリプトの関数から戻り値を返す方法
slug: /2021/08/22/01
date: 2021-08-22T17:35:00+09:00
headerImage: "https://imgur.com/GruKxmG.png"
description: ""
tags:
  - bash
  - linux
  - シェルスクリプト
---

bash 関数で戻り値を返すには、`echo` コマンドを使用します。

`return` コマンドは終了コードである数値（0 - 255）を返します。  
他のプログラミング言語と異なるので、注意が必要です。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [間違った使い方](#%E9%96%93%E9%81%95%E3%81%A3%E3%81%9F%E4%BD%BF%E3%81%84%E6%96%B9)
- [正しい使い方](#%E6%AD%A3%E3%81%97%E3%81%84%E4%BD%BF%E3%81%84%E6%96%B9)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 間違った使い方

`return` を使用した以下のスクリプト `echo_double.sh` を作成します。

```bash:title=echo_double.sh
#!/usr/bin/env bash

test1(){
    return "hoge"
}


test2(){
    return "fuga"
}

echo_double(){
    echo $1 $2
}

echo_double $(test1) $(test2)
```

これを実行すると以下のようなエラーになります。

```bash
$ bash echo_double.sh
test.sh: line 4: return: hoge: numeric argument required
test.sh: line 9: return: fuga: numeric argument required
```

## 正しい使い方

`return` と記載していたところを `echo` に修正します。

```bash:title=echo_double.sh
#!/usr/bin/env bash

test1(){
    echo "hoge"
}


test2(){
    echo "fuga"
}

echo_double(){
    echo $1 $2
}

echo_double $(test1) $(test2)
```

これで実行してみます。

```bash
$ bash echo_double.sh 
hoge fuga
```

期待通りの結果になりました。

## Reference

- [Bash の構文: 関数から戻り値を返す | まくまくLinux/Shellノート](https://maku77.github.io/linux/syntax/return-value-from-function.html)
