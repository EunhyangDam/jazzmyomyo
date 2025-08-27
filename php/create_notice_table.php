<?php

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);


$SQL = "CREATE TABLE `notice_table`(
    idx        INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'idx',
    wSubject   varchar(250) NOT NULL COMMENT '글제목',
    wContent   TEXT NOT NULL COMMENT '글내용',
    wId        varchar(16) NOT NULL COMMENT '아이디',
    wName      varchar(100) NOT NULL COMMENT '이름',
    wDate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    wUpdate    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
    wDel       TINYINT(1) DEFAULT 0 COMMENT '삭제',
    wHit       INT UNSIGNED DEFAULT 1 COMMENT '조회수'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='게시판 공지사항'";

$RES = mysqli_query($CONN, $SQL);


//응답 1, 0
if($RES){
    echo "notice_table 생성 성공";
}
else{
    echo "notice_table 생성 실패";
}


?>