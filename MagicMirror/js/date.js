function updateDate() {
	aux_updateDate();
	
	var now = moment().valueOf();
	var nextDay = moment().endOf('day').valueOf() + 1;
	setTimeout(updateDate, nextDay - now);
}

function aux_updateDate() {
	var now = moment();
	var longDate = now.format("LLLL").split(" ", 4);
	var dateString = longDate[0] + "<br/>" + longDate[1] + " " + longDate[2];
	if (date.showYear) {
		dateString += (date.alwaysBreakYear ? "<br/>" : " ") + longDate[3];
	}
	$("#date").html(dateString);
}
