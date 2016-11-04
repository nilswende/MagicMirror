$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	var chosenDivs = positionDivs();

	if (chosenDivs.indexOf("time") !== -1) {
		// have the desired clock displayed
		if (clock.showBinaryClock) {
			$("#clock").remove();
			if (!clock.showClockWithSeconds) {
				$("#binSec").remove();
			}
			if (!clock.enableBinaryClockEasyMode) {
				$("#binEasy").remove();
			}
			updateBinaryClock();
		}
		else {
			$("#binaryClock").remove();
			updateClock();
		}
		updateDate();
	}

	if (chosenDivs.indexOf("weather") !== -1) {
		if (temp.sensorAttached) {
			updateIndoorTemp();
		}
		else {
			$("#indoorTemp").remove();
		}
		updateCurrentWeather();
		updateWeatherForecast();
	}

	if (chosenDivs.indexOf("calendar") !== -1) {
		updateCalendar();
	}

	if (chosenDivs.indexOf("gas") !== -1) {
		updateGasPrice();
	}

	if (displayDivsAtBottom) {
		// wait long enough for chromium to enter kiosk mode
		setTimeout(pullDivsToBottom, 1500);
	}
});
