import React, { useState } from "react";
import "../../../scss/admin/admin-student-profile.scss";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

interface AdminStudentProfileProps {
  firstName: string;
  lastName: string;
  isPortraitMode: boolean;
}

export const AdminStudentProfile: React.FC<AdminStudentProfileProps> = ({
  firstName,
  lastName,
  isPortraitMode,
}) => {
  const [isShowing, setIsShowing] = useState(true);

  const mToast: any = toast;
  return (
    <>
      {isShowing && (
        <>
          <div className="home-patient-profile-container">
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
                          setIsShowing(false);
                          mToast.success(
                            "Successfully removed (On the front end, theres no HTTP request)!"
                          );
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
