/**
 * A row that represents a student, including their name and picture.
 * Viewable in the student select list view for the instructor.
 */

import React from "react";
import "../../../scss/instructor/instructor-student-patient-encounter";
import { useHistory } from "react-router";

interface InstructorStudentProfileRowProps {
  studentID: number;
  classID: number;
  name: string;
  imageURL: string;
}

export const InstructorStudentProfileRow: React.FC<InstructorStudentProfileRowProps> = ({
  studentID,
  classID,
  name,
  imageURL,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="instructor-page-list" onClick={() => {
        history.push(`/instructor/${classID}/student/${studentID}`);
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
