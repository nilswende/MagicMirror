document.addEventListener("DOMContentLoaded", function(event) {
	new alignedInterval(gas.updateIntervalInMinutes, "minutes", gas.update)
		.run();
});

gas.failCounter = 0;
gas.errCounter = 0;

gas.update = function () {
	var field = document.querySelector("#euro");
	let isOpen = isStationOpen();

	if (isOpen || isNumeric(field.textContent)) {
		var url = new URL(gas.url);
		url.search = new URLSearchParams({
				ids: JSON.stringify([gas.stationID]),
				apikey: apiKey.tankerkoenig
			});
		fetch(url)
		.then(res => res.json())
		.then(response => {
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
		})
		.catch(res => handleError());
	}


	function isStationOpen() {
		var now = moment().format("Hmm");
		return gas.openingTime - gas.updateIntervalInMinutes <= now && now <= gas.closingTime + gas.updateIntervalInMinutes;
	}

	function showNewGasPrice(currentPrice) {
		currentPrice = (currentPrice - 0.009).toFixed(2);
		if (field.textContent !== currentPrice) {
			animateElement($("#gasTextCell"), 800, 1, function () {
				field.textContent = currentPrice;
			});
		}
	}

	function handleFail() { //TODO retry after a minute
		if (gas.failCounter < 4) {
			++gas.failCounter;
		}
		else if (field.textContent !== "-.--") {
			field.textContent = "-.--";
		}
	}

	function handleError() {
		if (gas.errCounter < 4) {
			++gas.errCounter;
		}
		else if (field.textContent !== "err") {
			field.textContent = "err";
		}
	}
}
