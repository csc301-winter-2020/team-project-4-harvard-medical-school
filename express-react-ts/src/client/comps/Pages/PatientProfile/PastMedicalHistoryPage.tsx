import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

function reducer(
  state: PMH_State,
  action: { type: string; fieldName?: string; value?: string; newState?: {[key: string]: string |boolean|number|null} }
): PMH_State {
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

type PMH_State = {
  pastMedHist: string;
  pastHospits: string;
  medications: string;
  allergies: string;
}

const initialState: PMH_State = {
  pastMedHist: "",
  pastHospits: "", 
  medications: "",
  allergies: "",
};

export const PastMedicalHistoryPage: IndividualPatientProfile = ({
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
      history.push(`/patient/${patientID}/pastmedical`);

      // Get request
      const url = '/api/patientprofile/' + patientID;
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((jsonResult) => {
          console.log("Get PMH")
          console.log(jsonResult)
          dispatch({ type: "many_fields", newState:{
            "pastMedHist": jsonResult.medical_history,
            "pastHospits": "NEED TO ADD PAST HOSPITALIZATIONS TO DB", 
            "medications": "NEED TO ADD MEDICATIONS TO DB",
            "allergies": "NEED TO ADD ALLERGIES TO DB",}});

        }).catch((error) => {
          console.log("An error occured with fetch:", error)
        });

    }
  }, [currentPage]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingPastMedHistCanvas, setShowingPastMedHistCanvas] = useState(true);
  const [showingPastMedHistText, setShowingPastMedHistText] = useState(false);

  const [showingPastHospitsCanvas, setShowingPastHospitsCanvas] = useState(true);
  const [showingPastHospitsText, setShowingPastHospitsText] = useState(false);

  const [showingMedicationsCanvas, setShowingMedicationsCanvas] = useState(true);
  const [showingMedicationsText, setShowingMedicationsText] = useState(false);

  const [showingAllergiesCanvas, setShowingAllergiesCanvas] = useState(true);
  const [showingAllergiesText, setShowingAllergiesText] = useState(false);
  
  const { pastMedHist, pastHospits, medications, allergies } = state;

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
              id={"pastMedHist"}
              inputType={"text"}
              inputVal={pastMedHist}
              placeholder={`Enter text here`}
              title={"Past Medical History"}
              isShowingCanvas={showingPastMedHistCanvas}
              isShowingText={showingPastMedHistText}
              setIsShowingCanvas={setShowingPastMedHistCanvas}
              setIsShowingText={setShowingPastMedHistText}
              canvasHeight={600}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"pastHospits"}
              inputType={"text"}
              inputVal={pastHospits}
              placeholder={`Enter text here`}
              title={"Past Hospitalizations/Surgical History"}
              isShowingCanvas={showingPastHospitsCanvas}
              isShowingText={showingPastHospitsText}
              setIsShowingCanvas={setShowingPastHospitsCanvas}
              setIsShowingText={setShowingPastHospitsText}
              canvasHeight={600}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"medications"}
              inputType={"text"}
              inputVal={medications}
              placeholder={`Enter text here`}
              title={"Medications"}
              isShowingCanvas={showingMedicationsCanvas}
              isShowingText={showingMedicationsText}
              setIsShowingCanvas={setShowingMedicationsCanvas}
              setIsShowingText={setShowingMedicationsText}
              canvasHeight={600}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"allergies"}
              inputType={"text"}
              inputVal={allergies}
              placeholder={`Enter text here`}
              title={"Allergies"}
              isShowingCanvas={showingAllergiesCanvas}
              isShowingText={showingAllergiesText}
              setIsShowingCanvas={setShowingAllergiesCanvas}
              setIsShowingText={setShowingAllergiesText}
              canvasHeight={600}
              canvasWidth={600}
              isTextArea={true}
            />
          </div>
          <div className="form-whitespace">
            <div className="home-page-content-whitespace-logo"></div>
          </div>
          <div className="patient-profile-nav-btns">
            <div className="nav-btn" style={{ right: "20px", top: "70px", position: "fixed", borderRadius: "5px" }} onClick={() => {
              // TODO : add POST request function here
              
            }}>
              <FontAwesomeIcon icon="save" size="2x" />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
