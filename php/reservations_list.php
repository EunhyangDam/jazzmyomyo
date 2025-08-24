<?

header('Content-Type: application/json; charset=utf-8');
include_once('./header.php'); // $CONN 그대로 사용

// ---- 입력 파라미터 ----
$mode     = isset($_GET['mode']) ? trim($_GET['mode']) : 'user'; // user | admin
$userId   = isset($_GET['userId']) ? trim($_GET['userId']) : '';

// 공통(관리자에서만 의미 있는 필터도 여기에 받아두고, user 모드에선 무시)
$q        = isset($_GET['q']) ? trim($_GET['q']) : '';
$resTypeF = isset($_GET['resType']) ? trim($_GET['resType']) : '';     // member|guest (admin 전용)
$statusF  = isset($_GET['status']) ? trim($_GET['status']) : '';       // reserved|completed|canceled|deleted
$month    = isset($_GET['month']) ? trim($_GET['month']) : '';         // YYYY-MM (신청월=createdAt)
$dateFrom = isset($_GET['date_from']) ? trim($_GET['date_from']) : ''; // 공연일 시작
$dateTo   = isset($_GET['date_to']) ? trim($_GET['date_to']) : '';     // 공연일 종료

$page     = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$perPage  = isset($_GET['perPage']) ? max(1, intval($_GET['perPage'])) : 50;
$offset   = ($page - 1) * $perPage;

$sortKey  = isset($_GET['sort']) ? trim($_GET['sort']) : 'created';    // created|schedule|name
$orderDir = strtolower(isset($_GET['order']) ? trim($_GET['order']) : 'desc');
$orderDir = ($orderDir === 'asc') ? 'ASC' : 'DESC';

// ---- 권한/기본 동작(호환) ----
// 기본은 'user' → 예전처럼 userId 필수 + 회원예약만
if ($mode === 'user') {
  if ($userId === '') {
    echo json_encode(['ok'=>false, 'msg'=>'missing userId', 'rows'=>[], 'total'=>0]); exit;
  }
}
// admin 모드 권한 확인(프로젝트의 세션 키에 맞게 수정)
if ($mode === 'admin') {
  $role = isset($_SESSION['role']) ? $_SESSION['role'] : '';
  if (!in_array($role, ['admin', 'manager'])) {
    http_response_code(403);
    echo json_encode(['ok'=>false, 'msg'=>'forbidden']); exit;
  }
}

// ---- WHERE 구성 ----
$where = [];
$binds = [];
$types = '';

if ($mode === 'user') {
  // 마이페이지: 기존 동작 유지 (회원 예약만)
  $where[] = "resType='member' AND userId=?";
  $binds[] = $userId;
  $types  .= 's';
} else {
  // 관리자: 필터 적용
  if ($resTypeF === 'member' || $resTypeF === 'guest') {
    $where[] = "resType=?";
    $binds[] = $resTypeF;
    $types  .= 's';
  }
}

// 상태 필터
if (in_array($statusF, ['reserved','completed','canceled','deleted'])) {
  $where[] = "orderStatus=?";
  $binds[] = $statusF;
  $types  .= 's';
}

// 신청월(createdAt) 필터 (YYYY-MM)
if ($month !== '') {
  $where[] = "DATE_FORMAT(createdAt, '%Y-%m') = ?";
  $binds[] = $month;
  $types  .= 's';
}

// 공연일 범위
if ($dateFrom !== '') { $where[] = "scheduleDate >= ?"; $binds[] = $dateFrom; $types .= 's'; }
if ($dateTo   !== '') { $where[] = "scheduleDate <= ?"; $binds[] = $dateTo;   $types .= 's'; }

// 통합검색 (이름/연락처/이메일/공연명)
if ($q !== '') {
  $where[] = "(userName LIKE CONCAT('%', ?, '%')
            OR userHp LIKE CONCAT('%', ?, '%')
            OR userEmail LIKE CONCAT('%', ?, '%')
            OR productName LIKE CONCAT('%', ?, '%'))";
  for ($i=0; $i<4; $i++) { $binds[] = $q; $types .= 's'; }
}

$whereSql = count($where) ? ('WHERE ' . implode(' AND ', $where)) : '';

// ---- 정렬 ----
switch ($sortKey) {
  case 'schedule': $orderBy = "scheduleDate $orderDir, timeStart $orderDir, id $orderDir"; break;
  case 'name':     $orderBy = "userName $orderDir, id $orderDir"; break;
  case 'created':
  default:         $orderBy = "createdAt $orderDir, id $orderDir"; break;
}

// ---- 총 개수 ----
$sqlCount = "SELECT COUNT(*) AS cnt FROM ticket_resavation_table $whereSql";
$stmtC = mysqli_prepare($CONN, $sqlCount);
if (!$stmtC) { echo json_encode(['ok'=>false,'msg'=>'prepare count fail','err'=>mysqli_error($CONN)]); exit; }
if ($types !== '') { mysqli_stmt_bind_param($stmtC, $types, ...$binds); }
mysqli_stmt_execute($stmtC);
$resC = mysqli_stmt_get_result($stmtC);
$total = 0;
if ($rowC = mysqli_fetch_assoc($resC)) { $total = intval($rowC['cnt']); }

// ---- 목록 조회 ----
$sql = "SELECT id, resType, userId, userName, userEmail, userHp, productName, artistName, poster, scheduleDate, timeStart, timeEnd, peopleCount, price, payMethod, orderStatus, createdAt, updatedAt
        FROM ticket_resavation_table
        $whereSql
        ORDER BY $orderBy
        LIMIT ? OFFSET ?
        ";
$stmt = mysqli_prepare($CONN, $sql);
if (!$stmt) { echo json_encode(['ok'=>false,'msg'=>'prepare list fail','err'=>mysqli_error($CONN)]); exit; }

$typesList = $types . 'ii';
$bindsList = $binds; $bindsList[] = $perPage; $bindsList[] = $offset;
mysqli_stmt_bind_param($stmt, $typesList, ...$bindsList);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);

// ---- 결과 ----
$rows = [];
while ($r = mysqli_fetch_assoc($res)) {
  // 비회원은 userId 공백으로(요청사항)
  if (empty($r['userId'])) $r['userId'] = '';
  $rows[] = $r;
}

echo json_encode([
  'ok'      => true,
  'rows'    => $rows,
  'total'   => $total,
  'page'    => $page,
  'perPage' => $perPage
]);

?>