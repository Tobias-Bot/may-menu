import React from "react";

import { Route, HashRouter, Switch } from "react-router-dom";

import FrameAppPage from "./components/pages/FrameAppPage.js";
import MainApp from "./components/MainApp.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setModal = this.setModal.bind(this);
  }

  setModal(modal) {
    this.setState({ currentModal: modal });
  }

  render() {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route exact path="/may-app">
              <FrameAppPage />
            </Route>
            <Route path="/">
              <MainApp />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
