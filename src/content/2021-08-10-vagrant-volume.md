---
templateKey: blog-post
id: 2021/08/10/01
title: Vagrantの空き容量を増やす
slug: /2021/08/10/01
date: 2021-08-10T21:35:00.125Z
headerImage: "https://imgur.com/KjNIPa6.png"
description: ""
tags:
  - vagrant
---

GuestOS(VM)とHostOSで作業します。

## Guest OS

ストレージの空き容量を0埋めします。

```bash
dd if=/dev/zero of=zero bs=4k
rm -fr zero
```

## Host OS

GuestOSを停止します。

```bash
vagrant halt
```

GuestOSがあるディレクトリに移動し、`.vmdk`を`.vdi`に変換します。さらに`.vdi`を圧縮します。

```bash
cd ~/VirtualBox\ VMs/${box}
VBoxManage clonehd box-disk1.vmdk box-disk1.vdi --format vdi
VBoxManage modifyhd box-disk3.vdi compact
```

`.vdi`で圧縮したら、`.vmdk`に戻します。

```bash
VBoxManage clonehd box-disk3.vdi box-disk3.vmdk --format vmdk
```

## Reference

- [Vagrantのvmdkファイルが肥大化してたので圧縮したら容量が10分の1になった！ - Qiita](https://qiita.com/RyujiAMANO/items/a904399b7c45d1f0b658)
- [Bureimono stdio.h: Vagrant とストレージ容量](http://satorumpen.blogspot.com/2014/03/vagrant.html)
