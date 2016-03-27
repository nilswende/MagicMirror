function getCurrentWeather() {
	$.getJSON({
		//url: "http://api.openweathermap.org/data/2.5/weather",
		url: "../test/weather.json",
		data: {
			id: cityID,
			lang: locale,
			units: "metric",
			appid: openWeatherMapAPIKey
		},
		success: function (response) {
			var weatherID = response.weather[0].id;
			var iconHtml = "<i class='wi wi-owm-" + weatherID + "'></i>";
			var temp = response.main.temp.toFixed(1) + " °C";

			$(".currentWeatherIcon").html(iconHtml);
			$(".currentWeatherTemp").html(temp);
		}
	});

	setTimeout(function () {
		getCurrentWeather();
	}, 10 * 60 * 1000);
}

function getWeatherForecast() {
	$.getJSON({
		//url: "http://api.openweathermap.org/data/2.5/forecast",
		url: "../test/forecast.json",
		data: {
			id: cityID,
			lang: locale,
			units: "metric",
			appid: openWeatherMapAPIKey
		},
		success: function (response) {
			var forecastsPerDay = extractForecasts(response.list);
			writeForecastsToHtml(forecastsPerDay);
		}
	});

	function extractForecasts(list) {
		var days = {};
		var dayCounter = 0;
		for (var key in list) {
			var singleForecast = list[key];
			var main = singleForecast.main;
			var id = singleForecast.weather[0].id;
			var date = singleForecast.dt_txt.substring(0, 10);

			if (days[date] === undefined) {
				days[date] = {
					"icons": {},
					"min": singleForecast.main.temp_min,
					"max": singleForecast.main.temp_max,
					"counter": dayCounter
				};
				days[date].icons[id] = 1;
				++dayCounter;
			}
			else { //current date already in days
				if (days[date].icons[id] === undefined) {
					days[date].icons[id] = 1;
				}
				else { //id already in icons
					++days[date].icons[id];
				}

				if (main.temp_min < days[date].min) {
					days[date].min = main.temp_min;
				}
				if (main.temp_max > days[date].max) {
					days[date].max = main.temp_max;
				}
			}
		}
		//days now contains an object mapping the icon id to its count, mintemp, maxtemp per day
		for (var key in days) {
			days[key].icons = getMostCommonIconPerDay(days[key]);
		}
		return days;
	}

	//if two have the same number of ocurrences, one is returned at random
	function getMostCommonIconPerDay(day) {
		var sortedDay = sortObjectDescToArray(day.icons);
		return sortedDay[0][0];
		//return (sortedDay[0][1] == sortedDay[1][1]) ? undefined : sortedDay[0][0];
	}

	function sortObjectDescToArray(obj) {
		var sortable = [];
		for (var key in obj) {
			sortable.push([key, obj[key]]);
		}
		sortable.sort(function (a, b) { return b[1] - a[1] });
		return sortable;
	}

	function writeForecastsToHtml(days) {
		var opacity = 1.0;
		$(".forecast").each(function (i) {
			var key = getKeyByCount(days, i);
			var forecastHtml = getForecastHtml(days, key);

			$(this).delay(i * fadeDuration);
			$(this).fadeTo(fadeDuration, 0, "linear", function () {
				$(this).html(forecastHtml);
			});
			$(this).fadeTo(fadeDuration, opacity, "linear");
			opacity -= 0.1;
		});
	}

	function getKeyByCount(days, count) {
		for (key in days) {
			if (days[key].counter === count) {
				return key;
			}
		}
		return undefined;
	}

	function getForecastHtml(days, key) {
		var day = days[key];
		var dayName = moment(key).format("dd");
		var dayHtml = "<td class='forecastDay'>" + dayName + "</td>";
		var iconHtml = "<td class='forecastIcon'><i class='wi wi-owm-" + day.icons + "'></i></td>";
		var maxHtml = "<td class='forecastTemp'>" + day.max.toFixed(1);
		var minHtml = "<td class='forecastTemp'>" + day.min.toFixed(1);
		if (showCelcius) {
			maxHtml += " °C";
			minHtml += " °C";
		}
		return dayHtml + iconHtml + maxHtml + "</td>" + minHtml + "</td>";
	}

	setTimeout(function () {
		getWeatherForecast();
	}, 1 * 10 * 1000);
}


/*
iconMap = {
	"day-sunny": "clear-day",
	"night-clear": "clear-night",
	"rain": "rain",
	"snow": "snow",
	"sleet": "sleet",
	"strong-wind": "wind",
	"fog": "fog",
	"cloudy": "cloudy",
	"day-cloudy": "partly-cloudy-day",
	"night-cloudy": "partly-cloudy-night",
	"hail": "hail",
	"thunderstorm": "thunderstorm",
	"tornado":"tornado"
}

function getCurrentWeather() {
	$.ajax({
		url: "https://api.forecast.io/forecast/" + forecastAPIKey + "/" + latitude + "," + longitude,
		data: {
			lang: locale,
			units: "si",
			exclude: "minutely,hourly,alerts,flags",
			callback: "jsonp"
		},
		datatype: "jsonp",
		success: function (response) {
			var iconCode = iconMap[response.currently.icon];
			var iconHtml = "<i class='wi wi-forecast-io-" + iconCode + "'></i>";
			$(".currentWeatherIcon").html(iconHtml);

		}
	});

	setTimeout(function () {
		getCurrentWeather();
	}, 15 * 60 * 1000);
}
*/
