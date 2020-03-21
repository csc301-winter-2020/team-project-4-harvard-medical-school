import React, { useState } from "react";
import "../../../scss/instructor/instructor-student-profile-page.scss";
import { Header } from "../../SubComponents/Header";
import { max } from "../../../utils/utils";
import { InstructorStudentPatientEncounter } from "../../SubComponents/Instructor/InstructorStudentPatientEncounter";

interface InstructorStudentProfilePageProps {
  classID: number;
  studentID: number;
}

interface InstructorStudentProfile {
  date: Date,
  patientFirstName: string;
  patientLastName: string;
}

const mockData: InstructorStudentProfile[] = [
  { date: new Date(2827489172), patientFirstName: 'Justin', patientLastName: 'Trudeau' },
  { date: new Date(0), patientFirstName: 'Billy', patientLastName: 'Bicep' },
  { date: new Date(3333333333), patientFirstName: 'Panda', patientLastName: 'Monium' },
  { date: new Date(1827489172), patientFirstName: 'Steven', patientLastName: 'Kang' },
];

export const InstructorStudentProfilePage: React.FC<InstructorStudentProfilePageProps> = (
  props: InstructorStudentProfilePageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [studentName, setStudentName] = useState("StudentName");
  const [encounters, setEncounters] = useState(mockData);

  return <>
    <Header
      placeholder={""}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={false}
    />
    <div className="instructor-student-profile-container">
      <div className="instructor-student-profile-title">
        {studentName}'s Profile
      </div>
      <div>
        <button className="instructor-student-profile-page-button" onClick={() => alert('TODO')}>
          Contact Student
        </button>
        <button className="instructor-student-profile-page-button" onClick={() => alert('TODO')}>
          Unlock Help/Tips
        </button>
      </div>
      <div>
        <div className="home-page-separator-line"/>
        <div className="home-page-content">
          {encounters.map((encounter) => {
            return <InstructorStudentPatientEncounter
              date={encounter.date}
              firstName={encounter.patientFirstName}
              lastName={encounter.patientLastName}
            />
          })}
          <div
            className="home-page-content-whitespace"
            style={{ height: max(window.innerHeight - 400, 0) }}
          >
          </div>
        </div>
      </div>
    </div>
  </>;
};
