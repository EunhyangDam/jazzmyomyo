<?php
// DB 연결
$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');

$idx = isset($_GET['idx']) ? (int)$_GET['idx'] : 0;

if ($idx === 0) {
  http_response_code(400);
  echo json_encode(['error' => '잘못된 요청']);
  exit;
}

// 주문 1건 조회
$sql = "SELECT 
          idx,
          userName,
          userHp,
          productName,
          productId,
          orderDate,
          orderType,
          orderStatus,
          preorderId
        FROM order_table
        WHERE idx = $idx AND orderDel = 0
        LIMIT 1";

$res = mysqli_query($CONN, $sql);
$row = mysqli_fetch_assoc($res);

if (!$row) {
  http_response_code(404);
  echo json_encode(['error' => '주문을 찾을 수 없습니다']);
  exit;
}

// preorderId가 있다면, preorder_table에서 추가 정보 조회
$preData = null;
if (!empty($row['preorderId'])) {
  $preId = (int)$row['preorderId'];
  $preSql = "SELECT reserve_date AS reserveDate, reserve_time AS time, people, wine, beverage, food, note
             FROM preorder_table
             WHERE id = $preId AND is_deleted = 0
             LIMIT 1";
  $preRes = mysqli_query($CONN, $preSql);
  $preRow = mysqli_fetch_assoc($preRes);

  if ($preRow) {
    $preData = $preRow;
  }
}

// 합쳐서 반환
echo json_encode([
  ...$row,
  ...($preData ?? []) // preorder 값 병합
], JSON_UNESCAPED_UNICODE);
