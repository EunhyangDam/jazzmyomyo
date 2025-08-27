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

$mode = isset($_REQUEST['mode']) ? $_REQUEST['mode'] : '';
$idx  = isset($_REQUEST['idx'])  ? (int)$_REQUEST['idx'] : 0;

/** 조회수 +1 */
if ($mode === 'hit' && $idx > 0) {
  $ok = mysqli_query($CONN, "UPDATE notice_table SET wHit = wHit + 1 WHERE idx={$idx}");
  if ($ok) {
    $res2 = mysqli_query($CONN, "SELECT wHit FROM notice_table WHERE idx={$idx} LIMIT 1");
    if ($res2 && mysqli_num_rows($res2) === 1) {
      $row = mysqli_fetch_assoc($res2);
      echo (int)$row['wHit'];
      mysqli_close($CONN);
      exit;
    }
  }
  echo 0;
  mysqli_close($CONN);
  exit;
}

/** 목록 조회 (JOIN으로 회원 이름 가져오기) */
$SQL = "
  SELECT
    n.idx,
    n.wSubject,
    n.wContent,
    n.wId,
    s.userName AS wName,                                        -- 회원 테이블의 이름
    DATE_FORMAT(n.wDate,   '%Y-%m-%d %H:%i:%s') AS wDate,
    DATE_FORMAT(n.wUpdate, '%Y-%m-%d %H:%i:%s') AS wUpdate,
    n.wDel,
    n.wHit,
    n.wFile
  FROM notice_table n
  LEFT JOIN signup_table s ON s.userId = n.wId                  -- FK: wId -> userId
  WHERE n.wDel = 0
  ORDER BY n.wDate DESC, n.idx DESC
";
$RES = mysqli_query($CONN, $SQL);

$arr = array();
if ($RES && mysqli_num_rows($RES) >= 1) {
  while ($item = mysqli_fetch_assoc($RES)) {
    // 업로드 경로 보정 (기존 로직 유지)
    $content = str_replace('src="uploads/', 'src="/jazzmyomyo/uploads/', $item['wContent']);
    $file    = $item['wFile'] ? '/jazzmyomyo/'.$item['wFile'] : '';

    $arr[] = array(
      'idx'      => (int)$item['idx'],
      'wSubject' => $item['wSubject'],
      'wContent' => $content,
      'wId'      => $item['wId'],
      'wName'    => $item['wName'],       // ← JOIN 결과
      'wDate'    => $item['wDate'],
      'wUpdate'  => $item['wUpdate'],
      'wDel'     => (int)$item['wDel'],
      'wHit'     => (int)$item['wHit'],
      'wFile'    => $file
    );
  }
  echo json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} else {
  echo 0;
}

mysqli_close($CONN);
