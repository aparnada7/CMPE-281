import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import App1 from './App1'

import LoginPage from "layouts/LoginPage/LoginPage";
import RegisterPage from "layouts/Register/RegisterPage";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/*}   {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}   */}
      <Route exact={true} path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
// registerServiceWorker();
