<?php
  include_once('./header.php');  
  
  $SQL = "CREATE TABLE `cart_table`(
    `IDX`        INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '식별번호',
    `cUserID`    VARCHAR(50) NOT NULL COMMENT '유저 아이디',
    `cProductID` VARCHAR(500) NOT NULL COMMENT '상품 아이디',
    `cQuantity`  INT NOT NULL COMMENT '상품 수량',
    `cDate`      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
    `CUpdate`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',

    FOREIGN KEY(cUserID) REFERENCES `signup_table`(userId)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='장바구니 테이블'";

  $RES = mysqli_query($CONN, $SQL);

  if($RES) echo 'Create Success';
  else echo 'Create Failed'. mysqli_error($CONN);

?>