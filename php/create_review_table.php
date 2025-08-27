<?

// http://jazzmyomyo.dothome.co.kr/jazzmyomyo/create_review_table.php

include_once('./header.php');

    $SQL =  "CREATE TABLE `review_table`(
        idx         INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'IDX',
        wType       VARCHAR(10) NOT NULL COMMENT '유형',
        wSubject    VARCHAR(250) NOT NULL COMMENT '제목',
        wContent    TEXT NOT NULL COMMENT '본문',
        wId         VARCHAR(16) NOT NULL COMMENT '아이디',
        wName       VARCHAR(100) NOT NULL COMMENT '작성자',
        wDate       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
        wUpdate     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
        wdel        TINYINT(1) DEFAULT 0 COMMENT '삭제',
        Heart        INT UNSIGNED DEFAULT 1 COMMENT '하트' 
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='한줄후기 게시판'";


    $RES = mysqli_query($CONN, $SQL);

    if($RES){ 
        echo "review_table 생성 성공"; //테이블 만들기 
    }
    else{
        echo "review_table 생성 실패"; //테이블 만들기 실패
    };
?>