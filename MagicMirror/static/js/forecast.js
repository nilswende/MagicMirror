document.addEventListener("DOMContentLoaded", function(event) {
	new alignedInterval(forecast.updateIntervalInMinutes, "minutes",
							forecast.update, forecast.updateIntervalInMinutes * 1000)
		.run();
});

forecast.update = function () {
	var url = new URL(forecast.url);
	url.search = new URLSearchParams({
			id: forecast.cityID,
			lang: locale,
			units: "metric",
			appid: apiKey.openWeatherMap
		});
	fetch(url)
	.then(res => res.json())
	.then(response => {
		var forecastsPerDay = extractForecasts(response.list);
		writeForecastsToHtml(forecastsPerDay);
	});

	function extractForecasts(list) {
		var days = {};
		for (var i = 0; i < list.length; i++) {
			let singleForecast = list[i];
			var main = singleForecast.main;
			var id = singleForecast.weather[0].id;
			var date = singleForecast.dt_txt.substring(0, 10);
			let hour = singleForecast.dt_txt.substring(12, 13);
			var isDay = (hour !== "00" && hour !== "03"); /** skip weather icons at night */

			if (days[date] === undefined) {
				days[date] = {
					"icons": {},
					"min": main.temp,
					"max": main.temp
				};
				if (isDay) {
					days[date].icons[id] = 1;
				}
			}
			else { /** current date already in days */
				if (isDay) {
					if (days[date].icons[id] === undefined) {
						days[date].icons[id] = 1;
					}
					else { /** id already in icons */
						++days[date].icons[id];
					}
				}

				if (main.temp > days[date].max) {
					days[date].max = main.temp;
				}
				else if (main.temp < days[date].min) {
					days[date].min = main.temp;
				}
			}
		}
		/** days now contains an object mapping the icon id to its count, mintemp, maxtemp per day */
		for (let day in days) {
			days[day].icons = getMostCommonIconPerDay(days[day]);
		}
		return days;
	}

	/** if two have the same number of ocurrences, the one ocurring first is returned */
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
		var sortedKeys = Object.keys(days).sort();
		$(".forecast").each(function (i) {
			let key = sortedKeys[i];
			var forecastHtml = getForecastHtml(days, key);
			var row = $(this);

			row.delay(i * forecast.fadeDuration);
			animateElement(row, forecast.fadeDuration, opacity, function () {
				row.html(forecastHtml);
			});
			opacity -= 0.1;
		});
	}

	function getForecastHtml(days, key) {
		var day = days[key];
		let dayName = moment(key).format("dd");
		var dayHtml = "<td class='forecastDay'>" + dayName + "</td>";
		var iconHtml = "<td class='forecastIcon'><i class='wi wi-owm-" + day.icons + "'></i></td>";
		var maxHtml = "<td class='forecastTemp'>" + putMinusIfNegative(day.max);
		var minHtml = "<td class='forecastTemp'>" + putMinusIfNegative(day.min);
		if (forecast.showCelcius) {
			maxHtml += "&nbsp;°C";
			minHtml += "&nbsp;°C";
		}
		return dayHtml + iconHtml + maxHtml + "</td>" + minHtml + "</td>";
	}
}
