import React, { useState } from "react";
import "../../../scss/admin/admin-page.scss";
import { Header } from "../../SubComponents/Header";

interface AdminProfilePageProps {
}

interface StudentInfo {
  name: string;
}

const mockData: StudentInfo[] = [
  { name: 'Steve Bobs' },
  { name: 'Steven Kang' },
  { name: 'Arnold Schwarzenegger' },
  { name: 'Elon Musk' },
  { name: 'Donald Trump' },
  { name: 'Danny Heap' }
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
      <div>
        {students.map(student =>
          <div>
            <button className="admin-page-list-button" onClick={() => alert('TODO')}>
              {student.name}
            </button>
          </div>
        )}
      </div>
      <div className="top-margin">
        <button className="admin-page-button right-margin-button" onClick={() => alert('TODO')}>
          Export Data
        </button>
        <button className="admin-page-button" onClick={() => alert('TODO')}>
          Unlock Help/Tips
        </button>
      </div>
    </div>
  </>;
};
