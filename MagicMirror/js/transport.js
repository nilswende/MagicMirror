transport.update = function () {
	var timer = new interval(transport.updateIntervalInMinutes * 60000, function () {
		transport.aux_update();
	});
	timer.run();
}

transport.aux_update = function () {
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
			var opacity = 1.0;
			var departures = response.Departure;
			$(".transRow").each(function (i) {
				let departure = departures[i];
				var direction = departure.direction;
				var line = departure.Product.line;
				var time = departure.rtTime;
				if (time === undefined) {
					time = departure.time;
				}
				time = time.substring(0, 5);
				
				var row = $(this);
				row.delay(i * transport.fadeDuration);
				animateRow(row, transport.fadeDuration, opacity, function () {
					row.children(".transLine").html(line);
					row.children(".transDir").html(direction.replace(transport.strip, ""));
					row.children(".transTime").html(time);
				});
				opacity -= 0.1;
			});
		},
		error: function (response) {
			handleError();
		}
	});

	function handleError() {
		if (transport.errCounter < 4) {
			++transport.errCounter;
		}
		else if (field.html() !== "err") {
			field.html("err");
		}
	}
}
