---
date: 2021-09-08T15:58:48+09:00
description: ""
headerImage: https://imgur.com/GruKxmG.png
id: 2021/09/08/02
slug: /2021/09/08/02
tags:
- bash
- fish
- shell
- git
- github
templateKey: blog-post
title: GitHub の PR や branch を CLI で操作するシェル芸
---

GitHub で、Pull Request のクローズや Branch の削除をまとめて操作したかったので、GitHub CLI を用いてシェル芸をしてみました。

記載した実行例では、以下のリポジトリで作業しております。  
[ymmmtym/home: My home environment.](https://github.com/ymmmtym/home)

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [PR をすべて Close するシェル芸](#pr-%E3%82%92%E3%81%99%E3%81%B9%E3%81%A6-close-%E3%81%99%E3%82%8B%E3%82%B7%E3%82%A7%E3%83%AB%E8%8A%B8)
- [不要なブランチを削除するシェル芸](#%E4%B8%8D%E8%A6%81%E3%81%AA%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E3%82%92%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B%E3%82%B7%E3%82%A7%E3%83%AB%E8%8A%B8)
- [Reference（参考文献）](#reference%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## PR をすべて Close するシェル芸

bash の場合は以下のようになります。

```bash
for pr in (gh pr list | cut -f 1);do gh pr close $pr;done
```

fish の場合は以下のようになります。

```fish
for pr in (gh pr list | cut -f 1); gh pr close $pr;end
```

`grep` コマンドで特定のブランチに指定する例です。

```fish
$ for pr in (gh pr list | grep vyos | cut -f 1); gh pr close $pr;end
✓ Closed pull request #108 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202109060217-amd64.iso)
✓ Closed pull request #107 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202109050613-amd64.iso)
✓ Closed pull request #106 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202109040217-amd64.iso)
✓ Closed pull request #105 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202109030217-amd64.iso)
✓ Closed pull request #104 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202109020430-amd64.iso)
✓ Closed pull request #103 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202109010430-amd64.iso)
✓ Closed pull request #102 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202108310430-amd64.iso)
✓ Closed pull request #101 ([VyOS Rolling Release Notify] vyos-1.4-rolling-202108300430-amd64.iso)
```

## 不要なブランチを削除するシェル芸

```bash
# リモートリポジトリで削除されたブランチを、ローカルリポジトリでも削除
git remote prune origin

# ローカルリポジトリのブランチを削除
git branch -a | sed -E 's@.*remotes/origin/@@g' | xargs git push --delete origin
```

`grep` コマンドで不要なブランチを指定する例です。

```bash
$ git remote prune origin
Warning: Permanently added 'github.com,52.69.186.44' (RSA) to the list of known hosts.
Pruning origin
URL: ssh://git@github.com/ymmmtym/home
 * [pruned] origin/rolling-release/vyos-1.4-rolling-202109080217-amd64.iso

$ git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
  remotes/origin/rolling-release/vyos-1.4-rolling-202108300430-amd64.iso
  remotes/origin/rolling-release/vyos-1.4-rolling-202108310430-amd64.iso
  remotes/origin/rolling-release/vyos-1.4-rolling-202109010430-amd64.iso
  remotes/origin/rolling-release/vyos-1.4-rolling-202109020430-amd64.iso
  remotes/origin/rolling-release/vyos-1.4-rolling-202109030217-amd64.iso
  remotes/origin/rolling-release/vyos-1.4-rolling-202109040217-amd64.iso
  remotes/origin/rolling-release/vyos-1.4-rolling-202109050613-amd64.iso
  remotes/origin/rolling-release/vyos-1.4-rolling-202109060217-amd64.iso

$ git branch -a | grep vyos | sed -E 's@.*remotes/origin/@@g' | xargs git push --delete origin
Warning: Permanently added 'github.com,52.69.186.44' (RSA) to the list of known hosts.
To ssh://github.com/ymmmtym/home
 - [deleted]           rolling-release/vyos-1.4-rolling-202108300430-amd64.iso
 - [deleted]           rolling-release/vyos-1.4-rolling-202108310430-amd64.iso
 - [deleted]           rolling-release/vyos-1.4-rolling-202109010430-amd64.iso
 - [deleted]           rolling-release/vyos-1.4-rolling-202109020430-amd64.iso
 - [deleted]           rolling-release/vyos-1.4-rolling-202109030217-amd64.iso
 - [deleted]           rolling-release/vyos-1.4-rolling-202109040217-amd64.iso
 - [deleted]           rolling-release/vyos-1.4-rolling-202109050613-amd64.iso
 - [deleted]           rolling-release/vyos-1.4-rolling-202109060217-amd64.iso
```

GitHub CLI では、`xargs` コマンドで並列して実行できませんでした。

## Reference（参考文献）

- [リモートで消されたブランチが手元で残ってしまう件を解消する - Qiita](https://qiita.com/yuichielectric/items/84cd61915a1236f19221)
- [【Git】git push --delete origin {削除したいリモートブランチ名} →リモートブランチの削除 - Qiita](https://qiita.com/megu_ma/items/7533b4327dc110a9e2b8)
