<?php
    $SERVER='localhost';
    $NAME='eunhyang1223';
    $PW='Dodam0602!EMO';
    $DB='eunhyang1223';
    $conn = mysqli_connect($SERVER,$NAME,$PW,$DB);

    $userEmail =$_POST['userEmail'];
    $sql = "INSERT INTO email_list_table(email) VALUES ('$userEmail')";

    $res = mysqli_query ($conn, $sql);

    if ($res) {
        $json_data = ["이메일"=>$userEmail];
        echo json_encode($json_data, JSON_UNESCAPED_UNICODE);        
        $json_data2 = array("이메일"=>$userEmail);
        echo json_encode($json_data2, JSON_UNESCAPED_UNICODE);
    } else{
        echo "save failed";
    }
    
?>