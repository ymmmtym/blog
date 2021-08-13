---
templateKey: blog-post
id: 2021/07/25/01
title: MetalLBをinstallする手順(L2ネットワーク版)
slug: /2021/07/25/01
date: 2021-07-25T01:50:00.125Z
headerImage: "https://imgur.com/a5HEHEH.png"
description: ""
tags:
  - metallb
  - kubernetes
  - flannel
  - オンプレミス
---

[MetalLB, bare metal load-balancer for Kubernetes](https://metallb.universe.tf/installation/)

自宅の検証環境におうちk8sを導入しています。

AWSやGCPなどのクラウドプロバイダーの場合、KubernetesのServiceを`Type: LoadBalancer`にしていると、自動的にグローバルIPアドレスを取得してくれます。

オンプレ環境のKubernetesで同様のことをするとPendingになってしましますが、Metallbを使うとこで`Type: LoadBalancer`と設定したServiceに、プライベートIPアドレスを振り分ける事ができます。

今回は、クラスター間のネットワークにflannelを使っているので、L2ネットワークでIPアドレスを設定します。

## 事前準備

kube-proxyにIPVS modeを使用している且つKubernetes v1.14.2以降のバージョンの場合は、strictARPを有効にする必要があります。(今回はIPVS modeを使用していないため、割愛します。)

strictARPが有効になっているかは、以下のコマンドで確認できます。

```bash
kubectl get configmap kube-proxy -n kube-system -o yaml | \\
sed -e "s/strictARP: false/strictARP: true/" | \\
kubectl diff -f - -n kube-system
```

diffが出力されるので、以下の出力が含まれていた場合にはstrictARPが有効になっていない事が分かります。

```bash
-      strictARP: false
+      strictARP: true
```

以下のコマンドでstrictARPを有効にします。

```bash
kubectl get configmap kube-proxy -n kube-system -o yaml | \\
sed -e "s/strictARP: false/strictARP: true/" | \\
kubectl apply -f - -n kube-system
Warning: resource configmaps/kube-proxy is missing the kubectl.kubernetes.io/last-applied-configuration annotation which is required by kubectl apply. kubectl apply should only be used on resources created declaratively by either kubectl create --save-config or kubectl apply. The missing annotation will be patched automatically.
```

## MetalLBのインストール

Manifestでインストールする場合は、以下の2つをapplyします。

```bash
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.10.2/manifests/namespace.yaml
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.10.2/manifests/metallb.yaml
```

これでインストール自体は完了したので、以降は実際にアサインするIPアドレスを設定します。

## Config設定

Flannel Networkのため、L2 ConfigurationのConfigMapを作成します。

`address-pools`は自分の環境(clusterのアドレスレンジの未使用IP)に修正しております。

ちなみに、この`address-pools`はflannel networkで使用しているものではなく、Nodeが持つIPのものになっています。

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - 192.168.100.240-192.168.100.250
EOF
```

以上で設定は完了です。

## Create Pod&Service

テスト用のnginxを作ります。

```bash
cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: nginx
  name: ngnix
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - image: nginx
        name: ngnix
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: nginx
  type: LoadBalancer
EOF
```

動作確認します。

```bash
root@k8s-master1:~# kubectl get pod,svc
NAME                                  READY   STATUS    RESTARTS   AGE
pod/ngnix-84784697bb-8mhhr            1/1     Running   0          55s
pod/ngnix-84784697bb-9x6ft            1/1     Running   0          55s

NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP       PORT(S)        AGE
service/nginx            LoadBalancer   10.105.252.24   192.168.100.240   80:30324/TCP   55s

root@k8s-master1:~# curl 192.168.100.240
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="<http://nginx.org/>">nginx.org</a>.<br/>
Commercial support is available at
<a href="<http://nginx.com/>">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
root@k8s-master1:~#
```

`192.168.100.240`のExternal-IPを持って動いていることが確認できました。defaultではaddress poolから若番のIPアドレスが払い出されるようです。

`loadBalancerIP`をaddress pool内の値に設定することで、IPアドレスを指定することも可能でした。(当たり前ですが、pool外のIPアドレスを指定するとpendingとなりIPアドレスが付与されません。)

```bash
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: nginx
  type: LoadBalancer
  loadBalancerIP: 192.168.100.250
EOF
root@k8s-master1:~# kubectl get svc
NAME             TYPE           CLUSTER-IP      EXTERNAL-IP       PORT(S)        AGE
nginx            LoadBalancer   10.105.59.75    192.168.100.250   80:31629/TCP   3m5s
```

## 最後に

今回はL2でのmetallbを試してみましたが、次はBGP Configuration(L3)を試してみます。

## Reference

- [【手順あり】MetalLBの使い方から動きまで解説します - フラミナル](https://blog.framinal.life/entry/2020/04/16/022042)
- [Kubernetes\] オンプレK8sでもtype:LoadBalancer Serviceが使えるようになるMetalLBを入れてみた - zaki work log](https://zaki-hmkc.hatenablog.com/entry/2020/07/10/235944)
- [KubernetesロードバランサーのMetalLBを導入した話(Necoプロジェクト体験入部) - Cybozu Inside Out | サイボウズエンジニアのブログ](https://blog.cybozu.io/entry/2019/03/25/093000)
