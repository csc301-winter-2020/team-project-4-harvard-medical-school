/**
 * This is the page where admins are able to add students to a class
 * by clicking on them.
 */

import React, { useState, useEffect } from "react";
import "../../../scss/admin/admin-page.scss";
import { Student } from "./AdminClassStudentsPage";
import { Header } from "../../SubComponents/Header";
import { AdminAddStudentRow } from "../../SubComponents/Admin/AdminAddStudentRow";
import { max } from "../../../utils/utils";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { ToastContainer, toast } from "react-toastify";
import { MyToast } from "../../../utils/types";

interface AdminAddStudentPageProps {
  classID: number;
}

export const AdminClassAddStudentsPage: React.FC<AdminAddStudentPageProps> = (
  props: AdminAddStudentPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState("");
  const [nonEnrolledStudents, setNonEnrolledStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mToast: MyToast = toast as any;

  function performStudentListRefresh(setNonEnrolledStudents: React.Dispatch<React.SetStateAction<Student[]>>) {
    // TODO: Call setNonEnrolledStudents() with students that are eligible to be enrolled.
    // Fetch all students that aren't in the current class
    fetch(`/api/students/eligible/${props.classID}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          return [];
        } else {
          throw new Error(
            `Error code: ${response.status}, ${response.statusText}`
          );
        }
      })
      .then((data: any) => {
        const allEligibleStudents: Student[] = [];
        data.forEach((student: any) => {
          allEligibleStudents.push({
            id: student.id,
            firstName: student.first_name,
            lastName: student.last_name,
          });
        });
        setNonEnrolledStudents(allEligibleStudents);
      })
      .catch((err: any) => {
        console.log(err);
        mToast.warn(err);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    performStudentListRefresh(setNonEnrolledStudents);
  }, []);

  return (
    <>
      <Header
        placeholder={"Search Students..."}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={true}
        searchValue={searchVal}
        setSearchValue={setSearchVal}
      />
      {isLoading && <HelixLoader message="Loading Students..." />}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">
          Eligible Students To Add
        </div>
        <div className="home-page-separator-line" />
        <div className="home-page-patient-header-grid" />
        <div className="home-page-content">
          {nonEnrolledStudents.length === 0 && (
            <div style={{ marginLeft: "10px" }}>
              There are no eligible students to add!
            </div>
          )}
          {nonEnrolledStudents
            .filter(
              stud =>
                stud.firstName
                  .toLowerCase()
                  .includes(searchVal.toLowerCase()) ||
                stud.lastName.toLowerCase().includes(searchVal.toLowerCase())
            )
            .map((student, index: number) => {
              return (
                <AdminAddStudentRow
                  key={index}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  classID={props.classID}
                  studentID={student.id}
                  requestStudentListRefresh={() => {
                    performStudentListRefresh(setNonEnrolledStudents);
                  }}
                />
              );
            })}
          <div
            className="home-page-content-whitespace"
            style={{ height: max(window.innerHeight - 400, 0) }}
          >
            <div className="home-page-content-whitespace-logo" />
          </div>
        </div>
      </div>
    </>
  );
};
