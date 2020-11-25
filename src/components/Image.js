import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoView: false,
    };

    this.enlargePhoto = this.enlargePhoto.bind(this);
  }

  enlargePhoto() {
    let view = this.state.photoView;
    this.setState({ photoView: !view });
  }

  render() {
    let view = this.state.photoView;
    let url = this.props.url;

    return (
      <div>
        <div onClick={this.enlargePhoto}>
          {view ? (
            <div className="imgWrapper">
              <img
                className="largePostCover"
                src={url}
                alt="картинка не загрузилась :("
              />
            </div>
          ) : (
            ""
          )}
          <img
            className="postCover"
            src={url}
            alt="картинка не загрузилась :("
          />
        </div>
      </div>
    );
  }
}

export default Image;
