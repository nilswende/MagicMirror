
$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	(function updateTime() {
		var now = moment().format("LLLL").split(" ", 4);
		var date = now[0] + " " + now[1] + " " + now[2];
		if (showDateWithYear) {
			date += " " + now[3];
		}

		var clock;
		if (showClockWithSeconds) {
			clock = moment().format("LTS");
		}
		else {
			clock = moment().format("LT");
		}

		$(".clock").text(clock);
		$(".date").text(date);

		setTimeout(function () {
			updateTime();
		}, 1 * 1000);
	})();

	station_ids_string = JSON.stringify([stationID]);
	(function getGasPrice() {
		$.ajax({
			url: "https://creativecommons.tankerkoenig.de/json/prices.php",
			data: {
				ids: station_ids_string,
				apikey: tankerkoenigAPIKey
			},
			success: function (response) {
				if (response.ok) {
					showNewGasPrice(response.prices);
				} else {
					showErrorMsgIfNeeded(false);
				}
			},
			error: function (p) {
				showErrorMsgIfNeeded(true);
			}
		});
		
		function showNewGasPrice(prices) {
			var command = "prices[stationID]." + gasType;
			currentPrice = eval(command);
			$(".price").text(currentPrice + " €");
		};

		function showErrorMsgIfNeeded(ajaxError) {
			if ($(".price").text() == "") {
				if (ajaxError) {
					$(".price").text("AJAX error");
				}
				else {
					$(".price").text("bad response");
				}
			}
			/*else keep showing the last price*/
		};

		setTimeout(function () {
			getGasPrice();
		}, 5 * 60 * 1000);
	})();

	(function getCurrentWeather() {
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather",
			data: {
				id: cityID,
				lang: locale,
				units: "metric",
				appid: openWeatherMapAPIKey
			},
			success: function (response) {
				var weatherID = response.coord.weather.id;
				var iconHtml = "<i class=\"wi wi-owm-" + weatherID + "\"></i>";
				$(".currentWeather").html(iconHtml)
			},
			error: function (p) {
				/*keep showing the last weather*/
			}
		});

		setTimeout(function () {
			getGasPrice();
		}, 5 * 60 * 1000);
	})();

});
