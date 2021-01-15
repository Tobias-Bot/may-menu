import React from "react";

import streams from "../data/streams";

import randArr from "../functions/randArr";

import "../../styles/StreamsPage.css";

class StreamsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
    };

    this.getStreams = this.getStreams.bind(this);
  }

  componentDidMount() {
    let arr = randArr(streams);
    this.setState({ streams: arr });
  }

  getStreams() {
    let response = [];

    response = this.state.streams.map((stream, i) => {
      return (
        <div
          className="streamView"
          key={stream.title + i}
          style={{
            background: `url(${stream.cover}) center/100% no-repeat`,
          }}
        >
          <div className="streamPicBlackout">
            <div className="streamTitle">{stream.title}</div>
            <div className="streamText" style={{ fontSize: "16px" }}>
              {stream.text}
            </div>
            <a href={stream.url} target="_blank" rel="noopener noreferrer">
              <button className="streamComeInBtn">перейти</button>
            </a>
            <div className="streamDate">
              <div>
                <i className="fas fa-calendar-week"></i> {stream.date}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return response;
  }

  render() {
    let streams = this.getStreams();

    return <div>{streams}</div>;
  }
}

export default StreamsPage;
