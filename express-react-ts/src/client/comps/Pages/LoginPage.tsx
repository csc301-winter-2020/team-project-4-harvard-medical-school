import React, { useState } from "react";
import "../../scss/login/login";
import "../../scss/login/inputboxes";
import { ScribeSVG } from "../SubComponents/ScribeSVG";


export const LoginPage: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	
	const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		alert("you tried to log in");
	}

  return (
    <div className="login-page-outermost">
      <div className="login-page-main-grid">
        <div className="login-page-left-section">
          <div className="login-page-left-content">
            <ScribeSVG />
            <h1>Is our cool app</h1>

            <p>which lets ppl take sick ass notes</p>
          </div>
        </div>
        <div className="login-page-right-section">
          <div className="login-container">
            <div className="login-inner">
              <form className="login-form">
                <div className="group">
                  <input
                    id="login-username"
                    name="username"
                    type="text"
										required
										value={username}
										onChange={e => setUsername(e.currentTarget.value)}
                  ></input>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Username or Email</label>
                </div>

                <div className="group">
                  <input
                    id="login-password"
                    name="password"
                    type="password"
										required
										value={password}
										onChange={e => setPassword(e.currentTarget.value)}
                  ></input>
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Password</label>
                </div>

                <button className="login-btn" onClick={e => onSubmit(e)}>
                  Login <i className="fa fa-sign-in"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
