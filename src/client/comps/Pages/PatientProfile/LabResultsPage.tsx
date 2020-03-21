import React, {useEffect, useReducer, useState} from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/lab-results.scss";

import { NewLabResultPopup } from "../../SubComponents/PatientProfile/NewLabResultPopup";

import "../../../scss/home/home";

interface LabResultData {
  name: string,
  value: string,
  added: boolean
}

interface LabResultsState {
  data: LabResultData[];
}

const initialData: Array<LabResultData> = [
  { name: '% Hemoglobin A1c', value: '0', added: true },
  { name: 'Alanine Aminotransfererase (ALT)', value: '0', added: true },
  { name: 'Albumin', value: '0', added: false },
  { name: 'Alkaline Phosphatase', value: '0', added: false },
  { name: 'Amylase', value: '0', added: false },
  { name: 'Anti-nuclear Antibody', value: '0', added: false },
  { name: 'Asparate Aminotransferace (AST)', value: '0', added: false },
  { name: 'Bicarbonate', value: '0', added: false },
  { name: 'Bilirubin, Direct', value: '0', added: false },
  { name: 'Bilirubin, Total', value: '0', added: false },
  { name: 'C-Reactive Protein', value: '0', added: false },
  { name: 'Calcium, Total', value: '0', added: false },
  { name: 'Carcinoembyronic Antigen (CEA)', value: '0', added: false },
  { name: 'CD4 Absolute', value: '0', added: false },
  { name: 'CD4 Cells, Percent', value: '0', added: false },
  { name: 'Chloride', value: '0', added: false },
  { name: 'Cholesterol, HDL', value: '0', added: false },
  { name: 'Cholesterol, LDL, Calculated', value: '0', added: false },
  { name: 'Cholesterol, LDL, Measured', value: '0', added: false },
  { name: 'Cholesterol, Total', value: '0', added: false },
  { name: 'Creatine Kinase (CK)', value: '0', added: false },
  { name: 'Creatinine, Urine', value: '0', added: false },
  { name: 'Creatinine', value: '0', added: false },
  { name: 'Ferritin', value: '0', added: false },
  { name: 'Folate', value: '0', added: false },
  { name: 'FSH', value: '0', added: false },
  { name: 'Glucose', value: '0', added: false },
  { name: 'Granulocyte Count', value: '0', added: false },
  { name: 'Granulocyte Count', value: '0', added: false },
  { name: 'Hematocrit', value: '0', added: false },
  { name: 'Hemoglobin', value: '0', added: false },
  { name: 'Hepatitis A Virus Antibody', value: '0', added: false },
  { name: 'Hepatitis B Surface Antibody', value: '0', added: false },
  { name: 'Hepatitis B Surface Antigen', value: '0', added: false },
  { name: 'Hepatitis B Virus Core Antibody', value: '0', added: false },
  { name: 'Hepatitis C Virus Antibody', value: '0', added: false },
  { name: 'HIV Antibody', value: '0', added: false },
  { name: 'Homocysteine', value: '0', added: false },
  { name: 'Human Chorionic Gonadotropin', value: '0', added: false },
  { name: 'INR(PT)', value: '0', added: false },
  { name: 'Iron', value: '0', added: false },
  { name: 'Lactate Dehydrogenase (LD)', value: '0', added: false },
  { name: 'Lipase', value: '0', added: false },
  { name: 'Magnesium', value: '0', added: false },
  { name: 'Phosphate', value: '0', added: false },
  { name: 'Platelet Count', value: '0', added: false },
  { name: 'Potassium', value: '0', added: false },
  { name: 'Problem Specimen', value: '0', added: false },
  { name: 'Prostate Specific Antigen', value: '0', added: false },
  { name: 'Protein, Total', value: '0', added: false },
  { name: 'PTT', value: '0', added: false },
  { name: 'Sedimentation Rate', value: '0', added: false },
  { name: 'Sodium', value: '0', added: false },
  { name: 'Thyroid Stimulating Hormone', value: '0', added: false },
  { name: 'Thyroxine (T4), Free', value: '0', added: false },
  { name: 'Triglycerides', value: '0', added: false },
  { name: 'Urea Nitrogen', value: '0', added: false },
  { name: 'Uric Acid', value: '0', added: false },
  { name: 'Vitamin B12', value: '0', added: false },
  { name: 'White Blood Cells', value: '0', added: false },
  { name: 'proBNP', value: '0', added: false },
];

const initialState: LabResultsState = {
  // TODO: This is only for the demo! This must be changed to `data: []` later on.
  data: initialData
};

function reducer(
  state: LabResultsState,
  action: { 
    type: string, 
    fieldName?: string, 
    value: string,
    newState?: { [key: string]: string | boolean | number | null }
  }
): LabResultsState {

  let newState:LabResultsState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "addEntry":
      newState.data.push({
        name: action.value,
        value: "SWAG",
        added: true
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
  isShowingSidebar,
  patientID,
  defaultMode,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/lab`);
    }
  }, [currentPage]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [showNewLabResultPopup, setNewLabResultPopup] = useState(false);

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
            <div style={{ width: "400px" }}>
              <table id="labResultsTable" className="lab-results-table">
                <thead>
                  <tr>
                    <td>Test</td>
                    <td>Value</td>
                  </tr>
                </thead>
                <tbody>
                {state.data.filter(row => row.added).map(row => {
                  const rowClass = '';
                  return (
                    <tr className={`${rowClass}`} 
                      //key={row.name}
                      >
                      <td>{row.name}</td>
                      <td>{row.value}</td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
            <button className="lab-results-add-value-button" 
              onClick={() => {
                dispatch({ type: 'addEntry', value: 'New' });
                setNewLabResultPopup(true);
                }}>
              Add Lab Result
            </button>
          </div>
          <div className="patient-profile-nav-btns">
            <div className="nav-btn" style={{ right: "20px", top: "70px", position: "fixed", borderRadius: "5px" }} onClick={() => {
              // TODO : add POST request function here
              
            }}>
              <FontAwesomeIcon icon="save" size="2x" />
            </div>
          </div>

          {showNewLabResultPopup && (
          <NewLabResultPopup
            history={history}
            setShowNewLabResultPopup={setNewLabResultPopup}
          ></NewLabResultPopup>
        )}

        </div>
      </CSSTransition>
    </>
  );
};
