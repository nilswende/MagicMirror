function positionDivs() {
	var validChoice = $("body > .content");

	for (var side in position) {
		var arr = position[side];

		for (var divKey in arr) {
			var div = arr[divKey];
			//check if specified div is valid
			if (div == "" || ! $("." + div).is(validChoice)) {
				continue;
			}

			$("." + div).appendTo("." + side);
			switch (side) {
				case "middle":
					$("." + div + " > table").css("margin", "auto");
					break;
				case "right":
					$("." + div + " > table").css("text-align", "right");
					break;
			}
		}
	}
	// remove all non chosen divs from DOM
	$("body > .content").remove();
}
