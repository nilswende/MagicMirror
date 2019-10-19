document.addEventListener("DOMContentLoaded", function(event) {
	clock.showWithSeconds = document.querySelector("#clock #clockSeconds") !== null;
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
	document.querySelector("#clock").innerHTML = currentTime;
}
