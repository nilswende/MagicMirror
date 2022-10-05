document.addEventListener("DOMContentLoaded", function(event) {
	if (contentExists("gas")) {
		new alignedInterval(gas.updateIntervalInMinutes, "minutes", gas.update)
			.run();
		let img = document.querySelector("#gasIcon");
		img.src = "/static/img/" + gas.gasType + ".svg";
	}
});

gas.failCounter = 0;
gas.errCounter = 0;
gas.retry;

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
			if (gas.retry) {
				clearTimeout(gas.retry);
				gas.retry = undefined;
			}
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
		currentPrice = (Math.trunc(currentPrice * 100) / 100).toFixed(2);
		if (field.textContent !== currentPrice) {
			animateElement(document.querySelector("#gasTextCell"), 1, function () {
				field.textContent = currentPrice;
			});
		}
	}

	function handleFail() {
		if (gas.failCounter < 4) {
			gas.failCounter++;
			retry(gas.update, 1, 'minutes');
		}
		else if (field.textContent !== "-.--") {
			field.textContent = "-.--";
		}
	}

	function handleError() {
		if (gas.errCounter < 4) {
			gas.errCounter++;
			retry(gas.update, 1, 'minutes');
		}
		else if (field.textContent !== "err") {
			field.textContent = "err";
		}
	}

	function retry(fn, length, unit) {
		gas.retry = setTimeout(fn, moment.duration(length, unit).asMilliseconds());
	}
}
