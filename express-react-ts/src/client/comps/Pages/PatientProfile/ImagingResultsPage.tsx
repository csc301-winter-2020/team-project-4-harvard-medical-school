import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { useHistory } from "react-router";

function reducer(
  state: ImagingResultsState,
  action: { type: string; fieldName?: string; value?: string }
): ImagingResultsState {
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

type ImagingResultsState = {
  imagingResults: string;
}

const initialState: ImagingResultsState = {
  imagingResults: "",
};

export const ImagingResultsPage: IndividualPatientProfile = ({
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
      history.push(`/patient/${patientID}/imaging`);
    }
  }, [currentPage]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingImagingResultsCanvas, setShowingImagingResultsCanvas] = useState(true);
  const [showingImagingResultsText, setShowingImagingResultsText] = useState(false);

  const { imagingResults } = state;

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
              id={"imagingResults"}
              inputType={"text"}
              inputVal={imagingResults}
              placeholder={`Enter text here`}
              title={"Copy impressions and findings of imaging reports here"}
              isShowingCanvas={showingImagingResultsCanvas}
              isShowingText={showingImagingResultsText}
              setIsShowingCanvas={setShowingImagingResultsCanvas}
              setIsShowingText={setShowingImagingResultsText}
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
