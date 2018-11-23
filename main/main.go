package main

import (
	"log"
	"net/http"
	"github.com/nilswende/MagicMirror-server/serverlib"
	"flag"
	"fmt"
)

func main() {
	port := flag.Int("port", 8080, "The port to listen on")
	dir := flag.String("dir", "/home/pi/", "The directory to serve")
	flag.Parse()

	http.Handle("/site/", http.StripPrefix("/site/", http.FileServer(http.Dir(*dir))))
	http.HandleFunc("/", serverlib.NewHandler)
	http.HandleFunc("/temp", serverlib.NewTempHandler)
	http.HandleFunc("/log", serverlib.NewLogHandler)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
