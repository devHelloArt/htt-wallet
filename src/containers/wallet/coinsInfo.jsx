import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletSendModalOpen,
  setWalletModalStep,
  setWalletLoading,
  resetModalSend,
} from "./redux/walletAction";
import { errorRequest } from "../errors/redux/errorAction.js";

import { loadWalletInfo } from "../skeleton/redux/skeletonAction";

// STYLE
import style from "./style.css";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

//COMPONENTS
import Modal from "../../components/modal";
import SendModal from "./modal/sendModal/";

// UTILS
import i18n from "../../utils/i18n";

class CoinsInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSend: false,
      modalReceive: false,
    };
  }

  previousStep = () => {
    let { step } = this.props.wallet.modal;
    let { setWalletModalStep } = this.props;
    if (step >= 0) {
      setWalletModalStep(step - 1);
    }

    return;
  };

  renderArrowPercent = (val) => {
    if (parseFloat(val) < 0) {
      return <ArrowDropDown className={style.arrowPercentDown} />;
    } else {
      return <ArrowDropUp className={style.arrowPercentUp} />;
    }
  };
  handleSendModalOpen = () => {
    let { wallet, errorRequest, setWalletSendModalOpen } = this.props;
    let utxos = !wallet.utxos ? {} : wallet.utxos;
    if (utxos.status === "error") {
      errorRequest(utxos.message);
      return;
    }
    setWalletSendModalOpen();
  };

  componentDidUpdate() {
    let { lastCoin } = this.state;
    let { wallet } = this.props;
    // let address = coins[wallet.selectedCoin].address;
    if (lastCoin !== wallet.selectedCoin) {
      this.setState({ lastCoin: wallet.selectedCoin });
    }
  }

  handleModalSendClose = () => {
    this.props.resetModalSend();
    let {
      user,
      wallet,
      setWalletSendModalOpen,
      setWalletLoading,
      loadWalletInfo,
    } = this.props;
    let step = wallet.modal.step;

    if (step === 4) {
      return null;
    } else if (step === 5 || step === 6) {
      return () => {
        setWalletSendModalOpen(),
          setWalletLoading(true),
          loadWalletInfo(user.password);
      };
    } else {
      return () => setWalletSendModalOpen();
    }
  };

  render() {
    let { user, coins, wallet } = this.props;
    let step = wallet.modal.step;
    let selectedCoin = wallet.selectedCoin ? wallet.selectedCoin : "HTT";

    if (!coins[selectedCoin]) return null;

    let coin = coins[wallet.selectedCoin];
    let balance = coin.balance.available;
    let strBalance = parseInt(balance).toLocaleString();
    let userName = user.name;
    let address = coin.address;
    
    return (
      <div>
        <Modal
          title={i18n.t("WALLET_MODAL_SEND_TITLE")}
          content={<SendModal />}
          show={wallet.modal.open}
          close={this.handleModalSendClose}
          back={
            step === 0 || step === 4 || step === 5 || step === 6
              ? null
              : () => this.previousStep()
          }
        />

        <Grid container className={style.containerInfo}>
          <Grid item xs={11} sm={7} md={6} className={style.contentInfo}>
            <Grid item xs={4} className={style.coinSel}>
              <Grid item>
                <h3>{coin.name.toUpperCase()}</h3>
                <img
                  src={"./images/icons/coins/" + coin.abbreviation + ".png"}
                  className={style.iconCoinSelected}
                />
                <div className={style.percentageCoinSelected}>
                  <h3> $ -</h3>
                </div>
              </Grid>
            </Grid>

            <Hidden xsDown>
              <Grid item xs={8} className={style.floatRight}>
                <Grid item className={style.floatRight}>
                  <Grid item className={style.balanceItem}>
                    <h2>{i18n.t("HELLO")}, {userName}</h2>
                  </Grid>
                  <Grid item className={style.balanceItem}>
                    <h2>{address}, {i18n.t("WALLET_BALANCE")}</h2>
                    <h3>{strBalance} </h3>
                    <div className={style.alignValues}>
                      <h3> $0.00 USD</h3>
                    </div>
                    <h3>{i18n.t("EXPECTED_WITHDRAWAL_DATE")} D-</h3>
                    <h3>{i18n.t("WITHDRAWABLE_RATE")} : -%</h3>
                  </Grid>
                  <Grid item xs={11} className={style.alignButtons}>
                    <button
                      className={style.sentButton}
                      onClick={() => alert(i18n.t("LOCKED_WALLET"))}
                    >
                      {i18n.t("BTN_SEND")}
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>

            <Hidden smUp>
              <Grid item xs={8} className={style.contentInfo}>
                <Grid item className={style.floatRight}>
                  <Grid item className={style.balanceItemMobile}>
                    <h2>{i18n.t("HELLO")}, {userName}</h2>
                  </Grid>
                  <Grid item className={style.balanceItemMobile}>
                    <h2>{address}, {i18n.t("WALLET_BALANCE")}</h2>
                    <h3>{strBalance} </h3>
                    <div className={style.alignValues}>
                      <h3> $0.00 USD</h3>
                    </div>
                    <h3>{i18n.t("EXPECTED_WITHDRAWAL_DATE")} D-</h3>
                    <h3>{i18n.t("WITHDRAWABLE_RATE")} : -%</h3>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>

          <Hidden smUp>
            <Grid item xs={11} className={style.alignButtons}>
              <button
                className={style.sentButtonMobile}
                onClick={() => alert(i18n.t("LOCKED_WALLET"))}
              >
                {i18n.t("BTN_SEND")}
              </button>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    );
  }
}

CoinsInfo.propTypes = {
  user: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  loadWalletInfo: PropTypes.func.isRequired,
  setWalletLoading: PropTypes.func.isRequired,
  setWalletModalStep: PropTypes.func.isRequired,
  setWalletSendModalOpen: PropTypes.func.isRequired,
  errorRequest: PropTypes.func,
  resetModalSend: PropTypes.func,
};

const mapSateToProps = (store) => ({
  user: store.user.user,
  wallet: store.wallet,
  coins: store.skeleton.coins,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadWalletInfo,
      setWalletLoading,
      setWalletModalStep,
      setWalletSendModalOpen,
      errorRequest,
      resetModalSend,
    },
    dispatch
  );

export default connect(mapSateToProps, mapDispatchToProps)(CoinsInfo);
