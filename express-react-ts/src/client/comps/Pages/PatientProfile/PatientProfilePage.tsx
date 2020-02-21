import React, { useState, useEffect } from "react";
import { DemographicsPage } from "./DemographicsPage";
import "../../../scss/patient-profiles/patient-profiles.scss";
import { Header } from "../../SubComponents/Header";

interface PatientProfilePageProps {}

type contentType =
  | "Demographics"
  | "Chief Complaint & History of Present Illness"
  | "Past Medical History"
  | "Social History"
  | "Family History"
  | "Review of Systems"
  | "Physical Examination"
  | "Imaging Results"
  | "Lab Results"
  | "Differential & Clinical Scores";

const contents: contentType[] = [
  "Demographics",
  "Chief Complaint & History of Present Illness",
  "Past Medical History",
  "Social History",
  "Family History",
  "Review of Systems",
  "Physical Examination",
  "Imaging Results",
  "Lab Results",
  "Differential & Clinical Scores",
];

const initNavDots = () => {
  const container = [];
  for (let i = 0; i < contents.length; i++) {
    container.push(
      <div
        id={`patient-profile-page-dot-${i}`}
        className="patient-profile-page-dot"
      ></div>
    );
  }
  return container;
};

export const PatientProfilePage: React.FC<PatientProfilePageProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState<contentType>("Demographics");
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);

  useEffect(() => {
    const sidebarItems = document.querySelectorAll(
      ".patient-profile-page-sidebar-item"
    );
    const navDots = document.querySelectorAll(".patient-profile-page-dot");
    sidebarItems.forEach(item => {
      item.className = "patient-profile-page-sidebar-item";
    });
    navDots.forEach(dot => {
      dot.className = "patient-profile-page-dot";
    });
    const selectedPage = document.querySelector(
      `#sidebar-item-${contents.indexOf(currentPage)}`
    );
    const selectedDot = document.querySelector(
      `#patient-profile-page-dot-${contents.indexOf(currentPage)}`
    );
    selectedPage.className =
      "patient-profile-page-sidebar-item patient-profile-page-sidebar-item--active";
    selectedDot.className =
      "patient-profile-page-dot patient-profile-page-dot--active";
  }, [currentPage]);

  return (
    <>
      <Header
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      <div className="patient-profile-page-outermost-container">
        <nav className="patient-profile-page-sidebar-container">
          <div className="patient-profile-sidebar-contents">
            {contents.map(c => {
              return (
                <div
                  id={`sidebar-item-${contents.indexOf(c)}`}
                  className="patient-profile-page-sidebar-item"
                  onClick={() => setCurrentPage(c)}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </nav>
        <div className="patient-profile-page-page-content">
          <DemographicsPage />
          <div className="patient-profile-page-dots-container">
            {initNavDots()}
          </div>
        </div>
      </div>
    </>
  );
};
