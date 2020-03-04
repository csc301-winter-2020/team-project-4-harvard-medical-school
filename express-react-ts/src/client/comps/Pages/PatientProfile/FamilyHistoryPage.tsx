import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { useHistory } from "react-router";

function reducer(
  state: Family_Hist_State,
  action: { type: string; fieldName?: string; value?: string; newState?: {[key: string]: string |boolean|number|null}}
): Family_Hist_State {
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
    default:
      throw new Error("Invalid type on action.");
  }
}

type Family_Hist_State = {
  familyHist: string;
}

const initialState: Family_Hist_State = {
  familyHist: "",
};

export const FamilyHistoryPage: IndividualPatientProfile = ({
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
      history.push(`/patient/${patientID}/family`);

      // Get request
      const url = '/api/patientprofile/' + patientID;
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((jsonResult) => {
          console.log("Get Family History")
          console.log(jsonResult)
          dispatch({ type: "many_fields", newState:{
            "familyHist": jsonResult.family_history}});

        }).catch((error) => {
          console.log("An error occured with fetch:", error)
        });
    }
  }, [currentPage]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingFamilyHistCanvas, setShowingFamilyHistCanvas] = useState(true);
  const [showingFamilyHistText, setShowingFamilyHistText] = useState(false);

  const { familyHist } = state;

  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <div className={ isShowingSidebar ? "patient-profile-window" : "patient-profile-window width-100"}>
          <div className="patient-profile-page-title">
            <h2>{pageName}</h2>
          </div>
          <div className="patient-profile-form-container">
            <PatientFormInput
              dispatch={dispatch}
              id={"familyHist"}
              inputType={"text"}
              inputVal={familyHist}
              placeholder={`Enter text here`}
              title={"Family History"}
              isShowingCanvas={showingFamilyHistCanvas}
              isShowingText={showingFamilyHistText}
              setIsShowingCanvas={setShowingFamilyHistCanvas}
              setIsShowingText={setShowingFamilyHistText}
              canvasHeight={700}
              canvasWidth={600}
              isTextArea={true}
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
