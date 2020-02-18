import React, { Fragment, useState } from "react";
import "../../scss/home/home";
import { HomeHeader } from "../SubComponents/Home/HomeHeader";
import { HomePatientProfile } from "../SubComponents/Home/HomePatientProfile";

interface HomePageProps {}

type PatientProfile = {
  title: string;
  age: number;
  country: string;
  date: number;
  lastModified: number;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: number;
  isPregnant: string | null;
  ethnicity: string;
};

export const HomePage: React.FC<HomePageProps> = ({}) => {
  // Dummy data while we dont have API calls
  const patients: PatientProfile[] = [
    {
      title: "Patient1",
      date: 456789456,
      lastModified: 456999456,
      firstName: "Joe",
      lastName: "Smith",
      sex: "M",
      dateOfBirth: 456789456,
      isPregnant: null,
      ethnicity: "Caucasian",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient2",
      date: 100123456789456,
      lastModified: 1123456999456,
      firstName: "Selina",
      lastName: "Kyle",
      sex: "F",
      dateOfBirth: 4565456789456,
      isPregnant: "No",
      ethnicity: "Caucasian",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient3",
      date: 200123456789456,
      lastModified: 123456999456,
      firstName: "Pamela",
      lastName: "Beesly",
      sex: "F",
      dateOfBirth: 987456789456,
      isPregnant: "Yes",
      ethnicity: "Caucasian",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient4",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Chun",
      lastName: "Li",
      sex: "F",
      dateOfBirth: 987456789456,
      isPregnant: "No",
      ethnicity: "Chinese",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient5",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Ken",
      lastName: "Masters",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Caucasian",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient6",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Davina",
      lastName: "Choi",
      sex: "F",
      dateOfBirth: 987456789456,
      isPregnant: "Don't Know",
      ethnicity: "Korean",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient7",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Johnny",
      lastName: "Cage",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Caucasian",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient8",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Heavy",
      lastName: "WeaponsGuy",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "East European",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient9",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Sylvanas",
      lastName: "Windrunner",
      sex: "F",
      dateOfBirth: 987456789456,
      isPregnant: "No",
      ethnicity: "Elven",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
    {
      title: "Patient10",
      date: 200123556789456,
      lastModified: 123456999456,
      firstName: "Garrosh",
      lastName: "Hellscream",
      sex: "M",
      dateOfBirth: 987456789456,
      isPregnant: null,
      ethnicity: "Orc",
      age: 20,
      country: "Canada",
    },
  ];
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  return (
    <Fragment>
      <div className="home-page-outermost" onClick={(e:any) => {
          if (isAvatarPopup && !e.target.className.includes("home-page-header-avatar")){
            setIsAvatarPopup(false);
          }
        }}>
        <HomeHeader isAvatarPopup={isAvatarPopup} setIsAvatarPopup={setIsAvatarPopup}/>
        <div className="home-page-content-container">
          <div className="home-page-your-patients-title">Your Patients</div>
          <div className="home-page-separator-line"></div>
          <div className="home-page-patient-header-grid">
            <p className="home-page-patient-header-grid-name-col">Name</p>
            <p className="home-page-patient-header-grid-created-col">Created</p>
            <p className="home-page-patient-header-grid-last-modified-col">
              Last Modified
            </p>
          </div>
          <div className="home-page-content">
            {patients.map(p => {
              return (
                <HomePatientProfile
                  firstName={p.firstName}
                  lastName={p.lastName}
                  title={p.title}
                  date={p.date}
                  lastModified={p.lastModified}
                  sex={p.sex}
                  dateOfBirth={p.dateOfBirth}
                  age={p.age}
                  country={p.country}
                  isPregnant={p.isPregnant}
                  ethnicity={p.ethnicity}
                />
              );
            })}
            <div className="home-page-content-whitespace" style={{height: (window.innerHeight - 400)}}>
            <div className="home-page-content-whitespace-logo"></div>
            </div>
          </div>
          <div className="home-page-create-new-patient-btn">
            <p>Add Patient</p>
          </div>
          <div className="home-page-create-template-btn">
            <p>Add/Customize Template</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
