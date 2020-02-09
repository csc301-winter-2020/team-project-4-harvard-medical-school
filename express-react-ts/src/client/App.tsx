import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginPage } from "./comps/Pages/LoginPage";
import { Page } from "./comps/Pages/Page";
import { HelixLoader } from "./comps/SubComponents/HelixLoader";
import { Error } from "./comps/Pages/Errors/Error";
import { CurUser } from "./comps/Pages/CurUser";

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
          <Route exact path="/home" component={Page} />
          <Route exact path="/loader" component={HelixLoader} />
          <Route exact path="/curUser" component={CurUser} />
          <Route render={() => <Error errNo={404} />} />
        </Switch>
    </BrowserRouter>
  );
};
