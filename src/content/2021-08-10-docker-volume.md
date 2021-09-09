---
templateKey: blog-post
id: 2021/08/10/02
title: Docker for Macでファイルをマウント出来ない時の解決法
slug: /2021/08/10/02
date: 2021-08-10T21:35:00+09:00
headerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Docker_%28container_engine%29_logo.png/250px-Docker_%28container_engine%29_logo.png"
description: ""
tags:
  - docker
  - mac
---

Docker(Docker for Mac)にファイルをマウント出来なくなったときの解決法を紹介します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前提条件](#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6)
- [Docker Volumeの使用方法](#docker-volume%E3%81%AE%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
- [マウントに失敗する例](#%E3%83%9E%E3%82%A6%E3%83%B3%E3%83%88%E3%81%AB%E5%A4%B1%E6%95%97%E3%81%99%E3%82%8B%E4%BE%8B)
- [解決法](#%E8%A7%A3%E6%B1%BA%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 前提条件

使用しているバージョン

```bash
$ sw_vers
ProductName: Mac OS X
ProductVersion: 10.15.7
BuildVersion: 19H1217

$ docker --version
Docker version 20.10.6, build 370c289

$ docker-compose --version
docker-compose version 1.26.0, build d4451659
```

## Docker Volumeの使用方法

Docker Volumeの使用方法については、以下のドキュメントにまとまっています。

[ボリュームの利用 | Docker ドキュメント](https://matsuand.github.io/docs.docker.jp.onthefly/storage/volumes/)

ヘルプは以下のようになっています。

```bash
$ docker run --help

# snip...

    --mount mount                    Attach a filesystem mount to the container

-v, --volume list                    Bind mount a volume
      --volume-driver string           Optional volume driver for the container
      --volumes-from list              Mount volumes from the specified container(s)
```

## マウントに失敗する例

Mac側の`/var/tmp`ディレクトリを、Docker側の`/pwd`マウントしてみます。

```bash
$ pwd
/var/tmp
$ ls -l
total 0
drwxr-xr-x  2 root      wheel   64  6 10 23:12 KindlePreviewerUpdater/
drwxr-xr-x  4 root      wheel  128  5 28 09:33 com.paceap.eden.licensed/
srw-r--r--  1 root  wheel    0  5 28 09:33 filesystemui.socket=
$ docker container run --rm -it -v $PWD:/pwd:rw alpine
/ # ls /pwd/
/ #
```

Docker側の`/pwd`ディレクトリにファイルがなく、マウントができておりません。

## 解決法

Docker for Macの設定を開き、「Preference > Resources > FILE SHARING」から`/var/tmp`を追加しました。

![https://imgur.com/m24kFzQ.png](https://imgur.com/m24kFzQ.png)

Docker for Macでは、上記で設定したディレクトリしかマウントする事ができません。
