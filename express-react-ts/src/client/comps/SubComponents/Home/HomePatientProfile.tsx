import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { dateFormatFull, dateFormatCompact } from "../../../utils/utils";
import Popup from "reactjs-popup";

interface HomePatientProfileProps {
  title?: string;
  date: number;
  lastModified: number;
  firstName: string;
  lastName: string;
  sex: string;
  age: number;
  dateOfBirth: number;
  isPregnant: string | null;
  ethnicity: string;
  country: string;
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
  dateOfBirth,
  isPregnant,
  ethnicity,
  country,
  isPortraitMode,
}) => {
  const history = useHistory();
  const [isShowingInfo, setIsShowingInfo] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

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
              history.push("/patient/8675309/demographics");
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
                {(close: Function)=> (
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
                            setIsDeleted(true);
                          }}
                        >
                          Yes, delete this profile.
                        </button>
                        <button onClick={() => close()}>No, take me back!</button>
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
