import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import {
  IndividualPatientProfile,
  fetchAllCanvases,
} from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { postData } from "./PatientProfilePage";
import { canvasInit, textInit } from "../../../utils/utils";
import { toast } from "react-toastify";
import { MyToast } from "../../../utils/types";
import { CanvasComp } from "../../SubComponents/CanvasComp";

function reducer(
  state: PMH_State,
  action: {
    type: string;
    fieldName?: string;
    value?: string;
    newState?: { [key: string]: string | boolean | number | null };
  }
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
  pastMedHistCanvas?: string;
  pastMedHistImage?: string;
  pastHospits: string;
  pastHospitsCanvas?: string;
  pastHospitsImage?: string;
  medications: string;
  medicationsCanvas?: string;
  medicationsImage?: string;
  allergies: string;
  allergiesCanvas?: string;
  allergiesImage?: string;
  chiefComplaintCanvas?: string;
  chiefComplaintImage?: string;
  HPICanvas?: string;
  HPIImage?: string;
};

const initialState: PMH_State = {
  pastMedHist: "",
  pastHospits: "",
  medications: "",
  allergies: "",
};

async function saveData(patientID: number, state: any, classID: number, templateId: number) {
  console.log(state);
  allAttributes.medical_history = state.pastMedHist;

  if (state.pastMedHistCanvas !== undefined) {
    allAttributes.medical_history_canvas = state.pastMedHistCanvas;
  }

  allAttributes.hospital_history = state.pastHospits;

  if (state.pastHospitsCanvas !== undefined) {
    allAttributes.hospital_history_canvas = state.pastHospitsCanvas;
  }

  allAttributes.medications = state.medications;

  if (state.medicationsCanvas !== undefined) {
    allAttributes.medications_canvas = state.medicationsCanvas;
  }

  allAttributes.allergies = state.allergies;

  if (state.allergiesCanvas !== undefined) {
    allAttributes.allergies_canvas = state.allergiesCanvas;
  }

  const canvasImages = [];
  if (state.chiefComplaintImage !== undefined) {
    canvasImages.push(state.chiefComplaintImage);
  }

  if (state.HPIImage !== undefined) {
    canvasImages.push(state.HPIImage);
  }

  if (state.pastHospitsImage !== undefined) {
    canvasImages.push(state.pastHospitsImage);
  }

  if (state.pastMedHistImage !== undefined) {
    canvasImages.push(state.pastMedHistImage);
  }

  if (state.medicationsImage !== undefined) {
    canvasImages.push(state.medicationsImage);
  }

  if (state.allergiesImage !== undefined) {
    canvasImages.push(state.allergiesImage);
  }

  const isabelRes = await postData(
    "/api/analysis/" + patientID,
    canvasImages,
    "POST"
  );
  console.log(isabelRes);
  allAttributes.template_id = templateId;
  allAttributes.class_id = classID;
  const res = await postData("/api/patientprofile/" + patientID, allAttributes);
  return await res.message;
}

var allAttributes: any;

export const PastMedicalHistoryPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
  defaultMode,
  classID,
  userType,
  templateId,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastState, setLastState] = useState(state);

  const [showingPastMedHistCanvas, setShowingPastMedHistCanvas] = useState(
    true
  );
  const [showingPastMedHistText, setShowingPastMedHistText] = useState(false);

  const [showingPastHospitsCanvas, setShowingPastHospitsCanvas] = useState(
    true
  );
  const [showingPastHospitsText, setShowingPastHospitsText] = useState(false);

  const [showingMedicationsCanvas, setShowingMedicationsCanvas] = useState(
    true
  );
  const [showingMedicationsText, setShowingMedicationsText] = useState(false);

  const [showingAllergiesCanvas, setShowingAllergiesCanvas] = useState(true);
  const [showingAllergiesText, setShowingAllergiesText] = useState(false);

  const {
    pastMedHist,
    pastMedHistCanvas,
    pastHospits,
    pastHospitsCanvas,
    medications,
    medicationsCanvas,
    allergies,
    allergiesCanvas,
    chiefComplaintCanvas,
    HPICanvas,
  } = state;

  const myToast: MyToast = toast as any;

  const history = useHistory();
  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);

    setShowingPastMedHistCanvas(canvasShow);
    setShowingPastMedHistText(textShow);
    setShowingPastHospitsCanvas(canvasShow);
    setShowingPastHospitsText(textShow);
    setShowingMedicationsCanvas(canvasShow);
    setShowingMedicationsText(textShow);
    setShowingAllergiesCanvas(canvasShow);
    setShowingAllergiesText(textShow);
  }, [defaultMode]);

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/pastmedical`);

      // Get request
      const url = "/api/patientprofile/" + patientID;
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(jsonResult => {
          return fetchAllCanvases(jsonResult);
        })
        .then(jsonResult => {
          console.log("Get PMH");
          console.log(jsonResult);
          allAttributes = jsonResult;
          dispatch({
            type: "many_fields",
            newState: {
              pastMedHist: jsonResult.medical_history,
              pastMedHistCanvas: jsonResult.medical_history_canvas,
              pastHospits: jsonResult.hospital_history,
              pastHospitsCanvas: jsonResult.hospital_history_canvas,
              medications: jsonResult.medications,
              medicationsCanvas: jsonResult.medications_canvas,
              allergies: jsonResult.allergies,
              allergiesCanvas: jsonResult.allergies_canvas,

              HPICanvas: jsonResult.hpi_canvas,
              chiefComplaintCanvas: jsonResult.complaint_convas,
            },
          });
        })
        .catch(error => {
          console.log("An error occured with fetch:", error);
        });
    }
  }, [currentPage]);

  useEffect(() => {
    if (lastState === initialState) {
      setLastState(state);
      return;
    }

    const timer = setTimeout(() => {
      if (
        userType === "Student" &&
        currentPage == pageName &&
        state &&
        state !== lastState
      ) {
        console.log(lastState);
        console.log(state);

        saveData(patientID, state, classID, templateId)
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
              canvasData={pastMedHistCanvas}
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
              canvasData={pastHospitsCanvas}
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
              canvasData={medicationsCanvas}
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
              canvasData={allergiesCanvas}
              isTextArea={true}
            />

            <CanvasComp
              id={"medications"}
              dispatch={dispatch}
              initialWidth={600}
              initialHeight={600}
              saveData={chiefComplaintCanvas}
              hidden={true}
            />

            <CanvasComp
              id={"allergies"}
              dispatch={dispatch}
              initialWidth={600}
              initialHeight={600}
              saveData={HPICanvas}
              hidden={true}
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
                  saveData(patientID, state, classID, templateId)
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
