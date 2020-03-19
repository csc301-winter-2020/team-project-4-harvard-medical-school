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
  const [isDeleted, setIsDeleted] = useState(false);
  const history = useHistory();
  const mToast:any = toast;

  return (
    !isDeleted &&(
    <>
      {isShowing && (
        <div className="home-patient-profile-container" onClick={(e:any) => {
          if (
            e.target.className !== "home-patient-profile-info-btn" &&
            e.target.className !== "home-patient-profile-info-icon" &&
            e.target.nodeName !== "path" &&
            e.target.nodeName !== "svg"
          ) {
            history.push(`/admin/${c.id}/students`, [c.id]);
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
                        fetch(
                          `/api/classes/${c.id}`,
                          {
                            method: "DELETE"
                          }
                          )
                          .then(res => {
                            if (res.status === 200) {
                              setIsDeleted(true);
                              mToast.success("Class Successfully Deleted.");
                            } else {
                              throw new Error(
                                "Could not delete class."
                              );
                            }
                          })
                          .catch((err: any) => {
                            console.log(err);
                            mToast.warn(
                              "Could not delete patient profile. Try again."
                            );
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
        </div>
      )}
    </>
    )
  );
};
