clock.update = function () {
	clock.showWithSeconds = $("#clock #clockSeconds").length > 0;
	var timer = new alignedInterval(1, "seconds", clock.aux_update);
	timer.run();
}

clock.aux_update = function () {
	var now = moment();
	var currentTime = now.format("LT");
	if (clock.showWithSeconds) {
		currentTime += "<span id='clockSeconds'>" + now.format("ss") + "</span>";
	}
	$("#clock").html(currentTime);
}
