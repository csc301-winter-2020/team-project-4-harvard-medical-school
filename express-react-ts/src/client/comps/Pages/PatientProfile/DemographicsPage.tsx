import React, { useEffect, useReducer, useState } from "react";
import "../../../scss/patient-profiles/demographics.scss";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { CanvasComp } from "../../SubComponents/CanvasComp";
import "../../../scss/login/inputboxes.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CanvasTextToggleButtons } from "../../SubComponents/PatientProfile/CanvasTextToggleButtons";

function reducer(
  state: DemographicsState,
  action: { type: string; fieldName?: string; value?: string }
): DemographicsState {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.fieldName]: action.value,
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
  middleName: string;
  sex: "M" | "F" | null;
  age: string;
  isPregnant: "Y" | "N" | "UNSURE" | null;
  country: string | null;
};

const initialState: DemographicsState = {
  firstName: "",
  middleName: "",
  lastName: "",
  age: "",
  sex: null,
  isPregnant: null,
  country: "",
};

export const DemographicsPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
}) => {
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
    }
  }, [currentPage]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showingFirstNameCanvas, setShowingFirstNameCanvas] = useState(true);
  const [showingFirstNameText, setShowingFirstNameText] = useState(false);

  const {
    firstName,
    middleName,
    lastName,
    sex,
    age,
    isPregnant,
    country,
  } = state;

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
          className="demographics-page-outermost-container patient-profile-window"
          style={{ width: isShowingSidebar ? "calc(100% - 250px)" : "100%"}}
        >
          <div className="patient-profile-page-title">
            <h1>{pageName}</h1>
          </div>
          <div className="demographics-form-container">
            <h3>First Name</h3>
            <CanvasTextToggleButtons 
            isShowingCanvas={showingFirstNameCanvas}
            setIsShowingCanvas={setShowingFirstNameCanvas} 
            isShowingText={showingFirstNameText}
            setIsShowingText={setShowingFirstNameText}
            />
            {showingFirstNameCanvas && (
              <CanvasComp
                id="firstName"
                initialHeight={200}
                initialWidth={600}
              />
            )}
            {showingFirstNameText && (
              <input
                value={firstName}
                type="text"
                name="firstName"
                onChange={e =>
                  dispatch({
                    type: "field",
                    fieldName: e.target.name,
                    value: e.target.value,
                  })
                }
              />
            )}
            <div className="form-spacer"></div>
            <h3>Middle Name</h3>
            <input
              value={middleName}
              type="text"
              name="middleName"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: e.target.name,
                  value: e.target.value,
                })
              }
            ></input>
            <h3>Last Name</h3>
            <input
              value={lastName}
              type="text"
              name="lastName"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: e.target.name,
                  value: e.target.value,
                })
              }
            ></input>
            <h3>Age</h3>
            <input
              pattern="[0-9]*"
              value={age}
              type="number"
              name="age"
              min="0"
              step="1"
              max="120"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: e.target.name,
                  value: e.target.value,
                })
              }
            ></input>
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
            <h3>Country of Origin Or Recently Visited</h3>
            <CanvasComp
              id="country"
              initialHeight={200}
              initialWidth={600}
            />
            <input
              value={country}
              type="text"
              name="country"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: e.target.name,
                  value: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="form-whitespace">
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
