import { React, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./scss/HeaderComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../../store/signIn";
export default function HeaderComponent(props) {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const userAsset = useSelector((state) => state.signIn);

  const [toggle, setToggle] = useState(false);
  const [scr, setScr] = useState(false);
  const [header, setHeader] = useState({
    header: [],
  });
  const [active, setActive] = useState(false);
  const [size, setSize] = useState({
    width: "",
  });
  const [subHeight, setSubHeight] = useState([]);
  const [t, setT] = useState(Array(header.header.length).fill(false));
  let isMain = useSelector((state) => state.header);
  /**fetch */
  useEffect(() => {
    fetch("./json/header/gnb.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setHeader({
          header: data.header,
        });
        setT(Array(data.header.length).fill(false));
      })
      .catch((err) => {
        alert("header error");
        console.log(err);
      });
  }, []);

  /**scroll event */
  useEffect(() => {
    let prevScr = 0;
    let nowScr = null;
    const handleScr = () => {
      nowScr = window.scrollY;
      if (nowScr - prevScr > 0) {
        setScr(true);
        setToggle(false);
      } else if (nowScr - prevScr < 0) {
        setScr(false);
      }
      prevScr = nowScr;
    };
    window.addEventListener("scroll", handleScr);
    return () => window.removeEventListener("scroll", handleScr);
  }, []);

  /**main 감지 */
  useEffect(() => {
    let act = isMain.isMain;
    setActive(act);
  }, [isMain.isMain]);

  const clickToggle = (e) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };
  const clickSubToggle = (e, link) => {
    e.preventDefault();
    setToggle((prev) => !prev);
    navigation(link);
  };

  const liRefs = useRef([]);
  const setLi = (el, i) => {
    liRefs.current[i] = el;
  };

  const mouseEnterLi = (e) => {
    if (size > 1024) return;
    liRefs.current.forEach((el) => el.classList.remove("active"));
    e.target.closest("li").classList.add("active");
  };
  const mouseLeaveNav = (e) => {
    liRefs.current.forEach((el) => el.classList.remove("active"));
  };

  const clickSubLi = (e, link) => {
    e.preventDefault();
    setToggle((prev) => !prev);
    navigation(link);
  };

  const subRefs = useRef([]);
  const setSub = (node, i) => {
    subRefs.current[i] = node;
  };

  const mobile = (e) => {
    let subHeight = subRefs;
    if (!toggle) return;
    subHeight = subHeight.current.map((el) => el.scrollHeight);
    setSubHeight(subHeight);
    subRefs.current.forEach((el) => (el.style.height = 0));
  };

  useEffect(() => {
    const handleResize = () => {
      let size = document.documentElement.clientWidth;
      setSize({
        width: size,
      });
      if (size <= 1024) {
        mobile();
      } else {
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  const [index, setIndex] = useState();
  const clickSubButton = (e, idx) => {
    e.preventDefault();

    subRefs.current.forEach((el) => (el.style.height = 0));
    subRefs.current[idx].style.height = `${subHeight[idx]}px`;

    setIndex(idx);
    if (idx === index) {
      subRefs.current[idx].style.height = "0px";
      setIndex(null);
    }
  };

  const logOut = (e) => {
    dispatch(logOutAction(null));
  };
  return (
    <>
      <header
        id="header"
        className={`${active ? "sub" : ""} ${scr ? "scrUp" : ""}`}
      >
        <div className="container">
          <h1>
            <Link to="/mainComponent">
              <img src="./img/logo.png" alt="" />
            </Link>
          </h1>
          <nav id="nav">
            <ul>
              {header.header.map((el, i) => (
                <li key={el.id}>
                  <Link to={el.link}>{el.main}</Link>
                </li>
              ))}
            </ul>
            <aside id="aside" className={toggle ? "toggle" : ""}>
              <span className="icon">{userAsset.아이디}님!</span>
              <Link to="/cart" className="icon">
                <i className="bi bi-cart2"></i>
              </Link>
              {userAsset.아이디 ? (
                <Link to="/mp" className="icon">
                  <i className="fa-regular fa-user"></i>
                </Link>
              ) : (
                <Link to="/lg" className="icon">
                  <i className="fa-regular fa-user"></i>
                </Link>
              )}
              <Link to="/wishlist" className="icon">
                <i className="fa-regular fa-heart"></i>
              </Link>
              {userAsset.아이디 ? (
                <a href="!#" className="icon log-in-out" onClick={logOut}>
                  로그아웃
                </a>
              ) : (
                <Link to="/lg" className="icon log-in-out">
                  로그인
                </Link>
              )}
              <a href="!#" onClick={clickToggle}>
                <span></span>
                <span></span>
                <span></span>
              </a>
            </aside>
          </nav>
          {toggle && (
            <div className="toggle-nav">
              <ul className="nav" onMouseLeave={mouseLeaveNav}>
                {header.header.map((el, i) => (
                  <li
                    key={el.id}
                    className="nav-li"
                    ref={(node) => setLi(node, i)}
                  >
                    <Link
                      onClick={(e) => clickSubToggle(e, el.link)}
                      onMouseEnter={mouseEnterLi}
                    >
                      {el.main}
                    </Link>
                    <button
                      className="slideDown"
                      onClick={(e) => clickSubButton(e, i)}
                    >
                      <i className="fa-solid fa-angle-down"></i>
                    </button>
                    <div className="sub" ref={(node) => setSub(node, i)}>
                      <div className="sub-container">
                        <ul>
                          {el.sub.map((el2) => (
                            <li key={el2.link}>
                              <Link
                                to={el2.link}
                                onClick={(e) => clickSubLi(e, el2.link)}
                              >
                                {el2.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="aside">
                {userAsset.이름 && (
                  <span className="icon">{userAsset.이름} 님!</span>
                )}
                <Link to="/cart" className="icon">
                  <i className="bi bi-cart2"></i>
                </Link>
                {userAsset.아이디 ? (
                  <Link to="/mp" className="icon">
                    <i className="fa-regular fa-user"></i>
                  </Link>
                ) : (
                  <Link to="/lg" className="icon">
                    <i className="fa-regular fa-user"></i>
                  </Link>
                )}
                <Link to="/wishlist" className="icon">
                  <i className="fa-regular fa-heart"></i>
                </Link>
                {userAsset.아이디 ? (
                  <a href="!#" className="icon log-in-out" onClick={logOut}>
                    로그아웃
                  </a>
                ) : (
                  <Link to="/lg" className="icon log-in-out">
                    로그인
                  </Link>
                )}
                <a href="!#" className="toggle" onClick={clickToggle}>
                  <span></span>
                  <span></span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
      <Outlet />
    </>
  );
}
