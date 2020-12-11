import React from "react";

import "../../styles/FrameAppPage.css";

class FrameAppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <iframe
          src="https://tobias-bot.github.io/may_articles"
          title="app-frame"
          loading = "lazy"
          allow="fullscreen"
          scrolling="no"
          seamless
        ></iframe>
      </div>
    );
  }
}

export default FrameAppPage;
