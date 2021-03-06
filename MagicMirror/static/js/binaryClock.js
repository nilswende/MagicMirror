﻿document.addEventListener("DOMContentLoaded", function(event) {
	if (contentExists("time") && document.querySelector("#binaryClock")) {
		clock.showWithSeconds = document.querySelector("#binaryClock #binSec") !== null;
		clock.updateBinary(true);
		new alignedInterval(1, "seconds", clock.updateBinary)
			.run();
	}
});

var clock = {};

clock.updateBinary = function (isFirstRun) {
	var now = moment().toObject(),
		bin;

	if (clock.showWithSeconds) {
		bin = toSixBit(now.seconds.toString(2));
		setBgColors("#binSec", bin);
	}
	if (now.seconds === 0 || isFirstRun) {
		bin = toSixBit(now.minutes.toString(2));
		setBgColors("#binMin", bin);
	}
	if (now.minutes === 0 || isFirstRun) {
		bin = toSixBit(now.hours.toString(2));
		setBgColors("#binHour", bin);
	}


	/** leftpad str with 0s to a length of 6 */
	function toSixBit(str) {
		return "000000".substring(str.length) + str;
	}

	function setBgColors(row, bin) {
		for (let [i, cell] of document.querySelectorAll(row + " > td").entries()) {
			if (bin.charAt(i) === "1") {
				cell.style["background-color"] = "white";
			}
			else {
				cell.style["background-color"] = "";
			}
		}
	}
}
