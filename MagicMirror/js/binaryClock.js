clock.updateBinary = function () {
	clock.aux_updateBinary(true);
	
	var timer = new alignedInterval(1, "seconds", clock.aux_updateBinary);
	timer.run();
}

clock.aux_updateBinary = function (isFirstRun) {
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
		$(row + " > td").each(function (i) {
			if (bin.charAt(i) === "1") {
				$(this).css("background-color", "white");
			}
			else {
				$(this).css("background-color", "");
			}
		});
	}
}
