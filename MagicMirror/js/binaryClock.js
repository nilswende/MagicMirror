time.firstRun = true;

function updateBinaryClock() {
	var now = moment().toObject();

	var bin;
	if (time.showClockWithSeconds) {
		bin = toSixBit(now.seconds.toString(2));
		setBgColors(".binSec", bin);
	}
	if (now.seconds == 0 || time.firstRun) {
		bin = toSixBit(now.minutes.toString(2));
		setBgColors(".binMin", bin);
	}
	if (now.minutes == 0 || time.firstRun) {
		bin = toSixBit(now.hours.toString(2));
		setBgColors(".binHour", bin);
	}
	if (time.firstRun) {
		time.firstRun = false;
	}

	setTimeout(updateBinaryClock, 0.1 * 1000);
}

//leftpad str with 0s to a length of 6
function toSixBit(str) {
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
