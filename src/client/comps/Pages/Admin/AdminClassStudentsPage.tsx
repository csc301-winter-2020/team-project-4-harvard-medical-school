import React, { useState } from "react";
import "../../../scss/admin/admin-students-page.scss";
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
    <div className="admin-students">
      <h1 className="admin-students-header">Class: {className}</h1>
      <div>
        {students.map(student =>
          <div>
            <button className="admin-students-button-link" onClick={() => alert('TODO')}>
              {student.name}
            </button>
          </div>
        )}
      </div>
      <div className="top-margin">
        <button className="admin-students-button right-margin-button" onClick={() => alert('TODO')}>
          Export Data
        </button>
        <button className="admin-students-button" onClick={() => alert('TODO')}>
          Unlock Help/Tips
        </button>
      </div>
    </div>
  </>;
};
