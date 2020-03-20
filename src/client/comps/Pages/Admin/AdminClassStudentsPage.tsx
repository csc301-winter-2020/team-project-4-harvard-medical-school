import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../scss/admin/admin-page.scss";
import { max } from "../../../utils/utils";
import { Header } from "../../SubComponents/Header";
import { AdminStudentProfile } from "../../SubComponents/Admin/AdminStudentProfile";
import { ToastContainer, toast } from "react-toastify";

interface AdminProfilePageProps {
  classID: number;
}

export interface Student {
  id?: number;
  avatar_url?: string;
  year?: 1 | 2 | 3 | 4;
  username?: string;
  firstName: string;
  lastName: string;
}

export const AdminClassStudentsPage: React.FC<AdminProfilePageProps> = (
  props: AdminProfilePageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [isPortraitMode, setIsPortraitMode] = useState(window.innerWidth < 1080);
  const [allStudents, setAllStudents] = useState<Student[]>([]);

  useEffect(() => {
    document.title = `Scribe: ${className}`;
    const handleResize = () => {
      if (window.innerWidth < 1080) {
        setIsPortraitMode(true);
      } else {
        setIsPortraitMode(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(className)
    fetch(`/api/students/${props.classID}`)
    .then(response => {
      if (response.status === 200){
        return response.json()
      } else {
        throw new Error(`Error code: ${response.status}, ${response.statusText}`);
      }
    })
    .then((data:any) => {
      const newAllStudents:Student[] = [];
      data.forEach((d:any) => {
        newAllStudents.push({
          firstName: d.first_name,
          lastName: d.last_name,
        });
      });
      setAllStudents(newAllStudents);
    })
    .catch((err:any) => {
      console.log(err);
    })
  }, []);

  useEffect(() =>{
    fetch(`/api/classes/${props.classID}`)
    .then(response => {
      if (response.status === 200){
        return response.json()
      } else {
        throw new Error(`Error code: ${response.status}, ${response.statusText}`);
      }
    })
    .then((data:any) => {
      const newClassName = data[0].name
      setClassName(newClassName);
    })
    .catch((err:any) => {
      console.log(err);
    })

  }, []);

  return (
    <>
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
        <div className="home-page-your-patients-title">{className}</div>
        <div className="home-page-separator-line"></div>
        <div className="home-page-patient-header-grid"></div>
        <div className="home-page-content">
          {students
            .filter(
              stud =>
                stud.firstName
                  .toLowerCase()
                  .includes(searchVal.toLowerCase()) ||
                stud.lastName.toLowerCase().includes(searchVal.toLowerCase())
            )
            .map((student, index:number) => {
              return (
                <AdminStudentProfile
                  key={index}
                  isPortraitMode={isPortraitMode}
                  firstName={student.firstName}
                  lastName={student.lastName}
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
      <div className="home-page-create-new-patient-btn home-page-create-user-btn">
        <Link to={`/admin/${props.classID}/add`} className="btn btn-primary">Add Students</Link>
      </div>
      <div
        className="home-page-create-new-patient-btn"
        onClick={() => alert("TODO")}
      >
        <p>Export Data</p>
      </div>
      <div
        className="home-page-create-template-btn"
        onClick={() => {
          alert("TODO");
        }}
      >
        <p>Unlock Help</p>
      </div>
    </>
  );
};
