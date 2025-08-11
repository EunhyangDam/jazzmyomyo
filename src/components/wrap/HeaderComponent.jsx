import { React, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./scss/HeaderComponent.scss";
import { useSelector } from "react-redux";
export default function HeaderComponent(props) {
  const navigation = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [scr, setScr] = useState(false);
  const [header, setHeader] = useState({
    header: [
      {
        id: "",
        main: "",
        link: "",
        sub: [],
      },
    ],
  });
  const [active, setActive] = useState(false);
  const [size, setSize] = useState({
    width: "",
  });
  let isMain = useSelector((state) => state.header);
  useEffect(() => {
    fetch("./json/header/gnb.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setHeader({
          header: data.header,
        });
      })
      .catch((err) => {
        alert("header error");
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let prevScr = 0;
    let nowScr = null;
    const handleScr = () => {
      nowScr = window.scrollY;
      if (nowScr - prevScr > 0) {
        setScr(true);
      } else if (nowScr - prevScr < 0) {
        setScr(false);
      }
      prevScr = nowScr;
    };
    window.addEventListener("scroll", handleScr);
    return () => window.removeEventListener("scroll", handleScr);
  }, []);
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

  useEffect(() => {
    const handleResize = () => {
      let size = window.innerWidth;
      console.log(subRefs);
      setSize({
        width: size,
      });
      if (size < 1024) {
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const clickSubButton = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <header id="header" className={`${active && "sub"} ${scr && "scrUp"}`}>
        <div className="container">
          <h1>
            <Link to="/mainComponent">
              <img src="./img/logo.png" alt="" />
            </Link>
          </h1>
          <nav id="nav">
            <ul>
              {header.header.map((el) => (
                <li key={el.id}>
                  <Link to={el.link}>{el.main}</Link>
                </li>
              ))}
            </ul>
            <aside id="aside" className={toggle && "toggle"}>
              <Link to="/Cart" className="icon">
                <i className="bi bi-cart2"></i>
              </Link>
              <Link to="/Mp" className="icon">
                <i className="fa-regular fa-user"></i>
              </Link>
              <Link to="/Wishlist" className="icon">
                <i className="fa-regular fa-heart"></i>
              </Link>
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
                    <button className="slideDown" onClick={clickSubButton}>
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
                <Link to="/Cart" className="icon">
                  <i className="bi bi-cart2"></i>
                </Link>
                <Link to="/Mp" className="icon">
                  <i className="fa-regular fa-user"></i>
                </Link>
                <Link to="/Wishlist" className="icon">
                  <i className="fa-regular fa-heart"></i>
                </Link>
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
