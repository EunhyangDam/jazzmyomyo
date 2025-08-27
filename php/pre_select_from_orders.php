<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

/* 유틸: 날짜 파싱 함수 */
function normalize_ymd($y, $m, $d) {
  $y = intval($y); $m = intval($m); $d = intval($d);
  if($y < 1900 || $y > 2100) return '';
  if($m < 1 || $m > 12) return '';
  if($d < 1 || $d > 31) return '';
  return sprintf('%04d-%02d-%02d', $y, $m, $d);
}

function extract_reserve_date($title, $orderDate) {
  $title = (string)$title;
  $yearFromOrder = '';
  if ($orderDate) {
    $ts = strtotime($orderDate);
    if ($ts) $yearFromOrder = date('Y', $ts);
  }

  if (preg_match('/\b(20\d{2}|19\d{2})[.\-\/](\d{1,2})[.\-\/](\d{1,2})\b/u', $title, $m)) {
    $f = normalize_ymd($m[1], $m[2], $m[3]);
    if ($f) return $f;
  }

  if (preg_match('/\b(\d{1,2})\s*월\s*(\d{1,2})\s*일\b/u', $title, $m)) {
    $y = $yearFromOrder !== '' ? $yearFromOrder : date('Y');
    $f = normalize_ymd($y, $m[1], $m[2]);
    if ($f) return $f;
  }

  if (preg_match('/\b(\d{1,2})[.\-\/](\d{1,2})\b/u', $title, $m)) {
    $y = $yearFromOrder !== '' ? $yearFromOrder : date('Y');
    $f = normalize_ymd($y, $m[1], $m[2]);
    if ($f) return $f;
  }

  return '';
}

/* 파라미터 수집 */
$page = isset($_REQUEST['page']) ? (int)$_REQUEST['page'] : 1;
$size = isset($_REQUEST['pageSize']) ? (int)$_REQUEST['pageSize'] : 10;
$q = trim($_REQUEST['q'] ?? '');

if ($page < 1) $page = 1;
if ($size < 1) $size = 10;
if ($size > 50) $size = 50;
$off = ($page - 1) * $size;

/* 필터 조건 */
$where = "o.orderDel=0 AND o.orderType = 'MENU'";
if ($q !== '') {
  $qq = mysqli_real_escape_string($CONN, $q);
  $where .= " AND (o.productName LIKE '%{$qq}%' OR o.userName LIKE '%{$qq}%')";
}

/* 쿼리 구성 */
$SQL = "
  SELECT
    o.idx,
    o.userId,
    o.userName,
    o.productName,
    o.orderType,
    o.orderStatus,
    DATE_FORMAT(o.orderDate, '%Y-%m-%d %H:%i:%s') AS orderDate,
    DATE_FORMAT(o.orderUpdate, '%Y-%m-%d %H:%i:%s') AS orderUpdate,
    o.orderDel
  FROM order_table o
  WHERE {$where}
  ORDER BY o.idx DESC
  LIMIT {$off}, {$size}
";

/* 쿼리 실행 및 오류 처리 */
$RES = mysqli_query($CONN, $SQL);

if (!$RES) {
  http_response_code(500);
  echo json_encode([
    'error' => '쿼리 실패',
    'sql' => $SQL,
    'mysqli_error' => mysqli_error($CONN)
  ]);
  exit;
}

/* 결과 처리 */
$arr = [];
while ($item = mysqli_fetch_assoc($RES)) {
  $reserve = extract_reserve_date($item['productName'], $item['orderDate']);
  $arr[] = [
    'idx'         => (int)$item['idx'],
    'title'       => $item['productName'],
    'author'      => $item['userName'],
    'orderType'   => $item['orderType'],
    'orderStatus' => $item['orderStatus'],
    'reserveDate' => $reserve,
    'wDate'       => $item['orderDate'],
    'wUpdate'     => $item['orderUpdate'],
    'wDel'        => (int)$item['orderDel']
  ];
}

echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
mysqli_close($CONN);
