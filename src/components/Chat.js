import React from "react";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let chat = this.props.content;

    return (
      <div>
        <div
          className="chatView"
          key={chat.title}
          style={{
            background: `url(${chat.background}) center/100% no-repeat`,
          }}
        >
          <div className="picBlackout">
            <div className="chatTitle">{chat.title}</div>
            <div className="chatText">{chat.text}</div>
            <a
              className="linkStyle"
              href={chat.url}
            >
              <button className="chatComeInBtn" style={{ borderColor: chat.color }}>
                <span style={{ color: chat.color }}>войти</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
