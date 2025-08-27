<?php
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', 0);
header('Content-Type: application/json; charset=utf-8');

$DB1='localhost'; 
$DB2='jazzmyomyo'; 
$DB3='eevee0202!'; 
$DB4='jazzmyomyo';
$CONN = mysqli_connect($DB1,$DB2,$DB3,$DB4);
if(!$CONN){ http_response_code(500); echo json_encode(["ok"=>false,"msg"=>"DB 연결 실패"]); exit; }
mysqli_set_charset($CONN,'utf8mb4');
mysqli_query($CONN,"SET time_zone = '+09:00'");

/* 입력 파싱(JSON/POST 모두 허용) */
$raw = file_get_contents('php://input');
$in  = $raw ? json_decode($raw, true) : $_POST;

/* 식별자: member_table.idx(권장) 또는 userId(변경 금지) */
$id        = isset($in['id']) ? (int)$in['id'] : 0;
$userIdKey = isset($in['userId']) ? trim($in['userId']) : '';

/* signup_table(개인정보) */
$u_name    = isset($in['name'])   ? trim($in['name'])   : null;
$u_gender  = isset($in['gender']) ? trim($in['gender']) : null;  
$u_birth   = isset($in['birth'])  ? trim($in['birth'])  : null; 
$u_phone   = isset($in['phone'])  ? trim($in['phone'])  : null;
$u_email   = isset($in['email'])  ? trim($in['email'])  : null;
$u_addr    = isset($in['addr'])   ? trim($in['addr'])   : null;
$u_consent = isset($in['consent'])? trim($in['consent']): null; 

/* member_table(관리값) */
$m_grade   = isset($in['grade'])  ? trim($in['grade'])  : null;  
$m_status  = isset($in['status']) ? trim($in['status']) : null;  

/* userId 변경 금지: userIdNew 들어오면 바로 거부 */
if (isset($in['userIdNew']) && trim($in['userIdNew']) !== '') {
  echo json_encode(["ok"=>false,"msg"=>"userId는 변경할 수 없습니다."]); exit;
}

/* 헬퍼 */
function esc($c,$s){ return mysqli_real_escape_string($c,$s); }

