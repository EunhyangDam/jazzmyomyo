<?
    // sign_in.php
    include_once('./header.php');

    // 리액트 변수 받기
    $userId = $_POST['userId'];
    $userPw = $_POST['userPw'];

    $SQL = "SELECT userId, userName, userPw FROM `signup_table` WHERE userId='$userId'";
    $RES = mysqli_query($CONN, $SQL);

    // JSON 데이터로  아이디, 이름 데이터 응답
    if(mysqli_num_rows($RES)>=1){

        $item = mysqli_fetch_array($RES);  // 응답 데이터 배열로 가져오기
        if(password_verify($userPw, $item['userPw'])){  // 해싷함수비밀번호 비교
            $arr = [
                '아이디' => $item['userId'],  // 아이디: moonjong
                '이름' => $item['userName']   // 이름: 이순신
            ];
            echo json_encode($arr, JSON_UNESCAPED_UNICODE);  // JSON 데이터 만들기
        }
        else {
            echo -1;  // 비밀번호가 다른경우
        }        
    }
    else{
        echo 0;  // 아이디가 다른경우 => 회원가입이 안된사람
    }

?>