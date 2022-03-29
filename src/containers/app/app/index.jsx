import path from "path";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import fakeDelay from "../../../components/fakeDelay";
import Loading from "../../../components/loading";
import Skeleton from "../../skeleton";
import ModalBar from "../../../components/modalBar";

function loading({ error }) {
  if (error) {
    console.warn(error);
    return "Error!";
  } else {
    return <Loading color="wallet" height="80vh" width="100px" />;
  }
}

/* eslint-disable */
let home = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../home")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../home")
});

let wallet = Loadable({
  loader: () => fakeDelay(400).then(() => import("../../wallet")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../wallet")
});

let errorNotFound = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/404")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/404")
});

let errorInternal = Loadable({
  loader: () => fakeDelay(0).then(() => import("../../errors/500")),
  loading: loading,
  serverSideRequirePath: path.resolve(__dirname, "../../errors/500")
});

/* eslint-enable */

class App extends Component {
  render() {
    const { error } = this.props;
    return (
      <Router>
        <div>
          <div>
            {error.active ? (
              <ModalBar type={error.type} message={error.message} timer />
            ) : null}
          </div>
          <Skeleton>
            <Switch>
              {/* INSIDE ROUTES */}
              <Route exact path="/" component={wallet} />
              <Route path="/home" component={wallet} />
              <Route path="/wallet" component={wallet} />

              {/* ERRORS PAGE */}
              <Route path="/404" component={errorNotFound} />
              <Route path="/500" component={errorInternal} />
              <Route path={"**"} component={errorNotFound} />
            </Switch>
          </Skeleton>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  error: PropTypes.object
};

const mapSateToProps = store => ({
  error: store.error.message
});

export default connect(mapSateToProps)(App);
