import React, {useEffect, useReducer} from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import '../../../scss/patient-profiles/patient-physical-form.scss'

type PhysicalExamVitals = {
  bloodPressure: string,
  heartRate: number,
  oxygenSaturation: number,
  temperature: number,
  respiratoryRate: number,
  oxygenSupplement?: string,
  weight?: number,
  height?: number,
  bmi?: number,
  painScore?: number
};

// An empty string for the body part and status is allowed, and implies it may
// be edited by a textbox/canvas (and we are in the process of figuring out
// what the body part is).
//
// Further, an empty string for the status means that a textbox/canvas will be
// placed in the appropriate cell so the user can edit it. This may need to be
// changed in the future.
type PhysicalExamComponent = {
  bodyPart: string;
  status: string;
  custom: boolean;
  editable: boolean;
}

type PhysicalExamState = {
  vitals: PhysicalExamVitals;
  components: PhysicalExamComponent[];
};

const initialState: PhysicalExamState = {
  vitals: {
    bloodPressure: "120 / 80",
    heartRate: 70,
    oxygenSaturation: 95.0,
    temperature: 101.5,
    respiratoryRate: 1,
    bmi: 21
  },
  components: [
    {
      bodyPart: "Head",
      status: "Normocephalic",
      custom: false,
      editable: false
    },
    {
      bodyPart: "Eyes",
      status: "Accommodate to light",
      custom: false,
      editable: false
    }
  ]
};

function reducer(
  state: PhysicalExamState,
  action: { type: string; bodyPart: string }
): PhysicalExamState {
  let newState: PhysicalExamState = JSON.parse(JSON.stringify(state));
  let successfulAction = false;

  switch (action.type) {
    case 'newBodyPart':
      newState.components.push({
        bodyPart: "",
        status: "",
        custom: true,
        editable: true
      });
      successfulAction = true;
      break;
    case 'makeEditable':
      newState.components.forEach(c => {
        if (c.bodyPart === action.bodyPart) {
          c.status = '';
          c.editable = true;
          successfulAction = true;
        }
      });
      break;
    default:
      break;
  }

  // This is primarily in case a mistake is made and action is given to a body
  // part that does not exist (ex: someone wants to edit an `Eyes` body part
  // but no such one exists). This should only be triggered on developer error.
  if (!successfulAction) {
    throw new Error('Action was missing required elements.');
  }

  return newState;
}

// Converts a name to a usable ID name. This is needed for when the body part
// that comes from the database has to have a name. Note: This does not
// guarantee uniqueness. It is up to the caller to make sure of this.
// TODO: This might have to be removed since it may end up being pointless.
function nameToID(name) {
  return name.toLowerCase().replace(' ', '-');
}

function createFindingFromComponent(dispatch, c: PhysicalExamComponent) {
  if (c.status !== '') {
    return <b>{c.status}</b>;
  }

  // TODO: Note that the bodyPart is probably empty, which affects the ID.
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

function addNewFinding(dispatch, physicalComp: PhysicalExamComponent) {
  dispatch({ type: 'makeEditable', bodyPart: physicalComp.bodyPart });
}

function addPhysicalComponent(dispatch) {
  dispatch({ type: 'newBodyPart', bodyPart: '' });
}

function getBodyPartCell(dispatch, physicalComp: PhysicalExamComponent) {
  if (physicalComp.custom) {
    // TODO: Note that the bodyPart can be empty, which may affect the ID.
    return <span>
      <PatientFormInput
        dispatch={dispatch}
        id={nameToID(physicalComp.bodyPart)}
        inputType={"text"}
        inputVal={""}
        placeholder={"Enter text here"}
        title={""}
        isShowingCanvas={true}
        isShowingText={false}
        setIsShowingCanvas={() => {}}
        setIsShowingText={() => {}}
        canvasHeight={200}
        canvasWidth={400}
        isTextArea={true}
      />
    </span>
  }

  return <span>{physicalComp.bodyPart}</span>;
}

function getVitalTableRow(name: string, value?: any, unit?: string) {
  if (value) {
    return <tr>
      <td>{name}</td>
      <td>{value} {unit || ''}</td>
    </tr>
  }

  return <></>;
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
                {getVitalTableRow('Blood Pressure', state.vitals.bloodPressure)}
                {getVitalTableRow('Heart Rate', state.vitals.heartRate, 'bpm')}
                {getVitalTableRow('Oxygen Saturation', state.vitals.oxygenSaturation, '%')}
                {getVitalTableRow('Temperature', state.vitals.temperature, 'F')}
                {getVitalTableRow('Respiratory Rate', state.vitals.respiratoryRate, '(unit)')}
                {getVitalTableRow('Oxygen Supplement', state.vitals.oxygenSupplement)}
                {getVitalTableRow('Weight', state.vitals.weight)}
                {getVitalTableRow('Height', state.vitals.height)}
                {getVitalTableRow('BMI', state.vitals.bmi)}
                {getVitalTableRow('Pain Score', state.vitals.painScore)}
              </tbody>
            </table>
            <br/>
            <br/>
            <table id="physical-exam-findings-table" className="physical-exam-table">
              <thead>
                <tr>
                  <td className="physical-exam-table-right-align">Body Part</td>
                  <td>Value</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody>
                {
                  state.components.map(c => {
                    return <tr key={c.bodyPart}>
                      <td className="physical-exam-table-right-align">
                        {getBodyPartCell(dispatch, c)}
                      </td>
                      <td className={"physical-exam-findings-value" + (!c.editable ? " physical-exam-grayed-out" : "")}>
                        {createFindingFromComponent(dispatch, c)}
                      </td>
                      <td>
                        {!c.editable && <button onClick={(e) => addNewFinding(dispatch, c)}>Customize</button>}
                      </td>
                    </tr>;
                  })
                }
              </tbody>
            </table>
            <button className="physical-exam-button" onClick={(e) => addPhysicalComponent(dispatch)}>Add Physical Component</button>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};
