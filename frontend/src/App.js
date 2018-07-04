import React, { Component } from 'react';
import HomePage from "./components/Pages/HomePage/HomePage.js";
import WritePage from "./components/Pages/WritePage/WritePage.js";
import WriteViewPage from "./components/Pages/WriteViewPage/WriteViewPage.js";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <div className = "App">
          <Switch>
            <Route exact path = "/" component = { props => <HomePage {...props}/> } />
            <Route path = "/category/:category" component = { props => <HomePage {...props}/> } />
            <Route path = "/page/:no" component = { props => <HomePage {...props}/> } />
            <Route path = "/write" component = {WritePage} />
            <Route path = "/:no/modify" component = {WritePage}/>
            <Route path = "/:no" component = {WriteViewPage}/>
          </Switch>
        </div>
    );
  }
}

export default App;
