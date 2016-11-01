function updateClock() {
	var timer = new interval(0.1 * 1000, aux_updateClock);
	timer.run();
}

function aux_updateClock() {
	var now = moment();
	var currentTime = now.format("LT");
	if (clock.showClockWithSeconds) {
		currentTime += "<span class='seconds'>" + now.format("ss") + "</span>";
	}
	$(".clock").html(currentTime);
}
