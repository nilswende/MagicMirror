$(document).ready(() => {
	date.showYear = $("#date").hasClass("showYear");
	date.alwaysBreakYear = $("#date").hasClass("alwaysBreakYear");
	new alignedInterval(1, "day", date.update)
		.run();
});

var date = {};

date.update = function () {
	var now = moment();
	var longDate = now.format("LLLL").split(" ", 4);
	var dateString = longDate[0] + "<br/>" + longDate[1] + " " + longDate[2];
	if (date.showYear) {
		dateString += (date.alwaysBreakYear ? "<br/>" : " ") + longDate[3];
	}
	$("#date").html(dateString);
}
