﻿$(document).ready(() => {
	new alignedInterval(transport.updateIntervalInMinutes, "minutes",
			transport.update)
		.run();
});

transport.update = function () {
	$.getJSON({
		url: transport.url,
		data: {
			id: transport.stationID,
			lines: transport.lines,
			maxJourneys: transport.maxJourneys * 2, // every journey could be duplicated
			accessId: apiKey.transport,
			format: "json"
		}
	})
	.done(function (data) {
		var departures = data.Departure;
		departures = removeDuplicatedJourneys(departures);
		checkCancellation(departures)
		.done(function () {
			var objects = arguments;
			setCancellation(objects, departures);
			displayDepartures(departures);
		});
	});

	function removeDuplicatedJourneys(departures) {
		var p = new Array();
		var limit = transport.maxJourneys;
		for (departure of departures) {
			if (departure.JourneyStatus === "P") {
				p.push(departure);
				if (--limit === 0) {
					return p;
				}
			}
		}
		return p;
	}

	function checkCancellation(departures) {
		if (toggle.transport.cancellation !== true) {
			return $.when();
		}
		var deferreds = new Array();
		for (departure of departures) {
			var id = departure.JourneyDetailRef.ref;
			deferreds.push(
				$.getJSON({
					url: transport.detail.url,
					data: {
						id: id,
						accessId: apiKey.transport,
						format: "json"
					}
				})
			);
		}
		return $.when.apply($, deferreds);
	}

	function setCancellation(objects, departures) {
		for (let [index, val] of Object.entries(objects)) {
			departures[index].cancelled = !!val[0].cancelled;
		}
	}

	function displayDepartures(departures) {
		var sortedDepartures = sortDepatures(departures);
		var opacity = 1.0;
		var animateFollowingRows = false;
		$(".transRow").each(function (i) {
			var departure = sortedDepartures[i];
			if (departure === undefined) {
				departure = new TransportEntry();
			}

			var row = $(this);
			var dirElem = row.children(".transDir");
			if (animateFollowingRows
					|| dirElem.html() !== departure.direction
					|| dirElem.hasClass("transCancelled") !== departure.cancelled) {
				animateRow();
				animateFollowingRows = true;
			} else {
				animateTime();
			}
			opacity -= 0.1;


			function animateTime() {
				var timeElem = row.children(".transTime");
				timeElem.delay(i * transport.fadeDuration);
				animateElement(timeElem, transport.fadeDuration, opacity, function () {
					timeElem.html(departure.time);
				});
			}

			function animateRow() {
				row.delay(i * transport.fadeDuration);
				animateElement(row, transport.fadeDuration, opacity, function () {
					var dirElem = row.children(".transDir");
					dirElem.html(departure.direction);
					markCancellation(departure, dirElem);
					row.children(".transLine").html(departure.line);
					row.children(".transTime").html(departure.time);
				});
			}

			function markCancellation(departure, elem) {
				if (departure.cancelled) {
					elem.addClass("transCancelled");
				} else {
					elem.removeClass("transCancelled");
				}
			}
		});
	}

	function sortDepatures(departures) {
		var sortedDepartures = new Array();
		var now = moment().startOf('minute');
		for (departure of departures) {
			var entry = new TransportEntry(departure, now);
			sortedDepartures.push(entry);
		}
		sortedDepartures.sort((a, b) => a.time - b.time);
		return sortedDepartures;
	}

	function TransportEntry(departure, now) {
		this.direction = "";
		this.line = "";
		this.time = "";
		this.cancelled = "";
		if (departure === undefined) {
			return;
		}

		if (departure.rtTime === undefined) {
			this.time = departure.date + " " + departure.time;
		} else {
			this.time = departure.rtDate + " " + departure.rtTime;
		}
		this.time = moment(this.time).diff(now, "minutes");
		if (this.time < 0) {
			this.time = -1;
		}
		if (this.time > 99) {
			this.time = "99+";
			return;
		}
		this.line = departure.Product.line;
		this.direction = departure.direction.replace(transport.strip, "");
		this.cancelled = departure.cancelled;
	}

}
