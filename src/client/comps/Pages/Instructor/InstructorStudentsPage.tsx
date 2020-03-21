import React, { useState } from "react";
import "../../../scss/instructor/instructor-page.scss";
import { Header } from "../../SubComponents/Header";
import { InstructorStudentProfileRow } from "../../SubComponents/Instructor/InstructorStudentProfileRow";
import { ToastContainer, toast } from "react-toastify";
import { max } from "../../../utils/utils";
import { HelixLoader } from "../../SubComponents/HelixLoader";

interface InstructorPageProps {
  classID: number;
}

interface InstructorStudent {
  id: number;
  name: string;
  pictureURL: string;
}

const mockData: InstructorStudent[] = [
  { id: 0, name: 'Student A', pictureURL: "https://content.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg" },
  { id: 1, name: 'Student B', pictureURL: "https://img.huffingtonpost.com/asset/5c2d06271d00002c0231b4e4.jpeg?ops=800_450", },
  { id: 3, name: 'Steven Kang', pictureURL: "https://i.ytimg.com/vi/S2kbmUyBaM4/hqdefault.jpg" },
];

export const InstructorStudentsPage: React.FC<InstructorPageProps> = (
  props: InstructorPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [students, setStudents] = useState(mockData);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        {students.filter(s => s.name.toLowerCase().includes(searchVal.toLowerCase())).map(student =>
          <InstructorStudentProfileRow
            studentID={student.id}
            classID={props.classID}
            name={student.name}
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
