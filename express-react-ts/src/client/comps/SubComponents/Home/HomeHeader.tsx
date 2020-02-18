import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HomeHeaderProps {
  isAvatarPopup: boolean;
  setIsAvatarPopup: Function;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({isAvatarPopup, setIsAvatarPopup}) => {
  
  return (
    <div className="home-page-header-container">
      <div className="home-page-header-logo-container">
        <div className="home-page-header-logo"></div>
        <p className="home-page-header-logo-text">
          <span style={{ color: "white" }}>S</span>cribe
        </p>
      </div>
      <div className="home-page-header-search-bar">
        <FontAwesomeIcon icon="search" />
        <input type="text" placeholder="Search Patients"></input>
      </div>
      
      <div className="home-page-header-user-avatar" onClick={() => setIsAvatarPopup(!isAvatarPopup)}>

      </div>
      {isAvatarPopup && 
        <div className="home-page-header-avatar-popup-container">
          <div className="home-page-header-avatar-drop-name">
            Student Profile
          </div>
          <div className="home-page-header-avatar-drop-logout" onClick={() => window.location.href = "/logout"}>
            Logout
          </div>
        </div>}
    </div>
  );
};
