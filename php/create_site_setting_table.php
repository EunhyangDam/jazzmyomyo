<?php
$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';

$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
if (!$CONN) {
  die("DB 연결 실패: " . mysqli_connect_error());
}
mysqli_set_charset($CONN, 'utf8mb4');

$SQL = "
CREATE TABLE IF NOT EXISTS site_setting_table (
  setting_key   VARCHAR(50) PRIMARY KEY COMMENT '설정 키 (예: signup_approval)',
  setting_value VARCHAR(255) NOT NULL COMMENT '설정 값 (예: 자동 승인)',
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
                ON UPDATE CURRENT_TIMESTAMP COMMENT '마지막 수정일'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='전역 사이트 설정 테이블'
";

$RES = mysqli_query($CONN, $SQL);
if ($RES) {
  echo "site_setting_table 생성 완료";
} else {
  echo "site_setting_table 생성 실패: " . mysqli_error($CONN);
}
