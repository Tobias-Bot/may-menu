import React from "react";
import qs from "querystring";

import { Route, HashRouter, Switch, NavLink } from "react-router-dom";

import "../App.css";
import logo from "../pics/logo.png";

import Main from "./main.js";
import PostsPage from "./pages/PostsPage";
// import NewsPage from "./pages/NewsPage";
import ChatsPage from "./pages/ChatsPage";
import StreamsPage from "./pages/StreamsPage";
// import MoviePage from "./pages/MoviePage";
import PsyHelpPage from "./pages/PsyHelpPage.js";
import BookmarksPage from "./BookmarksPage.js";
// import PlaylistsPage from "./pages/PlaylistsPage.js";
import AppsPage from "./pages/AppsPage";
import SearchPage from "./pages/SearchPage";
import MailingPage from "./pages/MailingPage";

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModal: "",

      headerStyles: {},
      load: false,
      scroll: false,
    };

    this.currPercent = 0;

    this.setModal = this.setModal.bind(this);
    this.getHeaderStyle = this.getHeaderStyle.bind(this);
    this.PostsLoader = this.PostsLoader.bind(this);
    this.stopLoad = this.stopLoad.bind(this);
    this.startLoad = this.startLoad.bind(this);
  }

  componentDidMount() {
    this.setState({ headerStyles: this.getHeaderStyle() });
  }

  getHeaderStyle() {
    const str = window.location.search.slice(1);
    const objParams = qs.parse(str);

    let platform = objParams.vk_platform;

    if (platform === "mobile_iphone") {
      return {
        header: {
          top: "17px",
        },
        headerLineTop: {
          height: "22px",
        },
        headerLineBot: {
          top: "67px",
        },
        headerLineTopSecond: {
          height: "67px",
          paddingTop: "28px",
        },
        body: {
          marginTop: "67px",
          paddingTop: "50px",
          height: "calc(100% - 68px)",
        },
      };
    } else {
      return {};
    }
  }

  setModal(modal) {
    this.setState({ currentModal: modal });
  }

  PostsLoader() {
    let content = document.getElementById("contentWindow");

    let H = content.scrollHeight;
    let currH = content.scrollTop;

    this.currPercent = (100 * currH) / H;

    console.log(this.currPercent);

    if (this.currPercent <= 70) {
      this.startLoad();
    }

    if (this.state.scroll) {
      if (this.currPercent >= 70) {
        this.setState({ load: true, scroll: false });
      }
    }
  }

  stopLoad() {
    this.setState({ load: false });
  }

  startLoad() {
    this.setState({ scroll: true });
  }

  render() {
    let modal = this.state.currentModal;
    let styles = this.state.headerStyles;

    let bar = (
      <div>
        <NavLink className="linkStyle" to="/">
          <div className="btnInfo">
            <i className="fas fa-home"></i>
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/search">
          <div className="btnInfo">
            <i className="fas fa-search"></i> поиск
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/may-posts">
          <div className="btnInfo">
            <i className="fas fa-icons"></i> публикации
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/may-chats">
          <div className="btnInfo">
            <i className="fas fa-comments"></i> чаты
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/help">
          <div className="btnInfo">
            <i className="fas fa-heart"></i> помощь психолога
          </div>
        </NavLink>
        {/* <NavLink className="linkStyle" to="/may-playlists">
          <div className="btnInfo">
            <i className="fas fa-music"></i> плейлисты
          </div>
        </NavLink> */}
        <NavLink className="linkStyle" to="/may-streams">
          <div className="btnInfo">
            <i className="fas fa-mug-hot"></i> трансляции
          </div>
        </NavLink>
        <NavLink className="linkStyle" to="/mailing">
          <div className="btnInfo">
            <i className="fas fa-envelope-open-text"></i> рассылки от Май
          </div>
        </NavLink>
        {/* <a className="linkStyle" href="https://vk.com/app5748831_-160404048">
          <div className="btnInfo">
            <i className="fas fa-envelope-open-text"></i> рассылки от Май
          </div>
        </a> */}
      </div>
    );

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
            <div className="headerLineTop" style={styles.headerLineTop}></div>
            <div className="headerLineBot" style={styles.headerLineBot}>
              {bar}
            </div>
            <div
              className="headerLineTopSecond"
              style={styles.headerLineTopSecond}
            >
              <span className="logoTitle">Мαú</span>
              {/* <NavLink to="/may-bookmarks">
                <div className="btnHeader">
                  <i className="fas fa-bookmark"></i>
                </div>
              </NavLink>
              <NavLink to="/may-bookmarks">
                <div className="btnHeader">
                  <i className="fas fa-bookmark"></i>
                </div>
              </NavLink> */}
            </div>
            <div className="header" style={styles.header}>
              <a className="linkStyle" href="https://vk.com/warmay">
                <img id="logo" src={logo} alt="logo" />
              </a>
            </div>

            <div
              className="body"
              style={styles.body}
              id="contentWindow"
              onScroll={this.PostsLoader}
            >
              <div className="wrapper">
                <Switch>
                  <Route exact path="/">
                    <Main onModal={this.setModal} />
                  </Route>
                  <Route exact path="/may-posts">
                    <PostsPage
                      load={this.state.load}
                      stopLoad={this.stopLoad}
                      startLoad={this.startLoad}
                    />
                  </Route>
                  <Route exact path="/may-chats">
                    <ChatsPage />
                  </Route>
                  <Route exact path="/help">
                    <PsyHelpPage />
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
          </HashRouter>
        </div>
      </div>
    );
  }
}

export default MainApp;
