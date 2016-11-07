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
