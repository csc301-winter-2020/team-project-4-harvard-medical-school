import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { useHistory } from "react-router";

function reducer(
  state: CCHPI_State,
  action: { type: string; fieldName?: string; value?: string }
): CCHPI_State {
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

type CCHPI_State = {
  chiefComplaint: string;
  HPI: string;
};

const initialState: CCHPI_State = {
  chiefComplaint: "",
  HPI: "",
};

export const CCHPIPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID
}) => {
  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/cchpi`);
    }
  }, [currentPage]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingChiefComplaintCanvas, setShowingChiefComplaintCanvas] = useState(true);
  const [showingChiefComplaintText, setShowingChiefComplaintText] = useState(false);

  const [showingHPICanvas, setShowingHPICanvas] = useState(true);
  const [showingHPIText, setShowingHPIText] = useState(false);

  const { chiefComplaint, HPI } = state;

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
              id={"chiefComplaint"}
              inputType={"text"}
              inputVal={chiefComplaint}
              placeholder={`Enter text here`}
              title={"Chief Complaint"}
              isShowingCanvas={showingChiefComplaintCanvas}
              isShowingText={showingChiefComplaintText}
              setIsShowingCanvas={setShowingChiefComplaintCanvas}
              setIsShowingText={setShowingChiefComplaintText}
              canvasHeight={600}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"HPI"}
              inputType={"text"}
              inputVal={HPI}
              placeholder={`Enter text here`}
              title={"History of Present Illness"}
              isShowingCanvas={showingHPICanvas}
              isShowingText={showingHPIText}
              setIsShowingCanvas={setShowingHPICanvas}
              setIsShowingText={setShowingHPIText}
              canvasHeight={600}
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