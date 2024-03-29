---
templateKey: blog-post
id: 2021/08/15/01
title: お名前.comのドメインを自宅IPアドレスのドメインとして使用する方法
slug: /2021/08/15/01
date: 2021-08-15T15:50:00+09:00
headerImage: "https://imgur.com/GgbigU2.png"
description: ""
tags:
  - DNS
  - no-ip
  - お名前.com
---

自宅IPアドレスに自由なドメインを設定してみます。

プロバイダーから提供される自宅IPアドレスは、動的に変わってしまいます。
そのため、現時点での自宅IPアドレスをそのままドメインに登録しても、IPアドレスが変わってしまうため名前解決できない期間が発生します。

そこで、DDNS(ダイナミックDNS)サービスを用いることで、この動的な自宅IPに固定のドメインを設定できます。  
今回は、DDNSとして[No-IP](https://www.noip.com/)というサービスで無料ドメインを取得し、`お名前.com`で設定したドメインを、No-IPのドメインにリダイレクトさせてみます。

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [使用ドメイン](#%E4%BD%BF%E7%94%A8%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3)
- [no-ip 側の設定](#no-ip-%E5%81%B4%E3%81%AE%E8%A8%AD%E5%AE%9A)
- [`お名前.com` での設定](#%E3%81%8A%E5%90%8D%E5%89%8Dcom-%E3%81%A7%E3%81%AE%E8%A8%AD%E5%AE%9A)
- [動作確認](#%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 使用ドメイン

以下のドメインは事前に取得しているものとします。

- `ymmmtym.serbeer.com`
  - no-ipで取得する無料ドメイン
  - 自宅のグローバルIPアドレスのAレコード
- `home.yumenomatayume.net`
  - `お名前.com` で取得するドメイン（今回はサブドメインを使用したので、追加料金はかかりませんでした。）
  - no-ipで取得した無料ドメインにリダイレクトさせる

## no-ip 側の設定

Hostnames より、自宅IPアドレスのドメインを取得します。

![no-ip](https://imgur.com/GgbigU2.png)

ただし、以下のことは注意する必要があります。

- 無料で使用できる期限がある
  - ログインして認証しないと使えなくなってしまう（少しやらかしました。）

## `お名前.com` での設定

使用したい（サブ）ドメインに、CNAMEレコードをno-ipで取得したドメインに指定します。

![onamae.con cname](https://imgur.com/zhqx4XN.png)

## 動作確認

digコマンドで確認すると、no-ipで取得したドメインがCNAMEで登録されていることがわかります。

```bash
$ dig home.yumenomatayume.net

; <<>> DiG 9.10.6 <<>> home.yumenomatayume.net
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 4207
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;home.yumenomatayume.net.		IN	A

;; ANSWER SECTION:
home.yumenomatayume.net.	3600	IN	CNAME	ymmmtym.servebeer.com.

;; AUTHORITY SECTION:
servebeer.com.		41	IN	SOA	nf1.no-ip.com. hostmaster.no-ip.com. 2018412264 90 120 604800 60

;; Query time: 20 msec
;; SERVER: 2408:210:a1c8:5600:20b:a2ff:feb7:afa5#53(2408:210:a1c8:5600:20b:a2ff:feb7:afa5)
;; WHEN: Sat Aug 14 15:58:07 JST 2021
;; MSG SIZE  rcvd: 134
```
