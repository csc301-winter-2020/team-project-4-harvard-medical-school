import React from "react";
import "../../../scss/instructor/instructor-student-patient-encounter.scss";
import { dateFormatFull } from "../../../utils/utils";

interface InstructorStudentPatientEncounterProps {
  date: Date,
  firstName: string,
  lastName: string,
}

export const InstructorStudentPatientEncounter: React.FC<InstructorStudentPatientEncounterProps> = ({
    date,
    firstName,
    lastName,
}) => {
  return (
    <>
      <div className="instructor-student-patient-encounter">
        <div className="instructor-student-patient-encounter-date-col">
          {dateFormatFull(date.getTime())}
        </div>
        <div className="instructor-student-patient-encounter-name-col">
          {lastName}, {firstName}
        </div>
      </div>
    </>
  );
};
