
$(document).ready(function () {
	// set moment.js to desired locale
	moment.locale(locale);

	updateTime();
	//getGasPrice();
	$(".price").html("0.97<span class='milli'> 9 </span> €");
	getCurrentWeather();
	getWeatherForecast();
});
