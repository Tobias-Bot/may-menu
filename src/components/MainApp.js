import React from "react";
import bridge from "@vkontakte/vk-bridge";
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

      isFavorite: false,
    };

    this.currPercent = 0;

    this.setModal = this.setModal.bind(this);
    this.getHeaderStyle = this.getHeaderStyle.bind(this);
    this.PostsLoader = this.PostsLoader.bind(this);
    this.stopLoad = this.stopLoad.bind(this);
    this.startLoad = this.startLoad.bind(this);
    this.getMobilePlatform = this.getMobilePlatform.bind(this);
  }

  componentDidMount() {
    this.setState({ headerStyles: this.getHeaderStyle() });

    setTimeout(() => {
      bridge.send("VKWebAppJoinGroup", {"group_id": 160404048});
    }, 10000);
  }

  addToHomeScreen() {
    bridge.send("VKWebAppAddToHomeScreenInfo").then((res) => {
      if (res.data.is_added_to_home_screen) {
        this.setState({ isFavorite: true });
      }
    });
  }

  getMobilePlatform() {
    const str = window.location.search.slice(1);
    const objParams = qs.parse(str);

    return objParams.vk_platform;
  }

  getHeaderStyle() {
    if (this.getMobilePlatform() === "mobile_iphone") {
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
          height: "calc(100% - 122px)",
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
    let platform = this.getMobilePlatform();

    let bar = (
      <div>
        {/* <NavLink className="linkStyle" to="/">
          <div className="btnInfo">
            <i className="fas fa-home"></i>
          </div>
        </NavLink> */}
        {/* <NavLink className="linkStyle" to="/search">
          <div className="btnInfo">
            <i className="fas fa-search"></i> поиск
          </div>
        </NavLink> */}
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
        <div
          className="btnInfo"
          onClick={() => bridge.send("VKWebAppOpenApp", { app_id: 7738603 })}
        >
          <i className="fas fa-eye"></i> ищу тебя
        </div>
        <div
          className="btnInfo"
          onClick={() => bridge.send("VKWebAppOpenApp", { app_id: 7713167 })}
        >
          <i className="fas fa-brain"></i> тесты
        </div>
        <NavLink className="linkStyle" to="/help">
          <div className="btnInfo">
            <i className="fas fa-heart"></i> помощь психолога
          </div>
        </NavLink>
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
              {/* <div className="btnHeader">
                <i className="fab fa-instagram-square"></i>
              </div> */}
            </div>
            <div className="header" style={styles.header}>
              <a
                className="linkStyle"
                href="https://vk.com/warmay"
                target="_blank"
                rel="noopener noreferrer"
              >
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
                    <SearchPage platform={platform} />
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
              <NavLink className="linkStyle" to="/may-bookmarks">
                <div className="btnFooter">
                  <i className="fas fa-bookmark"></i>
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
