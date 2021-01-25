import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoView: false,
    };
  }

  render() {
    let photo = this.props.photo;
    let source = this.props.source;

    return (
      <div>
        <div>
          <a
            className="linkStyle"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="postCover"
              src={photo}
              alt="Первая страничка статьи"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Image;
