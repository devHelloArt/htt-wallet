import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// REDUX
import { connect } from "react-redux";

//MATERIAL UI
import Avatar from "@material-ui/core/Avatar";

//UTILS
import i18n from "../../utils/i18n";

//STYLE
import style from "./style.css";

import { getProfileImg } from "./../../utils/user"

class UserControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBox: false,
      avatar: "images/lunio/lunio-user@100x100.jpg"
    };
  }

  handleClick = () => {
    this.setState({ ...this.state, openBox: !this.state.openBox });
  };

  renderPopup = () => {
    const { openBox } = this.state;
    const { actionLogout } = this.props;

    if (openBox) {
      setTimeout(() => {
        this.setState({ ...this.state, openBox: false });
      }, 3000);

      return (
        <div className={style.menuUser}>
          <Link to="/" onClick={actionLogout} className={style.linkPopMenu}>
            <div className={style.boxIcon}>
              <img src="../../images/icons/exit/exit.png" />
            </div>
            {i18n.t("MENU_LOGOUT")}
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <Avatar
          alt="Avatar"
          src={getProfileImg(200)}
          className={style.avatarHeader}
          onClick={() => this.handleClick()}
        />

        {this.renderPopup()}
      </div>
    );
  }
}

UserControl.propTypes = {
  actionLogout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

export default connect(
  mapSateToProps,
  null
)(UserControl);
