import React, { useState } from "react";
import "./scss/Section6Component.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { confirmModalAction } from "../../../store/confirmModal";
export default function Section6Component(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    adr: "",
    chk: false,
  });
  const changeEvent = (e) => {
    setState({
      ...state,
      [e.target.dataset.name]: e.target.value,
    });
  };
  const changeChk = (e) => {
    let val = false;
    if (e.target.checked) {
      val = true;
    } else {
      val = false;
    }
    setState({
      ...state,
      chk: val,
    });
  };
  const submitEvent = (e) => {
    e.preventDefault();
    const condition = [
      {
        _case: state.name === "" || state.email === "" || state.adr === "",
        messege: "필수 항목에 기입해주세요.",
      },
      {
        _case: state.chk === false,
        messege: "개인정보 수집 및 활용에 동의해주세요.",
      },
      {
        _case:
          /^(01[016789])-?\d{3,4}-?\d{4}$|^(0\d{2})-?\d{3,4}-?\d{4}$/g.test(
            state.adr
          ) === false,
        messege: "전화번호 형식이 아닙니다.",
      },
    ];
    for (const { _case, messege } of condition) {
      if (_case) {
        dispatch(
          confirmModalAction({
            heading: messege,
            isON: true,
          })
        );
        return;
      }
    }
    const idData = new FormData();
    idData.append("email", state.email);
    axios({
      url: "/jazzmyomyo/newsletter_duplicate.php",
      method: "POST",
      data: idData,
    })
      .then((res) => {
        if (res.status === 200) {
          let obj = {
            heading: "",
            explain: "",
            isON: true,
            isConfirm: false,
          };
          if (res.data === 1) {
            obj = {
              ...obj,
              heading: "이미 등록된 이메일입니다.",
            };
          } else if (res.data === 0) {
            const formData = new FormData();
            const appendData = [
              { field: "name", _key: state.name },
              { field: "email", _key: state.email },
              { field: "adr", _key: state.adr },
            ];
            appendData.forEach(({ field, _key }) => {
              formData.append(field, _key);
            });
            axios({
              url: "/jazzmyomyo/newletter_insert.php",
              method: "POST",
              data: formData,
            })
              .then((res) => {
                if (res.status === 200) {
                  if (res.data === 2) {
                    obj = {
                      ...obj,
                      heading: "구독이 완료되었습니다.",
                      explain: "매달 15일에 만나묘!",
                    };
                  } else if (res.data === 3) {
                    alert("전송 실패 에러");
                    console.log("전송 실패 에러 사유:", res.data);
                  }
                } else {
                  alert("전송 실패 에러");
                  console.log("전송 실패 에러 사유:", res.data);
                }
                dispatch(confirmModalAction(obj));
              })
              .catch((err) => {
                console.log(err);
                alert("SECTION 6 ERROR");
              });
          }
          dispatch(confirmModalAction(obj));
        } else {
          alert("중복 검사 실패");
          console.log("중복 검사 실패 사유:", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("SECTION 6 ERROR");
      });
  };
  return (
    <div id="section6Component" className="section">
      <div className="inner">
        <div className="left">
          <h2>
            <span>재즈 묘묘.</span>
            <i className="fa-solid fa-angles-left"></i>
            <span className="line"></span>
            <i className="fa-solid fa-angles-right"></i>
            <span>묘원.</span>
          </h2>
          <p>재즈 묘묘의 다양한 소식을 만나보세요!</p>
          <dl>
            <dt>개인정보 수집 및 이용에 관한 동의</dt>
            <dd>수집·이용 목적: 뉴스레터 발송</dd>
            <dd>수집 항목: 이름, 이메일 주소</dd>
            <dd>보유 및 이용 기간: 수신거부 의사 전달시까지</dd>
            <dd>
              개인정보 수집 및 이용 동의를 거부하실 수 있습니다. 다만, 동의하지
              않을 경우 뉴스레터를 받으실 수 없습니다. 개인정보는 위 수집·이용
              목적 이외의 다른 용도로 사용하지 않습니다.
            </dd>
          </dl>
        </div>
        <div className="right">
          <form onSubmit={submitEvent}>
            <ul>
              <li>
                <p>이름*</p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  data-name="name"
                  onChange={changeEvent}
                />
              </li>
              <li>
                <p>이메일*</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  data-name="email"
                  onChange={changeEvent}
                />
              </li>
              <li>
                <p>연락처*</p>
                <input
                  type="text"
                  name="adr"
                  id="adr"
                  data-name="adr"
                  onChange={changeEvent}
                />
              </li>
            </ul>
            <button type="submit">구독하기</button>
            <div className="chk">
              <input
                type="checkbox"
                name="chkbox"
                id="chkbox"
                checked={state.chk}
                onChange={changeChk}
              />
              <label htmlFor="chkbox">
                개인정보 수집 및 활용에 동의합니다.
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
