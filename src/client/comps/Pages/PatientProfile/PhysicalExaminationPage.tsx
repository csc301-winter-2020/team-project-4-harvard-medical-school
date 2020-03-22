import React, { useEffect, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/patient-physical-form.scss";
import { textInit, canvasInit } from "../../../utils/utils";
import { toast } from "react-toastify";

function reducer(
  state: state,
  action: {
    category: string;
    condition_name: string;
    value: any;
    state: state | null;
  }
): state {
  if (action.state !== null) {
    return action.state;
  }
  return {
    ...state,
    [action.category]: {
      ...state[action.category],
      [action.condition_name]: action.value,
    },
  };
}

function inputShowingReducer(
  state: state,
  action: {
    category: string;
    condition_name: string;
    state: state | null;
  }
): state {
  if (action.state !== null) {
    return action.state;
  }
  return {
    ...state,
    [action.category]: {
      ...state[action.category],
      [action.condition_name]: !state[action.category][action.condition_name],
    },
  };
}

type state = { [key: string]: { [key: string]: any } };

function get_initial_state(default_val: boolean | string): state {
  return {
    general: {
      awake: default_val,
      cooperative: default_val,
      interactive: default_val,
      NAD: default_val,
    },
    heent: {
      normocephalic: default_val,
      anicteric_sclera: default_val,
      mucous_membranes_moist: default_val,
      no_lesions: default_val,
      normal_dentition: default_val,
    },
    cn_ii: {
      perrl: default_val,
      vff: default_val,
      fundoscopic_exam: default_val,
    },
    cn_iii: {
      eomi: default_val,
      saccades: default_val,
    },
    cn_v: {
      facial_sensation: default_val,
    },
    cn_vii: {
      facial_droop: default_val,
    },
    cn_viii: {
      hearing_intact: default_val,
    },
    cn_ix: {
      palate_elevates: default_val,
    },
    cn_xi: {
      trapezii_scm_strength: default_val,
    },
    cn_xii: {
      tongue_protrude: default_val,
    },
    neck: {
      nuchal_rigidity: default_val,
      thyroid: default_val,
      cervical_lymphadenopathy: default_val,
      jvd: default_val,
    },
    pulmonary: {
      increased_work: default_val,
      quiet_breath: default_val,
      auscultation: default_val,
      wheezes: default_val,
    },
    cardiac: {
      well_perfused: default_val,
      regular_rhythm: default_val,
      audible_s1_s2: default_val,
      murmurs: default_val,
      pedal_edema: default_val,
      gynecomastia: default_val,
    },
    abdomen: {
      bowels_sounds: default_val,
      tympanic: default_val,
      nt_nd: default_val,
      organomegaly: default_val,
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
      extinction_to_dss: default_val,
    },
    motor: {
      normal_bulk: default_val,
      no_pronator: default_val,
      no_adventitious_movements: default_val,
      no_asterixis: default_val,
      plantar_response: default_val,
    },
    coordination: {
      intention_tremor: default_val,
      dysdiadochokinesia: default_val,
      dysmetria: default_val,
    },
    gait: {
      good_initiation: default_val,
      narrow_based: default_val,
      walk_in_tandem: default_val,
      romberg_absent: default_val,
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
      apraxia: default_val,
    },
  };
}

const initialPhysicalExaminationsState = get_initial_state("not_performed");
initialPhysicalExaminationsState.vitals = {
  blood_pressure_systolic: "",
  blood_pressure_diastolic: "",
  beats_per_minute: "",
  respiratory_rate: "",
  temperature: "",
  o2_saturation: "",
  bmi: "",
};

const nameMap: { [key: string]: string } = {
  // category names
  general: "General",
  heent: "HEENT",
  cn_ii: "Cranial Nerves - CN II",
  cn_iii: "Cranial Nerves - CN III, IV, VI",
  cn_v: "Cranial Nerves - CN V",
  cn_vii: "Cranial Nerves - CN VII",
  cn_viii: "Cranial Nerves - CN VIII",
  cn_ix: "Cranial Nerves - CN IX, X",
  cn_xi: "Cranial Nerves - CN XI",
  cn_xii: "Cranial Nerves - CN XII",
  neck: "Neck",
  pulmonary: "Pulmonary",
  cardiac: "Cardiac",
  abdomen: "Abdomen",
  skin: "Skin/Extremities/Sensation",
  motor: "Motor",
  coordination: "Coordination",
  gait: "Gait",
  mental: "Mental Status",
  // condition names
  blood_pressure_systolic: "Systolic Blood Pressure",
  blood_pressure_diastolic: "Diastolic Blood Pressure",
  beats_per_minute: "Beats Per Minute",
  respiratory_rate: "Respiratory Rate",
  temperature: "Temperature",
  o2_saturation: "O2 Saturation",
  bmi: "BMI",
  awake: "Awake",
  cooperative: "Cooperative",
  interactive: "Interactive",
  NAD: "NAD",
  normocephalic: "Nomocephalic/Ataumatic",
  anicteric_sclera: "Anicteric Sclera",
  mucous_membranes_moist: "Mucous Membranes Moist",
  no_lesions: "No Lesions Noted in Oropharynx",
  normal_dentition: "Normal Dentition",
  perrl: "PERRL and Brisk",
  vff: "VFF to Confrontation",
  fundoscopic_exam:
    "Crisp Disc Margins with No Papilledema, Exudates, or Hemorrhages in Fundoscopic Exam",
  eomi: "EOMI without Nystagmus",
  saccades: "Normal Saccades",
  facial_sensation: "Facial Sensation Intact to Light Touch",
  facial_droop: "No Facial Droop; Facial Musculature Symmetric",
  hearing_intact: "Hearing Intact to Finger-Rub Bilaterally",
  palate_elevates: "Palate Elevates Symmetrically",
  trapezii_scm_strength: "5/5 Strength in Trapezii and SCM Bilaterally",
  tongue_protrude: "Tongue Protrudes in Midline",
  nuchal_rigidity: "Supple; No Nuchal Rigidity",
  thyroid: "Thyroid is Normal in Size and Texture; No Dules",
  cervical_lymphadenopathy: "No Cervical Lymphyadenopathy",
  jvd: "No JVD",
  increased_work:
    "Breathing Non-Laboured on Room Air; No Increased Work of Breathing",
  quiet_breath: "Quiet Breath Sounds",
  auscultation: "Clear to Auscultation Bilaterally",
  wheezes: "No Wheezes, Rhonchi, or Rales",
  well_perfused: "Warm and Well Perfused",
  regular_rhythm: "Regular Rhythm; Normal Rate",
  audible_s1_s2: "Audible S1 and S2",
  murmurs: "No Murmurs/Rubs/Gallops",
  pedal_edema: "No Pedal Edema",
  gynecomastia: "No Gynecomastia",
  bowels_sounds: "Normal Bowels Sounds",
  tympanic: "Tympanic to Percussion",
  nt_nd: "Soft; NT/ND",
  organomegaly: "No Masses or Organomegaly",
  cyanosis: "No Cyanosis",
  radial_pulses: "Radial Pulses 2+",
  dorsalis_pedis_pulses: "Dorsalis Pedis Pulses 2+",
  palmar_erythema: "No Palmar Erythema",
  resting_tremor: "No Resting Tremor",
  rashes_or_lesions: "No Rashes or Lesions Noted",
  tattoos: "No Tattoos",
  light_touch: "No Deficits to Light Touch Throughout",
  pinprick: "No Deficits to Pinprick Throughout",
  cold_sensation: "No Deficits to Cold Sensations Throughout",
  proprioception: "No Deficits to Proprioception Throughout",
  extinction_to_dss: "No Extinction to DSS",
  normal_bulk: "Normal Bulk; Tone Throughout",
  no_pronator: "No Pronator Drift Bilaterally",
  no_adventitious_movements: "No Adventitious Movements such as Tremor Noted",
  no_asterixis: "No Asterixis Noted",
  plantar_response: "Plantar Response was Flexor Bilaterally",
  intention_tremor: "No Intention Tremor",
  dysdiadochokinesia: "No Dysdiadochokinesia Noted",
  dysmetria: "No Dysmetra on FNF or HKS Bilaterally",
  good_initiation: "Good Initiation",
  narrow_based: "Narrow-Based, Normal Stride and Arm Swing",
  walk_in_tandem: "Able to Walk in Tandem Without Difficulty",
  romberg_absent: "Romberg Absent",
  oriented_well: "Awake, Alert, Oriented to Self, Place, Time, and Situation",
  relate_history: "Able to Relate History Without Difficulty",
  attentive: "Attentive; Able to Name MOY Backward Without Difficulty",
  fluent_language:
    "Language is Fluent with Intact Repetition and Comprehension",
  normal_prosody: "Normal Prosody",
  paraphasic_errors: "No Parasatic Errors",
  high_low_frequency_objects:
    "Able to Name Both High and Low Frequency Objects",
  read_without_difficulty: "Able to Read Without Difficulty",
  dysarthric: "Speech Not Dysarthric",
  midline_commands: "Able to Follow Both Midline and Appendicular Commands",
  register_3_objects: "Able to Register 3 Objects and Recall 3/3 at 5 Minutes",
  current_events: "Good Knowledge of Current Events",
  apraxia: "No Evidence of Aphraxia or Neglect",
};

const simpleRenderCategories: string[] = [
  "general",
  "heent",
  "cn_ii",
  "cn_iii",
  "cn_v",
  "cn_vii",
  "cn_viii",
  "cn_ix",
  "cn_xi",
  "cn_xii",
  "neck",
  "pulmonary",
  "cardiac",
  "abdomen",
  "skin",
  "motor",
  "coordination",
  "gait",
  "mental",
];

const initialTableState: state = {
  motor_exam: {
    delt_l: "",
    bi_l: "",
    tri_l: "",
    wre_l: "",
    ffi_l: "",
    fe_l: "",
    io_l: "",
    ip_l: "",
    quad_l: "",
    ham_l: "",
    ta_l: "",
    gastroc_l: "",
    ehl_l: "",
    delt_r: "",
    bi_r: "",
    tri_r: "",
    wre_r: "",
    ffi_r: "",
    fe_r: "",
    io_r: "",
    ip_r: "",
    quad_r: "",
    ham_r: "",
    ta_r: "",
    gastroc_r: "",
    ehl_r: "",
  },
  deep_tendon_reflexes: {
    bi_l: "",
    tri_l: "",
    brach_l: "",
    pat_l: "",
    ach_l: "",
    bi_r: "",
    tri_r: "",
    brach_r: "",
    pat_r: "",
    ach_r: "",
  },
};

const motor_l: string[] = [
  "delt_l",
  "bi_l",
  "tri_l",
  "wre_l",
  "ffi_l",
  "fe_l",
  "io_l",
  "ip_l",
  "quad_l",
  "ham_l",
  "ta_l",
  "gastroc_l",
  "ehl_l",
];

const motor_r: string[] = [
  "delt_r",
  "bi_r",
  "tri_r",
  "wre_r",
  "ffi_r",
  "fe_r",
  "io_r",
  "ip_r",
  "quad_r",
  "ham_r",
  "ta_r",
  "gastroc_r",
  "ehl_r",
];

const ref_l: string[] = ["bi_l", "tri_l", "brach_l", "pat_l", "ach_l"];
const ref_r: string[] = ["bi_r", "bri_r", "brach_r", "pat_r", "ach_r"];

function round0To5(n: string): string {
  if (n === "") {
    return n;
  }
  const n_parsed = parseFloat(n);
  if (n_parsed <= 0) {
    return "0";
  } else if (n_parsed >= 5) {
    return "5";
  } else {
    return n_parsed.toString();
  }
}

async function getPhysicalExaminationsInfo(patientID: number) {
  const res = await fetch(`/api/physicalExaminations/${patientID}`, {
    method: "GET",
  });
  return await res.json();
}

async function postPhysicalExaminationsInfo(patientID: number, data: state) {
  const spec = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`/api/physicalExaminations/${patientID}`, spec);
  return res;
}

