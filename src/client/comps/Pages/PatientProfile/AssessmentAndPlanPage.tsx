import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile, formatCanvases } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { postData } from "./PatientProfilePage";
import { canvasInit, textInit } from "../../../utils/utils";
import { toast } from "react-toastify";
import { json } from "body-parser";

function reducer(
  state: Assessment_State,
  action: { type: string; fieldName?: string; value?: string; newState?: {[key: string]: string |boolean|number|null} }
): Assessment_State {
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

type Assessment_State = {
  assessment: string;
  assessmentCanvas?: string;
}

const initialState: Assessment_State = {
  assessment: "",
};

async function saveData(url: string, state: any) {
  console.log(state)
  allAttributes.assessments = state.assessment;
  if (state.assessmentCanvas !== undefined) allAttributes.assessment_canvas = state.assessmentCanvas;

  const res = await postData(url, allAttributes);
  return await res.message
}

var allAttributes: any;

export const AssessmentAndPlanPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
  defaultMode,
}) => {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingAssessmentCanvas, setShowingAssessmentCanvas] = useState(true);
  const [showingAssessmentText, setShowingAssessmentText] = useState(false);

  const { assessment, assessmentCanvas } = state;

  const myToast: any = toast

  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName){
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/assessment`);

      // Get request
      const url = '/api/patientprofile/' + patientID;
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((jsonResult) => {
          console.log("Get Assessment")
          console.log(jsonResult)
          allAttributes = jsonResult;
          return fetch(jsonResult.assessment_canvas).then(res => res.text())
        })
        .then(canvas => {
          console.log(canvas);
          let [formattedCanvas] = formatCanvases([canvas]);

          dispatch({ 
            type: "many_fields", 
            newState:{
              assessment: allAttributes.assessments,
              assessmentCanvas: formattedCanvas
            }
          });
        })
        .catch((error) => {
          console.log("An error occured with fetch:", error)
        });
    }
  }, [currentPage]);

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);

    setShowingAssessmentCanvas(canvasShow);
    setShowingAssessmentText(textShow);

  }, [defaultMode]);
  
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
              title={"Write your assessment and plan for the patient here"}
              isShowingCanvas={showingAssessmentCanvas}
              isShowingText={showingAssessmentText}
              setIsShowingCanvas={setShowingAssessmentCanvas}
              setIsShowingText={setShowingAssessmentText}
              canvasHeight={700}
              canvasWidth={600}
              canvasData={assessmentCanvas}
              isTextArea={true}
            />
          </div>
          <div className="form-whitespace">
            <div className="home-page-content-whitespace-logo"></div>
          </div>
          <div className="patient-profile-nav-btns">
            <div className="nav-btn" style={{ right: "20px", top: "70px", position: "fixed", borderRadius: "5px" }} onClick={() => {
              // TODO : add POST request function here
              saveData('/api/patientprofile/' + patientID, state).then((data) => {
                console.log(data)
                myToast.success('Information saved')
              }).catch((err) => {
                myToast.success('Information could not be saved')
              })
            }}>
              <FontAwesomeIcon icon="save" size="2x" />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
