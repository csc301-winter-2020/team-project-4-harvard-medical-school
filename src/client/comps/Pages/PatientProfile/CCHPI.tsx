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
  state: CCHPI_State,
  action: {
    type: string;
    fieldName?: string;
    value?: string;
    newState?: { [key: string]: string | boolean | number | null };
  }
): CCHPI_State {
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

type CCHPI_State = {
  chiefComplaint: string;
  chiefComplaintCanvas?: string;
  chiefComplaintImage?: string;
  HPI: string;
  HPICanvas?: string;
  HPIImage?: string;

  pastMedHistCanvas?: string;
  pastMedHistImage?: string;
  pastHospitsCanvas?: string;
  pastHospitsImage?: string;
  medicationsCanvas?: string;
  medicationsImage?: string;
  allergiesCanvas?: string;
  allergiesImage?: string;
};

const initialState: CCHPI_State = {
  chiefComplaint: "",
  HPI: "",
};

async function saveData(patientID: number, state: any, classID: number, templateId: number) {
  console.log(state);
  allAttributes.complaint = state.chiefComplaint;
  if (state.chiefComplaintCanvas !== undefined) {
    allAttributes.complaint_canvas = state.chiefComplaintCanvas;
  }

  allAttributes.hpi = state.HPI;
  if (state.HPICanvas !== undefined) {
    allAttributes.hpi_canvas = state.HPICanvas;
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
  allAttributes.class_id = classID;
  allAttributes.template_id = templateId;
  console.log(allAttributes);
  const res = await postData(
    "/api/patientprofile/" + patientID,
    allAttributes
  );
  const msg = await res.message;
  console.log("Saving canvas")
  await postData("/api/analysis/" + patientID, canvasImages, "POST");
  // console.log(await (await fetch('/api/analysis/' + patientID)).json())
  return msg;
}

var allAttributes: any;

export const CCHPIPage: IndividualPatientProfile = ({
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
  const history = useHistory();

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/cchpi`);

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
          allAttributes = jsonResult;
          console.log("Get CCHPI");
          console.log(jsonResult);
          dispatch({
            type: "many_fields",
            newState: {
              chiefComplaint: jsonResult.complaint,
              chiefComplaintCanvas: jsonResult.complaint_canvas,
              HPI: jsonResult.hpi,
              HPICanvas: jsonResult.hpi_canvas,

              pastMedHistCanvas: jsonResult.medical_history_canvas,
              pastHospitsCanvas: jsonResult.hospital_history_canvas,
              medicationsCanvas: jsonResult.medications_canvas,
              allergiesCanvas: jsonResult.allergies_canvas,
            },
          });
        })
        .catch(error => {
          console.log("An error occured with fetch:", error);
        });
    }
  }, [currentPage]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastState, setLastState] = useState(state);

  const [
    showingChiefComplaintCanvas,
    setShowingChiefComplaintCanvas,
  ] = useState(true);
  const [showingChiefComplaintText, setShowingChiefComplaintText] = useState(
    false
  );

  const [showingHPICanvas, setShowingHPICanvas] = useState(true);
  const [showingHPIText, setShowingHPIText] = useState(false);

  const {
    chiefComplaint,
    chiefComplaintCanvas,
    HPI,
    HPICanvas,
    pastMedHistCanvas,
    pastHospitsCanvas,
    medicationsCanvas,
    allergiesCanvas,
  } = state;

  const myToast: MyToast = toast as any;

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);
    setShowingChiefComplaintCanvas(canvasShow);
    setShowingChiefComplaintText(textShow);
    setShowingHPICanvas(canvasShow);
    setShowingHPIText(textShow);
  }, [defaultMode]);

  useEffect(() => {
    if (lastState === initialState) {
      setLastState(state);
      return;
    }

    const timer = setTimeout(() => {
      if (userType === "Student" && currentPage == pageName && state && state !== lastState) {
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
              id={"chiefComplaint"}
              inputType={"text"}
              inputVal={chiefComplaint}
              placeholder={`Enter text here`}
              title={"Chief Complaint"}
              subtext={
                "If you would like to receive diagnoses tips, please write symptoms as comma separated values"
              }
              isShowingCanvas={showingChiefComplaintCanvas}
              isShowingText={showingChiefComplaintText}
              setIsShowingCanvas={setShowingChiefComplaintCanvas}
              setIsShowingText={setShowingChiefComplaintText}
              canvasHeight={600}
              canvasWidth={600}
              canvasData={chiefComplaintCanvas}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"HPI"}
              inputType={"text"}
              inputVal={HPI}
              placeholder={`Enter text here`}
              title={"History of Present Illness"}
              subtext={
                "If you would like to receive diagnoses tips, please write history as comma separated values"
              }
              isShowingCanvas={showingHPICanvas}
              isShowingText={showingHPIText}
              setIsShowingCanvas={setShowingHPICanvas}
              setIsShowingText={setShowingHPIText}
              canvasHeight={600}
              canvasWidth={600}
              canvasData={HPICanvas}
              isTextArea={true}
            />

            <CanvasComp
              id={"pastMedHist"}
              dispatch={dispatch}
              initialWidth={600}
              initialHeight={600}
              saveData={pastMedHistCanvas}
              hidden={true}
            />

            <CanvasComp
              id={"pastHospits"}
              dispatch={dispatch}
              initialWidth={600}
              initialHeight={600}
              saveData={pastHospitsCanvas}
              hidden={true}
            />

            <CanvasComp
              id={"medications"}
              dispatch={dispatch}
              initialWidth={600}
              initialHeight={600}
              saveData={medicationsCanvas}
              hidden={true}
            />

            <CanvasComp
              id={"allergies"}
              dispatch={dispatch}
              initialWidth={600}
              initialHeight={600}
              saveData={allergiesCanvas}
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
