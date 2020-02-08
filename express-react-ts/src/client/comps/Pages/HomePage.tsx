import React, { Fragment } from "react";
import "../../scss/home/home";
import { HomeHeader } from "../SubComponents/Home/HomeHeader";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <Fragment>
      <div className="home-page-outermost">
        <HomeHeader />
      </div>
    </Fragment>
  );
};
