import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { useHistory } from "react-router";

function reducer(
  state: Assessment_State,
  action: { type: string; fieldName?: string; value?: string }
): Assessment_State {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.fieldName]: action.value,
      };
    default:
      throw new Error("Invalid type on action.");
  }
}

type Assessment_State = {
  assessment: string;
}

const initialState: Assessment_State = {
  assessment: "",
};

export const AssessmentAndPlanPage: IndividualPatientProfile = ({
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
    if (currentPage === pageName){
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/assessment`);
    }
  }, [currentPage]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingAssessmentCanvas, setShowingAssessmentCanvas] = useState(true);
  const [showingAssessmentText, setShowingAssessmentText] = useState(false);

  const { assessment } = state;

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
              id={"assessment"}
              inputType={"text"}
              inputVal={assessment}
              placeholder={`Enter text here`}
              title={"Assessment and Plan"}
              isShowingCanvas={showingAssessmentCanvas}
              isShowingText={showingAssessmentText}
              setIsShowingCanvas={setShowingAssessmentCanvas}
              setIsShowingText={setShowingAssessmentText}
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
