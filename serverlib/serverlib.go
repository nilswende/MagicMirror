package serverlib

import (
	"log"
	"net/http"
	"net/url"
	"io"
	"time"
)

var pathMapping = map[string]string{
	"/gas":       "https://creativecommons.tankerkoenig.de/json/prices.php",
	"/transport": "https://www.rmv.de/hapi/departureBoard",
	"/weather":   "http://api.openweathermap.org/data/2.5/weather",
	"/forecast":  "http://api.openweathermap.org/data/2.5/forecast",
}

var client = &http.Client{
	Timeout: time.Second * 10,
}

func NewHandler(w http.ResponseWriter, r *http.Request) {
	if externalUrl, ok := pathMapping[r.URL.Path]; ok {
		request := newRequest(externalUrl, r.URL.Query())
		passResponseBody(request, w)
	} else {
		w.Write([]byte("online"))
	}
}

func newRequest(url string, params url.Values) (*http.Request) {
	request, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Print(err)
	}
	request.Header.Add("Accept", "application/json")
	query := request.URL.Query()

	for key, value := range params {
		for i := range value {
			query.Add(key, value[i])
		}
	}
	request.URL.RawQuery = query.Encode()
	return request
}

func passResponseBody(request *http.Request, w http.ResponseWriter) {
	response, err := client.Do(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer response.Body.Close()
	// pass the body (body should be a JSON file)
	_, err = io.Copy(w, response.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// pass the status code
	w.WriteHeader(response.StatusCode)
}
