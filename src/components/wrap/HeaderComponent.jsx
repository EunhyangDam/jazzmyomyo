import { React, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./scss/HeaderComponent.scss";
export default function HeaderComponent(props) {
  const [state, setState] = useState(false);
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
  const clickAddClass = (e) => {
    e.preventDefault();
    setState(true);
  };
  const clickRemoveClass = (e) => {
    e.preventDefault();
    setState(false);
  };
  const toggleMenu = (e) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };
  useEffect(() => {
    const mainBtn = document.querySelectorAll(".mainBtn");
    const sub = document.querySelectorAll(".sub");
    const mouseEnterHandler = (el, idx) => {
      sub.forEach((remove, i) => {
        remove.classList.remove("active");
        remove.style.display = "none";
      });
      sub[idx].style.display = "flex";
      sub[idx].classList.add("active");
    };
    mainBtn.forEach((el, idx) => {
      el.addEventListener("mouseenter", () => mouseEnterHandler(el, idx));
    });
  }, [toggle]);
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
  return (
    <>
      <header
        id="header"
        className={
          state ? "active" : "" || toggle ? "toggle" : "" || scr ? "down" : ""
        }
      >
        <div className="container">
          <h1 onClick={clickRemoveClass}>
            <Link to="/mainComponent">
              <img src="./img/logo.png" alt="" />
            </Link>
          </h1>
          <nav>
            <ul className="head">
              {header.header.map((el) => (
                <li key={el.id} onClick={clickAddClass}>
                  <Link to={`./${el.link}`}>
                    <span>{el.main}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {toggle && (
              <ul className="clicked" onClick={() => setToggle(false)}>
                {header.header.map((el) => (
                  <li key={el.id}>
                    <Link to={`./${el.link}`} className="mainBtn">
                      {el.main}
                    </Link>
                    <ul className="sub">
                      {el.sub.map((subEl, idx) => (
                        <li key={subEl.link}>
                          <Link to={subEl.link}>
                            <span>{subEl.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </nav>
          <aside>
            <ul className="head">
              <li className="menu">
                <Link to="./Cart">
                  <i className="fa-solid fa-cart-arrow-down"></i>
                </Link>
              </li>
              <li className="menu">
                <Link to="./Mp">
                  <i className="fa-solid fa-user"></i>
                </Link>
              </li>
              <li className="menu">
                <Link to="./">
                  <i className="fa-solid fa-heart"></i>
                </Link>
              </li>
              <li
                onClick={toggleMenu}
                className={`toggle ${toggle ? "active" : ""}`}
              >
                <button>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </li>
            </ul>
            {toggle && (
              <ul className="clicked">
                <li className="menu">
                  <Link to="./Cart">
                    <i className="fa-solid fa-cart-arrow-down"></i>
                  </Link>
                </li>
                <li className="menu">
                  <Link to="./Mp">
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </li>
                <li className="menu">
                  <Link to="./">
                    <i className="fa-solid fa-heart"></i>
                  </Link>
                </li>
                <li
                  onClick={toggleMenu}
                  className={`toggle ${toggle ? "active" : ""}`}
                >
                  <button>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </li>
              </ul>
            )}
          </aside>
        </div>
      </header>
      <Outlet />
    </>
  );
}
