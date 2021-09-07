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

var (
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

const (
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

func init() {
	timeNow := time.Now()
	flag.StringVar(&number, "n", "01", "number")
	flag.StringVar(&templateKey, "template-key", "blog-post", "")
	flag.StringVar(&id, "id", timeNow.Format("2006/01/02/")+number, "")
	flag.StringVar(&title, "title", "title", "")
	flag.StringVar(&slug, "slug", timeNow.Format("/2006/01/02/")+number, "")
	flag.StringVar(&date, "date", timeNow.Format(time.RFC3339), "")
	flag.StringVar(&headerImage, "header-image", "https://imgur.com/pIdoiWV.jpg", "")
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
