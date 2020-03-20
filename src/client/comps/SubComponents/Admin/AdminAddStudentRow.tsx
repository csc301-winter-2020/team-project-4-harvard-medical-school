import React from "react";
import "../../../scss/admin/admin-student-profile.scss";

interface AdminAddStudentProps {
  firstName: string;
  lastName: string;
  classID: number;
  studentID: number | null;
  requestStudentListRefresh: any;
}

function addStudentToClass(classID: number, studentID: number, requestStudentListRefresh: any) {
  console.log(`Adding student ${studentID} to class ${classID}`);
  // TODO: Make POST call to add `studentID` to `classID`.

  // Once we have added the student, they should be removed from the list after
  // we call the function below (which will mutate the state by making another
  // fetch call and repopulating the list).
  // Since the student will be added async, we should call the following function
  // inside of the promise.
  requestStudentListRefresh();
}

export const AdminAddStudentRow: React.FC<AdminAddStudentProps> = ({
  firstName,
  lastName,
  classID,
  studentID,
  requestStudentListRefresh
}) => {
  // TODO: OnClick seems to be a bit annoying in clicking it, did we apply it too far down the hierarchy of nodes?
  return (
    <>
      <div
        className="home-patient-profile-container"
        onClick={() => {
          if (studentID) {
            addStudentToClass(classID, studentID, requestStudentListRefresh)
          }
        }}
      >
        <div className="home-patient-profile-name-col">
          {lastName}, {firstName}
        </div>
      </div>
    </>
  );
};
