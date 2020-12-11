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
import SuggestPage from "./pages/SuggestPage.js";
import AppsPage from "./pages/AppsPage";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: "",
    };

    this.setModal = this.setModal.bind(this);
  }

  setModal(modal) {
    this.setState({ currentModal: modal });
  }

  render() {
    let bar = (
      <div>
        <NavLink className="linkStyle" to="/may-posts">
          <div className="btnInfo">
            <i className="fas fa-signature"></i> статьи
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/may-chats">
          <div className="btnInfo">
            <i className="fas fa-comment"></i> чаты
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/may-playlists">
          <div className="btnInfo">
            <i className="fas fa-music"></i> плейлисты
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/may-streams">
          <div className="btnInfo">
            <i className="fas fa-mug-hot"></i> трансляции
          </div>
        </NavLink>
        <a className="linkStyle" href="https://vk.com/app5748831_-160404048">
          <div className="btnInfo">
            <i className="fas fa-envelope-open-text"></i> рассылки
          </div>
        </a>
      </div>
    );

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
          <img
            className="background"
            src="https://images.wallpaperscraft.ru/image/oblaka_poristyj_nebo_125791_3840x2400.jpg"
            alt="background"
          />
          <div className="wrapper">
            <HashRouter>
              <div className="headerLineTop"></div>
              <div className="headerLineBot">{bar}</div>
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
                  <Route exact path="/may-playlists">
                    <PlaylistsPage />
                  </Route>
                  <Route exact path="/may-streams">
                    <StreamsPage />
                  </Route>
                  <Route exact path="/may-apps">
                    <AppsPage />
                  </Route>
                  <Route exact path="/may-bookmarks">
                    <BookmarksPage />
                  </Route>
                  <Route exact path="/suggest">
                    <SuggestPage />
                  </Route>
                </Switch>
              </div>

              <div className="footer">
                <NavLink className="linkStyle" to="/">
                  <div className="btnFooter">
                    <i className="fas fa-home"></i>
                    <div className="btnFooterTitle">домой</div>
                  </div>
                </NavLink>
                <NavLink className="linkStyle" to="/suggest">
                  <div className="btnFooterMain">
                    <i className="fas fa-pencil-alt"></i>
                    <div className="btnFooterMainTitle">пост</div>
                  </div>
                </NavLink>
                <NavLink className="linkStyle" to="/may-apps">
                  <div className="btnFooter">
                    <i className="fas fa-th-large"></i>
                    <div className="btnFooterTitle">приложения</div>
                  </div>
                </NavLink>
              </div>
            </HashRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default MainApp;
