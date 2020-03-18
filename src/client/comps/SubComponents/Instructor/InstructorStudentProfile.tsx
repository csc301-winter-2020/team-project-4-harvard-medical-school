import React from "react";
import "../../../scss/instructor/instructor-student-patient-encounter";
import { useHistory } from "react-router";

interface InstructorStudentProfileProps {
  name: string;
  imageURL: string;
}

export const InstructorStudentProfile: React.FC<InstructorStudentProfileProps> = ({
  name,
  imageURL,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="instructor-page-list" onClick={() => {
        history.push(`/instructor/student/${1}`);
      }}>
        
        <div className="instructor-page-list-name-col">{name}</div>
        <div className="instructor-page-list-image-col">
          <img
            src={imageURL}
            className="instructor-student-image"
            alt="studentPicture"
          />
        </div>
      </div>
    </>
  );
};
