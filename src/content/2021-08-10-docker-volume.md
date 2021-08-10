---
templateKey: blog-post
id: 2021/08/10/02
title: Docker for MacでVolumeをMount出来ない時の確認
slug: /2021/08/10/02
date: 2021-08-10T21:35:00.125Z
headerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Docker_%28container_engine%29_logo.png/250px-Docker_%28container_engine%29_logo.png"
description: ""
tags:
  - docker
  - mac
---

MacでDocker Volumeをマウント出来なくなったときの確認観点をまとめます。

[ボリュームの利用 | Docker ドキュメント](https://matsuand.github.io/docs.docker.jp.onthefly/storage/volumes/)

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

ヘルプは以下のようになっています。

```bash
$ docker run --help

# snip...

    --mount mount                    Attach a filesystem mount to the container

-v, --volume list                    Bind mount a volume
      --volume-driver string           Optional volume driver for the container
      --volumes-from list              Mount volumes from the specified container(s)
```

`/var/tmp`をマウントしてみます。

```bash
$ pwd
/var/tmp
$ ls -l
total 0
drwxr-xr-x  2 root      wheel   64  6 10 23:12 KindlePreviewerUpdater/
drwxr-xr-x  4 root      wheel  128  5 28 09:33 com.paceap.eden.licensed/
srw-r--r--  1 yukihisa  wheel    0  5 28 09:33 filesystemui.socket=
$ docker container run --rm -it -v $PWD:/pwd:rw alpine
/ # ls /pwd/
/ #
```

マウントができておりません。

## 解決法

「Preference > Resources」で設定したディレクトリしかマウントする事ができません。

本事象は`/var/tmp`をここに追加して解決できました。

![https://imgur.com/m24kFzQ.png](https://imgur.com/m24kFzQ.png)