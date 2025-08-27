<?
include_once('./header.php');

$idx      = $_POST['idx'];


// 수정 UPDATE

$SQL = "UPDATE review_table 
        SET Heart=COALESCE(Heart, 0) +1
        WHERE idx='$idx' 
        ";

// 쿼리 실행
$RES = mysqli_query($CONN, $SQL) or die(mysqli_error($CONN));

if($RES){ 

    $row = mysqli_fetch_assoc(mysqli_query($CONN, "SELECT Heart FROM review_table WHERE idx='$idx'"));
    echo $row['Heart'];
}
else{
    echo 0; // 수정 실패
};

?>