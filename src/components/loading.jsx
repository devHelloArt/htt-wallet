import React, { Component } from "react";
import PropTypes from "prop-types";

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  renderLoading = () => {
    let { color, width, height, margin, fullWidth } = this.props;
    let style = {
      height: height ? height : "",
      margin: margin ? margin : 0,
      justifyContent: "center",
      alignItems: "center",
      display: "flex"
    };
    if (fullWidth)
      style = {
        ...style,
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        flexFlow: 'wrap',
        background: '#FCFCFC',
        zIndex: '999',
      }
    if (!color) color = "white";
    if (!width) width = "20px";
    return (
      <div style={style}>
        <img
          src={"images/icons/loading/loading-" + color + ".gif"}
          alt="Loading..."
          width={width}
        />
      </div>
    );
  };

  render() {
    return this.renderLoading();
  }
}

Loading.propTypes = {
  color: PropTypes.oneOf([
    "",
    "white",
    "gray",
    "HTT",
    "bitcoin",
    "general",
    "wallet"
  ]),
  width: PropTypes.string,
  margin: PropTypes.string,
  height: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default Loading;
