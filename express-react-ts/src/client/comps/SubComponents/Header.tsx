import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../scss/home/hamburgers.scss";
import { CSSTransition } from "react-transition-group";
import { useHistory } from 'react-router-dom';

interface HeaderProps {
  isAvatarPopup: boolean;
  setIsAvatarPopup: Function;
  showSearch: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isAvatarPopup,
  setIsAvatarPopup,
  showSearch,
}) => {
  const history = useHistory();
  useEffect(() => {
    const hamburger = document.querySelector("#header-hamburger-btn");
    if (isAvatarPopup) {
      hamburger.className = "hamburger hamburger--slider is-active";
    } else {
      hamburger.className = "hamburger hamburger--slider";
    }
  }, [isAvatarPopup]);

  return (
    <div className="home-page-header-container">
      <div className="home-page-header-logo-container" onClick={() => history.push("/home")}>
        <div className="home-page-header-logo"></div>
        <p className="home-page-header-logo-text">
          <span style={{ color: "white" }}>S</span>cribe
        </p>
      </div>
      { showSearch && 
        <div className="home-page-header-search-bar">
          <FontAwesomeIcon icon="search" />
          <input type="text" placeholder="Search Patients"></input>
        </div>
      }

      <div
        className="home-page-hamburger-container"
        onClick={() => {
          setIsAvatarPopup(!isAvatarPopup);
        }}
      >
        <div id="header-hamburger-btn" className="hamburger hamburger--slider">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </div>
      </div>

      <CSSTransition
        in={isAvatarPopup}
        unmountOnExit
        timeout={600}
        onEnter={() => setIsAvatarPopup(true)}
        onExited={() => setIsAvatarPopup(false)}
        classNames="fade-slide-down"
      >
        <div className="home-page-header-avatar-popup-container">
          <div className="home-page-header-avatar-image"></div>
          <div className="home-page-header-avatar-drop-name">
            Student Profile
            <p>1st Year</p>
          </div>
          <div
            className="home-page-header-avatar-drop-logout"
            onClick={() => (window.location.href = "/logout")}
          >
            Logout
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
