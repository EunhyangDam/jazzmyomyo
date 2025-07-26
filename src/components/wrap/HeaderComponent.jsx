import { React, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./scss/HeaderComponent.scss";
export default function HeaderComponent(props) {
  const [state, setState] = useState(false);
  const [toggle, setToggle] = useState(false);
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
  return (
    <>
      <header
        id="header"
        className={state ? "active" : "" || toggle ? "toggle" : ""}>
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
            <ul className="clicked">
              {header.header.map((el) => (
                <li key={el.id}>
                  <Link to={`./${el.link}`}>{el.main}</Link>
                  <ul className="sub">
                    {el.sub.map((subEl, idx) => (
                      <li key={idx}>{subEl}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
          <aside>
            <ul className="head">
              <li className="menu">
                <Link to="./sub09Cart">
                  <i className="fa-solid fa-cart-arrow-down"></i>
                </Link>
              </li>
              <li className="menu">
                <Link to="./sub07MyProfile">
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
                className={`toggle ${toggle ? "active" : ""}`}>
                <button>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </li>
            </ul>
            <ul className="clicked">
              <li className="menu">
                <Link to="./sub09Cart">
                  <i className="fa-solid fa-cart-arrow-down"></i>
                </Link>
              </li>
              <li className="menu">
                <Link to="./sub07MyProfile">
                  <i className="fa-solid fa-user"></i>
                </Link>
              </li>
              <li className="menu">
                <Link to="./">
                  <i className="fa-solid fa-heart"></i>
                </Link>
              </li>
              <li className="toggle">
                <button>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </li>
            </ul>
          </aside>
        </div>
      </header>
      <Outlet />
    </>
  );
}
