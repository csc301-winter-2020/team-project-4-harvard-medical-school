import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import {
  IndividualPatientProfile,
  fetchAllCanvases,
} from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postData } from "./PatientProfilePage";
import { canvasInit, textInit } from "../../../utils/utils";
import { toast } from "react-toastify";
import { MyToast } from "../../../utils/types";

function reducer(
  state: Family_Hist_State,
  action: {
    type: string;
    fieldName?: string;
    value?: string;
    newState?: { [key: string]: string | boolean | number | null };
  }
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
  familyHistCanvas?: string;
};

const initialState: Family_Hist_State = {
  familyHist: "",
};

var allAttributes: any;

export const FamilyHistoryPage: IndividualPatientProfile = ({
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastState, setLastState] = useState(state);

  const [showingFamilyHistCanvas, setShowingFamilyHistCanvas] = useState(true);
  const [showingFamilyHistText, setShowingFamilyHistText] = useState(false);

  const myToast: MyToast = toast as any;

  async function saveData(url: string, state: any) {
    console.log(state.familyHist);
    allAttributes.family_history = state.familyHist;
    allAttributes.family_history_canvas = state.familyHistCanvas;
    allAttributes.template_id = templateId;
    allAttributes.class_id = classID;
    const res = await postData(url, allAttributes);
    return await res.message;
  }

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);

    setShowingFamilyHistCanvas(canvasShow);
    setShowingFamilyHistText(textShow);
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

        saveData("/api/patientprofile/" + patientID, state)
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

  const { familyHist, familyHistCanvas } = state;

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/family`);

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
          console.log("Get Family History");
          console.log(jsonResult);

          allAttributes = jsonResult;
          dispatch({
            type: "many_fields",
            newState: {
              familyHist: jsonResult.family_history,
              familyHistCanvas: jsonResult.family_history_canvas,
            },
          });
        })
        .catch(error => {
          console.log("An error occured with fetch:", error);
        });
    }
  }, [currentPage]);

  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <>
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
            <div
              className="patient-profile-form-container"
              onClick={() => {
                console.log(familyHist);
              }}
            >
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
                canvasData={familyHistCanvas}
                isTextArea={true}
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
                    saveData("/api/patientprofile/" + patientID, state)
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
        </>
      </CSSTransition>
    </>
  );
};
