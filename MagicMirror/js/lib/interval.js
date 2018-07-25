/**
  https://gist.github.com/manast/1185904

  Example of use:

	var timer = new interval(50, function(){
		console.log(new Date().getTime());
    });
    timer.run();
*/
function interval(duration, fn) {
	this.baseline = undefined;

	this.run = function() {
		if (this.baseline === undefined) {
			this.baseline = new Date().getTime();
		}
		fn();
		var end = new Date().getTime();
		this.baseline += duration;

		var nextTick = duration - (end - this.baseline);
		if (nextTick < 0) {
			nextTick = 0;
		}
		(function(i) {
			i.timer = setTimeout(function() {
				i.run();
			}, nextTick)
		}(this));
	}

	this.stop = function() {
		clearTimeout(this.timer);
	}
}

/**
	Repeats fn aligned to the interval of length and unit.

	Example: alignedInterval(5, 'minute', fn) executes fn at the start of every 5-minute-interval in an hour.
*/
function alignedInterval(length, unit, fn) {
	this.baseline = undefined;

	this.run = function() {
		if (this.baseline === undefined) {
			this.baseline = moment().startOf(unit);
			this.baseline.add(10, "ms"); // rather late than early
		}
		fn();
		var end = moment();

		this.baseline.add(length, unit);
		var nextTick = this.baseline.diff(end);
		if (nextTick < 0) {
			nextTick = 0;
		}
		(function(i) {
			i.timer = setTimeout(function() {
				i.run();
			}, nextTick)
		}(this));
	}

	this.stop = function() {
		clearTimeout(this.timer);
	}
}
