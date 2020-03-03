import React, { useEffect, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import "../../../scss/patient-profiles/patient-profile-form.scss";

function reducer(
  state: ReviewOfSystemsState,
  action: {
    category: string;
    symptomName: string;
  }
): typeof state {
  if (
    Object.keys(state).includes(action.category) &&
    Object.keys(state[action.category]).includes(action.symptomName)
  ) {
    return {
      ...state,
      [action.category]: {
        ...state[action.category],
        [action.symptomName]: !state[action.category][action.symptomName],
      },
    };
  }
  throw new Error("Invalid action.");
}

type ReviewOfSystemsState = {
  endocrine: endocrineState;
  vision: visionState;
};

type endocrineState = {
  weightLoss: boolean;
  weightGain: boolean;
  fatigue: boolean;
  difficultySleeping: boolean;
  feelingUnwell: boolean;
  chronicPain: boolean;
  fevers: boolean;
  chills: boolean;
  sweats: boolean;
  lossOfAppetite: boolean;
  heatIntolerance: boolean;
  coldIntolerance: boolean;
  polyphagia: boolean;
  polydipsia: boolean;
};

type visionState = {
  decreaseInVision: boolean;
  increaseInVision: boolean;
  blurriness: boolean;
  pain: boolean;
  doubleVision: boolean;
  eyeDischarge: boolean;
  redEye: boolean;
};

const initialEndo: endocrineState = {
  weightLoss: false,
  weightGain: false,
  fatigue: false,
  difficultySleeping: false,
  feelingUnwell: false,
  chronicPain: false,
  fevers: false,
  chills: false,
  sweats: false,
  lossOfAppetite: false,
  heatIntolerance: false,
  coldIntolerance: false,
  polyphagia: false,
  polydipsia: false,
};

const initialVision: visionState = {
  decreaseInVision: false,
  increaseInVision: false,
  blurriness: false,
  pain: false,
  doubleVision: false,
  eyeDischarge: false,
  redEye: false,
};

const initialState: ReviewOfSystemsState = {
  endocrine: initialEndo,
  vision: initialVision,
};

export const ReviewOfSystemsPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  patientID,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/reviewofsystems`);
    }
  }, [currentPage]);

  const nameMap = {
    endocrine: "General/Endocrine Symptoms",
    vision: "Vision Symptoms",

    weightLoss: "Weight Loss",
    weightGain: "Weight Gain",
    fatigue: "Fatigue",
    difficultySleeping: "Difficulty Sleeping",
    feelingUnwell: "Feeling Unwell in General",
    chronicPain: "Chronic Pain",
    fevers: "Fevers",
    chills: "Chills",
    sweats: "Sweats",
    lossOfAppetite: "Loss of Appetite",
    heatIntolerance: "Heat Intolerance",
    coldIntolerance: "Cold Intolerance",
    polyphagia: "Polyphagia",
    polydipsia: "Polydipsia",
    decreaseInVision: "Decrease In Vision",
    increaseInVision: "Increase In Vision",
    blurriness: "Blurriness",
    pain: "Pain",
    doubleVision: "Double Vision",
    eyeDischarge: "Eye Discharge",
    redEye: "Red Eye",
  };

  // intelligent form specifications
  const dependencies = {
    weightLoss: ["weightGain"],
    weightGain: ["weightLoss"],
    decreaseInVision: ["increaseInVision"],
    increaseInVision: ["decreaseInVision"],
  };

  function checkDependency(
    state: endocrineState | visionState,
    symptomName: string
  ): boolean {
    return (
      !(symptomName in dependencies) ||
      dependencies[symptomName].reduce((_, elem: string) => !state[elem], true)
    );
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <div className="review-of-systems-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h2>{pageName}</h2>
          </div>
          <div className="patient-profile-form-container">
            {Object.keys(state).map(category => {
              return (
                <>
                  <h2>{nameMap[category]}</h2>
                  <br></br>
                  {Object.keys(state[category]).map(symptomName => {
                    if (checkDependency(state[category], symptomName)) {
                      return (
                        <div className="radio-group">
                          <label>
                            <input
                              type="radio"
                              name={symptomName}
                              checked={state[category][symptomName]}
                              onClick={() =>
                                dispatch({
                                  category: category,
                                  symptomName: symptomName,
                                })
                              }
                            />
                            <p>{nameMap[symptomName]}</p>
                          </label>
                        </div>
                      );
                    }
                    return (
                      <div className="radio-group">
                        <label>
                          <p style={{ color: "grey" }}>
                            {nameMap[symptomName]}
                          </p>
                        </label>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
