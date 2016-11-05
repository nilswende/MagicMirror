function updateCurrentWeather() {
	var timer = new interval(weather.updateIntervalInMinutes * 60000, 
							aux_updateCurrentWeather);
	timer.run();
}

function aux_updateCurrentWeather() {
	$.getJSON({
		url: weather.weatherUrl,
		data: {
			id: weather.cityID,
			lang: locale,
			units: "metric",
			appid: apiKey.openWeatherMap
		},
		success: function (response) {
			var weatherID = response.weather[0].id;
			var iconHtml = "<i class='wi wi-owm-" + weatherID + "'></i>";
			var temp = response.main.temp.toFixed(1) + "&nbsp;°C";

			$("#currentWeatherIcon").html(iconHtml);
			$("#currentWeatherTemp").html(temp);
		}
	});
}

function updateWeatherForecast() {
	var timer = new interval(weather.forecastUpdateIntervalInMinutes * 60000, 
							aux_updateWeatherForecast);
	timer.run();
}

function aux_updateWeatherForecast() {
	$.getJSON({
		url: weather.forecastUrl,
		data: {
			id: weather.cityID,
			lang: locale,
			units: "metric",
			appid: apiKey.openWeatherMap
		},
		success: function (response) {
			var forecastsPerDay = extractForecasts(response.list);
			writeForecastsToHtml(forecastsPerDay);
		}
	});

	function extractForecasts(list) {
		var days = {};
		var dayCounter = 0;
		for (let key in list) {
			let singleForecast = list[key];
			let main = singleForecast.main;
			let id = singleForecast.weather[0].id;
			let date = singleForecast.dt_txt.substring(0, 10);
			let hour = singleForecast.dt_txt.substring(12, 13);
			let isDay = (hour === "00" || hour === "03") ? false : true; // skip weather icons at night
			
			if (days[date] === undefined) {
				days[date] = {
					"icons": {},
					"min": main.temp_min,
					"max": main.temp_max,
					"counter": dayCounter
				};
				if (isDay) {
					days[date].icons[id] = 1;
				}
				
				++dayCounter;
			}
			else { //current date already in days
				if (isDay) {
					if (days[date].icons[id] === undefined) {
						days[date].icons[id] = 1;
					}
					else { //id already in icons
						++days[date].icons[id];
					}
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
		for (let key in days) {
			days[key].icons = getMostCommonIconPerDay(days[key]);
		}
		return days;
	}

	//if two have the same number of ocurrences, the one ocurring first is returned
	function getMostCommonIconPerDay(day) {
		var sortedDay = sortObjectDescToArray(day.icons);
		return sortedDay[0][0];
		//return (sortedDay[0][1] == sortedDay[1][1]) ? undefined : sortedDay[0][0];
	}

	function sortObjectDescToArray(obj) {
		var sortable = [];
		for (let key in obj) {
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
			var row = $(this);
			
			row.delay(i * weather.fadeDuration);
			row.fadeTo(weather.fadeDuration, 0, "linear", function () {
				row.html(forecastHtml);
			});
			row.fadeTo(weather.fadeDuration, opacity, "linear");
			opacity -= 0.1;
		});
	}

	function getKeyByCount(days, count) {
		for (let key in days) {
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
		var maxHtml = "<td class='forecastTemp'>" + putMinusIfNegative(day.max);
		var minHtml = "<td class='forecastTemp'>" + putMinusIfNegative(day.min);
		if (weather.showCelciusInForecast) {
			maxHtml += "&nbsp;°C";
			minHtml += "&nbsp;°C";
		}
		return dayHtml + iconHtml + maxHtml + "</td>" + minHtml + "</td>";
	}

	function putMinusIfNegative(temp) {
		if (temp < 0.0) {
			return "−" + (-temp).toFixed(1);
		}
		return temp.toFixed(1);
	}
}
