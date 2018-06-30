function MovAvg (size) {
	this.pointer = 0;
	this.buffer = [];
	this.putAndAvg = function (value) {
		this.buffer[this.pointer] = value;
		this.pointer = (this.pointer + 1) % size;
		var sum = 0;
		for (var i = 0; i < this.buffer.length; i++) {
			sum += this.buffer[i];
		}
		return sum / this.buffer.length;
	};
}
