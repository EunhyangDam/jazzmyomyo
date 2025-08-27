<?
// http://jazzmyomyo.dothome.co.kr/jazzmyomyo/delivery_table_update.php

//1. DB접속 열기
include_once('./header.php');

    $idx              = $_POST['idx'];
    $userId           = $_POST['userId'];
    $deliveryDefault  = $_POST['deliveryDefault'];
    $memo = str_replace("'","\'",$_POST['memo'] );
    $recipient        = $_POST['recipient'];
    $deliveryHp       = $_POST['deliveryHp'];
    $deliveryRequest = str_replace("'","\'",$_POST['deliveryRequest'] );
    $zipCode          = $_POST['zipCode'];
    $deliveryaddress1 = $_POST['deliveryaddress1'];
    $deliveryaddress2 = $_POST['deliveryaddress2'];


    if($deliveryDefault==1){
        $SQL1 = "UPDATE `delivery_table` 
                SET deliveryDefault=0
                WHERE userId='$userId'
                ";
        $RES1 = mysqli_query($CONN, $SQL1);     // 쿼리
    }



    $SQL2 = "UPDATE `delivery_table` 
            SET    deliveryDefault='$deliveryDefault', 
                   memo='$memo',
                   recipient='$recipient',
                   deliveryHp='$deliveryHp',
                   deliveryRequest='$deliveryRequest',
                   zipCode='$zipCode',
                   deliveryaddress1='$deliveryaddress1',
                   deliveryaddress2='$deliveryaddress2'
            WHERE  idx='$idx' AND userId='$userId'
            ";
    $RES2 = mysqli_query($CONN, $SQL2);     // 쿼리


    if($RES2){
        echo 1; // 성공 메시지 숫자 1
    }
    else{
        echo 0; // 실패 메시지 숫자 0
    }
    
?>