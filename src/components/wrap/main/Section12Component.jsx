import React, { useState, useEffect } from "react";
import "./scss/Section12Component.scss";

export default function Section12Component(props) {
  const [state, setState] = useState({
    오시는길: {},
  });

  useEffect(() => {
    fetch("./json/section12/section12.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState({
          오시는길: data.오시는길,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="section12Component">
      <section id="section12" className="visit">
        <div className="container">
          <div className="title">
            <div className="title-container">
              <h2>{state.오시는길.섹션명}</h2>
            </div>
          </div>
          <div className="content">
            <div className="left">
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9235585612446!2d126.91827577642995!3d37.55686472468175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c990005899e5f%3A0xfb3deb28ddc599e3!2z64m07Jis7J6s7KaI65287Jq07KeA!5e0!3m2!1sko!2skr!4v1752743153151!5m2!1sko!2skr"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="오시는 길 지도"
                ></iframe>
              </div>
            </div>
            <div className="right">
              <ul>
                <li>
                  <h2>{state.오시는길.타이틀}</h2>
                </li>
                <li>
                  <h3>{state.오시는길.가게명}</h3>
                </li>
                <li>
                  <i className="bi bi-geo-alt"></i>
                  <p>{state.오시는길.주소}</p>
                </li>
                <li>
                  <i className="bi bi-calendar"></i>
                  <p>{state.오시는길.운영시간}</p>
                </li>
                <li>
                  <i className="bi bi-telephone"></i>
                  <p>{state.오시는길.전화번호}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
