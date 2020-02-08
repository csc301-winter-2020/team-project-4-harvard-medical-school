import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginPage } from "./comps/Pages/LoginPage";
import { Error } from "./comps/Pages/Errors/Error";

/**
 * This is a browser router that
 * mimics a multipage application (when in reality it is just different components mounting
 * and unmounting)
 */

export const App: React.FC = ({}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route render={() => <Error errNo={404} />} />
      </Switch>
    </BrowserRouter>
  );
};
