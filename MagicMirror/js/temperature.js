var tempPollFailCounter = 0;

function writeIndoorTemp() {
	$.getJSON({
		//url: "http://localhost/magicmirror/php/temp.php",
		url: "http://localhost/magicmirror/test/temp.php",
		success: function (response) {
			if (response.status == "yes") {
				tempPollFailCounter = 0;
				$(".indoorTemp").html(response.temp);
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
		++tempPollFailCounter;
		if (tempPollFailCounter > 5) {
			$(".indoorTemp").html("--.-");
		}
	}

	setTimeout(writeIndoorTemp, 3 * 1000);
}
