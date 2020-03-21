import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { HomePage } from "./StudentHomePage";
import { AdminPage } from "./Admin/AdminPage";
import { InstructorPage } from "./Instructor/InstructorPage";
import { HelixLoader } from "../SubComponents/HelixLoader";
import { StudentClassSelectPage } from "./Student/StudentClassSelectPage";

interface AllHomePageProps {}

export const AllHomePage: React.FC<AllHomePageProps> = ({}) => {
  const [userType, setUserType] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch("/api/me")
      .then((res: any) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("api me status not 200");
        }
      })
      .then((data: any) => {
        setUserType(data.user_type);
      })
      .catch((err: any) => {
        console.log("Could not verify your session.");
        console.log(err);
        history.push("/err/500/Please try again.");
      });
  }, []);
  return (
    <>
      {userType === null && <HelixLoader message="Verifying Login Info..." />}
      {userType === "Student" && <StudentClassSelectPage />}
      {userType === "Administrator" && <AdminPage />}
      {userType === "Educator" && <InstructorPage />}
      {(!(["Student", "Educator", "Administrator"]).includes(userType) && userType !== null) && <p>"Your user type is undefined. Please contact your administrator to ammend this."</p>}
    </>
  );
};
