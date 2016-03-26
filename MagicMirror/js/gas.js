﻿function getGasPrice() {
	var station_ids_string = JSON.stringify([stationID]);

	$.get({
		//url: "https://creativecommons.tankerkoenig.de/json/prices.php",
		url: "../test/gas.json",
		data: {
			ids: station_ids_string,
			apikey: tankerkoenigAPIKey
		},
		success: function (response) {
			if (response.ok) {
				showNewGasPrice(response.prices);
			}
		}
	});

	function showNewGasPrice(prices) {
		var currentPrice = prices[stationID][gasType];
		currentPrice = currentPrice.toString().slice(0, -1);
		$(".price").html(currentPrice + "<span class='milli'> 9 </span> €");
	};

	setTimeout(function () {
		getGasPrice();
	}, 15 * 60 * 1000);
}
