import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {verifyEmail} from "../redux/userAction";

// COMPONENTS
import Footer from "../footer";
import EmailSuccess from "./components/success";
import Error from "./components/error";
import Loading from "../../../components/loading";

// STYLE
import style from "../style.css";
class Validate extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const {verifyEmail} = this.props;

    const url_hash = new URL(window.location.href);
    const hash = url_hash.searchParams.get("hash");

    if(hash!=null && hash!=undefined && hash != ""){
      verifyEmail(hash);
    }
  }

  renderValidate = () => {
    const {loading, success} = this.props.verify;
    if(loading){
      return (
        <Loading color="wallet" width="100px"/>
      )
    }else{
      return (success) ? <EmailSuccess /> : <Error />;
    }
  }

  render() {
    return (
      <div className={style.contGeneral}>
        {this.renderValidate()}
        <Footer />
      </div>
    );
  }
}

Validate.propTypes = {
  verifyEmail: PropTypes.func.isRequired,
  verify: PropTypes.object
};

const mapSateToProps = store => ({
  verify: store.user.verifyEmail
});

const mapDispatchToProps = dispatch => bindActionCreators({
  verifyEmail
}, dispatch);

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(Validate);
