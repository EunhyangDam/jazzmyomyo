<?

    include_once('./header.php');
    
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-cache');
    
    $response = ['ok' => false];
    
    try {
      if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('허용되지 않은 요청입니다. (POST 만 허용)');
      }
  
      $id     = isset($_POST['id']) ? intval($_POST['id']) : 0;
      $userId = isset($_POST['userId']) ? trim($_POST['userId']) : '';
  
      if ($id <= 0 || $userId === '') {
        throw new Exception('잘못된 요청입니다. (id, userId 필요)');
      }
  
      $TABLE = 'ticket_resavation_table';
  
      // 2) 본인 예약 & 현재 상태 조회
      $sqlSel = "SELECT id, userId, orderStatus, updatedAt
                 FROM `{$TABLE}`
                 WHERE id = ? AND userId = ?
                 LIMIT 1";
      $stmtSel = mysqli_prepare($CONN, $sqlSel);
      mysqli_stmt_bind_param($stmtSel, 'is', $id, $userId);
      mysqli_stmt_execute($stmtSel);
      $resSel = mysqli_stmt_get_result($stmtSel);
  
      if (!$resSel || mysqli_num_rows($resSel) === 0) {
        throw new Exception('예약을 찾을 수 없거나 권한이 없습니다.');
      }
  
      $row = mysqli_fetch_assoc($resSel);
      if (strtolower($row['orderStatus']) === 'canceled') {
        echo json_encode([
          'ok'          => true,
          'already'     => true,
          'id'          => (int)$row['id'],
          'orderStatus' => 'canceled',
          'canceledAt'  => $row['updatedAt'],
          'msg'         => '이미 취소된 예약입니다.'
        ], JSON_UNESCAPED_UNICODE);
        exit;
      }
  
      // (선택) 취소 제한 규칙이 있으면 여기서 검사. 없으면 항상 통과
      $canCancel = true;
      if (!$canCancel) {
        throw new Exception('공연 시작 24시간 전 이후에는 취소할 수 없습니다.');
      }
  
      // 3) 상태 변경: reserved → canceled
      $sqlUpd = "UPDATE `{$TABLE}`
                 SET orderStatus = 'canceled'
                 WHERE id = ? AND userId = ? AND orderStatus <> 'canceled'";
      $stmtUpd = mysqli_prepare($CONN, $sqlUpd);
      mysqli_stmt_bind_param($stmtUpd, 'is', $id, $userId);
      mysqli_stmt_execute($stmtUpd);
  
      if (mysqli_stmt_affected_rows($stmtUpd) <= 0) {
        throw new Exception('취소할 수 없는 상태이거나 업데이트에 실패했습니다.');
      }
  
      // 4) 갱신된 취소 시각(updatedAt) 재조회
      $stmtSel2 = mysqli_prepare($CONN, $sqlSel);
      mysqli_stmt_bind_param($stmtSel2, 'is', $id, $userId);
      mysqli_stmt_execute($stmtSel2);
      $resSel2 = mysqli_stmt_get_result($stmtSel2);
      $row2 = mysqli_fetch_assoc($resSel2);
  
      $response = [
        'ok'          => true,
        'id'          => (int)$row2['id'],
        'orderStatus' => 'canceled',
        'canceledAt'  => $row2['updatedAt'],
        'msg'         => '예약이 취소되었습니다.'
      ];
  
    } catch (Exception $e) {
      $response['ok']  = false;
      $response['msg'] = $e->getMessage();
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);

?>