import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

import "./scss/Sub06SearchRs.scss";

function Sub06SearchRs(props) {

  const [sp] = useSearchParams();
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    const name = (sp.get("name") || "").trim();
    const hp = (sp.get("hp") || "").replace(/\D/g, ""); // 숫자만

    // 파라미터 없으면 방어적으로 복귀
    if (!name || !hp) {
      alert("잘못된 접근입니다.");
      window.history.back();
      return;
    }

    (async () => {
      const fd = new FormData();
      fd.append("mode", "findId");
      fd.append("userName", name);
      fd.append("userHpDigits", hp);
      try {
        const res = await axios.post("/jazzmyomyo/account_find.php", fd);
        if (res?.data?.ok) {
          setUserId(res.data.userId);
        } else {
          alert(res?.data?.msg || "조회 결과가 없습니다.");
          window.history.back();
        }
      } catch (e) {
        alert("서버 통신 중 오류가 발생했습니다.");
        window.history.back();
      }
    })();
  }, [sp]);

  return (
    <div id="sub06SearchRs">
      <div className="container">
        <div className="img-box">
          <img className="cat" src="./img/id_search_result/id_search_myomyo.png" alt="" aria-hidden="true" />
          <img className="bang" src="./img/id_search_result/attention_mark.png" alt="" aria-hidden="true" />
        </div>

        <div className="content">
          <div className="card">
            <h3 id="rid-title">아이디를 찾았어요!</h3>

            <dl className="result-box">
              <div className="result result-id">
                <div className="text">
                  <dt>아이디</dt>
                  <dd>{userId}</dd>
                </div>
              </div>
              <div className="result date">
                <div className="text">
                  <dt>비밀번호도 찾으러 갈까요?</dt>
                  <dd>
                    <Link to="/searchId?tab=findPw">비번찾기</Link>
                  </dd>
                </div>
              </div>
            </dl>

            <Link to="/lg" className="btn primary">
                로그인 바로가기
            </Link>        
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sub06SearchRs;
