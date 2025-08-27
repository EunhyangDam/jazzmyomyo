<?

header('Content-Type: application/json; charset=utf-8');
include_once('./header.php'); 
date_default_timezone_set('Asia/Seoul');

// 1) 쿼리 파라미터 먼저 읽기
$sort  = $_GET['sort']  ?? 'created'; // 'created' | 'name'
$order = $_GET['order'] ?? 'desc';    // 'asc' | 'desc'
$month = trim($_GET['month'] ?? '');  // 'YYYY-MM' | 'all' | ''

$page  = max(1, (int)($_GET['page'] ?? 1));
$per   = min(100, max(1, (int)($_GET['perPage'] ?? 10)));
$offset = ($page - 1) * $per;

// 2) 화이트리스트
$sort  = in_array($sort,  ['created','name'], true) ? $sort  : 'created';
$order = in_array($order, ['asc','desc'], true)      ? $order : 'desc';

// 3) ORDER BY
if ($sort === 'name') {
  $orderBy = ($order === 'desc')
    ? 'ORDER BY name DESC, id DESC'
    : 'ORDER BY name ASC,  id ASC';
} else {
  $orderBy = ($order === 'asc')
    ? 'ORDER BY created_at ASC,  id ASC'
    : 'ORDER BY created_at DESC, id DESC';
}

// 4) WHERE (month='all'은 필터 해제!)
$where = '';
$params = [];
$types  = '';

// 'all'은 필터 없음으로 간주
if ($month === 'all') {
  $month = '';
}

// YYYY-MM 형식일 때만 필터 적용
if ($month !== '' && preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) {
  $where = "WHERE DATE_FORMAT(created_at, '%Y-%m') = ?";
  $params[] = $month;
  $types   .= 's';
}

// 총 개수
if ($where) {
  $stmtCnt = mysqli_prepare($CONN, "SELECT COUNT(*) FROM lental_table $where");
  mysqli_stmt_bind_param($stmtCnt, $types, ...$params);
  mysqli_stmt_execute($stmtCnt);
  mysqli_stmt_bind_result($stmtCnt, $total);
  mysqli_stmt_fetch($stmtCnt);
  mysqli_stmt_close($stmtCnt);
} else {
  $resCnt = mysqli_query($CONN, "SELECT COUNT(*) AS c FROM lental_table");
  $rowCnt = mysqli_fetch_assoc($resCnt);
  $total  = (int)$rowCnt['c'];
}

// 데이터 조회
$sql = "SELECT id, name, phone, email, file_orig_name, created_at
        FROM lental_table
        $where
        $orderBy
        LIMIT ? OFFSET ?";

if ($where) {
  $stmt = mysqli_prepare($CONN, $sql);
  // 기존 타입 + ii
  $types2 = $types . 'ii';
  $params2 = array_merge($params, [$per, $offset]);
  mysqli_stmt_bind_param($stmt, $types2, ...$params2);
} else {
  $stmt = mysqli_prepare($CONN, $sql);
  mysqli_stmt_bind_param($stmt, 'ii', $per, $offset);
}
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);

$rows = [];
while ($r = mysqli_fetch_assoc($res)) {
  $rows[] = [
    'id'           => (int)$r['id'],
    'name'         => $r['name'],
    'phone'        => $r['phone'],
    'email'        => $r['email'],
    'file_orig_name' => $r['file_orig_name'],
    'created_at'   => $r['created_at']
  ];
}
mysqli_stmt_close($stmt);

echo json_encode([
  'total'   => (int)$total,
  'page'    => $page,
  'perPage' => $per,
  'rows'    => $rows,
], JSON_UNESCAPED_UNICODE);

?>