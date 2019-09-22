position.pullDivsToBottom = function () {
	var heightLeft = 0, heightMiddle = 0, heightRight = 0;
	var padding = 40;

	$(".left > .content").each(function (i) {
		heightLeft += $(this).height() + padding;
	});
	$(".middle > .content").each(function (i) {
		heightMiddle += $(this).height() + padding;
	});
	$(".right > .content").each(function (i) {
		heightRight += $(this).height() + padding;
	});

	var containers = $(".container");
	var actualHeight = Math.max(heightLeft, heightMiddle, heightRight);
	var margin = containers.height() - actualHeight;
	containers.height(actualHeight);
	containers.css("margin-top", margin);
};
