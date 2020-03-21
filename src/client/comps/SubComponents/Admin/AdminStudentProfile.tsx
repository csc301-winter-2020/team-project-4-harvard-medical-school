import React, { useState } from "react";
import "../../../scss/admin/admin-student-profile.scss";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

interface AdminStudentProfileProps {
  firstName: string;
  lastName: string;
  isPortraitMode: boolean;
  studentId: number;
  classId: number;
}

export const AdminStudentProfile: React.FC<AdminStudentProfileProps> = ({
  firstName,
  lastName,
  isPortraitMode,
  studentId,
  classId,
}) => {
  const [isShowing, setIsShowing] = useState(true);
  const history = useHistory();

  const mToast: any = toast;
  return (
    <>
      {isShowing && (
        <>
          <div className="home-patient-profile-container"
          onClick={(e: any) => {
            // Only redirect if we are clicking on the container, not the icon.
            if (
              e.target.className !== "home-patient-profile-info-btn" &&
              e.target.className !== "home-patient-profile-info-icon" &&
              e.target.nodeName !== "path" &&
              e.target.nodeName !== "svg"
            ) {
              history.push(`/profile/${studentId}`);
            }
          }}>
            <div className="home-patient-profile-name-col">
              {lastName}, {firstName}
            </div>
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
                  <div id="modal-header"> Removing a User </div>
                  <div id="modal-content">
                    {" "}
                    Removing a user from a class is permenant. Are you sure you
                    want to continue?
                    <div id="modal-btn-container">
                      <button
                        onClick={() => {
                          close();
                          fetch(`/api/classes/${classId}/${studentId}`, {
                            method: "DELETE"
                          })
                          .then(response => {
                            if (response.status === 200){
                              mToast.success(
                                "Successfully removed."
                              );
                              setIsShowing(false);
                            } else {
                              throw new Error(`Error code: ${response.status}, ${response.statusText}`)
                            }
                          })
                          .catch((err:any) => {
                            mToast.warn(err);
                          })
                        }}
                      >
                        Yes, remove this user.
                      </button>
                      <button onClick={() => close()}>No, take me back!</button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </>
      )}
    </>
  );
};
