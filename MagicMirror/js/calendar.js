function updateCalendar() {
	var timer = new interval(1000, aux_updateCalendar);
	timer.run();
}

//TODO join moment obj with date.js
//     find better solution for filling up the numbers
function aux_updateCalendar() {
	var now = moment();
	var today = now.date();
	var firstDayOfMonth = now.startOf('month').weekday();
	var lastDayOfMonth = now.endOf('month').date();
	var firstDayLastWeekLastMonth = now.subtract(1, 'months').endOf('month').startOf('week').date();
	//console.log(firstDayLastWeekLastMonth);
	
	var day = 1;
	var day2 = 1;
	var end = lastDayOfMonth + firstDayOfMonth;
	$(".calRow > td").each(function (i) {
		if (i < firstDayOfMonth) {
			$(this).html(firstDayLastWeekLastMonth++);
			$(this).css("opacity", 0.5);
		}
		else if (i >= end) {
			$(this).html(day2++);
			$(this).css("opacity", 0.5);
		}
		else {
			$(this).html(day++);
			if (today === i - firstDayOfMonth + 1) {
				$(this).css("opacity", 0.5);
			}
		}
	});
}
