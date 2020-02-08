import React from "react";
import { render } from "react-dom";
import "./scss/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { App } from "./App";
import {
  faCheckSquare,
  faCoffee,
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";

const myLibrary: any = library;
myLibrary.add(fab, faCheckSquare, faCoffee, faSignInAlt);

/**
 * This is the component that appears in the index.html file.
 */

render(
  <App />,
  document.getElementById("root") //The App Comp will load on the div with ID "root".
);