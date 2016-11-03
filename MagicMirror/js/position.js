﻿function positionDivs() {
	var validChoice = $("body > .content");
	var chosenDivs = [];

	for (let side in position) {
		let arr = position[side];

		for (let divKey in arr) {
			let div = arr[divKey];
			//check if specified div is valid
			if (div != "" && $("." + div).is(validChoice)) {
				chosenDivs.push(div);
				$("." + div).appendTo("." + side);
				switch (side) {
					case "middle":
						$("." + div + " > table").css("margin", "auto");
						break;
					case "right":
						$("." + div).css("float", "right");
						break;
				}
			}
		}
	}
	// remove all non chosen divs from DOM
	$("body > .content").remove();

	return chosenDivs;
}

function pullDivsToBottom() {
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

	var maxHeight = Math.max(heightLeft, heightMiddle, heightRight);
	var margin = $(".container").height() - maxHeight;
	$(".container").css("margin-top", margin);
	$(".container").height(maxHeight);
}
