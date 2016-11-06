temp.failCounter = 0;
temp.errCounter = 0;

temp.update = function () {
	var timer = new interval(3 * 1000, temp.aux_update);
	timer.run();
}

temp.aux_update = function () {
	var field = $("#indoorTempData");
	$.getJSON({
		url: temp.url,
		success: function (response) {
			if (temp.errCounter !== 0) {
				temp.errCounter = 0;
			}
			if (response.status === "yes") {
				if (temp.failCounter !== 0) {
					temp.failCounter = 0;
				}
				field.html(response.temp);
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
			++gas.failCounter;
		}
		else if (field.html() !== "--.-") {
			field.html("--.-");
		}
	}

	function handleError() {
		if (temp.errCounter < 4) {
			++gas.errCounter;
		}
		else if (field.html() !== "err") {
			field.html("err");
		}
	}
}
