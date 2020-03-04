import React, {useEffect, useReducer} from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import '../../../scss/patient-profiles/patient-physical-form.scss'
import {PatientFormInput} from "../../SubComponents/PatientProfile/PatientFormInput";

type PhysicalExamVital = {
  name: string,
  value: string
};

// The 'status' is what we add as a customization when we do not want the
// default value. This means `isDefault` will be true if status is null, and
// false if status has a string.
//
// The `isDefault` allows us to tell whether a new entry should be added into
// the database or not. We may wish to just enter in everything though, and in
// such a case then we should remove this field.
//
// `defaultStatus` is what the textbox/placeholder should read if it is to be
// grayed out.
type PhysicalExamComponent = {
  bodyPart: string;
  status?: string;
  isDefault: boolean;
  defaultStatus: string;
}

type PhysicalExamState = {
  vitals: PhysicalExamVital[];
  components: PhysicalExamComponent[];
};

const initialState: PhysicalExamState = {
  vitals: [
    {
      name: "Blood pressure",
      value: "120 / 80"
    },
    {
      name: "Heart rate",
      value: "70 bpm"
    }
  ],
  components: [
    {
      bodyPart: "Head",
      isDefault: true,
      defaultStatus: "Normocephalic"
    },
    {
      bodyPart: "Eyes",
      isDefault: true,
      defaultStatus: "Accommodate to light"
    },
    // Note: This is temporary and just for demonstrations, we don't want a
    // custom element present in the final product.
    {
      bodyPart: "Mouth",
      status: "Broken lateral incisor",
      isDefault: false,
      defaultStatus: ""
    },
    {
      bodyPart: "Arms",
      isDefault: true,
      defaultStatus: "Normal"
    },
  ]
};

function reducer(
  state: PhysicalExamState,
  action: { type: string; fieldName?: string; value?: string }
): PhysicalExamState {
  // TODO: Can we make fieldName non-nullable? Or is this a design requirement for a reducer?
  if (action.fieldName === null) {
    throw new Error("Invalid field name when trying to update it.");
  }
  // TODO: Should we be deep copying?
  let newState: PhysicalExamState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "updateVital":
      if (action.fieldName in state.vitals) {
        newState.vitals[action.fieldName] = action.value;
        return newState;
      }
      throw new Error(`Unable to find field: ${action.fieldName}`);
    case "createComponent":
      newState.components.push({
        bodyPart: action.fieldName,
        status: "Fill in",
        isDefault: false,
        defaultStatus: ""
      });
      return newState;
    case "updateComponent":
      newState.components.forEach(c => {
        if (c.bodyPart === action.fieldName) {
          c.status = action.value;
        }
      });
      return newState;
    default:
      throw new Error("Invalid type on action.");
  }
}

// Converts a name to a usable ID name. This is needed for when the body part
// that comes from the database has to have a name. Note: This does not
// guarantee uniqueness. It is up to the caller to make sure of this.
function nameToID(name) {
  return name.toLowerCase().replace(' ', '-');
}

function createFindingFromComponent(c, dispatch) {
  if (c.isDefault) {
    return <b>{c.defaultStatus}</b>;
  }

  return <PatientFormInput
      dispatch={dispatch}
      id={nameToID(c.bodyPart)}
      inputType={"text"}
      inputVal={""}
      placeholder={"Enter text here"}
      title={""}
      isShowingCanvas={true}
      isShowingText={false}
      setIsShowingCanvas={() => {}}
      setIsShowingText={() => {}}
      canvasHeight={200}
      canvasWidth={800}
      isTextArea={true}
    />;
}

function addNewFinding() {

}

export const PhysicalExaminationPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  patientID
}) => {
  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/physical`);
    }
  }, [currentPage]);

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
        <div className="physical-examination-history-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h1>{pageName}</h1>
            <table id="physical-exam-vitals-table" className="physical-exam-table">
              <thead>
                <tr>
                  <td>Vital</td>
                  <td>Value</td>
                </tr>
              </thead>
              <tbody>
                {
                  state.vitals.map(vital => {
                    return <tr>
                      <td>{vital.name}</td>
                      <td>{vital.value}</td>
                    </tr>;
                  })
                }
              </tbody>
            </table>
            <br/>
            <br/>
            <table id="physical-exam-findings-table" className="physical-exam-table">
              <thead>
                <tr>
                  <td>Body Part</td>
                  <td>Value</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody>
                {
                  state.components.map(c => {
                    return <tr>
                      <td>{c.bodyPart}</td>
                      <td className={"physical-exam-findings-value" + (c.isDefault ? " physical-exam-grayed-out" : "")}>
                        {createFindingFromComponent(c, dispatch)}
                      </td>
                      <td>{c.isDefault && <button onClick={addNewFinding}>Customize</button>}</td>
                    </tr>;
                  })
                }
              </tbody>
            </table>
            <button className="physical-exam-button">Add Physical Component</button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
