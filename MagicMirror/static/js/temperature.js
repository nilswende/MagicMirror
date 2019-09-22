$(document).ready(() => {
	new alignedInterval(3, "seconds", temp.update)
		.run();
});

temp.failCounter = 0;
temp.errCounter = 0;
temp.movAvg = new MovAvg(3);

temp.update = function () {
	var field = $("#indoorTempData");
	$.getJSON({
		url: temp.url,
		success: function (response) {
			if (temp.errCounter !== 0) {
				temp.errCounter = 0;
			}
			if (response.Status === "yes") {
				if (temp.failCounter !== 0) {
					temp.failCounter = 0;
				}
				let avg = temp.movAvg.putAndAvg(response.Temp);
				field.html(avg.toFixed(1));
			}
			else {
				handleFail();
			}
		},
		error: function (response) {
			handleError();
		}
	});

	function handleFail() {
		if (temp.failCounter < 4) {
			++temp.failCounter;
		}
		else if (field.html() !== "--.-") {
			field.html("--.-");
		}
	}

	function handleError() {
		if (temp.errCounter < 4) {
			++temp.errCounter;
		}
		else if (field.html() !== "err") {
			field.html("err");
		}
	}
}
