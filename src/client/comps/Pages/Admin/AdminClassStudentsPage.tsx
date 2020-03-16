import React, { useState } from "react";
import "../../../scss/admin/admin-page.scss";
import { max } from "../../../utils/utils";
import { Header } from "../../SubComponents/Header";
import { AdminStudentProfile } from "../../SubComponents/Admin/AdminStudentProfile";

interface AdminProfilePageProps {
}

interface StudentInfo {
  firstName: string;
  lastName: string;
}

const mockData: StudentInfo[] = [
  { firstName: 'Steve', lastName: 'Bobs' },
  { firstName: 'Yoko', lastName: 'Taro' },
  { firstName: 'Steven', lastName: 'Kang' },
  { firstName: 'Arnold', lastName: 'Schwarzenegger' },
  { firstName: 'Elon', lastName: 'Musk' },
  { firstName: 'Donald', lastName: 'Trump' },
  { firstName: 'Danny', lastName: 'Heap' },
  { firstName: 'Diane', lastName: 'Horton' },
  { firstName: 'Ima', lastName: 'Desktop' },
  { firstName: 'Panda', lastName: 'Monium' },
  { firstName: 'Diamond', lastName: 'Dozen' },
  { firstName: 'Tyrion', lastName: 'Lannister' },
  { firstName: 'Bernie', lastName: 'Sanders' },
];

export const AdminClassStudentsPage: React.FC<AdminProfilePageProps> = (
  props: AdminProfilePageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [className, setClassName] = useState("Winter 2020");
  const [students, setStudents] = useState(mockData);

  return <>
    <Header
      placeholder={""}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={false}
    />
    <div className="admin-page">
      <h1 className="admin-page-header">Class: {className}</h1>
      <div className="admin-page-button-margins">
        <button className="admin-page-button right-margin-button" onClick={() => alert('TODO')}>
          Export Data
        </button>
        <button className="admin-page-button" onClick={() => alert('TODO')}>
          Unlock Help/Tips
        </button>
      </div>
      <div>
        <div className="home-page-separator-line"/>
        <div className="home-page-content">
          {students.map((student) => {
            return <AdminStudentProfile
              firstName={student.firstName}
              lastName={student.lastName}
            />;
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
