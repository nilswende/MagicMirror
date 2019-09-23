package serverlib

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"net/url"
	"path"
	"path/filepath"
)

type Site struct {
	dir  *string
	test *bool
	tmpl *template.Template
}

type Config struct {
	Position *struct {
		Left   []string
		Middle []string
		Right  []string
	}
	Time *struct {
		ShowWithSeconds      bool
		Binary               bool
		EnableBinaryEasyMode bool
		ShowYear             bool
		AlwaysBreakYear      bool
	}
	Temp *struct {
		SensorAttached bool
	}
	Test bool
}

func EmptyConfig() *Config {
	config := Config{}
	config.Position = &struct {
		Left   []string
		Middle []string
		Right  []string
	}{}
	config.Time = &struct {
		ShowWithSeconds      bool
		Binary               bool
		EnableBinaryEasyMode bool
		ShowYear             bool
		AlwaysBreakYear      bool
	}{}
	config.Temp = &struct {
		SensorAttached bool
	}{}
	return &config
}

func NewSite(dir *string, test *bool) *Site {
	t := createTemplates(dir)
	return &Site{dir, test, t}
}

func createTemplates(dir *string) *template.Template {
	html := path.Join(*dir, "html")
	partials := path.Join(html, "partials")
	t := template.Must(template.ParseGlob(path.Join(partials, "*.html")))
	template.Must(t.ParseGlob(path.Join(html, "*.html")))
	return t
}

func (site Site) NewSiteHandler(w http.ResponseWriter, r *http.Request) {
	config := site.createConfig(r.URL.Query())
	t, err := site.tmpl.Clone()
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	container, name := config.compileContainer(path.Join(*site.dir, "html", "partials", "container.html"))
	template.Must(t.New(*name).Parse(*container))
	index := t.Lookup("index.html")
	w.Header().Set("Content-Type", "text/html")
	err = index.Execute(w, config)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
}

func (site Site) createConfig(params url.Values) *Config {
	configStrings := params["config"]
	var config *Config
	if len(configStrings) > 0 {
		configStr := configStrings[0]
		config = parseConfig(&configStr)
	} else {
		config = EmptyConfig()
	}
	config.Test = *site.test
	return config
}

func parseConfig(configStr *string) *Config {
	var config Config
	jsonBytes := []byte(*configStr)
	err := json.Unmarshal(jsonBytes, &config)
	if err != nil {
		fmt.Println(err)
		config = *EmptyConfig()
	}
	return &config
}

func (config Config) compileContainer(containerFilename string) (*string, *string) {
	name := filepath.Base(containerFilename)
	containerTmpl, err := readFile(&containerFilename)
	if err != nil {
		fmt.Println(err)
	}
	position := config.Position
	left := concatTemplates(&position.Left)
	middle := concatTemplates(&position.Middle)
	right := concatTemplates(&position.Right)
	container := fmt.Sprintf(*containerTmpl, *left, *middle, *right)
	return &container, &name
}

func readFile(filename *string) (*string, error) {
	b, err := ioutil.ReadFile(*filename)
	if err != nil {
		return nil, err
	}
	s := string(b)
	return &s, nil
}

func concatTemplates(chosen *[]string) *string {
	s := ""
	for _, v := range *chosen {
		s += fmt.Sprintf("{{template \"%s\" .}}", v)
	}
	return &s
}
