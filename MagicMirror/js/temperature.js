﻿temp.failCounter = 0;
temp.errCounter = 0;

function updateIndoorTemp() {
	$.getJSON({
		//url: "http://localhost/MagicMirror/php/temp.php",
		url: "http://localhost/MagicMirror/test/temp.php",
		success: function (response) {
			if (response.status == "yes") {
				if (temp.failCounter != 0) {
					temp.failCounter = 0;
				}
				$(".indoorTempData").html(response.temp);
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
		if (temp.failCounter > 5) {
			return;
		}
		else if (temp.failCounter < 5) {
			++temp.failCounter;
		}
		else { // ==5
			$(".indoorTempData").html("--.-");
		}
	}

	function handleError() {
		if (temp.errCounter > 5) {
			return;
		}
		else if (temp.errCounter < 5) {
			++temp.errCounter;
		}
		else { // ==5
			$(".indoorTempData").html("err");
		}
	}

	setTimeout(updateIndoorTemp, 3 * 1000);
}
