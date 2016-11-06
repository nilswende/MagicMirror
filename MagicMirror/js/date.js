date.update = function () {
	var now = moment();
	date.aux_update(now);
	setTimeoutWithDST(now, date.update);
}

date.aux_update = function (now) {
	var longDate = now.format("LLLL").split(" ", 4);
	var dateString = longDate[0] + "<br/>" + longDate[1] + " " + longDate[2];
	if (date.showYear) {
		dateString += (date.alwaysBreakYear ? "<br/>" : " ") + longDate[3];
	}
	$("#date").html(dateString);
}


function setTimeoutWithDST(now, fn) {
	var nextDay = now.clone().add(1, 'days').startOf('day');
	var timeout = nextDay.diff(now);
	setTimeout(fn, timeout);
}
