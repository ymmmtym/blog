---
templateKey: blog-post
id: 2021/08/17/01
title: kubernetes で namespace が消えない時の対処法
slug: /2021/08/17/01
date: 2021-08-17T11:45:00+09:00
headerImage: "https://imgur.com/VRR1bTW.png"
description: ""
tags:
  - kubernetes
  - etcd
---

[Rook](https://rook.io/docs/rook/v1.6/ceph-quickstart.html) を構築した時、`rook-ceph` という namespace が消えなくなってしまいしました。

```bash
$ kubectl get ns rook-ceph
NAME           STATUS        AGE
rook-ceph      Terminating   2d
```

このときの対処法を紹介します。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [目次](#目次)
- [解決方法](#解決方法)
  - [追記](#追記)
- [Reference](#reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 解決方法

etcd のコンテナーに入って無理やり削除しました。
中身を見てみると、関連するリソースが残っていたみたいで、これが原因でnamespaceが削除されなかったみたいです。

```bash
$ kubectl exec  -n kube-system -it etcd-tb1 -- sh
#
# export ETCDCTL_API=3
#
# etcdctl get / --prefix --keys-only | grep rook
/registry/apiextensions.k8s.io/customresourcedefinitions/cephclusters.ceph.rook.io
/registry/apiregistration.k8s.io/apiservices/v1.ceph.rook.io
/registry/ceph.rook.io/cephclusters/rook-ceph/rook-ceph
/registry/csidrivers/rook-ceph.cephfs.csi.ceph.com
/registry/csidrivers/rook-ceph.rbd.csi.ceph.com
/registry/namespaces/rook-ceph
/registry/storageclasses/rook-cephfs
#
# etcdctl get / --prefix --keys-only | grep rook | xargs etcdctl del {}
Error: del command needs one argument as key and an optional argument as range_end
#
# for registry in $(etcdctl get / --prefix --keys-only | grep rook);do etcdctl del $registry;done
1
0
1
1
1
1
1
# etcdctl get / --prefix --keys-only | grep rook
#
```

`xargs` コマンドは使用できなかったので、forで一括削除しました。

無事にnamespaceも消えていました。

```bash
kubectl get ns rook-ceph
Error from server (NotFound): namespaces "rook-ceph" not found
```

### 追記

[cert-manager の公式ドキュメント](https://cert-manager.io/docs/installation/helm/)にも似たような記述がありました。

> cert-managerインストールを削除せずにネームスペースを削除するようにマークした場合、ネームスペースが終了状態で立ち往生することがあります。これは通常、APIService リソースはまだ存在するが、Webhook が実行されていないため、到達できなくなることが原因です。この問題を解決するには、上記のコマンドを正しく実行したことを確認し、それでも問題が発生する場合は、次のコマンドを実行します。

```bash
kubectl delete apiservice v1beta1.webhook.cert-manager.io
```

namespace のみを削除した場合、`APIService` が残っていることが原因で Terminating 状態のまま namespace が消えないようです。

作成されるリソースは把握しておくことが大事です。

## Reference

- [Can't delete “rook” namespace · Issue #1595 · rook/rook](https://github.com/rook/rook/issues/1595)
