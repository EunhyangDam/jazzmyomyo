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

$idx        = isset($_POST['idx'])        ? (int)$_POST['idx'] : 0;
$wSubject   = isset($_POST['wSubject'])   ? $_POST['wSubject'] : '';
$wContent   = isset($_POST['wContent'])   ? $_POST['wContent'] : '';
$clear_file = isset($_POST['clear_file']) ? (int)$_POST['clear_file'] : 0;

if ($idx <= 0 || trim($wSubject) === '' || trim($wContent) === '') {
  echo 0;
  mysqli_close($CONN);
  exit;
}

// 기존 데이터 가져오기
$old = null;
$resOld = mysqli_query($CONN, "SELECT wContent FROM notice_table WHERE idx={$idx} AND wDel=0 LIMIT 1");
if ($resOld && mysqli_num_rows($resOld) === 1) {
  $old = mysqli_fetch_assoc($resOld);
}

// 이미지 삭제 처리
if ($clear_file === 1 && $old) {
  if (preg_match_all('/src=["\'](?:\/jazzmyomyo\/)?(uploads\/notice\/(\d+)\/[^\s"\']+)["\']/i', $old['wContent'], $m)) {
    $deletedAll = true;

    foreach ($m[1] as $relPath) {
      $fullPath = __DIR__ . '/' . $relPath;
      if (is_file($fullPath)) {
        if (!@unlink($fullPath)) {
          $deletedAll = false;
        }
      }
    }

    $folderPath = __DIR__ . '/uploads/notice/' . $m[2][0];
    if ($deletedAll && is_dir($folderPath) && count(glob($folderPath . '/*')) === 0) {
      @rmdir($folderPath);
    }
  }
}

// 파일 업로드 처리
$savedRelPath = null;
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
  $baseDir = __DIR__ . "/uploads/notice/{$idx}";
  if (!is_dir($baseDir)) {
    mkdir($baseDir, 0777, true);
  }

  $ext     = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
  $newName = "ntc_" . date("Ymd_His") . "_" . bin2hex(random_bytes(4)) . "." . $ext;
  $saveTo  = $baseDir . "/" . $newName;

  if (move_uploaded_file($_FILES['file']['tmp_name'], $saveTo)) {
    $savedRelPath = "uploads/notice/{$idx}/{$newName}";
    if (!preg_match('/<img\b/i', $wContent)) {
      $wContent = '<img src="/jazzmyomyo/' . $savedRelPath . '" />' . "\n" . $wContent;
    }
  }
}

// 이스케이프
$wSubject = mysqli_real_escape_string($CONN, $wSubject);
$wContent = mysqli_real_escape_string($CONN, $wContent);

// 파일 처리 SQL
$setFileSql = "";
if ($clear_file === 1) {
  $setFileSql = ", wFile = NULL";
} elseif ($savedRelPath !== null) {
  $filePathEscaped = mysqli_real_escape_string($CONN, $savedRelPath);
  $setFileSql = ", wFile = '{$filePathEscaped}'";
}

// 업데이트 쿼리
$SQL = "
  UPDATE notice_table
     SET wSubject = '{$wSubject}',
         wContent = '{$wContent}',
         wUpdate  = NOW()
         {$setFileSql}
   WHERE idx = {$idx} AND wDel=0
   LIMIT 1
";

$RES = mysqli_query($CONN, $SQL);
echo ($RES ? 1 : 0);
mysqli_close($CONN);
