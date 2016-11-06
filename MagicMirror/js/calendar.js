function updateCalendar() {
	var now = moment();
	aux_updateCalendar(now);
	setTimeoutWithDST(now, updateCalendar);
}

function aux_updateCalendar(now) {
	fillWeeks(now);
	fillDates(now);


	function fillWeeks(now) {
		var date = now.clone().subtract(1, 'months').endOf('month');
		$(".calWeek").each(function (i) {
			$(this).html(date.week() + ".");
			date.add(1, 'week');
		});
	}

	function fillDates(now) {
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
			
			if (distance < 0 || distance >= lastDayOfMonth) {
				cell.css("opacity", 0.5);
			}
			else {
				cell.css("opacity", "");				
				if (distance === today) {
				cell.prev().css("border", "");
				cell.css("border", "2px solid #555555");
				}
			}
		});
	}
}
