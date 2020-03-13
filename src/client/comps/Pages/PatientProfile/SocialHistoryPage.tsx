import React, { useEffect, useReducer, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../../../scss/patient-profiles/social-history.scss";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postData } from "./PatientProfilePage";
import { canvasInit, textInit } from "../../../utils/utils";
import { toast } from "react-toastify";

function reducer(
  state: SocialHistState,
  action: {
    type: string;
    fieldName?: string;
    value?: string;
    newState?: { [key: string]: string | boolean | number | null };
  }
): SocialHistState {
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
  work_canvas?: string;
  livingConditions: string;
  livingConditions_canvas?: string;
  sexualHistory: string;
  sexualHistory_canvas?: string;
  etOH: string;
  etOH_canvas?: string;
  drinksPerWeek: string;
  drinksPerWeek_canvas?: string;
  smoker: "NEVER" | "EX" | "CURRENT";
  lastTimeSmoked: string;
  lastTimeSmoked_canvas?: string;
  packsPerDay: string;
  packsPerDay_canvas?: string;
  otherSubstances: string;
  otherSubstances_canvas?: string;
};

const initialState: SocialHistState = {
  work: "",
  livingConditions: "",
  sexualHistory: "",
  etOH: "",
  drinksPerWeek: "",
  smoker: "NEVER",
  lastTimeSmoked: "",
  packsPerDay: "",
  otherSubstances: "",
};

async function saveData(url: string, state: any) {
  console.log(state);
  allAttributes.work = state.work;
  allAttributes.work_canvas = state.work_canvas;
  allAttributes.living_conditions = state.livingConditions;
  allAttributes.living_conditions_canvas = state.livingConditions_canvas; 
  allAttributes.etoh = state.etOH;
  allAttributes.etoh_canvas = state.etOH_canvas; 
  allAttributes.drinks_per_week = state.drinksPerWeek;
  allAttributes.drinks_per_week_canvas = state.drinksPerWeek_canvas; 
  allAttributes.smoker = state.smoker;
  allAttributes.last_time_smoked = state.lastTimeSmoked;
  allAttributes.last_time_smoked_canvas = state.lastTimeSmoked_canvas; 
  allAttributes.packs_per_day = state.packsPerDay;
  allAttributes.packs_per_day_canvas = state.packsPerDay_canvas; 
  allAttributes.other_substances = state.otherSubstances;
  allAttributes.other_substances_canvas = state.otherSubstances_canvas;
  
  const res = await postData(url, allAttributes);
  return await res.message
}

var allAttributes: any;

export const SocialHistoryPage: IndividualPatientProfile = ({
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
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/social`);

      // Get request
      const url = "/api/patientprofile/" + patientID;
      fetch(url)
        .then(res => {
          return res.json();
        })
        .then(jsonResult => {
          allAttributes = jsonResult;
          console.log("Get Social History");
          console.log(jsonResult);
          dispatch({
            type: "many_fields",
            newState: {
              work: jsonResult.work,
              livingConditions: jsonResult.living_conditions,
              sexualHistory: jsonResult.etOH,
              etOH: jsonResult.drinks_per_week,
              drinksPerWeek: jsonResult.drinks_per_week,
              smoker: jsonResult.smoker,
              lastTimeSmoked: jsonResult.last_time_smoke,
              packsPerDay: jsonResult.packs_per_day,
              otherSubstances: jsonResult.otherSubstances,
            },
          });
        })
        .catch(error => {
          console.log("An error occured with fetch:", error);
        });
    }
  }, [currentPage]);

  const myToast: any = toast

  const [state, dispatch] = useReducer(reducer, initialState);

  const [showingWorkCanvas, setShowingWorkCanvas] = useState(true);
  const [showingWorkText, setShowingWorkText] = useState(false);

  const [
    showingLivingConditionsCanvas,
    setShowingLivingConditionsCanvas,
  ] = useState(true);
  const [
    showingLivingConditionsText,
    setShowingLivingConditionsText,
  ] = useState(false);

  const [showingSexualHistoryCanvas, setShowingSexualHistoryCanvas] = useState(
    true
  );
  const [showingSexualHistoryText, setShowingSexualHistoryText] = useState(
    false
  );

  const [showingEtOHCanvas, setShowingEtOHCanvas] = useState(true);
  const [showingEtOHText, setShowingEtOHText] = useState(false);

  const [showingDrinksPerWeekCanvas, setShowingDrinksPerWeekCanvas] = useState(
    true
  );
  const [showingDrinksPerWeekText, setShowingDrinksPerWeekText] = useState(
    false
  );

  const [
    showingLastTimeSmokedCanvas,
    setShowingLastTimeSmokedCanvas,
  ] = useState(true);
  const [showingLastTimeSmokedText, setShowingLastTimeSmokedText] = useState(
    false
  );

  const [showingPacksPerDayCanvas, setShowingPacksPerDayCanvas] = useState(
    true
  );
  const [showingPacksPerDayText, setShowingPacksPerDayText] = useState(false);

  const [
    showingOtherSubstancesCanvas,
    setShowingOtherSubstancesCanvas,
  ] = useState(true);
  const [showingOtherSubstancesText, setShowingOtherSubstancesText] = useState(
    false
  );

  const {
    work,
    livingConditions,
    sexualHistory,
    etOH,
    drinksPerWeek,
    smoker,
    lastTimeSmoked,
    packsPerDay,
    otherSubstances,
  } = state;

  useEffect(() => {
    const canvasShow: boolean = canvasInit(defaultMode);
    const textShow: boolean = textInit(defaultMode);

    setShowingWorkCanvas(canvasShow);
    setShowingWorkText(textShow);
    setShowingLivingConditionsCanvas(canvasShow);
    setShowingLivingConditionsText(textShow);
    setShowingSexualHistoryCanvas(canvasShow);
    setShowingSexualHistoryText(textShow);
    setShowingEtOHCanvas(canvasShow);
    setShowingEtOHText(textShow);
    setShowingDrinksPerWeekCanvas(canvasShow);
    setShowingDrinksPerWeekText(textShow);
    setShowingLastTimeSmokedText(textShow);
    setShowingPacksPerDayCanvas(canvasShow);
    setShowingPacksPerDayText(textShow);
    setShowingOtherSubstancesText(textShow);
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
              canvasHeight={600}
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
              canvasHeight={600}
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
              canvasHeight={600}
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
              canvasHeight={600}
              canvasWidth={600}
              isTextArea={true}
            />

            <PatientFormInput
              dispatch={dispatch}
              id={"drinksPerWeek"}
              inputType={"number"}
              inputVal={drinksPerWeek}
              placeholder={"Ex. 5"}
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
                  placeholder={"Ex. 3 years ago"}
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
                  placeholder={"Ex. 2"}
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

            <br></br>
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
              canvasHeight={600}
              canvasWidth={600}
              isTextArea={true}
            />
          </div>
          <div className="form-whitespace">
            <div className="home-page-content-whitespace-logo"></div>
          </div>
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
                saveData("/api/patientprofile/" + patientID, state).then((data) => {
                  console.log(data)
                  myToast.success('Information saved')
                }).catch((err) => {
                  myToast.success('Information could not be saved')
                })
              }}
            >
              <FontAwesomeIcon icon="save" size="2x" />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
