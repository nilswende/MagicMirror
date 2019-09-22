$(document).ready(() => {
	clock.showWithSeconds = $("#clock #clockSeconds").length > 0;
	new alignedInterval(1, "seconds", clock.update)
		.run();
});

var clock = {};

clock.update = function () {
	var now = moment();
	var currentTime = now.format("LT");
	if (clock.showWithSeconds) {
		currentTime += "<span id='clockSeconds'>" + now.format("ss") + "</span>";
	}
	$("#clock").html(currentTime);
}
