<?

header('Content-Type: application/json; charset=utf-8');
// 필요한 경우만: 동일 도메인이라면 생략 가능
header('Access-Control-Allow-Credentials: true');

include_once('./header.php'); // $CONN (mysqli) 제공, 공용 커넥션 사용

function out($arr, $code = 200){
  http_response_code($code);
  echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

// 입력 받기: GET/POST 폼 + JSON 바디 모두 지원
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
$name  = isset($_POST['name'])  ? $_POST['name']  :
         (isset($_GET['name'])  ? $_GET['name']  :
         (is_array($body) && isset($body['name'])  ? $body['name']  : ''));
$phone = isset($_POST['phone']) ? $_POST['phone'] :
         (isset($_GET['phone']) ? $_GET['phone'] :
         (is_array($body) && isset($body['phone']) ? $body['phone'] : ''));

$name  = trim((string)$name);
$phone = trim((string)$phone);

if ($name === '' || $phone === '') {
  out(['ok'=>0, 'error'=>'required: name, phone'], 400);
}

// 숫자만 남기기 (하이픈/공백/플러스 제거)
$digits = preg_replace('/\D+/', '', $phone);

// 조회: name 정확히 일치 + phone 숫자만 비교
$sql = "
  SELECT id, name, phone, email, file_orig_name, file_saved_name, created_at
  FROM lental_table
  WHERE name = ?
    AND REPLACE(REPLACE(REPLACE(phone,'-',''), ' ', ''), '+', '') = ?
  ORDER BY created_at DESC
  LIMIT 100
"; // lental_table 컬럼 구조는 제공된 스키마 그대로 사용. 

$stmt = mysqli_prepare($CONN, $sql);
if (!$stmt) out(['ok'=>0, 'error'=>'prepare failed'], 500);

mysqli_stmt_bind_param($stmt, 'ss', $name, $digits);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);

$rows = [];
while ($r = mysqli_fetch_assoc($res)) {
  $rows[] = [
    'id'             => (int)$r['id'],
    'name'           => $r['name'],
    'phone'          => $r['phone'],
    'email'          => $r['email'],
    'file_orig_name' => $r['file_orig_name'],
    'created_at'     => $r['created_at'],
    // 다운로드는 하드코딩 경로(변수 X)
    'download_url'   => '/jazzmyomyo/lental_download.php?id='.(int)$r['id'],
  ];
}
mysqli_stmt_close($stmt);

out(['ok'=>1, 'count'=>count($rows), 'rows'=>$rows]);

?>