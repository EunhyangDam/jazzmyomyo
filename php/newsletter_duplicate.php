<?php 
    include_once('./header.php');

    $EMAIL = $_POST['email'];

    $SQL = "SELECT eEmail FROM `newsletter_table` WHERE eEmail='$EMAIL'";
    $RES = mysqli_query($CONN,$SQL);

    if(mysqli_num_rows($RES)>=1){echo 1;}
    else {echo 0;};
?>