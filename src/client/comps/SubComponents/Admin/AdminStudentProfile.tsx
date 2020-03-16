import React from "react";
import "../../../scss/admin/admin-student-profile.scss";

interface AdminStudentProfileProps {
  firstName: string;
  lastName: string;
}

export const AdminStudentProfile: React.FC<AdminStudentProfileProps> = ({
  firstName,
  lastName,
}) => {
  return (
    <>
      <div className="admin-student-profile-container">
        {lastName}, {firstName}
      </div>
    </>
  );
};
