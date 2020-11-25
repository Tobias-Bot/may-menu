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
            <button className="chatComeInBtn">
              <a
                style={{ textDecoration: "none", color: "white" }}
                href={chat.url}
              >
                войти
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
