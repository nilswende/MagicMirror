gas.failCounter = 0;
gas.errCounter = 0;

function updateGasPrice() {
	var timer = new interval(gas.updateIntervalInMinutes * 60000, function() { 
		aux_updateGasPrice(timer);
	});
	timer.run();
}

function aux_updateGasPrice(timer) {
	var field = $("#euro");
	let isOpen = isStationOpen(timer);
	
	if (isOpen || !$.isNumeric(field.html())) {
		$.getJSON({
			url: gas.url,
			data: {
				ids: JSON.stringify([gas.stationID]),
				apikey: apiKey.tankerkoenig
			},
			success: function (response) {
				if (gas.errCounter !== 0) {
					gas.errCounter = 0;
				}
				if (response.ok) {
					if (gas.failCounter !== 0) {
						gas.failCounter = 0;
					}
					let currentPrice = response.prices[gas.stationID][gas.gasType];
					showNewGasPrice(currentPrice);
				}
				else {
					handleFail();
				}
			},
			error: function (response) {
				handleError();
			}
		});
	}
	
	
	function isStationOpen(timer) {
		var now = moment().format("Hmm");
		if (now < gas.openingTime) {
			return false;
		}
		if (now > gas.closingTime + gas.updateIntervalInMinutes) {
			timer.stop();
			return false;
		}
		return true;
	}

	function showNewGasPrice(currentPrice) {
		currentPrice = currentPrice.toString().slice(0, -1);
		field.html(currentPrice);
	}

	function handleFail() { //TODO retry after a minute
		if (gas.failCounter < 4) {
			++gas.failCounter;
		}
		else if (field.html() !== "-.--") {
			field.html("-.--");
		}
	}

	function handleError() {
		if (gas.errCounter < 4) {
			++gas.errCounter;
		}
		else if (field.html() !== "err") {
			field.html("err");
		}
	}
}
