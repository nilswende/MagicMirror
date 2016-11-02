function positionDivs() {
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

	$(".left > .content").each(function (i) {
		heightLeft += $(this).height();
	});
	$(".middle > .content").each(function (i) {
		heightMiddle += $(this).height();
	});
	$(".right > .content").each(function (i) {
		heightRight += $(this).height();
	});

	var height = Math.max(heightLeft, heightMiddle, heightRight);
	$(".container").css("margin-top", height);
}
