/**
 * A single row in the admin's add student page.
 */

import React from "react";
import "../../../scss/admin/admin-student-profile.scss";
import {toast } from "react-toastify";
import { MyToast } from "../../../utils/types";

interface AdminAddStudentProps {
  firstName: string;
  lastName: string;
  classID: number;
  studentID: number | null;
  requestStudentListRefresh: any;
}

export const AdminAddStudentRow: React.FC<AdminAddStudentProps> = ({
  firstName,
  lastName,
  classID,
  studentID,
  requestStudentListRefresh
}) => {
  const mToast: MyToast = toast as any;

  function addStudentToClass(classID: number, studentID: number, requestStudentListRefresh: any) {
    console.log(`Adding student ${studentID} to class ${classID}`);
    // TODO: Make POST call to add `studentID` to `classID`.
    fetch(`/api/classes/${classID}/${studentID}`, {
      method: "POST"
    })
      .then(response =>{
        console.log("After post");
        if (response.status === 200) {
          requestStudentListRefresh();
          mToast.success("Successfully added student.");
        } else {
          throw new Error(
            "Could not add this student. Refresh and try again."
          );
        }
      })
      .catch((err: any) => {
        mToast.warn(err);
      })
    
  }


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
