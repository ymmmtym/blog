---
templateKey: blog-post
id: 2021/08/10/01
title: Vagrantで使用されているvmdkファイルを圧縮する方法
slug: /2021/08/10/01
date: 2021-08-10T21:35:00.125Z
headerImage: "https://imgur.com/KjNIPa6.png"
description: ""
tags:
  - vagrant
  - virtualbox
---

virtualboxで起動されるVMのdiskは`.vmdk`ファイル形式で作成されます。
vagrantを使っていると、このvmdkファイルのサイズが大きくなってしまうので、それを圧縮する方法をお伝えします。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前提条件](#%E5%89%8D%E6%8F%90%E6%9D%A1%E4%BB%B6)
- [手順](#%E6%89%8B%E9%A0%86)
  - [Guest OSでの作業](#guest-os%E3%81%A7%E3%81%AE%E4%BD%9C%E6%A5%AD)
  - [Host OSでの作業](#host-os%E3%81%A7%E3%81%AE%E4%BD%9C%E6%A5%AD)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 前提条件

以下の組み合わせで使用している場合になります。

- virtualbox
- vagrant

## 手順

GuestOS(VM)とHostOS(MacやWindows)で作業します。

### Guest OSでの作業

ストレージの空き容量を0埋めします。

```bash
dd if=/dev/zero of=zero bs=4k
rm -fr zero
```

### Host OSでの作業

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
