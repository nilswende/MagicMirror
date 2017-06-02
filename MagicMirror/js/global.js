function putMinusIfNegative (temp) {
	temp = Math.round(temp * 1e1) / 1e1;
	if (temp < 0.0) {
		return "&minus;" + (-temp).toFixed(1);
	}
	return temp.toFixed(1);
}

function setTimeoutWithDST (now, fn) {
	var nextDay = now.clone().add(1, 'days').startOf('day');
	var timeout = nextDay.diff(now);
	setTimeout(fn, timeout);
}

function animateRow (row, duration, opacity, fn) {
	row.fadeTo(duration, 0, "linear", fn);
	row.fadeTo(duration, opacity, "linear");
}

function fadeOut(el, fn) {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
	  fn();
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeTo(el, opacity, display) {
  el.style.opacity = opacity;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if ((val += .1) <= opacity) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
