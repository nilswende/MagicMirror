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
			accessId: apiKey.transport,
			format: "json"
		},
		success: function (response) {
			var opacity = 1.0;
			var departures = response.Departure;
			var sortedDepartures = new Array(departures.length);
			for (departure of departures) {
				var entry = new TransportEntry();
				if (departure.rtTime === undefined) {
					entry.time = departure.date + " " + departure.time;
				} else {
					entry.time = departure.rtDate + " " + departure.rtTime;
				}
				entry.time = moment(entry.time).diff(moment(), "minutes");
				if (entry.time < 0) {
					entry.time = -1;
				}
				if (entry.time >= 100) {
					entry.time = "";
					continue;
				}
				entry.line = departure.Product.line;
				entry.direction = departure.direction.replace(transport.strip, "");
				sortedDepartures.push(entry);
			}
			sortedDepartures.sort((a, b) => a.time - b.time);
			var animateFollowingRows = false;
			$(".transRow").each(function (i) {
				var departure = sortedDepartures[i];
				if (departure === undefined) {
					departure = new TransportEntry();
				}

				var row = $(this);
				if (!animateFollowingRows
						&& row.children(".transDir").html() === departure.direction) {
					animateTime();
				} else {
					animateRow();
					animateFollowingRows = true;
				}
				opacity -= 0.1;


				function animateRow() {
					row.delay(i * transport.fadeDuration);
					animateElement(row, transport.fadeDuration, opacity, function () {
						row.children(".transLine").html(departure.line);
						row.children(".transDir").html(departure.direction);
						row.children(".transTime").html(departure.time);
					});
				}

				function animateTime() {
					var timeElem = row.children(".transTime");
					timeElem.delay(i * transport.fadeDuration);
					animateElement(timeElem, transport.fadeDuration, opacity, function () {
						timeElem.html(departure.time);
					});
				}
			});
		}
	});


	function TransportEntry() {
		this.direction = "";
		this.line = "";
		this.time = "";
	}
}
