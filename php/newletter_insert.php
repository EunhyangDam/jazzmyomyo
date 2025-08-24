<?php
  include_once('./header.php');
  
  $NAME = $_POST['name'];
  $EMAIL = $_POST['email'];
  $ADR = $_POST['adr'];

  $SQL = "INSERT INTO `newsletter_table`(`eName`,`eEmail`,`eAdr`)
         VALUES ('$NAME','$EMAIL','$ADR')";
  $RES = mysqli_query($CONN, $SQL);

  if($RES) echo 2;   
  else echo 3;
?>