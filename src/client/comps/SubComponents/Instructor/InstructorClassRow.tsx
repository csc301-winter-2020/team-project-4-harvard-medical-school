/**
 * A row representing a single class in the instructor's class select page.
 */

import React from "react";
import "../../../scss/instructor/instructor-student-patient-encounter";
import { useHistory } from "react-router";

interface InstructorClassRowProps {
  name: string;
  classID: number;
}

export const InstructorClassRow: React.FC<InstructorClassRowProps> = ({
  name,
  classID
}) => {
  const history = useHistory();
  return (
    <>
      <div className="instructor-page-list" onClick={() => {
        history.push(`/instructor/${classID}/students`);
      }}>
        <div className="instructor-page-list-name-col">{name}</div>
      </div>
    </>
  );
};
