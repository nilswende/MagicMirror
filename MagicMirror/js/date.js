function updateDate() {
	var timer = new interval(1000, aux_updateDate);
	timer.run();
}

function aux_updateDate() {
	var now = moment();
	var longDate = now.format("LLLL").split(" ", 4);
	var date = longDate[0] + "<br/>" + longDate[1] + " " + longDate[2];
	if (time.showDateWithYear) {
		date += (time.alwaysBreakYear ? "<br/>" : " ") + longDate[3];
	}
	$(".date").html(date);
}
