import React from "react";
// import bridge from "@vkontakte/vk-bridge";

import "../../styles/PsyHelpPage.css";

class PsyHelpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
    };

    this.currOffset = 1;
    this.offset = 20;
  }

  render() {
    return (
      <div>
        <div
          className="streamView"
          style={{
            background: `url(https://64.media.tumblr.com/f807fcbbbe4e82cc5f786f98f45db251/tumblr_phra0coLie1we9f2ro1_640.gifv) center/100% no-repeat`,
          }}
        >
          <div className="streamPicBlackout">
            <div className="streamTitle">психологическая помощь</div>
            <div className="streamText">
              В этом разделе ты сможешь выбрать себе психолога и записаться к
              нему на консультацию, которая может быть даже бесплатной. В
              обсуждении будут представлены описания каждого психолога и указаны
              его контакты.
            </div>
            <a href="https://vk.com/topic-160404048_46675469">
              <button className="streamComeInBtn">перейти в обсуждение</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default PsyHelpPage;
