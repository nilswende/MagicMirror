document.addEventListener("DOMContentLoaded", function (event) {
	if (position.displayDivsAtBottom) {
		/** wait long enough for chromium to enter kiosk mode and all content to be loaded */
		setTimeout(position.pullDivsToBottom, 4000);
	}
});

position.pullDivsToBottom = function () {
	var heightLeft = 0, heightMiddle = 0, heightRight = 0;
	var padding = 40;

	for (let [i, content] of document.querySelectorAll(".left > .content").entries()) {
		heightLeft += content.clientHeight + padding;
	}
	for (let [i, content] of document.querySelectorAll(".middle > .content").entries()) {
		heightMiddle += content.clientHeight + padding;
	}
	for (let [i, content] of document.querySelectorAll(".right > .content").entries()) {
		heightRight += content.clientHeight + padding;
	}

	var maxContainerHeight = Math.max(heightLeft, heightMiddle, heightRight);
	var margin = window.innerHeight - maxContainerHeight;
	document.querySelector(".container").style.marginTop = margin + "px";
};
