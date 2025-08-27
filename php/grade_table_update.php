<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: text/plain; charset=utf-8');

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';

$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
if (!$CONN) { http_response_code(500); exit('DB 연결 실패'); }
mysqli_set_charset($CONN, 'utf8mb4');
mysqli_query($CONN, "SET time_zone = '+09:00'");

$gradesJson   = $_POST['grades'] ?? '';
$grades       = json_decode($gradesJson, true);
$autoReassign = (int)($_POST['autoReassign'] ?? 0);

if (!is_array($grades)) { http_response_code(400); exit('등급 데이터가 유효하지 않음'); }

mysqli_begin_transaction($CONN);

try {
  // 현재 등급: name => idx
  $current = [];
  $res = mysqli_query($CONN, "SELECT idx, gradeName FROM grade_table");
  while ($r = mysqli_fetch_assoc($res)) $current[$r['gradeName']] = (int)$r['idx'];

  // 일반회원 idx
  $resDef = mysqli_query($CONN, "SELECT idx FROM grade_table WHERE gradeName='일반회원' LIMIT 1");
  $rowDef = $resDef ? mysqli_fetch_assoc($resDef) : null;
  if (!$rowDef) throw new Exception('기본 등급(일반회원)이 grade_table에 없음');
  $defaultIdx = (int)$rowDef['idx'];

  // 수신된 이름 목록(트림)
  $incomingNames = [];
  foreach ($grades as $g) {
    $nm = trim($g['name'] ?? '');
    if ($nm !== '') $incomingNames[] = $nm;
  }

  // 삭제 후보(일반회원 제외)
  $toDelete = [];
  foreach ($current as $name => $idx) {
    if ($name === '일반회원') continue;
    if (!in_array($name, $incomingNames, true)) $toDelete[] = ['name' => $name, 'idx' => $idx];
  }

  // 삭제 차단(참조 존재)
  $blocked = [];
  if ($toDelete) {
    $stmtCnt = mysqli_prepare($CONN, "SELECT COUNT(*) FROM member_table WHERE userGrade = ?");
    foreach ($toDelete as $row) {
      mysqli_stmt_bind_param($stmtCnt, "i", $row['idx']);
      mysqli_stmt_execute($stmtCnt);
      mysqli_stmt_bind_result($stmtCnt, $cnt);
      mysqli_stmt_fetch($stmtCnt);
      mysqli_stmt_free_result($stmtCnt);
      if ($cnt > 0) $blocked[] = $row;
    }
    mysqli_stmt_close($stmtCnt);
  }

  // 자동 재배정
  if ($blocked) {
    if ($autoReassign === 1) {
      $stmtU = mysqli_prepare($CONN, "UPDATE member_table SET userGrade = ? WHERE userGrade = ?");
      $stmtD = mysqli_prepare($CONN, "DELETE FROM grade_table WHERE idx = ?");
      foreach ($blocked as $b) {
        mysqli_stmt_bind_param($stmtU, "ii", $defaultIdx, $b['idx']);
        if (!mysqli_stmt_execute($stmtU)) throw new Exception('등급 재배정 실패: '.$b['name']);
        mysqli_stmt_bind_param($stmtD, "i", $b['idx']);
        if (!mysqli_stmt_execute($stmtD)) throw new Exception('등급 삭제 실패: '.$b['name']);
      }
      mysqli_stmt_close($stmtU);
      mysqli_stmt_close($stmtD);
    } else {
      mysqli_rollback($CONN);
      http_response_code(409);
      exit('DELETE_BLOCKED: '.implode(', ', array_column($blocked, 'name')));
    }
  }

  // 업서트(이름 기준)
  $stmtUpd = mysqli_prepare($CONN, "UPDATE grade_table SET `condition`=?, benefit=? WHERE gradeName=?");
  $stmtIns = mysqli_prepare($CONN, "INSERT INTO grade_table (gradeName, `condition`, benefit) VALUES (?,?,?)");

  foreach ($grades as $g) {
    $name = trim($g['name'] ?? '');
    if ($name === '') continue;
    $cond = trim($g['condition'] ?? '');
    $bene = trim($g['benefit']   ?? '');

    if ($name === '일반회원' && !isset($current[$name])) {
      mysqli_stmt_bind_param($stmtIns, "sss", $name, $cond, $bene);
      mysqli_stmt_execute($stmtIns);
      $current[$name] = mysqli_insert_id($CONN);
      continue;
    }

    if (isset($current[$name])) {
      mysqli_stmt_bind_param($stmtUpd, "sss", $cond, $bene, $name);
      if (!mysqli_stmt_execute($stmtUpd)) throw new Exception('등급 수정 실패: '.$name);
    } else {
      mysqli_stmt_bind_param($stmtIns, "sss", $name, $cond, $bene);
      if (!mysqli_stmt_execute($stmtIns)) throw new Exception('등급 추가 실패: '.$name);
      $current[$name] = mysqli_insert_id($CONN);
    }
  }
  mysqli_stmt_close($stmtUpd);
  mysqli_stmt_close($stmtIns);

  // 최종 삭제(참조 없는 것만)
  if ($toDelete) {
    $blockedIdx = array_column($blocked, 'idx');
    $stmtDel = mysqli_prepare($CONN, "DELETE FROM grade_table WHERE idx = ?");
    foreach ($toDelete as $row) {
      if (in_array($row['idx'], $blockedIdx, true)) continue;
      mysqli_stmt_bind_param($stmtDel, "i", $row['idx']);
      mysqli_stmt_execute($stmtDel);
    }
    mysqli_stmt_close($stmtDel);
  }

  mysqli_commit($CONN);
  echo 'OK';
} catch (Throwable $e) {
  mysqli_rollback($CONN);
  http_response_code(500);
  echo 'ERROR: '.$e->getMessage();
}
