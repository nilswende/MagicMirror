function putMinusIfNegative (temp) {
	temp = Math.round(temp * 1e1) / 1e1;
	if (temp < 0.0) {
		return "&minus;" + (-temp).toFixed(1);
	}
	return temp.toFixed(1);
}

function animateElement (elem, duration, opacity, fn) {
	elem.fadeTo(duration, 0, "linear", fn);
	elem.fadeTo(duration, opacity, "linear");
}
