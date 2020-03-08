import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../scss/home/hamburgers.scss";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import {numberToYearStr, defaultAvatar} from "../../utils/utils";

interface HeaderProps {
  isAvatarPopup: boolean;
  setIsAvatarPopup: Function;
  showSearch: boolean;
  searchValue?: string;
  setSearchValue?: Function;
  placeholder: string;
}

export const Header: React.FC<HeaderProps> = ({
  isAvatarPopup,
  setIsAvatarPopup,
  showSearch,
  searchValue,
  setSearchValue,
  placeholder,
}) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("FIRST");
  const [lastName, setLastName] = useState("LAST");
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [year, setYear] = useState(1);
  useEffect(() => {
    const hamburger = document.querySelector("#header-hamburger-btn");
    if (isAvatarPopup) {
      hamburger.className = "hamburger hamburger--slider is-active";
    } else {
      hamburger.className = "hamburger hamburger--slider";
    }
  }, [isAvatarPopup]);

  useEffect(() => {
    fetch("/api/me")
    .then((res:any) => {
      if (res.status === 200){
        return res.json();
      } else {
        throw new Error();
      }
    }) 
    .then((data:any) => {
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setAvatar(data.avatar_url);
      setYear(data.year);
    })
    .catch((err: any) => {
      console.log("Could not verify your session.");
      history.push("/");
    });
  }, []);

  return (
    <div className="home-page-header-container">
      <div
        className="home-page-header-logo-container"
        onClick={() => history.push("/home")}
      >
        <div className="home-page-header-logo"></div>
        <p className="home-page-header-logo-text">
          <span style={{ color: "white" }}>S</span>cribe
        </p>
      </div>
      {showSearch && (
        <div className="home-page-header-search-bar">
          <FontAwesomeIcon icon="search" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          ></input>
        </div>
      )}

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
          <div className="home-page-header-avatar-image" style={{backgroundImage: `url("${avatar}")`}}></div>
          <div className="home-page-header-avatar-drop-name">
            {`${firstName} ${lastName}`}
            <p>{numberToYearStr[year]} Year</p>
          </div>
          <div
            className="home-page-header-avatar-drop-settings"
            onClick={() => history.push("/settings")}
          >
            Settings
          </div>
          <a href="/logout">
            <div className="home-page-header-avatar-drop-logout">Logout</div>
          </a>
        </div>
      </CSSTransition>
    </div>
  );
};
