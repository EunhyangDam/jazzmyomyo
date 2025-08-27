<?php
  include_once('./header.php');
  
  $data = json_decode(file_get_contents("php://input"), true);
  $userID = $data['userID'];
  $cart = $data['frontData'];

  foreach ($cart as $el) {
    $productId = $el['id'];
    $quantity = $el['수량'];
}
  
  $SQL = "SELECT * FROM `cart_table`
          WHERE cUserID='$USER_ID'
  $RES = mysqli_query($CONN, $SQL);
  
  if (mysqli_num_rows($RES) > 0) {
      $SQL = "UPDATE `cart_table`
                SET `cQuantity` ='$quantity',
                    `cProductID`='$productId'
                WHERE `userId`='$USER_ID'";
  } else {
      $SQL = "INSERT INTO `cart_table` (userId, cProductID, cQuantity)
                          VALUES ('$userID', '$productId', '$quantity')";
  }
  
  $RES = mysqli_query($CONN, $SQL);
  if ($RES) echo 1;
  else echo 0;
?>
