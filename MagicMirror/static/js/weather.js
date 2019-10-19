document.addEventListener("DOMContentLoaded", function(event) {
	new alignedInterval(weather.updateIntervalInMinutes, "minutes",
							weather.update)
		.run();
});

weather.update = function () {
	var url = new URL(weather.url);
	url.search = new URLSearchParams({
			id: weather.cityID,
			lang: locale,
			units: "metric",
			appid: apiKey.openWeatherMap
		});
	fetch(url)
	.then(res => res.json())
	.then(response => {
		var weatherID = response.weather[0].id;
		var iconHtml = "<i class='wi wi-owm-" + weatherID + "'></i>";
		var temp = putMinusIfNegative(response.main.temp) + "&nbsp;°C";

		if (weatherID !== weather.iconBefore) {
			animateElement($("#currentWeather"), 800, 1, function () {
				document.querySelector("#currentWeatherIcon").innerHTML = iconHtml;
				document.querySelector("#currentWeatherTemp").innerHTML = temp;
			});
			weather.iconBefore = weatherID;
		}
		else {
			document.querySelector("#currentWeatherTemp").innerHTML = temp;
		}
	});
}
