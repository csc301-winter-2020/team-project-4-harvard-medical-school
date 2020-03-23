import React, { useState, useEffect } from "react";
import "../../../scss/instructor/instructor-student-profile-page.scss";
import { Header } from "../../SubComponents/Header";
import { max } from "../../../utils/utils";
import { InstructorStudentPatientEncounter } from "../../SubComponents/Instructor/InstructorStudentPatientEncounter";
import { IndividualPatientProfile } from "../PatientProfile/PatientProfilePage";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomePatientProfile } from "../../SubComponents/Home/HomePatientProfile";

interface InstructorStudentProfilePageProps {
  classID: number;
  studentID: number;
  userType: "Administrator" | "Educator";
}

interface Encounter {
  date: number;
  lastModified: number;
  patientFirstName: string;
  patientLastName: string;
  sex: string;
  age: number;
  isPregnant: string | null;
  country: string;
  patientID: number;
  finalDiagnosis: string;
}

export const InstructorStudentProfilePage: React.FC<InstructorStudentProfilePageProps> = (
  props: InstructorStudentProfilePageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("NAME NOT FOUND");
  const [encounters, setEncounters] = useState<Encounter[]>([]);
  const [studentEmail, setStudentEmail] = useState<string>("EMAIL NOT FOUND");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const { studentID, classID } = props;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    fetch(`/api/users/${studentID}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Finding User Err: ${response.status}, ${response.statusText}`
          );
        }
      })
      .then((data: any) => {
        console.log(data);
        setStudentName(`${data.first_name} ${data.last_name}`);
        setStudentEmail(data.email);
        return fetch(`/api/student/${data.id}/patientprofiles`);
      })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Getting Patient Profiles Err: ${response.status}, ${response.statusText}`
          );
        }
      })
      .then((data: any[]) => {
        console.log(data);
        const newEncountersArr: Encounter[] = [];
        data.forEach(d => {
          if (Number(d.class_id) === Number(classID)) {
            newEncountersArr.push({
              date: new Date(d.last_modified).getTime(), //Change this to be date of creation.
              patientFirstName: d.first_name,
              patientLastName: d.family_name,
              age: d.age,
              country: d.country,
              isPregnant: d.pregnant,
              lastModified: new Date(d.last_modified).getTime(),
              patientID: d.id,
              sex: d.gender_at_birth,
              finalDiagnosis:  d.final_diagnosis,
            });
          }
        });
        setEncounters(newEncountersArr);
        setIsLoading(false);
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
      {isLoading && <HelixLoader message="Loading Student..." />}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">
          {studentName}'s Patient Profiles
        </div>
        <div>
          <div className="home-page-separator-line" />
          <div className="home-page-patient-header-grid">
            <p className="home-page-patient-header-grid-name-col">Name</p>
            <p className="home-page-patient-header-grid-created-col">Created</p>
            <p className="home-page-patient-header-grid-last-modified-col">
              Last Modified
            </p>
          </div>
          <div className="home-page-content">
            {encounters.map(e => {
              return (
                <HomePatientProfile
                  date={e.date}
                  firstName={e.patientFirstName}
                  lastName={e.patientLastName}
                  lastModified={e.date}
                  age={e.age}
                  country={e.country}
                  isPregnant={e.isPregnant}
                  patientID={e.patientID}
                  sex={e.sex}
                  isPortraitMode={windowWidth < 1080}
                  userType={props.userType}
                  givenFinalDiagnosis={e.finalDiagnosis}
                />
              );
            })}
            <div
              className="home-page-content-whitespace"
              style={{ height: max(window.innerHeight - 400, 0) }}
            >
              <div className="home-page-content-whitespace-logo"></div>
            </div>
          </div>
        </div>
      </div>
      <a href={`mailto:${studentEmail}`}>
        <div className="template-floating-add-btn">
          <FontAwesomeIcon icon="envelope" />
          <p className="inline-block" style={{ marginLeft: "10px" }}>
            Contact Student
          </p>
        </div>
      </a>
    </>
  );
};
