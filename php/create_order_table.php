<?

// http://jazzmyomyo.dothome.co.kr/jazzmyomyo/create_order_table.php
include_once('./header.php');

    $SQL =  "CREATE TABLE `order_table`(
        idx          INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'IDX',
        userId varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '아이디',
        userName    VARCHAR(100) NOT NULL COMMENT '주문자이름',
        userHp    VARCHAR(13) NOT NULL COMMENT '연락처',
        orderType    VARCHAR(16) NOT NULL COMMENT '주문유형',
        productId    VARCHAR(100) NOT NULL COMMENT '상품ID',
        productName  VARCHAR(100) NOT NULL COMMENT '상품명',
        quantity	 VARCHAR(20) NOT NULL COMMENT '수량',
        price	     INT NOT NULL COMMENT '결제금액',
        payMethod   VARCHAR(20) NOT NULL COMMENT '결제방법',
        shippingAddress VARCHAR(250) NOT NULL COMMENT '배송지',
        orderDate        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
        orderUpdate      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
        orderStatus     VARCHAR(20) NOT NULL COMMENT '주문상태',
        orderDel        TINYINT(1) DEFAULT 0 COMMENT '삭제',
        FOREIGN KEY(userId)   REFERENCES signup_table(userId)

    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='주문내역'";


    $RES = mysqli_query($CONN, $SQL);

    if($RES){ 
        echo "order_table 생성 성공"; //테이블 만들기 
    }
    else{
        echo "order_table 생성 실패"; //테이블 만들기 실패
    };
?>