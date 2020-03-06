import React, {useEffect, useReducer} from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import "../../../scss/patient-profiles/lab-results.scss";

interface LabResultData {
  name: string,
  value: number,
  lower: number,
  upper: number,
  scale: string
}

interface LabResultsState {
  data: LabResultData[];
}

const mockData: Array<LabResultData> = [
  { name: 'Na', value: 11.5, lower: 7.1, upper: 18.2, scale: 'nmol/mL' },
  { name: 'K', value: 4.5, lower: 3.0, upper: 4.5, scale: 'mmol/mL' },
  { name: 'ALT', value: 0.15, lower: 0.5, upper: 0.8, scale: 'ng/L' },
  { name: 'AST', value: 1.2, lower: 1.2, upper: 18.5, scale: 'peptides/mL' },
  { name: 'Glucose', value: 4.1, lower: 2.1, upper: 12.7, scale: 'nmol/mL' },
  { name: 'Iron', value: 12.8, lower: 8.8, upper: 29.2, scale: 'g/L' },
  { name: 'Erythrocytes', value: 0.0, lower: 0.0, upper: 44.8, scale: 'g/mL' },
  { name: 'Sedimentation Rate', value: 0.0, lower: 0.0, upper: 25.0, scale: 'g' },
  { name: 'Neutrophils', value: 0.1, lower: 0.2, upper: 44.5, scale: 'mg/L' },
  { name: 'Basophils', value: 0.0, lower: 0.0, upper: 100.0, scale: 'g/L' }
];

const initialState: LabResultsState = {
  // TODO: This is only for the demo! This must be changed to `data: []` later on.
  data: mockData
};

function reducer(
  state: LabResultsState,
  action: { type: string, fieldName?: string, value: string }
): LabResultsState {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "addEntry":
      newState.data.push({
        name: action.value,
        value: 0,
        lower: 0,
        upper: 0,
        scale: "mg/L"
      });
      break;
    case "updateName":
      newState.data.forEach(result => {
        if (result.name === action.fieldName) {
          result.name = action.value;
        }
      });
      break;
    case "updateValue":
      newState.data.forEach(result => {
        if (result.name === action.fieldName) {
          result.value = action.value;
        }
      });
      break;
    case "updateLower":
      newState.data.forEach(result => {
        if (result.name === action.fieldName) {
          result.lower = action.value;
        }
      });
      break;
    case "updateUpper":
      newState.data.forEach(result => {
        if (result.name === action.fieldName) {
          result.upper = action.value;
        }
      });
      break;
    case "updateScale":
      newState.data.forEach(result => {
        if (result.name === action.fieldName) {
          result.scale = action.value;
        }
      });
      break;
    default:
      throw new Error("Invalid type on action.");
  }

  return newState;
}

export const LabResultsPage: IndividualPatientProfile = ({
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
      history.push(`/patient/${patientID}/lab`);
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
        <div className="lab-results-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h1>{pageName}</h1>
            <table id="labResultsTable" className="lab-results-table">
              <thead>
                <tr>
                  <td>Test</td>
                  <td>Value</td>
                  <td>Range</td>
                  <td>Concentration</td>
                </tr>
              </thead>
              <tbody>
              {state.data.map(row => {
                const outOfRange = row.value < row.lower || row.value > row.upper;
                const rowClass = outOfRange ? 'lab-results-out-of-range-red' : '';
                return (
                  <tr className={`${rowClass}`} key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.value}</td>
                    <td>{row.lower}, {row.upper}</td>
                    <td>{row.scale}</td>
                  </tr>
                );
              })}
              </tbody>
            </table>
            <button className="lab-results-add-value-button" onClick={() => dispatch({ type: 'addEntry', value: 'New' })}>
              Add Lab Result
            </button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
