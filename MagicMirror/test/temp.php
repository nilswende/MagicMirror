<?php
    $sensorData = exec("cat /sys/bus/w1/devices/28-0000077bb680/w1_slave |grep t=");
    $temp = explode("t=", $sensorData);
    $temp = $temp[1] / 1000;
    $temp = round($temp, 1);
	
    echo $temp;
?>
