import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// COMPONENTS
import Auth from "./auth";

// STYLE
import style from "../style.css";

class Login extends React.Component {
  renderContent = () => {
    let { login } = this.props.user.pages;
    if (login === 0) return <Auth />;
  };

  render() {
    return <div className={style.contGeneral} >
      {this.renderContent()}
      </div>;
  }
}

Login.propTypes = {
  user: PropTypes.object,
  pages: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user,
  pages: store.user.pages
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Login);
