function updateTime() {
	var now = moment();
	var longDate = now.format("LLLL").split(" ", 4);
	var date = longDate[0] + "<br/>" + longDate[1] + " " + longDate[2];
	if (showDateWithYear) {
		date += " " + longDate[3];
	}

	var clock = now.format("LT");
	if (showClockWithSeconds) {
		clock += "<span class=\"seconds\">" + now.format("ss") + "</span>";
	}

	$(".clock").html(clock);
	$(".date").html(date);

	setTimeout(function () {
		updateTime();
	}, 0.1 * 1000);
}
