import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Page } from "./comps/Pages/Page";
import { Error } from "./comps/Pages/Errors/Error";
import { LoginPage } from "./comps/Pages/LoginPage";
import "./scss/app";
import { HelixLoader } from "./comps/SubComponents/HelixLoader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";

const myLibrary: any = library;
myLibrary.add(fab, faCheckSquare, faCoffee, faSignInAlt);

/**
 * This is the component that appears in the index.html file. It is a browser router that
 * mimics a multipage application (when in reality it is just different components mounting
 * and unmounting)
 */

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/home" component={Page} />
      <Route exact path="/loader" component={HelixLoader} />
      <Route render={() => <Error errNo={404} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root") //The BrowserRouter Comp will load on the div with ID "root".
);
