document.addEventListener("DOMContentLoaded", function(event) {
	new alignedInterval(transport.updateIntervalInMinutes, "minutes",
			transport.update)
		.run();
});

transport.update = function () {
	let url = new URL(transport.url);
	url.search = new URLSearchParams({
			id: transport.stationID,
			lines: transport.lines,
			maxJourneys: transport.maxJourneys * 2, // every journey could be duplicated
			accessId: apiKey.transport,
			format: "json"
		});
	fetch(url)
	.then(res => res.json())
	.then(data => {
		let departures = data.Departure;
		departures = removeDuplicatedJourneys(departures);
		checkCancellation(departures)
		.then(function () {
			let responses = arguments[0];
			setCancellation(responses, departures);
			displayDepartures(departures);
		});
	});

	function removeDuplicatedJourneys(departures) {
		let p = new Array();
		let limit = transport.maxJourneys;
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
			return Promise.all();
		}
		let deferreds = new Array();
		for (departure of departures) {
			let url = new URL(transport.detail.url);
			url.search = new URLSearchParams({
					id: departure.JourneyDetailRef.ref,
					accessId: apiKey.transport,
					format: "json"
				});
			deferreds.push(fetch(url));
		}
		return Promise.all(deferreds);
	}

	function setCancellation(responses, departures) {
		for (let [index, val] of responses.entries()) {
			departures[index].cancelled = !!val.json().cancelled;
		}
	}

	function displayDepartures(departures) {
		let sortedDepartures = sortDepatures(departures);
		let animateFollowingRows = false;
		
		let i = 0;
		animate(document.querySelector(".transRow"));

		function animate(row) {
			if (row !== null) {
				let departure = sortedDepartures[i];
				let dirElem = row.querySelector(".transDir");
				if (animateFollowingRows
						|| dirElem.textContent !== departure.direction
						|| dirElem.classList.contains("transCancelled") !== departure.cancelled) {
					animateElement(row, 1.0 - i * 0.1,
						function () {
							dirElem.textContent = departure.direction;
							markCancellation(departure, dirElem);
							this.querySelector(".transLine").textContent = departure.line;
							this.querySelector(".transTime").textContent = departure.time;
							animateFollowingRows = true;
						},
						function () {
							i++;
							animate(row.nextElementSibling);
						}
					);
				} else {
					let timeElem = row.querySelector(".transTime");
					animateElement(timeElem, 1.0 - i * 0.1,
						function () {
							this.textContent = departure.time;
						},
						function () {
							i++;
							animate(row.nextElementSibling);
						}
					);
				}
			}
		}

		function markCancellation(departure, row) {
			if (departure.cancelled) {
				row.classList.add("transCancelled");
			} else {
				row.classList.remove("transCancelled");
			}
		}
	}

	function sortDepatures(departures) {
		let sortedDepartures = new Array();
		let now = moment().startOf('minute');
		for (departure of departures) {
			let entry = new TransportEntry(departure, now);
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
