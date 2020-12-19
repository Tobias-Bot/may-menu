import React from "react";

import { Route, HashRouter, Switch, NavLink } from "react-router-dom";

import "../App.css";
import logo from "../pics/logo.png";

import Main from "./main.js";
import PostsPage from "./pages/PostsPage";
// import NewsPage from "./pages/NewsPage";
import ChatsPage from "./pages/ChatsPage";
import StreamsPage from "./pages/StreamsPage";
// import MoviePage from "./pages/MoviePage";
// import SuggestChatPage from "./pages/suggestPages/SuggestChatPage.js";
import BookmarksPage from "./BookmarksPage.js";
import PlaylistsPage from "./pages/PlaylistsPage.js";
import AppsPage from "./pages/AppsPage";
import SearchPage from "./pages/SearchPage";
import MailingPage from "./pages/MailingPage";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: "",
    };

    this.setModal = this.setModal.bind(this);
    this.setFrameUrl = this.setFrameUrl.bind(this);
  }

  setFrameUrl() {
    let app = {
      name: "написать пост",
      url: "https://tobias-bot.github.io/may_articles",
    };

    let str = JSON.stringify(app);

    localStorage.setItem("frame-app", str);
  }

  setModal(modal) {
    this.setState({ currentModal: modal });
  }

  render() {
    let modal = this.state.currentModal;

    return (
      <div>
        <div
          className="modal fade"
          id="textModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal.title}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div
                className="modal-body"
                dangerouslySetInnerHTML={{ __html: modal.text }}
              ></div>
            </div>
          </div>
        </div>

        <div>
          <HashRouter>
            <div className="headerLineTop"></div>
            <div className="headerLineTopSecond">
              <NavLink to="/may-bookmarks">
                <div className="btnHeader">
                  <i className="fas fa-bookmark"></i>
                </div>
              </NavLink>
              <NavLink to="/may-bookmarks">
                <div className="btnHeader">
                  <i className="fas fa-bookmark"></i>
                </div>
              </NavLink>
            </div>
            <div className="header">
              <a className="linkStyle" href="https://vk.com/warmay">
                <img id="logo" src={logo} alt="logo" />
              </a>
            </div>

            <div
              className="body"
              id="contentWindow"
              onScroll={this.PostsLoader}
            >
              <div className="wrapper">
                <Switch>
                  <Route exact path="/">
                    <Main onModal={this.setModal} />
                  </Route>
                  <Route exact path="/may-posts">
                    <PostsPage />
                  </Route>
                  <Route exact path="/may-chats">
                    <ChatsPage />
                  </Route>
                  {/* <Route exact path="/may-playlists">
                    <PlaylistsPage />
                  </Route> */}
                  <Route exact path="/may-streams">
                    <StreamsPage />
                  </Route>
                  <Route exact path="/may-apps">
                    <AppsPage />
                  </Route>
                  <Route exact path="/may-bookmarks">
                    <BookmarksPage />
                  </Route>
                  <Route exact path="/search">
                    <SearchPage />
                  </Route>
                  <Route exact path="/mailing">
                    <MailingPage />
                  </Route>
                </Switch>
              </div>

              <div className="collapse navbar-collapse postsBar" id="postsBar">
                <NavLink to="/may-app" className="linkStyle">
                  <div className="suggestCardView">
                    статья
                    <div className="cardIcon">
                      <i className="fas fa-file-invoice"></i>
                    </div>
                  </div>
                </NavLink>
                {/* <div className="suggestCardView">
                  вопрос
                  <div className="cardIcon">
                    <i className="fas fa-question"></i>
                  </div>
                </div>
                <div className="suggestCardView">
                  поддержка
                  <div className="cardIcon">
                    <i className="fas fa-heart"></i>
                  </div>
                </div>
                <div className="suggestCardView">
                  найти друга
                  <div className="cardIcon">
                    <i className="fas fa-user-friends"></i>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="footer">
              <NavLink className="linkStyle" to="/search">
                <div className="btnFooter">
                  <i className="fas fa-search"></i>
                </div>
              </NavLink>
              <NavLink className="linkStyle" to="/">
                <div className="btnFooter">
                  <i className="fas fa-home"></i>
                </div>
              </NavLink>
              <div
                className="btnFooterMain"
                data-toggle="collapse"
                data-target="#postsBar"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.setFrameUrl}
              >
                <i className="fas fa-pencil-alt"></i>
              </div>
              <NavLink className="linkStyle" to="/may-apps">
                <div className="btnFooter">
                  <i className="fas fa-th-large"></i>
                </div>
              </NavLink>
              <NavLink className="linkStyle" to="/">
                <div className="btnFooter">
                  <i className="fas fa-info-circle"></i>
                </div>
              </NavLink>
            </div>
          </HashRouter>
        </div>
      </div>
    );
  }
}

export default MainApp;
