$(document).ready(() => {
	/** set moment.js to desired locale */
	moment.locale(locale);

	/** start updating the chosen content */
	$("body > .container > .cell > .content").each(function (i) {
		var that = $(this);
		if (that.hasClass("time")) {
			if (that.find("#binaryClock").length > 0) {
				clock.updateBinary();
			} else {
				clock.update();
			}
			date.update();
		} else if (that.hasClass("weather")) {
			if (that.find("#indoorTemp").length > 0) {
				temp.update();
			}
			weather.update();
			forecast.update();
		} else if (that.hasClass("calendar")) {
			calendar.update();
		} else if (that.hasClass("gas")) {
			gas.update();
		} else if (that.hasClass("transport")) {
			transport.update();
		}
	});

	if (displayDivsAtBottom) {
		/** wait long enough for chromium to enter kiosk mode */
		setTimeout(position.pullDivsToBottom, 2000);
	}
});
