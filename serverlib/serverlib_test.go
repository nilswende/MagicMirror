package serverlib

import (
	"testing"
	"net/url"
)

func TestNewRequest(t *testing.T) {
	path := "http://localhost:8080/path"
	params := url.Values{}
	params.Add("key", "value")

	expected := path + "?"
	for key, value := range params {
		for i := range value {
			expected += key + "=" + value[i]
		}
	}

	actual := newRequest(path, params)

	if actual.URL.String() != expected {
		t.Errorf("Expected %s, got %s", expected, actual.URL.String())
	}
}
