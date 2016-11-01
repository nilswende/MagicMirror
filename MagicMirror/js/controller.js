$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	positionDivs();

	// have the desired clock displayed
	if (clock.showBinaryClock) {
		$(".clock").remove();
		if (!clock.showClockWithSeconds) {
			$(".binSec").remove();
		}
		if (!clock.enableBinaryClockEasyMode) {
			$(".binEasy").remove();
		}
		updateBinaryClock();
	}
	else {
		$(".binaryClock").remove();
		updateClock();
	}

	if (temp.sensorAttached) {
		updateIndoorTemp();
	}
	else {
		$(".indoorTemp").remove();
	}

	updateDate();
	updateCalendar();
	updateGasPrice();
	getCurrentWeather();
	getWeatherForecast();
});
