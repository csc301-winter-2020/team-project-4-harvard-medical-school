import React, { useEffect, useReducer, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/patient-physical-form.scss";
import { textInit, canvasInit } from '../../../utils/utils'
import { render } from "@testing-library/react";

function reducer(
  state: physicalExaminationState,
  action: {
    category: string
    condition_name: string
    value: any
    physicalExaminationState: physicalExaminationState | null
  }
): physicalExaminationState{
  return {
    ...state,
    [action.category]: {
      ...state[action.category],
      [action.condition_name]: action.value
    }
  }
}

function inputReducer(
  state: isShowingInput,
  action: {
    category: string
    condition_name: string
    state: isShowingInput
  }
): isShowingInput{
  if(action.state !== null){
    return action.state
  }
  return {
    ...state,
    [action.category]: {
      ...state[action.category],
      [action.condition_name]: !state[action.category][action.condition_name]
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
  nuchal_rigidity: 'not_performed',
  thyroid: 'not_performed',
  cervical_lymphadenopathy: 'not_performed',
  jvd: 'not_performed'
}

const initialPulmonary: pulmonary = {
  increased_work: 'not_performed',
  quiet_breath: 'not_performed',
  auscultation: 'not_performed',
  wheezes: 'not_performed'
}

const initialCardiac: cardiac = {
  well_perfused: 'not_performed',
  regular_rhythm: 'not_performed',
  audible_s1_s2: 'not_performed',
  murmurs: 'not_performed',
  pedal_edema: 'not_performed',
  gynecomastia: 'not_performed'
}

const initialAbdomen: abdomen = {
  bowels_sounds: 'not_performed',
  tympanic: 'not_performed',
  nt_nd: 'not_performed',
  organomegaly: 'not_performed'
}

const initialSkin: skin = {
  cyanosis: 'not_performed',
  radial_pulses: 'not_performed',
  dorsalis_pedis_pulses: 'not_performed',
  palmar_erythema: 'not_performed',
  resting_tremor: 'not_performed',
  rashes_or_lesions: 'not_performed',
  tattoos: 'not_performed',
  light_touch: 'not_performed',
  pinprick: 'not_performed',
  cold_sensation: 'not_performed',
  proprioception: 'not_performed',
  extinction_to_dss: 'not_performed'
}

//TODO : need motor
const initialMotor: motor = {

}

const initialCoordination: coordination = {
  intention_tremor: 'not_performed',
  dysdiadochokinesia: 'not_performed',
  dysmetria: 'not_performed'
}

const initialGait: gait = {
  good_initiation: 'not_performed',
  narrow_based: 'not_performed',
  walk_in_tandem: 'not_performed',
  romberg_absent: 'not_performed'
}

const initialMental: mental = {
  oriented_well: 'not_performed',
  relate_history: 'not_performed',
  attentive: 'not_performed',
  fluent_language: 'not_performed',
  normal_prosody: 'not_performed',
  paraphasic_errors: 'not_performed',
  high_low_frequency_objects: 'not_performed',
  read_without_difficulty: 'not_performed',
  dysarthric: 'not_performed',
  midline_commands: 'not_performed',
  register_3_objects: 'not_performed',
  current_events: 'not_performed',
  apraxia: 'not_performed'
}


const initialPhysicalExaminationsState: physicalExaminationState = {
  vitals: initialVitals,
  general: initialGeneral,
  heent: initialHeent,
  cn_ii: initialCN_II,
  cn_iii: initialCN_III,
  cn_v: initialCN_V,
  cn_vii: initialCN_VII,
  cn_viii: initialCN_VIII,
  cn_ix: initialCN_IX,
  cn_xi: initialCN_XI,
  cn_xii: initialCN_XII,
  neck: initialNeck,
  pulmonary: initialPulmonary,
  cardiac: initialCardiac,
  abdomen: initialAbdomen,
  skin: initialSkin,
  motor: initialMotor,
  coordination: initialCoordination,
  gait: initialGait,
  mental: initialMental
}

type isShowingInput = {[key:string]: {[key:string]: boolean}}

function get_initial_input_state(default_val: boolean): isShowingInput{
  return {
    general: {
      awake: default_val,
      cooperative: default_val,
      interactive: default_val,
      NAD: default_val
    },
    heent: {
      normocephalic: default_val,
      anicteric_sclera: default_val,
      mucous_membranes_moist: default_val,
      no_lesions: default_val,
      normal_dentition: default_val
    },
    cn_ii: {
      perrl: default_val,
      vff: default_val,
      fundoscopic_exam: default_val
    },
    cn_iii: {
      eomi: default_val,
      saccades: default_val
    },
    cn_v: {
      facial_sensation: default_val
    },
    cn_vii: {
      facial_droop: default_val
    },
    cn_viii: {
      hearing_intact: default_val
    },
    cn_ix: {
      palate_elevates: default_val
    },
    cn_xi: {
      trapezii_scm_strength: default_val
    },
    cn_xii: {
      tongue_protrude: default_val
    },
    neck: {
      nuchal_rigidity: default_val,
      thyroid: default_val,
      cervical_lymphadenopathy: default_val,
      jvd: default_val
    },
    pulmonary: {
      increased_work: default_val,
      quiet_breath: default_val,
      auscultation: default_val,
      wheezes: default_val
    },
    cardiac: {
      well_perfused: default_val,
      regular_rhythm: default_val,
      audible_s1_s2: default_val,
      murmurs: default_val,
      pedal_edema: default_val,
      gynecomastia: default_val
    },
    abdomen: {
      bowels_sounds: default_val,
      tympanic: default_val,
      nt_nd: default_val,
      organomegaly: default_val
    },
    skin: {
      cyanosis: default_val,
      radial_pulses: default_val,
      dorsalis_pedis_pulses: default_val,
      palmar_erythema: default_val,
      resting_tremor: default_val,
      rashes_or_lesions: default_val,
      tattoos: default_val,
      light_touch: default_val,
      pinprick: default_val,
      cold_sensation: default_val,
      proprioception: default_val,
      extinction_to_dss: default_val
    },
    motor: {
  
    },
    coordination: {
      intention_tremor: default_val,
      dysdiadochokinesia: default_val,
      dysmetria: default_val
    },
    gait: {
      good_initiation: default_val,
      narrow_based: default_val,
      walk_in_tandem: default_val,
      romberg_absent: default_val
    },
    mental: {
      oriented_well: default_val,
      relate_history: default_val,
      attentive: default_val,
      fluent_language: default_val,
      normal_prosody: default_val,
      paraphasic_errors: default_val,
      high_low_frequency_objects: default_val,
      read_without_difficulty: default_val,
      dysarthric: default_val,
      midline_commands: default_val,
      register_3_objects: default_val,
      current_events: default_val,
      apraxia: default_val
    },
  }
}

const nameMap: {[key:string]: string} = {
  // category names
  general: 'General',
  heent: 'HEENT',
  cn_ii: 'Cranial Nerves - CN II',
  cn_iii: 'Cranial Nerves - CN III, IV, VI',
  cn_v: 'Cranial Nerves - CN V',
  cn_vii: 'Cranial Nerves - CN VII',
  cn_viii: 'Cranial Nerves - CN VIII',
  cn_ix: 'Cranial Nerves - CN IX, X',
  cn_xi: 'Cranial Nerves - CN XI',
  cn_xii: 'Cranial Nerves - CN XII',
  neck: 'Neck',
  pulmonary: 'Pulmonary',
  cardiac: 'Cardiac',
  abdomen: 'Abdomen',
  skin: 'Skin/Extremities/Sensation',
  motor: 'Motor',
  coordination: 'Coordination',
  gait: 'Gait',
  mental: 'Mental Status',
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
  normal_dentition: 'Normal Dentition',
  perrl: 'PERRL and Brisk',
  vff: 'VFF to Confrontation',
  fundoscopic_exam: 'Crisp Disc Margins with No Papilledema, Exudates, or Hemorrhages in Fundoscopic Exam',
  eomi: 'EOMI without Nystagmus',
  saccades: 'Normal Saccades',
  facial_sensation: 'Facial Sensation Intact to Light Touch',
  facial_droop: 'No Facial Droop; Facial Musculature Symmetric',
  hearing_intact: 'Hearing Intact to Finger-Rub Bilaterally',
  palate_elevates: 'Palate Elevates Symmetrically',
  trapezii_scm_strength: '5/5 Strength in Trapezii and SCM Bilaterally',
  tongue_protrude: 'Tongue Protrudes in Midline',
  nuchal_rigidity: 'Supple; No Nuchal Rigidity',
  thyroid: 'Thyroid is Normal in Size and Texture; No Dules',
  cervical_lymphadenopathy: 'No Cervical Lymphyadenopathy',
  jvd: 'No JVD',
  increased_work: 'Breathing Non-Laboured on Room Air; No Increased Work of Breathing',
  quiet_breath: 'Quiet Breath Sounds',
  auscultation: 'Clear to Auscultation Bilaterally',
  wheezes: 'No Wheezes, Rhonchi, or Rales',
  well_perfused: 'Warm and Well Perfused',
  regular_rhythm: 'Regular Rhythm; Normal Rate',
  audible_s1_s2: 'Audible S1 and S2',
  murmurs: 'No Murmurs/Rubs/Gallops',
  pedal_edema: 'No Pedal Edema',
  gynecomastia: 'No Gynecomastia',
  bowels_sounds: 'Normal Bowels Sounds',
  tympanic: 'Tympanic to Percussion',
  nt_nd: 'Soft; NT/ND',
  organomegaly: 'No Masses or Organomegaly',
  cyanosis: 'No Cyanosis',
  radial_pulses: 'Radial Pulses 2+',
  dorsalis_pedis_pulses: 'Dorsalis Pedis Pulses 2+',
  palmar_erythema: 'No Palmar Erythema',
  resting_tremor: 'No Resting Tremor',
  rashes_or_lesions: 'No Rashes or Lesions Noted',
  tattoos: 'No Tattoos',
  light_touch: 'No Deficits to Light Touch Throughout',
  pinprick: 'No Deficits to Pinprick Throughout',
  cold_sensation: 'No Deficits to Cold Sensations Throughout',
  proprioception: 'No Deficits to Proprioception Throughout',
  extinction_to_dss: 'No Extinction to DSS',
  intention_tremor: 'No Intention Tremor',
  dysdiadochokinesia: 'No Dysdiadochokinesia Noted',
  dysmetria: 'No Dysmetra on FNF or HKS Bilaterally',
  good_initiation: 'Good Initiation',
  narrow_based: 'Narrow-Based, Normal Stride and Arm Swing',
  walk_in_tandem: 'Able to Walk in Tandem Without Difficulty',
  romberg_absent: 'Romberg Absent',
  oriented_well: 'Awake, Alert, Oriented to Self, Place, Time, and Situation',
  relate_history: 'Able to Relate History Without Difficulty',
  attentive: 'Attentive; Able to Name MOY Backward Without Difficulty',
  fluent_language: 'Language is Fluent with Intact Repetition and Comprehension',
  normal_prosody: 'Normal Prosody',
  paraphasic_errors: 'No Parasatic Errors',
  high_low_frequency_objects: 'Able to Name Both High and Low Frequency Objects',
  read_without_difficulty: 'Able to Read Without Difficulty',
  dysarthric: 'Speech was Not dysarthric',
  midline_commands: 'Able to Follow Both Midline and Appendicular Commands',
  register_3_objects: 'Able to Register 3 Objects and Recall 3/3 at 5 Minutes',
  current_events: 'Good Knowledge of Current Events',
  apraxia: 'No Evidence of Aphraxia or Neglect'
}

const simpleRenderCategories: string[] = [
  'general',
  'heent',
  'cn_ii',
  'cn_iii',
  'cn_v',
  'cn_vii',
  'cn_viii',
  'cn_ix',
  'cn_xi',
  'cn_xii',
  'neck',
  'pulmonary',
  'cardiac',
  'abdomen',
  'skin',
  'motor',
  'coordination',
  'gait',
  'mental'
]

export const PhysicalExaminationPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
  defaultMode
}) => {
  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialPhysicalExaminationsState)
  const [isShowingCanvasState, canvasDispatch] = useReducer(inputReducer, get_initial_input_state(true))
  const [isShowingTextState, textDispatch] = useReducer(inputReducer, get_initial_input_state(true))

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/physical`);
    }

    canvasDispatch({
      category: '',
      condition_name: '',
      state: get_initial_input_state(canvasInit(defaultMode))
    })

    textDispatch({
      category: '',
      condition_name: '',
      state: get_initial_input_state(textInit(defaultMode))
    })
  }, [currentPage]);

  function renderChoices(category: string){
    return (
      <div key={category}>
        <h2>{nameMap[category]}</h2><br></br>
        {
          Object.keys(state[category]).map((condition: string) => {
            return (
              <div key={condition+'_all'}>
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
                  <div className='radio-group' key={condition+'_h'} style={{display: 'inline-block'}}>
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
                {state[category][condition] === 'healthy' && (
                  <PatientFormInput
                    dispatch={dispatch}
                    id={condition+'_i'}
                    inputType={'text'}
                    inputVal={null}
                    placeholder={''}
                    title={'Specifics'}
                    isShowingCanvas={isShowingCanvasState[category][condition]}
                    isShowingText={isShowingTextState[category][condition]}
                    setIsShowingCanvas={() => {
                      canvasDispatch({
                        category: category,
                        condition_name: condition,
                        state: null
                      })
                    }}
                    setIsShowingText={() => {
                      textDispatch({
                        category: category,
                        condition_name: condition,
                        state: null
                      })
                    }}
                    canvasHeight={200}
                    canvasWidth={600}
                    isTextArea={false}
                  />
                )}
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
