<?php
  include_once('./header.php');
  
  $ID = $_POST['ID'];

  $SQL = "SELECT * FROM `signup_table` WHERE `userId`='$ID'";
  $RES = mysqli_query($CONN, $SQL);

  if(mysqli_num_rows($RES)>=1) {
    $item = mysqli_fetch_array($RES);      
    $arr = [
        'ID'=>$item['userId'],
        'name'=>$item['userName'],
        'number'=>$item['userHp'],
        'adress'=>$item['userAddress'],
        'dob'=>$item['userBirth'],
        'gender'=>$item['userGender'],
        'email'=>$item['userEmail'],
        'service'=>$item['userService'],
        'dateAt'=>$item['dateAt']
    ];
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);       
  } else{
        echo 0;
    };
?>