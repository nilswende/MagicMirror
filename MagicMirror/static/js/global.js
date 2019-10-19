Number.prototype.mod = function (m) {
	let r = this % m;
	return r < 0 ? r + m : r;
}

function putMinusIfNegative (temp) {
	temp = Math.round(temp * 1e1) / 1e1;
	if (temp < 0.0) {
		return "&minus;" + (-temp).toFixed(1);
	}
	return temp.toFixed(1);
}

function animateElement (elem, opacity, fnMiddle, fnEnd) {
	elem.addEventListener("transitionend", function (e) {
		if (fnMiddle !== undefined) {
			fnMiddle.call(elem);
		}
		e.target.removeEventListener(e.type, arguments.callee);
		elem.style.opacity = opacity;
		if (fnEnd !== undefined) {
			fnEnd.call(elem);
		}
	});
	elem.style.opacity = 0;
}

function randomInt (max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function isNumeric (s) {
	let d = Number(s);
	return s !== "" && !Number.isNaN(d);
}
