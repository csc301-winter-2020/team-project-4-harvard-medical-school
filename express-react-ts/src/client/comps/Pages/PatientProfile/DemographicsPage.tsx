import React, { useEffect, useReducer, useState } from "react";
import "../../../scss/patient-profiles/patient-profile-form.scss";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import "../../../scss/login/inputboxes.scss";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";

function reducer(
  state: DemographicsState,
  action: { type: string; fieldName?: string; value?: string; newState?: {[key: string]: string |boolean|number|null} }
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
        sex: "M",
        isPregnant: null,
      };
    case "FEMALE":
      return {
        ...state,
        sex: "F",
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
  lastName: string;
  sex: "M" | "F" | null;
  age: string;
  isPregnant: "Y" | "N" | "UNSURE" | null;
  country: string | null;
};

const initialState: DemographicsState = {
  firstName: "",
  lastName: "",
  age: "",
  sex: null,
  isPregnant: null,
  country: "",
};

async function postData(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual
    referrerPolicy: 'no-referrer', // no-referrer
    body: JSON.stringify(data)
  });
  return await response.json();
}

async function saveData(url: string, state: DemographicsState) {
  console.log(state)
  try {
    const res = await postData(url, allAttributes);
    console.log("Saved " + state);
  } catch (err) {
    console.log("Error: " + err);
  }
}

var allAttributes: any;

export const DemographicsPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      if (!window.location.href.includes("demographics")) {
        history.push(`/patient/${patientID}/demographics`);
        
        // Get request
        const url = '/api/patientprofile/' + patientID;
        fetch(url)
          .then((res) => {
            return res.json()
          })
          .then((jsonResult) => {
            console.log("Get Demographics")
            console.log(jsonResult)
            dispatch({ type: "many_fields", newState:{
              "firstName": jsonResult.first_name, 
              "lastName": jsonResult.family_name, 
              "sex": jsonResult.gender_at_birth, 
              "age": jsonResult.age, 
              "isPregnant": jsonResult.pregnant, 
              "country": jsonResult.country_residence}});

          }).catch((error) => {
            console.log("An error occured with fetch:", error)
          });
      }
    }
  }, [currentPage]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showingFirstNameCanvas, setShowingFirstNameCanvas] = useState(true);
  const [showingFirstNameText, setShowingFirstNameText] = useState(false);
  const [showingLastNameCanvas, setShowingLastNameCanvas] = useState(true);
  const [showingLastNameText, setShowingLastNameText] = useState(false);
  const [showingAgeCanvas, setShowingAgeCanvas] = useState(true);
  const [showingAgeText, setShowingAgeText] = useState(false);
  const [showingCountryCanvas, setShowingCountryCanvas] = useState(true);
  const [showingCountryText, setShowingCountryText] = useState(false);

  const { firstName, lastName, sex, age, isPregnant, country } = state;

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
              isShowingCanvas={showingFirstNameCanvas}
              isShowingText={showingFirstNameText}
              setIsShowingCanvas={setShowingFirstNameCanvas}
              setIsShowingText={setShowingFirstNameText}
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
              isShowingCanvas={showingLastNameCanvas}
              isShowingText={showingLastNameText}
              setIsShowingCanvas={setShowingLastNameCanvas}
              setIsShowingText={setShowingLastNameText}
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
              isShowingCanvas={showingAgeCanvas}
              isShowingText={showingAgeText}
              setIsShowingCanvas={setShowingAgeCanvas}
              setIsShowingText={setShowingAgeText}
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
                  checked={sex === "M"}
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
                  checked={sex === "F"}
                  onChange={() => {
                    dispatch({ type: "FEMALE" });
                  }}
                />
                <p>Female</p>
              </label>
            </div>
            {sex === "F" && (
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
              isTextArea={false}
            />
          </div>
          <div className="form-whitespace">
            <div className="home-page-content-whitespace-logo"></div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
