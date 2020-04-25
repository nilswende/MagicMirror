function MovAvg (size) {
	this.pointer = 0;
	this.buffer = [];
	this.putAndAvg = function (value) {
		this.buffer[this.pointer] = value;
		this.pointer = (this.pointer + 1) % size;
		let sum = this.buffer.reduce((prev, curr) => prev + curr);
		return sum / this.buffer.length;
	};
}
