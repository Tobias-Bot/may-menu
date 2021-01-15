import React from "react";

import "../../styles/StreamsPage.css";

class MailingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div
          className="streamView"
          style={{
            background: `url(https://64.media.tumblr.com/3eddb35ed272033d008109238c75bc19/tumblr_pej9lsNXhD1we9f2ro1_1280.gifv) center/100% no-repeat`,
          }}
        >
          <div className="streamPicBlackout">
            <div className="streamTitle">рассылки от Май</div>
            <div className="streamText" style={{ fontSize: "16px" }}>
              Рассылки разделены на несколько тематик. Выбирай то, что подходит
              именно тебе. Здесь нет никакого спама. Я буду присылать тебе в
              личные сообщения только все самое интересное.
            </div>
            <a href="https://vk.com/app5748831_-160404048" target="_blank" rel="noopener noreferrer">
              <button className="streamComeInBtn">выбрать рассылку</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MailingPage;
