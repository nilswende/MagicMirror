$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	positionDivs();

	// have the desired clock displayed
	if (time.showBinaryClock) {
		$(".clock").remove();
		if (!time.showClockWithSeconds) {
			$(".binSec").remove();
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
	updateGasPrice();
	getCurrentWeather();
	getWeatherForecast();
});
