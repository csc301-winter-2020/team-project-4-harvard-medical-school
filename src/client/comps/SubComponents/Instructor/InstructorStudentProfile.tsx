import React from "react";
import "../../../scss/instructor/instructor-student-patient-encounter.scss";

interface InstructorStudentProfileProps {
  name: string;
  imageURL: string;
}

export const InstructorStudentProfile: React.FC<InstructorStudentProfileProps> = ({
  name,
  imageURL
}) => {
  return (
    <>
      <div className="instructor-page-list">
        <div className="instructor-page-list-name-col">
          {name}
        </div>
        <div className="instructor-page-list-image-col">
          <img src={imageURL} className="instructor-student-image" alt="studentPicture" />
        </div>
      </div>
    </>
  );
};
