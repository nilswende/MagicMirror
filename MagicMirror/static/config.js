document.addEventListener("DOMContentLoaded", function(event) {
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
	"lines": "U4,U7,U4E,U7E",
	"maxJourneys": 4,

	"strip": "Frankfurt (Main) ",
	"updateIntervalInMinutes": 1,
	"detail" : {
		"url": "http://localhost/transportDetail"
	}
};

var temp = {
	url: "http://localhost/temp"
};

var weather = {
	"url": "http://localhost/weather",
	"cityID": "2925533", /** FFM */
	
	"updateIntervalInMinutes": 10
};

var forecast = {
	"url": "http://localhost/forecast",
	"cityID": "2925533", /** FFM */
	"showCelcius": false,

	"updateIntervalInMinutes": 20
};

var log = {
	"url": "http://localhost/log"
};
