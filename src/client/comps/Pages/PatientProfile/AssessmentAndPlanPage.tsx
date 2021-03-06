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

function reducer(
  state: Assessment_State,
  action: {
    type: string;
    fieldName?: string;
    value?: string;
    newState?: { [key: string]: string | boolean | number | null };
  }
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
};

const initialState: Assessment_State = {
  assessment: "",
};

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
  classID,
  userType,
  templateId,
}) => {
  async function saveData(url: string, state: any) {
    console.log(state);
    allAttributes.assessments = state.assessment;
    if (state.assessmentCanvas !== undefined)
      allAttributes.assessments_canvas = state.assessmentCanvas;
    allAttributes.class_id = classID;
    allAttributes.template_id = templateId;
    const res = await postData(url, allAttributes);
    return await res.message;
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastState, setLastState] = useState(state);

  const [showingAssessmentCanvas, setShowingAssessmentCanvas] = useState(true);
  const [showingAssessmentText, setShowingAssessmentText] = useState(false);
  const [finalDiagnosis, setFinalDiagnosis] = useState<string>(null);
  const { assessment, assessmentCanvas } = state;

  const myToast: MyToast = toast as any;

  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/assessment`);

      // Get request
      const url = "/api/patientprofile/" + patientID;
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((jsonResult) => {
          console.log("Get Assessment");
          console.log(jsonResult);
          console.log(jsonResult.assessments_canvas);
          setFinalDiagnosis(jsonResult.final_diagnosis);
          return fetchAllCanvases(jsonResult);
        })
        .then((jsonResult) => {
          allAttributes = jsonResult;
          dispatch({
            type: "many_fields",
            newState: {
              assessment: jsonResult.assessments,
              assessmentCanvas: jsonResult.assessments_canvas,
            },
          });
        })
        .catch((error) => {
          console.log("An error occured with fetch:", error);
        });
    }
  }, [currentPage]);

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);

    setShowingAssessmentCanvas(canvasShow);
    setShowingAssessmentText(textShow);
  }, [defaultMode]);

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

        saveData("/api/patientprofile/" + patientID, state)
          .then((data) => {
            console.log(data);
            myToast.success("Autosaved.", {
              autoClose: 1000,
            });
          })
          .catch((err) => {
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
          {userType !== "Student" && (
            <div style={{ marginLeft: "100px", marginRight: "100px" }}>
              <span className="bold-span">Instructor's Final Diagnosis:</span>{" "}
              {finalDiagnosis === null || finalDiagnosis === ""
                ? "The instructor has not set a final diagnosis. To do so, go back to the patient profile selection page and click the red 'i' on the right of the desired patient profile. Then click the pencil button near the bottom to edit the final diagnosis. Lastly, use the checkmark to save the final diagnosis."
                : finalDiagnosis}
            </div>
          )}
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
                  saveData("/api/patientprofile/" + patientID, state)
                    .then((data) => {
                      console.log(data);
                      myToast.success("Information saved", {autoClose: 1000});
                    })
                    .catch((err) => {
                      myToast.warn("Information could not be saved");
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
