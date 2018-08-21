/**
  Checks for time jumps > 1 sec.
*/
function timesync() {
	timesync.eventName = "timesync";
	timesync.timeout = 1000;
	timesync.jumpTime = 1000;
	this.baseline = undefined;

	this.check = function() {
		if (this.baseline === undefined) {
			this.baseline = new Date().getTime();
		}
		var now = new Date().getTime();
		var diff = now - this.baseline;
		if (diff > timesync.timeout + timesync.jumpTime) {
			window.dispatchEvent(new CustomEvent(timesync.eventName));
		}
		this.baseline = now;
		(function(i) {
			i.timer = setTimeout(function() {
				i.check();
			}, timesync.timeout)
		}(this));
	}

	this.stop = function() {
		clearTimeout(this.timer);
	}
}
