import React, { Component } from 'react';
import classNames from "classnames/bind";
import HomePage from "./components/Pages/HomePage/HomePage.js";
import WritePage from "./components/Pages/WritePage/WritePage.js";
import { Route, Switch } from "react-router-dom";

// const cx = classNames.bind(styles);

class App extends Component {
  render() {
    return (
        <div className = "App">
          <Route exact path = "/" component = {HomePage} />
          <Switch>
            <Route path = "/write" component = {WritePage} />
            <Route path = "/:category" component = {HomePage} />
          </Switch>
        </div>
    );
  }
}

export default App;
