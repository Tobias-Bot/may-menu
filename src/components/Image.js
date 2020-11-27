import React from "react";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoView: false,
    };
  }

  render() {
    let data = this.props.data;

    return (
      <div>
        <div>
          <a className="linkStyle" href={data.url}>
            <img
              className="postCover"
              src={data.img}
              alt="Первая страничка статьи"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Image;
