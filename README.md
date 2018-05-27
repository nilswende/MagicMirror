# MagicMirror
To be run on a RasPi with a webserver (if you want to have an indoor temperature displayed).
Copy it to /var/www/html/

Don't forget to enable ping response for IPv4 in your devices' firewalls to allow the esave script to work.

## Can show:
- Current date and time, optionally with a binary clock
- Calendar
- Current weather and a five-day forecast
- Indoor temperature (if you have an DS18B20 temperature sensor attached)
- Current gas price at your local gas station

Check `config.js` for all available customization options.

## Dependencies

JQuery 2.2.4

Live.js 4

Moment.js 2.12.0

Weather Icons 2.0
