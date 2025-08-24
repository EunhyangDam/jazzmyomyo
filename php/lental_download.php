<?

include_once('./header.php');

$DEBUG = isset($_GET['debug']);
function bail($msg, $code=404){
  http_response_code($code);
  if ($DEBUG) { header('Content-Type:text/plain; charset=utf-8'); echo $msg; }
  exit;
}

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) { http_response_code(400); exit('bad request'); }

$stmt = mysqli_prepare($CONN, "SELECT file_orig_name, file_saved_name FROM lental_table WHERE id=? LIMIT 1");
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($res);
mysqli_stmt_close($stmt);

if (!$row) { http_response_code(404); exit('not found'); }

$uploadDir = __DIR__ . '/uploads/lental/';
$path = $uploadDir . $row['file_saved_name'];
if (!is_file($path)) { http_response_code(404); exit('file missing'); }

$orig = $row['file_orig_name'] ?: 'attachment';
$fallback = preg_replace('/[^\w\-. ]+/u', '_', $orig);
$utf8 = rawurlencode($orig);

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header("Content-Disposition: attachment; filename=\"{$fallback}\"; filename*=UTF-8''{$utf8}");
header('Content-Length: ' . filesize($path));
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');

readfile($path);
exit;

?>