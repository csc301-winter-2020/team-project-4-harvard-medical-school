import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminClass } from "../../Pages/Admin/AdminPage";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

interface AdminPageRowProps {
  isPortraitMode: boolean;
  c: AdminClass;
}

export const AdminPageRow: React.FC<AdminPageRowProps> = ({
  isPortraitMode,
  c,
}) => {
  const [isShowing, setIsShowing] = useState(true);
  const history = useHistory();
  const mToast:any = toast;

  return (
    <>
      {isShowing && (
        <div className="home-patient-profile-container" onClick={(e:any) => {
          if (
            e.target.className !== "home-patient-profile-info-btn" &&
            e.target.className !== "home-patient-profile-info-icon" &&
            e.target.nodeName !== "path" &&
            e.target.nodeName !== "svg"
          ) {
            history.push(`/admin/${c.id}/students`);
          }
        }}>
          <div className="home-patient-profile-name-col">{c.name}</div>
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
                  Deleting a class is permenant. Are you sure you want
                  to continue?
                  <div id="modal-btn-container">
                    <button
                      onClick={() => {
                        close();
                        setIsShowing(false);
                        mToast.success("Successfully deleted (On the front end, theres no HTTP request)!")
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
        </div>
      )}
    </>
  );
};
