$(document).ready(() => {
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
		$(".calWeek").each(function (i) {
			$(this).html(date.week() + ".");
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
		$(".calDate").each(function (i) {
			var distance = i - firstDayOfMonth;
			if (distance === 0 || distance === lastDayOfMonth) {
				date = 1;
			}
			var cell = $(this);
			cell.html(date++);

			cell.removeClass("calToday");
			if (distance < 0 || distance >= lastDayOfMonth) {
				cell.addClass("calOutsideCurrentMonth");
			}
			else {
				cell.removeClass("calOutsideCurrentMonth");
				if (distance === today) {
					cell.addClass("calToday");
				}
			}
		});
	}
}
