import React, {useEffect, useReducer} from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";

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
    }
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
        status: "New",
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
            {/* TODO: Convert into a component! */}
            <b>Vitals</b>
            <table>
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
                    </tr>
                  })
                }
              </tbody>
            </table>
            {/* TODO: Convert into a component! */}
            <b>Findings</b>
            <table>
              <thead>
                <tr>
                  <td>Component</td>
                  <td>Value</td>
                </tr>
              </thead>
              <tbody>
                {
                  state.components.map(c => {
                    return <tr>
                      <td>{c.bodyPart}</td>
                      <td>{c.isDefault ? c.defaultStatus : c.status}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
            <button>Add Physical Component</button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
