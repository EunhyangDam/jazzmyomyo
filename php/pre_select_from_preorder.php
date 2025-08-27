<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');

// DB 연결
$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

// 파라미터
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id === 0) {
  http_response_code(400);
  echo json_encode(['error' => '잘못된 요청']);
  exit;
}

// 쿼리 실행
$SQL = "
  SELECT
    reserve_date,
    reserve_time,
    people,
    wine,
    beverage,
    food,
    note,
    status
  FROM preorder_table
  WHERE id = $id AND is_deleted = 0
  LIMIT 1
";

$RES = mysqli_query($CONN, $SQL);
$ROW = mysqli_fetch_assoc($RES);

if (!$ROW) {
  http_response_code(404);
  echo json_encode(['error' => '사전예약 정보를 찾을 수 없습니다']);
  exit;
}

echo json_encode($ROW, JSON_UNESCAPED_UNICODE);
