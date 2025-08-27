<?
    include_once('./header.php');

    // 2. 테이블에 저장할 회원가입 데이터    
    $userId         = $_POST['userId'];
    $userPw         = password_hash($_POST['userPw'], PASSWORD_DEFAULT);  // 암호화 => 패스워드_해시 함수(비밀번호, 패스워드_디폴트)
    $userName       = $_POST['userName'];
    $userEmail      = $_POST['userEmail'];
    $userHp         = $_POST['userHp'];
    $userAddress    = $_POST['userAddress'];
    $userGender     = $_POST['userGender'];
    $userBirth      = $_POST['userBirth'];
    $userService    = $_POST['userService'];

    // 3. 테이블에 삽입
    $SQL = "INSERT INTO `signup_table` (`userId`, `userPw`, `userName`, `userEmail`, `userHp`, `userAddress`, `userGender`, `userBirth`, `userService`)                  
                       VALUES ('$userId', '$userPw', '$userName', '$userEmail', '$userHp', '$userAddress', '$userGender', '$userBirth', '$userService')
           ";
    $RES = mysqli_query($CONN, $SQL);

    if($RES){
        echo 1;  // 성공 메시지 숫자 1
    }
    else {
        echo 0;  // 실패 메시지 숫자 0
    }

?>