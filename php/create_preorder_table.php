<?php

$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');

/*
  - signup_table.userId 가 VARCHAR(16) 이므로,
    preorder_table.user_id 도 VARCHAR(16) 동일 타입/길이/콜레이션으로 맞춤.
  - ENGINE=InnoDB 여야 FK가 적용됨.
*/

$SQL = "CREATE TABLE `preorder_table` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',

  `user_id` VARCHAR(16) NOT NULL COMMENT '회원 FK (signup_table.userId)',
  `writer_name` VARCHAR(50) NOT NULL COMMENT '작성자 표시명',

  `reserve_date` DATE NOT NULL COMMENT '예약 날짜 (YYYY-MM-DD)',
  `reserve_time` CHAR(5) NOT NULL COMMENT '예약 시간 (HH:MM)',
  `people` INT NOT NULL COMMENT '인원 수',

  `wine` VARCHAR(100) DEFAULT '' COMMENT '와인',
  `beverage` VARCHAR(100) DEFAULT '' COMMENT '주류/음료',
  `food` VARCHAR(100) DEFAULT '' COMMENT '안주',
  `note` VARCHAR(1000) DEFAULT '' COMMENT '특이사항/알러지',

  `status` ENUM('신청','확인중','확정','취소','완료') DEFAULT '신청' COMMENT '진행 상태',

  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  `is_deleted` TINYINT(1) DEFAULT 0 COMMENT '삭제 플래그',

  INDEX (`user_id`),
  INDEX (`reserve_date`),
  INDEX (`status`),

  CONSTRAINT `fk_preorder_user`
    FOREIGN KEY (`user_id`) REFERENCES `signup_table`(`userId`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='사전예약 게시판';
";

$RES = mysqli_query($CONN, $SQL);

if($RES){
  echo "preorder_table 생성 성공";
}
else{
  echo "preorder_table 생성 실패";
}

?>
