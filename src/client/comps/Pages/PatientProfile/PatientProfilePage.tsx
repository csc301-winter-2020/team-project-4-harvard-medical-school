/**
 * This page is a container that holds the individual patient profile
 * that the user is viewing. An individual patient profile page is a single page
 * of the entire patient profile, if we were to break up each section into
 * different "pages". One page would be "Demographics", the next "CCHPI", etc.
 * This page is also responsible for viewing the results from the Isabel API.
 * This page also holds the sidebar.
 */

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
import { contentType, contents, MyToast } from "../../../utils/types";
import { urlToName, inputMode } from "../../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { Template, TemplatePage } from "../TemplatesPage";

// These are all the possible pages to have in a patient profile.
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  classID: number;
  userType: "Student" | "Educator";
  templateId: number;
}

export type IndividualPatientProfile = React.FC<
  IndividualPatientProfilePageProps
>;

export async function postData(url: string, data: any, method?: string) {
  if (method === undefined) method = "PATCH";
  const response = await fetch(url, {
    method: method,
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

  console.log(response);
  return await response.json();
}

export async function fetchAllCanvases(jsonResult: any) {
  for (let key in jsonResult) {
    if (key.endsWith("_canvas") && jsonResult[key] !== undefined) {
      let res = await fetch(jsonResult[key]);
      let canvasString = await res.text();
      jsonResult[key] = formatCanvas(canvasString);
    }
  }
  return jsonResult;
}

function formatCanvas(canvas: string) {
  try {
    let formattedCanvas = canvas.replace(/\\/g, "").slice(1, -1);

    // Try to parse this cavas
    JSON.parse(formattedCanvas);
    return formattedCanvas;
  } catch (err) {
    // Empty canvas
    console.log(err);
    return '{"lines":[],"width":600,"height":200}';
  }
}

/**
 * Creates the appropriate number of nav dots at the bottom of the screen.
 * */
const initNavDots = (n: number) => {
  const container = [];
  for (let i = 0; i < n; i++) {
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
  const myToast: MyToast = toast as any;
  const thisPatientID = myProps.match.params.id;
  const initialPage =
    "pageName" in myProps.match.params &&
    myProps.match.params.pageName in urlToName
      ? urlToName[myProps.match.params.pageName]
      : "Demographics";

  const [currentPage, setCurrentPage] = useState<contentType>(initialPage);
  const [isShowingSidebar, setIsShowingSidebar] = useState<boolean>(
    window.innerWidth > 1080
  );
  const [prevPage, setPrevPage] = useState<contentType>(null);
  const [isAvatarPopup, setIsAvatarPopup] = useState<boolean>(false);
  const [defaultMode, setDefaultMode] = useState<inputMode>("Both");
  const [showHelpPopup, setShowHelpPopup] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const [classId, setClassId] = useState(-1);
  const [template, setTemplate] = useState<TemplatePage[]>(null);
  const [thisUserId, setThisUserId] = useState(null);
  const [currentContents, setCurrentContents] = useState(contents);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(true);
  const [templateId, setTemplateId] = useState<number>(null);
  const [helpEnabled, setHelpEnabled] = useState(null);
  const [isabelOutputArr, setIsabelOutputArr] = useState([]);
  const [currentContentsPages, setCurrentContentsPages] = useState(
    contentsPages
  );

  /**
   * Go to the next page.
   */
  const incrementPage = () => {
    transitionName = "slide-left";
    const index = currentContents.indexOf(currentPage);
    const newIndex = index === currentContents.length - 1 ? 0 : index + 1;
    setCurrentPage(currentContents[newIndex]);
  };

  /**
   * Goes to the previous page.
   */
  const decrementPage = () => {
    transitionName = "slide-right";
    const index = currentContents.indexOf(currentPage);
    const newIndex = index === 0 ? currentContents.length - 1 : index - 1;
    setCurrentPage(currentContents[newIndex]);
  };

  /**
   * Adds an event listener for screen resizing.
   */
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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
      `#sidebar-item-${currentContents.indexOf(currentPage)}`
    );
    const selectedDot = document.querySelector(
      `#patient-profile-page-dot-${currentContents.indexOf(currentPage)}`
    );
    console.log(selectedPage);
    console.log(selectedDot);
    selectedPage.className =
      "patient-profile-page-sidebar-item patient-profile-page-sidebar-item--active";
    selectedDot.className =
      "patient-profile-page-dot patient-profile-page-dot--active";
  }, [currentPage]);

  
  /**
   * The following useEffect listens for the user dragging their finger to 
   * left or right and then increments or decrements the page. Comment it in 
   * to enable this function.
   */
  /*
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
  */

  /**
   * If the user is NOT a student, then alert them and hide all the save buttons.
   */
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
        if (window.innerWidth > 1080) {
          setIsShowingSidebar(data.default_sidebar);
        }
        setDefaultMode(data.default_mode);
        setUserType(data.user_type);
        setThisUserId(data.id);
        if (data.user_type !== "Student") {
          myToast.warn(
            `As an ${data.user_type}, no changes you make to this patient's profile will be saved.`
          );
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (windowWidth < 1080 && isShowingSidebar) {
      setIsShowingSidebar(false);
    }
  }, [windowWidth]);

  useEffect(() => {
    fetch(`/api/patientprofile/${thisPatientID}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Cant find this patient profile.");
        }
      })
      .then((data: any) => {
        setClassId(data.class_id);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (classId !== -1) {
      fetch(`/api/classes/${classId}`)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Could not find this class.");
          }
        })
        .then((data: any) => {
          setHelpEnabled(data[0].help_enabled);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [classId]);

  /**
   * In this useEffect, we fetch the template that the user used to make
   * this patient profile. If there is no template that is used,
   * or the template was deleted, then it
   * just uses the default template (shows everything in order).
   * We achieve the custom ordering by adding the pages to an array in the
   * same order that they are stored in the template.
   */
  useEffect(() => {
    if (thisUserId !== null) {
      fetch(`/api/patientprofile/${thisPatientID}`)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Could not find this patient.");
          }
        })
        .then((data: any) => {
          //TODO: make sure to comment the correct one back in, instead of hardcoded.
          const templateId = data.template_id;
          setTemplateId(templateId);
          const student_id: number = data.student_id;
          if (templateId !== undefined) {
            return fetch(`/api/student/${student_id}/template/${templateId}`);
          } else {
            throw new Error("This patient profile has no template.");
          }
        })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            setCurrentContentsPages(contentsPages);
            setCurrentContents(contents);
            setCurrentPage("Demographics");
            throw new Error(
              "Could not find the template for this profile. Using default."
            );
          }
        })
        .then((data: any) => {
          const templateArray: TemplatePage[] = JSON.parse(data.template);
          setTemplate(templateArray);
          const newContentsPages: IndividualPatientProfile[] = [];
          const newContents: contentType[] = [];
          templateArray.forEach((t: TemplatePage) => {
            console.log(t);
            if (t.visible) {
              console.log("visible");
              newContents.push(t.title);
              if (t.title === "Demographics") {
                newContentsPages.push(DemographicsPage);
              } else if (
                t.title === "Chief Complaint & History of Present Illness"
              ) {
                newContentsPages.push(CCHPIPage);
              } else if (t.title === "Past Medical History") {
                newContentsPages.push(PastMedicalHistoryPage);
              } else if (t.title === "Social History") {
                newContentsPages.push(SocialHistoryPage);
              } else if (t.title === "Family History") {
                newContentsPages.push(FamilyHistoryPage);
              } else if (t.title === "Review of Systems") {
                newContentsPages.push(ReviewOfSystemsPage);
              } else if (t.title === "Physical Examination") {
                newContentsPages.push(PhysicalExaminationPage);
              } else if (t.title === "Imaging Results") {
                newContentsPages.push(ImagingResultsPage);
              } else if (t.title === "Lab Results") {
                newContentsPages.push(LabResultsPage);
              } else if (t.title === "Assessment & Plan") {
                newContentsPages.push(AssessmentAndPlanPage);
              }
            }
          });
          setCurrentContentsPages(newContentsPages);
          setCurrentContents(newContents);
          if (newContents.length > 0) {
            setCurrentPage(newContents[0]);
          }
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoadingTemplate(false);
        });
    }
  }, [thisUserId]);

  return (
    <>
      <Header
        placeholder={""}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      {isLoadingTemplate && <HelixLoader message="Loading template..." />}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      {showHelpPopup && (
        <div
          className="patient-profile-popup-outermost"
          onClick={(e: any) => {
            if (e.className !== "patient-profile-popup-container") {
              setShowHelpPopup(false);
            }
          }}
        >
          <div className="patient-profile-popup-container">
            <h3>Current Diagnosis Differentials:</h3>
            <br></br>
            <div>
              {isabelOutputArr === undefined ? (
                <p>Isabel could not find anything conclusive for this timestamp.</p>
              ) : (
                isabelOutputArr.slice(0, 15).map((x: any) => {
                  const name = x["diagnosis_name"];
                  const weightage = x["weightage"];
                  return <p>{name + ": " + weightage}</p>;
                })
              )}
            </div>
            <div className="patient-profile-popup-close">Close</div>
          </div>
        </div>
      )}
      <div className="patient-profile-page-outermost-container">
        <nav
          className="patient-profile-page-sidebar-container"
          style={{ marginLeft: isShowingSidebar ? "0" : "-250px" }}
        >
          <div className="patient-profile-sidebar-contents">
            {currentContents.map((c, index: number) => {
              return (
                <div
                  key={index}
                  id={`sidebar-item-${index}`}
                  className="patient-profile-page-sidebar-item"
                  onClick={() => {
                    setCurrentPage(c);
                    if (currentContents.indexOf(prevPage) < index) {
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

          {currentContentsPages.map((Comp: IndividualPatientProfile, index) => {
            return (
              <Comp
                key={index}
                patientID={thisPatientID}
                isShowingSidebar={isShowingSidebar}
                pageName={currentContents[index]}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                transitionDuration={transitionDuration}
                transitionName={transitionName}
                defaultMode={defaultMode}
                setIsLoading={setIsLoading}
                classID={classId}
                userType={userType}
                templateId={templateId}
              />
            );
          })}

          <div className="patient-profile-page-dots-container">
            {initNavDots(currentContents.length)}
          </div>
          <div className="patient-profile-nav-btns">
            <div
              className="nav-btn-leftmost nav-btn"
              onClick={() => {
                if (!helpEnabled) {
                  myToast.warn("Help has not been enabled for this class.");
                } else {
                  setShowHelpPopup(true);
                  // GET for isabel analysis
                  fetch(`/api/analysis/${thisPatientID}`)
                    .then(response => {
                      if (response.status === 200) {
                        return response.json();
                      } else {
                        throw new Error("Response not 200.");
                      }
                    })
                    .then((data: any) => {
                      const isabelOutput =
                        data["isbell_result"]["diagnoses_checklist"][
                          "diagnoses"
                        ];
                      console.log("isabel output set to:");
                      console.log(isabelOutput);
                      setIsabelOutputArr(isabelOutput);
                    })
                    .catch((err: any) => {
                      console.log(err);
                    });
                }
              }}
            >
              <FontAwesomeIcon icon="question-circle" size="2x" />
            </div>

            <div className="nav-btn-left nav-btn" onClick={decrementPage}>
              <FontAwesomeIcon icon="arrow-left" size="2x" />
            </div>
            <div className="nav-btn-right nav-btn" onClick={incrementPage}>
              <FontAwesomeIcon icon="arrow-right" size="2x" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
