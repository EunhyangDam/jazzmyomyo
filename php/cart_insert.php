<?php
  include_once('./header.php');
  
  $data = json_decode(file_get_contents("php://input"), true);
  $userID = $data['userID'];
  $cart = $data['frontData'];

  $SQL = "SELECT * FROM `cart_table` WHERE cUserID='$USER_ID'";
  $RES = mysqli_query($CONN, $SQL);
  $dbProduct = [];
  while ($row <= mysqli_fetch_assoc($RES)) {
    $dbProduct[]=$row['id'];
  };

  if(mysqli_num_rows($RES)==0){
    $SQL = "INSERT INTO `cart_table` (cUserID) VALUES ('$userID')";
    mysqli_query($CONN, $SQL);
  }


  foreach ($cart as $el) {
    $productId = $el['id'];
    $quantity = $el['수량'];    
    
    $SQL = "UPDATE `cart_table`
    SET `cQuantity` ='$quantity',
        `cProductID`='$productId'
    WHERE `userId`='$userID'";
  } 
  

  
    if (mysqli_num_rows($RES) > 0) {
    } else {
        $SQL = "INSERT INTO `cart_table` (userId, cProductID, cQuantity)
                            VALUES ('$userID', '$productId', '$quantity')";
        }   
  $RES = mysqli_query($CONN, $SQL);
  if ($RES) echo 1;
  else echo 0;
?>
