import React, { Fragment, useState, useReducer, useEffect } from "react";
import "../../scss/home/home";
import { Header } from "../SubComponents/Header";
import { HomePatientProfile } from "../SubComponents/Home/HomePatientProfile";
import { NewPatient } from "../SubComponents/Home/NewPatient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { now, max } from "../../utils/utils";
import { useHistory } from "react-router";
import { HelixLoader } from "../SubComponents/HelixLoader";
import { ToastContainer, toast } from "react-toastify";

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
  isPregnant: string | null;
  patientID: number;
};

type HomePageState = {
  nameSort: null | "ASC" | "DESC";
  createdSort: null | "ASC" | "DESC";
  lastModifiedSort: null | "ASC" | "DESC";
  changed: boolean;
};

const initialState: HomePageState = {
  nameSort: null,
  createdSort: null,
  lastModifiedSort: "DESC",
  changed: true,
};

function reducer(
  state: HomePageState,
  action: {
    type: "NAME_SORT" | "CREATED_SORT" | "LAST_MODIFIED_SORT" | "CHANGED";
  }
): HomePageState {
  switch (action.type) {
    case "NAME_SORT":
      return {
        nameSort:
          state.nameSort == "ASC" || state.nameSort == null ? "DESC" : "ASC",
        createdSort: null,
        lastModifiedSort: null,
        changed: true,
      };
    case "CREATED_SORT":
      return {
        nameSort: null,
        createdSort:
          state.createdSort == "ASC" || state.createdSort == null
            ? "DESC"
            : "ASC",
        lastModifiedSort: null,
        changed: true,
      };
    case "LAST_MODIFIED_SORT":
      return {
        nameSort: null,
        createdSort: null,
        lastModifiedSort:
          state.lastModifiedSort == "ASC" || state.lastModifiedSort == null
            ? "DESC"
            : "ASC",
        changed: true,
      };
    case "CHANGED":
      return {
        nameSort: state.nameSort,
        createdSort: state.createdSort,
        lastModifiedSort: state.lastModifiedSort,
        changed: false,
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
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { nameSort, createdSort, lastModifiedSort, changed } = state;
  const [searchVal, setSearchVal] = useState("");
  const [allPatients, setAllPatients] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPatientPopup, setNewPatientPopup] = useState(false);

  const history = useHistory();

  useEffect(() => {
    document.title = "Scribe: Home";
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    fetch("/api/me")
      .then((res: any) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("api me status not 200");
        }
      })
      .then((data: any) => {
        console.log(data);
        return fetch(`/api/studentHomepage/${data.id}`);
      })
      .then((res: any) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("res.status not 200");
        }
      })
      .then((data: any) => {
        const patientsListNew: PatientProfile[] = [];
        console.log(data);
        // TODO: some fields don't have the right data
        for (let i = 0; i < data.length; i++) {
          patientsListNew.push({
            title: "Patient" + data[i].id,
            date: now(),
            lastModified: data[i].last_modified,
            firstName: data[i].first_name,
            lastName: data[i].family_name,
            sex: data[i].gender,
            isPregnant: data[i].gender === "Male" ? null : data[i].pregnant,
            age: data[i].age,
            country: data[i].country_residence,
            patientID: data[i].id,
          });
        }
        setAllPatients(patientsListNew);
        setPatientsList(patientsListNew);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log("Could not verify your session.");
        console.log(err);
        history.push("/err/500/Please try again.");
      });
  }, []);

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

    if (changed) {
      dispatch({ type: "CHANGED" });
    }
  }, [nameSort, createdSort, lastModifiedSort]);

  useEffect(() => {
    if (searchVal !== "") {
      const newPatients = allPatients.filter(p => {
        return (
          p.firstName.toLowerCase().includes(searchVal.toLowerCase()) ||
          p.lastName.toLowerCase().includes(searchVal.toLowerCase()) ||
          `${p.lastName} ${p.firstName}`
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          `${p.firstName} ${p.lastName}`
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          `${p.firstName}, ${p.lastName}`
            .toLowerCase()
            .includes(searchVal.toLowerCase()) ||
          `${p.lastName}, ${p.firstName}`
            .toLowerCase()
            .includes(searchVal.toLowerCase())
        );
      });
      setPatientsList(newPatients);
    } else {
      setPatientsList(allPatients);
    }
  }, [searchVal]);

  function newPatient() {
    console.log("adding new patient");
    setNewPatientPopup(true);
  }

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
          placeholder={"Search Patients"}
          isAvatarPopup={isAvatarPopup}
          setIsAvatarPopup={setIsAvatarPopup}
          showSearch={true}
          searchValue={searchVal}
          setSearchValue={setSearchVal}
        />
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        {isLoading && <HelixLoader message="Loading Patients..." />}
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
            {patientsList.map((p, index) => {
              return (
                <HomePatientProfile
                  key={index}
                  isPortraitMode={windowWidth < 1080}
                  firstName={p.firstName}
                  lastName={p.lastName}
                  title={p.title}
                  date={p.date}
                  lastModified={p.lastModified}
                  sex={p.sex}
                  age={p.age}
                  country={p.country}
                  isPregnant={p.isPregnant}
                  patientID={p.patientID}
                />
              );
            })}
            <div
              className="home-page-content-whitespace"
              style={{ height: max(window.innerHeight - 400, 0) }}
            >
              <div className="home-page-content-whitespace-logo"></div>
            </div>
          </div>
          <div className="home-page-create-new-patient-btn">
            <p onClick={newPatient}>Add Patient</p>
          </div>
          <div
            className="home-page-create-template-btn"
            onClick={() => {
              history.push("/templates");
            }}
          >
            <p>Template Editor</p>
          </div>
        </div>

        {showNewPatientPopup && (
          <NewPatient
            history={history}
            setShowNewPatientPopup={setNewPatientPopup}
          ></NewPatient>
        )}
      </div>
    </Fragment>
  );
};