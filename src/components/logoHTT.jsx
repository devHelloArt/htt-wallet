import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import { withStyles } from "@material-ui/core/styles";

// STYLES
import style from "./style.css";

const styles = {
  fontSmall: {
    fontSize: "27.5px"
  },
  fontMedium: {
    fontSize: "55px"
  },
  fontLarge: {
    fontSize: "72.5px"
  }
};

class LogoHTT extends React.Component {
  render() {
    const { small, medium, large, classes } = this.props;
    return (
      <div className={style.logoHTT}>
        <div
          className={
            small
              ? classes.fontSmall
              : medium
                ? classes.fontMedium
                : large
                  ? classes.fontLarge
                  : classes.fontSmall
          }
        >
          <img
            src={"images/icons/tokens/HTT_Wallet_Logo.png"}
            height="131px"
            width="100px"
          />
        </div>
      </div>
    );
  }
}

LogoHTT.propTypes = {
  classes: PropTypes.object.isRequired,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool
};

export default withStyles(styles)(LogoHTT);
