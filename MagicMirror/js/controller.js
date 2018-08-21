$(document).ready(() => {
	/** check for timesyncs */
	window.addEventListener(timesync.eventName, () => alignedInterval.resetAll());
	new timesync().check();

	/** set moment.js to desired locale */
	moment.locale(locale);

	var chosenDivs = position.positionDivs();

	if (chosenDivs.indexOf("time") !== -1) {
		/** have the desired clock displayed */
		if (clock.showBinary) {
			$("#clock").remove();
			if (!clock.showWithSeconds) {
				$("#binSec").remove();
			}
			if (!clock.enableBinaryEasyMode) {
				$("#binEasy").remove();
			}
			clock.updateBinary();
		}
		else {
			$("#binaryClock").remove();
			clock.update();
		}
		date.update();
	}

	if (chosenDivs.indexOf("weather") !== -1) {
		if (temp.sensorAttached) {
			temp.update();
		}
		else {
			$("#indoorTemp").remove();
		}
		weather.update();
		forecast.update();
	}

	if (chosenDivs.indexOf("calendar") !== -1) {
		calendar.update();
	}

	if (chosenDivs.indexOf("gas") !== -1) {
		gas.update();
	}

	if (chosenDivs.indexOf("transport") !== -1) {
		transport.update();
	}

	if (displayDivsAtBottom) {
		/** wait long enough for chromium to enter kiosk mode */
		setTimeout(position.pullDivsToBottom, 1700);
	}
});
