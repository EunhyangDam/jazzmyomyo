<?php
$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';

$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');

$SQL = "
CREATE TABLE IF NOT EXISTS grade_table (
  idx         INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
  gradeName   VARCHAR(20) NOT NULL COMMENT '등급명',
  `condition` VARCHAR(100) NOT NULL COMMENT '조건',
  benefit     VARCHAR(100) NOT NULL COMMENT '혜택',
  updatedAt   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='회원 등급 설정 테이블'
";

$RES = mysqli_query($CONN, $SQL);
echo $RES ? "grade_table 생성 완료" : "grade_table 생성 실패: " . mysqli_error($CONN);
