/**
 * A row representing a single class in the admin's class select page.
 */

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminClass } from "../../Pages/Admin/AdminPage";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { MyToast } from "../../../utils/types";

interface ClassRowProps {
  isPortraitMode: boolean;
  c: AdminClass;
  userType: "Admin" | "Student";
}

export const ClassRow: React.FC<ClassRowProps> = ({
  isPortraitMode,
  c,
  userType,
}) => {
  const [isShowing, setIsShowing] = useState(true);
  const history = useHistory();
  const mToast: MyToast = toast as any;

  return (
    <>
      {isShowing && (
        <div
          className="home-patient-profile-container"
          onClick={(e: any) => {
            if (
              e.target.className !== "home-patient-profile-info-btn" &&
              e.target.className !== "home-patient-profile-info-icon" &&
              e.target.nodeName !== "path" &&
              e.target.nodeName !== "svg"
            ) {
              if (userType === "Admin") {
                history.push(`/admin/${c.id}/students`, [c.id]);
              } else {
                history.push(`/class/${c.id}`, [c.id]);
              }
            }
          }}
        >
          <div className="home-patient-profile-name-col">{c.name}</div>
          {userType === "Admin" && (
            <Popup
              trigger={
                <div
                  className="home-patient-profile-info-btn"
                  onClick={() => setIsShowing(false)}
                >
                  <div className="home-patient-profile-info-icon">
                    <FontAwesomeIcon
                      icon="trash"
                      size={isPortraitMode ? "2x" : "1x"}
                    />
                  </div>
                </div>
              }
              modal
              closeOnDocumentClick
            >
              {(close: Function) => (
                <div id="modal-container">
                  <div id="modal-header"> Delete Class </div>
                  <div id="modal-content">
                    {" "}
                    Deleting a class is permenant. Are you sure you want to
                    continue?
                    <div id="modal-btn-container">
                      <button
                        onClick={() => {
                          console.log(c.id);
                          console.log("blah")
                          close();
                          fetch(`/api/classes/${c.id}`, {
                            method: "DELETE",
                          })
                            .then(res => {
                              if (res.status === 200) {
                                setIsShowing(false);
                                mToast.success("Class Successfully Deleted.");
                              } else {
                                throw new Error("Could not delete class.");
                              }
                            })
                            .catch((err: any) => {
                              console.log(err);
                              mToast.warn("Could not delete class. Try again.");
                            });
                        }}
                      >
                        Yes, delete this class.
                      </button>
                      <button onClick={() => close()}>No, take me back!</button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          )}
        </div>
      )}
    </>
  );
};
