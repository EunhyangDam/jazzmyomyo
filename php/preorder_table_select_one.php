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
if (!$CONN) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'DB 연결 실패']);
  exit;
}
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

// --- GET 방식으로 id 받아오기
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'ID 누락 또는 잘못된 값']);
  exit;
}

// --- 해당 id로 데이터 조회
$sql = "SELECT * FROM preorder_table WHERE id = ? AND is_deleted = 0 LIMIT 1";
$stmt = mysqli_prepare($CONN, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$data = mysqli_fetch_assoc($result);

// --- 정리
mysqli_stmt_close($stmt);
mysqli_close($CONN);

// --- 결과 반환
if ($data) {
  echo json_encode(['success' => true, 'item' => $data], JSON_UNESCAPED_UNICODE);
} else {
  http_response_code(404);
  echo json_encode(['success' => false, 'error' => '데이터 없음']);
}
