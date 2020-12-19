import React from "react";

import Image from "./Image";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.content.title,
      postColor: props.content.postColor,
      id: props.content.id,
      source: props.content.source,
      photos: props.content.photos,
      views: props.content.views,
      likes: props.content.likes,
      comms: props.content.comms,
      reps: props.content.reps,
    };

    this.maxTextLen = 150;

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
    let data = this.props.content;

    const mark = this.isImportant() ? (
      <button
        className="postReadBtn"
        style={{ borderColor: data.postColor }}
        onClick={this.deletePost}
      >
        <i className="fas fa-bookmark"></i>
      </button>
    ) : (
      <button
        className="postReadBtn"
        style={{ borderColor: data.postColor }}
        onClick={this.savePost}
      >
        <i className="far fa-bookmark"></i>
      </button>
    );

    let text =
      data.title.length > this.maxTextLen
        ? data.title.substring(0, this.maxTextLen) + "..."
        : data.title;

    return (
      <div>
        <div className="postView" style={{ backgroundColor: data.postColor }}>
          <div className="postHeader">
            {mark}
            <a
              style={{ textDecoration: "none", color: "white" }}
              href={data.source}
            >
              <button
                className="postReadBtn"
                style={{ borderColor: data.postColor }}
              >
                читать
              </button>
            </a>
          </div>
          <div className="postTitle">{text}</div>
          {data.photos && data.photos.length ? (
            <Image
              photo={data.photos[0]}
              source={data.source}
              alt="article's cover"
            />
          ) : (
            ""
          )}
          <div className="postFooter"></div>
        </div>
      </div>
    );
  }
}

export default Post;
