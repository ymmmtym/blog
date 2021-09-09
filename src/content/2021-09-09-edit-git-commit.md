---
date: 2021-09-09T11:09:09+09:00
description: ""
headerImage: https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png
id: 2021/09/09/02
slug: /2021/09/09/02
tags:
- git
templateKey: blog-post
title: git commit の削除と編集
---

## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [コミットの取り消し](#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E5%8F%96%E3%82%8A%E6%B6%88%E3%81%97)
- [コミットの打ち消し](#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E6%89%93%E3%81%A1%E6%B6%88%E3%81%97)
- [コミットの修正](#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E4%BF%AE%E6%AD%A3)
  - [コミットの上書き](#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E4%B8%8A%E6%9B%B8%E3%81%8D)
  - [コミットの統合](#%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%81%AE%E7%B5%B1%E5%90%88)
  - [リモートリポジトリに上書きしたコミットを push するとき](#%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%83%AA%E3%83%9D%E3%82%B8%E3%83%88%E3%83%AA%E3%81%AB%E4%B8%8A%E6%9B%B8%E3%81%8D%E3%81%97%E3%81%9F%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88%E3%82%92-push-%E3%81%99%E3%82%8B%E3%81%A8%E3%81%8D)
- [Reference（参考文献）](#reference%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## コミットの取り消し

`git reset` コマンドでコミットの取り消しができます。[^1]

`--soft` オプションをつけると、`git commit` を取り消すことができます。
（変更内容は Staged 状態になります。）

```bash
git reset --soft HEAD^
```

`--hard` オプションをつけると、`git add` と `git commit` を取り消すことができます。
（取り消した作業内容は消えてしまうので、使用するときは注意が必要です。）

```bash
git reset --hard HEAD^
```

- `HEAD^` で直前のコミットになります。
- `HEAD~{n}` で n 個前のコミットになります。

## コミットの打ち消し

`git revert` コマンドでコミットの打ち消しができます。[^2]

`git log` コマンドを実行して、戻したい状態のコミット ID を調べた上で次のようなコマンドを実行します。

```bash
git revert ${commit_id}
```

すると、エディターが開かれるのでコミットメッセージ（デフォルトは `Revert "直前のコミットメッセージ"`）を設定すると、コミットの打ち消しができます。

## コミットの修正

### コミットの上書き

直前のコミットメッセージを修正するには次のようにします。

```bash
git commit --amend
```

`--amend` オプションはコミットメッセージの修正だけでなく、 `git add` したファイルを直前のコミットに含めることもできます。

```bash
git commit --amend -a -C HEAD --date=now
```

- `-a` オプションで、`git add -A` を省略できます。
- `-C HEAD` オプションで、直前のコミットメッセージをそのまま使用できます。
- `--date=now` オプションで、コミット日時を現在のものに変更できます。

### コミットの統合

複数のコミットを 1 つにまとめるときは、`git rebase` コマンドを使用します。（`HEAD~2` は直近の 2  コミットを意味します。）

```bash
git rebase -i HEAD~2
```

次のようなエディターが開かれるので、各コミットを変数できます。

よく使うのは、一番古いコミット（先頭のコミット）**以外**の `pick` を `f(fixup)` にすることで、1つのコミットにまとめることができます。

```bash
pick a460786 test                                                                    
f b460786 test # 1列目を pick -> f(fixup)に変更

# Rebase eb80c6a..b460786 onto eb80c6a (1 command)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
```

### リモートリポジトリに上書きしたコミットを push するとき

すでにリモートリポジトリに push した後コミットを修正した場合、
再度 push する時に`-f(--force)` オプションをつける必要があります。

```bash
git push origin main -f
```

## Reference（参考文献）

- [[Git]コミットの取り消し、打ち消し、上書き - Qiita](https://qiita.com/shuntaro_tamura/items/06281261d893acf049ed)

[^1]: コミットの取り消しとは、コミット自体を無かったことにすることです。
[^2]: コミットの打ち消しとは、コミット自体を削除せずコミットした内容が打ち消されるように新たなコミットをすることです。
