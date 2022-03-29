import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loading, createUser } from "../redux/userAction";
import { clearMessage, errorInput } from "../../errors/redux/errorAction";

// UTILS
import { inputValidator } from "../../../utils/inputValidator";
import i18n from "../../../utils/i18n";

// STYLE
import style from "../style.css";
import CustomCheckbox from "../../../components/checkBox";

// COMPONENTS
import Loading from "../../../components/loading";

class CreateUserTerms extends React.Component {
  constructor() {
    super();
    this.state = {
      inputs: {
        checkboxAge: undefined
      },
      errors: undefined
    };
  }

  getInput = input => {
    let { type, name, value } = input;
    let { inputs } = this.state;
    this.setState({
      ...this.state,
      inputs: {
        ...inputs,
        [name]: type === "checkbox" ? input : value ? input : undefined
      },
      errors: undefined
    });

    return;
  };

  validateInput = () => {
    let { loading, createUser, clearMessage, errorInput, user } = this.props;
    let { inputs } = this.state;
    let { messageError, errors } = inputValidator(inputs);

    if (
      errors.length > 0 ||
      !user.user.name ||
      !user.user.phonenum ||
      !user.user.email ||
      !user.user.password
    ) {
      errorInput(messageError ? messageError : i18n.t("MESSAGE_TERMS"));
      this.setState({
        ...this.state,
        errors
      });
    } else {
      loading();
      clearMessage();
      createUser(
        user.user.name,
        user.user.phonenum,
        user.user.email,
        user.user.password, 
        user.invite.link
      );
    }
    return;
  };

  render() {
    let { user } = this.props;
    let { inputs } = this.state;

    return (
      <div>
        <div className={style.alignInfoDownloadTerms}>
        </div>

        <div className={style.alignInfoTermsOfServices}>
          <CustomCheckbox
            type="checkbox"
            name="checkboxAge"
            label={i18n.t("NEW_ACCOUNT_ACCEPT_AGE")}
            required
            onChange={event => {
              this.getInput(event.target);
            }}
          />

          <div className={style.acceptTermsOfServices}>
            {i18n.t("NEW_ACCOUNT_ACCEPT_AGE")}
          </div>
        </div>

        <button
          className={
            inputs.checkboxAge
              ? style.buttonEnable
              : style.buttonBorderWhite
          }
          onClick={() => this.validateInput()}
        >
          {user.loading ? <Loading /> : i18n.t("BTN_CREATE")}
        </button>
      </div>
    );
  }
}

CreateUserTerms.propTypes = {
  loading: PropTypes.func,
  createUser: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  user: PropTypes.object
};

const mapSateToProps = store => ({
  user: store.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loading,
      createUser,
      clearMessage,
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(CreateUserTerms);
