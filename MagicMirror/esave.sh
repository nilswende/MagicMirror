#!/bin/bash
HandyIP="192.168.1.203"
EVERY=60
OffTime="2300" # z.B. 23:59 Uhr
StartTime="600" # z.B. 7:00 Uhr
dummy="WAS_ON"
Time="Night"
# For more information https://dracarysdiy.wordpress.com
pingHandy() {
    if [ "$(ping -q -W5 -c1 $HandyIP | grep '1 received')" != "" ]; then
        echo "ONLINE"
    else
        echo "OFFLINE"
    fi
}
startSocket() {
  tvservice -p;
sudo chvt 1;
sudo chvt 7;
  echo "Monitor wurde angeschaltet!"
}
stopSocket() {
  tvservice -o;
  echo "Monitor wurde ausgeschaltet!"
}
while :; do
                currentTime=$(date +"%k%M")
                if (( "$currentTime" > "$StartTime" )) && (( "$currentTime" < "$OffTime" )); then
					echo "Es ist Tag"
					Time=$"Day"
                    PingCheck=$(pingHandy)
                    if [ "$PingCheck" = "ONLINE" ]; then
						echo "Handy online!"
                        if [ "$dummy" = "WAS_OFF" ]; then
                            echo "[$(date +"%d.%m.%Y %H:%M:%S")] Monitor wird eingeschaltet!"
                            startSocket
                            dummy=$"WAS_ON"
                        fi
                        elif [ "$PingCheck" = "OFFLINE" ]; then
							echo "Handy offline! Teste erneut"
				PingCheck=$(pingHandy)
							if [ "$PingCheck" = "OFFLINE" ]; then
								echo "Handy offline!"
                                if [ "$dummy" = "WAS_ON" ]; then
                                     dummy=$"WAS_OFF"
                                echo "[$(date +"%d.%m.%Y %H:%M:%S")] Monitor wird ausgeschaltet!"
                                stopSocket
                                fi
							fi
                        fi
                else
					echo "Es ist Nacht!"
                            if [ "$Time" = "Day" ]; then
							echo "[$(date +"%d.%m.%Y %H:%M:%S")] Monitor wird ausgeschaltet, da Nachts!"
							stopSocket
							Time=$"Night"
							dummy=$"WAS_OFF"
							fi
                fi
        sleep $EVERY
done
exit 0