<?

// http://jazzmyomyo.dothome.co.kr/jazzmyomyo/create_review_table.php

//1. DB접속 열기
include_once('./header.php');

//2. 테이블에 저장할 데이터
//  php내부 변수 = 리액트에서 보낸 변수
    $wId      = $_POST['wId'];
    $wName    = $_POST['wName'];

// ' 홑따옴표 \' 이스케이프 처리 replace
    $wSubject = str_replace("'", "\'", $_POST['wSubject']); 
    $wContent = str_replace("'","\'",$_POST['wContent'] );
   // $wType    = $_POST['wType'];
    
// 3. 테이블에 삽입하기 

    $SQL = "INSERT INTO `review_table` 
                   ( `wId`, `wName`, `wSubject`, `wContent`) 
            VALUES ('$wId','$wName','$wSubject', '$wContent')";

    $RES = mysqli_query($CONN, $SQL);
    
    if($RES){
        echo 1; // 성공 메시지 숫자 1
    }
    else{
        echo 0; // 실패 메시지 숫자 0
    }
    
?>