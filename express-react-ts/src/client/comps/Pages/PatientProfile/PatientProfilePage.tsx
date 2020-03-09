import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { DemographicsPage } from "./DemographicsPage";
import "../../../scss/patient-profiles/patient-profiles.scss";
import { Header } from "../../SubComponents/Header";
import { SocialHistoryPage } from "./SocialHistoryPage";
import { FamilyHistoryPage } from "./FamilyHistoryPage";
import { PastMedicalHistoryPage } from "./PastMedicalHistoryPage";
import { CCHPIPage } from "./CCHPI";
import { ReviewOfSystemsPage } from "./ReviewOfSystemsPage";
import { PhysicalExaminationPage } from "./PhysicalExaminationPage";
import { ImagingResultsPage } from "./ImagingResultsPage";
import { LabResultsPage } from "./LabResultsPage";
import { AssessmentAndPlanPage } from "./AssessmentAndPlanPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { contentType, contents } from "../../../utils/types";
import { urlToName, inputMode } from "../../../utils/utils";

/**
 * To create a new type of page, firstly make the react FC and then import it here.
 * Then add the string to the contentType type.
 * Then add the string to the const contents array.
 * Then add the react component to the contentsPages component array.
 * */

const contentsPages: IndividualPatientProfile[] = [
  DemographicsPage,
  CCHPIPage,
  PastMedicalHistoryPage,
  SocialHistoryPage,
  FamilyHistoryPage,
  ReviewOfSystemsPage,
  PhysicalExaminationPage,
  ImagingResultsPage,
  LabResultsPage,
  AssessmentAndPlanPage,
];

interface IndividualPatientProfilePageProps {
  pageName: contentType;
  currentPage: contentType;
  setCurrentPage: Function;
  transitionDuration: number;
  transitionName: string;
  isShowingSidebar: boolean;
  patientID: number;
  defaultMode: inputMode;
}

export type IndividualPatientProfile = React.FC<
  IndividualPatientProfilePageProps
>;

export async function postData(url: string, data: any) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual
    referrerPolicy: "no-referrer", // no-referrer
    body: JSON.stringify(data),
  });
  return await response.json();
}

const initNavDots = () => {
  const container = [];
  for (let i = 0; i < contents.length; i++) {
    container.push(
      <div
        key={i}
        id={`patient-profile-page-dot-${i}`}
        className="patient-profile-page-dot"
      ></div>
    );
  }
  return container;
};

interface PatientProfilePageProps extends RouteComponentProps {
  initialPage: contentType;
  id?: string;
}

// Length of page transitions in ms. Should match the transition time in the SCSS.
const transitionDuration: number = 300;
const swipeDistanceThreshold: number = 300;
let xcoord: number = 0;
let transitionName: "slide-left" | "slide-right" = "slide-left";

export const PatientProfilePage: React.FC<PatientProfilePageProps> = (
  props: PatientProfilePageProps
) => {
  const myProps: any = props;
  const thisPatientID = myProps.match.params.id;
  const initialPage =
    "pageName" in myProps.match.params &&
    myProps.match.params.pageName in urlToName
      ? urlToName[myProps.match.params.pageName]
      : "Demographics";

  const [currentPage, setCurrentPage] = useState<contentType>(initialPage);
  const [isShowingSidebar, setIsShowingSidebar] = useState(true);
  const [prevPage, setPrevPage] = useState<contentType | null>(null);
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [defaultMode, setDefaultMode] = useState<inputMode>(
    "Both"
  );

  const incrementPage = () => {
    transitionName = "slide-left";
    const index = contents.indexOf(currentPage);
    const newIndex = index === contents.length - 1 ? 0 : index + 1;
    setCurrentPage(contents[newIndex]);
  };

  const decrementPage = () => {
    transitionName = "slide-right";
    const index = contents.indexOf(currentPage);
    const newIndex = index === 0 ? contents.length - 1 : index - 1;
    setCurrentPage(contents[newIndex]);
  };

  // Observer for currentPage
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

  useEffect(() => {
    fetch("/api/me")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Could not validate your session.");
        }
      })
      .then((data: any) => {
        setIsShowingSidebar(data.default_sidebar);
        setDefaultMode(data.default_mode);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header
        placeholder={""}
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
                  key={contents.indexOf(c)}
                  id={`sidebar-item-${contents.indexOf(c)}`}
                  className="patient-profile-page-sidebar-item"
                  onClick={() => {
                    setCurrentPage(c);
                    if (contents.indexOf(prevPage) < contents.indexOf(c)) {
                      transitionName = "slide-left";
                    } else {
                      transitionName = "slide-right";
                    }
                  }}
                >
                  {c}
                </div>
              );
            })}
          </div>
        </nav>

        <div
          className="patient-profile-page-page-content"
          style={{ width: isShowingSidebar ? "calc(100% - 250px)" : "100%" }}
        >
          <div
            className="patient-profile-sidebar-hide-btn"
            onClick={() => setIsShowingSidebar(!isShowingSidebar)}
          >
            {isShowingSidebar ? "Hide" : "Show"}
          </div>

          {contentsPages.map((Comp: IndividualPatientProfile, index) => {
            return (
              <Comp
                patientID={thisPatientID}
                isShowingSidebar={isShowingSidebar}
                key={index}
                pageName={contents[index]}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                transitionDuration={transitionDuration}
                transitionName={transitionName}
                defaultMode={defaultMode}
              />
            );
          })}

          <div className="patient-profile-page-dots-container">
            {initNavDots()}
          </div>
          <div className="patient-profile-nav-btns">
            <div className="nav-btn-leftmost nav-btn">
              <FontAwesomeIcon icon="question-circle" size="2x" />
            </div>

            <div
              className="nav-btn-left nav-btn"
              onClick={() => {
                decrementPage();
              }}
            >
              <FontAwesomeIcon icon="arrow-left" size="2x" />
            </div>
            <div
              className="nav-btn-right nav-btn"
              onClick={() => {
                incrementPage();
              }}
            >
              <FontAwesomeIcon icon="arrow-right" size="2x" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
