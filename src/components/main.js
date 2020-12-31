import React from "react";
import bridge from "@vkontakte/vk-bridge";

import info from "./data/modalInfo";
import hellos from "./data/Hellos";

import "../styles/MainWidget.css";
import "../styles/StreamsPage.css";
import "../App.css";
import { NavLink } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info,
      date: new Date(),

      inviteText:
        "Скопируй ссылку на приложение и отправь друзьям. Поддержи проект.",
      inviteTextBtn: "скопировать ссылку",

      username: "",
    };

    this.hello = "";

    this.getModalData = this.getModalData.bind(this);
    this.tick = this.tick.bind(this);
    this.shareApp = this.shareApp.bind(this);
    this.shareToTheWall = this.shareToTheWall.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  getModalData(modal) {
    this.props.onModal(info[modal]);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);

    let index = Math.round(Math.random() * (hellos.length - 1));
    this.hello = hellos[index];

    this.getUsername();
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
      message: `Май это психология, саморазвитие,
      поддержка и забота о себе. Это одна большая
      семья, в которой мы все учимся разбираться в
      себе, своих эмоциях и чувствах. Присоединяйтесь
      : https://vk.com/warmay`,
    });
  }

  render() {
    let time = this.state.date
      .toLocaleTimeString("ru", { hour12: false })
      .substring(0, 5);

    let date = new Date();
    let day = date.toLocaleString("ru", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });

    let src = "";
    let moment = parseInt(time.substring(0, 2));

    if (moment >= 6 && moment < 10) {
      src =
        "https://64.media.tumblr.com/f0c4e58d302d28e09e07c95020e4405e/a0478a781f60be2f-5f/s540x810/352a38c08ec5cc847945c79cbbddfbec98a5eb11.gifv";
    }

    if (moment >= 10 && moment < 16) {
      src =
        "https://64.media.tumblr.com/b876ea93a22c86bc5b78c7b78eff97f5/15397bd7e8d2a434-37/s540x810/40efb0e5aafbcbfe08fbdec5278ac720a9d2aba2.gifv";
    }

    if (moment >= 16 && moment < 22) {
      src =
        "https://64.media.tumblr.com/fb6257322a3e73e7aa7247ba2b678163/tumblr_pp3mmshJhz1xvjko7o1_1280.gifv";
    }

    if (moment >= 22 || moment < 6) {
      src =
        "https://64.media.tumblr.com/e393e16e2c542a4f3949aa880980fcc5/9741c9e166cefc10-b1/s540x810/983ca0fc2a6aa7c48679cde31a14dc810272f16e.gifv";
    }

    return (
      <div>
        <div
          className="DateBlock"
          style={{
            background: `url(${src}) center/100% no-repeat`,
          }}
        >
          <div className="picBlackout">
            <div className="Day">{this.state.username}, с Новым годом!</div>
          </div>
        </div>

        <div className="BtnsBlock">
          {/* <NavLink to="/may-bookmarks">
            <button className="MainBtn">
              <i className="fas fa-bookmark"></i> закладки
            </button>
          </NavLink> */}
          <a href="https://yadi.sk/d/5Shg_PsDtaRHJQ" target="_blank">
            <button className="MainBtn" style={{ borderColor: "#ff9dde" }}>
              <i className="fas fa-gift"></i> открыть подарок
            </button>
          </a>
          <button
            className="MainBtn"
            onClick={() => {
              bridge.send("VKWebAppShowWallPostBox", {
                message:
                  "Твои подарочки уже ждут тебя: https://vk.com/app7646928_-160404048",
                attachments: "photo-160404048_457257317",
              });
            }}
          >
            <i className="fas fa-user-friends"></i> поделиться с друзьями
          </button>
          <button className="MainBtn" onClick={this.shareApp}>
            <i className="fas fa-paper-plane"></i> отправить в сообщении
          </button>
        </div>

        <div className="btnsTitle">Сообщество</div>
        <div className="row mt-4 mb-2 pl-2 pr-2">
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
        <div className="row mt-3 mb-4 pl-2 pr-2">
          <div className="col">
            <a href="https://vk.com/im?sel=-160404048" className="linkStyle">
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
            >
              <div className="icon">
                <i className="fas fa-heart"></i>
                <span className="iconTitle">лайк</span>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="https://vk.com/warmay" className="linkStyle">
              <div className="icon">
                <i className="fab fa-vk"></i>
                <span className="iconTitle">группа</span>
              </div>
            </a>
          </div>
        </div>
        <div className="btnsTitle">Рассказать о Май</div>
        <div className="row mt-4 mb-2 pl-2 pr-2">
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
        <br />
        <div className="copyrightText">сделано в Май с любовью</div>
      </div>
    );
  }
}

export default Main;
