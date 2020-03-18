import React, { useState } from "react";
import "../../../scss/instructor/instructor-page.scss";
import { Header } from "../../SubComponents/Header";
import { InstructorStudentProfile } from "../../SubComponents/Instructor/InstructorStudentProfile";
import { ToastContainer, toast } from "react-toastify";
import { max } from "../../../utils/utils";


interface InstructorPageProps {
}

interface InstructorStudent {
  name: string;
  pictureURL: string;
}

const mockData: InstructorStudent[] = [
  { name: 'Student A', pictureURL: "https://content.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg" },
  { name: 'Student B', pictureURL: "https://img.huffingtonpost.com/asset/5c2d06271d00002c0231b4e4.jpeg?ops=800_450", },
  { name: 'Steven Kang', pictureURL: "https://i.ytimg.com/vi/S2kbmUyBaM4/hqdefault.jpg" },
];

export const InstructorPage: React.FC<InstructorPageProps> = (
  props: InstructorPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [instructorName, setInstructorName] = useState("Instructor Name");
  const [students, setStudents] = useState(mockData);
  const [searchVal, setSearchVal] = useState("");

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
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Your Students</div>
        <div className="home-page-separator-line"></div>
        <div className="home-page-patient-header-grid"></div>
        <div className="home-page-content">
        {students.filter(s => s.name.toLowerCase().includes(searchVal.toLowerCase())).map(student =>
          <InstructorStudentProfile
            name={student.name}
            imageURL={student.pictureURL}
          />
        )}
          <div
            className="home-page-content-whitespace"
            style={{ height: max(window.innerHeight - 400, 0) }}
          >
            <div className="home-page-content-whitespace-logo"></div>
          </div>
        </div>
      </div>
      <div
        className="home-page-create-template-btn"
        onClick={() => {
          alert('TODO');
        }}
      >
        <p>Create Class</p>
      </div>
    {/* <div className="instructor-page-container">
      <h1 className="instructor-page-header">Welcome, {instructorName}!</h1>
      <div className="">
        
      </div>
    </div> */}
  </>;
};
