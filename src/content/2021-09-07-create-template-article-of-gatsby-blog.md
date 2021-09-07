---
date: 2021-09-07T18:15:58+09:00
description: ""
headerImage: https://imgur.com/eeaOT5E.jpg
id: 2021/09/07/02
slug: /2021/09/07/02
tags:
- go
- gatsby
- blog
templateKey: blog-post
title: 【Gatsby】 個人ブログ記事のテンプレートファイルを Go 言語で作成する
---

[yumenomatayume's Blog](https://blog.ymmmtym.com/)

[ymmmtym/blog: yumenomatayume's personal blog](https://github.com/ymmmtym/blog)

Gatsby で個人ブログを運営しております。
ブログ記事は markdown ファイルで管理していますが、記事を新規作成するとき、「前回の記事のファイルをコピーして書き換える」ということを行っており、少し手間だと感じたので CLI で作成できるようにしました。

たとえば、zenn だと `npx zenn new:article` コマンドで新規記事を作成できます。

[zenn-dev/zenn-editor: Convert markdown to html in Zenn format](https://github.com/zenn-dev/zenn-editor)

## 目次

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [記事ファイルの構成について](#%E8%A8%98%E4%BA%8B%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E6%A7%8B%E6%88%90%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
- [テンプレートファイルを作成するスクリプトの準備](#%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%AE%E6%BA%96%E5%82%99)
- [`package.json` にスクリプト実行コマンドを追記](#packagejson-%E3%81%AB%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E5%AE%9F%E8%A1%8C%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%92%E8%BF%BD%E8%A8%98)
- [Reference（参考文献）](#reference%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 記事ファイルの構成について

`src/content/` ディレクトリに `YYYY-MM-DD-title.md` というファイル名で記事を管理しています。

記事の頭にはメタデータが特定のルールで記載しています。

```yaml
---
templateKey: blog-post # 固定
id: 2021/08/19/01 # YYYY/MM/DD/その日に書いた記事の順番
title: GitHub Actions の schedule が停止した時の再開方法 # 記事のタイトル、h1扱い
slug: /2021/08/19/01
date: 2021-08-19T21:30:00.125Z
headerImage: "https://imgur.com/z1NIlzb.png" # アイキャッチの画像
description: ""
tags: # タグをリストで記載
  - github
  - github-actions
---
```

[このサイトについて | yumenomatayume's Blog](https://blog.ymmmtym.com/about#%E3%83%A1%E3%82%BF%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

これを毎回手入力で作成するのは手間なので、テンプレートを用意して効率的に作成する準備をします。

## テンプレートファイルを作成するスクリプトの準備

勉強も兼ねて、Go 言語で実装してみます。実現したい要件は以下の通りです。

- 引数として、メタデータを受け取る -> `flag` パッケージ
- 引数がない場合は、デフォルトの値に設定される -> `yaml` パッケージ
  - `id`  や `date` などは自動で取得する -> `time` パッケージ

作成したスクリプトは以下のようになりました。[^1]

```go:title=bin/create-template-content.go
package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/goccy/go-yaml"
)

var ( // 使用する引数とそれに必要な変数
	templateKey string
	timeNow     string
	id          string
	title       string
	slug        string
	date        string
	headerImage string
	description string
	tags        string
	number      string
	name        string
	path        string
	arr         []string
	toc         bool
)

const ( // doctocより目次を作る時に必要な記載内容
	toc_exist_txt string = `## 目次
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->`
	toc_not_exist_txt string = `<!-- DOCTOC SKIP -->`
)

func get_toc_txt(toc bool) string {
	if toc == true {
		return toc_exist_txt
	} else {
		return toc_not_exist_txt
	}
}

func init() { // 引数の初期化
	timeNow := time.Now()
	flag.StringVar(&number, "n", "01", "number")
	flag.StringVar(&templateKey, "template-key", "blog-post", "")
	flag.StringVar(&id, "id", timeNow.Format("2006/01/02/")+number, "")
	flag.StringVar(&title, "title", "title", "")
	flag.StringVar(&slug, "slug", timeNow.Format("/2006/01/02/")+number, "")
	flag.StringVar(&date, "date", timeNow.Format(time.RFC3339), "")
	flag.StringVar(&headerImage, "header-image", "https://imgur.com/pIdoiWV.jpg", "") //デフォルトのアイキャッチ画像を設定
	flag.StringVar(&description, "description", "", "")
	flag.StringVar(&tags, "tags", "", "")
	flag.StringVar(&name, "name", "draft", "")
	flag.StringVar(&path, "path", "src/content/"+timeNow.Format("2006-01-02-")+name+".md", "")
	flag.BoolVar(&toc, "toc", true, "Create TOC")
	flag.Parse()
}

func main() {
	arr := strings.Split(tags, ",")
	path := "src/content/" + time.Now().Format("2006-01-02-") + name + ".md"

	m := map[interface{}]interface{}{
		"templateKey": templateKey,
		"id":          id,
		"title":       title,
		"slug":        slug,
		"date":        date,
		"headerImage": headerImage,
		"description": description,
		"tags":        arr,
	}

	data, err := yaml.Marshal(m)
	if err != nil {
		log.Fatal(err)
		return
	}

	fp, err := os.Create(path)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer fp.Close()

	fp.WriteString("---\n" + string(data) + "---\n\n" + get_toc_txt(toc))

	// Print
	fmt.Println(string(data))
	fmt.Println("✔ Created", path)

}
```

[blog/create-template-content.go at master · ymmmtym/blog](https://github.com/ymmmtym/blog/blob/master/bin/create-template-content.go)

`-h` オプションでヘルプを見ることができます。`flag` モジュールを使うと簡単にカスタムコマンドが作れるので非常に便利ですね。

```bash
$ go run ./bin/create-template-content.go -h
Usage of ./bin/create-template-content:
  -date string
    	 (default "2021-09-07T17:09:03+09:00")
  -description string
    	
  -header-image string
    	 (default "https://imgur.com/pIdoiWV.jpg")
  -id string
    	 (default "2021/09/07/01")
  -n string
    	number (default "01")
  -name string
    	 (default "draft")
  -path string
    	 (default "src/content/2021-09-07-draft.md")
  -slug string
    	 (default "/2021/09/07/01")
  -tags string
    	
  -template-key string
    	 (default "blog-post")
  -title string
    	 (default "title")
  -toc
    	Create TOC (default true)
```

## `package.json` にスクリプト実行コマンドを追記

`go build ./bin/create-template-content.go` を実行して、バイナリ実行ファイルをビルドします。
`./bin/create-template-content` が作成されるので、`package.json` の `scripts` に以下の内容を追記します。

```json:title=package.json
  "scripts": {
    "content:new": "./bin/create-template-content"
```

これで、`npm run content:new` を実行するだけで、新規記事を作成できます。

`npm run` コマンドで引数を使う場合は、引数の前に `--`  が必要です。
渡した後の引数は、ダブルクウォートで囲まれるように変換されるので、引数にバッククウォートや環境変数があるとうまく動作してくれないようです。

```bash
$ npm run content:new -- -name=terminal-bracketed-paste-mode -title='ターミナルでペーストしたら不要文字（`0~`, `1~`）が入ってしまった時の対処法'

> blog@1.0.0 content:new
> ./bin/create-template-content "-name=terminal-bracketed-paste-mode" "-title=ターミナルでペーストしたら不要文字（`0~`, `1~`）が入ってしまった時の対処法"

sh: 0~: command not found
sh: 1~: command not found
date: 2021-09-07T17:07:23+09:00
description: ""
headerImage: https://imgur.com/pIdoiWV.jpg
id: 2021/09/07/01
slug: /2021/09/07/01
tags:
- ""
templateKey: blog-post
title: ターミナルでペーストしたら不要文字（, ）が入ってしまった時の対処法

✔ Created src/content/2021-09-07-terminal-bracketed-paste-mode.md
```

個人で使う分には、`./bin/create-template-content` をそのまま実行した方が楽かもしれないです。

## Reference（参考文献）

やりたいことの方向性は、以下の記事を参考にしました。

- [Gatsby製のマークダウンブログで記事ファイルをテンプレートから自動生成する | きむそん.dev](https://kimuson.dev/blog/gatsby/gatsby_markdown_template/)

デフォルトのアイキャッチ画像は以下で作成しました。

- [5分でできる簡単アイキャッチ画像の作り方！WordPressブログの設定方法まで徹底解説 | 初心者のためのブログ始め方講座](https://www.xserver.ne.jp/blog/wordpress-blog-eyecatching/#%EF%BC%91%EF%BC%8ECanva%E3%81%AB%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%99%E3%82%8B)

Go 言語について

- [golang でコマンドライン引数を使う - Qiita](https://qiita.com/nakaryooo/items/2d0befa2c1cf347800c3)
- [Go言語(golang) ファイルの読み書き、作成、存在確認、一行ずつ処理、コピー など - golangの日記](https://golang.hateblo.jp/entry/2018/11/09/163000#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AE%E4%BD%9C%E6%88%90%E8%AA%AD%E3%81%BF%E6%9B%B8%E3%81%8D%E4%B8%A1%E6%96%B9---Create)
- [Goでコマンドラインツールを試す - abcdefg.....](https://pppurple.hatenablog.com/entry/2018/07/31/030631)

- [Go-lang 自習 10日目「コマンドライン引数」｜かずさん@コミュニティ・エンジニア｜note](https://note.com/llc_luck/n/n6def27924313)
- [go/format.go at master · golang/go](https://github.com/golang/go/blob/master/src/time/format.go)
- [Go 言語で複数行にまたがる文字列を作る - nise_nabeの日記](https://nisenabe.hatenablog.com/entry/2013/06/09/155207)

NPM

- [npm runでコマンドライン引数を渡す方法 - Qiita](https://qiita.com/qrusadorz/items/db042f65be95f34d6271)

[^1]: 絶賛リファクタリング中です。
