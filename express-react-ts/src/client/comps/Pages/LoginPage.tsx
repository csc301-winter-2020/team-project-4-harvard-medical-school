import React, { useReducer, Fragment, useEffect } from "react";
import "../../scss/login/login";
import "../../scss/login/inputboxes";
import { ScribeSVG } from "../SubComponents/ScribeSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import { Footer } from "../SubComponents/Footer";
import { LoginForm } from "../SubComponents/Login/LoginForm";

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
        [action.fieldName]: action.value,
      };
    case "login":
      return {
        ...state,
        isLoading: true,
      };
    case "resize":
      return {
        ...state,
        isPortraitMode: parseInt(action.value) < 1024,
      };
    case "start register":
      return {
        ...state,
        isRegisterMode: true,
        isLoading: false,
        username: "",
        password: "",
      };
    case "stop register":
      return {
        ...state,
        isRegisterMode: false,
        isLoading: false,
        username: "",
        password: "",
        repassword: "",
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
  isRegisterMode: false,
};

export const LoginPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {});

  const {
    username,
    password,
    repassword,
    isLoading,
    isPortraitMode,
    isRegisterMode,
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
    dispatch({ type: "login" });
    // createToast.success("⚠️ GAMER DETECTED!!!!!! ");
  };

  return (
    <Fragment>
      <div className="login-page-outermost">
        <div className="login-page-main-grid">
          <div className="login-page-left-section">
            <div className="login-page-left-content">
              <ScribeSVG color="white" />
              <h1>Is our cool app</h1>
              <p>destroy steven kang</p>
            </div>
          </div>
          <div className="login-page-right-section">
            <div className="login-container">
              <div className="login-inner">
                {isPortraitMode && (
                  <h1 className="login-portrait-title">Scribe</h1>
                )}
                <LoginForm
                  dispatch={dispatch}
                  isRegisterMode={isRegisterMode}
                  onSubmit={onSubmit}
                  username={username}
                  repassword={repassword}
                  password={password}
                />
                {isLoading && <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </div>
      {!isPortraitMode && <Footer />}
    </Fragment>
  );
};
