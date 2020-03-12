import React, { useState } from "react";
import "../../../scss/admin/admin-page.scss";
import { Header } from "../../SubComponents/Header";

interface AdminPageProps {
}

interface AdminClass {
  name: string;
  id: number;
}

const mockData: AdminClass[] = [
  { name: 'Summer 2017', id: 1 },
  { name: 'Fall 2019', id: 2, },
  { name: 'Winter 2020', id: 3 },
];

export const AdminPage: React.FC<AdminPageProps> = (
  props: AdminPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [adminName, setAdminName] = useState("Mr. AdminNameHere");
  const [classes, setClasses] = useState(mockData);

  return <>
    <Header
      placeholder={""}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={false}
    />
    <div className="admin-page">
      <h1 className="admin-page-header">Welcome, {adminName}</h1>
      <div>
        {classes.map(c =>
          <div>
            <button className="admin-page-list-button" onClick={() => alert('TODO')}>
              Class {c.name}
            </button>
          </div>
        )}
      </div>
      <div className="top-margin">
        <button className="admin-page-button" onClick={() => alert('TODO')}>
          Create Class
        </button>
      </div>
    </div>
  </>;
};
