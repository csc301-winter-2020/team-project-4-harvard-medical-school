import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Header } from "../../SubComponents/Header";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { ToastContainer, toast } from "react-toastify";
import { MyToast, Class } from "../../../utils/types";
import { ClassRow } from "../../SubComponents/Admin/ClassRow";
import { max } from "../../../utils/utils";

interface StudentClassSelectPageProps {}

export const StudentClassSelectPage: React.FC<StudentClassSelectPageProps> = ({}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [classes, setClasses] = useState<Class[]>([]);
  const [isPortraitMode, setIsPortraitMode] = useState(
    window.innerWidth < 1080
  );
  const history = useHistory();

  const myToast: MyToast = toast as any;

  useEffect(() => {
    document.title = "Scribe: Home";
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
    fetch("/api/me")
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Err: ${response.status}, ${response.statusText}`);
        }
      })
      .then((data: any) => {
        console.log(data);
        return fetch(`/api/classesForStudent/${data.id}`);
      })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Err: ${response.status}, ${response.statusText}`);
        }
      })
      .then((data: Class[]) => {
        setClasses(data);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        history.push("/err/500/Something went wrong. Please try again.");
      });
  }, []);

  return (
    <>
      <Header
        showSearch={true}
        placeholder={"Search Classes..."}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      {isLoading && <HelixLoader message="Loading Classes..." />}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Your Classes</div>
        <div className="home-page-separator-line"></div>
        <div className="home-page-patient-header-grid"></div>
        <div className="home-page-content">
          {classes.length === 0 && (
            <p style={{ marginLeft: "10px" }}>
              You are not enrolled in any classes. Please notify your
              administrator to enroll you in a class.
            </p>
          )}
          {classes
            .filter(c =>
              c.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((c, index: number) => {
              return (
                <ClassRow
                  key={index}
                  c={c}
                  isPortraitMode={isPortraitMode}
                  userType={"Student"}
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
    </>
  );
};
