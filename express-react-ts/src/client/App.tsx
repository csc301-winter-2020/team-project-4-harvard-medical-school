import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LoginPage } from "./comps/Pages/LoginPage";
import { Error } from "./comps/Pages/Errors/Error";
import { HomePage } from "./comps/Pages/HomePage";
import { SettingsPage } from "./comps/Pages/SettingsPage";
import { PatientProfilePage } from "./comps/Pages/PatientProfile/PatientProfilePage";

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
        <Route exact path="/home" component={HomePage} />
        <Route
          exact
          path="/patient/:id"
          component={PatientProfilePage}
        />
        <Route exact path="/settings" component={SettingsPage} />
        <Route render={() => <Error errNo={404} />} />
      </Switch>
    </BrowserRouter>
  );
};
