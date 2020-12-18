import React from "react";
import { NavLink } from "react-router-dom";

import "../../styles/FrameAppPage.css";

class FrameAppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      currentApp: ""
    };

    this.showApp = this.showApp.bind(this);
  }

  componentDidMount() {
    let url = JSON.parse(localStorage.getItem("frame-app")).url;

    console.log(url);
    
    url && this.setState({ currentApp: url });
  }

  showApp() {
    this.setState({ visible: true });
  }

  render() {
    let isShow = this.state.visible;
    let app = this.state.currentApp;

    return (
      <div>
        <iframe
          src={app}
          title="app-frame"
          loading="lazy"
          allow="fullscreen"
          scrolling="no"
          seamless
          hidden={!isShow}
          onLoad={this.showApp}
        ></iframe>
        <div className="Loading" hidden={isShow}>
          <div class="spinner-border" role="status"></div>{" "}
          <span className="LoadingText">секундочку...</span>
        </div>
        <NavLink to="/">
          <div className="FrameFooter">
            {">"} вернуться {"<"}
          </div>
        </NavLink>
      </div>
    );
  }
}

export default FrameAppPage;
