<?php
include_once('./header.php');

// 리액트 아이디
$userId = $_POST['userId'] ?? '';
$userId = trim($userId);

$SQL = "SELECT * FROM delivery_table
        WHERE TRIM(userId)=TRIM('$userId')
        AND deliveryDel =0
        ORDER BY deliveryDefault DESC, wUpdate DESC
        ";

$RES = mysqli_query($CONN, $SQL);
$arr = [];

if($RES && mysqli_num_rows($RES)>=1){
    while($item = mysqli_fetch_assoc($RES)){
        $arr[] = array(
            'idx'             => $item['idx'], 
            'userId'           => $item['userId'],
            'deliveryDefault'  => $item['deliveryDefault'],
            'memo'             => $item['memo'],
            'recipient'        => $item['recipient'],
            'deliveryHp'       => $item['deliveryHp'],
            'deliveryRequest'  => $item['deliveryRequest'],
            'zipCode'          => $item['zipCode'],
            'deliveryaddress1' => $item['deliveryaddress1'],
            'deliveryaddress2' => $item['deliveryaddress2']
        );
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
} else {
    echo 0;
}