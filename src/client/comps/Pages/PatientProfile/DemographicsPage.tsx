import React, { useEffect, useReducer, useState } from "react";
import "../../../scss/patient-profiles/patient-profile-form.scss";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  IndividualPatientProfile,
  fetchAllCanvases,
} from "./PatientProfilePage";
import "../../../scss/login/inputboxes.scss";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { postData } from "./PatientProfilePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { textInit, canvasInit } from "../../../utils/utils";
import { toast } from "react-toastify";
import { MyToast } from "../../../utils/types";

function reducer(
  state: DemographicsState,
  action: {
    type: string;
    fieldName?: string;
    value?: string;
    newState?: { [key: string]: string | boolean | number | null };
  }
): DemographicsState {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.fieldName]: action.value,
      };
    case "many_fields":
      return {
        ...state,
        ...action.newState,
      };
    case "MALE":
      return {
        ...state,
        sex: "Male",
        isPregnant: null,
      };
    case "FEMALE":
      return {
        ...state,
        sex: "Female",
      };
    case "PREGNANT":
      return {
        ...state,
        isPregnant: "Y",
      };
    case "NOT_PREGNANT":
      return {
        ...state,
        isPregnant: "N",
      };
    case "UNSURE_PREGNANT":
      return {
        ...state,
        isPregnant: "UNSURE",
      };
    default:
      throw new Error("Invalid type on action.");
  }
}

type DemographicsState = {
  firstName: string;
  firstNameCanvas?: string;
  lastName: string;
  lastNameCanvas?: string;
  sex: "Male" | "Female" | null;
  age: string;
  ageCanvas?: string;
  isPregnant: "Y" | "N" | "UNSURE" | null;
  country: string | null;
  countryCanvas?: string;
};

const initialState: DemographicsState = {
  firstName: "",
  lastName: "",
  age: "",
  sex: null,
  isPregnant: null,
  country: "",
};

var allAttributes: any;

