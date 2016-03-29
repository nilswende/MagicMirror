﻿$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	positionDivs();

	// have the desired clock displayed
	if (time.showBinaryClock) {
		$(".clock").remove();
		if (!time.showClockWithSeconds) {
			$(".binSec").remove();
		}
		initBinaryClock();
	}
	else {
		$(".binaryClock").remove();
		updateClock();
	}

	if (tempSensorAttached) {
		writeIndoorTemp();
	}
	else {
		$(".indoorTemp").remove();
	}

	updateDate();
	getGasPrice();
	getCurrentWeather();
	getWeatherForecast();
});
