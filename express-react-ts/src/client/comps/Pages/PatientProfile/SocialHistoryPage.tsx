import React, { useEffect, useReducer, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../../../scss/patient-profiles/social-history.scss";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";

function reducer(
  state: SocialHistState,
  action: { type: string; fieldName?: string; value?: string }
): SocialHistState {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.fieldName]: action.value,
      };
    case "NEVER":
      return {
        ...state,
        smoker: "NEVER",
        lastTimeSmoked: "",
        packsPerDay: "",
      };
    case "EX":
      return {
        ...state,
        smoker: "EX",
      };
    case "CURRENT":
      return {
        ...state,
        smoker: "CURRENT",
      };
    default:
      throw new Error("Invalid type on action.");
  }
}

type SocialHistState = {
  work: string;
  livingConditions: string;
  sexualHistory : string;
  etOH: string;
  drinksPerWeek: string;
  smoker: "NEVER" | "EX" | "CURRENT";
  lastTimeSmoked: string;
  packsPerDay: string;
  otherSubstances: string;
};

const initialState:  SocialHistState = {
  work: "",
  livingConditions: "",
  sexualHistory : "",
  etOH: "",
  drinksPerWeek: "",
  smoker: "NEVER",
  lastTimeSmoked: "",
  packsPerDay: "",
  otherSubstances: "",
};

export const SocialHistoryPage: IndividualPatientProfile = ({
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
      history.push(`/patient/${patientID}/social`);
    }
  }, [currentPage]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingWorkCanvas, setShowingWorkCanvas] = useState(true);
  const [showingWorkText, setShowingWorkText] = useState(false);

  const [showingLivingConditionsCanvas, setShowingLivingConditionsCanvas] = useState(true);
  const [showingLivingConditionsText, setShowingLivingConditionsText] = useState(false);

  const [showingSexualHistoryCanvas, setShowingSexualHistoryCanvas] = useState(true);
  const [showingSexualHistoryText, setShowingSexualHistoryText] = useState(false);

  const [showingEtOHCanvas, setShowingEtOHCanvas] = useState(true);
  const [showingEtOHText, setShowingEtOHText] = useState(false);

  const [showingDrinksPerWeekCanvas, setShowingDrinksPerWeekCanvas] = useState(true);
  const [showingDrinksPerWeekText, setShowingDrinksPerWeekText] = useState(false);

  const [showingLastTimeSmokedCanvas, setShowingLastTimeSmokedCanvas] = useState(true);
  const [showingLastTimeSmokedText, setShowingLastTimeSmokedText] = useState(false);

  const [showingPacksPerDayCanvas, setShowingPacksPerDayCanvas] = useState(true);
  const [showingPacksPerDayText, setShowingPacksPerDayText] = useState(false);

  const [showingOtherSubstancesCanvas, setShowingOtherSubstancesCanvas] = useState(true);
  const [showingOtherSubstancesText, setShowingOtherSubstancesText] = useState(false);

  const { work, livingConditions, sexualHistory, etOH, drinksPerWeek, smoker, lastTimeSmoked, packsPerDay, otherSubstances } = state;

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
              id={"work"}
              inputType={"text"}
              inputVal={work}
              placeholder={"Enter text here"}
              title={"Work"}
              isShowingCanvas={showingWorkCanvas}
              isShowingText={showingWorkText}
              setIsShowingCanvas={setShowingWorkCanvas}
              setIsShowingText={setShowingWorkText}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"livingConditions"}
              inputType={"text"}
              inputVal={livingConditions}
              placeholder={"Enter text here"}
              title={"Living Conditions"}
              isShowingCanvas={showingLivingConditionsCanvas}
              isShowingText={showingLivingConditionsText}
              setIsShowingCanvas={setShowingLivingConditionsCanvas}
              setIsShowingText={setShowingLivingConditionsText}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"sexualHistory"}
              inputType={"text"}
              inputVal={sexualHistory}
              placeholder={"Enter text here"}
              title={"Sexual History"}
              isShowingCanvas={showingSexualHistoryCanvas}
              isShowingText={showingSexualHistoryText}
              setIsShowingCanvas={setShowingSexualHistoryCanvas}
              setIsShowingText={setShowingSexualHistoryText}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={true}
            />

            <h1> Substance Use: </h1> 

            <PatientFormInput
              dispatch={dispatch}
              id={"etOH"}
              inputType={"text"}
              inputVal={etOH}
              placeholder={"Enter text here"}
              title={"EtOH"}
              isShowingCanvas={showingEtOHCanvas}
              isShowingText={showingEtOHText}
              setIsShowingCanvas={setShowingEtOHCanvas}
              setIsShowingText={setShowingEtOHText}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"drinksPerWeek"}
              inputType={"number"}
              inputVal={drinksPerWeek}
              placeholder={"Enter text here"}
              title={"Number of Drinks/Week"}
              isShowingCanvas={showingDrinksPerWeekCanvas}
              isShowingText={showingDrinksPerWeekText}
              setIsShowingCanvas={setShowingDrinksPerWeekCanvas}
              setIsShowingText={setShowingDrinksPerWeekText}
              canvasHeight={200}
              canvasWidth={600}
              isTextArea={false}
            />

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="smoker"
                  checked={smoker === "NEVER"}
                  onChange={() => {
                    dispatch({ type: "NEVER" });
                  }}
                />
                <p>Never Smoker</p>
              </label>

              <label>
                <input
                  type="radio"
                  name="smoker"
                  checked={smoker === "EX"}
                  onChange={() => {
                    dispatch({ type: "EX" });
                  }}
                />
                <p>Ex-Smoker</p>
              </label>

              <label>
                <input
                  type="radio"
                  name="smoker"
                  checked={smoker === "CURRENT"}
                  onChange={() => {
                    dispatch({ type: "CURRENT" });
                  }}
                />
                <p>Current Smoker</p>
              </label>
            </div>
            {(smoker === "CURRENT" || smoker === "EX") && (
              <>
                <PatientFormInput
                  dispatch={dispatch}
                  id={"lastTimeSmoked"}
                  inputType={"text"}
                  inputVal={lastTimeSmoked}
                  placeholder={"Enter text here"}
                  title={"Last time smoked"}
                  isShowingCanvas={showingLastTimeSmokedCanvas}
                  isShowingText={showingLastTimeSmokedText}
                  setIsShowingCanvas={setShowingLastTimeSmokedCanvas}
                  setIsShowingText={setShowingLastTimeSmokedText}
                  canvasHeight={200}
                  canvasWidth={600}
                  isTextArea={false}
                />

                <PatientFormInput
                  dispatch={dispatch}
                  id={"packsPerDay"}
                  inputType={"text"}
                  inputVal={packsPerDay}
                  placeholder={"Enter text here"}
                  title={"Packs/Day"}
                  isShowingCanvas={showingPacksPerDayCanvas}
                  isShowingText={showingPacksPerDayText}
                  setIsShowingCanvas={setShowingPacksPerDayCanvas}
                  setIsShowingText={setShowingPacksPerDayText}
                  canvasHeight={200}
                  canvasWidth={600}
                  isTextArea={false}
                />
                
              </>
            )}
            <PatientFormInput
              dispatch={dispatch}
              id={"otherSubstances"}
              inputType={"text"}
              inputVal={otherSubstances}
              placeholder={"Enter text here"}
              title={"Other Substances"}
              isShowingCanvas={showingOtherSubstancesCanvas}
              isShowingText={showingOtherSubstancesText}
              setIsShowingCanvas={setShowingOtherSubstancesCanvas}
              setIsShowingText={setShowingOtherSubstancesText}
              canvasHeight={200}
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
