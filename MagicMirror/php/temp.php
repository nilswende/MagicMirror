<?php
	header('Content-type:application/json;charset=utf-8');
	
	$sensorID = '28-0000077c42f7';
	$logfilePath = "/sys/bus/w1/devices/$sensorID/w1_slave";
	
    $sensorData = exec("cat $logfilePath |grep crc=");
    $status = strtolower(substr($sensorData, 36));
	
    $sensorData = exec("cat $logfilePath |grep t=");
    $temp = strtolower(substr($sensorData, 29));
    $temp = $temp / 1000;
    $temp = round($temp, 1);
	if ($temp == 85) {
		$status = 'power-on';
	}
	
	echo json_encode( array('status' => $status, 'temp' => $temp) );
?>
