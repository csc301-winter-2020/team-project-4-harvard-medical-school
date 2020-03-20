import React, { useState } from "react";
import "../../../scss/admin/admin-page.scss";
import { Student } from "./AdminClassStudentsPage";
import { Header } from "../../SubComponents/Header";
import { AdminAddStudentRow } from "../../SubComponents/Admin/AdminAddStudentRow";
import { max } from "../../../utils/utils";

interface AdminAddStudentPageProps {
  classID: number;
}

const mockData: Student[] = [
  { id: 1, firstName: "Student", lastName: "A" },
  { id: 2, firstName: "Student", lastName: "B" },
  { id: 3, firstName: "First", lastName: "Last" },
];

function performStudentListRefresh(setNonEnrolledStudents: any) {
  // TODO: Call setNonEnrolledStudents() with students that are eligible to be enrolled.
  // Fetch all students that aren't in the current class

}

export const AdminClassAddStudentsPage: React.FC<AdminAddStudentPageProps> = (
  props: AdminAddStudentPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [nonEnrolledStudents, setNonEnrolledStudents] = useState(mockData);

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
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Eligible Students To Add</div>
        <div className="home-page-separator-line"/>
        <div className="home-page-patient-header-grid"/>
        <div className="home-page-content">
          {nonEnrolledStudents
            .filter(
              stud =>
                stud.firstName
                  .toLowerCase()
                  .includes(searchVal.toLowerCase()) ||
                stud.lastName.toLowerCase().includes(searchVal.toLowerCase())
            )
            .map((student, index:number) => {
              return (
                <AdminAddStudentRow
                  key={index}
                  firstName={student.firstName}
                  lastName={student.lastName}
                  classID={props.classID}
                  studentID={student.id}
                  requestStudentListRefresh={() => { performStudentListRefresh(setNonEnrolledStudents); }}
                />
              );
            })}
          <div
            className="home-page-content-whitespace"
            style={{ height: max(window.innerHeight - 400, 0) }}
          >
            <div className="home-page-content-whitespace-logo"/>
          </div>
        </div>
      </div>
    </>
  );
};
