<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB 연결
$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';

$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');

if (!$CONN) {
  http_response_code(500);
  echo json_encode(['error' => 'DB 연결 실패']);
  exit;
}

// 쿼리: 삭제되지 않은 모든 게시물 조회
$sql = "SELECT 
          id AS idx,
          title,
          writer_name,
          reserve_date,
          created_at,
          status
        FROM preorder_table
        WHERE is_deleted = 0
        ORDER BY created_at DESC";

$res = mysqli_query($CONN, $sql);

if (!$res) {
  http_response_code(500);
  echo json_encode(['error' => '쿼리 실패', 'details' => mysqli_error($CONN)]);
  exit;
}

$output = [];
$allowed_status = ['예약중', '예약완료', '예약취소'];

while ($row = mysqli_fetch_assoc($res)) {
  $title = $row['title'] ?: '사전주문';

  // 상태값 앞뒤 공백 제거 후 확인
  $status_raw = trim($row['status']);
  $status = in_array($status_raw, $allowed_status) ? $status_raw : '상태없음';

  $output[] = [
    'idx'         => $row['idx'],
    'title'       => $title,
    'writer_name' => $row['writer_name'], 
    'reserveDate' => $row['reserve_date'],
    'wDate'       => $row['created_at'],
    'status'      => $status,
  ];
}

echo json_encode($output, JSON_UNESCAPED_UNICODE);

// DB 연결 닫기
mysqli_close($CONN);
?>
