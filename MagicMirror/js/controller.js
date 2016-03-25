
$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	updateTime();
	getGasPrice();
	getCurrentWeather();
	getWeatherForecast();
});
