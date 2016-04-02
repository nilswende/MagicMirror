gas.failCounter = 0;
gas.errCounter = 0;

function updateGasPrice() {
	$.getJSON({
		//url: "https://creativecommons.tankerkoenig.de/json/prices.php",
		url: "http://localhost/MagicMirror/test/gas.json",
		data: {
			ids: JSON.stringify([gas.stationID]),
			apikey: apiKey.tankerkoenig
		},
		success: function (response) {
			if (response.ok) {
				if (gas.failCounter != 0) {
					gas.failCounter = 0;
				}
				showNewGasPrice(response.prices);
			}
			else {
				handleFail();
			}
		},
		error: function (response) {
			handleError();
		}
	});

	setTimeout(updateGasPrice, 15 * 60000);
}
	
function showNewGasPrice(prices) {
		var currentPrice = prices[gas.stationID][gas.gasType];
		currentPrice = currentPrice.toString().slice(0, -1);
		$(".euro").html(currentPrice);
	};

function handleFail() {
	if (gas.failCounter > 5) {
		return;
	}
	else if (gas.failCounter < 5) {
		++gas.failCounter;
	}
	else { // ==5
		$(".euro").html("-.--");
	}
}

function handleError() {
	if (gas.errCounter > 5) {
		return;
	}
	else if (gas.errCounter < 5) {
		++gas.errCounter;
	}
	else { // ==5
		$(".euro").html("err");
	}
}
