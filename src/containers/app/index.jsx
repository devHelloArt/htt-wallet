import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./store";
import i18n from "../../utils/i18n";

// COMPONENTS
import Content from "./content";

// STYLE
import style from "./style.css";

class Routes extends Component {
  render() {
    document.title = i18n.t("NAVIGATOR_TITLE");
    document.getElementsByName("description")[0].setAttribute("content", i18n.t("NAVIGATOR_DESCRIPTION"));

    return (
      <div className={style.textDefault}>
        <Provider store={Store}>
          <Content />
        </Provider>
      </div>
    );
  }
}

export default Routes;
