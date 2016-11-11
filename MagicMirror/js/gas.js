gas.failCounter = 0;
gas.errCounter = 0;

gas.update = function () {
	var timer = new interval(gas.updateIntervalInMinutes * 60000, function () {
		gas.aux_update(timer);
	});
	timer.run();
}

gas.aux_update = function (timer) {
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
		if (now < gas.openingTime - gas.updateIntervalInMinutes) {
			return false;
		}
		if (now > gas.closingTime + gas.updateIntervalInMinutes) {
			timer.stop();
			return false;
		}
		return true;
	}

	function showNewGasPrice(currentPrice) {
		currentPrice = (currentPrice - 0.009).toFixed(2);
		if (field.html() !== currentPrice) {
			animateRow($("#gasTextRow"), 800, function () {
				field.html(currentPrice);
			});
		}
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
