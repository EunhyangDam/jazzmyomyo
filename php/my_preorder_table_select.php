<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$allowed_origin = 'http://localhost:3000';
if (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'your-domain.com') !== false) {
    $allowed_origin = 'https://www.your-domain.com';
}
header('Access-Control-Allow-Origin: '.$allowed_origin);
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

$DB1='localhost'; $DB2='jazzmyomyo'; $DB3='eevee0202!'; $DB4='jazzmyomyo';
$CONN=mysqli_connect($DB1,$DB2,$DB3,$DB4);
mysqli_set_charset($CONN,'utf8mb4');

if(!$CONN){
  http_response_code(500);
  echo json_encode(['error'=>'DB 연결 실패'], JSON_UNESCAPED_UNICODE);
  exit;
}

$userId = isset($_POST['userId']) ? trim($_POST['userId']) : '';
if($userId===''){ echo json_encode([], JSON_UNESCAPED_UNICODE); exit; }

$latestOrderSql = "
  SELECT o1.*
  FROM order_table o1
  JOIN (
    SELECT preorderId, MAX(orderDate) AS maxDate
    FROM order_table
    WHERE orderDel = 0 AND preorderId IS NOT NULL
    GROUP BY preorderId
  ) x
    ON x.preorderId = o1.preorderId AND x.maxDate = o1.orderDate
  WHERE o1.orderDel = 0
";

$sql = "
  SELECT
    p.id           AS idx,
    p.title        AS title,
    p.writer_name  AS writer_name,
    p.reserve_date AS reserveDate,
    p.reserve_time AS reserve_time,
    p.people       AS people,
    p.wine         AS wine,
    p.beverage     AS beverage,
    p.food         AS food,
    p.note         AS note,
    p.status       AS status,
    p.created_at   AS wDate,
    p.updated_at   AS updated_at,
    p.reply        AS reply,
    p.reply_date   AS reply_date,
    p.user_id      AS userId,
    o.price        AS price,
    o.payMethod    AS payMethod,
    o.orderStatus  AS orderStatus,
    o.orderDate    AS orderDate
  FROM preorder_table p
  LEFT JOIN ( $latestOrderSql ) o
    ON o.preorderId = p.id
  WHERE p.is_deleted = 0 AND p.user_id = ?
  ORDER BY p.created_at DESC
";

$stmt = mysqli_prepare($CONN,$sql);
if(!$stmt){
  http_response_code(500);
  echo json_encode(['error'=>'쿼리 준비 실패','details'=>mysqli_error($CONN)], JSON_UNESCAPED_UNICODE);
  exit;
}

mysqli_stmt_bind_param($stmt,'s',$userId);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);

$allowed_status = ['예약중','예약완료','예약취소'];
$out = [];

while($row = mysqli_fetch_assoc($res)){
  $row['title']  = $row['title'] ?: '사전주문';
  $row['status'] = in_array($row['status'], $allowed_status) ? $row['status'] : '상태없음';
  $out[] = $row;
}

echo json_encode($out, JSON_UNESCAPED_UNICODE);
mysqli_stmt_close($stmt);
mysqli_close($CONN);
