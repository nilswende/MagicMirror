$(document).ready(() => {
	/** set moment.js to desired locale */
	moment.locale(locale);
});

var locale = "de";

var position = {
	"displayDivsAtBottom" : false
};

var toggle = {
	"transport" : {
		"cancellation" : true
	}
}

var gas = {
	"url": "/test/gas.json",
	"gasType": "diesel", /** choose from "e5", "e10", "diesel" */
	"stationID": "8e04a261-815f-43f8-a5ba-20d12c5b3273", /** Globus gas station Bob.-Roxheim */
	"openingTime": 800,
	"closingTime": 2000,

	"updateIntervalInMinutes": 1
};

var transport = {
	"url": "/test/transport_h_old.json",
	"stationID": "3001537", /** Enkheim */
	"lines": "U4,U7,U4E,U7E",
	"maxJourneys": "5",

	"strip": "Frankfurt (Main) ",
	"fadeDuration": 0.7 * 1000,
	"updateIntervalInMinutes": 1,
	"detail" : {
		"url": "/test/transportDetail_h.json"
	}
};

var temp = {
	url: "/test/temp.json"
};

var weather = {
	"url": "/test/weather.json",
	"cityID": "6555235", /** Bobenheim-Roxheim */
	
	"updateIntervalInMinutes": 1
};

var forecast = {
	"url": "/test/forecast.json",
	"cityID": "6555235", /** Bobenheim-Roxheim */
	"fadeDuration": 0.7 * 1000, /** fade duration for forecast updates */
	"showCelcius": false,

	"updateIntervalInMinutes": 1
};

var log = {
	"url": "http://localhost/log"
};
