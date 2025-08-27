<?
    include_once('./header.php');

    // 리액트 요청 이메일 
    // moonjong@naver.com 중복검사
    $userId = $_POST['userId'];
    $userEmail = $_POST['userEmail'];

    // DB 회원가입테이블 signup_table useEmail 이메일 조회 SELECT
    $SQL = "SELECT userId, userEmail FROM `signup_table` WHERE userEmail='$userEmail'";
    $RES = mysqli_query($CONN, $SQL);

    // 내 이메일인지
    // 다른 사람의 이메일인지 구분
    if(mysqli_num_rows($RES)>=1){
        
        $item = mysqli_fetch_array($RES);  //$item['userId']

        if($item['userId'] == $userId){
            echo 1;  // 내꺼 이메일  
        }
        else {
            echo 2;  // 다른사람 이메일(중복된이메일) 
        }

    }
    else{ // 조회된 이메일이 한개도 없다 => 사용가능
        echo 0;
    }
?>