document.addEventListener("DOMContentLoaded", function(event) {
	if (contentExists("weather") && document.querySelector("#indoorTemp")) {
		new alignedInterval(3, "seconds", temp.update)
			.run();
	}
});

temp.failCounter = 0;
temp.errCounter = 0;
temp.movAvg = new MovAvg(3);

temp.update = function () {
	var field = document.querySelector("#indoorTempData");
	var url = new URL(temp.url);
	fetch(url)
	.then(res => res.json())
	.then(response => {
		if (temp.errCounter !== 0) {
			temp.errCounter = 0;
		}
		if (response.Status === "yes") {
			if (temp.failCounter !== 0) {
				temp.failCounter = 0;
			}
			let avg = temp.movAvg.putAndAvg(response.Temp);
			field.textContent = avg.toFixed(1);
		}
		else {
			handleFail();
		}
	})
	.catch(res => handleError());

	function handleFail() {
		if (temp.failCounter < 4) {
			++temp.failCounter;
		}
		else if (field.textContent !== "--.-") {
			field.textContent = "--.-";
		}
	}

	function handleError() {
		if (temp.errCounter < 4) {
			++temp.errCounter;
		}
		else if (field.textContent !== "err") {
			field.textContent = "err";
		}
	}
}
