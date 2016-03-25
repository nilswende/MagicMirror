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
			}
		}
	});
		
	function showNewGasPrice(prices) {
		var command = "prices[stationID]." + gasType;
		var currentPrice = eval(command);
		currentPrice = currentPrice.slice(0, -1);
		$(".price").html(currentPrice + "<span class='milli'> 9 </span> €");
	};

	setTimeout(function () {
		getGasPrice();
	}, 15 * 60 * 1000);
}
