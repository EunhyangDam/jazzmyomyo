<?php
$DB1 = 'localhost';
$DB2 = 'jazzmyomyo';
$DB3 = 'eevee0202!';
$DB4 = 'jazzmyomyo';
$CONN = mysqli_connect($DB1, $DB2, $DB3, $DB4);
mysqli_set_charset($CONN, 'utf8mb4');

$SQL = "CREATE TABLE IF NOT EXISTS `member_table`(
  `idx`         INT NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `signup_idx`  INT NOT NULL COMMENT 'signup_table.idx 참조',
  `userId`      VARCHAR(16)  NOT NULL COMMENT '아이디(복제)',
  `userGrade`   ENUM('일반','단골') NOT NULL DEFAULT '일반' COMMENT '등급',
  `userStatus`  ENUM('정상','휴면','탈퇴') NOT NULL DEFAULT '정상' COMMENT '상태',
  `updatedAt`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  PRIMARY KEY (`idx`),
  UNIQUE KEY `uq_signup_idx` (`signup_idx`),
  UNIQUE KEY `uq_userId`     (`userId`),
  CONSTRAINT `fk_member_signup`
    FOREIGN KEY (`signup_idx`) REFERENCES `signup_table`(`idx`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원 관리 테이블'";

$RES = mysqli_query($CONN, $SQL);

if ($RES) {
    echo "member_table 생성 성공<br>";

    // 기존 signup_table 데이터 -> member_table 초기 Insert
    $sqlInit = "INSERT IGNORE INTO member_table (signup_idx, userId, userGrade, userStatus)
                SELECT s.idx, s.userId, '일반', '정상'
                FROM signup_table s";
    $resInit = mysqli_query($CONN, $sqlInit);

    if ($resInit) {
        echo "기존 회원정보를 member_table로 동기화 완료";
    } else {
        echo "동기화 실패: " . mysqli_error($CONN);
    }

} else {
    echo "member_table 생성 실패: " . mysqli_error($CONN);
}
