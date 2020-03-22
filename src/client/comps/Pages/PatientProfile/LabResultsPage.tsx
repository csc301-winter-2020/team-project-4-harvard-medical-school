import React, {useEffect, useReducer, useState} from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/lab-results.scss";

import { defaultLabResults } from "../../../utils/defaultLabResults";

import { toast } from "react-toastify";

interface LabResultData {
    "% Hemoglobin A1c": {value: string, added: boolean},
    "Alanine Aminotransferase (ALT)": {value: string, added: boolean},
    "Albumin": {value: string, added: boolean},
    "Alkaline Phosphatase": {value: string, added: boolean},
    "Amylase": {value: string, added: boolean},
    "Anti-Nuclear Antibody": {value: string, added: boolean},
    "Asparate Aminotransferase (AST)": {value: string, added: boolean},
    "Bicarbonate": {value: string, added: boolean},
    "Bilirubin, Direct": {value: string, added: boolean},
    "Bilirubin, Total": {value: string, added: boolean},
    "C-Reactive Protein": {value: string, added: boolean},
    "Calcium, Total": {value: string, added: boolean},
    "Carcinoembyronic Antigen (CEA)": {value: string, added: boolean},
    "CD4 Absolute": {value: string, added: boolean},
    "CD4 Cells, Percent": {value: string, added: boolean},
    "Chloride": {value: string, added: boolean},
    "Cholesterol, HDL": {value: string, added: boolean},
    "Cholesterol, LDL, Calculated": {value: string, added: boolean},
    "Cholesterol, LDL, Measured": {value: string, added: boolean},
    "Cholesterol, Total": {value: string, added: boolean},
    "Creatine Kinase (CK)": {value: string, added: boolean},
    "Creatinine, Urine": {value: string, added: boolean},
    "Creatinine": {value: string, added: boolean},
    "Ferritin": {value: string, added: boolean},
    "Folate": {value: string, added: boolean},
    "FSH": {value: string, added: boolean},
    "Glucose": {value: string, added: boolean},
    "Granulocyte Count": {value: string, added: boolean},
    "HCG, Maternal Screening": {value: string, added: boolean},
    "Hematocrit": {value: string, added: boolean},
    "Hemoglobin": {value: string, added: boolean},
    "Hepatitis A Virus Antibody": {value: string, added: boolean},
    "Hepatitis B Surface Antibody": {value: string, added: boolean},
    "Hepatitis B Surface Antigen": {value: string, added: boolean},
    "Hepatitis B Virus Core Antibody": {value: string, added: boolean},
    "Hepatitis C Virus Antibody": {value: string, added: boolean},
    "HIV Antibody": {value: string, added: boolean},
    "Homocysteine": {value: string, added: boolean},
    "Human Chorionic Gonadotropin": {value: string, added: boolean},
    "INR(PT)": {value: string, added: boolean},
    "Iron": {value: string, added: boolean},
    "Lactate Dehydrogenase (LD)": {value: string, added: boolean},
    "Lipase": {value: string, added: boolean},
    "Magnesium": {value: string, added: boolean},
    "Phosphate": {value: string, added: boolean},
    "Platelet Count": {value: string, added: boolean},
    "Potassium":{value: string, added: boolean},
}

interface LabResultsState {
  data: any;
}

const initialState: LabResultsState = {
  // replace with get request
  data: JSON.parse(JSON.stringify(defaultLabResults))
};

function reducer(
  state: LabResultsState,
  action: { 
    type: string, 
    fieldName?: string, 
    value: any,
    newState?: { [key: string]: string | boolean | number | null }
  }
): LabResultsState {

  let newState:LabResultsState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "addEntry":
      newState.data[action.value[0]] = {
        value: action.value[1],
        added: true
      };
      break;
    case "full_load":
      newState = action.value;
      break;
    default:
      throw new Error("Invalid type on action.");
  }
  return newState;
}

async function getPatientInfo(patientID: number){
  const res = await fetch(`/api/patientprofile/${patientID}`, {method: 'GET'})
  return await res.json()
}

async function getLabResults(patientID: number){
  const res = await fetch(`/api/labResults/${patientID}`, {method: 'GET'})
  return await res.json()
}

async function postLabResultsInfo(patientID: number, data: LabResultsState){
  const spec = { 
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const res = await fetch(`/api/labResults/${patientID}`, spec)
  return res
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
  const [state, dispatch] = useReducer(reducer, initialState);

  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/lab`);
    }
    
    getLabResults(patientID).then((data) => {
      dispatch({type: 'full_load', value: data})
      console.log("get data")
      console.log(state.data)
    }).catch((err) => {
      console.log('could not get Lab Results data from database')
    })

  }, [currentPage]);

  let nameInput = "";
  let valueInput = "";

  const mToast: any = toast;

  const postToDB = (state: LabResultsState) => {
    postLabResultsInfo(patientID, state).then((data) => {
      console.log(data)
      mToast.success('Information saved')
    }).catch((err) => {
      mToast.error('Information could not be saved')
    })
  }

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
            <div style={{ width: "700px" }}>
              <table id="labResultsTable" className="lab-results-table">
                <thead>
                  <tr>
                    <td>Test</td>
                    <td>Value</td>
                  </tr>
                </thead>
                <tbody>
                  { 
                    (Object.entries(state.data).filter(entry => entry[1]['added'])).map(row => {
                    const rowClass = '';
                    return (
                      <tr className={`${rowClass}`} 
                        key={row[0]}
                        >
                        <td>{row[0]}</td>
                        <td>{row[1]['value']}</td>
                      </tr>
                    );
                  })}
                  <tr key="addInputs">
                      <td>
                          <div className = "new-lab-result-input">
                            <input
                              type="text"
                              id="nameInput"
                              placeholder="New Lab Result Name"
                              onChange={(e: any) => {nameInput = e.target.value;}}
                            />
                          </div>
                          
                      </td>
                      <td>
                          <div className = "new-lab-result-input">
                            <input
                              type="text"
                              id="valueInput"
                              placeholder="New Lab Result Value"
                              onChange={(e: any) => {valueInput = e.target.value;}}
                            />
                          </div>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className="lab-results-add-value-button" 
              onClick={() => {
                console.log(nameInput)
                console.log(valueInput)
                if(nameInput in defaultLabResults && valueInput != ""){
                  dispatch({ type: 'addEntry', value: [nameInput, valueInput] });
                  // clear inputs
                  (document.getElementById("nameInput") as HTMLInputElement).value = "";
                  (document.getElementById("valueInput") as HTMLInputElement).value = "";
                }
                else{
                  mToast.warn("Invalid Lab Result");
                  return;
                }
                
              }}>
              Add Lab Result
            </button>

          </div>
          <div className="patient-profile-nav-btns">
            <div className="nav-btn" style={{ right: "20px", top: "70px", position: "fixed", borderRadius: "5px" }} onClick={() => {
              // TODO : add POST request function here
              postToDB(state);
            }}>
              <FontAwesomeIcon icon="save" size="2x" />
            </div>
          </div>

        </div>
      </CSSTransition>
    </>
  );
};
