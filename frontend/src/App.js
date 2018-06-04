import React, { Component } from 'react';
import styles from "./App.scss";
import classNames from "classnames/bind";
import { Route } from "react-router-dom";
import Content from "./components/Organisms/Content/Content.js";
import Aside from "./components/Organisms/Aside/Aside.js";
import Write from "./components/Organisms/Write/Write.js";
import { ScreenMask } from "./components/Parts/ScreenMask/ScreenMask.js";
import { connect } from "react-redux";

const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
        <div className = {cx("App")}>
          <div className = {cx("screen-mask", {
            responsive : this.props.showlogin
          })}>
            {this.props.showlogin ? <ScreenMask /> : ""}
          </div>
          <div className = {cx("wrapper")}>
            <div className = {cx("fixed-Aside")}>
              <Aside />
            </div>
            <div className = {cx("content")}>
              <Route exact path = "/" component = {Content} />
              <Route path = "/write" component = {Write} />
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showlogin : state.showlogin.show
  };
};

export default connect(mapStateToProps)(App);
