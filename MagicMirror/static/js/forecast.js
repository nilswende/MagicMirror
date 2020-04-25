document.addEventListener("DOMContentLoaded", function(event) {
	if (contentExists("weather")) {
		new alignedInterval(forecast.updateIntervalInMinutes, "minutes",
								forecast.update, forecast.updateIntervalInMinutes * 1000)
			.run();
	}
});

forecast.update = function () {
	let url = new URL(forecast.url);
	url.search = new URLSearchParams({
			id: forecast.cityID,
			lang: locale,
			units: "metric",
			appid: apiKey.openWeatherMap
		});
	fetch(url)
	.then(res => res.json())
	.then(response => {
		let forecastsPerDay = extractForecasts(response.list);
		writeForecastsToHtml(forecastsPerDay);
	});

	function extractForecasts(list) {
		let days = {};
		for (let i = 0; i < list.length; i++) {
			let singleForecast = list[i];
			let main = singleForecast.main;
			let id = singleForecast.weather[0].id;
			let date = singleForecast.dt_txt.substring(0, 10);
			let hour = singleForecast.dt_txt.substring(12, 13);
			let isDay = (hour !== "00" && hour !== "03"); /** skip weather icons at night */

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
		let sortedDay = sortObjectDescToArray(day.icons);
		return sortedDay[0][0];
		//return (sortedDay[0][1] == sortedDay[1][1]) ? undefined : sortedDay[0][0];
	}

	function sortObjectDescToArray(obj) {
		let sortable = [];
		for (let key in obj) {
			sortable.push([key, obj[key]]);
		}
		sortable.sort(function (a, b) { return b[1] - a[1] });
		return sortable;
	}

	function writeForecastsToHtml(days) {
		let sortedKeys = Object.keys(days).sort();
		let htmls = sortedKeys.map(key => getForecastHtml(key, days[key]));

		let i = 0;
		animate(document.querySelector(".forecast"));

		function animate(row) {
			if (row !== null) {
				animateElement(row, 1.0 - i * 0.1,
						function () {
							this.innerHTML = htmls[i];
						},
						function () {
							i++;
							animate(this.nextElementSibling);
						}
				);
			}
		}
	}

	function getForecastHtml(key, day) {
		let dayName = moment(key).format("dd");
		let dayHtml  = "<td class='forecastDay'>" + dayName + "</td>";
		let iconHtml = "<td class='forecastIcon'><i class='wi wi-owm-" + day.icons + "'></i></td>";
		let maxHtml  = "<td class='forecastTemp'>" + putMinusIfNegative(day.max);
		let minHtml  = "<td class='forecastTemp'>" + putMinusIfNegative(day.min);
		if (forecast.showCelcius) {
			maxHtml += "&nbsp;°C";
			minHtml += "&nbsp;°C";
		}
		return dayHtml + iconHtml + maxHtml + "</td>" + minHtml + "</td>";
	}
}
