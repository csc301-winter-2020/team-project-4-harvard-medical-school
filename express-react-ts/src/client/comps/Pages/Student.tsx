import React, { useReducer, Fragment, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { ScribeSVG } from "../SubComponents/ScribeSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import { Footer } from "../SubComponents/Footer";
import { FormGroup } from "../SubComponents/Login/FormGroup";
import ReactDOM from "react-dom";

const createToast: any = toast;

type LoginState = {
  username: string;
  password: string;
  repassword: string;
  isLoading: boolean;
  isPortraitMode: boolean;
  isRegisterMode: boolean;
};

function reducer(
  state: LoginState,
  action: { type: string; fieldName?: string; value?: string }
): LoginState {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.fieldName]: action.value
      };
    case "login":
      return {
        ...state,
        isLoading: true
      };
    case "resize":
      return {
        ...state,
        isPortraitMode: parseInt(action.value) < 1024
      };
    case "start register":
      return {
        ...state,
        isRegisterMode: true,
        isLoading: false,
        username: "",
        password: ""
      };
    case "stop register":
      return {
        ...state,
        isRegisterMode: false,
        isLoading: false,
        username: "",
        password: "",
        repassword: ""
      };

    default:
      throw new Error("Invalid type on action.");
  }
}

const initialState: LoginState = {
  username: "",
  password: "",
  repassword: "",
  isLoading: false,
  isPortraitMode: false,
  isRegisterMode: false
};

export const Student: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    username,
    password,
    repassword,
    isLoading,
    isPortraitMode,
    isRegisterMode
  } = state;

  useEffect(() => {
    const handleResize = () =>
      dispatch({ type: "resize", value: String(window.innerWidth) });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Disabling this will cause the POST request to fire. Also allows the form to say "Please fill this field" if the user didn't.
    dispatch({ type: "login" });
    createToast.success("⚠️ GAMER DETECTED!!!!!! ");
  };

  let inputRef;
  return (
    <Fragment>
      <CanvasDraw ref={canvasDraw => (inputRef = canvasDraw)} canvasWidth={window.innerWidth - 50} canvasHeight={window.innerHeight - 50} lazyRadius={0} brushRadius={1}></CanvasDraw>
      <button onClick={a}>Hiho</button>
      {!isPortraitMode && <Footer />}
    </Fragment>
  );
};