export const PhysicalExaminationPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
  defaultMode,
  userType,
}) => {
  const history = useHistory();

  const [state, dispatch] = useReducer(
    reducer,
    initialPhysicalExaminationsState
  );

  const [tableState, tableDispatch] = useReducer(reducer, initialTableState);

  const [isShowingCanvasState, canvasShowDispatch] = useReducer(
    inputShowingReducer,
    get_initial_state(false)
  );
  const [isShowingTextState, textShowDispatch] = useReducer(
    inputShowingReducer,
    get_initial_state(false)
  );

  const [textState, textStateDispatch] = useReducer(
    reducer,
    get_initial_state("")
  );

  const myToast: any = toast;

  const postToDB = (state: state, tableState: state, textState: state) => {
    postPhysicalExaminationsInfo(patientID, {
      state: state,
      tableState: tableState,
      textState: textState,
    })
      .then(data => {
        console.log(data);
        myToast.success("Information saved");
      })
      .catch(err => {
        console.log(err);
        myToast.error("Information could not be saved");
      });
  };

  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/physical`);

      getPhysicalExaminationsInfo(patientID)
        .then(data => {
          dispatch({
            category: "",
            condition_name: "",
            value: "",
            state: data.state,
          });

          tableDispatch({
            category: "",
            condition_name: "",
            value: "",
            state: data.tableState,
          });

          textStateDispatch({
            category: "",
            condition_name: "",
            value: "",
            state: data.textState,
          });
          console.log("data retrieved from the database successfully");
        })
        .catch(err => {
          console.log("could not get Physical Examinations data from database");
        });

      canvasShowDispatch({
        category: "",
        condition_name: "",
        state: get_initial_state(canvasInit(defaultMode)),
      });

      textShowDispatch({
        category: "",
        condition_name: "",
        state: get_initial_state(textInit(defaultMode)),
      });
    }
  }, [currentPage]);

  function input0to5(table: string, entry: string) {
    return (
      <input
        key={entry}
        style={{ width: "50px", textAlign: "center" }}
        value={tableState[table][entry]}
        type="number"
        placeholder="0~5"
        min="0"
        max="5"
        onChange={e => {
          tableDispatch({
            category: table,
            condition_name: entry,
            value: round0To5(e.target.value),
            state: null,
          });
        }}
      />
    );
  }

  function renderMotorTables() {
    return (
      <>
        <br></br>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Motor Exams
        </div>
        <table>
          <tbody>
            <tr>
              <td style={{ width: "25px" }}></td>
              <td>Delt</td>
              <td>Bic</td>
              <td>Tri</td>
              <td>WrE</td>
              <td>FFI</td>
              <td>FE</td>
              <td>IO</td>
              <td>IP</td>
              <td>Quad</td>
              <td>Ham</td>
              <td>TA</td>
              <td>Gastroc</td>
              <td>EHL</td>
            </tr>
            <tr>
              <td>L</td>
              {motor_l.map((e: string) => {
                return <td key={"td_" + e}>{input0to5("motor_exam", e)}</td>;
              })}
            </tr>
            <tr>
              <td>R</td>
              {motor_r.map((e: string) => {
                return <td key={"td_" + e}>{input0to5("motor_exam", e)}</td>;
              })}
            </tr>
          </tbody>
        </table>
        <br></br>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Deep Tendon Reflexes
        </div>
        <br></br>
        <table>
          <tbody>
            <tr>
              <td style={{ width: "25px" }}></td>
              <td>Bi</td>
              <td>Tri</td>
              <td>Brach</td>
              <td>Pat</td>
              <td>Ach</td>
            </tr>
            <tr>
              <td>L</td>
              {ref_l.map((e: string) => {
                return <td key={"td_" + e}>{input0to5("motor_exam", e)}</td>;
              })}
            </tr>
            <tr>
              <td>R</td>
              {ref_r.map((e: string) => {
                return <td key={"td_" + e}>{input0to5("motor_exam", e)}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  function renderChoices(state: state, category: string) {
    return (
      <div key={category}>
        <h2>{nameMap[category]}</h2>
        <br></br>
        {Object.keys(state[category]).map((condition: string) => {
          return (
            <div key={condition + "_all"}>
              <div key={condition}>
                <div
                  className="radio-group"
                  key={condition + "_np"}
                  style={{ display: "inline-block" }}
                >
                  <label>
                    <input
                      type="radio"
                      name={condition + "_np"}
                      checked={state[category][condition] === "not_performed"}
                      onChange={() => {
                        dispatch({
                          category: category,
                          condition_name: condition,
                          value: "not_performed",
                          state: null,
                        });
                      }}
                    />
                    <p>Not Performed</p>
                  </label>
                </div>
                <div
                  className="radio-group"
                  key={condition + "_h"}
                  style={{ display: "inline-block" }}
                >
                  <label>
                    <input
                      type="radio"
                      name={condition + "_c"}
                      checked={state[category][condition] === "healthy"}
                      onChange={() => {
                        dispatch({
                          category: category,
                          condition_name: condition,
                          value: "healthy",
                          state: null,
                        });
                      }}
                    />
                    <p>{nameMap[condition]}</p>
                  </label>
                </div>
              </div>
              {state[category][condition] === "healthy" && (
                <PatientFormInput
                  dispatch={(action: {
                    type: string;
                    fieldName: string;
                    value: string;
                  }) => {
                    textStateDispatch({
                      category: category,
                      condition_name: condition,
                      value: action.value,
                      state: null,
                    });
                  }}
                  id={condition + "_i"}
                  inputType={"text"}
                  inputVal={textState[category][condition]}
                  placeholder={"Enter text here"}
                  title={"Specifics"}
                  isShowingCanvas={isShowingCanvasState[category][condition]}
                  isShowingText={isShowingTextState[category][condition]}
                  setIsShowingCanvas={() => {
                    canvasShowDispatch({
                      category: category,
                      condition_name: condition,
                      state: null,
                    });
                  }}
                  setIsShowingText={() => {
                    textShowDispatch({
                      category: category,
                      condition_name: condition,
                      state: null,
                    });
                  }}
                  canvasHeight={200}
                  canvasWidth={600}
                  isTextArea={true}
                />
              )}
            </div>
          );
        })}
        {category === "motor" && renderMotorTables()}
        <br></br>
      </div>
    );
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
        <div
          className={
            isShowingSidebar
              ? "physical-examination-history-page-outermost-container patient-profile-window"
              : "physical-examination-history-page-outermost-container patient-profile-window width-100"
          }
        >
          <div className="patient-profile-page-title">
            <h2>{pageName}</h2>
          </div>
          <div className="patient-profile-form-container">
            <h2>Vitals</h2>
            <br></br>
            <table>
              <tbody>
                {Object.keys(state.vitals).map((condition: string) => {
                  return (
                    <tr key={condition}>
                      <td>
                        <label
                          style={{
                            fontSize: "1.2rem",
                            marginRight: "30px",
                          }}
                        >
                          {nameMap[condition]}
                        </label>
                      </td>
                      <td>
                        <input
                          className="form-input-short"
                          placeholder={"Put value here"}
                          value={state.vitals[condition]}
                          type={"number"}
                          name={condition}
                          style={{
                            display: "inline-block",
                          }}
                          onChange={e => {
                            dispatch({
                              category: "vitals",
                              condition_name: condition,
                              value: e.target.value,
                              state: null,
                            });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br></br>
            {simpleRenderCategories.map((category: string) => {
              return renderChoices(state, category);
            })}
          </div>
          {userType === "Student" && (
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
                  postToDB(state, tableState, textState);
                }}
              >
                <FontAwesomeIcon icon="save" size="2x" />
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );
};
