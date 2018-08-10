package serverlib

import (
	"net/http"
	"os/exec"
	"log"
	"strings"
	"strconv"
	"math"
	"encoding/json"
	"bytes"
)

type JsonOutput struct {
	Status string
	Temp   float64
}

const sensorId = "28-0000077c42f7"
const logfilePath = "/sys/bus/w1/devices/" + sensorId + "/w1_slave"
const statusCmd = "cat " + logfilePath + " | grep crc="
const tempCmd = "cat " + logfilePath + " | grep t="

func NewTempHandler(w http.ResponseWriter, r *http.Request) {
	temp, err := getTemp()
	if err != nil {
		log.Print(err)
		writeResponse(JsonOutput{Status: "errTemp"}, w)
		return
	}
	if temp == 85.0 {
		writeResponse(JsonOutput{Status: "power-on"}, w)
		return
	}
	status, err := getStatus()
	if err != nil {
		log.Print(err)
		writeResponse(JsonOutput{Status: "errStatus"}, w)
		return
	}
	writeResponse(JsonOutput{status, temp}, w)
}

func getTemp() (float64, error) {
	output, err := exec.Command("bash", "-c", tempCmd).Output()
	if err != nil {
		return 0, err
	}
	tempStr := string(bytes.TrimSpace(output[29:]))
	temp, err := strconv.ParseFloat(tempStr, 64)
	if err != nil {
		return 0, err
	}
	temp /= 1000                    // Unit is 1/1000 °C
	temp = math.Round(temp*10) / 10 // round to 1/10 °C
	return temp, err
}

func getStatus() (string, error) {
	output, err := exec.Command("bash", "-c", statusCmd).Output()
	if err != nil {
		return "errStatus", err
	}
	status := strings.ToLower(string(bytes.TrimSpace(output[36:])))
	return status, err
}

func writeResponse(jsonOutput JsonOutput, w http.ResponseWriter) {
	jsonOut, err := json.Marshal(jsonOutput)
	if err != nil {
		log.Print(err)
		jsonOut = []byte("{'Status':'errMarshal','Temp':0}")
	}
	w.Header().Add("Content-type", "application/json")
	w.Write(jsonOut)
}
