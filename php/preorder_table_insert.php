<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';

$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
if (!$CONN) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'DB 연결 실패']);
  exit;
}
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

$user_id      = mysqli_real_escape_string($CONN, $_POST['user_id']      ?? '');
$writer_name  = mysqli_real_escape_string($CONN, $_POST['writer_name']  ?? '');
$title        = mysqli_real_escape_string($CONN, $_POST['title']        ?? '');
$reserve_date = mysqli_real_escape_string($CONN, $_POST['reserve_date'] ?? '');
$reserve_time = mysqli_real_escape_string($CONN, $_POST['reserve_time'] ?? '');
$people       = isset($_POST['people']) ? intval($_POST['people']) : 1;
$wine         = mysqli_real_escape_string($CONN, $_POST['wine']         ?? '');
$beverage     = mysqli_real_escape_string($CONN, $_POST['beverage']     ?? '');
$food         = mysqli_real_escape_string($CONN, $_POST['food']         ?? '');
$note         = mysqli_real_escape_string($CONN, $_POST['note']         ?? '');
$status       = mysqli_real_escape_string($CONN, $_POST['status']       ?? '예약중');

$missing = [];
if ($user_id === '')      $missing[] = 'user_id';
if ($writer_name === '')  $missing[] = 'writer_name';
if ($title === '')        $missing[] = 'title';
if ($reserve_date === '') $missing[] = 'reserve_date';
if ($reserve_time === '') $missing[] = 'reserve_time';
if ($missing) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => '누락: '.implode(', ', $missing)]);
  mysqli_close($CONN);
  exit;
}

/* 1) preorder_table INSERT */
$sql = "INSERT INTO preorder_table (
  user_id, writer_name, title, reserve_date, reserve_time,
  people, wine, beverage, food, note, status
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($CONN, $sql);
if (!$stmt) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'prepare 실패: '.mysqli_error($CONN)]);
  mysqli_close($CONN);
  exit;
}
mysqli_stmt_bind_param(
  $stmt, "sssssisssss",
  $user_id, $writer_name, $title, $reserve_date, $reserve_time,
  $people, $wine, $beverage, $food, $note, $status
);
if (!mysqli_stmt_execute($stmt)) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => '쿼리 실패: '.mysqli_stmt_error($stmt)]);
  mysqli_stmt_close($stmt);
  mysqli_close($CONN);
  exit;
}
$preorderId = mysqli_insert_id($CONN);
mysqli_stmt_close($stmt);

/* 2) order_table 연동 INSERT */
$userHp = '';
$qHp = "SELECT userHp FROM signup_table WHERE userId = ? LIMIT 1";
if ($hpStmt = mysqli_prepare($CONN, $qHp)) {
  mysqli_stmt_bind_param($hpStmt, "s", $user_id);
  mysqli_stmt_execute($hpStmt);
  $hpRes = mysqli_stmt_get_result($hpStmt);
  if ($hpRes && ($hpRow = mysqli_fetch_assoc($hpRes))) {
    $userHp = $hpRow['userHp'] ?? '';
  }
  mysqli_stmt_close($hpStmt);
}

$productName = sprintf(
  "[ %s / %s / %s인 / %s / %s / %s ]",
  $reserve_date, $reserve_time, $people,
  $wine !== '' ? $wine : '-', 
  $beverage !== '' ? $beverage : '-', 
  $food !== '' ? $food : '-'
);

$userName    = $writer_name;
$orderType   = 'MENU';
$productId   = '';
$quantity    = "1";              
$price       = 20000;            // 예약금 고정 20,000원
$payMethod   = '무통장입금'; 
$shipping    = '';
$orderStatus = $status;
$orderDel    = 0;

$sqlOrder = "INSERT INTO order_table
  (userId, userName, userHp, orderType, productId, productName,
   quantity, price, payMethod, shippingAddress, orderStatus, orderDel, preorderId)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
$orderLinked = false;
if ($stmt2 = mysqli_prepare($CONN, $sqlOrder)) {
  mysqli_stmt_bind_param(
    $stmt2,
    "sssssssisssii",  // s×7, i, s, s, s, i, i
    $user_id,
    $userName,
    $userHp,
    $orderType,
    $productId,
    $productName,
    $quantity,
    $price,
    $payMethod,
    $shipping,
    $orderStatus,
    $orderDel,
    $preorderId
  );
  if (mysqli_stmt_execute($stmt2)) {
    $orderLinked = true;
  } else {
    error_log('order_table insert 오류: '.mysqli_stmt_error($stmt2));
  }
  mysqli_stmt_close($stmt2);
}

echo json_encode([
  'success'     => true,
  'preorderId'  => $preorderId,
  'orderLinked' => $orderLinked
]);

mysqli_close($CONN);
