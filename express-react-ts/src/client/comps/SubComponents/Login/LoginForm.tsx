import React, { Fragment } from 'react'
import { FormGroup } from './FormGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export const LoginForm: React.FC<LoginFormProps> = ({isRegisterMode, dispatch, username, password, repassword, onSubmit}) => {
    return (
      <Fragment>
    <h1 className="login-form-header">
    { isRegisterMode ? "Register" : "Login"}
    </h1>
    <form className="login-form" action="/login" method="post">
    <FormGroup
      dispatch={dispatch}
      id="login-username"
      label="Username or Email"
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
    <button className="login-btn" onClick={e => onSubmit(e)}>
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
  </Fragment>);
}