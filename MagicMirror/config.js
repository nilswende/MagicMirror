var locale = "de";
var displayDivsAtBottom = false;

var gas = {
	"url": "https://creativecommons.tankerkoenig.de/json/prices.php",
	"gasType": "diesel", /** choose from "e5", "e10", "diesel" */
	"stationID": "8e04a261-815f-43f8-a5ba-20d12c5b3273", /** Globus gas station Bob.-Roxheim */
	"openingTime": 800,
	"closingTime": 2000,

	"updateIntervalInMinutes": 15
};

var transport = {
	"url": "https://www.rmv.de/hapi/departureBoard",
	"stationID": "3001537", /** Enkheim */
	"lines": "U4,U7",
	"maxJourneys": "5",

	"strip": "Frankfurt (Main) ",
	"fadeDuration": 0.7 * 1000,
	"updateIntervalInMinutes": 1
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
		"weather",
		"transport"
	]
};

var temp = {
	url: "http://localhost/MagicMirror/php/temp.php",
	"sensorAttached": true /** don't forget to enter its ID in /php/temp.php */
};

var clock = {
	"showBinary": false,
	"enableBinaryEasyMode": false,
	"showWithSeconds": true
};

var date = {
	"alwaysBreakYear": false,
	"showYear": true
};

var weather = {
	"url": "http://api.openweathermap.org/data/2.5/weather",
	"cityID": "2925533", /** FFM */
	
	"updateIntervalInMinutes": 10
};

var forecast = {
	"url": "http://api.openweathermap.org/data/2.5/forecast",
	"cityID": "2925533", /** FFM */
	"fadeDuration": 0.7 * 1000, /** fade duration for forecast updates */
	"showCelcius": false,

	"updateIntervalInMinutes": 20
};
