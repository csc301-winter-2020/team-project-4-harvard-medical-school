import React, { useEffect, useState, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { postData} from "./PatientProfilePage";
import { canvasInit, textInit } from "../../../utils/utils";
import { toast } from "react-toastify";

function reducer(
  state: ImagingResultsState,
  action: { type: string; fieldName?: string; value?: string; newState?: {[key: string]: string |boolean|number|null} }
): ImagingResultsState {
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

type ImagingResultsState = {
  imagingResults: string;
}

const initialState: ImagingResultsState = {
  imagingResults: "",
};

async function saveData(url: string, state: any) {
  console.log(state)
  allAttributes.imaging = state.imagingResults; 

  const res = await postData(url, allAttributes);
  return await res.message
}

var allAttributes: any;

export const ImagingResultsPage: IndividualPatientProfile = ({
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

  const [showingImagingResultsCanvas, setShowingImagingResultsCanvas] = useState(true);
  const [showingImagingResultsText, setShowingImagingResultsText] = useState(false);

  const myToast: any = toast

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);

    setShowingImagingResultsCanvas(canvasShow);
    setShowingImagingResultsText(textShow);

  }, [defaultMode]);

  const { imagingResults } = state;
  const history = useHistory();

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/imaging`);

      // Get request
      const url = '/api/patientprofile/' + patientID;
      fetch(url)
        .then((res) => {
          return res.json()
        })
        .then((jsonResult) => {
          console.log("Get Imaging")
          console.log(jsonResult)
          allAttributes = jsonResult;
          dispatch({ type: "many_fields", newState:{
            "imagingResults": jsonResult.imaging}});

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
