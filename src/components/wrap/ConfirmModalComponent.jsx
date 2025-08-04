import React from "react";

function ConfirmModalComponent(props) {
  return (
    <div id="comfirmModalComponent">
      <div className="container">
        <div className="content">
          <div className="col1 col">
            <div className="sentence">
              <p className="heading">냐냥냐묘묘</p>
              <p className="explain">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Corrupti, error repellat voluptates eius ducimus molestias vitae
                quasi, ea aliquid laboriosam molestiae facere est! Rem beatae
                facilis pariatur laboriosam, exercitationem excepturi.
              </p>
            </div>
            <div className="button">
              <button>취소</button>
              <button>지우기</button>
            </div>
          </div>
          <div className="col2 col">
            <i class="fa-solid fa-paw"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModalComponent;
