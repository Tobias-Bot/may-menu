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

      lastOpenedApp: {},
    };

    this.hello = "";

    this.getModalData = this.getModalData.bind(this);
    this.tick = this.tick.bind(this);
    this.copyAppUrl = this.copyAppUrl.bind(this);
  }

  copyAppUrl() {
    let str = "vk.link/warmay";
    let area = document.createElement("textarea");

    document.body.appendChild(area);
    area.value = str;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);

    this.setState({
      inviteTextBtn: "-ˋссылка скопированаˊ-",
      inviteText: "спасибо!",
    });
  }

  getModalData(modal) {
    this.props.onModal(info[modal]);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);

    let index = Math.round(Math.random() * (hellos.length - 1));
    this.hello = hellos[index];

    /* vk-brige */
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
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

    let lastApp = this.state.lastOpenedApp;

    let bar = (
      <div>
        <NavLink className="linkStyle" to="/">
          <div className="btnInfo">
            <i className="fas fa-home"></i>
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
        <NavLink className="linkStyle" to="/">
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
        <div className="headerLineBot">{bar}</div>
        <img src={src} alt="cover" className="MainPageCover" />
        <div className="DateBlock">
          <div className="Timer">{time}</div>
          <div className="Day">{day}</div>
        </div>

        {/* {lastApp ? (
          <NavLink to="/may-app">
            <div className="btnInfoRe">
              <i className="fas fa-th-large"></i> открыть{" "}
              {"«" + lastApp.name + "»"}
            </div>
          </NavLink>
        ) : (
          ""
        )} */}
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
        <div className="row mt-3 mb-2 pl-2 pr-2">
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
        <div
          className="streamView"
          style={{
            background: `url(https://64.media.tumblr.com/d29f37a271afe4a1319d93c6a6e6d73d/tumblr_pq1du6Av5T1we9f2ro1_r2_640.gifv) center/110% no-repeat`,
          }}
        >
          <div className="streamPicBlackout">
            <div className="streamTitle">пригласительная ссылка</div>
            <div className="streamText">{this.state.inviteText}</div>
            <button
              className="streamComeInBtn"
              style={{ borderColor: "#FFAA9D", color: "#FFAA9D" }}
              onClick={this.copyAppUrl}
            >
              {this.state.inviteTextBtn}
            </button>
          </div>
        </div>
        <br />
        <div className="copyrightText">сделано в Мае с любовью</div>
      </div>
    );
  }
}

export default Main;
