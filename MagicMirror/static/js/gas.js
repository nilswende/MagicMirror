document.addEventListener("DOMContentLoaded", function(event) {
	new alignedInterval(gas.updateIntervalInMinutes, "minutes", gas.update)
		.run();
});

gas.failCounter = 0;
gas.errCounter = 0;

gas.update = function () {
	let field = document.querySelector("#euro");
	let isOpen = isStationOpen();

	if (isOpen || !isNumeric(field.textContent)) {
		let url = new URL(gas.url);
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
		let now = moment().format("Hmm");
		return gas.openingTime - gas.updateIntervalInMinutes <= now 
				&& now <= gas.closingTime + gas.updateIntervalInMinutes;
	}

	function showNewGasPrice(currentPrice) {
		currentPrice = (Math.trunc(currentPrice * 100) / 100);
		if (field.textContent !== currentPrice) {
			animateElement(document.querySelector("#gasTextCell"), 1, function () {
						field.textContent = currentPrice;
					}
			);
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
