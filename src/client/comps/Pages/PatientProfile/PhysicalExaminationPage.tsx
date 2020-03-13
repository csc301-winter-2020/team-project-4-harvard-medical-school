import React, { useEffect, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/patient-physical-form.scss";

function reducer(
  state: physicalExaminationState,
  action: {
    category: string
    condition_name: string
    value: any
    physicalExaminations: physicalExaminationState | null
  }
): physicalExaminationState {
  if(action.category === 'vitalsValues'){
    return {
      ...state,
      ['vitalsValues']: {
        ...state.vitalsValues,
        [action.condition_name]: action.value
      }
    }
  }
}

type fieldValue = 'not_performed' | 'healthy' | 'condition'

type category = vitalsValues
              | vitals
              | general
              | heent
              | cn_ii
              | cn_iii
              | cn_v
              | cn_vii
              | cn_viii
              | cn_ix
              | cn_xi
              | cn_xii
              | neck
              | pulmonary
              | cardiac
              | abdomen
              | skin
              | motor
              | coordination
              | gait
              | mental

type vitalsValues = {[key:string]: number | ''}
type vitals = {[key:string]: fieldValue}
type general = {[key:string]: fieldValue}
type heent = {[key:string]: fieldValue}
type cn_ii = {[key:string]: fieldValue}
type cn_iii = {[key:string]: fieldValue}
type cn_v = {[key:string]: fieldValue}
type cn_vii = {[key:string]: fieldValue}
type cn_viii = {[key:string]: fieldValue}
type cn_ix = {[key:string]: fieldValue}
type cn_xi = {[key:string]: fieldValue}
type cn_xii = {[key:string]: fieldValue}
type neck = {[key:string]: fieldValue}
type pulmonary = {[key:string]: fieldValue}
type cardiac = {[key:string]: fieldValue}
type abdomen = {[key:string]: fieldValue}
type skin = {[key:string]: fieldValue}
// TODO : check if this is right
type motor = {[key:string]: fieldValue}
type coordination = {[key:string]: fieldValue}
type gait = {[key:string]: fieldValue}
type mental = {[key:string]: fieldValue}

type physicalExaminationState = {
  [key:string]: category
}

const initialVitalsValues: vitalsValues = {
  blood_pressure_systolic: '',
  blood_pressure_diastolic: '',
  beats_per_minute: '',
  respiratory_rate: '',
  temperature: '',
  o2_saturation: '',
  bmi: '' 
}

const initialPhysicalExaminationsState: physicalExaminationState = {
  vitalsValues: initialVitalsValues
}

const nameMap: {[key:string]: string} = {
  blood_pressure_systolic: 'Systolic Blood Pressure',
  blood_pressure_diastolic: 'Diastolic Blood Pressure',
  beats_per_minute: 'Beats Per Minute',
  respiratory_rate: 'Respiratory Rate',
  temperature: 'Temperature',
  o2_saturation: 'O2 Saturation',
  bmi: 'BMI'
}

export const PhysicalExaminationPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
}) => {
  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/physical`);
    }
  }, [currentPage]);

  const [state, dispatch] = useReducer(reducer, initialPhysicalExaminationsState)

  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <div className={isShowingSidebar ? "physical-examination-history-page-outermost-container patient-profile-window" :
                                           "physical-examination-history-page-outermost-container patient-profile-window width-100"}>
          <div className="patient-profile-page-title">
            <h2>{pageName}</h2>
          </div>
          <div className="patient-profile-form-container">
            <h2>Vitals</h2><br></br>
            <table><tbody>
            {
              Object.keys(state.vitalsValues).map((condition: string) => {
                return (
                  <tr key={condition}>
                    <td>
                    <label style={{
                      fontSize: '1.2rem',
                      marginRight: '30px'
                    }}>{nameMap[condition]}</label>
                    </td>
                    <td>
                    <input
                      className="form-input-short"
                      placeholder={'Put value here'}
                      value={state.vitalsValues[condition]}
                      type={'number'}
                      name={condition}
                      style={{
                        display: 'inline-block'
                      }}
                      onChange={e => {
                        console.log(e.target.value)
                        dispatch({
                          category: 'vitalsValues',
                          condition_name: condition,
                          value: e.target.value,
                          physicalExaminations: null
                        })
                      }}
                    />
                    </td>
                  </tr>
                )
              })
            }
            </tbody></table>
          </div>
          <div className="patient-profile-nav-btns">
            <div className="nav-btn" style={{ right: "20px", top: "70px", position: "fixed", borderRadius: "5px" }} onClick={() => {
              // TODO : add POST request function here
              
            }}>
              <FontAwesomeIcon icon="save" size="2x" />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
