import React from "react";

import playlists from "../data/playlists";

import randArr from "../functions/randArr";

import "../../styles/PlaylistsPage.css"

class PlaylistsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],

      rand: false,
    };

    this.getPlaylists = this.getPlaylists.bind(this);
    this.getRandomPlaylist = this.getRandomPlaylist.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  componentDidMount() {
    let arr = randArr(playlists);
    this.setState({ streams: arr });
  }

  getPlaylists() {
    let response = [];

    response = playlists.map((playlist, i) => {
      return (
        <div
          className="card mt-4 mb-4 playlist"
          style={{ backgroundColor: playlist.color }}
          key={playlist.title + i}
        >
          {playlist.cover ? (
            <img
              src={playlist.cover}
              className="card-img-top"
              style={{ borderRadius: "10px 10px 0 0", padding: "1px" }}
              alt="playlist-cover"
            />
          ) : (
            ""
          )}
          <a href={playlist.url}>
            <button
              className="btnPlaylist"
              style={{ color: playlist.color, borderColor: playlist.color }}
            >
              слушать
            </button>
          </a>
          <div className="card-body">
            <h5 className="card-title">{playlist.title}</h5>
            <p className="card-text">{playlist.text}</p>
          </div>
        </div>
      );
    });

    return response;
  }

  getRandom(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);

    return Math.round(rand);
  }

  getRandomPlaylist() {
    let response = <div></div>;
    let i = this.getRandom(0, playlists.length - 1);
    let playlist = playlists[i];

    response = (
      <div className="card mt-1 mb-4 playlist">
        {playlist.cover ? (
          <img
            src={playlist.cover}
            className="card-img-top"
            alt="playlist-cover"
          />
        ) : (
          ""
        )}
        <a href={playlist.url}>
          <button className="btnPlaylist">слушать</button>
        </a>
        <div className="card-body">
          <h5 className="card-title">{playlist.title}</h5>
          <p className="card-text">{playlist.text}</p>
        </div>
      </div>
    );

    //response.push(<div>{playlists[i]}</div>);

    return response;
  }

  setMode() {
    let prev = this.state.rand;
    this.setState({ rand: !prev });
  }

  render() {
    let playlists = !this.state.rand
      ? this.getPlaylists()
      : this.getRandomPlaylist();

    // let btn = !this.state.rand ? (
    //   <div>
    //     <i className="fas fa-random"></i> случайный плейлист
    //   </div>
    // ) : (
    //   <div>
    //     <i className="fas fa-stream"></i> показать все
    //   </div>
    // );

    return (
      <div>
        <div className="pageBar">
          {/* <div className="btnInfoRe" onClick={this.setMode}>
            {btn}
          </div> */}
        </div>
        {playlists}
      </div>
    );
  }
}

export default PlaylistsPage;
