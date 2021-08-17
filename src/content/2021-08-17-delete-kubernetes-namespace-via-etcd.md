---
templateKey: blog-post
id: 2021/08/17/01
title: kubernetes で namespace が消えない時の対処法
slug: /2021/08/17/01
date: 2021-08-17T11:45:00.125Z
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

## 解決方法

etcd のコンテナに入って無理やり削除しました。
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

## Reference

- [Can't delete “rook” namespace · Issue #1595 · rook/rook](https://github.com/rook/rook/issues/1595)