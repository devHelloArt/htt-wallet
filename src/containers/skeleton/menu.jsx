import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink, withRouter } from "react-router-dom";

// UTILS
import i18n from "../../utils/i18n";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { errorInput } from "../errors/redux/errorAction";

// MATERIAL UI
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Avatar from "@material-ui/core/Avatar";

// STYLE
import style from "./style.css";

// array itens menu
const menuItens = [
  {
    link: "/home",
    label: i18n.t("MENU_HOME"),
    icon: "../../images/icons/general/home@2x.png"
  },
  {
    link: "/wallet",
    label: i18n.t("MENU_WALLET"),
    icon: "../../images/icons/general/wallet@1x.png"
  },
];

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeP2p: false,
    }
  }

  onClickFunction = error => {
    const { actionMenu, errorInput } = this.props;
    actionMenu();
    if (error) {
      errorInput("Service Unavailable. Try again later.");
    }
    return;
  };

  openP2PComponent = () => {
    const { actionP2PComponent } = this.props;
    actionP2PComponent();

    this.setState({
      ...this.state,
      activeP2p: !this.state.activeP2p,
    })
  };

  renderMenu = () => {
    let { pathname } = this.props.location;

    return menuItens.map((item, key) => {
      let classStyle = style.linkMenu;

      if (item.label === "Home" && (pathname === "/" || pathname === "/home")) {
        classStyle = style.linkMenu + " " + style.linkMenuActive;
      }

      return (
        <NavLink
          className={classStyle}
          activeClassName={item.error ? style.linkMenu : style.linkMenuActive}
          to={item.error ? "/home" : item.link}
          key={key}
          onClick={() => this.onClickFunction(item.error)}
        >
          <img src={item.icon} className={style.iconMenu} />
          <div onClick={() => this.onClickFunction(item.error)}>
            {item.label}
          </div>
        </NavLink>
      );
    });
  };

  render() {
    const { openMenu, user, actionLogout, actionMenu } = this.props;
    const {activeP2p} = this.state;

    const p2pStyleMenu = activeP2p ? style.linkMenuP2P : style.linkMenuP2PActive;
    
    return (
      <div
        className={style.colMenu}
        style={{ left: +openMenu ? " 0px " : "-232px" }}
      >
        <Hidden lgUp>
          <Grid container className={style.boxUserMenu}>
            <Grid item xs={4} className={style.boxAvatarUser}>
              <Avatar alt="Avatar" src={user.profilePicture} />
            </Grid>

            <Grid item xs={8} className={style.boxNameUser}>
              <span className={style.userName}>{user.name}</span>
              <br />
            </Grid>

            <Grid item xs={4} />

            <Grid item xs={8}>
              <Link to="/settings" className={style.link} onClick={actionMenu}>
                {i18n.t("MENU_SETTING")}
              </Link>
              <Link to="/" onClick={actionLogout} className={style.link}>
                {i18n.t("MENU_LOGOUT")}
              </Link>
            </Grid>
          </Grid>
        </Hidden>
        {this.renderMenu()}
        <div className={style.menuP2P}>
          <button
            className={p2pStyleMenu}
            onClick={() => this.openP2PComponent()}
          >
            <img
              src={"../../images/icons/general/p2p@3x.png"}
              className={style.iconP2p}
            />
          </button>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  location: PropTypes.object,
  openMenu: PropTypes.bool.isRequired,
  actionMenu: PropTypes.func.isRequired,
  actionLogout: PropTypes.func.isRequired,
  errorInput: PropTypes.func.isRequired,
  user: PropTypes.object,
  actionP2PComponent: PropTypes.func.isRequired
};

const mapSateToProps = store => ({
  user: store.user.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      errorInput
    },
    dispatch
  );

export default connect(
  mapSateToProps,
  mapDispatchToProps
)(withRouter(Menu));
