import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HomeHeaderProps {}

export const HomeHeader: React.FC<HomeHeaderProps> = ({}) => {
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
        <input type="text"></input>
      </div>
      <div className="home-page-header-user-avatar"></div>
    </div>
  );
};
