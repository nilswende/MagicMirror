<?php
	header('Content-type:application/json;charset=utf-8');
	
	$logfilePath = '/sys/bus/w1/devices/28-0000077c42f7/w1_slave';
    $sensorData = exec("cat $logfilePath");
    $arr = explode(' ', $sensorData);
	$status = strtolower(arr[12]);
    $temp = substr($arr[22], 2);
    $temp = $temp / 1000;
    $temp = round($temp, 1);
	
	echo json_encode( array('status' => $status, 'temp' => $temp) );
?>
