<?php
	header('Content-type:application/json;charset=utf-8');
    $sensorData = exec("cat /sys/bus/w1/devices/28-0000077bb680/w1_slave");
    $arr = explode(" ", $sensorData);
	$status = strtolower(arr[12]);
    $temp = substr($arr[22], 2);
    $temp = $temp / 1000;
    $temp = round($temp, 1);
	
	echo json_encode( array('status' => $status, 'temp' => $temp) );
?>
