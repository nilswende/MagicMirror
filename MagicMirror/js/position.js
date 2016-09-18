function positionDivs() {
	var validChoice = $("body > .content");

	for (let side in position) {
		let arr = position[side];

		for (let divKey in arr) {
			let div = arr[divKey];
			//check if specified div is valid
			if (div != "" && $("." + div).is(validChoice)) {
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
}
