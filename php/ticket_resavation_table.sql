CREATE TABLE IF NOT EXISTS ticket_resavation_table (
  id            INT AUTO_INCREMENT PRIMARY KEY,

  -- 예약 구분 / 식별
  resType       ENUM('guest','member') NOT NULL,     -- 비회원/회원
  userId        VARCHAR(64) NULL,                    -- 회원이면 회원 ID, 비회원이면 NULL 권장
                                                    -- (원하면 '비회원' 문자열로 저장해도 됨)

  -- 예약자 정보 (member일 때도 스냅샷으로 보관: 변경 이력 대비)
  userName      VARCHAR(100) NOT NULL,
  userEmail     VARCHAR(200) NOT NULL,
  userHp        VARCHAR(50)  NOT NULL,

  -- 공연/상품 정보
  artistName     VARCHAR(64) NULL,                    -- 공연/세션 ID(있으면)
  productName   VARCHAR(200) NOT NULL,               -- 공연명/아티스트명
  poster        VARCHAR(500) NULL,                   -- 포스터 경로(선택)

  -- 일정/인원/가격
  scheduleDate  DATE NOT NULL,                       -- YYYY-MM-DD
  timeStart     TIME NOT NULL,                       -- HH:MM:SS
  timeEnd       TIME NULL,                           -- HH:MM:SS (없으면 NULL)
  peopleCount   INT NOT NULL DEFAULT 1,
  price         INT NOT NULL DEFAULT 0,              -- 총액(필요 없으면 0)
  payMethod     VARCHAR(20) NOT NULL DEFAULT 'none', -- 'none' | 'onsite' | 'card' 등

  -- 상태/메타
  orderStatus   ENUM('reserved','completed','canceled','deleted')
                NOT NULL DEFAULT 'reserved',
  createdAt     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- 인덱스
  INDEX idx_user (userId),
  INDEX idx_date_time (scheduleDate, timeStart),
  INDEX idx_type (resType),
  INDEX idx_status (orderStatus)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;