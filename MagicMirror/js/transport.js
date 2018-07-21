transport.update = function () {
	var timer = new interval(transport.updateIntervalInMinutes * 60000, function () {
		transport.aux_update(timer);
	});
	timer.run();
}

transport.aux_update = function (timer) {
	var field = $("#euro");

	$.getJSON({
		url: transport.url,
		data: {
			id: transport.stationID,
			lines: transport.lines,
			maxJourneys: transport.maxJourneys,
			accessId: apiKey.rmv,
			format: "json"
		},
		success: function (response) {
			if (transport.errCounter !== 0) {
				transport.errCounter = 0;
			}
			
			var rows = $(".transport");
			for (let i in response) {
				let departure = response.Departure[i];
				var direction = departure.direction;
				var line = departure.Product.line;
				var time = departure.rtTime;
				if (time === undefined) {
					time = departure.time;
				}
				time = time.substring(0, 4);
				
				var row = rows.get(i);			
				animateRow(row, 800, 1, function () {
					row.children(".transLine").html(line);
					row.children(".transDir").html(direction);
					row.children(".transTime").html(time);
				});
			}
		},
		error: function (response) {
			handleError();
		}
	});

	function getForecastHtml(days, key) {
		var day = days[key];
		let dayName = moment(key).format("dd");
		var dayHtml = "<td class='forecastDay'>" + dayName + "</td>";
		var iconHtml = "<td class='forecastIcon'><i class='wi wi-owm-" + day.icons + "'></i></td>";
		var maxHtml = "<td class='forecastTemp'>" + putMinusIfNegative(day.max);
		var minHtml = "<td class='forecastTemp'>" + putMinusIfNegative(day.min);
		if (forecast.showCelcius) {
			maxHtml += "&nbsp;°C";
			minHtml += "&nbsp;°C";
		}
		return dayHtml + iconHtml + maxHtml + "</td>" + minHtml + "</td>";
	}

	function handleError() {
		if (transport.errCounter < 4) {
			++transport.errCounter;
		}
		else if (field.html() !== "err") {
			field.html("err");
		}
	}
}
