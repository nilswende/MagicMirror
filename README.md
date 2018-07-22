Another locally running server which handles all outgoing traffic to prevent stuff like [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (Cross-Origin Resource Sharing).

# Installation

## Apache Reverse Proxy
	# enable Apache modules
	sudo a2enmod
	-> proxy proxy_http


	sudo nano /etc/apache2/sites-enabled/000-default.conf

	<VirtualHost *:80>
		...
		# Reverse Proxy for backend server
		<Location /gas>
			ProxyPass http://127.0.0.1:8080/gas
			ProxyPassReverse http://127.0.0.1:8080/gas
		</Location>
		<Location /transport>
			ProxyPass http://127.0.0.1:8080/transport
			ProxyPassReverse http://127.0.0.1:8080/transport
		</Location>
		<Location /weather>
			ProxyPass http://127.0.0.1:8080/weather
			ProxyPassReverse http://127.0.0.1:8080/weather
		</Location>
		<Location /forecast>
			ProxyPass http://127.0.0.1:8080/forecast
			ProxyPassReverse http://127.0.0.1:8080/forecast
		</Location>
	</VirtualHost>

## Compile for Raspi 2 Model B (Windows)
	# set user variables for compile
	setx GOOS linux
	setx GOARCH arm
	setx GOARM 7

	# open new cmd
	cd C:\Users\nilsw\go\src\github.com\nilswende\MagicMirror-server\main
	go build -o MagicMirror-server main.go

## Deployment
	# copy file to /usr/bin/
	sudo chmod +x /usr/bin/MagicMirror-server

	# start the server on startup
	sudo crontab -e

	@reboot /usr/bin/MagicMirror-server
