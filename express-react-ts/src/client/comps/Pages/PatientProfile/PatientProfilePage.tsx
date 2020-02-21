import React, { useState, useEffect } from "react";
import { DemographicsPage } from "./DemographicsPage";
import "../../../scss/patient-profiles/patient-profiles.scss";
import { Header } from "../../SubComponents/Header";
import { SocialHistoryPage } from "./SocialHistoryPage";
import { CSSTransition } from "react-transition-group";
import { FamilyHistoryPage } from "./FamilyHistoryPage";

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

// Length of page transitions in ms. Should match the transition time in the SCSS.
const transitionDuration: number = 300;
const swipeDistanceThreshold: number = 300;
let xcoord = 0;

export const PatientProfilePage: React.FC<PatientProfilePageProps> = ({}) => {
  const [currentPage, setCurrentPage] = useState<contentType>("Demographics");
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);
  const [prevPage, setPrevPage] = useState<contentType | null>(null);
  const [transitionName, setTransitionName] = useState("slide-left");
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);

  const incrementPage = () => {
    const index = contents.indexOf(currentPage);
    const newIndex = index === contents.length - 1 ? 0 : index + 1;
    setCurrentPage(contents[newIndex]);
  };

  const decrementPage = () => {
    const index = contents.indexOf(currentPage);
    const newIndex = index === 0 ? contents.length - 1 : index - 1;
    setCurrentPage(contents[newIndex]);
  };

  // Component did mount use effect for nav bar.
  useEffect(() => {
    setPrevPage(currentPage);
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

  // Component did mount for swipe listners
  useEffect(() => {
    const container = document.querySelector(
      ".patient-profile-page-page-content"
    );

    function touchEnd(e: any) {
      container.removeEventListener("touchmove", touchMove);
    }

    function touchMove(e: any) {
      if (e.touches[0].screenX - xcoord > swipeDistanceThreshold) {
        incrementPage();
        container.removeEventListener("touchmove", touchMove);
      } else if (e.touches[0].screenX - xcoord < -swipeDistanceThreshold) {
        decrementPage();
        container.removeEventListener("touchmove", touchMove);
      }
    }

    function touchStart(e: any) {
      xcoord = e.touches[0].screenX;
      container.addEventListener("touchmove", touchMove);
    }

    container.addEventListener("touchstart", touchStart);
    container.addEventListener("touchend", touchEnd);

    return () => {
      container.removeEventListener("touchstart", touchStart);
      container.removeEventListener("touchend", touchEnd);
    };
  });

  return (
    <>
      <Header
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      <div className="patient-profile-page-outermost-container">
        <nav
          className="patient-profile-page-sidebar-container"
          style={{ marginLeft: isShowingSidebar ? "0" : "-250px" }}
        >
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
          <div
            className="patient-profile-sidebar-hide-btn"
            onClick={() => setIsShowingSidebar(!isShowingSidebar)}
          >
            {isShowingSidebar ? "Hide" : "Show"}
          </div>
          <DemographicsPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            transitionDuration={transitionDuration}
            transitionName={transitionName}
          />

          <SocialHistoryPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            transitionDuration={transitionDuration}
            transitionName={transitionName}
          />

          <FamilyHistoryPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            transitionDuration={transitionDuration}
            transitionName={transitionName}
          />

          <div className="patient-profile-page-dots-container">
            {initNavDots()}
          </div>
        </div>
      </div>
    </>
  );
};
