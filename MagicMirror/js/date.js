function updateDate() {
	var now = moment();
	aux_updateDate(now);
	setTimeoutWithDST(now, updateDate);
}

function aux_updateDate(now) {
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
