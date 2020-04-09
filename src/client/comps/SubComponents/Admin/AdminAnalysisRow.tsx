/**
 * A single row in the admin's analysis page. Includes the rows of 
 * possible diagnosises that isabel suggests.
 */

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  dateFormatCompact,
  dateFormatFull,
  dateFormatExtra,
  dateFormatCompactTime,
  toTitleCase,
} from "../../../utils/utils";
import { IsabelResult } from "../../../utils/types";

interface AdminAnalysisRowProps {
  profile_id: number;
  student_input: string;
  isabel_result: IsabelResult;
  time_submitted: Date;
  isPortraitMode: boolean;
}

export const AdminAnalysisRow: React.FC<AdminAnalysisRowProps> = ({
  profile_id,
  student_input,
  isabel_result,
  time_submitted,
  isPortraitMode,
}) => {
  const [isShowingInfo, setIsShowingInfo] = useState(false);
  return (
    <>
      <div className="home-patient-profile-container" id="analysis-grid" onClick={() => {
        setIsShowingInfo(!isShowingInfo);
      }} style={{cursor: "pointer"}}>
        <div className="home-patient-profile-name-col">
          {isPortraitMode
            ? dateFormatCompactTime(time_submitted)
            : dateFormatExtra(time_submitted)}
        </div>
        <div
          className="home-patient-profile-info-btn"
        >
          <div className="home-patient-profile-info-icon">
            <FontAwesomeIcon
              icon="info-circle"
              size={isPortraitMode ? "2x" : "1x"}
            />
          </div>
        </div>
      </div>
      {isShowingInfo && (
        <div className="analysis-extra-info-container">
          <div className="isabel-diagnosis-row bold-span">
            <p className="isabel-diagnosis-row-name">Name</p>
            <p className="isabel-diagnosis-row-spec">Specialty</p>
            <p className="isabel-diagnosis-row-weight">Weightage</p>
          </div>
          {isabel_result.diagnoses_checklist.diagnoses === undefined ? (
            <p>There is no analysis for this time.</p>
          ) : (
            isabel_result.diagnoses_checklist.diagnoses.map(
              (d, index: number) => {
                return (
                  <div className="isabel-diagnosis-row" key={index}>
                    <p className="isabel-diagnosis-row-name">
                      {d.diagnosis_name}
                    </p>
                    <p className="isabel-diagnosis-row-spec">
                      {toTitleCase(d.specialty)}
                    </p>
                    <p className="isabel-diagnosis-row-weight">{d.weightage}</p>
                  </div>
                );
              }
            )
          )}
        </div>
      )}
    </>
  );
};
