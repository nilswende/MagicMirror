var locale = "de";
var displayDivsAtBottom = true;

var gas = {
	//"url": "https://creativecommons.tankerkoenig.de/json/prices.php",
	"url": "http://localhost/MagicMirror/test/gas.json",
	"gasType": "diesel", /** choose from "e5", "e10", "diesel" */
	"stationID": "8e04a261-815f-43f8-a5ba-20d12c5b3273", /** Globus gas station Bob.-Roxheim */
	"openingTime": 800,
	"closingTime": 2000,

	//"updateIntervalInMinutes": 15
	"updateIntervalInMinutes": 0.0167
};

/** order inside each array determines top-down order on screen */
var position = {
	"left": [
		"time",
		"calendar"
	],
	"middle": [
		"gas"
	],
	"right": [
		"weather"
	]
};

var temp = {
	"sensorAttached": true /** don't forget to enter its ID in /php/temp.php */
};

var clock = {
	"showBinaryClock": false,
	"enableBinaryClockEasyMode": false,
	"showWithSeconds": true
};

var date = {
	"alwaysBreakYear": false,
	"showYear": true
};

var weather = {
	//"weatherUrl": "http://api.openweathermap.org/data/2.5/weather",
	"weatherUrl": "http://localhost/MagicMirror/test/weather.json",
	//"forecastUrl": "http://api.openweathermap.org/data/2.5/forecast",
	"forecastUrl": "http://localhost/MagicMirror/test/forecast.json",
	"cityID": "6555235", /** Bobenheim-Roxheim */
	"fadeDuration": 0.7 * 1000, /** fade duration for forecast updates */
	"showCelciusInForecast": false,

	"updateIntervalInMinutes": 10,
	//"forecastUpdateIntervalInMinutes": 20
	"forecastUpdateIntervalInMinutes": 0.167
};
