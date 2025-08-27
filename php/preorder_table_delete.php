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
  echo json_encode(['success' => false, 'message' => 'DB 연결 실패']);
  exit;
}
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

// GET 파라미터에서 ID를 받음
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id === 0) {
  echo json_encode(['success' => false, 'message' => '필수값 누락: ID가 필요합니다.']);
  mysqli_close($CONN);
  exit;
}

// 소프트 삭제 실행: is_deleted를 1로 업데이트
$ok = mysqli_query($CONN, "
  UPDATE preorder_table 
  SET is_deleted = 1, updated_at = NOW() 
  WHERE id = {$id} 
  LIMIT 1
");

if ($ok) {
  if (mysqli_affected_rows($CONN) > 0) {
    echo json_encode(['success' => true, 'message' => '삭제 성공']);
  } else {
    echo json_encode(['success' => false, 'message' => '해당 ID의 예약을 찾을 수 없거나 이미 삭제되었습니다.']);
  }
} else {
  echo json_encode(['success' => false, 'message' => 'UPDATE 실패: ' . mysqli_error($CONN)]);
}

mysqli_close($CONN);
?>