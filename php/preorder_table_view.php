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

// --- GET 방식으로 id 받기
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($id <= 0) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'ID 누락 또는 잘못된 값']);
  mysqli_close($CONN);
  exit;
}

// --- 필요한 필드만 명시 + 날짜/시간 포맷 고정
$sql = "
  SELECT
    id,
    user_id,
    title,
    writer_name,
    -- reserve_date/time 타입에 맞춰 포맷 (DATE/DATETIME인 경우 포맷, 문자열이면 그대로)
    DATE_FORMAT(reserve_date, '%Y-%m-%d') AS reserve_date,
    reserve_time,
    people,
    wine,
    beverage,
    food,
    note,
    status,
    reply,
    DATE_FORMAT(reply_date,  '%Y-%m-%d %H:%i:%s') AS reply_date,
    DATE_FORMAT(created_at,  '%Y-%m-%d %H:%i:%s') AS created_at
  FROM preorder_table
  WHERE id = ? AND is_deleted = 0
  LIMIT 1
";

$stmt = mysqli_prepare($CONN, $sql);
if (!$stmt) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => '쿼리 준비 실패']);
  mysqli_close($CONN);
  exit;
}

mysqli_stmt_bind_param($stmt, "i", $id);

if (!mysqli_stmt_execute($stmt)) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => '쿼리 실행 실패']);
  mysqli_stmt_close($stmt);
  mysqli_close($CONN);
  exit;
}

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
