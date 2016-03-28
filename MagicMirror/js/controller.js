
$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	positionDivs();

	if (toggleClock) {
		$(".binaryClock").remove();
		updateClock();
	}
	else {
		$(".clock").remove();
		if (!showClockWithSeconds) {
			$(".binSec").remove();
		}
		initBinaryClock();
	}
	updateDate();
	getGasPrice();
	writeIndoorTemp();
	getCurrentWeather();
	getWeatherForecast();

	});
