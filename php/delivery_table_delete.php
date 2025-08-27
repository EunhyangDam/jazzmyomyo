<?

include_once('./header.php');

$idx = $_POST['idx'];

$SQL = "UPDATE `delivery_table` 
        SET    deliveryDel=1
        WHERE  idx='$idx'
        ";

$RES = mysqli_query($CONN, $SQL);
  if($RES){
        echo 1;
    }
    else{
        echo 0;
    }
?>