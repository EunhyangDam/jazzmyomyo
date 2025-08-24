<?

// 공연예약
header('Content-Type: application/json; charset=utf-8');
include_once('./header.php'); // $CONN (mysqli)

$raw = file_get_contents('php://input');
$in  = json_decode($raw, true);

// 입력값
$raw = file_get_contents('php://input');
$in  = json_decode($raw, true);

// 입력값
$resType      = $in['type'] ?? '';     // 'guest' | 'member'
$userId       = $in['userId'] ?? null; // member면 회원 ID, guest면 null 권장
$userName     = $in['name'] ?? '';
$userEmail    = $in['email'] ?? '';
$userHp       = $in['phone'] ?? '';

$artistName   = $in['artistName'] ?? ($in['artist'] ?? '');
$productName  = $in['concertTitle'] ?? ($in['productName'] ?? '');

$poster       = $in['poster'] ?? null;
$scheduleDate = $in['date'] ?? '';
$timeStart    = $in['time_start'] ?? '';
$timeEnd      = $in['time_end'] ?? null;
$peopleCount  = intval($in['people_count'] ?? 0);
$price        = intval($in['price'] ?? 0);
$payMethod    = $in['payMethod'] ?? 'none';



if (!in_array($resType, ['guest','member'])) {
  echo json_encode(['ok'=>false,'msg'=>'type invalid']); exit;
}

// 폼 데이터 및 회원정보 가져오기
if ($resType === 'member') {
  // 1) 세션 우선
  if (!empty($_SESSION['userId'])) {
    $userId = $_SESSION['userId'];
    if (!empty($_SESSION['userName']))  $userName  = $_SESSION['userName'];
    if (!empty($_SESSION['userEmail'])) $userEmail = $_SESSION['userEmail'];
    if (!empty($_SESSION['userHp']))    $userHp    = $_SESSION['userHp'];
  }
  // 2) 세션에 상세가 없다면 DB에서 조회
  if ($userId && (empty($userEmail) || empty($userName) || empty($userHp))) {
    $sqlU = "SELECT userName, userEmail, userHp FROM signup_table WHERE userId=?";
    $stmtU = mysqli_prepare($CONN, $sqlU);
    mysqli_stmt_bind_param($stmtU, "s", $userId);
    mysqli_stmt_execute($stmtU);
    $resU = mysqli_stmt_get_result($stmtU);
    if ($row = mysqli_fetch_assoc($resU)) {
      if (empty($userName))  $userName  = $row['userName']  ?? $userName;
      if (empty($userEmail)) $userEmail = $row['userEmail'] ?? $userEmail;
      if (empty($userHp))    $userHp    = $row['userHp']    ?? $userHp;
    }
  }

  if (!$userId) { echo json_encode(['ok'=>false,'msg'=>'not logged in']); exit; }
}

if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(['ok'=>false,'msg'=>'invalid email']); exit;
}
if (!$productName || !$scheduleDate || !$timeStart || $peopleCount <= 0) {
  echo json_encode(['ok'=>false,'msg'=>'missing required fields']); exit;
}


// INSERT
$sql = "INSERT INTO ticket_resavation_table
  (resType, userId, userName, userEmail, userHp, artistName, productName, poster,
   scheduleDate, timeStart, timeEnd, peopleCount, price, payMethod, orderStatus)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($CONN, $sql);
if (!$stmt) {
  echo json_encode(['ok'=>false,'msg'=>'prepare fail','err'=>mysqli_error($CONN)]); exit;
}

$status = 'reserved';

// 타입 문자열: s 11개 + i 2개(peopleCount, price) + s 2개 = 총 15개
$types = "sssssssssssiiss";

// 쉼표 추가 + 타입/변수 개수 일치
if (!mysqli_stmt_bind_param(
  $stmt,
  $types,
  $resType, $userId, $userName, $userEmail, $userHp, $artistName, $productName, $poster,
  $scheduleDate, $timeStart, $timeEnd, $peopleCount, $price, $payMethod, $status
)) {
  echo json_encode(['ok'=>false,'msg'=>'bind fail','err'=>mysqli_error($CONN)]); exit;
}

$ok = mysqli_stmt_execute($stmt);
if (!$ok) {
  echo json_encode(['ok'=>false,'msg'=>'db error','err'=>mysqli_error($CONN)]); exit;
}

echo json_encode(['ok'=>true,'id'=>mysqli_insert_id($CONN)]);
?>