<?

  header('Content-Type: application/json; charset=utf-8');
  include_once('./header.php'); // $CONN 그대로 사용
  


// 없다면 간단 연결 (값 바꿔서 사용)


$page  = max(1, (int)($_GET['page'] ?? 1));
$size  = max(1, min(100, (int)($_GET['size'] ?? 20)));
$month = trim($_GET['month'] ?? '');         // YYYY-MM
$status  = trim($_GET['status'] ?? '');      // reserved|canceled|completed
$resType = trim($_GET['resType'] ?? '');     // member|guest

$where = [];
if ($month !== '' && preg_match('/^\d{4}-\d{2}$/', $month)) {
  $m = $CONN->real_escape_string($month);
  $where[] = "DATE_FORMAT(createdAt,'%Y-%m')='{$m}'";
}
if ($status !== '') {
  $s = $CONN->real_escape_string($status);
  $where[] = "orderStatus='{$s}'";
}
if ($resType !== '') {
  $r = $CONN->real_escape_string($resType);
  $where[] = "resType='{$r}'";
}
$whereSql = $where ? ('WHERE '.implode(' AND ', $where)) : '';

$offset = ($page-1)*$size;

// 총 개수
$cnt = $CONN->query("SELECT COUNT(*) c FROM ticket_resavation_table {$whereSql}")->fetch_assoc();
$total = (int)$cnt['c'];

// 목록 (필요한 10개 컬럼만)
$sql = "
  SELECT
    id, resType, createdAt, scheduleDate, peopleCount,
    userName, userId, userHp, userEmail, orderStatus, productName
  FROM ticket_resavation_table
  {$whereSql}
  ORDER BY createdAt DESC
  LIMIT {$size} OFFSET {$offset}
";
$res = $CONN->query($sql);

$rows = [];
while ($r = $res->fetch_assoc()) {
  // 여기서는 “가공 최소화”: 프론트에서 이미 매핑하니 원본으로 전달
  // (원하면 아래 주석처럼 간단 가공 가능)
  // if ($r['resType'] !== 'member') $r['userId'] = '-';
  $rows[] = [
    'id'          => (int)$r['id'],
    'resType'     => $r['resType'],
    'createdAt'   => $r['createdAt'],
    'scheduleDate'=> $r['scheduleDate'],
    'peopleCount' => (int)$r['peopleCount'],
    'userName'    => $r['userName'],
    'userId'      => $r['userId'],
    'userHp'      => $r['userHp'],
    'userEmail'   => $r['userEmail'],
    'orderStatus' => $r['orderStatus'],
    'productName' => $r['productName'],
  ];
}

echo json_encode(['ok'=>true,'total'=>$total,'rows'=>$rows], JSON_UNESCAPED_UNICODE);

?>