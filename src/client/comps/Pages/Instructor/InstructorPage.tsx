import React, { useState } from "react";
import "../../../scss/instructor/instructor-page.scss";
import { Header } from "../../SubComponents/Header";
import { InstructorClassRow } from "../../SubComponents/Instructor/InstructorClassRow";
import { ToastContainer, toast } from "react-toastify";
import { max } from "../../../utils/utils";
import { HelixLoader } from "../../SubComponents/HelixLoader";

interface InstructorPageProps {
}

interface InstructorClass {
  name: string;
  id: number;
}

const mockData: InstructorClass[] = [
  { name: 'MED123 - Intro To Anatomy', id: 0 },
  { name: 'MED210 - Patient Care', id: 2 }
];

export const InstructorPage: React.FC<InstructorPageProps> = (
  props: InstructorPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [classes, setClasses] = useState(mockData);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return <>
    <Header
      placeholder={"Search Classes..."}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={true}
      searchValue={searchVal}
      setSearchValue={setSearchVal}
    />
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    {isLoading && <HelixLoader message="Please Wait..." />}
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Your Classes</div>
        <div className="home-page-separator-line"/>
        <div className="home-page-patient-header-grid"/>
        <div className="home-page-content">
        {classes.filter(s => s.name.toLowerCase().includes(searchVal.toLowerCase())).map(c =>
          <InstructorClassRow
            name={c.name}
            classID={c.id}
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
      <div
        className="home-page-create-template-btn"
        onClick={() => {
          alert('TODO');
        }}
      >
        <p>Create Class</p>
      </div>
  </>;
};
