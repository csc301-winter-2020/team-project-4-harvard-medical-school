import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { dateFormatFull, dateFormatCompact } from "../../../utils/utils";

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

  return (
    <>
      <div
        className="home-patient-profile-container"
        onClick={(e:any) => {
          // Only redirect if we are clicking on the container, not the icon.
          if (e.target.className !== "home-patient-profile-info-btn" && e.target.className !== "home-patient-profile-info-icon" && e.target.nodeName !== "path" && e.target.nodeName !== "svg"){
            history.push("/patient/8675309");
          }
        }}
      >
        <div className="home-patient-profile-name-col">
          {lastName}, {firstName}
        </div>
        <div className="home-patient-profile-date-col">{isPortraitMode ? dateFormatCompact(date) : dateFormatFull(date)}</div>
        <div className="home-patient-profile-last-modified-col">
          {isPortraitMode ? dateFormatCompact(lastModified) : dateFormatFull(lastModified)}
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
      </div> {/** END GREY BAR DIV */}

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
            <p>
              <span className="bold-span">Ethnicity:</span> {ethnicity}
            </p>
            <p>
              <span className="bold-span">Date Of Birth:</span>{" "}
              {dateFormatFull(dateOfBirth)}
            </p>
          </div>
          <div className="home-patient-profile-info-btn-container">
            <div className="home-patient-profile-info-export-btn">
              Export Patient as PDF
            </div>
            <div className="home-patient-profile-info-delete-btn">
              Delete Patient Profile
            </div>
          </div>
        </div>
      )}
    </>
  );
};
