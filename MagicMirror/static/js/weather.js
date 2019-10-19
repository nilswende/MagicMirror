document.addEventListener("DOMContentLoaded", function(event) {
	new alignedInterval(weather.updateIntervalInMinutes, "minutes",
							weather.update)
		.run();
});

weather.update = function () {
	let url = new URL(weather.url);
	url.search = new URLSearchParams({
			id: weather.cityID,
			lang: locale,
			units: "metric",
			appid: apiKey.openWeatherMap
		});
	fetch(url)
	.then(res => res.json())
	.then(response => {
		let weatherID = response.weather[0].id;
		let iconHtml = "<i class='wi wi-owm-" + weatherID + "'></i>";
		let temp = putMinusIfNegative(response.main.temp) + "&nbsp;°C";

		if (weatherID !== weather.iconBefore) {
			animateElement(document.querySelector("#currentWeather"), 1, function () {
						document.querySelector("#currentWeatherIcon").innerHTML = iconHtml;
						document.querySelector("#currentWeatherTemp").innerHTML = temp;
					}
			);
			weather.iconBefore = weatherID;
		}
		else {
			document.querySelector("#currentWeatherTemp").innerHTML = temp;
		}
	});
}
