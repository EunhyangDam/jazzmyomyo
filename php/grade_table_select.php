<?php
// /jazzmyomyo/grade_table_select.php
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
  echo json_encode(["error" => "DB 연결 실패"], JSON_UNESCAPED_UNICODE);
  exit;
}
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

$sql = "SELECT idx, gradeName, `condition`, benefit FROM grade_table ORDER BY idx ASC";
$res = mysqli_query($CONN, $sql);

$out = [];
if ($res) {
  while ($row = mysqli_fetch_assoc($res)) {
    $out[] = [
      "idx"       => (int)$row["idx"],
      "name"      => $row["gradeName"],
      "condition" => $row["condition"],
      "benefit"   => $row["benefit"],
    ];
  }
  echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} else {
  http_response_code(500);
  echo json_encode(["error" => mysqli_error($CONN)], JSON_UNESCAPED_UNICODE);
}

mysqli_close($CONN);
