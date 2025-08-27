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

// GET 파라미터
$id     = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$userId = isset($_GET['userId']) ? mysqli_real_escape_string($CONN, $_GET['userId']) : '';

// 조건
$where = "WHERE 1 AND m.userDelete=0";
if ($id > 0)        $where .= " AND m.idx = {$id}";
if ($userId !== '') $where .= " AND s.userId = '{$userId}'";

// SQL
$SQL = "
  SELECT
    m.idx AS id,
    s.userId,
    s.userName    AS name,
    s.userGender  AS gender,
    s.userBirth   AS birth,
    s.userHp      AS phone,
    s.userEmail   AS email,
    s.userAddress AS addr,
    CASE
      WHEN s.userService REGEXP '수신|이메일|무료배송|할인쿠폰' THEN 'Y'
      ELSE 'N'
    END AS agree,
    COALESCE(g.gradeName, m.userGrade) AS grade,
    m.userStatus AS status,
    DATE_FORMAT(s.dateAt, '%Y-%m-%d %H:%i') AS dateAt
  FROM member_table m
  JOIN signup_table s ON s.idx = m.signup_idx
  LEFT JOIN grade_table g ON g.idx = m.userGrade
  {$where}
  ORDER BY s.dateAt DESC, m.idx DESC
";

$RES = mysqli_query($CONN, $SQL);

// 결과 정리
$out = [];
if ($RES && mysqli_num_rows($RES) >= 1) {
  while ($item = mysqli_fetch_assoc($RES)) {
    $out[] = [
      'id'       => (int)$item['id'],
      'userId'   => $item['userId'],
      'name'     => $item['name'],
      'gender'   => $item['gender'],
      'birth'    => $item['birth'],
      'phone'    => $item['phone'],
      'email'    => $item['email'],
      'addr'     => $item['addr'],
      'agree'    => $item['agree'],
      'grade'    => $item['grade'],     
      'status'   => $item['status'],
      'dateAt'   => $item['dateAt'],
      'joinedAt' => $item['dateAt'],
    ];
  }
}

echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
mysqli_close($CONN);
