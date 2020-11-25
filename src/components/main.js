import React from "react";

import info from "./data/modalInfo";
import hellos from "./data/Hellos";

import "../styles/MainWidget.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info,
      date: new Date(),
    };

    this.hello = "";

    this.getModalData = this.getModalData.bind(this);
    this.tick = this.tick.bind(this);
  }

  getModalData(modal) {
    this.props.onModal(info[modal]);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);

    let index = Math.round(Math.random() * (hellos.length - 1));
    this.hello = hellos[index];
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
      src = "https://64.media.tumblr.com/f0c4e58d302d28e09e07c95020e4405e/a0478a781f60be2f-5f/s540x810/352a38c08ec5cc847945c79cbbddfbec98a5eb11.gifv";
    }

    if (moment >= 10 && moment < 16) {
      src = "https://64.media.tumblr.com/b876ea93a22c86bc5b78c7b78eff97f5/15397bd7e8d2a434-37/s540x810/40efb0e5aafbcbfe08fbdec5278ac720a9d2aba2.gifv";
    }

    if (moment >= 16 && moment < 22) {
      src = "https://64.media.tumblr.com/fb6257322a3e73e7aa7247ba2b678163/tumblr_pp3mmshJhz1xvjko7o1_1280.gifv";
    }

    if (moment >= 22 || moment < 6) {
      src = "https://64.media.tumblr.com/e393e16e2c542a4f3949aa880980fcc5/9741c9e166cefc10-b1/s540x810/983ca0fc2a6aa7c48679cde31a14dc810272f16e.gifv";
    }

    console.log(src);

    return (
      <div>
        <img src={src} alt="cover" className="MainPageCover" />
        <div className="DateBlock">
          <div className="Timer">{time}</div>
          <div className="Day">{day}</div>
        </div>
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
                <span className="iconTitle">написать в лс</span>
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
                <span className="iconTitle">оставить отзыв</span>
              </div>
            </a>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Main;
