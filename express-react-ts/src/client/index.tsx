import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { page } from "./page";
import { NoMatch } from "./NoMatch";
import App from "./App";
import "./scss/app";

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/home" component={page} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
