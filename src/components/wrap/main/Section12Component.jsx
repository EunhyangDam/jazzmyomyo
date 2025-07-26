import React from "react";
import "./scss/Section12Component.scss";

export default function Section12Component(props) {
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // 오류 발생 시 상태 업데이트
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // 로깅 또는 추적 가능
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return <h2>문제가 발생했습니다. 나중에 다시 시도해 주세요.</h2>;
      }

      return this.props.children;
    }
  }

  return (
    <div id="section12Component" className="section">
      <section id="section12" className="visit">
        <div className="container">
          <div className="title">
            <h2>오시는길</h2>
          </div>
          <div className="content">
            <div className="left">
              <div className="map">
                <ErrorBoundary>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.9235585612446!2d126.91827577642995!3d37.55686472468175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c990005899e5f%3A0xfb3deb28ddc599e3!2z64m07Jis7J6s7KaI65287Jq07KeA!5e0!3m2!1sko!2skr!4v1752743153151!5m2!1sko!2skr"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </ErrorBoundary>
              </div>
            </div>
            <div className="right">
              <ul>
                <li>
                  <h2>매장정보</h2>
                </li>
                <li>
                  <h3>JAZZ MYOMYO</h3>
                </li>
                <li>
                  <i className="bi bi-geo-alt"></i>
                  <p>서울특별시 마포구 동교로23길 14</p>
                </li>
                <li>
                  <i className="bi bi-calendar"></i>
                  <p>18:00 ~ 02:00 /월요일 화요일 휴무</p>
                </li>
                <li>
                  <i className="bi bi-telephone"></i>
                  <p>02-500-5200</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
