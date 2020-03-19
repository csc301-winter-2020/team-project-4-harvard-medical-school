import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postData } from "./PatientProfilePage";
import { canvasInit, textInit } from "../../../utils/utils";
import { toast } from "react-toastify";
import { MyToast } from "../../../utils/types";

function reducer(
  state: Family_Hist_State,
  action: { type: string; fieldName?: string; value?: string; newState?: { [key: string]: string | boolean | number | null } }
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

async function saveData(url: string, state: any) {
  console.log(state.familyHist)
  allAttributes.family_history = state.familyHist;
  console.log(allAttributes)

  const res = await postData(url, allAttributes);
  return await res.message
}

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
}) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingFamilyHistCanvas, setShowingFamilyHistCanvas] = useState(true);
  const [showingFamilyHistText, setShowingFamilyHistText] = useState(false);

  const myToast:MyToast = toast as any;

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);

    setShowingFamilyHistCanvas(canvasShow);
    setShowingFamilyHistText(textShow);

  }, [defaultMode]);


  const { familyHist } = state;

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
          allAttributes = jsonResult;
          dispatch({
            type: "many_fields", newState: {
              "familyHist": jsonResult.family_history
            }
          });

        }).catch((error) => {
          console.log("An error occured with fetch:", error)
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
          <div className={isShowingSidebar ? "patient-profile-window" : "patient-profile-window width-100"}>
            <div className="patient-profile-page-title">
              <h2>{pageName}</h2>
            </div>
            <div className="patient-profile-form-container" onClick={() => {
              console.log(familyHist);
            }}>
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
            <div className="patient-profile-nav-btns">
              <div className="nav-btn" style={{ right: "20px", top: "70px", position: "fixed", borderRadius: "5px" }} onClick={() => {
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

        </>
      </CSSTransition>
    </>
  );
};
