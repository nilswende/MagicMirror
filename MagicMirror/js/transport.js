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
					direction = departure.direction.replace(transport.strip, "");
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
				if (row.children(".transDir").html() === direction) {
					animateTime();
				} else {
					animateRow();
				}
				opacity -= 0.1;


				function animateRow() {
					row.delay(i * transport.fadeDuration);
					animateElement(row, transport.fadeDuration, opacity, function () {
						row.children(".transLine").html(line);
						row.children(".transDir").html(direction);
						row.children(".transTime").html(time);
					});
				}

				function animateTime() {
					var timeElem = row.children(".transTime");
					timeElem.delay(i * transport.fadeDuration);
					animateElement(timeElem, transport.fadeDuration, opacity, function () {
						timeElem.html(time);
					});
				}

				function blankRow() {
					direction = "";
					line = "";
					time = "";
				}
			});
		}
	});
}
