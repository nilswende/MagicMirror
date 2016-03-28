function initBinaryClock() {
	var now = moment().toObject();

	var bin;
	if (showClockWithSeconds) {
		bin = leftpad(now.seconds.toString(2));
		setBgColors(".binSec", bin);
	}
	bin = leftpad(now.minutes.toString(2));
	setBgColors(".binMin", bin);
	bin = leftpad(now.hours.toString(2));
	setBgColors(".binHour", bin);

	setTimeout(updateBinaryClock, 0.1 * 1000);
}

//leftpads with 0s to a length of 6
function leftpad(str) {
	return "000000".substring(str.length) + str;
}

function setBgColors(row, bin) {
	$(row + " > td").each(function (i) {
		if (bin.charAt(i) == "1") {
			$(this).css("background-color", "white");
		}
		else {
			$(this).css("background-color", "black");
		}
	});
}

function updateBinaryClock() {
	var now = moment().toObject();

	var bin;
	if (showClockWithSeconds) {
		bin = leftpad(now.seconds.toString(2));
		setBgColors(".binSec", bin);
	}
	if (now.seconds == 0) {
		bin = leftpad(now.minutes.toString(2));
		setBgColors(".binMin", bin);
	}
	if (now.minutes == 0) {
		bin = leftpad(now.hours.toString(2));
		setBgColors(".binHour", bin);
	}

	setTimeout(updateBinaryClock, 0.1 * 1000);
}
