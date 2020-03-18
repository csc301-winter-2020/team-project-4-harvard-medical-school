import React from "react";
import { render } from "react-dom";
import "./scss/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";
import { LoginPage } from "./comps/Pages/LoginPage";
import { HomePage } from "./comps/Pages/HomePage";
import { PatientProfilePage } from "./comps/Pages/PatientProfile/PatientProfilePage";
import { SettingsPage } from "./comps/Pages/SettingsPage";
import { TemplatesPage } from "./comps/Pages/TemplatesPage";
import { Questions } from "./comps/SubComponents/Templates/Questions";
import { Error } from "./comps/Pages/Errors/Error";
import { AdminPage } from "./comps/Pages/Admin/AdminPage";
import { AdminClassStudentsPage } from "./comps/Pages/Admin/AdminClassStudentsPage";
import { InstructorPage } from "./comps/Pages/Instructor/InstructorPage";
import { InstructorStudentProfilePage } from "./comps/Pages/Instructor/InstructorStudentProfilePage";
import { InstructorStudentPatientPage } from "./comps/Pages/Instructor/InstructorStudentPatientPage";
import {
  faCheckSquare,
  faCoffee,
  faSignInAlt,
  faSearch,
  faUser,
  faInfo,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faTrash,
  faUndo,
  faSave,
  faExpandArrowsAlt,
  faFont,
  faPencilAlt,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faKeyboard,
  faEraser,
  faGripVertical,
  faQuestionCircle,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const myLibrary: any = library;
myLibrary.add(
  fab,
  faCheckSquare,
  faCoffee,
  faSignInAlt,
  faSearch,
  faUser,
  faInfo,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faTrash,
  faUndo,
  faSave,
  faExpandArrowsAlt,
  faFont,
  faPencilAlt,
  faCheck,
  faArrowRight,
  faArrowLeft,
  faKeyboard,
  faEraser,
  faGripVertical,
  faQuestionCircle,
  faQuestion
);

const browserRouter: JSX.Element = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/home" component={HomePage} />
      <Route
        exact
        path={["/patient/:id", "/patient/:id/:pageName"]}
        component={PatientProfilePage}
      />
      <Route exact path="/settings" component={SettingsPage} />
      <Route exact path="/templates" component={TemplatesPage} />
      <Route
        exact
        path="/template/:id"
        render={props => <Questions {...props} useDefault={false} />}
      />
      <Route
        exact
        path="/templates/new"
        render={props => <Questions {...props} useDefault={true} />}
      />
      <Route exact path="/admin" component={AdminPage} />
      <Route
        exact
        path="/admin/:id/students"
        component={AdminClassStudentsPage}
      />
      <Route exact path="/instructor" component={InstructorPage} />
      <Route
        exact
        path="/instructor/student/:id"
        component={InstructorStudentProfilePage}
      />
      <Route
        exact
        path="/instructor/student/:sid/patient/:pid"
        component={InstructorStudentPatientPage}
      />
      <Route
        exact
        path="/err/:num/:msg"
        render={props => <Error {...props} urlErr={true} />}
      />
      <Route
        render={props => <Error {...props} errNo={404} urlErr={false} />}
      />
    </Switch>
  </BrowserRouter>
);

/**
 * This is the component that appears in the index.html file.
 */

render(
  browserRouter,
  document.getElementById("root") //The App Comp will load on the div with ID "root".
);
