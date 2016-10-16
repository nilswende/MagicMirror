function updateClock() {
	var timer = new interval(0.1 * 1000, aux_updateClock);
	timer.run();
}

function aux_updateClock() {
	var now = moment();
	var clock = now.format("LT");
	if (time.showClockWithSeconds) {
		clock += "<span class='seconds'>" + now.format("ss") + "</span>";
	}
	$(".clock").html(clock);
}
