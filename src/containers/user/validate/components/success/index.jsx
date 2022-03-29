import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// UTILS
import i18n from "../../../../../utils/i18n";

// STYLE
import style from "./style.css";

class EmailSuccess extends React.Component {
  render() {
    return (
      <div className={style.baseMessage}>
        <img
          src="../../images/icons/confirm/confirm@2x.png"
          className={style.icon}
        />
        <p className={style.messageSuccess}>{i18n.t("INVITE_SUCCESS_EMAIL")}</p>
        <Link to="/">
          <button className={style.buttonLogin}>{i18n.t("BTN_LOGIN")}</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapDispatchToProps)(EmailSuccess);
