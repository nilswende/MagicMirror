function putMinusIfNegative(temp) {
	temp = Math.round(temp * 1e1) / 1e1;
	if (temp < 0.0) {
		return "&minus;" + (-temp).toFixed(1);
	}
	return temp.toFixed(1);
}

function setTimeoutWithDST(now, fn) {
	var nextDay = now.clone().add(1, 'days').startOf('day');
	var timeout = nextDay.diff(now);
	setTimeout(fn, timeout);
}
