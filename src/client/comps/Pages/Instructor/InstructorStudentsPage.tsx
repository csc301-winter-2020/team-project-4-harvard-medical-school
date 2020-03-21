import React, { useState, useEffect } from "react";
import "../../../scss/instructor/instructor-page.scss";
import { Header } from "../../SubComponents/Header";
import { InstructorStudentProfileRow } from "../../SubComponents/Instructor/InstructorStudentProfileRow";
import { ToastContainer, toast } from "react-toastify";
import { max } from "../../../utils/utils";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { MyToast } from "../../../utils/types";

interface InstructorPageProps {
  classID: number;
}

interface InstructorStudent {
  id: number;
  firstName: string; 
  lastName: string;
  pictureURL: string;
}

export const InstructorStudentsPage: React.FC<InstructorPageProps> = (
  props: InstructorPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [students, setStudents] = useState<InstructorStudent[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const myToast:MyToast = toast as any;

  useEffect(() => {
    fetch(`/api/students/${props.classID}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Error code: ${response.status}, ${response.statusText}`
          );
        }
      })
      .then((data: any) => {
        const newAllStudents: InstructorStudent[] = [];
        data.forEach((row: any) => {
          newAllStudents.push({
            firstName: row.first_name,
            lastName: row.last_name,
            id: row.id,
            pictureURL: row.avatar_url 
          });
        });
        setStudents(newAllStudents);
      })
      .catch((err: any) => {
        console.log(err);
        myToast.warn(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return <>
    <Header
      placeholder={"Search Students..."}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={true}
      searchValue={searchVal}
      setSearchValue={setSearchVal}
    />
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    {isLoading && <HelixLoader message="Please Wait..." />}
    <div className="home-page-content-container">
      <div className="home-page-your-patients-title">Your Students</div>
      <div className="home-page-separator-line"/>
      <div className="home-page-patient-header-grid"/>
      <div className="home-page-content">
        {students.filter(s => s.firstName.toLowerCase().includes(searchVal.toLowerCase()) || s.lastName.toLowerCase().includes(searchVal.toLowerCase())).map(student =>
          <InstructorStudentProfileRow
            studentID={student.id}
            classID={props.classID}
            name={student.firstName}
            imageURL={student.pictureURL}
          />
        )}
        <div
          className="home-page-content-whitespace"
          style={{ height: max(window.innerHeight - 400, 0) }}
        >
          <div className="home-page-content-whitespace-logo"/>
        </div>
      </div>
    </div>
  </>;
};
