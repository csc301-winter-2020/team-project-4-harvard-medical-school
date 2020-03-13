import React, { useEffect, useReducer } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { PatientFormInput } from "../../SubComponents/PatientProfile/PatientFormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/patient-physical-form.scss";


type field_value = 'not_performed' | 'healthy' | 'condition'

type vitals = {[key:string]: field_value}
type general = {[key:string]: field_value}
type heent = {[key:string]: field_value}
type cn_ii = {[key:string]: field_value}
type cn_iii = {[key:string]: field_value}
type cn_v = {[key:string]: field_value}
type cn_vii = {[key:string]: field_value}
type cn_viii = {[key:string]: field_value}
type cn_ix = {[key:string]: field_value}
type cn_xi = {[key:string]: field_value}
type cn_xii = {[key:string]: field_value}
type neck = {[key:string]: field_value}
type pulmonary = {[key:string]: field_value}
type cardiac = {[key:string]: field_value}
type abdomen = {[key:string]: field_value}
type skin = {[key:string]: field_value}
// TODO : check if this is right
type motor = {[key:string]: field_value}
type coordination = {[key:string]: field_value}
type gait = {[key:string]: field_value}
type mental = {[key:string]: field_value}

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
