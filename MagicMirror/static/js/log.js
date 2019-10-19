log.post = function (message) {
	fetch(new URL(log.url), {
		method: 'POST',
		headers: {
		  'Content-Type': 'text/plain'
		},
		body: message
	});
}
