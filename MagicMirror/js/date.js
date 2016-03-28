function updateDate() {
	var now = moment();
	var longDate = now.format("LLLL").split(" ", 4);
	var date = longDate[0] + "<br/>" + longDate[1] + " " + longDate[2];
	if (showDateWithYear) {
		if (alwaysBreakYear) {
			date += "<br/>" + longDate[3];
		}
		else {
			date += " " + longDate[3];
		}
	}
	$(".date").html(date);

	setTimeout(updateDate, 1 * 1000);
}
