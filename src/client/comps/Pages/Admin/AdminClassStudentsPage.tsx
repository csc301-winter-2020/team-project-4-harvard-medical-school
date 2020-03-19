import React, { useState, useEffect } from "react";
import "../../../scss/admin/admin-page.scss";
import { max, initialClass } from "../../../utils/utils";
import { Header } from "../../SubComponents/Header";
import { AdminStudentProfile } from "../../SubComponents/Admin/AdminStudentProfile";
import { ToastContainer, toast } from "react-toastify";
import { response } from "express";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { Class, MyToast } from "../../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AdminProfilePageProps {
  classID: number;
}

interface Student {
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
  const [isAvatarPopup, setIsAvatarPopup] = useState<boolean>(false);
  const [thisClass, setThisClass] = useState<Class>(initialClass);
  const [students, setStudents] = useState([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPortraitMode, setIsPortraitMode] = useState<boolean>(
    window.innerWidth < 1080
  );

  const mToast: MyToast = toast as any;

  
async function patchClass(data:Class){
  fetch(`/api/classes/${props.classID}`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(
          "Could not find this class. Perhaps it was deleted?"
        );
      }
    })
    .then((data: any) => {
      console.log(data);
      mToast.success("Successful update.");
    })
    .catch((err: any) => {
      mToast.warn(err);
    })
    .finally();
}

  useEffect(() => {
    document.title = `Scribe: ${thisClass.name}`;
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
        const newAllStudents: Student[] = [];
        data.forEach((d: any) => {
          newAllStudents.push({
            firstName: d.first_name,
            lastName: d.last_name,
          });
        });
        setAllStudents(newAllStudents);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/classes/${props.classID}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Error code: ${response.status}, ${response.statusText}`
          );
        }
      })
      .then((data: Class[]) => {
        console.log(data);
        setThisClass(data[0]);
        setTitle(data[0].name);
      })
      .catch((err: any) => {
        console.log(err);
        mToast.warn(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      {isLoading && <HelixLoader message="Loading Class..." />}
      <div className="home-page-content-container">
        <span
          onClick={() => {
            if (editingTitle){
              const data: Class = {
                ...thisClass,
                name: title,
              };
              patchClass(data);
            }
            setEditingTitle(!editingTitle);
          }}
          className="template-editTitleBtn"
          style={{ marginLeft: "10px" }}
        >
          {editingTitle && <FontAwesomeIcon icon="check" size="2x" />}
          {!editingTitle && <FontAwesomeIcon icon="pencil-alt" size="2x" />}
        </span>
        <span className="templates-title">
          {editingTitle ? (
            <>
              <input
                type="text"
                value={title}
                maxLength={50}
                style={{
                  fontSize: "3rem",
                  width: "800px",
                  outline: "none",
                  marginBottom: "16px",
                  marginLeft: "10px",
                }}
                onChange={(e: any) => {
                  setTitle(e.target.value);
                }}
              />
              <span>{`${title.length}/50`}</span>
            </>
          ) : (
            <h1>{title}</h1>
          )}
        </span>
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
            .map((student, index: number) => {
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
      <div
        className="home-page-create-new-patient-btn home-page-create-user-btn"
        onClick={() => alert("TODO")}
      >
        <p>Add Student</p>
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
          const data: Class = {
            ...thisClass,
            name: title,
            help_enabled: !thisClass.help_enabled,
          };
          patchClass(data);
          setThisClass({
            ...thisClass,
            help_enabled: !thisClass.help_enabled,
          });
        }}
      >
        {thisClass.help_enabled ? <p>Disable Help</p> : <p>Enable Help</p>}
      </div>
    </>
  );
};

