
$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	positionDivs();

	updateTime();
	getGasPrice();
	//writeIndoorTemp();
	getCurrentWeather();
	getWeatherForecast();
});
