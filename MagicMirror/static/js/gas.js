$(document).ready(() => {
	new alignedInterval(gas.updateIntervalInMinutes, "minutes", gas.update)
		.run();
});

gas.failCounter = 0;
gas.errCounter = 0;

gas.update = function () {
	var field = $("#euro");
	let isOpen = isStationOpen();

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


	function isStationOpen() {
		var now = moment().format("Hmm");
		return gas.openingTime - gas.updateIntervalInMinutes <= now && now <= gas.closingTime + gas.updateIntervalInMinutes;
	}

	function showNewGasPrice(currentPrice) {
		currentPrice = (currentPrice - 0.009).toFixed(2);
		if (field.html() !== currentPrice) {
			animateElement($("#gasTextCell"), 800, 1, function () {
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
