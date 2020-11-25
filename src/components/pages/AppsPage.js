import React from "react";

class AppsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row mt-4 mb-2 pl-2 pr-2">
          <div className="col">
            <a
              className="linkStyle"
              href="https://tobias-bot.github.io/todo-app"
            >
              <div className="icon">
                <i className="fas fa-sticky-note"></i>
                <span className="iconTitle">заметки</span>
              </div>
            </a>
          </div>
          <div className="col">
            <a
              className="linkStyle"
              href="https://tobias-bot.github.io/Sleeping_bookapp"
            >
              <div className="icon">
                <i className="fas fa-clock"></i>
                <span className="iconTitle">таймер сна</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default AppsPage;
