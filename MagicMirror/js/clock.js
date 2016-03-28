function updateClock() {
	//var now = moment("2016-09-11 13:37:55");
	var now = moment();
	var clock = now.format("LT");
	if (showClockWithSeconds) {
		clock += "<span class='seconds'>" + now.format("ss") + "</span>";
	}
	$(".clock").html(clock);

	setTimeout(updateClock, 0.1 * 1000);
}
