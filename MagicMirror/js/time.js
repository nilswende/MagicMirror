function updateTime() {
	var now = moment().format("LLLL").split(" ", 4);
	var date = now[0] + " " + now[1] + " " + now[2];
	if (showDateWithYear) {
		date += " " + now[3];
	}

	var clock;
	if (showClockWithSeconds) {
		clock = moment().format("LTS");
	}
	else {
		clock = moment().format("LT");
	}

	$(".clock").text(clock);
	$(".date").text(date);

	setTimeout(function () {
		updateTime();
	}, 1 * 1000);
}
