temp.failCounter = 0;

function updateIndoorTemp() {
	$.getJSON({
		//url: "http://localhost/magicmirror/php/temp.php",
		url: "http://localhost/magicmirror/test/temp.php",
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
			handleFail();
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

	setTimeout(updateIndoorTemp, 3 * 1000);
}
