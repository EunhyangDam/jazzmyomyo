<?
    // 1. DB접속(열기)  헤더문 header.php  
    include_once('./header.php');

    
    // 2. 리액트 요청한 아이디 받기 => 변수에 저장
    $userId = $_POST['userId'];

    // 3. 아이디를 데이터베이스 회원가입 테이블(signup_table) 
    // 아이디와 조건비교(WHERE)를 해서 데이터를 조회해서 변수에 회원 아이디만 내보내기
    $SQL = "SELECT userId FROM `signup_table` WHERE userId='$userId'";
    $RES = mysqli_query($CONN, $SQL);

    // 4. 데이터베스 반환값이 1개 이상이면 아이디가 존재한다.
    // 5. 1개이상이면 1일 반환한다. 아니면 0을 반환한다.
    if(mysqli_num_rows($RES)>=1){ // 데이터베스 반환값이 1개 이상이면 아이디가 존재한다.
        echo 1;
    }
    else{
        echo 0;
    }

?>