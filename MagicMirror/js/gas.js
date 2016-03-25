function getGasPrice() {
	var station_ids_string = JSON.stringify([stationID]);

	$.get({
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
		}
	});
		
	function showNewGasPrice(prices) {
		var command = "prices[stationID]." + gasType;
		currentPrice = eval(command);
		$(".price").text(currentPrice + " €");
	};

	setTimeout(function () {
		getGasPrice();
	}, 5 * 60 * 1000);
}
