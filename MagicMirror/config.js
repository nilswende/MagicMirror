var locale = "de";
var displayDivsAtBottom = false;

var gas = {
	"url": "http://localhost/gas",
	"gasType": "diesel", /** choose from "e5", "e10", "diesel" */
	"stationID": "8e04a261-815f-43f8-a5ba-20d12c5b3273", /** Globus gas station Bob.-Roxheim */
	"openingTime": 800,
	"closingTime": 2000,

	"updateIntervalInMinutes": 15
};

var transport = {
	"url": "http://localhost/transport",
	"stationID": "3001537", /** Enkheim */
	"lines": "U4,U7",
	"maxJourneys": "4",

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
	url: "http://localhost/temp",
	"sensorAttached": true /** don't forget to enter its ID in the server */
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
	"url": "http://localhost/weather",
	"cityID": "2925533", /** FFM */
	
	"updateIntervalInMinutes": 10
};

var forecast = {
	"url": "http://localhost/forecast",
	"cityID": "2925533", /** FFM */
	"fadeDuration": 0.7 * 1000, /** fade duration for forecast updates */
	"showCelcius": false,

	"updateIntervalInMinutes": 20
};
