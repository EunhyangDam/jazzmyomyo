<?php
// header.php 파일이 데이터베이스 연결을 설정한다고 가정합니다.
include_once('./header.php');
header('Content-Type: application/json; charset=utf-8');

// POST 요청만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'POST only']);
    exit;
}

// $_POST 변수에서 데이터 받기
$subject = trim($_POST['subject'] ?? '');
$content = trim($_POST['content'] ?? '');
$email   = trim($_POST['email'] ?? '');

// 유효성 검사
if ($subject === '' || $content === '' || $email === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => '필수 항목 누락']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => '이메일 형식 오류']);
    exit;
}

// SQL INSERT 쿼리 준비
$sql = "INSERT INTO inquiry_table (subject, content, email) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($CONN, $sql);

// 파라미터 바인딩 및 쿼리 실행
mysqli_stmt_bind_param($stmt, "sss", $subject, $content, $email);
$ok = mysqli_stmt_execute($stmt);

if ($ok) {
    // 성공 시 JSON 응답 반환
    echo json_encode(['ok' => true, 'idx' => mysqli_insert_id($CONN)]);
} else {
    // 실패 시 에러 응답 반환
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => mysqli_error($CONN)]);
}

// 리소스 정리
mysqli_stmt_close($stmt);
mysqli_close($CONN);