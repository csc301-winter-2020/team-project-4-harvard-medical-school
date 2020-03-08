import React, { useEffect, useReducer, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import "../../../scss/patient-profiles/patient-profile-form.scss";

function reducer(
  state: ReviewOfSystemsState,
  action: {
    category: string
    symptomName: string
    // TODO : add a nullable attribute for editting the entire state
    reviewOfSystems: ReviewOfSystemsState | null
  }
): ReviewOfSystemsState{
  if(action.reviewOfSystems !== null){
    return action.reviewOfSystems
  }
  if(Object.keys(state).includes(action.category) 
      && Object.keys(state[action.category]).includes(action.symptomName)){
    return {
      ...state,
      [action.category]: {
        ...state[action.category],
        [action.symptomName]: !state[action.category][action.symptomName],
      },
    };
  }
  throw new Error("Invalid action.");
}

function reducerTemp(
  state: boolean,
  action: any
){
  return !state
}

type category = endocrine
                | vision
                | headNeck
                | pulmonary
                | cardiovascular
                | gastrointestinal
                | gynaecological
                | hematology
                | neurological
                | musculoskeletal
                | mental
                | skinHair

type endocrine = {
  [key:string]: boolean
  // weightLoss: boolean
  // weightGain: boolean
  // fatigue: boolean
  // difficultySleeping: boolean
  // feelingUnwell: boolean
  // chronicPain: boolean
  // fevers: boolean
  // chills: boolean
  // sweats: boolean
  // lossOfAppetite: boolean
  // heatIntolerance: boolean
  // coldIntolerance: boolean
  // polyphagia: boolean
  // polydipsia: boolean
}

type vision = {
  [key:string]: boolean
  // decreaseInVision: boolean
  // increaseInVision: boolean
  // blurriness: boolean
  // pain: boolean
  // doubleVision: boolean
  // eyeDischarge: boolean
  // redEye: boolean
}

type headNeck = {
  [key:string]: boolean
  // pain: boolean
  // soresInMouth: boolean
  // soresAroundMouth: boolean
  // ulcersInMouth: boolean
  // ulcersAroundMouth: boolean
  // masses: boolean
  // growths: boolean
  // acuityChange: boolean
  // earPain: boolean
  // earDischarge: boolean
  // nasalDischarge: boolean
  // voiceChange: boolean
  // hoarseness: boolean
  // toothPain: boolean
  // lumpInThroat: boolean
}

type pulmonary = {
  [key:string]: boolean
  // chestPain: boolean
  // cough: boolean
  // haemoptysis: boolean
  // wheezing: boolean
  // snoring: boolean
  // aponoea: boolean
}

type cardiovascular = {
  [key:string]: boolean
  // chestPain: boolean
  // chestPressure: boolean
  // shortBreathRest: boolean
  // shortBreathExertion: boolean
  // orthopnoea: boolean
  // paroxysmal: boolean
  // lowerOedema: boolean
  // lossOfConsciousness: boolean
  // palpitation: boolean
  // legPain: boolean
  // legCramps: boolean
  // //TODO: add fast/slow to heal
  // ulcersOnFeet: boolean
  // woundsOnFeet: boolean
}

type gastrointestinal = {
  [key:string]: boolean
  // substernalPain: boolean
  // abdominalPain: boolean
  // difficultySwallowing: boolean
  // painSwallowing: boolean
  // nausea: boolean
  // vomiting: boolean
  // abdominalSwelling: boolean
  // jaundice: boolean
  // vomitingBlood: boolean
  // blackStools: boolean
  // bloodyStools: boolean
  // constipation: boolean
  // diarrhoea: boolean
  // //TODO: enter text?
  // changesInBowelHabits: boolean
}

type gynaecological = {
  [key:string]: boolean
  // polyuria: boolean
  // bloodyUrine: boolean
  // buringUrination: boolean
  // incontinence: boolean
  // urgentUrination: boolean
  // frequentUrination: boolean
  // incompleteEmptying: boolean
  // hesitance: boolean
  // decreasedForce: boolean
  // needVoid: boolean
}

//TODO: add for men/women

type hematology = {
  [key:string]: boolean
  // abnormalBleeding: boolean
  // abnormalBruising: boolean
  // newLumps: boolean
}

type neurological = {
  [key:string]: boolean
  // lossOfConsciousness: boolean
  // seizureActivity: boolean
  // numbness: boolean
  // weakness: boolean
  // dizziness: boolean
  // balanceProblems: boolean
  // headaches: boolean
}

type musculoskeletal = {
  [key:string]: boolean
  // jointPain: boolean
  // jointSwelling: boolean
  // muscleAches: boolean
  // lowBackPain: boolean
  // kneePain: boolean
  // kneeSwelling: boolean
  // handPain: boolean
  // handSwelling: boolean
  // elbowPain: boolean
  // elbowSwelling: boolean
  // hipPain: boolean
  // hipSwelling: boolean
  // shoulderPain: boolean
  // shoulderSwelling: boolean
}

type mental = {
  [key:string]: boolean
  // memory: boolean
  // confusion: boolean
  // anxiety: boolean
}

type skinHair = {
  [key:string]: boolean
  // hairLoss: boolean
  // skinEruptions: boolean
  // rashes: boolean
  // growingSores: boolean
  // lesions: boolean
  // itching: boolean
}

type ReviewOfSystemsState = {
  [key: string]: category
  // endocrine: endocrine 
  // vision: vision
  // headNeck: headNeck
  // pulmonary: pulmonary
  // cardiovascular: cardiovascular
  // gastrointestinal: gastrointestinal
  // gynaecological: gynaecological
  // hematology: hematology
  // neurological: neurological
  // musculoskeletal: musculoskeletal
  // mental: mental
  // skinHair: skinHair
}

const initialEndo: endocrine = {
  weightLoss: false,
  weightGain: false,
  fatigue: false,
  difficultySleeping: false,
  feelingUnwell: false,
  chronicPain: false,
  fevers: false,
  chills: false,
  sweatsEndocrine: false,
  lossOfAppetite: false,
  heatIntolerance: false,
  coldIntolerance: false,
  polyphagia: false,
  polydipsia: false,
};

const initialVision: vision = {
  decreaseInVision: false,
  increaseInVision: false,
  blurriness: false,
  painVision: false,
  doubleVision: false,
  eyeDischarge: false,
  redEye: false,
};

const initialHeadNeck: headNeck = {
  painHeadNeck: false,
  soresInMouth: false,
  soresAroundMouth: false,
  ulcersInMouth: false,
  ulcersAroundMouth: false,
  masses: false,
  growths: false,
  acuityChange: false,
  earPain: false,
  earDischarge: false,
  nasalDischarge: false,
  voiceChange: false,
  hoarseness: false,
  toothPain: false,
  lumpInThroat: false
}

const initialPulmonary: pulmonary = {
  chestPainPulmonary: false,
  cough: false,
  haemoptysis: false,
  wheezing: false,
  snoring: false,
  aponoea: false
}

const initialCardiovascular: cardiovascular = {
  chestPainCardiovascular: false,
  chestPressure: false,
  shortBreathRest: false,
  shortBreathExertion: false,
  orthopnoea: false,
  paroxysmal: false,
  lowerOedema: false,
  lossOfConsciousnessCardiovascular: false,
  palpitation: false,
  legPain: false,
  legCramps: false,
  ulcersOnFeet: false,
  woundsOnFeet: false
}

const initialGastrointestinal: gastrointestinal = {
  substernalPain: false,
  abdominalPain: false,
  difficultySwallowing: false,
  painSwallowing: false,
  nausea: false,
  vomiting: false,
  abdominalSwelling: false,
  jaundice: false,
  vomitingBlood: false,
  blackStools: false,
  bloodyStools: false,
  constipation: false,
  diarrhoea: false,
  changesInBowelHabits: false
}

const initialGynaecological: gynaecological = {
  polyuria: false,
  bloodyUrine: false,
  buringUrination: false,
  incontinence: false,
  urgentUrination: false,
  frequentUrination: false,
  incompleteEmptying: false,
  hesitance: false,
  decreasedForce: false,
  needVoid: false,
  erectileDysfunction: false,
  penileDischarge: false,
  penilePain: false,
  testicularPain: false,
  testicularSwelling: false,
  penileUlcers: false,
  penileGrowths: false,
  sweatsGynaecological: false,
  pastPregnancies: false,
  vaginalDischarge: false,
  menstruationCessation: false,
  menstruationIrregularity: false,
  breastPain: false,
  breastDischarge: false,
  breastMass: false
}

//TODO: add for men/women

const initialHematology: hematology = {
  abnormalBleeding: false,
  abnormalBruising: false,
  newLumps: false
}

const initialNeurological: neurological = {
  lossOfConsciousnessNeurological: false,
  seizureActivity: false,
  numbness: false,
  weakness: false,
  dizziness: false,
  balanceProblems: false,
  headaches: false
}

const initialMusculoskeletal: musculoskeletal = {
  jointPain: false,
  jointSwelling: false,
  muscleAches: false,
  lowBackPain: false,
  kneePain: false,
  kneeSwelling: false,
  handPain: false,
  handSwelling: false,
  elbowPain: false,
  elbowSwelling: false,
  hipPain: false,
  hipSwelling: false,
  shoulderPain: false,
  shoulderSwelling: false
}

const initialMental: mental = {
  memory: false,
  confusion: false,
  anxiety: false
}

const initialSkinHair: skinHair = {
  hairLoss: false,
  skinEruptions: false,
  rashes: false,
  growingSores: false,
  lesions: false,
  itching: false
}

const initialState: ReviewOfSystemsState = {
  endocrine: initialEndo,
  vision: initialVision,
  headNeck: initialHeadNeck,
  pulmonary: initialPulmonary,
  cardiovascular: initialCardiovascular,
  gastrointestinal: initialGastrointestinal,
  gynaecological: initialGynaecological,
  hematology: initialHematology,
  neurological: initialNeurological,
  musculoskeletal: initialMusculoskeletal,
  mental: initialMental,
  skinHair: initialSkinHair
}

type nameMap = {
  [key:string]: string
}

const nameMap: nameMap = {
  endocrine: 'General/Endocrine Symptoms',
  vision: 'Vision Symptoms',
  headNeck: 'Head and Neck Symptoms',
  pulmonary: 'Pulmonary Symptoms',
  cardiovascular: 'Cardiovascular Symptoms',
  gastrointestinal: 'Gastrointestinal Symptoms',
  gynaecological: 'Gynaecological Symptoms',
  hematology: 'Hematologic Symptoms',
  neurological: 'Neurological Symptoms',
  musculoskeletal: 'Musculoskeletal Symptoms',
  mental: 'Mental Health Symptoms',
  skinHair: 'Skin and Hair Symptoms',

  weightLoss: 'Weight Loss',
  weightGain: 'Weight Gain',
  fatigue: 'Fatigue',
  difficultySleeping: 'Difficulty Sleeping',
  feelingUnwell: 'Feeling Unwell in General',
  chronicPain: 'Chronic Pain',
  fevers: 'Fevers',
  chills: 'Chills',
  sweatsEndocrine: 'Sweats',
  lossOfAppetite: 'Loss of Appetite',
  heatIntolerance: 'Heat Intolerance',
  coldIntolerance: 'Cold Intolerance',
  polyphagia: 'Polyphagia',
  polydipsia: 'Polydipsia',
  decreaseInVision: 'Decrease In Vision',
  increaseInVision: 'Increase In Vision',
  blurriness: 'Blurriness',
  painVision: 'Pain',
  doubleVision: 'Double Vision',
  eyeDischarge: 'Eye Discharge',
  redEye: 'Red Eye',
  painHeadNeck: 'Pain',
  soresInMouth: 'Sores In Mouth',
  soresAroundMouth: 'Sores Around Mouth',
  ulcersInMouth: 'Ulcers In Mouth',
  ulcersAroundMouth: 'Ulcers Around Mouth',
  masses: 'Masses',
  growths: 'Growths',
  acuityChange: 'Change In Hearing Acuity',
  earPain: 'Ear Pain',
  earDischarge: 'Ear Discharge',
  nasalDischarge: 'Nasal Discharge',
  voiceChange: 'Change In Voice',
  hoarseness: 'Hoarseness',
  toothPain: 'Tooth Pain',
  lumpInThroat: 'Sense Of Lump With Swallowing',
  chestPainPulmonary: 'Chest Pain',
  cough: 'Coughs',
  haemoptysis: 'Haemoptysis',
  wheezing: 'Wheezing',
  snoring: 'Snoring',
  aponoea: 'Aponoea',
  chestPainCardiovascular: 'ChestPain',
  chestPressure: 'Chest Pressure',
  shortBreathRest: 'Shortness Of Breath At Rest',
  shortBreathExertion: 'Shortness Of Breath With Exertion',
  orthopnoea: 'Orthopnoea',
  paroxysmal: 'Paroxysmal Nocturnal Dyspnoea',
  lowerOedema: 'Lower Extremity Oedema',
  lossOfConsciousnessCardiovascular: 'Sudden Loss Of Consciousness',
  palpitation: 'Palpitations',
  legPain: 'Leg Pain With Ambulation',
  legCramps: 'Leg Cramps With Ambulation',
  ulcersOnFeet: 'Ulcers On Feet',
  woundsOnFeet: 'Wounds On Feet',
  substernalPain: 'Substernal Burning',
  abdominalPain: 'Abdominal Pain',
  difficultySwallowing: 'Difficulty Swallowing',
  painSwallowing: 'Pain Upon Swallowing',
  nausea: 'Nausea',
  vomiting: 'Vomiting',
  vomitingBlood: 'Vomiting Blood',
  abdominalSwelling: 'Abdominal Distention',
  jaundice: 'Jaundice',
  blackStools: 'Black Stools',
  bloodyStools: 'Bloody Stools',
  constipation: 'Constipation',
  diarrhoea: 'Diarrhoea',
  changesInBowelHabits: 'Changes In Bowel Habits',
  polyuria: 'Polyuria',
  bloodyUrine: 'Blood In Urine',
  buringUrination: 'Burning With Urination',
  incontinence: 'Incontinence',
  urgentUrination: 'Urgent Urination',
  frequentUrination: 'Frequent Urination',
  incompleteEmptying: 'Incomplete Emptying',
  hesitance: 'Hesitance',
  decreasedForce: 'Decreased Force Of Stream',
  needVoid: 'Need To Void Soon After Urination',
  erectileDysfunction: 'Erectile Dysfunction',
  penileDischarge: 'Penile Discharge',
  penilePain: 'Penile Pain',
  testicularPain: 'Testicular Pain',
  testicularSwelling: 'Testicular Swelling',
  penileUlcers: 'Penile Ulcers',
  penileGrowths: 'Penile Growths',
  sweatsGynaecological: 'Sweats',
  pastPregnancies: 'Past Pregnancies' ,
  vaginalDischarge: 'Vaginal Discharge',
  menstruationCessation: 'Cessation Of Menstruation',
  menstruationIrregularity: 'Irregularity Of Menstruation',
  breastPain: 'Breast Pain',
  breastDischarge: 'Breast Discharge',
  breastMass: 'Breast Mass',
  abnormalBleeding: 'Abnormal Bleeding',
  abnormalBruising: 'Abnormal Bruising',
  newLumps: 'New Lumps Or Bumps',
  lossOfConsciousnessNeurological: 'AbruptLossOfConsciousness',
  seizureActivity: 'Witnessed Seizure Activity',
  numbness: 'Numbness',
  weakness: 'Weakness',
  dizziness: 'Dizziness',
  balanceProblems: 'Balance Problems',
  headaches: 'Headaches',
  muscleAches: 'Muscle Aches',
  jointPain: 'Joint Pain',
  jointSwelling: 'Joint Swelling',
  lowBackPain: 'Low Back Pain',
  kneePain: 'Knee Pain',
  kneeSwelling: 'Knee Swelling',
  handPain: 'Hand Pain',
  handSwelling: 'Hand Swelling',
  elbowPain: 'Elbow Pain',
  elbowSwelling: 'Elbow Swelling',
  hipPain: 'Hip Pain',
  hipSwelling: 'Hip Swelling',
  shoulderPain: 'Shoulder Pain',
  shoulderSwelling: 'Shoulder Swelling',
  memory: 'Memory Problems',
  confusion: 'Confusion',
  anxiety: 'Anxious Most Of The Time',
  hairLoss: 'Hair Loss',
  skinEruptions: 'Skin Eruptions',
  rashes: 'Rashes',
  growingSores: 'Sores That Grow/Don\'t Heal',
  lesions: 'Lesions Changing In Size, Shape, Colour',
  itching: 'Itching'
}

async function getPatientInfo(patientID: number){
  const res = await fetch(`/api/patientprofile/${patientID}`, {method: 'GET'})
  return await res.json()
}

async function postReviewOfSystemsInfo(patientID: number, data: ReviewOfSystemsState){
  const spec = { 
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const res = await fetch(`/api/reviewOfSystems/${patientID}`, spec)
  return res
}

async function getReviewOfSystems(patientID: number){
  const res = await fetch(`/api/reviewOfSystems/${patientID}`, {method: 'GET'})
  return await res.json()
}

export const ReviewOfSystemsPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  patientID,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [gender, setGender] = useState('undefined')
  
  
  const [postFlag, dispatchPost] = useReducer(reducerTemp, false)

  const postToDB = (state: ReviewOfSystemsState) => {
    // POST request to update the patient information
    postReviewOfSystemsInfo(patientID, state).then((data) => {
      console.log(data)
    })
  }


  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/reviewofsystems`);
      //get the gender of the patient
      getPatientInfo(patientID).then((data) => {
        setGender(data.gender)
      })

      getReviewOfSystems(patientID).then((data) => {
        dispatch({category: 'N/A', symptomName: 'N/A', reviewOfSystems: data})
      })
    }
  }, [currentPage]);

  const isInitialMount = useRef(true)

  useEffect(() => {
    if(isInitialMount.current){
      isInitialMount.current = false
    }else{
      postToDB(state)
    }
  }, [postFlag])

  window.onload = () => {
    const saveButton = document.querySelector('.nav-btn-save')
    saveButton.addEventListener('click', () => dispatchPost(!postFlag))

    const helpButton = document.querySelector('.nav-btn-help')
    helpButton.addEventListener('click', () => {
      getReviewOfSystems(patientID).then((data) => {
        console.log(data)
      })
    })
  }

  // intelligent form specifications
  const dependencies: {[key:string]: [string]} = {
    weightLoss: ['weightGain'],
    weightGain: ['weightLoss'],
    decreaseInVision: ['increaseInVision'],
    increaseInVision: ['decreaseInVision'],
    polyphagia: ['polydipsia'],
    polydipsia: ['polyphagia']
  }

  const genderRelatedSymptoms: {[key:string]: string}= {
    erectileDysfunction: 'Male',
    penileDischarge: 'Male',
    penilePain: 'Male',
    testicularPain: 'Male',
    testicularSwelling: 'Male',
    penileUlcers: 'Male',
    penileGrowths: 'Male',
    sweatsGynaecological: 'Female',
    pastPregnancies: 'Female',
    vaginalDischarge: 'Female',
    menstruationCessation: 'Female',
    menstruationIrregularity: 'Female',
    breastPain: 'Female',
    breastDischarge: 'Female',
    breastMass: 'Female'
  }
  
  function checkDependency(category: category, symptomName: string): boolean{
    return !(symptomName in dependencies) || dependencies[symptomName].reduce((acc: boolean, elem: string) => acc && !category[elem], true)
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
        <div className="review-of-systems-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h2>{pageName}</h2>
          </div>
          <div className="patient-profile-form-container">
            {
              Object.keys(state).map((category: string) => {
                return (
                  <div key={category}>
                    <h2>{nameMap[category]}</h2>
                    <br></br>
                    {
                      Object.keys(state[category]).map((symptomName: string) => {
                        // check for gender-dependent symptoms
                        if(!(symptomName in genderRelatedSymptoms) || 
                            (symptomName in genderRelatedSymptoms && genderRelatedSymptoms[symptomName] === gender)){
                          // check for intelligent form
                          if(checkDependency(state[category], symptomName)) {
                            return (
                              <div className="radio-group" key={symptomName}>
                                <label>
                                  <input
                                    type="radio"
                                    name={symptomName}
                                    checked={state[category][symptomName]}
                                    onClick={() => 
                                      dispatch({
                                        category: category,
                                        symptomName: symptomName,
                                        reviewOfSystems: null
                                      })
                                    }
                                  />
                                  <p>{nameMap[symptomName]}</p>
                                </label>
                              </div>
                            )
                          }
                          return (
                            <div className="radio-group" key={symptomName}>
                              <label>
                                <p style={{ color: "grey" }}>
                                  {nameMap[symptomName]}
                                </p>
                              </label>
                            </div>
                          )
                        }
                      })
                    }
                    <br></br>
                  </div>
                )
              })
            }
          </div>
        </div>
      </CSSTransition>
    </>
  );
};