export const DemographicsPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
  defaultMode,
  setIsLoading,
  classID,
  userType,
}) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastState, setLastState] = useState(state);
  const [showingCountryCanvas, setShowingCountryCanvas] = useState(true);
  const [showingCountryText, setShowingCountryText] = useState(false);

  const {
    firstName,
    lastName,
    sex,
    age,
    isPregnant,
    country,
    countryCanvas,
  } = state;

  const myToast: MyToast = toast as any;

  async function saveData(url: string, state: DemographicsState) {
    console.log(state);
    allAttributes.first_name = state.firstName;
    if (state.firstNameCanvas !== undefined)
      allAttributes.first_name_canvas = state.firstNameCanvas;
    allAttributes.family_name = state.lastName;
    if (state.lastNameCanvas !== undefined)
      allAttributes.family_name_canvas = state.lastNameCanvas;
    allAttributes.age = state.age;
    if (state.ageCanvas !== undefined)
      allAttributes.age_canvas = state.ageCanvas;
    allAttributes.gender = state.sex;
    allAttributes.pregnant = state.isPregnant;
    allAttributes.country_residence = state.country;
    if (state.countryCanvas !== undefined)
      allAttributes.country_residence_canvas = state.countryCanvas;
    allAttributes.class_id = classID;
    console.log("ALL ATTRIBUTES");
    console.log(allAttributes);
    const res = await postData(url, allAttributes);
    return await res.message;
  }

  useEffect(() => {
    if (lastState === initialState) {
      setLastState(state);
      return;
    }

    const timer = setTimeout(() => {
      if (userType === "Student" && currentPage == pageName && state && state !== lastState) {
        console.log(lastState);
        console.log(state);

        saveData("/api/patientprofile/" + patientID, state)
          .then(data => {
            console.log(data);
            myToast.success("Autosaved.", {
              autoClose: 1000,
            });
          })
          .catch(err => {
            myToast.warn("Autosave failed.");
          });

        setLastState(state);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [state, lastState]);

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);
    setShowingCountryCanvas(canvasShow);
    setShowingCountryText(textShow);
  }, [defaultMode]);

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;

      history.push(`/patient/${patientID}/demographics`);
      setIsLoading(true);
      // Get request
      const url = "/api/patientprofile/" + patientID;
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(jsonResult => {
          console.log("Get Demographics");
          console.log(jsonResult);

          return fetchAllCanvases(jsonResult);
        })
        .then(jsonResult => {
          allAttributes = jsonResult;

          dispatch({
            type: "many_fields",
            newState: {
              firstName: jsonResult.first_name,
              firstNameCanvas: jsonResult.first_name_canvas,
              lastName: jsonResult.family_name,
              lastNameCanvas: jsonResult.last_name_canvas,
              sex: jsonResult.gender,
              age: jsonResult.age,
              ageCanvas: jsonResult.age_canvas,
              isPregnant: jsonResult.pregnant,
              country: jsonResult.country_residence,
              countryCanvas: jsonResult.country_residence_canvas,
            },
          });
        })
        .catch(error => {
          console.log("An error occured with fetch:", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [currentPage]);

  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <div
          className={
            isShowingSidebar
              ? "patient-profile-window"
              : "patient-profile-window width-100"
          }
        >
          <div className="patient-profile-page-title">
            <h2>{pageName}</h2>
          </div>
          <div className="patient-profile-form-container">
            <PatientFormInput
              dispatch={dispatch}
              id={"firstName"}
              inputType={"text"}
              inputVal={firstName}
              placeholder={"Ex. John"}
              title={"First Name"}
              isShowingCanvas={false}
              isShowingText={true}
              setIsShowingCanvas={() => {}}
              setIsShowingText={() => {}}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={false}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"lastName"}
              inputType={"text"}
              inputVal={lastName}
              placeholder={"Ex. Doe"}
              title={"Last Name"}
              isShowingCanvas={false}
              isShowingText={true}
              setIsShowingCanvas={() => {}}
              setIsShowingText={() => {}}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={false}
            />
            <PatientFormInput
              dispatch={dispatch}
              id={"age"}
              inputType={"number"}
              inputVal={age}
              placeholder={"Ex. 18"}
              title={"Age"}
              isShowingCanvas={false}
              isShowingText={true}
              setIsShowingCanvas={() => {}}
              setIsShowingText={() => {}}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={false}
            />
            <h3>Sex at Birth</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="sex"
                  checked={sex === "Male"}
                  onChange={() => {
                    dispatch({ type: "MALE" });
                  }}
                />
                <p>Male</p>
              </label>

              <label>
                <input
                  type="radio"
                  name="sex"
                  checked={sex === "Female"}
                  onChange={() => {
                    dispatch({ type: "FEMALE" });
                  }}
                />
                <p>Female</p>
              </label>
            </div>
            {sex === "Female" && (
              <>
                <h3>Pregnant?</h3>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="pregnant"
                      checked={isPregnant === "Y"}
                      onChange={() => {
                        dispatch({ type: "PREGNANT" });
                      }}
                    />
                    <p>Yes</p>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="pregnant"
                      checked={isPregnant === "N"}
                      onChange={() => {
                        dispatch({ type: "NOT_PREGNANT" });
                      }}
                    />
                    <p>No</p>
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="pregnant"
                      checked={isPregnant === "UNSURE"}
                      onChange={() => {
                        dispatch({ type: "UNSURE_PREGNANT" });
                      }}
                    />
                    <p>Unsure</p>
                  </label>
                </div>
              </>
            )}
            <PatientFormInput
              dispatch={dispatch}
              id={"country"}
              inputType={"text"}
              inputVal={country}
              placeholder={"Ex. Canada"}
              title={"Country of Origin or Recently Visited"}
              isShowingCanvas={showingCountryCanvas}
              isShowingText={showingCountryText}
              setIsShowingCanvas={setShowingCountryCanvas}
              setIsShowingText={setShowingCountryText}
              canvasHeight={200}
              canvasWidth={600}
              canvasData={countryCanvas}
              isTextArea={false}
            />
          </div>
          <div className="form-whitespace">
            <div className="home-page-content-whitespace-logo"></div>
          </div>
          {userType === "Student" && (
            <div className="patient-profile-nav-btns">
              <div
                className="nav-btn"
                style={{
                  right: "20px",
                  top: "70px",
                  position: "fixed",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  // TODO : add POST request function here
                  saveData("/api/patientprofile/" + patientID, state)
                    .then(data => {
                      console.log(data);
                      myToast.success("Information saved");
                    })
                    .catch(err => {
                      myToast.success("Information could not be saved");
                    });
                }}
              >
                <FontAwesomeIcon icon="save" size="2x" />
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );
};
