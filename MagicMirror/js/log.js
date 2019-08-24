log.post = function (message) {
	$.post({
		url: log.url,
		data: message
	});
}
