import React, { Fragment, useState, useReducer, useEffect } from "react";
import "../../scss/home/home";
import { Header } from "../SubComponents/Header";
import { HomePatientProfile } from "../SubComponents/Home/HomePatientProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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

type HomePageState = {
  nameSort: null | "ASC" | "DESC";
  createdSort: null | "ASC" | "DESC";
  lastModifiedSort: null | "ASC" | "DESC";
};

const initialState: HomePageState = {
  nameSort: null,
  createdSort: null,
  lastModifiedSort: "DESC",
};

function reducer(
  state: HomePageState,
  action: { type: "NAME_SORT" | "CREATED_SORT" | "LAST_MODIFIED_SORT" }
): HomePageState {
  switch (action.type) {
    case "NAME_SORT":
      return {
        nameSort:
          state.nameSort == "ASC" || state.nameSort == null ? "DESC" : "ASC",
        createdSort: null,
        lastModifiedSort: null,
      };
    case "CREATED_SORT":
      return {
        nameSort: null,
        createdSort:
          state.createdSort == "ASC" || state.createdSort == null
            ? "DESC"
            : "ASC",
        lastModifiedSort: null,
      };
    case "LAST_MODIFIED_SORT":
      return {
        nameSort: null,
        createdSort: null,
        lastModifiedSort:
          state.lastModifiedSort == "ASC" || state.lastModifiedSort == null
            ? "DESC"
            : "ASC",
      };
    default:
      throw new Error("Invalid type on action.");
  }
}

const nameSorterAsc = (a: PatientProfile, b: PatientProfile) => {
  return a.lastName.toUpperCase() < b.lastName.toUpperCase() ? 1 : -1;
};
const nameSorterDesc = (a: PatientProfile, b: PatientProfile) => {
  return a.lastName.toUpperCase() > b.lastName.toUpperCase() ? 1 : -1;
};
const createdSorterAsc = (a: PatientProfile, b: PatientProfile) => {
  return a.date < b.date ? 1 : -1;
};
const createdSorterDesc = (a: PatientProfile, b: PatientProfile) => {
  return a.date > b.date ? 1 : -1;
};
const lastModSorterAsc = (a: PatientProfile, b: PatientProfile) => {
  return a.lastModified < b.lastModified ? 1 : -1;
};
const lastModSorterDesc = (a: PatientProfile, b: PatientProfile) => {
  return a.lastModified > b.lastModified ? 1 : -1;
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { nameSort, createdSort, lastModifiedSort } = state;
  const [patientsList, setPatientsList] = useState(patients);

  useEffect(() => {
    if (nameSort !== null) {
      if (nameSort === "ASC") {
        setPatientsList(patientsList.sort(nameSorterAsc));
      } else {
        setPatientsList(patientsList.sort(nameSorterDesc));
      }
    } else if (createdSort !== null) {
      if (createdSort === "ASC") {
        setPatientsList(patientsList.sort(createdSorterAsc));
      } else {
        setPatientsList(patientsList.sort(createdSorterDesc));
      }
    } else if (lastModifiedSort !== null) {
      if (lastModifiedSort === "ASC") {
        setPatientsList(patientsList.sort(lastModSorterAsc));
      } else {
        setPatientsList(patientsList.sort(lastModSorterDesc));
      }
    } else {
      console.log(`All sorts are null. Something has gone wrong!`);
      setPatientsList(patientsList.sort(lastModSorterDesc));
    }
  }, [nameSort, createdSort, lastModifiedSort]);

  return (
    <Fragment>
      <div
        className="home-page-outermost"
        onClick={(e: any) => {
          if (
            isAvatarPopup &&
            !e.target.className.includes("home-page-header-avatar")
          ) {
            setIsAvatarPopup(false);
          }
        }}
      >
        <Header
          isAvatarPopup={isAvatarPopup}
          setIsAvatarPopup={setIsAvatarPopup}
          showSearch={true}
        />
        <div className="home-page-content-container">
          <div className="home-page-your-patients-title">Your Patients</div>
          <div className="home-page-separator-line"></div>
          <div className="home-page-patient-header-grid">
            <p
              className="home-page-patient-header-grid-name-col"
              onClick={() => {
                dispatch({ type: "NAME_SORT" });
              }}
            >
              Name
              {nameSort == null || nameSort == "ASC" ? (
                <FontAwesomeIcon icon="chevron-up" />
              ) : (
                <FontAwesomeIcon icon="chevron-down" />
              )}
            </p>
            <p
              className="home-page-patient-header-grid-created-col"
              onClick={() => {
                dispatch({ type: "CREATED_SORT" });
              }}
            >
              Created
              {createdSort == null || createdSort == "ASC" ? (
                <FontAwesomeIcon icon="chevron-up" />
              ) : (
                <FontAwesomeIcon icon="chevron-down" />
              )}
            </p>
            <p
              className="home-page-patient-header-grid-last-modified-col"
              onClick={() => {
                dispatch({ type: "LAST_MODIFIED_SORT" });
              }}
            >
              Last Modified
              {lastModifiedSort == null || lastModifiedSort == "ASC" ? (
                <FontAwesomeIcon icon="chevron-up" />
              ) : (
                <FontAwesomeIcon icon="chevron-down" />
              )}
            </p>
          </div>
          <div className="home-page-content">
            {patientsList.map(p => {
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
            <div
              className="home-page-content-whitespace"
              style={{ height: window.innerHeight - 400 }}
            >
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
