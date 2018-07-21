package main

import (
	"log"
	"net/http"
	"io/ioutil"
	"net/url"
)

var gasUrl = "https://creativecommons.tankerkoenig.de/json/prices.php"
var transportUrl = "https://www.rmv.de/hapi/departureBoard"
var weatherUrl = "http://api.openweathermap.org/data/2.5/weather"
var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast"

var client = &http.Client{}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("online"))
}

func gasHandler(w http.ResponseWriter, r *http.Request) {
	request := newRequest(gasUrl, r.URL.Query())
	passResponseBody(request, w)
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
		w.WriteHeader(500) // Internal Server Error
		return
	}
	defer response.Body.Close()
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		w.WriteHeader(500) // Internal Server Error
		return
	}
	// pass the status code
	w.WriteHeader(response.StatusCode)
	// pass the body (body should be a JSON file)
	w.Write(body)
}

func transportHandler(w http.ResponseWriter, r *http.Request) {
	request := newRequest(transportUrl, r.URL.Query())
	passResponseBody(request, w)
}

func weatherHandler(w http.ResponseWriter, r *http.Request) {
	request := newRequest(weatherUrl, r.URL.Query())
	passResponseBody(request, w)
}

func forecastHandler(w http.ResponseWriter, r *http.Request) {
	request := newRequest(forecastUrl, r.URL.Query())
	passResponseBody(request, w)
}

func main() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/gas", gasHandler)
	http.HandleFunc("/transport", transportHandler)
	http.HandleFunc("/weather", weatherHandler)
	http.HandleFunc("/forecast", forecastHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
