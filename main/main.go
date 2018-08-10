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
	flag.Parse()
	http.HandleFunc("/", serverlib.NewHandler)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
