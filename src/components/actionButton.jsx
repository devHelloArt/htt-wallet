import React from "react";
import PropTypes from "prop-types";

// STYLE
import style from "./style.css";

class ActionButton extends React.Component {
  render() {
    const { title, typeAction, action } = this.props;
    const icon =
      typeAction == "copy"
        ? "/images/icons/modal-receive/ic_copy@1x.png"
        : "/images/icons/invite/share@1x.png";

    return (
      <div onClick={action} className={style.imgAction}>
        <img src={icon} />
        <p>{title ? title : ""}</p>
      </div>
    );
  }
}
ActionButton.propTypes = {
  action: PropTypes.func,
  typeAction: PropTypes.oneOf(["share", "copy"]).isRequired,
  title: PropTypes.string
};

export default ActionButton;
