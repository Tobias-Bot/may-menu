import React from "react";

import chats from "../data/chats";

import Chat from "../Chat";

import "../../styles/ChatsPage.css"

class ChatsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    };

    this.pageId = "-200183517";
    this.postsCount = 50;
    this.offset = 0;

    this.getChats = this.getChats.bind(this);
  }

  getChats() {
    let response = [];

    response = chats.map((chat, i) => {
      return (
        <Chat content={chat} key={chat.title + i} />
      );
    });

    return response;
  }

  render() {
    let chats = this.getChats();

    return (
      <div>
        {chats}
      </div>
    );
  }
}

export default ChatsPage;
