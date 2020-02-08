import React, { Fragment } from "react";
import "../../scss/home/home";
import { HomeHeader } from "../SubComponents/Home/HomeHeader";
import { HomePatientProfile } from "../SubComponents/Home/HomePatientProfile";

interface HomePageProps {}

type PatientProfile = {
  title: string;
};

export const HomePage: React.FC<HomePageProps> = ({}) => {
  // Dummy data while we dont have API calls
  const patients: PatientProfile[] = [
    { title: "Patient1" },
    { title: "Patient2" },
    { title: "Patient3" }
  ];
  return (
    <Fragment>
      <div className="home-page-outermost">
        <HomeHeader />
        <div className="home-page-content">
          {patients.map(p => {
            return <HomePatientProfile title={p.title} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};
