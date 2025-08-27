<?php
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', 0);

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

if (!$CONN) {
  echo "DB 연결 실패";
  exit;
}

$wSubject = isset($_POST['wSubject']) ? trim($_POST['wSubject']) : '';
$wContent = isset($_POST['wContent']) ? trim($_POST['wContent']) : '';
$wId      = isset($_POST['wId'])      ? trim($_POST['wId'])      : 'admin';
$wName    = isset($_POST['wName'])    ? trim($_POST['wName'])    : '관리자';

if ($wSubject === '' || $wContent === '') {
  echo "제목/내용 누락";
  exit;
}

// XSS 최소화
$wSubject = mysqli_real_escape_string($CONN, $wSubject);
$wContent = mysqli_real_escape_string($CONN, $wContent);
$wId      = mysqli_real_escape_string($CONN, $wId);
$wName    = mysqli_real_escape_string($CONN, $wName);

// 글 INSERT
$SQL = "
  INSERT INTO notice_table (wSubject, wContent, wId, wName, wDate)
  VALUES ('$wSubject', '$wContent', '$wId', '$wName', NOW())
";
$RES = mysqli_query($CONN, $SQL);

if (!$RES) {
  echo "DB 오류: " . mysqli_error($CONN);
  mysqli_close($CONN);
  exit;
}

// 새 글 번호
$newIdx = mysqli_insert_id($CONN);

// 업로드된 이미지 파일 처리
$savedRelPath = '';
if (!empty($_FILES['file']['name']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
  $uploadDir = __DIR__ . "/uploads/notice/{$newIdx}";
  if (!is_dir($uploadDir)) { mkdir($uploadDir, 0777, true); }

  $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
  $newName = "ntc_" . date("Ymd_His") . "_" . bin2hex(random_bytes(4)) . "." . $ext;
  $dest = $uploadDir . '/' . $newName;

  if (move_uploaded_file($_FILES['file']['tmp_name'], $dest)) {
    $savedRelPath = "uploads/notice/{$newIdx}/{$newName}";
    $imgTag = '<img src="/jazzmyomyo/' . $savedRelPath . '" />' . "\n" . $wContent;

    // wContent 업데이트
    $sqlUpdate = "UPDATE notice_table SET wContent='" . mysqli_real_escape_string($CONN, $imgTag) . "' WHERE idx={$newIdx} LIMIT 1";
    mysqli_query($CONN, $sqlUpdate);

    // wFile 경로 저장
    $sqlFile = "UPDATE notice_table SET wFile='" . mysqli_real_escape_string($CONN, $savedRelPath) . "' WHERE idx={$newIdx} LIMIT 1";
    mysqli_query($CONN, $sqlFile);
  }
}

echo "1";
mysqli_close($CONN);
?>
