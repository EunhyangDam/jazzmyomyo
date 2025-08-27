<?

// http://jazzmyomyo.dothome.co.kr/jazzmyomyo/create_delivery_table.php

include_once('./header.php');

$SQL =  "CREATE TABLE `delivery_table`(

idx              INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'IDX',
userId           VARCHAR(16) NOT NULL COMMENT '아이디',
deliveryHp       VARCHAR(13) NOT NULL COMMENT '배송지 연락처',
deliveryDefault  TINYINT(1) DEFAULT 0 COMMENT '기본배송지',
deliveryRequest  VARCHAR(100) NULL COMMENT '배송요청사항',
zipCode          VARCHAR(5) NOT NULL COMMENT '우편번호',
deliveryaddress1 VARCHAR(250) NOT NULL COMMENT '주소1',
deliveryaddress2 VARCHAR(250) NOT NULL COMMENT '주소2',
wDate            TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
wUpdate          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
deliveryDel            TINYINT(1) NOT NULL DEFAULT 0 COMMENT '삭제',
FOREIGN KEY (userId) REFERENCES signup_table(userId)


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='배송지 목록'";


    $RES = mysqli_query($CONN, $SQL);

    if($RES){ 
        echo "<h2> delivery_table 생성 성공</h2>"; //테이블 만들기 
    }
    else{
        echo "<h2>delivery_table 생성 실패</h2>"; //테이블 만들기 실패
    };
?>