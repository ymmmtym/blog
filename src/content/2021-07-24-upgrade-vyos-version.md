---
templateKey: blog-post
id: 2021/07/24/01
title: VyOSのバージョンをアップグレードする
slug: /2021/07/24/01
date: 2021-07-24T18:30:03.125Z
headerImage: "https://imgur.com/4p9fGcp.png"
description: ""
tags:
  - vyos
  - network
---

自宅の開発環境でVyOSを使っています。

VyOSはversion1.3以降からrolling releaseで提供されており、最新版が毎日アップデートされています。

以下のサイトからダウンロードする事ができます。

https://downloads.vyos.io/?dir=rolling/current/amd64

## アップグレード手順

アップグレードは簡単な手順で実施できます。

### TL;DR

```vyos
add system image https://downloads.vyos.io/rolling/current/amd64/vyos-rolling-latest.iso

<Enter><Enter><Enter><Enter>

reboot

<y>

delete system image ? # 古いイメージを選択して削除する

<Yes>
```

最新ISOのダウンロードと適用します。

```bash
vyos@vyos02:~$ add system image https://downloads.vyos.io/rolling/current/amd64/vyos-rolling-latest.iso
Trying to fetch ISO file from https://downloads.vyos.io/rolling/current/amd64/vyos-rolling-latest.iso...
The file is 453.000 MiB.
Downloading...
[##############################################################################################################################] 100%
Download complete.
Done.
Checking for digital signature file...
Failed to download https://downloads.vyos.io/rolling/current/amd64/vyos-rolling-latest.iso.asc.
urllib.error.HTTPError: HTTP Error 404: Not Found
Do you want to continue without signature check? (yes/no) [yes] # Enterを入力
Checking SHA256 checksums of files on the ISO image... OK.
Done!
What would you like to name this image? [1.4-rolling-202107212017]:  # Enterを入力
OK.  This image will be named: 1.4-rolling-202107212017
Installing "1.4-rolling-202107212017" image.
Copying new release files...
Would you like to save the current configuration 
directory and config file? (Yes/No) [Yes]:  # Enterを入力
Copying current configuration...
Would you like to save the SSH host keys from your 
current configuration? (Yes/No) [Yes]:  # Enterを入力
Copying SSH keys...
Running post-install script...
Setting up grub configuration...
Done.

```

DLが終わったらrebootします。

```bash
vyos@vyos02:~$ reboot
Are you sure you want to reboot this system? [y/N] y

Connection to 192.168.100.3 closed by remote host.
Connection to 192.168.100.3 closed.
```

起動したら再びログインします。

この時点でバージョンは上がっているので、不要になった旧バージョンのイメージは削除します。

```bash
vyos@vyos02:~$ delete system image 
Possible completions:
  <Enter>       Execute the current command
  1.4-rolling-202107202017
                Name of image image to delete
  1.4-rolling-202107212017

vyos@vyos02:~$ delete system image 1.4-rolling-202107202017
Are you sure you want to delete the
"1.4-rolling-202107202017" image? (Yes/No) [No]: Yes # Yesを入力
Deleting the "1.4-rolling-202107202017" image...
Done

```

以上で完了です。ものすごく簡単でした。

## その他

ansibleの`vyos_command`モジュールを使って自動化したかったのですが、promptとanswerがどうもうまく動いてくれませんでした。(rebootすら動かない)

```yaml
- name: run command that requires answering a prompt
  vyos_command:
    commands:
    - command: reboot
      prompt: Are you sure you want to reboot this system? [y/N]
      answer: y
```

## Reference

- [技術メモメモ: VyOSバージョンアップ手順](https://tech-mmmm.blogspot.com/2021/01/vyos.html)
