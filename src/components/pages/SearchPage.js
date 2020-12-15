import React from "react";

import "../../styles/SearchPage.css";

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
            placeholder="Что хотел бы найти?"
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
          <a href={url}>
            <button className="btnGoSearch" disabled={isText}>
              найти
            </button>
          </a>
        </div>
      </div>
    );
  }
}

export default SearchPage;
