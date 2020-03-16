import React, { useState } from "react";
import "../../../scss/instructor/instructor-student-patient-page.scss";
import { Header } from "../../SubComponents/Header";

interface InstructorStudentPatientPageProps {
}

interface InstructorStudentPatient {
}

export const InstructorStudentPatientPage: React.FC<InstructorStudentPatient> = (
  props: InstructorStudentPatientPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [studentName, setStudentName] = useState("StudentName");
  const [patientName, setPatientName] = useState("PatientName");

  return <>
    <Header
      placeholder={""}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={true}
      searchValue={searchVal}
      setSearchValue={setSearchVal}
    />
    <div className="instructor-student-patient-container">
      <div className="instructor-student-patient-header">
        Student {studentName}: Patient {patientName}
      </div>
      <div>
        <button className="instructor-student-patient-button" onClick={() => alert('TODO')}>
          Look at Student Notes
        </button>
      </div>
      <div>
        <button className="instructor-student-patient-button" onClick={() => alert('TODO')}>
          Enter final Diagnoses for patient
        </button>
      </div>
    </div>
  </>;
};
