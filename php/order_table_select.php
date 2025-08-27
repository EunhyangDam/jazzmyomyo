<?php
include_once('./header.php');

// 리액트 아이디
$userId    = $_POST['userId'] ?? null;
// 기본값을 ''로 두고 trim
$orderType = isset($_POST['orderType']) ? trim($_POST['orderType']) : '';

if ($orderType === '') {  // 값이 없으면 전체
    $SQL = "SELECT * FROM order_table
            WHERE TRIM(userId)=TRIM('$userId')
            ORDER BY orderDate DESC";
}
else {                    // 값이 있으면 해당 타입만
    $SQL = "SELECT * FROM order_table
            WHERE TRIM(userId)=TRIM('$userId')
              AND orderType='$orderType'
            ORDER BY orderDate DESC";
}

$RES = mysqli_query($CONN, $SQL);
$arr = [];

if($RES && mysqli_num_rows($RES)>=1){
    while($item = mysqli_fetch_assoc($RES)){
        $arr[] = array(
            'userId'          => $item['userId'],
            'userName'        => $item['userName'],
            'userHp'          => $item['userHp'],
            'orderType'       => $item['orderType'],
            'productId'       => $item['productId'],
            'productName'     => $item['productName'],
            'quantity'        => $item['quantity'],
            'price'           => $item['price'],
            'payMethod'       => $item['payMethod'],
            'shippingAddress' => $item['shippingAddress'],
            'orderDate'       => $item['orderDate'],
            'orderUpdate'     => $item['orderUpdate'],
            'orderStatus'     => $item['orderStatus'],
            'orderDel'        => $item['orderDel']
        );
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
} else {
    echo 0;
}