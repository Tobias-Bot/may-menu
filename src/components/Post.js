import React from "react";

import Image from "./Image";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.content.id,
      title: this.props.content.title,
      img: this.props.content.img,
      url: this.props.content.url,
    };

    this.savePost = this.savePost.bind(this);
    this.isImportant = this.isImportant.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  savePost() {
    let post = this.state;

    this.props.onPostSave(post);
  }

  deletePost() {
    let post_id = this.props.content.id;

    this.props.onPostDelete(post_id);
  }

  isImportant() {
    let posts = this.props.savedPosts;
    let postId = this.state.id;

    if (posts)
      for (let i = 0; i < posts.length; i++) {
        if (postId === posts[i].id) return 1;
      }

    return 0;
  }

  render() {
    const mark = this.isImportant() ? (
      <button className="postReadBtn" onClick={this.deletePost}>
        <i className="fas fa-bookmark"></i>
      </button>
    ) : (
      <button className="postReadBtn" onClick={this.savePost}>
        <i className="far fa-bookmark"></i>
      </button>
    );

    let data = this.props.content;

    return (
      <div>
        <div className="postView" style={{ backgroundColor: data.color }}>
          <div className="postHeader">
            {mark}
            <button className="postReadBtn">
              <a
                style={{ textDecoration: "none", color: "white" }}
                href={data.url}
              >
                читать
              </a>
            </button>
          </div>
          <div className="postTitle" style={{ color: data.textColor }}>
            {data.title}
          </div>
          <Image url={data.img} alt="article's cover" />
          <div className="postFooter"></div>
        </div>
      </div>
    );
  }
}

export default Post;
