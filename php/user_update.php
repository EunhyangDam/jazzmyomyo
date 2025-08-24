<?php
  include_once('./header.php');

  $dob =$_POST['dob'];
  $email =$_POST['email'];
  $name =$_POST['name'];
  $number =$_POST['number'];
  $userID =$_POST['userID'];
  
  $SQL = "UPDATE `signup_table`
            SET `userBirth`='$dob',
                `userEmail`='$email',
                `userName`='$name',
                `userHp`='$number'
            WHERE `userId`='$userID'";
  $RES = mysqli_query($CONN,$SQL);
  if($RES){ echo 1;}
  else    {echo 0;};
?>