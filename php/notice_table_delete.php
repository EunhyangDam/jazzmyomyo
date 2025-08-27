<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: text/plain; charset=utf-8');

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
if (!$CONN) { echo "0\nDB 연결 실패"; exit; }

mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

// GET만 사용할 거면 _GET, 혼용이면 _REQUEST
$idx = isset($_GET['idx']) ? (int)$_GET['idx'] : 0;
if ($idx <= 0) { echo "0\n잘못된 idx"; mysqli_close($CONN); exit; }

// 존재/상태 확인
$sel = mysqli_query($CONN, "SELECT wDel FROM notice_table WHERE idx={$idx} LIMIT 1");
if (!$sel) { echo "0\nSELECT 실패: ".mysqli_error($CONN); mysqli_close($CONN); exit; }
$row = mysqli_fetch_assoc($sel);
if (!$row) { echo "0\n없는 글"; mysqli_close($CONN); exit; }

// 이미 삭제된 경우도 성공 처리 (프런트는 목록으로 복귀)
if ((int)$row['wDel'] === 1) { echo "1\nalready"; mysqli_close($CONN); exit; }

// 소프트 삭제
$ok = mysqli_query($CONN, "UPDATE notice_table SET wDel=1 WHERE idx={$idx} LIMIT 1");
if (!$ok) { echo "0\nUPDATE 실패: ".mysqli_error($CONN); mysqli_close($CONN); exit; }

// 값이 동일해도 성공 처리
echo "1";
mysqli_close($CONN);
