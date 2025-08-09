import { React, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./scss/HeaderComponent.scss";
import { useSelector } from "react-redux";
export default function HeaderComponent(props) {
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
            <aside
              id="aside"
              className={toggle && "toggle"}
              onClick={clickToggle}
            >
              <Link to="/Cart" className="icon">
                <i className="bi bi-cart2"></i>
              </Link>
              <Link to="/Mp" className="icon">
                <i className="fa-regular fa-user"></i>
              </Link>
              <Link to="/Wishlist" className="icon">
                <i className="fa-regular fa-heart"></i>
              </Link>
              <a href="!#">
                <span></span>
                <span></span>
                <span></span>
              </a>
            </aside>
          </nav>
          <div className="toggle-nav">
            <ul className="nav">
              {header.header.map((el) => (
                <li key={el.id}>
                  <Link to={el.link}>{el.main}</Link>
                  <div className="sub">
                    <div className="sub-container">
                      <ul>
                        {el.sub.map((el2) => (
                          <li key={el2.link}>
                            <Link to={el2.link}>{el2.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
