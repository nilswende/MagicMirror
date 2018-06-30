function MovAvg (size) {
	this.pointer = 0;
	this.buffer = [];
	this.putAndAvg = function (value) {
		buffer[pointer] = value;
		pointer = (pointer + 1) % size;
		var sum = 0;
		for (i = 0; i < buffer.length; i++) {
			sum += buffer[i];
		}
		return sum / buffer.length;
	};
}
