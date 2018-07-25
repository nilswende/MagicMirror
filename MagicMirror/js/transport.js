transport.update = function () {
	var timer = new alignedInterval(transport.updateIntervalInMinutes, "minutes", function () {
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
				var direction, line, time;
				var departure = departures[i];
				if (departure === undefined) {
					blankRow();
				} else {
					direction = departure.direction;
					line = departure.Product.line;					
					if (departure.rtTime === undefined) {
						time = departure.date + " " + departure.time;
					} else {
						time = departure.rtDate + " " + departure.rtTime;
					}
					time = moment(time).diff(moment(), "minutes");
					if (time < 0) {
						time = -1;
					}
					if (time >= 100) {
						blankRow();
					}
				}
				
				var row = $(this);
				row.delay(i * transport.fadeDuration);
				animateRow(row, transport.fadeDuration, opacity, function () {
					row.children(".transLine").html(line);
					row.children(".transDir").html(direction.replace(transport.strip, ""));
					row.children(".transTime").html(time);
				});
				opacity -= 0.1;
				
				
				function blankRow() {
					direction = "";
					line = "";
					time = "";
				}
			});
		}
	});
}
