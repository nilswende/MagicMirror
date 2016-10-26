function updateCalendar() {
	var timer = new interval(1000, aux_updateCalendar);
	timer.run();
}

function aux_updateCalendar() {
	fillWeeks();
	fillDates();
	
	
	function fillWeeks() {
		var date = moment().subtract(1, 'months').endOf('month');
		$(".calWeek").each(function (i) {
			$(this).html(date.week() + ".");
			date.add(1, 'week');
		});
	}
	
	function fillDates() {
		var today = moment().date() - 1;
		var firstDayOfMonth = moment().startOf('month').weekday();
		var lastDayOfMonth = moment().endOf('month').date();
		var date = moment().subtract(1, 'months').endOf('month').startOf('week').date();
		
		if (firstDayOfMonth === 0) {
			firstDayOfMonth = 7;
		}
		$(".calDate").each(function (i) {
			var distance = i - firstDayOfMonth;
			if (distance === 0 || distance === lastDayOfMonth) {
				date = 1;
			}
			$(this).html(date++);
			
			if (distance < 0 || distance >= lastDayOfMonth) {
				$(this).css("opacity", 0.5);
			}
			else if (distance === today) {
				$(this).css("border", "2px solid #555555");
			}
		});
	}
}
