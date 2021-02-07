import React from "react";
import bridge from "@vkontakte/vk-bridge";

import info from "./data/modalInfo";
import hellos from "./data/Hellos";

import "../styles/MainWidget.css";
import "../styles/StreamsPage.css";
import "../App.css";
//import { NavLink } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info,
      date: new Date(),

      username: "",

      note: "",
    };

    this.hello = "";

    this.getModalData = this.getModalData.bind(this);
    this.tick = this.tick.bind(this);
    this.shareApp = this.shareApp.bind(this);
    this.shareToTheWall = this.shareToTheWall.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.getNote = this.getNote.bind(this);
  }

  getModalData(modal) {
    this.props.onModal(info[modal]);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);

    let index = Math.round(Math.random() * (hellos.length - 1));
    this.hello = hellos[index];

    this.getUsername();

    this.getNote();
  }

  getUsername() {
    bridge.send("VKWebAppGetUserInfo").then((response) => {
      this.setState({ username: response.first_name });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  shareApp() {
    bridge.send("VKWebAppShare");
  }

  shareToTheWall() {
    bridge.send("VKWebAppShowWallPostBox", {
      message: `Май это одна большая семья, в которой мы все учимся понимать себя и других 👾 Присоединяйтесь
      : https://vk.com/warmay`,
    });
  }

  saveNote(e) {
    localStorage.setItem("may-note", e.target.value);
  }

  getNote() {
    let note = localStorage.getItem("may-note");

    this.setState({ note });
  }

  render() {
    let time = this.state.date
      .toLocaleTimeString("ru", { hour12: false })
      .substring(0, 5);

    let text = "привет";

    // let date = new Date();
    // let day = date.toLocaleString("ru", {
    //   month: "long",
    //   day: "numeric",
    //   weekday: "long",
    // });

    let src = "";
    let moment = parseInt(time.substring(0, 2));

    if (moment >= 6 && moment < 10) {
      src =
        "https://64.media.tumblr.com/f0c4e58d302d28e09e07c95020e4405e/a0478a781f60be2f-5f/s540x810/352a38c08ec5cc847945c79cbbddfbec98a5eb11.gifv";

      text = "утречка!";
    }

    if (moment >= 10 && moment < 16) {
      src =
        "https://64.media.tumblr.com/b876ea93a22c86bc5b78c7b78eff97f5/15397bd7e8d2a434-37/s540x810/40efb0e5aafbcbfe08fbdec5278ac720a9d2aba2.gifv";

      text = "привет!";
    }

    if (moment >= 16 && moment < 22) {
      src =
        "https://64.media.tumblr.com/fb6257322a3e73e7aa7247ba2b678163/tumblr_pp3mmshJhz1xvjko7o1_1280.gifv";

      text = "доброго вечера!";
    }

    if (moment >= 22 || moment < 6) {
      src =
        "https://64.media.tumblr.com/e393e16e2c542a4f3949aa880980fcc5/9741c9e166cefc10-b1/s540x810/983ca0fc2a6aa7c48679cde31a14dc810272f16e.gifv";

      text = "сладких снов!";
    }

    return (
      <div>
        <div className="mainNote">
          <div
            className="DateBlock"
            style={{
              background: `url(${src}) center/100% no-repeat`,
            }}
          >
            <div className="picBlackout">
              <div className="Day">
                {this.state.username}, {text}
              </div>
            </div>
          </div>

          <textarea
            className="noteText"
            placeholder="Добавить записку"
            defaultValue={this.state.note}
            onChange={this.saveNote}
          ></textarea>
        </div>

        <div className="btnsTitle">сообщество</div>
        <div className="btnsBackground">
          <div className="row">
            <div className="col">
              <div
                className="icon"
                data-toggle="modal"
                data-target="#textModal"
                onClick={(e) => this.getModalData("aboutModal")}
              >
                <i className="fas fa-info-circle"></i>
                <span className="iconTitle">о Май</span>
              </div>
            </div>
            <div className="col">
              <div
                className="icon"
                data-toggle="modal"
                data-target="#textModal"
                onClick={(e) => this.getModalData("rulesModal")}
              >
                <i className="fas fa-hand-sparkles"></i>
                <span className="iconTitle">правила</span>
              </div>
            </div>
            <div className="col">
              <div
                className="icon"
                data-toggle="modal"
                data-target="#textModal"
                onClick={(e) => this.getModalData("tagsModal")}
              >
                <i className="fas fa-hashtag"></i>
                <span className="iconTitle">хэштеги</span>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col">
              <a
                href="https://vk.com/im?sel=-160404048"
                target="_blank"
                rel="noopener noreferrer"
                className="linkStyle"
              >
                <div className="icon">
                  <i className="fas fa-feather-alt"></i>
                  <span className="iconTitle">написать</span>
                </div>
              </a>
            </div>
            <div className="col">
              <a
                className="linkStyle"
                href="https://vk.com/topic-160404048_36674451"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="icon">
                  <i className="fas fa-heart"></i>
                  <span className="iconTitle">лайк</span>
                </div>
              </a>
            </div>
            <div className="col">
              <a
                href="https://vk.com/warmay"
                target="_blank"
                rel="noopener noreferrer"
                className="linkStyle"
              >
                <div className="icon">
                  <i className="fas fa-door-open"></i>
                  <span className="iconTitle">группа</span>
                </div>
              </a>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <a
                href="https://instagram.com/warmay_inst"
                target="_blank"
                rel="noopener noreferrer"
                className="linkStyle"
              >
                <div className="icon">
                  <i className="fab fa-instagram-square"></i>
                  <span className="iconTitle">Май в инстаграме</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="btnsTitle">приложения</div>
        <div className="btnsBackground">
          <div className="row mb-4">
            <div className="col">
              <div
                className="icon"
                onClick={() =>
                  bridge.send("VKWebAppOpenApp", { app_id: 7738603 })
                }
              >
                <i className="fas fa-eye"></i>
                <span className="iconTitle">май-френдс</span>
              </div>
            </div>
            <div className="col">
              <div
                className="icon"
                onClick={() =>
                  bridge.send("VKWebAppOpenApp", { app_id: 7713167 })
                }
              >
                <i className="fas fa-brain"></i>
                <span className="iconTitle">май-тесты</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btnsTitle">добавить Май</div>
        <div className="btnsBackground">
          <div className="row mb-4">
            <div className="col">
              <div
                className="icon"
                onClick={() => bridge.send("VKWebAppAddToHomeScreen")}
              >
                <i className="fas fa-mobile-alt"></i>
                <span className="iconTitle">на раб. стол</span>
              </div>
            </div>
            <div className="col">
              <div
                className="icon"
                onClick={() => bridge.send("VKWebAppAddToFavorites")}
              >
                <i className="fas fa-star"></i>
                <span className="iconTitle">в избранное</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btnsTitle">поделиться</div>
        <div className="btnsBackground">
          <div className="row mb-4">
            <div className="col">
              <div className="icon" onClick={this.shareApp}>
                <i className="fas fa-user-friends"></i>
                <span className="iconTitle">отправить друзьям</span>
              </div>
            </div>
            <div className="col">
              <div className="icon" onClick={this.shareToTheWall}>
                <i className="fas fa-share-square"></i>
                <span className="iconTitle">пост на стену</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btnsTitle">денежка на развитие проекта</div>
        <div className="btnsBackground">
          <div className="row mb-4">
            <div className="col">
              <a
                href="https://vk.com/app6471849_-160404048"
                target="_blank"
                rel="noopener noreferrer"
                className="linkStyle"
              >
                <div className="icon">
                  <i className="fas fa-pizza-slice"></i>
                  <span className="iconTitle">поддержать Май</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <br />
        <div className="copyrightText">сделано в Май с любовью</div>
      </div>
    );
  }
}

export default Main;
