function getGasPrice() {
	var station_ids_string = JSON.stringify([gas.stationID]);

	$.getJSON({
		//url: "https://creativecommons.tankerkoenig.de/json/prices.php",
		url: "http://localhost/magicmirror/test/gas.json",
		data: {
			ids: station_ids_string,
			apikey: apiKey.tankerkoenig
		},
		success: function (response) {
			if (response.ok) {
				showNewGasPrice(response.prices);
			}
			else {
				handleFail();
			}
		},
		error: function (response) {
			handleFail();
		}
	});

	function showNewGasPrice(prices) {
		var currentPrice = prices[gas.stationID][gas.gasType];
		currentPrice = currentPrice.toString().slice(0, -1);
		$(".euro").html(currentPrice);
	};

	function handleFail() {
		++tempPollFailCounter;
		if (tempPollFailCounter > 5) {
			$(".euro").html("-.--");
		}
	}

	setTimeout(getGasPrice, 15 * 60000);
}
