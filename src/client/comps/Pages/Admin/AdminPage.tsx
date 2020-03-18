import React, { useState, useEffect } from "react";
import "../../../scss/admin/admin-page.scss";
import { Header } from "../../SubComponents/Header";
import { max } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminPageRow } from "../../SubComponents/Admin/AdminPageRow";
import { ToastContainer, toast } from "react-toastify";

interface AdminPageProps {}

export interface AdminClass {
  name: string;
  id: number;
}

const mockData: AdminClass[] = [
  { name: "Summer 2017", id: 1 },
  { name: "Fall 2019", id: 2 },
  { name: "Winter 2020", id: 3 },
];

export const AdminPage: React.FC<AdminPageProps> = (props: AdminPageProps) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [classes, setClasses] = useState(mockData);
  const [searchVal, setSearchVal] = useState("");
  const [isPortraitMode, setIsPortraitMode] = useState(
    window.innerWidth < 1080
  );

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

  return (
    <>
      <Header
        placeholder={"Search classes..."}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={true}
        searchValue={searchVal}
        setSearchValue={setSearchVal}
      />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Your Classes</div>
        <div className="home-page-separator-line"></div>
        <div className="home-page-patient-header-grid"></div>
        <div className="home-page-content">
          {classes
            .filter(c => c.name.toLowerCase().includes(searchVal.toLowerCase()))
            .map((c, index: number) => {
              return (
                <AdminPageRow
                  key={index}
                  c={c}
                  isPortraitMode={isPortraitMode}
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
        className="home-page-create-template-btn"
        onClick={() => {
          alert('TODO');
        }}
      >
        <p>Create Class</p>
      </div>
    </>
  );
};
