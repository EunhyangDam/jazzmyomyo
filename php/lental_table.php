<?

include_once('./header.php'); // $CONN (mysqli)

// 0) 입력
$name  = trim($_POST['name']  ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');

// 1) 필수값 체크
if ($name === '' || $phone === '' || $email === '') { echo 0;  exit; } // 0: 필수 누락
if (empty($_FILES['file']['name']))                 { echo -1; exit; } // -1: 파일 없음

// 2) 업로드 기본 체크
$f = $_FILES['file'];
if ($f['error'] !== UPLOAD_ERR_OK)                  { echo -2; exit; } // -2: 업로드 오류

// 3) 표시용 파일명 = [폼이름]_[원본파일명].ext
$origNameFromUser = $f['name']; // 예: 대관신청.pdf
$ext  = strtolower(pathinfo($origNameFromUser, PATHINFO_EXTENSION));
$base = pathinfo($origNameFromUser, PATHINFO_FILENAME);

// 이름/파일명에 들어온 특수문자 정리(한글/영문/숫자/공백/._-만 허용)
$cleanUser = preg_replace('/[^\p{L}\p{N}\-_. ]/u', '', $name);
$cleanBase = preg_replace('/[^\p{L}\p{N}\-_. ]/u', '', $base);
// 공백 정리
$cleanUser = trim(preg_replace('/\s+/', ' ', $cleanUser));
$cleanBase = trim(preg_replace('/\s+/', ' ', $cleanBase));
// 베이스가 비어 있으면 기본값
if ($cleanBase === '') { $cleanBase = '파일'; }
// 최종 표시용 이름(예: 묘묘_대관신청.pdf)
$displayName = ($cleanUser !== '' ? $cleanUser.'_' : '').$cleanBase.($ext ? '.'.$ext : '');

// 4) 실제 저장 파일명(충돌 방지용 랜덤)
$uploadDir = __DIR__ . '/uploads/lental/';
if (!is_dir($uploadDir)) { @mkdir($uploadDir, 0775, true); }
$savedName = date('Ymd_His') . '_' . bin2hex(random_bytes(6)) . ($ext ? '.'.$ext : '');
$dest      = $uploadDir . $savedName;

if (!move_uploaded_file($f['tmp_name'], $dest))     { echo -5; exit; } // -5: 저장 실패

// 5) DB insert (created_at = NOW())
$sql = "INSERT INTO lental_table
        (name, phone, email, file_orig_name, file_saved_name, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())";
$stmt = mysqli_prepare($CONN, $sql);
if (!$stmt)                                         { echo -6; exit; } // -6: DB 오류
mysqli_stmt_bind_param($stmt, 'sssss', $name, $phone, $email, $displayName, $savedName);
$ok = mysqli_stmt_execute($stmt);
if (!$ok)                                           { echo -6; exit; }
$id = mysqli_insert_id($CONN);
mysqli_stmt_close($stmt);

// 6) 성공(JSON)
echo json_encode(['ok' => true, 'id' => $id], JSON_UNESCAPED_UNICODE);