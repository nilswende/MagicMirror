function updateCalendar() {
	aux_updateCalendar();
	
	var now = moment().valueOf();
	var nextDay = moment().endOf('day').valueOf() + 1;
	setTimeout(updateCalendar, nextDay - now);
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
