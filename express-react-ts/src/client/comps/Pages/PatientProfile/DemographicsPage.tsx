import React, { useEffect, useReducer } from "react";
import "../../../scss/patient-profiles/demographics.scss";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { FormGroup } from "../../SubComponents/Login/FormGroup";
import "../../../scss/login/inputboxes.scss";

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
    case "":
      return {
        ...state,
      };

    default:
      throw new Error("Invalid type on action.");
  }
}

type DemographicsState = {
  firstName: string;
  lastName: string;
  sex: "M" | "F" | null;
  isPregnant: boolean | null;
  country: string | null;
};

const initialState: DemographicsState = {
  firstName: "",
  lastName: "",
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

  const { firstName, lastName, sex, isPregnant, country } = state;

  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <div className="demographics-page-outermost-container patient-profile-window"
        style={{ width: isShowingSidebar ? "calc(100% - 250px)" : "100%" }}>
          <div className="patient-profile-small-container">
            <div className="patient-profile-page-title">
              <h1>{pageName}</h1>
            </div>
            <div className="login-container">
              <form className="demographics-form">
                <FormGroup
                  dispatch={dispatch}
                  id="demographics-page-first-name-input"
                  label="First Name"
                  name="firstName"
                  type="text"
                  value={firstName}
                />
                <FormGroup
                  dispatch={dispatch}
                  id="demographics-page-last-name-input"
                  label="Surname"
                  name="lastName"
                  type="text"
                  value={lastName}
                />
                <FormGroup
                  dispatch={dispatch}
                  id="demographics-page-country-input"
                  label="Country of Residence or Recently Visited"
                  name="country"
                  type="text"
                  value={country}
                />
              </form>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
