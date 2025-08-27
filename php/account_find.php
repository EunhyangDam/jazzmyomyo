<?

    header('Content-Type: application/json; charset=utf-8');

// DB 공통
include_once('./header.php'); // $CONN 제공 (같은 방식으로 사용 중인 파일에 맞게)

// 안전한 입력
$mode = $_POST['mode'] ?? '';

function jsonOut($arr){ echo json_encode($arr, JSON_UNESCAPED_UNICODE); exit; }

if($mode === 'findId'){
    $userName = trim($_POST['userName'] ?? '');
    $userHpDigits = preg_replace('/[^0-9]/','', $_POST['userHpDigits'] ?? '');

    if($userName === '' || $userHpDigits === ''){
        jsonOut([ 'ok'=>false, 'msg'=>'파라미터 오류' ]);
    }

    // 휴대폰 비교: DB의 userHp는 하이픈 포함 저장이므로 REPLACE로 숫자만 비교
    $SQL = "SELECT userId FROM `signup_table` 
            WHERE userName=? AND REPLACE(userHp,'-','')=?";
    $stmt = mysqli_prepare($CONN, $SQL);
    mysqli_stmt_bind_param($stmt, "ss", $userName, $userHpDigits);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);

    if($row = mysqli_fetch_assoc($res)){
        $uid = $row['userId'];
        // ★ 마스킹 제거: 그대로 반환
        jsonOut([ 'ok'=>true, 'userId'=>$uid ]);
    } else {
        jsonOut([ 'ok'=>false, 'msg'=>'일치하는 회원 정보가 없습니다.' ]);
    }
}

else if($mode === 'findPw'){
    // 비밀번호 찾기 단계1: 본인 확인
    $userId = trim($_POST['userId'] ?? '');
    $userHpDigits = preg_replace('/[^0-9]/','', $_POST['userHpDigits'] ?? '');

    if($userId==='' || $userHpDigits===''){
        jsonOut([ 'ok'=>false, 'msg'=>'파라미터 오류' ]);
    }

    $SQL = "SELECT idx FROM `signup_table` 
            WHERE userId=? AND REPLACE(userHp,'-','')=?";
    $stmt = mysqli_prepare($CONN, $SQL);
    mysqli_stmt_bind_param($stmt, "ss", $userId, $userHpDigits);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);

    if(mysqli_fetch_assoc($res)){
        jsonOut([ 'ok'=>true ]); // 본인확인 성공 → 프론트에서 새 비번 입력 단계로
    } else {
        jsonOut([ 'ok'=>false, 'msg'=>'일치하는 회원 정보가 없습니다.' ]);
    }
}
else if($mode === 'resetPw'){
    // 비밀번호 변경 (나중에 연결)
    $userId = trim($_POST['userId'] ?? '');
    $newPw = trim($_POST['newPw'] ?? '');

    if($userId==='' || $newPw===''){
        jsonOut([ 'ok'=>false, 'msg'=>'파라미터 오류' ]);
    }

    // 실제 운영 시엔 반드시 해시 권장
    // $hash = $newPw;
    $hash = password_hash($newPw, PASSWORD_DEFAULT);

    $SQL = "UPDATE `signup_table` SET userPw=? WHERE userId=?";
    $stmt = mysqli_prepare($CONN, $SQL);
    mysqli_stmt_bind_param($stmt, "ss", $hash, $userId);
    $ok = mysqli_stmt_execute($stmt);

    if($ok){
        jsonOut([ 'ok'=>true ]);
    } else {
        jsonOut([ 'ok'=>false, 'msg'=>'업데이트 실패' ]);
    }
}
else{
    jsonOut([ 'ok'=>false, 'msg'=>'잘못된 요청' ]);
}

?>