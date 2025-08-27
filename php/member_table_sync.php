<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

// DB 연결
$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
if (!$CONN) { echo "DB 연결 실패"; exit; }
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

// grade_table에서 '일반회원'의 idx 가져오기
$gradeName = '일반회원';
$res = mysqli_query($CONN, "SELECT idx FROM grade_table WHERE gradeName = '{$gradeName}'");
$gradeIdx = 0;
if ($row = mysqli_fetch_assoc($res)) {
  $gradeIdx = (int)$row['idx'];
} else {
  echo "등급을 찾을 수 없습니다.";
  exit;
}

// 동기화 쿼리
$sql = "
INSERT INTO member_table (signup_idx, userId, userGrade, userStatus, userDelete)
SELECT s.idx, s.userId, {$gradeIdx}, '정상', 0
FROM signup_table s
LEFT JOIN member_table m ON m.signup_idx = s.idx
WHERE m.idx IS NULL
";

$ok = mysqli_query($CONN, $sql);

if ($ok) {
  echo "동기화 완료";
} else {
  echo "동기화 실패: " . mysqli_error($CONN);
}

mysqli_close($CONN);
