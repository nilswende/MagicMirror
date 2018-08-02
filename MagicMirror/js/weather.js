weather.update = function () {
	var timer = new alignedInterval(weather.updateIntervalInMinutes, "minutes",
							weather.aux_update);
	timer.run();
}

weather.aux_update = function () {
	$.getJSON({
		url: weather.url,
		data: {
			id: weather.cityID,
			lang: locale,
			units: "metric",
			appid: apiKey.openWeatherMap
		},
		success: function (response) {
			var weatherID = response.weather[0].id;
			var iconHtml = "<i class='wi wi-owm-" + weatherID + "'></i>";
			var temp = putMinusIfNegative(response.main.temp) + "&nbsp;°C";

			if (weather.iconBefore === undefined) {
				$("#currentWeatherIcon").html(iconHtml);
				$("#currentWeatherTemp").html(temp);
				weather.iconBefore = weatherID;
			}
			else {
				if (weatherID !== weather.iconBefore) {
					animateElement($("#currentWeather"), 800, 1, function () {
						$("#currentWeatherIcon").html(iconHtml);
						$("#currentWeatherTemp").html(temp);
					});
					weather.iconBefore = weatherID;
				}
				else {
					$("#currentWeatherTemp").html(temp);
				}
			}
		}
	});
}
