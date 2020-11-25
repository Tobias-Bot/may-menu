import React from "react";

import Image from './Image'

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.content.id,
      title: this.props.content.title,
      source: this.props.content.source,
      photos: this.props.content.photos,
      textColor: this.props.content.textColor,
      postColor: this.props.content.postColor,
      views: this.props.content.views,
      comms: this.props.content.comms,
      reps: this.props.content.reps,
      likes: this.props.content.likes,
      video: this.props.content.video,
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

  getPostPhotos() {
    let response = [];

    response = this.state.photos.map((photo) => {
      return <Image key={photo} url={photo} />;
    });

    return response;
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

    let postPhotos = this.getPostPhotos();

    let data = this.props.content;

    let title = "";

    if (data.title) {
      let text = data.title;
      title = text.length > 300 ? text.substring(0, 300) + "..." : text;
    }

    const markup = !data.video ? (
      <div
        className="postView"
        style={{ backgroundColor: data.postColor }}
      >
        <div className="postHeader">
          {/* <div className="postSrcLogo">
        {this.getPostSrc(this.props.content.source)}
      </div> */}
          <div className="postViews">
            <i className="fas fa-eye"></i>
            {"  "}
            {data.views}
          </div>
          {mark}
          <button className="postReadBtn">
            <a
              style={{ textDecoration: "none", color: "white" }}
              href={data.source}
            >
              читать
            </a>
          </button>
        </div>
        {title.length ? (
          <div className="postTitle" style={{ color: data.textColor }}>
            {title}
          </div>
        ) : (
          ""
        )}
        {postPhotos}
        <div className="postFooter">
          <div className="postCounts">
            <i className="fas fa-heart"></i> {data.likes}
          </div>
          <div className="postCounts">
            <i className="fas fa-comment"></i> {data.comms}
          </div>
          <div className="postCounts">
            <i className="fas fa-reply"></i> {data.reps}
          </div>
        </div>
      </div>
    ) : (
      <div
        className="postView card"
        style={{ backgroundColor: data.postColor }}
      >
        <div className="postHeader">
          {mark}
          <button className="postReadBtn">
            <a
              style={{ textDecoration: "none", color: "white" }}
              href={"https://www.youtube.com/watch?v=" + data.id}
            >
              смотреть
            </a>
          </button>
        </div>
        {title.length ? (
          <div className="postTitle" style={{ color: data.textColor }}>
            {title}
          </div>
        ) : (
          ""
        )}
        {data.cover ? (
          <a
            className="linkStyle"
            href={"https://www.youtube.com/watch?v=" + data.id}
          >
            <img className="postCover" src={data.cover} alt="Обложка записи" />
          </a>
        ) : (
          ""
        )}
      </div>
    );

    return <div>{markup}</div>;
  }
}

export default Post;
