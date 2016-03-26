function writeIndoorTemp() {
	$.get({
		url: "../test.php",
		success: function (response) {
			$(".indoorTemp").html("In: " + response);
		},
		error: function (response) {
			$(".indoorTemp").html("failed");
		}
	});

	setTimeout(function () {
		getCurrentWeather();
	}, 5 * 1000);
}
