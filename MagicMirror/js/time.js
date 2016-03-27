function updateTime() {
	//var now = moment("2016-09-11 13:37:55");
	var now = moment();
	var longDate = now.format("LLLL").split(" ", 4);
	var date = longDate[0] + "<br/>" + longDate[1] + " " + longDate[2];
	if (showDateWithYear) {
		if (alwaysBreakYear) {
			date += "<br/>" + longDate[3];
		}
		else {
			date += " " + longDate[3];
		}
	}

	var clock = now.format("LT");
	if (showClockWithSeconds) {
		clock += "<span class='seconds'>" + now.format("ss") + "</span>";
	}

	$(".date").html(date);
	$(".clock").html(clock);

	setTimeout(function () {
		updateTime();
	}, 0.1 * 1000);
}
