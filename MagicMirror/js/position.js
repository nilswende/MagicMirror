function positionDivs() {
	for (var side in position) {
		var arr = position[side];

		for (var divKey in arr) {
			var div = arr[divKey];

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
}
