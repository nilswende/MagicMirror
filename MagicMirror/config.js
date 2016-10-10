var locale = "de";

var gas = {
	"gasType": "diesel", //choose from "e5", "e10", "diesel"
	"stationID": "8e04a261-815f-43f8-a5ba-20d12c5b3273" //Globus gas station Bob.-Roxheim
};

//order inside each array determines top-down order on screen
var position = {
	"left": [
		"time"
	],
	"middle": [
		"gas"
	],
	"right": [
		"weather"
	]
};

var temp = {
	"sensorAttached": true //don't forget to enter its ID in /php/temp.php
};

var time = {
	"alwaysBreakYear": false,
	"showBinaryClock": false,
	"enableBinaryClockEasyMode": false,
	"showClockWithSeconds": true,
	"showDateWithYear": true
};

var weather = {
	//"latitude": 49.578263,
	//"longitude": 8.361722,
	"cityID": "6555235", //Bobenheim-Roxheim
	"fadeDuration": 0.7 * 1000, //fade duration for forecast updates
	"showCelciusInForecast": false
};
