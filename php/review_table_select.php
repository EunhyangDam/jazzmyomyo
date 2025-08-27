<?
include_once('./header.php');


$SQL = "SELECT * FROM review_table
        WHERE wdel=0
";
$RES = mysqli_query($CONN, $SQL);
$arr = array(); // 배열 선언 필수


if(mysqli_num_rows($RES)>=1){

    // json 데이터 만들기 / 
    // while 반복문 - 게시물 목록 개수만큼 반복문 구현 
    // array_push() 누적 저장 함수


    while($item = mysqli_fetch_array($RES)){
        // 누적 (축적 저장) 함수 사용, 여러줄일때
        array_push($arr, array(

            "idx"        => $item['idx'], 
            "wSubject"   => $item['wSubject'], 
            "wContent"   => $item['wContent'], 
            "wId"        => $item['wId'], 
            "wName"      => $item['wName'], 
            "wDate"      => $item['wDate'], 
            "wUpdate"    => $item['wUpdate'],
            "wdel"       => $item['wdel'],
            "Heart"       => $item['Heart']

        ));

    }; 
    
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);

}
else{
    echo 0; 
}


?>