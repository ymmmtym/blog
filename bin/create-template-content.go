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
	id          string
	title       string
	slug        string
	date        string
	headerImage string
	description string
	tags        string
	number      int
	name        string
	path        string
	arr         []string
	toc         bool
)

const (
	content       string = `src/content/`
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
	flag.IntVar(&number, "n", 1, "number")
	flag.StringVar(&templateKey, "template-key", "blog-post", "")
	flag.StringVar(&title, "title", "draft", "title")
	flag.StringVar(&date, "date", time.Now().Format(time.RFC3339), "UTC format")
	flag.StringVar(&headerImage, "header-image", "https://imgur.com/pIdoiWV.jpg", "")
	flag.StringVar(&description, "description", "", "description")
	flag.StringVar(&tags, "tags", "", "-tags=tag1,tag2,...")
	flag.StringVar(&name, "name", "draft", "")
	flag.BoolVar(&toc, "toc", true, "Create TOC")
	flag.Parse()
}

func timeToString(t time.Time, layout string) string {
	str := t.Format(layout)
	return str
}

func stringToTime(str string, layout string) time.Time {
	t, _ := time.Parse(layout, str)
	return t
}

func main() {
	id := stringToTime(date, time.RFC3339).Format("2006/01/02/") + fmt.Sprintf("%02d", number)
	slug := "/" + id
	arr := strings.Split(tags, ",")
	path := content + stringToTime(date, time.RFC3339).Format("2006-01-02-") + name + ".md"

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
