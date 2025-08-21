import { useNavigate } from "react-router-dom";

export default function useCustomA(props) {
  const nav = useNavigate();

  const onClickA = (e, href, data, beValue) => {
    e.preventDefault();

    //null =>링크없음
    if (href === null) {
      return;
    }

    //외부링크
    const regExp = /^https?:\/\//;
    if (regExp.test(href)) {
      window.open(href); //새창으로 띄어준다
      return;
    }

    //내부링크 => 라우터구현
    if (data) {
      nav(href, data); //전송 데이터가 있다면 state 전달
    } else if (href === "/") {
      nav("/mainComponent");
    } else {
      console.log();
      nav(href); //state 데이터 없으면 => location
    }

    //   //네비게이트를 이용해 라우터구현 페이지 이동
    // // /main#section3

    // //목적 : 싱글페이지 에서 문제점 현재 위치 그대로 이동하는 이슈 => 맨위로 자동으로 이동
    // if(beValue){
    //     window.scrollTo({top:0, left:0, behavior:beValue});
    // }
    // else{
    //     window.scrollTo({top:0, left:0, behavior:'auto'});
    // }
  };

  return {
    onClickA,
  };
}
