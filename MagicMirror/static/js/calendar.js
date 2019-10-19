document.addEventListener("DOMContentLoaded", function(event) {
	new alignedInterval(1, "day", calendar.update)
		.run();
});

var calendar = {};

calendar.update = function () {
	var now = moment();
	fillWeeks();
	fillDates();


	function fillWeeks() {
		var date = now.clone().subtract(1, 'months').endOf('month');
		document.querySelectorAll(".calWeek").forEach(function (elem) {
			elem.textContent = date.week() + ".";
			date.add(1, 'week');
		});
	}

	function fillDates() {
		var today = now.clone().date() - 1;
		var firstDayOfMonth = now.clone().startOf('month').weekday();
		var lastDayOfMonth = now.clone().endOf('month').date();
		var date = now.clone().subtract(1, 'months').endOf('month').startOf('week').date();

		if (firstDayOfMonth === 0) {
			firstDayOfMonth = 7;
		}
		for (let [i, cell] of document.querySelectorAll(".calDate").entries()) {
			var distance = i - firstDayOfMonth;
			if (distance === 0 || distance === lastDayOfMonth) {
				date = 1;
			}
			cell.textContent = date++;

			cell.classList.remove("calToday");
			if (distance < 0 || distance >= lastDayOfMonth) {
				cell.classList.add("calOutsideCurrentMonth");
			}
			else {
				cell.classList.remove("calOutsideCurrentMonth");
				if (distance === today) {
					cell.classList.add("calToday");
				}
			}
		};
	}
}
