import React from "react";

import "../../styles/SearchPage.css";
import "../../App.css";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };

    this.inputText = this.inputText.bind(this);
    this.clearInputText = this.clearInputText.bind(this);
  }

  inputText(e) {
    this.setState({ searchText: e.target.value });
  }

  clearInputText() {
    this.setState({ searchText: "" });
  }

  render() {
    let url = `https://vk.com/wall-160404048?owners_only=1&q=${this.state.searchText}`;
    let isText = this.state.searchText.length === 0;

    return (
      <div>
        <div className="inputWrapper">
          <input
            type="text"
            className="searchInput"
            value={this.state.searchText}
            placeholder="Какой пост хотел бы найти?"
            onChange={this.inputText}
          />
          {!isText ? (
            <button className="clearInputBtn" onClick={this.clearInputText}>
              <i className="fas fa-times"></i>
            </button>
          ) : (
            ""
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <a className="linkStyle" href={url}>
            <button className="btnGoSearch" disabled={isText}>
              найти
            </button>
          </a>
        </div>
        <br />
        <br />
        <br />
        <div className="btnsTitle">Виды публикаций</div>
        <div className="row mt-4 mb-2 pl-2 pr-2">
          <div className="col">
            <a className="linkStyle" href="https://vk.com/warmay/article">
              <div className="icon">
                <i className="fas fa-file-invoice"></i>
                <span className="iconTitle">статьи</span>
              </div>
            </a>
          </div>
          <div className="col">
            <a className="linkStyle" href="https://vk.com/warmay/compilation">
              <div className="icon">
                <i className="fas fa-th"></i>
                <span className="iconTitle">подборки</span>
              </div>
            </a>
          </div>
          <div className="col">
            <a className="linkStyle" href="https://vk.com/warmay/note">
              <div className="icon">
                <i className="fas fa-sticky-note"></i>
                <span className="iconTitle">заметки</span>
              </div>
            </a>
          </div>
        </div>
        <div className="row mt-3 mb-2 pl-2 pr-2">
          <div className="col">
            <a className="linkStyle" href="https://vk.com/warmay/textpost">
              <div className="icon">
                <i className="fas fa-signature"></i>
                <span className="iconTitle">текст</span>
              </div>
            </a>
          </div>
          <div className="col">
            <a className="linkStyle" href="https://vk.com/warmay/help">
              <div className="icon">
                <i className="fas fa-heart"></i>
                <span className="iconTitle">поддержка</span>
              </div>
            </a>
          </div>
          <div className="col">
            <a className="linkStyle" href="https://vk.com/warmay/ask">
              <div className="icon">
                <i className="fas fa-question"></i>
                <span className="iconTitle">вопросы</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
