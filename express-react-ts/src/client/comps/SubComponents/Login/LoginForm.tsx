import React, { Fragment, useEffect } from "react";
import { FormGroup } from "./FormGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

interface LoginFormProps {
  isRegisterMode: boolean;
  dispatch: React.Dispatch<{
    type: string;
    fieldName?: string;
    value?: string;
  }>;
  username: string;
  password: string;
  repassword: string;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isRegisterMode,
  dispatch,
  username,
  password,
  repassword,
  onSubmit,
}) => {
  const mToast: any = toast;
  const history = useHistory();

  function registerUser(e: any) {
    e.preventDefault();
    if (password !== repassword) {
      mToast.error("Passwords do not match!");
    } else if (password === "" || username === "") {
      mToast.error("One or more fields are missing!");
    } else {
      const date = new Date();
      fetch("/register", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          username: username,
          first_name: "John",
          last_name: "Doe",
          email: "Example@example.com",
          password: password,
          year: 1,
          user_type: "Student",
          date_create: date.getTime(),
          avatar_url: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
        }),
      })
        .then((res: any) => {
          if (res.status === 200){
            mToast.success("You have successfully registered.");
            dispatch({type: "register success"});
          } else {
            throw new Error("Error while registering.");
          }
        })
        .catch((err: any) => {
          console.log(err);
          mToast.error("There was an issue with your registration. Try again.");
        });
    }
  }

  useEffect(() => {
    fetch("/api/me")
    .then(res => {
      if (res.status === 200){
        history.push("/home");
      }
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <Fragment>
      <h1 className="login-form-header">
        {isRegisterMode ? "Register" : "Login"}
      </h1>
      <form className="login-form" action="/login" method="post">
        <FormGroup
          dispatch={dispatch}
          id="login-username"
          label={isRegisterMode ? "Username" : "Username or Email"}
          value={username}
          type="text"
          name="username"
        />
        <FormGroup
          dispatch={dispatch}
          id="login-password"
          label="Password"
          value={password}
          type="password"
          name="password"
        />
        {isRegisterMode && (
          <FormGroup
            dispatch={dispatch}
            id="login-repassword"
            label="Confirm Password"
            value={repassword}
            type="password"
            name="repassword"
          />
        )}
        <button
          className="login-btn"
          onClick={e => {
            if (isRegisterMode) {
              registerUser(e);
            } else {
              onSubmit(e);
            }
          }}
        >
          {!isRegisterMode ? "Login" : "Register"}
          <span style={{ marginLeft: "10px" }}>
            <FontAwesomeIcon icon="sign-in-alt" />
          </span>
        </button>
      </form>
      {!isRegisterMode ? (
        <p className="login-register-small-text">
          Haven't made an account yet?{" "}
          <span
            className="login-register-span"
            onClick={() => dispatch({ type: "start register" })}
          >
            Register.
          </span>
        </p>
      ) : (
        <p className="login-register-small-text">
          Already have an account?{" "}
          <span
            className="login-register-span"
            onClick={() => dispatch({ type: "stop register" })}
          >
            Log In.
          </span>
        </p>
      )}
    </Fragment>
  );
};
