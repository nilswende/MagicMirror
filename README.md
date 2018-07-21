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
- Departure times at your local station (if the service provider uses HAFAS ReST API)

Check `config.js` for all available customization options.

## Dependencies

JQuery 2.2.4

Live.js 4

Moment.js 2.12.0

Weather Icons 2.0

# Installation
	# WLAN config # https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md
	sudo raspi-config
	-> 2 -> SSID / PW


	sudo nano /etc/modprobe.d/8192cu.conf

	# disable Edimax-WLAN Power Saving
	options 8192cu rtw_power_mgnt=0 rtw_enusbss=0


	sudo nano /boot/config.txt

	# activating 1-wire with pullup
	dtoverlay=w1-gpio,gpiopin=4,pullup=on


	# change default password
	passwd


	# install all needed programs
	sudo apt-get update && sudo apt-get upgrade -y && sudo apt-get install apache2 php libapache2-mod-php chromium-browser unclutter zsh -y
	wget -O ~/.zshrc https://raw.githubusercontent.com/grml/grml-etc-core/master/etc/zsh/zshrc
	chsh (/usr/bin/zsh)
	sudo apt-get clean


	sudo chown -R pi:pi /var/www/html/


	# copy MagicMirror/ to /var/www/html/
	# copy esave.sh to /home/pi/


	sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart

	#@xscreensaver -no-splash
	# chromium in kioskmode
	@unclutter
	@xset s off
	@xset -dpms
	@xset s noblank
	@chromium-browser --noerrdialogs --kiosk --incognito http://localhost/MagicMirror/index.html


	# sudo nano /etc/rc.local

	# disable HDMI at bootup
	tvservice -o;


	# mark script as executable
	sudo chmod +x /home/pi/esave.sh


	# execute the script at startup
	sudo crontab -e

	@reboot /home/pi/esave.sh > /dev/null 2>&1
	#@reboot /home/pi/esave.sh > /home/pi/esave.log
	0 23 * * * shutdown -h 0
