<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';

$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
if (!$CONN) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'DB 연결 실패']);
  exit;
}
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

/* 입력값 */
$id           = isset($_POST['id']) ? intval($_POST['id']) : 0;
$title        = isset($_POST['title']) ? trim($_POST['title']) : '';
$people       = isset($_POST['people']) ? intval($_POST['people']) : 1;
$wine         = isset($_POST['wine']) ? trim($_POST['wine']) : '';
$beverage     = isset($_POST['beverage']) ? trim($_POST['beverage']) : '';
$food         = isset($_POST['food']) ? trim($_POST['food']) : '';
$note         = isset($_POST['note']) ? trim($_POST['note']) : '';
$reserve_date = isset($_POST['reserve_date']) ? trim($_POST['reserve_date']) : '';
$reserve_time = isset($_POST['reserve_time']) ? trim($_POST['reserve_time']) : '';
$status       = isset($_POST['status']) ? trim($_POST['status']) : '';
$reply        = isset($_POST['reply']) ? trim($_POST['reply']) : '';

/* 필수값 체크 */
if ($id <= 0 || $title === '' || $people <= 0 || $reserve_date === '' || $reserve_time === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => '필수값 누락: ID, 제목, 인원, 날짜, 시간']);
  mysqli_close($CONN);
  exit;
}

/* SQL: reply는 항상 바인딩(빈 문자열 허용). reply가 있을 때만 reply_date 업데이트 */
$sql = "UPDATE preorder_table SET
          title = ?,
          people = ?,
          wine = ?,
          beverage = ?,
          food = ?,
          note = ?,
          status = ?,
          reply = ?,
          reserve_date = ?,
          reserve_time = ?,
          updated_at = NOW()";

if ($reply !== '') {
  $sql .= ", reply_date = NOW()";
}
$sql .= " WHERE id = ? AND is_deleted = 0";

$stmt = mysqli_prepare($CONN, $sql);
if (!$stmt) {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'SQL 준비 실패: ' . mysqli_error($CONN)]);
  mysqli_close($CONN);
  exit;
}

/* 타입 문자열 (공백 없이): s i s s s s s s s s i  → "sissssssssi" */
$bind_ok = mysqli_stmt_bind_param(
  $stmt,
  "sissssssssi",
  $title,         // s
  $people,        // i
  $wine,          // s
  $beverage,      // s
  $food,          // s
  $note,          // s
  $status,        // s
  $reply,         // s (빈 문자열 가능)
  $reserve_date,  // s (YYYY-MM-DD)
  $reserve_time,  // s (HH:MM)
  $id             // i
);

if (!$bind_ok) {
  echo json_encode(['success' => false, 'message' => '바인딩 실패: ' . mysqli_error($CONN)]);
  mysqli_stmt_close($stmt);
  mysqli_close($CONN);
  exit;
}

/* 실행 */
if (!mysqli_stmt_execute($stmt)) {
  echo json_encode(['success' => false, 'message' => '수정 실패: ' . mysqli_stmt_error($stmt)]);
  mysqli_stmt_close($stmt);
  mysqli_close($CONN);
  exit;
}

$affected = mysqli_stmt_affected_rows($stmt);
mysqli_stmt_close($stmt);

/* (선택) order_table 최신 1건 동기화 – 필요하면 주석 해제
$productName = sprintf(
  "[ %s / %s / %s인 / %s / %s / %s ]",
  $reserve_date, $reserve_time, $people,
  $wine !== '' ? $wine : '-',
  $beverage !== '' ? $beverage : '-',
  $food !== '' ? $food : '-'
);
$sql2 = "UPDATE order_table
         SET productName = ?, orderStatus = ?
         WHERE preorderId = ?
         ORDER BY idx DESC
         LIMIT 1";
if ($stmt2 = mysqli_prepare($CONN, $sql2)) {
  mysqli_stmt_bind_param($stmt2, "ssi", $productName, $status, $id);
  mysqli_stmt_execute($stmt2);
  mysqli_stmt_close($stmt2);
}
*/

echo json_encode([
  'success'  => true,
  'affected' => $affected  // 0이면 내용이 동일했던 것
]);

mysqli_close($CONN);
