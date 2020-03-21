import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { dateFormatFull, dateFormatCompact } from "../../../utils/utils";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";

interface HomePatientProfileProps {
  title?: string;
  date: number;
  lastModified: number;
  firstName: string;
  lastName: string;
  sex: string;
  age: number;
  isPregnant: string | null;
  country: string;
  patientID: number;
  isPortraitMode: boolean;
}

export const HomePatientProfile: React.FC<HomePatientProfileProps> = ({
  title, //unused
  date,
  lastModified,
  firstName,
  lastName,
  sex,
  age,
  isPregnant,
  country,
  isPortraitMode,
  patientID,
}) => {
  const history = useHistory();
  const [isShowingInfo, setIsShowingInfo] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [userID, setUserID] = useState(null);
  const mToast: any = toast;

  useEffect(() => {
    fetch("/api/me")
      .then((res: any) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("api me status not 200");
        }
      })
      .then((data: any) => {
        setUserID(data.id);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    !isDeleted && (
      <>
        <div
          className="home-patient-profile-container"
          onClick={(e: any) => {
            // Only redirect if we are clicking on the container, not the icon.
            if (
              e.target.className !== "home-patient-profile-info-btn" &&
              e.target.className !== "home-patient-profile-info-icon" &&
              e.target.nodeName !== "path" &&
              e.target.nodeName !== "svg"
            ) {
              history.push(`/patient/${patientID}/demographics`);
            }
          }}
        >
          <div className="home-patient-profile-name-col">
            {lastName}, {firstName}
          </div>
          <div className="home-patient-profile-date-col">
            {isPortraitMode ? dateFormatCompact(date) : dateFormatFull(date)}
          </div>
          <div className="home-patient-profile-last-modified-col">
            {isPortraitMode
              ? dateFormatCompact(lastModified)
              : dateFormatFull(lastModified)}
          </div>
          <div
            className="home-patient-profile-info-btn"
            onClick={() => setIsShowingInfo(!isShowingInfo)}
          >
            <div className="home-patient-profile-info-icon">
              <FontAwesomeIcon
                icon="info-circle"
                size={isPortraitMode ? "2x" : "1x"}
              />
            </div>
          </div>
        </div>{" "}
        {/** END GREY BAR DIV */}
        {isShowingInfo && (
          <div className="home-patient-profile-info-container">
            <div className="home-patient-profile-info-quick-info-container">
              <h2>Demographics</h2>
              <p>
                <span className="bold-span">Age:</span> {age}
              </p>
              <p>
                <span className="bold-span">Sex:</span> {sex}
              </p>
              {isPregnant !== null ? (
                <p>
                  <span className="bold-span">Pregnant:</span> {isPregnant}
                </p>
              ) : null}
              <p>
                <span className="bold-span">Country:</span> {country}
              </p>
            </div>
            <div className="home-patient-profile-info-btn-container">
              <div className="home-patient-profile-info-export-btn">
                Export Patient as PDF
              </div>
              <Popup
                trigger={
                  <div className="home-patient-profile-info-delete-btn">
                    Delete Patient Profile
                  </div>
                }
                modal
                closeOnDocumentClick
              >
                {(close: Function) => (
                  <div id="modal-container">
                    <div id="modal-header"> Delete Patient Profile </div>
                    <div id="modal-content">
                      {" "}
                      Deleting a patient profile is permenant. Are you sure you
                      want to continue?
                      <div id="modal-btn-container">
                        <button
                          onClick={() => {
                            close();
                            if (userID === null) {
                              console.log(
                                "User ID is null. Failed the api/me HTTP request."
                              );
                              mToast.warn(
                                "Could not delete patient profile. Try logging in again."
                              );
                            } else {
                              fetch(
                                `/api/patientProfile/${patientID}/${userID}`,
                                {
                                  method: "DELETE",
                                  mode: "cors",
                                  cache: "no-cache",
                                  credentials: "same-origin",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  redirect: "follow",
                                  referrerPolicy: "no-referrer",
                                }
                              )
                                .then(res => {
                                  if (res.status === 200) {
                                    setIsDeleted(true);
                                    mToast.success("Patient profile deleted.");
                                  } else {
                                    throw new Error(
                                      "Could not delete Patient Profile."
                                    );
                                  }
                                })
                                .catch((err: any) => {
                                  console.log(err);
                                  mToast.warn(
                                    "Could not delete patient profile. Try again."
                                  );
                                });
                            }
                          }}
                        >
                          Yes, delete this profile.
                        </button>
                        <button onClick={() => close()}>
                          No, take me back!
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )}
      </>
    )
  );
};
