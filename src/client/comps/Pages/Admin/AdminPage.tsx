/**
 * This is the page which lets the admin view the different classes.
 */

import React, { useState, useEffect } from "react";
import "../../../scss/admin/admin-page.scss";
import { Header } from "../../SubComponents/Header";
import { max } from "../../../utils/utils";
import { ClassRow } from "../../SubComponents/Admin/ClassRow";
import { ToastContainer, toast } from "react-toastify";
import { NewAdminClass } from "../../SubComponents/Admin/NewAdminClass";
import { HelixLoader } from "../../SubComponents/HelixLoader";

interface AdminPageProps {}

export interface AdminClass {
  name: string;
  id: number;
}

export const AdminPage: React.FC<AdminPageProps> = (props: AdminPageProps) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [classes, setClasses] = useState<AdminClass[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [showNewClassPopup, setNewClassPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPortraitMode, setIsPortraitMode] = useState(
    window.innerWidth < 1080
  );

  const mToast: any = toast;

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

  function refresh() {
    fetch(`/api/classes/all`)
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
        const allClasses: AdminClass[] = [];
        data.forEach((row: any) => {
          allClasses.push({
            name: row.name,
            id: row.id,
          });
        });
        console.log(data);
        setClasses(allClasses);
      })
      .catch((err: any) => {
        console.log(err);
        mToast.warn("Could not load classes. Try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Header
        placeholder={"Search Classes..."}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={true}
        searchValue={searchVal}
        setSearchValue={setSearchVal}
      />
      {isLoading && <HelixLoader message="Loading Classes..." />}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">All Classes</div>
        <div className="home-page-separator-line"></div>
        <div className="home-page-patient-header-grid"></div>
        <div className="home-page-content">
          {classes
            .filter(c => c.name.toLowerCase().includes(searchVal.toLowerCase()))
            .map((c, index: number) => {
              return (
                <ClassRow
                  key={index}
                  c={c}
                  isPortraitMode={isPortraitMode}
                  userType={"Admin"}
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
          setNewClassPopup(true);
        }}
      >
        <p>Create Class</p>
      </div>
      {showNewClassPopup && (
        <NewAdminClass setNewClassPopup={setNewClassPopup} refresh={refresh} />
      )}
    </>
  );
};
