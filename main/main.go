package main

import (
	"flag"
	"fmt"
	"github.com/nilswende/MagicMirror-server/serverlib"
	"log"
	"net/http"
)

func main() {
	port := flag.Int("port", 8080, "The port to listen on")
	dir := flag.String("dir", "/home/pi/MagicMirror", "The directory to serve")
	test := flag.Bool("test", false, "true, if the server should be started in test mode")
	flag.Parse()

	site := serverlib.NewSite(dir, test)
	http.Handle("/static/", http.FileServer(http.Dir(*dir)))
	if *test {
		http.Handle("/test/", http.FileServer(http.Dir(*dir)))
	}
	http.HandleFunc("/site/", site.NewSiteHandler)
	http.HandleFunc("/", serverlib.NewHandler)
	http.HandleFunc("/temp", serverlib.NewTempHandler)
	http.HandleFunc("/log", serverlib.NewLogHandler)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
