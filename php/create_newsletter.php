<?php
  include_once('./header.php');  
  
  $SQL = "CREATE TABLE `newsletter_table`(
    `IDX`        INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '식별번호',
    `eName`      VARCHAR(50) NOT NULL COMMENT '이름',
    `eEmail`     VARCHAR(50) NOT NULL COMMENT '이메일 참조 키',
    `eAdr`       VARCHAR(500) NOT NULL COMMENT '연락처',
    `eDate`      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='뉴스레터 구독'";

  $RES = mysqli_query($CONN, $SQL);

  if($RES) echo 'Create Success';
  else echo 'Create Failed'. mysqli_error($CONN);

?>