import React, { useEffect, useReducer, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/patient-physical-form.scss";
import { render } from "@testing-library/react";

function reducer(
  state: physicalExaminationState,
  action: {
    category: string
    condition_name: string
    value: any
    physicalExaminationState: physicalExaminationState | null
  }
): physicalExaminationState {
  // if(action.category === 'vitals'){
  //   return {
  //     ...state,
  //     ['vitals']: {
  //       ...state.vitalsValues,
  //       [action.condition_name]: action.value
  //     }
  //   }
  // }
  return {
    ...state,
    [action.category]: {
      ...state[action.category],
      [action.condition_name]: action.value
    }
  }
}

type fieldValue = 'not_performed' | 'healthy'

type category = vitals
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

type vitals = {[key:string]: number | ''}
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

type physicalExaminationState = {[key:string]: category}

const initialVitals: vitals = {
  blood_pressure_systolic: '',
  blood_pressure_diastolic: '',
  beats_per_minute: '',
  respiratory_rate: '',
  temperature: '',
  o2_saturation: '',
  bmi: '' 
}

const initialGeneral: general = {
  awake: 'not_performed',
  cooperative: 'not_performed',
  interactive: 'not_performed',
  NAD: 'not_performed'
}

const initialHeent: heent = {
  normocephalic: 'not_performed',
  anicteric_sclera: 'not_performed',
  mucous_membranes_moist: 'not_performed',
  no_lesions: 'not_performed',
  normal_dentition: 'not_performed'
}

const initialCN_II: cn_ii = {
  perrl: 'not_performed',
  vff: 'not_performed',
  fundoscopic_exam: 'not_performed'
}

const initialCN_III: cn_iii = {
  eomi: 'not_performed',
  saccades: 'not_performed'
}

const initialCN_V: cn_v = {
  facial_sensation: 'not_performed'
}

const initialCN_VII: cn_vii = {
  facial_droop: 'not_performed'
}

const initialCN_VIII: cn_viii = {
  hearing_intact: 'not_performed'
}

const initialCN_IX: cn_ix = {
  palate_elevates: 'not_performed'
}

const initialCN_XI: cn_xi = {
  trapezii_scm_strength: 'not_performed'
}

const initialCN_XII: cn_xii = {
  tongue_protrude: 'not_performed'
}

const initialNeck: neck = {
}

const initialPulmonary: pulmonary = {

}

const initialCardiac: cardiac = {

}

const initialAbdomen: abdomen = {

}

const initialSkin: skin = {

}

const initialCoordination: coordination = {

}

const initialGait: gait = {

}

//TODO : need motor

const initialMental: mental = {

}


const initialPhysicalExaminationsState: physicalExaminationState = {
  vitals: initialVitals,
  general: initialGeneral,
  heent: initialHeent
}

const nameMap: {[key:string]: string} = {
  // category names
  general: 'General',
  heent: 'HEENT',
  // condition names
  blood_pressure_systolic: 'Systolic Blood Pressure',
  blood_pressure_diastolic: 'Diastolic Blood Pressure',
  beats_per_minute: 'Beats Per Minute',
  respiratory_rate: 'Respiratory Rate',
  temperature: 'Temperature',
  o2_saturation: 'O2 Saturation',
  bmi: 'BMI',
  awake: 'Awake',
  cooperative: 'Cooperative',
  interactive: 'Interactive',
  NAD: 'NAD',
  normocephalic: 'Nomocephalic/Ataumatic',
  anicteric_sclera: 'Anicteric Sclera',
  mucous_membranes_moist: 'Mucous Membranes Moist',
  no_lesions: 'No Lesions Noted in Oropharynx',
  normal_dentition: 'Normal Dentition'
}

const simpleRenderCategories: string[] = [
  'general',
  'heent'
]

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

  function renderChoices(category: string){
    return (
      <div>
        <h2>{nameMap[category]}</h2><br></br>
        {
          Object.keys(state[category]).map((condition: string) => {
            return (
              <div key={condition}>
                <div className='radio-group' key={condition+'_np'} style={{display: 'inline-block'}}>
                  <label>
                    <input
                      type='radio'
                      name={condition+'_np'}
                      checked={state[category][condition] === 'not_performed'}
                      onChange={() => {
                        dispatch({
                          category: category,
                          condition_name: condition,
                          value: 'not_performed',
                          physicalExaminationState: null
                        })
                      }}
                    />
                    <p>Not Performed</p>
                  </label>
                </div>
                <div className='radio-group' key={condition+'_c'} style={{display: 'inline-block'}}>
                  <label>
                    <input
                      type='radio'
                      name={condition+'_c'}
                      checked={state[category][condition] === 'healthy'}
                      onChange={() => {
                        dispatch({
                          category: category,
                          condition_name: condition,
                          value: 'healthy',
                          physicalExaminationState: null
                        })
                      }}
                    />
                    <p>{nameMap[condition]}</p>
                  </label>
                </div>
              </div>
            )
          })
        }
        <br></br>
      </div>
    )
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
        <div className={isShowingSidebar ? "physical-examination-history-page-outermost-container patient-profile-window" :
                                           "physical-examination-history-page-outermost-container patient-profile-window width-100"}>
          <div className="patient-profile-page-title">
            <h2>{pageName}</h2>
          </div>
          <div className="patient-profile-form-container">
            <h2>Vitals</h2><br></br>
            <table><tbody>
            {
              Object.keys(state.vitals).map((condition: string) => {
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
                      value={state.vitals[condition]}
                      type={'number'}
                      name={condition}
                      style={{
                        display: 'inline-block'
                      }}
                      onChange={e => {
                        dispatch({
                          category: 'vitals',
                          condition_name: condition,
                          value: e.target.value,
                          physicalExaminationState: null
                        })
                      }}
                    />
                    </td>
                  </tr>
                )
              })
            }
            </tbody></table><br></br>
            {
              simpleRenderCategories.map((category: string) => {
                return renderChoices(category)
              })
            }
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
