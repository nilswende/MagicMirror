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
	Repeats fn aligned to the interval of length and unit, with a random maximum time offset of maxOffset in milliseconds.

	Example: alignedInterval(5, 'minute', fn) executes fn at the start of every 5-minute-interval in an hour.
*/
function alignedInterval(length, unit, fn, maxOffset) {
	alignedInterval.actives = [];
	this.baseline = undefined;

	alignedInterval.resetAll = function() {
		for (active of actives) {
			active.stop();
			active.baseline = undefined;
			active.run();
		}
	}

	this.run = function() {
		if (this.baseline === undefined) {
			resetBaseline(this);
			alignedInterval.actives.push(this);
		}
		fn();
		var end = moment();

		this.baseline.add(length, unit);
		var nextTick = this.baseline.diff(end);
		if (nextTick < 0) {
			resetBaseline(this);
			this.baseline.add(length, unit);
			nextTick = 0;
		}
		if (maxOffset !== undefined) {
			nextTick += randomInt(maxOffset);
		}
		(function(i) {
			i.timer = setTimeout(function() {
				i.run();
			}, nextTick)
		}(this));


		function resetBaseline(that) {
			that.baseline = moment().startOf(unit);
			that.baseline.add(10, "ms"); // rather be late than early
		}
	}

	this.stop = function() {
		clearTimeout(this.timer);
		alignedInterval.actives.filter(active => active != this);
	}
}
