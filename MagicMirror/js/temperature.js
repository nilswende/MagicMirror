var tempPollFailCounter = 0;

function updateIndoorTemp() {
	$.getJSON({
		//url: "http://localhost/magicmirror/php/temp.php",
		url: "http://localhost/magicmirror/test/temp.php",
		success: function (response) {
			if (response.status == "yes") {
				tempPollFailCounter = 0;
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
		if (tempPollFailCounter > 5) {
			return;
		}
		else if (tempPollFailCounter < 5) {
			++tempPollFailCounter;
		}
		else {
			$(".indoorTempData").html("--.-");
		}
	}

	setTimeout(updateIndoorTemp, 3 * 1000);
}
