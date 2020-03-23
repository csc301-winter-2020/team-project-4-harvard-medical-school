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
import { Class } from "../../utils/types";
import { Template } from "./TemplatesPage";

interface HomePageProps {
  classID: number;
}

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
  class_id: number;
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

export const HomePage: React.FC<HomePageProps> = ({ classID }) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { nameSort, createdSort, lastModifiedSort, changed } = state;
  const [searchVal, setSearchVal] = useState("");
  const [allPatients, setAllPatients] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPatientPopup, setNewPatientPopup] = useState(false);
  const [currentClass, setCurrentClass] = useState<Class>(null);
  const [instrFirstName, setInstrFirstName] = useState<string>(null);
  const [instrLastName, setInstrLastName] = useState<string>(null);
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState(null);

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
        setUser(data);
        return fetch(`/api/studentHomepage/${data.id}`);
      })
      .then((res: any) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("res.status not 200");
        }
      })
      .then((data: any[]) => {
        const patientsListNew: PatientProfile[] = [];
        // TODO: some fields don't have the right data
        console.log(data);
        console.log(classID);
        data.forEach(d => {
          if (d.class_id === Number(classID)) {
            patientsListNew.push({
              title: "Patient" + d.id,
              date: now(),
              lastModified: d.last_modified,
              firstName: d.first_name,
              lastName: d.family_name,
              sex: d.gender,
              isPregnant: d.gender === "Male" ? null : d.pregnant,
              age: d.age,
              country: d.country_residence,
              patientID: d.id,
              class_id: d.class_id,
            });
          }
        });
        setAllPatients(patientsListNew);
        setPatientsList(patientsListNew);
        return fetch(`/api/classes/${classID}`);
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("did not find that class in the DB");
        }
      })
      .then((data: any) => {
        setCurrentClass({
          help_enabled: data[0].help_enabled,
          id: data[0].id,
          instructor_id: data[0].instructor_id,
          name: data[0].name,
        });
        setInstrFirstName(data[0].first_name);
        setInstrLastName(data[0].last_name);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log("Could not verify your session.");
        console.log(err);
        history.push("/err/500/Please try again.");
      });
  }, []);

  useEffect(() => {
    if (user === null) {
      console.log("null user.");
    } else {
      fetch(`/api/student/${user.id}/templates`)
        .then((res: Response) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Failed to fetch user templates.");
          }
        })
        .then((data: any) => {
          const newTemplates: Template[] = [];
          data.forEach((t: any) => {
            t.template = JSON.parse(t.template);
            t.text = t.template_name;
            t.key = t.template_id;
            t.value = t.template_id;
            newTemplates.push(t);
          });
          console.log(newTemplates);
          setTemplates(newTemplates);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [user]);

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
          <p style={{ marginLeft: "10px" }}>
            Current Class:{" "}
            {currentClass === null
              ? "No Class Selected"
              : `${currentClass.name} - Instructed by ${instrLastName}, ${instrFirstName}.`}
          </p>
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
                  date={p.date}
                  lastModified={p.lastModified}
                  sex={p.sex}
                  age={p.age}
                  country={p.country}
                  isPregnant={p.isPregnant}
                  patientID={p.patientID}
                  isInstructorView={false}
                  givenFinalDiagnosis={null}
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
            templates={templates}
            user={user}
            history={history}
            setShowNewPatientPopup={setNewPatientPopup}
            classID={Number(classID)}
          />
        )}
      </div>
    </Fragment>
  );
};
