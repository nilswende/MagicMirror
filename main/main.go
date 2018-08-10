package main

import (
	"log"
	"net/http"
	"github.com/nilswende/MagicMirror-server/serverlib"
)

func main() {
	http.HandleFunc("/", serverlib.NewHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