/* 대상 로드: member_table 기준 */
$row = null;
if ($id > 0) {
  $rs = mysqli_query($CONN, "
    SELECT m.idx AS mid, m.signup_idx, m.userId AS mUserId, s.userService, s.userId AS sUserId
    FROM member_table m
    JOIN signup_table s ON s.idx = m.signup_idx
    WHERE m.idx={$id} LIMIT 1
  ");
  $row = ($rs && mysqli_num_rows($rs)===1) ? mysqli_fetch_assoc($rs) : null;
} elseif ($userIdKey !== '') {
  $uid = esc($CONN, $userIdKey);
  $rs = mysqli_query($CONN, "
    SELECT m.idx AS mid, m.signup_idx, m.userId AS mUserId, s.userService, s.userId AS sUserId
    FROM member_table m
    JOIN signup_table s ON s.idx = m.signup_idx
    WHERE s.userId='{$uid}' LIMIT 1
  ");
  $row = ($rs && mysqli_num_rows($rs)===1) ? mysqli_fetch_assoc($rs) : null;
} else {
  echo json_encode(["ok"=>false,"msg"=>"id 또는 userId가 필요합니다."]); exit;
}
if (!$row){ echo json_encode(["ok"=>false,"msg"=>"대상을 찾을 수 없습니다."]); exit; }

$mid            = (int)$row['mid'];
$signup_idx     = (int)$row['signup_idx'];
$currentService = $row['userService'] ?? '';

/* 값 보정/검증 */
if ($m_status === '휴먼') $m_status = '휴면';
if ($u_gender === '남') $u_gender = '남자';
if ($u_gender === '여') $u_gender = '여자';
if ($u_gender === '선택안함') $u_gender = '선택안함';

$allowGrade  = ['일반회원','단골회원','관리자'];
$allowStatus = ['정상','휴면','탈퇴'];
if ($m_grade  !== null && !in_array($m_grade, $allowGrade, true))  { echo json_encode(["ok"=>false,"msg"=>"grade 값이 올바르지 않습니다."]);  exit; }
if ($m_status !== null && !in_array($m_status,$allowStatus,true)) { echo json_encode(["ok"=>false,"msg"=>"status 값이 올바르지 않습니다."]); exit; }

/* 문자열 gradeName → FK용 idx 변환 */
$gradeIdx = null;
if ($m_grade !== null) {
  $gradeRes = mysqli_query($CONN, "SELECT idx FROM grade_table WHERE gradeName = '".esc($CONN, $m_grade)."' LIMIT 1");
  if ($gradeRow = mysqli_fetch_assoc($gradeRes)) {
    $gradeIdx = (int)$gradeRow['idx'];
  } else {
    echo json_encode(["ok"=>false,"msg"=>"등급명이 존재하지 않습니다."]); exit;
  }
}

/* consent → userService 간단 토글 */
function applyConsentToService($service, $consent){
  if ($consent === 'N') {
    $service = preg_replace('/(,?\s*(무료배송|할인쿠폰|혜택\/정보|수신|이메일|SNS))+/u', '', $service);
    $service = trim($service, " ,");
    return $service ?: "이용약관 동의(필수),개인정보 수집∙이용 동의(필수)";
  }
  if ($consent === 'Y') {
    if (!preg_match('/이메일|수신|무료배송|할인쿠폰/u', $service)) {
      $service = rtrim($service, " ,");
      $service .= ($service ? "," : "") . "이메일";
    }
  }
  return $service;
}
$newService = $currentService;
if ($u_consent === 'Y' || $u_consent === 'N') {
  $newService = applyConsentToService($currentService, $u_consent);
}

/* 트랜잭션 */
mysqli_begin_transaction($CONN);
$okAll = true;

/* 1) signup_table 업데이트 */
$signupSets = [];
if ($u_name   !== null) $signupSets[] = "userName='".esc($CONN,$u_name)."'";
if ($u_gender !== null) $signupSets[] = "userGender='".esc($CONN,$u_gender)."'";
if ($u_birth  !== null) $signupSets[] = "userBirth='".esc($CONN,$u_birth)."'";
if ($u_phone  !== null) $signupSets[] = "userHp='".esc($CONN,$u_phone)."'";
if ($u_email  !== null) $signupSets[] = "userEmail='".esc($CONN,$u_email)."'";
if ($u_addr   !== null) $signupSets[] = "userAddress='".esc($CONN,$u_addr)."'";
if ($u_consent === 'Y' || $u_consent === 'N') $signupSets[] = "userService='".esc($CONN,$newService)."'";

if ($signupSets) {
  $sql = "UPDATE signup_table SET ".implode(', ',$signupSets)." WHERE idx={$signup_idx} LIMIT 1";
  $ok = mysqli_query($CONN, $sql);
  if (!$ok) $okAll = false;
}

/* 2) member_table 업데이트 */
$memberSets = [];
if ($gradeIdx !== null) $memberSets[] = "userGrade={$gradeIdx}";
if ($m_status !== null) $memberSets[] = "userStatus='".esc($CONN,$m_status)."'";
if ($memberSets) {
  $memberSets[] = "updatedAt=NOW()";
  $sql = "UPDATE member_table SET ".implode(', ',$memberSets)." WHERE idx={$mid} LIMIT 1";
  $ok = mysqli_query($CONN, $sql);
  if (!$ok) $okAll = false;
}

/* 커밋 or 롤백 */
if ($okAll) {
  mysqli_commit($CONN);
  echo json_encode(["ok"=>true]);
} else {
  mysqli_rollback($CONN);
  echo json_encode(["ok"=>false,"msg"=>"업데이트 중 오류가 발생했습니다."]);
}

mysqli_close($CONN);
