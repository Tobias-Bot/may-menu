import React from "react";

import { NavLink } from "react-router-dom";

// import * as firebase from "firebase/app";
// import "firebase/database";

import "../../styles/SuggestCards.css";

class SuggestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.sendPost = this.sendPost.bind(this);
    // this.setTitle = this.setTitle.bind(this);
    // this.setText = this.setText.bind(this);
    // this.setCover = this.setCover.bind(this);
    // this.setUrl = this.setUrl.bind(this);
  }

  render() {
    return (
      <div>
        <div
          className="suggestCardView"
          style={{
            background: `url(https://64.media.tumblr.com/4ac57db98021ffd3a4e6717dee097802/aa44282323a3c36a-66/s500x750/727356ce2f1c9fdf07998fcd735c32d83e30f05d.gifv) center/100% no-repeat`,
          }}
        >
          <div className="suggestCardBlackout">
            <div className="suggestCardTitle">Статья</div>
            <div className="suggestCardText">
              Опубликовать свою статью в Май
            </div>
            <NavLink to="/may-app">
              <button className="suggestCardBtn">перейти</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestPage;
